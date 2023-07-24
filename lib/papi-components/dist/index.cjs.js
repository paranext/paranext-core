'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const Te = require('react'),
  Oo = require('react-dom'),
  ka = require('react-data-grid');
function kl(e) {
  const t = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const o in e)
      if (o !== 'default') {
        const r = Object.getOwnPropertyDescriptor(e, o);
        Object.defineProperty(t, o, r.get ? r : { enumerable: !0, get: () => e[o] });
      }
  }
  return (t.default = e), Object.freeze(t);
}
const y = kl(Te),
  wl = kl(Oo);
function Ku(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var pi = { exports: {} },
  po = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wa;
function Xu() {
  if (wa) return po;
  wa = 1;
  var e = Te,
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
  return (po.Fragment = o), (po.jsx = s), (po.jsxs = s), po;
}
var fo = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sa;
function Ju() {
  return (
    Sa ||
      ((Sa = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Te,
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
                  O.$$typeof === c ||
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
          function z(O) {
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
                  return N !== null ? N : z(O.type) || 'Memo';
                case h: {
                  var $ = O,
                    X = $._payload,
                    oe = $._init;
                  try {
                    return z(oe(X));
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
            V,
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
                  (V = console.groupCollapsed),
                  (Z = console.groupEnd);
                var O = { configurable: !0, enumerable: !0, value: G, writable: !0 };
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
                var O = { configurable: !0, enumerable: !0, writable: !0 };
                Object.defineProperties(console, {
                  log: A({}, O, { value: B }),
                  info: A({}, O, { value: te }),
                  warn: A({}, O, { value: U }),
                  error: A({}, O, { value: W }),
                  group: A({}, O, { value: R }),
                  groupCollapsed: A({}, O, { value: V }),
                  groupEnd: A({}, O, { value: Z }),
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
                    $e = N.stack.split(`
`),
                    Se = pe.length - 1,
                    je = $e.length - 1;
                  Se >= 1 && je >= 0 && pe[Se] !== $e[je];

                )
                  je--;
                for (; Se >= 1 && je >= 0; Se--, je--)
                  if (pe[Se] !== $e[je]) {
                    if (Se !== 1 || je !== 1)
                      do
                        if ((Se--, je--, je < 0 || pe[Se] !== $e[je])) {
                          var vt =
                            `
` + pe[Se].replace(' at new ', ' at ');
                          return (
                            O.displayName &&
                              vt.includes('<anonymous>') &&
                              (vt = vt.replace('<anonymous>', O.displayName)),
                            typeof O == 'function' && he.set(O, vt),
                            vt
                          );
                        }
                      while (Se >= 1 && je >= 0);
                    break;
                  }
              }
            } finally {
              (le = !1), (ie.current = X), re(), (Error.prepareStackTrace = $);
            }
            var Un = O ? O.displayName || O.name : '',
              Ta = Un ? se(Un) : '';
            return typeof O == 'function' && he.set(O, Ta), Ta;
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
          var Ie = Object.prototype.hasOwnProperty,
            ge = {},
            tt = k.ReactDebugCurrentFrame;
          function Ve(O) {
            if (O) {
              var K = O._owner,
                ue = Y(O.type, O._source, K ? K.type : null);
              tt.setExtraStackFrame(ue);
            } else tt.setExtraStackFrame(null);
          }
          function we(O, K, ue, N, $) {
            {
              var X = Function.call.bind(Ie);
              for (var oe in O)
                if (X(O, oe)) {
                  var pe = void 0;
                  try {
                    if (typeof O[oe] != 'function') {
                      var $e = Error(
                        (N || 'React class') +
                          ': ' +
                          ue +
                          ' type `' +
                          oe +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof O[oe] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw (($e.name = 'Invariant Violation'), $e);
                    }
                    pe = O[oe](K, oe, N, ue, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (Se) {
                    pe = Se;
                  }
                  pe &&
                    !(pe instanceof Error) &&
                    (Ve($),
                    T(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      N || 'React class',
                      ue,
                      oe,
                      typeof pe,
                    ),
                    Ve(null)),
                    pe instanceof Error &&
                      !(pe.message in ge) &&
                      ((ge[pe.message] = !0),
                      Ve($),
                      T('Failed %s type: %s', ue, pe.message),
                      Ve(null));
                }
            }
          }
          var Ne = Array.isArray;
          function nt(O) {
            return Ne(O);
          }
          function at(O) {
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
                  at(O),
                ),
                me(O)
              );
          }
          var be = k.ReactCurrentOwner,
            fe = { key: !0, ref: !0, __self: !0, __source: !0 },
            de,
            ne,
            Ee;
          Ee = {};
          function Ce(O) {
            if (Ie.call(O, 'ref')) {
              var K = Object.getOwnPropertyDescriptor(O, 'ref').get;
              if (K && K.isReactWarning) return !1;
            }
            return O.ref !== void 0;
          }
          function Ae(O) {
            if (Ie.call(O, 'key')) {
              var K = Object.getOwnPropertyDescriptor(O, 'key').get;
              if (K && K.isReactWarning) return !1;
            }
            return O.key !== void 0;
          }
          function st(O, K) {
            if (typeof O.ref == 'string' && be.current && K && be.current.stateNode !== K) {
              var ue = z(be.current.type);
              Ee[ue] ||
                (T(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  z(be.current.type),
                  O.ref,
                ),
                (Ee[ue] = !0));
            }
          }
          function mt(O, K) {
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
                Object.defineProperty(O, 'key', { get: ue, configurable: !0 });
            }
          }
          function kt(O, K) {
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
                Object.defineProperty(O, 'ref', { get: ue, configurable: !0 });
            }
          }
          var gn = function (O, K, ue, N, $, X, oe) {
            var pe = { $$typeof: t, type: O, key: K, ref: ue, props: oe, _owner: X };
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
          function wt(O, K, ue, N, $) {
            {
              var X,
                oe = {},
                pe = null,
                $e = null;
              ue !== void 0 && (xe(ue), (pe = '' + ue)),
                Ae(K) && (xe(K.key), (pe = '' + K.key)),
                Ce(K) && (($e = K.ref), st(K, $));
              for (X in K) Ie.call(K, X) && !fe.hasOwnProperty(X) && (oe[X] = K[X]);
              if (O && O.defaultProps) {
                var Se = O.defaultProps;
                for (X in Se) oe[X] === void 0 && (oe[X] = Se[X]);
              }
              if (pe || $e) {
                var je = typeof O == 'function' ? O.displayName || O.name || 'Unknown' : O;
                pe && mt(oe, je), $e && kt(oe, je);
              }
              return gn(O, pe, $e, $, N, be.current, oe);
            }
          }
          var gt = k.ReactCurrentOwner,
            Et = k.ReactDebugCurrentFrame;
          function ht(O) {
            if (O) {
              var K = O._owner,
                ue = Y(O.type, O._source, K ? K.type : null);
              Et.setExtraStackFrame(ue);
            } else Et.setExtraStackFrame(null);
          }
          var ot;
          ot = !1;
          function rt(O) {
            return typeof O == 'object' && O !== null && O.$$typeof === t;
          }
          function bt() {
            {
              if (gt.current) {
                var O = z(gt.current.type);
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
          function wn(O) {
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
              var K = bt();
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
          function qt(O, K) {
            {
              if (!O._store || O._store.validated || O.key != null) return;
              O._store.validated = !0;
              var ue = vn(K);
              if (Qt[ue]) return;
              Qt[ue] = !0;
              var N = '';
              O &&
                O._owner &&
                O._owner !== gt.current &&
                (N = ' It was passed a child from ' + z(O._owner.type) + '.'),
                ht(O),
                T(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  ue,
                  N,
                ),
                ht(null);
            }
          }
          function ln(O, K) {
            {
              if (typeof O != 'object') return;
              if (nt(O))
                for (var ue = 0; ue < O.length; ue++) {
                  var N = O[ue];
                  rt(N) && qt(N, K);
                }
              else if (rt(O)) O._store && (O._store.validated = !0);
              else if (O) {
                var $ = m(O);
                if (typeof $ == 'function' && $ !== O.entries)
                  for (var X = $.call(O), oe; !(oe = X.next()).done; )
                    rt(oe.value) && qt(oe.value, K);
              }
            }
          }
          function cn(O) {
            {
              var K = O.type;
              if (K == null || typeof K == 'string') return;
              var ue;
              if (typeof K == 'function') ue = K.propTypes;
              else if (typeof K == 'object' && (K.$$typeof === c || K.$$typeof === p))
                ue = K.propTypes;
              else return;
              if (ue) {
                var N = z(K);
                we(ue, O.props, 'prop', N, O);
              } else if (K.PropTypes !== void 0 && !ot) {
                ot = !0;
                var $ = z(K);
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
                  ht(O),
                    T(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      N,
                    ),
                    ht(null);
                  break;
                }
              }
              O.ref !== null &&
                (ht(O), T('Invalid attribute `ref` supplied to `React.Fragment`.'), ht(null));
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
                var $e = wn($);
                $e ? (pe += $e) : (pe += bt());
                var Se;
                O === null
                  ? (Se = 'null')
                  : nt(O)
                  ? (Se = 'array')
                  : O !== void 0 && O.$$typeof === t
                  ? ((Se = '<' + (z(O.type) || 'Unknown') + ' />'),
                    (pe = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (Se = typeof O),
                  T(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    Se,
                    pe,
                  );
              }
              var je = wt(O, K, ue, $, X);
              if (je == null) return je;
              if (oe) {
                var vt = K.children;
                if (vt !== void 0)
                  if (N)
                    if (nt(vt)) {
                      for (var Un = 0; Un < vt.length; Un++) ln(vt[Un], O);
                      Object.freeze && Object.freeze(vt);
                    } else
                      T(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else ln(vt, O);
              }
              return O === r ? un(je) : cn(je), je;
            }
          }
          function dn(O, K, ue) {
            return en(O, K, ue, !0);
          }
          function Le(O, K, ue) {
            return en(O, K, ue, !1);
          }
          var pt = Le,
            Lt = dn;
          (fo.Fragment = r), (fo.jsx = pt), (fo.jsxs = Lt);
        })()),
    fo
  );
}
process.env.NODE_ENV === 'production' ? (pi.exports = Xu()) : (pi.exports = Ju());
var _i = pi.exports;
const Zu = _i.Fragment,
  _ = _i.jsx,
  Qe = _i.jsxs,
  Qu = { black: '#000', white: '#fff' },
  Io = Qu,
  ed = {
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
  Wn = ed,
  td = {
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
  Hn = td,
  nd = {
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
  qn = nd,
  od = {
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
  Yn = od,
  rd = {
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
  Gn = rd,
  id = {
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
  mo = id,
  ad = {
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
  sd = ad;
function Vt(e, t) {
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
function Sl(e) {
  if (!In(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = Sl(e[o]);
    }),
    t
  );
}
function Bt(e, t, o = { clone: !0 }) {
  const r = o.clone ? g({}, e) : e;
  return (
    In(e) &&
      In(t) &&
      Object.keys(t).forEach((i) => {
        i !== '__proto__' &&
          (In(t[i]) && i in e && In(e[i])
            ? (r[i] = Bt(e[i], t[i], o))
            : o.clone
            ? (r[i] = In(t[i]) ? Sl(t[i]) : t[i])
            : (r[i] = t[i]));
      }),
    r
  );
}
var fi = { exports: {} },
  Ho = { exports: {} },
  Ue = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ra;
function ld() {
  if (Ra) return Ue;
  Ra = 1;
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
    (Ue.AsyncMode = c),
    (Ue.ConcurrentMode = u),
    (Ue.ContextConsumer = l),
    (Ue.ContextProvider = s),
    (Ue.Element = t),
    (Ue.ForwardRef = d),
    (Ue.Fragment = r),
    (Ue.Lazy = x),
    (Ue.Memo = v),
    (Ue.Portal = o),
    (Ue.Profiler = a),
    (Ue.StrictMode = i),
    (Ue.Suspense = p),
    (Ue.isAsyncMode = function (f) {
      return E(f) || C(f) === c;
    }),
    (Ue.isConcurrentMode = E),
    (Ue.isContextConsumer = function (f) {
      return C(f) === l;
    }),
    (Ue.isContextProvider = function (f) {
      return C(f) === s;
    }),
    (Ue.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (Ue.isForwardRef = function (f) {
      return C(f) === d;
    }),
    (Ue.isFragment = function (f) {
      return C(f) === r;
    }),
    (Ue.isLazy = function (f) {
      return C(f) === x;
    }),
    (Ue.isMemo = function (f) {
      return C(f) === v;
    }),
    (Ue.isPortal = function (f) {
      return C(f) === o;
    }),
    (Ue.isProfiler = function (f) {
      return C(f) === a;
    }),
    (Ue.isStrictMode = function (f) {
      return C(f) === i;
    }),
    (Ue.isSuspense = function (f) {
      return C(f) === p;
    }),
    (Ue.isValidElementType = function (f) {
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
    (Ue.typeOf = C),
    Ue
  );
}
var We = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Na;
function cd() {
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
              typeof P == 'function' ||
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
            z = v,
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
          function V(P) {
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
          (We.AsyncMode = f),
            (We.ConcurrentMode = S),
            (We.ContextConsumer = w),
            (We.ContextProvider = j),
            (We.Element = L),
            (We.ForwardRef = D),
            (We.Fragment = I),
            (We.Lazy = q),
            (We.Memo = z),
            (We.Portal = A),
            (We.Profiler = F),
            (We.StrictMode = B),
            (We.Suspense = te),
            (We.isAsyncMode = W),
            (We.isConcurrentMode = R),
            (We.isContextConsumer = V),
            (We.isContextProvider = Z),
            (We.isElement = G),
            (We.isForwardRef = H),
            (We.isFragment = re),
            (We.isLazy = ie),
            (We.isMemo = Q),
            (We.isPortal = se),
            (We.isProfiler = le),
            (We.isStrictMode = he),
            (We.isSuspense = ae),
            (We.isValidElementType = C),
            (We.typeOf = E);
        })()),
    We
  );
}
var $a;
function Rl() {
  return (
    $a ||
      (($a = 1), process.env.NODE_ENV === 'production' ? (Ho.exports = ld()) : (Ho.exports = cd())),
    Ho.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var Kr, Pa;
function ud() {
  if (Pa) return Kr;
  Pa = 1;
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
    (Kr = i()
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
    Kr
  );
}
var Xr, Ia;
function Mi() {
  if (Ia) return Xr;
  Ia = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Xr = e), Xr;
}
var Jr, _a;
function Nl() {
  return _a || ((_a = 1), (Jr = Function.call.bind(Object.prototype.hasOwnProperty))), Jr;
}
var Zr, Ma;
function dd() {
  if (Ma) return Zr;
  Ma = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = Mi(),
      o = {},
      r = Nl();
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
    (Zr = i),
    Zr
  );
}
var Qr, Aa;
function pd() {
  if (Aa) return Qr;
  Aa = 1;
  var e = Rl(),
    t = ud(),
    o = Mi(),
    r = Nl(),
    i = dd(),
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
    (Qr = function (l, c) {
      var u = typeof Symbol == 'function' && Symbol.iterator,
        d = '@@iterator';
      function p(R) {
        var V = R && ((u && R[u]) || R[d]);
        if (typeof V == 'function') return V;
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
          exact: z,
        };
      function x(R, V) {
        return R === V ? R !== 0 || 1 / R === 1 / V : R !== R && V !== V;
      }
      function b(R, V) {
        (this.message = R), (this.data = V && typeof V == 'object' ? V : {}), (this.stack = '');
      }
      b.prototype = Error.prototype;
      function m(R) {
        if (process.env.NODE_ENV !== 'production')
          var V = {},
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
              !V[Oe] &&
                Z < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    he +
                    '` prop on `' +
                    se +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (V[Oe] = !0),
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
        function V(Z, G, H, re, ie, Q) {
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
        return m(V);
      }
      function T() {
        return m(s);
      }
      function C(R) {
        function V(Z, G, H, re, ie) {
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
        return m(V);
      }
      function E() {
        function R(V, Z, G, H, re) {
          var ie = V[Z];
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
        function R(V, Z, G, H, re) {
          var ie = V[Z];
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
        function V(Z, G, H, re, ie) {
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
        return m(V);
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
        function V(Z, G, H, re, ie) {
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
        return m(V);
      }
      function j(R) {
        function V(Z, G, H, re, ie) {
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
        return m(V);
      }
      function L(R) {
        if (!Array.isArray(R))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var V = 0; V < R.length; V++) {
          var Z = R[V];
          if (typeof Z != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  U(Z) +
                  ' at index ' +
                  V +
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
        function R(V, Z, G, H, re) {
          return A(V[Z])
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
      function I(R, V, Z, G, H) {
        return new b(
          (R || 'React class') +
            ': ' +
            V +
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
        function V(Z, G, H, re, ie) {
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
        return m(V);
      }
      function z(R) {
        function V(Z, G, H, re, ie) {
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
        return m(V);
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
            var V = p(R);
            if (V) {
              var Z = V.call(R),
                G;
              if (V !== R.entries) {
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
      function F(R, V) {
        return R === 'symbol'
          ? !0
          : V
          ? V['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && V instanceof Symbol)
          : !1;
      }
      function B(R) {
        var V = typeof R;
        return Array.isArray(R) ? 'array' : R instanceof RegExp ? 'object' : F(V, R) ? 'symbol' : V;
      }
      function te(R) {
        if (typeof R > 'u' || R === null) return '' + R;
        var V = B(R);
        if (V === 'object') {
          if (R instanceof Date) return 'date';
          if (R instanceof RegExp) return 'regexp';
        }
        return V;
      }
      function U(R) {
        var V = te(R);
        switch (V) {
          case 'array':
          case 'object':
            return 'an ' + V;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + V;
          default:
            return V;
        }
      }
      function W(R) {
        return !R.constructor || !R.constructor.name ? h : R.constructor.name;
      }
      return (
        (v.checkPropTypes = i), (v.resetWarningCache = i.resetWarningCache), (v.PropTypes = v), v
      );
    }),
    Qr
  );
}
var ei, Da;
function fd() {
  if (Da) return ei;
  Da = 1;
  var e = Mi();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (ei = function () {
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
    ei
  );
}
if (process.env.NODE_ENV !== 'production') {
  var md = Rl(),
    hd = !0;
  fi.exports = pd()(md.isElement, hd);
} else fi.exports = fd()();
var bd = fi.exports;
const n = Ku(bd);
function gd(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function $l(e, t, o, r, i) {
  const a = e[t],
    s = i || t;
  if (a == null || typeof window > 'u') return null;
  let l;
  const c = a.type;
  return (
    typeof c == 'function' &&
      !gd(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const Pl = Vt(n.element, $l);
Pl.isRequired = Vt(n.element.isRequired, $l);
const Fn = Pl;
function vd(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function yd(e, t, o, r, i) {
  const a = e[t],
    s = i || t;
  if (a == null || typeof window > 'u') return null;
  let l;
  return (
    typeof a == 'function' &&
      !vd(a) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const Ai = Vt(n.elementType, yd),
  xd = 'exact-prop: ​';
function Di(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : g({}, e, {
        [xd]: (t) => {
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
function On(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let o = 1; o < arguments.length; o += 1) t += '&args[]=' + encodeURIComponent(arguments[o]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var mi = { exports: {} },
  He = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var La;
function Ed() {
  if (La) return He;
  La = 1;
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
    (He.ContextConsumer = s),
    (He.ContextProvider = a),
    (He.Element = e),
    (He.ForwardRef = c),
    (He.Fragment = o),
    (He.Lazy = h),
    (He.Memo = p),
    (He.Portal = t),
    (He.Profiler = i),
    (He.StrictMode = r),
    (He.Suspense = u),
    (He.SuspenseList = d),
    (He.isAsyncMode = function () {
      return !1;
    }),
    (He.isConcurrentMode = function () {
      return !1;
    }),
    (He.isContextConsumer = function (m) {
      return b(m) === s;
    }),
    (He.isContextProvider = function (m) {
      return b(m) === a;
    }),
    (He.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (He.isForwardRef = function (m) {
      return b(m) === c;
    }),
    (He.isFragment = function (m) {
      return b(m) === o;
    }),
    (He.isLazy = function (m) {
      return b(m) === h;
    }),
    (He.isMemo = function (m) {
      return b(m) === p;
    }),
    (He.isPortal = function (m) {
      return b(m) === t;
    }),
    (He.isProfiler = function (m) {
      return b(m) === i;
    }),
    (He.isStrictMode = function (m) {
      return b(m) === r;
    }),
    (He.isSuspense = function (m) {
      return b(m) === u;
    }),
    (He.isSuspenseList = function (m) {
      return b(m) === d;
    }),
    (He.isValidElementType = function (m) {
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
    (He.typeOf = b),
    He
  );
}
var qe = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ja;
function Cd() {
  return (
    ja ||
      ((ja = 1),
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
                  M.$$typeof === c ||
                  M.$$typeof === C ||
                  M.getModuleId !== void 0))
            );
          }
          function f(M) {
            if (typeof M == 'object' && M !== null) {
              var Y = M.$$typeof;
              switch (Y) {
                case e:
                  var Ie = M.type;
                  switch (Ie) {
                    case o:
                    case i:
                    case r:
                    case u:
                    case d:
                      return Ie;
                    default:
                      var ge = Ie && Ie.$$typeof;
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
            z = t,
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
          function V(M) {
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
          (qe.ContextConsumer = S),
            (qe.ContextProvider = w),
            (qe.Element = j),
            (qe.ForwardRef = L),
            (qe.Fragment = D),
            (qe.Lazy = I),
            (qe.Memo = q),
            (qe.Portal = z),
            (qe.Profiler = A),
            (qe.StrictMode = F),
            (qe.Suspense = B),
            (qe.SuspenseList = te),
            (qe.isAsyncMode = R),
            (qe.isConcurrentMode = V),
            (qe.isContextConsumer = Z),
            (qe.isContextProvider = G),
            (qe.isElement = H),
            (qe.isForwardRef = re),
            (qe.isFragment = ie),
            (qe.isLazy = Q),
            (qe.isMemo = se),
            (qe.isPortal = le),
            (qe.isProfiler = he),
            (qe.isStrictMode = ae),
            (qe.isSuspense = P),
            (qe.isSuspenseList = Oe),
            (qe.isValidElementType = E),
            (qe.typeOf = f);
        })()),
    qe
  );
}
process.env.NODE_ENV === 'production' ? (mi.exports = Ed()) : (mi.exports = Cd());
var Fa = mi.exports;
const Od = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Td(e) {
  const t = `${e}`.match(Od);
  return (t && t[1]) || '';
}
function Il(e, t = '') {
  return e.displayName || e.name || Td(e) || t;
}
function Ba(e, t, o) {
  const r = Il(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function kd(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return Il(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Fa.ForwardRef:
          return Ba(e, e.render, 'ForwardRef');
        case Fa.Memo:
          return Ba(e, e.type, 'memo');
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
const wd = n.oneOfType([n.func, n.object]),
  $t = wd;
function J(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : On(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Va(...e) {
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
function Li(e, t = 166) {
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
function ti(e, t) {
  return y.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function ut(e) {
  return (e && e.ownerDocument) || document;
}
function mn(e) {
  return ut(e).defaultView || window;
}
function Sd(e, t) {
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
function sr(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const Rd = typeof window < 'u' ? y.useLayoutEffect : y.useEffect,
  an = Rd;
let za = 0;
function Nd(e) {
  const [t, o] = y.useState(e),
    r = e || t;
  return (
    y.useEffect(() => {
      t == null && ((za += 1), o(`mui-${za}`));
    }, [t]),
    r
  );
}
const Ua = y['useId'];
function _l(e) {
  if (Ua !== void 0) {
    const t = Ua();
    return e ?? t;
  }
  return Nd(e);
}
function $d(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = i || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${a}\` is not supported. Please remove it.`)
    : null;
}
function An({ controlled: e, default: t, name: o, state: r = 'value' }) {
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
function Ot(e) {
  const t = y.useRef(e);
  return (
    an(() => {
      t.current = e;
    }),
    y.useCallback((...o) => (0, t.current)(...o), [])
  );
}
function dt(...e) {
  return y.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              sr(o, t);
            });
          },
    e,
  );
}
let yr = !0,
  hi = !1,
  Wa;
const Pd = {
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
function Id(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && Pd[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function _d(e) {
  e.metaKey || e.altKey || e.ctrlKey || (yr = !0);
}
function ni() {
  yr = !1;
}
function Md() {
  this.visibilityState === 'hidden' && hi && (yr = !0);
}
function Ad(e) {
  e.addEventListener('keydown', _d, !0),
    e.addEventListener('mousedown', ni, !0),
    e.addEventListener('pointerdown', ni, !0),
    e.addEventListener('touchstart', ni, !0),
    e.addEventListener('visibilitychange', Md, !0);
}
function Dd(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return yr || Id(t);
}
function Ml() {
  const e = y.useCallback((i) => {
      i != null && Ad(i.ownerDocument);
    }, []),
    t = y.useRef(!1);
  function o() {
    return t.current
      ? ((hi = !0),
        window.clearTimeout(Wa),
        (Wa = window.setTimeout(() => {
          hi = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(i) {
    return Dd(i) ? ((t.current = !0), !0) : !1;
  }
  return { isFocusVisibleRef: t, onFocus: r, onBlur: o, ref: e };
}
function Al(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const Ld = (e) => {
    const t = y.useRef({});
    return (
      y.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  jd = Ld,
  Fd = {
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
  Bd = Fd;
function Vd(e) {
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
function zd(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const Ud = Number.isInteger || zd;
function Dl(e, t, o, r) {
  const i = e[t];
  if (i == null || !Ud(i)) {
    const a = Vd(i);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function Ll(e, t, ...o) {
  return e[t] === void 0 ? null : Dl(e, t, ...o);
}
function bi() {
  return null;
}
Ll.isRequired = Dl;
bi.isRequired = bi;
const xr = process.env.NODE_ENV === 'production' ? bi : Ll;
function ji(e, t) {
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
                o[r][s] = ji(i[s], a[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function Me(e, t, o = void 0) {
  const r = {};
  return (
    Object.keys(e).forEach((i) => {
      r[i] = e[i]
        .reduce((a, s) => {
          if (s) {
            const l = t(s);
            l !== '' && a.push(l), o && o[s] && a.push(o[s]);
          }
          return a;
        }, [])
        .join(' ');
    }),
    r
  );
}
const Ha = (e) => e,
  Wd = () => {
    let e = Ha;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Ha;
      },
    };
  },
  Hd = Wd(),
  qd = Hd,
  Yd = {
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
  const r = Yd[t];
  return r ? `${o}-${r}` : `${qd.generate(e)}-${t}`;
}
function Re(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((i) => {
      r[i] = Pe(e, i, o);
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
function jl(e) {
  var t = Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var Gd =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  Kd = jl(function (e) {
    return (
      Gd.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
    );
  });
function Xd(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function Jd(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var Zd = (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Jd(this));
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
          var s = Xd(i);
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
  Ct = '-ms-',
  lr = '-moz-',
  ze = '-webkit-',
  Fi = 'comm',
  Bi = 'rule',
  Vi = 'decl',
  Qd = '@import',
  Fl = '@keyframes',
  ep = Math.abs,
  Er = String.fromCharCode,
  tp = Object.assign;
function np(e, t) {
  return yt(e, 0) ^ 45
    ? (((((((t << 2) ^ yt(e, 0)) << 2) ^ yt(e, 1)) << 2) ^ yt(e, 2)) << 2) ^ yt(e, 3)
    : 0;
}
function Bl(e) {
  return e.trim();
}
function op(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Je(e, t, o) {
  return e.replace(t, o);
}
function gi(e, t) {
  return e.indexOf(t);
}
function yt(e, t) {
  return e.charCodeAt(t) | 0;
}
function _o(e, t, o) {
  return e.slice(t, o);
}
function nn(e) {
  return e.length;
}
function zi(e) {
  return e.length;
}
function qo(e, t) {
  return t.push(e), e;
}
function rp(e, t) {
  return e.map(t).join('');
}
var Cr = 1,
  to = 1,
  Vl = 0,
  Nt = 0,
  ft = 0,
  co = '';
function Or(e, t, o, r, i, a, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: i,
    children: a,
    line: Cr,
    column: to,
    length: s,
    return: '',
  };
}
function ho(e, t) {
  return tp(Or('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function ip() {
  return ft;
}
function ap() {
  return (ft = Nt > 0 ? yt(co, --Nt) : 0), to--, ft === 10 && ((to = 1), Cr--), ft;
}
function Mt() {
  return (ft = Nt < Vl ? yt(co, Nt++) : 0), to++, ft === 10 && ((to = 1), Cr++), ft;
}
function rn() {
  return yt(co, Nt);
}
function nr() {
  return Nt;
}
function Fo(e, t) {
  return _o(co, e, t);
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
function zl(e) {
  return (Cr = to = 1), (Vl = nn((co = e))), (Nt = 0), [];
}
function Ul(e) {
  return (co = ''), e;
}
function or(e) {
  return Bl(Fo(Nt - 1, yi(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function sp(e) {
  for (; (ft = rn()) && ft < 33; ) Mt();
  return Mo(e) > 2 || Mo(ft) > 3 ? '' : ' ';
}
function lp(e, t) {
  for (; --t && Mt() && !(ft < 48 || ft > 102 || (ft > 57 && ft < 65) || (ft > 70 && ft < 97)); );
  return Fo(e, nr() + (t < 6 && rn() == 32 && Mt() == 32));
}
function yi(e) {
  for (; Mt(); )
    switch (ft) {
      case e:
        return Nt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && yi(ft);
        break;
      case 40:
        e === 41 && yi(e);
        break;
      case 92:
        Mt();
        break;
    }
  return Nt;
}
function cp(e, t) {
  for (; Mt() && e + ft !== 47 + 10; ) if (e + ft === 42 + 42 && rn() === 47) break;
  return '/*' + Fo(t, Nt - 1) + '*' + Er(e === 47 ? e : Mt());
}
function up(e) {
  for (; !Mo(rn()); ) Mt();
  return Fo(e, Nt);
}
function dp(e) {
  return Ul(rr('', null, null, null, [''], (e = zl(e)), 0, [0], e));
}
function rr(e, t, o, r, i, a, s, l, c) {
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
    switch (((x = T), (T = Mt()))) {
      case 40:
        if (x != 108 && yt(w, p - 1) == 58) {
          gi((w += Je(or(T), '&', '&\f')), '&\f') != -1 && (k = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        w += or(T);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        w += sp(x);
        break;
      case 92:
        w += lp(nr() - 1, 7);
        continue;
      case 47:
        switch (rn()) {
          case 42:
          case 47:
            qo(pp(cp(Mt(), nr()), t, o), c);
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
              qo(v > 32 ? Ya(w + ';', r, o, p - 1) : Ya(Je(w, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            w += ';';
          default:
            if ((qo((S = qa(w, t, o, u, d, i, l, C, (E = []), (f = []), p)), a), T === 123))
              if (d === 0) rr(w, t, S, S, E, a, p, l, f);
              else
                switch (h === 99 && yt(w, 3) === 110 ? 100 : h) {
                  case 100:
                  case 109:
                  case 115:
                    rr(
                      e,
                      S,
                      S,
                      r && qo(qa(e, S, S, 0, 0, i, l, C, i, (E = []), p), f),
                      i,
                      f,
                      p,
                      l,
                      r ? E : f,
                    );
                    break;
                  default:
                    rr(w, S, S, S, [''], f, 0, l, f);
                }
        }
        (u = d = v = 0), (b = k = 1), (C = w = ''), (p = s);
        break;
      case 58:
        (p = 1 + nn(w)), (v = x);
      default:
        if (b < 1) {
          if (T == 123) --b;
          else if (T == 125 && b++ == 0 && ap() == 125) continue;
        }
        switch (((w += Er(T)), T * b)) {
          case 38:
            k = d > 0 ? 1 : ((w += '\f'), -1);
            break;
          case 44:
            (l[u++] = (nn(w) - 1) * k), (k = 1);
            break;
          case 64:
            rn() === 45 && (w += or(Mt())), (h = rn()), (d = p = nn((C = w += up(nr())))), T++;
            break;
          case 45:
            x === 45 && nn(w) == 2 && (b = 0);
        }
    }
  return a;
}
function qa(e, t, o, r, i, a, s, l, c, u, d) {
  for (var p = i - 1, h = i === 0 ? a : [''], v = zi(h), x = 0, b = 0, m = 0; x < r; ++x)
    for (var k = 0, T = _o(e, p + 1, (p = ep((b = s[x])))), C = e; k < v; ++k)
      (C = Bl(b > 0 ? h[k] + ' ' + T : Je(T, /&\f/g, h[k]))) && (c[m++] = C);
  return Or(e, t, o, i === 0 ? Bi : l, c, u, d);
}
function pp(e, t, o) {
  return Or(e, t, o, Fi, Er(ip()), _o(e, 2, -2), 0);
}
function Ya(e, t, o, r) {
  return Or(e, t, o, Vi, _o(e, 0, r), _o(e, r + 1, -1), r);
}
function Jn(e, t) {
  for (var o = '', r = zi(e), i = 0; i < r; i++) o += t(e[i], i, e, t) || '';
  return o;
}
function fp(e, t, o, r) {
  switch (e.type) {
    case Qd:
    case Vi:
      return (e.return = e.return || e.value);
    case Fi:
      return '';
    case Fl:
      return (e.return = e.value + '{' + Jn(e.children, r) + '}');
    case Bi:
      e.value = e.props.join(',');
  }
  return nn((o = Jn(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function mp(e) {
  var t = zi(e);
  return function (o, r, i, a) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, i, a) || '';
    return s;
  };
}
function hp(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var bp = function (t, o, r) {
    for (var i = 0, a = 0; (i = a), (a = rn()), i === 38 && a === 12 && (o[r] = 1), !Mo(a); ) Mt();
    return Fo(t, Nt);
  },
  gp = function (t, o) {
    var r = -1,
      i = 44;
    do
      switch (Mo(i)) {
        case 0:
          i === 38 && rn() === 12 && (o[r] = 1), (t[r] += bp(Nt - 1, o, r));
          break;
        case 2:
          t[r] += or(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = rn() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += Er(i);
      }
    while ((i = Mt()));
    return t;
  },
  vp = function (t, o) {
    return Ul(gp(zl(t), o));
  },
  Ga = new WeakMap(),
  yp = function (t) {
    if (!(t.type !== 'rule' || !t.parent || t.length < 1)) {
      for (
        var o = t.value, r = t.parent, i = t.column === r.column && t.line === r.line;
        r.type !== 'rule';

      )
        if (((r = r.parent), !r)) return;
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !Ga.get(r)) && !i) {
        Ga.set(t, !0);
        for (var a = [], s = vp(o, a), l = r.props, c = 0, u = 0; c < s.length; c++)
          for (var d = 0; d < l.length; d++, u++)
            t.props[u] = a[c] ? s[c].replace(/&\f/g, l[d]) : l[d] + ' ' + s[c];
      }
    }
  },
  xp = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      o.charCodeAt(0) === 108 && o.charCodeAt(2) === 98 && ((t.return = ''), (t.value = ''));
    }
  },
  Ep =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  Cp = function (t) {
    return t.type === 'comm' && t.children.indexOf(Ep) > -1;
  },
  Op = function (t) {
    return function (o, r, i) {
      if (!(o.type !== 'rule' || t.compat)) {
        var a = o.value.match(/(:first|:nth|:nth-last)-child/g);
        if (a) {
          for (
            var s = o.parent === i[0], l = s ? i[0].children : i, c = l.length - 1;
            c >= 0;
            c--
          ) {
            var u = l[c];
            if (u.line < o.line) break;
            if (u.column < o.column) {
              if (Cp(u)) return;
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
  Wl = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  Tp = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!Wl(o[r])) return !0;
    return !1;
  },
  Ka = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  kp = function (t, o, r) {
    Wl(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          Ka(t))
        : Tp(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          Ka(t)));
  };
function Hl(e, t) {
  switch (np(e, t)) {
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
      return ze + e + lr + e + Ct + e + e;
    case 6828:
    case 4268:
      return ze + e + Ct + e + e;
    case 6165:
      return ze + e + Ct + 'flex-' + e + e;
    case 5187:
      return ze + e + Je(e, /(\w+).+(:[^]+)/, ze + 'box-$1$2' + Ct + 'flex-$1$2') + e;
    case 5443:
      return ze + e + Ct + 'flex-item-' + Je(e, /flex-|-self/, '') + e;
    case 4675:
      return ze + e + Ct + 'flex-line-pack' + Je(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return ze + e + Ct + Je(e, 'shrink', 'negative') + e;
    case 5292:
      return ze + e + Ct + Je(e, 'basis', 'preferred-size') + e;
    case 6060:
      return ze + 'box-' + Je(e, '-grow', '') + ze + e + Ct + Je(e, 'grow', 'positive') + e;
    case 4554:
      return ze + Je(e, /([^-])(transform)/g, '$1' + ze + '$2') + e;
    case 6187:
      return Je(Je(Je(e, /(zoom-|grab)/, ze + '$1'), /(image-set)/, ze + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return Je(e, /(image-set\([^]*)/, ze + '$1$`$1');
    case 4968:
      return (
        Je(
          Je(e, /(.+:)(flex-)?(.*)/, ze + 'box-pack:$3' + Ct + 'flex-pack:$3'),
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
      return Je(e, /(.+)-inline(.+)/, ze + '$1$2') + e;
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
        switch (yt(e, t + 1)) {
          case 109:
            if (yt(e, t + 4) !== 45) break;
          case 102:
            return (
              Je(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + ze + '$2-$3$1' + lr + (yt(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~gi(e, 'stretch') ? Hl(Je(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (yt(e, t + 1) !== 115) break;
    case 6444:
      switch (yt(e, nn(e) - 3 - (~gi(e, '!important') && 10))) {
        case 107:
          return Je(e, ':', ':' + ze) + e;
        case 101:
          return (
            Je(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                ze +
                (yt(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                ze +
                '$2$3$1' +
                Ct +
                '$2box$3',
            ) + e
          );
      }
      break;
    case 5936:
      switch (yt(e, t + 11)) {
        case 114:
          return ze + e + Ct + Je(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return ze + e + Ct + Je(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return ze + e + Ct + Je(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return ze + e + Ct + e + e;
  }
  return e;
}
var wp = function (t, o, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Vi:
          t.return = Hl(t.value, t.length);
          break;
        case Fl:
          return Jn([ho(t, { value: Je(t.value, '@', '@' + ze) })], i);
        case Bi:
          if (t.length)
            return rp(t.props, function (a) {
              switch (op(a, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Jn([ho(t, { props: [Je(a, /:(read-\w+)/, ':' + lr + '$1')] })], i);
                case '::placeholder':
                  return Jn(
                    [
                      ho(t, { props: [Je(a, /:(plac\w+)/, ':' + ze + 'input-$1')] }),
                      ho(t, { props: [Je(a, /:(plac\w+)/, ':' + lr + '$1')] }),
                      ho(t, { props: [Je(a, /:(plac\w+)/, Ct + 'input-$1')] }),
                    ],
                    i,
                  );
              }
              return '';
            });
      }
  },
  Sp = [wp],
  Rp = function (t) {
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
    var i = t.stylisPlugins || Sp;
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
        document.querySelectorAll('style[data-emotion^="' + o + ' "]'),
        function (b) {
          for (var m = b.getAttribute('data-emotion').split(' '), k = 1; k < m.length; k++)
            a[m[k]] = !0;
          l.push(b);
        },
      );
    var c,
      u = [yp, xp];
    process.env.NODE_ENV !== 'production' &&
      u.push(
        Op({
          get compat() {
            return x.compat;
          },
        }),
        kp,
      );
    {
      var d,
        p = [
          fp,
          process.env.NODE_ENV !== 'production'
            ? function (b) {
                b.root ||
                  (b.return
                    ? d.insert(b.return)
                    : b.value && b.type !== Fi && d.insert(b.value + '{}'));
              }
            : hp(function (b) {
                d.insert(b);
              }),
        ],
        h = mp(u.concat(i, p)),
        v = function (m) {
          return Jn(dp(m), h);
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
      sheet: new Zd({
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
  xi = { exports: {} },
  Ye = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xa;
function Np() {
  if (Xa) return Ye;
  Xa = 1;
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
    (Ye.AsyncMode = c),
    (Ye.ConcurrentMode = u),
    (Ye.ContextConsumer = l),
    (Ye.ContextProvider = s),
    (Ye.Element = t),
    (Ye.ForwardRef = d),
    (Ye.Fragment = r),
    (Ye.Lazy = x),
    (Ye.Memo = v),
    (Ye.Portal = o),
    (Ye.Profiler = a),
    (Ye.StrictMode = i),
    (Ye.Suspense = p),
    (Ye.isAsyncMode = function (f) {
      return E(f) || C(f) === c;
    }),
    (Ye.isConcurrentMode = E),
    (Ye.isContextConsumer = function (f) {
      return C(f) === l;
    }),
    (Ye.isContextProvider = function (f) {
      return C(f) === s;
    }),
    (Ye.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (Ye.isForwardRef = function (f) {
      return C(f) === d;
    }),
    (Ye.isFragment = function (f) {
      return C(f) === r;
    }),
    (Ye.isLazy = function (f) {
      return C(f) === x;
    }),
    (Ye.isMemo = function (f) {
      return C(f) === v;
    }),
    (Ye.isPortal = function (f) {
      return C(f) === o;
    }),
    (Ye.isProfiler = function (f) {
      return C(f) === a;
    }),
    (Ye.isStrictMode = function (f) {
      return C(f) === i;
    }),
    (Ye.isSuspense = function (f) {
      return C(f) === p;
    }),
    (Ye.isValidElementType = function (f) {
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
    (Ye.typeOf = C),
    Ye
  );
}
var Ge = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ja;
function $p() {
  return (
    Ja ||
      ((Ja = 1),
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
              typeof P == 'function' ||
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
            z = v,
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
          function V(P) {
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
          (Ge.AsyncMode = f),
            (Ge.ConcurrentMode = S),
            (Ge.ContextConsumer = w),
            (Ge.ContextProvider = j),
            (Ge.Element = L),
            (Ge.ForwardRef = D),
            (Ge.Fragment = I),
            (Ge.Lazy = q),
            (Ge.Memo = z),
            (Ge.Portal = A),
            (Ge.Profiler = F),
            (Ge.StrictMode = B),
            (Ge.Suspense = te),
            (Ge.isAsyncMode = W),
            (Ge.isConcurrentMode = R),
            (Ge.isContextConsumer = V),
            (Ge.isContextProvider = Z),
            (Ge.isElement = G),
            (Ge.isForwardRef = H),
            (Ge.isFragment = re),
            (Ge.isLazy = ie),
            (Ge.isMemo = Q),
            (Ge.isPortal = se),
            (Ge.isProfiler = le),
            (Ge.isStrictMode = he),
            (Ge.isSuspense = ae),
            (Ge.isValidElementType = C),
            (Ge.typeOf = E);
        })()),
    Ge
  );
}
process.env.NODE_ENV === 'production' ? (xi.exports = Np()) : (xi.exports = $p());
var Pp = xi.exports,
  ql = Pp,
  Ip = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 },
  _p = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },
  Yl = {};
Yl[ql.ForwardRef] = Ip;
Yl[ql.Memo] = _p;
var Mp = !0;
function Ui(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (i) {
      e[i] !== void 0 ? t.push(e[i] + ';') : (r += i + ' ');
    }),
    r
  );
}
var Tr = function (t, o, r) {
    var i = t.key + '-' + o.name;
    (r === !1 || Mp === !1) && t.registered[i] === void 0 && (t.registered[i] = o.styles);
  },
  kr = function (t, o, r) {
    Tr(t, o, r);
    var i = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var a = o;
      do t.insert(o === a ? '.' + i : '', a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  };
function Ap(e) {
  for (var t = 0, o, r = 0, i = e.length; i >= 4; ++r, i -= 4)
    (o =
      (e.charCodeAt(r) & 255) |
      ((e.charCodeAt(++r) & 255) << 8) |
      ((e.charCodeAt(++r) & 255) << 16) |
      ((e.charCodeAt(++r) & 255) << 24)),
      (o = (o & 65535) * 1540483477 + (((o >>> 16) * 59797) << 16)),
      (o ^= o >>> 24),
      (t =
        ((o & 65535) * 1540483477 + (((o >>> 16) * 59797) << 16)) ^
        ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
  switch (i) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      (t ^= e.charCodeAt(r) & 255), (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16));
  }
  return (
    (t ^= t >>> 13),
    (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
    ((t ^ (t >>> 15)) >>> 0).toString(36)
  );
}
var Dp = {
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
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  Za = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Lp =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  jp = /[A-Z]|^ms/g,
  Gl = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Wi = function (t) {
    return t.charCodeAt(1) === 45;
  },
  Qa = function (t) {
    return t != null && typeof t != 'boolean';
  },
  oi = jl(function (e) {
    return Wi(e) ? e : e.replace(jp, '-$&').toLowerCase();
  }),
  cr = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(Gl, function (r, i, a) {
            return (Yt = { name: i, styles: a, next: Yt }), i;
          });
    }
    return Dp[t] !== 1 && !Wi(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var Fp =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    Bp = ['normal', 'none', 'initial', 'inherit', 'unset'],
    Vp = cr,
    zp = /^-ms-/,
    Up = /-(.)/g,
    es = {};
  cr = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (Bp.indexOf(o) === -1 &&
          !Fp.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = Vp(t, o);
    return (
      r !== '' &&
        !Wi(t) &&
        t.indexOf('-') !== -1 &&
        es[t] === void 0 &&
        ((es[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(zp, 'ms-').replace(Up, function (i, a) {
              return a.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var Kl =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function Ao(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(Kl);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1) return (Yt = { name: o.name, styles: o.styles, next: Yt }), o.name;
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; ) (Yt = { name: r.name, styles: r.styles, next: Yt }), (r = r.next);
        var i = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (i += o.map), i;
      }
      return Wp(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var a = Yt,
          s = o(e);
        return (Yt = a), Ao(e, t, s);
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
          c = o.replace(Gl, function (d, p, h) {
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
function Wp(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var i = 0; i < o.length; i++) r += Ao(e, t, o[i]) + ';';
  else
    for (var a in o) {
      var s = o[a];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += a + '{' + t[s] + '}')
          : Qa(s) && (r += oi(a) + ':' + cr(a, s) + ';');
      else {
        if (a === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(Kl);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) Qa(s[l]) && (r += oi(a) + ':' + cr(a, s[l]) + ';');
        else {
          var c = Ao(e, t, s);
          switch (a) {
            case 'animation':
            case 'animationName': {
              r += oi(a) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && a === 'undefined' && console.error(Lp),
                (r += a + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var ts = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  Xl;
process.env.NODE_ENV !== 'production' &&
  (Xl = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var Yt,
  no = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      a = '';
    Yt = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((i = !1), (a += Ao(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(Za),
        (a += s[0]));
    for (var l = 1; l < t.length; l++)
      (a += Ao(r, o, t[l])),
        i &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(Za),
          (a += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (a = a.replace(Xl, function (h) {
        return (c = h), '';
      })),
      (ts.lastIndex = 0);
    for (var u = '', d; (d = ts.exec(a)) !== null; ) u += '-' + d[1];
    var p = Ap(a) + u;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: p,
          styles: a,
          map: c,
          next: Yt,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : { name: p, styles: a, next: Yt };
  },
  Hp = function (t) {
    return t();
  },
  Jl = y['useInsertionEffect'] ? y['useInsertionEffect'] : !1,
  Hi = Jl || Hp,
  ns = Jl || Te.useLayoutEffect,
  qp = {}.hasOwnProperty,
  qi = Te.createContext(typeof HTMLElement < 'u' ? Rp({ key: 'css' }) : null);
process.env.NODE_ENV !== 'production' && (qi.displayName = 'EmotionCacheContext');
qi.Provider;
var wr = function (t) {
    return Te.forwardRef(function (o, r) {
      var i = Te.useContext(qi);
      return t(o, i, r);
    });
  },
  Bo = Te.createContext({});
process.env.NODE_ENV !== 'production' && (Bo.displayName = 'EmotionThemeContext');
var os = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  rs = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  Yp = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      Tr(o, r, i),
      Hi(function () {
        return kr(o, r, i);
      }),
      null
    );
  },
  Gp = wr(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[os],
      a = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = Ui(t.registered, a, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = no(a, void 0, Te.useContext(Bo));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[rs];
      c && (l = no([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var u = {};
    for (var d in e)
      qp.call(e, d) &&
        d !== 'css' &&
        d !== os &&
        (process.env.NODE_ENV === 'production' || d !== rs) &&
        (u[d] = e[d]);
    return (
      (u.ref = o),
      (u.className = s),
      Te.createElement(
        Te.Fragment,
        null,
        Te.createElement(Yp, { cache: t, serialized: l, isStringTag: typeof i == 'string' }),
        Te.createElement(i, u),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (Gp.displayName = 'EmotionCssPropInternal');
var Kp = {
    name: '@emotion/react',
    version: '11.10.6',
    main: 'dist/emotion-react.cjs.js',
    module: 'dist/emotion-react.esm.js',
    browser: { './dist/emotion-react.esm.js': './dist/emotion-react.browser.esm.js' },
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
    scripts: { 'test:typescript': 'dtslint types' },
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
    peerDependencies: { react: '>=16.8.0' },
    peerDependenciesMeta: { '@types/react': { optional: !0 } },
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
    publishConfig: { access: 'public' },
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
        extra: { './types/css-prop': './types/css-prop.d.ts', './macro': './macro.js' },
      },
    },
  },
  is = !1,
  Zl = wr(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !is &&
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (is = !0));
    var o = e.styles,
      r = no([o], void 0, Te.useContext(Bo)),
      i = Te.useRef();
    return (
      ns(
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
      ns(
        function () {
          var a = i.current,
            s = a[0],
            l = a[1];
          if (l) {
            a[1] = !1;
            return;
          }
          if ((r.next !== void 0 && kr(t, r.next, !0), s.tags.length)) {
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
process.env.NODE_ENV !== 'production' && (Zl.displayName = 'EmotionGlobal');
function Xp() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return no(t);
}
var Yi = function () {
    var t = Xp.apply(void 0, arguments),
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
  Jp = function e(t) {
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
function Zp(e, t, o) {
  var r = [],
    i = Ui(e, r, o);
  return r.length < 2 ? o : i + t(r);
}
var Qp = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      Hi(function () {
        for (var i = 0; i < r.length; i++) kr(o, r[i], !1);
      }),
      null
    );
  },
  ef = wr(function (e, t) {
    var o = !1,
      r = [],
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        var h = no(d, t.registered);
        return r.push(h), Tr(t, h, !1), t.key + '-' + h.name;
      },
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        return Zp(t.registered, i, Jp(d));
      },
      s = { css: i, cx: a, theme: Te.useContext(Bo) },
      l = e.children(s);
    return (
      (o = !0),
      Te.createElement(Te.Fragment, null, Te.createElement(Qp, { cache: t, serializedArr: r }), l)
    );
  });
process.env.NODE_ENV !== 'production' && (ef.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var as = !0,
    tf = typeof jest < 'u' || typeof vi < 'u';
  if (as && !tf) {
    var ss = typeof globalThis < 'u' ? globalThis : as ? window : global,
      ls = '__EMOTION_REACT_' + Kp.version.split('.')[0] + '__';
    ss[ls] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (ss[ls] = !0);
  }
}
var nf = Kd,
  of = function (t) {
    return t !== 'theme';
  },
  cs = function (t) {
    return typeof t == 'string' && t.charCodeAt(0) > 96 ? nf : of;
  },
  us = function (t, o, r) {
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
  ds = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  rf = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      Tr(o, r, i),
      Hi(function () {
        return kr(o, r, i);
      }),
      null
    );
  },
  af = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      i = (r && t.__emotion_base) || t,
      a,
      s;
    o !== void 0 && ((a = o.label), (s = o.target));
    var l = us(t, o, r),
      c = l || cs(i),
      u = !c('as');
    return function () {
      var d = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((a !== void 0 && p.push('label:' + a + ';'), d[0] == null || d[0].raw === void 0))
        p.push.apply(p, d);
      else {
        process.env.NODE_ENV !== 'production' && d[0][0] === void 0 && console.error(ds),
          p.push(d[0][0]);
        for (var h = d.length, v = 1; v < h; v++)
          process.env.NODE_ENV !== 'production' && d[0][v] === void 0 && console.error(ds),
            p.push(d[v], d[0][v]);
      }
      var x = wr(function (b, m, k) {
        var T = (u && b.as) || i,
          C = '',
          E = [],
          f = b;
        if (b.theme == null) {
          f = {};
          for (var S in b) f[S] = b[S];
          f.theme = Te.useContext(Bo);
        }
        typeof b.className == 'string'
          ? (C = Ui(m.registered, E, b.className))
          : b.className != null && (C = b.className + ' ');
        var w = no(p.concat(E), m.registered, f);
        (C += m.key + '-' + w.name), s !== void 0 && (C += ' ' + s);
        var j = u && l === void 0 ? cs(T) : c,
          L = {};
        for (var D in b) (u && D === 'as') || (j(D) && (L[D] = b[D]));
        return (
          (L.className = C),
          (L.ref = k),
          Te.createElement(
            Te.Fragment,
            null,
            Te.createElement(rf, { cache: m, serialized: w, isStringTag: typeof T == 'string' }),
            Te.createElement(T, L),
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
          return e(b, g({}, o, m, { shouldForwardProp: us(x, m, !0) })).apply(void 0, p);
        }),
        x
      );
    };
  };
const sf = af;
var lf = [
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
  Ei = sf.bind();
lf.forEach(function (e) {
  Ei[e] = Ei(e);
});
const cf = Ei;
function uf(e) {
  return e == null || Object.keys(e).length === 0;
}
function Ql(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return _(Zl, { styles: typeof t == 'function' ? (i) => t(uf(i) ? o : i) : t });
}
process.env.NODE_ENV !== 'production' &&
  (Ql.propTypes = { defaultTheme: n.object, styles: n.oneOfType([n.string, n.object, n.func]) });
/**
 * @mui/styled-engine v5.11.11
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function df(e, t) {
  const o = cf(e, t);
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
const pf = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  ff =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  Tn = ff;
function ko(e, t) {
  return t ? Bt(e, t, { clone: !1 }) : e;
}
const Gi = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  ps = { keys: ['xs', 'sm', 'md', 'lg', 'xl'], up: (e) => `@media (min-width:${Gi[e]}px)` };
function Dt(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || ps;
    return t.reduce((s, l, c) => ((s[a.up(a.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const a = r.breakpoints || ps;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || Gi).indexOf(l) !== -1) {
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
function mf(e = {}) {
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
function hf(e, t) {
  return e.reduce((o, r) => {
    const i = o[r];
    return (!i || Object.keys(i).length === 0) && delete o[r], o;
  }, t);
}
function bf(e, t) {
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
function Sr({ values: e, breakpoints: t, base: o }) {
  const r = o || bf(e, t),
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
function Rr(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((i, a) => (i && i[a] ? i[a] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, i) => (r && r[i] != null ? r[i] : null), e);
}
function ur(e, t, o, r = o) {
  let i;
  return (
    typeof e == 'function' ? (i = e(o)) : Array.isArray(e) ? (i = e[o] || r) : (i = Rr(e, o) || r),
    t && (i = t(i, r, e)),
    i
  );
}
function et(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: i } = e,
    a = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        u = Rr(c, r) || {};
      return Dt(s, l, (p) => {
        let h = ur(u, i, p);
        return (
          p === h &&
            typeof p == 'string' &&
            (h = ur(u, i, `${t}${p === 'default' ? '' : J(p)}`, p)),
          o === !1 ? h : { [o]: h }
        );
      });
    };
  return (
    (a.propTypes = process.env.NODE_ENV !== 'production' ? { [t]: Tn } : {}),
    (a.filterProps = [t]),
    a
  );
}
function Nr(...e) {
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
function gf(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const vf = { m: 'margin', p: 'padding' },
  yf = { t: 'Top', r: 'Right', b: 'Bottom', l: 'Left', x: ['Left', 'Right'], y: ['Top', 'Bottom'] },
  fs = { marginX: 'mx', marginY: 'my', paddingX: 'px', paddingY: 'py' },
  xf = gf((e) => {
    if (e.length > 2)
      if (fs[e]) e = fs[e];
      else return [e];
    const [t, o] = e.split(''),
      r = vf[t],
      i = yf[o] || '';
    return Array.isArray(i) ? i.map((a) => r + a) : [r + i];
  }),
  $r = [
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
  Pr = [
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
  Ef = [...$r, ...Pr];
function Vo(e, t, o, r) {
  var i;
  const a = (i = Rr(e, t, !1)) != null ? i : o;
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
function ec(e) {
  return Vo(e, 'spacing', 8, 'spacing');
}
function zo(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function Cf(e, t) {
  return (o) => e.reduce((r, i) => ((r[i] = zo(t, o)), r), {});
}
function Of(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const i = xf(o),
    a = Cf(i, r),
    s = e[o];
  return Dt(e, s, a);
}
function tc(e, t) {
  const o = ec(e.theme);
  return Object.keys(e)
    .map((r) => Of(e, t, r, o))
    .reduce(ko, {});
}
function lt(e) {
  return tc(e, $r);
}
lt.propTypes =
  process.env.NODE_ENV !== 'production' ? $r.reduce((e, t) => ((e[t] = Tn), e), {}) : {};
lt.filterProps = $r;
function ct(e) {
  return tc(e, Pr);
}
ct.propTypes =
  process.env.NODE_ENV !== 'production' ? Pr.reduce((e, t) => ((e[t] = Tn), e), {}) : {};
ct.filterProps = Pr;
process.env.NODE_ENV !== 'production' && Ef.reduce((e, t) => ((e[t] = Tn), e), {});
function on(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Tf = et({ prop: 'border', themeKey: 'borders', transform: on }),
  kf = et({ prop: 'borderTop', themeKey: 'borders', transform: on }),
  wf = et({ prop: 'borderRight', themeKey: 'borders', transform: on }),
  Sf = et({ prop: 'borderBottom', themeKey: 'borders', transform: on }),
  Rf = et({ prop: 'borderLeft', themeKey: 'borders', transform: on }),
  Nf = et({ prop: 'borderColor', themeKey: 'palette' }),
  $f = et({ prop: 'borderTopColor', themeKey: 'palette' }),
  Pf = et({ prop: 'borderRightColor', themeKey: 'palette' }),
  If = et({ prop: 'borderBottomColor', themeKey: 'palette' }),
  _f = et({ prop: 'borderLeftColor', themeKey: 'palette' }),
  Ir = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = Vo(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({ borderRadius: zo(t, r) });
      return Dt(e, e.borderRadius, o);
    }
    return null;
  };
Ir.propTypes = process.env.NODE_ENV !== 'production' ? { borderRadius: Tn } : {};
Ir.filterProps = ['borderRadius'];
Nr(Tf, kf, wf, Sf, Rf, Nf, $f, Pf, If, _f, Ir);
const _r = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Vo(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({ gap: zo(t, r) });
    return Dt(e, e.gap, o);
  }
  return null;
};
_r.propTypes = process.env.NODE_ENV !== 'production' ? { gap: Tn } : {};
_r.filterProps = ['gap'];
const Mr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Vo(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({ columnGap: zo(t, r) });
    return Dt(e, e.columnGap, o);
  }
  return null;
};
Mr.propTypes = process.env.NODE_ENV !== 'production' ? { columnGap: Tn } : {};
Mr.filterProps = ['columnGap'];
const Ar = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Vo(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({ rowGap: zo(t, r) });
    return Dt(e, e.rowGap, o);
  }
  return null;
};
Ar.propTypes = process.env.NODE_ENV !== 'production' ? { rowGap: Tn } : {};
Ar.filterProps = ['rowGap'];
const Mf = et({ prop: 'gridColumn' }),
  Af = et({ prop: 'gridRow' }),
  Df = et({ prop: 'gridAutoFlow' }),
  Lf = et({ prop: 'gridAutoColumns' }),
  jf = et({ prop: 'gridAutoRows' }),
  Ff = et({ prop: 'gridTemplateColumns' }),
  Bf = et({ prop: 'gridTemplateRows' }),
  Vf = et({ prop: 'gridTemplateAreas' }),
  zf = et({ prop: 'gridArea' });
Nr(_r, Mr, Ar, Mf, Af, Df, Lf, jf, Ff, Bf, Vf, zf);
function Zn(e, t) {
  return t === 'grey' ? t : e;
}
const Uf = et({ prop: 'color', themeKey: 'palette', transform: Zn }),
  Wf = et({ prop: 'bgcolor', cssProperty: 'backgroundColor', themeKey: 'palette', transform: Zn }),
  Hf = et({ prop: 'backgroundColor', themeKey: 'palette', transform: Zn });
Nr(Uf, Wf, Hf);
function _t(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const qf = et({ prop: 'width', transform: _t }),
  Ki = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, i, a;
        return {
          maxWidth:
            ((r = e.theme) == null || (i = r.breakpoints) == null || (a = i.values) == null
              ? void 0
              : a[o]) ||
            Gi[o] ||
            _t(o),
        };
      };
      return Dt(e, e.maxWidth, t);
    }
    return null;
  };
Ki.filterProps = ['maxWidth'];
const Yf = et({ prop: 'minWidth', transform: _t }),
  Gf = et({ prop: 'height', transform: _t }),
  Kf = et({ prop: 'maxHeight', transform: _t }),
  Xf = et({ prop: 'minHeight', transform: _t });
et({ prop: 'size', cssProperty: 'width', transform: _t });
et({ prop: 'size', cssProperty: 'height', transform: _t });
const Jf = et({ prop: 'boxSizing' });
Nr(qf, Ki, Yf, Gf, Kf, Xf, Jf);
const ri = (e) => (t) => {
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
        return s || (s = r), { [e]: s };
      };
      return Dt(t, t[e], o);
    }
    return null;
  },
  Zf = {
    border: { themeKey: 'borders', transform: on },
    borderTop: { themeKey: 'borders', transform: on },
    borderRight: { themeKey: 'borders', transform: on },
    borderBottom: { themeKey: 'borders', transform: on },
    borderLeft: { themeKey: 'borders', transform: on },
    borderColor: { themeKey: 'palette' },
    borderTopColor: { themeKey: 'palette' },
    borderRightColor: { themeKey: 'palette' },
    borderBottomColor: { themeKey: 'palette' },
    borderLeftColor: { themeKey: 'palette' },
    borderRadius: { themeKey: 'shape.borderRadius', style: Ir },
    color: { themeKey: 'palette', transform: Zn },
    bgcolor: { themeKey: 'palette', cssProperty: 'backgroundColor', transform: Zn },
    backgroundColor: { themeKey: 'palette', transform: Zn },
    p: { style: ct },
    pt: { style: ct },
    pr: { style: ct },
    pb: { style: ct },
    pl: { style: ct },
    px: { style: ct },
    py: { style: ct },
    padding: { style: ct },
    paddingTop: { style: ct },
    paddingRight: { style: ct },
    paddingBottom: { style: ct },
    paddingLeft: { style: ct },
    paddingX: { style: ct },
    paddingY: { style: ct },
    paddingInline: { style: ct },
    paddingInlineStart: { style: ct },
    paddingInlineEnd: { style: ct },
    paddingBlock: { style: ct },
    paddingBlockStart: { style: ct },
    paddingBlockEnd: { style: ct },
    m: { style: lt },
    mt: { style: lt },
    mr: { style: lt },
    mb: { style: lt },
    ml: { style: lt },
    mx: { style: lt },
    my: { style: lt },
    margin: { style: lt },
    marginTop: { style: lt },
    marginRight: { style: lt },
    marginBottom: { style: lt },
    marginLeft: { style: lt },
    marginX: { style: lt },
    marginY: { style: lt },
    marginInline: { style: lt },
    marginInlineStart: { style: lt },
    marginInlineEnd: { style: lt },
    marginBlock: { style: lt },
    marginBlockStart: { style: lt },
    marginBlockEnd: { style: lt },
    displayPrint: { cssProperty: !1, transform: (e) => ({ '@media print': { display: e } }) },
    display: {},
    overflow: {},
    textOverflow: {},
    visibility: {},
    whiteSpace: {},
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
    gap: { style: _r },
    rowGap: { style: Ar },
    columnGap: { style: Mr },
    gridColumn: {},
    gridRow: {},
    gridAutoFlow: {},
    gridAutoColumns: {},
    gridAutoRows: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {},
    gridArea: {},
    position: {},
    zIndex: { themeKey: 'zIndex' },
    top: {},
    right: {},
    bottom: {},
    left: {},
    boxShadow: { themeKey: 'shadows' },
    width: { transform: _t },
    maxWidth: { style: Ki },
    minWidth: { transform: _t },
    height: { transform: _t },
    maxHeight: { transform: _t },
    minHeight: { transform: _t },
    boxSizing: {},
    fontFamily: { themeKey: 'typography', style: ri('fontFamily') },
    fontSize: { themeKey: 'typography', style: ri('fontSize') },
    fontStyle: { themeKey: 'typography' },
    fontWeight: { themeKey: 'typography', style: ri('fontWeight') },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: { cssProperty: !1, themeKey: 'typography' },
  },
  Dr = Zf;
function Qf(...e) {
  const t = e.reduce((r, i) => r.concat(Object.keys(i)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function em(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function tm() {
  function e(o, r, i, a) {
    const s = { [o]: r, theme: i },
      l = a[o];
    if (!l) return { [o]: r };
    const { cssProperty: c = o, themeKey: u, transform: d, style: p } = l;
    if (r == null) return null;
    const h = Rr(i, u) || {};
    return p
      ? p(s)
      : Dt(s, r, (x) => {
          let b = ur(h, d, x);
          return (
            x === b &&
              typeof x == 'string' &&
              (b = ur(h, d, `${o}${x === 'default' ? '' : J(x)}`, x)),
            c === !1 ? b : { [c]: b }
          );
        });
  }
  function t(o) {
    var r;
    const { sx: i, theme: a = {} } = o || {};
    if (!i) return null;
    const s = (r = a.unstable_sxConfig) != null ? r : Dr;
    function l(c) {
      let u = c;
      if (typeof c == 'function') u = c(a);
      else if (typeof c != 'object') return c;
      if (!u) return null;
      const d = mf(a.breakpoints),
        p = Object.keys(d);
      let h = d;
      return (
        Object.keys(u).forEach((v) => {
          const x = em(u[v], a);
          if (x != null)
            if (typeof x == 'object')
              if (s[v]) h = ko(h, e(v, x, a, s));
              else {
                const b = Dt({ theme: a }, x, (m) => ({ [v]: m }));
                Qf(b, x) ? (h[v] = t({ sx: x, theme: a })) : (h = ko(h, b));
              }
            else h = ko(h, e(v, x, a, s));
        }),
        hf(p, h)
      );
    }
    return Array.isArray(i) ? i.map(l) : l(i);
  }
  return t;
}
const nc = tm();
nc.filterProps = ['sx'];
const Xi = nc,
  nm = ['sx'],
  om = (e) => {
    var t, o;
    const r = { systemProps: {}, otherProps: {} },
      i = (t = e == null || (o = e.theme) == null ? void 0 : o.unstable_sxConfig) != null ? t : Dr;
    return (
      Object.keys(e).forEach((a) => {
        i[a] ? (r.systemProps[a] = e[a]) : (r.otherProps[a] = e[a]);
      }),
      r
    );
  };
function rm(e) {
  const { sx: t } = e,
    o = ye(e, nm),
    { systemProps: r, otherProps: i } = om(o);
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
    g({}, i, { sx: a })
  );
}
function oc(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = oc(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function ve() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = oc(e)) && (r && (r += ' '), (r += t));
  return r;
}
const im = ['values', 'unit', 'step'],
  am = (e) => {
    const t = Object.keys(e).map((o) => ({ key: o, val: e[o] })) || [];
    return t.sort((o, r) => o.val - r.val), t.reduce((o, r) => g({}, o, { [r.key]: r.val }), {});
  };
function sm(e) {
  const {
      values: t = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: o = 'px',
      step: r = 5,
    } = e,
    i = ye(e, im),
    a = am(t),
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
  return g({ keys: s, values: a, up: l, down: c, between: u, only: d, not: p, unit: o }, i);
}
const lm = { borderRadius: 4 },
  cm = lm;
function um(e = 8) {
  if (e.mui) return e;
  const t = ec({ spacing: e }),
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
const dm = ['breakpoints', 'palette', 'spacing', 'shape'];
function Ji(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: i, shape: a = {} } = e,
    s = ye(e, dm),
    l = sm(o),
    c = um(i);
  let u = Bt(
    {
      breakpoints: l,
      direction: 'ltr',
      components: {},
      palette: g({ mode: 'light' }, r),
      spacing: c,
      shape: g({}, cm, a),
    },
    s,
  );
  return (
    (u = t.reduce((d, p) => Bt(d, p), u)),
    (u.unstable_sxConfig = g({}, Dr, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return Xi({ sx: p, theme: this });
    }),
    u
  );
}
const rc = y.createContext(null);
process.env.NODE_ENV !== 'production' && (rc.displayName = 'ThemeContext');
const pm = rc;
function fm() {
  const e = y.useContext(pm);
  return process.env.NODE_ENV !== 'production' && y.useDebugValue(e), e;
}
function mm(e) {
  return Object.keys(e).length === 0;
}
function ic(e = null) {
  const t = fm();
  return !t || mm(t) ? e : t;
}
const hm = Ji();
function ac(e = hm) {
  return ic(e);
}
const bm = ['variant'];
function ms(e) {
  return e.length === 0;
}
function sc(e) {
  const { variant: t } = e,
    o = ye(e, bm);
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((i) => {
        i === 'color'
          ? (r += ms(r) ? e[i] : J(e[i]))
          : (r += `${ms(r) ? i : J(i)}${J(e[i].toString())}`);
      }),
    r
  );
}
const gm = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'],
  vm = ['theme'],
  ym = ['theme'];
function bo(e) {
  return Object.keys(e).length === 0;
}
function xm(e) {
  return typeof e == 'string' && e.charCodeAt(0) > 96;
}
const Em = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Cm = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((i) => {
        const a = sc(i.props);
        r[a] = i.style;
      }),
      r
    );
  },
  Om = (e, t, o, r) => {
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
            d && l.push(t[sc(u.props)]);
        }),
      l
    );
  };
function wo(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Tm = Ji(),
  km = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function wm(e = {}) {
  const { defaultTheme: t = Tm, rootShouldForwardProp: o = wo, slotShouldForwardProp: r = wo } = e,
    i = (a) => {
      const s = bo(a.theme) ? t : a.theme;
      return Xi(g({}, a, { theme: s }));
    };
  return (
    (i.__mui_systemSx = !0),
    (a, s = {}) => {
      pf(a, (C) => C.filter((E) => !(E != null && E.__mui_systemSx)));
      const { name: l, slot: c, skipVariantsResolver: u, skipSx: d, overridesResolver: p } = s,
        h = ye(s, gm),
        v = u !== void 0 ? u : (c && c !== 'Root') || !1,
        x = d || !1;
      let b;
      process.env.NODE_ENV !== 'production' && l && (b = `${l}-${km(c || 'Root')}`);
      let m = wo;
      c === 'Root' ? (m = o) : c ? (m = r) : xm(a) && (m = void 0);
      const k = df(a, g({ shouldForwardProp: m, label: b }, h)),
        T = (C, ...E) => {
          const f = E
            ? E.map((L) =>
                typeof L == 'function' && L.__emotion_real !== L
                  ? (D) => {
                      let { theme: I } = D,
                        q = ye(D, vm);
                      return L(g({ theme: bo(I) ? t : I }, q));
                    }
                  : L,
              )
            : [];
          let S = C;
          l &&
            p &&
            f.push((L) => {
              const D = bo(L.theme) ? t : L.theme,
                I = Em(l, D);
              if (I) {
                const q = {};
                return (
                  Object.entries(I).forEach(([z, A]) => {
                    q[z] = typeof A == 'function' ? A(g({}, L, { theme: D })) : A;
                  }),
                  p(L, q)
                );
              }
              return null;
            }),
            l &&
              !v &&
              f.push((L) => {
                const D = bo(L.theme) ? t : L.theme;
                return Om(L, Cm(l, D), D, l);
              }),
            x || f.push(i);
          const w = f.length - E.length;
          if (Array.isArray(C) && w > 0) {
            const L = new Array(w).fill('');
            (S = [...C, ...L]), (S.raw = [...C.raw, ...L]);
          } else
            typeof C == 'function' &&
              C.__emotion_real !== C &&
              (S = (L) => {
                let { theme: D } = L,
                  I = ye(L, ym);
                return C(g({ theme: bo(D) ? t : D }, I));
              });
          const j = k(S, ...f);
          if (process.env.NODE_ENV !== 'production') {
            let L;
            l && (L = `${l}${c || ''}`),
              L === void 0 && (L = `Styled(${kd(a)})`),
              (j.displayName = L);
          }
          return j;
        };
      return k.withConfig && (T.withConfig = k.withConfig), T;
    }
  );
}
function Sm(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : ji(t.components[o].defaultProps, r);
}
function Rm({ props: e, name: t, defaultTheme: o }) {
  const r = ac(o);
  return Sm({ theme: r, name: t, props: e });
}
function Zi(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function Nm(e) {
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
function Ln(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return Ln(Nm(e));
  const t = e.indexOf('('),
    o = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(o) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : On(9, e),
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
          : On(10, i),
      );
  } else r = r.split(',');
  return (r = r.map((a) => parseFloat(a))), { type: o, values: r, colorSpace: i };
}
function Lr(e) {
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
function $m(e) {
  e = Ln(e);
  const { values: t } = e,
    o = t[0],
    r = t[1] / 100,
    i = t[2] / 100,
    a = r * Math.min(i, 1 - i),
    s = (u, d = (u + o / 30) % 12) => i - a * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = 'rgb';
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === 'hsla' && ((l += 'a'), c.push(t[3])), Lr({ type: l, values: c });
}
function Ci(e) {
  e = Ln(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? Ln($m(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function hs(e, t) {
  const o = Ci(e),
    r = Ci(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function Ze(e, t) {
  return (
    (e = Ln(e)),
    (t = Zi(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    Lr(e)
  );
}
function jr(e, t) {
  if (((e = Ln(e)), (t = Zi(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return Lr(e);
}
function Fr(e, t) {
  if (((e = Ln(e)), (t = Zi(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return Lr(e);
}
function Pm(e, t = 0.15) {
  return Ci(e) > 0.5 ? jr(e, t) : Fr(e, t);
}
function Im(e, t) {
  return g(
    {
      toolbar: {
        minHeight: 56,
        [e.up('xs')]: { '@media (orientation: landscape)': { minHeight: 48 } },
        [e.up('sm')]: { minHeight: 64 },
      },
    },
    t,
  );
}
const _m = ['mode', 'contrastThreshold', 'tonalOffset'],
  bs = {
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: { paper: Io.white, default: Io.white },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  ii = {
    text: {
      primary: Io.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: { paper: '#121212', default: '#121212' },
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
function gs(e, t, o, r) {
  const i = r.light || r,
    a = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = Fr(e.main, i))
      : t === 'dark' && (e.dark = jr(e.main, a)));
}
function Mm(e = 'light') {
  return e === 'dark'
    ? { main: qn[200], light: qn[50], dark: qn[400] }
    : { main: qn[700], light: qn[400], dark: qn[800] };
}
function Am(e = 'light') {
  return e === 'dark'
    ? { main: Hn[200], light: Hn[50], dark: Hn[400] }
    : { main: Hn[500], light: Hn[300], dark: Hn[700] };
}
function Dm(e = 'light') {
  return e === 'dark'
    ? { main: Wn[500], light: Wn[300], dark: Wn[700] }
    : { main: Wn[700], light: Wn[400], dark: Wn[800] };
}
function Lm(e = 'light') {
  return e === 'dark'
    ? { main: Yn[400], light: Yn[300], dark: Yn[700] }
    : { main: Yn[700], light: Yn[500], dark: Yn[900] };
}
function jm(e = 'light') {
  return e === 'dark'
    ? { main: Gn[400], light: Gn[300], dark: Gn[700] }
    : { main: Gn[800], light: Gn[500], dark: Gn[900] };
}
function Fm(e = 'light') {
  return e === 'dark'
    ? { main: mo[400], light: mo[300], dark: mo[700] }
    : { main: '#ed6c02', light: mo[500], dark: mo[900] };
}
function Bm(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2 } = e,
    i = ye(e, _m),
    a = e.primary || Mm(t),
    s = e.secondary || Am(t),
    l = e.error || Dm(t),
    c = e.info || Lm(t),
    u = e.success || jm(t),
    d = e.warning || Fm(t);
  function p(b) {
    const m = hs(b, ii.text.primary) >= o ? ii.text.primary : bs.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const k = hs(b, m);
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
            : On(11, m ? ` (${m})` : '', k),
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
            : On(12, m ? ` (${m})` : '', JSON.stringify(b.main)),
        );
      return (
        gs(b, 'light', T, r), gs(b, 'dark', C, r), b.contrastText || (b.contrastText = p(b.main)), b
      );
    },
    v = { dark: ii, light: bs };
  return (
    process.env.NODE_ENV !== 'production' &&
      (v[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    Bt(
      g(
        {
          common: g({}, Io),
          mode: t,
          primary: h({ color: a, name: 'primary' }),
          secondary: h({
            color: s,
            name: 'secondary',
            mainShade: 'A400',
            lightShade: 'A200',
            darkShade: 'A700',
          }),
          error: h({ color: l, name: 'error' }),
          warning: h({ color: d, name: 'warning' }),
          info: h({ color: c, name: 'info' }),
          success: h({ color: u, name: 'success' }),
          grey: sd,
          contrastThreshold: o,
          getContrastText: p,
          augmentColor: h,
          tonalOffset: r,
        },
        v[t],
      ),
      i,
    )
  );
}
const Vm = [
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
function zm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const vs = { textTransform: 'uppercase' },
  ys = '"Roboto", "Helvetica", "Arial", sans-serif';
function Um(e, t) {
  const o = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: r = ys,
      fontSize: i = 14,
      fontWeightLight: a = 300,
      fontWeightRegular: s = 400,
      fontWeightMedium: l = 500,
      fontWeightBold: c = 700,
      htmlFontSize: u = 16,
      allVariants: d,
      pxToRem: p,
    } = o,
    h = ye(o, Vm);
  process.env.NODE_ENV !== 'production' &&
    (typeof i != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof u != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const v = i / 14,
    x = p || ((k) => `${(k / u) * v}rem`),
    b = (k, T, C, E, f) =>
      g(
        { fontFamily: r, fontWeight: k, fontSize: x(T), lineHeight: C },
        r === ys ? { letterSpacing: `${zm(E / T)}em` } : {},
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
      button: b(l, 14, 1.75, 0.4, vs),
      caption: b(s, 12, 1.66, 0.4),
      overline: b(s, 12, 2.66, 1, vs),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return Bt(
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
    { clone: !1 },
  );
}
const Wm = 0.2,
  Hm = 0.14,
  qm = 0.12;
function it(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Wm})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Hm})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${qm})`,
  ].join(',');
}
const Ym = [
    'none',
    it(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    it(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    it(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    it(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    it(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    it(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    it(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    it(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    it(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    it(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    it(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    it(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    it(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    it(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    it(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    it(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    it(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    it(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    it(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    it(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    it(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    it(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    it(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    it(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  Gm = Ym,
  Km = ['duration', 'easing', 'delay'],
  Xm = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  Jm = {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  };
function xs(e) {
  return `${Math.round(e)}ms`;
}
function Zm(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Qm(e) {
  const t = g({}, Xm, e.easing),
    o = g({}, Jm, e.duration);
  return g(
    {
      getAutoHeightDuration: Zm,
      create: (i = ['all'], a = {}) => {
        const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0 } = a,
          u = ye(a, Km);
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
              `${d} ${typeof s == 'string' ? s : xs(s)} ${l} ${typeof c == 'string' ? c : xs(c)}`,
          )
          .join(',');
      },
    },
    e,
    { easing: t, duration: o },
  );
}
const eh = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  th = eh,
  nh = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function oh(e = {}, ...t) {
  const { mixins: o = {}, palette: r = {}, transitions: i = {}, typography: a = {} } = e,
    s = ye(e, nh);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : On(18),
    );
  const l = Bm(r),
    c = Ji(e);
  let u = Bt(c, {
    mixins: Im(c.breakpoints, o),
    palette: l,
    shadows: Gm.slice(),
    typography: Um(l, a),
    transitions: Qm(i),
    zIndex: g({}, th),
  });
  if (
    ((u = Bt(u, s)), (u = t.reduce((d, p) => Bt(d, p), u)), process.env.NODE_ENV !== 'production')
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
              const m = Pe('', x);
              console.error(
                [
                  `MUI: The \`${v}\` component increases the CSS specificity of the \`${x}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(h, null, 2),
                  '',
                  `Instead, you need to use the '&.${m}' syntax:`,
                  JSON.stringify({ root: { [`&.${m}`]: b } }, null, 2),
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
    (u.unstable_sxConfig = g({}, Dr, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return Xi({ sx: p, theme: this });
    }),
    u
  );
}
const rh = oh(),
  Br = rh;
function hn() {
  const e = ac(Br);
  return process.env.NODE_ENV !== 'production' && y.useDebugValue(e), e;
}
function De({ props: e, name: t }) {
  return Rm({ props: e, name: t, defaultTheme: Br });
}
const Wt = (e) => wo(e) && e !== 'classes',
  Qi = wo,
  ih = wm({ defaultTheme: Br, rootShouldForwardProp: Wt }),
  ce = ih,
  ah = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  Es = ah;
function Cn(e) {
  return typeof e == 'string';
}
function sh(e, t, o) {
  return e === void 0 || Cn(e) ? t : g({}, t, { ownerState: g({}, t.ownerState, o) });
}
const lh = { disableDefaultClasses: !1 },
  ch = y.createContext(lh);
function lc(e) {
  const { disableDefaultClasses: t } = y.useContext(ch);
  return (o) => (t ? '' : e(o));
}
function cc(e, t = []) {
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
function Oi(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Cs(e) {
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
function uh(e) {
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
      { props: b, internalRef: void 0 }
    );
  }
  const s = cc(g({}, i, r)),
    l = Cs(r),
    c = Cs(i),
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
    { props: h, internalRef: u.ref }
  );
}
const dh = ['elementType', 'externalSlotProps', 'ownerState'];
function jt(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: i } = e,
    a = ye(e, dh),
    s = Oi(r, i),
    { props: l, internalRef: c } = uh(g({}, a, { externalSlotProps: s })),
    u = dt(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return sh(o, g({}, l, { ref: u }), i);
}
function Os(e) {
  return e.substring(2).toLowerCase();
}
function ph(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function dr(e) {
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
  const d = dt(t.ref, l),
    p = Ot((x) => {
      const b = u.current;
      u.current = !1;
      const m = ut(l.current);
      if (!c.current || !l.current || ('clientX' in x && ph(x, m))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let k;
      x.composedPath
        ? (k = x.composedPath().indexOf(l.current) > -1)
        : (k = !m.documentElement.contains(x.target) || l.current.contains(x.target)),
        !k && (o || !b) && i(x);
    }),
    h = (x) => (b) => {
      u.current = !0;
      const m = t.props[x];
      m && m(b);
    },
    v = { ref: d };
  return (
    a !== !1 && (v[a] = h(a)),
    y.useEffect(() => {
      if (a !== !1) {
        const x = Os(a),
          b = ut(l.current),
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
        const x = Os(r),
          b = ut(l.current);
        return (
          b.addEventListener(x, p),
          () => {
            b.removeEventListener(x, p);
          }
        );
      }
    }, [p, r]),
    _(y.Fragment, { children: y.cloneElement(t, v) })
  );
}
process.env.NODE_ENV !== 'production' &&
  (dr.propTypes = {
    children: Fn.isRequired,
    disableReactTree: n.bool,
    mouseEvent: n.oneOf([
      'onClick',
      'onMouseDown',
      'onMouseUp',
      'onPointerDown',
      'onPointerUp',
      !1,
    ]),
    onClickAway: n.func.isRequired,
    touchEvent: n.oneOf(['onTouchEnd', 'onTouchStart', !1]),
  });
process.env.NODE_ENV !== 'production' && (dr['propTypes'] = Di(dr.propTypes));
const fh = [
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
function mh(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function hh(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function bh(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || hh(e));
}
function gh(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(fh)).forEach((r, i) => {
      const a = mh(r);
      a === -1 ||
        !bh(r) ||
        (a === 0 ? t.push(r) : o.push({ documentOrder: i, tabIndex: a, node: r }));
    }),
    o
      .sort((r, i) =>
        r.tabIndex === i.tabIndex ? r.documentOrder - i.documentOrder : r.tabIndex - i.tabIndex,
      )
      .map((r) => r.node)
      .concat(t)
  );
}
function vh() {
  return !0;
}
function pr(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: i = !1,
      getTabbable: a = gh,
      isEnabled: s = vh,
      open: l,
    } = e,
    c = y.useRef(!1),
    u = y.useRef(null),
    d = y.useRef(null),
    p = y.useRef(null),
    h = y.useRef(null),
    v = y.useRef(!1),
    x = y.useRef(null),
    b = dt(t.ref, x),
    m = y.useRef(null);
  y.useEffect(() => {
    !l || !x.current || (v.current = !o);
  }, [o, l]),
    y.useEffect(() => {
      if (!l || !x.current) return;
      const C = ut(x.current);
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
      const C = ut(x.current),
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
                  z = I[0],
                  A = I[I.length - 1];
                typeof z != 'string' && typeof A != 'string' && (q ? A.focus() : z.focus());
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
  return Qe(y.Fragment, {
    children: [
      _('div', { tabIndex: l ? 0 : -1, onFocus: T, ref: u, 'data-testid': 'sentinelStart' }),
      y.cloneElement(t, { ref: b, onFocus: k }),
      _('div', { tabIndex: l ? 0 : -1, onFocus: T, ref: d, 'data-testid': 'sentinelEnd' }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (pr.propTypes = {
    children: Fn,
    disableAutoFocus: n.bool,
    disableEnforceFocus: n.bool,
    disableRestoreFocus: n.bool,
    getTabbable: n.func,
    isEnabled: n.func,
    open: n.bool.isRequired,
  });
process.env.NODE_ENV !== 'production' && (pr['propTypes'] = Di(pr.propTypes));
var St = 'top',
  zt = 'bottom',
  Ut = 'right',
  Rt = 'left',
  Vr = 'auto',
  Uo = [St, zt, Ut, Rt],
  oo = 'start',
  Do = 'end',
  yh = 'clippingParents',
  uc = 'viewport',
  go = 'popper',
  xh = 'reference',
  Ts = Uo.reduce(function (e, t) {
    return e.concat([t + '-' + oo, t + '-' + Do]);
  }, []),
  dc = [].concat(Uo, [Vr]).reduce(function (e, t) {
    return e.concat([t, t + '-' + oo, t + '-' + Do]);
  }, []),
  Eh = 'beforeRead',
  Ch = 'read',
  Oh = 'afterRead',
  Th = 'beforeMain',
  kh = 'main',
  wh = 'afterMain',
  Sh = 'beforeWrite',
  Rh = 'write',
  Nh = 'afterWrite',
  Ti = [Eh, Ch, Oh, Th, kh, wh, Sh, Rh, Nh];
function sn(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function Ht(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function jn(e) {
  var t = Ht(e).Element;
  return e instanceof t || e instanceof Element;
}
function At(e) {
  var t = Ht(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ea(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Ht(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function $h(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      i = t.attributes[o] || {},
      a = t.elements[o];
    !At(a) ||
      !sn(a) ||
      (Object.assign(a.style, r),
      Object.keys(i).forEach(function (s) {
        var l = i[s];
        l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function Ph(e) {
  var t = e.state,
    o = {
      popper: { position: t.options.strategy, left: '0', top: '0', margin: '0' },
      arrow: { position: 'absolute' },
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
        !At(i) ||
          !sn(i) ||
          (Object.assign(i.style, l),
          Object.keys(a).forEach(function (c) {
            i.removeAttribute(c);
          }));
      });
    }
  );
}
const Ih = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: $h,
  effect: Ph,
  requires: ['computeStyles'],
};
function Xt(e) {
  return e.split('-')[0];
}
var Dn = Math.max,
  fr = Math.min,
  ro = Math.round;
function ki() {
  var e = navigator.userAgentData;
  return e != null && e.brands
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function pc() {
  return !/^((?!chrome|android).)*safari/i.test(ki());
}
function io(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    i = 1,
    a = 1;
  t &&
    At(e) &&
    ((i = (e.offsetWidth > 0 && ro(r.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && ro(r.height) / e.offsetHeight) || 1));
  var s = jn(e) ? Ht(e) : window,
    l = s.visualViewport,
    c = !pc() && o,
    u = (r.left + (c && l ? l.offsetLeft : 0)) / i,
    d = (r.top + (c && l ? l.offsetTop : 0)) / a,
    p = r.width / i,
    h = r.height / a;
  return { width: p, height: h, top: d, right: u + p, bottom: d + h, left: u, x: u, y: d };
}
function ta(e) {
  var t = io(e),
    o = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - o) <= 1 && (o = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: o, height: r }
  );
}
function fc(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && ea(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Zt(e) {
  return Ht(e).getComputedStyle(e);
}
function _h(e) {
  return ['table', 'td', 'th'].indexOf(sn(e)) >= 0;
}
function kn(e) {
  return ((jn(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function zr(e) {
  return sn(e) === 'html' ? e : e.assignedSlot || e.parentNode || (ea(e) ? e.host : null) || kn(e);
}
function ks(e) {
  return !At(e) || Zt(e).position === 'fixed' ? null : e.offsetParent;
}
function Mh(e) {
  var t = /firefox/i.test(ki()),
    o = /Trident/i.test(ki());
  if (o && At(e)) {
    var r = Zt(e);
    if (r.position === 'fixed') return null;
  }
  var i = zr(e);
  for (ea(i) && (i = i.host); At(i) && ['html', 'body'].indexOf(sn(i)) < 0; ) {
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
function Wo(e) {
  for (var t = Ht(e), o = ks(e); o && _h(o) && Zt(o).position === 'static'; ) o = ks(o);
  return o && (sn(o) === 'html' || (sn(o) === 'body' && Zt(o).position === 'static'))
    ? t
    : o || Mh(e) || t;
}
function na(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function So(e, t, o) {
  return Dn(e, fr(t, o));
}
function Ah(e, t, o) {
  var r = So(e, t, o);
  return r > o ? o : r;
}
function mc() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function hc(e) {
  return Object.assign({}, mc(), e);
}
function bc(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var Dh = function (t, o) {
  return (
    (t = typeof t == 'function' ? t(Object.assign({}, o.rects, { placement: o.placement })) : t),
    hc(typeof t != 'number' ? t : bc(t, Uo))
  );
};
function Lh(e) {
  var t,
    o = e.state,
    r = e.name,
    i = e.options,
    a = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = Xt(o.placement),
    c = na(l),
    u = [Rt, Ut].indexOf(l) >= 0,
    d = u ? 'height' : 'width';
  if (!(!a || !s)) {
    var p = Dh(i.padding, o),
      h = ta(a),
      v = c === 'y' ? St : Rt,
      x = c === 'y' ? zt : Ut,
      b = o.rects.reference[d] + o.rects.reference[c] - s[c] - o.rects.popper[d],
      m = s[c] - o.rects.reference[c],
      k = Wo(a),
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
function jh(e) {
  var t = e.state,
    o = e.options,
    r = o.element,
    i = r === void 0 ? '[data-popper-arrow]' : r;
  if (i != null && !(typeof i == 'string' && ((i = t.elements.popper.querySelector(i)), !i))) {
    if (
      (process.env.NODE_ENV !== 'production' &&
        (At(i) ||
          console.error(
            [
              'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
              'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
              'the arrow.',
            ].join(' '),
          )),
      !fc(t.elements.popper, i))
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
const Fh = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: Lh,
  effect: jh,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function ao(e) {
  return e.split('-')[1];
}
var Bh = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
function Vh(e) {
  var t = e.x,
    o = e.y,
    r = window,
    i = r.devicePixelRatio || 1;
  return { x: ro(t * i) / i || 0, y: ro(o * i) / i || 0 };
}
function ws(e) {
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
    m = typeof d == 'function' ? d({ x: v, y: b }) : { x: v, y: b };
  (v = m.x), (b = m.y);
  var k = s.hasOwnProperty('x'),
    T = s.hasOwnProperty('y'),
    C = Rt,
    E = St,
    f = window;
  if (u) {
    var S = Wo(o),
      w = 'clientHeight',
      j = 'clientWidth';
    if (
      (S === Ht(o) &&
        ((S = kn(o)),
        Zt(S).position !== 'static' &&
          l === 'absolute' &&
          ((w = 'scrollHeight'), (j = 'scrollWidth'))),
      (S = S),
      i === St || ((i === Rt || i === Ut) && a === Do))
    ) {
      E = zt;
      var L = p && S === f && f.visualViewport ? f.visualViewport.height : S[w];
      (b -= L - r.height), (b *= c ? 1 : -1);
    }
    if (i === Rt || ((i === St || i === zt) && a === Do)) {
      C = Ut;
      var D = p && S === f && f.visualViewport ? f.visualViewport.width : S[j];
      (v -= D - r.width), (v *= c ? 1 : -1);
    }
  }
  var I = Object.assign({ position: l }, u && Bh),
    q = d === !0 ? Vh({ x: v, y: b }) : { x: v, y: b };
  if (((v = q.x), (b = q.y), c)) {
    var z;
    return Object.assign(
      {},
      I,
      ((z = {}),
      (z[E] = T ? '0' : ''),
      (z[C] = k ? '0' : ''),
      (z.transform =
        (f.devicePixelRatio || 1) <= 1
          ? 'translate(' + v + 'px, ' + b + 'px)'
          : 'translate3d(' + v + 'px, ' + b + 'px, 0)'),
      z),
    );
  }
  return Object.assign(
    {},
    I,
    ((t = {}), (t[E] = T ? b + 'px' : ''), (t[C] = k ? v + 'px' : ''), (t.transform = ''), t),
  );
}
function zh(e) {
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
    variation: ao(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      ws(
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
        ws(
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
const Uh = { name: 'computeStyles', enabled: !0, phase: 'beforeWrite', fn: zh, data: {} };
var Yo = { passive: !0 };
function Wh(e) {
  var t = e.state,
    o = e.instance,
    r = e.options,
    i = r.scroll,
    a = i === void 0 ? !0 : i,
    s = r.resize,
    l = s === void 0 ? !0 : s,
    c = Ht(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      u.forEach(function (d) {
        d.addEventListener('scroll', o.update, Yo);
      }),
    l && c.addEventListener('resize', o.update, Yo),
    function () {
      a &&
        u.forEach(function (d) {
          d.removeEventListener('scroll', o.update, Yo);
        }),
        l && c.removeEventListener('resize', o.update, Yo);
    }
  );
}
const Hh = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: Wh,
  data: {},
};
var qh = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function ir(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return qh[t];
  });
}
var Yh = { start: 'end', end: 'start' };
function Ss(e) {
  return e.replace(/start|end/g, function (t) {
    return Yh[t];
  });
}
function oa(e) {
  var t = Ht(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return { scrollLeft: o, scrollTop: r };
}
function ra(e) {
  return io(kn(e)).left + oa(e).scrollLeft;
}
function Gh(e, t) {
  var o = Ht(e),
    r = kn(e),
    i = o.visualViewport,
    a = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (i) {
    (a = i.width), (s = i.height);
    var u = pc();
    (u || (!u && t === 'fixed')) && ((l = i.offsetLeft), (c = i.offsetTop));
  }
  return { width: a, height: s, x: l + ra(e), y: c };
}
function Kh(e) {
  var t,
    o = kn(e),
    r = oa(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = Dn(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
    s = Dn(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
    l = -r.scrollLeft + ra(e),
    c = -r.scrollTop;
  return (
    Zt(i || o).direction === 'rtl' && (l += Dn(o.clientWidth, i ? i.clientWidth : 0) - a),
    { width: a, height: s, x: l, y: c }
  );
}
function ia(e) {
  var t = Zt(e),
    o = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function gc(e) {
  return ['html', 'body', '#document'].indexOf(sn(e)) >= 0
    ? e.ownerDocument.body
    : At(e) && ia(e)
    ? e
    : gc(zr(e));
}
function Ro(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = gc(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    a = Ht(r),
    s = i ? [a].concat(a.visualViewport || [], ia(r) ? r : []) : r,
    l = t.concat(s);
  return i ? l : l.concat(Ro(zr(s)));
}
function wi(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Xh(e, t) {
  var o = io(e, !1, t === 'fixed');
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
function Rs(e, t, o) {
  return t === uc ? wi(Gh(e, o)) : jn(t) ? Xh(t, o) : wi(Kh(kn(e)));
}
function Jh(e) {
  var t = Ro(zr(e)),
    o = ['absolute', 'fixed'].indexOf(Zt(e).position) >= 0,
    r = o && At(e) ? Wo(e) : e;
  return jn(r)
    ? t.filter(function (i) {
        return jn(i) && fc(i, r) && sn(i) !== 'body';
      })
    : [];
}
function Zh(e, t, o, r) {
  var i = t === 'clippingParents' ? Jh(e) : [].concat(t),
    a = [].concat(i, [o]),
    s = a[0],
    l = a.reduce(function (c, u) {
      var d = Rs(e, u, r);
      return (
        (c.top = Dn(d.top, c.top)),
        (c.right = fr(d.right, c.right)),
        (c.bottom = fr(d.bottom, c.bottom)),
        (c.left = Dn(d.left, c.left)),
        c
      );
    }, Rs(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function vc(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    i = r ? Xt(r) : null,
    a = r ? ao(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (i) {
    case St:
      c = { x: s, y: t.y - o.height };
      break;
    case zt:
      c = { x: s, y: t.y + t.height };
      break;
    case Ut:
      c = { x: t.x + t.width, y: l };
      break;
    case Rt:
      c = { x: t.x - o.width, y: l };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var u = i ? na(i) : null;
  if (u != null) {
    var d = u === 'y' ? 'height' : 'width';
    switch (a) {
      case oo:
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
    c = l === void 0 ? yh : l,
    u = o.rootBoundary,
    d = u === void 0 ? uc : u,
    p = o.elementContext,
    h = p === void 0 ? go : p,
    v = o.altBoundary,
    x = v === void 0 ? !1 : v,
    b = o.padding,
    m = b === void 0 ? 0 : b,
    k = hc(typeof m != 'number' ? m : bc(m, Uo)),
    T = h === go ? xh : go,
    C = e.rects.popper,
    E = e.elements[x ? T : h],
    f = Zh(jn(E) ? E : E.contextElement || kn(e.elements.popper), c, d, s),
    S = io(e.elements.reference),
    w = vc({ reference: S, element: C, strategy: 'absolute', placement: i }),
    j = wi(Object.assign({}, C, w)),
    L = h === go ? j : S,
    D = {
      top: f.top - L.top + k.top,
      bottom: L.bottom - f.bottom + k.bottom,
      left: f.left - L.left + k.left,
      right: L.right - f.right + k.right,
    },
    I = e.modifiersData.offset;
  if (h === go && I) {
    var q = I[i];
    Object.keys(D).forEach(function (z) {
      var A = [Ut, zt].indexOf(z) >= 0 ? 1 : -1,
        F = [St, zt].indexOf(z) >= 0 ? 'y' : 'x';
      D[z] += q[F] * A;
    });
  }
  return D;
}
function Qh(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = o.boundary,
    a = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    u = c === void 0 ? dc : c,
    d = ao(r),
    p = d
      ? l
        ? Ts
        : Ts.filter(function (x) {
            return ao(x) === d;
          })
      : Uo,
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
    return (x[b] = Lo(e, { placement: b, boundary: i, rootBoundary: a, padding: s })[Xt(b)]), x;
  }, {});
  return Object.keys(v).sort(function (x, b) {
    return v[x] - v[b];
  });
}
function eb(e) {
  if (Xt(e) === Vr) return [];
  var t = ir(e);
  return [Ss(e), t, Ss(t)];
}
function tb(e) {
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
        C = c || (T || !x ? [ir(m)] : eb(m)),
        E = [m].concat(C).reduce(function (H, re) {
          return H.concat(
            Xt(re) === Vr
              ? Qh(t, {
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
        w = new Map(),
        j = !0,
        L = E[0],
        D = 0;
      D < E.length;
      D++
    ) {
      var I = E[D],
        q = Xt(I),
        z = ao(I) === oo,
        A = [St, zt].indexOf(q) >= 0,
        F = A ? 'width' : 'height',
        B = Lo(t, { placement: I, boundary: d, rootBoundary: p, altBoundary: h, padding: u }),
        te = A ? (z ? Ut : Rt) : z ? zt : St;
      f[F] > S[F] && (te = ir(te));
      var U = ir(te),
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
          V = function (re) {
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
        var G = V(Z);
        if (G === 'break') break;
      }
    t.placement !== L && ((t.modifiersData[r]._skip = !0), (t.placement = L), (t.reset = !0));
  }
}
const nb = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: tb,
  requiresIfExists: ['offset'],
  data: { _skip: !1 },
};
function Ns(e, t, o) {
  return (
    o === void 0 && (o = { x: 0, y: 0 }),
    {
      top: e.top - t.height - o.y,
      right: e.right - t.width + o.x,
      bottom: e.bottom - t.height + o.y,
      left: e.left - t.width - o.x,
    }
  );
}
function $s(e) {
  return [St, Ut, zt, Rt].some(function (t) {
    return e[t] >= 0;
  });
}
function ob(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = Lo(t, { elementContext: 'reference' }),
    l = Lo(t, { altBoundary: !0 }),
    c = Ns(s, r),
    u = Ns(l, i, a),
    d = $s(c),
    p = $s(u);
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
const rb = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: ob,
};
function ib(e, t, o) {
  var r = Xt(e),
    i = [Rt, St].indexOf(r) >= 0 ? -1 : 1,
    a = typeof o == 'function' ? o(Object.assign({}, t, { placement: e })) : o,
    s = a[0],
    l = a[1];
  return (
    (s = s || 0), (l = (l || 0) * i), [Rt, Ut].indexOf(r) >= 0 ? { x: l, y: s } : { x: s, y: l }
  );
}
function ab(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.offset,
    a = i === void 0 ? [0, 0] : i,
    s = dc.reduce(function (d, p) {
      return (d[p] = ib(p, t.rects, a)), d;
    }, {}),
    l = s[t.placement],
    c = l.x,
    u = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = s);
}
const sb = { name: 'offset', enabled: !0, phase: 'main', requires: ['popperOffsets'], fn: ab };
function lb(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = vc({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const cb = { name: 'popperOffsets', enabled: !0, phase: 'read', fn: lb, data: {} };
function ub(e) {
  return e === 'x' ? 'y' : 'x';
}
function db(e) {
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
    m = Lo(t, { boundary: c, rootBoundary: u, padding: p, altBoundary: d }),
    k = Xt(t.placement),
    T = ao(t.placement),
    C = !T,
    E = na(k),
    f = ub(E),
    S = t.modifiersData.popperOffsets,
    w = t.rects.reference,
    j = t.rects.popper,
    L = typeof b == 'function' ? b(Object.assign({}, t.rects, { placement: t.placement })) : b,
    D =
      typeof L == 'number'
        ? { mainAxis: L, altAxis: L }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, L),
    I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    q = { x: 0, y: 0 };
  if (S) {
    if (a) {
      var z,
        A = E === 'y' ? St : Rt,
        F = E === 'y' ? zt : Ut,
        B = E === 'y' ? 'height' : 'width',
        te = S[E],
        U = te + m[A],
        W = te - m[F],
        R = v ? -j[B] / 2 : 0,
        V = T === oo ? w[B] : j[B],
        Z = T === oo ? -j[B] : -w[B],
        G = t.elements.arrow,
        H = v && G ? ta(G) : { width: 0, height: 0 },
        re = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : mc(),
        ie = re[A],
        Q = re[F],
        se = So(0, w[B], H[B]),
        le = C ? w[B] / 2 - R - se - ie - D.mainAxis : V - se - ie - D.mainAxis,
        he = C ? -w[B] / 2 + R + se + Q + D.mainAxis : Z + se + Q + D.mainAxis,
        ae = t.elements.arrow && Wo(t.elements.arrow),
        P = ae ? (E === 'y' ? ae.clientTop || 0 : ae.clientLeft || 0) : 0,
        Oe = (z = I == null ? void 0 : I[E]) != null ? z : 0,
        M = te + le - Oe - P,
        Y = te + he - Oe,
        Ie = So(v ? fr(U, M) : U, te, v ? Dn(W, Y) : W);
      (S[E] = Ie), (q[E] = Ie - te);
    }
    if (l) {
      var ge,
        tt = E === 'x' ? St : Rt,
        Ve = E === 'x' ? zt : Ut,
        we = S[f],
        Ne = f === 'y' ? 'height' : 'width',
        nt = we + m[tt],
        at = we - m[Ve],
        ee = [St, Rt].indexOf(k) !== -1,
        me = (ge = I == null ? void 0 : I[f]) != null ? ge : 0,
        xe = ee ? nt : we - w[Ne] - j[Ne] - me + D.altAxis,
        be = ee ? we + w[Ne] + j[Ne] - me - D.altAxis : at,
        fe = v && ee ? Ah(xe, we, be) : So(v ? xe : nt, we, v ? be : at);
      (S[f] = fe), (q[f] = fe - we);
    }
    t.modifiersData[r] = q;
  }
}
const pb = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: db,
  requiresIfExists: ['offset'],
};
function fb(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function mb(e) {
  return e === Ht(e) || !At(e) ? oa(e) : fb(e);
}
function hb(e) {
  var t = e.getBoundingClientRect(),
    o = ro(t.width) / e.offsetWidth || 1,
    r = ro(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function bb(e, t, o) {
  o === void 0 && (o = !1);
  var r = At(t),
    i = At(t) && hb(t),
    a = kn(t),
    s = io(e, i, o),
    l = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 };
  return (
    (r || (!r && !o)) &&
      ((sn(t) !== 'body' || ia(a)) && (l = mb(t)),
      At(t) ? ((c = io(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : a && (c.x = ra(a))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function gb(e) {
  var t = new Map(),
    o = new Set(),
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
function vb(e) {
  var t = gb(e);
  return Ti.reduce(function (o, r) {
    return o.concat(
      t.filter(function (i) {
        return i.phase === r;
      }),
    );
  }, []);
}
function yb(e) {
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
var Sn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  xb = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  Ps = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function Eb(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), Ps)
      .filter(function (o, r, i) {
        return i.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                yn(Sn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                yn(Sn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            Ti.indexOf(t.phase) < 0 &&
              console.error(
                yn(Sn, t.name, '"phase"', 'either ' + Ti.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(yn(Sn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(yn(Sn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                yn(Sn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                yn(
                  Sn,
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
                Ps.map(function (r) {
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
            }) == null && console.error(yn(xb, String(t.name), r, r));
          });
      });
  });
}
function Cb(e, t) {
  var o = new Set();
  return e.filter(function (r) {
    var i = t(r);
    if (!o.has(i)) return o.add(i), !0;
  });
}
function Ob(e) {
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
var Is =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Tb =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  _s = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
function Ms() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function kb(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    i = t.defaultOptions,
    a = i === void 0 ? _s : i;
  return function (l, c, u) {
    u === void 0 && (u = a);
    var d = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, _s, a),
        modifiersData: {},
        elements: { reference: l, popper: c },
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
              reference: jn(l) ? Ro(l) : l.contextElement ? Ro(l.contextElement) : [],
              popper: Ro(c),
            });
          var C = vb(Ob([].concat(r, d.options.modifiers)));
          if (
            ((d.orderedModifiers = C.filter(function (I) {
              return I.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var E = Cb([].concat(C, d.options.modifiers), function (I) {
              var q = I.name;
              return q;
            });
            if ((Eb(E), Xt(d.options.placement) === Vr)) {
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
        forceUpdate: function () {
          if (!h) {
            var k = d.elements,
              T = k.reference,
              C = k.popper;
            if (!Ms(T, C)) {
              process.env.NODE_ENV !== 'production' && console.error(Is);
              return;
            }
            (d.rects = { reference: bb(T, Wo(C), d.options.strategy === 'fixed'), popper: ta(C) }),
              (d.reset = !1),
              (d.placement = d.options.placement),
              d.orderedModifiers.forEach(function (I) {
                return (d.modifiersData[I.name] = Object.assign({}, I.data));
              });
            for (var E = 0, f = 0; f < d.orderedModifiers.length; f++) {
              if (process.env.NODE_ENV !== 'production' && ((E += 1), E > 100)) {
                console.error(Tb);
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
                (d = w({ state: d, options: L, name: D, instance: v }) || d);
            }
          }
        },
        update: yb(function () {
          return new Promise(function (m) {
            v.forceUpdate(), m(d);
          });
        }),
        destroy: function () {
          b(), (h = !0);
        },
      };
    if (!Ms(l, c)) return process.env.NODE_ENV !== 'production' && console.error(Is), v;
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
          var f = E({ state: d, name: k, instance: v, options: C }),
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
var wb = [Hh, cb, Uh, Ih, sb, nb, pb, Fh, rb],
  Sb = kb({ defaultModifiers: wb });
function Rb(e) {
  return typeof e == 'function' ? e() : e;
}
const mr = y.forwardRef(function (t, o) {
  const { children: r, container: i, disablePortal: a = !1 } = t,
    [s, l] = y.useState(null),
    c = dt(y.isValidElement(r) ? r.ref : null, o);
  if (
    (an(() => {
      a || l(Rb(i) || document.body);
    }, [i, a]),
    an(() => {
      if (s && !a)
        return (
          sr(o, s),
          () => {
            sr(o, null);
          }
        );
    }, [o, s, a]),
    a)
  ) {
    if (y.isValidElement(r)) {
      const u = { ref: c };
      return y.cloneElement(r, u);
    }
    return _(y.Fragment, { children: r });
  }
  return _(y.Fragment, { children: s && wl.createPortal(r, s) });
});
process.env.NODE_ENV !== 'production' &&
  (mr.propTypes = {
    children: n.node,
    container: n.oneOfType([Jt, n.func]),
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (mr['propTypes'] = Di(mr.propTypes));
const yc = mr;
function Nb(e) {
  return Pe('MuiPopper', e);
}
Re('MuiPopper', ['root']);
const $b = [
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
  Pb = [
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
function Ib(e, t) {
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
function hr(e) {
  return typeof e == 'function' ? e() : e;
}
function Ur(e) {
  return e.nodeType !== void 0;
}
function _b(e) {
  return !Ur(e);
}
const Mb = () => Me({ root: ['root'] }, lc(Nb)),
  Ab = {},
  Db = y.forwardRef(function (t, o) {
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
      T = ye(t, $b),
      C = y.useRef(null),
      E = dt(C, o),
      f = y.useRef(null),
      S = dt(f, x),
      w = y.useRef(S);
    an(() => {
      w.current = S;
    }, [S]),
      y.useImperativeHandle(x, () => f.current, []);
    const j = Ib(h, l),
      [L, D] = y.useState(j),
      [I, q] = y.useState(hr(i));
    y.useEffect(() => {
      f.current && f.current.forceUpdate();
    }),
      y.useEffect(() => {
        i && q(hr(i));
      }, [i]),
      an(() => {
        if (!I || !d) return;
        const te = (R) => {
          D(R.placement);
        };
        if (process.env.NODE_ENV !== 'production' && I && Ur(I) && I.nodeType === 1) {
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
          { name: 'preventOverflow', options: { altBoundary: c } },
          { name: 'flip', options: { altBoundary: c } },
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
        const W = Sb(I, C.current, g({ placement: j }, v, { modifiers: U }));
        return (
          w.current(W),
          () => {
            W.destroy(), w.current(null);
          }
        );
      }, [I, c, u, d, v, j]);
    const z = { placement: L };
    k !== null && (z.TransitionProps = k);
    const A = Mb(),
      F = (r = s ?? m.root) != null ? r : 'div',
      B = jt({
        elementType: F,
        externalSlotProps: b.root,
        externalForwardedProps: T,
        additionalProps: { role: 'tooltip', ref: E },
        ownerState: g({}, t, p),
        className: A.root,
      });
    return _(F, g({}, B, { children: typeof a == 'function' ? a(z) : a }));
  }),
  xc = y.forwardRef(function (t, o) {
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
        popperOptions: h = Ab,
        popperRef: v,
        style: x,
        transition: b = !1,
        slotProps: m = {},
        slots: k = {},
      } = t,
      T = ye(t, Pb),
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
      const D = hr(r);
      w = D && Ur(D) ? ut(D).body : ut(null).body;
    }
    const j = !d && c && (!b || C) ? 'none' : void 0,
      L = b ? { in: d, onEnter: f, onExited: S } : void 0;
    return _(yc, {
      disablePortal: l,
      container: w,
      children: _(
        Db,
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
            style: g({ position: 'fixed', top: 0, left: 0, display: j }, x),
            TransitionProps: L,
            children: i,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (xc.propTypes = {
    anchorEl: Vt(n.oneOfType([Jt, n.object, n.func]), (e) => {
      if (e.open) {
        const t = hr(e.anchorEl);
        if (t && Ur(t) && t.nodeType === 1) {
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
          (_b(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    children: n.oneOfType([n.node, n.func]),
    container: n.oneOfType([Jt, n.func]),
    direction: n.oneOf(['ltr', 'rtl']),
    disablePortal: n.bool,
    keepMounted: n.bool,
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
    open: n.bool.isRequired,
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
    popperRef: $t,
    slotProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    slots: n.shape({ root: n.elementType }),
    style: n.object,
    transition: n.bool,
  });
const Lb = xc;
function jb(e) {
  const t = ut(e);
  return t.body === e
    ? mn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function No(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function As(e) {
  return parseInt(mn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Fb(e) {
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
function Ds(e, t, o, r, i) {
  const a = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1,
      c = !Fb(s);
    l && c && No(s, i);
  });
}
function ai(e, t) {
  let o = -1;
  return e.some((r, i) => (t(r) ? ((o = i), !0) : !1)), o;
}
function Bb(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (jb(r)) {
      const s = Al(ut(r));
      o.push({ value: r.style.paddingRight, property: 'padding-right', el: r }),
        (r.style.paddingRight = `${As(r) + s}px`);
      const l = ut(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({ value: c.style.paddingRight, property: 'padding-right', el: c }),
          (c.style.paddingRight = `${As(c) + s}px`);
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment) a = ut(r).body;
    else {
      const s = r.parentElement,
        l = mn(r);
      a =
        (s == null ? void 0 : s.nodeName) === 'HTML' && l.getComputedStyle(s).overflowY === 'scroll'
          ? s
          : r;
    }
    o.push(
      { value: a.style.overflow, property: 'overflow', el: a },
      { value: a.style.overflowX, property: 'overflow-x', el: a },
      { value: a.style.overflowY, property: 'overflow-y', el: a },
    ),
      (a.style.overflow = 'hidden');
  }
  return () => {
    o.forEach(({ value: a, el: s, property: l }) => {
      a ? s.style.setProperty(l, a) : s.style.removeProperty(l);
    });
  };
}
function Vb(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class zb {
  constructor() {
    (this.containers = void 0), (this.modals = void 0), (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && No(t.modalRef, !1);
    const i = Vb(o);
    Ds(o, t.mount, t.modalRef, i, !0);
    const a = ai(this.containers, (s) => s.container === o);
    return a !== -1
      ? (this.containers[a].modals.push(t), r)
      : (this.containers.push({ modals: [t], container: o, restore: null, hiddenSiblings: i }), r);
  }
  mount(t, o) {
    const r = ai(this.containers, (a) => a.modals.indexOf(t) !== -1),
      i = this.containers[r];
    i.restore || (i.restore = Bb(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const i = ai(this.containers, (s) => s.modals.indexOf(t) !== -1),
      a = this.containers[i];
    if ((a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0))
      a.restore && a.restore(),
        t.modalRef && No(t.modalRef, o),
        Ds(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1),
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
function Ub(e) {
  return Pe('MuiModal', e);
}
Re('MuiModal', ['root', 'hidden', 'backdrop']);
const Wb = [
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
  Hb = (e) => {
    const { open: t, exited: o } = e;
    return Me({ root: ['root', !t && o && 'hidden'], backdrop: ['backdrop'] }, lc(Ub));
  };
function qb(e) {
  return typeof e == 'function' ? e() : e;
}
function Yb(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const Gb = new zb(),
  Ec = y.forwardRef(function (t, o) {
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
        manager: k = Gb,
        onBackdropClick: T,
        onClose: C,
        onKeyDown: E,
        open: f,
        onTransitionEnter: S,
        onTransitionExited: w,
        slotProps: j = {},
        slots: L = {},
      } = t,
      D = ye(t, Wb),
      [I, q] = y.useState(!f),
      z = y.useRef({}),
      A = y.useRef(null),
      F = y.useRef(null),
      B = dt(F, o),
      te = Yb(a),
      U = (r = t['aria-hidden']) != null ? r : !0,
      W = () => ut(A.current),
      R = () => ((z.current.modalRef = F.current), (z.current.mountNode = A.current), z.current),
      V = () => {
        k.mount(R(), { disableScrollLock: x }), F.current && (F.current.scrollTop = 0);
      },
      Z = Ot(() => {
        const ge = qb(c) || W().body;
        k.add(R(), ge), F.current && V();
      }),
      G = y.useCallback(() => k.isTopModal(R()), [k]),
      H = Ot((ge) => {
        (A.current = ge), !(!ge || !F.current) && (f && G() ? V() : No(F.current, U));
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
      Q = Hb(ie),
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
      te && ((P.onEnter = Va(se, a.props.onEnter)), (P.onExited = Va(le, a.props.onExited)));
    const Oe = (i = l ?? L.root) != null ? i : 'div',
      M = jt({
        elementType: Oe,
        externalSlotProps: j.root,
        externalForwardedProps: D,
        additionalProps: { ref: B, role: 'presentation', onKeyDown: ae },
        className: Q.root,
        ownerState: ie,
      }),
      Y = L.backdrop,
      Ie = jt({
        elementType: Y,
        externalSlotProps: j.backdrop,
        additionalProps: { 'aria-hidden': !0, onClick: he, open: f },
        className: Q.backdrop,
        ownerState: ie,
      });
    return !m && !f && (!te || I)
      ? null
      : _(yc, {
          ref: H,
          container: c,
          disablePortal: h,
          children: Qe(
            Oe,
            g({}, M, {
              children: [
                !b && Y ? _(Y, g({}, Ie)) : null,
                _(pr, {
                  disableEnforceFocus: d,
                  disableAutoFocus: u,
                  disableRestoreFocus: v,
                  isEnabled: G,
                  open: f,
                  children: y.cloneElement(a, P),
                }),
              ],
            }),
          ),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (Ec.propTypes = {
    children: Fn.isRequired,
    closeAfterTransition: n.bool,
    component: n.elementType,
    container: n.oneOfType([Jt, n.func]),
    disableAutoFocus: n.bool,
    disableEnforceFocus: n.bool,
    disableEscapeKeyDown: n.bool,
    disablePortal: n.bool,
    disableRestoreFocus: n.bool,
    disableScrollLock: n.bool,
    hideBackdrop: n.bool,
    keepMounted: n.bool,
    onBackdropClick: n.func,
    onClose: n.func,
    onKeyDown: n.func,
    open: n.bool.isRequired,
    slotProps: n.shape({
      backdrop: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
    }),
    slots: n.shape({ backdrop: n.elementType, root: n.elementType }),
  });
const Kb = Ec,
  Xb = 2;
function Cc(e, t) {
  return e - t;
}
function vo(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function Ls(e, t) {
  var o;
  const { index: r } =
    (o = e.reduce((i, a, s) => {
      const l = Math.abs(t - a);
      return i === null || l < i.distance || l === i.distance ? { distance: l, index: s } : i;
    }, null)) != null
      ? o
      : {};
  return r;
}
function Go(e, t) {
  if (t.current !== void 0 && e.changedTouches) {
    const o = e;
    for (let r = 0; r < o.changedTouches.length; r += 1) {
      const i = o.changedTouches[r];
      if (i.identifier === t.current) return { x: i.clientX, y: i.clientY };
    }
    return !1;
  }
  return { x: e.clientX, y: e.clientY };
}
function br(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function Jb(e, t, o) {
  return (o - t) * e + t;
}
function Zb(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function Qb(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(Zb(t)));
}
function js({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(Cc);
}
function Ko({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, i;
  const a = ut(e.current);
  if (
    !((r = e.current) != null && r.contains(a.activeElement)) ||
    Number(a == null || (i = a.activeElement) == null ? void 0 : i.getAttribute('data-index')) !== t
  ) {
    var s;
    (s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  o && o(t);
}
const eg = {
    horizontal: { offset: (e) => ({ left: `${e}%` }), leap: (e) => ({ width: `${e}%` }) },
    'horizontal-reverse': {
      offset: (e) => ({ right: `${e}%` }),
      leap: (e) => ({ width: `${e}%` }),
    },
    vertical: { offset: (e) => ({ bottom: `${e}%` }), leap: (e) => ({ height: `${e}%` }) },
  },
  tg = (e) => e;
let Xo;
function si() {
  return (
    Xo === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Xo = CSS.supports('touch-action', 'none'))
        : (Xo = !0)),
    Xo
  );
}
function ng(e) {
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
      scale: x = tg,
      step: b = 1,
      tabIndex: m,
      value: k,
    } = e,
    T = y.useRef(),
    [C, E] = y.useState(-1),
    [f, S] = y.useState(-1),
    [w, j] = y.useState(!1),
    L = y.useRef(0),
    [D, I] = An({ controlled: k, default: o ?? c, name: 'Slider' }),
    q =
      d &&
      ((ee, me, xe) => {
        const be = ee.nativeEvent || ee,
          fe = new be.constructor(be.type, be);
        Object.defineProperty(fe, 'target', { writable: !0, value: { value: me, name: u } }),
          d(fe, me, xe);
      }),
    z = Array.isArray(D);
  let A = z ? D.slice().sort(Cc) : [D];
  A = A.map((ee) => vo(ee, c, l));
  const F =
      s === !0 && b !== null
        ? [...Array(Math.floor((l - c) / b) + 1)].map((ee, me) => ({ value: c + b * me }))
        : s || [],
    B = F.map((ee) => ee.value),
    { isFocusVisibleRef: te, onBlur: U, onFocus: W, ref: R } = Ml(),
    [V, Z] = y.useState(-1),
    G = y.useRef(),
    H = dt(R, G),
    re = dt(v, H),
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
    r && V !== -1 && Z(-1);
  const se = (ee) => (me) => {
      var xe;
      (xe = ee.onChange) == null || xe.call(ee, me);
      const be = Number(me.currentTarget.getAttribute('data-index')),
        fe = A[be],
        de = B.indexOf(fe);
      let ne = me.target.valueAsNumber;
      if (
        (F && b == null && (ne = ne < fe ? B[de - 1] : B[de + 1]),
        (ne = vo(ne, c, l)),
        F && b == null)
      ) {
        const Ee = B.indexOf(A[be]);
        ne = ne < A[be] ? B[Ee - 1] : B[Ee + 1];
      }
      if (z) {
        i && (ne = vo(ne, A[be - 1] || -1 / 0, A[be + 1] || 1 / 0));
        const Ee = ne;
        ne = js({ values: A, newValue: ne, index: be });
        let Ce = be;
        i || (Ce = ne.indexOf(Ee)), Ko({ sliderRef: G, activeIndex: Ce });
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
      if (((Ce = Jb(Ee, c, l)), b)) Ce = Qb(Ce, b, c);
      else {
        const st = Ls(B, Ce);
        Ce = B[st];
      }
      Ce = vo(Ce, c, l);
      let Ae = 0;
      if (z) {
        me ? (Ae = le.current) : (Ae = Ls(A, Ce)),
          i && (Ce = vo(Ce, A[Ae - 1] || -1 / 0, A[Ae + 1] || 1 / 0));
        const st = Ce;
        (Ce = js({ values: A, newValue: Ce, index: Ae })),
          (i && me) || ((Ae = Ce.indexOf(st)), (le.current = Ae));
      }
      return { newValue: Ce, activeIndex: Ae };
    },
    P = Ot((ee) => {
      const me = Go(ee, T);
      if (!me) return;
      if (((L.current += 1), ee.type === 'mousemove' && ee.buttons === 0)) {
        Oe(ee);
        return;
      }
      const { newValue: xe, activeIndex: be } = ae({ finger: me, move: !0 });
      Ko({ sliderRef: G, activeIndex: be, setActive: E }),
        I(xe),
        !w && L.current > Xb && j(!0),
        q && xe !== D && q(ee, xe, be);
    }),
    Oe = Ot((ee) => {
      const me = Go(ee, T);
      if ((j(!1), !me)) return;
      const { newValue: xe } = ae({ finger: me, move: !0 });
      E(-1), ee.type === 'touchend' && S(-1), p && p(ee, xe), (T.current = void 0), Y();
    }),
    M = Ot((ee) => {
      if (r) return;
      si() || ee.preventDefault();
      const me = ee.changedTouches[0];
      me != null && (T.current = me.identifier);
      const xe = Go(ee, T);
      if (xe !== !1) {
        const { newValue: fe, activeIndex: de } = ae({ finger: xe });
        Ko({ sliderRef: G, activeIndex: de, setActive: E }), I(fe), q && q(ee, fe, de);
      }
      L.current = 0;
      const be = ut(G.current);
      be.addEventListener('touchmove', P), be.addEventListener('touchend', Oe);
    }),
    Y = y.useCallback(() => {
      const ee = ut(G.current);
      ee.removeEventListener('mousemove', P),
        ee.removeEventListener('mouseup', Oe),
        ee.removeEventListener('touchmove', P),
        ee.removeEventListener('touchend', Oe);
    }, [Oe, P]);
  y.useEffect(() => {
    const { current: ee } = G;
    return (
      ee.addEventListener('touchstart', M, { passive: si() }),
      () => {
        ee.removeEventListener('touchstart', M, { passive: si() }), Y();
      }
    );
  }, [Y, M]),
    y.useEffect(() => {
      r && Y();
    }, [r, Y]);
  const Ie = (ee) => (me) => {
      var xe;
      if (
        ((xe = ee.onMouseDown) == null || xe.call(ee, me),
        r || me.defaultPrevented || me.button !== 0)
      )
        return;
      me.preventDefault();
      const be = Go(me, T);
      if (be !== !1) {
        const { newValue: de, activeIndex: ne } = ae({ finger: be });
        Ko({ sliderRef: G, activeIndex: ne, setActive: E }), I(de), q && q(me, de, ne);
      }
      L.current = 0;
      const fe = ut(G.current);
      fe.addEventListener('mousemove', P), fe.addEventListener('mouseup', Oe);
    },
    ge = br(z ? A[0] : c, c, l),
    tt = br(A[A.length - 1], c, l) - ge,
    Ve = (ee = {}) => {
      const me = { onMouseDown: Ie(ee || {}) },
        xe = g({}, ee, me);
      return g({ ref: re }, xe);
    },
    we = (ee) => (me) => {
      var xe;
      (xe = ee.onMouseOver) == null || xe.call(ee, me);
      const be = Number(me.currentTarget.getAttribute('data-index'));
      S(be);
    },
    Ne = (ee) => (me) => {
      var xe;
      (xe = ee.onMouseLeave) == null || xe.call(ee, me), S(-1);
    };
  return {
    active: C,
    axis: he,
    axisProps: eg,
    dragging: w,
    focusedThumbIndex: V,
    getHiddenInputProps: (ee = {}) => {
      var me;
      const xe = { onChange: se(ee || {}), onFocus: ie(ee || {}), onBlur: Q(ee || {}) },
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
        { style: g({}, Bd, { direction: a ? 'rtl' : 'ltr', width: '100%', height: '100%' }) },
      );
    },
    getRootProps: Ve,
    getThumbProps: (ee = {}) => {
      const me = { onMouseOver: we(ee || {}), onMouseLeave: Ne(ee || {}) };
      return g({}, ee, me);
    },
    marks: F,
    open: f,
    range: z,
    trackLeap: tt,
    trackOffset: ge,
    values: A,
  };
}
function og(e) {
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
  const c = Ot((T, C) => {
      r == null || r(T, C);
    }),
    u = Ot((T) => {
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
        const C = cc(e),
          E = g({}, C, T);
        return g({ ref: a, role: 'presentation' }, E, {
          onBlur: v(E),
          onFocus: x(E),
          onMouseEnter: b(E),
          onMouseLeave: m(E),
        });
      },
      onClickAway: d,
    }
  );
}
const rg = ['onChange', 'maxRows', 'minRows', 'style', 'value'];
function Jo(e) {
  return parseInt(e, 10) || 0;
}
const ig = {
  shadow: {
    visibility: 'hidden',
    position: 'absolute',
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    transform: 'translateZ(0)',
  },
};
function Fs(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const Oc = y.forwardRef(function (t, o) {
  const { onChange: r, maxRows: i, minRows: a = 1, style: s, value: l } = t,
    c = ye(t, rg),
    { current: u } = y.useRef(l != null),
    d = y.useRef(null),
    p = dt(o, d),
    h = y.useRef(null),
    v = y.useRef(0),
    [x, b] = y.useState({ outerHeightStyle: 0 }),
    m = y.useCallback(() => {
      const f = d.current,
        w = mn(f).getComputedStyle(f);
      if (w.width === '0px') return { outerHeightStyle: 0 };
      const j = h.current;
      (j.style.width = w.width),
        (j.value = f.value || t.placeholder || 'x'),
        j.value.slice(-1) ===
          `
` && (j.value += ' ');
      const L = w.boxSizing,
        D = Jo(w.paddingBottom) + Jo(w.paddingTop),
        I = Jo(w.borderBottomWidth) + Jo(w.borderTopWidth),
        q = j.scrollHeight;
      j.value = 'x';
      const z = j.scrollHeight;
      let A = q;
      a && (A = Math.max(Number(a) * z, A)),
        i && (A = Math.min(Number(i) * z, A)),
        (A = Math.max(A, z));
      const F = A + (L === 'border-box' ? D + I : 0),
        B = Math.abs(A - q) <= 1;
      return { outerHeightStyle: F, overflow: B };
    }, [i, a, t.placeholder]),
    k = (f, S) => {
      const { outerHeightStyle: w, overflow: j } = S;
      return v.current < 20 &&
        ((w > 0 && Math.abs((f.outerHeightStyle || 0) - w) > 1) || f.overflow !== j)
        ? ((v.current += 1), { overflow: j, outerHeightStyle: w })
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
      Fs(f) || b((S) => k(S, f));
    }, [m]),
    C = () => {
      const f = m();
      Fs(f) ||
        wl.flushSync(() => {
          b((S) => k(S, f));
        });
    };
  y.useEffect(() => {
    const f = Li(() => {
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
  return Qe(y.Fragment, {
    children: [
      _(
        'textarea',
        g(
          {
            value: l,
            onChange: E,
            ref: p,
            rows: a,
            style: g({ height: x.outerHeightStyle, overflow: x.overflow ? 'hidden' : void 0 }, s),
          },
          c,
        ),
      ),
      _('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: h,
        tabIndex: -1,
        style: g({}, ig.shadow, s, { padding: 0 }),
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (Oc.propTypes = {
    className: n.string,
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    onChange: n.func,
    placeholder: n.string,
    style: n.object,
    value: n.oneOfType([n.arrayOf(n.string), n.number, n.string]),
  });
const ag = Oc;
function Bs(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function sg(e = {}) {
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
    o && (d = d.toLowerCase()), t && (d = Bs(d));
    const p = d
      ? l.filter((h) => {
          let v = (a || u)(h);
          return (
            o && (v = v.toLowerCase()),
            t && (v = Bs(v)),
            i === 'start' ? v.indexOf(d) === 0 : v.indexOf(d) > -1
          );
        })
      : l;
    return typeof r == 'number' ? p.slice(0, r) : p;
  };
}
function li(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const lg = sg(),
  Vs = 5,
  cg = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function ug(e) {
  const {
      unstable_isActiveElementInListbox: t = cg,
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
      filterOptions: m = lg,
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
      onClose: z,
      onHighlightChange: A,
      onInputChange: F,
      onOpen: B,
      open: te,
      openOnFocus: U = !1,
      options: W,
      readOnly: R = !1,
      selectOnFocus: V = !e.freeSolo,
      value: Z,
    } = e,
    G = _l(w);
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
    [Y, Ie] = An({ controlled: Z, default: d, name: u }),
    [ge, tt] = An({ controlled: L, default: '', name: u, state: 'inputValue' }),
    [Ve, we] = y.useState(!1),
    Ne = y.useCallback(
      (N, $) => {
        if (!(I ? Y.length < $.length : $ !== null) && !l) return;
        let oe;
        if (I) oe = '';
        else if ($ == null) oe = '';
        else {
          const pe = H($);
          oe = typeof pe == 'string' ? pe : '';
        }
        ge !== oe && (tt(oe), F && F(N, oe, 'reset'));
      },
      [H, ge, I, F, tt, l, Y],
    ),
    [nt, at] = An({ controlled: te, default: !1, name: u, state: 'open' }),
    [ee, me] = y.useState(!0),
    xe = !I && Y != null && ge === H(Y),
    be = nt && !R,
    fe = be
      ? m(
          W.filter((N) => !(k && (I ? Y : [Y]).some(($) => $ !== null && D(N, $)))),
          { inputValue: xe && ee ? '' : ge, getOptionLabel: H },
        )
      : [],
    de = jd({ filteredOptions: fe, value: Y });
  y.useEffect(() => {
    const N = Y !== de.value;
    (Ve && !N) || (T && !N) || Ne(null, Y);
  }, [Y, Ne, Ve, de.value, T]);
  const ne = nt && fe.length > 0 && !R;
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
  const Ee = Ot((N) => {
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
  const Ae = Ot(({ event: N, index: $, reason: X = 'auto' }) => {
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
      const $e = se.current.querySelector(`[data-option-index="${$}"]`);
      if (
        $e &&
        ($e.classList.add(`${o}-focused`),
        X === 'keyboard' && $e.classList.add(`${o}-focusVisible`),
        pe.scrollHeight > pe.clientHeight && X !== 'mouse')
      ) {
        const Se = $e,
          je = pe.clientHeight + pe.scrollTop,
          vt = Se.offsetTop + Se.offsetHeight;
        vt > je
          ? (pe.scrollTop = vt - pe.clientHeight)
          : Se.offsetTop - Se.offsetHeight * (f ? 1.3 : 0) < pe.scrollTop &&
            (pe.scrollTop = Se.offsetTop - Se.offsetHeight * (f ? 1.3 : 0));
      }
    }),
    st = Ot(({ event: N, diff: $, direction: X = 'next', reason: oe = 'auto' }) => {
      if (!be) return;
      const $e = Ce(
        (() => {
          const Se = fe.length - 1;
          if ($ === 'reset') return Oe;
          if ($ === 'start') return 0;
          if ($ === 'end') return Se;
          const je = M.current + $;
          return je < 0
            ? je === -1 && j
              ? -1
              : (b && M.current !== -1) || Math.abs($) > 1
              ? 0
              : Se
            : je > Se
            ? je === Se + 1 && j
              ? -1
              : b || Math.abs($) > 1
              ? Se
              : 0
            : je;
        })(),
        X,
      );
      if ((Ae({ index: $e, reason: oe, event: N }), r && $ !== 'reset'))
        if ($e === -1) Q.current.value = ge;
        else {
          const Se = H(fe[$e]);
          (Q.current.value = Se),
            Se.toLowerCase().indexOf(ge.toLowerCase()) === 0 &&
              ge.length > 0 &&
              Q.current.setSelectionRange(ge.length, Se.length);
        }
    }),
    mt = () => {
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
    kt = y.useCallback(() => {
      if (!be || mt()) return;
      const N = I ? Y[0] : Y;
      if (fe.length === 0 || N == null) {
        st({ diff: 'reset' });
        return;
      }
      if (se.current) {
        if (N != null) {
          const $ = fe[M.current];
          if (I && $ && li(Y, (oe) => D($, oe)) !== -1) return;
          const X = li(fe, (oe) => D(oe, N));
          X === -1 ? st({ diff: 'reset' }) : Ae({ index: X });
          return;
        }
        if (M.current >= fe.length - 1) {
          Ae({ index: fe.length - 1 });
          return;
        }
        Ae({ index: M.current });
      }
    }, [fe.length, I ? !1 : Y, k, st, Ae, be, ge, I]),
    gn = Ot((N) => {
      sr(se, N), N && kt();
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
      kt();
    }, [kt]);
  const wt = (N) => {
      nt || (at(!0), me(!0), B && B(N));
    },
    gt = (N, $) => {
      nt && (at(!1), z && z(N, $));
    },
    Et = (N, $, X, oe) => {
      if (I) {
        if (Y.length === $.length && Y.every((pe, $e) => pe === $[$e])) return;
      } else if (Y === $) return;
      q && q(N, $, X, oe), Ie($);
    },
    ht = y.useRef(!1),
    ot = (N, $, X = 'selectOption', oe = 'options') => {
      let pe = X,
        $e = $;
      if (I) {
        if ((($e = Array.isArray(Y) ? Y.slice() : []), process.env.NODE_ENV !== 'production')) {
          const je = $e.filter((vt) => D($, vt));
          je.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${u} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${je.length} matches.`,
              ].join(`
`),
            );
        }
        const Se = li($e, (je) => D($, je));
        Se === -1 ? $e.push($) : oe !== 'freeSolo' && ($e.splice(Se, 1), (pe = 'removeOption'));
      }
      Ne(N, $e),
        Et(N, $e, pe, { option: $ }),
        !h && (!N || (!N.ctrlKey && !N.metaKey)) && gt(N, pe),
        (s === !0 || (s === 'touch' && ht.current) || (s === 'mouse' && !ht.current)) &&
          Q.current.blur();
    };
  function rt(N, $) {
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
  const bt = (N, $) => {
      if (!I) return;
      ge === '' && gt(N, 'toggleInput');
      let X = ae;
      ae === -1
        ? ge === '' && $ === 'previous' && (X = Y.length - 1)
        : ((X += $ === 'next' ? 1 : -1), X < 0 && (X = 0), X === Y.length && (X = -1)),
        (X = rt(X, $)),
        P(X),
        Ee(X);
    },
    wn = (N) => {
      (re.current = !0), tt(''), F && F(N, '', 'clear'), Et(N, I ? [] : null, 'clear');
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
              st({ diff: 'start', direction: 'next', reason: 'keyboard', event: $ }));
            break;
          case 'End':
            be &&
              S &&
              ($.preventDefault(),
              st({ diff: 'end', direction: 'previous', reason: 'keyboard', event: $ }));
            break;
          case 'PageUp':
            $.preventDefault(),
              st({ diff: -Vs, direction: 'previous', reason: 'keyboard', event: $ }),
              wt($);
            break;
          case 'PageDown':
            $.preventDefault(),
              st({ diff: Vs, direction: 'next', reason: 'keyboard', event: $ }),
              wt($);
            break;
          case 'ArrowDown':
            $.preventDefault(),
              st({ diff: 1, direction: 'next', reason: 'keyboard', event: $ }),
              wt($);
            break;
          case 'ArrowUp':
            $.preventDefault(),
              st({ diff: -1, direction: 'previous', reason: 'keyboard', event: $ }),
              wt($);
            break;
          case 'ArrowLeft':
            bt($, 'previous');
            break;
          case 'ArrowRight':
            bt($, 'next');
            break;
          case 'Enter':
            if (M.current !== -1 && be) {
              const X = fe[M.current],
                oe = C ? C(X) : !1;
              if (($.preventDefault(), oe)) return;
              ot($, X, 'selectOption'),
                r && Q.current.setSelectionRange(Q.current.value.length, Q.current.value.length);
            } else
              T &&
                ge !== '' &&
                xe === !1 &&
                (I && $.preventDefault(), ot($, ge, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            be
              ? ($.preventDefault(), $.stopPropagation(), gt($, 'escape'))
              : c &&
                (ge !== '' || (I && Y.length > 0)) &&
                ($.preventDefault(), $.stopPropagation(), wn($));
            break;
          case 'Backspace':
            if (I && !R && ge === '' && Y.length > 0) {
              const X = ae === -1 ? Y.length - 1 : ae,
                oe = Y.slice();
              oe.splice(X, 1), Et($, oe, 'removeOption', { option: Y[X] });
            }
            break;
          case 'Delete':
            if (I && !R && ge === '' && Y.length > 0 && ae !== -1) {
              const X = ae,
                oe = Y.slice();
              oe.splice(X, 1), Et($, oe, 'removeOption', { option: Y[X] });
            }
            break;
        }
    },
    vn = (N) => {
      we(!0), U && !re.current && wt(N);
    },
    qt = (N) => {
      if (t(se)) {
        Q.current.focus();
        return;
      }
      we(!1),
        (ie.current = !0),
        (re.current = !1),
        a && M.current !== -1 && be
          ? ot(N, fe[M.current], 'blur')
          : a && T && ge !== ''
          ? ot(N, ge, 'blur', 'freeSolo')
          : l && Ne(N, Y),
        gt(N, 'blur');
    },
    ln = (N) => {
      const $ = N.target.value;
      ge !== $ && (tt($), me(!1), F && F(N, $, 'input')),
        $ === '' ? !p && !I && Et(N, null, 'clear') : wt(N);
    },
    cn = (N) => {
      Ae({
        event: N,
        index: Number(N.currentTarget.getAttribute('data-option-index')),
        reason: 'mouse',
      });
    },
    un = (N) => {
      Ae({
        event: N,
        index: Number(N.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (ht.current = !0);
    },
    en = (N) => {
      const $ = Number(N.currentTarget.getAttribute('data-option-index'));
      ot(N, fe[$], 'selectOption'), (ht.current = !1);
    },
    dn = (N) => ($) => {
      const X = Y.slice();
      X.splice(N, 1), Et($, X, 'removeOption', { option: Y[N] });
    },
    Le = (N) => {
      nt ? gt(N, 'toggleInput') : wt(N);
    },
    pt = (N) => {
      N.target.getAttribute('id') !== G && N.preventDefault();
    },
    Lt = () => {
      Q.current.focus(),
        V &&
          ie.current &&
          Q.current.selectionEnd - Q.current.selectionStart === 0 &&
          Q.current.select(),
        (ie.current = !1);
    },
    O = (N) => {
      (ge === '' || !nt) && Le(N);
    };
  let K = T && ge.length > 0;
  K = K || (I ? Y.length > 0 : Y !== null);
  let ue = fe;
  if (f) {
    const N = new Map();
    let $ = !1;
    ue = fe.reduce((X, oe, pe) => {
      const $e = f(oe);
      return (
        X.length > 0 && X[X.length - 1].group === $e
          ? X[X.length - 1].options.push(oe)
          : (process.env.NODE_ENV !== 'production' &&
              (N.get($e) &&
                !$ &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${u} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                ($ = !0)),
              N.set($e, !0)),
            X.push({ key: pe, index: pe, group: $e, options: [oe] })),
        X
      );
    }, []);
  }
  return (
    v && Ve && qt(),
    {
      getRootProps: (N = {}) =>
        g({ 'aria-owns': ne ? `${G}-listbox` : null }, N, {
          onKeyDown: Qt(N),
          onMouseDown: pt,
          onClick: Lt,
        }),
      getInputLabelProps: () => ({ id: `${G}-label`, htmlFor: G }),
      getInputProps: () => ({
        id: G,
        value: ge,
        onBlur: qt,
        onFocus: vn,
        onChange: ln,
        onMouseDown: O,
        'aria-activedescendant': be ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': ne ? `${G}-listbox` : void 0,
        'aria-expanded': ne,
        autoComplete: 'off',
        ref: Q,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled: v,
      }),
      getClearProps: () => ({ tabIndex: -1, onClick: wn }),
      getPopupIndicatorProps: () => ({ tabIndex: -1, onClick: Le }),
      getTagProps: ({ index: N }) =>
        g({ key: N, 'data-tag-index': N, tabIndex: -1 }, !R && { onDelete: dn(N) }),
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
      focused: Ve || ae !== -1,
      anchorEl: le,
      setAnchorEl: he,
      focusedTag: ae,
      groupedOptions: ue,
    }
  );
}
function dg(e) {
  return Pe('MuiSvgIcon', e);
}
Re('MuiSvgIcon', [
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
const pg = [
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
  fg = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      i = { root: ['root', t !== 'inherit' && `color${J(t)}`, `fontSize${J(o)}`] };
    return Me(i, dg, r);
  },
  mg = ce('svg', {
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
  aa = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiSvgIcon' }),
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
      v = ye(r, pg),
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
    const m = fg(x);
    return Qe(
      mg,
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
        { ownerState: x, children: [i, p ? _('title', { children: p }) : null] },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (aa.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
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
    component: n.elementType,
    fontSize: n.oneOfType([n.oneOf(['inherit', 'large', 'medium', 'small']), n.string]),
    htmlColor: n.string,
    inheritViewBox: n.bool,
    shapeRendering: n.string,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    titleAccess: n.string,
    viewBox: n.string,
  });
aa.muiName = 'SvgIcon';
const zs = aa;
function Bn(e, t) {
  function o(r, i) {
    return _(zs, g({ 'data-testid': `${t}Icon`, ref: i }, r, { children: e }));
  }
  return (
    process.env.NODE_ENV !== 'production' && (o.displayName = `${t}Icon`),
    (o.muiName = zs.muiName),
    y.memo(y.forwardRef(o))
  );
}
var Si = { exports: {} },
  Ke = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Us;
function hg() {
  if (Us) return Ke;
  Us = 1;
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
    (Ke.ContextConsumer = s),
    (Ke.ContextProvider = a),
    (Ke.Element = e),
    (Ke.ForwardRef = c),
    (Ke.Fragment = o),
    (Ke.Lazy = h),
    (Ke.Memo = p),
    (Ke.Portal = t),
    (Ke.Profiler = i),
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
      return b(m) === s;
    }),
    (Ke.isContextProvider = function (m) {
      return b(m) === a;
    }),
    (Ke.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (Ke.isForwardRef = function (m) {
      return b(m) === c;
    }),
    (Ke.isFragment = function (m) {
      return b(m) === o;
    }),
    (Ke.isLazy = function (m) {
      return b(m) === h;
    }),
    (Ke.isMemo = function (m) {
      return b(m) === p;
    }),
    (Ke.isPortal = function (m) {
      return b(m) === t;
    }),
    (Ke.isProfiler = function (m) {
      return b(m) === i;
    }),
    (Ke.isStrictMode = function (m) {
      return b(m) === r;
    }),
    (Ke.isSuspense = function (m) {
      return b(m) === u;
    }),
    (Ke.isSuspenseList = function (m) {
      return b(m) === d;
    }),
    (Ke.isValidElementType = function (m) {
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
    (Ke.typeOf = b),
    Ke
  );
}
var Xe = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ws;
function bg() {
  return (
    Ws ||
      ((Ws = 1),
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
                  M.$$typeof === c ||
                  M.$$typeof === C ||
                  M.getModuleId !== void 0))
            );
          }
          function f(M) {
            if (typeof M == 'object' && M !== null) {
              var Y = M.$$typeof;
              switch (Y) {
                case e:
                  var Ie = M.type;
                  switch (Ie) {
                    case o:
                    case i:
                    case r:
                    case u:
                    case d:
                      return Ie;
                    default:
                      var ge = Ie && Ie.$$typeof;
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
            z = t,
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
          function V(M) {
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
          (Xe.ContextConsumer = S),
            (Xe.ContextProvider = w),
            (Xe.Element = j),
            (Xe.ForwardRef = L),
            (Xe.Fragment = D),
            (Xe.Lazy = I),
            (Xe.Memo = q),
            (Xe.Portal = z),
            (Xe.Profiler = A),
            (Xe.StrictMode = F),
            (Xe.Suspense = B),
            (Xe.SuspenseList = te),
            (Xe.isAsyncMode = R),
            (Xe.isConcurrentMode = V),
            (Xe.isContextConsumer = Z),
            (Xe.isContextProvider = G),
            (Xe.isElement = H),
            (Xe.isForwardRef = re),
            (Xe.isFragment = ie),
            (Xe.isLazy = Q),
            (Xe.isMemo = se),
            (Xe.isPortal = le),
            (Xe.isProfiler = he),
            (Xe.isStrictMode = ae),
            (Xe.isSuspense = P),
            (Xe.isSuspenseList = Oe),
            (Xe.isValidElementType = E),
            (Xe.typeOf = f);
        })()),
    Xe
  );
}
process.env.NODE_ENV === 'production' ? (Si.exports = hg()) : (Si.exports = bg());
var sa = Si.exports;
function Ri(e, t) {
  return (
    (Ri = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    Ri(e, t)
  );
}
function Tc(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), Ri(e, t);
}
const Hs = { disabled: !1 };
var gg =
  process.env.NODE_ENV !== 'production'
    ? n.oneOfType([
        n.number,
        n.shape({ enter: n.number, exit: n.number, appear: n.number }).isRequired,
      ])
    : null;
process.env.NODE_ENV !== 'production' &&
  n.oneOfType([
    n.string,
    n.shape({ enter: n.string, exit: n.string, active: n.string }),
    n.shape({
      enter: n.string,
      enterDone: n.string,
      enterActive: n.string,
      exit: n.string,
      exitDone: n.string,
      exitActive: n.string,
    }),
  ]);
const gr = Te.createContext(null);
var vg = function (t) {
    return t.scrollTop;
  },
  To = 'unmounted',
  Rn = 'exited',
  Nn = 'entering',
  Xn = 'entered',
  Ni = 'exiting',
  bn = (function (e) {
    Tc(t, e);
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
            ? ((c = Rn), (a.appearStatus = Nn))
            : (c = Xn)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = To)
          : (c = Rn),
        (a.state = { status: c }),
        (a.nextCallback = null),
        a
      );
    }
    t.getDerivedStateFromProps = function (i, a) {
      var s = i.in;
      return s && a.status === To ? { status: Rn } : null;
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
          this.props.in ? s !== Nn && s !== Xn && (a = Nn) : (s === Nn || s === Xn) && (a = Ni);
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
          { exit: a, enter: s, appear: l }
        );
      }),
      (o.updateStatus = function (i, a) {
        if ((i === void 0 && (i = !1), a !== null))
          if ((this.cancelNextCallback(), a === Nn)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : Oo.findDOMNode(this);
              s && vg(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else this.props.unmountOnExit && this.state.status === Rn && this.setState({ status: To });
      }),
      (o.performEnter = function (i) {
        var a = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [l] : [Oo.findDOMNode(this), l],
          u = c[0],
          d = c[1],
          p = this.getTimeouts(),
          h = l ? p.appear : p.enter;
        if ((!i && !s) || Hs.disabled) {
          this.safeSetState({ status: Xn }, function () {
            a.props.onEntered(u);
          });
          return;
        }
        this.props.onEnter(u, d),
          this.safeSetState({ status: Nn }, function () {
            a.props.onEntering(u, d),
              a.onTransitionEnd(h, function () {
                a.safeSetState({ status: Xn }, function () {
                  a.props.onEntered(u, d);
                });
              });
          });
      }),
      (o.performExit = function () {
        var i = this,
          a = this.props.exit,
          s = this.getTimeouts(),
          l = this.props.nodeRef ? void 0 : Oo.findDOMNode(this);
        if (!a || Hs.disabled) {
          this.safeSetState({ status: Rn }, function () {
            i.props.onExited(l);
          });
          return;
        }
        this.props.onExit(l),
          this.safeSetState({ status: Ni }, function () {
            i.props.onExiting(l),
              i.onTransitionEnd(s.exit, function () {
                i.safeSetState({ status: Rn }, function () {
                  i.props.onExited(l);
                });
              });
          });
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : Oo.findDOMNode(this),
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
        return Te.createElement(
          gr.Provider,
          { value: null },
          typeof s == 'function' ? s(i, l) : Te.cloneElement(Te.Children.only(s), l),
        );
      }),
      t
    );
  })(Te.Component);
bn.contextType = gr;
bn.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
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
        children: n.oneOfType([n.func.isRequired, n.element.isRequired]).isRequired,
        in: n.bool,
        mountOnEnter: n.bool,
        unmountOnExit: n.bool,
        appear: n.bool,
        enter: n.bool,
        exit: n.bool,
        timeout: function (t) {
          var o = gg;
          t.addEndListener || (o = o.isRequired);
          for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            i[a - 1] = arguments[a];
          return o.apply(void 0, [t].concat(i));
        },
        addEndListener: n.func,
        onEnter: n.func,
        onEntering: n.func,
        onEntered: n.func,
        onExit: n.func,
        onExiting: n.func,
        onExited: n.func,
      }
    : {};
function Kn() {}
bn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Kn,
  onEntering: Kn,
  onEntered: Kn,
  onExit: Kn,
  onExiting: Kn,
  onExited: Kn,
};
bn.UNMOUNTED = To;
bn.EXITED = Rn;
bn.ENTERING = Nn;
bn.ENTERED = Xn;
bn.EXITING = Ni;
const la = bn;
function yg(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ca(e, t) {
  var o = function (a) {
      return t && Te.isValidElement(a) ? t(a) : a;
    },
    r = Object.create(null);
  return (
    e &&
      Te.Children.map(e, function (i) {
        return i;
      }).forEach(function (i) {
        r[i.key] = o(i);
      }),
    r
  );
}
function xg(e, t) {
  (e = e || {}), (t = t || {});
  function o(d) {
    return d in t ? t[d] : e[d];
  }
  var r = Object.create(null),
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
function Mn(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function Eg(e, t) {
  return ca(e.children, function (o) {
    return Te.cloneElement(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: Mn(o, 'appear', e),
      enter: Mn(o, 'enter', e),
      exit: Mn(o, 'exit', e),
    });
  });
}
function Cg(e, t, o) {
  var r = ca(e.children),
    i = xg(t, r);
  return (
    Object.keys(i).forEach(function (a) {
      var s = i[a];
      if (Te.isValidElement(s)) {
        var l = a in t,
          c = a in r,
          u = t[a],
          d = Te.isValidElement(u) && !u.props.in;
        c && (!l || d)
          ? (i[a] = Te.cloneElement(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: Mn(s, 'exit', e),
              enter: Mn(s, 'enter', e),
            }))
          : !c && l && !d
          ? (i[a] = Te.cloneElement(s, { in: !1 }))
          : c &&
            l &&
            Te.isValidElement(u) &&
            (i[a] = Te.cloneElement(s, {
              onExited: o.bind(null, s),
              in: u.props.in,
              exit: Mn(s, 'exit', e),
              enter: Mn(s, 'enter', e),
            }));
      }
    }),
    i
  );
}
var Og =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  Tg = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  ua = (function (e) {
    Tc(t, e);
    function t(r, i) {
      var a;
      a = e.call(this, r, i) || this;
      var s = a.handleExited.bind(yg(a));
      return (a.state = { contextValue: { isMounting: !0 }, handleExited: s, firstRender: !0 }), a;
    }
    var o = t.prototype;
    return (
      (o.componentDidMount = function () {
        (this.mounted = !0), this.setState({ contextValue: { isMounting: !1 } });
      }),
      (o.componentWillUnmount = function () {
        this.mounted = !1;
      }),
      (t.getDerivedStateFromProps = function (i, a) {
        var s = a.children,
          l = a.handleExited,
          c = a.firstRender;
        return { children: c ? Eg(i, l) : Cg(i, s, l), firstRender: !1 };
      }),
      (o.handleExited = function (i, a) {
        var s = ca(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(a),
          this.mounted &&
            this.setState(function (l) {
              var c = g({}, l.children);
              return delete c[i.key], { children: c };
            }));
      }),
      (o.render = function () {
        var i = this.props,
          a = i.component,
          s = i.childFactory,
          l = ye(i, ['component', 'childFactory']),
          c = this.state.contextValue,
          u = Og(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          a === null
            ? Te.createElement(gr.Provider, { value: c }, u)
            : Te.createElement(gr.Provider, { value: c }, Te.createElement(a, l, u))
        );
      }),
      t
    );
  })(Te.Component);
ua.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        component: n.any,
        children: n.node,
        appear: n.bool,
        enter: n.bool,
        exit: n.bool,
        childFactory: n.func,
      }
    : {};
ua.defaultProps = Tg;
const kg = ua,
  da = (e) => e.scrollTop;
function so(e, t) {
  var o, r;
  const { timeout: i, easing: a, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof i == 'number' ? i : i[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == 'object' ? a[t.mode] : a,
    delay: s.transitionDelay,
  };
}
function wg(e) {
  return Pe('MuiPaper', e);
}
Re('MuiPaper', [
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
const Sg = ['className', 'component', 'elevation', 'square', 'variant'],
  Rg = (e) => {
    const { square: t, elevation: o, variant: r, classes: i } = e,
      a = { root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`] };
    return Me(a, wg, i);
  },
  Ng = ce('div', {
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
      !t.square && { borderRadius: e.shape.borderRadius },
      t.variant === 'outlined' && { border: `1px solid ${(e.vars || e).palette.divider}` },
      t.variant === 'elevation' &&
        g(
          { boxShadow: (e.vars || e).shadows[t.elevation] },
          !e.vars &&
            e.palette.mode === 'dark' && {
              backgroundImage: `linear-gradient(${Ze('#fff', Es(t.elevation))}, ${Ze(
                '#fff',
                Es(t.elevation),
              )})`,
            },
          e.vars && { backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation] },
        ),
    );
  }),
  kc = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiPaper' }),
      {
        className: i,
        component: a = 'div',
        elevation: s = 1,
        square: l = !1,
        variant: c = 'elevation',
      } = r,
      u = ye(r, Sg),
      d = g({}, r, { component: a, elevation: s, square: l, variant: c }),
      p = Rg(d);
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
      _(Ng, g({ as: a, ownerState: d, className: ve(p.root, i), ref: o }, u))
    );
  });
process.env.NODE_ENV !== 'production' &&
  (kc.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    elevation: Vt(xr, (e) => {
      const { elevation: t, variant: o } = e;
      return t > 0 && o === 'outlined'
        ? new Error(
            `MUI: Combining \`elevation={${t}}\` with \`variant="${o}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`,
          )
        : null;
    }),
    square: n.bool,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    variant: n.oneOfType([n.oneOf(['elevation', 'outlined']), n.string]),
  });
const Vn = kc;
function wc(e) {
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
    v = { width: s, height: s, top: -(s / 2) + a, left: -(s / 2) + i },
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
    _('span', { className: h, style: v, children: _('span', { className: x }) })
  );
}
process.env.NODE_ENV !== 'production' &&
  (wc.propTypes = {
    classes: n.object.isRequired,
    className: n.string,
    in: n.bool,
    onExited: n.func,
    pulsate: n.bool,
    rippleSize: n.number,
    rippleX: n.number,
    rippleY: n.number,
    timeout: n.number.isRequired,
  });
const $g = Re('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  Ft = $g,
  Pg = ['center', 'classes', 'className'];
let Wr = (e) => e,
  qs,
  Ys,
  Gs,
  Ks;
const $i = 550,
  Ig = 80,
  _g = Yi(
    qs ||
      (qs = Wr`
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
  Mg = Yi(
    Ys ||
      (Ys = Wr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  Ag = Yi(
    Gs ||
      (Gs = Wr`
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
  Dg = ce('span', { name: 'MuiTouchRipple', slot: 'Root' })({
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
  Lg = ce(wc, { name: 'MuiTouchRipple', slot: 'Ripple' })(
    Ks ||
      (Ks = Wr`
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
    Ft.rippleVisible,
    _g,
    $i,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Ft.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    Ft.child,
    Ft.childLeaving,
    Mg,
    $i,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Ft.childPulsate,
    Ag,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  Sc = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiTouchRipple' }),
      { center: i = !1, classes: a = {}, className: s } = r,
      l = ye(r, Pg),
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
            _(
              Lg,
              {
                classes: {
                  ripple: ve(a.ripple, Ft.ripple),
                  rippleVisible: ve(a.rippleVisible, Ft.rippleVisible),
                  ripplePulsate: ve(a.ripplePulsate, Ft.ripplePulsate),
                  child: ve(a.child, Ft.child),
                  childLeaving: ve(a.childLeaving, Ft.childLeaving),
                  childPulsate: ve(a.childPulsate, Ft.childPulsate),
                },
                timeout: $i,
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
          const { pulsate: w = !1, center: j = i || f.pulsate, fakeElement: L = !1 } = f;
          if ((E == null ? void 0 : E.type) === 'mousedown' && h.current) {
            h.current = !1;
            return;
          }
          (E == null ? void 0 : E.type) === 'touchstart' && (h.current = !0);
          const D = L ? null : b.current,
            I = D ? D.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
          let q, z, A;
          if (
            j ||
            E === void 0 ||
            (E.clientX === 0 && E.clientY === 0) ||
            (!E.clientX && !E.touches)
          )
            (q = Math.round(I.width / 2)), (z = Math.round(I.height / 2));
          else {
            const { clientX: F, clientY: B } = E.touches && E.touches.length > 0 ? E.touches[0] : E;
            (q = Math.round(F - I.left)), (z = Math.round(B - I.top));
          }
          if (j) (A = Math.sqrt((2 * I.width ** 2 + I.height ** 2) / 3)), A % 2 === 0 && (A += 1);
          else {
            const F = Math.max(Math.abs((D ? D.clientWidth : 0) - q), q) * 2 + 2,
              B = Math.max(Math.abs((D ? D.clientHeight : 0) - z), z) * 2 + 2;
            A = Math.sqrt(F ** 2 + B ** 2);
          }
          E != null && E.touches
            ? x.current === null &&
              ((x.current = () => {
                m({ pulsate: w, rippleX: q, rippleY: z, rippleSize: A, cb: S });
              }),
              (v.current = setTimeout(() => {
                x.current && (x.current(), (x.current = null));
              }, Ig)))
            : m({ pulsate: w, rippleX: q, rippleY: z, rippleSize: A, cb: S });
        },
        [i, m],
      ),
      T = y.useCallback(() => {
        k({}, { pulsate: !0 });
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
      y.useImperativeHandle(o, () => ({ pulsate: T, start: k, stop: C }), [T, k, C]),
      _(
        Dg,
        g({ className: ve(Ft.root, a.root, s), ref: b }, l, {
          children: _(kg, { component: null, exit: !0, children: c }),
        }),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Sc.propTypes = { center: n.bool, classes: n.object, className: n.string });
const jg = Sc;
function Fg(e) {
  return Pe('MuiButtonBase', e);
}
const Bg = Re('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  Vg = Bg,
  zg = [
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
  Ug = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: i } = e,
      s = Me({ root: ['root', t && 'disabled', o && 'focusVisible'] }, Fg, i);
    return o && r && (s.root += ` ${r}`), s;
  },
  Wg = ce('button', { name: 'MuiButtonBase', slot: 'Root', overridesResolver: (e, t) => t.root })({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    textDecoration: 'none',
    color: 'inherit',
    '&::-moz-focus-inner': { borderStyle: 'none' },
    [`&.${Vg.disabled}`]: { pointerEvents: 'none', cursor: 'default' },
    '@media print': { colorAdjust: 'exact' },
  }),
  Rc = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiButtonBase' }),
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
        TouchRippleProps: z,
        touchRippleRef: A,
        type: F,
      } = r,
      B = ye(r, zg),
      te = y.useRef(null),
      U = y.useRef(null),
      W = dt(U, A),
      { isFocusVisibleRef: R, onFocus: V, onBlur: Z, ref: G } = Ml(),
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
      return Ot((Ce) => (ne && ne(Ce), !Ee && U.current && U.current[de](Ce), !0));
    }
    const he = le('start', S),
      ae = le('stop', m),
      P = le('stop', k),
      Oe = le('stop', j),
      M = le('stop', (de) => {
        H && de.preventDefault(), w && w(de);
      }),
      Y = le('start', I),
      Ie = le('stop', L),
      ge = le('stop', D),
      tt = le(
        'stop',
        (de) => {
          Z(de), R.current === !1 && re(!1), x && x(de);
        },
        !1,
      ),
      Ve = Ot((de) => {
        te.current || (te.current = de.currentTarget),
          V(de),
          R.current === !0 && (re(!0), C && C(de)),
          T && T(de);
      }),
      we = () => {
        const de = te.current;
        return c && c !== 'button' && !(de.tagName === 'A' && de.href);
      },
      Ne = y.useRef(!1),
      nt = Ot((de) => {
        h &&
          !Ne.current &&
          H &&
          U.current &&
          de.key === ' ' &&
          ((Ne.current = !0),
          U.current.stop(de, () => {
            U.current.start(de);
          })),
          de.target === de.currentTarget && we() && de.key === ' ' && de.preventDefault(),
          E && E(de),
          de.target === de.currentTarget &&
            we() &&
            de.key === 'Enter' &&
            !u &&
            (de.preventDefault(), b && b(de));
      }),
      at = Ot((de) => {
        h &&
          de.key === ' ' &&
          U.current &&
          H &&
          !de.defaultPrevented &&
          ((Ne.current = !1),
          U.current.stop(de, () => {
            U.current.pulsate(de);
          })),
          f && f(de),
          b &&
            de.target === de.currentTarget &&
            we() &&
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
    const xe = dt(o, G, te);
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
      fe = Ug(be);
    return Qe(
      Wg,
      g(
        {
          as: ee,
          className: ve(fe.root, l),
          ownerState: be,
          onBlur: tt,
          onClick: b,
          onContextMenu: ae,
          onFocus: Ve,
          onKeyDown: nt,
          onKeyUp: at,
          onMouseDown: he,
          onMouseLeave: M,
          onMouseUp: Oe,
          onDragLeave: P,
          onTouchEnd: Ie,
          onTouchMove: ge,
          onTouchStart: Y,
          ref: xe,
          tabIndex: u ? -1 : q,
          type: F,
        },
        me,
        B,
        { children: [s, se ? _(jg, g({ ref: W, center: a }, z)) : null] },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Rc.propTypes = {
    action: $t,
    centerRipple: n.bool,
    children: n.node,
    classes: n.object,
    className: n.string,
    component: Ai,
    disabled: n.bool,
    disableRipple: n.bool,
    disableTouchRipple: n.bool,
    focusRipple: n.bool,
    focusVisibleClassName: n.string,
    href: n.any,
    LinkComponent: n.elementType,
    onBlur: n.func,
    onClick: n.func,
    onContextMenu: n.func,
    onDragLeave: n.func,
    onFocus: n.func,
    onFocusVisible: n.func,
    onKeyDown: n.func,
    onKeyUp: n.func,
    onMouseDown: n.func,
    onMouseLeave: n.func,
    onMouseUp: n.func,
    onTouchEnd: n.func,
    onTouchMove: n.func,
    onTouchStart: n.func,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    tabIndex: n.number,
    TouchRippleProps: n.object,
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
    type: n.oneOfType([n.oneOf(['button', 'reset', 'submit']), n.string]),
  });
const lo = Rc;
function Hg(e) {
  return Pe('MuiIconButton', e);
}
const qg = Re('MuiIconButton', [
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
  Yg = qg,
  Gg = ['edge', 'children', 'className', 'color', 'disabled', 'disableFocusRipple', 'size'],
  Kg = (e) => {
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
    return Me(s, Hg, t);
  },
  Xg = ce(lo, {
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
          color: (e.vars || e).palette.action.active,
          transition: e.transitions.create('background-color', {
            duration: e.transitions.duration.shortest,
          }),
        },
        !t.disableRipple && {
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
              : Ze(e.palette.action.active, e.palette.action.hoverOpacity),
            '@media (hover: none)': { backgroundColor: 'transparent' },
          },
        },
        t.edge === 'start' && { marginLeft: t.size === 'small' ? -3 : -12 },
        t.edge === 'end' && { marginRight: t.size === 'small' ? -3 : -12 },
      ),
    ({ theme: e, ownerState: t }) => {
      var o;
      const r = (o = (e.vars || e).palette) == null ? void 0 : o[t.color];
      return g(
        {},
        t.color === 'inherit' && { color: 'inherit' },
        t.color !== 'inherit' &&
          t.color !== 'default' &&
          g(
            { color: r == null ? void 0 : r.main },
            !t.disableRipple && {
              '&:hover': g(
                {},
                r && {
                  backgroundColor: e.vars
                    ? `rgba(${r.mainChannel} / ${e.vars.palette.action.hoverOpacity})`
                    : Ze(r.main, e.palette.action.hoverOpacity),
                },
                { '@media (hover: none)': { backgroundColor: 'transparent' } },
              ),
            },
          ),
        t.size === 'small' && { padding: 5, fontSize: e.typography.pxToRem(18) },
        t.size === 'large' && { padding: 12, fontSize: e.typography.pxToRem(28) },
        {
          [`&.${Yg.disabled}`]: {
            backgroundColor: 'transparent',
            color: (e.vars || e).palette.action.disabled,
          },
        },
      );
    },
  ),
  Nc = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiIconButton' }),
      {
        edge: i = !1,
        children: a,
        className: s,
        color: l = 'default',
        disabled: c = !1,
        disableFocusRipple: u = !1,
        size: d = 'medium',
      } = r,
      p = ye(r, Gg),
      h = g({}, r, { edge: i, color: l, disabled: c, disableFocusRipple: u, size: d }),
      v = Kg(h);
    return _(
      Xg,
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
        { children: a },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Nc.propTypes = {
    children: Vt(n.node, (e) =>
      y.Children.toArray(e.children).some((o) => y.isValidElement(o) && o.props.onClick)
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
    classes: n.object,
    className: n.string,
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
    disabled: n.bool,
    disableFocusRipple: n.bool,
    disableRipple: n.bool,
    edge: n.oneOf(['end', 'start', !1]),
    size: n.oneOfType([n.oneOf(['small', 'medium', 'large']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const pa = Nc,
  Jg = Bn(
    _('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  );
function Zg(e) {
  return Pe('MuiAppBar', e);
}
Re('MuiAppBar', [
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
const Qg = ['className', 'color', 'enableColorOnDark', 'position'],
  ev = (e) => {
    const { color: t, position: o, classes: r } = e,
      i = { root: ['root', `color${J(t)}`, `position${J(o)}`] };
    return Me(i, Zg, r);
  },
  Zo = (e, t) => (e ? `${e == null ? void 0 : e.replace(')', '')}, ${t})` : t),
  tv = ce(Vn, {
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
        flexShrink: 0,
      },
      t.position === 'fixed' && {
        position: 'fixed',
        zIndex: (e.vars || e).zIndex.appBar,
        top: 0,
        left: 'auto',
        right: 0,
        '@media print': { position: 'absolute' },
      },
      t.position === 'absolute' && {
        position: 'absolute',
        zIndex: (e.vars || e).zIndex.appBar,
        top: 0,
        left: 'auto',
        right: 0,
      },
      t.position === 'sticky' && {
        position: 'sticky',
        zIndex: (e.vars || e).zIndex.appBar,
        top: 0,
        left: 'auto',
        right: 0,
      },
      t.position === 'static' && { position: 'static' },
      t.position === 'relative' && { position: 'relative' },
      !e.vars &&
        g(
          {},
          t.color === 'default' && { backgroundColor: o, color: e.palette.getContrastText(o) },
          t.color &&
            t.color !== 'default' &&
            t.color !== 'inherit' &&
            t.color !== 'transparent' && {
              backgroundColor: e.palette[t.color].main,
              color: e.palette[t.color].contrastText,
            },
          t.color === 'inherit' && { color: 'inherit' },
          e.palette.mode === 'dark' &&
            !t.enableColorOnDark && { backgroundColor: null, color: null },
          t.color === 'transparent' &&
            g(
              { backgroundColor: 'transparent', color: 'inherit' },
              e.palette.mode === 'dark' && { backgroundImage: 'none' },
            ),
        ),
      e.vars &&
        g(
          {},
          t.color === 'default' && {
            '--AppBar-background': t.enableColorOnDark
              ? e.vars.palette.AppBar.defaultBg
              : Zo(e.vars.palette.AppBar.darkBg, e.vars.palette.AppBar.defaultBg),
            '--AppBar-color': t.enableColorOnDark
              ? e.vars.palette.text.primary
              : Zo(e.vars.palette.AppBar.darkColor, e.vars.palette.text.primary),
          },
          t.color &&
            !t.color.match(/^(default|inherit|transparent)$/) && {
              '--AppBar-background': t.enableColorOnDark
                ? e.vars.palette[t.color].main
                : Zo(e.vars.palette.AppBar.darkBg, e.vars.palette[t.color].main),
              '--AppBar-color': t.enableColorOnDark
                ? e.vars.palette[t.color].contrastText
                : Zo(e.vars.palette.AppBar.darkColor, e.vars.palette[t.color].contrastText),
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
  $c = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiAppBar' }),
      { className: i, color: a = 'primary', enableColorOnDark: s = !1, position: l = 'fixed' } = r,
      c = ye(r, Qg),
      u = g({}, r, { color: a, position: l, enableColorOnDark: s }),
      d = ev(u);
    return _(
      tv,
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
  ($c.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([
      n.oneOf(['default', 'inherit', 'primary', 'secondary', 'transparent']),
      n.string,
    ]),
    enableColorOnDark: n.bool,
    position: n.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const nv = $c,
  ov = ['components', 'componentsProps', 'slots', 'slotProps'],
  rv = ce(Lb, { name: 'MuiPopper', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  Pc = y.forwardRef(function (t, o) {
    var r;
    const i = ic(),
      a = De({ props: t, name: 'MuiPopper' }),
      { components: s, componentsProps: l, slots: c, slotProps: u } = a,
      d = ye(a, ov),
      p = (r = c == null ? void 0 : c.root) != null ? r : s == null ? void 0 : s.Root;
    return _(
      rv,
      g({ direction: i == null ? void 0 : i.direction, slots: { root: p }, slotProps: u ?? l }, d, {
        ref: o,
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Pc.propTypes = {
    anchorEl: n.oneOfType([Jt, n.object, n.func]),
    children: n.oneOfType([n.node, n.func]),
    component: n.elementType,
    components: n.shape({ Root: n.elementType }),
    componentsProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    container: n.oneOfType([Jt, n.func]),
    disablePortal: n.bool,
    keepMounted: n.bool,
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
    open: n.bool.isRequired,
    ownerState: n.any,
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
    popperRef: $t,
    slotProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    slots: n.shape({ root: n.elementType }),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    transition: n.bool,
  });
const Ic = Pc;
function iv(e) {
  return Pe('MuiListSubheader', e);
}
Re('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const av = ['className', 'color', 'component', 'disableGutters', 'disableSticky', 'inset'],
  sv = (e) => {
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
    return Me(s, iv, t);
  },
  lv = ce('li', {
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
      t.color === 'primary' && { color: (e.vars || e).palette.primary.main },
      t.color === 'inherit' && { color: 'inherit' },
      !t.disableGutters && { paddingLeft: 16, paddingRight: 16 },
      t.inset && { paddingLeft: 72 },
      !t.disableSticky && {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: (e.vars || e).palette.background.paper,
      },
    ),
  ),
  fa = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiListSubheader' }),
      {
        className: i,
        color: a = 'default',
        component: s = 'li',
        disableGutters: l = !1,
        disableSticky: c = !1,
        inset: u = !1,
      } = r,
      d = ye(r, av),
      p = g({}, r, { color: a, component: s, disableGutters: l, disableSticky: c, inset: u }),
      h = sv(p);
    return _(lv, g({ as: s, className: ve(h.root, i), ref: o, ownerState: p }, d));
  });
fa.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (fa.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOf(['default', 'inherit', 'primary']),
    component: n.elementType,
    disableGutters: n.bool,
    disableSticky: n.bool,
    inset: n.bool,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const cv = fa,
  uv = Bn(
    _('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function dv(e) {
  return Pe('MuiChip', e);
}
const pv = Re('MuiChip', [
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
  Be = pv,
  fv = [
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
  mv = (e) => {
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
    return Me(u, dv, t);
  },
  hv = ce('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: i, clickable: a, onDelete: s, size: l, variant: c } = o;
      return [
        { [`& .${Be.avatar}`]: t.avatar },
        { [`& .${Be.avatar}`]: t[`avatar${J(l)}`] },
        { [`& .${Be.avatar}`]: t[`avatarColor${J(r)}`] },
        { [`& .${Be.icon}`]: t.icon },
        { [`& .${Be.icon}`]: t[`icon${J(l)}`] },
        { [`& .${Be.icon}`]: t[`iconColor${J(i)}`] },
        { [`& .${Be.deleteIcon}`]: t.deleteIcon },
        { [`& .${Be.deleteIcon}`]: t[`deleteIcon${J(l)}`] },
        { [`& .${Be.deleteIcon}`]: t[`deleteIconColor${J(r)}`] },
        { [`& .${Be.deleteIcon}`]: t[`deleteIcon${J(c)}Color${J(r)}`] },
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
      const o = Ze(e.palette.text.primary, 0.26),
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
          cursor: 'default',
          outline: 0,
          textDecoration: 'none',
          border: 0,
          padding: 0,
          verticalAlign: 'middle',
          boxSizing: 'border-box',
          [`&.${Be.disabled}`]: {
            opacity: (e.vars || e).palette.action.disabledOpacity,
            pointerEvents: 'none',
          },
          [`& .${Be.avatar}`]: {
            marginLeft: 5,
            marginRight: -6,
            width: 24,
            height: 24,
            color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : r,
            fontSize: e.typography.pxToRem(12),
          },
          [`& .${Be.avatarColorPrimary}`]: {
            color: (e.vars || e).palette.primary.contrastText,
            backgroundColor: (e.vars || e).palette.primary.dark,
          },
          [`& .${Be.avatarColorSecondary}`]: {
            color: (e.vars || e).palette.secondary.contrastText,
            backgroundColor: (e.vars || e).palette.secondary.dark,
          },
          [`& .${Be.avatarSmall}`]: {
            marginLeft: 4,
            marginRight: -4,
            width: 18,
            height: 18,
            fontSize: e.typography.pxToRem(10),
          },
          [`& .${Be.icon}`]: g(
            { marginLeft: 5, marginRight: -6 },
            t.size === 'small' && { fontSize: 18, marginLeft: 4, marginRight: -4 },
            t.iconColor === t.color &&
              g(
                { color: e.vars ? e.vars.palette.Chip.defaultIconColor : r },
                t.color !== 'default' && { color: 'inherit' },
              ),
          ),
          [`& .${Be.deleteIcon}`]: g(
            {
              WebkitTapHighlightColor: 'transparent',
              color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.26)` : o,
              fontSize: 22,
              cursor: 'pointer',
              margin: '0 5px 0 -6px',
              '&:hover': {
                color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.4)` : Ze(o, 0.4),
              },
            },
            t.size === 'small' && { fontSize: 16, marginRight: 4, marginLeft: -4 },
            t.color !== 'default' && {
              color: e.vars
                ? `rgba(${e.vars.palette[t.color].contrastTextChannel} / 0.7)`
                : Ze(e.palette[t.color].contrastText, 0.7),
              '&:hover, &:active': { color: (e.vars || e).palette[t.color].contrastText },
            },
          ),
        },
        t.size === 'small' && { height: 24 },
        t.color !== 'default' && {
          backgroundColor: (e.vars || e).palette[t.color].main,
          color: (e.vars || e).palette[t.color].contrastText,
        },
        t.onDelete && {
          [`&.${Be.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : Ze(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        t.onDelete &&
          t.color !== 'default' && {
            [`&.${Be.focusVisible}`]: { backgroundColor: (e.vars || e).palette[t.color].dark },
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
              : Ze(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
                ),
          },
          [`&.${Be.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : Ze(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
          '&:active': { boxShadow: (e.vars || e).shadows[1] },
        },
        t.clickable &&
          t.color !== 'default' && {
            [`&:hover, &.${Be.focusVisible}`]: {
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
          [`&.${Be.clickable}:hover`]: { backgroundColor: (e.vars || e).palette.action.hover },
          [`&.${Be.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
          [`& .${Be.avatar}`]: { marginLeft: 4 },
          [`& .${Be.avatarSmall}`]: { marginLeft: 2 },
          [`& .${Be.icon}`]: { marginLeft: 4 },
          [`& .${Be.iconSmall}`]: { marginLeft: 2 },
          [`& .${Be.deleteIcon}`]: { marginRight: 5 },
          [`& .${Be.deleteIconSmall}`]: { marginRight: 3 },
        },
        t.variant === 'outlined' &&
          t.color !== 'default' && {
            color: (e.vars || e).palette[t.color].main,
            border: `1px solid ${
              e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : Ze(e.palette[t.color].main, 0.7)
            }`,
            [`&.${Be.clickable}:hover`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : Ze(e.palette[t.color].main, e.palette.action.hoverOpacity),
            },
            [`&.${Be.focusVisible}`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.focusOpacity
                  })`
                : Ze(e.palette[t.color].main, e.palette.action.focusOpacity),
            },
            [`& .${Be.deleteIcon}`]: {
              color: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : Ze(e.palette[t.color].main, 0.7),
              '&:hover, &:active': { color: (e.vars || e).palette[t.color].main },
            },
          },
      ),
  ),
  bv = ce('span', {
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
      e.size === 'small' && { paddingLeft: 8, paddingRight: 8 },
    ),
  );
function Xs(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const _c = y.forwardRef(function (t, o) {
  const r = De({ props: t, name: 'MuiChip' }),
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
    f = ye(r, fv),
    S = y.useRef(null),
    w = dt(S, o),
    j = (W) => {
      W.stopPropagation(), x && x(W);
    },
    L = (W) => {
      W.currentTarget === W.target && Xs(W) && W.preventDefault(), b && b(W);
    },
    D = (W) => {
      W.currentTarget === W.target &&
        (x && Xs(W) ? x(W) : W.key === 'Escape' && S.current && S.current.blur()),
        m && m(W);
    },
    I = s !== !1 && v ? !0 : s,
    q = I || x ? lo : c || 'div',
    z = g({}, r, {
      component: q,
      disabled: d,
      size: k,
      color: l,
      iconColor: (y.isValidElement(p) && p.props.color) || l,
      onDelete: !!x,
      clickable: I,
      variant: T,
    }),
    A = mv(z),
    F =
      q === lo
        ? g(
            { component: c || 'div', focusVisibleClassName: A.focusVisible },
            x && { disableRipple: !0 },
          )
        : {};
  let B = null;
  x &&
    (B =
      u && y.isValidElement(u)
        ? y.cloneElement(u, { className: ve(u.props.className, A.deleteIcon), onClick: j })
        : _(uv, { className: ve(A.deleteIcon), onClick: j }));
  let te = null;
  i &&
    y.isValidElement(i) &&
    (te = y.cloneElement(i, { className: ve(A.avatar, i.props.className) }));
  let U = null;
  return (
    p &&
      y.isValidElement(p) &&
      (U = y.cloneElement(p, { className: ve(A.icon, p.props.className) })),
    process.env.NODE_ENV !== 'production' &&
      te &&
      U &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    Qe(
      hv,
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
          ownerState: z,
        },
        F,
        f,
        { children: [te || U, _(bv, { className: ve(A.label), ownerState: z, children: h }), B] },
      ),
    )
  );
});
process.env.NODE_ENV !== 'production' &&
  (_c.propTypes = {
    avatar: n.element,
    children: $d,
    classes: n.object,
    className: n.string,
    clickable: n.bool,
    color: n.oneOfType([
      n.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    component: n.elementType,
    deleteIcon: n.element,
    disabled: n.bool,
    icon: n.element,
    label: n.node,
    onClick: n.func,
    onDelete: n.func,
    onKeyDown: n.func,
    onKeyUp: n.func,
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    skipFocusWhenDisabled: n.bool,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    tabIndex: n.number,
    variant: n.oneOfType([n.oneOf(['filled', 'outlined']), n.string]),
  });
const gv = _c;
function uo({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, i) => ((r[i] = e[i]), o && typeof e[i] > 'u' && (r[i] = o[i]), r), {});
}
const Mc = y.createContext(void 0);
process.env.NODE_ENV !== 'production' && (Mc.displayName = 'FormControlContext');
const ma = Mc;
function zn() {
  return y.useContext(ma);
}
function Ac(e) {
  return _(Ql, g({}, e, { defaultTheme: Br }));
}
process.env.NODE_ENV !== 'production' &&
  (Ac.propTypes = {
    styles: n.oneOfType([
      n.func,
      n.number,
      n.object,
      n.shape({ __emotion_styles: n.any.isRequired }),
      n.string,
      n.bool,
    ]),
  });
function Js(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function ha(e, t = !1) {
  return (
    e && ((Js(e.value) && e.value !== '') || (t && Js(e.defaultValue) && e.defaultValue !== ''))
  );
}
function vv(e) {
  return e.startAdornment;
}
function yv(e) {
  return Pe('MuiInputBase', e);
}
const xv = Re('MuiInputBase', [
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
  Pt = xv,
  Ev = [
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
  Hr = (e, t) => {
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
  qr = (e, t) => {
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
  Cv = (e) => {
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
    return Me(b, yv, t);
  },
  Yr = ce('div', { name: 'MuiInputBase', slot: 'Root', overridesResolver: Hr })(
    ({ theme: e, ownerState: t }) =>
      g(
        {},
        e.typography.body1,
        {
          color: (e.vars || e).palette.text.primary,
          lineHeight: '1.4375em',
          boxSizing: 'border-box',
          position: 'relative',
          cursor: 'text',
          display: 'inline-flex',
          alignItems: 'center',
          [`&.${Pt.disabled}`]: { color: (e.vars || e).palette.text.disabled, cursor: 'default' },
        },
        t.multiline && g({ padding: '4px 0 5px' }, t.size === 'small' && { paddingTop: 1 }),
        t.fullWidth && { width: '100%' },
      ),
  ),
  Gr = ce('input', { name: 'MuiInputBase', slot: 'Input', overridesResolver: qr })(
    ({ theme: e, ownerState: t }) => {
      const o = e.palette.mode === 'light',
        r = g(
          { color: 'currentColor' },
          e.vars ? { opacity: e.vars.opacity.inputPlaceholder } : { opacity: o ? 0.42 : 0.5 },
          {
            transition: e.transitions.create('opacity', {
              duration: e.transitions.duration.shorter,
            }),
          },
        ),
        i = { opacity: '0 !important' },
        a = e.vars ? { opacity: e.vars.opacity.inputPlaceholder } : { opacity: o ? 0.42 : 0.5 };
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
          margin: 0,
          WebkitTapHighlightColor: 'transparent',
          display: 'block',
          minWidth: 0,
          width: '100%',
          animationName: 'mui-auto-fill-cancel',
          animationDuration: '10ms',
          '&::-webkit-input-placeholder': r,
          '&::-moz-placeholder': r,
          '&:-ms-input-placeholder': r,
          '&::-ms-input-placeholder': r,
          '&:focus': { outline: 0 },
          '&:invalid': { boxShadow: 'none' },
          '&::-webkit-search-decoration': { WebkitAppearance: 'none' },
          [`label[data-shrink=false] + .${Pt.formControl} &`]: {
            '&::-webkit-input-placeholder': i,
            '&::-moz-placeholder': i,
            '&:-ms-input-placeholder': i,
            '&::-ms-input-placeholder': i,
            '&:focus::-webkit-input-placeholder': a,
            '&:focus::-moz-placeholder': a,
            '&:focus:-ms-input-placeholder': a,
            '&:focus::-ms-input-placeholder': a,
          },
          [`&.${Pt.disabled}`]: {
            opacity: 1,
            WebkitTextFillColor: (e.vars || e).palette.text.disabled,
          },
          '&:-webkit-autofill': { animationDuration: '5000s', animationName: 'mui-auto-fill' },
        },
        t.size === 'small' && { paddingTop: 1 },
        t.multiline && { height: 'auto', resize: 'none', padding: 0, paddingTop: 0 },
        t.type === 'search' && { MozAppearance: 'textfield' },
      );
    },
  ),
  Ov = _(Ac, {
    styles: {
      '@keyframes mui-auto-fill': { from: { display: 'block' } },
      '@keyframes mui-auto-fill-cancel': { from: { display: 'block' } },
    },
  }),
  Dc = y.forwardRef(function (t, o) {
    var r;
    const i = De({ props: t, name: 'MuiInputBase' }),
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
        onKeyUp: z,
        placeholder: A,
        readOnly: F,
        renderSuffix: B,
        rows: te,
        slotProps: U = {},
        slots: W = {},
        startAdornment: R,
        type: V = 'text',
        value: Z,
      } = i,
      G = ye(i, Ev),
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
      se = dt(ie, C, T.ref, Q),
      [le, he] = y.useState(!1),
      ae = zn();
    process.env.NODE_ENV !== 'production' &&
      y.useEffect(() => {
        if (ae) return ae.registerEffect();
      }, [ae]);
    const P = uo({
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
          ha(fe) ? Oe && Oe() : M && M();
        },
        [Oe, M],
      );
    an(() => {
      re && Y({ value: H });
    }, [H, Y, re]);
    const Ie = (fe) => {
        if (P.disabled) {
          fe.stopPropagation();
          return;
        }
        I && I(fe), T.onFocus && T.onFocus(fe), ae && ae.onFocus ? ae.onFocus(fe) : he(!0);
      },
      ge = (fe) => {
        j && j(fe), T.onBlur && T.onBlur(fe), ae && ae.onBlur ? ae.onBlur(fe) : he(!1);
      },
      tt = (fe, ...de) => {
        if (!re) {
          const ne = fe.target || ie.current;
          if (ne == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : On(1),
            );
          Y({ value: ne.value });
        }
        T.onChange && T.onChange(fe, ...de), L && L(fe, ...de);
      };
    y.useEffect(() => {
      Y(ie.current);
    }, []);
    const Ve = (fe) => {
      ie.current && fe.currentTarget === fe.target && ie.current.focus(), D && D(fe);
    };
    let we = k,
      Ne = T;
    S &&
      we === 'input' &&
      (te
        ? (process.env.NODE_ENV !== 'production' &&
            (f || E) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (Ne = g({ type: void 0, minRows: te, maxRows: te }, Ne)))
        : (Ne = g({ type: void 0, maxRows: E, minRows: f }, Ne)),
      (we = ag));
    const nt = (fe) => {
      Y(fe.animationName === 'mui-auto-fill-cancel' ? ie.current : { value: 'x' });
    };
    y.useEffect(() => {
      ae && ae.setAdornedStart(!!R);
    }, [ae, R]);
    const at = g({}, i, {
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
        type: V,
      }),
      ee = Cv(at),
      me = W.root || u.Root || Yr,
      xe = U.root || d.root || {},
      be = W.input || u.Input || Gr;
    return (
      (Ne = g({}, Ne, (r = U.input) != null ? r : d.input)),
      Qe(y.Fragment, {
        children: [
          !v && Ov,
          Qe(
            me,
            g(
              {},
              xe,
              !Cn(me) && { ownerState: g({}, at, xe.ownerState) },
              { ref: o, onClick: Ve },
              G,
              {
                className: ve(ee.root, xe.className, c, F && 'MuiInputBase-readOnly'),
                children: [
                  R,
                  _(ma.Provider, {
                    value: null,
                    children: _(
                      be,
                      g(
                        {
                          ownerState: at,
                          'aria-invalid': P.error,
                          'aria-describedby': a,
                          autoComplete: s,
                          autoFocus: l,
                          defaultValue: p,
                          disabled: P.disabled,
                          id: m,
                          onAnimationStart: nt,
                          name: w,
                          placeholder: A,
                          readOnly: F,
                          required: P.required,
                          rows: te,
                          value: H,
                          onKeyDown: q,
                          onKeyUp: z,
                          type: V,
                        },
                        Ne,
                        !Cn(be) && { as: we, ownerState: g({}, at, Ne.ownerState) },
                        {
                          ref: se,
                          className: ve(ee.input, Ne.className, F && 'MuiInputBase-readOnly'),
                          onBlur: ge,
                          onChange: tt,
                          onFocus: Ie,
                        },
                      ),
                    ),
                  }),
                  x,
                  B ? B(g({}, P, { startAdornment: R })) : null,
                ],
              },
            ),
          ),
        ],
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Dc.propTypes = {
    'aria-describedby': n.string,
    autoComplete: n.string,
    autoFocus: n.bool,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([
      n.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    components: n.shape({ Input: n.elementType, Root: n.elementType }),
    componentsProps: n.shape({ input: n.object, root: n.object }),
    defaultValue: n.any,
    disabled: n.bool,
    disableInjectingGlobalStyles: n.bool,
    endAdornment: n.node,
    error: n.bool,
    fullWidth: n.bool,
    id: n.string,
    inputComponent: Ai,
    inputProps: n.object,
    inputRef: $t,
    margin: n.oneOf(['dense', 'none']),
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    multiline: n.bool,
    name: n.string,
    onBlur: n.func,
    onChange: n.func,
    onClick: n.func,
    onFocus: n.func,
    onInvalid: n.func,
    onKeyDown: n.func,
    onKeyUp: n.func,
    placeholder: n.string,
    readOnly: n.bool,
    renderSuffix: n.func,
    required: n.bool,
    rows: n.oneOfType([n.number, n.string]),
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    slotProps: n.shape({ input: n.object, root: n.object }),
    slots: n.shape({ input: n.elementType, root: n.elementType }),
    startAdornment: n.node,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    type: n.string,
    value: n.any,
  });
const ba = Dc;
function Tv(e) {
  return Pe('MuiInput', e);
}
const kv = g({}, Pt, Re('MuiInput', ['root', 'underline', 'input'])),
  En = kv;
function wv(e) {
  return Pe('MuiOutlinedInput', e);
}
const Sv = g({}, Pt, Re('MuiOutlinedInput', ['root', 'notchedOutline', 'input'])),
  tn = Sv;
function Rv(e) {
  return Pe('MuiFilledInput', e);
}
const Nv = g({}, Pt, Re('MuiFilledInput', ['root', 'underline', 'input'])),
  It = Nv,
  Lc = Bn(_('path', { d: 'M7 10l5 5 5-5z' }), 'ArrowDropDown');
function $v(e) {
  return Pe('MuiAutocomplete', e);
}
const Pv = Re('MuiAutocomplete', [
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
  _e = Pv;
var Zs, Qs;
const Iv = [
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
  _v = (e) => {
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
    return Me(p, $v, t);
  },
  Mv = ce('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: i, hasPopupIcon: a, inputFocused: s, size: l } = o;
      return [
        { [`& .${_e.tag}`]: t.tag },
        { [`& .${_e.tag}`]: t[`tagSize${J(l)}`] },
        { [`& .${_e.inputRoot}`]: t.inputRoot },
        { [`& .${_e.input}`]: t.input },
        { [`& .${_e.input}`]: s && t.inputFocused },
        t.root,
        r && t.fullWidth,
        a && t.hasPopupIcon,
        i && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) =>
    g(
      {
        [`&.${_e.focused} .${_e.clearIndicator}`]: { visibility: 'visible' },
        '@media (pointer: fine)': { [`&:hover .${_e.clearIndicator}`]: { visibility: 'visible' } },
      },
      e.fullWidth && { width: '100%' },
      {
        [`& .${_e.tag}`]: g(
          { margin: 3, maxWidth: 'calc(100% - 6px)' },
          e.size === 'small' && { margin: 2, maxWidth: 'calc(100% - 4px)' },
        ),
        [`& .${_e.inputRoot}`]: {
          flexWrap: 'wrap',
          [`.${_e.hasPopupIcon}&, .${_e.hasClearIcon}&`]: { paddingRight: 26 + 4 },
          [`.${_e.hasPopupIcon}.${_e.hasClearIcon}&`]: { paddingRight: 52 + 4 },
          [`& .${_e.input}`]: { width: 0, minWidth: 30 },
        },
        [`& .${En.root}`]: {
          paddingBottom: 1,
          '& .MuiInput-input': { padding: '4px 4px 4px 0px' },
        },
        [`& .${En.root}.${Pt.sizeSmall}`]: { [`& .${En.input}`]: { padding: '2px 4px 3px 0' } },
        [`& .${tn.root}`]: {
          padding: 9,
          [`.${_e.hasPopupIcon}&, .${_e.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
          [`.${_e.hasPopupIcon}.${_e.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
          [`& .${_e.input}`]: { padding: '7.5px 4px 7.5px 6px' },
          [`& .${_e.endAdornment}`]: { right: 9 },
        },
        [`& .${tn.root}.${Pt.sizeSmall}`]: {
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 6,
          [`& .${_e.input}`]: { padding: '2.5px 4px 2.5px 6px' },
        },
        [`& .${It.root}`]: {
          paddingTop: 19,
          paddingLeft: 8,
          [`.${_e.hasPopupIcon}&, .${_e.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
          [`.${_e.hasPopupIcon}.${_e.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
          [`& .${It.input}`]: { padding: '7px 4px' },
          [`& .${_e.endAdornment}`]: { right: 9 },
        },
        [`& .${It.root}.${Pt.sizeSmall}`]: {
          paddingBottom: 1,
          [`& .${It.input}`]: { padding: '2.5px 4px' },
        },
        [`& .${Pt.hiddenLabel}`]: { paddingTop: 8 },
        [`& .${It.root}.${Pt.hiddenLabel}`]: {
          paddingTop: 0,
          paddingBottom: 0,
          [`& .${_e.input}`]: { paddingTop: 16, paddingBottom: 17 },
        },
        [`& .${It.root}.${Pt.hiddenLabel}.${Pt.sizeSmall}`]: {
          [`& .${_e.input}`]: { paddingTop: 8, paddingBottom: 9 },
        },
        [`& .${_e.input}`]: g(
          { flexGrow: 1, textOverflow: 'ellipsis', opacity: 0 },
          e.inputFocused && { opacity: 1 },
        ),
      },
    ),
  ),
  Av = ce('div', {
    name: 'MuiAutocomplete',
    slot: 'EndAdornment',
    overridesResolver: (e, t) => t.endAdornment,
  })({ position: 'absolute', right: 0, top: 'calc(50% - 14px)' }),
  Dv = ce(pa, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({ marginRight: -2, padding: 4, visibility: 'hidden' }),
  Lv = ce(pa, {
    name: 'MuiAutocomplete',
    slot: 'PopupIndicator',
    overridesResolver: ({ ownerState: e }, t) =>
      g({}, t.popupIndicator, e.popupOpen && t.popupIndicatorOpen),
  })(({ ownerState: e }) =>
    g({ padding: 2, marginRight: -2 }, e.popupOpen && { transform: 'rotate(180deg)' }),
  ),
  jv = ce(Ic, {
    name: 'MuiAutocomplete',
    slot: 'Popper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`& .${_e.option}`]: t.option },
        t.popper,
        o.disablePortal && t.popperDisablePortal,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    g({ zIndex: (e.vars || e).zIndex.modal }, t.disablePortal && { position: 'absolute' }),
  ),
  Fv = ce(Vn, { name: 'MuiAutocomplete', slot: 'Paper', overridesResolver: (e, t) => t.paper })(
    ({ theme: e }) => g({}, e.typography.body1, { overflow: 'auto' }),
  ),
  Bv = ce('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: '14px 16px' })),
  Vv = ce('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: '14px 16px' })),
  zv = ce('div', {
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
    [`& .${_e.option}`]: {
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
      [e.breakpoints.up('sm')]: { minHeight: 'auto' },
      [`&.${_e.focused}`]: {
        backgroundColor: (e.vars || e).palette.action.hover,
        '@media (hover: none)': { backgroundColor: 'transparent' },
      },
      '&[aria-disabled="true"]': {
        opacity: (e.vars || e).palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`&.${_e.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : Ze(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${_e.focused}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : Ze(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          '@media (hover: none)': { backgroundColor: (e.vars || e).palette.action.selected },
        },
        [`&.${_e.focusVisible}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
            : Ze(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
              ),
        },
      },
    },
  })),
  Uv = ce(cv, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({ backgroundColor: (e.vars || e).palette.background.paper, top: -8 })),
  Wv = ce('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({ padding: 0, [`& .${_e.option}`]: { paddingLeft: 24 } }),
  jc = y.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = De({ props: t, name: 'MuiAutocomplete' }),
      {
        autoComplete: c = !1,
        autoHighlight: u = !1,
        autoSelect: d = !1,
        blurOnSelect: p = !1,
        ChipProps: h,
        className: v,
        clearIcon: x = Zs || (Zs = _(Jg, { fontSize: 'small' })),
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
        freeSolo: z = !1,
        fullWidth: A = !1,
        getLimitTagsText: F = (Le) => `+${Le}`,
        getOptionLabel: B = (Le) => {
          var pt;
          return (pt = Le.label) != null ? pt : Le;
        },
        groupBy: te,
        handleHomeEndKeys: U = !l.freeSolo,
        includeInputInList: W = !1,
        limitTags: R = -1,
        ListboxComponent: V = 'ul',
        ListboxProps: Z,
        loading: G = !1,
        loadingText: H = 'Loading…',
        multiple: re = !1,
        noOptionsText: ie = 'No options',
        openOnFocus: Q = !1,
        openText: se = 'Open',
        PaperComponent: le = Vn,
        PopperComponent: he = Ic,
        popupIcon: ae = Qs || (Qs = _(Lc, {})),
        readOnly: P = !1,
        renderGroup: Oe,
        renderInput: M,
        renderOption: Y,
        renderTags: Ie,
        selectOnFocus: ge = !l.freeSolo,
        size: tt = 'medium',
        slotProps: Ve = {},
      } = l,
      we = ye(l, Iv),
      {
        getRootProps: Ne,
        getInputProps: nt,
        getInputLabelProps: at,
        getPopupIndicatorProps: ee,
        getClearProps: me,
        getTagProps: xe,
        getListboxProps: be,
        getOptionProps: fe,
        value: de,
        dirty: ne,
        expanded: Ee,
        id: Ce,
        popupOpen: Ae,
        focused: st,
        focusedTag: mt,
        anchorEl: kt,
        setAnchorEl: gn,
        inputValue: wt,
        groupedOptions: gt,
      } = ug(g({}, l, { componentName: 'Autocomplete' })),
      Et = !f && !w && ne && !P,
      ht = (!z || q === !0) && q !== !1,
      ot = g({}, l, {
        disablePortal: D,
        expanded: Ee,
        focused: st,
        fullWidth: A,
        hasClearIcon: Et,
        hasPopupIcon: ht,
        inputFocused: mt === -1,
        popupOpen: Ae,
        size: tt,
      }),
      rt = _v(ot);
    let bt;
    if (re && de.length > 0) {
      const Le = (pt) => g({ className: rt.tag, disabled: w }, xe(pt));
      Ie
        ? (bt = Ie(de, Le, ot))
        : (bt = de.map((pt, Lt) => _(gv, g({ label: B(pt), size: tt }, Le({ index: Lt }), h))));
    }
    if (R > -1 && Array.isArray(bt)) {
      const Le = bt.length - R;
      !st &&
        Le > 0 &&
        ((bt = bt.splice(0, R)),
        bt.push(_('span', { className: rt.tag, children: F(Le) }, bt.length)));
    }
    const Qt =
        Oe ||
        ((Le) =>
          Qe(
            'li',
            {
              children: [
                _(Uv, {
                  className: rt.groupLabel,
                  ownerState: ot,
                  component: 'div',
                  children: Le.group,
                }),
                _(Wv, { className: rt.groupUl, ownerState: ot, children: Le.children }),
              ],
            },
            Le.key,
          )),
      qt = Y || ((Le, pt) => _('li', g({}, Le, { children: B(pt) }))),
      ln = (Le, pt) => {
        const Lt = fe({ option: Le, index: pt });
        return qt(g({}, Lt, { className: rt.option }), Le, {
          selected: Lt['aria-selected'],
          index: pt,
          inputValue: wt,
        });
      },
      cn = (r = Ve.clearIndicator) != null ? r : C.clearIndicator,
      un = (i = Ve.paper) != null ? i : C.paper,
      en = (a = Ve.popper) != null ? a : C.popper,
      dn = (s = Ve.popupIndicator) != null ? s : C.popupIndicator;
    return Qe(y.Fragment, {
      children: [
        _(
          Mv,
          g({ ref: o, className: ve(rt.root, v), ownerState: ot }, Ne(we), {
            children: M({
              id: Ce,
              disabled: w,
              fullWidth: !0,
              size: tt === 'small' ? 'small' : void 0,
              InputLabelProps: at(),
              InputProps: g(
                { ref: gn, className: rt.inputRoot, startAdornment: bt },
                (Et || ht) && {
                  endAdornment: Qe(Av, {
                    className: rt.endAdornment,
                    ownerState: ot,
                    children: [
                      Et
                        ? _(
                            Dv,
                            g({}, me(), { 'aria-label': k, title: k, ownerState: ot }, cn, {
                              className: ve(rt.clearIndicator, cn == null ? void 0 : cn.className),
                              children: x,
                            }),
                          )
                        : null,
                      ht
                        ? _(
                            Lv,
                            g(
                              {},
                              ee(),
                              {
                                disabled: w,
                                'aria-label': Ae ? T : se,
                                title: Ae ? T : se,
                                ownerState: ot,
                              },
                              dn,
                              {
                                className: ve(
                                  rt.popupIndicator,
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
              inputProps: g({ className: rt.input, disabled: w, readOnly: P }, nt()),
            }),
          }),
        ),
        kt
          ? _(
              jv,
              g(
                {
                  as: he,
                  disablePortal: D,
                  style: { width: kt ? kt.clientWidth : null },
                  ownerState: ot,
                  role: 'presentation',
                  anchorEl: kt,
                  open: Ae,
                },
                en,
                {
                  className: ve(rt.popper, en == null ? void 0 : en.className),
                  children: Qe(
                    Fv,
                    g({ ownerState: ot, as: le }, un, {
                      className: ve(rt.paper, un == null ? void 0 : un.className),
                      children: [
                        G && gt.length === 0
                          ? _(Bv, { className: rt.loading, ownerState: ot, children: H })
                          : null,
                        gt.length === 0 && !z && !G
                          ? _(Vv, {
                              className: rt.noOptions,
                              ownerState: ot,
                              role: 'presentation',
                              onMouseDown: (Le) => {
                                Le.preventDefault();
                              },
                              children: ie,
                            })
                          : null,
                        gt.length > 0
                          ? _(
                              zv,
                              g({ as: V, className: rt.listbox, ownerState: ot }, be(), Z, {
                                children: gt.map((Le, pt) =>
                                  te
                                    ? Qt({
                                        key: Le.key,
                                        group: Le.group,
                                        children: Le.options.map((Lt, O) => ln(Lt, Le.index + O)),
                                      })
                                    : ln(Le, pt),
                                ),
                              }),
                            )
                          : null,
                      ],
                    }),
                  ),
                },
              ),
            )
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (jc.propTypes = {
    autoComplete: n.bool,
    autoHighlight: n.bool,
    autoSelect: n.bool,
    blurOnSelect: n.oneOfType([n.oneOf(['mouse', 'touch']), n.bool]),
    ChipProps: n.object,
    classes: n.object,
    className: n.string,
    clearIcon: n.node,
    clearOnBlur: n.bool,
    clearOnEscape: n.bool,
    clearText: n.string,
    closeText: n.string,
    componentsProps: n.shape({
      clearIndicator: n.object,
      paper: n.object,
      popper: n.object,
      popupIndicator: n.object,
    }),
    defaultValue: Vt(n.any, (e) =>
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
    disableClearable: n.bool,
    disableCloseOnSelect: n.bool,
    disabled: n.bool,
    disabledItemsFocusable: n.bool,
    disableListWrap: n.bool,
    disablePortal: n.bool,
    filterOptions: n.func,
    filterSelectedOptions: n.bool,
    forcePopupIcon: n.oneOfType([n.oneOf(['auto']), n.bool]),
    freeSolo: n.bool,
    fullWidth: n.bool,
    getLimitTagsText: n.func,
    getOptionDisabled: n.func,
    getOptionLabel: n.func,
    groupBy: n.func,
    handleHomeEndKeys: n.bool,
    id: n.string,
    includeInputInList: n.bool,
    inputValue: n.string,
    isOptionEqualToValue: n.func,
    limitTags: xr,
    ListboxComponent: n.elementType,
    ListboxProps: n.object,
    loading: n.bool,
    loadingText: n.node,
    multiple: n.bool,
    noOptionsText: n.node,
    onChange: n.func,
    onClose: n.func,
    onHighlightChange: n.func,
    onInputChange: n.func,
    onOpen: n.func,
    open: n.bool,
    openOnFocus: n.bool,
    openText: n.string,
    options: n.array.isRequired,
    PaperComponent: n.elementType,
    PopperComponent: n.elementType,
    popupIcon: n.node,
    readOnly: n.bool,
    renderGroup: n.func,
    renderInput: n.func.isRequired,
    renderOption: n.func,
    renderTags: n.func,
    selectOnFocus: n.bool,
    size: n.oneOfType([n.oneOf(['small', 'medium']), n.string]),
    slotProps: n.shape({
      clearIndicator: n.object,
      paper: n.object,
      popper: n.object,
      popupIndicator: n.object,
    }),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    value: Vt(n.any, (e) =>
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
const Hv = jc,
  qv = [
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
  Yv = { entering: { opacity: 1 }, entered: { opacity: 1 } },
  Fc = y.forwardRef(function (t, o) {
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
        TransitionComponent: T = la,
      } = t,
      C = ye(t, qv),
      E = y.useRef(null),
      f = dt(E, l.ref, o),
      S = (A) => (F) => {
        if (A) {
          const B = E.current;
          F === void 0 ? A(B) : A(B, F);
        }
      },
      w = S(h),
      j = S((A, F) => {
        da(A);
        const B = so({ style: m, timeout: k, easing: c }, { mode: 'enter' });
        (A.style.webkitTransition = r.transitions.create('opacity', B)),
          (A.style.transition = r.transitions.create('opacity', B)),
          d && d(A, F);
      }),
      L = S(p),
      D = S(b),
      I = S((A) => {
        const F = so({ style: m, timeout: k, easing: c }, { mode: 'exit' });
        (A.style.webkitTransition = r.transitions.create('opacity', F)),
          (A.style.transition = r.transitions.create('opacity', F)),
          v && v(A);
      }),
      q = S(x);
    return _(
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
            y.cloneElement(
              l,
              g(
                {
                  style: g(
                    { opacity: 0, visibility: A === 'exited' && !u ? 'hidden' : void 0 },
                    Yv[A],
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
  (Fc.propTypes = {
    addEndListener: n.func,
    appear: n.bool,
    children: Fn.isRequired,
    easing: n.oneOfType([n.shape({ enter: n.string, exit: n.string }), n.string]),
    in: n.bool,
    onEnter: n.func,
    onEntered: n.func,
    onEntering: n.func,
    onExit: n.func,
    onExited: n.func,
    onExiting: n.func,
    style: n.object,
    timeout: n.oneOfType([
      n.number,
      n.shape({ appear: n.number, enter: n.number, exit: n.number }),
    ]),
  });
const Gv = Fc;
function Kv(e) {
  return Pe('MuiBackdrop', e);
}
Re('MuiBackdrop', ['root', 'invisible']);
const Xv = [
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
  Jv = (e) => {
    const { classes: t, invisible: o } = e;
    return Me({ root: ['root', o && 'invisible'] }, Kv, t);
  },
  Zv = ce('div', {
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
      e.invisible && { backgroundColor: 'transparent' },
    ),
  ),
  Bc = y.forwardRef(function (t, o) {
    var r, i, a;
    const s = De({ props: t, name: 'MuiBackdrop' }),
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
        TransitionComponent: m = Gv,
        transitionDuration: k,
      } = s,
      T = ye(s, Xv),
      C = g({}, s, { component: u, invisible: h }),
      E = Jv(C),
      f = (r = x.root) != null ? r : p.root;
    return _(
      m,
      g({ in: v, timeout: k }, T, {
        children: _(
          Zv,
          g({ 'aria-hidden': !0 }, f, {
            as: (i = (a = b.root) != null ? a : d.Root) != null ? i : u,
            className: ve(E.root, c, f == null ? void 0 : f.className),
            ownerState: g({}, C, f == null ? void 0 : f.ownerState),
            classes: E,
            ref: o,
            children: l,
          }),
        ),
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Bc.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    components: n.shape({ Root: n.elementType }),
    componentsProps: n.shape({ root: n.object }),
    invisible: n.bool,
    open: n.bool.isRequired,
    slotProps: n.shape({ root: n.object }),
    slots: n.shape({ root: n.elementType }),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    TransitionComponent: n.elementType,
    transitionDuration: n.oneOfType([
      n.number,
      n.shape({ appear: n.number, enter: n.number, exit: n.number }),
    ]),
  });
const Qv = Bc;
function ey(e) {
  return Pe('MuiButton', e);
}
const ty = Re('MuiButton', [
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
  Qo = ty,
  Vc = y.createContext({});
process.env.NODE_ENV !== 'production' && (Vc.displayName = 'ButtonGroupContext');
const ny = Vc,
  oy = [
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
  ry = (e) => {
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
      c = Me(l, ey, s);
    return g({}, s, c);
  },
  zc = (e) =>
    g(
      {},
      e.size === 'small' && { '& > *:nth-of-type(1)': { fontSize: 18 } },
      e.size === 'medium' && { '& > *:nth-of-type(1)': { fontSize: 20 } },
      e.size === 'large' && { '& > *:nth-of-type(1)': { fontSize: 22 } },
    ),
  iy = ce(lo, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
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
            { duration: e.transitions.duration.short },
          ),
          '&:hover': g(
            {
              textDecoration: 'none',
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
                : Ze(e.palette.text.primary, e.palette.action.hoverOpacity),
              '@media (hover: none)': { backgroundColor: 'transparent' },
            },
            t.variant === 'text' &&
              t.color !== 'inherit' && {
                backgroundColor: e.vars
                  ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                      e.vars.palette.action.hoverOpacity
                    })`
                  : Ze(e.palette[t.color].main, e.palette.action.hoverOpacity),
                '@media (hover: none)': { backgroundColor: 'transparent' },
              },
            t.variant === 'outlined' &&
              t.color !== 'inherit' && {
                border: `1px solid ${(e.vars || e).palette[t.color].main}`,
                backgroundColor: e.vars
                  ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                      e.vars.palette.action.hoverOpacity
                    })`
                  : Ze(e.palette[t.color].main, e.palette.action.hoverOpacity),
                '@media (hover: none)': { backgroundColor: 'transparent' },
              },
            t.variant === 'contained' && {
              backgroundColor: (e.vars || e).palette.grey.A100,
              boxShadow: (e.vars || e).shadows[4],
              '@media (hover: none)': {
                boxShadow: (e.vars || e).shadows[2],
                backgroundColor: (e.vars || e).palette.grey[300],
              },
            },
            t.variant === 'contained' &&
              t.color !== 'inherit' && {
                backgroundColor: (e.vars || e).palette[t.color].dark,
                '@media (hover: none)': { backgroundColor: (e.vars || e).palette[t.color].main },
              },
          ),
          '&:active': g({}, t.variant === 'contained' && { boxShadow: (e.vars || e).shadows[8] }),
          [`&.${Qo.focusVisible}`]: g(
            {},
            t.variant === 'contained' && { boxShadow: (e.vars || e).shadows[6] },
          ),
          [`&.${Qo.disabled}`]: g(
            { color: (e.vars || e).palette.action.disabled },
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
        t.variant === 'text' && { padding: '6px 8px' },
        t.variant === 'text' &&
          t.color !== 'inherit' && { color: (e.vars || e).palette[t.color].main },
        t.variant === 'outlined' && { padding: '5px 15px', border: '1px solid currentColor' },
        t.variant === 'outlined' &&
          t.color !== 'inherit' && {
            color: (e.vars || e).palette[t.color].main,
            border: e.vars
              ? `1px solid rgba(${e.vars.palette[t.color].mainChannel} / 0.5)`
              : `1px solid ${Ze(e.palette[t.color].main, 0.5)}`,
          },
        t.variant === 'contained' && {
          color: e.vars
            ? e.vars.palette.text.primary
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
        t.color === 'inherit' && { color: 'inherit', borderColor: 'currentColor' },
        t.size === 'small' &&
          t.variant === 'text' && { padding: '4px 5px', fontSize: e.typography.pxToRem(13) },
        t.size === 'large' &&
          t.variant === 'text' && { padding: '8px 11px', fontSize: e.typography.pxToRem(15) },
        t.size === 'small' &&
          t.variant === 'outlined' && { padding: '3px 9px', fontSize: e.typography.pxToRem(13) },
        t.size === 'large' &&
          t.variant === 'outlined' && { padding: '7px 21px', fontSize: e.typography.pxToRem(15) },
        t.size === 'small' &&
          t.variant === 'contained' && { padding: '4px 10px', fontSize: e.typography.pxToRem(13) },
        t.size === 'large' &&
          t.variant === 'contained' && { padding: '8px 22px', fontSize: e.typography.pxToRem(15) },
        t.fullWidth && { width: '100%' },
      );
    },
    ({ ownerState: e }) =>
      e.disableElevation && {
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
        [`&.${Qo.focusVisible}`]: { boxShadow: 'none' },
        '&:active': { boxShadow: 'none' },
        [`&.${Qo.disabled}`]: { boxShadow: 'none' },
      },
  ),
  ay = ce('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${J(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    g(
      { display: 'inherit', marginRight: 8, marginLeft: -4 },
      e.size === 'small' && { marginLeft: -2 },
      zc(e),
    ),
  ),
  sy = ce('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${J(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    g(
      { display: 'inherit', marginRight: -4, marginLeft: 8 },
      e.size === 'small' && { marginRight: -2 },
      zc(e),
    ),
  ),
  Uc = y.forwardRef(function (t, o) {
    const r = y.useContext(ny),
      i = ji(r, t),
      a = De({ props: i, name: 'MuiButton' }),
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
      E = ye(a, oy),
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
      S = ry(f),
      w = k && _(ay, { className: S.startIcon, ownerState: f, children: k }),
      j = v && _(sy, { className: S.endIcon, ownerState: f, children: v });
    return Qe(
      iy,
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
        { classes: S, children: [w, s, j] },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Uc.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([
      n.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
      n.string,
    ]),
    component: n.elementType,
    disabled: n.bool,
    disableElevation: n.bool,
    disableFocusRipple: n.bool,
    disableRipple: n.bool,
    endIcon: n.node,
    focusVisibleClassName: n.string,
    fullWidth: n.bool,
    href: n.string,
    size: n.oneOfType([n.oneOf(['small', 'medium', 'large']), n.string]),
    startIcon: n.node,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    type: n.oneOfType([n.oneOf(['button', 'reset', 'submit']), n.string]),
    variant: n.oneOfType([n.oneOf(['contained', 'outlined', 'text']), n.string]),
  });
const ly = Uc;
function cy(e) {
  return Pe('PrivateSwitchBase', e);
}
Re('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const uy = [
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
  dy = (e) => {
    const { classes: t, checked: o, disabled: r, edge: i } = e,
      a = { root: ['root', o && 'checked', r && 'disabled', i && `edge${J(i)}`], input: ['input'] };
    return Me(a, cy, t);
  },
  py = ce(lo)(({ ownerState: e }) =>
    g(
      { padding: 9, borderRadius: '50%' },
      e.edge === 'start' && { marginLeft: e.size === 'small' ? -3 : -12 },
      e.edge === 'end' && { marginRight: e.size === 'small' ? -3 : -12 },
    ),
  ),
  fy = ce('input')({
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
  Wc = y.forwardRef(function (t, o) {
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
      j = ye(t, uy),
      [L, D] = An({ controlled: i, default: !!l, name: 'SwitchBase', state: 'checked' }),
      I = zn(),
      q = (W) => {
        T && T(W), I && I.onFocus && I.onFocus(W);
      },
      z = (W) => {
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
      te = g({}, t, { checked: L, disabled: F, disableFocusRipple: u, edge: d }),
      U = dy(te);
    return Qe(
      py,
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
          onBlur: z,
          ownerState: te,
          ref: o,
        },
        j,
        {
          children: [
            _(
              fy,
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
                S === 'checkbox' && w === void 0 ? {} : { value: w },
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
  (Wc.propTypes = {
    autoFocus: n.bool,
    checked: n.bool,
    checkedIcon: n.node.isRequired,
    classes: n.object,
    className: n.string,
    defaultChecked: n.bool,
    disabled: n.bool,
    disableFocusRipple: n.bool,
    edge: n.oneOf(['end', 'start', !1]),
    icon: n.node.isRequired,
    id: n.string,
    inputProps: n.object,
    inputRef: $t,
    name: n.string,
    onBlur: n.func,
    onChange: n.func,
    onFocus: n.func,
    readOnly: n.bool,
    required: n.bool,
    sx: n.object,
    tabIndex: n.oneOfType([n.number, n.string]),
    type: n.string.isRequired,
    value: n.any,
  });
const Hc = Wc,
  my = Bn(
    _('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  hy = Bn(
    _('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  by = Bn(
    _('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function gy(e) {
  return Pe('MuiCheckbox', e);
}
const vy = Re('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  ci = vy,
  yy = [
    'checkedIcon',
    'color',
    'icon',
    'indeterminate',
    'indeterminateIcon',
    'inputProps',
    'size',
    'className',
  ],
  xy = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      i = { root: ['root', o && 'indeterminate', `color${J(r)}`] },
      a = Me(i, gy, t);
    return g({}, t, a);
  },
  Ey = ce(Hc, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
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
      { color: (e.vars || e).palette.text.secondary },
      !t.disableRipple && {
        '&:hover': {
          backgroundColor: e.vars
            ? `rgba(${
                t.color === 'default'
                  ? e.vars.palette.action.activeChannel
                  : e.vars.palette.primary.mainChannel
              } / ${e.vars.palette.action.hoverOpacity})`
            : Ze(
                t.color === 'default' ? e.palette.action.active : e.palette[t.color].main,
                e.palette.action.hoverOpacity,
              ),
          '@media (hover: none)': { backgroundColor: 'transparent' },
        },
      },
      t.color !== 'default' && {
        [`&.${ci.checked}, &.${ci.indeterminate}`]: { color: (e.vars || e).palette[t.color].main },
        [`&.${ci.disabled}`]: { color: (e.vars || e).palette.action.disabled },
      },
    ),
  ),
  Cy = _(hy, {}),
  Oy = _(my, {}),
  Ty = _(by, {}),
  qc = y.forwardRef(function (t, o) {
    var r, i;
    const a = De({ props: t, name: 'MuiCheckbox' }),
      {
        checkedIcon: s = Cy,
        color: l = 'primary',
        icon: c = Oy,
        indeterminate: u = !1,
        indeterminateIcon: d = Ty,
        inputProps: p,
        size: h = 'medium',
        className: v,
      } = a,
      x = ye(a, yy),
      b = u ? d : c,
      m = u ? d : s,
      k = g({}, a, { color: l, indeterminate: u, size: h }),
      T = xy(k);
    return _(
      Ey,
      g(
        {
          type: 'checkbox',
          inputProps: g({ 'data-indeterminate': u }, p),
          icon: y.cloneElement(b, { fontSize: (r = b.props.fontSize) != null ? r : h }),
          checkedIcon: y.cloneElement(m, { fontSize: (i = m.props.fontSize) != null ? i : h }),
          ownerState: k,
          ref: o,
          className: ve(T.root, v),
        },
        x,
        { classes: T },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (qc.propTypes = {
    checked: n.bool,
    checkedIcon: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([
      n.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    defaultChecked: n.bool,
    disabled: n.bool,
    disableRipple: n.bool,
    icon: n.node,
    id: n.string,
    indeterminate: n.bool,
    indeterminateIcon: n.node,
    inputProps: n.object,
    inputRef: $t,
    onChange: n.func,
    required: n.bool,
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    value: n.any,
  });
const ky = qc,
  wy = [
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
  Sy = ce('div', {
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
      !t.open && t.exited && { visibility: 'hidden' },
    ),
  ),
  Ry = ce(Qv, { name: 'MuiModal', slot: 'Backdrop', overridesResolver: (e, t) => t.backdrop })({
    zIndex: -1,
  }),
  Yc = y.forwardRef(function (t, o) {
    var r, i, a, s, l, c;
    const u = De({ name: 'MuiModal', props: t }),
      {
        BackdropComponent: d = Ry,
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
        theme: z,
      } = u,
      A = ye(u, wy),
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
      U = g({}, u, te, { exited: F }),
      W = (r = (i = q == null ? void 0 : q.root) != null ? i : k.Root) != null ? r : Sy,
      R = (a = (s = q == null ? void 0 : q.backdrop) != null ? s : k.Backdrop) != null ? a : d,
      V = (l = I == null ? void 0 : I.root) != null ? l : T.root,
      Z = (c = I == null ? void 0 : I.backdrop) != null ? c : T.backdrop;
    return _(
      Kb,
      g(
        {
          slots: { root: W, backdrop: R },
          slotProps: {
            root: () =>
              g({}, Oi(V, U), !Cn(W) && { as: m, theme: z }, {
                className: ve(
                  v,
                  V == null ? void 0 : V.className,
                  h == null ? void 0 : h.root,
                  !U.open && U.exited && (h == null ? void 0 : h.hidden),
                ),
              }),
            backdrop: () =>
              g({}, p, Oi(Z, U), {
                className: ve(Z == null ? void 0 : Z.className, h == null ? void 0 : h.backdrop),
              }),
          },
          onTransitionEnter: () => B(!1),
          onTransitionExited: () => B(!0),
          ref: o,
        },
        A,
        te,
        { children: b },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Yc.propTypes = {
    BackdropComponent: n.elementType,
    BackdropProps: n.object,
    children: Fn.isRequired,
    classes: n.object,
    className: n.string,
    closeAfterTransition: n.bool,
    component: n.elementType,
    components: n.shape({ Backdrop: n.elementType, Root: n.elementType }),
    componentsProps: n.shape({
      backdrop: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
    }),
    container: n.oneOfType([Jt, n.func]),
    disableAutoFocus: n.bool,
    disableEnforceFocus: n.bool,
    disableEscapeKeyDown: n.bool,
    disablePortal: n.bool,
    disableRestoreFocus: n.bool,
    disableScrollLock: n.bool,
    hideBackdrop: n.bool,
    keepMounted: n.bool,
    onBackdropClick: n.func,
    onClose: n.func,
    open: n.bool.isRequired,
    slotProps: n.shape({
      backdrop: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
    }),
    slots: n.shape({ backdrop: n.elementType, root: n.elementType }),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const Gc = Yc,
  Ny = Re('MuiDivider', [
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
  el = Ny,
  $y = [
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
function Py(e, t, o) {
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
function Kc(e) {
  return typeof e == 'function' ? e() : e;
}
function er(e, t, o) {
  const r = Kc(o),
    i = Py(e, t, r);
  i && ((t.style.webkitTransform = i), (t.style.transform = i));
}
const Xc = y.forwardRef(function (t, o) {
  const r = hn(),
    i = { enter: r.transitions.easing.easeOut, exit: r.transitions.easing.sharp },
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
      TransitionComponent: f = la,
    } = t,
    S = ye(t, $y),
    w = y.useRef(null),
    j = dt(c.ref, w, o),
    L = (U) => (W) => {
      U && (W === void 0 ? U(w.current) : U(w.current, W));
    },
    D = L((U, W) => {
      er(d, U, u), da(U), v && v(U, W);
    }),
    I = L((U, W) => {
      const R = so({ timeout: E, style: C, easing: p }, { mode: 'enter' });
      (U.style.webkitTransition = r.transitions.create('-webkit-transform', g({}, R))),
        (U.style.transition = r.transitions.create('transform', g({}, R))),
        (U.style.webkitTransform = 'none'),
        (U.style.transform = 'none'),
        b && b(U, W);
    }),
    q = L(x),
    z = L(T),
    A = L((U) => {
      const W = so({ timeout: E, style: C, easing: p }, { mode: 'exit' });
      (U.style.webkitTransition = r.transitions.create('-webkit-transform', W)),
        (U.style.transition = r.transitions.create('transform', W)),
        er(d, U, u),
        m && m(U);
    }),
    F = L((U) => {
      (U.style.webkitTransition = ''), (U.style.transition = ''), k && k(U);
    }),
    B = (U) => {
      s && s(w.current, U);
    },
    te = y.useCallback(() => {
      w.current && er(d, w.current, u);
    }, [d, u]);
  return (
    y.useEffect(() => {
      if (h || d === 'down' || d === 'right') return;
      const U = Li(() => {
          w.current && er(d, w.current, u);
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
    _(
      f,
      g(
        {
          nodeRef: w,
          onEnter: D,
          onEntered: q,
          onEntering: I,
          onExit: A,
          onExited: F,
          onExiting: z,
          addEndListener: B,
          appear: l,
          in: h,
          timeout: E,
        },
        S,
        {
          children: (U, W) =>
            y.cloneElement(
              c,
              g(
                {
                  ref: j,
                  style: g(
                    { visibility: U === 'exited' && !h ? 'hidden' : void 0 },
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
  (Xc.propTypes = {
    addEndListener: n.func,
    appear: n.bool,
    children: Fn.isRequired,
    container: Vt(n.oneOfType([Jt, n.func]), (e) => {
      if (e.open) {
        const t = Kc(e.container);
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
    direction: n.oneOf(['down', 'left', 'right', 'up']),
    easing: n.oneOfType([n.shape({ enter: n.string, exit: n.string }), n.string]),
    in: n.bool,
    onEnter: n.func,
    onEntered: n.func,
    onEntering: n.func,
    onExit: n.func,
    onExited: n.func,
    onExiting: n.func,
    style: n.object,
    timeout: n.oneOfType([
      n.number,
      n.shape({ appear: n.number, enter: n.number, exit: n.number }),
    ]),
  });
const Iy = Xc;
function _y(e) {
  return Pe('MuiDrawer', e);
}
Re('MuiDrawer', [
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
const My = ['BackdropProps'],
  Ay = [
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
  Jc = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, (o.variant === 'permanent' || o.variant === 'persistent') && t.docked, t.modal];
  },
  Dy = (e) => {
    const { classes: t, anchor: o, variant: r } = e,
      i = {
        root: ['root'],
        docked: [(r === 'permanent' || r === 'persistent') && 'docked'],
        modal: ['modal'],
        paper: ['paper', `paperAnchor${J(o)}`, r !== 'temporary' && `paperAnchorDocked${J(o)}`],
      };
    return Me(i, _y, t);
  },
  Ly = ce(Gc, { name: 'MuiDrawer', slot: 'Root', overridesResolver: Jc })(({ theme: e }) => ({
    zIndex: (e.vars || e).zIndex.drawer,
  })),
  tl = ce('div', {
    shouldForwardProp: Wt,
    name: 'MuiDrawer',
    slot: 'Docked',
    skipVariantsResolver: !1,
    overridesResolver: Jc,
  })({ flex: '0 0 auto' }),
  jy = ce(Vn, {
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
        WebkitOverflowScrolling: 'touch',
        position: 'fixed',
        top: 0,
        outline: 0,
      },
      t.anchor === 'left' && { left: 0 },
      t.anchor === 'top' && { top: 0, left: 0, right: 0, height: 'auto', maxHeight: '100%' },
      t.anchor === 'right' && { right: 0 },
      t.anchor === 'bottom' && {
        top: 'auto',
        left: 0,
        bottom: 0,
        right: 0,
        height: 'auto',
        maxHeight: '100%',
      },
      t.anchor === 'left' &&
        t.variant !== 'temporary' && { borderRight: `1px solid ${(e.vars || e).palette.divider}` },
      t.anchor === 'top' &&
        t.variant !== 'temporary' && { borderBottom: `1px solid ${(e.vars || e).palette.divider}` },
      t.anchor === 'right' &&
        t.variant !== 'temporary' && { borderLeft: `1px solid ${(e.vars || e).palette.divider}` },
      t.anchor === 'bottom' &&
        t.variant !== 'temporary' && { borderTop: `1px solid ${(e.vars || e).palette.divider}` },
    ),
  ),
  Zc = { left: 'right', right: 'left', top: 'down', bottom: 'up' };
function Fy(e) {
  return ['left', 'right'].indexOf(e) !== -1;
}
function By(e, t) {
  return e.direction === 'rtl' && Fy(t) ? Zc[t] : t;
}
const Qc = y.forwardRef(function (t, o) {
  const r = De({ props: t, name: 'MuiDrawer' }),
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
      TransitionComponent: k = Iy,
      transitionDuration: T = a,
      variant: C = 'temporary',
    } = r,
    E = ye(r.ModalProps, My),
    f = ye(r, Ay),
    S = y.useRef(!1);
  y.useEffect(() => {
    S.current = !0;
  }, []);
  const w = By(i, s),
    L = g({}, r, { anchor: s, elevation: d, open: x, variant: C }, f),
    D = Dy(L),
    I = _(
      jy,
      g({ elevation: C === 'temporary' ? d : 0, square: !0 }, b, {
        className: ve(D.paper, b.className),
        ownerState: L,
        children: c,
      }),
    );
  if (C === 'permanent')
    return _(
      tl,
      g({ className: ve(D.root, D.docked, u), ownerState: L, ref: o }, f, { children: I }),
    );
  const q = _(k, g({ in: x, direction: Zc[w], timeout: T, appear: S.current }, m, { children: I }));
  return C === 'persistent'
    ? _(tl, g({ className: ve(D.root, D.docked, u), ownerState: L, ref: o }, f, { children: q }))
    : _(
        Ly,
        g(
          {
            BackdropProps: g({}, l, h, { transitionDuration: T }),
            className: ve(D.root, D.modal, u),
            open: x,
            ownerState: L,
            onClose: v,
            hideBackdrop: p,
            ref: o,
          },
          f,
          E,
          { children: q },
        ),
      );
});
process.env.NODE_ENV !== 'production' &&
  (Qc.propTypes = {
    anchor: n.oneOf(['bottom', 'left', 'right', 'top']),
    BackdropProps: n.object,
    children: n.node,
    classes: n.object,
    className: n.string,
    elevation: xr,
    hideBackdrop: n.bool,
    ModalProps: n.object,
    onClose: n.func,
    open: n.bool,
    PaperProps: n.object,
    SlideProps: n.object,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    transitionDuration: n.oneOfType([
      n.number,
      n.shape({ appear: n.number, enter: n.number, exit: n.number }),
    ]),
    variant: n.oneOf(['permanent', 'persistent', 'temporary']),
  });
const Vy = Qc,
  zy = [
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
  Uy = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Me({ root: ['root', !o && 'underline'], input: ['input'] }, Rv, t);
    return g({}, t, i);
  },
  Wy = ce(Yr, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Hr(e, t), !o.disableUnderline && t.underline];
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
          '@media (hover: none)': { backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a },
        },
        [`&.${It.focused}`]: { backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a },
        [`&.${It.disabled}`]: {
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
          content: '""',
          position: 'absolute',
          right: 0,
          transform: 'scaleX(0)',
          transition: e.transitions.create('transform', {
            duration: e.transitions.duration.shorter,
            easing: e.transitions.easing.easeOut,
          }),
          pointerEvents: 'none',
        },
        [`&.${It.focused}:after`]: { transform: 'scaleX(1) translateX(0)' },
        [`&.${It.error}`]: {
          '&:before, &:after': { borderBottomColor: (e.vars || e).palette.error.main },
        },
        '&:before': {
          borderBottom: `1px solid ${
            e.vars
              ? `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`
              : i
          }`,
          left: 0,
          bottom: 0,
          content: '"\\00a0"',
          position: 'absolute',
          right: 0,
          transition: e.transitions.create('border-bottom-color', {
            duration: e.transitions.duration.shorter,
          }),
          pointerEvents: 'none',
        },
        [`&:hover:not(.${It.disabled}, .${It.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
        },
        [`&.${It.disabled}:before`]: { borderBottomStyle: 'dotted' },
      },
      t.startAdornment && { paddingLeft: 12 },
      t.endAdornment && { paddingRight: 12 },
      t.multiline &&
        g(
          { padding: '25px 12px 8px' },
          t.size === 'small' && { paddingTop: 21, paddingBottom: 4 },
          t.hiddenLabel && { paddingTop: 16, paddingBottom: 17 },
        ),
    );
  }),
  Hy = ce(Gr, { name: 'MuiFilledInput', slot: 'Input', overridesResolver: qr })(
    ({ theme: e, ownerState: t }) =>
      g(
        { paddingTop: 25, paddingRight: 12, paddingBottom: 8, paddingLeft: 12 },
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
          '&:-webkit-autofill': { borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit' },
          [e.getColorSchemeSelector('dark')]: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #266798 inset',
              WebkitTextFillColor: '#fff',
              caretColor: '#fff',
            },
          },
        },
        t.size === 'small' && { paddingTop: 21, paddingBottom: 4 },
        t.hiddenLabel && { paddingTop: 16, paddingBottom: 17 },
        t.multiline && { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 },
        t.startAdornment && { paddingLeft: 0 },
        t.endAdornment && { paddingRight: 0 },
        t.hiddenLabel && t.size === 'small' && { paddingTop: 8, paddingBottom: 9 },
      ),
  ),
  ga = y.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = De({ props: t, name: 'MuiFilledInput' }),
      {
        components: c = {},
        componentsProps: u,
        fullWidth: d = !1,
        inputComponent: p = 'input',
        multiline: h = !1,
        slotProps: v,
        slots: x = {},
        type: b = 'text',
      } = l,
      m = ye(l, zy),
      k = g({}, l, { fullWidth: d, inputComponent: p, multiline: h, type: b }),
      T = Uy(l),
      C = { root: { ownerState: k }, input: { ownerState: k } },
      E = v ?? u ? Bt(v ?? u, C) : C,
      f = (r = (i = x.root) != null ? i : c.Root) != null ? r : Wy,
      S = (a = (s = x.input) != null ? s : c.Input) != null ? a : Hy;
    return _(
      ba,
      g(
        {
          slots: { root: f, input: S },
          componentsProps: E,
          fullWidth: d,
          inputComponent: p,
          multiline: h,
          ref: o,
          type: b,
        },
        m,
        { classes: T },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ga.propTypes = {
    autoComplete: n.string,
    autoFocus: n.bool,
    classes: n.object,
    color: n.oneOfType([n.oneOf(['primary', 'secondary']), n.string]),
    components: n.shape({ Input: n.elementType, Root: n.elementType }),
    componentsProps: n.shape({ input: n.object, root: n.object }),
    defaultValue: n.any,
    disabled: n.bool,
    disableUnderline: n.bool,
    endAdornment: n.node,
    error: n.bool,
    fullWidth: n.bool,
    hiddenLabel: n.bool,
    id: n.string,
    inputComponent: n.elementType,
    inputProps: n.object,
    inputRef: $t,
    margin: n.oneOf(['dense', 'none']),
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    multiline: n.bool,
    name: n.string,
    onChange: n.func,
    placeholder: n.string,
    readOnly: n.bool,
    required: n.bool,
    rows: n.oneOfType([n.number, n.string]),
    slotProps: n.shape({ input: n.object, root: n.object }),
    slots: n.shape({ input: n.elementType, root: n.elementType }),
    startAdornment: n.node,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    type: n.string,
    value: n.any,
  });
ga.muiName = 'Input';
const eu = ga;
function qy(e) {
  return Pe('MuiFormControl', e);
}
Re('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const Yy = [
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
  Gy = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      i = { root: ['root', o !== 'none' && `margin${J(o)}`, r && 'fullWidth'] };
    return Me(i, qy, t);
  },
  Ky = ce('div', {
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
        minWidth: 0,
        padding: 0,
        margin: 0,
        border: 0,
        verticalAlign: 'top',
      },
      e.margin === 'normal' && { marginTop: 16, marginBottom: 8 },
      e.margin === 'dense' && { marginTop: 8, marginBottom: 4 },
      e.fullWidth && { width: '100%' },
    ),
  ),
  tu = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiFormControl' }),
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
      k = ye(r, Yy),
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
      C = Gy(T),
      [E, f] = y.useState(() => {
        let z = !1;
        return (
          i &&
            y.Children.forEach(i, (A) => {
              if (!ti(A, ['Input', 'Select'])) return;
              const F = ti(A, ['Select']) ? A.props.input : A;
              F && vv(F.props) && (z = !0);
            }),
          z
        );
      }),
      [S, w] = y.useState(() => {
        let z = !1;
        return (
          i &&
            y.Children.forEach(i, (A) => {
              ti(A, ['Input', 'Select']) && ha(A.props, !0) && (z = !0);
            }),
          z
        );
      }),
      [j, L] = y.useState(!1);
    c && j && L(!1);
    const D = d !== void 0 && !c ? d : j;
    let I;
    if (process.env.NODE_ENV !== 'production') {
      const z = y.useRef(!1);
      I = () => (
        z.current &&
          console.error(
            [
              'MUI: There are multiple `InputBase` components inside a FormControl.',
              'This creates visual inconsistencies, only use one `InputBase`.',
            ].join(`
`),
          ),
        (z.current = !0),
        () => {
          z.current = !1;
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
    return _(ma.Provider, {
      value: q,
      children: _(
        Ky,
        g({ as: l, ownerState: T, className: ve(C.root, a), ref: o }, k, { children: i }),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (tu.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([
      n.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    component: n.elementType,
    disabled: n.bool,
    error: n.bool,
    focused: n.bool,
    fullWidth: n.bool,
    hiddenLabel: n.bool,
    margin: n.oneOf(['dense', 'none', 'normal']),
    required: n.bool,
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    variant: n.oneOf(['filled', 'outlined', 'standard']),
  });
const Xy = tu;
function Jy(e) {
  return Pe('MuiFormHelperText', e);
}
const Zy = Re('MuiFormHelperText', [
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
  nl = Zy;
var ol;
const Qy = [
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
  e0 = (e) => {
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
    return Me(u, Jy, t);
  },
  t0 = ce('p', {
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
      { color: (e.vars || e).palette.text.secondary },
      e.typography.caption,
      {
        textAlign: 'left',
        marginTop: 3,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        [`&.${nl.disabled}`]: { color: (e.vars || e).palette.text.disabled },
        [`&.${nl.error}`]: { color: (e.vars || e).palette.error.main },
      },
      t.size === 'small' && { marginTop: 4 },
      t.contained && { marginLeft: 14, marginRight: 14 },
    ),
  ),
  nu = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiFormHelperText' }),
      { children: i, className: a, component: s = 'p' } = r,
      l = ye(r, Qy),
      c = zn(),
      u = uo({
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
      p = e0(d);
    return _(
      t0,
      g({ as: s, ownerState: d, className: ve(p.root, a), ref: o }, l, {
        children:
          i === ' ' ? ol || (ol = _('span', { className: 'notranslate', children: '​' })) : i,
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (nu.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    disabled: n.bool,
    error: n.bool,
    filled: n.bool,
    focused: n.bool,
    margin: n.oneOf(['dense']),
    required: n.bool,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    variant: n.oneOfType([n.oneOf(['filled', 'outlined', 'standard']), n.string]),
  });
const n0 = nu;
function o0(e) {
  return Pe('MuiFormLabel', e);
}
const r0 = Re('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  $o = r0,
  i0 = [
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
  a0 = (e) => {
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
    return Me(c, o0, t);
  },
  s0 = ce('label', {
    name: 'MuiFormLabel',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      g({}, t.root, e.color === 'secondary' && t.colorSecondary, e.filled && t.filled),
  })(({ theme: e, ownerState: t }) =>
    g({ color: (e.vars || e).palette.text.secondary }, e.typography.body1, {
      lineHeight: '1.4375em',
      padding: 0,
      position: 'relative',
      [`&.${$o.focused}`]: { color: (e.vars || e).palette[t.color].main },
      [`&.${$o.disabled}`]: { color: (e.vars || e).palette.text.disabled },
      [`&.${$o.error}`]: { color: (e.vars || e).palette.error.main },
    }),
  ),
  l0 = ce('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({ [`&.${$o.error}`]: { color: (e.vars || e).palette.error.main } })),
  ou = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiFormLabel' }),
      { children: i, className: a, component: s = 'label' } = r,
      l = ye(r, i0),
      c = zn(),
      u = uo({
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
      p = a0(d);
    return Qe(
      s0,
      g({ as: s, ownerState: d, className: ve(p.root, a), ref: o }, l, {
        children: [
          i,
          u.required &&
            Qe(l0, {
              ownerState: d,
              'aria-hidden': !0,
              className: p.asterisk,
              children: [' ', '*'],
            }),
        ],
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ou.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([
      n.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
      n.string,
    ]),
    component: n.elementType,
    disabled: n.bool,
    error: n.bool,
    filled: n.bool,
    focused: n.bool,
    required: n.bool,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const ru = ou,
  iu = y.createContext();
process.env.NODE_ENV !== 'production' && (iu.displayName = 'GridContext');
const rl = iu;
function c0(e) {
  return Pe('MuiGrid', e);
}
const u0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  d0 = ['column-reverse', 'column', 'row-reverse', 'row'],
  p0 = ['nowrap', 'wrap-reverse', 'wrap'],
  yo = ['auto', !0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  jo = Re('MuiGrid', [
    'root',
    'container',
    'item',
    'zeroMinWidth',
    ...u0.map((e) => `spacing-xs-${e}`),
    ...d0.map((e) => `direction-xs-${e}`),
    ...p0.map((e) => `wrap-xs-${e}`),
    ...yo.map((e) => `grid-xs-${e}`),
    ...yo.map((e) => `grid-sm-${e}`),
    ...yo.map((e) => `grid-md-${e}`),
    ...yo.map((e) => `grid-lg-${e}`),
    ...yo.map((e) => `grid-xl-${e}`),
  ]),
  f0 = [
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
function Qn(e) {
  const t = parseFloat(e);
  return `${t}${String(e).replace(String(t), '') || 'px'}`;
}
function m0({ theme: e, ownerState: t }) {
  let o;
  return e.breakpoints.keys.reduce((r, i) => {
    let a = {};
    if ((t[i] && (o = t[i]), !o)) return r;
    if (o === !0) a = { flexBasis: 0, flexGrow: 1, maxWidth: '100%' };
    else if (o === 'auto')
      a = { flexBasis: 'auto', flexGrow: 0, flexShrink: 0, maxWidth: 'none', width: 'auto' };
    else {
      const s = Sr({ values: t.columns, breakpoints: e.breakpoints.values }),
        l = typeof s == 'object' ? s[i] : s;
      if (l == null) return r;
      const c = `${Math.round((o / l) * 1e8) / 1e6}%`;
      let u = {};
      if (t.container && t.item && t.columnSpacing !== 0) {
        const d = e.spacing(t.columnSpacing);
        if (d !== '0px') {
          const p = `calc(${c} + ${Qn(d)})`;
          u = { flexBasis: p, maxWidth: p };
        }
      }
      a = g({ flexBasis: c, flexGrow: 0, maxWidth: c }, u);
    }
    return e.breakpoints.values[i] === 0 ? Object.assign(r, a) : (r[e.breakpoints.up(i)] = a), r;
  }, {});
}
function h0({ theme: e, ownerState: t }) {
  const o = Sr({ values: t.direction, breakpoints: e.breakpoints.values });
  return Dt({ theme: e }, o, (r) => {
    const i = { flexDirection: r };
    return r.indexOf('column') === 0 && (i[`& > .${jo.item}`] = { maxWidth: 'none' }), i;
  });
}
function au({ breakpoints: e, values: t }) {
  let o = '';
  Object.keys(t).forEach((i) => {
    o === '' && t[i] !== 0 && (o = i);
  });
  const r = Object.keys(e).sort((i, a) => e[i] - e[a]);
  return r.slice(0, r.indexOf(o));
}
function b0({ theme: e, ownerState: t }) {
  const { container: o, rowSpacing: r } = t;
  let i = {};
  if (o && r !== 0) {
    const a = Sr({ values: r, breakpoints: e.breakpoints.values });
    let s;
    typeof a == 'object' && (s = au({ breakpoints: e.breakpoints.values, values: a })),
      (i = Dt({ theme: e }, a, (l, c) => {
        var u;
        const d = e.spacing(l);
        return d !== '0px'
          ? { marginTop: `-${Qn(d)}`, [`& > .${jo.item}`]: { paddingTop: Qn(d) } }
          : (u = s) != null && u.includes(c)
          ? {}
          : { marginTop: 0, [`& > .${jo.item}`]: { paddingTop: 0 } };
      }));
  }
  return i;
}
function g0({ theme: e, ownerState: t }) {
  const { container: o, columnSpacing: r } = t;
  let i = {};
  if (o && r !== 0) {
    const a = Sr({ values: r, breakpoints: e.breakpoints.values });
    let s;
    typeof a == 'object' && (s = au({ breakpoints: e.breakpoints.values, values: a })),
      (i = Dt({ theme: e }, a, (l, c) => {
        var u;
        const d = e.spacing(l);
        return d !== '0px'
          ? {
              width: `calc(100% + ${Qn(d)})`,
              marginLeft: `-${Qn(d)}`,
              [`& > .${jo.item}`]: { paddingLeft: Qn(d) },
            }
          : (u = s) != null && u.includes(c)
          ? {}
          : { width: '100%', marginLeft: 0, [`& > .${jo.item}`]: { paddingLeft: 0 } };
      }));
  }
  return i;
}
function v0(e, t, o = {}) {
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
const y0 = ce('div', {
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
    r && (d = v0(s, u, t));
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
      { boxSizing: 'border-box' },
      e.container && { display: 'flex', flexWrap: 'wrap', width: '100%' },
      e.item && { margin: 0 },
      e.zeroMinWidth && { minWidth: 0 },
      e.wrap !== 'wrap' && { flexWrap: e.wrap },
    ),
  h0,
  b0,
  g0,
  m0,
);
function x0(e, t) {
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
const E0 = (e) => {
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
    o && (u = x0(a, c));
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
    return Me(p, c0, t);
  },
  Po = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiGrid' }),
      { breakpoints: i } = hn(),
      a = rm(r),
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
      k = ye(a, f0),
      T = v || x,
      C = c || x,
      E = y.useContext(rl),
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
        { breakpoints: i.keys },
      ),
      L = E0(j);
    return _(rl.Provider, {
      value: f,
      children: _(y0, g({ ownerState: j, className: ve(L.root, s), as: u, ref: o }, w)),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Po.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    columns: n.oneOfType([n.arrayOf(n.number), n.number, n.object]),
    columnSpacing: n.oneOfType([
      n.arrayOf(n.oneOfType([n.number, n.string])),
      n.number,
      n.object,
      n.string,
    ]),
    component: n.elementType,
    container: n.bool,
    direction: n.oneOfType([
      n.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      n.arrayOf(n.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
      n.object,
    ]),
    item: n.bool,
    lg: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    md: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    rowSpacing: n.oneOfType([
      n.arrayOf(n.oneOfType([n.number, n.string])),
      n.number,
      n.object,
      n.string,
    ]),
    sm: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    spacing: n.oneOfType([
      n.arrayOf(n.oneOfType([n.number, n.string])),
      n.number,
      n.object,
      n.string,
    ]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    wrap: n.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
    xl: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    xs: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    zeroMinWidth: n.bool,
  });
if (process.env.NODE_ENV !== 'production') {
  const e = Sd('Grid', Po);
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
const su = Po,
  C0 = [
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
function Pi(e) {
  return `scale(${e}, ${e ** 2})`;
}
const O0 = {
    entering: { opacity: 1, transform: Pi(1) },
    entered: { opacity: 1, transform: 'none' },
  },
  ui =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  va = y.forwardRef(function (t, o) {
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
        TransitionComponent: m = la,
      } = t,
      k = ye(t, C0),
      T = y.useRef(),
      C = y.useRef(),
      E = hn(),
      f = y.useRef(null),
      S = dt(f, a.ref, o),
      w = (F) => (B) => {
        if (F) {
          const te = f.current;
          B === void 0 ? F(te) : F(te, B);
        }
      },
      j = w(d),
      L = w((F, B) => {
        da(F);
        const {
          duration: te,
          delay: U,
          easing: W,
        } = so({ style: x, timeout: b, easing: s }, { mode: 'enter' });
        let R;
        b === 'auto'
          ? ((R = E.transitions.getAutoHeightDuration(F.clientHeight)), (C.current = R))
          : (R = te),
          (F.style.transition = [
            E.transitions.create('opacity', { duration: R, delay: U }),
            E.transitions.create('transform', {
              duration: ui ? R : R * 0.666,
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
        } = so({ style: x, timeout: b, easing: s }, { mode: 'exit' });
        let W;
        b === 'auto'
          ? ((W = E.transitions.getAutoHeightDuration(F.clientHeight)), (C.current = W))
          : (W = B),
          (F.style.transition = [
            E.transitions.create('opacity', { duration: W, delay: te }),
            E.transitions.create('transform', {
              duration: ui ? W : W * 0.666,
              delay: ui ? te : te || W * 0.333,
              easing: U,
            }),
          ].join(',')),
          (F.style.opacity = 0),
          (F.style.transform = Pi(0.75)),
          p && p(F);
      }),
      z = w(h),
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
      _(
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
            onExited: z,
            onExiting: I,
            addEndListener: A,
            timeout: b === 'auto' ? null : b,
          },
          k,
          {
            children: (F, B) =>
              y.cloneElement(
                a,
                g(
                  {
                    style: g(
                      {
                        opacity: 0,
                        transform: Pi(0.75),
                        visibility: F === 'exited' && !l ? 'hidden' : void 0,
                      },
                      O0[F],
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
  (va.propTypes = {
    addEndListener: n.func,
    appear: n.bool,
    children: Fn.isRequired,
    easing: n.oneOfType([n.shape({ enter: n.string, exit: n.string }), n.string]),
    in: n.bool,
    onEnter: n.func,
    onEntered: n.func,
    onEntering: n.func,
    onExit: n.func,
    onExited: n.func,
    onExiting: n.func,
    style: n.object,
    timeout: n.oneOfType([
      n.oneOf(['auto']),
      n.number,
      n.shape({ appear: n.number, enter: n.number, exit: n.number }),
    ]),
  });
va.muiSupportAuto = !0;
const lu = va,
  T0 = [
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
  k0 = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Me({ root: ['root', !o && 'underline'], input: ['input'] }, Tv, t);
    return g({}, t, i);
  },
  w0 = ce(Yr, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Hr(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    let r = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
    return (
      e.vars &&
        (r = `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`),
      g(
        { position: 'relative' },
        t.formControl && { 'label + &': { marginTop: 16 } },
        !t.disableUnderline && {
          '&:after': {
            borderBottom: `2px solid ${(e.vars || e).palette[t.color].main}`,
            left: 0,
            bottom: 0,
            content: '""',
            position: 'absolute',
            right: 0,
            transform: 'scaleX(0)',
            transition: e.transitions.create('transform', {
              duration: e.transitions.duration.shorter,
              easing: e.transitions.easing.easeOut,
            }),
            pointerEvents: 'none',
          },
          [`&.${En.focused}:after`]: { transform: 'scaleX(1) translateX(0)' },
          [`&.${En.error}`]: {
            '&:before, &:after': { borderBottomColor: (e.vars || e).palette.error.main },
          },
          '&:before': {
            borderBottom: `1px solid ${r}`,
            left: 0,
            bottom: 0,
            content: '"\\00a0"',
            position: 'absolute',
            right: 0,
            transition: e.transitions.create('border-bottom-color', {
              duration: e.transitions.duration.shorter,
            }),
            pointerEvents: 'none',
          },
          [`&:hover:not(.${En.disabled}, .${En.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            '@media (hover: none)': { borderBottom: `1px solid ${r}` },
          },
          [`&.${En.disabled}:before`]: { borderBottomStyle: 'dotted' },
        },
      )
    );
  }),
  S0 = ce(Gr, { name: 'MuiInput', slot: 'Input', overridesResolver: qr })({}),
  ya = y.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = De({ props: t, name: 'MuiInput' }),
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
      k = ye(l, T0),
      T = k0(l),
      E = { root: { ownerState: { disableUnderline: c } } },
      f = x ?? d ? Bt(x ?? d, E) : E,
      S = (r = (i = b.root) != null ? i : u.Root) != null ? r : w0,
      w = (a = (s = b.input) != null ? s : u.Input) != null ? a : S0;
    return _(
      ba,
      g(
        {
          slots: { root: S, input: w },
          slotProps: f,
          fullWidth: p,
          inputComponent: h,
          multiline: v,
          ref: o,
          type: m,
        },
        k,
        { classes: T },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ya.propTypes = {
    autoComplete: n.string,
    autoFocus: n.bool,
    classes: n.object,
    color: n.oneOfType([n.oneOf(['primary', 'secondary']), n.string]),
    components: n.shape({ Input: n.elementType, Root: n.elementType }),
    componentsProps: n.shape({ input: n.object, root: n.object }),
    defaultValue: n.any,
    disabled: n.bool,
    disableUnderline: n.bool,
    endAdornment: n.node,
    error: n.bool,
    fullWidth: n.bool,
    id: n.string,
    inputComponent: n.elementType,
    inputProps: n.object,
    inputRef: $t,
    margin: n.oneOf(['dense', 'none']),
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    multiline: n.bool,
    name: n.string,
    onChange: n.func,
    placeholder: n.string,
    readOnly: n.bool,
    required: n.bool,
    rows: n.oneOfType([n.number, n.string]),
    slotProps: n.shape({ input: n.object, root: n.object }),
    slots: n.shape({ input: n.elementType, root: n.elementType }),
    startAdornment: n.node,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    type: n.string,
    value: n.any,
  });
ya.muiName = 'Input';
const cu = ya;
function R0(e) {
  return Pe('MuiInputLabel', e);
}
Re('MuiInputLabel', [
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
const N0 = ['disableAnimation', 'margin', 'shrink', 'variant', 'className'],
  $0 = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: i,
        disableAnimation: a,
        variant: s,
        required: l,
      } = e,
      u = Me(
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
        R0,
        t,
      );
    return g({}, t, u);
  },
  P0 = ce(ru, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`& .${$o.asterisk}`]: t.asterisk },
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
        transform: 'translate(0, 20px) scale(1)',
      },
      t.size === 'small' && { transform: 'translate(0, 17px) scale(1)' },
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
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translate(12px, 16px) scale(1)',
            maxWidth: 'calc(100% - 24px)',
          },
          t.size === 'small' && { transform: 'translate(12px, 13px) scale(1)' },
          t.shrink &&
            g(
              {
                userSelect: 'none',
                pointerEvents: 'auto',
                transform: 'translate(12px, 7px) scale(0.75)',
                maxWidth: 'calc(133% - 24px)',
              },
              t.size === 'small' && { transform: 'translate(12px, 4px) scale(0.75)' },
            ),
        ),
      t.variant === 'outlined' &&
        g(
          {
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translate(14px, 16px) scale(1)',
            maxWidth: 'calc(100% - 24px)',
          },
          t.size === 'small' && { transform: 'translate(14px, 9px) scale(1)' },
          t.shrink && {
            userSelect: 'none',
            pointerEvents: 'auto',
            maxWidth: 'calc(133% - 32px)',
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        ),
    ),
  ),
  uu = y.forwardRef(function (t, o) {
    const r = De({ name: 'MuiInputLabel', props: t }),
      { disableAnimation: i = !1, shrink: a, className: s } = r,
      l = ye(r, N0),
      c = zn();
    let u = a;
    typeof u > 'u' && c && (u = c.filled || c.focused || c.adornedStart);
    const d = uo({ props: r, muiFormControl: c, states: ['size', 'variant', 'required'] }),
      p = g({}, r, {
        disableAnimation: i,
        formControl: c,
        shrink: u,
        size: d.size,
        variant: d.variant,
        required: d.required,
      }),
      h = $0(p);
    return _(
      P0,
      g({ 'data-shrink': u, ownerState: p, ref: o, className: ve(h.root, s) }, l, { classes: h }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (uu.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([
      n.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
      n.string,
    ]),
    disableAnimation: n.bool,
    disabled: n.bool,
    error: n.bool,
    focused: n.bool,
    margin: n.oneOf(['dense']),
    required: n.bool,
    shrink: n.bool,
    size: n.oneOfType([n.oneOf(['normal', 'small']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    variant: n.oneOf(['filled', 'outlined', 'standard']),
  });
const I0 = uu,
  du = y.createContext({});
process.env.NODE_ENV !== 'production' && (du.displayName = 'ListContext');
const Ii = du;
function _0(e) {
  return Pe('MuiList', e);
}
Re('MuiList', ['root', 'padding', 'dense', 'subheader']);
const M0 = ['children', 'className', 'component', 'dense', 'disablePadding', 'subheader'],
  A0 = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: i } = e;
    return Me({ root: ['root', !o && 'padding', r && 'dense', i && 'subheader'] }, _0, t);
  },
  D0 = ce('ul', {
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
      { listStyle: 'none', margin: 0, padding: 0, position: 'relative' },
      !e.disablePadding && { paddingTop: 8, paddingBottom: 8 },
      e.subheader && { paddingTop: 0 },
    ),
  ),
  pu = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiList' }),
      {
        children: i,
        className: a,
        component: s = 'ul',
        dense: l = !1,
        disablePadding: c = !1,
        subheader: u,
      } = r,
      d = ye(r, M0),
      p = y.useMemo(() => ({ dense: l }), [l]),
      h = g({}, r, { component: s, dense: l, disablePadding: c }),
      v = A0(h);
    return _(Ii.Provider, {
      value: p,
      children: Qe(
        D0,
        g({ as: s, className: ve(v.root, a), ref: o, ownerState: h }, d, { children: [u, i] }),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (pu.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    dense: n.bool,
    disablePadding: n.bool,
    subheader: n.node,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const L0 = pu,
  j0 = Re('MuiListItemIcon', ['root', 'alignItemsFlexStart']),
  il = j0,
  F0 = Re('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']),
  al = F0,
  B0 = [
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
function di(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function sl(e, t, o) {
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
function fu(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function xo(e, t, o, r, i, a) {
  let s = !1,
    l = i(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !fu(l, a) || c) l = i(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const mu = y.forwardRef(function (t, o) {
  const {
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
    h = ye(t, B0),
    v = y.useRef(null),
    x = y.useRef({ keys: [], repeating: !0, previousKeyMatched: !0, lastTime: null });
  an(() => {
    i && v.current.focus();
  }, [i]),
    y.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (C, E) => {
          const f = !v.current.style.width;
          if (C.clientHeight < v.current.clientHeight && f) {
            const S = `${Al(ut(C))}px`;
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
        S = ut(E).activeElement;
      if (f === 'ArrowDown') C.preventDefault(), xo(E, S, u, c, di);
      else if (f === 'ArrowUp') C.preventDefault(), xo(E, S, u, c, sl);
      else if (f === 'Home') C.preventDefault(), xo(E, null, u, c, di);
      else if (f === 'End') C.preventDefault(), xo(E, null, u, c, sl);
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
        const D = S && !w.repeating && fu(S, w);
        w.previousKeyMatched && (D || xo(E, S, !1, c, di, w))
          ? C.preventDefault()
          : (w.previousKeyMatched = !1);
      }
      d && d(C);
    },
    m = dt(v, o);
  let k = -1;
  y.Children.forEach(s, (C, E) => {
    y.isValidElement(C) &&
      (process.env.NODE_ENV !== 'production' &&
        sa.isFragment(C) &&
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
        y.cloneElement(C, f)
      );
    }
    return C;
  });
  return _(
    L0,
    g({ role: 'menu', ref: m, className: l, onKeyDown: b, tabIndex: i ? 0 : -1 }, h, {
      children: T,
    }),
  );
});
process.env.NODE_ENV !== 'production' &&
  (mu.propTypes = {
    autoFocus: n.bool,
    autoFocusItem: n.bool,
    children: n.node,
    className: n.string,
    disabledItemsFocusable: n.bool,
    disableListWrap: n.bool,
    onKeyDown: n.func,
    variant: n.oneOf(['menu', 'selectedMenu']),
  });
const V0 = mu;
function z0(e) {
  return Pe('MuiPopover', e);
}
Re('MuiPopover', ['root', 'paper']);
const U0 = ['onEntering'],
  W0 = [
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
function ll(e, t) {
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
function cl(e, t) {
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
function ul(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function ar(e) {
  return typeof e == 'function' ? e() : e;
}
const H0 = (e) => {
    const { classes: t } = e;
    return Me({ root: ['root'], paper: ['paper'] }, z0, t);
  },
  q0 = ce(Gc, { name: 'MuiPopover', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  Y0 = ce(Vn, { name: 'MuiPopover', slot: 'Paper', overridesResolver: (e, t) => t.paper })({
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    outline: 0,
  }),
  hu = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiPopover' }),
      {
        action: i,
        anchorEl: a,
        anchorOrigin: s = { vertical: 'top', horizontal: 'left' },
        anchorPosition: l,
        anchorReference: c = 'anchorEl',
        children: u,
        className: d,
        container: p,
        elevation: h = 8,
        marginThreshold: v = 16,
        open: x,
        PaperProps: b = {},
        transformOrigin: m = { vertical: 'top', horizontal: 'left' },
        TransitionComponent: k = lu,
        transitionDuration: T = 'auto',
        TransitionProps: { onEntering: C } = {},
      } = r,
      E = ye(r.TransitionProps, U0),
      f = ye(r, W0),
      S = y.useRef(),
      w = dt(S, b.ref),
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
      L = H0(j),
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
        const R = ar(a),
          V = R && R.nodeType === 1 ? R : ut(S.current).body,
          Z = V.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'production') {
          const G = V.getBoundingClientRect();
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
        return { top: Z.top + ll(Z, s.vertical), left: Z.left + cl(Z, s.horizontal) };
      }, [a, s.horizontal, s.vertical, l, c]),
      I = y.useCallback(
        (R) => ({ vertical: ll(R, m.vertical), horizontal: cl(R, m.horizontal) }),
        [m.horizontal, m.vertical],
      ),
      q = y.useCallback(
        (R) => {
          const V = { width: R.offsetWidth, height: R.offsetHeight },
            Z = I(V);
          if (c === 'none') return { top: null, left: null, transformOrigin: ul(Z) };
          const G = D();
          let H = G.top - Z.vertical,
            re = G.left - Z.horizontal;
          const ie = H + V.height,
            Q = re + V.width,
            se = mn(ar(a)),
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
              V.height > le &&
              V.height &&
              le &&
              console.error(
                [
                  'MUI: The popover component is too tall.',
                  `Some part of it can not be seen on the screen (${V.height - le}px).`,
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
          return { top: `${Math.round(H)}px`, left: `${Math.round(re)}px`, transformOrigin: ul(Z) };
        },
        [a, c, D, I, v],
      ),
      [z, A] = y.useState(x),
      F = y.useCallback(() => {
        const R = S.current;
        if (!R) return;
        const V = q(R);
        V.top !== null && (R.style.top = V.top),
          V.left !== null && (R.style.left = V.left),
          (R.style.transformOrigin = V.transformOrigin),
          A(!0);
      }, [q]),
      B = (R, V) => {
        C && C(R, V), F();
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
        const R = Li(() => {
            F();
          }),
          V = mn(a);
        return (
          V.addEventListener('resize', R),
          () => {
            R.clear(), V.removeEventListener('resize', R);
          }
        );
      }, [a, x, F]);
    let U = T;
    T === 'auto' && !k.muiSupportAuto && (U = void 0);
    const W = p || (a ? ut(ar(a)).body : void 0);
    return _(
      q0,
      g(
        {
          BackdropProps: { invisible: !0 },
          className: ve(L.root, d),
          container: W,
          open: x,
          ref: o,
          ownerState: j,
        },
        f,
        {
          children: _(
            k,
            g({ appear: !0, in: x, onEntering: B, onExited: te, timeout: U }, E, {
              children: _(
                Y0,
                g(
                  { elevation: h },
                  b,
                  { ref: w, className: ve(L.paper, b.className) },
                  z ? void 0 : { style: g({}, b.style, { opacity: 0 }) },
                  { ownerState: j, children: u },
                ),
              ),
            }),
          ),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (hu.propTypes = {
    action: $t,
    anchorEl: Vt(n.oneOfType([Jt, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = ar(e.anchorEl);
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
    anchorOrigin: n.shape({
      horizontal: n.oneOfType([n.oneOf(['center', 'left', 'right']), n.number]).isRequired,
      vertical: n.oneOfType([n.oneOf(['bottom', 'center', 'top']), n.number]).isRequired,
    }),
    anchorPosition: n.shape({ left: n.number.isRequired, top: n.number.isRequired }),
    anchorReference: n.oneOf(['anchorEl', 'anchorPosition', 'none']),
    children: n.node,
    classes: n.object,
    className: n.string,
    container: n.oneOfType([Jt, n.func]),
    elevation: xr,
    marginThreshold: n.number,
    onClose: n.func,
    open: n.bool.isRequired,
    PaperProps: n.shape({ component: Ai }),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    transformOrigin: n.shape({
      horizontal: n.oneOfType([n.oneOf(['center', 'left', 'right']), n.number]).isRequired,
      vertical: n.oneOfType([n.oneOf(['bottom', 'center', 'top']), n.number]).isRequired,
    }),
    TransitionComponent: n.elementType,
    transitionDuration: n.oneOfType([
      n.oneOf(['auto']),
      n.number,
      n.shape({ appear: n.number, enter: n.number, exit: n.number }),
    ]),
    TransitionProps: n.object,
  });
const G0 = hu;
function K0(e) {
  return Pe('MuiMenu', e);
}
Re('MuiMenu', ['root', 'paper', 'list']);
const X0 = ['onEntering'],
  J0 = [
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
  Z0 = { vertical: 'top', horizontal: 'right' },
  Q0 = { vertical: 'top', horizontal: 'left' },
  ex = (e) => {
    const { classes: t } = e;
    return Me({ root: ['root'], paper: ['paper'], list: ['list'] }, K0, t);
  },
  tx = ce(G0, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  nx = ce(Vn, { name: 'MuiMenu', slot: 'Paper', overridesResolver: (e, t) => t.paper })({
    maxHeight: 'calc(100% - 96px)',
    WebkitOverflowScrolling: 'touch',
  }),
  ox = ce(V0, { name: 'MuiMenu', slot: 'List', overridesResolver: (e, t) => t.list })({
    outline: 0,
  }),
  bu = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiMenu' }),
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
      b = ye(r.TransitionProps, X0),
      m = ye(r, J0),
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
      E = ex(C),
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
        y.isValidElement(D) &&
          (process.env.NODE_ENV !== 'production' &&
            sa.isFragment(D) &&
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
      _(
        tx,
        g(
          {
            onClose: c,
            anchorOrigin: { vertical: 'bottom', horizontal: T ? 'right' : 'left' },
            transformOrigin: T ? Z0 : Q0,
            PaperProps: g({ as: nx }, d, { classes: g({}, d.classes, { root: E.paper }) }),
            className: E.root,
            open: u,
            ref: o,
            transitionDuration: h,
            TransitionProps: g({ onEntering: w }, b),
            ownerState: C,
          },
          m,
          {
            classes: p,
            children: _(
              ox,
              g(
                {
                  onKeyDown: j,
                  actions: S,
                  autoFocus: i && (L === -1 || s),
                  autoFocusItem: f,
                  variant: x,
                },
                l,
                { className: ve(E.list, l.className), children: a },
              ),
            ),
          },
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (bu.propTypes = {
    anchorEl: n.oneOfType([Jt, n.func]),
    autoFocus: n.bool,
    children: n.node,
    classes: n.object,
    disableAutoFocusItem: n.bool,
    MenuListProps: n.object,
    onClose: n.func,
    open: n.bool.isRequired,
    PaperProps: n.object,
    PopoverClasses: n.object,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    transitionDuration: n.oneOfType([
      n.oneOf(['auto']),
      n.number,
      n.shape({ appear: n.number, enter: n.number, exit: n.number }),
    ]),
    TransitionProps: n.object,
    variant: n.oneOf(['menu', 'selectedMenu']),
  });
const rx = bu;
function ix(e) {
  return Pe('MuiMenuItem', e);
}
const ax = Re('MuiMenuItem', [
    'root',
    'focusVisible',
    'dense',
    'disabled',
    'divider',
    'gutters',
    'selected',
  ]),
  Eo = ax,
  sx = [
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
  lx = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
  },
  cx = (e) => {
    const { disabled: t, dense: o, divider: r, disableGutters: i, selected: a, classes: s } = e,
      c = Me(
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
        ix,
        s,
      );
    return g({}, s, c);
  },
  ux = ce(lo, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiMenuItem',
    slot: 'Root',
    overridesResolver: lx,
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
      !t.disableGutters && { paddingLeft: 16, paddingRight: 16 },
      t.divider && {
        borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
        backgroundClip: 'padding-box',
      },
      {
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: (e.vars || e).palette.action.hover,
          '@media (hover: none)': { backgroundColor: 'transparent' },
        },
        [`&.${Eo.selected}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
            : Ze(e.palette.primary.main, e.palette.action.selectedOpacity),
          [`&.${Eo.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : Ze(
                  e.palette.primary.main,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        [`&.${Eo.selected}:hover`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : Ze(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          '@media (hover: none)': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
              : Ze(e.palette.primary.main, e.palette.action.selectedOpacity),
          },
        },
        [`&.${Eo.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
        [`&.${Eo.disabled}`]: { opacity: (e.vars || e).palette.action.disabledOpacity },
        [`& + .${el.root}`]: { marginTop: e.spacing(1), marginBottom: e.spacing(1) },
        [`& + .${el.inset}`]: { marginLeft: 52 },
        [`& .${al.root}`]: { marginTop: 0, marginBottom: 0 },
        [`& .${al.inset}`]: { paddingLeft: 36 },
        [`& .${il.root}`]: { minWidth: 36 },
      },
      !t.dense && { [e.breakpoints.up('sm')]: { minHeight: 'auto' } },
      t.dense &&
        g({ minHeight: 32, paddingTop: 4, paddingBottom: 4 }, e.typography.body2, {
          [`& .${il.root} svg`]: { fontSize: '1.25rem' },
        }),
    ),
  ),
  gu = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiMenuItem' }),
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
      v = ye(r, sx),
      x = y.useContext(Ii),
      b = y.useMemo(() => ({ dense: s || x.dense || !1, disableGutters: c }), [x.dense, s, c]),
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
    const k = g({}, r, { dense: b.dense, divider: l, disableGutters: c }),
      T = cx(r),
      C = dt(m, o);
    let E;
    return (
      r.disabled || (E = p !== void 0 ? p : -1),
      _(Ii.Provider, {
        value: b,
        children: _(
          ux,
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
            { ownerState: k, classes: T },
          ),
        ),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (gu.propTypes = {
    autoFocus: n.bool,
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    dense: n.bool,
    disabled: n.bool,
    disableGutters: n.bool,
    divider: n.bool,
    focusVisibleClassName: n.string,
    role: n.string,
    selected: n.bool,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    tabIndex: n.number,
  });
const dx = gu;
function px(e) {
  return Pe('MuiNativeSelect', e);
}
const fx = Re('MuiNativeSelect', [
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
  xa = fx,
  mx = ['className', 'disabled', 'IconComponent', 'inputRef', 'variant'],
  hx = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${J(o)}`, a && 'iconOpen', r && 'disabled'],
      };
    return Me(s, px, t);
  },
  vu = ({ ownerState: e, theme: t }) =>
    g(
      {
        MozAppearance: 'none',
        WebkitAppearance: 'none',
        userSelect: 'none',
        borderRadius: 0,
        cursor: 'pointer',
        '&:focus': g(
          {},
          t.vars
            ? { backgroundColor: `rgba(${t.vars.palette.common.onBackgroundChannel} / 0.05)` }
            : {
                backgroundColor:
                  t.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
              },
          { borderRadius: 0 },
        ),
        '&::-ms-expand': { display: 'none' },
        [`&.${xa.disabled}`]: { cursor: 'default' },
        '&[multiple]': { height: 'auto' },
        '&:not([multiple]) option, &:not([multiple]) optgroup': {
          backgroundColor: (t.vars || t).palette.background.paper,
        },
        '&&&': { paddingRight: 24, minWidth: 16 },
      },
      e.variant === 'filled' && { '&&&': { paddingRight: 32 } },
      e.variant === 'outlined' && {
        borderRadius: (t.vars || t).shape.borderRadius,
        '&:focus': { borderRadius: (t.vars || t).shape.borderRadius },
        '&&&': { paddingRight: 32 },
      },
    ),
  bx = ce('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: Wt,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.select, t[o.variant], { [`&.${xa.multiple}`]: t.multiple }];
    },
  })(vu),
  yu = ({ ownerState: e, theme: t }) =>
    g(
      {
        position: 'absolute',
        right: 0,
        top: 'calc(50% - .5em)',
        pointerEvents: 'none',
        color: (t.vars || t).palette.action.active,
        [`&.${xa.disabled}`]: { color: (t.vars || t).palette.action.disabled },
      },
      e.open && { transform: 'rotate(180deg)' },
      e.variant === 'filled' && { right: 7 },
      e.variant === 'outlined' && { right: 7 },
    ),
  gx = ce('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${J(o.variant)}`], o.open && t.iconOpen];
    },
  })(yu),
  xu = y.forwardRef(function (t, o) {
    const { className: r, disabled: i, IconComponent: a, inputRef: s, variant: l = 'standard' } = t,
      c = ye(t, mx),
      u = g({}, t, { disabled: i, variant: l }),
      d = hx(u);
    return Qe(y.Fragment, {
      children: [
        _(bx, g({ ownerState: u, className: ve(d.select, r), disabled: i, ref: s || o }, c)),
        t.multiple ? null : _(gx, { as: a, ownerState: u, className: d.icon }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (xu.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    disabled: n.bool,
    IconComponent: n.elementType.isRequired,
    inputRef: $t,
    multiple: n.bool,
    name: n.string,
    onChange: n.func,
    value: n.any,
    variant: n.oneOf(['standard', 'outlined', 'filled']),
  });
const vx = xu;
var dl;
const yx = ['children', 'classes', 'className', 'label', 'notched'],
  xx = ce('fieldset')({
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
  Ex = ce('legend')(({ ownerState: e, theme: t }) =>
    g(
      { float: 'unset', width: 'auto', overflow: 'hidden' },
      !e.withLabel && {
        padding: 0,
        lineHeight: '11px',
        transition: t.transitions.create('width', {
          duration: 150,
          easing: t.transitions.easing.easeOut,
        }),
      },
      e.withLabel &&
        g(
          {
            display: 'block',
            padding: 0,
            height: 11,
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
function Eu(e) {
  const { className: t, label: o, notched: r } = e,
    i = ye(e, yx),
    a = o != null && o !== '',
    s = g({}, e, { notched: r, withLabel: a });
  return _(
    xx,
    g({ 'aria-hidden': !0, className: t, ownerState: s }, i, {
      children: _(Ex, {
        ownerState: s,
        children: a
          ? _('span', { children: o })
          : dl || (dl = _('span', { className: 'notranslate', children: '​' })),
      }),
    }),
  );
}
process.env.NODE_ENV !== 'production' &&
  (Eu.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    label: n.node,
    notched: n.bool.isRequired,
    style: n.object,
  });
const Cx = [
    'components',
    'fullWidth',
    'inputComponent',
    'label',
    'multiline',
    'notched',
    'slots',
    'type',
  ],
  Ox = (e) => {
    const { classes: t } = e,
      r = Me({ root: ['root'], notchedOutline: ['notchedOutline'], input: ['input'] }, wv, t);
    return g({}, t, r);
  },
  Tx = ce(Yr, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: Hr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return g(
      {
        position: 'relative',
        borderRadius: (e.vars || e).shape.borderRadius,
        [`&:hover .${tn.notchedOutline}`]: { borderColor: (e.vars || e).palette.text.primary },
        '@media (hover: none)': {
          [`&:hover .${tn.notchedOutline}`]: {
            borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
          },
        },
        [`&.${tn.focused} .${tn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[t.color].main,
          borderWidth: 2,
        },
        [`&.${tn.error} .${tn.notchedOutline}`]: { borderColor: (e.vars || e).palette.error.main },
        [`&.${tn.disabled} .${tn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.action.disabled,
        },
      },
      t.startAdornment && { paddingLeft: 14 },
      t.endAdornment && { paddingRight: 14 },
      t.multiline && g({ padding: '16.5px 14px' }, t.size === 'small' && { padding: '8.5px 14px' }),
    );
  }),
  kx = ce(Eu, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  wx = ce(Gr, { name: 'MuiOutlinedInput', slot: 'Input', overridesResolver: qr })(
    ({ theme: e, ownerState: t }) =>
      g(
        { padding: '16.5px 14px' },
        !e.vars && {
          '&:-webkit-autofill': {
            WebkitBoxShadow: e.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
            WebkitTextFillColor: e.palette.mode === 'light' ? null : '#fff',
            caretColor: e.palette.mode === 'light' ? null : '#fff',
            borderRadius: 'inherit',
          },
        },
        e.vars && {
          '&:-webkit-autofill': { borderRadius: 'inherit' },
          [e.getColorSchemeSelector('dark')]: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #266798 inset',
              WebkitTextFillColor: '#fff',
              caretColor: '#fff',
            },
          },
        },
        t.size === 'small' && { padding: '8.5px 14px' },
        t.multiline && { padding: 0 },
        t.startAdornment && { paddingLeft: 0 },
        t.endAdornment && { paddingRight: 0 },
      ),
  ),
  Ea = y.forwardRef(function (t, o) {
    var r, i, a, s, l;
    const c = De({ props: t, name: 'MuiOutlinedInput' }),
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
      k = ye(c, Cx),
      T = Ox(c),
      C = zn(),
      E = uo({ props: c, muiFormControl: C, states: ['required'] }),
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
      S = (r = (i = b.root) != null ? i : u.Root) != null ? r : Tx,
      w = (a = (s = b.input) != null ? s : u.Input) != null ? a : wx;
    return _(
      ba,
      g(
        {
          slots: { root: S, input: w },
          renderSuffix: (j) =>
            _(kx, {
              ownerState: f,
              className: T.notchedOutline,
              label:
                h != null && h !== '' && E.required
                  ? l || (l = Qe(y.Fragment, { children: [h, ' ', '*'] }))
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
        { classes: g({}, T, { notchedOutline: null }) },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ea.propTypes = {
    autoComplete: n.string,
    autoFocus: n.bool,
    classes: n.object,
    color: n.oneOfType([n.oneOf(['primary', 'secondary']), n.string]),
    components: n.shape({ Input: n.elementType, Root: n.elementType }),
    defaultValue: n.any,
    disabled: n.bool,
    endAdornment: n.node,
    error: n.bool,
    fullWidth: n.bool,
    id: n.string,
    inputComponent: n.elementType,
    inputProps: n.object,
    inputRef: $t,
    label: n.node,
    margin: n.oneOf(['dense', 'none']),
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    multiline: n.bool,
    name: n.string,
    notched: n.bool,
    onChange: n.func,
    placeholder: n.string,
    readOnly: n.bool,
    required: n.bool,
    rows: n.oneOfType([n.number, n.string]),
    slots: n.shape({ input: n.elementType, root: n.elementType }),
    startAdornment: n.node,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    type: n.string,
    value: n.any,
  });
Ea.muiName = 'Input';
const Cu = Ea;
function Sx(e) {
  return Pe('MuiSelect', e);
}
const Rx = Re('MuiSelect', [
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
  tr = Rx;
var pl;
const Nx = [
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
  $x = ce('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`&.${tr.select}`]: t.select },
        { [`&.${tr.select}`]: t[o.variant] },
        { [`&.${tr.multiple}`]: t.multiple },
      ];
    },
  })(vu, {
    [`&.${tr.select}`]: {
      height: 'auto',
      minHeight: '1.4375em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  Px = ce('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${J(o.variant)}`], o.open && t.iconOpen];
    },
  })(yu),
  Ix = ce('input', {
    shouldForwardProp: (e) => Qi(e) && e !== 'classes',
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
function fl(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function _x(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const Mx = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${J(o)}`, a && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return Me(s, Sx, t);
  },
  Ou = y.forwardRef(function (t, o) {
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
        value: z,
        variant: A = 'standard',
      } = t,
      F = ye(t, Nx),
      [B, te] = An({ controlled: z, default: d, name: 'Select' }),
      [U, W] = An({ controlled: j, default: u, name: 'Select' }),
      R = y.useRef(null),
      V = y.useRef(null),
      [Z, G] = y.useState(null),
      { current: H } = y.useRef(j != null),
      [re, ie] = y.useState(),
      Q = dt(o, x),
      se = y.useCallback((ne) => {
        (V.current = ne), ne && G(ne);
      }, []),
      le = Z == null ? void 0 : Z.parentNode;
    y.useImperativeHandle(
      Q,
      () => ({
        focus: () => {
          V.current.focus();
        },
        node: R.current,
        value: B,
      }),
      [B],
    ),
      y.useEffect(() => {
        u && U && Z && !H && (ie(s ? null : le.clientWidth), V.current.focus());
      }, [Z, s]),
      y.useEffect(() => {
        a && V.current.focus();
      }, [a]),
      y.useEffect(() => {
        if (!b) return;
        const ne = ut(V.current).getElementById(b);
        if (ne) {
          const Ee = () => {
            getSelection().isCollapsed && V.current.focus();
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
        ne.button === 0 && (ne.preventDefault(), V.current.focus(), he(!0, ne));
      },
      P = (ne) => {
        he(!1, ne);
      },
      Oe = y.Children.toArray(l),
      M = (ne) => {
        const Ee = Oe.map((Ae) => Ae.props.value).indexOf(ne.target.value);
        if (Ee === -1) return;
        const Ce = Oe[Ee];
        te(Ce.props.value), E && E(ne, Ce);
      },
      Y = (ne) => (Ee) => {
        let Ce;
        if (Ee.currentTarget.hasAttribute('tabindex')) {
          if (k) {
            Ce = Array.isArray(B) ? B.slice() : [];
            const Ae = B.indexOf(ne.props.value);
            Ae === -1 ? Ce.push(ne.props.value) : Ce.splice(Ae, 1);
          } else Ce = ne.props.value;
          if ((ne.props.onClick && ne.props.onClick(Ee), B !== Ce && (te(Ce), E))) {
            const Ae = Ee.nativeEvent || Ee,
              st = new Ae.constructor(Ae.type, Ae);
            Object.defineProperty(st, 'target', { writable: !0, value: { value: Ce, name: T } }),
              E(st, ne);
          }
          k || he(!1, Ee);
        }
      },
      Ie = (ne) => {
        L ||
          ([' ', 'ArrowUp', 'ArrowDown', 'Enter'].indexOf(ne.key) !== -1 &&
            (ne.preventDefault(), he(!0, ne)));
      },
      ge = Z !== null && U,
      tt = (ne) => {
        !ge &&
          C &&
          (Object.defineProperty(ne, 'target', { writable: !0, value: { value: B, name: T } }),
          C(ne));
      };
    delete F['aria-invalid'];
    let Ve, we;
    const Ne = [];
    let nt = !1,
      at = !1;
    (ha({ value: B }) || h) && (D ? (Ve = D(B)) : (nt = !0));
    const ee = Oe.map((ne) => {
      if (!y.isValidElement(ne)) return null;
      process.env.NODE_ENV !== 'production' &&
        sa.isFragment(ne) &&
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
              : On(2),
          );
        (Ee = B.some((Ce) => fl(Ce, ne.props.value))), Ee && nt && Ne.push(ne.props.children);
      } else (Ee = fl(B, ne.props.value)), Ee && nt && (we = ne.props.children);
      return (
        Ee && (at = !0),
        y.cloneElement(ne, {
          'aria-selected': Ee ? 'true' : 'false',
          onClick: Y(ne),
          onKeyUp: (Ce) => {
            Ce.key === ' ' && Ce.preventDefault(), ne.props.onKeyUp && ne.props.onKeyUp(Ce);
          },
          role: 'option',
          selected: Ee,
          value: void 0,
          'data-value': ne.props.value,
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      y.useEffect(() => {
        if (!at && !k && B !== '') {
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
      }, [at, Oe, k, T, B]),
      nt &&
        (k
          ? Ne.length === 0
            ? (Ve = null)
            : (Ve = Ne.reduce(
                (ne, Ee, Ce) => (ne.push(Ee), Ce < Ne.length - 1 && ne.push(', '), ne),
                [],
              ))
          : (Ve = we));
    let me = re;
    !s && H && Z && (me = le.clientWidth);
    let xe;
    typeof q < 'u' ? (xe = q) : (xe = p ? null : 0);
    const be = I.id || (T ? `mui-component-select-${T}` : void 0),
      fe = g({}, t, { variant: A, value: B, open: ge }),
      de = Mx(fe);
    return Qe(y.Fragment, {
      children: [
        _(
          $x,
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
              onKeyDown: Ie,
              onMouseDown: p || L ? null : ae,
              onBlur: tt,
              onFocus: S,
            },
            I,
            {
              ownerState: fe,
              className: ve(I.className, de.select, c),
              id: be,
              children: _x(Ve)
                ? pl || (pl = _('span', { className: 'notranslate', children: '​' }))
                : Ve,
            },
          ),
        ),
        _(
          Ix,
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
        _(Px, { as: v, className: de.icon, ownerState: fe }),
        _(
          rx,
          g(
            {
              id: `menu-${T || ''}`,
              anchorEl: le,
              open: ge,
              onClose: P,
              anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
              transformOrigin: { vertical: 'top', horizontal: 'center' },
            },
            m,
            {
              MenuListProps: g(
                { 'aria-labelledby': b, role: 'listbox', disableListWrap: !0 },
                m.MenuListProps,
              ),
              PaperProps: g({}, m.PaperProps, {
                style: g({ minWidth: me }, m.PaperProps != null ? m.PaperProps.style : null),
              }),
              children: ee,
            },
          ),
        ),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Ou.propTypes = {
    'aria-describedby': n.string,
    'aria-label': n.string,
    autoFocus: n.bool,
    autoWidth: n.bool,
    children: n.node,
    classes: n.object,
    className: n.string,
    defaultOpen: n.bool,
    defaultValue: n.any,
    disabled: n.bool,
    displayEmpty: n.bool,
    IconComponent: n.elementType.isRequired,
    inputRef: $t,
    labelId: n.string,
    MenuProps: n.object,
    multiple: n.bool,
    name: n.string,
    onBlur: n.func,
    onChange: n.func,
    onClose: n.func,
    onFocus: n.func,
    onOpen: n.func,
    open: n.bool,
    readOnly: n.bool,
    renderValue: n.func,
    SelectDisplayProps: n.object,
    tabIndex: n.oneOfType([n.number, n.string]),
    type: n.any,
    value: n.any,
    variant: n.oneOf(['standard', 'outlined', 'filled']),
  });
const Ax = Ou;
var ml, hl;
const Dx = [
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
  Lx = (e) => {
    const { classes: t } = e;
    return t;
  },
  Ca = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => Wt(e) && e !== 'variant',
    slot: 'Root',
  },
  jx = ce(cu, Ca)(''),
  Fx = ce(Cu, Ca)(''),
  Bx = ce(eu, Ca)(''),
  Oa = y.forwardRef(function (t, o) {
    const r = De({ name: 'MuiSelect', props: t }),
      {
        autoWidth: i = !1,
        children: a,
        classes: s = {},
        className: l,
        defaultOpen: c = !1,
        displayEmpty: u = !1,
        IconComponent: d = Lc,
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
      L = ye(r, Dx),
      D = T ? vx : Ax,
      I = zn(),
      z = uo({ props: r, muiFormControl: I, states: ['variant'] }).variant || j,
      A =
        h ||
        {
          standard: ml || (ml = _(jx, {})),
          outlined: _(Fx, { label: x }),
          filled: hl || (hl = _(Bx, {})),
        }[z],
      F = g({}, r, { variant: z, classes: s }),
      B = Lx(F),
      te = dt(o, A.ref);
    return _(y.Fragment, {
      children: y.cloneElement(
        A,
        g(
          {
            inputComponent: D,
            inputProps: g(
              { children: a, IconComponent: d, variant: z, type: void 0, multiple: k },
              T
                ? { id: p }
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
                    SelectDisplayProps: g({ id: p }, w),
                  },
              v,
              { classes: v ? Bt(B, v.classes) : B },
              h ? h.props.inputProps : {},
            ),
          },
          k && T && z === 'outlined' ? { notched: !0 } : {},
          { ref: te, className: ve(A.props.className, l) },
          !h && { variant: z },
          L,
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Oa.propTypes = {
    autoWidth: n.bool,
    children: n.node,
    classes: n.object,
    className: n.string,
    defaultOpen: n.bool,
    defaultValue: n.any,
    displayEmpty: n.bool,
    IconComponent: n.elementType,
    id: n.string,
    input: n.element,
    inputProps: n.object,
    label: n.node,
    labelId: n.string,
    MenuProps: n.object,
    multiple: n.bool,
    native: n.bool,
    onChange: n.func,
    onClose: n.func,
    onOpen: n.func,
    open: n.bool,
    renderValue: n.func,
    SelectDisplayProps: n.object,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    value: n.oneOfType([n.oneOf(['']), n.any]),
    variant: n.oneOf(['filled', 'outlined', 'standard']),
  });
Oa.muiName = 'Select';
const Vx = Oa,
  zx = (e) => !e || !Cn(e),
  Ux = zx;
function Wx(e) {
  return Pe('MuiSlider', e);
}
const Hx = Re('MuiSlider', [
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
  Kt = Hx,
  qx = (e) => {
    const { open: t } = e;
    return {
      offset: ve(t && Kt.valueLabelOpen),
      circle: Kt.valueLabelCircle,
      label: Kt.valueLabelLabel,
    };
  };
function Tu(e) {
  const { children: t, className: o, value: r } = e,
    i = qx(e);
  return t
    ? y.cloneElement(
        t,
        { className: ve(t.props.className) },
        Qe(y.Fragment, {
          children: [
            t.props.children,
            _('span', {
              className: ve(i.offset, o),
              'aria-hidden': !0,
              children: _('span', {
                className: i.circle,
                children: _('span', { className: i.label, children: r }),
              }),
            }),
          ],
        }),
      )
    : null;
}
process.env.NODE_ENV !== 'production' &&
  (Tu.propTypes = { children: n.element.isRequired, className: n.string, value: n.node });
const Yx = [
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
function bl(e) {
  return e;
}
const ku = ce('span', {
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
          '@media (pointer: coarse)': { padding: '20px 0' },
        },
        t.size === 'small' && { height: 2 },
        t.marked && { marginBottom: 20 },
      ),
    t.orientation === 'vertical' &&
      g(
        {
          height: '100%',
          width: 4,
          padding: '0 13px',
          '@media (pointer: coarse)': { padding: '0 20px' },
        },
        t.size === 'small' && { width: 2 },
        t.marked && { marginRight: 44 },
      ),
    {
      '@media print': { colorAdjust: 'exact' },
      [`&.${Kt.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        color: (e.vars || e).palette.grey[400],
      },
      [`&.${Kt.dragging}`]: { [`& .${Kt.thumb}, & .${Kt.track}`]: { transition: 'none' } },
    },
  ),
);
process.env.NODE_ENV !== 'production' && (ku.propTypes = { children: n.node });
const wu = ce('span', { name: 'MuiSlider', slot: 'Rail', overridesResolver: (e, t) => t.rail })(
  ({ ownerState: e }) =>
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
      e.track === 'inverted' && { opacity: 1 },
    ),
);
process.env.NODE_ENV !== 'production' && (wu.propTypes = { children: n.node });
const Su = ce('span', { name: 'MuiSlider', slot: 'Track', overridesResolver: (e, t) => t.track })(
  ({ theme: e, ownerState: t }) => {
    const o =
      e.palette.mode === 'light'
        ? Fr(e.palette[t.color].main, 0.62)
        : jr(e.palette[t.color].main, 0.5);
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
      t.size === 'small' && { border: 'none' },
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
      t.track === !1 && { display: 'none' },
      t.track === 'inverted' && {
        backgroundColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : o,
        borderColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : o,
      },
    );
  },
);
process.env.NODE_ENV !== 'production' && (Su.propTypes = { children: n.node });
const Ru = ce('span', {
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
    t.size === 'small' && { width: 12, height: 12 },
    t.orientation === 'horizontal' && { top: '50%', transform: 'translate(-50%, -50%)' },
    t.orientation === 'vertical' && { left: '50%', transform: 'translate(-50%, 50%)' },
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
        t.size === 'small' && { boxShadow: 'none' },
      ),
      '&::after': {
        position: 'absolute',
        content: '""',
        borderRadius: '50%',
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
            : Ze(e.palette[t.color].main, 0.16)
        }`,
        '@media (hover: none)': { boxShadow: 'none' },
      },
      [`&.${Kt.active}`]: {
        boxShadow: `0px 0px 0px 14px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : Ze(e.palette[t.color].main, 0.16)
        }`,
      },
      [`&.${Kt.disabled}`]: { '&:hover': { boxShadow: 'none' } },
    },
  ),
);
process.env.NODE_ENV !== 'production' && (Ru.propTypes = { children: n.node });
const Nu = ce(Tu, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) =>
  g(
    {
      [`&.${Kt.valueLabelOpen}`]: { transform: 'translateY(-100%) scale(1)' },
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
    t.size === 'small' && { fontSize: e.typography.pxToRem(12), padding: '0.25rem 0.5rem' },
  ),
);
process.env.NODE_ENV !== 'production' && (Nu.propTypes = { children: n.node });
const $u = ce('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => Qi(e) && e !== 'markActive',
  overridesResolver: (e, t) => {
    const { markActive: o } = e;
    return [t.mark, o && t.markActive];
  },
})(({ theme: e, ownerState: t, markActive: o }) =>
  g(
    { position: 'absolute', width: 2, height: 2, borderRadius: 1, backgroundColor: 'currentColor' },
    t.orientation === 'horizontal' && { top: '50%', transform: 'translate(-1px, -50%)' },
    t.orientation === 'vertical' && { left: '50%', transform: 'translate(-50%, 1px)' },
    o && { backgroundColor: (e.vars || e).palette.background.paper, opacity: 0.8 },
  ),
);
process.env.NODE_ENV !== 'production' && ($u.propTypes = { children: n.node });
const Pu = ce('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => Qi(e) && e !== 'markLabelActive',
  overridesResolver: (e, t) => t.markLabel,
})(({ theme: e, ownerState: t, markLabelActive: o }) =>
  g(
    {},
    e.typography.body2,
    { color: (e.vars || e).palette.text.secondary, position: 'absolute', whiteSpace: 'nowrap' },
    t.orientation === 'horizontal' && {
      top: 30,
      transform: 'translateX(-50%)',
      '@media (pointer: coarse)': { top: 40 },
    },
    t.orientation === 'vertical' && {
      left: 36,
      transform: 'translateY(50%)',
      '@media (pointer: coarse)': { left: 44 },
    },
    o && { color: (e.vars || e).palette.text.primary },
  ),
);
process.env.NODE_ENV !== 'production' && (Pu.propTypes = { children: n.node });
const Gx = (e) => {
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
    return Me(u, Wx, s);
  },
  Kx = ({ children: e }) => e,
  Iu = y.forwardRef(function (t, o) {
    var r, i, a, s, l, c, u, d, p, h, v, x, b, m, k, T, C, E, f, S, w, j, L, D;
    const I = De({ props: t, name: 'MuiSlider' }),
      z = hn().direction === 'rtl',
      {
        'aria-label': A,
        'aria-valuetext': F,
        'aria-labelledby': B,
        component: te = 'span',
        components: U = {},
        componentsProps: W = {},
        color: R = 'primary',
        classes: V,
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
        scale: Oe = bl,
        slotProps: M,
        slots: Y,
        track: Ie = 'normal',
        valueLabelDisplay: ge = 'off',
        valueLabelFormat: tt = bl,
      } = I,
      Ve = ye(I, Yx),
      we = g({}, I, {
        isRtl: z,
        max: se,
        min: le,
        classes: V,
        disabled: H,
        disableSwap: G,
        orientation: he,
        marks: Q,
        color: R,
        size: ae,
        step: P,
        scale: Oe,
        track: Ie,
        valueLabelDisplay: ge,
        valueLabelFormat: tt,
      }),
      {
        axisProps: Ne,
        getRootProps: nt,
        getHiddenInputProps: at,
        getThumbProps: ee,
        open: me,
        active: xe,
        axis: be,
        focusedThumbIndex: fe,
        range: de,
        dragging: ne,
        marks: Ee,
        values: Ce,
        trackOffset: Ae,
        trackLeap: st,
      } = ng(g({}, we, { ref: o }));
    (we.marked = Ee.length > 0 && Ee.some((N) => N.label)),
      (we.dragging = ne),
      (we.focusedThumbIndex = fe);
    const mt = Gx(we),
      kt = (r = (i = Y == null ? void 0 : Y.root) != null ? i : U.Root) != null ? r : ku,
      gn = (a = (s = Y == null ? void 0 : Y.rail) != null ? s : U.Rail) != null ? a : wu,
      wt = (l = (c = Y == null ? void 0 : Y.track) != null ? c : U.Track) != null ? l : Su,
      gt = (u = (d = Y == null ? void 0 : Y.thumb) != null ? d : U.Thumb) != null ? u : Ru,
      Et =
        (p = (h = Y == null ? void 0 : Y.valueLabel) != null ? h : U.ValueLabel) != null ? p : Nu,
      ht = (v = (x = Y == null ? void 0 : Y.mark) != null ? x : U.Mark) != null ? v : $u,
      ot = (b = (m = Y == null ? void 0 : Y.markLabel) != null ? m : U.MarkLabel) != null ? b : Pu,
      rt = (k = (T = Y == null ? void 0 : Y.input) != null ? T : U.Input) != null ? k : 'input',
      bt = (C = M == null ? void 0 : M.root) != null ? C : W.root,
      wn = (E = M == null ? void 0 : M.rail) != null ? E : W.rail,
      Qt = (f = M == null ? void 0 : M.track) != null ? f : W.track,
      vn = (S = M == null ? void 0 : M.thumb) != null ? S : W.thumb,
      qt = (w = M == null ? void 0 : M.valueLabel) != null ? w : W.valueLabel,
      ln = (j = M == null ? void 0 : M.mark) != null ? j : W.mark,
      cn = (L = M == null ? void 0 : M.markLabel) != null ? L : W.markLabel,
      un = (D = M == null ? void 0 : M.input) != null ? D : W.input,
      en = jt({
        elementType: kt,
        getSlotProps: nt,
        externalSlotProps: bt,
        externalForwardedProps: Ve,
        additionalProps: g({}, Ux(kt) && { as: te }),
        ownerState: g({}, we, bt == null ? void 0 : bt.ownerState),
        className: [mt.root, Z],
      }),
      dn = jt({ elementType: gn, externalSlotProps: wn, ownerState: we, className: mt.rail }),
      Le = jt({
        elementType: wt,
        externalSlotProps: Qt,
        additionalProps: { style: g({}, Ne[be].offset(Ae), Ne[be].leap(st)) },
        ownerState: g({}, we, Qt == null ? void 0 : Qt.ownerState),
        className: mt.track,
      }),
      pt = jt({
        elementType: gt,
        getSlotProps: ee,
        externalSlotProps: vn,
        ownerState: g({}, we, vn == null ? void 0 : vn.ownerState),
        className: mt.thumb,
      }),
      Lt = jt({
        elementType: Et,
        externalSlotProps: qt,
        ownerState: g({}, we, qt == null ? void 0 : qt.ownerState),
        className: mt.valueLabel,
      }),
      O = jt({ elementType: ht, externalSlotProps: ln, ownerState: we, className: mt.mark }),
      K = jt({ elementType: ot, externalSlotProps: cn, ownerState: we, className: mt.markLabel }),
      ue = jt({ elementType: rt, getSlotProps: at, externalSlotProps: un, ownerState: we });
    return Qe(
      kt,
      g({}, en, {
        children: [
          _(gn, g({}, dn)),
          _(wt, g({}, Le)),
          Ee.filter((N) => N.value >= le && N.value <= se).map((N, $) => {
            const X = br(N.value, le, se),
              oe = Ne[be].offset(X);
            let pe;
            return (
              Ie === !1
                ? (pe = Ce.indexOf(N.value) !== -1)
                : (pe =
                    (Ie === 'normal' &&
                      (de ? N.value >= Ce[0] && N.value <= Ce[Ce.length - 1] : N.value <= Ce[0])) ||
                    (Ie === 'inverted' &&
                      (de ? N.value <= Ce[0] || N.value >= Ce[Ce.length - 1] : N.value >= Ce[0]))),
              Qe(
                y.Fragment,
                {
                  children: [
                    _(
                      ht,
                      g({ 'data-index': $ }, O, !Cn(ht) && { markActive: pe }, {
                        style: g({}, oe, O.style),
                        className: ve(O.className, pe && mt.markActive),
                      }),
                    ),
                    N.label != null
                      ? _(
                          ot,
                          g(
                            { 'aria-hidden': !0, 'data-index': $ },
                            K,
                            !Cn(ot) && { markLabelActive: pe },
                            {
                              style: g({}, oe, K.style),
                              className: ve(mt.markLabel, K.className, pe && mt.markLabelActive),
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
            const X = br(N, le, se),
              oe = Ne[be].offset(X),
              pe = ge === 'off' ? Kx : Et;
            return _(
              pe,
              g(
                {},
                !Cn(pe) && {
                  valueLabelFormat: tt,
                  valueLabelDisplay: ge,
                  value: typeof tt == 'function' ? tt(Oe(N), $) : tt,
                  index: $,
                  open: me === $ || xe === $ || ge === 'on',
                  disabled: H,
                },
                Lt,
                {
                  children: _(
                    gt,
                    g({ 'data-index': $ }, pt, {
                      className: ve(
                        mt.thumb,
                        pt.className,
                        xe === $ && mt.active,
                        fe === $ && mt.focusVisible,
                      ),
                      style: g(
                        {},
                        oe,
                        { pointerEvents: G && xe !== $ ? 'none' : void 0 },
                        pt.style,
                      ),
                      children: _(
                        rt,
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
                    }),
                  ),
                },
              ),
              $,
            );
          }),
        ],
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Iu.propTypes = {
    'aria-label': Vt(n.string, (e) =>
      Array.isArray(e.value || e.defaultValue) && e['aria-label'] != null
        ? new Error(
            'MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
          )
        : null,
    ),
    'aria-labelledby': n.string,
    'aria-valuetext': Vt(n.string, (e) =>
      Array.isArray(e.value || e.defaultValue) && e['aria-valuetext'] != null
        ? new Error(
            'MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.',
          )
        : null,
    ),
    children: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([n.oneOf(['primary', 'secondary']), n.string]),
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
    defaultValue: n.oneOfType([n.arrayOf(n.number), n.number]),
    disabled: n.bool,
    disableSwap: n.bool,
    getAriaLabel: n.func,
    getAriaValueText: n.func,
    marks: n.oneOfType([n.arrayOf(n.shape({ label: n.node, value: n.number.isRequired })), n.bool]),
    max: n.number,
    min: n.number,
    name: n.string,
    onChange: n.func,
    onChangeCommitted: n.func,
    orientation: n.oneOf(['horizontal', 'vertical']),
    scale: n.func,
    size: n.oneOfType([n.oneOf(['small', 'medium']), n.string]),
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
    step: n.number,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    tabIndex: n.number,
    track: n.oneOf(['inverted', 'normal', !1]),
    value: n.oneOfType([n.arrayOf(n.number), n.number]),
    valueLabelDisplay: n.oneOf(['auto', 'off', 'on']),
    valueLabelFormat: n.oneOfType([n.func, n.string]),
  });
const Xx = Iu;
function Jx(e) {
  return Pe('MuiSnackbarContent', e);
}
Re('MuiSnackbarContent', ['root', 'message', 'action']);
const Zx = ['action', 'className', 'message', 'role'],
  Qx = (e) => {
    const { classes: t } = e;
    return Me({ root: ['root'], action: ['action'], message: ['message'] }, Jx, t);
  },
  eE = ce(Vn, { name: 'MuiSnackbarContent', slot: 'Root', overridesResolver: (e, t) => t.root })(
    ({ theme: e }) => {
      const t = e.palette.mode === 'light' ? 0.8 : 0.98,
        o = Pm(e.palette.background.default, t);
      return g({}, e.typography.body2, {
        color: e.vars ? e.vars.palette.SnackbarContent.color : e.palette.getContrastText(o),
        backgroundColor: e.vars ? e.vars.palette.SnackbarContent.bg : o,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '6px 16px',
        borderRadius: (e.vars || e).shape.borderRadius,
        flexGrow: 1,
        [e.breakpoints.up('sm')]: { flexGrow: 'initial', minWidth: 288 },
      });
    },
  ),
  tE = ce('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({ padding: '8px 0' }),
  nE = ce('div', {
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
  _u = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiSnackbarContent' }),
      { action: i, className: a, message: s, role: l = 'alert' } = r,
      c = ye(r, Zx),
      u = r,
      d = Qx(u);
    return Qe(
      eE,
      g({ role: l, square: !0, elevation: 6, className: ve(d.root, a), ownerState: u, ref: o }, c, {
        children: [
          _(tE, { className: d.message, ownerState: u, children: s }),
          i ? _(nE, { className: d.action, ownerState: u, children: i }) : null,
        ],
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (_u.propTypes = {
    action: n.node,
    classes: n.object,
    className: n.string,
    message: n.node,
    role: n.string,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const oE = _u;
function rE(e) {
  return Pe('MuiSnackbar', e);
}
Re('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const iE = ['onEnter', 'onExited'],
  aE = [
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
  sE = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = { root: ['root', `anchorOrigin${J(o.vertical)}${J(o.horizontal)}`] };
    return Me(r, rE, t);
  },
  gl = ce('div', {
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
    const o = { left: '50%', right: 'auto', transform: 'translateX(-50%)' };
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
      t.anchorOrigin.vertical === 'top' ? { top: 8 } : { bottom: 8 },
      t.anchorOrigin.horizontal === 'left' && { justifyContent: 'flex-start' },
      t.anchorOrigin.horizontal === 'right' && { justifyContent: 'flex-end' },
      {
        [e.breakpoints.up('sm')]: g(
          {},
          t.anchorOrigin.vertical === 'top' ? { top: 24 } : { bottom: 24 },
          t.anchorOrigin.horizontal === 'center' && o,
          t.anchorOrigin.horizontal === 'left' && { left: 24, right: 'auto' },
          t.anchorOrigin.horizontal === 'right' && { right: 24, left: 'auto' },
        ),
      },
    );
  }),
  Mu = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiSnackbar' }),
      i = hn(),
      a = {
        enter: i.transitions.duration.enteringScreen,
        exit: i.transitions.duration.leavingScreen,
      },
      {
        action: s,
        anchorOrigin: { vertical: l, horizontal: c } = { vertical: 'bottom', horizontal: 'left' },
        autoHideDuration: u = null,
        children: d,
        className: p,
        ClickAwayListenerProps: h,
        ContentProps: v,
        disableWindowBlurListener: x = !1,
        message: b,
        open: m,
        TransitionComponent: k = lu,
        transitionDuration: T = a,
        TransitionProps: { onEnter: C, onExited: E } = {},
      } = r,
      f = ye(r.TransitionProps, iE),
      S = ye(r, aE),
      w = g({}, r, {
        anchorOrigin: { vertical: l, horizontal: c },
        autoHideDuration: u,
        disableWindowBlurListener: x,
        TransitionComponent: k,
        transitionDuration: T,
      }),
      j = sE(w),
      { getRootProps: L, onClickAway: D } = og(g({}, w, { ref: o })),
      [I, q] = y.useState(!0),
      z = jt({
        elementType: gl,
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
      : _(
          dr,
          g({ onClickAway: D }, h, {
            children: _(
              gl,
              g({}, z, {
                children: _(
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
                    { children: d || _(oE, g({ message: b, action: s }, v)) },
                  ),
                ),
              }),
            ),
          }),
        );
  });
process.env.NODE_ENV !== 'production' &&
  (Mu.propTypes = {
    action: n.node,
    anchorOrigin: n.shape({
      horizontal: n.oneOf(['center', 'left', 'right']).isRequired,
      vertical: n.oneOf(['bottom', 'top']).isRequired,
    }),
    autoHideDuration: n.number,
    children: n.element,
    classes: n.object,
    className: n.string,
    ClickAwayListenerProps: n.object,
    ContentProps: n.object,
    disableWindowBlurListener: n.bool,
    key: () => null,
    message: n.node,
    onBlur: n.func,
    onClose: n.func,
    onFocus: n.func,
    onMouseEnter: n.func,
    onMouseLeave: n.func,
    open: n.bool,
    resumeHideDuration: n.number,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    TransitionComponent: n.elementType,
    transitionDuration: n.oneOfType([
      n.number,
      n.shape({ appear: n.number, enter: n.number, exit: n.number }),
    ]),
    TransitionProps: n.object,
  });
const lE = Mu;
function cE(e) {
  return Pe('MuiSwitch', e);
}
const uE = Re('MuiSwitch', [
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
  Tt = uE,
  dE = ['className', 'color', 'edge', 'size', 'sx'],
  pE = (e) => {
    const { classes: t, edge: o, size: r, color: i, checked: a, disabled: s } = e,
      l = {
        root: ['root', o && `edge${J(o)}`, `size${J(r)}`],
        switchBase: ['switchBase', `color${J(i)}`, a && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = Me(l, cE, t);
    return g({}, t, c);
  },
  fE = ce('span', {
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
        verticalAlign: 'middle',
        '@media print': { colorAdjust: 'exact' },
      },
      e.edge === 'start' && { marginLeft: -8 },
      e.edge === 'end' && { marginRight: -8 },
      e.size === 'small' && {
        width: 40,
        height: 24,
        padding: 7,
        [`& .${Tt.thumb}`]: { width: 16, height: 16 },
        [`& .${Tt.switchBase}`]: {
          padding: 4,
          [`&.${Tt.checked}`]: { transform: 'translateX(16px)' },
        },
      },
    ),
  ),
  mE = ce(Hc, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        { [`& .${Tt.input}`]: t.input },
        o.color !== 'default' && t[`color${J(o.color)}`],
      ];
    },
  })(
    ({ theme: e }) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      color: e.vars
        ? e.vars.palette.Switch.defaultColor
        : `${e.palette.mode === 'light' ? e.palette.common.white : e.palette.grey[300]}`,
      transition: e.transitions.create(['left', 'transform'], {
        duration: e.transitions.duration.shortest,
      }),
      [`&.${Tt.checked}`]: { transform: 'translateX(20px)' },
      [`&.${Tt.disabled}`]: {
        color: e.vars
          ? e.vars.palette.Switch.defaultDisabledColor
          : `${e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[600]}`,
      },
      [`&.${Tt.checked} + .${Tt.track}`]: { opacity: 0.5 },
      [`&.${Tt.disabled} + .${Tt.track}`]: {
        opacity: e.vars
          ? e.vars.opacity.switchTrackDisabled
          : `${e.palette.mode === 'light' ? 0.12 : 0.2}`,
      },
      [`& .${Tt.input}`]: { left: '-100%', width: '300%' },
    }),
    ({ theme: e, ownerState: t }) =>
      g(
        {
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
              : Ze(e.palette.action.active, e.palette.action.hoverOpacity),
            '@media (hover: none)': { backgroundColor: 'transparent' },
          },
        },
        t.color !== 'default' && {
          [`&.${Tt.checked}`]: {
            color: (e.vars || e).palette[t.color].main,
            '&:hover': {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : Ze(e.palette[t.color].main, e.palette.action.hoverOpacity),
              '@media (hover: none)': { backgroundColor: 'transparent' },
            },
            [`&.${Tt.disabled}`]: {
              color: e.vars
                ? e.vars.palette.Switch[`${t.color}DisabledColor`]
                : `${
                    e.palette.mode === 'light'
                      ? Fr(e.palette[t.color].main, 0.62)
                      : jr(e.palette[t.color].main, 0.55)
                  }`,
            },
          },
          [`&.${Tt.checked} + .${Tt.track}`]: {
            backgroundColor: (e.vars || e).palette[t.color].main,
          },
        },
      ),
  ),
  hE = ce('span', { name: 'MuiSwitch', slot: 'Track', overridesResolver: (e, t) => t.track })(
    ({ theme: e }) => ({
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
    }),
  ),
  bE = ce('span', { name: 'MuiSwitch', slot: 'Thumb', overridesResolver: (e, t) => t.thumb })(
    ({ theme: e }) => ({
      boxShadow: (e.vars || e).shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%',
    }),
  ),
  Au = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiSwitch' }),
      { className: i, color: a = 'primary', edge: s = !1, size: l = 'medium', sx: c } = r,
      u = ye(r, dE),
      d = g({}, r, { color: a, edge: s, size: l }),
      p = pE(d),
      h = _(bE, { className: p.thumb, ownerState: d });
    return Qe(fE, {
      className: ve(p.root, i),
      sx: c,
      ownerState: d,
      children: [
        _(
          mE,
          g({ type: 'checkbox', icon: h, checkedIcon: h, ref: o, ownerState: d }, u, {
            classes: g({}, p, { root: p.switchBase }),
          }),
        ),
        _(hE, { className: p.track, ownerState: d }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Au.propTypes = {
    checked: n.bool,
    checkedIcon: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([
      n.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    defaultChecked: n.bool,
    disabled: n.bool,
    disableRipple: n.bool,
    edge: n.oneOf(['end', 'start', !1]),
    icon: n.node,
    id: n.string,
    inputProps: n.object,
    inputRef: $t,
    onChange: n.func,
    required: n.bool,
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    value: n.any,
  });
const gE = Au;
function vE(e) {
  return Pe('MuiToolbar', e);
}
Re('MuiToolbar', ['root', 'gutters', 'regular', 'dense']);
const yE = ['className', 'component', 'disableGutters', 'variant'],
  xE = (e) => {
    const { classes: t, disableGutters: o, variant: r } = e;
    return Me({ root: ['root', !o && 'gutters', r] }, vE, t);
  },
  EE = ce('div', {
    name: 'MuiToolbar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, !o.disableGutters && t.gutters, t[o.variant]];
    },
  })(
    ({ theme: e, ownerState: t }) =>
      g(
        { position: 'relative', display: 'flex', alignItems: 'center' },
        !t.disableGutters && {
          paddingLeft: e.spacing(2),
          paddingRight: e.spacing(2),
          [e.breakpoints.up('sm')]: { paddingLeft: e.spacing(3), paddingRight: e.spacing(3) },
        },
        t.variant === 'dense' && { minHeight: 48 },
      ),
    ({ theme: e, ownerState: t }) => t.variant === 'regular' && e.mixins.toolbar,
  ),
  Du = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiToolbar' }),
      { className: i, component: a = 'div', disableGutters: s = !1, variant: l = 'regular' } = r,
      c = ye(r, yE),
      u = g({}, r, { component: a, disableGutters: s, variant: l }),
      d = xE(u);
    return _(EE, g({ as: a, className: ve(d.root, i), ref: o, ownerState: u }, c));
  });
process.env.NODE_ENV !== 'production' &&
  (Du.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    disableGutters: n.bool,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    variant: n.oneOfType([n.oneOf(['dense', 'regular']), n.string]),
  });
const CE = Du;
function OE(e) {
  return Pe('MuiTextField', e);
}
Re('MuiTextField', ['root']);
const TE = [
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
  kE = { standard: cu, filled: eu, outlined: Cu },
  wE = (e) => {
    const { classes: t } = e;
    return Me({ root: ['root'] }, OE, t);
  },
  SE = ce(Xy, { name: 'MuiTextField', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  Lu = y.forwardRef(function (t, o) {
    const r = De({ props: t, name: 'MuiTextField' }),
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
        required: z = !1,
        rows: A,
        select: F = !1,
        SelectProps: B,
        type: te,
        value: U,
        variant: W = 'outlined',
      } = r,
      R = ye(r, TE),
      V = g({}, r, {
        autoFocus: a,
        color: c,
        disabled: d,
        error: p,
        fullWidth: v,
        multiline: w,
        required: z,
        select: F,
        variant: W,
      }),
      Z = wE(V);
    process.env.NODE_ENV !== 'production' &&
      F &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const G = {};
    W === 'outlined' && (m && typeof m.shrink < 'u' && (G.notched = m.shrink), (G.label = E)),
      F && ((!B || !B.native) && (G.id = void 0), (G['aria-describedby'] = void 0));
    const H = _l(b),
      re = x && H ? `${H}-helper-text` : void 0,
      ie = E && H ? `${H}-label` : void 0,
      Q = kE[W],
      se = _(
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
    return Qe(
      SE,
      g(
        {
          className: ve(Z.root, l),
          disabled: d,
          error: p,
          fullWidth: v,
          ref: o,
          required: z,
          color: c,
          variant: W,
          ownerState: V,
        },
        R,
        {
          children: [
            E != null && E !== '' && _(I0, g({ htmlFor: H, id: ie }, m, { children: E })),
            F
              ? _(
                  Vx,
                  g({ 'aria-describedby': re, id: H, labelId: ie, value: U, input: se }, B, {
                    children: s,
                  }),
                )
              : se,
            x && _(n0, g({ id: re }, h, { children: x })),
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Lu.propTypes = {
    autoComplete: n.string,
    autoFocus: n.bool,
    children: n.node,
    classes: n.object,
    className: n.string,
    color: n.oneOfType([
      n.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    defaultValue: n.any,
    disabled: n.bool,
    error: n.bool,
    FormHelperTextProps: n.object,
    fullWidth: n.bool,
    helperText: n.node,
    id: n.string,
    InputLabelProps: n.object,
    inputProps: n.object,
    InputProps: n.object,
    inputRef: $t,
    label: n.node,
    margin: n.oneOf(['dense', 'none', 'normal']),
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    multiline: n.bool,
    name: n.string,
    onBlur: n.func,
    onChange: n.func,
    onFocus: n.func,
    placeholder: n.string,
    required: n.bool,
    rows: n.oneOfType([n.number, n.string]),
    select: n.bool,
    SelectProps: n.object,
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    type: n.string,
    value: n.any,
    variant: n.oneOf(['filled', 'outlined', 'standard']),
  });
const ju = Lu;
function $n({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: i }) {
  return _(ly, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: i,
  });
}
var _n = ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(_n || {});
function Fu({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = _n.After,
  isIndeterminate: r = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const u = _(ky, {
    checked: e,
    indeterminate: r,
    defaultChecked: i,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let d;
  if (t) {
    const p = o === _n.Before || o === _n.Above,
      h = _('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      v = o === _n.Before || o === _n.After,
      x = v ? h : _('div', { children: h }),
      b = v ? u : _('div', { children: u });
    d = Qe(ru, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: a,
      error: s,
      children: [p && x, b, !p && x],
    });
  } else d = u;
  return d;
}
function Bu({
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
  return _(Hv, {
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
      _(ju, { ...h, error: r, fullWidth: i, disabled: t, label: e, style: { width: a } }),
  });
}
var RE = Object.defineProperty,
  NE = (e, t, o) =>
    t in e ? RE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (e[t] = o),
  ke = (e, t, o) => (NE(e, typeof t != 'symbol' ? t + '' : t, o), o);
const eo = class {
  static bookIdToNumber(e, t = !0) {
    return t && (e = e.toUpperCase()), e in this.bookNumbers ? this.bookNumbers[e] : 0;
  }
  static bookNumberToId(e, t = '***') {
    const o = e - 1;
    return o < 0 || o >= eo.allBookIds.length ? t : eo.allBookIds[o];
  }
  static bookNumberToEnglishName(e) {
    return e <= 0 || e > this.lastBook ? '******' : eo.allBookEnglishNames[e - 1];
  }
  static bookIdToEnglishName(e) {
    return this.bookNumberToEnglishName(this.bookIdToNumber(e));
  }
  static isObsolete(e) {
    return this.allBookEnglishNames[e - 1].includes('*obsolete*');
  }
  static createBookNumbers() {
    const e = {};
    for (let t = 0; t < this.allBookIds.length; t++) e[this.allBookIds[t]] = t + 1;
    return e;
  }
};
let xt = eo;
ke(xt, 'allBookIds', [
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
  '1ES',
  '2ES',
  'MAN',
  'PS2',
  'ODA',
  'PSS',
  'JSA',
  'JDB',
  'TBS',
  'SST',
  'DNT',
  'BLT',
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
  '3ES',
  'EZA',
  '5EZ',
  '6EZ',
  'INT',
  'CNC',
  'GLO',
  'TDX',
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
  'REP',
  '4BA',
  'LAO',
]),
  ke(xt, 'nonCanonicalIds', [
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
  ke(xt, 'firstBook', 1),
  ke(xt, 'lastBook', eo.allBookIds.length),
  ke(xt, 'allBookEnglishNames', [
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
  ]),
  ke(xt, 'bookNumbers', eo.createBookNumbers());
var xn = ((e) => (
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
  constructor(e) {
    if (
      (ke(this, 'name'),
      ke(this, 'fullPath'),
      ke(this, 'isPresent'),
      ke(this, 'hasVerseSegments'),
      ke(this, 'isCustomized'),
      ke(this, 'baseVersification'),
      ke(this, 'scriptureBooks'),
      ke(this, '_type'),
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
let Gt = Pn;
ke(Gt, 'Original', new Pn(xn.Original)),
  ke(Gt, 'Septuagint', new Pn(xn.Septuagint)),
  ke(Gt, 'Vulgate', new Pn(xn.Vulgate)),
  ke(Gt, 'English', new Pn(xn.English)),
  ke(Gt, 'RussianProtestant', new Pn(xn.RussianProtestant)),
  ke(Gt, 'RussianOrthodox', new Pn(xn.RussianOrthodox));
function vl(e, t) {
  const o = t[0];
  for (let r = 1; r < t.length; r++) e = e.split(t[r]).join(o);
  return e.split(o);
}
var Vu = ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(Vu || {});
const Fe = class {
  constructor(e, t, o, r) {
    if (
      (ke(this, 'firstChapter'),
      ke(this, 'lastChapter'),
      ke(this, 'lastVerse'),
      ke(this, 'hasSegmentsDefined'),
      ke(this, 'text'),
      ke(this, 'BBBCCCVVVS'),
      ke(this, 'longHashCode'),
      ke(this, 'versification'),
      ke(this, 'rtlMark', '‏'),
      ke(this, '_bookNum', 0),
      ke(this, '_chapterNum', 0),
      ke(this, '_verseNum', 0),
      ke(this, '_verse'),
      o == null && r == null)
    )
      if (e != null && typeof e == 'string') {
        const i = e,
          a = t != null && t instanceof Gt ? t : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t == null)
        if (e != null && e instanceof Fe) {
          const i = e;
          (this._bookNum = i.bookNum),
            (this._chapterNum = i.chapterNum),
            (this._verseNum = i.verseNum),
            (this._verse = i.verse),
            (this.versification = i.versification);
        } else {
          if (e == null) return;
          const i = e instanceof Gt ? e : Fe.defaultVersification;
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
          (this.versification = r ?? Fe.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  static parse(e, t = Fe.defaultVersification) {
    const o = new Fe(t);
    return o.parse(e), o;
  }
  static isVerseParseable(e) {
    return (
      e.length > 0 &&
      '0123456789'.includes(e[0]) &&
      !e.endsWith(this.verseRangeSeparator) &&
      !e.endsWith(this.verseSequenceIndicator)
    );
  }
  static tryParse(e) {
    let t;
    try {
      return (t = Fe.parse(e)), { success: !0, verseRef: t };
    } catch (o) {
      if (o instanceof Co) return (t = new Fe()), { success: !1, verseRef: t };
      throw o;
    }
  }
  static getBBBCCCVVV(e, t, o) {
    return (
      (e % Fe.bcvMaxValue) * Fe.bookDigitShifter +
      (t >= 0 ? (t % Fe.bcvMaxValue) * Fe.chapterDigitShifter : 0) +
      (o >= 0 ? o % Fe.bcvMaxValue : 0)
    );
  }
  static tryGetVerseNum(e) {
    let t;
    if (!e) return (t = -1), { success: !0, vNum: t };
    t = 0;
    let o;
    for (let r = 0; r < e.length; r++) {
      if (((o = e[r]), o < '0' || o > '9')) return r === 0 && (t = -1), { success: !1, vNum: t };
      if (((t = t * 10 + +o - +'0'), t > Fe.bcvMaxValue)) return (t = -1), { success: !1, vNum: t };
    }
    return { success: !0, vNum: t };
  }
  get isDefault() {
    return (
      this.bookNum === 0 &&
      this.chapterNum === 0 &&
      this.verseNum === 0 &&
      this.versification == null
    );
  }
  get hasMultiple() {
    return (
      this._verse != null &&
      (this._verse.includes(Fe.verseRangeSeparator) ||
        this._verse.includes(Fe.verseSequenceIndicator))
    );
  }
  get book() {
    return xt.bookNumberToId(this.bookNum, '');
  }
  set book(e) {
    this.bookNum = xt.bookIdToNumber(e);
  }
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? '' : this._chapterNum.toString();
  }
  set chapter(e) {
    const t = +e;
    this._chapterNum = Number.isInteger(t) ? t : -1;
  }
  get verse() {
    return this._verse != null
      ? this._verse
      : this.isDefault || this._verseNum < 0
      ? ''
      : this._verseNum.toString();
  }
  set verse(e) {
    const { success: t, vNum: o } = Fe.tryGetVerseNum(e);
    (this._verse = t ? void 0 : e.replace(this.rtlMark, '')),
      (this._verseNum = o),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = Fe.tryGetVerseNum(this._verse));
  }
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > xt.lastBook)
      throw new Co('BookNum must be greater than zero and less than or equal to last book');
    this._bookNum = e;
  }
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(e) {
    this.chapterNum = e;
  }
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(e) {
    this._verseNum = e;
  }
  get versificationStr() {
    var e;
    return (e = this.versification) == null ? void 0 : e.name;
  }
  set versificationStr(e) {
    this.versification = this.versification != null ? new Gt(e) : void 0;
  }
  get valid() {
    return this.validStatus === 0;
  }
  get validStatus() {
    return this.validateVerse(Fe.verseRangeSeparators, Fe.verseSequenceIndicators);
  }
  get BBBCCC() {
    return Fe.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  get BBBCCCVVV() {
    return Fe.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  get isExcluded() {
    return !1;
  }
  parse(e) {
    if (((e = e.replace(this.rtlMark, '')), e.includes('/'))) {
      const i = e.split('/');
      if (((e = i[0]), i.length > 1))
        try {
          const a = +i[1].trim();
          this.versification = new Gt(xn[a]);
        } catch {
          throw new Co('Invalid reference : ' + e);
        }
    }
    const t = e.trim().split(' ');
    if (t.length !== 2) throw new Co('Invalid reference : ' + e);
    const o = t[1].split(':'),
      r = +o[0];
    if (
      o.length !== 2 ||
      xt.bookIdToNumber(t[0]) === 0 ||
      !Number.isInteger(r) ||
      r < 0 ||
      !Fe.isVerseParseable(o[1])
    )
      throw new Co('Invalid reference : ' + e);
    this.updateInternal(t[0], o[0], o[1]);
  }
  simplify() {
    this._verse = void 0;
  }
  clone() {
    return new Fe(this);
  }
  toString() {
    const e = this.book;
    return e === '' ? '' : `${e} ${this.chapter}:${this.verse}`;
  }
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
  allVerses(e = !1, t = Fe.verseRangeSeparators, o = Fe.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const r = [],
      i = vl(this._verse, o);
    for (const a of i.map((s) => vl(s, t))) {
      const s = this.clone();
      s.verse = a[0];
      const l = s.verseNum;
      if ((r.push(s), a.length > 1)) {
        const c = this.clone();
        if (((c.verse = a[1]), !e))
          for (let u = l + 1; u < c.verseNum; u++) {
            const d = new Fe(this._bookNum, this._chapterNum, u, this.versification);
            this.isExcluded || r.push(d);
          }
        r.push(c);
      }
    }
    return r;
  }
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
  get internalValid() {
    return this.versification == null
      ? 1
      : this._bookNum <= 0 || this._bookNum > xt.lastBook
      ? 2
      : 0;
  }
  setEmpty(e = Fe.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = e);
  }
  updateInternal(e, t, o) {
    (this.bookNum = xt.bookIdToNumber(e)), (this.chapter = t), (this.verse = o);
  }
};
let fn = Fe;
ke(fn, 'defaultVersification', Gt.English),
  ke(fn, 'verseRangeSeparator', '-'),
  ke(fn, 'verseSequenceIndicator', ','),
  ke(fn, 'verseRangeSeparators', [Fe.verseRangeSeparator]),
  ke(fn, 'verseSequenceIndicators', [Fe.verseSequenceIndicator]),
  ke(fn, 'chapterDigitShifter', 1e3),
  ke(fn, 'bookDigitShifter', Fe.chapterDigitShifter * Fe.chapterDigitShifter),
  ke(fn, 'bcvMaxValue', Fe.chapterDigitShifter - 1),
  ke(fn, 'ValidStatusType', Vu);
class Co extends Error {}
const zu = [
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
function yl() {
  return xt.allBookIds.map((e) => ({ bookId: e, label: xt.bookIdToEnglishName(e) }));
}
function xl(e) {
  return { bookId: xt.bookNumberToId(e), label: xt.bookNumberToEnglishName(e) };
}
const Uu = 1,
  $E = zu.length - 1,
  Wu = 1,
  Hu = 1,
  qu = (e) => {
    var t;
    return ((t = zu[e]) == null ? void 0 : t.chapters) ?? -1;
  },
  El = (e, t) => ({
    bookNum: Math.max(Uu, Math.min(e.bookNum + t, $E)),
    chapterNum: 1,
    verseNum: 1,
  }),
  Cl = (e, t) => ({
    ...e,
    chapterNum: Math.min(Math.max(Wu, e.chapterNum + t), qu(e.bookNum)),
    verseNum: 1,
  }),
  Ol = (e, t) => ({ ...e, verseNum: Math.max(Hu, e.verseNum + t) });
function vr({
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
  return _(ju, {
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
function PE({ scrRef: e, handleSubmit: t }) {
  const [o, r] = Te.useState(xl(e.bookNum)),
    i = (c) => {
      r(xl(c.bookNum)), t(c);
    },
    a = (c, u) => {
      const p = { bookNum: xt.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
      i(p);
    },
    s = (c) => {
      t({ ...e, chapterNum: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verseNum: +c.target.value });
    };
  return Qe(Zu, {
    children: [
      _(Bu, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: yl(),
        onChange: a,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      _($n, { onClick: () => i(El(e, -1)), isDisabled: e.bookNum <= Uu, children: '<' }),
      _($n, { onClick: () => i(El(e, 1)), isDisabled: e.bookNum >= yl().length, children: '>' }),
      _(vr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: s,
      }),
      _($n, { onClick: () => t(Cl(e, -1)), isDisabled: e.chapterNum <= Wu, children: '<' }),
      _($n, {
        onClick: () => t(Cl(e, 1)),
        isDisabled: e.chapterNum >= qu(e.bookNum),
        children: '>',
      }),
      _(vr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: l,
      }),
      _($n, { onClick: () => t(Ol(e, -1)), isDisabled: e.verseNum <= Hu, children: '<' }),
      _($n, { onClick: () => t(Ol(e, 1)), children: '>' }),
    ],
  });
}
function IE({
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
  return _(Xx, {
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
function _E({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: i }) {
  return _(gE, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: i,
  });
}
function ME({
  autoHideDuration: e = null,
  isOpen: t = !1,
  className: o,
  onClose: r,
  anchorOrigin: i = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: a = { action: '', message: '', className: `papi-snackbar ${o ?? ''}` },
  children: s,
}) {
  return _(lE, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: i,
    ContentProps: a,
    children: s,
  });
}
function Yu(e) {
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
  return _(dx, {
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
function Tl({ onRowChange: e, row: t, column: o }) {
  const r = (i) => {
    e({ ...t, [o.key]: i.target.value });
  };
  return _(vr, { defaultValue: t[o.key], onChange: r });
}
const AE = ({ onChange: e, disabled: t, checked: o, ...r }) => {
  function i(a) {
    e(a.target.checked, a.nativeEvent.shiftKey);
  }
  return _(Fu, { ...r, isChecked: o, isDisabled: t, onChange: i });
};
function DE({
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
  const q = Te.useMemo(() => {
    const z = e.map((A) =>
      typeof A.editable == 'function'
        ? { ...A, editable: (B) => !!A.editable(B), renderEditCell: A.renderEditCell || Tl }
        : A.editable && !A.renderEditCell
        ? { ...A, renderEditCell: Tl }
        : A.renderEditCell && !A.editable
        ? { ...A, editable: !1 }
        : A,
    );
    return d ? [{ ...ka.SelectColumn, minWidth: p }, ...z] : z;
  }, [d, e]);
  return _(ka, {
    columns: q,
    defaultColumnOptions: { width: i, minWidth: a, maxWidth: s, sortable: l, resizable: c },
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
    renderers: { renderCheckbox: AE },
    className: `${I ?? 'rdg-light'}`,
  });
}
function LE({ commandHandler: e, name: t, className: o, items: r }) {
  return Qe(su, {
    item: !0,
    xs: 1,
    className: `papi-menu-column ${o ?? ''}`,
    children: [
      _('h3', { className: `papi-menu ${o ?? ''}`, children: t }),
      r.map((i, a) =>
        _(Yu, { className: `papi-menu-item ${i.className}`, onClick: () => e(i), ...i }, a),
      ),
    ],
  });
}
function Gu({ commandHandler: e, className: t, columns: o }) {
  return _(su, {
    container: !0,
    spacing: 0,
    className: `papi-multi-column-menu ${t ?? ''}`,
    columns: o.length,
    children: o.map((r) =>
      _(LE, { commandHandler: e, name: r.name, className: t, items: r.items }),
    ),
  });
}
const jE = Bn(_('path', { d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' }), 'Menu');
function FE(e) {
  var a;
  const [t, o] = Te.useState(!1),
    r = Te.useRef(null),
    i = Te.useRef(null);
  return _('div', {
    ref: r,
    style: { position: 'relative' },
    children: _(nv, {
      position: 'static',
      children: Qe(CE, {
        className: `papi-toolbar ${e.className ?? ''}`,
        ref: i,
        variant: 'dense',
        children: [
          e.menu
            ? _(pa, {
                edge: 'start',
                className: `papi-menuButton ${e.className ?? ''}`,
                color: 'inherit',
                'aria-label': 'open drawer',
                onClick: () => {
                  o((s) => !s);
                },
                children: _(jE, {}),
              })
            : null,
          e.children,
          e.menu
            ? _(Vy, {
                className: `papi-menu-drawer ${e.className ?? ''}`,
                anchor: 'left',
                variant: 'persistent',
                open: t,
                onClose: () => {
                  t && o(!1);
                },
                style: { position: 'relative' },
                PaperProps: {
                  style: { top: '24px', height: '190px', position: 'absolute', width: '95%' },
                },
                children: _(Gu, {
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
exports.Button = $n;
exports.Checkbox = Fu;
exports.ComboBox = Bu;
exports.GridMenu = Gu;
exports.LabelPosition = _n;
exports.MenuItem = Yu;
exports.RefSelector = PE;
exports.Slider = IE;
exports.Snackbar = ME;
exports.Switch = _E;
exports.Table = DE;
exports.TextField = vr;
exports.Toolbar = FE;
function BE(e, t = 'top') {
  if (!e || typeof document > 'u') return;
  const o = document.head || document.querySelector('head'),
    r = o.querySelector(':first-child'),
    i = document.createElement('style');
  i.appendChild(document.createTextNode(e)),
    t === 'top' && r ? o.insertBefore(i, r) : o.appendChild(i);
}
BE(
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
//# sourceMappingURL=index.cjs.js.map
