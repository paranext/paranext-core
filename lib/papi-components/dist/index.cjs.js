'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const te = require('react'),
  Pn = require('react-dom');
function Cc(e) {
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
const C = Cc(te),
  wc = Cc(Pn);
function pp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var Ji = { exports: {} },
  $o = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ys;
function fp() {
  if (ys) return $o;
  ys = 1;
  var e = te,
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
  return ($o.Fragment = o), ($o.jsx = s), ($o.jsxs = s), $o;
}
var Po = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xs;
function mp() {
  return (
    xs ||
      ((xs = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = te,
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
          function f(T) {
            if (T === null || typeof T != 'object') return null;
            var q = (g && T[g]) || T[h];
            return typeof q == 'function' ? q : null;
          }
          var S = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function w(T) {
            {
              for (var q = arguments.length, me = new Array(q > 1 ? q - 1 : 0), A = 1; A < q; A++)
                me[A - 1] = arguments[A];
              E('error', T, me);
            }
          }
          function E(T, q, me) {
            {
              var A = S.ReactDebugCurrentFrame,
                M = A.getStackAddendum();
              M !== '' && ((q += '%s'), (me = me.concat([M])));
              var X = me.map(function (Y) {
                return String(Y);
              });
              X.unshift('Warning: ' + q), Function.prototype.apply.call(console[T], console, X);
            }
          }
          var y = !1,
            m = !1,
            O = !1,
            R = !1,
            D = !1,
            $;
          $ = Symbol.for('react.module.reference');
          function N(T) {
            return !!(
              typeof T == 'string' ||
              typeof T == 'function' ||
              T === r ||
              T === a ||
              D ||
              T === i ||
              T === u ||
              T === d ||
              R ||
              T === v ||
              y ||
              m ||
              O ||
              (typeof T == 'object' &&
                T !== null &&
                (T.$$typeof === b ||
                  T.$$typeof === p ||
                  T.$$typeof === s ||
                  T.$$typeof === l ||
                  T.$$typeof === c ||
                  T.$$typeof === $ ||
                  T.getModuleId !== void 0))
            );
          }
          function k(T, q, me) {
            var A = T.displayName;
            if (A) return A;
            var M = q.displayName || q.name || '';
            return M !== '' ? me + '(' + M + ')' : me;
          }
          function z(T) {
            return T.displayName || 'Context';
          }
          function j(T) {
            if (T == null) return null;
            if (
              (typeof T.tag == 'number' &&
                w(
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
                  return z(q) + '.Consumer';
                case s:
                  var me = T;
                  return z(me._context) + '.Provider';
                case c:
                  return k(T, T.render, 'ForwardRef');
                case p:
                  var A = T.displayName || null;
                  return A !== null ? A : j(T.type) || 'Memo';
                case b: {
                  var M = T,
                    X = M._payload,
                    Y = M._init;
                  try {
                    return j(Y(X));
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
            ie,
            Z,
            _,
            W,
            ne;
          function H() {}
          H.__reactDisabledLog = !0;
          function K() {
            {
              if (V === 0) {
                (B = console.log),
                  (Q = console.info),
                  (ie = console.warn),
                  (Z = console.error),
                  (_ = console.group),
                  (W = console.groupCollapsed),
                  (ne = console.groupEnd);
                var T = { configurable: !0, enumerable: !0, value: H, writable: !0 };
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
              V++;
            }
          }
          function oe() {
            {
              if ((V--, V === 0)) {
                var T = { configurable: !0, enumerable: !0, writable: !0 };
                Object.defineProperties(console, {
                  log: P({}, T, { value: B }),
                  info: P({}, T, { value: Q }),
                  warn: P({}, T, { value: ie }),
                  error: P({}, T, { value: Z }),
                  group: P({}, T, { value: _ }),
                  groupCollapsed: P({}, T, { value: W }),
                  groupEnd: P({}, T, { value: ne }),
                });
              }
              V < 0 &&
                w('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var ee = S.ReactCurrentDispatcher,
            re;
          function ce(T, q, me) {
            {
              if (re === void 0)
                try {
                  throw Error();
                } catch (M) {
                  var A = M.stack.trim().match(/\n( *(at )?)/);
                  re = (A && A[1]) || '';
                }
              return (
                `
` +
                re +
                T
              );
            }
          }
          var de = !1,
            xe;
          {
            var le = typeof WeakMap == 'function' ? WeakMap : Map;
            xe = new le();
          }
          function L(T, q) {
            if (!T || de) return '';
            {
              var me = xe.get(T);
              if (me !== void 0) return me;
            }
            var A;
            de = !0;
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
                  } catch (Pt) {
                    A = Pt;
                  }
                  Reflect.construct(T, [], Y);
                } else {
                  try {
                    Y.call();
                  } catch (Pt) {
                    A = Pt;
                  }
                  T.call(Y.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Pt) {
                  A = Pt;
                }
                T();
              }
            } catch (Pt) {
              if (Pt && A && typeof Pt.stack == 'string') {
                for (
                  var he = Pt.stack.split(`
`),
                    _e = A.stack.split(`
`),
                    Ie = he.length - 1,
                    ke = _e.length - 1;
                  Ie >= 1 && ke >= 0 && he[Ie] !== _e[ke];

                )
                  ke--;
                for (; Ie >= 1 && ke >= 0; Ie--, ke--)
                  if (he[Ie] !== _e[ke]) {
                    if (Ie !== 1 || ke !== 1)
                      do
                        if ((Ie--, ke--, ke < 0 || he[Ie] !== _e[ke])) {
                          var kt =
                            `
` + he[Ie].replace(' at new ', ' at ');
                          return (
                            T.displayName &&
                              kt.includes('<anonymous>') &&
                              (kt = kt.replace('<anonymous>', T.displayName)),
                            typeof T == 'function' && xe.set(T, kt),
                            kt
                          );
                        }
                      while (Ie >= 1 && ke >= 0);
                    break;
                  }
              }
            } finally {
              (de = !1), (ee.current = X), oe(), (Error.prepareStackTrace = M);
            }
            var En = T ? T.displayName || T.name : '',
              Oo = En ? ce(En) : '';
            return typeof T == 'function' && xe.set(T, Oo), Oo;
          }
          function Te(T, q, me) {
            return L(T, !1);
          }
          function F(T) {
            var q = T.prototype;
            return !!(q && q.isReactComponent);
          }
          function G(T, q, me) {
            if (T == null) return '';
            if (typeof T == 'function') return L(T, F(T));
            if (typeof T == 'string') return ce(T);
            switch (T) {
              case u:
                return ce('Suspense');
              case d:
                return ce('SuspenseList');
            }
            if (typeof T == 'object')
              switch (T.$$typeof) {
                case c:
                  return Te(T.render);
                case p:
                  return G(T.type, q, me);
                case b: {
                  var A = T,
                    M = A._payload,
                    X = A._init;
                  try {
                    return G(X(M), q, me);
                  } catch {}
                }
              }
            return '';
          }
          var Le = Object.prototype.hasOwnProperty,
            ve = {},
            Fe = S.ReactDebugCurrentFrame;
          function He(T) {
            if (T) {
              var q = T._owner,
                me = G(T.type, T._source, q ? q.type : null);
              Fe.setExtraStackFrame(me);
            } else Fe.setExtraStackFrame(null);
          }
          function Pe(T, q, me, A, M) {
            {
              var X = Function.call.bind(Le);
              for (var Y in T)
                if (X(T, Y)) {
                  var he = void 0;
                  try {
                    if (typeof T[Y] != 'function') {
                      var _e = Error(
                        (A || 'React class') +
                          ': ' +
                          me +
                          ' type `' +
                          Y +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof T[Y] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((_e.name = 'Invariant Violation'), _e);
                    }
                    he = T[Y](q, Y, A, me, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (Ie) {
                    he = Ie;
                  }
                  he &&
                    !(he instanceof Error) &&
                    (He(M),
                    w(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      A || 'React class',
                      me,
                      Y,
                      typeof he,
                    ),
                    He(null)),
                    he instanceof Error &&
                      !(he.message in ve) &&
                      ((ve[he.message] = !0),
                      He(M),
                      w('Failed %s type: %s', me, he.message),
                      He(null));
                }
            }
          }
          var Ae = Array.isArray;
          function ut(T) {
            return Ae(T);
          }
          function ht(T) {
            {
              var q = typeof Symbol == 'function' && Symbol.toStringTag,
                me = (q && T[Symbol.toStringTag]) || T.constructor.name || 'Object';
              return me;
            }
          }
          function ae(T) {
            try {
              return ye(T), !1;
            } catch {
              return !0;
            }
          }
          function ye(T) {
            return '' + T;
          }
          function we(T) {
            if (ae(T))
              return (
                w(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  ht(T),
                ),
                ye(T)
              );
          }
          var U = S.ReactCurrentOwner,
            fe = { key: !0, ref: !0, __self: !0, __source: !0 },
            pe,
            se,
            Ce;
          Ce = {};
          function Se(T) {
            if (Le.call(T, 'ref')) {
              var q = Object.getOwnPropertyDescriptor(T, 'ref').get;
              if (q && q.isReactWarning) return !1;
            }
            return T.ref !== void 0;
          }
          function De(T) {
            if (Le.call(T, 'key')) {
              var q = Object.getOwnPropertyDescriptor(T, 'key').get;
              if (q && q.isReactWarning) return !1;
            }
            return T.key !== void 0;
          }
          function bt(T, q) {
            if (typeof T.ref == 'string' && U.current && q && U.current.stateNode !== q) {
              var me = j(U.current.type);
              Ce[me] ||
                (w(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  j(U.current.type),
                  T.ref,
                ),
                (Ce[me] = !0));
            }
          }
          function dt(T, q) {
            {
              var me = function () {
                pe ||
                  ((pe = !0),
                  w(
                    '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    q,
                  ));
              };
              (me.isReactWarning = !0),
                Object.defineProperty(T, 'key', { get: me, configurable: !0 });
            }
          }
          function It(T, q) {
            {
              var me = function () {
                se ||
                  ((se = !0),
                  w(
                    '%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    q,
                  ));
              };
              (me.isReactWarning = !0),
                Object.defineProperty(T, 'ref', { get: me, configurable: !0 });
            }
          }
          var Qt = function (T, q, me, A, M, X, Y) {
            var he = { $$typeof: t, type: T, key: q, ref: me, props: Y, _owner: X };
            return (
              (he._store = {}),
              Object.defineProperty(he._store, 'validated', {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(he, '_self', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: A,
              }),
              Object.defineProperty(he, '_source', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: M,
              }),
              Object.freeze && (Object.freeze(he.props), Object.freeze(he)),
              he
            );
          };
          function _t(T, q, me, A, M) {
            {
              var X,
                Y = {},
                he = null,
                _e = null;
              me !== void 0 && (we(me), (he = '' + me)),
                De(q) && (we(q.key), (he = '' + q.key)),
                Se(q) && ((_e = q.ref), bt(q, M));
              for (X in q) Le.call(q, X) && !fe.hasOwnProperty(X) && (Y[X] = q[X]);
              if (T && T.defaultProps) {
                var Ie = T.defaultProps;
                for (X in Ie) Y[X] === void 0 && (Y[X] = Ie[X]);
              }
              if (he || _e) {
                var ke = typeof T == 'function' ? T.displayName || T.name || 'Unknown' : T;
                he && dt(Y, ke), _e && It(Y, ke);
              }
              return Qt(T, he, _e, M, A, U.current, Y);
            }
          }
          var Tt = S.ReactCurrentOwner,
            Rt = S.ReactDebugCurrentFrame;
          function vt(T) {
            if (T) {
              var q = T._owner,
                me = G(T.type, T._source, q ? q.type : null);
              Rt.setExtraStackFrame(me);
            } else Rt.setExtraStackFrame(null);
          }
          var We;
          We = !1;
          function pt(T) {
            return typeof T == 'object' && T !== null && T.$$typeof === t;
          }
          function Et() {
            {
              if (Tt.current) {
                var T = j(Tt.current.type);
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
          function en(T) {
            {
              if (T !== void 0) {
                var q = T.fileName.replace(/^.*[\\\/]/, ''),
                  me = T.lineNumber;
                return (
                  `

Check your code at ` +
                  q +
                  ':' +
                  me +
                  '.'
                );
              }
              return '';
            }
          }
          var Dt = {};
          function tn(T) {
            {
              var q = Et();
              if (!q) {
                var me = typeof T == 'string' ? T : T.displayName || T.name;
                me &&
                  (q =
                    `

Check the top-level render call using <` +
                    me +
                    '>.');
              }
              return q;
            }
          }
          function zt(T, q) {
            {
              if (!T._store || T._store.validated || T.key != null) return;
              T._store.validated = !0;
              var me = tn(q);
              if (Dt[me]) return;
              Dt[me] = !0;
              var A = '';
              T &&
                T._owner &&
                T._owner !== Tt.current &&
                (A = ' It was passed a child from ' + j(T._owner.type) + '.'),
                vt(T),
                w(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  me,
                  A,
                ),
                vt(null);
            }
          }
          function nn(T, q) {
            {
              if (typeof T != 'object') return;
              if (ut(T))
                for (var me = 0; me < T.length; me++) {
                  var A = T[me];
                  pt(A) && zt(A, q);
                }
              else if (pt(T)) T._store && (T._store.validated = !0);
              else if (T) {
                var M = f(T);
                if (typeof M == 'function' && M !== T.entries)
                  for (var X = M.call(T), Y; !(Y = X.next()).done; ) pt(Y.value) && zt(Y.value, q);
              }
            }
          }
          function pn(T) {
            {
              var q = T.type;
              if (q == null || typeof q == 'string') return;
              var me;
              if (typeof q == 'function') me = q.propTypes;
              else if (typeof q == 'object' && (q.$$typeof === c || q.$$typeof === p))
                me = q.propTypes;
              else return;
              if (me) {
                var A = j(q);
                Pe(me, T.props, 'prop', A, T);
              } else if (q.PropTypes !== void 0 && !We) {
                We = !0;
                var M = j(q);
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
          function fn(T) {
            {
              for (var q = Object.keys(T.props), me = 0; me < q.length; me++) {
                var A = q[me];
                if (A !== 'children' && A !== 'key') {
                  vt(T),
                    w(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      A,
                    ),
                    vt(null);
                  break;
                }
              }
              T.ref !== null &&
                (vt(T), w('Invalid attribute `ref` supplied to `React.Fragment`.'), vt(null));
            }
          }
          function mt(T, q, me, A, M, X) {
            {
              var Y = N(T);
              if (!Y) {
                var he = '';
                (T === void 0 ||
                  (typeof T == 'object' && T !== null && Object.keys(T).length === 0)) &&
                  (he +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var _e = en(M);
                _e ? (he += _e) : (he += Et());
                var Ie;
                T === null
                  ? (Ie = 'null')
                  : ut(T)
                  ? (Ie = 'array')
                  : T !== void 0 && T.$$typeof === t
                  ? ((Ie = '<' + (j(T.type) || 'Unknown') + ' />'),
                    (he = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (Ie = typeof T),
                  w(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    Ie,
                    he,
                  );
              }
              var ke = _t(T, q, me, M, X);
              if (ke == null) return ke;
              if (Y) {
                var kt = q.children;
                if (kt !== void 0)
                  if (A)
                    if (ut(kt)) {
                      for (var En = 0; En < kt.length; En++) nn(kt[En], T);
                      Object.freeze && Object.freeze(kt);
                    } else
                      w(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else nn(kt, T);
              }
              return T === r ? fn(ke) : pn(ke), ke;
            }
          }
          function on(T, q, me) {
            return mt(T, q, me, !0);
          }
          function Ve(T, q, me) {
            return mt(T, q, me, !1);
          }
          var yt = Ve,
            Bt = on;
          (Po.Fragment = r), (Po.jsx = yt), (Po.jsxs = Bt);
        })()),
    Po
  );
}
process.env.NODE_ENV === 'production' ? (Ji.exports = fp()) : (Ji.exports = mp());
var ga = Ji.exports;
const tr = ga.Fragment,
  I = ga.jsx,
  je = ga.jsxs,
  hp = { black: '#000', white: '#fff' },
  Yo = hp,
  bp = {
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
  no = bp,
  gp = {
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
  oo = gp,
  vp = {
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
  ro = vp,
  yp = {
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
  io = yp,
  xp = {
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
  ao = xp,
  Ep = {
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
  Io = Ep,
  Cp = {
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
  wp = Cp;
function vn(e, t) {
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
function lo(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function Sc(e) {
  if (!lo(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = Sc(e[o]);
    }),
    t
  );
}
function ln(e, t, o = { clone: !0 }) {
  const r = o.clone ? x({}, e) : e;
  return (
    lo(e) &&
      lo(t) &&
      Object.keys(t).forEach((i) => {
        i !== '__proto__' &&
          (lo(t[i]) && i in e && lo(e[i])
            ? (r[i] = ln(e[i], t[i], o))
            : o.clone
            ? (r[i] = lo(t[i]) ? Sc(t[i]) : t[i])
            : (r[i] = t[i]));
      }),
    r
  );
}
var Zi = { exports: {} },
  yr = { exports: {} },
  Qe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Es;
function Sp() {
  if (Es) return Qe;
  Es = 1;
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
    S = e ? Symbol.for('react.responder') : 60118,
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
    (Qe.AsyncMode = c),
    (Qe.ConcurrentMode = u),
    (Qe.ContextConsumer = l),
    (Qe.ContextProvider = s),
    (Qe.Element = t),
    (Qe.ForwardRef = d),
    (Qe.Fragment = r),
    (Qe.Lazy = g),
    (Qe.Memo = v),
    (Qe.Portal = o),
    (Qe.Profiler = a),
    (Qe.StrictMode = i),
    (Qe.Suspense = p),
    (Qe.isAsyncMode = function (m) {
      return y(m) || E(m) === c;
    }),
    (Qe.isConcurrentMode = y),
    (Qe.isContextConsumer = function (m) {
      return E(m) === l;
    }),
    (Qe.isContextProvider = function (m) {
      return E(m) === s;
    }),
    (Qe.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === t;
    }),
    (Qe.isForwardRef = function (m) {
      return E(m) === d;
    }),
    (Qe.isFragment = function (m) {
      return E(m) === r;
    }),
    (Qe.isLazy = function (m) {
      return E(m) === g;
    }),
    (Qe.isMemo = function (m) {
      return E(m) === v;
    }),
    (Qe.isPortal = function (m) {
      return E(m) === o;
    }),
    (Qe.isProfiler = function (m) {
      return E(m) === a;
    }),
    (Qe.isStrictMode = function (m) {
      return E(m) === i;
    }),
    (Qe.isSuspense = function (m) {
      return E(m) === p;
    }),
    (Qe.isValidElementType = function (m) {
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
            m.$$typeof === S ||
            m.$$typeof === w ||
            m.$$typeof === h))
      );
    }),
    (Qe.typeOf = E),
    Qe
  );
}
var et = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cs;
function Tp() {
  return (
    Cs ||
      ((Cs = 1),
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
            S = e ? Symbol.for('react.responder') : 60118,
            w = e ? Symbol.for('react.scope') : 60119;
          function E(L) {
            return (
              typeof L == 'string' ||
              typeof L == 'function' ||
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
                  L.$$typeof === S ||
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
            z = g,
            j = v,
            P = o,
            V = a,
            B = i,
            Q = p,
            ie = !1;
          function Z(L) {
            return (
              ie ||
                ((ie = !0),
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
          function ne(L) {
            return y(L) === s;
          }
          function H(L) {
            return typeof L == 'object' && L !== null && L.$$typeof === t;
          }
          function K(L) {
            return y(L) === d;
          }
          function oe(L) {
            return y(L) === r;
          }
          function ee(L) {
            return y(L) === g;
          }
          function re(L) {
            return y(L) === v;
          }
          function ce(L) {
            return y(L) === o;
          }
          function de(L) {
            return y(L) === a;
          }
          function xe(L) {
            return y(L) === i;
          }
          function le(L) {
            return y(L) === p;
          }
          (et.AsyncMode = m),
            (et.ConcurrentMode = O),
            (et.ContextConsumer = R),
            (et.ContextProvider = D),
            (et.Element = $),
            (et.ForwardRef = N),
            (et.Fragment = k),
            (et.Lazy = z),
            (et.Memo = j),
            (et.Portal = P),
            (et.Profiler = V),
            (et.StrictMode = B),
            (et.Suspense = Q),
            (et.isAsyncMode = Z),
            (et.isConcurrentMode = _),
            (et.isContextConsumer = W),
            (et.isContextProvider = ne),
            (et.isElement = H),
            (et.isForwardRef = K),
            (et.isFragment = oe),
            (et.isLazy = ee),
            (et.isMemo = re),
            (et.isPortal = ce),
            (et.isProfiler = de),
            (et.isStrictMode = xe),
            (et.isSuspense = le),
            (et.isValidElementType = E),
            (et.typeOf = y);
        })()),
    et
  );
}
var ws;
function Tc() {
  return (
    ws ||
      ((ws = 1), process.env.NODE_ENV === 'production' ? (yr.exports = Sp()) : (yr.exports = Tp())),
    yr.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var Ii, Ss;
function Rp() {
  if (Ss) return Ii;
  Ss = 1;
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
    (Ii = i()
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
    Ii
  );
}
var _i, Ts;
function va() {
  if (Ts) return _i;
  Ts = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (_i = e), _i;
}
var Mi, Rs;
function Rc() {
  return Rs || ((Rs = 1), (Mi = Function.call.bind(Object.prototype.hasOwnProperty))), Mi;
}
var Ai, Os;
function Op() {
  if (Os) return Ai;
  Os = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = va(),
      o = {},
      r = Rc();
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
    (Ai = i),
    Ai
  );
}
var Di, ks;
function kp() {
  if (ks) return Di;
  ks = 1;
  var e = Tc(),
    t = Rp(),
    o = va(),
    r = Rc(),
    i = Op(),
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
    (Di = function (l, c) {
      var u = typeof Symbol == 'function' && Symbol.iterator,
        d = '@@iterator';
      function p(_) {
        var W = _ && ((u && _[u]) || _[d]);
        if (typeof W == 'function') return W;
      }
      var b = '<<anonymous>>',
        v = {
          array: S('array'),
          bigint: S('bigint'),
          bool: S('boolean'),
          func: S('function'),
          number: S('number'),
          object: S('object'),
          string: S('string'),
          symbol: S('symbol'),
          any: w(),
          arrayOf: E,
          element: y(),
          elementType: m(),
          instanceOf: O,
          node: N(),
          objectOf: D,
          oneOf: R,
          oneOfType: $,
          shape: z,
          exact: j,
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
            ne = 0;
        function H(oe, ee, re, ce, de, xe, le) {
          if (((ce = ce || b), (xe = xe || re), le !== o)) {
            if (c) {
              var L = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((L.name = 'Invariant Violation'), L);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Te = ce + ':' + re;
              !W[Te] &&
                ne < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    xe +
                    '` prop on `' +
                    ce +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (W[Te] = !0),
                ne++);
            }
          }
          return ee[re] == null
            ? oe
              ? ee[re] === null
                ? new h(
                    'The ' +
                      de +
                      ' `' +
                      xe +
                      '` is marked as required ' +
                      ('in `' + ce + '`, but its value is `null`.'),
                  )
                : new h(
                    'The ' +
                      de +
                      ' `' +
                      xe +
                      '` is marked as required in ' +
                      ('`' + ce + '`, but its value is `undefined`.'),
                  )
              : null
            : _(ee, re, ce, de, xe);
        }
        var K = H.bind(null, !1);
        return (K.isRequired = H.bind(null, !0)), K;
      }
      function S(_) {
        function W(ne, H, K, oe, ee, re) {
          var ce = ne[H],
            de = B(ce);
          if (de !== _) {
            var xe = Q(ce);
            return new h(
              'Invalid ' +
                oe +
                ' `' +
                ee +
                '` of type ' +
                ('`' + xe + '` supplied to `' + K + '`, expected ') +
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
        function W(ne, H, K, oe, ee) {
          if (typeof _ != 'function')
            return new h(
              'Property `' +
                ee +
                '` of component `' +
                K +
                '` has invalid PropType notation inside arrayOf.',
            );
          var re = ne[H];
          if (!Array.isArray(re)) {
            var ce = B(re);
            return new h(
              'Invalid ' +
                oe +
                ' `' +
                ee +
                '` of type ' +
                ('`' + ce + '` supplied to `' + K + '`, expected an array.'),
            );
          }
          for (var de = 0; de < re.length; de++) {
            var xe = _(re, de, K, oe, ee + '[' + de + ']', o);
            if (xe instanceof Error) return xe;
          }
          return null;
        }
        return f(W);
      }
      function y() {
        function _(W, ne, H, K, oe) {
          var ee = W[ne];
          if (!l(ee)) {
            var re = B(ee);
            return new h(
              'Invalid ' +
                K +
                ' `' +
                oe +
                '` of type ' +
                ('`' + re + '` supplied to `' + H + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return f(_);
      }
      function m() {
        function _(W, ne, H, K, oe) {
          var ee = W[ne];
          if (!e.isValidElementType(ee)) {
            var re = B(ee);
            return new h(
              'Invalid ' +
                K +
                ' `' +
                oe +
                '` of type ' +
                ('`' + re + '` supplied to `' + H + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return f(_);
      }
      function O(_) {
        function W(ne, H, K, oe, ee) {
          if (!(ne[H] instanceof _)) {
            var re = _.name || b,
              ce = Z(ne[H]);
            return new h(
              'Invalid ' +
                oe +
                ' `' +
                ee +
                '` of type ' +
                ('`' + ce + '` supplied to `' + K + '`, expected ') +
                ('instance of `' + re + '`.'),
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
        function W(ne, H, K, oe, ee) {
          for (var re = ne[H], ce = 0; ce < _.length; ce++) if (g(re, _[ce])) return null;
          var de = JSON.stringify(_, function (le, L) {
            var Te = Q(L);
            return Te === 'symbol' ? String(L) : L;
          });
          return new h(
            'Invalid ' +
              oe +
              ' `' +
              ee +
              '` of value `' +
              String(re) +
              '` ' +
              ('supplied to `' + K + '`, expected one of ' + de + '.'),
          );
        }
        return f(W);
      }
      function D(_) {
        function W(ne, H, K, oe, ee) {
          if (typeof _ != 'function')
            return new h(
              'Property `' +
                ee +
                '` of component `' +
                K +
                '` has invalid PropType notation inside objectOf.',
            );
          var re = ne[H],
            ce = B(re);
          if (ce !== 'object')
            return new h(
              'Invalid ' +
                oe +
                ' `' +
                ee +
                '` of type ' +
                ('`' + ce + '` supplied to `' + K + '`, expected an object.'),
            );
          for (var de in re)
            if (r(re, de)) {
              var xe = _(re, de, K, oe, ee + '.' + de, o);
              if (xe instanceof Error) return xe;
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
          var ne = _[W];
          if (typeof ne != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  ie(ne) +
                  ' at index ' +
                  W +
                  '.',
              ),
              s
            );
        }
        function H(K, oe, ee, re, ce) {
          for (var de = [], xe = 0; xe < _.length; xe++) {
            var le = _[xe],
              L = le(K, oe, ee, re, ce, o);
            if (L == null) return null;
            L.data && r(L.data, 'expectedType') && de.push(L.data.expectedType);
          }
          var Te = de.length > 0 ? ', expected one of type [' + de.join(', ') + ']' : '';
          return new h(
            'Invalid ' + re + ' `' + ce + '` supplied to ' + ('`' + ee + '`' + Te + '.'),
          );
        }
        return f(H);
      }
      function N() {
        function _(W, ne, H, K, oe) {
          return P(W[ne])
            ? null
            : new h(
                'Invalid ' +
                  K +
                  ' `' +
                  oe +
                  '` supplied to ' +
                  ('`' + H + '`, expected a ReactNode.'),
              );
        }
        return f(_);
      }
      function k(_, W, ne, H, K) {
        return new h(
          (_ || 'React class') +
            ': ' +
            W +
            ' type `' +
            ne +
            '.' +
            H +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            K +
            '`.',
        );
      }
      function z(_) {
        function W(ne, H, K, oe, ee) {
          var re = ne[H],
            ce = B(re);
          if (ce !== 'object')
            return new h(
              'Invalid ' +
                oe +
                ' `' +
                ee +
                '` of type `' +
                ce +
                '` ' +
                ('supplied to `' + K + '`, expected `object`.'),
            );
          for (var de in _) {
            var xe = _[de];
            if (typeof xe != 'function') return k(K, oe, ee, de, Q(xe));
            var le = xe(re, de, K, oe, ee + '.' + de, o);
            if (le) return le;
          }
          return null;
        }
        return f(W);
      }
      function j(_) {
        function W(ne, H, K, oe, ee) {
          var re = ne[H],
            ce = B(re);
          if (ce !== 'object')
            return new h(
              'Invalid ' +
                oe +
                ' `' +
                ee +
                '` of type `' +
                ce +
                '` ' +
                ('supplied to `' + K + '`, expected `object`.'),
            );
          var de = t({}, ne[H], _);
          for (var xe in de) {
            var le = _[xe];
            if (r(_, xe) && typeof le != 'function') return k(K, oe, ee, xe, Q(le));
            if (!le)
              return new h(
                'Invalid ' +
                  oe +
                  ' `' +
                  ee +
                  '` key `' +
                  xe +
                  '` supplied to `' +
                  K +
                  '`.\nBad object: ' +
                  JSON.stringify(ne[H], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(_), null, '  '),
              );
            var L = le(re, xe, K, oe, ee + '.' + xe, o);
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
              var ne = W.call(_),
                H;
              if (W !== _.entries) {
                for (; !(H = ne.next()).done; ) if (!P(H.value)) return !1;
              } else
                for (; !(H = ne.next()).done; ) {
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
      function ie(_) {
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
    Di
  );
}
var Li, Ns;
function Np() {
  if (Ns) return Li;
  Ns = 1;
  var e = va();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (Li = function () {
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
    Li
  );
}
if (process.env.NODE_ENV !== 'production') {
  var $p = Tc(),
    Pp = !0;
  Zi.exports = kp()($p.isElement, Pp);
} else Zi.exports = Np()();
var Ip = Zi.exports;
const n = pp(Ip);
function _p(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Oc(e, t, o, r, i) {
  const a = e[t],
    s = i || t;
  if (a == null || typeof window > 'u') return null;
  let l;
  const c = a.type;
  return (
    typeof c == 'function' &&
      !_p(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const kc = vn(n.element, Oc);
kc.isRequired = vn(n.element.isRequired, Oc);
const Co = kc;
function Mp(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Ap(e, t, o, r, i) {
  const a = e[t],
    s = i || t;
  if (a == null || typeof window > 'u') return null;
  let l;
  return (
    typeof a == 'function' &&
      !Mp(a) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const ya = vn(n.elementType, Ap),
  Dp = 'exact-prop: ​';
function xa(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : x({}, e, {
        [Dp]: (t) => {
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
function jn(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let o = 1; o < arguments.length; o += 1) t += '&args[]=' + encodeURIComponent(arguments[o]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var Qi = { exports: {} },
  tt = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $s;
function Lp() {
  if ($s) return tt;
  $s = 1;
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
      var S = f.$$typeof;
      switch (S) {
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
                  return S;
              }
          }
        case t:
          return S;
      }
    }
  }
  return (
    (tt.ContextConsumer = s),
    (tt.ContextProvider = a),
    (tt.Element = e),
    (tt.ForwardRef = c),
    (tt.Fragment = o),
    (tt.Lazy = b),
    (tt.Memo = p),
    (tt.Portal = t),
    (tt.Profiler = i),
    (tt.StrictMode = r),
    (tt.Suspense = u),
    (tt.SuspenseList = d),
    (tt.isAsyncMode = function () {
      return !1;
    }),
    (tt.isConcurrentMode = function () {
      return !1;
    }),
    (tt.isContextConsumer = function (f) {
      return h(f) === s;
    }),
    (tt.isContextProvider = function (f) {
      return h(f) === a;
    }),
    (tt.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === e;
    }),
    (tt.isForwardRef = function (f) {
      return h(f) === c;
    }),
    (tt.isFragment = function (f) {
      return h(f) === o;
    }),
    (tt.isLazy = function (f) {
      return h(f) === b;
    }),
    (tt.isMemo = function (f) {
      return h(f) === p;
    }),
    (tt.isPortal = function (f) {
      return h(f) === t;
    }),
    (tt.isProfiler = function (f) {
      return h(f) === i;
    }),
    (tt.isStrictMode = function (f) {
      return h(f) === r;
    }),
    (tt.isSuspense = function (f) {
      return h(f) === u;
    }),
    (tt.isSuspenseList = function (f) {
      return h(f) === d;
    }),
    (tt.isValidElementType = function (f) {
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
    (tt.typeOf = h),
    tt
  );
}
var nt = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ps;
function Fp() {
  return (
    Ps ||
      ((Ps = 1),
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
            S = !1,
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
              S ||
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
                  F.$$typeof === c ||
                  F.$$typeof === E ||
                  F.getModuleId !== void 0))
            );
          }
          function m(F) {
            if (typeof F == 'object' && F !== null) {
              var G = F.$$typeof;
              switch (G) {
                case e:
                  var Le = F.type;
                  switch (Le) {
                    case o:
                    case i:
                    case r:
                    case u:
                    case d:
                      return Le;
                    default:
                      var ve = Le && Le.$$typeof;
                      switch (ve) {
                        case l:
                        case s:
                        case c:
                        case b:
                        case p:
                        case a:
                          return ve;
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
            z = p,
            j = t,
            P = i,
            V = r,
            B = u,
            Q = d,
            ie = !1,
            Z = !1;
          function _(F) {
            return (
              ie ||
                ((ie = !0),
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
          function ne(F) {
            return m(F) === s;
          }
          function H(F) {
            return m(F) === a;
          }
          function K(F) {
            return typeof F == 'object' && F !== null && F.$$typeof === e;
          }
          function oe(F) {
            return m(F) === c;
          }
          function ee(F) {
            return m(F) === o;
          }
          function re(F) {
            return m(F) === b;
          }
          function ce(F) {
            return m(F) === p;
          }
          function de(F) {
            return m(F) === t;
          }
          function xe(F) {
            return m(F) === i;
          }
          function le(F) {
            return m(F) === r;
          }
          function L(F) {
            return m(F) === u;
          }
          function Te(F) {
            return m(F) === d;
          }
          (nt.ContextConsumer = O),
            (nt.ContextProvider = R),
            (nt.Element = D),
            (nt.ForwardRef = $),
            (nt.Fragment = N),
            (nt.Lazy = k),
            (nt.Memo = z),
            (nt.Portal = j),
            (nt.Profiler = P),
            (nt.StrictMode = V),
            (nt.Suspense = B),
            (nt.SuspenseList = Q),
            (nt.isAsyncMode = _),
            (nt.isConcurrentMode = W),
            (nt.isContextConsumer = ne),
            (nt.isContextProvider = H),
            (nt.isElement = K),
            (nt.isForwardRef = oe),
            (nt.isFragment = ee),
            (nt.isLazy = re),
            (nt.isMemo = ce),
            (nt.isPortal = de),
            (nt.isProfiler = xe),
            (nt.isStrictMode = le),
            (nt.isSuspense = L),
            (nt.isSuspenseList = Te),
            (nt.isValidElementType = y),
            (nt.typeOf = m);
        })()),
    nt
  );
}
process.env.NODE_ENV === 'production' ? (Qi.exports = Lp()) : (Qi.exports = Fp());
var Is = Qi.exports;
const jp = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function zp(e) {
  const t = `${e}`.match(jp);
  return (t && t[1]) || '';
}
function Nc(e, t = '') {
  return e.displayName || e.name || zp(e) || t;
}
function _s(e, t, o) {
  const r = Nc(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function Vp(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return Nc(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Is.ForwardRef:
          return _s(e, e.render, 'ForwardRef');
        case Is.Memo:
          return _s(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function Rn(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = e[t],
    s = i || t;
  return a == null
    ? null
    : a && a.nodeType !== 1
    ? new Error(`Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an HTMLElement.`)
    : null;
}
const Bp = n.oneOfType([n.func, n.object]),
  qt = Bp;
function ue(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : jn(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ms(...e) {
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
function $c(e, t = 166) {
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
function Fi(e, t) {
  return C.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function St(e) {
  return (e && e.ownerDocument) || document;
}
function Jn(e) {
  return St(e).defaultView || window;
}
function Mr(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const Wp = typeof window < 'u' ? C.useLayoutEffect : C.useEffect,
  On = Wp;
let As = 0;
function Up(e) {
  const [t, o] = C.useState(e),
    r = e || t;
  return (
    C.useEffect(() => {
      t == null && ((As += 1), o(`mui-${As}`));
    }, [t]),
    r
  );
}
const Ds = C['useId'];
function Pc(e) {
  if (Ds !== void 0) {
    const t = Ds();
    return e ?? t;
  }
  return Up(e);
}
function Hp(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = i || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${a}\` is not supported. Please remove it.`)
    : null;
}
function Gn({ controlled: e, default: t, name: o, state: r = 'value' }) {
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
function jt(e) {
  const t = C.useRef(e);
  return (
    On(() => {
      t.current = e;
    }),
    C.useCallback((...o) => (0, t.current)(...o), [])
  );
}
function Ot(...e) {
  return C.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              Mr(o, t);
            });
          },
    e,
  );
}
let Gr = !0,
  ea = !1,
  Ls;
const qp = {
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
function Kp(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && qp[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function Yp(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Gr = !0);
}
function ji() {
  Gr = !1;
}
function Gp() {
  this.visibilityState === 'hidden' && ea && (Gr = !0);
}
function Xp(e) {
  e.addEventListener('keydown', Yp, !0),
    e.addEventListener('mousedown', ji, !0),
    e.addEventListener('pointerdown', ji, !0),
    e.addEventListener('touchstart', ji, !0),
    e.addEventListener('visibilitychange', Gp, !0);
}
function Jp(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return Gr || Kp(t);
}
function Ic() {
  const e = C.useCallback((i) => {
      i != null && Xp(i.ownerDocument);
    }, []),
    t = C.useRef(!1);
  function o() {
    return t.current
      ? ((ea = !0),
        window.clearTimeout(Ls),
        (Ls = window.setTimeout(() => {
          ea = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(i) {
    return Jp(i) ? ((t.current = !0), !0) : !1;
  }
  return { isFocusVisibleRef: t, onFocus: r, onBlur: o, ref: e };
}
function _c(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const Zp = (e) => {
    const t = C.useRef({});
    return (
      C.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  Qp = Zp,
  ef = {
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
  tf = ef;
function nf(e) {
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
function of(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const rf = Number.isInteger || of;
function Mc(e, t, o, r) {
  const i = e[t];
  if (i == null || !rf(i)) {
    const a = nf(i);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function Ac(e, t, ...o) {
  return e[t] === void 0 ? null : Mc(e, t, ...o);
}
function ta() {
  return null;
}
Ac.isRequired = Mc;
ta.isRequired = ta;
const Ea = process.env.NODE_ENV === 'production' ? ta : Ac;
function Ca(e, t) {
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
                o[r][s] = Ca(i[s], a[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function Ge(e, t, o = void 0) {
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
const Fs = (e) => e,
  af = () => {
    let e = Fs;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Fs;
      },
    };
  },
  sf = af(),
  lf = sf,
  cf = {
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
function Ue(e, t, o = 'Mui') {
  const r = cf[t];
  return r ? `${o}-${r}` : `${lf.generate(e)}-${t}`;
}
function Be(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((i) => {
      r[i] = Ue(e, i, o);
    }),
    r
  );
}
function Re(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) (i = r[a]), !(t.indexOf(i) >= 0) && (o[i] = e[i]);
  return o;
}
function Dc(e) {
  var t = Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var uf =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  df = Dc(function (e) {
    return (
      uf.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
    );
  });
function pf(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function ff(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var mf = (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(ff(this));
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
          var s = pf(i);
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
  Ft = '-ms-',
  Ar = '-moz-',
  Xe = '-webkit-',
  wa = 'comm',
  Sa = 'rule',
  Ta = 'decl',
  hf = '@import',
  Lc = '@keyframes',
  bf = Math.abs,
  Xr = String.fromCharCode,
  gf = Object.assign;
function vf(e, t) {
  return Mt(e, 0) ^ 45
    ? (((((((t << 2) ^ Mt(e, 0)) << 2) ^ Mt(e, 1)) << 2) ^ Mt(e, 2)) << 2) ^ Mt(e, 3)
    : 0;
}
function Fc(e) {
  return e.trim();
}
function yf(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function st(e, t, o) {
  return e.replace(t, o);
}
function na(e, t) {
  return e.indexOf(t);
}
function Mt(e, t) {
  return e.charCodeAt(t) | 0;
}
function Go(e, t, o) {
  return e.slice(t, o);
}
function wn(e) {
  return e.length;
}
function Ra(e) {
  return e.length;
}
function xr(e, t) {
  return t.push(e), e;
}
function xf(e, t) {
  return e.map(t).join('');
}
var Jr = 1,
  mo = 1,
  jc = 0,
  Ht = 0,
  Nt = 0,
  wo = '';
function Zr(e, t, o, r, i, a, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: i,
    children: a,
    line: Jr,
    column: mo,
    length: s,
    return: '',
  };
}
function _o(e, t) {
  return gf(Zr('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function Ef() {
  return Nt;
}
function Cf() {
  return (Nt = Ht > 0 ? Mt(wo, --Ht) : 0), mo--, Nt === 10 && ((mo = 1), Jr--), Nt;
}
function Jt() {
  return (Nt = Ht < jc ? Mt(wo, Ht++) : 0), mo++, Nt === 10 && ((mo = 1), Jr++), Nt;
}
function Tn() {
  return Mt(wo, Ht);
}
function kr() {
  return Ht;
}
function nr(e, t) {
  return Go(wo, e, t);
}
function Xo(e) {
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
function zc(e) {
  return (Jr = mo = 1), (jc = wn((wo = e))), (Ht = 0), [];
}
function Vc(e) {
  return (wo = ''), e;
}
function Nr(e) {
  return Fc(nr(Ht - 1, oa(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function wf(e) {
  for (; (Nt = Tn()) && Nt < 33; ) Jt();
  return Xo(e) > 2 || Xo(Nt) > 3 ? '' : ' ';
}
function Sf(e, t) {
  for (; --t && Jt() && !(Nt < 48 || Nt > 102 || (Nt > 57 && Nt < 65) || (Nt > 70 && Nt < 97)); );
  return nr(e, kr() + (t < 6 && Tn() == 32 && Jt() == 32));
}
function oa(e) {
  for (; Jt(); )
    switch (Nt) {
      case e:
        return Ht;
      case 34:
      case 39:
        e !== 34 && e !== 39 && oa(Nt);
        break;
      case 40:
        e === 41 && oa(e);
        break;
      case 92:
        Jt();
        break;
    }
  return Ht;
}
function Tf(e, t) {
  for (; Jt() && e + Nt !== 47 + 10; ) if (e + Nt === 42 + 42 && Tn() === 47) break;
  return '/*' + nr(t, Ht - 1) + '*' + Xr(e === 47 ? e : Jt());
}
function Rf(e) {
  for (; !Xo(Tn()); ) Jt();
  return nr(e, Ht);
}
function Of(e) {
  return Vc($r('', null, null, null, [''], (e = zc(e)), 0, [0], e));
}
function $r(e, t, o, r, i, a, s, l, c) {
  for (
    var u = 0,
      d = 0,
      p = s,
      b = 0,
      v = 0,
      g = 0,
      h = 1,
      f = 1,
      S = 1,
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
        if (g != 108 && Mt(R, p - 1) == 58) {
          na((R += st(Nr(w), '&', '&\f')), '&\f') != -1 && (S = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        R += Nr(w);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        R += wf(g);
        break;
      case 92:
        R += Sf(kr() - 1, 7);
        continue;
      case 47:
        switch (Tn()) {
          case 42:
          case 47:
            xr(kf(Tf(Jt(), kr()), t, o), c);
            break;
          default:
            R += '/';
        }
        break;
      case 123 * h:
        l[u++] = wn(R) * S;
      case 125 * h:
      case 59:
      case 0:
        switch (w) {
          case 0:
          case 125:
            f = 0;
          case 59 + d:
            v > 0 &&
              wn(R) - p &&
              xr(v > 32 ? zs(R + ';', r, o, p - 1) : zs(st(R, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            R += ';';
          default:
            if ((xr((O = js(R, t, o, u, d, i, l, E, (y = []), (m = []), p)), a), w === 123))
              if (d === 0) $r(R, t, O, O, y, a, p, l, m);
              else
                switch (b === 99 && Mt(R, 3) === 110 ? 100 : b) {
                  case 100:
                  case 109:
                  case 115:
                    $r(
                      e,
                      O,
                      O,
                      r && xr(js(e, O, O, 0, 0, i, l, E, i, (y = []), p), m),
                      i,
                      m,
                      p,
                      l,
                      r ? y : m,
                    );
                    break;
                  default:
                    $r(R, O, O, O, [''], m, 0, l, m);
                }
        }
        (u = d = v = 0), (h = S = 1), (E = R = ''), (p = s);
        break;
      case 58:
        (p = 1 + wn(R)), (v = g);
      default:
        if (h < 1) {
          if (w == 123) --h;
          else if (w == 125 && h++ == 0 && Cf() == 125) continue;
        }
        switch (((R += Xr(w)), w * h)) {
          case 38:
            S = d > 0 ? 1 : ((R += '\f'), -1);
            break;
          case 44:
            (l[u++] = (wn(R) - 1) * S), (S = 1);
            break;
          case 64:
            Tn() === 45 && (R += Nr(Jt())), (b = Tn()), (d = p = wn((E = R += Rf(kr())))), w++;
            break;
          case 45:
            g === 45 && wn(R) == 2 && (h = 0);
        }
    }
  return a;
}
function js(e, t, o, r, i, a, s, l, c, u, d) {
  for (var p = i - 1, b = i === 0 ? a : [''], v = Ra(b), g = 0, h = 0, f = 0; g < r; ++g)
    for (var S = 0, w = Go(e, p + 1, (p = bf((h = s[g])))), E = e; S < v; ++S)
      (E = Fc(h > 0 ? b[S] + ' ' + w : st(w, /&\f/g, b[S]))) && (c[f++] = E);
  return Zr(e, t, o, i === 0 ? Sa : l, c, u, d);
}
function kf(e, t, o) {
  return Zr(e, t, o, wa, Xr(Ef()), Go(e, 2, -2), 0);
}
function zs(e, t, o, r) {
  return Zr(e, t, o, Ta, Go(e, 0, r), Go(e, r + 1, -1), r);
}
function uo(e, t) {
  for (var o = '', r = Ra(e), i = 0; i < r; i++) o += t(e[i], i, e, t) || '';
  return o;
}
function Nf(e, t, o, r) {
  switch (e.type) {
    case hf:
    case Ta:
      return (e.return = e.return || e.value);
    case wa:
      return '';
    case Lc:
      return (e.return = e.value + '{' + uo(e.children, r) + '}');
    case Sa:
      e.value = e.props.join(',');
  }
  return wn((o = uo(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function $f(e) {
  var t = Ra(e);
  return function (o, r, i, a) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, i, a) || '';
    return s;
  };
}
function Pf(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var If = function (t, o, r) {
    for (var i = 0, a = 0; (i = a), (a = Tn()), i === 38 && a === 12 && (o[r] = 1), !Xo(a); ) Jt();
    return nr(t, Ht);
  },
  _f = function (t, o) {
    var r = -1,
      i = 44;
    do
      switch (Xo(i)) {
        case 0:
          i === 38 && Tn() === 12 && (o[r] = 1), (t[r] += If(Ht - 1, o, r));
          break;
        case 2:
          t[r] += Nr(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = Tn() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += Xr(i);
      }
    while ((i = Jt()));
    return t;
  },
  Mf = function (t, o) {
    return Vc(_f(zc(t), o));
  },
  Vs = new WeakMap(),
  Af = function (t) {
    if (!(t.type !== 'rule' || !t.parent || t.length < 1)) {
      for (
        var o = t.value, r = t.parent, i = t.column === r.column && t.line === r.line;
        r.type !== 'rule';

      )
        if (((r = r.parent), !r)) return;
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !Vs.get(r)) && !i) {
        Vs.set(t, !0);
        for (var a = [], s = Mf(o, a), l = r.props, c = 0, u = 0; c < s.length; c++)
          for (var d = 0; d < l.length; d++, u++)
            t.props[u] = a[c] ? s[c].replace(/&\f/g, l[d]) : l[d] + ' ' + s[c];
      }
    }
  },
  Df = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      o.charCodeAt(0) === 108 && o.charCodeAt(2) === 98 && ((t.return = ''), (t.value = ''));
    }
  },
  Lf =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  Ff = function (t) {
    return t.type === 'comm' && t.children.indexOf(Lf) > -1;
  },
  jf = function (t) {
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
              if (Ff(u)) return;
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
  Bc = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  zf = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!Bc(o[r])) return !0;
    return !1;
  },
  Bs = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  Vf = function (t, o, r) {
    Bc(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          Bs(t))
        : zf(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          Bs(t)));
  };
function Wc(e, t) {
  switch (vf(e, t)) {
    case 5103:
      return Xe + 'print-' + e + e;
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
      return Xe + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Xe + e + Ar + e + Ft + e + e;
    case 6828:
    case 4268:
      return Xe + e + Ft + e + e;
    case 6165:
      return Xe + e + Ft + 'flex-' + e + e;
    case 5187:
      return Xe + e + st(e, /(\w+).+(:[^]+)/, Xe + 'box-$1$2' + Ft + 'flex-$1$2') + e;
    case 5443:
      return Xe + e + Ft + 'flex-item-' + st(e, /flex-|-self/, '') + e;
    case 4675:
      return Xe + e + Ft + 'flex-line-pack' + st(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return Xe + e + Ft + st(e, 'shrink', 'negative') + e;
    case 5292:
      return Xe + e + Ft + st(e, 'basis', 'preferred-size') + e;
    case 6060:
      return Xe + 'box-' + st(e, '-grow', '') + Xe + e + Ft + st(e, 'grow', 'positive') + e;
    case 4554:
      return Xe + st(e, /([^-])(transform)/g, '$1' + Xe + '$2') + e;
    case 6187:
      return st(st(st(e, /(zoom-|grab)/, Xe + '$1'), /(image-set)/, Xe + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return st(e, /(image-set\([^]*)/, Xe + '$1$`$1');
    case 4968:
      return (
        st(
          st(e, /(.+:)(flex-)?(.*)/, Xe + 'box-pack:$3' + Ft + 'flex-pack:$3'),
          /s.+-b[^;]+/,
          'justify',
        ) +
        Xe +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return st(e, /(.+)-inline(.+)/, Xe + '$1$2') + e;
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
      if (wn(e) - 1 - t > 6)
        switch (Mt(e, t + 1)) {
          case 109:
            if (Mt(e, t + 4) !== 45) break;
          case 102:
            return (
              st(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + Xe + '$2-$3$1' + Ar + (Mt(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~na(e, 'stretch') ? Wc(st(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (Mt(e, t + 1) !== 115) break;
    case 6444:
      switch (Mt(e, wn(e) - 3 - (~na(e, '!important') && 10))) {
        case 107:
          return st(e, ':', ':' + Xe) + e;
        case 101:
          return (
            st(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                Xe +
                (Mt(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                Xe +
                '$2$3$1' +
                Ft +
                '$2box$3',
            ) + e
          );
      }
      break;
    case 5936:
      switch (Mt(e, t + 11)) {
        case 114:
          return Xe + e + Ft + st(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return Xe + e + Ft + st(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return Xe + e + Ft + st(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return Xe + e + Ft + e + e;
  }
  return e;
}
var Bf = function (t, o, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Ta:
          t.return = Wc(t.value, t.length);
          break;
        case Lc:
          return uo([_o(t, { value: st(t.value, '@', '@' + Xe) })], i);
        case Sa:
          if (t.length)
            return xf(t.props, function (a) {
              switch (yf(a, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return uo([_o(t, { props: [st(a, /:(read-\w+)/, ':' + Ar + '$1')] })], i);
                case '::placeholder':
                  return uo(
                    [
                      _o(t, { props: [st(a, /:(plac\w+)/, ':' + Xe + 'input-$1')] }),
                      _o(t, { props: [st(a, /:(plac\w+)/, ':' + Ar + '$1')] }),
                      _o(t, { props: [st(a, /:(plac\w+)/, Ft + 'input-$1')] }),
                    ],
                    i,
                  );
              }
              return '';
            });
      }
  },
  Wf = [Bf],
  Uf = function (t) {
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
    var i = t.stylisPlugins || Wf;
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
        function (h) {
          for (var f = h.getAttribute('data-emotion').split(' '), S = 1; S < f.length; S++)
            a[f[S]] = !0;
          l.push(h);
        },
      );
    var c,
      u = [Af, Df];
    process.env.NODE_ENV !== 'production' &&
      u.push(
        jf({
          get compat() {
            return g.compat;
          },
        }),
        Vf,
      );
    {
      var d,
        p = [
          Nf,
          process.env.NODE_ENV !== 'production'
            ? function (h) {
                h.root ||
                  (h.return
                    ? d.insert(h.return)
                    : h.value && h.type !== wa && d.insert(h.value + '{}'));
              }
            : Pf(function (h) {
                d.insert(h);
              }),
        ],
        b = $f(u.concat(i, p)),
        v = function (f) {
          return uo(Of(f), b);
        };
      c = function (f, S, w, E) {
        (d = w),
          process.env.NODE_ENV !== 'production' &&
            S.map !== void 0 &&
            (d = {
              insert: function (m) {
                w.insert(m + S.map);
              },
            }),
          v(f ? f + '{' + S.styles + '}' : S.styles),
          E && (g.inserted[S.name] = !0);
      };
    }
    var g = {
      key: o,
      sheet: new mf({
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
  ra = { exports: {} },
  ot = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ws;
function Hf() {
  if (Ws) return ot;
  Ws = 1;
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
    S = e ? Symbol.for('react.responder') : 60118,
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
    (ot.AsyncMode = c),
    (ot.ConcurrentMode = u),
    (ot.ContextConsumer = l),
    (ot.ContextProvider = s),
    (ot.Element = t),
    (ot.ForwardRef = d),
    (ot.Fragment = r),
    (ot.Lazy = g),
    (ot.Memo = v),
    (ot.Portal = o),
    (ot.Profiler = a),
    (ot.StrictMode = i),
    (ot.Suspense = p),
    (ot.isAsyncMode = function (m) {
      return y(m) || E(m) === c;
    }),
    (ot.isConcurrentMode = y),
    (ot.isContextConsumer = function (m) {
      return E(m) === l;
    }),
    (ot.isContextProvider = function (m) {
      return E(m) === s;
    }),
    (ot.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === t;
    }),
    (ot.isForwardRef = function (m) {
      return E(m) === d;
    }),
    (ot.isFragment = function (m) {
      return E(m) === r;
    }),
    (ot.isLazy = function (m) {
      return E(m) === g;
    }),
    (ot.isMemo = function (m) {
      return E(m) === v;
    }),
    (ot.isPortal = function (m) {
      return E(m) === o;
    }),
    (ot.isProfiler = function (m) {
      return E(m) === a;
    }),
    (ot.isStrictMode = function (m) {
      return E(m) === i;
    }),
    (ot.isSuspense = function (m) {
      return E(m) === p;
    }),
    (ot.isValidElementType = function (m) {
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
            m.$$typeof === S ||
            m.$$typeof === w ||
            m.$$typeof === h))
      );
    }),
    (ot.typeOf = E),
    ot
  );
}
var rt = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Us;
function qf() {
  return (
    Us ||
      ((Us = 1),
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
            S = e ? Symbol.for('react.responder') : 60118,
            w = e ? Symbol.for('react.scope') : 60119;
          function E(L) {
            return (
              typeof L == 'string' ||
              typeof L == 'function' ||
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
                  L.$$typeof === S ||
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
            z = g,
            j = v,
            P = o,
            V = a,
            B = i,
            Q = p,
            ie = !1;
          function Z(L) {
            return (
              ie ||
                ((ie = !0),
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
          function ne(L) {
            return y(L) === s;
          }
          function H(L) {
            return typeof L == 'object' && L !== null && L.$$typeof === t;
          }
          function K(L) {
            return y(L) === d;
          }
          function oe(L) {
            return y(L) === r;
          }
          function ee(L) {
            return y(L) === g;
          }
          function re(L) {
            return y(L) === v;
          }
          function ce(L) {
            return y(L) === o;
          }
          function de(L) {
            return y(L) === a;
          }
          function xe(L) {
            return y(L) === i;
          }
          function le(L) {
            return y(L) === p;
          }
          (rt.AsyncMode = m),
            (rt.ConcurrentMode = O),
            (rt.ContextConsumer = R),
            (rt.ContextProvider = D),
            (rt.Element = $),
            (rt.ForwardRef = N),
            (rt.Fragment = k),
            (rt.Lazy = z),
            (rt.Memo = j),
            (rt.Portal = P),
            (rt.Profiler = V),
            (rt.StrictMode = B),
            (rt.Suspense = Q),
            (rt.isAsyncMode = Z),
            (rt.isConcurrentMode = _),
            (rt.isContextConsumer = W),
            (rt.isContextProvider = ne),
            (rt.isElement = H),
            (rt.isForwardRef = K),
            (rt.isFragment = oe),
            (rt.isLazy = ee),
            (rt.isMemo = re),
            (rt.isPortal = ce),
            (rt.isProfiler = de),
            (rt.isStrictMode = xe),
            (rt.isSuspense = le),
            (rt.isValidElementType = E),
            (rt.typeOf = y);
        })()),
    rt
  );
}
process.env.NODE_ENV === 'production' ? (ra.exports = Hf()) : (ra.exports = qf());
var Kf = ra.exports,
  Uc = Kf,
  Yf = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 },
  Gf = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },
  Hc = {};
Hc[Uc.ForwardRef] = Yf;
Hc[Uc.Memo] = Gf;
var Xf = !0;
function Oa(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (i) {
      e[i] !== void 0 ? t.push(e[i] + ';') : (r += i + ' ');
    }),
    r
  );
}
var Qr = function (t, o, r) {
    var i = t.key + '-' + o.name;
    (r === !1 || Xf === !1) && t.registered[i] === void 0 && (t.registered[i] = o.styles);
  },
  ei = function (t, o, r) {
    Qr(t, o, r);
    var i = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var a = o;
      do t.insert(o === a ? '.' + i : '', a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  };
function Jf(e) {
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
var Zf = {
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
  Hs = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Qf =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  em = /[A-Z]|^ms/g,
  qc = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  ka = function (t) {
    return t.charCodeAt(1) === 45;
  },
  qs = function (t) {
    return t != null && typeof t != 'boolean';
  },
  zi = Dc(function (e) {
    return ka(e) ? e : e.replace(em, '-$&').toLowerCase();
  }),
  Dr = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(qc, function (r, i, a) {
            return (mn = { name: i, styles: a, next: mn }), i;
          });
    }
    return Zf[t] !== 1 && !ka(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var tm =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    nm = ['normal', 'none', 'initial', 'inherit', 'unset'],
    om = Dr,
    rm = /^-ms-/,
    im = /-(.)/g,
    Ks = {};
  Dr = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (nm.indexOf(o) === -1 &&
          !tm.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = om(t, o);
    return (
      r !== '' &&
        !ka(t) &&
        t.indexOf('-') !== -1 &&
        Ks[t] === void 0 &&
        ((Ks[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(rm, 'ms-').replace(im, function (i, a) {
              return a.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var Kc =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function Jo(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(Kc);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1) return (mn = { name: o.name, styles: o.styles, next: mn }), o.name;
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; ) (mn = { name: r.name, styles: r.styles, next: mn }), (r = r.next);
        var i = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (i += o.map), i;
      }
      return am(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var a = mn,
          s = o(e);
        return (mn = a), Jo(e, t, s);
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
          c = o.replace(qc, function (d, p, b) {
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
function am(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var i = 0; i < o.length; i++) r += Jo(e, t, o[i]) + ';';
  else
    for (var a in o) {
      var s = o[a];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += a + '{' + t[s] + '}')
          : qs(s) && (r += zi(a) + ':' + Dr(a, s) + ';');
      else {
        if (a === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(Kc);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) qs(s[l]) && (r += zi(a) + ':' + Dr(a, s[l]) + ';');
        else {
          var c = Jo(e, t, s);
          switch (a) {
            case 'animation':
            case 'animationName': {
              r += zi(a) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && a === 'undefined' && console.error(Qf),
                (r += a + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var Ys = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  Yc;
process.env.NODE_ENV !== 'production' &&
  (Yc = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var mn,
  ho = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      a = '';
    mn = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((i = !1), (a += Jo(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(Hs),
        (a += s[0]));
    for (var l = 1; l < t.length; l++)
      (a += Jo(r, o, t[l])),
        i &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(Hs),
          (a += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (a = a.replace(Yc, function (b) {
        return (c = b), '';
      })),
      (Ys.lastIndex = 0);
    for (var u = '', d; (d = Ys.exec(a)) !== null; ) u += '-' + d[1];
    var p = Jf(a) + u;
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
      : { name: p, styles: a, next: mn };
  },
  sm = function (t) {
    return t();
  },
  Gc = C['useInsertionEffect'] ? C['useInsertionEffect'] : !1,
  Na = Gc || sm,
  Gs = Gc || te.useLayoutEffect,
  lm = {}.hasOwnProperty,
  $a = te.createContext(typeof HTMLElement < 'u' ? Uf({ key: 'css' }) : null);
process.env.NODE_ENV !== 'production' && ($a.displayName = 'EmotionCacheContext');
$a.Provider;
var ti = function (t) {
    return te.forwardRef(function (o, r) {
      var i = te.useContext($a);
      return t(o, i, r);
    });
  },
  or = te.createContext({});
process.env.NODE_ENV !== 'production' && (or.displayName = 'EmotionThemeContext');
var Xs = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  Js = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  cm = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      Qr(o, r, i),
      Na(function () {
        return ei(o, r, i);
      }),
      null
    );
  },
  um = ti(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[Xs],
      a = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = Oa(t.registered, a, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = ho(a, void 0, te.useContext(or));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[Js];
      c && (l = ho([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var u = {};
    for (var d in e)
      lm.call(e, d) &&
        d !== 'css' &&
        d !== Xs &&
        (process.env.NODE_ENV === 'production' || d !== Js) &&
        (u[d] = e[d]);
    return (
      (u.ref = o),
      (u.className = s),
      te.createElement(
        te.Fragment,
        null,
        te.createElement(cm, { cache: t, serialized: l, isStringTag: typeof i == 'string' }),
        te.createElement(i, u),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (um.displayName = 'EmotionCssPropInternal');
var dm = {
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
  Zs = !1,
  Xc = ti(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !Zs &&
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (Zs = !0));
    var o = e.styles,
      r = ho([o], void 0, te.useContext(or)),
      i = te.useRef();
    return (
      Gs(
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
      Gs(
        function () {
          var a = i.current,
            s = a[0],
            l = a[1];
          if (l) {
            a[1] = !1;
            return;
          }
          if ((r.next !== void 0 && ei(t, r.next, !0), s.tags.length)) {
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
process.env.NODE_ENV !== 'production' && (Xc.displayName = 'EmotionGlobal');
function pm() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return ho(t);
}
var Pa = function () {
    var t = pm.apply(void 0, arguments),
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
  fm = function e(t) {
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
function mm(e, t, o) {
  var r = [],
    i = Oa(e, r, o);
  return r.length < 2 ? o : i + t(r);
}
var hm = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      Na(function () {
        for (var i = 0; i < r.length; i++) ei(o, r[i], !1);
      }),
      null
    );
  },
  bm = ti(function (e, t) {
    var o = !1,
      r = [],
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        var b = ho(d, t.registered);
        return r.push(b), Qr(t, b, !1), t.key + '-' + b.name;
      },
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        return mm(t.registered, i, fm(d));
      },
      s = { css: i, cx: a, theme: te.useContext(or) },
      l = e.children(s);
    return (
      (o = !0),
      te.createElement(te.Fragment, null, te.createElement(hm, { cache: t, serializedArr: r }), l)
    );
  });
process.env.NODE_ENV !== 'production' && (bm.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var Qs = !0,
    gm = typeof jest < 'u' || typeof vi < 'u';
  if (Qs && !gm) {
    var el = typeof globalThis < 'u' ? globalThis : Qs ? window : global,
      tl = '__EMOTION_REACT_' + dm.version.split('.')[0] + '__';
    el[tl] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (el[tl] = !0);
  }
}
var vm = df,
  ym = function (t) {
    return t !== 'theme';
  },
  nl = function (t) {
    return typeof t == 'string' && t.charCodeAt(0) > 96 ? vm : ym;
  },
  ol = function (t, o, r) {
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
  rl = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  xm = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      Qr(o, r, i),
      Na(function () {
        return ei(o, r, i);
      }),
      null
    );
  },
  Em = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      i = (r && t.__emotion_base) || t,
      a,
      s;
    o !== void 0 && ((a = o.label), (s = o.target));
    var l = ol(t, o, r),
      c = l || nl(i),
      u = !c('as');
    return function () {
      var d = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((a !== void 0 && p.push('label:' + a + ';'), d[0] == null || d[0].raw === void 0))
        p.push.apply(p, d);
      else {
        process.env.NODE_ENV !== 'production' && d[0][0] === void 0 && console.error(rl),
          p.push(d[0][0]);
        for (var b = d.length, v = 1; v < b; v++)
          process.env.NODE_ENV !== 'production' && d[0][v] === void 0 && console.error(rl),
            p.push(d[v], d[0][v]);
      }
      var g = ti(function (h, f, S) {
        var w = (u && h.as) || i,
          E = '',
          y = [],
          m = h;
        if (h.theme == null) {
          m = {};
          for (var O in h) m[O] = h[O];
          m.theme = te.useContext(or);
        }
        typeof h.className == 'string'
          ? (E = Oa(f.registered, y, h.className))
          : h.className != null && (E = h.className + ' ');
        var R = ho(p.concat(y), f.registered, m);
        (E += f.key + '-' + R.name), s !== void 0 && (E += ' ' + s);
        var D = u && l === void 0 ? nl(w) : c,
          $ = {};
        for (var N in h) (u && N === 'as') || (D(N) && ($[N] = h[N]));
        return (
          ($.className = E),
          ($.ref = S),
          te.createElement(
            te.Fragment,
            null,
            te.createElement(xm, { cache: f, serialized: R, isStringTag: typeof w == 'string' }),
            te.createElement(w, $),
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
          return e(h, x({}, o, f, { shouldForwardProp: ol(g, f, !0) })).apply(void 0, p);
        }),
        g
      );
    };
  };
const Cm = Em;
var wm = [
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
  ia = Cm.bind();
wm.forEach(function (e) {
  ia[e] = ia(e);
});
const Sm = ia;
function Tm(e) {
  return e == null || Object.keys(e).length === 0;
}
function Jc(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return I(Xc, { styles: typeof t == 'function' ? (i) => t(Tm(i) ? o : i) : t });
}
process.env.NODE_ENV !== 'production' &&
  (Jc.propTypes = { defaultTheme: n.object, styles: n.oneOfType([n.string, n.object, n.func]) });
/**
 * @mui/styled-engine v5.11.11
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function Rm(e, t) {
  const o = Sm(e, t);
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
const Om = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  km =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  zn = km;
function Vo(e, t) {
  return t ? ln(e, t, { clone: !1 }) : e;
}
const Ia = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  il = { keys: ['xs', 'sm', 'md', 'lg', 'xl'], up: (e) => `@media (min-width:${Ia[e]}px)` };
function kn(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || il;
    return t.reduce((s, l, c) => ((s[a.up(a.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const a = r.breakpoints || il;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || Ia).indexOf(l) !== -1) {
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
function Nm(e = {}) {
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
function $m(e, t) {
  return e.reduce((o, r) => {
    const i = o[r];
    return (!i || Object.keys(i).length === 0) && delete o[r], o;
  }, t);
}
function ni(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((i, a) => (i && i[a] ? i[a] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, i) => (r && r[i] != null ? r[i] : null), e);
}
function Lr(e, t, o, r = o) {
  let i;
  return (
    typeof e == 'function' ? (i = e(o)) : Array.isArray(e) ? (i = e[o] || r) : (i = ni(e, o) || r),
    t && (i = t(i, r, e)),
    i
  );
}
function ct(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: i } = e,
    a = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        u = ni(c, r) || {};
      return kn(s, l, (p) => {
        let b = Lr(u, i, p);
        return (
          p === b &&
            typeof p == 'string' &&
            (b = Lr(u, i, `${t}${p === 'default' ? '' : ue(p)}`, p)),
          o === !1 ? b : { [o]: b }
        );
      });
    };
  return (
    (a.propTypes = process.env.NODE_ENV !== 'production' ? { [t]: zn } : {}),
    (a.filterProps = [t]),
    a
  );
}
function oi(...e) {
  const t = e.reduce(
      (r, i) => (
        i.filterProps.forEach((a) => {
          r[a] = i;
        }),
        r
      ),
      {},
    ),
    o = (r) => Object.keys(r).reduce((i, a) => (t[a] ? Vo(i, t[a](r)) : i), {});
  return (
    (o.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((r, i) => Object.assign(r, i.propTypes), {})
        : {}),
    (o.filterProps = e.reduce((r, i) => r.concat(i.filterProps), [])),
    o
  );
}
function Pm(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const Im = { m: 'margin', p: 'padding' },
  _m = { t: 'Top', r: 'Right', b: 'Bottom', l: 'Left', x: ['Left', 'Right'], y: ['Top', 'Bottom'] },
  al = { marginX: 'mx', marginY: 'my', paddingX: 'px', paddingY: 'py' },
  Mm = Pm((e) => {
    if (e.length > 2)
      if (al[e]) e = al[e];
      else return [e];
    const [t, o] = e.split(''),
      r = Im[t],
      i = _m[o] || '';
    return Array.isArray(i) ? i.map((a) => r + a) : [r + i];
  }),
  ri = [
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
  ii = [
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
  Am = [...ri, ...ii];
function rr(e, t, o, r) {
  var i;
  const a = (i = ni(e, t, !1)) != null ? i : o;
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
function Zc(e) {
  return rr(e, 'spacing', 8, 'spacing');
}
function ir(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function Dm(e, t) {
  return (o) => e.reduce((r, i) => ((r[i] = ir(t, o)), r), {});
}
function Lm(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const i = Mm(o),
    a = Dm(i, r),
    s = e[o];
  return kn(e, s, a);
}
function Qc(e, t) {
  const o = Zc(e.theme);
  return Object.keys(e)
    .map((r) => Lm(e, t, r, o))
    .reduce(Vo, {});
}
function Ct(e) {
  return Qc(e, ri);
}
Ct.propTypes =
  process.env.NODE_ENV !== 'production' ? ri.reduce((e, t) => ((e[t] = zn), e), {}) : {};
Ct.filterProps = ri;
function wt(e) {
  return Qc(e, ii);
}
wt.propTypes =
  process.env.NODE_ENV !== 'production' ? ii.reduce((e, t) => ((e[t] = zn), e), {}) : {};
wt.filterProps = ii;
process.env.NODE_ENV !== 'production' && Am.reduce((e, t) => ((e[t] = zn), e), {});
function Sn(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Fm = ct({ prop: 'border', themeKey: 'borders', transform: Sn }),
  jm = ct({ prop: 'borderTop', themeKey: 'borders', transform: Sn }),
  zm = ct({ prop: 'borderRight', themeKey: 'borders', transform: Sn }),
  Vm = ct({ prop: 'borderBottom', themeKey: 'borders', transform: Sn }),
  Bm = ct({ prop: 'borderLeft', themeKey: 'borders', transform: Sn }),
  Wm = ct({ prop: 'borderColor', themeKey: 'palette' }),
  Um = ct({ prop: 'borderTopColor', themeKey: 'palette' }),
  Hm = ct({ prop: 'borderRightColor', themeKey: 'palette' }),
  qm = ct({ prop: 'borderBottomColor', themeKey: 'palette' }),
  Km = ct({ prop: 'borderLeftColor', themeKey: 'palette' }),
  ai = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = rr(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({ borderRadius: ir(t, r) });
      return kn(e, e.borderRadius, o);
    }
    return null;
  };
ai.propTypes = process.env.NODE_ENV !== 'production' ? { borderRadius: zn } : {};
ai.filterProps = ['borderRadius'];
oi(Fm, jm, zm, Vm, Bm, Wm, Um, Hm, qm, Km, ai);
const si = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = rr(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({ gap: ir(t, r) });
    return kn(e, e.gap, o);
  }
  return null;
};
si.propTypes = process.env.NODE_ENV !== 'production' ? { gap: zn } : {};
si.filterProps = ['gap'];
const li = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = rr(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({ columnGap: ir(t, r) });
    return kn(e, e.columnGap, o);
  }
  return null;
};
li.propTypes = process.env.NODE_ENV !== 'production' ? { columnGap: zn } : {};
li.filterProps = ['columnGap'];
const ci = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = rr(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({ rowGap: ir(t, r) });
    return kn(e, e.rowGap, o);
  }
  return null;
};
ci.propTypes = process.env.NODE_ENV !== 'production' ? { rowGap: zn } : {};
ci.filterProps = ['rowGap'];
const Ym = ct({ prop: 'gridColumn' }),
  Gm = ct({ prop: 'gridRow' }),
  Xm = ct({ prop: 'gridAutoFlow' }),
  Jm = ct({ prop: 'gridAutoColumns' }),
  Zm = ct({ prop: 'gridAutoRows' }),
  Qm = ct({ prop: 'gridTemplateColumns' }),
  eh = ct({ prop: 'gridTemplateRows' }),
  th = ct({ prop: 'gridTemplateAreas' }),
  nh = ct({ prop: 'gridArea' });
oi(si, li, ci, Ym, Gm, Xm, Jm, Zm, Qm, eh, th, nh);
function po(e, t) {
  return t === 'grey' ? t : e;
}
const oh = ct({ prop: 'color', themeKey: 'palette', transform: po }),
  rh = ct({ prop: 'bgcolor', cssProperty: 'backgroundColor', themeKey: 'palette', transform: po }),
  ih = ct({ prop: 'backgroundColor', themeKey: 'palette', transform: po });
oi(oh, rh, ih);
function Xt(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const ah = ct({ prop: 'width', transform: Xt }),
  _a = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, i, a;
        return {
          maxWidth:
            ((r = e.theme) == null || (i = r.breakpoints) == null || (a = i.values) == null
              ? void 0
              : a[o]) ||
            Ia[o] ||
            Xt(o),
        };
      };
      return kn(e, e.maxWidth, t);
    }
    return null;
  };
_a.filterProps = ['maxWidth'];
const sh = ct({ prop: 'minWidth', transform: Xt }),
  lh = ct({ prop: 'height', transform: Xt }),
  ch = ct({ prop: 'maxHeight', transform: Xt }),
  uh = ct({ prop: 'minHeight', transform: Xt });
ct({ prop: 'size', cssProperty: 'width', transform: Xt });
ct({ prop: 'size', cssProperty: 'height', transform: Xt });
const dh = ct({ prop: 'boxSizing' });
oi(ah, _a, sh, lh, ch, uh, dh);
const Vi = (e) => (t) => {
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
                    : ue((a = t[e]) == null ? void 0 : a.toString())
                }`
              ];
        if (!s) {
          var l, c;
          s = (l = t.theme.typography) == null || (c = l[r]) == null ? void 0 : c[e];
        }
        return s || (s = r), { [e]: s };
      };
      return kn(t, t[e], o);
    }
    return null;
  },
  ph = {
    border: { themeKey: 'borders', transform: Sn },
    borderTop: { themeKey: 'borders', transform: Sn },
    borderRight: { themeKey: 'borders', transform: Sn },
    borderBottom: { themeKey: 'borders', transform: Sn },
    borderLeft: { themeKey: 'borders', transform: Sn },
    borderColor: { themeKey: 'palette' },
    borderTopColor: { themeKey: 'palette' },
    borderRightColor: { themeKey: 'palette' },
    borderBottomColor: { themeKey: 'palette' },
    borderLeftColor: { themeKey: 'palette' },
    borderRadius: { themeKey: 'shape.borderRadius', style: ai },
    color: { themeKey: 'palette', transform: po },
    bgcolor: { themeKey: 'palette', cssProperty: 'backgroundColor', transform: po },
    backgroundColor: { themeKey: 'palette', transform: po },
    p: { style: wt },
    pt: { style: wt },
    pr: { style: wt },
    pb: { style: wt },
    pl: { style: wt },
    px: { style: wt },
    py: { style: wt },
    padding: { style: wt },
    paddingTop: { style: wt },
    paddingRight: { style: wt },
    paddingBottom: { style: wt },
    paddingLeft: { style: wt },
    paddingX: { style: wt },
    paddingY: { style: wt },
    paddingInline: { style: wt },
    paddingInlineStart: { style: wt },
    paddingInlineEnd: { style: wt },
    paddingBlock: { style: wt },
    paddingBlockStart: { style: wt },
    paddingBlockEnd: { style: wt },
    m: { style: Ct },
    mt: { style: Ct },
    mr: { style: Ct },
    mb: { style: Ct },
    ml: { style: Ct },
    mx: { style: Ct },
    my: { style: Ct },
    margin: { style: Ct },
    marginTop: { style: Ct },
    marginRight: { style: Ct },
    marginBottom: { style: Ct },
    marginLeft: { style: Ct },
    marginX: { style: Ct },
    marginY: { style: Ct },
    marginInline: { style: Ct },
    marginInlineStart: { style: Ct },
    marginInlineEnd: { style: Ct },
    marginBlock: { style: Ct },
    marginBlockStart: { style: Ct },
    marginBlockEnd: { style: Ct },
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
    gap: { style: si },
    rowGap: { style: ci },
    columnGap: { style: li },
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
    width: { transform: Xt },
    maxWidth: { style: _a },
    minWidth: { transform: Xt },
    height: { transform: Xt },
    maxHeight: { transform: Xt },
    minHeight: { transform: Xt },
    boxSizing: {},
    fontFamily: { themeKey: 'typography', style: Vi('fontFamily') },
    fontSize: { themeKey: 'typography', style: Vi('fontSize') },
    fontStyle: { themeKey: 'typography' },
    fontWeight: { themeKey: 'typography', style: Vi('fontWeight') },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: { cssProperty: !1, themeKey: 'typography' },
  },
  Ma = ph;
function fh(...e) {
  const t = e.reduce((r, i) => r.concat(Object.keys(i)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function mh(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function hh() {
  function e(o, r, i, a) {
    const s = { [o]: r, theme: i },
      l = a[o];
    if (!l) return { [o]: r };
    const { cssProperty: c = o, themeKey: u, transform: d, style: p } = l;
    if (r == null) return null;
    const b = ni(i, u) || {};
    return p
      ? p(s)
      : kn(s, r, (g) => {
          let h = Lr(b, d, g);
          return (
            g === h &&
              typeof g == 'string' &&
              (h = Lr(b, d, `${o}${g === 'default' ? '' : ue(g)}`, g)),
            c === !1 ? h : { [c]: h }
          );
        });
  }
  function t(o) {
    var r;
    const { sx: i, theme: a = {} } = o || {};
    if (!i) return null;
    const s = (r = a.unstable_sxConfig) != null ? r : Ma;
    function l(c) {
      let u = c;
      if (typeof c == 'function') u = c(a);
      else if (typeof c != 'object') return c;
      if (!u) return null;
      const d = Nm(a.breakpoints),
        p = Object.keys(d);
      let b = d;
      return (
        Object.keys(u).forEach((v) => {
          const g = mh(u[v], a);
          if (g != null)
            if (typeof g == 'object')
              if (s[v]) b = Vo(b, e(v, g, a, s));
              else {
                const h = kn({ theme: a }, g, (f) => ({ [v]: f }));
                fh(h, g) ? (b[v] = t({ sx: g, theme: a })) : (b = Vo(b, h));
              }
            else b = Vo(b, e(v, g, a, s));
        }),
        $m(p, b)
      );
    }
    return Array.isArray(i) ? i.map(l) : l(i);
  }
  return t;
}
const eu = hh();
eu.filterProps = ['sx'];
const Aa = eu;
function tu(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = tu(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function Ee() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = tu(e)) && (r && (r += ' '), (r += t));
  return r;
}
const bh = ['values', 'unit', 'step'],
  gh = (e) => {
    const t = Object.keys(e).map((o) => ({ key: o, val: e[o] })) || [];
    return t.sort((o, r) => o.val - r.val), t.reduce((o, r) => x({}, o, { [r.key]: r.val }), {});
  };
function vh(e) {
  const {
      values: t = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: o = 'px',
      step: r = 5,
    } = e,
    i = Re(e, bh),
    a = gh(t),
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
  return x({ keys: s, values: a, up: l, down: c, between: u, only: d, not: p, unit: o }, i);
}
const yh = { borderRadius: 4 },
  xh = yh;
function Eh(e = 8) {
  if (e.mui) return e;
  const t = Zc({ spacing: e }),
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
const Ch = ['breakpoints', 'palette', 'spacing', 'shape'];
function Da(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: i, shape: a = {} } = e,
    s = Re(e, Ch),
    l = vh(o),
    c = Eh(i);
  let u = ln(
    {
      breakpoints: l,
      direction: 'ltr',
      components: {},
      palette: x({ mode: 'light' }, r),
      spacing: c,
      shape: x({}, xh, a),
    },
    s,
  );
  return (
    (u = t.reduce((d, p) => ln(d, p), u)),
    (u.unstable_sxConfig = x({}, Ma, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return Aa({ sx: p, theme: this });
    }),
    u
  );
}
const nu = C.createContext(null);
process.env.NODE_ENV !== 'production' && (nu.displayName = 'ThemeContext');
const wh = nu;
function Sh() {
  const e = C.useContext(wh);
  return process.env.NODE_ENV !== 'production' && C.useDebugValue(e), e;
}
function Th(e) {
  return Object.keys(e).length === 0;
}
function ou(e = null) {
  const t = Sh();
  return !t || Th(t) ? e : t;
}
const Rh = Da();
function ru(e = Rh) {
  return ou(e);
}
const Oh = ['variant'];
function sl(e) {
  return e.length === 0;
}
function iu(e) {
  const { variant: t } = e,
    o = Re(e, Oh);
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((i) => {
        i === 'color'
          ? (r += sl(r) ? e[i] : ue(e[i]))
          : (r += `${sl(r) ? i : ue(i)}${ue(e[i].toString())}`);
      }),
    r
  );
}
const kh = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'],
  Nh = ['theme'],
  $h = ['theme'];
function Mo(e) {
  return Object.keys(e).length === 0;
}
function Ph(e) {
  return typeof e == 'string' && e.charCodeAt(0) > 96;
}
const Ih = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  _h = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((i) => {
        const a = iu(i.props);
        r[a] = i.style;
      }),
      r
    );
  },
  Mh = (e, t, o, r) => {
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
            d && l.push(t[iu(u.props)]);
        }),
      l
    );
  };
function Bo(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Ah = Da(),
  Dh = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function Lh(e = {}) {
  const { defaultTheme: t = Ah, rootShouldForwardProp: o = Bo, slotShouldForwardProp: r = Bo } = e,
    i = (a) => {
      const s = Mo(a.theme) ? t : a.theme;
      return Aa(x({}, a, { theme: s }));
    };
  return (
    (i.__mui_systemSx = !0),
    (a, s = {}) => {
      Om(a, (E) => E.filter((y) => !(y != null && y.__mui_systemSx)));
      const { name: l, slot: c, skipVariantsResolver: u, skipSx: d, overridesResolver: p } = s,
        b = Re(s, kh),
        v = u !== void 0 ? u : (c && c !== 'Root') || !1,
        g = d || !1;
      let h;
      process.env.NODE_ENV !== 'production' && l && (h = `${l}-${Dh(c || 'Root')}`);
      let f = Bo;
      c === 'Root' ? (f = o) : c ? (f = r) : Ph(a) && (f = void 0);
      const S = Rm(a, x({ shouldForwardProp: f, label: h }, b)),
        w = (E, ...y) => {
          const m = y
            ? y.map(($) =>
                typeof $ == 'function' && $.__emotion_real !== $
                  ? (N) => {
                      let { theme: k } = N,
                        z = Re(N, Nh);
                      return $(x({ theme: Mo(k) ? t : k }, z));
                    }
                  : $,
              )
            : [];
          let O = E;
          l &&
            p &&
            m.push(($) => {
              const N = Mo($.theme) ? t : $.theme,
                k = Ih(l, N);
              if (k) {
                const z = {};
                return (
                  Object.entries(k).forEach(([j, P]) => {
                    z[j] = typeof P == 'function' ? P(x({}, $, { theme: N })) : P;
                  }),
                  p($, z)
                );
              }
              return null;
            }),
            l &&
              !v &&
              m.push(($) => {
                const N = Mo($.theme) ? t : $.theme;
                return Mh($, _h(l, N), N, l);
              }),
            g || m.push(i);
          const R = m.length - y.length;
          if (Array.isArray(E) && R > 0) {
            const $ = new Array(R).fill('');
            (O = [...E, ...$]), (O.raw = [...E.raw, ...$]);
          } else
            typeof E == 'function' &&
              E.__emotion_real !== E &&
              (O = ($) => {
                let { theme: N } = $,
                  k = Re($, $h);
                return E(x({ theme: Mo(N) ? t : N }, k));
              });
          const D = S(O, ...m);
          if (process.env.NODE_ENV !== 'production') {
            let $;
            l && ($ = `${l}${c || ''}`),
              $ === void 0 && ($ = `Styled(${Vp(a)})`),
              (D.displayName = $);
          }
          return D;
        };
      return S.withConfig && (w.withConfig = S.withConfig), w;
    }
  );
}
function Fh(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : Ca(t.components[o].defaultProps, r);
}
function jh({ props: e, name: t, defaultTheme: o }) {
  const r = ru(o);
  return Fh({ theme: r, name: t, props: e });
}
function La(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function zh(e) {
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
function Zn(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return Zn(zh(e));
  const t = e.indexOf('('),
    o = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(o) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : jn(9, e),
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
          : jn(10, i),
      );
  } else r = r.split(',');
  return (r = r.map((a) => parseFloat(a))), { type: o, values: r, colorSpace: i };
}
function ui(e) {
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
function Vh(e) {
  e = Zn(e);
  const { values: t } = e,
    o = t[0],
    r = t[1] / 100,
    i = t[2] / 100,
    a = r * Math.min(i, 1 - i),
    s = (u, d = (u + o / 30) % 12) => i - a * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = 'rgb';
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === 'hsla' && ((l += 'a'), c.push(t[3])), ui({ type: l, values: c });
}
function aa(e) {
  e = Zn(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? Zn(Vh(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function ll(e, t) {
  const o = aa(e),
    r = aa(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function lt(e, t) {
  return (
    (e = Zn(e)),
    (t = La(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    ui(e)
  );
}
function di(e, t) {
  if (((e = Zn(e)), (t = La(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return ui(e);
}
function pi(e, t) {
  if (((e = Zn(e)), (t = La(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return ui(e);
}
function Bh(e, t = 0.15) {
  return aa(e) > 0.5 ? di(e, t) : pi(e, t);
}
function Wh(e, t) {
  return x(
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
const Uh = ['mode', 'contrastThreshold', 'tonalOffset'],
  cl = {
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: { paper: Yo.white, default: Yo.white },
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
  Bi = {
    text: {
      primary: Yo.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: { paper: '#121212', default: '#121212' },
    action: {
      active: Yo.white,
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
function ul(e, t, o, r) {
  const i = r.light || r,
    a = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = pi(e.main, i))
      : t === 'dark' && (e.dark = di(e.main, a)));
}
function Hh(e = 'light') {
  return e === 'dark'
    ? { main: ro[200], light: ro[50], dark: ro[400] }
    : { main: ro[700], light: ro[400], dark: ro[800] };
}
function qh(e = 'light') {
  return e === 'dark'
    ? { main: oo[200], light: oo[50], dark: oo[400] }
    : { main: oo[500], light: oo[300], dark: oo[700] };
}
function Kh(e = 'light') {
  return e === 'dark'
    ? { main: no[500], light: no[300], dark: no[700] }
    : { main: no[700], light: no[400], dark: no[800] };
}
function Yh(e = 'light') {
  return e === 'dark'
    ? { main: io[400], light: io[300], dark: io[700] }
    : { main: io[700], light: io[500], dark: io[900] };
}
function Gh(e = 'light') {
  return e === 'dark'
    ? { main: ao[400], light: ao[300], dark: ao[700] }
    : { main: ao[800], light: ao[500], dark: ao[900] };
}
function Xh(e = 'light') {
  return e === 'dark'
    ? { main: Io[400], light: Io[300], dark: Io[700] }
    : { main: '#ed6c02', light: Io[500], dark: Io[900] };
}
function Jh(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2 } = e,
    i = Re(e, Uh),
    a = e.primary || Hh(t),
    s = e.secondary || qh(t),
    l = e.error || Kh(t),
    c = e.info || Yh(t),
    u = e.success || Gh(t),
    d = e.warning || Xh(t);
  function p(h) {
    const f = ll(h, Bi.text.primary) >= o ? Bi.text.primary : cl.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const S = ll(h, f);
      S < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${S}:1 for ${f} on ${h}`,
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
      mainShade: S = 500,
      lightShade: w = 300,
      darkShade: E = 700,
    }) => {
      if (((h = x({}, h)), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${f ? ` (${f})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.`
            : jn(11, f ? ` (${f})` : '', S),
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
            : jn(12, f ? ` (${f})` : '', JSON.stringify(h.main)),
        );
      return (
        ul(h, 'light', w, r), ul(h, 'dark', E, r), h.contrastText || (h.contrastText = p(h.main)), h
      );
    },
    v = { dark: Bi, light: cl };
  return (
    process.env.NODE_ENV !== 'production' &&
      (v[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    ln(
      x(
        {
          common: x({}, Yo),
          mode: t,
          primary: b({ color: a, name: 'primary' }),
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
          grey: wp,
          contrastThreshold: o,
          getContrastText: p,
          augmentColor: b,
          tonalOffset: r,
        },
        v[t],
      ),
      i,
    )
  );
}
const Zh = [
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
function Qh(e) {
  return Math.round(e * 1e5) / 1e5;
}
const dl = { textTransform: 'uppercase' },
  pl = '"Roboto", "Helvetica", "Arial", sans-serif';
function eb(e, t) {
  const o = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: r = pl,
      fontSize: i = 14,
      fontWeightLight: a = 300,
      fontWeightRegular: s = 400,
      fontWeightMedium: l = 500,
      fontWeightBold: c = 700,
      htmlFontSize: u = 16,
      allVariants: d,
      pxToRem: p,
    } = o,
    b = Re(o, Zh);
  process.env.NODE_ENV !== 'production' &&
    (typeof i != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof u != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const v = i / 14,
    g = p || ((S) => `${(S / u) * v}rem`),
    h = (S, w, E, y, m) =>
      x(
        { fontFamily: r, fontWeight: S, fontSize: g(w), lineHeight: E },
        r === pl ? { letterSpacing: `${Qh(y / w)}em` } : {},
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
      button: h(l, 14, 1.75, 0.4, dl),
      caption: h(s, 12, 1.66, 0.4),
      overline: h(s, 12, 2.66, 1, dl),
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
    { clone: !1 },
  );
}
const tb = 0.2,
  nb = 0.14,
  ob = 0.12;
function xt(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${tb})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${nb})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${ob})`,
  ].join(',');
}
const rb = [
    'none',
    xt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    xt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    xt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    xt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    xt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    xt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    xt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    xt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    xt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    xt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    xt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    xt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    xt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    xt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    xt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    xt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    xt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    xt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    xt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    xt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    xt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    xt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    xt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    xt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  ib = rb,
  ab = ['duration', 'easing', 'delay'],
  sb = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  lb = {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  };
function fl(e) {
  return `${Math.round(e)}ms`;
}
function cb(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function ub(e) {
  const t = x({}, sb, e.easing),
    o = x({}, lb, e.duration);
  return x(
    {
      getAutoHeightDuration: cb,
      create: (i = ['all'], a = {}) => {
        const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0 } = a,
          u = Re(a, ab);
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
              `${d} ${typeof s == 'string' ? s : fl(s)} ${l} ${typeof c == 'string' ? c : fl(c)}`,
          )
          .join(',');
      },
    },
    e,
    { easing: t, duration: o },
  );
}
const db = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  pb = db,
  fb = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function mb(e = {}, ...t) {
  const { mixins: o = {}, palette: r = {}, transitions: i = {}, typography: a = {} } = e,
    s = Re(e, fb);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : jn(18),
    );
  const l = Jh(r),
    c = Da(e);
  let u = ln(c, {
    mixins: Wh(c.breakpoints, o),
    palette: l,
    shadows: ib.slice(),
    typography: eb(l, a),
    transitions: ub(i),
    zIndex: x({}, pb),
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
              const f = Ue('', g);
              console.error(
                [
                  `MUI: The \`${v}\` component increases the CSS specificity of the \`${g}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(b, null, 2),
                  '',
                  `Instead, you need to use the '&.${f}' syntax:`,
                  JSON.stringify({ root: { [`&.${f}`]: h } }, null, 2),
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
    (u.unstable_sxConfig = x({}, Ma, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return Aa({ sx: p, theme: this });
    }),
    u
  );
}
const hb = mb(),
  fi = hb;
function So() {
  const e = ru(fi);
  return process.env.NODE_ENV !== 'production' && C.useDebugValue(e), e;
}
function Je({ props: e, name: t }) {
  return jh({ props: e, name: t, defaultTheme: fi });
}
const xn = (e) => Bo(e) && e !== 'classes',
  Fa = Bo,
  bb = Lh({ defaultTheme: fi, rootShouldForwardProp: xn }),
  ge = bb,
  gb = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  ml = gb;
function Fn(e) {
  return typeof e == 'string';
}
function vb(e, t, o) {
  return e === void 0 || Fn(e) ? t : x({}, t, { ownerState: x({}, t.ownerState, o) });
}
const yb = { disableDefaultClasses: !1 },
  xb = C.createContext(yb);
function au(e) {
  const { disableDefaultClasses: t } = C.useContext(xb);
  return (o) => (t ? '' : e(o));
}
function su(e, t = []) {
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
function sa(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function hl(e) {
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
function Eb(e) {
  const {
    getSlotProps: t,
    additionalProps: o,
    externalSlotProps: r,
    externalForwardedProps: i,
    className: a,
  } = e;
  if (!t) {
    const v = Ee(
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
      { props: h, internalRef: void 0 }
    );
  }
  const s = su(x({}, i, r)),
    l = hl(r),
    c = hl(i),
    u = t(s),
    d = Ee(
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
    { props: b, internalRef: u.ref }
  );
}
const Cb = ['elementType', 'externalSlotProps', 'ownerState'];
function rn(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: i } = e,
    a = Re(e, Cb),
    s = sa(r, i),
    { props: l, internalRef: c } = Eb(x({}, a, { externalSlotProps: s })),
    u = Ot(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return vb(o, x({}, l, { ref: u }), i);
}
function bl(e) {
  return e.substring(2).toLowerCase();
}
function wb(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function Fr(e) {
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
  const d = Ot(t.ref, l),
    p = jt((g) => {
      const h = u.current;
      u.current = !1;
      const f = St(l.current);
      if (!c.current || !l.current || ('clientX' in g && wb(g, f))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let S;
      g.composedPath
        ? (S = g.composedPath().indexOf(l.current) > -1)
        : (S = !f.documentElement.contains(g.target) || l.current.contains(g.target)),
        !S && (o || !h) && i(g);
    }),
    b = (g) => (h) => {
      u.current = !0;
      const f = t.props[g];
      f && f(h);
    },
    v = { ref: d };
  return (
    a !== !1 && (v[a] = b(a)),
    C.useEffect(() => {
      if (a !== !1) {
        const g = bl(a),
          h = St(l.current),
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
        const g = bl(r),
          h = St(l.current);
        return (
          h.addEventListener(g, p),
          () => {
            h.removeEventListener(g, p);
          }
        );
      }
    }, [p, r]),
    I(C.Fragment, { children: C.cloneElement(t, v) })
  );
}
process.env.NODE_ENV !== 'production' &&
  (Fr.propTypes = {
    children: Co.isRequired,
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
process.env.NODE_ENV !== 'production' && (Fr['propTypes'] = xa(Fr.propTypes));
const Sb = [
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
function Tb(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function Rb(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function Ob(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || Rb(e));
}
function kb(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(Sb)).forEach((r, i) => {
      const a = Tb(r);
      a === -1 ||
        !Ob(r) ||
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
function Nb() {
  return !0;
}
function jr(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: i = !1,
      getTabbable: a = kb,
      isEnabled: s = Nb,
      open: l,
    } = e,
    c = C.useRef(!1),
    u = C.useRef(null),
    d = C.useRef(null),
    p = C.useRef(null),
    b = C.useRef(null),
    v = C.useRef(!1),
    g = C.useRef(null),
    h = Ot(t.ref, g),
    f = C.useRef(null);
  C.useEffect(() => {
    !l || !g.current || (v.current = !o);
  }, [o, l]),
    C.useEffect(() => {
      if (!l || !g.current) return;
      const E = St(g.current);
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
      const E = St(g.current),
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
                const z = !!(
                    ($ = f.current) != null &&
                    $.shiftKey &&
                    ((N = f.current) == null ? void 0 : N.key) === 'Tab'
                  ),
                  j = k[0],
                  P = k[k.length - 1];
                typeof j != 'string' && typeof P != 'string' && (z ? P.focus() : j.focus());
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
  const S = (E) => {
      p.current === null && (p.current = E.relatedTarget), (v.current = !0), (b.current = E.target);
      const y = t.props.onFocus;
      y && y(E);
    },
    w = (E) => {
      p.current === null && (p.current = E.relatedTarget), (v.current = !0);
    };
  return je(C.Fragment, {
    children: [
      I('div', { tabIndex: l ? 0 : -1, onFocus: w, ref: u, 'data-testid': 'sentinelStart' }),
      C.cloneElement(t, { ref: h, onFocus: S }),
      I('div', { tabIndex: l ? 0 : -1, onFocus: w, ref: d, 'data-testid': 'sentinelEnd' }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (jr.propTypes = {
    children: Co,
    disableAutoFocus: n.bool,
    disableEnforceFocus: n.bool,
    disableRestoreFocus: n.bool,
    getTabbable: n.func,
    isEnabled: n.func,
    open: n.bool.isRequired,
  });
process.env.NODE_ENV !== 'production' && (jr['propTypes'] = xa(jr.propTypes));
var Wt = 'top',
  cn = 'bottom',
  un = 'right',
  Ut = 'left',
  mi = 'auto',
  ar = [Wt, cn, un, Ut],
  bo = 'start',
  Zo = 'end',
  $b = 'clippingParents',
  lu = 'viewport',
  Ao = 'popper',
  Pb = 'reference',
  gl = ar.reduce(function (e, t) {
    return e.concat([t + '-' + bo, t + '-' + Zo]);
  }, []),
  cu = [].concat(ar, [mi]).reduce(function (e, t) {
    return e.concat([t, t + '-' + bo, t + '-' + Zo]);
  }, []),
  Ib = 'beforeRead',
  _b = 'read',
  Mb = 'afterRead',
  Ab = 'beforeMain',
  Db = 'main',
  Lb = 'afterMain',
  Fb = 'beforeWrite',
  jb = 'write',
  zb = 'afterWrite',
  la = [Ib, _b, Mb, Ab, Db, Lb, Fb, jb, zb];
function Nn(e) {
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
function Qn(e) {
  var t = dn(e).Element;
  return e instanceof t || e instanceof Element;
}
function Zt(e) {
  var t = dn(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ja(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = dn(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Vb(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      i = t.attributes[o] || {},
      a = t.elements[o];
    !Zt(a) ||
      !Nn(a) ||
      (Object.assign(a.style, r),
      Object.keys(i).forEach(function (s) {
        var l = i[s];
        l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function Bb(e) {
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
        !Zt(i) ||
          !Nn(i) ||
          (Object.assign(i.style, l),
          Object.keys(a).forEach(function (c) {
            i.removeAttribute(c);
          }));
      });
    }
  );
}
const Wb = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: Vb,
  effect: Bb,
  requires: ['computeStyles'],
};
function gn(e) {
  return e.split('-')[0];
}
var Xn = Math.max,
  zr = Math.min,
  go = Math.round;
function ca() {
  var e = navigator.userAgentData;
  return e != null && e.brands
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function uu() {
  return !/^((?!chrome|android).)*safari/i.test(ca());
}
function vo(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    i = 1,
    a = 1;
  t &&
    Zt(e) &&
    ((i = (e.offsetWidth > 0 && go(r.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && go(r.height) / e.offsetHeight) || 1));
  var s = Qn(e) ? dn(e) : window,
    l = s.visualViewport,
    c = !uu() && o,
    u = (r.left + (c && l ? l.offsetLeft : 0)) / i,
    d = (r.top + (c && l ? l.offsetTop : 0)) / a,
    p = r.width / i,
    b = r.height / a;
  return { width: p, height: b, top: d, right: u + p, bottom: d + b, left: u, x: u, y: d };
}
function za(e) {
  var t = vo(e),
    o = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - o) <= 1 && (o = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: o, height: r }
  );
}
function du(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && ja(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function yn(e) {
  return dn(e).getComputedStyle(e);
}
function Ub(e) {
  return ['table', 'td', 'th'].indexOf(Nn(e)) >= 0;
}
function Vn(e) {
  return ((Qn(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function hi(e) {
  return Nn(e) === 'html' ? e : e.assignedSlot || e.parentNode || (ja(e) ? e.host : null) || Vn(e);
}
function vl(e) {
  return !Zt(e) || yn(e).position === 'fixed' ? null : e.offsetParent;
}
function Hb(e) {
  var t = /firefox/i.test(ca()),
    o = /Trident/i.test(ca());
  if (o && Zt(e)) {
    var r = yn(e);
    if (r.position === 'fixed') return null;
  }
  var i = hi(e);
  for (ja(i) && (i = i.host); Zt(i) && ['html', 'body'].indexOf(Nn(i)) < 0; ) {
    var a = yn(i);
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
function sr(e) {
  for (var t = dn(e), o = vl(e); o && Ub(o) && yn(o).position === 'static'; ) o = vl(o);
  return o && (Nn(o) === 'html' || (Nn(o) === 'body' && yn(o).position === 'static'))
    ? t
    : o || Hb(e) || t;
}
function Va(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function Wo(e, t, o) {
  return Xn(e, zr(t, o));
}
function qb(e, t, o) {
  var r = Wo(e, t, o);
  return r > o ? o : r;
}
function pu() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function fu(e) {
  return Object.assign({}, pu(), e);
}
function mu(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var Kb = function (t, o) {
  return (
    (t = typeof t == 'function' ? t(Object.assign({}, o.rects, { placement: o.placement })) : t),
    fu(typeof t != 'number' ? t : mu(t, ar))
  );
};
function Yb(e) {
  var t,
    o = e.state,
    r = e.name,
    i = e.options,
    a = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = gn(o.placement),
    c = Va(l),
    u = [Ut, un].indexOf(l) >= 0,
    d = u ? 'height' : 'width';
  if (!(!a || !s)) {
    var p = Kb(i.padding, o),
      b = za(a),
      v = c === 'y' ? Wt : Ut,
      g = c === 'y' ? cn : un,
      h = o.rects.reference[d] + o.rects.reference[c] - s[c] - o.rects.popper[d],
      f = s[c] - o.rects.reference[c],
      S = sr(a),
      w = S ? (c === 'y' ? S.clientHeight || 0 : S.clientWidth || 0) : 0,
      E = h / 2 - f / 2,
      y = p[v],
      m = w - b[d] - p[g],
      O = w / 2 - b[d] / 2 + E,
      R = Wo(y, O, m),
      D = c;
    o.modifiersData[r] = ((t = {}), (t[D] = R), (t.centerOffset = R - O), t);
  }
}
function Gb(e) {
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
      !du(t.elements.popper, i))
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
const Xb = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: Yb,
  effect: Gb,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function yo(e) {
  return e.split('-')[1];
}
var Jb = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
function Zb(e) {
  var t = e.x,
    o = e.y,
    r = window,
    i = r.devicePixelRatio || 1;
  return { x: go(t * i) / i || 0, y: go(o * i) / i || 0 };
}
function yl(e) {
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
    f = typeof d == 'function' ? d({ x: v, y: h }) : { x: v, y: h };
  (v = f.x), (h = f.y);
  var S = s.hasOwnProperty('x'),
    w = s.hasOwnProperty('y'),
    E = Ut,
    y = Wt,
    m = window;
  if (u) {
    var O = sr(o),
      R = 'clientHeight',
      D = 'clientWidth';
    if (
      (O === dn(o) &&
        ((O = Vn(o)),
        yn(O).position !== 'static' &&
          l === 'absolute' &&
          ((R = 'scrollHeight'), (D = 'scrollWidth'))),
      (O = O),
      i === Wt || ((i === Ut || i === un) && a === Zo))
    ) {
      y = cn;
      var $ = p && O === m && m.visualViewport ? m.visualViewport.height : O[R];
      (h -= $ - r.height), (h *= c ? 1 : -1);
    }
    if (i === Ut || ((i === Wt || i === cn) && a === Zo)) {
      E = un;
      var N = p && O === m && m.visualViewport ? m.visualViewport.width : O[D];
      (v -= N - r.width), (v *= c ? 1 : -1);
    }
  }
  var k = Object.assign({ position: l }, u && Jb),
    z = d === !0 ? Zb({ x: v, y: h }) : { x: v, y: h };
  if (((v = z.x), (h = z.y), c)) {
    var j;
    return Object.assign(
      {},
      k,
      ((j = {}),
      (j[y] = w ? '0' : ''),
      (j[E] = S ? '0' : ''),
      (j.transform =
        (m.devicePixelRatio || 1) <= 1
          ? 'translate(' + v + 'px, ' + h + 'px)'
          : 'translate3d(' + v + 'px, ' + h + 'px, 0)'),
      j),
    );
  }
  return Object.assign(
    {},
    k,
    ((t = {}), (t[y] = w ? h + 'px' : ''), (t[E] = S ? v + 'px' : ''), (t.transform = ''), t),
  );
}
function Qb(e) {
  var t = e.state,
    o = e.options,
    r = o.gpuAcceleration,
    i = r === void 0 ? !0 : r,
    a = o.adaptive,
    s = a === void 0 ? !0 : a,
    l = o.roundOffsets,
    c = l === void 0 ? !0 : l;
  if (process.env.NODE_ENV !== 'production') {
    var u = yn(t.elements.popper).transitionProperty || '';
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
    placement: gn(t.placement),
    variation: yo(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      yl(
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
        yl(
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
const eg = { name: 'computeStyles', enabled: !0, phase: 'beforeWrite', fn: Qb, data: {} };
var Er = { passive: !0 };
function tg(e) {
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
        d.addEventListener('scroll', o.update, Er);
      }),
    l && c.addEventListener('resize', o.update, Er),
    function () {
      a &&
        u.forEach(function (d) {
          d.removeEventListener('scroll', o.update, Er);
        }),
        l && c.removeEventListener('resize', o.update, Er);
    }
  );
}
const ng = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: tg,
  data: {},
};
var og = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function Pr(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return og[t];
  });
}
var rg = { start: 'end', end: 'start' };
function xl(e) {
  return e.replace(/start|end/g, function (t) {
    return rg[t];
  });
}
function Ba(e) {
  var t = dn(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return { scrollLeft: o, scrollTop: r };
}
function Wa(e) {
  return vo(Vn(e)).left + Ba(e).scrollLeft;
}
function ig(e, t) {
  var o = dn(e),
    r = Vn(e),
    i = o.visualViewport,
    a = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (i) {
    (a = i.width), (s = i.height);
    var u = uu();
    (u || (!u && t === 'fixed')) && ((l = i.offsetLeft), (c = i.offsetTop));
  }
  return { width: a, height: s, x: l + Wa(e), y: c };
}
function ag(e) {
  var t,
    o = Vn(e),
    r = Ba(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = Xn(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
    s = Xn(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
    l = -r.scrollLeft + Wa(e),
    c = -r.scrollTop;
  return (
    yn(i || o).direction === 'rtl' && (l += Xn(o.clientWidth, i ? i.clientWidth : 0) - a),
    { width: a, height: s, x: l, y: c }
  );
}
function Ua(e) {
  var t = yn(e),
    o = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function hu(e) {
  return ['html', 'body', '#document'].indexOf(Nn(e)) >= 0
    ? e.ownerDocument.body
    : Zt(e) && Ua(e)
    ? e
    : hu(hi(e));
}
function Uo(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = hu(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    a = dn(r),
    s = i ? [a].concat(a.visualViewport || [], Ua(r) ? r : []) : r,
    l = t.concat(s);
  return i ? l : l.concat(Uo(hi(s)));
}
function ua(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function sg(e, t) {
  var o = vo(e, !1, t === 'fixed');
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
function El(e, t, o) {
  return t === lu ? ua(ig(e, o)) : Qn(t) ? sg(t, o) : ua(ag(Vn(e)));
}
function lg(e) {
  var t = Uo(hi(e)),
    o = ['absolute', 'fixed'].indexOf(yn(e).position) >= 0,
    r = o && Zt(e) ? sr(e) : e;
  return Qn(r)
    ? t.filter(function (i) {
        return Qn(i) && du(i, r) && Nn(i) !== 'body';
      })
    : [];
}
function cg(e, t, o, r) {
  var i = t === 'clippingParents' ? lg(e) : [].concat(t),
    a = [].concat(i, [o]),
    s = a[0],
    l = a.reduce(function (c, u) {
      var d = El(e, u, r);
      return (
        (c.top = Xn(d.top, c.top)),
        (c.right = zr(d.right, c.right)),
        (c.bottom = zr(d.bottom, c.bottom)),
        (c.left = Xn(d.left, c.left)),
        c
      );
    }, El(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function bu(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    i = r ? gn(r) : null,
    a = r ? yo(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (i) {
    case Wt:
      c = { x: s, y: t.y - o.height };
      break;
    case cn:
      c = { x: s, y: t.y + t.height };
      break;
    case un:
      c = { x: t.x + t.width, y: l };
      break;
    case Ut:
      c = { x: t.x - o.width, y: l };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var u = i ? Va(i) : null;
  if (u != null) {
    var d = u === 'y' ? 'height' : 'width';
    switch (a) {
      case bo:
        c[u] = c[u] - (t[d] / 2 - o[d] / 2);
        break;
      case Zo:
        c[u] = c[u] + (t[d] / 2 - o[d] / 2);
        break;
    }
  }
  return c;
}
function Qo(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = r === void 0 ? e.placement : r,
    a = o.strategy,
    s = a === void 0 ? e.strategy : a,
    l = o.boundary,
    c = l === void 0 ? $b : l,
    u = o.rootBoundary,
    d = u === void 0 ? lu : u,
    p = o.elementContext,
    b = p === void 0 ? Ao : p,
    v = o.altBoundary,
    g = v === void 0 ? !1 : v,
    h = o.padding,
    f = h === void 0 ? 0 : h,
    S = fu(typeof f != 'number' ? f : mu(f, ar)),
    w = b === Ao ? Pb : Ao,
    E = e.rects.popper,
    y = e.elements[g ? w : b],
    m = cg(Qn(y) ? y : y.contextElement || Vn(e.elements.popper), c, d, s),
    O = vo(e.elements.reference),
    R = bu({ reference: O, element: E, strategy: 'absolute', placement: i }),
    D = ua(Object.assign({}, E, R)),
    $ = b === Ao ? D : O,
    N = {
      top: m.top - $.top + S.top,
      bottom: $.bottom - m.bottom + S.bottom,
      left: m.left - $.left + S.left,
      right: $.right - m.right + S.right,
    },
    k = e.modifiersData.offset;
  if (b === Ao && k) {
    var z = k[i];
    Object.keys(N).forEach(function (j) {
      var P = [un, cn].indexOf(j) >= 0 ? 1 : -1,
        V = [Wt, cn].indexOf(j) >= 0 ? 'y' : 'x';
      N[j] += z[V] * P;
    });
  }
  return N;
}
function ug(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = o.boundary,
    a = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    u = c === void 0 ? cu : c,
    d = yo(r),
    p = d
      ? l
        ? gl
        : gl.filter(function (g) {
            return yo(g) === d;
          })
      : ar,
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
    return (g[h] = Qo(e, { placement: h, boundary: i, rootBoundary: a, padding: s })[gn(h)]), g;
  }, {});
  return Object.keys(v).sort(function (g, h) {
    return v[g] - v[h];
  });
}
function dg(e) {
  if (gn(e) === mi) return [];
  var t = Pr(e);
  return [xl(e), t, xl(t)];
}
function pg(e) {
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
        S = gn(f),
        w = S === f,
        E = c || (w || !g ? [Pr(f)] : dg(f)),
        y = [f].concat(E).reduce(function (K, oe) {
          return K.concat(
            gn(oe) === mi
              ? ug(t, {
                  placement: oe,
                  boundary: d,
                  rootBoundary: p,
                  padding: u,
                  flipVariations: g,
                  allowedAutoPlacements: h,
                })
              : oe,
          );
        }, []),
        m = t.rects.reference,
        O = t.rects.popper,
        R = new Map(),
        D = !0,
        $ = y[0],
        N = 0;
      N < y.length;
      N++
    ) {
      var k = y[N],
        z = gn(k),
        j = yo(k) === bo,
        P = [Wt, cn].indexOf(z) >= 0,
        V = P ? 'width' : 'height',
        B = Qo(t, { placement: k, boundary: d, rootBoundary: p, altBoundary: b, padding: u }),
        Q = P ? (j ? un : Ut) : j ? cn : Wt;
      m[V] > O[V] && (Q = Pr(Q));
      var ie = Pr(Q),
        Z = [];
      if (
        (a && Z.push(B[z] <= 0),
        l && Z.push(B[Q] <= 0, B[ie] <= 0),
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
          W = function (oe) {
            var ee = y.find(function (re) {
              var ce = R.get(re);
              if (ce)
                return ce.slice(0, oe).every(function (de) {
                  return de;
                });
            });
            if (ee) return ($ = ee), 'break';
          },
          ne = _;
        ne > 0;
        ne--
      ) {
        var H = W(ne);
        if (H === 'break') break;
      }
    t.placement !== $ && ((t.modifiersData[r]._skip = !0), (t.placement = $), (t.reset = !0));
  }
}
const fg = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: pg,
  requiresIfExists: ['offset'],
  data: { _skip: !1 },
};
function Cl(e, t, o) {
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
function wl(e) {
  return [Wt, un, cn, Ut].some(function (t) {
    return e[t] >= 0;
  });
}
function mg(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = Qo(t, { elementContext: 'reference' }),
    l = Qo(t, { altBoundary: !0 }),
    c = Cl(s, r),
    u = Cl(l, i, a),
    d = wl(c),
    p = wl(u);
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
const hg = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: mg,
};
function bg(e, t, o) {
  var r = gn(e),
    i = [Ut, Wt].indexOf(r) >= 0 ? -1 : 1,
    a = typeof o == 'function' ? o(Object.assign({}, t, { placement: e })) : o,
    s = a[0],
    l = a[1];
  return (
    (s = s || 0), (l = (l || 0) * i), [Ut, un].indexOf(r) >= 0 ? { x: l, y: s } : { x: s, y: l }
  );
}
function gg(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.offset,
    a = i === void 0 ? [0, 0] : i,
    s = cu.reduce(function (d, p) {
      return (d[p] = bg(p, t.rects, a)), d;
    }, {}),
    l = s[t.placement],
    c = l.x,
    u = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = s);
}
const vg = { name: 'offset', enabled: !0, phase: 'main', requires: ['popperOffsets'], fn: gg };
function yg(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = bu({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const xg = { name: 'popperOffsets', enabled: !0, phase: 'read', fn: yg, data: {} };
function Eg(e) {
  return e === 'x' ? 'y' : 'x';
}
function Cg(e) {
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
    f = Qo(t, { boundary: c, rootBoundary: u, padding: p, altBoundary: d }),
    S = gn(t.placement),
    w = yo(t.placement),
    E = !w,
    y = Va(S),
    m = Eg(y),
    O = t.modifiersData.popperOffsets,
    R = t.rects.reference,
    D = t.rects.popper,
    $ = typeof h == 'function' ? h(Object.assign({}, t.rects, { placement: t.placement })) : h,
    N =
      typeof $ == 'number'
        ? { mainAxis: $, altAxis: $ }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, $),
    k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    z = { x: 0, y: 0 };
  if (O) {
    if (a) {
      var j,
        P = y === 'y' ? Wt : Ut,
        V = y === 'y' ? cn : un,
        B = y === 'y' ? 'height' : 'width',
        Q = O[y],
        ie = Q + f[P],
        Z = Q - f[V],
        _ = v ? -D[B] / 2 : 0,
        W = w === bo ? R[B] : D[B],
        ne = w === bo ? -D[B] : -R[B],
        H = t.elements.arrow,
        K = v && H ? za(H) : { width: 0, height: 0 },
        oe = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : pu(),
        ee = oe[P],
        re = oe[V],
        ce = Wo(0, R[B], K[B]),
        de = E ? R[B] / 2 - _ - ce - ee - N.mainAxis : W - ce - ee - N.mainAxis,
        xe = E ? -R[B] / 2 + _ + ce + re + N.mainAxis : ne + ce + re + N.mainAxis,
        le = t.elements.arrow && sr(t.elements.arrow),
        L = le ? (y === 'y' ? le.clientTop || 0 : le.clientLeft || 0) : 0,
        Te = (j = k == null ? void 0 : k[y]) != null ? j : 0,
        F = Q + de - Te - L,
        G = Q + xe - Te,
        Le = Wo(v ? zr(ie, F) : ie, Q, v ? Xn(Z, G) : Z);
      (O[y] = Le), (z[y] = Le - Q);
    }
    if (l) {
      var ve,
        Fe = y === 'x' ? Wt : Ut,
        He = y === 'x' ? cn : un,
        Pe = O[m],
        Ae = m === 'y' ? 'height' : 'width',
        ut = Pe + f[Fe],
        ht = Pe - f[He],
        ae = [Wt, Ut].indexOf(S) !== -1,
        ye = (ve = k == null ? void 0 : k[m]) != null ? ve : 0,
        we = ae ? ut : Pe - R[Ae] - D[Ae] - ye + N.altAxis,
        U = ae ? Pe + R[Ae] + D[Ae] - ye - N.altAxis : ht,
        fe = v && ae ? qb(we, Pe, U) : Wo(v ? we : ut, Pe, v ? U : ht);
      (O[m] = fe), (z[m] = fe - Pe);
    }
    t.modifiersData[r] = z;
  }
}
const wg = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: Cg,
  requiresIfExists: ['offset'],
};
function Sg(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function Tg(e) {
  return e === dn(e) || !Zt(e) ? Ba(e) : Sg(e);
}
function Rg(e) {
  var t = e.getBoundingClientRect(),
    o = go(t.width) / e.offsetWidth || 1,
    r = go(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function Og(e, t, o) {
  o === void 0 && (o = !1);
  var r = Zt(t),
    i = Zt(t) && Rg(t),
    a = Vn(t),
    s = vo(e, i, o),
    l = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 };
  return (
    (r || (!r && !o)) &&
      ((Nn(t) !== 'body' || Ua(a)) && (l = Tg(t)),
      Zt(t) ? ((c = vo(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : a && (c.x = Wa(a))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function kg(e) {
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
function Ng(e) {
  var t = kg(e);
  return la.reduce(function (o, r) {
    return o.concat(
      t.filter(function (i) {
        return i.phase === r;
      }),
    );
  }, []);
}
function $g(e) {
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
function An(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    o[r - 1] = arguments[r];
  return [].concat(o).reduce(function (i, a) {
    return i.replace(/%s/, a);
  }, e);
}
var Bn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  Pg = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  Sl = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function Ig(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), Sl)
      .filter(function (o, r, i) {
        return i.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                An(Bn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                An(Bn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            la.indexOf(t.phase) < 0 &&
              console.error(
                An(Bn, t.name, '"phase"', 'either ' + la.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(An(Bn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(An(Bn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                An(Bn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                An(
                  Bn,
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
                Sl.map(function (r) {
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
            }) == null && console.error(An(Pg, String(t.name), r, r));
          });
      });
  });
}
function _g(e, t) {
  var o = new Set();
  return e.filter(function (r) {
    var i = t(r);
    if (!o.has(i)) return o.add(i), !0;
  });
}
function Mg(e) {
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
var Tl =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Ag =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  Rl = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
function Ol() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function Dg(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    i = t.defaultOptions,
    a = i === void 0 ? Rl : i;
  return function (l, c, u) {
    u === void 0 && (u = a);
    var d = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, Rl, a),
        modifiersData: {},
        elements: { reference: l, popper: c },
        attributes: {},
        styles: {},
      },
      p = [],
      b = !1,
      v = {
        state: d,
        setOptions: function (S) {
          var w = typeof S == 'function' ? S(d.options) : S;
          h(),
            (d.options = Object.assign({}, a, d.options, w)),
            (d.scrollParents = {
              reference: Qn(l) ? Uo(l) : l.contextElement ? Uo(l.contextElement) : [],
              popper: Uo(c),
            });
          var E = Ng(Mg([].concat(r, d.options.modifiers)));
          if (
            ((d.orderedModifiers = E.filter(function (k) {
              return k.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var y = _g([].concat(E, d.options.modifiers), function (k) {
              var z = k.name;
              return z;
            });
            if ((Ig(y), gn(d.options.placement) === mi)) {
              var m = d.orderedModifiers.find(function (k) {
                var z = k.name;
                return z === 'flip';
              });
              m ||
                console.error(
                  [
                    'Popper: "auto" placements require the "flip" modifier be',
                    'present and enabled to work.',
                  ].join(' '),
                );
            }
            var O = yn(c),
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
        forceUpdate: function () {
          if (!b) {
            var S = d.elements,
              w = S.reference,
              E = S.popper;
            if (!Ol(w, E)) {
              process.env.NODE_ENV !== 'production' && console.error(Tl);
              return;
            }
            (d.rects = { reference: Og(w, sr(E), d.options.strategy === 'fixed'), popper: za(E) }),
              (d.reset = !1),
              (d.placement = d.options.placement),
              d.orderedModifiers.forEach(function (k) {
                return (d.modifiersData[k.name] = Object.assign({}, k.data));
              });
            for (var y = 0, m = 0; m < d.orderedModifiers.length; m++) {
              if (process.env.NODE_ENV !== 'production' && ((y += 1), y > 100)) {
                console.error(Ag);
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
                (d = R({ state: d, options: $, name: N, instance: v }) || d);
            }
          }
        },
        update: $g(function () {
          return new Promise(function (f) {
            v.forceUpdate(), f(d);
          });
        }),
        destroy: function () {
          h(), (b = !0);
        },
      };
    if (!Ol(l, c)) return process.env.NODE_ENV !== 'production' && console.error(Tl), v;
    v.setOptions(u).then(function (f) {
      !b && u.onFirstUpdate && u.onFirstUpdate(f);
    });
    function g() {
      d.orderedModifiers.forEach(function (f) {
        var S = f.name,
          w = f.options,
          E = w === void 0 ? {} : w,
          y = f.effect;
        if (typeof y == 'function') {
          var m = y({ state: d, name: S, instance: v, options: E }),
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
var Lg = [ng, xg, eg, Wb, vg, fg, wg, Xb, hg],
  Fg = Dg({ defaultModifiers: Lg });
function jg(e) {
  return typeof e == 'function' ? e() : e;
}
const Vr = C.forwardRef(function (t, o) {
  const { children: r, container: i, disablePortal: a = !1 } = t,
    [s, l] = C.useState(null),
    c = Ot(C.isValidElement(r) ? r.ref : null, o);
  if (
    (On(() => {
      a || l(jg(i) || document.body);
    }, [i, a]),
    On(() => {
      if (s && !a)
        return (
          Mr(o, s),
          () => {
            Mr(o, null);
          }
        );
    }, [o, s, a]),
    a)
  ) {
    if (C.isValidElement(r)) {
      const u = { ref: c };
      return C.cloneElement(r, u);
    }
    return I(C.Fragment, { children: r });
  }
  return I(C.Fragment, { children: s && wc.createPortal(r, s) });
});
process.env.NODE_ENV !== 'production' &&
  (Vr.propTypes = {
    children: n.node,
    container: n.oneOfType([Rn, n.func]),
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (Vr['propTypes'] = xa(Vr.propTypes));
const gu = Vr;
function zg(e) {
  return Ue('MuiPopper', e);
}
Be('MuiPopper', ['root']);
const Vg = [
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
  Bg = [
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
function Wg(e, t) {
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
function Br(e) {
  return typeof e == 'function' ? e() : e;
}
function bi(e) {
  return e.nodeType !== void 0;
}
function Ug(e) {
  return !bi(e);
}
const Hg = () => Ge({ root: ['root'] }, au(zg)),
  qg = {},
  Kg = C.forwardRef(function (t, o) {
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
        TransitionProps: S,
      } = t,
      w = Re(t, Vg),
      E = C.useRef(null),
      y = Ot(E, o),
      m = C.useRef(null),
      O = Ot(m, g),
      R = C.useRef(O);
    On(() => {
      R.current = O;
    }, [O]),
      C.useImperativeHandle(g, () => m.current, []);
    const D = Wg(b, l),
      [$, N] = C.useState(D),
      [k, z] = C.useState(Br(i));
    C.useEffect(() => {
      m.current && m.current.forceUpdate();
    }),
      C.useEffect(() => {
        i && z(Br(i));
      }, [i]),
      On(() => {
        if (!k || !d) return;
        const Q = (_) => {
          N(_.placement);
        };
        if (process.env.NODE_ENV !== 'production' && k && bi(k) && k.nodeType === 1) {
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
        let ie = [
          { name: 'preventOverflow', options: { altBoundary: c } },
          { name: 'flip', options: { altBoundary: c } },
          {
            name: 'onUpdate',
            enabled: !0,
            phase: 'afterWrite',
            fn: ({ state: _ }) => {
              Q(_);
            },
          },
        ];
        u != null && (ie = ie.concat(u)), v && v.modifiers != null && (ie = ie.concat(v.modifiers));
        const Z = Fg(k, E.current, x({ placement: D }, v, { modifiers: ie }));
        return (
          R.current(Z),
          () => {
            Z.destroy(), R.current(null);
          }
        );
      }, [k, c, u, d, v, D]);
    const j = { placement: $ };
    S !== null && (j.TransitionProps = S);
    const P = Hg(),
      V = (r = s ?? f.root) != null ? r : 'div',
      B = rn({
        elementType: V,
        externalSlotProps: h.root,
        externalForwardedProps: w,
        additionalProps: { role: 'tooltip', ref: y },
        ownerState: x({}, t, p),
        className: P.root,
      });
    return I(V, x({}, B, { children: typeof a == 'function' ? a(j) : a }));
  }),
  vu = C.forwardRef(function (t, o) {
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
        popperOptions: b = qg,
        popperRef: v,
        style: g,
        transition: h = !1,
        slotProps: f = {},
        slots: S = {},
      } = t,
      w = Re(t, Bg),
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
      const N = Br(r);
      R = N && bi(N) ? St(N).body : St(null).body;
    }
    const D = !d && c && (!h || E) ? 'none' : void 0,
      $ = h ? { in: d, onEnter: m, onExited: O } : void 0;
    return I(gu, {
      disablePortal: l,
      container: R,
      children: I(
        Kg,
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
            slots: S,
          },
          w,
          {
            style: x({ position: 'fixed', top: 0, left: 0, display: D }, g),
            TransitionProps: $,
            children: i,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (vu.propTypes = {
    anchorEl: vn(n.oneOfType([Rn, n.object, n.func]), (e) => {
      if (e.open) {
        const t = Br(e.anchorEl);
        if (t && bi(t) && t.nodeType === 1) {
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
          (Ug(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    container: n.oneOfType([Rn, n.func]),
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
    popperRef: qt,
    slotProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    slots: n.shape({ root: n.elementType }),
    style: n.object,
    transition: n.bool,
  });
const Yg = vu;
function Gg(e) {
  const t = St(e);
  return t.body === e
    ? Jn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function Ho(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function kl(e) {
  return parseInt(Jn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Xg(e) {
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
function Nl(e, t, o, r, i) {
  const a = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1,
      c = !Xg(s);
    l && c && Ho(s, i);
  });
}
function Wi(e, t) {
  let o = -1;
  return e.some((r, i) => (t(r) ? ((o = i), !0) : !1)), o;
}
function Jg(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (Gg(r)) {
      const s = _c(St(r));
      o.push({ value: r.style.paddingRight, property: 'padding-right', el: r }),
        (r.style.paddingRight = `${kl(r) + s}px`);
      const l = St(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({ value: c.style.paddingRight, property: 'padding-right', el: c }),
          (c.style.paddingRight = `${kl(c) + s}px`);
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment) a = St(r).body;
    else {
      const s = r.parentElement,
        l = Jn(r);
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
function Zg(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class Qg {
  constructor() {
    (this.containers = void 0), (this.modals = void 0), (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && Ho(t.modalRef, !1);
    const i = Zg(o);
    Nl(o, t.mount, t.modalRef, i, !0);
    const a = Wi(this.containers, (s) => s.container === o);
    return a !== -1
      ? (this.containers[a].modals.push(t), r)
      : (this.containers.push({ modals: [t], container: o, restore: null, hiddenSiblings: i }), r);
  }
  mount(t, o) {
    const r = Wi(this.containers, (a) => a.modals.indexOf(t) !== -1),
      i = this.containers[r];
    i.restore || (i.restore = Jg(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const i = Wi(this.containers, (s) => s.modals.indexOf(t) !== -1),
      a = this.containers[i];
    if ((a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0))
      a.restore && a.restore(),
        t.modalRef && Ho(t.modalRef, o),
        Nl(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1),
        this.containers.splice(i, 1);
    else {
      const s = a.modals[a.modals.length - 1];
      s.modalRef && Ho(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function ev(e) {
  return Ue('MuiModal', e);
}
Be('MuiModal', ['root', 'hidden', 'backdrop']);
const tv = [
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
  nv = (e) => {
    const { open: t, exited: o } = e;
    return Ge({ root: ['root', !t && o && 'hidden'], backdrop: ['backdrop'] }, au(ev));
  };
function ov(e) {
  return typeof e == 'function' ? e() : e;
}
function rv(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const iv = new Qg(),
  yu = C.forwardRef(function (t, o) {
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
        manager: S = iv,
        onBackdropClick: w,
        onClose: E,
        onKeyDown: y,
        open: m,
        onTransitionEnter: O,
        onTransitionExited: R,
        slotProps: D = {},
        slots: $ = {},
      } = t,
      N = Re(t, tv),
      [k, z] = C.useState(!m),
      j = C.useRef({}),
      P = C.useRef(null),
      V = C.useRef(null),
      B = Ot(V, o),
      Q = rv(a),
      ie = (r = t['aria-hidden']) != null ? r : !0,
      Z = () => St(P.current),
      _ = () => ((j.current.modalRef = V.current), (j.current.mountNode = P.current), j.current),
      W = () => {
        S.mount(_(), { disableScrollLock: g }), V.current && (V.current.scrollTop = 0);
      },
      ne = jt(() => {
        const ve = ov(c) || Z().body;
        S.add(_(), ve), V.current && W();
      }),
      H = C.useCallback(() => S.isTopModal(_()), [S]),
      K = jt((ve) => {
        (P.current = ve), !(!ve || !V.current) && (m && H() ? W() : Ho(V.current, ie));
      }),
      oe = C.useCallback(() => {
        S.remove(_(), ie);
      }, [S, ie]);
    C.useEffect(
      () => () => {
        oe();
      },
      [oe],
    ),
      C.useEffect(() => {
        m ? ne() : (!Q || !s) && oe();
      }, [m, oe, Q, s, ne]);
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
      re = nv(ee),
      ce = () => {
        z(!1), O && O();
      },
      de = () => {
        z(!0), R && R(), s && oe();
      },
      xe = (ve) => {
        ve.target === ve.currentTarget && (w && w(ve), E && E(ve, 'backdropClick'));
      },
      le = (ve) => {
        y && y(ve),
          !(ve.key !== 'Escape' || !H()) &&
            (p || (ve.stopPropagation(), E && E(ve, 'escapeKeyDown')));
      },
      L = {};
    a.props.tabIndex === void 0 && (L.tabIndex = '-1'),
      Q && ((L.onEnter = Ms(ce, a.props.onEnter)), (L.onExited = Ms(de, a.props.onExited)));
    const Te = (i = l ?? $.root) != null ? i : 'div',
      F = rn({
        elementType: Te,
        externalSlotProps: D.root,
        externalForwardedProps: N,
        additionalProps: { ref: B, role: 'presentation', onKeyDown: le },
        className: re.root,
        ownerState: ee,
      }),
      G = $.backdrop,
      Le = rn({
        elementType: G,
        externalSlotProps: D.backdrop,
        additionalProps: { 'aria-hidden': !0, onClick: xe, open: m },
        className: re.backdrop,
        ownerState: ee,
      });
    return !f && !m && (!Q || k)
      ? null
      : I(gu, {
          ref: K,
          container: c,
          disablePortal: b,
          children: je(
            Te,
            x({}, F, {
              children: [
                !h && G ? I(G, x({}, Le)) : null,
                I(jr, {
                  disableEnforceFocus: d,
                  disableAutoFocus: u,
                  disableRestoreFocus: v,
                  isEnabled: H,
                  open: m,
                  children: C.cloneElement(a, L),
                }),
              ],
            }),
          ),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (yu.propTypes = {
    children: Co.isRequired,
    closeAfterTransition: n.bool,
    component: n.elementType,
    container: n.oneOfType([Rn, n.func]),
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
const av = yu,
  sv = 2;
function xu(e, t) {
  return e - t;
}
function Do(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function $l(e, t) {
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
function Cr(e, t) {
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
function Wr(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function lv(e, t, o) {
  return (o - t) * e + t;
}
function cv(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function uv(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(cv(t)));
}
function Pl({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(xu);
}
function wr({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, i;
  const a = St(e.current);
  if (
    !((r = e.current) != null && r.contains(a.activeElement)) ||
    Number(a == null || (i = a.activeElement) == null ? void 0 : i.getAttribute('data-index')) !== t
  ) {
    var s;
    (s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  o && o(t);
}
const dv = {
    horizontal: { offset: (e) => ({ left: `${e}%` }), leap: (e) => ({ width: `${e}%` }) },
    'horizontal-reverse': {
      offset: (e) => ({ right: `${e}%` }),
      leap: (e) => ({ width: `${e}%` }),
    },
    vertical: { offset: (e) => ({ bottom: `${e}%` }), leap: (e) => ({ height: `${e}%` }) },
  },
  pv = (e) => e;
let Sr;
function Ui() {
  return (
    Sr === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Sr = CSS.supports('touch-action', 'none'))
        : (Sr = !0)),
    Sr
  );
}
function fv(e) {
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
      scale: g = pv,
      step: h = 1,
      tabIndex: f,
      value: S,
    } = e,
    w = C.useRef(),
    [E, y] = C.useState(-1),
    [m, O] = C.useState(-1),
    [R, D] = C.useState(!1),
    $ = C.useRef(0),
    [N, k] = Gn({ controlled: S, default: o ?? c, name: 'Slider' }),
    z =
      d &&
      ((ae, ye, we) => {
        const U = ae.nativeEvent || ae,
          fe = new U.constructor(U.type, U);
        Object.defineProperty(fe, 'target', { writable: !0, value: { value: ye, name: u } }),
          d(fe, ye, we);
      }),
    j = Array.isArray(N);
  let P = j ? N.slice().sort(xu) : [N];
  P = P.map((ae) => Do(ae, c, l));
  const V =
      s === !0 && h !== null
        ? [...Array(Math.floor((l - c) / h) + 1)].map((ae, ye) => ({ value: c + h * ye }))
        : s || [],
    B = V.map((ae) => ae.value),
    { isFocusVisibleRef: Q, onBlur: ie, onFocus: Z, ref: _ } = Ic(),
    [W, ne] = C.useState(-1),
    H = C.useRef(),
    K = Ot(_, H),
    oe = Ot(v, K),
    ee = (ae) => (ye) => {
      var we;
      const U = Number(ye.currentTarget.getAttribute('data-index'));
      Z(ye),
        Q.current === !0 && ne(U),
        O(U),
        ae == null || (we = ae.onFocus) == null || we.call(ae, ye);
    },
    re = (ae) => (ye) => {
      var we;
      ie(ye),
        Q.current === !1 && ne(-1),
        O(-1),
        ae == null || (we = ae.onBlur) == null || we.call(ae, ye);
    };
  On(() => {
    if (r && H.current.contains(document.activeElement)) {
      var ae;
      (ae = document.activeElement) == null || ae.blur();
    }
  }, [r]),
    r && E !== -1 && y(-1),
    r && W !== -1 && ne(-1);
  const ce = (ae) => (ye) => {
      var we;
      (we = ae.onChange) == null || we.call(ae, ye);
      const U = Number(ye.currentTarget.getAttribute('data-index')),
        fe = P[U],
        pe = B.indexOf(fe);
      let se = ye.target.valueAsNumber;
      if (
        (V && h == null && (se = se < fe ? B[pe - 1] : B[pe + 1]),
        (se = Do(se, c, l)),
        V && h == null)
      ) {
        const Ce = B.indexOf(P[U]);
        se = se < P[U] ? B[Ce - 1] : B[Ce + 1];
      }
      if (j) {
        i && (se = Do(se, P[U - 1] || -1 / 0, P[U + 1] || 1 / 0));
        const Ce = se;
        se = Pl({ values: P, newValue: se, index: U });
        let Se = U;
        i || (Se = se.indexOf(Ce)), wr({ sliderRef: H, activeIndex: Se });
      }
      k(se), ne(U), z && z(ye, se, U), p && p(ye, se);
    },
    de = C.useRef();
  let xe = b;
  a && b === 'horizontal' && (xe += '-reverse');
  const le = ({ finger: ae, move: ye = !1 }) => {
      const { current: we } = H,
        { width: U, height: fe, bottom: pe, left: se } = we.getBoundingClientRect();
      let Ce;
      xe.indexOf('vertical') === 0 ? (Ce = (pe - ae.y) / fe) : (Ce = (ae.x - se) / U),
        xe.indexOf('-reverse') !== -1 && (Ce = 1 - Ce);
      let Se;
      if (((Se = lv(Ce, c, l)), h)) Se = uv(Se, h, c);
      else {
        const bt = $l(B, Se);
        Se = B[bt];
      }
      Se = Do(Se, c, l);
      let De = 0;
      if (j) {
        ye ? (De = de.current) : (De = $l(P, Se)),
          i && (Se = Do(Se, P[De - 1] || -1 / 0, P[De + 1] || 1 / 0));
        const bt = Se;
        (Se = Pl({ values: P, newValue: Se, index: De })),
          (i && ye) || ((De = Se.indexOf(bt)), (de.current = De));
      }
      return { newValue: Se, activeIndex: De };
    },
    L = jt((ae) => {
      const ye = Cr(ae, w);
      if (!ye) return;
      if ((($.current += 1), ae.type === 'mousemove' && ae.buttons === 0)) {
        Te(ae);
        return;
      }
      const { newValue: we, activeIndex: U } = le({ finger: ye, move: !0 });
      wr({ sliderRef: H, activeIndex: U, setActive: y }),
        k(we),
        !R && $.current > sv && D(!0),
        z && we !== N && z(ae, we, U);
    }),
    Te = jt((ae) => {
      const ye = Cr(ae, w);
      if ((D(!1), !ye)) return;
      const { newValue: we } = le({ finger: ye, move: !0 });
      y(-1), ae.type === 'touchend' && O(-1), p && p(ae, we), (w.current = void 0), G();
    }),
    F = jt((ae) => {
      if (r) return;
      Ui() || ae.preventDefault();
      const ye = ae.changedTouches[0];
      ye != null && (w.current = ye.identifier);
      const we = Cr(ae, w);
      if (we !== !1) {
        const { newValue: fe, activeIndex: pe } = le({ finger: we });
        wr({ sliderRef: H, activeIndex: pe, setActive: y }), k(fe), z && z(ae, fe, pe);
      }
      $.current = 0;
      const U = St(H.current);
      U.addEventListener('touchmove', L), U.addEventListener('touchend', Te);
    }),
    G = C.useCallback(() => {
      const ae = St(H.current);
      ae.removeEventListener('mousemove', L),
        ae.removeEventListener('mouseup', Te),
        ae.removeEventListener('touchmove', L),
        ae.removeEventListener('touchend', Te);
    }, [Te, L]);
  C.useEffect(() => {
    const { current: ae } = H;
    return (
      ae.addEventListener('touchstart', F, { passive: Ui() }),
      () => {
        ae.removeEventListener('touchstart', F, { passive: Ui() }), G();
      }
    );
  }, [G, F]),
    C.useEffect(() => {
      r && G();
    }, [r, G]);
  const Le = (ae) => (ye) => {
      var we;
      if (
        ((we = ae.onMouseDown) == null || we.call(ae, ye),
        r || ye.defaultPrevented || ye.button !== 0)
      )
        return;
      ye.preventDefault();
      const U = Cr(ye, w);
      if (U !== !1) {
        const { newValue: pe, activeIndex: se } = le({ finger: U });
        wr({ sliderRef: H, activeIndex: se, setActive: y }), k(pe), z && z(ye, pe, se);
      }
      $.current = 0;
      const fe = St(H.current);
      fe.addEventListener('mousemove', L), fe.addEventListener('mouseup', Te);
    },
    ve = Wr(j ? P[0] : c, c, l),
    Fe = Wr(P[P.length - 1], c, l) - ve,
    He = (ae = {}) => {
      const ye = { onMouseDown: Le(ae || {}) },
        we = x({}, ae, ye);
      return x({ ref: oe }, we);
    },
    Pe = (ae) => (ye) => {
      var we;
      (we = ae.onMouseOver) == null || we.call(ae, ye);
      const U = Number(ye.currentTarget.getAttribute('data-index'));
      O(U);
    },
    Ae = (ae) => (ye) => {
      var we;
      (we = ae.onMouseLeave) == null || we.call(ae, ye), O(-1);
    };
  return {
    active: E,
    axis: xe,
    axisProps: dv,
    dragging: R,
    focusedThumbIndex: W,
    getHiddenInputProps: (ae = {}) => {
      var ye;
      const we = { onChange: ce(ae || {}), onFocus: ee(ae || {}), onBlur: re(ae || {}) },
        U = x({}, ae, we);
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
          step: (ye = e.step) != null ? ye : void 0,
          disabled: r,
        },
        U,
        { style: x({}, tf, { direction: a ? 'rtl' : 'ltr', width: '100%', height: '100%' }) },
      );
    },
    getRootProps: He,
    getThumbProps: (ae = {}) => {
      const ye = { onMouseOver: Pe(ae || {}), onMouseLeave: Ae(ae || {}) };
      return x({}, ae, ye);
    },
    marks: V,
    open: m,
    range: j,
    trackLeap: Fe,
    trackOffset: ve,
    values: P,
  };
}
function mv(e) {
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
  const c = jt((w, E) => {
      r == null || r(w, E);
    }),
    u = jt((w) => {
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
        const E = su(e),
          y = x({}, E, w);
        return x({ ref: a, role: 'presentation' }, y, {
          onBlur: v(y),
          onFocus: g(y),
          onMouseEnter: h(y),
          onMouseLeave: f(y),
        });
      },
      onClickAway: d,
    }
  );
}
const hv = ['onChange', 'maxRows', 'minRows', 'style', 'value'];
function Tr(e) {
  return parseInt(e, 10) || 0;
}
const bv = {
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
function Il(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const Eu = C.forwardRef(function (t, o) {
  const { onChange: r, maxRows: i, minRows: a = 1, style: s, value: l } = t,
    c = Re(t, hv),
    { current: u } = C.useRef(l != null),
    d = C.useRef(null),
    p = Ot(o, d),
    b = C.useRef(null),
    v = C.useRef(0),
    [g, h] = C.useState({ outerHeightStyle: 0 }),
    f = C.useCallback(() => {
      const m = d.current,
        R = Jn(m).getComputedStyle(m);
      if (R.width === '0px') return { outerHeightStyle: 0 };
      const D = b.current;
      (D.style.width = R.width),
        (D.value = m.value || t.placeholder || 'x'),
        D.value.slice(-1) ===
          `
` && (D.value += ' ');
      const $ = R.boxSizing,
        N = Tr(R.paddingBottom) + Tr(R.paddingTop),
        k = Tr(R.borderBottomWidth) + Tr(R.borderTopWidth),
        z = D.scrollHeight;
      D.value = 'x';
      const j = D.scrollHeight;
      let P = z;
      a && (P = Math.max(Number(a) * j, P)),
        i && (P = Math.min(Number(i) * j, P)),
        (P = Math.max(P, j));
      const V = P + ($ === 'border-box' ? N + k : 0),
        B = Math.abs(P - z) <= 1;
      return { outerHeightStyle: V, overflow: B };
    }, [i, a, t.placeholder]),
    S = (m, O) => {
      const { outerHeightStyle: R, overflow: D } = O;
      return v.current < 20 &&
        ((R > 0 && Math.abs((m.outerHeightStyle || 0) - R) > 1) || m.overflow !== D)
        ? ((v.current += 1), { overflow: D, outerHeightStyle: R })
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
      Il(m) || h((O) => S(O, m));
    }, [f]),
    E = () => {
      const m = f();
      Il(m) ||
        wc.flushSync(() => {
          h((O) => S(O, m));
        });
    };
  C.useEffect(() => {
    const m = $c(() => {
      (v.current = 0), d.current && E();
    });
    let O;
    const R = d.current,
      D = Jn(R);
    return (
      D.addEventListener('resize', m),
      typeof ResizeObserver < 'u' && ((O = new ResizeObserver(m)), O.observe(R)),
      () => {
        m.clear(), D.removeEventListener('resize', m), O && O.disconnect();
      }
    );
  }),
    On(() => {
      w();
    }),
    C.useEffect(() => {
      v.current = 0;
    }, [l]);
  const y = (m) => {
    (v.current = 0), u || w(), r && r(m);
  };
  return je(C.Fragment, {
    children: [
      I(
        'textarea',
        x(
          {
            value: l,
            onChange: y,
            ref: p,
            rows: a,
            style: x({ height: g.outerHeightStyle, overflow: g.overflow ? 'hidden' : void 0 }, s),
          },
          c,
        ),
      ),
      I('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: b,
        tabIndex: -1,
        style: x({}, bv.shadow, s, { padding: 0 }),
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (Eu.propTypes = {
    className: n.string,
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    onChange: n.func,
    placeholder: n.string,
    style: n.object,
    value: n.oneOfType([n.arrayOf(n.string), n.number, n.string]),
  });
const gv = Eu;
function _l(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function vv(e = {}) {
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
    o && (d = d.toLowerCase()), t && (d = _l(d));
    const p = d
      ? l.filter((b) => {
          let v = (a || u)(b);
          return (
            o && (v = v.toLowerCase()),
            t && (v = _l(v)),
            i === 'start' ? v.indexOf(d) === 0 : v.indexOf(d) > -1
          );
        })
      : l;
    return typeof r == 'number' ? p.slice(0, r) : p;
  };
}
function Hi(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const yv = vv(),
  Ml = 5,
  xv = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function Ev(e) {
  const {
      unstable_isActiveElementInListbox: t = xv,
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
      filterOptions: f = yv,
      filterSelectedOptions: S = !1,
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
      onChange: z,
      onClose: j,
      onHighlightChange: P,
      onInputChange: V,
      onOpen: B,
      open: Q,
      openOnFocus: ie = !1,
      options: Z,
      readOnly: _ = !1,
      selectOnFocus: W = !e.freeSolo,
      value: ne,
    } = e,
    H = Pc(R);
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
  const oe = C.useRef(!1),
    ee = C.useRef(!0),
    re = C.useRef(null),
    ce = C.useRef(null),
    [de, xe] = C.useState(null),
    [le, L] = C.useState(-1),
    Te = i ? 0 : -1,
    F = C.useRef(Te),
    [G, Le] = Gn({ controlled: ne, default: d, name: u }),
    [ve, Fe] = Gn({ controlled: $, default: '', name: u, state: 'inputValue' }),
    [He, Pe] = C.useState(!1),
    Ae = C.useCallback(
      (A, M) => {
        if (!(k ? G.length < M.length : M !== null) && !l) return;
        let Y;
        if (k) Y = '';
        else if (M == null) Y = '';
        else {
          const he = K(M);
          Y = typeof he == 'string' ? he : '';
        }
        ve !== Y && (Fe(Y), V && V(A, Y, 'reset'));
      },
      [K, ve, k, V, Fe, l, G],
    ),
    [ut, ht] = Gn({ controlled: Q, default: !1, name: u, state: 'open' }),
    [ae, ye] = C.useState(!0),
    we = !k && G != null && ve === K(G),
    U = ut && !_,
    fe = U
      ? f(
          Z.filter((A) => !(S && (k ? G : [G]).some((M) => M !== null && N(A, M)))),
          { inputValue: we && ae ? '' : ve, getOptionLabel: K },
        )
      : [],
    pe = Qp({ filteredOptions: fe, value: G });
  C.useEffect(() => {
    const A = G !== pe.value;
    (He && !A) || (w && !A) || Ae(null, G);
  }, [G, Ae, He, pe.value, w]);
  const se = ut && fe.length > 0 && !_;
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
  const Ce = jt((A) => {
    A === -1 ? re.current.focus() : de.querySelector(`[data-tag-index="${A}"]`).focus();
  });
  C.useEffect(() => {
    k && le > G.length - 1 && (L(-1), Ce(-1));
  }, [G, k, le, Ce]);
  function Se(A, M) {
    if (!ce.current || A === -1) return -1;
    let X = A;
    for (;;) {
      if ((M === 'next' && X === fe.length) || (M === 'previous' && X === -1)) return -1;
      const Y = ce.current.querySelector(`[data-option-index="${X}"]`),
        he = g ? !1 : !Y || Y.disabled || Y.getAttribute('aria-disabled') === 'true';
      if ((Y && !Y.hasAttribute('tabindex')) || he) X += M === 'next' ? 1 : -1;
      else return X;
    }
  }
  const De = jt(({ event: A, index: M, reason: X = 'auto' }) => {
      if (
        ((F.current = M),
        M === -1
          ? re.current.removeAttribute('aria-activedescendant')
          : re.current.setAttribute('aria-activedescendant', `${H}-option-${M}`),
        P && P(A, M === -1 ? null : fe[M], X),
        !ce.current)
      )
        return;
      const Y = ce.current.querySelector(`[role="option"].${o}-focused`);
      Y && (Y.classList.remove(`${o}-focused`), Y.classList.remove(`${o}-focusVisible`));
      const he = ce.current.parentElement.querySelector('[role="listbox"]');
      if (!he) return;
      if (M === -1) {
        he.scrollTop = 0;
        return;
      }
      const _e = ce.current.querySelector(`[data-option-index="${M}"]`);
      if (
        _e &&
        (_e.classList.add(`${o}-focused`),
        X === 'keyboard' && _e.classList.add(`${o}-focusVisible`),
        he.scrollHeight > he.clientHeight && X !== 'mouse')
      ) {
        const Ie = _e,
          ke = he.clientHeight + he.scrollTop,
          kt = Ie.offsetTop + Ie.offsetHeight;
        kt > ke
          ? (he.scrollTop = kt - he.clientHeight)
          : Ie.offsetTop - Ie.offsetHeight * (m ? 1.3 : 0) < he.scrollTop &&
            (he.scrollTop = Ie.offsetTop - Ie.offsetHeight * (m ? 1.3 : 0));
      }
    }),
    bt = jt(({ event: A, diff: M, direction: X = 'next', reason: Y = 'auto' }) => {
      if (!U) return;
      const _e = Se(
        (() => {
          const Ie = fe.length - 1;
          if (M === 'reset') return Te;
          if (M === 'start') return 0;
          if (M === 'end') return Ie;
          const ke = F.current + M;
          return ke < 0
            ? ke === -1 && D
              ? -1
              : (h && F.current !== -1) || Math.abs(M) > 1
              ? 0
              : Ie
            : ke > Ie
            ? ke === Ie + 1 && D
              ? -1
              : h || Math.abs(M) > 1
              ? Ie
              : 0
            : ke;
        })(),
        X,
      );
      if ((De({ index: _e, reason: Y, event: A }), r && M !== 'reset'))
        if (_e === -1) re.current.value = ve;
        else {
          const Ie = K(fe[_e]);
          (re.current.value = Ie),
            Ie.toLowerCase().indexOf(ve.toLowerCase()) === 0 &&
              ve.length > 0 &&
              re.current.setSelectionRange(ve.length, Ie.length);
        }
    }),
    dt = () => {
      const A = (M, X) => {
        const Y = M ? K(M) : '',
          he = X ? K(X) : '';
        return Y === he;
      };
      if (
        F.current !== -1 &&
        pe.filteredOptions &&
        pe.filteredOptions.length !== fe.length &&
        (k
          ? G.length === pe.value.length && pe.value.every((M, X) => K(G[X]) === K(M))
          : A(pe.value, G))
      ) {
        const M = pe.filteredOptions[F.current];
        if (M && fe.some((Y) => K(Y) === K(M))) return !0;
      }
      return !1;
    },
    It = C.useCallback(() => {
      if (!U || dt()) return;
      const A = k ? G[0] : G;
      if (fe.length === 0 || A == null) {
        bt({ diff: 'reset' });
        return;
      }
      if (ce.current) {
        if (A != null) {
          const M = fe[F.current];
          if (k && M && Hi(G, (Y) => N(M, Y)) !== -1) return;
          const X = Hi(fe, (Y) => N(Y, A));
          X === -1 ? bt({ diff: 'reset' }) : De({ index: X });
          return;
        }
        if (F.current >= fe.length - 1) {
          De({ index: fe.length - 1 });
          return;
        }
        De({ index: F.current });
      }
    }, [fe.length, k ? !1 : G, S, bt, De, U, ve, k]),
    Qt = jt((A) => {
      Mr(ce, A), A && It();
    });
  process.env.NODE_ENV !== 'production' &&
    C.useEffect(() => {
      (!re.current || re.current.nodeName !== 'INPUT') &&
        (re.current && re.current.nodeName === 'TEXTAREA'
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
                `MUI: Unable to find the input element. It was resolved to ${re.current} while an HTMLInputElement was expected.`,
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
      It();
    }, [It]);
  const _t = (A) => {
      ut || (ht(!0), ye(!0), B && B(A));
    },
    Tt = (A, M) => {
      ut && (ht(!1), j && j(A, M));
    },
    Rt = (A, M, X, Y) => {
      if (k) {
        if (G.length === M.length && G.every((he, _e) => he === M[_e])) return;
      } else if (G === M) return;
      z && z(A, M, X, Y), Le(M);
    },
    vt = C.useRef(!1),
    We = (A, M, X = 'selectOption', Y = 'options') => {
      let he = X,
        _e = M;
      if (k) {
        if (((_e = Array.isArray(G) ? G.slice() : []), process.env.NODE_ENV !== 'production')) {
          const ke = _e.filter((kt) => N(M, kt));
          ke.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${u} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${ke.length} matches.`,
              ].join(`
`),
            );
        }
        const Ie = Hi(_e, (ke) => N(M, ke));
        Ie === -1 ? _e.push(M) : Y !== 'freeSolo' && (_e.splice(Ie, 1), (he = 'removeOption'));
      }
      Ae(A, _e),
        Rt(A, _e, he, { option: M }),
        !b && (!A || (!A.ctrlKey && !A.metaKey)) && Tt(A, he),
        (s === !0 || (s === 'touch' && vt.current) || (s === 'mouse' && !vt.current)) &&
          re.current.blur();
    };
  function pt(A, M) {
    if (A === -1) return -1;
    let X = A;
    for (;;) {
      if ((M === 'next' && X === G.length) || (M === 'previous' && X === -1)) return -1;
      const Y = de.querySelector(`[data-tag-index="${X}"]`);
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
  const Et = (A, M) => {
      if (!k) return;
      ve === '' && Tt(A, 'toggleInput');
      let X = le;
      le === -1
        ? ve === '' && M === 'previous' && (X = G.length - 1)
        : ((X += M === 'next' ? 1 : -1), X < 0 && (X = 0), X === G.length && (X = -1)),
        (X = pt(X, M)),
        L(X),
        Ce(X);
    },
    en = (A) => {
      (oe.current = !0), Fe(''), V && V(A, '', 'clear'), Rt(A, k ? [] : null, 'clear');
    },
    Dt = (A) => (M) => {
      if (
        (A.onKeyDown && A.onKeyDown(M),
        !M.defaultMuiPrevented &&
          (le !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(M.key) === -1 && (L(-1), Ce(-1)),
          M.which !== 229))
      )
        switch (M.key) {
          case 'Home':
            U &&
              O &&
              (M.preventDefault(),
              bt({ diff: 'start', direction: 'next', reason: 'keyboard', event: M }));
            break;
          case 'End':
            U &&
              O &&
              (M.preventDefault(),
              bt({ diff: 'end', direction: 'previous', reason: 'keyboard', event: M }));
            break;
          case 'PageUp':
            M.preventDefault(),
              bt({ diff: -Ml, direction: 'previous', reason: 'keyboard', event: M }),
              _t(M);
            break;
          case 'PageDown':
            M.preventDefault(),
              bt({ diff: Ml, direction: 'next', reason: 'keyboard', event: M }),
              _t(M);
            break;
          case 'ArrowDown':
            M.preventDefault(),
              bt({ diff: 1, direction: 'next', reason: 'keyboard', event: M }),
              _t(M);
            break;
          case 'ArrowUp':
            M.preventDefault(),
              bt({ diff: -1, direction: 'previous', reason: 'keyboard', event: M }),
              _t(M);
            break;
          case 'ArrowLeft':
            Et(M, 'previous');
            break;
          case 'ArrowRight':
            Et(M, 'next');
            break;
          case 'Enter':
            if (F.current !== -1 && U) {
              const X = fe[F.current],
                Y = E ? E(X) : !1;
              if ((M.preventDefault(), Y)) return;
              We(M, X, 'selectOption'),
                r && re.current.setSelectionRange(re.current.value.length, re.current.value.length);
            } else
              w &&
                ve !== '' &&
                we === !1 &&
                (k && M.preventDefault(), We(M, ve, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            U
              ? (M.preventDefault(), M.stopPropagation(), Tt(M, 'escape'))
              : c &&
                (ve !== '' || (k && G.length > 0)) &&
                (M.preventDefault(), M.stopPropagation(), en(M));
            break;
          case 'Backspace':
            if (k && !_ && ve === '' && G.length > 0) {
              const X = le === -1 ? G.length - 1 : le,
                Y = G.slice();
              Y.splice(X, 1), Rt(M, Y, 'removeOption', { option: G[X] });
            }
            break;
          case 'Delete':
            if (k && !_ && ve === '' && G.length > 0 && le !== -1) {
              const X = le,
                Y = G.slice();
              Y.splice(X, 1), Rt(M, Y, 'removeOption', { option: G[X] });
            }
            break;
        }
    },
    tn = (A) => {
      Pe(!0), ie && !oe.current && _t(A);
    },
    zt = (A) => {
      if (t(ce)) {
        re.current.focus();
        return;
      }
      Pe(!1),
        (ee.current = !0),
        (oe.current = !1),
        a && F.current !== -1 && U
          ? We(A, fe[F.current], 'blur')
          : a && w && ve !== ''
          ? We(A, ve, 'blur', 'freeSolo')
          : l && Ae(A, G),
        Tt(A, 'blur');
    },
    nn = (A) => {
      const M = A.target.value;
      ve !== M && (Fe(M), ye(!1), V && V(A, M, 'input')),
        M === '' ? !p && !k && Rt(A, null, 'clear') : _t(A);
    },
    pn = (A) => {
      De({
        event: A,
        index: Number(A.currentTarget.getAttribute('data-option-index')),
        reason: 'mouse',
      });
    },
    fn = (A) => {
      De({
        event: A,
        index: Number(A.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (vt.current = !0);
    },
    mt = (A) => {
      const M = Number(A.currentTarget.getAttribute('data-option-index'));
      We(A, fe[M], 'selectOption'), (vt.current = !1);
    },
    on = (A) => (M) => {
      const X = G.slice();
      X.splice(A, 1), Rt(M, X, 'removeOption', { option: G[A] });
    },
    Ve = (A) => {
      ut ? Tt(A, 'toggleInput') : _t(A);
    },
    yt = (A) => {
      A.target.getAttribute('id') !== H && A.preventDefault();
    },
    Bt = () => {
      re.current.focus(),
        W &&
          ee.current &&
          re.current.selectionEnd - re.current.selectionStart === 0 &&
          re.current.select(),
        (ee.current = !1);
    },
    T = (A) => {
      (ve === '' || !ut) && Ve(A);
    };
  let q = w && ve.length > 0;
  q = q || (k ? G.length > 0 : G !== null);
  let me = fe;
  if (m) {
    const A = new Map();
    let M = !1;
    me = fe.reduce((X, Y, he) => {
      const _e = m(Y);
      return (
        X.length > 0 && X[X.length - 1].group === _e
          ? X[X.length - 1].options.push(Y)
          : (process.env.NODE_ENV !== 'production' &&
              (A.get(_e) &&
                !M &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${u} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                (M = !0)),
              A.set(_e, !0)),
            X.push({ key: he, index: he, group: _e, options: [Y] })),
        X
      );
    }, []);
  }
  return (
    v && He && zt(),
    {
      getRootProps: (A = {}) =>
        x({ 'aria-owns': se ? `${H}-listbox` : null }, A, {
          onKeyDown: Dt(A),
          onMouseDown: yt,
          onClick: Bt,
        }),
      getInputLabelProps: () => ({ id: `${H}-label`, htmlFor: H }),
      getInputProps: () => ({
        id: H,
        value: ve,
        onBlur: zt,
        onFocus: tn,
        onChange: nn,
        onMouseDown: T,
        'aria-activedescendant': U ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': se ? `${H}-listbox` : void 0,
        'aria-expanded': se,
        autoComplete: 'off',
        ref: re,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled: v,
      }),
      getClearProps: () => ({ tabIndex: -1, onClick: en }),
      getPopupIndicatorProps: () => ({ tabIndex: -1, onClick: Ve }),
      getTagProps: ({ index: A }) =>
        x({ key: A, 'data-tag-index': A, tabIndex: -1 }, !_ && { onDelete: on(A) }),
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
        const X = (k ? G : [G]).some((he) => he != null && N(M, he)),
          Y = E ? E(M) : !1;
        return {
          key: K(M),
          tabIndex: -1,
          role: 'option',
          id: `${H}-option-${A}`,
          onMouseOver: pn,
          onClick: mt,
          onTouchStart: fn,
          'data-option-index': A,
          'aria-disabled': Y,
          'aria-selected': X,
        };
      },
      id: H,
      inputValue: ve,
      value: G,
      dirty: q,
      expanded: U && de,
      popupOpen: U,
      focused: He || le !== -1,
      anchorEl: de,
      setAnchorEl: xe,
      focusedTag: le,
      groupedOptions: me,
    }
  );
}
function Cv(e) {
  return Ue('MuiSvgIcon', e);
}
Be('MuiSvgIcon', [
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
const wv = [
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
  Sv = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      i = { root: ['root', t !== 'inherit' && `color${ue(t)}`, `fontSize${ue(o)}`] };
    return Ge(i, Cv, r);
  },
  Tv = ge('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'inherit' && t[`color${ue(o.color)}`],
        t[`fontSize${ue(o.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    var o, r, i, a, s, l, c, u, d, p, b, v, g, h, f, S, w;
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
        (b = (v = (e.vars || e).palette) == null || (g = v[t.color]) == null ? void 0 : g.main) !=
        null
          ? b
          : {
              action:
                (h = (e.vars || e).palette) == null || (f = h.action) == null ? void 0 : f.active,
              disabled:
                (S = (e.vars || e).palette) == null || (w = S.action) == null ? void 0 : w.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  Ha = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiSvgIcon' }),
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
      v = Re(r, wv),
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
    const f = Sv(g);
    return je(
      Tv,
      x(
        {
          as: l,
          className: Ee(f.root, a),
          focusable: 'false',
          color: u,
          'aria-hidden': p ? void 0 : !0,
          role: p ? 'img' : void 0,
          ref: o,
        },
        h,
        v,
        { ownerState: g, children: [i, p ? I('title', { children: p }) : null] },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ha.propTypes = {
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
Ha.muiName = 'SvgIcon';
const Al = Ha;
function To(e, t) {
  function o(r, i) {
    return I(Al, x({ 'data-testid': `${t}Icon`, ref: i }, r, { children: e }));
  }
  return (
    process.env.NODE_ENV !== 'production' && (o.displayName = `${t}Icon`),
    (o.muiName = Al.muiName),
    C.memo(C.forwardRef(o))
  );
}
var da = { exports: {} },
  it = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dl;
function Rv() {
  if (Dl) return it;
  Dl = 1;
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
      var S = f.$$typeof;
      switch (S) {
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
                  return S;
              }
          }
        case t:
          return S;
      }
    }
  }
  return (
    (it.ContextConsumer = s),
    (it.ContextProvider = a),
    (it.Element = e),
    (it.ForwardRef = c),
    (it.Fragment = o),
    (it.Lazy = b),
    (it.Memo = p),
    (it.Portal = t),
    (it.Profiler = i),
    (it.StrictMode = r),
    (it.Suspense = u),
    (it.SuspenseList = d),
    (it.isAsyncMode = function () {
      return !1;
    }),
    (it.isConcurrentMode = function () {
      return !1;
    }),
    (it.isContextConsumer = function (f) {
      return h(f) === s;
    }),
    (it.isContextProvider = function (f) {
      return h(f) === a;
    }),
    (it.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === e;
    }),
    (it.isForwardRef = function (f) {
      return h(f) === c;
    }),
    (it.isFragment = function (f) {
      return h(f) === o;
    }),
    (it.isLazy = function (f) {
      return h(f) === b;
    }),
    (it.isMemo = function (f) {
      return h(f) === p;
    }),
    (it.isPortal = function (f) {
      return h(f) === t;
    }),
    (it.isProfiler = function (f) {
      return h(f) === i;
    }),
    (it.isStrictMode = function (f) {
      return h(f) === r;
    }),
    (it.isSuspense = function (f) {
      return h(f) === u;
    }),
    (it.isSuspenseList = function (f) {
      return h(f) === d;
    }),
    (it.isValidElementType = function (f) {
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
    (it.typeOf = h),
    it
  );
}
var at = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ll;
function Ov() {
  return (
    Ll ||
      ((Ll = 1),
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
            S = !1,
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
              S ||
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
                  F.$$typeof === c ||
                  F.$$typeof === E ||
                  F.getModuleId !== void 0))
            );
          }
          function m(F) {
            if (typeof F == 'object' && F !== null) {
              var G = F.$$typeof;
              switch (G) {
                case e:
                  var Le = F.type;
                  switch (Le) {
                    case o:
                    case i:
                    case r:
                    case u:
                    case d:
                      return Le;
                    default:
                      var ve = Le && Le.$$typeof;
                      switch (ve) {
                        case l:
                        case s:
                        case c:
                        case b:
                        case p:
                        case a:
                          return ve;
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
            z = p,
            j = t,
            P = i,
            V = r,
            B = u,
            Q = d,
            ie = !1,
            Z = !1;
          function _(F) {
            return (
              ie ||
                ((ie = !0),
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
          function ne(F) {
            return m(F) === s;
          }
          function H(F) {
            return m(F) === a;
          }
          function K(F) {
            return typeof F == 'object' && F !== null && F.$$typeof === e;
          }
          function oe(F) {
            return m(F) === c;
          }
          function ee(F) {
            return m(F) === o;
          }
          function re(F) {
            return m(F) === b;
          }
          function ce(F) {
            return m(F) === p;
          }
          function de(F) {
            return m(F) === t;
          }
          function xe(F) {
            return m(F) === i;
          }
          function le(F) {
            return m(F) === r;
          }
          function L(F) {
            return m(F) === u;
          }
          function Te(F) {
            return m(F) === d;
          }
          (at.ContextConsumer = O),
            (at.ContextProvider = R),
            (at.Element = D),
            (at.ForwardRef = $),
            (at.Fragment = N),
            (at.Lazy = k),
            (at.Memo = z),
            (at.Portal = j),
            (at.Profiler = P),
            (at.StrictMode = V),
            (at.Suspense = B),
            (at.SuspenseList = Q),
            (at.isAsyncMode = _),
            (at.isConcurrentMode = W),
            (at.isContextConsumer = ne),
            (at.isContextProvider = H),
            (at.isElement = K),
            (at.isForwardRef = oe),
            (at.isFragment = ee),
            (at.isLazy = re),
            (at.isMemo = ce),
            (at.isPortal = de),
            (at.isProfiler = xe),
            (at.isStrictMode = le),
            (at.isSuspense = L),
            (at.isSuspenseList = Te),
            (at.isValidElementType = y),
            (at.typeOf = m);
        })()),
    at
  );
}
process.env.NODE_ENV === 'production' ? (da.exports = Rv()) : (da.exports = Ov());
var qa = da.exports;
function pa(e, t) {
  return (
    (pa = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    pa(e, t)
  );
}
function Cu(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), pa(e, t);
}
const Fl = { disabled: !1 };
var kv =
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
const Ur = te.createContext(null);
var Nv = function (t) {
    return t.scrollTop;
  },
  zo = 'unmounted',
  Wn = 'exited',
  Un = 'entering',
  co = 'entered',
  fa = 'exiting',
  In = (function (e) {
    Cu(t, e);
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
            ? ((c = Wn), (a.appearStatus = Un))
            : (c = co)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = zo)
          : (c = Wn),
        (a.state = { status: c }),
        (a.nextCallback = null),
        a
      );
    }
    t.getDerivedStateFromProps = function (i, a) {
      var s = i.in;
      return s && a.status === zo ? { status: Wn } : null;
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
          this.props.in ? s !== Un && s !== co && (a = Un) : (s === Un || s === co) && (a = fa);
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
          if ((this.cancelNextCallback(), a === Un)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : Pn.findDOMNode(this);
              s && Nv(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else this.props.unmountOnExit && this.state.status === Wn && this.setState({ status: zo });
      }),
      (o.performEnter = function (i) {
        var a = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [l] : [Pn.findDOMNode(this), l],
          u = c[0],
          d = c[1],
          p = this.getTimeouts(),
          b = l ? p.appear : p.enter;
        if ((!i && !s) || Fl.disabled) {
          this.safeSetState({ status: co }, function () {
            a.props.onEntered(u);
          });
          return;
        }
        this.props.onEnter(u, d),
          this.safeSetState({ status: Un }, function () {
            a.props.onEntering(u, d),
              a.onTransitionEnd(b, function () {
                a.safeSetState({ status: co }, function () {
                  a.props.onEntered(u, d);
                });
              });
          });
      }),
      (o.performExit = function () {
        var i = this,
          a = this.props.exit,
          s = this.getTimeouts(),
          l = this.props.nodeRef ? void 0 : Pn.findDOMNode(this);
        if (!a || Fl.disabled) {
          this.safeSetState({ status: Wn }, function () {
            i.props.onExited(l);
          });
          return;
        }
        this.props.onExit(l),
          this.safeSetState({ status: fa }, function () {
            i.props.onExiting(l),
              i.onTransitionEnd(s.exit, function () {
                i.safeSetState({ status: Wn }, function () {
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : Pn.findDOMNode(this),
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
        if (i === zo) return null;
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
        var l = Re(a, [
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
        return te.createElement(
          Ur.Provider,
          { value: null },
          typeof s == 'function' ? s(i, l) : te.cloneElement(te.Children.only(s), l),
        );
      }),
      t
    );
  })(te.Component);
In.contextType = Ur;
In.propTypes =
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
          var o = kv;
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
function so() {}
In.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: so,
  onEntering: so,
  onEntered: so,
  onExit: so,
  onExiting: so,
  onExited: so,
};
In.UNMOUNTED = zo;
In.EXITED = Wn;
In.ENTERING = Un;
In.ENTERED = co;
In.EXITING = fa;
const wu = In;
function $v(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ka(e, t) {
  var o = function (a) {
      return t && te.isValidElement(a) ? t(a) : a;
    },
    r = Object.create(null);
  return (
    e &&
      te.Children.map(e, function (i) {
        return i;
      }).forEach(function (i) {
        r[i.key] = o(i);
      }),
    r
  );
}
function Pv(e, t) {
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
function Yn(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function Iv(e, t) {
  return Ka(e.children, function (o) {
    return te.cloneElement(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: Yn(o, 'appear', e),
      enter: Yn(o, 'enter', e),
      exit: Yn(o, 'exit', e),
    });
  });
}
function _v(e, t, o) {
  var r = Ka(e.children),
    i = Pv(t, r);
  return (
    Object.keys(i).forEach(function (a) {
      var s = i[a];
      if (te.isValidElement(s)) {
        var l = a in t,
          c = a in r,
          u = t[a],
          d = te.isValidElement(u) && !u.props.in;
        c && (!l || d)
          ? (i[a] = te.cloneElement(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: Yn(s, 'exit', e),
              enter: Yn(s, 'enter', e),
            }))
          : !c && l && !d
          ? (i[a] = te.cloneElement(s, { in: !1 }))
          : c &&
            l &&
            te.isValidElement(u) &&
            (i[a] = te.cloneElement(s, {
              onExited: o.bind(null, s),
              in: u.props.in,
              exit: Yn(s, 'exit', e),
              enter: Yn(s, 'enter', e),
            }));
      }
    }),
    i
  );
}
var Mv =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  Av = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  Ya = (function (e) {
    Cu(t, e);
    function t(r, i) {
      var a;
      a = e.call(this, r, i) || this;
      var s = a.handleExited.bind($v(a));
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
        return { children: c ? Iv(i, l) : _v(i, s, l), firstRender: !1 };
      }),
      (o.handleExited = function (i, a) {
        var s = Ka(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(a),
          this.mounted &&
            this.setState(function (l) {
              var c = x({}, l.children);
              return delete c[i.key], { children: c };
            }));
      }),
      (o.render = function () {
        var i = this.props,
          a = i.component,
          s = i.childFactory,
          l = Re(i, ['component', 'childFactory']),
          c = this.state.contextValue,
          u = Mv(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          a === null
            ? te.createElement(Ur.Provider, { value: c }, u)
            : te.createElement(Ur.Provider, { value: c }, te.createElement(a, l, u))
        );
      }),
      t
    );
  })(te.Component);
Ya.propTypes =
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
Ya.defaultProps = Av;
const Dv = Ya,
  Su = (e) => e.scrollTop;
function Hr(e, t) {
  var o, r;
  const { timeout: i, easing: a, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof i == 'number' ? i : i[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == 'object' ? a[t.mode] : a,
    delay: s.transitionDelay,
  };
}
function Lv(e) {
  return Ue('MuiPaper', e);
}
Be('MuiPaper', [
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
const Fv = ['className', 'component', 'elevation', 'square', 'variant'],
  jv = (e) => {
    const { square: t, elevation: o, variant: r, classes: i } = e,
      a = { root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`] };
    return Ge(a, Lv, i);
  },
  zv = ge('div', {
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
      !t.square && { borderRadius: e.shape.borderRadius },
      t.variant === 'outlined' && { border: `1px solid ${(e.vars || e).palette.divider}` },
      t.variant === 'elevation' &&
        x(
          { boxShadow: (e.vars || e).shadows[t.elevation] },
          !e.vars &&
            e.palette.mode === 'dark' && {
              backgroundImage: `linear-gradient(${lt('#fff', ml(t.elevation))}, ${lt(
                '#fff',
                ml(t.elevation),
              )})`,
            },
          e.vars && { backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation] },
        ),
    );
  }),
  Tu = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiPaper' }),
      {
        className: i,
        component: a = 'div',
        elevation: s = 1,
        square: l = !1,
        variant: c = 'elevation',
      } = r,
      u = Re(r, Fv),
      d = x({}, r, { component: a, elevation: s, square: l, variant: c }),
      p = jv(d);
    return (
      process.env.NODE_ENV !== 'production' &&
        So().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      I(zv, x({ as: a, ownerState: d, className: Ee(p.root, i), ref: o }, u))
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Tu.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    elevation: vn(Ea, (e) => {
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
const lr = Tu;
function Ru(e) {
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
    b = Ee(t, o.ripple, o.rippleVisible, r && o.ripplePulsate),
    v = { width: s, height: s, top: -(s / 2) + a, left: -(s / 2) + i },
    g = Ee(o.child, d && o.childLeaving, r && o.childPulsate);
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
    I('span', { className: b, style: v, children: I('span', { className: g }) })
  );
}
process.env.NODE_ENV !== 'production' &&
  (Ru.propTypes = {
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
const Vv = Be('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  an = Vv,
  Bv = ['center', 'classes', 'className'];
let gi = (e) => e,
  jl,
  zl,
  Vl,
  Bl;
const ma = 550,
  Wv = 80,
  Uv = Pa(
    jl ||
      (jl = gi`
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
  Hv = Pa(
    zl ||
      (zl = gi`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  qv = Pa(
    Vl ||
      (Vl = gi`
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
  Kv = ge('span', { name: 'MuiTouchRipple', slot: 'Root' })({
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
  Yv = ge(Ru, { name: 'MuiTouchRipple', slot: 'Ripple' })(
    Bl ||
      (Bl = gi`
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
    Uv,
    ma,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    an.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    an.child,
    an.childLeaving,
    Hv,
    ma,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    an.childPulsate,
    qv,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  Ou = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiTouchRipple' }),
      { center: i = !1, classes: a = {}, className: s } = r,
      l = Re(r, Bv),
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
            I(
              Yv,
              {
                classes: {
                  ripple: Ee(a.ripple, an.ripple),
                  rippleVisible: Ee(a.rippleVisible, an.rippleVisible),
                  ripplePulsate: Ee(a.ripplePulsate, an.ripplePulsate),
                  child: Ee(a.child, an.child),
                  childLeaving: Ee(a.childLeaving, an.childLeaving),
                  childPulsate: Ee(a.childPulsate, an.childPulsate),
                },
                timeout: ma,
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
      S = C.useCallback(
        (y = {}, m = {}, O = () => {}) => {
          const { pulsate: R = !1, center: D = i || m.pulsate, fakeElement: $ = !1 } = m;
          if ((y == null ? void 0 : y.type) === 'mousedown' && b.current) {
            b.current = !1;
            return;
          }
          (y == null ? void 0 : y.type) === 'touchstart' && (b.current = !0);
          const N = $ ? null : h.current,
            k = N ? N.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
          let z, j, P;
          if (
            D ||
            y === void 0 ||
            (y.clientX === 0 && y.clientY === 0) ||
            (!y.clientX && !y.touches)
          )
            (z = Math.round(k.width / 2)), (j = Math.round(k.height / 2));
          else {
            const { clientX: V, clientY: B } = y.touches && y.touches.length > 0 ? y.touches[0] : y;
            (z = Math.round(V - k.left)), (j = Math.round(B - k.top));
          }
          if (D) (P = Math.sqrt((2 * k.width ** 2 + k.height ** 2) / 3)), P % 2 === 0 && (P += 1);
          else {
            const V = Math.max(Math.abs((N ? N.clientWidth : 0) - z), z) * 2 + 2,
              B = Math.max(Math.abs((N ? N.clientHeight : 0) - j), j) * 2 + 2;
            P = Math.sqrt(V ** 2 + B ** 2);
          }
          y != null && y.touches
            ? g.current === null &&
              ((g.current = () => {
                f({ pulsate: R, rippleX: z, rippleY: j, rippleSize: P, cb: O });
              }),
              (v.current = setTimeout(() => {
                g.current && (g.current(), (g.current = null));
              }, Wv)))
            : f({ pulsate: R, rippleX: z, rippleY: j, rippleSize: P, cb: O });
        },
        [i, f],
      ),
      w = C.useCallback(() => {
        S({}, { pulsate: !0 });
      }, [S]),
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
      C.useImperativeHandle(o, () => ({ pulsate: w, start: S, stop: E }), [w, S, E]),
      I(
        Kv,
        x({ className: Ee(an.root, a.root, s), ref: h }, l, {
          children: I(Dv, { component: null, exit: !0, children: c }),
        }),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ou.propTypes = { center: n.bool, classes: n.object, className: n.string });
const Gv = Ou;
function Xv(e) {
  return Ue('MuiButtonBase', e);
}
const Jv = Be('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  Zv = Jv,
  Qv = [
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
  ey = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: i } = e,
      s = Ge({ root: ['root', t && 'disabled', o && 'focusVisible'] }, Xv, i);
    return o && r && (s.root += ` ${r}`), s;
  },
  ty = ge('button', { name: 'MuiButtonBase', slot: 'Root', overridesResolver: (e, t) => t.root })({
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
    [`&.${Zv.disabled}`]: { pointerEvents: 'none', cursor: 'default' },
    '@media print': { colorAdjust: 'exact' },
  }),
  ku = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiButtonBase' }),
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
        onDragLeave: S,
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
        tabIndex: z = 0,
        TouchRippleProps: j,
        touchRippleRef: P,
        type: V,
      } = r,
      B = Re(r, Qv),
      Q = C.useRef(null),
      ie = C.useRef(null),
      Z = Ot(ie, P),
      { isFocusVisibleRef: _, onFocus: W, onBlur: ne, ref: H } = Ic(),
      [K, oe] = C.useState(!1);
    u && K && oe(!1),
      C.useImperativeHandle(
        i,
        () => ({
          focusVisible: () => {
            oe(!0), Q.current.focus();
          },
        }),
        [],
      );
    const [ee, re] = C.useState(!1);
    C.useEffect(() => {
      re(!0);
    }, []);
    const ce = ee && !d && !u;
    C.useEffect(() => {
      K && b && !d && ee && ie.current.pulsate();
    }, [d, b, K, ee]);
    function de(pe, se, Ce = p) {
      return jt((Se) => (se && se(Se), !Ce && ie.current && ie.current[pe](Se), !0));
    }
    const xe = de('start', O),
      le = de('stop', f),
      L = de('stop', S),
      Te = de('stop', D),
      F = de('stop', (pe) => {
        K && pe.preventDefault(), R && R(pe);
      }),
      G = de('start', k),
      Le = de('stop', $),
      ve = de('stop', N),
      Fe = de(
        'stop',
        (pe) => {
          ne(pe), _.current === !1 && oe(!1), g && g(pe);
        },
        !1,
      ),
      He = jt((pe) => {
        Q.current || (Q.current = pe.currentTarget),
          W(pe),
          _.current === !0 && (oe(!0), E && E(pe)),
          w && w(pe);
      }),
      Pe = () => {
        const pe = Q.current;
        return c && c !== 'button' && !(pe.tagName === 'A' && pe.href);
      },
      Ae = C.useRef(!1),
      ut = jt((pe) => {
        b &&
          !Ae.current &&
          K &&
          ie.current &&
          pe.key === ' ' &&
          ((Ae.current = !0),
          ie.current.stop(pe, () => {
            ie.current.start(pe);
          })),
          pe.target === pe.currentTarget && Pe() && pe.key === ' ' && pe.preventDefault(),
          y && y(pe),
          pe.target === pe.currentTarget &&
            Pe() &&
            pe.key === 'Enter' &&
            !u &&
            (pe.preventDefault(), h && h(pe));
      }),
      ht = jt((pe) => {
        b &&
          pe.key === ' ' &&
          ie.current &&
          K &&
          !pe.defaultPrevented &&
          ((Ae.current = !1),
          ie.current.stop(pe, () => {
            ie.current.pulsate(pe);
          })),
          m && m(pe),
          h &&
            pe.target === pe.currentTarget &&
            Pe() &&
            pe.key === ' ' &&
            !pe.defaultPrevented &&
            h(pe);
      });
    let ae = c;
    ae === 'button' && (B.href || B.to) && (ae = v);
    const ye = {};
    ae === 'button'
      ? ((ye.type = V === void 0 ? 'button' : V), (ye.disabled = u))
      : (!B.href && !B.to && (ye.role = 'button'), u && (ye['aria-disabled'] = u));
    const we = Ot(o, H, Q);
    process.env.NODE_ENV !== 'production' &&
      C.useEffect(() => {
        ce &&
          !ie.current &&
          console.error(
            [
              'MUI: The `component` prop provided to ButtonBase is invalid.',
              'Please make sure the children prop is rendered in this custom component.',
            ].join(`
`),
          );
      }, [ce]);
    const U = x({}, r, {
        centerRipple: a,
        component: c,
        disabled: u,
        disableRipple: d,
        disableTouchRipple: p,
        focusRipple: b,
        tabIndex: z,
        focusVisible: K,
      }),
      fe = ey(U);
    return je(
      ty,
      x(
        {
          as: ae,
          className: Ee(fe.root, l),
          ownerState: U,
          onBlur: Fe,
          onClick: h,
          onContextMenu: le,
          onFocus: He,
          onKeyDown: ut,
          onKeyUp: ht,
          onMouseDown: xe,
          onMouseLeave: F,
          onMouseUp: Te,
          onDragLeave: L,
          onTouchEnd: Le,
          onTouchMove: ve,
          onTouchStart: G,
          ref: we,
          tabIndex: u ? -1 : z,
          type: V,
        },
        ye,
        B,
        { children: [s, ce ? I(Gv, x({ ref: Z, center: a }, j)) : null] },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ku.propTypes = {
    action: qt,
    centerRipple: n.bool,
    children: n.node,
    classes: n.object,
    className: n.string,
    component: ya,
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
const xo = ku;
function ny(e) {
  return Ue('MuiIconButton', e);
}
const oy = Be('MuiIconButton', [
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
  ry = oy,
  iy = ['edge', 'children', 'className', 'color', 'disabled', 'disableFocusRipple', 'size'],
  ay = (e) => {
    const { classes: t, disabled: o, color: r, edge: i, size: a } = e,
      s = {
        root: [
          'root',
          o && 'disabled',
          r !== 'default' && `color${ue(r)}`,
          i && `edge${ue(i)}`,
          `size${ue(a)}`,
        ],
      };
    return Ge(s, ny, t);
  },
  sy = ge(xo, {
    name: 'MuiIconButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${ue(o.color)}`],
        o.edge && t[`edge${ue(o.edge)}`],
        t[`size${ue(o.size)}`],
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
          color: (e.vars || e).palette.action.active,
          transition: e.transitions.create('background-color', {
            duration: e.transitions.duration.shortest,
          }),
        },
        !t.disableRipple && {
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
              : lt(e.palette.action.active, e.palette.action.hoverOpacity),
            '@media (hover: none)': { backgroundColor: 'transparent' },
          },
        },
        t.edge === 'start' && { marginLeft: t.size === 'small' ? -3 : -12 },
        t.edge === 'end' && { marginRight: t.size === 'small' ? -3 : -12 },
      ),
    ({ theme: e, ownerState: t }) => {
      var o;
      const r = (o = (e.vars || e).palette) == null ? void 0 : o[t.color];
      return x(
        {},
        t.color === 'inherit' && { color: 'inherit' },
        t.color !== 'inherit' &&
          t.color !== 'default' &&
          x(
            { color: r == null ? void 0 : r.main },
            !t.disableRipple && {
              '&:hover': x(
                {},
                r && {
                  backgroundColor: e.vars
                    ? `rgba(${r.mainChannel} / ${e.vars.palette.action.hoverOpacity})`
                    : lt(r.main, e.palette.action.hoverOpacity),
                },
                { '@media (hover: none)': { backgroundColor: 'transparent' } },
              ),
            },
          ),
        t.size === 'small' && { padding: 5, fontSize: e.typography.pxToRem(18) },
        t.size === 'large' && { padding: 12, fontSize: e.typography.pxToRem(28) },
        {
          [`&.${ry.disabled}`]: {
            backgroundColor: 'transparent',
            color: (e.vars || e).palette.action.disabled,
          },
        },
      );
    },
  ),
  Nu = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiIconButton' }),
      {
        edge: i = !1,
        children: a,
        className: s,
        color: l = 'default',
        disabled: c = !1,
        disableFocusRipple: u = !1,
        size: d = 'medium',
      } = r,
      p = Re(r, iy),
      b = x({}, r, { edge: i, color: l, disabled: c, disableFocusRipple: u, size: d }),
      v = ay(b);
    return I(
      sy,
      x(
        {
          className: Ee(v.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: c,
          ref: o,
          ownerState: b,
        },
        p,
        { children: a },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Nu.propTypes = {
    children: vn(n.node, (e) =>
      C.Children.toArray(e.children).some((o) => C.isValidElement(o) && o.props.onClick)
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
const $u = Nu,
  ly = To(
    I('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  ),
  cy = ['components', 'componentsProps', 'slots', 'slotProps'],
  uy = ge(Yg, { name: 'MuiPopper', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  Pu = C.forwardRef(function (t, o) {
    var r;
    const i = ou(),
      a = Je({ props: t, name: 'MuiPopper' }),
      { components: s, componentsProps: l, slots: c, slotProps: u } = a,
      d = Re(a, cy),
      p = (r = c == null ? void 0 : c.root) != null ? r : s == null ? void 0 : s.Root;
    return I(
      uy,
      x({ direction: i == null ? void 0 : i.direction, slots: { root: p }, slotProps: u ?? l }, d, {
        ref: o,
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Pu.propTypes = {
    anchorEl: n.oneOfType([Rn, n.object, n.func]),
    children: n.oneOfType([n.node, n.func]),
    component: n.elementType,
    components: n.shape({ Root: n.elementType }),
    componentsProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    container: n.oneOfType([Rn, n.func]),
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
    popperRef: qt,
    slotProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    slots: n.shape({ root: n.elementType }),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    transition: n.bool,
  });
const Iu = Pu;
function dy(e) {
  return Ue('MuiListSubheader', e);
}
Be('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const py = ['className', 'color', 'component', 'disableGutters', 'disableSticky', 'inset'],
  fy = (e) => {
    const { classes: t, color: o, disableGutters: r, inset: i, disableSticky: a } = e,
      s = {
        root: [
          'root',
          o !== 'default' && `color${ue(o)}`,
          !r && 'gutters',
          i && 'inset',
          !a && 'sticky',
        ],
      };
    return Ge(s, dy, t);
  },
  my = ge('li', {
    name: 'MuiListSubheader',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${ue(o.color)}`],
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
  Ga = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiListSubheader' }),
      {
        className: i,
        color: a = 'default',
        component: s = 'li',
        disableGutters: l = !1,
        disableSticky: c = !1,
        inset: u = !1,
      } = r,
      d = Re(r, py),
      p = x({}, r, { color: a, component: s, disableGutters: l, disableSticky: c, inset: u }),
      b = fy(p);
    return I(my, x({ as: s, className: Ee(b.root, i), ref: o, ownerState: p }, d));
  });
Ga.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (Ga.propTypes = {
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
const hy = Ga,
  by = To(
    I('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function gy(e) {
  return Ue('MuiChip', e);
}
const vy = Be('MuiChip', [
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
  Ye = vy,
  yy = [
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
  xy = (e) => {
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
          `size${ue(r)}`,
          `color${ue(i)}`,
          l && 'clickable',
          l && `clickableColor${ue(i)}`,
          s && 'deletable',
          s && `deletableColor${ue(i)}`,
          `${c}${ue(i)}`,
        ],
        label: ['label', `label${ue(r)}`],
        avatar: ['avatar', `avatar${ue(r)}`, `avatarColor${ue(i)}`],
        icon: ['icon', `icon${ue(r)}`, `iconColor${ue(a)}`],
        deleteIcon: [
          'deleteIcon',
          `deleteIcon${ue(r)}`,
          `deleteIconColor${ue(i)}`,
          `deleteIcon${ue(c)}Color${ue(i)}`,
        ],
      };
    return Ge(u, gy, t);
  },
  Ey = ge('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: i, clickable: a, onDelete: s, size: l, variant: c } = o;
      return [
        { [`& .${Ye.avatar}`]: t.avatar },
        { [`& .${Ye.avatar}`]: t[`avatar${ue(l)}`] },
        { [`& .${Ye.avatar}`]: t[`avatarColor${ue(r)}`] },
        { [`& .${Ye.icon}`]: t.icon },
        { [`& .${Ye.icon}`]: t[`icon${ue(l)}`] },
        { [`& .${Ye.icon}`]: t[`iconColor${ue(i)}`] },
        { [`& .${Ye.deleteIcon}`]: t.deleteIcon },
        { [`& .${Ye.deleteIcon}`]: t[`deleteIcon${ue(l)}`] },
        { [`& .${Ye.deleteIcon}`]: t[`deleteIconColor${ue(r)}`] },
        { [`& .${Ye.deleteIcon}`]: t[`deleteIcon${ue(c)}Color${ue(r)}`] },
        t.root,
        t[`size${ue(l)}`],
        t[`color${ue(r)}`],
        a && t.clickable,
        a && r !== 'default' && t[`clickableColor${ue(r)})`],
        s && t.deletable,
        s && r !== 'default' && t[`deletableColor${ue(r)}`],
        t[c],
        t[`${c}${ue(r)}`],
      ];
    },
  })(
    ({ theme: e, ownerState: t }) => {
      const o = lt(e.palette.text.primary, 0.26),
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
          cursor: 'default',
          outline: 0,
          textDecoration: 'none',
          border: 0,
          padding: 0,
          verticalAlign: 'middle',
          boxSizing: 'border-box',
          [`&.${Ye.disabled}`]: {
            opacity: (e.vars || e).palette.action.disabledOpacity,
            pointerEvents: 'none',
          },
          [`& .${Ye.avatar}`]: {
            marginLeft: 5,
            marginRight: -6,
            width: 24,
            height: 24,
            color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : r,
            fontSize: e.typography.pxToRem(12),
          },
          [`& .${Ye.avatarColorPrimary}`]: {
            color: (e.vars || e).palette.primary.contrastText,
            backgroundColor: (e.vars || e).palette.primary.dark,
          },
          [`& .${Ye.avatarColorSecondary}`]: {
            color: (e.vars || e).palette.secondary.contrastText,
            backgroundColor: (e.vars || e).palette.secondary.dark,
          },
          [`& .${Ye.avatarSmall}`]: {
            marginLeft: 4,
            marginRight: -4,
            width: 18,
            height: 18,
            fontSize: e.typography.pxToRem(10),
          },
          [`& .${Ye.icon}`]: x(
            { marginLeft: 5, marginRight: -6 },
            t.size === 'small' && { fontSize: 18, marginLeft: 4, marginRight: -4 },
            t.iconColor === t.color &&
              x(
                { color: e.vars ? e.vars.palette.Chip.defaultIconColor : r },
                t.color !== 'default' && { color: 'inherit' },
              ),
          ),
          [`& .${Ye.deleteIcon}`]: x(
            {
              WebkitTapHighlightColor: 'transparent',
              color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.26)` : o,
              fontSize: 22,
              cursor: 'pointer',
              margin: '0 5px 0 -6px',
              '&:hover': {
                color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.4)` : lt(o, 0.4),
              },
            },
            t.size === 'small' && { fontSize: 16, marginRight: 4, marginLeft: -4 },
            t.color !== 'default' && {
              color: e.vars
                ? `rgba(${e.vars.palette[t.color].contrastTextChannel} / 0.7)`
                : lt(e.palette[t.color].contrastText, 0.7),
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
          [`&.${Ye.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : lt(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        t.onDelete &&
          t.color !== 'default' && {
            [`&.${Ye.focusVisible}`]: { backgroundColor: (e.vars || e).palette[t.color].dark },
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
              : lt(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
                ),
          },
          [`&.${Ye.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : lt(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
          '&:active': { boxShadow: (e.vars || e).shadows[1] },
        },
        t.clickable &&
          t.color !== 'default' && {
            [`&:hover, &.${Ye.focusVisible}`]: {
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
          [`&.${Ye.clickable}:hover`]: { backgroundColor: (e.vars || e).palette.action.hover },
          [`&.${Ye.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
          [`& .${Ye.avatar}`]: { marginLeft: 4 },
          [`& .${Ye.avatarSmall}`]: { marginLeft: 2 },
          [`& .${Ye.icon}`]: { marginLeft: 4 },
          [`& .${Ye.iconSmall}`]: { marginLeft: 2 },
          [`& .${Ye.deleteIcon}`]: { marginRight: 5 },
          [`& .${Ye.deleteIconSmall}`]: { marginRight: 3 },
        },
        t.variant === 'outlined' &&
          t.color !== 'default' && {
            color: (e.vars || e).palette[t.color].main,
            border: `1px solid ${
              e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : lt(e.palette[t.color].main, 0.7)
            }`,
            [`&.${Ye.clickable}:hover`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : lt(e.palette[t.color].main, e.palette.action.hoverOpacity),
            },
            [`&.${Ye.focusVisible}`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.focusOpacity
                  })`
                : lt(e.palette[t.color].main, e.palette.action.focusOpacity),
            },
            [`& .${Ye.deleteIcon}`]: {
              color: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : lt(e.palette[t.color].main, 0.7),
              '&:hover, &:active': { color: (e.vars || e).palette[t.color].main },
            },
          },
      ),
  ),
  Cy = ge('span', {
    name: 'MuiChip',
    slot: 'Label',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { size: r } = o;
      return [t.label, t[`label${ue(r)}`]];
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
      e.size === 'small' && { paddingLeft: 8, paddingRight: 8 },
    ),
  );
function Wl(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const _u = C.forwardRef(function (t, o) {
  const r = Je({ props: t, name: 'MuiChip' }),
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
      size: S = 'medium',
      variant: w = 'filled',
      tabIndex: E,
      skipFocusWhenDisabled: y = !1,
    } = r,
    m = Re(r, yy),
    O = C.useRef(null),
    R = Ot(O, o),
    D = (Z) => {
      Z.stopPropagation(), g && g(Z);
    },
    $ = (Z) => {
      Z.currentTarget === Z.target && Wl(Z) && Z.preventDefault(), h && h(Z);
    },
    N = (Z) => {
      Z.currentTarget === Z.target &&
        (g && Wl(Z) ? g(Z) : Z.key === 'Escape' && O.current && O.current.blur()),
        f && f(Z);
    },
    k = s !== !1 && v ? !0 : s,
    z = k || g ? xo : c || 'div',
    j = x({}, r, {
      component: z,
      disabled: d,
      size: S,
      color: l,
      iconColor: (C.isValidElement(p) && p.props.color) || l,
      onDelete: !!g,
      clickable: k,
      variant: w,
    }),
    P = xy(j),
    V =
      z === xo
        ? x(
            { component: c || 'div', focusVisibleClassName: P.focusVisible },
            g && { disableRipple: !0 },
          )
        : {};
  let B = null;
  g &&
    (B =
      u && C.isValidElement(u)
        ? C.cloneElement(u, { className: Ee(u.props.className, P.deleteIcon), onClick: D })
        : I(by, { className: Ee(P.deleteIcon), onClick: D }));
  let Q = null;
  i &&
    C.isValidElement(i) &&
    (Q = C.cloneElement(i, { className: Ee(P.avatar, i.props.className) }));
  let ie = null;
  return (
    p &&
      C.isValidElement(p) &&
      (ie = C.cloneElement(p, { className: Ee(P.icon, p.props.className) })),
    process.env.NODE_ENV !== 'production' &&
      Q &&
      ie &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    je(
      Ey,
      x(
        {
          as: z,
          className: Ee(P.root, a),
          disabled: k && d ? !0 : void 0,
          onClick: v,
          onKeyDown: $,
          onKeyUp: N,
          ref: R,
          tabIndex: y && d ? -1 : E,
          ownerState: j,
        },
        V,
        m,
        { children: [Q || ie, I(Cy, { className: Ee(P.label), ownerState: j, children: b }), B] },
      ),
    )
  );
});
process.env.NODE_ENV !== 'production' &&
  (_u.propTypes = {
    avatar: n.element,
    children: Hp,
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
const wy = _u;
function Ro({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, i) => ((r[i] = e[i]), o && typeof e[i] > 'u' && (r[i] = o[i]), r), {});
}
const Mu = C.createContext(void 0);
process.env.NODE_ENV !== 'production' && (Mu.displayName = 'FormControlContext');
const Xa = Mu;
function eo() {
  return C.useContext(Xa);
}
function Au(e) {
  return I(Jc, x({}, e, { defaultTheme: fi }));
}
process.env.NODE_ENV !== 'production' &&
  (Au.propTypes = {
    styles: n.oneOfType([
      n.func,
      n.number,
      n.object,
      n.shape({ __emotion_styles: n.any.isRequired }),
      n.string,
      n.bool,
    ]),
  });
function Ul(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function Ja(e, t = !1) {
  return (
    e && ((Ul(e.value) && e.value !== '') || (t && Ul(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Sy(e) {
  return e.startAdornment;
}
function Ty(e) {
  return Ue('MuiInputBase', e);
}
const Ry = Be('MuiInputBase', [
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
  Yt = Ry,
  Oy = [
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
  yi = (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      o.formControl && t.formControl,
      o.startAdornment && t.adornedStart,
      o.endAdornment && t.adornedEnd,
      o.error && t.error,
      o.size === 'small' && t.sizeSmall,
      o.multiline && t.multiline,
      o.color && t[`color${ue(o.color)}`],
      o.fullWidth && t.fullWidth,
      o.hiddenLabel && t.hiddenLabel,
    ];
  },
  xi = (e, t) => {
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
  ky = (e) => {
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
          `color${ue(o)}`,
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
    return Ge(h, Ty, t);
  },
  Ei = ge('div', { name: 'MuiInputBase', slot: 'Root', overridesResolver: yi })(
    ({ theme: e, ownerState: t }) =>
      x(
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
          [`&.${Yt.disabled}`]: { color: (e.vars || e).palette.text.disabled, cursor: 'default' },
        },
        t.multiline && x({ padding: '4px 0 5px' }, t.size === 'small' && { paddingTop: 1 }),
        t.fullWidth && { width: '100%' },
      ),
  ),
  Ci = ge('input', { name: 'MuiInputBase', slot: 'Input', overridesResolver: xi })(
    ({ theme: e, ownerState: t }) => {
      const o = e.palette.mode === 'light',
        r = x(
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
          [`label[data-shrink=false] + .${Yt.formControl} &`]: {
            '&::-webkit-input-placeholder': i,
            '&::-moz-placeholder': i,
            '&:-ms-input-placeholder': i,
            '&::-ms-input-placeholder': i,
            '&:focus::-webkit-input-placeholder': a,
            '&:focus::-moz-placeholder': a,
            '&:focus:-ms-input-placeholder': a,
            '&:focus::-ms-input-placeholder': a,
          },
          [`&.${Yt.disabled}`]: {
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
  Ny = I(Au, {
    styles: {
      '@keyframes mui-auto-fill': { from: { display: 'block' } },
      '@keyframes mui-auto-fill-cancel': { from: { display: 'block' } },
    },
  }),
  Du = C.forwardRef(function (t, o) {
    var r;
    const i = Je({ props: t, name: 'MuiInputBase' }),
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
        inputComponent: S = 'input',
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
        onKeyDown: z,
        onKeyUp: j,
        placeholder: P,
        readOnly: V,
        renderSuffix: B,
        rows: Q,
        slotProps: ie = {},
        slots: Z = {},
        startAdornment: _,
        type: W = 'text',
        value: ne,
      } = i,
      H = Re(i, Oy),
      K = w.value != null ? w.value : ne,
      { current: oe } = C.useRef(K != null),
      ee = C.useRef(),
      re = C.useCallback((fe) => {
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
      ce = Ot(ee, E, w.ref, re),
      [de, xe] = C.useState(!1),
      le = eo();
    process.env.NODE_ENV !== 'production' &&
      C.useEffect(() => {
        if (le) return le.registerEffect();
      }, [le]);
    const L = Ro({
      props: i,
      muiFormControl: le,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (L.focused = le ? le.focused : de),
      C.useEffect(() => {
        !le && b && de && (xe(!1), D && D());
      }, [le, b, de, D]);
    const Te = le && le.onFilled,
      F = le && le.onEmpty,
      G = C.useCallback(
        (fe) => {
          Ja(fe) ? Te && Te() : F && F();
        },
        [Te, F],
      );
    On(() => {
      oe && G({ value: K });
    }, [K, G, oe]);
    const Le = (fe) => {
        if (L.disabled) {
          fe.stopPropagation();
          return;
        }
        k && k(fe), w.onFocus && w.onFocus(fe), le && le.onFocus ? le.onFocus(fe) : xe(!0);
      },
      ve = (fe) => {
        D && D(fe), w.onBlur && w.onBlur(fe), le && le.onBlur ? le.onBlur(fe) : xe(!1);
      },
      Fe = (fe, ...pe) => {
        if (!oe) {
          const se = fe.target || ee.current;
          if (se == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : jn(1),
            );
          G({ value: se.value });
        }
        w.onChange && w.onChange(fe, ...pe), $ && $(fe, ...pe);
      };
    C.useEffect(() => {
      G(ee.current);
    }, []);
    const He = (fe) => {
      ee.current && fe.currentTarget === fe.target && ee.current.focus(), N && N(fe);
    };
    let Pe = S,
      Ae = w;
    O &&
      Pe === 'input' &&
      (Q
        ? (process.env.NODE_ENV !== 'production' &&
            (m || y) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (Ae = x({ type: void 0, minRows: Q, maxRows: Q }, Ae)))
        : (Ae = x({ type: void 0, maxRows: y, minRows: m }, Ae)),
      (Pe = gv));
    const ut = (fe) => {
      G(fe.animationName === 'mui-auto-fill-cancel' ? ee.current : { value: 'x' });
    };
    C.useEffect(() => {
      le && le.setAdornedStart(!!_);
    }, [le, _]);
    const ht = x({}, i, {
        color: L.color || 'primary',
        disabled: L.disabled,
        endAdornment: g,
        error: L.error,
        focused: L.focused,
        formControl: le,
        fullWidth: h,
        hiddenLabel: L.hiddenLabel,
        multiline: O,
        size: L.size,
        startAdornment: _,
        type: W,
      }),
      ae = ky(ht),
      ye = Z.root || u.Root || Ei,
      we = ie.root || d.root || {},
      U = Z.input || u.Input || Ci;
    return (
      (Ae = x({}, Ae, (r = ie.input) != null ? r : d.input)),
      je(C.Fragment, {
        children: [
          !v && Ny,
          je(
            ye,
            x(
              {},
              we,
              !Fn(ye) && { ownerState: x({}, ht, we.ownerState) },
              { ref: o, onClick: He },
              H,
              {
                className: Ee(ae.root, we.className, c, V && 'MuiInputBase-readOnly'),
                children: [
                  _,
                  I(Xa.Provider, {
                    value: null,
                    children: I(
                      U,
                      x(
                        {
                          ownerState: ht,
                          'aria-invalid': L.error,
                          'aria-describedby': a,
                          autoComplete: s,
                          autoFocus: l,
                          defaultValue: p,
                          disabled: L.disabled,
                          id: f,
                          onAnimationStart: ut,
                          name: R,
                          placeholder: P,
                          readOnly: V,
                          required: L.required,
                          rows: Q,
                          value: K,
                          onKeyDown: z,
                          onKeyUp: j,
                          type: W,
                        },
                        Ae,
                        !Fn(U) && { as: Pe, ownerState: x({}, ht, Ae.ownerState) },
                        {
                          ref: ce,
                          className: Ee(ae.input, Ae.className, V && 'MuiInputBase-readOnly'),
                          onBlur: ve,
                          onChange: Fe,
                          onFocus: Le,
                        },
                      ),
                    ),
                  }),
                  g,
                  B ? B(x({}, L, { startAdornment: _ })) : null,
                ],
              },
            ),
          ),
        ],
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Du.propTypes = {
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
    inputComponent: ya,
    inputProps: n.object,
    inputRef: qt,
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
const Za = Du;
function $y(e) {
  return Ue('MuiInput', e);
}
const Py = x({}, Yt, Be('MuiInput', ['root', 'underline', 'input'])),
  Ln = Py;
function Iy(e) {
  return Ue('MuiOutlinedInput', e);
}
const _y = x({}, Yt, Be('MuiOutlinedInput', ['root', 'notchedOutline', 'input'])),
  Cn = _y;
function My(e) {
  return Ue('MuiFilledInput', e);
}
const Ay = x({}, Yt, Be('MuiFilledInput', ['root', 'underline', 'input'])),
  Gt = Ay,
  Lu = To(I('path', { d: 'M7 10l5 5 5-5z' }), 'ArrowDropDown');
function Dy(e) {
  return Ue('MuiAutocomplete', e);
}
const Ly = Be('MuiAutocomplete', [
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
  ze = Ly;
var Hl, ql;
const Fy = [
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
  jy = (e) => {
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
        tag: ['tag', `tagSize${ue(d)}`],
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
    return Ge(p, Dy, t);
  },
  zy = ge('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: i, hasPopupIcon: a, inputFocused: s, size: l } = o;
      return [
        { [`& .${ze.tag}`]: t.tag },
        { [`& .${ze.tag}`]: t[`tagSize${ue(l)}`] },
        { [`& .${ze.inputRoot}`]: t.inputRoot },
        { [`& .${ze.input}`]: t.input },
        { [`& .${ze.input}`]: s && t.inputFocused },
        t.root,
        r && t.fullWidth,
        a && t.hasPopupIcon,
        i && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) =>
    x(
      {
        [`&.${ze.focused} .${ze.clearIndicator}`]: { visibility: 'visible' },
        '@media (pointer: fine)': { [`&:hover .${ze.clearIndicator}`]: { visibility: 'visible' } },
      },
      e.fullWidth && { width: '100%' },
      {
        [`& .${ze.tag}`]: x(
          { margin: 3, maxWidth: 'calc(100% - 6px)' },
          e.size === 'small' && { margin: 2, maxWidth: 'calc(100% - 4px)' },
        ),
        [`& .${ze.inputRoot}`]: {
          flexWrap: 'wrap',
          [`.${ze.hasPopupIcon}&, .${ze.hasClearIcon}&`]: { paddingRight: 26 + 4 },
          [`.${ze.hasPopupIcon}.${ze.hasClearIcon}&`]: { paddingRight: 52 + 4 },
          [`& .${ze.input}`]: { width: 0, minWidth: 30 },
        },
        [`& .${Ln.root}`]: {
          paddingBottom: 1,
          '& .MuiInput-input': { padding: '4px 4px 4px 0px' },
        },
        [`& .${Ln.root}.${Yt.sizeSmall}`]: { [`& .${Ln.input}`]: { padding: '2px 4px 3px 0' } },
        [`& .${Cn.root}`]: {
          padding: 9,
          [`.${ze.hasPopupIcon}&, .${ze.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
          [`.${ze.hasPopupIcon}.${ze.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
          [`& .${ze.input}`]: { padding: '7.5px 4px 7.5px 6px' },
          [`& .${ze.endAdornment}`]: { right: 9 },
        },
        [`& .${Cn.root}.${Yt.sizeSmall}`]: {
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 6,
          [`& .${ze.input}`]: { padding: '2.5px 4px 2.5px 6px' },
        },
        [`& .${Gt.root}`]: {
          paddingTop: 19,
          paddingLeft: 8,
          [`.${ze.hasPopupIcon}&, .${ze.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
          [`.${ze.hasPopupIcon}.${ze.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
          [`& .${Gt.input}`]: { padding: '7px 4px' },
          [`& .${ze.endAdornment}`]: { right: 9 },
        },
        [`& .${Gt.root}.${Yt.sizeSmall}`]: {
          paddingBottom: 1,
          [`& .${Gt.input}`]: { padding: '2.5px 4px' },
        },
        [`& .${Yt.hiddenLabel}`]: { paddingTop: 8 },
        [`& .${Gt.root}.${Yt.hiddenLabel}`]: {
          paddingTop: 0,
          paddingBottom: 0,
          [`& .${ze.input}`]: { paddingTop: 16, paddingBottom: 17 },
        },
        [`& .${Gt.root}.${Yt.hiddenLabel}.${Yt.sizeSmall}`]: {
          [`& .${ze.input}`]: { paddingTop: 8, paddingBottom: 9 },
        },
        [`& .${ze.input}`]: x(
          { flexGrow: 1, textOverflow: 'ellipsis', opacity: 0 },
          e.inputFocused && { opacity: 1 },
        ),
      },
    ),
  ),
  Vy = ge('div', {
    name: 'MuiAutocomplete',
    slot: 'EndAdornment',
    overridesResolver: (e, t) => t.endAdornment,
  })({ position: 'absolute', right: 0, top: 'calc(50% - 14px)' }),
  By = ge($u, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({ marginRight: -2, padding: 4, visibility: 'hidden' }),
  Wy = ge($u, {
    name: 'MuiAutocomplete',
    slot: 'PopupIndicator',
    overridesResolver: ({ ownerState: e }, t) =>
      x({}, t.popupIndicator, e.popupOpen && t.popupIndicatorOpen),
  })(({ ownerState: e }) =>
    x({ padding: 2, marginRight: -2 }, e.popupOpen && { transform: 'rotate(180deg)' }),
  ),
  Uy = ge(Iu, {
    name: 'MuiAutocomplete',
    slot: 'Popper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`& .${ze.option}`]: t.option },
        t.popper,
        o.disablePortal && t.popperDisablePortal,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    x({ zIndex: (e.vars || e).zIndex.modal }, t.disablePortal && { position: 'absolute' }),
  ),
  Hy = ge(lr, { name: 'MuiAutocomplete', slot: 'Paper', overridesResolver: (e, t) => t.paper })(
    ({ theme: e }) => x({}, e.typography.body1, { overflow: 'auto' }),
  ),
  qy = ge('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: '14px 16px' })),
  Ky = ge('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: '14px 16px' })),
  Yy = ge('div', {
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
      [e.breakpoints.up('sm')]: { minHeight: 'auto' },
      [`&.${ze.focused}`]: {
        backgroundColor: (e.vars || e).palette.action.hover,
        '@media (hover: none)': { backgroundColor: 'transparent' },
      },
      '&[aria-disabled="true"]': {
        opacity: (e.vars || e).palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`&.${ze.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : lt(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${ze.focused}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : lt(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          '@media (hover: none)': { backgroundColor: (e.vars || e).palette.action.selected },
        },
        [`&.${ze.focusVisible}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
            : lt(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
              ),
        },
      },
    },
  })),
  Gy = ge(hy, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({ backgroundColor: (e.vars || e).palette.background.paper, top: -8 })),
  Xy = ge('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({ padding: 0, [`& .${ze.option}`]: { paddingLeft: 24 } }),
  Fu = C.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Je({ props: t, name: 'MuiAutocomplete' }),
      {
        autoComplete: c = !1,
        autoHighlight: u = !1,
        autoSelect: d = !1,
        blurOnSelect: p = !1,
        ChipProps: b,
        className: v,
        clearIcon: g = Hl || (Hl = I(ly, { fontSize: 'small' })),
        clearOnBlur: h = !l.freeSolo,
        clearOnEscape: f = !1,
        clearText: S = 'Clear',
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
        forcePopupIcon: z = 'auto',
        freeSolo: j = !1,
        fullWidth: P = !1,
        getLimitTagsText: V = (Ve) => `+${Ve}`,
        getOptionLabel: B = (Ve) => {
          var yt;
          return (yt = Ve.label) != null ? yt : Ve;
        },
        groupBy: Q,
        handleHomeEndKeys: ie = !l.freeSolo,
        includeInputInList: Z = !1,
        limitTags: _ = -1,
        ListboxComponent: W = 'ul',
        ListboxProps: ne,
        loading: H = !1,
        loadingText: K = 'Loading…',
        multiple: oe = !1,
        noOptionsText: ee = 'No options',
        openOnFocus: re = !1,
        openText: ce = 'Open',
        PaperComponent: de = lr,
        PopperComponent: xe = Iu,
        popupIcon: le = ql || (ql = I(Lu, {})),
        readOnly: L = !1,
        renderGroup: Te,
        renderInput: F,
        renderOption: G,
        renderTags: Le,
        selectOnFocus: ve = !l.freeSolo,
        size: Fe = 'medium',
        slotProps: He = {},
      } = l,
      Pe = Re(l, Fy),
      {
        getRootProps: Ae,
        getInputProps: ut,
        getInputLabelProps: ht,
        getPopupIndicatorProps: ae,
        getClearProps: ye,
        getTagProps: we,
        getListboxProps: U,
        getOptionProps: fe,
        value: pe,
        dirty: se,
        expanded: Ce,
        id: Se,
        popupOpen: De,
        focused: bt,
        focusedTag: dt,
        anchorEl: It,
        setAnchorEl: Qt,
        inputValue: _t,
        groupedOptions: Tt,
      } = Ev(x({}, l, { componentName: 'Autocomplete' })),
      Rt = !m && !R && se && !L,
      vt = (!j || z === !0) && z !== !1,
      We = x({}, l, {
        disablePortal: N,
        expanded: Ce,
        focused: bt,
        fullWidth: P,
        hasClearIcon: Rt,
        hasPopupIcon: vt,
        inputFocused: dt === -1,
        popupOpen: De,
        size: Fe,
      }),
      pt = jy(We);
    let Et;
    if (oe && pe.length > 0) {
      const Ve = (yt) => x({ className: pt.tag, disabled: R }, we(yt));
      Le
        ? (Et = Le(pe, Ve, We))
        : (Et = pe.map((yt, Bt) => I(wy, x({ label: B(yt), size: Fe }, Ve({ index: Bt }), b))));
    }
    if (_ > -1 && Array.isArray(Et)) {
      const Ve = Et.length - _;
      !bt &&
        Ve > 0 &&
        ((Et = Et.splice(0, _)),
        Et.push(I('span', { className: pt.tag, children: V(Ve) }, Et.length)));
    }
    const Dt =
        Te ||
        ((Ve) =>
          je(
            'li',
            {
              children: [
                I(Gy, {
                  className: pt.groupLabel,
                  ownerState: We,
                  component: 'div',
                  children: Ve.group,
                }),
                I(Xy, { className: pt.groupUl, ownerState: We, children: Ve.children }),
              ],
            },
            Ve.key,
          )),
      zt = G || ((Ve, yt) => I('li', x({}, Ve, { children: B(yt) }))),
      nn = (Ve, yt) => {
        const Bt = fe({ option: Ve, index: yt });
        return zt(x({}, Bt, { className: pt.option }), Ve, {
          selected: Bt['aria-selected'],
          index: yt,
          inputValue: _t,
        });
      },
      pn = (r = He.clearIndicator) != null ? r : E.clearIndicator,
      fn = (i = He.paper) != null ? i : E.paper,
      mt = (a = He.popper) != null ? a : E.popper,
      on = (s = He.popupIndicator) != null ? s : E.popupIndicator;
    return je(C.Fragment, {
      children: [
        I(
          zy,
          x({ ref: o, className: Ee(pt.root, v), ownerState: We }, Ae(Pe), {
            children: F({
              id: Se,
              disabled: R,
              fullWidth: !0,
              size: Fe === 'small' ? 'small' : void 0,
              InputLabelProps: ht(),
              InputProps: x(
                { ref: Qt, className: pt.inputRoot, startAdornment: Et },
                (Rt || vt) && {
                  endAdornment: je(Vy, {
                    className: pt.endAdornment,
                    ownerState: We,
                    children: [
                      Rt
                        ? I(
                            By,
                            x({}, ye(), { 'aria-label': S, title: S, ownerState: We }, pn, {
                              className: Ee(pt.clearIndicator, pn == null ? void 0 : pn.className),
                              children: g,
                            }),
                          )
                        : null,
                      vt
                        ? I(
                            Wy,
                            x(
                              {},
                              ae(),
                              {
                                disabled: R,
                                'aria-label': De ? w : ce,
                                title: De ? w : ce,
                                ownerState: We,
                              },
                              on,
                              {
                                className: Ee(
                                  pt.popupIndicator,
                                  on == null ? void 0 : on.className,
                                ),
                                children: le,
                              },
                            ),
                          )
                        : null,
                    ],
                  }),
                },
              ),
              inputProps: x({ className: pt.input, disabled: R, readOnly: L }, ut()),
            }),
          }),
        ),
        It
          ? I(
              Uy,
              x(
                {
                  as: xe,
                  disablePortal: N,
                  style: { width: It ? It.clientWidth : null },
                  ownerState: We,
                  role: 'presentation',
                  anchorEl: It,
                  open: De,
                },
                mt,
                {
                  className: Ee(pt.popper, mt == null ? void 0 : mt.className),
                  children: je(
                    Hy,
                    x({ ownerState: We, as: de }, fn, {
                      className: Ee(pt.paper, fn == null ? void 0 : fn.className),
                      children: [
                        H && Tt.length === 0
                          ? I(qy, { className: pt.loading, ownerState: We, children: K })
                          : null,
                        Tt.length === 0 && !j && !H
                          ? I(Ky, {
                              className: pt.noOptions,
                              ownerState: We,
                              role: 'presentation',
                              onMouseDown: (Ve) => {
                                Ve.preventDefault();
                              },
                              children: ee,
                            })
                          : null,
                        Tt.length > 0
                          ? I(
                              Yy,
                              x({ as: W, className: pt.listbox, ownerState: We }, U(), ne, {
                                children: Tt.map((Ve, yt) =>
                                  Q
                                    ? Dt({
                                        key: Ve.key,
                                        group: Ve.group,
                                        children: Ve.options.map((Bt, T) => nn(Bt, Ve.index + T)),
                                      })
                                    : nn(Ve, yt),
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
  (Fu.propTypes = {
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
    defaultValue: vn(n.any, (e) =>
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
    limitTags: Ea,
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
    value: vn(n.any, (e) =>
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
const Jy = Fu,
  Zy = [
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
  Qy = { entering: { opacity: 1 }, entered: { opacity: 1 } },
  ju = C.forwardRef(function (t, o) {
    const r = So(),
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
        timeout: S = i,
        TransitionComponent: w = wu,
      } = t,
      E = Re(t, Zy),
      y = C.useRef(null),
      m = Ot(y, l.ref, o),
      O = (P) => (V) => {
        if (P) {
          const B = y.current;
          V === void 0 ? P(B) : P(B, V);
        }
      },
      R = O(b),
      D = O((P, V) => {
        Su(P);
        const B = Hr({ style: f, timeout: S, easing: c }, { mode: 'enter' });
        (P.style.webkitTransition = r.transitions.create('opacity', B)),
          (P.style.transition = r.transitions.create('opacity', B)),
          d && d(P, V);
      }),
      $ = O(p),
      N = O(h),
      k = O((P) => {
        const V = Hr({ style: f, timeout: S, easing: c }, { mode: 'exit' });
        (P.style.webkitTransition = r.transitions.create('opacity', V)),
          (P.style.transition = r.transitions.create('opacity', V)),
          v && v(P);
      }),
      z = O(g);
    return I(
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
          onExited: z,
          onExiting: N,
          addEndListener: (P) => {
            a && a(y.current, P);
          },
          timeout: S,
        },
        E,
        {
          children: (P, V) =>
            C.cloneElement(
              l,
              x(
                {
                  style: x(
                    { opacity: 0, visibility: P === 'exited' && !u ? 'hidden' : void 0 },
                    Qy[P],
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
  (ju.propTypes = {
    addEndListener: n.func,
    appear: n.bool,
    children: Co.isRequired,
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
const e0 = ju;
function t0(e) {
  return Ue('MuiBackdrop', e);
}
Be('MuiBackdrop', ['root', 'invisible']);
const n0 = [
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
  o0 = (e) => {
    const { classes: t, invisible: o } = e;
    return Ge({ root: ['root', o && 'invisible'] }, t0, t);
  },
  r0 = ge('div', {
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
      e.invisible && { backgroundColor: 'transparent' },
    ),
  ),
  zu = C.forwardRef(function (t, o) {
    var r, i, a;
    const s = Je({ props: t, name: 'MuiBackdrop' }),
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
        TransitionComponent: f = e0,
        transitionDuration: S,
      } = s,
      w = Re(s, n0),
      E = x({}, s, { component: u, invisible: b }),
      y = o0(E),
      m = (r = g.root) != null ? r : p.root;
    return I(
      f,
      x({ in: v, timeout: S }, w, {
        children: I(
          r0,
          x({ 'aria-hidden': !0 }, m, {
            as: (i = (a = h.root) != null ? a : d.Root) != null ? i : u,
            className: Ee(y.root, c, m == null ? void 0 : m.className),
            ownerState: x({}, E, m == null ? void 0 : m.ownerState),
            classes: y,
            ref: o,
            children: l,
          }),
        ),
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (zu.propTypes = {
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
const i0 = zu;
function a0(e) {
  return Ue('MuiButton', e);
}
const s0 = Be('MuiButton', [
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
  Rr = s0,
  Vu = C.createContext({});
process.env.NODE_ENV !== 'production' && (Vu.displayName = 'ButtonGroupContext');
const l0 = Vu,
  c0 = [
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
  u0 = (e) => {
    const { color: t, disableElevation: o, fullWidth: r, size: i, variant: a, classes: s } = e,
      l = {
        root: [
          'root',
          a,
          `${a}${ue(t)}`,
          `size${ue(i)}`,
          `${a}Size${ue(i)}`,
          t === 'inherit' && 'colorInherit',
          o && 'disableElevation',
          r && 'fullWidth',
        ],
        label: ['label'],
        startIcon: ['startIcon', `iconSize${ue(i)}`],
        endIcon: ['endIcon', `iconSize${ue(i)}`],
      },
      c = Ge(l, a0, s);
    return x({}, s, c);
  },
  Bu = (e) =>
    x(
      {},
      e.size === 'small' && { '& > *:nth-of-type(1)': { fontSize: 18 } },
      e.size === 'medium' && { '& > *:nth-of-type(1)': { fontSize: 20 } },
      e.size === 'large' && { '& > *:nth-of-type(1)': { fontSize: 22 } },
    ),
  d0 = ge(xo, {
    shouldForwardProp: (e) => xn(e) || e === 'classes',
    name: 'MuiButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[o.variant],
        t[`${o.variant}${ue(o.color)}`],
        t[`size${ue(o.size)}`],
        t[`${o.variant}Size${ue(o.size)}`],
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
            { duration: e.transitions.duration.short },
          ),
          '&:hover': x(
            {
              textDecoration: 'none',
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
                : lt(e.palette.text.primary, e.palette.action.hoverOpacity),
              '@media (hover: none)': { backgroundColor: 'transparent' },
            },
            t.variant === 'text' &&
              t.color !== 'inherit' && {
                backgroundColor: e.vars
                  ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                      e.vars.palette.action.hoverOpacity
                    })`
                  : lt(e.palette[t.color].main, e.palette.action.hoverOpacity),
                '@media (hover: none)': { backgroundColor: 'transparent' },
              },
            t.variant === 'outlined' &&
              t.color !== 'inherit' && {
                border: `1px solid ${(e.vars || e).palette[t.color].main}`,
                backgroundColor: e.vars
                  ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                      e.vars.palette.action.hoverOpacity
                    })`
                  : lt(e.palette[t.color].main, e.palette.action.hoverOpacity),
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
          '&:active': x({}, t.variant === 'contained' && { boxShadow: (e.vars || e).shadows[8] }),
          [`&.${Rr.focusVisible}`]: x(
            {},
            t.variant === 'contained' && { boxShadow: (e.vars || e).shadows[6] },
          ),
          [`&.${Rr.disabled}`]: x(
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
              : `1px solid ${lt(e.palette[t.color].main, 0.5)}`,
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
        [`&.${Rr.focusVisible}`]: { boxShadow: 'none' },
        '&:active': { boxShadow: 'none' },
        [`&.${Rr.disabled}`]: { boxShadow: 'none' },
      },
  ),
  p0 = ge('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${ue(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    x(
      { display: 'inherit', marginRight: 8, marginLeft: -4 },
      e.size === 'small' && { marginLeft: -2 },
      Bu(e),
    ),
  ),
  f0 = ge('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${ue(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    x(
      { display: 'inherit', marginRight: -4, marginLeft: 8 },
      e.size === 'small' && { marginRight: -2 },
      Bu(e),
    ),
  ),
  Wu = C.forwardRef(function (t, o) {
    const r = C.useContext(l0),
      i = Ca(r, t),
      a = Je({ props: i, name: 'MuiButton' }),
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
        startIcon: S,
        type: w,
        variant: E = 'text',
      } = a,
      y = Re(a, c0),
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
      O = u0(m),
      R = S && I(p0, { className: O.startIcon, ownerState: m, children: S }),
      D = v && I(f0, { className: O.endIcon, ownerState: m, children: v });
    return je(
      d0,
      x(
        {
          ownerState: m,
          className: Ee(r.className, O.root, u),
          component: c,
          disabled: d,
          focusRipple: !b,
          focusVisibleClassName: Ee(O.focusVisible, g),
          ref: o,
          type: w,
        },
        y,
        { classes: O, children: [R, s, D] },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Wu.propTypes = {
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
const m0 = Wu;
function h0(e) {
  return Ue('PrivateSwitchBase', e);
}
Be('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const b0 = [
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
  g0 = (e) => {
    const { classes: t, checked: o, disabled: r, edge: i } = e,
      a = {
        root: ['root', o && 'checked', r && 'disabled', i && `edge${ue(i)}`],
        input: ['input'],
      };
    return Ge(a, h0, t);
  },
  v0 = ge(xo)(({ ownerState: e }) =>
    x(
      { padding: 9, borderRadius: '50%' },
      e.edge === 'start' && { marginLeft: e.size === 'small' ? -3 : -12 },
      e.edge === 'end' && { marginRight: e.size === 'small' ? -3 : -12 },
    ),
  ),
  y0 = ge('input')({
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
  Uu = C.forwardRef(function (t, o) {
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
        onChange: S,
        onFocus: w,
        readOnly: E,
        required: y = !1,
        tabIndex: m,
        type: O,
        value: R,
      } = t,
      D = Re(t, b0),
      [$, N] = Gn({ controlled: i, default: !!l, name: 'SwitchBase', state: 'checked' }),
      k = eo(),
      z = (Z) => {
        w && w(Z), k && k.onFocus && k.onFocus(Z);
      },
      j = (Z) => {
        f && f(Z), k && k.onBlur && k.onBlur(Z);
      },
      P = (Z) => {
        if (Z.nativeEvent.defaultPrevented) return;
        const _ = Z.target.checked;
        N(_), S && S(Z, _);
      };
    let V = c;
    k && typeof V > 'u' && (V = k.disabled);
    const B = O === 'checkbox' || O === 'radio',
      Q = x({}, t, { checked: $, disabled: V, disableFocusRipple: u, edge: d }),
      ie = g0(Q);
    return je(
      v0,
      x(
        {
          component: 'span',
          className: Ee(ie.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: V,
          tabIndex: null,
          role: void 0,
          onFocus: z,
          onBlur: j,
          ownerState: Q,
          ref: o,
        },
        D,
        {
          children: [
            I(
              y0,
              x(
                {
                  autoFocus: r,
                  checked: i,
                  defaultChecked: l,
                  className: ie.input,
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
                O === 'checkbox' && R === void 0 ? {} : { value: R },
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
  (Uu.propTypes = {
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
    inputRef: qt,
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
const Hu = Uu,
  x0 = To(
    I('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  E0 = To(
    I('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  C0 = To(
    I('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function w0(e) {
  return Ue('MuiCheckbox', e);
}
const S0 = Be('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  qi = S0,
  T0 = [
    'checkedIcon',
    'color',
    'icon',
    'indeterminate',
    'indeterminateIcon',
    'inputProps',
    'size',
    'className',
  ],
  R0 = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      i = { root: ['root', o && 'indeterminate', `color${ue(r)}`] },
      a = Ge(i, w0, t);
    return x({}, t, a);
  },
  O0 = ge(Hu, {
    shouldForwardProp: (e) => xn(e) || e === 'classes',
    name: 'MuiCheckbox',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.indeterminate && t.indeterminate,
        o.color !== 'default' && t[`color${ue(o.color)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    x(
      { color: (e.vars || e).palette.text.secondary },
      !t.disableRipple && {
        '&:hover': {
          backgroundColor: e.vars
            ? `rgba(${
                t.color === 'default'
                  ? e.vars.palette.action.activeChannel
                  : e.vars.palette.primary.mainChannel
              } / ${e.vars.palette.action.hoverOpacity})`
            : lt(
                t.color === 'default' ? e.palette.action.active : e.palette[t.color].main,
                e.palette.action.hoverOpacity,
              ),
          '@media (hover: none)': { backgroundColor: 'transparent' },
        },
      },
      t.color !== 'default' && {
        [`&.${qi.checked}, &.${qi.indeterminate}`]: { color: (e.vars || e).palette[t.color].main },
        [`&.${qi.disabled}`]: { color: (e.vars || e).palette.action.disabled },
      },
    ),
  ),
  k0 = I(E0, {}),
  N0 = I(x0, {}),
  $0 = I(C0, {}),
  qu = C.forwardRef(function (t, o) {
    var r, i;
    const a = Je({ props: t, name: 'MuiCheckbox' }),
      {
        checkedIcon: s = k0,
        color: l = 'primary',
        icon: c = N0,
        indeterminate: u = !1,
        indeterminateIcon: d = $0,
        inputProps: p,
        size: b = 'medium',
        className: v,
      } = a,
      g = Re(a, T0),
      h = u ? d : c,
      f = u ? d : s,
      S = x({}, a, { color: l, indeterminate: u, size: b }),
      w = R0(S);
    return I(
      O0,
      x(
        {
          type: 'checkbox',
          inputProps: x({ 'data-indeterminate': u }, p),
          icon: C.cloneElement(h, { fontSize: (r = h.props.fontSize) != null ? r : b }),
          checkedIcon: C.cloneElement(f, { fontSize: (i = f.props.fontSize) != null ? i : b }),
          ownerState: S,
          ref: o,
          className: Ee(w.root, v),
        },
        g,
        { classes: w },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (qu.propTypes = {
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
    inputRef: qt,
    onChange: n.func,
    required: n.bool,
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    value: n.any,
  });
const P0 = qu,
  I0 = [
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
  _0 = ge('div', {
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
      !t.open && t.exited && { visibility: 'hidden' },
    ),
  ),
  M0 = ge(i0, { name: 'MuiModal', slot: 'Backdrop', overridesResolver: (e, t) => t.backdrop })({
    zIndex: -1,
  }),
  Ku = C.forwardRef(function (t, o) {
    var r, i, a, s, l, c;
    const u = Je({ name: 'MuiModal', props: t }),
      {
        BackdropComponent: d = M0,
        BackdropProps: p,
        classes: b,
        className: v,
        closeAfterTransition: g = !1,
        children: h,
        component: f,
        components: S = {},
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
        slots: z,
        theme: j,
      } = u,
      P = Re(u, I0),
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
      ie = x({}, u, Q, { exited: V }),
      Z = (r = (i = z == null ? void 0 : z.root) != null ? i : S.Root) != null ? r : _0,
      _ = (a = (s = z == null ? void 0 : z.backdrop) != null ? s : S.Backdrop) != null ? a : d,
      W = (l = k == null ? void 0 : k.root) != null ? l : w.root,
      ne = (c = k == null ? void 0 : k.backdrop) != null ? c : w.backdrop;
    return I(
      av,
      x(
        {
          slots: { root: Z, backdrop: _ },
          slotProps: {
            root: () =>
              x({}, sa(W, ie), !Fn(Z) && { as: f, theme: j }, {
                className: Ee(
                  v,
                  W == null ? void 0 : W.className,
                  b == null ? void 0 : b.root,
                  !ie.open && ie.exited && (b == null ? void 0 : b.hidden),
                ),
              }),
            backdrop: () =>
              x({}, p, sa(ne, ie), {
                className: Ee(ne == null ? void 0 : ne.className, b == null ? void 0 : b.backdrop),
              }),
          },
          onTransitionEnter: () => B(!1),
          onTransitionExited: () => B(!0),
          ref: o,
        },
        P,
        Q,
        { children: h },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ku.propTypes = {
    BackdropComponent: n.elementType,
    BackdropProps: n.object,
    children: Co.isRequired,
    classes: n.object,
    className: n.string,
    closeAfterTransition: n.bool,
    component: n.elementType,
    components: n.shape({ Backdrop: n.elementType, Root: n.elementType }),
    componentsProps: n.shape({
      backdrop: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
    }),
    container: n.oneOfType([Rn, n.func]),
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
const A0 = Ku,
  D0 = Be('MuiDivider', [
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
  Kl = D0,
  L0 = [
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
  F0 = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Ge({ root: ['root', !o && 'underline'], input: ['input'] }, My, t);
    return x({}, t, i);
  },
  j0 = ge(Ei, {
    shouldForwardProp: (e) => xn(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...yi(e, t), !o.disableUnderline && t.underline];
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
          '@media (hover: none)': { backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a },
        },
        [`&.${Gt.focused}`]: { backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a },
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
        [`&.${Gt.focused}:after`]: { transform: 'scaleX(1) translateX(0)' },
        [`&.${Gt.error}`]: {
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
        [`&:hover:not(.${Gt.disabled}, .${Gt.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
        },
        [`&.${Gt.disabled}:before`]: { borderBottomStyle: 'dotted' },
      },
      t.startAdornment && { paddingLeft: 12 },
      t.endAdornment && { paddingRight: 12 },
      t.multiline &&
        x(
          { padding: '25px 12px 8px' },
          t.size === 'small' && { paddingTop: 21, paddingBottom: 4 },
          t.hiddenLabel && { paddingTop: 16, paddingBottom: 17 },
        ),
    );
  }),
  z0 = ge(Ci, { name: 'MuiFilledInput', slot: 'Input', overridesResolver: xi })(
    ({ theme: e, ownerState: t }) =>
      x(
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
  Qa = C.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Je({ props: t, name: 'MuiFilledInput' }),
      {
        components: c = {},
        componentsProps: u,
        fullWidth: d = !1,
        inputComponent: p = 'input',
        multiline: b = !1,
        slotProps: v,
        slots: g = {},
        type: h = 'text',
      } = l,
      f = Re(l, L0),
      S = x({}, l, { fullWidth: d, inputComponent: p, multiline: b, type: h }),
      w = F0(l),
      E = { root: { ownerState: S }, input: { ownerState: S } },
      y = v ?? u ? ln(v ?? u, E) : E,
      m = (r = (i = g.root) != null ? i : c.Root) != null ? r : j0,
      O = (a = (s = g.input) != null ? s : c.Input) != null ? a : z0;
    return I(
      Za,
      x(
        {
          slots: { root: m, input: O },
          componentsProps: y,
          fullWidth: d,
          inputComponent: p,
          multiline: b,
          ref: o,
          type: h,
        },
        f,
        { classes: w },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Qa.propTypes = {
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
    inputRef: qt,
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
Qa.muiName = 'Input';
const Yu = Qa;
function V0(e) {
  return Ue('MuiFormControl', e);
}
Be('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const B0 = [
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
  W0 = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      i = { root: ['root', o !== 'none' && `margin${ue(o)}`, r && 'fullWidth'] };
    return Ge(i, V0, t);
  },
  U0 = ge('div', {
    name: 'MuiFormControl',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      x({}, t.root, t[`margin${ue(e.margin)}`], e.fullWidth && t.fullWidth),
  })(({ ownerState: e }) =>
    x(
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
  Gu = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiFormControl' }),
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
      S = Re(r, B0),
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
      E = W0(w),
      [y, m] = C.useState(() => {
        let j = !1;
        return (
          i &&
            C.Children.forEach(i, (P) => {
              if (!Fi(P, ['Input', 'Select'])) return;
              const V = Fi(P, ['Select']) ? P.props.input : P;
              V && Sy(V.props) && (j = !0);
            }),
          j
        );
      }),
      [O, R] = C.useState(() => {
        let j = !1;
        return (
          i &&
            C.Children.forEach(i, (P) => {
              Fi(P, ['Input', 'Select']) && Ja(P.props, !0) && (j = !0);
            }),
          j
        );
      }),
      [D, $] = C.useState(!1);
    c && D && $(!1);
    const N = d !== void 0 && !c ? d : D;
    let k;
    if (process.env.NODE_ENV !== 'production') {
      const j = C.useRef(!1);
      k = () => (
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
    const z = C.useMemo(
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
    return I(Xa.Provider, {
      value: z,
      children: I(
        U0,
        x({ as: l, ownerState: w, className: Ee(E.root, a), ref: o }, S, { children: i }),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Gu.propTypes = {
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
const H0 = Gu;
function q0(e) {
  return Ue('MuiFormHelperText', e);
}
const K0 = Be('MuiFormHelperText', [
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
  Yl = K0;
var Gl;
const Y0 = [
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
  G0 = (e) => {
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
          r && `size${ue(r)}`,
          o && 'contained',
          l && 'focused',
          s && 'filled',
          c && 'required',
        ],
      };
    return Ge(u, q0, t);
  },
  X0 = ge('p', {
    name: 'MuiFormHelperText',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.size && t[`size${ue(o.size)}`],
        o.contained && t.contained,
        o.filled && t.filled,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    x(
      { color: (e.vars || e).palette.text.secondary },
      e.typography.caption,
      {
        textAlign: 'left',
        marginTop: 3,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        [`&.${Yl.disabled}`]: { color: (e.vars || e).palette.text.disabled },
        [`&.${Yl.error}`]: { color: (e.vars || e).palette.error.main },
      },
      t.size === 'small' && { marginTop: 4 },
      t.contained && { marginLeft: 14, marginRight: 14 },
    ),
  ),
  Xu = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiFormHelperText' }),
      { children: i, className: a, component: s = 'p' } = r,
      l = Re(r, Y0),
      c = eo(),
      u = Ro({
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
      p = G0(d);
    return I(
      X0,
      x({ as: s, ownerState: d, className: Ee(p.root, a), ref: o }, l, {
        children:
          i === ' ' ? Gl || (Gl = I('span', { className: 'notranslate', children: '​' })) : i,
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Xu.propTypes = {
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
const J0 = Xu;
function Z0(e) {
  return Ue('MuiFormLabel', e);
}
const Q0 = Be('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  qo = Q0,
  ex = [
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
  tx = (e) => {
    const { classes: t, color: o, focused: r, disabled: i, error: a, filled: s, required: l } = e,
      c = {
        root: [
          'root',
          `color${ue(o)}`,
          i && 'disabled',
          a && 'error',
          s && 'filled',
          r && 'focused',
          l && 'required',
        ],
        asterisk: ['asterisk', a && 'error'],
      };
    return Ge(c, Z0, t);
  },
  nx = ge('label', {
    name: 'MuiFormLabel',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      x({}, t.root, e.color === 'secondary' && t.colorSecondary, e.filled && t.filled),
  })(({ theme: e, ownerState: t }) =>
    x({ color: (e.vars || e).palette.text.secondary }, e.typography.body1, {
      lineHeight: '1.4375em',
      padding: 0,
      position: 'relative',
      [`&.${qo.focused}`]: { color: (e.vars || e).palette[t.color].main },
      [`&.${qo.disabled}`]: { color: (e.vars || e).palette.text.disabled },
      [`&.${qo.error}`]: { color: (e.vars || e).palette.error.main },
    }),
  ),
  ox = ge('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({ [`&.${qo.error}`]: { color: (e.vars || e).palette.error.main } })),
  Ju = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiFormLabel' }),
      { children: i, className: a, component: s = 'label' } = r,
      l = Re(r, ex),
      c = eo(),
      u = Ro({
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
      p = tx(d);
    return je(
      nx,
      x({ as: s, ownerState: d, className: Ee(p.root, a), ref: o }, l, {
        children: [
          i,
          u.required &&
            je(ox, {
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
  (Ju.propTypes = {
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
const Zu = Ju,
  rx = [
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
function ha(e) {
  return `scale(${e}, ${e ** 2})`;
}
const ix = {
    entering: { opacity: 1, transform: ha(1) },
    entered: { opacity: 1, transform: 'none' },
  },
  Ki =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  es = C.forwardRef(function (t, o) {
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
        TransitionComponent: f = wu,
      } = t,
      S = Re(t, rx),
      w = C.useRef(),
      E = C.useRef(),
      y = So(),
      m = C.useRef(null),
      O = Ot(m, a.ref, o),
      R = (V) => (B) => {
        if (V) {
          const Q = m.current;
          B === void 0 ? V(Q) : V(Q, B);
        }
      },
      D = R(d),
      $ = R((V, B) => {
        Su(V);
        const {
          duration: Q,
          delay: ie,
          easing: Z,
        } = Hr({ style: g, timeout: h, easing: s }, { mode: 'enter' });
        let _;
        h === 'auto'
          ? ((_ = y.transitions.getAutoHeightDuration(V.clientHeight)), (E.current = _))
          : (_ = Q),
          (V.style.transition = [
            y.transitions.create('opacity', { duration: _, delay: ie }),
            y.transitions.create('transform', {
              duration: Ki ? _ : _ * 0.666,
              delay: ie,
              easing: Z,
            }),
          ].join(',')),
          c && c(V, B);
      }),
      N = R(u),
      k = R(v),
      z = R((V) => {
        const {
          duration: B,
          delay: Q,
          easing: ie,
        } = Hr({ style: g, timeout: h, easing: s }, { mode: 'exit' });
        let Z;
        h === 'auto'
          ? ((Z = y.transitions.getAutoHeightDuration(V.clientHeight)), (E.current = Z))
          : (Z = B),
          (V.style.transition = [
            y.transitions.create('opacity', { duration: Z, delay: Q }),
            y.transitions.create('transform', {
              duration: Ki ? Z : Z * 0.666,
              delay: Ki ? Q : Q || Z * 0.333,
              easing: ie,
            }),
          ].join(',')),
          (V.style.opacity = 0),
          (V.style.transform = ha(0.75)),
          p && p(V);
      }),
      j = R(b),
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
      I(
        f,
        x(
          {
            appear: i,
            in: l,
            nodeRef: m,
            onEnter: $,
            onEntered: N,
            onEntering: D,
            onExit: z,
            onExited: j,
            onExiting: k,
            addEndListener: P,
            timeout: h === 'auto' ? null : h,
          },
          S,
          {
            children: (V, B) =>
              C.cloneElement(
                a,
                x(
                  {
                    style: x(
                      {
                        opacity: 0,
                        transform: ha(0.75),
                        visibility: V === 'exited' && !l ? 'hidden' : void 0,
                      },
                      ix[V],
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
  (es.propTypes = {
    addEndListener: n.func,
    appear: n.bool,
    children: Co.isRequired,
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
es.muiSupportAuto = !0;
const Qu = es,
  ax = [
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
  sx = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Ge({ root: ['root', !o && 'underline'], input: ['input'] }, $y, t);
    return x({}, t, i);
  },
  lx = ge(Ei, {
    shouldForwardProp: (e) => xn(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...yi(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    let r = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
    return (
      e.vars &&
        (r = `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`),
      x(
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
          [`&.${Ln.focused}:after`]: { transform: 'scaleX(1) translateX(0)' },
          [`&.${Ln.error}`]: {
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
          [`&:hover:not(.${Ln.disabled}, .${Ln.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            '@media (hover: none)': { borderBottom: `1px solid ${r}` },
          },
          [`&.${Ln.disabled}:before`]: { borderBottomStyle: 'dotted' },
        },
      )
    );
  }),
  cx = ge(Ci, { name: 'MuiInput', slot: 'Input', overridesResolver: xi })({}),
  ts = C.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Je({ props: t, name: 'MuiInput' }),
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
      S = Re(l, ax),
      w = sx(l),
      y = { root: { ownerState: { disableUnderline: c } } },
      m = g ?? d ? ln(g ?? d, y) : y,
      O = (r = (i = h.root) != null ? i : u.Root) != null ? r : lx,
      R = (a = (s = h.input) != null ? s : u.Input) != null ? a : cx;
    return I(
      Za,
      x(
        {
          slots: { root: O, input: R },
          slotProps: m,
          fullWidth: p,
          inputComponent: b,
          multiline: v,
          ref: o,
          type: f,
        },
        S,
        { classes: w },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ts.propTypes = {
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
    inputRef: qt,
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
ts.muiName = 'Input';
const ed = ts;
function ux(e) {
  return Ue('MuiInputLabel', e);
}
Be('MuiInputLabel', [
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
const dx = ['disableAnimation', 'margin', 'shrink', 'variant', 'className'],
  px = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: i,
        disableAnimation: a,
        variant: s,
        required: l,
      } = e,
      u = Ge(
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
        ux,
        t,
      );
    return x({}, t, u);
  },
  fx = ge(Zu, {
    shouldForwardProp: (e) => xn(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`& .${qo.asterisk}`]: t.asterisk },
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
        x(
          {
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translate(12px, 16px) scale(1)',
            maxWidth: 'calc(100% - 24px)',
          },
          t.size === 'small' && { transform: 'translate(12px, 13px) scale(1)' },
          t.shrink &&
            x(
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
        x(
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
  td = C.forwardRef(function (t, o) {
    const r = Je({ name: 'MuiInputLabel', props: t }),
      { disableAnimation: i = !1, shrink: a, className: s } = r,
      l = Re(r, dx),
      c = eo();
    let u = a;
    typeof u > 'u' && c && (u = c.filled || c.focused || c.adornedStart);
    const d = Ro({ props: r, muiFormControl: c, states: ['size', 'variant', 'required'] }),
      p = x({}, r, {
        disableAnimation: i,
        formControl: c,
        shrink: u,
        size: d.size,
        variant: d.variant,
        required: d.required,
      }),
      b = px(p);
    return I(
      fx,
      x({ 'data-shrink': u, ownerState: p, ref: o, className: Ee(b.root, s) }, l, { classes: b }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (td.propTypes = {
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
const mx = td,
  nd = C.createContext({});
process.env.NODE_ENV !== 'production' && (nd.displayName = 'ListContext');
const ba = nd;
function hx(e) {
  return Ue('MuiList', e);
}
Be('MuiList', ['root', 'padding', 'dense', 'subheader']);
const bx = ['children', 'className', 'component', 'dense', 'disablePadding', 'subheader'],
  gx = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: i } = e;
    return Ge({ root: ['root', !o && 'padding', r && 'dense', i && 'subheader'] }, hx, t);
  },
  vx = ge('ul', {
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
      { listStyle: 'none', margin: 0, padding: 0, position: 'relative' },
      !e.disablePadding && { paddingTop: 8, paddingBottom: 8 },
      e.subheader && { paddingTop: 0 },
    ),
  ),
  od = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiList' }),
      {
        children: i,
        className: a,
        component: s = 'ul',
        dense: l = !1,
        disablePadding: c = !1,
        subheader: u,
      } = r,
      d = Re(r, bx),
      p = C.useMemo(() => ({ dense: l }), [l]),
      b = x({}, r, { component: s, dense: l, disablePadding: c }),
      v = gx(b);
    return I(ba.Provider, {
      value: p,
      children: je(
        vx,
        x({ as: s, className: Ee(v.root, a), ref: o, ownerState: b }, d, { children: [u, i] }),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (od.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    dense: n.bool,
    disablePadding: n.bool,
    subheader: n.node,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const yx = od,
  xx = Be('MuiListItemIcon', ['root', 'alignItemsFlexStart']),
  Xl = xx,
  Ex = Be('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']),
  Jl = Ex,
  Cx = [
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
function Yi(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function Zl(e, t, o) {
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
function rd(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function Lo(e, t, o, r, i, a) {
  let s = !1,
    l = i(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !rd(l, a) || c) l = i(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const id = C.forwardRef(function (t, o) {
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
    b = Re(t, Cx),
    v = C.useRef(null),
    g = C.useRef({ keys: [], repeating: !0, previousKeyMatched: !0, lastTime: null });
  On(() => {
    i && v.current.focus();
  }, [i]),
    C.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (E, y) => {
          const m = !v.current.style.width;
          if (E.clientHeight < v.current.clientHeight && m) {
            const O = `${_c(St(E))}px`;
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
        O = St(y).activeElement;
      if (m === 'ArrowDown') E.preventDefault(), Lo(y, O, u, c, Yi);
      else if (m === 'ArrowUp') E.preventDefault(), Lo(y, O, u, c, Zl);
      else if (m === 'Home') E.preventDefault(), Lo(y, null, u, c, Yi);
      else if (m === 'End') E.preventDefault(), Lo(y, null, u, c, Zl);
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
        const N = O && !R.repeating && rd(O, R);
        R.previousKeyMatched && (N || Lo(y, O, !1, c, Yi, R))
          ? E.preventDefault()
          : (R.previousKeyMatched = !1);
      }
      d && d(E);
    },
    f = Ot(v, o);
  let S = -1;
  C.Children.forEach(s, (E, y) => {
    C.isValidElement(E) &&
      (process.env.NODE_ENV !== 'production' &&
        qa.isFragment(E) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      E.props.disabled || (((p === 'selectedMenu' && E.props.selected) || S === -1) && (S = y)),
      S === y &&
        (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) &&
        ((S += 1), S >= s.length && (S = -1)));
  });
  const w = C.Children.map(s, (E, y) => {
    if (y === S) {
      const m = {};
      return (
        a && (m.autoFocus = !0),
        E.props.tabIndex === void 0 && p === 'selectedMenu' && (m.tabIndex = 0),
        C.cloneElement(E, m)
      );
    }
    return E;
  });
  return I(
    yx,
    x({ role: 'menu', ref: f, className: l, onKeyDown: h, tabIndex: i ? 0 : -1 }, b, {
      children: w,
    }),
  );
});
process.env.NODE_ENV !== 'production' &&
  (id.propTypes = {
    autoFocus: n.bool,
    autoFocusItem: n.bool,
    children: n.node,
    className: n.string,
    disabledItemsFocusable: n.bool,
    disableListWrap: n.bool,
    onKeyDown: n.func,
    variant: n.oneOf(['menu', 'selectedMenu']),
  });
const wx = id;
function Sx(e) {
  return Ue('MuiPopover', e);
}
Be('MuiPopover', ['root', 'paper']);
const Tx = ['onEntering'],
  Rx = [
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
function Ql(e, t) {
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
function ec(e, t) {
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
function tc(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function Ir(e) {
  return typeof e == 'function' ? e() : e;
}
const Ox = (e) => {
    const { classes: t } = e;
    return Ge({ root: ['root'], paper: ['paper'] }, Sx, t);
  },
  kx = ge(A0, { name: 'MuiPopover', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  Nx = ge(lr, { name: 'MuiPopover', slot: 'Paper', overridesResolver: (e, t) => t.paper })({
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    outline: 0,
  }),
  ad = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiPopover' }),
      {
        action: i,
        anchorEl: a,
        anchorOrigin: s = { vertical: 'top', horizontal: 'left' },
        anchorPosition: l,
        anchorReference: c = 'anchorEl',
        children: u,
        className: d,
        container: p,
        elevation: b = 8,
        marginThreshold: v = 16,
        open: g,
        PaperProps: h = {},
        transformOrigin: f = { vertical: 'top', horizontal: 'left' },
        TransitionComponent: S = Qu,
        transitionDuration: w = 'auto',
        TransitionProps: { onEntering: E } = {},
      } = r,
      y = Re(r.TransitionProps, Tx),
      m = Re(r, Rx),
      O = C.useRef(),
      R = Ot(O, h.ref),
      D = x({}, r, {
        anchorOrigin: s,
        anchorReference: c,
        elevation: b,
        marginThreshold: v,
        PaperProps: h,
        transformOrigin: f,
        TransitionComponent: S,
        transitionDuration: w,
        TransitionProps: y,
      }),
      $ = Ox(D),
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
        const _ = Ir(a),
          W = _ && _.nodeType === 1 ? _ : St(O.current).body,
          ne = W.getBoundingClientRect();
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
        return { top: ne.top + Ql(ne, s.vertical), left: ne.left + ec(ne, s.horizontal) };
      }, [a, s.horizontal, s.vertical, l, c]),
      k = C.useCallback(
        (_) => ({ vertical: Ql(_, f.vertical), horizontal: ec(_, f.horizontal) }),
        [f.horizontal, f.vertical],
      ),
      z = C.useCallback(
        (_) => {
          const W = { width: _.offsetWidth, height: _.offsetHeight },
            ne = k(W);
          if (c === 'none') return { top: null, left: null, transformOrigin: tc(ne) };
          const H = N();
          let K = H.top - ne.vertical,
            oe = H.left - ne.horizontal;
          const ee = K + W.height,
            re = oe + W.width,
            ce = Jn(Ir(a)),
            de = ce.innerHeight - v,
            xe = ce.innerWidth - v;
          if (K < v) {
            const le = K - v;
            (K -= le), (ne.vertical += le);
          } else if (ee > de) {
            const le = ee - de;
            (K -= le), (ne.vertical += le);
          }
          if (
            (process.env.NODE_ENV !== 'production' &&
              W.height > de &&
              W.height &&
              de &&
              console.error(
                [
                  'MUI: The popover component is too tall.',
                  `Some part of it can not be seen on the screen (${W.height - de}px).`,
                  'Please consider adding a `max-height` to improve the user-experience.',
                ].join(`
`),
              ),
            oe < v)
          ) {
            const le = oe - v;
            (oe -= le), (ne.horizontal += le);
          } else if (re > xe) {
            const le = re - xe;
            (oe -= le), (ne.horizontal += le);
          }
          return {
            top: `${Math.round(K)}px`,
            left: `${Math.round(oe)}px`,
            transformOrigin: tc(ne),
          };
        },
        [a, c, N, k, v],
      ),
      [j, P] = C.useState(g),
      V = C.useCallback(() => {
        const _ = O.current;
        if (!_) return;
        const W = z(_);
        W.top !== null && (_.style.top = W.top),
          W.left !== null && (_.style.left = W.left),
          (_.style.transformOrigin = W.transformOrigin),
          P(!0);
      }, [z]),
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
        const _ = $c(() => {
            V();
          }),
          W = Jn(a);
        return (
          W.addEventListener('resize', _),
          () => {
            _.clear(), W.removeEventListener('resize', _);
          }
        );
      }, [a, g, V]);
    let ie = w;
    w === 'auto' && !S.muiSupportAuto && (ie = void 0);
    const Z = p || (a ? St(Ir(a)).body : void 0);
    return I(
      kx,
      x(
        {
          BackdropProps: { invisible: !0 },
          className: Ee($.root, d),
          container: Z,
          open: g,
          ref: o,
          ownerState: D,
        },
        m,
        {
          children: I(
            S,
            x({ appear: !0, in: g, onEntering: B, onExited: Q, timeout: ie }, y, {
              children: I(
                Nx,
                x(
                  { elevation: b },
                  h,
                  { ref: R, className: Ee($.paper, h.className) },
                  j ? void 0 : { style: x({}, h.style, { opacity: 0 }) },
                  { ownerState: D, children: u },
                ),
              ),
            }),
          ),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ad.propTypes = {
    action: qt,
    anchorEl: vn(n.oneOfType([Rn, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = Ir(e.anchorEl);
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
    container: n.oneOfType([Rn, n.func]),
    elevation: Ea,
    marginThreshold: n.number,
    onClose: n.func,
    open: n.bool.isRequired,
    PaperProps: n.shape({ component: ya }),
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
const $x = ad;
function Px(e) {
  return Ue('MuiMenu', e);
}
Be('MuiMenu', ['root', 'paper', 'list']);
const Ix = ['onEntering'],
  _x = [
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
  Mx = { vertical: 'top', horizontal: 'right' },
  Ax = { vertical: 'top', horizontal: 'left' },
  Dx = (e) => {
    const { classes: t } = e;
    return Ge({ root: ['root'], paper: ['paper'], list: ['list'] }, Px, t);
  },
  Lx = ge($x, {
    shouldForwardProp: (e) => xn(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Fx = ge(lr, { name: 'MuiMenu', slot: 'Paper', overridesResolver: (e, t) => t.paper })({
    maxHeight: 'calc(100% - 96px)',
    WebkitOverflowScrolling: 'touch',
  }),
  jx = ge(wx, { name: 'MuiMenu', slot: 'List', overridesResolver: (e, t) => t.list })({
    outline: 0,
  }),
  sd = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiMenu' }),
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
      h = Re(r.TransitionProps, Ix),
      f = Re(r, _x),
      S = So(),
      w = S.direction === 'rtl',
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
      y = Dx(E),
      m = i && !s && u,
      O = C.useRef(null),
      R = (N, k) => {
        O.current && O.current.adjustStyleForScrollbar(N, S), v && v(N, k);
      },
      D = (N) => {
        N.key === 'Tab' && (N.preventDefault(), c && c(N, 'tabKeyDown'));
      };
    let $ = -1;
    return (
      C.Children.map(a, (N, k) => {
        C.isValidElement(N) &&
          (process.env.NODE_ENV !== 'production' &&
            qa.isFragment(N) &&
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
      I(
        Lx,
        x(
          {
            onClose: c,
            anchorOrigin: { vertical: 'bottom', horizontal: w ? 'right' : 'left' },
            transformOrigin: w ? Mx : Ax,
            PaperProps: x({ as: Fx }, d, { classes: x({}, d.classes, { root: y.paper }) }),
            className: y.root,
            open: u,
            ref: o,
            transitionDuration: b,
            TransitionProps: x({ onEntering: R }, h),
            ownerState: E,
          },
          f,
          {
            classes: p,
            children: I(
              jx,
              x(
                {
                  onKeyDown: D,
                  actions: O,
                  autoFocus: i && ($ === -1 || s),
                  autoFocusItem: m,
                  variant: g,
                },
                l,
                { className: Ee(y.list, l.className), children: a },
              ),
            ),
          },
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (sd.propTypes = {
    anchorEl: n.oneOfType([Rn, n.func]),
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
const zx = sd;
function Vx(e) {
  return Ue('MuiMenuItem', e);
}
const Bx = Be('MuiMenuItem', [
    'root',
    'focusVisible',
    'dense',
    'disabled',
    'divider',
    'gutters',
    'selected',
  ]),
  Fo = Bx,
  Wx = [
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
  Ux = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
  },
  Hx = (e) => {
    const { disabled: t, dense: o, divider: r, disableGutters: i, selected: a, classes: s } = e,
      c = Ge(
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
        Vx,
        s,
      );
    return x({}, s, c);
  },
  qx = ge(xo, {
    shouldForwardProp: (e) => xn(e) || e === 'classes',
    name: 'MuiMenuItem',
    slot: 'Root',
    overridesResolver: Ux,
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
        [`&.${Fo.selected}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
            : lt(e.palette.primary.main, e.palette.action.selectedOpacity),
          [`&.${Fo.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : lt(
                  e.palette.primary.main,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        [`&.${Fo.selected}:hover`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : lt(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          '@media (hover: none)': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
              : lt(e.palette.primary.main, e.palette.action.selectedOpacity),
          },
        },
        [`&.${Fo.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
        [`&.${Fo.disabled}`]: { opacity: (e.vars || e).palette.action.disabledOpacity },
        [`& + .${Kl.root}`]: { marginTop: e.spacing(1), marginBottom: e.spacing(1) },
        [`& + .${Kl.inset}`]: { marginLeft: 52 },
        [`& .${Jl.root}`]: { marginTop: 0, marginBottom: 0 },
        [`& .${Jl.inset}`]: { paddingLeft: 36 },
        [`& .${Xl.root}`]: { minWidth: 36 },
      },
      !t.dense && { [e.breakpoints.up('sm')]: { minHeight: 'auto' } },
      t.dense &&
        x({ minHeight: 32, paddingTop: 4, paddingBottom: 4 }, e.typography.body2, {
          [`& .${Xl.root} svg`]: { fontSize: '1.25rem' },
        }),
    ),
  ),
  ld = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiMenuItem' }),
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
      v = Re(r, Wx),
      g = C.useContext(ba),
      h = C.useMemo(() => ({ dense: s || g.dense || !1, disableGutters: c }), [g.dense, s, c]),
      f = C.useRef(null);
    On(() => {
      i &&
        (f.current
          ? f.current.focus()
          : process.env.NODE_ENV !== 'production' &&
            console.error(
              'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
            ));
    }, [i]);
    const S = x({}, r, { dense: h.dense, divider: l, disableGutters: c }),
      w = Hx(r),
      E = Ot(f, o);
    let y;
    return (
      r.disabled || (y = p !== void 0 ? p : -1),
      I(ba.Provider, {
        value: h,
        children: I(
          qx,
          x(
            {
              ref: E,
              role: d,
              tabIndex: y,
              component: a,
              focusVisibleClassName: Ee(w.focusVisible, u),
              className: Ee(w.root, b),
            },
            v,
            { ownerState: S, classes: w },
          ),
        ),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ld.propTypes = {
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
const Kx = ld;
function Yx(e) {
  return Ue('MuiNativeSelect', e);
}
const Gx = Be('MuiNativeSelect', [
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
  ns = Gx,
  Xx = ['className', 'disabled', 'IconComponent', 'inputRef', 'variant'],
  Jx = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${ue(o)}`, a && 'iconOpen', r && 'disabled'],
      };
    return Ge(s, Yx, t);
  },
  cd = ({ ownerState: e, theme: t }) =>
    x(
      {
        MozAppearance: 'none',
        WebkitAppearance: 'none',
        userSelect: 'none',
        borderRadius: 0,
        cursor: 'pointer',
        '&:focus': x(
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
        [`&.${ns.disabled}`]: { cursor: 'default' },
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
  Zx = ge('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: xn,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.select, t[o.variant], { [`&.${ns.multiple}`]: t.multiple }];
    },
  })(cd),
  ud = ({ ownerState: e, theme: t }) =>
    x(
      {
        position: 'absolute',
        right: 0,
        top: 'calc(50% - .5em)',
        pointerEvents: 'none',
        color: (t.vars || t).palette.action.active,
        [`&.${ns.disabled}`]: { color: (t.vars || t).palette.action.disabled },
      },
      e.open && { transform: 'rotate(180deg)' },
      e.variant === 'filled' && { right: 7 },
      e.variant === 'outlined' && { right: 7 },
    ),
  Qx = ge('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${ue(o.variant)}`], o.open && t.iconOpen];
    },
  })(ud),
  dd = C.forwardRef(function (t, o) {
    const { className: r, disabled: i, IconComponent: a, inputRef: s, variant: l = 'standard' } = t,
      c = Re(t, Xx),
      u = x({}, t, { disabled: i, variant: l }),
      d = Jx(u);
    return je(C.Fragment, {
      children: [
        I(Zx, x({ ownerState: u, className: Ee(d.select, r), disabled: i, ref: s || o }, c)),
        t.multiple ? null : I(Qx, { as: a, ownerState: u, className: d.icon }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (dd.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    disabled: n.bool,
    IconComponent: n.elementType.isRequired,
    inputRef: qt,
    multiple: n.bool,
    name: n.string,
    onChange: n.func,
    value: n.any,
    variant: n.oneOf(['standard', 'outlined', 'filled']),
  });
const eE = dd;
var nc;
const tE = ['children', 'classes', 'className', 'label', 'notched'],
  nE = ge('fieldset')({
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
  oE = ge('legend')(({ ownerState: e, theme: t }) =>
    x(
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
        x(
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
function pd(e) {
  const { className: t, label: o, notched: r } = e,
    i = Re(e, tE),
    a = o != null && o !== '',
    s = x({}, e, { notched: r, withLabel: a });
  return I(
    nE,
    x({ 'aria-hidden': !0, className: t, ownerState: s }, i, {
      children: I(oE, {
        ownerState: s,
        children: a
          ? I('span', { children: o })
          : nc || (nc = I('span', { className: 'notranslate', children: '​' })),
      }),
    }),
  );
}
process.env.NODE_ENV !== 'production' &&
  (pd.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    label: n.node,
    notched: n.bool.isRequired,
    style: n.object,
  });
const rE = [
    'components',
    'fullWidth',
    'inputComponent',
    'label',
    'multiline',
    'notched',
    'slots',
    'type',
  ],
  iE = (e) => {
    const { classes: t } = e,
      r = Ge({ root: ['root'], notchedOutline: ['notchedOutline'], input: ['input'] }, Iy, t);
    return x({}, t, r);
  },
  aE = ge(Ei, {
    shouldForwardProp: (e) => xn(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: yi,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return x(
      {
        position: 'relative',
        borderRadius: (e.vars || e).shape.borderRadius,
        [`&:hover .${Cn.notchedOutline}`]: { borderColor: (e.vars || e).palette.text.primary },
        '@media (hover: none)': {
          [`&:hover .${Cn.notchedOutline}`]: {
            borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
          },
        },
        [`&.${Cn.focused} .${Cn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[t.color].main,
          borderWidth: 2,
        },
        [`&.${Cn.error} .${Cn.notchedOutline}`]: { borderColor: (e.vars || e).palette.error.main },
        [`&.${Cn.disabled} .${Cn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.action.disabled,
        },
      },
      t.startAdornment && { paddingLeft: 14 },
      t.endAdornment && { paddingRight: 14 },
      t.multiline && x({ padding: '16.5px 14px' }, t.size === 'small' && { padding: '8.5px 14px' }),
    );
  }),
  sE = ge(pd, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  lE = ge(Ci, { name: 'MuiOutlinedInput', slot: 'Input', overridesResolver: xi })(
    ({ theme: e, ownerState: t }) =>
      x(
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
  os = C.forwardRef(function (t, o) {
    var r, i, a, s, l;
    const c = Je({ props: t, name: 'MuiOutlinedInput' }),
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
      S = Re(c, rE),
      w = iE(c),
      E = eo(),
      y = Ro({ props: c, muiFormControl: E, states: ['required'] }),
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
      O = (r = (i = h.root) != null ? i : u.Root) != null ? r : aE,
      R = (a = (s = h.input) != null ? s : u.Input) != null ? a : lE;
    return I(
      Za,
      x(
        {
          slots: { root: O, input: R },
          renderSuffix: (D) =>
            I(sE, {
              ownerState: m,
              className: w.notchedOutline,
              label:
                b != null && b !== '' && y.required
                  ? l || (l = je(C.Fragment, { children: [b, ' ', '*'] }))
                  : b,
              notched: typeof g < 'u' ? g : !!(D.startAdornment || D.filled || D.focused),
            }),
          fullWidth: d,
          inputComponent: p,
          multiline: v,
          ref: o,
          type: f,
        },
        S,
        { classes: x({}, w, { notchedOutline: null }) },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (os.propTypes = {
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
    inputRef: qt,
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
os.muiName = 'Input';
const fd = os;
function cE(e) {
  return Ue('MuiSelect', e);
}
const uE = Be('MuiSelect', [
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
  Or = uE;
var oc;
const dE = [
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
  pE = ge('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`&.${Or.select}`]: t.select },
        { [`&.${Or.select}`]: t[o.variant] },
        { [`&.${Or.multiple}`]: t.multiple },
      ];
    },
  })(cd, {
    [`&.${Or.select}`]: {
      height: 'auto',
      minHeight: '1.4375em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  fE = ge('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${ue(o.variant)}`], o.open && t.iconOpen];
    },
  })(ud),
  mE = ge('input', {
    shouldForwardProp: (e) => Fa(e) && e !== 'classes',
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
function rc(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function hE(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const bE = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${ue(o)}`, a && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return Ge(s, cE, t);
  },
  md = C.forwardRef(function (t, o) {
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
        multiple: S,
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
        tabIndex: z,
        value: j,
        variant: P = 'standard',
      } = t,
      V = Re(t, dE),
      [B, Q] = Gn({ controlled: j, default: d, name: 'Select' }),
      [ie, Z] = Gn({ controlled: D, default: u, name: 'Select' }),
      _ = C.useRef(null),
      W = C.useRef(null),
      [ne, H] = C.useState(null),
      { current: K } = C.useRef(D != null),
      [oe, ee] = C.useState(),
      re = Ot(o, g),
      ce = C.useCallback((se) => {
        (W.current = se), se && H(se);
      }, []),
      de = ne == null ? void 0 : ne.parentNode;
    C.useImperativeHandle(
      re,
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
        u && ie && ne && !K && (ee(s ? null : de.clientWidth), W.current.focus());
      }, [ne, s]),
      C.useEffect(() => {
        a && W.current.focus();
      }, [a]),
      C.useEffect(() => {
        if (!h) return;
        const se = St(W.current).getElementById(h);
        if (se) {
          const Ce = () => {
            getSelection().isCollapsed && W.current.focus();
          };
          return (
            se.addEventListener('click', Ce),
            () => {
              se.removeEventListener('click', Ce);
            }
          );
        }
      }, [h]);
    const xe = (se, Ce) => {
        se ? R && R(Ce) : m && m(Ce), K || (ee(s ? null : de.clientWidth), Z(se));
      },
      le = (se) => {
        se.button === 0 && (se.preventDefault(), W.current.focus(), xe(!0, se));
      },
      L = (se) => {
        xe(!1, se);
      },
      Te = C.Children.toArray(l),
      F = (se) => {
        const Ce = Te.map((De) => De.props.value).indexOf(se.target.value);
        if (Ce === -1) return;
        const Se = Te[Ce];
        Q(Se.props.value), y && y(se, Se);
      },
      G = (se) => (Ce) => {
        let Se;
        if (Ce.currentTarget.hasAttribute('tabindex')) {
          if (S) {
            Se = Array.isArray(B) ? B.slice() : [];
            const De = B.indexOf(se.props.value);
            De === -1 ? Se.push(se.props.value) : Se.splice(De, 1);
          } else Se = se.props.value;
          if ((se.props.onClick && se.props.onClick(Ce), B !== Se && (Q(Se), y))) {
            const De = Ce.nativeEvent || Ce,
              bt = new De.constructor(De.type, De);
            Object.defineProperty(bt, 'target', { writable: !0, value: { value: Se, name: w } }),
              y(bt, se);
          }
          S || xe(!1, Ce);
        }
      },
      Le = (se) => {
        $ ||
          ([' ', 'ArrowUp', 'ArrowDown', 'Enter'].indexOf(se.key) !== -1 &&
            (se.preventDefault(), xe(!0, se)));
      },
      ve = ne !== null && ie,
      Fe = (se) => {
        !ve &&
          E &&
          (Object.defineProperty(se, 'target', { writable: !0, value: { value: B, name: w } }),
          E(se));
      };
    delete V['aria-invalid'];
    let He, Pe;
    const Ae = [];
    let ut = !1,
      ht = !1;
    (Ja({ value: B }) || b) && (N ? (He = N(B)) : (ut = !0));
    const ae = Te.map((se) => {
      if (!C.isValidElement(se)) return null;
      process.env.NODE_ENV !== 'production' &&
        qa.isFragment(se) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let Ce;
      if (S) {
        if (!Array.isArray(B))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : jn(2),
          );
        (Ce = B.some((Se) => rc(Se, se.props.value))), Ce && ut && Ae.push(se.props.children);
      } else (Ce = rc(B, se.props.value)), Ce && ut && (Pe = se.props.children);
      return (
        Ce && (ht = !0),
        C.cloneElement(se, {
          'aria-selected': Ce ? 'true' : 'false',
          onClick: G(se),
          onKeyUp: (Se) => {
            Se.key === ' ' && Se.preventDefault(), se.props.onKeyUp && se.props.onKeyUp(Se);
          },
          role: 'option',
          selected: Ce,
          value: void 0,
          'data-value': se.props.value,
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      C.useEffect(() => {
        if (!ht && !S && B !== '') {
          const se = Te.map((Ce) => Ce.props.value);
          console.warn(
            [
              `MUI: You have provided an out-of-range value \`${B}\` for the select ${
                w ? `(name="${w}") ` : ''
              }component.`,
              "Consider providing a value that matches one of the available options or ''.",
              `The available values are ${
                se
                  .filter((Ce) => Ce != null)
                  .map((Ce) => `\`${Ce}\``)
                  .join(', ') || '""'
              }.`,
            ].join(`
`),
          );
        }
      }, [ht, Te, S, w, B]),
      ut &&
        (S
          ? Ae.length === 0
            ? (He = null)
            : (He = Ae.reduce(
                (se, Ce, Se) => (se.push(Ce), Se < Ae.length - 1 && se.push(', '), se),
                [],
              ))
          : (He = Pe));
    let ye = oe;
    !s && K && ne && (ye = de.clientWidth);
    let we;
    typeof z < 'u' ? (we = z) : (we = p ? null : 0);
    const U = k.id || (w ? `mui-component-select-${w}` : void 0),
      fe = x({}, t, { variant: P, value: B, open: ve }),
      pe = bE(fe);
    return je(C.Fragment, {
      children: [
        I(
          pE,
          x(
            {
              ref: ce,
              tabIndex: we,
              role: 'button',
              'aria-disabled': p ? 'true' : void 0,
              'aria-expanded': ve ? 'true' : 'false',
              'aria-haspopup': 'listbox',
              'aria-label': i,
              'aria-labelledby': [h, U].filter(Boolean).join(' ') || void 0,
              'aria-describedby': r,
              onKeyDown: Le,
              onMouseDown: p || $ ? null : le,
              onBlur: Fe,
              onFocus: O,
            },
            k,
            {
              ownerState: fe,
              className: Ee(k.className, pe.select, c),
              id: U,
              children: hE(He)
                ? oc || (oc = I('span', { className: 'notranslate', children: '​' }))
                : He,
            },
          ),
        ),
        I(
          mE,
          x(
            {
              value: Array.isArray(B) ? B.join(',') : B,
              name: w,
              ref: _,
              'aria-hidden': !0,
              onChange: F,
              tabIndex: -1,
              disabled: p,
              className: pe.nativeInput,
              autoFocus: a,
              ownerState: fe,
            },
            V,
          ),
        ),
        I(fE, { as: v, className: pe.icon, ownerState: fe }),
        I(
          zx,
          x(
            {
              id: `menu-${w || ''}`,
              anchorEl: de,
              open: ve,
              onClose: L,
              anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
              transformOrigin: { vertical: 'top', horizontal: 'center' },
            },
            f,
            {
              MenuListProps: x(
                { 'aria-labelledby': h, role: 'listbox', disableListWrap: !0 },
                f.MenuListProps,
              ),
              PaperProps: x({}, f.PaperProps, {
                style: x({ minWidth: ye }, f.PaperProps != null ? f.PaperProps.style : null),
              }),
              children: ae,
            },
          ),
        ),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (md.propTypes = {
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
    inputRef: qt,
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
const gE = md;
var ic, ac;
const vE = [
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
  yE = (e) => {
    const { classes: t } = e;
    return t;
  },
  rs = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => xn(e) && e !== 'variant',
    slot: 'Root',
  },
  xE = ge(ed, rs)(''),
  EE = ge(fd, rs)(''),
  CE = ge(Yu, rs)(''),
  is = C.forwardRef(function (t, o) {
    const r = Je({ name: 'MuiSelect', props: t }),
      {
        autoWidth: i = !1,
        children: a,
        classes: s = {},
        className: l,
        defaultOpen: c = !1,
        displayEmpty: u = !1,
        IconComponent: d = Lu,
        id: p,
        input: b,
        inputProps: v,
        label: g,
        labelId: h,
        MenuProps: f,
        multiple: S = !1,
        native: w = !1,
        onClose: E,
        onOpen: y,
        open: m,
        renderValue: O,
        SelectDisplayProps: R,
        variant: D = 'outlined',
      } = r,
      $ = Re(r, vE),
      N = w ? eE : gE,
      k = eo(),
      j = Ro({ props: r, muiFormControl: k, states: ['variant'] }).variant || D,
      P =
        b ||
        {
          standard: ic || (ic = I(xE, {})),
          outlined: I(EE, { label: g }),
          filled: ac || (ac = I(CE, {})),
        }[j],
      V = x({}, r, { variant: j, classes: s }),
      B = yE(V),
      Q = Ot(o, P.ref);
    return I(C.Fragment, {
      children: C.cloneElement(
        P,
        x(
          {
            inputComponent: N,
            inputProps: x(
              { children: a, IconComponent: d, variant: j, type: void 0, multiple: S },
              w
                ? { id: p }
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
                    SelectDisplayProps: x({ id: p }, R),
                  },
              v,
              { classes: v ? ln(B, v.classes) : B },
              b ? b.props.inputProps : {},
            ),
          },
          S && w && j === 'outlined' ? { notched: !0 } : {},
          { ref: Q, className: Ee(P.props.className, l) },
          !b && { variant: j },
          $,
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (is.propTypes = {
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
is.muiName = 'Select';
const wE = is,
  SE = (e) => !e || !Fn(e),
  TE = SE;
function RE(e) {
  return Ue('MuiSlider', e);
}
const OE = Be('MuiSlider', [
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
  bn = OE,
  kE = (e) => {
    const { open: t } = e;
    return {
      offset: Ee(t && bn.valueLabelOpen),
      circle: bn.valueLabelCircle,
      label: bn.valueLabelLabel,
    };
  };
function hd(e) {
  const { children: t, className: o, value: r } = e,
    i = kE(e);
  return t
    ? C.cloneElement(
        t,
        { className: Ee(t.props.className) },
        je(C.Fragment, {
          children: [
            t.props.children,
            I('span', {
              className: Ee(i.offset, o),
              'aria-hidden': !0,
              children: I('span', {
                className: i.circle,
                children: I('span', { className: i.label, children: r }),
              }),
            }),
          ],
        }),
      )
    : null;
}
process.env.NODE_ENV !== 'production' &&
  (hd.propTypes = { children: n.element.isRequired, className: n.string, value: n.node });
const NE = [
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
function sc(e) {
  return e;
}
const bd = ge('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      t[`color${ue(o.color)}`],
      o.size !== 'medium' && t[`size${ue(o.size)}`],
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
          '@media (pointer: coarse)': { padding: '20px 0' },
        },
        t.size === 'small' && { height: 2 },
        t.marked && { marginBottom: 20 },
      ),
    t.orientation === 'vertical' &&
      x(
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
      [`&.${bn.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        color: (e.vars || e).palette.grey[400],
      },
      [`&.${bn.dragging}`]: { [`& .${bn.thumb}, & .${bn.track}`]: { transition: 'none' } },
    },
  ),
);
process.env.NODE_ENV !== 'production' && (bd.propTypes = { children: n.node });
const gd = ge('span', { name: 'MuiSlider', slot: 'Rail', overridesResolver: (e, t) => t.rail })(
  ({ ownerState: e }) =>
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
      e.track === 'inverted' && { opacity: 1 },
    ),
);
process.env.NODE_ENV !== 'production' && (gd.propTypes = { children: n.node });
const vd = ge('span', { name: 'MuiSlider', slot: 'Track', overridesResolver: (e, t) => t.track })(
  ({ theme: e, ownerState: t }) => {
    const o =
      e.palette.mode === 'light'
        ? pi(e.palette[t.color].main, 0.62)
        : di(e.palette[t.color].main, 0.5);
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
process.env.NODE_ENV !== 'production' && (vd.propTypes = { children: n.node });
const yd = ge('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.thumb,
      t[`thumbColor${ue(o.color)}`],
      o.size !== 'medium' && t[`thumbSize${ue(o.size)}`],
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
    t.size === 'small' && { width: 12, height: 12 },
    t.orientation === 'horizontal' && { top: '50%', transform: 'translate(-50%, -50%)' },
    t.orientation === 'vertical' && { left: '50%', transform: 'translate(-50%, 50%)' },
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
      [`&:hover, &.${bn.focusVisible}`]: {
        boxShadow: `0px 0px 0px 8px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : lt(e.palette[t.color].main, 0.16)
        }`,
        '@media (hover: none)': { boxShadow: 'none' },
      },
      [`&.${bn.active}`]: {
        boxShadow: `0px 0px 0px 14px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : lt(e.palette[t.color].main, 0.16)
        }`,
      },
      [`&.${bn.disabled}`]: { '&:hover': { boxShadow: 'none' } },
    },
  ),
);
process.env.NODE_ENV !== 'production' && (yd.propTypes = { children: n.node });
const xd = ge(hd, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) =>
  x(
    {
      [`&.${bn.valueLabelOpen}`]: { transform: 'translateY(-100%) scale(1)' },
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
process.env.NODE_ENV !== 'production' && (xd.propTypes = { children: n.node });
const Ed = ge('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => Fa(e) && e !== 'markActive',
  overridesResolver: (e, t) => {
    const { markActive: o } = e;
    return [t.mark, o && t.markActive];
  },
})(({ theme: e, ownerState: t, markActive: o }) =>
  x(
    { position: 'absolute', width: 2, height: 2, borderRadius: 1, backgroundColor: 'currentColor' },
    t.orientation === 'horizontal' && { top: '50%', transform: 'translate(-1px, -50%)' },
    t.orientation === 'vertical' && { left: '50%', transform: 'translate(-50%, 1px)' },
    o && { backgroundColor: (e.vars || e).palette.background.paper, opacity: 0.8 },
  ),
);
process.env.NODE_ENV !== 'production' && (Ed.propTypes = { children: n.node });
const Cd = ge('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => Fa(e) && e !== 'markLabelActive',
  overridesResolver: (e, t) => t.markLabel,
})(({ theme: e, ownerState: t, markLabelActive: o }) =>
  x(
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
process.env.NODE_ENV !== 'production' && (Cd.propTypes = { children: n.node });
const $E = (e) => {
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
          l && `color${ue(l)}`,
          c && `size${ue(c)}`,
        ],
        rail: ['rail'],
        track: ['track'],
        mark: ['mark'],
        markActive: ['markActive'],
        markLabel: ['markLabel'],
        markLabelActive: ['markLabelActive'],
        valueLabel: ['valueLabel'],
        thumb: ['thumb', t && 'disabled', c && `thumbSize${ue(c)}`, l && `thumbColor${ue(l)}`],
        active: ['active'],
        disabled: ['disabled'],
        focusVisible: ['focusVisible'],
      };
    return Ge(u, RE, s);
  },
  PE = ({ children: e }) => e,
  wd = C.forwardRef(function (t, o) {
    var r, i, a, s, l, c, u, d, p, b, v, g, h, f, S, w, E, y, m, O, R, D, $, N;
    const k = Je({ props: t, name: 'MuiSlider' }),
      j = So().direction === 'rtl',
      {
        'aria-label': P,
        'aria-valuetext': V,
        'aria-labelledby': B,
        component: Q = 'span',
        components: ie = {},
        componentsProps: Z = {},
        color: _ = 'primary',
        classes: W,
        className: ne,
        disableSwap: H = !1,
        disabled: K = !1,
        getAriaLabel: oe,
        getAriaValueText: ee,
        marks: re = !1,
        max: ce = 100,
        min: de = 0,
        orientation: xe = 'horizontal',
        size: le = 'medium',
        step: L = 1,
        scale: Te = sc,
        slotProps: F,
        slots: G,
        track: Le = 'normal',
        valueLabelDisplay: ve = 'off',
        valueLabelFormat: Fe = sc,
      } = k,
      He = Re(k, NE),
      Pe = x({}, k, {
        isRtl: j,
        max: ce,
        min: de,
        classes: W,
        disabled: K,
        disableSwap: H,
        orientation: xe,
        marks: re,
        color: _,
        size: le,
        step: L,
        scale: Te,
        track: Le,
        valueLabelDisplay: ve,
        valueLabelFormat: Fe,
      }),
      {
        axisProps: Ae,
        getRootProps: ut,
        getHiddenInputProps: ht,
        getThumbProps: ae,
        open: ye,
        active: we,
        axis: U,
        focusedThumbIndex: fe,
        range: pe,
        dragging: se,
        marks: Ce,
        values: Se,
        trackOffset: De,
        trackLeap: bt,
      } = fv(x({}, Pe, { ref: o }));
    (Pe.marked = Ce.length > 0 && Ce.some((A) => A.label)),
      (Pe.dragging = se),
      (Pe.focusedThumbIndex = fe);
    const dt = $E(Pe),
      It = (r = (i = G == null ? void 0 : G.root) != null ? i : ie.Root) != null ? r : bd,
      Qt = (a = (s = G == null ? void 0 : G.rail) != null ? s : ie.Rail) != null ? a : gd,
      _t = (l = (c = G == null ? void 0 : G.track) != null ? c : ie.Track) != null ? l : vd,
      Tt = (u = (d = G == null ? void 0 : G.thumb) != null ? d : ie.Thumb) != null ? u : yd,
      Rt =
        (p = (b = G == null ? void 0 : G.valueLabel) != null ? b : ie.ValueLabel) != null ? p : xd,
      vt = (v = (g = G == null ? void 0 : G.mark) != null ? g : ie.Mark) != null ? v : Ed,
      We = (h = (f = G == null ? void 0 : G.markLabel) != null ? f : ie.MarkLabel) != null ? h : Cd,
      pt = (S = (w = G == null ? void 0 : G.input) != null ? w : ie.Input) != null ? S : 'input',
      Et = (E = F == null ? void 0 : F.root) != null ? E : Z.root,
      en = (y = F == null ? void 0 : F.rail) != null ? y : Z.rail,
      Dt = (m = F == null ? void 0 : F.track) != null ? m : Z.track,
      tn = (O = F == null ? void 0 : F.thumb) != null ? O : Z.thumb,
      zt = (R = F == null ? void 0 : F.valueLabel) != null ? R : Z.valueLabel,
      nn = (D = F == null ? void 0 : F.mark) != null ? D : Z.mark,
      pn = ($ = F == null ? void 0 : F.markLabel) != null ? $ : Z.markLabel,
      fn = (N = F == null ? void 0 : F.input) != null ? N : Z.input,
      mt = rn({
        elementType: It,
        getSlotProps: ut,
        externalSlotProps: Et,
        externalForwardedProps: He,
        additionalProps: x({}, TE(It) && { as: Q }),
        ownerState: x({}, Pe, Et == null ? void 0 : Et.ownerState),
        className: [dt.root, ne],
      }),
      on = rn({ elementType: Qt, externalSlotProps: en, ownerState: Pe, className: dt.rail }),
      Ve = rn({
        elementType: _t,
        externalSlotProps: Dt,
        additionalProps: { style: x({}, Ae[U].offset(De), Ae[U].leap(bt)) },
        ownerState: x({}, Pe, Dt == null ? void 0 : Dt.ownerState),
        className: dt.track,
      }),
      yt = rn({
        elementType: Tt,
        getSlotProps: ae,
        externalSlotProps: tn,
        ownerState: x({}, Pe, tn == null ? void 0 : tn.ownerState),
        className: dt.thumb,
      }),
      Bt = rn({
        elementType: Rt,
        externalSlotProps: zt,
        ownerState: x({}, Pe, zt == null ? void 0 : zt.ownerState),
        className: dt.valueLabel,
      }),
      T = rn({ elementType: vt, externalSlotProps: nn, ownerState: Pe, className: dt.mark }),
      q = rn({ elementType: We, externalSlotProps: pn, ownerState: Pe, className: dt.markLabel }),
      me = rn({ elementType: pt, getSlotProps: ht, externalSlotProps: fn, ownerState: Pe });
    return je(
      It,
      x({}, mt, {
        children: [
          I(Qt, x({}, on)),
          I(_t, x({}, Ve)),
          Ce.filter((A) => A.value >= de && A.value <= ce).map((A, M) => {
            const X = Wr(A.value, de, ce),
              Y = Ae[U].offset(X);
            let he;
            return (
              Le === !1
                ? (he = Se.indexOf(A.value) !== -1)
                : (he =
                    (Le === 'normal' &&
                      (pe ? A.value >= Se[0] && A.value <= Se[Se.length - 1] : A.value <= Se[0])) ||
                    (Le === 'inverted' &&
                      (pe ? A.value <= Se[0] || A.value >= Se[Se.length - 1] : A.value >= Se[0]))),
              je(
                C.Fragment,
                {
                  children: [
                    I(
                      vt,
                      x({ 'data-index': M }, T, !Fn(vt) && { markActive: he }, {
                        style: x({}, Y, T.style),
                        className: Ee(T.className, he && dt.markActive),
                      }),
                    ),
                    A.label != null
                      ? I(
                          We,
                          x(
                            { 'aria-hidden': !0, 'data-index': M },
                            q,
                            !Fn(We) && { markLabelActive: he },
                            {
                              style: x({}, Y, q.style),
                              className: Ee(dt.markLabel, q.className, he && dt.markLabelActive),
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
          Se.map((A, M) => {
            const X = Wr(A, de, ce),
              Y = Ae[U].offset(X),
              he = ve === 'off' ? PE : Rt;
            return I(
              he,
              x(
                {},
                !Fn(he) && {
                  valueLabelFormat: Fe,
                  valueLabelDisplay: ve,
                  value: typeof Fe == 'function' ? Fe(Te(A), M) : Fe,
                  index: M,
                  open: ye === M || we === M || ve === 'on',
                  disabled: K,
                },
                Bt,
                {
                  children: I(
                    Tt,
                    x({ 'data-index': M }, yt, {
                      className: Ee(
                        dt.thumb,
                        yt.className,
                        we === M && dt.active,
                        fe === M && dt.focusVisible,
                      ),
                      style: x({}, Y, { pointerEvents: H && we !== M ? 'none' : void 0 }, yt.style),
                      children: I(
                        pt,
                        x(
                          {
                            'data-index': M,
                            'aria-label': oe ? oe(M) : P,
                            'aria-valuenow': Te(A),
                            'aria-labelledby': B,
                            'aria-valuetext': ee ? ee(Te(A), M) : V,
                            value: Se[M],
                          },
                          me,
                        ),
                      ),
                    }),
                  ),
                },
              ),
              M,
            );
          }),
        ],
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (wd.propTypes = {
    'aria-label': vn(n.string, (e) =>
      Array.isArray(e.value || e.defaultValue) && e['aria-label'] != null
        ? new Error(
            'MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
          )
        : null,
    ),
    'aria-labelledby': n.string,
    'aria-valuetext': vn(n.string, (e) =>
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
const IE = wd;
function _E(e) {
  return Ue('MuiSnackbarContent', e);
}
Be('MuiSnackbarContent', ['root', 'message', 'action']);
const ME = ['action', 'className', 'message', 'role'],
  AE = (e) => {
    const { classes: t } = e;
    return Ge({ root: ['root'], action: ['action'], message: ['message'] }, _E, t);
  },
  DE = ge(lr, { name: 'MuiSnackbarContent', slot: 'Root', overridesResolver: (e, t) => t.root })(
    ({ theme: e }) => {
      const t = e.palette.mode === 'light' ? 0.8 : 0.98,
        o = Bh(e.palette.background.default, t);
      return x({}, e.typography.body2, {
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
  LE = ge('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({ padding: '8px 0' }),
  FE = ge('div', {
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
  Sd = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiSnackbarContent' }),
      { action: i, className: a, message: s, role: l = 'alert' } = r,
      c = Re(r, ME),
      u = r,
      d = AE(u);
    return je(
      DE,
      x({ role: l, square: !0, elevation: 6, className: Ee(d.root, a), ownerState: u, ref: o }, c, {
        children: [
          I(LE, { className: d.message, ownerState: u, children: s }),
          i ? I(FE, { className: d.action, ownerState: u, children: i }) : null,
        ],
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Sd.propTypes = {
    action: n.node,
    classes: n.object,
    className: n.string,
    message: n.node,
    role: n.string,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const jE = Sd;
function zE(e) {
  return Ue('MuiSnackbar', e);
}
Be('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const VE = ['onEnter', 'onExited'],
  BE = [
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
  WE = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = { root: ['root', `anchorOrigin${ue(o.vertical)}${ue(o.horizontal)}`] };
    return Ge(r, zE, t);
  },
  lc = ge('div', {
    name: 'MuiSnackbar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[`anchorOrigin${ue(o.anchorOrigin.vertical)}${ue(o.anchorOrigin.horizontal)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    const o = { left: '50%', right: 'auto', transform: 'translateX(-50%)' };
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
      t.anchorOrigin.vertical === 'top' ? { top: 8 } : { bottom: 8 },
      t.anchorOrigin.horizontal === 'left' && { justifyContent: 'flex-start' },
      t.anchorOrigin.horizontal === 'right' && { justifyContent: 'flex-end' },
      {
        [e.breakpoints.up('sm')]: x(
          {},
          t.anchorOrigin.vertical === 'top' ? { top: 24 } : { bottom: 24 },
          t.anchorOrigin.horizontal === 'center' && o,
          t.anchorOrigin.horizontal === 'left' && { left: 24, right: 'auto' },
          t.anchorOrigin.horizontal === 'right' && { right: 24, left: 'auto' },
        ),
      },
    );
  }),
  Td = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiSnackbar' }),
      i = So(),
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
        ClickAwayListenerProps: b,
        ContentProps: v,
        disableWindowBlurListener: g = !1,
        message: h,
        open: f,
        TransitionComponent: S = Qu,
        transitionDuration: w = a,
        TransitionProps: { onEnter: E, onExited: y } = {},
      } = r,
      m = Re(r.TransitionProps, VE),
      O = Re(r, BE),
      R = x({}, r, {
        anchorOrigin: { vertical: l, horizontal: c },
        autoHideDuration: u,
        disableWindowBlurListener: g,
        TransitionComponent: S,
        transitionDuration: w,
      }),
      D = WE(R),
      { getRootProps: $, onClickAway: N } = mv(x({}, R, { ref: o })),
      [k, z] = C.useState(!0),
      j = rn({
        elementType: lc,
        getSlotProps: $,
        externalForwardedProps: O,
        ownerState: R,
        className: [D.root, p],
      }),
      P = (B) => {
        z(!0), y && y(B);
      },
      V = (B, Q) => {
        z(!1), E && E(B, Q);
      };
    return !f && k
      ? null
      : I(
          Fr,
          x({ onClickAway: N }, b, {
            children: I(
              lc,
              x({}, j, {
                children: I(
                  S,
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
                    { children: d || I(jE, x({ message: h, action: s }, v)) },
                  ),
                ),
              }),
            ),
          }),
        );
  });
process.env.NODE_ENV !== 'production' &&
  (Td.propTypes = {
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
const UE = Td;
function HE(e) {
  return Ue('MuiSwitch', e);
}
const qE = Be('MuiSwitch', [
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
  Vt = qE,
  KE = ['className', 'color', 'edge', 'size', 'sx'],
  YE = (e) => {
    const { classes: t, edge: o, size: r, color: i, checked: a, disabled: s } = e,
      l = {
        root: ['root', o && `edge${ue(o)}`, `size${ue(r)}`],
        switchBase: ['switchBase', `color${ue(i)}`, a && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = Ge(l, HE, t);
    return x({}, t, c);
  },
  GE = ge('span', {
    name: 'MuiSwitch',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.edge && t[`edge${ue(o.edge)}`], t[`size${ue(o.size)}`]];
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
        verticalAlign: 'middle',
        '@media print': { colorAdjust: 'exact' },
      },
      e.edge === 'start' && { marginLeft: -8 },
      e.edge === 'end' && { marginRight: -8 },
      e.size === 'small' && {
        width: 40,
        height: 24,
        padding: 7,
        [`& .${Vt.thumb}`]: { width: 16, height: 16 },
        [`& .${Vt.switchBase}`]: {
          padding: 4,
          [`&.${Vt.checked}`]: { transform: 'translateX(16px)' },
        },
      },
    ),
  ),
  XE = ge(Hu, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        { [`& .${Vt.input}`]: t.input },
        o.color !== 'default' && t[`color${ue(o.color)}`],
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
      [`&.${Vt.checked}`]: { transform: 'translateX(20px)' },
      [`&.${Vt.disabled}`]: {
        color: e.vars
          ? e.vars.palette.Switch.defaultDisabledColor
          : `${e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[600]}`,
      },
      [`&.${Vt.checked} + .${Vt.track}`]: { opacity: 0.5 },
      [`&.${Vt.disabled} + .${Vt.track}`]: {
        opacity: e.vars
          ? e.vars.opacity.switchTrackDisabled
          : `${e.palette.mode === 'light' ? 0.12 : 0.2}`,
      },
      [`& .${Vt.input}`]: { left: '-100%', width: '300%' },
    }),
    ({ theme: e, ownerState: t }) =>
      x(
        {
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
              : lt(e.palette.action.active, e.palette.action.hoverOpacity),
            '@media (hover: none)': { backgroundColor: 'transparent' },
          },
        },
        t.color !== 'default' && {
          [`&.${Vt.checked}`]: {
            color: (e.vars || e).palette[t.color].main,
            '&:hover': {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : lt(e.palette[t.color].main, e.palette.action.hoverOpacity),
              '@media (hover: none)': { backgroundColor: 'transparent' },
            },
            [`&.${Vt.disabled}`]: {
              color: e.vars
                ? e.vars.palette.Switch[`${t.color}DisabledColor`]
                : `${
                    e.palette.mode === 'light'
                      ? pi(e.palette[t.color].main, 0.62)
                      : di(e.palette[t.color].main, 0.55)
                  }`,
            },
          },
          [`&.${Vt.checked} + .${Vt.track}`]: {
            backgroundColor: (e.vars || e).palette[t.color].main,
          },
        },
      ),
  ),
  JE = ge('span', { name: 'MuiSwitch', slot: 'Track', overridesResolver: (e, t) => t.track })(
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
  ZE = ge('span', { name: 'MuiSwitch', slot: 'Thumb', overridesResolver: (e, t) => t.thumb })(
    ({ theme: e }) => ({
      boxShadow: (e.vars || e).shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%',
    }),
  ),
  Rd = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiSwitch' }),
      { className: i, color: a = 'primary', edge: s = !1, size: l = 'medium', sx: c } = r,
      u = Re(r, KE),
      d = x({}, r, { color: a, edge: s, size: l }),
      p = YE(d),
      b = I(ZE, { className: p.thumb, ownerState: d });
    return je(GE, {
      className: Ee(p.root, i),
      sx: c,
      ownerState: d,
      children: [
        I(
          XE,
          x({ type: 'checkbox', icon: b, checkedIcon: b, ref: o, ownerState: d }, u, {
            classes: x({}, p, { root: p.switchBase }),
          }),
        ),
        I(JE, { className: p.track, ownerState: d }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Rd.propTypes = {
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
    inputRef: qt,
    onChange: n.func,
    required: n.bool,
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    value: n.any,
  });
const QE = Rd;
function eC(e) {
  return Ue('MuiTextField', e);
}
Be('MuiTextField', ['root']);
const tC = [
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
  nC = { standard: ed, filled: Yu, outlined: fd },
  oC = (e) => {
    const { classes: t } = e;
    return Ge({ root: ['root'] }, eC, t);
  },
  rC = ge(H0, { name: 'MuiTextField', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  Od = C.forwardRef(function (t, o) {
    const r = Je({ props: t, name: 'MuiTextField' }),
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
        inputProps: S,
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
        placeholder: z,
        required: j = !1,
        rows: P,
        select: V = !1,
        SelectProps: B,
        type: Q,
        value: ie,
        variant: Z = 'outlined',
      } = r,
      _ = Re(r, tC),
      W = x({}, r, {
        autoFocus: a,
        color: c,
        disabled: d,
        error: p,
        fullWidth: v,
        multiline: R,
        required: j,
        select: V,
        variant: Z,
      }),
      ne = oC(W);
    process.env.NODE_ENV !== 'production' &&
      V &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const H = {};
    Z === 'outlined' && (f && typeof f.shrink < 'u' && (H.notched = f.shrink), (H.label = y)),
      V && ((!B || !B.native) && (H.id = void 0), (H['aria-describedby'] = void 0));
    const K = Pc(h),
      oe = g && K ? `${K}-helper-text` : void 0,
      ee = y && K ? `${K}-label` : void 0,
      re = nC[Z],
      ce = I(
        re,
        x(
          {
            'aria-describedby': oe,
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
            value: ie,
            id: K,
            inputRef: E,
            onBlur: $,
            onChange: N,
            onFocus: k,
            placeholder: z,
            inputProps: S,
          },
          H,
          w,
        ),
      );
    return je(
      rC,
      x(
        {
          className: Ee(ne.root, l),
          disabled: d,
          error: p,
          fullWidth: v,
          ref: o,
          required: j,
          color: c,
          variant: Z,
          ownerState: W,
        },
        _,
        {
          children: [
            y != null && y !== '' && I(mx, x({ htmlFor: K, id: ee }, f, { children: y })),
            V
              ? I(
                  wE,
                  x({ 'aria-describedby': oe, id: K, labelId: ee, value: ie, input: ce }, B, {
                    children: s,
                  }),
                )
              : ce,
            g && I(J0, x({ id: oe }, b, { children: g })),
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Od.propTypes = {
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
    inputRef: qt,
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
const kd = Od;
function Hn({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: i }) {
  return I(m0, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: i,
  });
}
var Kn = ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(Kn || {});
function Nd({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = Kn.After,
  isIndeterminate: r = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const u = I(P0, {
    checked: e,
    indeterminate: r,
    defaultChecked: i,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let d;
  if (t) {
    const p = o === Kn.Before || o === Kn.Above,
      b = I('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      v = o === Kn.Before || o === Kn.After,
      g = v ? b : I('div', { children: b }),
      h = v ? u : I('div', { children: u });
    d = je(Zu, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: a,
      error: s,
      children: [p && g, h, !p && g],
    });
  } else d = u;
  return d;
}
function $d({
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
  return I(Jy, {
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
      I(kd, { ...b, error: r, fullWidth: i, disabled: t, label: e, style: { width: a } }),
  });
}
var iC = Object.defineProperty,
  aC = (e, t, o) =>
    t in e ? iC(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (e[t] = o),
  Me = (e, t, o) => (aC(e, typeof t != 'symbol' ? t + '' : t, o), o);
const fo = class {
  static bookIdToNumber(e, t = !0) {
    return t && (e = e.toUpperCase()), e in this.bookNumbers ? this.bookNumbers[e] : 0;
  }
  static bookNumberToId(e, t = '***') {
    const o = e - 1;
    return o < 0 || o >= fo.allBookIds.length ? t : fo.allBookIds[o];
  }
  static bookNumberToEnglishName(e) {
    return e <= 0 || e > this.lastBook ? '******' : fo.allBookEnglishNames[e - 1];
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
let At = fo;
Me(At, 'allBookIds', [
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
  Me(At, 'nonCanonicalIds', [
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
  Me(At, 'firstBook', 1),
  Me(At, 'lastBook', fo.allBookIds.length),
  Me(At, 'allBookEnglishNames', [
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
  Me(At, 'bookNumbers', fo.createBookNumbers());
var Dn = ((e) => (
  (e[(e.Unknown = 0)] = 'Unknown'),
  (e[(e.Original = 1)] = 'Original'),
  (e[(e.Septuagint = 2)] = 'Septuagint'),
  (e[(e.Vulgate = 3)] = 'Vulgate'),
  (e[(e.English = 4)] = 'English'),
  (e[(e.RussianProtestant = 5)] = 'RussianProtestant'),
  (e[(e.RussianOrthodox = 6)] = 'RussianOrthodox'),
  e
))(Dn || {});
const qn = class {
  constructor(e) {
    if (
      (Me(this, 'name'),
      Me(this, 'fullPath'),
      Me(this, 'isPresent'),
      Me(this, 'hasVerseSegments'),
      Me(this, 'isCustomized'),
      Me(this, 'baseVersification'),
      Me(this, 'scriptureBooks'),
      Me(this, '_type'),
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
let hn = qn;
Me(hn, 'Original', new qn(Dn.Original)),
  Me(hn, 'Septuagint', new qn(Dn.Septuagint)),
  Me(hn, 'Vulgate', new qn(Dn.Vulgate)),
  Me(hn, 'English', new qn(Dn.English)),
  Me(hn, 'RussianProtestant', new qn(Dn.RussianProtestant)),
  Me(hn, 'RussianOrthodox', new qn(Dn.RussianOrthodox));
function cc(e, t) {
  const o = t[0];
  for (let r = 1; r < t.length; r++) e = e.split(t[r]).join(o);
  return e.split(o);
}
var Pd = ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(Pd || {});
const qe = class {
  constructor(e, t, o, r) {
    if (
      (Me(this, 'firstChapter'),
      Me(this, 'lastChapter'),
      Me(this, 'lastVerse'),
      Me(this, 'hasSegmentsDefined'),
      Me(this, 'text'),
      Me(this, 'BBBCCCVVVS'),
      Me(this, 'longHashCode'),
      Me(this, 'versification'),
      Me(this, 'rtlMark', '‏'),
      Me(this, '_bookNum', 0),
      Me(this, '_chapterNum', 0),
      Me(this, '_verseNum', 0),
      Me(this, '_verse'),
      o == null && r == null)
    )
      if (e != null && typeof e == 'string') {
        const i = e,
          a = t != null && t instanceof hn ? t : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t == null)
        if (e != null && e instanceof qe) {
          const i = e;
          (this._bookNum = i.bookNum),
            (this._chapterNum = i.chapterNum),
            (this._verseNum = i.verseNum),
            (this._verse = i.verse),
            (this.versification = i.versification);
        } else {
          if (e == null) return;
          const i = e instanceof hn ? e : qe.defaultVersification;
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
          (this.versification = r ?? qe.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  static parse(e, t = qe.defaultVersification) {
    const o = new qe(t);
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
      return (t = qe.parse(e)), { success: !0, verseRef: t };
    } catch (o) {
      if (o instanceof jo) return (t = new qe()), { success: !1, verseRef: t };
      throw o;
    }
  }
  static getBBBCCCVVV(e, t, o) {
    return (
      (e % qe.bcvMaxValue) * qe.bookDigitShifter +
      (t >= 0 ? (t % qe.bcvMaxValue) * qe.chapterDigitShifter : 0) +
      (o >= 0 ? o % qe.bcvMaxValue : 0)
    );
  }
  static tryGetVerseNum(e) {
    let t;
    if (!e) return (t = -1), { success: !0, vNum: t };
    t = 0;
    let o;
    for (let r = 0; r < e.length; r++) {
      if (((o = e[r]), o < '0' || o > '9')) return r === 0 && (t = -1), { success: !1, vNum: t };
      if (((t = t * 10 + +o - +'0'), t > qe.bcvMaxValue)) return (t = -1), { success: !1, vNum: t };
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
      (this._verse.includes(qe.verseRangeSeparator) ||
        this._verse.includes(qe.verseSequenceIndicator))
    );
  }
  get book() {
    return At.bookNumberToId(this.bookNum, '');
  }
  set book(e) {
    this.bookNum = At.bookIdToNumber(e);
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
    const { success: t, vNum: o } = qe.tryGetVerseNum(e);
    (this._verse = t ? void 0 : e.replace(this.rtlMark, '')),
      (this._verseNum = o),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = qe.tryGetVerseNum(this._verse));
  }
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > At.lastBook)
      throw new jo('BookNum must be greater than zero and less than or equal to last book');
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
    this.versification = this.versification != null ? new hn(e) : void 0;
  }
  get valid() {
    return this.validStatus === 0;
  }
  get validStatus() {
    return this.validateVerse(qe.verseRangeSeparators, qe.verseSequenceIndicators);
  }
  get BBBCCC() {
    return qe.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  get BBBCCCVVV() {
    return qe.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new hn(Dn[a]);
        } catch {
          throw new jo('Invalid reference : ' + e);
        }
    }
    const t = e.trim().split(' ');
    if (t.length !== 2) throw new jo('Invalid reference : ' + e);
    const o = t[1].split(':'),
      r = +o[0];
    if (
      o.length !== 2 ||
      At.bookIdToNumber(t[0]) === 0 ||
      !Number.isInteger(r) ||
      r < 0 ||
      !qe.isVerseParseable(o[1])
    )
      throw new jo('Invalid reference : ' + e);
    this.updateInternal(t[0], o[0], o[1]);
  }
  simplify() {
    this._verse = void 0;
  }
  clone() {
    return new qe(this);
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
  allVerses(e = !1, t = qe.verseRangeSeparators, o = qe.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const r = [],
      i = cc(this._verse, o);
    for (const a of i.map((s) => cc(s, t))) {
      const s = this.clone();
      s.verse = a[0];
      const l = s.verseNum;
      if ((r.push(s), a.length > 1)) {
        const c = this.clone();
        if (((c.verse = a[1]), !e))
          for (let u = l + 1; u < c.verseNum; u++) {
            const d = new qe(this._bookNum, this._chapterNum, u, this.versification);
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
      : this._bookNum <= 0 || this._bookNum > At.lastBook
      ? 2
      : 0;
  }
  setEmpty(e = qe.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = e);
  }
  updateInternal(e, t, o) {
    (this.bookNum = At.bookIdToNumber(e)), (this.chapter = t), (this.verse = o);
  }
};
let $n = qe;
Me($n, 'defaultVersification', hn.English),
  Me($n, 'verseRangeSeparator', '-'),
  Me($n, 'verseSequenceIndicator', ','),
  Me($n, 'verseRangeSeparators', [qe.verseRangeSeparator]),
  Me($n, 'verseSequenceIndicators', [qe.verseSequenceIndicator]),
  Me($n, 'chapterDigitShifter', 1e3),
  Me($n, 'bookDigitShifter', qe.chapterDigitShifter * qe.chapterDigitShifter),
  Me($n, 'bcvMaxValue', qe.chapterDigitShifter - 1),
  Me($n, 'ValidStatusType', Pd);
class jo extends Error {}
const Id = [
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
function uc() {
  return At.allBookIds.map((e) => ({ bookId: e, label: At.bookIdToEnglishName(e) }));
}
function dc(e) {
  return { bookId: At.bookNumberToId(e), label: At.bookNumberToEnglishName(e) };
}
const _d = 1,
  sC = Id.length - 1,
  Md = 1,
  Ad = 1,
  Dd = (e) => {
    var t;
    return ((t = Id[e]) == null ? void 0 : t.chapters) ?? -1;
  },
  pc = (e, t) => ({
    bookNum: Math.max(_d, Math.min(e.bookNum + t, sC)),
    chapterNum: 1,
    verseNum: 1,
  }),
  fc = (e, t) => ({
    ...e,
    chapterNum: Math.min(Math.max(Md, e.chapterNum + t), Dd(e.bookNum)),
    verseNum: 1,
  }),
  mc = (e, t) => ({ ...e, verseNum: Math.max(Ad, e.verseNum + t) });
function qr({
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
  return I(kd, {
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
function lC({ scrRef: e, handleSubmit: t }) {
  const [o, r] = te.useState(dc(e.bookNum)),
    i = (c) => {
      r(dc(c.bookNum)), t(c);
    },
    a = (c, u) => {
      const p = { bookNum: At.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
      i(p);
    },
    s = (c) => {
      t({ ...e, chapterNum: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verseNum: +c.target.value });
    };
  return je(tr, {
    children: [
      I($d, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: uc(),
        onChange: a,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      I(Hn, { onClick: () => i(pc(e, -1)), isDisabled: e.bookNum <= _d, children: '<' }),
      I(Hn, { onClick: () => i(pc(e, 1)), isDisabled: e.bookNum >= uc().length, children: '>' }),
      I(qr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: s,
      }),
      I(Hn, { onClick: () => t(fc(e, -1)), isDisabled: e.chapterNum <= Md, children: '<' }),
      I(Hn, {
        onClick: () => t(fc(e, 1)),
        isDisabled: e.chapterNum >= Dd(e.bookNum),
        children: '>',
      }),
      I(qr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: l,
      }),
      I(Hn, { onClick: () => t(mc(e, -1)), isDisabled: e.verseNum <= Ad, children: '<' }),
      I(Hn, { onClick: () => t(mc(e, 1)), children: '>' }),
    ],
  });
}
function cC({
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
  return I(IE, {
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
function uC({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: i }) {
  return I(QE, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: i,
  });
}
function dC({
  autoHideDuration: e = null,
  isOpen: t = !1,
  className: o,
  onClose: r,
  anchorOrigin: i = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: a = { action: '', message: '', className: `papi-snackbar ${o ?? ''}` },
  children: s,
}) {
  return I(UE, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: i,
    ContentProps: a,
    children: s,
  });
}
function pC({
  hasAutoFocus: e = !1,
  className: t,
  isDense: o = !1,
  hasDisabledGutters: r = !1,
  hasDivider: i = !1,
  focusVisibleClassName: a,
  onClick: s,
  children: l,
}) {
  return I(Kx, {
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
function _r(e) {
  e == null || e.scrollIntoView({ inline: 'nearest', block: 'nearest' });
}
function Ko(e) {
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
const fC = new Set([
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
function hc(e) {
  return (e.ctrlKey || e.metaKey) && e.key !== 'Control';
}
function mC(e) {
  return !fC.has(e.key);
}
function hC({ key: e, target: t }) {
  return e === 'Tab' &&
    (t instanceof HTMLInputElement ||
      t instanceof HTMLTextAreaElement ||
      t instanceof HTMLSelectElement)
    ? t.matches(
        '.rdg-editor-container > :only-child, .rdg-editor-container > label:only-child > :only-child, .rdg-editor-container > div:only-child > label:only-child > :only-child',
      )
    : !1;
}
const bC = 'm1l09lto7-0-0-beta-33';
function gC(e) {
  return e.map(({ key: t, idx: o, minWidth: r, maxWidth: i }) =>
    I(
      'div',
      {
        className: bC,
        style: { gridColumnStart: o + 1, minWidth: r, maxWidth: i },
        'data-measuring-cell-key': t,
      },
      t,
    ),
  );
}
function vC({ selectedPosition: e, columns: t, rows: o, isGroupRow: r }) {
  const i = t[e.idx],
    a = o[e.rowIdx];
  return !r(a) && Ld(i, a);
}
function Ld(e, t) {
  return (
    e.renderEditCell != null &&
    !e.rowGroup &&
    (typeof e.editable == 'function' ? e.editable(t) : e.editable) !== !1
  );
}
function yC({
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
  if (r === c) return sn(a, i, { type: 'HEADER' });
  if (t && r > c && r <= l + c) return sn(a, i, { type: 'SUMMARY', row: t[r + l] });
  if (r >= 0 && r < e.length) {
    const u = e[r];
    return s(u) ? void 0 : sn(a, i, { type: 'ROW', row: u });
  }
  if (o) return sn(a, i, { type: 'SUMMARY', row: o[r - e.length] });
}
function xC({
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
      const S = r[g];
      if (b(S)) return;
    }
    for (const S of o) {
      const w = S.idx;
      if (w > v) break;
      const E = yC({
        rows: r,
        topSummaryRows: i,
        bottomSummaryRows: a,
        rowIdx: g,
        lastFrozenColumnIndex: d,
        column: S,
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
  return { idx: v, rowIdx: g };
}
function EC({
  maxColIdx: e,
  minRowIdx: t,
  maxRowIdx: o,
  selectedPosition: { rowIdx: r, idx: i },
  shiftKey: a,
}) {
  return a ? i === 0 && r === t : i === e && r === o;
}
const CC = 'c1wupbe7-0-0-beta-33',
  wC = `rdg-cell ${CC}`,
  SC = 'cd0kgiy7-0-0-beta-33',
  TC = `rdg-cell-frozen ${SC}`,
  RC = 'c1730fa47-0-0-beta-33',
  OC = `rdg-cell-frozen-last ${RC}`;
function wi(e, t) {
  return t !== void 0
    ? { '--rdg-grid-row-start': e, '--rdg-row-height': `${t}px` }
    : { '--rdg-grid-row-start': e };
}
function cr(e, t) {
  return {
    gridColumnStart: e.idx + 1,
    gridColumnEnd: t !== void 0 ? `span ${t}` : void 0,
    insetInlineStart: e.frozen ? `var(--rdg-frozen-left-${e.idx})` : void 0,
  };
}
function ur(e, ...t) {
  return Ee(wC, ...t, e.frozen && TC, e.isLastFrozenColumn && OC);
}
const { min: er, max: Kr, round: mw, floor: bc, sign: kC, abs: NC } = Math;
function Gi(e) {
  if (typeof e != 'function')
    throw new Error('Please specify the rowKeyGetter prop to use selection');
}
function Fd(e, { minWidth: t, maxWidth: o }) {
  return (e = Kr(e, t)), typeof o == 'number' && o >= t ? er(e, o) : e;
}
const $C = 'c1hs68w07-0-0-beta-33',
  PC = `rdg-checkbox-label ${$C}`,
  IC = 'cojpd0n7-0-0-beta-33',
  _C = `rdg-checkbox-input ${IC}`,
  MC = 'cwsfieb7-0-0-beta-33',
  AC = `rdg-checkbox ${MC}`,
  DC = 'c1fgadbl7-0-0-beta-33',
  LC = `rdg-checkbox-label-disabled ${DC}`;
function FC({ onChange: e, ...t }) {
  function o(r) {
    e(r.target.checked, r.nativeEvent.shiftKey);
  }
  return je('label', {
    className: Ee(PC, t.disabled && LC),
    children: [
      I('input', { type: 'checkbox', ...t, className: _C, onChange: o }),
      I('div', { className: AC }),
    ],
  });
}
const jC = 'g1w3c5217-0-0-beta-33',
  zC = `rdg-group-cell-content ${jC}`,
  VC = 'cm5tyhw7-0-0-beta-33',
  BC = `rdg-caret ${VC}`;
function WC(e) {
  return I(UC, { ...e });
}
function UC({ groupKey: e, isExpanded: t, tabIndex: o, toggleGroup: r }) {
  function i({ key: s }) {
    s === 'Enter' && r();
  }
  return je('span', {
    className: zC,
    tabIndex: o,
    onKeyDown: i,
    children: [
      e,
      I('svg', {
        viewBox: '0 0 14 8',
        width: '14',
        height: '8',
        className: BC,
        'aria-hidden': !0,
        children: I('path', { d: t ? 'M1 1 L 7 7 L 13 1' : 'M1 7 L 7 1 L 13 7' }),
      }),
    ],
  });
}
function HC(e) {
  try {
    return e.row[e.column.key];
  } catch {
    return null;
  }
}
const jd = te.createContext(void 0),
  qC = jd.Provider;
function as() {
  return te.useContext(jd);
}
function ss({
  value: e,
  tabIndex: t,
  disabled: o,
  onChange: r,
  'aria-label': i,
  'aria-labelledby': a,
}) {
  const s = as().renderCheckbox;
  return s({
    'aria-label': i,
    'aria-labelledby': a,
    tabIndex: t,
    disabled: o,
    checked: e,
    onChange: r,
  });
}
const zd = te.createContext(void 0),
  ls = zd.Provider,
  Vd = te.createContext(void 0),
  KC = Vd.Provider;
function cs() {
  const e = te.useContext(zd),
    t = te.useContext(Vd);
  if (e === void 0 || t === void 0)
    throw new Error('useRowSelection must be used within DataGrid cells');
  return [e, t];
}
const Yr = 'select-row';
function YC(e) {
  const [t, o] = cs();
  return I(ss, {
    'aria-label': 'Select All',
    tabIndex: e.tabIndex,
    value: t,
    onChange: (r) => {
      o({ type: 'HEADER', checked: r });
    },
  });
}
function GC(e) {
  const [t, o] = cs();
  return I(ss, {
    'aria-label': 'Select',
    tabIndex: e.tabIndex,
    value: t,
    onChange: (r, i) => {
      o({ type: 'ROW', row: e.row, checked: r, isShiftClick: i });
    },
  });
}
function XC(e) {
  const [t, o] = cs();
  return I(ss, {
    'aria-label': 'Select Group',
    tabIndex: e.tabIndex,
    value: t,
    onChange: (r) => {
      o({ type: 'ROW', row: e.row, checked: r, isShiftClick: !1 });
    },
  });
}
const JC = {
    key: Yr,
    name: '',
    width: 35,
    minWidth: 35,
    maxWidth: 35,
    resizable: !1,
    sortable: !1,
    frozen: !0,
    renderHeaderCell(e) {
      return I(YC, { ...e });
    },
    renderCell(e) {
      return I(GC, { ...e });
    },
    renderGroupCell(e) {
      return I(XC, { ...e });
    },
  },
  ZC = 'auto',
  QC = 50;
function e1({
  rawColumns: e,
  measuredColumnWidths: t,
  resizedColumnWidths: o,
  viewportWidth: r,
  scrollLeft: i,
  defaultColumnOptions: a,
  rawGroupBy: s,
  enableVirtualization: l,
}) {
  const c = (a == null ? void 0 : a.width) ?? ZC,
    u = (a == null ? void 0 : a.minWidth) ?? QC,
    d = (a == null ? void 0 : a.maxWidth) ?? void 0,
    p = (a == null ? void 0 : a.renderCell) ?? HC,
    b = (a == null ? void 0 : a.sortable) ?? !1,
    v = (a == null ? void 0 : a.resizable) ?? !1,
    {
      columns: g,
      colSpanColumns: h,
      lastFrozenColumnIndex: f,
      groupBy: S,
    } = te.useMemo(() => {
      const D = [];
      let $ = -1;
      const N = e.map((z) => {
        const j = (s == null ? void 0 : s.includes(z.key)) ?? !1,
          P = j || z.frozen || !1,
          V = {
            ...z,
            idx: 0,
            frozen: P,
            isLastFrozenColumn: !1,
            rowGroup: j,
            width: z.width ?? c,
            minWidth: z.minWidth ?? u,
            maxWidth: z.maxWidth ?? d,
            sortable: z.sortable ?? b,
            resizable: z.resizable ?? v,
            renderCell: z.renderCell ?? p,
          };
        return j && (V.renderGroupCell ?? (V.renderGroupCell = WC)), P && $++, V;
      });
      N.sort(({ key: z, frozen: j }, { key: P, frozen: V }) =>
        z === Yr
          ? -1
          : P === Yr
          ? 1
          : s != null && s.includes(z)
          ? s.includes(P)
            ? s.indexOf(z) - s.indexOf(P)
            : -1
          : s != null && s.includes(P)
          ? 1
          : j
          ? V
            ? 0
            : -1
          : V
          ? 1
          : 0,
      );
      const k = [];
      return (
        N.forEach((z, j) => {
          (z.idx = j), z.rowGroup && D.push(z.key), z.colSpan != null && k.push(z);
        }),
        $ !== -1 && (N[$].isLastFrozenColumn = !0),
        { columns: N, colSpanColumns: k, lastFrozenColumnIndex: $, groupBy: D }
      );
    }, [e, c, u, d, p, v, b, s]),
    {
      templateColumns: w,
      layoutCssVars: E,
      totalFrozenColumnWidth: y,
      columnMetrics: m,
    } = te.useMemo(() => {
      const D = new Map();
      let $ = 0,
        N = 0;
      const k = [];
      for (const j of g) {
        let P = o.get(j.key) ?? t.get(j.key) ?? j.width;
        typeof P == 'number' ? (P = Fd(P, j)) : (P = j.minWidth),
          k.push(`${P}px`),
          D.set(j, { width: P, left: $ }),
          ($ += P);
      }
      if (f !== -1) {
        const j = D.get(g[f]);
        N = j.left + j.width;
      }
      const z = {};
      for (let j = 0; j <= f; j++) {
        const P = g[j];
        z[`--rdg-frozen-left-${P.idx}`] = `${D.get(P).left}px`;
      }
      return { templateColumns: k, layoutCssVars: z, totalFrozenColumnWidth: N, columnMetrics: D };
    }, [t, o, g, f]),
    [O, R] = te.useMemo(() => {
      if (!l) return [0, g.length - 1];
      const D = i + y,
        $ = i + r,
        N = g.length - 1,
        k = er(f + 1, N);
      if (D >= $) return [k, k];
      let z = k;
      for (; z < N; ) {
        const { left: B, width: Q } = m.get(g[z]);
        if (B + Q > D) break;
        z++;
      }
      let j = z;
      for (; j < N; ) {
        const { left: B, width: Q } = m.get(g[j]);
        if (B + Q >= $) break;
        j++;
      }
      const P = Kr(k, z - 1),
        V = er(N, j + 1);
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
    groupBy: S,
  };
}
const Eo = typeof window > 'u' ? te.useEffect : te.useLayoutEffect;
function t1(e, t, o, r, i, a, s, l, c, u) {
  const d = te.useRef(i),
    p = e.length === t.length,
    b = p && i !== d.current,
    v = [...o],
    g = [];
  for (const { key: w, idx: E, width: y } of t)
    typeof y == 'string' && (b || !s.has(w)) && !a.has(w) && ((v[E] = y), g.push(w));
  const h = v.join(' ');
  Eo(() => {
    (d.current = i), f(g);
  });
  function f(w) {
    w.length !== 0 &&
      c((E) => {
        const y = new Map(E);
        let m = !1;
        for (const O of w) {
          const R = gc(r, O);
          m || (m = R !== E.get(O)), R === void 0 ? y.delete(O) : y.set(O, R);
        }
        return m ? y : E;
      });
  }
  function S(w, E) {
    const { key: y } = w,
      m = [...o],
      O = [];
    for (const { key: D, idx: $, width: N } of t)
      if (y === D) {
        const k = typeof E == 'number' ? `${E}px` : E;
        m[$] = k;
      } else p && typeof N == 'string' && !a.has(D) && ((m[$] = N), O.push(D));
    r.current.style.gridTemplateColumns = m.join(' ');
    const R = typeof E == 'number' ? E : gc(r, y);
    Pn.flushSync(() => {
      l((D) => {
        const $ = new Map(D);
        return $.set(y, R), $;
      }),
        f(O);
    }),
      u == null || u(w.idx, R);
  }
  return { gridTemplateColumns: h, handleColumnResize: S };
}
function gc(e, t) {
  const o = `[data-measuring-cell-key="${CSS.escape(t)}"]`,
    r = e.current.querySelector(o);
  return r == null ? void 0 : r.getBoundingClientRect().width;
}
function n1() {
  const e = te.useRef(null),
    [t, o] = te.useState(1),
    [r, i] = te.useState(1);
  return (
    Eo(() => {
      const { ResizeObserver: a } = window;
      if (a == null) return;
      const { clientWidth: s, clientHeight: l, offsetWidth: c, offsetHeight: u } = e.current,
        { width: d, height: p } = e.current.getBoundingClientRect(),
        b = d - c + s,
        v = p - u + l;
      o(b), i(v);
      const g = new a((h) => {
        const f = h[0].contentBoxSize[0];
        Pn.flushSync(() => {
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
function Kt(e) {
  const t = te.useRef(e);
  te.useEffect(() => {
    t.current = e;
  });
  const o = te.useCallback((...r) => {
    t.current(...r);
  }, []);
  return e && o;
}
function Si(e) {
  const [t, o] = te.useState(!1);
  t && !e && o(!1);
  function r(a) {
    a.target !== a.currentTarget && o(!0);
  }
  return { tabIndex: e && !t ? 0 : -1, childTabIndex: e ? 0 : -1, onFocus: e ? r : void 0 };
}
function o1({
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
  const p = te.useMemo(() => {
    if (a === 0) return 0;
    let b = a;
    const v = (g, h) => (h !== void 0 && g + h > a ? ((b = g), !0) : !1);
    for (const g of t) {
      const h = g.idx;
      if (h >= b || v(h, sn(g, l, { type: 'HEADER' }))) break;
      for (let f = c; f <= u; f++) {
        const S = o[f];
        if (!d(S) && v(h, sn(g, l, { type: 'ROW', row: S }))) break;
      }
      if (r != null) {
        for (const f of r) if (v(h, sn(g, l, { type: 'SUMMARY', row: f }))) break;
      }
      if (i != null) {
        for (const f of i) if (v(h, sn(g, l, { type: 'SUMMARY', row: f }))) break;
      }
    }
    return b;
  }, [c, u, o, r, i, a, l, t, d]);
  return te.useMemo(() => {
    const b = [];
    for (let v = 0; v <= s; v++) {
      const g = e[v];
      (v < p && !g.frozen) || b.push(g);
    }
    return b;
  }, [p, s, e]);
}
function r1(e) {
  return Array.isArray(e);
}
function i1({
  rawRows: e,
  rowHeight: t,
  clientHeight: o,
  scrollTop: r,
  groupBy: i,
  rowGrouper: a,
  expandedGroupIds: s,
  enableVirtualization: l,
}) {
  const [c, u] = te.useMemo(() => {
      if (i.length === 0 || a == null) return [void 0, e.length];
      const E = (y, [m, ...O], R) => {
        let D = 0;
        const $ = {};
        for (const [N, k] of Object.entries(a(y, m))) {
          const [z, j] = O.length === 0 ? [k, k.length] : E(k, O, R + D + 1);
          ($[N] = { childRows: k, childGroups: z, startRowIndex: R + D }), (D += j + 1);
        }
        return [$, D];
      };
      return E(e, i, 0);
    }, [i, a, e]),
    [d, p] = te.useMemo(() => {
      const E = new Set();
      if (!c) return [e, O];
      const y = [],
        m = (R, D, $) => {
          if (r1(R)) {
            y.push(...R);
            return;
          }
          Object.keys(R).forEach((N, k, z) => {
            const j = D !== void 0 ? `${D}__${N}` : N,
              P = (s == null ? void 0 : s.has(j)) ?? !1,
              { childRows: V, childGroups: B, startRowIndex: Q } = R[N],
              ie = {
                id: j,
                parentId: D,
                groupKey: N,
                isExpanded: P,
                childRows: V,
                level: $,
                posInSet: k,
                startRowIndex: Q,
                setSize: z.length,
              };
            y.push(ie), E.add(ie), P && m(B, j, $ + 1);
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
    } = te.useMemo(() => {
      if (typeof t == 'number')
        return {
          totalRowHeight: t * d.length,
          gridTemplateRows: ` repeat(${d.length}, ${t}px)`,
          getRowTop: (R) => R * t,
          getRowHeight: () => t,
          findRowIdx: (R) => bc(R / t),
        };
      let E = 0,
        y = ' ';
      const m = d.map((R) => {
          const D = p(R) ? t({ type: 'GROUP', row: R }) : t({ type: 'ROW', row: R }),
            $ = { top: E, height: D };
          return (y += `${D}px `), (E += D), $;
        }),
        O = (R) => Kr(0, er(d.length - 1, R));
      return {
        totalRowHeight: E,
        gridTemplateRows: y,
        getRowTop: (R) => m[O(R)].top,
        getRowHeight: (R) => m[O(R)].height,
        findRowIdx(R) {
          let D = 0,
            $ = m.length - 1;
          for (; D <= $; ) {
            const N = D + bc(($ - D) / 2),
              k = m[N].top;
            if (k === R) return N;
            if ((k < R ? (D = N + 1) : k > R && ($ = N - 1), D > $)) return $;
          }
          return 0;
        },
      };
    }, [p, t, d]);
  let S = 0,
    w = d.length - 1;
  if (l) {
    const y = f(r),
      m = f(r + o);
    (S = Kr(0, y - 4)), (w = er(d.length - 1, m + 4));
  }
  return {
    rowOverscanStartIdx: S,
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
const a1 = 'cadd3bp7-0-0-beta-33',
  s1 = `rdg-cell-drag-handle ${a1}`;
function l1({
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
      S = t[h],
      w = e[f],
      E = [...e],
      y = [];
    for (let m = v; m < g; m++)
      if (i({ rowIdx: m, idx: h })) {
        const O = s({ columnKey: S.key, sourceRow: w, targetRow: e[m] });
        O !== e[m] && ((E[m] = O), y.push(m));
      }
    y.length > 0 && (a == null || a(E, { indexes: y, column: S }));
  }
  return I('div', { className: s1, onMouseDown: u, onDoubleClick: p });
}
const c1 = 'c1tngyp17-0-0-beta-33';
function u1({
  column: e,
  colSpan: t,
  row: o,
  rowIdx: r,
  onRowChange: i,
  closeEditor: a,
  onKeyDown: s,
  navigate: l,
}) {
  var S, w, E;
  const c = te.useRef(),
    u = ((S = e.editorOptions) == null ? void 0 : S.commitOnOutsideClick) !== !1,
    d = Kt(() => {
      v(!0, !1);
    });
  te.useEffect(() => {
    if (!u) return;
    function y() {
      c.current = requestAnimationFrame(d);
    }
    return (
      addEventListener('mousedown', y, { capture: !0 }),
      () => {
        removeEventListener('mousedown', y, { capture: !0 }), p();
      }
    );
  }, [u, d]);
  function p() {
    cancelAnimationFrame(c.current);
  }
  function b(y) {
    if (s) {
      const m = Ko(y);
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
    y.key === 'Escape' ? v() : y.key === 'Enter' ? v(!0) : hC(y) && l(y);
  }
  function v(y = !1, m = !0) {
    y ? i(o, !0, m) : a(m);
  }
  function g(y, m = !1) {
    i(y, m, m);
  }
  const { cellClass: h } = e,
    f = ur(
      e,
      'rdg-editor-container',
      typeof h == 'function' ? h(o) : h,
      !((w = e.editorOptions) != null && w.displayCellContent) && c1,
    );
  return I('div', {
    role: 'gridcell',
    'aria-colindex': e.idx + 1,
    'aria-colspan': t,
    'aria-selected': !0,
    className: f,
    style: cr(e, t),
    onKeyDown: b,
    onMouseDownCapture: p,
    children:
      e.renderEditCell != null &&
      je(tr, {
        children: [
          e.renderEditCell({ column: e, row: o, onRowChange: g, onClose: v }),
          ((E = e.editorOptions) == null ? void 0 : E.displayCellContent) &&
            e.renderCell({ column: e, row: o, isCellEditable: !0, tabIndex: -1, onRowChange: g }),
        ],
      }),
  });
}
function d1({
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
  const { tabIndex: u, childTabIndex: d, onFocus: p } = Si(i);
  function b() {
    c(e);
  }
  const v = a.rowGroup && l === a.idx;
  return I(
    'div',
    {
      role: 'gridcell',
      'aria-colindex': a.idx + 1,
      'aria-selected': i,
      tabIndex: u,
      className: ur(a),
      style: { ...cr(a), cursor: v ? 'pointer' : 'default' },
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
const p1 = te.memo(d1),
  f1 = 'r1otpg647-0-0-beta-33',
  us = `rdg-row ${f1}`,
  m1 = 'rel5gk27-0-0-beta-33',
  Ti = 'rdg-row-selected',
  h1 = 'r1qymf1z7-0-0-beta-33',
  b1 = 'gyxx7e97-0-0-beta-33',
  g1 = `rdg-group-row ${b1}`;
function v1({
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
  const h = o[0].key === Yr ? c + 1 : c;
  function f() {
    b(i);
  }
  return I(ls, {
    value: p,
    children: I('div', {
      role: 'row',
      'aria-level': c,
      'aria-expanded': u,
      className: Ee(us, g1, `rdg-row-${i % 2 === 0 ? 'even' : 'odd'}`, d === -1 && Ti),
      onClick: f,
      style: wi(s, l),
      ...g,
      children: o.map((S) =>
        I(
          p1,
          {
            id: e,
            groupKey: t,
            childRows: r,
            isExpanded: u,
            isCellSelected: d === S.idx,
            column: S,
            row: a,
            groupColumnIndex: h,
            toggleGroup: v,
          },
          S.key,
        ),
      ),
    }),
  });
}
const y1 = te.memo(v1),
  x1 = 'hizp7y17-0-0-beta-33',
  E1 = `rdg-header-sort-cell ${x1}`,
  C1 = 'h14cojrm7-0-0-beta-33',
  w1 = `rdg-header-sort-name ${C1}`;
function S1({ column: e, sortDirection: t, priority: o, onSort: r, tabIndex: i }) {
  return e.sortable
    ? I(T1, { onSort: r, sortDirection: t, priority: o, tabIndex: i, children: e.name })
    : e.name;
}
function T1({ onSort: e, sortDirection: t, priority: o, children: r, tabIndex: i }) {
  const a = as().renderSortStatus;
  function s(c) {
    (c.key === ' ' || c.key === 'Enter') && (c.preventDefault(), e(c.ctrlKey || c.metaKey));
  }
  function l(c) {
    e(c.ctrlKey || c.metaKey);
  }
  return je('span', {
    tabIndex: i,
    className: E1,
    onClick: l,
    onKeyDown: s,
    children: [
      I('span', { className: w1, children: r }),
      I('span', { children: a({ sortDirection: t, priority: o }) }),
    ],
  });
}
const R1 = 'celq7o97-0-0-beta-33',
  O1 = `rdg-cell-resizable ${R1}`;
function k1({
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
    { tabIndex: d, childTabIndex: p, onFocus: b } = Si(o),
    v = i == null ? void 0 : i.findIndex(($) => $.columnKey === e.key),
    g = v !== void 0 && v > -1 ? i[v] : void 0,
    h = g == null ? void 0 : g.direction,
    f = g !== void 0 && i.length > 1 ? v + 1 : void 0,
    S = h && !f ? (h === 'ASC' ? 'ascending' : 'descending') : void 0,
    w = ur(e, e.headerCellClass, e.resizable && O1),
    E = e.renderHeaderCell ?? S1;
  function y($) {
    if ($.pointerType === 'mouse' && $.buttons !== 1) return;
    const { currentTarget: N, pointerId: k } = $,
      { right: z, left: j } = N.getBoundingClientRect(),
      P = u ? $.clientX - j : z - $.clientX;
    if (P > 11) return;
    function V(Q) {
      Q.preventDefault();
      const { right: ie, left: Z } = N.getBoundingClientRect(),
        _ = u ? ie + P - Q.clientX : Q.clientX + P - Z;
      _ > 0 && r(e, Fd(_, e));
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
      const k = { columnKey: e.key, direction: N ? 'DESC' : 'ASC' };
      a(i && $ ? [...i, k] : [k]);
    } else {
      let k;
      if (
        (((N === !0 && h === 'DESC') || (N !== !0 && h === 'ASC')) &&
          (k = { columnKey: e.key, direction: h === 'ASC' ? 'DESC' : 'ASC' }),
        $)
      ) {
        const z = [...i];
        k ? (z[v] = k) : z.splice(v, 1), a(z);
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
  return I('div', {
    role: 'columnheader',
    'aria-colindex': e.idx + 1,
    'aria-selected': o,
    'aria-sort': S,
    'aria-colspan': t,
    tabIndex: l ? 0 : d,
    className: w,
    style: cr(e, t),
    onFocus: D,
    onClick: O,
    onDoubleClick: e.resizable ? R : void 0,
    onPointerDown: e.resizable ? y : void 0,
    children: E({ column: e, sortDirection: h, priority: f, onSort: m, tabIndex: p }),
  });
}
const N1 = 'h197vzie7-0-0-beta-33',
  $1 = `rdg-header-row ${N1}`;
function P1({
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
      b = sn(p, i, { type: 'HEADER' });
    b !== void 0 && (d += b - 1),
      u.push(
        I(
          k1,
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
  return I('div', {
    role: 'row',
    'aria-rowindex': 1,
    className: Ee($1, a === -1 && Ti),
    style: wi(1),
    children: u,
  });
}
const I1 = te.memo(P1),
  _1 = 'ccpfvsn7-0-0-beta-33',
  M1 = `rdg-cell-copied ${_1}`,
  A1 = 'c1bmg16t7-0-0-beta-33',
  D1 = `rdg-cell-dragged-over ${A1}`;
function L1({
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
  const { tabIndex: g, childTabIndex: h, onFocus: f } = Si(o),
    { cellClass: S } = e,
    w = ur(e, typeof S == 'function' ? S(a) : S, r && M1, i && D1),
    E = Ld(e, a);
  function y($) {
    b({ rowIdx: s, idx: e.idx }, $);
  }
  function m($) {
    if (c) {
      const N = Ko($);
      if ((c({ row: a, column: e, selectCell: y }, N), N.isGridDefaultPrevented())) return;
    }
    y();
  }
  function O($) {
    if (d) {
      const N = Ko($);
      if ((d({ row: a, column: e, selectCell: y }, N), N.isGridDefaultPrevented())) return;
    }
    y();
  }
  function R($) {
    if (u) {
      const N = Ko($);
      if ((u({ row: a, column: e, selectCell: y }, N), N.isGridDefaultPrevented())) return;
    }
    y(!0);
  }
  function D($) {
    p(e, $);
  }
  return I('div', {
    role: 'gridcell',
    'aria-colindex': e.idx + 1,
    'aria-selected': o,
    'aria-colspan': t,
    'aria-readonly': !E || void 0,
    tabIndex: g,
    className: w,
    style: cr(e, t),
    onClick: m,
    onDoubleClick: R,
    onContextMenu: O,
    onFocus: f,
    ...v,
    children:
      !e.rowGroup &&
      je(tr, {
        children: [
          e.renderCell({ column: e, row: a, isCellEditable: E, tabIndex: h, onRowChange: D }),
          l,
        ],
      }),
  });
}
const F1 = te.memo(L1);
function j1(
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
    setDraggedOverRowIdx: S,
    onMouseEnter: w,
    onRowChange: E,
    selectCell: y,
    ...m
  },
  O,
) {
  const R = Kt((N, k) => {
    E(N, t, k);
  });
  function D(N) {
    S == null || S(t), w == null || w(N);
  }
  e = Ee(
    us,
    `rdg-row-${t % 2 === 0 ? 'even' : 'odd'}`,
    f == null ? void 0 : f(u, t),
    e,
    i === -1 && Ti,
  );
  const $ = [];
  for (let N = 0; N < d.length; N++) {
    const k = d[N],
      { idx: z } = k,
      j = sn(k, c, { type: 'ROW', row: u });
    j !== void 0 && (N += j - 1);
    const P = i === z;
    P && p
      ? $.push(p)
      : $.push(
          I(
            F1,
            {
              column: k,
              colSpan: j,
              row: u,
              rowIdx: t,
              isCopied: s === z,
              isDraggedOver: l === z,
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
  return I(ls, {
    value: a,
    children: I('div', {
      role: 'row',
      ref: O,
      className: e,
      onMouseEnter: D,
      style: wi(o, r),
      ...m,
      children: $,
    }),
  });
}
const z1 = te.memo(te.forwardRef(j1));
function V1(e, t) {
  return I(z1, { ...t }, e);
}
function B1({
  scrollToPosition: { idx: e, rowIdx: t },
  gridElement: o,
  setScrollToCellPosition: r,
}) {
  const i = te.useRef(null);
  return (
    Eo(() => {
      _r(i.current);
    }),
    Eo(() => {
      function a() {
        r(null);
      }
      const s = new IntersectionObserver(a, { root: o, threshold: 1 });
      return (
        s.observe(i.current),
        () => {
          s.disconnect();
        }
      );
    }, [o, r]),
    I('div', {
      ref: i,
      style: { gridColumn: e === void 0 ? '1/-1' : e + 1, gridRow: t === void 0 ? '1/-1' : t + 2 },
    })
  );
}
const W1 = 'a1mygwml7-0-0-beta-33',
  U1 = `rdg-sort-arrow ${W1}`;
function H1({ sortDirection: e, priority: t }) {
  return je(tr, { children: [q1({ sortDirection: e }), K1({ priority: t })] });
}
function q1({ sortDirection: e }) {
  return e === void 0
    ? null
    : I('svg', {
        viewBox: '0 0 12 8',
        width: '12',
        height: '8',
        className: U1,
        'aria-hidden': !0,
        children: I('path', { d: e === 'ASC' ? 'M0 8 6 0 12 8' : 'M0 0 6 8 12 0' }),
      });
}
function K1({ priority: e }) {
  return e;
}
const Y1 = 'r104f42s7-0-0-beta-33',
  G1 = `rdg ${Y1}`,
  X1 = 'v7ly7s7-0-0-beta-33',
  J1 = `rdg-viewport-dragging ${X1}`,
  Z1 = 'fc4f4zb7-0-0-beta-33',
  Q1 = 's1n3hxke7-0-0-beta-33';
function ew({ column: e, colSpan: t, row: o, rowIdx: r, isCellSelected: i, selectCell: a }) {
  var b;
  const { tabIndex: s, childTabIndex: l, onFocus: c } = Si(i),
    { summaryCellClass: u } = e,
    d = ur(e, Q1, typeof u == 'function' ? u(o) : u);
  function p() {
    a({ rowIdx: r, idx: e.idx });
  }
  return I('div', {
    role: 'gridcell',
    'aria-colindex': e.idx + 1,
    'aria-colspan': t,
    'aria-selected': i,
    tabIndex: s,
    className: d,
    style: cr(e, t),
    onClick: p,
    onFocus: c,
    children:
      (b = e.renderSummaryCell) == null ? void 0 : b.call(e, { column: e, row: o, tabIndex: l }),
  });
}
const tw = te.memo(ew),
  nw = 'snfqesz7-0-0-beta-33',
  ow = 't1jijrjz7-0-0-beta-33',
  rw = 't14bmecc7-0-0-beta-33',
  iw = 'b1odhhml7-0-0-beta-33',
  aw = `rdg-summary-row ${nw}`,
  sw = `rdg-top-summary-row ${ow}`;
function lw({
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
      h = sn(g, s, { type: 'SUMMARY', row: o });
    h !== void 0 && (v += h - 1);
    const f = l === g.idx;
    b.push(
      I(tw, { column: g, colSpan: h, row: o, rowIdx: e, isCellSelected: f, selectCell: d }, g.key),
    );
  }
  return I('div', {
    role: 'row',
    'aria-rowindex': p,
    className: Ee(
      us,
      `rdg-row-${e % 2 === 0 ? 'even' : 'odd'}`,
      aw,
      c ? [sw, u && rw] : ['rdg-bottom-summary-row', u && iw],
      l === -1 && Ti,
    ),
    style: {
      ...wi(t),
      '--rdg-summary-row-top': i !== void 0 ? `${i}px` : void 0,
      '--rdg-summary-row-bottom': a !== void 0 ? `${a}px` : void 0,
    },
    children: b,
  });
}
const vc = te.memo(lw);
function cw(e, t) {
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
      rowGrouper: S,
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
      onPaste: z,
      enableVirtualization: j,
      renderers: P,
      className: V,
      style: B,
      rowClass: Q,
      direction: ie,
      'aria-label': Z,
      'aria-labelledby': _,
      'aria-describedby': W,
      'data-testid': ne,
    } = e,
    H = as(),
    K = c ?? 35,
    oe = u ?? (typeof K == 'number' ? K : 35),
    ee = d ?? (typeof K == 'number' ? K : 35),
    re = (P == null ? void 0 : P.renderRow) ?? (H == null ? void 0 : H.renderRow) ?? V1,
    ce =
      (P == null ? void 0 : P.renderSortStatus) ?? (H == null ? void 0 : H.renderSortStatus) ?? H1,
    de = (P == null ? void 0 : P.renderCheckbox) ?? (H == null ? void 0 : H.renderCheckbox) ?? FC,
    xe = (P == null ? void 0 : P.noRowsFallback) ?? (H == null ? void 0 : H.noRowsFallback),
    le = j ?? !0,
    L = ie ?? 'ltr',
    Te = 1,
    F = (i == null ? void 0 : i.length) ?? 0,
    G = (a == null ? void 0 : a.length) ?? 0,
    Le = F + G,
    ve = Te + F,
    Fe = -ve,
    [He, Pe] = te.useState(0),
    [Ae, ut] = te.useState(0),
    [ht, ae] = te.useState(() => new Map()),
    [ye, we] = te.useState(() => new Map()),
    [U, fe] = te.useState(() => ({ idx: -1, rowIdx: Fe - 1, mode: 'SELECT' })),
    [pe, se] = te.useState(null),
    [Ce, Se] = te.useState(!1),
    [De, bt] = te.useState(void 0),
    [dt, It] = te.useState(null),
    Qt = te.useRef(U),
    _t = te.useRef(De),
    Tt = te.useRef(-1),
    Rt = te.useRef(null),
    vt = te.useRef(!1),
    [We, pt, Et] = n1(),
    en = Et - oe - Le * ee,
    Dt = p != null && b != null,
    tn = L === 'rtl',
    zt = tn ? 'ArrowRight' : 'ArrowLeft',
    nn = tn ? 'ArrowLeft' : 'ArrowRight',
    pn = te.useMemo(() => ({ renderCheckbox: de, renderSortStatus: ce }), [de, ce]),
    fn = te.useMemo(() => {
      const { length: J } = r;
      return J !== 0 && p != null && s != null && p.size >= J && r.every((be) => p.has(s(be)));
    }, [r, p, s]),
    {
      columns: mt,
      colSpanColumns: on,
      colOverscanStartIdx: Ve,
      colOverscanEndIdx: yt,
      templateColumns: Bt,
      layoutCssVars: T,
      lastFrozenColumnIndex: q,
      totalFrozenColumnWidth: me,
      groupBy: A,
    } = e1({
      rawColumns: o,
      measuredColumnWidths: ye,
      resizedColumnWidths: ht,
      scrollLeft: Ae,
      viewportWidth: pt,
      defaultColumnOptions: h,
      rawGroupBy: S ? f : void 0,
      enableVirtualization: le,
    }),
    {
      rowOverscanStartIdx: M,
      rowOverscanEndIdx: X,
      rows: Y,
      rowsCount: he,
      totalRowHeight: _e,
      gridTemplateRows: Ie,
      isGroupRow: ke,
      getRowTop: kt,
      getRowHeight: En,
      findRowIdx: Oo,
    } = i1({
      rawRows: r,
      groupBy: A,
      rowGrouper: S,
      rowHeight: K,
      clientHeight: en,
      scrollTop: He,
      expandedGroupIds: w,
      enableVirtualization: le,
    }),
    Pt = o1({
      columns: mt,
      colSpanColumns: on,
      colOverscanStartIdx: Ve,
      colOverscanEndIdx: yt,
      lastFrozenColumnIndex: q,
      rowOverscanStartIdx: M,
      rowOverscanEndIdx: X,
      rows: Y,
      topSummaryRows: i,
      bottomSummaryRows: a,
      isGroupRow: ke,
    }),
    { gridTemplateColumns: Bd, handleColumnResize: Wd } = t1(mt, Pt, Bt, We, pt, ht, ye, ae, we, $),
    _n = A.length > 0 && typeof S == 'function',
    Ud = _n ? -1 : 0,
    dr = mt.length - 1,
    ko = Y.length + G - 1,
    Ri = $i(U),
    pr = hs(U),
    Hd = Kt(Wd),
    qd = Kt(g),
    Kd = Kt(y),
    Yd = Kt(m),
    Gd = Kt(O),
    Xd = Kt(ds),
    Jd = Kt(fr),
    Oi = Kt(to),
    Zd = Kt((J) => {
      to({ rowIdx: J, idx: -1 });
    }),
    Qd = Kt((J) => {
      to({ rowIdx: Fe, idx: J });
    }),
    ep = Kt(ps);
  Eo(() => {
    if (!Ri || Xi(U, Qt.current)) {
      Qt.current = U;
      return;
    }
    (Qt.current = U), U.idx === -1 && (Rt.current.focus({ preventScroll: !0 }), _r(Rt.current));
  }),
    Eo(() => {
      if (!vt.current) return;
      vt.current = !1;
      const J = xc(We.current);
      if (J === null) return;
      _r(J), (J.querySelector('[tabindex="0"]') ?? J).focus({ preventScroll: !0 });
    }),
    te.useImperativeHandle(t, () => ({
      element: We.current,
      scrollToCell({ idx: J, rowIdx: be }) {
        const $e = J !== void 0 && J > q && J < mt.length ? J : void 0,
          Oe = be !== void 0 && mr(be) ? be : void 0;
        ($e !== void 0 || Oe !== void 0) && It({ idx: $e, rowIdx: Oe });
      },
      selectCell: to,
    }));
  const ki = te.useCallback((J) => {
    bt(J), (_t.current = J);
  }, []);
  function ds(J) {
    if (!b) return;
    if ((Gi(s), J.type === 'HEADER')) {
      const ft = new Set(p);
      for (const Ze of r) {
        const Ke = s(Ze);
        J.checked ? ft.add(Ke) : ft.delete(Ke);
      }
      b(ft);
      return;
    }
    const { row: be, checked: $e, isShiftClick: Oe } = J,
      Ne = new Set(p);
    if (ke(be)) {
      for (const ft of be.childRows) {
        const Ze = s(ft);
        $e ? Ne.add(Ze) : Ne.delete(Ze);
      }
      b(Ne);
      return;
    }
    const gt = s(be);
    if ($e) {
      Ne.add(gt);
      const ft = Tt.current,
        Ze = Y.indexOf(be);
      if (((Tt.current = Ze), Oe && ft !== -1 && ft !== Ze)) {
        const Ke = kC(Ze - ft);
        for (let $t = ft + Ke; $t !== Ze; $t += Ke) {
          const Mn = Y[$t];
          ke(Mn) || Ne.add(s(Mn));
        }
      }
    } else Ne.delete(gt), (Tt.current = -1);
    b(Ne);
  }
  function ps(J) {
    if (!E) return;
    const be = new Set(w);
    be.has(J) ? be.delete(J) : be.add(J), E(be);
  }
  function tp(J) {
    const { idx: be, rowIdx: $e, mode: Oe } = U;
    if (Oe === 'EDIT') return;
    const Ne = Y[$e];
    if (!ke(Ne) && R) {
      const $t = Ko(J);
      if (
        (R({ mode: 'SELECT', row: Ne, column: mt[be], rowIdx: $e, selectCell: to }, $t),
        $t.isGridDefaultPrevented())
      )
        return;
    }
    if (!(J.target instanceof Element)) return;
    const gt = J.target.closest('.rdg-cell') !== null,
      ft = _n && J.target === Rt.current;
    if (!gt && !ft) return;
    const { key: Ze, keyCode: Ke } = J;
    if (pr && (z != null || k != null) && hc(J) && !ke(Y[$e])) {
      if (Ke === 67) {
        op();
        return;
      }
      if (Ke === 86) {
        rp();
        return;
      }
    }
    if (
      mr($e) &&
      ke(Ne) &&
      U.idx === -1 &&
      ((Ze === zt && Ne.isExpanded) || (Ze === nn && !Ne.isExpanded))
    ) {
      J.preventDefault(), ps(Ne.id);
      return;
    }
    switch (J.key) {
      case 'Escape':
        se(null);
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
        bs(J);
        break;
      default:
        ip(J);
        break;
    }
  }
  function np(J) {
    const { scrollTop: be, scrollLeft: $e } = J.currentTarget;
    Pn.flushSync(() => {
      Pe(be), ut(NC($e));
    }),
      D == null || D(J);
  }
  function Ni(J) {
    return _n ? r.indexOf(Y[J]) : J;
  }
  function fr(J, be, $e) {
    if (typeof l != 'function') return;
    const Oe = Ni(be);
    if ($e === r[Oe]) return;
    const Ne = [...r];
    (Ne[Oe] = $e), l(Ne, { indexes: [Oe], column: J });
  }
  function fs() {
    U.mode === 'EDIT' && fr(mt[U.idx], U.rowIdx, U.row);
  }
  function op() {
    const { idx: J, rowIdx: be } = U,
      $e = r[Ni(be)],
      Oe = mt[J].key;
    se({ row: $e, columnKey: Oe }), k == null || k({ sourceRow: $e, sourceColumnKey: Oe });
  }
  function rp() {
    if (!z || !l || pe === null || !hr(U)) return;
    const { idx: J, rowIdx: be } = U,
      $e = mt[J],
      Oe = r[Ni(be)],
      Ne = z({
        sourceRow: pe.row,
        sourceColumnKey: pe.columnKey,
        targetRow: Oe,
        targetColumnKey: $e.key,
      });
    fr($e, be, Ne);
  }
  function ip(J) {
    if (!pr) return;
    const be = Y[U.rowIdx];
    if (ke(be)) return;
    const { key: $e, shiftKey: Oe } = J;
    if (Dt && Oe && $e === ' ') {
      Gi(s);
      const Ne = s(be);
      ds({ type: 'ROW', row: be, checked: !p.has(Ne), isShiftClick: !1 }), J.preventDefault();
      return;
    }
    hr(U) &&
      mC(J) &&
      fe(({ idx: Ne, rowIdx: gt }) => ({
        idx: Ne,
        rowIdx: gt,
        mode: 'EDIT',
        row: be,
        originalRow: be,
      }));
  }
  function ms(J) {
    return J >= Ud && J <= dr;
  }
  function mr(J) {
    return J >= 0 && J < Y.length;
  }
  function $i({ idx: J, rowIdx: be }) {
    return be >= Fe && be <= ko && ms(J);
  }
  function hs({ idx: J, rowIdx: be }) {
    return mr(be) && ms(J);
  }
  function hr(J) {
    return hs(J) && vC({ columns: mt, rows: Y, selectedPosition: J, isGroupRow: ke });
  }
  function to(J, be) {
    if ($i(J))
      if ((fs(), be && hr(J))) {
        const $e = Y[J.rowIdx];
        fe({ ...J, mode: 'EDIT', row: $e, originalRow: $e });
      } else Xi(U, J) ? _r(xc(We.current)) : ((vt.current = !0), fe({ ...J, mode: 'SELECT' }));
  }
  function ap(J, be, $e) {
    const { idx: Oe, rowIdx: Ne } = U,
      gt = Y[Ne],
      ft = Ri && Oe === -1;
    if (J === zt && ft && ke(gt) && !gt.isExpanded && gt.level !== 0) {
      let Ze = -1;
      for (let Ke = U.rowIdx - 1; Ke >= 0; Ke--) {
        const $t = Y[Ke];
        if (ke($t) && $t.id === gt.parentId) {
          Ze = Ke;
          break;
        }
      }
      if (Ze !== -1) return { idx: Oe, rowIdx: Ze };
    }
    switch (J) {
      case 'ArrowUp':
        return { idx: Oe, rowIdx: Ne - 1 };
      case 'ArrowDown':
        return { idx: Oe, rowIdx: Ne + 1 };
      case zt:
        return { idx: Oe - 1, rowIdx: Ne };
      case nn:
        return { idx: Oe + 1, rowIdx: Ne };
      case 'Tab':
        return { idx: Oe + ($e ? -1 : 1), rowIdx: Ne };
      case 'Home':
        return ft ? { idx: Oe, rowIdx: 0 } : { idx: 0, rowIdx: be ? Fe : Ne };
      case 'End':
        return ft ? { idx: Oe, rowIdx: Y.length - 1 } : { idx: dr, rowIdx: be ? ko : Ne };
      case 'PageUp': {
        if (U.rowIdx === Fe) return U;
        const Ze = kt(Ne) + En(Ne) - en;
        return { idx: Oe, rowIdx: Ze > 0 ? Oo(Ze) : 0 };
      }
      case 'PageDown': {
        if (U.rowIdx >= Y.length) return U;
        const Ze = kt(Ne) + en;
        return { idx: Oe, rowIdx: Ze < _e ? Oo(Ze) : Y.length - 1 };
      }
      default:
        return U;
    }
  }
  function bs(J) {
    const { key: be, shiftKey: $e } = J;
    let Oe = 'NONE';
    if (be === 'Tab') {
      if (EC({ shiftKey: $e, maxColIdx: dr, minRowIdx: Fe, maxRowIdx: ko, selectedPosition: U })) {
        fs();
        return;
      }
      Oe = 'CHANGE_ROW';
    }
    J.preventDefault();
    const Ne = hc(J),
      gt = ap(be, Ne, $e);
    if (Xi(U, gt)) return;
    const ft = xC({
      columns: mt,
      colSpanColumns: on,
      rows: Y,
      topSummaryRows: i,
      bottomSummaryRows: a,
      minRowIdx: Fe,
      maxRowIdx: ko,
      lastFrozenColumnIndex: q,
      cellNavigationMode: Oe,
      currentPosition: U,
      nextPosition: gt,
      isCellWithinBounds: $i,
      isGroupRow: ke,
    });
    to(ft);
  }
  function sp(J) {
    if (De === void 0) return;
    const { rowIdx: be } = U;
    return (be < De ? be < J && J <= De : be > J && J >= De) ? U.idx : void 0;
  }
  function lp(J) {
    if (!(U.rowIdx !== J || U.mode === 'EDIT' || _n || N == null))
      return I(l1, {
        rows: r,
        columns: mt,
        selectedPosition: U,
        isCellEditable: hr,
        latestDraggedOverRowIdx: _t,
        onRowsChange: l,
        onFill: N,
        setDragging: Se,
        setDraggedOverRowIdx: ki,
      });
  }
  function cp(J) {
    if (U.rowIdx !== J || U.mode === 'SELECT') return;
    const { idx: be, row: $e } = U,
      Oe = mt[be],
      Ne = sn(Oe, q, { type: 'ROW', row: $e }),
      gt = (Ze) => {
        (vt.current = Ze),
          fe(({ idx: Ke, rowIdx: $t }) => ({ idx: Ke, rowIdx: $t, mode: 'SELECT' }));
      },
      ft = (Ze, Ke, $t) => {
        Ke
          ? Pn.flushSync(() => {
              fr(Oe, U.rowIdx, Ze), gt($t);
            })
          : fe((Mn) => ({ ...Mn, row: Ze }));
      };
    return (
      Y[U.rowIdx] !== U.originalRow && gt(!1),
      I(
        u1,
        {
          column: Oe,
          colSpan: Ne,
          row: $e,
          rowIdx: J,
          onRowChange: ft,
          closeEditor: gt,
          onKeyDown: R,
          navigate: bs,
        },
        Oe.key,
      )
    );
  }
  function br(J) {
    const be = mt[U.idx];
    return be !== void 0 && U.rowIdx === J && !Pt.includes(be)
      ? U.idx > yt
        ? [...Pt, be]
        : [...Pt.slice(0, q + 1), be, ...Pt.slice(q + 1)]
      : Pt;
  }
  function up() {
    const J = [];
    let be = 0;
    const { idx: $e, rowIdx: Oe } = U,
      Ne = pr && Oe < M ? M - 1 : M,
      gt = pr && Oe > X ? X + 1 : X;
    for (let ft = Ne; ft <= gt; ft++) {
      const Ze = ft === M - 1 || ft === X + 1,
        Ke = Ze ? Oe : ft;
      let $t = Pt;
      const Mn = mt[$e];
      Mn !== void 0 && (Ze ? ($t = [Mn]) : ($t = br(Ke)));
      const Lt = Y[Ke],
        vs = ve + Ke + 1;
      if (ke(Lt)) {
        ({ startRowIndex: be } = Lt);
        let No = !1;
        Dt && (Gi(s), (No = Lt.childRows.every((dp) => p.has(s(dp))))),
          J.push(
            I(
              y1,
              {
                'aria-level': Lt.level + 1,
                'aria-setsize': Lt.setSize,
                'aria-posinset': Lt.posInSet + 1,
                'aria-rowindex': ve + be + 1,
                'aria-selected': Dt ? No : void 0,
                id: Lt.id,
                groupKey: Lt.groupKey,
                viewportColumns: $t,
                childRows: Lt.childRows,
                rowIdx: Ke,
                row: Lt,
                gridRowStart: vs,
                height: En(Ke),
                level: Lt.level,
                isExpanded: Lt.isExpanded,
                selectedCellIdx: Oe === Ke ? $e : void 0,
                isRowSelected: No,
                selectGroup: Zd,
                toggleGroup: ep,
              },
              Lt.id,
            ),
          );
        continue;
      }
      be++;
      let vr,
        Pi = !1;
      typeof s == 'function'
        ? ((vr = s(Lt)), (Pi = (p == null ? void 0 : p.has(vr)) ?? !1))
        : (vr = _n ? be : Ke),
        J.push(
          re(vr, {
            'aria-rowindex': ve + (_n ? be : Ke) + 1,
            'aria-selected': Dt ? Pi : void 0,
            rowIdx: Ke,
            row: Lt,
            viewportColumns: $t,
            isRowSelected: Pi,
            onCellClick: Kd,
            onCellDoubleClick: Yd,
            onCellContextMenu: Gd,
            rowClass: Q,
            gridRowStart: vs,
            height: En(Ke),
            copiedCellIdx:
              pe !== null && pe.row === Lt ? mt.findIndex((No) => No.key === pe.columnKey) : void 0,
            selectedCellIdx: Oe === Ke ? $e : void 0,
            draggedOverCellIdx: sp(Ke),
            setDraggedOverRowIdx: Ce ? ki : void 0,
            lastFrozenColumnIndex: q,
            onRowChange: Jd,
            selectCell: Oi,
            selectedCellDragHandle: lp(Ke),
            selectedCellEditor: cp(Ke),
          }),
        );
    }
    return J;
  }
  (U.idx > dr || U.rowIdx > ko) && (fe({ idx: -1, rowIdx: Fe - 1, mode: 'SELECT' }), ki(void 0));
  let gr = `${oe}px`;
  F > 0 && (gr += ` repeat(${F}, ${ee}px)`),
    Y.length > 0 && (gr += Ie),
    G > 0 && (gr += ` repeat(${G}, ${ee}px)`);
  const gs = U.idx === -1 && U.rowIdx !== Fe - 1;
  return je('div', {
    role: _n ? 'treegrid' : 'grid',
    'aria-label': Z,
    'aria-labelledby': _,
    'aria-describedby': W,
    'aria-multiselectable': Dt ? !0 : void 0,
    'aria-colcount': mt.length,
    'aria-rowcount': Te + he + Le,
    className: Ee(G1, V, Ce && J1),
    style: {
      ...B,
      scrollPaddingInlineStart:
        U.idx > q || (dt == null ? void 0 : dt.idx) !== void 0 ? `${me}px` : void 0,
      scrollPaddingBlock:
        mr(U.rowIdx) || (dt == null ? void 0 : dt.rowIdx) !== void 0
          ? `${oe + F * ee}px ${G * ee}px`
          : void 0,
      gridTemplateColumns: Bd,
      gridTemplateRows: gr,
      '--rdg-header-row-height': `${oe}px`,
      '--rdg-summary-row-height': `${ee}px`,
      '--rdg-sign': tn ? -1 : 1,
      ...T,
    },
    dir: L,
    ref: We,
    onScroll: np,
    onKeyDown: tp,
    'data-testid': ne,
    children: [
      _n &&
        I('div', {
          ref: Rt,
          tabIndex: gs ? 0 : -1,
          className: Ee(Z1, gs && [m1, q !== -1 && h1]),
          style: { gridRowStart: U.rowIdx + ve + 1 },
        }),
      dt !== null &&
        I(B1, { scrollToPosition: dt, setScrollToCellPosition: It, gridElement: We.current }),
      je(qC, {
        value: pn,
        children: [
          je(KC, {
            value: Xd,
            children: [
              I(ls, {
                value: fn,
                children: I(I1, {
                  columns: br(-1),
                  onColumnResize: Hd,
                  sortColumns: v,
                  onSortColumnsChange: qd,
                  lastFrozenColumnIndex: q,
                  selectedCellIdx: U.rowIdx === Fe ? U.idx : void 0,
                  selectCell: Qd,
                  shouldFocusGrid: !Ri,
                  direction: L,
                }),
              }),
              Y.length === 0 && xe
                ? xe
                : je(tr, {
                    children: [
                      i == null
                        ? void 0
                        : i.map((J, be) => {
                            const $e = Te + be + 1,
                              Oe = be + Fe + 1,
                              Ne = U.rowIdx === Oe,
                              gt = oe + ee * be;
                            return I(
                              vc,
                              {
                                'aria-rowindex': $e,
                                rowIdx: Oe,
                                gridRowStart: $e,
                                row: J,
                                top: gt,
                                bottom: void 0,
                                viewportColumns: br(Oe),
                                lastFrozenColumnIndex: q,
                                selectedCellIdx: Ne ? U.idx : void 0,
                                isTop: !0,
                                showBorder: be === F - 1,
                                selectCell: Oi,
                              },
                              be,
                            );
                          }),
                      up(),
                      a == null
                        ? void 0
                        : a.map((J, be) => {
                            const $e = ve + Y.length + be + 1,
                              Oe = Y.length + be,
                              Ne = U.rowIdx === Oe,
                              gt = en > _e ? Et - ee * (a.length - be) : void 0,
                              ft = gt === void 0 ? ee * (a.length - 1 - be) : void 0;
                            return I(
                              vc,
                              {
                                'aria-rowindex': ve + he + be + 1,
                                rowIdx: Oe,
                                gridRowStart: $e,
                                row: J,
                                top: gt,
                                bottom: ft,
                                viewportColumns: br(Oe),
                                lastFrozenColumnIndex: q,
                                selectedCellIdx: Ne ? U.idx : void 0,
                                isTop: !1,
                                showBorder: be === 0,
                                selectCell: Oi,
                              },
                              be,
                            );
                          }),
                    ],
                  }),
            ],
          }),
          gC(Pt),
        ],
      }),
    ],
  });
}
let yc;
function xc(e) {
  return (
    yc ?? (yc = document.createExpression('div[@role="row"]/div[@tabindex="0"]')),
    yc.evaluate(e, 8).singleNodeValue
  );
}
function Xi(e, t) {
  return e.idx === t.idx && e.rowIdx === t.rowIdx;
}
const uw = te.forwardRef(cw);
function Ec({ onRowChange: e, row: t, column: o }) {
  const r = (i) => {
    e({ ...t, [o.key]: i.target.value });
  };
  return I(qr, { defaultValue: t[o.key], onChange: r });
}
const dw = ({ onChange: e, disabled: t, checked: o, ...r }) => {
  function i(a) {
    e(a.target.checked, a.nativeEvent.shiftKey);
  }
  return I(Nd, { ...r, isChecked: o, isDisabled: t, onChange: i });
};
function pw({
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
  onRowsChange: S,
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
  const z = te.useMemo(() => {
    const j = e.map((P) =>
      typeof P.editable == 'function'
        ? { ...P, editable: (B) => !!P.editable(B), renderEditCell: P.renderEditCell || Ec }
        : P.editable && !P.renderEditCell
        ? { ...P, renderEditCell: Ec }
        : P.renderEditCell && !P.editable
        ? { ...P, editable: !1 }
        : P,
    );
    return d ? [{ ...JC, minWidth: p }, ...j] : j;
  }, [d, e]);
  return I(uw, {
    columns: z,
    defaultColumnOptions: { width: i, minWidth: a, maxWidth: s, sortable: l, resizable: c },
    sortColumns: t,
    onSortColumnsChange: o,
    onColumnResize: r,
    rows: u,
    rowKeyGetter: b,
    rowHeight: v,
    headerRowHeight: g,
    selectedRows: h,
    onSelectedRowsChange: f,
    onRowsChange: S,
    onCellClick: w,
    onCellDoubleClick: E,
    onCellContextMenu: y,
    onCellKeyDown: m,
    direction: O,
    enableVirtualization: R,
    onCopy: D,
    onPaste: $,
    onScroll: N,
    renderers: { renderCheckbox: dw },
    className: `${k ?? 'rdg-light'}`,
  });
}
exports.Button = Hn;
exports.Checkbox = Nd;
exports.ComboBox = $d;
exports.LabelPosition = Kn;
exports.MenuItem = pC;
exports.RefSelector = lC;
exports.Slider = cC;
exports.Snackbar = dC;
exports.Switch = uC;
exports.Table = pw;
exports.TextField = qr;
function fw(e, t = 'top') {
  if (!e || typeof document > 'u') return;
  const o = document.head || document.querySelector('head'),
    r = o.querySelector(':first-child'),
    i = document.createElement('style');
  i.appendChild(document.createTextNode(e)),
    t === 'top' && r ? o.insertBefore(i, r) : o.appendChild(i);
}
fw(
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
//# sourceMappingURL=index.cjs.js.map
