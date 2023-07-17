import * as C from 'react';
import gn, {
  useLayoutEffect as Ac,
  forwardRef as Oa,
  useContext as Bn,
  createContext as ar,
  createElement as jn,
  Fragment as ka,
  useRef as bn,
  Children as Tp,
  isValidElement as Ar,
  cloneElement as Dr,
  useState as Kt,
  useMemo as yn,
  useImperativeHandle as Sp,
  useCallback as Dc,
  useEffect as Na,
  memo as no,
} from 'react';
import * as Lc from 'react-dom';
import Sr, { flushSync as Wr } from 'react-dom';
function Rp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var aa = { exports: {} },
  Ao = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Is;
function Op() {
  if (Is) return Ao;
  Is = 1;
  var e = gn,
    t = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    r = Object.prototype.hasOwnProperty,
    i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, c, u) {
    var d,
      p = {},
      b = null,
      v = null;
    u !== void 0 && (b = '' + u),
      c.key !== void 0 && (b = '' + c.key),
      c.ref !== void 0 && (v = c.ref);
    for (d in c) r.call(c, d) && !a.hasOwnProperty(d) && (p[d] = c[d]);
    if (l && l.defaultProps) for (d in ((c = l.defaultProps), c)) p[d] === void 0 && (p[d] = c[d]);
    return { $$typeof: t, type: l, key: b, ref: v, props: p, _owner: i.current };
  }
  return (Ao.Fragment = o), (Ao.jsx = s), (Ao.jsxs = s), Ao;
}
var Do = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _s;
function kp() {
  return (
    _s ||
      ((_s = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = gn,
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
            v = Symbol.for('react.offscreen'),
            g = Symbol.iterator,
            h = '@@iterator';
          function f(S) {
            if (S === null || typeof S != 'object') return null;
            var q = (g && S[g]) || S[h];
            return typeof q == 'function' ? q : null;
          }
          var T = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function w(S) {
            {
              for (var q = arguments.length, fe = new Array(q > 1 ? q - 1 : 0), A = 1; A < q; A++)
                fe[A - 1] = arguments[A];
              E('error', S, fe);
            }
          }
          function E(S, q, fe) {
            {
              var A = T.ReactDebugCurrentFrame,
                M = A.getStackAddendum();
              M !== '' && ((q += '%s'), (fe = fe.concat([M])));
              var X = fe.map(function (Y) {
                return String(Y);
              });
              X.unshift('Warning: ' + q), Function.prototype.apply.call(console[S], console, X);
            }
          }
          var y = !1,
            m = !1,
            O = !1,
            R = !1,
            D = !1,
            $;
          $ = Symbol.for('react.module.reference');
          function N(S) {
            return !!(
              typeof S == 'string' ||
              typeof S == 'function' ||
              S === r ||
              S === a ||
              D ||
              S === i ||
              S === u ||
              S === d ||
              R ||
              S === v ||
              y ||
              m ||
              O ||
              (typeof S == 'object' &&
                S !== null &&
                (S.$$typeof === b ||
                  S.$$typeof === p ||
                  S.$$typeof === s ||
                  S.$$typeof === l ||
                  S.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  S.$$typeof === $ ||
                  S.getModuleId !== void 0))
            );
          }
          function k(S, q, fe) {
            var A = S.displayName;
            if (A) return A;
            var M = q.displayName || q.name || '';
            return M !== '' ? fe + '(' + M + ')' : fe;
          }
          function j(S) {
            return S.displayName || 'Context';
          }
          function z(S) {
            if (S == null) return null;
            if (
              (typeof S.tag == 'number' &&
                w(
                  'Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.',
                ),
              typeof S == 'function')
            )
              return S.displayName || S.name || null;
            if (typeof S == 'string') return S;
            switch (S) {
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
            if (typeof S == 'object')
              switch (S.$$typeof) {
                case l:
                  var q = S;
                  return j(q) + '.Consumer';
                case s:
                  var fe = S;
                  return j(fe._context) + '.Provider';
                case c:
                  return k(S, S.render, 'ForwardRef');
                case p:
                  var A = S.displayName || null;
                  return A !== null ? A : z(S.type) || 'Memo';
                case b: {
                  var M = S,
                    X = M._payload,
                    Y = M._init;
                  try {
                    return z(Y(X));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var P = Object.assign,
            V = 0,
            B,
            Q,
            re,
            Z,
            _,
            W,
            te;
          function H() {}
          H.__reactDisabledLog = !0;
          function K() {
            {
              if (V === 0) {
                (B = console.log),
                  (Q = console.info),
                  (re = console.warn),
                  (Z = console.error),
                  (_ = console.group),
                  (W = console.groupCollapsed),
                  (te = console.groupEnd);
                var S = {
                  configurable: !0,
                  enumerable: !0,
                  value: H,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  info: S,
                  log: S,
                  warn: S,
                  error: S,
                  group: S,
                  groupCollapsed: S,
                  groupEnd: S,
                });
              }
              V++;
            }
          }
          function ne() {
            {
              if ((V--, V === 0)) {
                var S = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: P({}, S, {
                    value: B,
                  }),
                  info: P({}, S, {
                    value: Q,
                  }),
                  warn: P({}, S, {
                    value: re,
                  }),
                  error: P({}, S, {
                    value: Z,
                  }),
                  group: P({}, S, {
                    value: _,
                  }),
                  groupCollapsed: P({}, S, {
                    value: W,
                  }),
                  groupEnd: P({}, S, {
                    value: te,
                  }),
                });
              }
              V < 0 &&
                w('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var ee = T.ReactCurrentDispatcher,
            oe;
          function le(S, q, fe) {
            {
              if (oe === void 0)
                try {
                  throw Error();
                } catch (M) {
                  var A = M.stack.trim().match(/\n( *(at )?)/);
                  oe = (A && A[1]) || '';
                }
              return (
                `
` +
                oe +
                S
              );
            }
          }
          var ue = !1,
            ye;
          {
            var se = typeof WeakMap == 'function' ? WeakMap : Map;
            ye = new se();
          }
          function L(S, q) {
            if (!S || ue) return '';
            {
              var fe = ye.get(S);
              if (fe !== void 0) return fe;
            }
            var A;
            ue = !0;
            var M = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var X;
            (X = ee.current), (ee.current = null), K();
            try {
              if (q) {
                var Y = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(Y.prototype, 'props', {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == 'object' && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(Y, []);
                  } catch ($t) {
                    A = $t;
                  }
                  Reflect.construct(S, [], Y);
                } else {
                  try {
                    Y.call();
                  } catch ($t) {
                    A = $t;
                  }
                  S.call(Y.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch ($t) {
                  A = $t;
                }
                S();
              }
            } catch ($t) {
              if ($t && A && typeof $t.stack == 'string') {
                for (
                  var me = $t.stack.split(`
`),
                    Ie = A.stack.split(`
`),
                    Pe = me.length - 1,
                    Oe = Ie.length - 1;
                  Pe >= 1 && Oe >= 0 && me[Pe] !== Ie[Oe];

                )
                  Oe--;
                for (; Pe >= 1 && Oe >= 0; Pe--, Oe--)
                  if (me[Pe] !== Ie[Oe]) {
                    if (Pe !== 1 || Oe !== 1)
                      do
                        if ((Pe--, Oe--, Oe < 0 || me[Pe] !== Ie[Oe])) {
                          var Ot =
                            `
` + me[Pe].replace(' at new ', ' at ');
                          return (
                            S.displayName &&
                              Ot.includes('<anonymous>') &&
                              (Ot = Ot.replace('<anonymous>', S.displayName)),
                            typeof S == 'function' && ye.set(S, Ot),
                            Ot
                          );
                        }
                      while (Pe >= 1 && Oe >= 0);
                    break;
                  }
              }
            } finally {
              (ue = !1), (ee.current = X), ne(), (Error.prepareStackTrace = M);
            }
            var Tn = S ? S.displayName || S.name : '',
              Io = Tn ? le(Tn) : '';
            return typeof S == 'function' && ye.set(S, Io), Io;
          }
          function Te(S, q, fe) {
            return L(S, !1);
          }
          function F(S) {
            var q = S.prototype;
            return !!(q && q.isReactComponent);
          }
          function G(S, q, fe) {
            if (S == null) return '';
            if (typeof S == 'function') return L(S, F(S));
            if (typeof S == 'string') return le(S);
            switch (S) {
              case u:
                return le('Suspense');
              case d:
                return le('SuspenseList');
            }
            if (typeof S == 'object')
              switch (S.$$typeof) {
                case c:
                  return Te(S.render);
                case p:
                  return G(S.type, q, fe);
                case b: {
                  var A = S,
                    M = A._payload,
                    X = A._init;
                  try {
                    return G(X(M), q, fe);
                  } catch {}
                }
              }
            return '';
          }
          var De = Object.prototype.hasOwnProperty,
            ge = {},
            Le = T.ReactDebugCurrentFrame;
          function Ue(S) {
            if (S) {
              var q = S._owner,
                fe = G(S.type, S._source, q ? q.type : null);
              Le.setExtraStackFrame(fe);
            } else Le.setExtraStackFrame(null);
          }
          function $e(S, q, fe, A, M) {
            {
              var X = Function.call.bind(De);
              for (var Y in S)
                if (X(S, Y)) {
                  var me = void 0;
                  try {
                    if (typeof S[Y] != 'function') {
                      var Ie = Error(
                        (A || 'React class') +
                          ': ' +
                          fe +
                          ' type `' +
                          Y +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof S[Y] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((Ie.name = 'Invariant Violation'), Ie);
                    }
                    me = S[Y](q, Y, A, fe, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (Pe) {
                    me = Pe;
                  }
                  me &&
                    !(me instanceof Error) &&
                    (Ue(M),
                    w(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      A || 'React class',
                      fe,
                      Y,
                      typeof me,
                    ),
                    Ue(null)),
                    me instanceof Error &&
                      !(me.message in ge) &&
                      ((ge[me.message] = !0),
                      Ue(M),
                      w('Failed %s type: %s', fe, me.message),
                      Ue(null));
                }
            }
          }
          var Me = Array.isArray;
          function ct(S) {
            return Me(S);
          }
          function mt(S) {
            {
              var q = typeof Symbol == 'function' && Symbol.toStringTag,
                fe = (q && S[Symbol.toStringTag]) || S.constructor.name || 'Object';
              return fe;
            }
          }
          function ie(S) {
            try {
              return ve(S), !1;
            } catch {
              return !0;
            }
          }
          function ve(S) {
            return '' + S;
          }
          function Ce(S) {
            if (ie(S))
              return (
                w(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  mt(S),
                ),
                ve(S)
              );
          }
          var U = T.ReactCurrentOwner,
            pe = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            de,
            ae,
            Ee;
          Ee = {};
          function we(S) {
            if (De.call(S, 'ref')) {
              var q = Object.getOwnPropertyDescriptor(S, 'ref').get;
              if (q && q.isReactWarning) return !1;
            }
            return S.ref !== void 0;
          }
          function Ae(S) {
            if (De.call(S, 'key')) {
              var q = Object.getOwnPropertyDescriptor(S, 'key').get;
              if (q && q.isReactWarning) return !1;
            }
            return S.key !== void 0;
          }
          function ht(S, q) {
            if (typeof S.ref == 'string' && U.current && q && U.current.stateNode !== q) {
              var fe = z(U.current.type);
              Ee[fe] ||
                (w(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  z(U.current.type),
                  S.ref,
                ),
                (Ee[fe] = !0));
            }
          }
          function ut(S, q) {
            {
              var fe = function () {
                de ||
                  ((de = !0),
                  w(
                    '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    q,
                  ));
              };
              (fe.isReactWarning = !0),
                Object.defineProperty(S, 'key', {
                  get: fe,
                  configurable: !0,
                });
            }
          }
          function Pt(S, q) {
            {
              var fe = function () {
                ae ||
                  ((ae = !0),
                  w(
                    '%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    q,
                  ));
              };
              (fe.isReactWarning = !0),
                Object.defineProperty(S, 'ref', {
                  get: fe,
                  configurable: !0,
                });
            }
          }
          var Qt = function (S, q, fe, A, M, X, Y) {
            var me = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: S,
              key: q,
              ref: fe,
              props: Y,
              // Record the component responsible for creating this element.
              _owner: X,
            };
            return (
              (me._store = {}),
              Object.defineProperty(me._store, 'validated', {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(me, '_self', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: A,
              }),
              Object.defineProperty(me, '_source', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: M,
              }),
              Object.freeze && (Object.freeze(me.props), Object.freeze(me)),
              me
            );
          };
          function It(S, q, fe, A, M) {
            {
              var X,
                Y = {},
                me = null,
                Ie = null;
              fe !== void 0 && (Ce(fe), (me = '' + fe)),
                Ae(q) && (Ce(q.key), (me = '' + q.key)),
                we(q) && ((Ie = q.ref), ht(q, M));
              for (X in q) De.call(q, X) && !pe.hasOwnProperty(X) && (Y[X] = q[X]);
              if (S && S.defaultProps) {
                var Pe = S.defaultProps;
                for (X in Pe) Y[X] === void 0 && (Y[X] = Pe[X]);
              }
              if (me || Ie) {
                var Oe = typeof S == 'function' ? S.displayName || S.name || 'Unknown' : S;
                me && ut(Y, Oe), Ie && Pt(Y, Oe);
              }
              return Qt(S, me, Ie, M, A, U.current, Y);
            }
          }
          var Tt = T.ReactCurrentOwner,
            St = T.ReactDebugCurrentFrame;
          function gt(S) {
            if (S) {
              var q = S._owner,
                fe = G(S.type, S._source, q ? q.type : null);
              St.setExtraStackFrame(fe);
            } else St.setExtraStackFrame(null);
          }
          var Be;
          Be = !1;
          function dt(S) {
            return typeof S == 'object' && S !== null && S.$$typeof === t;
          }
          function xt() {
            {
              if (Tt.current) {
                var S = z(Tt.current.type);
                if (S)
                  return (
                    `

Check the render method of \`` +
                    S +
                    '`.'
                  );
              }
              return '';
            }
          }
          function en(S) {
            {
              if (S !== void 0) {
                var q = S.fileName.replace(/^.*[\\\/]/, ''),
                  fe = S.lineNumber;
                return (
                  `

Check your code at ` +
                  q +
                  ':' +
                  fe +
                  '.'
                );
              }
              return '';
            }
          }
          var At = {};
          function tn(S) {
            {
              var q = xt();
              if (!q) {
                var fe = typeof S == 'string' ? S : S.displayName || S.name;
                fe &&
                  (q =
                    `

Check the top-level render call using <` +
                    fe +
                    '>.');
              }
              return q;
            }
          }
          function zt(S, q) {
            {
              if (!S._store || S._store.validated || S.key != null) return;
              S._store.validated = !0;
              var fe = tn(q);
              if (At[fe]) return;
              At[fe] = !0;
              var A = '';
              S &&
                S._owner &&
                S._owner !== Tt.current &&
                (A = ' It was passed a child from ' + z(S._owner.type) + '.'),
                gt(S),
                w(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  fe,
                  A,
                ),
                gt(null);
            }
          }
          function nn(S, q) {
            {
              if (typeof S != 'object') return;
              if (ct(S))
                for (var fe = 0; fe < S.length; fe++) {
                  var A = S[fe];
                  dt(A) && zt(A, q);
                }
              else if (dt(S)) S._store && (S._store.validated = !0);
              else if (S) {
                var M = f(S);
                if (typeof M == 'function' && M !== S.entries)
                  for (var X = M.call(S), Y; !(Y = X.next()).done; ) dt(Y.value) && zt(Y.value, q);
              }
            }
          }
          function pn(S) {
            {
              var q = S.type;
              if (q == null || typeof q == 'string') return;
              var fe;
              if (typeof q == 'function') fe = q.propTypes;
              else if (
                typeof q == 'object' &&
                (q.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  q.$$typeof === p)
              )
                fe = q.propTypes;
              else return;
              if (fe) {
                var A = z(q);
                $e(fe, S.props, 'prop', A, S);
              } else if (q.PropTypes !== void 0 && !Be) {
                Be = !0;
                var M = z(q);
                w(
                  'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                  M || 'Unknown',
                );
              }
              typeof q.getDefaultProps == 'function' &&
                !q.getDefaultProps.isReactClassApproved &&
                w(
                  'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.',
                );
            }
          }
          function fn(S) {
            {
              for (var q = Object.keys(S.props), fe = 0; fe < q.length; fe++) {
                var A = q[fe];
                if (A !== 'children' && A !== 'key') {
                  gt(S),
                    w(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      A,
                    ),
                    gt(null);
                  break;
                }
              }
              S.ref !== null &&
                (gt(S), w('Invalid attribute `ref` supplied to `React.Fragment`.'), gt(null));
            }
          }
          function ft(S, q, fe, A, M, X) {
            {
              var Y = N(S);
              if (!Y) {
                var me = '';
                (S === void 0 ||
                  (typeof S == 'object' && S !== null && Object.keys(S).length === 0)) &&
                  (me +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var Ie = en(M);
                Ie ? (me += Ie) : (me += xt());
                var Pe;
                S === null
                  ? (Pe = 'null')
                  : ct(S)
                  ? (Pe = 'array')
                  : S !== void 0 && S.$$typeof === t
                  ? ((Pe = '<' + (z(S.type) || 'Unknown') + ' />'),
                    (me = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (Pe = typeof S),
                  w(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    Pe,
                    me,
                  );
              }
              var Oe = It(S, q, fe, M, X);
              if (Oe == null) return Oe;
              if (Y) {
                var Ot = q.children;
                if (Ot !== void 0)
                  if (A)
                    if (ct(Ot)) {
                      for (var Tn = 0; Tn < Ot.length; Tn++) nn(Ot[Tn], S);
                      Object.freeze && Object.freeze(Ot);
                    } else
                      w(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else nn(Ot, S);
              }
              return S === r ? fn(Oe) : pn(Oe), Oe;
            }
          }
          function on(S, q, fe) {
            return ft(S, q, fe, !0);
          }
          function je(S, q, fe) {
            return ft(S, q, fe, !1);
          }
          var vt = je,
            Vt = on;
          (Do.Fragment = r), (Do.jsx = vt), (Do.jsxs = Vt);
        })()),
    Do
  );
}
process.env.NODE_ENV === 'production' ? (aa.exports = Op()) : (aa.exports = kp());
var $a = aa.exports;
const sr = $a.Fragment,
  I = $a.jsx,
  Fe = $a.jsxs,
  Np = {
    black: '#000',
    white: '#fff',
  },
  Qo = Np,
  $p = {
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
  io = $p,
  Pp = {
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
  ao = Pp,
  Ip = {
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
  so = Ip,
  _p = {
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
  lo = _p,
  Mp = {
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
  co = Mp,
  Ap = {
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
  Lo = Ap,
  Dp = {
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
  Lp = Dp;
function En(e, t) {
  return process.env.NODE_ENV === 'production'
    ? () => null
    : function (...r) {
        return e(...r) || t(...r);
      };
}
function x() {
  return (
    (x = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
          }
          return e;
        }),
    x.apply(this, arguments)
  );
}
function fo(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function Fc(e) {
  if (!fo(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = Fc(e[o]);
    }),
    t
  );
}
function ln(
  e,
  t,
  o = {
    clone: !0,
  },
) {
  const r = o.clone ? x({}, e) : e;
  return (
    fo(e) &&
      fo(t) &&
      Object.keys(t).forEach((i) => {
        i !== '__proto__' &&
          (fo(t[i]) && i in e && fo(e[i])
            ? (r[i] = ln(e[i], t[i], o))
            : o.clone
            ? (r[i] = fo(t[i]) ? Fc(t[i]) : t[i])
            : (r[i] = t[i]));
      }),
    r
  );
}
var sa = { exports: {} },
  Rr = { exports: {} },
  Ze = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ms;
function Fp() {
  if (Ms) return Ze;
  Ms = 1;
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
    v = e ? Symbol.for('react.memo') : 60115,
    g = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    f = e ? Symbol.for('react.fundamental') : 60117,
    T = e ? Symbol.for('react.responder') : 60118,
    w = e ? Symbol.for('react.scope') : 60119;
  function E(m) {
    if (typeof m == 'object' && m !== null) {
      var O = m.$$typeof;
      switch (O) {
        case t:
          switch (((m = m.type), m)) {
            case c:
            case u:
            case r:
            case a:
            case i:
            case p:
              return m;
            default:
              switch (((m = m && m.$$typeof), m)) {
                case l:
                case d:
                case g:
                case v:
                case s:
                  return m;
                default:
                  return O;
              }
          }
        case o:
          return O;
      }
    }
  }
  function y(m) {
    return E(m) === u;
  }
  return (
    (Ze.AsyncMode = c),
    (Ze.ConcurrentMode = u),
    (Ze.ContextConsumer = l),
    (Ze.ContextProvider = s),
    (Ze.Element = t),
    (Ze.ForwardRef = d),
    (Ze.Fragment = r),
    (Ze.Lazy = g),
    (Ze.Memo = v),
    (Ze.Portal = o),
    (Ze.Profiler = a),
    (Ze.StrictMode = i),
    (Ze.Suspense = p),
    (Ze.isAsyncMode = function (m) {
      return y(m) || E(m) === c;
    }),
    (Ze.isConcurrentMode = y),
    (Ze.isContextConsumer = function (m) {
      return E(m) === l;
    }),
    (Ze.isContextProvider = function (m) {
      return E(m) === s;
    }),
    (Ze.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === t;
    }),
    (Ze.isForwardRef = function (m) {
      return E(m) === d;
    }),
    (Ze.isFragment = function (m) {
      return E(m) === r;
    }),
    (Ze.isLazy = function (m) {
      return E(m) === g;
    }),
    (Ze.isMemo = function (m) {
      return E(m) === v;
    }),
    (Ze.isPortal = function (m) {
      return E(m) === o;
    }),
    (Ze.isProfiler = function (m) {
      return E(m) === a;
    }),
    (Ze.isStrictMode = function (m) {
      return E(m) === i;
    }),
    (Ze.isSuspense = function (m) {
      return E(m) === p;
    }),
    (Ze.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === r ||
        m === u ||
        m === a ||
        m === i ||
        m === p ||
        m === b ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === g ||
            m.$$typeof === v ||
            m.$$typeof === s ||
            m.$$typeof === l ||
            m.$$typeof === d ||
            m.$$typeof === f ||
            m.$$typeof === T ||
            m.$$typeof === w ||
            m.$$typeof === h))
      );
    }),
    (Ze.typeOf = E),
    Ze
  );
}
var Qe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var As;
function zp() {
  return (
    As ||
      ((As = 1),
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
            v = e ? Symbol.for('react.memo') : 60115,
            g = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            f = e ? Symbol.for('react.fundamental') : 60117,
            T = e ? Symbol.for('react.responder') : 60118,
            w = e ? Symbol.for('react.scope') : 60119;
          function E(L) {
            return (
              typeof L == 'string' ||
              typeof L == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              L === r ||
              L === u ||
              L === a ||
              L === i ||
              L === p ||
              L === b ||
              (typeof L == 'object' &&
                L !== null &&
                (L.$$typeof === g ||
                  L.$$typeof === v ||
                  L.$$typeof === s ||
                  L.$$typeof === l ||
                  L.$$typeof === d ||
                  L.$$typeof === f ||
                  L.$$typeof === T ||
                  L.$$typeof === w ||
                  L.$$typeof === h))
            );
          }
          function y(L) {
            if (typeof L == 'object' && L !== null) {
              var Te = L.$$typeof;
              switch (Te) {
                case t:
                  var F = L.type;
                  switch (F) {
                    case c:
                    case u:
                    case r:
                    case a:
                    case i:
                    case p:
                      return F;
                    default:
                      var G = F && F.$$typeof;
                      switch (G) {
                        case l:
                        case d:
                        case g:
                        case v:
                        case s:
                          return G;
                        default:
                          return Te;
                      }
                  }
                case o:
                  return Te;
              }
            }
          }
          var m = c,
            O = u,
            R = l,
            D = s,
            $ = t,
            N = d,
            k = r,
            j = g,
            z = v,
            P = o,
            V = a,
            B = i,
            Q = p,
            re = !1;
          function Z(L) {
            return (
              re ||
                ((re = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              _(L) || y(L) === c
            );
          }
          function _(L) {
            return y(L) === u;
          }
          function W(L) {
            return y(L) === l;
          }
          function te(L) {
            return y(L) === s;
          }
          function H(L) {
            return typeof L == 'object' && L !== null && L.$$typeof === t;
          }
          function K(L) {
            return y(L) === d;
          }
          function ne(L) {
            return y(L) === r;
          }
          function ee(L) {
            return y(L) === g;
          }
          function oe(L) {
            return y(L) === v;
          }
          function le(L) {
            return y(L) === o;
          }
          function ue(L) {
            return y(L) === a;
          }
          function ye(L) {
            return y(L) === i;
          }
          function se(L) {
            return y(L) === p;
          }
          (Qe.AsyncMode = m),
            (Qe.ConcurrentMode = O),
            (Qe.ContextConsumer = R),
            (Qe.ContextProvider = D),
            (Qe.Element = $),
            (Qe.ForwardRef = N),
            (Qe.Fragment = k),
            (Qe.Lazy = j),
            (Qe.Memo = z),
            (Qe.Portal = P),
            (Qe.Profiler = V),
            (Qe.StrictMode = B),
            (Qe.Suspense = Q),
            (Qe.isAsyncMode = Z),
            (Qe.isConcurrentMode = _),
            (Qe.isContextConsumer = W),
            (Qe.isContextProvider = te),
            (Qe.isElement = H),
            (Qe.isForwardRef = K),
            (Qe.isFragment = ne),
            (Qe.isLazy = ee),
            (Qe.isMemo = oe),
            (Qe.isPortal = le),
            (Qe.isProfiler = ue),
            (Qe.isStrictMode = ye),
            (Qe.isSuspense = se),
            (Qe.isValidElementType = E),
            (Qe.typeOf = y);
        })()),
    Qe
  );
}
var Ds;
function zc() {
  return (
    Ds ||
      ((Ds = 1), process.env.NODE_ENV === 'production' ? (Rr.exports = Fp()) : (Rr.exports = zp())),
    Rr.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Vi, Ls;
function jp() {
  if (Ls) return Vi;
  Ls = 1;
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
    (Vi = i()
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
    Vi
  );
}
var Bi, Fs;
function Pa() {
  if (Fs) return Bi;
  Fs = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Bi = e), Bi;
}
var Wi, zs;
function jc() {
  return zs || ((zs = 1), (Wi = Function.call.bind(Object.prototype.hasOwnProperty))), Wi;
}
var Ui, js;
function Vp() {
  if (js) return Ui;
  js = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = Pa(),
      o = {},
      r = jc();
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
    (Ui = i),
    Ui
  );
}
var Hi, Vs;
function Bp() {
  if (Vs) return Hi;
  Vs = 1;
  var e = zc(),
    t = jp(),
    o = Pa(),
    r = jc(),
    i = Vp(),
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
    (Hi = function (l, c) {
      var u = typeof Symbol == 'function' && Symbol.iterator,
        d = '@@iterator';
      function p(_) {
        var W = _ && ((u && _[u]) || _[d]);
        if (typeof W == 'function') return W;
      }
      var b = '<<anonymous>>',
        v = {
          array: T('array'),
          bigint: T('bigint'),
          bool: T('boolean'),
          func: T('function'),
          number: T('number'),
          object: T('object'),
          string: T('string'),
          symbol: T('symbol'),
          any: w(),
          arrayOf: E,
          element: y(),
          elementType: m(),
          instanceOf: O,
          node: N(),
          objectOf: D,
          oneOf: R,
          oneOfType: $,
          shape: j,
          exact: z,
        };
      function g(_, W) {
        return _ === W ? _ !== 0 || 1 / _ === 1 / W : _ !== _ && W !== W;
      }
      function h(_, W) {
        (this.message = _), (this.data = W && typeof W == 'object' ? W : {}), (this.stack = '');
      }
      h.prototype = Error.prototype;
      function f(_) {
        if (process.env.NODE_ENV !== 'production')
          var W = {},
            te = 0;
        function H(ne, ee, oe, le, ue, ye, se) {
          if (((le = le || b), (ye = ye || oe), se !== o)) {
            if (c) {
              var L = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((L.name = 'Invariant Violation'), L);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Te = le + ':' + oe;
              !W[Te] && // Avoid spamming the console because they are often not actionable except for lib authors
                te < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    ye +
                    '` prop on `' +
                    le +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (W[Te] = !0),
                te++);
            }
          }
          return ee[oe] == null
            ? ne
              ? ee[oe] === null
                ? new h(
                    'The ' +
                      ue +
                      ' `' +
                      ye +
                      '` is marked as required ' +
                      ('in `' + le + '`, but its value is `null`.'),
                  )
                : new h(
                    'The ' +
                      ue +
                      ' `' +
                      ye +
                      '` is marked as required in ' +
                      ('`' + le + '`, but its value is `undefined`.'),
                  )
              : null
            : _(ee, oe, le, ue, ye);
        }
        var K = H.bind(null, !1);
        return (K.isRequired = H.bind(null, !0)), K;
      }
      function T(_) {
        function W(te, H, K, ne, ee, oe) {
          var le = te[H],
            ue = B(le);
          if (ue !== _) {
            var ye = Q(le);
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                ee +
                '` of type ' +
                ('`' + ye + '` supplied to `' + K + '`, expected ') +
                ('`' + _ + '`.'),
              { expectedType: _ },
            );
          }
          return null;
        }
        return f(W);
      }
      function w() {
        return f(s);
      }
      function E(_) {
        function W(te, H, K, ne, ee) {
          if (typeof _ != 'function')
            return new h(
              'Property `' +
                ee +
                '` of component `' +
                K +
                '` has invalid PropType notation inside arrayOf.',
            );
          var oe = te[H];
          if (!Array.isArray(oe)) {
            var le = B(oe);
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                ee +
                '` of type ' +
                ('`' + le + '` supplied to `' + K + '`, expected an array.'),
            );
          }
          for (var ue = 0; ue < oe.length; ue++) {
            var ye = _(oe, ue, K, ne, ee + '[' + ue + ']', o);
            if (ye instanceof Error) return ye;
          }
          return null;
        }
        return f(W);
      }
      function y() {
        function _(W, te, H, K, ne) {
          var ee = W[te];
          if (!l(ee)) {
            var oe = B(ee);
            return new h(
              'Invalid ' +
                K +
                ' `' +
                ne +
                '` of type ' +
                ('`' + oe + '` supplied to `' + H + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return f(_);
      }
      function m() {
        function _(W, te, H, K, ne) {
          var ee = W[te];
          if (!e.isValidElementType(ee)) {
            var oe = B(ee);
            return new h(
              'Invalid ' +
                K +
                ' `' +
                ne +
                '` of type ' +
                ('`' + oe + '` supplied to `' + H + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return f(_);
      }
      function O(_) {
        function W(te, H, K, ne, ee) {
          if (!(te[H] instanceof _)) {
            var oe = _.name || b,
              le = Z(te[H]);
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                ee +
                '` of type ' +
                ('`' + le + '` supplied to `' + K + '`, expected ') +
                ('instance of `' + oe + '`.'),
            );
          }
          return null;
        }
        return f(W);
      }
      function R(_) {
        if (!Array.isArray(_))
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
        function W(te, H, K, ne, ee) {
          for (var oe = te[H], le = 0; le < _.length; le++) if (g(oe, _[le])) return null;
          var ue = JSON.stringify(_, function (se, L) {
            var Te = Q(L);
            return Te === 'symbol' ? String(L) : L;
          });
          return new h(
            'Invalid ' +
              ne +
              ' `' +
              ee +
              '` of value `' +
              String(oe) +
              '` ' +
              ('supplied to `' + K + '`, expected one of ' + ue + '.'),
          );
        }
        return f(W);
      }
      function D(_) {
        function W(te, H, K, ne, ee) {
          if (typeof _ != 'function')
            return new h(
              'Property `' +
                ee +
                '` of component `' +
                K +
                '` has invalid PropType notation inside objectOf.',
            );
          var oe = te[H],
            le = B(oe);
          if (le !== 'object')
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                ee +
                '` of type ' +
                ('`' + le + '` supplied to `' + K + '`, expected an object.'),
            );
          for (var ue in oe)
            if (r(oe, ue)) {
              var ye = _(oe, ue, K, ne, ee + '.' + ue, o);
              if (ye instanceof Error) return ye;
            }
          return null;
        }
        return f(W);
      }
      function $(_) {
        if (!Array.isArray(_))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var W = 0; W < _.length; W++) {
          var te = _[W];
          if (typeof te != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  re(te) +
                  ' at index ' +
                  W +
                  '.',
              ),
              s
            );
        }
        function H(K, ne, ee, oe, le) {
          for (var ue = [], ye = 0; ye < _.length; ye++) {
            var se = _[ye],
              L = se(K, ne, ee, oe, le, o);
            if (L == null) return null;
            L.data && r(L.data, 'expectedType') && ue.push(L.data.expectedType);
          }
          var Te = ue.length > 0 ? ', expected one of type [' + ue.join(', ') + ']' : '';
          return new h(
            'Invalid ' + oe + ' `' + le + '` supplied to ' + ('`' + ee + '`' + Te + '.'),
          );
        }
        return f(H);
      }
      function N() {
        function _(W, te, H, K, ne) {
          return P(W[te])
            ? null
            : new h(
                'Invalid ' +
                  K +
                  ' `' +
                  ne +
                  '` supplied to ' +
                  ('`' + H + '`, expected a ReactNode.'),
              );
        }
        return f(_);
      }
      function k(_, W, te, H, K) {
        return new h(
          (_ || 'React class') +
            ': ' +
            W +
            ' type `' +
            te +
            '.' +
            H +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            K +
            '`.',
        );
      }
      function j(_) {
        function W(te, H, K, ne, ee) {
          var oe = te[H],
            le = B(oe);
          if (le !== 'object')
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                ee +
                '` of type `' +
                le +
                '` ' +
                ('supplied to `' + K + '`, expected `object`.'),
            );
          for (var ue in _) {
            var ye = _[ue];
            if (typeof ye != 'function') return k(K, ne, ee, ue, Q(ye));
            var se = ye(oe, ue, K, ne, ee + '.' + ue, o);
            if (se) return se;
          }
          return null;
        }
        return f(W);
      }
      function z(_) {
        function W(te, H, K, ne, ee) {
          var oe = te[H],
            le = B(oe);
          if (le !== 'object')
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                ee +
                '` of type `' +
                le +
                '` ' +
                ('supplied to `' + K + '`, expected `object`.'),
            );
          var ue = t({}, te[H], _);
          for (var ye in ue) {
            var se = _[ye];
            if (r(_, ye) && typeof se != 'function') return k(K, ne, ee, ye, Q(se));
            if (!se)
              return new h(
                'Invalid ' +
                  ne +
                  ' `' +
                  ee +
                  '` key `' +
                  ye +
                  '` supplied to `' +
                  K +
                  '`.\nBad object: ' +
                  JSON.stringify(te[H], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(_), null, '  '),
              );
            var L = se(oe, ye, K, ne, ee + '.' + ye, o);
            if (L) return L;
          }
          return null;
        }
        return f(W);
      }
      function P(_) {
        switch (typeof _) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !_;
          case 'object':
            if (Array.isArray(_)) return _.every(P);
            if (_ === null || l(_)) return !0;
            var W = p(_);
            if (W) {
              var te = W.call(_),
                H;
              if (W !== _.entries) {
                for (; !(H = te.next()).done; ) if (!P(H.value)) return !1;
              } else
                for (; !(H = te.next()).done; ) {
                  var K = H.value;
                  if (K && !P(K[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function V(_, W) {
        return _ === 'symbol'
          ? !0
          : W
          ? W['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && W instanceof Symbol)
          : !1;
      }
      function B(_) {
        var W = typeof _;
        return Array.isArray(_) ? 'array' : _ instanceof RegExp ? 'object' : V(W, _) ? 'symbol' : W;
      }
      function Q(_) {
        if (typeof _ > 'u' || _ === null) return '' + _;
        var W = B(_);
        if (W === 'object') {
          if (_ instanceof Date) return 'date';
          if (_ instanceof RegExp) return 'regexp';
        }
        return W;
      }
      function re(_) {
        var W = Q(_);
        switch (W) {
          case 'array':
          case 'object':
            return 'an ' + W;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + W;
          default:
            return W;
        }
      }
      function Z(_) {
        return !_.constructor || !_.constructor.name ? b : _.constructor.name;
      }
      return (
        (v.checkPropTypes = i), (v.resetWarningCache = i.resetWarningCache), (v.PropTypes = v), v
      );
    }),
    Hi
  );
}
var qi, Bs;
function Wp() {
  if (Bs) return qi;
  Bs = 1;
  var e = Pa();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (qi = function () {
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
    qi
  );
}
if (process.env.NODE_ENV !== 'production') {
  var Up = zc(),
    Hp = !0;
  sa.exports = Bp()(Up.isElement, Hp);
} else sa.exports = Wp()();
var qp = sa.exports;
const n = /* @__PURE__ */ Rp(qp);
function Kp(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Vc(e, t, o, r, i) {
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
      !Kp(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const Bc = En(n.element, Vc);
Bc.isRequired = En(n.element.isRequired, Vc);
const Oo = Bc;
function Yp(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Gp(e, t, o, r, i) {
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
      !Yp(a) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const Ia = En(n.elementType, Gp),
  Xp = 'exact-prop: ​';
function _a(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : x({}, e, {
        [Xp]: (t) => {
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
function Wn(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let o = 1; o < arguments.length; o += 1) t += '&args[]=' + encodeURIComponent(arguments[o]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var la = { exports: {} },
  et = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ws;
function Jp() {
  if (Ws) return et;
  Ws = 1;
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
    v = Symbol.for('react.offscreen'),
    g;
  g = Symbol.for('react.module.reference');
  function h(f) {
    if (typeof f == 'object' && f !== null) {
      var T = f.$$typeof;
      switch (T) {
        case e:
          switch (((f = f.type), f)) {
            case o:
            case i:
            case r:
            case u:
            case d:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case s:
                case c:
                case b:
                case p:
                case a:
                  return f;
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
    (et.ContextConsumer = s),
    (et.ContextProvider = a),
    (et.Element = e),
    (et.ForwardRef = c),
    (et.Fragment = o),
    (et.Lazy = b),
    (et.Memo = p),
    (et.Portal = t),
    (et.Profiler = i),
    (et.StrictMode = r),
    (et.Suspense = u),
    (et.SuspenseList = d),
    (et.isAsyncMode = function () {
      return !1;
    }),
    (et.isConcurrentMode = function () {
      return !1;
    }),
    (et.isContextConsumer = function (f) {
      return h(f) === s;
    }),
    (et.isContextProvider = function (f) {
      return h(f) === a;
    }),
    (et.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === e;
    }),
    (et.isForwardRef = function (f) {
      return h(f) === c;
    }),
    (et.isFragment = function (f) {
      return h(f) === o;
    }),
    (et.isLazy = function (f) {
      return h(f) === b;
    }),
    (et.isMemo = function (f) {
      return h(f) === p;
    }),
    (et.isPortal = function (f) {
      return h(f) === t;
    }),
    (et.isProfiler = function (f) {
      return h(f) === i;
    }),
    (et.isStrictMode = function (f) {
      return h(f) === r;
    }),
    (et.isSuspense = function (f) {
      return h(f) === u;
    }),
    (et.isSuspenseList = function (f) {
      return h(f) === d;
    }),
    (et.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === o ||
        f === i ||
        f === r ||
        f === u ||
        f === d ||
        f === v ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === b ||
            f.$$typeof === p ||
            f.$$typeof === a ||
            f.$$typeof === s ||
            f.$$typeof === c ||
            f.$$typeof === g ||
            f.getModuleId !== void 0))
      );
    }),
    (et.typeOf = h),
    et
  );
}
var tt = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Us;
function Zp() {
  return (
    Us ||
      ((Us = 1),
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
            v = Symbol.for('react.offscreen'),
            g = !1,
            h = !1,
            f = !1,
            T = !1,
            w = !1,
            E;
          E = Symbol.for('react.module.reference');
          function y(F) {
            return !!(
              typeof F == 'string' ||
              typeof F == 'function' ||
              F === o ||
              F === i ||
              w ||
              F === r ||
              F === u ||
              F === d ||
              T ||
              F === v ||
              g ||
              h ||
              f ||
              (typeof F == 'object' &&
                F !== null &&
                (F.$$typeof === b ||
                  F.$$typeof === p ||
                  F.$$typeof === a ||
                  F.$$typeof === s ||
                  F.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  F.$$typeof === E ||
                  F.getModuleId !== void 0))
            );
          }
          function m(F) {
            if (typeof F == 'object' && F !== null) {
              var G = F.$$typeof;
              switch (G) {
                case e:
                  var De = F.type;
                  switch (De) {
                    case o:
                    case i:
                    case r:
                    case u:
                    case d:
                      return De;
                    default:
                      var ge = De && De.$$typeof;
                      switch (ge) {
                        case l:
                        case s:
                        case c:
                        case b:
                        case p:
                        case a:
                          return ge;
                        default:
                          return G;
                      }
                  }
                case t:
                  return G;
              }
            }
          }
          var O = s,
            R = a,
            D = e,
            $ = c,
            N = o,
            k = b,
            j = p,
            z = t,
            P = i,
            V = r,
            B = u,
            Q = d,
            re = !1,
            Z = !1;
          function _(F) {
            return (
              re ||
                ((re = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function W(F) {
            return (
              Z ||
                ((Z = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function te(F) {
            return m(F) === s;
          }
          function H(F) {
            return m(F) === a;
          }
          function K(F) {
            return typeof F == 'object' && F !== null && F.$$typeof === e;
          }
          function ne(F) {
            return m(F) === c;
          }
          function ee(F) {
            return m(F) === o;
          }
          function oe(F) {
            return m(F) === b;
          }
          function le(F) {
            return m(F) === p;
          }
          function ue(F) {
            return m(F) === t;
          }
          function ye(F) {
            return m(F) === i;
          }
          function se(F) {
            return m(F) === r;
          }
          function L(F) {
            return m(F) === u;
          }
          function Te(F) {
            return m(F) === d;
          }
          (tt.ContextConsumer = O),
            (tt.ContextProvider = R),
            (tt.Element = D),
            (tt.ForwardRef = $),
            (tt.Fragment = N),
            (tt.Lazy = k),
            (tt.Memo = j),
            (tt.Portal = z),
            (tt.Profiler = P),
            (tt.StrictMode = V),
            (tt.Suspense = B),
            (tt.SuspenseList = Q),
            (tt.isAsyncMode = _),
            (tt.isConcurrentMode = W),
            (tt.isContextConsumer = te),
            (tt.isContextProvider = H),
            (tt.isElement = K),
            (tt.isForwardRef = ne),
            (tt.isFragment = ee),
            (tt.isLazy = oe),
            (tt.isMemo = le),
            (tt.isPortal = ue),
            (tt.isProfiler = ye),
            (tt.isStrictMode = se),
            (tt.isSuspense = L),
            (tt.isSuspenseList = Te),
            (tt.isValidElementType = y),
            (tt.typeOf = m);
        })()),
    tt
  );
}
process.env.NODE_ENV === 'production' ? (la.exports = Jp()) : (la.exports = Zp());
var Hs = la.exports;
const Qp = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function ef(e) {
  const t = `${e}`.match(Qp);
  return (t && t[1]) || '';
}
function Wc(e, t = '') {
  return e.displayName || e.name || ef(e) || t;
}
function qs(e, t, o) {
  const r = Wc(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function tf(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return Wc(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Hs.ForwardRef:
          return qs(e, e.render, 'ForwardRef');
        case Hs.Memo:
          return qs(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function Nn(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = e[t],
    s = i || t;
  return a == null
    ? null
    : a && a.nodeType !== 1
    ? new Error(`Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an HTMLElement.`)
    : null;
}
const nf = n.oneOfType([n.func, n.object]),
  Ht = nf;
function ce(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : Wn(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ks(...e) {
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
function Uc(e, t = 166) {
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
function Ki(e, t) {
  return /* @__PURE__ */ C.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function wt(e) {
  return (e && e.ownerDocument) || document;
}
function Qn(e) {
  return wt(e).defaultView || window;
}
function Ur(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const of = typeof window < 'u' ? C.useLayoutEffect : C.useEffect,
  $n = of;
let Ys = 0;
function rf(e) {
  const [t, o] = C.useState(e),
    r = e || t;
  return (
    C.useEffect(() => {
      t == null && ((Ys += 1), o(`mui-${Ys}`));
    }, [t]),
    r
  );
}
const Gs = C['useId'];
function Hc(e) {
  if (Gs !== void 0) {
    const t = Gs();
    return e ?? t;
  }
  return rf(e);
}
function af(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = i || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${a}\` is not supported. Please remove it.`)
    : null;
}
function Jn({ controlled: e, default: t, name: o, state: r = 'value' }) {
  const { current: i } = C.useRef(e !== void 0),
    [a, s] = C.useState(t),
    l = i ? e : a;
  if (process.env.NODE_ENV !== 'production') {
    C.useEffect(() => {
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
    const { current: u } = C.useRef(t);
    C.useEffect(() => {
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
  const c = C.useCallback((u) => {
    i || s(u);
  }, []);
  return [l, c];
}
function Ft(e) {
  const t = C.useRef(e);
  return (
    $n(() => {
      t.current = e;
    }),
    C.useCallback(
      (...o) =>
        // @ts-expect-error hide `this`
        // tslint:disable-next-line:ban-comma-operator
        (0, t.current)(...o),
      [],
    )
  );
}
function Rt(...e) {
  return C.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              Ur(o, t);
            });
          },
    e,
  );
}
let ri = !0,
  ca = !1,
  Xs;
const sf = {
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
function lf(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && sf[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function cf(e) {
  e.metaKey || e.altKey || e.ctrlKey || (ri = !0);
}
function Yi() {
  ri = !1;
}
function uf() {
  this.visibilityState === 'hidden' && ca && (ri = !0);
}
function df(e) {
  e.addEventListener('keydown', cf, !0),
    e.addEventListener('mousedown', Yi, !0),
    e.addEventListener('pointerdown', Yi, !0),
    e.addEventListener('touchstart', Yi, !0),
    e.addEventListener('visibilitychange', uf, !0);
}
function pf(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return ri || lf(t);
}
function qc() {
  const e = C.useCallback((i) => {
      i != null && df(i.ownerDocument);
    }, []),
    t = C.useRef(!1);
  function o() {
    return t.current
      ? ((ca = !0),
        window.clearTimeout(Xs),
        (Xs = window.setTimeout(() => {
          ca = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(i) {
    return pf(i) ? ((t.current = !0), !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: o,
    ref: e,
  };
}
function Kc(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const ff = (e) => {
    const t = C.useRef({});
    return (
      C.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  mf = ff,
  hf = {
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
  bf = hf;
function gf(e) {
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
function vf(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const yf = Number.isInteger || vf;
function Yc(e, t, o, r) {
  const i = e[t];
  if (i == null || !yf(i)) {
    const a = gf(i);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function Gc(e, t, ...o) {
  return e[t] === void 0 ? null : Yc(e, t, ...o);
}
function ua() {
  return null;
}
Gc.isRequired = Yc;
ua.isRequired = ua;
const Ma = process.env.NODE_ENV === 'production' ? ua : Gc;
function Aa(e, t) {
  const o = x({}, t);
  return (
    Object.keys(e).forEach((r) => {
      if (r.toString().match(/^(components|slots)$/)) o[r] = x({}, e[r], o[r]);
      else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
        const i = e[r] || {},
          a = t[r];
        (o[r] = {}),
          !a || !Object.keys(a)
            ? (o[r] = i)
            : !i || !Object.keys(i)
            ? (o[r] = a)
            : ((o[r] = x({}, a)),
              Object.keys(i).forEach((s) => {
                o[r][s] = Aa(i[s], a[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function Ye(e, t, o = void 0) {
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
const Js = (e) => e,
  xf = () => {
    let e = Js;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Js;
      },
    };
  },
  Ef = xf(),
  Cf = Ef,
  wf = {
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
function We(e, t, o = 'Mui') {
  const r = wf[t];
  return r ? `${o}-${r}` : `${Cf.generate(e)}-${t}`;
}
function Ve(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((i) => {
      r[i] = We(e, i, o);
    }),
    r
  );
}
function Se(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) (i = r[a]), !(t.indexOf(i) >= 0) && (o[i] = e[i]);
  return o;
}
function Xc(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var Tf =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  Sf = /* @__PURE__ */ Xc(
    function (e) {
      return (
        Tf.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
      );
    },
    /* Z+1 */
  );
function Rf(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function Of(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var kf = /* @__PURE__ */ (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Of(this));
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
          var s = Rf(i);
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
  Lt = '-ms-',
  Hr = '-moz-',
  Ge = '-webkit-',
  Da = 'comm',
  La = 'rule',
  Fa = 'decl',
  Nf = '@import',
  Jc = '@keyframes',
  $f = Math.abs,
  ii = String.fromCharCode,
  Pf = Object.assign;
function If(e, t) {
  return _t(e, 0) ^ 45
    ? (((((((t << 2) ^ _t(e, 0)) << 2) ^ _t(e, 1)) << 2) ^ _t(e, 2)) << 2) ^ _t(e, 3)
    : 0;
}
function Zc(e) {
  return e.trim();
}
function _f(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function at(e, t, o) {
  return e.replace(t, o);
}
function da(e, t) {
  return e.indexOf(t);
}
function _t(e, t) {
  return e.charCodeAt(t) | 0;
}
function er(e, t, o) {
  return e.slice(t, o);
}
function Rn(e) {
  return e.length;
}
function za(e) {
  return e.length;
}
function Or(e, t) {
  return t.push(e), e;
}
function Mf(e, t) {
  return e.map(t).join('');
}
var ai = 1,
  yo = 1,
  Qc = 0,
  Ut = 0,
  kt = 0,
  ko = '';
function si(e, t, o, r, i, a, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: i,
    children: a,
    line: ai,
    column: yo,
    length: s,
    return: '',
  };
}
function Fo(e, t) {
  return Pf(si('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function Af() {
  return kt;
}
function Df() {
  return (kt = Ut > 0 ? _t(ko, --Ut) : 0), yo--, kt === 10 && ((yo = 1), ai--), kt;
}
function Jt() {
  return (kt = Ut < Qc ? _t(ko, Ut++) : 0), yo++, kt === 10 && ((yo = 1), ai++), kt;
}
function kn() {
  return _t(ko, Ut);
}
function Lr() {
  return Ut;
}
function lr(e, t) {
  return er(ko, e, t);
}
function tr(e) {
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
function eu(e) {
  return (ai = yo = 1), (Qc = Rn((ko = e))), (Ut = 0), [];
}
function tu(e) {
  return (ko = ''), e;
}
function Fr(e) {
  return Zc(lr(Ut - 1, pa(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Lf(e) {
  for (; (kt = kn()) && kt < 33; ) Jt();
  return tr(e) > 2 || tr(kt) > 3 ? '' : ' ';
}
function Ff(e, t) {
  for (; --t && Jt() && !(kt < 48 || kt > 102 || (kt > 57 && kt < 65) || (kt > 70 && kt < 97)); );
  return lr(e, Lr() + (t < 6 && kn() == 32 && Jt() == 32));
}
function pa(e) {
  for (; Jt(); )
    switch (kt) {
      case e:
        return Ut;
      case 34:
      case 39:
        e !== 34 && e !== 39 && pa(kt);
        break;
      case 40:
        e === 41 && pa(e);
        break;
      case 92:
        Jt();
        break;
    }
  return Ut;
}
function zf(e, t) {
  for (; Jt() && e + kt !== 47 + 10; ) if (e + kt === 42 + 42 && kn() === 47) break;
  return '/*' + lr(t, Ut - 1) + '*' + ii(e === 47 ? e : Jt());
}
function jf(e) {
  for (; !tr(kn()); ) Jt();
  return lr(e, Ut);
}
function Vf(e) {
  return tu(zr('', null, null, null, [''], (e = eu(e)), 0, [0], e));
}
function zr(e, t, o, r, i, a, s, l, c) {
  for (
    var u = 0,
      d = 0,
      p = s,
      b = 0,
      v = 0,
      g = 0,
      h = 1,
      f = 1,
      T = 1,
      w = 0,
      E = '',
      y = i,
      m = a,
      O = r,
      R = E;
    f;

  )
    switch (((g = w), (w = Jt()))) {
      case 40:
        if (g != 108 && _t(R, p - 1) == 58) {
          da((R += at(Fr(w), '&', '&\f')), '&\f') != -1 && (T = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        R += Fr(w);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        R += Lf(g);
        break;
      case 92:
        R += Ff(Lr() - 1, 7);
        continue;
      case 47:
        switch (kn()) {
          case 42:
          case 47:
            Or(Bf(zf(Jt(), Lr()), t, o), c);
            break;
          default:
            R += '/';
        }
        break;
      case 123 * h:
        l[u++] = Rn(R) * T;
      case 125 * h:
      case 59:
      case 0:
        switch (w) {
          case 0:
          case 125:
            f = 0;
          case 59 + d:
            v > 0 &&
              Rn(R) - p &&
              Or(v > 32 ? Qs(R + ';', r, o, p - 1) : Qs(at(R, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            R += ';';
          default:
            if ((Or((O = Zs(R, t, o, u, d, i, l, E, (y = []), (m = []), p)), a), w === 123))
              if (d === 0) zr(R, t, O, O, y, a, p, l, m);
              else
                switch (b === 99 && _t(R, 3) === 110 ? 100 : b) {
                  case 100:
                  case 109:
                  case 115:
                    zr(
                      e,
                      O,
                      O,
                      r && Or(Zs(e, O, O, 0, 0, i, l, E, i, (y = []), p), m),
                      i,
                      m,
                      p,
                      l,
                      r ? y : m,
                    );
                    break;
                  default:
                    zr(R, O, O, O, [''], m, 0, l, m);
                }
        }
        (u = d = v = 0), (h = T = 1), (E = R = ''), (p = s);
        break;
      case 58:
        (p = 1 + Rn(R)), (v = g);
      default:
        if (h < 1) {
          if (w == 123) --h;
          else if (w == 125 && h++ == 0 && Df() == 125) continue;
        }
        switch (((R += ii(w)), w * h)) {
          case 38:
            T = d > 0 ? 1 : ((R += '\f'), -1);
            break;
          case 44:
            (l[u++] = (Rn(R) - 1) * T), (T = 1);
            break;
          case 64:
            kn() === 45 && (R += Fr(Jt())), (b = kn()), (d = p = Rn((E = R += jf(Lr())))), w++;
            break;
          case 45:
            g === 45 && Rn(R) == 2 && (h = 0);
        }
    }
  return a;
}
function Zs(e, t, o, r, i, a, s, l, c, u, d) {
  for (var p = i - 1, b = i === 0 ? a : [''], v = za(b), g = 0, h = 0, f = 0; g < r; ++g)
    for (var T = 0, w = er(e, p + 1, (p = $f((h = s[g])))), E = e; T < v; ++T)
      (E = Zc(h > 0 ? b[T] + ' ' + w : at(w, /&\f/g, b[T]))) && (c[f++] = E);
  return si(e, t, o, i === 0 ? La : l, c, u, d);
}
function Bf(e, t, o) {
  return si(e, t, o, Da, ii(Af()), er(e, 2, -2), 0);
}
function Qs(e, t, o, r) {
  return si(e, t, o, Fa, er(e, 0, r), er(e, r + 1, -1), r);
}
function bo(e, t) {
  for (var o = '', r = za(e), i = 0; i < r; i++) o += t(e[i], i, e, t) || '';
  return o;
}
function Wf(e, t, o, r) {
  switch (e.type) {
    case Nf:
    case Fa:
      return (e.return = e.return || e.value);
    case Da:
      return '';
    case Jc:
      return (e.return = e.value + '{' + bo(e.children, r) + '}');
    case La:
      e.value = e.props.join(',');
  }
  return Rn((o = bo(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function Uf(e) {
  var t = za(e);
  return function (o, r, i, a) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, i, a) || '';
    return s;
  };
}
function Hf(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var qf = function (t, o, r) {
    for (var i = 0, a = 0; (i = a), (a = kn()), i === 38 && a === 12 && (o[r] = 1), !tr(a); ) Jt();
    return lr(t, Ut);
  },
  Kf = function (t, o) {
    var r = -1,
      i = 44;
    do
      switch (tr(i)) {
        case 0:
          i === 38 && kn() === 12 && (o[r] = 1), (t[r] += qf(Ut - 1, o, r));
          break;
        case 2:
          t[r] += Fr(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = kn() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += ii(i);
      }
    while ((i = Jt()));
    return t;
  },
  Yf = function (t, o) {
    return tu(Kf(eu(t), o));
  },
  el = /* @__PURE__ */ new WeakMap(),
  Gf = function (t) {
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
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !el.get(r)) && !i) {
        el.set(t, !0);
        for (var a = [], s = Yf(o, a), l = r.props, c = 0, u = 0; c < s.length; c++)
          for (var d = 0; d < l.length; d++, u++)
            t.props[u] = a[c] ? s[c].replace(/&\f/g, l[d]) : l[d] + ' ' + s[c];
      }
    }
  },
  Xf = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      // charcode for l
      o.charCodeAt(0) === 108 && // charcode for b
        o.charCodeAt(2) === 98 &&
        ((t.return = ''), (t.value = ''));
    }
  },
  Jf =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  Zf = function (t) {
    return t.type === 'comm' && t.children.indexOf(Jf) > -1;
  },
  Qf = function (t) {
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
              if (Zf(u)) return;
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
  nu = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  em = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!nu(o[r])) return !0;
    return !1;
  },
  tl = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  tm = function (t, o, r) {
    nu(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          tl(t))
        : em(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          tl(t)));
  };
function ou(e, t) {
  switch (If(e, t)) {
    case 5103:
      return Ge + 'print-' + e + e;
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
      return Ge + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Ge + e + Hr + e + Lt + e + e;
    case 6828:
    case 4268:
      return Ge + e + Lt + e + e;
    case 6165:
      return Ge + e + Lt + 'flex-' + e + e;
    case 5187:
      return Ge + e + at(e, /(\w+).+(:[^]+)/, Ge + 'box-$1$2' + Lt + 'flex-$1$2') + e;
    case 5443:
      return Ge + e + Lt + 'flex-item-' + at(e, /flex-|-self/, '') + e;
    case 4675:
      return Ge + e + Lt + 'flex-line-pack' + at(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return Ge + e + Lt + at(e, 'shrink', 'negative') + e;
    case 5292:
      return Ge + e + Lt + at(e, 'basis', 'preferred-size') + e;
    case 6060:
      return Ge + 'box-' + at(e, '-grow', '') + Ge + e + Lt + at(e, 'grow', 'positive') + e;
    case 4554:
      return Ge + at(e, /([^-])(transform)/g, '$1' + Ge + '$2') + e;
    case 6187:
      return at(at(at(e, /(zoom-|grab)/, Ge + '$1'), /(image-set)/, Ge + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return at(e, /(image-set\([^]*)/, Ge + '$1$`$1');
    case 4968:
      return (
        at(
          at(e, /(.+:)(flex-)?(.*)/, Ge + 'box-pack:$3' + Lt + 'flex-pack:$3'),
          /s.+-b[^;]+/,
          'justify',
        ) +
        Ge +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return at(e, /(.+)-inline(.+)/, Ge + '$1$2') + e;
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
      if (Rn(e) - 1 - t > 6)
        switch (_t(e, t + 1)) {
          case 109:
            if (_t(e, t + 4) !== 45) break;
          case 102:
            return (
              at(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + Ge + '$2-$3$1' + Hr + (_t(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~da(e, 'stretch') ? ou(at(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (_t(e, t + 1) !== 115) break;
    case 6444:
      switch (_t(e, Rn(e) - 3 - (~da(e, '!important') && 10))) {
        case 107:
          return at(e, ':', ':' + Ge) + e;
        case 101:
          return (
            at(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                Ge +
                (_t(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                Ge +
                '$2$3$1' +
                Lt +
                '$2box$3',
            ) + e
          );
      }
      break;
    case 5936:
      switch (_t(e, t + 11)) {
        case 114:
          return Ge + e + Lt + at(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return Ge + e + Lt + at(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return Ge + e + Lt + at(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return Ge + e + Lt + e + e;
  }
  return e;
}
var nm = function (t, o, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Fa:
          t.return = ou(t.value, t.length);
          break;
        case Jc:
          return bo(
            [
              Fo(t, {
                value: at(t.value, '@', '@' + Ge),
              }),
            ],
            i,
          );
        case La:
          if (t.length)
            return Mf(t.props, function (a) {
              switch (_f(a, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return bo(
                    [
                      Fo(t, {
                        props: [at(a, /:(read-\w+)/, ':' + Hr + '$1')],
                      }),
                    ],
                    i,
                  );
                case '::placeholder':
                  return bo(
                    [
                      Fo(t, {
                        props: [at(a, /:(plac\w+)/, ':' + Ge + 'input-$1')],
                      }),
                      Fo(t, {
                        props: [at(a, /:(plac\w+)/, ':' + Hr + '$1')],
                      }),
                      Fo(t, {
                        props: [at(a, /:(plac\w+)/, Lt + 'input-$1')],
                      }),
                    ],
                    i,
                  );
              }
              return '';
            });
      }
  },
  om = [nm],
  rm = function (t) {
    var o = t.key;
    if (process.env.NODE_ENV !== 'production' && !o)
      throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
    if (o === 'css') {
      var r = document.querySelectorAll('style[data-emotion]:not([data-s])');
      Array.prototype.forEach.call(r, function (h) {
        var f = h.getAttribute('data-emotion');
        f.indexOf(' ') !== -1 && (document.head.appendChild(h), h.setAttribute('data-s', ''));
      });
    }
    var i = t.stylisPlugins || om;
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
          for (var f = h.getAttribute('data-emotion').split(' '), T = 1; T < f.length; T++)
            a[f[T]] = !0;
          l.push(h);
        },
      );
    var c,
      u = [Gf, Xf];
    process.env.NODE_ENV !== 'production' &&
      u.push(
        Qf({
          get compat() {
            return g.compat;
          },
        }),
        tm,
      );
    {
      var d,
        p = [
          Wf,
          process.env.NODE_ENV !== 'production'
            ? function (h) {
                h.root ||
                  (h.return
                    ? d.insert(h.return)
                    : h.value && h.type !== Da && d.insert(h.value + '{}'));
              }
            : Hf(function (h) {
                d.insert(h);
              }),
        ],
        b = Uf(u.concat(i, p)),
        v = function (f) {
          return bo(Vf(f), b);
        };
      c = function (f, T, w, E) {
        (d = w),
          process.env.NODE_ENV !== 'production' &&
            T.map !== void 0 &&
            (d = {
              insert: function (m) {
                w.insert(m + T.map);
              },
            }),
          v(f ? f + '{' + T.styles + '}' : T.styles),
          E && (g.inserted[T.name] = !0);
      };
    }
    var g = {
      key: o,
      sheet: new kf({
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
  fa = { exports: {} },
  nt = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nl;
function im() {
  if (nl) return nt;
  nl = 1;
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
    v = e ? Symbol.for('react.memo') : 60115,
    g = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    f = e ? Symbol.for('react.fundamental') : 60117,
    T = e ? Symbol.for('react.responder') : 60118,
    w = e ? Symbol.for('react.scope') : 60119;
  function E(m) {
    if (typeof m == 'object' && m !== null) {
      var O = m.$$typeof;
      switch (O) {
        case t:
          switch (((m = m.type), m)) {
            case c:
            case u:
            case r:
            case a:
            case i:
            case p:
              return m;
            default:
              switch (((m = m && m.$$typeof), m)) {
                case l:
                case d:
                case g:
                case v:
                case s:
                  return m;
                default:
                  return O;
              }
          }
        case o:
          return O;
      }
    }
  }
  function y(m) {
    return E(m) === u;
  }
  return (
    (nt.AsyncMode = c),
    (nt.ConcurrentMode = u),
    (nt.ContextConsumer = l),
    (nt.ContextProvider = s),
    (nt.Element = t),
    (nt.ForwardRef = d),
    (nt.Fragment = r),
    (nt.Lazy = g),
    (nt.Memo = v),
    (nt.Portal = o),
    (nt.Profiler = a),
    (nt.StrictMode = i),
    (nt.Suspense = p),
    (nt.isAsyncMode = function (m) {
      return y(m) || E(m) === c;
    }),
    (nt.isConcurrentMode = y),
    (nt.isContextConsumer = function (m) {
      return E(m) === l;
    }),
    (nt.isContextProvider = function (m) {
      return E(m) === s;
    }),
    (nt.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === t;
    }),
    (nt.isForwardRef = function (m) {
      return E(m) === d;
    }),
    (nt.isFragment = function (m) {
      return E(m) === r;
    }),
    (nt.isLazy = function (m) {
      return E(m) === g;
    }),
    (nt.isMemo = function (m) {
      return E(m) === v;
    }),
    (nt.isPortal = function (m) {
      return E(m) === o;
    }),
    (nt.isProfiler = function (m) {
      return E(m) === a;
    }),
    (nt.isStrictMode = function (m) {
      return E(m) === i;
    }),
    (nt.isSuspense = function (m) {
      return E(m) === p;
    }),
    (nt.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === r ||
        m === u ||
        m === a ||
        m === i ||
        m === p ||
        m === b ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === g ||
            m.$$typeof === v ||
            m.$$typeof === s ||
            m.$$typeof === l ||
            m.$$typeof === d ||
            m.$$typeof === f ||
            m.$$typeof === T ||
            m.$$typeof === w ||
            m.$$typeof === h))
      );
    }),
    (nt.typeOf = E),
    nt
  );
}
var ot = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ol;
function am() {
  return (
    ol ||
      ((ol = 1),
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
            v = e ? Symbol.for('react.memo') : 60115,
            g = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            f = e ? Symbol.for('react.fundamental') : 60117,
            T = e ? Symbol.for('react.responder') : 60118,
            w = e ? Symbol.for('react.scope') : 60119;
          function E(L) {
            return (
              typeof L == 'string' ||
              typeof L == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              L === r ||
              L === u ||
              L === a ||
              L === i ||
              L === p ||
              L === b ||
              (typeof L == 'object' &&
                L !== null &&
                (L.$$typeof === g ||
                  L.$$typeof === v ||
                  L.$$typeof === s ||
                  L.$$typeof === l ||
                  L.$$typeof === d ||
                  L.$$typeof === f ||
                  L.$$typeof === T ||
                  L.$$typeof === w ||
                  L.$$typeof === h))
            );
          }
          function y(L) {
            if (typeof L == 'object' && L !== null) {
              var Te = L.$$typeof;
              switch (Te) {
                case t:
                  var F = L.type;
                  switch (F) {
                    case c:
                    case u:
                    case r:
                    case a:
                    case i:
                    case p:
                      return F;
                    default:
                      var G = F && F.$$typeof;
                      switch (G) {
                        case l:
                        case d:
                        case g:
                        case v:
                        case s:
                          return G;
                        default:
                          return Te;
                      }
                  }
                case o:
                  return Te;
              }
            }
          }
          var m = c,
            O = u,
            R = l,
            D = s,
            $ = t,
            N = d,
            k = r,
            j = g,
            z = v,
            P = o,
            V = a,
            B = i,
            Q = p,
            re = !1;
          function Z(L) {
            return (
              re ||
                ((re = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              _(L) || y(L) === c
            );
          }
          function _(L) {
            return y(L) === u;
          }
          function W(L) {
            return y(L) === l;
          }
          function te(L) {
            return y(L) === s;
          }
          function H(L) {
            return typeof L == 'object' && L !== null && L.$$typeof === t;
          }
          function K(L) {
            return y(L) === d;
          }
          function ne(L) {
            return y(L) === r;
          }
          function ee(L) {
            return y(L) === g;
          }
          function oe(L) {
            return y(L) === v;
          }
          function le(L) {
            return y(L) === o;
          }
          function ue(L) {
            return y(L) === a;
          }
          function ye(L) {
            return y(L) === i;
          }
          function se(L) {
            return y(L) === p;
          }
          (ot.AsyncMode = m),
            (ot.ConcurrentMode = O),
            (ot.ContextConsumer = R),
            (ot.ContextProvider = D),
            (ot.Element = $),
            (ot.ForwardRef = N),
            (ot.Fragment = k),
            (ot.Lazy = j),
            (ot.Memo = z),
            (ot.Portal = P),
            (ot.Profiler = V),
            (ot.StrictMode = B),
            (ot.Suspense = Q),
            (ot.isAsyncMode = Z),
            (ot.isConcurrentMode = _),
            (ot.isContextConsumer = W),
            (ot.isContextProvider = te),
            (ot.isElement = H),
            (ot.isForwardRef = K),
            (ot.isFragment = ne),
            (ot.isLazy = ee),
            (ot.isMemo = oe),
            (ot.isPortal = le),
            (ot.isProfiler = ue),
            (ot.isStrictMode = ye),
            (ot.isSuspense = se),
            (ot.isValidElementType = E),
            (ot.typeOf = y);
        })()),
    ot
  );
}
process.env.NODE_ENV === 'production' ? (fa.exports = im()) : (fa.exports = am());
var sm = fa.exports,
  ru = sm,
  lm = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  cm = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  iu = {};
iu[ru.ForwardRef] = lm;
iu[ru.Memo] = cm;
var um = !0;
function ja(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (i) {
      e[i] !== void 0 ? t.push(e[i] + ';') : (r += i + ' ');
    }),
    r
  );
}
var li = function (t, o, r) {
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
      um === !1) &&
      t.registered[i] === void 0 &&
      (t.registered[i] = o.styles);
  },
  ci = function (t, o, r) {
    li(t, o, r);
    var i = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var a = o;
      do t.insert(o === a ? '.' + i : '', a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  };
function dm(e) {
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
var pm = {
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
  rl = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  fm =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  mm = /[A-Z]|^ms/g,
  au = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Va = function (t) {
    return t.charCodeAt(1) === 45;
  },
  il = function (t) {
    return t != null && typeof t != 'boolean';
  },
  Gi = /* @__PURE__ */ Xc(function (e) {
    return Va(e) ? e : e.replace(mm, '-$&').toLowerCase();
  }),
  qr = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(au, function (r, i, a) {
            return (
              (mn = {
                name: i,
                styles: a,
                next: mn,
              }),
              i
            );
          });
    }
    return pm[t] !== 1 && !Va(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var hm =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    bm = ['normal', 'none', 'initial', 'inherit', 'unset'],
    gm = qr,
    vm = /^-ms-/,
    ym = /-(.)/g,
    al = {};
  qr = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (bm.indexOf(o) === -1 &&
          !hm.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = gm(t, o);
    return (
      r !== '' &&
        !Va(t) &&
        t.indexOf('-') !== -1 &&
        al[t] === void 0 &&
        ((al[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(vm, 'ms-').replace(ym, function (i, a) {
              return a.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var su =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function nr(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(su);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1)
        return (
          (mn = {
            name: o.name,
            styles: o.styles,
            next: mn,
          }),
          o.name
        );
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; )
            (mn = {
              name: r.name,
              styles: r.styles,
              next: mn,
            }),
              (r = r.next);
        var i = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (i += o.map), i;
      }
      return xm(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var a = mn,
          s = o(e);
        return (mn = a), nr(e, t, s);
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
          c = o.replace(au, function (d, p, b) {
            var v = 'animation' + l.length;
            return (
              l.push(
                'const ' + v + ' = keyframes`' + b.replace(/^@keyframes animation-\w+/, '') + '`',
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
function xm(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var i = 0; i < o.length; i++) r += nr(e, t, o[i]) + ';';
  else
    for (var a in o) {
      var s = o[a];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += a + '{' + t[s] + '}')
          : il(s) && (r += Gi(a) + ':' + qr(a, s) + ';');
      else {
        if (a === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(su);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) il(s[l]) && (r += Gi(a) + ':' + qr(a, s[l]) + ';');
        else {
          var c = nr(e, t, s);
          switch (a) {
            case 'animation':
            case 'animationName': {
              r += Gi(a) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && a === 'undefined' && console.error(fm),
                (r += a + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var sl = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  lu;
process.env.NODE_ENV !== 'production' &&
  (lu = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var mn,
  xo = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      a = '';
    mn = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((i = !1), (a += nr(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(rl),
        (a += s[0]));
    for (var l = 1; l < t.length; l++)
      (a += nr(r, o, t[l])),
        i &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(rl),
          (a += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (a = a.replace(lu, function (b) {
        return (c = b), '';
      })),
      (sl.lastIndex = 0);
    for (var u = '', d; (d = sl.exec(a)) !== null; )
      u +=
        '-' + // $FlowFixMe we know it's not null
        d[1];
    var p = dm(a) + u;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: p,
          styles: a,
          map: c,
          next: mn,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : {
          name: p,
          styles: a,
          next: mn,
        };
  },
  Em = function (t) {
    return t();
  },
  cu = C['useInsertionEffect'] ? C['useInsertionEffect'] : !1,
  Ba = cu || Em,
  ll = cu || Ac,
  Cm = {}.hasOwnProperty,
  Wa = /* @__PURE__ */ ar(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement < 'u'
      ? /* @__PURE__ */ rm({
          key: 'css',
        })
      : null,
  );
process.env.NODE_ENV !== 'production' && (Wa.displayName = 'EmotionCacheContext');
Wa.Provider;
var ui = function (t) {
    return /* @__PURE__ */ Oa(function (o, r) {
      var i = Bn(Wa);
      return t(o, i, r);
    });
  },
  cr = /* @__PURE__ */ ar({});
process.env.NODE_ENV !== 'production' && (cr.displayName = 'EmotionThemeContext');
var cl = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  ul = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  wm = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      li(o, r, i),
      Ba(function () {
        return ci(o, r, i);
      }),
      null
    );
  },
  Tm = /* @__PURE__ */ ui(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[cl],
      a = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = ja(t.registered, a, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = xo(a, void 0, Bn(cr));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[ul];
      c && (l = xo([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var u = {};
    for (var d in e)
      Cm.call(e, d) &&
        d !== 'css' &&
        d !== cl &&
        (process.env.NODE_ENV === 'production' || d !== ul) &&
        (u[d] = e[d]);
    return (
      (u.ref = o),
      (u.className = s),
      /* @__PURE__ */ jn(
        ka,
        null,
        /* @__PURE__ */ jn(wm, {
          cache: t,
          serialized: l,
          isStringTag: typeof i == 'string',
        }),
        /* @__PURE__ */ jn(i, u),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (Tm.displayName = 'EmotionCssPropInternal');
var Sm = {
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
  dl = !1,
  uu = /* @__PURE__ */ ui(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !dl && // check for className as well since the user is
      // probably using the custom createElement which
      // means it will be turned into a className prop
      // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (dl = !0));
    var o = e.styles,
      r = xo([o], void 0, Bn(cr)),
      i = bn();
    return (
      ll(
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
      ll(
        function () {
          var a = i.current,
            s = a[0],
            l = a[1];
          if (l) {
            a[1] = !1;
            return;
          }
          if ((r.next !== void 0 && ci(t, r.next, !0), s.tags.length)) {
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
process.env.NODE_ENV !== 'production' && (uu.displayName = 'EmotionGlobal');
function Rm() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return xo(t);
}
var Ua = function () {
    var t = Rm.apply(void 0, arguments),
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
  Om = function e(t) {
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
function km(e, t, o) {
  var r = [],
    i = ja(e, r, o);
  return r.length < 2 ? o : i + t(r);
}
var Nm = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      Ba(function () {
        for (var i = 0; i < r.length; i++) ci(o, r[i], !1);
      }),
      null
    );
  },
  $m = /* @__PURE__ */ ui(function (e, t) {
    var o = !1,
      r = [],
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        var b = xo(d, t.registered);
        return r.push(b), li(t, b, !1), t.key + '-' + b.name;
      },
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        return km(t.registered, i, Om(d));
      },
      s = {
        css: i,
        cx: a,
        theme: Bn(cr),
      },
      l = e.children(s);
    return (
      (o = !0),
      /* @__PURE__ */ jn(
        ka,
        null,
        /* @__PURE__ */ jn(Nm, {
          cache: t,
          serializedArr: r,
        }),
        l,
      )
    );
  });
process.env.NODE_ENV !== 'production' && ($m.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var pl = !0,
    Pm = typeof jest < 'u' || typeof vi < 'u';
  if (pl && !Pm) {
    var fl =
        // $FlowIgnore
        typeof globalThis < 'u' ? globalThis : pl ? window : global,
      ml = '__EMOTION_REACT_' + Sm.version.split('.')[0] + '__';
    fl[ml] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (fl[ml] = !0);
  }
}
var Im = Sf,
  _m = function (t) {
    return t !== 'theme';
  },
  hl = function (t) {
    return typeof t == 'string' && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      t.charCodeAt(0) > 96
      ? Im
      : _m;
  },
  bl = function (t, o, r) {
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
  gl = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Mm = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      li(o, r, i),
      Ba(function () {
        return ci(o, r, i);
      }),
      null
    );
  },
  Am = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      i = (r && t.__emotion_base) || t,
      a,
      s;
    o !== void 0 && ((a = o.label), (s = o.target));
    var l = bl(t, o, r),
      c = l || hl(i),
      u = !c('as');
    return function () {
      var d = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((a !== void 0 && p.push('label:' + a + ';'), d[0] == null || d[0].raw === void 0))
        p.push.apply(p, d);
      else {
        process.env.NODE_ENV !== 'production' && d[0][0] === void 0 && console.error(gl),
          p.push(d[0][0]);
        for (var b = d.length, v = 1; v < b; v++)
          process.env.NODE_ENV !== 'production' && d[0][v] === void 0 && console.error(gl),
            p.push(d[v], d[0][v]);
      }
      var g = ui(function (h, f, T) {
        var w = (u && h.as) || i,
          E = '',
          y = [],
          m = h;
        if (h.theme == null) {
          m = {};
          for (var O in h) m[O] = h[O];
          m.theme = Bn(cr);
        }
        typeof h.className == 'string'
          ? (E = ja(f.registered, y, h.className))
          : h.className != null && (E = h.className + ' ');
        var R = xo(p.concat(y), f.registered, m);
        (E += f.key + '-' + R.name), s !== void 0 && (E += ' ' + s);
        var D = u && l === void 0 ? hl(w) : c,
          $ = {};
        for (var N in h)
          (u && N === 'as') || // $FlowFixMe
            (D(N) && ($[N] = h[N]));
        return (
          ($.className = E),
          ($.ref = T),
          /* @__PURE__ */ jn(
            ka,
            null,
            /* @__PURE__ */ jn(Mm, {
              cache: f,
              serialized: R,
              isStringTag: typeof w == 'string',
            }),
            /* @__PURE__ */ jn(w, $),
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
        (g.withComponent = function (h, f) {
          return e(
            h,
            x({}, o, f, {
              shouldForwardProp: bl(g, f, !0),
            }),
          ).apply(void 0, p);
        }),
        g
      );
    };
  };
const Dm = Am;
var Lm = [
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
  ma = Dm.bind();
Lm.forEach(function (e) {
  ma[e] = ma(e);
});
const Fm = ma;
function zm(e) {
  return e == null || Object.keys(e).length === 0;
}
function du(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return /* @__PURE__ */ I(uu, {
    styles: typeof t == 'function' ? (i) => t(zm(i) ? o : i) : t,
  });
}
process.env.NODE_ENV !== 'production' &&
  (du.propTypes = {
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
function jm(e, t) {
  const o = Fm(e, t);
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
const Vm = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  Bm =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  Un = Bm;
function qo(e, t) {
  return t
    ? ln(e, t, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const Ha = {
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
  vl = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${Ha[e]}px)`,
  };
function Pn(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || vl;
    return t.reduce((s, l, c) => ((s[a.up(a.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const a = r.breakpoints || vl;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || Ha).indexOf(l) !== -1) {
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
function Wm(e = {}) {
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
function Um(e, t) {
  return e.reduce((o, r) => {
    const i = o[r];
    return (!i || Object.keys(i).length === 0) && delete o[r], o;
  }, t);
}
function di(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((i, a) => (i && i[a] ? i[a] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, i) => (r && r[i] != null ? r[i] : null), e);
}
function Kr(e, t, o, r = o) {
  let i;
  return (
    typeof e == 'function' ? (i = e(o)) : Array.isArray(e) ? (i = e[o] || r) : (i = di(e, o) || r),
    t && (i = t(i, r, e)),
    i
  );
}
function lt(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: i } = e,
    a = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        u = di(c, r) || {};
      return Pn(s, l, (p) => {
        let b = Kr(u, i, p);
        return (
          p === b &&
            typeof p == 'string' &&
            (b = Kr(u, i, `${t}${p === 'default' ? '' : ce(p)}`, p)),
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
            [t]: Un,
          }
        : {}),
    (a.filterProps = [t]),
    a
  );
}
function pi(...e) {
  const t = e.reduce(
      (r, i) => (
        i.filterProps.forEach((a) => {
          r[a] = i;
        }),
        r
      ),
      {},
    ),
    o = (r) => Object.keys(r).reduce((i, a) => (t[a] ? qo(i, t[a](r)) : i), {});
  return (
    (o.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((r, i) => Object.assign(r, i.propTypes), {})
        : {}),
    (o.filterProps = e.reduce((r, i) => r.concat(i.filterProps), [])),
    o
  );
}
function Hm(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const qm = {
    m: 'margin',
    p: 'padding',
  },
  Km = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  yl = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  Ym = Hm((e) => {
    if (e.length > 2)
      if (yl[e]) e = yl[e];
      else return [e];
    const [t, o] = e.split(''),
      r = qm[t],
      i = Km[o] || '';
    return Array.isArray(i) ? i.map((a) => r + a) : [r + i];
  }),
  fi = [
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
  mi = [
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
  Gm = [...fi, ...mi];
function ur(e, t, o, r) {
  var i;
  const a = (i = di(e, t, !1)) != null ? i : o;
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
function pu(e) {
  return ur(e, 'spacing', 8, 'spacing');
}
function dr(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function Xm(e, t) {
  return (o) => e.reduce((r, i) => ((r[i] = dr(t, o)), r), {});
}
function Jm(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const i = Ym(o),
    a = Xm(i, r),
    s = e[o];
  return Pn(e, s, a);
}
function fu(e, t) {
  const o = pu(e.theme);
  return Object.keys(e)
    .map((r) => Jm(e, t, r, o))
    .reduce(qo, {});
}
function Et(e) {
  return fu(e, fi);
}
Et.propTypes =
  process.env.NODE_ENV !== 'production' ? fi.reduce((e, t) => ((e[t] = Un), e), {}) : {};
Et.filterProps = fi;
function Ct(e) {
  return fu(e, mi);
}
Ct.propTypes =
  process.env.NODE_ENV !== 'production' ? mi.reduce((e, t) => ((e[t] = Un), e), {}) : {};
Ct.filterProps = mi;
process.env.NODE_ENV !== 'production' && Gm.reduce((e, t) => ((e[t] = Un), e), {});
function On(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Zm = lt({
    prop: 'border',
    themeKey: 'borders',
    transform: On,
  }),
  Qm = lt({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: On,
  }),
  eh = lt({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: On,
  }),
  th = lt({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: On,
  }),
  nh = lt({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: On,
  }),
  oh = lt({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  rh = lt({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  ih = lt({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  ah = lt({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  sh = lt({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  hi = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = ur(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({
          borderRadius: dr(t, r),
        });
      return Pn(e, e.borderRadius, o);
    }
    return null;
  };
hi.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: Un,
      }
    : {};
hi.filterProps = ['borderRadius'];
pi(Zm, Qm, eh, th, nh, oh, rh, ih, ah, sh, hi);
const bi = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = ur(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({
        gap: dr(t, r),
      });
    return Pn(e, e.gap, o);
  }
  return null;
};
bi.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: Un,
      }
    : {};
bi.filterProps = ['gap'];
const gi = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = ur(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({
        columnGap: dr(t, r),
      });
    return Pn(e, e.columnGap, o);
  }
  return null;
};
gi.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: Un,
      }
    : {};
gi.filterProps = ['columnGap'];
const yi = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = ur(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({
        rowGap: dr(t, r),
      });
    return Pn(e, e.rowGap, o);
  }
  return null;
};
yi.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: Un,
      }
    : {};
yi.filterProps = ['rowGap'];
const lh = lt({
    prop: 'gridColumn',
  }),
  ch = lt({
    prop: 'gridRow',
  }),
  uh = lt({
    prop: 'gridAutoFlow',
  }),
  dh = lt({
    prop: 'gridAutoColumns',
  }),
  ph = lt({
    prop: 'gridAutoRows',
  }),
  fh = lt({
    prop: 'gridTemplateColumns',
  }),
  mh = lt({
    prop: 'gridTemplateRows',
  }),
  hh = lt({
    prop: 'gridTemplateAreas',
  }),
  bh = lt({
    prop: 'gridArea',
  });
pi(bi, gi, yi, lh, ch, uh, dh, ph, fh, mh, hh, bh);
function go(e, t) {
  return t === 'grey' ? t : e;
}
const gh = lt({
    prop: 'color',
    themeKey: 'palette',
    transform: go,
  }),
  vh = lt({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: go,
  }),
  yh = lt({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: go,
  });
pi(gh, vh, yh);
function Xt(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const xh = lt({
    prop: 'width',
    transform: Xt,
  }),
  qa = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, i, a;
        return {
          maxWidth:
            ((r = e.theme) == null || (i = r.breakpoints) == null || (a = i.values) == null
              ? void 0
              : a[o]) ||
            Ha[o] ||
            Xt(o),
        };
      };
      return Pn(e, e.maxWidth, t);
    }
    return null;
  };
qa.filterProps = ['maxWidth'];
const Eh = lt({
    prop: 'minWidth',
    transform: Xt,
  }),
  Ch = lt({
    prop: 'height',
    transform: Xt,
  }),
  wh = lt({
    prop: 'maxHeight',
    transform: Xt,
  }),
  Th = lt({
    prop: 'minHeight',
    transform: Xt,
  });
lt({
  prop: 'size',
  cssProperty: 'width',
  transform: Xt,
});
lt({
  prop: 'size',
  cssProperty: 'height',
  transform: Xt,
});
const Sh = lt({
  prop: 'boxSizing',
});
pi(xh, qa, Eh, Ch, wh, Th, Sh);
const Xi = (e) => (t) => {
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
                    : ce((a = t[e]) == null ? void 0 : a.toString())
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
      return Pn(t, t[e], o);
    }
    return null;
  },
  Rh = {
    // borders
    border: {
      themeKey: 'borders',
      transform: On,
    },
    borderTop: {
      themeKey: 'borders',
      transform: On,
    },
    borderRight: {
      themeKey: 'borders',
      transform: On,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: On,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: On,
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
      style: hi,
    },
    // palette
    color: {
      themeKey: 'palette',
      transform: go,
    },
    bgcolor: {
      themeKey: 'palette',
      cssProperty: 'backgroundColor',
      transform: go,
    },
    backgroundColor: {
      themeKey: 'palette',
      transform: go,
    },
    // spacing
    p: {
      style: Ct,
    },
    pt: {
      style: Ct,
    },
    pr: {
      style: Ct,
    },
    pb: {
      style: Ct,
    },
    pl: {
      style: Ct,
    },
    px: {
      style: Ct,
    },
    py: {
      style: Ct,
    },
    padding: {
      style: Ct,
    },
    paddingTop: {
      style: Ct,
    },
    paddingRight: {
      style: Ct,
    },
    paddingBottom: {
      style: Ct,
    },
    paddingLeft: {
      style: Ct,
    },
    paddingX: {
      style: Ct,
    },
    paddingY: {
      style: Ct,
    },
    paddingInline: {
      style: Ct,
    },
    paddingInlineStart: {
      style: Ct,
    },
    paddingInlineEnd: {
      style: Ct,
    },
    paddingBlock: {
      style: Ct,
    },
    paddingBlockStart: {
      style: Ct,
    },
    paddingBlockEnd: {
      style: Ct,
    },
    m: {
      style: Et,
    },
    mt: {
      style: Et,
    },
    mr: {
      style: Et,
    },
    mb: {
      style: Et,
    },
    ml: {
      style: Et,
    },
    mx: {
      style: Et,
    },
    my: {
      style: Et,
    },
    margin: {
      style: Et,
    },
    marginTop: {
      style: Et,
    },
    marginRight: {
      style: Et,
    },
    marginBottom: {
      style: Et,
    },
    marginLeft: {
      style: Et,
    },
    marginX: {
      style: Et,
    },
    marginY: {
      style: Et,
    },
    marginInline: {
      style: Et,
    },
    marginInlineStart: {
      style: Et,
    },
    marginInlineEnd: {
      style: Et,
    },
    marginBlock: {
      style: Et,
    },
    marginBlockStart: {
      style: Et,
    },
    marginBlockEnd: {
      style: Et,
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
      style: bi,
    },
    rowGap: {
      style: yi,
    },
    columnGap: {
      style: gi,
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
      transform: Xt,
    },
    maxWidth: {
      style: qa,
    },
    minWidth: {
      transform: Xt,
    },
    height: {
      transform: Xt,
    },
    maxHeight: {
      transform: Xt,
    },
    minHeight: {
      transform: Xt,
    },
    boxSizing: {},
    // typography
    fontFamily: {
      themeKey: 'typography',
      style: Xi('fontFamily'),
    },
    fontSize: {
      themeKey: 'typography',
      style: Xi('fontSize'),
    },
    fontStyle: {
      themeKey: 'typography',
    },
    fontWeight: {
      themeKey: 'typography',
      style: Xi('fontWeight'),
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
  Ka = Rh;
function Oh(...e) {
  const t = e.reduce((r, i) => r.concat(Object.keys(i)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function kh(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Nh() {
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
    const b = di(i, u) || {};
    return p
      ? p(s)
      : Pn(s, r, (g) => {
          let h = Kr(b, d, g);
          return (
            g === h &&
              typeof g == 'string' &&
              (h = Kr(b, d, `${o}${g === 'default' ? '' : ce(g)}`, g)),
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
    const s = (r = a.unstable_sxConfig) != null ? r : Ka;
    function l(c) {
      let u = c;
      if (typeof c == 'function') u = c(a);
      else if (typeof c != 'object') return c;
      if (!u) return null;
      const d = Wm(a.breakpoints),
        p = Object.keys(d);
      let b = d;
      return (
        Object.keys(u).forEach((v) => {
          const g = kh(u[v], a);
          if (g != null)
            if (typeof g == 'object')
              if (s[v]) b = qo(b, e(v, g, a, s));
              else {
                const h = Pn(
                  {
                    theme: a,
                  },
                  g,
                  (f) => ({
                    [v]: f,
                  }),
                );
                Oh(h, g)
                  ? (b[v] = t({
                      sx: g,
                      theme: a,
                    }))
                  : (b = qo(b, h));
              }
            else b = qo(b, e(v, g, a, s));
        }),
        Um(p, b)
      );
    }
    return Array.isArray(i) ? i.map(l) : l(i);
  }
  return t;
}
const mu = Nh();
mu.filterProps = ['sx'];
const Ya = mu;
function hu(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = hu(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function xe() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = hu(e)) && (r && (r += ' '), (r += t));
  return r;
}
const $h = ['values', 'unit', 'step'],
  Ph = (e) => {
    const t =
      Object.keys(e).map((o) => ({
        key: o,
        val: e[o],
      })) || [];
    return (
      t.sort((o, r) => o.val - r.val),
      t.reduce(
        (o, r) =>
          x({}, o, {
            [r.key]: r.val,
          }),
        {},
      )
    );
  };
function Ih(e) {
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
    i = Se(e, $h),
    a = Ph(t),
    s = Object.keys(a);
  function l(b) {
    return `@media (min-width:${typeof t[b] == 'number' ? t[b] : b}${o})`;
  }
  function c(b) {
    return `@media (max-width:${(typeof t[b] == 'number' ? t[b] : b) - r / 100}${o})`;
  }
  function u(b, v) {
    const g = s.indexOf(v);
    return `@media (min-width:${typeof t[b] == 'number' ? t[b] : b}${o}) and (max-width:${
      (g !== -1 && typeof t[s[g]] == 'number' ? t[s[g]] : v) - r / 100
    }${o})`;
  }
  function d(b) {
    return s.indexOf(b) + 1 < s.length ? u(b, s[s.indexOf(b) + 1]) : l(b);
  }
  function p(b) {
    const v = s.indexOf(b);
    return v === 0
      ? l(s[1])
      : v === s.length - 1
      ? c(s[v])
      : u(b, s[s.indexOf(b) + 1]).replace('@media', '@media not all and');
  }
  return x(
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
const _h = {
    borderRadius: 4,
  },
  Mh = _h;
function Ah(e = 8) {
  if (e.mui) return e;
  const t = pu({
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
const Dh = ['breakpoints', 'palette', 'spacing', 'shape'];
function Ga(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: i, shape: a = {} } = e,
    s = Se(e, Dh),
    l = Ih(o),
    c = Ah(i);
  let u = ln(
    {
      breakpoints: l,
      direction: 'ltr',
      components: {},
      // Inject component definitions.
      palette: x(
        {
          mode: 'light',
        },
        r,
      ),
      spacing: c,
      shape: x({}, Mh, a),
    },
    s,
  );
  return (
    (u = t.reduce((d, p) => ln(d, p), u)),
    (u.unstable_sxConfig = x({}, Ka, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return Ya({
        sx: p,
        theme: this,
      });
    }),
    u
  );
}
const bu = /* @__PURE__ */ C.createContext(null);
process.env.NODE_ENV !== 'production' && (bu.displayName = 'ThemeContext');
const Lh = bu;
function Fh() {
  const e = C.useContext(Lh);
  return process.env.NODE_ENV !== 'production' && C.useDebugValue(e), e;
}
function zh(e) {
  return Object.keys(e).length === 0;
}
function gu(e = null) {
  const t = Fh();
  return !t || zh(t) ? e : t;
}
const jh = Ga();
function vu(e = jh) {
  return gu(e);
}
const Vh = ['variant'];
function xl(e) {
  return e.length === 0;
}
function yu(e) {
  const { variant: t } = e,
    o = Se(e, Vh);
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((i) => {
        i === 'color'
          ? (r += xl(r) ? e[i] : ce(e[i]))
          : (r += `${xl(r) ? i : ce(i)}${ce(e[i].toString())}`);
      }),
    r
  );
}
const Bh = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'],
  Wh = ['theme'],
  Uh = ['theme'];
function zo(e) {
  return Object.keys(e).length === 0;
}
function Hh(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const qh = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Kh = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((i) => {
        const a = yu(i.props);
        r[a] = i.style;
      }),
      r
    );
  },
  Yh = (e, t, o, r) => {
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
            d && l.push(t[yu(u.props)]);
        }),
      l
    );
  };
function Ko(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Gh = Ga(),
  Xh = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function Jh(e = {}) {
  const { defaultTheme: t = Gh, rootShouldForwardProp: o = Ko, slotShouldForwardProp: r = Ko } = e,
    i = (a) => {
      const s = zo(a.theme) ? t : a.theme;
      return Ya(
        x({}, a, {
          theme: s,
        }),
      );
    };
  return (
    (i.__mui_systemSx = !0),
    (a, s = {}) => {
      Vm(a, (E) => E.filter((y) => !(y != null && y.__mui_systemSx)));
      const { name: l, slot: c, skipVariantsResolver: u, skipSx: d, overridesResolver: p } = s,
        b = Se(s, Bh),
        v = u !== void 0 ? u : (c && c !== 'Root') || !1,
        g = d || !1;
      let h;
      process.env.NODE_ENV !== 'production' && l && (h = `${l}-${Xh(c || 'Root')}`);
      let f = Ko;
      c === 'Root' ? (f = o) : c ? (f = r) : Hh(a) && (f = void 0);
      const T = jm(
          a,
          x(
            {
              shouldForwardProp: f,
              label: h,
            },
            b,
          ),
        ),
        w = (E, ...y) => {
          const m = y
            ? y.map(($) =>
                typeof $ == 'function' && $.__emotion_real !== $
                  ? (N) => {
                      let { theme: k } = N,
                        j = Se(N, Wh);
                      return $(
                        x(
                          {
                            theme: zo(k) ? t : k,
                          },
                          j,
                        ),
                      );
                    }
                  : $,
              )
            : [];
          let O = E;
          l &&
            p &&
            m.push(($) => {
              const N = zo($.theme) ? t : $.theme,
                k = qh(l, N);
              if (k) {
                const j = {};
                return (
                  Object.entries(k).forEach(([z, P]) => {
                    j[z] =
                      typeof P == 'function'
                        ? P(
                            x({}, $, {
                              theme: N,
                            }),
                          )
                        : P;
                  }),
                  p($, j)
                );
              }
              return null;
            }),
            l &&
              !v &&
              m.push(($) => {
                const N = zo($.theme) ? t : $.theme;
                return Yh($, Kh(l, N), N, l);
              }),
            g || m.push(i);
          const R = m.length - y.length;
          if (Array.isArray(E) && R > 0) {
            const $ = new Array(R).fill('');
            (O = [...E, ...$]), (O.raw = [...E.raw, ...$]);
          } else
            typeof E == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              E.__emotion_real !== E &&
              (O = ($) => {
                let { theme: N } = $,
                  k = Se($, Uh);
                return E(
                  x(
                    {
                      theme: zo(N) ? t : N,
                    },
                    k,
                  ),
                );
              });
          const D = T(O, ...m);
          if (process.env.NODE_ENV !== 'production') {
            let $;
            l && ($ = `${l}${c || ''}`),
              $ === void 0 && ($ = `Styled(${tf(a)})`),
              (D.displayName = $);
          }
          return D;
        };
      return T.withConfig && (w.withConfig = T.withConfig), w;
    }
  );
}
function Zh(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : Aa(t.components[o].defaultProps, r);
}
function Qh({ props: e, name: t, defaultTheme: o }) {
  const r = vu(o);
  return Zh({
    theme: r,
    name: t,
    props: e,
  });
}
function Xa(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function eb(e) {
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
function eo(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return eo(eb(e));
  const t = e.indexOf('('),
    o = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(o) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : Wn(9, e),
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
          : Wn(10, i),
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
function xi(e) {
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
function tb(e) {
  e = eo(e);
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
    xi({
      type: l,
      values: c,
    })
  );
}
function ha(e) {
  e = eo(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? eo(tb(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function El(e, t) {
  const o = ha(e),
    r = ha(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function st(e, t) {
  return (
    (e = eo(e)),
    (t = Xa(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    xi(e)
  );
}
function Ei(e, t) {
  if (((e = eo(e)), (t = Xa(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return xi(e);
}
function Ci(e, t) {
  if (((e = eo(e)), (t = Xa(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return xi(e);
}
function nb(e, t = 0.15) {
  return ha(e) > 0.5 ? Ei(e, t) : Ci(e, t);
}
function ob(e, t) {
  return x(
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
const rb = ['mode', 'contrastThreshold', 'tonalOffset'],
  Cl = {
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
      paper: Qo.white,
      default: Qo.white,
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
  Ji = {
    text: {
      primary: Qo.white,
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
      active: Qo.white,
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
function wl(e, t, o, r) {
  const i = r.light || r,
    a = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = Ci(e.main, i))
      : t === 'dark' && (e.dark = Ei(e.main, a)));
}
function ib(e = 'light') {
  return e === 'dark'
    ? {
        main: so[200],
        light: so[50],
        dark: so[400],
      }
    : {
        main: so[700],
        light: so[400],
        dark: so[800],
      };
}
function ab(e = 'light') {
  return e === 'dark'
    ? {
        main: ao[200],
        light: ao[50],
        dark: ao[400],
      }
    : {
        main: ao[500],
        light: ao[300],
        dark: ao[700],
      };
}
function sb(e = 'light') {
  return e === 'dark'
    ? {
        main: io[500],
        light: io[300],
        dark: io[700],
      }
    : {
        main: io[700],
        light: io[400],
        dark: io[800],
      };
}
function lb(e = 'light') {
  return e === 'dark'
    ? {
        main: lo[400],
        light: lo[300],
        dark: lo[700],
      }
    : {
        main: lo[700],
        light: lo[500],
        dark: lo[900],
      };
}
function cb(e = 'light') {
  return e === 'dark'
    ? {
        main: co[400],
        light: co[300],
        dark: co[700],
      }
    : {
        main: co[800],
        light: co[500],
        dark: co[900],
      };
}
function ub(e = 'light') {
  return e === 'dark'
    ? {
        main: Lo[400],
        light: Lo[300],
        dark: Lo[700],
      }
    : {
        main: '#ed6c02',
        // closest to orange[800] that pass 3:1.
        light: Lo[500],
        dark: Lo[900],
      };
}
function db(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2 } = e,
    i = Se(e, rb),
    a = e.primary || ib(t),
    s = e.secondary || ab(t),
    l = e.error || sb(t),
    c = e.info || lb(t),
    u = e.success || cb(t),
    d = e.warning || ub(t);
  function p(h) {
    const f = El(h, Ji.text.primary) >= o ? Ji.text.primary : Cl.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const T = El(h, f);
      T < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${T}:1 for ${f} on ${h}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return f;
  }
  const b = ({
      color: h,
      name: f,
      mainShade: T = 500,
      lightShade: w = 300,
      darkShade: E = 700,
    }) => {
      if (((h = x({}, h)), !h.main && h[T] && (h.main = h[T]), !h.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${f ? ` (${f})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`
            : Wn(11, f ? ` (${f})` : '', T),
        );
      if (typeof h.main != 'string')
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${f ? ` (${f})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`
            : Wn(12, f ? ` (${f})` : '', JSON.stringify(h.main)),
        );
      return (
        wl(h, 'light', w, r), wl(h, 'dark', E, r), h.contrastText || (h.contrastText = p(h.main)), h
      );
    },
    v = {
      dark: Ji,
      light: Cl,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (v[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    ln(
      x(
        {
          // A collection of common colors.
          common: x({}, Qo),
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
          grey: Lp,
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
        v[t],
      ),
      i,
    )
  );
}
const pb = [
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
function fb(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Tl = {
    textTransform: 'uppercase',
  },
  Sl = '"Roboto", "Helvetica", "Arial", sans-serif';
function mb(e, t) {
  const o = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: r = Sl,
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
    b = Se(o, pb);
  process.env.NODE_ENV !== 'production' &&
    (typeof i != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof u != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const v = i / 14,
    g = p || ((T) => `${(T / u) * v}rem`),
    h = (T, w, E, y, m) =>
      x(
        {
          fontFamily: r,
          fontWeight: T,
          fontSize: g(w),
          // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
          lineHeight: E,
        },
        r === Sl
          ? {
              letterSpacing: `${fb(y / w)}em`,
            }
          : {},
        m,
        d,
      ),
    f = {
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
      button: h(l, 14, 1.75, 0.4, Tl),
      caption: h(s, 12, 1.66, 0.4),
      overline: h(s, 12, 2.66, 1, Tl),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return ln(
    x(
      {
        htmlFontSize: u,
        pxToRem: g,
        fontFamily: r,
        fontSize: i,
        fontWeightLight: a,
        fontWeightRegular: s,
        fontWeightMedium: l,
        fontWeightBold: c,
      },
      f,
    ),
    b,
    {
      clone: !1,
      // No need to clone deep
    },
  );
}
const hb = 0.2,
  bb = 0.14,
  gb = 0.12;
function yt(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${hb})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${bb})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${gb})`,
  ].join(',');
}
const vb = [
    'none',
    yt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    yt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    yt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    yt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    yt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    yt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    yt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    yt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    yt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    yt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    yt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    yt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    yt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    yt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    yt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    yt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    yt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    yt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    yt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    yt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    yt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    yt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    yt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    yt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  yb = vb,
  xb = ['duration', 'easing', 'delay'],
  Eb = {
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
  Cb = {
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
function Rl(e) {
  return `${Math.round(e)}ms`;
}
function wb(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Tb(e) {
  const t = x({}, Eb, e.easing),
    o = x({}, Cb, e.duration);
  return x(
    {
      getAutoHeightDuration: wb,
      create: (i = ['all'], a = {}) => {
        const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0 } = a,
          u = Se(a, xb);
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
              `${d} ${typeof s == 'string' ? s : Rl(s)} ${l} ${typeof c == 'string' ? c : Rl(c)}`,
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
const Sb = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  Rb = Sb,
  Ob = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function kb(e = {}, ...t) {
  const { mixins: o = {}, palette: r = {}, transitions: i = {}, typography: a = {} } = e,
    s = Se(e, Ob);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : Wn(18),
    );
  const l = db(r),
    c = Ga(e);
  let u = ln(c, {
    mixins: ob(c.breakpoints, o),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: yb.slice(),
    typography: mb(l, a),
    transitions: Tb(i),
    zIndex: x({}, Rb),
  });
  if (
    ((u = ln(u, s)), (u = t.reduce((d, p) => ln(d, p), u)), process.env.NODE_ENV !== 'production')
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
      p = (b, v) => {
        let g;
        for (g in b) {
          const h = b[g];
          if (d.indexOf(g) !== -1 && Object.keys(h).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const f = We('', g);
              console.error(
                [
                  `MUI: The \`${v}\` component increases the CSS specificity of the \`${g}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(b, null, 2),
                  '',
                  `Instead, you need to use the '&.${f}' syntax:`,
                  JSON.stringify(
                    {
                      root: {
                        [`&.${f}`]: h,
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
            b[g] = {};
          }
        }
      };
    Object.keys(u.components).forEach((b) => {
      const v = u.components[b].styleOverrides;
      v && b.indexOf('Mui') === 0 && p(v, b);
    });
  }
  return (
    (u.unstable_sxConfig = x({}, Ka, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return Ya({
        sx: p,
        theme: this,
      });
    }),
    u
  );
}
const Nb = kb(),
  wi = Nb;
function No() {
  const e = vu(wi);
  return process.env.NODE_ENV !== 'production' && C.useDebugValue(e), e;
}
function Xe({ props: e, name: t }) {
  return Qh({
    props: e,
    name: t,
    defaultTheme: wi,
  });
}
const wn = (e) => Ko(e) && e !== 'classes',
  Ja = Ko,
  $b = Jh({
    defaultTheme: wi,
    rootShouldForwardProp: wn,
  }),
  be = $b,
  Pb = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  Ol = Pb;
function Vn(e) {
  return typeof e == 'string';
}
function Ib(e, t, o) {
  return e === void 0 || Vn(e)
    ? t
    : x({}, t, {
        ownerState: x({}, t.ownerState, o),
      });
}
const _b = {
    disableDefaultClasses: !1,
  },
  Mb = /* @__PURE__ */ C.createContext(_b);
function xu(e) {
  const { disableDefaultClasses: t } = C.useContext(Mb);
  return (o) => (t ? '' : e(o));
}
function Eu(e, t = []) {
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
function kl(e) {
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
function Ab(e) {
  const {
    getSlotProps: t,
    additionalProps: o,
    externalSlotProps: r,
    externalForwardedProps: i,
    className: a,
  } = e;
  if (!t) {
    const v = xe(
        i == null ? void 0 : i.className,
        r == null ? void 0 : r.className,
        a,
        o == null ? void 0 : o.className,
      ),
      g = x(
        {},
        o == null ? void 0 : o.style,
        i == null ? void 0 : i.style,
        r == null ? void 0 : r.style,
      ),
      h = x({}, o, i, r);
    return (
      v.length > 0 && (h.className = v),
      Object.keys(g).length > 0 && (h.style = g),
      {
        props: h,
        internalRef: void 0,
      }
    );
  }
  const s = Eu(x({}, i, r)),
    l = kl(r),
    c = kl(i),
    u = t(s),
    d = xe(
      u == null ? void 0 : u.className,
      o == null ? void 0 : o.className,
      a,
      i == null ? void 0 : i.className,
      r == null ? void 0 : r.className,
    ),
    p = x(
      {},
      u == null ? void 0 : u.style,
      o == null ? void 0 : o.style,
      i == null ? void 0 : i.style,
      r == null ? void 0 : r.style,
    ),
    b = x({}, u, o, c, l);
  return (
    d.length > 0 && (b.className = d),
    Object.keys(p).length > 0 && (b.style = p),
    {
      props: b,
      internalRef: u.ref,
    }
  );
}
const Db = ['elementType', 'externalSlotProps', 'ownerState'];
function rn(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: i } = e,
    a = Se(e, Db),
    s = ba(r, i),
    { props: l, internalRef: c } = Ab(
      x({}, a, {
        externalSlotProps: s,
      }),
    ),
    u = Rt(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return Ib(
    o,
    x({}, l, {
      ref: u,
    }),
    i,
  );
}
function Nl(e) {
  return e.substring(2).toLowerCase();
}
function Lb(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function Yr(e) {
  const {
      children: t,
      disableReactTree: o = !1,
      mouseEvent: r = 'onClick',
      onClickAway: i,
      touchEvent: a = 'onTouchEnd',
    } = e,
    s = C.useRef(!1),
    l = C.useRef(null),
    c = C.useRef(!1),
    u = C.useRef(!1);
  C.useEffect(
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
  const d = Rt(
      // @ts-expect-error TODO upstream fix
      t.ref,
      l,
    ),
    p = Ft((g) => {
      const h = u.current;
      u.current = !1;
      const f = wt(l.current);
      if (!c.current || !l.current || ('clientX' in g && Lb(g, f))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let T;
      g.composedPath
        ? (T = g.composedPath().indexOf(l.current) > -1)
        : (T =
            !f.documentElement.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              g.target,
            ) ||
            l.current.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              g.target,
            )),
        !T && (o || !h) && i(g);
    }),
    b = (g) => (h) => {
      u.current = !0;
      const f = t.props[g];
      f && f(h);
    },
    v = {
      ref: d,
    };
  return (
    a !== !1 && (v[a] = b(a)),
    C.useEffect(() => {
      if (a !== !1) {
        const g = Nl(a),
          h = wt(l.current),
          f = () => {
            s.current = !0;
          };
        return (
          h.addEventListener(g, p),
          h.addEventListener('touchmove', f),
          () => {
            h.removeEventListener(g, p), h.removeEventListener('touchmove', f);
          }
        );
      }
    }, [p, a]),
    r !== !1 && (v[r] = b(r)),
    C.useEffect(() => {
      if (r !== !1) {
        const g = Nl(r),
          h = wt(l.current);
        return (
          h.addEventListener(g, p),
          () => {
            h.removeEventListener(g, p);
          }
        );
      }
    }, [p, r]),
    /* @__PURE__ */ I(C.Fragment, {
      children: /* @__PURE__ */ C.cloneElement(t, v),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (Yr.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * The wrapped element.
     */
    children: Oo.isRequired,
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
process.env.NODE_ENV !== 'production' && (Yr['propTypes'] = _a(Yr.propTypes));
const Fb = [
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
function zb(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function jb(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function Vb(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || jb(e));
}
function Bb(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(Fb)).forEach((r, i) => {
      const a = zb(r);
      a === -1 ||
        !Vb(r) ||
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
function Wb() {
  return !0;
}
function Gr(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: i = !1,
      getTabbable: a = Bb,
      isEnabled: s = Wb,
      open: l,
    } = e,
    c = C.useRef(!1),
    u = C.useRef(null),
    d = C.useRef(null),
    p = C.useRef(null),
    b = C.useRef(null),
    v = C.useRef(!1),
    g = C.useRef(null),
    h = Rt(t.ref, g),
    f = C.useRef(null);
  C.useEffect(() => {
    !l || !g.current || (v.current = !o);
  }, [o, l]),
    C.useEffect(() => {
      if (!l || !g.current) return;
      const E = wt(g.current);
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
          v.current && g.current.focus()),
        () => {
          i ||
            (p.current && p.current.focus && ((c.current = !0), p.current.focus()),
            (p.current = null));
        }
      );
    }, [l]),
    C.useEffect(() => {
      if (!l || !g.current) return;
      const E = wt(g.current),
        y = (R) => {
          const { current: D } = g;
          if (D !== null) {
            if (!E.hasFocus() || r || !s() || c.current) {
              c.current = !1;
              return;
            }
            if (!D.contains(E.activeElement)) {
              if ((R && b.current !== R.target) || E.activeElement !== b.current) b.current = null;
              else if (b.current !== null) return;
              if (!v.current) return;
              let k = [];
              if (
                ((E.activeElement === u.current || E.activeElement === d.current) &&
                  (k = a(g.current)),
                k.length > 0)
              ) {
                var $, N;
                const j = !!(
                    ($ = f.current) != null &&
                    $.shiftKey &&
                    ((N = f.current) == null ? void 0 : N.key) === 'Tab'
                  ),
                  z = k[0],
                  P = k[k.length - 1];
                typeof z != 'string' && typeof P != 'string' && (j ? P.focus() : z.focus());
              } else D.focus();
            }
          }
        },
        m = (R) => {
          (f.current = R),
            !(r || !s() || R.key !== 'Tab') &&
              E.activeElement === g.current &&
              R.shiftKey &&
              ((c.current = !0), d.current && d.current.focus());
        };
      E.addEventListener('focusin', y), E.addEventListener('keydown', m, !0);
      const O = setInterval(() => {
        E.activeElement && E.activeElement.tagName === 'BODY' && y(null);
      }, 50);
      return () => {
        clearInterval(O),
          E.removeEventListener('focusin', y),
          E.removeEventListener('keydown', m, !0);
      };
    }, [o, r, i, s, l, a]);
  const T = (E) => {
      p.current === null && (p.current = E.relatedTarget), (v.current = !0), (b.current = E.target);
      const y = t.props.onFocus;
      y && y(E);
    },
    w = (E) => {
      p.current === null && (p.current = E.relatedTarget), (v.current = !0);
    };
  return /* @__PURE__ */ Fe(C.Fragment, {
    children: [
      /* @__PURE__ */ I('div', {
        tabIndex: l ? 0 : -1,
        onFocus: w,
        ref: u,
        'data-testid': 'sentinelStart',
      }),
      /* @__PURE__ */ C.cloneElement(t, {
        ref: h,
        onFocus: T,
      }),
      /* @__PURE__ */ I('div', {
        tabIndex: l ? 0 : -1,
        onFocus: w,
        ref: d,
        'data-testid': 'sentinelEnd',
      }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (Gr.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: Oo,
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
process.env.NODE_ENV !== 'production' && (Gr['propTypes'] = _a(Gr.propTypes));
var Bt = 'top',
  cn = 'bottom',
  un = 'right',
  Wt = 'left',
  Ti = 'auto',
  pr = [Bt, cn, un, Wt],
  Eo = 'start',
  or = 'end',
  Ub = 'clippingParents',
  Cu = 'viewport',
  jo = 'popper',
  Hb = 'reference',
  $l = /* @__PURE__ */ pr.reduce(function (e, t) {
    return e.concat([t + '-' + Eo, t + '-' + or]);
  }, []),
  wu = /* @__PURE__ */ [].concat(pr, [Ti]).reduce(function (e, t) {
    return e.concat([t, t + '-' + Eo, t + '-' + or]);
  }, []),
  qb = 'beforeRead',
  Kb = 'read',
  Yb = 'afterRead',
  Gb = 'beforeMain',
  Xb = 'main',
  Jb = 'afterMain',
  Zb = 'beforeWrite',
  Qb = 'write',
  eg = 'afterWrite',
  ga = [qb, Kb, Yb, Gb, Xb, Jb, Zb, Qb, eg];
function In(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function dn(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function to(e) {
  var t = dn(e).Element;
  return e instanceof t || e instanceof Element;
}
function Zt(e) {
  var t = dn(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Za(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = dn(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function tg(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      i = t.attributes[o] || {},
      a = t.elements[o];
    !Zt(a) ||
      !In(a) ||
      (Object.assign(a.style, r),
      Object.keys(i).forEach(function (s) {
        var l = i[s];
        l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function ng(e) {
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
        !Zt(i) ||
          !In(i) ||
          (Object.assign(i.style, l),
          Object.keys(a).forEach(function (c) {
            i.removeAttribute(c);
          }));
      });
    }
  );
}
const og = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: tg,
  effect: ng,
  requires: ['computeStyles'],
};
function xn(e) {
  return e.split('-')[0];
}
var Zn = Math.max,
  Xr = Math.min,
  Co = Math.round;
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
function Tu() {
  return !/^((?!chrome|android).)*safari/i.test(va());
}
function wo(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    i = 1,
    a = 1;
  t &&
    Zt(e) &&
    ((i = (e.offsetWidth > 0 && Co(r.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && Co(r.height) / e.offsetHeight) || 1));
  var s = to(e) ? dn(e) : window,
    l = s.visualViewport,
    c = !Tu() && o,
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
function Qa(e) {
  var t = wo(e),
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
function Su(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && Za(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Cn(e) {
  return dn(e).getComputedStyle(e);
}
function rg(e) {
  return ['table', 'td', 'th'].indexOf(In(e)) >= 0;
}
function Hn(e) {
  return (
    (to(e)
      ? e.ownerDocument
      : // $FlowFixMe[prop-missing]
        e.document) || window.document
  ).documentElement;
}
function Si(e) {
  return In(e) === 'html'
    ? e
    : // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        e.parentNode || // DOM Element detected
        (Za(e) ? e.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        Hn(e);
}
function Pl(e) {
  return !Zt(e) || // https://github.com/popperjs/popper-core/issues/837
    Cn(e).position === 'fixed'
    ? null
    : e.offsetParent;
}
function ig(e) {
  var t = /firefox/i.test(va()),
    o = /Trident/i.test(va());
  if (o && Zt(e)) {
    var r = Cn(e);
    if (r.position === 'fixed') return null;
  }
  var i = Si(e);
  for (Za(i) && (i = i.host); Zt(i) && ['html', 'body'].indexOf(In(i)) < 0; ) {
    var a = Cn(i);
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
function fr(e) {
  for (var t = dn(e), o = Pl(e); o && rg(o) && Cn(o).position === 'static'; ) o = Pl(o);
  return o && (In(o) === 'html' || (In(o) === 'body' && Cn(o).position === 'static'))
    ? t
    : o || ig(e) || t;
}
function es(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function Yo(e, t, o) {
  return Zn(e, Xr(t, o));
}
function ag(e, t, o) {
  var r = Yo(e, t, o);
  return r > o ? o : r;
}
function Ru() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
function Ou(e) {
  return Object.assign({}, Ru(), e);
}
function ku(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var sg = function (t, o) {
  return (
    (t =
      typeof t == 'function'
        ? t(
            Object.assign({}, o.rects, {
              placement: o.placement,
            }),
          )
        : t),
    Ou(typeof t != 'number' ? t : ku(t, pr))
  );
};
function lg(e) {
  var t,
    o = e.state,
    r = e.name,
    i = e.options,
    a = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = xn(o.placement),
    c = es(l),
    u = [Wt, un].indexOf(l) >= 0,
    d = u ? 'height' : 'width';
  if (!(!a || !s)) {
    var p = sg(i.padding, o),
      b = Qa(a),
      v = c === 'y' ? Bt : Wt,
      g = c === 'y' ? cn : un,
      h = o.rects.reference[d] + o.rects.reference[c] - s[c] - o.rects.popper[d],
      f = s[c] - o.rects.reference[c],
      T = fr(a),
      w = T ? (c === 'y' ? T.clientHeight || 0 : T.clientWidth || 0) : 0,
      E = h / 2 - f / 2,
      y = p[v],
      m = w - b[d] - p[g],
      O = w / 2 - b[d] / 2 + E,
      R = Yo(y, O, m),
      D = c;
    o.modifiersData[r] = ((t = {}), (t[D] = R), (t.centerOffset = R - O), t);
  }
}
function cg(e) {
  var t = e.state,
    o = e.options,
    r = o.element,
    i = r === void 0 ? '[data-popper-arrow]' : r;
  if (i != null && !(typeof i == 'string' && ((i = t.elements.popper.querySelector(i)), !i))) {
    if (
      (process.env.NODE_ENV !== 'production' &&
        (Zt(i) ||
          console.error(
            [
              'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
              'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
              'the arrow.',
            ].join(' '),
          )),
      !Su(t.elements.popper, i))
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
const ug = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: lg,
  effect: cg,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function To(e) {
  return e.split('-')[1];
}
var dg = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
};
function pg(e) {
  var t = e.x,
    o = e.y,
    r = window,
    i = r.devicePixelRatio || 1;
  return {
    x: Co(t * i) / i || 0,
    y: Co(o * i) / i || 0,
  };
}
function Il(e) {
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
    v = b === void 0 ? 0 : b,
    g = s.y,
    h = g === void 0 ? 0 : g,
    f =
      typeof d == 'function'
        ? d({
            x: v,
            y: h,
          })
        : {
            x: v,
            y: h,
          };
  (v = f.x), (h = f.y);
  var T = s.hasOwnProperty('x'),
    w = s.hasOwnProperty('y'),
    E = Wt,
    y = Bt,
    m = window;
  if (u) {
    var O = fr(o),
      R = 'clientHeight',
      D = 'clientWidth';
    if (
      (O === dn(o) &&
        ((O = Hn(o)),
        Cn(O).position !== 'static' &&
          l === 'absolute' &&
          ((R = 'scrollHeight'), (D = 'scrollWidth'))),
      (O = O),
      i === Bt || ((i === Wt || i === un) && a === or))
    ) {
      y = cn;
      var $ =
        p && O === m && m.visualViewport
          ? m.visualViewport.height
          : // $FlowFixMe[prop-missing]
            O[R];
      (h -= $ - r.height), (h *= c ? 1 : -1);
    }
    if (i === Wt || ((i === Bt || i === cn) && a === or)) {
      E = un;
      var N =
        p && O === m && m.visualViewport
          ? m.visualViewport.width
          : // $FlowFixMe[prop-missing]
            O[D];
      (v -= N - r.width), (v *= c ? 1 : -1);
    }
  }
  var k = Object.assign(
      {
        position: l,
      },
      u && dg,
    ),
    j =
      d === !0
        ? pg({
            x: v,
            y: h,
          })
        : {
            x: v,
            y: h,
          };
  if (((v = j.x), (h = j.y), c)) {
    var z;
    return Object.assign(
      {},
      k,
      ((z = {}),
      (z[y] = w ? '0' : ''),
      (z[E] = T ? '0' : ''),
      (z.transform =
        (m.devicePixelRatio || 1) <= 1
          ? 'translate(' + v + 'px, ' + h + 'px)'
          : 'translate3d(' + v + 'px, ' + h + 'px, 0)'),
      z),
    );
  }
  return Object.assign(
    {},
    k,
    ((t = {}), (t[y] = w ? h + 'px' : ''), (t[E] = T ? v + 'px' : ''), (t.transform = ''), t),
  );
}
function fg(e) {
  var t = e.state,
    o = e.options,
    r = o.gpuAcceleration,
    i = r === void 0 ? !0 : r,
    a = o.adaptive,
    s = a === void 0 ? !0 : a,
    l = o.roundOffsets,
    c = l === void 0 ? !0 : l;
  if (process.env.NODE_ENV !== 'production') {
    var u = Cn(t.elements.popper).transitionProperty || '';
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
    placement: xn(t.placement),
    variation: To(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Il(
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
        Il(
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
const mg = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: fg,
  data: {},
};
var kr = {
  passive: !0,
};
function hg(e) {
  var t = e.state,
    o = e.instance,
    r = e.options,
    i = r.scroll,
    a = i === void 0 ? !0 : i,
    s = r.resize,
    l = s === void 0 ? !0 : s,
    c = dn(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      u.forEach(function (d) {
        d.addEventListener('scroll', o.update, kr);
      }),
    l && c.addEventListener('resize', o.update, kr),
    function () {
      a &&
        u.forEach(function (d) {
          d.removeEventListener('scroll', o.update, kr);
        }),
        l && c.removeEventListener('resize', o.update, kr);
    }
  );
}
const bg = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: hg,
  data: {},
};
var gg = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
function jr(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return gg[t];
  });
}
var vg = {
  start: 'end',
  end: 'start',
};
function _l(e) {
  return e.replace(/start|end/g, function (t) {
    return vg[t];
  });
}
function ts(e) {
  var t = dn(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r,
  };
}
function ns(e) {
  return wo(Hn(e)).left + ts(e).scrollLeft;
}
function yg(e, t) {
  var o = dn(e),
    r = Hn(e),
    i = o.visualViewport,
    a = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (i) {
    (a = i.width), (s = i.height);
    var u = Tu();
    (u || (!u && t === 'fixed')) && ((l = i.offsetLeft), (c = i.offsetTop));
  }
  return {
    width: a,
    height: s,
    x: l + ns(e),
    y: c,
  };
}
function xg(e) {
  var t,
    o = Hn(e),
    r = ts(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = Zn(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
    s = Zn(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
    l = -r.scrollLeft + ns(e),
    c = -r.scrollTop;
  return (
    Cn(i || o).direction === 'rtl' && (l += Zn(o.clientWidth, i ? i.clientWidth : 0) - a),
    {
      width: a,
      height: s,
      x: l,
      y: c,
    }
  );
}
function os(e) {
  var t = Cn(e),
    o = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function Nu(e) {
  return ['html', 'body', '#document'].indexOf(In(e)) >= 0
    ? e.ownerDocument.body
    : Zt(e) && os(e)
    ? e
    : Nu(Si(e));
}
function Go(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = Nu(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    a = dn(r),
    s = i ? [a].concat(a.visualViewport || [], os(r) ? r : []) : r,
    l = t.concat(s);
  return i
    ? l
    : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(Go(Si(s)));
}
function ya(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Eg(e, t) {
  var o = wo(e, !1, t === 'fixed');
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
function Ml(e, t, o) {
  return t === Cu ? ya(yg(e, o)) : to(t) ? Eg(t, o) : ya(xg(Hn(e)));
}
function Cg(e) {
  var t = Go(Si(e)),
    o = ['absolute', 'fixed'].indexOf(Cn(e).position) >= 0,
    r = o && Zt(e) ? fr(e) : e;
  return to(r)
    ? t.filter(function (i) {
        return to(i) && Su(i, r) && In(i) !== 'body';
      })
    : [];
}
function wg(e, t, o, r) {
  var i = t === 'clippingParents' ? Cg(e) : [].concat(t),
    a = [].concat(i, [o]),
    s = a[0],
    l = a.reduce(function (c, u) {
      var d = Ml(e, u, r);
      return (
        (c.top = Zn(d.top, c.top)),
        (c.right = Xr(d.right, c.right)),
        (c.bottom = Xr(d.bottom, c.bottom)),
        (c.left = Zn(d.left, c.left)),
        c
      );
    }, Ml(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function $u(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    i = r ? xn(r) : null,
    a = r ? To(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (i) {
    case Bt:
      c = {
        x: s,
        y: t.y - o.height,
      };
      break;
    case cn:
      c = {
        x: s,
        y: t.y + t.height,
      };
      break;
    case un:
      c = {
        x: t.x + t.width,
        y: l,
      };
      break;
    case Wt:
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
  var u = i ? es(i) : null;
  if (u != null) {
    var d = u === 'y' ? 'height' : 'width';
    switch (a) {
      case Eo:
        c[u] = c[u] - (t[d] / 2 - o[d] / 2);
        break;
      case or:
        c[u] = c[u] + (t[d] / 2 - o[d] / 2);
        break;
    }
  }
  return c;
}
function rr(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = r === void 0 ? e.placement : r,
    a = o.strategy,
    s = a === void 0 ? e.strategy : a,
    l = o.boundary,
    c = l === void 0 ? Ub : l,
    u = o.rootBoundary,
    d = u === void 0 ? Cu : u,
    p = o.elementContext,
    b = p === void 0 ? jo : p,
    v = o.altBoundary,
    g = v === void 0 ? !1 : v,
    h = o.padding,
    f = h === void 0 ? 0 : h,
    T = Ou(typeof f != 'number' ? f : ku(f, pr)),
    w = b === jo ? Hb : jo,
    E = e.rects.popper,
    y = e.elements[g ? w : b],
    m = wg(to(y) ? y : y.contextElement || Hn(e.elements.popper), c, d, s),
    O = wo(e.elements.reference),
    R = $u({
      reference: O,
      element: E,
      strategy: 'absolute',
      placement: i,
    }),
    D = ya(Object.assign({}, E, R)),
    $ = b === jo ? D : O,
    N = {
      top: m.top - $.top + T.top,
      bottom: $.bottom - m.bottom + T.bottom,
      left: m.left - $.left + T.left,
      right: $.right - m.right + T.right,
    },
    k = e.modifiersData.offset;
  if (b === jo && k) {
    var j = k[i];
    Object.keys(N).forEach(function (z) {
      var P = [un, cn].indexOf(z) >= 0 ? 1 : -1,
        V = [Bt, cn].indexOf(z) >= 0 ? 'y' : 'x';
      N[z] += j[V] * P;
    });
  }
  return N;
}
function Tg(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = o.boundary,
    a = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    u = c === void 0 ? wu : c,
    d = To(r),
    p = d
      ? l
        ? $l
        : $l.filter(function (g) {
            return To(g) === d;
          })
      : pr,
    b = p.filter(function (g) {
      return u.indexOf(g) >= 0;
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
  var v = b.reduce(function (g, h) {
    return (
      (g[h] = rr(e, {
        placement: h,
        boundary: i,
        rootBoundary: a,
        padding: s,
      })[xn(h)]),
      g
    );
  }, {});
  return Object.keys(v).sort(function (g, h) {
    return v[g] - v[h];
  });
}
function Sg(e) {
  if (xn(e) === Ti) return [];
  var t = jr(e);
  return [_l(e), t, _l(t)];
}
function Rg(e) {
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
        v = o.flipVariations,
        g = v === void 0 ? !0 : v,
        h = o.allowedAutoPlacements,
        f = t.options.placement,
        T = xn(f),
        w = T === f,
        E = c || (w || !g ? [jr(f)] : Sg(f)),
        y = [f].concat(E).reduce(function (K, ne) {
          return K.concat(
            xn(ne) === Ti
              ? Tg(t, {
                  placement: ne,
                  boundary: d,
                  rootBoundary: p,
                  padding: u,
                  flipVariations: g,
                  allowedAutoPlacements: h,
                })
              : ne,
          );
        }, []),
        m = t.rects.reference,
        O = t.rects.popper,
        R = /* @__PURE__ */ new Map(),
        D = !0,
        $ = y[0],
        N = 0;
      N < y.length;
      N++
    ) {
      var k = y[N],
        j = xn(k),
        z = To(k) === Eo,
        P = [Bt, cn].indexOf(j) >= 0,
        V = P ? 'width' : 'height',
        B = rr(t, {
          placement: k,
          boundary: d,
          rootBoundary: p,
          altBoundary: b,
          padding: u,
        }),
        Q = P ? (z ? un : Wt) : z ? cn : Bt;
      m[V] > O[V] && (Q = jr(Q));
      var re = jr(Q),
        Z = [];
      if (
        (a && Z.push(B[j] <= 0),
        l && Z.push(B[Q] <= 0, B[re] <= 0),
        Z.every(function (K) {
          return K;
        }))
      ) {
        ($ = k), (D = !1);
        break;
      }
      R.set(k, Z);
    }
    if (D)
      for (
        var _ = g ? 3 : 1,
          W = function (ne) {
            var ee = y.find(function (oe) {
              var le = R.get(oe);
              if (le)
                return le.slice(0, ne).every(function (ue) {
                  return ue;
                });
            });
            if (ee) return ($ = ee), 'break';
          },
          te = _;
        te > 0;
        te--
      ) {
        var H = W(te);
        if (H === 'break') break;
      }
    t.placement !== $ && ((t.modifiersData[r]._skip = !0), (t.placement = $), (t.reset = !0));
  }
}
const Og = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: Rg,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1,
  },
};
function Al(e, t, o) {
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
function Dl(e) {
  return [Bt, un, cn, Wt].some(function (t) {
    return e[t] >= 0;
  });
}
function kg(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = rr(t, {
      elementContext: 'reference',
    }),
    l = rr(t, {
      altBoundary: !0,
    }),
    c = Al(s, r),
    u = Al(l, i, a),
    d = Dl(c),
    p = Dl(u);
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
const Ng = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: kg,
};
function $g(e, t, o) {
  var r = xn(e),
    i = [Wt, Bt].indexOf(r) >= 0 ? -1 : 1,
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
    [Wt, un].indexOf(r) >= 0
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
function Pg(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.offset,
    a = i === void 0 ? [0, 0] : i,
    s = wu.reduce(function (d, p) {
      return (d[p] = $g(p, t.rects, a)), d;
    }, {}),
    l = s[t.placement],
    c = l.x,
    u = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = s);
}
const Ig = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: Pg,
};
function _g(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = $u({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const Mg = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: _g,
  data: {},
};
function Ag(e) {
  return e === 'x' ? 'y' : 'x';
}
function Dg(e) {
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
    v = b === void 0 ? !0 : b,
    g = o.tetherOffset,
    h = g === void 0 ? 0 : g,
    f = rr(t, {
      boundary: c,
      rootBoundary: u,
      padding: p,
      altBoundary: d,
    }),
    T = xn(t.placement),
    w = To(t.placement),
    E = !w,
    y = es(T),
    m = Ag(y),
    O = t.modifiersData.popperOffsets,
    R = t.rects.reference,
    D = t.rects.popper,
    $ =
      typeof h == 'function'
        ? h(
            Object.assign({}, t.rects, {
              placement: t.placement,
            }),
          )
        : h,
    N =
      typeof $ == 'number'
        ? {
            mainAxis: $,
            altAxis: $,
          }
        : Object.assign(
            {
              mainAxis: 0,
              altAxis: 0,
            },
            $,
          ),
    k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    j = {
      x: 0,
      y: 0,
    };
  if (O) {
    if (a) {
      var z,
        P = y === 'y' ? Bt : Wt,
        V = y === 'y' ? cn : un,
        B = y === 'y' ? 'height' : 'width',
        Q = O[y],
        re = Q + f[P],
        Z = Q - f[V],
        _ = v ? -D[B] / 2 : 0,
        W = w === Eo ? R[B] : D[B],
        te = w === Eo ? -D[B] : -R[B],
        H = t.elements.arrow,
        K =
          v && H
            ? Qa(H)
            : {
                width: 0,
                height: 0,
              },
        ne = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : Ru(),
        ee = ne[P],
        oe = ne[V],
        le = Yo(0, R[B], K[B]),
        ue = E ? R[B] / 2 - _ - le - ee - N.mainAxis : W - le - ee - N.mainAxis,
        ye = E ? -R[B] / 2 + _ + le + oe + N.mainAxis : te + le + oe + N.mainAxis,
        se = t.elements.arrow && fr(t.elements.arrow),
        L = se ? (y === 'y' ? se.clientTop || 0 : se.clientLeft || 0) : 0,
        Te = (z = k == null ? void 0 : k[y]) != null ? z : 0,
        F = Q + ue - Te - L,
        G = Q + ye - Te,
        De = Yo(v ? Xr(re, F) : re, Q, v ? Zn(Z, G) : Z);
      (O[y] = De), (j[y] = De - Q);
    }
    if (l) {
      var ge,
        Le = y === 'x' ? Bt : Wt,
        Ue = y === 'x' ? cn : un,
        $e = O[m],
        Me = m === 'y' ? 'height' : 'width',
        ct = $e + f[Le],
        mt = $e - f[Ue],
        ie = [Bt, Wt].indexOf(T) !== -1,
        ve = (ge = k == null ? void 0 : k[m]) != null ? ge : 0,
        Ce = ie ? ct : $e - R[Me] - D[Me] - ve + N.altAxis,
        U = ie ? $e + R[Me] + D[Me] - ve - N.altAxis : mt,
        pe = v && ie ? ag(Ce, $e, U) : Yo(v ? Ce : ct, $e, v ? U : mt);
      (O[m] = pe), (j[m] = pe - $e);
    }
    t.modifiersData[r] = j;
  }
}
const Lg = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: Dg,
  requiresIfExists: ['offset'],
};
function Fg(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop,
  };
}
function zg(e) {
  return e === dn(e) || !Zt(e) ? ts(e) : Fg(e);
}
function jg(e) {
  var t = e.getBoundingClientRect(),
    o = Co(t.width) / e.offsetWidth || 1,
    r = Co(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function Vg(e, t, o) {
  o === void 0 && (o = !1);
  var r = Zt(t),
    i = Zt(t) && jg(t),
    a = Hn(t),
    s = wo(e, i, o),
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
      ((In(t) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        os(a)) &&
        (l = zg(t)),
      Zt(t) ? ((c = wo(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : a && (c.x = ns(a))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function Bg(e) {
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
function Wg(e) {
  var t = Bg(e);
  return ga.reduce(function (o, r) {
    return o.concat(
      t.filter(function (i) {
        return i.phase === r;
      }),
    );
  }, []);
}
function Ug(e) {
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
function Ln(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    o[r - 1] = arguments[r];
  return [].concat(o).reduce(function (i, a) {
    return i.replace(/%s/, a);
  }, e);
}
var qn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  Hg = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  Ll = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function qg(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), Ll)
      .filter(function (o, r, i) {
        return i.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                Ln(qn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                Ln(qn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            ga.indexOf(t.phase) < 0 &&
              console.error(
                Ln(qn, t.name, '"phase"', 'either ' + ga.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(Ln(qn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(Ln(qn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                Ln(qn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                Ln(
                  qn,
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
                Ll.map(function (r) {
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
            }) == null && console.error(Ln(Hg, String(t.name), r, r));
          });
      });
  });
}
function Kg(e, t) {
  var o = /* @__PURE__ */ new Set();
  return e.filter(function (r) {
    var i = t(r);
    if (!o.has(i)) return o.add(i), !0;
  });
}
function Yg(e) {
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
var Fl =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Gg =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  zl = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute',
  };
function jl() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function Xg(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    i = t.defaultOptions,
    a = i === void 0 ? zl : i;
  return function (l, c, u) {
    u === void 0 && (u = a);
    var d = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, zl, a),
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
      v = {
        state: d,
        setOptions: function (T) {
          var w = typeof T == 'function' ? T(d.options) : T;
          h(),
            (d.options = Object.assign({}, a, d.options, w)),
            (d.scrollParents = {
              reference: to(l) ? Go(l) : l.contextElement ? Go(l.contextElement) : [],
              popper: Go(c),
            });
          var E = Wg(Yg([].concat(r, d.options.modifiers)));
          if (
            ((d.orderedModifiers = E.filter(function (k) {
              return k.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var y = Kg([].concat(E, d.options.modifiers), function (k) {
              var j = k.name;
              return j;
            });
            if ((qg(y), xn(d.options.placement) === Ti)) {
              var m = d.orderedModifiers.find(function (k) {
                var j = k.name;
                return j === 'flip';
              });
              m ||
                console.error(
                  [
                    'Popper: "auto" placements require the "flip" modifier be',
                    'present and enabled to work.',
                  ].join(' '),
                );
            }
            var O = Cn(c),
              R = O.marginTop,
              D = O.marginRight,
              $ = O.marginBottom,
              N = O.marginLeft;
            [R, D, $, N].some(function (k) {
              return parseFloat(k);
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
          return g(), v.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function () {
          if (!b) {
            var T = d.elements,
              w = T.reference,
              E = T.popper;
            if (!jl(w, E)) {
              process.env.NODE_ENV !== 'production' && console.error(Fl);
              return;
            }
            (d.rects = {
              reference: Vg(w, fr(E), d.options.strategy === 'fixed'),
              popper: Qa(E),
            }),
              (d.reset = !1),
              (d.placement = d.options.placement),
              d.orderedModifiers.forEach(function (k) {
                return (d.modifiersData[k.name] = Object.assign({}, k.data));
              });
            for (var y = 0, m = 0; m < d.orderedModifiers.length; m++) {
              if (process.env.NODE_ENV !== 'production' && ((y += 1), y > 100)) {
                console.error(Gg);
                break;
              }
              if (d.reset === !0) {
                (d.reset = !1), (m = -1);
                continue;
              }
              var O = d.orderedModifiers[m],
                R = O.fn,
                D = O.options,
                $ = D === void 0 ? {} : D,
                N = O.name;
              typeof R == 'function' &&
                (d =
                  R({
                    state: d,
                    options: $,
                    name: N,
                    instance: v,
                  }) || d);
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: Ug(function () {
          return new Promise(function (f) {
            v.forceUpdate(), f(d);
          });
        }),
        destroy: function () {
          h(), (b = !0);
        },
      };
    if (!jl(l, c)) return process.env.NODE_ENV !== 'production' && console.error(Fl), v;
    v.setOptions(u).then(function (f) {
      !b && u.onFirstUpdate && u.onFirstUpdate(f);
    });
    function g() {
      d.orderedModifiers.forEach(function (f) {
        var T = f.name,
          w = f.options,
          E = w === void 0 ? {} : w,
          y = f.effect;
        if (typeof y == 'function') {
          var m = y({
              state: d,
              name: T,
              instance: v,
              options: E,
            }),
            O = function () {};
          p.push(m || O);
        }
      });
    }
    function h() {
      p.forEach(function (f) {
        return f();
      }),
        (p = []);
    }
    return v;
  };
}
var Jg = [bg, Mg, mg, og, Ig, Og, Lg, ug, Ng],
  Zg = /* @__PURE__ */ Xg({
    defaultModifiers: Jg,
  });
function Qg(e) {
  return typeof e == 'function' ? e() : e;
}
const Jr = /* @__PURE__ */ C.forwardRef(function (t, o) {
  const { children: r, container: i, disablePortal: a = !1 } = t,
    [s, l] = C.useState(null),
    c = Rt(/* @__PURE__ */ C.isValidElement(r) ? r.ref : null, o);
  if (
    ($n(() => {
      a || l(Qg(i) || document.body);
    }, [i, a]),
    $n(() => {
      if (s && !a)
        return (
          Ur(o, s),
          () => {
            Ur(o, null);
          }
        );
    }, [o, s, a]),
    a)
  ) {
    if (/* @__PURE__ */ C.isValidElement(r)) {
      const u = {
        ref: c,
      };
      return /* @__PURE__ */ C.cloneElement(r, u);
    }
    return /* @__PURE__ */ I(C.Fragment, {
      children: r,
    });
  }
  return /* @__PURE__ */ I(C.Fragment, {
    children: s && /* @__PURE__ */ Lc.createPortal(r, s),
  });
});
process.env.NODE_ENV !== 'production' &&
  (Jr.propTypes = {
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
    container: n.oneOfType([Nn, n.func]),
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (Jr['propTypes'] = _a(Jr.propTypes));
const Pu = Jr;
function ev(e) {
  return We('MuiPopper', e);
}
Ve('MuiPopper', ['root']);
const tv = [
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
  nv = [
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
function ov(e, t) {
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
function Zr(e) {
  return typeof e == 'function' ? e() : e;
}
function Ri(e) {
  return e.nodeType !== void 0;
}
function rv(e) {
  return !Ri(e);
}
const iv = () =>
    Ye(
      {
        root: ['root'],
      },
      xu(ev),
    ),
  av = {},
  sv = /* @__PURE__ */ C.forwardRef(function (t, o) {
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
        popperOptions: v,
        popperRef: g,
        slotProps: h = {},
        slots: f = {},
        TransitionProps: T,
      } = t,
      w = Se(t, tv),
      E = C.useRef(null),
      y = Rt(E, o),
      m = C.useRef(null),
      O = Rt(m, g),
      R = C.useRef(O);
    $n(() => {
      R.current = O;
    }, [O]),
      C.useImperativeHandle(g, () => m.current, []);
    const D = ov(b, l),
      [$, N] = C.useState(D),
      [k, j] = C.useState(Zr(i));
    C.useEffect(() => {
      m.current && m.current.forceUpdate();
    }),
      C.useEffect(() => {
        i && j(Zr(i));
      }, [i]),
      $n(() => {
        if (!k || !d) return;
        const Q = (_) => {
          N(_.placement);
        };
        if (process.env.NODE_ENV !== 'production' && k && Ri(k) && k.nodeType === 1) {
          const _ = k.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            _.top === 0 &&
            _.left === 0 &&
            _.right === 0 &&
            _.bottom === 0 &&
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
            fn: ({ state: _ }) => {
              Q(_);
            },
          },
        ];
        u != null && (re = re.concat(u)), v && v.modifiers != null && (re = re.concat(v.modifiers));
        const Z = Zg(
          k,
          E.current,
          x(
            {
              placement: D,
            },
            v,
            {
              modifiers: re,
            },
          ),
        );
        return (
          R.current(Z),
          () => {
            Z.destroy(), R.current(null);
          }
        );
      }, [k, c, u, d, v, D]);
    const z = {
      placement: $,
    };
    T !== null && (z.TransitionProps = T);
    const P = iv(),
      V = (r = s ?? f.root) != null ? r : 'div',
      B = rn({
        elementType: V,
        externalSlotProps: h.root,
        externalForwardedProps: w,
        additionalProps: {
          role: 'tooltip',
          ref: y,
        },
        ownerState: x({}, t, p),
        className: P.root,
      });
    return /* @__PURE__ */ I(
      V,
      x({}, B, {
        children: typeof a == 'function' ? a(z) : a,
      }),
    );
  }),
  Iu = /* @__PURE__ */ C.forwardRef(function (t, o) {
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
        popperOptions: b = av,
        popperRef: v,
        style: g,
        transition: h = !1,
        slotProps: f = {},
        slots: T = {},
      } = t,
      w = Se(t, nv),
      [E, y] = C.useState(!0),
      m = () => {
        y(!1);
      },
      O = () => {
        y(!0);
      };
    if (!c && !d && (!h || E)) return null;
    let R;
    if (a) R = a;
    else if (r) {
      const N = Zr(r);
      R = N && Ri(N) ? wt(N).body : wt(null).body;
    }
    const D = !d && c && (!h || E) ? 'none' : void 0,
      $ = h
        ? {
            in: d,
            onEnter: m,
            onExited: O,
          }
        : void 0;
    return /* @__PURE__ */ I(Pu, {
      disablePortal: l,
      container: R,
      children: /* @__PURE__ */ I(
        sv,
        x(
          {
            anchorEl: r,
            direction: s,
            disablePortal: l,
            modifiers: u,
            ref: o,
            open: h ? !E : d,
            placement: p,
            popperOptions: b,
            popperRef: v,
            slotProps: f,
            slots: T,
          },
          w,
          {
            style: x(
              {
                // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
                position: 'fixed',
                // Fix Popper.js display issue
                top: 0,
                left: 0,
                display: D,
              },
              g,
            ),
            TransitionProps: $,
            children: i,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Iu.propTypes = {
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
    anchorEl: En(n.oneOfType([Nn, n.object, n.func]), (e) => {
      if (e.open) {
        const t = Zr(e.anchorEl);
        if (t && Ri(t) && t.nodeType === 1) {
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
          (rv(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    container: n.oneOfType([Nn, n.func]),
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
    popperRef: Ht,
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
const lv = Iu;
function cv(e) {
  const t = wt(e);
  return t.body === e
    ? Qn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function Xo(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function Vl(e) {
  return parseInt(Qn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function uv(e) {
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
function Bl(e, t, o, r, i) {
  const a = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1,
      c = !uv(s);
    l && c && Xo(s, i);
  });
}
function Zi(e, t) {
  let o = -1;
  return e.some((r, i) => (t(r) ? ((o = i), !0) : !1)), o;
}
function dv(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (cv(r)) {
      const s = Kc(wt(r));
      o.push({
        value: r.style.paddingRight,
        property: 'padding-right',
        el: r,
      }),
        (r.style.paddingRight = `${Vl(r) + s}px`);
      const l = wt(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({
          value: c.style.paddingRight,
          property: 'padding-right',
          el: c,
        }),
          (c.style.paddingRight = `${Vl(c) + s}px`);
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment) a = wt(r).body;
    else {
      const s = r.parentElement,
        l = Qn(r);
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
function pv(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class fv {
  constructor() {
    (this.containers = void 0), (this.modals = void 0), (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && Xo(t.modalRef, !1);
    const i = pv(o);
    Bl(o, t.mount, t.modalRef, i, !0);
    const a = Zi(this.containers, (s) => s.container === o);
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
    const r = Zi(this.containers, (a) => a.modals.indexOf(t) !== -1),
      i = this.containers[r];
    i.restore || (i.restore = dv(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const i = Zi(this.containers, (s) => s.modals.indexOf(t) !== -1),
      a = this.containers[i];
    if ((a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0))
      a.restore && a.restore(),
        t.modalRef && Xo(t.modalRef, o),
        Bl(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1),
        this.containers.splice(i, 1);
    else {
      const s = a.modals[a.modals.length - 1];
      s.modalRef && Xo(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function mv(e) {
  return We('MuiModal', e);
}
Ve('MuiModal', ['root', 'hidden', 'backdrop']);
const hv = [
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
  bv = (e) => {
    const { open: t, exited: o } = e;
    return Ye(
      {
        root: ['root', !t && o && 'hidden'],
        backdrop: ['backdrop'],
      },
      xu(mv),
    );
  };
function gv(e) {
  return typeof e == 'function' ? e() : e;
}
function vv(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const yv = new fv(),
  _u = /* @__PURE__ */ C.forwardRef(function (t, o) {
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
        disableRestoreFocus: v = !1,
        disableScrollLock: g = !1,
        hideBackdrop: h = !1,
        keepMounted: f = !1,
        // private
        manager: T = yv,
        onBackdropClick: w,
        onClose: E,
        onKeyDown: y,
        open: m,
        onTransitionEnter: O,
        onTransitionExited: R,
        slotProps: D = {},
        slots: $ = {},
      } = t,
      N = Se(t, hv),
      [k, j] = C.useState(!m),
      z = C.useRef({}),
      P = C.useRef(null),
      V = C.useRef(null),
      B = Rt(V, o),
      Q = vv(a),
      re = (r = t['aria-hidden']) != null ? r : !0,
      Z = () => wt(P.current),
      _ = () => ((z.current.modalRef = V.current), (z.current.mountNode = P.current), z.current),
      W = () => {
        T.mount(_(), {
          disableScrollLock: g,
        }),
          V.current && (V.current.scrollTop = 0);
      },
      te = Ft(() => {
        const ge = gv(c) || Z().body;
        T.add(_(), ge), V.current && W();
      }),
      H = C.useCallback(() => T.isTopModal(_()), [T]),
      K = Ft((ge) => {
        (P.current = ge), !(!ge || !V.current) && (m && H() ? W() : Xo(V.current, re));
      }),
      ne = C.useCallback(() => {
        T.remove(_(), re);
      }, [T, re]);
    C.useEffect(
      () => () => {
        ne();
      },
      [ne],
    ),
      C.useEffect(() => {
        m ? te() : (!Q || !s) && ne();
      }, [m, ne, Q, s, te]);
    const ee = x({}, t, {
        closeAfterTransition: s,
        disableAutoFocus: u,
        disableEnforceFocus: d,
        disableEscapeKeyDown: p,
        disablePortal: b,
        disableRestoreFocus: v,
        disableScrollLock: g,
        exited: k,
        hideBackdrop: h,
        keepMounted: f,
      }),
      oe = bv(ee),
      le = () => {
        j(!1), O && O();
      },
      ue = () => {
        j(!0), R && R(), s && ne();
      },
      ye = (ge) => {
        ge.target === ge.currentTarget && (w && w(ge), E && E(ge, 'backdropClick'));
      },
      se = (ge) => {
        y && y(ge),
          !(ge.key !== 'Escape' || !H()) &&
            (p || (ge.stopPropagation(), E && E(ge, 'escapeKeyDown')));
      },
      L = {};
    a.props.tabIndex === void 0 && (L.tabIndex = '-1'),
      Q && ((L.onEnter = Ks(le, a.props.onEnter)), (L.onExited = Ks(ue, a.props.onExited)));
    const Te = (i = l ?? $.root) != null ? i : 'div',
      F = rn({
        elementType: Te,
        externalSlotProps: D.root,
        externalForwardedProps: N,
        additionalProps: {
          ref: B,
          role: 'presentation',
          onKeyDown: se,
        },
        className: oe.root,
        ownerState: ee,
      }),
      G = $.backdrop,
      De = rn({
        elementType: G,
        externalSlotProps: D.backdrop,
        additionalProps: {
          'aria-hidden': !0,
          onClick: ye,
          open: m,
        },
        className: oe.backdrop,
        ownerState: ee,
      });
    return !f && !m && (!Q || k)
      ? null
      : /* @__PURE__ */ I(Pu, {
          ref: K,
          container: c,
          disablePortal: b,
          children: /* @__PURE__ */ Fe(
            Te,
            x({}, F, {
              children: [
                !h && G ? /* @__PURE__ */ I(G, x({}, De)) : null,
                /* @__PURE__ */ I(Gr, {
                  disableEnforceFocus: d,
                  disableAutoFocus: u,
                  disableRestoreFocus: v,
                  isEnabled: H,
                  open: m,
                  children: /* @__PURE__ */ C.cloneElement(a, L),
                }),
              ],
            }),
          ),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (_u.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: Oo.isRequired,
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
    container: n.oneOfType([Nn, n.func]),
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
const xv = _u,
  Ev = 2;
function Mu(e, t) {
  return e - t;
}
function Vo(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function Wl(e, t) {
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
function Nr(e, t) {
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
function Qr(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function Cv(e, t, o) {
  return (o - t) * e + t;
}
function wv(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function Tv(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(wv(t)));
}
function Ul({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(Mu);
}
function $r({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, i;
  const a = wt(e.current);
  if (
    !((r = e.current) != null && r.contains(a.activeElement)) ||
    Number(a == null || (i = a.activeElement) == null ? void 0 : i.getAttribute('data-index')) !== t
  ) {
    var s;
    (s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  o && o(t);
}
const Sv = {
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
  Rv = (e) => e;
let Pr;
function Qi() {
  return (
    Pr === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Pr = CSS.supports('touch-action', 'none'))
        : (Pr = !0)),
    Pr
  );
}
function Ov(e) {
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
      ref: v,
      scale: g = Rv,
      step: h = 1,
      tabIndex: f,
      value: T,
    } = e,
    w = C.useRef(),
    [E, y] = C.useState(-1),
    [m, O] = C.useState(-1),
    [R, D] = C.useState(!1),
    $ = C.useRef(0),
    [N, k] = Jn({
      controlled: T,
      default: o ?? c,
      name: 'Slider',
    }),
    j =
      d &&
      ((ie, ve, Ce) => {
        const U = ie.nativeEvent || ie,
          pe = new U.constructor(U.type, U);
        Object.defineProperty(pe, 'target', {
          writable: !0,
          value: {
            value: ve,
            name: u,
          },
        }),
          d(pe, ve, Ce);
      }),
    z = Array.isArray(N);
  let P = z ? N.slice().sort(Mu) : [N];
  P = P.map((ie) => Vo(ie, c, l));
  const V =
      s === !0 && h !== null
        ? [...Array(Math.floor((l - c) / h) + 1)].map((ie, ve) => ({
            value: c + h * ve,
          }))
        : s || [],
    B = V.map((ie) => ie.value),
    { isFocusVisibleRef: Q, onBlur: re, onFocus: Z, ref: _ } = qc(),
    [W, te] = C.useState(-1),
    H = C.useRef(),
    K = Rt(_, H),
    ne = Rt(v, K),
    ee = (ie) => (ve) => {
      var Ce;
      const U = Number(ve.currentTarget.getAttribute('data-index'));
      Z(ve),
        Q.current === !0 && te(U),
        O(U),
        ie == null || (Ce = ie.onFocus) == null || Ce.call(ie, ve);
    },
    oe = (ie) => (ve) => {
      var Ce;
      re(ve),
        Q.current === !1 && te(-1),
        O(-1),
        ie == null || (Ce = ie.onBlur) == null || Ce.call(ie, ve);
    };
  $n(() => {
    if (r && H.current.contains(document.activeElement)) {
      var ie;
      (ie = document.activeElement) == null || ie.blur();
    }
  }, [r]),
    r && E !== -1 && y(-1),
    r && W !== -1 && te(-1);
  const le = (ie) => (ve) => {
      var Ce;
      (Ce = ie.onChange) == null || Ce.call(ie, ve);
      const U = Number(ve.currentTarget.getAttribute('data-index')),
        pe = P[U],
        de = B.indexOf(pe);
      let ae = ve.target.valueAsNumber;
      if (
        (V && h == null && (ae = ae < pe ? B[de - 1] : B[de + 1]),
        (ae = Vo(ae, c, l)),
        V && h == null)
      ) {
        const Ee = B.indexOf(P[U]);
        ae = ae < P[U] ? B[Ee - 1] : B[Ee + 1];
      }
      if (z) {
        i && (ae = Vo(ae, P[U - 1] || -1 / 0, P[U + 1] || 1 / 0));
        const Ee = ae;
        ae = Ul({
          values: P,
          newValue: ae,
          index: U,
        });
        let we = U;
        i || (we = ae.indexOf(Ee)),
          $r({
            sliderRef: H,
            activeIndex: we,
          });
      }
      k(ae), te(U), j && j(ve, ae, U), p && p(ve, ae);
    },
    ue = C.useRef();
  let ye = b;
  a && b === 'horizontal' && (ye += '-reverse');
  const se = ({ finger: ie, move: ve = !1 }) => {
      const { current: Ce } = H,
        { width: U, height: pe, bottom: de, left: ae } = Ce.getBoundingClientRect();
      let Ee;
      ye.indexOf('vertical') === 0 ? (Ee = (de - ie.y) / pe) : (Ee = (ie.x - ae) / U),
        ye.indexOf('-reverse') !== -1 && (Ee = 1 - Ee);
      let we;
      if (((we = Cv(Ee, c, l)), h)) we = Tv(we, h, c);
      else {
        const ht = Wl(B, we);
        we = B[ht];
      }
      we = Vo(we, c, l);
      let Ae = 0;
      if (z) {
        ve ? (Ae = ue.current) : (Ae = Wl(P, we)),
          i && (we = Vo(we, P[Ae - 1] || -1 / 0, P[Ae + 1] || 1 / 0));
        const ht = we;
        (we = Ul({
          values: P,
          newValue: we,
          index: Ae,
        })),
          (i && ve) || ((Ae = we.indexOf(ht)), (ue.current = Ae));
      }
      return {
        newValue: we,
        activeIndex: Ae,
      };
    },
    L = Ft((ie) => {
      const ve = Nr(ie, w);
      if (!ve) return;
      if ((($.current += 1), ie.type === 'mousemove' && ie.buttons === 0)) {
        Te(ie);
        return;
      }
      const { newValue: Ce, activeIndex: U } = se({
        finger: ve,
        move: !0,
      });
      $r({
        sliderRef: H,
        activeIndex: U,
        setActive: y,
      }),
        k(Ce),
        !R && $.current > Ev && D(!0),
        j && Ce !== N && j(ie, Ce, U);
    }),
    Te = Ft((ie) => {
      const ve = Nr(ie, w);
      if ((D(!1), !ve)) return;
      const { newValue: Ce } = se({
        finger: ve,
        move: !0,
      });
      y(-1), ie.type === 'touchend' && O(-1), p && p(ie, Ce), (w.current = void 0), G();
    }),
    F = Ft((ie) => {
      if (r) return;
      Qi() || ie.preventDefault();
      const ve = ie.changedTouches[0];
      ve != null && (w.current = ve.identifier);
      const Ce = Nr(ie, w);
      if (Ce !== !1) {
        const { newValue: pe, activeIndex: de } = se({
          finger: Ce,
        });
        $r({
          sliderRef: H,
          activeIndex: de,
          setActive: y,
        }),
          k(pe),
          j && j(ie, pe, de);
      }
      $.current = 0;
      const U = wt(H.current);
      U.addEventListener('touchmove', L), U.addEventListener('touchend', Te);
    }),
    G = C.useCallback(() => {
      const ie = wt(H.current);
      ie.removeEventListener('mousemove', L),
        ie.removeEventListener('mouseup', Te),
        ie.removeEventListener('touchmove', L),
        ie.removeEventListener('touchend', Te);
    }, [Te, L]);
  C.useEffect(() => {
    const { current: ie } = H;
    return (
      ie.addEventListener('touchstart', F, {
        passive: Qi(),
      }),
      () => {
        ie.removeEventListener('touchstart', F, {
          passive: Qi(),
        }),
          G();
      }
    );
  }, [G, F]),
    C.useEffect(() => {
      r && G();
    }, [r, G]);
  const De = (ie) => (ve) => {
      var Ce;
      if (
        ((Ce = ie.onMouseDown) == null || Ce.call(ie, ve),
        r || ve.defaultPrevented || ve.button !== 0)
      )
        return;
      ve.preventDefault();
      const U = Nr(ve, w);
      if (U !== !1) {
        const { newValue: de, activeIndex: ae } = se({
          finger: U,
        });
        $r({
          sliderRef: H,
          activeIndex: ae,
          setActive: y,
        }),
          k(de),
          j && j(ve, de, ae);
      }
      $.current = 0;
      const pe = wt(H.current);
      pe.addEventListener('mousemove', L), pe.addEventListener('mouseup', Te);
    },
    ge = Qr(z ? P[0] : c, c, l),
    Le = Qr(P[P.length - 1], c, l) - ge,
    Ue = (ie = {}) => {
      const ve = {
          onMouseDown: De(ie || {}),
        },
        Ce = x({}, ie, ve);
      return x(
        {
          ref: ne,
        },
        Ce,
      );
    },
    $e = (ie) => (ve) => {
      var Ce;
      (Ce = ie.onMouseOver) == null || Ce.call(ie, ve);
      const U = Number(ve.currentTarget.getAttribute('data-index'));
      O(U);
    },
    Me = (ie) => (ve) => {
      var Ce;
      (Ce = ie.onMouseLeave) == null || Ce.call(ie, ve), O(-1);
    };
  return {
    active: E,
    axis: ye,
    axisProps: Sv,
    dragging: R,
    focusedThumbIndex: W,
    getHiddenInputProps: (ie = {}) => {
      var ve;
      const Ce = {
          onChange: le(ie || {}),
          onFocus: ee(ie || {}),
          onBlur: oe(ie || {}),
        },
        U = x({}, ie, Ce);
      return x(
        {
          tabIndex: f,
          'aria-labelledby': t,
          'aria-orientation': b,
          'aria-valuemax': g(l),
          'aria-valuemin': g(c),
          name: u,
          type: 'range',
          min: e.min,
          max: e.max,
          step: (ve = e.step) != null ? ve : void 0,
          disabled: r,
        },
        U,
        {
          style: x({}, bf, {
            direction: a ? 'rtl' : 'ltr',
            // So that VoiceOver's focus indicator matches the thumb's dimensions
            width: '100%',
            height: '100%',
          }),
        },
      );
    },
    getRootProps: Ue,
    getThumbProps: (ie = {}) => {
      const ve = {
        onMouseOver: $e(ie || {}),
        onMouseLeave: Me(ie || {}),
      };
      return x({}, ie, ve);
    },
    marks: V,
    open: m,
    range: z,
    trackLeap: Le,
    trackOffset: ge,
    values: P,
  };
}
function kv(e) {
  const {
      autoHideDuration: t = null,
      disableWindowBlurListener: o = !1,
      onClose: r,
      open: i,
      ref: a,
      resumeHideDuration: s,
    } = e,
    l = C.useRef();
  C.useEffect(() => {
    if (!i) return;
    function w(E) {
      E.defaultPrevented ||
        ((E.key === 'Escape' || E.key === 'Esc') && (r == null || r(E, 'escapeKeyDown')));
    }
    return (
      document.addEventListener('keydown', w),
      () => {
        document.removeEventListener('keydown', w);
      }
    );
  }, [i, r]);
  const c = Ft((w, E) => {
      r == null || r(w, E);
    }),
    u = Ft((w) => {
      !r ||
        w == null ||
        (clearTimeout(l.current),
        (l.current = setTimeout(() => {
          c(null, 'timeout');
        }, w)));
    });
  C.useEffect(
    () => (
      i && u(t),
      () => {
        clearTimeout(l.current);
      }
    ),
    [i, t, u],
  );
  const d = (w) => {
      r == null || r(w, 'clickaway');
    },
    p = () => {
      clearTimeout(l.current);
    },
    b = C.useCallback(() => {
      t != null && u(s ?? t * 0.5);
    }, [t, s, u]),
    v = (w) => (E) => {
      const y = w.onBlur;
      y == null || y(E), b();
    },
    g = (w) => (E) => {
      const y = w.onFocus;
      y == null || y(E), p();
    },
    h = (w) => (E) => {
      const y = w.onMouseEnter;
      y == null || y(E), p();
    },
    f = (w) => (E) => {
      const y = w.onMouseLeave;
      y == null || y(E), b();
    };
  return (
    C.useEffect(() => {
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
      getRootProps: (w = {}) => {
        const E = Eu(e),
          y = x({}, E, w);
        return x(
          {
            ref: a,
            // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
            // See https://github.com/mui/material-ui/issues/29080
            role: 'presentation',
          },
          y,
          {
            onBlur: v(y),
            onFocus: g(y),
            onMouseEnter: h(y),
            onMouseLeave: f(y),
          },
        );
      },
      onClickAway: d,
    }
  );
}
const Nv = ['onChange', 'maxRows', 'minRows', 'style', 'value'];
function Ir(e) {
  return parseInt(e, 10) || 0;
}
const $v = {
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
function Hl(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const Au = /* @__PURE__ */ C.forwardRef(function (t, o) {
  const { onChange: r, maxRows: i, minRows: a = 1, style: s, value: l } = t,
    c = Se(t, Nv),
    { current: u } = C.useRef(l != null),
    d = C.useRef(null),
    p = Rt(o, d),
    b = C.useRef(null),
    v = C.useRef(0),
    [g, h] = C.useState({
      outerHeightStyle: 0,
    }),
    f = C.useCallback(() => {
      const m = d.current,
        R = Qn(m).getComputedStyle(m);
      if (R.width === '0px')
        return {
          outerHeightStyle: 0,
        };
      const D = b.current;
      (D.style.width = R.width),
        (D.value = m.value || t.placeholder || 'x'),
        D.value.slice(-1) ===
          `
` && (D.value += ' ');
      const $ = R.boxSizing,
        N = Ir(R.paddingBottom) + Ir(R.paddingTop),
        k = Ir(R.borderBottomWidth) + Ir(R.borderTopWidth),
        j = D.scrollHeight;
      D.value = 'x';
      const z = D.scrollHeight;
      let P = j;
      a && (P = Math.max(Number(a) * z, P)),
        i && (P = Math.min(Number(i) * z, P)),
        (P = Math.max(P, z));
      const V = P + ($ === 'border-box' ? N + k : 0),
        B = Math.abs(P - j) <= 1;
      return {
        outerHeightStyle: V,
        overflow: B,
      };
    }, [i, a, t.placeholder]),
    T = (m, O) => {
      const { outerHeightStyle: R, overflow: D } = O;
      return v.current < 20 &&
        ((R > 0 && Math.abs((m.outerHeightStyle || 0) - R) > 1) || m.overflow !== D)
        ? ((v.current += 1),
          {
            overflow: D,
            outerHeightStyle: R,
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
          m);
    },
    w = C.useCallback(() => {
      const m = f();
      Hl(m) || h((O) => T(O, m));
    }, [f]),
    E = () => {
      const m = f();
      Hl(m) ||
        Lc.flushSync(() => {
          h((O) => T(O, m));
        });
    };
  C.useEffect(() => {
    const m = Uc(() => {
      (v.current = 0), d.current && E();
    });
    let O;
    const R = d.current,
      D = Qn(R);
    return (
      D.addEventListener('resize', m),
      typeof ResizeObserver < 'u' && ((O = new ResizeObserver(m)), O.observe(R)),
      () => {
        m.clear(), D.removeEventListener('resize', m), O && O.disconnect();
      }
    );
  }),
    $n(() => {
      w();
    }),
    C.useEffect(() => {
      v.current = 0;
    }, [l]);
  const y = (m) => {
    (v.current = 0), u || w(), r && r(m);
  };
  return /* @__PURE__ */ Fe(C.Fragment, {
    children: [
      /* @__PURE__ */ I(
        'textarea',
        x(
          {
            value: l,
            onChange: y,
            ref: p,
            rows: a,
            style: x(
              {
                height: g.outerHeightStyle,
                // Need a large enough difference to allow scrolling.
                // This prevents infinite rendering loop.
                overflow: g.overflow ? 'hidden' : void 0,
              },
              s,
            ),
          },
          c,
        ),
      ),
      /* @__PURE__ */ I('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: b,
        tabIndex: -1,
        style: x({}, $v.shadow, s, {
          padding: 0,
        }),
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (Au.propTypes = {
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
const Pv = Au;
function ql(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function Iv(e = {}) {
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
    o && (d = d.toLowerCase()), t && (d = ql(d));
    const p = d
      ? l.filter((b) => {
          let v = (a || u)(b);
          return (
            o && (v = v.toLowerCase()),
            t && (v = ql(v)),
            i === 'start' ? v.indexOf(d) === 0 : v.indexOf(d) > -1
          );
        })
      : l;
    return typeof r == 'number' ? p.slice(0, r) : p;
  };
}
function ea(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const _v = Iv(),
  Kl = 5,
  Mv = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function Av(e) {
  const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_isActiveElementInListbox: t = Mv,
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
      disabled: v,
      disabledItemsFocusable: g = !1,
      disableListWrap: h = !1,
      filterOptions: f = _v,
      filterSelectedOptions: T = !1,
      freeSolo: w = !1,
      getOptionDisabled: E,
      getOptionLabel: y = (A) => {
        var M;
        return (M = A.label) != null ? M : A;
      },
      groupBy: m,
      handleHomeEndKeys: O = !e.freeSolo,
      id: R,
      includeInputInList: D = !1,
      inputValue: $,
      isOptionEqualToValue: N = (A, M) => A === M,
      multiple: k = !1,
      onChange: j,
      onClose: z,
      onHighlightChange: P,
      onInputChange: V,
      onOpen: B,
      open: Q,
      openOnFocus: re = !1,
      options: Z,
      readOnly: _ = !1,
      selectOnFocus: W = !e.freeSolo,
      value: te,
    } = e,
    H = Hc(R);
  let K = y;
  K = (A) => {
    const M = y(A);
    if (typeof M != 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const X = M === void 0 ? 'undefined' : `${typeof M} (${M})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${u} returned ${X} instead of a string for ${JSON.stringify(
            A,
          )}.`,
        );
      }
      return String(M);
    }
    return M;
  };
  const ne = C.useRef(!1),
    ee = C.useRef(!0),
    oe = C.useRef(null),
    le = C.useRef(null),
    [ue, ye] = C.useState(null),
    [se, L] = C.useState(-1),
    Te = i ? 0 : -1,
    F = C.useRef(Te),
    [G, De] = Jn({
      controlled: te,
      default: d,
      name: u,
    }),
    [ge, Le] = Jn({
      controlled: $,
      default: '',
      name: u,
      state: 'inputValue',
    }),
    [Ue, $e] = C.useState(!1),
    Me = C.useCallback(
      (A, M) => {
        if (!(k ? G.length < M.length : M !== null) && !l) return;
        let Y;
        if (k) Y = '';
        else if (M == null) Y = '';
        else {
          const me = K(M);
          Y = typeof me == 'string' ? me : '';
        }
        ge !== Y && (Le(Y), V && V(A, Y, 'reset'));
      },
      [K, ge, k, V, Le, l, G],
    ),
    [ct, mt] = Jn({
      controlled: Q,
      default: !1,
      name: u,
      state: 'open',
    }),
    [ie, ve] = C.useState(!0),
    Ce = !k && G != null && ge === K(G),
    U = ct && !_,
    pe = U
      ? f(
          Z.filter((A) => !(T && (k ? G : [G]).some((M) => M !== null && N(A, M)))),
          // we use the empty string to manipulate `filterOptions` to not filter any options
          // i.e. the filter predicate always returns true
          {
            inputValue: Ce && ie ? '' : ge,
            getOptionLabel: K,
          },
        )
      : [],
    de = mf({
      filteredOptions: pe,
      value: G,
    });
  C.useEffect(() => {
    const A = G !== de.value;
    (Ue && !A) || (w && !A) || Me(null, G);
  }, [G, Me, Ue, de.value, w]);
  const ae = ct && pe.length > 0 && !_;
  if (process.env.NODE_ENV !== 'production' && G !== null && !w && Z.length > 0) {
    const A = (k ? G : [G]).filter((M) => !Z.some((X) => N(X, M)));
    A.length > 0 &&
      console.warn(
        [
          `MUI: The value provided to ${u} is invalid.`,
          `None of the options match with \`${
            A.length > 1 ? JSON.stringify(A) : JSON.stringify(A[0])
          }\`.`,
          'You can use the `isOptionEqualToValue` prop to customize the equality test.',
        ].join(`
`),
      );
  }
  const Ee = Ft((A) => {
    A === -1 ? oe.current.focus() : ue.querySelector(`[data-tag-index="${A}"]`).focus();
  });
  C.useEffect(() => {
    k && se > G.length - 1 && (L(-1), Ee(-1));
  }, [G, k, se, Ee]);
  function we(A, M) {
    if (!le.current || A === -1) return -1;
    let X = A;
    for (;;) {
      if ((M === 'next' && X === pe.length) || (M === 'previous' && X === -1)) return -1;
      const Y = le.current.querySelector(`[data-option-index="${X}"]`),
        me = g ? !1 : !Y || Y.disabled || Y.getAttribute('aria-disabled') === 'true';
      if ((Y && !Y.hasAttribute('tabindex')) || me) X += M === 'next' ? 1 : -1;
      else return X;
    }
  }
  const Ae = Ft(({ event: A, index: M, reason: X = 'auto' }) => {
      if (
        ((F.current = M),
        M === -1
          ? oe.current.removeAttribute('aria-activedescendant')
          : oe.current.setAttribute('aria-activedescendant', `${H}-option-${M}`),
        P && P(A, M === -1 ? null : pe[M], X),
        !le.current)
      )
        return;
      const Y = le.current.querySelector(`[role="option"].${o}-focused`);
      Y && (Y.classList.remove(`${o}-focused`), Y.classList.remove(`${o}-focusVisible`));
      const me = le.current.parentElement.querySelector('[role="listbox"]');
      if (!me) return;
      if (M === -1) {
        me.scrollTop = 0;
        return;
      }
      const Ie = le.current.querySelector(`[data-option-index="${M}"]`);
      if (
        Ie &&
        (Ie.classList.add(`${o}-focused`),
        X === 'keyboard' && Ie.classList.add(`${o}-focusVisible`),
        me.scrollHeight > me.clientHeight && X !== 'mouse')
      ) {
        const Pe = Ie,
          Oe = me.clientHeight + me.scrollTop,
          Ot = Pe.offsetTop + Pe.offsetHeight;
        Ot > Oe
          ? (me.scrollTop = Ot - me.clientHeight)
          : Pe.offsetTop - Pe.offsetHeight * (m ? 1.3 : 0) < me.scrollTop &&
            (me.scrollTop = Pe.offsetTop - Pe.offsetHeight * (m ? 1.3 : 0));
      }
    }),
    ht = Ft(({ event: A, diff: M, direction: X = 'next', reason: Y = 'auto' }) => {
      if (!U) return;
      const Ie = we(
        (() => {
          const Pe = pe.length - 1;
          if (M === 'reset') return Te;
          if (M === 'start') return 0;
          if (M === 'end') return Pe;
          const Oe = F.current + M;
          return Oe < 0
            ? Oe === -1 && D
              ? -1
              : (h && F.current !== -1) || Math.abs(M) > 1
              ? 0
              : Pe
            : Oe > Pe
            ? Oe === Pe + 1 && D
              ? -1
              : h || Math.abs(M) > 1
              ? Pe
              : 0
            : Oe;
        })(),
        X,
      );
      if (
        (Ae({
          index: Ie,
          reason: Y,
          event: A,
        }),
        r && M !== 'reset')
      )
        if (Ie === -1) oe.current.value = ge;
        else {
          const Pe = K(pe[Ie]);
          (oe.current.value = Pe),
            Pe.toLowerCase().indexOf(ge.toLowerCase()) === 0 &&
              ge.length > 0 &&
              oe.current.setSelectionRange(ge.length, Pe.length);
        }
    }),
    ut = () => {
      const A = (M, X) => {
        const Y = M ? K(M) : '',
          me = X ? K(X) : '';
        return Y === me;
      };
      if (
        F.current !== -1 &&
        de.filteredOptions &&
        de.filteredOptions.length !== pe.length &&
        (k
          ? G.length === de.value.length && de.value.every((M, X) => K(G[X]) === K(M))
          : A(de.value, G))
      ) {
        const M = de.filteredOptions[F.current];
        if (M && pe.some((Y) => K(Y) === K(M))) return !0;
      }
      return !1;
    },
    Pt = C.useCallback(() => {
      if (!U || ut()) return;
      const A = k ? G[0] : G;
      if (pe.length === 0 || A == null) {
        ht({
          diff: 'reset',
        });
        return;
      }
      if (le.current) {
        if (A != null) {
          const M = pe[F.current];
          if (k && M && ea(G, (Y) => N(M, Y)) !== -1) return;
          const X = ea(pe, (Y) => N(Y, A));
          X === -1
            ? ht({
                diff: 'reset',
              })
            : Ae({
                index: X,
              });
          return;
        }
        if (F.current >= pe.length - 1) {
          Ae({
            index: pe.length - 1,
          });
          return;
        }
        Ae({
          index: F.current,
        });
      }
    }, [
      // Only sync the highlighted index when the option switch between empty and not
      pe.length,
      // Don't sync the highlighted index with the value when multiple
      // eslint-disable-next-line react-hooks/exhaustive-deps
      k ? !1 : G,
      T,
      ht,
      Ae,
      U,
      ge,
      k,
    ]),
    Qt = Ft((A) => {
      Ur(le, A), A && Pt();
    });
  process.env.NODE_ENV !== 'production' &&
    C.useEffect(() => {
      (!oe.current || oe.current.nodeName !== 'INPUT') &&
        (oe.current && oe.current.nodeName === 'TEXTAREA'
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
                `MUI: Unable to find the input element. It was resolved to ${oe.current} while an HTMLInputElement was expected.`,
                `Instead, ${u} expects an input element.`,
                '',
                u === 'useAutocomplete'
                  ? 'Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed.'
                  : 'Make sure you have customized the input component correctly.',
              ].join(`
`),
            ));
    }, [u]),
    C.useEffect(() => {
      Pt();
    }, [Pt]);
  const It = (A) => {
      ct || (mt(!0), ve(!0), B && B(A));
    },
    Tt = (A, M) => {
      ct && (mt(!1), z && z(A, M));
    },
    St = (A, M, X, Y) => {
      if (k) {
        if (G.length === M.length && G.every((me, Ie) => me === M[Ie])) return;
      } else if (G === M) return;
      j && j(A, M, X, Y), De(M);
    },
    gt = C.useRef(!1),
    Be = (A, M, X = 'selectOption', Y = 'options') => {
      let me = X,
        Ie = M;
      if (k) {
        if (((Ie = Array.isArray(G) ? G.slice() : []), process.env.NODE_ENV !== 'production')) {
          const Oe = Ie.filter((Ot) => N(M, Ot));
          Oe.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${u} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${Oe.length} matches.`,
              ].join(`
`),
            );
        }
        const Pe = ea(Ie, (Oe) => N(M, Oe));
        Pe === -1 ? Ie.push(M) : Y !== 'freeSolo' && (Ie.splice(Pe, 1), (me = 'removeOption'));
      }
      Me(A, Ie),
        St(A, Ie, me, {
          option: M,
        }),
        !b && (!A || (!A.ctrlKey && !A.metaKey)) && Tt(A, me),
        (s === !0 || (s === 'touch' && gt.current) || (s === 'mouse' && !gt.current)) &&
          oe.current.blur();
    };
  function dt(A, M) {
    if (A === -1) return -1;
    let X = A;
    for (;;) {
      if ((M === 'next' && X === G.length) || (M === 'previous' && X === -1)) return -1;
      const Y = ue.querySelector(`[data-tag-index="${X}"]`);
      if (
        !Y ||
        !Y.hasAttribute('tabindex') ||
        Y.disabled ||
        Y.getAttribute('aria-disabled') === 'true'
      )
        X += M === 'next' ? 1 : -1;
      else return X;
    }
  }
  const xt = (A, M) => {
      if (!k) return;
      ge === '' && Tt(A, 'toggleInput');
      let X = se;
      se === -1
        ? ge === '' && M === 'previous' && (X = G.length - 1)
        : ((X += M === 'next' ? 1 : -1), X < 0 && (X = 0), X === G.length && (X = -1)),
        (X = dt(X, M)),
        L(X),
        Ee(X);
    },
    en = (A) => {
      (ne.current = !0), Le(''), V && V(A, '', 'clear'), St(A, k ? [] : null, 'clear');
    },
    At = (A) => (M) => {
      if (
        (A.onKeyDown && A.onKeyDown(M),
        !M.defaultMuiPrevented &&
          (se !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(M.key) === -1 && (L(-1), Ee(-1)),
          M.which !== 229))
      )
        switch (M.key) {
          case 'Home':
            U &&
              O &&
              (M.preventDefault(),
              ht({
                diff: 'start',
                direction: 'next',
                reason: 'keyboard',
                event: M,
              }));
            break;
          case 'End':
            U &&
              O &&
              (M.preventDefault(),
              ht({
                diff: 'end',
                direction: 'previous',
                reason: 'keyboard',
                event: M,
              }));
            break;
          case 'PageUp':
            M.preventDefault(),
              ht({
                diff: -Kl,
                direction: 'previous',
                reason: 'keyboard',
                event: M,
              }),
              It(M);
            break;
          case 'PageDown':
            M.preventDefault(),
              ht({
                diff: Kl,
                direction: 'next',
                reason: 'keyboard',
                event: M,
              }),
              It(M);
            break;
          case 'ArrowDown':
            M.preventDefault(),
              ht({
                diff: 1,
                direction: 'next',
                reason: 'keyboard',
                event: M,
              }),
              It(M);
            break;
          case 'ArrowUp':
            M.preventDefault(),
              ht({
                diff: -1,
                direction: 'previous',
                reason: 'keyboard',
                event: M,
              }),
              It(M);
            break;
          case 'ArrowLeft':
            xt(M, 'previous');
            break;
          case 'ArrowRight':
            xt(M, 'next');
            break;
          case 'Enter':
            if (F.current !== -1 && U) {
              const X = pe[F.current],
                Y = E ? E(X) : !1;
              if ((M.preventDefault(), Y)) return;
              Be(M, X, 'selectOption'),
                r && oe.current.setSelectionRange(oe.current.value.length, oe.current.value.length);
            } else
              w &&
                ge !== '' &&
                Ce === !1 &&
                (k && M.preventDefault(), Be(M, ge, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            U
              ? (M.preventDefault(), M.stopPropagation(), Tt(M, 'escape'))
              : c &&
                (ge !== '' || (k && G.length > 0)) &&
                (M.preventDefault(), M.stopPropagation(), en(M));
            break;
          case 'Backspace':
            if (k && !_ && ge === '' && G.length > 0) {
              const X = se === -1 ? G.length - 1 : se,
                Y = G.slice();
              Y.splice(X, 1),
                St(M, Y, 'removeOption', {
                  option: G[X],
                });
            }
            break;
          case 'Delete':
            if (k && !_ && ge === '' && G.length > 0 && se !== -1) {
              const X = se,
                Y = G.slice();
              Y.splice(X, 1),
                St(M, Y, 'removeOption', {
                  option: G[X],
                });
            }
            break;
        }
    },
    tn = (A) => {
      $e(!0), re && !ne.current && It(A);
    },
    zt = (A) => {
      if (t(le)) {
        oe.current.focus();
        return;
      }
      $e(!1),
        (ee.current = !0),
        (ne.current = !1),
        a && F.current !== -1 && U
          ? Be(A, pe[F.current], 'blur')
          : a && w && ge !== ''
          ? Be(A, ge, 'blur', 'freeSolo')
          : l && Me(A, G),
        Tt(A, 'blur');
    },
    nn = (A) => {
      const M = A.target.value;
      ge !== M && (Le(M), ve(!1), V && V(A, M, 'input')),
        M === '' ? !p && !k && St(A, null, 'clear') : It(A);
    },
    pn = (A) => {
      Ae({
        event: A,
        index: Number(A.currentTarget.getAttribute('data-option-index')),
        reason: 'mouse',
      });
    },
    fn = (A) => {
      Ae({
        event: A,
        index: Number(A.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (gt.current = !0);
    },
    ft = (A) => {
      const M = Number(A.currentTarget.getAttribute('data-option-index'));
      Be(A, pe[M], 'selectOption'), (gt.current = !1);
    },
    on = (A) => (M) => {
      const X = G.slice();
      X.splice(A, 1),
        St(M, X, 'removeOption', {
          option: G[A],
        });
    },
    je = (A) => {
      ct ? Tt(A, 'toggleInput') : It(A);
    },
    vt = (A) => {
      A.target.getAttribute('id') !== H && A.preventDefault();
    },
    Vt = () => {
      oe.current.focus(),
        W &&
          ee.current &&
          oe.current.selectionEnd - oe.current.selectionStart === 0 &&
          oe.current.select(),
        (ee.current = !1);
    },
    S = (A) => {
      (ge === '' || !ct) && je(A);
    };
  let q = w && ge.length > 0;
  q = q || (k ? G.length > 0 : G !== null);
  let fe = pe;
  if (m) {
    const A = /* @__PURE__ */ new Map();
    let M = !1;
    fe = pe.reduce((X, Y, me) => {
      const Ie = m(Y);
      return (
        X.length > 0 && X[X.length - 1].group === Ie
          ? X[X.length - 1].options.push(Y)
          : (process.env.NODE_ENV !== 'production' &&
              (A.get(Ie) &&
                !M &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${u} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                (M = !0)),
              A.set(Ie, !0)),
            X.push({
              key: me,
              index: me,
              group: Ie,
              options: [Y],
            })),
        X
      );
    }, []);
  }
  return (
    v && Ue && zt(),
    {
      getRootProps: (A = {}) =>
        x(
          {
            'aria-owns': ae ? `${H}-listbox` : null,
          },
          A,
          {
            onKeyDown: At(A),
            onMouseDown: vt,
            onClick: Vt,
          },
        ),
      getInputLabelProps: () => ({
        id: `${H}-label`,
        htmlFor: H,
      }),
      getInputProps: () => ({
        id: H,
        value: ge,
        onBlur: zt,
        onFocus: tn,
        onChange: nn,
        onMouseDown: S,
        // if open then this is handled imperativeley so don't let react override
        // only have an opinion about this when closed
        'aria-activedescendant': U ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': ae ? `${H}-listbox` : void 0,
        'aria-expanded': ae,
        // Disable browser's suggestion that might overlap with the popup.
        // Handle autocomplete but not autofill.
        autoComplete: 'off',
        ref: oe,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled: v,
      }),
      getClearProps: () => ({
        tabIndex: -1,
        onClick: en,
      }),
      getPopupIndicatorProps: () => ({
        tabIndex: -1,
        onClick: je,
      }),
      getTagProps: ({ index: A }) =>
        x(
          {
            key: A,
            'data-tag-index': A,
            tabIndex: -1,
          },
          !_ && {
            onDelete: on(A),
          },
        ),
      getListboxProps: () => ({
        role: 'listbox',
        id: `${H}-listbox`,
        'aria-labelledby': `${H}-label`,
        ref: Qt,
        onMouseDown: (A) => {
          A.preventDefault();
        },
      }),
      getOptionProps: ({ index: A, option: M }) => {
        const X = (k ? G : [G]).some((me) => me != null && N(M, me)),
          Y = E ? E(M) : !1;
        return {
          key: K(M),
          tabIndex: -1,
          role: 'option',
          id: `${H}-option-${A}`,
          onMouseOver: pn,
          onClick: ft,
          onTouchStart: fn,
          'data-option-index': A,
          'aria-disabled': Y,
          'aria-selected': X,
        };
      },
      id: H,
      inputValue: ge,
      value: G,
      dirty: q,
      expanded: U && ue,
      popupOpen: U,
      focused: Ue || se !== -1,
      anchorEl: ue,
      setAnchorEl: ye,
      focusedTag: se,
      groupedOptions: fe,
    }
  );
}
function Dv(e) {
  return We('MuiSvgIcon', e);
}
Ve('MuiSvgIcon', [
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
const Lv = [
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
  Fv = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      i = {
        root: ['root', t !== 'inherit' && `color${ce(t)}`, `fontSize${ce(o)}`],
      };
    return Ye(i, Dv, r);
  },
  zv = be('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'inherit' && t[`color${ce(o.color)}`],
        t[`fontSize${ce(o.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    var o, r, i, a, s, l, c, u, d, p, b, v, g, h, f, T, w;
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
        (b = (v = (e.vars || e).palette) == null || (g = v[t.color]) == null ? void 0 : g.main) !=
        null
          ? b
          : {
              action:
                (h = (e.vars || e).palette) == null || (f = h.action) == null ? void 0 : f.active,
              disabled:
                (T = (e.vars || e).palette) == null || (w = T.action) == null ? void 0 : w.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  rs = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
      v = Se(r, Lv),
      g = x({}, r, {
        color: s,
        component: l,
        fontSize: c,
        instanceFontSize: t.fontSize,
        inheritViewBox: d,
        viewBox: b,
      }),
      h = {};
    d || (h.viewBox = b);
    const f = Fv(g);
    return /* @__PURE__ */ Fe(
      zv,
      x(
        {
          as: l,
          className: xe(f.root, a),
          focusable: 'false',
          color: u,
          'aria-hidden': p ? void 0 : !0,
          role: p ? 'img' : void 0,
          ref: o,
        },
        h,
        v,
        {
          ownerState: g,
          children: [
            i,
            p
              ? /* @__PURE__ */ I('title', {
                  children: p,
                })
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (rs.propTypes = {
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
rs.muiName = 'SvgIcon';
const Yl = rs;
function $o(e, t) {
  function o(r, i) {
    return /* @__PURE__ */ I(
      Yl,
      x(
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
    (o.muiName = Yl.muiName),
    /* @__PURE__ */ C.memo(/* @__PURE__ */ C.forwardRef(o))
  );
}
var xa = { exports: {} },
  rt = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gl;
function jv() {
  if (Gl) return rt;
  Gl = 1;
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
    v = Symbol.for('react.offscreen'),
    g;
  g = Symbol.for('react.module.reference');
  function h(f) {
    if (typeof f == 'object' && f !== null) {
      var T = f.$$typeof;
      switch (T) {
        case e:
          switch (((f = f.type), f)) {
            case o:
            case i:
            case r:
            case u:
            case d:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case s:
                case c:
                case b:
                case p:
                case a:
                  return f;
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
    (rt.ContextConsumer = s),
    (rt.ContextProvider = a),
    (rt.Element = e),
    (rt.ForwardRef = c),
    (rt.Fragment = o),
    (rt.Lazy = b),
    (rt.Memo = p),
    (rt.Portal = t),
    (rt.Profiler = i),
    (rt.StrictMode = r),
    (rt.Suspense = u),
    (rt.SuspenseList = d),
    (rt.isAsyncMode = function () {
      return !1;
    }),
    (rt.isConcurrentMode = function () {
      return !1;
    }),
    (rt.isContextConsumer = function (f) {
      return h(f) === s;
    }),
    (rt.isContextProvider = function (f) {
      return h(f) === a;
    }),
    (rt.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === e;
    }),
    (rt.isForwardRef = function (f) {
      return h(f) === c;
    }),
    (rt.isFragment = function (f) {
      return h(f) === o;
    }),
    (rt.isLazy = function (f) {
      return h(f) === b;
    }),
    (rt.isMemo = function (f) {
      return h(f) === p;
    }),
    (rt.isPortal = function (f) {
      return h(f) === t;
    }),
    (rt.isProfiler = function (f) {
      return h(f) === i;
    }),
    (rt.isStrictMode = function (f) {
      return h(f) === r;
    }),
    (rt.isSuspense = function (f) {
      return h(f) === u;
    }),
    (rt.isSuspenseList = function (f) {
      return h(f) === d;
    }),
    (rt.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === o ||
        f === i ||
        f === r ||
        f === u ||
        f === d ||
        f === v ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === b ||
            f.$$typeof === p ||
            f.$$typeof === a ||
            f.$$typeof === s ||
            f.$$typeof === c ||
            f.$$typeof === g ||
            f.getModuleId !== void 0))
      );
    }),
    (rt.typeOf = h),
    rt
  );
}
var it = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xl;
function Vv() {
  return (
    Xl ||
      ((Xl = 1),
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
            v = Symbol.for('react.offscreen'),
            g = !1,
            h = !1,
            f = !1,
            T = !1,
            w = !1,
            E;
          E = Symbol.for('react.module.reference');
          function y(F) {
            return !!(
              typeof F == 'string' ||
              typeof F == 'function' ||
              F === o ||
              F === i ||
              w ||
              F === r ||
              F === u ||
              F === d ||
              T ||
              F === v ||
              g ||
              h ||
              f ||
              (typeof F == 'object' &&
                F !== null &&
                (F.$$typeof === b ||
                  F.$$typeof === p ||
                  F.$$typeof === a ||
                  F.$$typeof === s ||
                  F.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  F.$$typeof === E ||
                  F.getModuleId !== void 0))
            );
          }
          function m(F) {
            if (typeof F == 'object' && F !== null) {
              var G = F.$$typeof;
              switch (G) {
                case e:
                  var De = F.type;
                  switch (De) {
                    case o:
                    case i:
                    case r:
                    case u:
                    case d:
                      return De;
                    default:
                      var ge = De && De.$$typeof;
                      switch (ge) {
                        case l:
                        case s:
                        case c:
                        case b:
                        case p:
                        case a:
                          return ge;
                        default:
                          return G;
                      }
                  }
                case t:
                  return G;
              }
            }
          }
          var O = s,
            R = a,
            D = e,
            $ = c,
            N = o,
            k = b,
            j = p,
            z = t,
            P = i,
            V = r,
            B = u,
            Q = d,
            re = !1,
            Z = !1;
          function _(F) {
            return (
              re ||
                ((re = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function W(F) {
            return (
              Z ||
                ((Z = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function te(F) {
            return m(F) === s;
          }
          function H(F) {
            return m(F) === a;
          }
          function K(F) {
            return typeof F == 'object' && F !== null && F.$$typeof === e;
          }
          function ne(F) {
            return m(F) === c;
          }
          function ee(F) {
            return m(F) === o;
          }
          function oe(F) {
            return m(F) === b;
          }
          function le(F) {
            return m(F) === p;
          }
          function ue(F) {
            return m(F) === t;
          }
          function ye(F) {
            return m(F) === i;
          }
          function se(F) {
            return m(F) === r;
          }
          function L(F) {
            return m(F) === u;
          }
          function Te(F) {
            return m(F) === d;
          }
          (it.ContextConsumer = O),
            (it.ContextProvider = R),
            (it.Element = D),
            (it.ForwardRef = $),
            (it.Fragment = N),
            (it.Lazy = k),
            (it.Memo = j),
            (it.Portal = z),
            (it.Profiler = P),
            (it.StrictMode = V),
            (it.Suspense = B),
            (it.SuspenseList = Q),
            (it.isAsyncMode = _),
            (it.isConcurrentMode = W),
            (it.isContextConsumer = te),
            (it.isContextProvider = H),
            (it.isElement = K),
            (it.isForwardRef = ne),
            (it.isFragment = ee),
            (it.isLazy = oe),
            (it.isMemo = le),
            (it.isPortal = ue),
            (it.isProfiler = ye),
            (it.isStrictMode = se),
            (it.isSuspense = L),
            (it.isSuspenseList = Te),
            (it.isValidElementType = y),
            (it.typeOf = m);
        })()),
    it
  );
}
process.env.NODE_ENV === 'production' ? (xa.exports = jv()) : (xa.exports = Vv());
var is = xa.exports;
function Ea(e, t) {
  return (
    (Ea = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    Ea(e, t)
  );
}
function Du(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), Ea(e, t);
}
const Jl = {
  disabled: !1,
};
var Bv =
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
const ei = gn.createContext(null);
var Wv = function (t) {
    return t.scrollTop;
  },
  Ho = 'unmounted',
  Kn = 'exited',
  Yn = 'entering',
  mo = 'entered',
  Ca = 'exiting',
  Mn = /* @__PURE__ */ (function (e) {
    Du(t, e);
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
            ? ((c = Kn), (a.appearStatus = Yn))
            : (c = mo)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = Ho)
          : (c = Kn),
        (a.state = {
          status: c,
        }),
        (a.nextCallback = null),
        a
      );
    }
    t.getDerivedStateFromProps = function (i, a) {
      var s = i.in;
      return s && a.status === Ho
        ? {
            status: Kn,
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
          this.props.in ? s !== Yn && s !== mo && (a = Yn) : (s === Yn || s === mo) && (a = Ca);
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
          if ((this.cancelNextCallback(), a === Yn)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : Sr.findDOMNode(this);
              s && Wv(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === Kn &&
            this.setState({
              status: Ho,
            });
      }),
      (o.performEnter = function (i) {
        var a = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [l] : [Sr.findDOMNode(this), l],
          u = c[0],
          d = c[1],
          p = this.getTimeouts(),
          b = l ? p.appear : p.enter;
        if ((!i && !s) || Jl.disabled) {
          this.safeSetState(
            {
              status: mo,
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
              status: Yn,
            },
            function () {
              a.props.onEntering(u, d),
                a.onTransitionEnd(b, function () {
                  a.safeSetState(
                    {
                      status: mo,
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
          l = this.props.nodeRef ? void 0 : Sr.findDOMNode(this);
        if (!a || Jl.disabled) {
          this.safeSetState(
            {
              status: Kn,
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
              status: Ca,
            },
            function () {
              i.props.onExiting(l),
                i.onTransitionEnd(s.exit, function () {
                  i.safeSetState(
                    {
                      status: Kn,
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : Sr.findDOMNode(this),
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
        if (i === Ho) return null;
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
        var l = Se(a, [
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
          /* @__PURE__ */ gn.createElement(
            ei.Provider,
            {
              value: null,
            },
            typeof s == 'function' ? s(i, l) : gn.cloneElement(gn.Children.only(s), l),
          )
        );
      }),
      t
    );
  })(gn.Component);
Mn.contextType = ei;
Mn.propTypes =
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
          var o = Bv;
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
function uo() {}
Mn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: uo,
  onEntering: uo,
  onEntered: uo,
  onExit: uo,
  onExiting: uo,
  onExited: uo,
};
Mn.UNMOUNTED = Ho;
Mn.EXITED = Kn;
Mn.ENTERING = Yn;
Mn.ENTERED = mo;
Mn.EXITING = Ca;
const Lu = Mn;
function Uv(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function as(e, t) {
  var o = function (a) {
      return t && Ar(a) ? t(a) : a;
    },
    r = /* @__PURE__ */ Object.create(null);
  return (
    e &&
      Tp.map(e, function (i) {
        return i;
      }).forEach(function (i) {
        r[i.key] = o(i);
      }),
    r
  );
}
function Hv(e, t) {
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
function Xn(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function qv(e, t) {
  return as(e.children, function (o) {
    return Dr(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: Xn(o, 'appear', e),
      enter: Xn(o, 'enter', e),
      exit: Xn(o, 'exit', e),
    });
  });
}
function Kv(e, t, o) {
  var r = as(e.children),
    i = Hv(t, r);
  return (
    Object.keys(i).forEach(function (a) {
      var s = i[a];
      if (Ar(s)) {
        var l = a in t,
          c = a in r,
          u = t[a],
          d = Ar(u) && !u.props.in;
        c && (!l || d)
          ? (i[a] = Dr(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: Xn(s, 'exit', e),
              enter: Xn(s, 'enter', e),
            }))
          : !c && l && !d
          ? (i[a] = Dr(s, {
              in: !1,
            }))
          : c &&
            l &&
            Ar(u) &&
            (i[a] = Dr(s, {
              onExited: o.bind(null, s),
              in: u.props.in,
              exit: Xn(s, 'exit', e),
              enter: Xn(s, 'enter', e),
            }));
      }
    }),
    i
  );
}
var Yv =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  Gv = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  ss = /* @__PURE__ */ (function (e) {
    Du(t, e);
    function t(r, i) {
      var a;
      a = e.call(this, r, i) || this;
      var s = a.handleExited.bind(Uv(a));
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
          children: c ? qv(i, l) : Kv(i, s, l),
          firstRender: !1,
        };
      }),
      (o.handleExited = function (i, a) {
        var s = as(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(a),
          this.mounted &&
            this.setState(function (l) {
              var c = x({}, l.children);
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
          l = Se(i, ['component', 'childFactory']),
          c = this.state.contextValue,
          u = Yv(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          a === null
            ? /* @__PURE__ */ gn.createElement(
                ei.Provider,
                {
                  value: c,
                },
                u,
              )
            : /* @__PURE__ */ gn.createElement(
                ei.Provider,
                {
                  value: c,
                },
                /* @__PURE__ */ gn.createElement(a, l, u),
              )
        );
      }),
      t
    );
  })(gn.Component);
ss.propTypes =
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
ss.defaultProps = Gv;
const Xv = ss,
  Fu = (e) => e.scrollTop;
function ti(e, t) {
  var o, r;
  const { timeout: i, easing: a, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof i == 'number' ? i : i[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == 'object' ? a[t.mode] : a,
    delay: s.transitionDelay,
  };
}
function Jv(e) {
  return We('MuiPaper', e);
}
Ve('MuiPaper', [
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
const Zv = ['className', 'component', 'elevation', 'square', 'variant'],
  Qv = (e) => {
    const { square: t, elevation: o, variant: r, classes: i } = e,
      a = {
        root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`],
      };
    return Ye(a, Jv, i);
  },
  ey = be('div', {
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
    return x(
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
        x(
          {
            boxShadow: (e.vars || e).shadows[t.elevation],
          },
          !e.vars &&
            e.palette.mode === 'dark' && {
              backgroundImage: `linear-gradient(${st('#fff', Ol(t.elevation))}, ${st(
                '#fff',
                Ol(t.elevation),
              )})`,
            },
          e.vars && {
            backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation],
          },
        ),
    );
  }),
  zu = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
      u = Se(r, Zv),
      d = x({}, r, {
        component: a,
        elevation: s,
        square: l,
        variant: c,
      }),
      p = Qv(d);
    return (
      process.env.NODE_ENV !== 'production' &&
        No().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      /* @__PURE__ */ I(
        ey,
        x(
          {
            as: a,
            ownerState: d,
            className: xe(p.root, i),
            ref: o,
          },
          u,
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (zu.propTypes = {
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
    elevation: En(Ma, (e) => {
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
const mr = zu;
function ju(e) {
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
    [d, p] = C.useState(!1),
    b = xe(t, o.ripple, o.rippleVisible, r && o.ripplePulsate),
    v = {
      width: s,
      height: s,
      top: -(s / 2) + a,
      left: -(s / 2) + i,
    },
    g = xe(o.child, d && o.childLeaving, r && o.childPulsate);
  return (
    !l && !d && p(!0),
    C.useEffect(() => {
      if (!l && c != null) {
        const h = setTimeout(c, u);
        return () => {
          clearTimeout(h);
        };
      }
    }, [c, l, u]),
    /* @__PURE__ */ I('span', {
      className: b,
      style: v,
      children: /* @__PURE__ */ I('span', {
        className: g,
      }),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (ju.propTypes = {
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
const ty = Ve('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  an = ty,
  ny = ['center', 'classes', 'className'];
let Oi = (e) => e,
  Zl,
  Ql,
  ec,
  tc;
const wa = 550,
  oy = 80,
  ry = Ua(
    Zl ||
      (Zl = Oi`
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
  iy = Ua(
    Ql ||
      (Ql = Oi`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  ay = Ua(
    ec ||
      (ec = Oi`
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
  sy = be('span', {
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
  ly = be(ju, {
    name: 'MuiTouchRipple',
    slot: 'Ripple',
  })(
    tc ||
      (tc = Oi`
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
    an.rippleVisible,
    ry,
    wa,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    an.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    an.child,
    an.childLeaving,
    iy,
    wa,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    an.childPulsate,
    ay,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  Vu = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
        props: t,
        name: 'MuiTouchRipple',
      }),
      { center: i = !1, classes: a = {}, className: s } = r,
      l = Se(r, ny),
      [c, u] = C.useState([]),
      d = C.useRef(0),
      p = C.useRef(null);
    C.useEffect(() => {
      p.current && (p.current(), (p.current = null));
    }, [c]);
    const b = C.useRef(!1),
      v = C.useRef(null),
      g = C.useRef(null),
      h = C.useRef(null);
    C.useEffect(
      () => () => {
        clearTimeout(v.current);
      },
      [],
    );
    const f = C.useCallback(
        (y) => {
          const { pulsate: m, rippleX: O, rippleY: R, rippleSize: D, cb: $ } = y;
          u((N) => [
            ...N,
            /* @__PURE__ */ I(
              ly,
              {
                classes: {
                  ripple: xe(a.ripple, an.ripple),
                  rippleVisible: xe(a.rippleVisible, an.rippleVisible),
                  ripplePulsate: xe(a.ripplePulsate, an.ripplePulsate),
                  child: xe(a.child, an.child),
                  childLeaving: xe(a.childLeaving, an.childLeaving),
                  childPulsate: xe(a.childPulsate, an.childPulsate),
                },
                timeout: wa,
                pulsate: m,
                rippleX: O,
                rippleY: R,
                rippleSize: D,
              },
              d.current,
            ),
          ]),
            (d.current += 1),
            (p.current = $);
        },
        [a],
      ),
      T = C.useCallback(
        (y = {}, m = {}, O = () => {}) => {
          const {
            pulsate: R = !1,
            center: D = i || m.pulsate,
            fakeElement: $ = !1,
            // For test purposes
          } = m;
          if ((y == null ? void 0 : y.type) === 'mousedown' && b.current) {
            b.current = !1;
            return;
          }
          (y == null ? void 0 : y.type) === 'touchstart' && (b.current = !0);
          const N = $ ? null : h.current,
            k = N
              ? N.getBoundingClientRect()
              : {
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                };
          let j, z, P;
          if (
            D ||
            y === void 0 ||
            (y.clientX === 0 && y.clientY === 0) ||
            (!y.clientX && !y.touches)
          )
            (j = Math.round(k.width / 2)), (z = Math.round(k.height / 2));
          else {
            const { clientX: V, clientY: B } = y.touches && y.touches.length > 0 ? y.touches[0] : y;
            (j = Math.round(V - k.left)), (z = Math.round(B - k.top));
          }
          if (D) (P = Math.sqrt((2 * k.width ** 2 + k.height ** 2) / 3)), P % 2 === 0 && (P += 1);
          else {
            const V = Math.max(Math.abs((N ? N.clientWidth : 0) - j), j) * 2 + 2,
              B = Math.max(Math.abs((N ? N.clientHeight : 0) - z), z) * 2 + 2;
            P = Math.sqrt(V ** 2 + B ** 2);
          }
          y != null && y.touches
            ? g.current === null &&
              ((g.current = () => {
                f({
                  pulsate: R,
                  rippleX: j,
                  rippleY: z,
                  rippleSize: P,
                  cb: O,
                });
              }),
              (v.current = setTimeout(() => {
                g.current && (g.current(), (g.current = null));
              }, oy)))
            : f({
                pulsate: R,
                rippleX: j,
                rippleY: z,
                rippleSize: P,
                cb: O,
              });
        },
        [i, f],
      ),
      w = C.useCallback(() => {
        T(
          {},
          {
            pulsate: !0,
          },
        );
      }, [T]),
      E = C.useCallback((y, m) => {
        if ((clearTimeout(v.current), (y == null ? void 0 : y.type) === 'touchend' && g.current)) {
          g.current(),
            (g.current = null),
            (v.current = setTimeout(() => {
              E(y, m);
            }));
          return;
        }
        (g.current = null), u((O) => (O.length > 0 ? O.slice(1) : O)), (p.current = m);
      }, []);
    return (
      C.useImperativeHandle(
        o,
        () => ({
          pulsate: w,
          start: T,
          stop: E,
        }),
        [w, T, E],
      ),
      /* @__PURE__ */ I(
        sy,
        x(
          {
            className: xe(an.root, a.root, s),
            ref: h,
          },
          l,
          {
            children: /* @__PURE__ */ I(Xv, {
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
  (Vu.propTypes = {
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
const cy = Vu;
function uy(e) {
  return We('MuiButtonBase', e);
}
const dy = Ve('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  py = dy,
  fy = [
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
  my = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: i } = e,
      s = Ye(
        {
          root: ['root', t && 'disabled', o && 'focusVisible'],
        },
        uy,
        i,
      );
    return o && r && (s.root += ` ${r}`), s;
  },
  hy = be('button', {
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
    [`&.${py.disabled}`]: {
      pointerEvents: 'none',
      // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
  }),
  Bu = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
        LinkComponent: v = 'a',
        onBlur: g,
        onClick: h,
        onContextMenu: f,
        onDragLeave: T,
        onFocus: w,
        onFocusVisible: E,
        onKeyDown: y,
        onKeyUp: m,
        onMouseDown: O,
        onMouseLeave: R,
        onMouseUp: D,
        onTouchEnd: $,
        onTouchMove: N,
        onTouchStart: k,
        tabIndex: j = 0,
        TouchRippleProps: z,
        touchRippleRef: P,
        type: V,
      } = r,
      B = Se(r, fy),
      Q = C.useRef(null),
      re = C.useRef(null),
      Z = Rt(re, P),
      { isFocusVisibleRef: _, onFocus: W, onBlur: te, ref: H } = qc(),
      [K, ne] = C.useState(!1);
    u && K && ne(!1),
      C.useImperativeHandle(
        i,
        () => ({
          focusVisible: () => {
            ne(!0), Q.current.focus();
          },
        }),
        [],
      );
    const [ee, oe] = C.useState(!1);
    C.useEffect(() => {
      oe(!0);
    }, []);
    const le = ee && !d && !u;
    C.useEffect(() => {
      K && b && !d && ee && re.current.pulsate();
    }, [d, b, K, ee]);
    function ue(de, ae, Ee = p) {
      return Ft((we) => (ae && ae(we), !Ee && re.current && re.current[de](we), !0));
    }
    const ye = ue('start', O),
      se = ue('stop', f),
      L = ue('stop', T),
      Te = ue('stop', D),
      F = ue('stop', (de) => {
        K && de.preventDefault(), R && R(de);
      }),
      G = ue('start', k),
      De = ue('stop', $),
      ge = ue('stop', N),
      Le = ue(
        'stop',
        (de) => {
          te(de), _.current === !1 && ne(!1), g && g(de);
        },
        !1,
      ),
      Ue = Ft((de) => {
        Q.current || (Q.current = de.currentTarget),
          W(de),
          _.current === !0 && (ne(!0), E && E(de)),
          w && w(de);
      }),
      $e = () => {
        const de = Q.current;
        return c && c !== 'button' && !(de.tagName === 'A' && de.href);
      },
      Me = C.useRef(!1),
      ct = Ft((de) => {
        b &&
          !Me.current &&
          K &&
          re.current &&
          de.key === ' ' &&
          ((Me.current = !0),
          re.current.stop(de, () => {
            re.current.start(de);
          })),
          de.target === de.currentTarget && $e() && de.key === ' ' && de.preventDefault(),
          y && y(de),
          de.target === de.currentTarget &&
            $e() &&
            de.key === 'Enter' &&
            !u &&
            (de.preventDefault(), h && h(de));
      }),
      mt = Ft((de) => {
        b &&
          de.key === ' ' &&
          re.current &&
          K &&
          !de.defaultPrevented &&
          ((Me.current = !1),
          re.current.stop(de, () => {
            re.current.pulsate(de);
          })),
          m && m(de),
          h &&
            de.target === de.currentTarget &&
            $e() &&
            de.key === ' ' &&
            !de.defaultPrevented &&
            h(de);
      });
    let ie = c;
    ie === 'button' && (B.href || B.to) && (ie = v);
    const ve = {};
    ie === 'button'
      ? ((ve.type = V === void 0 ? 'button' : V), (ve.disabled = u))
      : (!B.href && !B.to && (ve.role = 'button'), u && (ve['aria-disabled'] = u));
    const Ce = Rt(o, H, Q);
    process.env.NODE_ENV !== 'production' &&
      C.useEffect(() => {
        le &&
          !re.current &&
          console.error(
            [
              'MUI: The `component` prop provided to ButtonBase is invalid.',
              'Please make sure the children prop is rendered in this custom component.',
            ].join(`
`),
          );
      }, [le]);
    const U = x({}, r, {
        centerRipple: a,
        component: c,
        disabled: u,
        disableRipple: d,
        disableTouchRipple: p,
        focusRipple: b,
        tabIndex: j,
        focusVisible: K,
      }),
      pe = my(U);
    return /* @__PURE__ */ Fe(
      hy,
      x(
        {
          as: ie,
          className: xe(pe.root, l),
          ownerState: U,
          onBlur: Le,
          onClick: h,
          onContextMenu: se,
          onFocus: Ue,
          onKeyDown: ct,
          onKeyUp: mt,
          onMouseDown: ye,
          onMouseLeave: F,
          onMouseUp: Te,
          onDragLeave: L,
          onTouchEnd: De,
          onTouchMove: ge,
          onTouchStart: G,
          ref: Ce,
          tabIndex: u ? -1 : j,
          type: V,
        },
        ve,
        B,
        {
          children: [
            s,
            le
              ? /* TouchRipple is only needed client-side, x2 boost on the server. */
                /* @__PURE__ */ I(
                  cy,
                  x(
                    {
                      ref: Z,
                      center: a,
                    },
                    z,
                  ),
                )
              : null,
          ],
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
     * A ref for imperative actions.
     * It currently only supports `focusVisible()` action.
     */
    action: Ht,
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
    component: Ia,
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
const So = Bu;
function by(e) {
  return We('MuiIconButton', e);
}
const gy = Ve('MuiIconButton', [
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
  vy = gy,
  yy = ['edge', 'children', 'className', 'color', 'disabled', 'disableFocusRipple', 'size'],
  xy = (e) => {
    const { classes: t, disabled: o, color: r, edge: i, size: a } = e,
      s = {
        root: [
          'root',
          o && 'disabled',
          r !== 'default' && `color${ce(r)}`,
          i && `edge${ce(i)}`,
          `size${ce(a)}`,
        ],
      };
    return Ye(s, by, t);
  },
  Ey = be(So, {
    name: 'MuiIconButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${ce(o.color)}`],
        o.edge && t[`edge${ce(o.edge)}`],
        t[`size${ce(o.size)}`],
      ];
    },
  })(
    ({ theme: e, ownerState: t }) =>
      x(
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
              : st(e.palette.action.active, e.palette.action.hoverOpacity),
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
      return x(
        {},
        t.color === 'inherit' && {
          color: 'inherit',
        },
        t.color !== 'inherit' &&
          t.color !== 'default' &&
          x(
            {
              color: r == null ? void 0 : r.main,
            },
            !t.disableRipple && {
              '&:hover': x(
                {},
                r && {
                  backgroundColor: e.vars
                    ? `rgba(${r.mainChannel} / ${e.vars.palette.action.hoverOpacity})`
                    : st(r.main, e.palette.action.hoverOpacity),
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
          [`&.${vy.disabled}`]: {
            backgroundColor: 'transparent',
            color: (e.vars || e).palette.action.disabled,
          },
        },
      );
    },
  ),
  Wu = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
      p = Se(r, yy),
      b = x({}, r, {
        edge: i,
        color: l,
        disabled: c,
        disableFocusRipple: u,
        size: d,
      }),
      v = xy(b);
    return /* @__PURE__ */ I(
      Ey,
      x(
        {
          className: xe(v.root, s),
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
  (Wu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The icon to display.
     */
    children: En(n.node, (e) =>
      C.Children.toArray(e.children).some(
        (o) => /* @__PURE__ */ C.isValidElement(o) && o.props.onClick,
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
const Uu = Wu,
  Cy = $o(
    /* @__PURE__ */ I('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  ),
  wy = ['components', 'componentsProps', 'slots', 'slotProps'],
  Ty = be(lv, {
    name: 'MuiPopper',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Hu = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r;
    const i = gu(),
      a = Xe({
        props: t,
        name: 'MuiPopper',
      }),
      { components: s, componentsProps: l, slots: c, slotProps: u } = a,
      d = Se(a, wy),
      p = (r = c == null ? void 0 : c.root) != null ? r : s == null ? void 0 : s.Root;
    return /* @__PURE__ */ I(
      Ty,
      x(
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
  (Hu.propTypes = {
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
    anchorEl: n.oneOfType([Nn, n.object, n.func]),
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
    container: n.oneOfType([Nn, n.func]),
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
    popperRef: Ht,
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
const qu = Hu;
function Sy(e) {
  return We('MuiListSubheader', e);
}
Ve('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const Ry = ['className', 'color', 'component', 'disableGutters', 'disableSticky', 'inset'],
  Oy = (e) => {
    const { classes: t, color: o, disableGutters: r, inset: i, disableSticky: a } = e,
      s = {
        root: [
          'root',
          o !== 'default' && `color${ce(o)}`,
          !r && 'gutters',
          i && 'inset',
          !a && 'sticky',
        ],
      };
    return Ye(s, Sy, t);
  },
  ky = be('li', {
    name: 'MuiListSubheader',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${ce(o.color)}`],
        !o.disableGutters && t.gutters,
        o.inset && t.inset,
        !o.disableSticky && t.sticky,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    x(
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
  ls = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
      d = Se(r, Ry),
      p = x({}, r, {
        color: a,
        component: s,
        disableGutters: l,
        disableSticky: c,
        inset: u,
      }),
      b = Oy(p);
    return /* @__PURE__ */ I(
      ky,
      x(
        {
          as: s,
          className: xe(b.root, i),
          ref: o,
          ownerState: p,
        },
        d,
      ),
    );
  });
ls.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (ls.propTypes = {
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
const Ny = ls,
  $y = $o(
    /* @__PURE__ */ I('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function Py(e) {
  return We('MuiChip', e);
}
const Iy = Ve('MuiChip', [
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
  Ke = Iy,
  _y = [
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
  My = (e) => {
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
          `size${ce(r)}`,
          `color${ce(i)}`,
          l && 'clickable',
          l && `clickableColor${ce(i)}`,
          s && 'deletable',
          s && `deletableColor${ce(i)}`,
          `${c}${ce(i)}`,
        ],
        label: ['label', `label${ce(r)}`],
        avatar: ['avatar', `avatar${ce(r)}`, `avatarColor${ce(i)}`],
        icon: ['icon', `icon${ce(r)}`, `iconColor${ce(a)}`],
        deleteIcon: [
          'deleteIcon',
          `deleteIcon${ce(r)}`,
          `deleteIconColor${ce(i)}`,
          `deleteIcon${ce(c)}Color${ce(i)}`,
        ],
      };
    return Ye(u, Py, t);
  },
  Ay = be('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: i, clickable: a, onDelete: s, size: l, variant: c } = o;
      return [
        {
          [`& .${Ke.avatar}`]: t.avatar,
        },
        {
          [`& .${Ke.avatar}`]: t[`avatar${ce(l)}`],
        },
        {
          [`& .${Ke.avatar}`]: t[`avatarColor${ce(r)}`],
        },
        {
          [`& .${Ke.icon}`]: t.icon,
        },
        {
          [`& .${Ke.icon}`]: t[`icon${ce(l)}`],
        },
        {
          [`& .${Ke.icon}`]: t[`iconColor${ce(i)}`],
        },
        {
          [`& .${Ke.deleteIcon}`]: t.deleteIcon,
        },
        {
          [`& .${Ke.deleteIcon}`]: t[`deleteIcon${ce(l)}`],
        },
        {
          [`& .${Ke.deleteIcon}`]: t[`deleteIconColor${ce(r)}`],
        },
        {
          [`& .${Ke.deleteIcon}`]: t[`deleteIcon${ce(c)}Color${ce(r)}`],
        },
        t.root,
        t[`size${ce(l)}`],
        t[`color${ce(r)}`],
        a && t.clickable,
        a && r !== 'default' && t[`clickableColor${ce(r)})`],
        s && t.deletable,
        s && r !== 'default' && t[`deletableColor${ce(r)}`],
        t[c],
        t[`${c}${ce(r)}`],
      ];
    },
  })(
    ({ theme: e, ownerState: t }) => {
      const o = st(e.palette.text.primary, 0.26),
        r = e.palette.mode === 'light' ? e.palette.grey[700] : e.palette.grey[300];
      return x(
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
          [`&.${Ke.disabled}`]: {
            opacity: (e.vars || e).palette.action.disabledOpacity,
            pointerEvents: 'none',
          },
          [`& .${Ke.avatar}`]: {
            marginLeft: 5,
            marginRight: -6,
            width: 24,
            height: 24,
            color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : r,
            fontSize: e.typography.pxToRem(12),
          },
          [`& .${Ke.avatarColorPrimary}`]: {
            color: (e.vars || e).palette.primary.contrastText,
            backgroundColor: (e.vars || e).palette.primary.dark,
          },
          [`& .${Ke.avatarColorSecondary}`]: {
            color: (e.vars || e).palette.secondary.contrastText,
            backgroundColor: (e.vars || e).palette.secondary.dark,
          },
          [`& .${Ke.avatarSmall}`]: {
            marginLeft: 4,
            marginRight: -4,
            width: 18,
            height: 18,
            fontSize: e.typography.pxToRem(10),
          },
          [`& .${Ke.icon}`]: x(
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
              x(
                {
                  color: e.vars ? e.vars.palette.Chip.defaultIconColor : r,
                },
                t.color !== 'default' && {
                  color: 'inherit',
                },
              ),
          ),
          [`& .${Ke.deleteIcon}`]: x(
            {
              WebkitTapHighlightColor: 'transparent',
              color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.26)` : o,
              fontSize: 22,
              cursor: 'pointer',
              margin: '0 5px 0 -6px',
              '&:hover': {
                color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.4)` : st(o, 0.4),
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
                : st(e.palette[t.color].contrastText, 0.7),
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
          [`&.${Ke.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : st(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        t.onDelete &&
          t.color !== 'default' && {
            [`&.${Ke.focusVisible}`]: {
              backgroundColor: (e.vars || e).palette[t.color].dark,
            },
          },
      );
    },
    ({ theme: e, ownerState: t }) =>
      x(
        {},
        t.clickable && {
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
              : st(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
                ),
          },
          [`&.${Ke.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : st(
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
            [`&:hover, &.${Ke.focusVisible}`]: {
              backgroundColor: (e.vars || e).palette[t.color].dark,
            },
          },
      ),
    ({ theme: e, ownerState: t }) =>
      x(
        {},
        t.variant === 'outlined' && {
          backgroundColor: 'transparent',
          border: e.vars
            ? `1px solid ${e.vars.palette.Chip.defaultBorder}`
            : `1px solid ${e.palette.mode === 'light' ? e.palette.grey[400] : e.palette.grey[700]}`,
          [`&.${Ke.clickable}:hover`]: {
            backgroundColor: (e.vars || e).palette.action.hover,
          },
          [`&.${Ke.focusVisible}`]: {
            backgroundColor: (e.vars || e).palette.action.focus,
          },
          [`& .${Ke.avatar}`]: {
            marginLeft: 4,
          },
          [`& .${Ke.avatarSmall}`]: {
            marginLeft: 2,
          },
          [`& .${Ke.icon}`]: {
            marginLeft: 4,
          },
          [`& .${Ke.iconSmall}`]: {
            marginLeft: 2,
          },
          [`& .${Ke.deleteIcon}`]: {
            marginRight: 5,
          },
          [`& .${Ke.deleteIconSmall}`]: {
            marginRight: 3,
          },
        },
        t.variant === 'outlined' &&
          t.color !== 'default' && {
            color: (e.vars || e).palette[t.color].main,
            border: `1px solid ${
              e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : st(e.palette[t.color].main, 0.7)
            }`,
            [`&.${Ke.clickable}:hover`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : st(e.palette[t.color].main, e.palette.action.hoverOpacity),
            },
            [`&.${Ke.focusVisible}`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.focusOpacity
                  })`
                : st(e.palette[t.color].main, e.palette.action.focusOpacity),
            },
            [`& .${Ke.deleteIcon}`]: {
              color: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : st(e.palette[t.color].main, 0.7),
              '&:hover, &:active': {
                color: (e.vars || e).palette[t.color].main,
              },
            },
          },
      ),
  ),
  Dy = be('span', {
    name: 'MuiChip',
    slot: 'Label',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { size: r } = o;
      return [t.label, t[`label${ce(r)}`]];
    },
  })(({ ownerState: e }) =>
    x(
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
function nc(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const Ku = /* @__PURE__ */ C.forwardRef(function (t, o) {
  const r = Xe({
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
      onClick: v,
      onDelete: g,
      onKeyDown: h,
      onKeyUp: f,
      size: T = 'medium',
      variant: w = 'filled',
      tabIndex: E,
      skipFocusWhenDisabled: y = !1,
    } = r,
    m = Se(r, _y),
    O = C.useRef(null),
    R = Rt(O, o),
    D = (Z) => {
      Z.stopPropagation(), g && g(Z);
    },
    $ = (Z) => {
      Z.currentTarget === Z.target && nc(Z) && Z.preventDefault(), h && h(Z);
    },
    N = (Z) => {
      Z.currentTarget === Z.target &&
        (g && nc(Z) ? g(Z) : Z.key === 'Escape' && O.current && O.current.blur()),
        f && f(Z);
    },
    k = s !== !1 && v ? !0 : s,
    j = k || g ? So : c || 'div',
    z = x({}, r, {
      component: j,
      disabled: d,
      size: T,
      color: l,
      iconColor: /* @__PURE__ */ (C.isValidElement(p) && p.props.color) || l,
      onDelete: !!g,
      clickable: k,
      variant: w,
    }),
    P = My(z),
    V =
      j === So
        ? x(
            {
              component: c || 'div',
              focusVisibleClassName: P.focusVisible,
            },
            g && {
              disableRipple: !0,
            },
          )
        : {};
  let B = null;
  g &&
    (B =
      u && /* @__PURE__ */ C.isValidElement(u)
        ? /* @__PURE__ */ C.cloneElement(u, {
            className: xe(u.props.className, P.deleteIcon),
            onClick: D,
          })
        : /* @__PURE__ */ I($y, {
            className: xe(P.deleteIcon),
            onClick: D,
          }));
  let Q = null;
  i &&
    /* @__PURE__ */ C.isValidElement(i) &&
    (Q = /* @__PURE__ */ C.cloneElement(i, {
      className: xe(P.avatar, i.props.className),
    }));
  let re = null;
  return (
    p &&
      /* @__PURE__ */ C.isValidElement(p) &&
      (re = /* @__PURE__ */ C.cloneElement(p, {
        className: xe(P.icon, p.props.className),
      })),
    process.env.NODE_ENV !== 'production' &&
      Q &&
      re &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    /* @__PURE__ */ Fe(
      Ay,
      x(
        {
          as: j,
          className: xe(P.root, a),
          disabled: k && d ? !0 : void 0,
          onClick: v,
          onKeyDown: $,
          onKeyUp: N,
          ref: R,
          tabIndex: y && d ? -1 : E,
          ownerState: z,
        },
        V,
        m,
        {
          children: [
            Q || re,
            /* @__PURE__ */ I(Dy, {
              className: xe(P.label),
              ownerState: z,
              children: b,
            }),
            B,
          ],
        },
      ),
    )
  );
});
process.env.NODE_ENV !== 'production' &&
  (Ku.propTypes = {
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
    children: af,
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
const Ly = Ku;
function Po({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, i) => ((r[i] = e[i]), o && typeof e[i] > 'u' && (r[i] = o[i]), r), {});
}
const Yu = /* @__PURE__ */ C.createContext(void 0);
process.env.NODE_ENV !== 'production' && (Yu.displayName = 'FormControlContext');
const cs = Yu;
function oo() {
  return C.useContext(cs);
}
function Gu(e) {
  return /* @__PURE__ */ I(
    du,
    x({}, e, {
      defaultTheme: wi,
    }),
  );
}
process.env.NODE_ENV !== 'production' &&
  (Gu.propTypes = {
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
function oc(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function us(e, t = !1) {
  return (
    e && ((oc(e.value) && e.value !== '') || (t && oc(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Fy(e) {
  return e.startAdornment;
}
function zy(e) {
  return We('MuiInputBase', e);
}
const jy = Ve('MuiInputBase', [
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
  Yt = jy,
  Vy = [
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
  ki = (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      o.formControl && t.formControl,
      o.startAdornment && t.adornedStart,
      o.endAdornment && t.adornedEnd,
      o.error && t.error,
      o.size === 'small' && t.sizeSmall,
      o.multiline && t.multiline,
      o.color && t[`color${ce(o.color)}`],
      o.fullWidth && t.fullWidth,
      o.hiddenLabel && t.hiddenLabel,
    ];
  },
  Ni = (e, t) => {
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
  By = (e) => {
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
        startAdornment: v,
        type: g,
      } = e,
      h = {
        root: [
          'root',
          `color${ce(o)}`,
          r && 'disabled',
          i && 'error',
          c && 'fullWidth',
          s && 'focused',
          l && 'formControl',
          b === 'small' && 'sizeSmall',
          d && 'multiline',
          v && 'adornedStart',
          a && 'adornedEnd',
          u && 'hiddenLabel',
          p && 'readOnly',
        ],
        input: [
          'input',
          r && 'disabled',
          g === 'search' && 'inputTypeSearch',
          d && 'inputMultiline',
          b === 'small' && 'inputSizeSmall',
          u && 'inputHiddenLabel',
          v && 'inputAdornedStart',
          a && 'inputAdornedEnd',
          p && 'readOnly',
        ],
      };
    return Ye(h, zy, t);
  },
  $i = be('div', {
    name: 'MuiInputBase',
    slot: 'Root',
    overridesResolver: ki,
  })(({ theme: e, ownerState: t }) =>
    x(
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
        [`&.${Yt.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
          cursor: 'default',
        },
      },
      t.multiline &&
        x(
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
  Pi = be('input', {
    name: 'MuiInputBase',
    slot: 'Input',
    overridesResolver: Ni,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light',
      r = x(
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
    return x(
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
        [`label[data-shrink=false] + .${Yt.formControl} &`]: {
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
        [`&.${Yt.disabled}`]: {
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
  Wy = /* @__PURE__ */ I(Gu, {
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
  Xu = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r;
    const i = Xe({
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
        disableInjectingGlobalStyles: v,
        endAdornment: g,
        fullWidth: h = !1,
        id: f,
        inputComponent: T = 'input',
        inputProps: w = {},
        inputRef: E,
        maxRows: y,
        minRows: m,
        multiline: O = !1,
        name: R,
        onBlur: D,
        onChange: $,
        onClick: N,
        onFocus: k,
        onKeyDown: j,
        onKeyUp: z,
        placeholder: P,
        readOnly: V,
        renderSuffix: B,
        rows: Q,
        slotProps: re = {},
        slots: Z = {},
        startAdornment: _,
        type: W = 'text',
        value: te,
      } = i,
      H = Se(i, Vy),
      K = w.value != null ? w.value : te,
      { current: ne } = C.useRef(K != null),
      ee = C.useRef(),
      oe = C.useCallback((pe) => {
        process.env.NODE_ENV !== 'production' &&
          pe &&
          pe.nodeName !== 'INPUT' &&
          !pe.focus &&
          console.error(
            [
              'MUI: You have provided a `inputComponent` to the input component',
              'that does not correctly handle the `ref` prop.',
              'Make sure the `ref` prop is called with a HTMLInputElement.',
            ].join(`
`),
          );
      }, []),
      le = Rt(ee, E, w.ref, oe),
      [ue, ye] = C.useState(!1),
      se = oo();
    process.env.NODE_ENV !== 'production' &&
      C.useEffect(() => {
        if (se) return se.registerEffect();
      }, [se]);
    const L = Po({
      props: i,
      muiFormControl: se,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (L.focused = se ? se.focused : ue),
      C.useEffect(() => {
        !se && b && ue && (ye(!1), D && D());
      }, [se, b, ue, D]);
    const Te = se && se.onFilled,
      F = se && se.onEmpty,
      G = C.useCallback(
        (pe) => {
          us(pe) ? Te && Te() : F && F();
        },
        [Te, F],
      );
    $n(() => {
      ne &&
        G({
          value: K,
        });
    }, [K, G, ne]);
    const De = (pe) => {
        if (L.disabled) {
          pe.stopPropagation();
          return;
        }
        k && k(pe), w.onFocus && w.onFocus(pe), se && se.onFocus ? se.onFocus(pe) : ye(!0);
      },
      ge = (pe) => {
        D && D(pe), w.onBlur && w.onBlur(pe), se && se.onBlur ? se.onBlur(pe) : ye(!1);
      },
      Le = (pe, ...de) => {
        if (!ne) {
          const ae = pe.target || ee.current;
          if (ae == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : Wn(1),
            );
          G({
            value: ae.value,
          });
        }
        w.onChange && w.onChange(pe, ...de), $ && $(pe, ...de);
      };
    C.useEffect(() => {
      G(ee.current);
    }, []);
    const Ue = (pe) => {
      ee.current && pe.currentTarget === pe.target && ee.current.focus(), N && N(pe);
    };
    let $e = T,
      Me = w;
    O &&
      $e === 'input' &&
      (Q
        ? (process.env.NODE_ENV !== 'production' &&
            (m || y) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (Me = x(
            {
              type: void 0,
              minRows: Q,
              maxRows: Q,
            },
            Me,
          )))
        : (Me = x(
            {
              type: void 0,
              maxRows: y,
              minRows: m,
            },
            Me,
          )),
      ($e = Pv));
    const ct = (pe) => {
      G(
        pe.animationName === 'mui-auto-fill-cancel'
          ? ee.current
          : {
              value: 'x',
            },
      );
    };
    C.useEffect(() => {
      se && se.setAdornedStart(!!_);
    }, [se, _]);
    const mt = x({}, i, {
        color: L.color || 'primary',
        disabled: L.disabled,
        endAdornment: g,
        error: L.error,
        focused: L.focused,
        formControl: se,
        fullWidth: h,
        hiddenLabel: L.hiddenLabel,
        multiline: O,
        size: L.size,
        startAdornment: _,
        type: W,
      }),
      ie = By(mt),
      ve = Z.root || u.Root || $i,
      Ce = re.root || d.root || {},
      U = Z.input || u.Input || Pi;
    return (
      (Me = x({}, Me, (r = re.input) != null ? r : d.input)),
      /* @__PURE__ */ Fe(C.Fragment, {
        children: [
          !v && Wy,
          /* @__PURE__ */ Fe(
            ve,
            x(
              {},
              Ce,
              !Vn(ve) && {
                ownerState: x({}, mt, Ce.ownerState),
              },
              {
                ref: o,
                onClick: Ue,
              },
              H,
              {
                className: xe(ie.root, Ce.className, c, V && 'MuiInputBase-readOnly'),
                children: [
                  _,
                  /* @__PURE__ */ I(cs.Provider, {
                    value: null,
                    children: /* @__PURE__ */ I(
                      U,
                      x(
                        {
                          ownerState: mt,
                          'aria-invalid': L.error,
                          'aria-describedby': a,
                          autoComplete: s,
                          autoFocus: l,
                          defaultValue: p,
                          disabled: L.disabled,
                          id: f,
                          onAnimationStart: ct,
                          name: R,
                          placeholder: P,
                          readOnly: V,
                          required: L.required,
                          rows: Q,
                          value: K,
                          onKeyDown: j,
                          onKeyUp: z,
                          type: W,
                        },
                        Me,
                        !Vn(U) && {
                          as: $e,
                          ownerState: x({}, mt, Me.ownerState),
                        },
                        {
                          ref: le,
                          className: xe(ie.input, Me.className, V && 'MuiInputBase-readOnly'),
                          onBlur: ge,
                          onChange: Le,
                          onFocus: De,
                        },
                      ),
                    ),
                  }),
                  g,
                  B
                    ? B(
                        x({}, L, {
                          startAdornment: _,
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
  (Xu.propTypes = {
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
    inputComponent: Ia,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * @default {}
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: Ht,
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
const ds = Xu;
function Uy(e) {
  return We('MuiInput', e);
}
const Hy = x({}, Yt, Ve('MuiInput', ['root', 'underline', 'input'])),
  zn = Hy;
function qy(e) {
  return We('MuiOutlinedInput', e);
}
const Ky = x({}, Yt, Ve('MuiOutlinedInput', ['root', 'notchedOutline', 'input'])),
  Sn = Ky;
function Yy(e) {
  return We('MuiFilledInput', e);
}
const Gy = x({}, Yt, Ve('MuiFilledInput', ['root', 'underline', 'input'])),
  Gt = Gy,
  Ju = $o(
    /* @__PURE__ */ I('path', {
      d: 'M7 10l5 5 5-5z',
    }),
    'ArrowDropDown',
  );
function Xy(e) {
  return We('MuiAutocomplete', e);
}
const Jy = Ve('MuiAutocomplete', [
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
  ze = Jy;
var rc, ic;
const Zy = [
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
  Qy = (e) => {
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
        tag: ['tag', `tagSize${ce(d)}`],
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
    return Ye(p, Xy, t);
  },
  e0 = be('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: i, hasPopupIcon: a, inputFocused: s, size: l } = o;
      return [
        {
          [`& .${ze.tag}`]: t.tag,
        },
        {
          [`& .${ze.tag}`]: t[`tagSize${ce(l)}`],
        },
        {
          [`& .${ze.inputRoot}`]: t.inputRoot,
        },
        {
          [`& .${ze.input}`]: t.input,
        },
        {
          [`& .${ze.input}`]: s && t.inputFocused,
        },
        t.root,
        r && t.fullWidth,
        a && t.hasPopupIcon,
        i && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) =>
    x(
      {
        [`&.${ze.focused} .${ze.clearIndicator}`]: {
          visibility: 'visible',
        },
        /* Avoid double tap issue on iOS */
        '@media (pointer: fine)': {
          [`&:hover .${ze.clearIndicator}`]: {
            visibility: 'visible',
          },
        },
      },
      e.fullWidth && {
        width: '100%',
      },
      {
        [`& .${ze.tag}`]: x(
          {
            margin: 3,
            maxWidth: 'calc(100% - 6px)',
          },
          e.size === 'small' && {
            margin: 2,
            maxWidth: 'calc(100% - 4px)',
          },
        ),
        [`& .${ze.inputRoot}`]: {
          flexWrap: 'wrap',
          [`.${ze.hasPopupIcon}&, .${ze.hasClearIcon}&`]: {
            paddingRight: 26 + 4,
          },
          [`.${ze.hasPopupIcon}.${ze.hasClearIcon}&`]: {
            paddingRight: 52 + 4,
          },
          [`& .${ze.input}`]: {
            width: 0,
            minWidth: 30,
          },
        },
        [`& .${zn.root}`]: {
          paddingBottom: 1,
          '& .MuiInput-input': {
            padding: '4px 4px 4px 0px',
          },
        },
        [`& .${zn.root}.${Yt.sizeSmall}`]: {
          [`& .${zn.input}`]: {
            padding: '2px 4px 3px 0',
          },
        },
        [`& .${Sn.root}`]: {
          padding: 9,
          [`.${ze.hasPopupIcon}&, .${ze.hasClearIcon}&`]: {
            paddingRight: 26 + 4 + 9,
          },
          [`.${ze.hasPopupIcon}.${ze.hasClearIcon}&`]: {
            paddingRight: 52 + 4 + 9,
          },
          [`& .${ze.input}`]: {
            padding: '7.5px 4px 7.5px 6px',
          },
          [`& .${ze.endAdornment}`]: {
            right: 9,
          },
        },
        [`& .${Sn.root}.${Yt.sizeSmall}`]: {
          // Don't specify paddingRight, as it overrides the default value set when there is only
          // one of the popup or clear icon as the specificity is equal so the latter one wins
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 6,
          [`& .${ze.input}`]: {
            padding: '2.5px 4px 2.5px 6px',
          },
        },
        [`& .${Gt.root}`]: {
          paddingTop: 19,
          paddingLeft: 8,
          [`.${ze.hasPopupIcon}&, .${ze.hasClearIcon}&`]: {
            paddingRight: 26 + 4 + 9,
          },
          [`.${ze.hasPopupIcon}.${ze.hasClearIcon}&`]: {
            paddingRight: 52 + 4 + 9,
          },
          [`& .${Gt.input}`]: {
            padding: '7px 4px',
          },
          [`& .${ze.endAdornment}`]: {
            right: 9,
          },
        },
        [`& .${Gt.root}.${Yt.sizeSmall}`]: {
          paddingBottom: 1,
          [`& .${Gt.input}`]: {
            padding: '2.5px 4px',
          },
        },
        [`& .${Yt.hiddenLabel}`]: {
          paddingTop: 8,
        },
        [`& .${Gt.root}.${Yt.hiddenLabel}`]: {
          paddingTop: 0,
          paddingBottom: 0,
          [`& .${ze.input}`]: {
            paddingTop: 16,
            paddingBottom: 17,
          },
        },
        [`& .${Gt.root}.${Yt.hiddenLabel}.${Yt.sizeSmall}`]: {
          [`& .${ze.input}`]: {
            paddingTop: 8,
            paddingBottom: 9,
          },
        },
        [`& .${ze.input}`]: x(
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
  t0 = be('div', {
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
  n0 = be(Uu, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({
    marginRight: -2,
    padding: 4,
    visibility: 'hidden',
  }),
  o0 = be(Uu, {
    name: 'MuiAutocomplete',
    slot: 'PopupIndicator',
    overridesResolver: ({ ownerState: e }, t) =>
      x({}, t.popupIndicator, e.popupOpen && t.popupIndicatorOpen),
  })(({ ownerState: e }) =>
    x(
      {
        padding: 2,
        marginRight: -2,
      },
      e.popupOpen && {
        transform: 'rotate(180deg)',
      },
    ),
  ),
  r0 = be(qu, {
    name: 'MuiAutocomplete',
    slot: 'Popper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${ze.option}`]: t.option,
        },
        t.popper,
        o.disablePortal && t.popperDisablePortal,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    x(
      {
        zIndex: (e.vars || e).zIndex.modal,
      },
      t.disablePortal && {
        position: 'absolute',
      },
    ),
  ),
  i0 = be(mr, {
    name: 'MuiAutocomplete',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })(({ theme: e }) =>
    x({}, e.typography.body1, {
      overflow: 'auto',
    }),
  ),
  a0 = be('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  s0 = be('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  l0 = be('div', {
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
    [`& .${ze.option}`]: {
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
      [`&.${ze.focused}`]: {
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
      [`&.${ze.focusVisible}`]: {
        backgroundColor: (e.vars || e).palette.action.focus,
      },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : st(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${ze.focused}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : st(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: (e.vars || e).palette.action.selected,
          },
        },
        [`&.${ze.focusVisible}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
            : st(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
              ),
        },
      },
    },
  })),
  c0 = be(Ny, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({
    backgroundColor: (e.vars || e).palette.background.paper,
    top: -8,
  })),
  u0 = be('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({
    padding: 0,
    [`& .${ze.option}`]: {
      paddingLeft: 24,
    },
  }),
  Zu = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Xe({
        props: t,
        name: 'MuiAutocomplete',
      }),
      {
        autoComplete: c = !1,
        autoHighlight: u = !1,
        autoSelect: d = !1,
        blurOnSelect: p = !1,
        ChipProps: b,
        className: v,
        clearIcon: g = rc ||
          (rc = /* @__PURE__ */ I(Cy, {
            fontSize: 'small',
          })),
        clearOnBlur: h = !l.freeSolo,
        clearOnEscape: f = !1,
        clearText: T = 'Clear',
        closeText: w = 'Close',
        componentsProps: E = {},
        defaultValue: y = l.multiple ? [] : null,
        disableClearable: m = !1,
        disableCloseOnSelect: O = !1,
        disabled: R = !1,
        disabledItemsFocusable: D = !1,
        disableListWrap: $ = !1,
        disablePortal: N = !1,
        filterSelectedOptions: k = !1,
        forcePopupIcon: j = 'auto',
        freeSolo: z = !1,
        fullWidth: P = !1,
        getLimitTagsText: V = (je) => `+${je}`,
        getOptionLabel: B = (je) => {
          var vt;
          return (vt = je.label) != null ? vt : je;
        },
        groupBy: Q,
        handleHomeEndKeys: re = !l.freeSolo,
        includeInputInList: Z = !1,
        limitTags: _ = -1,
        ListboxComponent: W = 'ul',
        ListboxProps: te,
        loading: H = !1,
        loadingText: K = 'Loading…',
        multiple: ne = !1,
        noOptionsText: ee = 'No options',
        openOnFocus: oe = !1,
        openText: le = 'Open',
        PaperComponent: ue = mr,
        PopperComponent: ye = qu,
        popupIcon: se = ic || (ic = /* @__PURE__ */ I(Ju, {})),
        readOnly: L = !1,
        renderGroup: Te,
        renderInput: F,
        renderOption: G,
        renderTags: De,
        selectOnFocus: ge = !l.freeSolo,
        size: Le = 'medium',
        slotProps: Ue = {},
      } = l,
      $e = Se(l, Zy),
      {
        getRootProps: Me,
        getInputProps: ct,
        getInputLabelProps: mt,
        getPopupIndicatorProps: ie,
        getClearProps: ve,
        getTagProps: Ce,
        getListboxProps: U,
        getOptionProps: pe,
        value: de,
        dirty: ae,
        expanded: Ee,
        id: we,
        popupOpen: Ae,
        focused: ht,
        focusedTag: ut,
        anchorEl: Pt,
        setAnchorEl: Qt,
        inputValue: It,
        groupedOptions: Tt,
      } = Av(
        x({}, l, {
          componentName: 'Autocomplete',
        }),
      ),
      St = !m && !R && ae && !L,
      gt = (!z || j === !0) && j !== !1,
      Be = x({}, l, {
        disablePortal: N,
        expanded: Ee,
        focused: ht,
        fullWidth: P,
        hasClearIcon: St,
        hasPopupIcon: gt,
        inputFocused: ut === -1,
        popupOpen: Ae,
        size: Le,
      }),
      dt = Qy(Be);
    let xt;
    if (ne && de.length > 0) {
      const je = (vt) =>
        x(
          {
            className: dt.tag,
            disabled: R,
          },
          Ce(vt),
        );
      De
        ? (xt = De(de, je, Be))
        : (xt = de.map((vt, Vt) =>
            /* @__PURE__ */ I(
              Ly,
              x(
                {
                  label: B(vt),
                  size: Le,
                },
                je({
                  index: Vt,
                }),
                b,
              ),
            ),
          ));
    }
    if (_ > -1 && Array.isArray(xt)) {
      const je = xt.length - _;
      !ht &&
        je > 0 &&
        ((xt = xt.splice(0, _)),
        xt.push(
          /* @__PURE__ */ I(
            'span',
            {
              className: dt.tag,
              children: V(je),
            },
            xt.length,
          ),
        ));
    }
    const At =
        Te ||
        ((je) =>
          /* @__PURE__ */ Fe(
            'li',
            {
              children: [
                /* @__PURE__ */ I(c0, {
                  className: dt.groupLabel,
                  ownerState: Be,
                  component: 'div',
                  children: je.group,
                }),
                /* @__PURE__ */ I(u0, {
                  className: dt.groupUl,
                  ownerState: Be,
                  children: je.children,
                }),
              ],
            },
            je.key,
          )),
      zt =
        G ||
        ((je, vt) =>
          /* @__PURE__ */ I(
            'li',
            x({}, je, {
              children: B(vt),
            }),
          )),
      nn = (je, vt) => {
        const Vt = pe({
          option: je,
          index: vt,
        });
        return zt(
          x({}, Vt, {
            className: dt.option,
          }),
          je,
          {
            selected: Vt['aria-selected'],
            index: vt,
            inputValue: It,
          },
        );
      },
      pn = (r = Ue.clearIndicator) != null ? r : E.clearIndicator,
      fn = (i = Ue.paper) != null ? i : E.paper,
      ft = (a = Ue.popper) != null ? a : E.popper,
      on = (s = Ue.popupIndicator) != null ? s : E.popupIndicator;
    return /* @__PURE__ */ Fe(C.Fragment, {
      children: [
        /* @__PURE__ */ I(
          e0,
          x(
            {
              ref: o,
              className: xe(dt.root, v),
              ownerState: Be,
            },
            Me($e),
            {
              children: F({
                id: we,
                disabled: R,
                fullWidth: !0,
                size: Le === 'small' ? 'small' : void 0,
                InputLabelProps: mt(),
                InputProps: x(
                  {
                    ref: Qt,
                    className: dt.inputRoot,
                    startAdornment: xt,
                  },
                  (St || gt) && {
                    endAdornment: /* @__PURE__ */ Fe(t0, {
                      className: dt.endAdornment,
                      ownerState: Be,
                      children: [
                        St
                          ? /* @__PURE__ */ I(
                              n0,
                              x(
                                {},
                                ve(),
                                {
                                  'aria-label': T,
                                  title: T,
                                  ownerState: Be,
                                },
                                pn,
                                {
                                  className: xe(
                                    dt.clearIndicator,
                                    pn == null ? void 0 : pn.className,
                                  ),
                                  children: g,
                                },
                              ),
                            )
                          : null,
                        gt
                          ? /* @__PURE__ */ I(
                              o0,
                              x(
                                {},
                                ie(),
                                {
                                  disabled: R,
                                  'aria-label': Ae ? w : le,
                                  title: Ae ? w : le,
                                  ownerState: Be,
                                },
                                on,
                                {
                                  className: xe(
                                    dt.popupIndicator,
                                    on == null ? void 0 : on.className,
                                  ),
                                  children: se,
                                },
                              ),
                            )
                          : null,
                      ],
                    }),
                  },
                ),
                inputProps: x(
                  {
                    className: dt.input,
                    disabled: R,
                    readOnly: L,
                  },
                  ct(),
                ),
              }),
            },
          ),
        ),
        Pt
          ? /* @__PURE__ */ I(
              r0,
              x(
                {
                  as: ye,
                  disablePortal: N,
                  style: {
                    width: Pt ? Pt.clientWidth : null,
                  },
                  ownerState: Be,
                  role: 'presentation',
                  anchorEl: Pt,
                  open: Ae,
                },
                ft,
                {
                  className: xe(dt.popper, ft == null ? void 0 : ft.className),
                  children: /* @__PURE__ */ Fe(
                    i0,
                    x(
                      {
                        ownerState: Be,
                        as: ue,
                      },
                      fn,
                      {
                        className: xe(dt.paper, fn == null ? void 0 : fn.className),
                        children: [
                          H && Tt.length === 0
                            ? /* @__PURE__ */ I(a0, {
                                className: dt.loading,
                                ownerState: Be,
                                children: K,
                              })
                            : null,
                          Tt.length === 0 && !z && !H
                            ? /* @__PURE__ */ I(s0, {
                                className: dt.noOptions,
                                ownerState: Be,
                                role: 'presentation',
                                onMouseDown: (je) => {
                                  je.preventDefault();
                                },
                                children: ee,
                              })
                            : null,
                          Tt.length > 0
                            ? /* @__PURE__ */ I(
                                l0,
                                x(
                                  {
                                    as: W,
                                    className: dt.listbox,
                                    ownerState: Be,
                                  },
                                  U(),
                                  te,
                                  {
                                    children: Tt.map((je, vt) =>
                                      Q
                                        ? At({
                                            key: je.key,
                                            group: je.group,
                                            children: je.options.map((Vt, S) =>
                                              nn(Vt, je.index + S),
                                            ),
                                          })
                                        : nn(je, vt),
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
  (Zu.propTypes = {
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
    defaultValue: En(n.any, (e) =>
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
    limitTags: Ma,
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
    value: En(n.any, (e) =>
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
const d0 = Zu,
  p0 = [
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
  f0 = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
  },
  Qu = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = No(),
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
        onExit: v,
        onExited: g,
        onExiting: h,
        style: f,
        timeout: T = i,
        // eslint-disable-next-line react/prop-types
        TransitionComponent: w = Lu,
      } = t,
      E = Se(t, p0),
      y = C.useRef(null),
      m = Rt(y, l.ref, o),
      O = (P) => (V) => {
        if (P) {
          const B = y.current;
          V === void 0 ? P(B) : P(B, V);
        }
      },
      R = O(b),
      D = O((P, V) => {
        Fu(P);
        const B = ti(
          {
            style: f,
            timeout: T,
            easing: c,
          },
          {
            mode: 'enter',
          },
        );
        (P.style.webkitTransition = r.transitions.create('opacity', B)),
          (P.style.transition = r.transitions.create('opacity', B)),
          d && d(P, V);
      }),
      $ = O(p),
      N = O(h),
      k = O((P) => {
        const V = ti(
          {
            style: f,
            timeout: T,
            easing: c,
          },
          {
            mode: 'exit',
          },
        );
        (P.style.webkitTransition = r.transitions.create('opacity', V)),
          (P.style.transition = r.transitions.create('opacity', V)),
          v && v(P);
      }),
      j = O(g);
    return /* @__PURE__ */ I(
      w,
      x(
        {
          appear: s,
          in: u,
          nodeRef: y,
          onEnter: D,
          onEntered: $,
          onEntering: R,
          onExit: k,
          onExited: j,
          onExiting: N,
          addEndListener: (P) => {
            a && a(y.current, P);
          },
          timeout: T,
        },
        E,
        {
          children: (P, V) =>
            /* @__PURE__ */ C.cloneElement(
              l,
              x(
                {
                  style: x(
                    {
                      opacity: 0,
                      visibility: P === 'exited' && !u ? 'hidden' : void 0,
                    },
                    f0[P],
                    f,
                    l.props.style,
                  ),
                  ref: m,
                },
                V,
              ),
            ),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Qu.propTypes = {
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
    children: Oo.isRequired,
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
const m0 = Qu;
function h0(e) {
  return We('MuiBackdrop', e);
}
Ve('MuiBackdrop', ['root', 'invisible']);
const b0 = [
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
  g0 = (e) => {
    const { classes: t, invisible: o } = e;
    return Ye(
      {
        root: ['root', o && 'invisible'],
      },
      h0,
      t,
    );
  },
  v0 = be('div', {
    name: 'MuiBackdrop',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.invisible && t.invisible];
    },
  })(({ ownerState: e }) =>
    x(
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
  ed = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r, i, a;
    const s = Xe({
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
        open: v,
        slotProps: g = {},
        slots: h = {},
        TransitionComponent: f = m0,
        transitionDuration: T,
      } = s,
      w = Se(s, b0),
      E = x({}, s, {
        component: u,
        invisible: b,
      }),
      y = g0(E),
      m = (r = g.root) != null ? r : p.root;
    return /* @__PURE__ */ I(
      f,
      x(
        {
          in: v,
          timeout: T,
        },
        w,
        {
          children: /* @__PURE__ */ I(
            v0,
            x(
              {
                'aria-hidden': !0,
              },
              m,
              {
                as: (i = (a = h.root) != null ? a : d.Root) != null ? i : u,
                className: xe(y.root, c, m == null ? void 0 : m.className),
                ownerState: x({}, E, m == null ? void 0 : m.ownerState),
                classes: y,
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
  (ed.propTypes = {
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
const y0 = ed;
function x0(e) {
  return We('MuiButton', e);
}
const E0 = Ve('MuiButton', [
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
  _r = E0,
  td = /* @__PURE__ */ C.createContext({});
process.env.NODE_ENV !== 'production' && (td.displayName = 'ButtonGroupContext');
const C0 = td,
  w0 = [
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
  T0 = (e) => {
    const { color: t, disableElevation: o, fullWidth: r, size: i, variant: a, classes: s } = e,
      l = {
        root: [
          'root',
          a,
          `${a}${ce(t)}`,
          `size${ce(i)}`,
          `${a}Size${ce(i)}`,
          t === 'inherit' && 'colorInherit',
          o && 'disableElevation',
          r && 'fullWidth',
        ],
        label: ['label'],
        startIcon: ['startIcon', `iconSize${ce(i)}`],
        endIcon: ['endIcon', `iconSize${ce(i)}`],
      },
      c = Ye(l, x0, s);
    return x({}, s, c);
  },
  nd = (e) =>
    x(
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
  S0 = be(So, {
    shouldForwardProp: (e) => wn(e) || e === 'classes',
    name: 'MuiButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[o.variant],
        t[`${o.variant}${ce(o.color)}`],
        t[`size${ce(o.size)}`],
        t[`${o.variant}Size${ce(o.size)}`],
        o.color === 'inherit' && t.colorInherit,
        o.disableElevation && t.disableElevation,
        o.fullWidth && t.fullWidth,
      ];
    },
  })(
    ({ theme: e, ownerState: t }) => {
      var o, r;
      return x(
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
          '&:hover': x(
            {
              textDecoration: 'none',
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
                : st(e.palette.text.primary, e.palette.action.hoverOpacity),
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
                  : st(e.palette[t.color].main, e.palette.action.hoverOpacity),
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
                  : st(e.palette[t.color].main, e.palette.action.hoverOpacity),
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
          '&:active': x(
            {},
            t.variant === 'contained' && {
              boxShadow: (e.vars || e).shadows[8],
            },
          ),
          [`&.${_r.focusVisible}`]: x(
            {},
            t.variant === 'contained' && {
              boxShadow: (e.vars || e).shadows[6],
            },
          ),
          [`&.${_r.disabled}`]: x(
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
              : `1px solid ${st(e.palette[t.color].main, 0.5)}`,
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
        [`&.${_r.focusVisible}`]: {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        [`&.${_r.disabled}`]: {
          boxShadow: 'none',
        },
      },
  ),
  R0 = be('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${ce(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    x(
      {
        display: 'inherit',
        marginRight: 8,
        marginLeft: -4,
      },
      e.size === 'small' && {
        marginLeft: -2,
      },
      nd(e),
    ),
  ),
  O0 = be('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${ce(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    x(
      {
        display: 'inherit',
        marginRight: -4,
        marginLeft: 8,
      },
      e.size === 'small' && {
        marginRight: -2,
      },
      nd(e),
    ),
  ),
  od = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = C.useContext(C0),
      i = Aa(r, t),
      a = Xe({
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
        endIcon: v,
        focusVisibleClassName: g,
        fullWidth: h = !1,
        size: f = 'medium',
        startIcon: T,
        type: w,
        variant: E = 'text',
      } = a,
      y = Se(a, w0),
      m = x({}, a, {
        color: l,
        component: c,
        disabled: d,
        disableElevation: p,
        disableFocusRipple: b,
        fullWidth: h,
        size: f,
        type: w,
        variant: E,
      }),
      O = T0(m),
      R =
        T &&
        /* @__PURE__ */ I(R0, {
          className: O.startIcon,
          ownerState: m,
          children: T,
        }),
      D =
        v &&
        /* @__PURE__ */ I(O0, {
          className: O.endIcon,
          ownerState: m,
          children: v,
        });
    return /* @__PURE__ */ Fe(
      S0,
      x(
        {
          ownerState: m,
          className: xe(r.className, O.root, u),
          component: c,
          disabled: d,
          focusRipple: !b,
          focusVisibleClassName: xe(O.focusVisible, g),
          ref: o,
          type: w,
        },
        y,
        {
          classes: O,
          children: [R, s, D],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (od.propTypes = {
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
const k0 = od;
function N0(e) {
  return We('PrivateSwitchBase', e);
}
Ve('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const $0 = [
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
  P0 = (e) => {
    const { classes: t, checked: o, disabled: r, edge: i } = e,
      a = {
        root: ['root', o && 'checked', r && 'disabled', i && `edge${ce(i)}`],
        input: ['input'],
      };
    return Ye(a, N0, t);
  },
  I0 = be(So)(({ ownerState: e }) =>
    x(
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
  _0 = be('input')({
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
  rd = /* @__PURE__ */ C.forwardRef(function (t, o) {
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
        inputProps: v,
        inputRef: g,
        name: h,
        onBlur: f,
        onChange: T,
        onFocus: w,
        readOnly: E,
        required: y = !1,
        tabIndex: m,
        type: O,
        value: R,
      } = t,
      D = Se(t, $0),
      [$, N] = Jn({
        controlled: i,
        default: !!l,
        name: 'SwitchBase',
        state: 'checked',
      }),
      k = oo(),
      j = (Z) => {
        w && w(Z), k && k.onFocus && k.onFocus(Z);
      },
      z = (Z) => {
        f && f(Z), k && k.onBlur && k.onBlur(Z);
      },
      P = (Z) => {
        if (Z.nativeEvent.defaultPrevented) return;
        const _ = Z.target.checked;
        N(_), T && T(Z, _);
      };
    let V = c;
    k && typeof V > 'u' && (V = k.disabled);
    const B = O === 'checkbox' || O === 'radio',
      Q = x({}, t, {
        checked: $,
        disabled: V,
        disableFocusRipple: u,
        edge: d,
      }),
      re = P0(Q);
    return /* @__PURE__ */ Fe(
      I0,
      x(
        {
          component: 'span',
          className: xe(re.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: V,
          tabIndex: null,
          role: void 0,
          onFocus: j,
          onBlur: z,
          ownerState: Q,
          ref: o,
        },
        D,
        {
          children: [
            /* @__PURE__ */ I(
              _0,
              x(
                {
                  autoFocus: r,
                  checked: i,
                  defaultChecked: l,
                  className: re.input,
                  disabled: V,
                  id: B ? b : void 0,
                  name: h,
                  onChange: P,
                  readOnly: E,
                  ref: g,
                  required: y,
                  ownerState: Q,
                  tabIndex: m,
                  type: O,
                },
                O === 'checkbox' && R === void 0
                  ? {}
                  : {
                      value: R,
                    },
                v,
              ),
            ),
            $ ? a : p,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (rd.propTypes = {
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
    inputRef: Ht,
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
const id = rd,
  M0 = $o(
    /* @__PURE__ */ I('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  A0 = $o(
    /* @__PURE__ */ I('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  D0 = $o(
    /* @__PURE__ */ I('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function L0(e) {
  return We('MuiCheckbox', e);
}
const F0 = Ve('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  ta = F0,
  z0 = [
    'checkedIcon',
    'color',
    'icon',
    'indeterminate',
    'indeterminateIcon',
    'inputProps',
    'size',
    'className',
  ],
  j0 = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      i = {
        root: ['root', o && 'indeterminate', `color${ce(r)}`],
      },
      a = Ye(i, L0, t);
    return x({}, t, a);
  },
  V0 = be(id, {
    shouldForwardProp: (e) => wn(e) || e === 'classes',
    name: 'MuiCheckbox',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.indeterminate && t.indeterminate,
        o.color !== 'default' && t[`color${ce(o.color)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    x(
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
            : st(
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
        [`&.${ta.checked}, &.${ta.indeterminate}`]: {
          color: (e.vars || e).palette[t.color].main,
        },
        [`&.${ta.disabled}`]: {
          color: (e.vars || e).palette.action.disabled,
        },
      },
    ),
  ),
  B0 = /* @__PURE__ */ I(A0, {}),
  W0 = /* @__PURE__ */ I(M0, {}),
  U0 = /* @__PURE__ */ I(D0, {}),
  ad = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r, i;
    const a = Xe({
        props: t,
        name: 'MuiCheckbox',
      }),
      {
        checkedIcon: s = B0,
        color: l = 'primary',
        icon: c = W0,
        indeterminate: u = !1,
        indeterminateIcon: d = U0,
        inputProps: p,
        size: b = 'medium',
        className: v,
      } = a,
      g = Se(a, z0),
      h = u ? d : c,
      f = u ? d : s,
      T = x({}, a, {
        color: l,
        indeterminate: u,
        size: b,
      }),
      w = j0(T);
    return /* @__PURE__ */ I(
      V0,
      x(
        {
          type: 'checkbox',
          inputProps: x(
            {
              'data-indeterminate': u,
            },
            p,
          ),
          icon: /* @__PURE__ */ C.cloneElement(h, {
            fontSize: (r = h.props.fontSize) != null ? r : b,
          }),
          checkedIcon: /* @__PURE__ */ C.cloneElement(f, {
            fontSize: (i = f.props.fontSize) != null ? i : b,
          }),
          ownerState: T,
          ref: o,
          className: xe(w.root, v),
        },
        g,
        {
          classes: w,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ad.propTypes = {
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
    inputRef: Ht,
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
const H0 = ad,
  q0 = [
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
  K0 = be('div', {
    name: 'MuiModal',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, !o.open && o.exited && t.hidden];
    },
  })(({ theme: e, ownerState: t }) =>
    x(
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
  Y0 = be(y0, {
    name: 'MuiModal',
    slot: 'Backdrop',
    overridesResolver: (e, t) => t.backdrop,
  })({
    zIndex: -1,
  }),
  sd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r, i, a, s, l, c;
    const u = Xe({
        name: 'MuiModal',
        props: t,
      }),
      {
        BackdropComponent: d = Y0,
        BackdropProps: p,
        classes: b,
        className: v,
        closeAfterTransition: g = !1,
        children: h,
        component: f,
        components: T = {},
        componentsProps: w = {},
        disableAutoFocus: E = !1,
        disableEnforceFocus: y = !1,
        disableEscapeKeyDown: m = !1,
        disablePortal: O = !1,
        disableRestoreFocus: R = !1,
        disableScrollLock: D = !1,
        hideBackdrop: $ = !1,
        keepMounted: N = !1,
        slotProps: k,
        slots: j,
        // eslint-disable-next-line react/prop-types
        theme: z,
      } = u,
      P = Se(u, q0),
      [V, B] = C.useState(!0),
      Q = {
        closeAfterTransition: g,
        disableAutoFocus: E,
        disableEnforceFocus: y,
        disableEscapeKeyDown: m,
        disablePortal: O,
        disableRestoreFocus: R,
        disableScrollLock: D,
        hideBackdrop: $,
        keepMounted: N,
      },
      re = x({}, u, Q, {
        exited: V,
      }),
      Z = (r = (i = j == null ? void 0 : j.root) != null ? i : T.Root) != null ? r : K0,
      _ = (a = (s = j == null ? void 0 : j.backdrop) != null ? s : T.Backdrop) != null ? a : d,
      W = (l = k == null ? void 0 : k.root) != null ? l : w.root,
      te = (c = k == null ? void 0 : k.backdrop) != null ? c : w.backdrop;
    return /* @__PURE__ */ I(
      xv,
      x(
        {
          slots: {
            root: Z,
            backdrop: _,
          },
          slotProps: {
            root: () =>
              x(
                {},
                ba(W, re),
                !Vn(Z) && {
                  as: f,
                  theme: z,
                },
                {
                  className: xe(
                    v,
                    W == null ? void 0 : W.className,
                    b == null ? void 0 : b.root,
                    !re.open && re.exited && (b == null ? void 0 : b.hidden),
                  ),
                },
              ),
            backdrop: () =>
              x({}, p, ba(te, re), {
                className: xe(te == null ? void 0 : te.className, b == null ? void 0 : b.backdrop),
              }),
          },
          onTransitionEnter: () => B(!1),
          onTransitionExited: () => B(!0),
          ref: o,
        },
        P,
        Q,
        {
          children: h,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (sd.propTypes = {
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
    children: Oo.isRequired,
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
    container: n.oneOfType([Nn, n.func]),
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
const G0 = sd,
  X0 = Ve('MuiDivider', [
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
  ac = X0,
  J0 = [
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
  Z0 = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Ye(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Yy,
        t,
      );
    return x({}, t, i);
  },
  Q0 = be($i, {
    shouldForwardProp: (e) => wn(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...ki(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    var o;
    const r = e.palette.mode === 'light',
      i = r ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)',
      a = r ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
      s = r ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.13)',
      l = r ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';
    return x(
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
        [`&.${Gt.focused}`]: {
          backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a,
        },
        [`&.${Gt.disabled}`]: {
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
        [`&.${Gt.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: 'scaleX(1) translateX(0)',
        },
        [`&.${Gt.error}`]: {
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
        [`&:hover:not(.${Gt.disabled}, .${Gt.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
        },
        [`&.${Gt.disabled}:before`]: {
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
        x(
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
  ex = be(Pi, {
    name: 'MuiFilledInput',
    slot: 'Input',
    overridesResolver: Ni,
  })(({ theme: e, ownerState: t }) =>
    x(
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
  ps = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Xe({
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
        slotProps: v,
        slots: g = {},
        type: h = 'text',
      } = l,
      f = Se(l, J0),
      T = x({}, l, {
        fullWidth: d,
        inputComponent: p,
        multiline: b,
        type: h,
      }),
      w = Z0(l),
      E = {
        root: {
          ownerState: T,
        },
        input: {
          ownerState: T,
        },
      },
      y = v ?? u ? ln(v ?? u, E) : E,
      m = (r = (i = g.root) != null ? i : c.Root) != null ? r : Q0,
      O = (a = (s = g.input) != null ? s : c.Input) != null ? a : ex;
    return /* @__PURE__ */ I(
      ds,
      x(
        {
          slots: {
            root: m,
            input: O,
          },
          componentsProps: y,
          fullWidth: d,
          inputComponent: p,
          multiline: b,
          ref: o,
          type: h,
        },
        f,
        {
          classes: w,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ps.propTypes = {
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
    inputRef: Ht,
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
ps.muiName = 'Input';
const ld = ps;
function tx(e) {
  return We('MuiFormControl', e);
}
Ve('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const nx = [
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
  ox = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      i = {
        root: ['root', o !== 'none' && `margin${ce(o)}`, r && 'fullWidth'],
      };
    return Ye(i, tx, t);
  },
  rx = be('div', {
    name: 'MuiFormControl',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      x({}, t.root, t[`margin${ce(e.margin)}`], e.fullWidth && t.fullWidth),
  })(({ ownerState: e }) =>
    x(
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
  cd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
        margin: v = 'none',
        required: g = !1,
        size: h = 'medium',
        variant: f = 'outlined',
      } = r,
      T = Se(r, nx),
      w = x({}, r, {
        color: s,
        component: l,
        disabled: c,
        error: u,
        fullWidth: p,
        hiddenLabel: b,
        margin: v,
        required: g,
        size: h,
        variant: f,
      }),
      E = ox(w),
      [y, m] = C.useState(() => {
        let z = !1;
        return (
          i &&
            C.Children.forEach(i, (P) => {
              if (!Ki(P, ['Input', 'Select'])) return;
              const V = Ki(P, ['Select']) ? P.props.input : P;
              V && Fy(V.props) && (z = !0);
            }),
          z
        );
      }),
      [O, R] = C.useState(() => {
        let z = !1;
        return (
          i &&
            C.Children.forEach(i, (P) => {
              Ki(P, ['Input', 'Select']) && us(P.props, !0) && (z = !0);
            }),
          z
        );
      }),
      [D, $] = C.useState(!1);
    c && D && $(!1);
    const N = d !== void 0 && !c ? d : D;
    let k;
    if (process.env.NODE_ENV !== 'production') {
      const z = C.useRef(!1);
      k = () => (
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
    const j = C.useMemo(
      () => ({
        adornedStart: y,
        setAdornedStart: m,
        color: s,
        disabled: c,
        error: u,
        filled: O,
        focused: N,
        fullWidth: p,
        hiddenLabel: b,
        size: h,
        onBlur: () => {
          $(!1);
        },
        onEmpty: () => {
          R(!1);
        },
        onFilled: () => {
          R(!0);
        },
        onFocus: () => {
          $(!0);
        },
        registerEffect: k,
        required: g,
        variant: f,
      }),
      [y, s, c, u, O, N, p, b, k, g, h, f],
    );
    return /* @__PURE__ */ I(cs.Provider, {
      value: j,
      children: /* @__PURE__ */ I(
        rx,
        x(
          {
            as: l,
            ownerState: w,
            className: xe(E.root, a),
            ref: o,
          },
          T,
          {
            children: i,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (cd.propTypes = {
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
const ix = cd;
function ax(e) {
  return We('MuiFormHelperText', e);
}
const sx = Ve('MuiFormHelperText', [
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
  sc = sx;
var lc;
const lx = [
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
  cx = (e) => {
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
          r && `size${ce(r)}`,
          o && 'contained',
          l && 'focused',
          s && 'filled',
          c && 'required',
        ],
      };
    return Ye(u, ax, t);
  },
  ux = be('p', {
    name: 'MuiFormHelperText',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.size && t[`size${ce(o.size)}`],
        o.contained && t.contained,
        o.filled && t.filled,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    x(
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
        [`&.${sc.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
        },
        [`&.${sc.error}`]: {
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
  ud = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
        props: t,
        name: 'MuiFormHelperText',
      }),
      { children: i, className: a, component: s = 'p' } = r,
      l = Se(r, lx),
      c = oo(),
      u = Po({
        props: r,
        muiFormControl: c,
        states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
      }),
      d = x({}, r, {
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
      p = cx(d);
    return /* @__PURE__ */ I(
      ux,
      x(
        {
          as: s,
          ownerState: d,
          className: xe(p.root, a),
          ref: o,
        },
        l,
        {
          children:
            i === ' '
              ? // notranslate needed while Google Translate will not fix zero-width space issue
                lc ||
                (lc = /* @__PURE__ */ I('span', {
                  className: 'notranslate',
                  children: '​',
                }))
              : i,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ud.propTypes = {
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
const dx = ud;
function px(e) {
  return We('MuiFormLabel', e);
}
const fx = Ve('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  Jo = fx,
  mx = [
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
  hx = (e) => {
    const { classes: t, color: o, focused: r, disabled: i, error: a, filled: s, required: l } = e,
      c = {
        root: [
          'root',
          `color${ce(o)}`,
          i && 'disabled',
          a && 'error',
          s && 'filled',
          r && 'focused',
          l && 'required',
        ],
        asterisk: ['asterisk', a && 'error'],
      };
    return Ye(c, px, t);
  },
  bx = be('label', {
    name: 'MuiFormLabel',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      x({}, t.root, e.color === 'secondary' && t.colorSecondary, e.filled && t.filled),
  })(({ theme: e, ownerState: t }) =>
    x(
      {
        color: (e.vars || e).palette.text.secondary,
      },
      e.typography.body1,
      {
        lineHeight: '1.4375em',
        padding: 0,
        position: 'relative',
        [`&.${Jo.focused}`]: {
          color: (e.vars || e).palette[t.color].main,
        },
        [`&.${Jo.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
        },
        [`&.${Jo.error}`]: {
          color: (e.vars || e).palette.error.main,
        },
      },
    ),
  ),
  gx = be('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({
    [`&.${Jo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  dd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
        props: t,
        name: 'MuiFormLabel',
      }),
      { children: i, className: a, component: s = 'label' } = r,
      l = Se(r, mx),
      c = oo(),
      u = Po({
        props: r,
        muiFormControl: c,
        states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
      }),
      d = x({}, r, {
        color: u.color || 'primary',
        component: s,
        disabled: u.disabled,
        error: u.error,
        filled: u.filled,
        focused: u.focused,
        required: u.required,
      }),
      p = hx(d);
    return /* @__PURE__ */ Fe(
      bx,
      x(
        {
          as: s,
          ownerState: d,
          className: xe(p.root, a),
          ref: o,
        },
        l,
        {
          children: [
            i,
            u.required &&
              /* @__PURE__ */ Fe(gx, {
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
  (dd.propTypes = {
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
const pd = dd,
  vx = [
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
const yx = {
    entering: {
      opacity: 1,
      transform: Ta(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
  },
  na =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  fs = /* @__PURE__ */ C.forwardRef(function (t, o) {
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
        onExiting: v,
        style: g,
        timeout: h = 'auto',
        // eslint-disable-next-line react/prop-types
        TransitionComponent: f = Lu,
      } = t,
      T = Se(t, vx),
      w = C.useRef(),
      E = C.useRef(),
      y = No(),
      m = C.useRef(null),
      O = Rt(m, a.ref, o),
      R = (V) => (B) => {
        if (V) {
          const Q = m.current;
          B === void 0 ? V(Q) : V(Q, B);
        }
      },
      D = R(d),
      $ = R((V, B) => {
        Fu(V);
        const {
          duration: Q,
          delay: re,
          easing: Z,
        } = ti(
          {
            style: g,
            timeout: h,
            easing: s,
          },
          {
            mode: 'enter',
          },
        );
        let _;
        h === 'auto'
          ? ((_ = y.transitions.getAutoHeightDuration(V.clientHeight)), (E.current = _))
          : (_ = Q),
          (V.style.transition = [
            y.transitions.create('opacity', {
              duration: _,
              delay: re,
            }),
            y.transitions.create('transform', {
              duration: na ? _ : _ * 0.666,
              delay: re,
              easing: Z,
            }),
          ].join(',')),
          c && c(V, B);
      }),
      N = R(u),
      k = R(v),
      j = R((V) => {
        const {
          duration: B,
          delay: Q,
          easing: re,
        } = ti(
          {
            style: g,
            timeout: h,
            easing: s,
          },
          {
            mode: 'exit',
          },
        );
        let Z;
        h === 'auto'
          ? ((Z = y.transitions.getAutoHeightDuration(V.clientHeight)), (E.current = Z))
          : (Z = B),
          (V.style.transition = [
            y.transitions.create('opacity', {
              duration: Z,
              delay: Q,
            }),
            y.transitions.create('transform', {
              duration: na ? Z : Z * 0.666,
              delay: na ? Q : Q || Z * 0.333,
              easing: re,
            }),
          ].join(',')),
          (V.style.opacity = 0),
          (V.style.transform = Ta(0.75)),
          p && p(V);
      }),
      z = R(b),
      P = (V) => {
        h === 'auto' && (w.current = setTimeout(V, E.current || 0)), r && r(m.current, V);
      };
    return (
      C.useEffect(
        () => () => {
          clearTimeout(w.current);
        },
        [],
      ),
      /* @__PURE__ */ I(
        f,
        x(
          {
            appear: i,
            in: l,
            nodeRef: m,
            onEnter: $,
            onEntered: N,
            onEntering: D,
            onExit: j,
            onExited: z,
            onExiting: k,
            addEndListener: P,
            timeout: h === 'auto' ? null : h,
          },
          T,
          {
            children: (V, B) =>
              /* @__PURE__ */ C.cloneElement(
                a,
                x(
                  {
                    style: x(
                      {
                        opacity: 0,
                        transform: Ta(0.75),
                        visibility: V === 'exited' && !l ? 'hidden' : void 0,
                      },
                      yx[V],
                      g,
                      a.props.style,
                    ),
                    ref: O,
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
  (fs.propTypes = {
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
    children: Oo.isRequired,
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
fs.muiSupportAuto = !0;
const fd = fs,
  xx = [
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
  Ex = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Ye(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Uy,
        t,
      );
    return x({}, t, i);
  },
  Cx = be($i, {
    shouldForwardProp: (e) => wn(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...ki(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    let r = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
    return (
      e.vars &&
        (r = `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`),
      x(
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
          [`&.${zn.focused}:after`]: {
            // translateX(0) is a workaround for Safari transform scale bug
            // See https://github.com/mui/material-ui/issues/31766
            transform: 'scaleX(1) translateX(0)',
          },
          [`&.${zn.error}`]: {
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
          [`&:hover:not(.${zn.disabled}, .${zn.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              borderBottom: `1px solid ${r}`,
            },
          },
          [`&.${zn.disabled}:before`]: {
            borderBottomStyle: 'dotted',
          },
        },
      )
    );
  }),
  wx = be(Pi, {
    name: 'MuiInput',
    slot: 'Input',
    overridesResolver: Ni,
  })({}),
  ms = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Xe({
        props: t,
        name: 'MuiInput',
      }),
      {
        disableUnderline: c,
        components: u = {},
        componentsProps: d,
        fullWidth: p = !1,
        inputComponent: b = 'input',
        multiline: v = !1,
        slotProps: g,
        slots: h = {},
        type: f = 'text',
      } = l,
      T = Se(l, xx),
      w = Ex(l),
      y = {
        root: {
          ownerState: {
            disableUnderline: c,
          },
        },
      },
      m = g ?? d ? ln(g ?? d, y) : y,
      O = (r = (i = h.root) != null ? i : u.Root) != null ? r : Cx,
      R = (a = (s = h.input) != null ? s : u.Input) != null ? a : wx;
    return /* @__PURE__ */ I(
      ds,
      x(
        {
          slots: {
            root: O,
            input: R,
          },
          slotProps: m,
          fullWidth: p,
          inputComponent: b,
          multiline: v,
          ref: o,
          type: f,
        },
        T,
        {
          classes: w,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ms.propTypes = {
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
    inputRef: Ht,
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
ms.muiName = 'Input';
const md = ms;
function Tx(e) {
  return We('MuiInputLabel', e);
}
Ve('MuiInputLabel', [
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
const Sx = ['disableAnimation', 'margin', 'shrink', 'variant', 'className'],
  Rx = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: i,
        disableAnimation: a,
        variant: s,
        required: l,
      } = e,
      u = Ye(
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
        Tx,
        t,
      );
    return x({}, t, u);
  },
  Ox = be(pd, {
    shouldForwardProp: (e) => wn(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${Jo.asterisk}`]: t.asterisk,
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
    x(
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
        x(
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
            x(
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
        x(
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
  hd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
        name: 'MuiInputLabel',
        props: t,
      }),
      { disableAnimation: i = !1, shrink: a, className: s } = r,
      l = Se(r, Sx),
      c = oo();
    let u = a;
    typeof u > 'u' && c && (u = c.filled || c.focused || c.adornedStart);
    const d = Po({
        props: r,
        muiFormControl: c,
        states: ['size', 'variant', 'required'],
      }),
      p = x({}, r, {
        disableAnimation: i,
        formControl: c,
        shrink: u,
        size: d.size,
        variant: d.variant,
        required: d.required,
      }),
      b = Rx(p);
    return /* @__PURE__ */ I(
      Ox,
      x(
        {
          'data-shrink': u,
          ownerState: p,
          ref: o,
          className: xe(b.root, s),
        },
        l,
        {
          classes: b,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (hd.propTypes = {
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
const kx = hd,
  bd = /* @__PURE__ */ C.createContext({});
process.env.NODE_ENV !== 'production' && (bd.displayName = 'ListContext');
const Sa = bd;
function Nx(e) {
  return We('MuiList', e);
}
Ve('MuiList', ['root', 'padding', 'dense', 'subheader']);
const $x = ['children', 'className', 'component', 'dense', 'disablePadding', 'subheader'],
  Px = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: i } = e;
    return Ye(
      {
        root: ['root', !o && 'padding', r && 'dense', i && 'subheader'],
      },
      Nx,
      t,
    );
  },
  Ix = be('ul', {
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
    x(
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
  gd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
      d = Se(r, $x),
      p = C.useMemo(
        () => ({
          dense: l,
        }),
        [l],
      ),
      b = x({}, r, {
        component: s,
        dense: l,
        disablePadding: c,
      }),
      v = Px(b);
    return /* @__PURE__ */ I(Sa.Provider, {
      value: p,
      children: /* @__PURE__ */ Fe(
        Ix,
        x(
          {
            as: s,
            className: xe(v.root, a),
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
  (gd.propTypes = {
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
const _x = gd,
  Mx = Ve('MuiListItemIcon', ['root', 'alignItemsFlexStart']),
  cc = Mx,
  Ax = Ve('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']),
  uc = Ax,
  Dx = [
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
function oa(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function dc(e, t, o) {
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
function vd(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function Bo(e, t, o, r, i, a) {
  let s = !1,
    l = i(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !vd(l, a) || c) l = i(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const yd = /* @__PURE__ */ C.forwardRef(function (t, o) {
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
    b = Se(t, Dx),
    v = C.useRef(null),
    g = C.useRef({
      keys: [],
      repeating: !0,
      previousKeyMatched: !0,
      lastTime: null,
    });
  $n(() => {
    i && v.current.focus();
  }, [i]),
    C.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (E, y) => {
          const m = !v.current.style.width;
          if (E.clientHeight < v.current.clientHeight && m) {
            const O = `${Kc(wt(E))}px`;
            (v.current.style[y.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = O),
              (v.current.style.width = `calc(100% + ${O})`);
          }
          return v.current;
        },
      }),
      [],
    );
  const h = (E) => {
      const y = v.current,
        m = E.key,
        O = wt(y).activeElement;
      if (m === 'ArrowDown') E.preventDefault(), Bo(y, O, u, c, oa);
      else if (m === 'ArrowUp') E.preventDefault(), Bo(y, O, u, c, dc);
      else if (m === 'Home') E.preventDefault(), Bo(y, null, u, c, oa);
      else if (m === 'End') E.preventDefault(), Bo(y, null, u, c, dc);
      else if (m.length === 1) {
        const R = g.current,
          D = m.toLowerCase(),
          $ = performance.now();
        R.keys.length > 0 &&
          ($ - R.lastTime > 500
            ? ((R.keys = []), (R.repeating = !0), (R.previousKeyMatched = !0))
            : R.repeating && D !== R.keys[0] && (R.repeating = !1)),
          (R.lastTime = $),
          R.keys.push(D);
        const N = O && !R.repeating && vd(O, R);
        R.previousKeyMatched && (N || Bo(y, O, !1, c, oa, R))
          ? E.preventDefault()
          : (R.previousKeyMatched = !1);
      }
      d && d(E);
    },
    f = Rt(v, o);
  let T = -1;
  C.Children.forEach(s, (E, y) => {
    /* @__PURE__ */ C.isValidElement(E) &&
      (process.env.NODE_ENV !== 'production' &&
        is.isFragment(E) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      E.props.disabled || (((p === 'selectedMenu' && E.props.selected) || T === -1) && (T = y)),
      T === y &&
        (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) &&
        ((T += 1), T >= s.length && (T = -1)));
  });
  const w = C.Children.map(s, (E, y) => {
    if (y === T) {
      const m = {};
      return (
        a && (m.autoFocus = !0),
        E.props.tabIndex === void 0 && p === 'selectedMenu' && (m.tabIndex = 0),
        /* @__PURE__ */ C.cloneElement(E, m)
      );
    }
    return E;
  });
  return /* @__PURE__ */ I(
    _x,
    x(
      {
        role: 'menu',
        ref: f,
        className: l,
        onKeyDown: h,
        tabIndex: i ? 0 : -1,
      },
      b,
      {
        children: w,
      },
    ),
  );
});
process.env.NODE_ENV !== 'production' &&
  (yd.propTypes = {
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
const Lx = yd;
function Fx(e) {
  return We('MuiPopover', e);
}
Ve('MuiPopover', ['root', 'paper']);
const zx = ['onEntering'],
  jx = [
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
function pc(e, t) {
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
function fc(e, t) {
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
function mc(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function Vr(e) {
  return typeof e == 'function' ? e() : e;
}
const Vx = (e) => {
    const { classes: t } = e;
    return Ye(
      {
        root: ['root'],
        paper: ['paper'],
      },
      Fx,
      t,
    );
  },
  Bx = be(G0, {
    name: 'MuiPopover',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Wx = be(mr, {
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
  xd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
        marginThreshold: v = 16,
        open: g,
        PaperProps: h = {},
        transformOrigin: f = {
          vertical: 'top',
          horizontal: 'left',
        },
        TransitionComponent: T = fd,
        transitionDuration: w = 'auto',
        TransitionProps: { onEntering: E } = {},
      } = r,
      y = Se(r.TransitionProps, zx),
      m = Se(r, jx),
      O = C.useRef(),
      R = Rt(O, h.ref),
      D = x({}, r, {
        anchorOrigin: s,
        anchorReference: c,
        elevation: b,
        marginThreshold: v,
        PaperProps: h,
        transformOrigin: f,
        TransitionComponent: T,
        transitionDuration: w,
        TransitionProps: y,
      }),
      $ = Vx(D),
      N = C.useCallback(() => {
        if (c === 'anchorPosition')
          return (
            process.env.NODE_ENV !== 'production' &&
              (l ||
                console.error(
                  'MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.',
                )),
            l
          );
        const _ = Vr(a),
          W = _ && _.nodeType === 1 ? _ : wt(O.current).body,
          te = W.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'production') {
          const H = W.getBoundingClientRect();
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
          top: te.top + pc(te, s.vertical),
          left: te.left + fc(te, s.horizontal),
        };
      }, [a, s.horizontal, s.vertical, l, c]),
      k = C.useCallback(
        (_) => ({
          vertical: pc(_, f.vertical),
          horizontal: fc(_, f.horizontal),
        }),
        [f.horizontal, f.vertical],
      ),
      j = C.useCallback(
        (_) => {
          const W = {
              width: _.offsetWidth,
              height: _.offsetHeight,
            },
            te = k(W);
          if (c === 'none')
            return {
              top: null,
              left: null,
              transformOrigin: mc(te),
            };
          const H = N();
          let K = H.top - te.vertical,
            ne = H.left - te.horizontal;
          const ee = K + W.height,
            oe = ne + W.width,
            le = Qn(Vr(a)),
            ue = le.innerHeight - v,
            ye = le.innerWidth - v;
          if (K < v) {
            const se = K - v;
            (K -= se), (te.vertical += se);
          } else if (ee > ue) {
            const se = ee - ue;
            (K -= se), (te.vertical += se);
          }
          if (
            (process.env.NODE_ENV !== 'production' &&
              W.height > ue &&
              W.height &&
              ue &&
              console.error(
                [
                  'MUI: The popover component is too tall.',
                  `Some part of it can not be seen on the screen (${W.height - ue}px).`,
                  'Please consider adding a `max-height` to improve the user-experience.',
                ].join(`
`),
              ),
            ne < v)
          ) {
            const se = ne - v;
            (ne -= se), (te.horizontal += se);
          } else if (oe > ye) {
            const se = oe - ye;
            (ne -= se), (te.horizontal += se);
          }
          return {
            top: `${Math.round(K)}px`,
            left: `${Math.round(ne)}px`,
            transformOrigin: mc(te),
          };
        },
        [a, c, N, k, v],
      ),
      [z, P] = C.useState(g),
      V = C.useCallback(() => {
        const _ = O.current;
        if (!_) return;
        const W = j(_);
        W.top !== null && (_.style.top = W.top),
          W.left !== null && (_.style.left = W.left),
          (_.style.transformOrigin = W.transformOrigin),
          P(!0);
      }, [j]),
      B = (_, W) => {
        E && E(_, W), V();
      },
      Q = () => {
        P(!1);
      };
    C.useEffect(() => {
      g && V();
    }),
      C.useImperativeHandle(
        i,
        () =>
          g
            ? {
                updatePosition: () => {
                  V();
                },
              }
            : null,
        [g, V],
      ),
      C.useEffect(() => {
        if (!g) return;
        const _ = Uc(() => {
            V();
          }),
          W = Qn(a);
        return (
          W.addEventListener('resize', _),
          () => {
            _.clear(), W.removeEventListener('resize', _);
          }
        );
      }, [a, g, V]);
    let re = w;
    w === 'auto' && !T.muiSupportAuto && (re = void 0);
    const Z = p || (a ? wt(Vr(a)).body : void 0);
    return /* @__PURE__ */ I(
      Bx,
      x(
        {
          BackdropProps: {
            invisible: !0,
          },
          className: xe($.root, d),
          container: Z,
          open: g,
          ref: o,
          ownerState: D,
        },
        m,
        {
          children: /* @__PURE__ */ I(
            T,
            x(
              {
                appear: !0,
                in: g,
                onEntering: B,
                onExited: Q,
                timeout: re,
              },
              y,
              {
                children: /* @__PURE__ */ I(
                  Wx,
                  x(
                    {
                      elevation: b,
                    },
                    h,
                    {
                      ref: R,
                      className: xe($.paper, h.className),
                    },
                    z
                      ? void 0
                      : {
                          style: x({}, h.style, {
                            opacity: 0,
                          }),
                        },
                    {
                      ownerState: D,
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
  (xd.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * A ref for imperative actions.
     * It currently only supports updatePosition() action.
     */
    action: Ht,
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the popover.
     */
    anchorEl: En(n.oneOfType([Nn, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = Vr(e.anchorEl);
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
    container: n.oneOfType([Nn, n.func]),
    /**
     * The elevation of the popover.
     * @default 8
     */
    elevation: Ma,
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
      component: Ia,
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
const Ux = xd;
function Hx(e) {
  return We('MuiMenu', e);
}
Ve('MuiMenu', ['root', 'paper', 'list']);
const qx = ['onEntering'],
  Kx = [
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
  Yx = {
    vertical: 'top',
    horizontal: 'right',
  },
  Gx = {
    vertical: 'top',
    horizontal: 'left',
  },
  Xx = (e) => {
    const { classes: t } = e;
    return Ye(
      {
        root: ['root'],
        paper: ['paper'],
        list: ['list'],
      },
      Hx,
      t,
    );
  },
  Jx = be(Ux, {
    shouldForwardProp: (e) => wn(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Zx = be(mr, {
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
  Qx = be(Lx, {
    name: 'MuiMenu',
    slot: 'List',
    overridesResolver: (e, t) => t.list,
  })({
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  }),
  Ed = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
        TransitionProps: { onEntering: v } = {},
        variant: g = 'selectedMenu',
      } = r,
      h = Se(r.TransitionProps, qx),
      f = Se(r, Kx),
      T = No(),
      w = T.direction === 'rtl',
      E = x({}, r, {
        autoFocus: i,
        disableAutoFocusItem: s,
        MenuListProps: l,
        onEntering: v,
        PaperProps: d,
        transitionDuration: b,
        TransitionProps: h,
        variant: g,
      }),
      y = Xx(E),
      m = i && !s && u,
      O = C.useRef(null),
      R = (N, k) => {
        O.current && O.current.adjustStyleForScrollbar(N, T), v && v(N, k);
      },
      D = (N) => {
        N.key === 'Tab' && (N.preventDefault(), c && c(N, 'tabKeyDown'));
      };
    let $ = -1;
    return (
      C.Children.map(a, (N, k) => {
        /* @__PURE__ */ C.isValidElement(N) &&
          (process.env.NODE_ENV !== 'production' &&
            is.isFragment(N) &&
            console.error(
              [
                "MUI: The Menu component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join(`
`),
            ),
          N.props.disabled ||
            (((g === 'selectedMenu' && N.props.selected) || $ === -1) && ($ = k)));
      }),
      /* @__PURE__ */ I(
        Jx,
        x(
          {
            onClose: c,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: w ? 'right' : 'left',
            },
            transformOrigin: w ? Yx : Gx,
            PaperProps: x(
              {
                as: Zx,
              },
              d,
              {
                classes: x({}, d.classes, {
                  root: y.paper,
                }),
              },
            ),
            className: y.root,
            open: u,
            ref: o,
            transitionDuration: b,
            TransitionProps: x(
              {
                onEntering: R,
              },
              h,
            ),
            ownerState: E,
          },
          f,
          {
            classes: p,
            children: /* @__PURE__ */ I(
              Qx,
              x(
                {
                  onKeyDown: D,
                  actions: O,
                  autoFocus: i && ($ === -1 || s),
                  autoFocusItem: m,
                  variant: g,
                },
                l,
                {
                  className: xe(y.list, l.className),
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
  (Ed.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the menu.
     */
    anchorEl: n.oneOfType([Nn, n.func]),
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
const eE = Ed;
function tE(e) {
  return We('MuiMenuItem', e);
}
const nE = Ve('MuiMenuItem', [
    'root',
    'focusVisible',
    'dense',
    'disabled',
    'divider',
    'gutters',
    'selected',
  ]),
  Wo = nE,
  oE = [
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
  rE = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
  },
  iE = (e) => {
    const { disabled: t, dense: o, divider: r, disableGutters: i, selected: a, classes: s } = e,
      c = Ye(
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
        tE,
        s,
      );
    return x({}, s, c);
  },
  aE = be(So, {
    shouldForwardProp: (e) => wn(e) || e === 'classes',
    name: 'MuiMenuItem',
    slot: 'Root',
    overridesResolver: rE,
  })(({ theme: e, ownerState: t }) =>
    x(
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
        [`&.${Wo.selected}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
            : st(e.palette.primary.main, e.palette.action.selectedOpacity),
          [`&.${Wo.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : st(
                  e.palette.primary.main,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        [`&.${Wo.selected}:hover`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : st(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
              : st(e.palette.primary.main, e.palette.action.selectedOpacity),
          },
        },
        [`&.${Wo.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette.action.focus,
        },
        [`&.${Wo.disabled}`]: {
          opacity: (e.vars || e).palette.action.disabledOpacity,
        },
        [`& + .${ac.root}`]: {
          marginTop: e.spacing(1),
          marginBottom: e.spacing(1),
        },
        [`& + .${ac.inset}`]: {
          marginLeft: 52,
        },
        [`& .${uc.root}`]: {
          marginTop: 0,
          marginBottom: 0,
        },
        [`& .${uc.inset}`]: {
          paddingLeft: 36,
        },
        [`& .${cc.root}`]: {
          minWidth: 36,
        },
      },
      !t.dense && {
        [e.breakpoints.up('sm')]: {
          minHeight: 'auto',
        },
      },
      t.dense &&
        x(
          {
            minHeight: 32,
            // https://m2.material.io/components/menus#specs > Dense
            paddingTop: 4,
            paddingBottom: 4,
          },
          e.typography.body2,
          {
            [`& .${cc.root} svg`]: {
              fontSize: '1.25rem',
            },
          },
        ),
    ),
  ),
  Cd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
        className: b,
      } = r,
      v = Se(r, oE),
      g = C.useContext(Sa),
      h = C.useMemo(
        () => ({
          dense: s || g.dense || !1,
          disableGutters: c,
        }),
        [g.dense, s, c],
      ),
      f = C.useRef(null);
    $n(() => {
      i &&
        (f.current
          ? f.current.focus()
          : process.env.NODE_ENV !== 'production' &&
            console.error(
              'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
            ));
    }, [i]);
    const T = x({}, r, {
        dense: h.dense,
        divider: l,
        disableGutters: c,
      }),
      w = iE(r),
      E = Rt(f, o);
    let y;
    return (
      r.disabled || (y = p !== void 0 ? p : -1),
      /* @__PURE__ */ I(Sa.Provider, {
        value: h,
        children: /* @__PURE__ */ I(
          aE,
          x(
            {
              ref: E,
              role: d,
              tabIndex: y,
              component: a,
              focusVisibleClassName: xe(w.focusVisible, u),
              className: xe(w.root, b),
            },
            v,
            {
              ownerState: T,
              classes: w,
            },
          ),
        ),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Cd.propTypes = {
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
const sE = Cd;
function lE(e) {
  return We('MuiNativeSelect', e);
}
const cE = Ve('MuiNativeSelect', [
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
  hs = cE,
  uE = ['className', 'disabled', 'IconComponent', 'inputRef', 'variant'],
  dE = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${ce(o)}`, a && 'iconOpen', r && 'disabled'],
      };
    return Ye(s, lE, t);
  },
  wd = ({ ownerState: e, theme: t }) =>
    x(
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
        '&:focus': x(
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
        [`&.${hs.disabled}`]: {
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
  pE = be('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: wn,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.select,
        t[o.variant],
        {
          [`&.${hs.multiple}`]: t.multiple,
        },
      ];
    },
  })(wd),
  Td = ({ ownerState: e, theme: t }) =>
    x(
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
        [`&.${hs.disabled}`]: {
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
  fE = be('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${ce(o.variant)}`], o.open && t.iconOpen];
    },
  })(Td),
  Sd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const { className: r, disabled: i, IconComponent: a, inputRef: s, variant: l = 'standard' } = t,
      c = Se(t, uE),
      u = x({}, t, {
        disabled: i,
        variant: l,
      }),
      d = dE(u);
    return /* @__PURE__ */ Fe(C.Fragment, {
      children: [
        /* @__PURE__ */ I(
          pE,
          x(
            {
              ownerState: u,
              className: xe(d.select, r),
              disabled: i,
              ref: s || o,
            },
            c,
          ),
        ),
        t.multiple
          ? null
          : /* @__PURE__ */ I(fE, {
              as: a,
              ownerState: u,
              className: d.icon,
            }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Sd.propTypes = {
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
    inputRef: Ht,
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
const mE = Sd;
var hc;
const hE = ['children', 'classes', 'className', 'label', 'notched'],
  bE = be('fieldset')({
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
  gE = be('legend')(({ ownerState: e, theme: t }) =>
    x(
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
        x(
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
function Rd(e) {
  const { className: t, label: o, notched: r } = e,
    i = Se(e, hE),
    a = o != null && o !== '',
    s = x({}, e, {
      notched: r,
      withLabel: a,
    });
  return /* @__PURE__ */ I(
    bE,
    x(
      {
        'aria-hidden': !0,
        className: t,
        ownerState: s,
      },
      i,
      {
        children: /* @__PURE__ */ I(gE, {
          ownerState: s,
          children: a
            ? /* @__PURE__ */ I('span', {
                children: o,
              })
            : // notranslate needed while Google Translate will not fix zero-width space issue
              hc ||
              (hc = /* @__PURE__ */ I('span', {
                className: 'notranslate',
                children: '​',
              })),
        }),
      },
    ),
  );
}
process.env.NODE_ENV !== 'production' &&
  (Rd.propTypes = {
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
const vE = [
    'components',
    'fullWidth',
    'inputComponent',
    'label',
    'multiline',
    'notched',
    'slots',
    'type',
  ],
  yE = (e) => {
    const { classes: t } = e,
      r = Ye(
        {
          root: ['root'],
          notchedOutline: ['notchedOutline'],
          input: ['input'],
        },
        qy,
        t,
      );
    return x({}, t, r);
  },
  xE = be($i, {
    shouldForwardProp: (e) => wn(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: ki,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return x(
      {
        position: 'relative',
        borderRadius: (e.vars || e).shape.borderRadius,
        [`&:hover .${Sn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.text.primary,
        },
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          [`&:hover .${Sn.notchedOutline}`]: {
            borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
          },
        },
        [`&.${Sn.focused} .${Sn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[t.color].main,
          borderWidth: 2,
        },
        [`&.${Sn.error} .${Sn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.error.main,
        },
        [`&.${Sn.disabled} .${Sn.notchedOutline}`]: {
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
        x(
          {
            padding: '16.5px 14px',
          },
          t.size === 'small' && {
            padding: '8.5px 14px',
          },
        ),
    );
  }),
  EE = be(Rd, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  CE = be(Pi, {
    name: 'MuiOutlinedInput',
    slot: 'Input',
    overridesResolver: Ni,
  })(({ theme: e, ownerState: t }) =>
    x(
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
  bs = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r, i, a, s, l;
    const c = Xe({
        props: t,
        name: 'MuiOutlinedInput',
      }),
      {
        components: u = {},
        fullWidth: d = !1,
        inputComponent: p = 'input',
        label: b,
        multiline: v = !1,
        notched: g,
        slots: h = {},
        type: f = 'text',
      } = c,
      T = Se(c, vE),
      w = yE(c),
      E = oo(),
      y = Po({
        props: c,
        muiFormControl: E,
        states: ['required'],
      }),
      m = x({}, c, {
        color: y.color || 'primary',
        disabled: y.disabled,
        error: y.error,
        focused: y.focused,
        formControl: E,
        fullWidth: d,
        hiddenLabel: y.hiddenLabel,
        multiline: v,
        size: y.size,
        type: f,
      }),
      O = (r = (i = h.root) != null ? i : u.Root) != null ? r : xE,
      R = (a = (s = h.input) != null ? s : u.Input) != null ? a : CE;
    return /* @__PURE__ */ I(
      ds,
      x(
        {
          slots: {
            root: O,
            input: R,
          },
          renderSuffix: (D) =>
            /* @__PURE__ */ I(EE, {
              ownerState: m,
              className: w.notchedOutline,
              label:
                b != null && b !== '' && y.required
                  ? l ||
                    (l = /* @__PURE__ */ Fe(C.Fragment, {
                      children: [b, ' ', '*'],
                    }))
                  : b,
              notched: typeof g < 'u' ? g : !!(D.startAdornment || D.filled || D.focused),
            }),
          fullWidth: d,
          inputComponent: p,
          multiline: v,
          ref: o,
          type: f,
        },
        T,
        {
          classes: x({}, w, {
            notchedOutline: null,
          }),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (bs.propTypes = {
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
    inputRef: Ht,
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
bs.muiName = 'Input';
const Od = bs;
function wE(e) {
  return We('MuiSelect', e);
}
const TE = Ve('MuiSelect', [
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
  Mr = TE;
var bc;
const SE = [
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
  RE = be('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        // Win specificity over the input base
        {
          [`&.${Mr.select}`]: t.select,
        },
        {
          [`&.${Mr.select}`]: t[o.variant],
        },
        {
          [`&.${Mr.multiple}`]: t.multiple,
        },
      ];
    },
  })(wd, {
    // Win specificity over the input base
    [`&.${Mr.select}`]: {
      height: 'auto',
      // Resets for multiple select with chips
      minHeight: '1.4375em',
      // Required for select\text-field height consistency
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  OE = be('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${ce(o.variant)}`], o.open && t.iconOpen];
    },
  })(Td),
  kE = be('input', {
    shouldForwardProp: (e) => Ja(e) && e !== 'classes',
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
function gc(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function NE(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const $E = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${ce(o)}`, a && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return Ye(s, wE, t);
  },
  kd = /* @__PURE__ */ C.forwardRef(function (t, o) {
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
        IconComponent: v,
        inputRef: g,
        labelId: h,
        MenuProps: f = {},
        multiple: T,
        name: w,
        onBlur: E,
        onChange: y,
        onClose: m,
        onFocus: O,
        onOpen: R,
        open: D,
        readOnly: $,
        renderValue: N,
        SelectDisplayProps: k = {},
        tabIndex: j,
        value: z,
        variant: P = 'standard',
      } = t,
      V = Se(t, SE),
      [B, Q] = Jn({
        controlled: z,
        default: d,
        name: 'Select',
      }),
      [re, Z] = Jn({
        controlled: D,
        default: u,
        name: 'Select',
      }),
      _ = C.useRef(null),
      W = C.useRef(null),
      [te, H] = C.useState(null),
      { current: K } = C.useRef(D != null),
      [ne, ee] = C.useState(),
      oe = Rt(o, g),
      le = C.useCallback((ae) => {
        (W.current = ae), ae && H(ae);
      }, []),
      ue = te == null ? void 0 : te.parentNode;
    C.useImperativeHandle(
      oe,
      () => ({
        focus: () => {
          W.current.focus();
        },
        node: _.current,
        value: B,
      }),
      [B],
    ),
      C.useEffect(() => {
        u && re && te && !K && (ee(s ? null : ue.clientWidth), W.current.focus());
      }, [te, s]),
      C.useEffect(() => {
        a && W.current.focus();
      }, [a]),
      C.useEffect(() => {
        if (!h) return;
        const ae = wt(W.current).getElementById(h);
        if (ae) {
          const Ee = () => {
            getSelection().isCollapsed && W.current.focus();
          };
          return (
            ae.addEventListener('click', Ee),
            () => {
              ae.removeEventListener('click', Ee);
            }
          );
        }
      }, [h]);
    const ye = (ae, Ee) => {
        ae ? R && R(Ee) : m && m(Ee), K || (ee(s ? null : ue.clientWidth), Z(ae));
      },
      se = (ae) => {
        ae.button === 0 && (ae.preventDefault(), W.current.focus(), ye(!0, ae));
      },
      L = (ae) => {
        ye(!1, ae);
      },
      Te = C.Children.toArray(l),
      F = (ae) => {
        const Ee = Te.map((Ae) => Ae.props.value).indexOf(ae.target.value);
        if (Ee === -1) return;
        const we = Te[Ee];
        Q(we.props.value), y && y(ae, we);
      },
      G = (ae) => (Ee) => {
        let we;
        if (Ee.currentTarget.hasAttribute('tabindex')) {
          if (T) {
            we = Array.isArray(B) ? B.slice() : [];
            const Ae = B.indexOf(ae.props.value);
            Ae === -1 ? we.push(ae.props.value) : we.splice(Ae, 1);
          } else we = ae.props.value;
          if ((ae.props.onClick && ae.props.onClick(Ee), B !== we && (Q(we), y))) {
            const Ae = Ee.nativeEvent || Ee,
              ht = new Ae.constructor(Ae.type, Ae);
            Object.defineProperty(ht, 'target', {
              writable: !0,
              value: {
                value: we,
                name: w,
              },
            }),
              y(ht, ae);
          }
          T || ye(!1, Ee);
        }
      },
      De = (ae) => {
        $ ||
          ([
            ' ',
            'ArrowUp',
            'ArrowDown',
            // The native select doesn't respond to enter on macOS, but it's recommended by
            // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
            'Enter',
          ].indexOf(ae.key) !== -1 &&
            (ae.preventDefault(), ye(!0, ae)));
      },
      ge = te !== null && re,
      Le = (ae) => {
        !ge &&
          E &&
          (Object.defineProperty(ae, 'target', {
            writable: !0,
            value: {
              value: B,
              name: w,
            },
          }),
          E(ae));
      };
    delete V['aria-invalid'];
    let Ue, $e;
    const Me = [];
    let ct = !1,
      mt = !1;
    (us({
      value: B,
    }) ||
      b) &&
      (N ? (Ue = N(B)) : (ct = !0));
    const ie = Te.map((ae) => {
      if (!(/* @__PURE__ */ C.isValidElement(ae))) return null;
      process.env.NODE_ENV !== 'production' &&
        is.isFragment(ae) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let Ee;
      if (T) {
        if (!Array.isArray(B))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : Wn(2),
          );
        (Ee = B.some((we) => gc(we, ae.props.value))), Ee && ct && Me.push(ae.props.children);
      } else (Ee = gc(B, ae.props.value)), Ee && ct && ($e = ae.props.children);
      return (
        Ee && (mt = !0),
        /* @__PURE__ */ C.cloneElement(ae, {
          'aria-selected': Ee ? 'true' : 'false',
          onClick: G(ae),
          onKeyUp: (we) => {
            we.key === ' ' && we.preventDefault(), ae.props.onKeyUp && ae.props.onKeyUp(we);
          },
          role: 'option',
          selected: Ee,
          value: void 0,
          // The value is most likely not a valid HTML attribute.
          'data-value': ae.props.value,
          // Instead, we provide it as a data attribute.
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      C.useEffect(() => {
        if (!mt && !T && B !== '') {
          const ae = Te.map((Ee) => Ee.props.value);
          console.warn(
            [
              `MUI: You have provided an out-of-range value \`${B}\` for the select ${
                w ? `(name="${w}") ` : ''
              }component.`,
              "Consider providing a value that matches one of the available options or ''.",
              `The available values are ${
                ae
                  .filter((Ee) => Ee != null)
                  .map((Ee) => `\`${Ee}\``)
                  .join(', ') || '""'
              }.`,
            ].join(`
`),
          );
        }
      }, [mt, Te, T, w, B]),
      ct &&
        (T
          ? Me.length === 0
            ? (Ue = null)
            : (Ue = Me.reduce(
                (ae, Ee, we) => (ae.push(Ee), we < Me.length - 1 && ae.push(', '), ae),
                [],
              ))
          : (Ue = $e));
    let ve = ne;
    !s && K && te && (ve = ue.clientWidth);
    let Ce;
    typeof j < 'u' ? (Ce = j) : (Ce = p ? null : 0);
    const U = k.id || (w ? `mui-component-select-${w}` : void 0),
      pe = x({}, t, {
        variant: P,
        value: B,
        open: ge,
      }),
      de = $E(pe);
    return /* @__PURE__ */ Fe(C.Fragment, {
      children: [
        /* @__PURE__ */ I(
          RE,
          x(
            {
              ref: le,
              tabIndex: Ce,
              role: 'button',
              'aria-disabled': p ? 'true' : void 0,
              'aria-expanded': ge ? 'true' : 'false',
              'aria-haspopup': 'listbox',
              'aria-label': i,
              'aria-labelledby': [h, U].filter(Boolean).join(' ') || void 0,
              'aria-describedby': r,
              onKeyDown: De,
              onMouseDown: p || $ ? null : se,
              onBlur: Le,
              onFocus: O,
            },
            k,
            {
              ownerState: pe,
              className: xe(k.className, de.select, c),
              id: U,
              children: NE(Ue)
                ? // notranslate needed while Google Translate will not fix zero-width space issue
                  bc ||
                  (bc = /* @__PURE__ */ I('span', {
                    className: 'notranslate',
                    children: '​',
                  }))
                : Ue,
            },
          ),
        ),
        /* @__PURE__ */ I(
          kE,
          x(
            {
              value: Array.isArray(B) ? B.join(',') : B,
              name: w,
              ref: _,
              'aria-hidden': !0,
              onChange: F,
              tabIndex: -1,
              disabled: p,
              className: de.nativeInput,
              autoFocus: a,
              ownerState: pe,
            },
            V,
          ),
        ),
        /* @__PURE__ */ I(OE, {
          as: v,
          className: de.icon,
          ownerState: pe,
        }),
        /* @__PURE__ */ I(
          eE,
          x(
            {
              id: `menu-${w || ''}`,
              anchorEl: ue,
              open: ge,
              onClose: L,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            },
            f,
            {
              MenuListProps: x(
                {
                  'aria-labelledby': h,
                  role: 'listbox',
                  disableListWrap: !0,
                },
                f.MenuListProps,
              ),
              PaperProps: x({}, f.PaperProps, {
                style: x(
                  {
                    minWidth: ve,
                  },
                  f.PaperProps != null ? f.PaperProps.style : null,
                ),
              }),
              children: ie,
            },
          ),
        ),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (kd.propTypes = {
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
    inputRef: Ht,
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
const PE = kd;
var vc, yc;
const IE = [
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
  _E = (e) => {
    const { classes: t } = e;
    return t;
  },
  gs = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => wn(e) && e !== 'variant',
    slot: 'Root',
  },
  ME = be(md, gs)(''),
  AE = be(Od, gs)(''),
  DE = be(ld, gs)(''),
  vs = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
        IconComponent: d = Ju,
        id: p,
        input: b,
        inputProps: v,
        label: g,
        labelId: h,
        MenuProps: f,
        multiple: T = !1,
        native: w = !1,
        onClose: E,
        onOpen: y,
        open: m,
        renderValue: O,
        SelectDisplayProps: R,
        variant: D = 'outlined',
      } = r,
      $ = Se(r, IE),
      N = w ? mE : PE,
      k = oo(),
      z =
        Po({
          props: r,
          muiFormControl: k,
          states: ['variant'],
        }).variant || D,
      P =
        b ||
        {
          standard: vc || (vc = /* @__PURE__ */ I(ME, {})),
          outlined: /* @__PURE__ */ I(AE, {
            label: g,
          }),
          filled: yc || (yc = /* @__PURE__ */ I(DE, {})),
        }[z],
      V = x({}, r, {
        variant: z,
        classes: s,
      }),
      B = _E(V),
      Q = Rt(o, P.ref);
    return /* @__PURE__ */ I(C.Fragment, {
      children: /* @__PURE__ */ C.cloneElement(
        P,
        x(
          {
            // Most of the logic is implemented in `SelectInput`.
            // The `Select` component is a simple API wrapper to expose something better to play with.
            inputComponent: N,
            inputProps: x(
              {
                children: a,
                IconComponent: d,
                variant: z,
                type: void 0,
                // We render a select. We can ignore the type provided by the `Input`.
                multiple: T,
              },
              w
                ? {
                    id: p,
                  }
                : {
                    autoWidth: i,
                    defaultOpen: c,
                    displayEmpty: u,
                    labelId: h,
                    MenuProps: f,
                    onClose: E,
                    onOpen: y,
                    open: m,
                    renderValue: O,
                    SelectDisplayProps: x(
                      {
                        id: p,
                      },
                      R,
                    ),
                  },
              v,
              {
                classes: v ? ln(B, v.classes) : B,
              },
              b ? b.props.inputProps : {},
            ),
          },
          T && w && z === 'outlined'
            ? {
                notched: !0,
              }
            : {},
          {
            ref: Q,
            className: xe(P.props.className, l),
          },
          !b && {
            variant: z,
          },
          $,
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (vs.propTypes = {
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
vs.muiName = 'Select';
const LE = vs,
  FE = (e) => !e || !Vn(e),
  zE = FE;
function jE(e) {
  return We('MuiSlider', e);
}
const VE = Ve('MuiSlider', [
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
  vn = VE,
  BE = (e) => {
    const { open: t } = e;
    return {
      offset: xe(t && vn.valueLabelOpen),
      circle: vn.valueLabelCircle,
      label: vn.valueLabelLabel,
    };
  };
function Nd(e) {
  const { children: t, className: o, value: r } = e,
    i = BE(e);
  return t
    ? /* @__PURE__ */ C.cloneElement(
        t,
        {
          className: xe(t.props.className),
        },
        /* @__PURE__ */ Fe(C.Fragment, {
          children: [
            t.props.children,
            /* @__PURE__ */ I('span', {
              className: xe(i.offset, o),
              'aria-hidden': !0,
              children: /* @__PURE__ */ I('span', {
                className: i.circle,
                children: /* @__PURE__ */ I('span', {
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
  (Nd.propTypes = {
    children: n.element.isRequired,
    className: n.string,
    value: n.node,
  });
const WE = [
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
function xc(e) {
  return e;
}
const $d = be('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      t[`color${ce(o.color)}`],
      o.size !== 'medium' && t[`size${ce(o.size)}`],
      o.marked && t.marked,
      o.orientation === 'vertical' && t.vertical,
      o.track === 'inverted' && t.trackInverted,
      o.track === !1 && t.trackFalse,
    ];
  },
})(({ theme: e, ownerState: t }) =>
  x(
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
      x(
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
      x(
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
      [`&.${vn.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        color: (e.vars || e).palette.grey[400],
      },
      [`&.${vn.dragging}`]: {
        [`& .${vn.thumb}, & .${vn.track}`]: {
          transition: 'none',
        },
      },
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  ($d.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Pd = be('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (e, t) => t.rail,
})(({ ownerState: e }) =>
  x(
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
  (Pd.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Id = be('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (e, t) => t.track,
})(({ theme: e, ownerState: t }) => {
  const o =
    // Same logic as the LinearProgress track color
    e.palette.mode === 'light'
      ? Ci(e.palette[t.color].main, 0.62)
      : Ei(e.palette[t.color].main, 0.5);
  return x(
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
  (Id.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const _d = be('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.thumb,
      t[`thumbColor${ce(o.color)}`],
      o.size !== 'medium' && t[`thumbSize${ce(o.size)}`],
    ];
  },
})(({ theme: e, ownerState: t }) =>
  x(
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
      '&:before': x(
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
      [`&:hover, &.${vn.focusVisible}`]: {
        boxShadow: `0px 0px 0px 8px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : st(e.palette[t.color].main, 0.16)
        }`,
        '@media (hover: none)': {
          boxShadow: 'none',
        },
      },
      [`&.${vn.active}`]: {
        boxShadow: `0px 0px 0px 14px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : st(e.palette[t.color].main, 0.16)
        }`,
      },
      [`&.${vn.disabled}`]: {
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (_d.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Md = be(Nd, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) =>
  x(
    {
      [`&.${vn.valueLabelOpen}`]: {
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
  (Md.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Ad = be('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => Ja(e) && e !== 'markActive',
  overridesResolver: (e, t) => {
    const { markActive: o } = e;
    return [t.mark, o && t.markActive];
  },
})(({ theme: e, ownerState: t, markActive: o }) =>
  x(
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
  (Ad.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Dd = be('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => Ja(e) && e !== 'markLabelActive',
  overridesResolver: (e, t) => t.markLabel,
})(({ theme: e, ownerState: t, markLabelActive: o }) =>
  x(
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
  (Dd.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const UE = (e) => {
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
          l && `color${ce(l)}`,
          c && `size${ce(c)}`,
        ],
        rail: ['rail'],
        track: ['track'],
        mark: ['mark'],
        markActive: ['markActive'],
        markLabel: ['markLabel'],
        markLabelActive: ['markLabelActive'],
        valueLabel: ['valueLabel'],
        thumb: ['thumb', t && 'disabled', c && `thumbSize${ce(c)}`, l && `thumbColor${ce(l)}`],
        active: ['active'],
        disabled: ['disabled'],
        focusVisible: ['focusVisible'],
      };
    return Ye(u, jE, s);
  },
  HE = ({ children: e }) => e,
  Ld = /* @__PURE__ */ C.forwardRef(function (t, o) {
    var r, i, a, s, l, c, u, d, p, b, v, g, h, f, T, w, E, y, m, O, R, D, $, N;
    const k = Xe({
        props: t,
        name: 'MuiSlider',
      }),
      z = No().direction === 'rtl',
      {
        'aria-label': P,
        'aria-valuetext': V,
        'aria-labelledby': B,
        // eslint-disable-next-line react/prop-types
        component: Q = 'span',
        components: re = {},
        componentsProps: Z = {},
        color: _ = 'primary',
        classes: W,
        className: te,
        disableSwap: H = !1,
        disabled: K = !1,
        getAriaLabel: ne,
        getAriaValueText: ee,
        marks: oe = !1,
        max: le = 100,
        min: ue = 0,
        orientation: ye = 'horizontal',
        size: se = 'medium',
        step: L = 1,
        scale: Te = xc,
        slotProps: F,
        slots: G,
        track: De = 'normal',
        valueLabelDisplay: ge = 'off',
        valueLabelFormat: Le = xc,
      } = k,
      Ue = Se(k, WE),
      $e = x({}, k, {
        isRtl: z,
        max: le,
        min: ue,
        classes: W,
        disabled: K,
        disableSwap: H,
        orientation: ye,
        marks: oe,
        color: _,
        size: se,
        step: L,
        scale: Te,
        track: De,
        valueLabelDisplay: ge,
        valueLabelFormat: Le,
      }),
      {
        axisProps: Me,
        getRootProps: ct,
        getHiddenInputProps: mt,
        getThumbProps: ie,
        open: ve,
        active: Ce,
        axis: U,
        focusedThumbIndex: pe,
        range: de,
        dragging: ae,
        marks: Ee,
        values: we,
        trackOffset: Ae,
        trackLeap: ht,
      } = Ov(
        x({}, $e, {
          ref: o,
        }),
      );
    ($e.marked = Ee.length > 0 && Ee.some((A) => A.label)),
      ($e.dragging = ae),
      ($e.focusedThumbIndex = pe);
    const ut = UE($e),
      Pt = (r = (i = G == null ? void 0 : G.root) != null ? i : re.Root) != null ? r : $d,
      Qt = (a = (s = G == null ? void 0 : G.rail) != null ? s : re.Rail) != null ? a : Pd,
      It = (l = (c = G == null ? void 0 : G.track) != null ? c : re.Track) != null ? l : Id,
      Tt = (u = (d = G == null ? void 0 : G.thumb) != null ? d : re.Thumb) != null ? u : _d,
      St =
        (p = (b = G == null ? void 0 : G.valueLabel) != null ? b : re.ValueLabel) != null ? p : Md,
      gt = (v = (g = G == null ? void 0 : G.mark) != null ? g : re.Mark) != null ? v : Ad,
      Be = (h = (f = G == null ? void 0 : G.markLabel) != null ? f : re.MarkLabel) != null ? h : Dd,
      dt = (T = (w = G == null ? void 0 : G.input) != null ? w : re.Input) != null ? T : 'input',
      xt = (E = F == null ? void 0 : F.root) != null ? E : Z.root,
      en = (y = F == null ? void 0 : F.rail) != null ? y : Z.rail,
      At = (m = F == null ? void 0 : F.track) != null ? m : Z.track,
      tn = (O = F == null ? void 0 : F.thumb) != null ? O : Z.thumb,
      zt = (R = F == null ? void 0 : F.valueLabel) != null ? R : Z.valueLabel,
      nn = (D = F == null ? void 0 : F.mark) != null ? D : Z.mark,
      pn = ($ = F == null ? void 0 : F.markLabel) != null ? $ : Z.markLabel,
      fn = (N = F == null ? void 0 : F.input) != null ? N : Z.input,
      ft = rn({
        elementType: Pt,
        getSlotProps: ct,
        externalSlotProps: xt,
        externalForwardedProps: Ue,
        additionalProps: x(
          {},
          zE(Pt) && {
            as: Q,
          },
        ),
        ownerState: x({}, $e, xt == null ? void 0 : xt.ownerState),
        className: [ut.root, te],
      }),
      on = rn({
        elementType: Qt,
        externalSlotProps: en,
        ownerState: $e,
        className: ut.rail,
      }),
      je = rn({
        elementType: It,
        externalSlotProps: At,
        additionalProps: {
          style: x({}, Me[U].offset(Ae), Me[U].leap(ht)),
        },
        ownerState: x({}, $e, At == null ? void 0 : At.ownerState),
        className: ut.track,
      }),
      vt = rn({
        elementType: Tt,
        getSlotProps: ie,
        externalSlotProps: tn,
        ownerState: x({}, $e, tn == null ? void 0 : tn.ownerState),
        className: ut.thumb,
      }),
      Vt = rn({
        elementType: St,
        externalSlotProps: zt,
        ownerState: x({}, $e, zt == null ? void 0 : zt.ownerState),
        className: ut.valueLabel,
      }),
      S = rn({
        elementType: gt,
        externalSlotProps: nn,
        ownerState: $e,
        className: ut.mark,
      }),
      q = rn({
        elementType: Be,
        externalSlotProps: pn,
        ownerState: $e,
        className: ut.markLabel,
      }),
      fe = rn({
        elementType: dt,
        getSlotProps: mt,
        externalSlotProps: fn,
        ownerState: $e,
      });
    return /* @__PURE__ */ Fe(
      Pt,
      x({}, ft, {
        children: [
          /* @__PURE__ */ I(Qt, x({}, on)),
          /* @__PURE__ */ I(It, x({}, je)),
          Ee.filter((A) => A.value >= ue && A.value <= le).map((A, M) => {
            const X = Qr(A.value, ue, le),
              Y = Me[U].offset(X);
            let me;
            return (
              De === !1
                ? (me = we.indexOf(A.value) !== -1)
                : (me =
                    (De === 'normal' &&
                      (de ? A.value >= we[0] && A.value <= we[we.length - 1] : A.value <= we[0])) ||
                    (De === 'inverted' &&
                      (de ? A.value <= we[0] || A.value >= we[we.length - 1] : A.value >= we[0]))),
              /* @__PURE__ */ Fe(
                C.Fragment,
                {
                  children: [
                    /* @__PURE__ */ I(
                      gt,
                      x(
                        {
                          'data-index': M,
                        },
                        S,
                        !Vn(gt) && {
                          markActive: me,
                        },
                        {
                          style: x({}, Y, S.style),
                          className: xe(S.className, me && ut.markActive),
                        },
                      ),
                    ),
                    A.label != null
                      ? /* @__PURE__ */ I(
                          Be,
                          x(
                            {
                              'aria-hidden': !0,
                              'data-index': M,
                            },
                            q,
                            !Vn(Be) && {
                              markLabelActive: me,
                            },
                            {
                              style: x({}, Y, q.style),
                              className: xe(ut.markLabel, q.className, me && ut.markLabelActive),
                              children: A.label,
                            },
                          ),
                        )
                      : null,
                  ],
                },
                M,
              )
            );
          }),
          we.map((A, M) => {
            const X = Qr(A, ue, le),
              Y = Me[U].offset(X),
              me = ge === 'off' ? HE : St;
            return (
              /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
              /* @__PURE__ */ I(
                me,
                x(
                  {},
                  !Vn(me) && {
                    valueLabelFormat: Le,
                    valueLabelDisplay: ge,
                    value: typeof Le == 'function' ? Le(Te(A), M) : Le,
                    index: M,
                    open: ve === M || Ce === M || ge === 'on',
                    disabled: K,
                  },
                  Vt,
                  {
                    children: /* @__PURE__ */ I(
                      Tt,
                      x(
                        {
                          'data-index': M,
                        },
                        vt,
                        {
                          className: xe(
                            ut.thumb,
                            vt.className,
                            Ce === M && ut.active,
                            pe === M && ut.focusVisible,
                          ),
                          style: x(
                            {},
                            Y,
                            {
                              pointerEvents: H && Ce !== M ? 'none' : void 0,
                            },
                            vt.style,
                          ),
                          children: /* @__PURE__ */ I(
                            dt,
                            x(
                              {
                                'data-index': M,
                                'aria-label': ne ? ne(M) : P,
                                'aria-valuenow': Te(A),
                                'aria-labelledby': B,
                                'aria-valuetext': ee ? ee(Te(A), M) : V,
                                value: we[M],
                              },
                              fe,
                            ),
                          ),
                        },
                      ),
                    ),
                  },
                ),
                M,
              )
            );
          }),
        ],
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ld.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The label of the slider.
     */
    'aria-label': En(n.string, (e) =>
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
    'aria-valuetext': En(n.string, (e) =>
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
const qE = Ld;
function KE(e) {
  return We('MuiSnackbarContent', e);
}
Ve('MuiSnackbarContent', ['root', 'message', 'action']);
const YE = ['action', 'className', 'message', 'role'],
  GE = (e) => {
    const { classes: t } = e;
    return Ye(
      {
        root: ['root'],
        action: ['action'],
        message: ['message'],
      },
      KE,
      t,
    );
  },
  XE = be(mr, {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 0.8 : 0.98,
      o = nb(e.palette.background.default, t);
    return x({}, e.typography.body2, {
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
  JE = be('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({
    padding: '8px 0',
  }),
  ZE = be('div', {
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
  Fd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
        props: t,
        name: 'MuiSnackbarContent',
      }),
      { action: i, className: a, message: s, role: l = 'alert' } = r,
      c = Se(r, YE),
      u = r,
      d = GE(u);
    return /* @__PURE__ */ Fe(
      XE,
      x(
        {
          role: l,
          square: !0,
          elevation: 6,
          className: xe(d.root, a),
          ownerState: u,
          ref: o,
        },
        c,
        {
          children: [
            /* @__PURE__ */ I(JE, {
              className: d.message,
              ownerState: u,
              children: s,
            }),
            i
              ? /* @__PURE__ */ I(ZE, {
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
  (Fd.propTypes = {
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
const QE = Fd;
function eC(e) {
  return We('MuiSnackbar', e);
}
Ve('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const tC = ['onEnter', 'onExited'],
  nC = [
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
  oC = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = {
        root: ['root', `anchorOrigin${ce(o.vertical)}${ce(o.horizontal)}`],
      };
    return Ye(r, eC, t);
  },
  Ec = be('div', {
    name: 'MuiSnackbar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[`anchorOrigin${ce(o.anchorOrigin.vertical)}${ce(o.anchorOrigin.horizontal)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    const o = {
      left: '50%',
      right: 'auto',
      transform: 'translateX(-50%)',
    };
    return x(
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
        [e.breakpoints.up('sm')]: x(
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
  zd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
        props: t,
        name: 'MuiSnackbar',
      }),
      i = No(),
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
        ContentProps: v,
        disableWindowBlurListener: g = !1,
        message: h,
        open: f,
        TransitionComponent: T = fd,
        transitionDuration: w = a,
        TransitionProps: { onEnter: E, onExited: y } = {},
      } = r,
      m = Se(r.TransitionProps, tC),
      O = Se(r, nC),
      R = x({}, r, {
        anchorOrigin: {
          vertical: l,
          horizontal: c,
        },
        autoHideDuration: u,
        disableWindowBlurListener: g,
        TransitionComponent: T,
        transitionDuration: w,
      }),
      D = oC(R),
      { getRootProps: $, onClickAway: N } = kv(
        x({}, R, {
          ref: o,
        }),
      ),
      [k, j] = C.useState(!0),
      z = rn({
        elementType: Ec,
        getSlotProps: $,
        externalForwardedProps: O,
        ownerState: R,
        className: [D.root, p],
      }),
      P = (B) => {
        j(!0), y && y(B);
      },
      V = (B, Q) => {
        j(!1), E && E(B, Q);
      };
    return !f && k
      ? null
      : /* @__PURE__ */ I(
          Yr,
          x(
            {
              onClickAway: N,
            },
            b,
            {
              children: /* @__PURE__ */ I(
                Ec,
                x({}, z, {
                  children: /* @__PURE__ */ I(
                    T,
                    x(
                      {
                        appear: !0,
                        in: f,
                        timeout: w,
                        direction: l === 'top' ? 'down' : 'up',
                        onEnter: V,
                        onExited: P,
                      },
                      m,
                      {
                        children:
                          d ||
                          /* @__PURE__ */ I(
                            QE,
                            x(
                              {
                                message: h,
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
  (zd.propTypes = {
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
const rC = zd;
function iC(e) {
  return We('MuiSwitch', e);
}
const aC = Ve('MuiSwitch', [
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
  jt = aC,
  sC = ['className', 'color', 'edge', 'size', 'sx'],
  lC = (e) => {
    const { classes: t, edge: o, size: r, color: i, checked: a, disabled: s } = e,
      l = {
        root: ['root', o && `edge${ce(o)}`, `size${ce(r)}`],
        switchBase: ['switchBase', `color${ce(i)}`, a && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = Ye(l, iC, t);
    return x({}, t, c);
  },
  cC = be('span', {
    name: 'MuiSwitch',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.edge && t[`edge${ce(o.edge)}`], t[`size${ce(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    x(
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
        [`& .${jt.thumb}`]: {
          width: 16,
          height: 16,
        },
        [`& .${jt.switchBase}`]: {
          padding: 4,
          [`&.${jt.checked}`]: {
            transform: 'translateX(16px)',
          },
        },
      },
    ),
  ),
  uC = be(id, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        {
          [`& .${jt.input}`]: t.input,
        },
        o.color !== 'default' && t[`color${ce(o.color)}`],
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
      [`&.${jt.checked}`]: {
        transform: 'translateX(20px)',
      },
      [`&.${jt.disabled}`]: {
        color: e.vars
          ? e.vars.palette.Switch.defaultDisabledColor
          : `${e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[600]}`,
      },
      [`&.${jt.checked} + .${jt.track}`]: {
        opacity: 0.5,
      },
      [`&.${jt.disabled} + .${jt.track}`]: {
        opacity: e.vars
          ? e.vars.opacity.switchTrackDisabled
          : `${e.palette.mode === 'light' ? 0.12 : 0.2}`,
      },
      [`& .${jt.input}`]: {
        left: '-100%',
        width: '300%',
      },
    }),
    ({ theme: e, ownerState: t }) =>
      x(
        {
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
              : st(e.palette.action.active, e.palette.action.hoverOpacity),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
        t.color !== 'default' && {
          [`&.${jt.checked}`]: {
            color: (e.vars || e).palette[t.color].main,
            '&:hover': {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : st(e.palette[t.color].main, e.palette.action.hoverOpacity),
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            },
            [`&.${jt.disabled}`]: {
              color: e.vars
                ? e.vars.palette.Switch[`${t.color}DisabledColor`]
                : `${
                    e.palette.mode === 'light'
                      ? Ci(e.palette[t.color].main, 0.62)
                      : Ei(e.palette[t.color].main, 0.55)
                  }`,
            },
          },
          [`&.${jt.checked} + .${jt.track}`]: {
            backgroundColor: (e.vars || e).palette[t.color].main,
          },
        },
      ),
  ),
  dC = be('span', {
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
  pC = be('span', {
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
  jd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
        props: t,
        name: 'MuiSwitch',
      }),
      { className: i, color: a = 'primary', edge: s = !1, size: l = 'medium', sx: c } = r,
      u = Se(r, sC),
      d = x({}, r, {
        color: a,
        edge: s,
        size: l,
      }),
      p = lC(d),
      b = /* @__PURE__ */ I(pC, {
        className: p.thumb,
        ownerState: d,
      });
    return /* @__PURE__ */ Fe(cC, {
      className: xe(p.root, i),
      sx: c,
      ownerState: d,
      children: [
        /* @__PURE__ */ I(
          uC,
          x(
            {
              type: 'checkbox',
              icon: b,
              checkedIcon: b,
              ref: o,
              ownerState: d,
            },
            u,
            {
              classes: x({}, p, {
                root: p.switchBase,
              }),
            },
          ),
        ),
        /* @__PURE__ */ I(dC, {
          className: p.track,
          ownerState: d,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (jd.propTypes = {
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
    inputRef: Ht,
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
const fC = jd;
function mC(e) {
  return We('MuiTextField', e);
}
Ve('MuiTextField', ['root']);
const hC = [
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
  bC = {
    standard: md,
    filled: ld,
    outlined: Od,
  },
  gC = (e) => {
    const { classes: t } = e;
    return Ye(
      {
        root: ['root'],
      },
      mC,
      t,
    );
  },
  vC = be(ix, {
    name: 'MuiTextField',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Vd = /* @__PURE__ */ C.forwardRef(function (t, o) {
    const r = Xe({
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
        fullWidth: v = !1,
        helperText: g,
        id: h,
        InputLabelProps: f,
        inputProps: T,
        InputProps: w,
        inputRef: E,
        label: y,
        maxRows: m,
        minRows: O,
        multiline: R = !1,
        name: D,
        onBlur: $,
        onChange: N,
        onFocus: k,
        placeholder: j,
        required: z = !1,
        rows: P,
        select: V = !1,
        SelectProps: B,
        type: Q,
        value: re,
        variant: Z = 'outlined',
      } = r,
      _ = Se(r, hC),
      W = x({}, r, {
        autoFocus: a,
        color: c,
        disabled: d,
        error: p,
        fullWidth: v,
        multiline: R,
        required: z,
        select: V,
        variant: Z,
      }),
      te = gC(W);
    process.env.NODE_ENV !== 'production' &&
      V &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const H = {};
    Z === 'outlined' && (f && typeof f.shrink < 'u' && (H.notched = f.shrink), (H.label = y)),
      V && ((!B || !B.native) && (H.id = void 0), (H['aria-describedby'] = void 0));
    const K = Hc(h),
      ne = g && K ? `${K}-helper-text` : void 0,
      ee = y && K ? `${K}-label` : void 0,
      oe = bC[Z],
      le = /* @__PURE__ */ I(
        oe,
        x(
          {
            'aria-describedby': ne,
            autoComplete: i,
            autoFocus: a,
            defaultValue: u,
            fullWidth: v,
            multiline: R,
            name: D,
            rows: P,
            maxRows: m,
            minRows: O,
            type: Q,
            value: re,
            id: K,
            inputRef: E,
            onBlur: $,
            onChange: N,
            onFocus: k,
            placeholder: j,
            inputProps: T,
          },
          H,
          w,
        ),
      );
    return /* @__PURE__ */ Fe(
      vC,
      x(
        {
          className: xe(te.root, l),
          disabled: d,
          error: p,
          fullWidth: v,
          ref: o,
          required: z,
          color: c,
          variant: Z,
          ownerState: W,
        },
        _,
        {
          children: [
            y != null &&
              y !== '' &&
              /* @__PURE__ */ I(
                kx,
                x(
                  {
                    htmlFor: K,
                    id: ee,
                  },
                  f,
                  {
                    children: y,
                  },
                ),
              ),
            V
              ? /* @__PURE__ */ I(
                  LE,
                  x(
                    {
                      'aria-describedby': ne,
                      id: K,
                      labelId: ee,
                      value: re,
                      input: le,
                    },
                    B,
                    {
                      children: s,
                    },
                  ),
                )
              : le,
            g &&
              /* @__PURE__ */ I(
                dx,
                x(
                  {
                    id: ne,
                  },
                  b,
                  {
                    children: g,
                  },
                ),
              ),
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Vd.propTypes = {
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
    inputRef: Ht,
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
const Bd = Vd;
function po({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: i }) {
  return /* @__PURE__ */ I(k0, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: i,
  });
}
var ho = /* @__PURE__ */ ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(ho || {});
function yC({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = ho.After,
  isIndeterminate: r = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const u = /* @__PURE__ */ I(H0, {
    checked: e,
    indeterminate: r,
    defaultChecked: i,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let d;
  if (t) {
    const p = o === ho.Before || o === ho.Above,
      b = /* @__PURE__ */ I('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      v = o === ho.Before || o === ho.After,
      g = v ? b : /* @__PURE__ */ I('div', { children: b }),
      h = v ? u : /* @__PURE__ */ I('div', { children: u });
    d = /* @__PURE__ */ Fe(pd, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: a,
      error: s,
      children: [p && g, h, !p && g],
    });
  } else d = u;
  return d;
}
function xC({
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
  return /* @__PURE__ */ I(d0, {
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
      /* @__PURE__ */ I(Bd, {
        ...b,
        error: r,
        fullWidth: i,
        disabled: t,
        label: e,
        style: { width: a },
      }),
  });
}
var EC = Object.defineProperty,
  CC = (e, t, o) =>
    t in e ? EC(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (e[t] = o),
  _e = (e, t, o) => (CC(e, typeof t != 'symbol' ? t + '' : t, o), o);
const vo = class {
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
    return o < 0 || o >= vo.allBookIds.length ? t : vo.allBookIds[o];
  }
  /**
   * Gets the English book name from its book number.
   * @param number - Book number (this is 1-based, not an index).
   * @returns The English name of the book if found, or `'******'` otherwise.
   */
  static bookNumberToEnglishName(e) {
    return e <= 0 || e > this.lastBook ? '******' : vo.allBookEnglishNames[e - 1];
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
let Mt = vo;
_e(Mt, 'allBookIds', [
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
  _e(Mt, 'nonCanonicalIds', [
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
  _e(Mt, 'firstBook', 1),
  _e(Mt, 'lastBook', vo.allBookIds.length)
  /**
   * Array of the English names of all books.
   */,
  _e(Mt, 'allBookEnglishNames', [
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
  _e(Mt, 'bookNumbers', vo.createBookNumbers());
var Fn = /* @__PURE__ */ ((e) => (
  (e[(e.Unknown = 0)] = 'Unknown'),
  (e[(e.Original = 1)] = 'Original'),
  (e[(e.Septuagint = 2)] = 'Septuagint'),
  (e[(e.Vulgate = 3)] = 'Vulgate'),
  (e[(e.English = 4)] = 'English'),
  (e[(e.RussianProtestant = 5)] = 'RussianProtestant'),
  (e[(e.RussianOrthodox = 6)] = 'RussianOrthodox'),
  e
))(Fn || {});
const Gn = class {
  // private versInfo: Versification;
  constructor(e) {
    if (
      (_e(this, 'name'),
      _e(this, 'fullPath'),
      _e(this, 'isPresent'),
      _e(this, 'hasVerseSegments'),
      _e(this, 'isCustomized'),
      _e(this, 'baseVersification'),
      _e(this, 'scriptureBooks'),
      _e(this, '_type'),
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
let hn = Gn;
_e(hn, 'Original', new Gn(Fn.Original)),
  _e(hn, 'Septuagint', new Gn(Fn.Septuagint)),
  _e(hn, 'Vulgate', new Gn(Fn.Vulgate)),
  _e(hn, 'English', new Gn(Fn.English)),
  _e(hn, 'RussianProtestant', new Gn(Fn.RussianProtestant)),
  _e(hn, 'RussianOrthodox', new Gn(Fn.RussianOrthodox));
function Cc(e, t) {
  const o = t[0];
  for (let r = 1; r < t.length; r++) e = e.split(t[r]).join(o);
  return e.split(o);
}
var Wd = /* @__PURE__ */ ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(Wd || {});
const He = class {
  constructor(e, t, o, r) {
    if (
      (_e(this, 'firstChapter'),
      _e(this, 'lastChapter'),
      _e(this, 'lastVerse'),
      _e(this, 'hasSegmentsDefined'),
      _e(this, 'text'),
      _e(this, 'BBBCCCVVVS'),
      _e(this, 'longHashCode'),
      _e(this, 'versification'),
      _e(this, 'rtlMark', '‏'),
      _e(this, '_bookNum', 0),
      _e(this, '_chapterNum', 0),
      _e(this, '_verseNum', 0),
      _e(this, '_verse'),
      o == null && r == null)
    )
      if (e != null && typeof e == 'string') {
        const i = e,
          a = t != null && t instanceof hn ? t : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t == null)
        if (e != null && e instanceof He) {
          const i = e;
          (this._bookNum = i.bookNum),
            (this._chapterNum = i.chapterNum),
            (this._verseNum = i.verseNum),
            (this._verse = i.verse),
            (this.versification = i.versification);
        } else {
          if (e == null) return;
          const i = e instanceof hn ? e : He.defaultVersification;
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
          (this.versification = r ?? He.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, t = He.defaultVersification) {
    const o = new He(t);
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
      return (t = He.parse(e)), { success: !0, verseRef: t };
    } catch (o) {
      if (o instanceof Uo) return (t = new He()), { success: !1, verseRef: t };
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
      (e % He.bcvMaxValue) * He.bookDigitShifter +
      (t >= 0 ? (t % He.bcvMaxValue) * He.chapterDigitShifter : 0) +
      (o >= 0 ? o % He.bcvMaxValue : 0)
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
      if (((t = t * 10 + +o - +'0'), t > He.bcvMaxValue)) return (t = -1), { success: !1, vNum: t };
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
      (this._verse.includes(He.verseRangeSeparator) ||
        this._verse.includes(He.verseSequenceIndicator))
    );
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Mt.bookNumberToId(this.bookNum, '');
  }
  set book(e) {
    this.bookNum = Mt.bookIdToNumber(e);
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
    const { success: t, vNum: o } = He.tryGetVerseNum(e);
    (this._verse = t ? void 0 : e.replace(this.rtlMark, '')),
      (this._verseNum = o),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = He.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > Mt.lastBook)
      throw new Uo('BookNum must be greater than zero and less than or equal to last book');
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
    this.versification = this.versification != null ? new hn(e) : void 0;
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
    return this.validateVerse(He.verseRangeSeparators, He.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return He.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return He.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new hn(Fn[a]);
        } catch {
          throw new Uo('Invalid reference : ' + e);
        }
    }
    const t = e.trim().split(' ');
    if (t.length !== 2) throw new Uo('Invalid reference : ' + e);
    const o = t[1].split(':'),
      r = +o[0];
    if (
      o.length !== 2 ||
      Mt.bookIdToNumber(t[0]) === 0 ||
      !Number.isInteger(r) ||
      r < 0 ||
      !He.isVerseParseable(o[1])
    )
      throw new Uo('Invalid reference : ' + e);
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
    return new He(this);
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
  allVerses(e = !1, t = He.verseRangeSeparators, o = He.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const r = [],
      i = Cc(this._verse, o);
    for (const a of i.map((s) => Cc(s, t))) {
      const s = this.clone();
      s.verse = a[0];
      const l = s.verseNum;
      if ((r.push(s), a.length > 1)) {
        const c = this.clone();
        if (((c.verse = a[1]), !e))
          for (let u = l + 1; u < c.verseNum; u++) {
            const d = new He(this._bookNum, this._chapterNum, u, this.versification);
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
      : this._bookNum <= 0 || this._bookNum > Mt.lastBook
      ? 2
      : 0;
  }
  setEmpty(e = He.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = e);
  }
  updateInternal(e, t, o) {
    (this.bookNum = Mt.bookIdToNumber(e)), (this.chapter = t), (this.verse = o);
  }
};
let _n = He;
_e(_n, 'defaultVersification', hn.English),
  _e(_n, 'verseRangeSeparator', '-'),
  _e(_n, 'verseSequenceIndicator', ','),
  _e(_n, 'verseRangeSeparators', [He.verseRangeSeparator]),
  _e(_n, 'verseSequenceIndicators', [He.verseSequenceIndicator]),
  _e(_n, 'chapterDigitShifter', 1e3),
  _e(_n, 'bookDigitShifter', He.chapterDigitShifter * He.chapterDigitShifter),
  _e(_n, 'bcvMaxValue', He.chapterDigitShifter - 1)
  /**
   * The valid status of the VerseRef.
   */,
  _e(_n, 'ValidStatusType', Wd);
class Uo extends Error {}
const Ud = [
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
function wc() {
  return Mt.allBookIds.map((e) => ({
    bookId: e,
    label: Mt.bookIdToEnglishName(e),
  }));
}
function Tc(e) {
  return {
    bookId: Mt.bookNumberToId(e),
    label: Mt.bookNumberToEnglishName(e),
  };
}
const Hd = 1,
  wC = Ud.length - 1,
  qd = 1,
  Kd = 1,
  Yd = (e) => {
    var t;
    return ((t = Ud[e]) == null ? void 0 : t.chapters) ?? -1;
  },
  Sc = (e, t) => ({
    bookNum: Math.max(Hd, Math.min(e.bookNum + t, wC)),
    chapterNum: 1,
    verseNum: 1,
  }),
  Rc = (e, t) => ({
    ...e,
    chapterNum: Math.min(Math.max(qd, e.chapterNum + t), Yd(e.bookNum)),
    verseNum: 1,
  }),
  Oc = (e, t) => ({
    ...e,
    verseNum: Math.max(Kd, e.verseNum + t),
  });
function Ra({
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
  onBlur: v,
}) {
  return /* @__PURE__ */ I(Bd, {
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
    onBlur: v,
  });
}
function Rw({ scrRef: e, handleSubmit: t }) {
  const [o, r] = Kt(Tc(e.bookNum)),
    i = (c) => {
      r(Tc(c.bookNum)), t(c);
    },
    a = (c, u) => {
      const p = { bookNum: Mt.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
      i(p);
    },
    s = (c) => {
      t({ ...e, chapterNum: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verseNum: +c.target.value });
    };
  return /* @__PURE__ */ Fe(sr, {
    children: [
      /* @__PURE__ */ I(xC, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: wc(),
        onChange: a,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ I(po, {
        onClick: () => i(Sc(e, -1)),
        isDisabled: e.bookNum <= Hd,
        children: '<',
      }),
      /* @__PURE__ */ I(po, {
        onClick: () => i(Sc(e, 1)),
        isDisabled: e.bookNum >= wc().length,
        children: '>',
      }),
      /* @__PURE__ */ I(Ra, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: s,
      }),
      /* @__PURE__ */ I(po, {
        onClick: () => t(Rc(e, -1)),
        isDisabled: e.chapterNum <= qd,
        children: '<',
      }),
      /* @__PURE__ */ I(po, {
        onClick: () => t(Rc(e, 1)),
        isDisabled: e.chapterNum >= Yd(e.bookNum),
        children: '>',
      }),
      /* @__PURE__ */ I(Ra, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: l,
      }),
      /* @__PURE__ */ I(po, {
        onClick: () => t(Oc(e, -1)),
        isDisabled: e.verseNum <= Kd,
        children: '<',
      }),
      /* @__PURE__ */ I(po, { onClick: () => t(Oc(e, 1)), children: '>' }),
    ],
  });
}
function Ow({
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
  return /* @__PURE__ */ I(qE, {
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
function kw({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: i }) {
  return /* @__PURE__ */ I(fC, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: i,
  });
}
function Nw({
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
  return /* @__PURE__ */ I(rC, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: i,
    ContentProps: a,
    children: s,
  });
}
function $w({
  hasAutoFocus: e = !1,
  className: t,
  isDense: o = !1,
  hasDisabledGutters: r = !1,
  hasDivider: i = !1,
  focusVisibleClassName: a,
  onClick: s,
  children: l,
}) {
  return /* @__PURE__ */ I(sE, {
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
function sn(e, t, o) {
  const r = typeof e.colSpan == 'function' ? e.colSpan(o) : 1;
  if (Number.isInteger(r) && r > 1 && (!e.frozen || e.idx + r - 1 <= t)) return r;
}
function Br(e) {
  e == null ||
    e.scrollIntoView({
      inline: 'nearest',
      block: 'nearest',
    });
}
function Zo(e) {
  let t = !1;
  const o = {
    ...e,
    preventGridDefault() {
      t = !0;
    },
    isGridDefaultPrevented() {
      return t;
    },
  };
  return Object.setPrototypeOf(o, Object.getPrototypeOf(e)), o;
}
const TC = /* @__PURE__ */ new Set([
  'Unidentified',
  'Alt',
  'AltGraph',
  'CapsLock',
  'Control',
  'Fn',
  'FnLock',
  'Meta',
  'NumLock',
  'ScrollLock',
  'Shift',
  'Tab',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'End',
  'Home',
  'PageDown',
  'PageUp',
  'Insert',
  'ContextMenu',
  'Escape',
  'Pause',
  'Play',
  'PrintScreen',
  'F1',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
]);
function kc(e) {
  return (e.ctrlKey || e.metaKey) && e.key !== 'Control';
}
function SC(e) {
  return !TC.has(e.key);
}
function RC({ key: e, target: t }) {
  return e === 'Tab' &&
    (t instanceof HTMLInputElement ||
      t instanceof HTMLTextAreaElement ||
      t instanceof HTMLSelectElement)
    ? t.matches(
        '.rdg-editor-container > :only-child, .rdg-editor-container > label:only-child > :only-child, .rdg-editor-container > div:only-child > label:only-child > :only-child',
      )
    : !1;
}
const OC = 'm1l09lto7-0-0-beta-33';
function kC(e) {
  return e.map(({ key: t, idx: o, minWidth: r, maxWidth: i }) =>
    /* @__PURE__ */ I(
      'div',
      {
        className: OC,
        style: {
          gridColumnStart: o + 1,
          minWidth: r,
          maxWidth: i,
        },
        'data-measuring-cell-key': t,
      },
      t,
    ),
  );
}
function NC({ selectedPosition: e, columns: t, rows: o, isGroupRow: r }) {
  const i = t[e.idx],
    a = o[e.rowIdx];
  return !r(a) && Gd(i, a);
}
function Gd(e, t) {
  return (
    e.renderEditCell != null &&
    !e.rowGroup &&
    (typeof e.editable == 'function' ? e.editable(t) : e.editable) !== !1
  );
}
function $C({
  rows: e,
  topSummaryRows: t,
  bottomSummaryRows: o,
  rowIdx: r,
  lastFrozenColumnIndex: i,
  column: a,
  isGroupRow: s,
}) {
  const l = (t == null ? void 0 : t.length) ?? 0,
    c = -1 - l;
  if (r === c)
    return sn(a, i, {
      type: 'HEADER',
    });
  if (t && r > c && r <= l + c)
    return sn(a, i, {
      type: 'SUMMARY',
      row: t[r + l],
    });
  if (r >= 0 && r < e.length) {
    const u = e[r];
    return s(u)
      ? void 0
      : sn(a, i, {
          type: 'ROW',
          row: u,
        });
  }
  if (o)
    return sn(a, i, {
      type: 'SUMMARY',
      row: o[r - e.length],
    });
}
function PC({
  cellNavigationMode: e,
  columns: t,
  colSpanColumns: o,
  rows: r,
  topSummaryRows: i,
  bottomSummaryRows: a,
  minRowIdx: s,
  maxRowIdx: l,
  currentPosition: { idx: c },
  nextPosition: u,
  lastFrozenColumnIndex: d,
  isCellWithinBounds: p,
  isGroupRow: b,
}) {
  let { idx: v, rowIdx: g } = u;
  const h = (f) => {
    if (g >= 0 && g < r.length) {
      const T = r[g];
      if (b(T)) return;
    }
    for (const T of o) {
      const w = T.idx;
      if (w > v) break;
      const E = $C({
        rows: r,
        topSummaryRows: i,
        bottomSummaryRows: a,
        rowIdx: g,
        lastFrozenColumnIndex: d,
        column: T,
        isGroupRow: b,
      });
      if (E && v > w && v < E + w) {
        v = w + (f ? E : 0);
        break;
      }
    }
  };
  if ((p(u) && h(v - c > 0), e === 'CHANGE_ROW')) {
    const f = t.length;
    v === f
      ? g === l || ((v = 0), (g += 1))
      : v === -1 && (g === s || ((g -= 1), (v = f - 1)), h(!1));
  }
  return {
    idx: v,
    rowIdx: g,
  };
}
function IC({
  maxColIdx: e,
  minRowIdx: t,
  maxRowIdx: o,
  selectedPosition: { rowIdx: r, idx: i },
  shiftKey: a,
}) {
  return a ? i === 0 && r === t : i === e && r === o;
}
const _C = 'c1wupbe7-0-0-beta-33',
  MC = `rdg-cell ${_C}`,
  AC = 'cd0kgiy7-0-0-beta-33',
  DC = `rdg-cell-frozen ${AC}`,
  LC = 'c1730fa47-0-0-beta-33',
  FC = `rdg-cell-frozen-last ${LC}`;
function Ii(e, t) {
  return t !== void 0
    ? {
        '--rdg-grid-row-start': e,
        '--rdg-row-height': `${t}px`,
      }
    : {
        '--rdg-grid-row-start': e,
      };
}
function hr(e, t) {
  return {
    gridColumnStart: e.idx + 1,
    gridColumnEnd: t !== void 0 ? `span ${t}` : void 0,
    insetInlineStart: e.frozen ? `var(--rdg-frozen-left-${e.idx})` : void 0,
  };
}
function br(e, ...t) {
  return xe(MC, ...t, e.frozen && DC, e.isLastFrozenColumn && FC);
}
const { min: ir, max: ni, round: Pw, floor: Nc, sign: zC, abs: jC } = Math;
function ra(e) {
  if (typeof e != 'function')
    throw new Error('Please specify the rowKeyGetter prop to use selection');
}
function Xd(e, { minWidth: t, maxWidth: o }) {
  return (e = ni(e, t)), typeof o == 'number' && o >= t ? ir(e, o) : e;
}
const VC = 'c1hs68w07-0-0-beta-33',
  BC = `rdg-checkbox-label ${VC}`,
  WC = 'cojpd0n7-0-0-beta-33',
  UC = `rdg-checkbox-input ${WC}`,
  HC = 'cwsfieb7-0-0-beta-33',
  qC = `rdg-checkbox ${HC}`,
  KC = 'c1fgadbl7-0-0-beta-33',
  YC = `rdg-checkbox-label-disabled ${KC}`;
function GC({ onChange: e, ...t }) {
  function o(r) {
    e(r.target.checked, r.nativeEvent.shiftKey);
  }
  return /* @__PURE__ */ Fe('label', {
    className: xe(BC, t.disabled && YC),
    children: [
      /* @__PURE__ */ I('input', {
        type: 'checkbox',
        ...t,
        className: UC,
        onChange: o,
      }),
      /* @__PURE__ */ I('div', {
        className: qC,
      }),
    ],
  });
}
const XC = 'g1w3c5217-0-0-beta-33',
  JC = `rdg-group-cell-content ${XC}`,
  ZC = 'cm5tyhw7-0-0-beta-33',
  QC = `rdg-caret ${ZC}`;
function e1(e) {
  return /* @__PURE__ */ I(t1, {
    ...e,
  });
}
function t1({ groupKey: e, isExpanded: t, tabIndex: o, toggleGroup: r }) {
  function i({ key: s }) {
    s === 'Enter' && r();
  }
  return /* @__PURE__ */ Fe('span', {
    className: JC,
    tabIndex: o,
    onKeyDown: i,
    children: [
      e,
      /* @__PURE__ */ I('svg', {
        viewBox: '0 0 14 8',
        width: '14',
        height: '8',
        className: QC,
        'aria-hidden': !0,
        children: /* @__PURE__ */ I('path', {
          d: t ? 'M1 1 L 7 7 L 13 1' : 'M1 7 L 7 1 L 13 7',
        }),
      }),
    ],
  });
}
function n1(e) {
  try {
    return e.row[e.column.key];
  } catch {
    return null;
  }
}
const Jd = /* @__PURE__ */ ar(void 0),
  o1 = Jd.Provider;
function ys() {
  return Bn(Jd);
}
function xs({
  value: e,
  tabIndex: t,
  disabled: o,
  onChange: r,
  'aria-label': i,
  'aria-labelledby': a,
}) {
  const s = ys().renderCheckbox;
  return s({
    'aria-label': i,
    'aria-labelledby': a,
    tabIndex: t,
    disabled: o,
    checked: e,
    onChange: r,
  });
}
const Zd = /* @__PURE__ */ ar(void 0),
  Es = Zd.Provider,
  Qd = /* @__PURE__ */ ar(void 0),
  r1 = Qd.Provider;
function Cs() {
  const e = Bn(Zd),
    t = Bn(Qd);
  if (e === void 0 || t === void 0)
    throw new Error('useRowSelection must be used within DataGrid cells');
  return [e, t];
}
const oi = 'select-row';
function i1(e) {
  const [t, o] = Cs();
  return /* @__PURE__ */ I(xs, {
    'aria-label': 'Select All',
    tabIndex: e.tabIndex,
    value: t,
    onChange: (r) => {
      o({
        type: 'HEADER',
        checked: r,
      });
    },
  });
}
function a1(e) {
  const [t, o] = Cs();
  return /* @__PURE__ */ I(xs, {
    'aria-label': 'Select',
    tabIndex: e.tabIndex,
    value: t,
    onChange: (r, i) => {
      o({
        type: 'ROW',
        row: e.row,
        checked: r,
        isShiftClick: i,
      });
    },
  });
}
function s1(e) {
  const [t, o] = Cs();
  return /* @__PURE__ */ I(xs, {
    'aria-label': 'Select Group',
    tabIndex: e.tabIndex,
    value: t,
    onChange: (r) => {
      o({
        type: 'ROW',
        row: e.row,
        checked: r,
        isShiftClick: !1,
      });
    },
  });
}
const l1 = {
    key: oi,
    name: '',
    width: 35,
    minWidth: 35,
    maxWidth: 35,
    resizable: !1,
    sortable: !1,
    frozen: !0,
    renderHeaderCell(e) {
      return /* @__PURE__ */ I(i1, {
        ...e,
      });
    },
    renderCell(e) {
      return /* @__PURE__ */ I(a1, {
        ...e,
      });
    },
    renderGroupCell(e) {
      return /* @__PURE__ */ I(s1, {
        ...e,
      });
    },
  },
  c1 = 'auto',
  u1 = 50;
function d1({
  rawColumns: e,
  measuredColumnWidths: t,
  resizedColumnWidths: o,
  viewportWidth: r,
  scrollLeft: i,
  defaultColumnOptions: a,
  rawGroupBy: s,
  enableVirtualization: l,
}) {
  const c = (a == null ? void 0 : a.width) ?? c1,
    u = (a == null ? void 0 : a.minWidth) ?? u1,
    d = (a == null ? void 0 : a.maxWidth) ?? void 0,
    p = (a == null ? void 0 : a.renderCell) ?? n1,
    b = (a == null ? void 0 : a.sortable) ?? !1,
    v = (a == null ? void 0 : a.resizable) ?? !1,
    {
      columns: g,
      colSpanColumns: h,
      lastFrozenColumnIndex: f,
      groupBy: T,
    } = yn(() => {
      const D = [];
      let $ = -1;
      const N = e.map((j) => {
        const z = (s == null ? void 0 : s.includes(j.key)) ?? !1,
          P = z || j.frozen || !1,
          V = {
            ...j,
            idx: 0,
            frozen: P,
            isLastFrozenColumn: !1,
            rowGroup: z,
            width: j.width ?? c,
            minWidth: j.minWidth ?? u,
            maxWidth: j.maxWidth ?? d,
            sortable: j.sortable ?? b,
            resizable: j.resizable ?? v,
            renderCell: j.renderCell ?? p,
          };
        return z && (V.renderGroupCell ?? (V.renderGroupCell = e1)), P && $++, V;
      });
      N.sort(({ key: j, frozen: z }, { key: P, frozen: V }) =>
        j === oi
          ? -1
          : P === oi
          ? 1
          : s != null && s.includes(j)
          ? s.includes(P)
            ? s.indexOf(j) - s.indexOf(P)
            : -1
          : s != null && s.includes(P)
          ? 1
          : z
          ? V
            ? 0
            : -1
          : V
          ? 1
          : 0,
      );
      const k = [];
      return (
        N.forEach((j, z) => {
          (j.idx = z), j.rowGroup && D.push(j.key), j.colSpan != null && k.push(j);
        }),
        $ !== -1 && (N[$].isLastFrozenColumn = !0),
        {
          columns: N,
          colSpanColumns: k,
          lastFrozenColumnIndex: $,
          groupBy: D,
        }
      );
    }, [e, c, u, d, p, v, b, s]),
    {
      templateColumns: w,
      layoutCssVars: E,
      totalFrozenColumnWidth: y,
      columnMetrics: m,
    } = yn(() => {
      const D = /* @__PURE__ */ new Map();
      let $ = 0,
        N = 0;
      const k = [];
      for (const z of g) {
        let P = o.get(z.key) ?? t.get(z.key) ?? z.width;
        typeof P == 'number' ? (P = Xd(P, z)) : (P = z.minWidth),
          k.push(`${P}px`),
          D.set(z, {
            width: P,
            left: $,
          }),
          ($ += P);
      }
      if (f !== -1) {
        const z = D.get(g[f]);
        N = z.left + z.width;
      }
      const j = {};
      for (let z = 0; z <= f; z++) {
        const P = g[z];
        j[`--rdg-frozen-left-${P.idx}`] = `${D.get(P).left}px`;
      }
      return {
        templateColumns: k,
        layoutCssVars: j,
        totalFrozenColumnWidth: N,
        columnMetrics: D,
      };
    }, [t, o, g, f]),
    [O, R] = yn(() => {
      if (!l) return [0, g.length - 1];
      const D = i + y,
        $ = i + r,
        N = g.length - 1,
        k = ir(f + 1, N);
      if (D >= $) return [k, k];
      let j = k;
      for (; j < N; ) {
        const { left: B, width: Q } = m.get(g[j]);
        if (B + Q > D) break;
        j++;
      }
      let z = j;
      for (; z < N; ) {
        const { left: B, width: Q } = m.get(g[z]);
        if (B + Q >= $) break;
        z++;
      }
      const P = ni(k, j - 1),
        V = ir(N, z + 1);
      return [P, V];
    }, [m, g, f, i, y, r, l]);
  return {
    columns: g,
    colSpanColumns: h,
    colOverscanStartIdx: O,
    colOverscanEndIdx: R,
    templateColumns: w,
    layoutCssVars: E,
    lastFrozenColumnIndex: f,
    totalFrozenColumnWidth: y,
    groupBy: T,
  };
}
const Ro = typeof window > 'u' ? Na : Ac;
function p1(e, t, o, r, i, a, s, l, c, u) {
  const d = bn(i),
    p = e.length === t.length,
    b = p && i !== d.current,
    v = [...o],
    g = [];
  for (const { key: w, idx: E, width: y } of t)
    typeof y == 'string' && (b || !s.has(w)) && !a.has(w) && ((v[E] = y), g.push(w));
  const h = v.join(' ');
  Ro(() => {
    (d.current = i), f(g);
  });
  function f(w) {
    w.length !== 0 &&
      c((E) => {
        const y = new Map(E);
        let m = !1;
        for (const O of w) {
          const R = $c(r, O);
          m || (m = R !== E.get(O)), R === void 0 ? y.delete(O) : y.set(O, R);
        }
        return m ? y : E;
      });
  }
  function T(w, E) {
    const { key: y } = w,
      m = [...o],
      O = [];
    for (const { key: D, idx: $, width: N } of t)
      if (y === D) {
        const k = typeof E == 'number' ? `${E}px` : E;
        m[$] = k;
      } else p && typeof N == 'string' && !a.has(D) && ((m[$] = N), O.push(D));
    r.current.style.gridTemplateColumns = m.join(' ');
    const R = typeof E == 'number' ? E : $c(r, y);
    Wr(() => {
      l((D) => {
        const $ = new Map(D);
        return $.set(y, R), $;
      }),
        f(O);
    }),
      u == null || u(w.idx, R);
  }
  return {
    gridTemplateColumns: h,
    handleColumnResize: T,
  };
}
function $c(e, t) {
  const o = `[data-measuring-cell-key="${CSS.escape(t)}"]`,
    r = e.current.querySelector(o);
  return r == null ? void 0 : r.getBoundingClientRect().width;
}
function f1() {
  const e = bn(null),
    [t, o] = Kt(1),
    [r, i] = Kt(1);
  return (
    Ro(() => {
      const { ResizeObserver: a } = window;
      if (a == null) return;
      const { clientWidth: s, clientHeight: l, offsetWidth: c, offsetHeight: u } = e.current,
        { width: d, height: p } = e.current.getBoundingClientRect(),
        b = d - c + s,
        v = p - u + l;
      o(b), i(v);
      const g = new a((h) => {
        const f = h[0].contentBoxSize[0];
        Wr(() => {
          o(f.inlineSize), i(f.blockSize);
        });
      });
      return (
        g.observe(e.current),
        () => {
          g.disconnect();
        }
      );
    }, []),
    [e, t, r]
  );
}
function qt(e) {
  const t = bn(e);
  Na(() => {
    t.current = e;
  });
  const o = Dc((...r) => {
    t.current(...r);
  }, []);
  return e && o;
}
function _i(e) {
  const [t, o] = Kt(!1);
  t && !e && o(!1);
  function r(a) {
    a.target !== a.currentTarget && o(!0);
  }
  return {
    tabIndex: e && !t ? 0 : -1,
    childTabIndex: e ? 0 : -1,
    onFocus: e ? r : void 0,
  };
}
function m1({
  columns: e,
  colSpanColumns: t,
  rows: o,
  topSummaryRows: r,
  bottomSummaryRows: i,
  colOverscanStartIdx: a,
  colOverscanEndIdx: s,
  lastFrozenColumnIndex: l,
  rowOverscanStartIdx: c,
  rowOverscanEndIdx: u,
  isGroupRow: d,
}) {
  const p = yn(() => {
    if (a === 0) return 0;
    let b = a;
    const v = (g, h) => (h !== void 0 && g + h > a ? ((b = g), !0) : !1);
    for (const g of t) {
      const h = g.idx;
      if (
        h >= b ||
        v(
          h,
          sn(g, l, {
            type: 'HEADER',
          }),
        )
      )
        break;
      for (let f = c; f <= u; f++) {
        const T = o[f];
        if (
          !d(T) &&
          v(
            h,
            sn(g, l, {
              type: 'ROW',
              row: T,
            }),
          )
        )
          break;
      }
      if (r != null) {
        for (const f of r)
          if (
            v(
              h,
              sn(g, l, {
                type: 'SUMMARY',
                row: f,
              }),
            )
          )
            break;
      }
      if (i != null) {
        for (const f of i)
          if (
            v(
              h,
              sn(g, l, {
                type: 'SUMMARY',
                row: f,
              }),
            )
          )
            break;
      }
    }
    return b;
  }, [c, u, o, r, i, a, l, t, d]);
  return yn(() => {
    const b = [];
    for (let v = 0; v <= s; v++) {
      const g = e[v];
      (v < p && !g.frozen) || b.push(g);
    }
    return b;
  }, [p, s, e]);
}
function h1(e) {
  return Array.isArray(e);
}
function b1({
  rawRows: e,
  rowHeight: t,
  clientHeight: o,
  scrollTop: r,
  groupBy: i,
  rowGrouper: a,
  expandedGroupIds: s,
  enableVirtualization: l,
}) {
  const [c, u] = yn(() => {
      if (i.length === 0 || a == null) return [void 0, e.length];
      const E = (y, [m, ...O], R) => {
        let D = 0;
        const $ = {};
        for (const [N, k] of Object.entries(a(y, m))) {
          const [j, z] = O.length === 0 ? [k, k.length] : E(k, O, R + D + 1);
          ($[N] = {
            childRows: k,
            childGroups: j,
            startRowIndex: R + D,
          }),
            (D += z + 1);
        }
        return [$, D];
      };
      return E(e, i, 0);
    }, [i, a, e]),
    [d, p] = yn(() => {
      const E = /* @__PURE__ */ new Set();
      if (!c) return [e, O];
      const y = [],
        m = (R, D, $) => {
          if (h1(R)) {
            y.push(...R);
            return;
          }
          Object.keys(R).forEach((N, k, j) => {
            const z = D !== void 0 ? `${D}__${N}` : N,
              P = (s == null ? void 0 : s.has(z)) ?? !1,
              { childRows: V, childGroups: B, startRowIndex: Q } = R[N],
              re = {
                id: z,
                parentId: D,
                groupKey: N,
                isExpanded: P,
                childRows: V,
                level: $,
                posInSet: k,
                startRowIndex: Q,
                setSize: j.length,
              };
            y.push(re), E.add(re), P && m(B, z, $ + 1);
          });
        };
      return m(c, void 0, 0), [y, O];
      function O(R) {
        return E.has(R);
      }
    }, [s, c, e]),
    {
      totalRowHeight: b,
      gridTemplateRows: v,
      getRowTop: g,
      getRowHeight: h,
      findRowIdx: f,
    } = yn(() => {
      if (typeof t == 'number')
        return {
          totalRowHeight: t * d.length,
          gridTemplateRows: ` repeat(${d.length}, ${t}px)`,
          getRowTop: (R) => R * t,
          getRowHeight: () => t,
          findRowIdx: (R) => Nc(R / t),
        };
      let E = 0,
        y = ' ';
      const m = d.map((R) => {
          const D = p(R)
              ? t({
                  type: 'GROUP',
                  row: R,
                })
              : t({
                  type: 'ROW',
                  row: R,
                }),
            $ = {
              top: E,
              height: D,
            };
          return (y += `${D}px `), (E += D), $;
        }),
        O = (R) => ni(0, ir(d.length - 1, R));
      return {
        totalRowHeight: E,
        gridTemplateRows: y,
        getRowTop: (R) => m[O(R)].top,
        getRowHeight: (R) => m[O(R)].height,
        findRowIdx(R) {
          let D = 0,
            $ = m.length - 1;
          for (; D <= $; ) {
            const N = D + Nc(($ - D) / 2),
              k = m[N].top;
            if (k === R) return N;
            if ((k < R ? (D = N + 1) : k > R && ($ = N - 1), D > $)) return $;
          }
          return 0;
        },
      };
    }, [p, t, d]);
  let T = 0,
    w = d.length - 1;
  if (l) {
    const y = f(r),
      m = f(r + o);
    (T = ni(0, y - 4)), (w = ir(d.length - 1, m + 4));
  }
  return {
    rowOverscanStartIdx: T,
    rowOverscanEndIdx: w,
    rows: d,
    rowsCount: u,
    totalRowHeight: b,
    gridTemplateRows: v,
    isGroupRow: p,
    getRowTop: g,
    getRowHeight: h,
    findRowIdx: f,
  };
}
const g1 = 'cadd3bp7-0-0-beta-33',
  v1 = `rdg-cell-drag-handle ${g1}`;
function y1({
  rows: e,
  columns: t,
  selectedPosition: o,
  latestDraggedOverRowIdx: r,
  isCellEditable: i,
  onRowsChange: a,
  onFill: s,
  setDragging: l,
  setDraggedOverRowIdx: c,
}) {
  function u(v) {
    if (v.buttons !== 1) return;
    l(!0), window.addEventListener('mouseover', g), window.addEventListener('mouseup', h);
    function g(f) {
      f.buttons !== 1 && h();
    }
    function h() {
      window.removeEventListener('mouseover', g),
        window.removeEventListener('mouseup', h),
        l(!1),
        d();
    }
  }
  function d() {
    const v = r.current;
    if (v === void 0) return;
    const { rowIdx: g } = o,
      h = g < v ? g + 1 : v,
      f = g < v ? v + 1 : g;
    b(h, f), c(void 0);
  }
  function p(v) {
    v.stopPropagation(), b(o.rowIdx + 1, e.length);
  }
  function b(v, g) {
    const { idx: h, rowIdx: f } = o,
      T = t[h],
      w = e[f],
      E = [...e],
      y = [];
    for (let m = v; m < g; m++)
      if (
        i({
          rowIdx: m,
          idx: h,
        })
      ) {
        const O = s({
          columnKey: T.key,
          sourceRow: w,
          targetRow: e[m],
        });
        O !== e[m] && ((E[m] = O), y.push(m));
      }
    y.length > 0 &&
      (a == null ||
        a(E, {
          indexes: y,
          column: T,
        }));
  }
  return /* @__PURE__ */ I('div', {
    className: v1,
    onMouseDown: u,
    onDoubleClick: p,
  });
}
const x1 = 'c1tngyp17-0-0-beta-33';
function E1({
  column: e,
  colSpan: t,
  row: o,
  rowIdx: r,
  onRowChange: i,
  closeEditor: a,
  onKeyDown: s,
  navigate: l,
}) {
  var T, w, E;
  const c = bn(),
    u = ((T = e.editorOptions) == null ? void 0 : T.commitOnOutsideClick) !== !1,
    d = qt(() => {
      v(!0, !1);
    });
  Na(() => {
    if (!u) return;
    function y() {
      c.current = requestAnimationFrame(d);
    }
    return (
      addEventListener('mousedown', y, {
        capture: !0,
      }),
      () => {
        removeEventListener('mousedown', y, {
          capture: !0,
        }),
          p();
      }
    );
  }, [u, d]);
  function p() {
    cancelAnimationFrame(c.current);
  }
  function b(y) {
    if (s) {
      const m = Zo(y);
      if (
        (s(
          {
            mode: 'EDIT',
            row: o,
            column: e,
            rowIdx: r,
            navigate() {
              l(y);
            },
            onClose: v,
          },
          m,
        ),
        m.isGridDefaultPrevented())
      )
        return;
    }
    y.key === 'Escape' ? v() : y.key === 'Enter' ? v(!0) : RC(y) && l(y);
  }
  function v(y = !1, m = !0) {
    y ? i(o, !0, m) : a(m);
  }
  function g(y, m = !1) {
    i(y, m, m);
  }
  const { cellClass: h } = e,
    f = br(
      e,
      'rdg-editor-container',
      typeof h == 'function' ? h(o) : h,
      !((w = e.editorOptions) != null && w.displayCellContent) && x1,
    );
  return /* @__PURE__ */ I('div', {
    role: 'gridcell',
    'aria-colindex': e.idx + 1,
    'aria-colspan': t,
    'aria-selected': !0,
    className: f,
    style: hr(e, t),
    onKeyDown: b,
    onMouseDownCapture: p,
    children:
      e.renderEditCell != null &&
      /* @__PURE__ */ Fe(sr, {
        children: [
          e.renderEditCell({
            column: e,
            row: o,
            onRowChange: g,
            onClose: v,
          }),
          ((E = e.editorOptions) == null ? void 0 : E.displayCellContent) &&
            e.renderCell({
              column: e,
              row: o,
              isCellEditable: !0,
              tabIndex: -1,
              onRowChange: g,
            }),
        ],
      }),
  });
}
function C1({
  id: e,
  groupKey: t,
  childRows: o,
  isExpanded: r,
  isCellSelected: i,
  column: a,
  row: s,
  groupColumnIndex: l,
  toggleGroup: c,
}) {
  var g;
  const { tabIndex: u, childTabIndex: d, onFocus: p } = _i(i);
  function b() {
    c(e);
  }
  const v = a.rowGroup && l === a.idx;
  return /* @__PURE__ */ I(
    'div',
    {
      role: 'gridcell',
      'aria-colindex': a.idx + 1,
      'aria-selected': i,
      tabIndex: u,
      className: br(a),
      style: {
        ...hr(a),
        cursor: v ? 'pointer' : 'default',
      },
      onClick: v ? b : void 0,
      onFocus: p,
      children:
        (!a.rowGroup || l === a.idx) &&
        ((g = a.renderGroupCell) == null
          ? void 0
          : g.call(a, {
              groupKey: t,
              childRows: o,
              column: a,
              row: s,
              isExpanded: r,
              tabIndex: d,
              toggleGroup: b,
            })),
    },
    a.key,
  );
}
const w1 = /* @__PURE__ */ no(C1),
  T1 = 'r1otpg647-0-0-beta-33',
  ws = `rdg-row ${T1}`,
  S1 = 'rel5gk27-0-0-beta-33',
  Mi = 'rdg-row-selected',
  R1 = 'r1qymf1z7-0-0-beta-33',
  O1 = 'gyxx7e97-0-0-beta-33',
  k1 = `rdg-group-row ${O1}`;
function N1({
  id: e,
  groupKey: t,
  viewportColumns: o,
  childRows: r,
  rowIdx: i,
  row: a,
  gridRowStart: s,
  height: l,
  level: c,
  isExpanded: u,
  selectedCellIdx: d,
  isRowSelected: p,
  selectGroup: b,
  toggleGroup: v,
  ...g
}) {
  const h = o[0].key === oi ? c + 1 : c;
  function f() {
    b(i);
  }
  return /* @__PURE__ */ I(Es, {
    value: p,
    children: /* @__PURE__ */ I('div', {
      role: 'row',
      'aria-level': c,
      'aria-expanded': u,
      className: xe(ws, k1, `rdg-row-${i % 2 === 0 ? 'even' : 'odd'}`, d === -1 && Mi),
      onClick: f,
      style: Ii(s, l),
      ...g,
      children: o.map((T) =>
        /* @__PURE__ */ I(
          w1,
          {
            id: e,
            groupKey: t,
            childRows: r,
            isExpanded: u,
            isCellSelected: d === T.idx,
            column: T,
            row: a,
            groupColumnIndex: h,
            toggleGroup: v,
          },
          T.key,
        ),
      ),
    }),
  });
}
const $1 = /* @__PURE__ */ no(N1),
  P1 = 'hizp7y17-0-0-beta-33',
  I1 = `rdg-header-sort-cell ${P1}`,
  _1 = 'h14cojrm7-0-0-beta-33',
  M1 = `rdg-header-sort-name ${_1}`;
function A1({ column: e, sortDirection: t, priority: o, onSort: r, tabIndex: i }) {
  return e.sortable
    ? /* @__PURE__ */ I(D1, {
        onSort: r,
        sortDirection: t,
        priority: o,
        tabIndex: i,
        children: e.name,
      })
    : e.name;
}
function D1({ onSort: e, sortDirection: t, priority: o, children: r, tabIndex: i }) {
  const a = ys().renderSortStatus;
  function s(c) {
    (c.key === ' ' || c.key === 'Enter') && (c.preventDefault(), e(c.ctrlKey || c.metaKey));
  }
  function l(c) {
    e(c.ctrlKey || c.metaKey);
  }
  return /* @__PURE__ */ Fe('span', {
    tabIndex: i,
    className: I1,
    onClick: l,
    onKeyDown: s,
    children: [
      /* @__PURE__ */ I('span', {
        className: M1,
        children: r,
      }),
      /* @__PURE__ */ I('span', {
        children: a({
          sortDirection: t,
          priority: o,
        }),
      }),
    ],
  });
}
const L1 = 'celq7o97-0-0-beta-33',
  F1 = `rdg-cell-resizable ${L1}`;
function z1({
  column: e,
  colSpan: t,
  isCellSelected: o,
  onColumnResize: r,
  sortColumns: i,
  onSortColumnsChange: a,
  selectCell: s,
  shouldFocusGrid: l,
  direction: c,
}) {
  const u = c === 'rtl',
    { tabIndex: d, childTabIndex: p, onFocus: b } = _i(o),
    v = i == null ? void 0 : i.findIndex(($) => $.columnKey === e.key),
    g = v !== void 0 && v > -1 ? i[v] : void 0,
    h = g == null ? void 0 : g.direction,
    f = g !== void 0 && i.length > 1 ? v + 1 : void 0,
    T = h && !f ? (h === 'ASC' ? 'ascending' : 'descending') : void 0,
    w = br(e, e.headerCellClass, e.resizable && F1),
    E = e.renderHeaderCell ?? A1;
  function y($) {
    if ($.pointerType === 'mouse' && $.buttons !== 1) return;
    const { currentTarget: N, pointerId: k } = $,
      { right: j, left: z } = N.getBoundingClientRect(),
      P = u ? $.clientX - z : j - $.clientX;
    if (P > 11) return;
    function V(Q) {
      Q.preventDefault();
      const { right: re, left: Z } = N.getBoundingClientRect(),
        _ = u ? re + P - Q.clientX : Q.clientX + P - Z;
      _ > 0 && r(e, Xd(_, e));
    }
    function B() {
      N.removeEventListener('pointermove', V), N.removeEventListener('lostpointercapture', B);
    }
    N.setPointerCapture(k),
      N.addEventListener('pointermove', V),
      N.addEventListener('lostpointercapture', B);
  }
  function m($) {
    if (a == null) return;
    const { sortDescendingFirst: N } = e;
    if (g === void 0) {
      const k = {
        columnKey: e.key,
        direction: N ? 'DESC' : 'ASC',
      };
      a(i && $ ? [...i, k] : [k]);
    } else {
      let k;
      if (
        (((N === !0 && h === 'DESC') || (N !== !0 && h === 'ASC')) &&
          (k = {
            columnKey: e.key,
            direction: h === 'ASC' ? 'DESC' : 'ASC',
          }),
        $)
      ) {
        const j = [...i];
        k ? (j[v] = k) : j.splice(v, 1), a(j);
      } else a(k ? [k] : []);
    }
  }
  function O() {
    s(e.idx);
  }
  function R($) {
    const { right: N, left: k } = $.currentTarget.getBoundingClientRect();
    (u ? $.clientX - k : N - $.clientX) > 11 || r(e, 'max-content');
  }
  function D($) {
    b == null || b($), l && s(0);
  }
  return /* @__PURE__ */ I('div', {
    role: 'columnheader',
    'aria-colindex': e.idx + 1,
    'aria-selected': o,
    'aria-sort': T,
    'aria-colspan': t,
    tabIndex: l ? 0 : d,
    className: w,
    style: hr(e, t),
    onFocus: D,
    onClick: O,
    onDoubleClick: e.resizable ? R : void 0,
    onPointerDown: e.resizable ? y : void 0,
    children: E({
      column: e,
      sortDirection: h,
      priority: f,
      onSort: m,
      tabIndex: p,
    }),
  });
}
const j1 = 'h197vzie7-0-0-beta-33',
  V1 = `rdg-header-row ${j1}`;
function B1({
  columns: e,
  onColumnResize: t,
  sortColumns: o,
  onSortColumnsChange: r,
  lastFrozenColumnIndex: i,
  selectedCellIdx: a,
  selectCell: s,
  shouldFocusGrid: l,
  direction: c,
}) {
  const u = [];
  for (let d = 0; d < e.length; d++) {
    const p = e[d],
      b = sn(p, i, {
        type: 'HEADER',
      });
    b !== void 0 && (d += b - 1),
      u.push(
        /* @__PURE__ */ I(
          z1,
          {
            column: p,
            colSpan: b,
            isCellSelected: a === p.idx,
            onColumnResize: t,
            onSortColumnsChange: r,
            sortColumns: o,
            selectCell: s,
            shouldFocusGrid: l && d === 0,
            direction: c,
          },
          p.key,
        ),
      );
  }
  return /* @__PURE__ */ I('div', {
    role: 'row',
    'aria-rowindex': 1,
    className: xe(V1, a === -1 && Mi),
    style: Ii(1),
    children: u,
  });
}
const W1 = /* @__PURE__ */ no(B1),
  U1 = 'ccpfvsn7-0-0-beta-33',
  H1 = `rdg-cell-copied ${U1}`,
  q1 = 'c1bmg16t7-0-0-beta-33',
  K1 = `rdg-cell-dragged-over ${q1}`;
function Y1({
  column: e,
  colSpan: t,
  isCellSelected: o,
  isCopied: r,
  isDraggedOver: i,
  row: a,
  rowIdx: s,
  dragHandle: l,
  onClick: c,
  onDoubleClick: u,
  onContextMenu: d,
  onRowChange: p,
  selectCell: b,
  ...v
}) {
  const { tabIndex: g, childTabIndex: h, onFocus: f } = _i(o),
    { cellClass: T } = e,
    w = br(e, typeof T == 'function' ? T(a) : T, r && H1, i && K1),
    E = Gd(e, a);
  function y($) {
    b(
      {
        rowIdx: s,
        idx: e.idx,
      },
      $,
    );
  }
  function m($) {
    if (c) {
      const N = Zo($);
      if (
        (c(
          {
            row: a,
            column: e,
            selectCell: y,
          },
          N,
        ),
        N.isGridDefaultPrevented())
      )
        return;
    }
    y();
  }
  function O($) {
    if (d) {
      const N = Zo($);
      if (
        (d(
          {
            row: a,
            column: e,
            selectCell: y,
          },
          N,
        ),
        N.isGridDefaultPrevented())
      )
        return;
    }
    y();
  }
  function R($) {
    if (u) {
      const N = Zo($);
      if (
        (u(
          {
            row: a,
            column: e,
            selectCell: y,
          },
          N,
        ),
        N.isGridDefaultPrevented())
      )
        return;
    }
    y(!0);
  }
  function D($) {
    p(e, $);
  }
  return /* @__PURE__ */ I('div', {
    role: 'gridcell',
    'aria-colindex': e.idx + 1,
    'aria-selected': o,
    'aria-colspan': t,
    'aria-readonly': !E || void 0,
    tabIndex: g,
    className: w,
    style: hr(e, t),
    onClick: m,
    onDoubleClick: R,
    onContextMenu: O,
    onFocus: f,
    ...v,
    children:
      !e.rowGroup &&
      /* @__PURE__ */ Fe(sr, {
        children: [
          e.renderCell({
            column: e,
            row: a,
            isCellEditable: E,
            tabIndex: h,
            onRowChange: D,
          }),
          l,
        ],
      }),
  });
}
const G1 = /* @__PURE__ */ no(Y1);
function X1(
  {
    className: e,
    rowIdx: t,
    gridRowStart: o,
    height: r,
    selectedCellIdx: i,
    isRowSelected: a,
    copiedCellIdx: s,
    draggedOverCellIdx: l,
    lastFrozenColumnIndex: c,
    row: u,
    viewportColumns: d,
    selectedCellEditor: p,
    selectedCellDragHandle: b,
    onCellClick: v,
    onCellDoubleClick: g,
    onCellContextMenu: h,
    rowClass: f,
    setDraggedOverRowIdx: T,
    onMouseEnter: w,
    onRowChange: E,
    selectCell: y,
    ...m
  },
  O,
) {
  const R = qt((N, k) => {
    E(N, t, k);
  });
  function D(N) {
    T == null || T(t), w == null || w(N);
  }
  e = xe(
    ws,
    `rdg-row-${t % 2 === 0 ? 'even' : 'odd'}`,
    f == null ? void 0 : f(u, t),
    e,
    i === -1 && Mi,
  );
  const $ = [];
  for (let N = 0; N < d.length; N++) {
    const k = d[N],
      { idx: j } = k,
      z = sn(k, c, {
        type: 'ROW',
        row: u,
      });
    z !== void 0 && (N += z - 1);
    const P = i === j;
    P && p
      ? $.push(p)
      : $.push(
          /* @__PURE__ */ I(
            G1,
            {
              column: k,
              colSpan: z,
              row: u,
              rowIdx: t,
              isCopied: s === j,
              isDraggedOver: l === j,
              isCellSelected: P,
              dragHandle: P ? b : void 0,
              onClick: v,
              onDoubleClick: g,
              onContextMenu: h,
              onRowChange: R,
              selectCell: y,
            },
            k.key,
          ),
        );
  }
  return /* @__PURE__ */ I(Es, {
    value: a,
    children: /* @__PURE__ */ I('div', {
      role: 'row',
      ref: O,
      className: e,
      onMouseEnter: D,
      style: Ii(o, r),
      ...m,
      children: $,
    }),
  });
}
const J1 = /* @__PURE__ */ no(/* @__PURE__ */ Oa(X1));
function Z1(e, t) {
  return /* @__PURE__ */ I(
    J1,
    {
      ...t,
    },
    e,
  );
}
function Q1({
  scrollToPosition: { idx: e, rowIdx: t },
  gridElement: o,
  setScrollToCellPosition: r,
}) {
  const i = bn(null);
  return (
    Ro(() => {
      Br(i.current);
    }),
    Ro(() => {
      function a() {
        r(null);
      }
      const s = new IntersectionObserver(a, {
        root: o,
        threshold: 1,
      });
      return (
        s.observe(i.current),
        () => {
          s.disconnect();
        }
      );
    }, [o, r]),
    /* @__PURE__ */ I('div', {
      ref: i,
      style: {
        gridColumn: e === void 0 ? '1/-1' : e + 1,
        gridRow: t === void 0 ? '1/-1' : t + 2,
      },
    })
  );
}
const ew = 'a1mygwml7-0-0-beta-33',
  tw = `rdg-sort-arrow ${ew}`;
function nw({ sortDirection: e, priority: t }) {
  return /* @__PURE__ */ Fe(sr, {
    children: [
      ow({
        sortDirection: e,
      }),
      rw({
        priority: t,
      }),
    ],
  });
}
function ow({ sortDirection: e }) {
  return e === void 0
    ? null
    : /* @__PURE__ */ I('svg', {
        viewBox: '0 0 12 8',
        width: '12',
        height: '8',
        className: tw,
        'aria-hidden': !0,
        children: /* @__PURE__ */ I('path', {
          d: e === 'ASC' ? 'M0 8 6 0 12 8' : 'M0 0 6 8 12 0',
        }),
      });
}
function rw({ priority: e }) {
  return e;
}
const iw = 'r104f42s7-0-0-beta-33',
  aw = `rdg ${iw}`,
  sw = 'v7ly7s7-0-0-beta-33',
  lw = `rdg-viewport-dragging ${sw}`,
  cw = 'fc4f4zb7-0-0-beta-33',
  uw = 's1n3hxke7-0-0-beta-33';
function dw({ column: e, colSpan: t, row: o, rowIdx: r, isCellSelected: i, selectCell: a }) {
  var b;
  const { tabIndex: s, childTabIndex: l, onFocus: c } = _i(i),
    { summaryCellClass: u } = e,
    d = br(e, uw, typeof u == 'function' ? u(o) : u);
  function p() {
    a({
      rowIdx: r,
      idx: e.idx,
    });
  }
  return /* @__PURE__ */ I('div', {
    role: 'gridcell',
    'aria-colindex': e.idx + 1,
    'aria-colspan': t,
    'aria-selected': i,
    tabIndex: s,
    className: d,
    style: hr(e, t),
    onClick: p,
    onFocus: c,
    children:
      (b = e.renderSummaryCell) == null
        ? void 0
        : b.call(e, {
            column: e,
            row: o,
            tabIndex: l,
          }),
  });
}
const pw = /* @__PURE__ */ no(dw),
  fw = 'snfqesz7-0-0-beta-33',
  mw = 't1jijrjz7-0-0-beta-33',
  hw = 't14bmecc7-0-0-beta-33',
  bw = 'b1odhhml7-0-0-beta-33',
  gw = `rdg-summary-row ${fw}`,
  vw = `rdg-top-summary-row ${mw}`;
function yw({
  rowIdx: e,
  gridRowStart: t,
  row: o,
  viewportColumns: r,
  top: i,
  bottom: a,
  lastFrozenColumnIndex: s,
  selectedCellIdx: l,
  isTop: c,
  showBorder: u,
  selectCell: d,
  'aria-rowindex': p,
}) {
  const b = [];
  for (let v = 0; v < r.length; v++) {
    const g = r[v],
      h = sn(g, s, {
        type: 'SUMMARY',
        row: o,
      });
    h !== void 0 && (v += h - 1);
    const f = l === g.idx;
    b.push(
      /* @__PURE__ */ I(
        pw,
        {
          column: g,
          colSpan: h,
          row: o,
          rowIdx: e,
          isCellSelected: f,
          selectCell: d,
        },
        g.key,
      ),
    );
  }
  return /* @__PURE__ */ I('div', {
    role: 'row',
    'aria-rowindex': p,
    className: xe(
      ws,
      `rdg-row-${e % 2 === 0 ? 'even' : 'odd'}`,
      gw,
      c ? [vw, u && hw] : ['rdg-bottom-summary-row', u && bw],
      l === -1 && Mi,
    ),
    style: {
      ...Ii(t),
      '--rdg-summary-row-top': i !== void 0 ? `${i}px` : void 0,
      '--rdg-summary-row-bottom': a !== void 0 ? `${a}px` : void 0,
    },
    children: b,
  });
}
const Pc = /* @__PURE__ */ no(yw);
function xw(e, t) {
  const {
      columns: o,
      rows: r,
      topSummaryRows: i,
      bottomSummaryRows: a,
      rowKeyGetter: s,
      onRowsChange: l,
      rowHeight: c,
      headerRowHeight: u,
      summaryRowHeight: d,
      selectedRows: p,
      onSelectedRowsChange: b,
      sortColumns: v,
      onSortColumnsChange: g,
      defaultColumnOptions: h,
      groupBy: f,
      rowGrouper: T,
      expandedGroupIds: w,
      onExpandedGroupIdsChange: E,
      onCellClick: y,
      onCellDoubleClick: m,
      onCellContextMenu: O,
      onCellKeyDown: R,
      onScroll: D,
      onColumnResize: $,
      onFill: N,
      onCopy: k,
      onPaste: j,
      enableVirtualization: z,
      renderers: P,
      className: V,
      style: B,
      rowClass: Q,
      direction: re,
      'aria-label': Z,
      'aria-labelledby': _,
      'aria-describedby': W,
      'data-testid': te,
    } = e,
    H = ys(),
    K = c ?? 35,
    ne = u ?? (typeof K == 'number' ? K : 35),
    ee = d ?? (typeof K == 'number' ? K : 35),
    oe = (P == null ? void 0 : P.renderRow) ?? (H == null ? void 0 : H.renderRow) ?? Z1,
    le =
      (P == null ? void 0 : P.renderSortStatus) ?? (H == null ? void 0 : H.renderSortStatus) ?? nw,
    ue = (P == null ? void 0 : P.renderCheckbox) ?? (H == null ? void 0 : H.renderCheckbox) ?? GC,
    ye = (P == null ? void 0 : P.noRowsFallback) ?? (H == null ? void 0 : H.noRowsFallback),
    se = z ?? !0,
    L = re ?? 'ltr',
    Te = 1,
    F = (i == null ? void 0 : i.length) ?? 0,
    G = (a == null ? void 0 : a.length) ?? 0,
    De = F + G,
    ge = Te + F,
    Le = -ge,
    [Ue, $e] = Kt(0),
    [Me, ct] = Kt(0),
    [mt, ie] = Kt(() => /* @__PURE__ */ new Map()),
    [ve, Ce] = Kt(() => /* @__PURE__ */ new Map()),
    [U, pe] = Kt(() => ({
      idx: -1,
      rowIdx: Le - 1,
      mode: 'SELECT',
    })),
    [de, ae] = Kt(null),
    [Ee, we] = Kt(!1),
    [Ae, ht] = Kt(void 0),
    [ut, Pt] = Kt(null),
    Qt = bn(U),
    It = bn(Ae),
    Tt = bn(-1),
    St = bn(null),
    gt = bn(!1),
    [Be, dt, xt] = f1(),
    en = xt - ne - De * ee,
    At = p != null && b != null,
    tn = L === 'rtl',
    zt = tn ? 'ArrowRight' : 'ArrowLeft',
    nn = tn ? 'ArrowLeft' : 'ArrowRight',
    pn = yn(
      () => ({
        renderCheckbox: ue,
        renderSortStatus: le,
      }),
      [ue, le],
    ),
    fn = yn(() => {
      const { length: J } = r;
      return J !== 0 && p != null && s != null && p.size >= J && r.every((he) => p.has(s(he)));
    }, [r, p, s]),
    {
      columns: ft,
      colSpanColumns: on,
      colOverscanStartIdx: je,
      colOverscanEndIdx: vt,
      templateColumns: Vt,
      layoutCssVars: S,
      lastFrozenColumnIndex: q,
      totalFrozenColumnWidth: fe,
      groupBy: A,
    } = d1({
      rawColumns: o,
      measuredColumnWidths: ve,
      resizedColumnWidths: mt,
      scrollLeft: Me,
      viewportWidth: dt,
      defaultColumnOptions: h,
      rawGroupBy: T ? f : void 0,
      enableVirtualization: se,
    }),
    {
      rowOverscanStartIdx: M,
      rowOverscanEndIdx: X,
      rows: Y,
      rowsCount: me,
      totalRowHeight: Ie,
      gridTemplateRows: Pe,
      isGroupRow: Oe,
      getRowTop: Ot,
      getRowHeight: Tn,
      findRowIdx: Io,
    } = b1({
      rawRows: r,
      groupBy: A,
      rowGrouper: T,
      rowHeight: K,
      clientHeight: en,
      scrollTop: Ue,
      expandedGroupIds: w,
      enableVirtualization: se,
    }),
    $t = m1({
      columns: ft,
      colSpanColumns: on,
      colOverscanStartIdx: je,
      colOverscanEndIdx: vt,
      lastFrozenColumnIndex: q,
      rowOverscanStartIdx: M,
      rowOverscanEndIdx: X,
      rows: Y,
      topSummaryRows: i,
      bottomSummaryRows: a,
      isGroupRow: Oe,
    }),
    { gridTemplateColumns: ep, handleColumnResize: tp } = p1(ft, $t, Vt, Be, dt, mt, ve, ie, Ce, $),
    An = A.length > 0 && typeof T == 'function',
    np = An ? -1 : 0,
    gr = ft.length - 1,
    _o = Y.length + G - 1,
    Ai = zi(U),
    vr = ks(U),
    op = qt(tp),
    rp = qt(g),
    ip = qt(y),
    ap = qt(m),
    sp = qt(O),
    lp = qt(Ts),
    cp = qt(yr),
    Di = qt(ro),
    up = qt((J) => {
      ro({
        rowIdx: J,
        idx: -1,
      });
    }),
    dp = qt((J) => {
      ro({
        rowIdx: Le,
        idx: J,
      });
    }),
    pp = qt(Ss);
  Ro(() => {
    if (!Ai || ia(U, Qt.current)) {
      Qt.current = U;
      return;
    }
    (Qt.current = U),
      U.idx === -1 &&
        (St.current.focus({
          preventScroll: !0,
        }),
        Br(St.current));
  }),
    Ro(() => {
      if (!gt.current) return;
      gt.current = !1;
      const J = _c(Be.current);
      if (J === null) return;
      Br(J),
        (J.querySelector('[tabindex="0"]') ?? J).focus({
          preventScroll: !0,
        });
    }),
    Sp(t, () => ({
      element: Be.current,
      scrollToCell({ idx: J, rowIdx: he }) {
        const Ne = J !== void 0 && J > q && J < ft.length ? J : void 0,
          Re = he !== void 0 && xr(he) ? he : void 0;
        (Ne !== void 0 || Re !== void 0) &&
          Pt({
            idx: Ne,
            rowIdx: Re,
          });
      },
      selectCell: ro,
    }));
  const Li = Dc((J) => {
    ht(J), (It.current = J);
  }, []);
  function Ts(J) {
    if (!b) return;
    if ((ra(s), J.type === 'HEADER')) {
      const pt = new Set(p);
      for (const Je of r) {
        const qe = s(Je);
        J.checked ? pt.add(qe) : pt.delete(qe);
      }
      b(pt);
      return;
    }
    const { row: he, checked: Ne, isShiftClick: Re } = J,
      ke = new Set(p);
    if (Oe(he)) {
      for (const pt of he.childRows) {
        const Je = s(pt);
        Ne ? ke.add(Je) : ke.delete(Je);
      }
      b(ke);
      return;
    }
    const bt = s(he);
    if (Ne) {
      ke.add(bt);
      const pt = Tt.current,
        Je = Y.indexOf(he);
      if (((Tt.current = Je), Re && pt !== -1 && pt !== Je)) {
        const qe = zC(Je - pt);
        for (let Nt = pt + qe; Nt !== Je; Nt += qe) {
          const Dn = Y[Nt];
          Oe(Dn) || ke.add(s(Dn));
        }
      }
    } else ke.delete(bt), (Tt.current = -1);
    b(ke);
  }
  function Ss(J) {
    if (!E) return;
    const he = new Set(w);
    he.has(J) ? he.delete(J) : he.add(J), E(he);
  }
  function fp(J) {
    const { idx: he, rowIdx: Ne, mode: Re } = U;
    if (Re === 'EDIT') return;
    const ke = Y[Ne];
    if (!Oe(ke) && R) {
      const Nt = Zo(J);
      if (
        (R(
          {
            mode: 'SELECT',
            row: ke,
            column: ft[he],
            rowIdx: Ne,
            selectCell: ro,
          },
          Nt,
        ),
        Nt.isGridDefaultPrevented())
      )
        return;
    }
    if (!(J.target instanceof Element)) return;
    const bt = J.target.closest('.rdg-cell') !== null,
      pt = An && J.target === St.current;
    if (!bt && !pt) return;
    const { key: Je, keyCode: qe } = J;
    if (vr && (j != null || k != null) && kc(J) && !Oe(Y[Ne])) {
      if (qe === 67) {
        hp();
        return;
      }
      if (qe === 86) {
        bp();
        return;
      }
    }
    if (
      xr(Ne) &&
      Oe(ke) &&
      U.idx === -1 &&
      ((Je === zt && ke.isExpanded) || (Je === nn && !ke.isExpanded))
    ) {
      J.preventDefault(), Ss(ke.id);
      return;
    }
    switch (J.key) {
      case 'Escape':
        ae(null);
        return;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Tab':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        Ns(J);
        break;
      default:
        gp(J);
        break;
    }
  }
  function mp(J) {
    const { scrollTop: he, scrollLeft: Ne } = J.currentTarget;
    Wr(() => {
      $e(he), ct(jC(Ne));
    }),
      D == null || D(J);
  }
  function Fi(J) {
    return An ? r.indexOf(Y[J]) : J;
  }
  function yr(J, he, Ne) {
    if (typeof l != 'function') return;
    const Re = Fi(he);
    if (Ne === r[Re]) return;
    const ke = [...r];
    (ke[Re] = Ne),
      l(ke, {
        indexes: [Re],
        column: J,
      });
  }
  function Rs() {
    U.mode === 'EDIT' && yr(ft[U.idx], U.rowIdx, U.row);
  }
  function hp() {
    const { idx: J, rowIdx: he } = U,
      Ne = r[Fi(he)],
      Re = ft[J].key;
    ae({
      row: Ne,
      columnKey: Re,
    }),
      k == null ||
        k({
          sourceRow: Ne,
          sourceColumnKey: Re,
        });
  }
  function bp() {
    if (!j || !l || de === null || !Er(U)) return;
    const { idx: J, rowIdx: he } = U,
      Ne = ft[J],
      Re = r[Fi(he)],
      ke = j({
        sourceRow: de.row,
        sourceColumnKey: de.columnKey,
        targetRow: Re,
        targetColumnKey: Ne.key,
      });
    yr(Ne, he, ke);
  }
  function gp(J) {
    if (!vr) return;
    const he = Y[U.rowIdx];
    if (Oe(he)) return;
    const { key: Ne, shiftKey: Re } = J;
    if (At && Re && Ne === ' ') {
      ra(s);
      const ke = s(he);
      Ts({
        type: 'ROW',
        row: he,
        checked: !p.has(ke),
        isShiftClick: !1,
      }),
        J.preventDefault();
      return;
    }
    Er(U) &&
      SC(J) &&
      pe(({ idx: ke, rowIdx: bt }) => ({
        idx: ke,
        rowIdx: bt,
        mode: 'EDIT',
        row: he,
        originalRow: he,
      }));
  }
  function Os(J) {
    return J >= np && J <= gr;
  }
  function xr(J) {
    return J >= 0 && J < Y.length;
  }
  function zi({ idx: J, rowIdx: he }) {
    return he >= Le && he <= _o && Os(J);
  }
  function ks({ idx: J, rowIdx: he }) {
    return xr(he) && Os(J);
  }
  function Er(J) {
    return (
      ks(J) &&
      NC({
        columns: ft,
        rows: Y,
        selectedPosition: J,
        isGroupRow: Oe,
      })
    );
  }
  function ro(J, he) {
    if (zi(J))
      if ((Rs(), he && Er(J))) {
        const Ne = Y[J.rowIdx];
        pe({
          ...J,
          mode: 'EDIT',
          row: Ne,
          originalRow: Ne,
        });
      } else
        ia(U, J)
          ? Br(_c(Be.current))
          : ((gt.current = !0),
            pe({
              ...J,
              mode: 'SELECT',
            }));
  }
  function vp(J, he, Ne) {
    const { idx: Re, rowIdx: ke } = U,
      bt = Y[ke],
      pt = Ai && Re === -1;
    if (J === zt && pt && Oe(bt) && !bt.isExpanded && bt.level !== 0) {
      let Je = -1;
      for (let qe = U.rowIdx - 1; qe >= 0; qe--) {
        const Nt = Y[qe];
        if (Oe(Nt) && Nt.id === bt.parentId) {
          Je = qe;
          break;
        }
      }
      if (Je !== -1)
        return {
          idx: Re,
          rowIdx: Je,
        };
    }
    switch (J) {
      case 'ArrowUp':
        return {
          idx: Re,
          rowIdx: ke - 1,
        };
      case 'ArrowDown':
        return {
          idx: Re,
          rowIdx: ke + 1,
        };
      case zt:
        return {
          idx: Re - 1,
          rowIdx: ke,
        };
      case nn:
        return {
          idx: Re + 1,
          rowIdx: ke,
        };
      case 'Tab':
        return {
          idx: Re + (Ne ? -1 : 1),
          rowIdx: ke,
        };
      case 'Home':
        return pt
          ? {
              idx: Re,
              rowIdx: 0,
            }
          : {
              idx: 0,
              rowIdx: he ? Le : ke,
            };
      case 'End':
        return pt
          ? {
              idx: Re,
              rowIdx: Y.length - 1,
            }
          : {
              idx: gr,
              rowIdx: he ? _o : ke,
            };
      case 'PageUp': {
        if (U.rowIdx === Le) return U;
        const Je = Ot(ke) + Tn(ke) - en;
        return {
          idx: Re,
          rowIdx: Je > 0 ? Io(Je) : 0,
        };
      }
      case 'PageDown': {
        if (U.rowIdx >= Y.length) return U;
        const Je = Ot(ke) + en;
        return {
          idx: Re,
          rowIdx: Je < Ie ? Io(Je) : Y.length - 1,
        };
      }
      default:
        return U;
    }
  }
  function Ns(J) {
    const { key: he, shiftKey: Ne } = J;
    let Re = 'NONE';
    if (he === 'Tab') {
      if (
        IC({
          shiftKey: Ne,
          maxColIdx: gr,
          minRowIdx: Le,
          maxRowIdx: _o,
          selectedPosition: U,
        })
      ) {
        Rs();
        return;
      }
      Re = 'CHANGE_ROW';
    }
    J.preventDefault();
    const ke = kc(J),
      bt = vp(he, ke, Ne);
    if (ia(U, bt)) return;
    const pt = PC({
      columns: ft,
      colSpanColumns: on,
      rows: Y,
      topSummaryRows: i,
      bottomSummaryRows: a,
      minRowIdx: Le,
      maxRowIdx: _o,
      lastFrozenColumnIndex: q,
      cellNavigationMode: Re,
      currentPosition: U,
      nextPosition: bt,
      isCellWithinBounds: zi,
      isGroupRow: Oe,
    });
    ro(pt);
  }
  function yp(J) {
    if (Ae === void 0) return;
    const { rowIdx: he } = U;
    return (he < Ae ? he < J && J <= Ae : he > J && J >= Ae) ? U.idx : void 0;
  }
  function xp(J) {
    if (!(U.rowIdx !== J || U.mode === 'EDIT' || An || N == null))
      return /* @__PURE__ */ I(y1, {
        rows: r,
        columns: ft,
        selectedPosition: U,
        isCellEditable: Er,
        latestDraggedOverRowIdx: It,
        onRowsChange: l,
        onFill: N,
        setDragging: we,
        setDraggedOverRowIdx: Li,
      });
  }
  function Ep(J) {
    if (U.rowIdx !== J || U.mode === 'SELECT') return;
    const { idx: he, row: Ne } = U,
      Re = ft[he],
      ke = sn(Re, q, {
        type: 'ROW',
        row: Ne,
      }),
      bt = (Je) => {
        (gt.current = Je),
          pe(({ idx: qe, rowIdx: Nt }) => ({
            idx: qe,
            rowIdx: Nt,
            mode: 'SELECT',
          }));
      },
      pt = (Je, qe, Nt) => {
        qe
          ? Wr(() => {
              yr(Re, U.rowIdx, Je), bt(Nt);
            })
          : pe((Dn) => ({
              ...Dn,
              row: Je,
            }));
      };
    return (
      Y[U.rowIdx] !== U.originalRow && bt(!1),
      /* @__PURE__ */ I(
        E1,
        {
          column: Re,
          colSpan: ke,
          row: Ne,
          rowIdx: J,
          onRowChange: pt,
          closeEditor: bt,
          onKeyDown: R,
          navigate: Ns,
        },
        Re.key,
      )
    );
  }
  function Cr(J) {
    const he = ft[U.idx];
    return he !== void 0 && U.rowIdx === J && !$t.includes(he)
      ? U.idx > vt
        ? [...$t, he]
        : [...$t.slice(0, q + 1), he, ...$t.slice(q + 1)]
      : $t;
  }
  function Cp() {
    const J = [];
    let he = 0;
    const { idx: Ne, rowIdx: Re } = U,
      ke = vr && Re < M ? M - 1 : M,
      bt = vr && Re > X ? X + 1 : X;
    for (let pt = ke; pt <= bt; pt++) {
      const Je = pt === M - 1 || pt === X + 1,
        qe = Je ? Re : pt;
      let Nt = $t;
      const Dn = ft[Ne];
      Dn !== void 0 && (Je ? (Nt = [Dn]) : (Nt = Cr(qe)));
      const Dt = Y[qe],
        Ps = ge + qe + 1;
      if (Oe(Dt)) {
        ({ startRowIndex: he } = Dt);
        let Mo = !1;
        At && (ra(s), (Mo = Dt.childRows.every((wp) => p.has(s(wp))))),
          J.push(
            /* @__PURE__ */ I(
              $1,
              {
                'aria-level': Dt.level + 1,
                'aria-setsize': Dt.setSize,
                'aria-posinset': Dt.posInSet + 1,
                'aria-rowindex': ge + he + 1,
                'aria-selected': At ? Mo : void 0,
                id: Dt.id,
                groupKey: Dt.groupKey,
                viewportColumns: Nt,
                childRows: Dt.childRows,
                rowIdx: qe,
                row: Dt,
                gridRowStart: Ps,
                height: Tn(qe),
                level: Dt.level,
                isExpanded: Dt.isExpanded,
                selectedCellIdx: Re === qe ? Ne : void 0,
                isRowSelected: Mo,
                selectGroup: up,
                toggleGroup: pp,
              },
              Dt.id,
            ),
          );
        continue;
      }
      he++;
      let Tr,
        ji = !1;
      typeof s == 'function'
        ? ((Tr = s(Dt)), (ji = (p == null ? void 0 : p.has(Tr)) ?? !1))
        : (Tr = An ? he : qe),
        J.push(
          oe(Tr, {
            'aria-rowindex': ge + (An ? he : qe) + 1,
            'aria-selected': At ? ji : void 0,
            rowIdx: qe,
            row: Dt,
            viewportColumns: Nt,
            isRowSelected: ji,
            onCellClick: ip,
            onCellDoubleClick: ap,
            onCellContextMenu: sp,
            rowClass: Q,
            gridRowStart: Ps,
            height: Tn(qe),
            copiedCellIdx:
              de !== null && de.row === Dt ? ft.findIndex((Mo) => Mo.key === de.columnKey) : void 0,
            selectedCellIdx: Re === qe ? Ne : void 0,
            draggedOverCellIdx: yp(qe),
            setDraggedOverRowIdx: Ee ? Li : void 0,
            lastFrozenColumnIndex: q,
            onRowChange: cp,
            selectCell: Di,
            selectedCellDragHandle: xp(qe),
            selectedCellEditor: Ep(qe),
          }),
        );
    }
    return J;
  }
  (U.idx > gr || U.rowIdx > _o) &&
    (pe({
      idx: -1,
      rowIdx: Le - 1,
      mode: 'SELECT',
    }),
    Li(void 0));
  let wr = `${ne}px`;
  F > 0 && (wr += ` repeat(${F}, ${ee}px)`),
    Y.length > 0 && (wr += Pe),
    G > 0 && (wr += ` repeat(${G}, ${ee}px)`);
  const $s = U.idx === -1 && U.rowIdx !== Le - 1;
  return /* @__PURE__ */ Fe('div', {
    role: An ? 'treegrid' : 'grid',
    'aria-label': Z,
    'aria-labelledby': _,
    'aria-describedby': W,
    'aria-multiselectable': At ? !0 : void 0,
    'aria-colcount': ft.length,
    'aria-rowcount': Te + me + De,
    className: xe(aw, V, Ee && lw),
    style: {
      ...B,
      scrollPaddingInlineStart:
        U.idx > q || (ut == null ? void 0 : ut.idx) !== void 0 ? `${fe}px` : void 0,
      scrollPaddingBlock:
        xr(U.rowIdx) || (ut == null ? void 0 : ut.rowIdx) !== void 0
          ? `${ne + F * ee}px ${G * ee}px`
          : void 0,
      gridTemplateColumns: ep,
      gridTemplateRows: wr,
      '--rdg-header-row-height': `${ne}px`,
      '--rdg-summary-row-height': `${ee}px`,
      '--rdg-sign': tn ? -1 : 1,
      ...S,
    },
    dir: L,
    ref: Be,
    onScroll: mp,
    onKeyDown: fp,
    'data-testid': te,
    children: [
      An &&
        /* @__PURE__ */ I('div', {
          ref: St,
          tabIndex: $s ? 0 : -1,
          className: xe(cw, $s && [S1, q !== -1 && R1]),
          style: {
            gridRowStart: U.rowIdx + ge + 1,
          },
        }),
      ut !== null &&
        /* @__PURE__ */ I(Q1, {
          scrollToPosition: ut,
          setScrollToCellPosition: Pt,
          gridElement: Be.current,
        }),
      /* @__PURE__ */ Fe(o1, {
        value: pn,
        children: [
          /* @__PURE__ */ Fe(r1, {
            value: lp,
            children: [
              /* @__PURE__ */ I(Es, {
                value: fn,
                children: /* @__PURE__ */ I(W1, {
                  columns: Cr(-1),
                  onColumnResize: op,
                  sortColumns: v,
                  onSortColumnsChange: rp,
                  lastFrozenColumnIndex: q,
                  selectedCellIdx: U.rowIdx === Le ? U.idx : void 0,
                  selectCell: dp,
                  shouldFocusGrid: !Ai,
                  direction: L,
                }),
              }),
              Y.length === 0 && ye
                ? ye
                : /* @__PURE__ */ Fe(sr, {
                    children: [
                      i == null
                        ? void 0
                        : i.map((J, he) => {
                            const Ne = Te + he + 1,
                              Re = he + Le + 1,
                              ke = U.rowIdx === Re,
                              bt = ne + ee * he;
                            return /* @__PURE__ */ I(
                              Pc,
                              {
                                'aria-rowindex': Ne,
                                rowIdx: Re,
                                gridRowStart: Ne,
                                row: J,
                                top: bt,
                                bottom: void 0,
                                viewportColumns: Cr(Re),
                                lastFrozenColumnIndex: q,
                                selectedCellIdx: ke ? U.idx : void 0,
                                isTop: !0,
                                showBorder: he === F - 1,
                                selectCell: Di,
                              },
                              he,
                            );
                          }),
                      Cp(),
                      a == null
                        ? void 0
                        : a.map((J, he) => {
                            const Ne = ge + Y.length + he + 1,
                              Re = Y.length + he,
                              ke = U.rowIdx === Re,
                              bt = en > Ie ? xt - ee * (a.length - he) : void 0,
                              pt = bt === void 0 ? ee * (a.length - 1 - he) : void 0;
                            return /* @__PURE__ */ I(
                              Pc,
                              {
                                'aria-rowindex': ge + me + he + 1,
                                rowIdx: Re,
                                gridRowStart: Ne,
                                row: J,
                                top: bt,
                                bottom: pt,
                                viewportColumns: Cr(Re),
                                lastFrozenColumnIndex: q,
                                selectedCellIdx: ke ? U.idx : void 0,
                                isTop: !1,
                                showBorder: he === 0,
                                selectCell: Di,
                              },
                              he,
                            );
                          }),
                    ],
                  }),
            ],
          }),
          kC($t),
        ],
      }),
    ],
  });
}
let Ic;
function _c(e) {
  return (
    Ic ?? (Ic = document.createExpression('div[@role="row"]/div[@tabindex="0"]')),
    Ic.evaluate(e, 8).singleNodeValue
  );
}
function ia(e, t) {
  return e.idx === t.idx && e.rowIdx === t.rowIdx;
}
const Ew = /* @__PURE__ */ Oa(xw);
function Mc({ onRowChange: e, row: t, column: o }) {
  const r = (i) => {
    e({ ...t, [o.key]: i.target.value });
  };
  return /* @__PURE__ */ I(Ra, { defaultValue: t[o.key], onChange: r });
}
const Cw = ({ onChange: e, disabled: t, checked: o, ...r }) => {
  function i(a) {
    e(a.target.checked, a.nativeEvent.shiftKey);
  }
  return /* @__PURE__ */ I(yC, {
    ...r,
    isChecked: o,
    isDisabled: t,
    onChange: i,
  });
};
function Iw({
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
  rowHeight: v = 35,
  headerRowHeight: g = 35,
  selectedRows: h,
  onSelectedRowsChange: f,
  onRowsChange: T,
  onCellClick: w,
  onCellDoubleClick: E,
  onCellContextMenu: y,
  onCellKeyDown: m,
  direction: O = 'ltr',
  enableVirtualization: R = !0,
  onCopy: D,
  onPaste: $,
  onScroll: N,
  className: k,
}) {
  const j = yn(() => {
    const z = e.map((P) =>
      typeof P.editable == 'function'
        ? {
            ...P,
            editable: (B) => !!P.editable(B),
            renderEditCell: P.renderEditCell || Mc,
          }
        : P.editable && !P.renderEditCell
        ? { ...P, renderEditCell: Mc }
        : P.renderEditCell && !P.editable
        ? { ...P, editable: !1 }
        : P,
    );
    return d ? [{ ...l1, minWidth: p }, ...z] : z;
  }, [d, e]);
  return /* @__PURE__ */ I(Ew, {
    columns: j,
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
    rowHeight: v,
    headerRowHeight: g,
    selectedRows: h,
    onSelectedRowsChange: f,
    onRowsChange: T,
    onCellClick: w,
    onCellDoubleClick: E,
    onCellContextMenu: y,
    onCellKeyDown: m,
    direction: O,
    enableVirtualization: R,
    onCopy: D,
    onPaste: $,
    onScroll: N,
    renderers: { renderCheckbox: Cw },
    className: `${k ?? 'rdg-light'}`,
  });
}
function ww(e, t = 'top') {
  if (!e || typeof document > 'u') return;
  const o = document.head || document.querySelector('head'),
    r = o.querySelector(':first-child'),
    i = document.createElement('style');
  i.appendChild(document.createTextNode(e)),
    t === 'top' && r ? o.insertBefore(i, r) : o.appendChild(i);
}
ww(
  `.papi-button {
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
.papi-menu-item {
  line-height: 0.8;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
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
  po as Button,
  yC as Checkbox,
  xC as ComboBox,
  ho as LabelPosition,
  $w as MenuItem,
  Rw as RefSelector,
  Ow as Slider,
  Nw as Snackbar,
  kw as Switch,
  Iw as Table,
  Ra as TextField,
};
//# sourceMappingURL=index.es.js.map
