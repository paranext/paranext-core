import * as E from 'react';
import Vt, {
  useLayoutEffect as du,
  forwardRef as pu,
  useContext as Co,
  createContext as nl,
  createElement as mn,
  Fragment as gi,
  useRef as fu,
  Children as mu,
  isValidElement as Bo,
  cloneElement as Uo,
  useState as hu,
  useMemo as bu,
} from 'react';
import * as ol from 'react-dom';
import Io from 'react-dom';
import vu, { SelectColumn as gu } from 'react-data-grid';
function yu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var Jr = { exports: {} },
  to = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ua;
function Eu() {
  if (ua) return to;
  ua = 1;
  var e = Vt,
    t = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    r = Object.prototype.hasOwnProperty,
    i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, c, u) {
    var d,
      p = {},
      b = null,
      g = null;
    u !== void 0 && (b = '' + u),
      c.key !== void 0 && (b = '' + c.key),
      c.ref !== void 0 && (g = c.ref);
    for (d in c) r.call(c, d) && !a.hasOwnProperty(d) && (p[d] = c[d]);
    if (l && l.defaultProps) for (d in ((c = l.defaultProps), c)) p[d] === void 0 && (p[d] = c[d]);
    return { $$typeof: t, type: l, key: b, ref: g, props: p, _owner: i.current };
  }
  return (to.Fragment = o), (to.jsx = s), (to.jsxs = s), to;
}
var no = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var da;
function xu() {
  return (
    da ||
      ((da = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Vt,
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
            b = Symbol.for('react.lazy'),
            g = Symbol.for('react.offscreen'),
            y = Symbol.iterator,
            h = '@@iterator';
          function m(T) {
            if (T === null || typeof T != 'object') return null;
            var q = (y && T[y]) || T[h];
            return typeof q == 'function' ? q : null;
          }
          var S = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function C(T) {
            {
              for (var q = arguments.length, ce = new Array(q > 1 ? q - 1 : 0), P = 1; P < q; P++)
                ce[P - 1] = arguments[P];
              O('error', T, ce);
            }
          }
          function O(T, q, ce) {
            {
              var P = S.ReactDebugCurrentFrame,
                N = P.getStackAddendum();
              N !== '' && ((q += '%s'), (ce = ce.concat([N])));
              var K = ce.map(function (te) {
                return String(te);
              });
              K.unshift('Warning: ' + q), Function.prototype.apply.call(console[T], console, K);
            }
          }
          var x = !1,
            f = !1,
            R = !1,
            w = !1,
            z = !1,
            L;
          L = Symbol.for('react.module.reference');
          function D(T) {
            return !!(
              typeof T == 'string' ||
              typeof T == 'function' ||
              T === r ||
              T === a ||
              z ||
              T === i ||
              T === u ||
              T === d ||
              w ||
              T === g ||
              x ||
              f ||
              R ||
              (typeof T == 'object' &&
                T !== null &&
                (T.$$typeof === b ||
                  T.$$typeof === p ||
                  T.$$typeof === s ||
                  T.$$typeof === l ||
                  T.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  T.$$typeof === L ||
                  T.getModuleId !== void 0))
            );
          }
          function _(T, q, ce) {
            var P = T.displayName;
            if (P) return P;
            var N = q.displayName || q.name || '';
            return N !== '' ? ce + '(' + N + ')' : ce;
          }
          function Y(T) {
            return T.displayName || 'Context';
          }
          function B(T) {
            if (T == null) return null;
            if (
              (typeof T.tag == 'number' &&
                C(
                  'Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.',
                ),
              typeof T == 'function')
            )
              return T.displayName || T.name || null;
            if (typeof T == 'string') return T;
            switch (T) {
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
            if (typeof T == 'object')
              switch (T.$$typeof) {
                case l:
                  var q = T;
                  return Y(q) + '.Consumer';
                case s:
                  var ce = T;
                  return Y(ce._context) + '.Provider';
                case c:
                  return _(T, T.render, 'ForwardRef');
                case p:
                  var P = T.displayName || null;
                  return P !== null ? P : B(T.type) || 'Memo';
                case b: {
                  var N = T,
                    K = N._payload,
                    te = N._init;
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
            V,
            ae,
            se,
            G,
            $,
            j,
            X;
          function H() {}
          H.__reactDisabledLog = !0;
          function U() {
            {
              if (F === 0) {
                (V = console.log),
                  (ae = console.info),
                  (se = console.warn),
                  (G = console.error),
                  ($ = console.group),
                  (j = console.groupCollapsed),
                  (X = console.groupEnd);
                var T = {
                  configurable: !0,
                  enumerable: !0,
                  value: H,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  info: T,
                  log: T,
                  warn: T,
                  error: T,
                  group: T,
                  groupCollapsed: T,
                  groupEnd: T,
                });
              }
              F++;
            }
          }
          function ne() {
            {
              if ((F--, F === 0)) {
                var T = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: M({}, T, {
                    value: V,
                  }),
                  info: M({}, T, {
                    value: ae,
                  }),
                  warn: M({}, T, {
                    value: se,
                  }),
                  error: M({}, T, {
                    value: G,
                  }),
                  group: M({}, T, {
                    value: $,
                  }),
                  groupCollapsed: M({}, T, {
                    value: j,
                  }),
                  groupEnd: M({}, T, {
                    value: X,
                  }),
                });
              }
              F < 0 &&
                C('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var oe = S.ReactCurrentDispatcher,
            J;
          function ie(T, q, ce) {
            {
              if (J === void 0)
                try {
                  throw Error();
                } catch (N) {
                  var P = N.stack.trim().match(/\n( *(at )?)/);
                  J = (P && P[1]) || '';
                }
              return (
                `
` +
                J +
                T
              );
            }
          }
          var le = !1,
            he;
          {
            var re = typeof WeakMap == 'function' ? WeakMap : Map;
            he = new re();
          }
          function k(T, q) {
            if (!T || le) return '';
            {
              var ce = he.get(T);
              if (ce !== void 0) return ce;
            }
            var P;
            le = !0;
            var N = Error.prepareStackTrace;
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
                  } catch (sn) {
                    P = sn;
                  }
                  Reflect.construct(T, [], te);
                } else {
                  try {
                    te.call();
                  } catch (sn) {
                    P = sn;
                  }
                  T.call(te.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (sn) {
                  P = sn;
                }
                T();
              }
            } catch (sn) {
              if (sn && P && typeof sn.stack == 'string') {
                for (
                  var de = sn.stack.split(`
`),
                    we = P.stack.split(`
`),
                    Se = de.length - 1,
                    Ie = we.length - 1;
                  Se >= 1 && Ie >= 0 && de[Se] !== we[Ie];

                )
                  Ie--;
                for (; Se >= 1 && Ie >= 0; Se--, Ie--)
                  if (de[Se] !== we[Ie]) {
                    if (Se !== 1 || Ie !== 1)
                      do
                        if ((Se--, Ie--, Ie < 0 || de[Se] !== we[Ie])) {
                          var ht =
                            `
` + de[Se].replace(' at new ', ' at ');
                          return (
                            T.displayName &&
                              ht.includes('<anonymous>') &&
                              (ht = ht.replace('<anonymous>', T.displayName)),
                            typeof T == 'function' && he.set(T, ht),
                            ht
                          );
                        }
                      while (Se >= 1 && Ie >= 0);
                    break;
                  }
              }
            } finally {
              (le = !1), (oe.current = K), ne(), (Error.prepareStackTrace = N);
            }
            var Nn = T ? T.displayName || T.name : '',
              ca = Nn ? ie(Nn) : '';
            return typeof T == 'function' && he.set(T, ca), ca;
          }
          function Te(T, q, ce) {
            return k(T, !1);
          }
          function I(T) {
            var q = T.prototype;
            return !!(q && q.isReactComponent);
          }
          function W(T, q, ce) {
            if (T == null) return '';
            if (typeof T == 'function') return k(T, I(T));
            if (typeof T == 'string') return ie(T);
            switch (T) {
              case u:
                return ie('Suspense');
              case d:
                return ie('SuspenseList');
            }
            if (typeof T == 'object')
              switch (T.$$typeof) {
                case c:
                  return Te(T.render);
                case p:
                  return W(T.type, q, ce);
                case b: {
                  var P = T,
                    N = P._payload,
                    K = P._init;
                  try {
                    return W(K(N), q, ce);
                  } catch {}
                }
              }
            return '';
          }
          var $e = Object.prototype.hasOwnProperty,
            ve = {},
            Je = S.ReactDebugCurrentFrame;
          function De(T) {
            if (T) {
              var q = T._owner,
                ce = W(T.type, T._source, q ? q.type : null);
              Je.setExtraStackFrame(ce);
            } else Je.setExtraStackFrame(null);
          }
          function Ce(T, q, ce, P, N) {
            {
              var K = Function.call.bind($e);
              for (var te in T)
                if (K(T, te)) {
                  var de = void 0;
                  try {
                    if (typeof T[te] != 'function') {
                      var we = Error(
                        (P || 'React class') +
                          ': ' +
                          ce +
                          ' type `' +
                          te +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof T[te] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((we.name = 'Invariant Violation'), we);
                    }
                    de = T[te](q, te, P, ce, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (Se) {
                    de = Se;
                  }
                  de &&
                    !(de instanceof Error) &&
                    (De(N),
                    C(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      P || 'React class',
                      ce,
                      te,
                      typeof de,
                    ),
                    De(null)),
                    de instanceof Error &&
                      !(de.message in ve) &&
                      ((ve[de.message] = !0),
                      De(N),
                      C('Failed %s type: %s', ce, de.message),
                      De(null));
                }
            }
          }
          var Re = Array.isArray;
          function Ze(T) {
            return Re(T);
          }
          function ot(T) {
            {
              var q = typeof Symbol == 'function' && Symbol.toStringTag,
                ce = (q && T[Symbol.toStringTag]) || T.constructor.name || 'Object';
              return ce;
            }
          }
          function Z(T) {
            try {
              return me(T), !1;
            } catch {
              return !0;
            }
          }
          function me(T) {
            return '' + T;
          }
          function ge(T) {
            if (Z(T))
              return (
                C(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  ot(T),
                ),
                me(T)
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
          function Ee(T) {
            if ($e.call(T, 'ref')) {
              var q = Object.getOwnPropertyDescriptor(T, 'ref').get;
              if (q && q.isReactWarning) return !1;
            }
            return T.ref !== void 0;
          }
          function Ne(T) {
            if ($e.call(T, 'key')) {
              var q = Object.getOwnPropertyDescriptor(T, 'key').get;
              if (q && q.isReactWarning) return !1;
            }
            return T.key !== void 0;
          }
          function rt(T, q) {
            if (typeof T.ref == 'string' && be.current && q && be.current.stateNode !== q) {
              var ce = B(be.current.type);
              ye[ce] ||
                (C(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  B(be.current.type),
                  T.ref,
                ),
                (ye[ce] = !0));
            }
          }
          function dt(T, q) {
            {
              var ce = function () {
                ue ||
                  ((ue = !0),
                  C(
                    '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    q,
                  ));
              };
              (ce.isReactWarning = !0),
                Object.defineProperty(T, 'key', {
                  get: ce,
                  configurable: !0,
                });
            }
          }
          function xt(T, q) {
            {
              var ce = function () {
                ee ||
                  ((ee = !0),
                  C(
                    '%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    q,
                  ));
              };
              (ce.isReactWarning = !0),
                Object.defineProperty(T, 'ref', {
                  get: ce,
                  configurable: !0,
                });
            }
          }
          var un = function (T, q, ce, P, N, K, te) {
            var de = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: T,
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
                value: P,
              }),
              Object.defineProperty(de, '_source', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: N,
              }),
              Object.freeze && (Object.freeze(de.props), Object.freeze(de)),
              de
            );
          };
          function Ot(T, q, ce, P, N) {
            {
              var K,
                te = {},
                de = null,
                we = null;
              ce !== void 0 && (ge(ce), (de = '' + ce)),
                Ne(q) && (ge(q.key), (de = '' + q.key)),
                Ee(q) && ((we = q.ref), rt(q, N));
              for (K in q) $e.call(q, K) && !fe.hasOwnProperty(K) && (te[K] = q[K]);
              if (T && T.defaultProps) {
                var Se = T.defaultProps;
                for (K in Se) te[K] === void 0 && (te[K] = Se[K]);
              }
              if (de || we) {
                var Ie = typeof T == 'function' ? T.displayName || T.name || 'Unknown' : T;
                de && dt(te, Ie), we && xt(te, Ie);
              }
              return un(T, de, we, N, P, be.current, te);
            }
          }
          var mt = S.ReactCurrentOwner,
            vt = S.ReactDebugCurrentFrame;
          function pt(T) {
            if (T) {
              var q = T._owner,
                ce = W(T.type, T._source, q ? q.type : null);
              vt.setExtraStackFrame(ce);
            } else vt.setExtraStackFrame(null);
          }
          var Qe;
          Qe = !1;
          function tt(T) {
            return typeof T == 'object' && T !== null && T.$$typeof === t;
          }
          function ft() {
            {
              if (mt.current) {
                var T = B(mt.current.type);
                if (T)
                  return (
                    `

Check the render method of \`` +
                    T +
                    '`.'
                  );
              }
              return '';
            }
          }
          function yn(T) {
            {
              if (T !== void 0) {
                var q = T.fileName.replace(/^.*[\\\/]/, ''),
                  ce = T.lineNumber;
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
          var qt = {};
          function dn(T) {
            {
              var q = ft();
              if (!q) {
                var ce = typeof T == 'string' ? T : T.displayName || T.name;
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
          function jt(T, q) {
            {
              if (!T._store || T._store.validated || T.key != null) return;
              T._store.validated = !0;
              var ce = dn(q);
              if (qt[ce]) return;
              qt[ce] = !0;
              var P = '';
              T &&
                T._owner &&
                T._owner !== mt.current &&
                (P = ' It was passed a child from ' + B(T._owner.type) + '.'),
                pt(T),
                C(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  ce,
                  P,
                ),
                pt(null);
            }
          }
          function nn(T, q) {
            {
              if (typeof T != 'object') return;
              if (Ze(T))
                for (var ce = 0; ce < T.length; ce++) {
                  var P = T[ce];
                  tt(P) && jt(P, q);
                }
              else if (tt(T)) T._store && (T._store.validated = !0);
              else if (T) {
                var N = m(T);
                if (typeof N == 'function' && N !== T.entries)
                  for (var K = N.call(T), te; !(te = K.next()).done; )
                    tt(te.value) && jt(te.value, q);
              }
            }
          }
          function on(T) {
            {
              var q = T.type;
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
                var P = B(q);
                Ce(ce, T.props, 'prop', P, T);
              } else if (q.PropTypes !== void 0 && !Qe) {
                Qe = !0;
                var N = B(q);
                C(
                  'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                  N || 'Unknown',
                );
              }
              typeof q.getDefaultProps == 'function' &&
                !q.getDefaultProps.isReactClassApproved &&
                C(
                  'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.',
                );
            }
          }
          function rn(T) {
            {
              for (var q = Object.keys(T.props), ce = 0; ce < q.length; ce++) {
                var P = q[ce];
                if (P !== 'children' && P !== 'key') {
                  pt(T),
                    C(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      P,
                    ),
                    pt(null);
                  break;
                }
              }
              T.ref !== null &&
                (pt(T), C('Invalid attribute `ref` supplied to `React.Fragment`.'), pt(null));
            }
          }
          function Yt(T, q, ce, P, N, K) {
            {
              var te = D(T);
              if (!te) {
                var de = '';
                (T === void 0 ||
                  (typeof T == 'object' && T !== null && Object.keys(T).length === 0)) &&
                  (de +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var we = yn(N);
                we ? (de += we) : (de += ft());
                var Se;
                T === null
                  ? (Se = 'null')
                  : Ze(T)
                  ? (Se = 'array')
                  : T !== void 0 && T.$$typeof === t
                  ? ((Se = '<' + (B(T.type) || 'Unknown') + ' />'),
                    (de = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (Se = typeof T),
                  C(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    Se,
                    de,
                  );
              }
              var Ie = Ot(T, q, ce, N, K);
              if (Ie == null) return Ie;
              if (te) {
                var ht = q.children;
                if (ht !== void 0)
                  if (P)
                    if (Ze(ht)) {
                      for (var Nn = 0; Nn < ht.length; Nn++) nn(ht[Nn], T);
                      Object.freeze && Object.freeze(ht);
                    } else
                      C(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else nn(ht, T);
              }
              return T === r ? rn(Ie) : on(Ie), Ie;
            }
          }
          function an(T, q, ce) {
            return Yt(T, q, ce, !0);
          }
          function ke(T, q, ce) {
            return Yt(T, q, ce, !1);
          }
          var lt = ke,
            It = an;
          (no.Fragment = r), (no.jsx = lt), (no.jsxs = It);
        })()),
    no
  );
}
process.env.NODE_ENV === 'production' ? (Jr.exports = Eu()) : (Jr.exports = xu());
var yi = Jr.exports;
const Ou = yi.Fragment,
  A = yi.jsx,
  Xe = yi.jsxs,
  Tu = {
    black: '#000',
    white: '#fff',
  },
  vo = Tu,
  Cu = {
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
  kn = Cu,
  Su = {
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
  In = Su,
  Ru = {
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
  _n = Ru,
  wu = {
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
  Mn = wu,
  $u = {
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
  An = $u,
  Pu = {
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
  oo = Pu,
  Nu = {
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
  ku = Nu;
function Wt(e, t) {
  return process.env.NODE_ENV === 'production'
    ? () => null
    : function (...r) {
        return e(...r) || t(...r);
      };
}
function v() {
  return (
    (v = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
          }
          return e;
        }),
    v.apply(this, arguments)
  );
}
function Fn(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function rl(e) {
  if (!Fn(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = rl(e[o]);
    }),
    t
  );
}
function At(
  e,
  t,
  o = {
    clone: !0,
  },
) {
  const r = o.clone ? v({}, e) : e;
  return (
    Fn(e) &&
      Fn(t) &&
      Object.keys(t).forEach((i) => {
        i !== '__proto__' &&
          (Fn(t[i]) && i in e && Fn(e[i])
            ? (r[i] = At(e[i], t[i], o))
            : o.clone
            ? (r[i] = Fn(t[i]) ? rl(t[i]) : t[i])
            : (r[i] = t[i]));
      }),
    r
  );
}
var Zr = { exports: {} },
  _o = { exports: {} },
  je = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pa;
function Iu() {
  if (pa) return je;
  pa = 1;
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
    b = e ? Symbol.for('react.suspense_list') : 60120,
    g = e ? Symbol.for('react.memo') : 60115,
    y = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    m = e ? Symbol.for('react.fundamental') : 60117,
    S = e ? Symbol.for('react.responder') : 60118,
    C = e ? Symbol.for('react.scope') : 60119;
  function O(f) {
    if (typeof f == 'object' && f !== null) {
      var R = f.$$typeof;
      switch (R) {
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
                case y:
                case g:
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
  function x(f) {
    return O(f) === u;
  }
  return (
    (je.AsyncMode = c),
    (je.ConcurrentMode = u),
    (je.ContextConsumer = l),
    (je.ContextProvider = s),
    (je.Element = t),
    (je.ForwardRef = d),
    (je.Fragment = r),
    (je.Lazy = y),
    (je.Memo = g),
    (je.Portal = o),
    (je.Profiler = a),
    (je.StrictMode = i),
    (je.Suspense = p),
    (je.isAsyncMode = function (f) {
      return x(f) || O(f) === c;
    }),
    (je.isConcurrentMode = x),
    (je.isContextConsumer = function (f) {
      return O(f) === l;
    }),
    (je.isContextProvider = function (f) {
      return O(f) === s;
    }),
    (je.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (je.isForwardRef = function (f) {
      return O(f) === d;
    }),
    (je.isFragment = function (f) {
      return O(f) === r;
    }),
    (je.isLazy = function (f) {
      return O(f) === y;
    }),
    (je.isMemo = function (f) {
      return O(f) === g;
    }),
    (je.isPortal = function (f) {
      return O(f) === o;
    }),
    (je.isProfiler = function (f) {
      return O(f) === a;
    }),
    (je.isStrictMode = function (f) {
      return O(f) === i;
    }),
    (je.isSuspense = function (f) {
      return O(f) === p;
    }),
    (je.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === u ||
        f === a ||
        f === i ||
        f === p ||
        f === b ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === y ||
            f.$$typeof === g ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === d ||
            f.$$typeof === m ||
            f.$$typeof === S ||
            f.$$typeof === C ||
            f.$$typeof === h))
      );
    }),
    (je.typeOf = O),
    je
  );
}
var ze = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fa;
function _u() {
  return (
    fa ||
      ((fa = 1),
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
            b = e ? Symbol.for('react.suspense_list') : 60120,
            g = e ? Symbol.for('react.memo') : 60115,
            y = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            m = e ? Symbol.for('react.fundamental') : 60117,
            S = e ? Symbol.for('react.responder') : 60118,
            C = e ? Symbol.for('react.scope') : 60119;
          function O(k) {
            return (
              typeof k == 'string' ||
              typeof k == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              k === r ||
              k === u ||
              k === a ||
              k === i ||
              k === p ||
              k === b ||
              (typeof k == 'object' &&
                k !== null &&
                (k.$$typeof === y ||
                  k.$$typeof === g ||
                  k.$$typeof === s ||
                  k.$$typeof === l ||
                  k.$$typeof === d ||
                  k.$$typeof === m ||
                  k.$$typeof === S ||
                  k.$$typeof === C ||
                  k.$$typeof === h))
            );
          }
          function x(k) {
            if (typeof k == 'object' && k !== null) {
              var Te = k.$$typeof;
              switch (Te) {
                case t:
                  var I = k.type;
                  switch (I) {
                    case c:
                    case u:
                    case r:
                    case a:
                    case i:
                    case p:
                      return I;
                    default:
                      var W = I && I.$$typeof;
                      switch (W) {
                        case l:
                        case d:
                        case y:
                        case g:
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
            R = u,
            w = l,
            z = s,
            L = t,
            D = d,
            _ = r,
            Y = y,
            B = g,
            M = o,
            F = a,
            V = i,
            ae = p,
            se = !1;
          function G(k) {
            return (
              se ||
                ((se = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              $(k) || x(k) === c
            );
          }
          function $(k) {
            return x(k) === u;
          }
          function j(k) {
            return x(k) === l;
          }
          function X(k) {
            return x(k) === s;
          }
          function H(k) {
            return typeof k == 'object' && k !== null && k.$$typeof === t;
          }
          function U(k) {
            return x(k) === d;
          }
          function ne(k) {
            return x(k) === r;
          }
          function oe(k) {
            return x(k) === y;
          }
          function J(k) {
            return x(k) === g;
          }
          function ie(k) {
            return x(k) === o;
          }
          function le(k) {
            return x(k) === a;
          }
          function he(k) {
            return x(k) === i;
          }
          function re(k) {
            return x(k) === p;
          }
          (ze.AsyncMode = f),
            (ze.ConcurrentMode = R),
            (ze.ContextConsumer = w),
            (ze.ContextProvider = z),
            (ze.Element = L),
            (ze.ForwardRef = D),
            (ze.Fragment = _),
            (ze.Lazy = Y),
            (ze.Memo = B),
            (ze.Portal = M),
            (ze.Profiler = F),
            (ze.StrictMode = V),
            (ze.Suspense = ae),
            (ze.isAsyncMode = G),
            (ze.isConcurrentMode = $),
            (ze.isContextConsumer = j),
            (ze.isContextProvider = X),
            (ze.isElement = H),
            (ze.isForwardRef = U),
            (ze.isFragment = ne),
            (ze.isLazy = oe),
            (ze.isMemo = J),
            (ze.isPortal = ie),
            (ze.isProfiler = le),
            (ze.isStrictMode = he),
            (ze.isSuspense = re),
            (ze.isValidElementType = O),
            (ze.typeOf = x);
        })()),
    ze
  );
}
var ma;
function il() {
  return (
    ma ||
      ((ma = 1), process.env.NODE_ENV === 'production' ? (_o.exports = Iu()) : (_o.exports = _u())),
    _o.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Mr, ha;
function Mu() {
  if (ha) return Mr;
  ha = 1;
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
    (Mr = i()
      ? Object.assign
      : function (a, s) {
          for (var l, c = r(a), u, d = 1; d < arguments.length; d++) {
            l = Object(arguments[d]);
            for (var p in l) t.call(l, p) && (c[p] = l[p]);
            if (e) {
              u = e(l);
              for (var b = 0; b < u.length; b++) o.call(l, u[b]) && (c[u[b]] = l[u[b]]);
            }
          }
          return c;
        }),
    Mr
  );
}
var Ar, ba;
function Ei() {
  if (ba) return Ar;
  ba = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Ar = e), Ar;
}
var Dr, va;
function al() {
  return va || ((va = 1), (Dr = Function.call.bind(Object.prototype.hasOwnProperty))), Dr;
}
var Lr, ga;
function Au() {
  if (ga) return Lr;
  ga = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = Ei(),
      o = {},
      r = al();
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
              var b = Error(
                (c || 'React class') +
                  ': ' +
                  l +
                  ' type `' +
                  d +
                  '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                  typeof a[d] +
                  '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
              );
              throw ((b.name = 'Invariant Violation'), b);
            }
            p = a[d](s, d, c, l, null, t);
          } catch (y) {
            p = y;
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
            var g = u ? u() : '';
            e('Failed ' + l + ' type: ' + p.message + (g ?? ''));
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
var Fr, ya;
function Du() {
  if (ya) return Fr;
  ya = 1;
  var e = il(),
    t = Mu(),
    o = Ei(),
    r = al(),
    i = Au(),
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
      var u = typeof Symbol == 'function' && Symbol.iterator,
        d = '@@iterator';
      function p($) {
        var j = $ && ((u && $[u]) || $[d]);
        if (typeof j == 'function') return j;
      }
      var b = '<<anonymous>>',
        g = {
          array: S('array'),
          bigint: S('bigint'),
          bool: S('boolean'),
          func: S('function'),
          number: S('number'),
          object: S('object'),
          string: S('string'),
          symbol: S('symbol'),
          any: C(),
          arrayOf: O,
          element: x(),
          elementType: f(),
          instanceOf: R,
          node: D(),
          objectOf: z,
          oneOf: w,
          oneOfType: L,
          shape: Y,
          exact: B,
        };
      function y($, j) {
        return $ === j ? $ !== 0 || 1 / $ === 1 / j : $ !== $ && j !== j;
      }
      function h($, j) {
        (this.message = $), (this.data = j && typeof j == 'object' ? j : {}), (this.stack = '');
      }
      h.prototype = Error.prototype;
      function m($) {
        if (process.env.NODE_ENV !== 'production')
          var j = {},
            X = 0;
        function H(ne, oe, J, ie, le, he, re) {
          if (((ie = ie || b), (he = he || J), re !== o)) {
            if (c) {
              var k = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((k.name = 'Invariant Violation'), k);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Te = ie + ':' + J;
              !j[Te] && // Avoid spamming the console because they are often not actionable except for lib authors
                X < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    he +
                    '` prop on `' +
                    ie +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (j[Te] = !0),
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
                      ('in `' + ie + '`, but its value is `null`.'),
                  )
                : new h(
                    'The ' +
                      le +
                      ' `' +
                      he +
                      '` is marked as required in ' +
                      ('`' + ie + '`, but its value is `undefined`.'),
                  )
              : null
            : $(oe, J, ie, le, he);
        }
        var U = H.bind(null, !1);
        return (U.isRequired = H.bind(null, !0)), U;
      }
      function S($) {
        function j(X, H, U, ne, oe, J) {
          var ie = X[H],
            le = V(ie);
          if (le !== $) {
            var he = ae(ie);
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type ' +
                ('`' + he + '` supplied to `' + U + '`, expected ') +
                ('`' + $ + '`.'),
              { expectedType: $ },
            );
          }
          return null;
        }
        return m(j);
      }
      function C() {
        return m(s);
      }
      function O($) {
        function j(X, H, U, ne, oe) {
          if (typeof $ != 'function')
            return new h(
              'Property `' +
                oe +
                '` of component `' +
                U +
                '` has invalid PropType notation inside arrayOf.',
            );
          var J = X[H];
          if (!Array.isArray(J)) {
            var ie = V(J);
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type ' +
                ('`' + ie + '` supplied to `' + U + '`, expected an array.'),
            );
          }
          for (var le = 0; le < J.length; le++) {
            var he = $(J, le, U, ne, oe + '[' + le + ']', o);
            if (he instanceof Error) return he;
          }
          return null;
        }
        return m(j);
      }
      function x() {
        function $(j, X, H, U, ne) {
          var oe = j[X];
          if (!l(oe)) {
            var J = V(oe);
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
        return m($);
      }
      function f() {
        function $(j, X, H, U, ne) {
          var oe = j[X];
          if (!e.isValidElementType(oe)) {
            var J = V(oe);
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
        return m($);
      }
      function R($) {
        function j(X, H, U, ne, oe) {
          if (!(X[H] instanceof $)) {
            var J = $.name || b,
              ie = G(X[H]);
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type ' +
                ('`' + ie + '` supplied to `' + U + '`, expected ') +
                ('instance of `' + J + '`.'),
            );
          }
          return null;
        }
        return m(j);
      }
      function w($) {
        if (!Array.isArray($))
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
        function j(X, H, U, ne, oe) {
          for (var J = X[H], ie = 0; ie < $.length; ie++) if (y(J, $[ie])) return null;
          var le = JSON.stringify($, function (re, k) {
            var Te = ae(k);
            return Te === 'symbol' ? String(k) : k;
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
      function z($) {
        function j(X, H, U, ne, oe) {
          if (typeof $ != 'function')
            return new h(
              'Property `' +
                oe +
                '` of component `' +
                U +
                '` has invalid PropType notation inside objectOf.',
            );
          var J = X[H],
            ie = V(J);
          if (ie !== 'object')
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type ' +
                ('`' + ie + '` supplied to `' + U + '`, expected an object.'),
            );
          for (var le in J)
            if (r(J, le)) {
              var he = $(J, le, U, ne, oe + '.' + le, o);
              if (he instanceof Error) return he;
            }
          return null;
        }
        return m(j);
      }
      function L($) {
        if (!Array.isArray($))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var j = 0; j < $.length; j++) {
          var X = $[j];
          if (typeof X != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  se(X) +
                  ' at index ' +
                  j +
                  '.',
              ),
              s
            );
        }
        function H(U, ne, oe, J, ie) {
          for (var le = [], he = 0; he < $.length; he++) {
            var re = $[he],
              k = re(U, ne, oe, J, ie, o);
            if (k == null) return null;
            k.data && r(k.data, 'expectedType') && le.push(k.data.expectedType);
          }
          var Te = le.length > 0 ? ', expected one of type [' + le.join(', ') + ']' : '';
          return new h('Invalid ' + J + ' `' + ie + '` supplied to ' + ('`' + oe + '`' + Te + '.'));
        }
        return m(H);
      }
      function D() {
        function $(j, X, H, U, ne) {
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
        return m($);
      }
      function _($, j, X, H, U) {
        return new h(
          ($ || 'React class') +
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
      function Y($) {
        function j(X, H, U, ne, oe) {
          var J = X[H],
            ie = V(J);
          if (ie !== 'object')
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type `' +
                ie +
                '` ' +
                ('supplied to `' + U + '`, expected `object`.'),
            );
          for (var le in $) {
            var he = $[le];
            if (typeof he != 'function') return _(U, ne, oe, le, ae(he));
            var re = he(J, le, U, ne, oe + '.' + le, o);
            if (re) return re;
          }
          return null;
        }
        return m(j);
      }
      function B($) {
        function j(X, H, U, ne, oe) {
          var J = X[H],
            ie = V(J);
          if (ie !== 'object')
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type `' +
                ie +
                '` ' +
                ('supplied to `' + U + '`, expected `object`.'),
            );
          var le = t({}, X[H], $);
          for (var he in le) {
            var re = $[he];
            if (r($, he) && typeof re != 'function') return _(U, ne, oe, he, ae(re));
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
                  JSON.stringify(Object.keys($), null, '  '),
              );
            var k = re(J, he, U, ne, oe + '.' + he, o);
            if (k) return k;
          }
          return null;
        }
        return m(j);
      }
      function M($) {
        switch (typeof $) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !$;
          case 'object':
            if (Array.isArray($)) return $.every(M);
            if ($ === null || l($)) return !0;
            var j = p($);
            if (j) {
              var X = j.call($),
                H;
              if (j !== $.entries) {
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
      function F($, j) {
        return $ === 'symbol'
          ? !0
          : j
          ? j['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && j instanceof Symbol)
          : !1;
      }
      function V($) {
        var j = typeof $;
        return Array.isArray($) ? 'array' : $ instanceof RegExp ? 'object' : F(j, $) ? 'symbol' : j;
      }
      function ae($) {
        if (typeof $ > 'u' || $ === null) return '' + $;
        var j = V($);
        if (j === 'object') {
          if ($ instanceof Date) return 'date';
          if ($ instanceof RegExp) return 'regexp';
        }
        return j;
      }
      function se($) {
        var j = ae($);
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
      function G($) {
        return !$.constructor || !$.constructor.name ? b : $.constructor.name;
      }
      return (
        (g.checkPropTypes = i), (g.resetWarningCache = i.resetWarningCache), (g.PropTypes = g), g
      );
    }),
    Fr
  );
}
var jr, Ea;
function Lu() {
  if (Ea) return jr;
  Ea = 1;
  var e = Ei();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (jr = function () {
      function r(s, l, c, u, d, p) {
        if (p !== e) {
          var b = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
          );
          throw ((b.name = 'Invariant Violation'), b);
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
    jr
  );
}
if (process.env.NODE_ENV !== 'production') {
  var Fu = il(),
    ju = !0;
  Zr.exports = Du()(Fu.isElement, ju);
} else Zr.exports = Lu()();
var zu = Zr.exports;
const n = /* @__PURE__ */ yu(zu);
function Vu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function sl(e, t, o, r, i) {
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
      !Vu(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const ll = Wt(n.element, sl);
ll.isRequired = Wt(n.element.isRequired, sl);
const Gn = ll;
function Bu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Uu(e, t, o, r, i) {
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
      !Bu(a) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const xi = Wt(n.elementType, Uu),
  Wu = 'exact-prop: ​';
function Oi(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : v({}, e, {
        [Wu]: (t) => {
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
function bn(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let o = 1; o < arguments.length; o += 1) t += '&args[]=' + encodeURIComponent(arguments[o]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var Qr = { exports: {} },
  Ve = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xa;
function Hu() {
  if (xa) return Ve;
  xa = 1;
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
    b = Symbol.for('react.lazy'),
    g = Symbol.for('react.offscreen'),
    y;
  y = Symbol.for('react.module.reference');
  function h(m) {
    if (typeof m == 'object' && m !== null) {
      var S = m.$$typeof;
      switch (S) {
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
                case b:
                case p:
                case a:
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
    (Ve.ContextConsumer = s),
    (Ve.ContextProvider = a),
    (Ve.Element = e),
    (Ve.ForwardRef = c),
    (Ve.Fragment = o),
    (Ve.Lazy = b),
    (Ve.Memo = p),
    (Ve.Portal = t),
    (Ve.Profiler = i),
    (Ve.StrictMode = r),
    (Ve.Suspense = u),
    (Ve.SuspenseList = d),
    (Ve.isAsyncMode = function () {
      return !1;
    }),
    (Ve.isConcurrentMode = function () {
      return !1;
    }),
    (Ve.isContextConsumer = function (m) {
      return h(m) === s;
    }),
    (Ve.isContextProvider = function (m) {
      return h(m) === a;
    }),
    (Ve.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (Ve.isForwardRef = function (m) {
      return h(m) === c;
    }),
    (Ve.isFragment = function (m) {
      return h(m) === o;
    }),
    (Ve.isLazy = function (m) {
      return h(m) === b;
    }),
    (Ve.isMemo = function (m) {
      return h(m) === p;
    }),
    (Ve.isPortal = function (m) {
      return h(m) === t;
    }),
    (Ve.isProfiler = function (m) {
      return h(m) === i;
    }),
    (Ve.isStrictMode = function (m) {
      return h(m) === r;
    }),
    (Ve.isSuspense = function (m) {
      return h(m) === u;
    }),
    (Ve.isSuspenseList = function (m) {
      return h(m) === d;
    }),
    (Ve.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === o ||
        m === i ||
        m === r ||
        m === u ||
        m === d ||
        m === g ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === b ||
            m.$$typeof === p ||
            m.$$typeof === a ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === y ||
            m.getModuleId !== void 0))
      );
    }),
    (Ve.typeOf = h),
    Ve
  );
}
var Be = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oa;
function qu() {
  return (
    Oa ||
      ((Oa = 1),
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
            b = Symbol.for('react.lazy'),
            g = Symbol.for('react.offscreen'),
            y = !1,
            h = !1,
            m = !1,
            S = !1,
            C = !1,
            O;
          O = Symbol.for('react.module.reference');
          function x(I) {
            return !!(
              typeof I == 'string' ||
              typeof I == 'function' ||
              I === o ||
              I === i ||
              C ||
              I === r ||
              I === u ||
              I === d ||
              S ||
              I === g ||
              y ||
              h ||
              m ||
              (typeof I == 'object' &&
                I !== null &&
                (I.$$typeof === b ||
                  I.$$typeof === p ||
                  I.$$typeof === a ||
                  I.$$typeof === s ||
                  I.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  I.$$typeof === O ||
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
                    case i:
                    case r:
                    case u:
                    case d:
                      return $e;
                    default:
                      var ve = $e && $e.$$typeof;
                      switch (ve) {
                        case l:
                        case s:
                        case c:
                        case b:
                        case p:
                        case a:
                          return ve;
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
            w = a,
            z = e,
            L = c,
            D = o,
            _ = b,
            Y = p,
            B = t,
            M = i,
            F = r,
            V = u,
            ae = d,
            se = !1,
            G = !1;
          function $(I) {
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
            return f(I) === a;
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
          function ie(I) {
            return f(I) === p;
          }
          function le(I) {
            return f(I) === t;
          }
          function he(I) {
            return f(I) === i;
          }
          function re(I) {
            return f(I) === r;
          }
          function k(I) {
            return f(I) === u;
          }
          function Te(I) {
            return f(I) === d;
          }
          (Be.ContextConsumer = R),
            (Be.ContextProvider = w),
            (Be.Element = z),
            (Be.ForwardRef = L),
            (Be.Fragment = D),
            (Be.Lazy = _),
            (Be.Memo = Y),
            (Be.Portal = B),
            (Be.Profiler = M),
            (Be.StrictMode = F),
            (Be.Suspense = V),
            (Be.SuspenseList = ae),
            (Be.isAsyncMode = $),
            (Be.isConcurrentMode = j),
            (Be.isContextConsumer = X),
            (Be.isContextProvider = H),
            (Be.isElement = U),
            (Be.isForwardRef = ne),
            (Be.isFragment = oe),
            (Be.isLazy = J),
            (Be.isMemo = ie),
            (Be.isPortal = le),
            (Be.isProfiler = he),
            (Be.isStrictMode = re),
            (Be.isSuspense = k),
            (Be.isSuspenseList = Te),
            (Be.isValidElementType = x),
            (Be.typeOf = f);
        })()),
    Be
  );
}
process.env.NODE_ENV === 'production' ? (Qr.exports = Hu()) : (Qr.exports = qu());
var Ta = Qr.exports;
const Yu = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Ku(e) {
  const t = `${e}`.match(Yu);
  return (t && t[1]) || '';
}
function cl(e, t = '') {
  return e.displayName || e.name || Ku(e) || t;
}
function Ca(e, t, o) {
  const r = cl(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function Gu(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return cl(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Ta.ForwardRef:
          return Ca(e, e.render, 'ForwardRef');
        case Ta.Memo:
          return Ca(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function Zt(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = e[t],
    s = i || t;
  return a == null
    ? null
    : a && a.nodeType !== 1
    ? new Error(`Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an HTMLElement.`)
    : null;
}
const Xu = n.oneOfType([n.func, n.object]),
  Rt = Xu;
function Q(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : bn(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Sa(...e) {
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
function ul(e, t = 166) {
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
  return /* @__PURE__ */ E.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function st(e) {
  return (e && e.ownerDocument) || document;
}
function Rn(e) {
  return st(e).defaultView || window;
}
function Go(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const Ju = typeof window < 'u' ? E.useLayoutEffect : E.useEffect,
  ln = Ju;
let Ra = 0;
function Zu(e) {
  const [t, o] = E.useState(e),
    r = e || t;
  return (
    E.useEffect(() => {
      t == null && ((Ra += 1), o(`mui-${Ra}`));
    }, [t]),
    r
  );
}
const wa = E['useId'];
function dl(e) {
  if (wa !== void 0) {
    const t = wa();
    return e ?? t;
  }
  return Zu(e);
}
function Qu(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = i || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${a}\` is not supported. Please remove it.`)
    : null;
}
function Cn({ controlled: e, default: t, name: o, state: r = 'value' }) {
  const { current: i } = E.useRef(e !== void 0),
    [a, s] = E.useState(t),
    l = i ? e : a;
  if (process.env.NODE_ENV !== 'production') {
    E.useEffect(() => {
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
    const { current: u } = E.useRef(t);
    E.useEffect(() => {
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
  const c = E.useCallback((u) => {
    i || s(u);
  }, []);
  return [l, c];
}
function yt(e) {
  const t = E.useRef(e);
  return (
    ln(() => {
      t.current = e;
    }),
    E.useCallback(
      (...o) =>
        // @ts-expect-error hide `this`
        // tslint:disable-next-line:ban-comma-operator
        (0, t.current)(...o),
      [],
    )
  );
}
function ut(...e) {
  return E.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              Go(o, t);
            });
          },
    e,
  );
}
let sr = !0,
  ei = !1,
  $a;
const ed = {
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
function td(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && ed[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function nd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (sr = !0);
}
function Vr() {
  sr = !1;
}
function od() {
  this.visibilityState === 'hidden' && ei && (sr = !0);
}
function rd(e) {
  e.addEventListener('keydown', nd, !0),
    e.addEventListener('mousedown', Vr, !0),
    e.addEventListener('pointerdown', Vr, !0),
    e.addEventListener('touchstart', Vr, !0),
    e.addEventListener('visibilitychange', od, !0);
}
function id(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return sr || td(t);
}
function pl() {
  const e = E.useCallback((i) => {
      i != null && rd(i.ownerDocument);
    }, []),
    t = E.useRef(!1);
  function o() {
    return t.current
      ? ((ei = !0),
        window.clearTimeout($a),
        ($a = window.setTimeout(() => {
          ei = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(i) {
    return id(i) ? ((t.current = !0), !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: o,
    ref: e,
  };
}
function fl(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const ad = (e) => {
    const t = E.useRef({});
    return (
      E.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  sd = ad,
  ld = {
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
  cd = ld;
function ud(e) {
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
function dd(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const pd = Number.isInteger || dd;
function ml(e, t, o, r) {
  const i = e[t];
  if (i == null || !pd(i)) {
    const a = ud(i);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function hl(e, t, ...o) {
  return e[t] === void 0 ? null : ml(e, t, ...o);
}
function ti() {
  return null;
}
hl.isRequired = ml;
ti.isRequired = ti;
const Ti = process.env.NODE_ENV === 'production' ? ti : hl;
function Ci(e, t) {
  const o = v({}, t);
  return (
    Object.keys(e).forEach((r) => {
      if (r.toString().match(/^(components|slots)$/)) o[r] = v({}, e[r], o[r]);
      else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
        const i = e[r] || {},
          a = t[r];
        (o[r] = {}),
          !a || !Object.keys(a)
            ? (o[r] = i)
            : !i || !Object.keys(i)
            ? (o[r] = a)
            : ((o[r] = v({}, a)),
              Object.keys(i).forEach((s) => {
                o[r][s] = Ci(i[s], a[s]);
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
const Pa = (e) => e,
  fd = () => {
    let e = Pa;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Pa;
      },
    };
  },
  md = fd(),
  hd = md,
  bd = {
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
function _e(e, t, o = 'Mui') {
  const r = bd[t];
  return r ? `${o}-${r}` : `${hd.generate(e)}-${t}`;
}
function Ae(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((i) => {
      r[i] = _e(e, i, o);
    }),
    r
  );
}
function xe(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) (i = r[a]), !(t.indexOf(i) >= 0) && (o[i] = e[i]);
  return o;
}
function bl(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var vd =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  gd = /* @__PURE__ */ bl(
    function (e) {
      return (
        vd.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
      );
    },
    /* Z+1 */
  );
function yd(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function Ed(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var xd = /* @__PURE__ */ (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Ed(this));
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
          var s = yd(i);
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
  gt = '-ms-',
  Xo = '-moz-',
  Le = '-webkit-',
  Si = 'comm',
  Ri = 'rule',
  wi = 'decl',
  Od = '@import',
  vl = '@keyframes',
  Td = Math.abs,
  lr = String.fromCharCode,
  Cd = Object.assign;
function Sd(e, t) {
  return bt(e, 0) ^ 45
    ? (((((((t << 2) ^ bt(e, 0)) << 2) ^ bt(e, 1)) << 2) ^ bt(e, 2)) << 2) ^ bt(e, 3)
    : 0;
}
function gl(e) {
  return e.trim();
}
function Rd(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Ye(e, t, o) {
  return e.replace(t, o);
}
function ni(e, t) {
  return e.indexOf(t);
}
function bt(e, t) {
  return e.charCodeAt(t) | 0;
}
function go(e, t, o) {
  return e.slice(t, o);
}
function Gt(e) {
  return e.length;
}
function $i(e) {
  return e.length;
}
function Mo(e, t) {
  return t.push(e), e;
}
function wd(e, t) {
  return e.map(t).join('');
}
var cr = 1,
  Un = 1,
  yl = 0,
  St = 0,
  ct = 0,
  Xn = '';
function ur(e, t, o, r, i, a, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: i,
    children: a,
    line: cr,
    column: Un,
    length: s,
    return: '',
  };
}
function ro(e, t) {
  return Cd(ur('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function $d() {
  return ct;
}
function Pd() {
  return (ct = St > 0 ? bt(Xn, --St) : 0), Un--, ct === 10 && ((Un = 1), cr--), ct;
}
function Nt() {
  return (ct = St < yl ? bt(Xn, St++) : 0), Un++, ct === 10 && ((Un = 1), cr++), ct;
}
function Jt() {
  return bt(Xn, St);
}
function Wo() {
  return St;
}
function So(e, t) {
  return go(Xn, e, t);
}
function yo(e) {
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
function El(e) {
  return (cr = Un = 1), (yl = Gt((Xn = e))), (St = 0), [];
}
function xl(e) {
  return (Xn = ''), e;
}
function Ho(e) {
  return gl(So(St - 1, oi(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Nd(e) {
  for (; (ct = Jt()) && ct < 33; ) Nt();
  return yo(e) > 2 || yo(ct) > 3 ? '' : ' ';
}
function kd(e, t) {
  for (; --t && Nt() && !(ct < 48 || ct > 102 || (ct > 57 && ct < 65) || (ct > 70 && ct < 97)); );
  return So(e, Wo() + (t < 6 && Jt() == 32 && Nt() == 32));
}
function oi(e) {
  for (; Nt(); )
    switch (ct) {
      case e:
        return St;
      case 34:
      case 39:
        e !== 34 && e !== 39 && oi(ct);
        break;
      case 40:
        e === 41 && oi(e);
        break;
      case 92:
        Nt();
        break;
    }
  return St;
}
function Id(e, t) {
  for (; Nt() && e + ct !== 47 + 10; ) if (e + ct === 42 + 42 && Jt() === 47) break;
  return '/*' + So(t, St - 1) + '*' + lr(e === 47 ? e : Nt());
}
function _d(e) {
  for (; !yo(Jt()); ) Nt();
  return So(e, St);
}
function Md(e) {
  return xl(qo('', null, null, null, [''], (e = El(e)), 0, [0], e));
}
function qo(e, t, o, r, i, a, s, l, c) {
  for (
    var u = 0,
      d = 0,
      p = s,
      b = 0,
      g = 0,
      y = 0,
      h = 1,
      m = 1,
      S = 1,
      C = 0,
      O = '',
      x = i,
      f = a,
      R = r,
      w = O;
    m;

  )
    switch (((y = C), (C = Nt()))) {
      case 40:
        if (y != 108 && bt(w, p - 1) == 58) {
          ni((w += Ye(Ho(C), '&', '&\f')), '&\f') != -1 && (S = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        w += Ho(C);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        w += Nd(y);
        break;
      case 92:
        w += kd(Wo() - 1, 7);
        continue;
      case 47:
        switch (Jt()) {
          case 42:
          case 47:
            Mo(Ad(Id(Nt(), Wo()), t, o), c);
            break;
          default:
            w += '/';
        }
        break;
      case 123 * h:
        l[u++] = Gt(w) * S;
      case 125 * h:
      case 59:
      case 0:
        switch (C) {
          case 0:
          case 125:
            m = 0;
          case 59 + d:
            g > 0 &&
              Gt(w) - p &&
              Mo(g > 32 ? ka(w + ';', r, o, p - 1) : ka(Ye(w, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            w += ';';
          default:
            if ((Mo((R = Na(w, t, o, u, d, i, l, O, (x = []), (f = []), p)), a), C === 123))
              if (d === 0) qo(w, t, R, R, x, a, p, l, f);
              else
                switch (b === 99 && bt(w, 3) === 110 ? 100 : b) {
                  case 100:
                  case 109:
                  case 115:
                    qo(
                      e,
                      R,
                      R,
                      r && Mo(Na(e, R, R, 0, 0, i, l, O, i, (x = []), p), f),
                      i,
                      f,
                      p,
                      l,
                      r ? x : f,
                    );
                    break;
                  default:
                    qo(w, R, R, R, [''], f, 0, l, f);
                }
        }
        (u = d = g = 0), (h = S = 1), (O = w = ''), (p = s);
        break;
      case 58:
        (p = 1 + Gt(w)), (g = y);
      default:
        if (h < 1) {
          if (C == 123) --h;
          else if (C == 125 && h++ == 0 && Pd() == 125) continue;
        }
        switch (((w += lr(C)), C * h)) {
          case 38:
            S = d > 0 ? 1 : ((w += '\f'), -1);
            break;
          case 44:
            (l[u++] = (Gt(w) - 1) * S), (S = 1);
            break;
          case 64:
            Jt() === 45 && (w += Ho(Nt())), (b = Jt()), (d = p = Gt((O = w += _d(Wo())))), C++;
            break;
          case 45:
            y === 45 && Gt(w) == 2 && (h = 0);
        }
    }
  return a;
}
function Na(e, t, o, r, i, a, s, l, c, u, d) {
  for (var p = i - 1, b = i === 0 ? a : [''], g = $i(b), y = 0, h = 0, m = 0; y < r; ++y)
    for (var S = 0, C = go(e, p + 1, (p = Td((h = s[y])))), O = e; S < g; ++S)
      (O = gl(h > 0 ? b[S] + ' ' + C : Ye(C, /&\f/g, b[S]))) && (c[m++] = O);
  return ur(e, t, o, i === 0 ? Ri : l, c, u, d);
}
function Ad(e, t, o) {
  return ur(e, t, o, Si, lr($d()), go(e, 2, -2), 0);
}
function ka(e, t, o, r) {
  return ur(e, t, o, wi, go(e, 0, r), go(e, r + 1, -1), r);
}
function Vn(e, t) {
  for (var o = '', r = $i(e), i = 0; i < r; i++) o += t(e[i], i, e, t) || '';
  return o;
}
function Dd(e, t, o, r) {
  switch (e.type) {
    case Od:
    case wi:
      return (e.return = e.return || e.value);
    case Si:
      return '';
    case vl:
      return (e.return = e.value + '{' + Vn(e.children, r) + '}');
    case Ri:
      e.value = e.props.join(',');
  }
  return Gt((o = Vn(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function Ld(e) {
  var t = $i(e);
  return function (o, r, i, a) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, i, a) || '';
    return s;
  };
}
function Fd(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var jd = function (t, o, r) {
    for (var i = 0, a = 0; (i = a), (a = Jt()), i === 38 && a === 12 && (o[r] = 1), !yo(a); ) Nt();
    return So(t, St);
  },
  zd = function (t, o) {
    var r = -1,
      i = 44;
    do
      switch (yo(i)) {
        case 0:
          i === 38 && Jt() === 12 && (o[r] = 1), (t[r] += jd(St - 1, o, r));
          break;
        case 2:
          t[r] += Ho(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = Jt() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += lr(i);
      }
    while ((i = Nt()));
    return t;
  },
  Vd = function (t, o) {
    return xl(zd(El(t), o));
  },
  Ia = /* @__PURE__ */ new WeakMap(),
  Bd = function (t) {
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
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !Ia.get(r)) && !i) {
        Ia.set(t, !0);
        for (var a = [], s = Vd(o, a), l = r.props, c = 0, u = 0; c < s.length; c++)
          for (var d = 0; d < l.length; d++, u++)
            t.props[u] = a[c] ? s[c].replace(/&\f/g, l[d]) : l[d] + ' ' + s[c];
      }
    }
  },
  Ud = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      // charcode for l
      o.charCodeAt(0) === 108 && // charcode for b
        o.charCodeAt(2) === 98 &&
        ((t.return = ''), (t.value = ''));
    }
  },
  Wd =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  Hd = function (t) {
    return t.type === 'comm' && t.children.indexOf(Wd) > -1;
  },
  qd = function (t) {
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
              if (Hd(u)) return;
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
  Ol = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  Yd = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!Ol(o[r])) return !0;
    return !1;
  },
  _a = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  Kd = function (t, o, r) {
    Ol(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          _a(t))
        : Yd(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          _a(t)));
  };
function Tl(e, t) {
  switch (Sd(e, t)) {
    case 5103:
      return Le + 'print-' + e + e;
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
      return Le + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Le + e + Xo + e + gt + e + e;
    case 6828:
    case 4268:
      return Le + e + gt + e + e;
    case 6165:
      return Le + e + gt + 'flex-' + e + e;
    case 5187:
      return Le + e + Ye(e, /(\w+).+(:[^]+)/, Le + 'box-$1$2' + gt + 'flex-$1$2') + e;
    case 5443:
      return Le + e + gt + 'flex-item-' + Ye(e, /flex-|-self/, '') + e;
    case 4675:
      return Le + e + gt + 'flex-line-pack' + Ye(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return Le + e + gt + Ye(e, 'shrink', 'negative') + e;
    case 5292:
      return Le + e + gt + Ye(e, 'basis', 'preferred-size') + e;
    case 6060:
      return Le + 'box-' + Ye(e, '-grow', '') + Le + e + gt + Ye(e, 'grow', 'positive') + e;
    case 4554:
      return Le + Ye(e, /([^-])(transform)/g, '$1' + Le + '$2') + e;
    case 6187:
      return Ye(Ye(Ye(e, /(zoom-|grab)/, Le + '$1'), /(image-set)/, Le + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return Ye(e, /(image-set\([^]*)/, Le + '$1$`$1');
    case 4968:
      return (
        Ye(
          Ye(e, /(.+:)(flex-)?(.*)/, Le + 'box-pack:$3' + gt + 'flex-pack:$3'),
          /s.+-b[^;]+/,
          'justify',
        ) +
        Le +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Ye(e, /(.+)-inline(.+)/, Le + '$1$2') + e;
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
      if (Gt(e) - 1 - t > 6)
        switch (bt(e, t + 1)) {
          case 109:
            if (bt(e, t + 4) !== 45) break;
          case 102:
            return (
              Ye(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + Le + '$2-$3$1' + Xo + (bt(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~ni(e, 'stretch') ? Tl(Ye(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (bt(e, t + 1) !== 115) break;
    case 6444:
      switch (bt(e, Gt(e) - 3 - (~ni(e, '!important') && 10))) {
        case 107:
          return Ye(e, ':', ':' + Le) + e;
        case 101:
          return (
            Ye(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                Le +
                (bt(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                Le +
                '$2$3$1' +
                gt +
                '$2box$3',
            ) + e
          );
      }
      break;
    case 5936:
      switch (bt(e, t + 11)) {
        case 114:
          return Le + e + gt + Ye(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return Le + e + gt + Ye(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return Le + e + gt + Ye(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return Le + e + gt + e + e;
  }
  return e;
}
var Gd = function (t, o, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case wi:
          t.return = Tl(t.value, t.length);
          break;
        case vl:
          return Vn(
            [
              ro(t, {
                value: Ye(t.value, '@', '@' + Le),
              }),
            ],
            i,
          );
        case Ri:
          if (t.length)
            return wd(t.props, function (a) {
              switch (Rd(a, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Vn(
                    [
                      ro(t, {
                        props: [Ye(a, /:(read-\w+)/, ':' + Xo + '$1')],
                      }),
                    ],
                    i,
                  );
                case '::placeholder':
                  return Vn(
                    [
                      ro(t, {
                        props: [Ye(a, /:(plac\w+)/, ':' + Le + 'input-$1')],
                      }),
                      ro(t, {
                        props: [Ye(a, /:(plac\w+)/, ':' + Xo + '$1')],
                      }),
                      ro(t, {
                        props: [Ye(a, /:(plac\w+)/, gt + 'input-$1')],
                      }),
                    ],
                    i,
                  );
              }
              return '';
            });
      }
  },
  Xd = [Gd],
  Jd = function (t) {
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
    var i = t.stylisPlugins || Xd;
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
        function (h) {
          for (var m = h.getAttribute('data-emotion').split(' '), S = 1; S < m.length; S++)
            a[m[S]] = !0;
          l.push(h);
        },
      );
    var c,
      u = [Bd, Ud];
    process.env.NODE_ENV !== 'production' &&
      u.push(
        qd({
          get compat() {
            return y.compat;
          },
        }),
        Kd,
      );
    {
      var d,
        p = [
          Dd,
          process.env.NODE_ENV !== 'production'
            ? function (h) {
                h.root ||
                  (h.return
                    ? d.insert(h.return)
                    : h.value && h.type !== Si && d.insert(h.value + '{}'));
              }
            : Fd(function (h) {
                d.insert(h);
              }),
        ],
        b = Ld(u.concat(i, p)),
        g = function (m) {
          return Vn(Md(m), b);
        };
      c = function (m, S, C, O) {
        (d = C),
          process.env.NODE_ENV !== 'production' &&
            S.map !== void 0 &&
            (d = {
              insert: function (f) {
                C.insert(f + S.map);
              },
            }),
          g(m ? m + '{' + S.styles + '}' : S.styles),
          O && (y.inserted[S.name] = !0);
      };
    }
    var y = {
      key: o,
      sheet: new xd({
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
    return y.sheet.hydrate(l), y;
  },
  ri = { exports: {} },
  Ue = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ma;
function Zd() {
  if (Ma) return Ue;
  Ma = 1;
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
    b = e ? Symbol.for('react.suspense_list') : 60120,
    g = e ? Symbol.for('react.memo') : 60115,
    y = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    m = e ? Symbol.for('react.fundamental') : 60117,
    S = e ? Symbol.for('react.responder') : 60118,
    C = e ? Symbol.for('react.scope') : 60119;
  function O(f) {
    if (typeof f == 'object' && f !== null) {
      var R = f.$$typeof;
      switch (R) {
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
                case y:
                case g:
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
  function x(f) {
    return O(f) === u;
  }
  return (
    (Ue.AsyncMode = c),
    (Ue.ConcurrentMode = u),
    (Ue.ContextConsumer = l),
    (Ue.ContextProvider = s),
    (Ue.Element = t),
    (Ue.ForwardRef = d),
    (Ue.Fragment = r),
    (Ue.Lazy = y),
    (Ue.Memo = g),
    (Ue.Portal = o),
    (Ue.Profiler = a),
    (Ue.StrictMode = i),
    (Ue.Suspense = p),
    (Ue.isAsyncMode = function (f) {
      return x(f) || O(f) === c;
    }),
    (Ue.isConcurrentMode = x),
    (Ue.isContextConsumer = function (f) {
      return O(f) === l;
    }),
    (Ue.isContextProvider = function (f) {
      return O(f) === s;
    }),
    (Ue.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (Ue.isForwardRef = function (f) {
      return O(f) === d;
    }),
    (Ue.isFragment = function (f) {
      return O(f) === r;
    }),
    (Ue.isLazy = function (f) {
      return O(f) === y;
    }),
    (Ue.isMemo = function (f) {
      return O(f) === g;
    }),
    (Ue.isPortal = function (f) {
      return O(f) === o;
    }),
    (Ue.isProfiler = function (f) {
      return O(f) === a;
    }),
    (Ue.isStrictMode = function (f) {
      return O(f) === i;
    }),
    (Ue.isSuspense = function (f) {
      return O(f) === p;
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
        f === b ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === y ||
            f.$$typeof === g ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === d ||
            f.$$typeof === m ||
            f.$$typeof === S ||
            f.$$typeof === C ||
            f.$$typeof === h))
      );
    }),
    (Ue.typeOf = O),
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
 */
var Aa;
function Qd() {
  return (
    Aa ||
      ((Aa = 1),
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
            b = e ? Symbol.for('react.suspense_list') : 60120,
            g = e ? Symbol.for('react.memo') : 60115,
            y = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            m = e ? Symbol.for('react.fundamental') : 60117,
            S = e ? Symbol.for('react.responder') : 60118,
            C = e ? Symbol.for('react.scope') : 60119;
          function O(k) {
            return (
              typeof k == 'string' ||
              typeof k == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              k === r ||
              k === u ||
              k === a ||
              k === i ||
              k === p ||
              k === b ||
              (typeof k == 'object' &&
                k !== null &&
                (k.$$typeof === y ||
                  k.$$typeof === g ||
                  k.$$typeof === s ||
                  k.$$typeof === l ||
                  k.$$typeof === d ||
                  k.$$typeof === m ||
                  k.$$typeof === S ||
                  k.$$typeof === C ||
                  k.$$typeof === h))
            );
          }
          function x(k) {
            if (typeof k == 'object' && k !== null) {
              var Te = k.$$typeof;
              switch (Te) {
                case t:
                  var I = k.type;
                  switch (I) {
                    case c:
                    case u:
                    case r:
                    case a:
                    case i:
                    case p:
                      return I;
                    default:
                      var W = I && I.$$typeof;
                      switch (W) {
                        case l:
                        case d:
                        case y:
                        case g:
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
            R = u,
            w = l,
            z = s,
            L = t,
            D = d,
            _ = r,
            Y = y,
            B = g,
            M = o,
            F = a,
            V = i,
            ae = p,
            se = !1;
          function G(k) {
            return (
              se ||
                ((se = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              $(k) || x(k) === c
            );
          }
          function $(k) {
            return x(k) === u;
          }
          function j(k) {
            return x(k) === l;
          }
          function X(k) {
            return x(k) === s;
          }
          function H(k) {
            return typeof k == 'object' && k !== null && k.$$typeof === t;
          }
          function U(k) {
            return x(k) === d;
          }
          function ne(k) {
            return x(k) === r;
          }
          function oe(k) {
            return x(k) === y;
          }
          function J(k) {
            return x(k) === g;
          }
          function ie(k) {
            return x(k) === o;
          }
          function le(k) {
            return x(k) === a;
          }
          function he(k) {
            return x(k) === i;
          }
          function re(k) {
            return x(k) === p;
          }
          (We.AsyncMode = f),
            (We.ConcurrentMode = R),
            (We.ContextConsumer = w),
            (We.ContextProvider = z),
            (We.Element = L),
            (We.ForwardRef = D),
            (We.Fragment = _),
            (We.Lazy = Y),
            (We.Memo = B),
            (We.Portal = M),
            (We.Profiler = F),
            (We.StrictMode = V),
            (We.Suspense = ae),
            (We.isAsyncMode = G),
            (We.isConcurrentMode = $),
            (We.isContextConsumer = j),
            (We.isContextProvider = X),
            (We.isElement = H),
            (We.isForwardRef = U),
            (We.isFragment = ne),
            (We.isLazy = oe),
            (We.isMemo = J),
            (We.isPortal = ie),
            (We.isProfiler = le),
            (We.isStrictMode = he),
            (We.isSuspense = re),
            (We.isValidElementType = O),
            (We.typeOf = x);
        })()),
    We
  );
}
process.env.NODE_ENV === 'production' ? (ri.exports = Zd()) : (ri.exports = Qd());
var ep = ri.exports,
  Cl = ep,
  tp = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  np = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  Sl = {};
Sl[Cl.ForwardRef] = tp;
Sl[Cl.Memo] = np;
var op = !0;
function Pi(e, t, o) {
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
      op === !1) &&
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
function rp(e) {
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
var ip = {
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
  Da = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  ap =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  sp = /[A-Z]|^ms/g,
  Rl = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Ni = function (t) {
    return t.charCodeAt(1) === 45;
  },
  La = function (t) {
    return t != null && typeof t != 'boolean';
  },
  Br = /* @__PURE__ */ bl(function (e) {
    return Ni(e) ? e : e.replace(sp, '-$&').toLowerCase();
  }),
  Jo = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(Rl, function (r, i, a) {
            return (
              (zt = {
                name: i,
                styles: a,
                next: zt,
              }),
              i
            );
          });
    }
    return ip[t] !== 1 && !Ni(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var lp =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    cp = ['normal', 'none', 'initial', 'inherit', 'unset'],
    up = Jo,
    dp = /^-ms-/,
    pp = /-(.)/g,
    Fa = {};
  Jo = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (cp.indexOf(o) === -1 &&
          !lp.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = up(t, o);
    return (
      r !== '' &&
        !Ni(t) &&
        t.indexOf('-') !== -1 &&
        Fa[t] === void 0 &&
        ((Fa[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(dp, 'ms-').replace(pp, function (i, a) {
              return a.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var wl =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function Eo(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(wl);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1)
        return (
          (zt = {
            name: o.name,
            styles: o.styles,
            next: zt,
          }),
          o.name
        );
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; )
            (zt = {
              name: r.name,
              styles: r.styles,
              next: zt,
            }),
              (r = r.next);
        var i = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (i += o.map), i;
      }
      return fp(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var a = zt,
          s = o(e);
        return (zt = a), Eo(e, t, s);
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
          c = o.replace(Rl, function (d, p, b) {
            var g = 'animation' + l.length;
            return (
              l.push(
                'const ' + g + ' = keyframes`' + b.replace(/^@keyframes animation-\w+/, '') + '`',
              ),
              '${' + g + '}'
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
function fp(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var i = 0; i < o.length; i++) r += Eo(e, t, o[i]) + ';';
  else
    for (var a in o) {
      var s = o[a];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += a + '{' + t[s] + '}')
          : La(s) && (r += Br(a) + ':' + Jo(a, s) + ';');
      else {
        if (a === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(wl);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) La(s[l]) && (r += Br(a) + ':' + Jo(a, s[l]) + ';');
        else {
          var c = Eo(e, t, s);
          switch (a) {
            case 'animation':
            case 'animationName': {
              r += Br(a) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && a === 'undefined' && console.error(ap),
                (r += a + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var ja = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  $l;
process.env.NODE_ENV !== 'production' &&
  ($l = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var zt,
  Wn = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      a = '';
    zt = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((i = !1), (a += Eo(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(Da),
        (a += s[0]));
    for (var l = 1; l < t.length; l++)
      (a += Eo(r, o, t[l])),
        i &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(Da),
          (a += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (a = a.replace($l, function (b) {
        return (c = b), '';
      })),
      (ja.lastIndex = 0);
    for (var u = '', d; (d = ja.exec(a)) !== null; )
      u +=
        '-' + // $FlowFixMe we know it's not null
        d[1];
    var p = rp(a) + u;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: p,
          styles: a,
          map: c,
          next: zt,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : {
          name: p,
          styles: a,
          next: zt,
        };
  },
  mp = function (t) {
    return t();
  },
  Pl = E['useInsertionEffect'] ? E['useInsertionEffect'] : !1,
  ki = Pl || mp,
  za = Pl || du,
  hp = {}.hasOwnProperty,
  Ii = /* @__PURE__ */ nl(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement < 'u'
      ? /* @__PURE__ */ Jd({
          key: 'css',
        })
      : null,
  );
process.env.NODE_ENV !== 'production' && (Ii.displayName = 'EmotionCacheContext');
Ii.Provider;
var fr = function (t) {
    return /* @__PURE__ */ pu(function (o, r) {
      var i = Co(Ii);
      return t(o, i, r);
    });
  },
  Ro = /* @__PURE__ */ nl({});
process.env.NODE_ENV !== 'production' && (Ro.displayName = 'EmotionThemeContext');
var Va = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  Ba = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  bp = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      dr(o, r, i),
      ki(function () {
        return pr(o, r, i);
      }),
      null
    );
  },
  vp = /* @__PURE__ */ fr(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[Va],
      a = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = Pi(t.registered, a, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = Wn(a, void 0, Co(Ro));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[Ba];
      c && (l = Wn([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var u = {};
    for (var d in e)
      hp.call(e, d) &&
        d !== 'css' &&
        d !== Va &&
        (process.env.NODE_ENV === 'production' || d !== Ba) &&
        (u[d] = e[d]);
    return (
      (u.ref = o),
      (u.className = s),
      /* @__PURE__ */ mn(
        gi,
        null,
        /* @__PURE__ */ mn(bp, {
          cache: t,
          serialized: l,
          isStringTag: typeof i == 'string',
        }),
        /* @__PURE__ */ mn(i, u),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (vp.displayName = 'EmotionCssPropInternal');
var gp = {
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
  Ua = !1,
  Nl = /* @__PURE__ */ fr(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !Ua && // check for className as well since the user is
      // probably using the custom createElement which
      // means it will be turned into a className prop
      // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (Ua = !0));
    var o = e.styles,
      r = Wn([o], void 0, Co(Ro)),
      i = fu();
    return (
      za(
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
      za(
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
process.env.NODE_ENV !== 'production' && (Nl.displayName = 'EmotionGlobal');
function yp() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return Wn(t);
}
var _i = function () {
    var t = yp.apply(void 0, arguments),
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
  Ep = function e(t) {
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
function xp(e, t, o) {
  var r = [],
    i = Pi(e, r, o);
  return r.length < 2 ? o : i + t(r);
}
var Op = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      ki(function () {
        for (var i = 0; i < r.length; i++) pr(o, r[i], !1);
      }),
      null
    );
  },
  Tp = /* @__PURE__ */ fr(function (e, t) {
    var o = !1,
      r = [],
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        var b = Wn(d, t.registered);
        return r.push(b), dr(t, b, !1), t.key + '-' + b.name;
      },
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        return xp(t.registered, i, Ep(d));
      },
      s = {
        css: i,
        cx: a,
        theme: Co(Ro),
      },
      l = e.children(s);
    return (
      (o = !0),
      /* @__PURE__ */ mn(
        gi,
        null,
        /* @__PURE__ */ mn(Op, {
          cache: t,
          serializedArr: r,
        }),
        l,
      )
    );
  });
process.env.NODE_ENV !== 'production' && (Tp.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var Wa = !0,
    Cp = typeof jest < 'u' || typeof vi < 'u';
  if (Wa && !Cp) {
    var Ha =
        // $FlowIgnore
        typeof globalThis < 'u' ? globalThis : Wa ? window : global,
      qa = '__EMOTION_REACT_' + gp.version.split('.')[0] + '__';
    Ha[qa] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (Ha[qa] = !0);
  }
}
var Sp = gd,
  Rp = function (t) {
    return t !== 'theme';
  },
  Ya = function (t) {
    return typeof t == 'string' && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      t.charCodeAt(0) > 96
      ? Sp
      : Rp;
  },
  Ka = function (t, o, r) {
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
  Ga = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  wp = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      dr(o, r, i),
      ki(function () {
        return pr(o, r, i);
      }),
      null
    );
  },
  $p = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      i = (r && t.__emotion_base) || t,
      a,
      s;
    o !== void 0 && ((a = o.label), (s = o.target));
    var l = Ka(t, o, r),
      c = l || Ya(i),
      u = !c('as');
    return function () {
      var d = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((a !== void 0 && p.push('label:' + a + ';'), d[0] == null || d[0].raw === void 0))
        p.push.apply(p, d);
      else {
        process.env.NODE_ENV !== 'production' && d[0][0] === void 0 && console.error(Ga),
          p.push(d[0][0]);
        for (var b = d.length, g = 1; g < b; g++)
          process.env.NODE_ENV !== 'production' && d[0][g] === void 0 && console.error(Ga),
            p.push(d[g], d[0][g]);
      }
      var y = fr(function (h, m, S) {
        var C = (u && h.as) || i,
          O = '',
          x = [],
          f = h;
        if (h.theme == null) {
          f = {};
          for (var R in h) f[R] = h[R];
          f.theme = Co(Ro);
        }
        typeof h.className == 'string'
          ? (O = Pi(m.registered, x, h.className))
          : h.className != null && (O = h.className + ' ');
        var w = Wn(p.concat(x), m.registered, f);
        (O += m.key + '-' + w.name), s !== void 0 && (O += ' ' + s);
        var z = u && l === void 0 ? Ya(C) : c,
          L = {};
        for (var D in h)
          (u && D === 'as') || // $FlowFixMe
            (z(D) && (L[D] = h[D]));
        return (
          (L.className = O),
          (L.ref = S),
          /* @__PURE__ */ mn(
            gi,
            null,
            /* @__PURE__ */ mn(wp, {
              cache: m,
              serialized: w,
              isStringTag: typeof C == 'string',
            }),
            /* @__PURE__ */ mn(C, L),
          )
        );
      });
      return (
        (y.displayName =
          a !== void 0
            ? a
            : 'Styled(' +
              (typeof i == 'string' ? i : i.displayName || i.name || 'Component') +
              ')'),
        (y.defaultProps = t.defaultProps),
        (y.__emotion_real = y),
        (y.__emotion_base = i),
        (y.__emotion_styles = p),
        (y.__emotion_forwardProp = l),
        Object.defineProperty(y, 'toString', {
          value: function () {
            return s === void 0 && process.env.NODE_ENV !== 'production'
              ? 'NO_COMPONENT_SELECTOR'
              : '.' + s;
          },
        }),
        (y.withComponent = function (h, m) {
          return e(
            h,
            v({}, o, m, {
              shouldForwardProp: Ka(y, m, !0),
            }),
          ).apply(void 0, p);
        }),
        y
      );
    };
  };
const Pp = $p;
var Np = [
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
  ii = Pp.bind();
Np.forEach(function (e) {
  ii[e] = ii(e);
});
const kp = ii;
function Ip(e) {
  return e == null || Object.keys(e).length === 0;
}
function kl(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return /* @__PURE__ */ A(Nl, {
    styles: typeof t == 'function' ? (i) => t(Ip(i) ? o : i) : t,
  });
}
process.env.NODE_ENV !== 'production' &&
  (kl.propTypes = {
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
function _p(e, t) {
  const o = kp(e, t);
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
const Mp = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  Ap =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  vn = Ap;
function uo(e, t) {
  return t
    ? At(e, t, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const Mi = {
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
  Xa = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${Mi[e]}px)`,
  };
function Qt(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || Xa;
    return t.reduce((s, l, c) => ((s[a.up(a.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const a = r.breakpoints || Xa;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || Mi).indexOf(l) !== -1) {
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
function Dp(e = {}) {
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
function Lp(e, t) {
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
function Zo(e, t, o, r = o) {
  let i;
  return (
    typeof e == 'function' ? (i = e(o)) : Array.isArray(e) ? (i = e[o] || r) : (i = mr(e, o) || r),
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
        u = mr(c, r) || {};
      return Qt(s, l, (p) => {
        let b = Zo(u, i, p);
        return (
          p === b &&
            typeof p == 'string' &&
            (b = Zo(u, i, `${t}${p === 'default' ? '' : Q(p)}`, p)),
          o === !1
            ? b
            : {
                [o]: b,
              }
        );
      });
    };
  return (
    (a.propTypes =
      process.env.NODE_ENV !== 'production'
        ? {
            [t]: vn,
          }
        : {}),
    (a.filterProps = [t]),
    a
  );
}
function hr(...e) {
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
function Fp(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const jp = {
    m: 'margin',
    p: 'padding',
  },
  zp = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  Ja = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  Vp = Fp((e) => {
    if (e.length > 2)
      if (Ja[e]) e = Ja[e];
      else return [e];
    const [t, o] = e.split(''),
      r = jp[t],
      i = zp[o] || '';
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
  Bp = [...br, ...vr];
function wo(e, t, o, r) {
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
function Il(e) {
  return wo(e, 'spacing', 8, 'spacing');
}
function $o(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function Up(e, t) {
  return (o) => e.reduce((r, i) => ((r[i] = $o(t, o)), r), {});
}
function Wp(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const i = Vp(o),
    a = Up(i, r),
    s = e[o];
  return Qt(e, s, a);
}
function _l(e, t) {
  const o = Il(e.theme);
  return Object.keys(e)
    .map((r) => Wp(e, t, r, o))
    .reduce(uo, {});
}
function it(e) {
  return _l(e, br);
}
it.propTypes =
  process.env.NODE_ENV !== 'production' ? br.reduce((e, t) => ((e[t] = vn), e), {}) : {};
it.filterProps = br;
function at(e) {
  return _l(e, vr);
}
at.propTypes =
  process.env.NODE_ENV !== 'production' ? vr.reduce((e, t) => ((e[t] = vn), e), {}) : {};
at.filterProps = vr;
process.env.NODE_ENV !== 'production' && Bp.reduce((e, t) => ((e[t] = vn), e), {});
function Xt(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Hp = Ke({
    prop: 'border',
    themeKey: 'borders',
    transform: Xt,
  }),
  qp = Ke({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: Xt,
  }),
  Yp = Ke({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: Xt,
  }),
  Kp = Ke({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: Xt,
  }),
  Gp = Ke({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: Xt,
  }),
  Xp = Ke({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  Jp = Ke({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  Zp = Ke({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  Qp = Ke({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  ef = Ke({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  gr = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = wo(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({
          borderRadius: $o(t, r),
        });
      return Qt(e, e.borderRadius, o);
    }
    return null;
  };
gr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: vn,
      }
    : {};
gr.filterProps = ['borderRadius'];
hr(Hp, qp, Yp, Kp, Gp, Xp, Jp, Zp, Qp, ef, gr);
const yr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = wo(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({
        gap: $o(t, r),
      });
    return Qt(e, e.gap, o);
  }
  return null;
};
yr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: vn,
      }
    : {};
yr.filterProps = ['gap'];
const Er = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = wo(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({
        columnGap: $o(t, r),
      });
    return Qt(e, e.columnGap, o);
  }
  return null;
};
Er.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: vn,
      }
    : {};
Er.filterProps = ['columnGap'];
const xr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = wo(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({
        rowGap: $o(t, r),
      });
    return Qt(e, e.rowGap, o);
  }
  return null;
};
xr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: vn,
      }
    : {};
xr.filterProps = ['rowGap'];
const tf = Ke({
    prop: 'gridColumn',
  }),
  nf = Ke({
    prop: 'gridRow',
  }),
  of = Ke({
    prop: 'gridAutoFlow',
  }),
  rf = Ke({
    prop: 'gridAutoColumns',
  }),
  af = Ke({
    prop: 'gridAutoRows',
  }),
  sf = Ke({
    prop: 'gridTemplateColumns',
  }),
  lf = Ke({
    prop: 'gridTemplateRows',
  }),
  cf = Ke({
    prop: 'gridTemplateAreas',
  }),
  uf = Ke({
    prop: 'gridArea',
  });
hr(yr, Er, xr, tf, nf, of, rf, af, sf, lf, cf, uf);
function Bn(e, t) {
  return t === 'grey' ? t : e;
}
const df = Ke({
    prop: 'color',
    themeKey: 'palette',
    transform: Bn,
  }),
  pf = Ke({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: Bn,
  }),
  ff = Ke({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: Bn,
  });
hr(df, pf, ff);
function Pt(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const mf = Ke({
    prop: 'width',
    transform: Pt,
  }),
  Ai = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, i, a;
        return {
          maxWidth:
            ((r = e.theme) == null || (i = r.breakpoints) == null || (a = i.values) == null
              ? void 0
              : a[o]) ||
            Mi[o] ||
            Pt(o),
        };
      };
      return Qt(e, e.maxWidth, t);
    }
    return null;
  };
Ai.filterProps = ['maxWidth'];
const hf = Ke({
    prop: 'minWidth',
    transform: Pt,
  }),
  bf = Ke({
    prop: 'height',
    transform: Pt,
  }),
  vf = Ke({
    prop: 'maxHeight',
    transform: Pt,
  }),
  gf = Ke({
    prop: 'minHeight',
    transform: Pt,
  });
Ke({
  prop: 'size',
  cssProperty: 'width',
  transform: Pt,
});
Ke({
  prop: 'size',
  cssProperty: 'height',
  transform: Pt,
});
const yf = Ke({
  prop: 'boxSizing',
});
hr(mf, Ai, hf, bf, vf, gf, yf);
const Ur = (e) => (t) => {
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
                    : Q((a = t[e]) == null ? void 0 : a.toString())
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
      return Qt(t, t[e], o);
    }
    return null;
  },
  Ef = {
    // borders
    border: {
      themeKey: 'borders',
      transform: Xt,
    },
    borderTop: {
      themeKey: 'borders',
      transform: Xt,
    },
    borderRight: {
      themeKey: 'borders',
      transform: Xt,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: Xt,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: Xt,
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
      transform: Bn,
    },
    bgcolor: {
      themeKey: 'palette',
      cssProperty: 'backgroundColor',
      transform: Bn,
    },
    backgroundColor: {
      themeKey: 'palette',
      transform: Bn,
    },
    // spacing
    p: {
      style: at,
    },
    pt: {
      style: at,
    },
    pr: {
      style: at,
    },
    pb: {
      style: at,
    },
    pl: {
      style: at,
    },
    px: {
      style: at,
    },
    py: {
      style: at,
    },
    padding: {
      style: at,
    },
    paddingTop: {
      style: at,
    },
    paddingRight: {
      style: at,
    },
    paddingBottom: {
      style: at,
    },
    paddingLeft: {
      style: at,
    },
    paddingX: {
      style: at,
    },
    paddingY: {
      style: at,
    },
    paddingInline: {
      style: at,
    },
    paddingInlineStart: {
      style: at,
    },
    paddingInlineEnd: {
      style: at,
    },
    paddingBlock: {
      style: at,
    },
    paddingBlockStart: {
      style: at,
    },
    paddingBlockEnd: {
      style: at,
    },
    m: {
      style: it,
    },
    mt: {
      style: it,
    },
    mr: {
      style: it,
    },
    mb: {
      style: it,
    },
    ml: {
      style: it,
    },
    mx: {
      style: it,
    },
    my: {
      style: it,
    },
    margin: {
      style: it,
    },
    marginTop: {
      style: it,
    },
    marginRight: {
      style: it,
    },
    marginBottom: {
      style: it,
    },
    marginLeft: {
      style: it,
    },
    marginX: {
      style: it,
    },
    marginY: {
      style: it,
    },
    marginInline: {
      style: it,
    },
    marginInlineStart: {
      style: it,
    },
    marginInlineEnd: {
      style: it,
    },
    marginBlock: {
      style: it,
    },
    marginBlockStart: {
      style: it,
    },
    marginBlockEnd: {
      style: it,
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
      transform: Pt,
    },
    maxWidth: {
      style: Ai,
    },
    minWidth: {
      transform: Pt,
    },
    height: {
      transform: Pt,
    },
    maxHeight: {
      transform: Pt,
    },
    minHeight: {
      transform: Pt,
    },
    boxSizing: {},
    // typography
    fontFamily: {
      themeKey: 'typography',
      style: Ur('fontFamily'),
    },
    fontSize: {
      themeKey: 'typography',
      style: Ur('fontSize'),
    },
    fontStyle: {
      themeKey: 'typography',
    },
    fontWeight: {
      themeKey: 'typography',
      style: Ur('fontWeight'),
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
  Di = Ef;
function xf(...e) {
  const t = e.reduce((r, i) => r.concat(Object.keys(i)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function Of(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Tf() {
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
    const b = mr(i, u) || {};
    return p
      ? p(s)
      : Qt(s, r, (y) => {
          let h = Zo(b, d, y);
          return (
            y === h &&
              typeof y == 'string' &&
              (h = Zo(b, d, `${o}${y === 'default' ? '' : Q(y)}`, y)),
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
    const { sx: i, theme: a = {} } = o || {};
    if (!i) return null;
    const s = (r = a.unstable_sxConfig) != null ? r : Di;
    function l(c) {
      let u = c;
      if (typeof c == 'function') u = c(a);
      else if (typeof c != 'object') return c;
      if (!u) return null;
      const d = Dp(a.breakpoints),
        p = Object.keys(d);
      let b = d;
      return (
        Object.keys(u).forEach((g) => {
          const y = Of(u[g], a);
          if (y != null)
            if (typeof y == 'object')
              if (s[g]) b = uo(b, e(g, y, a, s));
              else {
                const h = Qt(
                  {
                    theme: a,
                  },
                  y,
                  (m) => ({
                    [g]: m,
                  }),
                );
                xf(h, y)
                  ? (b[g] = t({
                      sx: y,
                      theme: a,
                    }))
                  : (b = uo(b, h));
              }
            else b = uo(b, e(g, y, a, s));
        }),
        Lp(p, b)
      );
    }
    return Array.isArray(i) ? i.map(l) : l(i);
  }
  return t;
}
const Ml = Tf();
Ml.filterProps = ['sx'];
const Li = Ml;
function Al(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = Al(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function Oe() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = Al(e)) && (r && (r += ' '), (r += t));
  return r;
}
const Cf = ['values', 'unit', 'step'],
  Sf = (e) => {
    const t =
      Object.keys(e).map((o) => ({
        key: o,
        val: e[o],
      })) || [];
    return (
      t.sort((o, r) => o.val - r.val),
      t.reduce(
        (o, r) =>
          v({}, o, {
            [r.key]: r.val,
          }),
        {},
      )
    );
  };
function Rf(e) {
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
    i = xe(e, Cf),
    a = Sf(t),
    s = Object.keys(a);
  function l(b) {
    return `@media (min-width:${typeof t[b] == 'number' ? t[b] : b}${o})`;
  }
  function c(b) {
    return `@media (max-width:${(typeof t[b] == 'number' ? t[b] : b) - r / 100}${o})`;
  }
  function u(b, g) {
    const y = s.indexOf(g);
    return `@media (min-width:${typeof t[b] == 'number' ? t[b] : b}${o}) and (max-width:${
      (y !== -1 && typeof t[s[y]] == 'number' ? t[s[y]] : g) - r / 100
    }${o})`;
  }
  function d(b) {
    return s.indexOf(b) + 1 < s.length ? u(b, s[s.indexOf(b) + 1]) : l(b);
  }
  function p(b) {
    const g = s.indexOf(b);
    return g === 0
      ? l(s[1])
      : g === s.length - 1
      ? c(s[g])
      : u(b, s[s.indexOf(b) + 1]).replace('@media', '@media not all and');
  }
  return v(
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
const wf = {
    borderRadius: 4,
  },
  $f = wf;
function Pf(e = 8) {
  if (e.mui) return e;
  const t = Il({
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
const Nf = ['breakpoints', 'palette', 'spacing', 'shape'];
function Fi(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: i, shape: a = {} } = e,
    s = xe(e, Nf),
    l = Rf(o),
    c = Pf(i);
  let u = At(
    {
      breakpoints: l,
      direction: 'ltr',
      components: {},
      // Inject component definitions.
      palette: v(
        {
          mode: 'light',
        },
        r,
      ),
      spacing: c,
      shape: v({}, $f, a),
    },
    s,
  );
  return (
    (u = t.reduce((d, p) => At(d, p), u)),
    (u.unstable_sxConfig = v({}, Di, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return Li({
        sx: p,
        theme: this,
      });
    }),
    u
  );
}
const Dl = /* @__PURE__ */ E.createContext(null);
process.env.NODE_ENV !== 'production' && (Dl.displayName = 'ThemeContext');
const kf = Dl;
function If() {
  const e = E.useContext(kf);
  return process.env.NODE_ENV !== 'production' && E.useDebugValue(e), e;
}
function _f(e) {
  return Object.keys(e).length === 0;
}
function Ll(e = null) {
  const t = If();
  return !t || _f(t) ? e : t;
}
const Mf = Fi();
function Fl(e = Mf) {
  return Ll(e);
}
const Af = ['variant'];
function Za(e) {
  return e.length === 0;
}
function jl(e) {
  const { variant: t } = e,
    o = xe(e, Af);
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((i) => {
        i === 'color'
          ? (r += Za(r) ? e[i] : Q(e[i]))
          : (r += `${Za(r) ? i : Q(i)}${Q(e[i].toString())}`);
      }),
    r
  );
}
const Df = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'],
  Lf = ['theme'],
  Ff = ['theme'];
function io(e) {
  return Object.keys(e).length === 0;
}
function jf(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const zf = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Vf = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((i) => {
        const a = jl(i.props);
        r[a] = i.style;
      }),
      r
    );
  },
  Bf = (e, t, o, r) => {
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
            d && l.push(t[jl(u.props)]);
        }),
      l
    );
  };
function po(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Uf = Fi(),
  Wf = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function Hf(e = {}) {
  const { defaultTheme: t = Uf, rootShouldForwardProp: o = po, slotShouldForwardProp: r = po } = e,
    i = (a) => {
      const s = io(a.theme) ? t : a.theme;
      return Li(
        v({}, a, {
          theme: s,
        }),
      );
    };
  return (
    (i.__mui_systemSx = !0),
    (a, s = {}) => {
      Mp(a, (O) => O.filter((x) => !(x != null && x.__mui_systemSx)));
      const { name: l, slot: c, skipVariantsResolver: u, skipSx: d, overridesResolver: p } = s,
        b = xe(s, Df),
        g = u !== void 0 ? u : (c && c !== 'Root') || !1,
        y = d || !1;
      let h;
      process.env.NODE_ENV !== 'production' && l && (h = `${l}-${Wf(c || 'Root')}`);
      let m = po;
      c === 'Root' ? (m = o) : c ? (m = r) : jf(a) && (m = void 0);
      const S = _p(
          a,
          v(
            {
              shouldForwardProp: m,
              label: h,
            },
            b,
          ),
        ),
        C = (O, ...x) => {
          const f = x
            ? x.map((L) =>
                typeof L == 'function' && L.__emotion_real !== L
                  ? (D) => {
                      let { theme: _ } = D,
                        Y = xe(D, Lf);
                      return L(
                        v(
                          {
                            theme: io(_) ? t : _,
                          },
                          Y,
                        ),
                      );
                    }
                  : L,
              )
            : [];
          let R = O;
          l &&
            p &&
            f.push((L) => {
              const D = io(L.theme) ? t : L.theme,
                _ = zf(l, D);
              if (_) {
                const Y = {};
                return (
                  Object.entries(_).forEach(([B, M]) => {
                    Y[B] =
                      typeof M == 'function'
                        ? M(
                            v({}, L, {
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
              !g &&
              f.push((L) => {
                const D = io(L.theme) ? t : L.theme;
                return Bf(L, Vf(l, D), D, l);
              }),
            y || f.push(i);
          const w = f.length - x.length;
          if (Array.isArray(O) && w > 0) {
            const L = new Array(w).fill('');
            (R = [...O, ...L]), (R.raw = [...O.raw, ...L]);
          } else
            typeof O == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              O.__emotion_real !== O &&
              (R = (L) => {
                let { theme: D } = L,
                  _ = xe(L, Ff);
                return O(
                  v(
                    {
                      theme: io(D) ? t : D,
                    },
                    _,
                  ),
                );
              });
          const z = S(R, ...f);
          if (process.env.NODE_ENV !== 'production') {
            let L;
            l && (L = `${l}${c || ''}`),
              L === void 0 && (L = `Styled(${Gu(a)})`),
              (z.displayName = L);
          }
          return z;
        };
      return S.withConfig && (C.withConfig = S.withConfig), C;
    }
  );
}
function qf(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : Ci(t.components[o].defaultProps, r);
}
function Yf({ props: e, name: t, defaultTheme: o }) {
  const r = Fl(o);
  return qf({
    theme: r,
    name: t,
    props: e,
  });
}
function ji(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function Kf(e) {
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
function wn(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return wn(Kf(e));
  const t = e.indexOf('('),
    o = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(o) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : bn(9, e),
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
          : bn(10, i),
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
function Gf(e) {
  e = wn(e);
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
    Or({
      type: l,
      values: c,
    })
  );
}
function ai(e) {
  e = wn(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? wn(Gf(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function Qa(e, t) {
  const o = ai(e),
    r = ai(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function et(e, t) {
  return (
    (e = wn(e)),
    (t = ji(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    Or(e)
  );
}
function Tr(e, t) {
  if (((e = wn(e)), (t = ji(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return Or(e);
}
function Cr(e, t) {
  if (((e = wn(e)), (t = ji(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return Or(e);
}
function Xf(e, t = 0.15) {
  return ai(e) > 0.5 ? Tr(e, t) : Cr(e, t);
}
function Jf(e, t) {
  return v(
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
const Zf = ['mode', 'contrastThreshold', 'tonalOffset'],
  es = {
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
function ts(e, t, o, r) {
  const i = r.light || r,
    a = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = Cr(e.main, i))
      : t === 'dark' && (e.dark = Tr(e.main, a)));
}
function Qf(e = 'light') {
  return e === 'dark'
    ? {
        main: _n[200],
        light: _n[50],
        dark: _n[400],
      }
    : {
        main: _n[700],
        light: _n[400],
        dark: _n[800],
      };
}
function em(e = 'light') {
  return e === 'dark'
    ? {
        main: In[200],
        light: In[50],
        dark: In[400],
      }
    : {
        main: In[500],
        light: In[300],
        dark: In[700],
      };
}
function tm(e = 'light') {
  return e === 'dark'
    ? {
        main: kn[500],
        light: kn[300],
        dark: kn[700],
      }
    : {
        main: kn[700],
        light: kn[400],
        dark: kn[800],
      };
}
function nm(e = 'light') {
  return e === 'dark'
    ? {
        main: Mn[400],
        light: Mn[300],
        dark: Mn[700],
      }
    : {
        main: Mn[700],
        light: Mn[500],
        dark: Mn[900],
      };
}
function om(e = 'light') {
  return e === 'dark'
    ? {
        main: An[400],
        light: An[300],
        dark: An[700],
      }
    : {
        main: An[800],
        light: An[500],
        dark: An[900],
      };
}
function rm(e = 'light') {
  return e === 'dark'
    ? {
        main: oo[400],
        light: oo[300],
        dark: oo[700],
      }
    : {
        main: '#ed6c02',
        // closest to orange[800] that pass 3:1.
        light: oo[500],
        dark: oo[900],
      };
}
function im(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2 } = e,
    i = xe(e, Zf),
    a = e.primary || Qf(t),
    s = e.secondary || em(t),
    l = e.error || tm(t),
    c = e.info || nm(t),
    u = e.success || om(t),
    d = e.warning || rm(t);
  function p(h) {
    const m = Qa(h, Wr.text.primary) >= o ? Wr.text.primary : es.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const S = Qa(h, m);
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
      lightShade: C = 300,
      darkShade: O = 700,
    }) => {
      if (((h = v({}, h)), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${m ? ` (${m})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.`
            : bn(11, m ? ` (${m})` : '', S),
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
            : bn(12, m ? ` (${m})` : '', JSON.stringify(h.main)),
        );
      return (
        ts(h, 'light', C, r), ts(h, 'dark', O, r), h.contrastText || (h.contrastText = p(h.main)), h
      );
    },
    g = {
      dark: Wr,
      light: es,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (g[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    At(
      v(
        {
          // A collection of common colors.
          common: v({}, vo),
          // prevent mutable object.
          // The palette mode, can be light or dark.
          mode: t,
          // The colors used to represent primary interface elements for a user.
          primary: b({
            color: a,
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
          grey: ku,
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
        g[t],
      ),
      i,
    )
  );
}
const am = [
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
function sm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ns = {
    textTransform: 'uppercase',
  },
  os = '"Roboto", "Helvetica", "Arial", sans-serif';
function lm(e, t) {
  const o = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: r = os,
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
    b = xe(o, am);
  process.env.NODE_ENV !== 'production' &&
    (typeof i != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof u != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const g = i / 14,
    y = p || ((S) => `${(S / u) * g}rem`),
    h = (S, C, O, x, f) =>
      v(
        {
          fontFamily: r,
          fontWeight: S,
          fontSize: y(C),
          // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
          lineHeight: O,
        },
        r === os
          ? {
              letterSpacing: `${sm(x / C)}em`,
            }
          : {},
        f,
        d,
      ),
    m = {
      h1: h(a, 96, 1.167, -1.5),
      h2: h(a, 60, 1.2, -0.5),
      h3: h(s, 48, 1.167, 0),
      h4: h(s, 34, 1.235, 0.25),
      h5: h(s, 24, 1.334, 0),
      h6: h(l, 20, 1.6, 0.15),
      subtitle1: h(s, 16, 1.75, 0.15),
      subtitle2: h(l, 14, 1.57, 0.1),
      body1: h(s, 16, 1.5, 0.15),
      body2: h(s, 14, 1.43, 0.15),
      button: h(l, 14, 1.75, 0.4, ns),
      caption: h(s, 12, 1.66, 0.4),
      overline: h(s, 12, 2.66, 1, ns),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return At(
    v(
      {
        htmlFontSize: u,
        pxToRem: y,
        fontFamily: r,
        fontSize: i,
        fontWeightLight: a,
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
const cm = 0.2,
  um = 0.14,
  dm = 0.12;
function nt(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${cm})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${um})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${dm})`,
  ].join(',');
}
const pm = [
    'none',
    nt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    nt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    nt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    nt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    nt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    nt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    nt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    nt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    nt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    nt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    nt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    nt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    nt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    nt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    nt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    nt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    nt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    nt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    nt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    nt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    nt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    nt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    nt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    nt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  fm = pm,
  mm = ['duration', 'easing', 'delay'],
  hm = {
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
  bm = {
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
function rs(e) {
  return `${Math.round(e)}ms`;
}
function vm(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function gm(e) {
  const t = v({}, hm, e.easing),
    o = v({}, bm, e.duration);
  return v(
    {
      getAutoHeightDuration: vm,
      create: (i = ['all'], a = {}) => {
        const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0 } = a,
          u = xe(a, mm);
        if (process.env.NODE_ENV !== 'production') {
          const d = (b) => typeof b == 'string',
            p = (b) => !isNaN(parseFloat(b));
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
              `${d} ${typeof s == 'string' ? s : rs(s)} ${l} ${typeof c == 'string' ? c : rs(c)}`,
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
const ym = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  Em = ym,
  xm = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function Om(e = {}, ...t) {
  const { mixins: o = {}, palette: r = {}, transitions: i = {}, typography: a = {} } = e,
    s = xe(e, xm);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : bn(18),
    );
  const l = im(r),
    c = Fi(e);
  let u = At(c, {
    mixins: Jf(c.breakpoints, o),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: fm.slice(),
    typography: lm(l, a),
    transitions: gm(i),
    zIndex: v({}, Em),
  });
  if (
    ((u = At(u, s)), (u = t.reduce((d, p) => At(d, p), u)), process.env.NODE_ENV !== 'production')
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
      p = (b, g) => {
        let y;
        for (y in b) {
          const h = b[y];
          if (d.indexOf(y) !== -1 && Object.keys(h).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const m = _e('', y);
              console.error(
                [
                  `MUI: The \`${g}\` component increases the CSS specificity of the \`${y}\` internal state.`,
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
            b[y] = {};
          }
        }
      };
    Object.keys(u.components).forEach((b) => {
      const g = u.components[b].styleOverrides;
      g && b.indexOf('Mui') === 0 && p(g, b);
    });
  }
  return (
    (u.unstable_sxConfig = v({}, Di, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return Li({
        sx: p,
        theme: this,
      });
    }),
    u
  );
}
const Tm = Om(),
  Sr = Tm;
function Jn() {
  const e = Fl(Sr);
  return process.env.NODE_ENV !== 'production' && E.useDebugValue(e), e;
}
function Ge({ props: e, name: t }) {
  return Yf({
    props: e,
    name: t,
    defaultTheme: Sr,
  });
}
const tn = (e) => po(e) && e !== 'classes',
  zi = po,
  Cm = Hf({
    defaultTheme: Sr,
    rootShouldForwardProp: tn,
  }),
  pe = Cm,
  Sm = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  is = Sm;
function hn(e) {
  return typeof e == 'string';
}
function Rm(e, t, o) {
  return e === void 0 || hn(e)
    ? t
    : v({}, t, {
        ownerState: v({}, t.ownerState, o),
      });
}
const wm = {
    disableDefaultClasses: !1,
  },
  $m = /* @__PURE__ */ E.createContext(wm);
function zl(e) {
  const { disableDefaultClasses: t } = E.useContext($m);
  return (o) => (t ? '' : e(o));
}
function Vl(e, t = []) {
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
function as(e) {
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
function Pm(e) {
  const {
    getSlotProps: t,
    additionalProps: o,
    externalSlotProps: r,
    externalForwardedProps: i,
    className: a,
  } = e;
  if (!t) {
    const g = Oe(
        i == null ? void 0 : i.className,
        r == null ? void 0 : r.className,
        a,
        o == null ? void 0 : o.className,
      ),
      y = v(
        {},
        o == null ? void 0 : o.style,
        i == null ? void 0 : i.style,
        r == null ? void 0 : r.style,
      ),
      h = v({}, o, i, r);
    return (
      g.length > 0 && (h.className = g),
      Object.keys(y).length > 0 && (h.style = y),
      {
        props: h,
        internalRef: void 0,
      }
    );
  }
  const s = Vl(v({}, i, r)),
    l = as(r),
    c = as(i),
    u = t(s),
    d = Oe(
      u == null ? void 0 : u.className,
      o == null ? void 0 : o.className,
      a,
      i == null ? void 0 : i.className,
      r == null ? void 0 : r.className,
    ),
    p = v(
      {},
      u == null ? void 0 : u.style,
      o == null ? void 0 : o.style,
      i == null ? void 0 : i.style,
      r == null ? void 0 : r.style,
    ),
    b = v({}, u, o, c, l);
  return (
    d.length > 0 && (b.className = d),
    Object.keys(p).length > 0 && (b.style = p),
    {
      props: b,
      internalRef: u.ref,
    }
  );
}
const Nm = ['elementType', 'externalSlotProps', 'ownerState'];
function _t(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: i } = e,
    a = xe(e, Nm),
    s = si(r, i),
    { props: l, internalRef: c } = Pm(
      v({}, a, {
        externalSlotProps: s,
      }),
    ),
    u = ut(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return Rm(
    o,
    v({}, l, {
      ref: u,
    }),
    i,
  );
}
function ss(e) {
  return e.substring(2).toLowerCase();
}
function km(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function Qo(e) {
  const {
      children: t,
      disableReactTree: o = !1,
      mouseEvent: r = 'onClick',
      onClickAway: i,
      touchEvent: a = 'onTouchEnd',
    } = e,
    s = E.useRef(!1),
    l = E.useRef(null),
    c = E.useRef(!1),
    u = E.useRef(!1);
  E.useEffect(
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
    p = yt((y) => {
      const h = u.current;
      u.current = !1;
      const m = st(l.current);
      if (!c.current || !l.current || ('clientX' in y && km(y, m))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let S;
      y.composedPath
        ? (S = y.composedPath().indexOf(l.current) > -1)
        : (S =
            !m.documentElement.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              y.target,
            ) ||
            l.current.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              y.target,
            )),
        !S && (o || !h) && i(y);
    }),
    b = (y) => (h) => {
      u.current = !0;
      const m = t.props[y];
      m && m(h);
    },
    g = {
      ref: d,
    };
  return (
    a !== !1 && (g[a] = b(a)),
    E.useEffect(() => {
      if (a !== !1) {
        const y = ss(a),
          h = st(l.current),
          m = () => {
            s.current = !0;
          };
        return (
          h.addEventListener(y, p),
          h.addEventListener('touchmove', m),
          () => {
            h.removeEventListener(y, p), h.removeEventListener('touchmove', m);
          }
        );
      }
    }, [p, a]),
    r !== !1 && (g[r] = b(r)),
    E.useEffect(() => {
      if (r !== !1) {
        const y = ss(r),
          h = st(l.current);
        return (
          h.addEventListener(y, p),
          () => {
            h.removeEventListener(y, p);
          }
        );
      }
    }, [p, r]),
    /* @__PURE__ */ A(E.Fragment, {
      children: /* @__PURE__ */ E.cloneElement(t, g),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (Qo.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * The wrapped element.
     */
    children: Gn.isRequired,
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
process.env.NODE_ENV !== 'production' && (Qo['propTypes'] = Oi(Qo.propTypes));
const Im = [
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
function _m(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function Mm(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function Am(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || Mm(e));
}
function Dm(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(Im)).forEach((r, i) => {
      const a = _m(r);
      a === -1 ||
        !Am(r) ||
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
function Lm() {
  return !0;
}
function er(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: i = !1,
      getTabbable: a = Dm,
      isEnabled: s = Lm,
      open: l,
    } = e,
    c = E.useRef(!1),
    u = E.useRef(null),
    d = E.useRef(null),
    p = E.useRef(null),
    b = E.useRef(null),
    g = E.useRef(!1),
    y = E.useRef(null),
    h = ut(t.ref, y),
    m = E.useRef(null);
  E.useEffect(() => {
    !l || !y.current || (g.current = !o);
  }, [o, l]),
    E.useEffect(() => {
      if (!l || !y.current) return;
      const O = st(y.current);
      return (
        y.current.contains(O.activeElement) ||
          (y.current.hasAttribute('tabIndex') ||
            (process.env.NODE_ENV !== 'production' &&
              console.error(
                [
                  'MUI: The modal content node does not accept focus.',
                  'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".',
                ].join(`
`),
              ),
            y.current.setAttribute('tabIndex', '-1')),
          g.current && y.current.focus()),
        () => {
          i ||
            (p.current && p.current.focus && ((c.current = !0), p.current.focus()),
            (p.current = null));
        }
      );
    }, [l]),
    E.useEffect(() => {
      if (!l || !y.current) return;
      const O = st(y.current),
        x = (w) => {
          const { current: z } = y;
          if (z !== null) {
            if (!O.hasFocus() || r || !s() || c.current) {
              c.current = !1;
              return;
            }
            if (!z.contains(O.activeElement)) {
              if ((w && b.current !== w.target) || O.activeElement !== b.current) b.current = null;
              else if (b.current !== null) return;
              if (!g.current) return;
              let _ = [];
              if (
                ((O.activeElement === u.current || O.activeElement === d.current) &&
                  (_ = a(y.current)),
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
              } else z.focus();
            }
          }
        },
        f = (w) => {
          (m.current = w),
            !(r || !s() || w.key !== 'Tab') &&
              O.activeElement === y.current &&
              w.shiftKey &&
              ((c.current = !0), d.current && d.current.focus());
        };
      O.addEventListener('focusin', x), O.addEventListener('keydown', f, !0);
      const R = setInterval(() => {
        O.activeElement && O.activeElement.tagName === 'BODY' && x(null);
      }, 50);
      return () => {
        clearInterval(R),
          O.removeEventListener('focusin', x),
          O.removeEventListener('keydown', f, !0);
      };
    }, [o, r, i, s, l, a]);
  const S = (O) => {
      p.current === null && (p.current = O.relatedTarget), (g.current = !0), (b.current = O.target);
      const x = t.props.onFocus;
      x && x(O);
    },
    C = (O) => {
      p.current === null && (p.current = O.relatedTarget), (g.current = !0);
    };
  return /* @__PURE__ */ Xe(E.Fragment, {
    children: [
      /* @__PURE__ */ A('div', {
        tabIndex: l ? 0 : -1,
        onFocus: C,
        ref: u,
        'data-testid': 'sentinelStart',
      }),
      /* @__PURE__ */ E.cloneElement(t, {
        ref: h,
        onFocus: S,
      }),
      /* @__PURE__ */ A('div', {
        tabIndex: l ? 0 : -1,
        onFocus: C,
        ref: d,
        'data-testid': 'sentinelEnd',
      }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (er.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: Gn,
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
process.env.NODE_ENV !== 'production' && (er['propTypes'] = Oi(er.propTypes));
var Tt = 'top',
  Dt = 'bottom',
  Lt = 'right',
  Ct = 'left',
  Rr = 'auto',
  Po = [Tt, Dt, Lt, Ct],
  Hn = 'start',
  xo = 'end',
  Fm = 'clippingParents',
  Bl = 'viewport',
  ao = 'popper',
  jm = 'reference',
  ls = /* @__PURE__ */ Po.reduce(function (e, t) {
    return e.concat([t + '-' + Hn, t + '-' + xo]);
  }, []),
  Ul = /* @__PURE__ */ [].concat(Po, [Rr]).reduce(function (e, t) {
    return e.concat([t, t + '-' + Hn, t + '-' + xo]);
  }, []),
  zm = 'beforeRead',
  Vm = 'read',
  Bm = 'afterRead',
  Um = 'beforeMain',
  Wm = 'main',
  Hm = 'afterMain',
  qm = 'beforeWrite',
  Ym = 'write',
  Km = 'afterWrite',
  li = [zm, Vm, Bm, Um, Wm, Hm, qm, Ym, Km];
function en(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function Ft(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function $n(e) {
  var t = Ft(e).Element;
  return e instanceof t || e instanceof Element;
}
function kt(e) {
  var t = Ft(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Vi(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Ft(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Gm(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      i = t.attributes[o] || {},
      a = t.elements[o];
    !kt(a) ||
      !en(a) ||
      (Object.assign(a.style, r),
      Object.keys(i).forEach(function (s) {
        var l = i[s];
        l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function Xm(e) {
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
        !kt(i) ||
          !en(i) ||
          (Object.assign(i.style, l),
          Object.keys(a).forEach(function (c) {
            i.removeAttribute(c);
          }));
      });
    }
  );
}
const Jm = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: Gm,
  effect: Xm,
  requires: ['computeStyles'],
};
function Ut(e) {
  return e.split('-')[0];
}
var Sn = Math.max,
  tr = Math.min,
  qn = Math.round;
function ci() {
  var e = navigator.userAgentData;
  return e != null && e.brands
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function Wl() {
  return !/^((?!chrome|android).)*safari/i.test(ci());
}
function Yn(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    i = 1,
    a = 1;
  t &&
    kt(e) &&
    ((i = (e.offsetWidth > 0 && qn(r.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && qn(r.height) / e.offsetHeight) || 1));
  var s = $n(e) ? Ft(e) : window,
    l = s.visualViewport,
    c = !Wl() && o,
    u = (r.left + (c && l ? l.offsetLeft : 0)) / i,
    d = (r.top + (c && l ? l.offsetTop : 0)) / a,
    p = r.width / i,
    b = r.height / a;
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
function Bi(e) {
  var t = Yn(e),
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
function Hl(e, t) {
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
function Ht(e) {
  return Ft(e).getComputedStyle(e);
}
function Zm(e) {
  return ['table', 'td', 'th'].indexOf(en(e)) >= 0;
}
function gn(e) {
  return (
    ($n(e)
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
        (Vi(e) ? e.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        gn(e);
}
function cs(e) {
  return !kt(e) || // https://github.com/popperjs/popper-core/issues/837
    Ht(e).position === 'fixed'
    ? null
    : e.offsetParent;
}
function Qm(e) {
  var t = /firefox/i.test(ci()),
    o = /Trident/i.test(ci());
  if (o && kt(e)) {
    var r = Ht(e);
    if (r.position === 'fixed') return null;
  }
  var i = wr(e);
  for (Vi(i) && (i = i.host); kt(i) && ['html', 'body'].indexOf(en(i)) < 0; ) {
    var a = Ht(i);
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
function No(e) {
  for (var t = Ft(e), o = cs(e); o && Zm(o) && Ht(o).position === 'static'; ) o = cs(o);
  return o && (en(o) === 'html' || (en(o) === 'body' && Ht(o).position === 'static'))
    ? t
    : o || Qm(e) || t;
}
function Ui(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function fo(e, t, o) {
  return Sn(e, tr(t, o));
}
function eh(e, t, o) {
  var r = fo(e, t, o);
  return r > o ? o : r;
}
function ql() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
function Yl(e) {
  return Object.assign({}, ql(), e);
}
function Kl(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var th = function (t, o) {
  return (
    (t =
      typeof t == 'function'
        ? t(
            Object.assign({}, o.rects, {
              placement: o.placement,
            }),
          )
        : t),
    Yl(typeof t != 'number' ? t : Kl(t, Po))
  );
};
function nh(e) {
  var t,
    o = e.state,
    r = e.name,
    i = e.options,
    a = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = Ut(o.placement),
    c = Ui(l),
    u = [Ct, Lt].indexOf(l) >= 0,
    d = u ? 'height' : 'width';
  if (!(!a || !s)) {
    var p = th(i.padding, o),
      b = Bi(a),
      g = c === 'y' ? Tt : Ct,
      y = c === 'y' ? Dt : Lt,
      h = o.rects.reference[d] + o.rects.reference[c] - s[c] - o.rects.popper[d],
      m = s[c] - o.rects.reference[c],
      S = No(a),
      C = S ? (c === 'y' ? S.clientHeight || 0 : S.clientWidth || 0) : 0,
      O = h / 2 - m / 2,
      x = p[g],
      f = C - b[d] - p[y],
      R = C / 2 - b[d] / 2 + O,
      w = fo(x, R, f),
      z = c;
    o.modifiersData[r] = ((t = {}), (t[z] = w), (t.centerOffset = w - R), t);
  }
}
function oh(e) {
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
      !Hl(t.elements.popper, i))
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
const rh = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: nh,
  effect: oh,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function Kn(e) {
  return e.split('-')[1];
}
var ih = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
};
function ah(e) {
  var t = e.x,
    o = e.y,
    r = window,
    i = r.devicePixelRatio || 1;
  return {
    x: qn(t * i) / i || 0,
    y: qn(o * i) / i || 0,
  };
}
function us(e) {
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
    b = s.x,
    g = b === void 0 ? 0 : b,
    y = s.y,
    h = y === void 0 ? 0 : y,
    m =
      typeof d == 'function'
        ? d({
            x: g,
            y: h,
          })
        : {
            x: g,
            y: h,
          };
  (g = m.x), (h = m.y);
  var S = s.hasOwnProperty('x'),
    C = s.hasOwnProperty('y'),
    O = Ct,
    x = Tt,
    f = window;
  if (u) {
    var R = No(o),
      w = 'clientHeight',
      z = 'clientWidth';
    if (
      (R === Ft(o) &&
        ((R = gn(o)),
        Ht(R).position !== 'static' &&
          l === 'absolute' &&
          ((w = 'scrollHeight'), (z = 'scrollWidth'))),
      (R = R),
      i === Tt || ((i === Ct || i === Lt) && a === xo))
    ) {
      x = Dt;
      var L =
        p && R === f && f.visualViewport
          ? f.visualViewport.height
          : // $FlowFixMe[prop-missing]
            R[w];
      (h -= L - r.height), (h *= c ? 1 : -1);
    }
    if (i === Ct || ((i === Tt || i === Dt) && a === xo)) {
      O = Lt;
      var D =
        p && R === f && f.visualViewport
          ? f.visualViewport.width
          : // $FlowFixMe[prop-missing]
            R[z];
      (g -= D - r.width), (g *= c ? 1 : -1);
    }
  }
  var _ = Object.assign(
      {
        position: l,
      },
      u && ih,
    ),
    Y =
      d === !0
        ? ah({
            x: g,
            y: h,
          })
        : {
            x: g,
            y: h,
          };
  if (((g = Y.x), (h = Y.y), c)) {
    var B;
    return Object.assign(
      {},
      _,
      ((B = {}),
      (B[x] = C ? '0' : ''),
      (B[O] = S ? '0' : ''),
      (B.transform =
        (f.devicePixelRatio || 1) <= 1
          ? 'translate(' + g + 'px, ' + h + 'px)'
          : 'translate3d(' + g + 'px, ' + h + 'px, 0)'),
      B),
    );
  }
  return Object.assign(
    {},
    _,
    ((t = {}), (t[x] = C ? h + 'px' : ''), (t[O] = S ? g + 'px' : ''), (t.transform = ''), t),
  );
}
function sh(e) {
  var t = e.state,
    o = e.options,
    r = o.gpuAcceleration,
    i = r === void 0 ? !0 : r,
    a = o.adaptive,
    s = a === void 0 ? !0 : a,
    l = o.roundOffsets,
    c = l === void 0 ? !0 : l;
  if (process.env.NODE_ENV !== 'production') {
    var u = Ht(t.elements.popper).transitionProperty || '';
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
    placement: Ut(t.placement),
    variation: Kn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      us(
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
        us(
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
const lh = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: sh,
  data: {},
};
var Ao = {
  passive: !0,
};
function ch(e) {
  var t = e.state,
    o = e.instance,
    r = e.options,
    i = r.scroll,
    a = i === void 0 ? !0 : i,
    s = r.resize,
    l = s === void 0 ? !0 : s,
    c = Ft(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      u.forEach(function (d) {
        d.addEventListener('scroll', o.update, Ao);
      }),
    l && c.addEventListener('resize', o.update, Ao),
    function () {
      a &&
        u.forEach(function (d) {
          d.removeEventListener('scroll', o.update, Ao);
        }),
        l && c.removeEventListener('resize', o.update, Ao);
    }
  );
}
const uh = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: ch,
  data: {},
};
var dh = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
function Yo(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return dh[t];
  });
}
var ph = {
  start: 'end',
  end: 'start',
};
function ds(e) {
  return e.replace(/start|end/g, function (t) {
    return ph[t];
  });
}
function Wi(e) {
  var t = Ft(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r,
  };
}
function Hi(e) {
  return Yn(gn(e)).left + Wi(e).scrollLeft;
}
function fh(e, t) {
  var o = Ft(e),
    r = gn(e),
    i = o.visualViewport,
    a = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (i) {
    (a = i.width), (s = i.height);
    var u = Wl();
    (u || (!u && t === 'fixed')) && ((l = i.offsetLeft), (c = i.offsetTop));
  }
  return {
    width: a,
    height: s,
    x: l + Hi(e),
    y: c,
  };
}
function mh(e) {
  var t,
    o = gn(e),
    r = Wi(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = Sn(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
    s = Sn(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
    l = -r.scrollLeft + Hi(e),
    c = -r.scrollTop;
  return (
    Ht(i || o).direction === 'rtl' && (l += Sn(o.clientWidth, i ? i.clientWidth : 0) - a),
    {
      width: a,
      height: s,
      x: l,
      y: c,
    }
  );
}
function qi(e) {
  var t = Ht(e),
    o = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function Gl(e) {
  return ['html', 'body', '#document'].indexOf(en(e)) >= 0
    ? e.ownerDocument.body
    : kt(e) && qi(e)
    ? e
    : Gl(wr(e));
}
function mo(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = Gl(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    a = Ft(r),
    s = i ? [a].concat(a.visualViewport || [], qi(r) ? r : []) : r,
    l = t.concat(s);
  return i
    ? l
    : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(mo(wr(s)));
}
function ui(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function hh(e, t) {
  var o = Yn(e, !1, t === 'fixed');
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
function ps(e, t, o) {
  return t === Bl ? ui(fh(e, o)) : $n(t) ? hh(t, o) : ui(mh(gn(e)));
}
function bh(e) {
  var t = mo(wr(e)),
    o = ['absolute', 'fixed'].indexOf(Ht(e).position) >= 0,
    r = o && kt(e) ? No(e) : e;
  return $n(r)
    ? t.filter(function (i) {
        return $n(i) && Hl(i, r) && en(i) !== 'body';
      })
    : [];
}
function vh(e, t, o, r) {
  var i = t === 'clippingParents' ? bh(e) : [].concat(t),
    a = [].concat(i, [o]),
    s = a[0],
    l = a.reduce(function (c, u) {
      var d = ps(e, u, r);
      return (
        (c.top = Sn(d.top, c.top)),
        (c.right = tr(d.right, c.right)),
        (c.bottom = tr(d.bottom, c.bottom)),
        (c.left = Sn(d.left, c.left)),
        c
      );
    }, ps(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function Xl(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    i = r ? Ut(r) : null,
    a = r ? Kn(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (i) {
    case Tt:
      c = {
        x: s,
        y: t.y - o.height,
      };
      break;
    case Dt:
      c = {
        x: s,
        y: t.y + t.height,
      };
      break;
    case Lt:
      c = {
        x: t.x + t.width,
        y: l,
      };
      break;
    case Ct:
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
  var u = i ? Ui(i) : null;
  if (u != null) {
    var d = u === 'y' ? 'height' : 'width';
    switch (a) {
      case Hn:
        c[u] = c[u] - (t[d] / 2 - o[d] / 2);
        break;
      case xo:
        c[u] = c[u] + (t[d] / 2 - o[d] / 2);
        break;
    }
  }
  return c;
}
function Oo(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = r === void 0 ? e.placement : r,
    a = o.strategy,
    s = a === void 0 ? e.strategy : a,
    l = o.boundary,
    c = l === void 0 ? Fm : l,
    u = o.rootBoundary,
    d = u === void 0 ? Bl : u,
    p = o.elementContext,
    b = p === void 0 ? ao : p,
    g = o.altBoundary,
    y = g === void 0 ? !1 : g,
    h = o.padding,
    m = h === void 0 ? 0 : h,
    S = Yl(typeof m != 'number' ? m : Kl(m, Po)),
    C = b === ao ? jm : ao,
    O = e.rects.popper,
    x = e.elements[y ? C : b],
    f = vh($n(x) ? x : x.contextElement || gn(e.elements.popper), c, d, s),
    R = Yn(e.elements.reference),
    w = Xl({
      reference: R,
      element: O,
      strategy: 'absolute',
      placement: i,
    }),
    z = ui(Object.assign({}, O, w)),
    L = b === ao ? z : R,
    D = {
      top: f.top - L.top + S.top,
      bottom: L.bottom - f.bottom + S.bottom,
      left: f.left - L.left + S.left,
      right: L.right - f.right + S.right,
    },
    _ = e.modifiersData.offset;
  if (b === ao && _) {
    var Y = _[i];
    Object.keys(D).forEach(function (B) {
      var M = [Lt, Dt].indexOf(B) >= 0 ? 1 : -1,
        F = [Tt, Dt].indexOf(B) >= 0 ? 'y' : 'x';
      D[B] += Y[F] * M;
    });
  }
  return D;
}
function gh(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = o.boundary,
    a = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    u = c === void 0 ? Ul : c,
    d = Kn(r),
    p = d
      ? l
        ? ls
        : ls.filter(function (y) {
            return Kn(y) === d;
          })
      : Po,
    b = p.filter(function (y) {
      return u.indexOf(y) >= 0;
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
  var g = b.reduce(function (y, h) {
    return (
      (y[h] = Oo(e, {
        placement: h,
        boundary: i,
        rootBoundary: a,
        padding: s,
      })[Ut(h)]),
      y
    );
  }, {});
  return Object.keys(g).sort(function (y, h) {
    return g[y] - g[h];
  });
}
function yh(e) {
  if (Ut(e) === Rr) return [];
  var t = Yo(e);
  return [ds(e), t, ds(t)];
}
function Eh(e) {
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
        b = o.altBoundary,
        g = o.flipVariations,
        y = g === void 0 ? !0 : g,
        h = o.allowedAutoPlacements,
        m = t.options.placement,
        S = Ut(m),
        C = S === m,
        O = c || (C || !y ? [Yo(m)] : yh(m)),
        x = [m].concat(O).reduce(function (U, ne) {
          return U.concat(
            Ut(ne) === Rr
              ? gh(t, {
                  placement: ne,
                  boundary: d,
                  rootBoundary: p,
                  padding: u,
                  flipVariations: y,
                  allowedAutoPlacements: h,
                })
              : ne,
          );
        }, []),
        f = t.rects.reference,
        R = t.rects.popper,
        w = /* @__PURE__ */ new Map(),
        z = !0,
        L = x[0],
        D = 0;
      D < x.length;
      D++
    ) {
      var _ = x[D],
        Y = Ut(_),
        B = Kn(_) === Hn,
        M = [Tt, Dt].indexOf(Y) >= 0,
        F = M ? 'width' : 'height',
        V = Oo(t, {
          placement: _,
          boundary: d,
          rootBoundary: p,
          altBoundary: b,
          padding: u,
        }),
        ae = M ? (B ? Lt : Ct) : B ? Dt : Tt;
      f[F] > R[F] && (ae = Yo(ae));
      var se = Yo(ae),
        G = [];
      if (
        (a && G.push(V[Y] <= 0),
        l && G.push(V[ae] <= 0, V[se] <= 0),
        G.every(function (U) {
          return U;
        }))
      ) {
        (L = _), (z = !1);
        break;
      }
      w.set(_, G);
    }
    if (z)
      for (
        var $ = y ? 3 : 1,
          j = function (ne) {
            var oe = x.find(function (J) {
              var ie = w.get(J);
              if (ie)
                return ie.slice(0, ne).every(function (le) {
                  return le;
                });
            });
            if (oe) return (L = oe), 'break';
          },
          X = $;
        X > 0;
        X--
      ) {
        var H = j(X);
        if (H === 'break') break;
      }
    t.placement !== L && ((t.modifiersData[r]._skip = !0), (t.placement = L), (t.reset = !0));
  }
}
const xh = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: Eh,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1,
  },
};
function fs(e, t, o) {
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
function ms(e) {
  return [Tt, Lt, Dt, Ct].some(function (t) {
    return e[t] >= 0;
  });
}
function Oh(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = Oo(t, {
      elementContext: 'reference',
    }),
    l = Oo(t, {
      altBoundary: !0,
    }),
    c = fs(s, r),
    u = fs(l, i, a),
    d = ms(c),
    p = ms(u);
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
const Th = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: Oh,
};
function Ch(e, t, o) {
  var r = Ut(e),
    i = [Ct, Tt].indexOf(r) >= 0 ? -1 : 1,
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
    [Ct, Lt].indexOf(r) >= 0
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
function Sh(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.offset,
    a = i === void 0 ? [0, 0] : i,
    s = Ul.reduce(function (d, p) {
      return (d[p] = Ch(p, t.rects, a)), d;
    }, {}),
    l = s[t.placement],
    c = l.x,
    u = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = s);
}
const Rh = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: Sh,
};
function wh(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = Xl({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const $h = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: wh,
  data: {},
};
function Ph(e) {
  return e === 'x' ? 'y' : 'x';
}
function Nh(e) {
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
    b = o.tether,
    g = b === void 0 ? !0 : b,
    y = o.tetherOffset,
    h = y === void 0 ? 0 : y,
    m = Oo(t, {
      boundary: c,
      rootBoundary: u,
      padding: p,
      altBoundary: d,
    }),
    S = Ut(t.placement),
    C = Kn(t.placement),
    O = !C,
    x = Ui(S),
    f = Ph(x),
    R = t.modifiersData.popperOffsets,
    w = t.rects.reference,
    z = t.rects.popper,
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
  if (R) {
    if (a) {
      var B,
        M = x === 'y' ? Tt : Ct,
        F = x === 'y' ? Dt : Lt,
        V = x === 'y' ? 'height' : 'width',
        ae = R[x],
        se = ae + m[M],
        G = ae - m[F],
        $ = g ? -z[V] / 2 : 0,
        j = C === Hn ? w[V] : z[V],
        X = C === Hn ? -z[V] : -w[V],
        H = t.elements.arrow,
        U =
          g && H
            ? Bi(H)
            : {
                width: 0,
                height: 0,
              },
        ne = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : ql(),
        oe = ne[M],
        J = ne[F],
        ie = fo(0, w[V], U[V]),
        le = O ? w[V] / 2 - $ - ie - oe - D.mainAxis : j - ie - oe - D.mainAxis,
        he = O ? -w[V] / 2 + $ + ie + J + D.mainAxis : X + ie + J + D.mainAxis,
        re = t.elements.arrow && No(t.elements.arrow),
        k = re ? (x === 'y' ? re.clientTop || 0 : re.clientLeft || 0) : 0,
        Te = (B = _ == null ? void 0 : _[x]) != null ? B : 0,
        I = ae + le - Te - k,
        W = ae + he - Te,
        $e = fo(g ? tr(se, I) : se, ae, g ? Sn(G, W) : G);
      (R[x] = $e), (Y[x] = $e - ae);
    }
    if (l) {
      var ve,
        Je = x === 'x' ? Tt : Ct,
        De = x === 'x' ? Dt : Lt,
        Ce = R[f],
        Re = f === 'y' ? 'height' : 'width',
        Ze = Ce + m[Je],
        ot = Ce - m[De],
        Z = [Tt, Ct].indexOf(S) !== -1,
        me = (ve = _ == null ? void 0 : _[f]) != null ? ve : 0,
        ge = Z ? Ze : Ce - w[Re] - z[Re] - me + D.altAxis,
        be = Z ? Ce + w[Re] + z[Re] - me - D.altAxis : ot,
        fe = g && Z ? eh(ge, Ce, be) : fo(g ? ge : Ze, Ce, g ? be : ot);
      (R[f] = fe), (Y[f] = fe - Ce);
    }
    t.modifiersData[r] = Y;
  }
}
const kh = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: Nh,
  requiresIfExists: ['offset'],
};
function Ih(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop,
  };
}
function _h(e) {
  return e === Ft(e) || !kt(e) ? Wi(e) : Ih(e);
}
function Mh(e) {
  var t = e.getBoundingClientRect(),
    o = qn(t.width) / e.offsetWidth || 1,
    r = qn(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function Ah(e, t, o) {
  o === void 0 && (o = !1);
  var r = kt(t),
    i = kt(t) && Mh(t),
    a = gn(t),
    s = Yn(e, i, o),
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
        qi(a)) &&
        (l = _h(t)),
      kt(t) ? ((c = Yn(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : a && (c.x = Hi(a))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function Dh(e) {
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
function Lh(e) {
  var t = Dh(e);
  return li.reduce(function (o, r) {
    return o.concat(
      t.filter(function (i) {
        return i.phase === r;
      }),
    );
  }, []);
}
function Fh(e) {
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
function pn(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    o[r - 1] = arguments[r];
  return [].concat(o).reduce(function (i, a) {
    return i.replace(/%s/, a);
  }, e);
}
var En = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  jh = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  hs = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function zh(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), hs)
      .filter(function (o, r, i) {
        return i.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                pn(En, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                pn(En, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            li.indexOf(t.phase) < 0 &&
              console.error(
                pn(En, t.name, '"phase"', 'either ' + li.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(pn(En, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(pn(En, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                pn(En, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                pn(
                  En,
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
                hs
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
            }) == null && console.error(pn(jh, String(t.name), r, r));
          });
      });
  });
}
function Vh(e, t) {
  var o = /* @__PURE__ */ new Set();
  return e.filter(function (r) {
    var i = t(r);
    if (!o.has(i)) return o.add(i), !0;
  });
}
function Bh(e) {
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
var bs =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Uh =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  vs = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute',
  };
function gs() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function Wh(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    i = t.defaultOptions,
    a = i === void 0 ? vs : i;
  return function (l, c, u) {
    u === void 0 && (u = a);
    var d = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, vs, a),
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
      g = {
        state: d,
        setOptions: function (S) {
          var C = typeof S == 'function' ? S(d.options) : S;
          h(),
            (d.options = Object.assign({}, a, d.options, C)),
            (d.scrollParents = {
              reference: $n(l) ? mo(l) : l.contextElement ? mo(l.contextElement) : [],
              popper: mo(c),
            });
          var O = Lh(Bh([].concat(r, d.options.modifiers)));
          if (
            ((d.orderedModifiers = O.filter(function (_) {
              return _.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var x = Vh([].concat(O, d.options.modifiers), function (_) {
              var Y = _.name;
              return Y;
            });
            if ((zh(x), Ut(d.options.placement) === Rr)) {
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
            var R = Ht(c),
              w = R.marginTop,
              z = R.marginRight,
              L = R.marginBottom,
              D = R.marginLeft;
            [w, z, L, D].some(function (_) {
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
          return y(), g.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function () {
          if (!b) {
            var S = d.elements,
              C = S.reference,
              O = S.popper;
            if (!gs(C, O)) {
              process.env.NODE_ENV !== 'production' && console.error(bs);
              return;
            }
            (d.rects = {
              reference: Ah(C, No(O), d.options.strategy === 'fixed'),
              popper: Bi(O),
            }),
              (d.reset = !1),
              (d.placement = d.options.placement),
              d.orderedModifiers.forEach(function (_) {
                return (d.modifiersData[_.name] = Object.assign({}, _.data));
              });
            for (var x = 0, f = 0; f < d.orderedModifiers.length; f++) {
              if (process.env.NODE_ENV !== 'production' && ((x += 1), x > 100)) {
                console.error(Uh);
                break;
              }
              if (d.reset === !0) {
                (d.reset = !1), (f = -1);
                continue;
              }
              var R = d.orderedModifiers[f],
                w = R.fn,
                z = R.options,
                L = z === void 0 ? {} : z,
                D = R.name;
              typeof w == 'function' &&
                (d =
                  w({
                    state: d,
                    options: L,
                    name: D,
                    instance: g,
                  }) || d);
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: Fh(function () {
          return new Promise(function (m) {
            g.forceUpdate(), m(d);
          });
        }),
        destroy: function () {
          h(), (b = !0);
        },
      };
    if (!gs(l, c)) return process.env.NODE_ENV !== 'production' && console.error(bs), g;
    g.setOptions(u).then(function (m) {
      !b && u.onFirstUpdate && u.onFirstUpdate(m);
    });
    function y() {
      d.orderedModifiers.forEach(function (m) {
        var S = m.name,
          C = m.options,
          O = C === void 0 ? {} : C,
          x = m.effect;
        if (typeof x == 'function') {
          var f = x({
              state: d,
              name: S,
              instance: g,
              options: O,
            }),
            R = function () {};
          p.push(f || R);
        }
      });
    }
    function h() {
      p.forEach(function (m) {
        return m();
      }),
        (p = []);
    }
    return g;
  };
}
var Hh = [uh, $h, lh, Jm, Rh, xh, kh, rh, Th],
  qh = /* @__PURE__ */ Wh({
    defaultModifiers: Hh,
  });
function Yh(e) {
  return typeof e == 'function' ? e() : e;
}
const nr = /* @__PURE__ */ E.forwardRef(function (t, o) {
  const { children: r, container: i, disablePortal: a = !1 } = t,
    [s, l] = E.useState(null),
    c = ut(/* @__PURE__ */ E.isValidElement(r) ? r.ref : null, o);
  if (
    (ln(() => {
      a || l(Yh(i) || document.body);
    }, [i, a]),
    ln(() => {
      if (s && !a)
        return (
          Go(o, s),
          () => {
            Go(o, null);
          }
        );
    }, [o, s, a]),
    a)
  ) {
    if (/* @__PURE__ */ E.isValidElement(r)) {
      const u = {
        ref: c,
      };
      return /* @__PURE__ */ E.cloneElement(r, u);
    }
    return /* @__PURE__ */ A(E.Fragment, {
      children: r,
    });
  }
  return /* @__PURE__ */ A(E.Fragment, {
    children: s && /* @__PURE__ */ ol.createPortal(r, s),
  });
});
process.env.NODE_ENV !== 'production' &&
  (nr.propTypes = {
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
    container: n.oneOfType([Zt, n.func]),
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (nr['propTypes'] = Oi(nr.propTypes));
const Jl = nr;
function Kh(e) {
  return _e('MuiPopper', e);
}
Ae('MuiPopper', ['root']);
const Gh = [
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
  Xh = [
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
function Jh(e, t) {
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
function or(e) {
  return typeof e == 'function' ? e() : e;
}
function $r(e) {
  return e.nodeType !== void 0;
}
function Zh(e) {
  return !$r(e);
}
const Qh = () =>
    Fe(
      {
        root: ['root'],
      },
      zl(Kh),
    ),
  eb = {},
  tb = /* @__PURE__ */ E.forwardRef(function (t, o) {
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
        placement: b,
        popperOptions: g,
        popperRef: y,
        slotProps: h = {},
        slots: m = {},
        TransitionProps: S,
      } = t,
      C = xe(t, Gh),
      O = E.useRef(null),
      x = ut(O, o),
      f = E.useRef(null),
      R = ut(f, y),
      w = E.useRef(R);
    ln(() => {
      w.current = R;
    }, [R]),
      E.useImperativeHandle(y, () => f.current, []);
    const z = Jh(b, l),
      [L, D] = E.useState(z),
      [_, Y] = E.useState(or(i));
    E.useEffect(() => {
      f.current && f.current.forceUpdate();
    }),
      E.useEffect(() => {
        i && Y(or(i));
      }, [i]),
      ln(() => {
        if (!_ || !d) return;
        const ae = ($) => {
          D($.placement);
        };
        if (process.env.NODE_ENV !== 'production' && _ && $r(_) && _.nodeType === 1) {
          const $ = _.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            $.top === 0 &&
            $.left === 0 &&
            $.right === 0 &&
            $.bottom === 0 &&
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
            fn: ({ state: $ }) => {
              ae($);
            },
          },
        ];
        u != null && (se = se.concat(u)), g && g.modifiers != null && (se = se.concat(g.modifiers));
        const G = qh(
          _,
          O.current,
          v(
            {
              placement: z,
            },
            g,
            {
              modifiers: se,
            },
          ),
        );
        return (
          w.current(G),
          () => {
            G.destroy(), w.current(null);
          }
        );
      }, [_, c, u, d, g, z]);
    const B = {
      placement: L,
    };
    S !== null && (B.TransitionProps = S);
    const M = Qh(),
      F = (r = s ?? m.root) != null ? r : 'div',
      V = _t({
        elementType: F,
        externalSlotProps: h.root,
        externalForwardedProps: C,
        additionalProps: {
          role: 'tooltip',
          ref: x,
        },
        ownerState: v({}, t, p),
        className: M.root,
      });
    return /* @__PURE__ */ A(
      F,
      v({}, V, {
        children: typeof a == 'function' ? a(B) : a,
      }),
    );
  }),
  Zl = /* @__PURE__ */ E.forwardRef(function (t, o) {
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
        popperOptions: b = eb,
        popperRef: g,
        style: y,
        transition: h = !1,
        slotProps: m = {},
        slots: S = {},
      } = t,
      C = xe(t, Xh),
      [O, x] = E.useState(!0),
      f = () => {
        x(!1);
      },
      R = () => {
        x(!0);
      };
    if (!c && !d && (!h || O)) return null;
    let w;
    if (a) w = a;
    else if (r) {
      const D = or(r);
      w = D && $r(D) ? st(D).body : st(null).body;
    }
    const z = !d && c && (!h || O) ? 'none' : void 0,
      L = h
        ? {
            in: d,
            onEnter: f,
            onExited: R,
          }
        : void 0;
    return /* @__PURE__ */ A(Jl, {
      disablePortal: l,
      container: w,
      children: /* @__PURE__ */ A(
        tb,
        v(
          {
            anchorEl: r,
            direction: s,
            disablePortal: l,
            modifiers: u,
            ref: o,
            open: h ? !O : d,
            placement: p,
            popperOptions: b,
            popperRef: g,
            slotProps: m,
            slots: S,
          },
          C,
          {
            style: v(
              {
                // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
                position: 'fixed',
                // Fix Popper.js display issue
                top: 0,
                left: 0,
                display: z,
              },
              y,
            ),
            TransitionProps: L,
            children: i,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Zl.propTypes = {
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
    anchorEl: Wt(n.oneOfType([Zt, n.object, n.func]), (e) => {
      if (e.open) {
        const t = or(e.anchorEl);
        if (t && $r(t) && t.nodeType === 1) {
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
          (Zh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    container: n.oneOfType([Zt, n.func]),
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
    popperRef: Rt,
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
const nb = Zl;
function ob(e) {
  const t = st(e);
  return t.body === e
    ? Rn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function ho(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function ys(e) {
  return parseInt(Rn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function rb(e) {
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
function Es(e, t, o, r, i) {
  const a = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1,
      c = !rb(s);
    l && c && ho(s, i);
  });
}
function Hr(e, t) {
  let o = -1;
  return e.some((r, i) => (t(r) ? ((o = i), !0) : !1)), o;
}
function ib(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (ob(r)) {
      const s = fl(st(r));
      o.push({
        value: r.style.paddingRight,
        property: 'padding-right',
        el: r,
      }),
        (r.style.paddingRight = `${ys(r) + s}px`);
      const l = st(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({
          value: c.style.paddingRight,
          property: 'padding-right',
          el: c,
        }),
          (c.style.paddingRight = `${ys(c) + s}px`);
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment) a = st(r).body;
    else {
      const s = r.parentElement,
        l = Rn(r);
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
function ab(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class sb {
  constructor() {
    (this.containers = void 0), (this.modals = void 0), (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && ho(t.modalRef, !1);
    const i = ab(o);
    Es(o, t.mount, t.modalRef, i, !0);
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
    i.restore || (i.restore = ib(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const i = Hr(this.containers, (s) => s.modals.indexOf(t) !== -1),
      a = this.containers[i];
    if ((a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0))
      a.restore && a.restore(),
        t.modalRef && ho(t.modalRef, o),
        Es(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1),
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
function lb(e) {
  return _e('MuiModal', e);
}
Ae('MuiModal', ['root', 'hidden', 'backdrop']);
const cb = [
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
  ub = (e) => {
    const { open: t, exited: o } = e;
    return Fe(
      {
        root: ['root', !t && o && 'hidden'],
        backdrop: ['backdrop'],
      },
      zl(lb),
    );
  };
function db(e) {
  return typeof e == 'function' ? e() : e;
}
function pb(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const fb = new sb(),
  Ql = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r, i;
    const {
        children: a,
        closeAfterTransition: s = !1,
        component: l,
        container: c,
        disableAutoFocus: u = !1,
        disableEnforceFocus: d = !1,
        disableEscapeKeyDown: p = !1,
        disablePortal: b = !1,
        disableRestoreFocus: g = !1,
        disableScrollLock: y = !1,
        hideBackdrop: h = !1,
        keepMounted: m = !1,
        // private
        manager: S = fb,
        onBackdropClick: C,
        onClose: O,
        onKeyDown: x,
        open: f,
        onTransitionEnter: R,
        onTransitionExited: w,
        slotProps: z = {},
        slots: L = {},
      } = t,
      D = xe(t, cb),
      [_, Y] = E.useState(!f),
      B = E.useRef({}),
      M = E.useRef(null),
      F = E.useRef(null),
      V = ut(F, o),
      ae = pb(a),
      se = (r = t['aria-hidden']) != null ? r : !0,
      G = () => st(M.current),
      $ = () => ((B.current.modalRef = F.current), (B.current.mountNode = M.current), B.current),
      j = () => {
        S.mount($(), {
          disableScrollLock: y,
        }),
          F.current && (F.current.scrollTop = 0);
      },
      X = yt(() => {
        const ve = db(c) || G().body;
        S.add($(), ve), F.current && j();
      }),
      H = E.useCallback(() => S.isTopModal($()), [S]),
      U = yt((ve) => {
        (M.current = ve), !(!ve || !F.current) && (f && H() ? j() : ho(F.current, se));
      }),
      ne = E.useCallback(() => {
        S.remove($(), se);
      }, [S, se]);
    E.useEffect(
      () => () => {
        ne();
      },
      [ne],
    ),
      E.useEffect(() => {
        f ? X() : (!ae || !s) && ne();
      }, [f, ne, ae, s, X]);
    const oe = v({}, t, {
        closeAfterTransition: s,
        disableAutoFocus: u,
        disableEnforceFocus: d,
        disableEscapeKeyDown: p,
        disablePortal: b,
        disableRestoreFocus: g,
        disableScrollLock: y,
        exited: _,
        hideBackdrop: h,
        keepMounted: m,
      }),
      J = ub(oe),
      ie = () => {
        Y(!1), R && R();
      },
      le = () => {
        Y(!0), w && w(), s && ne();
      },
      he = (ve) => {
        ve.target === ve.currentTarget && (C && C(ve), O && O(ve, 'backdropClick'));
      },
      re = (ve) => {
        x && x(ve),
          !(ve.key !== 'Escape' || !H()) &&
            (p || (ve.stopPropagation(), O && O(ve, 'escapeKeyDown')));
      },
      k = {};
    a.props.tabIndex === void 0 && (k.tabIndex = '-1'),
      ae && ((k.onEnter = Sa(ie, a.props.onEnter)), (k.onExited = Sa(le, a.props.onExited)));
    const Te = (i = l ?? L.root) != null ? i : 'div',
      I = _t({
        elementType: Te,
        externalSlotProps: z.root,
        externalForwardedProps: D,
        additionalProps: {
          ref: V,
          role: 'presentation',
          onKeyDown: re,
        },
        className: J.root,
        ownerState: oe,
      }),
      W = L.backdrop,
      $e = _t({
        elementType: W,
        externalSlotProps: z.backdrop,
        additionalProps: {
          'aria-hidden': !0,
          onClick: he,
          open: f,
        },
        className: J.backdrop,
        ownerState: oe,
      });
    return !m && !f && (!ae || _)
      ? null
      : /* @__PURE__ */ A(Jl, {
          ref: U,
          container: c,
          disablePortal: b,
          children: /* @__PURE__ */ Xe(
            Te,
            v({}, I, {
              children: [
                !h && W ? /* @__PURE__ */ A(W, v({}, $e)) : null,
                /* @__PURE__ */ A(er, {
                  disableEnforceFocus: d,
                  disableAutoFocus: u,
                  disableRestoreFocus: g,
                  isEnabled: H,
                  open: f,
                  children: /* @__PURE__ */ E.cloneElement(a, k),
                }),
              ],
            }),
          ),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (Ql.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: Gn.isRequired,
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
    container: n.oneOfType([Zt, n.func]),
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
const mb = Ql,
  hb = 2;
function ec(e, t) {
  return e - t;
}
function so(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function xs(e, t) {
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
function Do(e, t) {
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
function rr(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function bb(e, t, o) {
  return (o - t) * e + t;
}
function vb(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function gb(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(vb(t)));
}
function Os({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(ec);
}
function Lo({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, i;
  const a = st(e.current);
  if (
    !((r = e.current) != null && r.contains(a.activeElement)) ||
    Number(a == null || (i = a.activeElement) == null ? void 0 : i.getAttribute('data-index')) !== t
  ) {
    var s;
    (s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  o && o(t);
}
const yb = {
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
  Eb = (e) => e;
let Fo;
function qr() {
  return (
    Fo === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Fo = CSS.supports('touch-action', 'none'))
        : (Fo = !0)),
    Fo
  );
}
function xb(e) {
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
      orientation: b = 'horizontal',
      ref: g,
      scale: y = Eb,
      step: h = 1,
      tabIndex: m,
      value: S,
    } = e,
    C = E.useRef(),
    [O, x] = E.useState(-1),
    [f, R] = E.useState(-1),
    [w, z] = E.useState(!1),
    L = E.useRef(0),
    [D, _] = Cn({
      controlled: S,
      default: o ?? c,
      name: 'Slider',
    }),
    Y =
      d &&
      ((Z, me, ge) => {
        const be = Z.nativeEvent || Z,
          fe = new be.constructor(be.type, be);
        Object.defineProperty(fe, 'target', {
          writable: !0,
          value: {
            value: me,
            name: u,
          },
        }),
          d(fe, me, ge);
      }),
    B = Array.isArray(D);
  let M = B ? D.slice().sort(ec) : [D];
  M = M.map((Z) => so(Z, c, l));
  const F =
      s === !0 && h !== null
        ? [...Array(Math.floor((l - c) / h) + 1)].map((Z, me) => ({
            value: c + h * me,
          }))
        : s || [],
    V = F.map((Z) => Z.value),
    { isFocusVisibleRef: ae, onBlur: se, onFocus: G, ref: $ } = pl(),
    [j, X] = E.useState(-1),
    H = E.useRef(),
    U = ut($, H),
    ne = ut(g, U),
    oe = (Z) => (me) => {
      var ge;
      const be = Number(me.currentTarget.getAttribute('data-index'));
      G(me),
        ae.current === !0 && X(be),
        R(be),
        Z == null || (ge = Z.onFocus) == null || ge.call(Z, me);
    },
    J = (Z) => (me) => {
      var ge;
      se(me),
        ae.current === !1 && X(-1),
        R(-1),
        Z == null || (ge = Z.onBlur) == null || ge.call(Z, me);
    };
  ln(() => {
    if (r && H.current.contains(document.activeElement)) {
      var Z;
      (Z = document.activeElement) == null || Z.blur();
    }
  }, [r]),
    r && O !== -1 && x(-1),
    r && j !== -1 && X(-1);
  const ie = (Z) => (me) => {
      var ge;
      (ge = Z.onChange) == null || ge.call(Z, me);
      const be = Number(me.currentTarget.getAttribute('data-index')),
        fe = M[be],
        ue = V.indexOf(fe);
      let ee = me.target.valueAsNumber;
      if (
        (F && h == null && (ee = ee < fe ? V[ue - 1] : V[ue + 1]),
        (ee = so(ee, c, l)),
        F && h == null)
      ) {
        const ye = V.indexOf(M[be]);
        ee = ee < M[be] ? V[ye - 1] : V[ye + 1];
      }
      if (B) {
        i && (ee = so(ee, M[be - 1] || -1 / 0, M[be + 1] || 1 / 0));
        const ye = ee;
        ee = Os({
          values: M,
          newValue: ee,
          index: be,
        });
        let Ee = be;
        i || (Ee = ee.indexOf(ye)),
          Lo({
            sliderRef: H,
            activeIndex: Ee,
          });
      }
      _(ee), X(be), Y && Y(me, ee, be), p && p(me, ee);
    },
    le = E.useRef();
  let he = b;
  a && b === 'horizontal' && (he += '-reverse');
  const re = ({ finger: Z, move: me = !1 }) => {
      const { current: ge } = H,
        { width: be, height: fe, bottom: ue, left: ee } = ge.getBoundingClientRect();
      let ye;
      he.indexOf('vertical') === 0 ? (ye = (ue - Z.y) / fe) : (ye = (Z.x - ee) / be),
        he.indexOf('-reverse') !== -1 && (ye = 1 - ye);
      let Ee;
      if (((Ee = bb(ye, c, l)), h)) Ee = gb(Ee, h, c);
      else {
        const rt = xs(V, Ee);
        Ee = V[rt];
      }
      Ee = so(Ee, c, l);
      let Ne = 0;
      if (B) {
        me ? (Ne = le.current) : (Ne = xs(M, Ee)),
          i && (Ee = so(Ee, M[Ne - 1] || -1 / 0, M[Ne + 1] || 1 / 0));
        const rt = Ee;
        (Ee = Os({
          values: M,
          newValue: Ee,
          index: Ne,
        })),
          (i && me) || ((Ne = Ee.indexOf(rt)), (le.current = Ne));
      }
      return {
        newValue: Ee,
        activeIndex: Ne,
      };
    },
    k = yt((Z) => {
      const me = Do(Z, C);
      if (!me) return;
      if (((L.current += 1), Z.type === 'mousemove' && Z.buttons === 0)) {
        Te(Z);
        return;
      }
      const { newValue: ge, activeIndex: be } = re({
        finger: me,
        move: !0,
      });
      Lo({
        sliderRef: H,
        activeIndex: be,
        setActive: x,
      }),
        _(ge),
        !w && L.current > hb && z(!0),
        Y && ge !== D && Y(Z, ge, be);
    }),
    Te = yt((Z) => {
      const me = Do(Z, C);
      if ((z(!1), !me)) return;
      const { newValue: ge } = re({
        finger: me,
        move: !0,
      });
      x(-1), Z.type === 'touchend' && R(-1), p && p(Z, ge), (C.current = void 0), W();
    }),
    I = yt((Z) => {
      if (r) return;
      qr() || Z.preventDefault();
      const me = Z.changedTouches[0];
      me != null && (C.current = me.identifier);
      const ge = Do(Z, C);
      if (ge !== !1) {
        const { newValue: fe, activeIndex: ue } = re({
          finger: ge,
        });
        Lo({
          sliderRef: H,
          activeIndex: ue,
          setActive: x,
        }),
          _(fe),
          Y && Y(Z, fe, ue);
      }
      L.current = 0;
      const be = st(H.current);
      be.addEventListener('touchmove', k), be.addEventListener('touchend', Te);
    }),
    W = E.useCallback(() => {
      const Z = st(H.current);
      Z.removeEventListener('mousemove', k),
        Z.removeEventListener('mouseup', Te),
        Z.removeEventListener('touchmove', k),
        Z.removeEventListener('touchend', Te);
    }, [Te, k]);
  E.useEffect(() => {
    const { current: Z } = H;
    return (
      Z.addEventListener('touchstart', I, {
        passive: qr(),
      }),
      () => {
        Z.removeEventListener('touchstart', I, {
          passive: qr(),
        }),
          W();
      }
    );
  }, [W, I]),
    E.useEffect(() => {
      r && W();
    }, [r, W]);
  const $e = (Z) => (me) => {
      var ge;
      if (
        ((ge = Z.onMouseDown) == null || ge.call(Z, me),
        r || me.defaultPrevented || me.button !== 0)
      )
        return;
      me.preventDefault();
      const be = Do(me, C);
      if (be !== !1) {
        const { newValue: ue, activeIndex: ee } = re({
          finger: be,
        });
        Lo({
          sliderRef: H,
          activeIndex: ee,
          setActive: x,
        }),
          _(ue),
          Y && Y(me, ue, ee);
      }
      L.current = 0;
      const fe = st(H.current);
      fe.addEventListener('mousemove', k), fe.addEventListener('mouseup', Te);
    },
    ve = rr(B ? M[0] : c, c, l),
    Je = rr(M[M.length - 1], c, l) - ve,
    De = (Z = {}) => {
      const me = {
          onMouseDown: $e(Z || {}),
        },
        ge = v({}, Z, me);
      return v(
        {
          ref: ne,
        },
        ge,
      );
    },
    Ce = (Z) => (me) => {
      var ge;
      (ge = Z.onMouseOver) == null || ge.call(Z, me);
      const be = Number(me.currentTarget.getAttribute('data-index'));
      R(be);
    },
    Re = (Z) => (me) => {
      var ge;
      (ge = Z.onMouseLeave) == null || ge.call(Z, me), R(-1);
    };
  return {
    active: O,
    axis: he,
    axisProps: yb,
    dragging: w,
    focusedThumbIndex: j,
    getHiddenInputProps: (Z = {}) => {
      var me;
      const ge = {
          onChange: ie(Z || {}),
          onFocus: oe(Z || {}),
          onBlur: J(Z || {}),
        },
        be = v({}, Z, ge);
      return v(
        {
          tabIndex: m,
          'aria-labelledby': t,
          'aria-orientation': b,
          'aria-valuemax': y(l),
          'aria-valuemin': y(c),
          name: u,
          type: 'range',
          min: e.min,
          max: e.max,
          step: (me = e.step) != null ? me : void 0,
          disabled: r,
        },
        be,
        {
          style: v({}, cd, {
            direction: a ? 'rtl' : 'ltr',
            // So that VoiceOver's focus indicator matches the thumb's dimensions
            width: '100%',
            height: '100%',
          }),
        },
      );
    },
    getRootProps: De,
    getThumbProps: (Z = {}) => {
      const me = {
        onMouseOver: Ce(Z || {}),
        onMouseLeave: Re(Z || {}),
      };
      return v({}, Z, me);
    },
    marks: F,
    open: f,
    range: B,
    trackLeap: Je,
    trackOffset: ve,
    values: M,
  };
}
function Ob(e) {
  const {
      autoHideDuration: t = null,
      disableWindowBlurListener: o = !1,
      onClose: r,
      open: i,
      ref: a,
      resumeHideDuration: s,
    } = e,
    l = E.useRef();
  E.useEffect(() => {
    if (!i) return;
    function C(O) {
      O.defaultPrevented ||
        ((O.key === 'Escape' || O.key === 'Esc') && (r == null || r(O, 'escapeKeyDown')));
    }
    return (
      document.addEventListener('keydown', C),
      () => {
        document.removeEventListener('keydown', C);
      }
    );
  }, [i, r]);
  const c = yt((C, O) => {
      r == null || r(C, O);
    }),
    u = yt((C) => {
      !r ||
        C == null ||
        (clearTimeout(l.current),
        (l.current = setTimeout(() => {
          c(null, 'timeout');
        }, C)));
    });
  E.useEffect(
    () => (
      i && u(t),
      () => {
        clearTimeout(l.current);
      }
    ),
    [i, t, u],
  );
  const d = (C) => {
      r == null || r(C, 'clickaway');
    },
    p = () => {
      clearTimeout(l.current);
    },
    b = E.useCallback(() => {
      t != null && u(s ?? t * 0.5);
    }, [t, s, u]),
    g = (C) => (O) => {
      const x = C.onBlur;
      x == null || x(O), b();
    },
    y = (C) => (O) => {
      const x = C.onFocus;
      x == null || x(O), p();
    },
    h = (C) => (O) => {
      const x = C.onMouseEnter;
      x == null || x(O), p();
    },
    m = (C) => (O) => {
      const x = C.onMouseLeave;
      x == null || x(O), b();
    };
  return (
    E.useEffect(() => {
      if (!o && i)
        return (
          window.addEventListener('focus', b),
          window.addEventListener('blur', p),
          () => {
            window.removeEventListener('focus', b), window.removeEventListener('blur', p);
          }
        );
    }, [o, b, i]),
    {
      getRootProps: (C = {}) => {
        const O = Vl(e),
          x = v({}, O, C);
        return v(
          {
            ref: a,
            // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
            // See https://github.com/mui/material-ui/issues/29080
            role: 'presentation',
          },
          x,
          {
            onBlur: g(x),
            onFocus: y(x),
            onMouseEnter: h(x),
            onMouseLeave: m(x),
          },
        );
      },
      onClickAway: d,
    }
  );
}
const Tb = ['onChange', 'maxRows', 'minRows', 'style', 'value'];
function jo(e) {
  return parseInt(e, 10) || 0;
}
const Cb = {
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
function Ts(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const tc = /* @__PURE__ */ E.forwardRef(function (t, o) {
  const { onChange: r, maxRows: i, minRows: a = 1, style: s, value: l } = t,
    c = xe(t, Tb),
    { current: u } = E.useRef(l != null),
    d = E.useRef(null),
    p = ut(o, d),
    b = E.useRef(null),
    g = E.useRef(0),
    [y, h] = E.useState({
      outerHeightStyle: 0,
    }),
    m = E.useCallback(() => {
      const f = d.current,
        w = Rn(f).getComputedStyle(f);
      if (w.width === '0px')
        return {
          outerHeightStyle: 0,
        };
      const z = b.current;
      (z.style.width = w.width),
        (z.value = f.value || t.placeholder || 'x'),
        z.value.slice(-1) ===
          `
` && (z.value += ' ');
      const L = w.boxSizing,
        D = jo(w.paddingBottom) + jo(w.paddingTop),
        _ = jo(w.borderBottomWidth) + jo(w.borderTopWidth),
        Y = z.scrollHeight;
      z.value = 'x';
      const B = z.scrollHeight;
      let M = Y;
      a && (M = Math.max(Number(a) * B, M)),
        i && (M = Math.min(Number(i) * B, M)),
        (M = Math.max(M, B));
      const F = M + (L === 'border-box' ? D + _ : 0),
        V = Math.abs(M - Y) <= 1;
      return {
        outerHeightStyle: F,
        overflow: V,
      };
    }, [i, a, t.placeholder]),
    S = (f, R) => {
      const { outerHeightStyle: w, overflow: z } = R;
      return g.current < 20 &&
        ((w > 0 && Math.abs((f.outerHeightStyle || 0) - w) > 1) || f.overflow !== z)
        ? ((g.current += 1),
          {
            overflow: z,
            outerHeightStyle: w,
          })
        : (process.env.NODE_ENV !== 'production' &&
            g.current === 20 &&
            console.error(
              [
                'MUI: Too many re-renders. The layout is unstable.',
                'TextareaAutosize limits the number of renders to prevent an infinite loop.',
              ].join(`
`),
            ),
          f);
    },
    C = E.useCallback(() => {
      const f = m();
      Ts(f) || h((R) => S(R, f));
    }, [m]),
    O = () => {
      const f = m();
      Ts(f) ||
        ol.flushSync(() => {
          h((R) => S(R, f));
        });
    };
  E.useEffect(() => {
    const f = ul(() => {
      (g.current = 0), d.current && O();
    });
    let R;
    const w = d.current,
      z = Rn(w);
    return (
      z.addEventListener('resize', f),
      typeof ResizeObserver < 'u' && ((R = new ResizeObserver(f)), R.observe(w)),
      () => {
        f.clear(), z.removeEventListener('resize', f), R && R.disconnect();
      }
    );
  }),
    ln(() => {
      C();
    }),
    E.useEffect(() => {
      g.current = 0;
    }, [l]);
  const x = (f) => {
    (g.current = 0), u || C(), r && r(f);
  };
  return /* @__PURE__ */ Xe(E.Fragment, {
    children: [
      /* @__PURE__ */ A(
        'textarea',
        v(
          {
            value: l,
            onChange: x,
            ref: p,
            rows: a,
            style: v(
              {
                height: y.outerHeightStyle,
                // Need a large enough difference to allow scrolling.
                // This prevents infinite rendering loop.
                overflow: y.overflow ? 'hidden' : void 0,
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
        style: v({}, Cb.shadow, s, {
          padding: 0,
        }),
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (tc.propTypes = {
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
const Sb = tc;
function Cs(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function Rb(e = {}) {
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
    o && (d = d.toLowerCase()), t && (d = Cs(d));
    const p = d
      ? l.filter((b) => {
          let g = (a || u)(b);
          return (
            o && (g = g.toLowerCase()),
            t && (g = Cs(g)),
            i === 'start' ? g.indexOf(d) === 0 : g.indexOf(d) > -1
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
const wb = Rb(),
  Ss = 5,
  $b = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function Pb(e) {
  const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_isActiveElementInListbox: t = $b,
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
      disableCloseOnSelect: b = !1,
      disabled: g,
      disabledItemsFocusable: y = !1,
      disableListWrap: h = !1,
      filterOptions: m = wb,
      filterSelectedOptions: S = !1,
      freeSolo: C = !1,
      getOptionDisabled: O,
      getOptionLabel: x = (P) => {
        var N;
        return (N = P.label) != null ? N : P;
      },
      groupBy: f,
      handleHomeEndKeys: R = !e.freeSolo,
      id: w,
      includeInputInList: z = !1,
      inputValue: L,
      isOptionEqualToValue: D = (P, N) => P === N,
      multiple: _ = !1,
      onChange: Y,
      onClose: B,
      onHighlightChange: M,
      onInputChange: F,
      onOpen: V,
      open: ae,
      openOnFocus: se = !1,
      options: G,
      readOnly: $ = !1,
      selectOnFocus: j = !e.freeSolo,
      value: X,
    } = e,
    H = dl(w);
  let U = x;
  U = (P) => {
    const N = x(P);
    if (typeof N != 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const K = N === void 0 ? 'undefined' : `${typeof N} (${N})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${u} returned ${K} instead of a string for ${JSON.stringify(
            P,
          )}.`,
        );
      }
      return String(N);
    }
    return N;
  };
  const ne = E.useRef(!1),
    oe = E.useRef(!0),
    J = E.useRef(null),
    ie = E.useRef(null),
    [le, he] = E.useState(null),
    [re, k] = E.useState(-1),
    Te = i ? 0 : -1,
    I = E.useRef(Te),
    [W, $e] = Cn({
      controlled: X,
      default: d,
      name: u,
    }),
    [ve, Je] = Cn({
      controlled: L,
      default: '',
      name: u,
      state: 'inputValue',
    }),
    [De, Ce] = E.useState(!1),
    Re = E.useCallback(
      (P, N) => {
        if (!(_ ? W.length < N.length : N !== null) && !l) return;
        let te;
        if (_) te = '';
        else if (N == null) te = '';
        else {
          const de = U(N);
          te = typeof de == 'string' ? de : '';
        }
        ve !== te && (Je(te), F && F(P, te, 'reset'));
      },
      [U, ve, _, F, Je, l, W],
    ),
    [Ze, ot] = Cn({
      controlled: ae,
      default: !1,
      name: u,
      state: 'open',
    }),
    [Z, me] = E.useState(!0),
    ge = !_ && W != null && ve === U(W),
    be = Ze && !$,
    fe = be
      ? m(
          G.filter((P) => !(S && (_ ? W : [W]).some((N) => N !== null && D(P, N)))),
          // we use the empty string to manipulate `filterOptions` to not filter any options
          // i.e. the filter predicate always returns true
          {
            inputValue: ge && Z ? '' : ve,
            getOptionLabel: U,
          },
        )
      : [],
    ue = sd({
      filteredOptions: fe,
      value: W,
    });
  E.useEffect(() => {
    const P = W !== ue.value;
    (De && !P) || (C && !P) || Re(null, W);
  }, [W, Re, De, ue.value, C]);
  const ee = Ze && fe.length > 0 && !$;
  if (process.env.NODE_ENV !== 'production' && W !== null && !C && G.length > 0) {
    const P = (_ ? W : [W]).filter((N) => !G.some((K) => D(K, N)));
    P.length > 0 &&
      console.warn(
        [
          `MUI: The value provided to ${u} is invalid.`,
          `None of the options match with \`${
            P.length > 1 ? JSON.stringify(P) : JSON.stringify(P[0])
          }\`.`,
          'You can use the `isOptionEqualToValue` prop to customize the equality test.',
        ].join(`
`),
      );
  }
  const ye = yt((P) => {
    P === -1 ? J.current.focus() : le.querySelector(`[data-tag-index="${P}"]`).focus();
  });
  E.useEffect(() => {
    _ && re > W.length - 1 && (k(-1), ye(-1));
  }, [W, _, re, ye]);
  function Ee(P, N) {
    if (!ie.current || P === -1) return -1;
    let K = P;
    for (;;) {
      if ((N === 'next' && K === fe.length) || (N === 'previous' && K === -1)) return -1;
      const te = ie.current.querySelector(`[data-option-index="${K}"]`),
        de = y ? !1 : !te || te.disabled || te.getAttribute('aria-disabled') === 'true';
      if ((te && !te.hasAttribute('tabindex')) || de) K += N === 'next' ? 1 : -1;
      else return K;
    }
  }
  const Ne = yt(({ event: P, index: N, reason: K = 'auto' }) => {
      if (
        ((I.current = N),
        N === -1
          ? J.current.removeAttribute('aria-activedescendant')
          : J.current.setAttribute('aria-activedescendant', `${H}-option-${N}`),
        M && M(P, N === -1 ? null : fe[N], K),
        !ie.current)
      )
        return;
      const te = ie.current.querySelector(`[role="option"].${o}-focused`);
      te && (te.classList.remove(`${o}-focused`), te.classList.remove(`${o}-focusVisible`));
      const de = ie.current.parentElement.querySelector('[role="listbox"]');
      if (!de) return;
      if (N === -1) {
        de.scrollTop = 0;
        return;
      }
      const we = ie.current.querySelector(`[data-option-index="${N}"]`);
      if (
        we &&
        (we.classList.add(`${o}-focused`),
        K === 'keyboard' && we.classList.add(`${o}-focusVisible`),
        de.scrollHeight > de.clientHeight && K !== 'mouse')
      ) {
        const Se = we,
          Ie = de.clientHeight + de.scrollTop,
          ht = Se.offsetTop + Se.offsetHeight;
        ht > Ie
          ? (de.scrollTop = ht - de.clientHeight)
          : Se.offsetTop - Se.offsetHeight * (f ? 1.3 : 0) < de.scrollTop &&
            (de.scrollTop = Se.offsetTop - Se.offsetHeight * (f ? 1.3 : 0));
      }
    }),
    rt = yt(({ event: P, diff: N, direction: K = 'next', reason: te = 'auto' }) => {
      if (!be) return;
      const we = Ee(
        (() => {
          const Se = fe.length - 1;
          if (N === 'reset') return Te;
          if (N === 'start') return 0;
          if (N === 'end') return Se;
          const Ie = I.current + N;
          return Ie < 0
            ? Ie === -1 && z
              ? -1
              : (h && I.current !== -1) || Math.abs(N) > 1
              ? 0
              : Se
            : Ie > Se
            ? Ie === Se + 1 && z
              ? -1
              : h || Math.abs(N) > 1
              ? Se
              : 0
            : Ie;
        })(),
        K,
      );
      if (
        (Ne({
          index: we,
          reason: te,
          event: P,
        }),
        r && N !== 'reset')
      )
        if (we === -1) J.current.value = ve;
        else {
          const Se = U(fe[we]);
          (J.current.value = Se),
            Se.toLowerCase().indexOf(ve.toLowerCase()) === 0 &&
              ve.length > 0 &&
              J.current.setSelectionRange(ve.length, Se.length);
        }
    }),
    dt = () => {
      const P = (N, K) => {
        const te = N ? U(N) : '',
          de = K ? U(K) : '';
        return te === de;
      };
      if (
        I.current !== -1 &&
        ue.filteredOptions &&
        ue.filteredOptions.length !== fe.length &&
        (_
          ? W.length === ue.value.length && ue.value.every((N, K) => U(W[K]) === U(N))
          : P(ue.value, W))
      ) {
        const N = ue.filteredOptions[I.current];
        if (N && fe.some((te) => U(te) === U(N))) return !0;
      }
      return !1;
    },
    xt = E.useCallback(() => {
      if (!be || dt()) return;
      const P = _ ? W[0] : W;
      if (fe.length === 0 || P == null) {
        rt({
          diff: 'reset',
        });
        return;
      }
      if (ie.current) {
        if (P != null) {
          const N = fe[I.current];
          if (_ && N && Yr(W, (te) => D(N, te)) !== -1) return;
          const K = Yr(fe, (te) => D(te, P));
          K === -1
            ? rt({
                diff: 'reset',
              })
            : Ne({
                index: K,
              });
          return;
        }
        if (I.current >= fe.length - 1) {
          Ne({
            index: fe.length - 1,
          });
          return;
        }
        Ne({
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
      rt,
      Ne,
      be,
      ve,
      _,
    ]),
    un = yt((P) => {
      Go(ie, P), P && xt();
    });
  process.env.NODE_ENV !== 'production' &&
    E.useEffect(() => {
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
    E.useEffect(() => {
      xt();
    }, [xt]);
  const Ot = (P) => {
      Ze || (ot(!0), me(!0), V && V(P));
    },
    mt = (P, N) => {
      Ze && (ot(!1), B && B(P, N));
    },
    vt = (P, N, K, te) => {
      if (_) {
        if (W.length === N.length && W.every((de, we) => de === N[we])) return;
      } else if (W === N) return;
      Y && Y(P, N, K, te), $e(N);
    },
    pt = E.useRef(!1),
    Qe = (P, N, K = 'selectOption', te = 'options') => {
      let de = K,
        we = N;
      if (_) {
        if (((we = Array.isArray(W) ? W.slice() : []), process.env.NODE_ENV !== 'production')) {
          const Ie = we.filter((ht) => D(N, ht));
          Ie.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${u} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${Ie.length} matches.`,
              ].join(`
`),
            );
        }
        const Se = Yr(we, (Ie) => D(N, Ie));
        Se === -1 ? we.push(N) : te !== 'freeSolo' && (we.splice(Se, 1), (de = 'removeOption'));
      }
      Re(P, we),
        vt(P, we, de, {
          option: N,
        }),
        !b && (!P || (!P.ctrlKey && !P.metaKey)) && mt(P, de),
        (s === !0 || (s === 'touch' && pt.current) || (s === 'mouse' && !pt.current)) &&
          J.current.blur();
    };
  function tt(P, N) {
    if (P === -1) return -1;
    let K = P;
    for (;;) {
      if ((N === 'next' && K === W.length) || (N === 'previous' && K === -1)) return -1;
      const te = le.querySelector(`[data-tag-index="${K}"]`);
      if (
        !te ||
        !te.hasAttribute('tabindex') ||
        te.disabled ||
        te.getAttribute('aria-disabled') === 'true'
      )
        K += N === 'next' ? 1 : -1;
      else return K;
    }
  }
  const ft = (P, N) => {
      if (!_) return;
      ve === '' && mt(P, 'toggleInput');
      let K = re;
      re === -1
        ? ve === '' && N === 'previous' && (K = W.length - 1)
        : ((K += N === 'next' ? 1 : -1), K < 0 && (K = 0), K === W.length && (K = -1)),
        (K = tt(K, N)),
        k(K),
        ye(K);
    },
    yn = (P) => {
      (ne.current = !0), Je(''), F && F(P, '', 'clear'), vt(P, _ ? [] : null, 'clear');
    },
    qt = (P) => (N) => {
      if (
        (P.onKeyDown && P.onKeyDown(N),
        !N.defaultMuiPrevented &&
          (re !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(N.key) === -1 && (k(-1), ye(-1)),
          N.which !== 229))
      )
        switch (N.key) {
          case 'Home':
            be &&
              R &&
              (N.preventDefault(),
              rt({
                diff: 'start',
                direction: 'next',
                reason: 'keyboard',
                event: N,
              }));
            break;
          case 'End':
            be &&
              R &&
              (N.preventDefault(),
              rt({
                diff: 'end',
                direction: 'previous',
                reason: 'keyboard',
                event: N,
              }));
            break;
          case 'PageUp':
            N.preventDefault(),
              rt({
                diff: -Ss,
                direction: 'previous',
                reason: 'keyboard',
                event: N,
              }),
              Ot(N);
            break;
          case 'PageDown':
            N.preventDefault(),
              rt({
                diff: Ss,
                direction: 'next',
                reason: 'keyboard',
                event: N,
              }),
              Ot(N);
            break;
          case 'ArrowDown':
            N.preventDefault(),
              rt({
                diff: 1,
                direction: 'next',
                reason: 'keyboard',
                event: N,
              }),
              Ot(N);
            break;
          case 'ArrowUp':
            N.preventDefault(),
              rt({
                diff: -1,
                direction: 'previous',
                reason: 'keyboard',
                event: N,
              }),
              Ot(N);
            break;
          case 'ArrowLeft':
            ft(N, 'previous');
            break;
          case 'ArrowRight':
            ft(N, 'next');
            break;
          case 'Enter':
            if (I.current !== -1 && be) {
              const K = fe[I.current],
                te = O ? O(K) : !1;
              if ((N.preventDefault(), te)) return;
              Qe(N, K, 'selectOption'),
                r && J.current.setSelectionRange(J.current.value.length, J.current.value.length);
            } else
              C &&
                ve !== '' &&
                ge === !1 &&
                (_ && N.preventDefault(), Qe(N, ve, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            be
              ? (N.preventDefault(), N.stopPropagation(), mt(N, 'escape'))
              : c &&
                (ve !== '' || (_ && W.length > 0)) &&
                (N.preventDefault(), N.stopPropagation(), yn(N));
            break;
          case 'Backspace':
            if (_ && !$ && ve === '' && W.length > 0) {
              const K = re === -1 ? W.length - 1 : re,
                te = W.slice();
              te.splice(K, 1),
                vt(N, te, 'removeOption', {
                  option: W[K],
                });
            }
            break;
          case 'Delete':
            if (_ && !$ && ve === '' && W.length > 0 && re !== -1) {
              const K = re,
                te = W.slice();
              te.splice(K, 1),
                vt(N, te, 'removeOption', {
                  option: W[K],
                });
            }
            break;
        }
    },
    dn = (P) => {
      Ce(!0), se && !ne.current && Ot(P);
    },
    jt = (P) => {
      if (t(ie)) {
        J.current.focus();
        return;
      }
      Ce(!1),
        (oe.current = !0),
        (ne.current = !1),
        a && I.current !== -1 && be
          ? Qe(P, fe[I.current], 'blur')
          : a && C && ve !== ''
          ? Qe(P, ve, 'blur', 'freeSolo')
          : l && Re(P, W),
        mt(P, 'blur');
    },
    nn = (P) => {
      const N = P.target.value;
      ve !== N && (Je(N), me(!1), F && F(P, N, 'input')),
        N === '' ? !p && !_ && vt(P, null, 'clear') : Ot(P);
    },
    on = (P) => {
      Ne({
        event: P,
        index: Number(P.currentTarget.getAttribute('data-option-index')),
        reason: 'mouse',
      });
    },
    rn = (P) => {
      Ne({
        event: P,
        index: Number(P.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (pt.current = !0);
    },
    Yt = (P) => {
      const N = Number(P.currentTarget.getAttribute('data-option-index'));
      Qe(P, fe[N], 'selectOption'), (pt.current = !1);
    },
    an = (P) => (N) => {
      const K = W.slice();
      K.splice(P, 1),
        vt(N, K, 'removeOption', {
          option: W[P],
        });
    },
    ke = (P) => {
      Ze ? mt(P, 'toggleInput') : Ot(P);
    },
    lt = (P) => {
      P.target.getAttribute('id') !== H && P.preventDefault();
    },
    It = () => {
      J.current.focus(),
        j &&
          oe.current &&
          J.current.selectionEnd - J.current.selectionStart === 0 &&
          J.current.select(),
        (oe.current = !1);
    },
    T = (P) => {
      (ve === '' || !Ze) && ke(P);
    };
  let q = C && ve.length > 0;
  q = q || (_ ? W.length > 0 : W !== null);
  let ce = fe;
  if (f) {
    const P = /* @__PURE__ */ new Map();
    let N = !1;
    ce = fe.reduce((K, te, de) => {
      const we = f(te);
      return (
        K.length > 0 && K[K.length - 1].group === we
          ? K[K.length - 1].options.push(te)
          : (process.env.NODE_ENV !== 'production' &&
              (P.get(we) &&
                !N &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${u} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                (N = !0)),
              P.set(we, !0)),
            K.push({
              key: de,
              index: de,
              group: we,
              options: [te],
            })),
        K
      );
    }, []);
  }
  return (
    g && De && jt(),
    {
      getRootProps: (P = {}) =>
        v(
          {
            'aria-owns': ee ? `${H}-listbox` : null,
          },
          P,
          {
            onKeyDown: qt(P),
            onMouseDown: lt,
            onClick: It,
          },
        ),
      getInputLabelProps: () => ({
        id: `${H}-label`,
        htmlFor: H,
      }),
      getInputProps: () => ({
        id: H,
        value: ve,
        onBlur: jt,
        onFocus: dn,
        onChange: nn,
        onMouseDown: T,
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
        disabled: g,
      }),
      getClearProps: () => ({
        tabIndex: -1,
        onClick: yn,
      }),
      getPopupIndicatorProps: () => ({
        tabIndex: -1,
        onClick: ke,
      }),
      getTagProps: ({ index: P }) =>
        v(
          {
            key: P,
            'data-tag-index': P,
            tabIndex: -1,
          },
          !$ && {
            onDelete: an(P),
          },
        ),
      getListboxProps: () => ({
        role: 'listbox',
        id: `${H}-listbox`,
        'aria-labelledby': `${H}-label`,
        ref: un,
        onMouseDown: (P) => {
          P.preventDefault();
        },
      }),
      getOptionProps: ({ index: P, option: N }) => {
        const K = (_ ? W : [W]).some((de) => de != null && D(N, de)),
          te = O ? O(N) : !1;
        return {
          key: U(N),
          tabIndex: -1,
          role: 'option',
          id: `${H}-option-${P}`,
          onMouseOver: on,
          onClick: Yt,
          onTouchStart: rn,
          'data-option-index': P,
          'aria-disabled': te,
          'aria-selected': K,
        };
      },
      id: H,
      inputValue: ve,
      value: W,
      dirty: q,
      expanded: be && le,
      popupOpen: be,
      focused: De || re !== -1,
      anchorEl: le,
      setAnchorEl: he,
      focusedTag: re,
      groupedOptions: ce,
    }
  );
}
function Nb(e) {
  return _e('MuiSvgIcon', e);
}
Ae('MuiSvgIcon', [
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
const kb = [
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
  Ib = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      i = {
        root: ['root', t !== 'inherit' && `color${Q(t)}`, `fontSize${Q(o)}`],
      };
    return Fe(i, Nb, r);
  },
  _b = pe('svg', {
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
    var o, r, i, a, s, l, c, u, d, p, b, g, y, h, m, S, C;
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
        (b = (g = (e.vars || e).palette) == null || (y = g[t.color]) == null ? void 0 : y.main) !=
        null
          ? b
          : {
              action:
                (h = (e.vars || e).palette) == null || (m = h.action) == null ? void 0 : m.active,
              disabled:
                (S = (e.vars || e).palette) == null || (C = S.action) == null ? void 0 : C.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  Yi = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
        viewBox: b = '0 0 24 24',
      } = r,
      g = xe(r, kb),
      y = v({}, r, {
        color: s,
        component: l,
        fontSize: c,
        instanceFontSize: t.fontSize,
        inheritViewBox: d,
        viewBox: b,
      }),
      h = {};
    d || (h.viewBox = b);
    const m = Ib(y);
    return /* @__PURE__ */ Xe(
      _b,
      v(
        {
          as: l,
          className: Oe(m.root, a),
          focusable: 'false',
          color: u,
          'aria-hidden': p ? void 0 : !0,
          role: p ? 'img' : void 0,
          ref: o,
        },
        h,
        g,
        {
          ownerState: y,
          children: [
            i,
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
  (Yi.propTypes = {
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
Yi.muiName = 'SvgIcon';
const Rs = Yi;
function Zn(e, t) {
  function o(r, i) {
    return /* @__PURE__ */ A(
      Rs,
      v(
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
    (o.muiName = Rs.muiName),
    /* @__PURE__ */ E.memo(/* @__PURE__ */ E.forwardRef(o))
  );
}
var di = { exports: {} },
  He = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ws;
function Mb() {
  if (ws) return He;
  ws = 1;
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
    b = Symbol.for('react.lazy'),
    g = Symbol.for('react.offscreen'),
    y;
  y = Symbol.for('react.module.reference');
  function h(m) {
    if (typeof m == 'object' && m !== null) {
      var S = m.$$typeof;
      switch (S) {
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
                case b:
                case p:
                case a:
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
    (He.ContextProvider = a),
    (He.Element = e),
    (He.ForwardRef = c),
    (He.Fragment = o),
    (He.Lazy = b),
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
      return h(m) === s;
    }),
    (He.isContextProvider = function (m) {
      return h(m) === a;
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
      return h(m) === i;
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
        m === i ||
        m === r ||
        m === u ||
        m === d ||
        m === g ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === b ||
            m.$$typeof === p ||
            m.$$typeof === a ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === y ||
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
 */
var $s;
function Ab() {
  return (
    $s ||
      (($s = 1),
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
            b = Symbol.for('react.lazy'),
            g = Symbol.for('react.offscreen'),
            y = !1,
            h = !1,
            m = !1,
            S = !1,
            C = !1,
            O;
          O = Symbol.for('react.module.reference');
          function x(I) {
            return !!(
              typeof I == 'string' ||
              typeof I == 'function' ||
              I === o ||
              I === i ||
              C ||
              I === r ||
              I === u ||
              I === d ||
              S ||
              I === g ||
              y ||
              h ||
              m ||
              (typeof I == 'object' &&
                I !== null &&
                (I.$$typeof === b ||
                  I.$$typeof === p ||
                  I.$$typeof === a ||
                  I.$$typeof === s ||
                  I.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  I.$$typeof === O ||
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
                    case i:
                    case r:
                    case u:
                    case d:
                      return $e;
                    default:
                      var ve = $e && $e.$$typeof;
                      switch (ve) {
                        case l:
                        case s:
                        case c:
                        case b:
                        case p:
                        case a:
                          return ve;
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
            w = a,
            z = e,
            L = c,
            D = o,
            _ = b,
            Y = p,
            B = t,
            M = i,
            F = r,
            V = u,
            ae = d,
            se = !1,
            G = !1;
          function $(I) {
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
            return f(I) === a;
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
          function ie(I) {
            return f(I) === p;
          }
          function le(I) {
            return f(I) === t;
          }
          function he(I) {
            return f(I) === i;
          }
          function re(I) {
            return f(I) === r;
          }
          function k(I) {
            return f(I) === u;
          }
          function Te(I) {
            return f(I) === d;
          }
          (qe.ContextConsumer = R),
            (qe.ContextProvider = w),
            (qe.Element = z),
            (qe.ForwardRef = L),
            (qe.Fragment = D),
            (qe.Lazy = _),
            (qe.Memo = Y),
            (qe.Portal = B),
            (qe.Profiler = M),
            (qe.StrictMode = F),
            (qe.Suspense = V),
            (qe.SuspenseList = ae),
            (qe.isAsyncMode = $),
            (qe.isConcurrentMode = j),
            (qe.isContextConsumer = X),
            (qe.isContextProvider = H),
            (qe.isElement = U),
            (qe.isForwardRef = ne),
            (qe.isFragment = oe),
            (qe.isLazy = J),
            (qe.isMemo = ie),
            (qe.isPortal = le),
            (qe.isProfiler = he),
            (qe.isStrictMode = re),
            (qe.isSuspense = k),
            (qe.isSuspenseList = Te),
            (qe.isValidElementType = x),
            (qe.typeOf = f);
        })()),
    qe
  );
}
process.env.NODE_ENV === 'production' ? (di.exports = Mb()) : (di.exports = Ab());
var Ki = di.exports;
function pi(e, t) {
  return (
    (pi = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    pi(e, t)
  );
}
function nc(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), pi(e, t);
}
const Ps = {
  disabled: !1,
};
var Db =
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
const ir = Vt.createContext(null);
var Lb = function (t) {
    return t.scrollTop;
  },
  co = 'unmounted',
  xn = 'exited',
  On = 'entering',
  jn = 'entered',
  fi = 'exiting',
  cn = /* @__PURE__ */ (function (e) {
    nc(t, e);
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
            ? ((c = xn), (a.appearStatus = On))
            : (c = jn)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = co)
          : (c = xn),
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
            status: xn,
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
          this.props.in ? s !== On && s !== jn && (a = On) : (s === On || s === jn) && (a = fi);
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
          if ((this.cancelNextCallback(), a === On)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : Io.findDOMNode(this);
              s && Lb(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === xn &&
            this.setState({
              status: co,
            });
      }),
      (o.performEnter = function (i) {
        var a = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [l] : [Io.findDOMNode(this), l],
          u = c[0],
          d = c[1],
          p = this.getTimeouts(),
          b = l ? p.appear : p.enter;
        if ((!i && !s) || Ps.disabled) {
          this.safeSetState(
            {
              status: jn,
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
              status: On,
            },
            function () {
              a.props.onEntering(u, d),
                a.onTransitionEnd(b, function () {
                  a.safeSetState(
                    {
                      status: jn,
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
          l = this.props.nodeRef ? void 0 : Io.findDOMNode(this);
        if (!a || Ps.disabled) {
          this.safeSetState(
            {
              status: xn,
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
              status: fi,
            },
            function () {
              i.props.onExiting(l),
                i.onTransitionEnd(s.exit, function () {
                  i.safeSetState(
                    {
                      status: xn,
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : Io.findDOMNode(this),
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
        var l = xe(a, [
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
          /* @__PURE__ */ Vt.createElement(
            ir.Provider,
            {
              value: null,
            },
            typeof s == 'function' ? s(i, l) : Vt.cloneElement(Vt.Children.only(s), l),
          )
        );
      }),
      t
    );
  })(Vt.Component);
cn.contextType = ir;
cn.propTypes =
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
          var o = Db;
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
function Dn() {}
cn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Dn,
  onEntering: Dn,
  onEntered: Dn,
  onExit: Dn,
  onExiting: Dn,
  onExited: Dn,
};
cn.UNMOUNTED = co;
cn.EXITED = xn;
cn.ENTERING = On;
cn.ENTERED = jn;
cn.EXITING = fi;
const oc = cn;
function Fb(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Gi(e, t) {
  var o = function (a) {
      return t && Bo(a) ? t(a) : a;
    },
    r = /* @__PURE__ */ Object.create(null);
  return (
    e &&
      mu
        .map(e, function (i) {
          return i;
        })
        .forEach(function (i) {
          r[i.key] = o(i);
        }),
    r
  );
}
function jb(e, t) {
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
function Tn(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function zb(e, t) {
  return Gi(e.children, function (o) {
    return Uo(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: Tn(o, 'appear', e),
      enter: Tn(o, 'enter', e),
      exit: Tn(o, 'exit', e),
    });
  });
}
function Vb(e, t, o) {
  var r = Gi(e.children),
    i = jb(t, r);
  return (
    Object.keys(i).forEach(function (a) {
      var s = i[a];
      if (Bo(s)) {
        var l = a in t,
          c = a in r,
          u = t[a],
          d = Bo(u) && !u.props.in;
        c && (!l || d)
          ? (i[a] = Uo(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: Tn(s, 'exit', e),
              enter: Tn(s, 'enter', e),
            }))
          : !c && l && !d
          ? (i[a] = Uo(s, {
              in: !1,
            }))
          : c &&
            l &&
            Bo(u) &&
            (i[a] = Uo(s, {
              onExited: o.bind(null, s),
              in: u.props.in,
              exit: Tn(s, 'exit', e),
              enter: Tn(s, 'enter', e),
            }));
      }
    }),
    i
  );
}
var Bb =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  Ub = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  Xi = /* @__PURE__ */ (function (e) {
    nc(t, e);
    function t(r, i) {
      var a;
      a = e.call(this, r, i) || this;
      var s = a.handleExited.bind(Fb(a));
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
          children: c ? zb(i, l) : Vb(i, s, l),
          firstRender: !1,
        };
      }),
      (o.handleExited = function (i, a) {
        var s = Gi(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(a),
          this.mounted &&
            this.setState(function (l) {
              var c = v({}, l.children);
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
          l = xe(i, ['component', 'childFactory']),
          c = this.state.contextValue,
          u = Bb(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          a === null
            ? /* @__PURE__ */ Vt.createElement(
                ir.Provider,
                {
                  value: c,
                },
                u,
              )
            : /* @__PURE__ */ Vt.createElement(
                ir.Provider,
                {
                  value: c,
                },
                /* @__PURE__ */ Vt.createElement(a, l, u),
              )
        );
      }),
      t
    );
  })(Vt.Component);
Xi.propTypes =
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
Xi.defaultProps = Ub;
const Wb = Xi,
  rc = (e) => e.scrollTop;
function ar(e, t) {
  var o, r;
  const { timeout: i, easing: a, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof i == 'number' ? i : i[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == 'object' ? a[t.mode] : a,
    delay: s.transitionDelay,
  };
}
function Hb(e) {
  return _e('MuiPaper', e);
}
Ae('MuiPaper', [
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
const qb = ['className', 'component', 'elevation', 'square', 'variant'],
  Yb = (e) => {
    const { square: t, elevation: o, variant: r, classes: i } = e,
      a = {
        root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`],
      };
    return Fe(a, Hb, i);
  },
  Kb = pe('div', {
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
    return v(
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
        v(
          {
            boxShadow: (e.vars || e).shadows[t.elevation],
          },
          !e.vars &&
            e.palette.mode === 'dark' && {
              backgroundImage: `linear-gradient(${et('#fff', is(t.elevation))}, ${et(
                '#fff',
                is(t.elevation),
              )})`,
            },
          e.vars && {
            backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation],
          },
        ),
    );
  }),
  ic = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
      u = xe(r, qb),
      d = v({}, r, {
        component: a,
        elevation: s,
        square: l,
        variant: c,
      }),
      p = Yb(d);
    return (
      process.env.NODE_ENV !== 'production' &&
        Jn().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      /* @__PURE__ */ A(
        Kb,
        v(
          {
            as: a,
            ownerState: d,
            className: Oe(p.root, i),
            ref: o,
          },
          u,
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ic.propTypes = {
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
    elevation: Wt(Ti, (e) => {
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
const ko = ic;
function ac(e) {
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
    [d, p] = E.useState(!1),
    b = Oe(t, o.ripple, o.rippleVisible, r && o.ripplePulsate),
    g = {
      width: s,
      height: s,
      top: -(s / 2) + a,
      left: -(s / 2) + i,
    },
    y = Oe(o.child, d && o.childLeaving, r && o.childPulsate);
  return (
    !l && !d && p(!0),
    E.useEffect(() => {
      if (!l && c != null) {
        const h = setTimeout(c, u);
        return () => {
          clearTimeout(h);
        };
      }
    }, [c, l, u]),
    /* @__PURE__ */ A('span', {
      className: b,
      style: g,
      children: /* @__PURE__ */ A('span', {
        className: y,
      }),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (ac.propTypes = {
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
const Gb = Ae('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  Mt = Gb,
  Xb = ['center', 'classes', 'className'];
let Pr = (e) => e,
  Ns,
  ks,
  Is,
  _s;
const mi = 550,
  Jb = 80,
  Zb = _i(
    Ns ||
      (Ns = Pr`
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
  Qb = _i(
    ks ||
      (ks = Pr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  ev = _i(
    Is ||
      (Is = Pr`
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
  tv = pe('span', {
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
  nv = pe(ac, {
    name: 'MuiTouchRipple',
    slot: 'Ripple',
  })(
    _s ||
      (_s = Pr`
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
    Mt.rippleVisible,
    Zb,
    mi,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Mt.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    Mt.child,
    Mt.childLeaving,
    Qb,
    mi,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Mt.childPulsate,
    ev,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  sc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiTouchRipple',
      }),
      { center: i = !1, classes: a = {}, className: s } = r,
      l = xe(r, Xb),
      [c, u] = E.useState([]),
      d = E.useRef(0),
      p = E.useRef(null);
    E.useEffect(() => {
      p.current && (p.current(), (p.current = null));
    }, [c]);
    const b = E.useRef(!1),
      g = E.useRef(null),
      y = E.useRef(null),
      h = E.useRef(null);
    E.useEffect(
      () => () => {
        clearTimeout(g.current);
      },
      [],
    );
    const m = E.useCallback(
        (x) => {
          const { pulsate: f, rippleX: R, rippleY: w, rippleSize: z, cb: L } = x;
          u((D) => [
            ...D,
            /* @__PURE__ */ A(
              nv,
              {
                classes: {
                  ripple: Oe(a.ripple, Mt.ripple),
                  rippleVisible: Oe(a.rippleVisible, Mt.rippleVisible),
                  ripplePulsate: Oe(a.ripplePulsate, Mt.ripplePulsate),
                  child: Oe(a.child, Mt.child),
                  childLeaving: Oe(a.childLeaving, Mt.childLeaving),
                  childPulsate: Oe(a.childPulsate, Mt.childPulsate),
                },
                timeout: mi,
                pulsate: f,
                rippleX: R,
                rippleY: w,
                rippleSize: z,
              },
              d.current,
            ),
          ]),
            (d.current += 1),
            (p.current = L);
        },
        [a],
      ),
      S = E.useCallback(
        (x = {}, f = {}, R = () => {}) => {
          const {
            pulsate: w = !1,
            center: z = i || f.pulsate,
            fakeElement: L = !1,
            // For test purposes
          } = f;
          if ((x == null ? void 0 : x.type) === 'mousedown' && b.current) {
            b.current = !1;
            return;
          }
          (x == null ? void 0 : x.type) === 'touchstart' && (b.current = !0);
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
            z ||
            x === void 0 ||
            (x.clientX === 0 && x.clientY === 0) ||
            (!x.clientX && !x.touches)
          )
            (Y = Math.round(_.width / 2)), (B = Math.round(_.height / 2));
          else {
            const { clientX: F, clientY: V } = x.touches && x.touches.length > 0 ? x.touches[0] : x;
            (Y = Math.round(F - _.left)), (B = Math.round(V - _.top));
          }
          if (z) (M = Math.sqrt((2 * _.width ** 2 + _.height ** 2) / 3)), M % 2 === 0 && (M += 1);
          else {
            const F = Math.max(Math.abs((D ? D.clientWidth : 0) - Y), Y) * 2 + 2,
              V = Math.max(Math.abs((D ? D.clientHeight : 0) - B), B) * 2 + 2;
            M = Math.sqrt(F ** 2 + V ** 2);
          }
          x != null && x.touches
            ? y.current === null &&
              ((y.current = () => {
                m({
                  pulsate: w,
                  rippleX: Y,
                  rippleY: B,
                  rippleSize: M,
                  cb: R,
                });
              }),
              (g.current = setTimeout(() => {
                y.current && (y.current(), (y.current = null));
              }, Jb)))
            : m({
                pulsate: w,
                rippleX: Y,
                rippleY: B,
                rippleSize: M,
                cb: R,
              });
        },
        [i, m],
      ),
      C = E.useCallback(() => {
        S(
          {},
          {
            pulsate: !0,
          },
        );
      }, [S]),
      O = E.useCallback((x, f) => {
        if ((clearTimeout(g.current), (x == null ? void 0 : x.type) === 'touchend' && y.current)) {
          y.current(),
            (y.current = null),
            (g.current = setTimeout(() => {
              O(x, f);
            }));
          return;
        }
        (y.current = null), u((R) => (R.length > 0 ? R.slice(1) : R)), (p.current = f);
      }, []);
    return (
      E.useImperativeHandle(
        o,
        () => ({
          pulsate: C,
          start: S,
          stop: O,
        }),
        [C, S, O],
      ),
      /* @__PURE__ */ A(
        tv,
        v(
          {
            className: Oe(Mt.root, a.root, s),
            ref: h,
          },
          l,
          {
            children: /* @__PURE__ */ A(Wb, {
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
  (sc.propTypes = {
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
const ov = sc;
function rv(e) {
  return _e('MuiButtonBase', e);
}
const iv = Ae('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  av = iv,
  sv = [
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
  lv = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: i } = e,
      s = Fe(
        {
          root: ['root', t && 'disabled', o && 'focusVisible'],
        },
        rv,
        i,
      );
    return o && r && (s.root += ` ${r}`), s;
  },
  cv = pe('button', {
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
    [`&.${av.disabled}`]: {
      pointerEvents: 'none',
      // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
  }),
  lc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
        focusRipple: b = !1,
        LinkComponent: g = 'a',
        onBlur: y,
        onClick: h,
        onContextMenu: m,
        onDragLeave: S,
        onFocus: C,
        onFocusVisible: O,
        onKeyDown: x,
        onKeyUp: f,
        onMouseDown: R,
        onMouseLeave: w,
        onMouseUp: z,
        onTouchEnd: L,
        onTouchMove: D,
        onTouchStart: _,
        tabIndex: Y = 0,
        TouchRippleProps: B,
        touchRippleRef: M,
        type: F,
      } = r,
      V = xe(r, sv),
      ae = E.useRef(null),
      se = E.useRef(null),
      G = ut(se, M),
      { isFocusVisibleRef: $, onFocus: j, onBlur: X, ref: H } = pl(),
      [U, ne] = E.useState(!1);
    u && U && ne(!1),
      E.useImperativeHandle(
        i,
        () => ({
          focusVisible: () => {
            ne(!0), ae.current.focus();
          },
        }),
        [],
      );
    const [oe, J] = E.useState(!1);
    E.useEffect(() => {
      J(!0);
    }, []);
    const ie = oe && !d && !u;
    E.useEffect(() => {
      U && b && !d && oe && se.current.pulsate();
    }, [d, b, U, oe]);
    function le(ue, ee, ye = p) {
      return yt((Ee) => (ee && ee(Ee), !ye && se.current && se.current[ue](Ee), !0));
    }
    const he = le('start', R),
      re = le('stop', m),
      k = le('stop', S),
      Te = le('stop', z),
      I = le('stop', (ue) => {
        U && ue.preventDefault(), w && w(ue);
      }),
      W = le('start', _),
      $e = le('stop', L),
      ve = le('stop', D),
      Je = le(
        'stop',
        (ue) => {
          X(ue), $.current === !1 && ne(!1), y && y(ue);
        },
        !1,
      ),
      De = yt((ue) => {
        ae.current || (ae.current = ue.currentTarget),
          j(ue),
          $.current === !0 && (ne(!0), O && O(ue)),
          C && C(ue);
      }),
      Ce = () => {
        const ue = ae.current;
        return c && c !== 'button' && !(ue.tagName === 'A' && ue.href);
      },
      Re = E.useRef(!1),
      Ze = yt((ue) => {
        b &&
          !Re.current &&
          U &&
          se.current &&
          ue.key === ' ' &&
          ((Re.current = !0),
          se.current.stop(ue, () => {
            se.current.start(ue);
          })),
          ue.target === ue.currentTarget && Ce() && ue.key === ' ' && ue.preventDefault(),
          x && x(ue),
          ue.target === ue.currentTarget &&
            Ce() &&
            ue.key === 'Enter' &&
            !u &&
            (ue.preventDefault(), h && h(ue));
      }),
      ot = yt((ue) => {
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
            Ce() &&
            ue.key === ' ' &&
            !ue.defaultPrevented &&
            h(ue);
      });
    let Z = c;
    Z === 'button' && (V.href || V.to) && (Z = g);
    const me = {};
    Z === 'button'
      ? ((me.type = F === void 0 ? 'button' : F), (me.disabled = u))
      : (!V.href && !V.to && (me.role = 'button'), u && (me['aria-disabled'] = u));
    const ge = ut(o, H, ae);
    process.env.NODE_ENV !== 'production' &&
      E.useEffect(() => {
        ie &&
          !se.current &&
          console.error(
            [
              'MUI: The `component` prop provided to ButtonBase is invalid.',
              'Please make sure the children prop is rendered in this custom component.',
            ].join(`
`),
          );
      }, [ie]);
    const be = v({}, r, {
        centerRipple: a,
        component: c,
        disabled: u,
        disableRipple: d,
        disableTouchRipple: p,
        focusRipple: b,
        tabIndex: Y,
        focusVisible: U,
      }),
      fe = lv(be);
    return /* @__PURE__ */ Xe(
      cv,
      v(
        {
          as: Z,
          className: Oe(fe.root, l),
          ownerState: be,
          onBlur: Je,
          onClick: h,
          onContextMenu: re,
          onFocus: De,
          onKeyDown: Ze,
          onKeyUp: ot,
          onMouseDown: he,
          onMouseLeave: I,
          onMouseUp: Te,
          onDragLeave: k,
          onTouchEnd: $e,
          onTouchMove: ve,
          onTouchStart: W,
          ref: ge,
          tabIndex: u ? -1 : Y,
          type: F,
        },
        me,
        V,
        {
          children: [
            s,
            ie
              ? /* TouchRipple is only needed client-side, x2 boost on the server. */
                /* @__PURE__ */ A(
                  ov,
                  v(
                    {
                      ref: G,
                      center: a,
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
  (lc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * A ref for imperative actions.
     * It currently only supports `focusVisible()` action.
     */
    action: Rt,
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
    component: xi,
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
const To = lc;
function uv(e) {
  return _e('MuiIconButton', e);
}
const dv = Ae('MuiIconButton', [
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
  pv = dv,
  fv = ['edge', 'children', 'className', 'color', 'disabled', 'disableFocusRipple', 'size'],
  mv = (e) => {
    const { classes: t, disabled: o, color: r, edge: i, size: a } = e,
      s = {
        root: [
          'root',
          o && 'disabled',
          r !== 'default' && `color${Q(r)}`,
          i && `edge${Q(i)}`,
          `size${Q(a)}`,
        ],
      };
    return Fe(s, uv, t);
  },
  hv = pe(To, {
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
      v(
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
              : et(e.palette.action.active, e.palette.action.hoverOpacity),
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
      return v(
        {},
        t.color === 'inherit' && {
          color: 'inherit',
        },
        t.color !== 'inherit' &&
          t.color !== 'default' &&
          v(
            {
              color: r == null ? void 0 : r.main,
            },
            !t.disableRipple && {
              '&:hover': v(
                {},
                r && {
                  backgroundColor: e.vars
                    ? `rgba(${r.mainChannel} / ${e.vars.palette.action.hoverOpacity})`
                    : et(r.main, e.palette.action.hoverOpacity),
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
          [`&.${pv.disabled}`]: {
            backgroundColor: 'transparent',
            color: (e.vars || e).palette.action.disabled,
          },
        },
      );
    },
  ),
  cc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
      p = xe(r, fv),
      b = v({}, r, {
        edge: i,
        color: l,
        disabled: c,
        disableFocusRipple: u,
        size: d,
      }),
      g = mv(b);
    return /* @__PURE__ */ A(
      hv,
      v(
        {
          className: Oe(g.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: c,
          ref: o,
          ownerState: b,
        },
        p,
        {
          children: a,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (cc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The icon to display.
     */
    children: Wt(n.node, (e) =>
      E.Children.toArray(e.children).some(
        (o) => /* @__PURE__ */ E.isValidElement(o) && o.props.onClick,
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
const uc = cc,
  bv = Zn(
    /* @__PURE__ */ A('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  ),
  vv = ['components', 'componentsProps', 'slots', 'slotProps'],
  gv = pe(nb, {
    name: 'MuiPopper',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  dc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r;
    const i = Ll(),
      a = Ge({
        props: t,
        name: 'MuiPopper',
      }),
      { components: s, componentsProps: l, slots: c, slotProps: u } = a,
      d = xe(a, vv),
      p = (r = c == null ? void 0 : c.root) != null ? r : s == null ? void 0 : s.Root;
    return /* @__PURE__ */ A(
      gv,
      v(
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
  (dc.propTypes = {
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
    anchorEl: n.oneOfType([Zt, n.object, n.func]),
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
    container: n.oneOfType([Zt, n.func]),
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
    popperRef: Rt,
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
const pc = dc;
function yv(e) {
  return _e('MuiListSubheader', e);
}
Ae('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const Ev = ['className', 'color', 'component', 'disableGutters', 'disableSticky', 'inset'],
  xv = (e) => {
    const { classes: t, color: o, disableGutters: r, inset: i, disableSticky: a } = e,
      s = {
        root: [
          'root',
          o !== 'default' && `color${Q(o)}`,
          !r && 'gutters',
          i && 'inset',
          !a && 'sticky',
        ],
      };
    return Fe(s, yv, t);
  },
  Ov = pe('li', {
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
    v(
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
  Ji = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
      d = xe(r, Ev),
      p = v({}, r, {
        color: a,
        component: s,
        disableGutters: l,
        disableSticky: c,
        inset: u,
      }),
      b = xv(p);
    return /* @__PURE__ */ A(
      Ov,
      v(
        {
          as: s,
          className: Oe(b.root, i),
          ref: o,
          ownerState: p,
        },
        d,
      ),
    );
  });
Ji.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (Ji.propTypes = {
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
const Tv = Ji,
  Cv = Zn(
    /* @__PURE__ */ A('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function Sv(e) {
  return _e('MuiChip', e);
}
const Rv = Ae('MuiChip', [
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
  Me = Rv,
  wv = [
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
  $v = (e) => {
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
          `size${Q(r)}`,
          `color${Q(i)}`,
          l && 'clickable',
          l && `clickableColor${Q(i)}`,
          s && 'deletable',
          s && `deletableColor${Q(i)}`,
          `${c}${Q(i)}`,
        ],
        label: ['label', `label${Q(r)}`],
        avatar: ['avatar', `avatar${Q(r)}`, `avatarColor${Q(i)}`],
        icon: ['icon', `icon${Q(r)}`, `iconColor${Q(a)}`],
        deleteIcon: [
          'deleteIcon',
          `deleteIcon${Q(r)}`,
          `deleteIconColor${Q(i)}`,
          `deleteIcon${Q(c)}Color${Q(i)}`,
        ],
      };
    return Fe(u, Sv, t);
  },
  Pv = pe('div', {
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
          [`& .${Me.avatar}`]: t[`avatar${Q(l)}`],
        },
        {
          [`& .${Me.avatar}`]: t[`avatarColor${Q(r)}`],
        },
        {
          [`& .${Me.icon}`]: t.icon,
        },
        {
          [`& .${Me.icon}`]: t[`icon${Q(l)}`],
        },
        {
          [`& .${Me.icon}`]: t[`iconColor${Q(i)}`],
        },
        {
          [`& .${Me.deleteIcon}`]: t.deleteIcon,
        },
        {
          [`& .${Me.deleteIcon}`]: t[`deleteIcon${Q(l)}`],
        },
        {
          [`& .${Me.deleteIcon}`]: t[`deleteIconColor${Q(r)}`],
        },
        {
          [`& .${Me.deleteIcon}`]: t[`deleteIcon${Q(c)}Color${Q(r)}`],
        },
        t.root,
        t[`size${Q(l)}`],
        t[`color${Q(r)}`],
        a && t.clickable,
        a && r !== 'default' && t[`clickableColor${Q(r)})`],
        s && t.deletable,
        s && r !== 'default' && t[`deletableColor${Q(r)}`],
        t[c],
        t[`${c}${Q(r)}`],
      ];
    },
  })(
    ({ theme: e, ownerState: t }) => {
      const o = et(e.palette.text.primary, 0.26),
        r = e.palette.mode === 'light' ? e.palette.grey[700] : e.palette.grey[300];
      return v(
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
          [`&.${Me.disabled}`]: {
            opacity: (e.vars || e).palette.action.disabledOpacity,
            pointerEvents: 'none',
          },
          [`& .${Me.avatar}`]: {
            marginLeft: 5,
            marginRight: -6,
            width: 24,
            height: 24,
            color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : r,
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
          [`& .${Me.icon}`]: v(
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
              v(
                {
                  color: e.vars ? e.vars.palette.Chip.defaultIconColor : r,
                },
                t.color !== 'default' && {
                  color: 'inherit',
                },
              ),
          ),
          [`& .${Me.deleteIcon}`]: v(
            {
              WebkitTapHighlightColor: 'transparent',
              color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.26)` : o,
              fontSize: 22,
              cursor: 'pointer',
              margin: '0 5px 0 -6px',
              '&:hover': {
                color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.4)` : et(o, 0.4),
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
                : et(e.palette[t.color].contrastText, 0.7),
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
          [`&.${Me.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : et(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        t.onDelete &&
          t.color !== 'default' && {
            [`&.${Me.focusVisible}`]: {
              backgroundColor: (e.vars || e).palette[t.color].dark,
            },
          },
      );
    },
    ({ theme: e, ownerState: t }) =>
      v(
        {},
        t.clickable && {
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
              : et(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
                ),
          },
          [`&.${Me.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : et(
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
            [`&:hover, &.${Me.focusVisible}`]: {
              backgroundColor: (e.vars || e).palette[t.color].dark,
            },
          },
      ),
    ({ theme: e, ownerState: t }) =>
      v(
        {},
        t.variant === 'outlined' && {
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
        },
        t.variant === 'outlined' &&
          t.color !== 'default' && {
            color: (e.vars || e).palette[t.color].main,
            border: `1px solid ${
              e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : et(e.palette[t.color].main, 0.7)
            }`,
            [`&.${Me.clickable}:hover`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : et(e.palette[t.color].main, e.palette.action.hoverOpacity),
            },
            [`&.${Me.focusVisible}`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.focusOpacity
                  })`
                : et(e.palette[t.color].main, e.palette.action.focusOpacity),
            },
            [`& .${Me.deleteIcon}`]: {
              color: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : et(e.palette[t.color].main, 0.7),
              '&:hover, &:active': {
                color: (e.vars || e).palette[t.color].main,
              },
            },
          },
      ),
  ),
  Nv = pe('span', {
    name: 'MuiChip',
    slot: 'Label',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { size: r } = o;
      return [t.label, t[`label${Q(r)}`]];
    },
  })(({ ownerState: e }) =>
    v(
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
function Ms(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const fc = /* @__PURE__ */ E.forwardRef(function (t, o) {
  const r = Ge({
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
      label: b,
      onClick: g,
      onDelete: y,
      onKeyDown: h,
      onKeyUp: m,
      size: S = 'medium',
      variant: C = 'filled',
      tabIndex: O,
      skipFocusWhenDisabled: x = !1,
    } = r,
    f = xe(r, wv),
    R = E.useRef(null),
    w = ut(R, o),
    z = (G) => {
      G.stopPropagation(), y && y(G);
    },
    L = (G) => {
      G.currentTarget === G.target && Ms(G) && G.preventDefault(), h && h(G);
    },
    D = (G) => {
      G.currentTarget === G.target &&
        (y && Ms(G) ? y(G) : G.key === 'Escape' && R.current && R.current.blur()),
        m && m(G);
    },
    _ = s !== !1 && g ? !0 : s,
    Y = _ || y ? To : c || 'div',
    B = v({}, r, {
      component: Y,
      disabled: d,
      size: S,
      color: l,
      iconColor: /* @__PURE__ */ (E.isValidElement(p) && p.props.color) || l,
      onDelete: !!y,
      clickable: _,
      variant: C,
    }),
    M = $v(B),
    F =
      Y === To
        ? v(
            {
              component: c || 'div',
              focusVisibleClassName: M.focusVisible,
            },
            y && {
              disableRipple: !0,
            },
          )
        : {};
  let V = null;
  y &&
    (V =
      u && /* @__PURE__ */ E.isValidElement(u)
        ? /* @__PURE__ */ E.cloneElement(u, {
            className: Oe(u.props.className, M.deleteIcon),
            onClick: z,
          })
        : /* @__PURE__ */ A(Cv, {
            className: Oe(M.deleteIcon),
            onClick: z,
          }));
  let ae = null;
  i &&
    /* @__PURE__ */ E.isValidElement(i) &&
    (ae = /* @__PURE__ */ E.cloneElement(i, {
      className: Oe(M.avatar, i.props.className),
    }));
  let se = null;
  return (
    p &&
      /* @__PURE__ */ E.isValidElement(p) &&
      (se = /* @__PURE__ */ E.cloneElement(p, {
        className: Oe(M.icon, p.props.className),
      })),
    process.env.NODE_ENV !== 'production' &&
      ae &&
      se &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    /* @__PURE__ */ Xe(
      Pv,
      v(
        {
          as: Y,
          className: Oe(M.root, a),
          disabled: _ && d ? !0 : void 0,
          onClick: g,
          onKeyDown: L,
          onKeyUp: D,
          ref: w,
          tabIndex: x && d ? -1 : O,
          ownerState: B,
        },
        F,
        f,
        {
          children: [
            ae || se,
            /* @__PURE__ */ A(Nv, {
              className: Oe(M.label),
              ownerState: B,
              children: b,
            }),
            V,
          ],
        },
      ),
    )
  );
});
process.env.NODE_ENV !== 'production' &&
  (fc.propTypes = {
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
    children: Qu,
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
const kv = fc;
function Qn({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, i) => ((r[i] = e[i]), o && typeof e[i] > 'u' && (r[i] = o[i]), r), {});
}
const mc = /* @__PURE__ */ E.createContext(void 0);
process.env.NODE_ENV !== 'production' && (mc.displayName = 'FormControlContext');
const Zi = mc;
function Pn() {
  return E.useContext(Zi);
}
function hc(e) {
  return /* @__PURE__ */ A(
    kl,
    v({}, e, {
      defaultTheme: Sr,
    }),
  );
}
process.env.NODE_ENV !== 'production' &&
  (hc.propTypes = {
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
function As(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function Qi(e, t = !1) {
  return (
    e && ((As(e.value) && e.value !== '') || (t && As(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Iv(e) {
  return e.startAdornment;
}
function _v(e) {
  return _e('MuiInputBase', e);
}
const Mv = Ae('MuiInputBase', [
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
  wt = Mv,
  Av = [
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
      o.color && t[`color${Q(o.color)}`],
      o.fullWidth && t.fullWidth,
      o.hiddenLabel && t.hiddenLabel,
    ];
  },
  kr = (e, t) => {
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
  Dv = (e) => {
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
        size: b,
        startAdornment: g,
        type: y,
      } = e,
      h = {
        root: [
          'root',
          `color${Q(o)}`,
          r && 'disabled',
          i && 'error',
          c && 'fullWidth',
          s && 'focused',
          l && 'formControl',
          b === 'small' && 'sizeSmall',
          d && 'multiline',
          g && 'adornedStart',
          a && 'adornedEnd',
          u && 'hiddenLabel',
          p && 'readOnly',
        ],
        input: [
          'input',
          r && 'disabled',
          y === 'search' && 'inputTypeSearch',
          d && 'inputMultiline',
          b === 'small' && 'inputSizeSmall',
          u && 'inputHiddenLabel',
          g && 'inputAdornedStart',
          a && 'inputAdornedEnd',
          p && 'readOnly',
        ],
      };
    return Fe(h, _v, t);
  },
  Ir = pe('div', {
    name: 'MuiInputBase',
    slot: 'Root',
    overridesResolver: Nr,
  })(({ theme: e, ownerState: t }) =>
    v(
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
        [`&.${wt.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
          cursor: 'default',
        },
      },
      t.multiline &&
        v(
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
  _r = pe('input', {
    name: 'MuiInputBase',
    slot: 'Input',
    overridesResolver: kr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light',
      r = v(
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
    return v(
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
        [`label[data-shrink=false] + .${wt.formControl} &`]: {
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
        [`&.${wt.disabled}`]: {
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
  Lv = /* @__PURE__ */ A(hc, {
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
  bc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r;
    const i = Ge({
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
        disabled: b,
        disableInjectingGlobalStyles: g,
        endAdornment: y,
        fullWidth: h = !1,
        id: m,
        inputComponent: S = 'input',
        inputProps: C = {},
        inputRef: O,
        maxRows: x,
        minRows: f,
        multiline: R = !1,
        name: w,
        onBlur: z,
        onChange: L,
        onClick: D,
        onFocus: _,
        onKeyDown: Y,
        onKeyUp: B,
        placeholder: M,
        readOnly: F,
        renderSuffix: V,
        rows: ae,
        slotProps: se = {},
        slots: G = {},
        startAdornment: $,
        type: j = 'text',
        value: X,
      } = i,
      H = xe(i, Av),
      U = C.value != null ? C.value : X,
      { current: ne } = E.useRef(U != null),
      oe = E.useRef(),
      J = E.useCallback((fe) => {
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
      ie = ut(oe, O, C.ref, J),
      [le, he] = E.useState(!1),
      re = Pn();
    process.env.NODE_ENV !== 'production' &&
      E.useEffect(() => {
        if (re) return re.registerEffect();
      }, [re]);
    const k = Qn({
      props: i,
      muiFormControl: re,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (k.focused = re ? re.focused : le),
      E.useEffect(() => {
        !re && b && le && (he(!1), z && z());
      }, [re, b, le, z]);
    const Te = re && re.onFilled,
      I = re && re.onEmpty,
      W = E.useCallback(
        (fe) => {
          Qi(fe) ? Te && Te() : I && I();
        },
        [Te, I],
      );
    ln(() => {
      ne &&
        W({
          value: U,
        });
    }, [U, W, ne]);
    const $e = (fe) => {
        if (k.disabled) {
          fe.stopPropagation();
          return;
        }
        _ && _(fe), C.onFocus && C.onFocus(fe), re && re.onFocus ? re.onFocus(fe) : he(!0);
      },
      ve = (fe) => {
        z && z(fe), C.onBlur && C.onBlur(fe), re && re.onBlur ? re.onBlur(fe) : he(!1);
      },
      Je = (fe, ...ue) => {
        if (!ne) {
          const ee = fe.target || oe.current;
          if (ee == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : bn(1),
            );
          W({
            value: ee.value,
          });
        }
        C.onChange && C.onChange(fe, ...ue), L && L(fe, ...ue);
      };
    E.useEffect(() => {
      W(oe.current);
    }, []);
    const De = (fe) => {
      oe.current && fe.currentTarget === fe.target && oe.current.focus(), D && D(fe);
    };
    let Ce = S,
      Re = C;
    R &&
      Ce === 'input' &&
      (ae
        ? (process.env.NODE_ENV !== 'production' &&
            (f || x) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (Re = v(
            {
              type: void 0,
              minRows: ae,
              maxRows: ae,
            },
            Re,
          )))
        : (Re = v(
            {
              type: void 0,
              maxRows: x,
              minRows: f,
            },
            Re,
          )),
      (Ce = Sb));
    const Ze = (fe) => {
      W(
        fe.animationName === 'mui-auto-fill-cancel'
          ? oe.current
          : {
              value: 'x',
            },
      );
    };
    E.useEffect(() => {
      re && re.setAdornedStart(!!$);
    }, [re, $]);
    const ot = v({}, i, {
        color: k.color || 'primary',
        disabled: k.disabled,
        endAdornment: y,
        error: k.error,
        focused: k.focused,
        formControl: re,
        fullWidth: h,
        hiddenLabel: k.hiddenLabel,
        multiline: R,
        size: k.size,
        startAdornment: $,
        type: j,
      }),
      Z = Dv(ot),
      me = G.root || u.Root || Ir,
      ge = se.root || d.root || {},
      be = G.input || u.Input || _r;
    return (
      (Re = v({}, Re, (r = se.input) != null ? r : d.input)),
      /* @__PURE__ */ Xe(E.Fragment, {
        children: [
          !g && Lv,
          /* @__PURE__ */ Xe(
            me,
            v(
              {},
              ge,
              !hn(me) && {
                ownerState: v({}, ot, ge.ownerState),
              },
              {
                ref: o,
                onClick: De,
              },
              H,
              {
                className: Oe(Z.root, ge.className, c, F && 'MuiInputBase-readOnly'),
                children: [
                  $,
                  /* @__PURE__ */ A(Zi.Provider, {
                    value: null,
                    children: /* @__PURE__ */ A(
                      be,
                      v(
                        {
                          ownerState: ot,
                          'aria-invalid': k.error,
                          'aria-describedby': a,
                          autoComplete: s,
                          autoFocus: l,
                          defaultValue: p,
                          disabled: k.disabled,
                          id: m,
                          onAnimationStart: Ze,
                          name: w,
                          placeholder: M,
                          readOnly: F,
                          required: k.required,
                          rows: ae,
                          value: U,
                          onKeyDown: Y,
                          onKeyUp: B,
                          type: j,
                        },
                        Re,
                        !hn(be) && {
                          as: Ce,
                          ownerState: v({}, ot, Re.ownerState),
                        },
                        {
                          ref: ie,
                          className: Oe(Z.input, Re.className, F && 'MuiInputBase-readOnly'),
                          onBlur: ve,
                          onChange: Je,
                          onFocus: $e,
                        },
                      ),
                    ),
                  }),
                  y,
                  V
                    ? V(
                        v({}, k, {
                          startAdornment: $,
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
  (bc.propTypes = {
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
    inputComponent: xi,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * @default {}
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: Rt,
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
const ea = bc;
function Fv(e) {
  return _e('MuiInput', e);
}
const jv = v({}, wt, Ae('MuiInput', ['root', 'underline', 'input'])),
  fn = jv;
function zv(e) {
  return _e('MuiOutlinedInput', e);
}
const Vv = v({}, wt, Ae('MuiOutlinedInput', ['root', 'notchedOutline', 'input'])),
  Kt = Vv;
function Bv(e) {
  return _e('MuiFilledInput', e);
}
const Uv = v({}, wt, Ae('MuiFilledInput', ['root', 'underline', 'input'])),
  $t = Uv,
  vc = Zn(
    /* @__PURE__ */ A('path', {
      d: 'M7 10l5 5 5-5z',
    }),
    'ArrowDropDown',
  );
function Wv(e) {
  return _e('MuiAutocomplete', e);
}
const Hv = Ae('MuiAutocomplete', [
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
  Pe = Hv;
var Ds, Ls;
const qv = [
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
  Yv = (e) => {
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
    return Fe(p, Wv, t);
  },
  Kv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: i, hasPopupIcon: a, inputFocused: s, size: l } = o;
      return [
        {
          [`& .${Pe.tag}`]: t.tag,
        },
        {
          [`& .${Pe.tag}`]: t[`tagSize${Q(l)}`],
        },
        {
          [`& .${Pe.inputRoot}`]: t.inputRoot,
        },
        {
          [`& .${Pe.input}`]: t.input,
        },
        {
          [`& .${Pe.input}`]: s && t.inputFocused,
        },
        t.root,
        r && t.fullWidth,
        a && t.hasPopupIcon,
        i && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) =>
    v(
      {
        [`&.${Pe.focused} .${Pe.clearIndicator}`]: {
          visibility: 'visible',
        },
        /* Avoid double tap issue on iOS */
        '@media (pointer: fine)': {
          [`&:hover .${Pe.clearIndicator}`]: {
            visibility: 'visible',
          },
        },
      },
      e.fullWidth && {
        width: '100%',
      },
      {
        [`& .${Pe.tag}`]: v(
          {
            margin: 3,
            maxWidth: 'calc(100% - 6px)',
          },
          e.size === 'small' && {
            margin: 2,
            maxWidth: 'calc(100% - 4px)',
          },
        ),
        [`& .${Pe.inputRoot}`]: {
          flexWrap: 'wrap',
          [`.${Pe.hasPopupIcon}&, .${Pe.hasClearIcon}&`]: {
            paddingRight: 26 + 4,
          },
          [`.${Pe.hasPopupIcon}.${Pe.hasClearIcon}&`]: {
            paddingRight: 52 + 4,
          },
          [`& .${Pe.input}`]: {
            width: 0,
            minWidth: 30,
          },
        },
        [`& .${fn.root}`]: {
          paddingBottom: 1,
          '& .MuiInput-input': {
            padding: '4px 4px 4px 0px',
          },
        },
        [`& .${fn.root}.${wt.sizeSmall}`]: {
          [`& .${fn.input}`]: {
            padding: '2px 4px 3px 0',
          },
        },
        [`& .${Kt.root}`]: {
          padding: 9,
          [`.${Pe.hasPopupIcon}&, .${Pe.hasClearIcon}&`]: {
            paddingRight: 26 + 4 + 9,
          },
          [`.${Pe.hasPopupIcon}.${Pe.hasClearIcon}&`]: {
            paddingRight: 52 + 4 + 9,
          },
          [`& .${Pe.input}`]: {
            padding: '7.5px 4px 7.5px 6px',
          },
          [`& .${Pe.endAdornment}`]: {
            right: 9,
          },
        },
        [`& .${Kt.root}.${wt.sizeSmall}`]: {
          // Don't specify paddingRight, as it overrides the default value set when there is only
          // one of the popup or clear icon as the specificity is equal so the latter one wins
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 6,
          [`& .${Pe.input}`]: {
            padding: '2.5px 4px 2.5px 6px',
          },
        },
        [`& .${$t.root}`]: {
          paddingTop: 19,
          paddingLeft: 8,
          [`.${Pe.hasPopupIcon}&, .${Pe.hasClearIcon}&`]: {
            paddingRight: 26 + 4 + 9,
          },
          [`.${Pe.hasPopupIcon}.${Pe.hasClearIcon}&`]: {
            paddingRight: 52 + 4 + 9,
          },
          [`& .${$t.input}`]: {
            padding: '7px 4px',
          },
          [`& .${Pe.endAdornment}`]: {
            right: 9,
          },
        },
        [`& .${$t.root}.${wt.sizeSmall}`]: {
          paddingBottom: 1,
          [`& .${$t.input}`]: {
            padding: '2.5px 4px',
          },
        },
        [`& .${wt.hiddenLabel}`]: {
          paddingTop: 8,
        },
        [`& .${$t.root}.${wt.hiddenLabel}`]: {
          paddingTop: 0,
          paddingBottom: 0,
          [`& .${Pe.input}`]: {
            paddingTop: 16,
            paddingBottom: 17,
          },
        },
        [`& .${$t.root}.${wt.hiddenLabel}.${wt.sizeSmall}`]: {
          [`& .${Pe.input}`]: {
            paddingTop: 8,
            paddingBottom: 9,
          },
        },
        [`& .${Pe.input}`]: v(
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
  Gv = pe('div', {
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
  Xv = pe(uc, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({
    marginRight: -2,
    padding: 4,
    visibility: 'hidden',
  }),
  Jv = pe(uc, {
    name: 'MuiAutocomplete',
    slot: 'PopupIndicator',
    overridesResolver: ({ ownerState: e }, t) =>
      v({}, t.popupIndicator, e.popupOpen && t.popupIndicatorOpen),
  })(({ ownerState: e }) =>
    v(
      {
        padding: 2,
        marginRight: -2,
      },
      e.popupOpen && {
        transform: 'rotate(180deg)',
      },
    ),
  ),
  Zv = pe(pc, {
    name: 'MuiAutocomplete',
    slot: 'Popper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${Pe.option}`]: t.option,
        },
        t.popper,
        o.disablePortal && t.popperDisablePortal,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    v(
      {
        zIndex: (e.vars || e).zIndex.modal,
      },
      t.disablePortal && {
        position: 'absolute',
      },
    ),
  ),
  Qv = pe(ko, {
    name: 'MuiAutocomplete',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })(({ theme: e }) =>
    v({}, e.typography.body1, {
      overflow: 'auto',
    }),
  ),
  eg = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  tg = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  ng = pe('div', {
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
      [e.breakpoints.up('sm')]: {
        minHeight: 'auto',
      },
      [`&.${Pe.focused}`]: {
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
      [`&.${Pe.focusVisible}`]: {
        backgroundColor: (e.vars || e).palette.action.focus,
      },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : et(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${Pe.focused}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : et(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: (e.vars || e).palette.action.selected,
          },
        },
        [`&.${Pe.focusVisible}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
            : et(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
              ),
        },
      },
    },
  })),
  og = pe(Tv, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({
    backgroundColor: (e.vars || e).palette.background.paper,
    top: -8,
  })),
  rg = pe('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({
    padding: 0,
    [`& .${Pe.option}`]: {
      paddingLeft: 24,
    },
  }),
  gc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ge({
        props: t,
        name: 'MuiAutocomplete',
      }),
      {
        autoComplete: c = !1,
        autoHighlight: u = !1,
        autoSelect: d = !1,
        blurOnSelect: p = !1,
        ChipProps: b,
        className: g,
        clearIcon: y = Ds ||
          (Ds = /* @__PURE__ */ A(bv, {
            fontSize: 'small',
          })),
        clearOnBlur: h = !l.freeSolo,
        clearOnEscape: m = !1,
        clearText: S = 'Clear',
        closeText: C = 'Close',
        componentsProps: O = {},
        defaultValue: x = l.multiple ? [] : null,
        disableClearable: f = !1,
        disableCloseOnSelect: R = !1,
        disabled: w = !1,
        disabledItemsFocusable: z = !1,
        disableListWrap: L = !1,
        disablePortal: D = !1,
        filterSelectedOptions: _ = !1,
        forcePopupIcon: Y = 'auto',
        freeSolo: B = !1,
        fullWidth: M = !1,
        getLimitTagsText: F = (ke) => `+${ke}`,
        getOptionLabel: V = (ke) => {
          var lt;
          return (lt = ke.label) != null ? lt : ke;
        },
        groupBy: ae,
        handleHomeEndKeys: se = !l.freeSolo,
        includeInputInList: G = !1,
        limitTags: $ = -1,
        ListboxComponent: j = 'ul',
        ListboxProps: X,
        loading: H = !1,
        loadingText: U = 'Loading…',
        multiple: ne = !1,
        noOptionsText: oe = 'No options',
        openOnFocus: J = !1,
        openText: ie = 'Open',
        PaperComponent: le = ko,
        PopperComponent: he = pc,
        popupIcon: re = Ls || (Ls = /* @__PURE__ */ A(vc, {})),
        readOnly: k = !1,
        renderGroup: Te,
        renderInput: I,
        renderOption: W,
        renderTags: $e,
        selectOnFocus: ve = !l.freeSolo,
        size: Je = 'medium',
        slotProps: De = {},
      } = l,
      Ce = xe(l, qv),
      {
        getRootProps: Re,
        getInputProps: Ze,
        getInputLabelProps: ot,
        getPopupIndicatorProps: Z,
        getClearProps: me,
        getTagProps: ge,
        getListboxProps: be,
        getOptionProps: fe,
        value: ue,
        dirty: ee,
        expanded: ye,
        id: Ee,
        popupOpen: Ne,
        focused: rt,
        focusedTag: dt,
        anchorEl: xt,
        setAnchorEl: un,
        inputValue: Ot,
        groupedOptions: mt,
      } = Pb(
        v({}, l, {
          componentName: 'Autocomplete',
        }),
      ),
      vt = !f && !w && ee && !k,
      pt = (!B || Y === !0) && Y !== !1,
      Qe = v({}, l, {
        disablePortal: D,
        expanded: ye,
        focused: rt,
        fullWidth: M,
        hasClearIcon: vt,
        hasPopupIcon: pt,
        inputFocused: dt === -1,
        popupOpen: Ne,
        size: Je,
      }),
      tt = Yv(Qe);
    let ft;
    if (ne && ue.length > 0) {
      const ke = (lt) =>
        v(
          {
            className: tt.tag,
            disabled: w,
          },
          ge(lt),
        );
      $e
        ? (ft = $e(ue, ke, Qe))
        : (ft = ue.map((lt, It) =>
            /* @__PURE__ */ A(
              kv,
              v(
                {
                  label: V(lt),
                  size: Je,
                },
                ke({
                  index: It,
                }),
                b,
              ),
            ),
          ));
    }
    if ($ > -1 && Array.isArray(ft)) {
      const ke = ft.length - $;
      !rt &&
        ke > 0 &&
        ((ft = ft.splice(0, $)),
        ft.push(
          /* @__PURE__ */ A(
            'span',
            {
              className: tt.tag,
              children: F(ke),
            },
            ft.length,
          ),
        ));
    }
    const qt =
        Te ||
        ((ke) =>
          /* @__PURE__ */ Xe(
            'li',
            {
              children: [
                /* @__PURE__ */ A(og, {
                  className: tt.groupLabel,
                  ownerState: Qe,
                  component: 'div',
                  children: ke.group,
                }),
                /* @__PURE__ */ A(rg, {
                  className: tt.groupUl,
                  ownerState: Qe,
                  children: ke.children,
                }),
              ],
            },
            ke.key,
          )),
      jt =
        W ||
        ((ke, lt) =>
          /* @__PURE__ */ A(
            'li',
            v({}, ke, {
              children: V(lt),
            }),
          )),
      nn = (ke, lt) => {
        const It = fe({
          option: ke,
          index: lt,
        });
        return jt(
          v({}, It, {
            className: tt.option,
          }),
          ke,
          {
            selected: It['aria-selected'],
            index: lt,
            inputValue: Ot,
          },
        );
      },
      on = (r = De.clearIndicator) != null ? r : O.clearIndicator,
      rn = (i = De.paper) != null ? i : O.paper,
      Yt = (a = De.popper) != null ? a : O.popper,
      an = (s = De.popupIndicator) != null ? s : O.popupIndicator;
    return /* @__PURE__ */ Xe(E.Fragment, {
      children: [
        /* @__PURE__ */ A(
          Kv,
          v(
            {
              ref: o,
              className: Oe(tt.root, g),
              ownerState: Qe,
            },
            Re(Ce),
            {
              children: I({
                id: Ee,
                disabled: w,
                fullWidth: !0,
                size: Je === 'small' ? 'small' : void 0,
                InputLabelProps: ot(),
                InputProps: v(
                  {
                    ref: un,
                    className: tt.inputRoot,
                    startAdornment: ft,
                  },
                  (vt || pt) && {
                    endAdornment: /* @__PURE__ */ Xe(Gv, {
                      className: tt.endAdornment,
                      ownerState: Qe,
                      children: [
                        vt
                          ? /* @__PURE__ */ A(
                              Xv,
                              v(
                                {},
                                me(),
                                {
                                  'aria-label': S,
                                  title: S,
                                  ownerState: Qe,
                                },
                                on,
                                {
                                  className: Oe(
                                    tt.clearIndicator,
                                    on == null ? void 0 : on.className,
                                  ),
                                  children: y,
                                },
                              ),
                            )
                          : null,
                        pt
                          ? /* @__PURE__ */ A(
                              Jv,
                              v(
                                {},
                                Z(),
                                {
                                  disabled: w,
                                  'aria-label': Ne ? C : ie,
                                  title: Ne ? C : ie,
                                  ownerState: Qe,
                                },
                                an,
                                {
                                  className: Oe(
                                    tt.popupIndicator,
                                    an == null ? void 0 : an.className,
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
                inputProps: v(
                  {
                    className: tt.input,
                    disabled: w,
                    readOnly: k,
                  },
                  Ze(),
                ),
              }),
            },
          ),
        ),
        xt
          ? /* @__PURE__ */ A(
              Zv,
              v(
                {
                  as: he,
                  disablePortal: D,
                  style: {
                    width: xt ? xt.clientWidth : null,
                  },
                  ownerState: Qe,
                  role: 'presentation',
                  anchorEl: xt,
                  open: Ne,
                },
                Yt,
                {
                  className: Oe(tt.popper, Yt == null ? void 0 : Yt.className),
                  children: /* @__PURE__ */ Xe(
                    Qv,
                    v(
                      {
                        ownerState: Qe,
                        as: le,
                      },
                      rn,
                      {
                        className: Oe(tt.paper, rn == null ? void 0 : rn.className),
                        children: [
                          H && mt.length === 0
                            ? /* @__PURE__ */ A(eg, {
                                className: tt.loading,
                                ownerState: Qe,
                                children: U,
                              })
                            : null,
                          mt.length === 0 && !B && !H
                            ? /* @__PURE__ */ A(tg, {
                                className: tt.noOptions,
                                ownerState: Qe,
                                role: 'presentation',
                                onMouseDown: (ke) => {
                                  ke.preventDefault();
                                },
                                children: oe,
                              })
                            : null,
                          mt.length > 0
                            ? /* @__PURE__ */ A(
                                ng,
                                v(
                                  {
                                    as: j,
                                    className: tt.listbox,
                                    ownerState: Qe,
                                  },
                                  be(),
                                  X,
                                  {
                                    children: mt.map((ke, lt) =>
                                      ae
                                        ? qt({
                                            key: ke.key,
                                            group: ke.group,
                                            children: ke.options.map((It, T) =>
                                              nn(It, ke.index + T),
                                            ),
                                          })
                                        : nn(ke, lt),
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
  (gc.propTypes = {
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
    defaultValue: Wt(n.any, (e) =>
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
    limitTags: Ti,
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
    value: Wt(n.any, (e) =>
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
const ig = gc,
  ag = [
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
  sg = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
  },
  yc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Jn(),
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
        onEntering: b,
        onExit: g,
        onExited: y,
        onExiting: h,
        style: m,
        timeout: S = i,
        // eslint-disable-next-line react/prop-types
        TransitionComponent: C = oc,
      } = t,
      O = xe(t, ag),
      x = E.useRef(null),
      f = ut(x, l.ref, o),
      R = (M) => (F) => {
        if (M) {
          const V = x.current;
          F === void 0 ? M(V) : M(V, F);
        }
      },
      w = R(b),
      z = R((M, F) => {
        rc(M);
        const V = ar(
          {
            style: m,
            timeout: S,
            easing: c,
          },
          {
            mode: 'enter',
          },
        );
        (M.style.webkitTransition = r.transitions.create('opacity', V)),
          (M.style.transition = r.transitions.create('opacity', V)),
          d && d(M, F);
      }),
      L = R(p),
      D = R(h),
      _ = R((M) => {
        const F = ar(
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
          g && g(M);
      }),
      Y = R(y);
    return /* @__PURE__ */ A(
      C,
      v(
        {
          appear: s,
          in: u,
          nodeRef: x,
          onEnter: z,
          onEntered: L,
          onEntering: w,
          onExit: _,
          onExited: Y,
          onExiting: D,
          addEndListener: (M) => {
            a && a(x.current, M);
          },
          timeout: S,
        },
        O,
        {
          children: (M, F) =>
            /* @__PURE__ */ E.cloneElement(
              l,
              v(
                {
                  style: v(
                    {
                      opacity: 0,
                      visibility: M === 'exited' && !u ? 'hidden' : void 0,
                    },
                    sg[M],
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
  (yc.propTypes = {
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
    children: Gn.isRequired,
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
const lg = yc;
function cg(e) {
  return _e('MuiBackdrop', e);
}
Ae('MuiBackdrop', ['root', 'invisible']);
const ug = [
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
  dg = (e) => {
    const { classes: t, invisible: o } = e;
    return Fe(
      {
        root: ['root', o && 'invisible'],
      },
      cg,
      t,
    );
  },
  pg = pe('div', {
    name: 'MuiBackdrop',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.invisible && t.invisible];
    },
  })(({ ownerState: e }) =>
    v(
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
  Ec = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r, i, a;
    const s = Ge({
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
        open: g,
        slotProps: y = {},
        slots: h = {},
        TransitionComponent: m = lg,
        transitionDuration: S,
      } = s,
      C = xe(s, ug),
      O = v({}, s, {
        component: u,
        invisible: b,
      }),
      x = dg(O),
      f = (r = y.root) != null ? r : p.root;
    return /* @__PURE__ */ A(
      m,
      v(
        {
          in: g,
          timeout: S,
        },
        C,
        {
          children: /* @__PURE__ */ A(
            pg,
            v(
              {
                'aria-hidden': !0,
              },
              f,
              {
                as: (i = (a = h.root) != null ? a : d.Root) != null ? i : u,
                className: Oe(x.root, c, f == null ? void 0 : f.className),
                ownerState: v({}, O, f == null ? void 0 : f.ownerState),
                classes: x,
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
const fg = Ec;
function mg(e) {
  return _e('MuiButton', e);
}
const hg = Ae('MuiButton', [
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
  zo = hg,
  xc = /* @__PURE__ */ E.createContext({});
process.env.NODE_ENV !== 'production' && (xc.displayName = 'ButtonGroupContext');
const bg = xc,
  vg = [
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
  gg = (e) => {
    const { color: t, disableElevation: o, fullWidth: r, size: i, variant: a, classes: s } = e,
      l = {
        root: [
          'root',
          a,
          `${a}${Q(t)}`,
          `size${Q(i)}`,
          `${a}Size${Q(i)}`,
          t === 'inherit' && 'colorInherit',
          o && 'disableElevation',
          r && 'fullWidth',
        ],
        label: ['label'],
        startIcon: ['startIcon', `iconSize${Q(i)}`],
        endIcon: ['endIcon', `iconSize${Q(i)}`],
      },
      c = Fe(l, mg, s);
    return v({}, s, c);
  },
  Oc = (e) =>
    v(
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
  yg = pe(To, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
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
      return v(
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
          '&:hover': v(
            {
              textDecoration: 'none',
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
                : et(e.palette.text.primary, e.palette.action.hoverOpacity),
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
                  : et(e.palette[t.color].main, e.palette.action.hoverOpacity),
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
                  : et(e.palette[t.color].main, e.palette.action.hoverOpacity),
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
          '&:active': v(
            {},
            t.variant === 'contained' && {
              boxShadow: (e.vars || e).shadows[8],
            },
          ),
          [`&.${zo.focusVisible}`]: v(
            {},
            t.variant === 'contained' && {
              boxShadow: (e.vars || e).shadows[6],
            },
          ),
          [`&.${zo.disabled}`]: v(
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
              : `1px solid ${et(e.palette[t.color].main, 0.5)}`,
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
        [`&.${zo.focusVisible}`]: {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        [`&.${zo.disabled}`]: {
          boxShadow: 'none',
        },
      },
  ),
  Eg = pe('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${Q(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    v(
      {
        display: 'inherit',
        marginRight: 8,
        marginLeft: -4,
      },
      e.size === 'small' && {
        marginLeft: -2,
      },
      Oc(e),
    ),
  ),
  xg = pe('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${Q(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    v(
      {
        display: 'inherit',
        marginRight: -4,
        marginLeft: 8,
      },
      e.size === 'small' && {
        marginRight: -2,
      },
      Oc(e),
    ),
  ),
  Tc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = E.useContext(bg),
      i = Ci(r, t),
      a = Ge({
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
        disableFocusRipple: b = !1,
        endIcon: g,
        focusVisibleClassName: y,
        fullWidth: h = !1,
        size: m = 'medium',
        startIcon: S,
        type: C,
        variant: O = 'text',
      } = a,
      x = xe(a, vg),
      f = v({}, a, {
        color: l,
        component: c,
        disabled: d,
        disableElevation: p,
        disableFocusRipple: b,
        fullWidth: h,
        size: m,
        type: C,
        variant: O,
      }),
      R = gg(f),
      w =
        S &&
        /* @__PURE__ */ A(Eg, {
          className: R.startIcon,
          ownerState: f,
          children: S,
        }),
      z =
        g &&
        /* @__PURE__ */ A(xg, {
          className: R.endIcon,
          ownerState: f,
          children: g,
        });
    return /* @__PURE__ */ Xe(
      yg,
      v(
        {
          ownerState: f,
          className: Oe(r.className, R.root, u),
          component: c,
          disabled: d,
          focusRipple: !b,
          focusVisibleClassName: Oe(R.focusVisible, y),
          ref: o,
          type: C,
        },
        x,
        {
          classes: R,
          children: [w, s, z],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Tc.propTypes = {
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
const Og = Tc;
function Tg(e) {
  return _e('PrivateSwitchBase', e);
}
Ae('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const Cg = [
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
  Sg = (e) => {
    const { classes: t, checked: o, disabled: r, edge: i } = e,
      a = {
        root: ['root', o && 'checked', r && 'disabled', i && `edge${Q(i)}`],
        input: ['input'],
      };
    return Fe(a, Tg, t);
  },
  Rg = pe(To)(({ ownerState: e }) =>
    v(
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
  wg = pe('input')({
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
  Cc = /* @__PURE__ */ E.forwardRef(function (t, o) {
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
        id: b,
        inputProps: g,
        inputRef: y,
        name: h,
        onBlur: m,
        onChange: S,
        onFocus: C,
        readOnly: O,
        required: x = !1,
        tabIndex: f,
        type: R,
        value: w,
      } = t,
      z = xe(t, Cg),
      [L, D] = Cn({
        controlled: i,
        default: !!l,
        name: 'SwitchBase',
        state: 'checked',
      }),
      _ = Pn(),
      Y = (G) => {
        C && C(G), _ && _.onFocus && _.onFocus(G);
      },
      B = (G) => {
        m && m(G), _ && _.onBlur && _.onBlur(G);
      },
      M = (G) => {
        if (G.nativeEvent.defaultPrevented) return;
        const $ = G.target.checked;
        D($), S && S(G, $);
      };
    let F = c;
    _ && typeof F > 'u' && (F = _.disabled);
    const V = R === 'checkbox' || R === 'radio',
      ae = v({}, t, {
        checked: L,
        disabled: F,
        disableFocusRipple: u,
        edge: d,
      }),
      se = Sg(ae);
    return /* @__PURE__ */ Xe(
      Rg,
      v(
        {
          component: 'span',
          className: Oe(se.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: F,
          tabIndex: null,
          role: void 0,
          onFocus: Y,
          onBlur: B,
          ownerState: ae,
          ref: o,
        },
        z,
        {
          children: [
            /* @__PURE__ */ A(
              wg,
              v(
                {
                  autoFocus: r,
                  checked: i,
                  defaultChecked: l,
                  className: se.input,
                  disabled: F,
                  id: V ? b : void 0,
                  name: h,
                  onChange: M,
                  readOnly: O,
                  ref: y,
                  required: x,
                  ownerState: ae,
                  tabIndex: f,
                  type: R,
                },
                R === 'checkbox' && w === void 0
                  ? {}
                  : {
                      value: w,
                    },
                g,
              ),
            ),
            L ? a : p,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Cc.propTypes = {
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
    inputRef: Rt,
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
const Sc = Cc,
  $g = Zn(
    /* @__PURE__ */ A('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  Pg = Zn(
    /* @__PURE__ */ A('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  Ng = Zn(
    /* @__PURE__ */ A('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function kg(e) {
  return _e('MuiCheckbox', e);
}
const Ig = Ae('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  Kr = Ig,
  _g = [
    'checkedIcon',
    'color',
    'icon',
    'indeterminate',
    'indeterminateIcon',
    'inputProps',
    'size',
    'className',
  ],
  Mg = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      i = {
        root: ['root', o && 'indeterminate', `color${Q(r)}`],
      },
      a = Fe(i, kg, t);
    return v({}, t, a);
  },
  Ag = pe(Sc, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
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
    v(
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
            : et(
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
        [`&.${Kr.checked}, &.${Kr.indeterminate}`]: {
          color: (e.vars || e).palette[t.color].main,
        },
        [`&.${Kr.disabled}`]: {
          color: (e.vars || e).palette.action.disabled,
        },
      },
    ),
  ),
  Dg = /* @__PURE__ */ A(Pg, {}),
  Lg = /* @__PURE__ */ A($g, {}),
  Fg = /* @__PURE__ */ A(Ng, {}),
  Rc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r, i;
    const a = Ge({
        props: t,
        name: 'MuiCheckbox',
      }),
      {
        checkedIcon: s = Dg,
        color: l = 'primary',
        icon: c = Lg,
        indeterminate: u = !1,
        indeterminateIcon: d = Fg,
        inputProps: p,
        size: b = 'medium',
        className: g,
      } = a,
      y = xe(a, _g),
      h = u ? d : c,
      m = u ? d : s,
      S = v({}, a, {
        color: l,
        indeterminate: u,
        size: b,
      }),
      C = Mg(S);
    return /* @__PURE__ */ A(
      Ag,
      v(
        {
          type: 'checkbox',
          inputProps: v(
            {
              'data-indeterminate': u,
            },
            p,
          ),
          icon: /* @__PURE__ */ E.cloneElement(h, {
            fontSize: (r = h.props.fontSize) != null ? r : b,
          }),
          checkedIcon: /* @__PURE__ */ E.cloneElement(m, {
            fontSize: (i = m.props.fontSize) != null ? i : b,
          }),
          ownerState: S,
          ref: o,
          className: Oe(C.root, g),
        },
        y,
        {
          classes: C,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Rc.propTypes = {
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
    inputRef: Rt,
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
const jg = Rc,
  zg = [
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
  Vg = pe('div', {
    name: 'MuiModal',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, !o.open && o.exited && t.hidden];
    },
  })(({ theme: e, ownerState: t }) =>
    v(
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
  Bg = pe(fg, {
    name: 'MuiModal',
    slot: 'Backdrop',
    overridesResolver: (e, t) => t.backdrop,
  })({
    zIndex: -1,
  }),
  wc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r, i, a, s, l, c;
    const u = Ge({
        name: 'MuiModal',
        props: t,
      }),
      {
        BackdropComponent: d = Bg,
        BackdropProps: p,
        classes: b,
        className: g,
        closeAfterTransition: y = !1,
        children: h,
        component: m,
        components: S = {},
        componentsProps: C = {},
        disableAutoFocus: O = !1,
        disableEnforceFocus: x = !1,
        disableEscapeKeyDown: f = !1,
        disablePortal: R = !1,
        disableRestoreFocus: w = !1,
        disableScrollLock: z = !1,
        hideBackdrop: L = !1,
        keepMounted: D = !1,
        slotProps: _,
        slots: Y,
        // eslint-disable-next-line react/prop-types
        theme: B,
      } = u,
      M = xe(u, zg),
      [F, V] = E.useState(!0),
      ae = {
        closeAfterTransition: y,
        disableAutoFocus: O,
        disableEnforceFocus: x,
        disableEscapeKeyDown: f,
        disablePortal: R,
        disableRestoreFocus: w,
        disableScrollLock: z,
        hideBackdrop: L,
        keepMounted: D,
      },
      se = v({}, u, ae, {
        exited: F,
      }),
      G = (r = (i = Y == null ? void 0 : Y.root) != null ? i : S.Root) != null ? r : Vg,
      $ = (a = (s = Y == null ? void 0 : Y.backdrop) != null ? s : S.Backdrop) != null ? a : d,
      j = (l = _ == null ? void 0 : _.root) != null ? l : C.root,
      X = (c = _ == null ? void 0 : _.backdrop) != null ? c : C.backdrop;
    return /* @__PURE__ */ A(
      mb,
      v(
        {
          slots: {
            root: G,
            backdrop: $,
          },
          slotProps: {
            root: () =>
              v(
                {},
                si(j, se),
                !hn(G) && {
                  as: m,
                  theme: B,
                },
                {
                  className: Oe(
                    g,
                    j == null ? void 0 : j.className,
                    b == null ? void 0 : b.root,
                    !se.open && se.exited && (b == null ? void 0 : b.hidden),
                  ),
                },
              ),
            backdrop: () =>
              v({}, p, si(X, se), {
                className: Oe(X == null ? void 0 : X.className, b == null ? void 0 : b.backdrop),
              }),
          },
          onTransitionEnter: () => V(!1),
          onTransitionExited: () => V(!0),
          ref: o,
        },
        M,
        ae,
        {
          children: h,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (wc.propTypes = {
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
    children: Gn.isRequired,
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
    container: n.oneOfType([Zt, n.func]),
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
const Ug = wc,
  Wg = [
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
  Hg = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Fe(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Bv,
        t,
      );
    return v({}, t, i);
  },
  qg = pe(Ir, {
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
    return v(
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
        [`&.${$t.focused}`]: {
          backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a,
        },
        [`&.${$t.disabled}`]: {
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
        [`&.${$t.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: 'scaleX(1) translateX(0)',
        },
        [`&.${$t.error}`]: {
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
        [`&:hover:not(.${$t.disabled}, .${$t.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
        },
        [`&.${$t.disabled}:before`]: {
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
        v(
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
  Yg = pe(_r, {
    name: 'MuiFilledInput',
    slot: 'Input',
    overridesResolver: kr,
  })(({ theme: e, ownerState: t }) =>
    v(
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
  ta = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ge({
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
        slotProps: g,
        slots: y = {},
        type: h = 'text',
      } = l,
      m = xe(l, Wg),
      S = v({}, l, {
        fullWidth: d,
        inputComponent: p,
        multiline: b,
        type: h,
      }),
      C = Hg(l),
      O = {
        root: {
          ownerState: S,
        },
        input: {
          ownerState: S,
        },
      },
      x = g ?? u ? At(g ?? u, O) : O,
      f = (r = (i = y.root) != null ? i : c.Root) != null ? r : qg,
      R = (a = (s = y.input) != null ? s : c.Input) != null ? a : Yg;
    return /* @__PURE__ */ A(
      ea,
      v(
        {
          slots: {
            root: f,
            input: R,
          },
          componentsProps: x,
          fullWidth: d,
          inputComponent: p,
          multiline: b,
          ref: o,
          type: h,
        },
        m,
        {
          classes: C,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ta.propTypes = {
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
    inputRef: Rt,
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
ta.muiName = 'Input';
const $c = ta;
function Kg(e) {
  return _e('MuiFormControl', e);
}
Ae('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const Gg = [
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
  Xg = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      i = {
        root: ['root', o !== 'none' && `margin${Q(o)}`, r && 'fullWidth'],
      };
    return Fe(i, Kg, t);
  },
  Jg = pe('div', {
    name: 'MuiFormControl',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      v({}, t.root, t[`margin${Q(e.margin)}`], e.fullWidth && t.fullWidth),
  })(({ ownerState: e }) =>
    v(
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
  Pc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
        hiddenLabel: b = !1,
        margin: g = 'none',
        required: y = !1,
        size: h = 'medium',
        variant: m = 'outlined',
      } = r,
      S = xe(r, Gg),
      C = v({}, r, {
        color: s,
        component: l,
        disabled: c,
        error: u,
        fullWidth: p,
        hiddenLabel: b,
        margin: g,
        required: y,
        size: h,
        variant: m,
      }),
      O = Xg(C),
      [x, f] = E.useState(() => {
        let B = !1;
        return (
          i &&
            E.Children.forEach(i, (M) => {
              if (!zr(M, ['Input', 'Select'])) return;
              const F = zr(M, ['Select']) ? M.props.input : M;
              F && Iv(F.props) && (B = !0);
            }),
          B
        );
      }),
      [R, w] = E.useState(() => {
        let B = !1;
        return (
          i &&
            E.Children.forEach(i, (M) => {
              zr(M, ['Input', 'Select']) && Qi(M.props, !0) && (B = !0);
            }),
          B
        );
      }),
      [z, L] = E.useState(!1);
    c && z && L(!1);
    const D = d !== void 0 && !c ? d : z;
    let _;
    if (process.env.NODE_ENV !== 'production') {
      const B = E.useRef(!1);
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
    const Y = E.useMemo(
      () => ({
        adornedStart: x,
        setAdornedStart: f,
        color: s,
        disabled: c,
        error: u,
        filled: R,
        focused: D,
        fullWidth: p,
        hiddenLabel: b,
        size: h,
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
        registerEffect: _,
        required: y,
        variant: m,
      }),
      [x, s, c, u, R, D, p, b, _, y, h, m],
    );
    return /* @__PURE__ */ A(Zi.Provider, {
      value: Y,
      children: /* @__PURE__ */ A(
        Jg,
        v(
          {
            as: l,
            ownerState: C,
            className: Oe(O.root, a),
            ref: o,
          },
          S,
          {
            children: i,
          },
        ),
      ),
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
const Zg = Pc;
function Qg(e) {
  return _e('MuiFormHelperText', e);
}
const ey = Ae('MuiFormHelperText', [
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
  Fs = ey;
var js;
const ty = [
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
  ny = (e) => {
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
          r && `size${Q(r)}`,
          o && 'contained',
          l && 'focused',
          s && 'filled',
          c && 'required',
        ],
      };
    return Fe(u, Qg, t);
  },
  oy = pe('p', {
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
    v(
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
        [`&.${Fs.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
        },
        [`&.${Fs.error}`]: {
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
  Nc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiFormHelperText',
      }),
      { children: i, className: a, component: s = 'p' } = r,
      l = xe(r, ty),
      c = Pn(),
      u = Qn({
        props: r,
        muiFormControl: c,
        states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
      }),
      d = v({}, r, {
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
      p = ny(d);
    return /* @__PURE__ */ A(
      oy,
      v(
        {
          as: s,
          ownerState: d,
          className: Oe(p.root, a),
          ref: o,
        },
        l,
        {
          children:
            i === ' '
              ? // notranslate needed while Google Translate will not fix zero-width space issue
                js ||
                (js = /* @__PURE__ */ A('span', {
                  className: 'notranslate',
                  children: '​',
                }))
              : i,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Nc.propTypes = {
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
const ry = Nc;
function iy(e) {
  return _e('MuiFormLabel', e);
}
const ay = Ae('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  bo = ay,
  sy = [
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
  ly = (e) => {
    const { classes: t, color: o, focused: r, disabled: i, error: a, filled: s, required: l } = e,
      c = {
        root: [
          'root',
          `color${Q(o)}`,
          i && 'disabled',
          a && 'error',
          s && 'filled',
          r && 'focused',
          l && 'required',
        ],
        asterisk: ['asterisk', a && 'error'],
      };
    return Fe(c, iy, t);
  },
  cy = pe('label', {
    name: 'MuiFormLabel',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      v({}, t.root, e.color === 'secondary' && t.colorSecondary, e.filled && t.filled),
  })(({ theme: e, ownerState: t }) =>
    v(
      {
        color: (e.vars || e).palette.text.secondary,
      },
      e.typography.body1,
      {
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
      },
    ),
  ),
  uy = pe('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({
    [`&.${bo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  kc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiFormLabel',
      }),
      { children: i, className: a, component: s = 'label' } = r,
      l = xe(r, sy),
      c = Pn(),
      u = Qn({
        props: r,
        muiFormControl: c,
        states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
      }),
      d = v({}, r, {
        color: u.color || 'primary',
        component: s,
        disabled: u.disabled,
        error: u.error,
        filled: u.filled,
        focused: u.focused,
        required: u.required,
      }),
      p = ly(d);
    return /* @__PURE__ */ Xe(
      cy,
      v(
        {
          as: s,
          ownerState: d,
          className: Oe(p.root, a),
          ref: o,
        },
        l,
        {
          children: [
            i,
            u.required &&
              /* @__PURE__ */ Xe(uy, {
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
const Ic = kc,
  dy = [
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
function hi(e) {
  return `scale(${e}, ${e ** 2})`;
}
const py = {
    entering: {
      opacity: 1,
      transform: hi(1),
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
  na = /* @__PURE__ */ E.forwardRef(function (t, o) {
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
        onExited: b,
        onExiting: g,
        style: y,
        timeout: h = 'auto',
        // eslint-disable-next-line react/prop-types
        TransitionComponent: m = oc,
      } = t,
      S = xe(t, dy),
      C = E.useRef(),
      O = E.useRef(),
      x = Jn(),
      f = E.useRef(null),
      R = ut(f, a.ref, o),
      w = (F) => (V) => {
        if (F) {
          const ae = f.current;
          V === void 0 ? F(ae) : F(ae, V);
        }
      },
      z = w(d),
      L = w((F, V) => {
        rc(F);
        const {
          duration: ae,
          delay: se,
          easing: G,
        } = ar(
          {
            style: y,
            timeout: h,
            easing: s,
          },
          {
            mode: 'enter',
          },
        );
        let $;
        h === 'auto'
          ? (($ = x.transitions.getAutoHeightDuration(F.clientHeight)), (O.current = $))
          : ($ = ae),
          (F.style.transition = [
            x.transitions.create('opacity', {
              duration: $,
              delay: se,
            }),
            x.transitions.create('transform', {
              duration: Gr ? $ : $ * 0.666,
              delay: se,
              easing: G,
            }),
          ].join(',')),
          c && c(F, V);
      }),
      D = w(u),
      _ = w(g),
      Y = w((F) => {
        const {
          duration: V,
          delay: ae,
          easing: se,
        } = ar(
          {
            style: y,
            timeout: h,
            easing: s,
          },
          {
            mode: 'exit',
          },
        );
        let G;
        h === 'auto'
          ? ((G = x.transitions.getAutoHeightDuration(F.clientHeight)), (O.current = G))
          : (G = V),
          (F.style.transition = [
            x.transitions.create('opacity', {
              duration: G,
              delay: ae,
            }),
            x.transitions.create('transform', {
              duration: Gr ? G : G * 0.666,
              delay: Gr ? ae : ae || G * 0.333,
              easing: se,
            }),
          ].join(',')),
          (F.style.opacity = 0),
          (F.style.transform = hi(0.75)),
          p && p(F);
      }),
      B = w(b),
      M = (F) => {
        h === 'auto' && (C.current = setTimeout(F, O.current || 0)), r && r(f.current, F);
      };
    return (
      E.useEffect(
        () => () => {
          clearTimeout(C.current);
        },
        [],
      ),
      /* @__PURE__ */ A(
        m,
        v(
          {
            appear: i,
            in: l,
            nodeRef: f,
            onEnter: L,
            onEntered: D,
            onEntering: z,
            onExit: Y,
            onExited: B,
            onExiting: _,
            addEndListener: M,
            timeout: h === 'auto' ? null : h,
          },
          S,
          {
            children: (F, V) =>
              /* @__PURE__ */ E.cloneElement(
                a,
                v(
                  {
                    style: v(
                      {
                        opacity: 0,
                        transform: hi(0.75),
                        visibility: F === 'exited' && !l ? 'hidden' : void 0,
                      },
                      py[F],
                      y,
                      a.props.style,
                    ),
                    ref: R,
                  },
                  V,
                ),
              ),
          },
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (na.propTypes = {
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
    children: Gn.isRequired,
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
na.muiSupportAuto = !0;
const _c = na,
  fy = [
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
  my = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Fe(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Fv,
        t,
      );
    return v({}, t, i);
  },
  hy = pe(Ir, {
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
      v(
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
          [`&.${fn.focused}:after`]: {
            // translateX(0) is a workaround for Safari transform scale bug
            // See https://github.com/mui/material-ui/issues/31766
            transform: 'scaleX(1) translateX(0)',
          },
          [`&.${fn.error}`]: {
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
          [`&:hover:not(.${fn.disabled}, .${fn.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              borderBottom: `1px solid ${r}`,
            },
          },
          [`&.${fn.disabled}:before`]: {
            borderBottomStyle: 'dotted',
          },
        },
      )
    );
  }),
  by = pe(_r, {
    name: 'MuiInput',
    slot: 'Input',
    overridesResolver: kr,
  })({}),
  oa = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ge({
        props: t,
        name: 'MuiInput',
      }),
      {
        disableUnderline: c,
        components: u = {},
        componentsProps: d,
        fullWidth: p = !1,
        inputComponent: b = 'input',
        multiline: g = !1,
        slotProps: y,
        slots: h = {},
        type: m = 'text',
      } = l,
      S = xe(l, fy),
      C = my(l),
      x = {
        root: {
          ownerState: {
            disableUnderline: c,
          },
        },
      },
      f = y ?? d ? At(y ?? d, x) : x,
      R = (r = (i = h.root) != null ? i : u.Root) != null ? r : hy,
      w = (a = (s = h.input) != null ? s : u.Input) != null ? a : by;
    return /* @__PURE__ */ A(
      ea,
      v(
        {
          slots: {
            root: R,
            input: w,
          },
          slotProps: f,
          fullWidth: p,
          inputComponent: b,
          multiline: g,
          ref: o,
          type: m,
        },
        S,
        {
          classes: C,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (oa.propTypes = {
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
    inputRef: Rt,
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
oa.muiName = 'Input';
const Mc = oa;
function vy(e) {
  return _e('MuiInputLabel', e);
}
Ae('MuiInputLabel', [
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
const gy = ['disableAnimation', 'margin', 'shrink', 'variant', 'className'],
  yy = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: i,
        disableAnimation: a,
        variant: s,
        required: l,
      } = e,
      u = Fe(
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
        vy,
        t,
      );
    return v({}, t, u);
  },
  Ey = pe(Ic, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
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
  })(({ theme: e, ownerState: t }) =>
    v(
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
        v(
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
            v(
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
        v(
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
  Ac = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
        name: 'MuiInputLabel',
        props: t,
      }),
      { disableAnimation: i = !1, shrink: a, className: s } = r,
      l = xe(r, gy),
      c = Pn();
    let u = a;
    typeof u > 'u' && c && (u = c.filled || c.focused || c.adornedStart);
    const d = Qn({
        props: r,
        muiFormControl: c,
        states: ['size', 'variant', 'required'],
      }),
      p = v({}, r, {
        disableAnimation: i,
        formControl: c,
        shrink: u,
        size: d.size,
        variant: d.variant,
        required: d.required,
      }),
      b = yy(p);
    return /* @__PURE__ */ A(
      Ey,
      v(
        {
          'data-shrink': u,
          ownerState: p,
          ref: o,
          className: Oe(b.root, s),
        },
        l,
        {
          classes: b,
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
const xy = Ac,
  Dc = /* @__PURE__ */ E.createContext({});
process.env.NODE_ENV !== 'production' && (Dc.displayName = 'ListContext');
const Oy = Dc;
function Ty(e) {
  return _e('MuiList', e);
}
Ae('MuiList', ['root', 'padding', 'dense', 'subheader']);
const Cy = ['children', 'className', 'component', 'dense', 'disablePadding', 'subheader'],
  Sy = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: i } = e;
    return Fe(
      {
        root: ['root', !o && 'padding', r && 'dense', i && 'subheader'],
      },
      Ty,
      t,
    );
  },
  Ry = pe('ul', {
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
    v(
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
  Lc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
      d = xe(r, Cy),
      p = E.useMemo(
        () => ({
          dense: l,
        }),
        [l],
      ),
      b = v({}, r, {
        component: s,
        dense: l,
        disablePadding: c,
      }),
      g = Sy(b);
    return /* @__PURE__ */ A(Oy.Provider, {
      value: p,
      children: /* @__PURE__ */ Xe(
        Ry,
        v(
          {
            as: s,
            className: Oe(g.root, a),
            ref: o,
            ownerState: b,
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
const wy = Lc,
  $y = [
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
function Xr(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function zs(e, t, o) {
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
function Fc(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function lo(e, t, o, r, i, a) {
  let s = !1,
    l = i(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !Fc(l, a) || c) l = i(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const jc = /* @__PURE__ */ E.forwardRef(function (t, o) {
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
    b = xe(t, $y),
    g = E.useRef(null),
    y = E.useRef({
      keys: [],
      repeating: !0,
      previousKeyMatched: !0,
      lastTime: null,
    });
  ln(() => {
    i && g.current.focus();
  }, [i]),
    E.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (O, x) => {
          const f = !g.current.style.width;
          if (O.clientHeight < g.current.clientHeight && f) {
            const R = `${fl(st(O))}px`;
            (g.current.style[x.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = R),
              (g.current.style.width = `calc(100% + ${R})`);
          }
          return g.current;
        },
      }),
      [],
    );
  const h = (O) => {
      const x = g.current,
        f = O.key,
        R = st(x).activeElement;
      if (f === 'ArrowDown') O.preventDefault(), lo(x, R, u, c, Xr);
      else if (f === 'ArrowUp') O.preventDefault(), lo(x, R, u, c, zs);
      else if (f === 'Home') O.preventDefault(), lo(x, null, u, c, Xr);
      else if (f === 'End') O.preventDefault(), lo(x, null, u, c, zs);
      else if (f.length === 1) {
        const w = y.current,
          z = f.toLowerCase(),
          L = performance.now();
        w.keys.length > 0 &&
          (L - w.lastTime > 500
            ? ((w.keys = []), (w.repeating = !0), (w.previousKeyMatched = !0))
            : w.repeating && z !== w.keys[0] && (w.repeating = !1)),
          (w.lastTime = L),
          w.keys.push(z);
        const D = R && !w.repeating && Fc(R, w);
        w.previousKeyMatched && (D || lo(x, R, !1, c, Xr, w))
          ? O.preventDefault()
          : (w.previousKeyMatched = !1);
      }
      d && d(O);
    },
    m = ut(g, o);
  let S = -1;
  E.Children.forEach(s, (O, x) => {
    /* @__PURE__ */ E.isValidElement(O) &&
      (process.env.NODE_ENV !== 'production' &&
        Ki.isFragment(O) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      O.props.disabled || (((p === 'selectedMenu' && O.props.selected) || S === -1) && (S = x)),
      S === x &&
        (O.props.disabled || O.props.muiSkipListHighlight || O.type.muiSkipListHighlight) &&
        ((S += 1), S >= s.length && (S = -1)));
  });
  const C = E.Children.map(s, (O, x) => {
    if (x === S) {
      const f = {};
      return (
        a && (f.autoFocus = !0),
        O.props.tabIndex === void 0 && p === 'selectedMenu' && (f.tabIndex = 0),
        /* @__PURE__ */ E.cloneElement(O, f)
      );
    }
    return O;
  });
  return /* @__PURE__ */ A(
    wy,
    v(
      {
        role: 'menu',
        ref: m,
        className: l,
        onKeyDown: h,
        tabIndex: i ? 0 : -1,
      },
      b,
      {
        children: C,
      },
    ),
  );
});
process.env.NODE_ENV !== 'production' &&
  (jc.propTypes = {
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
const Py = jc;
function Ny(e) {
  return _e('MuiPopover', e);
}
Ae('MuiPopover', ['root', 'paper']);
const ky = ['onEntering'],
  Iy = [
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
function Vs(e, t) {
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
function Bs(e, t) {
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
function Us(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function Ko(e) {
  return typeof e == 'function' ? e() : e;
}
const _y = (e) => {
    const { classes: t } = e;
    return Fe(
      {
        root: ['root'],
        paper: ['paper'],
      },
      Ny,
      t,
    );
  },
  My = pe(Ug, {
    name: 'MuiPopover',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Ay = pe(ko, {
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
  zc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
        elevation: b = 8,
        marginThreshold: g = 16,
        open: y,
        PaperProps: h = {},
        transformOrigin: m = {
          vertical: 'top',
          horizontal: 'left',
        },
        TransitionComponent: S = _c,
        transitionDuration: C = 'auto',
        TransitionProps: { onEntering: O } = {},
      } = r,
      x = xe(r.TransitionProps, ky),
      f = xe(r, Iy),
      R = E.useRef(),
      w = ut(R, h.ref),
      z = v({}, r, {
        anchorOrigin: s,
        anchorReference: c,
        elevation: b,
        marginThreshold: g,
        PaperProps: h,
        transformOrigin: m,
        TransitionComponent: S,
        transitionDuration: C,
        TransitionProps: x,
      }),
      L = _y(z),
      D = E.useCallback(() => {
        if (c === 'anchorPosition')
          return (
            process.env.NODE_ENV !== 'production' &&
              (l ||
                console.error(
                  'MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.',
                )),
            l
          );
        const $ = Ko(a),
          j = $ && $.nodeType === 1 ? $ : st(R.current).body,
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
          top: X.top + Vs(X, s.vertical),
          left: X.left + Bs(X, s.horizontal),
        };
      }, [a, s.horizontal, s.vertical, l, c]),
      _ = E.useCallback(
        ($) => ({
          vertical: Vs($, m.vertical),
          horizontal: Bs($, m.horizontal),
        }),
        [m.horizontal, m.vertical],
      ),
      Y = E.useCallback(
        ($) => {
          const j = {
              width: $.offsetWidth,
              height: $.offsetHeight,
            },
            X = _(j);
          if (c === 'none')
            return {
              top: null,
              left: null,
              transformOrigin: Us(X),
            };
          const H = D();
          let U = H.top - X.vertical,
            ne = H.left - X.horizontal;
          const oe = U + j.height,
            J = ne + j.width,
            ie = Rn(Ko(a)),
            le = ie.innerHeight - g,
            he = ie.innerWidth - g;
          if (U < g) {
            const re = U - g;
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
            ne < g)
          ) {
            const re = ne - g;
            (ne -= re), (X.horizontal += re);
          } else if (J > he) {
            const re = J - he;
            (ne -= re), (X.horizontal += re);
          }
          return {
            top: `${Math.round(U)}px`,
            left: `${Math.round(ne)}px`,
            transformOrigin: Us(X),
          };
        },
        [a, c, D, _, g],
      ),
      [B, M] = E.useState(y),
      F = E.useCallback(() => {
        const $ = R.current;
        if (!$) return;
        const j = Y($);
        j.top !== null && ($.style.top = j.top),
          j.left !== null && ($.style.left = j.left),
          ($.style.transformOrigin = j.transformOrigin),
          M(!0);
      }, [Y]),
      V = ($, j) => {
        O && O($, j), F();
      },
      ae = () => {
        M(!1);
      };
    E.useEffect(() => {
      y && F();
    }),
      E.useImperativeHandle(
        i,
        () =>
          y
            ? {
                updatePosition: () => {
                  F();
                },
              }
            : null,
        [y, F],
      ),
      E.useEffect(() => {
        if (!y) return;
        const $ = ul(() => {
            F();
          }),
          j = Rn(a);
        return (
          j.addEventListener('resize', $),
          () => {
            $.clear(), j.removeEventListener('resize', $);
          }
        );
      }, [a, y, F]);
    let se = C;
    C === 'auto' && !S.muiSupportAuto && (se = void 0);
    const G = p || (a ? st(Ko(a)).body : void 0);
    return /* @__PURE__ */ A(
      My,
      v(
        {
          BackdropProps: {
            invisible: !0,
          },
          className: Oe(L.root, d),
          container: G,
          open: y,
          ref: o,
          ownerState: z,
        },
        f,
        {
          children: /* @__PURE__ */ A(
            S,
            v(
              {
                appear: !0,
                in: y,
                onEntering: V,
                onExited: ae,
                timeout: se,
              },
              x,
              {
                children: /* @__PURE__ */ A(
                  Ay,
                  v(
                    {
                      elevation: b,
                    },
                    h,
                    {
                      ref: w,
                      className: Oe(L.paper, h.className),
                    },
                    B
                      ? void 0
                      : {
                          style: v({}, h.style, {
                            opacity: 0,
                          }),
                        },
                    {
                      ownerState: z,
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
  (zc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * A ref for imperative actions.
     * It currently only supports updatePosition() action.
     */
    action: Rt,
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the popover.
     */
    anchorEl: Wt(n.oneOfType([Zt, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = Ko(e.anchorEl);
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
    container: n.oneOfType([Zt, n.func]),
    /**
     * The elevation of the popover.
     * @default 8
     */
    elevation: Ti,
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
      component: xi,
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
const Dy = zc;
function Ly(e) {
  return _e('MuiMenu', e);
}
Ae('MuiMenu', ['root', 'paper', 'list']);
const Fy = ['onEntering'],
  jy = [
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
  zy = {
    vertical: 'top',
    horizontal: 'right',
  },
  Vy = {
    vertical: 'top',
    horizontal: 'left',
  },
  By = (e) => {
    const { classes: t } = e;
    return Fe(
      {
        root: ['root'],
        paper: ['paper'],
        list: ['list'],
      },
      Ly,
      t,
    );
  },
  Uy = pe(Dy, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Wy = pe(ko, {
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
  Hy = pe(Py, {
    name: 'MuiMenu',
    slot: 'List',
    overridesResolver: (e, t) => t.list,
  })({
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  }),
  Vc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
        transitionDuration: b = 'auto',
        TransitionProps: { onEntering: g } = {},
        variant: y = 'selectedMenu',
      } = r,
      h = xe(r.TransitionProps, Fy),
      m = xe(r, jy),
      S = Jn(),
      C = S.direction === 'rtl',
      O = v({}, r, {
        autoFocus: i,
        disableAutoFocusItem: s,
        MenuListProps: l,
        onEntering: g,
        PaperProps: d,
        transitionDuration: b,
        TransitionProps: h,
        variant: y,
      }),
      x = By(O),
      f = i && !s && u,
      R = E.useRef(null),
      w = (D, _) => {
        R.current && R.current.adjustStyleForScrollbar(D, S), g && g(D, _);
      },
      z = (D) => {
        D.key === 'Tab' && (D.preventDefault(), c && c(D, 'tabKeyDown'));
      };
    let L = -1;
    return (
      E.Children.map(a, (D, _) => {
        /* @__PURE__ */ E.isValidElement(D) &&
          (process.env.NODE_ENV !== 'production' &&
            Ki.isFragment(D) &&
            console.error(
              [
                "MUI: The Menu component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join(`
`),
            ),
          D.props.disabled ||
            (((y === 'selectedMenu' && D.props.selected) || L === -1) && (L = _)));
      }),
      /* @__PURE__ */ A(
        Uy,
        v(
          {
            onClose: c,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: C ? 'right' : 'left',
            },
            transformOrigin: C ? zy : Vy,
            PaperProps: v(
              {
                as: Wy,
              },
              d,
              {
                classes: v({}, d.classes, {
                  root: x.paper,
                }),
              },
            ),
            className: x.root,
            open: u,
            ref: o,
            transitionDuration: b,
            TransitionProps: v(
              {
                onEntering: w,
              },
              h,
            ),
            ownerState: O,
          },
          m,
          {
            classes: p,
            children: /* @__PURE__ */ A(
              Hy,
              v(
                {
                  onKeyDown: z,
                  actions: R,
                  autoFocus: i && (L === -1 || s),
                  autoFocusItem: f,
                  variant: y,
                },
                l,
                {
                  className: Oe(x.list, l.className),
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
  (Vc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the menu.
     */
    anchorEl: n.oneOfType([Zt, n.func]),
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
const qy = Vc;
function Yy(e) {
  return _e('MuiNativeSelect', e);
}
const Ky = Ae('MuiNativeSelect', [
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
  ra = Ky,
  Gy = ['className', 'disabled', 'IconComponent', 'inputRef', 'variant'],
  Xy = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${Q(o)}`, a && 'iconOpen', r && 'disabled'],
      };
    return Fe(s, Yy, t);
  },
  Bc = ({ ownerState: e, theme: t }) =>
    v(
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
        '&:focus': v(
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
        [`&.${ra.disabled}`]: {
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
  Jy = pe('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: tn,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.select,
        t[o.variant],
        {
          [`&.${ra.multiple}`]: t.multiple,
        },
      ];
    },
  })(Bc),
  Uc = ({ ownerState: e, theme: t }) =>
    v(
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
        [`&.${ra.disabled}`]: {
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
  Zy = pe('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${Q(o.variant)}`], o.open && t.iconOpen];
    },
  })(Uc),
  Wc = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const { className: r, disabled: i, IconComponent: a, inputRef: s, variant: l = 'standard' } = t,
      c = xe(t, Gy),
      u = v({}, t, {
        disabled: i,
        variant: l,
      }),
      d = Xy(u);
    return /* @__PURE__ */ Xe(E.Fragment, {
      children: [
        /* @__PURE__ */ A(
          Jy,
          v(
            {
              ownerState: u,
              className: Oe(d.select, r),
              disabled: i,
              ref: s || o,
            },
            c,
          ),
        ),
        t.multiple
          ? null
          : /* @__PURE__ */ A(Zy, {
              as: a,
              ownerState: u,
              className: d.icon,
            }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Wc.propTypes = {
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
    inputRef: Rt,
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
const Qy = Wc;
var Ws;
const e0 = ['children', 'classes', 'className', 'label', 'notched'],
  t0 = pe('fieldset')({
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
  n0 = pe('legend')(({ ownerState: e, theme: t }) =>
    v(
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
        v(
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
function Hc(e) {
  const { className: t, label: o, notched: r } = e,
    i = xe(e, e0),
    a = o != null && o !== '',
    s = v({}, e, {
      notched: r,
      withLabel: a,
    });
  return /* @__PURE__ */ A(
    t0,
    v(
      {
        'aria-hidden': !0,
        className: t,
        ownerState: s,
      },
      i,
      {
        children: /* @__PURE__ */ A(n0, {
          ownerState: s,
          children: a
            ? /* @__PURE__ */ A('span', {
                children: o,
              })
            : // notranslate needed while Google Translate will not fix zero-width space issue
              Ws ||
              (Ws = /* @__PURE__ */ A('span', {
                className: 'notranslate',
                children: '​',
              })),
        }),
      },
    ),
  );
}
process.env.NODE_ENV !== 'production' &&
  (Hc.propTypes = {
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
const o0 = [
    'components',
    'fullWidth',
    'inputComponent',
    'label',
    'multiline',
    'notched',
    'slots',
    'type',
  ],
  r0 = (e) => {
    const { classes: t } = e,
      r = Fe(
        {
          root: ['root'],
          notchedOutline: ['notchedOutline'],
          input: ['input'],
        },
        zv,
        t,
      );
    return v({}, t, r);
  },
  i0 = pe(Ir, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: Nr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return v(
      {
        position: 'relative',
        borderRadius: (e.vars || e).shape.borderRadius,
        [`&:hover .${Kt.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.text.primary,
        },
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          [`&:hover .${Kt.notchedOutline}`]: {
            borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
          },
        },
        [`&.${Kt.focused} .${Kt.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[t.color].main,
          borderWidth: 2,
        },
        [`&.${Kt.error} .${Kt.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.error.main,
        },
        [`&.${Kt.disabled} .${Kt.notchedOutline}`]: {
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
        v(
          {
            padding: '16.5px 14px',
          },
          t.size === 'small' && {
            padding: '8.5px 14px',
          },
        ),
    );
  }),
  a0 = pe(Hc, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  s0 = pe(_r, {
    name: 'MuiOutlinedInput',
    slot: 'Input',
    overridesResolver: kr,
  })(({ theme: e, ownerState: t }) =>
    v(
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
  ia = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r, i, a, s, l;
    const c = Ge({
        props: t,
        name: 'MuiOutlinedInput',
      }),
      {
        components: u = {},
        fullWidth: d = !1,
        inputComponent: p = 'input',
        label: b,
        multiline: g = !1,
        notched: y,
        slots: h = {},
        type: m = 'text',
      } = c,
      S = xe(c, o0),
      C = r0(c),
      O = Pn(),
      x = Qn({
        props: c,
        muiFormControl: O,
        states: ['required'],
      }),
      f = v({}, c, {
        color: x.color || 'primary',
        disabled: x.disabled,
        error: x.error,
        focused: x.focused,
        formControl: O,
        fullWidth: d,
        hiddenLabel: x.hiddenLabel,
        multiline: g,
        size: x.size,
        type: m,
      }),
      R = (r = (i = h.root) != null ? i : u.Root) != null ? r : i0,
      w = (a = (s = h.input) != null ? s : u.Input) != null ? a : s0;
    return /* @__PURE__ */ A(
      ea,
      v(
        {
          slots: {
            root: R,
            input: w,
          },
          renderSuffix: (z) =>
            /* @__PURE__ */ A(a0, {
              ownerState: f,
              className: C.notchedOutline,
              label:
                b != null && b !== '' && x.required
                  ? l ||
                    (l = /* @__PURE__ */ Xe(E.Fragment, {
                      children: [b, ' ', '*'],
                    }))
                  : b,
              notched: typeof y < 'u' ? y : !!(z.startAdornment || z.filled || z.focused),
            }),
          fullWidth: d,
          inputComponent: p,
          multiline: g,
          ref: o,
          type: m,
        },
        S,
        {
          classes: v({}, C, {
            notchedOutline: null,
          }),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ia.propTypes = {
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
    inputRef: Rt,
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
ia.muiName = 'Input';
const qc = ia;
function l0(e) {
  return _e('MuiSelect', e);
}
const c0 = Ae('MuiSelect', [
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
  Vo = c0;
var Hs;
const u0 = [
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
  d0 = pe('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        // Win specificity over the input base
        {
          [`&.${Vo.select}`]: t.select,
        },
        {
          [`&.${Vo.select}`]: t[o.variant],
        },
        {
          [`&.${Vo.multiple}`]: t.multiple,
        },
      ];
    },
  })(Bc, {
    // Win specificity over the input base
    [`&.${Vo.select}`]: {
      height: 'auto',
      // Resets for multiple select with chips
      minHeight: '1.4375em',
      // Required for select\text-field height consistency
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  p0 = pe('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${Q(o.variant)}`], o.open && t.iconOpen];
    },
  })(Uc),
  f0 = pe('input', {
    shouldForwardProp: (e) => zi(e) && e !== 'classes',
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
function qs(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function m0(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const h0 = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${Q(o)}`, a && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return Fe(s, l0, t);
  },
  Yc = /* @__PURE__ */ E.forwardRef(function (t, o) {
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
        displayEmpty: b,
        IconComponent: g,
        inputRef: y,
        labelId: h,
        MenuProps: m = {},
        multiple: S,
        name: C,
        onBlur: O,
        onChange: x,
        onClose: f,
        onFocus: R,
        onOpen: w,
        open: z,
        readOnly: L,
        renderValue: D,
        SelectDisplayProps: _ = {},
        tabIndex: Y,
        value: B,
        variant: M = 'standard',
      } = t,
      F = xe(t, u0),
      [V, ae] = Cn({
        controlled: B,
        default: d,
        name: 'Select',
      }),
      [se, G] = Cn({
        controlled: z,
        default: u,
        name: 'Select',
      }),
      $ = E.useRef(null),
      j = E.useRef(null),
      [X, H] = E.useState(null),
      { current: U } = E.useRef(z != null),
      [ne, oe] = E.useState(),
      J = ut(o, y),
      ie = E.useCallback((ee) => {
        (j.current = ee), ee && H(ee);
      }, []),
      le = X == null ? void 0 : X.parentNode;
    E.useImperativeHandle(
      J,
      () => ({
        focus: () => {
          j.current.focus();
        },
        node: $.current,
        value: V,
      }),
      [V],
    ),
      E.useEffect(() => {
        u && se && X && !U && (oe(s ? null : le.clientWidth), j.current.focus());
      }, [X, s]),
      E.useEffect(() => {
        a && j.current.focus();
      }, [a]),
      E.useEffect(() => {
        if (!h) return;
        const ee = st(j.current).getElementById(h);
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
        ee ? w && w(ye) : f && f(ye), U || (oe(s ? null : le.clientWidth), G(ee));
      },
      re = (ee) => {
        ee.button === 0 && (ee.preventDefault(), j.current.focus(), he(!0, ee));
      },
      k = (ee) => {
        he(!1, ee);
      },
      Te = E.Children.toArray(l),
      I = (ee) => {
        const ye = Te.map((Ne) => Ne.props.value).indexOf(ee.target.value);
        if (ye === -1) return;
        const Ee = Te[ye];
        ae(Ee.props.value), x && x(ee, Ee);
      },
      W = (ee) => (ye) => {
        let Ee;
        if (ye.currentTarget.hasAttribute('tabindex')) {
          if (S) {
            Ee = Array.isArray(V) ? V.slice() : [];
            const Ne = V.indexOf(ee.props.value);
            Ne === -1 ? Ee.push(ee.props.value) : Ee.splice(Ne, 1);
          } else Ee = ee.props.value;
          if ((ee.props.onClick && ee.props.onClick(ye), V !== Ee && (ae(Ee), x))) {
            const Ne = ye.nativeEvent || ye,
              rt = new Ne.constructor(Ne.type, Ne);
            Object.defineProperty(rt, 'target', {
              writable: !0,
              value: {
                value: Ee,
                name: C,
              },
            }),
              x(rt, ee);
          }
          S || he(!1, ye);
        }
      },
      $e = (ee) => {
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
      ve = X !== null && se,
      Je = (ee) => {
        !ve &&
          O &&
          (Object.defineProperty(ee, 'target', {
            writable: !0,
            value: {
              value: V,
              name: C,
            },
          }),
          O(ee));
      };
    delete F['aria-invalid'];
    let De, Ce;
    const Re = [];
    let Ze = !1,
      ot = !1;
    (Qi({
      value: V,
    }) ||
      b) &&
      (D ? (De = D(V)) : (Ze = !0));
    const Z = Te.map((ee) => {
      if (!(/* @__PURE__ */ E.isValidElement(ee))) return null;
      process.env.NODE_ENV !== 'production' &&
        Ki.isFragment(ee) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let ye;
      if (S) {
        if (!Array.isArray(V))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : bn(2),
          );
        (ye = V.some((Ee) => qs(Ee, ee.props.value))), ye && Ze && Re.push(ee.props.children);
      } else (ye = qs(V, ee.props.value)), ye && Ze && (Ce = ee.props.children);
      return (
        ye && (ot = !0),
        /* @__PURE__ */ E.cloneElement(ee, {
          'aria-selected': ye ? 'true' : 'false',
          onClick: W(ee),
          onKeyUp: (Ee) => {
            Ee.key === ' ' && Ee.preventDefault(), ee.props.onKeyUp && ee.props.onKeyUp(Ee);
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
      E.useEffect(() => {
        if (!ot && !S && V !== '') {
          const ee = Te.map((ye) => ye.props.value);
          console.warn(
            [
              `MUI: You have provided an out-of-range value \`${V}\` for the select ${
                C ? `(name="${C}") ` : ''
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
      }, [ot, Te, S, C, V]),
      Ze &&
        (S
          ? Re.length === 0
            ? (De = null)
            : (De = Re.reduce(
                (ee, ye, Ee) => (ee.push(ye), Ee < Re.length - 1 && ee.push(', '), ee),
                [],
              ))
          : (De = Ce));
    let me = ne;
    !s && U && X && (me = le.clientWidth);
    let ge;
    typeof Y < 'u' ? (ge = Y) : (ge = p ? null : 0);
    const be = _.id || (C ? `mui-component-select-${C}` : void 0),
      fe = v({}, t, {
        variant: M,
        value: V,
        open: ve,
      }),
      ue = h0(fe);
    return /* @__PURE__ */ Xe(E.Fragment, {
      children: [
        /* @__PURE__ */ A(
          d0,
          v(
            {
              ref: ie,
              tabIndex: ge,
              role: 'button',
              'aria-disabled': p ? 'true' : void 0,
              'aria-expanded': ve ? 'true' : 'false',
              'aria-haspopup': 'listbox',
              'aria-label': i,
              'aria-labelledby': [h, be].filter(Boolean).join(' ') || void 0,
              'aria-describedby': r,
              onKeyDown: $e,
              onMouseDown: p || L ? null : re,
              onBlur: Je,
              onFocus: R,
            },
            _,
            {
              ownerState: fe,
              className: Oe(_.className, ue.select, c),
              id: be,
              children: m0(De)
                ? // notranslate needed while Google Translate will not fix zero-width space issue
                  Hs ||
                  (Hs = /* @__PURE__ */ A('span', {
                    className: 'notranslate',
                    children: '​',
                  }))
                : De,
            },
          ),
        ),
        /* @__PURE__ */ A(
          f0,
          v(
            {
              value: Array.isArray(V) ? V.join(',') : V,
              name: C,
              ref: $,
              'aria-hidden': !0,
              onChange: I,
              tabIndex: -1,
              disabled: p,
              className: ue.nativeInput,
              autoFocus: a,
              ownerState: fe,
            },
            F,
          ),
        ),
        /* @__PURE__ */ A(p0, {
          as: g,
          className: ue.icon,
          ownerState: fe,
        }),
        /* @__PURE__ */ A(
          qy,
          v(
            {
              id: `menu-${C || ''}`,
              anchorEl: le,
              open: ve,
              onClose: k,
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
              MenuListProps: v(
                {
                  'aria-labelledby': h,
                  role: 'listbox',
                  disableListWrap: !0,
                },
                m.MenuListProps,
              ),
              PaperProps: v({}, m.PaperProps, {
                style: v(
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
  (Yc.propTypes = {
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
    inputRef: Rt,
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
const b0 = Yc;
var Ys, Ks;
const v0 = [
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
  g0 = (e) => {
    const { classes: t } = e;
    return t;
  },
  aa = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => tn(e) && e !== 'variant',
    slot: 'Root',
  },
  y0 = pe(Mc, aa)(''),
  E0 = pe(qc, aa)(''),
  x0 = pe($c, aa)(''),
  sa = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
        IconComponent: d = vc,
        id: p,
        input: b,
        inputProps: g,
        label: y,
        labelId: h,
        MenuProps: m,
        multiple: S = !1,
        native: C = !1,
        onClose: O,
        onOpen: x,
        open: f,
        renderValue: R,
        SelectDisplayProps: w,
        variant: z = 'outlined',
      } = r,
      L = xe(r, v0),
      D = C ? Qy : b0,
      _ = Pn(),
      B =
        Qn({
          props: r,
          muiFormControl: _,
          states: ['variant'],
        }).variant || z,
      M =
        b ||
        {
          standard: Ys || (Ys = /* @__PURE__ */ A(y0, {})),
          outlined: /* @__PURE__ */ A(E0, {
            label: y,
          }),
          filled: Ks || (Ks = /* @__PURE__ */ A(x0, {})),
        }[B],
      F = v({}, r, {
        variant: B,
        classes: s,
      }),
      V = g0(F),
      ae = ut(o, M.ref);
    return /* @__PURE__ */ A(E.Fragment, {
      children: /* @__PURE__ */ E.cloneElement(
        M,
        v(
          {
            // Most of the logic is implemented in `SelectInput`.
            // The `Select` component is a simple API wrapper to expose something better to play with.
            inputComponent: D,
            inputProps: v(
              {
                children: a,
                IconComponent: d,
                variant: B,
                type: void 0,
                // We render a select. We can ignore the type provided by the `Input`.
                multiple: S,
              },
              C
                ? {
                    id: p,
                  }
                : {
                    autoWidth: i,
                    defaultOpen: c,
                    displayEmpty: u,
                    labelId: h,
                    MenuProps: m,
                    onClose: O,
                    onOpen: x,
                    open: f,
                    renderValue: R,
                    SelectDisplayProps: v(
                      {
                        id: p,
                      },
                      w,
                    ),
                  },
              g,
              {
                classes: g ? At(V, g.classes) : V,
              },
              b ? b.props.inputProps : {},
            ),
          },
          S && C && B === 'outlined'
            ? {
                notched: !0,
              }
            : {},
          {
            ref: ae,
            className: Oe(M.props.className, l),
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
  (sa.propTypes = {
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
sa.muiName = 'Select';
const O0 = sa,
  T0 = (e) => !e || !hn(e),
  C0 = T0;
function S0(e) {
  return _e('MuiSlider', e);
}
const R0 = Ae('MuiSlider', [
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
  Bt = R0,
  w0 = (e) => {
    const { open: t } = e;
    return {
      offset: Oe(t && Bt.valueLabelOpen),
      circle: Bt.valueLabelCircle,
      label: Bt.valueLabelLabel,
    };
  };
function Kc(e) {
  const { children: t, className: o, value: r } = e,
    i = w0(e);
  return t
    ? /* @__PURE__ */ E.cloneElement(
        t,
        {
          className: Oe(t.props.className),
        },
        /* @__PURE__ */ Xe(E.Fragment, {
          children: [
            t.props.children,
            /* @__PURE__ */ A('span', {
              className: Oe(i.offset, o),
              'aria-hidden': !0,
              children: /* @__PURE__ */ A('span', {
                className: i.circle,
                children: /* @__PURE__ */ A('span', {
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
  (Kc.propTypes = {
    children: n.element.isRequired,
    className: n.string,
    value: n.node,
  });
const $0 = [
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
function Gs(e) {
  return e;
}
const Gc = pe('span', {
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
  v(
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
      v(
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
      v(
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
      [`&.${Bt.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        color: (e.vars || e).palette.grey[400],
      },
      [`&.${Bt.dragging}`]: {
        [`& .${Bt.thumb}, & .${Bt.track}`]: {
          transition: 'none',
        },
      },
    },
  ),
);
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
const Xc = pe('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (e, t) => t.rail,
})(({ ownerState: e }) =>
  v(
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
const Jc = pe('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (e, t) => t.track,
})(({ theme: e, ownerState: t }) => {
  const o =
    // Same logic as the LinearProgress track color
    e.palette.mode === 'light'
      ? Cr(e.palette[t.color].main, 0.62)
      : Tr(e.palette[t.color].main, 0.5);
  return v(
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
  (Jc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Zc = pe('span', {
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
  v(
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
      '&:before': v(
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
      [`&:hover, &.${Bt.focusVisible}`]: {
        boxShadow: `0px 0px 0px 8px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : et(e.palette[t.color].main, 0.16)
        }`,
        '@media (hover: none)': {
          boxShadow: 'none',
        },
      },
      [`&.${Bt.active}`]: {
        boxShadow: `0px 0px 0px 14px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : et(e.palette[t.color].main, 0.16)
        }`,
      },
      [`&.${Bt.disabled}`]: {
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (Zc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Qc = pe(Kc, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) =>
  v(
    {
      [`&.${Bt.valueLabelOpen}`]: {
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
  (Qc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const eu = pe('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => zi(e) && e !== 'markActive',
  overridesResolver: (e, t) => {
    const { markActive: o } = e;
    return [t.mark, o && t.markActive];
  },
})(({ theme: e, ownerState: t, markActive: o }) =>
  v(
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
  (eu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const tu = pe('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => zi(e) && e !== 'markLabelActive',
  overridesResolver: (e, t) => t.markLabel,
})(({ theme: e, ownerState: t, markLabelActive: o }) =>
  v(
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
  (tu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const P0 = (e) => {
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
    return Fe(u, S0, s);
  },
  N0 = ({ children: e }) => e,
  nu = /* @__PURE__ */ E.forwardRef(function (t, o) {
    var r, i, a, s, l, c, u, d, p, b, g, y, h, m, S, C, O, x, f, R, w, z, L, D;
    const _ = Ge({
        props: t,
        name: 'MuiSlider',
      }),
      B = Jn().direction === 'rtl',
      {
        'aria-label': M,
        'aria-valuetext': F,
        'aria-labelledby': V,
        // eslint-disable-next-line react/prop-types
        component: ae = 'span',
        components: se = {},
        componentsProps: G = {},
        color: $ = 'primary',
        classes: j,
        className: X,
        disableSwap: H = !1,
        disabled: U = !1,
        getAriaLabel: ne,
        getAriaValueText: oe,
        marks: J = !1,
        max: ie = 100,
        min: le = 0,
        orientation: he = 'horizontal',
        size: re = 'medium',
        step: k = 1,
        scale: Te = Gs,
        slotProps: I,
        slots: W,
        track: $e = 'normal',
        valueLabelDisplay: ve = 'off',
        valueLabelFormat: Je = Gs,
      } = _,
      De = xe(_, $0),
      Ce = v({}, _, {
        isRtl: B,
        max: ie,
        min: le,
        classes: j,
        disabled: U,
        disableSwap: H,
        orientation: he,
        marks: J,
        color: $,
        size: re,
        step: k,
        scale: Te,
        track: $e,
        valueLabelDisplay: ve,
        valueLabelFormat: Je,
      }),
      {
        axisProps: Re,
        getRootProps: Ze,
        getHiddenInputProps: ot,
        getThumbProps: Z,
        open: me,
        active: ge,
        axis: be,
        focusedThumbIndex: fe,
        range: ue,
        dragging: ee,
        marks: ye,
        values: Ee,
        trackOffset: Ne,
        trackLeap: rt,
      } = xb(
        v({}, Ce, {
          ref: o,
        }),
      );
    (Ce.marked = ye.length > 0 && ye.some((P) => P.label)),
      (Ce.dragging = ee),
      (Ce.focusedThumbIndex = fe);
    const dt = P0(Ce),
      xt = (r = (i = W == null ? void 0 : W.root) != null ? i : se.Root) != null ? r : Gc,
      un = (a = (s = W == null ? void 0 : W.rail) != null ? s : se.Rail) != null ? a : Xc,
      Ot = (l = (c = W == null ? void 0 : W.track) != null ? c : se.Track) != null ? l : Jc,
      mt = (u = (d = W == null ? void 0 : W.thumb) != null ? d : se.Thumb) != null ? u : Zc,
      vt =
        (p = (b = W == null ? void 0 : W.valueLabel) != null ? b : se.ValueLabel) != null ? p : Qc,
      pt = (g = (y = W == null ? void 0 : W.mark) != null ? y : se.Mark) != null ? g : eu,
      Qe = (h = (m = W == null ? void 0 : W.markLabel) != null ? m : se.MarkLabel) != null ? h : tu,
      tt = (S = (C = W == null ? void 0 : W.input) != null ? C : se.Input) != null ? S : 'input',
      ft = (O = I == null ? void 0 : I.root) != null ? O : G.root,
      yn = (x = I == null ? void 0 : I.rail) != null ? x : G.rail,
      qt = (f = I == null ? void 0 : I.track) != null ? f : G.track,
      dn = (R = I == null ? void 0 : I.thumb) != null ? R : G.thumb,
      jt = (w = I == null ? void 0 : I.valueLabel) != null ? w : G.valueLabel,
      nn = (z = I == null ? void 0 : I.mark) != null ? z : G.mark,
      on = (L = I == null ? void 0 : I.markLabel) != null ? L : G.markLabel,
      rn = (D = I == null ? void 0 : I.input) != null ? D : G.input,
      Yt = _t({
        elementType: xt,
        getSlotProps: Ze,
        externalSlotProps: ft,
        externalForwardedProps: De,
        additionalProps: v(
          {},
          C0(xt) && {
            as: ae,
          },
        ),
        ownerState: v({}, Ce, ft == null ? void 0 : ft.ownerState),
        className: [dt.root, X],
      }),
      an = _t({
        elementType: un,
        externalSlotProps: yn,
        ownerState: Ce,
        className: dt.rail,
      }),
      ke = _t({
        elementType: Ot,
        externalSlotProps: qt,
        additionalProps: {
          style: v({}, Re[be].offset(Ne), Re[be].leap(rt)),
        },
        ownerState: v({}, Ce, qt == null ? void 0 : qt.ownerState),
        className: dt.track,
      }),
      lt = _t({
        elementType: mt,
        getSlotProps: Z,
        externalSlotProps: dn,
        ownerState: v({}, Ce, dn == null ? void 0 : dn.ownerState),
        className: dt.thumb,
      }),
      It = _t({
        elementType: vt,
        externalSlotProps: jt,
        ownerState: v({}, Ce, jt == null ? void 0 : jt.ownerState),
        className: dt.valueLabel,
      }),
      T = _t({
        elementType: pt,
        externalSlotProps: nn,
        ownerState: Ce,
        className: dt.mark,
      }),
      q = _t({
        elementType: Qe,
        externalSlotProps: on,
        ownerState: Ce,
        className: dt.markLabel,
      }),
      ce = _t({
        elementType: tt,
        getSlotProps: ot,
        externalSlotProps: rn,
        ownerState: Ce,
      });
    return /* @__PURE__ */ Xe(
      xt,
      v({}, Yt, {
        children: [
          /* @__PURE__ */ A(un, v({}, an)),
          /* @__PURE__ */ A(Ot, v({}, ke)),
          ye
            .filter((P) => P.value >= le && P.value <= ie)
            .map((P, N) => {
              const K = rr(P.value, le, ie),
                te = Re[be].offset(K);
              let de;
              return (
                $e === !1
                  ? (de = Ee.indexOf(P.value) !== -1)
                  : (de =
                      ($e === 'normal' &&
                        (ue
                          ? P.value >= Ee[0] && P.value <= Ee[Ee.length - 1]
                          : P.value <= Ee[0])) ||
                      ($e === 'inverted' &&
                        (ue
                          ? P.value <= Ee[0] || P.value >= Ee[Ee.length - 1]
                          : P.value >= Ee[0]))),
                /* @__PURE__ */ Xe(
                  E.Fragment,
                  {
                    children: [
                      /* @__PURE__ */ A(
                        pt,
                        v(
                          {
                            'data-index': N,
                          },
                          T,
                          !hn(pt) && {
                            markActive: de,
                          },
                          {
                            style: v({}, te, T.style),
                            className: Oe(T.className, de && dt.markActive),
                          },
                        ),
                      ),
                      P.label != null
                        ? /* @__PURE__ */ A(
                            Qe,
                            v(
                              {
                                'aria-hidden': !0,
                                'data-index': N,
                              },
                              q,
                              !hn(Qe) && {
                                markLabelActive: de,
                              },
                              {
                                style: v({}, te, q.style),
                                className: Oe(dt.markLabel, q.className, de && dt.markLabelActive),
                                children: P.label,
                              },
                            ),
                          )
                        : null,
                    ],
                  },
                  N,
                )
              );
            }),
          Ee.map((P, N) => {
            const K = rr(P, le, ie),
              te = Re[be].offset(K),
              de = ve === 'off' ? N0 : vt;
            return (
              /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
              /* @__PURE__ */ A(
                de,
                v(
                  {},
                  !hn(de) && {
                    valueLabelFormat: Je,
                    valueLabelDisplay: ve,
                    value: typeof Je == 'function' ? Je(Te(P), N) : Je,
                    index: N,
                    open: me === N || ge === N || ve === 'on',
                    disabled: U,
                  },
                  It,
                  {
                    children: /* @__PURE__ */ A(
                      mt,
                      v(
                        {
                          'data-index': N,
                        },
                        lt,
                        {
                          className: Oe(
                            dt.thumb,
                            lt.className,
                            ge === N && dt.active,
                            fe === N && dt.focusVisible,
                          ),
                          style: v(
                            {},
                            te,
                            {
                              pointerEvents: H && ge !== N ? 'none' : void 0,
                            },
                            lt.style,
                          ),
                          children: /* @__PURE__ */ A(
                            tt,
                            v(
                              {
                                'data-index': N,
                                'aria-label': ne ? ne(N) : M,
                                'aria-valuenow': Te(P),
                                'aria-labelledby': V,
                                'aria-valuetext': oe ? oe(Te(P), N) : F,
                                value: Ee[N],
                              },
                              ce,
                            ),
                          ),
                        },
                      ),
                    ),
                  },
                ),
                N,
              )
            );
          }),
        ],
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (nu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The label of the slider.
     */
    'aria-label': Wt(n.string, (e) =>
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
    'aria-valuetext': Wt(n.string, (e) =>
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
const k0 = nu;
function I0(e) {
  return _e('MuiSnackbarContent', e);
}
Ae('MuiSnackbarContent', ['root', 'message', 'action']);
const _0 = ['action', 'className', 'message', 'role'],
  M0 = (e) => {
    const { classes: t } = e;
    return Fe(
      {
        root: ['root'],
        action: ['action'],
        message: ['message'],
      },
      I0,
      t,
    );
  },
  A0 = pe(ko, {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 0.8 : 0.98,
      o = Xf(e.palette.background.default, t);
    return v({}, e.typography.body2, {
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
  D0 = pe('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({
    padding: '8px 0',
  }),
  L0 = pe('div', {
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
  ou = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiSnackbarContent',
      }),
      { action: i, className: a, message: s, role: l = 'alert' } = r,
      c = xe(r, _0),
      u = r,
      d = M0(u);
    return /* @__PURE__ */ Xe(
      A0,
      v(
        {
          role: l,
          square: !0,
          elevation: 6,
          className: Oe(d.root, a),
          ownerState: u,
          ref: o,
        },
        c,
        {
          children: [
            /* @__PURE__ */ A(D0, {
              className: d.message,
              ownerState: u,
              children: s,
            }),
            i
              ? /* @__PURE__ */ A(L0, {
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
  (ou.propTypes = {
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
const F0 = ou;
function j0(e) {
  return _e('MuiSnackbar', e);
}
Ae('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const z0 = ['onEnter', 'onExited'],
  V0 = [
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
  B0 = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = {
        root: ['root', `anchorOrigin${Q(o.vertical)}${Q(o.horizontal)}`],
      };
    return Fe(r, j0, t);
  },
  Xs = pe('div', {
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
    return v(
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
        [e.breakpoints.up('sm')]: v(
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
  ru = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiSnackbar',
      }),
      i = Jn(),
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
        ClickAwayListenerProps: b,
        ContentProps: g,
        disableWindowBlurListener: y = !1,
        message: h,
        open: m,
        TransitionComponent: S = _c,
        transitionDuration: C = a,
        TransitionProps: { onEnter: O, onExited: x } = {},
      } = r,
      f = xe(r.TransitionProps, z0),
      R = xe(r, V0),
      w = v({}, r, {
        anchorOrigin: {
          vertical: l,
          horizontal: c,
        },
        autoHideDuration: u,
        disableWindowBlurListener: y,
        TransitionComponent: S,
        transitionDuration: C,
      }),
      z = B0(w),
      { getRootProps: L, onClickAway: D } = Ob(
        v({}, w, {
          ref: o,
        }),
      ),
      [_, Y] = E.useState(!0),
      B = _t({
        elementType: Xs,
        getSlotProps: L,
        externalForwardedProps: R,
        ownerState: w,
        className: [z.root, p],
      }),
      M = (V) => {
        Y(!0), x && x(V);
      },
      F = (V, ae) => {
        Y(!1), O && O(V, ae);
      };
    return !m && _
      ? null
      : /* @__PURE__ */ A(
          Qo,
          v(
            {
              onClickAway: D,
            },
            b,
            {
              children: /* @__PURE__ */ A(
                Xs,
                v({}, B, {
                  children: /* @__PURE__ */ A(
                    S,
                    v(
                      {
                        appear: !0,
                        in: m,
                        timeout: C,
                        direction: l === 'top' ? 'down' : 'up',
                        onEnter: F,
                        onExited: M,
                      },
                      f,
                      {
                        children:
                          d ||
                          /* @__PURE__ */ A(
                            F0,
                            v(
                              {
                                message: h,
                                action: s,
                              },
                              g,
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
  (ru.propTypes = {
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
const U0 = ru;
function W0(e) {
  return _e('MuiSwitch', e);
}
const H0 = Ae('MuiSwitch', [
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
  Et = H0,
  q0 = ['className', 'color', 'edge', 'size', 'sx'],
  Y0 = (e) => {
    const { classes: t, edge: o, size: r, color: i, checked: a, disabled: s } = e,
      l = {
        root: ['root', o && `edge${Q(o)}`, `size${Q(r)}`],
        switchBase: ['switchBase', `color${Q(i)}`, a && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = Fe(l, W0, t);
    return v({}, t, c);
  },
  K0 = pe('span', {
    name: 'MuiSwitch',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.edge && t[`edge${Q(o.edge)}`], t[`size${Q(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    v(
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
        [`& .${Et.thumb}`]: {
          width: 16,
          height: 16,
        },
        [`& .${Et.switchBase}`]: {
          padding: 4,
          [`&.${Et.checked}`]: {
            transform: 'translateX(16px)',
          },
        },
      },
    ),
  ),
  G0 = pe(Sc, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        {
          [`& .${Et.input}`]: t.input,
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
      [`&.${Et.checked}`]: {
        transform: 'translateX(20px)',
      },
      [`&.${Et.disabled}`]: {
        color: e.vars
          ? e.vars.palette.Switch.defaultDisabledColor
          : `${e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[600]}`,
      },
      [`&.${Et.checked} + .${Et.track}`]: {
        opacity: 0.5,
      },
      [`&.${Et.disabled} + .${Et.track}`]: {
        opacity: e.vars
          ? e.vars.opacity.switchTrackDisabled
          : `${e.palette.mode === 'light' ? 0.12 : 0.2}`,
      },
      [`& .${Et.input}`]: {
        left: '-100%',
        width: '300%',
      },
    }),
    ({ theme: e, ownerState: t }) =>
      v(
        {
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
              : et(e.palette.action.active, e.palette.action.hoverOpacity),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
        t.color !== 'default' && {
          [`&.${Et.checked}`]: {
            color: (e.vars || e).palette[t.color].main,
            '&:hover': {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : et(e.palette[t.color].main, e.palette.action.hoverOpacity),
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            },
            [`&.${Et.disabled}`]: {
              color: e.vars
                ? e.vars.palette.Switch[`${t.color}DisabledColor`]
                : `${
                    e.palette.mode === 'light'
                      ? Cr(e.palette[t.color].main, 0.62)
                      : Tr(e.palette[t.color].main, 0.55)
                  }`,
            },
          },
          [`&.${Et.checked} + .${Et.track}`]: {
            backgroundColor: (e.vars || e).palette[t.color].main,
          },
        },
      ),
  ),
  X0 = pe('span', {
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
  J0 = pe('span', {
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
  iu = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiSwitch',
      }),
      { className: i, color: a = 'primary', edge: s = !1, size: l = 'medium', sx: c } = r,
      u = xe(r, q0),
      d = v({}, r, {
        color: a,
        edge: s,
        size: l,
      }),
      p = Y0(d),
      b = /* @__PURE__ */ A(J0, {
        className: p.thumb,
        ownerState: d,
      });
    return /* @__PURE__ */ Xe(K0, {
      className: Oe(p.root, i),
      sx: c,
      ownerState: d,
      children: [
        /* @__PURE__ */ A(
          G0,
          v(
            {
              type: 'checkbox',
              icon: b,
              checkedIcon: b,
              ref: o,
              ownerState: d,
            },
            u,
            {
              classes: v({}, p, {
                root: p.switchBase,
              }),
            },
          ),
        ),
        /* @__PURE__ */ A(X0, {
          className: p.track,
          ownerState: d,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (iu.propTypes = {
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
    inputRef: Rt,
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
const Z0 = iu;
function Q0(e) {
  return _e('MuiTextField', e);
}
Ae('MuiTextField', ['root']);
const eE = [
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
  tE = {
    standard: Mc,
    filled: $c,
    outlined: qc,
  },
  nE = (e) => {
    const { classes: t } = e;
    return Fe(
      {
        root: ['root'],
      },
      Q0,
      t,
    );
  },
  oE = pe(Zg, {
    name: 'MuiTextField',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  au = /* @__PURE__ */ E.forwardRef(function (t, o) {
    const r = Ge({
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
        FormHelperTextProps: b,
        fullWidth: g = !1,
        helperText: y,
        id: h,
        InputLabelProps: m,
        inputProps: S,
        InputProps: C,
        inputRef: O,
        label: x,
        maxRows: f,
        minRows: R,
        multiline: w = !1,
        name: z,
        onBlur: L,
        onChange: D,
        onFocus: _,
        placeholder: Y,
        required: B = !1,
        rows: M,
        select: F = !1,
        SelectProps: V,
        type: ae,
        value: se,
        variant: G = 'outlined',
      } = r,
      $ = xe(r, eE),
      j = v({}, r, {
        autoFocus: a,
        color: c,
        disabled: d,
        error: p,
        fullWidth: g,
        multiline: w,
        required: B,
        select: F,
        variant: G,
      }),
      X = nE(j);
    process.env.NODE_ENV !== 'production' &&
      F &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const H = {};
    G === 'outlined' && (m && typeof m.shrink < 'u' && (H.notched = m.shrink), (H.label = x)),
      F && ((!V || !V.native) && (H.id = void 0), (H['aria-describedby'] = void 0));
    const U = dl(h),
      ne = y && U ? `${U}-helper-text` : void 0,
      oe = x && U ? `${U}-label` : void 0,
      J = tE[G],
      ie = /* @__PURE__ */ A(
        J,
        v(
          {
            'aria-describedby': ne,
            autoComplete: i,
            autoFocus: a,
            defaultValue: u,
            fullWidth: g,
            multiline: w,
            name: z,
            rows: M,
            maxRows: f,
            minRows: R,
            type: ae,
            value: se,
            id: U,
            inputRef: O,
            onBlur: L,
            onChange: D,
            onFocus: _,
            placeholder: Y,
            inputProps: S,
          },
          H,
          C,
        ),
      );
    return /* @__PURE__ */ Xe(
      oE,
      v(
        {
          className: Oe(X.root, l),
          disabled: d,
          error: p,
          fullWidth: g,
          ref: o,
          required: B,
          color: c,
          variant: G,
          ownerState: j,
        },
        $,
        {
          children: [
            x != null &&
              x !== '' &&
              /* @__PURE__ */ A(
                xy,
                v(
                  {
                    htmlFor: U,
                    id: oe,
                  },
                  m,
                  {
                    children: x,
                  },
                ),
              ),
            F
              ? /* @__PURE__ */ A(
                  O0,
                  v(
                    {
                      'aria-describedby': ne,
                      id: U,
                      labelId: oe,
                      value: se,
                      input: ie,
                    },
                    V,
                    {
                      children: s,
                    },
                  ),
                )
              : ie,
            y &&
              /* @__PURE__ */ A(
                ry,
                v(
                  {
                    id: ne,
                  },
                  b,
                  {
                    children: y,
                  },
                ),
              ),
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (au.propTypes = {
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
    inputRef: Rt,
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
const su = au;
function Ln({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: i }) {
  return /* @__PURE__ */ A(Og, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: i,
  });
}
var zn = /* @__PURE__ */ ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(zn || {});
function rE({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = zn.After,
  isIndeterminate: r = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const u = /* @__PURE__ */ A(jg, {
    checked: e,
    indeterminate: r,
    defaultChecked: i,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let d;
  if (t) {
    const p = o === zn.Before || o === zn.Above,
      b = /* @__PURE__ */ A('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      g = o === zn.Before || o === zn.After,
      y = g ? b : /* @__PURE__ */ A('div', { children: b }),
      h = g ? u : /* @__PURE__ */ A('div', { children: u });
    d = /* @__PURE__ */ Xe(Ic, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: a,
      error: s,
      children: [p && y, h, !p && y],
    });
  } else d = u;
  return d;
}
function iE({
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
  return /* @__PURE__ */ A(ig, {
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
    renderInput: (b) =>
      /* @__PURE__ */ A(su, {
        ...b,
        error: r,
        fullWidth: i,
        disabled: t,
        label: e,
        style: { width: a },
      }),
  });
}
const eo = [
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
  la = 1,
  lu = eo.length - 1,
  cu = 1,
  uu = 1,
  aE = (e) => eo.findIndex((t) => t.fullNames.includes(e)),
  Js = (e) => eo[e < la || e > lu ? 0 : e].fullNames[0],
  Zs = () => {
    const e = [];
    return (
      eo.slice(1).forEach((t) => {
        const o = t.fullNames[0];
        e.push(o);
      }),
      e
    );
  },
  sE = (e) => eo[e].chapters,
  Qs = (e, t) => ({
    book: Math.max(la, Math.min(e.book + t, lu)),
    chapter: 1,
    verse: 1,
  }),
  el = (e, t) => ({
    ...e,
    chapter: Math.min(Math.max(cu, e.chapter + t), eo[e.book].chapters),
    verse: 1,
  }),
  tl = (e, t) => ({
    ...e,
    verse: Math.max(uu, e.verse + t),
  });
function bi({
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
  onFocus: b,
  onBlur: g,
}) {
  return /* @__PURE__ */ A(su, {
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
    onFocus: b,
    onBlur: g,
  });
}
function fE({ scrRef: e, handleSubmit: t }) {
  const [o, r] = hu(Js(e.book)),
    i = (c) => {
      r(Js(c.book)), t(c);
    },
    a = (c, u) => {
      const p = { book: aE(u), chapter: 1, verse: 1 };
      i(p);
    },
    s = (c) => {
      t({ ...e, chapter: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verse: +c.target.value });
    };
  return /* @__PURE__ */ Xe(Ou, {
    children: [
      /* @__PURE__ */ A(iE, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: Zs(),
        onChange: a,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ A(Ln, {
        onClick: () => i(Qs(e, -1)),
        isDisabled: e.book <= la,
        children: '<',
      }),
      /* @__PURE__ */ A(Ln, {
        onClick: () => i(Qs(e, 1)),
        isDisabled: e.book >= Zs().length,
        children: '>',
      }),
      /* @__PURE__ */ A(bi, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapter,
        onChange: s,
      }),
      /* @__PURE__ */ A(Ln, {
        onClick: () => t(el(e, -1)),
        isDisabled: e.chapter <= cu,
        children: '<',
      }),
      /* @__PURE__ */ A(Ln, {
        onClick: () => t(el(e, 1)),
        isDisabled: e.chapter >= sE(e.book),
        children: '>',
      }),
      /* @__PURE__ */ A(bi, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verse,
        onChange: l,
      }),
      /* @__PURE__ */ A(Ln, {
        onClick: () => t(tl(e, -1)),
        isDisabled: e.verse <= uu,
        children: '<',
      }),
      /* @__PURE__ */ A(Ln, { onClick: () => t(tl(e, 1)), children: '>' }),
    ],
  });
}
function mE({
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
  return /* @__PURE__ */ A(k0, {
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
function hE({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: i }) {
  return /* @__PURE__ */ A(Z0, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: i,
  });
}
function bE({
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
  return /* @__PURE__ */ A(U0, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: i,
    ContentProps: a,
    children: s,
  });
}
function lE({ onRowChange: e, row: t, column: o }) {
  const r = (i) => {
    e({ ...t, [o.key]: i.target.value });
  };
  return /* @__PURE__ */ A(bi, { defaultValue: t[o.key], onChange: r });
}
const cE = ({ onChange: e, disabled: t, checked: o, ...r }) => {
  function i(a) {
    e(a.target.checked, a.nativeEvent.shiftKey);
  }
  return /* @__PURE__ */ A(rE, {
    ...r,
    isChecked: o,
    isDisabled: t,
    onChange: i,
  });
};
function vE({
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
  rowKeyGetter: b,
  rowHeight: g = 35,
  headerRowHeight: y = 35,
  selectedRows: h,
  onSelectedRowsChange: m,
  onRowsChange: S,
  onCellClick: C,
  onCellDoubleClick: O,
  onCellContextMenu: x,
  onCellKeyDown: f,
  direction: R = 'ltr',
  enableVirtualization: w = !0,
  onCopy: z,
  onPaste: L,
  onScroll: D,
  className: _,
}) {
  const Y = bu(() => {
    const B = e.map((M) =>
      M.editable && !M.renderEditCell
        ? { ...M, renderEditCell: lE }
        : M.renderEditCell && !M.editable
        ? { ...M, editable: !1 }
        : M,
    );
    return d ? [{ ...gu, minWidth: p }, ...B] : B;
  }, [d, e]);
  return /* @__PURE__ */ A(vu, {
    columns: Y,
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
    rowKeyGetter: b,
    rowHeight: g,
    headerRowHeight: y,
    selectedRows: h,
    onSelectedRowsChange: m,
    onRowsChange: S,
    onCellClick: C,
    onCellDoubleClick: O,
    onCellContextMenu: x,
    onCellKeyDown: f,
    direction: R,
    enableVirtualization: w,
    onCopy: z,
    onPaste: L,
    onScroll: D,
    renderers: { renderCheckbox: cE },
    className: `${_ ?? 'rdg-light'}`,
  });
}
export {
  Ln as Button,
  rE as Checkbox,
  iE as ComboBox,
  zn as LabelPosition,
  fE as RefSelector,
  mE as Slider,
  bE as Snackbar,
  hE as Switch,
  vE as Table,
  bi as TextField,
};
//# sourceMappingURL=index.es.js.map
