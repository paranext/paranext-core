'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const Te = require('react'),
  yo = require('react-dom'),
  fi = require('react-data-grid');
function pl(e) {
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
const x = pl(Te),
  fl = pl(yo);
function ku(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var oa = { exports: {} },
  lo = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mi;
function Ru() {
  if (mi) return lo;
  mi = 1;
  var e = Te,
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
  return (lo.Fragment = o), (lo.jsx = s), (lo.jsxs = s), lo;
}
var co = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hi;
function Nu() {
  return (
    hi ||
      ((hi = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Te,
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
                  O.$$typeof === c ||
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
                var O = { configurable: !0, enumerable: !0, value: H, writable: !0 };
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
                var O = { configurable: !0, enumerable: !0, writable: !0 };
                Object.defineProperties(console, {
                  log: M({}, O, { value: z }),
                  info: M({}, O, { value: ie }),
                  warn: M({}, O, { value: se }),
                  error: M({}, O, { value: G }),
                  group: M({}, O, { value: R }),
                  groupCollapsed: M({}, O, { value: j }),
                  groupEnd: M({}, O, { value: X }),
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
                    Ne = N.stack.split(`
`),
                    ke = de.length - 1,
                    Ae = Ne.length - 1;
                  ke >= 1 && Ae >= 0 && de[ke] !== Ne[Ae];

                )
                  Ae--;
                for (; ke >= 1 && Ae >= 0; ke--, Ae--)
                  if (de[ke] !== Ne[Ae]) {
                    if (ke !== 1 || Ae !== 1)
                      do
                        if ((ke--, Ae--, Ae < 0 || de[ke] !== Ne[Ae])) {
                          var vt =
                            `
` + de[ke].replace(' at new ', ' at ');
                          return (
                            O.displayName &&
                              vt.includes('<anonymous>') &&
                              (vt = vt.replace('<anonymous>', O.displayName)),
                            typeof O == 'function' && he.set(O, vt),
                            vt
                          );
                        }
                      while (ke >= 1 && Ae >= 0);
                    break;
                  }
              }
            } finally {
              (le = !1), (oe.current = K), ne(), (Error.prepareStackTrace = $);
            }
            var Fn = O ? O.displayName || O.name : '',
              pi = Fn ? ae(Fn) : '';
            return typeof O == 'function' && he.set(O, pi), pi;
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
          var $e = Object.prototype.hasOwnProperty,
            ge = {},
            tt = S.ReactDebugCurrentFrame;
          function Ve(O) {
            if (O) {
              var q = O._owner,
                ce = W(O.type, O._source, q ? q.type : null);
              tt.setExtraStackFrame(ce);
            } else tt.setExtraStackFrame(null);
          }
          function we(O, q, ce, N, $) {
            {
              var K = Function.call.bind($e);
              for (var te in O)
                if (K(O, te)) {
                  var de = void 0;
                  try {
                    if (typeof O[te] != 'function') {
                      var Ne = Error(
                        (N || 'React class') +
                          ': ' +
                          ce +
                          ' type `' +
                          te +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof O[te] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((Ne.name = 'Invariant Violation'), Ne);
                    }
                    de = O[te](q, te, N, ce, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (ke) {
                    de = ke;
                  }
                  de &&
                    !(de instanceof Error) &&
                    (Ve($),
                    T(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      N || 'React class',
                      ce,
                      te,
                      typeof de,
                    ),
                    Ve(null)),
                    de instanceof Error &&
                      !(de.message in ge) &&
                      ((ge[de.message] = !0),
                      Ve($),
                      T('Failed %s type: %s', ce, de.message),
                      Ve(null));
                }
            }
          }
          var Re = Array.isArray;
          function nt(O) {
            return Re(O);
          }
          function it(O) {
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
                  it(O),
                ),
                me(O)
              );
          }
          var be = S.ReactCurrentOwner,
            fe = { key: !0, ref: !0, __self: !0, __source: !0 },
            ue,
            ee,
            ye;
          ye = {};
          function xe(O) {
            if ($e.call(O, 'ref')) {
              var q = Object.getOwnPropertyDescriptor(O, 'ref').get;
              if (q && q.isReactWarning) return !1;
            }
            return O.ref !== void 0;
          }
          function _e(O) {
            if ($e.call(O, 'key')) {
              var q = Object.getOwnPropertyDescriptor(O, 'key').get;
              if (q && q.isReactWarning) return !1;
            }
            return O.key !== void 0;
          }
          function st(O, q) {
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
          function mt(O, q) {
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
                Object.defineProperty(O, 'key', { get: ce, configurable: !0 });
            }
          }
          function St(O, q) {
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
                Object.defineProperty(O, 'ref', { get: ce, configurable: !0 });
            }
          }
          var hn = function (O, q, ce, N, $, K, te) {
            var de = { $$typeof: t, type: O, key: q, ref: ce, props: te, _owner: K };
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
          function wt(O, q, ce, N, $) {
            {
              var K,
                te = {},
                de = null,
                Ne = null;
              ce !== void 0 && (ve(ce), (de = '' + ce)),
                _e(q) && (ve(q.key), (de = '' + q.key)),
                xe(q) && ((Ne = q.ref), st(q, $));
              for (K in q) $e.call(q, K) && !fe.hasOwnProperty(K) && (te[K] = q[K]);
              if (O && O.defaultProps) {
                var ke = O.defaultProps;
                for (K in ke) te[K] === void 0 && (te[K] = ke[K]);
              }
              if (de || Ne) {
                var Ae = typeof O == 'function' ? O.displayName || O.name || 'Unknown' : O;
                de && mt(te, Ae), Ne && St(te, Ae);
              }
              return hn(O, de, Ne, $, N, be.current, te);
            }
          }
          var gt = S.ReactCurrentOwner,
            Et = S.ReactDebugCurrentFrame;
          function ht(O) {
            if (O) {
              var q = O._owner,
                ce = W(O.type, O._source, q ? q.type : null);
              Et.setExtraStackFrame(ce);
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
                var O = B(gt.current.type);
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
          function Tn(O) {
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
              var q = bt();
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
          function Ut(O, q) {
            {
              if (!O._store || O._store.validated || O.key != null) return;
              O._store.validated = !0;
              var ce = bn(q);
              if (Jt[ce]) return;
              Jt[ce] = !0;
              var N = '';
              O &&
                O._owner &&
                O._owner !== gt.current &&
                (N = ' It was passed a child from ' + B(O._owner.type) + '.'),
                ht(O),
                T(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  ce,
                  N,
                ),
                ht(null);
            }
          }
          function ln(O, q) {
            {
              if (typeof O != 'object') return;
              if (nt(O))
                for (var ce = 0; ce < O.length; ce++) {
                  var N = O[ce];
                  rt(N) && Ut(N, q);
                }
              else if (rt(O)) O._store && (O._store.validated = !0);
              else if (O) {
                var $ = m(O);
                if (typeof $ == 'function' && $ !== O.entries)
                  for (var K = $.call(O), te; !(te = K.next()).done; )
                    rt(te.value) && Ut(te.value, q);
              }
            }
          }
          function cn(O) {
            {
              var q = O.type;
              if (q == null || typeof q == 'string') return;
              var ce;
              if (typeof q == 'function') ce = q.propTypes;
              else if (typeof q == 'object' && (q.$$typeof === c || q.$$typeof === p))
                ce = q.propTypes;
              else return;
              if (ce) {
                var N = B(q);
                we(ce, O.props, 'prop', N, O);
              } else if (q.PropTypes !== void 0 && !ot) {
                ot = !0;
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
          function Zt(O, q, ce, N, $, K) {
            {
              var te = D(O);
              if (!te) {
                var de = '';
                (O === void 0 ||
                  (typeof O == 'object' && O !== null && Object.keys(O).length === 0)) &&
                  (de +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var Ne = Tn($);
                Ne ? (de += Ne) : (de += bt());
                var ke;
                O === null
                  ? (ke = 'null')
                  : nt(O)
                  ? (ke = 'array')
                  : O !== void 0 && O.$$typeof === t
                  ? ((ke = '<' + (B(O.type) || 'Unknown') + ' />'),
                    (de = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (ke = typeof O),
                  T(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    ke,
                    de,
                  );
              }
              var Ae = wt(O, q, ce, $, K);
              if (Ae == null) return Ae;
              if (te) {
                var vt = q.children;
                if (vt !== void 0)
                  if (N)
                    if (nt(vt)) {
                      for (var Fn = 0; Fn < vt.length; Fn++) ln(vt[Fn], O);
                      Object.freeze && Object.freeze(vt);
                    } else
                      T(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else ln(vt, O);
              }
              return O === r ? un(Ae) : cn(Ae), Ae;
            }
          }
          function dn(O, q, ce) {
            return Zt(O, q, ce, !0);
          }
          function Me(O, q, ce) {
            return Zt(O, q, ce, !1);
          }
          var dt = Me,
            Dt = dn;
          (co.Fragment = r), (co.jsx = dt), (co.jsxs = Dt);
        })()),
    co
  );
}
process.env.NODE_ENV === 'production' ? (oa.exports = Ru()) : (oa.exports = Nu());
var Oa = oa.exports;
const $u = Oa.Fragment,
  A = Oa.jsx,
  et = Oa.jsxs,
  Pu = { black: '#000', white: '#fff' },
  ko = Pu,
  Iu = {
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
  jn = Iu,
  _u = {
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
  Vn = _u,
  Mu = {
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
  zn = Mu,
  Au = {
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
  Bn = Au,
  Du = {
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
  Un = Du,
  Lu = {
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
  uo = Lu,
  Fu = {
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
  ju = Fu;
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
function ml(e) {
  if (!Hn(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = ml(e[o]);
    }),
    t
  );
}
function jt(e, t, o = { clone: !0 }) {
  const r = o.clone ? g({}, e) : e;
  return (
    Hn(e) &&
      Hn(t) &&
      Object.keys(t).forEach((a) => {
        a !== '__proto__' &&
          (Hn(t[a]) && a in e && Hn(e[a])
            ? (r[a] = jt(e[a], t[a], o))
            : o.clone
            ? (r[a] = Hn(t[a]) ? ml(t[a]) : t[a])
            : (r[a] = t[a]));
      }),
    r
  );
}
var ra = { exports: {} },
  Vo = { exports: {} },
  Ue = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bi;
function Vu() {
  if (bi) return Ue;
  bi = 1;
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
    (Ue.AsyncMode = c),
    (Ue.ConcurrentMode = u),
    (Ue.ContextConsumer = l),
    (Ue.ContextProvider = s),
    (Ue.Element = t),
    (Ue.ForwardRef = d),
    (Ue.Fragment = r),
    (Ue.Lazy = v),
    (Ue.Memo = y),
    (Ue.Portal = o),
    (Ue.Profiler = i),
    (Ue.StrictMode = a),
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
      return C(f) === v;
    }),
    (Ue.isMemo = function (f) {
      return C(f) === y;
    }),
    (Ue.isPortal = function (f) {
      return C(f) === o;
    }),
    (Ue.isProfiler = function (f) {
      return C(f) === i;
    }),
    (Ue.isStrictMode = function (f) {
      return C(f) === a;
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
 */ var gi;
function zu() {
  return (
    gi ||
      ((gi = 1),
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
              typeof P == 'function' ||
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
          (We.AsyncMode = f),
            (We.ConcurrentMode = w),
            (We.ContextConsumer = k),
            (We.ContextProvider = V),
            (We.Element = L),
            (We.ForwardRef = D),
            (We.Fragment = _),
            (We.Lazy = Y),
            (We.Memo = B),
            (We.Portal = M),
            (We.Profiler = F),
            (We.StrictMode = z),
            (We.Suspense = ie),
            (We.isAsyncMode = G),
            (We.isConcurrentMode = R),
            (We.isContextConsumer = j),
            (We.isContextProvider = X),
            (We.isElement = H),
            (We.isForwardRef = U),
            (We.isFragment = ne),
            (We.isLazy = oe),
            (We.isMemo = J),
            (We.isPortal = ae),
            (We.isProfiler = le),
            (We.isStrictMode = he),
            (We.isSuspense = re),
            (We.isValidElementType = C),
            (We.typeOf = E);
        })()),
    We
  );
}
var yi;
function hl() {
  return (
    yi ||
      ((yi = 1), process.env.NODE_ENV === 'production' ? (Vo.exports = Vu()) : (Vo.exports = zu())),
    Vo.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var Vr, xi;
function Bu() {
  if (xi) return Vr;
  xi = 1;
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
    (Vr = a()
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
    Vr
  );
}
var zr, Ei;
function Ta() {
  if (Ei) return zr;
  Ei = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (zr = e), zr;
}
var Br, Ci;
function bl() {
  return Ci || ((Ci = 1), (Br = Function.call.bind(Object.prototype.hasOwnProperty))), Br;
}
var Ur, Oi;
function Uu() {
  if (Oi) return Ur;
  Oi = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = Ta(),
      o = {},
      r = bl();
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
    (Ur = a),
    Ur
  );
}
var Wr, Ti;
function Wu() {
  if (Ti) return Wr;
  Ti = 1;
  var e = hl(),
    t = Bu(),
    o = Ta(),
    r = bl(),
    a = Uu(),
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
    (Wr = function (l, c) {
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
              !j[Oe] &&
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
    Wr
  );
}
var Hr, Si;
function Hu() {
  if (Si) return Hr;
  Si = 1;
  var e = Ta();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (Hr = function () {
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
    Hr
  );
}
if (process.env.NODE_ENV !== 'production') {
  var qu = hl(),
    Yu = !0;
  ra.exports = Wu()(qu.isElement, Yu);
} else ra.exports = Hu()();
var Ku = ra.exports;
const n = ku(Ku);
function Gu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function gl(e, t, o, r, a) {
  const i = e[t],
    s = a || t;
  if (i == null || typeof window > 'u') return null;
  let l;
  const c = i.type;
  return (
    typeof c == 'function' &&
      !Gu(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const vl = Kt(n.element, gl);
vl.isRequired = Kt(n.element.isRequired, gl);
const oo = vl;
function Xu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Ju(e, t, o, r, a) {
  const i = e[t],
    s = a || t;
  if (i == null || typeof window > 'u') return null;
  let l;
  return (
    typeof i == 'function' &&
      !Xu(i) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const Sa = Kt(n.elementType, Ju),
  Zu = 'exact-prop: ​';
function wa(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : g({}, e, {
        [Zu]: (t) => {
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
function En(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let o = 1; o < arguments.length; o += 1) t += '&args[]=' + encodeURIComponent(arguments[o]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var aa = { exports: {} },
  He = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wi;
function Qu() {
  if (wi) return He;
  wi = 1;
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
    (He.ContextConsumer = s),
    (He.ContextProvider = i),
    (He.Element = e),
    (He.ForwardRef = c),
    (He.Fragment = o),
    (He.Lazy = b),
    (He.Memo = p),
    (He.Portal = t),
    (He.Profiler = a),
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
      return h(m) === s;
    }),
    (He.isContextProvider = function (m) {
      return h(m) === i;
    }),
    (He.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (He.isForwardRef = function (m) {
      return h(m) === c;
    }),
    (He.isFragment = function (m) {
      return h(m) === o;
    }),
    (He.isLazy = function (m) {
      return h(m) === b;
    }),
    (He.isMemo = function (m) {
      return h(m) === p;
    }),
    (He.isPortal = function (m) {
      return h(m) === t;
    }),
    (He.isProfiler = function (m) {
      return h(m) === a;
    }),
    (He.isStrictMode = function (m) {
      return h(m) === r;
    }),
    (He.isSuspense = function (m) {
      return h(m) === u;
    }),
    (He.isSuspenseList = function (m) {
      return h(m) === d;
    }),
    (He.isValidElementType = function (m) {
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
    (He.typeOf = h),
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
 */ var ki;
function ed() {
  return (
    ki ||
      ((ki = 1),
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
                  I.$$typeof === c ||
                  I.$$typeof === C ||
                  I.getModuleId !== void 0))
            );
          }
          function f(I) {
            if (typeof I == 'object' && I !== null) {
              var W = I.$$typeof;
              switch (W) {
                case e:
                  var $e = I.type;
                  switch ($e) {
                    case o:
                    case a:
                    case r:
                    case u:
                    case d:
                      return $e;
                    default:
                      var ge = $e && $e.$$typeof;
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
          (qe.ContextConsumer = w),
            (qe.ContextProvider = k),
            (qe.Element = V),
            (qe.ForwardRef = L),
            (qe.Fragment = D),
            (qe.Lazy = _),
            (qe.Memo = Y),
            (qe.Portal = B),
            (qe.Profiler = M),
            (qe.StrictMode = F),
            (qe.Suspense = z),
            (qe.SuspenseList = ie),
            (qe.isAsyncMode = R),
            (qe.isConcurrentMode = j),
            (qe.isContextConsumer = X),
            (qe.isContextProvider = H),
            (qe.isElement = U),
            (qe.isForwardRef = ne),
            (qe.isFragment = oe),
            (qe.isLazy = J),
            (qe.isMemo = ae),
            (qe.isPortal = le),
            (qe.isProfiler = he),
            (qe.isStrictMode = re),
            (qe.isSuspense = P),
            (qe.isSuspenseList = Oe),
            (qe.isValidElementType = E),
            (qe.typeOf = f);
        })()),
    qe
  );
}
process.env.NODE_ENV === 'production' ? (aa.exports = Qu()) : (aa.exports = ed());
var Ri = aa.exports;
const td = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function nd(e) {
  const t = `${e}`.match(td);
  return (t && t[1]) || '';
}
function yl(e, t = '') {
  return e.displayName || e.name || nd(e) || t;
}
function Ni(e, t, o) {
  const r = yl(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function od(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return yl(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Ri.ForwardRef:
          return Ni(e, e.render, 'ForwardRef');
        case Ri.Memo:
          return Ni(e, e.type, 'memo');
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
const rd = n.oneOfType([n.func, n.object]),
  $t = rd;
function Q(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : En(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function $i(...e) {
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
function xl(e, t = 166) {
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
function qr(e, t) {
  return x.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function ut(e) {
  return (e && e.ownerDocument) || document;
}
function Mn(e) {
  return ut(e).defaultView || window;
}
function er(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const ad = typeof window < 'u' ? x.useLayoutEffect : x.useEffect,
  rn = ad;
let Pi = 0;
function id(e) {
  const [t, o] = x.useState(e),
    r = e || t;
  return (
    x.useEffect(() => {
      t == null && ((Pi += 1), o(`mui-${Pi}`));
    }, [t]),
    r
  );
}
const Ii = x['useId'];
function El(e) {
  if (Ii !== void 0) {
    const t = Ii();
    return e ?? t;
  }
  return id(e);
}
function sd(e, t, o, r, a) {
  if (process.env.NODE_ENV === 'production') return null;
  const i = a || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${i}\` is not supported. Please remove it.`)
    : null;
}
function In({ controlled: e, default: t, name: o, state: r = 'value' }) {
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
function Ot(e) {
  const t = x.useRef(e);
  return (
    rn(() => {
      t.current = e;
    }),
    x.useCallback((...o) => (0, t.current)(...o), [])
  );
}
function pt(...e) {
  return x.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              er(o, t);
            });
          },
    e,
  );
}
let fr = !0,
  ia = !1,
  _i;
const ld = {
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
function cd(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && ld[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function ud(e) {
  e.metaKey || e.altKey || e.ctrlKey || (fr = !0);
}
function Yr() {
  fr = !1;
}
function dd() {
  this.visibilityState === 'hidden' && ia && (fr = !0);
}
function pd(e) {
  e.addEventListener('keydown', ud, !0),
    e.addEventListener('mousedown', Yr, !0),
    e.addEventListener('pointerdown', Yr, !0),
    e.addEventListener('touchstart', Yr, !0),
    e.addEventListener('visibilitychange', dd, !0);
}
function fd(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return fr || cd(t);
}
function Cl() {
  const e = x.useCallback((a) => {
      a != null && pd(a.ownerDocument);
    }, []),
    t = x.useRef(!1);
  function o() {
    return t.current
      ? ((ia = !0),
        window.clearTimeout(_i),
        (_i = window.setTimeout(() => {
          ia = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(a) {
    return fd(a) ? ((t.current = !0), !0) : !1;
  }
  return { isFocusVisibleRef: t, onFocus: r, onBlur: o, ref: e };
}
function Ol(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const md = (e) => {
    const t = x.useRef({});
    return (
      x.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  hd = md,
  bd = {
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
  gd = bd;
function vd(e) {
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
function yd(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const xd = Number.isInteger || yd;
function Tl(e, t, o, r) {
  const a = e[t];
  if (a == null || !xd(a)) {
    const i = vd(a);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function Sl(e, t, ...o) {
  return e[t] === void 0 ? null : Tl(e, t, ...o);
}
function sa() {
  return null;
}
Sl.isRequired = Tl;
sa.isRequired = sa;
const ka = process.env.NODE_ENV === 'production' ? sa : Sl;
function Ra(e, t) {
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
                o[r][s] = Ra(a[s], i[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function je(e, t, o = void 0) {
  const r = {};
  return (
    Object.keys(e).forEach((a) => {
      r[a] = e[a]
        .reduce((i, s) => {
          if (s) {
            const l = t(s);
            l !== '' && i.push(l), o && o[s] && i.push(o[s]);
          }
          return i;
        }, [])
        .join(' ');
    }),
    r
  );
}
const Mi = (e) => e,
  Ed = () => {
    let e = Mi;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Mi;
      },
    };
  },
  Cd = Ed(),
  Od = Cd,
  Td = {
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
function De(e, t, o = 'Mui') {
  const r = Td[t];
  return r ? `${o}-${r}` : `${Od.generate(e)}-${t}`;
}
function Ie(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((a) => {
      r[a] = De(e, a, o);
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
function wl(e) {
  var t = Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var Sd =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  wd = wl(function (e) {
    return (
      Sd.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
    );
  });
function kd(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function Rd(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var Nd = (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Rd(this));
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
          var s = kd(a);
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
  Ct = '-ms-',
  tr = '-moz-',
  ze = '-webkit-',
  Na = 'comm',
  $a = 'rule',
  Pa = 'decl',
  $d = '@import',
  kl = '@keyframes',
  Pd = Math.abs,
  mr = String.fromCharCode,
  Id = Object.assign;
function _d(e, t) {
  return yt(e, 0) ^ 45
    ? (((((((t << 2) ^ yt(e, 0)) << 2) ^ yt(e, 1)) << 2) ^ yt(e, 2)) << 2) ^ yt(e, 3)
    : 0;
}
function Rl(e) {
  return e.trim();
}
function Md(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Je(e, t, o) {
  return e.replace(t, o);
}
function la(e, t) {
  return e.indexOf(t);
}
function yt(e, t) {
  return e.charCodeAt(t) | 0;
}
function Ro(e, t, o) {
  return e.slice(t, o);
}
function en(e) {
  return e.length;
}
function Ia(e) {
  return e.length;
}
function zo(e, t) {
  return t.push(e), e;
}
function Ad(e, t) {
  return e.map(t).join('');
}
var hr = 1,
  Xn = 1,
  Nl = 0,
  Nt = 0,
  ft = 0,
  ro = '';
function br(e, t, o, r, a, i, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: a,
    children: i,
    line: hr,
    column: Xn,
    length: s,
    return: '',
  };
}
function po(e, t) {
  return Id(br('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function Dd() {
  return ft;
}
function Ld() {
  return (ft = Nt > 0 ? yt(ro, --Nt) : 0), Xn--, ft === 10 && ((Xn = 1), hr--), ft;
}
function Mt() {
  return (ft = Nt < Nl ? yt(ro, Nt++) : 0), Xn++, ft === 10 && ((Xn = 1), hr++), ft;
}
function nn() {
  return yt(ro, Nt);
}
function Go() {
  return Nt;
}
function _o(e, t) {
  return Ro(ro, e, t);
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
function $l(e) {
  return (hr = Xn = 1), (Nl = en((ro = e))), (Nt = 0), [];
}
function Pl(e) {
  return (ro = ''), e;
}
function Xo(e) {
  return Rl(_o(Nt - 1, ca(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Fd(e) {
  for (; (ft = nn()) && ft < 33; ) Mt();
  return No(e) > 2 || No(ft) > 3 ? '' : ' ';
}
function jd(e, t) {
  for (; --t && Mt() && !(ft < 48 || ft > 102 || (ft > 57 && ft < 65) || (ft > 70 && ft < 97)); );
  return _o(e, Go() + (t < 6 && nn() == 32 && Mt() == 32));
}
function ca(e) {
  for (; Mt(); )
    switch (ft) {
      case e:
        return Nt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ca(ft);
        break;
      case 40:
        e === 41 && ca(e);
        break;
      case 92:
        Mt();
        break;
    }
  return Nt;
}
function Vd(e, t) {
  for (; Mt() && e + ft !== 47 + 10; ) if (e + ft === 42 + 42 && nn() === 47) break;
  return '/*' + _o(t, Nt - 1) + '*' + mr(e === 47 ? e : Mt());
}
function zd(e) {
  for (; !No(nn()); ) Mt();
  return _o(e, Nt);
}
function Bd(e) {
  return Pl(Jo('', null, null, null, [''], (e = $l(e)), 0, [0], e));
}
function Jo(e, t, o, r, a, i, s, l, c) {
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
    switch (((v = T), (T = Mt()))) {
      case 40:
        if (v != 108 && yt(k, p - 1) == 58) {
          la((k += Je(Xo(T), '&', '&\f')), '&\f') != -1 && (S = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        k += Xo(T);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        k += Fd(v);
        break;
      case 92:
        k += jd(Go() - 1, 7);
        continue;
      case 47:
        switch (nn()) {
          case 42:
          case 47:
            zo(Ud(Vd(Mt(), Go()), t, o), c);
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
              zo(y > 32 ? Di(k + ';', r, o, p - 1) : Di(Je(k, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            k += ';';
          default:
            if ((zo((w = Ai(k, t, o, u, d, a, l, C, (E = []), (f = []), p)), i), T === 123))
              if (d === 0) Jo(k, t, w, w, E, i, p, l, f);
              else
                switch (b === 99 && yt(k, 3) === 110 ? 100 : b) {
                  case 100:
                  case 109:
                  case 115:
                    Jo(
                      e,
                      w,
                      w,
                      r && zo(Ai(e, w, w, 0, 0, a, l, C, a, (E = []), p), f),
                      a,
                      f,
                      p,
                      l,
                      r ? E : f,
                    );
                    break;
                  default:
                    Jo(k, w, w, w, [''], f, 0, l, f);
                }
        }
        (u = d = y = 0), (h = S = 1), (C = k = ''), (p = s);
        break;
      case 58:
        (p = 1 + en(k)), (y = v);
      default:
        if (h < 1) {
          if (T == 123) --h;
          else if (T == 125 && h++ == 0 && Ld() == 125) continue;
        }
        switch (((k += mr(T)), T * h)) {
          case 38:
            S = d > 0 ? 1 : ((k += '\f'), -1);
            break;
          case 44:
            (l[u++] = (en(k) - 1) * S), (S = 1);
            break;
          case 64:
            nn() === 45 && (k += Xo(Mt())), (b = nn()), (d = p = en((C = k += zd(Go())))), T++;
            break;
          case 45:
            v === 45 && en(k) == 2 && (h = 0);
        }
    }
  return i;
}
function Ai(e, t, o, r, a, i, s, l, c, u, d) {
  for (var p = a - 1, b = a === 0 ? i : [''], y = Ia(b), v = 0, h = 0, m = 0; v < r; ++v)
    for (var S = 0, T = Ro(e, p + 1, (p = Pd((h = s[v])))), C = e; S < y; ++S)
      (C = Rl(h > 0 ? b[S] + ' ' + T : Je(T, /&\f/g, b[S]))) && (c[m++] = C);
  return br(e, t, o, a === 0 ? $a : l, c, u, d);
}
function Ud(e, t, o) {
  return br(e, t, o, Na, mr(Dd()), Ro(e, 2, -2), 0);
}
function Di(e, t, o, r) {
  return br(e, t, o, Pa, Ro(e, 0, r), Ro(e, r + 1, -1), r);
}
function Yn(e, t) {
  for (var o = '', r = Ia(e), a = 0; a < r; a++) o += t(e[a], a, e, t) || '';
  return o;
}
function Wd(e, t, o, r) {
  switch (e.type) {
    case $d:
    case Pa:
      return (e.return = e.return || e.value);
    case Na:
      return '';
    case kl:
      return (e.return = e.value + '{' + Yn(e.children, r) + '}');
    case $a:
      e.value = e.props.join(',');
  }
  return en((o = Yn(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function Hd(e) {
  var t = Ia(e);
  return function (o, r, a, i) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, a, i) || '';
    return s;
  };
}
function qd(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var Yd = function (t, o, r) {
    for (var a = 0, i = 0; (a = i), (i = nn()), a === 38 && i === 12 && (o[r] = 1), !No(i); ) Mt();
    return _o(t, Nt);
  },
  Kd = function (t, o) {
    var r = -1,
      a = 44;
    do
      switch (No(a)) {
        case 0:
          a === 38 && nn() === 12 && (o[r] = 1), (t[r] += Yd(Nt - 1, o, r));
          break;
        case 2:
          t[r] += Xo(a);
          break;
        case 4:
          if (a === 44) {
            (t[++r] = nn() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += mr(a);
      }
    while ((a = Mt()));
    return t;
  },
  Gd = function (t, o) {
    return Pl(Kd($l(t), o));
  },
  Li = new WeakMap(),
  Xd = function (t) {
    if (!(t.type !== 'rule' || !t.parent || t.length < 1)) {
      for (
        var o = t.value, r = t.parent, a = t.column === r.column && t.line === r.line;
        r.type !== 'rule';

      )
        if (((r = r.parent), !r)) return;
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !Li.get(r)) && !a) {
        Li.set(t, !0);
        for (var i = [], s = Gd(o, i), l = r.props, c = 0, u = 0; c < s.length; c++)
          for (var d = 0; d < l.length; d++, u++)
            t.props[u] = i[c] ? s[c].replace(/&\f/g, l[d]) : l[d] + ' ' + s[c];
      }
    }
  },
  Jd = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      o.charCodeAt(0) === 108 && o.charCodeAt(2) === 98 && ((t.return = ''), (t.value = ''));
    }
  },
  Zd =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  Qd = function (t) {
    return t.type === 'comm' && t.children.indexOf(Zd) > -1;
  },
  ep = function (t) {
    return function (o, r, a) {
      if (!(o.type !== 'rule' || t.compat)) {
        var i = o.value.match(/(:first|:nth|:nth-last)-child/g);
        if (i) {
          for (
            var s = o.parent === a[0], l = s ? a[0].children : a, c = l.length - 1;
            c >= 0;
            c--
          ) {
            var u = l[c];
            if (u.line < o.line) break;
            if (u.column < o.column) {
              if (Qd(u)) return;
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
  Il = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  tp = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!Il(o[r])) return !0;
    return !1;
  },
  Fi = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  np = function (t, o, r) {
    Il(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          Fi(t))
        : tp(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          Fi(t)));
  };
function _l(e, t) {
  switch (_d(e, t)) {
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
      return ze + e + tr + e + Ct + e + e;
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
      if (en(e) - 1 - t > 6)
        switch (yt(e, t + 1)) {
          case 109:
            if (yt(e, t + 4) !== 45) break;
          case 102:
            return (
              Je(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + ze + '$2-$3$1' + tr + (yt(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~la(e, 'stretch') ? _l(Je(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (yt(e, t + 1) !== 115) break;
    case 6444:
      switch (yt(e, en(e) - 3 - (~la(e, '!important') && 10))) {
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
var op = function (t, o, r, a) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Pa:
          t.return = _l(t.value, t.length);
          break;
        case kl:
          return Yn([po(t, { value: Je(t.value, '@', '@' + ze) })], a);
        case $a:
          if (t.length)
            return Ad(t.props, function (i) {
              switch (Md(i, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Yn([po(t, { props: [Je(i, /:(read-\w+)/, ':' + tr + '$1')] })], a);
                case '::placeholder':
                  return Yn(
                    [
                      po(t, { props: [Je(i, /:(plac\w+)/, ':' + ze + 'input-$1')] }),
                      po(t, { props: [Je(i, /:(plac\w+)/, ':' + tr + '$1')] }),
                      po(t, { props: [Je(i, /:(plac\w+)/, Ct + 'input-$1')] }),
                    ],
                    a,
                  );
              }
              return '';
            });
      }
  },
  rp = [op],
  ap = function (t) {
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
    var a = t.stylisPlugins || rp;
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
        document.querySelectorAll('style[data-emotion^="' + o + ' "]'),
        function (h) {
          for (var m = h.getAttribute('data-emotion').split(' '), S = 1; S < m.length; S++)
            i[m[S]] = !0;
          l.push(h);
        },
      );
    var c,
      u = [Xd, Jd];
    process.env.NODE_ENV !== 'production' &&
      u.push(
        ep({
          get compat() {
            return v.compat;
          },
        }),
        np,
      );
    {
      var d,
        p = [
          Wd,
          process.env.NODE_ENV !== 'production'
            ? function (h) {
                h.root ||
                  (h.return
                    ? d.insert(h.return)
                    : h.value && h.type !== Na && d.insert(h.value + '{}'));
              }
            : qd(function (h) {
                d.insert(h);
              }),
        ],
        b = Hd(u.concat(a, p)),
        y = function (m) {
          return Yn(Bd(m), b);
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
      sheet: new Nd({
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
  ua = { exports: {} },
  Ye = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ji;
function ip() {
  if (ji) return Ye;
  ji = 1;
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
    (Ye.AsyncMode = c),
    (Ye.ConcurrentMode = u),
    (Ye.ContextConsumer = l),
    (Ye.ContextProvider = s),
    (Ye.Element = t),
    (Ye.ForwardRef = d),
    (Ye.Fragment = r),
    (Ye.Lazy = v),
    (Ye.Memo = y),
    (Ye.Portal = o),
    (Ye.Profiler = i),
    (Ye.StrictMode = a),
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
      return C(f) === v;
    }),
    (Ye.isMemo = function (f) {
      return C(f) === y;
    }),
    (Ye.isPortal = function (f) {
      return C(f) === o;
    }),
    (Ye.isProfiler = function (f) {
      return C(f) === i;
    }),
    (Ye.isStrictMode = function (f) {
      return C(f) === a;
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
    (Ye.typeOf = C),
    Ye
  );
}
var Ke = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Vi;
function sp() {
  return (
    Vi ||
      ((Vi = 1),
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
              typeof P == 'function' ||
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
          (Ke.AsyncMode = f),
            (Ke.ConcurrentMode = w),
            (Ke.ContextConsumer = k),
            (Ke.ContextProvider = V),
            (Ke.Element = L),
            (Ke.ForwardRef = D),
            (Ke.Fragment = _),
            (Ke.Lazy = Y),
            (Ke.Memo = B),
            (Ke.Portal = M),
            (Ke.Profiler = F),
            (Ke.StrictMode = z),
            (Ke.Suspense = ie),
            (Ke.isAsyncMode = G),
            (Ke.isConcurrentMode = R),
            (Ke.isContextConsumer = j),
            (Ke.isContextProvider = X),
            (Ke.isElement = H),
            (Ke.isForwardRef = U),
            (Ke.isFragment = ne),
            (Ke.isLazy = oe),
            (Ke.isMemo = J),
            (Ke.isPortal = ae),
            (Ke.isProfiler = le),
            (Ke.isStrictMode = he),
            (Ke.isSuspense = re),
            (Ke.isValidElementType = C),
            (Ke.typeOf = E);
        })()),
    Ke
  );
}
process.env.NODE_ENV === 'production' ? (ua.exports = ip()) : (ua.exports = sp());
var lp = ua.exports,
  Ml = lp,
  cp = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 },
  up = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },
  Al = {};
Al[Ml.ForwardRef] = cp;
Al[Ml.Memo] = up;
var dp = !0;
function _a(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (a) {
      e[a] !== void 0 ? t.push(e[a] + ';') : (r += a + ' ');
    }),
    r
  );
}
var gr = function (t, o, r) {
    var a = t.key + '-' + o.name;
    (r === !1 || dp === !1) && t.registered[a] === void 0 && (t.registered[a] = o.styles);
  },
  vr = function (t, o, r) {
    gr(t, o, r);
    var a = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var i = o;
      do t.insert(o === i ? '.' + a : '', i, t.sheet, !0), (i = i.next);
      while (i !== void 0);
    }
  };
function pp(e) {
  for (var t = 0, o, r = 0, a = e.length; a >= 4; ++r, a -= 4)
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
  switch (a) {
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
var fp = {
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
  zi = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  mp =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  hp = /[A-Z]|^ms/g,
  Dl = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Ma = function (t) {
    return t.charCodeAt(1) === 45;
  },
  Bi = function (t) {
    return t != null && typeof t != 'boolean';
  },
  Kr = wl(function (e) {
    return Ma(e) ? e : e.replace(hp, '-$&').toLowerCase();
  }),
  nr = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(Dl, function (r, a, i) {
            return (Wt = { name: a, styles: i, next: Wt }), a;
          });
    }
    return fp[t] !== 1 && !Ma(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var bp =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    gp = ['normal', 'none', 'initial', 'inherit', 'unset'],
    vp = nr,
    yp = /^-ms-/,
    xp = /-(.)/g,
    Ui = {};
  nr = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (gp.indexOf(o) === -1 &&
          !bp.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = vp(t, o);
    return (
      r !== '' &&
        !Ma(t) &&
        t.indexOf('-') !== -1 &&
        Ui[t] === void 0 &&
        ((Ui[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(yp, 'ms-').replace(xp, function (a, i) {
              return i.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var Ll =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function $o(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(Ll);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1) return (Wt = { name: o.name, styles: o.styles, next: Wt }), o.name;
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; ) (Wt = { name: r.name, styles: r.styles, next: Wt }), (r = r.next);
        var a = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (a += o.map), a;
      }
      return Ep(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var i = Wt,
          s = o(e);
        return (Wt = i), $o(e, t, s);
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
          c = o.replace(Dl, function (d, p, b) {
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
function Ep(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var a = 0; a < o.length; a++) r += $o(e, t, o[a]) + ';';
  else
    for (var i in o) {
      var s = o[i];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += i + '{' + t[s] + '}')
          : Bi(s) && (r += Kr(i) + ':' + nr(i, s) + ';');
      else {
        if (i === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(Ll);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) Bi(s[l]) && (r += Kr(i) + ':' + nr(i, s[l]) + ';');
        else {
          var c = $o(e, t, s);
          switch (i) {
            case 'animation':
            case 'animationName': {
              r += Kr(i) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && i === 'undefined' && console.error(mp),
                (r += i + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var Wi = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  Fl;
process.env.NODE_ENV !== 'production' &&
  (Fl = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var Wt,
  Jn = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var a = !0,
      i = '';
    Wt = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((a = !1), (i += $o(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(zi),
        (i += s[0]));
    for (var l = 1; l < t.length; l++)
      (i += $o(r, o, t[l])),
        a &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(zi),
          (i += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (i = i.replace(Fl, function (b) {
        return (c = b), '';
      })),
      (Wi.lastIndex = 0);
    for (var u = '', d; (d = Wi.exec(i)) !== null; ) u += '-' + d[1];
    var p = pp(i) + u;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: p,
          styles: i,
          map: c,
          next: Wt,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : { name: p, styles: i, next: Wt };
  },
  Cp = function (t) {
    return t();
  },
  jl = x['useInsertionEffect'] ? x['useInsertionEffect'] : !1,
  Aa = jl || Cp,
  Hi = jl || Te.useLayoutEffect,
  Op = {}.hasOwnProperty,
  Da = Te.createContext(typeof HTMLElement < 'u' ? ap({ key: 'css' }) : null);
process.env.NODE_ENV !== 'production' && (Da.displayName = 'EmotionCacheContext');
Da.Provider;
var yr = function (t) {
    return Te.forwardRef(function (o, r) {
      var a = Te.useContext(Da);
      return t(o, a, r);
    });
  },
  Mo = Te.createContext({});
process.env.NODE_ENV !== 'production' && (Mo.displayName = 'EmotionThemeContext');
var qi = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  Yi = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  Tp = function (t) {
    var o = t.cache,
      r = t.serialized,
      a = t.isStringTag;
    return (
      gr(o, r, a),
      Aa(function () {
        return vr(o, r, a);
      }),
      null
    );
  },
  Sp = yr(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var a = e[qi],
      i = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = _a(t.registered, i, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = Jn(i, void 0, Te.useContext(Mo));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[Yi];
      c && (l = Jn([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var u = {};
    for (var d in e)
      Op.call(e, d) &&
        d !== 'css' &&
        d !== qi &&
        (process.env.NODE_ENV === 'production' || d !== Yi) &&
        (u[d] = e[d]);
    return (
      (u.ref = o),
      (u.className = s),
      Te.createElement(
        Te.Fragment,
        null,
        Te.createElement(Tp, { cache: t, serialized: l, isStringTag: typeof a == 'string' }),
        Te.createElement(a, u),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (Sp.displayName = 'EmotionCssPropInternal');
var wp = {
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
  Ki = !1,
  Vl = yr(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !Ki &&
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (Ki = !0));
    var o = e.styles,
      r = Jn([o], void 0, Te.useContext(Mo)),
      a = Te.useRef();
    return (
      Hi(
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
      Hi(
        function () {
          var i = a.current,
            s = i[0],
            l = i[1];
          if (l) {
            i[1] = !1;
            return;
          }
          if ((r.next !== void 0 && vr(t, r.next, !0), s.tags.length)) {
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
process.env.NODE_ENV !== 'production' && (Vl.displayName = 'EmotionGlobal');
function kp() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return Jn(t);
}
var La = function () {
    var t = kp.apply(void 0, arguments),
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
  Rp = function e(t) {
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
function Np(e, t, o) {
  var r = [],
    a = _a(e, r, o);
  return r.length < 2 ? o : a + t(r);
}
var $p = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      Aa(function () {
        for (var a = 0; a < r.length; a++) vr(o, r[a], !1);
      }),
      null
    );
  },
  Pp = yr(function (e, t) {
    var o = !1,
      r = [],
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        var b = Jn(d, t.registered);
        return r.push(b), gr(t, b, !1), t.key + '-' + b.name;
      },
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        return Np(t.registered, a, Rp(d));
      },
      s = { css: a, cx: i, theme: Te.useContext(Mo) },
      l = e.children(s);
    return (
      (o = !0),
      Te.createElement(Te.Fragment, null, Te.createElement($p, { cache: t, serializedArr: r }), l)
    );
  });
process.env.NODE_ENV !== 'production' && (Pp.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var Gi = !0,
    Ip = typeof jest < 'u' || typeof vi < 'u';
  if (Gi && !Ip) {
    var Xi = typeof globalThis < 'u' ? globalThis : Gi ? window : global,
      Ji = '__EMOTION_REACT_' + wp.version.split('.')[0] + '__';
    Xi[Ji] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (Xi[Ji] = !0);
  }
}
var _p = wd,
  Mp = function (t) {
    return t !== 'theme';
  },
  Zi = function (t) {
    return typeof t == 'string' && t.charCodeAt(0) > 96 ? _p : Mp;
  },
  Qi = function (t, o, r) {
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
  es = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Ap = function (t) {
    var o = t.cache,
      r = t.serialized,
      a = t.isStringTag;
    return (
      gr(o, r, a),
      Aa(function () {
        return vr(o, r, a);
      }),
      null
    );
  },
  Dp = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      a = (r && t.__emotion_base) || t,
      i,
      s;
    o !== void 0 && ((i = o.label), (s = o.target));
    var l = Qi(t, o, r),
      c = l || Zi(a),
      u = !c('as');
    return function () {
      var d = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((i !== void 0 && p.push('label:' + i + ';'), d[0] == null || d[0].raw === void 0))
        p.push.apply(p, d);
      else {
        process.env.NODE_ENV !== 'production' && d[0][0] === void 0 && console.error(es),
          p.push(d[0][0]);
        for (var b = d.length, y = 1; y < b; y++)
          process.env.NODE_ENV !== 'production' && d[0][y] === void 0 && console.error(es),
            p.push(d[y], d[0][y]);
      }
      var v = yr(function (h, m, S) {
        var T = (u && h.as) || a,
          C = '',
          E = [],
          f = h;
        if (h.theme == null) {
          f = {};
          for (var w in h) f[w] = h[w];
          f.theme = Te.useContext(Mo);
        }
        typeof h.className == 'string'
          ? (C = _a(m.registered, E, h.className))
          : h.className != null && (C = h.className + ' ');
        var k = Jn(p.concat(E), m.registered, f);
        (C += m.key + '-' + k.name), s !== void 0 && (C += ' ' + s);
        var V = u && l === void 0 ? Zi(T) : c,
          L = {};
        for (var D in h) (u && D === 'as') || (V(D) && (L[D] = h[D]));
        return (
          (L.className = C),
          (L.ref = S),
          Te.createElement(
            Te.Fragment,
            null,
            Te.createElement(Ap, { cache: m, serialized: k, isStringTag: typeof T == 'string' }),
            Te.createElement(T, L),
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
          return e(h, g({}, o, m, { shouldForwardProp: Qi(v, m, !0) })).apply(void 0, p);
        }),
        v
      );
    };
  };
const Lp = Dp;
var Fp = [
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
  da = Lp.bind();
Fp.forEach(function (e) {
  da[e] = da(e);
});
const jp = da;
function Vp(e) {
  return e == null || Object.keys(e).length === 0;
}
function zl(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return A(Vl, { styles: typeof t == 'function' ? (a) => t(Vp(a) ? o : a) : t });
}
process.env.NODE_ENV !== 'production' &&
  (zl.propTypes = { defaultTheme: n.object, styles: n.oneOfType([n.string, n.object, n.func]) });
/**
 * @mui/styled-engine v5.11.11
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function zp(e, t) {
  const o = jp(e, t);
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
const Bp = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  Up =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  Cn = Up;
function Eo(e, t) {
  return t ? jt(e, t, { clone: !1 }) : e;
}
const Fa = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  ts = { keys: ['xs', 'sm', 'md', 'lg', 'xl'], up: (e) => `@media (min-width:${Fa[e]}px)` };
function an(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || ts;
    return t.reduce((s, l, c) => ((s[i.up(i.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const i = r.breakpoints || ts;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || Fa).indexOf(l) !== -1) {
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
function Wp(e = {}) {
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
function Hp(e, t) {
  return e.reduce((o, r) => {
    const a = o[r];
    return (!a || Object.keys(a).length === 0) && delete o[r], o;
  }, t);
}
function xr(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((a, i) => (a && a[i] ? a[i] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, a) => (r && r[a] != null ? r[a] : null), e);
}
function or(e, t, o, r = o) {
  let a;
  return (
    typeof e == 'function' ? (a = e(o)) : Array.isArray(e) ? (a = e[o] || r) : (a = xr(e, o) || r),
    t && (a = t(a, r, e)),
    a
  );
}
function Qe(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: a } = e,
    i = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        u = xr(c, r) || {};
      return an(s, l, (p) => {
        let b = or(u, a, p);
        return (
          p === b &&
            typeof p == 'string' &&
            (b = or(u, a, `${t}${p === 'default' ? '' : Q(p)}`, p)),
          o === !1 ? b : { [o]: b }
        );
      });
    };
  return (
    (i.propTypes = process.env.NODE_ENV !== 'production' ? { [t]: Cn } : {}),
    (i.filterProps = [t]),
    i
  );
}
function Er(...e) {
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
function qp(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const Yp = { m: 'margin', p: 'padding' },
  Kp = { t: 'Top', r: 'Right', b: 'Bottom', l: 'Left', x: ['Left', 'Right'], y: ['Top', 'Bottom'] },
  ns = { marginX: 'mx', marginY: 'my', paddingX: 'px', paddingY: 'py' },
  Gp = qp((e) => {
    if (e.length > 2)
      if (ns[e]) e = ns[e];
      else return [e];
    const [t, o] = e.split(''),
      r = Yp[t],
      a = Kp[o] || '';
    return Array.isArray(a) ? a.map((i) => r + i) : [r + a];
  }),
  Cr = [
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
  Or = [
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
  Xp = [...Cr, ...Or];
function Ao(e, t, o, r) {
  var a;
  const i = (a = xr(e, t, !1)) != null ? a : o;
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
function Bl(e) {
  return Ao(e, 'spacing', 8, 'spacing');
}
function Do(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function Jp(e, t) {
  return (o) => e.reduce((r, a) => ((r[a] = Do(t, o)), r), {});
}
function Zp(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const a = Gp(o),
    i = Jp(a, r),
    s = e[o];
  return an(e, s, i);
}
function Ul(e, t) {
  const o = Bl(e.theme);
  return Object.keys(e)
    .map((r) => Zp(e, t, r, o))
    .reduce(Eo, {});
}
function lt(e) {
  return Ul(e, Cr);
}
lt.propTypes =
  process.env.NODE_ENV !== 'production' ? Cr.reduce((e, t) => ((e[t] = Cn), e), {}) : {};
lt.filterProps = Cr;
function ct(e) {
  return Ul(e, Or);
}
ct.propTypes =
  process.env.NODE_ENV !== 'production' ? Or.reduce((e, t) => ((e[t] = Cn), e), {}) : {};
ct.filterProps = Or;
process.env.NODE_ENV !== 'production' && Xp.reduce((e, t) => ((e[t] = Cn), e), {});
function tn(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Qp = Qe({ prop: 'border', themeKey: 'borders', transform: tn }),
  ef = Qe({ prop: 'borderTop', themeKey: 'borders', transform: tn }),
  tf = Qe({ prop: 'borderRight', themeKey: 'borders', transform: tn }),
  nf = Qe({ prop: 'borderBottom', themeKey: 'borders', transform: tn }),
  of = Qe({ prop: 'borderLeft', themeKey: 'borders', transform: tn }),
  rf = Qe({ prop: 'borderColor', themeKey: 'palette' }),
  af = Qe({ prop: 'borderTopColor', themeKey: 'palette' }),
  sf = Qe({ prop: 'borderRightColor', themeKey: 'palette' }),
  lf = Qe({ prop: 'borderBottomColor', themeKey: 'palette' }),
  cf = Qe({ prop: 'borderLeftColor', themeKey: 'palette' }),
  Tr = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = Ao(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({ borderRadius: Do(t, r) });
      return an(e, e.borderRadius, o);
    }
    return null;
  };
Tr.propTypes = process.env.NODE_ENV !== 'production' ? { borderRadius: Cn } : {};
Tr.filterProps = ['borderRadius'];
Er(Qp, ef, tf, nf, of, rf, af, sf, lf, cf, Tr);
const Sr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Ao(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({ gap: Do(t, r) });
    return an(e, e.gap, o);
  }
  return null;
};
Sr.propTypes = process.env.NODE_ENV !== 'production' ? { gap: Cn } : {};
Sr.filterProps = ['gap'];
const wr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Ao(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({ columnGap: Do(t, r) });
    return an(e, e.columnGap, o);
  }
  return null;
};
wr.propTypes = process.env.NODE_ENV !== 'production' ? { columnGap: Cn } : {};
wr.filterProps = ['columnGap'];
const kr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Ao(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({ rowGap: Do(t, r) });
    return an(e, e.rowGap, o);
  }
  return null;
};
kr.propTypes = process.env.NODE_ENV !== 'production' ? { rowGap: Cn } : {};
kr.filterProps = ['rowGap'];
const uf = Qe({ prop: 'gridColumn' }),
  df = Qe({ prop: 'gridRow' }),
  pf = Qe({ prop: 'gridAutoFlow' }),
  ff = Qe({ prop: 'gridAutoColumns' }),
  mf = Qe({ prop: 'gridAutoRows' }),
  hf = Qe({ prop: 'gridTemplateColumns' }),
  bf = Qe({ prop: 'gridTemplateRows' }),
  gf = Qe({ prop: 'gridTemplateAreas' }),
  vf = Qe({ prop: 'gridArea' });
Er(Sr, wr, kr, uf, df, pf, ff, mf, hf, bf, gf, vf);
function Kn(e, t) {
  return t === 'grey' ? t : e;
}
const yf = Qe({ prop: 'color', themeKey: 'palette', transform: Kn }),
  xf = Qe({ prop: 'bgcolor', cssProperty: 'backgroundColor', themeKey: 'palette', transform: Kn }),
  Ef = Qe({ prop: 'backgroundColor', themeKey: 'palette', transform: Kn });
Er(yf, xf, Ef);
function _t(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Cf = Qe({ prop: 'width', transform: _t }),
  ja = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, a, i;
        return {
          maxWidth:
            ((r = e.theme) == null || (a = r.breakpoints) == null || (i = a.values) == null
              ? void 0
              : i[o]) ||
            Fa[o] ||
            _t(o),
        };
      };
      return an(e, e.maxWidth, t);
    }
    return null;
  };
ja.filterProps = ['maxWidth'];
const Of = Qe({ prop: 'minWidth', transform: _t }),
  Tf = Qe({ prop: 'height', transform: _t }),
  Sf = Qe({ prop: 'maxHeight', transform: _t }),
  wf = Qe({ prop: 'minHeight', transform: _t });
Qe({ prop: 'size', cssProperty: 'width', transform: _t });
Qe({ prop: 'size', cssProperty: 'height', transform: _t });
const kf = Qe({ prop: 'boxSizing' });
Er(Cf, ja, Of, Tf, Sf, wf, kf);
const Gr = (e) => (t) => {
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
        return s || (s = r), { [e]: s };
      };
      return an(t, t[e], o);
    }
    return null;
  },
  Rf = {
    border: { themeKey: 'borders', transform: tn },
    borderTop: { themeKey: 'borders', transform: tn },
    borderRight: { themeKey: 'borders', transform: tn },
    borderBottom: { themeKey: 'borders', transform: tn },
    borderLeft: { themeKey: 'borders', transform: tn },
    borderColor: { themeKey: 'palette' },
    borderTopColor: { themeKey: 'palette' },
    borderRightColor: { themeKey: 'palette' },
    borderBottomColor: { themeKey: 'palette' },
    borderLeftColor: { themeKey: 'palette' },
    borderRadius: { themeKey: 'shape.borderRadius', style: Tr },
    color: { themeKey: 'palette', transform: Kn },
    bgcolor: { themeKey: 'palette', cssProperty: 'backgroundColor', transform: Kn },
    backgroundColor: { themeKey: 'palette', transform: Kn },
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
    gap: { style: Sr },
    rowGap: { style: kr },
    columnGap: { style: wr },
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
    maxWidth: { style: ja },
    minWidth: { transform: _t },
    height: { transform: _t },
    maxHeight: { transform: _t },
    minHeight: { transform: _t },
    boxSizing: {},
    fontFamily: { themeKey: 'typography', style: Gr('fontFamily') },
    fontSize: { themeKey: 'typography', style: Gr('fontSize') },
    fontStyle: { themeKey: 'typography' },
    fontWeight: { themeKey: 'typography', style: Gr('fontWeight') },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: { cssProperty: !1, themeKey: 'typography' },
  },
  Va = Rf;
function Nf(...e) {
  const t = e.reduce((r, a) => r.concat(Object.keys(a)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function $f(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Pf() {
  function e(o, r, a, i) {
    const s = { [o]: r, theme: a },
      l = i[o];
    if (!l) return { [o]: r };
    const { cssProperty: c = o, themeKey: u, transform: d, style: p } = l;
    if (r == null) return null;
    const b = xr(a, u) || {};
    return p
      ? p(s)
      : an(s, r, (v) => {
          let h = or(b, d, v);
          return (
            v === h &&
              typeof v == 'string' &&
              (h = or(b, d, `${o}${v === 'default' ? '' : Q(v)}`, v)),
            c === !1 ? h : { [c]: h }
          );
        });
  }
  function t(o) {
    var r;
    const { sx: a, theme: i = {} } = o || {};
    if (!a) return null;
    const s = (r = i.unstable_sxConfig) != null ? r : Va;
    function l(c) {
      let u = c;
      if (typeof c == 'function') u = c(i);
      else if (typeof c != 'object') return c;
      if (!u) return null;
      const d = Wp(i.breakpoints),
        p = Object.keys(d);
      let b = d;
      return (
        Object.keys(u).forEach((y) => {
          const v = $f(u[y], i);
          if (v != null)
            if (typeof v == 'object')
              if (s[y]) b = Eo(b, e(y, v, i, s));
              else {
                const h = an({ theme: i }, v, (m) => ({ [y]: m }));
                Nf(h, v) ? (b[y] = t({ sx: v, theme: i })) : (b = Eo(b, h));
              }
            else b = Eo(b, e(y, v, i, s));
        }),
        Hp(p, b)
      );
    }
    return Array.isArray(a) ? a.map(l) : l(a);
  }
  return t;
}
const Wl = Pf();
Wl.filterProps = ['sx'];
const za = Wl;
function Hl(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = Hl(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function Ee() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = Hl(e)) && (r && (r += ' '), (r += t));
  return r;
}
const If = ['values', 'unit', 'step'],
  _f = (e) => {
    const t = Object.keys(e).map((o) => ({ key: o, val: e[o] })) || [];
    return t.sort((o, r) => o.val - r.val), t.reduce((o, r) => g({}, o, { [r.key]: r.val }), {});
  };
function Mf(e) {
  const {
      values: t = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: o = 'px',
      step: r = 5,
    } = e,
    a = Ce(e, If),
    i = _f(t),
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
  return g({ keys: s, values: i, up: l, down: c, between: u, only: d, not: p, unit: o }, a);
}
const Af = { borderRadius: 4 },
  Df = Af;
function Lf(e = 8) {
  if (e.mui) return e;
  const t = Bl({ spacing: e }),
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
const Ff = ['breakpoints', 'palette', 'spacing', 'shape'];
function Ba(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: a, shape: i = {} } = e,
    s = Ce(e, Ff),
    l = Mf(o),
    c = Lf(a);
  let u = jt(
    {
      breakpoints: l,
      direction: 'ltr',
      components: {},
      palette: g({ mode: 'light' }, r),
      spacing: c,
      shape: g({}, Df, i),
    },
    s,
  );
  return (
    (u = t.reduce((d, p) => jt(d, p), u)),
    (u.unstable_sxConfig = g({}, Va, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return za({ sx: p, theme: this });
    }),
    u
  );
}
const ql = x.createContext(null);
process.env.NODE_ENV !== 'production' && (ql.displayName = 'ThemeContext');
const jf = ql;
function Vf() {
  const e = x.useContext(jf);
  return process.env.NODE_ENV !== 'production' && x.useDebugValue(e), e;
}
function zf(e) {
  return Object.keys(e).length === 0;
}
function Yl(e = null) {
  const t = Vf();
  return !t || zf(t) ? e : t;
}
const Bf = Ba();
function Kl(e = Bf) {
  return Yl(e);
}
const Uf = ['variant'];
function os(e) {
  return e.length === 0;
}
function Gl(e) {
  const { variant: t } = e,
    o = Ce(e, Uf);
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((a) => {
        a === 'color'
          ? (r += os(r) ? e[a] : Q(e[a]))
          : (r += `${os(r) ? a : Q(a)}${Q(e[a].toString())}`);
      }),
    r
  );
}
const Wf = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'],
  Hf = ['theme'],
  qf = ['theme'];
function fo(e) {
  return Object.keys(e).length === 0;
}
function Yf(e) {
  return typeof e == 'string' && e.charCodeAt(0) > 96;
}
const Kf = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Gf = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((a) => {
        const i = Gl(a.props);
        r[i] = a.style;
      }),
      r
    );
  },
  Xf = (e, t, o, r) => {
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
            d && l.push(t[Gl(u.props)]);
        }),
      l
    );
  };
function Co(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Jf = Ba(),
  Zf = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function Qf(e = {}) {
  const { defaultTheme: t = Jf, rootShouldForwardProp: o = Co, slotShouldForwardProp: r = Co } = e,
    a = (i) => {
      const s = fo(i.theme) ? t : i.theme;
      return za(g({}, i, { theme: s }));
    };
  return (
    (a.__mui_systemSx = !0),
    (i, s = {}) => {
      Bp(i, (C) => C.filter((E) => !(E != null && E.__mui_systemSx)));
      const { name: l, slot: c, skipVariantsResolver: u, skipSx: d, overridesResolver: p } = s,
        b = Ce(s, Wf),
        y = u !== void 0 ? u : (c && c !== 'Root') || !1,
        v = d || !1;
      let h;
      process.env.NODE_ENV !== 'production' && l && (h = `${l}-${Zf(c || 'Root')}`);
      let m = Co;
      c === 'Root' ? (m = o) : c ? (m = r) : Yf(i) && (m = void 0);
      const S = zp(i, g({ shouldForwardProp: m, label: h }, b)),
        T = (C, ...E) => {
          const f = E
            ? E.map((L) =>
                typeof L == 'function' && L.__emotion_real !== L
                  ? (D) => {
                      let { theme: _ } = D,
                        Y = Ce(D, Hf);
                      return L(g({ theme: fo(_) ? t : _ }, Y));
                    }
                  : L,
              )
            : [];
          let w = C;
          l &&
            p &&
            f.push((L) => {
              const D = fo(L.theme) ? t : L.theme,
                _ = Kf(l, D);
              if (_) {
                const Y = {};
                return (
                  Object.entries(_).forEach(([B, M]) => {
                    Y[B] = typeof M == 'function' ? M(g({}, L, { theme: D })) : M;
                  }),
                  p(L, Y)
                );
              }
              return null;
            }),
            l &&
              !y &&
              f.push((L) => {
                const D = fo(L.theme) ? t : L.theme;
                return Xf(L, Gf(l, D), D, l);
              }),
            v || f.push(a);
          const k = f.length - E.length;
          if (Array.isArray(C) && k > 0) {
            const L = new Array(k).fill('');
            (w = [...C, ...L]), (w.raw = [...C.raw, ...L]);
          } else
            typeof C == 'function' &&
              C.__emotion_real !== C &&
              (w = (L) => {
                let { theme: D } = L,
                  _ = Ce(L, qf);
                return C(g({ theme: fo(D) ? t : D }, _));
              });
          const V = S(w, ...f);
          if (process.env.NODE_ENV !== 'production') {
            let L;
            l && (L = `${l}${c || ''}`),
              L === void 0 && (L = `Styled(${od(i)})`),
              (V.displayName = L);
          }
          return V;
        };
      return S.withConfig && (T.withConfig = S.withConfig), T;
    }
  );
}
function em(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : Ra(t.components[o].defaultProps, r);
}
function tm({ props: e, name: t, defaultTheme: o }) {
  const r = Kl(o);
  return em({ theme: r, name: t, props: e });
}
function Ua(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function nm(e) {
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
function An(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return An(nm(e));
  const t = e.indexOf('('),
    o = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(o) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : En(9, e),
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
          : En(10, a),
      );
  } else r = r.split(',');
  return (r = r.map((i) => parseFloat(i))), { type: o, values: r, colorSpace: a };
}
function Rr(e) {
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
function om(e) {
  e = An(e);
  const { values: t } = e,
    o = t[0],
    r = t[1] / 100,
    a = t[2] / 100,
    i = r * Math.min(a, 1 - a),
    s = (u, d = (u + o / 30) % 12) => a - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = 'rgb';
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === 'hsla' && ((l += 'a'), c.push(t[3])), Rr({ type: l, values: c });
}
function pa(e) {
  e = An(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? An(om(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function rs(e, t) {
  const o = pa(e),
    r = pa(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function Ze(e, t) {
  return (
    (e = An(e)),
    (t = Ua(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    Rr(e)
  );
}
function Nr(e, t) {
  if (((e = An(e)), (t = Ua(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return Rr(e);
}
function $r(e, t) {
  if (((e = An(e)), (t = Ua(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return Rr(e);
}
function rm(e, t = 0.15) {
  return pa(e) > 0.5 ? Nr(e, t) : $r(e, t);
}
function am(e, t) {
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
const im = ['mode', 'contrastThreshold', 'tonalOffset'],
  as = {
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: { paper: ko.white, default: ko.white },
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
  Xr = {
    text: {
      primary: ko.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: { paper: '#121212', default: '#121212' },
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
function is(e, t, o, r) {
  const a = r.light || r,
    i = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = $r(e.main, a))
      : t === 'dark' && (e.dark = Nr(e.main, i)));
}
function sm(e = 'light') {
  return e === 'dark'
    ? { main: zn[200], light: zn[50], dark: zn[400] }
    : { main: zn[700], light: zn[400], dark: zn[800] };
}
function lm(e = 'light') {
  return e === 'dark'
    ? { main: Vn[200], light: Vn[50], dark: Vn[400] }
    : { main: Vn[500], light: Vn[300], dark: Vn[700] };
}
function cm(e = 'light') {
  return e === 'dark'
    ? { main: jn[500], light: jn[300], dark: jn[700] }
    : { main: jn[700], light: jn[400], dark: jn[800] };
}
function um(e = 'light') {
  return e === 'dark'
    ? { main: Bn[400], light: Bn[300], dark: Bn[700] }
    : { main: Bn[700], light: Bn[500], dark: Bn[900] };
}
function dm(e = 'light') {
  return e === 'dark'
    ? { main: Un[400], light: Un[300], dark: Un[700] }
    : { main: Un[800], light: Un[500], dark: Un[900] };
}
function pm(e = 'light') {
  return e === 'dark'
    ? { main: uo[400], light: uo[300], dark: uo[700] }
    : { main: '#ed6c02', light: uo[500], dark: uo[900] };
}
function fm(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2 } = e,
    a = Ce(e, im),
    i = e.primary || sm(t),
    s = e.secondary || lm(t),
    l = e.error || cm(t),
    c = e.info || um(t),
    u = e.success || dm(t),
    d = e.warning || pm(t);
  function p(h) {
    const m = rs(h, Xr.text.primary) >= o ? Xr.text.primary : as.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const S = rs(h, m);
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
            : En(11, m ? ` (${m})` : '', S),
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
            : En(12, m ? ` (${m})` : '', JSON.stringify(h.main)),
        );
      return (
        is(h, 'light', T, r), is(h, 'dark', C, r), h.contrastText || (h.contrastText = p(h.main)), h
      );
    },
    y = { dark: Xr, light: as };
  return (
    process.env.NODE_ENV !== 'production' &&
      (y[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    jt(
      g(
        {
          common: g({}, ko),
          mode: t,
          primary: b({ color: i, name: 'primary' }),
          secondary: b({
            color: s,
            name: 'secondary',
            mainShade: 'A400',
            lightShade: 'A200',
            darkShade: 'A700',
          }),
          error: b({ color: l, name: 'error' }),
          warning: b({ color: d, name: 'warning' }),
          info: b({ color: c, name: 'info' }),
          success: b({ color: u, name: 'success' }),
          grey: ju,
          contrastThreshold: o,
          getContrastText: p,
          augmentColor: b,
          tonalOffset: r,
        },
        y[t],
      ),
      a,
    )
  );
}
const mm = [
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
function hm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ss = { textTransform: 'uppercase' },
  ls = '"Roboto", "Helvetica", "Arial", sans-serif';
function bm(e, t) {
  const o = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: r = ls,
      fontSize: a = 14,
      fontWeightLight: i = 300,
      fontWeightRegular: s = 400,
      fontWeightMedium: l = 500,
      fontWeightBold: c = 700,
      htmlFontSize: u = 16,
      allVariants: d,
      pxToRem: p,
    } = o,
    b = Ce(o, mm);
  process.env.NODE_ENV !== 'production' &&
    (typeof a != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof u != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const y = a / 14,
    v = p || ((S) => `${(S / u) * y}rem`),
    h = (S, T, C, E, f) =>
      g(
        { fontFamily: r, fontWeight: S, fontSize: v(T), lineHeight: C },
        r === ls ? { letterSpacing: `${hm(E / T)}em` } : {},
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
      button: h(l, 14, 1.75, 0.4, ss),
      caption: h(s, 12, 1.66, 0.4),
      overline: h(s, 12, 2.66, 1, ss),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return jt(
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
    { clone: !1 },
  );
}
const gm = 0.2,
  vm = 0.14,
  ym = 0.12;
function at(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${gm})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${vm})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${ym})`,
  ].join(',');
}
const xm = [
    'none',
    at(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    at(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    at(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    at(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    at(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    at(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    at(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    at(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    at(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    at(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    at(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    at(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    at(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    at(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    at(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    at(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    at(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    at(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    at(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    at(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    at(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    at(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    at(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    at(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  Em = xm,
  Cm = ['duration', 'easing', 'delay'],
  Om = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  Tm = {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  };
function cs(e) {
  return `${Math.round(e)}ms`;
}
function Sm(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function wm(e) {
  const t = g({}, Om, e.easing),
    o = g({}, Tm, e.duration);
  return g(
    {
      getAutoHeightDuration: Sm,
      create: (a = ['all'], i = {}) => {
        const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0 } = i,
          u = Ce(i, Cm);
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
              `${d} ${typeof s == 'string' ? s : cs(s)} ${l} ${typeof c == 'string' ? c : cs(c)}`,
          )
          .join(',');
      },
    },
    e,
    { easing: t, duration: o },
  );
}
const km = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  Rm = km,
  Nm = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function $m(e = {}, ...t) {
  const { mixins: o = {}, palette: r = {}, transitions: a = {}, typography: i = {} } = e,
    s = Ce(e, Nm);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : En(18),
    );
  const l = fm(r),
    c = Ba(e);
  let u = jt(c, {
    mixins: am(c.breakpoints, o),
    palette: l,
    shadows: Em.slice(),
    typography: bm(l, i),
    transitions: wm(a),
    zIndex: g({}, Rm),
  });
  if (
    ((u = jt(u, s)), (u = t.reduce((d, p) => jt(d, p), u)), process.env.NODE_ENV !== 'production')
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
              const m = De('', v);
              console.error(
                [
                  `MUI: The \`${y}\` component increases the CSS specificity of the \`${v}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(b, null, 2),
                  '',
                  `Instead, you need to use the '&.${m}' syntax:`,
                  JSON.stringify({ root: { [`&.${m}`]: h } }, null, 2),
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
    (u.unstable_sxConfig = g({}, Va, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return za({ sx: p, theme: this });
    }),
    u
  );
}
const Pm = $m(),
  Pr = Pm;
function ao() {
  const e = Kl(Pr);
  return process.env.NODE_ENV !== 'production' && x.useDebugValue(e), e;
}
function Be({ props: e, name: t }) {
  return tm({ props: e, name: t, defaultTheme: Pr });
}
const Xt = (e) => Co(e) && e !== 'classes',
  Wa = Co,
  Im = Qf({ defaultTheme: Pr, rootShouldForwardProp: Xt }),
  pe = Im,
  _m = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  us = _m;
function xn(e) {
  return typeof e == 'string';
}
function Mm(e, t, o) {
  return e === void 0 || xn(e) ? t : g({}, t, { ownerState: g({}, t.ownerState, o) });
}
const Am = { disableDefaultClasses: !1 },
  Dm = x.createContext(Am);
function Xl(e) {
  const { disableDefaultClasses: t } = x.useContext(Dm);
  return (o) => (t ? '' : e(o));
}
function Jl(e, t = []) {
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
function fa(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function ds(e) {
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
function Lm(e) {
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
      { props: h, internalRef: void 0 }
    );
  }
  const s = Jl(g({}, a, r)),
    l = ds(r),
    c = ds(a),
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
    { props: b, internalRef: u.ref }
  );
}
const Fm = ['elementType', 'externalSlotProps', 'ownerState'];
function Lt(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: a } = e,
    i = Ce(e, Fm),
    s = fa(r, a),
    { props: l, internalRef: c } = Lm(g({}, i, { externalSlotProps: s })),
    u = pt(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return Mm(o, g({}, l, { ref: u }), a);
}
function ps(e) {
  return e.substring(2).toLowerCase();
}
function jm(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function rr(e) {
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
  const d = pt(t.ref, l),
    p = Ot((v) => {
      const h = u.current;
      u.current = !1;
      const m = ut(l.current);
      if (!c.current || !l.current || ('clientX' in v && jm(v, m))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let S;
      v.composedPath
        ? (S = v.composedPath().indexOf(l.current) > -1)
        : (S = !m.documentElement.contains(v.target) || l.current.contains(v.target)),
        !S && (o || !h) && a(v);
    }),
    b = (v) => (h) => {
      u.current = !0;
      const m = t.props[v];
      m && m(h);
    },
    y = { ref: d };
  return (
    i !== !1 && (y[i] = b(i)),
    x.useEffect(() => {
      if (i !== !1) {
        const v = ps(i),
          h = ut(l.current),
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
        const v = ps(r),
          h = ut(l.current);
        return (
          h.addEventListener(v, p),
          () => {
            h.removeEventListener(v, p);
          }
        );
      }
    }, [p, r]),
    A(x.Fragment, { children: x.cloneElement(t, y) })
  );
}
process.env.NODE_ENV !== 'production' &&
  (rr.propTypes = {
    children: oo.isRequired,
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
process.env.NODE_ENV !== 'production' && (rr['propTypes'] = wa(rr.propTypes));
const Vm = [
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
function zm(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function Bm(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function Um(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || Bm(e));
}
function Wm(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(Vm)).forEach((r, a) => {
      const i = zm(r);
      i === -1 ||
        !Um(r) ||
        (i === 0 ? t.push(r) : o.push({ documentOrder: a, tabIndex: i, node: r }));
    }),
    o
      .sort((r, a) =>
        r.tabIndex === a.tabIndex ? r.documentOrder - a.documentOrder : r.tabIndex - a.tabIndex,
      )
      .map((r) => r.node)
      .concat(t)
  );
}
function Hm() {
  return !0;
}
function ar(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: a = !1,
      getTabbable: i = Wm,
      isEnabled: s = Hm,
      open: l,
    } = e,
    c = x.useRef(!1),
    u = x.useRef(null),
    d = x.useRef(null),
    p = x.useRef(null),
    b = x.useRef(null),
    y = x.useRef(!1),
    v = x.useRef(null),
    h = pt(t.ref, v),
    m = x.useRef(null);
  x.useEffect(() => {
    !l || !v.current || (y.current = !o);
  }, [o, l]),
    x.useEffect(() => {
      if (!l || !v.current) return;
      const C = ut(v.current);
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
      const C = ut(v.current),
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
  return et(x.Fragment, {
    children: [
      A('div', { tabIndex: l ? 0 : -1, onFocus: T, ref: u, 'data-testid': 'sentinelStart' }),
      x.cloneElement(t, { ref: h, onFocus: S }),
      A('div', { tabIndex: l ? 0 : -1, onFocus: T, ref: d, 'data-testid': 'sentinelEnd' }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (ar.propTypes = {
    children: oo,
    disableAutoFocus: n.bool,
    disableEnforceFocus: n.bool,
    disableRestoreFocus: n.bool,
    getTabbable: n.func,
    isEnabled: n.func,
    open: n.bool.isRequired,
  });
process.env.NODE_ENV !== 'production' && (ar['propTypes'] = wa(ar.propTypes));
var kt = 'top',
  Vt = 'bottom',
  zt = 'right',
  Rt = 'left',
  Ir = 'auto',
  Lo = [kt, Vt, zt, Rt],
  Zn = 'start',
  Po = 'end',
  qm = 'clippingParents',
  Zl = 'viewport',
  mo = 'popper',
  Ym = 'reference',
  fs = Lo.reduce(function (e, t) {
    return e.concat([t + '-' + Zn, t + '-' + Po]);
  }, []),
  Ql = [].concat(Lo, [Ir]).reduce(function (e, t) {
    return e.concat([t, t + '-' + Zn, t + '-' + Po]);
  }, []),
  Km = 'beforeRead',
  Gm = 'read',
  Xm = 'afterRead',
  Jm = 'beforeMain',
  Zm = 'main',
  Qm = 'afterMain',
  eh = 'beforeWrite',
  th = 'write',
  nh = 'afterWrite',
  ma = [Km, Gm, Xm, Jm, Zm, Qm, eh, th, nh];
function sn(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function Bt(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function Dn(e) {
  var t = Bt(e).Element;
  return e instanceof t || e instanceof Element;
}
function At(e) {
  var t = Bt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ha(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Bt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function oh(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      a = t.attributes[o] || {},
      i = t.elements[o];
    !At(i) ||
      !sn(i) ||
      (Object.assign(i.style, r),
      Object.keys(a).forEach(function (s) {
        var l = a[s];
        l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function rh(e) {
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
        var a = t.elements[r],
          i = t.attributes[r] || {},
          s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : o[r]),
          l = s.reduce(function (c, u) {
            return (c[u] = ''), c;
          }, {});
        !At(a) ||
          !sn(a) ||
          (Object.assign(a.style, l),
          Object.keys(i).forEach(function (c) {
            a.removeAttribute(c);
          }));
      });
    }
  );
}
const ah = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: oh,
  effect: rh,
  requires: ['computeStyles'],
};
function Yt(e) {
  return e.split('-')[0];
}
var _n = Math.max,
  ir = Math.min,
  Qn = Math.round;
function ha() {
  var e = navigator.userAgentData;
  return e != null && e.brands
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function ec() {
  return !/^((?!chrome|android).)*safari/i.test(ha());
}
function eo(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    a = 1,
    i = 1;
  t &&
    At(e) &&
    ((a = (e.offsetWidth > 0 && Qn(r.width) / e.offsetWidth) || 1),
    (i = (e.offsetHeight > 0 && Qn(r.height) / e.offsetHeight) || 1));
  var s = Dn(e) ? Bt(e) : window,
    l = s.visualViewport,
    c = !ec() && o,
    u = (r.left + (c && l ? l.offsetLeft : 0)) / a,
    d = (r.top + (c && l ? l.offsetTop : 0)) / i,
    p = r.width / a,
    b = r.height / i;
  return { width: p, height: b, top: d, right: u + p, bottom: d + b, left: u, x: u, y: d };
}
function qa(e) {
  var t = eo(e),
    o = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - o) <= 1 && (o = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: o, height: r }
  );
}
function tc(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && Ha(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Gt(e) {
  return Bt(e).getComputedStyle(e);
}
function ih(e) {
  return ['table', 'td', 'th'].indexOf(sn(e)) >= 0;
}
function On(e) {
  return ((Dn(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function _r(e) {
  return sn(e) === 'html' ? e : e.assignedSlot || e.parentNode || (Ha(e) ? e.host : null) || On(e);
}
function ms(e) {
  return !At(e) || Gt(e).position === 'fixed' ? null : e.offsetParent;
}
function sh(e) {
  var t = /firefox/i.test(ha()),
    o = /Trident/i.test(ha());
  if (o && At(e)) {
    var r = Gt(e);
    if (r.position === 'fixed') return null;
  }
  var a = _r(e);
  for (Ha(a) && (a = a.host); At(a) && ['html', 'body'].indexOf(sn(a)) < 0; ) {
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
function Fo(e) {
  for (var t = Bt(e), o = ms(e); o && ih(o) && Gt(o).position === 'static'; ) o = ms(o);
  return o && (sn(o) === 'html' || (sn(o) === 'body' && Gt(o).position === 'static'))
    ? t
    : o || sh(e) || t;
}
function Ya(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function Oo(e, t, o) {
  return _n(e, ir(t, o));
}
function lh(e, t, o) {
  var r = Oo(e, t, o);
  return r > o ? o : r;
}
function nc() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function oc(e) {
  return Object.assign({}, nc(), e);
}
function rc(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var ch = function (t, o) {
  return (
    (t = typeof t == 'function' ? t(Object.assign({}, o.rects, { placement: o.placement })) : t),
    oc(typeof t != 'number' ? t : rc(t, Lo))
  );
};
function uh(e) {
  var t,
    o = e.state,
    r = e.name,
    a = e.options,
    i = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = Yt(o.placement),
    c = Ya(l),
    u = [Rt, zt].indexOf(l) >= 0,
    d = u ? 'height' : 'width';
  if (!(!i || !s)) {
    var p = ch(a.padding, o),
      b = qa(i),
      y = c === 'y' ? kt : Rt,
      v = c === 'y' ? Vt : zt,
      h = o.rects.reference[d] + o.rects.reference[c] - s[c] - o.rects.popper[d],
      m = s[c] - o.rects.reference[c],
      S = Fo(i),
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
function dh(e) {
  var t = e.state,
    o = e.options,
    r = o.element,
    a = r === void 0 ? '[data-popper-arrow]' : r;
  if (a != null && !(typeof a == 'string' && ((a = t.elements.popper.querySelector(a)), !a))) {
    if (
      (process.env.NODE_ENV !== 'production' &&
        (At(a) ||
          console.error(
            [
              'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
              'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
              'the arrow.',
            ].join(' '),
          )),
      !tc(t.elements.popper, a))
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
const ph = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: uh,
  effect: dh,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function to(e) {
  return e.split('-')[1];
}
var fh = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
function mh(e) {
  var t = e.x,
    o = e.y,
    r = window,
    a = r.devicePixelRatio || 1;
  return { x: Qn(t * a) / a || 0, y: Qn(o * a) / a || 0 };
}
function hs(e) {
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
    m = typeof d == 'function' ? d({ x: y, y: h }) : { x: y, y: h };
  (y = m.x), (h = m.y);
  var S = s.hasOwnProperty('x'),
    T = s.hasOwnProperty('y'),
    C = Rt,
    E = kt,
    f = window;
  if (u) {
    var w = Fo(o),
      k = 'clientHeight',
      V = 'clientWidth';
    if (
      (w === Bt(o) &&
        ((w = On(o)),
        Gt(w).position !== 'static' &&
          l === 'absolute' &&
          ((k = 'scrollHeight'), (V = 'scrollWidth'))),
      (w = w),
      a === kt || ((a === Rt || a === zt) && i === Po))
    ) {
      E = Vt;
      var L = p && w === f && f.visualViewport ? f.visualViewport.height : w[k];
      (h -= L - r.height), (h *= c ? 1 : -1);
    }
    if (a === Rt || ((a === kt || a === Vt) && i === Po)) {
      C = zt;
      var D = p && w === f && f.visualViewport ? f.visualViewport.width : w[V];
      (y -= D - r.width), (y *= c ? 1 : -1);
    }
  }
  var _ = Object.assign({ position: l }, u && fh),
    Y = d === !0 ? mh({ x: y, y: h }) : { x: y, y: h };
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
function hh(e) {
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
    variation: to(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: a,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      hs(
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
        hs(
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
const bh = { name: 'computeStyles', enabled: !0, phase: 'beforeWrite', fn: hh, data: {} };
var Bo = { passive: !0 };
function gh(e) {
  var t = e.state,
    o = e.instance,
    r = e.options,
    a = r.scroll,
    i = a === void 0 ? !0 : a,
    s = r.resize,
    l = s === void 0 ? !0 : s,
    c = Bt(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    i &&
      u.forEach(function (d) {
        d.addEventListener('scroll', o.update, Bo);
      }),
    l && c.addEventListener('resize', o.update, Bo),
    function () {
      i &&
        u.forEach(function (d) {
          d.removeEventListener('scroll', o.update, Bo);
        }),
        l && c.removeEventListener('resize', o.update, Bo);
    }
  );
}
const vh = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: gh,
  data: {},
};
var yh = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function Zo(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return yh[t];
  });
}
var xh = { start: 'end', end: 'start' };
function bs(e) {
  return e.replace(/start|end/g, function (t) {
    return xh[t];
  });
}
function Ka(e) {
  var t = Bt(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return { scrollLeft: o, scrollTop: r };
}
function Ga(e) {
  return eo(On(e)).left + Ka(e).scrollLeft;
}
function Eh(e, t) {
  var o = Bt(e),
    r = On(e),
    a = o.visualViewport,
    i = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (a) {
    (i = a.width), (s = a.height);
    var u = ec();
    (u || (!u && t === 'fixed')) && ((l = a.offsetLeft), (c = a.offsetTop));
  }
  return { width: i, height: s, x: l + Ga(e), y: c };
}
function Ch(e) {
  var t,
    o = On(e),
    r = Ka(e),
    a = (t = e.ownerDocument) == null ? void 0 : t.body,
    i = _n(o.scrollWidth, o.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0),
    s = _n(o.scrollHeight, o.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0),
    l = -r.scrollLeft + Ga(e),
    c = -r.scrollTop;
  return (
    Gt(a || o).direction === 'rtl' && (l += _n(o.clientWidth, a ? a.clientWidth : 0) - i),
    { width: i, height: s, x: l, y: c }
  );
}
function Xa(e) {
  var t = Gt(e),
    o = t.overflow,
    r = t.overflowX,
    a = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + a + r);
}
function ac(e) {
  return ['html', 'body', '#document'].indexOf(sn(e)) >= 0
    ? e.ownerDocument.body
    : At(e) && Xa(e)
    ? e
    : ac(_r(e));
}
function To(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = ac(e),
    a = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    i = Bt(r),
    s = a ? [i].concat(i.visualViewport || [], Xa(r) ? r : []) : r,
    l = t.concat(s);
  return a ? l : l.concat(To(_r(s)));
}
function ba(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Oh(e, t) {
  var o = eo(e, !1, t === 'fixed');
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
function gs(e, t, o) {
  return t === Zl ? ba(Eh(e, o)) : Dn(t) ? Oh(t, o) : ba(Ch(On(e)));
}
function Th(e) {
  var t = To(_r(e)),
    o = ['absolute', 'fixed'].indexOf(Gt(e).position) >= 0,
    r = o && At(e) ? Fo(e) : e;
  return Dn(r)
    ? t.filter(function (a) {
        return Dn(a) && tc(a, r) && sn(a) !== 'body';
      })
    : [];
}
function Sh(e, t, o, r) {
  var a = t === 'clippingParents' ? Th(e) : [].concat(t),
    i = [].concat(a, [o]),
    s = i[0],
    l = i.reduce(function (c, u) {
      var d = gs(e, u, r);
      return (
        (c.top = _n(d.top, c.top)),
        (c.right = ir(d.right, c.right)),
        (c.bottom = ir(d.bottom, c.bottom)),
        (c.left = _n(d.left, c.left)),
        c
      );
    }, gs(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function ic(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    a = r ? Yt(r) : null,
    i = r ? to(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (a) {
    case kt:
      c = { x: s, y: t.y - o.height };
      break;
    case Vt:
      c = { x: s, y: t.y + t.height };
      break;
    case zt:
      c = { x: t.x + t.width, y: l };
      break;
    case Rt:
      c = { x: t.x - o.width, y: l };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var u = a ? Ya(a) : null;
  if (u != null) {
    var d = u === 'y' ? 'height' : 'width';
    switch (i) {
      case Zn:
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
    c = l === void 0 ? qm : l,
    u = o.rootBoundary,
    d = u === void 0 ? Zl : u,
    p = o.elementContext,
    b = p === void 0 ? mo : p,
    y = o.altBoundary,
    v = y === void 0 ? !1 : y,
    h = o.padding,
    m = h === void 0 ? 0 : h,
    S = oc(typeof m != 'number' ? m : rc(m, Lo)),
    T = b === mo ? Ym : mo,
    C = e.rects.popper,
    E = e.elements[v ? T : b],
    f = Sh(Dn(E) ? E : E.contextElement || On(e.elements.popper), c, d, s),
    w = eo(e.elements.reference),
    k = ic({ reference: w, element: C, strategy: 'absolute', placement: a }),
    V = ba(Object.assign({}, C, k)),
    L = b === mo ? V : w,
    D = {
      top: f.top - L.top + S.top,
      bottom: L.bottom - f.bottom + S.bottom,
      left: f.left - L.left + S.left,
      right: L.right - f.right + S.right,
    },
    _ = e.modifiersData.offset;
  if (b === mo && _) {
    var Y = _[a];
    Object.keys(D).forEach(function (B) {
      var M = [zt, Vt].indexOf(B) >= 0 ? 1 : -1,
        F = [kt, Vt].indexOf(B) >= 0 ? 'y' : 'x';
      D[B] += Y[F] * M;
    });
  }
  return D;
}
function wh(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    a = o.boundary,
    i = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    u = c === void 0 ? Ql : c,
    d = to(r),
    p = d
      ? l
        ? fs
        : fs.filter(function (v) {
            return to(v) === d;
          })
      : Lo,
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
    return (v[h] = Io(e, { placement: h, boundary: a, rootBoundary: i, padding: s })[Yt(h)]), v;
  }, {});
  return Object.keys(y).sort(function (v, h) {
    return y[v] - y[h];
  });
}
function kh(e) {
  if (Yt(e) === Ir) return [];
  var t = Zo(e);
  return [bs(e), t, bs(t)];
}
function Rh(e) {
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
        C = c || (T || !v ? [Zo(m)] : kh(m)),
        E = [m].concat(C).reduce(function (U, ne) {
          return U.concat(
            Yt(ne) === Ir
              ? wh(t, {
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
        k = new Map(),
        V = !0,
        L = E[0],
        D = 0;
      D < E.length;
      D++
    ) {
      var _ = E[D],
        Y = Yt(_),
        B = to(_) === Zn,
        M = [kt, Vt].indexOf(Y) >= 0,
        F = M ? 'width' : 'height',
        z = Io(t, { placement: _, boundary: d, rootBoundary: p, altBoundary: b, padding: u }),
        ie = M ? (B ? zt : Rt) : B ? Vt : kt;
      f[F] > w[F] && (ie = Zo(ie));
      var se = Zo(ie),
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
const Nh = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: Rh,
  requiresIfExists: ['offset'],
  data: { _skip: !1 },
};
function vs(e, t, o) {
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
function ys(e) {
  return [kt, zt, Vt, Rt].some(function (t) {
    return e[t] >= 0;
  });
}
function $h(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    a = t.rects.popper,
    i = t.modifiersData.preventOverflow,
    s = Io(t, { elementContext: 'reference' }),
    l = Io(t, { altBoundary: !0 }),
    c = vs(s, r),
    u = vs(l, a, i),
    d = ys(c),
    p = ys(u);
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
const Ph = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: $h,
};
function Ih(e, t, o) {
  var r = Yt(e),
    a = [Rt, kt].indexOf(r) >= 0 ? -1 : 1,
    i = typeof o == 'function' ? o(Object.assign({}, t, { placement: e })) : o,
    s = i[0],
    l = i[1];
  return (
    (s = s || 0), (l = (l || 0) * a), [Rt, zt].indexOf(r) >= 0 ? { x: l, y: s } : { x: s, y: l }
  );
}
function _h(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    a = o.offset,
    i = a === void 0 ? [0, 0] : a,
    s = Ql.reduce(function (d, p) {
      return (d[p] = Ih(p, t.rects, i)), d;
    }, {}),
    l = s[t.placement],
    c = l.x,
    u = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = s);
}
const Mh = { name: 'offset', enabled: !0, phase: 'main', requires: ['popperOffsets'], fn: _h };
function Ah(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = ic({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const Dh = { name: 'popperOffsets', enabled: !0, phase: 'read', fn: Ah, data: {} };
function Lh(e) {
  return e === 'x' ? 'y' : 'x';
}
function Fh(e) {
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
    m = Io(t, { boundary: c, rootBoundary: u, padding: p, altBoundary: d }),
    S = Yt(t.placement),
    T = to(t.placement),
    C = !T,
    E = Ya(S),
    f = Lh(E),
    w = t.modifiersData.popperOffsets,
    k = t.rects.reference,
    V = t.rects.popper,
    L = typeof h == 'function' ? h(Object.assign({}, t.rects, { placement: t.placement })) : h,
    D =
      typeof L == 'number'
        ? { mainAxis: L, altAxis: L }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, L),
    _ = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    Y = { x: 0, y: 0 };
  if (w) {
    if (i) {
      var B,
        M = E === 'y' ? kt : Rt,
        F = E === 'y' ? Vt : zt,
        z = E === 'y' ? 'height' : 'width',
        ie = w[E],
        se = ie + m[M],
        G = ie - m[F],
        R = y ? -V[z] / 2 : 0,
        j = T === Zn ? k[z] : V[z],
        X = T === Zn ? -V[z] : -k[z],
        H = t.elements.arrow,
        U = y && H ? qa(H) : { width: 0, height: 0 },
        ne = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : nc(),
        oe = ne[M],
        J = ne[F],
        ae = Oo(0, k[z], U[z]),
        le = C ? k[z] / 2 - R - ae - oe - D.mainAxis : j - ae - oe - D.mainAxis,
        he = C ? -k[z] / 2 + R + ae + J + D.mainAxis : X + ae + J + D.mainAxis,
        re = t.elements.arrow && Fo(t.elements.arrow),
        P = re ? (E === 'y' ? re.clientTop || 0 : re.clientLeft || 0) : 0,
        Oe = (B = _ == null ? void 0 : _[E]) != null ? B : 0,
        I = ie + le - Oe - P,
        W = ie + he - Oe,
        $e = Oo(y ? ir(se, I) : se, ie, y ? _n(G, W) : G);
      (w[E] = $e), (Y[E] = $e - ie);
    }
    if (l) {
      var ge,
        tt = E === 'x' ? kt : Rt,
        Ve = E === 'x' ? Vt : zt,
        we = w[f],
        Re = f === 'y' ? 'height' : 'width',
        nt = we + m[tt],
        it = we - m[Ve],
        Z = [kt, Rt].indexOf(S) !== -1,
        me = (ge = _ == null ? void 0 : _[f]) != null ? ge : 0,
        ve = Z ? nt : we - k[Re] - V[Re] - me + D.altAxis,
        be = Z ? we + k[Re] + V[Re] - me - D.altAxis : it,
        fe = y && Z ? lh(ve, we, be) : Oo(y ? ve : nt, we, y ? be : it);
      (w[f] = fe), (Y[f] = fe - we);
    }
    t.modifiersData[r] = Y;
  }
}
const jh = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: Fh,
  requiresIfExists: ['offset'],
};
function Vh(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function zh(e) {
  return e === Bt(e) || !At(e) ? Ka(e) : Vh(e);
}
function Bh(e) {
  var t = e.getBoundingClientRect(),
    o = Qn(t.width) / e.offsetWidth || 1,
    r = Qn(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function Uh(e, t, o) {
  o === void 0 && (o = !1);
  var r = At(t),
    a = At(t) && Bh(t),
    i = On(t),
    s = eo(e, a, o),
    l = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 };
  return (
    (r || (!r && !o)) &&
      ((sn(t) !== 'body' || Xa(i)) && (l = zh(t)),
      At(t) ? ((c = eo(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : i && (c.x = Ga(i))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function Wh(e) {
  var t = new Map(),
    o = new Set(),
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
function Hh(e) {
  var t = Wh(e);
  return ma.reduce(function (o, r) {
    return o.concat(
      t.filter(function (a) {
        return a.phase === r;
      }),
    );
  }, []);
}
function qh(e) {
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
var Sn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  Yh = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  xs = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function Kh(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), xs)
      .filter(function (o, r, a) {
        return a.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                gn(Sn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                gn(Sn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            ma.indexOf(t.phase) < 0 &&
              console.error(
                gn(Sn, t.name, '"phase"', 'either ' + ma.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(gn(Sn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(gn(Sn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                gn(Sn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                gn(
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
                xs
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
            e.find(function (a) {
              return a.name === r;
            }) == null && console.error(gn(Yh, String(t.name), r, r));
          });
      });
  });
}
function Gh(e, t) {
  var o = new Set();
  return e.filter(function (r) {
    var a = t(r);
    if (!o.has(a)) return o.add(a), !0;
  });
}
function Xh(e) {
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
var Es =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Jh =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  Cs = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
function Os() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function Zh(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    a = t.defaultOptions,
    i = a === void 0 ? Cs : a;
  return function (l, c, u) {
    u === void 0 && (u = i);
    var d = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, Cs, i),
        modifiersData: {},
        elements: { reference: l, popper: c },
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
              reference: Dn(l) ? To(l) : l.contextElement ? To(l.contextElement) : [],
              popper: To(c),
            });
          var C = Hh(Xh([].concat(r, d.options.modifiers)));
          if (
            ((d.orderedModifiers = C.filter(function (_) {
              return _.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var E = Gh([].concat(C, d.options.modifiers), function (_) {
              var Y = _.name;
              return Y;
            });
            if ((Kh(E), Yt(d.options.placement) === Ir)) {
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
        forceUpdate: function () {
          if (!b) {
            var S = d.elements,
              T = S.reference,
              C = S.popper;
            if (!Os(T, C)) {
              process.env.NODE_ENV !== 'production' && console.error(Es);
              return;
            }
            (d.rects = { reference: Uh(T, Fo(C), d.options.strategy === 'fixed'), popper: qa(C) }),
              (d.reset = !1),
              (d.placement = d.options.placement),
              d.orderedModifiers.forEach(function (_) {
                return (d.modifiersData[_.name] = Object.assign({}, _.data));
              });
            for (var E = 0, f = 0; f < d.orderedModifiers.length; f++) {
              if (process.env.NODE_ENV !== 'production' && ((E += 1), E > 100)) {
                console.error(Jh);
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
                (d = k({ state: d, options: L, name: D, instance: y }) || d);
            }
          }
        },
        update: qh(function () {
          return new Promise(function (m) {
            y.forceUpdate(), m(d);
          });
        }),
        destroy: function () {
          h(), (b = !0);
        },
      };
    if (!Os(l, c)) return process.env.NODE_ENV !== 'production' && console.error(Es), y;
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
          var f = E({ state: d, name: S, instance: y, options: C }),
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
var Qh = [vh, Dh, bh, ah, Mh, Nh, jh, ph, Ph],
  eb = Zh({ defaultModifiers: Qh });
function tb(e) {
  return typeof e == 'function' ? e() : e;
}
const sr = x.forwardRef(function (t, o) {
  const { children: r, container: a, disablePortal: i = !1 } = t,
    [s, l] = x.useState(null),
    c = pt(x.isValidElement(r) ? r.ref : null, o);
  if (
    (rn(() => {
      i || l(tb(a) || document.body);
    }, [a, i]),
    rn(() => {
      if (s && !i)
        return (
          er(o, s),
          () => {
            er(o, null);
          }
        );
    }, [o, s, i]),
    i)
  ) {
    if (x.isValidElement(r)) {
      const u = { ref: c };
      return x.cloneElement(r, u);
    }
    return A(x.Fragment, { children: r });
  }
  return A(x.Fragment, { children: s && fl.createPortal(r, s) });
});
process.env.NODE_ENV !== 'production' &&
  (sr.propTypes = {
    children: n.node,
    container: n.oneOfType([on, n.func]),
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (sr['propTypes'] = wa(sr.propTypes));
const sc = sr;
function nb(e) {
  return De('MuiPopper', e);
}
Ie('MuiPopper', ['root']);
const ob = [
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
  rb = [
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
function ab(e, t) {
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
function lr(e) {
  return typeof e == 'function' ? e() : e;
}
function Mr(e) {
  return e.nodeType !== void 0;
}
function ib(e) {
  return !Mr(e);
}
const sb = () => je({ root: ['root'] }, Xl(nb)),
  lb = {},
  cb = x.forwardRef(function (t, o) {
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
      T = Ce(t, ob),
      C = x.useRef(null),
      E = pt(C, o),
      f = x.useRef(null),
      w = pt(f, v),
      k = x.useRef(w);
    rn(() => {
      k.current = w;
    }, [w]),
      x.useImperativeHandle(v, () => f.current, []);
    const V = ab(b, l),
      [L, D] = x.useState(V),
      [_, Y] = x.useState(lr(a));
    x.useEffect(() => {
      f.current && f.current.forceUpdate();
    }),
      x.useEffect(() => {
        a && Y(lr(a));
      }, [a]),
      rn(() => {
        if (!_ || !d) return;
        const ie = (R) => {
          D(R.placement);
        };
        if (process.env.NODE_ENV !== 'production' && _ && Mr(_) && _.nodeType === 1) {
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
          { name: 'preventOverflow', options: { altBoundary: c } },
          { name: 'flip', options: { altBoundary: c } },
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
        const G = eb(_, C.current, g({ placement: V }, y, { modifiers: se }));
        return (
          k.current(G),
          () => {
            G.destroy(), k.current(null);
          }
        );
      }, [_, c, u, d, y, V]);
    const B = { placement: L };
    S !== null && (B.TransitionProps = S);
    const M = sb(),
      F = (r = s ?? m.root) != null ? r : 'div',
      z = Lt({
        elementType: F,
        externalSlotProps: h.root,
        externalForwardedProps: T,
        additionalProps: { role: 'tooltip', ref: E },
        ownerState: g({}, t, p),
        className: M.root,
      });
    return A(F, g({}, z, { children: typeof i == 'function' ? i(B) : i }));
  }),
  lc = x.forwardRef(function (t, o) {
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
        popperOptions: b = lb,
        popperRef: y,
        style: v,
        transition: h = !1,
        slotProps: m = {},
        slots: S = {},
      } = t,
      T = Ce(t, rb),
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
      const D = lr(r);
      k = D && Mr(D) ? ut(D).body : ut(null).body;
    }
    const V = !d && c && (!h || C) ? 'none' : void 0,
      L = h ? { in: d, onEnter: f, onExited: w } : void 0;
    return A(sc, {
      disablePortal: l,
      container: k,
      children: A(
        cb,
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
            style: g({ position: 'fixed', top: 0, left: 0, display: V }, v),
            TransitionProps: L,
            children: a,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (lc.propTypes = {
    anchorEl: Kt(n.oneOfType([on, n.object, n.func]), (e) => {
      if (e.open) {
        const t = lr(e.anchorEl);
        if (t && Mr(t) && t.nodeType === 1) {
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
          (ib(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    container: n.oneOfType([on, n.func]),
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
const ub = lc;
function db(e) {
  const t = ut(e);
  return t.body === e
    ? Mn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function So(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function Ts(e) {
  return parseInt(Mn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function pb(e) {
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
function Ss(e, t, o, r, a) {
  const i = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1,
      c = !pb(s);
    l && c && So(s, a);
  });
}
function Jr(e, t) {
  let o = -1;
  return e.some((r, a) => (t(r) ? ((o = a), !0) : !1)), o;
}
function fb(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (db(r)) {
      const s = Ol(ut(r));
      o.push({ value: r.style.paddingRight, property: 'padding-right', el: r }),
        (r.style.paddingRight = `${Ts(r) + s}px`);
      const l = ut(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({ value: c.style.paddingRight, property: 'padding-right', el: c }),
          (c.style.paddingRight = `${Ts(c) + s}px`);
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment) i = ut(r).body;
    else {
      const s = r.parentElement,
        l = Mn(r);
      i =
        (s == null ? void 0 : s.nodeName) === 'HTML' && l.getComputedStyle(s).overflowY === 'scroll'
          ? s
          : r;
    }
    o.push(
      { value: i.style.overflow, property: 'overflow', el: i },
      { value: i.style.overflowX, property: 'overflow-x', el: i },
      { value: i.style.overflowY, property: 'overflow-y', el: i },
    ),
      (i.style.overflow = 'hidden');
  }
  return () => {
    o.forEach(({ value: i, el: s, property: l }) => {
      i ? s.style.setProperty(l, i) : s.style.removeProperty(l);
    });
  };
}
function mb(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class hb {
  constructor() {
    (this.containers = void 0), (this.modals = void 0), (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && So(t.modalRef, !1);
    const a = mb(o);
    Ss(o, t.mount, t.modalRef, a, !0);
    const i = Jr(this.containers, (s) => s.container === o);
    return i !== -1
      ? (this.containers[i].modals.push(t), r)
      : (this.containers.push({ modals: [t], container: o, restore: null, hiddenSiblings: a }), r);
  }
  mount(t, o) {
    const r = Jr(this.containers, (i) => i.modals.indexOf(t) !== -1),
      a = this.containers[r];
    a.restore || (a.restore = fb(a, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const a = Jr(this.containers, (s) => s.modals.indexOf(t) !== -1),
      i = this.containers[a];
    if ((i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0))
      i.restore && i.restore(),
        t.modalRef && So(t.modalRef, o),
        Ss(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1),
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
function bb(e) {
  return De('MuiModal', e);
}
Ie('MuiModal', ['root', 'hidden', 'backdrop']);
const gb = [
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
  vb = (e) => {
    const { open: t, exited: o } = e;
    return je({ root: ['root', !t && o && 'hidden'], backdrop: ['backdrop'] }, Xl(bb));
  };
function yb(e) {
  return typeof e == 'function' ? e() : e;
}
function xb(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const Eb = new hb(),
  cc = x.forwardRef(function (t, o) {
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
        manager: S = Eb,
        onBackdropClick: T,
        onClose: C,
        onKeyDown: E,
        open: f,
        onTransitionEnter: w,
        onTransitionExited: k,
        slotProps: V = {},
        slots: L = {},
      } = t,
      D = Ce(t, gb),
      [_, Y] = x.useState(!f),
      B = x.useRef({}),
      M = x.useRef(null),
      F = x.useRef(null),
      z = pt(F, o),
      ie = xb(i),
      se = (r = t['aria-hidden']) != null ? r : !0,
      G = () => ut(M.current),
      R = () => ((B.current.modalRef = F.current), (B.current.mountNode = M.current), B.current),
      j = () => {
        S.mount(R(), { disableScrollLock: v }), F.current && (F.current.scrollTop = 0);
      },
      X = Ot(() => {
        const ge = yb(c) || G().body;
        S.add(R(), ge), F.current && j();
      }),
      H = x.useCallback(() => S.isTopModal(R()), [S]),
      U = Ot((ge) => {
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
      J = vb(oe),
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
      ie && ((P.onEnter = $i(ae, i.props.onEnter)), (P.onExited = $i(le, i.props.onExited)));
    const Oe = (a = l ?? L.root) != null ? a : 'div',
      I = Lt({
        elementType: Oe,
        externalSlotProps: V.root,
        externalForwardedProps: D,
        additionalProps: { ref: z, role: 'presentation', onKeyDown: re },
        className: J.root,
        ownerState: oe,
      }),
      W = L.backdrop,
      $e = Lt({
        elementType: W,
        externalSlotProps: V.backdrop,
        additionalProps: { 'aria-hidden': !0, onClick: he, open: f },
        className: J.backdrop,
        ownerState: oe,
      });
    return !m && !f && (!ie || _)
      ? null
      : A(sc, {
          ref: U,
          container: c,
          disablePortal: b,
          children: et(
            Oe,
            g({}, I, {
              children: [
                !h && W ? A(W, g({}, $e)) : null,
                A(ar, {
                  disableEnforceFocus: d,
                  disableAutoFocus: u,
                  disableRestoreFocus: y,
                  isEnabled: H,
                  open: f,
                  children: x.cloneElement(i, P),
                }),
              ],
            }),
          ),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (cc.propTypes = {
    children: oo.isRequired,
    closeAfterTransition: n.bool,
    component: n.elementType,
    container: n.oneOfType([on, n.func]),
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
const Cb = cc,
  Ob = 2;
function uc(e, t) {
  return e - t;
}
function ho(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function ws(e, t) {
  var o;
  const { index: r } =
    (o = e.reduce((a, i, s) => {
      const l = Math.abs(t - i);
      return a === null || l < a.distance || l === a.distance ? { distance: l, index: s } : a;
    }, null)) != null
      ? o
      : {};
  return r;
}
function Uo(e, t) {
  if (t.current !== void 0 && e.changedTouches) {
    const o = e;
    for (let r = 0; r < o.changedTouches.length; r += 1) {
      const a = o.changedTouches[r];
      if (a.identifier === t.current) return { x: a.clientX, y: a.clientY };
    }
    return !1;
  }
  return { x: e.clientX, y: e.clientY };
}
function cr(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function Tb(e, t, o) {
  return (o - t) * e + t;
}
function Sb(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function wb(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(Sb(t)));
}
function ks({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(uc);
}
function Wo({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, a;
  const i = ut(e.current);
  if (
    !((r = e.current) != null && r.contains(i.activeElement)) ||
    Number(i == null || (a = i.activeElement) == null ? void 0 : a.getAttribute('data-index')) !== t
  ) {
    var s;
    (s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  o && o(t);
}
const kb = {
    horizontal: { offset: (e) => ({ left: `${e}%` }), leap: (e) => ({ width: `${e}%` }) },
    'horizontal-reverse': {
      offset: (e) => ({ right: `${e}%` }),
      leap: (e) => ({ width: `${e}%` }),
    },
    vertical: { offset: (e) => ({ bottom: `${e}%` }), leap: (e) => ({ height: `${e}%` }) },
  },
  Rb = (e) => e;
let Ho;
function Zr() {
  return (
    Ho === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Ho = CSS.supports('touch-action', 'none'))
        : (Ho = !0)),
    Ho
  );
}
function Nb(e) {
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
      scale: v = Rb,
      step: h = 1,
      tabIndex: m,
      value: S,
    } = e,
    T = x.useRef(),
    [C, E] = x.useState(-1),
    [f, w] = x.useState(-1),
    [k, V] = x.useState(!1),
    L = x.useRef(0),
    [D, _] = In({ controlled: S, default: o ?? c, name: 'Slider' }),
    Y =
      d &&
      ((Z, me, ve) => {
        const be = Z.nativeEvent || Z,
          fe = new be.constructor(be.type, be);
        Object.defineProperty(fe, 'target', { writable: !0, value: { value: me, name: u } }),
          d(fe, me, ve);
      }),
    B = Array.isArray(D);
  let M = B ? D.slice().sort(uc) : [D];
  M = M.map((Z) => ho(Z, c, l));
  const F =
      s === !0 && h !== null
        ? [...Array(Math.floor((l - c) / h) + 1)].map((Z, me) => ({ value: c + h * me }))
        : s || [],
    z = F.map((Z) => Z.value),
    { isFocusVisibleRef: ie, onBlur: se, onFocus: G, ref: R } = Cl(),
    [j, X] = x.useState(-1),
    H = x.useRef(),
    U = pt(R, H),
    ne = pt(y, U),
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
        (ee = ho(ee, c, l)),
        F && h == null)
      ) {
        const ye = z.indexOf(M[be]);
        ee = ee < M[be] ? z[ye - 1] : z[ye + 1];
      }
      if (B) {
        a && (ee = ho(ee, M[be - 1] || -1 / 0, M[be + 1] || 1 / 0));
        const ye = ee;
        ee = ks({ values: M, newValue: ee, index: be });
        let xe = be;
        a || (xe = ee.indexOf(ye)), Wo({ sliderRef: H, activeIndex: xe });
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
      if (((xe = Tb(ye, c, l)), h)) xe = wb(xe, h, c);
      else {
        const st = ws(z, xe);
        xe = z[st];
      }
      xe = ho(xe, c, l);
      let _e = 0;
      if (B) {
        me ? (_e = le.current) : (_e = ws(M, xe)),
          a && (xe = ho(xe, M[_e - 1] || -1 / 0, M[_e + 1] || 1 / 0));
        const st = xe;
        (xe = ks({ values: M, newValue: xe, index: _e })),
          (a && me) || ((_e = xe.indexOf(st)), (le.current = _e));
      }
      return { newValue: xe, activeIndex: _e };
    },
    P = Ot((Z) => {
      const me = Uo(Z, T);
      if (!me) return;
      if (((L.current += 1), Z.type === 'mousemove' && Z.buttons === 0)) {
        Oe(Z);
        return;
      }
      const { newValue: ve, activeIndex: be } = re({ finger: me, move: !0 });
      Wo({ sliderRef: H, activeIndex: be, setActive: E }),
        _(ve),
        !k && L.current > Ob && V(!0),
        Y && ve !== D && Y(Z, ve, be);
    }),
    Oe = Ot((Z) => {
      const me = Uo(Z, T);
      if ((V(!1), !me)) return;
      const { newValue: ve } = re({ finger: me, move: !0 });
      E(-1), Z.type === 'touchend' && w(-1), p && p(Z, ve), (T.current = void 0), W();
    }),
    I = Ot((Z) => {
      if (r) return;
      Zr() || Z.preventDefault();
      const me = Z.changedTouches[0];
      me != null && (T.current = me.identifier);
      const ve = Uo(Z, T);
      if (ve !== !1) {
        const { newValue: fe, activeIndex: ue } = re({ finger: ve });
        Wo({ sliderRef: H, activeIndex: ue, setActive: E }), _(fe), Y && Y(Z, fe, ue);
      }
      L.current = 0;
      const be = ut(H.current);
      be.addEventListener('touchmove', P), be.addEventListener('touchend', Oe);
    }),
    W = x.useCallback(() => {
      const Z = ut(H.current);
      Z.removeEventListener('mousemove', P),
        Z.removeEventListener('mouseup', Oe),
        Z.removeEventListener('touchmove', P),
        Z.removeEventListener('touchend', Oe);
    }, [Oe, P]);
  x.useEffect(() => {
    const { current: Z } = H;
    return (
      Z.addEventListener('touchstart', I, { passive: Zr() }),
      () => {
        Z.removeEventListener('touchstart', I, { passive: Zr() }), W();
      }
    );
  }, [W, I]),
    x.useEffect(() => {
      r && W();
    }, [r, W]);
  const $e = (Z) => (me) => {
      var ve;
      if (
        ((ve = Z.onMouseDown) == null || ve.call(Z, me),
        r || me.defaultPrevented || me.button !== 0)
      )
        return;
      me.preventDefault();
      const be = Uo(me, T);
      if (be !== !1) {
        const { newValue: ue, activeIndex: ee } = re({ finger: be });
        Wo({ sliderRef: H, activeIndex: ee, setActive: E }), _(ue), Y && Y(me, ue, ee);
      }
      L.current = 0;
      const fe = ut(H.current);
      fe.addEventListener('mousemove', P), fe.addEventListener('mouseup', Oe);
    },
    ge = cr(B ? M[0] : c, c, l),
    tt = cr(M[M.length - 1], c, l) - ge,
    Ve = (Z = {}) => {
      const me = { onMouseDown: $e(Z || {}) },
        ve = g({}, Z, me);
      return g({ ref: ne }, ve);
    },
    we = (Z) => (me) => {
      var ve;
      (ve = Z.onMouseOver) == null || ve.call(Z, me);
      const be = Number(me.currentTarget.getAttribute('data-index'));
      w(be);
    },
    Re = (Z) => (me) => {
      var ve;
      (ve = Z.onMouseLeave) == null || ve.call(Z, me), w(-1);
    };
  return {
    active: C,
    axis: he,
    axisProps: kb,
    dragging: k,
    focusedThumbIndex: j,
    getHiddenInputProps: (Z = {}) => {
      var me;
      const ve = { onChange: ae(Z || {}), onFocus: oe(Z || {}), onBlur: J(Z || {}) },
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
        { style: g({}, gd, { direction: i ? 'rtl' : 'ltr', width: '100%', height: '100%' }) },
      );
    },
    getRootProps: Ve,
    getThumbProps: (Z = {}) => {
      const me = { onMouseOver: we(Z || {}), onMouseLeave: Re(Z || {}) };
      return g({}, Z, me);
    },
    marks: F,
    open: f,
    range: B,
    trackLeap: tt,
    trackOffset: ge,
    values: M,
  };
}
function $b(e) {
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
        const C = Jl(e),
          E = g({}, C, T);
        return g({ ref: i, role: 'presentation' }, E, {
          onBlur: y(E),
          onFocus: v(E),
          onMouseEnter: h(E),
          onMouseLeave: m(E),
        });
      },
      onClickAway: d,
    }
  );
}
const Pb = ['onChange', 'maxRows', 'minRows', 'style', 'value'];
function qo(e) {
  return parseInt(e, 10) || 0;
}
const Ib = {
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
function Rs(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const dc = x.forwardRef(function (t, o) {
  const { onChange: r, maxRows: a, minRows: i = 1, style: s, value: l } = t,
    c = Ce(t, Pb),
    { current: u } = x.useRef(l != null),
    d = x.useRef(null),
    p = pt(o, d),
    b = x.useRef(null),
    y = x.useRef(0),
    [v, h] = x.useState({ outerHeightStyle: 0 }),
    m = x.useCallback(() => {
      const f = d.current,
        k = Mn(f).getComputedStyle(f);
      if (k.width === '0px') return { outerHeightStyle: 0 };
      const V = b.current;
      (V.style.width = k.width),
        (V.value = f.value || t.placeholder || 'x'),
        V.value.slice(-1) ===
          `
` && (V.value += ' ');
      const L = k.boxSizing,
        D = qo(k.paddingBottom) + qo(k.paddingTop),
        _ = qo(k.borderBottomWidth) + qo(k.borderTopWidth),
        Y = V.scrollHeight;
      V.value = 'x';
      const B = V.scrollHeight;
      let M = Y;
      i && (M = Math.max(Number(i) * B, M)),
        a && (M = Math.min(Number(a) * B, M)),
        (M = Math.max(M, B));
      const F = M + (L === 'border-box' ? D + _ : 0),
        z = Math.abs(M - Y) <= 1;
      return { outerHeightStyle: F, overflow: z };
    }, [a, i, t.placeholder]),
    S = (f, w) => {
      const { outerHeightStyle: k, overflow: V } = w;
      return y.current < 20 &&
        ((k > 0 && Math.abs((f.outerHeightStyle || 0) - k) > 1) || f.overflow !== V)
        ? ((y.current += 1), { overflow: V, outerHeightStyle: k })
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
      Rs(f) || h((w) => S(w, f));
    }, [m]),
    C = () => {
      const f = m();
      Rs(f) ||
        fl.flushSync(() => {
          h((w) => S(w, f));
        });
    };
  x.useEffect(() => {
    const f = xl(() => {
      (y.current = 0), d.current && C();
    });
    let w;
    const k = d.current,
      V = Mn(k);
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
  return et(x.Fragment, {
    children: [
      A(
        'textarea',
        g(
          {
            value: l,
            onChange: E,
            ref: p,
            rows: i,
            style: g({ height: v.outerHeightStyle, overflow: v.overflow ? 'hidden' : void 0 }, s),
          },
          c,
        ),
      ),
      A('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: b,
        tabIndex: -1,
        style: g({}, Ib.shadow, s, { padding: 0 }),
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (dc.propTypes = {
    className: n.string,
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    onChange: n.func,
    placeholder: n.string,
    style: n.object,
    value: n.oneOfType([n.arrayOf(n.string), n.number, n.string]),
  });
const _b = dc;
function Ns(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function Mb(e = {}) {
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
    o && (d = d.toLowerCase()), t && (d = Ns(d));
    const p = d
      ? l.filter((b) => {
          let y = (i || u)(b);
          return (
            o && (y = y.toLowerCase()),
            t && (y = Ns(y)),
            a === 'start' ? y.indexOf(d) === 0 : y.indexOf(d) > -1
          );
        })
      : l;
    return typeof r == 'number' ? p.slice(0, r) : p;
  };
}
function Qr(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const Ab = Mb(),
  $s = 5,
  Db = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function Lb(e) {
  const {
      unstable_isActiveElementInListbox: t = Db,
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
      filterOptions: m = Ab,
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
    H = El(k);
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
    [W, $e] = In({ controlled: X, default: d, name: u }),
    [ge, tt] = In({ controlled: L, default: '', name: u, state: 'inputValue' }),
    [Ve, we] = x.useState(!1),
    Re = x.useCallback(
      (N, $) => {
        if (!(_ ? W.length < $.length : $ !== null) && !l) return;
        let te;
        if (_) te = '';
        else if ($ == null) te = '';
        else {
          const de = U($);
          te = typeof de == 'string' ? de : '';
        }
        ge !== te && (tt(te), F && F(N, te, 'reset'));
      },
      [U, ge, _, F, tt, l, W],
    ),
    [nt, it] = In({ controlled: ie, default: !1, name: u, state: 'open' }),
    [Z, me] = x.useState(!0),
    ve = !_ && W != null && ge === U(W),
    be = nt && !R,
    fe = be
      ? m(
          G.filter((N) => !(S && (_ ? W : [W]).some(($) => $ !== null && D(N, $)))),
          { inputValue: ve && Z ? '' : ge, getOptionLabel: U },
        )
      : [],
    ue = hd({ filteredOptions: fe, value: W });
  x.useEffect(() => {
    const N = W !== ue.value;
    (Ve && !N) || (T && !N) || Re(null, W);
  }, [W, Re, Ve, ue.value, T]);
  const ee = nt && fe.length > 0 && !R;
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
  const ye = Ot((N) => {
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
  const _e = Ot(({ event: N, index: $, reason: K = 'auto' }) => {
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
      const Ne = ae.current.querySelector(`[data-option-index="${$}"]`);
      if (
        Ne &&
        (Ne.classList.add(`${o}-focused`),
        K === 'keyboard' && Ne.classList.add(`${o}-focusVisible`),
        de.scrollHeight > de.clientHeight && K !== 'mouse')
      ) {
        const ke = Ne,
          Ae = de.clientHeight + de.scrollTop,
          vt = ke.offsetTop + ke.offsetHeight;
        vt > Ae
          ? (de.scrollTop = vt - de.clientHeight)
          : ke.offsetTop - ke.offsetHeight * (f ? 1.3 : 0) < de.scrollTop &&
            (de.scrollTop = ke.offsetTop - ke.offsetHeight * (f ? 1.3 : 0));
      }
    }),
    st = Ot(({ event: N, diff: $, direction: K = 'next', reason: te = 'auto' }) => {
      if (!be) return;
      const Ne = xe(
        (() => {
          const ke = fe.length - 1;
          if ($ === 'reset') return Oe;
          if ($ === 'start') return 0;
          if ($ === 'end') return ke;
          const Ae = I.current + $;
          return Ae < 0
            ? Ae === -1 && V
              ? -1
              : (h && I.current !== -1) || Math.abs($) > 1
              ? 0
              : ke
            : Ae > ke
            ? Ae === ke + 1 && V
              ? -1
              : h || Math.abs($) > 1
              ? ke
              : 0
            : Ae;
        })(),
        K,
      );
      if ((_e({ index: Ne, reason: te, event: N }), r && $ !== 'reset'))
        if (Ne === -1) J.current.value = ge;
        else {
          const ke = U(fe[Ne]);
          (J.current.value = ke),
            ke.toLowerCase().indexOf(ge.toLowerCase()) === 0 &&
              ge.length > 0 &&
              J.current.setSelectionRange(ge.length, ke.length);
        }
    }),
    mt = () => {
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
    St = x.useCallback(() => {
      if (!be || mt()) return;
      const N = _ ? W[0] : W;
      if (fe.length === 0 || N == null) {
        st({ diff: 'reset' });
        return;
      }
      if (ae.current) {
        if (N != null) {
          const $ = fe[I.current];
          if (_ && $ && Qr(W, (te) => D($, te)) !== -1) return;
          const K = Qr(fe, (te) => D(te, N));
          K === -1 ? st({ diff: 'reset' }) : _e({ index: K });
          return;
        }
        if (I.current >= fe.length - 1) {
          _e({ index: fe.length - 1 });
          return;
        }
        _e({ index: I.current });
      }
    }, [fe.length, _ ? !1 : W, S, st, _e, be, ge, _]),
    hn = Ot((N) => {
      er(ae, N), N && St();
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
      St();
    }, [St]);
  const wt = (N) => {
      nt || (it(!0), me(!0), z && z(N));
    },
    gt = (N, $) => {
      nt && (it(!1), B && B(N, $));
    },
    Et = (N, $, K, te) => {
      if (_) {
        if (W.length === $.length && W.every((de, Ne) => de === $[Ne])) return;
      } else if (W === $) return;
      Y && Y(N, $, K, te), $e($);
    },
    ht = x.useRef(!1),
    ot = (N, $, K = 'selectOption', te = 'options') => {
      let de = K,
        Ne = $;
      if (_) {
        if (((Ne = Array.isArray(W) ? W.slice() : []), process.env.NODE_ENV !== 'production')) {
          const Ae = Ne.filter((vt) => D($, vt));
          Ae.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${u} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${Ae.length} matches.`,
              ].join(`
`),
            );
        }
        const ke = Qr(Ne, (Ae) => D($, Ae));
        ke === -1 ? Ne.push($) : te !== 'freeSolo' && (Ne.splice(ke, 1), (de = 'removeOption'));
      }
      Re(N, Ne),
        Et(N, Ne, de, { option: $ }),
        !b && (!N || (!N.ctrlKey && !N.metaKey)) && gt(N, de),
        (s === !0 || (s === 'touch' && ht.current) || (s === 'mouse' && !ht.current)) &&
          J.current.blur();
    };
  function rt(N, $) {
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
  const bt = (N, $) => {
      if (!_) return;
      ge === '' && gt(N, 'toggleInput');
      let K = re;
      re === -1
        ? ge === '' && $ === 'previous' && (K = W.length - 1)
        : ((K += $ === 'next' ? 1 : -1), K < 0 && (K = 0), K === W.length && (K = -1)),
        (K = rt(K, $)),
        P(K),
        ye(K);
    },
    Tn = (N) => {
      (ne.current = !0), tt(''), F && F(N, '', 'clear'), Et(N, _ ? [] : null, 'clear');
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
              st({ diff: 'start', direction: 'next', reason: 'keyboard', event: $ }));
            break;
          case 'End':
            be &&
              w &&
              ($.preventDefault(),
              st({ diff: 'end', direction: 'previous', reason: 'keyboard', event: $ }));
            break;
          case 'PageUp':
            $.preventDefault(),
              st({ diff: -$s, direction: 'previous', reason: 'keyboard', event: $ }),
              wt($);
            break;
          case 'PageDown':
            $.preventDefault(),
              st({ diff: $s, direction: 'next', reason: 'keyboard', event: $ }),
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
            if (I.current !== -1 && be) {
              const K = fe[I.current],
                te = C ? C(K) : !1;
              if (($.preventDefault(), te)) return;
              ot($, K, 'selectOption'),
                r && J.current.setSelectionRange(J.current.value.length, J.current.value.length);
            } else
              T &&
                ge !== '' &&
                ve === !1 &&
                (_ && $.preventDefault(), ot($, ge, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            be
              ? ($.preventDefault(), $.stopPropagation(), gt($, 'escape'))
              : c &&
                (ge !== '' || (_ && W.length > 0)) &&
                ($.preventDefault(), $.stopPropagation(), Tn($));
            break;
          case 'Backspace':
            if (_ && !R && ge === '' && W.length > 0) {
              const K = re === -1 ? W.length - 1 : re,
                te = W.slice();
              te.splice(K, 1), Et($, te, 'removeOption', { option: W[K] });
            }
            break;
          case 'Delete':
            if (_ && !R && ge === '' && W.length > 0 && re !== -1) {
              const K = re,
                te = W.slice();
              te.splice(K, 1), Et($, te, 'removeOption', { option: W[K] });
            }
            break;
        }
    },
    bn = (N) => {
      we(!0), se && !ne.current && wt(N);
    },
    Ut = (N) => {
      if (t(ae)) {
        J.current.focus();
        return;
      }
      we(!1),
        (oe.current = !0),
        (ne.current = !1),
        i && I.current !== -1 && be
          ? ot(N, fe[I.current], 'blur')
          : i && T && ge !== ''
          ? ot(N, ge, 'blur', 'freeSolo')
          : l && Re(N, W),
        gt(N, 'blur');
    },
    ln = (N) => {
      const $ = N.target.value;
      ge !== $ && (tt($), me(!1), F && F(N, $, 'input')),
        $ === '' ? !p && !_ && Et(N, null, 'clear') : wt(N);
    },
    cn = (N) => {
      _e({
        event: N,
        index: Number(N.currentTarget.getAttribute('data-option-index')),
        reason: 'mouse',
      });
    },
    un = (N) => {
      _e({
        event: N,
        index: Number(N.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (ht.current = !0);
    },
    Zt = (N) => {
      const $ = Number(N.currentTarget.getAttribute('data-option-index'));
      ot(N, fe[$], 'selectOption'), (ht.current = !1);
    },
    dn = (N) => ($) => {
      const K = W.slice();
      K.splice(N, 1), Et($, K, 'removeOption', { option: W[N] });
    },
    Me = (N) => {
      nt ? gt(N, 'toggleInput') : wt(N);
    },
    dt = (N) => {
      N.target.getAttribute('id') !== H && N.preventDefault();
    },
    Dt = () => {
      J.current.focus(),
        j &&
          oe.current &&
          J.current.selectionEnd - J.current.selectionStart === 0 &&
          J.current.select(),
        (oe.current = !1);
    },
    O = (N) => {
      (ge === '' || !nt) && Me(N);
    };
  let q = T && ge.length > 0;
  q = q || (_ ? W.length > 0 : W !== null);
  let ce = fe;
  if (f) {
    const N = new Map();
    let $ = !1;
    ce = fe.reduce((K, te, de) => {
      const Ne = f(te);
      return (
        K.length > 0 && K[K.length - 1].group === Ne
          ? K[K.length - 1].options.push(te)
          : (process.env.NODE_ENV !== 'production' &&
              (N.get(Ne) &&
                !$ &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${u} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                ($ = !0)),
              N.set(Ne, !0)),
            K.push({ key: de, index: de, group: Ne, options: [te] })),
        K
      );
    }, []);
  }
  return (
    y && Ve && Ut(),
    {
      getRootProps: (N = {}) =>
        g({ 'aria-owns': ee ? `${H}-listbox` : null }, N, {
          onKeyDown: Jt(N),
          onMouseDown: dt,
          onClick: Dt,
        }),
      getInputLabelProps: () => ({ id: `${H}-label`, htmlFor: H }),
      getInputProps: () => ({
        id: H,
        value: ge,
        onBlur: Ut,
        onFocus: bn,
        onChange: ln,
        onMouseDown: O,
        'aria-activedescendant': be ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': ee ? `${H}-listbox` : void 0,
        'aria-expanded': ee,
        autoComplete: 'off',
        ref: J,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled: y,
      }),
      getClearProps: () => ({ tabIndex: -1, onClick: Tn }),
      getPopupIndicatorProps: () => ({ tabIndex: -1, onClick: Me }),
      getTagProps: ({ index: N }) =>
        g({ key: N, 'data-tag-index': N, tabIndex: -1 }, !R && { onDelete: dn(N) }),
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
      focused: Ve || re !== -1,
      anchorEl: le,
      setAnchorEl: he,
      focusedTag: re,
      groupedOptions: ce,
    }
  );
}
function Fb(e) {
  return De('MuiSvgIcon', e);
}
Ie('MuiSvgIcon', [
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
const jb = [
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
  Vb = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      a = { root: ['root', t !== 'inherit' && `color${Q(t)}`, `fontSize${Q(o)}`] };
    return je(a, Fb, r);
  },
  zb = pe('svg', {
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
  Ja = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiSvgIcon' }),
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
      y = Ce(r, jb),
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
    const m = Vb(v);
    return et(
      zb,
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
        { ownerState: v, children: [a, p ? A('title', { children: p }) : null] },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ja.propTypes = {
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
Ja.muiName = 'SvgIcon';
const Ps = Ja;
function io(e, t) {
  function o(r, a) {
    return A(Ps, g({ 'data-testid': `${t}Icon`, ref: a }, r, { children: e }));
  }
  return (
    process.env.NODE_ENV !== 'production' && (o.displayName = `${t}Icon`),
    (o.muiName = Ps.muiName),
    x.memo(x.forwardRef(o))
  );
}
var ga = { exports: {} },
  Ge = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Is;
function Bb() {
  if (Is) return Ge;
  Is = 1;
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
    (Ge.ContextConsumer = s),
    (Ge.ContextProvider = i),
    (Ge.Element = e),
    (Ge.ForwardRef = c),
    (Ge.Fragment = o),
    (Ge.Lazy = b),
    (Ge.Memo = p),
    (Ge.Portal = t),
    (Ge.Profiler = a),
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
      return h(m) === s;
    }),
    (Ge.isContextProvider = function (m) {
      return h(m) === i;
    }),
    (Ge.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (Ge.isForwardRef = function (m) {
      return h(m) === c;
    }),
    (Ge.isFragment = function (m) {
      return h(m) === o;
    }),
    (Ge.isLazy = function (m) {
      return h(m) === b;
    }),
    (Ge.isMemo = function (m) {
      return h(m) === p;
    }),
    (Ge.isPortal = function (m) {
      return h(m) === t;
    }),
    (Ge.isProfiler = function (m) {
      return h(m) === a;
    }),
    (Ge.isStrictMode = function (m) {
      return h(m) === r;
    }),
    (Ge.isSuspense = function (m) {
      return h(m) === u;
    }),
    (Ge.isSuspenseList = function (m) {
      return h(m) === d;
    }),
    (Ge.isValidElementType = function (m) {
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
    (Ge.typeOf = h),
    Ge
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
 */ var _s;
function Ub() {
  return (
    _s ||
      ((_s = 1),
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
                  I.$$typeof === c ||
                  I.$$typeof === C ||
                  I.getModuleId !== void 0))
            );
          }
          function f(I) {
            if (typeof I == 'object' && I !== null) {
              var W = I.$$typeof;
              switch (W) {
                case e:
                  var $e = I.type;
                  switch ($e) {
                    case o:
                    case a:
                    case r:
                    case u:
                    case d:
                      return $e;
                    default:
                      var ge = $e && $e.$$typeof;
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
          (Xe.ContextConsumer = w),
            (Xe.ContextProvider = k),
            (Xe.Element = V),
            (Xe.ForwardRef = L),
            (Xe.Fragment = D),
            (Xe.Lazy = _),
            (Xe.Memo = Y),
            (Xe.Portal = B),
            (Xe.Profiler = M),
            (Xe.StrictMode = F),
            (Xe.Suspense = z),
            (Xe.SuspenseList = ie),
            (Xe.isAsyncMode = R),
            (Xe.isConcurrentMode = j),
            (Xe.isContextConsumer = X),
            (Xe.isContextProvider = H),
            (Xe.isElement = U),
            (Xe.isForwardRef = ne),
            (Xe.isFragment = oe),
            (Xe.isLazy = J),
            (Xe.isMemo = ae),
            (Xe.isPortal = le),
            (Xe.isProfiler = he),
            (Xe.isStrictMode = re),
            (Xe.isSuspense = P),
            (Xe.isSuspenseList = Oe),
            (Xe.isValidElementType = E),
            (Xe.typeOf = f);
        })()),
    Xe
  );
}
process.env.NODE_ENV === 'production' ? (ga.exports = Bb()) : (ga.exports = Ub());
var Za = ga.exports;
function va(e, t) {
  return (
    (va = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, a) {
          return (r.__proto__ = a), r;
        }),
    va(e, t)
  );
}
function pc(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), va(e, t);
}
const Ms = { disabled: !1 };
var Wb =
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
const ur = Te.createContext(null);
var Hb = function (t) {
    return t.scrollTop;
  },
  xo = 'unmounted',
  wn = 'exited',
  kn = 'entering',
  qn = 'entered',
  ya = 'exiting',
  mn = (function (e) {
    pc(t, e);
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
            ? ((c = wn), (i.appearStatus = kn))
            : (c = qn)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = xo)
          : (c = wn),
        (i.state = { status: c }),
        (i.nextCallback = null),
        i
      );
    }
    t.getDerivedStateFromProps = function (a, i) {
      var s = a.in;
      return s && i.status === xo ? { status: wn } : null;
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
          this.props.in ? s !== kn && s !== qn && (i = kn) : (s === kn || s === qn) && (i = ya);
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
          { exit: i, enter: s, appear: l }
        );
      }),
      (o.updateStatus = function (a, i) {
        if ((a === void 0 && (a = !1), i !== null))
          if ((this.cancelNextCallback(), i === kn)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : yo.findDOMNode(this);
              s && Hb(s);
            }
            this.performEnter(a);
          } else this.performExit();
        else this.props.unmountOnExit && this.state.status === wn && this.setState({ status: xo });
      }),
      (o.performEnter = function (a) {
        var i = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : a,
          c = this.props.nodeRef ? [l] : [yo.findDOMNode(this), l],
          u = c[0],
          d = c[1],
          p = this.getTimeouts(),
          b = l ? p.appear : p.enter;
        if ((!a && !s) || Ms.disabled) {
          this.safeSetState({ status: qn }, function () {
            i.props.onEntered(u);
          });
          return;
        }
        this.props.onEnter(u, d),
          this.safeSetState({ status: kn }, function () {
            i.props.onEntering(u, d),
              i.onTransitionEnd(b, function () {
                i.safeSetState({ status: qn }, function () {
                  i.props.onEntered(u, d);
                });
              });
          });
      }),
      (o.performExit = function () {
        var a = this,
          i = this.props.exit,
          s = this.getTimeouts(),
          l = this.props.nodeRef ? void 0 : yo.findDOMNode(this);
        if (!i || Ms.disabled) {
          this.safeSetState({ status: wn }, function () {
            a.props.onExited(l);
          });
          return;
        }
        this.props.onExit(l),
          this.safeSetState({ status: ya }, function () {
            a.props.onExiting(l),
              a.onTransitionEnd(s.exit, function () {
                a.safeSetState({ status: wn }, function () {
                  a.props.onExited(l);
                });
              });
          });
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : yo.findDOMNode(this),
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
        return Te.createElement(
          ur.Provider,
          { value: null },
          typeof s == 'function' ? s(a, l) : Te.cloneElement(Te.Children.only(s), l),
        );
      }),
      t
    );
  })(Te.Component);
mn.contextType = ur;
mn.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
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
        children: n.oneOfType([n.func.isRequired, n.element.isRequired]).isRequired,
        in: n.bool,
        mountOnEnter: n.bool,
        unmountOnExit: n.bool,
        appear: n.bool,
        enter: n.bool,
        exit: n.bool,
        timeout: function (t) {
          var o = Wb;
          t.addEndListener || (o = o.isRequired);
          for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
            a[i - 1] = arguments[i];
          return o.apply(void 0, [t].concat(a));
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
function Wn() {}
mn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Wn,
  onEntering: Wn,
  onEntered: Wn,
  onExit: Wn,
  onExiting: Wn,
  onExited: Wn,
};
mn.UNMOUNTED = xo;
mn.EXITED = wn;
mn.ENTERING = kn;
mn.ENTERED = qn;
mn.EXITING = ya;
const fc = mn;
function qb(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Qa(e, t) {
  var o = function (i) {
      return t && Te.isValidElement(i) ? t(i) : i;
    },
    r = Object.create(null);
  return (
    e &&
      Te.Children.map(e, function (a) {
        return a;
      }).forEach(function (a) {
        r[a.key] = o(a);
      }),
    r
  );
}
function Yb(e, t) {
  (e = e || {}), (t = t || {});
  function o(d) {
    return d in t ? t[d] : e[d];
  }
  var r = Object.create(null),
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
function Pn(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function Kb(e, t) {
  return Qa(e.children, function (o) {
    return Te.cloneElement(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: Pn(o, 'appear', e),
      enter: Pn(o, 'enter', e),
      exit: Pn(o, 'exit', e),
    });
  });
}
function Gb(e, t, o) {
  var r = Qa(e.children),
    a = Yb(t, r);
  return (
    Object.keys(a).forEach(function (i) {
      var s = a[i];
      if (Te.isValidElement(s)) {
        var l = i in t,
          c = i in r,
          u = t[i],
          d = Te.isValidElement(u) && !u.props.in;
        c && (!l || d)
          ? (a[i] = Te.cloneElement(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: Pn(s, 'exit', e),
              enter: Pn(s, 'enter', e),
            }))
          : !c && l && !d
          ? (a[i] = Te.cloneElement(s, { in: !1 }))
          : c &&
            l &&
            Te.isValidElement(u) &&
            (a[i] = Te.cloneElement(s, {
              onExited: o.bind(null, s),
              in: u.props.in,
              exit: Pn(s, 'exit', e),
              enter: Pn(s, 'enter', e),
            }));
      }
    }),
    a
  );
}
var Xb =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  Jb = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  ei = (function (e) {
    pc(t, e);
    function t(r, a) {
      var i;
      i = e.call(this, r, a) || this;
      var s = i.handleExited.bind(qb(i));
      return (i.state = { contextValue: { isMounting: !0 }, handleExited: s, firstRender: !0 }), i;
    }
    var o = t.prototype;
    return (
      (o.componentDidMount = function () {
        (this.mounted = !0), this.setState({ contextValue: { isMounting: !1 } });
      }),
      (o.componentWillUnmount = function () {
        this.mounted = !1;
      }),
      (t.getDerivedStateFromProps = function (a, i) {
        var s = i.children,
          l = i.handleExited,
          c = i.firstRender;
        return { children: c ? Kb(a, l) : Gb(a, s, l), firstRender: !1 };
      }),
      (o.handleExited = function (a, i) {
        var s = Qa(this.props.children);
        a.key in s ||
          (a.props.onExited && a.props.onExited(i),
          this.mounted &&
            this.setState(function (l) {
              var c = g({}, l.children);
              return delete c[a.key], { children: c };
            }));
      }),
      (o.render = function () {
        var a = this.props,
          i = a.component,
          s = a.childFactory,
          l = Ce(a, ['component', 'childFactory']),
          c = this.state.contextValue,
          u = Xb(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          i === null
            ? Te.createElement(ur.Provider, { value: c }, u)
            : Te.createElement(ur.Provider, { value: c }, Te.createElement(i, l, u))
        );
      }),
      t
    );
  })(Te.Component);
ei.propTypes =
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
ei.defaultProps = Jb;
const Zb = ei,
  mc = (e) => e.scrollTop;
function dr(e, t) {
  var o, r;
  const { timeout: a, easing: i, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof a == 'number' ? a : a[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof i == 'object' ? i[t.mode] : i,
    delay: s.transitionDelay,
  };
}
function Qb(e) {
  return De('MuiPaper', e);
}
Ie('MuiPaper', [
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
const eg = ['className', 'component', 'elevation', 'square', 'variant'],
  tg = (e) => {
    const { square: t, elevation: o, variant: r, classes: a } = e,
      i = { root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`] };
    return je(i, Qb, a);
  },
  ng = pe('div', {
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
              backgroundImage: `linear-gradient(${Ze('#fff', us(t.elevation))}, ${Ze(
                '#fff',
                us(t.elevation),
              )})`,
            },
          e.vars && { backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation] },
        ),
    );
  }),
  hc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiPaper' }),
      {
        className: a,
        component: i = 'div',
        elevation: s = 1,
        square: l = !1,
        variant: c = 'elevation',
      } = r,
      u = Ce(r, eg),
      d = g({}, r, { component: i, elevation: s, square: l, variant: c }),
      p = tg(d);
    return (
      process.env.NODE_ENV !== 'production' &&
        ao().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      A(ng, g({ as: i, ownerState: d, className: Ee(p.root, a), ref: o }, u))
    );
  });
process.env.NODE_ENV !== 'production' &&
  (hc.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    elevation: Kt(ka, (e) => {
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
const jo = hc;
function bc(e) {
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
    y = { width: s, height: s, top: -(s / 2) + i, left: -(s / 2) + a },
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
    A('span', { className: b, style: y, children: A('span', { className: v }) })
  );
}
process.env.NODE_ENV !== 'production' &&
  (bc.propTypes = {
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
const og = Ie('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  Ft = og,
  rg = ['center', 'classes', 'className'];
let Ar = (e) => e,
  As,
  Ds,
  Ls,
  Fs;
const xa = 550,
  ag = 80,
  ig = La(
    As ||
      (As = Ar`
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
  sg = La(
    Ds ||
      (Ds = Ar`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  lg = La(
    Ls ||
      (Ls = Ar`
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
  cg = pe('span', { name: 'MuiTouchRipple', slot: 'Root' })({
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
  ug = pe(bc, { name: 'MuiTouchRipple', slot: 'Ripple' })(
    Fs ||
      (Fs = Ar`
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
    ig,
    xa,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Ft.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    Ft.child,
    Ft.childLeaving,
    sg,
    xa,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Ft.childPulsate,
    lg,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  gc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiTouchRipple' }),
      { center: a = !1, classes: i = {}, className: s } = r,
      l = Ce(r, rg),
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
            A(
              ug,
              {
                classes: {
                  ripple: Ee(i.ripple, Ft.ripple),
                  rippleVisible: Ee(i.rippleVisible, Ft.rippleVisible),
                  ripplePulsate: Ee(i.ripplePulsate, Ft.ripplePulsate),
                  child: Ee(i.child, Ft.child),
                  childLeaving: Ee(i.childLeaving, Ft.childLeaving),
                  childPulsate: Ee(i.childPulsate, Ft.childPulsate),
                },
                timeout: xa,
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
          const { pulsate: k = !1, center: V = a || f.pulsate, fakeElement: L = !1 } = f;
          if ((E == null ? void 0 : E.type) === 'mousedown' && b.current) {
            b.current = !1;
            return;
          }
          (E == null ? void 0 : E.type) === 'touchstart' && (b.current = !0);
          const D = L ? null : h.current,
            _ = D ? D.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
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
                m({ pulsate: k, rippleX: Y, rippleY: B, rippleSize: M, cb: w });
              }),
              (y.current = setTimeout(() => {
                v.current && (v.current(), (v.current = null));
              }, ag)))
            : m({ pulsate: k, rippleX: Y, rippleY: B, rippleSize: M, cb: w });
        },
        [a, m],
      ),
      T = x.useCallback(() => {
        S({}, { pulsate: !0 });
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
      x.useImperativeHandle(o, () => ({ pulsate: T, start: S, stop: C }), [T, S, C]),
      A(
        cg,
        g({ className: Ee(Ft.root, i.root, s), ref: h }, l, {
          children: A(Zb, { component: null, exit: !0, children: c }),
        }),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (gc.propTypes = { center: n.bool, classes: n.object, className: n.string });
const dg = gc;
function pg(e) {
  return De('MuiButtonBase', e);
}
const fg = Ie('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  mg = fg,
  hg = [
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
  bg = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: a } = e,
      s = je({ root: ['root', t && 'disabled', o && 'focusVisible'] }, pg, a);
    return o && r && (s.root += ` ${r}`), s;
  },
  gg = pe('button', { name: 'MuiButtonBase', slot: 'Root', overridesResolver: (e, t) => t.root })({
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
    [`&.${mg.disabled}`]: { pointerEvents: 'none', cursor: 'default' },
    '@media print': { colorAdjust: 'exact' },
  }),
  vc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiButtonBase' }),
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
      z = Ce(r, hg),
      ie = x.useRef(null),
      se = x.useRef(null),
      G = pt(se, M),
      { isFocusVisibleRef: R, onFocus: j, onBlur: X, ref: H } = Cl(),
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
      return Ot((xe) => (ee && ee(xe), !ye && se.current && se.current[ue](xe), !0));
    }
    const he = le('start', w),
      re = le('stop', m),
      P = le('stop', S),
      Oe = le('stop', V),
      I = le('stop', (ue) => {
        U && ue.preventDefault(), k && k(ue);
      }),
      W = le('start', _),
      $e = le('stop', L),
      ge = le('stop', D),
      tt = le(
        'stop',
        (ue) => {
          X(ue), R.current === !1 && ne(!1), v && v(ue);
        },
        !1,
      ),
      Ve = Ot((ue) => {
        ie.current || (ie.current = ue.currentTarget),
          j(ue),
          R.current === !0 && (ne(!0), C && C(ue)),
          T && T(ue);
      }),
      we = () => {
        const ue = ie.current;
        return c && c !== 'button' && !(ue.tagName === 'A' && ue.href);
      },
      Re = x.useRef(!1),
      nt = Ot((ue) => {
        b &&
          !Re.current &&
          U &&
          se.current &&
          ue.key === ' ' &&
          ((Re.current = !0),
          se.current.stop(ue, () => {
            se.current.start(ue);
          })),
          ue.target === ue.currentTarget && we() && ue.key === ' ' && ue.preventDefault(),
          E && E(ue),
          ue.target === ue.currentTarget &&
            we() &&
            ue.key === 'Enter' &&
            !u &&
            (ue.preventDefault(), h && h(ue));
      }),
      it = Ot((ue) => {
        b &&
          ue.key === ' ' &&
          se.current &&
          U &&
          !ue.defaultPrevented &&
          ((Re.current = !1),
          se.current.stop(ue, () => {
            se.current.pulsate(ue);
          })),
          f && f(ue),
          h &&
            ue.target === ue.currentTarget &&
            we() &&
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
    const ve = pt(o, H, ie);
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
      fe = bg(be);
    return et(
      gg,
      g(
        {
          as: Z,
          className: Ee(fe.root, l),
          ownerState: be,
          onBlur: tt,
          onClick: h,
          onContextMenu: re,
          onFocus: Ve,
          onKeyDown: nt,
          onKeyUp: it,
          onMouseDown: he,
          onMouseLeave: I,
          onMouseUp: Oe,
          onDragLeave: P,
          onTouchEnd: $e,
          onTouchMove: ge,
          onTouchStart: W,
          ref: ve,
          tabIndex: u ? -1 : Y,
          type: F,
        },
        me,
        z,
        { children: [s, ae ? A(dg, g({ ref: G, center: i }, B)) : null] },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (vc.propTypes = {
    action: $t,
    centerRipple: n.bool,
    children: n.node,
    classes: n.object,
    className: n.string,
    component: Sa,
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
const no = vc;
function vg(e) {
  return De('MuiIconButton', e);
}
const yg = Ie('MuiIconButton', [
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
  xg = yg,
  Eg = ['edge', 'children', 'className', 'color', 'disabled', 'disableFocusRipple', 'size'],
  Cg = (e) => {
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
    return je(s, vg, t);
  },
  Og = pe(no, {
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
          [`&.${xg.disabled}`]: {
            backgroundColor: 'transparent',
            color: (e.vars || e).palette.action.disabled,
          },
        },
      );
    },
  ),
  yc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiIconButton' }),
      {
        edge: a = !1,
        children: i,
        className: s,
        color: l = 'default',
        disabled: c = !1,
        disableFocusRipple: u = !1,
        size: d = 'medium',
      } = r,
      p = Ce(r, Eg),
      b = g({}, r, { edge: a, color: l, disabled: c, disableFocusRipple: u, size: d }),
      y = Cg(b);
    return A(
      Og,
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
        { children: i },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (yc.propTypes = {
    children: Kt(n.node, (e) =>
      x.Children.toArray(e.children).some((o) => x.isValidElement(o) && o.props.onClick)
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
const xc = yc,
  Tg = io(
    A('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  ),
  Sg = ['components', 'componentsProps', 'slots', 'slotProps'],
  wg = pe(ub, { name: 'MuiPopper', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  Ec = x.forwardRef(function (t, o) {
    var r;
    const a = Yl(),
      i = Be({ props: t, name: 'MuiPopper' }),
      { components: s, componentsProps: l, slots: c, slotProps: u } = i,
      d = Ce(i, Sg),
      p = (r = c == null ? void 0 : c.root) != null ? r : s == null ? void 0 : s.Root;
    return A(
      wg,
      g({ direction: a == null ? void 0 : a.direction, slots: { root: p }, slotProps: u ?? l }, d, {
        ref: o,
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ec.propTypes = {
    anchorEl: n.oneOfType([on, n.object, n.func]),
    children: n.oneOfType([n.node, n.func]),
    component: n.elementType,
    components: n.shape({ Root: n.elementType }),
    componentsProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    container: n.oneOfType([on, n.func]),
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
const Cc = Ec;
function kg(e) {
  return De('MuiListSubheader', e);
}
Ie('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const Rg = ['className', 'color', 'component', 'disableGutters', 'disableSticky', 'inset'],
  Ng = (e) => {
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
    return je(s, kg, t);
  },
  $g = pe('li', {
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
  ti = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiListSubheader' }),
      {
        className: a,
        color: i = 'default',
        component: s = 'li',
        disableGutters: l = !1,
        disableSticky: c = !1,
        inset: u = !1,
      } = r,
      d = Ce(r, Rg),
      p = g({}, r, { color: i, component: s, disableGutters: l, disableSticky: c, inset: u }),
      b = Ng(p);
    return A($g, g({ as: s, className: Ee(b.root, a), ref: o, ownerState: p }, d));
  });
ti.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (ti.propTypes = {
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
const Pg = ti,
  Ig = io(
    A('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function _g(e) {
  return De('MuiChip', e);
}
const Mg = Ie('MuiChip', [
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
  Fe = Mg,
  Ag = [
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
  Dg = (e) => {
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
    return je(u, _g, t);
  },
  Lg = pe('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: a, clickable: i, onDelete: s, size: l, variant: c } = o;
      return [
        { [`& .${Fe.avatar}`]: t.avatar },
        { [`& .${Fe.avatar}`]: t[`avatar${Q(l)}`] },
        { [`& .${Fe.avatar}`]: t[`avatarColor${Q(r)}`] },
        { [`& .${Fe.icon}`]: t.icon },
        { [`& .${Fe.icon}`]: t[`icon${Q(l)}`] },
        { [`& .${Fe.icon}`]: t[`iconColor${Q(a)}`] },
        { [`& .${Fe.deleteIcon}`]: t.deleteIcon },
        { [`& .${Fe.deleteIcon}`]: t[`deleteIcon${Q(l)}`] },
        { [`& .${Fe.deleteIcon}`]: t[`deleteIconColor${Q(r)}`] },
        { [`& .${Fe.deleteIcon}`]: t[`deleteIcon${Q(c)}Color${Q(r)}`] },
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
            { marginLeft: 5, marginRight: -6 },
            t.size === 'small' && { fontSize: 18, marginLeft: 4, marginRight: -4 },
            t.iconColor === t.color &&
              g(
                { color: e.vars ? e.vars.palette.Chip.defaultIconColor : r },
                t.color !== 'default' && { color: 'inherit' },
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
          [`&.${Fe.focusVisible}`]: {
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
            [`&.${Fe.focusVisible}`]: { backgroundColor: (e.vars || e).palette[t.color].dark },
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
          [`&.${Fe.focusVisible}`]: {
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
          [`&.${Fe.clickable}:hover`]: { backgroundColor: (e.vars || e).palette.action.hover },
          [`&.${Fe.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
          [`& .${Fe.avatar}`]: { marginLeft: 4 },
          [`& .${Fe.avatarSmall}`]: { marginLeft: 2 },
          [`& .${Fe.icon}`]: { marginLeft: 4 },
          [`& .${Fe.iconSmall}`]: { marginLeft: 2 },
          [`& .${Fe.deleteIcon}`]: { marginRight: 5 },
          [`& .${Fe.deleteIconSmall}`]: { marginRight: 3 },
        },
        t.variant === 'outlined' &&
          t.color !== 'default' && {
            color: (e.vars || e).palette[t.color].main,
            border: `1px solid ${
              e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : Ze(e.palette[t.color].main, 0.7)
            }`,
            [`&.${Fe.clickable}:hover`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : Ze(e.palette[t.color].main, e.palette.action.hoverOpacity),
            },
            [`&.${Fe.focusVisible}`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.focusOpacity
                  })`
                : Ze(e.palette[t.color].main, e.palette.action.focusOpacity),
            },
            [`& .${Fe.deleteIcon}`]: {
              color: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : Ze(e.palette[t.color].main, 0.7),
              '&:hover, &:active': { color: (e.vars || e).palette[t.color].main },
            },
          },
      ),
  ),
  Fg = pe('span', {
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
      e.size === 'small' && { paddingLeft: 8, paddingRight: 8 },
    ),
  );
function js(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const Oc = x.forwardRef(function (t, o) {
  const r = Be({ props: t, name: 'MuiChip' }),
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
    f = Ce(r, Ag),
    w = x.useRef(null),
    k = pt(w, o),
    V = (G) => {
      G.stopPropagation(), v && v(G);
    },
    L = (G) => {
      G.currentTarget === G.target && js(G) && G.preventDefault(), h && h(G);
    },
    D = (G) => {
      G.currentTarget === G.target &&
        (v && js(G) ? v(G) : G.key === 'Escape' && w.current && w.current.blur()),
        m && m(G);
    },
    _ = s !== !1 && y ? !0 : s,
    Y = _ || v ? no : c || 'div',
    B = g({}, r, {
      component: Y,
      disabled: d,
      size: S,
      color: l,
      iconColor: (x.isValidElement(p) && p.props.color) || l,
      onDelete: !!v,
      clickable: _,
      variant: T,
    }),
    M = Dg(B),
    F =
      Y === no
        ? g(
            { component: c || 'div', focusVisibleClassName: M.focusVisible },
            v && { disableRipple: !0 },
          )
        : {};
  let z = null;
  v &&
    (z =
      u && x.isValidElement(u)
        ? x.cloneElement(u, { className: Ee(u.props.className, M.deleteIcon), onClick: V })
        : A(Ig, { className: Ee(M.deleteIcon), onClick: V }));
  let ie = null;
  a &&
    x.isValidElement(a) &&
    (ie = x.cloneElement(a, { className: Ee(M.avatar, a.props.className) }));
  let se = null;
  return (
    p &&
      x.isValidElement(p) &&
      (se = x.cloneElement(p, { className: Ee(M.icon, p.props.className) })),
    process.env.NODE_ENV !== 'production' &&
      ie &&
      se &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    et(
      Lg,
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
        { children: [ie || se, A(Fg, { className: Ee(M.label), ownerState: B, children: b }), z] },
      ),
    )
  );
});
process.env.NODE_ENV !== 'production' &&
  (Oc.propTypes = {
    avatar: n.element,
    children: sd,
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
const jg = Oc;
function so({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, a) => ((r[a] = e[a]), o && typeof e[a] > 'u' && (r[a] = o[a]), r), {});
}
const Tc = x.createContext(void 0);
process.env.NODE_ENV !== 'production' && (Tc.displayName = 'FormControlContext');
const ni = Tc;
function Ln() {
  return x.useContext(ni);
}
function Sc(e) {
  return A(zl, g({}, e, { defaultTheme: Pr }));
}
process.env.NODE_ENV !== 'production' &&
  (Sc.propTypes = {
    styles: n.oneOfType([
      n.func,
      n.number,
      n.object,
      n.shape({ __emotion_styles: n.any.isRequired }),
      n.string,
      n.bool,
    ]),
  });
function Vs(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function oi(e, t = !1) {
  return (
    e && ((Vs(e.value) && e.value !== '') || (t && Vs(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Vg(e) {
  return e.startAdornment;
}
function zg(e) {
  return De('MuiInputBase', e);
}
const Bg = Ie('MuiInputBase', [
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
  Pt = Bg,
  Ug = [
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
  Dr = (e, t) => {
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
  Lr = (e, t) => {
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
  Wg = (e) => {
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
    return je(h, zg, t);
  },
  Fr = pe('div', { name: 'MuiInputBase', slot: 'Root', overridesResolver: Dr })(
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
  jr = pe('input', { name: 'MuiInputBase', slot: 'Input', overridesResolver: Lr })(
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
        a = { opacity: '0 !important' },
        i = e.vars ? { opacity: e.vars.opacity.inputPlaceholder } : { opacity: o ? 0.42 : 0.5 };
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
            '&::-webkit-input-placeholder': a,
            '&::-moz-placeholder': a,
            '&:-ms-input-placeholder': a,
            '&::-ms-input-placeholder': a,
            '&:focus::-webkit-input-placeholder': i,
            '&:focus::-moz-placeholder': i,
            '&:focus:-ms-input-placeholder': i,
            '&:focus::-ms-input-placeholder': i,
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
  Hg = A(Sc, {
    styles: {
      '@keyframes mui-auto-fill': { from: { display: 'block' } },
      '@keyframes mui-auto-fill-cancel': { from: { display: 'block' } },
    },
  }),
  wc = x.forwardRef(function (t, o) {
    var r;
    const a = Be({ props: t, name: 'MuiInputBase' }),
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
      H = Ce(a, Ug),
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
      ae = pt(oe, C, T.ref, J),
      [le, he] = x.useState(!1),
      re = Ln();
    process.env.NODE_ENV !== 'production' &&
      x.useEffect(() => {
        if (re) return re.registerEffect();
      }, [re]);
    const P = so({
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
          oi(fe) ? Oe && Oe() : I && I();
        },
        [Oe, I],
      );
    rn(() => {
      ne && W({ value: U });
    }, [U, W, ne]);
    const $e = (fe) => {
        if (P.disabled) {
          fe.stopPropagation();
          return;
        }
        _ && _(fe), T.onFocus && T.onFocus(fe), re && re.onFocus ? re.onFocus(fe) : he(!0);
      },
      ge = (fe) => {
        V && V(fe), T.onBlur && T.onBlur(fe), re && re.onBlur ? re.onBlur(fe) : he(!1);
      },
      tt = (fe, ...ue) => {
        if (!ne) {
          const ee = fe.target || oe.current;
          if (ee == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : En(1),
            );
          W({ value: ee.value });
        }
        T.onChange && T.onChange(fe, ...ue), L && L(fe, ...ue);
      };
    x.useEffect(() => {
      W(oe.current);
    }, []);
    const Ve = (fe) => {
      oe.current && fe.currentTarget === fe.target && oe.current.focus(), D && D(fe);
    };
    let we = S,
      Re = T;
    w &&
      we === 'input' &&
      (ie
        ? (process.env.NODE_ENV !== 'production' &&
            (f || E) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (Re = g({ type: void 0, minRows: ie, maxRows: ie }, Re)))
        : (Re = g({ type: void 0, maxRows: E, minRows: f }, Re)),
      (we = _b));
    const nt = (fe) => {
      W(fe.animationName === 'mui-auto-fill-cancel' ? oe.current : { value: 'x' });
    };
    x.useEffect(() => {
      re && re.setAdornedStart(!!R);
    }, [re, R]);
    const it = g({}, a, {
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
      Z = Wg(it),
      me = G.root || u.Root || Fr,
      ve = se.root || d.root || {},
      be = G.input || u.Input || jr;
    return (
      (Re = g({}, Re, (r = se.input) != null ? r : d.input)),
      et(x.Fragment, {
        children: [
          !y && Hg,
          et(
            me,
            g(
              {},
              ve,
              !xn(me) && { ownerState: g({}, it, ve.ownerState) },
              { ref: o, onClick: Ve },
              H,
              {
                className: Ee(Z.root, ve.className, c, F && 'MuiInputBase-readOnly'),
                children: [
                  R,
                  A(ni.Provider, {
                    value: null,
                    children: A(
                      be,
                      g(
                        {
                          ownerState: it,
                          'aria-invalid': P.error,
                          'aria-describedby': i,
                          autoComplete: s,
                          autoFocus: l,
                          defaultValue: p,
                          disabled: P.disabled,
                          id: m,
                          onAnimationStart: nt,
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
                        Re,
                        !xn(be) && { as: we, ownerState: g({}, it, Re.ownerState) },
                        {
                          ref: ae,
                          className: Ee(Z.input, Re.className, F && 'MuiInputBase-readOnly'),
                          onBlur: ge,
                          onChange: tt,
                          onFocus: $e,
                        },
                      ),
                    ),
                  }),
                  v,
                  z ? z(g({}, P, { startAdornment: R })) : null,
                ],
              },
            ),
          ),
        ],
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (wc.propTypes = {
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
    inputComponent: Sa,
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
const ri = wc;
function qg(e) {
  return De('MuiInput', e);
}
const Yg = g({}, Pt, Ie('MuiInput', ['root', 'underline', 'input'])),
  yn = Yg;
function Kg(e) {
  return De('MuiOutlinedInput', e);
}
const Gg = g({}, Pt, Ie('MuiOutlinedInput', ['root', 'notchedOutline', 'input'])),
  Qt = Gg;
function Xg(e) {
  return De('MuiFilledInput', e);
}
const Jg = g({}, Pt, Ie('MuiFilledInput', ['root', 'underline', 'input'])),
  It = Jg,
  kc = io(A('path', { d: 'M7 10l5 5 5-5z' }), 'ArrowDropDown');
function Zg(e) {
  return De('MuiAutocomplete', e);
}
const Qg = Ie('MuiAutocomplete', [
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
  Pe = Qg;
var zs, Bs;
const ev = [
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
  tv = (e) => {
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
    return je(p, Zg, t);
  },
  nv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: a, hasPopupIcon: i, inputFocused: s, size: l } = o;
      return [
        { [`& .${Pe.tag}`]: t.tag },
        { [`& .${Pe.tag}`]: t[`tagSize${Q(l)}`] },
        { [`& .${Pe.inputRoot}`]: t.inputRoot },
        { [`& .${Pe.input}`]: t.input },
        { [`& .${Pe.input}`]: s && t.inputFocused },
        t.root,
        r && t.fullWidth,
        i && t.hasPopupIcon,
        a && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) =>
    g(
      {
        [`&.${Pe.focused} .${Pe.clearIndicator}`]: { visibility: 'visible' },
        '@media (pointer: fine)': { [`&:hover .${Pe.clearIndicator}`]: { visibility: 'visible' } },
      },
      e.fullWidth && { width: '100%' },
      {
        [`& .${Pe.tag}`]: g(
          { margin: 3, maxWidth: 'calc(100% - 6px)' },
          e.size === 'small' && { margin: 2, maxWidth: 'calc(100% - 4px)' },
        ),
        [`& .${Pe.inputRoot}`]: {
          flexWrap: 'wrap',
          [`.${Pe.hasPopupIcon}&, .${Pe.hasClearIcon}&`]: { paddingRight: 26 + 4 },
          [`.${Pe.hasPopupIcon}.${Pe.hasClearIcon}&`]: { paddingRight: 52 + 4 },
          [`& .${Pe.input}`]: { width: 0, minWidth: 30 },
        },
        [`& .${yn.root}`]: {
          paddingBottom: 1,
          '& .MuiInput-input': { padding: '4px 4px 4px 0px' },
        },
        [`& .${yn.root}.${Pt.sizeSmall}`]: { [`& .${yn.input}`]: { padding: '2px 4px 3px 0' } },
        [`& .${Qt.root}`]: {
          padding: 9,
          [`.${Pe.hasPopupIcon}&, .${Pe.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
          [`.${Pe.hasPopupIcon}.${Pe.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
          [`& .${Pe.input}`]: { padding: '7.5px 4px 7.5px 6px' },
          [`& .${Pe.endAdornment}`]: { right: 9 },
        },
        [`& .${Qt.root}.${Pt.sizeSmall}`]: {
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 6,
          [`& .${Pe.input}`]: { padding: '2.5px 4px 2.5px 6px' },
        },
        [`& .${It.root}`]: {
          paddingTop: 19,
          paddingLeft: 8,
          [`.${Pe.hasPopupIcon}&, .${Pe.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
          [`.${Pe.hasPopupIcon}.${Pe.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
          [`& .${It.input}`]: { padding: '7px 4px' },
          [`& .${Pe.endAdornment}`]: { right: 9 },
        },
        [`& .${It.root}.${Pt.sizeSmall}`]: {
          paddingBottom: 1,
          [`& .${It.input}`]: { padding: '2.5px 4px' },
        },
        [`& .${Pt.hiddenLabel}`]: { paddingTop: 8 },
        [`& .${It.root}.${Pt.hiddenLabel}`]: {
          paddingTop: 0,
          paddingBottom: 0,
          [`& .${Pe.input}`]: { paddingTop: 16, paddingBottom: 17 },
        },
        [`& .${It.root}.${Pt.hiddenLabel}.${Pt.sizeSmall}`]: {
          [`& .${Pe.input}`]: { paddingTop: 8, paddingBottom: 9 },
        },
        [`& .${Pe.input}`]: g(
          { flexGrow: 1, textOverflow: 'ellipsis', opacity: 0 },
          e.inputFocused && { opacity: 1 },
        ),
      },
    ),
  ),
  ov = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'EndAdornment',
    overridesResolver: (e, t) => t.endAdornment,
  })({ position: 'absolute', right: 0, top: 'calc(50% - 14px)' }),
  rv = pe(xc, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({ marginRight: -2, padding: 4, visibility: 'hidden' }),
  av = pe(xc, {
    name: 'MuiAutocomplete',
    slot: 'PopupIndicator',
    overridesResolver: ({ ownerState: e }, t) =>
      g({}, t.popupIndicator, e.popupOpen && t.popupIndicatorOpen),
  })(({ ownerState: e }) =>
    g({ padding: 2, marginRight: -2 }, e.popupOpen && { transform: 'rotate(180deg)' }),
  ),
  iv = pe(Cc, {
    name: 'MuiAutocomplete',
    slot: 'Popper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`& .${Pe.option}`]: t.option },
        t.popper,
        o.disablePortal && t.popperDisablePortal,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    g({ zIndex: (e.vars || e).zIndex.modal }, t.disablePortal && { position: 'absolute' }),
  ),
  sv = pe(jo, { name: 'MuiAutocomplete', slot: 'Paper', overridesResolver: (e, t) => t.paper })(
    ({ theme: e }) => g({}, e.typography.body1, { overflow: 'auto' }),
  ),
  lv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: '14px 16px' })),
  cv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: '14px 16px' })),
  uv = pe('div', {
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
    [`& .${Pe.option}`]: {
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
      [`&.${Pe.focused}`]: {
        backgroundColor: (e.vars || e).palette.action.hover,
        '@media (hover: none)': { backgroundColor: 'transparent' },
      },
      '&[aria-disabled="true"]': {
        opacity: (e.vars || e).palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`&.${Pe.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : Ze(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${Pe.focused}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : Ze(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          '@media (hover: none)': { backgroundColor: (e.vars || e).palette.action.selected },
        },
        [`&.${Pe.focusVisible}`]: {
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
  dv = pe(Pg, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({ backgroundColor: (e.vars || e).palette.background.paper, top: -8 })),
  pv = pe('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({ padding: 0, [`& .${Pe.option}`]: { paddingLeft: 24 } }),
  Rc = x.forwardRef(function (t, o) {
    var r, a, i, s;
    const l = Be({ props: t, name: 'MuiAutocomplete' }),
      {
        autoComplete: c = !1,
        autoHighlight: u = !1,
        autoSelect: d = !1,
        blurOnSelect: p = !1,
        ChipProps: b,
        className: y,
        clearIcon: v = zs || (zs = A(Tg, { fontSize: 'small' })),
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
        getLimitTagsText: F = (Me) => `+${Me}`,
        getOptionLabel: z = (Me) => {
          var dt;
          return (dt = Me.label) != null ? dt : Me;
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
        PaperComponent: le = jo,
        PopperComponent: he = Cc,
        popupIcon: re = Bs || (Bs = A(kc, {})),
        readOnly: P = !1,
        renderGroup: Oe,
        renderInput: I,
        renderOption: W,
        renderTags: $e,
        selectOnFocus: ge = !l.freeSolo,
        size: tt = 'medium',
        slotProps: Ve = {},
      } = l,
      we = Ce(l, ev),
      {
        getRootProps: Re,
        getInputProps: nt,
        getInputLabelProps: it,
        getPopupIndicatorProps: Z,
        getClearProps: me,
        getTagProps: ve,
        getListboxProps: be,
        getOptionProps: fe,
        value: ue,
        dirty: ee,
        expanded: ye,
        id: xe,
        popupOpen: _e,
        focused: st,
        focusedTag: mt,
        anchorEl: St,
        setAnchorEl: hn,
        inputValue: wt,
        groupedOptions: gt,
      } = Lb(g({}, l, { componentName: 'Autocomplete' })),
      Et = !f && !k && ee && !P,
      ht = (!B || Y === !0) && Y !== !1,
      ot = g({}, l, {
        disablePortal: D,
        expanded: ye,
        focused: st,
        fullWidth: M,
        hasClearIcon: Et,
        hasPopupIcon: ht,
        inputFocused: mt === -1,
        popupOpen: _e,
        size: tt,
      }),
      rt = tv(ot);
    let bt;
    if (ne && ue.length > 0) {
      const Me = (dt) => g({ className: rt.tag, disabled: k }, ve(dt));
      $e
        ? (bt = $e(ue, Me, ot))
        : (bt = ue.map((dt, Dt) => A(jg, g({ label: z(dt), size: tt }, Me({ index: Dt }), b))));
    }
    if (R > -1 && Array.isArray(bt)) {
      const Me = bt.length - R;
      !st &&
        Me > 0 &&
        ((bt = bt.splice(0, R)),
        bt.push(A('span', { className: rt.tag, children: F(Me) }, bt.length)));
    }
    const Jt =
        Oe ||
        ((Me) =>
          et(
            'li',
            {
              children: [
                A(dv, {
                  className: rt.groupLabel,
                  ownerState: ot,
                  component: 'div',
                  children: Me.group,
                }),
                A(pv, { className: rt.groupUl, ownerState: ot, children: Me.children }),
              ],
            },
            Me.key,
          )),
      Ut = W || ((Me, dt) => A('li', g({}, Me, { children: z(dt) }))),
      ln = (Me, dt) => {
        const Dt = fe({ option: Me, index: dt });
        return Ut(g({}, Dt, { className: rt.option }), Me, {
          selected: Dt['aria-selected'],
          index: dt,
          inputValue: wt,
        });
      },
      cn = (r = Ve.clearIndicator) != null ? r : C.clearIndicator,
      un = (a = Ve.paper) != null ? a : C.paper,
      Zt = (i = Ve.popper) != null ? i : C.popper,
      dn = (s = Ve.popupIndicator) != null ? s : C.popupIndicator;
    return et(x.Fragment, {
      children: [
        A(
          nv,
          g({ ref: o, className: Ee(rt.root, y), ownerState: ot }, Re(we), {
            children: I({
              id: xe,
              disabled: k,
              fullWidth: !0,
              size: tt === 'small' ? 'small' : void 0,
              InputLabelProps: it(),
              InputProps: g(
                { ref: hn, className: rt.inputRoot, startAdornment: bt },
                (Et || ht) && {
                  endAdornment: et(ov, {
                    className: rt.endAdornment,
                    ownerState: ot,
                    children: [
                      Et
                        ? A(
                            rv,
                            g({}, me(), { 'aria-label': S, title: S, ownerState: ot }, cn, {
                              className: Ee(rt.clearIndicator, cn == null ? void 0 : cn.className),
                              children: v,
                            }),
                          )
                        : null,
                      ht
                        ? A(
                            av,
                            g(
                              {},
                              Z(),
                              {
                                disabled: k,
                                'aria-label': _e ? T : ae,
                                title: _e ? T : ae,
                                ownerState: ot,
                              },
                              dn,
                              {
                                className: Ee(
                                  rt.popupIndicator,
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
              inputProps: g({ className: rt.input, disabled: k, readOnly: P }, nt()),
            }),
          }),
        ),
        St
          ? A(
              iv,
              g(
                {
                  as: he,
                  disablePortal: D,
                  style: { width: St ? St.clientWidth : null },
                  ownerState: ot,
                  role: 'presentation',
                  anchorEl: St,
                  open: _e,
                },
                Zt,
                {
                  className: Ee(rt.popper, Zt == null ? void 0 : Zt.className),
                  children: et(
                    sv,
                    g({ ownerState: ot, as: le }, un, {
                      className: Ee(rt.paper, un == null ? void 0 : un.className),
                      children: [
                        H && gt.length === 0
                          ? A(lv, { className: rt.loading, ownerState: ot, children: U })
                          : null,
                        gt.length === 0 && !B && !H
                          ? A(cv, {
                              className: rt.noOptions,
                              ownerState: ot,
                              role: 'presentation',
                              onMouseDown: (Me) => {
                                Me.preventDefault();
                              },
                              children: oe,
                            })
                          : null,
                        gt.length > 0
                          ? A(
                              uv,
                              g({ as: j, className: rt.listbox, ownerState: ot }, be(), X, {
                                children: gt.map((Me, dt) =>
                                  ie
                                    ? Jt({
                                        key: Me.key,
                                        group: Me.group,
                                        children: Me.options.map((Dt, O) => ln(Dt, Me.index + O)),
                                      })
                                    : ln(Me, dt),
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
  (Rc.propTypes = {
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
    limitTags: ka,
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
const fv = Rc,
  mv = [
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
  hv = { entering: { opacity: 1 }, entered: { opacity: 1 } },
  Nc = x.forwardRef(function (t, o) {
    const r = ao(),
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
        TransitionComponent: T = fc,
      } = t,
      C = Ce(t, mv),
      E = x.useRef(null),
      f = pt(E, l.ref, o),
      w = (M) => (F) => {
        if (M) {
          const z = E.current;
          F === void 0 ? M(z) : M(z, F);
        }
      },
      k = w(b),
      V = w((M, F) => {
        mc(M);
        const z = dr({ style: m, timeout: S, easing: c }, { mode: 'enter' });
        (M.style.webkitTransition = r.transitions.create('opacity', z)),
          (M.style.transition = r.transitions.create('opacity', z)),
          d && d(M, F);
      }),
      L = w(p),
      D = w(h),
      _ = w((M) => {
        const F = dr({ style: m, timeout: S, easing: c }, { mode: 'exit' });
        (M.style.webkitTransition = r.transitions.create('opacity', F)),
          (M.style.transition = r.transitions.create('opacity', F)),
          y && y(M);
      }),
      Y = w(v);
    return A(
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
            x.cloneElement(
              l,
              g(
                {
                  style: g(
                    { opacity: 0, visibility: M === 'exited' && !u ? 'hidden' : void 0 },
                    hv[M],
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
  (Nc.propTypes = {
    addEndListener: n.func,
    appear: n.bool,
    children: oo.isRequired,
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
const bv = Nc;
function gv(e) {
  return De('MuiBackdrop', e);
}
Ie('MuiBackdrop', ['root', 'invisible']);
const vv = [
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
  yv = (e) => {
    const { classes: t, invisible: o } = e;
    return je({ root: ['root', o && 'invisible'] }, gv, t);
  },
  xv = pe('div', {
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
  $c = x.forwardRef(function (t, o) {
    var r, a, i;
    const s = Be({ props: t, name: 'MuiBackdrop' }),
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
        TransitionComponent: m = bv,
        transitionDuration: S,
      } = s,
      T = Ce(s, vv),
      C = g({}, s, { component: u, invisible: b }),
      E = yv(C),
      f = (r = v.root) != null ? r : p.root;
    return A(
      m,
      g({ in: y, timeout: S }, T, {
        children: A(
          xv,
          g({ 'aria-hidden': !0 }, f, {
            as: (a = (i = h.root) != null ? i : d.Root) != null ? a : u,
            className: Ee(E.root, c, f == null ? void 0 : f.className),
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
  ($c.propTypes = {
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
const Ev = $c;
function Cv(e) {
  return De('MuiButton', e);
}
const Ov = Ie('MuiButton', [
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
  Yo = Ov,
  Pc = x.createContext({});
process.env.NODE_ENV !== 'production' && (Pc.displayName = 'ButtonGroupContext');
const Tv = Pc,
  Sv = [
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
  wv = (e) => {
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
      c = je(l, Cv, s);
    return g({}, s, c);
  },
  Ic = (e) =>
    g(
      {},
      e.size === 'small' && { '& > *:nth-of-type(1)': { fontSize: 18 } },
      e.size === 'medium' && { '& > *:nth-of-type(1)': { fontSize: 20 } },
      e.size === 'large' && { '& > *:nth-of-type(1)': { fontSize: 22 } },
    ),
  kv = pe(no, {
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
          [`&.${Yo.focusVisible}`]: g(
            {},
            t.variant === 'contained' && { boxShadow: (e.vars || e).shadows[6] },
          ),
          [`&.${Yo.disabled}`]: g(
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
        [`&.${Yo.focusVisible}`]: { boxShadow: 'none' },
        '&:active': { boxShadow: 'none' },
        [`&.${Yo.disabled}`]: { boxShadow: 'none' },
      },
  ),
  Rv = pe('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${Q(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    g(
      { display: 'inherit', marginRight: 8, marginLeft: -4 },
      e.size === 'small' && { marginLeft: -2 },
      Ic(e),
    ),
  ),
  Nv = pe('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${Q(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    g(
      { display: 'inherit', marginRight: -4, marginLeft: 8 },
      e.size === 'small' && { marginRight: -2 },
      Ic(e),
    ),
  ),
  _c = x.forwardRef(function (t, o) {
    const r = x.useContext(Tv),
      a = Ra(r, t),
      i = Be({ props: a, name: 'MuiButton' }),
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
      E = Ce(i, Sv),
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
      w = wv(f),
      k = S && A(Rv, { className: w.startIcon, ownerState: f, children: S }),
      V = y && A(Nv, { className: w.endIcon, ownerState: f, children: y });
    return et(
      kv,
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
        { classes: w, children: [k, s, V] },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (_c.propTypes = {
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
const $v = _c;
function Pv(e) {
  return De('PrivateSwitchBase', e);
}
Ie('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const Iv = [
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
  _v = (e) => {
    const { classes: t, checked: o, disabled: r, edge: a } = e,
      i = { root: ['root', o && 'checked', r && 'disabled', a && `edge${Q(a)}`], input: ['input'] };
    return je(i, Pv, t);
  },
  Mv = pe(no)(({ ownerState: e }) =>
    g(
      { padding: 9, borderRadius: '50%' },
      e.edge === 'start' && { marginLeft: e.size === 'small' ? -3 : -12 },
      e.edge === 'end' && { marginRight: e.size === 'small' ? -3 : -12 },
    ),
  ),
  Av = pe('input')({
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
  Mc = x.forwardRef(function (t, o) {
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
      V = Ce(t, Iv),
      [L, D] = In({ controlled: a, default: !!l, name: 'SwitchBase', state: 'checked' }),
      _ = Ln(),
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
      ie = g({}, t, { checked: L, disabled: F, disableFocusRipple: u, edge: d }),
      se = _v(ie);
    return et(
      Mv,
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
            A(
              Av,
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
                w === 'checkbox' && k === void 0 ? {} : { value: k },
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
  (Mc.propTypes = {
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
const Ac = Mc,
  Dv = io(
    A('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  Lv = io(
    A('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  Fv = io(
    A('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function jv(e) {
  return De('MuiCheckbox', e);
}
const Vv = Ie('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  ea = Vv,
  zv = [
    'checkedIcon',
    'color',
    'icon',
    'indeterminate',
    'indeterminateIcon',
    'inputProps',
    'size',
    'className',
  ],
  Bv = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      a = { root: ['root', o && 'indeterminate', `color${Q(r)}`] },
      i = je(a, jv, t);
    return g({}, t, i);
  },
  Uv = pe(Ac, {
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
        [`&.${ea.checked}, &.${ea.indeterminate}`]: { color: (e.vars || e).palette[t.color].main },
        [`&.${ea.disabled}`]: { color: (e.vars || e).palette.action.disabled },
      },
    ),
  ),
  Wv = A(Lv, {}),
  Hv = A(Dv, {}),
  qv = A(Fv, {}),
  Dc = x.forwardRef(function (t, o) {
    var r, a;
    const i = Be({ props: t, name: 'MuiCheckbox' }),
      {
        checkedIcon: s = Wv,
        color: l = 'primary',
        icon: c = Hv,
        indeterminate: u = !1,
        indeterminateIcon: d = qv,
        inputProps: p,
        size: b = 'medium',
        className: y,
      } = i,
      v = Ce(i, zv),
      h = u ? d : c,
      m = u ? d : s,
      S = g({}, i, { color: l, indeterminate: u, size: b }),
      T = Bv(S);
    return A(
      Uv,
      g(
        {
          type: 'checkbox',
          inputProps: g({ 'data-indeterminate': u }, p),
          icon: x.cloneElement(h, { fontSize: (r = h.props.fontSize) != null ? r : b }),
          checkedIcon: x.cloneElement(m, { fontSize: (a = m.props.fontSize) != null ? a : b }),
          ownerState: S,
          ref: o,
          className: Ee(T.root, y),
        },
        v,
        { classes: T },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Dc.propTypes = {
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
const Yv = Dc,
  Kv = [
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
  Gv = pe('div', {
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
  Xv = pe(Ev, { name: 'MuiModal', slot: 'Backdrop', overridesResolver: (e, t) => t.backdrop })({
    zIndex: -1,
  }),
  Lc = x.forwardRef(function (t, o) {
    var r, a, i, s, l, c;
    const u = Be({ name: 'MuiModal', props: t }),
      {
        BackdropComponent: d = Xv,
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
        theme: B,
      } = u,
      M = Ce(u, Kv),
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
      se = g({}, u, ie, { exited: F }),
      G = (r = (a = Y == null ? void 0 : Y.root) != null ? a : S.Root) != null ? r : Gv,
      R = (i = (s = Y == null ? void 0 : Y.backdrop) != null ? s : S.Backdrop) != null ? i : d,
      j = (l = _ == null ? void 0 : _.root) != null ? l : T.root,
      X = (c = _ == null ? void 0 : _.backdrop) != null ? c : T.backdrop;
    return A(
      Cb,
      g(
        {
          slots: { root: G, backdrop: R },
          slotProps: {
            root: () =>
              g({}, fa(j, se), !xn(G) && { as: m, theme: B }, {
                className: Ee(
                  y,
                  j == null ? void 0 : j.className,
                  b == null ? void 0 : b.root,
                  !se.open && se.exited && (b == null ? void 0 : b.hidden),
                ),
              }),
            backdrop: () =>
              g({}, p, fa(X, se), {
                className: Ee(X == null ? void 0 : X.className, b == null ? void 0 : b.backdrop),
              }),
          },
          onTransitionEnter: () => z(!1),
          onTransitionExited: () => z(!0),
          ref: o,
        },
        M,
        ie,
        { children: h },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Lc.propTypes = {
    BackdropComponent: n.elementType,
    BackdropProps: n.object,
    children: oo.isRequired,
    classes: n.object,
    className: n.string,
    closeAfterTransition: n.bool,
    component: n.elementType,
    components: n.shape({ Backdrop: n.elementType, Root: n.elementType }),
    componentsProps: n.shape({
      backdrop: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
    }),
    container: n.oneOfType([on, n.func]),
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
const Jv = Lc,
  Zv = Ie('MuiDivider', [
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
  Us = Zv,
  Qv = [
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
  ey = (e) => {
    const { classes: t, disableUnderline: o } = e,
      a = je({ root: ['root', !o && 'underline'], input: ['input'] }, Xg, t);
    return g({}, t, a);
  },
  ty = pe(Fr, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Dr(e, t), !o.disableUnderline && t.underline];
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
          '@media (hover: none)': { backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i },
        },
        [`&.${It.focused}`]: { backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i },
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
              : a
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
  ny = pe(jr, { name: 'MuiFilledInput', slot: 'Input', overridesResolver: Lr })(
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
  ai = x.forwardRef(function (t, o) {
    var r, a, i, s;
    const l = Be({ props: t, name: 'MuiFilledInput' }),
      {
        components: c = {},
        componentsProps: u,
        fullWidth: d = !1,
        inputComponent: p = 'input',
        multiline: b = !1,
        slotProps: y,
        slots: v = {},
        type: h = 'text',
      } = l,
      m = Ce(l, Qv),
      S = g({}, l, { fullWidth: d, inputComponent: p, multiline: b, type: h }),
      T = ey(l),
      C = { root: { ownerState: S }, input: { ownerState: S } },
      E = y ?? u ? jt(y ?? u, C) : C,
      f = (r = (a = v.root) != null ? a : c.Root) != null ? r : ty,
      w = (i = (s = v.input) != null ? s : c.Input) != null ? i : ny;
    return A(
      ri,
      g(
        {
          slots: { root: f, input: w },
          componentsProps: E,
          fullWidth: d,
          inputComponent: p,
          multiline: b,
          ref: o,
          type: h,
        },
        m,
        { classes: T },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ai.propTypes = {
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
ai.muiName = 'Input';
const Fc = ai;
function oy(e) {
  return De('MuiFormControl', e);
}
Ie('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const ry = [
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
  ay = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      a = { root: ['root', o !== 'none' && `margin${Q(o)}`, r && 'fullWidth'] };
    return je(a, oy, t);
  },
  iy = pe('div', {
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
  jc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiFormControl' }),
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
      S = Ce(r, ry),
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
      C = ay(T),
      [E, f] = x.useState(() => {
        let B = !1;
        return (
          a &&
            x.Children.forEach(a, (M) => {
              if (!qr(M, ['Input', 'Select'])) return;
              const F = qr(M, ['Select']) ? M.props.input : M;
              F && Vg(F.props) && (B = !0);
            }),
          B
        );
      }),
      [w, k] = x.useState(() => {
        let B = !1;
        return (
          a &&
            x.Children.forEach(a, (M) => {
              qr(M, ['Input', 'Select']) && oi(M.props, !0) && (B = !0);
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
    return A(ni.Provider, {
      value: Y,
      children: A(
        iy,
        g({ as: l, ownerState: T, className: Ee(C.root, i), ref: o }, S, { children: a }),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (jc.propTypes = {
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
const sy = jc;
function ly(e) {
  return De('MuiFormHelperText', e);
}
const cy = Ie('MuiFormHelperText', [
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
  Ws = cy;
var Hs;
const uy = [
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
  dy = (e) => {
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
    return je(u, ly, t);
  },
  py = pe('p', {
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
      { color: (e.vars || e).palette.text.secondary },
      e.typography.caption,
      {
        textAlign: 'left',
        marginTop: 3,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        [`&.${Ws.disabled}`]: { color: (e.vars || e).palette.text.disabled },
        [`&.${Ws.error}`]: { color: (e.vars || e).palette.error.main },
      },
      t.size === 'small' && { marginTop: 4 },
      t.contained && { marginLeft: 14, marginRight: 14 },
    ),
  ),
  Vc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiFormHelperText' }),
      { children: a, className: i, component: s = 'p' } = r,
      l = Ce(r, uy),
      c = Ln(),
      u = so({
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
      p = dy(d);
    return A(
      py,
      g({ as: s, ownerState: d, className: Ee(p.root, i), ref: o }, l, {
        children:
          a === ' ' ? Hs || (Hs = A('span', { className: 'notranslate', children: '​' })) : a,
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Vc.propTypes = {
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
const fy = Vc;
function my(e) {
  return De('MuiFormLabel', e);
}
const hy = Ie('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  wo = hy,
  by = [
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
  gy = (e) => {
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
    return je(c, my, t);
  },
  vy = pe('label', {
    name: 'MuiFormLabel',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      g({}, t.root, e.color === 'secondary' && t.colorSecondary, e.filled && t.filled),
  })(({ theme: e, ownerState: t }) =>
    g({ color: (e.vars || e).palette.text.secondary }, e.typography.body1, {
      lineHeight: '1.4375em',
      padding: 0,
      position: 'relative',
      [`&.${wo.focused}`]: { color: (e.vars || e).palette[t.color].main },
      [`&.${wo.disabled}`]: { color: (e.vars || e).palette.text.disabled },
      [`&.${wo.error}`]: { color: (e.vars || e).palette.error.main },
    }),
  ),
  yy = pe('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({ [`&.${wo.error}`]: { color: (e.vars || e).palette.error.main } })),
  zc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiFormLabel' }),
      { children: a, className: i, component: s = 'label' } = r,
      l = Ce(r, by),
      c = Ln(),
      u = so({
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
      p = gy(d);
    return et(
      vy,
      g({ as: s, ownerState: d, className: Ee(p.root, i), ref: o }, l, {
        children: [
          a,
          u.required &&
            et(yy, {
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
  (zc.propTypes = {
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
const Bc = zc,
  xy = [
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
function Ea(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Ey = {
    entering: { opacity: 1, transform: Ea(1) },
    entered: { opacity: 1, transform: 'none' },
  },
  ta =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  ii = x.forwardRef(function (t, o) {
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
        TransitionComponent: m = fc,
      } = t,
      S = Ce(t, xy),
      T = x.useRef(),
      C = x.useRef(),
      E = ao(),
      f = x.useRef(null),
      w = pt(f, i.ref, o),
      k = (F) => (z) => {
        if (F) {
          const ie = f.current;
          z === void 0 ? F(ie) : F(ie, z);
        }
      },
      V = k(d),
      L = k((F, z) => {
        mc(F);
        const {
          duration: ie,
          delay: se,
          easing: G,
        } = dr({ style: v, timeout: h, easing: s }, { mode: 'enter' });
        let R;
        h === 'auto'
          ? ((R = E.transitions.getAutoHeightDuration(F.clientHeight)), (C.current = R))
          : (R = ie),
          (F.style.transition = [
            E.transitions.create('opacity', { duration: R, delay: se }),
            E.transitions.create('transform', {
              duration: ta ? R : R * 0.666,
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
        } = dr({ style: v, timeout: h, easing: s }, { mode: 'exit' });
        let G;
        h === 'auto'
          ? ((G = E.transitions.getAutoHeightDuration(F.clientHeight)), (C.current = G))
          : (G = z),
          (F.style.transition = [
            E.transitions.create('opacity', { duration: G, delay: ie }),
            E.transitions.create('transform', {
              duration: ta ? G : G * 0.666,
              delay: ta ? ie : ie || G * 0.333,
              easing: se,
            }),
          ].join(',')),
          (F.style.opacity = 0),
          (F.style.transform = Ea(0.75)),
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
      A(
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
              x.cloneElement(
                i,
                g(
                  {
                    style: g(
                      {
                        opacity: 0,
                        transform: Ea(0.75),
                        visibility: F === 'exited' && !l ? 'hidden' : void 0,
                      },
                      Ey[F],
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
  (ii.propTypes = {
    addEndListener: n.func,
    appear: n.bool,
    children: oo.isRequired,
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
ii.muiSupportAuto = !0;
const Uc = ii,
  Cy = [
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
  Oy = (e) => {
    const { classes: t, disableUnderline: o } = e,
      a = je({ root: ['root', !o && 'underline'], input: ['input'] }, qg, t);
    return g({}, t, a);
  },
  Ty = pe(Fr, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Dr(e, t), !o.disableUnderline && t.underline];
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
          [`&.${yn.focused}:after`]: { transform: 'scaleX(1) translateX(0)' },
          [`&.${yn.error}`]: {
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
          [`&:hover:not(.${yn.disabled}, .${yn.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            '@media (hover: none)': { borderBottom: `1px solid ${r}` },
          },
          [`&.${yn.disabled}:before`]: { borderBottomStyle: 'dotted' },
        },
      )
    );
  }),
  Sy = pe(jr, { name: 'MuiInput', slot: 'Input', overridesResolver: Lr })({}),
  si = x.forwardRef(function (t, o) {
    var r, a, i, s;
    const l = Be({ props: t, name: 'MuiInput' }),
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
      S = Ce(l, Cy),
      T = Oy(l),
      E = { root: { ownerState: { disableUnderline: c } } },
      f = v ?? d ? jt(v ?? d, E) : E,
      w = (r = (a = h.root) != null ? a : u.Root) != null ? r : Ty,
      k = (i = (s = h.input) != null ? s : u.Input) != null ? i : Sy;
    return A(
      ri,
      g(
        {
          slots: { root: w, input: k },
          slotProps: f,
          fullWidth: p,
          inputComponent: b,
          multiline: y,
          ref: o,
          type: m,
        },
        S,
        { classes: T },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (si.propTypes = {
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
si.muiName = 'Input';
const Wc = si;
function wy(e) {
  return De('MuiInputLabel', e);
}
Ie('MuiInputLabel', [
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
const ky = ['disableAnimation', 'margin', 'shrink', 'variant', 'className'],
  Ry = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: a,
        disableAnimation: i,
        variant: s,
        required: l,
      } = e,
      u = je(
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
        wy,
        t,
      );
    return g({}, t, u);
  },
  Ny = pe(Bc, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`& .${wo.asterisk}`]: t.asterisk },
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
  Hc = x.forwardRef(function (t, o) {
    const r = Be({ name: 'MuiInputLabel', props: t }),
      { disableAnimation: a = !1, shrink: i, className: s } = r,
      l = Ce(r, ky),
      c = Ln();
    let u = i;
    typeof u > 'u' && c && (u = c.filled || c.focused || c.adornedStart);
    const d = so({ props: r, muiFormControl: c, states: ['size', 'variant', 'required'] }),
      p = g({}, r, {
        disableAnimation: a,
        formControl: c,
        shrink: u,
        size: d.size,
        variant: d.variant,
        required: d.required,
      }),
      b = Ry(p);
    return A(
      Ny,
      g({ 'data-shrink': u, ownerState: p, ref: o, className: Ee(b.root, s) }, l, { classes: b }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Hc.propTypes = {
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
const $y = Hc,
  qc = x.createContext({});
process.env.NODE_ENV !== 'production' && (qc.displayName = 'ListContext');
const Ca = qc;
function Py(e) {
  return De('MuiList', e);
}
Ie('MuiList', ['root', 'padding', 'dense', 'subheader']);
const Iy = ['children', 'className', 'component', 'dense', 'disablePadding', 'subheader'],
  _y = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: a } = e;
    return je({ root: ['root', !o && 'padding', r && 'dense', a && 'subheader'] }, Py, t);
  },
  My = pe('ul', {
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
  Yc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiList' }),
      {
        children: a,
        className: i,
        component: s = 'ul',
        dense: l = !1,
        disablePadding: c = !1,
        subheader: u,
      } = r,
      d = Ce(r, Iy),
      p = x.useMemo(() => ({ dense: l }), [l]),
      b = g({}, r, { component: s, dense: l, disablePadding: c }),
      y = _y(b);
    return A(Ca.Provider, {
      value: p,
      children: et(
        My,
        g({ as: s, className: Ee(y.root, i), ref: o, ownerState: b }, d, { children: [u, a] }),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Yc.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    dense: n.bool,
    disablePadding: n.bool,
    subheader: n.node,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const Ay = Yc,
  Dy = Ie('MuiListItemIcon', ['root', 'alignItemsFlexStart']),
  qs = Dy,
  Ly = Ie('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']),
  Ys = Ly,
  Fy = [
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
function na(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function Ks(e, t, o) {
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
function Kc(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function bo(e, t, o, r, a, i) {
  let s = !1,
    l = a(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !Kc(l, i) || c) l = a(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const Gc = x.forwardRef(function (t, o) {
  const {
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
    b = Ce(t, Fy),
    y = x.useRef(null),
    v = x.useRef({ keys: [], repeating: !0, previousKeyMatched: !0, lastTime: null });
  rn(() => {
    a && y.current.focus();
  }, [a]),
    x.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (C, E) => {
          const f = !y.current.style.width;
          if (C.clientHeight < y.current.clientHeight && f) {
            const w = `${Ol(ut(C))}px`;
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
        w = ut(E).activeElement;
      if (f === 'ArrowDown') C.preventDefault(), bo(E, w, u, c, na);
      else if (f === 'ArrowUp') C.preventDefault(), bo(E, w, u, c, Ks);
      else if (f === 'Home') C.preventDefault(), bo(E, null, u, c, na);
      else if (f === 'End') C.preventDefault(), bo(E, null, u, c, Ks);
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
        const D = w && !k.repeating && Kc(w, k);
        k.previousKeyMatched && (D || bo(E, w, !1, c, na, k))
          ? C.preventDefault()
          : (k.previousKeyMatched = !1);
      }
      d && d(C);
    },
    m = pt(y, o);
  let S = -1;
  x.Children.forEach(s, (C, E) => {
    x.isValidElement(C) &&
      (process.env.NODE_ENV !== 'production' &&
        Za.isFragment(C) &&
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
        x.cloneElement(C, f)
      );
    }
    return C;
  });
  return A(
    Ay,
    g({ role: 'menu', ref: m, className: l, onKeyDown: h, tabIndex: a ? 0 : -1 }, b, {
      children: T,
    }),
  );
});
process.env.NODE_ENV !== 'production' &&
  (Gc.propTypes = {
    autoFocus: n.bool,
    autoFocusItem: n.bool,
    children: n.node,
    className: n.string,
    disabledItemsFocusable: n.bool,
    disableListWrap: n.bool,
    onKeyDown: n.func,
    variant: n.oneOf(['menu', 'selectedMenu']),
  });
const jy = Gc;
function Vy(e) {
  return De('MuiPopover', e);
}
Ie('MuiPopover', ['root', 'paper']);
const zy = ['onEntering'],
  By = [
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
function Gs(e, t) {
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
function Xs(e, t) {
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
function Js(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function Qo(e) {
  return typeof e == 'function' ? e() : e;
}
const Uy = (e) => {
    const { classes: t } = e;
    return je({ root: ['root'], paper: ['paper'] }, Vy, t);
  },
  Wy = pe(Jv, { name: 'MuiPopover', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  Hy = pe(jo, { name: 'MuiPopover', slot: 'Paper', overridesResolver: (e, t) => t.paper })({
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    outline: 0,
  }),
  Xc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiPopover' }),
      {
        action: a,
        anchorEl: i,
        anchorOrigin: s = { vertical: 'top', horizontal: 'left' },
        anchorPosition: l,
        anchorReference: c = 'anchorEl',
        children: u,
        className: d,
        container: p,
        elevation: b = 8,
        marginThreshold: y = 16,
        open: v,
        PaperProps: h = {},
        transformOrigin: m = { vertical: 'top', horizontal: 'left' },
        TransitionComponent: S = Uc,
        transitionDuration: T = 'auto',
        TransitionProps: { onEntering: C } = {},
      } = r,
      E = Ce(r.TransitionProps, zy),
      f = Ce(r, By),
      w = x.useRef(),
      k = pt(w, h.ref),
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
      L = Uy(V),
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
        const R = Qo(i),
          j = R && R.nodeType === 1 ? R : ut(w.current).body,
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
        return { top: X.top + Gs(X, s.vertical), left: X.left + Xs(X, s.horizontal) };
      }, [i, s.horizontal, s.vertical, l, c]),
      _ = x.useCallback(
        (R) => ({ vertical: Gs(R, m.vertical), horizontal: Xs(R, m.horizontal) }),
        [m.horizontal, m.vertical],
      ),
      Y = x.useCallback(
        (R) => {
          const j = { width: R.offsetWidth, height: R.offsetHeight },
            X = _(j);
          if (c === 'none') return { top: null, left: null, transformOrigin: Js(X) };
          const H = D();
          let U = H.top - X.vertical,
            ne = H.left - X.horizontal;
          const oe = U + j.height,
            J = ne + j.width,
            ae = Mn(Qo(i)),
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
          return { top: `${Math.round(U)}px`, left: `${Math.round(ne)}px`, transformOrigin: Js(X) };
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
        const R = xl(() => {
            F();
          }),
          j = Mn(i);
        return (
          j.addEventListener('resize', R),
          () => {
            R.clear(), j.removeEventListener('resize', R);
          }
        );
      }, [i, v, F]);
    let se = T;
    T === 'auto' && !S.muiSupportAuto && (se = void 0);
    const G = p || (i ? ut(Qo(i)).body : void 0);
    return A(
      Wy,
      g(
        {
          BackdropProps: { invisible: !0 },
          className: Ee(L.root, d),
          container: G,
          open: v,
          ref: o,
          ownerState: V,
        },
        f,
        {
          children: A(
            S,
            g({ appear: !0, in: v, onEntering: z, onExited: ie, timeout: se }, E, {
              children: A(
                Hy,
                g(
                  { elevation: b },
                  h,
                  { ref: k, className: Ee(L.paper, h.className) },
                  B ? void 0 : { style: g({}, h.style, { opacity: 0 }) },
                  { ownerState: V, children: u },
                ),
              ),
            }),
          ),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Xc.propTypes = {
    action: $t,
    anchorEl: Kt(n.oneOfType([on, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = Qo(e.anchorEl);
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
    container: n.oneOfType([on, n.func]),
    elevation: ka,
    marginThreshold: n.number,
    onClose: n.func,
    open: n.bool.isRequired,
    PaperProps: n.shape({ component: Sa }),
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
const qy = Xc;
function Yy(e) {
  return De('MuiMenu', e);
}
Ie('MuiMenu', ['root', 'paper', 'list']);
const Ky = ['onEntering'],
  Gy = [
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
  Xy = { vertical: 'top', horizontal: 'right' },
  Jy = { vertical: 'top', horizontal: 'left' },
  Zy = (e) => {
    const { classes: t } = e;
    return je({ root: ['root'], paper: ['paper'], list: ['list'] }, Yy, t);
  },
  Qy = pe(qy, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  e0 = pe(jo, { name: 'MuiMenu', slot: 'Paper', overridesResolver: (e, t) => t.paper })({
    maxHeight: 'calc(100% - 96px)',
    WebkitOverflowScrolling: 'touch',
  }),
  t0 = pe(jy, { name: 'MuiMenu', slot: 'List', overridesResolver: (e, t) => t.list })({
    outline: 0,
  }),
  Jc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiMenu' }),
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
      h = Ce(r.TransitionProps, Ky),
      m = Ce(r, Gy),
      S = ao(),
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
      E = Zy(C),
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
        x.isValidElement(D) &&
          (process.env.NODE_ENV !== 'production' &&
            Za.isFragment(D) &&
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
      A(
        Qy,
        g(
          {
            onClose: c,
            anchorOrigin: { vertical: 'bottom', horizontal: T ? 'right' : 'left' },
            transformOrigin: T ? Xy : Jy,
            PaperProps: g({ as: e0 }, d, { classes: g({}, d.classes, { root: E.paper }) }),
            className: E.root,
            open: u,
            ref: o,
            transitionDuration: b,
            TransitionProps: g({ onEntering: k }, h),
            ownerState: C,
          },
          m,
          {
            classes: p,
            children: A(
              t0,
              g(
                {
                  onKeyDown: V,
                  actions: w,
                  autoFocus: a && (L === -1 || s),
                  autoFocusItem: f,
                  variant: v,
                },
                l,
                { className: Ee(E.list, l.className), children: i },
              ),
            ),
          },
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Jc.propTypes = {
    anchorEl: n.oneOfType([on, n.func]),
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
const n0 = Jc;
function o0(e) {
  return De('MuiMenuItem', e);
}
const r0 = Ie('MuiMenuItem', [
    'root',
    'focusVisible',
    'dense',
    'disabled',
    'divider',
    'gutters',
    'selected',
  ]),
  go = r0,
  a0 = [
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
  i0 = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
  },
  s0 = (e) => {
    const { disabled: t, dense: o, divider: r, disableGutters: a, selected: i, classes: s } = e,
      c = je(
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
        o0,
        s,
      );
    return g({}, s, c);
  },
  l0 = pe(no, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiMenuItem',
    slot: 'Root',
    overridesResolver: i0,
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
        [`&.${go.selected}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
            : Ze(e.palette.primary.main, e.palette.action.selectedOpacity),
          [`&.${go.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : Ze(
                  e.palette.primary.main,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        [`&.${go.selected}:hover`]: {
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
        [`&.${go.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
        [`&.${go.disabled}`]: { opacity: (e.vars || e).palette.action.disabledOpacity },
        [`& + .${Us.root}`]: { marginTop: e.spacing(1), marginBottom: e.spacing(1) },
        [`& + .${Us.inset}`]: { marginLeft: 52 },
        [`& .${Ys.root}`]: { marginTop: 0, marginBottom: 0 },
        [`& .${Ys.inset}`]: { paddingLeft: 36 },
        [`& .${qs.root}`]: { minWidth: 36 },
      },
      !t.dense && { [e.breakpoints.up('sm')]: { minHeight: 'auto' } },
      t.dense &&
        g({ minHeight: 32, paddingTop: 4, paddingBottom: 4 }, e.typography.body2, {
          [`& .${qs.root} svg`]: { fontSize: '1.25rem' },
        }),
    ),
  ),
  Zc = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiMenuItem' }),
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
      y = Ce(r, a0),
      v = x.useContext(Ca),
      h = x.useMemo(() => ({ dense: s || v.dense || !1, disableGutters: c }), [v.dense, s, c]),
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
    const S = g({}, r, { dense: h.dense, divider: l, disableGutters: c }),
      T = s0(r),
      C = pt(m, o);
    let E;
    return (
      r.disabled || (E = p !== void 0 ? p : -1),
      A(Ca.Provider, {
        value: h,
        children: A(
          l0,
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
            { ownerState: S, classes: T },
          ),
        ),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Zc.propTypes = {
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
const c0 = Zc;
function u0(e) {
  return De('MuiNativeSelect', e);
}
const d0 = Ie('MuiNativeSelect', [
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
  li = d0,
  p0 = ['className', 'disabled', 'IconComponent', 'inputRef', 'variant'],
  f0 = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: a, open: i } = e,
      s = {
        select: ['select', o, r && 'disabled', a && 'multiple'],
        icon: ['icon', `icon${Q(o)}`, i && 'iconOpen', r && 'disabled'],
      };
    return je(s, u0, t);
  },
  Qc = ({ ownerState: e, theme: t }) =>
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
        [`&.${li.disabled}`]: { cursor: 'default' },
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
  m0 = pe('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: Xt,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.select, t[o.variant], { [`&.${li.multiple}`]: t.multiple }];
    },
  })(Qc),
  eu = ({ ownerState: e, theme: t }) =>
    g(
      {
        position: 'absolute',
        right: 0,
        top: 'calc(50% - .5em)',
        pointerEvents: 'none',
        color: (t.vars || t).palette.action.active,
        [`&.${li.disabled}`]: { color: (t.vars || t).palette.action.disabled },
      },
      e.open && { transform: 'rotate(180deg)' },
      e.variant === 'filled' && { right: 7 },
      e.variant === 'outlined' && { right: 7 },
    ),
  h0 = pe('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${Q(o.variant)}`], o.open && t.iconOpen];
    },
  })(eu),
  tu = x.forwardRef(function (t, o) {
    const { className: r, disabled: a, IconComponent: i, inputRef: s, variant: l = 'standard' } = t,
      c = Ce(t, p0),
      u = g({}, t, { disabled: a, variant: l }),
      d = f0(u);
    return et(x.Fragment, {
      children: [
        A(m0, g({ ownerState: u, className: Ee(d.select, r), disabled: a, ref: s || o }, c)),
        t.multiple ? null : A(h0, { as: i, ownerState: u, className: d.icon }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (tu.propTypes = {
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
const b0 = tu;
var Zs;
const g0 = ['children', 'classes', 'className', 'label', 'notched'],
  v0 = pe('fieldset')({
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
  y0 = pe('legend')(({ ownerState: e, theme: t }) =>
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
function nu(e) {
  const { className: t, label: o, notched: r } = e,
    a = Ce(e, g0),
    i = o != null && o !== '',
    s = g({}, e, { notched: r, withLabel: i });
  return A(
    v0,
    g({ 'aria-hidden': !0, className: t, ownerState: s }, a, {
      children: A(y0, {
        ownerState: s,
        children: i
          ? A('span', { children: o })
          : Zs || (Zs = A('span', { className: 'notranslate', children: '​' })),
      }),
    }),
  );
}
process.env.NODE_ENV !== 'production' &&
  (nu.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    label: n.node,
    notched: n.bool.isRequired,
    style: n.object,
  });
const x0 = [
    'components',
    'fullWidth',
    'inputComponent',
    'label',
    'multiline',
    'notched',
    'slots',
    'type',
  ],
  E0 = (e) => {
    const { classes: t } = e,
      r = je({ root: ['root'], notchedOutline: ['notchedOutline'], input: ['input'] }, Kg, t);
    return g({}, t, r);
  },
  C0 = pe(Fr, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: Dr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return g(
      {
        position: 'relative',
        borderRadius: (e.vars || e).shape.borderRadius,
        [`&:hover .${Qt.notchedOutline}`]: { borderColor: (e.vars || e).palette.text.primary },
        '@media (hover: none)': {
          [`&:hover .${Qt.notchedOutline}`]: {
            borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
          },
        },
        [`&.${Qt.focused} .${Qt.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[t.color].main,
          borderWidth: 2,
        },
        [`&.${Qt.error} .${Qt.notchedOutline}`]: { borderColor: (e.vars || e).palette.error.main },
        [`&.${Qt.disabled} .${Qt.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.action.disabled,
        },
      },
      t.startAdornment && { paddingLeft: 14 },
      t.endAdornment && { paddingRight: 14 },
      t.multiline && g({ padding: '16.5px 14px' }, t.size === 'small' && { padding: '8.5px 14px' }),
    );
  }),
  O0 = pe(nu, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  T0 = pe(jr, { name: 'MuiOutlinedInput', slot: 'Input', overridesResolver: Lr })(
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
  ci = x.forwardRef(function (t, o) {
    var r, a, i, s, l;
    const c = Be({ props: t, name: 'MuiOutlinedInput' }),
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
      S = Ce(c, x0),
      T = E0(c),
      C = Ln(),
      E = so({ props: c, muiFormControl: C, states: ['required'] }),
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
      w = (r = (a = h.root) != null ? a : u.Root) != null ? r : C0,
      k = (i = (s = h.input) != null ? s : u.Input) != null ? i : T0;
    return A(
      ri,
      g(
        {
          slots: { root: w, input: k },
          renderSuffix: (V) =>
            A(O0, {
              ownerState: f,
              className: T.notchedOutline,
              label:
                b != null && b !== '' && E.required
                  ? l || (l = et(x.Fragment, { children: [b, ' ', '*'] }))
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
        { classes: g({}, T, { notchedOutline: null }) },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ci.propTypes = {
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
ci.muiName = 'Input';
const ou = ci;
function S0(e) {
  return De('MuiSelect', e);
}
const w0 = Ie('MuiSelect', [
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
  Ko = w0;
var Qs;
const k0 = [
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
  R0 = pe('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`&.${Ko.select}`]: t.select },
        { [`&.${Ko.select}`]: t[o.variant] },
        { [`&.${Ko.multiple}`]: t.multiple },
      ];
    },
  })(Qc, {
    [`&.${Ko.select}`]: {
      height: 'auto',
      minHeight: '1.4375em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  N0 = pe('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${Q(o.variant)}`], o.open && t.iconOpen];
    },
  })(eu),
  $0 = pe('input', {
    shouldForwardProp: (e) => Wa(e) && e !== 'classes',
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
function el(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function P0(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const I0 = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: a, open: i } = e,
      s = {
        select: ['select', o, r && 'disabled', a && 'multiple'],
        icon: ['icon', `icon${Q(o)}`, i && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return je(s, S0, t);
  },
  ru = x.forwardRef(function (t, o) {
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
      F = Ce(t, k0),
      [z, ie] = In({ controlled: B, default: d, name: 'Select' }),
      [se, G] = In({ controlled: V, default: u, name: 'Select' }),
      R = x.useRef(null),
      j = x.useRef(null),
      [X, H] = x.useState(null),
      { current: U } = x.useRef(V != null),
      [ne, oe] = x.useState(),
      J = pt(o, v),
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
        const ee = ut(j.current).getElementById(h);
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
        const ye = Oe.map((_e) => _e.props.value).indexOf(ee.target.value);
        if (ye === -1) return;
        const xe = Oe[ye];
        ie(xe.props.value), E && E(ee, xe);
      },
      W = (ee) => (ye) => {
        let xe;
        if (ye.currentTarget.hasAttribute('tabindex')) {
          if (S) {
            xe = Array.isArray(z) ? z.slice() : [];
            const _e = z.indexOf(ee.props.value);
            _e === -1 ? xe.push(ee.props.value) : xe.splice(_e, 1);
          } else xe = ee.props.value;
          if ((ee.props.onClick && ee.props.onClick(ye), z !== xe && (ie(xe), E))) {
            const _e = ye.nativeEvent || ye,
              st = new _e.constructor(_e.type, _e);
            Object.defineProperty(st, 'target', { writable: !0, value: { value: xe, name: T } }),
              E(st, ee);
          }
          S || he(!1, ye);
        }
      },
      $e = (ee) => {
        L ||
          ([' ', 'ArrowUp', 'ArrowDown', 'Enter'].indexOf(ee.key) !== -1 &&
            (ee.preventDefault(), he(!0, ee)));
      },
      ge = X !== null && se,
      tt = (ee) => {
        !ge &&
          C &&
          (Object.defineProperty(ee, 'target', { writable: !0, value: { value: z, name: T } }),
          C(ee));
      };
    delete F['aria-invalid'];
    let Ve, we;
    const Re = [];
    let nt = !1,
      it = !1;
    (oi({ value: z }) || b) && (D ? (Ve = D(z)) : (nt = !0));
    const Z = Oe.map((ee) => {
      if (!x.isValidElement(ee)) return null;
      process.env.NODE_ENV !== 'production' &&
        Za.isFragment(ee) &&
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
              : En(2),
          );
        (ye = z.some((xe) => el(xe, ee.props.value))), ye && nt && Re.push(ee.props.children);
      } else (ye = el(z, ee.props.value)), ye && nt && (we = ee.props.children);
      return (
        ye && (it = !0),
        x.cloneElement(ee, {
          'aria-selected': ye ? 'true' : 'false',
          onClick: W(ee),
          onKeyUp: (xe) => {
            xe.key === ' ' && xe.preventDefault(), ee.props.onKeyUp && ee.props.onKeyUp(xe);
          },
          role: 'option',
          selected: ye,
          value: void 0,
          'data-value': ee.props.value,
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      x.useEffect(() => {
        if (!it && !S && z !== '') {
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
      }, [it, Oe, S, T, z]),
      nt &&
        (S
          ? Re.length === 0
            ? (Ve = null)
            : (Ve = Re.reduce(
                (ee, ye, xe) => (ee.push(ye), xe < Re.length - 1 && ee.push(', '), ee),
                [],
              ))
          : (Ve = we));
    let me = ne;
    !s && U && X && (me = le.clientWidth);
    let ve;
    typeof Y < 'u' ? (ve = Y) : (ve = p ? null : 0);
    const be = _.id || (T ? `mui-component-select-${T}` : void 0),
      fe = g({}, t, { variant: M, value: z, open: ge }),
      ue = I0(fe);
    return et(x.Fragment, {
      children: [
        A(
          R0,
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
              onKeyDown: $e,
              onMouseDown: p || L ? null : re,
              onBlur: tt,
              onFocus: w,
            },
            _,
            {
              ownerState: fe,
              className: Ee(_.className, ue.select, c),
              id: be,
              children: P0(Ve)
                ? Qs || (Qs = A('span', { className: 'notranslate', children: '​' }))
                : Ve,
            },
          ),
        ),
        A(
          $0,
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
        A(N0, { as: y, className: ue.icon, ownerState: fe }),
        A(
          n0,
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
                { 'aria-labelledby': h, role: 'listbox', disableListWrap: !0 },
                m.MenuListProps,
              ),
              PaperProps: g({}, m.PaperProps, {
                style: g({ minWidth: me }, m.PaperProps != null ? m.PaperProps.style : null),
              }),
              children: Z,
            },
          ),
        ),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ru.propTypes = {
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
const _0 = ru;
var tl, nl;
const M0 = [
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
  A0 = (e) => {
    const { classes: t } = e;
    return t;
  },
  ui = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => Xt(e) && e !== 'variant',
    slot: 'Root',
  },
  D0 = pe(Wc, ui)(''),
  L0 = pe(ou, ui)(''),
  F0 = pe(Fc, ui)(''),
  di = x.forwardRef(function (t, o) {
    const r = Be({ name: 'MuiSelect', props: t }),
      {
        autoWidth: a = !1,
        children: i,
        classes: s = {},
        className: l,
        defaultOpen: c = !1,
        displayEmpty: u = !1,
        IconComponent: d = kc,
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
      L = Ce(r, M0),
      D = T ? b0 : _0,
      _ = Ln(),
      B = so({ props: r, muiFormControl: _, states: ['variant'] }).variant || V,
      M =
        b ||
        {
          standard: tl || (tl = A(D0, {})),
          outlined: A(L0, { label: v }),
          filled: nl || (nl = A(F0, {})),
        }[B],
      F = g({}, r, { variant: B, classes: s }),
      z = A0(F),
      ie = pt(o, M.ref);
    return A(x.Fragment, {
      children: x.cloneElement(
        M,
        g(
          {
            inputComponent: D,
            inputProps: g(
              { children: i, IconComponent: d, variant: B, type: void 0, multiple: S },
              T
                ? { id: p }
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
                    SelectDisplayProps: g({ id: p }, k),
                  },
              y,
              { classes: y ? jt(z, y.classes) : z },
              b ? b.props.inputProps : {},
            ),
          },
          S && T && B === 'outlined' ? { notched: !0 } : {},
          { ref: ie, className: Ee(M.props.className, l) },
          !b && { variant: B },
          L,
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (di.propTypes = {
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
di.muiName = 'Select';
const j0 = di,
  V0 = (e) => !e || !xn(e),
  z0 = V0;
function B0(e) {
  return De('MuiSlider', e);
}
const U0 = Ie('MuiSlider', [
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
  qt = U0,
  W0 = (e) => {
    const { open: t } = e;
    return {
      offset: Ee(t && qt.valueLabelOpen),
      circle: qt.valueLabelCircle,
      label: qt.valueLabelLabel,
    };
  };
function au(e) {
  const { children: t, className: o, value: r } = e,
    a = W0(e);
  return t
    ? x.cloneElement(
        t,
        { className: Ee(t.props.className) },
        et(x.Fragment, {
          children: [
            t.props.children,
            A('span', {
              className: Ee(a.offset, o),
              'aria-hidden': !0,
              children: A('span', {
                className: a.circle,
                children: A('span', { className: a.label, children: r }),
              }),
            }),
          ],
        }),
      )
    : null;
}
process.env.NODE_ENV !== 'production' &&
  (au.propTypes = { children: n.element.isRequired, className: n.string, value: n.node });
const H0 = [
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
function ol(e) {
  return e;
}
const iu = pe('span', {
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
      [`&.${qt.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        color: (e.vars || e).palette.grey[400],
      },
      [`&.${qt.dragging}`]: { [`& .${qt.thumb}, & .${qt.track}`]: { transition: 'none' } },
    },
  ),
);
process.env.NODE_ENV !== 'production' && (iu.propTypes = { children: n.node });
const su = pe('span', { name: 'MuiSlider', slot: 'Rail', overridesResolver: (e, t) => t.rail })(
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
process.env.NODE_ENV !== 'production' && (su.propTypes = { children: n.node });
const lu = pe('span', { name: 'MuiSlider', slot: 'Track', overridesResolver: (e, t) => t.track })(
  ({ theme: e, ownerState: t }) => {
    const o =
      e.palette.mode === 'light'
        ? $r(e.palette[t.color].main, 0.62)
        : Nr(e.palette[t.color].main, 0.5);
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
process.env.NODE_ENV !== 'production' && (lu.propTypes = { children: n.node });
const cu = pe('span', {
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
      [`&:hover, &.${qt.focusVisible}`]: {
        boxShadow: `0px 0px 0px 8px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : Ze(e.palette[t.color].main, 0.16)
        }`,
        '@media (hover: none)': { boxShadow: 'none' },
      },
      [`&.${qt.active}`]: {
        boxShadow: `0px 0px 0px 14px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : Ze(e.palette[t.color].main, 0.16)
        }`,
      },
      [`&.${qt.disabled}`]: { '&:hover': { boxShadow: 'none' } },
    },
  ),
);
process.env.NODE_ENV !== 'production' && (cu.propTypes = { children: n.node });
const uu = pe(au, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) =>
  g(
    {
      [`&.${qt.valueLabelOpen}`]: { transform: 'translateY(-100%) scale(1)' },
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
process.env.NODE_ENV !== 'production' && (uu.propTypes = { children: n.node });
const du = pe('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => Wa(e) && e !== 'markActive',
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
process.env.NODE_ENV !== 'production' && (du.propTypes = { children: n.node });
const pu = pe('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => Wa(e) && e !== 'markLabelActive',
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
process.env.NODE_ENV !== 'production' && (pu.propTypes = { children: n.node });
const q0 = (e) => {
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
    return je(u, B0, s);
  },
  Y0 = ({ children: e }) => e,
  fu = x.forwardRef(function (t, o) {
    var r, a, i, s, l, c, u, d, p, b, y, v, h, m, S, T, C, E, f, w, k, V, L, D;
    const _ = Be({ props: t, name: 'MuiSlider' }),
      B = ao().direction === 'rtl',
      {
        'aria-label': M,
        'aria-valuetext': F,
        'aria-labelledby': z,
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
        scale: Oe = ol,
        slotProps: I,
        slots: W,
        track: $e = 'normal',
        valueLabelDisplay: ge = 'off',
        valueLabelFormat: tt = ol,
      } = _,
      Ve = Ce(_, H0),
      we = g({}, _, {
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
        track: $e,
        valueLabelDisplay: ge,
        valueLabelFormat: tt,
      }),
      {
        axisProps: Re,
        getRootProps: nt,
        getHiddenInputProps: it,
        getThumbProps: Z,
        open: me,
        active: ve,
        axis: be,
        focusedThumbIndex: fe,
        range: ue,
        dragging: ee,
        marks: ye,
        values: xe,
        trackOffset: _e,
        trackLeap: st,
      } = Nb(g({}, we, { ref: o }));
    (we.marked = ye.length > 0 && ye.some((N) => N.label)),
      (we.dragging = ee),
      (we.focusedThumbIndex = fe);
    const mt = q0(we),
      St = (r = (a = W == null ? void 0 : W.root) != null ? a : se.Root) != null ? r : iu,
      hn = (i = (s = W == null ? void 0 : W.rail) != null ? s : se.Rail) != null ? i : su,
      wt = (l = (c = W == null ? void 0 : W.track) != null ? c : se.Track) != null ? l : lu,
      gt = (u = (d = W == null ? void 0 : W.thumb) != null ? d : se.Thumb) != null ? u : cu,
      Et =
        (p = (b = W == null ? void 0 : W.valueLabel) != null ? b : se.ValueLabel) != null ? p : uu,
      ht = (y = (v = W == null ? void 0 : W.mark) != null ? v : se.Mark) != null ? y : du,
      ot = (h = (m = W == null ? void 0 : W.markLabel) != null ? m : se.MarkLabel) != null ? h : pu,
      rt = (S = (T = W == null ? void 0 : W.input) != null ? T : se.Input) != null ? S : 'input',
      bt = (C = I == null ? void 0 : I.root) != null ? C : G.root,
      Tn = (E = I == null ? void 0 : I.rail) != null ? E : G.rail,
      Jt = (f = I == null ? void 0 : I.track) != null ? f : G.track,
      bn = (w = I == null ? void 0 : I.thumb) != null ? w : G.thumb,
      Ut = (k = I == null ? void 0 : I.valueLabel) != null ? k : G.valueLabel,
      ln = (V = I == null ? void 0 : I.mark) != null ? V : G.mark,
      cn = (L = I == null ? void 0 : I.markLabel) != null ? L : G.markLabel,
      un = (D = I == null ? void 0 : I.input) != null ? D : G.input,
      Zt = Lt({
        elementType: St,
        getSlotProps: nt,
        externalSlotProps: bt,
        externalForwardedProps: Ve,
        additionalProps: g({}, z0(St) && { as: ie }),
        ownerState: g({}, we, bt == null ? void 0 : bt.ownerState),
        className: [mt.root, X],
      }),
      dn = Lt({ elementType: hn, externalSlotProps: Tn, ownerState: we, className: mt.rail }),
      Me = Lt({
        elementType: wt,
        externalSlotProps: Jt,
        additionalProps: { style: g({}, Re[be].offset(_e), Re[be].leap(st)) },
        ownerState: g({}, we, Jt == null ? void 0 : Jt.ownerState),
        className: mt.track,
      }),
      dt = Lt({
        elementType: gt,
        getSlotProps: Z,
        externalSlotProps: bn,
        ownerState: g({}, we, bn == null ? void 0 : bn.ownerState),
        className: mt.thumb,
      }),
      Dt = Lt({
        elementType: Et,
        externalSlotProps: Ut,
        ownerState: g({}, we, Ut == null ? void 0 : Ut.ownerState),
        className: mt.valueLabel,
      }),
      O = Lt({ elementType: ht, externalSlotProps: ln, ownerState: we, className: mt.mark }),
      q = Lt({ elementType: ot, externalSlotProps: cn, ownerState: we, className: mt.markLabel }),
      ce = Lt({ elementType: rt, getSlotProps: it, externalSlotProps: un, ownerState: we });
    return et(
      St,
      g({}, Zt, {
        children: [
          A(hn, g({}, dn)),
          A(wt, g({}, Me)),
          ye
            .filter((N) => N.value >= le && N.value <= ae)
            .map((N, $) => {
              const K = cr(N.value, le, ae),
                te = Re[be].offset(K);
              let de;
              return (
                $e === !1
                  ? (de = xe.indexOf(N.value) !== -1)
                  : (de =
                      ($e === 'normal' &&
                        (ue
                          ? N.value >= xe[0] && N.value <= xe[xe.length - 1]
                          : N.value <= xe[0])) ||
                      ($e === 'inverted' &&
                        (ue
                          ? N.value <= xe[0] || N.value >= xe[xe.length - 1]
                          : N.value >= xe[0]))),
                et(
                  x.Fragment,
                  {
                    children: [
                      A(
                        ht,
                        g({ 'data-index': $ }, O, !xn(ht) && { markActive: de }, {
                          style: g({}, te, O.style),
                          className: Ee(O.className, de && mt.markActive),
                        }),
                      ),
                      N.label != null
                        ? A(
                            ot,
                            g(
                              { 'aria-hidden': !0, 'data-index': $ },
                              q,
                              !xn(ot) && { markLabelActive: de },
                              {
                                style: g({}, te, q.style),
                                className: Ee(mt.markLabel, q.className, de && mt.markLabelActive),
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
            const K = cr(N, le, ae),
              te = Re[be].offset(K),
              de = ge === 'off' ? Y0 : Et;
            return A(
              de,
              g(
                {},
                !xn(de) && {
                  valueLabelFormat: tt,
                  valueLabelDisplay: ge,
                  value: typeof tt == 'function' ? tt(Oe(N), $) : tt,
                  index: $,
                  open: me === $ || ve === $ || ge === 'on',
                  disabled: U,
                },
                Dt,
                {
                  children: A(
                    gt,
                    g({ 'data-index': $ }, dt, {
                      className: Ee(
                        mt.thumb,
                        dt.className,
                        ve === $ && mt.active,
                        fe === $ && mt.focusVisible,
                      ),
                      style: g(
                        {},
                        te,
                        { pointerEvents: H && ve !== $ ? 'none' : void 0 },
                        dt.style,
                      ),
                      children: A(
                        rt,
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
  (fu.propTypes = {
    'aria-label': Kt(n.string, (e) =>
      Array.isArray(e.value || e.defaultValue) && e['aria-label'] != null
        ? new Error(
            'MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
          )
        : null,
    ),
    'aria-labelledby': n.string,
    'aria-valuetext': Kt(n.string, (e) =>
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
const K0 = fu;
function G0(e) {
  return De('MuiSnackbarContent', e);
}
Ie('MuiSnackbarContent', ['root', 'message', 'action']);
const X0 = ['action', 'className', 'message', 'role'],
  J0 = (e) => {
    const { classes: t } = e;
    return je({ root: ['root'], action: ['action'], message: ['message'] }, G0, t);
  },
  Z0 = pe(jo, { name: 'MuiSnackbarContent', slot: 'Root', overridesResolver: (e, t) => t.root })(
    ({ theme: e }) => {
      const t = e.palette.mode === 'light' ? 0.8 : 0.98,
        o = rm(e.palette.background.default, t);
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
  Q0 = pe('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({ padding: '8px 0' }),
  ex = pe('div', {
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
  mu = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiSnackbarContent' }),
      { action: a, className: i, message: s, role: l = 'alert' } = r,
      c = Ce(r, X0),
      u = r,
      d = J0(u);
    return et(
      Z0,
      g({ role: l, square: !0, elevation: 6, className: Ee(d.root, i), ownerState: u, ref: o }, c, {
        children: [
          A(Q0, { className: d.message, ownerState: u, children: s }),
          a ? A(ex, { className: d.action, ownerState: u, children: a }) : null,
        ],
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (mu.propTypes = {
    action: n.node,
    classes: n.object,
    className: n.string,
    message: n.node,
    role: n.string,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const tx = mu;
function nx(e) {
  return De('MuiSnackbar', e);
}
Ie('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const ox = ['onEnter', 'onExited'],
  rx = [
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
  ax = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = { root: ['root', `anchorOrigin${Q(o.vertical)}${Q(o.horizontal)}`] };
    return je(r, nx, t);
  },
  rl = pe('div', {
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
  hu = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiSnackbar' }),
      a = ao(),
      i = {
        enter: a.transitions.duration.enteringScreen,
        exit: a.transitions.duration.leavingScreen,
      },
      {
        action: s,
        anchorOrigin: { vertical: l, horizontal: c } = { vertical: 'bottom', horizontal: 'left' },
        autoHideDuration: u = null,
        children: d,
        className: p,
        ClickAwayListenerProps: b,
        ContentProps: y,
        disableWindowBlurListener: v = !1,
        message: h,
        open: m,
        TransitionComponent: S = Uc,
        transitionDuration: T = i,
        TransitionProps: { onEnter: C, onExited: E } = {},
      } = r,
      f = Ce(r.TransitionProps, ox),
      w = Ce(r, rx),
      k = g({}, r, {
        anchorOrigin: { vertical: l, horizontal: c },
        autoHideDuration: u,
        disableWindowBlurListener: v,
        TransitionComponent: S,
        transitionDuration: T,
      }),
      V = ax(k),
      { getRootProps: L, onClickAway: D } = $b(g({}, k, { ref: o })),
      [_, Y] = x.useState(!0),
      B = Lt({
        elementType: rl,
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
      : A(
          rr,
          g({ onClickAway: D }, b, {
            children: A(
              rl,
              g({}, B, {
                children: A(
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
                    { children: d || A(tx, g({ message: h, action: s }, y)) },
                  ),
                ),
              }),
            ),
          }),
        );
  });
process.env.NODE_ENV !== 'production' &&
  (hu.propTypes = {
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
const ix = hu;
function sx(e) {
  return De('MuiSwitch', e);
}
const lx = Ie('MuiSwitch', [
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
  Tt = lx,
  cx = ['className', 'color', 'edge', 'size', 'sx'],
  ux = (e) => {
    const { classes: t, edge: o, size: r, color: a, checked: i, disabled: s } = e,
      l = {
        root: ['root', o && `edge${Q(o)}`, `size${Q(r)}`],
        switchBase: ['switchBase', `color${Q(a)}`, i && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = je(l, sx, t);
    return g({}, t, c);
  },
  dx = pe('span', {
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
  px = pe(Ac, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        { [`& .${Tt.input}`]: t.input },
        o.color !== 'default' && t[`color${Q(o.color)}`],
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
                      ? $r(e.palette[t.color].main, 0.62)
                      : Nr(e.palette[t.color].main, 0.55)
                  }`,
            },
          },
          [`&.${Tt.checked} + .${Tt.track}`]: {
            backgroundColor: (e.vars || e).palette[t.color].main,
          },
        },
      ),
  ),
  fx = pe('span', { name: 'MuiSwitch', slot: 'Track', overridesResolver: (e, t) => t.track })(
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
  mx = pe('span', { name: 'MuiSwitch', slot: 'Thumb', overridesResolver: (e, t) => t.thumb })(
    ({ theme: e }) => ({
      boxShadow: (e.vars || e).shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%',
    }),
  ),
  bu = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiSwitch' }),
      { className: a, color: i = 'primary', edge: s = !1, size: l = 'medium', sx: c } = r,
      u = Ce(r, cx),
      d = g({}, r, { color: i, edge: s, size: l }),
      p = ux(d),
      b = A(mx, { className: p.thumb, ownerState: d });
    return et(dx, {
      className: Ee(p.root, a),
      sx: c,
      ownerState: d,
      children: [
        A(
          px,
          g({ type: 'checkbox', icon: b, checkedIcon: b, ref: o, ownerState: d }, u, {
            classes: g({}, p, { root: p.switchBase }),
          }),
        ),
        A(fx, { className: p.track, ownerState: d }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (bu.propTypes = {
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
const hx = bu;
function bx(e) {
  return De('MuiTextField', e);
}
Ie('MuiTextField', ['root']);
const gx = [
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
  vx = { standard: Wc, filled: Fc, outlined: ou },
  yx = (e) => {
    const { classes: t } = e;
    return je({ root: ['root'] }, bx, t);
  },
  xx = pe(sy, { name: 'MuiTextField', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  gu = x.forwardRef(function (t, o) {
    const r = Be({ props: t, name: 'MuiTextField' }),
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
      R = Ce(r, gx),
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
      X = yx(j);
    process.env.NODE_ENV !== 'production' &&
      F &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const H = {};
    G === 'outlined' && (m && typeof m.shrink < 'u' && (H.notched = m.shrink), (H.label = E)),
      F && ((!z || !z.native) && (H.id = void 0), (H['aria-describedby'] = void 0));
    const U = El(h),
      ne = v && U ? `${U}-helper-text` : void 0,
      oe = E && U ? `${U}-label` : void 0,
      J = vx[G],
      ae = A(
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
    return et(
      xx,
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
            E != null && E !== '' && A($y, g({ htmlFor: U, id: oe }, m, { children: E })),
            F
              ? A(
                  j0,
                  g({ 'aria-describedby': ne, id: U, labelId: oe, value: se, input: ae }, z, {
                    children: s,
                  }),
                )
              : ae,
            v && A(fy, g({ id: ne }, b, { children: v })),
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (gu.propTypes = {
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
const vu = gu;
function Rn({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: a }) {
  return A($v, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: a,
  });
}
var $n = ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))($n || {});
function yu({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = $n.After,
  isIndeterminate: r = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const u = A(Yv, {
    checked: e,
    indeterminate: r,
    defaultChecked: a,
    disabled: i,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let d;
  if (t) {
    const p = o === $n.Before || o === $n.Above,
      b = A('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      y = o === $n.Before || o === $n.After,
      v = y ? b : A('div', { children: b }),
      h = y ? u : A('div', { children: u });
    d = et(Bc, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: i,
      error: s,
      children: [p && v, h, !p && v],
    });
  } else d = u;
  return d;
}
function xu({
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
  return A(fv, {
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
      A(vu, { ...b, error: r, fullWidth: a, disabled: t, label: e, style: { width: i } }),
  });
}
var Ex = Object.defineProperty,
  Cx = (e, t, o) =>
    t in e ? Ex(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (e[t] = o),
  Se = (e, t, o) => (Cx(e, typeof t != 'symbol' ? t + '' : t, o), o);
const Gn = class {
  static bookIdToNumber(e, t = !0) {
    return t && (e = e.toUpperCase()), e in this.bookNumbers ? this.bookNumbers[e] : 0;
  }
  static bookNumberToId(e, t = '***') {
    const o = e - 1;
    return o < 0 || o >= Gn.allBookIds.length ? t : Gn.allBookIds[o];
  }
  static bookNumberToEnglishName(e) {
    return e <= 0 || e > this.lastBook ? '******' : Gn.allBookEnglishNames[e - 1];
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
let xt = Gn;
Se(xt, 'allBookIds', [
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
  Se(xt, 'nonCanonicalIds', [
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
  Se(xt, 'firstBook', 1),
  Se(xt, 'lastBook', Gn.allBookIds.length),
  Se(xt, 'allBookEnglishNames', [
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
  Se(xt, 'bookNumbers', Gn.createBookNumbers());
var vn = ((e) => (
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
  constructor(e) {
    if (
      (Se(this, 'name'),
      Se(this, 'fullPath'),
      Se(this, 'isPresent'),
      Se(this, 'hasVerseSegments'),
      Se(this, 'isCustomized'),
      Se(this, 'baseVersification'),
      Se(this, 'scriptureBooks'),
      Se(this, '_type'),
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
let Ht = Nn;
Se(Ht, 'Original', new Nn(vn.Original)),
  Se(Ht, 'Septuagint', new Nn(vn.Septuagint)),
  Se(Ht, 'Vulgate', new Nn(vn.Vulgate)),
  Se(Ht, 'English', new Nn(vn.English)),
  Se(Ht, 'RussianProtestant', new Nn(vn.RussianProtestant)),
  Se(Ht, 'RussianOrthodox', new Nn(vn.RussianOrthodox));
function al(e, t) {
  const o = t[0];
  for (let r = 1; r < t.length; r++) e = e.split(t[r]).join(o);
  return e.split(o);
}
var Eu = ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(Eu || {});
const Le = class {
  constructor(e, t, o, r) {
    if (
      (Se(this, 'firstChapter'),
      Se(this, 'lastChapter'),
      Se(this, 'lastVerse'),
      Se(this, 'hasSegmentsDefined'),
      Se(this, 'text'),
      Se(this, 'BBBCCCVVVS'),
      Se(this, 'longHashCode'),
      Se(this, 'versification'),
      Se(this, 'rtlMark', '‏'),
      Se(this, '_bookNum', 0),
      Se(this, '_chapterNum', 0),
      Se(this, '_verseNum', 0),
      Se(this, '_verse'),
      o == null && r == null)
    )
      if (e != null && typeof e == 'string') {
        const a = e,
          i = t != null && t instanceof Ht ? t : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t == null)
        if (e != null && e instanceof Le) {
          const a = e;
          (this._bookNum = a.bookNum),
            (this._chapterNum = a.chapterNum),
            (this._verseNum = a.verseNum),
            (this._verse = a.verse),
            (this.versification = a.versification);
        } else {
          if (e == null) return;
          const a = e instanceof Ht ? e : Le.defaultVersification;
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
          (this.versification = r ?? Le.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  static parse(e, t = Le.defaultVersification) {
    const o = new Le(t);
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
      return (t = Le.parse(e)), { success: !0, verseRef: t };
    } catch (o) {
      if (o instanceof vo) return (t = new Le()), { success: !1, verseRef: t };
      throw o;
    }
  }
  static getBBBCCCVVV(e, t, o) {
    return (
      (e % Le.bcvMaxValue) * Le.bookDigitShifter +
      (t >= 0 ? (t % Le.bcvMaxValue) * Le.chapterDigitShifter : 0) +
      (o >= 0 ? o % Le.bcvMaxValue : 0)
    );
  }
  static tryGetVerseNum(e) {
    let t;
    if (!e) return (t = -1), { success: !0, vNum: t };
    t = 0;
    let o;
    for (let r = 0; r < e.length; r++) {
      if (((o = e[r]), o < '0' || o > '9')) return r === 0 && (t = -1), { success: !1, vNum: t };
      if (((t = t * 10 + +o - +'0'), t > Le.bcvMaxValue)) return (t = -1), { success: !1, vNum: t };
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
      (this._verse.includes(Le.verseRangeSeparator) ||
        this._verse.includes(Le.verseSequenceIndicator))
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
    const { success: t, vNum: o } = Le.tryGetVerseNum(e);
    (this._verse = t ? void 0 : e.replace(this.rtlMark, '')),
      (this._verseNum = o),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = Le.tryGetVerseNum(this._verse));
  }
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > xt.lastBook)
      throw new vo('BookNum must be greater than zero and less than or equal to last book');
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
    this.versification = this.versification != null ? new Ht(e) : void 0;
  }
  get valid() {
    return this.validStatus === 0;
  }
  get validStatus() {
    return this.validateVerse(Le.verseRangeSeparators, Le.verseSequenceIndicators);
  }
  get BBBCCC() {
    return Le.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  get BBBCCCVVV() {
    return Le.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  get isExcluded() {
    return !1;
  }
  parse(e) {
    if (((e = e.replace(this.rtlMark, '')), e.includes('/'))) {
      const a = e.split('/');
      if (((e = a[0]), a.length > 1))
        try {
          const i = +a[1].trim();
          this.versification = new Ht(vn[i]);
        } catch {
          throw new vo('Invalid reference : ' + e);
        }
    }
    const t = e.trim().split(' ');
    if (t.length !== 2) throw new vo('Invalid reference : ' + e);
    const o = t[1].split(':'),
      r = +o[0];
    if (
      o.length !== 2 ||
      xt.bookIdToNumber(t[0]) === 0 ||
      !Number.isInteger(r) ||
      r < 0 ||
      !Le.isVerseParseable(o[1])
    )
      throw new vo('Invalid reference : ' + e);
    this.updateInternal(t[0], o[0], o[1]);
  }
  simplify() {
    this._verse = void 0;
  }
  clone() {
    return new Le(this);
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
  allVerses(e = !1, t = Le.verseRangeSeparators, o = Le.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const r = [],
      a = al(this._verse, o);
    for (const i of a.map((s) => al(s, t))) {
      const s = this.clone();
      s.verse = i[0];
      const l = s.verseNum;
      if ((r.push(s), i.length > 1)) {
        const c = this.clone();
        if (((c.verse = i[1]), !e))
          for (let u = l + 1; u < c.verseNum; u++) {
            const d = new Le(this._bookNum, this._chapterNum, u, this.versification);
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
      const a = r.internalValid;
      if (a !== 0) return a;
      const i = r.BBBCCCVVV;
      if (o > i) return 3;
      if (o === i) return 4;
      o = i;
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
  setEmpty(e = Le.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = e);
  }
  updateInternal(e, t, o) {
    (this.bookNum = xt.bookIdToNumber(e)), (this.chapter = t), (this.verse = o);
  }
};
let fn = Le;
Se(fn, 'defaultVersification', Ht.English),
  Se(fn, 'verseRangeSeparator', '-'),
  Se(fn, 'verseSequenceIndicator', ','),
  Se(fn, 'verseRangeSeparators', [Le.verseRangeSeparator]),
  Se(fn, 'verseSequenceIndicators', [Le.verseSequenceIndicator]),
  Se(fn, 'chapterDigitShifter', 1e3),
  Se(fn, 'bookDigitShifter', Le.chapterDigitShifter * Le.chapterDigitShifter),
  Se(fn, 'bcvMaxValue', Le.chapterDigitShifter - 1),
  Se(fn, 'ValidStatusType', Eu);
class vo extends Error {}
const Cu = [
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
function il() {
  return xt.allBookIds.map((e) => ({ bookId: e, label: xt.bookIdToEnglishName(e) }));
}
function sl(e) {
  return { bookId: xt.bookNumberToId(e), label: xt.bookNumberToEnglishName(e) };
}
const Ou = 1,
  Ox = Cu.length - 1,
  Tu = 1,
  Su = 1,
  wu = (e) => {
    var t;
    return ((t = Cu[e]) == null ? void 0 : t.chapters) ?? -1;
  },
  ll = (e, t) => ({
    bookNum: Math.max(Ou, Math.min(e.bookNum + t, Ox)),
    chapterNum: 1,
    verseNum: 1,
  }),
  cl = (e, t) => ({
    ...e,
    chapterNum: Math.min(Math.max(Tu, e.chapterNum + t), wu(e.bookNum)),
    verseNum: 1,
  }),
  ul = (e, t) => ({ ...e, verseNum: Math.max(Su, e.verseNum + t) });
function pr({
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
  return A(vu, {
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
function Tx({ scrRef: e, handleSubmit: t }) {
  const [o, r] = Te.useState(sl(e.bookNum)),
    a = (c) => {
      r(sl(c.bookNum)), t(c);
    },
    i = (c, u) => {
      const p = { bookNum: xt.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
      a(p);
    },
    s = (c) => {
      t({ ...e, chapterNum: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verseNum: +c.target.value });
    };
  return et($u, {
    children: [
      A(xu, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: il(),
        onChange: i,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      A(Rn, { onClick: () => a(ll(e, -1)), isDisabled: e.bookNum <= Ou, children: '<' }),
      A(Rn, { onClick: () => a(ll(e, 1)), isDisabled: e.bookNum >= il().length, children: '>' }),
      A(pr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: s,
      }),
      A(Rn, { onClick: () => t(cl(e, -1)), isDisabled: e.chapterNum <= Tu, children: '<' }),
      A(Rn, {
        onClick: () => t(cl(e, 1)),
        isDisabled: e.chapterNum >= wu(e.bookNum),
        children: '>',
      }),
      A(pr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: l,
      }),
      A(Rn, { onClick: () => t(ul(e, -1)), isDisabled: e.verseNum <= Su, children: '<' }),
      A(Rn, { onClick: () => t(ul(e, 1)), children: '>' }),
    ],
  });
}
function Sx({
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
  return A(K0, {
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
function wx({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: a }) {
  return A(hx, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: a,
  });
}
function kx({
  autoHideDuration: e = null,
  isOpen: t = !1,
  className: o,
  onClose: r,
  anchorOrigin: a = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: i = { action: '', message: '', className: `papi-snackbar ${o ?? ''}` },
  children: s,
}) {
  return A(ix, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: a,
    ContentProps: i,
    children: s,
  });
}
function Rx({
  hasAutoFocus: e = !1,
  className: t,
  isDense: o = !1,
  hasDisabledGutters: r = !1,
  hasDivider: a = !1,
  focusVisibleClassName: i,
  onClick: s,
  children: l,
}) {
  return A(c0, {
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
function dl({ onRowChange: e, row: t, column: o }) {
  const r = (a) => {
    e({ ...t, [o.key]: a.target.value });
  };
  return A(pr, { defaultValue: t[o.key], onChange: r });
}
const Nx = ({ onChange: e, disabled: t, checked: o, ...r }) => {
  function a(i) {
    e(i.target.checked, i.nativeEvent.shiftKey);
  }
  return A(yu, { ...r, isChecked: o, isDisabled: t, onChange: a });
};
function $x({
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
  const Y = Te.useMemo(() => {
    const B = e.map((M) =>
      typeof M.editable == 'function'
        ? { ...M, editable: (z) => !!M.editable(z), renderEditCell: M.renderEditCell || dl }
        : M.editable && !M.renderEditCell
        ? { ...M, renderEditCell: dl }
        : M.renderEditCell && !M.editable
        ? { ...M, editable: !1 }
        : M,
    );
    return d ? [{ ...fi.SelectColumn, minWidth: p }, ...B] : B;
  }, [d, e]);
  return A(fi, {
    columns: Y,
    defaultColumnOptions: { width: a, minWidth: i, maxWidth: s, sortable: l, resizable: c },
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
    renderers: { renderCheckbox: Nx },
    className: `${_ ?? 'rdg-light'}`,
  });
}
exports.Button = Rn;
exports.Checkbox = yu;
exports.ComboBox = xu;
exports.LabelPosition = $n;
exports.MenuItem = Rx;
exports.RefSelector = Tx;
exports.Slider = Sx;
exports.Snackbar = kx;
exports.Switch = wx;
exports.Table = $x;
exports.TextField = pr;
function Px(e, t = 'top') {
  if (!e || typeof document > 'u') return;
  const o = document.head || document.querySelector('head'),
    r = o.querySelector(':first-child'),
    a = document.createElement('style');
  a.appendChild(document.createTextNode(e)),
    t === 'top' && r ? o.insertBefore(a, r) : o.appendChild(a);
}
Px(
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
//# sourceMappingURL=index.cjs.js.map
