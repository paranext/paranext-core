import * as b from 'react';
import Vt, {
  forwardRef as $u,
  useContext as ku,
  Children as Nu,
  isValidElement as Yo,
  cloneElement as Ko,
  useState as dl,
  useMemo as Pu,
  useRef as Iu,
} from 'react';
import * as pl from 'react-dom';
import Ao from 'react-dom';
import Mu, { SelectColumn as _u } from 'react-data-grid';
function Au(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var ai = { exports: {} },
  no = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ga;
function Du() {
  if (ga) return no;
  ga = 1;
  var e = Vt,
    t = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    r = Object.prototype.hasOwnProperty,
    i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, c, d) {
    var u,
      p = {},
      m = null,
      y = null;
    d !== void 0 && (m = '' + d),
      c.key !== void 0 && (m = '' + c.key),
      c.ref !== void 0 && (y = c.ref);
    for (u in c) r.call(c, u) && !a.hasOwnProperty(u) && (p[u] = c[u]);
    if (l && l.defaultProps) for (u in ((c = l.defaultProps), c)) p[u] === void 0 && (p[u] = c[u]);
    return { $$typeof: t, type: l, key: m, ref: y, props: p, _owner: i.current };
  }
  return (no.Fragment = o), (no.jsx = s), (no.jsxs = s), no;
}
var oo = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ya;
function ju() {
  return (
    ya ||
      ((ya = 1),
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
            d = Symbol.for('react.suspense'),
            u = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            m = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            g = Symbol.iterator,
            h = '@@iterator';
          function v(T) {
            if (T === null || typeof T != 'object') return null;
            var V = (g && T[g]) || T[h];
            return typeof V == 'function' ? V : null;
          }
          var O = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function C(T) {
            {
              for (var V = arguments.length, ce = new Array(V > 1 ? V - 1 : 0), k = 1; k < V; k++)
                ce[k - 1] = arguments[k];
              E('error', T, ce);
            }
          }
          function E(T, V, ce) {
            {
              var k = O.ReactDebugCurrentFrame,
                P = k.getStackAddendum();
              P !== '' && ((V += '%s'), (ce = ce.concat([P])));
              var K = ce.map(function (oe) {
                return String(oe);
              });
              K.unshift('Warning: ' + V), Function.prototype.apply.call(console[T], console, K);
            }
          }
          var x = !1,
            f = !1,
            S = !1,
            R = !1,
            A = !1,
            j;
          j = Symbol.for('react.module.reference');
          function w(T) {
            return !!(
              typeof T == 'string' ||
              typeof T == 'function' ||
              T === r ||
              T === a ||
              A ||
              T === i ||
              T === d ||
              T === u ||
              R ||
              T === y ||
              x ||
              f ||
              S ||
              (typeof T == 'object' &&
                T !== null &&
                (T.$$typeof === m ||
                  T.$$typeof === p ||
                  T.$$typeof === s ||
                  T.$$typeof === l ||
                  T.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  T.$$typeof === j ||
                  T.getModuleId !== void 0))
            );
          }
          function I(T, V, ce) {
            var k = T.displayName;
            if (k) return k;
            var P = V.displayName || V.name || '';
            return P !== '' ? ce + '(' + P + ')' : ce;
          }
          function G(T) {
            return T.displayName || 'Context';
          }
          function z(T) {
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
              case d:
                return 'Suspense';
              case u:
                return 'SuspenseList';
            }
            if (typeof T == 'object')
              switch (T.$$typeof) {
                case l:
                  var V = T;
                  return G(V) + '.Consumer';
                case s:
                  var ce = T;
                  return G(ce._context) + '.Provider';
                case c:
                  return I(T, T.render, 'ForwardRef');
                case p:
                  var k = T.displayName || null;
                  return k !== null ? k : z(T.type) || 'Memo';
                case m: {
                  var P = T,
                    K = P._payload,
                    oe = P._init;
                  try {
                    return z(oe(K));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var _ = Object.assign,
            D = 0,
            W,
            re,
            L,
            F,
            $,
            B,
            Z;
          function U() {}
          U.__reactDisabledLog = !0;
          function Y() {
            {
              if (D === 0) {
                (W = console.log),
                  (re = console.info),
                  (L = console.warn),
                  (F = console.error),
                  ($ = console.group),
                  (B = console.groupCollapsed),
                  (Z = console.groupEnd);
                var T = {
                  configurable: !0,
                  enumerable: !0,
                  value: U,
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
              D++;
            }
          }
          function X() {
            {
              if ((D--, D === 0)) {
                var T = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: _({}, T, {
                    value: W,
                  }),
                  info: _({}, T, {
                    value: re,
                  }),
                  warn: _({}, T, {
                    value: L,
                  }),
                  error: _({}, T, {
                    value: F,
                  }),
                  group: _({}, T, {
                    value: $,
                  }),
                  groupCollapsed: _({}, T, {
                    value: B,
                  }),
                  groupEnd: _({}, T, {
                    value: Z,
                  }),
                });
              }
              D < 0 &&
                C('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var ie = O.ReactCurrentDispatcher,
            ee;
          function ae(T, V, ce) {
            {
              if (ee === void 0)
                try {
                  throw Error();
                } catch (P) {
                  var k = P.stack.trim().match(/\n( *(at )?)/);
                  ee = (k && k[1]) || '';
                }
              return (
                `
` +
                ee +
                T
              );
            }
          }
          var ue = !1,
            de;
          {
            var me = typeof WeakMap == 'function' ? WeakMap : Map;
            de = new me();
          }
          function M(T, V) {
            if (!T || ue) return '';
            {
              var ce = de.get(T);
              if (ce !== void 0) return ce;
            }
            var k;
            ue = !0;
            var P = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var K;
            (K = ie.current), (ie.current = null), Y();
            try {
              if (V) {
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
                  } catch (zt) {
                    k = zt;
                  }
                  Reflect.construct(T, [], oe);
                } else {
                  try {
                    oe.call();
                  } catch (zt) {
                    k = zt;
                  }
                  T.call(oe.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (zt) {
                  k = zt;
                }
                T();
              }
            } catch (zt) {
              if (zt && k && typeof zt.stack == 'string') {
                for (
                  var fe = zt.stack.split(`
`),
                    ve = k.stack.split(`
`),
                    ge = fe.length - 1,
                    Se = ve.length - 1;
                  ge >= 1 && Se >= 0 && fe[ge] !== ve[Se];

                )
                  Se--;
                for (; ge >= 1 && Se >= 0; ge--, Se--)
                  if (fe[ge] !== ve[Se]) {
                    if (ge !== 1 || Se !== 1)
                      do
                        if ((ge--, Se--, Se < 0 || fe[ge] !== ve[Se])) {
                          var Oe =
                            `
` + fe[ge].replace(' at new ', ' at ');
                          return (
                            T.displayName &&
                              Oe.includes('<anonymous>') &&
                              (Oe = Oe.replace('<anonymous>', T.displayName)),
                            typeof T == 'function' && de.set(T, Oe),
                            Oe
                          );
                        }
                      while (ge >= 1 && Se >= 0);
                    break;
                  }
              }
            } finally {
              (ue = !1), (ie.current = K), X(), (Error.prepareStackTrace = P);
            }
            var ze = T ? T.displayName || T.name : '',
              sn = ze ? ae(ze) : '';
            return typeof T == 'function' && de.set(T, sn), sn;
          }
          function Te(T, V, ce) {
            return M(T, !1);
          }
          function Q(T) {
            var V = T.prototype;
            return !!(V && V.isReactComponent);
          }
          function q(T, V, ce) {
            if (T == null) return '';
            if (typeof T == 'function') return M(T, Q(T));
            if (typeof T == 'string') return ae(T);
            switch (T) {
              case d:
                return ae('Suspense');
              case u:
                return ae('SuspenseList');
            }
            if (typeof T == 'object')
              switch (T.$$typeof) {
                case c:
                  return Te(T.render);
                case p:
                  return q(T.type, V, ce);
                case m: {
                  var k = T,
                    P = k._payload,
                    K = k._init;
                  try {
                    return q(K(P), V, ce);
                  } catch {}
                }
              }
            return '';
          }
          var Ce = Object.prototype.hasOwnProperty,
            pe = {},
            Ne = O.ReactDebugCurrentFrame;
          function Le(T) {
            if (T) {
              var V = T._owner,
                ce = q(T.type, T._source, V ? V.type : null);
              Ne.setExtraStackFrame(ce);
            } else Ne.setExtraStackFrame(null);
          }
          function Je(T, V, ce, k, P) {
            {
              var K = Function.call.bind(Ce);
              for (var oe in T)
                if (K(T, oe)) {
                  var fe = void 0;
                  try {
                    if (typeof T[oe] != 'function') {
                      var ve = Error(
                        (k || 'React class') +
                          ': ' +
                          ce +
                          ' type `' +
                          oe +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof T[oe] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((ve.name = 'Invariant Violation'), ve);
                    }
                    fe = T[oe](V, oe, k, ce, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (ge) {
                    fe = ge;
                  }
                  fe &&
                    !(fe instanceof Error) &&
                    (Le(P),
                    C(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      k || 'React class',
                      ce,
                      oe,
                      typeof fe,
                    ),
                    Le(null)),
                    fe instanceof Error &&
                      !(fe.message in pe) &&
                      ((pe[fe.message] = !0),
                      Le(P),
                      C('Failed %s type: %s', ce, fe.message),
                      Le(null));
                }
            }
          }
          var Xe = Array.isArray;
          function Fe(T) {
            return Xe(T);
          }
          function Ze(T) {
            {
              var V = typeof Symbol == 'function' && Symbol.toStringTag,
                ce = (V && T[Symbol.toStringTag]) || T.constructor.name || 'Object';
              return ce;
            }
          }
          function te(T) {
            try {
              return ne(T), !1;
            } catch {
              return !0;
            }
          }
          function ne(T) {
            return '' + T;
          }
          function xe(T) {
            if (te(T))
              return (
                C(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  Ze(T),
                ),
                ne(T)
              );
          }
          var he = O.ReactCurrentOwner,
            Ee = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            _e,
            se,
            $e;
          $e = {};
          function H(T) {
            if (Ce.call(T, 'ref')) {
              var V = Object.getOwnPropertyDescriptor(T, 'ref').get;
              if (V && V.isReactWarning) return !1;
            }
            return T.ref !== void 0;
          }
          function ye(T) {
            if (Ce.call(T, 'key')) {
              var V = Object.getOwnPropertyDescriptor(T, 'key').get;
              if (V && V.isReactWarning) return !1;
            }
            return T.key !== void 0;
          }
          function Re(T, V) {
            if (typeof T.ref == 'string' && he.current && V && he.current.stateNode !== V) {
              var ce = z(he.current.type);
              $e[ce] ||
                (C(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  z(he.current.type),
                  T.ref,
                ),
                ($e[ce] = !0));
            }
          }
          function ft(T, V) {
            {
              var ce = function () {
                _e ||
                  ((_e = !0),
                  C(
                    '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    V,
                  ));
              };
              (ce.isReactWarning = !0),
                Object.defineProperty(T, 'key', {
                  get: ce,
                  configurable: !0,
                });
            }
          }
          function ht(T, V) {
            {
              var ce = function () {
                se ||
                  ((se = !0),
                  C(
                    '%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    V,
                  ));
              };
              (ce.isReactWarning = !0),
                Object.defineProperty(T, 'ref', {
                  get: ce,
                  configurable: !0,
                });
            }
          }
          var st = function (T, V, ce, k, P, K, oe) {
            var fe = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: T,
              key: V,
              ref: ce,
              props: oe,
              // Record the component responsible for creating this element.
              _owner: K,
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
                value: P,
              }),
              Object.freeze && (Object.freeze(fe.props), Object.freeze(fe)),
              fe
            );
          };
          function xt(T, V, ce, k, P) {
            {
              var K,
                oe = {},
                fe = null,
                ve = null;
              ce !== void 0 && (xe(ce), (fe = '' + ce)),
                ye(V) && (xe(V.key), (fe = '' + V.key)),
                H(V) && ((ve = V.ref), Re(V, P));
              for (K in V) Ce.call(V, K) && !Ee.hasOwnProperty(K) && (oe[K] = V[K]);
              if (T && T.defaultProps) {
                var ge = T.defaultProps;
                for (K in ge) oe[K] === void 0 && (oe[K] = ge[K]);
              }
              if (fe || ve) {
                var Se = typeof T == 'function' ? T.displayName || T.name || 'Unknown' : T;
                fe && ft(oe, Se), ve && ht(oe, Se);
              }
              return st(T, fe, ve, P, k, he.current, oe);
            }
          }
          var Et = O.ReactCurrentOwner,
            Qe = O.ReactDebugCurrentFrame;
          function lt(T) {
            if (T) {
              var V = T._owner,
                ce = q(T.type, T._source, V ? V.type : null);
              Qe.setExtraStackFrame(ce);
            } else Qe.setExtraStackFrame(null);
          }
          var ut;
          ut = !1;
          function Yt(T) {
            return typeof T == 'object' && T !== null && T.$$typeof === t;
          }
          function Kt() {
            {
              if (Et.current) {
                var T = z(Et.current.type);
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
          function rn(T) {
            {
              if (T !== void 0) {
                var V = T.fileName.replace(/^.*[\\\/]/, ''),
                  ce = T.lineNumber;
                return (
                  `

Check your code at ` +
                  V +
                  ':' +
                  ce +
                  '.'
                );
              }
              return '';
            }
          }
          var Ot = {};
          function Gt(T) {
            {
              var V = Kt();
              if (!V) {
                var ce = typeof T == 'string' ? T : T.displayName || T.name;
                ce &&
                  (V =
                    `

Check the top-level render call using <` +
                    ce +
                    '>.');
              }
              return V;
            }
          }
          function Xt(T, V) {
            {
              if (!T._store || T._store.validated || T.key != null) return;
              T._store.validated = !0;
              var ce = Gt(V);
              if (Ot[ce]) return;
              Ot[ce] = !0;
              var k = '';
              T &&
                T._owner &&
                T._owner !== Et.current &&
                (k = ' It was passed a child from ' + z(T._owner.type) + '.'),
                lt(T),
                C(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  ce,
                  k,
                ),
                lt(null);
            }
          }
          function Tt(T, V) {
            {
              if (typeof T != 'object') return;
              if (Fe(T))
                for (var ce = 0; ce < T.length; ce++) {
                  var k = T[ce];
                  Yt(k) && Xt(k, V);
                }
              else if (Yt(T)) T._store && (T._store.validated = !0);
              else if (T) {
                var P = v(T);
                if (typeof P == 'function' && P !== T.entries)
                  for (var K = P.call(T), oe; !(oe = K.next()).done; )
                    Yt(oe.value) && Xt(oe.value, V);
              }
            }
          }
          function vn(T) {
            {
              var V = T.type;
              if (V == null || typeof V == 'string') return;
              var ce;
              if (typeof V == 'function') ce = V.propTypes;
              else if (
                typeof V == 'object' &&
                (V.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  V.$$typeof === p)
              )
                ce = V.propTypes;
              else return;
              if (ce) {
                var k = z(V);
                Je(ce, T.props, 'prop', k, T);
              } else if (V.PropTypes !== void 0 && !ut) {
                ut = !0;
                var P = z(V);
                C(
                  'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                  P || 'Unknown',
                );
              }
              typeof V.getDefaultProps == 'function' &&
                !V.getDefaultProps.isReactClassApproved &&
                C(
                  'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.',
                );
            }
          }
          function an(T) {
            {
              for (var V = Object.keys(T.props), ce = 0; ce < V.length; ce++) {
                var k = V[ce];
                if (k !== 'children' && k !== 'key') {
                  lt(T),
                    C(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      k,
                    ),
                    lt(null);
                  break;
                }
              }
              T.ref !== null &&
                (lt(T), C('Invalid attribute `ref` supplied to `React.Fragment`.'), lt(null));
            }
          }
          function Ct(T, V, ce, k, P, K) {
            {
              var oe = w(T);
              if (!oe) {
                var fe = '';
                (T === void 0 ||
                  (typeof T == 'object' && T !== null && Object.keys(T).length === 0)) &&
                  (fe +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var ve = rn(P);
                ve ? (fe += ve) : (fe += Kt());
                var ge;
                T === null
                  ? (ge = 'null')
                  : Fe(T)
                  ? (ge = 'array')
                  : T !== void 0 && T.$$typeof === t
                  ? ((ge = '<' + (z(T.type) || 'Unknown') + ' />'),
                    (fe = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (ge = typeof T),
                  C(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    ge,
                    fe,
                  );
              }
              var Se = xt(T, V, ce, P, K);
              if (Se == null) return Se;
              if (oe) {
                var Oe = V.children;
                if (Oe !== void 0)
                  if (k)
                    if (Fe(Oe)) {
                      for (var ze = 0; ze < Oe.length; ze++) Tt(Oe[ze], T);
                      Object.freeze && Object.freeze(Oe);
                    } else
                      C(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else Tt(Oe, T);
              }
              return T === r ? an(Se) : vn(Se), Se;
            }
          }
          function Ft(T, V, ce) {
            return Ct(T, V, ce, !0);
          }
          function Jt(T, V, ce) {
            return Ct(T, V, ce, !1);
          }
          var gn = Jt,
            at = Ft;
          (oo.Fragment = r), (oo.jsx = gn), (oo.jsxs = at);
        })()),
    oo
  );
}
process.env.NODE_ENV === 'production' ? (ai.exports = Du()) : (ai.exports = ju());
var wi = ai.exports;
const Lu = wi.Fragment,
  N = wi.jsx,
  Ke = wi.jsxs,
  Fu = {
    black: '#000',
    white: '#fff',
  },
  Oo = Fu,
  zu = {
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
  In = zu,
  Bu = {
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
  Mn = Bu,
  Vu = {
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
  _n = Vu,
  Uu = {
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
  An = Uu,
  Wu = {
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
  Dn = Wu,
  Hu = {
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
  ro = Hu,
  qu = {
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
  Yu = qu;
function _t(e, t) {
  return process.env.NODE_ENV === 'production'
    ? () => null
    : function (...r) {
        return e(...r) || t(...r);
      };
}
function On(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function fl(e) {
  if (!On(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = fl(e[o]);
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
    On(e) &&
      On(t) &&
      Object.keys(t).forEach((i) => {
        i !== '__proto__' &&
          (On(t[i]) && i in e && On(e[i])
            ? (r[i] = Mt(e[i], t[i], o))
            : o.clone
            ? (r[i] = On(t[i]) ? fl(t[i]) : t[i])
            : (r[i] = t[i]));
      }),
    r
  );
}
var si = { exports: {} },
  Do = { exports: {} },
  Be = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xa;
function Ku() {
  if (xa) return Be;
  xa = 1;
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
    m = e ? Symbol.for('react.suspense_list') : 60120,
    y = e ? Symbol.for('react.memo') : 60115,
    g = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    v = e ? Symbol.for('react.fundamental') : 60117,
    O = e ? Symbol.for('react.responder') : 60118,
    C = e ? Symbol.for('react.scope') : 60119;
  function E(f) {
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
  function x(f) {
    return E(f) === d;
  }
  return (
    (Be.AsyncMode = c),
    (Be.ConcurrentMode = d),
    (Be.ContextConsumer = l),
    (Be.ContextProvider = s),
    (Be.Element = t),
    (Be.ForwardRef = u),
    (Be.Fragment = r),
    (Be.Lazy = g),
    (Be.Memo = y),
    (Be.Portal = o),
    (Be.Profiler = a),
    (Be.StrictMode = i),
    (Be.Suspense = p),
    (Be.isAsyncMode = function (f) {
      return x(f) || E(f) === c;
    }),
    (Be.isConcurrentMode = x),
    (Be.isContextConsumer = function (f) {
      return E(f) === l;
    }),
    (Be.isContextProvider = function (f) {
      return E(f) === s;
    }),
    (Be.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (Be.isForwardRef = function (f) {
      return E(f) === u;
    }),
    (Be.isFragment = function (f) {
      return E(f) === r;
    }),
    (Be.isLazy = function (f) {
      return E(f) === g;
    }),
    (Be.isMemo = function (f) {
      return E(f) === y;
    }),
    (Be.isPortal = function (f) {
      return E(f) === o;
    }),
    (Be.isProfiler = function (f) {
      return E(f) === a;
    }),
    (Be.isStrictMode = function (f) {
      return E(f) === i;
    }),
    (Be.isSuspense = function (f) {
      return E(f) === p;
    }),
    (Be.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === d ||
        f === a ||
        f === i ||
        f === p ||
        f === m ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === g ||
            f.$$typeof === y ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === u ||
            f.$$typeof === v ||
            f.$$typeof === O ||
            f.$$typeof === C ||
            f.$$typeof === h))
      );
    }),
    (Be.typeOf = E),
    Be
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
var Ea;
function Gu() {
  return (
    Ea ||
      ((Ea = 1),
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
            m = e ? Symbol.for('react.suspense_list') : 60120,
            y = e ? Symbol.for('react.memo') : 60115,
            g = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            v = e ? Symbol.for('react.fundamental') : 60117,
            O = e ? Symbol.for('react.responder') : 60118,
            C = e ? Symbol.for('react.scope') : 60119;
          function E(M) {
            return (
              typeof M == 'string' ||
              typeof M == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              M === r ||
              M === d ||
              M === a ||
              M === i ||
              M === p ||
              M === m ||
              (typeof M == 'object' &&
                M !== null &&
                (M.$$typeof === g ||
                  M.$$typeof === y ||
                  M.$$typeof === s ||
                  M.$$typeof === l ||
                  M.$$typeof === u ||
                  M.$$typeof === v ||
                  M.$$typeof === O ||
                  M.$$typeof === C ||
                  M.$$typeof === h))
            );
          }
          function x(M) {
            if (typeof M == 'object' && M !== null) {
              var Te = M.$$typeof;
              switch (Te) {
                case t:
                  var Q = M.type;
                  switch (Q) {
                    case c:
                    case d:
                    case r:
                    case a:
                    case i:
                    case p:
                      return Q;
                    default:
                      var q = Q && Q.$$typeof;
                      switch (q) {
                        case l:
                        case u:
                        case g:
                        case y:
                        case s:
                          return q;
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
            S = d,
            R = l,
            A = s,
            j = t,
            w = u,
            I = r,
            G = g,
            z = y,
            _ = o,
            D = a,
            W = i,
            re = p,
            L = !1;
          function F(M) {
            return (
              L ||
                ((L = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              $(M) || x(M) === c
            );
          }
          function $(M) {
            return x(M) === d;
          }
          function B(M) {
            return x(M) === l;
          }
          function Z(M) {
            return x(M) === s;
          }
          function U(M) {
            return typeof M == 'object' && M !== null && M.$$typeof === t;
          }
          function Y(M) {
            return x(M) === u;
          }
          function X(M) {
            return x(M) === r;
          }
          function ie(M) {
            return x(M) === g;
          }
          function ee(M) {
            return x(M) === y;
          }
          function ae(M) {
            return x(M) === o;
          }
          function ue(M) {
            return x(M) === a;
          }
          function de(M) {
            return x(M) === i;
          }
          function me(M) {
            return x(M) === p;
          }
          (Ve.AsyncMode = f),
            (Ve.ConcurrentMode = S),
            (Ve.ContextConsumer = R),
            (Ve.ContextProvider = A),
            (Ve.Element = j),
            (Ve.ForwardRef = w),
            (Ve.Fragment = I),
            (Ve.Lazy = G),
            (Ve.Memo = z),
            (Ve.Portal = _),
            (Ve.Profiler = D),
            (Ve.StrictMode = W),
            (Ve.Suspense = re),
            (Ve.isAsyncMode = F),
            (Ve.isConcurrentMode = $),
            (Ve.isContextConsumer = B),
            (Ve.isContextProvider = Z),
            (Ve.isElement = U),
            (Ve.isForwardRef = Y),
            (Ve.isFragment = X),
            (Ve.isLazy = ie),
            (Ve.isMemo = ee),
            (Ve.isPortal = ae),
            (Ve.isProfiler = ue),
            (Ve.isStrictMode = de),
            (Ve.isSuspense = me),
            (Ve.isValidElementType = E),
            (Ve.typeOf = x);
        })()),
    Ve
  );
}
var Oa;
function ml() {
  return (
    Oa ||
      ((Oa = 1), process.env.NODE_ENV === 'production' ? (Do.exports = Ku()) : (Do.exports = Gu())),
    Do.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Wr, Ta;
function Xu() {
  if (Ta) return Wr;
  Ta = 1;
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
    (Wr = i()
      ? Object.assign
      : function (a, s) {
          for (var l, c = r(a), d, u = 1; u < arguments.length; u++) {
            l = Object(arguments[u]);
            for (var p in l) t.call(l, p) && (c[p] = l[p]);
            if (e) {
              d = e(l);
              for (var m = 0; m < d.length; m++) o.call(l, d[m]) && (c[d[m]] = l[d[m]]);
            }
          }
          return c;
        }),
    Wr
  );
}
var Hr, Ca;
function $i() {
  if (Ca) return Hr;
  Ca = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Hr = e), Hr;
}
var qr, Ra;
function hl() {
  return Ra || ((Ra = 1), (qr = Function.call.bind(Object.prototype.hasOwnProperty))), qr;
}
var Yr, Sa;
function Ju() {
  if (Sa) return Yr;
  Sa = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = $i(),
      o = {},
      r = hl();
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
              var m = Error(
                (c || 'React class') +
                  ': ' +
                  l +
                  ' type `' +
                  u +
                  '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                  typeof a[u] +
                  '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
              );
              throw ((m.name = 'Invariant Violation'), m);
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
    (Yr = i),
    Yr
  );
}
var Kr, wa;
function Zu() {
  if (wa) return Kr;
  wa = 1;
  var e = ml(),
    t = Xu(),
    o = $i(),
    r = hl(),
    i = Ju(),
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
    (Kr = function (l, c) {
      var d = typeof Symbol == 'function' && Symbol.iterator,
        u = '@@iterator';
      function p($) {
        var B = $ && ((d && $[d]) || $[u]);
        if (typeof B == 'function') return B;
      }
      var m = '<<anonymous>>',
        y = {
          array: O('array'),
          bigint: O('bigint'),
          bool: O('boolean'),
          func: O('function'),
          number: O('number'),
          object: O('object'),
          string: O('string'),
          symbol: O('symbol'),
          any: C(),
          arrayOf: E,
          element: x(),
          elementType: f(),
          instanceOf: S,
          node: w(),
          objectOf: A,
          oneOf: R,
          oneOfType: j,
          shape: G,
          exact: z,
        };
      function g($, B) {
        return $ === B ? $ !== 0 || 1 / $ === 1 / B : $ !== $ && B !== B;
      }
      function h($, B) {
        (this.message = $), (this.data = B && typeof B == 'object' ? B : {}), (this.stack = '');
      }
      h.prototype = Error.prototype;
      function v($) {
        if (process.env.NODE_ENV !== 'production')
          var B = {},
            Z = 0;
        function U(X, ie, ee, ae, ue, de, me) {
          if (((ae = ae || m), (de = de || ee), me !== o)) {
            if (c) {
              var M = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((M.name = 'Invariant Violation'), M);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Te = ae + ':' + ee;
              !B[Te] && // Avoid spamming the console because they are often not actionable except for lib authors
                Z < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    de +
                    '` prop on `' +
                    ae +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (B[Te] = !0),
                Z++);
            }
          }
          return ie[ee] == null
            ? X
              ? ie[ee] === null
                ? new h(
                    'The ' +
                      ue +
                      ' `' +
                      de +
                      '` is marked as required ' +
                      ('in `' + ae + '`, but its value is `null`.'),
                  )
                : new h(
                    'The ' +
                      ue +
                      ' `' +
                      de +
                      '` is marked as required in ' +
                      ('`' + ae + '`, but its value is `undefined`.'),
                  )
              : null
            : $(ie, ee, ae, ue, de);
        }
        var Y = U.bind(null, !1);
        return (Y.isRequired = U.bind(null, !0)), Y;
      }
      function O($) {
        function B(Z, U, Y, X, ie, ee) {
          var ae = Z[U],
            ue = W(ae);
          if (ue !== $) {
            var de = re(ae);
            return new h(
              'Invalid ' +
                X +
                ' `' +
                ie +
                '` of type ' +
                ('`' + de + '` supplied to `' + Y + '`, expected ') +
                ('`' + $ + '`.'),
              { expectedType: $ },
            );
          }
          return null;
        }
        return v(B);
      }
      function C() {
        return v(s);
      }
      function E($) {
        function B(Z, U, Y, X, ie) {
          if (typeof $ != 'function')
            return new h(
              'Property `' +
                ie +
                '` of component `' +
                Y +
                '` has invalid PropType notation inside arrayOf.',
            );
          var ee = Z[U];
          if (!Array.isArray(ee)) {
            var ae = W(ee);
            return new h(
              'Invalid ' +
                X +
                ' `' +
                ie +
                '` of type ' +
                ('`' + ae + '` supplied to `' + Y + '`, expected an array.'),
            );
          }
          for (var ue = 0; ue < ee.length; ue++) {
            var de = $(ee, ue, Y, X, ie + '[' + ue + ']', o);
            if (de instanceof Error) return de;
          }
          return null;
        }
        return v(B);
      }
      function x() {
        function $(B, Z, U, Y, X) {
          var ie = B[Z];
          if (!l(ie)) {
            var ee = W(ie);
            return new h(
              'Invalid ' +
                Y +
                ' `' +
                X +
                '` of type ' +
                ('`' + ee + '` supplied to `' + U + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return v($);
      }
      function f() {
        function $(B, Z, U, Y, X) {
          var ie = B[Z];
          if (!e.isValidElementType(ie)) {
            var ee = W(ie);
            return new h(
              'Invalid ' +
                Y +
                ' `' +
                X +
                '` of type ' +
                ('`' + ee + '` supplied to `' + U + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return v($);
      }
      function S($) {
        function B(Z, U, Y, X, ie) {
          if (!(Z[U] instanceof $)) {
            var ee = $.name || m,
              ae = F(Z[U]);
            return new h(
              'Invalid ' +
                X +
                ' `' +
                ie +
                '` of type ' +
                ('`' + ae + '` supplied to `' + Y + '`, expected ') +
                ('instance of `' + ee + '`.'),
            );
          }
          return null;
        }
        return v(B);
      }
      function R($) {
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
        function B(Z, U, Y, X, ie) {
          for (var ee = Z[U], ae = 0; ae < $.length; ae++) if (g(ee, $[ae])) return null;
          var ue = JSON.stringify($, function (me, M) {
            var Te = re(M);
            return Te === 'symbol' ? String(M) : M;
          });
          return new h(
            'Invalid ' +
              X +
              ' `' +
              ie +
              '` of value `' +
              String(ee) +
              '` ' +
              ('supplied to `' + Y + '`, expected one of ' + ue + '.'),
          );
        }
        return v(B);
      }
      function A($) {
        function B(Z, U, Y, X, ie) {
          if (typeof $ != 'function')
            return new h(
              'Property `' +
                ie +
                '` of component `' +
                Y +
                '` has invalid PropType notation inside objectOf.',
            );
          var ee = Z[U],
            ae = W(ee);
          if (ae !== 'object')
            return new h(
              'Invalid ' +
                X +
                ' `' +
                ie +
                '` of type ' +
                ('`' + ae + '` supplied to `' + Y + '`, expected an object.'),
            );
          for (var ue in ee)
            if (r(ee, ue)) {
              var de = $(ee, ue, Y, X, ie + '.' + ue, o);
              if (de instanceof Error) return de;
            }
          return null;
        }
        return v(B);
      }
      function j($) {
        if (!Array.isArray($))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var B = 0; B < $.length; B++) {
          var Z = $[B];
          if (typeof Z != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  L(Z) +
                  ' at index ' +
                  B +
                  '.',
              ),
              s
            );
        }
        function U(Y, X, ie, ee, ae) {
          for (var ue = [], de = 0; de < $.length; de++) {
            var me = $[de],
              M = me(Y, X, ie, ee, ae, o);
            if (M == null) return null;
            M.data && r(M.data, 'expectedType') && ue.push(M.data.expectedType);
          }
          var Te = ue.length > 0 ? ', expected one of type [' + ue.join(', ') + ']' : '';
          return new h(
            'Invalid ' + ee + ' `' + ae + '` supplied to ' + ('`' + ie + '`' + Te + '.'),
          );
        }
        return v(U);
      }
      function w() {
        function $(B, Z, U, Y, X) {
          return _(B[Z])
            ? null
            : new h(
                'Invalid ' +
                  Y +
                  ' `' +
                  X +
                  '` supplied to ' +
                  ('`' + U + '`, expected a ReactNode.'),
              );
        }
        return v($);
      }
      function I($, B, Z, U, Y) {
        return new h(
          ($ || 'React class') +
            ': ' +
            B +
            ' type `' +
            Z +
            '.' +
            U +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            Y +
            '`.',
        );
      }
      function G($) {
        function B(Z, U, Y, X, ie) {
          var ee = Z[U],
            ae = W(ee);
          if (ae !== 'object')
            return new h(
              'Invalid ' +
                X +
                ' `' +
                ie +
                '` of type `' +
                ae +
                '` ' +
                ('supplied to `' + Y + '`, expected `object`.'),
            );
          for (var ue in $) {
            var de = $[ue];
            if (typeof de != 'function') return I(Y, X, ie, ue, re(de));
            var me = de(ee, ue, Y, X, ie + '.' + ue, o);
            if (me) return me;
          }
          return null;
        }
        return v(B);
      }
      function z($) {
        function B(Z, U, Y, X, ie) {
          var ee = Z[U],
            ae = W(ee);
          if (ae !== 'object')
            return new h(
              'Invalid ' +
                X +
                ' `' +
                ie +
                '` of type `' +
                ae +
                '` ' +
                ('supplied to `' + Y + '`, expected `object`.'),
            );
          var ue = t({}, Z[U], $);
          for (var de in ue) {
            var me = $[de];
            if (r($, de) && typeof me != 'function') return I(Y, X, ie, de, re(me));
            if (!me)
              return new h(
                'Invalid ' +
                  X +
                  ' `' +
                  ie +
                  '` key `' +
                  de +
                  '` supplied to `' +
                  Y +
                  '`.\nBad object: ' +
                  JSON.stringify(Z[U], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys($), null, '  '),
              );
            var M = me(ee, de, Y, X, ie + '.' + de, o);
            if (M) return M;
          }
          return null;
        }
        return v(B);
      }
      function _($) {
        switch (typeof $) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !$;
          case 'object':
            if (Array.isArray($)) return $.every(_);
            if ($ === null || l($)) return !0;
            var B = p($);
            if (B) {
              var Z = B.call($),
                U;
              if (B !== $.entries) {
                for (; !(U = Z.next()).done; ) if (!_(U.value)) return !1;
              } else
                for (; !(U = Z.next()).done; ) {
                  var Y = U.value;
                  if (Y && !_(Y[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function D($, B) {
        return $ === 'symbol'
          ? !0
          : B
          ? B['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && B instanceof Symbol)
          : !1;
      }
      function W($) {
        var B = typeof $;
        return Array.isArray($) ? 'array' : $ instanceof RegExp ? 'object' : D(B, $) ? 'symbol' : B;
      }
      function re($) {
        if (typeof $ > 'u' || $ === null) return '' + $;
        var B = W($);
        if (B === 'object') {
          if ($ instanceof Date) return 'date';
          if ($ instanceof RegExp) return 'regexp';
        }
        return B;
      }
      function L($) {
        var B = re($);
        switch (B) {
          case 'array':
          case 'object':
            return 'an ' + B;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + B;
          default:
            return B;
        }
      }
      function F($) {
        return !$.constructor || !$.constructor.name ? m : $.constructor.name;
      }
      return (
        (y.checkPropTypes = i), (y.resetWarningCache = i.resetWarningCache), (y.PropTypes = y), y
      );
    }),
    Kr
  );
}
var Gr, $a;
function Qu() {
  if ($a) return Gr;
  $a = 1;
  var e = $i();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (Gr = function () {
      function r(s, l, c, d, u, p) {
        if (p !== e) {
          var m = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
          );
          throw ((m.name = 'Invariant Violation'), m);
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
    Gr
  );
}
if (process.env.NODE_ENV !== 'production') {
  var ed = ml(),
    td = !0;
  si.exports = Zu()(ed.isElement, td);
} else si.exports = Qu()();
var nd = si.exports;
const n = /* @__PURE__ */ Au(nd);
function od(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function bl(e, t, o, r, i) {
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
      !od(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const vl = _t(n.element, bl);
vl.isRequired = _t(n.element.isRequired, bl);
const $n = vl;
function rd(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function id(e, t, o, r, i) {
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
      !rd(a) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const ki = _t(n.elementType, id),
  ad = 'exact-prop: ​';
function Ni(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : {
        ...e,
        [ad]: (t) => {
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
function mn(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let o = 1; o < arguments.length; o += 1) t += '&args[]=' + encodeURIComponent(arguments[o]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var li = { exports: {} },
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
var ka;
function sd() {
  if (ka) return Ue;
  ka = 1;
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
    m = Symbol.for('react.lazy'),
    y = Symbol.for('react.offscreen'),
    g;
  g = Symbol.for('react.module.reference');
  function h(v) {
    if (typeof v == 'object' && v !== null) {
      var O = v.$$typeof;
      switch (O) {
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
                case m:
                case p:
                case a:
                  return v;
                default:
                  return O;
              }
          }
        case t:
          return O;
      }
    }
  }
  return (
    (Ue.ContextConsumer = s),
    (Ue.ContextProvider = a),
    (Ue.Element = e),
    (Ue.ForwardRef = c),
    (Ue.Fragment = o),
    (Ue.Lazy = m),
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
      return h(v) === s;
    }),
    (Ue.isContextProvider = function (v) {
      return h(v) === a;
    }),
    (Ue.isElement = function (v) {
      return typeof v == 'object' && v !== null && v.$$typeof === e;
    }),
    (Ue.isForwardRef = function (v) {
      return h(v) === c;
    }),
    (Ue.isFragment = function (v) {
      return h(v) === o;
    }),
    (Ue.isLazy = function (v) {
      return h(v) === m;
    }),
    (Ue.isMemo = function (v) {
      return h(v) === p;
    }),
    (Ue.isPortal = function (v) {
      return h(v) === t;
    }),
    (Ue.isProfiler = function (v) {
      return h(v) === i;
    }),
    (Ue.isStrictMode = function (v) {
      return h(v) === r;
    }),
    (Ue.isSuspense = function (v) {
      return h(v) === d;
    }),
    (Ue.isSuspenseList = function (v) {
      return h(v) === u;
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
          (v.$$typeof === m ||
            v.$$typeof === p ||
            v.$$typeof === a ||
            v.$$typeof === s ||
            v.$$typeof === c ||
            v.$$typeof === g ||
            v.getModuleId !== void 0))
      );
    }),
    (Ue.typeOf = h),
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
var Na;
function ld() {
  return (
    Na ||
      ((Na = 1),
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
            m = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            g = !1,
            h = !1,
            v = !1,
            O = !1,
            C = !1,
            E;
          E = Symbol.for('react.module.reference');
          function x(Q) {
            return !!(
              typeof Q == 'string' ||
              typeof Q == 'function' ||
              Q === o ||
              Q === i ||
              C ||
              Q === r ||
              Q === d ||
              Q === u ||
              O ||
              Q === y ||
              g ||
              h ||
              v ||
              (typeof Q == 'object' &&
                Q !== null &&
                (Q.$$typeof === m ||
                  Q.$$typeof === p ||
                  Q.$$typeof === a ||
                  Q.$$typeof === s ||
                  Q.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  Q.$$typeof === E ||
                  Q.getModuleId !== void 0))
            );
          }
          function f(Q) {
            if (typeof Q == 'object' && Q !== null) {
              var q = Q.$$typeof;
              switch (q) {
                case e:
                  var Ce = Q.type;
                  switch (Ce) {
                    case o:
                    case i:
                    case r:
                    case d:
                    case u:
                      return Ce;
                    default:
                      var pe = Ce && Ce.$$typeof;
                      switch (pe) {
                        case l:
                        case s:
                        case c:
                        case m:
                        case p:
                        case a:
                          return pe;
                        default:
                          return q;
                      }
                  }
                case t:
                  return q;
              }
            }
          }
          var S = s,
            R = a,
            A = e,
            j = c,
            w = o,
            I = m,
            G = p,
            z = t,
            _ = i,
            D = r,
            W = d,
            re = u,
            L = !1,
            F = !1;
          function $(Q) {
            return (
              L ||
                ((L = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function B(Q) {
            return (
              F ||
                ((F = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function Z(Q) {
            return f(Q) === s;
          }
          function U(Q) {
            return f(Q) === a;
          }
          function Y(Q) {
            return typeof Q == 'object' && Q !== null && Q.$$typeof === e;
          }
          function X(Q) {
            return f(Q) === c;
          }
          function ie(Q) {
            return f(Q) === o;
          }
          function ee(Q) {
            return f(Q) === m;
          }
          function ae(Q) {
            return f(Q) === p;
          }
          function ue(Q) {
            return f(Q) === t;
          }
          function de(Q) {
            return f(Q) === i;
          }
          function me(Q) {
            return f(Q) === r;
          }
          function M(Q) {
            return f(Q) === d;
          }
          function Te(Q) {
            return f(Q) === u;
          }
          (We.ContextConsumer = S),
            (We.ContextProvider = R),
            (We.Element = A),
            (We.ForwardRef = j),
            (We.Fragment = w),
            (We.Lazy = I),
            (We.Memo = G),
            (We.Portal = z),
            (We.Profiler = _),
            (We.StrictMode = D),
            (We.Suspense = W),
            (We.SuspenseList = re),
            (We.isAsyncMode = $),
            (We.isConcurrentMode = B),
            (We.isContextConsumer = Z),
            (We.isContextProvider = U),
            (We.isElement = Y),
            (We.isForwardRef = X),
            (We.isFragment = ie),
            (We.isLazy = ee),
            (We.isMemo = ae),
            (We.isPortal = ue),
            (We.isProfiler = de),
            (We.isStrictMode = me),
            (We.isSuspense = M),
            (We.isSuspenseList = Te),
            (We.isValidElementType = x),
            (We.typeOf = f);
        })()),
    We
  );
}
process.env.NODE_ENV === 'production' ? (li.exports = sd()) : (li.exports = ld());
var To = li.exports;
const cd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function ud(e) {
  const t = `${e}`.match(cd);
  return (t && t[1]) || '';
}
function gl(e, t = '') {
  return e.displayName || e.name || ud(e) || t;
}
function Pa(e, t, o) {
  const r = gl(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function dd(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return gl(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case To.ForwardRef:
          return Pa(e, e.render, 'ForwardRef');
        case To.Memo:
          return Pa(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function Ht(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = e[t],
    s = i || t;
  return a == null
    ? null
    : a && a.nodeType !== 1
    ? new Error(`Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an HTMLElement.`)
    : null;
}
const pd = n.oneOfType([n.func, n.object]),
  yt = pd;
function J(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : mn(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ia(...e) {
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
function Pi(e, t = 166) {
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
function Xr(e, t) {
  return /* @__PURE__ */ b.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function ot(e) {
  return (e && e.ownerDocument) || document;
}
function ln(e) {
  return ot(e).defaultView || window;
}
function fd(e, t) {
  if (process.env.NODE_ENV === 'production') return () => null;
  const o = t
    ? {
        ...t.propTypes,
      }
    : null;
  return (i) =>
    (a, s, l, c, d, ...u) => {
      const p = d || s,
        m = o == null ? void 0 : o[p];
      if (m) {
        const y = m(a, s, l, c, d, ...u);
        if (y) return y;
      }
      return typeof a[s] < 'u' && !a[i]
        ? new Error(
            `The prop \`${p}\` of \`${e}\` can only be used together with the \`${i}\` prop.`,
          )
        : null;
    };
}
function er(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const md = typeof window < 'u' ? b.useLayoutEffect : b.useEffect,
  nn = md;
let Ma = 0;
function hd(e) {
  const [t, o] = b.useState(e),
    r = e || t;
  return (
    b.useEffect(() => {
      t == null && ((Ma += 1), o(`mui-${Ma}`));
    }, [t]),
    r
  );
}
const _a = b['useId'.toString()];
function yl(e) {
  if (_a !== void 0) {
    const t = _a();
    return e ?? t;
  }
  return hd(e);
}
function bd(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = i || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${a}\` is not supported. Please remove it.`)
    : null;
}
function Cn({ controlled: e, default: t, name: o, state: r = 'value' }) {
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
    nn(() => {
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
              er(o, t);
            });
          },
    e,
  );
}
let fr = !0,
  ci = !1,
  Aa;
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
function gd(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && vd[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function yd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (fr = !0);
}
function Jr() {
  fr = !1;
}
function xd() {
  this.visibilityState === 'hidden' && ci && (fr = !0);
}
function Ed(e) {
  e.addEventListener('keydown', yd, !0),
    e.addEventListener('mousedown', Jr, !0),
    e.addEventListener('pointerdown', Jr, !0),
    e.addEventListener('touchstart', Jr, !0),
    e.addEventListener('visibilitychange', xd, !0);
}
function Od(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return fr || gd(t);
}
function xl() {
  const e = b.useCallback((i) => {
      i != null && Ed(i.ownerDocument);
    }, []),
    t = b.useRef(!1);
  function o() {
    return t.current
      ? ((ci = !0),
        window.clearTimeout(Aa),
        (Aa = window.setTimeout(() => {
          ci = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(i) {
    return Od(i) ? ((t.current = !0), !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: o,
    ref: e,
  };
}
function El(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const Td = (e) => {
    const t = b.useRef({});
    return (
      b.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  Cd = Td,
  Rd = {
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
  Sd = Rd;
function wd(e) {
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
function $d(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const kd = Number.isInteger || $d;
function Ol(e, t, o, r) {
  const i = e[t];
  if (i == null || !kd(i)) {
    const a = wd(i);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function Tl(e, t, ...o) {
  return e[t] === void 0 ? null : Ol(e, t, ...o);
}
function ui() {
  return null;
}
Tl.isRequired = Ol;
ui.isRequired = ui;
const mr = process.env.NODE_ENV === 'production' ? ui : Tl;
function Ii(e, t) {
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
                o[r][s] = Ii(i[s], a[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function Ie(e, t, o = void 0) {
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
const Da = (e) => e,
  Nd = () => {
    let e = Da;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Da;
      },
    };
  },
  Pd = Nd(),
  Id = Pd,
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
function ke(e, t, o = 'Mui') {
  const r = Md[t];
  return r ? `${o}-${r}` : `${Id.generate(e)}-${t}`;
}
function we(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((i) => {
      r[i] = ke(e, i, o);
    }),
    r
  );
}
const hr = '$$material';
function tr() {
  return (
    (tr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
          }
          return e;
        }),
    tr.apply(this, arguments)
  );
}
function Cl(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var _d =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  Ad = /* @__PURE__ */ Cl(
    function (e) {
      return (
        _d.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
      );
    },
    /* Z+1 */
  );
function Dd(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function jd(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var Ld = /* @__PURE__ */ (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(jd(this));
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
          var s = Dd(i);
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
  nr = '-moz-',
  De = '-webkit-',
  Mi = 'comm',
  _i = 'rule',
  Ai = 'decl',
  Fd = '@import',
  Rl = '@keyframes',
  zd = '@layer',
  Bd = Math.abs,
  br = String.fromCharCode,
  Vd = Object.assign;
function Ud(e, t) {
  return ct(e, 0) ^ 45
    ? (((((((t << 2) ^ ct(e, 0)) << 2) ^ ct(e, 1)) << 2) ^ ct(e, 2)) << 2) ^ ct(e, 3)
    : 0;
}
function Sl(e) {
  return e.trim();
}
function Wd(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function je(e, t, o) {
  return e.replace(t, o);
}
function di(e, t) {
  return e.indexOf(t);
}
function ct(e, t) {
  return e.charCodeAt(t) | 0;
}
function Co(e, t, o) {
  return e.slice(t, o);
}
function Qt(e) {
  return e.length;
}
function Di(e) {
  return e.length;
}
function jo(e, t) {
  return t.push(e), e;
}
function Hd(e, t) {
  return e.map(t).join('');
}
var vr = 1,
  Wn = 1,
  wl = 0,
  gt = 0,
  it = 0,
  Zn = '';
function gr(e, t, o, r, i, a, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: i,
    children: a,
    line: vr,
    column: Wn,
    length: s,
    return: '',
  };
}
function io(e, t) {
  return Vd(gr('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function qd() {
  return it;
}
function Yd() {
  return (it = gt > 0 ? ct(Zn, --gt) : 0), Wn--, it === 10 && ((Wn = 1), vr--), it;
}
function $t() {
  return (it = gt < wl ? ct(Zn, gt++) : 0), Wn++, it === 10 && ((Wn = 1), vr++), it;
}
function tn() {
  return ct(Zn, gt);
}
function Go() {
  return gt;
}
function No(e, t) {
  return Co(Zn, e, t);
}
function Ro(e) {
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
  return (vr = Wn = 1), (wl = Qt((Zn = e))), (gt = 0), [];
}
function kl(e) {
  return (Zn = ''), e;
}
function Xo(e) {
  return Sl(No(gt - 1, pi(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Kd(e) {
  for (; (it = tn()) && it < 33; ) $t();
  return Ro(e) > 2 || Ro(it) > 3 ? '' : ' ';
}
function Gd(e, t) {
  for (; --t && $t() && !(it < 48 || it > 102 || (it > 57 && it < 65) || (it > 70 && it < 97)); );
  return No(e, Go() + (t < 6 && tn() == 32 && $t() == 32));
}
function pi(e) {
  for (; $t(); )
    switch (it) {
      case e:
        return gt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && pi(it);
        break;
      case 40:
        e === 41 && pi(e);
        break;
      case 92:
        $t();
        break;
    }
  return gt;
}
function Xd(e, t) {
  for (; $t() && e + it !== 47 + 10; ) if (e + it === 42 + 42 && tn() === 47) break;
  return '/*' + No(t, gt - 1) + '*' + br(e === 47 ? e : $t());
}
function Jd(e) {
  for (; !Ro(tn()); ) $t();
  return No(e, gt);
}
function Zd(e) {
  return kl(Jo('', null, null, null, [''], (e = $l(e)), 0, [0], e));
}
function Jo(e, t, o, r, i, a, s, l, c) {
  for (
    var d = 0,
      u = 0,
      p = s,
      m = 0,
      y = 0,
      g = 0,
      h = 1,
      v = 1,
      O = 1,
      C = 0,
      E = '',
      x = i,
      f = a,
      S = r,
      R = E;
    v;

  )
    switch (((g = C), (C = $t()))) {
      case 40:
        if (g != 108 && ct(R, p - 1) == 58) {
          di((R += je(Xo(C), '&', '&\f')), '&\f') != -1 && (O = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        R += Xo(C);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        R += Kd(g);
        break;
      case 92:
        R += Gd(Go() - 1, 7);
        continue;
      case 47:
        switch (tn()) {
          case 42:
          case 47:
            jo(Qd(Xd($t(), Go()), t, o), c);
            break;
          default:
            R += '/';
        }
        break;
      case 123 * h:
        l[d++] = Qt(R) * O;
      case 125 * h:
      case 59:
      case 0:
        switch (C) {
          case 0:
          case 125:
            v = 0;
          case 59 + u:
            O == -1 && (R = je(R, /\f/g, '')),
              y > 0 &&
                Qt(R) - p &&
                jo(y > 32 ? La(R + ';', r, o, p - 1) : La(je(R, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            R += ';';
          default:
            if ((jo((S = ja(R, t, o, d, u, i, l, E, (x = []), (f = []), p)), a), C === 123))
              if (u === 0) Jo(R, t, S, S, x, a, p, l, f);
              else
                switch (m === 99 && ct(R, 3) === 110 ? 100 : m) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Jo(
                      e,
                      S,
                      S,
                      r && jo(ja(e, S, S, 0, 0, i, l, E, i, (x = []), p), f),
                      i,
                      f,
                      p,
                      l,
                      r ? x : f,
                    );
                    break;
                  default:
                    Jo(R, S, S, S, [''], f, 0, l, f);
                }
        }
        (d = u = y = 0), (h = O = 1), (E = R = ''), (p = s);
        break;
      case 58:
        (p = 1 + Qt(R)), (y = g);
      default:
        if (h < 1) {
          if (C == 123) --h;
          else if (C == 125 && h++ == 0 && Yd() == 125) continue;
        }
        switch (((R += br(C)), C * h)) {
          case 38:
            O = u > 0 ? 1 : ((R += '\f'), -1);
            break;
          case 44:
            (l[d++] = (Qt(R) - 1) * O), (O = 1);
            break;
          case 64:
            tn() === 45 && (R += Xo($t())), (m = tn()), (u = p = Qt((E = R += Jd(Go())))), C++;
            break;
          case 45:
            g === 45 && Qt(R) == 2 && (h = 0);
        }
    }
  return a;
}
function ja(e, t, o, r, i, a, s, l, c, d, u) {
  for (var p = i - 1, m = i === 0 ? a : [''], y = Di(m), g = 0, h = 0, v = 0; g < r; ++g)
    for (var O = 0, C = Co(e, p + 1, (p = Bd((h = s[g])))), E = e; O < y; ++O)
      (E = Sl(h > 0 ? m[O] + ' ' + C : je(C, /&\f/g, m[O]))) && (c[v++] = E);
  return gr(e, t, o, i === 0 ? _i : l, c, d, u);
}
function Qd(e, t, o) {
  return gr(e, t, o, Mi, br(qd()), Co(e, 2, -2), 0);
}
function La(e, t, o, r) {
  return gr(e, t, o, Ai, Co(e, 0, r), Co(e, r + 1, -1), r);
}
function Bn(e, t) {
  for (var o = '', r = Di(e), i = 0; i < r; i++) o += t(e[i], i, e, t) || '';
  return o;
}
function ep(e, t, o, r) {
  switch (e.type) {
    case zd:
      if (e.children.length) break;
    case Fd:
    case Ai:
      return (e.return = e.return || e.value);
    case Mi:
      return '';
    case Rl:
      return (e.return = e.value + '{' + Bn(e.children, r) + '}');
    case _i:
      e.value = e.props.join(',');
  }
  return Qt((o = Bn(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function tp(e) {
  var t = Di(e);
  return function (o, r, i, a) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, i, a) || '';
    return s;
  };
}
function np(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var op = function (t, o, r) {
    for (var i = 0, a = 0; (i = a), (a = tn()), i === 38 && a === 12 && (o[r] = 1), !Ro(a); ) $t();
    return No(t, gt);
  },
  rp = function (t, o) {
    var r = -1,
      i = 44;
    do
      switch (Ro(i)) {
        case 0:
          i === 38 && tn() === 12 && (o[r] = 1), (t[r] += op(gt - 1, o, r));
          break;
        case 2:
          t[r] += Xo(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = tn() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += br(i);
      }
    while ((i = $t()));
    return t;
  },
  ip = function (t, o) {
    return kl(rp($l(t), o));
  },
  Fa = /* @__PURE__ */ new WeakMap(),
  ap = function (t) {
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
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !Fa.get(r)) && !i) {
        Fa.set(t, !0);
        for (var a = [], s = ip(o, a), l = r.props, c = 0, d = 0; c < s.length; c++)
          for (var u = 0; u < l.length; u++, d++)
            t.props[d] = a[c] ? s[c].replace(/&\f/g, l[u]) : l[u] + ' ' + s[c];
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
              if (cp(d)) return;
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
  Nl = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  dp = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!Nl(o[r])) return !0;
    return !1;
  },
  za = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  pp = function (t, o, r) {
    Nl(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          za(t))
        : dp(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          za(t)));
  };
function Pl(e, t) {
  switch (Ud(e, t)) {
    case 5103:
      return De + 'print-' + e + e;
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
      return De + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return De + e + nr + e + dt + e + e;
    case 6828:
    case 4268:
      return De + e + dt + e + e;
    case 6165:
      return De + e + dt + 'flex-' + e + e;
    case 5187:
      return De + e + je(e, /(\w+).+(:[^]+)/, De + 'box-$1$2' + dt + 'flex-$1$2') + e;
    case 5443:
      return De + e + dt + 'flex-item-' + je(e, /flex-|-self/, '') + e;
    case 4675:
      return De + e + dt + 'flex-line-pack' + je(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return De + e + dt + je(e, 'shrink', 'negative') + e;
    case 5292:
      return De + e + dt + je(e, 'basis', 'preferred-size') + e;
    case 6060:
      return De + 'box-' + je(e, '-grow', '') + De + e + dt + je(e, 'grow', 'positive') + e;
    case 4554:
      return De + je(e, /([^-])(transform)/g, '$1' + De + '$2') + e;
    case 6187:
      return je(je(je(e, /(zoom-|grab)/, De + '$1'), /(image-set)/, De + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return je(e, /(image-set\([^]*)/, De + '$1$`$1');
    case 4968:
      return (
        je(
          je(e, /(.+:)(flex-)?(.*)/, De + 'box-pack:$3' + dt + 'flex-pack:$3'),
          /s.+-b[^;]+/,
          'justify',
        ) +
        De +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return je(e, /(.+)-inline(.+)/, De + '$1$2') + e;
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
      if (Qt(e) - 1 - t > 6)
        switch (ct(e, t + 1)) {
          case 109:
            if (ct(e, t + 4) !== 45) break;
          case 102:
            return (
              je(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + De + '$2-$3$1' + nr + (ct(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~di(e, 'stretch') ? Pl(je(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (ct(e, t + 1) !== 115) break;
    case 6444:
      switch (ct(e, Qt(e) - 3 - (~di(e, '!important') && 10))) {
        case 107:
          return je(e, ':', ':' + De) + e;
        case 101:
          return (
            je(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                De +
                (ct(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                De +
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
          return De + e + dt + je(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return De + e + dt + je(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return De + e + dt + je(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return De + e + dt + e + e;
  }
  return e;
}
var fp = function (t, o, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Ai:
          t.return = Pl(t.value, t.length);
          break;
        case Rl:
          return Bn(
            [
              io(t, {
                value: je(t.value, '@', '@' + De),
              }),
            ],
            i,
          );
        case _i:
          if (t.length)
            return Hd(t.props, function (a) {
              switch (Wd(a, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Bn(
                    [
                      io(t, {
                        props: [je(a, /:(read-\w+)/, ':' + nr + '$1')],
                      }),
                    ],
                    i,
                  );
                case '::placeholder':
                  return Bn(
                    [
                      io(t, {
                        props: [je(a, /:(plac\w+)/, ':' + De + 'input-$1')],
                      }),
                      io(t, {
                        props: [je(a, /:(plac\w+)/, ':' + nr + '$1')],
                      }),
                      io(t, {
                        props: [je(a, /:(plac\w+)/, dt + 'input-$1')],
                      }),
                    ],
                    i,
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
        var v = h.getAttribute('data-emotion');
        v.indexOf(' ') !== -1 && (document.head.appendChild(h), h.setAttribute('data-s', ''));
      });
    }
    var i = t.stylisPlugins || mp;
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
          for (var v = h.getAttribute('data-emotion').split(' '), O = 1; O < v.length; O++)
            a[v[O]] = !0;
          l.push(h);
        },
      );
    var c,
      d = [ap, sp];
    process.env.NODE_ENV !== 'production' &&
      d.push(
        up({
          get compat() {
            return g.compat;
          },
        }),
        pp,
      );
    {
      var u,
        p = [
          ep,
          process.env.NODE_ENV !== 'production'
            ? function (h) {
                h.root ||
                  (h.return
                    ? u.insert(h.return)
                    : h.value && h.type !== Mi && u.insert(h.value + '{}'));
              }
            : np(function (h) {
                u.insert(h);
              }),
        ],
        m = tp(d.concat(i, p)),
        y = function (v) {
          return Bn(Zd(v), m);
        };
      c = function (v, O, C, E) {
        (u = C),
          process.env.NODE_ENV !== 'production' &&
            O.map !== void 0 &&
            (u = {
              insert: function (f) {
                C.insert(f + O.map);
              },
            }),
          y(v ? v + '{' + O.styles + '}' : O.styles),
          E && (g.inserted[O.name] = !0);
      };
    }
    var g = {
      key: o,
      sheet: new Ld({
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
  fi = { exports: {} },
  He = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ba;
function bp() {
  if (Ba) return He;
  Ba = 1;
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
    m = e ? Symbol.for('react.suspense_list') : 60120,
    y = e ? Symbol.for('react.memo') : 60115,
    g = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    v = e ? Symbol.for('react.fundamental') : 60117,
    O = e ? Symbol.for('react.responder') : 60118,
    C = e ? Symbol.for('react.scope') : 60119;
  function E(f) {
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
  function x(f) {
    return E(f) === d;
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
      return x(f) || E(f) === c;
    }),
    (He.isConcurrentMode = x),
    (He.isContextConsumer = function (f) {
      return E(f) === l;
    }),
    (He.isContextProvider = function (f) {
      return E(f) === s;
    }),
    (He.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (He.isForwardRef = function (f) {
      return E(f) === u;
    }),
    (He.isFragment = function (f) {
      return E(f) === r;
    }),
    (He.isLazy = function (f) {
      return E(f) === g;
    }),
    (He.isMemo = function (f) {
      return E(f) === y;
    }),
    (He.isPortal = function (f) {
      return E(f) === o;
    }),
    (He.isProfiler = function (f) {
      return E(f) === a;
    }),
    (He.isStrictMode = function (f) {
      return E(f) === i;
    }),
    (He.isSuspense = function (f) {
      return E(f) === p;
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
        f === m ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === g ||
            f.$$typeof === y ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === u ||
            f.$$typeof === v ||
            f.$$typeof === O ||
            f.$$typeof === C ||
            f.$$typeof === h))
      );
    }),
    (He.typeOf = E),
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
var Va;
function vp() {
  return (
    Va ||
      ((Va = 1),
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
            m = e ? Symbol.for('react.suspense_list') : 60120,
            y = e ? Symbol.for('react.memo') : 60115,
            g = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            v = e ? Symbol.for('react.fundamental') : 60117,
            O = e ? Symbol.for('react.responder') : 60118,
            C = e ? Symbol.for('react.scope') : 60119;
          function E(M) {
            return (
              typeof M == 'string' ||
              typeof M == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              M === r ||
              M === d ||
              M === a ||
              M === i ||
              M === p ||
              M === m ||
              (typeof M == 'object' &&
                M !== null &&
                (M.$$typeof === g ||
                  M.$$typeof === y ||
                  M.$$typeof === s ||
                  M.$$typeof === l ||
                  M.$$typeof === u ||
                  M.$$typeof === v ||
                  M.$$typeof === O ||
                  M.$$typeof === C ||
                  M.$$typeof === h))
            );
          }
          function x(M) {
            if (typeof M == 'object' && M !== null) {
              var Te = M.$$typeof;
              switch (Te) {
                case t:
                  var Q = M.type;
                  switch (Q) {
                    case c:
                    case d:
                    case r:
                    case a:
                    case i:
                    case p:
                      return Q;
                    default:
                      var q = Q && Q.$$typeof;
                      switch (q) {
                        case l:
                        case u:
                        case g:
                        case y:
                        case s:
                          return q;
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
            S = d,
            R = l,
            A = s,
            j = t,
            w = u,
            I = r,
            G = g,
            z = y,
            _ = o,
            D = a,
            W = i,
            re = p,
            L = !1;
          function F(M) {
            return (
              L ||
                ((L = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              $(M) || x(M) === c
            );
          }
          function $(M) {
            return x(M) === d;
          }
          function B(M) {
            return x(M) === l;
          }
          function Z(M) {
            return x(M) === s;
          }
          function U(M) {
            return typeof M == 'object' && M !== null && M.$$typeof === t;
          }
          function Y(M) {
            return x(M) === u;
          }
          function X(M) {
            return x(M) === r;
          }
          function ie(M) {
            return x(M) === g;
          }
          function ee(M) {
            return x(M) === y;
          }
          function ae(M) {
            return x(M) === o;
          }
          function ue(M) {
            return x(M) === a;
          }
          function de(M) {
            return x(M) === i;
          }
          function me(M) {
            return x(M) === p;
          }
          (qe.AsyncMode = f),
            (qe.ConcurrentMode = S),
            (qe.ContextConsumer = R),
            (qe.ContextProvider = A),
            (qe.Element = j),
            (qe.ForwardRef = w),
            (qe.Fragment = I),
            (qe.Lazy = G),
            (qe.Memo = z),
            (qe.Portal = _),
            (qe.Profiler = D),
            (qe.StrictMode = W),
            (qe.Suspense = re),
            (qe.isAsyncMode = F),
            (qe.isConcurrentMode = $),
            (qe.isContextConsumer = B),
            (qe.isContextProvider = Z),
            (qe.isElement = U),
            (qe.isForwardRef = Y),
            (qe.isFragment = X),
            (qe.isLazy = ie),
            (qe.isMemo = ee),
            (qe.isPortal = ae),
            (qe.isProfiler = ue),
            (qe.isStrictMode = de),
            (qe.isSuspense = me),
            (qe.isValidElementType = E),
            (qe.typeOf = x);
        })()),
    qe
  );
}
process.env.NODE_ENV === 'production' ? (fi.exports = bp()) : (fi.exports = vp());
var gp = fi.exports,
  Il = gp,
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
  Ml = {};
Ml[Il.ForwardRef] = yp;
Ml[Il.Memo] = xp;
var Ep = !0;
function ji(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (i) {
      e[i] !== void 0 ? t.push(e[i] + ';') : (r += i + ' ');
    }),
    r
  );
}
var yr = function (t, o, r) {
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
      Ep === !1) &&
      t.registered[i] === void 0 &&
      (t.registered[i] = o.styles);
  },
  xr = function (t, o, r) {
    yr(t, o, r);
    var i = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var a = o;
      do t.insert(o === a ? '.' + i : '', a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  };
function Op(e) {
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
var Tp = {
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
  Ua = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Cp =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  Rp = /[A-Z]|^ms/g,
  _l = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Li = function (t) {
    return t.charCodeAt(1) === 45;
  },
  Wa = function (t) {
    return t != null && typeof t != 'boolean';
  },
  Zr = /* @__PURE__ */ Cl(function (e) {
    return Li(e) ? e : e.replace(Rp, '-$&').toLowerCase();
  }),
  or = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(_l, function (r, i, a) {
            return (
              (Bt = {
                name: i,
                styles: a,
                next: Bt,
              }),
              i
            );
          });
    }
    return Tp[t] !== 1 && !Li(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var Sp =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    wp = ['normal', 'none', 'initial', 'inherit', 'unset'],
    $p = or,
    kp = /^-ms-/,
    Np = /-(.)/g,
    Ha = {};
  or = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (wp.indexOf(o) === -1 &&
          !Sp.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = $p(t, o);
    return (
      r !== '' &&
        !Li(t) &&
        t.indexOf('-') !== -1 &&
        Ha[t] === void 0 &&
        ((Ha[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(kp, 'ms-').replace(Np, function (i, a) {
              return a.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var Al =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function So(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(Al);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1)
        return (
          (Bt = {
            name: o.name,
            styles: o.styles,
            next: Bt,
          }),
          o.name
        );
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; )
            (Bt = {
              name: r.name,
              styles: r.styles,
              next: Bt,
            }),
              (r = r.next);
        var i = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (i += o.map), i;
      }
      return Pp(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var a = Bt,
          s = o(e);
        return (Bt = a), So(e, t, s);
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
          c = o.replace(_l, function (u, p, m) {
            var y = 'animation' + l.length;
            return (
              l.push(
                'const ' + y + ' = keyframes`' + m.replace(/^@keyframes animation-\w+/, '') + '`',
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
function Pp(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var i = 0; i < o.length; i++) r += So(e, t, o[i]) + ';';
  else
    for (var a in o) {
      var s = o[a];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += a + '{' + t[s] + '}')
          : Wa(s) && (r += Zr(a) + ':' + or(a, s) + ';');
      else {
        if (a === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(Al);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) Wa(s[l]) && (r += Zr(a) + ':' + or(a, s[l]) + ';');
        else {
          var c = So(e, t, s);
          switch (a) {
            case 'animation':
            case 'animationName': {
              r += Zr(a) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && a === 'undefined' && console.error(Cp),
                (r += a + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var qa = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  Dl;
process.env.NODE_ENV !== 'production' &&
  (Dl = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var Bt,
  Hn = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      a = '';
    Bt = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((i = !1), (a += So(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(Ua),
        (a += s[0]));
    for (var l = 1; l < t.length; l++)
      (a += So(r, o, t[l])),
        i &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(Ua),
          (a += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (a = a.replace(Dl, function (m) {
        return (c = m), '';
      })),
      (qa.lastIndex = 0);
    for (var d = '', u; (u = qa.exec(a)) !== null; )
      d +=
        '-' + // $FlowFixMe we know it's not null
        u[1];
    var p = Op(a) + d;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: p,
          styles: a,
          map: c,
          next: Bt,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : {
          name: p,
          styles: a,
          next: Bt,
        };
  },
  Ip = function (t) {
    return t();
  },
  jl = b['useInsertionEffect'] ? b['useInsertionEffect'] : !1,
  Fi = jl || Ip,
  Ya = jl || b.useLayoutEffect,
  Mp = {}.hasOwnProperty,
  zi = /* @__PURE__ */ b.createContext(
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
process.env.NODE_ENV !== 'production' && (zi.displayName = 'EmotionCacheContext');
zi.Provider;
var Er = function (t) {
    return /* @__PURE__ */ $u(function (o, r) {
      var i = ku(zi);
      return t(o, i, r);
    });
  },
  Qn = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== 'production' && (Qn.displayName = 'EmotionThemeContext');
var Ka = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  Ga = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  _p = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      yr(o, r, i),
      Fi(function () {
        return xr(o, r, i);
      }),
      null
    );
  },
  Ap = /* @__PURE__ */ Er(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[Ka],
      a = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = ji(t.registered, a, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = Hn(a, void 0, b.useContext(Qn));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[Ga];
      c && (l = Hn([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var d = {};
    for (var u in e)
      Mp.call(e, u) &&
        u !== 'css' &&
        u !== Ka &&
        (process.env.NODE_ENV === 'production' || u !== Ga) &&
        (d[u] = e[u]);
    return (
      (d.ref = o),
      (d.className = s),
      /* @__PURE__ */ b.createElement(
        b.Fragment,
        null,
        /* @__PURE__ */ b.createElement(_p, {
          cache: t,
          serialized: l,
          isStringTag: typeof i == 'string',
        }),
        /* @__PURE__ */ b.createElement(i, d),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (Ap.displayName = 'EmotionCssPropInternal');
var Dp = {
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
  Xa = !1,
  Ll = /* @__PURE__ */ Er(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !Xa && // check for className as well since the user is
      // probably using the custom createElement which
      // means it will be turned into a className prop
      // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (Xa = !0));
    var o = e.styles,
      r = Hn([o], void 0, b.useContext(Qn)),
      i = b.useRef();
    return (
      Ya(
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
      Ya(
        function () {
          var a = i.current,
            s = a[0],
            l = a[1];
          if (l) {
            a[1] = !1;
            return;
          }
          if ((r.next !== void 0 && xr(t, r.next, !0), s.tags.length)) {
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
process.env.NODE_ENV !== 'production' && (Ll.displayName = 'EmotionGlobal');
function jp() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return Hn(t);
}
var Bi = function () {
    var t = jp.apply(void 0, arguments),
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
  Lp = function e(t) {
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
function Fp(e, t, o) {
  var r = [],
    i = ji(e, r, o);
  return r.length < 2 ? o : i + t(r);
}
var zp = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      Fi(function () {
        for (var i = 0; i < r.length; i++) xr(o, r[i], !1);
      }),
      null
    );
  },
  Bp = /* @__PURE__ */ Er(function (e, t) {
    var o = !1,
      r = [],
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++) u[p] = arguments[p];
        var m = Hn(u, t.registered);
        return r.push(m), yr(t, m, !1), t.key + '-' + m.name;
      },
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++) u[p] = arguments[p];
        return Fp(t.registered, i, Lp(u));
      },
      s = {
        css: i,
        cx: a,
        theme: b.useContext(Qn),
      },
      l = e.children(s);
    return (
      (o = !0),
      /* @__PURE__ */ b.createElement(
        b.Fragment,
        null,
        /* @__PURE__ */ b.createElement(zp, {
          cache: t,
          serializedArr: r,
        }),
        l,
      )
    );
  });
process.env.NODE_ENV !== 'production' && (Bp.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var Ja = !0,
    Vp = typeof jest < 'u' || typeof vi < 'u';
  if (Ja && !Vp) {
    var Za =
        // $FlowIgnore
        typeof globalThis < 'u' ? globalThis : Ja ? window : global,
      Qa = '__EMOTION_REACT_' + Dp.version.split('.')[0] + '__';
    Za[Qa] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (Za[Qa] = !0);
  }
}
var Up = Ad,
  Wp = function (t) {
    return t !== 'theme';
  },
  es = function (t) {
    return typeof t == 'string' && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      t.charCodeAt(0) > 96
      ? Up
      : Wp;
  },
  ts = function (t, o, r) {
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
  ns = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Hp = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      yr(o, r, i),
      Fi(function () {
        return xr(o, r, i);
      }),
      null
    );
  },
  qp = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      i = (r && t.__emotion_base) || t,
      a,
      s;
    o !== void 0 && ((a = o.label), (s = o.target));
    var l = ts(t, o, r),
      c = l || es(i),
      d = !c('as');
    return function () {
      var u = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((a !== void 0 && p.push('label:' + a + ';'), u[0] == null || u[0].raw === void 0))
        p.push.apply(p, u);
      else {
        process.env.NODE_ENV !== 'production' && u[0][0] === void 0 && console.error(ns),
          p.push(u[0][0]);
        for (var m = u.length, y = 1; y < m; y++)
          process.env.NODE_ENV !== 'production' && u[0][y] === void 0 && console.error(ns),
            p.push(u[y], u[0][y]);
      }
      var g = Er(function (h, v, O) {
        var C = (d && h.as) || i,
          E = '',
          x = [],
          f = h;
        if (h.theme == null) {
          f = {};
          for (var S in h) f[S] = h[S];
          f.theme = b.useContext(Qn);
        }
        typeof h.className == 'string'
          ? (E = ji(v.registered, x, h.className))
          : h.className != null && (E = h.className + ' ');
        var R = Hn(p.concat(x), v.registered, f);
        (E += v.key + '-' + R.name), s !== void 0 && (E += ' ' + s);
        var A = d && l === void 0 ? es(C) : c,
          j = {};
        for (var w in h)
          (d && w === 'as') || // $FlowFixMe
            (A(w) && (j[w] = h[w]));
        return (
          (j.className = E),
          (j.ref = O),
          /* @__PURE__ */ b.createElement(
            b.Fragment,
            null,
            /* @__PURE__ */ b.createElement(Hp, {
              cache: v,
              serialized: R,
              isStringTag: typeof C == 'string',
            }),
            /* @__PURE__ */ b.createElement(C, j),
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
        (g.withComponent = function (h, v) {
          return e(
            h,
            tr({}, o, v, {
              shouldForwardProp: ts(g, v, !0),
            }),
          ).apply(void 0, p);
        }),
        g
      );
    };
  },
  Yp = [
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
  mi = qp.bind();
Yp.forEach(function (e) {
  mi[e] = mi(e);
});
function Kp(e) {
  return e == null || Object.keys(e).length === 0;
}
function Fl(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return /* @__PURE__ */ N(Ll, {
    styles: typeof t == 'function' ? (i) => t(Kp(i) ? o : i) : t,
  });
}
process.env.NODE_ENV !== 'production' &&
  (Fl.propTypes = {
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
function Gp(e, t) {
  const o = mi(e, t);
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
const Xp = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  Jp = (e) => {
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
function Zp(e) {
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
    a = Jp(t),
    s = Object.keys(a);
  function l(m) {
    return `@media (min-width:${typeof t[m] == 'number' ? t[m] : m}${o})`;
  }
  function c(m) {
    return `@media (max-width:${(typeof t[m] == 'number' ? t[m] : m) - r / 100}${o})`;
  }
  function d(m, y) {
    const g = s.indexOf(y);
    return `@media (min-width:${typeof t[m] == 'number' ? t[m] : m}${o}) and (max-width:${
      (g !== -1 && typeof t[s[g]] == 'number' ? t[s[g]] : y) - r / 100
    }${o})`;
  }
  function u(m) {
    return s.indexOf(m) + 1 < s.length ? d(m, s[s.indexOf(m) + 1]) : l(m);
  }
  function p(m) {
    const y = s.indexOf(m);
    return y === 0
      ? l(s[1])
      : y === s.length - 1
      ? c(s[y])
      : d(m, s[s.indexOf(m) + 1]).replace('@media', '@media not all and');
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
const Qp = {
    borderRadius: 4,
  },
  ef = Qp,
  tf =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  hn = tf;
function ho(e, t) {
  return t
    ? Mt(e, t, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const Vi = {
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
  os = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${Vi[e]}px)`,
  };
function At(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || os;
    return t.reduce((s, l, c) => ((s[a.up(a.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const a = r.breakpoints || os;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || Vi).indexOf(l) !== -1) {
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
function nf(e = {}) {
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
function of(e, t) {
  return e.reduce((o, r) => {
    const i = o[r];
    return (!i || Object.keys(i).length === 0) && delete o[r], o;
  }, t);
}
function rf(e, t) {
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
function Or({ values: e, breakpoints: t, base: o }) {
  const r = o || rf(e, t),
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
function Tr(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((i, a) => (i && i[a] ? i[a] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, i) => (r && r[i] != null ? r[i] : null), e);
}
function rr(e, t, o, r = o) {
  let i;
  return (
    typeof e == 'function' ? (i = e(o)) : Array.isArray(e) ? (i = e[o] || r) : (i = Tr(e, o) || r),
    t && (i = t(i, r, e)),
    i
  );
}
function Ge(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: i } = e,
    a = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        d = Tr(c, r) || {};
      return At(s, l, (p) => {
        let m = rr(d, i, p);
        return (
          p === m &&
            typeof p == 'string' &&
            (m = rr(d, i, `${t}${p === 'default' ? '' : J(p)}`, p)),
          o === !1
            ? m
            : {
                [o]: m,
              }
        );
      });
    };
  return (
    (a.propTypes =
      process.env.NODE_ENV !== 'production'
        ? {
            [t]: hn,
          }
        : {}),
    (a.filterProps = [t]),
    a
  );
}
function af(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const sf = {
    m: 'margin',
    p: 'padding',
  },
  lf = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  rs = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  cf = af((e) => {
    if (e.length > 2)
      if (rs[e]) e = rs[e];
      else return [e];
    const [t, o] = e.split(''),
      r = sf[t],
      i = lf[o] || '';
    return Array.isArray(i) ? i.map((a) => r + a) : [r + i];
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
  Rr = [
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
  uf = [...Cr, ...Rr];
function Po(e, t, o, r) {
  var i;
  const a = (i = Tr(e, t, !1)) != null ? i : o;
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
function zl(e) {
  return Po(e, 'spacing', 8, 'spacing');
}
function Io(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function df(e, t) {
  return (o) => e.reduce((r, i) => ((r[i] = Io(t, o)), r), {});
}
function pf(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const i = cf(o),
    a = df(i, r),
    s = e[o];
  return At(e, s, a);
}
function Bl(e, t) {
  const o = zl(e.theme);
  return Object.keys(e)
    .map((r) => pf(e, t, r, o))
    .reduce(ho, {});
}
function tt(e) {
  return Bl(e, Cr);
}
tt.propTypes =
  process.env.NODE_ENV !== 'production' ? Cr.reduce((e, t) => ((e[t] = hn), e), {}) : {};
tt.filterProps = Cr;
function nt(e) {
  return Bl(e, Rr);
}
nt.propTypes =
  process.env.NODE_ENV !== 'production' ? Rr.reduce((e, t) => ((e[t] = hn), e), {}) : {};
nt.filterProps = Rr;
process.env.NODE_ENV !== 'production' && uf.reduce((e, t) => ((e[t] = hn), e), {});
function ff(e = 8) {
  if (e.mui) return e;
  const t = zl({
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
function Sr(...e) {
  const t = e.reduce(
      (r, i) => (
        i.filterProps.forEach((a) => {
          r[a] = i;
        }),
        r
      ),
      {},
    ),
    o = (r) => Object.keys(r).reduce((i, a) => (t[a] ? ho(i, t[a](r)) : i), {});
  return (
    (o.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((r, i) => Object.assign(r, i.propTypes), {})
        : {}),
    (o.filterProps = e.reduce((r, i) => r.concat(i.filterProps), [])),
    o
  );
}
function en(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const mf = Ge({
    prop: 'border',
    themeKey: 'borders',
    transform: en,
  }),
  hf = Ge({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: en,
  }),
  bf = Ge({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: en,
  }),
  vf = Ge({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: en,
  }),
  gf = Ge({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: en,
  }),
  yf = Ge({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  xf = Ge({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  Ef = Ge({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  Of = Ge({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  Tf = Ge({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  wr = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = Po(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({
          borderRadius: Io(t, r),
        });
      return At(e, e.borderRadius, o);
    }
    return null;
  };
wr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: hn,
      }
    : {};
wr.filterProps = ['borderRadius'];
Sr(mf, hf, bf, vf, gf, yf, xf, Ef, Of, Tf, wr);
const $r = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Po(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({
        gap: Io(t, r),
      });
    return At(e, e.gap, o);
  }
  return null;
};
$r.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: hn,
      }
    : {};
$r.filterProps = ['gap'];
const kr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Po(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({
        columnGap: Io(t, r),
      });
    return At(e, e.columnGap, o);
  }
  return null;
};
kr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: hn,
      }
    : {};
kr.filterProps = ['columnGap'];
const Nr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Po(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({
        rowGap: Io(t, r),
      });
    return At(e, e.rowGap, o);
  }
  return null;
};
Nr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: hn,
      }
    : {};
Nr.filterProps = ['rowGap'];
const Cf = Ge({
    prop: 'gridColumn',
  }),
  Rf = Ge({
    prop: 'gridRow',
  }),
  Sf = Ge({
    prop: 'gridAutoFlow',
  }),
  wf = Ge({
    prop: 'gridAutoColumns',
  }),
  $f = Ge({
    prop: 'gridAutoRows',
  }),
  kf = Ge({
    prop: 'gridTemplateColumns',
  }),
  Nf = Ge({
    prop: 'gridTemplateRows',
  }),
  Pf = Ge({
    prop: 'gridTemplateAreas',
  }),
  If = Ge({
    prop: 'gridArea',
  });
Sr($r, kr, Nr, Cf, Rf, Sf, wf, $f, kf, Nf, Pf, If);
function Vn(e, t) {
  return t === 'grey' ? t : e;
}
const Mf = Ge({
    prop: 'color',
    themeKey: 'palette',
    transform: Vn,
  }),
  _f = Ge({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: Vn,
  }),
  Af = Ge({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: Vn,
  });
Sr(Mf, _f, Af);
function wt(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Df = Ge({
    prop: 'width',
    transform: wt,
  }),
  Ui = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, i, a;
        return {
          maxWidth:
            ((r = e.theme) == null || (i = r.breakpoints) == null || (a = i.values) == null
              ? void 0
              : a[o]) ||
            Vi[o] ||
            wt(o),
        };
      };
      return At(e, e.maxWidth, t);
    }
    return null;
  };
Ui.filterProps = ['maxWidth'];
const jf = Ge({
    prop: 'minWidth',
    transform: wt,
  }),
  Lf = Ge({
    prop: 'height',
    transform: wt,
  }),
  Ff = Ge({
    prop: 'maxHeight',
    transform: wt,
  }),
  zf = Ge({
    prop: 'minHeight',
    transform: wt,
  });
Ge({
  prop: 'size',
  cssProperty: 'width',
  transform: wt,
});
Ge({
  prop: 'size',
  cssProperty: 'height',
  transform: wt,
});
const Bf = Ge({
  prop: 'boxSizing',
});
Sr(Df, Ui, jf, Lf, Ff, zf, Bf);
const Vf = {
    // borders
    border: {
      themeKey: 'borders',
      transform: en,
    },
    borderTop: {
      themeKey: 'borders',
      transform: en,
    },
    borderRight: {
      themeKey: 'borders',
      transform: en,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: en,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: en,
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
      style: wr,
    },
    // palette
    color: {
      themeKey: 'palette',
      transform: Vn,
    },
    bgcolor: {
      themeKey: 'palette',
      cssProperty: 'backgroundColor',
      transform: Vn,
    },
    backgroundColor: {
      themeKey: 'palette',
      transform: Vn,
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
      style: $r,
    },
    rowGap: {
      style: Nr,
    },
    columnGap: {
      style: kr,
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
      style: Ui,
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
  Pr = Vf;
function Uf(...e) {
  const t = e.reduce((r, i) => r.concat(Object.keys(i)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function Wf(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Hf() {
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
    const m = Tr(i, d) || {};
    return p
      ? p(s)
      : At(s, r, (g) => {
          let h = rr(m, u, g);
          return (
            g === h &&
              typeof g == 'string' &&
              (h = rr(m, u, `${o}${g === 'default' ? '' : J(g)}`, g)),
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
    const s = (r = a.unstable_sxConfig) != null ? r : Pr;
    function l(c) {
      let d = c;
      if (typeof c == 'function') d = c(a);
      else if (typeof c != 'object') return c;
      if (!d) return null;
      const u = nf(a.breakpoints),
        p = Object.keys(u);
      let m = u;
      return (
        Object.keys(d).forEach((y) => {
          const g = Wf(d[y], a);
          if (g != null)
            if (typeof g == 'object')
              if (s[y]) m = ho(m, e(y, g, a, s));
              else {
                const h = At(
                  {
                    theme: a,
                  },
                  g,
                  (v) => ({
                    [y]: v,
                  }),
                );
                Uf(h, g)
                  ? (m[y] = t({
                      sx: g,
                      theme: a,
                    }))
                  : (m = ho(m, h));
              }
            else m = ho(m, e(y, g, a, s));
        }),
        of(p, m)
      );
    }
    return Array.isArray(i) ? i.map(l) : l(i);
  }
  return t;
}
const Vl = Hf();
Vl.filterProps = ['sx'];
const Wi = Vl;
function Hi(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: i, shape: a = {}, ...s } = e,
    l = Zp(o),
    c = ff(i);
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
        ...ef,
        ...a,
      },
    },
    s,
  );
  return (
    (d = t.reduce((u, p) => Mt(u, p), d)),
    (d.unstable_sxConfig = {
      ...Pr,
      ...(s == null ? void 0 : s.unstable_sxConfig),
    }),
    (d.unstable_sx = function (p) {
      return Wi({
        sx: p,
        theme: this,
      });
    }),
    d
  );
}
function qf(e) {
  return Object.keys(e).length === 0;
}
function Ul(e = null) {
  const t = b.useContext(Qn);
  return !t || qf(t) ? e : t;
}
const Yf = Hi();
function qi(e = Yf) {
  return Ul(e);
}
function Wl({ styles: e, themeId: t, defaultTheme: o = {} }) {
  const r = qi(o),
    i = typeof e == 'function' ? e((t && r[t]) || r) : e;
  return /* @__PURE__ */ N(Fl, {
    styles: i,
  });
}
process.env.NODE_ENV !== 'production' &&
  (Wl.propTypes = {
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
const Kf = (e) => {
  var t, o;
  const r = {
      systemProps: {},
      otherProps: {},
    },
    i = (t = e == null || (o = e.theme) == null ? void 0 : o.unstable_sxConfig) != null ? t : Pr;
  return (
    Object.keys(e).forEach((a) => {
      i[a] ? (r.systemProps[a] = e[a]) : (r.otherProps[a] = e[a]);
    }),
    r
  );
};
function Gf(e) {
  const { sx: t, ...o } = e,
    { systemProps: r, otherProps: i } = Kf(o);
  let a;
  return (
    Array.isArray(t)
      ? (a = [r, ...t])
      : typeof t == 'function'
      ? (a = (...s) => {
          const l = t(...s);
          return On(l)
            ? {
                ...r,
                ...l,
              }
            : r;
        })
      : (a = {
          ...r,
          ...t,
        }),
    {
      ...i,
      sx: a,
    }
  );
}
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
function be() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = Hl(e)) && (r && (r += ' '), (r += t));
  return r;
}
function is(e) {
  return e.length === 0;
}
function ql(e) {
  const { variant: t, ...o } = e;
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((i) => {
        i === 'color'
          ? (r += is(r) ? e[i] : J(e[i]))
          : (r += `${is(r) ? i : J(i)}${J(e[i].toString())}`);
      }),
    r
  );
}
function Xf(e) {
  return Object.keys(e).length === 0;
}
function Jf(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const Zf = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Qf = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((i) => {
        const a = ql(i.props);
        r[a] = i.style;
      }),
      r
    );
  },
  em = (e, t, o, r) => {
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
            u && l.push(t[ql(d.props)]);
        }),
      l
    );
  };
function bo(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const tm = Hi(),
  nm = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function ao({ defaultTheme: e, theme: t, themeId: o }) {
  return Xf(t) ? e : t[o] || t;
}
function om(e = {}) {
  const {
      themeId: t,
      defaultTheme: o = tm,
      rootShouldForwardProp: r = bo,
      slotShouldForwardProp: i = bo,
    } = e,
    a = (s) =>
      Wi({
        ...s,
        theme: ao({
          ...s,
          defaultTheme: o,
          themeId: t,
        }),
      });
  return (
    (a.__mui_systemSx = !0),
    (s, l = {}) => {
      Xp(s, (x) => x.filter((f) => !(f != null && f.__mui_systemSx)));
      const {
          name: c,
          slot: d,
          skipVariantsResolver: u,
          skipSx: p,
          overridesResolver: m,
          ...y
        } = l,
        g = u !== void 0 ? u : (d && d !== 'Root') || !1,
        h = p || !1;
      let v;
      process.env.NODE_ENV !== 'production' && c && (v = `${c}-${nm(d || 'Root')}`);
      let O = bo;
      d === 'Root' ? (O = r) : d ? (O = i) : Jf(s) && (O = void 0);
      const C = Gp(s, {
          shouldForwardProp: O,
          label: v,
          ...y,
        }),
        E = (x, ...f) => {
          const S = f
            ? f.map((w) =>
                typeof w == 'function' && w.__emotion_real !== w
                  ? (I) =>
                      w({
                        ...I,
                        theme: ao({
                          ...I,
                          defaultTheme: o,
                          themeId: t,
                        }),
                      })
                  : w,
              )
            : [];
          let R = x;
          c &&
            m &&
            S.push((w) => {
              const I = ao({
                  ...w,
                  defaultTheme: o,
                  themeId: t,
                }),
                G = Zf(c, I);
              if (G) {
                const z = {};
                return (
                  Object.entries(G).forEach(([_, D]) => {
                    z[_] =
                      typeof D == 'function'
                        ? D({
                            ...w,
                            theme: I,
                          })
                        : D;
                  }),
                  m(w, z)
                );
              }
              return null;
            }),
            c &&
              !g &&
              S.push((w) => {
                const I = ao({
                  ...w,
                  defaultTheme: o,
                  themeId: t,
                });
                return em(w, Qf(c, I), I, c);
              }),
            h || S.push(a);
          const A = S.length - f.length;
          if (Array.isArray(x) && A > 0) {
            const w = new Array(A).fill('');
            (R = [...x, ...w]), (R.raw = [...x.raw, ...w]);
          } else
            typeof x == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              x.__emotion_real !== x &&
              (R = (w) =>
                x({
                  ...w,
                  theme: ao({
                    ...w,
                    defaultTheme: o,
                    themeId: t,
                  }),
                }));
          const j = C(R, ...S);
          if (process.env.NODE_ENV !== 'production') {
            let w;
            c && (w = `${c}${d || ''}`),
              w === void 0 && (w = `Styled(${dd(s)})`),
              (j.displayName = w);
          }
          return s.muiName && (j.muiName = s.muiName), j;
        };
      return C.withConfig && (E.withConfig = C.withConfig), E;
    }
  );
}
function rm(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : Ii(t.components[o].defaultProps, r);
}
function im({ props: e, name: t, defaultTheme: o, themeId: r }) {
  let i = qi(o);
  return (
    r && (i = i[r] || i),
    rm({
      theme: i,
      name: t,
      props: e,
    })
  );
}
function Yi(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function am(e) {
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
function Sn(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return Sn(am(e));
  const t = e.indexOf('('),
    o = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(o) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : mn(9, e),
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
          : mn(10, i),
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
function Ir(e) {
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
function sm(e) {
  e = Sn(e);
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
    Ir({
      type: l,
      values: c,
    })
  );
}
function hi(e) {
  e = Sn(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? Sn(sm(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function as(e, t) {
  const o = hi(e),
    r = hi(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function Ye(e, t) {
  return (
    (e = Sn(e)),
    (t = Yi(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    Ir(e)
  );
}
function Mr(e, t) {
  if (((e = Sn(e)), (t = Yi(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return Ir(e);
}
function _r(e, t) {
  if (((e = Sn(e)), (t = Yi(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return Ir(e);
}
function lm(e, t = 0.15) {
  return hi(e) > 0.5 ? Mr(e, t) : _r(e, t);
}
function cm(e, t) {
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
const ss = {
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
      paper: Oo.white,
      default: Oo.white,
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
      primary: Oo.white,
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
      active: Oo.white,
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
function ls(e, t, o, r) {
  const i = r.light || r,
    a = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = _r(e.main, i))
      : t === 'dark' && (e.dark = Mr(e.main, a)));
}
function um(e = 'light') {
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
function dm(e = 'light') {
  return e === 'dark'
    ? {
        main: Mn[200],
        light: Mn[50],
        dark: Mn[400],
      }
    : {
        main: Mn[500],
        light: Mn[300],
        dark: Mn[700],
      };
}
function pm(e = 'light') {
  return e === 'dark'
    ? {
        main: In[500],
        light: In[300],
        dark: In[700],
      }
    : {
        main: In[700],
        light: In[400],
        dark: In[800],
      };
}
function fm(e = 'light') {
  return e === 'dark'
    ? {
        main: An[400],
        light: An[300],
        dark: An[700],
      }
    : {
        main: An[700],
        light: An[500],
        dark: An[900],
      };
}
function mm(e = 'light') {
  return e === 'dark'
    ? {
        main: Dn[400],
        light: Dn[300],
        dark: Dn[700],
      }
    : {
        main: Dn[800],
        light: Dn[500],
        dark: Dn[900],
      };
}
function hm(e = 'light') {
  return e === 'dark'
    ? {
        main: ro[400],
        light: ro[300],
        dark: ro[700],
      }
    : {
        main: '#ed6c02',
        // closest to orange[800] that pass 3:1.
        light: ro[500],
        dark: ro[900],
      };
}
function bm(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2, ...i } = e,
    a = e.primary || um(t),
    s = e.secondary || dm(t),
    l = e.error || pm(t),
    c = e.info || fm(t),
    d = e.success || mm(t),
    u = e.warning || hm(t);
  function p(h) {
    const v = as(h, Qr.text.primary) >= o ? Qr.text.primary : ss.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const O = as(h, v);
      O < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${O}:1 for ${v} on ${h}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return v;
  }
  const m = ({
      color: h,
      name: v,
      mainShade: O = 500,
      lightShade: C = 300,
      darkShade: E = 700,
    }) => {
      if (
        ((h = {
          ...h,
        }),
        !h.main && h[O] && (h.main = h[O]),
        !h.hasOwnProperty('main'))
      )
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${v ? ` (${v})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${O}\` property.`
            : mn(11, v ? ` (${v})` : '', O),
        );
      if (typeof h.main != 'string')
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${v ? ` (${v})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`
            : mn(12, v ? ` (${v})` : '', JSON.stringify(h.main)),
        );
      return (
        ls(h, 'light', C, r), ls(h, 'dark', E, r), h.contrastText || (h.contrastText = p(h.main)), h
      );
    },
    y = {
      dark: Qr,
      light: ss,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (y[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    Mt(
      {
        // A collection of common colors.
        common: {
          ...Oo,
        },
        // prevent mutable object.
        // The palette mode, can be light or dark.
        mode: t,
        // The colors used to represent primary interface elements for a user.
        primary: m({
          color: a,
          name: 'primary',
        }),
        // The colors used to represent secondary interface elements for a user.
        secondary: m({
          color: s,
          name: 'secondary',
          mainShade: 'A400',
          lightShade: 'A200',
          darkShade: 'A700',
        }),
        // The colors used to represent interface elements that the user should be made aware of.
        error: m({
          color: l,
          name: 'error',
        }),
        // The colors used to represent potentially dangerous actions or important messages.
        warning: m({
          color: u,
          name: 'warning',
        }),
        // The colors used to present information to the user that is neutral and not necessarily important.
        info: m({
          color: c,
          name: 'info',
        }),
        // The colors used to indicate the successful completion of an action that user triggered.
        success: m({
          color: d,
          name: 'success',
        }),
        // The grey colors.
        grey: Yu,
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: o,
        // Takes a background color and returns the text color that maximizes the contrast.
        getContrastText: p,
        // Generate a rich color object.
        augmentColor: m,
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
function vm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const cs = {
    textTransform: 'uppercase',
  },
  us = '"Roboto", "Helvetica", "Arial", sans-serif';
function gm(e, t) {
  const {
    fontFamily: o = us,
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
  const m = r / 14,
    y = u || ((v) => `${(v / c) * m}rem`),
    g = (v, O, C, E, x) => ({
      fontFamily: o,
      fontWeight: v,
      fontSize: y(O),
      // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
      lineHeight: C,
      // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
      // across font-families can cause issues with the kerning.
      ...(o === us
        ? {
            letterSpacing: `${vm(E / O)}em`,
          }
        : {}),
      ...x,
      ...d,
    }),
    h = {
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
      button: g(s, 14, 1.75, 0.4, cs),
      caption: g(a, 12, 1.66, 0.4),
      overline: g(a, 12, 2.66, 1, cs),
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
      ...h,
    },
    p,
    {
      clone: !1,
      // No need to clone deep
    },
  );
}
const ym = 0.2,
  xm = 0.14,
  Em = 0.12;
function et(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ym})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${xm})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Em})`,
  ].join(',');
}
const Om = [
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
  Tm = Om,
  Cm = {
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
  Rm = {
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
function ds(e) {
  return `${Math.round(e)}ms`;
}
function Sm(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function wm(e) {
  const t = {
      ...Cm,
      ...e.easing,
    },
    o = {
      ...Rm,
      ...e.duration,
    };
  return {
    getAutoHeightDuration: Sm,
    create: (i = ['all'], a = {}) => {
      const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0, ...d } = a;
      if (process.env.NODE_ENV !== 'production') {
        const u = (m) => typeof m == 'string',
          p = (m) => !isNaN(parseFloat(m));
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
            `${u} ${typeof s == 'string' ? s : ds(s)} ${l} ${typeof c == 'string' ? c : ds(c)}`,
        )
        .join(',');
    },
    ...e,
    easing: t,
    duration: o,
  };
}
const $m = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  km = $m;
function Nm(e = {}, ...t) {
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
        : mn(18),
    );
  const u = bm(a),
    p = Hi(e);
  let m = Mt(p, {
    mixins: cm(p.breakpoints, r),
    palette: u,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Tm.slice(),
    typography: gm(u, l),
    transitions: wm(s),
    zIndex: {
      ...km,
    },
  });
  if (
    ((m = Mt(m, d)), (m = t.reduce((y, g) => Mt(y, g), m)), process.env.NODE_ENV !== 'production')
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
      g = (h, v) => {
        let O;
        for (O in h) {
          const C = h[O];
          if (y.indexOf(O) !== -1 && Object.keys(C).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const E = ke('', O);
              console.error(
                [
                  `MUI: The \`${v}\` component increases the CSS specificity of the \`${O}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(h, null, 2),
                  '',
                  `Instead, you need to use the '&.${E}' syntax:`,
                  JSON.stringify(
                    {
                      root: {
                        [`&.${E}`]: C,
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
            h[O] = {};
          }
        }
      };
    Object.keys(m.components).forEach((h) => {
      const v = m.components[h].styleOverrides;
      v && h.indexOf('Mui') === 0 && g(v, h);
    });
  }
  return (
    (m.unstable_sxConfig = {
      ...Pr,
      ...(d == null ? void 0 : d.unstable_sxConfig),
    }),
    (m.unstable_sx = function (g) {
      return Wi({
        sx: g,
        theme: this,
      });
    }),
    m
  );
}
const Pm = Nm(),
  Ar = Pm;
function cn() {
  const e = qi(Ar);
  return process.env.NODE_ENV !== 'production' && b.useDebugValue(e), e[hr] || e;
}
function Me({ props: e, name: t }) {
  return im({
    props: e,
    name: t,
    defaultTheme: Ar,
    themeId: hr,
  });
}
const Lt = (e) => bo(e) && e !== 'classes',
  Ki = bo,
  Im = om({
    themeId: hr,
    defaultTheme: Ar,
    rootShouldForwardProp: Lt,
  }),
  le = Im,
  Mm = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  ps = Mm;
function fn(e) {
  return typeof e == 'string';
}
function _m(e, t, o) {
  return e === void 0 || fn(e)
    ? t
    : {
        ...t,
        ownerState: {
          ...t.ownerState,
          ...o,
        },
      };
}
function Am(e, t, o = (r, i) => r === i) {
  return e.length === t.length && e.every((r, i) => o(r, t[i]));
}
const Dm = {
    disableDefaultClasses: !1,
  },
  jm = /* @__PURE__ */ b.createContext(Dm);
function Yl(e) {
  const { disableDefaultClasses: t } = b.useContext(jm);
  return (o) => (t ? '' : e(o));
}
function Kl(e, t = []) {
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
function bi(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function fs(e) {
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
    externalForwardedProps: i,
    className: a,
  } = e;
  if (!t) {
    const y = be(
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
      h = {
        ...o,
        ...i,
        ...r,
      };
    return (
      y.length > 0 && (h.className = y),
      Object.keys(g).length > 0 && (h.style = g),
      {
        props: h,
        internalRef: void 0,
      }
    );
  }
  const s = Kl({
      ...i,
      ...r,
    }),
    l = fs(r),
    c = fs(i),
    d = t(s),
    u = be(
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
    m = {
      ...d,
      ...o,
      ...c,
      ...l,
    };
  return (
    u.length > 0 && (m.className = u),
    Object.keys(p).length > 0 && (m.style = p),
    {
      props: m,
      internalRef: d.ref,
    }
  );
}
function Pt(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: i, ...a } = e,
    s = bi(r, i),
    { props: l, internalRef: c } = Lm({
      ...a,
      externalSlotProps: s,
    }),
    d = rt(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return _m(
    o,
    {
      ...l,
      ref: d,
    },
    i,
  );
}
function ms(e) {
  return e.substring(2).toLowerCase();
}
function Fm(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function ir(e) {
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
      const h = d.current;
      d.current = !1;
      const v = ot(l.current);
      if (!c.current || !l.current || ('clientX' in g && Fm(g, v))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let O;
      g.composedPath
        ? (O = g.composedPath().indexOf(l.current) > -1)
        : (O =
            !v.documentElement.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              g.target,
            ) ||
            l.current.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              g.target,
            )),
        !O && (o || !h) && i(g);
    }),
    m = (g) => (h) => {
      d.current = !0;
      const v = t.props[g];
      v && v(h);
    },
    y = {
      ref: u,
    };
  return (
    a !== !1 && (y[a] = m(a)),
    b.useEffect(() => {
      if (a !== !1) {
        const g = ms(a),
          h = ot(l.current),
          v = () => {
            s.current = !0;
          };
        return (
          h.addEventListener(g, p),
          h.addEventListener('touchmove', v),
          () => {
            h.removeEventListener(g, p), h.removeEventListener('touchmove', v);
          }
        );
      }
    }, [p, a]),
    r !== !1 && (y[r] = m(r)),
    b.useEffect(() => {
      if (r !== !1) {
        const g = ms(r),
          h = ot(l.current);
        return (
          h.addEventListener(g, p),
          () => {
            h.removeEventListener(g, p);
          }
        );
      }
    }, [p, r]),
    /* @__PURE__ */ N(b.Fragment, {
      children: /* @__PURE__ */ b.cloneElement(t, y),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (ir.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * The wrapped element.
     */
    children: $n.isRequired,
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
process.env.NODE_ENV !== 'production' && (ir['propTypes'] = Ni(ir.propTypes));
const zm = [
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
function Bm(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function Vm(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function Um(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || Vm(e));
}
function Wm(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(zm)).forEach((r, i) => {
      const a = Bm(r);
      a === -1 ||
        !Um(r) ||
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
function Hm() {
  return !0;
}
function ar(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: i = !1,
      getTabbable: a = Wm,
      isEnabled: s = Hm,
      open: l,
    } = e,
    c = b.useRef(!1),
    d = b.useRef(null),
    u = b.useRef(null),
    p = b.useRef(null),
    m = b.useRef(null),
    y = b.useRef(!1),
    g = b.useRef(null),
    h = rt(t.ref, g),
    v = b.useRef(null);
  b.useEffect(() => {
    !l || !g.current || (y.current = !o);
  }, [o, l]),
    b.useEffect(() => {
      if (!l || !g.current) return;
      const E = ot(g.current);
      return (
        g.current.contains(E.activeElement) ||
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
      const E = ot(g.current),
        x = (R) => {
          const { current: A } = g;
          if (A !== null) {
            if (!E.hasFocus() || r || !s() || c.current) {
              c.current = !1;
              return;
            }
            if (!A.contains(E.activeElement)) {
              if ((R && m.current !== R.target) || E.activeElement !== m.current) m.current = null;
              else if (m.current !== null) return;
              if (!y.current) return;
              let I = [];
              if (
                ((E.activeElement === d.current || E.activeElement === u.current) &&
                  (I = a(g.current)),
                I.length > 0)
              ) {
                var j, w;
                const G = !!(
                    (j = v.current) != null &&
                    j.shiftKey &&
                    ((w = v.current) == null ? void 0 : w.key) === 'Tab'
                  ),
                  z = I[0],
                  _ = I[I.length - 1];
                typeof z != 'string' && typeof _ != 'string' && (G ? _.focus() : z.focus());
              } else A.focus();
            }
          }
        },
        f = (R) => {
          (v.current = R),
            !(r || !s() || R.key !== 'Tab') &&
              E.activeElement === g.current &&
              R.shiftKey &&
              ((c.current = !0), u.current && u.current.focus());
        };
      E.addEventListener('focusin', x), E.addEventListener('keydown', f, !0);
      const S = setInterval(() => {
        E.activeElement && E.activeElement.tagName === 'BODY' && x(null);
      }, 50);
      return () => {
        clearInterval(S),
          E.removeEventListener('focusin', x),
          E.removeEventListener('keydown', f, !0);
      };
    }, [o, r, i, s, l, a]);
  const O = (E) => {
      p.current === null && (p.current = E.relatedTarget), (y.current = !0), (m.current = E.target);
      const x = t.props.onFocus;
      x && x(E);
    },
    C = (E) => {
      p.current === null && (p.current = E.relatedTarget), (y.current = !0);
    };
  return /* @__PURE__ */ Ke(b.Fragment, {
    children: [
      /* @__PURE__ */ N('div', {
        tabIndex: l ? 0 : -1,
        onFocus: C,
        ref: d,
        'data-testid': 'sentinelStart',
      }),
      /* @__PURE__ */ b.cloneElement(t, {
        ref: h,
        onFocus: O,
      }),
      /* @__PURE__ */ N('div', {
        tabIndex: l ? 0 : -1,
        onFocus: C,
        ref: u,
        'data-testid': 'sentinelEnd',
      }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (ar.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: $n,
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
process.env.NODE_ENV !== 'production' && (ar['propTypes'] = Ni(ar.propTypes));
var bt = 'top',
  Dt = 'bottom',
  jt = 'right',
  vt = 'left',
  Dr = 'auto',
  Mo = [bt, Dt, jt, vt],
  qn = 'start',
  wo = 'end',
  qm = 'clippingParents',
  Gl = 'viewport',
  so = 'popper',
  Ym = 'reference',
  hs = /* @__PURE__ */ Mo.reduce(function (e, t) {
    return e.concat([t + '-' + qn, t + '-' + wo]);
  }, []),
  Xl = /* @__PURE__ */ [].concat(Mo, [Dr]).reduce(function (e, t) {
    return e.concat([t, t + '-' + qn, t + '-' + wo]);
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
  gi = [Km, Gm, Xm, Jm, Zm, Qm, eh, th, nh];
function on(e) {
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
function wn(e) {
  var t = Nt(e).Element;
  return e instanceof t || e instanceof Element;
}
function kt(e) {
  var t = Nt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Gi(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Nt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function oh(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      i = t.attributes[o] || {},
      a = t.elements[o];
    !kt(a) ||
      !on(a) ||
      (Object.assign(a.style, r),
      Object.keys(i).forEach(function (s) {
        var l = i[s];
        l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function rh(e) {
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
          !on(i) ||
          (Object.assign(i.style, l),
          Object.keys(a).forEach(function (c) {
            i.removeAttribute(c);
          }));
      });
    }
  );
}
const ih = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: oh,
  effect: rh,
  requires: ['computeStyles'],
};
function Wt(e) {
  return e.split('-')[0];
}
var Rn = Math.max,
  sr = Math.min,
  Yn = Math.round;
function yi() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function Jl() {
  return !/^((?!chrome|android).)*safari/i.test(yi());
}
function Kn(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    i = 1,
    a = 1;
  t &&
    kt(e) &&
    ((i = (e.offsetWidth > 0 && Yn(r.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && Yn(r.height) / e.offsetHeight) || 1));
  var s = wn(e) ? Nt(e) : window,
    l = s.visualViewport,
    c = !Jl() && o,
    d = (r.left + (c && l ? l.offsetLeft : 0)) / i,
    u = (r.top + (c && l ? l.offsetTop : 0)) / a,
    p = r.width / i,
    m = r.height / a;
  return {
    width: p,
    height: m,
    top: u,
    right: d + p,
    bottom: u + m,
    left: d,
    x: d,
    y: u,
  };
}
function Xi(e) {
  var t = Kn(e),
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
function Zl(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && Gi(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function qt(e) {
  return Nt(e).getComputedStyle(e);
}
function ah(e) {
  return ['table', 'td', 'th'].indexOf(on(e)) >= 0;
}
function bn(e) {
  return (
    (wn(e)
      ? e.ownerDocument
      : // $FlowFixMe[prop-missing]
        e.document) || window.document
  ).documentElement;
}
function jr(e) {
  return on(e) === 'html'
    ? e
    : // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        e.parentNode || // DOM Element detected
        (Gi(e) ? e.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        bn(e);
}
function bs(e) {
  return !kt(e) || // https://github.com/popperjs/popper-core/issues/837
    qt(e).position === 'fixed'
    ? null
    : e.offsetParent;
}
function sh(e) {
  var t = /firefox/i.test(yi()),
    o = /Trident/i.test(yi());
  if (o && kt(e)) {
    var r = qt(e);
    if (r.position === 'fixed') return null;
  }
  var i = jr(e);
  for (Gi(i) && (i = i.host); kt(i) && ['html', 'body'].indexOf(on(i)) < 0; ) {
    var a = qt(i);
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
function _o(e) {
  for (var t = Nt(e), o = bs(e); o && ah(o) && qt(o).position === 'static'; ) o = bs(o);
  return o && (on(o) === 'html' || (on(o) === 'body' && qt(o).position === 'static'))
    ? t
    : o || sh(e) || t;
}
function Ji(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function vo(e, t, o) {
  return Rn(e, sr(t, o));
}
function lh(e, t, o) {
  var r = vo(e, t, o);
  return r > o ? o : r;
}
function Ql() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
function ec(e) {
  return Object.assign({}, Ql(), e);
}
function tc(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var ch = function (t, o) {
  return (
    (t =
      typeof t == 'function'
        ? t(
            Object.assign({}, o.rects, {
              placement: o.placement,
            }),
          )
        : t),
    ec(typeof t != 'number' ? t : tc(t, Mo))
  );
};
function uh(e) {
  var t,
    o = e.state,
    r = e.name,
    i = e.options,
    a = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = Wt(o.placement),
    c = Ji(l),
    d = [vt, jt].indexOf(l) >= 0,
    u = d ? 'height' : 'width';
  if (!(!a || !s)) {
    var p = ch(i.padding, o),
      m = Xi(a),
      y = c === 'y' ? bt : vt,
      g = c === 'y' ? Dt : jt,
      h = o.rects.reference[u] + o.rects.reference[c] - s[c] - o.rects.popper[u],
      v = s[c] - o.rects.reference[c],
      O = _o(a),
      C = O ? (c === 'y' ? O.clientHeight || 0 : O.clientWidth || 0) : 0,
      E = h / 2 - v / 2,
      x = p[y],
      f = C - m[u] - p[g],
      S = C / 2 - m[u] / 2 + E,
      R = vo(x, S, f),
      A = c;
    o.modifiersData[r] = ((t = {}), (t[A] = R), (t.centerOffset = R - S), t);
  }
}
function dh(e) {
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
      !Zl(t.elements.popper, i))
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
const ph = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: uh,
  effect: dh,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function Gn(e) {
  return e.split('-')[1];
}
var fh = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
};
function mh(e, t) {
  var o = e.x,
    r = e.y,
    i = t.devicePixelRatio || 1;
  return {
    x: Yn(o * i) / i || 0,
    y: Yn(r * i) / i || 0,
  };
}
function vs(e) {
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
    m = s.x,
    y = m === void 0 ? 0 : m,
    g = s.y,
    h = g === void 0 ? 0 : g,
    v =
      typeof u == 'function'
        ? u({
            x: y,
            y: h,
          })
        : {
            x: y,
            y: h,
          };
  (y = v.x), (h = v.y);
  var O = s.hasOwnProperty('x'),
    C = s.hasOwnProperty('y'),
    E = vt,
    x = bt,
    f = window;
  if (d) {
    var S = _o(o),
      R = 'clientHeight',
      A = 'clientWidth';
    if (
      (S === Nt(o) &&
        ((S = bn(o)),
        qt(S).position !== 'static' &&
          l === 'absolute' &&
          ((R = 'scrollHeight'), (A = 'scrollWidth'))),
      (S = S),
      i === bt || ((i === vt || i === jt) && a === wo))
    ) {
      x = Dt;
      var j =
        p && S === f && f.visualViewport
          ? f.visualViewport.height
          : // $FlowFixMe[prop-missing]
            S[R];
      (h -= j - r.height), (h *= c ? 1 : -1);
    }
    if (i === vt || ((i === bt || i === Dt) && a === wo)) {
      E = jt;
      var w =
        p && S === f && f.visualViewport
          ? f.visualViewport.width
          : // $FlowFixMe[prop-missing]
            S[A];
      (y -= w - r.width), (y *= c ? 1 : -1);
    }
  }
  var I = Object.assign(
      {
        position: l,
      },
      d && fh,
    ),
    G =
      u === !0
        ? mh(
            {
              x: y,
              y: h,
            },
            Nt(o),
          )
        : {
            x: y,
            y: h,
          };
  if (((y = G.x), (h = G.y), c)) {
    var z;
    return Object.assign(
      {},
      I,
      ((z = {}),
      (z[x] = C ? '0' : ''),
      (z[E] = O ? '0' : ''),
      (z.transform =
        (f.devicePixelRatio || 1) <= 1
          ? 'translate(' + y + 'px, ' + h + 'px)'
          : 'translate3d(' + y + 'px, ' + h + 'px, 0)'),
      z),
    );
  }
  return Object.assign(
    {},
    I,
    ((t = {}), (t[x] = C ? h + 'px' : ''), (t[E] = O ? y + 'px' : ''), (t.transform = ''), t),
  );
}
function hh(e) {
  var t = e.state,
    o = e.options,
    r = o.gpuAcceleration,
    i = r === void 0 ? !0 : r,
    a = o.adaptive,
    s = a === void 0 ? !0 : a,
    l = o.roundOffsets,
    c = l === void 0 ? !0 : l;
  if (process.env.NODE_ENV !== 'production') {
    var d = qt(t.elements.popper).transitionProperty || '';
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
    placement: Wt(t.placement),
    variation: Gn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      vs(
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
        vs(
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
const bh = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: hh,
  data: {},
};
var Lo = {
  passive: !0,
};
function vh(e) {
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
        u.addEventListener('scroll', o.update, Lo);
      }),
    l && c.addEventListener('resize', o.update, Lo),
    function () {
      a &&
        d.forEach(function (u) {
          u.removeEventListener('scroll', o.update, Lo);
        }),
        l && c.removeEventListener('resize', o.update, Lo);
    }
  );
}
const gh = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: vh,
  data: {},
};
var yh = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
function Zo(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return yh[t];
  });
}
var xh = {
  start: 'end',
  end: 'start',
};
function gs(e) {
  return e.replace(/start|end/g, function (t) {
    return xh[t];
  });
}
function Zi(e) {
  var t = Nt(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r,
  };
}
function Qi(e) {
  return Kn(bn(e)).left + Zi(e).scrollLeft;
}
function Eh(e, t) {
  var o = Nt(e),
    r = bn(e),
    i = o.visualViewport,
    a = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (i) {
    (a = i.width), (s = i.height);
    var d = Jl();
    (d || (!d && t === 'fixed')) && ((l = i.offsetLeft), (c = i.offsetTop));
  }
  return {
    width: a,
    height: s,
    x: l + Qi(e),
    y: c,
  };
}
function Oh(e) {
  var t,
    o = bn(e),
    r = Zi(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = Rn(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
    s = Rn(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
    l = -r.scrollLeft + Qi(e),
    c = -r.scrollTop;
  return (
    qt(i || o).direction === 'rtl' && (l += Rn(o.clientWidth, i ? i.clientWidth : 0) - a),
    {
      width: a,
      height: s,
      x: l,
      y: c,
    }
  );
}
function ea(e) {
  var t = qt(e),
    o = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function nc(e) {
  return ['html', 'body', '#document'].indexOf(on(e)) >= 0
    ? e.ownerDocument.body
    : kt(e) && ea(e)
    ? e
    : nc(jr(e));
}
function go(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = nc(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    a = Nt(r),
    s = i ? [a].concat(a.visualViewport || [], ea(r) ? r : []) : r,
    l = t.concat(s);
  return i
    ? l
    : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(go(jr(s)));
}
function xi(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Th(e, t) {
  var o = Kn(e, !1, t === 'fixed');
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
function ys(e, t, o) {
  return t === Gl ? xi(Eh(e, o)) : wn(t) ? Th(t, o) : xi(Oh(bn(e)));
}
function Ch(e) {
  var t = go(jr(e)),
    o = ['absolute', 'fixed'].indexOf(qt(e).position) >= 0,
    r = o && kt(e) ? _o(e) : e;
  return wn(r)
    ? t.filter(function (i) {
        return wn(i) && Zl(i, r) && on(i) !== 'body';
      })
    : [];
}
function Rh(e, t, o, r) {
  var i = t === 'clippingParents' ? Ch(e) : [].concat(t),
    a = [].concat(i, [o]),
    s = a[0],
    l = a.reduce(function (c, d) {
      var u = ys(e, d, r);
      return (
        (c.top = Rn(u.top, c.top)),
        (c.right = sr(u.right, c.right)),
        (c.bottom = sr(u.bottom, c.bottom)),
        (c.left = Rn(u.left, c.left)),
        c
      );
    }, ys(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function oc(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    i = r ? Wt(r) : null,
    a = r ? Gn(r) : null,
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
    case Dt:
      c = {
        x: s,
        y: t.y + t.height,
      };
      break;
    case jt:
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
  var d = i ? Ji(i) : null;
  if (d != null) {
    var u = d === 'y' ? 'height' : 'width';
    switch (a) {
      case qn:
        c[d] = c[d] - (t[u] / 2 - o[u] / 2);
        break;
      case wo:
        c[d] = c[d] + (t[u] / 2 - o[u] / 2);
        break;
    }
  }
  return c;
}
function $o(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = r === void 0 ? e.placement : r,
    a = o.strategy,
    s = a === void 0 ? e.strategy : a,
    l = o.boundary,
    c = l === void 0 ? qm : l,
    d = o.rootBoundary,
    u = d === void 0 ? Gl : d,
    p = o.elementContext,
    m = p === void 0 ? so : p,
    y = o.altBoundary,
    g = y === void 0 ? !1 : y,
    h = o.padding,
    v = h === void 0 ? 0 : h,
    O = ec(typeof v != 'number' ? v : tc(v, Mo)),
    C = m === so ? Ym : so,
    E = e.rects.popper,
    x = e.elements[g ? C : m],
    f = Rh(wn(x) ? x : x.contextElement || bn(e.elements.popper), c, u, s),
    S = Kn(e.elements.reference),
    R = oc({
      reference: S,
      element: E,
      strategy: 'absolute',
      placement: i,
    }),
    A = xi(Object.assign({}, E, R)),
    j = m === so ? A : S,
    w = {
      top: f.top - j.top + O.top,
      bottom: j.bottom - f.bottom + O.bottom,
      left: f.left - j.left + O.left,
      right: j.right - f.right + O.right,
    },
    I = e.modifiersData.offset;
  if (m === so && I) {
    var G = I[i];
    Object.keys(w).forEach(function (z) {
      var _ = [jt, Dt].indexOf(z) >= 0 ? 1 : -1,
        D = [bt, Dt].indexOf(z) >= 0 ? 'y' : 'x';
      w[z] += G[D] * _;
    });
  }
  return w;
}
function Sh(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = o.boundary,
    a = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    d = c === void 0 ? Xl : c,
    u = Gn(r),
    p = u
      ? l
        ? hs
        : hs.filter(function (g) {
            return Gn(g) === u;
          })
      : Mo,
    m = p.filter(function (g) {
      return d.indexOf(g) >= 0;
    });
  m.length === 0 &&
    ((m = p),
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
  var y = m.reduce(function (g, h) {
    return (
      (g[h] = $o(e, {
        placement: h,
        boundary: i,
        rootBoundary: a,
        padding: s,
      })[Wt(h)]),
      g
    );
  }, {});
  return Object.keys(y).sort(function (g, h) {
    return y[g] - y[h];
  });
}
function wh(e) {
  if (Wt(e) === Dr) return [];
  var t = Zo(e);
  return [gs(e), t, gs(t)];
}
function $h(e) {
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
        m = o.altBoundary,
        y = o.flipVariations,
        g = y === void 0 ? !0 : y,
        h = o.allowedAutoPlacements,
        v = t.options.placement,
        O = Wt(v),
        C = O === v,
        E = c || (C || !g ? [Zo(v)] : wh(v)),
        x = [v].concat(E).reduce(function (Y, X) {
          return Y.concat(
            Wt(X) === Dr
              ? Sh(t, {
                  placement: X,
                  boundary: u,
                  rootBoundary: p,
                  padding: d,
                  flipVariations: g,
                  allowedAutoPlacements: h,
                })
              : X,
          );
        }, []),
        f = t.rects.reference,
        S = t.rects.popper,
        R = /* @__PURE__ */ new Map(),
        A = !0,
        j = x[0],
        w = 0;
      w < x.length;
      w++
    ) {
      var I = x[w],
        G = Wt(I),
        z = Gn(I) === qn,
        _ = [bt, Dt].indexOf(G) >= 0,
        D = _ ? 'width' : 'height',
        W = $o(t, {
          placement: I,
          boundary: u,
          rootBoundary: p,
          altBoundary: m,
          padding: d,
        }),
        re = _ ? (z ? jt : vt) : z ? Dt : bt;
      f[D] > S[D] && (re = Zo(re));
      var L = Zo(re),
        F = [];
      if (
        (a && F.push(W[G] <= 0),
        l && F.push(W[re] <= 0, W[L] <= 0),
        F.every(function (Y) {
          return Y;
        }))
      ) {
        (j = I), (A = !1);
        break;
      }
      R.set(I, F);
    }
    if (A)
      for (
        var $ = g ? 3 : 1,
          B = function (X) {
            var ie = x.find(function (ee) {
              var ae = R.get(ee);
              if (ae)
                return ae.slice(0, X).every(function (ue) {
                  return ue;
                });
            });
            if (ie) return (j = ie), 'break';
          },
          Z = $;
        Z > 0;
        Z--
      ) {
        var U = B(Z);
        if (U === 'break') break;
      }
    t.placement !== j && ((t.modifiersData[r]._skip = !0), (t.placement = j), (t.reset = !0));
  }
}
const kh = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: $h,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1,
  },
};
function xs(e, t, o) {
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
function Es(e) {
  return [bt, jt, Dt, vt].some(function (t) {
    return e[t] >= 0;
  });
}
function Nh(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = $o(t, {
      elementContext: 'reference',
    }),
    l = $o(t, {
      altBoundary: !0,
    }),
    c = xs(s, r),
    d = xs(l, i, a),
    u = Es(c),
    p = Es(d);
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
const Ph = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: Nh,
};
function Ih(e, t, o) {
  var r = Wt(e),
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
    [vt, jt].indexOf(r) >= 0
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
function Mh(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.offset,
    a = i === void 0 ? [0, 0] : i,
    s = Xl.reduce(function (u, p) {
      return (u[p] = Ih(p, t.rects, a)), u;
    }, {}),
    l = s[t.placement],
    c = l.x,
    d = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += d)),
    (t.modifiersData[r] = s);
}
const _h = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: Mh,
};
function Ah(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = oc({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const Dh = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: Ah,
  data: {},
};
function jh(e) {
  return e === 'x' ? 'y' : 'x';
}
function Lh(e) {
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
    m = o.tether,
    y = m === void 0 ? !0 : m,
    g = o.tetherOffset,
    h = g === void 0 ? 0 : g,
    v = $o(t, {
      boundary: c,
      rootBoundary: d,
      padding: p,
      altBoundary: u,
    }),
    O = Wt(t.placement),
    C = Gn(t.placement),
    E = !C,
    x = Ji(O),
    f = jh(x),
    S = t.modifiersData.popperOffsets,
    R = t.rects.reference,
    A = t.rects.popper,
    j =
      typeof h == 'function'
        ? h(
            Object.assign({}, t.rects, {
              placement: t.placement,
            }),
          )
        : h,
    w =
      typeof j == 'number'
        ? {
            mainAxis: j,
            altAxis: j,
          }
        : Object.assign(
            {
              mainAxis: 0,
              altAxis: 0,
            },
            j,
          ),
    I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    G = {
      x: 0,
      y: 0,
    };
  if (S) {
    if (a) {
      var z,
        _ = x === 'y' ? bt : vt,
        D = x === 'y' ? Dt : jt,
        W = x === 'y' ? 'height' : 'width',
        re = S[x],
        L = re + v[_],
        F = re - v[D],
        $ = y ? -A[W] / 2 : 0,
        B = C === qn ? R[W] : A[W],
        Z = C === qn ? -A[W] : -R[W],
        U = t.elements.arrow,
        Y =
          y && U
            ? Xi(U)
            : {
                width: 0,
                height: 0,
              },
        X = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : Ql(),
        ie = X[_],
        ee = X[D],
        ae = vo(0, R[W], Y[W]),
        ue = E ? R[W] / 2 - $ - ae - ie - w.mainAxis : B - ae - ie - w.mainAxis,
        de = E ? -R[W] / 2 + $ + ae + ee + w.mainAxis : Z + ae + ee + w.mainAxis,
        me = t.elements.arrow && _o(t.elements.arrow),
        M = me ? (x === 'y' ? me.clientTop || 0 : me.clientLeft || 0) : 0,
        Te = (z = I == null ? void 0 : I[x]) != null ? z : 0,
        Q = re + ue - Te - M,
        q = re + de - Te,
        Ce = vo(y ? sr(L, Q) : L, re, y ? Rn(F, q) : F);
      (S[x] = Ce), (G[x] = Ce - re);
    }
    if (l) {
      var pe,
        Ne = x === 'x' ? bt : vt,
        Le = x === 'x' ? Dt : jt,
        Je = S[f],
        Xe = f === 'y' ? 'height' : 'width',
        Fe = Je + v[Ne],
        Ze = Je - v[Le],
        te = [bt, vt].indexOf(O) !== -1,
        ne = (pe = I == null ? void 0 : I[f]) != null ? pe : 0,
        xe = te ? Fe : Je - R[Xe] - A[Xe] - ne + w.altAxis,
        he = te ? Je + R[Xe] + A[Xe] - ne - w.altAxis : Ze,
        Ee = y && te ? lh(xe, Je, he) : vo(y ? xe : Fe, Je, y ? he : Ze);
      (S[f] = Ee), (G[f] = Ee - Je);
    }
    t.modifiersData[r] = G;
  }
}
const Fh = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: Lh,
  requiresIfExists: ['offset'],
};
function zh(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop,
  };
}
function Bh(e) {
  return e === Nt(e) || !kt(e) ? Zi(e) : zh(e);
}
function Vh(e) {
  var t = e.getBoundingClientRect(),
    o = Yn(t.width) / e.offsetWidth || 1,
    r = Yn(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function Uh(e, t, o) {
  o === void 0 && (o = !1);
  var r = kt(t),
    i = kt(t) && Vh(t),
    a = bn(t),
    s = Kn(e, i, o),
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
      ((on(t) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        ea(a)) &&
        (l = Bh(t)),
      kt(t) ? ((c = Kn(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : a && (c.x = Qi(a))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function Wh(e) {
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
function Hh(e) {
  var t = Wh(e);
  return gi.reduce(function (o, r) {
    return o.concat(
      t.filter(function (i) {
        return i.phase === r;
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
function dn(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    o[r - 1] = arguments[r];
  return [].concat(o).reduce(function (i, a) {
    return i.replace(/%s/, a);
  }, e);
}
var yn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  Yh = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  Os = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function Kh(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), Os)
      .filter(function (o, r, i) {
        return i.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                dn(yn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                dn(yn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            gi.indexOf(t.phase) < 0 &&
              console.error(
                dn(yn, t.name, '"phase"', 'either ' + gi.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(dn(yn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(dn(yn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                dn(yn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                dn(
                  yn,
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
                Os.map(function (r) {
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
            }) == null && console.error(dn(Yh, String(t.name), r, r));
          });
      });
  });
}
function Gh(e, t) {
  var o = /* @__PURE__ */ new Set();
  return e.filter(function (r) {
    var i = t(r);
    if (!o.has(i)) return o.add(i), !0;
  });
}
function Xh(e) {
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
var Ts =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Jh =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  Cs = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute',
  };
function Rs() {
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
    i = t.defaultOptions,
    a = i === void 0 ? Cs : i;
  return function (l, c, d) {
    d === void 0 && (d = a);
    var u = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, Cs, a),
        modifiersData: {},
        elements: {
          reference: l,
          popper: c,
        },
        attributes: {},
        styles: {},
      },
      p = [],
      m = !1,
      y = {
        state: u,
        setOptions: function (O) {
          var C = typeof O == 'function' ? O(u.options) : O;
          h(),
            (u.options = Object.assign({}, a, u.options, C)),
            (u.scrollParents = {
              reference: wn(l) ? go(l) : l.contextElement ? go(l.contextElement) : [],
              popper: go(c),
            });
          var E = Hh(Xh([].concat(r, u.options.modifiers)));
          if (
            ((u.orderedModifiers = E.filter(function (I) {
              return I.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var x = Gh([].concat(E, u.options.modifiers), function (I) {
              var G = I.name;
              return G;
            });
            if ((Kh(x), Wt(u.options.placement) === Dr)) {
              var f = u.orderedModifiers.find(function (I) {
                var G = I.name;
                return G === 'flip';
              });
              f ||
                console.error(
                  [
                    'Popper: "auto" placements require the "flip" modifier be',
                    'present and enabled to work.',
                  ].join(' '),
                );
            }
            var S = qt(c),
              R = S.marginTop,
              A = S.marginRight,
              j = S.marginBottom,
              w = S.marginLeft;
            [R, A, j, w].some(function (I) {
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
          if (!m) {
            var O = u.elements,
              C = O.reference,
              E = O.popper;
            if (!Rs(C, E)) {
              process.env.NODE_ENV !== 'production' && console.error(Ts);
              return;
            }
            (u.rects = {
              reference: Uh(C, _o(E), u.options.strategy === 'fixed'),
              popper: Xi(E),
            }),
              (u.reset = !1),
              (u.placement = u.options.placement),
              u.orderedModifiers.forEach(function (I) {
                return (u.modifiersData[I.name] = Object.assign({}, I.data));
              });
            for (var x = 0, f = 0; f < u.orderedModifiers.length; f++) {
              if (process.env.NODE_ENV !== 'production' && ((x += 1), x > 100)) {
                console.error(Jh);
                break;
              }
              if (u.reset === !0) {
                (u.reset = !1), (f = -1);
                continue;
              }
              var S = u.orderedModifiers[f],
                R = S.fn,
                A = S.options,
                j = A === void 0 ? {} : A,
                w = S.name;
              typeof R == 'function' &&
                (u =
                  R({
                    state: u,
                    options: j,
                    name: w,
                    instance: y,
                  }) || u);
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: qh(function () {
          return new Promise(function (v) {
            y.forceUpdate(), v(u);
          });
        }),
        destroy: function () {
          h(), (m = !0);
        },
      };
    if (!Rs(l, c)) return process.env.NODE_ENV !== 'production' && console.error(Ts), y;
    y.setOptions(d).then(function (v) {
      !m && d.onFirstUpdate && d.onFirstUpdate(v);
    });
    function g() {
      u.orderedModifiers.forEach(function (v) {
        var O = v.name,
          C = v.options,
          E = C === void 0 ? {} : C,
          x = v.effect;
        if (typeof x == 'function') {
          var f = x({
              state: u,
              name: O,
              instance: y,
              options: E,
            }),
            S = function () {};
          p.push(f || S);
        }
      });
    }
    function h() {
      p.forEach(function (v) {
        return v();
      }),
        (p = []);
    }
    return y;
  };
}
var Qh = [gh, Dh, bh, ih, _h, kh, Fh, ph, Ph],
  eb = /* @__PURE__ */ Zh({
    defaultModifiers: Qh,
  });
function tb(e) {
  return typeof e == 'function' ? e() : e;
}
const lr = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const { children: r, container: i, disablePortal: a = !1 } = t,
    [s, l] = b.useState(null),
    c = rt(/* @__PURE__ */ b.isValidElement(r) ? r.ref : null, o);
  if (
    (nn(() => {
      a || l(tb(i) || document.body);
    }, [i, a]),
    nn(() => {
      if (s && !a)
        return (
          er(o, s),
          () => {
            er(o, null);
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
    return /* @__PURE__ */ N(b.Fragment, {
      children: r,
    });
  }
  return /* @__PURE__ */ N(b.Fragment, {
    children: s && /* @__PURE__ */ pl.createPortal(r, s),
  });
});
process.env.NODE_ENV !== 'production' &&
  (lr.propTypes = {
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
    container: n.oneOfType([Ht, n.func]),
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (lr['propTypes'] = Ni(lr.propTypes));
const rc = lr;
function nb(e) {
  return ke('MuiPopper', e);
}
we('MuiPopper', ['root']);
function ob(e, t) {
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
function cr(e) {
  return typeof e == 'function' ? e() : e;
}
function Lr(e) {
  return e.nodeType !== void 0;
}
function rb(e) {
  return !Lr(e);
}
const ib = () =>
    Ie(
      {
        root: ['root'],
      },
      Yl(nb),
    ),
  ab = {},
  sb = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        popperRef: m,
        slotProps: y = {},
        slots: g = {},
        TransitionProps: h,
        // @ts-ignore internal logic
        ownerState: v,
        // prevent from spreading to DOM, it can come from the parent component e.g. Select.
        ...O
      } = t,
      C = b.useRef(null),
      E = rt(C, o),
      x = b.useRef(null),
      f = rt(x, m),
      S = b.useRef(f);
    nn(() => {
      S.current = f;
    }, [f]),
      b.useImperativeHandle(m, () => x.current, []);
    const R = ob(u, s),
      [A, j] = b.useState(R),
      [w, I] = b.useState(cr(i));
    b.useEffect(() => {
      x.current && x.current.forceUpdate();
    }),
      b.useEffect(() => {
        i && I(cr(i));
      }, [i]),
      nn(() => {
        if (!w || !d) return;
        const W = (F) => {
          j(F.placement);
        };
        if (process.env.NODE_ENV !== 'production' && w && Lr(w) && w.nodeType === 1) {
          const F = w.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            F.top === 0 &&
            F.left === 0 &&
            F.right === 0 &&
            F.bottom === 0 &&
            console.warn(
              [
                'MUI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join(`
`),
            );
        }
        let re = [
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
            fn: ({ state: F }) => {
              W(F);
            },
          },
        ];
        c != null && (re = re.concat(c)), p && p.modifiers != null && (re = re.concat(p.modifiers));
        const L = eb(w, C.current, {
          placement: R,
          ...p,
          modifiers: re,
        });
        return (
          S.current(L),
          () => {
            L.destroy(), S.current(null);
          }
        );
      }, [w, l, c, d, p, R]);
    const G = {
      placement: A,
    };
    h !== null && (G.TransitionProps = h);
    const z = ib(),
      _ = (r = g.root) != null ? r : 'div',
      D = Pt({
        elementType: _,
        externalSlotProps: y.root,
        externalForwardedProps: O,
        additionalProps: {
          role: 'tooltip',
          ref: E,
        },
        ownerState: t,
        className: z.root,
      });
    return /* @__PURE__ */ N(_, {
      ...D,
      children: typeof a == 'function' ? a(G) : a,
    });
  }),
  ic = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        popperOptions: m = ab,
        popperRef: y,
        style: g,
        transition: h = !1,
        slotProps: v = {},
        slots: O = {},
        ...C
      } = t,
      [E, x] = b.useState(!0),
      f = () => {
        x(!1);
      },
      S = () => {
        x(!0);
      };
    if (!c && !u && (!h || E)) return null;
    let R;
    if (a) R = a;
    else if (r) {
      const w = cr(r);
      R = w && Lr(w) ? ot(w).body : ot(null).body;
    }
    const A = !u && c && (!h || E) ? 'none' : void 0,
      j = h
        ? {
            in: u,
            onEnter: f,
            onExited: S,
          }
        : void 0;
    return /* @__PURE__ */ N(rc, {
      disablePortal: l,
      container: R,
      children: /* @__PURE__ */ N(sb, {
        anchorEl: r,
        direction: s,
        disablePortal: l,
        modifiers: d,
        ref: o,
        open: h ? !E : u,
        placement: p,
        popperOptions: m,
        popperRef: y,
        slotProps: v,
        slots: O,
        ...C,
        style: {
          // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
          position: 'fixed',
          // Fix Popper.js display issue
          top: 0,
          left: 0,
          display: A,
          ...g,
        },
        TransitionProps: j,
        children: i,
      }),
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
    anchorEl: _t(n.oneOfType([Ht, n.object, n.func]), (e) => {
      if (e.open) {
        const t = cr(e.anchorEl);
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
          (rb(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    container: n.oneOfType([Ht, n.func]),
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
const lb = ic;
function cb(e) {
  const t = ot(e);
  return t.body === e
    ? ln(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function yo(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function Ss(e) {
  return parseInt(ln(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function ub(e) {
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
function ws(e, t, o, r, i) {
  const a = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1,
      c = !ub(s);
    l && c && yo(s, i);
  });
}
function ei(e, t) {
  let o = -1;
  return e.some((r, i) => (t(r) ? ((o = i), !0) : !1)), o;
}
function db(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (cb(r)) {
      const s = El(ot(r));
      o.push({
        value: r.style.paddingRight,
        property: 'padding-right',
        el: r,
      }),
        (r.style.paddingRight = `${Ss(r) + s}px`);
      const l = ot(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({
          value: c.style.paddingRight,
          property: 'padding-right',
          el: c,
        }),
          (c.style.paddingRight = `${Ss(c) + s}px`);
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment) a = ot(r).body;
    else {
      const s = r.parentElement,
        l = ln(r);
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
function pb(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class fb {
  constructor() {
    (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && yo(t.modalRef, !1);
    const i = pb(o);
    ws(o, t.mount, t.modalRef, i, !0);
    const a = ei(this.containers, (s) => s.container === o);
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
    const r = ei(this.containers, (a) => a.modals.indexOf(t) !== -1),
      i = this.containers[r];
    i.restore || (i.restore = db(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const i = ei(this.containers, (s) => s.modals.indexOf(t) !== -1),
      a = this.containers[i];
    if ((a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0))
      a.restore && a.restore(),
        t.modalRef && yo(t.modalRef, o),
        ws(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1),
        this.containers.splice(i, 1);
    else {
      const s = a.modals[a.modals.length - 1];
      s.modalRef && yo(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function mb(e) {
  return ke('MuiModal', e);
}
we('MuiModal', ['root', 'hidden', 'backdrop']);
const hb = (e) => {
  const { open: t, exited: o } = e;
  return Ie(
    {
      root: ['root', !t && o && 'hidden'],
      backdrop: ['backdrop'],
    },
    Yl(mb),
  );
};
function bb(e) {
  return typeof e == 'function' ? e() : e;
}
function vb(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const gb = new fb(),
  ac = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i;
    const {
        children: a,
        closeAfterTransition: s = !1,
        container: l,
        disableAutoFocus: c = !1,
        disableEnforceFocus: d = !1,
        disableEscapeKeyDown: u = !1,
        disablePortal: p = !1,
        disableRestoreFocus: m = !1,
        disableScrollLock: y = !1,
        hideBackdrop: g = !1,
        keepMounted: h = !1,
        // private
        manager: v = gb,
        onBackdropClick: O,
        onClose: C,
        onKeyDown: E,
        open: x,
        onTransitionEnter: f,
        onTransitionExited: S,
        slotProps: R = {},
        slots: A = {},
        ...j
      } = t,
      w = v,
      [I, G] = b.useState(!x),
      z = b.useRef({}),
      _ = b.useRef(null),
      D = b.useRef(null),
      W = rt(D, o),
      re = vb(a),
      L = (r = t['aria-hidden']) != null ? r : !0,
      F = () => ot(_.current),
      $ = () => ((z.current.modalRef = D.current), (z.current.mountNode = _.current), z.current),
      B = () => {
        w.mount($(), {
          disableScrollLock: y,
        }),
          D.current && (D.current.scrollTop = 0);
      },
      Z = pt(() => {
        const pe = bb(l) || F().body;
        w.add($(), pe), D.current && B();
      }),
      U = b.useCallback(() => w.isTopModal($()), [w]),
      Y = pt((pe) => {
        (_.current = pe), !(!pe || !D.current) && (x && U() ? B() : yo(D.current, L));
      }),
      X = b.useCallback(() => {
        w.remove($(), L);
      }, [w, L]);
    b.useEffect(
      () => () => {
        X();
      },
      [X],
    ),
      b.useEffect(() => {
        x ? Z() : (!re || !s) && X();
      }, [x, X, re, s, Z]);
    const ie = {
        ...t,
        closeAfterTransition: s,
        disableAutoFocus: c,
        disableEnforceFocus: d,
        disableEscapeKeyDown: u,
        disablePortal: p,
        disableRestoreFocus: m,
        disableScrollLock: y,
        exited: I,
        hideBackdrop: g,
        keepMounted: h,
      },
      ee = hb(ie),
      ae = () => {
        G(!1), f && f();
      },
      ue = () => {
        G(!0), S && S(), s && X();
      },
      de = (pe) => {
        pe.target === pe.currentTarget && (O && O(pe), C && C(pe, 'backdropClick'));
      },
      me = (pe) => {
        E && E(pe),
          !(pe.key !== 'Escape' || !U()) &&
            (u || (pe.stopPropagation(), C && C(pe, 'escapeKeyDown')));
      },
      M = {};
    a.props.tabIndex === void 0 && (M.tabIndex = '-1'),
      re && ((M.onEnter = Ia(ae, a.props.onEnter)), (M.onExited = Ia(ue, a.props.onExited)));
    const Te = (i = A.root) != null ? i : 'div',
      Q = Pt({
        elementType: Te,
        externalSlotProps: R.root,
        externalForwardedProps: j,
        additionalProps: {
          ref: W,
          role: 'presentation',
          onKeyDown: me,
        },
        className: ee.root,
        ownerState: ie,
      }),
      q = A.backdrop,
      Ce = Pt({
        elementType: q,
        externalSlotProps: R.backdrop,
        additionalProps: {
          'aria-hidden': !0,
          onClick: de,
          open: x,
        },
        className: ee.backdrop,
        ownerState: ie,
      });
    return !h && !x && (!re || I)
      ? null
      : /* @__PURE__ */ N(rc, {
          ref: Y,
          container: l,
          disablePortal: p,
          children: /* @__PURE__ */ Ke(Te, {
            ...Q,
            children: [
              !g && q
                ? /* @__PURE__ */ N(q, {
                    ...Ce,
                  })
                : null,
              /* @__PURE__ */ N(ar, {
                disableEnforceFocus: d,
                disableAutoFocus: c,
                disableRestoreFocus: m,
                isEnabled: U,
                open: x,
                children: /* @__PURE__ */ b.cloneElement(a, M),
              }),
            ],
          }),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (ac.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: $n.isRequired,
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
    container: n.oneOfType([Ht, n.func]),
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
const yb = ac,
  xb = 2;
function sc(e, t) {
  return e - t;
}
function lo(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function $s(e, t) {
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
function Fo(e, t) {
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
function ur(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function Eb(e, t, o) {
  return (o - t) * e + t;
}
function Ob(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function Tb(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(Ob(t)));
}
function ks({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(sc);
}
function zo({ sliderRef: e, activeIndex: t, setActive: o }) {
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
function Bo(e, t) {
  return typeof e == 'number' && typeof t == 'number'
    ? e === t
    : typeof e == 'object' && typeof t == 'object'
    ? Am(e, t)
    : !1;
}
const Cb = {
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
  Rb = (e) => e;
let Vo;
function ti() {
  return (
    Vo === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Vo = CSS.supports('touch-action', 'none'))
        : (Vo = !0)),
    Vo
  );
}
function Sb(e) {
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
      orientation: m = 'horizontal',
      rootRef: y,
      scale: g = Rb,
      step: h = 1,
      tabIndex: v,
      value: O,
    } = e,
    C = b.useRef(),
    [E, x] = b.useState(-1),
    [f, S] = b.useState(-1),
    [R, A] = b.useState(!1),
    j = b.useRef(0),
    [w, I] = Cn({
      controlled: O,
      default: o ?? c,
      name: 'Slider',
    }),
    G =
      u &&
      ((te, ne, xe) => {
        const he = te.nativeEvent || te,
          Ee = new he.constructor(he.type, he);
        Object.defineProperty(Ee, 'target', {
          writable: !0,
          value: {
            value: ne,
            name: d,
          },
        }),
          u(Ee, ne, xe);
      }),
    z = Array.isArray(w);
  let _ = z ? w.slice().sort(sc) : [w];
  _ = _.map((te) => lo(te, c, l));
  const D =
      s === !0 && h !== null
        ? [...Array(Math.floor((l - c) / h) + 1)].map((te, ne) => ({
            value: c + h * ne,
          }))
        : s || [],
    W = D.map((te) => te.value),
    { isFocusVisibleRef: re, onBlur: L, onFocus: F, ref: $ } = xl(),
    [B, Z] = b.useState(-1),
    U = b.useRef(),
    Y = rt($, U),
    X = rt(y, Y),
    ie = (te) => (ne) => {
      var xe;
      const he = Number(ne.currentTarget.getAttribute('data-index'));
      F(ne),
        re.current === !0 && Z(he),
        S(he),
        te == null || (xe = te.onFocus) == null || xe.call(te, ne);
    },
    ee = (te) => (ne) => {
      var xe;
      L(ne),
        re.current === !1 && Z(-1),
        S(-1),
        te == null || (xe = te.onBlur) == null || xe.call(te, ne);
    };
  nn(() => {
    if (r && U.current.contains(document.activeElement)) {
      var te;
      (te = document.activeElement) == null || te.blur();
    }
  }, [r]),
    r && E !== -1 && x(-1),
    r && B !== -1 && Z(-1);
  const ae = (te) => (ne) => {
      var xe;
      (xe = te.onChange) == null || xe.call(te, ne);
      const he = Number(ne.currentTarget.getAttribute('data-index')),
        Ee = _[he],
        _e = W.indexOf(Ee);
      let se = ne.target.valueAsNumber;
      if (
        (D && h == null && (se = se < Ee ? W[_e - 1] : W[_e + 1]),
        (se = lo(se, c, l)),
        D && h == null)
      ) {
        const $e = W.indexOf(_[he]);
        se = se < _[he] ? W[$e - 1] : W[$e + 1];
      }
      if (z) {
        i && (se = lo(se, _[he - 1] || -1 / 0, _[he + 1] || 1 / 0));
        const $e = se;
        se = ks({
          values: _,
          newValue: se,
          index: he,
        });
        let H = he;
        i || (H = se.indexOf($e)),
          zo({
            sliderRef: U,
            activeIndex: H,
          });
      }
      I(se), Z(he), G && !Bo(se, w) && G(ne, se, he), p && p(ne, se);
    },
    ue = b.useRef();
  let de = m;
  a && m === 'horizontal' && (de += '-reverse');
  const me = ({ finger: te, move: ne = !1 }) => {
      const { current: xe } = U,
        { width: he, height: Ee, bottom: _e, left: se } = xe.getBoundingClientRect();
      let $e;
      de.indexOf('vertical') === 0 ? ($e = (_e - te.y) / Ee) : ($e = (te.x - se) / he),
        de.indexOf('-reverse') !== -1 && ($e = 1 - $e);
      let H;
      if (((H = Eb($e, c, l)), h)) H = Tb(H, h, c);
      else {
        const Re = $s(W, H);
        H = W[Re];
      }
      H = lo(H, c, l);
      let ye = 0;
      if (z) {
        ne ? (ye = ue.current) : (ye = $s(_, H)),
          i && (H = lo(H, _[ye - 1] || -1 / 0, _[ye + 1] || 1 / 0));
        const Re = H;
        (H = ks({
          values: _,
          newValue: H,
          index: ye,
        })),
          (i && ne) || ((ye = H.indexOf(Re)), (ue.current = ye));
      }
      return {
        newValue: H,
        activeIndex: ye,
      };
    },
    M = pt((te) => {
      const ne = Fo(te, C);
      if (!ne) return;
      if (((j.current += 1), te.type === 'mousemove' && te.buttons === 0)) {
        Te(te);
        return;
      }
      const { newValue: xe, activeIndex: he } = me({
        finger: ne,
        move: !0,
      });
      zo({
        sliderRef: U,
        activeIndex: he,
        setActive: x,
      }),
        I(xe),
        !R && j.current > xb && A(!0),
        G && !Bo(xe, w) && G(te, xe, he);
    }),
    Te = pt((te) => {
      const ne = Fo(te, C);
      if ((A(!1), !ne)) return;
      const { newValue: xe } = me({
        finger: ne,
        move: !0,
      });
      x(-1), te.type === 'touchend' && S(-1), p && p(te, xe), (C.current = void 0), q();
    }),
    Q = pt((te) => {
      if (r) return;
      ti() || te.preventDefault();
      const ne = te.changedTouches[0];
      ne != null && (C.current = ne.identifier);
      const xe = Fo(te, C);
      if (xe !== !1) {
        const { newValue: Ee, activeIndex: _e } = me({
          finger: xe,
        });
        zo({
          sliderRef: U,
          activeIndex: _e,
          setActive: x,
        }),
          I(Ee),
          G && !Bo(Ee, w) && G(te, Ee, _e);
      }
      j.current = 0;
      const he = ot(U.current);
      he.addEventListener('touchmove', M), he.addEventListener('touchend', Te);
    }),
    q = b.useCallback(() => {
      const te = ot(U.current);
      te.removeEventListener('mousemove', M),
        te.removeEventListener('mouseup', Te),
        te.removeEventListener('touchmove', M),
        te.removeEventListener('touchend', Te);
    }, [Te, M]);
  b.useEffect(() => {
    const { current: te } = U;
    return (
      te.addEventListener('touchstart', Q, {
        passive: ti(),
      }),
      () => {
        te.removeEventListener('touchstart', Q, {
          passive: ti(),
        }),
          q();
      }
    );
  }, [q, Q]),
    b.useEffect(() => {
      r && q();
    }, [r, q]);
  const Ce = (te) => (ne) => {
      var xe;
      if (
        ((xe = te.onMouseDown) == null || xe.call(te, ne),
        r || ne.defaultPrevented || ne.button !== 0)
      )
        return;
      ne.preventDefault();
      const he = Fo(ne, C);
      if (he !== !1) {
        const { newValue: _e, activeIndex: se } = me({
          finger: he,
        });
        zo({
          sliderRef: U,
          activeIndex: se,
          setActive: x,
        }),
          I(_e),
          G && !Bo(_e, w) && G(ne, _e, se);
      }
      j.current = 0;
      const Ee = ot(U.current);
      Ee.addEventListener('mousemove', M), Ee.addEventListener('mouseup', Te);
    },
    pe = ur(z ? _[0] : c, c, l),
    Ne = ur(_[_.length - 1], c, l) - pe,
    Le = (te = {}) => {
      const ne = {
          onMouseDown: Ce(te || {}),
        },
        xe = {
          ...te,
          ...ne,
        };
      return {
        ref: X,
        ...xe,
      };
    },
    Je = (te) => (ne) => {
      var xe;
      (xe = te.onMouseOver) == null || xe.call(te, ne);
      const he = Number(ne.currentTarget.getAttribute('data-index'));
      S(he);
    },
    Xe = (te) => (ne) => {
      var xe;
      (xe = te.onMouseLeave) == null || xe.call(te, ne), S(-1);
    };
  return {
    active: E,
    axis: de,
    axisProps: Cb,
    dragging: R,
    focusedThumbIndex: B,
    getHiddenInputProps: (te = {}) => {
      var ne;
      const xe = {
          onChange: ae(te || {}),
          onFocus: ie(te || {}),
          onBlur: ee(te || {}),
        },
        he = {
          ...te,
          ...xe,
        };
      return {
        tabIndex: v,
        'aria-labelledby': t,
        'aria-orientation': m,
        'aria-valuemax': g(l),
        'aria-valuemin': g(c),
        name: d,
        type: 'range',
        min: e.min,
        max: e.max,
        step: (ne = e.step) != null ? ne : void 0,
        disabled: r,
        ...he,
        style: {
          ...Sd,
          direction: a ? 'rtl' : 'ltr',
          // So that VoiceOver's focus indicator matches the thumb's dimensions
          width: '100%',
          height: '100%',
        },
      };
    },
    getRootProps: Le,
    getThumbProps: (te = {}) => {
      const ne = {
        onMouseOver: Je(te || {}),
        onMouseLeave: Xe(te || {}),
      };
      return {
        ...te,
        ...ne,
      };
    },
    marks: D,
    open: f,
    range: z,
    rootRef: X,
    trackLeap: Ne,
    trackOffset: pe,
    values: _,
  };
}
function wb(e) {
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
    function O(C) {
      C.defaultPrevented ||
        ((C.key === 'Escape' || C.key === 'Esc') && (r == null || r(C, 'escapeKeyDown')));
    }
    return (
      document.addEventListener('keydown', O),
      () => {
        document.removeEventListener('keydown', O);
      }
    );
  }, [i, r]);
  const l = pt((O, C) => {
      r == null || r(O, C);
    }),
    c = pt((O) => {
      !r ||
        O == null ||
        (clearTimeout(s.current),
        (s.current = setTimeout(() => {
          l(null, 'timeout');
        }, O)));
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
  const d = (O) => {
      r == null || r(O, 'clickaway');
    },
    u = () => {
      clearTimeout(s.current);
    },
    p = b.useCallback(() => {
      t != null && c(a ?? t * 0.5);
    }, [t, a, c]),
    m = (O) => (C) => {
      const E = O.onBlur;
      E == null || E(C), p();
    },
    y = (O) => (C) => {
      const E = O.onFocus;
      E == null || E(C), u();
    },
    g = (O) => (C) => {
      const E = O.onMouseEnter;
      E == null || E(C), u();
    },
    h = (O) => (C) => {
      const E = O.onMouseLeave;
      E == null || E(C), p();
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
      getRootProps: (O = {}) => {
        const E = {
          ...Kl(e),
          ...O,
        };
        return {
          // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
          // See https://github.com/mui/material-ui/issues/29080
          role: 'presentation',
          ...E,
          onBlur: m(E),
          onFocus: y(E),
          onMouseEnter: g(E),
          onMouseLeave: h(E),
        };
      },
      onClickAway: d,
    }
  );
}
function Uo(e) {
  return parseInt(e, 10) || 0;
}
const $b = {
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
function Ns(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const lc = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const { onChange: r, maxRows: i, minRows: a = 1, style: s, value: l, ...c } = t,
    { current: d } = b.useRef(l != null),
    u = b.useRef(null),
    p = rt(o, u),
    m = b.useRef(null),
    y = b.useRef(0),
    [g, h] = b.useState({
      outerHeightStyle: 0,
    }),
    v = b.useCallback(() => {
      const f = u.current,
        R = ln(f).getComputedStyle(f);
      if (R.width === '0px')
        return {
          outerHeightStyle: 0,
        };
      const A = m.current;
      (A.style.width = R.width),
        (A.value = f.value || t.placeholder || 'x'),
        A.value.slice(-1) ===
          `
` && (A.value += ' ');
      const j = R.boxSizing,
        w = Uo(R.paddingBottom) + Uo(R.paddingTop),
        I = Uo(R.borderBottomWidth) + Uo(R.borderTopWidth),
        G = A.scrollHeight;
      A.value = 'x';
      const z = A.scrollHeight;
      let _ = G;
      a && (_ = Math.max(Number(a) * z, _)),
        i && (_ = Math.min(Number(i) * z, _)),
        (_ = Math.max(_, z));
      const D = _ + (j === 'border-box' ? w + I : 0),
        W = Math.abs(_ - G) <= 1;
      return {
        outerHeightStyle: D,
        overflow: W,
      };
    }, [i, a, t.placeholder]),
    O = (f, S) => {
      const { outerHeightStyle: R, overflow: A } = S;
      return y.current < 20 &&
        ((R > 0 && Math.abs((f.outerHeightStyle || 0) - R) > 1) || f.overflow !== A)
        ? ((y.current += 1),
          {
            overflow: A,
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
    C = b.useCallback(() => {
      const f = v();
      Ns(f) || h((S) => O(S, f));
    }, [v]),
    E = () => {
      const f = v();
      Ns(f) ||
        pl.flushSync(() => {
          h((S) => O(S, f));
        });
    };
  b.useEffect(() => {
    const f = Pi(() => {
      (y.current = 0), u.current && E();
    });
    let S;
    const R = u.current,
      A = ln(R);
    return (
      A.addEventListener('resize', f),
      typeof ResizeObserver < 'u' && ((S = new ResizeObserver(f)), S.observe(R)),
      () => {
        f.clear(), A.removeEventListener('resize', f), S && S.disconnect();
      }
    );
  }),
    nn(() => {
      C();
    }),
    b.useEffect(() => {
      y.current = 0;
    }, [l]);
  const x = (f) => {
    (y.current = 0), d || C(), r && r(f);
  };
  return /* @__PURE__ */ Ke(b.Fragment, {
    children: [
      /* @__PURE__ */ N('textarea', {
        value: l,
        onChange: x,
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
      /* @__PURE__ */ N('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: m,
        tabIndex: -1,
        style: {
          ...$b.shadow,
          ...s,
          padding: 0,
        },
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (lc.propTypes = {
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
const kb = lc;
function Ps(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function Nb(e = {}) {
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
    o && (u = u.toLowerCase()), t && (u = Ps(u));
    const p = u
      ? l.filter((m) => {
          let y = (a || d)(m);
          return (
            o && (y = y.toLowerCase()),
            t && (y = Ps(y)),
            i === 'start' ? y.indexOf(u) === 0 : y.indexOf(u) > -1
          );
        })
      : l;
    return typeof r == 'number' ? p.slice(0, r) : p;
  };
}
function ni(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const Pb = Nb(),
  Is = 5,
  Ib = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function Mb(e) {
  const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_isActiveElementInListbox: t = Ib,
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
      disableCloseOnSelect: m = !1,
      disabled: y,
      disabledItemsFocusable: g = !1,
      disableListWrap: h = !1,
      filterOptions: v = Pb,
      filterSelectedOptions: O = !1,
      freeSolo: C = !1,
      getOptionDisabled: E,
      getOptionLabel: x = (k) => {
        var P;
        return (P = k.label) != null ? P : k;
      },
      groupBy: f,
      handleHomeEndKeys: S = !e.freeSolo,
      id: R,
      includeInputInList: A = !1,
      inputValue: j,
      isOptionEqualToValue: w = (k, P) => k === P,
      multiple: I = !1,
      onChange: G,
      onClose: z,
      onHighlightChange: _,
      onInputChange: D,
      onOpen: W,
      open: re,
      openOnFocus: L = !1,
      options: F,
      readOnly: $ = !1,
      selectOnFocus: B = !e.freeSolo,
      value: Z,
    } = e,
    U = yl(R);
  let Y = x;
  Y = (k) => {
    const P = x(k);
    if (typeof P != 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const K = P === void 0 ? 'undefined' : `${typeof P} (${P})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${d} returned ${K} instead of a string for ${JSON.stringify(
            k,
          )}.`,
        );
      }
      return String(P);
    }
    return P;
  };
  const X = b.useRef(!1),
    ie = b.useRef(!0),
    ee = b.useRef(null),
    ae = b.useRef(null),
    [ue, de] = b.useState(null),
    [me, M] = b.useState(-1),
    Te = i ? 0 : -1,
    Q = b.useRef(Te),
    [q, Ce] = Cn({
      controlled: Z,
      default: u,
      name: d,
    }),
    [pe, Ne] = Cn({
      controlled: j,
      default: '',
      name: d,
      state: 'inputValue',
    }),
    [Le, Je] = b.useState(!1),
    Xe = b.useCallback(
      (k, P) => {
        if (!(I ? q.length < P.length : P !== null) && !l) return;
        let oe;
        if (I) oe = '';
        else if (P == null) oe = '';
        else {
          const fe = Y(P);
          oe = typeof fe == 'string' ? fe : '';
        }
        pe !== oe && (Ne(oe), D && D(k, oe, 'reset'));
      },
      [Y, pe, I, D, Ne, l, q],
    ),
    [Fe, Ze] = Cn({
      controlled: re,
      default: !1,
      name: d,
      state: 'open',
    }),
    [te, ne] = b.useState(!0),
    xe = !I && q != null && pe === Y(q),
    he = Fe && !$,
    Ee = he
      ? v(
          F.filter((k) => !(O && (I ? q : [q]).some((P) => P !== null && w(k, P)))),
          // we use the empty string to manipulate `filterOptions` to not filter any options
          // i.e. the filter predicate always returns true
          {
            inputValue: xe && te ? '' : pe,
            getOptionLabel: Y,
          },
        )
      : [],
    _e = Cd({
      filteredOptions: Ee,
      value: q,
    });
  b.useEffect(() => {
    const k = q !== _e.value;
    (Le && !k) || (C && !k) || Xe(null, q);
  }, [q, Xe, Le, _e.value, C]);
  const se = Fe && Ee.length > 0 && !$;
  if (process.env.NODE_ENV !== 'production' && q !== null && !C && F.length > 0) {
    const k = (I ? q : [q]).filter((P) => !F.some((K) => w(K, P)));
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
  const $e = pt((k) => {
    k === -1 ? ee.current.focus() : ue.querySelector(`[data-tag-index="${k}"]`).focus();
  });
  b.useEffect(() => {
    I && me > q.length - 1 && (M(-1), $e(-1));
  }, [q, I, me, $e]);
  function H(k, P) {
    if (!ae.current || k === -1) return -1;
    let K = k;
    for (;;) {
      if ((P === 'next' && K === Ee.length) || (P === 'previous' && K === -1)) return -1;
      const oe = ae.current.querySelector(`[data-option-index="${K}"]`),
        fe = g ? !1 : !oe || oe.disabled || oe.getAttribute('aria-disabled') === 'true';
      if ((oe && !oe.hasAttribute('tabindex')) || fe) K += P === 'next' ? 1 : -1;
      else return K;
    }
  }
  const ye = pt(({ event: k, index: P, reason: K = 'auto' }) => {
      if (
        ((Q.current = P),
        P === -1
          ? ee.current.removeAttribute('aria-activedescendant')
          : ee.current.setAttribute('aria-activedescendant', `${U}-option-${P}`),
        _ && _(k, P === -1 ? null : Ee[P], K),
        !ae.current)
      )
        return;
      const oe = ae.current.querySelector(`[role="option"].${o}-focused`);
      oe && (oe.classList.remove(`${o}-focused`), oe.classList.remove(`${o}-focusVisible`));
      let fe = ae.current;
      if (
        (ae.current.getAttribute('role') !== 'listbox' &&
          (fe = ae.current.parentElement.querySelector('[role="listbox"]')),
        !fe)
      )
        return;
      if (P === -1) {
        fe.scrollTop = 0;
        return;
      }
      const ve = ae.current.querySelector(`[data-option-index="${P}"]`);
      if (
        ve &&
        (ve.classList.add(`${o}-focused`),
        K === 'keyboard' && ve.classList.add(`${o}-focusVisible`),
        fe.scrollHeight > fe.clientHeight && K !== 'mouse')
      ) {
        const ge = ve,
          Se = fe.clientHeight + fe.scrollTop,
          Oe = ge.offsetTop + ge.offsetHeight;
        Oe > Se
          ? (fe.scrollTop = Oe - fe.clientHeight)
          : ge.offsetTop - ge.offsetHeight * (f ? 1.3 : 0) < fe.scrollTop &&
            (fe.scrollTop = ge.offsetTop - ge.offsetHeight * (f ? 1.3 : 0));
      }
    }),
    Re = pt(({ event: k, diff: P, direction: K = 'next', reason: oe = 'auto' }) => {
      if (!he) return;
      const ve = H(
        (() => {
          const ge = Ee.length - 1;
          if (P === 'reset') return Te;
          if (P === 'start') return 0;
          if (P === 'end') return ge;
          const Se = Q.current + P;
          return Se < 0
            ? Se === -1 && A
              ? -1
              : (h && Q.current !== -1) || Math.abs(P) > 1
              ? 0
              : ge
            : Se > ge
            ? Se === ge + 1 && A
              ? -1
              : h || Math.abs(P) > 1
              ? ge
              : 0
            : Se;
        })(),
        K,
      );
      if (
        (ye({
          index: ve,
          reason: oe,
          event: k,
        }),
        r && P !== 'reset')
      )
        if (ve === -1) ee.current.value = pe;
        else {
          const ge = Y(Ee[ve]);
          (ee.current.value = ge),
            ge.toLowerCase().indexOf(pe.toLowerCase()) === 0 &&
              pe.length > 0 &&
              ee.current.setSelectionRange(pe.length, ge.length);
        }
    }),
    ft = () => {
      const k = (P, K) => {
        const oe = P ? Y(P) : '',
          fe = K ? Y(K) : '';
        return oe === fe;
      };
      if (
        Q.current !== -1 &&
        _e.filteredOptions &&
        _e.filteredOptions.length !== Ee.length &&
        (I
          ? q.length === _e.value.length && _e.value.every((P, K) => Y(q[K]) === Y(P))
          : k(_e.value, q))
      ) {
        const P = _e.filteredOptions[Q.current];
        if (P && Ee.some((oe) => Y(oe) === Y(P))) return !0;
      }
      return !1;
    },
    ht = b.useCallback(() => {
      if (!he || ft()) return;
      const k = I ? q[0] : q;
      if (Ee.length === 0 || k == null) {
        Re({
          diff: 'reset',
        });
        return;
      }
      if (ae.current) {
        if (k != null) {
          const P = Ee[Q.current];
          if (I && P && ni(q, (oe) => w(P, oe)) !== -1) return;
          const K = ni(Ee, (oe) => w(oe, k));
          K === -1
            ? Re({
                diff: 'reset',
              })
            : ye({
                index: K,
              });
          return;
        }
        if (Q.current >= Ee.length - 1) {
          ye({
            index: Ee.length - 1,
          });
          return;
        }
        ye({
          index: Q.current,
        });
      }
    }, [
      // Only sync the highlighted index when the option switch between empty and not
      Ee.length,
      // Don't sync the highlighted index with the value when multiple
      // eslint-disable-next-line react-hooks/exhaustive-deps
      I ? !1 : q,
      O,
      Re,
      ye,
      he,
      pe,
      I,
    ]),
    st = pt((k) => {
      er(ae, k), k && ht();
    });
  process.env.NODE_ENV !== 'production' &&
    b.useEffect(() => {
      (!ee.current || ee.current.nodeName !== 'INPUT') &&
        (ee.current && ee.current.nodeName === 'TEXTAREA'
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
                `MUI: Unable to find the input element. It was resolved to ${ee.current} while an HTMLInputElement was expected.`,
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
  const xt = (k) => {
      Fe || (Ze(!0), ne(!0), W && W(k));
    },
    Et = (k, P) => {
      Fe && (Ze(!1), z && z(k, P));
    },
    Qe = (k, P, K, oe) => {
      if (I) {
        if (q.length === P.length && q.every((fe, ve) => fe === P[ve])) return;
      } else if (q === P) return;
      G && G(k, P, K, oe), Ce(P);
    },
    lt = b.useRef(!1),
    ut = (k, P, K = 'selectOption', oe = 'options') => {
      let fe = K,
        ve = P;
      if (I) {
        if (((ve = Array.isArray(q) ? q.slice() : []), process.env.NODE_ENV !== 'production')) {
          const Se = ve.filter((Oe) => w(P, Oe));
          Se.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${d} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${Se.length} matches.`,
              ].join(`
`),
            );
        }
        const ge = ni(ve, (Se) => w(P, Se));
        ge === -1 ? ve.push(P) : oe !== 'freeSolo' && (ve.splice(ge, 1), (fe = 'removeOption'));
      }
      Xe(k, ve),
        Qe(k, ve, fe, {
          option: P,
        }),
        !m && (!k || (!k.ctrlKey && !k.metaKey)) && Et(k, fe),
        (s === !0 || (s === 'touch' && lt.current) || (s === 'mouse' && !lt.current)) &&
          ee.current.blur();
    };
  function Yt(k, P) {
    if (k === -1) return -1;
    let K = k;
    for (;;) {
      if ((P === 'next' && K === q.length) || (P === 'previous' && K === -1)) return -1;
      const oe = ue.querySelector(`[data-tag-index="${K}"]`);
      if (
        !oe ||
        !oe.hasAttribute('tabindex') ||
        oe.disabled ||
        oe.getAttribute('aria-disabled') === 'true'
      )
        K += P === 'next' ? 1 : -1;
      else return K;
    }
  }
  const Kt = (k, P) => {
      if (!I) return;
      pe === '' && Et(k, 'toggleInput');
      let K = me;
      me === -1
        ? pe === '' && P === 'previous' && (K = q.length - 1)
        : ((K += P === 'next' ? 1 : -1), K < 0 && (K = 0), K === q.length && (K = -1)),
        (K = Yt(K, P)),
        M(K),
        $e(K);
    },
    rn = (k) => {
      (X.current = !0), Ne(''), D && D(k, '', 'clear'), Qe(k, I ? [] : null, 'clear');
    },
    Ot = (k) => (P) => {
      if (
        (k.onKeyDown && k.onKeyDown(P),
        !P.defaultMuiPrevented &&
          (me !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(P.key) === -1 && (M(-1), $e(-1)),
          P.which !== 229))
      )
        switch (P.key) {
          case 'Home':
            he &&
              S &&
              (P.preventDefault(),
              Re({
                diff: 'start',
                direction: 'next',
                reason: 'keyboard',
                event: P,
              }));
            break;
          case 'End':
            he &&
              S &&
              (P.preventDefault(),
              Re({
                diff: 'end',
                direction: 'previous',
                reason: 'keyboard',
                event: P,
              }));
            break;
          case 'PageUp':
            P.preventDefault(),
              Re({
                diff: -Is,
                direction: 'previous',
                reason: 'keyboard',
                event: P,
              }),
              xt(P);
            break;
          case 'PageDown':
            P.preventDefault(),
              Re({
                diff: Is,
                direction: 'next',
                reason: 'keyboard',
                event: P,
              }),
              xt(P);
            break;
          case 'ArrowDown':
            P.preventDefault(),
              Re({
                diff: 1,
                direction: 'next',
                reason: 'keyboard',
                event: P,
              }),
              xt(P);
            break;
          case 'ArrowUp':
            P.preventDefault(),
              Re({
                diff: -1,
                direction: 'previous',
                reason: 'keyboard',
                event: P,
              }),
              xt(P);
            break;
          case 'ArrowLeft':
            Kt(P, 'previous');
            break;
          case 'ArrowRight':
            Kt(P, 'next');
            break;
          case 'Enter':
            if (Q.current !== -1 && he) {
              const K = Ee[Q.current],
                oe = E ? E(K) : !1;
              if ((P.preventDefault(), oe)) return;
              ut(P, K, 'selectOption'),
                r && ee.current.setSelectionRange(ee.current.value.length, ee.current.value.length);
            } else
              C &&
                pe !== '' &&
                xe === !1 &&
                (I && P.preventDefault(), ut(P, pe, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            he
              ? (P.preventDefault(), P.stopPropagation(), Et(P, 'escape'))
              : c &&
                (pe !== '' || (I && q.length > 0)) &&
                (P.preventDefault(), P.stopPropagation(), rn(P));
            break;
          case 'Backspace':
            if (I && !$ && pe === '' && q.length > 0) {
              const K = me === -1 ? q.length - 1 : me,
                oe = q.slice();
              oe.splice(K, 1),
                Qe(P, oe, 'removeOption', {
                  option: q[K],
                });
            }
            break;
          case 'Delete':
            if (I && !$ && pe === '' && q.length > 0 && me !== -1) {
              const K = me,
                oe = q.slice();
              oe.splice(K, 1),
                Qe(P, oe, 'removeOption', {
                  option: q[K],
                });
            }
            break;
        }
    },
    Gt = (k) => {
      Je(!0), L && !X.current && xt(k);
    },
    Xt = (k) => {
      if (t(ae)) {
        ee.current.focus();
        return;
      }
      Je(!1),
        (ie.current = !0),
        (X.current = !1),
        a && Q.current !== -1 && he
          ? ut(k, Ee[Q.current], 'blur')
          : a && C && pe !== ''
          ? ut(k, pe, 'blur', 'freeSolo')
          : l && Xe(k, q),
        Et(k, 'blur');
    },
    Tt = (k) => {
      const P = k.target.value;
      pe !== P && (Ne(P), ne(!1), D && D(k, P, 'input')),
        P === '' ? !p && !I && Qe(k, null, 'clear') : xt(k);
    },
    vn = (k) => {
      const P = Number(k.currentTarget.getAttribute('data-option-index'));
      Q.current !== P &&
        ye({
          event: k,
          index: P,
          reason: 'mouse',
        });
    },
    an = (k) => {
      ye({
        event: k,
        index: Number(k.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (lt.current = !0);
    },
    Ct = (k) => {
      const P = Number(k.currentTarget.getAttribute('data-option-index'));
      ut(k, Ee[P], 'selectOption'), (lt.current = !1);
    },
    Ft = (k) => (P) => {
      const K = q.slice();
      K.splice(k, 1),
        Qe(P, K, 'removeOption', {
          option: q[k],
        });
    },
    Jt = (k) => {
      Fe ? Et(k, 'toggleInput') : xt(k);
    },
    gn = (k) => {
      k.currentTarget.contains(k.target) && k.target.getAttribute('id') !== U && k.preventDefault();
    },
    at = (k) => {
      k.currentTarget.contains(k.target) &&
        (ee.current.focus(),
        B &&
          ie.current &&
          ee.current.selectionEnd - ee.current.selectionStart === 0 &&
          ee.current.select(),
        (ie.current = !1));
    },
    T = (k) => {
      (pe === '' || !Fe) && Jt(k);
    };
  let V = C && pe.length > 0;
  V = V || (I ? q.length > 0 : q !== null);
  let ce = Ee;
  if (f) {
    const k = /* @__PURE__ */ new Map();
    let P = !1;
    ce = Ee.reduce((K, oe, fe) => {
      const ve = f(oe);
      return (
        K.length > 0 && K[K.length - 1].group === ve
          ? K[K.length - 1].options.push(oe)
          : (process.env.NODE_ENV !== 'production' &&
              (k.get(ve) &&
                !P &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${d} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                (P = !0)),
              k.set(ve, !0)),
            K.push({
              key: fe,
              index: fe,
              group: ve,
              options: [oe],
            })),
        K
      );
    }, []);
  }
  return (
    y && Le && Xt(),
    {
      getRootProps: (k = {}) => ({
        'aria-owns': se ? `${U}-listbox` : null,
        ...k,
        onKeyDown: Ot(k),
        onMouseDown: gn,
        onClick: at,
      }),
      getInputLabelProps: () => ({
        id: `${U}-label`,
        htmlFor: U,
      }),
      getInputProps: () => ({
        id: U,
        value: pe,
        onBlur: Xt,
        onFocus: Gt,
        onChange: Tt,
        onMouseDown: T,
        // if open then this is handled imperatively so don't let react override
        // only have an opinion about this when closed
        'aria-activedescendant': he ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': se ? `${U}-listbox` : void 0,
        'aria-expanded': se,
        // Disable browser's suggestion that might overlap with the popup.
        // Handle autocomplete but not autofill.
        autoComplete: 'off',
        ref: ee,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled: y,
      }),
      getClearProps: () => ({
        tabIndex: -1,
        onClick: rn,
      }),
      getPopupIndicatorProps: () => ({
        tabIndex: -1,
        onClick: Jt,
      }),
      getTagProps: ({ index: k }) => ({
        key: k,
        'data-tag-index': k,
        tabIndex: -1,
        ...(!$ && {
          onDelete: Ft(k),
        }),
      }),
      getListboxProps: () => ({
        role: 'listbox',
        id: `${U}-listbox`,
        'aria-labelledby': `${U}-label`,
        ref: st,
        onMouseDown: (k) => {
          k.preventDefault();
        },
      }),
      getOptionProps: ({ index: k, option: P }) => {
        const K = (I ? q : [q]).some((fe) => fe != null && w(P, fe)),
          oe = E ? E(P) : !1;
        return {
          key: Y(P),
          tabIndex: -1,
          role: 'option',
          id: `${U}-option-${k}`,
          onMouseMove: vn,
          onClick: Ct,
          onTouchStart: an,
          'data-option-index': k,
          'aria-disabled': oe,
          'aria-selected': K,
        };
      },
      id: U,
      inputValue: pe,
      value: q,
      dirty: V,
      expanded: he && ue,
      popupOpen: he,
      focused: Le || me !== -1,
      anchorEl: ue,
      setAnchorEl: de,
      focusedTag: me,
      groupedOptions: ce,
    }
  );
}
function _b(e) {
  return ke('MuiSvgIcon', e);
}
we('MuiSvgIcon', [
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
const Ab = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      i = {
        root: ['root', t !== 'inherit' && `color${J(t)}`, `fontSize${J(o)}`],
      };
    return Ie(i, _b, r);
  },
  Db = le('svg', {
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
    var o, r, i, a, s, l, c, d, u, p, m, y, g, h, v, O, C;
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
        (m = (y = (e.vars || e).palette) == null || (g = y[t.color]) == null ? void 0 : g.main) !=
        null
          ? m
          : {
              action:
                (h = (e.vars || e).palette) == null || (v = h.action) == null ? void 0 : v.active,
              disabled:
                (O = (e.vars || e).palette) == null || (C = O.action) == null ? void 0 : C.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  ta = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        viewBox: m = '0 0 24 24',
        ...y
      } = r,
      g = {
        ...r,
        color: s,
        component: l,
        fontSize: c,
        instanceFontSize: t.fontSize,
        inheritViewBox: u,
        viewBox: m,
      },
      h = {};
    u || (h.viewBox = m);
    const v = Ab(g);
    return /* @__PURE__ */ Ke(Db, {
      as: l,
      className: be(v.root, a),
      focusable: 'false',
      color: d,
      'aria-hidden': p ? void 0 : !0,
      role: p ? 'img' : void 0,
      ref: o,
      ...h,
      ...y,
      ownerState: g,
      children: [
        i,
        p
          ? /* @__PURE__ */ N('title', {
              children: p,
            })
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ta.propTypes = {
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
ta.muiName = 'SvgIcon';
const Ms = ta;
function kn(e, t) {
  function o(r, i) {
    return /* @__PURE__ */ N(Ms, {
      'data-testid': `${t}Icon`,
      ref: i,
      ...r,
      children: e,
    });
  }
  return (
    process.env.NODE_ENV !== 'production' && (o.displayName = `${t}Icon`),
    (o.muiName = Ms.muiName),
    /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(o))
  );
}
function cc(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) (i = r[a]), !(t.indexOf(i) >= 0) && (o[i] = e[i]);
  return o;
}
function Ei(e, t) {
  return (
    (Ei = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    Ei(e, t)
  );
}
function uc(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), Ei(e, t);
}
const _s = {
  disabled: !1,
};
var jb =
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
const dr = Vt.createContext(null);
var Lb = function (t) {
    return t.scrollTop;
  },
  mo = 'unmounted',
  xn = 'exited',
  En = 'entering',
  Fn = 'entered',
  Oi = 'exiting',
  un = /* @__PURE__ */ (function (e) {
    uc(t, e);
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
            ? ((c = xn), (a.appearStatus = En))
            : (c = Fn)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = mo)
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
      return s && a.status === mo
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
          this.props.in ? s !== En && s !== Fn && (a = En) : (s === En || s === Fn) && (a = Oi);
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
          if ((this.cancelNextCallback(), a === En)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : Ao.findDOMNode(this);
              s && Lb(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === xn &&
            this.setState({
              status: mo,
            });
      }),
      (o.performEnter = function (i) {
        var a = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [l] : [Ao.findDOMNode(this), l],
          d = c[0],
          u = c[1],
          p = this.getTimeouts(),
          m = l ? p.appear : p.enter;
        if ((!i && !s) || _s.disabled) {
          this.safeSetState(
            {
              status: Fn,
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
              status: En,
            },
            function () {
              a.props.onEntering(d, u),
                a.onTransitionEnd(m, function () {
                  a.safeSetState(
                    {
                      status: Fn,
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
          l = this.props.nodeRef ? void 0 : Ao.findDOMNode(this);
        if (!a || _s.disabled) {
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
              status: Oi,
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : Ao.findDOMNode(this),
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
        if (i === mo) return null;
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
        var l = cc(a, [
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
            dr.Provider,
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
un.contextType = dr;
un.propTypes =
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
          var o = jb;
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
function jn() {}
un.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: jn,
  onEntering: jn,
  onEntered: jn,
  onExit: jn,
  onExiting: jn,
  onExited: jn,
};
un.UNMOUNTED = mo;
un.EXITED = xn;
un.ENTERING = En;
un.ENTERED = Fn;
un.EXITING = Oi;
const na = un;
function Fb(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function oa(e, t) {
  var o = function (a) {
      return t && Yo(a) ? t(a) : a;
    },
    r = /* @__PURE__ */ Object.create(null);
  return (
    e &&
      Nu.map(e, function (i) {
        return i;
      }).forEach(function (i) {
        r[i.key] = o(i);
      }),
    r
  );
}
function zb(e, t) {
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
function Tn(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function Bb(e, t) {
  return oa(e.children, function (o) {
    return Ko(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: Tn(o, 'appear', e),
      enter: Tn(o, 'enter', e),
      exit: Tn(o, 'exit', e),
    });
  });
}
function Vb(e, t, o) {
  var r = oa(e.children),
    i = zb(t, r);
  return (
    Object.keys(i).forEach(function (a) {
      var s = i[a];
      if (Yo(s)) {
        var l = a in t,
          c = a in r,
          d = t[a],
          u = Yo(d) && !d.props.in;
        c && (!l || u)
          ? (i[a] = Ko(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: Tn(s, 'exit', e),
              enter: Tn(s, 'enter', e),
            }))
          : !c && l && !u
          ? (i[a] = Ko(s, {
              in: !1,
            }))
          : c &&
            l &&
            Yo(d) &&
            (i[a] = Ko(s, {
              onExited: o.bind(null, s),
              in: d.props.in,
              exit: Tn(s, 'exit', e),
              enter: Tn(s, 'enter', e),
            }));
      }
    }),
    i
  );
}
var Ub =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  Wb = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  ra = /* @__PURE__ */ (function (e) {
    uc(t, e);
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
          children: c ? Bb(i, l) : Vb(i, s, l),
          firstRender: !1,
        };
      }),
      (o.handleExited = function (i, a) {
        var s = oa(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(a),
          this.mounted &&
            this.setState(function (l) {
              var c = tr({}, l.children);
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
          l = cc(i, ['component', 'childFactory']),
          c = this.state.contextValue,
          d = Ub(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          a === null
            ? /* @__PURE__ */ Vt.createElement(
                dr.Provider,
                {
                  value: c,
                },
                d,
              )
            : /* @__PURE__ */ Vt.createElement(
                dr.Provider,
                {
                  value: c,
                },
                /* @__PURE__ */ Vt.createElement(a, l, d),
              )
        );
      }),
      t
    );
  })(Vt.Component);
ra.propTypes =
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
ra.defaultProps = Wb;
const Hb = ra,
  ia = (e) => e.scrollTop;
function Xn(e, t) {
  var o, r;
  const { timeout: i, easing: a, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof i == 'number' ? i : i[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == 'object' ? a[t.mode] : a,
    delay: s.transitionDelay,
  };
}
function qb(e) {
  return ke('MuiPaper', e);
}
we('MuiPaper', [
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
const Yb = (e) => {
    const { square: t, elevation: o, variant: r, classes: i } = e,
      a = {
        root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`],
      };
    return Ie(a, qb, i);
  },
  Kb = le('div', {
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
            backgroundImage: `linear-gradient(${Ye('#fff', ps(t.elevation))}, ${Ye(
              '#fff',
              ps(t.elevation),
            )})`,
          }),
        ...(e.vars && {
          backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation],
        }),
      }),
    };
  }),
  dc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
      p = Yb(u);
    return (
      process.env.NODE_ENV !== 'production' &&
        cn().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      /* @__PURE__ */ N(Kb, {
        as: a,
        ownerState: u,
        className: be(p.root, i),
        ref: o,
        ...d,
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (dc.propTypes = {
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
    elevation: _t(mr, (e) => {
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
const Nn = dc;
function pc(e) {
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
    m = be(t, o.ripple, o.rippleVisible, r && o.ripplePulsate),
    y = {
      width: s,
      height: s,
      top: -(s / 2) + a,
      left: -(s / 2) + i,
    },
    g = be(o.child, u && o.childLeaving, r && o.childPulsate);
  return (
    !l && !u && p(!0),
    b.useEffect(() => {
      if (!l && c != null) {
        const h = setTimeout(c, d);
        return () => {
          clearTimeout(h);
        };
      }
    }, [c, l, d]),
    /* @__PURE__ */ N('span', {
      className: m,
      style: y,
      children: /* @__PURE__ */ N('span', {
        className: g,
      }),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (pc.propTypes = {
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
const Gb = we('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  It = Gb;
let Fr = (e) => e,
  As,
  Ds,
  js,
  Ls;
const Ti = 550,
  Xb = 80,
  Jb = Bi(
    As ||
      (As = Fr`
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
  Zb = Bi(
    Ds ||
      (Ds = Fr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  Qb = Bi(
    js ||
      (js = Fr`
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
  ev = le('span', {
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
  tv = le(pc, {
    name: 'MuiTouchRipple',
    slot: 'Ripple',
  })(
    Ls ||
      (Ls = Fr`
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
    Jb,
    Ti,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    It.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    It.child,
    It.childLeaving,
    Zb,
    Ti,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    It.childPulsate,
    Qb,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  fc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
    const m = b.useRef(!1),
      y = b.useRef(null),
      g = b.useRef(null),
      h = b.useRef(null);
    b.useEffect(
      () => () => {
        clearTimeout(y.current);
      },
      [],
    );
    const v = b.useCallback(
        (x) => {
          const { pulsate: f, rippleX: S, rippleY: R, rippleSize: A, cb: j } = x;
          d((w) => [
            ...w,
            /* @__PURE__ */ N(
              tv,
              {
                classes: {
                  ripple: be(a.ripple, It.ripple),
                  rippleVisible: be(a.rippleVisible, It.rippleVisible),
                  ripplePulsate: be(a.ripplePulsate, It.ripplePulsate),
                  child: be(a.child, It.child),
                  childLeaving: be(a.childLeaving, It.childLeaving),
                  childPulsate: be(a.childPulsate, It.childPulsate),
                },
                timeout: Ti,
                pulsate: f,
                rippleX: S,
                rippleY: R,
                rippleSize: A,
              },
              u.current,
            ),
          ]),
            (u.current += 1),
            (p.current = j);
        },
        [a],
      ),
      O = b.useCallback(
        (x = {}, f = {}, S = () => {}) => {
          const {
            pulsate: R = !1,
            center: A = i || f.pulsate,
            fakeElement: j = !1,
            // For test purposes
          } = f;
          if ((x == null ? void 0 : x.type) === 'mousedown' && m.current) {
            m.current = !1;
            return;
          }
          (x == null ? void 0 : x.type) === 'touchstart' && (m.current = !0);
          const w = j ? null : h.current,
            I = w
              ? w.getBoundingClientRect()
              : {
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                };
          let G, z, _;
          if (
            A ||
            x === void 0 ||
            (x.clientX === 0 && x.clientY === 0) ||
            (!x.clientX && !x.touches)
          )
            (G = Math.round(I.width / 2)), (z = Math.round(I.height / 2));
          else {
            const { clientX: D, clientY: W } = x.touches && x.touches.length > 0 ? x.touches[0] : x;
            (G = Math.round(D - I.left)), (z = Math.round(W - I.top));
          }
          if (A) (_ = Math.sqrt((2 * I.width ** 2 + I.height ** 2) / 3)), _ % 2 === 0 && (_ += 1);
          else {
            const D = Math.max(Math.abs((w ? w.clientWidth : 0) - G), G) * 2 + 2,
              W = Math.max(Math.abs((w ? w.clientHeight : 0) - z), z) * 2 + 2;
            _ = Math.sqrt(D ** 2 + W ** 2);
          }
          x != null && x.touches
            ? g.current === null &&
              ((g.current = () => {
                v({
                  pulsate: R,
                  rippleX: G,
                  rippleY: z,
                  rippleSize: _,
                  cb: S,
                });
              }),
              (y.current = setTimeout(() => {
                g.current && (g.current(), (g.current = null));
              }, Xb)))
            : v({
                pulsate: R,
                rippleX: G,
                rippleY: z,
                rippleSize: _,
                cb: S,
              });
        },
        [i, v],
      ),
      C = b.useCallback(() => {
        O(
          {},
          {
            pulsate: !0,
          },
        );
      }, [O]),
      E = b.useCallback((x, f) => {
        if ((clearTimeout(y.current), (x == null ? void 0 : x.type) === 'touchend' && g.current)) {
          g.current(),
            (g.current = null),
            (y.current = setTimeout(() => {
              E(x, f);
            }));
          return;
        }
        (g.current = null), d((S) => (S.length > 0 ? S.slice(1) : S)), (p.current = f);
      }, []);
    return (
      b.useImperativeHandle(
        o,
        () => ({
          pulsate: C,
          start: O,
          stop: E,
        }),
        [C, O, E],
      ),
      /* @__PURE__ */ N(ev, {
        className: be(It.root, a.root, s),
        ref: h,
        ...l,
        children: /* @__PURE__ */ N(Hb, {
          component: null,
          exit: !0,
          children: c,
        }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (fc.propTypes = {
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
const nv = fc;
function ov(e) {
  return ke('MuiButtonBase', e);
}
const rv = we('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  iv = rv,
  av = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: i } = e,
      s = Ie(
        {
          root: ['root', t && 'disabled', o && 'focusVisible'],
        },
        ov,
        i,
      );
    return o && r && (s.root += ` ${r}`), s;
  },
  sv = le('button', {
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
    [`&.${iv.disabled}`]: {
      pointerEvents: 'none',
      // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
  }),
  mc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        focusRipple: m = !1,
        focusVisibleClassName: y,
        LinkComponent: g = 'a',
        onBlur: h,
        onClick: v,
        onContextMenu: O,
        onDragLeave: C,
        onFocus: E,
        onFocusVisible: x,
        onKeyDown: f,
        onKeyUp: S,
        onMouseDown: R,
        onMouseLeave: A,
        onMouseUp: j,
        onTouchEnd: w,
        onTouchMove: I,
        onTouchStart: G,
        tabIndex: z = 0,
        TouchRippleProps: _,
        touchRippleRef: D,
        type: W,
        ...re
      } = r,
      L = b.useRef(null),
      F = b.useRef(null),
      $ = rt(F, D),
      { isFocusVisibleRef: B, onFocus: Z, onBlur: U, ref: Y } = xl(),
      [X, ie] = b.useState(!1);
    d && X && ie(!1),
      b.useImperativeHandle(
        i,
        () => ({
          focusVisible: () => {
            ie(!0), L.current.focus();
          },
        }),
        [],
      );
    const [ee, ae] = b.useState(!1);
    b.useEffect(() => {
      ae(!0);
    }, []);
    const ue = ee && !u && !d;
    b.useEffect(() => {
      X && m && !u && ee && F.current.pulsate();
    }, [u, m, X, ee]);
    function de(se, $e, H = p) {
      return pt((ye) => ($e && $e(ye), !H && F.current && F.current[se](ye), !0));
    }
    const me = de('start', R),
      M = de('stop', O),
      Te = de('stop', C),
      Q = de('stop', j),
      q = de('stop', (se) => {
        X && se.preventDefault(), A && A(se);
      }),
      Ce = de('start', G),
      pe = de('stop', w),
      Ne = de('stop', I),
      Le = de(
        'stop',
        (se) => {
          U(se), B.current === !1 && ie(!1), h && h(se);
        },
        !1,
      ),
      Je = pt((se) => {
        L.current || (L.current = se.currentTarget),
          Z(se),
          B.current === !0 && (ie(!0), x && x(se)),
          E && E(se);
      }),
      Xe = () => {
        const se = L.current;
        return c && c !== 'button' && !(se.tagName === 'A' && se.href);
      },
      Fe = b.useRef(!1),
      Ze = pt((se) => {
        m &&
          !Fe.current &&
          X &&
          F.current &&
          se.key === ' ' &&
          ((Fe.current = !0),
          F.current.stop(se, () => {
            F.current.start(se);
          })),
          se.target === se.currentTarget && Xe() && se.key === ' ' && se.preventDefault(),
          f && f(se),
          se.target === se.currentTarget &&
            Xe() &&
            se.key === 'Enter' &&
            !d &&
            (se.preventDefault(), v && v(se));
      }),
      te = pt((se) => {
        m &&
          se.key === ' ' &&
          F.current &&
          X &&
          !se.defaultPrevented &&
          ((Fe.current = !1),
          F.current.stop(se, () => {
            F.current.pulsate(se);
          })),
          S && S(se),
          v &&
            se.target === se.currentTarget &&
            Xe() &&
            se.key === ' ' &&
            !se.defaultPrevented &&
            v(se);
      });
    let ne = c;
    ne === 'button' && (re.href || re.to) && (ne = g);
    const xe = {};
    ne === 'button'
      ? ((xe.type = W === void 0 ? 'button' : W), (xe.disabled = d))
      : (!re.href && !re.to && (xe.role = 'button'), d && (xe['aria-disabled'] = d));
    const he = rt(o, Y, L);
    process.env.NODE_ENV !== 'production' &&
      b.useEffect(() => {
        ue &&
          !F.current &&
          console.error(
            [
              'MUI: The `component` prop provided to ButtonBase is invalid.',
              'Please make sure the children prop is rendered in this custom component.',
            ].join(`
`),
          );
      }, [ue]);
    const Ee = {
        ...r,
        centerRipple: a,
        component: c,
        disabled: d,
        disableRipple: u,
        disableTouchRipple: p,
        focusRipple: m,
        tabIndex: z,
        focusVisible: X,
      },
      _e = av(Ee);
    return /* @__PURE__ */ Ke(sv, {
      as: ne,
      className: be(_e.root, l),
      ownerState: Ee,
      onBlur: Le,
      onClick: v,
      onContextMenu: M,
      onFocus: Je,
      onKeyDown: Ze,
      onKeyUp: te,
      onMouseDown: me,
      onMouseLeave: q,
      onMouseUp: Q,
      onDragLeave: Te,
      onTouchEnd: pe,
      onTouchMove: Ne,
      onTouchStart: Ce,
      ref: he,
      tabIndex: d ? -1 : z,
      type: W,
      ...xe,
      ...re,
      children: [
        s,
        ue
          ? /* TouchRipple is only needed client-side, x2 boost on the server. */
            /* @__PURE__ */ N(nv, {
              ref: $,
              center: a,
              ..._,
            })
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (mc.propTypes = {
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
    component: ki,
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
const Jn = mc;
function lv(e) {
  return ke('MuiIconButton', e);
}
const cv = we('MuiIconButton', [
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
  uv = cv,
  dv = (e) => {
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
    return Ie(s, lv, t);
  },
  pv = le(Jn, {
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
        [`&.${uv.disabled}`]: {
          backgroundColor: 'transparent',
          color: (e.vars || e).palette.action.disabled,
        },
      };
    },
  ),
  hc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
      m = {
        ...r,
        edge: i,
        color: l,
        disabled: c,
        disableFocusRipple: d,
        size: u,
      },
      y = dv(m);
    return /* @__PURE__ */ N(pv, {
      className: be(y.root, s),
      centerRipple: !0,
      focusRipple: !d,
      disabled: c,
      ref: o,
      ownerState: m,
      ...p,
      children: a,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (hc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The icon to display.
     */
    children: _t(n.node, (e) =>
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
const aa = hc,
  fv = kn(
    /* @__PURE__ */ N('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  );
function mv(e) {
  return ke('MuiAppBar', e);
}
we('MuiAppBar', [
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
const hv = (e) => {
    const { color: t, position: o, classes: r } = e,
      i = {
        root: ['root', `color${J(t)}`, `position${J(o)}`],
      };
    return Ie(i, mv, r);
  },
  Wo = (e, t) => (e ? `${e == null ? void 0 : e.replace(')', '')}, ${t})` : t),
  bv = le(Nn, {
    name: 'MuiAppBar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, t[`position${J(o.position)}`], t[`color${J(o.color)}`]];
    },
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[900];
    return {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box',
      // Prevent padding issue with the Modal and fixed positioned AppBar.
      flexShrink: 0,
      ...(t.position === 'fixed' && {
        position: 'fixed',
        zIndex: (e.vars || e).zIndex.appBar,
        top: 0,
        left: 'auto',
        right: 0,
        '@media print': {
          // Prevent the app bar to be visible on each printed page.
          position: 'absolute',
        },
      }),
      ...(t.position === 'absolute' && {
        position: 'absolute',
        zIndex: (e.vars || e).zIndex.appBar,
        top: 0,
        left: 'auto',
        right: 0,
      }),
      ...(t.position === 'sticky' && {
        // ⚠️ sticky is not supported by IE11.
        position: 'sticky',
        zIndex: (e.vars || e).zIndex.appBar,
        top: 0,
        left: 'auto',
        right: 0,
      }),
      ...(t.position === 'static' && {
        position: 'static',
      }),
      ...(t.position === 'relative' && {
        position: 'relative',
      }),
      ...(!e.vars && {
        ...(t.color === 'default' && {
          backgroundColor: o,
          color: e.palette.getContrastText(o),
        }),
        ...(t.color &&
          t.color !== 'default' &&
          t.color !== 'inherit' &&
          t.color !== 'transparent' && {
            backgroundColor: e.palette[t.color].main,
            color: e.palette[t.color].contrastText,
          }),
        ...(t.color === 'inherit' && {
          color: 'inherit',
        }),
        ...(e.palette.mode === 'dark' &&
          !t.enableColorOnDark && {
            backgroundColor: null,
            color: null,
          }),
        ...(t.color === 'transparent' && {
          backgroundColor: 'transparent',
          color: 'inherit',
          ...(e.palette.mode === 'dark' && {
            backgroundImage: 'none',
          }),
        }),
      }),
      ...(e.vars && {
        ...(t.color === 'default' && {
          '--AppBar-background': t.enableColorOnDark
            ? e.vars.palette.AppBar.defaultBg
            : Wo(e.vars.palette.AppBar.darkBg, e.vars.palette.AppBar.defaultBg),
          '--AppBar-color': t.enableColorOnDark
            ? e.vars.palette.text.primary
            : Wo(e.vars.palette.AppBar.darkColor, e.vars.palette.text.primary),
        }),
        ...(t.color &&
          !t.color.match(/^(default|inherit|transparent)$/) && {
            '--AppBar-background': t.enableColorOnDark
              ? e.vars.palette[t.color].main
              : Wo(e.vars.palette.AppBar.darkBg, e.vars.palette[t.color].main),
            '--AppBar-color': t.enableColorOnDark
              ? e.vars.palette[t.color].contrastText
              : Wo(e.vars.palette.AppBar.darkColor, e.vars.palette[t.color].contrastText),
          }),
        backgroundColor: 'var(--AppBar-background)',
        color: t.color === 'inherit' ? 'inherit' : 'var(--AppBar-color)',
        ...(t.color === 'transparent' && {
          backgroundImage: 'none',
          backgroundColor: 'transparent',
          color: 'inherit',
        }),
      }),
    };
  }),
  bc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
        props: t,
        name: 'MuiAppBar',
      }),
      {
        className: i,
        color: a = 'primary',
        enableColorOnDark: s = !1,
        position: l = 'fixed',
        ...c
      } = r,
      d = {
        ...r,
        color: a,
        position: l,
        enableColorOnDark: s,
      },
      u = hv(d);
    return /* @__PURE__ */ N(bv, {
      square: !0,
      component: 'header',
      ownerState: d,
      elevation: 4,
      className: be(u.root, i, l === 'fixed' && 'mui-fixed'),
      ref: o,
      ...c,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (bc.propTypes = {
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
const vv = bc,
  gv = le(lb, {
    name: 'MuiPopper',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  vc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r;
    const i = Ul(),
      a = Me({
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
        keepMounted: m,
        modifiers: y,
        open: g,
        placement: h,
        popperOptions: v,
        popperRef: O,
        transition: C,
        slots: E,
        slotProps: x,
        ...f
      } = a,
      S = (r = E == null ? void 0 : E.root) != null ? r : c == null ? void 0 : c.Root,
      R = {
        anchorEl: s,
        container: u,
        disablePortal: p,
        keepMounted: m,
        modifiers: y,
        open: g,
        placement: h,
        popperOptions: v,
        popperRef: O,
        transition: C,
        ...f,
      };
    return /* @__PURE__ */ N(gv, {
      as: l,
      direction: i == null ? void 0 : i.direction,
      slots: {
        root: S,
      },
      slotProps: x ?? d,
      ...R,
      ref: o,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (vc.propTypes = {
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
    anchorEl: n.oneOfType([Ht, n.object, n.func]),
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
    container: n.oneOfType([Ht, n.func]),
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
const gc = vc;
function yv(e) {
  return ke('MuiListSubheader', e);
}
we('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const xv = (e) => {
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
    return Ie(s, yv, t);
  },
  Ev = le('li', {
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
  sa = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
      m = xv(p);
    return /* @__PURE__ */ N(Ev, {
      as: s,
      className: be(m.root, i),
      ref: o,
      ownerState: p,
      ...u,
    });
  });
sa.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (sa.propTypes = {
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
const Ov = sa,
  Tv = kn(
    /* @__PURE__ */ N('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function Cv(e) {
  return ke('MuiChip', e);
}
const Rv = we('MuiChip', [
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
  Ae = Rv,
  Sv = (e) => {
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
    return Ie(d, Cv, t);
  },
  wv = le('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: i, clickable: a, onDelete: s, size: l, variant: c } = o;
      return [
        {
          [`& .${Ae.avatar}`]: t.avatar,
        },
        {
          [`& .${Ae.avatar}`]: t[`avatar${J(l)}`],
        },
        {
          [`& .${Ae.avatar}`]: t[`avatarColor${J(r)}`],
        },
        {
          [`& .${Ae.icon}`]: t.icon,
        },
        {
          [`& .${Ae.icon}`]: t[`icon${J(l)}`],
        },
        {
          [`& .${Ae.icon}`]: t[`iconColor${J(i)}`],
        },
        {
          [`& .${Ae.deleteIcon}`]: t.deleteIcon,
        },
        {
          [`& .${Ae.deleteIcon}`]: t[`deleteIcon${J(l)}`],
        },
        {
          [`& .${Ae.deleteIcon}`]: t[`deleteIconColor${J(r)}`],
        },
        {
          [`& .${Ae.deleteIcon}`]: t[`deleteIcon${J(c)}Color${J(r)}`],
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
        [`&.${Ae.disabled}`]: {
          opacity: (e.vars || e).palette.action.disabledOpacity,
          pointerEvents: 'none',
        },
        [`& .${Ae.avatar}`]: {
          marginLeft: 5,
          marginRight: -6,
          width: 24,
          height: 24,
          color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : o,
          fontSize: e.typography.pxToRem(12),
        },
        [`& .${Ae.avatarColorPrimary}`]: {
          color: (e.vars || e).palette.primary.contrastText,
          backgroundColor: (e.vars || e).palette.primary.dark,
        },
        [`& .${Ae.avatarColorSecondary}`]: {
          color: (e.vars || e).palette.secondary.contrastText,
          backgroundColor: (e.vars || e).palette.secondary.dark,
        },
        [`& .${Ae.avatarSmall}`]: {
          marginLeft: 4,
          marginRight: -4,
          width: 18,
          height: 18,
          fontSize: e.typography.pxToRem(10),
        },
        [`& .${Ae.icon}`]: {
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
        [`& .${Ae.deleteIcon}`]: {
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
          [`&.${Ae.focusVisible}`]: {
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
            [`&.${Ae.focusVisible}`]: {
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
        [`&.${Ae.focusVisible}`]: {
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
          [`&:hover, &.${Ae.focusVisible}`]: {
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
        [`&.${Ae.clickable}:hover`]: {
          backgroundColor: (e.vars || e).palette.action.hover,
        },
        [`&.${Ae.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette.action.focus,
        },
        [`& .${Ae.avatar}`]: {
          marginLeft: 4,
        },
        [`& .${Ae.avatarSmall}`]: {
          marginLeft: 2,
        },
        [`& .${Ae.icon}`]: {
          marginLeft: 4,
        },
        [`& .${Ae.iconSmall}`]: {
          marginLeft: 2,
        },
        [`& .${Ae.deleteIcon}`]: {
          marginRight: 5,
        },
        [`& .${Ae.deleteIconSmall}`]: {
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
          [`&.${Ae.clickable}:hover`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                  e.vars.palette.action.hoverOpacity
                })`
              : Ye(e.palette[t.color].main, e.palette.action.hoverOpacity),
          },
          [`&.${Ae.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                  e.vars.palette.action.focusOpacity
                })`
              : Ye(e.palette[t.color].main, e.palette.action.focusOpacity),
          },
          [`& .${Ae.deleteIcon}`]: {
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
  $v = le('span', {
    name: 'MuiChip',
    slot: 'Label',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { size: r } = o;
      return [t.label, t[`label${J(r)}`]];
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
function Fs(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const yc = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const r = Me({
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
      label: m,
      onClick: y,
      onDelete: g,
      onKeyDown: h,
      onKeyUp: v,
      size: O = 'medium',
      variant: C = 'filled',
      tabIndex: E,
      skipFocusWhenDisabled: x = !1,
      // TODO v6: Rename to `focusableWhenDisabled`.
      ...f
    } = r,
    S = b.useRef(null),
    R = rt(S, o),
    A = (F) => {
      F.stopPropagation(), g && g(F);
    },
    j = (F) => {
      F.currentTarget === F.target && Fs(F) && F.preventDefault(), h && h(F);
    },
    w = (F) => {
      F.currentTarget === F.target &&
        (g && Fs(F) ? g(F) : F.key === 'Escape' && S.current && S.current.blur()),
        v && v(F);
    },
    I = s !== !1 && y ? !0 : s,
    G = I || g ? Jn : c || 'div',
    z = {
      ...r,
      component: G,
      disabled: u,
      size: O,
      color: l,
      iconColor: /* @__PURE__ */ (b.isValidElement(p) && p.props.color) || l,
      onDelete: !!g,
      clickable: I,
      variant: C,
    },
    _ = Sv(z),
    D =
      G === Jn
        ? {
            component: c || 'div',
            focusVisibleClassName: _.focusVisible,
            ...(g && {
              disableRipple: !0,
            }),
          }
        : {};
  let W = null;
  g &&
    (W =
      d && /* @__PURE__ */ b.isValidElement(d)
        ? /* @__PURE__ */ b.cloneElement(d, {
            className: be(d.props.className, _.deleteIcon),
            onClick: A,
          })
        : /* @__PURE__ */ N(Tv, {
            className: be(_.deleteIcon),
            onClick: A,
          }));
  let re = null;
  i &&
    /* @__PURE__ */ b.isValidElement(i) &&
    (re = /* @__PURE__ */ b.cloneElement(i, {
      className: be(_.avatar, i.props.className),
    }));
  let L = null;
  return (
    p &&
      /* @__PURE__ */ b.isValidElement(p) &&
      (L = /* @__PURE__ */ b.cloneElement(p, {
        className: be(_.icon, p.props.className),
      })),
    process.env.NODE_ENV !== 'production' &&
      re &&
      L &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    /* @__PURE__ */ Ke(wv, {
      as: G,
      className: be(_.root, a),
      disabled: I && u ? !0 : void 0,
      onClick: y,
      onKeyDown: j,
      onKeyUp: w,
      ref: R,
      tabIndex: x && u ? -1 : E,
      ownerState: z,
      ...D,
      ...f,
      children: [
        re || L,
        /* @__PURE__ */ N($v, {
          className: be(_.label),
          ownerState: z,
          children: m,
        }),
        W,
      ],
    })
  );
});
process.env.NODE_ENV !== 'production' &&
  (yc.propTypes = {
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
    children: bd,
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
const kv = yc;
function eo({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, i) => ((r[i] = e[i]), o && typeof e[i] > 'u' && (r[i] = o[i]), r), {});
}
const xc = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== 'production' && (xc.displayName = 'FormControlContext');
const la = xc;
function Pn() {
  return b.useContext(la);
}
function Ec(e) {
  return /* @__PURE__ */ N(Wl, {
    ...e,
    defaultTheme: Ar,
    themeId: hr,
  });
}
process.env.NODE_ENV !== 'production' &&
  (Ec.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The styles you want to apply globally.
     */
    styles: n.oneOfType([n.array, n.func, n.number, n.object, n.string, n.bool]),
  });
function zs(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function pr(e, t = !1) {
  return (
    e && ((zs(e.value) && e.value !== '') || (t && zs(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Nv(e) {
  return e.startAdornment;
}
function Pv(e) {
  return ke('MuiInputBase', e);
}
const Iv = we('MuiInputBase', [
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
  Rt = Iv,
  zr = (e, t) => {
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
  Br = (e, t) => {
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
  Mv = (e) => {
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
        size: m,
        startAdornment: y,
        type: g,
      } = e,
      h = {
        root: [
          'root',
          `color${J(o)}`,
          r && 'disabled',
          i && 'error',
          c && 'fullWidth',
          s && 'focused',
          l && 'formControl',
          m === 'small' && 'sizeSmall',
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
          m === 'small' && 'inputSizeSmall',
          d && 'inputHiddenLabel',
          y && 'inputAdornedStart',
          a && 'inputAdornedEnd',
          p && 'readOnly',
        ],
      };
    return Ie(h, Pv, t);
  },
  Vr = le('div', {
    name: 'MuiInputBase',
    slot: 'Root',
    overridesResolver: zr,
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
  Ur = le('input', {
    name: 'MuiInputBase',
    slot: 'Input',
    overridesResolver: Br,
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
  _v = /* @__PURE__ */ N(Ec, {
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
  Oc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r;
    const i = Me({
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
        defaultValue: m,
        disabled: y,
        disableInjectingGlobalStyles: g,
        endAdornment: h,
        error: v,
        fullWidth: O = !1,
        id: C,
        inputComponent: E = 'input',
        inputProps: x = {},
        inputRef: f,
        margin: S,
        maxRows: R,
        minRows: A,
        multiline: j = !1,
        name: w,
        onBlur: I,
        onChange: G,
        onClick: z,
        onFocus: _,
        onKeyDown: D,
        onKeyUp: W,
        placeholder: re,
        readOnly: L,
        renderSuffix: F,
        rows: $,
        size: B,
        slotProps: Z = {},
        slots: U = {},
        startAdornment: Y,
        type: X = 'text',
        value: ie,
        ...ee
      } = i,
      ae = x.value != null ? x.value : ie,
      { current: ue } = b.useRef(ae != null),
      de = b.useRef(),
      me = b.useCallback((H) => {
        process.env.NODE_ENV !== 'production' &&
          H &&
          H.nodeName !== 'INPUT' &&
          !H.focus &&
          console.error(
            [
              'MUI: You have provided a `inputComponent` to the input component',
              'that does not correctly handle the `ref` prop.',
              'Make sure the `ref` prop is called with a HTMLInputElement.',
            ].join(`
`),
          );
      }, []),
      M = rt(de, f, x.ref, me),
      [Te, Q] = b.useState(!1),
      q = Pn();
    process.env.NODE_ENV !== 'production' &&
      b.useEffect(() => {
        if (q) return q.registerEffect();
      }, [q]);
    const Ce = eo({
      props: i,
      muiFormControl: q,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (Ce.focused = q ? q.focused : Te),
      b.useEffect(() => {
        !q && y && Te && (Q(!1), I && I());
      }, [q, y, Te, I]);
    const pe = q && q.onFilled,
      Ne = q && q.onEmpty,
      Le = b.useCallback(
        (H) => {
          pr(H) ? pe && pe() : Ne && Ne();
        },
        [pe, Ne],
      );
    nn(() => {
      ue &&
        Le({
          value: ae,
        });
    }, [ae, Le, ue]);
    const Je = (H) => {
        if (Ce.disabled) {
          H.stopPropagation();
          return;
        }
        _ && _(H), x.onFocus && x.onFocus(H), q && q.onFocus ? q.onFocus(H) : Q(!0);
      },
      Xe = (H) => {
        I && I(H), x.onBlur && x.onBlur(H), q && q.onBlur ? q.onBlur(H) : Q(!1);
      },
      Fe = (H, ...ye) => {
        if (!ue) {
          const Re = H.target || de.current;
          if (Re == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : mn(1),
            );
          Le({
            value: Re.value,
          });
        }
        x.onChange && x.onChange(H, ...ye), G && G(H, ...ye);
      };
    b.useEffect(() => {
      Le(de.current);
    }, []);
    const Ze = (H) => {
      de.current && H.currentTarget === H.target && de.current.focus(), z && !Ce.disabled && z(H);
    };
    let te = E,
      ne = x;
    j &&
      te === 'input' &&
      ($
        ? (process.env.NODE_ENV !== 'production' &&
            (A || R) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (ne = {
            type: void 0,
            minRows: $,
            maxRows: $,
            ...ne,
          }))
        : (ne = {
            type: void 0,
            maxRows: R,
            minRows: A,
            ...ne,
          }),
      (te = kb));
    const xe = (H) => {
      Le(
        H.animationName === 'mui-auto-fill-cancel'
          ? de.current
          : {
              value: 'x',
            },
      );
    };
    b.useEffect(() => {
      q && q.setAdornedStart(!!Y);
    }, [q, Y]);
    const he = {
        ...i,
        color: Ce.color || 'primary',
        disabled: Ce.disabled,
        endAdornment: h,
        error: Ce.error,
        focused: Ce.focused,
        formControl: q,
        fullWidth: O,
        hiddenLabel: Ce.hiddenLabel,
        multiline: j,
        size: Ce.size,
        startAdornment: Y,
        type: X,
      },
      Ee = Mv(he),
      _e = U.root || u.Root || Vr,
      se = Z.root || p.root || {},
      $e = U.input || u.Input || Ur;
    return (
      (ne = {
        ...ne,
        ...((r = Z.input) != null ? r : p.input),
      }),
      /* @__PURE__ */ Ke(b.Fragment, {
        children: [
          !g && _v,
          /* @__PURE__ */ Ke(_e, {
            ...se,
            ...(!fn(_e) && {
              ownerState: {
                ...he,
                ...se.ownerState,
              },
            }),
            ref: o,
            onClick: Ze,
            ...ee,
            className: be(Ee.root, se.className, c, L && 'MuiInputBase-readOnly'),
            children: [
              Y,
              /* @__PURE__ */ N(la.Provider, {
                value: null,
                children: /* @__PURE__ */ N($e, {
                  ownerState: he,
                  'aria-invalid': Ce.error,
                  'aria-describedby': a,
                  autoComplete: s,
                  autoFocus: l,
                  defaultValue: m,
                  disabled: Ce.disabled,
                  id: C,
                  onAnimationStart: xe,
                  name: w,
                  placeholder: re,
                  readOnly: L,
                  required: Ce.required,
                  rows: $,
                  value: ae,
                  onKeyDown: D,
                  onKeyUp: W,
                  type: X,
                  ...ne,
                  ...(!fn($e) && {
                    as: te,
                    ownerState: {
                      ...he,
                      ...ne.ownerState,
                    },
                  }),
                  ref: M,
                  className: be(Ee.input, ne.className, L && 'MuiInputBase-readOnly'),
                  onBlur: Xe,
                  onChange: Fe,
                  onFocus: Je,
                }),
              }),
              h,
              F
                ? F({
                    ...Ce,
                    startAdornment: Y,
                  })
                : null,
            ],
          }),
        ],
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Oc.propTypes = {
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
    inputComponent: ki,
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
const ca = Oc;
function Av(e) {
  return ke('MuiInput', e);
}
const Dv = {
    ...Rt,
    ...we('MuiInput', ['root', 'underline', 'input']),
  },
  pn = Dv;
function jv(e) {
  return ke('MuiOutlinedInput', e);
}
const Lv = {
    ...Rt,
    ...we('MuiOutlinedInput', ['root', 'notchedOutline', 'input']),
  },
  Zt = Lv;
function Fv(e) {
  return ke('MuiFilledInput', e);
}
const zv = {
    ...Rt,
    ...we('MuiFilledInput', ['root', 'underline', 'input']),
  },
  St = zv,
  Tc = kn(
    /* @__PURE__ */ N('path', {
      d: 'M7 10l5 5 5-5z',
    }),
    'ArrowDropDown',
  );
function Bv(e) {
  return ke('MuiAutocomplete', e);
}
const Vv = we('MuiAutocomplete', [
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
  Pe = Vv;
var Bs, Vs;
const Uv = (e) => {
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
        tag: ['tag', `tagSize${J(u)}`],
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
    return Ie(p, Bv, t);
  },
  Wv = le('div', {
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
          [`& .${Pe.tag}`]: t[`tagSize${J(l)}`],
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
  })(({ ownerState: e }) => ({
    [`&.${Pe.focused} .${Pe.clearIndicator}`]: {
      visibility: 'visible',
    },
    /* Avoid double tap issue on iOS */
    '@media (pointer: fine)': {
      [`&:hover .${Pe.clearIndicator}`]: {
        visibility: 'visible',
      },
    },
    ...(e.fullWidth && {
      width: '100%',
    }),
    [`& .${Pe.tag}`]: {
      margin: 3,
      maxWidth: 'calc(100% - 6px)',
      ...(e.size === 'small' && {
        margin: 2,
        maxWidth: 'calc(100% - 4px)',
      }),
    },
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
    [`& .${pn.root}`]: {
      paddingBottom: 1,
      '& .MuiInput-input': {
        padding: '4px 4px 4px 0px',
      },
    },
    [`& .${pn.root}.${Rt.sizeSmall}`]: {
      [`& .${pn.input}`]: {
        padding: '2px 4px 3px 0',
      },
    },
    [`& .${Zt.root}`]: {
      padding: 9,
      [`.${Pe.hasPopupIcon}&, .${Pe.hasClearIcon}&`]: {
        paddingRight: 26 + 4 + 9,
      },
      [`.${Pe.hasPopupIcon}.${Pe.hasClearIcon}&`]: {
        paddingRight: 52 + 4 + 9,
      },
      [`& .${Pe.input}`]: {
        padding: '7.5px 4px 7.5px 5px',
      },
      [`& .${Pe.endAdornment}`]: {
        right: 9,
      },
    },
    [`& .${Zt.root}.${Rt.sizeSmall}`]: {
      // Don't specify paddingRight, as it overrides the default value set when there is only
      // one of the popup or clear icon as the specificity is equal so the latter one wins
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 6,
      [`& .${Pe.input}`]: {
        padding: '2.5px 4px 2.5px 8px',
      },
    },
    [`& .${St.root}`]: {
      paddingTop: 19,
      paddingLeft: 8,
      [`.${Pe.hasPopupIcon}&, .${Pe.hasClearIcon}&`]: {
        paddingRight: 26 + 4 + 9,
      },
      [`.${Pe.hasPopupIcon}.${Pe.hasClearIcon}&`]: {
        paddingRight: 52 + 4 + 9,
      },
      [`& .${St.input}`]: {
        padding: '7px 4px',
      },
      [`& .${Pe.endAdornment}`]: {
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
      [`& .${Pe.input}`]: {
        paddingTop: 16,
        paddingBottom: 17,
      },
    },
    [`& .${St.root}.${Rt.hiddenLabel}.${Rt.sizeSmall}`]: {
      [`& .${Pe.input}`]: {
        paddingTop: 8,
        paddingBottom: 9,
      },
    },
    [`& .${Pe.input}`]: {
      flexGrow: 1,
      textOverflow: 'ellipsis',
      opacity: 0,
      ...(e.inputFocused && {
        opacity: 1,
      }),
    },
  })),
  Hv = le('div', {
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
  qv = le(aa, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({
    marginRight: -2,
    padding: 4,
    visibility: 'hidden',
  }),
  Yv = le(aa, {
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
  Kv = le(gc, {
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
  })(({ theme: e, ownerState: t }) => ({
    zIndex: (e.vars || e).zIndex.modal,
    ...(t.disablePortal && {
      position: 'absolute',
    }),
  })),
  Gv = le(Nn, {
    name: 'MuiAutocomplete',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })(({ theme: e }) => ({
    ...e.typography.body1,
    overflow: 'auto',
  })),
  Xv = le('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  Jv = le('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  Zv = le('div', {
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
          : Ye(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${Pe.focused}`]: {
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
        [`&.${Pe.focusVisible}`]: {
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
  Qv = le(Ov, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({
    backgroundColor: (e.vars || e).palette.background.paper,
    top: -8,
  })),
  eg = le('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({
    padding: 0,
    [`& .${Pe.option}`]: {
      paddingLeft: 24,
    },
  }),
  Cc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Me({
        props: t,
        name: 'MuiAutocomplete',
      }),
      {
        autoComplete: c = !1,
        autoHighlight: d = !1,
        autoSelect: u = !1,
        blurOnSelect: p = !1,
        ChipProps: m,
        className: y,
        clearIcon: g = Bs ||
          (Bs = /* @__PURE__ */ N(fv, {
            fontSize: 'small',
          })),
        clearOnBlur: h = !l.freeSolo,
        clearOnEscape: v = !1,
        clearText: O = 'Clear',
        closeText: C = 'Close',
        componentsProps: E = {},
        defaultValue: x = l.multiple ? [] : null,
        disableClearable: f = !1,
        disableCloseOnSelect: S = !1,
        disabled: R = !1,
        disabledItemsFocusable: A = !1,
        disableListWrap: j = !1,
        disablePortal: w = !1,
        filterOptions: I,
        filterSelectedOptions: G = !1,
        forcePopupIcon: z = 'auto',
        freeSolo: _ = !1,
        fullWidth: D = !1,
        getLimitTagsText: W = (Oe) => `+${Oe}`,
        getOptionDisabled: re,
        getOptionLabel: L = (Oe) => {
          var ze;
          return (ze = Oe.label) != null ? ze : Oe;
        },
        isOptionEqualToValue: F,
        groupBy: $,
        handleHomeEndKeys: B = !l.freeSolo,
        id: Z,
        includeInputInList: U = !1,
        inputValue: Y,
        limitTags: X = -1,
        ListboxComponent: ie = 'ul',
        ListboxProps: ee,
        loading: ae = !1,
        loadingText: ue = 'Loading…',
        multiple: de = !1,
        noOptionsText: me = 'No options',
        onChange: M,
        onClose: Te,
        onHighlightChange: Q,
        onInputChange: q,
        onOpen: Ce,
        open: pe,
        openOnFocus: Ne = !1,
        openText: Le = 'Open',
        options: Je,
        PaperComponent: Xe = Nn,
        PopperComponent: Fe = gc,
        popupIcon: Ze = Vs || (Vs = /* @__PURE__ */ N(Tc, {})),
        readOnly: te = !1,
        renderGroup: ne,
        renderInput: xe,
        renderOption: he,
        renderTags: Ee,
        selectOnFocus: _e = !l.freeSolo,
        size: se = 'medium',
        slotProps: $e = {},
        value: H,
        ...ye
      } = l,
      {
        getRootProps: Re,
        getInputProps: ft,
        getInputLabelProps: ht,
        getPopupIndicatorProps: st,
        getClearProps: xt,
        getTagProps: Et,
        getListboxProps: Qe,
        getOptionProps: lt,
        value: ut,
        dirty: Yt,
        expanded: Kt,
        id: rn,
        popupOpen: Ot,
        focused: Gt,
        focusedTag: Xt,
        anchorEl: Tt,
        setAnchorEl: vn,
        inputValue: an,
        groupedOptions: Ct,
      } = Mb({
        ...l,
        componentName: 'Autocomplete',
      }),
      Ft = !f && !R && Yt && !te,
      Jt = (!_ || z === !0) && z !== !1,
      { onMouseDown: gn } = ft(),
      at = {
        ...l,
        disablePortal: w,
        expanded: Kt,
        focused: Gt,
        fullWidth: D,
        hasClearIcon: Ft,
        hasPopupIcon: Jt,
        inputFocused: Xt === -1,
        popupOpen: Ot,
        size: se,
      },
      T = Uv(at);
    let V;
    if (de && ut.length > 0) {
      const Oe = (ze) => ({
        className: T.tag,
        disabled: R,
        ...Et(ze),
      });
      Ee
        ? (V = Ee(ut, Oe, at))
        : (V = ut.map((ze, sn) =>
            /* @__PURE__ */ N(kv, {
              label: L(ze),
              size: se,
              ...Oe({
                index: sn,
              }),
              ...m,
            }),
          ));
    }
    if (X > -1 && Array.isArray(V)) {
      const Oe = V.length - X;
      !Gt &&
        Oe > 0 &&
        ((V = V.splice(0, X)),
        V.push(
          /* @__PURE__ */ N(
            'span',
            {
              className: T.tag,
              children: W(Oe),
            },
            V.length,
          ),
        ));
    }
    const k =
        ne ||
        ((Oe) =>
          /* @__PURE__ */ Ke(
            'li',
            {
              children: [
                /* @__PURE__ */ N(Qv, {
                  className: T.groupLabel,
                  ownerState: at,
                  component: 'div',
                  children: Oe.group,
                }),
                /* @__PURE__ */ N(eg, {
                  className: T.groupUl,
                  ownerState: at,
                  children: Oe.children,
                }),
              ],
            },
            Oe.key,
          )),
      K =
        he ||
        ((Oe, ze) =>
          /* @__PURE__ */ N('li', {
            ...Oe,
            children: L(ze),
          })),
      oe = (Oe, ze) => {
        const sn = lt({
          option: Oe,
          index: ze,
        });
        return K(
          {
            ...sn,
            className: T.option,
          },
          Oe,
          {
            selected: sn['aria-selected'],
            index: ze,
            inputValue: an,
          },
        );
      },
      fe = (r = $e.clearIndicator) != null ? r : E.clearIndicator,
      ve = (i = $e.paper) != null ? i : E.paper,
      ge = (a = $e.popper) != null ? a : E.popper,
      Se = (s = $e.popupIndicator) != null ? s : E.popupIndicator;
    return /* @__PURE__ */ Ke(b.Fragment, {
      children: [
        /* @__PURE__ */ N(Wv, {
          ref: o,
          className: be(T.root, y),
          ownerState: at,
          ...Re(ye),
          children: xe({
            id: rn,
            disabled: R,
            fullWidth: !0,
            size: se === 'small' ? 'small' : void 0,
            InputLabelProps: ht(),
            InputProps: {
              ref: vn,
              className: T.inputRoot,
              startAdornment: V,
              onClick: (Oe) => {
                Oe.target === Oe.currentTarget && gn(Oe);
              },
              ...((Ft || Jt) && {
                endAdornment: /* @__PURE__ */ Ke(Hv, {
                  className: T.endAdornment,
                  ownerState: at,
                  children: [
                    Ft
                      ? /* @__PURE__ */ N(qv, {
                          ...xt(),
                          'aria-label': O,
                          title: O,
                          ownerState: at,
                          ...fe,
                          className: be(T.clearIndicator, fe == null ? void 0 : fe.className),
                          children: g,
                        })
                      : null,
                    Jt
                      ? /* @__PURE__ */ N(Yv, {
                          ...st(),
                          disabled: R,
                          'aria-label': Ot ? C : Le,
                          title: Ot ? C : Le,
                          ownerState: at,
                          ...Se,
                          className: be(T.popupIndicator, Se == null ? void 0 : Se.className),
                          children: Ze,
                        })
                      : null,
                  ],
                }),
              }),
            },
            inputProps: {
              className: T.input,
              disabled: R,
              readOnly: te,
              ...ft(),
            },
          }),
        }),
        Tt
          ? /* @__PURE__ */ N(Kv, {
              as: Fe,
              disablePortal: w,
              style: {
                width: Tt ? Tt.clientWidth : null,
              },
              ownerState: at,
              role: 'presentation',
              anchorEl: Tt,
              open: Ot,
              ...ge,
              className: be(T.popper, ge == null ? void 0 : ge.className),
              children: /* @__PURE__ */ Ke(Gv, {
                ownerState: at,
                as: Xe,
                ...ve,
                className: be(T.paper, ve == null ? void 0 : ve.className),
                children: [
                  ae && Ct.length === 0
                    ? /* @__PURE__ */ N(Xv, {
                        className: T.loading,
                        ownerState: at,
                        children: ue,
                      })
                    : null,
                  Ct.length === 0 && !_ && !ae
                    ? /* @__PURE__ */ N(Jv, {
                        className: T.noOptions,
                        ownerState: at,
                        role: 'presentation',
                        onMouseDown: (Oe) => {
                          Oe.preventDefault();
                        },
                        children: me,
                      })
                    : null,
                  Ct.length > 0
                    ? /* @__PURE__ */ N(Zv, {
                        as: ie,
                        className: T.listbox,
                        ownerState: at,
                        ...Qe(),
                        ...ee,
                        children: Ct.map((Oe, ze) =>
                          $
                            ? k({
                                key: Oe.key,
                                group: Oe.group,
                                children: Oe.options.map((sn, zt) => oe(sn, Oe.index + zt)),
                              })
                            : oe(Oe, ze),
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
  (Cc.propTypes = {
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
    defaultValue: _t(n.any, (e) =>
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
    limitTags: mr,
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
    value: _t(n.any, (e) =>
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
const tg = Cc,
  ng = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
  },
  Rc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = cn(),
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
        onEntering: m,
        onExit: y,
        onExited: g,
        onExiting: h,
        style: v,
        timeout: O = i,
        // eslint-disable-next-line react/prop-types
        TransitionComponent: C = na,
        ...E
      } = t,
      x = b.useRef(null),
      f = rt(x, l.ref, o),
      S = (_) => (D) => {
        if (_) {
          const W = x.current;
          D === void 0 ? _(W) : _(W, D);
        }
      },
      R = S(m),
      A = S((_, D) => {
        ia(_);
        const W = Xn(
          {
            style: v,
            timeout: O,
            easing: c,
          },
          {
            mode: 'enter',
          },
        );
        (_.style.webkitTransition = r.transitions.create('opacity', W)),
          (_.style.transition = r.transitions.create('opacity', W)),
          u && u(_, D);
      }),
      j = S(p),
      w = S(h),
      I = S((_) => {
        const D = Xn(
          {
            style: v,
            timeout: O,
            easing: c,
          },
          {
            mode: 'exit',
          },
        );
        (_.style.webkitTransition = r.transitions.create('opacity', D)),
          (_.style.transition = r.transitions.create('opacity', D)),
          y && y(_);
      }),
      G = S(g);
    return /* @__PURE__ */ N(C, {
      appear: s,
      in: d,
      nodeRef: x,
      onEnter: A,
      onEntered: j,
      onEntering: R,
      onExit: I,
      onExited: G,
      onExiting: w,
      addEndListener: (_) => {
        a && a(x.current, _);
      },
      timeout: O,
      ...E,
      children: (_, D) =>
        /* @__PURE__ */ b.cloneElement(l, {
          style: {
            opacity: 0,
            visibility: _ === 'exited' && !d ? 'hidden' : void 0,
            ...ng[_],
            ...v,
            ...l.props.style,
          },
          ref: f,
          ...D,
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
    children: $n.isRequired,
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
const og = Rc;
function rg(e) {
  return ke('MuiBackdrop', e);
}
we('MuiBackdrop', ['root', 'invisible']);
const ig = (e) => {
    const { classes: t, invisible: o } = e;
    return Ie(
      {
        root: ['root', o && 'invisible'],
      },
      rg,
      t,
    );
  },
  ag = le('div', {
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
  Sc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a;
    const s = Me({
        props: t,
        name: 'MuiBackdrop',
      }),
      {
        children: l,
        className: c,
        component: d = 'div',
        components: u = {},
        componentsProps: p = {},
        invisible: m = !1,
        open: y,
        slotProps: g = {},
        slots: h = {},
        TransitionComponent: v = og,
        transitionDuration: O,
        ...C
      } = s,
      E = {
        ...s,
        component: d,
        invisible: m,
      },
      x = ig(E),
      f = (r = g.root) != null ? r : p.root;
    return /* @__PURE__ */ N(v, {
      in: y,
      timeout: O,
      ...C,
      children: /* @__PURE__ */ N(ag, {
        'aria-hidden': !0,
        ...f,
        as: (i = (a = h.root) != null ? a : u.Root) != null ? i : d,
        className: be(x.root, c, f == null ? void 0 : f.className),
        ownerState: {
          ...E,
          ...(f == null ? void 0 : f.ownerState),
        },
        classes: x,
        ref: o,
        children: l,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Sc.propTypes = {
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
const sg = Sc;
function lg(e) {
  return ke('MuiButton', e);
}
const cg = we('MuiButton', [
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
  Ho = cg,
  wc = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== 'production' && (wc.displayName = 'ButtonGroupContext');
const ug = wc,
  dg = (e) => {
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
      c = Ie(l, lg, s);
    return {
      ...s,
      // forward the focused, disabled, etc. classes to the ButtonBase
      ...c,
    };
  },
  $c = (e) => ({
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
  pg = le(Jn, {
    shouldForwardProp: (e) => Lt(e) || e === 'classes',
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
        [`&.${Ho.focusVisible}`]: {
          ...(t.variant === 'contained' && {
            boxShadow: (e.vars || e).shadows[6],
          }),
        },
        [`&.${Ho.disabled}`]: {
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
        [`&.${Ho.focusVisible}`]: {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        [`&.${Ho.disabled}`]: {
          boxShadow: 'none',
        },
      },
  ),
  fg = le('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${J(o.size)}`]];
    },
  })(({ ownerState: e }) => ({
    display: 'inherit',
    marginRight: 8,
    marginLeft: -4,
    ...(e.size === 'small' && {
      marginLeft: -2,
    }),
    ...$c(e),
  })),
  mg = le('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${J(o.size)}`]];
    },
  })(({ ownerState: e }) => ({
    display: 'inherit',
    marginRight: -4,
    marginLeft: 8,
    ...(e.size === 'small' && {
      marginRight: -2,
    }),
    ...$c(e),
  })),
  kc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = b.useContext(ug),
      i = Ii(r, t),
      a = Me({
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
        disableFocusRipple: m = !1,
        endIcon: y,
        focusVisibleClassName: g,
        fullWidth: h = !1,
        size: v = 'medium',
        startIcon: O,
        type: C,
        variant: E = 'text',
        ...x
      } = a,
      f = {
        ...a,
        color: l,
        component: c,
        disabled: u,
        disableElevation: p,
        disableFocusRipple: m,
        fullWidth: h,
        size: v,
        type: C,
        variant: E,
      },
      S = dg(f),
      R =
        O &&
        /* @__PURE__ */ N(fg, {
          className: S.startIcon,
          ownerState: f,
          children: O,
        }),
      A =
        y &&
        /* @__PURE__ */ N(mg, {
          className: S.endIcon,
          ownerState: f,
          children: y,
        });
    return /* @__PURE__ */ Ke(pg, {
      ownerState: f,
      className: be(r.className, S.root, d),
      component: c,
      disabled: u,
      focusRipple: !m,
      focusVisibleClassName: be(S.focusVisible, g),
      ref: o,
      type: C,
      ...x,
      classes: S,
      children: [R, s, A],
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
const hg = kc;
function bg(e) {
  return ke('PrivateSwitchBase', e);
}
we('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const vg = (e) => {
    const { classes: t, checked: o, disabled: r, edge: i } = e,
      a = {
        root: ['root', o && 'checked', r && 'disabled', i && `edge${J(i)}`],
        input: ['input'],
      };
    return Ie(a, bg, t);
  },
  gg = le(Jn)(({ ownerState: e }) => ({
    padding: 9,
    borderRadius: '50%',
    ...(e.edge === 'start' && {
      marginLeft: e.size === 'small' ? -3 : -12,
    }),
    ...(e.edge === 'end' && {
      marginRight: e.size === 'small' ? -3 : -12,
    }),
  })),
  yg = le('input')({
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
  Nc = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        id: m,
        inputProps: y,
        inputRef: g,
        name: h,
        onBlur: v,
        onChange: O,
        onFocus: C,
        readOnly: E,
        required: x = !1,
        tabIndex: f,
        type: S,
        value: R,
        ...A
      } = t,
      [j, w] = Cn({
        controlled: i,
        default: !!l,
        name: 'SwitchBase',
        state: 'checked',
      }),
      I = Pn(),
      G = (F) => {
        C && C(F), I && I.onFocus && I.onFocus(F);
      },
      z = (F) => {
        v && v(F), I && I.onBlur && I.onBlur(F);
      },
      _ = (F) => {
        if (F.nativeEvent.defaultPrevented) return;
        const $ = F.target.checked;
        w($), O && O(F, $);
      };
    let D = c;
    I && typeof D > 'u' && (D = I.disabled);
    const W = S === 'checkbox' || S === 'radio',
      re = {
        ...t,
        checked: j,
        disabled: D,
        disableFocusRipple: d,
        edge: u,
      },
      L = vg(re);
    return /* @__PURE__ */ Ke(gg, {
      component: 'span',
      className: be(L.root, s),
      centerRipple: !0,
      focusRipple: !d,
      disabled: D,
      tabIndex: null,
      role: void 0,
      onFocus: G,
      onBlur: z,
      ownerState: re,
      ref: o,
      ...A,
      children: [
        /* @__PURE__ */ N(yg, {
          autoFocus: r,
          checked: i,
          defaultChecked: l,
          className: L.input,
          disabled: D,
          id: W ? m : void 0,
          name: h,
          onChange: _,
          readOnly: E,
          ref: g,
          required: x,
          ownerState: re,
          tabIndex: f,
          type: S,
          ...(S === 'checkbox' && R === void 0
            ? {}
            : {
                value: R,
              }),
          ...y,
        }),
        j ? a : p,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Nc.propTypes = {
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
const Pc = Nc,
  xg = kn(
    /* @__PURE__ */ N('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  Eg = kn(
    /* @__PURE__ */ N('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  Og = kn(
    /* @__PURE__ */ N('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function Tg(e) {
  return ke('MuiCheckbox', e);
}
const Cg = we('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  oi = Cg,
  Rg = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      i = {
        root: ['root', o && 'indeterminate', `color${J(r)}`],
      },
      a = Ie(i, Tg, t);
    return {
      ...t,
      // forward the disabled and checked classes to the SwitchBase
      ...a,
    };
  },
  Sg = le(Pc, {
    shouldForwardProp: (e) => Lt(e) || e === 'classes',
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
      [`&.${oi.checked}, &.${oi.indeterminate}`]: {
        color: (e.vars || e).palette[t.color].main,
      },
      [`&.${oi.disabled}`]: {
        color: (e.vars || e).palette.action.disabled,
      },
    }),
  })),
  wg = /* @__PURE__ */ N(Eg, {}),
  $g = /* @__PURE__ */ N(xg, {}),
  kg = /* @__PURE__ */ N(Og, {}),
  Ic = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i;
    const a = Me({
        props: t,
        name: 'MuiCheckbox',
      }),
      {
        checkedIcon: s = wg,
        color: l = 'primary',
        icon: c = $g,
        indeterminate: d = !1,
        indeterminateIcon: u = kg,
        inputProps: p,
        size: m = 'medium',
        className: y,
        ...g
      } = a,
      h = d ? u : c,
      v = d ? u : s,
      O = {
        ...a,
        color: l,
        indeterminate: d,
        size: m,
      },
      C = Rg(O);
    return /* @__PURE__ */ N(Sg, {
      type: 'checkbox',
      inputProps: {
        'data-indeterminate': d,
        ...p,
      },
      icon: /* @__PURE__ */ b.cloneElement(h, {
        fontSize: (r = h.props.fontSize) != null ? r : m,
      }),
      checkedIcon: /* @__PURE__ */ b.cloneElement(v, {
        fontSize: (i = v.props.fontSize) != null ? i : m,
      }),
      ownerState: O,
      ref: o,
      className: be(C.root, y),
      ...g,
      classes: C,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Ic.propTypes = {
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
const Ng = Ic,
  Pg = le('div', {
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
  Ig = le(sg, {
    name: 'MuiModal',
    slot: 'Backdrop',
    overridesResolver: (e, t) => t.backdrop,
  })({
    zIndex: -1,
  }),
  Mc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s, l, c;
    const d = Me({
        name: 'MuiModal',
        props: t,
      }),
      {
        BackdropComponent: u = Ig,
        BackdropProps: p,
        classes: m,
        className: y,
        closeAfterTransition: g = !1,
        children: h,
        container: v,
        component: O,
        components: C = {},
        componentsProps: E = {},
        disableAutoFocus: x = !1,
        disableEnforceFocus: f = !1,
        disableEscapeKeyDown: S = !1,
        disablePortal: R = !1,
        disableRestoreFocus: A = !1,
        disableScrollLock: j = !1,
        hideBackdrop: w = !1,
        keepMounted: I = !1,
        onBackdropClick: G,
        onClose: z,
        open: _,
        slotProps: D,
        slots: W,
        // eslint-disable-next-line react/prop-types
        theme: re,
        ...L
      } = d,
      [F, $] = b.useState(!0),
      B = {
        container: v,
        closeAfterTransition: g,
        disableAutoFocus: x,
        disableEnforceFocus: f,
        disableEscapeKeyDown: S,
        disablePortal: R,
        disableRestoreFocus: A,
        disableScrollLock: j,
        hideBackdrop: w,
        keepMounted: I,
        onBackdropClick: G,
        onClose: z,
        open: _,
      },
      Z = {
        ...d,
        ...B,
        exited: F,
      },
      U = (r = (i = W == null ? void 0 : W.root) != null ? i : C.Root) != null ? r : Pg,
      Y = (a = (s = W == null ? void 0 : W.backdrop) != null ? s : C.Backdrop) != null ? a : u,
      X = (l = D == null ? void 0 : D.root) != null ? l : E.root,
      ie = (c = D == null ? void 0 : D.backdrop) != null ? c : E.backdrop;
    return /* @__PURE__ */ N(yb, {
      slots: {
        root: U,
        backdrop: Y,
      },
      slotProps: {
        root: () => ({
          ...bi(X, Z),
          ...(!fn(U) && {
            as: O,
            theme: re,
          }),
          className: be(
            y,
            X == null ? void 0 : X.className,
            m == null ? void 0 : m.root,
            !Z.open && Z.exited && (m == null ? void 0 : m.hidden),
          ),
        }),
        backdrop: () => ({
          ...p,
          ...bi(ie, Z),
          className: be(ie == null ? void 0 : ie.className, m == null ? void 0 : m.backdrop),
        }),
      },
      onTransitionEnter: () => $(!1),
      onTransitionExited: () => $(!0),
      ref: o,
      ...L,
      ...B,
      children: h,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Mc.propTypes = {
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
    children: $n.isRequired,
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
    container: n.oneOfType([Ht, n.func]),
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
const _c = Mc,
  Mg = we('MuiDivider', [
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
  Us = Mg;
function _g(e, t, o) {
  const r = t.getBoundingClientRect(),
    i = o && o.getBoundingClientRect(),
    a = ln(t);
  let s;
  if (t.fakeTransform) s = t.fakeTransform;
  else {
    const d = a.getComputedStyle(t);
    s = d.getPropertyValue('-webkit-transform') || d.getPropertyValue('transform');
  }
  let l = 0,
    c = 0;
  if (s && s !== 'none' && typeof s == 'string') {
    const d = s.split('(')[1].split(')')[0].split(',');
    (l = parseInt(d[4], 10)), (c = parseInt(d[5], 10));
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
function Ac(e) {
  return typeof e == 'function' ? e() : e;
}
function qo(e, t, o) {
  const r = Ac(o),
    i = _g(e, t, r);
  i && ((t.style.webkitTransform = i), (t.style.transform = i));
}
const Dc = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const r = cn(),
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
      container: d,
      direction: u = 'down',
      easing: p = i,
      in: m,
      onEnter: y,
      onEntered: g,
      onEntering: h,
      onExit: v,
      onExited: O,
      onExiting: C,
      style: E,
      timeout: x = a,
      // eslint-disable-next-line react/prop-types
      TransitionComponent: f = na,
      ...S
    } = t,
    R = b.useRef(null),
    A = rt(c.ref, R, o),
    j = (L) => (F) => {
      L && (F === void 0 ? L(R.current) : L(R.current, F));
    },
    w = j((L, F) => {
      qo(u, L, d), ia(L), y && y(L, F);
    }),
    I = j((L, F) => {
      const $ = Xn(
        {
          timeout: x,
          style: E,
          easing: p,
        },
        {
          mode: 'enter',
        },
      );
      (L.style.webkitTransition = r.transitions.create('-webkit-transform', {
        ...$,
      })),
        (L.style.transition = r.transitions.create('transform', {
          ...$,
        })),
        (L.style.webkitTransform = 'none'),
        (L.style.transform = 'none'),
        h && h(L, F);
    }),
    G = j(g),
    z = j(C),
    _ = j((L) => {
      const F = Xn(
        {
          timeout: x,
          style: E,
          easing: p,
        },
        {
          mode: 'exit',
        },
      );
      (L.style.webkitTransition = r.transitions.create('-webkit-transform', F)),
        (L.style.transition = r.transitions.create('transform', F)),
        qo(u, L, d),
        v && v(L);
    }),
    D = j((L) => {
      (L.style.webkitTransition = ''), (L.style.transition = ''), O && O(L);
    }),
    W = (L) => {
      s && s(R.current, L);
    },
    re = b.useCallback(() => {
      R.current && qo(u, R.current, d);
    }, [u, d]);
  return (
    b.useEffect(() => {
      if (m || u === 'down' || u === 'right') return;
      const L = Pi(() => {
          R.current && qo(u, R.current, d);
        }),
        F = ln(R.current);
      return (
        F.addEventListener('resize', L),
        () => {
          L.clear(), F.removeEventListener('resize', L);
        }
      );
    }, [u, m, d]),
    b.useEffect(() => {
      m || re();
    }, [m, re]),
    /* @__PURE__ */ N(f, {
      nodeRef: R,
      onEnter: w,
      onEntered: G,
      onEntering: I,
      onExit: _,
      onExited: D,
      onExiting: z,
      addEndListener: W,
      appear: l,
      in: m,
      timeout: x,
      ...S,
      children: (L, F) =>
        /* @__PURE__ */ b.cloneElement(c, {
          ref: A,
          style: {
            visibility: L === 'exited' && !m ? 'hidden' : void 0,
            ...E,
            ...c.props.style,
          },
          ...F,
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
    children: $n.isRequired,
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the container the Slide is transitioning from.
     */
    container: _t(n.oneOfType([Ht, n.func]), (e) => {
      if (e.open) {
        const t = Ac(e.container);
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
const Ag = Dc;
function Dg(e) {
  return ke('MuiDrawer', e);
}
we('MuiDrawer', [
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
const jc = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, (o.variant === 'permanent' || o.variant === 'persistent') && t.docked, t.modal];
  },
  jg = (e) => {
    const { classes: t, anchor: o, variant: r } = e,
      i = {
        root: ['root'],
        docked: [(r === 'permanent' || r === 'persistent') && 'docked'],
        modal: ['modal'],
        paper: ['paper', `paperAnchor${J(o)}`, r !== 'temporary' && `paperAnchorDocked${J(o)}`],
      };
    return Ie(i, Dg, t);
  },
  Lg = le(_c, {
    name: 'MuiDrawer',
    slot: 'Root',
    overridesResolver: jc,
  })(({ theme: e }) => ({
    zIndex: (e.vars || e).zIndex.drawer,
  })),
  Ws = le('div', {
    shouldForwardProp: Lt,
    name: 'MuiDrawer',
    slot: 'Docked',
    skipVariantsResolver: !1,
    overridesResolver: jc,
  })({
    flex: '0 0 auto',
  }),
  Fg = le(Nn, {
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
  })(({ theme: e, ownerState: t }) => ({
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
    ...(t.anchor === 'left' && {
      left: 0,
    }),
    ...(t.anchor === 'top' && {
      top: 0,
      left: 0,
      right: 0,
      height: 'auto',
      maxHeight: '100%',
    }),
    ...(t.anchor === 'right' && {
      right: 0,
    }),
    ...(t.anchor === 'bottom' && {
      top: 'auto',
      left: 0,
      bottom: 0,
      right: 0,
      height: 'auto',
      maxHeight: '100%',
    }),
    ...(t.anchor === 'left' &&
      t.variant !== 'temporary' && {
        borderRight: `1px solid ${(e.vars || e).palette.divider}`,
      }),
    ...(t.anchor === 'top' &&
      t.variant !== 'temporary' && {
        borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
      }),
    ...(t.anchor === 'right' &&
      t.variant !== 'temporary' && {
        borderLeft: `1px solid ${(e.vars || e).palette.divider}`,
      }),
    ...(t.anchor === 'bottom' &&
      t.variant !== 'temporary' && {
        borderTop: `1px solid ${(e.vars || e).palette.divider}`,
      }),
  })),
  Lc = {
    left: 'right',
    right: 'left',
    top: 'down',
    bottom: 'up',
  };
function zg(e) {
  return ['left', 'right'].indexOf(e) !== -1;
}
function Bg(e, t) {
  return e.direction === 'rtl' && zg(t) ? Lc[t] : t;
}
const Fc = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const r = Me({
      props: t,
      name: 'MuiDrawer',
    }),
    i = cn(),
    a = {
      enter: i.transitions.duration.enteringScreen,
      exit: i.transitions.duration.leavingScreen,
    },
    {
      anchor: s = 'left',
      BackdropProps: l,
      children: c,
      className: d,
      elevation: u = 16,
      hideBackdrop: p = !1,
      ModalProps: { BackdropProps: m, ...y } = {},
      onClose: g,
      open: h = !1,
      PaperProps: v = {},
      SlideProps: O,
      // eslint-disable-next-line react/prop-types
      TransitionComponent: C = Ag,
      transitionDuration: E = a,
      variant: x = 'temporary',
      ...f
    } = r,
    S = b.useRef(!1);
  b.useEffect(() => {
    S.current = !0;
  }, []);
  const R = Bg(i, s),
    j = {
      ...r,
      anchor: s,
      elevation: u,
      open: h,
      variant: x,
      ...f,
    },
    w = jg(j),
    I = /* @__PURE__ */ N(Fg, {
      elevation: x === 'temporary' ? u : 0,
      square: !0,
      ...v,
      className: be(w.paper, v.className),
      ownerState: j,
      children: c,
    });
  if (x === 'permanent')
    return /* @__PURE__ */ N(Ws, {
      className: be(w.root, w.docked, d),
      ownerState: j,
      ref: o,
      ...f,
      children: I,
    });
  const G = /* @__PURE__ */ N(C, {
    in: h,
    direction: Lc[R],
    timeout: E,
    appear: S.current,
    ...O,
    children: I,
  });
  return x === 'persistent'
    ? /* @__PURE__ */ N(Ws, {
        className: be(w.root, w.docked, d),
        ownerState: j,
        ref: o,
        ...f,
        children: G,
      })
    : /* @__PURE__ */ N(Lg, {
        BackdropProps: {
          ...l,
          ...m,
          transitionDuration: E,
        },
        className: be(w.root, w.modal, d),
        open: h,
        ownerState: j,
        onClose: g,
        hideBackdrop: p,
        ref: o,
        ...f,
        ...y,
        children: G,
      });
});
process.env.NODE_ENV !== 'production' &&
  (Fc.propTypes = {
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
    elevation: mr,
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
const Vg = Fc,
  Ug = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Ie(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Fv,
        t,
      );
    return {
      ...t,
      // forward classes to the InputBase
      ...i,
    };
  },
  Wg = le(Vr, {
    shouldForwardProp: (e) => Lt(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...zr(e, t), !o.disableUnderline && t.underline];
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
  Hg = le(Ur, {
    name: 'MuiFilledInput',
    slot: 'Input',
    overridesResolver: Br,
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
  ua = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Me({
        props: t,
        name: 'MuiFilledInput',
      }),
      {
        disableUnderline: c,
        components: d = {},
        componentsProps: u,
        fullWidth: p = !1,
        hiddenLabel: m,
        // declare here to prevent spreading to DOM
        inputComponent: y = 'input',
        multiline: g = !1,
        slotProps: h,
        slots: v = {},
        type: O = 'text',
        ...C
      } = l,
      E = {
        ...l,
        fullWidth: p,
        inputComponent: y,
        multiline: g,
        type: O,
      },
      x = Ug(l),
      f = {
        root: {
          ownerState: E,
        },
        input: {
          ownerState: E,
        },
      },
      S = h ?? u ? Mt(h ?? u, f) : f,
      R = (r = (i = v.root) != null ? i : d.Root) != null ? r : Wg,
      A = (a = (s = v.input) != null ? s : d.Input) != null ? a : Hg;
    return /* @__PURE__ */ N(ca, {
      slots: {
        root: R,
        input: A,
      },
      componentsProps: S,
      fullWidth: p,
      inputComponent: y,
      multiline: g,
      ref: o,
      type: O,
      ...C,
      classes: x,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ua.propTypes = {
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
ua.muiName = 'Input';
const zc = ua;
function qg(e) {
  return ke('MuiFormControl', e);
}
we('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const Yg = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      i = {
        root: ['root', o !== 'none' && `margin${J(o)}`, r && 'fullWidth'],
      };
    return Ie(i, qg, t);
  },
  Kg = le('div', {
    name: 'MuiFormControl',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) => ({
      ...t.root,
      ...t[`margin${J(e.margin)}`],
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
  Bc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        hiddenLabel: m = !1,
        margin: y = 'none',
        required: g = !1,
        size: h = 'medium',
        variant: v = 'outlined',
        ...O
      } = r,
      C = {
        ...r,
        color: s,
        component: l,
        disabled: c,
        error: d,
        fullWidth: p,
        hiddenLabel: m,
        margin: y,
        required: g,
        size: h,
        variant: v,
      },
      E = Yg(C),
      [x, f] = b.useState(() => {
        let z = !1;
        return (
          i &&
            b.Children.forEach(i, (_) => {
              if (!Xr(_, ['Input', 'Select'])) return;
              const D = Xr(_, ['Select']) ? _.props.input : _;
              D && Nv(D.props) && (z = !0);
            }),
          z
        );
      }),
      [S, R] = b.useState(() => {
        let z = !1;
        return (
          i &&
            b.Children.forEach(i, (_) => {
              Xr(_, ['Input', 'Select']) &&
                (pr(_.props, !0) || pr(_.props.inputProps, !0)) &&
                (z = !0);
            }),
          z
        );
      }),
      [A, j] = b.useState(!1);
    c && A && j(!1);
    const w = u !== void 0 && !c ? u : A;
    let I;
    if (process.env.NODE_ENV !== 'production') {
      const z = b.useRef(!1);
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
    const G = b.useMemo(
      () => ({
        adornedStart: x,
        setAdornedStart: f,
        color: s,
        disabled: c,
        error: d,
        filled: S,
        focused: w,
        fullWidth: p,
        hiddenLabel: m,
        size: h,
        onBlur: () => {
          j(!1);
        },
        onEmpty: () => {
          R(!1);
        },
        onFilled: () => {
          R(!0);
        },
        onFocus: () => {
          j(!0);
        },
        registerEffect: I,
        required: g,
        variant: v,
      }),
      [x, s, c, d, S, w, p, m, I, g, h, v],
    );
    return /* @__PURE__ */ N(la.Provider, {
      value: G,
      children: /* @__PURE__ */ N(Kg, {
        as: l,
        ownerState: C,
        className: be(E.root, a),
        ref: o,
        ...O,
        children: i,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Bc.propTypes = {
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
const Gg = Bc;
function Xg(e) {
  return ke('MuiFormHelperText', e);
}
const Jg = we('MuiFormHelperText', [
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
  Hs = Jg;
var qs;
const Zg = (e) => {
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
          r && `size${J(r)}`,
          o && 'contained',
          l && 'focused',
          s && 'filled',
          c && 'required',
        ],
      };
    return Ie(d, Xg, t);
  },
  Qg = le('p', {
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
  })(({ theme: e, ownerState: t }) => ({
    color: (e.vars || e).palette.text.secondary,
    ...e.typography.caption,
    textAlign: 'left',
    marginTop: 3,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    [`&.${Hs.disabled}`]: {
      color: (e.vars || e).palette.text.disabled,
    },
    [`&.${Hs.error}`]: {
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
  Vc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        required: m,
        variant: y,
        ...g
      } = r,
      h = Pn(),
      v = eo({
        props: r,
        muiFormControl: h,
        states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
      }),
      O = {
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
      C = Zg(O);
    return /* @__PURE__ */ N(Qg, {
      as: s,
      ownerState: O,
      className: be(C.root, a),
      ref: o,
      ...g,
      children:
        i === ' '
          ? // notranslate needed while Google Translate will not fix zero-width space issue
            qs ||
            (qs = /* @__PURE__ */ N('span', {
              className: 'notranslate',
              children: '​',
            }))
          : i,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Vc.propTypes = {
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
const ey = Vc;
function ty(e) {
  return ke('MuiFormLabel', e);
}
const ny = we('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  xo = ny,
  oy = (e) => {
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
    return Ie(c, ty, t);
  },
  ry = le('label', {
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
    [`&.${xo.focused}`]: {
      color: (e.vars || e).palette[t.color].main,
    },
    [`&.${xo.disabled}`]: {
      color: (e.vars || e).palette.text.disabled,
    },
    [`&.${xo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  iy = le('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({
    [`&.${xo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  Uc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        required: m,
        ...y
      } = r,
      g = Pn(),
      h = eo({
        props: r,
        muiFormControl: g,
        states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
      }),
      v = {
        ...r,
        color: h.color || 'primary',
        component: l,
        disabled: h.disabled,
        error: h.error,
        filled: h.filled,
        focused: h.focused,
        required: h.required,
      },
      O = oy(v);
    return /* @__PURE__ */ Ke(ry, {
      as: l,
      ownerState: v,
      className: be(O.root, a),
      ref: o,
      ...y,
      children: [
        i,
        h.required &&
          /* @__PURE__ */ Ke(iy, {
            ownerState: v,
            'aria-hidden': !0,
            className: O.asterisk,
            children: [' ', '*'],
          }),
      ],
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
const Wc = Uc,
  Hc = /* @__PURE__ */ b.createContext();
process.env.NODE_ENV !== 'production' && (Hc.displayName = 'GridContext');
const Ys = Hc;
function ay(e) {
  return ke('MuiGrid', e);
}
const sy = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ly = ['column-reverse', 'column', 'row-reverse', 'row'],
  cy = ['nowrap', 'wrap-reverse', 'wrap'],
  co = ['auto', !0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  ko = we('MuiGrid', [
    'root',
    'container',
    'item',
    'zeroMinWidth',
    // spacings
    ...sy.map((e) => `spacing-xs-${e}`),
    // direction values
    ...ly.map((e) => `direction-xs-${e}`),
    // wrap values
    ...cy.map((e) => `wrap-xs-${e}`),
    // grid sizes for all breakpoints
    ...co.map((e) => `grid-xs-${e}`),
    ...co.map((e) => `grid-sm-${e}`),
    ...co.map((e) => `grid-md-${e}`),
    ...co.map((e) => `grid-lg-${e}`),
    ...co.map((e) => `grid-xl-${e}`),
  ]);
function Un(e) {
  const t = parseFloat(e);
  return `${t}${String(e).replace(String(t), '') || 'px'}`;
}
function uy({ theme: e, ownerState: t }) {
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
      const s = Or({
          values: t.columns,
          breakpoints: e.breakpoints.values,
        }),
        l = typeof s == 'object' ? s[i] : s;
      if (l == null) return r;
      const c = `${Math.round((o / l) * 1e8) / 1e6}%`;
      let d = {};
      if (t.container && t.item && t.columnSpacing !== 0) {
        const u = e.spacing(t.columnSpacing);
        if (u !== '0px') {
          const p = `calc(${c} + ${Un(u)})`;
          d = {
            flexBasis: p,
            maxWidth: p,
          };
        }
      }
      a = {
        flexBasis: c,
        flexGrow: 0,
        maxWidth: c,
        ...d,
      };
    }
    return e.breakpoints.values[i] === 0 ? Object.assign(r, a) : (r[e.breakpoints.up(i)] = a), r;
  }, {});
}
function dy({ theme: e, ownerState: t }) {
  const o = Or({
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
          (i[`& > .${ko.item}`] = {
            maxWidth: 'none',
          }),
        i
      );
    },
  );
}
function qc({ breakpoints: e, values: t }) {
  let o = '';
  Object.keys(t).forEach((i) => {
    o === '' && t[i] !== 0 && (o = i);
  });
  const r = Object.keys(e).sort((i, a) => e[i] - e[a]);
  return r.slice(0, r.indexOf(o));
}
function py({ theme: e, ownerState: t }) {
  const { container: o, rowSpacing: r } = t;
  let i = {};
  if (o && r !== 0) {
    const a = Or({
      values: r,
      breakpoints: e.breakpoints.values,
    });
    let s;
    typeof a == 'object' &&
      (s = qc({
        breakpoints: e.breakpoints.values,
        values: a,
      })),
      (i = At(
        {
          theme: e,
        },
        a,
        (l, c) => {
          var d;
          const u = e.spacing(l);
          return u !== '0px'
            ? {
                marginTop: `-${Un(u)}`,
                [`& > .${ko.item}`]: {
                  paddingTop: Un(u),
                },
              }
            : (d = s) != null && d.includes(c)
            ? {}
            : {
                marginTop: 0,
                [`& > .${ko.item}`]: {
                  paddingTop: 0,
                },
              };
        },
      ));
  }
  return i;
}
function fy({ theme: e, ownerState: t }) {
  const { container: o, columnSpacing: r } = t;
  let i = {};
  if (o && r !== 0) {
    const a = Or({
      values: r,
      breakpoints: e.breakpoints.values,
    });
    let s;
    typeof a == 'object' &&
      (s = qc({
        breakpoints: e.breakpoints.values,
        values: a,
      })),
      (i = At(
        {
          theme: e,
        },
        a,
        (l, c) => {
          var d;
          const u = e.spacing(l);
          return u !== '0px'
            ? {
                width: `calc(100% + ${Un(u)})`,
                marginLeft: `-${Un(u)}`,
                [`& > .${ko.item}`]: {
                  paddingLeft: Un(u),
                },
              }
            : (d = s) != null && d.includes(c)
            ? {}
            : {
                width: '100%',
                marginLeft: 0,
                [`& > .${ko.item}`]: {
                  paddingLeft: 0,
                },
              };
        },
      ));
  }
  return i;
}
function my(e, t, o = {}) {
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
const hy = le('div', {
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
        breakpoints: d,
      } = o;
    let u = [];
    r && (u = my(s, d, t));
    const p = [];
    return (
      d.forEach((m) => {
        const y = o[m];
        y && p.push(t[`grid-${m}-${String(y)}`]);
      }),
      [
        t.root,
        r && t.container,
        a && t.item,
        c && t.zeroMinWidth,
        ...u,
        i !== 'row' && t[`direction-xs-${String(i)}`],
        l !== 'wrap' && t[`wrap-xs-${String(l)}`],
        ...p,
      ]
    );
  },
})(
  ({ ownerState: e }) => ({
    boxSizing: 'border-box',
    ...(e.container && {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    }),
    ...(e.item && {
      margin: 0,
      // For instance, it's useful when used with a `figure` element.
    }),
    ...(e.zeroMinWidth && {
      minWidth: 0,
    }),
    ...(e.wrap !== 'wrap' && {
      flexWrap: e.wrap,
    }),
  }),
  dy,
  py,
  fy,
  uy,
);
function by(e, t) {
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
const vy = (e) => {
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
    let d = [];
    o && (d = by(a, c));
    const u = [];
    c.forEach((m) => {
      const y = e[m];
      y && u.push(`grid-${m}-${String(y)}`);
    });
    const p = {
      root: [
        'root',
        o && 'container',
        i && 'item',
        l && 'zeroMinWidth',
        ...d,
        r !== 'row' && `direction-xs-${String(r)}`,
        s !== 'wrap' && `wrap-xs-${String(s)}`,
        ...u,
      ],
    };
    return Ie(p, ay, t);
  },
  Eo = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
        props: t,
        name: 'MuiGrid',
      }),
      { breakpoints: i } = cn(),
      a = Gf(r),
      {
        className: s,
        columns: l,
        columnSpacing: c,
        component: d = 'div',
        container: u = !1,
        direction: p = 'row',
        item: m = !1,
        rowSpacing: y,
        spacing: g = 0,
        wrap: h = 'wrap',
        zeroMinWidth: v = !1,
        ...O
      } = a,
      C = y || g,
      E = c || g,
      x = b.useContext(Ys),
      f = u ? l || 12 : x,
      S = {},
      R = {
        ...O,
      };
    i.keys.forEach((w) => {
      O[w] != null && ((S[w] = O[w]), delete R[w]);
    });
    const A = {
        ...a,
        columns: f,
        container: u,
        direction: p,
        item: m,
        rowSpacing: C,
        columnSpacing: E,
        wrap: h,
        zeroMinWidth: v,
        spacing: g,
        ...S,
        breakpoints: i.keys,
      },
      j = vy(A);
    return /* @__PURE__ */ N(Ys.Provider, {
      value: f,
      children: /* @__PURE__ */ N(hy, {
        ownerState: A,
        className: be(j.root, s),
        as: d,
        ref: o,
        ...R,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Eo.propTypes = {
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
  const e = fd('Grid', Eo);
  Eo['propTypes'] = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...Eo.propTypes,
    direction: e('container'),
    lg: e('item'),
    md: e('item'),
    sm: e('item'),
    spacing: e('container'),
    wrap: e('container'),
    xs: e('item'),
    zeroMinWidth: e('item'),
  };
}
const Yc = Eo;
function Ci(e) {
  return `scale(${e}, ${e ** 2})`;
}
const gy = {
    entering: {
      opacity: 1,
      transform: Ci(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
  },
  ri =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  da = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        onExited: m,
        onExiting: y,
        style: g,
        timeout: h = 'auto',
        // eslint-disable-next-line react/prop-types
        TransitionComponent: v = na,
        ...O
      } = t,
      C = b.useRef(),
      E = b.useRef(),
      x = cn(),
      f = b.useRef(null),
      S = rt(f, a.ref, o),
      R = (D) => (W) => {
        if (D) {
          const re = f.current;
          W === void 0 ? D(re) : D(re, W);
        }
      },
      A = R(u),
      j = R((D, W) => {
        ia(D);
        const {
          duration: re,
          delay: L,
          easing: F,
        } = Xn(
          {
            style: g,
            timeout: h,
            easing: s,
          },
          {
            mode: 'enter',
          },
        );
        let $;
        h === 'auto'
          ? (($ = x.transitions.getAutoHeightDuration(D.clientHeight)), (E.current = $))
          : ($ = re),
          (D.style.transition = [
            x.transitions.create('opacity', {
              duration: $,
              delay: L,
            }),
            x.transitions.create('transform', {
              duration: ri ? $ : $ * 0.666,
              delay: L,
              easing: F,
            }),
          ].join(',')),
          c && c(D, W);
      }),
      w = R(d),
      I = R(y),
      G = R((D) => {
        const {
          duration: W,
          delay: re,
          easing: L,
        } = Xn(
          {
            style: g,
            timeout: h,
            easing: s,
          },
          {
            mode: 'exit',
          },
        );
        let F;
        h === 'auto'
          ? ((F = x.transitions.getAutoHeightDuration(D.clientHeight)), (E.current = F))
          : (F = W),
          (D.style.transition = [
            x.transitions.create('opacity', {
              duration: F,
              delay: re,
            }),
            x.transitions.create('transform', {
              duration: ri ? F : F * 0.666,
              delay: ri ? re : re || F * 0.333,
              easing: L,
            }),
          ].join(',')),
          (D.style.opacity = 0),
          (D.style.transform = Ci(0.75)),
          p && p(D);
      }),
      z = R(m),
      _ = (D) => {
        h === 'auto' && (C.current = setTimeout(D, E.current || 0)), r && r(f.current, D);
      };
    return (
      b.useEffect(
        () => () => {
          clearTimeout(C.current);
        },
        [],
      ),
      /* @__PURE__ */ N(v, {
        appear: i,
        in: l,
        nodeRef: f,
        onEnter: j,
        onEntered: w,
        onEntering: A,
        onExit: G,
        onExited: z,
        onExiting: I,
        addEndListener: _,
        timeout: h === 'auto' ? null : h,
        ...O,
        children: (D, W) =>
          /* @__PURE__ */ b.cloneElement(a, {
            style: {
              opacity: 0,
              transform: Ci(0.75),
              visibility: D === 'exited' && !l ? 'hidden' : void 0,
              ...gy[D],
              ...g,
              ...a.props.style,
            },
            ref: S,
            ...W,
          }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (da.propTypes = {
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
    children: $n.isRequired,
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
da.muiSupportAuto = !0;
const Kc = da,
  yy = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Ie(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Av,
        t,
      );
    return {
      ...t,
      // forward classes to the InputBase
      ...i,
    };
  },
  xy = le(Vr, {
    shouldForwardProp: (e) => Lt(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...zr(e, t), !o.disableUnderline && t.underline];
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
          [`&.${pn.focused}:after`]: {
            // translateX(0) is a workaround for Safari transform scale bug
            // See https://github.com/mui/material-ui/issues/31766
            transform: 'scaleX(1) translateX(0)',
          },
          [`&.${pn.error}`]: {
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
          [`&:hover:not(.${pn.disabled}, .${pn.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              borderBottom: `1px solid ${r}`,
            },
          },
          [`&.${pn.disabled}:before`]: {
            borderBottomStyle: 'dotted',
          },
        }),
      }
    );
  }),
  Ey = le(Ur, {
    name: 'MuiInput',
    slot: 'Input',
    overridesResolver: Br,
  })({}),
  pa = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Me({
        props: t,
        name: 'MuiInput',
      }),
      {
        disableUnderline: c,
        components: d = {},
        componentsProps: u,
        fullWidth: p = !1,
        inputComponent: m = 'input',
        multiline: y = !1,
        slotProps: g,
        slots: h = {},
        type: v = 'text',
        ...O
      } = l,
      C = yy(l),
      x = {
        root: {
          ownerState: {
            disableUnderline: c,
          },
        },
      },
      f = g ?? u ? Mt(g ?? u, x) : x,
      S = (r = (i = h.root) != null ? i : d.Root) != null ? r : xy,
      R = (a = (s = h.input) != null ? s : d.Input) != null ? a : Ey;
    return /* @__PURE__ */ N(ca, {
      slots: {
        root: S,
        input: R,
      },
      slotProps: f,
      fullWidth: p,
      inputComponent: m,
      multiline: y,
      ref: o,
      type: v,
      ...O,
      classes: C,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (pa.propTypes = {
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
pa.muiName = 'Input';
const Gc = pa;
function Oy(e) {
  return ke('MuiInputLabel', e);
}
we('MuiInputLabel', [
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
const Ty = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: i,
        disableAnimation: a,
        variant: s,
        required: l,
      } = e,
      d = Ie(
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
        Oy,
        t,
      );
    return {
      ...t,
      // forward the focused, disabled, etc. classes to the FormLabel
      ...d,
    };
  },
  Cy = le(Wc, {
    shouldForwardProp: (e) => Lt(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${xo.asterisk}`]: t.asterisk,
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
  Xc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
        name: 'MuiInputLabel',
        props: t,
      }),
      { disableAnimation: i = !1, margin: a, shrink: s, variant: l, className: c, ...d } = r,
      u = Pn();
    let p = s;
    typeof p > 'u' && u && (p = u.filled || u.focused || u.adornedStart);
    const m = eo({
        props: r,
        muiFormControl: u,
        states: ['size', 'variant', 'required'],
      }),
      y = {
        ...r,
        disableAnimation: i,
        formControl: u,
        shrink: p,
        size: m.size,
        variant: m.variant,
        required: m.required,
      },
      g = Ty(y);
    return /* @__PURE__ */ N(Cy, {
      'data-shrink': p,
      ownerState: y,
      ref: o,
      className: be(g.root, c),
      ...d,
      classes: g,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Xc.propTypes = {
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
const Ry = Xc,
  Jc = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== 'production' && (Jc.displayName = 'ListContext');
const Ri = Jc;
function Sy(e) {
  return ke('MuiList', e);
}
we('MuiList', ['root', 'padding', 'dense', 'subheader']);
const wy = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: i } = e;
    return Ie(
      {
        root: ['root', !o && 'padding', r && 'dense', i && 'subheader'],
      },
      Sy,
      t,
    );
  },
  $y = le('ul', {
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
  Zc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
      m = {
        ...r,
        component: s,
        dense: l,
        disablePadding: c,
      },
      y = wy(m);
    return /* @__PURE__ */ N(Ri.Provider, {
      value: p,
      children: /* @__PURE__ */ Ke($y, {
        as: s,
        className: be(y.root, a),
        ref: o,
        ownerState: m,
        ...u,
        children: [d, i],
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Zc.propTypes = {
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
const ky = Zc,
  Ny = we('MuiListItemIcon', ['root', 'alignItemsFlexStart']),
  Ks = Ny,
  Py = we('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']),
  Gs = Py;
function ii(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function Xs(e, t, o) {
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
function Qc(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function uo(e, t, o, r, i, a) {
  let s = !1,
    l = i(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !Qc(l, a) || c) l = i(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const eu = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
      ...m
    } = t,
    y = b.useRef(null),
    g = b.useRef({
      keys: [],
      repeating: !0,
      previousKeyMatched: !0,
      lastTime: null,
    });
  nn(() => {
    i && y.current.focus();
  }, [i]),
    b.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (E, x) => {
          const f = !y.current.style.width;
          if (E.clientHeight < y.current.clientHeight && f) {
            const S = `${El(ot(E))}px`;
            (y.current.style[x.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = S),
              (y.current.style.width = `calc(100% + ${S})`);
          }
          return y.current;
        },
      }),
      [],
    );
  const h = (E) => {
      const x = y.current,
        f = E.key,
        S = ot(x).activeElement;
      if (f === 'ArrowDown') E.preventDefault(), uo(x, S, d, c, ii);
      else if (f === 'ArrowUp') E.preventDefault(), uo(x, S, d, c, Xs);
      else if (f === 'Home') E.preventDefault(), uo(x, null, d, c, ii);
      else if (f === 'End') E.preventDefault(), uo(x, null, d, c, Xs);
      else if (f.length === 1) {
        const R = g.current,
          A = f.toLowerCase(),
          j = performance.now();
        R.keys.length > 0 &&
          (j - R.lastTime > 500
            ? ((R.keys = []), (R.repeating = !0), (R.previousKeyMatched = !0))
            : R.repeating && A !== R.keys[0] && (R.repeating = !1)),
          (R.lastTime = j),
          R.keys.push(A);
        const w = S && !R.repeating && Qc(S, R);
        R.previousKeyMatched && (w || uo(x, S, !1, c, ii, R))
          ? E.preventDefault()
          : (R.previousKeyMatched = !1);
      }
      u && u(E);
    },
    v = rt(y, o);
  let O = -1;
  b.Children.forEach(s, (E, x) => {
    /* @__PURE__ */ b.isValidElement(E) &&
      (process.env.NODE_ENV !== 'production' &&
        To.isFragment(E) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      E.props.disabled || (((p === 'selectedMenu' && E.props.selected) || O === -1) && (O = x)),
      O === x &&
        (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) &&
        ((O += 1), O >= s.length && (O = -1)));
  });
  const C = b.Children.map(s, (E, x) => {
    if (x === O) {
      const f = {};
      return (
        a && (f.autoFocus = !0),
        E.props.tabIndex === void 0 && p === 'selectedMenu' && (f.tabIndex = 0),
        /* @__PURE__ */ b.cloneElement(E, f)
      );
    }
    return E;
  });
  return /* @__PURE__ */ N(ky, {
    role: 'menu',
    ref: v,
    className: l,
    onKeyDown: h,
    tabIndex: i ? 0 : -1,
    ...m,
    children: C,
  });
});
process.env.NODE_ENV !== 'production' &&
  (eu.propTypes = {
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
const Iy = eu;
function My(e) {
  return ke('MuiPopover', e);
}
we('MuiPopover', ['root', 'paper']);
function Js(e, t) {
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
function Zs(e, t) {
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
function Qs(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function Qo(e) {
  return typeof e == 'function' ? e() : e;
}
const _y = (e) => {
    const { classes: t } = e;
    return Ie(
      {
        root: ['root'],
        paper: ['paper'],
      },
      My,
      t,
    );
  },
  Ay = le(_c, {
    name: 'MuiPopover',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Dy = le(Nn, {
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
  tu = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        elevation: m = 8,
        marginThreshold: y = 16,
        open: g,
        PaperProps: h = {},
        transformOrigin: v = {
          vertical: 'top',
          horizontal: 'left',
        },
        TransitionComponent: O = Kc,
        transitionDuration: C = 'auto',
        TransitionProps: { onEntering: E, ...x } = {},
        ...f
      } = r,
      S = b.useRef(),
      R = rt(S, h.ref),
      A = {
        ...r,
        anchorOrigin: s,
        anchorReference: c,
        elevation: m,
        marginThreshold: y,
        PaperProps: h,
        transformOrigin: v,
        TransitionComponent: O,
        transitionDuration: C,
        TransitionProps: x,
      },
      j = _y(A),
      w = b.useCallback(() => {
        if (c === 'anchorPosition')
          return (
            process.env.NODE_ENV !== 'production' &&
              (l ||
                console.error(
                  'MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.',
                )),
            l
          );
        const $ = Qo(a),
          B = $ && $.nodeType === 1 ? $ : ot(S.current).body,
          Z = B.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'production') {
          const U = B.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            U.top === 0 &&
            U.left === 0 &&
            U.right === 0 &&
            U.bottom === 0 &&
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
          top: Z.top + Js(Z, s.vertical),
          left: Z.left + Zs(Z, s.horizontal),
        };
      }, [a, s.horizontal, s.vertical, l, c]),
      I = b.useCallback(
        ($) => ({
          vertical: Js($, v.vertical),
          horizontal: Zs($, v.horizontal),
        }),
        [v.horizontal, v.vertical],
      ),
      G = b.useCallback(
        ($) => {
          const B = {
              width: $.offsetWidth,
              height: $.offsetHeight,
            },
            Z = I(B);
          if (c === 'none')
            return {
              top: null,
              left: null,
              transformOrigin: Qs(Z),
            };
          const U = w();
          let Y = U.top - Z.vertical,
            X = U.left - Z.horizontal;
          const ie = Y + B.height,
            ee = X + B.width,
            ae = ln(Qo(a)),
            ue = ae.innerHeight - y,
            de = ae.innerWidth - y;
          if (Y < y) {
            const me = Y - y;
            (Y -= me), (Z.vertical += me);
          } else if (ie > ue) {
            const me = ie - ue;
            (Y -= me), (Z.vertical += me);
          }
          if (
            (process.env.NODE_ENV !== 'production' &&
              B.height > ue &&
              B.height &&
              ue &&
              console.error(
                [
                  'MUI: The popover component is too tall.',
                  `Some part of it can not be seen on the screen (${B.height - ue}px).`,
                  'Please consider adding a `max-height` to improve the user-experience.',
                ].join(`
`),
              ),
            X < y)
          ) {
            const me = X - y;
            (X -= me), (Z.horizontal += me);
          } else if (ee > de) {
            const me = ee - de;
            (X -= me), (Z.horizontal += me);
          }
          return {
            top: `${Math.round(Y)}px`,
            left: `${Math.round(X)}px`,
            transformOrigin: Qs(Z),
          };
        },
        [a, c, w, I, y],
      ),
      [z, _] = b.useState(g),
      D = b.useCallback(() => {
        const $ = S.current;
        if (!$) return;
        const B = G($);
        B.top !== null && ($.style.top = B.top),
          B.left !== null && ($.style.left = B.left),
          ($.style.transformOrigin = B.transformOrigin),
          _(!0);
      }, [G]),
      W = ($, B) => {
        E && E($, B), D();
      },
      re = () => {
        _(!1);
      };
    b.useEffect(() => {
      g && D();
    }),
      b.useImperativeHandle(
        i,
        () =>
          g
            ? {
                updatePosition: () => {
                  D();
                },
              }
            : null,
        [g, D],
      ),
      b.useEffect(() => {
        if (!g) return;
        const $ = Pi(() => {
            D();
          }),
          B = ln(a);
        return (
          B.addEventListener('resize', $),
          () => {
            $.clear(), B.removeEventListener('resize', $);
          }
        );
      }, [a, g, D]);
    let L = C;
    C === 'auto' && !O.muiSupportAuto && (L = void 0);
    const F = p || (a ? ot(Qo(a)).body : void 0);
    return /* @__PURE__ */ N(Ay, {
      BackdropProps: {
        invisible: !0,
      },
      className: be(j.root, u),
      container: F,
      open: g,
      ref: o,
      ownerState: A,
      ...f,
      children: /* @__PURE__ */ N(O, {
        appear: !0,
        in: g,
        onEntering: W,
        onExited: re,
        timeout: L,
        ...x,
        children: /* @__PURE__ */ N(Dy, {
          elevation: m,
          ...h,
          ref: R,
          className: be(j.paper, h.className),
          ...(z
            ? void 0
            : {
                style: {
                  ...h.style,
                  opacity: 0,
                },
              }),
          ownerState: A,
          children: d,
        }),
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (tu.propTypes = {
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
    anchorEl: _t(n.oneOfType([Ht, n.func]), (e) => {
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
    container: n.oneOfType([Ht, n.func]),
    /**
     * The elevation of the popover.
     * @default 8
     */
    elevation: mr,
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
      component: ki,
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
const jy = tu;
function Ly(e) {
  return ke('MuiMenu', e);
}
we('MuiMenu', ['root', 'paper', 'list']);
const Fy = {
    vertical: 'top',
    horizontal: 'right',
  },
  zy = {
    vertical: 'top',
    horizontal: 'left',
  },
  By = (e) => {
    const { classes: t } = e;
    return Ie(
      {
        root: ['root'],
        paper: ['paper'],
        list: ['list'],
      },
      Ly,
      t,
    );
  },
  Vy = le(jy, {
    shouldForwardProp: (e) => Lt(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Uy = le(Nn, {
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
  Wy = le(Iy, {
    name: 'MuiMenu',
    slot: 'List',
    overridesResolver: (e, t) => t.list,
  })({
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  }),
  nu = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        transitionDuration: m = 'auto',
        TransitionProps: { onEntering: y, ...g } = {},
        variant: h = 'selectedMenu',
        ...v
      } = r,
      O = cn(),
      C = O.direction === 'rtl',
      E = {
        ...r,
        autoFocus: i,
        disableAutoFocusItem: s,
        MenuListProps: l,
        onEntering: y,
        PaperProps: u,
        transitionDuration: m,
        TransitionProps: g,
        variant: h,
      },
      x = By(E),
      f = i && !s && d,
      S = b.useRef(null),
      R = (w, I) => {
        S.current && S.current.adjustStyleForScrollbar(w, O), y && y(w, I);
      },
      A = (w) => {
        w.key === 'Tab' && (w.preventDefault(), c && c(w, 'tabKeyDown'));
      };
    let j = -1;
    return (
      b.Children.map(a, (w, I) => {
        /* @__PURE__ */ b.isValidElement(w) &&
          (process.env.NODE_ENV !== 'production' &&
            To.isFragment(w) &&
            console.error(
              [
                "MUI: The Menu component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join(`
`),
            ),
          w.props.disabled ||
            (((h === 'selectedMenu' && w.props.selected) || j === -1) && (j = I)));
      }),
      /* @__PURE__ */ N(Vy, {
        onClose: c,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: C ? 'right' : 'left',
        },
        transformOrigin: C ? Fy : zy,
        PaperProps: {
          as: Uy,
          ...u,
          classes: {
            ...u.classes,
            root: x.paper,
          },
        },
        className: x.root,
        open: d,
        ref: o,
        transitionDuration: m,
        TransitionProps: {
          onEntering: R,
          ...g,
        },
        ownerState: E,
        ...v,
        classes: p,
        children: /* @__PURE__ */ N(Wy, {
          onKeyDown: A,
          actions: S,
          autoFocus: i && (j === -1 || s),
          autoFocusItem: f,
          variant: h,
          ...l,
          className: be(x.list, l.className),
          children: a,
        }),
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
     * An HTML element, or a function that returns one.
     * It's used to set the position of the menu.
     */
    anchorEl: n.oneOfType([Ht, n.func]),
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
const Hy = nu;
function qy(e) {
  return ke('MuiMenuItem', e);
}
const Yy = we('MuiMenuItem', [
    'root',
    'focusVisible',
    'dense',
    'disabled',
    'divider',
    'gutters',
    'selected',
  ]),
  po = Yy,
  Ky = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
  },
  Gy = (e) => {
    const { disabled: t, dense: o, divider: r, disableGutters: i, selected: a, classes: s } = e,
      c = Ie(
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
        qy,
        s,
      );
    return {
      ...s,
      ...c,
    };
  },
  Xy = le(Jn, {
    shouldForwardProp: (e) => Lt(e) || e === 'classes',
    name: 'MuiMenuItem',
    slot: 'Root',
    overridesResolver: Ky,
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
    [`&.${po.selected}`]: {
      backgroundColor: e.vars
        ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
        : Ye(e.palette.primary.main, e.palette.action.selectedOpacity),
      [`&.${po.focusVisible}`]: {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
          : Ye(
              e.palette.primary.main,
              e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
            ),
      },
    },
    [`&.${po.selected}:hover`]: {
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
    [`&.${po.focusVisible}`]: {
      backgroundColor: (e.vars || e).palette.action.focus,
    },
    [`&.${po.disabled}`]: {
      opacity: (e.vars || e).palette.action.disabledOpacity,
    },
    [`& + .${Us.root}`]: {
      marginTop: e.spacing(1),
      marginBottom: e.spacing(1),
    },
    [`& + .${Us.inset}`]: {
      marginLeft: 52,
    },
    [`& .${Gs.root}`]: {
      marginTop: 0,
      marginBottom: 0,
    },
    [`& .${Gs.inset}`]: {
      paddingLeft: 36,
    },
    [`& .${Ks.root}`]: {
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
      [`& .${Ks.root} svg`]: {
        fontSize: '1.25rem',
      },
    }),
  })),
  ou = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        className: m,
        ...y
      } = r,
      g = b.useContext(Ri),
      h = b.useMemo(
        () => ({
          dense: s || g.dense || !1,
          disableGutters: c,
        }),
        [g.dense, s, c],
      ),
      v = b.useRef(null);
    nn(() => {
      i &&
        (v.current
          ? v.current.focus()
          : process.env.NODE_ENV !== 'production' &&
            console.error(
              'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
            ));
    }, [i]);
    const O = {
        ...r,
        dense: h.dense,
        divider: l,
        disableGutters: c,
      },
      C = Gy(r),
      E = rt(v, o);
    let x;
    return (
      r.disabled || (x = p !== void 0 ? p : -1),
      /* @__PURE__ */ N(Ri.Provider, {
        value: h,
        children: /* @__PURE__ */ N(Xy, {
          ref: E,
          role: u,
          tabIndex: x,
          component: a,
          focusVisibleClassName: be(C.focusVisible, d),
          className: be(C.root, m),
          ...y,
          ownerState: O,
          classes: C,
        }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ou.propTypes = {
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
const Jy = ou;
function Zy(e) {
  return ke('MuiNativeSelect', e);
}
const Qy = we('MuiNativeSelect', [
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
  fa = Qy,
  e0 = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a, error: s } = e,
      l = {
        select: ['select', o, r && 'disabled', i && 'multiple', s && 'error'],
        icon: ['icon', `icon${J(o)}`, a && 'iconOpen', r && 'disabled'],
      };
    return Ie(l, Zy, t);
  },
  ru = ({ ownerState: e, theme: t }) => ({
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
    [`&.${fa.disabled}`]: {
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
  t0 = le('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: Lt,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.select,
        t[o.variant],
        o.error && t.error,
        {
          [`&.${fa.multiple}`]: t.multiple,
        },
      ];
    },
  })(ru),
  iu = ({ ownerState: e, theme: t }) => ({
    // We use a position absolute over a flexbox in order to forward the pointer events
    // to the input and to support wrapping tags..
    position: 'absolute',
    right: 0,
    top: 'calc(50% - .5em)',
    // Center vertically, height is 1em
    pointerEvents: 'none',
    // Don't block pointer events on the select under the icon.
    color: (t.vars || t).palette.action.active,
    [`&.${fa.disabled}`]: {
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
  n0 = le('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${J(o.variant)}`], o.open && t.iconOpen];
    },
  })(iu),
  au = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
      p = e0(u);
    return /* @__PURE__ */ Ke(b.Fragment, {
      children: [
        /* @__PURE__ */ N(t0, {
          ownerState: u,
          className: be(p.select, r),
          disabled: i,
          ref: l || o,
          ...d,
        }),
        t.multiple
          ? null
          : /* @__PURE__ */ N(n0, {
              as: s,
              ownerState: u,
              className: p.icon,
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
const o0 = au;
var el;
const r0 = le('fieldset')({
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
  i0 = le('legend')(({ ownerState: e, theme: t }) => ({
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
function su(e) {
  const { children: t, classes: o, className: r, label: i, notched: a, ...s } = e,
    l = i != null && i !== '',
    c = {
      ...e,
      notched: a,
      withLabel: l,
    };
  return /* @__PURE__ */ N(r0, {
    'aria-hidden': !0,
    className: r,
    ownerState: c,
    ...s,
    children: /* @__PURE__ */ N(i0, {
      ownerState: c,
      children: l
        ? /* @__PURE__ */ N('span', {
            children: i,
          })
        : // notranslate needed while Google Translate will not fix zero-width space issue
          el ||
          (el = /* @__PURE__ */ N('span', {
            className: 'notranslate',
            children: '​',
          })),
    }),
  });
}
process.env.NODE_ENV !== 'production' &&
  (su.propTypes = {
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
const a0 = (e) => {
    const { classes: t } = e,
      r = Ie(
        {
          root: ['root'],
          notchedOutline: ['notchedOutline'],
          input: ['input'],
        },
        jv,
        t,
      );
    return {
      ...t,
      // forward classes to the InputBase
      ...r,
    };
  },
  s0 = le(Vr, {
    shouldForwardProp: (e) => Lt(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: zr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      position: 'relative',
      borderRadius: (e.vars || e).shape.borderRadius,
      [`&:hover .${Zt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette.text.primary,
      },
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        [`&:hover .${Zt.notchedOutline}`]: {
          borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
        },
      },
      [`&.${Zt.focused} .${Zt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette[t.color].main,
        borderWidth: 2,
      },
      [`&.${Zt.error} .${Zt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette.error.main,
      },
      [`&.${Zt.disabled} .${Zt.notchedOutline}`]: {
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
  l0 = le(su, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  c0 = le(Ur, {
    name: 'MuiOutlinedInput',
    slot: 'Input',
    overridesResolver: Br,
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
  ma = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s, l;
    const c = Me({
        props: t,
        name: 'MuiOutlinedInput',
      }),
      {
        components: d = {},
        fullWidth: u = !1,
        inputComponent: p = 'input',
        label: m,
        multiline: y = !1,
        notched: g,
        slots: h = {},
        type: v = 'text',
        ...O
      } = c,
      C = a0(c),
      E = Pn(),
      x = eo({
        props: c,
        muiFormControl: E,
        states: ['required'],
      }),
      f = {
        ...c,
        color: x.color || 'primary',
        disabled: x.disabled,
        error: x.error,
        focused: x.focused,
        formControl: E,
        fullWidth: u,
        hiddenLabel: x.hiddenLabel,
        multiline: y,
        size: x.size,
        type: v,
      },
      S = (r = (i = h.root) != null ? i : d.Root) != null ? r : s0,
      R = (a = (s = h.input) != null ? s : d.Input) != null ? a : c0;
    return /* @__PURE__ */ N(ca, {
      slots: {
        root: S,
        input: R,
      },
      renderSuffix: (A) =>
        /* @__PURE__ */ N(l0, {
          ownerState: f,
          className: C.notchedOutline,
          label:
            m != null && m !== '' && x.required
              ? l ||
                (l = /* @__PURE__ */ Ke(b.Fragment, {
                  children: [m, ' ', '*'],
                }))
              : m,
          notched: typeof g < 'u' ? g : !!(A.startAdornment || A.filled || A.focused),
        }),
      fullWidth: u,
      inputComponent: p,
      multiline: y,
      ref: o,
      type: v,
      ...O,
      classes: {
        ...C,
        notchedOutline: null,
      },
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ma.propTypes = {
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
ma.muiName = 'Input';
const lu = ma;
function u0(e) {
  return ke('MuiSelect', e);
}
const d0 = we('MuiSelect', [
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
  fo = d0;
var tl;
const p0 = le('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        // Win specificity over the input base
        {
          [`&.${fo.select}`]: t.select,
        },
        {
          [`&.${fo.select}`]: t[o.variant],
        },
        {
          [`&.${fo.error}`]: t.error,
        },
        {
          [`&.${fo.multiple}`]: t.multiple,
        },
      ];
    },
  })(ru, {
    // Win specificity over the input base
    [`&.${fo.select}`]: {
      height: 'auto',
      // Resets for multiple select with chips
      minHeight: '1.4375em',
      // Required for select\text-field height consistency
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  f0 = le('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${J(o.variant)}`], o.open && t.iconOpen];
    },
  })(iu),
  m0 = le('input', {
    shouldForwardProp: (e) => Ki(e) && e !== 'classes',
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
function nl(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function h0(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const b0 = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a, error: s } = e,
      l = {
        select: ['select', o, r && 'disabled', i && 'multiple', s && 'error'],
        icon: ['icon', `icon${J(o)}`, a && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return Ie(l, u0, t);
  },
  cu = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        displayEmpty: m,
        error: y = !1,
        IconComponent: g,
        inputRef: h,
        labelId: v,
        MenuProps: O = {},
        multiple: C,
        name: E,
        onBlur: x,
        onChange: f,
        onClose: S,
        onFocus: R,
        onOpen: A,
        open: j,
        readOnly: w,
        renderValue: I,
        SelectDisplayProps: G = {},
        tabIndex: z,
        // catching `type` from Input which makes no sense for SelectInput
        type: _,
        value: D,
        variant: W = 'standard',
        ...re
      } = t,
      [L, F] = Cn({
        controlled: D,
        default: u,
        name: 'Select',
      }),
      [$, B] = Cn({
        controlled: j,
        default: d,
        name: 'Select',
      }),
      Z = b.useRef(null),
      U = b.useRef(null),
      [Y, X] = b.useState(null),
      { current: ie } = b.useRef(j != null),
      [ee, ae] = b.useState(),
      ue = rt(o, h),
      de = b.useCallback((H) => {
        (U.current = H), H && X(H);
      }, []),
      me = Y == null ? void 0 : Y.parentNode;
    b.useImperativeHandle(
      ue,
      () => ({
        focus: () => {
          U.current.focus();
        },
        node: Z.current,
        value: L,
      }),
      [L],
    ),
      b.useEffect(() => {
        d && $ && Y && !ie && (ae(s ? null : me.clientWidth), U.current.focus());
      }, [Y, s]),
      b.useEffect(() => {
        a && U.current.focus();
      }, [a]),
      b.useEffect(() => {
        if (!v) return;
        const H = ot(U.current).getElementById(v);
        if (H) {
          const ye = () => {
            getSelection().isCollapsed && U.current.focus();
          };
          return (
            H.addEventListener('click', ye),
            () => {
              H.removeEventListener('click', ye);
            }
          );
        }
      }, [v]);
    const M = (H, ye) => {
        H ? A && A(ye) : S && S(ye), ie || (ae(s ? null : me.clientWidth), B(H));
      },
      Te = (H) => {
        H.button === 0 && (H.preventDefault(), U.current.focus(), M(!0, H));
      },
      Q = (H) => {
        M(!1, H);
      },
      q = b.Children.toArray(l),
      Ce = (H) => {
        const ye = q.find((Re) => Re.props.value === H.target.value);
        ye !== void 0 && (F(ye.props.value), f && f(H, ye));
      },
      pe = (H) => (ye) => {
        let Re;
        if (ye.currentTarget.hasAttribute('tabindex')) {
          if (C) {
            Re = Array.isArray(L) ? L.slice() : [];
            const ft = L.indexOf(H.props.value);
            ft === -1 ? Re.push(H.props.value) : Re.splice(ft, 1);
          } else Re = H.props.value;
          if ((H.props.onClick && H.props.onClick(ye), L !== Re && (F(Re), f))) {
            const ft = ye.nativeEvent || ye,
              ht = new ft.constructor(ft.type, ft);
            Object.defineProperty(ht, 'target', {
              writable: !0,
              value: {
                value: Re,
                name: E,
              },
            }),
              f(ht, H);
          }
          C || M(!1, ye);
        }
      },
      Ne = (H) => {
        w ||
          ([
            ' ',
            'ArrowUp',
            'ArrowDown',
            // The native select doesn't respond to enter on macOS, but it's recommended by
            // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
            'Enter',
          ].indexOf(H.key) !== -1 &&
            (H.preventDefault(), M(!0, H)));
      },
      Le = Y !== null && $,
      Je = (H) => {
        !Le &&
          x &&
          (Object.defineProperty(H, 'target', {
            writable: !0,
            value: {
              value: L,
              name: E,
            },
          }),
          x(H));
      };
    delete re['aria-invalid'];
    let Xe, Fe;
    const Ze = [];
    let te = !1,
      ne = !1;
    (pr({
      value: L,
    }) ||
      m) &&
      (I ? (Xe = I(L)) : (te = !0));
    const xe = q.map((H) => {
      if (!(/* @__PURE__ */ b.isValidElement(H))) return null;
      process.env.NODE_ENV !== 'production' &&
        To.isFragment(H) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let ye;
      if (C) {
        if (!Array.isArray(L))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : mn(2),
          );
        (ye = L.some((Re) => nl(Re, H.props.value))), ye && te && Ze.push(H.props.children);
      } else (ye = nl(L, H.props.value)), ye && te && (Fe = H.props.children);
      return (
        ye && (ne = !0),
        /* @__PURE__ */ b.cloneElement(H, {
          'aria-selected': ye ? 'true' : 'false',
          onClick: pe(H),
          onKeyUp: (Re) => {
            Re.key === ' ' && Re.preventDefault(), H.props.onKeyUp && H.props.onKeyUp(Re);
          },
          role: 'option',
          selected: ye,
          value: void 0,
          // The value is most likely not a valid HTML attribute.
          'data-value': H.props.value,
          // Instead, we provide it as a data attribute.
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      b.useEffect(() => {
        if (!ne && !C && L !== '') {
          const H = q.map((ye) => ye.props.value);
          console.warn(
            [
              `MUI: You have provided an out-of-range value \`${L}\` for the select ${
                E ? `(name="${E}") ` : ''
              }component.`,
              "Consider providing a value that matches one of the available options or ''.",
              `The available values are ${
                H.filter((ye) => ye != null)
                  .map((ye) => `\`${ye}\``)
                  .join(', ') || '""'
              }.`,
            ].join(`
`),
          );
        }
      }, [ne, q, C, E, L]),
      te &&
        (C
          ? Ze.length === 0
            ? (Xe = null)
            : (Xe = Ze.reduce(
                (H, ye, Re) => (H.push(ye), Re < Ze.length - 1 && H.push(', '), H),
                [],
              ))
          : (Xe = Fe));
    let he = ee;
    !s && ie && Y && (he = me.clientWidth);
    let Ee;
    typeof z < 'u' ? (Ee = z) : (Ee = p ? null : 0);
    const _e = G.id || (E ? `mui-component-select-${E}` : void 0),
      se = {
        ...t,
        variant: W,
        value: L,
        open: Le,
        error: y,
      },
      $e = b0(se);
    return /* @__PURE__ */ Ke(b.Fragment, {
      children: [
        /* @__PURE__ */ N(p0, {
          ref: de,
          tabIndex: Ee,
          role: 'button',
          'aria-disabled': p ? 'true' : void 0,
          'aria-expanded': Le ? 'true' : 'false',
          'aria-haspopup': 'listbox',
          'aria-label': i,
          'aria-labelledby': [v, _e].filter(Boolean).join(' ') || void 0,
          'aria-describedby': r,
          onKeyDown: Ne,
          onMouseDown: p || w ? null : Te,
          onBlur: Je,
          onFocus: R,
          ...G,
          ownerState: se,
          className: be(G.className, $e.select, c),
          id: _e,
          children: h0(Xe)
            ? // notranslate needed while Google Translate will not fix zero-width space issue
              tl ||
              (tl = /* @__PURE__ */ N('span', {
                className: 'notranslate',
                children: '​',
              }))
            : Xe,
        }),
        /* @__PURE__ */ N(m0, {
          'aria-invalid': y,
          value: Array.isArray(L) ? L.join(',') : L,
          name: E,
          ref: Z,
          'aria-hidden': !0,
          onChange: Ce,
          tabIndex: -1,
          disabled: p,
          className: $e.nativeInput,
          autoFocus: a,
          ownerState: se,
          ...re,
        }),
        /* @__PURE__ */ N(f0, {
          as: g,
          className: $e.icon,
          ownerState: se,
        }),
        /* @__PURE__ */ N(Hy, {
          id: `menu-${E || ''}`,
          anchorEl: me,
          open: Le,
          onClose: Q,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          ...O,
          MenuListProps: {
            'aria-labelledby': v,
            role: 'listbox',
            disableListWrap: !0,
            ...O.MenuListProps,
          },
          PaperProps: {
            ...O.PaperProps,
            style: {
              minWidth: he,
              ...(O.PaperProps != null ? O.PaperProps.style : null),
            },
          },
          children: xe,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (cu.propTypes = {
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
const v0 = cu,
  g0 = (e) => {
    const { classes: t } = e;
    return t;
  },
  ha = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => Lt(e) && e !== 'variant',
    slot: 'Root',
  },
  y0 = le(Gc, ha)(''),
  x0 = le(lu, ha)(''),
  E0 = le(zc, ha)(''),
  ba = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        IconComponent: u = Tc,
        id: p,
        input: m,
        inputProps: y,
        label: g,
        labelId: h,
        MenuProps: v,
        multiple: O = !1,
        native: C = !1,
        onClose: E,
        onOpen: x,
        open: f,
        renderValue: S,
        SelectDisplayProps: R,
        variant: A = 'outlined',
        ...j
      } = r,
      w = C ? o0 : v0,
      I = Pn(),
      G = eo({
        props: r,
        muiFormControl: I,
        states: ['variant', 'error'],
      }),
      z = G.variant || A,
      _ = {
        ...r,
        variant: z,
        classes: s,
      },
      D = g0(_),
      W =
        m ||
        {
          standard: /* @__PURE__ */ N(y0, {
            ownerState: _,
          }),
          outlined: /* @__PURE__ */ N(x0, {
            label: g,
            ownerState: _,
          }),
          filled: /* @__PURE__ */ N(E0, {
            ownerState: _,
          }),
        }[z],
      re = rt(o, W.ref);
    return /* @__PURE__ */ N(b.Fragment, {
      children: /* @__PURE__ */ b.cloneElement(W, {
        // Most of the logic is implemented in `SelectInput`.
        // The `Select` component is a simple API wrapper to expose something better to play with.
        inputComponent: w,
        inputProps: {
          children: a,
          error: G.error,
          IconComponent: u,
          variant: z,
          type: void 0,
          // We render a select. We can ignore the type provided by the `Input`.
          multiple: O,
          ...(C
            ? {
                id: p,
              }
            : {
                autoWidth: i,
                defaultOpen: c,
                displayEmpty: d,
                labelId: h,
                MenuProps: v,
                onClose: E,
                onOpen: x,
                open: f,
                renderValue: S,
                SelectDisplayProps: {
                  id: p,
                  ...R,
                },
              }),
          ...y,
          classes: y ? Mt(D, y.classes) : D,
          ...(m ? m.props.inputProps : {}),
        },
        ...(O && C && z === 'outlined'
          ? {
              notched: !0,
            }
          : {}),
        ref: re,
        className: be(W.props.className, l),
        // If a custom input is provided via 'input' prop, do not allow 'variant' to be propagated to it's root element. See https://github.com/mui/material-ui/issues/33894.
        ...(!m && {
          variant: z,
        }),
        ...j,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ba.propTypes = {
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
ba.muiName = 'Select';
const O0 = ba,
  T0 = (e) => !e || !fn(e),
  C0 = T0;
function R0(e) {
  return ke('MuiSlider', e);
}
const S0 = we('MuiSlider', [
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
  Ut = S0,
  w0 = (e) => {
    const { open: t } = e;
    return {
      offset: be(t && Ut.valueLabelOpen),
      circle: Ut.valueLabelCircle,
      label: Ut.valueLabelLabel,
    };
  };
function uu(e) {
  const { children: t, className: o, value: r } = e,
    i = w0(e);
  return t
    ? /* @__PURE__ */ b.cloneElement(
        t,
        {
          className: be(t.props.className),
        },
        /* @__PURE__ */ Ke(b.Fragment, {
          children: [
            t.props.children,
            /* @__PURE__ */ N('span', {
              className: be(i.offset, o),
              'aria-hidden': !0,
              children: /* @__PURE__ */ N('span', {
                className: i.circle,
                children: /* @__PURE__ */ N('span', {
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
  (uu.propTypes = {
    children: n.element.isRequired,
    className: n.string,
    value: n.node,
  });
function ol(e) {
  return e;
}
const du = le('span', {
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
  [`&.${Ut.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: (e.vars || e).palette.grey[400],
  },
  [`&.${Ut.dragging}`]: {
    [`& .${Ut.thumb}, & .${Ut.track}`]: {
      transition: 'none',
    },
  },
}));
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
const pu = le('span', {
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
const fu = le('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (e, t) => t.track,
})(({ theme: e, ownerState: t }) => {
  const o =
    // Same logic as the LinearProgress track color
    e.palette.mode === 'light'
      ? _r(e.palette[t.color].main, 0.62)
      : Mr(e.palette[t.color].main, 0.5);
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
const mu = le('span', {
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
  [`&:hover, &.${Ut.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${
      e.vars
        ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
        : Ye(e.palette[t.color].main, 0.16)
    }`,
    '@media (hover: none)': {
      boxShadow: 'none',
    },
  },
  [`&.${Ut.active}`]: {
    boxShadow: `0px 0px 0px 14px ${
      e.vars
        ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
        : Ye(e.palette[t.color].main, 0.16)
    }`,
  },
  [`&.${Ut.disabled}`]: {
    '&:hover': {
      boxShadow: 'none',
    },
  },
}));
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
const hu = le(uu, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) => ({
  [`&.${Ut.valueLabelOpen}`]: {
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
const bu = le('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => Ki(e) && e !== 'markActive',
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
const vu = le('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => Ki(e) && e !== 'markLabelActive',
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
  (vu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const $0 = (e) => {
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
    return Ie(d, R0, s);
  },
  k0 = ({ children: e }) => e,
  gu = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s, l, c, d, u, p, m, y, g, h, v, O, C, E, x, f, S, R, A, j, w;
    const I = Me({
        props: t,
        name: 'MuiSlider',
      }),
      z = cn().direction === 'rtl',
      {
        'aria-label': _,
        'aria-valuetext': D,
        'aria-labelledby': W,
        // eslint-disable-next-line react/prop-types
        component: re = 'span',
        components: L = {},
        componentsProps: F = {},
        color: $ = 'primary',
        classes: B,
        className: Z,
        disableSwap: U = !1,
        disabled: Y = !1,
        getAriaLabel: X,
        getAriaValueText: ie,
        marks: ee = !1,
        max: ae = 100,
        min: ue = 0,
        name: de,
        onChange: me,
        onChangeCommitted: M,
        orientation: Te = 'horizontal',
        size: Q = 'medium',
        step: q = 1,
        scale: Ce = ol,
        slotProps: pe,
        slots: Ne,
        tabIndex: Le,
        track: Je = 'normal',
        value: Xe,
        valueLabelDisplay: Fe = 'off',
        valueLabelFormat: Ze = ol,
        ...te
      } = I,
      ne = {
        ...I,
        isRtl: z,
        max: ae,
        min: ue,
        classes: B,
        disabled: Y,
        disableSwap: U,
        orientation: Te,
        marks: ee,
        color: $,
        size: Q,
        step: q,
        scale: Ce,
        track: Je,
        valueLabelDisplay: Fe,
        valueLabelFormat: Ze,
      },
      {
        axisProps: xe,
        getRootProps: he,
        getHiddenInputProps: Ee,
        getThumbProps: _e,
        open: se,
        active: $e,
        axis: H,
        focusedThumbIndex: ye,
        range: Re,
        dragging: ft,
        marks: ht,
        values: st,
        trackOffset: xt,
        trackLeap: Et,
      } = Sb({
        ...ne,
        rootRef: o,
      });
    (ne.marked = ht.length > 0 && ht.some((ve) => ve.label)),
      (ne.dragging = ft),
      (ne.focusedThumbIndex = ye);
    const Qe = $0(ne),
      lt = (r = (i = Ne == null ? void 0 : Ne.root) != null ? i : L.Root) != null ? r : du,
      ut = (a = (s = Ne == null ? void 0 : Ne.rail) != null ? s : L.Rail) != null ? a : pu,
      Yt = (l = (c = Ne == null ? void 0 : Ne.track) != null ? c : L.Track) != null ? l : fu,
      Kt = (d = (u = Ne == null ? void 0 : Ne.thumb) != null ? u : L.Thumb) != null ? d : mu,
      rn =
        (p = (m = Ne == null ? void 0 : Ne.valueLabel) != null ? m : L.ValueLabel) != null ? p : hu,
      Ot = (y = (g = Ne == null ? void 0 : Ne.mark) != null ? g : L.Mark) != null ? y : bu,
      Gt =
        (h = (v = Ne == null ? void 0 : Ne.markLabel) != null ? v : L.MarkLabel) != null ? h : vu,
      Xt = (O = (C = Ne == null ? void 0 : Ne.input) != null ? C : L.Input) != null ? O : 'input',
      Tt = (E = pe == null ? void 0 : pe.root) != null ? E : F.root,
      vn = (x = pe == null ? void 0 : pe.rail) != null ? x : F.rail,
      an = (f = pe == null ? void 0 : pe.track) != null ? f : F.track,
      Ct = (S = pe == null ? void 0 : pe.thumb) != null ? S : F.thumb,
      Ft = (R = pe == null ? void 0 : pe.valueLabel) != null ? R : F.valueLabel,
      Jt = (A = pe == null ? void 0 : pe.mark) != null ? A : F.mark,
      gn = (j = pe == null ? void 0 : pe.markLabel) != null ? j : F.markLabel,
      at = (w = pe == null ? void 0 : pe.input) != null ? w : F.input,
      T = Pt({
        elementType: lt,
        getSlotProps: he,
        externalSlotProps: Tt,
        externalForwardedProps: te,
        additionalProps: {
          ...(C0(lt) && {
            as: re,
          }),
        },
        ownerState: {
          ...ne,
          ...(Tt == null ? void 0 : Tt.ownerState),
        },
        className: [Qe.root, Z],
      }),
      V = Pt({
        elementType: ut,
        externalSlotProps: vn,
        ownerState: ne,
        className: Qe.rail,
      }),
      ce = Pt({
        elementType: Yt,
        externalSlotProps: an,
        additionalProps: {
          style: {
            ...xe[H].offset(xt),
            ...xe[H].leap(Et),
          },
        },
        ownerState: {
          ...ne,
          ...(an == null ? void 0 : an.ownerState),
        },
        className: Qe.track,
      }),
      k = Pt({
        elementType: Kt,
        getSlotProps: _e,
        externalSlotProps: Ct,
        ownerState: {
          ...ne,
          ...(Ct == null ? void 0 : Ct.ownerState),
        },
        className: Qe.thumb,
      }),
      P = Pt({
        elementType: rn,
        externalSlotProps: Ft,
        ownerState: {
          ...ne,
          ...(Ft == null ? void 0 : Ft.ownerState),
        },
        className: Qe.valueLabel,
      }),
      K = Pt({
        elementType: Ot,
        externalSlotProps: Jt,
        ownerState: ne,
        className: Qe.mark,
      }),
      oe = Pt({
        elementType: Gt,
        externalSlotProps: gn,
        ownerState: ne,
        className: Qe.markLabel,
      }),
      fe = Pt({
        elementType: Xt,
        getSlotProps: Ee,
        externalSlotProps: at,
        ownerState: ne,
      });
    return /* @__PURE__ */ Ke(lt, {
      ...T,
      children: [
        /* @__PURE__ */ N(ut, {
          ...V,
        }),
        /* @__PURE__ */ N(Yt, {
          ...ce,
        }),
        ht
          .filter((ve) => ve.value >= ue && ve.value <= ae)
          .map((ve, ge) => {
            const Se = ur(ve.value, ue, ae),
              Oe = xe[H].offset(Se);
            let ze;
            return (
              Je === !1
                ? (ze = st.indexOf(ve.value) !== -1)
                : (ze =
                    (Je === 'normal' &&
                      (Re
                        ? ve.value >= st[0] && ve.value <= st[st.length - 1]
                        : ve.value <= st[0])) ||
                    (Je === 'inverted' &&
                      (Re
                        ? ve.value <= st[0] || ve.value >= st[st.length - 1]
                        : ve.value >= st[0]))),
              /* @__PURE__ */ Ke(
                b.Fragment,
                {
                  children: [
                    /* @__PURE__ */ N(Ot, {
                      'data-index': ge,
                      ...K,
                      ...(!fn(Ot) && {
                        markActive: ze,
                      }),
                      style: {
                        ...Oe,
                        ...K.style,
                      },
                      className: be(K.className, ze && Qe.markActive),
                    }),
                    ve.label != null
                      ? /* @__PURE__ */ N(Gt, {
                          'aria-hidden': !0,
                          'data-index': ge,
                          ...oe,
                          ...(!fn(Gt) && {
                            markLabelActive: ze,
                          }),
                          style: {
                            ...Oe,
                            ...oe.style,
                          },
                          className: be(Qe.markLabel, oe.className, ze && Qe.markLabelActive),
                          children: ve.label,
                        })
                      : null,
                  ],
                },
                ge,
              )
            );
          }),
        st.map((ve, ge) => {
          const Se = ur(ve, ue, ae),
            Oe = xe[H].offset(Se),
            ze = Fe === 'off' ? k0 : rn;
          return (
            /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
            /* @__PURE__ */ N(
              ze,
              {
                ...(!fn(ze) && {
                  valueLabelFormat: Ze,
                  valueLabelDisplay: Fe,
                  value: typeof Ze == 'function' ? Ze(Ce(ve), ge) : Ze,
                  index: ge,
                  open: se === ge || $e === ge || Fe === 'on',
                  disabled: Y,
                }),
                ...P,
                children: /* @__PURE__ */ N(Kt, {
                  'data-index': ge,
                  ...k,
                  className: be(
                    Qe.thumb,
                    k.className,
                    $e === ge && Qe.active,
                    ye === ge && Qe.focusVisible,
                  ),
                  style: {
                    ...Oe,
                    pointerEvents: U && $e !== ge ? 'none' : void 0,
                    ...k.style,
                  },
                  children: /* @__PURE__ */ N(Xt, {
                    'data-index': ge,
                    'aria-label': X ? X(ge) : _,
                    'aria-valuenow': Ce(ve),
                    'aria-labelledby': W,
                    'aria-valuetext': ie ? ie(Ce(ve), ge) : D,
                    value: st[ge],
                    ...fe,
                  }),
                }),
              },
              ge,
            )
          );
        }),
      ],
    });
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
    'aria-label': _t(n.string, (e) =>
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
    'aria-valuetext': _t(n.string, (e) =>
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
const N0 = gu;
function P0(e) {
  return ke('MuiSnackbarContent', e);
}
we('MuiSnackbarContent', ['root', 'message', 'action']);
const I0 = (e) => {
    const { classes: t } = e;
    return Ie(
      {
        root: ['root'],
        action: ['action'],
        message: ['message'],
      },
      P0,
      t,
    );
  },
  M0 = le(Nn, {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 0.8 : 0.98,
      o = lm(e.palette.background.default, t);
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
  _0 = le('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({
    padding: '8px 0',
  }),
  A0 = le('div', {
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
  yu = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
        props: t,
        name: 'MuiSnackbarContent',
      }),
      { action: i, className: a, message: s, role: l = 'alert', ...c } = r,
      d = r,
      u = I0(d);
    return /* @__PURE__ */ Ke(M0, {
      role: l,
      square: !0,
      elevation: 6,
      className: be(u.root, a),
      ownerState: d,
      ref: o,
      ...c,
      children: [
        /* @__PURE__ */ N(_0, {
          className: u.message,
          ownerState: d,
          children: s,
        }),
        i
          ? /* @__PURE__ */ N(A0, {
              className: u.action,
              ownerState: d,
              children: i,
            })
          : null,
      ],
    });
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
const D0 = yu;
function j0(e) {
  return ke('MuiSnackbar', e);
}
we('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const L0 = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = {
        root: ['root', `anchorOrigin${J(o.vertical)}${J(o.horizontal)}`],
      };
    return Ie(r, j0, t);
  },
  rl = le('div', {
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
  xu = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
        props: t,
        name: 'MuiSnackbar',
      }),
      i = cn(),
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
        ClickAwayListenerProps: m,
        ContentProps: y,
        disableWindowBlurListener: g = !1,
        message: h,
        onBlur: v,
        onClose: O,
        onFocus: C,
        onMouseEnter: E,
        onMouseLeave: x,
        open: f,
        resumeHideDuration: S,
        TransitionComponent: R = Kc,
        transitionDuration: A = a,
        TransitionProps: { onEnter: j, onExited: w, ...I } = {},
        ...G
      } = r,
      z = {
        ...r,
        anchorOrigin: {
          vertical: l,
          horizontal: c,
        },
        autoHideDuration: d,
        disableWindowBlurListener: g,
        TransitionComponent: R,
        transitionDuration: A,
      },
      _ = L0(z),
      { getRootProps: D, onClickAway: W } = wb({
        ...z,
      }),
      [re, L] = b.useState(!0),
      F = Pt({
        elementType: rl,
        getSlotProps: D,
        externalForwardedProps: G,
        ownerState: z,
        additionalProps: {
          ref: o,
        },
        className: [_.root, p],
      }),
      $ = (Z) => {
        L(!0), w && w(Z);
      },
      B = (Z, U) => {
        L(!1), j && j(Z, U);
      };
    return !f && re
      ? null
      : /* @__PURE__ */ N(ir, {
          onClickAway: W,
          ...m,
          children: /* @__PURE__ */ N(rl, {
            ...F,
            children: /* @__PURE__ */ N(R, {
              appear: !0,
              in: f,
              timeout: A,
              direction: l === 'top' ? 'down' : 'up',
              onEnter: B,
              onExited: $,
              ...I,
              children:
                u ||
                /* @__PURE__ */ N(D0, {
                  message: h,
                  action: s,
                  ...y,
                }),
            }),
          }),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (xu.propTypes = {
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
const F0 = xu;
function z0(e) {
  return ke('MuiSwitch', e);
}
const B0 = we('MuiSwitch', [
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
  mt = B0,
  V0 = (e) => {
    const { classes: t, edge: o, size: r, color: i, checked: a, disabled: s } = e,
      l = {
        root: ['root', o && `edge${J(o)}`, `size${J(r)}`],
        switchBase: ['switchBase', `color${J(i)}`, a && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = Ie(l, z0, t);
    return {
      ...t,
      // forward the disabled and checked classes to the SwitchBase
      ...c,
    };
  },
  U0 = le('span', {
    name: 'MuiSwitch',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.edge && t[`edge${J(o.edge)}`], t[`size${J(o.size)}`]];
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
  W0 = le(Pc, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        {
          [`& .${mt.input}`]: t.input,
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
                    ? _r(e.palette[t.color].main, 0.62)
                    : Mr(e.palette[t.color].main, 0.55)
                }`,
          },
        },
        [`&.${mt.checked} + .${mt.track}`]: {
          backgroundColor: (e.vars || e).palette[t.color].main,
        },
      }),
    }),
  ),
  H0 = le('span', {
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
  q0 = le('span', {
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
  Eu = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
      p = V0(u),
      m = /* @__PURE__ */ N(q0, {
        className: p.thumb,
        ownerState: u,
      });
    return /* @__PURE__ */ Ke(U0, {
      className: be(p.root, i),
      sx: c,
      ownerState: u,
      children: [
        /* @__PURE__ */ N(W0, {
          type: 'checkbox',
          icon: m,
          checkedIcon: m,
          ref: o,
          ownerState: u,
          ...d,
          classes: {
            ...p,
            root: p.switchBase,
          },
        }),
        /* @__PURE__ */ N(H0, {
          className: p.track,
          ownerState: u,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Eu.propTypes = {
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
const Y0 = Eu;
function K0(e) {
  return ke('MuiToolbar', e);
}
we('MuiToolbar', ['root', 'gutters', 'regular', 'dense']);
const G0 = (e) => {
    const { classes: t, disableGutters: o, variant: r } = e;
    return Ie(
      {
        root: ['root', !o && 'gutters', r],
      },
      K0,
      t,
    );
  },
  X0 = le('div', {
    name: 'MuiToolbar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, !o.disableGutters && t.gutters, t[o.variant]];
    },
  })(
    ({ theme: e, ownerState: t }) => ({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      ...(!t.disableGutters && {
        paddingLeft: e.spacing(2),
        paddingRight: e.spacing(2),
        [e.breakpoints.up('sm')]: {
          paddingLeft: e.spacing(3),
          paddingRight: e.spacing(3),
        },
      }),
      ...(t.variant === 'dense' && {
        minHeight: 48,
      }),
    }),
    ({ theme: e, ownerState: t }) => t.variant === 'regular' && e.mixins.toolbar,
  ),
  Ou = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
        props: t,
        name: 'MuiToolbar',
      }),
      {
        className: i,
        component: a = 'div',
        disableGutters: s = !1,
        variant: l = 'regular',
        ...c
      } = r,
      d = {
        ...r,
        component: a,
        disableGutters: s,
        variant: l,
      },
      u = G0(d);
    return /* @__PURE__ */ N(X0, {
      as: a,
      className: be(u.root, i),
      ref: o,
      ownerState: d,
      ...c,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Ou.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
     * The Toolbar is a flex container, allowing flex item properties to be used to lay out the children.
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
const J0 = Ou;
function Z0(e) {
  return ke('MuiTextField', e);
}
we('MuiTextField', ['root']);
const Q0 = {
    standard: Gc,
    filled: zc,
    outlined: lu,
  },
  ex = (e) => {
    const { classes: t } = e;
    return Ie(
      {
        root: ['root'],
      },
      Z0,
      t,
    );
  },
  tx = le(Gg, {
    name: 'MuiTextField',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Tu = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Me({
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
        FormHelperTextProps: m,
        fullWidth: y = !1,
        helperText: g,
        id: h,
        InputLabelProps: v,
        inputProps: O,
        InputProps: C,
        inputRef: E,
        label: x,
        maxRows: f,
        minRows: S,
        multiline: R = !1,
        name: A,
        onBlur: j,
        onChange: w,
        onClick: I,
        onFocus: G,
        placeholder: z,
        required: _ = !1,
        rows: D,
        select: W = !1,
        SelectProps: re,
        type: L,
        value: F,
        variant: $ = 'outlined',
        ...B
      } = r,
      Z = {
        ...r,
        autoFocus: a,
        color: c,
        disabled: u,
        error: p,
        fullWidth: y,
        multiline: R,
        required: _,
        select: W,
        variant: $,
      },
      U = ex(Z);
    process.env.NODE_ENV !== 'production' &&
      W &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const Y = {};
    $ === 'outlined' && (v && typeof v.shrink < 'u' && (Y.notched = v.shrink), (Y.label = x)),
      W && ((!re || !re.native) && (Y.id = void 0), (Y['aria-describedby'] = void 0));
    const X = yl(h),
      ie = g && X ? `${X}-helper-text` : void 0,
      ee = x && X ? `${X}-label` : void 0,
      ae = Q0[$],
      ue = /* @__PURE__ */ N(ae, {
        'aria-describedby': ie,
        autoComplete: i,
        autoFocus: a,
        defaultValue: d,
        fullWidth: y,
        multiline: R,
        name: A,
        rows: D,
        maxRows: f,
        minRows: S,
        type: L,
        value: F,
        id: X,
        inputRef: E,
        onBlur: j,
        onChange: w,
        onFocus: G,
        onClick: I,
        placeholder: z,
        inputProps: O,
        ...Y,
        ...C,
      });
    return /* @__PURE__ */ Ke(tx, {
      className: be(U.root, l),
      disabled: u,
      error: p,
      fullWidth: y,
      ref: o,
      required: _,
      color: c,
      variant: $,
      ownerState: Z,
      ...B,
      children: [
        x != null &&
          x !== '' &&
          /* @__PURE__ */ N(Ry, {
            htmlFor: X,
            id: ee,
            ...v,
            children: x,
          }),
        W
          ? /* @__PURE__ */ N(O0, {
              'aria-describedby': ie,
              id: X,
              labelId: ee,
              value: F,
              input: ue,
              ...re,
              children: s,
            })
          : ue,
        g &&
          /* @__PURE__ */ N(ey, {
            id: ie,
            ...m,
            children: g,
          }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Tu.propTypes = {
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
const Cu = Tu;
function Ln({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: i }) {
  return /* @__PURE__ */ N(hg, {
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
function nx({
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
  const d = /* @__PURE__ */ N(Ng, {
    checked: e,
    indeterminate: r,
    defaultChecked: i,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let u;
  if (t) {
    const p = o === zn.Before || o === zn.Above,
      m = /* @__PURE__ */ N('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      y = o === zn.Before || o === zn.After,
      g = y ? m : /* @__PURE__ */ N('div', { children: m }),
      h = y ? d : /* @__PURE__ */ N('div', { children: d });
    u = /* @__PURE__ */ Ke(Wc, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: a,
      error: s,
      children: [p && g, h, !p && g],
    });
  } else u = d;
  return u;
}
function ox({
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
  return /* @__PURE__ */ N(tg, {
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
    renderInput: (m) =>
      /* @__PURE__ */ N(Cu, {
        ...m,
        error: r,
        fullWidth: i,
        disabled: t,
        label: e,
        style: { width: a },
      }),
  });
}
const to = [
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
  va = 1,
  Ru = to.length - 1,
  Su = 1,
  wu = 1,
  rx = (e) => to.findIndex((t) => t.fullNames.includes(e)),
  il = (e) => to[e < va || e > Ru ? 0 : e].fullNames[0],
  al = () => {
    const e = [];
    return (
      to.slice(1).forEach((t) => {
        const o = t.fullNames[0];
        e.push(o);
      }),
      e
    );
  },
  ix = (e) => to[e].chapters,
  sl = (e, t) => ({
    book: Math.max(va, Math.min(e.book + t, Ru)),
    chapter: 1,
    verse: 1,
  }),
  ll = (e, t) => ({
    ...e,
    chapter: Math.min(Math.max(Su, e.chapter + t), to[e.book].chapters),
    verse: 1,
  }),
  cl = (e, t) => ({
    ...e,
    verse: Math.max(wu, e.verse + t),
  });
function Si({
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
  onFocus: m,
  onBlur: y,
}) {
  return /* @__PURE__ */ N(Cu, {
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
    onFocus: m,
    onBlur: y,
  });
}
function mx({ scrRef: e, handleSubmit: t }) {
  const [o, r] = dl(il(e.book)),
    i = (c) => {
      r(il(c.book)), t(c);
    },
    a = (c, d) => {
      const p = { book: rx(d), chapter: 1, verse: 1 };
      i(p);
    },
    s = (c) => {
      t({ ...e, chapter: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verse: +c.target.value });
    };
  return /* @__PURE__ */ Ke(Lu, {
    children: [
      /* @__PURE__ */ N(ox, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: al(),
        onChange: a,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ N(Ln, {
        onClick: () => i(sl(e, -1)),
        isDisabled: e.book <= va,
        children: '<',
      }),
      /* @__PURE__ */ N(Ln, {
        onClick: () => i(sl(e, 1)),
        isDisabled: e.book >= al().length,
        children: '>',
      }),
      /* @__PURE__ */ N(Si, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapter,
        onChange: s,
      }),
      /* @__PURE__ */ N(Ln, {
        onClick: () => t(ll(e, -1)),
        isDisabled: e.chapter <= Su,
        children: '<',
      }),
      /* @__PURE__ */ N(Ln, {
        onClick: () => t(ll(e, 1)),
        isDisabled: e.chapter >= ix(e.book),
        children: '>',
      }),
      /* @__PURE__ */ N(Si, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verse,
        onChange: l,
      }),
      /* @__PURE__ */ N(Ln, {
        onClick: () => t(cl(e, -1)),
        isDisabled: e.verse <= wu,
        children: '<',
      }),
      /* @__PURE__ */ N(Ln, { onClick: () => t(cl(e, 1)), children: '>' }),
    ],
  });
}
function hx({
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
  return /* @__PURE__ */ N(N0, {
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
function bx({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: i }) {
  return /* @__PURE__ */ N(Y0, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: i,
  });
}
function vx({
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
  return /* @__PURE__ */ N(F0, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: i,
    ContentProps: a,
    children: s,
  });
}
function ax({
  hasAutoFocus: e = !1,
  className: t,
  isDense: o = !1,
  hasDisabledGutters: r = !1,
  hasDivider: i = !1,
  focusVisibleClassName: a,
  onClick: s,
  children: l,
}) {
  return /* @__PURE__ */ N(Jy, {
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
function ul({ onRowChange: e, row: t, column: o }) {
  const r = (i) => {
    e({ ...t, [o.key]: i.target.value });
  };
  return /* @__PURE__ */ N(Si, { defaultValue: t[o.key], onChange: r });
}
const sx = ({ onChange: e, disabled: t, checked: o, ...r }) => {
  function i(a) {
    e(a.target.checked, a.nativeEvent.shiftKey);
  }
  return /* @__PURE__ */ N(nx, {
    ...r,
    isChecked: o,
    isDisabled: t,
    onChange: i,
  });
};
function gx({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: o,
  onColumnResize: r,
  defaultColumnWidth: i,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: d,
  enableSelectColumn: u,
  selectColumnWidth: p = 50,
  rowKeyGetter: m,
  rowHeight: y = 35,
  headerRowHeight: g = 35,
  selectedRows: h,
  onSelectedRowsChange: v,
  onRowsChange: O,
  onCellClick: C,
  onCellDoubleClick: E,
  onCellContextMenu: x,
  onCellKeyDown: f,
  direction: S = 'ltr',
  enableVirtualization: R = !0,
  onCopy: A,
  onPaste: j,
  onScroll: w,
  className: I,
}) {
  const G = Pu(() => {
    const z = e.map((_) =>
      typeof _.editable == 'function'
        ? {
            ..._,
            editable: (W) => !!_.editable(W),
            renderEditCell: _.renderEditCell || ul,
          }
        : _.editable && !_.renderEditCell
        ? { ..._, renderEditCell: ul }
        : _.renderEditCell && !_.editable
        ? { ..._, editable: !1 }
        : _,
    );
    return u ? [{ ..._u, minWidth: p }, ...z] : z;
  }, [u, e]);
  return /* @__PURE__ */ N(Mu, {
    columns: G,
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
    rows: d,
    rowKeyGetter: m,
    rowHeight: y,
    headerRowHeight: g,
    selectedRows: h,
    onSelectedRowsChange: v,
    onRowsChange: O,
    onCellClick: C,
    onCellDoubleClick: E,
    onCellContextMenu: x,
    onCellKeyDown: f,
    direction: S,
    enableVirtualization: R,
    onCopy: A,
    onPaste: j,
    onScroll: w,
    renderers: { renderCheckbox: sx },
    className: `${I ?? 'rdg-light'}`,
  });
}
function lx({ name: e, index: t, items: o }) {
  return /* @__PURE__ */ Ke(Yc, {
    item: !0,
    xs: t,
    children: [
      /* @__PURE__ */ N('h3', { className: 'menu', children: e }),
      o.map((r, i) =>
        /* @__PURE__ */ N(
          ax,
          {
            className: `menu-item ${r.className}`,
            isDense: r.isDense,
            hasDivider: r.hasDivider,
            onClick: r.onClick,
            children: r.children,
          },
          i,
        ),
      ),
    ],
  });
}
function cx({ columns: e }) {
  return /* @__PURE__ */ N(Yc, {
    container: !0,
    spacing: 0,
    className: 'multi-colum-menu',
    columns: e.length,
    children: e.map((t, o) => /* @__PURE__ */ N(lx, { name: t.name, index: o, items: t.items })),
  });
}
const ux = kn(
  /* @__PURE__ */ N('path', {
    d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  }),
  'Menu',
);
function yx(e) {
  var i;
  const [t, o] = dl(!1),
    r = Iu(null);
  return /* @__PURE__ */ N(vv, {
    position: 'static',
    children: /* @__PURE__ */ Ke(J0, {
      className: 'toolbar',
      ref: r,
      variant: 'dense',
      children: [
        e.menu
          ? /* @__PURE__ */ N(aa, {
              edge: 'start',
              className: 'menuButton',
              color: 'inherit',
              'aria-label': 'open drawer',
              onClick: () => {
                o((a) => !a);
              },
              children: /* @__PURE__ */ N(ux, {}),
            })
          : null,
        e.children,
        e.menu
          ? /* @__PURE__ */ N(Vg, {
              className: 'menu-drawer',
              anchor: 'left',
              variant: 'temporary',
              open: t,
              onClose: () => {
                t && o(!1);
              },
              PaperProps: { style: { top: '40px', width: '95%', height: '170px' } },
              children: /* @__PURE__ */ N(cx, {
                columns: (i = e.menu) == null ? void 0 : i.columns,
              }),
            })
          : null,
      ],
    }),
  });
}
export {
  Ln as Button,
  nx as Checkbox,
  ox as ComboBox,
  cx as GridMenu,
  zn as LabelPosition,
  ax as MenuItem,
  mx as RefSelector,
  hx as Slider,
  vx as Snackbar,
  bx as Switch,
  gx as Table,
  Si as TextField,
  yx as Toolbar,
};
//# sourceMappingURL=index.es.js.map
