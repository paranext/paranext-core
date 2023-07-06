'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const et = require('react'),
  co = require('react-dom'),
  ri = require('react-data-grid');
function Js(e) {
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
const g = Js(et),
  Zs = Js(co);
function cu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var Xr = { exports: {} },
  Qn = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ai;
function uu() {
  if (ai) return Qn;
  ai = 1;
  var e = et,
    t = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    r = Object.prototype.hasOwnProperty,
    a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, c, d) {
    var u,
      p = {},
      h = null,
      y = null;
    d !== void 0 && (h = '' + d),
      c.key !== void 0 && (h = '' + c.key),
      c.ref !== void 0 && (y = c.ref);
    for (u in c) r.call(c, u) && !i.hasOwnProperty(u) && (p[u] = c[u]);
    if (l && l.defaultProps) for (u in ((c = l.defaultProps), c)) p[u] === void 0 && (p[u] = c[u]);
    return { $$typeof: t, type: l, key: h, ref: y, props: p, _owner: a.current };
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
 */ var ii;
function du() {
  return (
    ii ||
      ((ii = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = et,
            t = Symbol.for('react.element'),
            o = Symbol.for('react.portal'),
            r = Symbol.for('react.fragment'),
            a = Symbol.for('react.strict_mode'),
            i = Symbol.for('react.profiler'),
            s = Symbol.for('react.provider'),
            l = Symbol.for('react.context'),
            c = Symbol.for('react.forward_ref'),
            d = Symbol.for('react.suspense'),
            u = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            h = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            v = Symbol.iterator,
            m = '@@iterator';
          function b(O) {
            if (O === null || typeof O != 'object') return null;
            var F = (v && O[v]) || O[m];
            return typeof F == 'function' ? F : null;
          }
          var C = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function T(O) {
            {
              for (var F = arguments.length, le = new Array(F > 1 ? F - 1 : 0), R = 1; R < F; R++)
                le[R - 1] = arguments[R];
              E('error', O, le);
            }
          }
          function E(O, F, le) {
            {
              var R = C.ReactDebugCurrentFrame,
                $ = R.getStackAddendum();
              $ !== '' && ((F += '%s'), (le = le.concat([$])));
              var Y = le.map(function (ne) {
                return String(ne);
              });
              Y.unshift('Warning: ' + F), Function.prototype.apply.call(console[O], console, Y);
            }
          }
          var x = !1,
            f = !1,
            k = !1,
            w = !1,
            D = !1,
            z;
          z = Symbol.for('react.module.reference');
          function N(O) {
            return !!(
              typeof O == 'string' ||
              typeof O == 'function' ||
              O === r ||
              O === i ||
              D ||
              O === a ||
              O === d ||
              O === u ||
              w ||
              O === y ||
              x ||
              f ||
              k ||
              (typeof O == 'object' &&
                O !== null &&
                (O.$$typeof === h ||
                  O.$$typeof === p ||
                  O.$$typeof === s ||
                  O.$$typeof === l ||
                  O.$$typeof === c ||
                  O.$$typeof === z ||
                  O.getModuleId !== void 0))
            );
          }
          function I(O, F, le) {
            var R = O.displayName;
            if (R) return R;
            var $ = F.displayName || F.name || '';
            return $ !== '' ? le + '(' + $ + ')' : le;
          }
          function G(O) {
            return O.displayName || 'Context';
          }
          function j(O) {
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
              case d:
                return 'Suspense';
              case u:
                return 'SuspenseList';
            }
            if (typeof O == 'object')
              switch (O.$$typeof) {
                case l:
                  var F = O;
                  return G(F) + '.Consumer';
                case s:
                  var le = O;
                  return G(le._context) + '.Provider';
                case c:
                  return I(O, O.render, 'ForwardRef');
                case p:
                  var R = O.displayName || null;
                  return R !== null ? R : j(O.type) || 'Memo';
                case h: {
                  var $ = O,
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
          var M = Object.assign,
            A = 0,
            H,
            ie,
            Q,
            V,
            S,
            L,
            X;
          function B() {}
          B.__reactDisabledLog = !0;
          function q() {
            {
              if (A === 0) {
                (H = console.log),
                  (ie = console.info),
                  (Q = console.warn),
                  (V = console.error),
                  (S = console.group),
                  (L = console.groupCollapsed),
                  (X = console.groupEnd);
                var O = { configurable: !0, enumerable: !0, value: B, writable: !0 };
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
              A++;
            }
          }
          function K() {
            {
              if ((A--, A === 0)) {
                var O = { configurable: !0, enumerable: !0, writable: !0 };
                Object.defineProperties(console, {
                  log: M({}, O, { value: H }),
                  info: M({}, O, { value: ie }),
                  warn: M({}, O, { value: Q }),
                  error: M({}, O, { value: V }),
                  group: M({}, O, { value: S }),
                  groupCollapsed: M({}, O, { value: L }),
                  groupEnd: M({}, O, { value: X }),
                });
              }
              A < 0 &&
                T('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var re = C.ReactCurrentDispatcher,
            Z;
          function ae(O, F, le) {
            {
              if (Z === void 0)
                try {
                  throw Error();
                } catch ($) {
                  var R = $.stack.trim().match(/\n( *(at )?)/);
                  Z = (R && R[1]) || '';
                }
              return (
                `
` +
                Z +
                O
              );
            }
          }
          var ce = !1,
            ue;
          {
            var me = typeof WeakMap == 'function' ? WeakMap : Map;
            ue = new me();
          }
          function P(O, F) {
            if (!O || ce) return '';
            {
              var le = ue.get(O);
              if (le !== void 0) return le;
            }
            var R;
            ce = !0;
            var $ = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var Y;
            (Y = re.current), (re.current = null), q();
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
                  } catch (jt) {
                    R = jt;
                  }
                  Reflect.construct(O, [], ne);
                } else {
                  try {
                    ne.call();
                  } catch (jt) {
                    R = jt;
                  }
                  O.call(ne.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (jt) {
                  R = jt;
                }
                O();
              }
            } catch (jt) {
              if (jt && R && typeof jt.stack == 'string') {
                for (
                  var fe = jt.stack.split(`
`),
                    be = R.stack.split(`
`),
                    ge = fe.length - 1,
                    ke = be.length - 1;
                  ge >= 1 && ke >= 0 && fe[ge] !== be[ke];

                )
                  ke--;
                for (; ge >= 1 && ke >= 0; ge--, ke--)
                  if (fe[ge] !== be[ke]) {
                    if (ge !== 1 || ke !== 1)
                      do
                        if ((ge--, ke--, ke < 0 || fe[ge] !== be[ke])) {
                          var Oe =
                            `
` + fe[ge].replace(' at new ', ' at ');
                          return (
                            O.displayName &&
                              Oe.includes('<anonymous>') &&
                              (Oe = Oe.replace('<anonymous>', O.displayName)),
                            typeof O == 'function' && ue.set(O, Oe),
                            Oe
                          );
                        }
                      while (ge >= 1 && ke >= 0);
                    break;
                  }
              }
            } finally {
              (ce = !1), (re.current = Y), K(), (Error.prepareStackTrace = $);
            }
            var ze = O ? O.displayName || O.name : '',
              an = ze ? ae(ze) : '';
            return typeof O == 'function' && ue.set(O, an), an;
          }
          function Ce(O, F, le) {
            return P(O, !1);
          }
          function J(O) {
            var F = O.prototype;
            return !!(F && F.isReactComponent);
          }
          function W(O, F, le) {
            if (O == null) return '';
            if (typeof O == 'function') return P(O, J(O));
            if (typeof O == 'string') return ae(O);
            switch (O) {
              case d:
                return ae('Suspense');
              case u:
                return ae('SuspenseList');
            }
            if (typeof O == 'object')
              switch (O.$$typeof) {
                case c:
                  return Ce(O.render);
                case p:
                  return W(O.type, F, le);
                case h: {
                  var R = O,
                    $ = R._payload,
                    Y = R._init;
                  try {
                    return W(Y($), F, le);
                  } catch {}
                }
              }
            return '';
          }
          var Te = Object.prototype.hasOwnProperty,
            pe = {},
            Re = C.ReactDebugCurrentFrame;
          function je(O) {
            if (O) {
              var F = O._owner,
                le = W(O.type, O._source, F ? F.type : null);
              Re.setExtraStackFrame(le);
            } else Re.setExtraStackFrame(null);
          }
          function Je(O, F, le, R, $) {
            {
              var Y = Function.call.bind(Te);
              for (var ne in O)
                if (Y(O, ne)) {
                  var fe = void 0;
                  try {
                    if (typeof O[ne] != 'function') {
                      var be = Error(
                        (R || 'React class') +
                          ': ' +
                          le +
                          ' type `' +
                          ne +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof O[ne] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((be.name = 'Invariant Violation'), be);
                    }
                    fe = O[ne](F, ne, R, le, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (ge) {
                    fe = ge;
                  }
                  fe &&
                    !(fe instanceof Error) &&
                    (je($),
                    T(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      R || 'React class',
                      le,
                      ne,
                      typeof fe,
                    ),
                    je(null)),
                    fe instanceof Error &&
                      !(fe.message in pe) &&
                      ((pe[fe.message] = !0),
                      je($),
                      T('Failed %s type: %s', le, fe.message),
                      je(null));
                }
            }
          }
          var Ge = Array.isArray;
          function Fe(O) {
            return Ge(O);
          }
          function Ze(O) {
            {
              var F = typeof Symbol == 'function' && Symbol.toStringTag,
                le = (F && O[Symbol.toStringTag]) || O.constructor.name || 'Object';
              return le;
            }
          }
          function ee(O) {
            try {
              return te(O), !1;
            } catch {
              return !0;
            }
          }
          function te(O) {
            return '' + O;
          }
          function ye(O) {
            if (ee(O))
              return (
                T(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  Ze(O),
                ),
                te(O)
              );
          }
          var he = C.ReactCurrentOwner,
            Ee = { key: !0, ref: !0, __self: !0, __source: !0 },
            Pe,
            se,
            Se;
          Se = {};
          function U(O) {
            if (Te.call(O, 'ref')) {
              var F = Object.getOwnPropertyDescriptor(O, 'ref').get;
              if (F && F.isReactWarning) return !1;
            }
            return O.ref !== void 0;
          }
          function ve(O) {
            if (Te.call(O, 'key')) {
              var F = Object.getOwnPropertyDescriptor(O, 'key').get;
              if (F && F.isReactWarning) return !1;
            }
            return O.key !== void 0;
          }
          function we(O, F) {
            if (typeof O.ref == 'string' && he.current && F && he.current.stateNode !== F) {
              var le = j(he.current.type);
              Se[le] ||
                (T(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  j(he.current.type),
                  O.ref,
                ),
                (Se[le] = !0));
            }
          }
          function mt(O, F) {
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
                Object.defineProperty(O, 'key', { get: le, configurable: !0 });
            }
          }
          function bt(O, F) {
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
                Object.defineProperty(O, 'ref', { get: le, configurable: !0 });
            }
          }
          var lt = function (O, F, le, R, $, Y, ne) {
            var fe = { $$typeof: t, type: O, key: F, ref: le, props: ne, _owner: Y };
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
                value: R,
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
          function Et(O, F, le, R, $) {
            {
              var Y,
                ne = {},
                fe = null,
                be = null;
              le !== void 0 && (ye(le), (fe = '' + le)),
                ve(F) && (ye(F.key), (fe = '' + F.key)),
                U(F) && ((be = F.ref), we(F, $));
              for (Y in F) Te.call(F, Y) && !Ee.hasOwnProperty(Y) && (ne[Y] = F[Y]);
              if (O && O.defaultProps) {
                var ge = O.defaultProps;
                for (Y in ge) ne[Y] === void 0 && (ne[Y] = ge[Y]);
              }
              if (fe || be) {
                var ke = typeof O == 'function' ? O.displayName || O.name || 'Unknown' : O;
                fe && mt(ne, ke), be && bt(ne, ke);
              }
              return lt(O, fe, be, $, R, he.current, ne);
            }
          }
          var Ot = C.ReactCurrentOwner,
            Qe = C.ReactDebugCurrentFrame;
          function ct(O) {
            if (O) {
              var F = O._owner,
                le = W(O.type, O._source, F ? F.type : null);
              Qe.setExtraStackFrame(le);
            } else Qe.setExtraStackFrame(null);
          }
          var dt;
          dt = !1;
          function Ht(O) {
            return typeof O == 'object' && O !== null && O.$$typeof === t;
          }
          function qt() {
            {
              if (Ot.current) {
                var O = j(Ot.current.type);
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
          function on(O) {
            {
              if (O !== void 0) {
                var F = O.fileName.replace(/^.*[\\\/]/, ''),
                  le = O.lineNumber;
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
          var Ct = {};
          function Yt(O) {
            {
              var F = qt();
              if (!F) {
                var le = typeof O == 'string' ? O : O.displayName || O.name;
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
          function Kt(O, F) {
            {
              if (!O._store || O._store.validated || O.key != null) return;
              O._store.validated = !0;
              var le = Yt(F);
              if (Ct[le]) return;
              Ct[le] = !0;
              var R = '';
              O &&
                O._owner &&
                O._owner !== Ot.current &&
                (R = ' It was passed a child from ' + j(O._owner.type) + '.'),
                ct(O),
                T(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  le,
                  R,
                ),
                ct(null);
            }
          }
          function Tt(O, F) {
            {
              if (typeof O != 'object') return;
              if (Fe(O))
                for (var le = 0; le < O.length; le++) {
                  var R = O[le];
                  Ht(R) && Kt(R, F);
                }
              else if (Ht(O)) O._store && (O._store.validated = !0);
              else if (O) {
                var $ = b(O);
                if (typeof $ == 'function' && $ !== O.entries)
                  for (var Y = $.call(O), ne; !(ne = Y.next()).done; )
                    Ht(ne.value) && Kt(ne.value, F);
              }
            }
          }
          function hn(O) {
            {
              var F = O.type;
              if (F == null || typeof F == 'string') return;
              var le;
              if (typeof F == 'function') le = F.propTypes;
              else if (typeof F == 'object' && (F.$$typeof === c || F.$$typeof === p))
                le = F.propTypes;
              else return;
              if (le) {
                var R = j(F);
                Je(le, O.props, 'prop', R, O);
              } else if (F.PropTypes !== void 0 && !dt) {
                dt = !0;
                var $ = j(F);
                T(
                  'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                  $ || 'Unknown',
                );
              }
              typeof F.getDefaultProps == 'function' &&
                !F.getDefaultProps.isReactClassApproved &&
                T(
                  'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.',
                );
            }
          }
          function rn(O) {
            {
              for (var F = Object.keys(O.props), le = 0; le < F.length; le++) {
                var R = F[le];
                if (R !== 'children' && R !== 'key') {
                  ct(O),
                    T(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      R,
                    ),
                    ct(null);
                  break;
                }
              }
              O.ref !== null &&
                (ct(O), T('Invalid attribute `ref` supplied to `React.Fragment`.'), ct(null));
            }
          }
          function wt(O, F, le, R, $, Y) {
            {
              var ne = N(O);
              if (!ne) {
                var fe = '';
                (O === void 0 ||
                  (typeof O == 'object' && O !== null && Object.keys(O).length === 0)) &&
                  (fe +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var be = on($);
                be ? (fe += be) : (fe += qt());
                var ge;
                O === null
                  ? (ge = 'null')
                  : Fe(O)
                  ? (ge = 'array')
                  : O !== void 0 && O.$$typeof === t
                  ? ((ge = '<' + (j(O.type) || 'Unknown') + ' />'),
                    (fe = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (ge = typeof O),
                  T(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    ge,
                    fe,
                  );
              }
              var ke = Et(O, F, le, $, Y);
              if (ke == null) return ke;
              if (ne) {
                var Oe = F.children;
                if (Oe !== void 0)
                  if (R)
                    if (Fe(Oe)) {
                      for (var ze = 0; ze < Oe.length; ze++) Tt(Oe[ze], O);
                      Object.freeze && Object.freeze(Oe);
                    } else
                      T(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else Tt(Oe, O);
              }
              return O === r ? rn(ke) : hn(ke), ke;
            }
          }
          function Lt(O, F, le) {
            return wt(O, F, le, !0);
          }
          function Gt(O, F, le) {
            return wt(O, F, le, !1);
          }
          var bn = Gt,
            st = Lt;
          (eo.Fragment = r), (eo.jsx = bn), (eo.jsxs = st);
        })()),
    eo
  );
}
process.env.NODE_ENV === 'production' ? (Xr.exports = uu()) : (Xr.exports = du());
var ha = Xr.exports;
const pu = ha.Fragment,
  _ = ha.jsx,
  Xe = ha.jsxs,
  fu = { black: '#000', white: '#fff' },
  vo = fu,
  mu = {
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
  $n = mu,
  hu = {
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
  Nn = hu,
  bu = {
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
  Pn = bu,
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
  In = gu,
  vu = {
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
  Mn = vu,
  yu = {
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
  to = yu,
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
  Eu = xu;
function Bt(e, t) {
  return process.env.NODE_ENV === 'production'
    ? () => null
    : function (...r) {
        return e(...r) || t(...r);
      };
}
function An(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function Qs(e) {
  if (!An(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = Qs(e[o]);
    }),
    t
  );
}
function _t(e, t, o = { clone: !0 }) {
  const r = o.clone ? { ...e } : e;
  return (
    An(e) &&
      An(t) &&
      Object.keys(t).forEach((a) => {
        a !== '__proto__' &&
          (An(t[a]) && a in e && An(e[a])
            ? (r[a] = _t(e[a], t[a], o))
            : o.clone
            ? (r[a] = An(t[a]) ? Qs(t[a]) : t[a])
            : (r[a] = t[a]));
      }),
    r
  );
}
var Jr = { exports: {} },
  Po = { exports: {} },
  Ve = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var si;
function Ou() {
  if (si) return Ve;
  si = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    t = e ? Symbol.for('react.element') : 60103,
    o = e ? Symbol.for('react.portal') : 60106,
    r = e ? Symbol.for('react.fragment') : 60107,
    a = e ? Symbol.for('react.strict_mode') : 60108,
    i = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    l = e ? Symbol.for('react.context') : 60110,
    c = e ? Symbol.for('react.async_mode') : 60111,
    d = e ? Symbol.for('react.concurrent_mode') : 60111,
    u = e ? Symbol.for('react.forward_ref') : 60112,
    p = e ? Symbol.for('react.suspense') : 60113,
    h = e ? Symbol.for('react.suspense_list') : 60120,
    y = e ? Symbol.for('react.memo') : 60115,
    v = e ? Symbol.for('react.lazy') : 60116,
    m = e ? Symbol.for('react.block') : 60121,
    b = e ? Symbol.for('react.fundamental') : 60117,
    C = e ? Symbol.for('react.responder') : 60118,
    T = e ? Symbol.for('react.scope') : 60119;
  function E(f) {
    if (typeof f == 'object' && f !== null) {
      var k = f.$$typeof;
      switch (k) {
        case t:
          switch (((f = f.type), f)) {
            case c:
            case d:
            case r:
            case i:
            case a:
            case p:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case u:
                case v:
                case y:
                case s:
                  return f;
                default:
                  return k;
              }
          }
        case o:
          return k;
      }
    }
  }
  function x(f) {
    return E(f) === d;
  }
  return (
    (Ve.AsyncMode = c),
    (Ve.ConcurrentMode = d),
    (Ve.ContextConsumer = l),
    (Ve.ContextProvider = s),
    (Ve.Element = t),
    (Ve.ForwardRef = u),
    (Ve.Fragment = r),
    (Ve.Lazy = v),
    (Ve.Memo = y),
    (Ve.Portal = o),
    (Ve.Profiler = i),
    (Ve.StrictMode = a),
    (Ve.Suspense = p),
    (Ve.isAsyncMode = function (f) {
      return x(f) || E(f) === c;
    }),
    (Ve.isConcurrentMode = x),
    (Ve.isContextConsumer = function (f) {
      return E(f) === l;
    }),
    (Ve.isContextProvider = function (f) {
      return E(f) === s;
    }),
    (Ve.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (Ve.isForwardRef = function (f) {
      return E(f) === u;
    }),
    (Ve.isFragment = function (f) {
      return E(f) === r;
    }),
    (Ve.isLazy = function (f) {
      return E(f) === v;
    }),
    (Ve.isMemo = function (f) {
      return E(f) === y;
    }),
    (Ve.isPortal = function (f) {
      return E(f) === o;
    }),
    (Ve.isProfiler = function (f) {
      return E(f) === i;
    }),
    (Ve.isStrictMode = function (f) {
      return E(f) === a;
    }),
    (Ve.isSuspense = function (f) {
      return E(f) === p;
    }),
    (Ve.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === d ||
        f === i ||
        f === a ||
        f === p ||
        f === h ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === v ||
            f.$$typeof === y ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === u ||
            f.$$typeof === b ||
            f.$$typeof === C ||
            f.$$typeof === T ||
            f.$$typeof === m))
      );
    }),
    (Ve.typeOf = E),
    Ve
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
 */ var li;
function Cu() {
  return (
    li ||
      ((li = 1),
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
            d = e ? Symbol.for('react.concurrent_mode') : 60111,
            u = e ? Symbol.for('react.forward_ref') : 60112,
            p = e ? Symbol.for('react.suspense') : 60113,
            h = e ? Symbol.for('react.suspense_list') : 60120,
            y = e ? Symbol.for('react.memo') : 60115,
            v = e ? Symbol.for('react.lazy') : 60116,
            m = e ? Symbol.for('react.block') : 60121,
            b = e ? Symbol.for('react.fundamental') : 60117,
            C = e ? Symbol.for('react.responder') : 60118,
            T = e ? Symbol.for('react.scope') : 60119;
          function E(P) {
            return (
              typeof P == 'string' ||
              typeof P == 'function' ||
              P === r ||
              P === d ||
              P === i ||
              P === a ||
              P === p ||
              P === h ||
              (typeof P == 'object' &&
                P !== null &&
                (P.$$typeof === v ||
                  P.$$typeof === y ||
                  P.$$typeof === s ||
                  P.$$typeof === l ||
                  P.$$typeof === u ||
                  P.$$typeof === b ||
                  P.$$typeof === C ||
                  P.$$typeof === T ||
                  P.$$typeof === m))
            );
          }
          function x(P) {
            if (typeof P == 'object' && P !== null) {
              var Ce = P.$$typeof;
              switch (Ce) {
                case t:
                  var J = P.type;
                  switch (J) {
                    case c:
                    case d:
                    case r:
                    case i:
                    case a:
                    case p:
                      return J;
                    default:
                      var W = J && J.$$typeof;
                      switch (W) {
                        case l:
                        case u:
                        case v:
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
            k = d,
            w = l,
            D = s,
            z = t,
            N = u,
            I = r,
            G = v,
            j = y,
            M = o,
            A = i,
            H = a,
            ie = p,
            Q = !1;
          function V(P) {
            return (
              Q ||
                ((Q = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              S(P) || x(P) === c
            );
          }
          function S(P) {
            return x(P) === d;
          }
          function L(P) {
            return x(P) === l;
          }
          function X(P) {
            return x(P) === s;
          }
          function B(P) {
            return typeof P == 'object' && P !== null && P.$$typeof === t;
          }
          function q(P) {
            return x(P) === u;
          }
          function K(P) {
            return x(P) === r;
          }
          function re(P) {
            return x(P) === v;
          }
          function Z(P) {
            return x(P) === y;
          }
          function ae(P) {
            return x(P) === o;
          }
          function ce(P) {
            return x(P) === i;
          }
          function ue(P) {
            return x(P) === a;
          }
          function me(P) {
            return x(P) === p;
          }
          (Be.AsyncMode = f),
            (Be.ConcurrentMode = k),
            (Be.ContextConsumer = w),
            (Be.ContextProvider = D),
            (Be.Element = z),
            (Be.ForwardRef = N),
            (Be.Fragment = I),
            (Be.Lazy = G),
            (Be.Memo = j),
            (Be.Portal = M),
            (Be.Profiler = A),
            (Be.StrictMode = H),
            (Be.Suspense = ie),
            (Be.isAsyncMode = V),
            (Be.isConcurrentMode = S),
            (Be.isContextConsumer = L),
            (Be.isContextProvider = X),
            (Be.isElement = B),
            (Be.isForwardRef = q),
            (Be.isFragment = K),
            (Be.isLazy = re),
            (Be.isMemo = Z),
            (Be.isPortal = ae),
            (Be.isProfiler = ce),
            (Be.isStrictMode = ue),
            (Be.isSuspense = me),
            (Be.isValidElementType = E),
            (Be.typeOf = x);
        })()),
    Be
  );
}
var ci;
function el() {
  return (
    ci ||
      ((ci = 1), process.env.NODE_ENV === 'production' ? (Po.exports = Ou()) : (Po.exports = Cu())),
    Po.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var _r, ui;
function Tu() {
  if (ui) return _r;
  ui = 1;
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
    (_r = a()
      ? Object.assign
      : function (i, s) {
          for (var l, c = r(i), d, u = 1; u < arguments.length; u++) {
            l = Object(arguments[u]);
            for (var p in l) t.call(l, p) && (c[p] = l[p]);
            if (e) {
              d = e(l);
              for (var h = 0; h < d.length; h++) o.call(l, d[h]) && (c[d[h]] = l[d[h]]);
            }
          }
          return c;
        }),
    _r
  );
}
var Ar, di;
function ba() {
  if (di) return Ar;
  di = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Ar = e), Ar;
}
var Dr, pi;
function tl() {
  return pi || ((pi = 1), (Dr = Function.call.bind(Object.prototype.hasOwnProperty))), Dr;
}
var Lr, fi;
function wu() {
  if (fi) return Lr;
  fi = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = ba(),
      o = {},
      r = tl();
    e = function (i) {
      var s = 'Warning: ' + i;
      typeof console < 'u' && console.error(s);
      try {
        throw new Error(s);
      } catch {}
    };
  }
  function a(i, s, l, c, d) {
    if (process.env.NODE_ENV !== 'production') {
      for (var u in i)
        if (r(i, u)) {
          var p;
          try {
            if (typeof i[u] != 'function') {
              var h = Error(
                (c || 'React class') +
                  ': ' +
                  l +
                  ' type `' +
                  u +
                  '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                  typeof i[u] +
                  '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
              );
              throw ((h.name = 'Invariant Violation'), h);
            }
            p = i[u](s, u, c, l, null, t);
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
    (a.resetWarningCache = function () {
      process.env.NODE_ENV !== 'production' && (o = {});
    }),
    (Lr = a),
    Lr
  );
}
var jr, mi;
function ku() {
  if (mi) return jr;
  mi = 1;
  var e = el(),
    t = Tu(),
    o = ba(),
    r = tl(),
    a = wu(),
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
    (jr = function (l, c) {
      var d = typeof Symbol == 'function' && Symbol.iterator,
        u = '@@iterator';
      function p(S) {
        var L = S && ((d && S[d]) || S[u]);
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
          arrayOf: E,
          element: x(),
          elementType: f(),
          instanceOf: k,
          node: N(),
          objectOf: D,
          oneOf: w,
          oneOfType: z,
          shape: G,
          exact: j,
        };
      function v(S, L) {
        return S === L ? S !== 0 || 1 / S === 1 / L : S !== S && L !== L;
      }
      function m(S, L) {
        (this.message = S), (this.data = L && typeof L == 'object' ? L : {}), (this.stack = '');
      }
      m.prototype = Error.prototype;
      function b(S) {
        if (process.env.NODE_ENV !== 'production')
          var L = {},
            X = 0;
        function B(K, re, Z, ae, ce, ue, me) {
          if (((ae = ae || h), (ue = ue || Z), me !== o)) {
            if (c) {
              var P = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((P.name = 'Invariant Violation'), P);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Ce = ae + ':' + Z;
              !L[Ce] &&
                X < 3 &&
                (i(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    ue +
                    '` prop on `' +
                    ae +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (L[Ce] = !0),
                X++);
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
                      ('in `' + ae + '`, but its value is `null`.'),
                  )
                : new m(
                    'The ' +
                      ce +
                      ' `' +
                      ue +
                      '` is marked as required in ' +
                      ('`' + ae + '`, but its value is `undefined`.'),
                  )
              : null
            : S(re, Z, ae, ce, ue);
        }
        var q = B.bind(null, !1);
        return (q.isRequired = B.bind(null, !0)), q;
      }
      function C(S) {
        function L(X, B, q, K, re, Z) {
          var ae = X[B],
            ce = H(ae);
          if (ce !== S) {
            var ue = ie(ae);
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type ' +
                ('`' + ue + '` supplied to `' + q + '`, expected ') +
                ('`' + S + '`.'),
              { expectedType: S },
            );
          }
          return null;
        }
        return b(L);
      }
      function T() {
        return b(s);
      }
      function E(S) {
        function L(X, B, q, K, re) {
          if (typeof S != 'function')
            return new m(
              'Property `' +
                re +
                '` of component `' +
                q +
                '` has invalid PropType notation inside arrayOf.',
            );
          var Z = X[B];
          if (!Array.isArray(Z)) {
            var ae = H(Z);
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type ' +
                ('`' + ae + '` supplied to `' + q + '`, expected an array.'),
            );
          }
          for (var ce = 0; ce < Z.length; ce++) {
            var ue = S(Z, ce, q, K, re + '[' + ce + ']', o);
            if (ue instanceof Error) return ue;
          }
          return null;
        }
        return b(L);
      }
      function x() {
        function S(L, X, B, q, K) {
          var re = L[X];
          if (!l(re)) {
            var Z = H(re);
            return new m(
              'Invalid ' +
                q +
                ' `' +
                K +
                '` of type ' +
                ('`' + Z + '` supplied to `' + B + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return b(S);
      }
      function f() {
        function S(L, X, B, q, K) {
          var re = L[X];
          if (!e.isValidElementType(re)) {
            var Z = H(re);
            return new m(
              'Invalid ' +
                q +
                ' `' +
                K +
                '` of type ' +
                ('`' + Z + '` supplied to `' + B + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return b(S);
      }
      function k(S) {
        function L(X, B, q, K, re) {
          if (!(X[B] instanceof S)) {
            var Z = S.name || h,
              ae = V(X[B]);
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type ' +
                ('`' + ae + '` supplied to `' + q + '`, expected ') +
                ('instance of `' + Z + '`.'),
            );
          }
          return null;
        }
        return b(L);
      }
      function w(S) {
        if (!Array.isArray(S))
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
        function L(X, B, q, K, re) {
          for (var Z = X[B], ae = 0; ae < S.length; ae++) if (v(Z, S[ae])) return null;
          var ce = JSON.stringify(S, function (me, P) {
            var Ce = ie(P);
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
              ('supplied to `' + q + '`, expected one of ' + ce + '.'),
          );
        }
        return b(L);
      }
      function D(S) {
        function L(X, B, q, K, re) {
          if (typeof S != 'function')
            return new m(
              'Property `' +
                re +
                '` of component `' +
                q +
                '` has invalid PropType notation inside objectOf.',
            );
          var Z = X[B],
            ae = H(Z);
          if (ae !== 'object')
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type ' +
                ('`' + ae + '` supplied to `' + q + '`, expected an object.'),
            );
          for (var ce in Z)
            if (r(Z, ce)) {
              var ue = S(Z, ce, q, K, re + '.' + ce, o);
              if (ue instanceof Error) return ue;
            }
          return null;
        }
        return b(L);
      }
      function z(S) {
        if (!Array.isArray(S))
          return (
            process.env.NODE_ENV !== 'production' &&
              i('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var L = 0; L < S.length; L++) {
          var X = S[L];
          if (typeof X != 'function')
            return (
              i(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  Q(X) +
                  ' at index ' +
                  L +
                  '.',
              ),
              s
            );
        }
        function B(q, K, re, Z, ae) {
          for (var ce = [], ue = 0; ue < S.length; ue++) {
            var me = S[ue],
              P = me(q, K, re, Z, ae, o);
            if (P == null) return null;
            P.data && r(P.data, 'expectedType') && ce.push(P.data.expectedType);
          }
          var Ce = ce.length > 0 ? ', expected one of type [' + ce.join(', ') + ']' : '';
          return new m('Invalid ' + Z + ' `' + ae + '` supplied to ' + ('`' + re + '`' + Ce + '.'));
        }
        return b(B);
      }
      function N() {
        function S(L, X, B, q, K) {
          return M(L[X])
            ? null
            : new m(
                'Invalid ' +
                  q +
                  ' `' +
                  K +
                  '` supplied to ' +
                  ('`' + B + '`, expected a ReactNode.'),
              );
        }
        return b(S);
      }
      function I(S, L, X, B, q) {
        return new m(
          (S || 'React class') +
            ': ' +
            L +
            ' type `' +
            X +
            '.' +
            B +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            q +
            '`.',
        );
      }
      function G(S) {
        function L(X, B, q, K, re) {
          var Z = X[B],
            ae = H(Z);
          if (ae !== 'object')
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type `' +
                ae +
                '` ' +
                ('supplied to `' + q + '`, expected `object`.'),
            );
          for (var ce in S) {
            var ue = S[ce];
            if (typeof ue != 'function') return I(q, K, re, ce, ie(ue));
            var me = ue(Z, ce, q, K, re + '.' + ce, o);
            if (me) return me;
          }
          return null;
        }
        return b(L);
      }
      function j(S) {
        function L(X, B, q, K, re) {
          var Z = X[B],
            ae = H(Z);
          if (ae !== 'object')
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type `' +
                ae +
                '` ' +
                ('supplied to `' + q + '`, expected `object`.'),
            );
          var ce = t({}, X[B], S);
          for (var ue in ce) {
            var me = S[ue];
            if (r(S, ue) && typeof me != 'function') return I(q, K, re, ue, ie(me));
            if (!me)
              return new m(
                'Invalid ' +
                  K +
                  ' `' +
                  re +
                  '` key `' +
                  ue +
                  '` supplied to `' +
                  q +
                  '`.\nBad object: ' +
                  JSON.stringify(X[B], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(S), null, '  '),
              );
            var P = me(Z, ue, q, K, re + '.' + ue, o);
            if (P) return P;
          }
          return null;
        }
        return b(L);
      }
      function M(S) {
        switch (typeof S) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !S;
          case 'object':
            if (Array.isArray(S)) return S.every(M);
            if (S === null || l(S)) return !0;
            var L = p(S);
            if (L) {
              var X = L.call(S),
                B;
              if (L !== S.entries) {
                for (; !(B = X.next()).done; ) if (!M(B.value)) return !1;
              } else
                for (; !(B = X.next()).done; ) {
                  var q = B.value;
                  if (q && !M(q[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function A(S, L) {
        return S === 'symbol'
          ? !0
          : L
          ? L['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && L instanceof Symbol)
          : !1;
      }
      function H(S) {
        var L = typeof S;
        return Array.isArray(S) ? 'array' : S instanceof RegExp ? 'object' : A(L, S) ? 'symbol' : L;
      }
      function ie(S) {
        if (typeof S > 'u' || S === null) return '' + S;
        var L = H(S);
        if (L === 'object') {
          if (S instanceof Date) return 'date';
          if (S instanceof RegExp) return 'regexp';
        }
        return L;
      }
      function Q(S) {
        var L = ie(S);
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
      function V(S) {
        return !S.constructor || !S.constructor.name ? h : S.constructor.name;
      }
      return (
        (y.checkPropTypes = a), (y.resetWarningCache = a.resetWarningCache), (y.PropTypes = y), y
      );
    }),
    jr
  );
}
var Fr, hi;
function Su() {
  if (hi) return Fr;
  hi = 1;
  var e = ba();
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
    Fr
  );
}
if (process.env.NODE_ENV !== 'production') {
  var Ru = el(),
    $u = !0;
  Jr.exports = ku()(Ru.isElement, $u);
} else Jr.exports = Su()();
var Nu = Jr.exports;
const n = cu(Nu);
function Pu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function nl(e, t, o, r, a) {
  const i = e[t],
    s = a || t;
  if (i == null || typeof window > 'u') return null;
  let l;
  const c = i.type;
  return (
    typeof c == 'function' &&
      !Pu(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const ol = Bt(n.element, nl);
ol.isRequired = Bt(n.element.isRequired, nl);
const qn = ol;
function Iu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Mu(e, t, o, r, a) {
  const i = e[t],
    s = a || t;
  if (i == null || typeof window > 'u') return null;
  let l;
  return (
    typeof i == 'function' &&
      !Iu(i) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const ga = Bt(n.elementType, Mu),
  _u = 'exact-prop: ​';
function va(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : {
        ...e,
        [_u]: (t) => {
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
  Ue = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bi;
function Au() {
  if (bi) return Ue;
  bi = 1;
  var e = Symbol.for('react.element'),
    t = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    a = Symbol.for('react.profiler'),
    i = Symbol.for('react.provider'),
    s = Symbol.for('react.context'),
    l = Symbol.for('react.server_context'),
    c = Symbol.for('react.forward_ref'),
    d = Symbol.for('react.suspense'),
    u = Symbol.for('react.suspense_list'),
    p = Symbol.for('react.memo'),
    h = Symbol.for('react.lazy'),
    y = Symbol.for('react.offscreen'),
    v;
  v = Symbol.for('react.module.reference');
  function m(b) {
    if (typeof b == 'object' && b !== null) {
      var C = b.$$typeof;
      switch (C) {
        case e:
          switch (((b = b.type), b)) {
            case o:
            case a:
            case r:
            case d:
            case u:
              return b;
            default:
              switch (((b = b && b.$$typeof), b)) {
                case l:
                case s:
                case c:
                case h:
                case p:
                case i:
                  return b;
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
    (Ue.ContextProvider = i),
    (Ue.Element = e),
    (Ue.ForwardRef = c),
    (Ue.Fragment = o),
    (Ue.Lazy = h),
    (Ue.Memo = p),
    (Ue.Portal = t),
    (Ue.Profiler = a),
    (Ue.StrictMode = r),
    (Ue.Suspense = d),
    (Ue.SuspenseList = u),
    (Ue.isAsyncMode = function () {
      return !1;
    }),
    (Ue.isConcurrentMode = function () {
      return !1;
    }),
    (Ue.isContextConsumer = function (b) {
      return m(b) === s;
    }),
    (Ue.isContextProvider = function (b) {
      return m(b) === i;
    }),
    (Ue.isElement = function (b) {
      return typeof b == 'object' && b !== null && b.$$typeof === e;
    }),
    (Ue.isForwardRef = function (b) {
      return m(b) === c;
    }),
    (Ue.isFragment = function (b) {
      return m(b) === o;
    }),
    (Ue.isLazy = function (b) {
      return m(b) === h;
    }),
    (Ue.isMemo = function (b) {
      return m(b) === p;
    }),
    (Ue.isPortal = function (b) {
      return m(b) === t;
    }),
    (Ue.isProfiler = function (b) {
      return m(b) === a;
    }),
    (Ue.isStrictMode = function (b) {
      return m(b) === r;
    }),
    (Ue.isSuspense = function (b) {
      return m(b) === d;
    }),
    (Ue.isSuspenseList = function (b) {
      return m(b) === u;
    }),
    (Ue.isValidElementType = function (b) {
      return (
        typeof b == 'string' ||
        typeof b == 'function' ||
        b === o ||
        b === a ||
        b === r ||
        b === d ||
        b === u ||
        b === y ||
        (typeof b == 'object' &&
          b !== null &&
          (b.$$typeof === h ||
            b.$$typeof === p ||
            b.$$typeof === i ||
            b.$$typeof === s ||
            b.$$typeof === c ||
            b.$$typeof === v ||
            b.getModuleId !== void 0))
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
 */ var gi;
function Du() {
  return (
    gi ||
      ((gi = 1),
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
            d = Symbol.for('react.suspense'),
            u = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            h = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            v = !1,
            m = !1,
            b = !1,
            C = !1,
            T = !1,
            E;
          E = Symbol.for('react.module.reference');
          function x(J) {
            return !!(
              typeof J == 'string' ||
              typeof J == 'function' ||
              J === o ||
              J === a ||
              T ||
              J === r ||
              J === d ||
              J === u ||
              C ||
              J === y ||
              v ||
              m ||
              b ||
              (typeof J == 'object' &&
                J !== null &&
                (J.$$typeof === h ||
                  J.$$typeof === p ||
                  J.$$typeof === i ||
                  J.$$typeof === s ||
                  J.$$typeof === c ||
                  J.$$typeof === E ||
                  J.getModuleId !== void 0))
            );
          }
          function f(J) {
            if (typeof J == 'object' && J !== null) {
              var W = J.$$typeof;
              switch (W) {
                case e:
                  var Te = J.type;
                  switch (Te) {
                    case o:
                    case a:
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
                        case i:
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
          var k = s,
            w = i,
            D = e,
            z = c,
            N = o,
            I = h,
            G = p,
            j = t,
            M = a,
            A = r,
            H = d,
            ie = u,
            Q = !1,
            V = !1;
          function S(J) {
            return (
              Q ||
                ((Q = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function L(J) {
            return (
              V ||
                ((V = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function X(J) {
            return f(J) === s;
          }
          function B(J) {
            return f(J) === i;
          }
          function q(J) {
            return typeof J == 'object' && J !== null && J.$$typeof === e;
          }
          function K(J) {
            return f(J) === c;
          }
          function re(J) {
            return f(J) === o;
          }
          function Z(J) {
            return f(J) === h;
          }
          function ae(J) {
            return f(J) === p;
          }
          function ce(J) {
            return f(J) === t;
          }
          function ue(J) {
            return f(J) === a;
          }
          function me(J) {
            return f(J) === r;
          }
          function P(J) {
            return f(J) === d;
          }
          function Ce(J) {
            return f(J) === u;
          }
          (We.ContextConsumer = k),
            (We.ContextProvider = w),
            (We.Element = D),
            (We.ForwardRef = z),
            (We.Fragment = N),
            (We.Lazy = I),
            (We.Memo = G),
            (We.Portal = j),
            (We.Profiler = M),
            (We.StrictMode = A),
            (We.Suspense = H),
            (We.SuspenseList = ie),
            (We.isAsyncMode = S),
            (We.isConcurrentMode = L),
            (We.isContextConsumer = X),
            (We.isContextProvider = B),
            (We.isElement = q),
            (We.isForwardRef = K),
            (We.isFragment = re),
            (We.isLazy = Z),
            (We.isMemo = ae),
            (We.isPortal = ce),
            (We.isProfiler = ue),
            (We.isStrictMode = me),
            (We.isSuspense = P),
            (We.isSuspenseList = Ce),
            (We.isValidElementType = x),
            (We.typeOf = f);
        })()),
    We
  );
}
process.env.NODE_ENV === 'production' ? (Zr.exports = Au()) : (Zr.exports = Du());
var yo = Zr.exports;
const Lu = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function ju(e) {
  const t = `${e}`.match(Lu);
  return (t && t[1]) || '';
}
function rl(e, t = '') {
  return e.displayName || e.name || ju(e) || t;
}
function yi(e, t, o) {
  const r = rl(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function Fu(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return rl(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case yo.ForwardRef:
          return yi(e, e.render, 'ForwardRef');
        case yo.Memo:
          return yi(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function en(e, t, o, r, a) {
  if (process.env.NODE_ENV === 'production') return null;
  const i = e[t],
    s = a || t;
  return i == null
    ? null
    : i && i.nodeType !== 1
    ? new Error(`Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an HTMLElement.`)
    : null;
}
const zu = n.oneOfType([n.func, n.object]),
  xt = zu;
function oe(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : pn(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function xi(...e) {
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
function al(e, t = 166) {
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
function zr(e, t) {
  return g.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function rt(e) {
  return (e && e.ownerDocument) || document;
}
function wn(e) {
  return rt(e).defaultView || window;
}
function Ho(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const Vu = typeof window < 'u' ? g.useLayoutEffect : g.useEffect,
  tn = Vu;
let Ei = 0;
function Bu(e) {
  const [t, o] = g.useState(e),
    r = e || t;
  return (
    g.useEffect(() => {
      t == null && ((Ei += 1), o(`mui-${Ei}`));
    }, [t]),
    r
  );
}
const Oi = g['useId'.toString()];
function il(e) {
  if (Oi !== void 0) {
    const t = Oi();
    return e ?? t;
  }
  return Bu(e);
}
function Uu(e, t, o, r, a) {
  if (process.env.NODE_ENV === 'production') return null;
  const i = a || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${i}\` is not supported. Please remove it.`)
    : null;
}
function Cn({ controlled: e, default: t, name: o, state: r = 'value' }) {
  const { current: a } = g.useRef(e !== void 0),
    [i, s] = g.useState(t),
    l = a ? e : i;
  if (process.env.NODE_ENV !== 'production') {
    g.useEffect(() => {
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
    const { current: d } = g.useRef(t);
    g.useEffect(() => {
      !a &&
        d !== t &&
        console.error(
          [
            `MUI: A component is changing the default ${r} state of an uncontrolled ${o} after being initialized. To suppress this warning opt to use a controlled ${o}.`,
          ].join(`
`),
        );
    }, [JSON.stringify(t)]);
  }
  const c = g.useCallback((d) => {
    a || s(d);
  }, []);
  return [l, c];
}
function ft(e) {
  const t = g.useRef(e);
  return (
    tn(() => {
      t.current = e;
    }),
    g.useCallback((...o) => (0, t.current)(...o), [])
  );
}
function at(...e) {
  return g.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              Ho(o, t);
            });
          },
    e,
  );
}
let ir = !0,
  Qr = !1,
  Ci;
const Wu = {
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
function Hu(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && Wu[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function qu(e) {
  e.metaKey || e.altKey || e.ctrlKey || (ir = !0);
}
function Vr() {
  ir = !1;
}
function Yu() {
  this.visibilityState === 'hidden' && Qr && (ir = !0);
}
function Ku(e) {
  e.addEventListener('keydown', qu, !0),
    e.addEventListener('mousedown', Vr, !0),
    e.addEventListener('pointerdown', Vr, !0),
    e.addEventListener('touchstart', Vr, !0),
    e.addEventListener('visibilitychange', Yu, !0);
}
function Gu(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return ir || Hu(t);
}
function sl() {
  const e = g.useCallback((a) => {
      a != null && Ku(a.ownerDocument);
    }, []),
    t = g.useRef(!1);
  function o() {
    return t.current
      ? ((Qr = !0),
        window.clearTimeout(Ci),
        (Ci = window.setTimeout(() => {
          Qr = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(a) {
    return Gu(a) ? ((t.current = !0), !0) : !1;
  }
  return { isFocusVisibleRef: t, onFocus: r, onBlur: o, ref: e };
}
function ll(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const Xu = (e) => {
    const t = g.useRef({});
    return (
      g.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  Ju = Xu,
  Zu = {
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
  Qu = Zu;
function ed(e) {
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
function td(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const nd = Number.isInteger || td;
function cl(e, t, o, r) {
  const a = e[t];
  if (a == null || !nd(a)) {
    const i = ed(a);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function ul(e, t, ...o) {
  return e[t] === void 0 ? null : cl(e, t, ...o);
}
function ea() {
  return null;
}
ul.isRequired = cl;
ea.isRequired = ea;
const ya = process.env.NODE_ENV === 'production' ? ea : ul;
function xa(e, t) {
  const o = { ...t };
  return (
    Object.keys(e).forEach((r) => {
      if (r.toString().match(/^(components|slots)$/)) o[r] = { ...e[r], ...o[r] };
      else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
        const a = e[r] || {},
          i = t[r];
        (o[r] = {}),
          !i || !Object.keys(i)
            ? (o[r] = a)
            : !a || !Object.keys(a)
            ? (o[r] = i)
            : ((o[r] = { ...i }),
              Object.keys(a).forEach((s) => {
                o[r][s] = xa(a[s], i[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function _e(e, t, o = void 0) {
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
const Ti = (e) => e,
  od = () => {
    let e = Ti;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Ti;
      },
    };
  },
  rd = od(),
  ad = rd,
  id = {
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
  const r = id[t];
  return r ? `${o}-${r}` : `${ad.generate(e)}-${t}`;
}
function Ne(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((a) => {
      r[a] = Ie(e, a, o);
    }),
    r
  );
}
const sr = '$$material';
function qo() {
  return (
    (qo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
          }
          return e;
        }),
    qo.apply(this, arguments)
  );
}
function dl(e) {
  var t = Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var sd =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  ld = dl(function (e) {
    return (
      sd.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
    );
  });
function cd(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function ud(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var dd = (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(ud(this));
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
          var s = cd(a);
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
  pt = '-ms-',
  Yo = '-moz-',
  Ae = '-webkit-',
  Ea = 'comm',
  Oa = 'rule',
  Ca = 'decl',
  pd = '@import',
  pl = '@keyframes',
  fd = '@layer',
  md = Math.abs,
  lr = String.fromCharCode,
  hd = Object.assign;
function bd(e, t) {
  return ut(e, 0) ^ 45
    ? (((((((t << 2) ^ ut(e, 0)) << 2) ^ ut(e, 1)) << 2) ^ ut(e, 2)) << 2) ^ ut(e, 3)
    : 0;
}
function fl(e) {
  return e.trim();
}
function gd(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function De(e, t, o) {
  return e.replace(t, o);
}
function ta(e, t) {
  return e.indexOf(t);
}
function ut(e, t) {
  return e.charCodeAt(t) | 0;
}
function xo(e, t, o) {
  return e.slice(t, o);
}
function Jt(e) {
  return e.length;
}
function Ta(e) {
  return e.length;
}
function Io(e, t) {
  return t.push(e), e;
}
function vd(e, t) {
  return e.map(t).join('');
}
var cr = 1,
  Fn = 1,
  ml = 0,
  yt = 0,
  it = 0,
  Yn = '';
function ur(e, t, o, r, a, i, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: a,
    children: i,
    line: cr,
    column: Fn,
    length: s,
    return: '',
  };
}
function no(e, t) {
  return hd(ur('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function yd() {
  return it;
}
function xd() {
  return (it = yt > 0 ? ut(Yn, --yt) : 0), Fn--, it === 10 && ((Fn = 1), cr--), it;
}
function $t() {
  return (it = yt < ml ? ut(Yn, yt++) : 0), Fn++, it === 10 && ((Fn = 1), cr++), it;
}
function Qt() {
  return ut(Yn, yt);
}
function zo() {
  return yt;
}
function wo(e, t) {
  return xo(Yn, e, t);
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
function hl(e) {
  return (cr = Fn = 1), (ml = Jt((Yn = e))), (yt = 0), [];
}
function bl(e) {
  return (Yn = ''), e;
}
function Vo(e) {
  return fl(wo(yt - 1, na(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ed(e) {
  for (; (it = Qt()) && it < 33; ) $t();
  return Eo(e) > 2 || Eo(it) > 3 ? '' : ' ';
}
function Od(e, t) {
  for (; --t && $t() && !(it < 48 || it > 102 || (it > 57 && it < 65) || (it > 70 && it < 97)); );
  return wo(e, zo() + (t < 6 && Qt() == 32 && $t() == 32));
}
function na(e) {
  for (; $t(); )
    switch (it) {
      case e:
        return yt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && na(it);
        break;
      case 40:
        e === 41 && na(e);
        break;
      case 92:
        $t();
        break;
    }
  return yt;
}
function Cd(e, t) {
  for (; $t() && e + it !== 47 + 10; ) if (e + it === 42 + 42 && Qt() === 47) break;
  return '/*' + wo(t, yt - 1) + '*' + lr(e === 47 ? e : $t());
}
function Td(e) {
  for (; !Eo(Qt()); ) $t();
  return wo(e, yt);
}
function wd(e) {
  return bl(Bo('', null, null, null, [''], (e = hl(e)), 0, [0], e));
}
function Bo(e, t, o, r, a, i, s, l, c) {
  for (
    var d = 0,
      u = 0,
      p = s,
      h = 0,
      y = 0,
      v = 0,
      m = 1,
      b = 1,
      C = 1,
      T = 0,
      E = '',
      x = a,
      f = i,
      k = r,
      w = E;
    b;

  )
    switch (((v = T), (T = $t()))) {
      case 40:
        if (v != 108 && ut(w, p - 1) == 58) {
          ta((w += De(Vo(T), '&', '&\f')), '&\f') != -1 && (C = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        w += Vo(T);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        w += Ed(v);
        break;
      case 92:
        w += Od(zo() - 1, 7);
        continue;
      case 47:
        switch (Qt()) {
          case 42:
          case 47:
            Io(kd(Cd($t(), zo()), t, o), c);
            break;
          default:
            w += '/';
        }
        break;
      case 123 * m:
        l[d++] = Jt(w) * C;
      case 125 * m:
      case 59:
      case 0:
        switch (T) {
          case 0:
          case 125:
            b = 0;
          case 59 + u:
            C == -1 && (w = De(w, /\f/g, '')),
              y > 0 &&
                Jt(w) - p &&
                Io(y > 32 ? ki(w + ';', r, o, p - 1) : ki(De(w, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            w += ';';
          default:
            if ((Io((k = wi(w, t, o, d, u, a, l, E, (x = []), (f = []), p)), i), T === 123))
              if (u === 0) Bo(w, t, k, k, x, i, p, l, f);
              else
                switch (h === 99 && ut(w, 3) === 110 ? 100 : h) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Bo(
                      e,
                      k,
                      k,
                      r && Io(wi(e, k, k, 0, 0, a, l, E, a, (x = []), p), f),
                      a,
                      f,
                      p,
                      l,
                      r ? x : f,
                    );
                    break;
                  default:
                    Bo(w, k, k, k, [''], f, 0, l, f);
                }
        }
        (d = u = y = 0), (m = C = 1), (E = w = ''), (p = s);
        break;
      case 58:
        (p = 1 + Jt(w)), (y = v);
      default:
        if (m < 1) {
          if (T == 123) --m;
          else if (T == 125 && m++ == 0 && xd() == 125) continue;
        }
        switch (((w += lr(T)), T * m)) {
          case 38:
            C = u > 0 ? 1 : ((w += '\f'), -1);
            break;
          case 44:
            (l[d++] = (Jt(w) - 1) * C), (C = 1);
            break;
          case 64:
            Qt() === 45 && (w += Vo($t())), (h = Qt()), (u = p = Jt((E = w += Td(zo())))), T++;
            break;
          case 45:
            v === 45 && Jt(w) == 2 && (m = 0);
        }
    }
  return i;
}
function wi(e, t, o, r, a, i, s, l, c, d, u) {
  for (var p = a - 1, h = a === 0 ? i : [''], y = Ta(h), v = 0, m = 0, b = 0; v < r; ++v)
    for (var C = 0, T = xo(e, p + 1, (p = md((m = s[v])))), E = e; C < y; ++C)
      (E = fl(m > 0 ? h[C] + ' ' + T : De(T, /&\f/g, h[C]))) && (c[b++] = E);
  return ur(e, t, o, a === 0 ? Oa : l, c, d, u);
}
function kd(e, t, o) {
  return ur(e, t, o, Ea, lr(yd()), xo(e, 2, -2), 0);
}
function ki(e, t, o, r) {
  return ur(e, t, o, Ca, xo(e, 0, r), xo(e, r + 1, -1), r);
}
function Ln(e, t) {
  for (var o = '', r = Ta(e), a = 0; a < r; a++) o += t(e[a], a, e, t) || '';
  return o;
}
function Sd(e, t, o, r) {
  switch (e.type) {
    case fd:
      if (e.children.length) break;
    case pd:
    case Ca:
      return (e.return = e.return || e.value);
    case Ea:
      return '';
    case pl:
      return (e.return = e.value + '{' + Ln(e.children, r) + '}');
    case Oa:
      e.value = e.props.join(',');
  }
  return Jt((o = Ln(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function Rd(e) {
  var t = Ta(e);
  return function (o, r, a, i) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, a, i) || '';
    return s;
  };
}
function $d(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var Nd = function (t, o, r) {
    for (var a = 0, i = 0; (a = i), (i = Qt()), a === 38 && i === 12 && (o[r] = 1), !Eo(i); ) $t();
    return wo(t, yt);
  },
  Pd = function (t, o) {
    var r = -1,
      a = 44;
    do
      switch (Eo(a)) {
        case 0:
          a === 38 && Qt() === 12 && (o[r] = 1), (t[r] += Nd(yt - 1, o, r));
          break;
        case 2:
          t[r] += Vo(a);
          break;
        case 4:
          if (a === 44) {
            (t[++r] = Qt() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += lr(a);
      }
    while ((a = $t()));
    return t;
  },
  Id = function (t, o) {
    return bl(Pd(hl(t), o));
  },
  Si = new WeakMap(),
  Md = function (t) {
    if (!(t.type !== 'rule' || !t.parent || t.length < 1)) {
      for (
        var o = t.value, r = t.parent, a = t.column === r.column && t.line === r.line;
        r.type !== 'rule';

      )
        if (((r = r.parent), !r)) return;
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !Si.get(r)) && !a) {
        Si.set(t, !0);
        for (var i = [], s = Id(o, i), l = r.props, c = 0, d = 0; c < s.length; c++)
          for (var u = 0; u < l.length; u++, d++)
            t.props[d] = i[c] ? s[c].replace(/&\f/g, l[u]) : l[u] + ' ' + s[c];
      }
    }
  },
  _d = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      o.charCodeAt(0) === 108 && o.charCodeAt(2) === 98 && ((t.return = ''), (t.value = ''));
    }
  },
  Ad =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  Dd = function (t) {
    return t.type === 'comm' && t.children.indexOf(Ad) > -1;
  },
  Ld = function (t) {
    return function (o, r, a) {
      if (!(o.type !== 'rule' || t.compat)) {
        var i = o.value.match(/(:first|:nth|:nth-last)-child/g);
        if (i) {
          for (var s = !!o.parent, l = s ? o.parent.children : a, c = l.length - 1; c >= 0; c--) {
            var d = l[c];
            if (d.line < o.line) break;
            if (d.column < o.column) {
              if (Dd(d)) return;
              break;
            }
          }
          i.forEach(function (u) {
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
  gl = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  jd = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!gl(o[r])) return !0;
    return !1;
  },
  Ri = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  Fd = function (t, o, r) {
    gl(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          Ri(t))
        : jd(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          Ri(t)));
  };
function vl(e, t) {
  switch (bd(e, t)) {
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
      return Ae + e + Yo + e + pt + e + e;
    case 6828:
    case 4268:
      return Ae + e + pt + e + e;
    case 6165:
      return Ae + e + pt + 'flex-' + e + e;
    case 5187:
      return Ae + e + De(e, /(\w+).+(:[^]+)/, Ae + 'box-$1$2' + pt + 'flex-$1$2') + e;
    case 5443:
      return Ae + e + pt + 'flex-item-' + De(e, /flex-|-self/, '') + e;
    case 4675:
      return Ae + e + pt + 'flex-line-pack' + De(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return Ae + e + pt + De(e, 'shrink', 'negative') + e;
    case 5292:
      return Ae + e + pt + De(e, 'basis', 'preferred-size') + e;
    case 6060:
      return Ae + 'box-' + De(e, '-grow', '') + Ae + e + pt + De(e, 'grow', 'positive') + e;
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
          De(e, /(.+:)(flex-)?(.*)/, Ae + 'box-pack:$3' + pt + 'flex-pack:$3'),
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
        switch (ut(e, t + 1)) {
          case 109:
            if (ut(e, t + 4) !== 45) break;
          case 102:
            return (
              De(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + Ae + '$2-$3$1' + Yo + (ut(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~ta(e, 'stretch') ? vl(De(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (ut(e, t + 1) !== 115) break;
    case 6444:
      switch (ut(e, Jt(e) - 3 - (~ta(e, '!important') && 10))) {
        case 107:
          return De(e, ':', ':' + Ae) + e;
        case 101:
          return (
            De(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                Ae +
                (ut(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                Ae +
                '$2$3$1' +
                pt +
                '$2box$3',
            ) + e
          );
      }
      break;
    case 5936:
      switch (ut(e, t + 11)) {
        case 114:
          return Ae + e + pt + De(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return Ae + e + pt + De(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return Ae + e + pt + De(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return Ae + e + pt + e + e;
  }
  return e;
}
var zd = function (t, o, r, a) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Ca:
          t.return = vl(t.value, t.length);
          break;
        case pl:
          return Ln([no(t, { value: De(t.value, '@', '@' + Ae) })], a);
        case Oa:
          if (t.length)
            return vd(t.props, function (i) {
              switch (gd(i, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Ln([no(t, { props: [De(i, /:(read-\w+)/, ':' + Yo + '$1')] })], a);
                case '::placeholder':
                  return Ln(
                    [
                      no(t, { props: [De(i, /:(plac\w+)/, ':' + Ae + 'input-$1')] }),
                      no(t, { props: [De(i, /:(plac\w+)/, ':' + Yo + '$1')] }),
                      no(t, { props: [De(i, /:(plac\w+)/, pt + 'input-$1')] }),
                    ],
                    a,
                  );
              }
              return '';
            });
      }
  },
  Vd = [zd],
  Bd = function (t) {
    var o = t.key;
    if (process.env.NODE_ENV !== 'production' && !o)
      throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
    if (o === 'css') {
      var r = document.querySelectorAll('style[data-emotion]:not([data-s])');
      Array.prototype.forEach.call(r, function (m) {
        var b = m.getAttribute('data-emotion');
        b.indexOf(' ') !== -1 && (document.head.appendChild(m), m.setAttribute('data-s', ''));
      });
    }
    var a = t.stylisPlugins || Vd;
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
        function (m) {
          for (var b = m.getAttribute('data-emotion').split(' '), C = 1; C < b.length; C++)
            i[b[C]] = !0;
          l.push(m);
        },
      );
    var c,
      d = [Md, _d];
    process.env.NODE_ENV !== 'production' &&
      d.push(
        Ld({
          get compat() {
            return v.compat;
          },
        }),
        Fd,
      );
    {
      var u,
        p = [
          Sd,
          process.env.NODE_ENV !== 'production'
            ? function (m) {
                m.root ||
                  (m.return
                    ? u.insert(m.return)
                    : m.value && m.type !== Ea && u.insert(m.value + '{}'));
              }
            : $d(function (m) {
                u.insert(m);
              }),
        ],
        h = Rd(d.concat(a, p)),
        y = function (b) {
          return Ln(wd(b), h);
        };
      c = function (b, C, T, E) {
        (u = T),
          process.env.NODE_ENV !== 'production' &&
            C.map !== void 0 &&
            (u = {
              insert: function (f) {
                T.insert(f + C.map);
              },
            }),
          y(b ? b + '{' + C.styles + '}' : C.styles),
          E && (v.inserted[C.name] = !0);
      };
    }
    var v = {
      key: o,
      sheet: new dd({
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
  oa = { exports: {} },
  He = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $i;
function Ud() {
  if ($i) return He;
  $i = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    t = e ? Symbol.for('react.element') : 60103,
    o = e ? Symbol.for('react.portal') : 60106,
    r = e ? Symbol.for('react.fragment') : 60107,
    a = e ? Symbol.for('react.strict_mode') : 60108,
    i = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    l = e ? Symbol.for('react.context') : 60110,
    c = e ? Symbol.for('react.async_mode') : 60111,
    d = e ? Symbol.for('react.concurrent_mode') : 60111,
    u = e ? Symbol.for('react.forward_ref') : 60112,
    p = e ? Symbol.for('react.suspense') : 60113,
    h = e ? Symbol.for('react.suspense_list') : 60120,
    y = e ? Symbol.for('react.memo') : 60115,
    v = e ? Symbol.for('react.lazy') : 60116,
    m = e ? Symbol.for('react.block') : 60121,
    b = e ? Symbol.for('react.fundamental') : 60117,
    C = e ? Symbol.for('react.responder') : 60118,
    T = e ? Symbol.for('react.scope') : 60119;
  function E(f) {
    if (typeof f == 'object' && f !== null) {
      var k = f.$$typeof;
      switch (k) {
        case t:
          switch (((f = f.type), f)) {
            case c:
            case d:
            case r:
            case i:
            case a:
            case p:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case u:
                case v:
                case y:
                case s:
                  return f;
                default:
                  return k;
              }
          }
        case o:
          return k;
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
    (He.Lazy = v),
    (He.Memo = y),
    (He.Portal = o),
    (He.Profiler = i),
    (He.StrictMode = a),
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
      return E(f) === v;
    }),
    (He.isMemo = function (f) {
      return E(f) === y;
    }),
    (He.isPortal = function (f) {
      return E(f) === o;
    }),
    (He.isProfiler = function (f) {
      return E(f) === i;
    }),
    (He.isStrictMode = function (f) {
      return E(f) === a;
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
        f === i ||
        f === a ||
        f === p ||
        f === h ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === v ||
            f.$$typeof === y ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === u ||
            f.$$typeof === b ||
            f.$$typeof === C ||
            f.$$typeof === T ||
            f.$$typeof === m))
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
 */ var Ni;
function Wd() {
  return (
    Ni ||
      ((Ni = 1),
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
            d = e ? Symbol.for('react.concurrent_mode') : 60111,
            u = e ? Symbol.for('react.forward_ref') : 60112,
            p = e ? Symbol.for('react.suspense') : 60113,
            h = e ? Symbol.for('react.suspense_list') : 60120,
            y = e ? Symbol.for('react.memo') : 60115,
            v = e ? Symbol.for('react.lazy') : 60116,
            m = e ? Symbol.for('react.block') : 60121,
            b = e ? Symbol.for('react.fundamental') : 60117,
            C = e ? Symbol.for('react.responder') : 60118,
            T = e ? Symbol.for('react.scope') : 60119;
          function E(P) {
            return (
              typeof P == 'string' ||
              typeof P == 'function' ||
              P === r ||
              P === d ||
              P === i ||
              P === a ||
              P === p ||
              P === h ||
              (typeof P == 'object' &&
                P !== null &&
                (P.$$typeof === v ||
                  P.$$typeof === y ||
                  P.$$typeof === s ||
                  P.$$typeof === l ||
                  P.$$typeof === u ||
                  P.$$typeof === b ||
                  P.$$typeof === C ||
                  P.$$typeof === T ||
                  P.$$typeof === m))
            );
          }
          function x(P) {
            if (typeof P == 'object' && P !== null) {
              var Ce = P.$$typeof;
              switch (Ce) {
                case t:
                  var J = P.type;
                  switch (J) {
                    case c:
                    case d:
                    case r:
                    case i:
                    case a:
                    case p:
                      return J;
                    default:
                      var W = J && J.$$typeof;
                      switch (W) {
                        case l:
                        case u:
                        case v:
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
            k = d,
            w = l,
            D = s,
            z = t,
            N = u,
            I = r,
            G = v,
            j = y,
            M = o,
            A = i,
            H = a,
            ie = p,
            Q = !1;
          function V(P) {
            return (
              Q ||
                ((Q = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              S(P) || x(P) === c
            );
          }
          function S(P) {
            return x(P) === d;
          }
          function L(P) {
            return x(P) === l;
          }
          function X(P) {
            return x(P) === s;
          }
          function B(P) {
            return typeof P == 'object' && P !== null && P.$$typeof === t;
          }
          function q(P) {
            return x(P) === u;
          }
          function K(P) {
            return x(P) === r;
          }
          function re(P) {
            return x(P) === v;
          }
          function Z(P) {
            return x(P) === y;
          }
          function ae(P) {
            return x(P) === o;
          }
          function ce(P) {
            return x(P) === i;
          }
          function ue(P) {
            return x(P) === a;
          }
          function me(P) {
            return x(P) === p;
          }
          (qe.AsyncMode = f),
            (qe.ConcurrentMode = k),
            (qe.ContextConsumer = w),
            (qe.ContextProvider = D),
            (qe.Element = z),
            (qe.ForwardRef = N),
            (qe.Fragment = I),
            (qe.Lazy = G),
            (qe.Memo = j),
            (qe.Portal = M),
            (qe.Profiler = A),
            (qe.StrictMode = H),
            (qe.Suspense = ie),
            (qe.isAsyncMode = V),
            (qe.isConcurrentMode = S),
            (qe.isContextConsumer = L),
            (qe.isContextProvider = X),
            (qe.isElement = B),
            (qe.isForwardRef = q),
            (qe.isFragment = K),
            (qe.isLazy = re),
            (qe.isMemo = Z),
            (qe.isPortal = ae),
            (qe.isProfiler = ce),
            (qe.isStrictMode = ue),
            (qe.isSuspense = me),
            (qe.isValidElementType = E),
            (qe.typeOf = x);
        })()),
    qe
  );
}
process.env.NODE_ENV === 'production' ? (oa.exports = Ud()) : (oa.exports = Wd());
var Hd = oa.exports,
  yl = Hd,
  qd = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 },
  Yd = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },
  xl = {};
xl[yl.ForwardRef] = qd;
xl[yl.Memo] = Yd;
var Kd = !0;
function wa(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (a) {
      e[a] !== void 0 ? t.push(e[a] + ';') : (r += a + ' ');
    }),
    r
  );
}
var dr = function (t, o, r) {
    var a = t.key + '-' + o.name;
    (r === !1 || Kd === !1) && t.registered[a] === void 0 && (t.registered[a] = o.styles);
  },
  pr = function (t, o, r) {
    dr(t, o, r);
    var a = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var i = o;
      do t.insert(o === i ? '.' + a : '', i, t.sheet, !0), (i = i.next);
      while (i !== void 0);
    }
  };
function Gd(e) {
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
var Xd = {
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
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  Pi = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Jd =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  Zd = /[A-Z]|^ms/g,
  El = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  ka = function (t) {
    return t.charCodeAt(1) === 45;
  },
  Ii = function (t) {
    return t != null && typeof t != 'boolean';
  },
  Br = dl(function (e) {
    return ka(e) ? e : e.replace(Zd, '-$&').toLowerCase();
  }),
  Ko = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(El, function (r, a, i) {
            return (Ft = { name: a, styles: i, next: Ft }), a;
          });
    }
    return Xd[t] !== 1 && !ka(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var Qd =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    ep = ['normal', 'none', 'initial', 'inherit', 'unset'],
    tp = Ko,
    np = /^-ms-/,
    op = /-(.)/g,
    Mi = {};
  Ko = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (ep.indexOf(o) === -1 &&
          !Qd.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = tp(t, o);
    return (
      r !== '' &&
        !ka(t) &&
        t.indexOf('-') !== -1 &&
        Mi[t] === void 0 &&
        ((Mi[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(np, 'ms-').replace(op, function (a, i) {
              return i.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var Ol =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function Oo(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(Ol);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1) return (Ft = { name: o.name, styles: o.styles, next: Ft }), o.name;
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; ) (Ft = { name: r.name, styles: r.styles, next: Ft }), (r = r.next);
        var a = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (a += o.map), a;
      }
      return rp(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var i = Ft,
          s = o(e);
        return (Ft = i), Oo(e, t, s);
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
function rp(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var a = 0; a < o.length; a++) r += Oo(e, t, o[a]) + ';';
  else
    for (var i in o) {
      var s = o[i];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += i + '{' + t[s] + '}')
          : Ii(s) && (r += Br(i) + ':' + Ko(i, s) + ';');
      else {
        if (i === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(Ol);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) Ii(s[l]) && (r += Br(i) + ':' + Ko(i, s[l]) + ';');
        else {
          var c = Oo(e, t, s);
          switch (i) {
            case 'animation':
            case 'animationName': {
              r += Br(i) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && i === 'undefined' && console.error(Jd),
                (r += i + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var _i = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  Cl;
process.env.NODE_ENV !== 'production' &&
  (Cl = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var Ft,
  zn = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var a = !0,
      i = '';
    Ft = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((a = !1), (i += Oo(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(Pi),
        (i += s[0]));
    for (var l = 1; l < t.length; l++)
      (i += Oo(r, o, t[l])),
        a &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(Pi),
          (i += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (i = i.replace(Cl, function (h) {
        return (c = h), '';
      })),
      (_i.lastIndex = 0);
    for (var d = '', u; (u = _i.exec(i)) !== null; ) d += '-' + u[1];
    var p = Gd(i) + d;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: p,
          styles: i,
          map: c,
          next: Ft,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : { name: p, styles: i, next: Ft };
  },
  ap = function (t) {
    return t();
  },
  Tl = g['useInsertionEffect'] ? g['useInsertionEffect'] : !1,
  Sa = Tl || ap,
  Ai = Tl || g.useLayoutEffect,
  ip = {}.hasOwnProperty,
  Ra = g.createContext(typeof HTMLElement < 'u' ? Bd({ key: 'css' }) : null);
process.env.NODE_ENV !== 'production' && (Ra.displayName = 'EmotionCacheContext');
Ra.Provider;
var fr = function (t) {
    return et.forwardRef(function (o, r) {
      var a = et.useContext(Ra);
      return t(o, a, r);
    });
  },
  Kn = g.createContext({});
process.env.NODE_ENV !== 'production' && (Kn.displayName = 'EmotionThemeContext');
var Di = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  Li = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  sp = function (t) {
    var o = t.cache,
      r = t.serialized,
      a = t.isStringTag;
    return (
      dr(o, r, a),
      Sa(function () {
        return pr(o, r, a);
      }),
      null
    );
  },
  lp = fr(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var a = e[Di],
      i = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = wa(t.registered, i, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = zn(i, void 0, g.useContext(Kn));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[Li];
      c && (l = zn([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var d = {};
    for (var u in e)
      ip.call(e, u) &&
        u !== 'css' &&
        u !== Di &&
        (process.env.NODE_ENV === 'production' || u !== Li) &&
        (d[u] = e[u]);
    return (
      (d.ref = o),
      (d.className = s),
      g.createElement(
        g.Fragment,
        null,
        g.createElement(sp, { cache: t, serialized: l, isStringTag: typeof a == 'string' }),
        g.createElement(a, d),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (lp.displayName = 'EmotionCssPropInternal');
var cp = {
    name: '@emotion/react',
    version: '11.11.0',
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
        types: { import: './macro.d.mts', default: './macro.d.ts' },
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
    scripts: { 'test:typescript': 'dtslint types' },
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
    peerDependencies: { react: '>=16.8.0' },
    peerDependenciesMeta: { '@types/react': { optional: !0 } },
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
        extra: {
          './types/css-prop': './types/css-prop.d.ts',
          './macro': {
            types: { import: './macro.d.mts', default: './macro.d.ts' },
            default: './macro.js',
          },
        },
      },
    },
  },
  ji = !1,
  wl = fr(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !ji &&
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (ji = !0));
    var o = e.styles,
      r = zn([o], void 0, g.useContext(Kn)),
      a = g.useRef();
    return (
      Ai(
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
      Ai(
        function () {
          var i = a.current,
            s = i[0],
            l = i[1];
          if (l) {
            i[1] = !1;
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
process.env.NODE_ENV !== 'production' && (wl.displayName = 'EmotionGlobal');
function up() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return zn(t);
}
var $a = function () {
    var t = up.apply(void 0, arguments),
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
  dp = function e(t) {
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
function pp(e, t, o) {
  var r = [],
    a = wa(e, r, o);
  return r.length < 2 ? o : a + t(r);
}
var fp = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      Sa(function () {
        for (var a = 0; a < r.length; a++) pr(o, r[a], !1);
      }),
      null
    );
  },
  mp = fr(function (e, t) {
    var o = !1,
      r = [],
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++) u[p] = arguments[p];
        var h = zn(u, t.registered);
        return r.push(h), dr(t, h, !1), t.key + '-' + h.name;
      },
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++) u[p] = arguments[p];
        return pp(t.registered, a, dp(u));
      },
      s = { css: a, cx: i, theme: g.useContext(Kn) },
      l = e.children(s);
    return (
      (o = !0),
      g.createElement(g.Fragment, null, g.createElement(fp, { cache: t, serializedArr: r }), l)
    );
  });
process.env.NODE_ENV !== 'production' && (mp.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var Fi = !0,
    hp = typeof jest < 'u' || typeof vi < 'u';
  if (Fi && !hp) {
    var zi = typeof globalThis < 'u' ? globalThis : Fi ? window : global,
      Vi = '__EMOTION_REACT_' + cp.version.split('.')[0] + '__';
    zi[Vi] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (zi[Vi] = !0);
  }
}
var bp = ld,
  gp = function (t) {
    return t !== 'theme';
  },
  Bi = function (t) {
    return typeof t == 'string' && t.charCodeAt(0) > 96 ? bp : gp;
  },
  Ui = function (t, o, r) {
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
  Wi = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  vp = function (t) {
    var o = t.cache,
      r = t.serialized,
      a = t.isStringTag;
    return (
      dr(o, r, a),
      Sa(function () {
        return pr(o, r, a);
      }),
      null
    );
  },
  yp = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      a = (r && t.__emotion_base) || t,
      i,
      s;
    o !== void 0 && ((i = o.label), (s = o.target));
    var l = Ui(t, o, r),
      c = l || Bi(a),
      d = !c('as');
    return function () {
      var u = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((i !== void 0 && p.push('label:' + i + ';'), u[0] == null || u[0].raw === void 0))
        p.push.apply(p, u);
      else {
        process.env.NODE_ENV !== 'production' && u[0][0] === void 0 && console.error(Wi),
          p.push(u[0][0]);
        for (var h = u.length, y = 1; y < h; y++)
          process.env.NODE_ENV !== 'production' && u[0][y] === void 0 && console.error(Wi),
            p.push(u[y], u[0][y]);
      }
      var v = fr(function (m, b, C) {
        var T = (d && m.as) || a,
          E = '',
          x = [],
          f = m;
        if (m.theme == null) {
          f = {};
          for (var k in m) f[k] = m[k];
          f.theme = g.useContext(Kn);
        }
        typeof m.className == 'string'
          ? (E = wa(b.registered, x, m.className))
          : m.className != null && (E = m.className + ' ');
        var w = zn(p.concat(x), b.registered, f);
        (E += b.key + '-' + w.name), s !== void 0 && (E += ' ' + s);
        var D = d && l === void 0 ? Bi(T) : c,
          z = {};
        for (var N in m) (d && N === 'as') || (D(N) && (z[N] = m[N]));
        return (
          (z.className = E),
          (z.ref = C),
          g.createElement(
            g.Fragment,
            null,
            g.createElement(vp, { cache: b, serialized: w, isStringTag: typeof T == 'string' }),
            g.createElement(T, z),
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
        (v.withComponent = function (m, b) {
          return e(m, qo({}, o, b, { shouldForwardProp: Ui(v, b, !0) })).apply(void 0, p);
        }),
        v
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
  ra = yp.bind();
xp.forEach(function (e) {
  ra[e] = ra(e);
});
function Ep(e) {
  return e == null || Object.keys(e).length === 0;
}
function kl(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return _(wl, { styles: typeof t == 'function' ? (a) => t(Ep(a) ? o : a) : t });
}
process.env.NODE_ENV !== 'production' &&
  (kl.propTypes = {
    defaultTheme: n.object,
    styles: n.oneOfType([n.array, n.string, n.object, n.func]),
  });
/**
 * @mui/styled-engine v5.12.3
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function Op(e, t) {
  const o = ra(e, t);
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
const Cp = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  Tp = (e) => {
    const t = Object.keys(e).map((o) => ({ key: o, val: e[o] })) || [];
    return t.sort((o, r) => o.val - r.val), t.reduce((o, r) => ({ ...o, [r.key]: r.val }), {});
  };
function wp(e) {
  const {
      values: t = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: o = 'px',
      step: r = 5,
      ...a
    } = e,
    i = Tp(t),
    s = Object.keys(i);
  function l(h) {
    return `@media (min-width:${typeof t[h] == 'number' ? t[h] : h}${o})`;
  }
  function c(h) {
    return `@media (max-width:${(typeof t[h] == 'number' ? t[h] : h) - r / 100}${o})`;
  }
  function d(h, y) {
    const v = s.indexOf(y);
    return `@media (min-width:${typeof t[h] == 'number' ? t[h] : h}${o}) and (max-width:${
      (v !== -1 && typeof t[s[v]] == 'number' ? t[s[v]] : y) - r / 100
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
  return { keys: s, values: i, up: l, down: c, between: d, only: u, not: p, unit: o, ...a };
}
const kp = { borderRadius: 4 },
  Sp = kp,
  Rp =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  fn = Rp;
function po(e, t) {
  return t ? _t(e, t, { clone: !1 }) : e;
}
const Na = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  Hi = { keys: ['xs', 'sm', 'md', 'lg', 'xl'], up: (e) => `@media (min-width:${Na[e]}px)` };
function sn(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Hi;
    return t.reduce((s, l, c) => ((s[i.up(i.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const i = r.breakpoints || Hi;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || Na).indexOf(l) !== -1) {
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
function $p(e = {}) {
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
function Np(e, t) {
  return e.reduce((o, r) => {
    const a = o[r];
    return (!a || Object.keys(a).length === 0) && delete o[r], o;
  }, t);
}
function mr(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((a, i) => (a && a[i] ? a[i] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, a) => (r && r[a] != null ? r[a] : null), e);
}
function Go(e, t, o, r = o) {
  let a;
  return (
    typeof e == 'function' ? (a = e(o)) : Array.isArray(e) ? (a = e[o] || r) : (a = mr(e, o) || r),
    t && (a = t(a, r, e)),
    a
  );
}
function Ke(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: a } = e,
    i = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        d = mr(c, r) || {};
      return sn(s, l, (p) => {
        let h = Go(d, a, p);
        return (
          p === h &&
            typeof p == 'string' &&
            (h = Go(d, a, `${t}${p === 'default' ? '' : oe(p)}`, p)),
          o === !1 ? h : { [o]: h }
        );
      });
    };
  return (
    (i.propTypes = process.env.NODE_ENV !== 'production' ? { [t]: fn } : {}),
    (i.filterProps = [t]),
    i
  );
}
function Pp(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const Ip = { m: 'margin', p: 'padding' },
  Mp = { t: 'Top', r: 'Right', b: 'Bottom', l: 'Left', x: ['Left', 'Right'], y: ['Top', 'Bottom'] },
  qi = { marginX: 'mx', marginY: 'my', paddingX: 'px', paddingY: 'py' },
  _p = Pp((e) => {
    if (e.length > 2)
      if (qi[e]) e = qi[e];
      else return [e];
    const [t, o] = e.split(''),
      r = Ip[t],
      a = Mp[o] || '';
    return Array.isArray(a) ? a.map((i) => r + i) : [r + a];
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
  Ap = [...hr, ...br];
function ko(e, t, o, r) {
  var a;
  const i = (a = mr(e, t, !1)) != null ? a : o;
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
function Sl(e) {
  return ko(e, 'spacing', 8, 'spacing');
}
function So(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function Dp(e, t) {
  return (o) => e.reduce((r, a) => ((r[a] = So(t, o)), r), {});
}
function Lp(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const a = _p(o),
    i = Dp(a, r),
    s = e[o];
  return sn(e, s, i);
}
function Rl(e, t) {
  const o = Sl(e.theme);
  return Object.keys(e)
    .map((r) => Lp(e, t, r, o))
    .reduce(po, {});
}
function nt(e) {
  return Rl(e, hr);
}
nt.propTypes =
  process.env.NODE_ENV !== 'production' ? hr.reduce((e, t) => ((e[t] = fn), e), {}) : {};
nt.filterProps = hr;
function ot(e) {
  return Rl(e, br);
}
ot.propTypes =
  process.env.NODE_ENV !== 'production' ? br.reduce((e, t) => ((e[t] = fn), e), {}) : {};
ot.filterProps = br;
process.env.NODE_ENV !== 'production' && Ap.reduce((e, t) => ((e[t] = fn), e), {});
function jp(e = 8) {
  if (e.mui) return e;
  const t = Sl({ spacing: e }),
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
function gr(...e) {
  const t = e.reduce(
      (r, a) => (
        a.filterProps.forEach((i) => {
          r[i] = a;
        }),
        r
      ),
      {},
    ),
    o = (r) => Object.keys(r).reduce((a, i) => (t[i] ? po(a, t[i](r)) : a), {});
  return (
    (o.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((r, a) => Object.assign(r, a.propTypes), {})
        : {}),
    (o.filterProps = e.reduce((r, a) => r.concat(a.filterProps), [])),
    o
  );
}
function Zt(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Fp = Ke({ prop: 'border', themeKey: 'borders', transform: Zt }),
  zp = Ke({ prop: 'borderTop', themeKey: 'borders', transform: Zt }),
  Vp = Ke({ prop: 'borderRight', themeKey: 'borders', transform: Zt }),
  Bp = Ke({ prop: 'borderBottom', themeKey: 'borders', transform: Zt }),
  Up = Ke({ prop: 'borderLeft', themeKey: 'borders', transform: Zt }),
  Wp = Ke({ prop: 'borderColor', themeKey: 'palette' }),
  Hp = Ke({ prop: 'borderTopColor', themeKey: 'palette' }),
  qp = Ke({ prop: 'borderRightColor', themeKey: 'palette' }),
  Yp = Ke({ prop: 'borderBottomColor', themeKey: 'palette' }),
  Kp = Ke({ prop: 'borderLeftColor', themeKey: 'palette' }),
  vr = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = ko(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({ borderRadius: So(t, r) });
      return sn(e, e.borderRadius, o);
    }
    return null;
  };
vr.propTypes = process.env.NODE_ENV !== 'production' ? { borderRadius: fn } : {};
vr.filterProps = ['borderRadius'];
gr(Fp, zp, Vp, Bp, Up, Wp, Hp, qp, Yp, Kp, vr);
const yr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = ko(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({ gap: So(t, r) });
    return sn(e, e.gap, o);
  }
  return null;
};
yr.propTypes = process.env.NODE_ENV !== 'production' ? { gap: fn } : {};
yr.filterProps = ['gap'];
const xr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = ko(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({ columnGap: So(t, r) });
    return sn(e, e.columnGap, o);
  }
  return null;
};
xr.propTypes = process.env.NODE_ENV !== 'production' ? { columnGap: fn } : {};
xr.filterProps = ['columnGap'];
const Er = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = ko(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({ rowGap: So(t, r) });
    return sn(e, e.rowGap, o);
  }
  return null;
};
Er.propTypes = process.env.NODE_ENV !== 'production' ? { rowGap: fn } : {};
Er.filterProps = ['rowGap'];
const Gp = Ke({ prop: 'gridColumn' }),
  Xp = Ke({ prop: 'gridRow' }),
  Jp = Ke({ prop: 'gridAutoFlow' }),
  Zp = Ke({ prop: 'gridAutoColumns' }),
  Qp = Ke({ prop: 'gridAutoRows' }),
  ef = Ke({ prop: 'gridTemplateColumns' }),
  tf = Ke({ prop: 'gridTemplateRows' }),
  nf = Ke({ prop: 'gridTemplateAreas' }),
  of = Ke({ prop: 'gridArea' });
gr(yr, xr, Er, Gp, Xp, Jp, Zp, Qp, ef, tf, nf, of);
function jn(e, t) {
  return t === 'grey' ? t : e;
}
const rf = Ke({ prop: 'color', themeKey: 'palette', transform: jn }),
  af = Ke({ prop: 'bgcolor', cssProperty: 'backgroundColor', themeKey: 'palette', transform: jn }),
  sf = Ke({ prop: 'backgroundColor', themeKey: 'palette', transform: jn });
gr(rf, af, sf);
function Rt(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const lf = Ke({ prop: 'width', transform: Rt }),
  Pa = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, a, i;
        return {
          maxWidth:
            ((r = e.theme) == null || (a = r.breakpoints) == null || (i = a.values) == null
              ? void 0
              : i[o]) ||
            Na[o] ||
            Rt(o),
        };
      };
      return sn(e, e.maxWidth, t);
    }
    return null;
  };
Pa.filterProps = ['maxWidth'];
const cf = Ke({ prop: 'minWidth', transform: Rt }),
  uf = Ke({ prop: 'height', transform: Rt }),
  df = Ke({ prop: 'maxHeight', transform: Rt }),
  pf = Ke({ prop: 'minHeight', transform: Rt });
Ke({ prop: 'size', cssProperty: 'width', transform: Rt });
Ke({ prop: 'size', cssProperty: 'height', transform: Rt });
const ff = Ke({ prop: 'boxSizing' });
gr(lf, Pa, cf, uf, df, pf, ff);
const mf = {
    border: { themeKey: 'borders', transform: Zt },
    borderTop: { themeKey: 'borders', transform: Zt },
    borderRight: { themeKey: 'borders', transform: Zt },
    borderBottom: { themeKey: 'borders', transform: Zt },
    borderLeft: { themeKey: 'borders', transform: Zt },
    borderColor: { themeKey: 'palette' },
    borderTopColor: { themeKey: 'palette' },
    borderRightColor: { themeKey: 'palette' },
    borderBottomColor: { themeKey: 'palette' },
    borderLeftColor: { themeKey: 'palette' },
    borderRadius: { themeKey: 'shape.borderRadius', style: vr },
    color: { themeKey: 'palette', transform: jn },
    bgcolor: { themeKey: 'palette', cssProperty: 'backgroundColor', transform: jn },
    backgroundColor: { themeKey: 'palette', transform: jn },
    p: { style: ot },
    pt: { style: ot },
    pr: { style: ot },
    pb: { style: ot },
    pl: { style: ot },
    px: { style: ot },
    py: { style: ot },
    padding: { style: ot },
    paddingTop: { style: ot },
    paddingRight: { style: ot },
    paddingBottom: { style: ot },
    paddingLeft: { style: ot },
    paddingX: { style: ot },
    paddingY: { style: ot },
    paddingInline: { style: ot },
    paddingInlineStart: { style: ot },
    paddingInlineEnd: { style: ot },
    paddingBlock: { style: ot },
    paddingBlockStart: { style: ot },
    paddingBlockEnd: { style: ot },
    m: { style: nt },
    mt: { style: nt },
    mr: { style: nt },
    mb: { style: nt },
    ml: { style: nt },
    mx: { style: nt },
    my: { style: nt },
    margin: { style: nt },
    marginTop: { style: nt },
    marginRight: { style: nt },
    marginBottom: { style: nt },
    marginLeft: { style: nt },
    marginX: { style: nt },
    marginY: { style: nt },
    marginInline: { style: nt },
    marginInlineStart: { style: nt },
    marginInlineEnd: { style: nt },
    marginBlock: { style: nt },
    marginBlockStart: { style: nt },
    marginBlockEnd: { style: nt },
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
    gap: { style: yr },
    rowGap: { style: Er },
    columnGap: { style: xr },
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
    width: { transform: Rt },
    maxWidth: { style: Pa },
    minWidth: { transform: Rt },
    height: { transform: Rt },
    maxHeight: { transform: Rt },
    minHeight: { transform: Rt },
    boxSizing: {},
    fontFamily: { themeKey: 'typography' },
    fontSize: { themeKey: 'typography' },
    fontStyle: { themeKey: 'typography' },
    fontWeight: { themeKey: 'typography' },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: { cssProperty: !1, themeKey: 'typography' },
  },
  Ia = mf;
function hf(...e) {
  const t = e.reduce((r, a) => r.concat(Object.keys(a)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function bf(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function gf() {
  function e(o, r, a, i) {
    const s = { [o]: r, theme: a },
      l = i[o];
    if (!l) return { [o]: r };
    const { cssProperty: c = o, themeKey: d, transform: u, style: p } = l;
    if (r == null) return null;
    if (d === 'typography' && r === 'inherit') return { [o]: r };
    const h = mr(a, d) || {};
    return p
      ? p(s)
      : sn(s, r, (v) => {
          let m = Go(h, u, v);
          return (
            v === m &&
              typeof v == 'string' &&
              (m = Go(h, u, `${o}${v === 'default' ? '' : oe(v)}`, v)),
            c === !1 ? m : { [c]: m }
          );
        });
  }
  function t(o) {
    var r;
    const { sx: a, theme: i = {} } = o || {};
    if (!a) return null;
    const s = (r = i.unstable_sxConfig) != null ? r : Ia;
    function l(c) {
      let d = c;
      if (typeof c == 'function') d = c(i);
      else if (typeof c != 'object') return c;
      if (!d) return null;
      const u = $p(i.breakpoints),
        p = Object.keys(u);
      let h = u;
      return (
        Object.keys(d).forEach((y) => {
          const v = bf(d[y], i);
          if (v != null)
            if (typeof v == 'object')
              if (s[y]) h = po(h, e(y, v, i, s));
              else {
                const m = sn({ theme: i }, v, (b) => ({ [y]: b }));
                hf(m, v) ? (h[y] = t({ sx: v, theme: i })) : (h = po(h, m));
              }
            else h = po(h, e(y, v, i, s));
        }),
        Np(p, h)
      );
    }
    return Array.isArray(a) ? a.map(l) : l(a);
  }
  return t;
}
const $l = gf();
$l.filterProps = ['sx'];
const Ma = $l;
function _a(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: a, shape: i = {}, ...s } = e,
    l = wp(o),
    c = jp(a);
  let d = _t(
    {
      breakpoints: l,
      direction: 'ltr',
      components: {},
      palette: { mode: 'light', ...r },
      spacing: c,
      shape: { ...Sp, ...i },
    },
    s,
  );
  return (
    (d = t.reduce((u, p) => _t(u, p), d)),
    (d.unstable_sxConfig = { ...Ia, ...(s == null ? void 0 : s.unstable_sxConfig) }),
    (d.unstable_sx = function (p) {
      return Ma({ sx: p, theme: this });
    }),
    d
  );
}
function vf(e) {
  return Object.keys(e).length === 0;
}
function Nl(e = null) {
  const t = g.useContext(Kn);
  return !t || vf(t) ? e : t;
}
const yf = _a();
function Aa(e = yf) {
  return Nl(e);
}
function Pl({ styles: e, themeId: t, defaultTheme: o = {} }) {
  const r = Aa(o),
    a = typeof e == 'function' ? e((t && r[t]) || r) : e;
  return _(kl, { styles: a });
}
process.env.NODE_ENV !== 'production' &&
  (Pl.propTypes = {
    defaultTheme: n.object,
    styles: n.oneOfType([n.array, n.func, n.number, n.object, n.string, n.bool]),
    themeId: n.string,
  });
function Il(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = Il(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function xe() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = Il(e)) && (r && (r += ' '), (r += t));
  return r;
}
function Yi(e) {
  return e.length === 0;
}
function Ml(e) {
  const { variant: t, ...o } = e;
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((a) => {
        a === 'color'
          ? (r += Yi(r) ? e[a] : oe(e[a]))
          : (r += `${Yi(r) ? a : oe(a)}${oe(e[a].toString())}`);
      }),
    r
  );
}
function xf(e) {
  return Object.keys(e).length === 0;
}
function Ef(e) {
  return typeof e == 'string' && e.charCodeAt(0) > 96;
}
const Of = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Cf = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((a) => {
        const i = Ml(a.props);
        r[i] = a.style;
      }),
      r
    );
  },
  Tf = (e, t, o, r) => {
    var a, i;
    const { ownerState: s = {} } = e,
      l = [],
      c = o == null || (a = o.components) == null || (i = a[r]) == null ? void 0 : i.variants;
    return (
      c &&
        c.forEach((d) => {
          let u = !0;
          Object.keys(d.props).forEach((p) => {
            s[p] !== d.props[p] && e[p] !== d.props[p] && (u = !1);
          }),
            u && l.push(t[Ml(d.props)]);
        }),
      l
    );
  };
function fo(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const wf = _a(),
  kf = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function oo({ defaultTheme: e, theme: t, themeId: o }) {
  return xf(t) ? e : t[o] || t;
}
function Sf(e = {}) {
  const {
      themeId: t,
      defaultTheme: o = wf,
      rootShouldForwardProp: r = fo,
      slotShouldForwardProp: a = fo,
    } = e,
    i = (s) => Ma({ ...s, theme: oo({ ...s, defaultTheme: o, themeId: t }) });
  return (
    (i.__mui_systemSx = !0),
    (s, l = {}) => {
      Cp(s, (x) => x.filter((f) => !(f != null && f.__mui_systemSx)));
      const {
          name: c,
          slot: d,
          skipVariantsResolver: u,
          skipSx: p,
          overridesResolver: h,
          ...y
        } = l,
        v = u !== void 0 ? u : (d && d !== 'Root') || !1,
        m = p || !1;
      let b;
      process.env.NODE_ENV !== 'production' && c && (b = `${c}-${kf(d || 'Root')}`);
      let C = fo;
      d === 'Root' ? (C = r) : d ? (C = a) : Ef(s) && (C = void 0);
      const T = Op(s, { shouldForwardProp: C, label: b, ...y }),
        E = (x, ...f) => {
          const k = f
            ? f.map((N) =>
                typeof N == 'function' && N.__emotion_real !== N
                  ? (I) => N({ ...I, theme: oo({ ...I, defaultTheme: o, themeId: t }) })
                  : N,
              )
            : [];
          let w = x;
          c &&
            h &&
            k.push((N) => {
              const I = oo({ ...N, defaultTheme: o, themeId: t }),
                G = Of(c, I);
              if (G) {
                const j = {};
                return (
                  Object.entries(G).forEach(([M, A]) => {
                    j[M] = typeof A == 'function' ? A({ ...N, theme: I }) : A;
                  }),
                  h(N, j)
                );
              }
              return null;
            }),
            c &&
              !v &&
              k.push((N) => {
                const I = oo({ ...N, defaultTheme: o, themeId: t });
                return Tf(N, Cf(c, I), I, c);
              }),
            m || k.push(i);
          const D = k.length - f.length;
          if (Array.isArray(x) && D > 0) {
            const N = new Array(D).fill('');
            (w = [...x, ...N]), (w.raw = [...x.raw, ...N]);
          } else
            typeof x == 'function' &&
              x.__emotion_real !== x &&
              (w = (N) => x({ ...N, theme: oo({ ...N, defaultTheme: o, themeId: t }) }));
          const z = T(w, ...k);
          if (process.env.NODE_ENV !== 'production') {
            let N;
            c && (N = `${c}${d || ''}`),
              N === void 0 && (N = `Styled(${Fu(s)})`),
              (z.displayName = N);
          }
          return s.muiName && (z.muiName = s.muiName), z;
        };
      return T.withConfig && (E.withConfig = T.withConfig), E;
    }
  );
}
function Rf(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : xa(t.components[o].defaultProps, r);
}
function $f({ props: e, name: t, defaultTheme: o, themeId: r }) {
  let a = Aa(o);
  return r && (a = a[r] || a), Rf({ theme: a, name: t, props: e });
}
function Da(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function Nf(e) {
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
function kn(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return kn(Nf(e));
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
          : pn(10, a),
      );
  } else r = r.split(',');
  return (r = r.map((i) => parseFloat(i))), { type: o, values: r, colorSpace: a };
}
function Or(e) {
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
function Pf(e) {
  e = kn(e);
  const { values: t } = e,
    o = t[0],
    r = t[1] / 100,
    a = t[2] / 100,
    i = r * Math.min(a, 1 - a),
    s = (d, u = (d + o / 30) % 12) => a - i * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = 'rgb';
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === 'hsla' && ((l += 'a'), c.push(t[3])), Or({ type: l, values: c });
}
function aa(e) {
  e = kn(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? kn(Pf(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function Ki(e, t) {
  const o = aa(e),
    r = aa(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function Ye(e, t) {
  return (
    (e = kn(e)),
    (t = Da(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    Or(e)
  );
}
function Cr(e, t) {
  if (((e = kn(e)), (t = Da(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return Or(e);
}
function Tr(e, t) {
  if (((e = kn(e)), (t = Da(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return Or(e);
}
function If(e, t = 0.15) {
  return aa(e) > 0.5 ? Cr(e, t) : Tr(e, t);
}
function Mf(e, t) {
  return {
    toolbar: {
      minHeight: 56,
      [e.up('xs')]: { '@media (orientation: landscape)': { minHeight: 48 } },
      [e.up('sm')]: { minHeight: 64 },
    },
    ...t,
  };
}
const Gi = {
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: { paper: vo.white, default: vo.white },
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
  Ur = {
    text: {
      primary: vo.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: { paper: '#121212', default: '#121212' },
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
function Xi(e, t, o, r) {
  const a = r.light || r,
    i = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = Tr(e.main, a))
      : t === 'dark' && (e.dark = Cr(e.main, i)));
}
function _f(e = 'light') {
  return e === 'dark'
    ? { main: Pn[200], light: Pn[50], dark: Pn[400] }
    : { main: Pn[700], light: Pn[400], dark: Pn[800] };
}
function Af(e = 'light') {
  return e === 'dark'
    ? { main: Nn[200], light: Nn[50], dark: Nn[400] }
    : { main: Nn[500], light: Nn[300], dark: Nn[700] };
}
function Df(e = 'light') {
  return e === 'dark'
    ? { main: $n[500], light: $n[300], dark: $n[700] }
    : { main: $n[700], light: $n[400], dark: $n[800] };
}
function Lf(e = 'light') {
  return e === 'dark'
    ? { main: In[400], light: In[300], dark: In[700] }
    : { main: In[700], light: In[500], dark: In[900] };
}
function jf(e = 'light') {
  return e === 'dark'
    ? { main: Mn[400], light: Mn[300], dark: Mn[700] }
    : { main: Mn[800], light: Mn[500], dark: Mn[900] };
}
function Ff(e = 'light') {
  return e === 'dark'
    ? { main: to[400], light: to[300], dark: to[700] }
    : { main: '#ed6c02', light: to[500], dark: to[900] };
}
function zf(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2, ...a } = e,
    i = e.primary || _f(t),
    s = e.secondary || Af(t),
    l = e.error || Df(t),
    c = e.info || Lf(t),
    d = e.success || jf(t),
    u = e.warning || Ff(t);
  function p(m) {
    const b = Ki(m, Ur.text.primary) >= o ? Ur.text.primary : Gi.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const C = Ki(m, b);
      C < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${C}:1 for ${b} on ${m}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return b;
  }
  const h = ({
      color: m,
      name: b,
      mainShade: C = 500,
      lightShade: T = 300,
      darkShade: E = 700,
    }) => {
      if (((m = { ...m }), !m.main && m[C] && (m.main = m[C]), !m.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${b ? ` (${b})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${C}\` property.`
            : pn(11, b ? ` (${b})` : '', C),
        );
      if (typeof m.main != 'string')
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${b ? ` (${b})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`
            : pn(12, b ? ` (${b})` : '', JSON.stringify(m.main)),
        );
      return (
        Xi(m, 'light', T, r), Xi(m, 'dark', E, r), m.contrastText || (m.contrastText = p(m.main)), m
      );
    },
    y = { dark: Ur, light: Gi };
  return (
    process.env.NODE_ENV !== 'production' &&
      (y[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    _t(
      {
        common: { ...vo },
        mode: t,
        primary: h({ color: i, name: 'primary' }),
        secondary: h({
          color: s,
          name: 'secondary',
          mainShade: 'A400',
          lightShade: 'A200',
          darkShade: 'A700',
        }),
        error: h({ color: l, name: 'error' }),
        warning: h({ color: u, name: 'warning' }),
        info: h({ color: c, name: 'info' }),
        success: h({ color: d, name: 'success' }),
        grey: Eu,
        contrastThreshold: o,
        getContrastText: p,
        augmentColor: h,
        tonalOffset: r,
        ...y[t],
      },
      a,
    )
  );
}
function Vf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ji = { textTransform: 'uppercase' },
  Zi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Bf(e, t) {
  const {
    fontFamily: o = Zi,
    fontSize: r = 14,
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: s = 500,
    fontWeightBold: l = 700,
    htmlFontSize: c = 16,
    allVariants: d,
    pxToRem: u,
    ...p
  } = typeof t == 'function' ? t(e) : t;
  process.env.NODE_ENV !== 'production' &&
    (typeof r != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof c != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const h = r / 14,
    y = u || ((b) => `${(b / c) * h}rem`),
    v = (b, C, T, E, x) => ({
      fontFamily: o,
      fontWeight: b,
      fontSize: y(C),
      lineHeight: T,
      ...(o === Zi ? { letterSpacing: `${Vf(E / C)}em` } : {}),
      ...x,
      ...d,
    }),
    m = {
      h1: v(a, 96, 1.167, -1.5),
      h2: v(a, 60, 1.2, -0.5),
      h3: v(i, 48, 1.167, 0),
      h4: v(i, 34, 1.235, 0.25),
      h5: v(i, 24, 1.334, 0),
      h6: v(s, 20, 1.6, 0.15),
      subtitle1: v(i, 16, 1.75, 0.15),
      subtitle2: v(s, 14, 1.57, 0.1),
      body1: v(i, 16, 1.5, 0.15),
      body2: v(i, 14, 1.43, 0.15),
      button: v(s, 14, 1.75, 0.4, Ji),
      caption: v(i, 12, 1.66, 0.4),
      overline: v(i, 12, 2.66, 1, Ji),
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
      fontWeightLight: a,
      fontWeightRegular: i,
      fontWeightMedium: s,
      fontWeightBold: l,
      ...m,
    },
    p,
    { clone: !1 },
  );
}
const Uf = 0.2,
  Wf = 0.14,
  Hf = 0.12;
function tt(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Uf})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Wf})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Hf})`,
  ].join(',');
}
const qf = [
    'none',
    tt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    tt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    tt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    tt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    tt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    tt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    tt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    tt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    tt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    tt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    tt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    tt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    tt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    tt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    tt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    tt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    tt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    tt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    tt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    tt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    tt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    tt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    tt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    tt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  Yf = qf,
  Kf = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  Gf = {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  };
function Qi(e) {
  return `${Math.round(e)}ms`;
}
function Xf(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Jf(e) {
  const t = { ...Kf, ...e.easing },
    o = { ...Gf, ...e.duration };
  return {
    getAutoHeightDuration: Xf,
    create: (a = ['all'], i = {}) => {
      const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0, ...d } = i;
      if (process.env.NODE_ENV !== 'production') {
        const u = (h) => typeof h == 'string',
          p = (h) => !isNaN(parseFloat(h));
        !u(a) &&
          !Array.isArray(a) &&
          console.error('MUI: Argument "props" must be a string or Array.'),
          !p(s) &&
            !u(s) &&
            console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),
          u(l) || console.error('MUI: Argument "easing" must be a string.'),
          !p(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'),
          Object.keys(d).length !== 0 &&
            console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(',')}].`);
      }
      return (Array.isArray(a) ? a : [a])
        .map(
          (u) =>
            `${u} ${typeof s == 'string' ? s : Qi(s)} ${l} ${typeof c == 'string' ? c : Qi(c)}`,
        )
        .join(',');
    },
    ...e,
    easing: t,
    duration: o,
  };
}
const Zf = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  Qf = Zf;
function em(e = {}, ...t) {
  const {
    breakpoints: o,
    mixins: r = {},
    spacing: a,
    palette: i = {},
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
  const u = zf(i),
    p = _a(e);
  let h = _t(p, {
    mixins: Mf(p.breakpoints, r),
    palette: u,
    shadows: Yf.slice(),
    typography: Bf(u, l),
    transitions: Jf(s),
    zIndex: { ...Qf },
  });
  if (
    ((h = _t(h, d)), (h = t.reduce((y, v) => _t(y, v), h)), process.env.NODE_ENV !== 'production')
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
      v = (m, b) => {
        let C;
        for (C in m) {
          const T = m[C];
          if (y.indexOf(C) !== -1 && Object.keys(T).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const E = Ie('', C);
              console.error(
                [
                  `MUI: The \`${b}\` component increases the CSS specificity of the \`${C}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(m, null, 2),
                  '',
                  `Instead, you need to use the '&.${E}' syntax:`,
                  JSON.stringify({ root: { [`&.${E}`]: T } }, null, 2),
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
      const b = h.components[m].styleOverrides;
      b && m.indexOf('Mui') === 0 && v(b, m);
    });
  }
  return (
    (h.unstable_sxConfig = { ...Ia, ...(d == null ? void 0 : d.unstable_sxConfig) }),
    (h.unstable_sx = function (v) {
      return Ma({ sx: v, theme: this });
    }),
    h
  );
}
const tm = em(),
  wr = tm;
function Gn() {
  const e = Aa(wr);
  return process.env.NODE_ENV !== 'production' && g.useDebugValue(e), e[sr] || e;
}
function Le({ props: e, name: t }) {
  return $f({ props: e, name: t, defaultTheme: wr, themeId: sr });
}
const Wt = (e) => fo(e) && e !== 'classes',
  La = fo,
  nm = Sf({ themeId: sr, defaultTheme: wr, rootShouldForwardProp: Wt }),
  de = nm,
  om = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  es = om;
function dn(e) {
  return typeof e == 'string';
}
function rm(e, t, o) {
  return e === void 0 || dn(e) ? t : { ...t, ownerState: { ...t.ownerState, ...o } };
}
function am(e, t, o = (r, a) => r === a) {
  return e.length === t.length && e.every((r, a) => o(r, t[a]));
}
const im = { disableDefaultClasses: !1 },
  sm = g.createContext(im);
function _l(e) {
  const { disableDefaultClasses: t } = g.useContext(sm);
  return (o) => (t ? '' : e(o));
}
function Al(e, t = []) {
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
function ia(e, t) {
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
function lm(e) {
  const {
    getSlotProps: t,
    additionalProps: o,
    externalSlotProps: r,
    externalForwardedProps: a,
    className: i,
  } = e;
  if (!t) {
    const y = xe(
        a == null ? void 0 : a.className,
        r == null ? void 0 : r.className,
        i,
        o == null ? void 0 : o.className,
      ),
      v = {
        ...(o == null ? void 0 : o.style),
        ...(a == null ? void 0 : a.style),
        ...(r == null ? void 0 : r.style),
      },
      m = { ...o, ...a, ...r };
    return (
      y.length > 0 && (m.className = y),
      Object.keys(v).length > 0 && (m.style = v),
      { props: m, internalRef: void 0 }
    );
  }
  const s = Al({ ...a, ...r }),
    l = ts(r),
    c = ts(a),
    d = t(s),
    u = xe(
      d == null ? void 0 : d.className,
      o == null ? void 0 : o.className,
      i,
      a == null ? void 0 : a.className,
      r == null ? void 0 : r.className,
    ),
    p = {
      ...(d == null ? void 0 : d.style),
      ...(o == null ? void 0 : o.style),
      ...(a == null ? void 0 : a.style),
      ...(r == null ? void 0 : r.style),
    },
    h = { ...d, ...o, ...c, ...l };
  return (
    u.length > 0 && (h.className = u),
    Object.keys(p).length > 0 && (h.style = p),
    { props: h, internalRef: d.ref }
  );
}
function It(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: a, ...i } = e,
    s = ia(r, a),
    { props: l, internalRef: c } = lm({ ...i, externalSlotProps: s }),
    d = at(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return rm(o, { ...l, ref: d }, a);
}
function ns(e) {
  return e.substring(2).toLowerCase();
}
function cm(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function Xo(e) {
  const {
      children: t,
      disableReactTree: o = !1,
      mouseEvent: r = 'onClick',
      onClickAway: a,
      touchEvent: i = 'onTouchEnd',
    } = e,
    s = g.useRef(!1),
    l = g.useRef(null),
    c = g.useRef(!1),
    d = g.useRef(!1);
  g.useEffect(
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
  const u = at(t.ref, l),
    p = ft((v) => {
      const m = d.current;
      d.current = !1;
      const b = rt(l.current);
      if (!c.current || !l.current || ('clientX' in v && cm(v, b))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let C;
      v.composedPath
        ? (C = v.composedPath().indexOf(l.current) > -1)
        : (C = !b.documentElement.contains(v.target) || l.current.contains(v.target)),
        !C && (o || !m) && a(v);
    }),
    h = (v) => (m) => {
      d.current = !0;
      const b = t.props[v];
      b && b(m);
    },
    y = { ref: u };
  return (
    i !== !1 && (y[i] = h(i)),
    g.useEffect(() => {
      if (i !== !1) {
        const v = ns(i),
          m = rt(l.current),
          b = () => {
            s.current = !0;
          };
        return (
          m.addEventListener(v, p),
          m.addEventListener('touchmove', b),
          () => {
            m.removeEventListener(v, p), m.removeEventListener('touchmove', b);
          }
        );
      }
    }, [p, i]),
    r !== !1 && (y[r] = h(r)),
    g.useEffect(() => {
      if (r !== !1) {
        const v = ns(r),
          m = rt(l.current);
        return (
          m.addEventListener(v, p),
          () => {
            m.removeEventListener(v, p);
          }
        );
      }
    }, [p, r]),
    _(g.Fragment, { children: g.cloneElement(t, y) })
  );
}
process.env.NODE_ENV !== 'production' &&
  (Xo.propTypes = {
    children: qn.isRequired,
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
process.env.NODE_ENV !== 'production' && (Xo['propTypes'] = va(Xo.propTypes));
const um = [
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
function dm(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function pm(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function fm(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || pm(e));
}
function mm(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(um)).forEach((r, a) => {
      const i = dm(r);
      i === -1 ||
        !fm(r) ||
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
function hm() {
  return !0;
}
function Jo(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: a = !1,
      getTabbable: i = mm,
      isEnabled: s = hm,
      open: l,
    } = e,
    c = g.useRef(!1),
    d = g.useRef(null),
    u = g.useRef(null),
    p = g.useRef(null),
    h = g.useRef(null),
    y = g.useRef(!1),
    v = g.useRef(null),
    m = at(t.ref, v),
    b = g.useRef(null);
  g.useEffect(() => {
    !l || !v.current || (y.current = !o);
  }, [o, l]),
    g.useEffect(() => {
      if (!l || !v.current) return;
      const E = rt(v.current);
      return (
        v.current.contains(E.activeElement) ||
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
    g.useEffect(() => {
      if (!l || !v.current) return;
      const E = rt(v.current),
        x = (w) => {
          const { current: D } = v;
          if (D !== null) {
            if (!E.hasFocus() || r || !s() || c.current) {
              c.current = !1;
              return;
            }
            if (!D.contains(E.activeElement)) {
              if ((w && h.current !== w.target) || E.activeElement !== h.current) h.current = null;
              else if (h.current !== null) return;
              if (!y.current) return;
              let I = [];
              if (
                ((E.activeElement === d.current || E.activeElement === u.current) &&
                  (I = i(v.current)),
                I.length > 0)
              ) {
                var z, N;
                const G = !!(
                    (z = b.current) != null &&
                    z.shiftKey &&
                    ((N = b.current) == null ? void 0 : N.key) === 'Tab'
                  ),
                  j = I[0],
                  M = I[I.length - 1];
                typeof j != 'string' && typeof M != 'string' && (G ? M.focus() : j.focus());
              } else D.focus();
            }
          }
        },
        f = (w) => {
          (b.current = w),
            !(r || !s() || w.key !== 'Tab') &&
              E.activeElement === v.current &&
              w.shiftKey &&
              ((c.current = !0), u.current && u.current.focus());
        };
      E.addEventListener('focusin', x), E.addEventListener('keydown', f, !0);
      const k = setInterval(() => {
        E.activeElement && E.activeElement.tagName === 'BODY' && x(null);
      }, 50);
      return () => {
        clearInterval(k),
          E.removeEventListener('focusin', x),
          E.removeEventListener('keydown', f, !0);
      };
    }, [o, r, a, s, l, i]);
  const C = (E) => {
      p.current === null && (p.current = E.relatedTarget), (y.current = !0), (h.current = E.target);
      const x = t.props.onFocus;
      x && x(E);
    },
    T = (E) => {
      p.current === null && (p.current = E.relatedTarget), (y.current = !0);
    };
  return Xe(g.Fragment, {
    children: [
      _('div', { tabIndex: l ? 0 : -1, onFocus: T, ref: d, 'data-testid': 'sentinelStart' }),
      g.cloneElement(t, { ref: m, onFocus: C }),
      _('div', { tabIndex: l ? 0 : -1, onFocus: T, ref: u, 'data-testid': 'sentinelEnd' }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (Jo.propTypes = {
    children: qn,
    disableAutoFocus: n.bool,
    disableEnforceFocus: n.bool,
    disableRestoreFocus: n.bool,
    getTabbable: n.func,
    isEnabled: n.func,
    open: n.bool.isRequired,
  });
process.env.NODE_ENV !== 'production' && (Jo['propTypes'] = va(Jo.propTypes));
var gt = 'top',
  At = 'bottom',
  Dt = 'right',
  vt = 'left',
  kr = 'auto',
  Ro = [gt, At, Dt, vt],
  Vn = 'start',
  Co = 'end',
  bm = 'clippingParents',
  Dl = 'viewport',
  ro = 'popper',
  gm = 'reference',
  os = Ro.reduce(function (e, t) {
    return e.concat([t + '-' + Vn, t + '-' + Co]);
  }, []),
  Ll = [].concat(Ro, [kr]).reduce(function (e, t) {
    return e.concat([t, t + '-' + Vn, t + '-' + Co]);
  }, []),
  vm = 'beforeRead',
  ym = 'read',
  xm = 'afterRead',
  Em = 'beforeMain',
  Om = 'main',
  Cm = 'afterMain',
  Tm = 'beforeWrite',
  wm = 'write',
  km = 'afterWrite',
  sa = [vm, ym, xm, Em, Om, Cm, Tm, wm, km];
function nn(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function Pt(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function Sn(e) {
  var t = Pt(e).Element;
  return e instanceof t || e instanceof Element;
}
function Nt(e) {
  var t = Pt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ja(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Pt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Sm(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      a = t.attributes[o] || {},
      i = t.elements[o];
    !Nt(i) ||
      !nn(i) ||
      (Object.assign(i.style, r),
      Object.keys(a).forEach(function (s) {
        var l = a[s];
        l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function Rm(e) {
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
          l = s.reduce(function (c, d) {
            return (c[d] = ''), c;
          }, {});
        !Nt(a) ||
          !nn(a) ||
          (Object.assign(a.style, l),
          Object.keys(i).forEach(function (c) {
            a.removeAttribute(c);
          }));
      });
    }
  );
}
const $m = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: Sm,
  effect: Rm,
  requires: ['computeStyles'],
};
function Vt(e) {
  return e.split('-')[0];
}
var Tn = Math.max,
  Zo = Math.min,
  Bn = Math.round;
function la() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function jl() {
  return !/^((?!chrome|android).)*safari/i.test(la());
}
function Un(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    a = 1,
    i = 1;
  t &&
    Nt(e) &&
    ((a = (e.offsetWidth > 0 && Bn(r.width) / e.offsetWidth) || 1),
    (i = (e.offsetHeight > 0 && Bn(r.height) / e.offsetHeight) || 1));
  var s = Sn(e) ? Pt(e) : window,
    l = s.visualViewport,
    c = !jl() && o,
    d = (r.left + (c && l ? l.offsetLeft : 0)) / a,
    u = (r.top + (c && l ? l.offsetTop : 0)) / i,
    p = r.width / a,
    h = r.height / i;
  return { width: p, height: h, top: u, right: d + p, bottom: u + h, left: d, x: d, y: u };
}
function Fa(e) {
  var t = Un(e),
    o = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - o) <= 1 && (o = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: o, height: r }
  );
}
function Fl(e, t) {
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
function Ut(e) {
  return Pt(e).getComputedStyle(e);
}
function Nm(e) {
  return ['table', 'td', 'th'].indexOf(nn(e)) >= 0;
}
function mn(e) {
  return ((Sn(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Sr(e) {
  return nn(e) === 'html' ? e : e.assignedSlot || e.parentNode || (ja(e) ? e.host : null) || mn(e);
}
function rs(e) {
  return !Nt(e) || Ut(e).position === 'fixed' ? null : e.offsetParent;
}
function Pm(e) {
  var t = /firefox/i.test(la()),
    o = /Trident/i.test(la());
  if (o && Nt(e)) {
    var r = Ut(e);
    if (r.position === 'fixed') return null;
  }
  var a = Sr(e);
  for (ja(a) && (a = a.host); Nt(a) && ['html', 'body'].indexOf(nn(a)) < 0; ) {
    var i = Ut(a);
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
function $o(e) {
  for (var t = Pt(e), o = rs(e); o && Nm(o) && Ut(o).position === 'static'; ) o = rs(o);
  return o && (nn(o) === 'html' || (nn(o) === 'body' && Ut(o).position === 'static'))
    ? t
    : o || Pm(e) || t;
}
function za(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function mo(e, t, o) {
  return Tn(e, Zo(t, o));
}
function Im(e, t, o) {
  var r = mo(e, t, o);
  return r > o ? o : r;
}
function zl() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function Vl(e) {
  return Object.assign({}, zl(), e);
}
function Bl(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var Mm = function (t, o) {
  return (
    (t = typeof t == 'function' ? t(Object.assign({}, o.rects, { placement: o.placement })) : t),
    Vl(typeof t != 'number' ? t : Bl(t, Ro))
  );
};
function _m(e) {
  var t,
    o = e.state,
    r = e.name,
    a = e.options,
    i = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = Vt(o.placement),
    c = za(l),
    d = [vt, Dt].indexOf(l) >= 0,
    u = d ? 'height' : 'width';
  if (!(!i || !s)) {
    var p = Mm(a.padding, o),
      h = Fa(i),
      y = c === 'y' ? gt : vt,
      v = c === 'y' ? At : Dt,
      m = o.rects.reference[u] + o.rects.reference[c] - s[c] - o.rects.popper[u],
      b = s[c] - o.rects.reference[c],
      C = $o(i),
      T = C ? (c === 'y' ? C.clientHeight || 0 : C.clientWidth || 0) : 0,
      E = m / 2 - b / 2,
      x = p[y],
      f = T - h[u] - p[v],
      k = T / 2 - h[u] / 2 + E,
      w = mo(x, k, f),
      D = c;
    o.modifiersData[r] = ((t = {}), (t[D] = w), (t.centerOffset = w - k), t);
  }
}
function Am(e) {
  var t = e.state,
    o = e.options,
    r = o.element,
    a = r === void 0 ? '[data-popper-arrow]' : r;
  if (a != null && !(typeof a == 'string' && ((a = t.elements.popper.querySelector(a)), !a))) {
    if (
      (process.env.NODE_ENV !== 'production' &&
        (Nt(a) ||
          console.error(
            [
              'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
              'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
              'the arrow.',
            ].join(' '),
          )),
      !Fl(t.elements.popper, a))
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
const Dm = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: _m,
  effect: Am,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function Wn(e) {
  return e.split('-')[1];
}
var Lm = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
function jm(e, t) {
  var o = e.x,
    r = e.y,
    a = t.devicePixelRatio || 1;
  return { x: Bn(o * a) / a || 0, y: Bn(r * a) / a || 0 };
}
function as(e) {
  var t,
    o = e.popper,
    r = e.popperRect,
    a = e.placement,
    i = e.variation,
    s = e.offsets,
    l = e.position,
    c = e.gpuAcceleration,
    d = e.adaptive,
    u = e.roundOffsets,
    p = e.isFixed,
    h = s.x,
    y = h === void 0 ? 0 : h,
    v = s.y,
    m = v === void 0 ? 0 : v,
    b = typeof u == 'function' ? u({ x: y, y: m }) : { x: y, y: m };
  (y = b.x), (m = b.y);
  var C = s.hasOwnProperty('x'),
    T = s.hasOwnProperty('y'),
    E = vt,
    x = gt,
    f = window;
  if (d) {
    var k = $o(o),
      w = 'clientHeight',
      D = 'clientWidth';
    if (
      (k === Pt(o) &&
        ((k = mn(o)),
        Ut(k).position !== 'static' &&
          l === 'absolute' &&
          ((w = 'scrollHeight'), (D = 'scrollWidth'))),
      (k = k),
      a === gt || ((a === vt || a === Dt) && i === Co))
    ) {
      x = At;
      var z = p && k === f && f.visualViewport ? f.visualViewport.height : k[w];
      (m -= z - r.height), (m *= c ? 1 : -1);
    }
    if (a === vt || ((a === gt || a === At) && i === Co)) {
      E = Dt;
      var N = p && k === f && f.visualViewport ? f.visualViewport.width : k[D];
      (y -= N - r.width), (y *= c ? 1 : -1);
    }
  }
  var I = Object.assign({ position: l }, d && Lm),
    G = u === !0 ? jm({ x: y, y: m }, Pt(o)) : { x: y, y: m };
  if (((y = G.x), (m = G.y), c)) {
    var j;
    return Object.assign(
      {},
      I,
      ((j = {}),
      (j[x] = T ? '0' : ''),
      (j[E] = C ? '0' : ''),
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
    ((t = {}), (t[x] = T ? m + 'px' : ''), (t[E] = C ? y + 'px' : ''), (t.transform = ''), t),
  );
}
function Fm(e) {
  var t = e.state,
    o = e.options,
    r = o.gpuAcceleration,
    a = r === void 0 ? !0 : r,
    i = o.adaptive,
    s = i === void 0 ? !0 : i,
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
    gpuAcceleration: a,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      as(
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
        as(
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
const zm = { name: 'computeStyles', enabled: !0, phase: 'beforeWrite', fn: Fm, data: {} };
var Mo = { passive: !0 };
function Vm(e) {
  var t = e.state,
    o = e.instance,
    r = e.options,
    a = r.scroll,
    i = a === void 0 ? !0 : a,
    s = r.resize,
    l = s === void 0 ? !0 : s,
    c = Pt(t.elements.popper),
    d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    i &&
      d.forEach(function (u) {
        u.addEventListener('scroll', o.update, Mo);
      }),
    l && c.addEventListener('resize', o.update, Mo),
    function () {
      i &&
        d.forEach(function (u) {
          u.removeEventListener('scroll', o.update, Mo);
        }),
        l && c.removeEventListener('resize', o.update, Mo);
    }
  );
}
const Bm = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: Vm,
  data: {},
};
var Um = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function Uo(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return Um[t];
  });
}
var Wm = { start: 'end', end: 'start' };
function is(e) {
  return e.replace(/start|end/g, function (t) {
    return Wm[t];
  });
}
function Va(e) {
  var t = Pt(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return { scrollLeft: o, scrollTop: r };
}
function Ba(e) {
  return Un(mn(e)).left + Va(e).scrollLeft;
}
function Hm(e, t) {
  var o = Pt(e),
    r = mn(e),
    a = o.visualViewport,
    i = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (a) {
    (i = a.width), (s = a.height);
    var d = jl();
    (d || (!d && t === 'fixed')) && ((l = a.offsetLeft), (c = a.offsetTop));
  }
  return { width: i, height: s, x: l + Ba(e), y: c };
}
function qm(e) {
  var t,
    o = mn(e),
    r = Va(e),
    a = (t = e.ownerDocument) == null ? void 0 : t.body,
    i = Tn(o.scrollWidth, o.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0),
    s = Tn(o.scrollHeight, o.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0),
    l = -r.scrollLeft + Ba(e),
    c = -r.scrollTop;
  return (
    Ut(a || o).direction === 'rtl' && (l += Tn(o.clientWidth, a ? a.clientWidth : 0) - i),
    { width: i, height: s, x: l, y: c }
  );
}
function Ua(e) {
  var t = Ut(e),
    o = t.overflow,
    r = t.overflowX,
    a = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + a + r);
}
function Ul(e) {
  return ['html', 'body', '#document'].indexOf(nn(e)) >= 0
    ? e.ownerDocument.body
    : Nt(e) && Ua(e)
    ? e
    : Ul(Sr(e));
}
function ho(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = Ul(e),
    a = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    i = Pt(r),
    s = a ? [i].concat(i.visualViewport || [], Ua(r) ? r : []) : r,
    l = t.concat(s);
  return a ? l : l.concat(ho(Sr(s)));
}
function ca(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Ym(e, t) {
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
  return t === Dl ? ca(Hm(e, o)) : Sn(t) ? Ym(t, o) : ca(qm(mn(e)));
}
function Km(e) {
  var t = ho(Sr(e)),
    o = ['absolute', 'fixed'].indexOf(Ut(e).position) >= 0,
    r = o && Nt(e) ? $o(e) : e;
  return Sn(r)
    ? t.filter(function (a) {
        return Sn(a) && Fl(a, r) && nn(a) !== 'body';
      })
    : [];
}
function Gm(e, t, o, r) {
  var a = t === 'clippingParents' ? Km(e) : [].concat(t),
    i = [].concat(a, [o]),
    s = i[0],
    l = i.reduce(function (c, d) {
      var u = ss(e, d, r);
      return (
        (c.top = Tn(u.top, c.top)),
        (c.right = Zo(u.right, c.right)),
        (c.bottom = Zo(u.bottom, c.bottom)),
        (c.left = Tn(u.left, c.left)),
        c
      );
    }, ss(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function Wl(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    a = r ? Vt(r) : null,
    i = r ? Wn(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (a) {
    case gt:
      c = { x: s, y: t.y - o.height };
      break;
    case At:
      c = { x: s, y: t.y + t.height };
      break;
    case Dt:
      c = { x: t.x + t.width, y: l };
      break;
    case vt:
      c = { x: t.x - o.width, y: l };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var d = a ? za(a) : null;
  if (d != null) {
    var u = d === 'y' ? 'height' : 'width';
    switch (i) {
      case Vn:
        c[d] = c[d] - (t[u] / 2 - o[u] / 2);
        break;
      case Co:
        c[d] = c[d] + (t[u] / 2 - o[u] / 2);
        break;
    }
  }
  return c;
}
function To(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    a = r === void 0 ? e.placement : r,
    i = o.strategy,
    s = i === void 0 ? e.strategy : i,
    l = o.boundary,
    c = l === void 0 ? bm : l,
    d = o.rootBoundary,
    u = d === void 0 ? Dl : d,
    p = o.elementContext,
    h = p === void 0 ? ro : p,
    y = o.altBoundary,
    v = y === void 0 ? !1 : y,
    m = o.padding,
    b = m === void 0 ? 0 : m,
    C = Vl(typeof b != 'number' ? b : Bl(b, Ro)),
    T = h === ro ? gm : ro,
    E = e.rects.popper,
    x = e.elements[v ? T : h],
    f = Gm(Sn(x) ? x : x.contextElement || mn(e.elements.popper), c, u, s),
    k = Un(e.elements.reference),
    w = Wl({ reference: k, element: E, strategy: 'absolute', placement: a }),
    D = ca(Object.assign({}, E, w)),
    z = h === ro ? D : k,
    N = {
      top: f.top - z.top + C.top,
      bottom: z.bottom - f.bottom + C.bottom,
      left: f.left - z.left + C.left,
      right: z.right - f.right + C.right,
    },
    I = e.modifiersData.offset;
  if (h === ro && I) {
    var G = I[a];
    Object.keys(N).forEach(function (j) {
      var M = [Dt, At].indexOf(j) >= 0 ? 1 : -1,
        A = [gt, At].indexOf(j) >= 0 ? 'y' : 'x';
      N[j] += G[A] * M;
    });
  }
  return N;
}
function Xm(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    a = o.boundary,
    i = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    d = c === void 0 ? Ll : c,
    u = Wn(r),
    p = u
      ? l
        ? os
        : os.filter(function (v) {
            return Wn(v) === u;
          })
      : Ro,
    h = p.filter(function (v) {
      return d.indexOf(v) >= 0;
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
  var y = h.reduce(function (v, m) {
    return (v[m] = To(e, { placement: m, boundary: a, rootBoundary: i, padding: s })[Vt(m)]), v;
  }, {});
  return Object.keys(y).sort(function (v, m) {
    return y[v] - y[m];
  });
}
function Jm(e) {
  if (Vt(e) === kr) return [];
  var t = Uo(e);
  return [is(e), t, is(t)];
}
function Zm(e) {
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
        d = o.padding,
        u = o.boundary,
        p = o.rootBoundary,
        h = o.altBoundary,
        y = o.flipVariations,
        v = y === void 0 ? !0 : y,
        m = o.allowedAutoPlacements,
        b = t.options.placement,
        C = Vt(b),
        T = C === b,
        E = c || (T || !v ? [Uo(b)] : Jm(b)),
        x = [b].concat(E).reduce(function (q, K) {
          return q.concat(
            Vt(K) === kr
              ? Xm(t, {
                  placement: K,
                  boundary: u,
                  rootBoundary: p,
                  padding: d,
                  flipVariations: v,
                  allowedAutoPlacements: m,
                })
              : K,
          );
        }, []),
        f = t.rects.reference,
        k = t.rects.popper,
        w = new Map(),
        D = !0,
        z = x[0],
        N = 0;
      N < x.length;
      N++
    ) {
      var I = x[N],
        G = Vt(I),
        j = Wn(I) === Vn,
        M = [gt, At].indexOf(G) >= 0,
        A = M ? 'width' : 'height',
        H = To(t, { placement: I, boundary: u, rootBoundary: p, altBoundary: h, padding: d }),
        ie = M ? (j ? Dt : vt) : j ? At : gt;
      f[A] > k[A] && (ie = Uo(ie));
      var Q = Uo(ie),
        V = [];
      if (
        (i && V.push(H[G] <= 0),
        l && V.push(H[ie] <= 0, H[Q] <= 0),
        V.every(function (q) {
          return q;
        }))
      ) {
        (z = I), (D = !1);
        break;
      }
      w.set(I, V);
    }
    if (D)
      for (
        var S = v ? 3 : 1,
          L = function (K) {
            var re = x.find(function (Z) {
              var ae = w.get(Z);
              if (ae)
                return ae.slice(0, K).every(function (ce) {
                  return ce;
                });
            });
            if (re) return (z = re), 'break';
          },
          X = S;
        X > 0;
        X--
      ) {
        var B = L(X);
        if (B === 'break') break;
      }
    t.placement !== z && ((t.modifiersData[r]._skip = !0), (t.placement = z), (t.reset = !0));
  }
}
const Qm = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: Zm,
  requiresIfExists: ['offset'],
  data: { _skip: !1 },
};
function ls(e, t, o) {
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
function cs(e) {
  return [gt, Dt, At, vt].some(function (t) {
    return e[t] >= 0;
  });
}
function eh(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    a = t.rects.popper,
    i = t.modifiersData.preventOverflow,
    s = To(t, { elementContext: 'reference' }),
    l = To(t, { altBoundary: !0 }),
    c = ls(s, r),
    d = ls(l, a, i),
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
const th = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: eh,
};
function nh(e, t, o) {
  var r = Vt(e),
    a = [vt, gt].indexOf(r) >= 0 ? -1 : 1,
    i = typeof o == 'function' ? o(Object.assign({}, t, { placement: e })) : o,
    s = i[0],
    l = i[1];
  return (
    (s = s || 0), (l = (l || 0) * a), [vt, Dt].indexOf(r) >= 0 ? { x: l, y: s } : { x: s, y: l }
  );
}
function oh(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    a = o.offset,
    i = a === void 0 ? [0, 0] : a,
    s = Ll.reduce(function (u, p) {
      return (u[p] = nh(p, t.rects, i)), u;
    }, {}),
    l = s[t.placement],
    c = l.x,
    d = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += d)),
    (t.modifiersData[r] = s);
}
const rh = { name: 'offset', enabled: !0, phase: 'main', requires: ['popperOffsets'], fn: oh };
function ah(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = Wl({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const ih = { name: 'popperOffsets', enabled: !0, phase: 'read', fn: ah, data: {} };
function sh(e) {
  return e === 'x' ? 'y' : 'x';
}
function lh(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    a = o.mainAxis,
    i = a === void 0 ? !0 : a,
    s = o.altAxis,
    l = s === void 0 ? !1 : s,
    c = o.boundary,
    d = o.rootBoundary,
    u = o.altBoundary,
    p = o.padding,
    h = o.tether,
    y = h === void 0 ? !0 : h,
    v = o.tetherOffset,
    m = v === void 0 ? 0 : v,
    b = To(t, { boundary: c, rootBoundary: d, padding: p, altBoundary: u }),
    C = Vt(t.placement),
    T = Wn(t.placement),
    E = !T,
    x = za(C),
    f = sh(x),
    k = t.modifiersData.popperOffsets,
    w = t.rects.reference,
    D = t.rects.popper,
    z = typeof m == 'function' ? m(Object.assign({}, t.rects, { placement: t.placement })) : m,
    N =
      typeof z == 'number'
        ? { mainAxis: z, altAxis: z }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, z),
    I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    G = { x: 0, y: 0 };
  if (k) {
    if (i) {
      var j,
        M = x === 'y' ? gt : vt,
        A = x === 'y' ? At : Dt,
        H = x === 'y' ? 'height' : 'width',
        ie = k[x],
        Q = ie + b[M],
        V = ie - b[A],
        S = y ? -D[H] / 2 : 0,
        L = T === Vn ? w[H] : D[H],
        X = T === Vn ? -D[H] : -w[H],
        B = t.elements.arrow,
        q = y && B ? Fa(B) : { width: 0, height: 0 },
        K = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : zl(),
        re = K[M],
        Z = K[A],
        ae = mo(0, w[H], q[H]),
        ce = E ? w[H] / 2 - S - ae - re - N.mainAxis : L - ae - re - N.mainAxis,
        ue = E ? -w[H] / 2 + S + ae + Z + N.mainAxis : X + ae + Z + N.mainAxis,
        me = t.elements.arrow && $o(t.elements.arrow),
        P = me ? (x === 'y' ? me.clientTop || 0 : me.clientLeft || 0) : 0,
        Ce = (j = I == null ? void 0 : I[x]) != null ? j : 0,
        J = ie + ce - Ce - P,
        W = ie + ue - Ce,
        Te = mo(y ? Zo(Q, J) : Q, ie, y ? Tn(V, W) : V);
      (k[x] = Te), (G[x] = Te - ie);
    }
    if (l) {
      var pe,
        Re = x === 'x' ? gt : vt,
        je = x === 'x' ? At : Dt,
        Je = k[f],
        Ge = f === 'y' ? 'height' : 'width',
        Fe = Je + b[Re],
        Ze = Je - b[je],
        ee = [gt, vt].indexOf(C) !== -1,
        te = (pe = I == null ? void 0 : I[f]) != null ? pe : 0,
        ye = ee ? Fe : Je - w[Ge] - D[Ge] - te + N.altAxis,
        he = ee ? Je + w[Ge] + D[Ge] - te - N.altAxis : Ze,
        Ee = y && ee ? Im(ye, Je, he) : mo(y ? ye : Fe, Je, y ? he : Ze);
      (k[f] = Ee), (G[f] = Ee - Je);
    }
    t.modifiersData[r] = G;
  }
}
const ch = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: lh,
  requiresIfExists: ['offset'],
};
function uh(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function dh(e) {
  return e === Pt(e) || !Nt(e) ? Va(e) : uh(e);
}
function ph(e) {
  var t = e.getBoundingClientRect(),
    o = Bn(t.width) / e.offsetWidth || 1,
    r = Bn(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function fh(e, t, o) {
  o === void 0 && (o = !1);
  var r = Nt(t),
    a = Nt(t) && ph(t),
    i = mn(t),
    s = Un(e, a, o),
    l = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 };
  return (
    (r || (!r && !o)) &&
      ((nn(t) !== 'body' || Ua(i)) && (l = dh(t)),
      Nt(t) ? ((c = Un(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : i && (c.x = Ba(i))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function mh(e) {
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
function hh(e) {
  var t = mh(e);
  return sa.reduce(function (o, r) {
    return o.concat(
      t.filter(function (a) {
        return a.phase === r;
      }),
    );
  }, []);
}
function bh(e) {
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
  return [].concat(o).reduce(function (a, i) {
    return a.replace(/%s/, i);
  }, e);
}
var gn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  gh = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  us = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function vh(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), us)
      .filter(function (o, r, a) {
        return a.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                cn(gn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                cn(gn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            sa.indexOf(t.phase) < 0 &&
              console.error(
                cn(gn, t.name, '"phase"', 'either ' + sa.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(cn(gn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(cn(gn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                cn(gn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                cn(
                  gn,
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
            e.find(function (a) {
              return a.name === r;
            }) == null && console.error(cn(gh, String(t.name), r, r));
          });
      });
  });
}
function yh(e, t) {
  var o = new Set();
  return e.filter(function (r) {
    var a = t(r);
    if (!o.has(a)) return o.add(a), !0;
  });
}
function xh(e) {
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
var ds =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Eh =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  ps = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
function fs() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function Oh(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    a = t.defaultOptions,
    i = a === void 0 ? ps : a;
  return function (l, c, d) {
    d === void 0 && (d = i);
    var u = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, ps, i),
        modifiersData: {},
        elements: { reference: l, popper: c },
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
            (u.options = Object.assign({}, i, u.options, T)),
            (u.scrollParents = {
              reference: Sn(l) ? ho(l) : l.contextElement ? ho(l.contextElement) : [],
              popper: ho(c),
            });
          var E = hh(xh([].concat(r, u.options.modifiers)));
          if (
            ((u.orderedModifiers = E.filter(function (I) {
              return I.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var x = yh([].concat(E, u.options.modifiers), function (I) {
              var G = I.name;
              return G;
            });
            if ((vh(x), Vt(u.options.placement) === kr)) {
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
            var k = Ut(c),
              w = k.marginTop,
              D = k.marginRight,
              z = k.marginBottom,
              N = k.marginLeft;
            [w, D, z, N].some(function (I) {
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
          return v(), y.update();
        },
        forceUpdate: function () {
          if (!h) {
            var C = u.elements,
              T = C.reference,
              E = C.popper;
            if (!fs(T, E)) {
              process.env.NODE_ENV !== 'production' && console.error(ds);
              return;
            }
            (u.rects = { reference: fh(T, $o(E), u.options.strategy === 'fixed'), popper: Fa(E) }),
              (u.reset = !1),
              (u.placement = u.options.placement),
              u.orderedModifiers.forEach(function (I) {
                return (u.modifiersData[I.name] = Object.assign({}, I.data));
              });
            for (var x = 0, f = 0; f < u.orderedModifiers.length; f++) {
              if (process.env.NODE_ENV !== 'production' && ((x += 1), x > 100)) {
                console.error(Eh);
                break;
              }
              if (u.reset === !0) {
                (u.reset = !1), (f = -1);
                continue;
              }
              var k = u.orderedModifiers[f],
                w = k.fn,
                D = k.options,
                z = D === void 0 ? {} : D,
                N = k.name;
              typeof w == 'function' &&
                (u = w({ state: u, options: z, name: N, instance: y }) || u);
            }
          }
        },
        update: bh(function () {
          return new Promise(function (b) {
            y.forceUpdate(), b(u);
          });
        }),
        destroy: function () {
          m(), (h = !0);
        },
      };
    if (!fs(l, c)) return process.env.NODE_ENV !== 'production' && console.error(ds), y;
    y.setOptions(d).then(function (b) {
      !h && d.onFirstUpdate && d.onFirstUpdate(b);
    });
    function v() {
      u.orderedModifiers.forEach(function (b) {
        var C = b.name,
          T = b.options,
          E = T === void 0 ? {} : T,
          x = b.effect;
        if (typeof x == 'function') {
          var f = x({ state: u, name: C, instance: y, options: E }),
            k = function () {};
          p.push(f || k);
        }
      });
    }
    function m() {
      p.forEach(function (b) {
        return b();
      }),
        (p = []);
    }
    return y;
  };
}
var Ch = [Bm, ih, zm, $m, rh, Qm, ch, Dm, th],
  Th = Oh({ defaultModifiers: Ch });
function wh(e) {
  return typeof e == 'function' ? e() : e;
}
const Qo = g.forwardRef(function (t, o) {
  const { children: r, container: a, disablePortal: i = !1 } = t,
    [s, l] = g.useState(null),
    c = at(g.isValidElement(r) ? r.ref : null, o);
  if (
    (tn(() => {
      i || l(wh(a) || document.body);
    }, [a, i]),
    tn(() => {
      if (s && !i)
        return (
          Ho(o, s),
          () => {
            Ho(o, null);
          }
        );
    }, [o, s, i]),
    i)
  ) {
    if (g.isValidElement(r)) {
      const d = { ref: c };
      return g.cloneElement(r, d);
    }
    return _(g.Fragment, { children: r });
  }
  return _(g.Fragment, { children: s && Zs.createPortal(r, s) });
});
process.env.NODE_ENV !== 'production' &&
  (Qo.propTypes = {
    children: n.node,
    container: n.oneOfType([en, n.func]),
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (Qo['propTypes'] = va(Qo.propTypes));
const Hl = Qo;
function kh(e) {
  return Ie('MuiPopper', e);
}
Ne('MuiPopper', ['root']);
function Sh(e, t) {
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
function er(e) {
  return typeof e == 'function' ? e() : e;
}
function Rr(e) {
  return e.nodeType !== void 0;
}
function Rh(e) {
  return !Rr(e);
}
const $h = () => _e({ root: ['root'] }, _l(kh)),
  Nh = {},
  Ph = g.forwardRef(function (t, o) {
    var r;
    const {
        anchorEl: a,
        children: i,
        direction: s,
        disablePortal: l,
        modifiers: c,
        open: d,
        placement: u,
        popperOptions: p,
        popperRef: h,
        slotProps: y = {},
        slots: v = {},
        TransitionProps: m,
        ownerState: b,
        ...C
      } = t,
      T = g.useRef(null),
      E = at(T, o),
      x = g.useRef(null),
      f = at(x, h),
      k = g.useRef(f);
    tn(() => {
      k.current = f;
    }, [f]),
      g.useImperativeHandle(h, () => x.current, []);
    const w = Sh(u, s),
      [D, z] = g.useState(w),
      [N, I] = g.useState(er(a));
    g.useEffect(() => {
      x.current && x.current.forceUpdate();
    }),
      g.useEffect(() => {
        a && I(er(a));
      }, [a]),
      tn(() => {
        if (!N || !d) return;
        const H = (V) => {
          z(V.placement);
        };
        if (process.env.NODE_ENV !== 'production' && N && Rr(N) && N.nodeType === 1) {
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
        let ie = [
          { name: 'preventOverflow', options: { altBoundary: l } },
          { name: 'flip', options: { altBoundary: l } },
          {
            name: 'onUpdate',
            enabled: !0,
            phase: 'afterWrite',
            fn: ({ state: V }) => {
              H(V);
            },
          },
        ];
        c != null && (ie = ie.concat(c)), p && p.modifiers != null && (ie = ie.concat(p.modifiers));
        const Q = Th(N, T.current, { placement: w, ...p, modifiers: ie });
        return (
          k.current(Q),
          () => {
            Q.destroy(), k.current(null);
          }
        );
      }, [N, l, c, d, p, w]);
    const G = { placement: D };
    m !== null && (G.TransitionProps = m);
    const j = $h(),
      M = (r = v.root) != null ? r : 'div',
      A = It({
        elementType: M,
        externalSlotProps: y.root,
        externalForwardedProps: C,
        additionalProps: { role: 'tooltip', ref: E },
        ownerState: t,
        className: j.root,
      });
    return _(M, { ...A, children: typeof i == 'function' ? i(G) : i });
  }),
  ql = g.forwardRef(function (t, o) {
    const {
        anchorEl: r,
        children: a,
        container: i,
        direction: s = 'ltr',
        disablePortal: l = !1,
        keepMounted: c = !1,
        modifiers: d,
        open: u,
        placement: p = 'bottom',
        popperOptions: h = Nh,
        popperRef: y,
        style: v,
        transition: m = !1,
        slotProps: b = {},
        slots: C = {},
        ...T
      } = t,
      [E, x] = g.useState(!0),
      f = () => {
        x(!1);
      },
      k = () => {
        x(!0);
      };
    if (!c && !u && (!m || E)) return null;
    let w;
    if (i) w = i;
    else if (r) {
      const N = er(r);
      w = N && Rr(N) ? rt(N).body : rt(null).body;
    }
    const D = !u && c && (!m || E) ? 'none' : void 0,
      z = m ? { in: u, onEnter: f, onExited: k } : void 0;
    return _(Hl, {
      disablePortal: l,
      container: w,
      children: _(Ph, {
        anchorEl: r,
        direction: s,
        disablePortal: l,
        modifiers: d,
        ref: o,
        open: m ? !E : u,
        placement: p,
        popperOptions: h,
        popperRef: y,
        slotProps: b,
        slots: C,
        ...T,
        style: { position: 'fixed', top: 0, left: 0, display: D, ...v },
        TransitionProps: z,
        children: a,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ql.propTypes = {
    anchorEl: Bt(n.oneOfType([en, n.object, n.func]), (e) => {
      if (e.open) {
        const t = er(e.anchorEl);
        if (t && Rr(t) && t.nodeType === 1) {
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
          (Rh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    container: n.oneOfType([en, n.func]),
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
    popperRef: xt,
    slotProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    slots: n.shape({ root: n.elementType }),
    transition: n.bool,
  });
const Ih = ql;
function Mh(e) {
  const t = rt(e);
  return t.body === e
    ? wn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function bo(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function ms(e) {
  return parseInt(wn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function _h(e) {
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
function hs(e, t, o, r, a) {
  const i = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1,
      c = !_h(s);
    l && c && bo(s, a);
  });
}
function Wr(e, t) {
  let o = -1;
  return e.some((r, a) => (t(r) ? ((o = a), !0) : !1)), o;
}
function Ah(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (Mh(r)) {
      const s = ll(rt(r));
      o.push({ value: r.style.paddingRight, property: 'padding-right', el: r }),
        (r.style.paddingRight = `${ms(r) + s}px`);
      const l = rt(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({ value: c.style.paddingRight, property: 'padding-right', el: c }),
          (c.style.paddingRight = `${ms(c) + s}px`);
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment) i = rt(r).body;
    else {
      const s = r.parentElement,
        l = wn(r);
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
function Dh(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class Lh {
  constructor() {
    (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && bo(t.modalRef, !1);
    const a = Dh(o);
    hs(o, t.mount, t.modalRef, a, !0);
    const i = Wr(this.containers, (s) => s.container === o);
    return i !== -1
      ? (this.containers[i].modals.push(t), r)
      : (this.containers.push({ modals: [t], container: o, restore: null, hiddenSiblings: a }), r);
  }
  mount(t, o) {
    const r = Wr(this.containers, (i) => i.modals.indexOf(t) !== -1),
      a = this.containers[r];
    a.restore || (a.restore = Ah(a, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const a = Wr(this.containers, (s) => s.modals.indexOf(t) !== -1),
      i = this.containers[a];
    if ((i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0))
      i.restore && i.restore(),
        t.modalRef && bo(t.modalRef, o),
        hs(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1),
        this.containers.splice(a, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && bo(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function jh(e) {
  return Ie('MuiModal', e);
}
Ne('MuiModal', ['root', 'hidden', 'backdrop']);
const Fh = (e) => {
  const { open: t, exited: o } = e;
  return _e({ root: ['root', !t && o && 'hidden'], backdrop: ['backdrop'] }, _l(jh));
};
function zh(e) {
  return typeof e == 'function' ? e() : e;
}
function Vh(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const Bh = new Lh(),
  Yl = g.forwardRef(function (t, o) {
    var r, a;
    const {
        children: i,
        closeAfterTransition: s = !1,
        container: l,
        disableAutoFocus: c = !1,
        disableEnforceFocus: d = !1,
        disableEscapeKeyDown: u = !1,
        disablePortal: p = !1,
        disableRestoreFocus: h = !1,
        disableScrollLock: y = !1,
        hideBackdrop: v = !1,
        keepMounted: m = !1,
        manager: b = Bh,
        onBackdropClick: C,
        onClose: T,
        onKeyDown: E,
        open: x,
        onTransitionEnter: f,
        onTransitionExited: k,
        slotProps: w = {},
        slots: D = {},
        ...z
      } = t,
      N = b,
      [I, G] = g.useState(!x),
      j = g.useRef({}),
      M = g.useRef(null),
      A = g.useRef(null),
      H = at(A, o),
      ie = Vh(i),
      Q = (r = t['aria-hidden']) != null ? r : !0,
      V = () => rt(M.current),
      S = () => ((j.current.modalRef = A.current), (j.current.mountNode = M.current), j.current),
      L = () => {
        N.mount(S(), { disableScrollLock: y }), A.current && (A.current.scrollTop = 0);
      },
      X = ft(() => {
        const pe = zh(l) || V().body;
        N.add(S(), pe), A.current && L();
      }),
      B = g.useCallback(() => N.isTopModal(S()), [N]),
      q = ft((pe) => {
        (M.current = pe), !(!pe || !A.current) && (x && B() ? L() : bo(A.current, Q));
      }),
      K = g.useCallback(() => {
        N.remove(S(), Q);
      }, [N, Q]);
    g.useEffect(
      () => () => {
        K();
      },
      [K],
    ),
      g.useEffect(() => {
        x ? X() : (!ie || !s) && K();
      }, [x, K, ie, s, X]);
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
        hideBackdrop: v,
        keepMounted: m,
      },
      Z = Fh(re),
      ae = () => {
        G(!1), f && f();
      },
      ce = () => {
        G(!0), k && k(), s && K();
      },
      ue = (pe) => {
        pe.target === pe.currentTarget && (C && C(pe), T && T(pe, 'backdropClick'));
      },
      me = (pe) => {
        E && E(pe),
          !(pe.key !== 'Escape' || !B()) &&
            (u || (pe.stopPropagation(), T && T(pe, 'escapeKeyDown')));
      },
      P = {};
    i.props.tabIndex === void 0 && (P.tabIndex = '-1'),
      ie && ((P.onEnter = xi(ae, i.props.onEnter)), (P.onExited = xi(ce, i.props.onExited)));
    const Ce = (a = D.root) != null ? a : 'div',
      J = It({
        elementType: Ce,
        externalSlotProps: w.root,
        externalForwardedProps: z,
        additionalProps: { ref: H, role: 'presentation', onKeyDown: me },
        className: Z.root,
        ownerState: re,
      }),
      W = D.backdrop,
      Te = It({
        elementType: W,
        externalSlotProps: w.backdrop,
        additionalProps: { 'aria-hidden': !0, onClick: ue, open: x },
        className: Z.backdrop,
        ownerState: re,
      });
    return !m && !x && (!ie || I)
      ? null
      : _(Hl, {
          ref: q,
          container: l,
          disablePortal: p,
          children: Xe(Ce, {
            ...J,
            children: [
              !v && W ? _(W, { ...Te }) : null,
              _(Jo, {
                disableEnforceFocus: d,
                disableAutoFocus: c,
                disableRestoreFocus: h,
                isEnabled: B,
                open: x,
                children: g.cloneElement(i, P),
              }),
            ],
          }),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (Yl.propTypes = {
    children: qn.isRequired,
    closeAfterTransition: n.bool,
    container: n.oneOfType([en, n.func]),
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
  });
const Uh = Yl,
  Wh = 2;
function Kl(e, t) {
  return e - t;
}
function ao(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function bs(e, t) {
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
function _o(e, t) {
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
function tr(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function Hh(e, t, o) {
  return (o - t) * e + t;
}
function qh(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function Yh(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(qh(t)));
}
function gs({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(Kl);
}
function Ao({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, a;
  const i = rt(e.current);
  if (
    !((r = e.current) != null && r.contains(i.activeElement)) ||
    Number(i == null || (a = i.activeElement) == null ? void 0 : a.getAttribute('data-index')) !== t
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
const Kh = {
    horizontal: { offset: (e) => ({ left: `${e}%` }), leap: (e) => ({ width: `${e}%` }) },
    'horizontal-reverse': {
      offset: (e) => ({ right: `${e}%` }),
      leap: (e) => ({ width: `${e}%` }),
    },
    vertical: { offset: (e) => ({ bottom: `${e}%` }), leap: (e) => ({ height: `${e}%` }) },
  },
  Gh = (e) => e;
let Lo;
function Hr() {
  return (
    Lo === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Lo = CSS.supports('touch-action', 'none'))
        : (Lo = !0)),
    Lo
  );
}
function Xh(e) {
  const {
      'aria-labelledby': t,
      defaultValue: o,
      disabled: r = !1,
      disableSwap: a = !1,
      isRtl: i = !1,
      marks: s = !1,
      max: l = 100,
      min: c = 0,
      name: d,
      onChange: u,
      onChangeCommitted: p,
      orientation: h = 'horizontal',
      rootRef: y,
      scale: v = Gh,
      step: m = 1,
      tabIndex: b,
      value: C,
    } = e,
    T = g.useRef(),
    [E, x] = g.useState(-1),
    [f, k] = g.useState(-1),
    [w, D] = g.useState(!1),
    z = g.useRef(0),
    [N, I] = Cn({ controlled: C, default: o ?? c, name: 'Slider' }),
    G =
      u &&
      ((ee, te, ye) => {
        const he = ee.nativeEvent || ee,
          Ee = new he.constructor(he.type, he);
        Object.defineProperty(Ee, 'target', { writable: !0, value: { value: te, name: d } }),
          u(Ee, te, ye);
      }),
    j = Array.isArray(N);
  let M = j ? N.slice().sort(Kl) : [N];
  M = M.map((ee) => ao(ee, c, l));
  const A =
      s === !0 && m !== null
        ? [...Array(Math.floor((l - c) / m) + 1)].map((ee, te) => ({ value: c + m * te }))
        : s || [],
    H = A.map((ee) => ee.value),
    { isFocusVisibleRef: ie, onBlur: Q, onFocus: V, ref: S } = sl(),
    [L, X] = g.useState(-1),
    B = g.useRef(),
    q = at(S, B),
    K = at(y, q),
    re = (ee) => (te) => {
      var ye;
      const he = Number(te.currentTarget.getAttribute('data-index'));
      V(te),
        ie.current === !0 && X(he),
        k(he),
        ee == null || (ye = ee.onFocus) == null || ye.call(ee, te);
    },
    Z = (ee) => (te) => {
      var ye;
      Q(te),
        ie.current === !1 && X(-1),
        k(-1),
        ee == null || (ye = ee.onBlur) == null || ye.call(ee, te);
    };
  tn(() => {
    if (r && B.current.contains(document.activeElement)) {
      var ee;
      (ee = document.activeElement) == null || ee.blur();
    }
  }, [r]),
    r && E !== -1 && x(-1),
    r && L !== -1 && X(-1);
  const ae = (ee) => (te) => {
      var ye;
      (ye = ee.onChange) == null || ye.call(ee, te);
      const he = Number(te.currentTarget.getAttribute('data-index')),
        Ee = M[he],
        Pe = H.indexOf(Ee);
      let se = te.target.valueAsNumber;
      if (
        (A && m == null && (se = se < Ee ? H[Pe - 1] : H[Pe + 1]),
        (se = ao(se, c, l)),
        A && m == null)
      ) {
        const Se = H.indexOf(M[he]);
        se = se < M[he] ? H[Se - 1] : H[Se + 1];
      }
      if (j) {
        a && (se = ao(se, M[he - 1] || -1 / 0, M[he + 1] || 1 / 0));
        const Se = se;
        se = gs({ values: M, newValue: se, index: he });
        let U = he;
        a || (U = se.indexOf(Se)), Ao({ sliderRef: B, activeIndex: U });
      }
      I(se), X(he), G && !Do(se, N) && G(te, se, he), p && p(te, se);
    },
    ce = g.useRef();
  let ue = h;
  i && h === 'horizontal' && (ue += '-reverse');
  const me = ({ finger: ee, move: te = !1 }) => {
      const { current: ye } = B,
        { width: he, height: Ee, bottom: Pe, left: se } = ye.getBoundingClientRect();
      let Se;
      ue.indexOf('vertical') === 0 ? (Se = (Pe - ee.y) / Ee) : (Se = (ee.x - se) / he),
        ue.indexOf('-reverse') !== -1 && (Se = 1 - Se);
      let U;
      if (((U = Hh(Se, c, l)), m)) U = Yh(U, m, c);
      else {
        const we = bs(H, U);
        U = H[we];
      }
      U = ao(U, c, l);
      let ve = 0;
      if (j) {
        te ? (ve = ce.current) : (ve = bs(M, U)),
          a && (U = ao(U, M[ve - 1] || -1 / 0, M[ve + 1] || 1 / 0));
        const we = U;
        (U = gs({ values: M, newValue: U, index: ve })),
          (a && te) || ((ve = U.indexOf(we)), (ce.current = ve));
      }
      return { newValue: U, activeIndex: ve };
    },
    P = ft((ee) => {
      const te = _o(ee, T);
      if (!te) return;
      if (((z.current += 1), ee.type === 'mousemove' && ee.buttons === 0)) {
        Ce(ee);
        return;
      }
      const { newValue: ye, activeIndex: he } = me({ finger: te, move: !0 });
      Ao({ sliderRef: B, activeIndex: he, setActive: x }),
        I(ye),
        !w && z.current > Wh && D(!0),
        G && !Do(ye, N) && G(ee, ye, he);
    }),
    Ce = ft((ee) => {
      const te = _o(ee, T);
      if ((D(!1), !te)) return;
      const { newValue: ye } = me({ finger: te, move: !0 });
      x(-1), ee.type === 'touchend' && k(-1), p && p(ee, ye), (T.current = void 0), W();
    }),
    J = ft((ee) => {
      if (r) return;
      Hr() || ee.preventDefault();
      const te = ee.changedTouches[0];
      te != null && (T.current = te.identifier);
      const ye = _o(ee, T);
      if (ye !== !1) {
        const { newValue: Ee, activeIndex: Pe } = me({ finger: ye });
        Ao({ sliderRef: B, activeIndex: Pe, setActive: x }),
          I(Ee),
          G && !Do(Ee, N) && G(ee, Ee, Pe);
      }
      z.current = 0;
      const he = rt(B.current);
      he.addEventListener('touchmove', P), he.addEventListener('touchend', Ce);
    }),
    W = g.useCallback(() => {
      const ee = rt(B.current);
      ee.removeEventListener('mousemove', P),
        ee.removeEventListener('mouseup', Ce),
        ee.removeEventListener('touchmove', P),
        ee.removeEventListener('touchend', Ce);
    }, [Ce, P]);
  g.useEffect(() => {
    const { current: ee } = B;
    return (
      ee.addEventListener('touchstart', J, { passive: Hr() }),
      () => {
        ee.removeEventListener('touchstart', J, { passive: Hr() }), W();
      }
    );
  }, [W, J]),
    g.useEffect(() => {
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
        const { newValue: Pe, activeIndex: se } = me({ finger: he });
        Ao({ sliderRef: B, activeIndex: se, setActive: x }),
          I(Pe),
          G && !Do(Pe, N) && G(te, Pe, se);
      }
      z.current = 0;
      const Ee = rt(B.current);
      Ee.addEventListener('mousemove', P), Ee.addEventListener('mouseup', Ce);
    },
    pe = tr(j ? M[0] : c, c, l),
    Re = tr(M[M.length - 1], c, l) - pe,
    je = (ee = {}) => {
      const te = { onMouseDown: Te(ee || {}) },
        ye = { ...ee, ...te };
      return { ref: K, ...ye };
    },
    Je = (ee) => (te) => {
      var ye;
      (ye = ee.onMouseOver) == null || ye.call(ee, te);
      const he = Number(te.currentTarget.getAttribute('data-index'));
      k(he);
    },
    Ge = (ee) => (te) => {
      var ye;
      (ye = ee.onMouseLeave) == null || ye.call(ee, te), k(-1);
    };
  return {
    active: E,
    axis: ue,
    axisProps: Kh,
    dragging: w,
    focusedThumbIndex: L,
    getHiddenInputProps: (ee = {}) => {
      var te;
      const ye = { onChange: ae(ee || {}), onFocus: re(ee || {}), onBlur: Z(ee || {}) },
        he = { ...ee, ...ye };
      return {
        tabIndex: b,
        'aria-labelledby': t,
        'aria-orientation': h,
        'aria-valuemax': v(l),
        'aria-valuemin': v(c),
        name: d,
        type: 'range',
        min: e.min,
        max: e.max,
        step: (te = e.step) != null ? te : void 0,
        disabled: r,
        ...he,
        style: { ...Qu, direction: i ? 'rtl' : 'ltr', width: '100%', height: '100%' },
      };
    },
    getRootProps: je,
    getThumbProps: (ee = {}) => {
      const te = { onMouseOver: Je(ee || {}), onMouseLeave: Ge(ee || {}) };
      return { ...ee, ...te };
    },
    marks: A,
    open: f,
    range: j,
    rootRef: K,
    trackLeap: Re,
    trackOffset: pe,
    values: M,
  };
}
function Jh(e) {
  const {
      autoHideDuration: t = null,
      disableWindowBlurListener: o = !1,
      onClose: r,
      open: a,
      resumeHideDuration: i,
    } = e,
    s = g.useRef();
  g.useEffect(() => {
    if (!a) return;
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
  }, [a, r]);
  const l = ft((C, T) => {
      r == null || r(C, T);
    }),
    c = ft((C) => {
      !r ||
        C == null ||
        (clearTimeout(s.current),
        (s.current = setTimeout(() => {
          l(null, 'timeout');
        }, C)));
    });
  g.useEffect(
    () => (
      a && c(t),
      () => {
        clearTimeout(s.current);
      }
    ),
    [a, t, c],
  );
  const d = (C) => {
      r == null || r(C, 'clickaway');
    },
    u = () => {
      clearTimeout(s.current);
    },
    p = g.useCallback(() => {
      t != null && c(i ?? t * 0.5);
    }, [t, i, c]),
    h = (C) => (T) => {
      const E = C.onBlur;
      E == null || E(T), p();
    },
    y = (C) => (T) => {
      const E = C.onFocus;
      E == null || E(T), u();
    },
    v = (C) => (T) => {
      const E = C.onMouseEnter;
      E == null || E(T), u();
    },
    m = (C) => (T) => {
      const E = C.onMouseLeave;
      E == null || E(T), p();
    };
  return (
    g.useEffect(() => {
      if (!o && a)
        return (
          window.addEventListener('focus', p),
          window.addEventListener('blur', u),
          () => {
            window.removeEventListener('focus', p), window.removeEventListener('blur', u);
          }
        );
    }, [o, p, a]),
    {
      getRootProps: (C = {}) => {
        const E = { ...Al(e), ...C };
        return {
          role: 'presentation',
          ...E,
          onBlur: h(E),
          onFocus: y(E),
          onMouseEnter: v(E),
          onMouseLeave: m(E),
        };
      },
      onClickAway: d,
    }
  );
}
function jo(e) {
  return parseInt(e, 10) || 0;
}
const Zh = {
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
function vs(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const Gl = g.forwardRef(function (t, o) {
  const { onChange: r, maxRows: a, minRows: i = 1, style: s, value: l, ...c } = t,
    { current: d } = g.useRef(l != null),
    u = g.useRef(null),
    p = at(o, u),
    h = g.useRef(null),
    y = g.useRef(0),
    [v, m] = g.useState({ outerHeightStyle: 0 }),
    b = g.useCallback(() => {
      const f = u.current,
        w = wn(f).getComputedStyle(f);
      if (w.width === '0px') return { outerHeightStyle: 0 };
      const D = h.current;
      (D.style.width = w.width),
        (D.value = f.value || t.placeholder || 'x'),
        D.value.slice(-1) ===
          `
` && (D.value += ' ');
      const z = w.boxSizing,
        N = jo(w.paddingBottom) + jo(w.paddingTop),
        I = jo(w.borderBottomWidth) + jo(w.borderTopWidth),
        G = D.scrollHeight;
      D.value = 'x';
      const j = D.scrollHeight;
      let M = G;
      i && (M = Math.max(Number(i) * j, M)),
        a && (M = Math.min(Number(a) * j, M)),
        (M = Math.max(M, j));
      const A = M + (z === 'border-box' ? N + I : 0),
        H = Math.abs(M - G) <= 1;
      return { outerHeightStyle: A, overflow: H };
    }, [a, i, t.placeholder]),
    C = (f, k) => {
      const { outerHeightStyle: w, overflow: D } = k;
      return y.current < 20 &&
        ((w > 0 && Math.abs((f.outerHeightStyle || 0) - w) > 1) || f.overflow !== D)
        ? ((y.current += 1), { overflow: D, outerHeightStyle: w })
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
    T = g.useCallback(() => {
      const f = b();
      vs(f) || m((k) => C(k, f));
    }, [b]),
    E = () => {
      const f = b();
      vs(f) ||
        Zs.flushSync(() => {
          m((k) => C(k, f));
        });
    };
  g.useEffect(() => {
    const f = al(() => {
      (y.current = 0), u.current && E();
    });
    let k;
    const w = u.current,
      D = wn(w);
    return (
      D.addEventListener('resize', f),
      typeof ResizeObserver < 'u' && ((k = new ResizeObserver(f)), k.observe(w)),
      () => {
        f.clear(), D.removeEventListener('resize', f), k && k.disconnect();
      }
    );
  }),
    tn(() => {
      T();
    }),
    g.useEffect(() => {
      y.current = 0;
    }, [l]);
  const x = (f) => {
    (y.current = 0), d || T(), r && r(f);
  };
  return Xe(g.Fragment, {
    children: [
      _('textarea', {
        value: l,
        onChange: x,
        ref: p,
        rows: i,
        style: { height: v.outerHeightStyle, overflow: v.overflow ? 'hidden' : void 0, ...s },
        ...c,
      }),
      _('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: h,
        tabIndex: -1,
        style: { ...Zh.shadow, ...s, padding: 0 },
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (Gl.propTypes = {
    className: n.string,
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    onChange: n.func,
    placeholder: n.string,
    style: n.object,
    value: n.oneOfType([n.arrayOf(n.string), n.number, n.string]),
  });
const Qh = Gl;
function ys(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function eb(e = {}) {
  const {
    ignoreAccents: t = !0,
    ignoreCase: o = !0,
    limit: r,
    matchFrom: a = 'any',
    stringify: i,
    trim: s = !1,
  } = e;
  return (l, { inputValue: c, getOptionLabel: d }) => {
    let u = s ? c.trim() : c;
    o && (u = u.toLowerCase()), t && (u = ys(u));
    const p = u
      ? l.filter((h) => {
          let y = (i || d)(h);
          return (
            o && (y = y.toLowerCase()),
            t && (y = ys(y)),
            a === 'start' ? y.indexOf(u) === 0 : y.indexOf(u) > -1
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
const tb = eb(),
  xs = 5,
  nb = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function ob(e) {
  const {
      unstable_isActiveElementInListbox: t = nb,
      unstable_classNamePrefix: o = 'Mui',
      autoComplete: r = !1,
      autoHighlight: a = !1,
      autoSelect: i = !1,
      blurOnSelect: s = !1,
      clearOnBlur: l = !e.freeSolo,
      clearOnEscape: c = !1,
      componentName: d = 'useAutocomplete',
      defaultValue: u = e.multiple ? [] : null,
      disableClearable: p = !1,
      disableCloseOnSelect: h = !1,
      disabled: y,
      disabledItemsFocusable: v = !1,
      disableListWrap: m = !1,
      filterOptions: b = tb,
      filterSelectedOptions: C = !1,
      freeSolo: T = !1,
      getOptionDisabled: E,
      getOptionLabel: x = (R) => {
        var $;
        return ($ = R.label) != null ? $ : R;
      },
      groupBy: f,
      handleHomeEndKeys: k = !e.freeSolo,
      id: w,
      includeInputInList: D = !1,
      inputValue: z,
      isOptionEqualToValue: N = (R, $) => R === $,
      multiple: I = !1,
      onChange: G,
      onClose: j,
      onHighlightChange: M,
      onInputChange: A,
      onOpen: H,
      open: ie,
      openOnFocus: Q = !1,
      options: V,
      readOnly: S = !1,
      selectOnFocus: L = !e.freeSolo,
      value: X,
    } = e,
    B = il(w);
  let q = x;
  q = (R) => {
    const $ = x(R);
    if (typeof $ != 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const Y = $ === void 0 ? 'undefined' : `${typeof $} (${$})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${d} returned ${Y} instead of a string for ${JSON.stringify(
            R,
          )}.`,
        );
      }
      return String($);
    }
    return $;
  };
  const K = g.useRef(!1),
    re = g.useRef(!0),
    Z = g.useRef(null),
    ae = g.useRef(null),
    [ce, ue] = g.useState(null),
    [me, P] = g.useState(-1),
    Ce = a ? 0 : -1,
    J = g.useRef(Ce),
    [W, Te] = Cn({ controlled: X, default: u, name: d }),
    [pe, Re] = Cn({ controlled: z, default: '', name: d, state: 'inputValue' }),
    [je, Je] = g.useState(!1),
    Ge = g.useCallback(
      (R, $) => {
        if (!(I ? W.length < $.length : $ !== null) && !l) return;
        let ne;
        if (I) ne = '';
        else if ($ == null) ne = '';
        else {
          const fe = q($);
          ne = typeof fe == 'string' ? fe : '';
        }
        pe !== ne && (Re(ne), A && A(R, ne, 'reset'));
      },
      [q, pe, I, A, Re, l, W],
    ),
    [Fe, Ze] = Cn({ controlled: ie, default: !1, name: d, state: 'open' }),
    [ee, te] = g.useState(!0),
    ye = !I && W != null && pe === q(W),
    he = Fe && !S,
    Ee = he
      ? b(
          V.filter((R) => !(C && (I ? W : [W]).some(($) => $ !== null && N(R, $)))),
          { inputValue: ye && ee ? '' : pe, getOptionLabel: q },
        )
      : [],
    Pe = Ju({ filteredOptions: Ee, value: W });
  g.useEffect(() => {
    const R = W !== Pe.value;
    (je && !R) || (T && !R) || Ge(null, W);
  }, [W, Ge, je, Pe.value, T]);
  const se = Fe && Ee.length > 0 && !S;
  if (process.env.NODE_ENV !== 'production' && W !== null && !T && V.length > 0) {
    const R = (I ? W : [W]).filter(($) => !V.some((Y) => N(Y, $)));
    R.length > 0 &&
      console.warn(
        [
          `MUI: The value provided to ${d} is invalid.`,
          `None of the options match with \`${
            R.length > 1 ? JSON.stringify(R) : JSON.stringify(R[0])
          }\`.`,
          'You can use the `isOptionEqualToValue` prop to customize the equality test.',
        ].join(`
`),
      );
  }
  const Se = ft((R) => {
    R === -1 ? Z.current.focus() : ce.querySelector(`[data-tag-index="${R}"]`).focus();
  });
  g.useEffect(() => {
    I && me > W.length - 1 && (P(-1), Se(-1));
  }, [W, I, me, Se]);
  function U(R, $) {
    if (!ae.current || R === -1) return -1;
    let Y = R;
    for (;;) {
      if (($ === 'next' && Y === Ee.length) || ($ === 'previous' && Y === -1)) return -1;
      const ne = ae.current.querySelector(`[data-option-index="${Y}"]`),
        fe = v ? !1 : !ne || ne.disabled || ne.getAttribute('aria-disabled') === 'true';
      if ((ne && !ne.hasAttribute('tabindex')) || fe) Y += $ === 'next' ? 1 : -1;
      else return Y;
    }
  }
  const ve = ft(({ event: R, index: $, reason: Y = 'auto' }) => {
      if (
        ((J.current = $),
        $ === -1
          ? Z.current.removeAttribute('aria-activedescendant')
          : Z.current.setAttribute('aria-activedescendant', `${B}-option-${$}`),
        M && M(R, $ === -1 ? null : Ee[$], Y),
        !ae.current)
      )
        return;
      const ne = ae.current.querySelector(`[role="option"].${o}-focused`);
      ne && (ne.classList.remove(`${o}-focused`), ne.classList.remove(`${o}-focusVisible`));
      let fe = ae.current;
      if (
        (ae.current.getAttribute('role') !== 'listbox' &&
          (fe = ae.current.parentElement.querySelector('[role="listbox"]')),
        !fe)
      )
        return;
      if ($ === -1) {
        fe.scrollTop = 0;
        return;
      }
      const be = ae.current.querySelector(`[data-option-index="${$}"]`);
      if (
        be &&
        (be.classList.add(`${o}-focused`),
        Y === 'keyboard' && be.classList.add(`${o}-focusVisible`),
        fe.scrollHeight > fe.clientHeight && Y !== 'mouse')
      ) {
        const ge = be,
          ke = fe.clientHeight + fe.scrollTop,
          Oe = ge.offsetTop + ge.offsetHeight;
        Oe > ke
          ? (fe.scrollTop = Oe - fe.clientHeight)
          : ge.offsetTop - ge.offsetHeight * (f ? 1.3 : 0) < fe.scrollTop &&
            (fe.scrollTop = ge.offsetTop - ge.offsetHeight * (f ? 1.3 : 0));
      }
    }),
    we = ft(({ event: R, diff: $, direction: Y = 'next', reason: ne = 'auto' }) => {
      if (!he) return;
      const be = U(
        (() => {
          const ge = Ee.length - 1;
          if ($ === 'reset') return Ce;
          if ($ === 'start') return 0;
          if ($ === 'end') return ge;
          const ke = J.current + $;
          return ke < 0
            ? ke === -1 && D
              ? -1
              : (m && J.current !== -1) || Math.abs($) > 1
              ? 0
              : ge
            : ke > ge
            ? ke === ge + 1 && D
              ? -1
              : m || Math.abs($) > 1
              ? ge
              : 0
            : ke;
        })(),
        Y,
      );
      if ((ve({ index: be, reason: ne, event: R }), r && $ !== 'reset'))
        if (be === -1) Z.current.value = pe;
        else {
          const ge = q(Ee[be]);
          (Z.current.value = ge),
            ge.toLowerCase().indexOf(pe.toLowerCase()) === 0 &&
              pe.length > 0 &&
              Z.current.setSelectionRange(pe.length, ge.length);
        }
    }),
    mt = () => {
      const R = ($, Y) => {
        const ne = $ ? q($) : '',
          fe = Y ? q(Y) : '';
        return ne === fe;
      };
      if (
        J.current !== -1 &&
        Pe.filteredOptions &&
        Pe.filteredOptions.length !== Ee.length &&
        (I
          ? W.length === Pe.value.length && Pe.value.every(($, Y) => q(W[Y]) === q($))
          : R(Pe.value, W))
      ) {
        const $ = Pe.filteredOptions[J.current];
        if ($ && Ee.some((ne) => q(ne) === q($))) return !0;
      }
      return !1;
    },
    bt = g.useCallback(() => {
      if (!he || mt()) return;
      const R = I ? W[0] : W;
      if (Ee.length === 0 || R == null) {
        we({ diff: 'reset' });
        return;
      }
      if (ae.current) {
        if (R != null) {
          const $ = Ee[J.current];
          if (I && $ && qr(W, (ne) => N($, ne)) !== -1) return;
          const Y = qr(Ee, (ne) => N(ne, R));
          Y === -1 ? we({ diff: 'reset' }) : ve({ index: Y });
          return;
        }
        if (J.current >= Ee.length - 1) {
          ve({ index: Ee.length - 1 });
          return;
        }
        ve({ index: J.current });
      }
    }, [Ee.length, I ? !1 : W, C, we, ve, he, pe, I]),
    lt = ft((R) => {
      Ho(ae, R), R && bt();
    });
  process.env.NODE_ENV !== 'production' &&
    g.useEffect(() => {
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
    g.useEffect(() => {
      bt();
    }, [bt]);
  const Et = (R) => {
      Fe || (Ze(!0), te(!0), H && H(R));
    },
    Ot = (R, $) => {
      Fe && (Ze(!1), j && j(R, $));
    },
    Qe = (R, $, Y, ne) => {
      if (I) {
        if (W.length === $.length && W.every((fe, be) => fe === $[be])) return;
      } else if (W === $) return;
      G && G(R, $, Y, ne), Te($);
    },
    ct = g.useRef(!1),
    dt = (R, $, Y = 'selectOption', ne = 'options') => {
      let fe = Y,
        be = $;
      if (I) {
        if (((be = Array.isArray(W) ? W.slice() : []), process.env.NODE_ENV !== 'production')) {
          const ke = be.filter((Oe) => N($, Oe));
          ke.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${d} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${ke.length} matches.`,
              ].join(`
`),
            );
        }
        const ge = qr(be, (ke) => N($, ke));
        ge === -1 ? be.push($) : ne !== 'freeSolo' && (be.splice(ge, 1), (fe = 'removeOption'));
      }
      Ge(R, be),
        Qe(R, be, fe, { option: $ }),
        !h && (!R || (!R.ctrlKey && !R.metaKey)) && Ot(R, fe),
        (s === !0 || (s === 'touch' && ct.current) || (s === 'mouse' && !ct.current)) &&
          Z.current.blur();
    };
  function Ht(R, $) {
    if (R === -1) return -1;
    let Y = R;
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
  const qt = (R, $) => {
      if (!I) return;
      pe === '' && Ot(R, 'toggleInput');
      let Y = me;
      me === -1
        ? pe === '' && $ === 'previous' && (Y = W.length - 1)
        : ((Y += $ === 'next' ? 1 : -1), Y < 0 && (Y = 0), Y === W.length && (Y = -1)),
        (Y = Ht(Y, $)),
        P(Y),
        Se(Y);
    },
    on = (R) => {
      (K.current = !0), Re(''), A && A(R, '', 'clear'), Qe(R, I ? [] : null, 'clear');
    },
    Ct = (R) => ($) => {
      if (
        (R.onKeyDown && R.onKeyDown($),
        !$.defaultMuiPrevented &&
          (me !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf($.key) === -1 && (P(-1), Se(-1)),
          $.which !== 229))
      )
        switch ($.key) {
          case 'Home':
            he &&
              k &&
              ($.preventDefault(),
              we({ diff: 'start', direction: 'next', reason: 'keyboard', event: $ }));
            break;
          case 'End':
            he &&
              k &&
              ($.preventDefault(),
              we({ diff: 'end', direction: 'previous', reason: 'keyboard', event: $ }));
            break;
          case 'PageUp':
            $.preventDefault(),
              we({ diff: -xs, direction: 'previous', reason: 'keyboard', event: $ }),
              Et($);
            break;
          case 'PageDown':
            $.preventDefault(),
              we({ diff: xs, direction: 'next', reason: 'keyboard', event: $ }),
              Et($);
            break;
          case 'ArrowDown':
            $.preventDefault(),
              we({ diff: 1, direction: 'next', reason: 'keyboard', event: $ }),
              Et($);
            break;
          case 'ArrowUp':
            $.preventDefault(),
              we({ diff: -1, direction: 'previous', reason: 'keyboard', event: $ }),
              Et($);
            break;
          case 'ArrowLeft':
            qt($, 'previous');
            break;
          case 'ArrowRight':
            qt($, 'next');
            break;
          case 'Enter':
            if (J.current !== -1 && he) {
              const Y = Ee[J.current],
                ne = E ? E(Y) : !1;
              if (($.preventDefault(), ne)) return;
              dt($, Y, 'selectOption'),
                r && Z.current.setSelectionRange(Z.current.value.length, Z.current.value.length);
            } else
              T &&
                pe !== '' &&
                ye === !1 &&
                (I && $.preventDefault(), dt($, pe, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            he
              ? ($.preventDefault(), $.stopPropagation(), Ot($, 'escape'))
              : c &&
                (pe !== '' || (I && W.length > 0)) &&
                ($.preventDefault(), $.stopPropagation(), on($));
            break;
          case 'Backspace':
            if (I && !S && pe === '' && W.length > 0) {
              const Y = me === -1 ? W.length - 1 : me,
                ne = W.slice();
              ne.splice(Y, 1), Qe($, ne, 'removeOption', { option: W[Y] });
            }
            break;
          case 'Delete':
            if (I && !S && pe === '' && W.length > 0 && me !== -1) {
              const Y = me,
                ne = W.slice();
              ne.splice(Y, 1), Qe($, ne, 'removeOption', { option: W[Y] });
            }
            break;
        }
    },
    Yt = (R) => {
      Je(!0), Q && !K.current && Et(R);
    },
    Kt = (R) => {
      if (t(ae)) {
        Z.current.focus();
        return;
      }
      Je(!1),
        (re.current = !0),
        (K.current = !1),
        i && J.current !== -1 && he
          ? dt(R, Ee[J.current], 'blur')
          : i && T && pe !== ''
          ? dt(R, pe, 'blur', 'freeSolo')
          : l && Ge(R, W),
        Ot(R, 'blur');
    },
    Tt = (R) => {
      const $ = R.target.value;
      pe !== $ && (Re($), te(!1), A && A(R, $, 'input')),
        $ === '' ? !p && !I && Qe(R, null, 'clear') : Et(R);
    },
    hn = (R) => {
      const $ = Number(R.currentTarget.getAttribute('data-option-index'));
      J.current !== $ && ve({ event: R, index: $, reason: 'mouse' });
    },
    rn = (R) => {
      ve({
        event: R,
        index: Number(R.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (ct.current = !0);
    },
    wt = (R) => {
      const $ = Number(R.currentTarget.getAttribute('data-option-index'));
      dt(R, Ee[$], 'selectOption'), (ct.current = !1);
    },
    Lt = (R) => ($) => {
      const Y = W.slice();
      Y.splice(R, 1), Qe($, Y, 'removeOption', { option: W[R] });
    },
    Gt = (R) => {
      Fe ? Ot(R, 'toggleInput') : Et(R);
    },
    bn = (R) => {
      R.currentTarget.contains(R.target) && R.target.getAttribute('id') !== B && R.preventDefault();
    },
    st = (R) => {
      R.currentTarget.contains(R.target) &&
        (Z.current.focus(),
        L &&
          re.current &&
          Z.current.selectionEnd - Z.current.selectionStart === 0 &&
          Z.current.select(),
        (re.current = !1));
    },
    O = (R) => {
      (pe === '' || !Fe) && Gt(R);
    };
  let F = T && pe.length > 0;
  F = F || (I ? W.length > 0 : W !== null);
  let le = Ee;
  if (f) {
    const R = new Map();
    let $ = !1;
    le = Ee.reduce((Y, ne, fe) => {
      const be = f(ne);
      return (
        Y.length > 0 && Y[Y.length - 1].group === be
          ? Y[Y.length - 1].options.push(ne)
          : (process.env.NODE_ENV !== 'production' &&
              (R.get(be) &&
                !$ &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${d} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                ($ = !0)),
              R.set(be, !0)),
            Y.push({ key: fe, index: fe, group: be, options: [ne] })),
        Y
      );
    }, []);
  }
  return (
    y && je && Kt(),
    {
      getRootProps: (R = {}) => ({
        'aria-owns': se ? `${B}-listbox` : null,
        ...R,
        onKeyDown: Ct(R),
        onMouseDown: bn,
        onClick: st,
      }),
      getInputLabelProps: () => ({ id: `${B}-label`, htmlFor: B }),
      getInputProps: () => ({
        id: B,
        value: pe,
        onBlur: Kt,
        onFocus: Yt,
        onChange: Tt,
        onMouseDown: O,
        'aria-activedescendant': he ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': se ? `${B}-listbox` : void 0,
        'aria-expanded': se,
        autoComplete: 'off',
        ref: Z,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled: y,
      }),
      getClearProps: () => ({ tabIndex: -1, onClick: on }),
      getPopupIndicatorProps: () => ({ tabIndex: -1, onClick: Gt }),
      getTagProps: ({ index: R }) => ({
        key: R,
        'data-tag-index': R,
        tabIndex: -1,
        ...(!S && { onDelete: Lt(R) }),
      }),
      getListboxProps: () => ({
        role: 'listbox',
        id: `${B}-listbox`,
        'aria-labelledby': `${B}-label`,
        ref: lt,
        onMouseDown: (R) => {
          R.preventDefault();
        },
      }),
      getOptionProps: ({ index: R, option: $ }) => {
        const Y = (I ? W : [W]).some((fe) => fe != null && N($, fe)),
          ne = E ? E($) : !1;
        return {
          key: q($),
          tabIndex: -1,
          role: 'option',
          id: `${B}-option-${R}`,
          onMouseMove: hn,
          onClick: wt,
          onTouchStart: rn,
          'data-option-index': R,
          'aria-disabled': ne,
          'aria-selected': Y,
        };
      },
      id: B,
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
function rb(e) {
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
      a = { root: ['root', t !== 'inherit' && `color${oe(t)}`, `fontSize${oe(o)}`] };
    return _e(a, rb, r);
  },
  ib = de('svg', {
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
    var o, r, a, i, s, l, c, d, u, p, h, y, v, m, b, C, T;
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
          ((c = e.typography) == null || (d = c.pxToRem) == null ? void 0 : d.call(c, 24)) ||
          '1.5rem',
        large:
          ((u = e.typography) == null || (p = u.pxToRem) == null ? void 0 : p.call(u, 35)) ||
          '2.1875rem',
      }[t.fontSize],
      color:
        (h = (y = (e.vars || e).palette) == null || (v = y[t.color]) == null ? void 0 : v.main) !=
        null
          ? h
          : {
              action:
                (m = (e.vars || e).palette) == null || (b = m.action) == null ? void 0 : b.active,
              disabled:
                (C = (e.vars || e).palette) == null || (T = C.action) == null ? void 0 : T.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  Wa = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiSvgIcon' }),
      {
        children: a,
        className: i,
        color: s = 'inherit',
        component: l = 'svg',
        fontSize: c = 'medium',
        htmlColor: d,
        inheritViewBox: u = !1,
        titleAccess: p,
        viewBox: h = '0 0 24 24',
        ...y
      } = r,
      v = {
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
    const b = ab(v);
    return Xe(ib, {
      as: l,
      className: xe(b.root, i),
      focusable: 'false',
      color: d,
      'aria-hidden': p ? void 0 : !0,
      role: p ? 'img' : void 0,
      ref: o,
      ...m,
      ...y,
      ownerState: v,
      children: [a, p ? _('title', { children: p }) : null],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Wa.propTypes = {
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
Wa.muiName = 'SvgIcon';
const Es = Wa;
function Xn(e, t) {
  function o(r, a) {
    return _(Es, { 'data-testid': `${t}Icon`, ref: a, ...r, children: e });
  }
  return (
    process.env.NODE_ENV !== 'production' && (o.displayName = `${t}Icon`),
    (o.muiName = Es.muiName),
    g.memo(g.forwardRef(o))
  );
}
function Xl(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    a,
    i;
  for (i = 0; i < r.length; i++) (a = r[i]), !(t.indexOf(a) >= 0) && (o[a] = e[a]);
  return o;
}
function ua(e, t) {
  return (
    (ua = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, a) {
          return (r.__proto__ = a), r;
        }),
    ua(e, t)
  );
}
function Jl(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), ua(e, t);
}
const Os = { disabled: !1 };
var sb =
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
const nr = et.createContext(null);
var lb = function (t) {
    return t.scrollTop;
  },
  uo = 'unmounted',
  vn = 'exited',
  yn = 'entering',
  Dn = 'entered',
  da = 'exiting',
  ln = (function (e) {
    Jl(t, e);
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
            ? ((c = vn), (i.appearStatus = yn))
            : (c = Dn)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = uo)
          : (c = vn),
        (i.state = { status: c }),
        (i.nextCallback = null),
        i
      );
    }
    t.getDerivedStateFromProps = function (a, i) {
      var s = a.in;
      return s && i.status === uo ? { status: vn } : null;
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
          this.props.in ? s !== yn && s !== Dn && (i = yn) : (s === yn || s === Dn) && (i = da);
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
          if ((this.cancelNextCallback(), i === yn)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : co.findDOMNode(this);
              s && lb(s);
            }
            this.performEnter(a);
          } else this.performExit();
        else this.props.unmountOnExit && this.state.status === vn && this.setState({ status: uo });
      }),
      (o.performEnter = function (a) {
        var i = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : a,
          c = this.props.nodeRef ? [l] : [co.findDOMNode(this), l],
          d = c[0],
          u = c[1],
          p = this.getTimeouts(),
          h = l ? p.appear : p.enter;
        if ((!a && !s) || Os.disabled) {
          this.safeSetState({ status: Dn }, function () {
            i.props.onEntered(d);
          });
          return;
        }
        this.props.onEnter(d, u),
          this.safeSetState({ status: yn }, function () {
            i.props.onEntering(d, u),
              i.onTransitionEnd(h, function () {
                i.safeSetState({ status: Dn }, function () {
                  i.props.onEntered(d, u);
                });
              });
          });
      }),
      (o.performExit = function () {
        var a = this,
          i = this.props.exit,
          s = this.getTimeouts(),
          l = this.props.nodeRef ? void 0 : co.findDOMNode(this);
        if (!i || Os.disabled) {
          this.safeSetState({ status: vn }, function () {
            a.props.onExited(l);
          });
          return;
        }
        this.props.onExit(l),
          this.safeSetState({ status: da }, function () {
            a.props.onExiting(l),
              a.onTransitionEnd(s.exit, function () {
                a.safeSetState({ status: vn }, function () {
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : co.findDOMNode(this),
          l = a == null && !this.props.addEndListener;
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
        a != null && setTimeout(this.nextCallback, a);
      }),
      (o.render = function () {
        var a = this.state.status;
        if (a === uo) return null;
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
        var l = Xl(i, [
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
        return et.createElement(
          nr.Provider,
          { value: null },
          typeof s == 'function' ? s(a, l) : et.cloneElement(et.Children.only(s), l),
        );
      }),
      t
    );
  })(et.Component);
ln.contextType = nr;
ln.propTypes =
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
          var o = sb;
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
function _n() {}
ln.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: _n,
  onEntering: _n,
  onEntered: _n,
  onExit: _n,
  onExiting: _n,
  onExited: _n,
};
ln.UNMOUNTED = uo;
ln.EXITED = vn;
ln.ENTERING = yn;
ln.ENTERED = Dn;
ln.EXITING = da;
const Zl = ln;
function cb(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ha(e, t) {
  var o = function (i) {
      return t && et.isValidElement(i) ? t(i) : i;
    },
    r = Object.create(null);
  return (
    e &&
      et.Children.map(e, function (a) {
        return a;
      }).forEach(function (a) {
        r[a.key] = o(a);
      }),
    r
  );
}
function ub(e, t) {
  (e = e || {}), (t = t || {});
  function o(u) {
    return u in t ? t[u] : e[u];
  }
  var r = Object.create(null),
    a = [];
  for (var i in e) i in t ? a.length && ((r[i] = a), (a = [])) : a.push(i);
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
  for (s = 0; s < a.length; s++) l[a[s]] = o(a[s]);
  return l;
}
function On(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function db(e, t) {
  return Ha(e.children, function (o) {
    return et.cloneElement(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: On(o, 'appear', e),
      enter: On(o, 'enter', e),
      exit: On(o, 'exit', e),
    });
  });
}
function pb(e, t, o) {
  var r = Ha(e.children),
    a = ub(t, r);
  return (
    Object.keys(a).forEach(function (i) {
      var s = a[i];
      if (et.isValidElement(s)) {
        var l = i in t,
          c = i in r,
          d = t[i],
          u = et.isValidElement(d) && !d.props.in;
        c && (!l || u)
          ? (a[i] = et.cloneElement(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: On(s, 'exit', e),
              enter: On(s, 'enter', e),
            }))
          : !c && l && !u
          ? (a[i] = et.cloneElement(s, { in: !1 }))
          : c &&
            l &&
            et.isValidElement(d) &&
            (a[i] = et.cloneElement(s, {
              onExited: o.bind(null, s),
              in: d.props.in,
              exit: On(s, 'exit', e),
              enter: On(s, 'enter', e),
            }));
      }
    }),
    a
  );
}
var fb =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  mb = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  qa = (function (e) {
    Jl(t, e);
    function t(r, a) {
      var i;
      i = e.call(this, r, a) || this;
      var s = i.handleExited.bind(cb(i));
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
        return { children: c ? db(a, l) : pb(a, s, l), firstRender: !1 };
      }),
      (o.handleExited = function (a, i) {
        var s = Ha(this.props.children);
        a.key in s ||
          (a.props.onExited && a.props.onExited(i),
          this.mounted &&
            this.setState(function (l) {
              var c = qo({}, l.children);
              return delete c[a.key], { children: c };
            }));
      }),
      (o.render = function () {
        var a = this.props,
          i = a.component,
          s = a.childFactory,
          l = Xl(a, ['component', 'childFactory']),
          c = this.state.contextValue,
          d = fb(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          i === null
            ? et.createElement(nr.Provider, { value: c }, d)
            : et.createElement(nr.Provider, { value: c }, et.createElement(i, l, d))
        );
      }),
      t
    );
  })(et.Component);
qa.propTypes =
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
qa.defaultProps = mb;
const hb = qa,
  Ql = (e) => e.scrollTop;
function or(e, t) {
  var o, r;
  const { timeout: a, easing: i, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof a == 'number' ? a : a[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof i == 'object' ? i[t.mode] : i,
    delay: s.transitionDelay,
  };
}
function bb(e) {
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
    const { square: t, elevation: o, variant: r, classes: a } = e,
      i = { root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`] };
    return _e(i, bb, a);
  },
  vb = de('div', {
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
      ...(!t.square && { borderRadius: e.shape.borderRadius }),
      ...(t.variant === 'outlined' && { border: `1px solid ${(e.vars || e).palette.divider}` }),
      ...(t.variant === 'elevation' && {
        boxShadow: (e.vars || e).shadows[t.elevation],
        ...(!e.vars &&
          e.palette.mode === 'dark' && {
            backgroundImage: `linear-gradient(${Ye('#fff', es(t.elevation))}, ${Ye(
              '#fff',
              es(t.elevation),
            )})`,
          }),
        ...(e.vars && { backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation] }),
      }),
    };
  }),
  ec = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiPaper' }),
      {
        className: a,
        component: i = 'div',
        elevation: s = 1,
        square: l = !1,
        variant: c = 'elevation',
        ...d
      } = r,
      u = { ...r, component: i, elevation: s, square: l, variant: c },
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
      _(vb, { as: i, ownerState: u, className: xe(p.root, a), ref: o, ...d })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ec.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    elevation: Bt(ya, (e) => {
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
const No = ec;
function tc(e) {
  const {
      className: t,
      classes: o,
      pulsate: r = !1,
      rippleX: a,
      rippleY: i,
      rippleSize: s,
      in: l,
      onExited: c,
      timeout: d,
    } = e,
    [u, p] = g.useState(!1),
    h = xe(t, o.ripple, o.rippleVisible, r && o.ripplePulsate),
    y = { width: s, height: s, top: -(s / 2) + i, left: -(s / 2) + a },
    v = xe(o.child, u && o.childLeaving, r && o.childPulsate);
  return (
    !l && !u && p(!0),
    g.useEffect(() => {
      if (!l && c != null) {
        const m = setTimeout(c, d);
        return () => {
          clearTimeout(m);
        };
      }
    }, [c, l, d]),
    _('span', { className: h, style: y, children: _('span', { className: v }) })
  );
}
process.env.NODE_ENV !== 'production' &&
  (tc.propTypes = {
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
const yb = Ne('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  Mt = yb;
let $r = (e) => e,
  Cs,
  Ts,
  ws,
  ks;
const pa = 550,
  xb = 80,
  Eb = $a(
    Cs ||
      (Cs = $r`
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
  Ob = $a(
    Ts ||
      (Ts = $r`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  Cb = $a(
    ws ||
      (ws = $r`
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
  Tb = de('span', { name: 'MuiTouchRipple', slot: 'Root' })({
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
  wb = de(tc, { name: 'MuiTouchRipple', slot: 'Ripple' })(
    ks ||
      (ks = $r`
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
    Eb,
    pa,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Mt.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    Mt.child,
    Mt.childLeaving,
    Ob,
    pa,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Mt.childPulsate,
    Cb,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  nc = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiTouchRipple' }),
      { center: a = !1, classes: i = {}, className: s, ...l } = r,
      [c, d] = g.useState([]),
      u = g.useRef(0),
      p = g.useRef(null);
    g.useEffect(() => {
      p.current && (p.current(), (p.current = null));
    }, [c]);
    const h = g.useRef(!1),
      y = g.useRef(null),
      v = g.useRef(null),
      m = g.useRef(null);
    g.useEffect(
      () => () => {
        clearTimeout(y.current);
      },
      [],
    );
    const b = g.useCallback(
        (x) => {
          const { pulsate: f, rippleX: k, rippleY: w, rippleSize: D, cb: z } = x;
          d((N) => [
            ...N,
            _(
              wb,
              {
                classes: {
                  ripple: xe(i.ripple, Mt.ripple),
                  rippleVisible: xe(i.rippleVisible, Mt.rippleVisible),
                  ripplePulsate: xe(i.ripplePulsate, Mt.ripplePulsate),
                  child: xe(i.child, Mt.child),
                  childLeaving: xe(i.childLeaving, Mt.childLeaving),
                  childPulsate: xe(i.childPulsate, Mt.childPulsate),
                },
                timeout: pa,
                pulsate: f,
                rippleX: k,
                rippleY: w,
                rippleSize: D,
              },
              u.current,
            ),
          ]),
            (u.current += 1),
            (p.current = z);
        },
        [i],
      ),
      C = g.useCallback(
        (x = {}, f = {}, k = () => {}) => {
          const { pulsate: w = !1, center: D = a || f.pulsate, fakeElement: z = !1 } = f;
          if ((x == null ? void 0 : x.type) === 'mousedown' && h.current) {
            h.current = !1;
            return;
          }
          (x == null ? void 0 : x.type) === 'touchstart' && (h.current = !0);
          const N = z ? null : m.current,
            I = N ? N.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
          let G, j, M;
          if (
            D ||
            x === void 0 ||
            (x.clientX === 0 && x.clientY === 0) ||
            (!x.clientX && !x.touches)
          )
            (G = Math.round(I.width / 2)), (j = Math.round(I.height / 2));
          else {
            const { clientX: A, clientY: H } = x.touches && x.touches.length > 0 ? x.touches[0] : x;
            (G = Math.round(A - I.left)), (j = Math.round(H - I.top));
          }
          if (D) (M = Math.sqrt((2 * I.width ** 2 + I.height ** 2) / 3)), M % 2 === 0 && (M += 1);
          else {
            const A = Math.max(Math.abs((N ? N.clientWidth : 0) - G), G) * 2 + 2,
              H = Math.max(Math.abs((N ? N.clientHeight : 0) - j), j) * 2 + 2;
            M = Math.sqrt(A ** 2 + H ** 2);
          }
          x != null && x.touches
            ? v.current === null &&
              ((v.current = () => {
                b({ pulsate: w, rippleX: G, rippleY: j, rippleSize: M, cb: k });
              }),
              (y.current = setTimeout(() => {
                v.current && (v.current(), (v.current = null));
              }, xb)))
            : b({ pulsate: w, rippleX: G, rippleY: j, rippleSize: M, cb: k });
        },
        [a, b],
      ),
      T = g.useCallback(() => {
        C({}, { pulsate: !0 });
      }, [C]),
      E = g.useCallback((x, f) => {
        if ((clearTimeout(y.current), (x == null ? void 0 : x.type) === 'touchend' && v.current)) {
          v.current(),
            (v.current = null),
            (y.current = setTimeout(() => {
              E(x, f);
            }));
          return;
        }
        (v.current = null), d((k) => (k.length > 0 ? k.slice(1) : k)), (p.current = f);
      }, []);
    return (
      g.useImperativeHandle(o, () => ({ pulsate: T, start: C, stop: E }), [T, C, E]),
      _(Tb, {
        className: xe(Mt.root, i.root, s),
        ref: m,
        ...l,
        children: _(hb, { component: null, exit: !0, children: c }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (nc.propTypes = { center: n.bool, classes: n.object, className: n.string });
const kb = nc;
function Sb(e) {
  return Ie('MuiButtonBase', e);
}
const Rb = Ne('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  $b = Rb,
  Nb = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: a } = e,
      s = _e({ root: ['root', t && 'disabled', o && 'focusVisible'] }, Sb, a);
    return o && r && (s.root += ` ${r}`), s;
  },
  Pb = de('button', { name: 'MuiButtonBase', slot: 'Root', overridesResolver: (e, t) => t.root })({
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
    [`&.${$b.disabled}`]: { pointerEvents: 'none', cursor: 'default' },
    '@media print': { colorAdjust: 'exact' },
  }),
  oc = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiButtonBase' }),
      {
        action: a,
        centerRipple: i = !1,
        children: s,
        className: l,
        component: c = 'button',
        disabled: d = !1,
        disableRipple: u = !1,
        disableTouchRipple: p = !1,
        focusRipple: h = !1,
        focusVisibleClassName: y,
        LinkComponent: v = 'a',
        onBlur: m,
        onClick: b,
        onContextMenu: C,
        onDragLeave: T,
        onFocus: E,
        onFocusVisible: x,
        onKeyDown: f,
        onKeyUp: k,
        onMouseDown: w,
        onMouseLeave: D,
        onMouseUp: z,
        onTouchEnd: N,
        onTouchMove: I,
        onTouchStart: G,
        tabIndex: j = 0,
        TouchRippleProps: M,
        touchRippleRef: A,
        type: H,
        ...ie
      } = r,
      Q = g.useRef(null),
      V = g.useRef(null),
      S = at(V, A),
      { isFocusVisibleRef: L, onFocus: X, onBlur: B, ref: q } = sl(),
      [K, re] = g.useState(!1);
    d && K && re(!1),
      g.useImperativeHandle(
        a,
        () => ({
          focusVisible: () => {
            re(!0), Q.current.focus();
          },
        }),
        [],
      );
    const [Z, ae] = g.useState(!1);
    g.useEffect(() => {
      ae(!0);
    }, []);
    const ce = Z && !u && !d;
    g.useEffect(() => {
      K && h && !u && Z && V.current.pulsate();
    }, [u, h, K, Z]);
    function ue(se, Se, U = p) {
      return ft((ve) => (Se && Se(ve), !U && V.current && V.current[se](ve), !0));
    }
    const me = ue('start', w),
      P = ue('stop', C),
      Ce = ue('stop', T),
      J = ue('stop', z),
      W = ue('stop', (se) => {
        K && se.preventDefault(), D && D(se);
      }),
      Te = ue('start', G),
      pe = ue('stop', N),
      Re = ue('stop', I),
      je = ue(
        'stop',
        (se) => {
          B(se), L.current === !1 && re(!1), m && m(se);
        },
        !1,
      ),
      Je = ft((se) => {
        Q.current || (Q.current = se.currentTarget),
          X(se),
          L.current === !0 && (re(!0), x && x(se)),
          E && E(se);
      }),
      Ge = () => {
        const se = Q.current;
        return c && c !== 'button' && !(se.tagName === 'A' && se.href);
      },
      Fe = g.useRef(!1),
      Ze = ft((se) => {
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
            (se.preventDefault(), b && b(se));
      }),
      ee = ft((se) => {
        h &&
          se.key === ' ' &&
          V.current &&
          K &&
          !se.defaultPrevented &&
          ((Fe.current = !1),
          V.current.stop(se, () => {
            V.current.pulsate(se);
          })),
          k && k(se),
          b &&
            se.target === se.currentTarget &&
            Ge() &&
            se.key === ' ' &&
            !se.defaultPrevented &&
            b(se);
      });
    let te = c;
    te === 'button' && (ie.href || ie.to) && (te = v);
    const ye = {};
    te === 'button'
      ? ((ye.type = H === void 0 ? 'button' : H), (ye.disabled = d))
      : (!ie.href && !ie.to && (ye.role = 'button'), d && (ye['aria-disabled'] = d));
    const he = at(o, q, Q);
    process.env.NODE_ENV !== 'production' &&
      g.useEffect(() => {
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
    const Ee = {
        ...r,
        centerRipple: i,
        component: c,
        disabled: d,
        disableRipple: u,
        disableTouchRipple: p,
        focusRipple: h,
        tabIndex: j,
        focusVisible: K,
      },
      Pe = Nb(Ee);
    return Xe(Pb, {
      as: te,
      className: xe(Pe.root, l),
      ownerState: Ee,
      onBlur: je,
      onClick: b,
      onContextMenu: P,
      onFocus: Je,
      onKeyDown: Ze,
      onKeyUp: ee,
      onMouseDown: me,
      onMouseLeave: W,
      onMouseUp: J,
      onDragLeave: Ce,
      onTouchEnd: pe,
      onTouchMove: Re,
      onTouchStart: Te,
      ref: he,
      tabIndex: d ? -1 : j,
      type: H,
      ...ye,
      ...ie,
      children: [s, ce ? _(kb, { ref: S, center: i, ...M }) : null],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (oc.propTypes = {
    action: xt,
    centerRipple: n.bool,
    children: n.node,
    classes: n.object,
    className: n.string,
    component: ga,
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
const Hn = oc;
function Ib(e) {
  return Ie('MuiIconButton', e);
}
const Mb = Ne('MuiIconButton', [
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
  _b = Mb,
  Ab = (e) => {
    const { classes: t, disabled: o, color: r, edge: a, size: i } = e,
      s = {
        root: [
          'root',
          o && 'disabled',
          r !== 'default' && `color${oe(r)}`,
          a && `edge${oe(a)}`,
          `size${oe(i)}`,
        ],
      };
    return _e(s, Ib, t);
  },
  Db = de(Hn, {
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
      color: (e.vars || e).palette.action.active,
      transition: e.transitions.create('background-color', {
        duration: e.transitions.duration.shortest,
      }),
      ...(!t.disableRipple && {
        '&:hover': {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
            : Ye(e.palette.action.active, e.palette.action.hoverOpacity),
          '@media (hover: none)': { backgroundColor: 'transparent' },
        },
      }),
      ...(t.edge === 'start' && { marginLeft: t.size === 'small' ? -3 : -12 }),
      ...(t.edge === 'end' && { marginRight: t.size === 'small' ? -3 : -12 }),
    }),
    ({ theme: e, ownerState: t }) => {
      var o;
      const r = (o = (e.vars || e).palette) == null ? void 0 : o[t.color];
      return {
        ...(t.color === 'inherit' && { color: 'inherit' }),
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
                '@media (hover: none)': { backgroundColor: 'transparent' },
              },
            }),
          }),
        ...(t.size === 'small' && { padding: 5, fontSize: e.typography.pxToRem(18) }),
        ...(t.size === 'large' && { padding: 12, fontSize: e.typography.pxToRem(28) }),
        [`&.${_b.disabled}`]: {
          backgroundColor: 'transparent',
          color: (e.vars || e).palette.action.disabled,
        },
      };
    },
  ),
  rc = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiIconButton' }),
      {
        edge: a = !1,
        children: i,
        className: s,
        color: l = 'default',
        disabled: c = !1,
        disableFocusRipple: d = !1,
        size: u = 'medium',
        ...p
      } = r,
      h = { ...r, edge: a, color: l, disabled: c, disableFocusRipple: d, size: u },
      y = Ab(h);
    return _(Db, {
      className: xe(y.root, s),
      centerRipple: !0,
      focusRipple: !d,
      disabled: c,
      ref: o,
      ownerState: h,
      ...p,
      children: i,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (rc.propTypes = {
    children: Bt(n.node, (e) =>
      g.Children.toArray(e.children).some((o) => g.isValidElement(o) && o.props.onClick)
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
const ac = rc,
  Lb = Xn(
    _('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  ),
  jb = de(Ih, { name: 'MuiPopper', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  ic = g.forwardRef(function (t, o) {
    var r;
    const a = Nl(),
      i = Le({ props: t, name: 'MuiPopper' }),
      {
        anchorEl: s,
        component: l,
        components: c,
        componentsProps: d,
        container: u,
        disablePortal: p,
        keepMounted: h,
        modifiers: y,
        open: v,
        placement: m,
        popperOptions: b,
        popperRef: C,
        transition: T,
        slots: E,
        slotProps: x,
        ...f
      } = i,
      k = (r = E == null ? void 0 : E.root) != null ? r : c == null ? void 0 : c.Root,
      w = {
        anchorEl: s,
        container: u,
        disablePortal: p,
        keepMounted: h,
        modifiers: y,
        open: v,
        placement: m,
        popperOptions: b,
        popperRef: C,
        transition: T,
        ...f,
      };
    return _(jb, {
      as: l,
      direction: a == null ? void 0 : a.direction,
      slots: { root: k },
      slotProps: x ?? d,
      ...w,
      ref: o,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ic.propTypes = {
    anchorEl: n.oneOfType([en, n.object, n.func]),
    children: n.oneOfType([n.node, n.func]),
    component: n.elementType,
    components: n.shape({ Root: n.elementType }),
    componentsProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    container: n.oneOfType([en, n.func]),
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
    popperRef: xt,
    slotProps: n.shape({ root: n.oneOfType([n.func, n.object]) }),
    slots: n.shape({ root: n.elementType }),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    transition: n.bool,
  });
const sc = ic;
function Fb(e) {
  return Ie('MuiListSubheader', e);
}
Ne('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const zb = (e) => {
    const { classes: t, color: o, disableGutters: r, inset: a, disableSticky: i } = e,
      s = {
        root: [
          'root',
          o !== 'default' && `color${oe(o)}`,
          !r && 'gutters',
          a && 'inset',
          !i && 'sticky',
        ],
      };
    return _e(s, Fb, t);
  },
  Vb = de('li', {
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
    ...(t.color === 'primary' && { color: (e.vars || e).palette.primary.main }),
    ...(t.color === 'inherit' && { color: 'inherit' }),
    ...(!t.disableGutters && { paddingLeft: 16, paddingRight: 16 }),
    ...(t.inset && { paddingLeft: 72 }),
    ...(!t.disableSticky && {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: (e.vars || e).palette.background.paper,
    }),
  })),
  Ya = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiListSubheader' }),
      {
        className: a,
        color: i = 'default',
        component: s = 'li',
        disableGutters: l = !1,
        disableSticky: c = !1,
        inset: d = !1,
        ...u
      } = r,
      p = { ...r, color: i, component: s, disableGutters: l, disableSticky: c, inset: d },
      h = zb(p);
    return _(Vb, { as: s, className: xe(h.root, a), ref: o, ownerState: p, ...u });
  });
Ya.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (Ya.propTypes = {
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
const Bb = Ya,
  Ub = Xn(
    _('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function Wb(e) {
  return Ie('MuiChip', e);
}
const Hb = Ne('MuiChip', [
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
  Me = Hb,
  qb = (e) => {
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
      d = {
        root: [
          'root',
          c,
          o && 'disabled',
          `size${oe(r)}`,
          `color${oe(a)}`,
          l && 'clickable',
          l && `clickableColor${oe(a)}`,
          s && 'deletable',
          s && `deletableColor${oe(a)}`,
          `${c}${oe(a)}`,
        ],
        label: ['label', `label${oe(r)}`],
        avatar: ['avatar', `avatar${oe(r)}`, `avatarColor${oe(a)}`],
        icon: ['icon', `icon${oe(r)}`, `iconColor${oe(i)}`],
        deleteIcon: [
          'deleteIcon',
          `deleteIcon${oe(r)}`,
          `deleteIconColor${oe(a)}`,
          `deleteIcon${oe(c)}Color${oe(a)}`,
        ],
      };
    return _e(d, Wb, t);
  },
  Yb = de('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: a, clickable: i, onDelete: s, size: l, variant: c } = o;
      return [
        { [`& .${Me.avatar}`]: t.avatar },
        { [`& .${Me.avatar}`]: t[`avatar${oe(l)}`] },
        { [`& .${Me.avatar}`]: t[`avatarColor${oe(r)}`] },
        { [`& .${Me.icon}`]: t.icon },
        { [`& .${Me.icon}`]: t[`icon${oe(l)}`] },
        { [`& .${Me.icon}`]: t[`iconColor${oe(a)}`] },
        { [`& .${Me.deleteIcon}`]: t.deleteIcon },
        { [`& .${Me.deleteIcon}`]: t[`deleteIcon${oe(l)}`] },
        { [`& .${Me.deleteIcon}`]: t[`deleteIconColor${oe(r)}`] },
        { [`& .${Me.deleteIcon}`]: t[`deleteIcon${oe(c)}Color${oe(r)}`] },
        t.root,
        t[`size${oe(l)}`],
        t[`color${oe(r)}`],
        i && t.clickable,
        i && r !== 'default' && t[`clickableColor${oe(r)})`],
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
        cursor: 'default',
        outline: 0,
        textDecoration: 'none',
        border: 0,
        padding: 0,
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
          ...(t.size === 'small' && { fontSize: 18, marginLeft: 4, marginRight: -4 }),
          ...(t.iconColor === t.color && {
            color: e.vars ? e.vars.palette.Chip.defaultIconColor : o,
            ...(t.color !== 'default' && { color: 'inherit' }),
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
          ...(t.size === 'small' && { fontSize: 16, marginRight: 4, marginLeft: -4 }),
          ...(t.color !== 'default' && {
            color: e.vars
              ? `rgba(${e.vars.palette[t.color].contrastTextChannel} / 0.7)`
              : Ye(e.palette[t.color].contrastText, 0.7),
            '&:hover, &:active': { color: (e.vars || e).palette[t.color].contrastText },
          }),
        },
        ...(t.size === 'small' && { height: 24 }),
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
            [`&.${Me.focusVisible}`]: { backgroundColor: (e.vars || e).palette[t.color].dark },
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
        '&:active': { boxShadow: (e.vars || e).shadows[1] },
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
        [`&.${Me.clickable}:hover`]: { backgroundColor: (e.vars || e).palette.action.hover },
        [`&.${Me.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
        [`& .${Me.avatar}`]: { marginLeft: 4 },
        [`& .${Me.avatarSmall}`]: { marginLeft: 2 },
        [`& .${Me.icon}`]: { marginLeft: 4 },
        [`& .${Me.iconSmall}`]: { marginLeft: 2 },
        [`& .${Me.deleteIcon}`]: { marginRight: 5 },
        [`& .${Me.deleteIconSmall}`]: { marginRight: 3 },
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
            '&:hover, &:active': { color: (e.vars || e).palette[t.color].main },
          },
        }),
    }),
  ),
  Kb = de('span', {
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
    ...(e.size === 'small' && { paddingLeft: 8, paddingRight: 8 }),
  }));
function Ss(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const lc = g.forwardRef(function (t, o) {
  const r = Le({ props: t, name: 'MuiChip' }),
    {
      avatar: a,
      className: i,
      clickable: s,
      color: l = 'default',
      component: c,
      deleteIcon: d,
      disabled: u = !1,
      icon: p,
      label: h,
      onClick: y,
      onDelete: v,
      onKeyDown: m,
      onKeyUp: b,
      size: C = 'medium',
      variant: T = 'filled',
      tabIndex: E,
      skipFocusWhenDisabled: x = !1,
      ...f
    } = r,
    k = g.useRef(null),
    w = at(k, o),
    D = (V) => {
      V.stopPropagation(), v && v(V);
    },
    z = (V) => {
      V.currentTarget === V.target && Ss(V) && V.preventDefault(), m && m(V);
    },
    N = (V) => {
      V.currentTarget === V.target &&
        (v && Ss(V) ? v(V) : V.key === 'Escape' && k.current && k.current.blur()),
        b && b(V);
    },
    I = s !== !1 && y ? !0 : s,
    G = I || v ? Hn : c || 'div',
    j = {
      ...r,
      component: G,
      disabled: u,
      size: C,
      color: l,
      iconColor: (g.isValidElement(p) && p.props.color) || l,
      onDelete: !!v,
      clickable: I,
      variant: T,
    },
    M = qb(j),
    A =
      G === Hn
        ? {
            component: c || 'div',
            focusVisibleClassName: M.focusVisible,
            ...(v && { disableRipple: !0 }),
          }
        : {};
  let H = null;
  v &&
    (H =
      d && g.isValidElement(d)
        ? g.cloneElement(d, { className: xe(d.props.className, M.deleteIcon), onClick: D })
        : _(Ub, { className: xe(M.deleteIcon), onClick: D }));
  let ie = null;
  a &&
    g.isValidElement(a) &&
    (ie = g.cloneElement(a, { className: xe(M.avatar, a.props.className) }));
  let Q = null;
  return (
    p &&
      g.isValidElement(p) &&
      (Q = g.cloneElement(p, { className: xe(M.icon, p.props.className) })),
    process.env.NODE_ENV !== 'production' &&
      ie &&
      Q &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    Xe(Yb, {
      as: G,
      className: xe(M.root, i),
      disabled: I && u ? !0 : void 0,
      onClick: y,
      onKeyDown: z,
      onKeyUp: N,
      ref: w,
      tabIndex: x && u ? -1 : E,
      ownerState: j,
      ...A,
      ...f,
      children: [ie || Q, _(Kb, { className: xe(M.label), ownerState: j, children: h }), H],
    })
  );
});
process.env.NODE_ENV !== 'production' &&
  (lc.propTypes = {
    avatar: n.element,
    children: Uu,
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
const Gb = lc;
function Jn({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, a) => ((r[a] = e[a]), o && typeof e[a] > 'u' && (r[a] = o[a]), r), {});
}
const cc = g.createContext(void 0);
process.env.NODE_ENV !== 'production' && (cc.displayName = 'FormControlContext');
const Ka = cc;
function Rn() {
  return g.useContext(Ka);
}
function uc(e) {
  return _(Pl, { ...e, defaultTheme: wr, themeId: sr });
}
process.env.NODE_ENV !== 'production' &&
  (uc.propTypes = { styles: n.oneOfType([n.array, n.func, n.number, n.object, n.string, n.bool]) });
function Rs(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function rr(e, t = !1) {
  return (
    e && ((Rs(e.value) && e.value !== '') || (t && Rs(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Xb(e) {
  return e.startAdornment;
}
function Jb(e) {
  return Ie('MuiInputBase', e);
}
const Zb = Ne('MuiInputBase', [
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
  kt = Zb,
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
  Qb = (e) => {
    const {
        classes: t,
        color: o,
        disabled: r,
        error: a,
        endAdornment: i,
        focused: s,
        formControl: l,
        fullWidth: c,
        hiddenLabel: d,
        multiline: u,
        readOnly: p,
        size: h,
        startAdornment: y,
        type: v,
      } = e,
      m = {
        root: [
          'root',
          `color${oe(o)}`,
          r && 'disabled',
          a && 'error',
          c && 'fullWidth',
          s && 'focused',
          l && 'formControl',
          h === 'small' && 'sizeSmall',
          u && 'multiline',
          y && 'adornedStart',
          i && 'adornedEnd',
          d && 'hiddenLabel',
          p && 'readOnly',
        ],
        input: [
          'input',
          r && 'disabled',
          v === 'search' && 'inputTypeSearch',
          u && 'inputMultiline',
          h === 'small' && 'inputSizeSmall',
          d && 'inputHiddenLabel',
          y && 'inputAdornedStart',
          i && 'inputAdornedEnd',
          p && 'readOnly',
        ],
      };
    return _e(m, Jb, t);
  },
  Ir = de('div', { name: 'MuiInputBase', slot: 'Root', overridesResolver: Nr })(
    ({ theme: e, ownerState: t }) => ({
      ...e.typography.body1,
      color: (e.vars || e).palette.text.primary,
      lineHeight: '1.4375em',
      boxSizing: 'border-box',
      position: 'relative',
      cursor: 'text',
      display: 'inline-flex',
      alignItems: 'center',
      [`&.${kt.disabled}`]: { color: (e.vars || e).palette.text.disabled, cursor: 'default' },
      ...(t.multiline && { padding: '4px 0 5px', ...(t.size === 'small' && { paddingTop: 1 }) }),
      ...(t.fullWidth && { width: '100%' }),
    }),
  ),
  Mr = de('input', { name: 'MuiInputBase', slot: 'Input', overridesResolver: Pr })(
    ({ theme: e, ownerState: t }) => {
      const o = e.palette.mode === 'light',
        r = {
          color: 'currentColor',
          ...(e.vars ? { opacity: e.vars.opacity.inputPlaceholder } : { opacity: o ? 0.42 : 0.5 }),
          transition: e.transitions.create('opacity', { duration: e.transitions.duration.shorter }),
        },
        a = { opacity: '0 !important' },
        i = e.vars ? { opacity: e.vars.opacity.inputPlaceholder } : { opacity: o ? 0.42 : 0.5 };
      return {
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
        [`label[data-shrink=false] + .${kt.formControl} &`]: {
          '&::-webkit-input-placeholder': a,
          '&::-moz-placeholder': a,
          '&:-ms-input-placeholder': a,
          '&::-ms-input-placeholder': a,
          '&:focus::-webkit-input-placeholder': i,
          '&:focus::-moz-placeholder': i,
          '&:focus:-ms-input-placeholder': i,
          '&:focus::-ms-input-placeholder': i,
        },
        [`&.${kt.disabled}`]: {
          opacity: 1,
          WebkitTextFillColor: (e.vars || e).palette.text.disabled,
        },
        '&:-webkit-autofill': { animationDuration: '5000s', animationName: 'mui-auto-fill' },
        ...(t.size === 'small' && { paddingTop: 1 }),
        ...(t.multiline && { height: 'auto', resize: 'none', padding: 0, paddingTop: 0 }),
        ...(t.type === 'search' && { MozAppearance: 'textfield' }),
      };
    },
  ),
  eg = _(uc, {
    styles: {
      '@keyframes mui-auto-fill': { from: { display: 'block' } },
      '@keyframes mui-auto-fill-cancel': { from: { display: 'block' } },
    },
  }),
  dc = g.forwardRef(function (t, o) {
    var r;
    const a = Le({ props: t, name: 'MuiInputBase' }),
      {
        'aria-describedby': i,
        autoComplete: s,
        autoFocus: l,
        className: c,
        color: d,
        components: u = {},
        componentsProps: p = {},
        defaultValue: h,
        disabled: y,
        disableInjectingGlobalStyles: v,
        endAdornment: m,
        error: b,
        fullWidth: C = !1,
        id: T,
        inputComponent: E = 'input',
        inputProps: x = {},
        inputRef: f,
        margin: k,
        maxRows: w,
        minRows: D,
        multiline: z = !1,
        name: N,
        onBlur: I,
        onChange: G,
        onClick: j,
        onFocus: M,
        onKeyDown: A,
        onKeyUp: H,
        placeholder: ie,
        readOnly: Q,
        renderSuffix: V,
        rows: S,
        size: L,
        slotProps: X = {},
        slots: B = {},
        startAdornment: q,
        type: K = 'text',
        value: re,
        ...Z
      } = a,
      ae = x.value != null ? x.value : re,
      { current: ce } = g.useRef(ae != null),
      ue = g.useRef(),
      me = g.useCallback((U) => {
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
      P = at(ue, f, x.ref, me),
      [Ce, J] = g.useState(!1),
      W = Rn();
    process.env.NODE_ENV !== 'production' &&
      g.useEffect(() => {
        if (W) return W.registerEffect();
      }, [W]);
    const Te = Jn({
      props: a,
      muiFormControl: W,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (Te.focused = W ? W.focused : Ce),
      g.useEffect(() => {
        !W && y && Ce && (J(!1), I && I());
      }, [W, y, Ce, I]);
    const pe = W && W.onFilled,
      Re = W && W.onEmpty,
      je = g.useCallback(
        (U) => {
          rr(U) ? pe && pe() : Re && Re();
        },
        [pe, Re],
      );
    tn(() => {
      ce && je({ value: ae });
    }, [ae, je, ce]);
    const Je = (U) => {
        if (Te.disabled) {
          U.stopPropagation();
          return;
        }
        M && M(U), x.onFocus && x.onFocus(U), W && W.onFocus ? W.onFocus(U) : J(!0);
      },
      Ge = (U) => {
        I && I(U), x.onBlur && x.onBlur(U), W && W.onBlur ? W.onBlur(U) : J(!1);
      },
      Fe = (U, ...ve) => {
        if (!ce) {
          const we = U.target || ue.current;
          if (we == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : pn(1),
            );
          je({ value: we.value });
        }
        x.onChange && x.onChange(U, ...ve), G && G(U, ...ve);
      };
    g.useEffect(() => {
      je(ue.current);
    }, []);
    const Ze = (U) => {
      ue.current && U.currentTarget === U.target && ue.current.focus(), j && !Te.disabled && j(U);
    };
    let ee = E,
      te = x;
    z &&
      ee === 'input' &&
      (S
        ? (process.env.NODE_ENV !== 'production' &&
            (D || w) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (te = { type: void 0, minRows: S, maxRows: S, ...te }))
        : (te = { type: void 0, maxRows: w, minRows: D, ...te }),
      (ee = Qh));
    const ye = (U) => {
      je(U.animationName === 'mui-auto-fill-cancel' ? ue.current : { value: 'x' });
    };
    g.useEffect(() => {
      W && W.setAdornedStart(!!q);
    }, [W, q]);
    const he = {
        ...a,
        color: Te.color || 'primary',
        disabled: Te.disabled,
        endAdornment: m,
        error: Te.error,
        focused: Te.focused,
        formControl: W,
        fullWidth: C,
        hiddenLabel: Te.hiddenLabel,
        multiline: z,
        size: Te.size,
        startAdornment: q,
        type: K,
      },
      Ee = Qb(he),
      Pe = B.root || u.Root || Ir,
      se = X.root || p.root || {},
      Se = B.input || u.Input || Mr;
    return (
      (te = { ...te, ...((r = X.input) != null ? r : p.input) }),
      Xe(g.Fragment, {
        children: [
          !v && eg,
          Xe(Pe, {
            ...se,
            ...(!dn(Pe) && { ownerState: { ...he, ...se.ownerState } }),
            ref: o,
            onClick: Ze,
            ...Z,
            className: xe(Ee.root, se.className, c, Q && 'MuiInputBase-readOnly'),
            children: [
              q,
              _(Ka.Provider, {
                value: null,
                children: _(Se, {
                  ownerState: he,
                  'aria-invalid': Te.error,
                  'aria-describedby': i,
                  autoComplete: s,
                  autoFocus: l,
                  defaultValue: h,
                  disabled: Te.disabled,
                  id: T,
                  onAnimationStart: ye,
                  name: N,
                  placeholder: ie,
                  readOnly: Q,
                  required: Te.required,
                  rows: S,
                  value: ae,
                  onKeyDown: A,
                  onKeyUp: H,
                  type: K,
                  ...te,
                  ...(!dn(Se) && { as: ee, ownerState: { ...he, ...te.ownerState } }),
                  ref: P,
                  className: xe(Ee.input, te.className, Q && 'MuiInputBase-readOnly'),
                  onBlur: Ge,
                  onChange: Fe,
                  onFocus: Je,
                }),
              }),
              m,
              V ? V({ ...Te, startAdornment: q }) : null,
            ],
          }),
        ],
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (dc.propTypes = {
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
    inputComponent: ga,
    inputProps: n.object,
    inputRef: xt,
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
const Ga = dc;
function tg(e) {
  return Ie('MuiInput', e);
}
const ng = { ...kt, ...Ne('MuiInput', ['root', 'underline', 'input']) },
  un = ng;
function og(e) {
  return Ie('MuiOutlinedInput', e);
}
const rg = { ...kt, ...Ne('MuiOutlinedInput', ['root', 'notchedOutline', 'input']) },
  Xt = rg;
function ag(e) {
  return Ie('MuiFilledInput', e);
}
const ig = { ...kt, ...Ne('MuiFilledInput', ['root', 'underline', 'input']) },
  St = ig,
  pc = Xn(_('path', { d: 'M7 10l5 5 5-5z' }), 'ArrowDropDown');
function sg(e) {
  return Ie('MuiAutocomplete', e);
}
const lg = Ne('MuiAutocomplete', [
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
  $e = lg;
var $s, Ns;
const cg = (e) => {
    const {
        classes: t,
        disablePortal: o,
        expanded: r,
        focused: a,
        fullWidth: i,
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
          a && 'focused',
          i && 'fullWidth',
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
    return _e(p, sg, t);
  },
  ug = de('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: a, hasPopupIcon: i, inputFocused: s, size: l } = o;
      return [
        { [`& .${$e.tag}`]: t.tag },
        { [`& .${$e.tag}`]: t[`tagSize${oe(l)}`] },
        { [`& .${$e.inputRoot}`]: t.inputRoot },
        { [`& .${$e.input}`]: t.input },
        { [`& .${$e.input}`]: s && t.inputFocused },
        t.root,
        r && t.fullWidth,
        i && t.hasPopupIcon,
        a && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) => ({
    [`&.${$e.focused} .${$e.clearIndicator}`]: { visibility: 'visible' },
    '@media (pointer: fine)': { [`&:hover .${$e.clearIndicator}`]: { visibility: 'visible' } },
    ...(e.fullWidth && { width: '100%' }),
    [`& .${$e.tag}`]: {
      margin: 3,
      maxWidth: 'calc(100% - 6px)',
      ...(e.size === 'small' && { margin: 2, maxWidth: 'calc(100% - 4px)' }),
    },
    [`& .${$e.inputRoot}`]: {
      flexWrap: 'wrap',
      [`.${$e.hasPopupIcon}&, .${$e.hasClearIcon}&`]: { paddingRight: 26 + 4 },
      [`.${$e.hasPopupIcon}.${$e.hasClearIcon}&`]: { paddingRight: 52 + 4 },
      [`& .${$e.input}`]: { width: 0, minWidth: 30 },
    },
    [`& .${un.root}`]: { paddingBottom: 1, '& .MuiInput-input': { padding: '4px 4px 4px 0px' } },
    [`& .${un.root}.${kt.sizeSmall}`]: { [`& .${un.input}`]: { padding: '2px 4px 3px 0' } },
    [`& .${Xt.root}`]: {
      padding: 9,
      [`.${$e.hasPopupIcon}&, .${$e.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
      [`.${$e.hasPopupIcon}.${$e.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
      [`& .${$e.input}`]: { padding: '7.5px 4px 7.5px 5px' },
      [`& .${$e.endAdornment}`]: { right: 9 },
    },
    [`& .${Xt.root}.${kt.sizeSmall}`]: {
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 6,
      [`& .${$e.input}`]: { padding: '2.5px 4px 2.5px 8px' },
    },
    [`& .${St.root}`]: {
      paddingTop: 19,
      paddingLeft: 8,
      [`.${$e.hasPopupIcon}&, .${$e.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
      [`.${$e.hasPopupIcon}.${$e.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
      [`& .${St.input}`]: { padding: '7px 4px' },
      [`& .${$e.endAdornment}`]: { right: 9 },
    },
    [`& .${St.root}.${kt.sizeSmall}`]: {
      paddingBottom: 1,
      [`& .${St.input}`]: { padding: '2.5px 4px' },
    },
    [`& .${kt.hiddenLabel}`]: { paddingTop: 8 },
    [`& .${St.root}.${kt.hiddenLabel}`]: {
      paddingTop: 0,
      paddingBottom: 0,
      [`& .${$e.input}`]: { paddingTop: 16, paddingBottom: 17 },
    },
    [`& .${St.root}.${kt.hiddenLabel}.${kt.sizeSmall}`]: {
      [`& .${$e.input}`]: { paddingTop: 8, paddingBottom: 9 },
    },
    [`& .${$e.input}`]: {
      flexGrow: 1,
      textOverflow: 'ellipsis',
      opacity: 0,
      ...(e.inputFocused && { opacity: 1 }),
    },
  })),
  dg = de('div', {
    name: 'MuiAutocomplete',
    slot: 'EndAdornment',
    overridesResolver: (e, t) => t.endAdornment,
  })({ position: 'absolute', right: 0, top: 'calc(50% - 14px)' }),
  pg = de(ac, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({ marginRight: -2, padding: 4, visibility: 'hidden' }),
  fg = de(ac, {
    name: 'MuiAutocomplete',
    slot: 'PopupIndicator',
    overridesResolver: ({ ownerState: e }, t) => ({
      ...t.popupIndicator,
      ...(e.popupOpen && t.popupIndicatorOpen),
    }),
  })(({ ownerState: e }) => ({
    padding: 2,
    marginRight: -2,
    ...(e.popupOpen && { transform: 'rotate(180deg)' }),
  })),
  mg = de(sc, {
    name: 'MuiAutocomplete',
    slot: 'Popper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`& .${$e.option}`]: t.option },
        t.popper,
        o.disablePortal && t.popperDisablePortal,
      ];
    },
  })(({ theme: e, ownerState: t }) => ({
    zIndex: (e.vars || e).zIndex.modal,
    ...(t.disablePortal && { position: 'absolute' }),
  })),
  hg = de(No, { name: 'MuiAutocomplete', slot: 'Paper', overridesResolver: (e, t) => t.paper })(
    ({ theme: e }) => ({ ...e.typography.body1, overflow: 'auto' }),
  ),
  bg = de('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: '14px 16px' })),
  gg = de('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: '14px 16px' })),
  vg = de('div', {
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
      [e.breakpoints.up('sm')]: { minHeight: 'auto' },
      [`&.${$e.focused}`]: {
        backgroundColor: (e.vars || e).palette.action.hover,
        '@media (hover: none)': { backgroundColor: 'transparent' },
      },
      '&[aria-disabled="true"]': {
        opacity: (e.vars || e).palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`&.${$e.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : Ye(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${$e.focused}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : Ye(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          '@media (hover: none)': { backgroundColor: (e.vars || e).palette.action.selected },
        },
        [`&.${$e.focusVisible}`]: {
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
  yg = de(Bb, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({ backgroundColor: (e.vars || e).palette.background.paper, top: -8 })),
  xg = de('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({ padding: 0, [`& .${$e.option}`]: { paddingLeft: 24 } }),
  fc = g.forwardRef(function (t, o) {
    var r, a, i, s;
    const l = Le({ props: t, name: 'MuiAutocomplete' }),
      {
        autoComplete: c = !1,
        autoHighlight: d = !1,
        autoSelect: u = !1,
        blurOnSelect: p = !1,
        ChipProps: h,
        className: y,
        clearIcon: v = $s || ($s = _(Lb, { fontSize: 'small' })),
        clearOnBlur: m = !l.freeSolo,
        clearOnEscape: b = !1,
        clearText: C = 'Clear',
        closeText: T = 'Close',
        componentsProps: E = {},
        defaultValue: x = l.multiple ? [] : null,
        disableClearable: f = !1,
        disableCloseOnSelect: k = !1,
        disabled: w = !1,
        disabledItemsFocusable: D = !1,
        disableListWrap: z = !1,
        disablePortal: N = !1,
        filterOptions: I,
        filterSelectedOptions: G = !1,
        forcePopupIcon: j = 'auto',
        freeSolo: M = !1,
        fullWidth: A = !1,
        getLimitTagsText: H = (Oe) => `+${Oe}`,
        getOptionDisabled: ie,
        getOptionLabel: Q = (Oe) => {
          var ze;
          return (ze = Oe.label) != null ? ze : Oe;
        },
        isOptionEqualToValue: V,
        groupBy: S,
        handleHomeEndKeys: L = !l.freeSolo,
        id: X,
        includeInputInList: B = !1,
        inputValue: q,
        limitTags: K = -1,
        ListboxComponent: re = 'ul',
        ListboxProps: Z,
        loading: ae = !1,
        loadingText: ce = 'Loading…',
        multiple: ue = !1,
        noOptionsText: me = 'No options',
        onChange: P,
        onClose: Ce,
        onHighlightChange: J,
        onInputChange: W,
        onOpen: Te,
        open: pe,
        openOnFocus: Re = !1,
        openText: je = 'Open',
        options: Je,
        PaperComponent: Ge = No,
        PopperComponent: Fe = sc,
        popupIcon: Ze = Ns || (Ns = _(pc, {})),
        readOnly: ee = !1,
        renderGroup: te,
        renderInput: ye,
        renderOption: he,
        renderTags: Ee,
        selectOnFocus: Pe = !l.freeSolo,
        size: se = 'medium',
        slotProps: Se = {},
        value: U,
        ...ve
      } = l,
      {
        getRootProps: we,
        getInputProps: mt,
        getInputLabelProps: bt,
        getPopupIndicatorProps: lt,
        getClearProps: Et,
        getTagProps: Ot,
        getListboxProps: Qe,
        getOptionProps: ct,
        value: dt,
        dirty: Ht,
        expanded: qt,
        id: on,
        popupOpen: Ct,
        focused: Yt,
        focusedTag: Kt,
        anchorEl: Tt,
        setAnchorEl: hn,
        inputValue: rn,
        groupedOptions: wt,
      } = ob({ ...l, componentName: 'Autocomplete' }),
      Lt = !f && !w && Ht && !ee,
      Gt = (!M || j === !0) && j !== !1,
      { onMouseDown: bn } = mt(),
      st = {
        ...l,
        disablePortal: N,
        expanded: qt,
        focused: Yt,
        fullWidth: A,
        hasClearIcon: Lt,
        hasPopupIcon: Gt,
        inputFocused: Kt === -1,
        popupOpen: Ct,
        size: se,
      },
      O = cg(st);
    let F;
    if (ue && dt.length > 0) {
      const Oe = (ze) => ({ className: O.tag, disabled: w, ...Ot(ze) });
      Ee
        ? (F = Ee(dt, Oe, st))
        : (F = dt.map((ze, an) => _(Gb, { label: Q(ze), size: se, ...Oe({ index: an }), ...h })));
    }
    if (K > -1 && Array.isArray(F)) {
      const Oe = F.length - K;
      !Yt &&
        Oe > 0 &&
        ((F = F.splice(0, K)), F.push(_('span', { className: O.tag, children: H(Oe) }, F.length)));
    }
    const R =
        te ||
        ((Oe) =>
          Xe(
            'li',
            {
              children: [
                _(yg, {
                  className: O.groupLabel,
                  ownerState: st,
                  component: 'div',
                  children: Oe.group,
                }),
                _(xg, { className: O.groupUl, ownerState: st, children: Oe.children }),
              ],
            },
            Oe.key,
          )),
      Y = he || ((Oe, ze) => _('li', { ...Oe, children: Q(ze) })),
      ne = (Oe, ze) => {
        const an = ct({ option: Oe, index: ze });
        return Y({ ...an, className: O.option }, Oe, {
          selected: an['aria-selected'],
          index: ze,
          inputValue: rn,
        });
      },
      fe = (r = Se.clearIndicator) != null ? r : E.clearIndicator,
      be = (a = Se.paper) != null ? a : E.paper,
      ge = (i = Se.popper) != null ? i : E.popper,
      ke = (s = Se.popupIndicator) != null ? s : E.popupIndicator;
    return Xe(g.Fragment, {
      children: [
        _(ug, {
          ref: o,
          className: xe(O.root, y),
          ownerState: st,
          ...we(ve),
          children: ye({
            id: on,
            disabled: w,
            fullWidth: !0,
            size: se === 'small' ? 'small' : void 0,
            InputLabelProps: bt(),
            InputProps: {
              ref: hn,
              className: O.inputRoot,
              startAdornment: F,
              onClick: (Oe) => {
                Oe.target === Oe.currentTarget && bn(Oe);
              },
              ...((Lt || Gt) && {
                endAdornment: Xe(dg, {
                  className: O.endAdornment,
                  ownerState: st,
                  children: [
                    Lt
                      ? _(pg, {
                          ...Et(),
                          'aria-label': C,
                          title: C,
                          ownerState: st,
                          ...fe,
                          className: xe(O.clearIndicator, fe == null ? void 0 : fe.className),
                          children: v,
                        })
                      : null,
                    Gt
                      ? _(fg, {
                          ...lt(),
                          disabled: w,
                          'aria-label': Ct ? T : je,
                          title: Ct ? T : je,
                          ownerState: st,
                          ...ke,
                          className: xe(O.popupIndicator, ke == null ? void 0 : ke.className),
                          children: Ze,
                        })
                      : null,
                  ],
                }),
              }),
            },
            inputProps: { className: O.input, disabled: w, readOnly: ee, ...mt() },
          }),
        }),
        Tt
          ? _(mg, {
              as: Fe,
              disablePortal: N,
              style: { width: Tt ? Tt.clientWidth : null },
              ownerState: st,
              role: 'presentation',
              anchorEl: Tt,
              open: Ct,
              ...ge,
              className: xe(O.popper, ge == null ? void 0 : ge.className),
              children: Xe(hg, {
                ownerState: st,
                as: Ge,
                ...be,
                className: xe(O.paper, be == null ? void 0 : be.className),
                children: [
                  ae && wt.length === 0
                    ? _(bg, { className: O.loading, ownerState: st, children: ce })
                    : null,
                  wt.length === 0 && !M && !ae
                    ? _(gg, {
                        className: O.noOptions,
                        ownerState: st,
                        role: 'presentation',
                        onMouseDown: (Oe) => {
                          Oe.preventDefault();
                        },
                        children: me,
                      })
                    : null,
                  wt.length > 0
                    ? _(vg, {
                        as: re,
                        className: O.listbox,
                        ownerState: st,
                        ...Qe(),
                        ...Z,
                        children: wt.map((Oe, ze) =>
                          S
                            ? R({
                                key: Oe.key,
                                group: Oe.group,
                                children: Oe.options.map((an, jt) => ne(an, Oe.index + jt)),
                              })
                            : ne(Oe, ze),
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
  (fc.propTypes = {
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
    limitTags: ya,
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
const Eg = fc,
  Og = { entering: { opacity: 1 }, entered: { opacity: 1 } },
  mc = g.forwardRef(function (t, o) {
    const r = Gn(),
      a = {
        enter: r.transitions.duration.enteringScreen,
        exit: r.transitions.duration.leavingScreen,
      },
      {
        addEndListener: i,
        appear: s = !0,
        children: l,
        easing: c,
        in: d,
        onEnter: u,
        onEntered: p,
        onEntering: h,
        onExit: y,
        onExited: v,
        onExiting: m,
        style: b,
        timeout: C = a,
        TransitionComponent: T = Zl,
        ...E
      } = t,
      x = g.useRef(null),
      f = at(x, l.ref, o),
      k = (M) => (A) => {
        if (M) {
          const H = x.current;
          A === void 0 ? M(H) : M(H, A);
        }
      },
      w = k(h),
      D = k((M, A) => {
        Ql(M);
        const H = or({ style: b, timeout: C, easing: c }, { mode: 'enter' });
        (M.style.webkitTransition = r.transitions.create('opacity', H)),
          (M.style.transition = r.transitions.create('opacity', H)),
          u && u(M, A);
      }),
      z = k(p),
      N = k(m),
      I = k((M) => {
        const A = or({ style: b, timeout: C, easing: c }, { mode: 'exit' });
        (M.style.webkitTransition = r.transitions.create('opacity', A)),
          (M.style.transition = r.transitions.create('opacity', A)),
          y && y(M);
      }),
      G = k(v);
    return _(T, {
      appear: s,
      in: d,
      nodeRef: x,
      onEnter: D,
      onEntered: z,
      onEntering: w,
      onExit: I,
      onExited: G,
      onExiting: N,
      addEndListener: (M) => {
        i && i(x.current, M);
      },
      timeout: C,
      ...E,
      children: (M, A) =>
        g.cloneElement(l, {
          style: {
            opacity: 0,
            visibility: M === 'exited' && !d ? 'hidden' : void 0,
            ...Og[M],
            ...b,
            ...l.props.style,
          },
          ref: f,
          ...A,
        }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (mc.propTypes = {
    addEndListener: n.func,
    appear: n.bool,
    children: qn.isRequired,
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
const Cg = mc;
function Tg(e) {
  return Ie('MuiBackdrop', e);
}
Ne('MuiBackdrop', ['root', 'invisible']);
const wg = (e) => {
    const { classes: t, invisible: o } = e;
    return _e({ root: ['root', o && 'invisible'] }, Tg, t);
  },
  kg = de('div', {
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
    ...(e.invisible && { backgroundColor: 'transparent' }),
  })),
  hc = g.forwardRef(function (t, o) {
    var r, a, i;
    const s = Le({ props: t, name: 'MuiBackdrop' }),
      {
        children: l,
        className: c,
        component: d = 'div',
        components: u = {},
        componentsProps: p = {},
        invisible: h = !1,
        open: y,
        slotProps: v = {},
        slots: m = {},
        TransitionComponent: b = Cg,
        transitionDuration: C,
        ...T
      } = s,
      E = { ...s, component: d, invisible: h },
      x = wg(E),
      f = (r = v.root) != null ? r : p.root;
    return _(b, {
      in: y,
      timeout: C,
      ...T,
      children: _(kg, {
        'aria-hidden': !0,
        ...f,
        as: (a = (i = m.root) != null ? i : u.Root) != null ? a : d,
        className: xe(x.root, c, f == null ? void 0 : f.className),
        ownerState: { ...E, ...(f == null ? void 0 : f.ownerState) },
        classes: x,
        ref: o,
        children: l,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (hc.propTypes = {
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
const Sg = hc;
function Rg(e) {
  return Ie('MuiButton', e);
}
const $g = Ne('MuiButton', [
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
  Fo = $g,
  bc = g.createContext({});
process.env.NODE_ENV !== 'production' && (bc.displayName = 'ButtonGroupContext');
const Ng = bc,
  Pg = (e) => {
    const { color: t, disableElevation: o, fullWidth: r, size: a, variant: i, classes: s } = e,
      l = {
        root: [
          'root',
          i,
          `${i}${oe(t)}`,
          `size${oe(a)}`,
          `${i}Size${oe(a)}`,
          t === 'inherit' && 'colorInherit',
          o && 'disableElevation',
          r && 'fullWidth',
        ],
        label: ['label'],
        startIcon: ['startIcon', `iconSize${oe(a)}`],
        endIcon: ['endIcon', `iconSize${oe(a)}`],
      },
      c = _e(l, Rg, s);
    return { ...s, ...c };
  },
  gc = (e) => ({
    ...(e.size === 'small' && { '& > *:nth-of-type(1)': { fontSize: 18 } }),
    ...(e.size === 'medium' && { '& > *:nth-of-type(1)': { fontSize: 20 } }),
    ...(e.size === 'large' && { '& > *:nth-of-type(1)': { fontSize: 22 } }),
  }),
  Ig = de(Hn, {
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
      const a = e.palette.mode === 'light' ? e.palette.grey[300] : e.palette.grey[800],
        i = e.palette.mode === 'light' ? e.palette.grey.A100 : e.palette.grey[700];
      return {
        ...e.typography.button,
        minWidth: 64,
        padding: '6px 16px',
        borderRadius: (e.vars || e).shape.borderRadius,
        transition: e.transitions.create(
          ['background-color', 'box-shadow', 'border-color', 'color'],
          { duration: e.transitions.duration.short },
        ),
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
            : Ye(e.palette.text.primary, e.palette.action.hoverOpacity),
          '@media (hover: none)': { backgroundColor: 'transparent' },
          ...(t.variant === 'text' &&
            t.color !== 'inherit' && {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : Ye(e.palette[t.color].main, e.palette.action.hoverOpacity),
              '@media (hover: none)': { backgroundColor: 'transparent' },
            }),
          ...(t.variant === 'outlined' &&
            t.color !== 'inherit' && {
              border: `1px solid ${(e.vars || e).palette[t.color].main}`,
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : Ye(e.palette[t.color].main, e.palette.action.hoverOpacity),
              '@media (hover: none)': { backgroundColor: 'transparent' },
            }),
          ...(t.variant === 'contained' && {
            backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedHoverBg : i,
            boxShadow: (e.vars || e).shadows[4],
            '@media (hover: none)': {
              boxShadow: (e.vars || e).shadows[2],
              backgroundColor: (e.vars || e).palette.grey[300],
            },
          }),
          ...(t.variant === 'contained' &&
            t.color !== 'inherit' && {
              backgroundColor: (e.vars || e).palette[t.color].dark,
              '@media (hover: none)': { backgroundColor: (e.vars || e).palette[t.color].main },
            }),
        },
        '&:active': { ...(t.variant === 'contained' && { boxShadow: (e.vars || e).shadows[8] }) },
        [`&.${Fo.focusVisible}`]: {
          ...(t.variant === 'contained' && { boxShadow: (e.vars || e).shadows[6] }),
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
        ...(t.variant === 'text' && { padding: '6px 8px' }),
        ...(t.variant === 'text' &&
          t.color !== 'inherit' && { color: (e.vars || e).palette[t.color].main }),
        ...(t.variant === 'outlined' && { padding: '5px 15px', border: '1px solid currentColor' }),
        ...(t.variant === 'outlined' &&
          t.color !== 'inherit' && {
            color: (e.vars || e).palette[t.color].main,
            border: e.vars
              ? `1px solid rgba(${e.vars.palette[t.color].mainChannel} / 0.5)`
              : `1px solid ${Ye(e.palette[t.color].main, 0.5)}`,
          }),
        ...(t.variant === 'contained' && {
          color: e.vars
            ? e.vars.palette.text.primary
            : (o = (r = e.palette).getContrastText) == null
            ? void 0
            : o.call(r, e.palette.grey[300]),
          backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedBg : a,
          boxShadow: (e.vars || e).shadows[2],
        }),
        ...(t.variant === 'contained' &&
          t.color !== 'inherit' && {
            color: (e.vars || e).palette[t.color].contrastText,
            backgroundColor: (e.vars || e).palette[t.color].main,
          }),
        ...(t.color === 'inherit' && { color: 'inherit', borderColor: 'currentColor' }),
        ...(t.size === 'small' &&
          t.variant === 'text' && { padding: '4px 5px', fontSize: e.typography.pxToRem(13) }),
        ...(t.size === 'large' &&
          t.variant === 'text' && { padding: '8px 11px', fontSize: e.typography.pxToRem(15) }),
        ...(t.size === 'small' &&
          t.variant === 'outlined' && { padding: '3px 9px', fontSize: e.typography.pxToRem(13) }),
        ...(t.size === 'large' &&
          t.variant === 'outlined' && { padding: '7px 21px', fontSize: e.typography.pxToRem(15) }),
        ...(t.size === 'small' &&
          t.variant === 'contained' && { padding: '4px 10px', fontSize: e.typography.pxToRem(13) }),
        ...(t.size === 'large' &&
          t.variant === 'contained' && { padding: '8px 22px', fontSize: e.typography.pxToRem(15) }),
        ...(t.fullWidth && { width: '100%' }),
      };
    },
    ({ ownerState: e }) =>
      e.disableElevation && {
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
        [`&.${Fo.focusVisible}`]: { boxShadow: 'none' },
        '&:active': { boxShadow: 'none' },
        [`&.${Fo.disabled}`]: { boxShadow: 'none' },
      },
  ),
  Mg = de('span', {
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
    ...(e.size === 'small' && { marginLeft: -2 }),
    ...gc(e),
  })),
  _g = de('span', {
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
    ...(e.size === 'small' && { marginRight: -2 }),
    ...gc(e),
  })),
  vc = g.forwardRef(function (t, o) {
    const r = g.useContext(Ng),
      a = xa(r, t),
      i = Le({ props: a, name: 'MuiButton' }),
      {
        children: s,
        color: l = 'primary',
        component: c = 'button',
        className: d,
        disabled: u = !1,
        disableElevation: p = !1,
        disableFocusRipple: h = !1,
        endIcon: y,
        focusVisibleClassName: v,
        fullWidth: m = !1,
        size: b = 'medium',
        startIcon: C,
        type: T,
        variant: E = 'text',
        ...x
      } = i,
      f = {
        ...i,
        color: l,
        component: c,
        disabled: u,
        disableElevation: p,
        disableFocusRipple: h,
        fullWidth: m,
        size: b,
        type: T,
        variant: E,
      },
      k = Pg(f),
      w = C && _(Mg, { className: k.startIcon, ownerState: f, children: C }),
      D = y && _(_g, { className: k.endIcon, ownerState: f, children: y });
    return Xe(Ig, {
      ownerState: f,
      className: xe(r.className, k.root, d),
      component: c,
      disabled: u,
      focusRipple: !h,
      focusVisibleClassName: xe(k.focusVisible, v),
      ref: o,
      type: T,
      ...x,
      classes: k,
      children: [w, s, D],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (vc.propTypes = {
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
const Ag = vc;
function Dg(e) {
  return Ie('PrivateSwitchBase', e);
}
Ne('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const Lg = (e) => {
    const { classes: t, checked: o, disabled: r, edge: a } = e,
      i = {
        root: ['root', o && 'checked', r && 'disabled', a && `edge${oe(a)}`],
        input: ['input'],
      };
    return _e(i, Dg, t);
  },
  jg = de(Hn)(({ ownerState: e }) => ({
    padding: 9,
    borderRadius: '50%',
    ...(e.edge === 'start' && { marginLeft: e.size === 'small' ? -3 : -12 }),
    ...(e.edge === 'end' && { marginRight: e.size === 'small' ? -3 : -12 }),
  })),
  Fg = de('input')({
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
  yc = g.forwardRef(function (t, o) {
    const {
        autoFocus: r,
        checked: a,
        checkedIcon: i,
        className: s,
        defaultChecked: l,
        disabled: c,
        disableFocusRipple: d = !1,
        edge: u = !1,
        icon: p,
        id: h,
        inputProps: y,
        inputRef: v,
        name: m,
        onBlur: b,
        onChange: C,
        onFocus: T,
        readOnly: E,
        required: x = !1,
        tabIndex: f,
        type: k,
        value: w,
        ...D
      } = t,
      [z, N] = Cn({ controlled: a, default: !!l, name: 'SwitchBase', state: 'checked' }),
      I = Rn(),
      G = (V) => {
        T && T(V), I && I.onFocus && I.onFocus(V);
      },
      j = (V) => {
        b && b(V), I && I.onBlur && I.onBlur(V);
      },
      M = (V) => {
        if (V.nativeEvent.defaultPrevented) return;
        const S = V.target.checked;
        N(S), C && C(V, S);
      };
    let A = c;
    I && typeof A > 'u' && (A = I.disabled);
    const H = k === 'checkbox' || k === 'radio',
      ie = { ...t, checked: z, disabled: A, disableFocusRipple: d, edge: u },
      Q = Lg(ie);
    return Xe(jg, {
      component: 'span',
      className: xe(Q.root, s),
      centerRipple: !0,
      focusRipple: !d,
      disabled: A,
      tabIndex: null,
      role: void 0,
      onFocus: G,
      onBlur: j,
      ownerState: ie,
      ref: o,
      ...D,
      children: [
        _(Fg, {
          autoFocus: r,
          checked: a,
          defaultChecked: l,
          className: Q.input,
          disabled: A,
          id: H ? h : void 0,
          name: m,
          onChange: M,
          readOnly: E,
          ref: v,
          required: x,
          ownerState: ie,
          tabIndex: f,
          type: k,
          ...(k === 'checkbox' && w === void 0 ? {} : { value: w }),
          ...y,
        }),
        z ? i : p,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (yc.propTypes = {
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
    inputRef: xt,
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
const xc = yc,
  zg = Xn(
    _('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  Vg = Xn(
    _('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  Bg = Xn(
    _('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function Ug(e) {
  return Ie('MuiCheckbox', e);
}
const Wg = Ne('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  Yr = Wg,
  Hg = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      a = { root: ['root', o && 'indeterminate', `color${oe(r)}`] },
      i = _e(a, Ug, t);
    return { ...t, ...i };
  },
  qg = de(xc, {
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
        '@media (hover: none)': { backgroundColor: 'transparent' },
      },
    }),
    ...(t.color !== 'default' && {
      [`&.${Yr.checked}, &.${Yr.indeterminate}`]: { color: (e.vars || e).palette[t.color].main },
      [`&.${Yr.disabled}`]: { color: (e.vars || e).palette.action.disabled },
    }),
  })),
  Yg = _(Vg, {}),
  Kg = _(zg, {}),
  Gg = _(Bg, {}),
  Ec = g.forwardRef(function (t, o) {
    var r, a;
    const i = Le({ props: t, name: 'MuiCheckbox' }),
      {
        checkedIcon: s = Yg,
        color: l = 'primary',
        icon: c = Kg,
        indeterminate: d = !1,
        indeterminateIcon: u = Gg,
        inputProps: p,
        size: h = 'medium',
        className: y,
        ...v
      } = i,
      m = d ? u : c,
      b = d ? u : s,
      C = { ...i, color: l, indeterminate: d, size: h },
      T = Hg(C);
    return _(qg, {
      type: 'checkbox',
      inputProps: { 'data-indeterminate': d, ...p },
      icon: g.cloneElement(m, { fontSize: (r = m.props.fontSize) != null ? r : h }),
      checkedIcon: g.cloneElement(b, { fontSize: (a = b.props.fontSize) != null ? a : h }),
      ownerState: C,
      ref: o,
      className: xe(T.root, y),
      ...v,
      classes: T,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Ec.propTypes = {
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
    inputRef: xt,
    onChange: n.func,
    required: n.bool,
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    value: n.any,
  });
const Xg = Ec,
  Jg = de('div', {
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
    ...(!t.open && t.exited && { visibility: 'hidden' }),
  })),
  Zg = de(Sg, { name: 'MuiModal', slot: 'Backdrop', overridesResolver: (e, t) => t.backdrop })({
    zIndex: -1,
  }),
  Oc = g.forwardRef(function (t, o) {
    var r, a, i, s, l, c;
    const d = Le({ name: 'MuiModal', props: t }),
      {
        BackdropComponent: u = Zg,
        BackdropProps: p,
        classes: h,
        className: y,
        closeAfterTransition: v = !1,
        children: m,
        container: b,
        component: C,
        components: T = {},
        componentsProps: E = {},
        disableAutoFocus: x = !1,
        disableEnforceFocus: f = !1,
        disableEscapeKeyDown: k = !1,
        disablePortal: w = !1,
        disableRestoreFocus: D = !1,
        disableScrollLock: z = !1,
        hideBackdrop: N = !1,
        keepMounted: I = !1,
        onBackdropClick: G,
        onClose: j,
        open: M,
        slotProps: A,
        slots: H,
        theme: ie,
        ...Q
      } = d,
      [V, S] = g.useState(!0),
      L = {
        container: b,
        closeAfterTransition: v,
        disableAutoFocus: x,
        disableEnforceFocus: f,
        disableEscapeKeyDown: k,
        disablePortal: w,
        disableRestoreFocus: D,
        disableScrollLock: z,
        hideBackdrop: N,
        keepMounted: I,
        onBackdropClick: G,
        onClose: j,
        open: M,
      },
      X = { ...d, ...L, exited: V },
      B = (r = (a = H == null ? void 0 : H.root) != null ? a : T.Root) != null ? r : Jg,
      q = (i = (s = H == null ? void 0 : H.backdrop) != null ? s : T.Backdrop) != null ? i : u,
      K = (l = A == null ? void 0 : A.root) != null ? l : E.root,
      re = (c = A == null ? void 0 : A.backdrop) != null ? c : E.backdrop;
    return _(Uh, {
      slots: { root: B, backdrop: q },
      slotProps: {
        root: () => ({
          ...ia(K, X),
          ...(!dn(B) && { as: C, theme: ie }),
          className: xe(
            y,
            K == null ? void 0 : K.className,
            h == null ? void 0 : h.root,
            !X.open && X.exited && (h == null ? void 0 : h.hidden),
          ),
        }),
        backdrop: () => ({
          ...p,
          ...ia(re, X),
          className: xe(re == null ? void 0 : re.className, h == null ? void 0 : h.backdrop),
        }),
      },
      onTransitionEnter: () => S(!1),
      onTransitionExited: () => S(!0),
      ref: o,
      ...Q,
      ...L,
      children: m,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Oc.propTypes = {
    BackdropComponent: n.elementType,
    BackdropProps: n.object,
    children: qn.isRequired,
    classes: n.object,
    className: n.string,
    closeAfterTransition: n.bool,
    component: n.elementType,
    components: n.shape({ Backdrop: n.elementType, Root: n.elementType }),
    componentsProps: n.shape({
      backdrop: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
    }),
    container: n.oneOfType([en, n.func]),
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
const Qg = Oc,
  ev = Ne('MuiDivider', [
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
  Ps = ev,
  tv = (e) => {
    const { classes: t, disableUnderline: o } = e,
      a = _e({ root: ['root', !o && 'underline'], input: ['input'] }, ag, t);
    return { ...t, ...a };
  },
  nv = de(Ir, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Nr(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    var o;
    const r = e.palette.mode === 'light',
      a = r ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)',
      i = r ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
      s = r ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.13)',
      l = r ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';
    return {
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
      [`&.${St.focused}`]: { backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i },
      [`&.${St.disabled}`]: { backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : l },
      ...(!t.disableUnderline && {
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
        [`&.${St.focused}:after`]: { transform: 'scaleX(1) translateX(0)' },
        [`&.${St.error}`]: {
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
        [`&:hover:not(.${St.disabled}, .${St.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
        },
        [`&.${St.disabled}:before`]: { borderBottomStyle: 'dotted' },
      }),
      ...(t.startAdornment && { paddingLeft: 12 }),
      ...(t.endAdornment && { paddingRight: 12 }),
      ...(t.multiline && {
        padding: '25px 12px 8px',
        ...(t.size === 'small' && { paddingTop: 21, paddingBottom: 4 }),
        ...(t.hiddenLabel && { paddingTop: 16, paddingBottom: 17 }),
      }),
    };
  }),
  ov = de(Mr, { name: 'MuiFilledInput', slot: 'Input', overridesResolver: Pr })(
    ({ theme: e, ownerState: t }) => ({
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
        '&:-webkit-autofill': { borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit' },
        [e.getColorSchemeSelector('dark')]: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #266798 inset',
            WebkitTextFillColor: '#fff',
            caretColor: '#fff',
          },
        },
      }),
      ...(t.size === 'small' && { paddingTop: 21, paddingBottom: 4 }),
      ...(t.hiddenLabel && { paddingTop: 16, paddingBottom: 17 }),
      ...(t.multiline && { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }),
      ...(t.startAdornment && { paddingLeft: 0 }),
      ...(t.endAdornment && { paddingRight: 0 }),
      ...(t.hiddenLabel && t.size === 'small' && { paddingTop: 8, paddingBottom: 9 }),
    }),
  ),
  Xa = g.forwardRef(function (t, o) {
    var r, a, i, s;
    const l = Le({ props: t, name: 'MuiFilledInput' }),
      {
        disableUnderline: c,
        components: d = {},
        componentsProps: u,
        fullWidth: p = !1,
        hiddenLabel: h,
        inputComponent: y = 'input',
        multiline: v = !1,
        slotProps: m,
        slots: b = {},
        type: C = 'text',
        ...T
      } = l,
      E = { ...l, fullWidth: p, inputComponent: y, multiline: v, type: C },
      x = tv(l),
      f = { root: { ownerState: E }, input: { ownerState: E } },
      k = m ?? u ? _t(m ?? u, f) : f,
      w = (r = (a = b.root) != null ? a : d.Root) != null ? r : nv,
      D = (i = (s = b.input) != null ? s : d.Input) != null ? i : ov;
    return _(Ga, {
      slots: { root: w, input: D },
      componentsProps: k,
      fullWidth: p,
      inputComponent: y,
      multiline: v,
      ref: o,
      type: C,
      ...T,
      classes: x,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Xa.propTypes = {
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
    inputRef: xt,
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
Xa.muiName = 'Input';
const Cc = Xa;
function rv(e) {
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
const av = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      a = { root: ['root', o !== 'none' && `margin${oe(o)}`, r && 'fullWidth'] };
    return _e(a, rv, t);
  },
  iv = de('div', {
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
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
    verticalAlign: 'top',
    ...(e.margin === 'normal' && { marginTop: 16, marginBottom: 8 }),
    ...(e.margin === 'dense' && { marginTop: 8, marginBottom: 4 }),
    ...(e.fullWidth && { width: '100%' }),
  })),
  Tc = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiFormControl' }),
      {
        children: a,
        className: i,
        color: s = 'primary',
        component: l = 'div',
        disabled: c = !1,
        error: d = !1,
        focused: u,
        fullWidth: p = !1,
        hiddenLabel: h = !1,
        margin: y = 'none',
        required: v = !1,
        size: m = 'medium',
        variant: b = 'outlined',
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
        required: v,
        size: m,
        variant: b,
      },
      E = av(T),
      [x, f] = g.useState(() => {
        let j = !1;
        return (
          a &&
            g.Children.forEach(a, (M) => {
              if (!zr(M, ['Input', 'Select'])) return;
              const A = zr(M, ['Select']) ? M.props.input : M;
              A && Xb(A.props) && (j = !0);
            }),
          j
        );
      }),
      [k, w] = g.useState(() => {
        let j = !1;
        return (
          a &&
            g.Children.forEach(a, (M) => {
              zr(M, ['Input', 'Select']) &&
                (rr(M.props, !0) || rr(M.props.inputProps, !0)) &&
                (j = !0);
            }),
          j
        );
      }),
      [D, z] = g.useState(!1);
    c && D && z(!1);
    const N = u !== void 0 && !c ? u : D;
    let I;
    if (process.env.NODE_ENV !== 'production') {
      const j = g.useRef(!1);
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
    const G = g.useMemo(
      () => ({
        adornedStart: x,
        setAdornedStart: f,
        color: s,
        disabled: c,
        error: d,
        filled: k,
        focused: N,
        fullWidth: p,
        hiddenLabel: h,
        size: m,
        onBlur: () => {
          z(!1);
        },
        onEmpty: () => {
          w(!1);
        },
        onFilled: () => {
          w(!0);
        },
        onFocus: () => {
          z(!0);
        },
        registerEffect: I,
        required: v,
        variant: b,
      }),
      [x, s, c, d, k, N, p, h, I, v, m, b],
    );
    return _(Ka.Provider, {
      value: G,
      children: _(iv, {
        as: l,
        ownerState: T,
        className: xe(E.root, i),
        ref: o,
        ...C,
        children: a,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Tc.propTypes = {
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
const sv = Tc;
function lv(e) {
  return Ie('MuiFormHelperText', e);
}
const cv = Ne('MuiFormHelperText', [
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
  Is = cv;
var Ms;
const uv = (e) => {
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
      d = {
        root: [
          'root',
          a && 'disabled',
          i && 'error',
          r && `size${oe(r)}`,
          o && 'contained',
          l && 'focused',
          s && 'filled',
          c && 'required',
        ],
      };
    return _e(d, lv, t);
  },
  dv = de('p', {
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
    [`&.${Is.disabled}`]: { color: (e.vars || e).palette.text.disabled },
    [`&.${Is.error}`]: { color: (e.vars || e).palette.error.main },
    ...(t.size === 'small' && { marginTop: 4 }),
    ...(t.contained && { marginLeft: 14, marginRight: 14 }),
  })),
  wc = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiFormHelperText' }),
      {
        children: a,
        className: i,
        component: s = 'p',
        disabled: l,
        error: c,
        filled: d,
        focused: u,
        margin: p,
        required: h,
        variant: y,
        ...v
      } = r,
      m = Rn(),
      b = Jn({
        props: r,
        muiFormControl: m,
        states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
      }),
      C = {
        ...r,
        component: s,
        contained: b.variant === 'filled' || b.variant === 'outlined',
        variant: b.variant,
        size: b.size,
        disabled: b.disabled,
        error: b.error,
        filled: b.filled,
        focused: b.focused,
        required: b.required,
      },
      T = uv(C);
    return _(dv, {
      as: s,
      ownerState: C,
      className: xe(T.root, i),
      ref: o,
      ...v,
      children: a === ' ' ? Ms || (Ms = _('span', { className: 'notranslate', children: '​' })) : a,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (wc.propTypes = {
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
const pv = wc;
function fv(e) {
  return Ie('MuiFormLabel', e);
}
const mv = Ne('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  go = mv,
  hv = (e) => {
    const { classes: t, color: o, focused: r, disabled: a, error: i, filled: s, required: l } = e,
      c = {
        root: [
          'root',
          `color${oe(o)}`,
          a && 'disabled',
          i && 'error',
          s && 'filled',
          r && 'focused',
          l && 'required',
        ],
        asterisk: ['asterisk', i && 'error'],
      };
    return _e(c, fv, t);
  },
  bv = de('label', {
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
    [`&.${go.focused}`]: { color: (e.vars || e).palette[t.color].main },
    [`&.${go.disabled}`]: { color: (e.vars || e).palette.text.disabled },
    [`&.${go.error}`]: { color: (e.vars || e).palette.error.main },
  })),
  gv = de('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({ [`&.${go.error}`]: { color: (e.vars || e).palette.error.main } })),
  kc = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiFormLabel' }),
      {
        children: a,
        className: i,
        color: s,
        component: l = 'label',
        disabled: c,
        error: d,
        filled: u,
        focused: p,
        required: h,
        ...y
      } = r,
      v = Rn(),
      m = Jn({
        props: r,
        muiFormControl: v,
        states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
      }),
      b = {
        ...r,
        color: m.color || 'primary',
        component: l,
        disabled: m.disabled,
        error: m.error,
        filled: m.filled,
        focused: m.focused,
        required: m.required,
      },
      C = hv(b);
    return Xe(bv, {
      as: l,
      ownerState: b,
      className: xe(C.root, i),
      ref: o,
      ...y,
      children: [
        a,
        m.required &&
          Xe(gv, { ownerState: b, 'aria-hidden': !0, className: C.asterisk, children: [' ', '*'] }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (kc.propTypes = {
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
const Sc = kc;
function fa(e) {
  return `scale(${e}, ${e ** 2})`;
}
const vv = {
    entering: { opacity: 1, transform: fa(1) },
    entered: { opacity: 1, transform: 'none' },
  },
  Kr =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  Ja = g.forwardRef(function (t, o) {
    const {
        addEndListener: r,
        appear: a = !0,
        children: i,
        easing: s,
        in: l,
        onEnter: c,
        onEntered: d,
        onEntering: u,
        onExit: p,
        onExited: h,
        onExiting: y,
        style: v,
        timeout: m = 'auto',
        TransitionComponent: b = Zl,
        ...C
      } = t,
      T = g.useRef(),
      E = g.useRef(),
      x = Gn(),
      f = g.useRef(null),
      k = at(f, i.ref, o),
      w = (A) => (H) => {
        if (A) {
          const ie = f.current;
          H === void 0 ? A(ie) : A(ie, H);
        }
      },
      D = w(u),
      z = w((A, H) => {
        Ql(A);
        const {
          duration: ie,
          delay: Q,
          easing: V,
        } = or({ style: v, timeout: m, easing: s }, { mode: 'enter' });
        let S;
        m === 'auto'
          ? ((S = x.transitions.getAutoHeightDuration(A.clientHeight)), (E.current = S))
          : (S = ie),
          (A.style.transition = [
            x.transitions.create('opacity', { duration: S, delay: Q }),
            x.transitions.create('transform', {
              duration: Kr ? S : S * 0.666,
              delay: Q,
              easing: V,
            }),
          ].join(',')),
          c && c(A, H);
      }),
      N = w(d),
      I = w(y),
      G = w((A) => {
        const {
          duration: H,
          delay: ie,
          easing: Q,
        } = or({ style: v, timeout: m, easing: s }, { mode: 'exit' });
        let V;
        m === 'auto'
          ? ((V = x.transitions.getAutoHeightDuration(A.clientHeight)), (E.current = V))
          : (V = H),
          (A.style.transition = [
            x.transitions.create('opacity', { duration: V, delay: ie }),
            x.transitions.create('transform', {
              duration: Kr ? V : V * 0.666,
              delay: Kr ? ie : ie || V * 0.333,
              easing: Q,
            }),
          ].join(',')),
          (A.style.opacity = 0),
          (A.style.transform = fa(0.75)),
          p && p(A);
      }),
      j = w(h),
      M = (A) => {
        m === 'auto' && (T.current = setTimeout(A, E.current || 0)), r && r(f.current, A);
      };
    return (
      g.useEffect(
        () => () => {
          clearTimeout(T.current);
        },
        [],
      ),
      _(b, {
        appear: a,
        in: l,
        nodeRef: f,
        onEnter: z,
        onEntered: N,
        onEntering: D,
        onExit: G,
        onExited: j,
        onExiting: I,
        addEndListener: M,
        timeout: m === 'auto' ? null : m,
        ...C,
        children: (A, H) =>
          g.cloneElement(i, {
            style: {
              opacity: 0,
              transform: fa(0.75),
              visibility: A === 'exited' && !l ? 'hidden' : void 0,
              ...vv[A],
              ...v,
              ...i.props.style,
            },
            ref: k,
            ...H,
          }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ja.propTypes = {
    addEndListener: n.func,
    appear: n.bool,
    children: qn.isRequired,
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
Ja.muiSupportAuto = !0;
const Rc = Ja,
  yv = (e) => {
    const { classes: t, disableUnderline: o } = e,
      a = _e({ root: ['root', !o && 'underline'], input: ['input'] }, tg, t);
    return { ...t, ...a };
  },
  xv = de(Ir, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
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
        ...(t.formControl && { 'label + &': { marginTop: 16 } }),
        ...(!t.disableUnderline && {
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
          [`&.${un.focused}:after`]: { transform: 'scaleX(1) translateX(0)' },
          [`&.${un.error}`]: {
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
          [`&:hover:not(.${un.disabled}, .${un.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            '@media (hover: none)': { borderBottom: `1px solid ${r}` },
          },
          [`&.${un.disabled}:before`]: { borderBottomStyle: 'dotted' },
        }),
      }
    );
  }),
  Ev = de(Mr, { name: 'MuiInput', slot: 'Input', overridesResolver: Pr })({}),
  Za = g.forwardRef(function (t, o) {
    var r, a, i, s;
    const l = Le({ props: t, name: 'MuiInput' }),
      {
        disableUnderline: c,
        components: d = {},
        componentsProps: u,
        fullWidth: p = !1,
        inputComponent: h = 'input',
        multiline: y = !1,
        slotProps: v,
        slots: m = {},
        type: b = 'text',
        ...C
      } = l,
      T = yv(l),
      x = { root: { ownerState: { disableUnderline: c } } },
      f = v ?? u ? _t(v ?? u, x) : x,
      k = (r = (a = m.root) != null ? a : d.Root) != null ? r : xv,
      w = (i = (s = m.input) != null ? s : d.Input) != null ? i : Ev;
    return _(Ga, {
      slots: { root: k, input: w },
      slotProps: f,
      fullWidth: p,
      inputComponent: h,
      multiline: y,
      ref: o,
      type: b,
      ...C,
      classes: T,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Za.propTypes = {
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
    inputRef: xt,
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
Za.muiName = 'Input';
const $c = Za;
function Ov(e) {
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
const Cv = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: a,
        disableAnimation: i,
        variant: s,
        required: l,
      } = e,
      d = _e(
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
        Ov,
        t,
      );
    return { ...t, ...d };
  },
  Tv = de(Sc, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`& .${go.asterisk}`]: t.asterisk },
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
      transform: 'translate(0, 20px) scale(1)',
    }),
    ...(t.size === 'small' && { transform: 'translate(0, 17px) scale(1)' }),
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
      zIndex: 1,
      pointerEvents: 'none',
      transform: 'translate(12px, 16px) scale(1)',
      maxWidth: 'calc(100% - 24px)',
      ...(t.size === 'small' && { transform: 'translate(12px, 13px) scale(1)' }),
      ...(t.shrink && {
        userSelect: 'none',
        pointerEvents: 'auto',
        transform: 'translate(12px, 7px) scale(0.75)',
        maxWidth: 'calc(133% - 24px)',
        ...(t.size === 'small' && { transform: 'translate(12px, 4px) scale(0.75)' }),
      }),
    }),
    ...(t.variant === 'outlined' && {
      zIndex: 1,
      pointerEvents: 'none',
      transform: 'translate(14px, 16px) scale(1)',
      maxWidth: 'calc(100% - 24px)',
      ...(t.size === 'small' && { transform: 'translate(14px, 9px) scale(1)' }),
      ...(t.shrink && {
        userSelect: 'none',
        pointerEvents: 'auto',
        maxWidth: 'calc(133% - 32px)',
        transform: 'translate(14px, -9px) scale(0.75)',
      }),
    }),
  })),
  Nc = g.forwardRef(function (t, o) {
    const r = Le({ name: 'MuiInputLabel', props: t }),
      { disableAnimation: a = !1, margin: i, shrink: s, variant: l, className: c, ...d } = r,
      u = Rn();
    let p = s;
    typeof p > 'u' && u && (p = u.filled || u.focused || u.adornedStart);
    const h = Jn({ props: r, muiFormControl: u, states: ['size', 'variant', 'required'] }),
      y = {
        ...r,
        disableAnimation: a,
        formControl: u,
        shrink: p,
        size: h.size,
        variant: h.variant,
        required: h.required,
      },
      v = Cv(y);
    return _(Tv, {
      'data-shrink': p,
      ownerState: y,
      ref: o,
      className: xe(v.root, c),
      ...d,
      classes: v,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Nc.propTypes = {
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
const wv = Nc,
  Pc = g.createContext({});
process.env.NODE_ENV !== 'production' && (Pc.displayName = 'ListContext');
const ma = Pc;
function kv(e) {
  return Ie('MuiList', e);
}
Ne('MuiList', ['root', 'padding', 'dense', 'subheader']);
const Sv = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: a } = e;
    return _e({ root: ['root', !o && 'padding', r && 'dense', a && 'subheader'] }, kv, t);
  },
  Rv = de('ul', {
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
    ...(!e.disablePadding && { paddingTop: 8, paddingBottom: 8 }),
    ...(e.subheader && { paddingTop: 0 }),
  })),
  Ic = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiList' }),
      {
        children: a,
        className: i,
        component: s = 'ul',
        dense: l = !1,
        disablePadding: c = !1,
        subheader: d,
        ...u
      } = r,
      p = g.useMemo(() => ({ dense: l }), [l]),
      h = { ...r, component: s, dense: l, disablePadding: c },
      y = Sv(h);
    return _(ma.Provider, {
      value: p,
      children: Xe(Rv, {
        as: s,
        className: xe(y.root, i),
        ref: o,
        ownerState: h,
        ...u,
        children: [d, a],
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Ic.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    dense: n.bool,
    disablePadding: n.bool,
    subheader: n.node,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const $v = Ic,
  Nv = Ne('MuiListItemIcon', ['root', 'alignItemsFlexStart']),
  _s = Nv,
  Pv = Ne('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']),
  As = Pv;
function Gr(e, t, o) {
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
function Mc(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function io(e, t, o, r, a, i) {
  let s = !1,
    l = a(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !Mc(l, i) || c) l = a(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const _c = g.forwardRef(function (t, o) {
  const {
      actions: r,
      autoFocus: a = !1,
      autoFocusItem: i = !1,
      children: s,
      className: l,
      disabledItemsFocusable: c = !1,
      disableListWrap: d = !1,
      onKeyDown: u,
      variant: p = 'selectedMenu',
      ...h
    } = t,
    y = g.useRef(null),
    v = g.useRef({ keys: [], repeating: !0, previousKeyMatched: !0, lastTime: null });
  tn(() => {
    a && y.current.focus();
  }, [a]),
    g.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (E, x) => {
          const f = !y.current.style.width;
          if (E.clientHeight < y.current.clientHeight && f) {
            const k = `${ll(rt(E))}px`;
            (y.current.style[x.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = k),
              (y.current.style.width = `calc(100% + ${k})`);
          }
          return y.current;
        },
      }),
      [],
    );
  const m = (E) => {
      const x = y.current,
        f = E.key,
        k = rt(x).activeElement;
      if (f === 'ArrowDown') E.preventDefault(), io(x, k, d, c, Gr);
      else if (f === 'ArrowUp') E.preventDefault(), io(x, k, d, c, Ds);
      else if (f === 'Home') E.preventDefault(), io(x, null, d, c, Gr);
      else if (f === 'End') E.preventDefault(), io(x, null, d, c, Ds);
      else if (f.length === 1) {
        const w = v.current,
          D = f.toLowerCase(),
          z = performance.now();
        w.keys.length > 0 &&
          (z - w.lastTime > 500
            ? ((w.keys = []), (w.repeating = !0), (w.previousKeyMatched = !0))
            : w.repeating && D !== w.keys[0] && (w.repeating = !1)),
          (w.lastTime = z),
          w.keys.push(D);
        const N = k && !w.repeating && Mc(k, w);
        w.previousKeyMatched && (N || io(x, k, !1, c, Gr, w))
          ? E.preventDefault()
          : (w.previousKeyMatched = !1);
      }
      u && u(E);
    },
    b = at(y, o);
  let C = -1;
  g.Children.forEach(s, (E, x) => {
    g.isValidElement(E) &&
      (process.env.NODE_ENV !== 'production' &&
        yo.isFragment(E) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      E.props.disabled || (((p === 'selectedMenu' && E.props.selected) || C === -1) && (C = x)),
      C === x &&
        (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) &&
        ((C += 1), C >= s.length && (C = -1)));
  });
  const T = g.Children.map(s, (E, x) => {
    if (x === C) {
      const f = {};
      return (
        i && (f.autoFocus = !0),
        E.props.tabIndex === void 0 && p === 'selectedMenu' && (f.tabIndex = 0),
        g.cloneElement(E, f)
      );
    }
    return E;
  });
  return _($v, {
    role: 'menu',
    ref: b,
    className: l,
    onKeyDown: m,
    tabIndex: a ? 0 : -1,
    ...h,
    children: T,
  });
});
process.env.NODE_ENV !== 'production' &&
  (_c.propTypes = {
    autoFocus: n.bool,
    autoFocusItem: n.bool,
    children: n.node,
    className: n.string,
    disabledItemsFocusable: n.bool,
    disableListWrap: n.bool,
    onKeyDown: n.func,
    variant: n.oneOf(['menu', 'selectedMenu']),
  });
const Iv = _c;
function Mv(e) {
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
function Wo(e) {
  return typeof e == 'function' ? e() : e;
}
const _v = (e) => {
    const { classes: t } = e;
    return _e({ root: ['root'], paper: ['paper'] }, Mv, t);
  },
  Av = de(Qg, { name: 'MuiPopover', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  Dv = de(No, { name: 'MuiPopover', slot: 'Paper', overridesResolver: (e, t) => t.paper })({
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    outline: 0,
  }),
  Ac = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiPopover' }),
      {
        action: a,
        anchorEl: i,
        anchorOrigin: s = { vertical: 'top', horizontal: 'left' },
        anchorPosition: l,
        anchorReference: c = 'anchorEl',
        children: d,
        className: u,
        container: p,
        elevation: h = 8,
        marginThreshold: y = 16,
        open: v,
        PaperProps: m = {},
        transformOrigin: b = { vertical: 'top', horizontal: 'left' },
        TransitionComponent: C = Rc,
        transitionDuration: T = 'auto',
        TransitionProps: { onEntering: E, ...x } = {},
        ...f
      } = r,
      k = g.useRef(),
      w = at(k, m.ref),
      D = {
        ...r,
        anchorOrigin: s,
        anchorReference: c,
        elevation: h,
        marginThreshold: y,
        PaperProps: m,
        transformOrigin: b,
        TransitionComponent: C,
        transitionDuration: T,
        TransitionProps: x,
      },
      z = _v(D),
      N = g.useCallback(() => {
        if (c === 'anchorPosition')
          return (
            process.env.NODE_ENV !== 'production' &&
              (l ||
                console.error(
                  'MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.',
                )),
            l
          );
        const S = Wo(i),
          L = S && S.nodeType === 1 ? S : rt(k.current).body,
          X = L.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'production') {
          const B = L.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            B.top === 0 &&
            B.left === 0 &&
            B.right === 0 &&
            B.bottom === 0 &&
            console.warn(
              [
                'MUI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join(`
`),
            );
        }
        return { top: X.top + Ls(X, s.vertical), left: X.left + js(X, s.horizontal) };
      }, [i, s.horizontal, s.vertical, l, c]),
      I = g.useCallback(
        (S) => ({ vertical: Ls(S, b.vertical), horizontal: js(S, b.horizontal) }),
        [b.horizontal, b.vertical],
      ),
      G = g.useCallback(
        (S) => {
          const L = { width: S.offsetWidth, height: S.offsetHeight },
            X = I(L);
          if (c === 'none') return { top: null, left: null, transformOrigin: Fs(X) };
          const B = N();
          let q = B.top - X.vertical,
            K = B.left - X.horizontal;
          const re = q + L.height,
            Z = K + L.width,
            ae = wn(Wo(i)),
            ce = ae.innerHeight - y,
            ue = ae.innerWidth - y;
          if (q < y) {
            const me = q - y;
            (q -= me), (X.vertical += me);
          } else if (re > ce) {
            const me = re - ce;
            (q -= me), (X.vertical += me);
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
            (K -= me), (X.horizontal += me);
          } else if (Z > ue) {
            const me = Z - ue;
            (K -= me), (X.horizontal += me);
          }
          return { top: `${Math.round(q)}px`, left: `${Math.round(K)}px`, transformOrigin: Fs(X) };
        },
        [i, c, N, I, y],
      ),
      [j, M] = g.useState(v),
      A = g.useCallback(() => {
        const S = k.current;
        if (!S) return;
        const L = G(S);
        L.top !== null && (S.style.top = L.top),
          L.left !== null && (S.style.left = L.left),
          (S.style.transformOrigin = L.transformOrigin),
          M(!0);
      }, [G]),
      H = (S, L) => {
        E && E(S, L), A();
      },
      ie = () => {
        M(!1);
      };
    g.useEffect(() => {
      v && A();
    }),
      g.useImperativeHandle(
        a,
        () =>
          v
            ? {
                updatePosition: () => {
                  A();
                },
              }
            : null,
        [v, A],
      ),
      g.useEffect(() => {
        if (!v) return;
        const S = al(() => {
            A();
          }),
          L = wn(i);
        return (
          L.addEventListener('resize', S),
          () => {
            S.clear(), L.removeEventListener('resize', S);
          }
        );
      }, [i, v, A]);
    let Q = T;
    T === 'auto' && !C.muiSupportAuto && (Q = void 0);
    const V = p || (i ? rt(Wo(i)).body : void 0);
    return _(Av, {
      BackdropProps: { invisible: !0 },
      className: xe(z.root, u),
      container: V,
      open: v,
      ref: o,
      ownerState: D,
      ...f,
      children: _(C, {
        appear: !0,
        in: v,
        onEntering: H,
        onExited: ie,
        timeout: Q,
        ...x,
        children: _(Dv, {
          elevation: h,
          ...m,
          ref: w,
          className: xe(z.paper, m.className),
          ...(j ? void 0 : { style: { ...m.style, opacity: 0 } }),
          ownerState: D,
          children: d,
        }),
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Ac.propTypes = {
    action: xt,
    anchorEl: Bt(n.oneOfType([en, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = Wo(e.anchorEl);
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
    container: n.oneOfType([en, n.func]),
    elevation: ya,
    marginThreshold: n.number,
    onClose: n.func,
    open: n.bool.isRequired,
    PaperProps: n.shape({ component: ga }),
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
const Lv = Ac;
function jv(e) {
  return Ie('MuiMenu', e);
}
Ne('MuiMenu', ['root', 'paper', 'list']);
const Fv = { vertical: 'top', horizontal: 'right' },
  zv = { vertical: 'top', horizontal: 'left' },
  Vv = (e) => {
    const { classes: t } = e;
    return _e({ root: ['root'], paper: ['paper'], list: ['list'] }, jv, t);
  },
  Bv = de(Lv, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Uv = de(No, { name: 'MuiMenu', slot: 'Paper', overridesResolver: (e, t) => t.paper })({
    maxHeight: 'calc(100% - 96px)',
    WebkitOverflowScrolling: 'touch',
  }),
  Wv = de(Iv, { name: 'MuiMenu', slot: 'List', overridesResolver: (e, t) => t.list })({
    outline: 0,
  }),
  Dc = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiMenu' }),
      {
        autoFocus: a = !0,
        children: i,
        disableAutoFocusItem: s = !1,
        MenuListProps: l = {},
        onClose: c,
        open: d,
        PaperProps: u = {},
        PopoverClasses: p,
        transitionDuration: h = 'auto',
        TransitionProps: { onEntering: y, ...v } = {},
        variant: m = 'selectedMenu',
        ...b
      } = r,
      C = Gn(),
      T = C.direction === 'rtl',
      E = {
        ...r,
        autoFocus: a,
        disableAutoFocusItem: s,
        MenuListProps: l,
        onEntering: y,
        PaperProps: u,
        transitionDuration: h,
        TransitionProps: v,
        variant: m,
      },
      x = Vv(E),
      f = a && !s && d,
      k = g.useRef(null),
      w = (N, I) => {
        k.current && k.current.adjustStyleForScrollbar(N, C), y && y(N, I);
      },
      D = (N) => {
        N.key === 'Tab' && (N.preventDefault(), c && c(N, 'tabKeyDown'));
      };
    let z = -1;
    return (
      g.Children.map(i, (N, I) => {
        g.isValidElement(N) &&
          (process.env.NODE_ENV !== 'production' &&
            yo.isFragment(N) &&
            console.error(
              [
                "MUI: The Menu component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join(`
`),
            ),
          N.props.disabled ||
            (((m === 'selectedMenu' && N.props.selected) || z === -1) && (z = I)));
      }),
      _(Bv, {
        onClose: c,
        anchorOrigin: { vertical: 'bottom', horizontal: T ? 'right' : 'left' },
        transformOrigin: T ? Fv : zv,
        PaperProps: { as: Uv, ...u, classes: { ...u.classes, root: x.paper } },
        className: x.root,
        open: d,
        ref: o,
        transitionDuration: h,
        TransitionProps: { onEntering: w, ...v },
        ownerState: E,
        ...b,
        classes: p,
        children: _(Wv, {
          onKeyDown: D,
          actions: k,
          autoFocus: a && (z === -1 || s),
          autoFocusItem: f,
          variant: m,
          ...l,
          className: xe(x.list, l.className),
          children: i,
        }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Dc.propTypes = {
    anchorEl: n.oneOfType([en, n.func]),
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
const Hv = Dc;
function qv(e) {
  return Ie('MuiMenuItem', e);
}
const Yv = Ne('MuiMenuItem', [
    'root',
    'focusVisible',
    'dense',
    'disabled',
    'divider',
    'gutters',
    'selected',
  ]),
  so = Yv,
  Kv = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
  },
  Gv = (e) => {
    const { disabled: t, dense: o, divider: r, disableGutters: a, selected: i, classes: s } = e,
      c = _e(
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
        qv,
        s,
      );
    return { ...s, ...c };
  },
  Xv = de(Hn, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiMenuItem',
    slot: 'Root',
    overridesResolver: Kv,
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
    ...(!t.disableGutters && { paddingLeft: 16, paddingRight: 16 }),
    ...(t.divider && {
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
      backgroundClip: 'padding-box',
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: (e.vars || e).palette.action.hover,
      '@media (hover: none)': { backgroundColor: 'transparent' },
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
      '@media (hover: none)': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : Ye(e.palette.primary.main, e.palette.action.selectedOpacity),
      },
    },
    [`&.${so.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
    [`&.${so.disabled}`]: { opacity: (e.vars || e).palette.action.disabledOpacity },
    [`& + .${Ps.root}`]: { marginTop: e.spacing(1), marginBottom: e.spacing(1) },
    [`& + .${Ps.inset}`]: { marginLeft: 52 },
    [`& .${As.root}`]: { marginTop: 0, marginBottom: 0 },
    [`& .${As.inset}`]: { paddingLeft: 36 },
    [`& .${_s.root}`]: { minWidth: 36 },
    ...(!t.dense && { [e.breakpoints.up('sm')]: { minHeight: 'auto' } }),
    ...(t.dense && {
      minHeight: 32,
      paddingTop: 4,
      paddingBottom: 4,
      ...e.typography.body2,
      [`& .${_s.root} svg`]: { fontSize: '1.25rem' },
    }),
  })),
  Lc = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiMenuItem' }),
      {
        autoFocus: a = !1,
        component: i = 'li',
        dense: s = !1,
        divider: l = !1,
        disableGutters: c = !1,
        focusVisibleClassName: d,
        role: u = 'menuitem',
        tabIndex: p,
        className: h,
        ...y
      } = r,
      v = g.useContext(ma),
      m = g.useMemo(() => ({ dense: s || v.dense || !1, disableGutters: c }), [v.dense, s, c]),
      b = g.useRef(null);
    tn(() => {
      a &&
        (b.current
          ? b.current.focus()
          : process.env.NODE_ENV !== 'production' &&
            console.error(
              'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
            ));
    }, [a]);
    const C = { ...r, dense: m.dense, divider: l, disableGutters: c },
      T = Gv(r),
      E = at(b, o);
    let x;
    return (
      r.disabled || (x = p !== void 0 ? p : -1),
      _(ma.Provider, {
        value: m,
        children: _(Xv, {
          ref: E,
          role: u,
          tabIndex: x,
          component: i,
          focusVisibleClassName: xe(T.focusVisible, d),
          className: xe(T.root, h),
          ...y,
          ownerState: C,
          classes: T,
        }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Lc.propTypes = {
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
const Jv = Lc;
function Zv(e) {
  return Ie('MuiNativeSelect', e);
}
const Qv = Ne('MuiNativeSelect', [
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
  Qa = Qv,
  ey = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: a, open: i, error: s } = e,
      l = {
        select: ['select', o, r && 'disabled', a && 'multiple', s && 'error'],
        icon: ['icon', `icon${oe(o)}`, i && 'iconOpen', r && 'disabled'],
      };
    return _e(l, Zv, t);
  },
  jc = ({ ownerState: e, theme: t }) => ({
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    userSelect: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    '&:focus': {
      ...(t.vars
        ? { backgroundColor: `rgba(${t.vars.palette.common.onBackgroundChannel} / 0.05)` }
        : {
            backgroundColor:
              t.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
          }),
      borderRadius: 0,
    },
    '&::-ms-expand': { display: 'none' },
    [`&.${Qa.disabled}`]: { cursor: 'default' },
    '&[multiple]': { height: 'auto' },
    '&:not([multiple]) option, &:not([multiple]) optgroup': {
      backgroundColor: (t.vars || t).palette.background.paper,
    },
    '&&&': { paddingRight: 24, minWidth: 16 },
    ...(e.variant === 'filled' && { '&&&': { paddingRight: 32 } }),
    ...(e.variant === 'outlined' && {
      borderRadius: (t.vars || t).shape.borderRadius,
      '&:focus': { borderRadius: (t.vars || t).shape.borderRadius },
      '&&&': { paddingRight: 32 },
    }),
  }),
  ty = de('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: Wt,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.select, t[o.variant], o.error && t.error, { [`&.${Qa.multiple}`]: t.multiple }];
    },
  })(jc),
  Fc = ({ ownerState: e, theme: t }) => ({
    position: 'absolute',
    right: 0,
    top: 'calc(50% - .5em)',
    pointerEvents: 'none',
    color: (t.vars || t).palette.action.active,
    [`&.${Qa.disabled}`]: { color: (t.vars || t).palette.action.disabled },
    ...(e.open && { transform: 'rotate(180deg)' }),
    ...(e.variant === 'filled' && { right: 7 }),
    ...(e.variant === 'outlined' && { right: 7 }),
  }),
  ny = de('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${oe(o.variant)}`], o.open && t.iconOpen];
    },
  })(Fc),
  zc = g.forwardRef(function (t, o) {
    const {
        className: r,
        disabled: a,
        error: i,
        IconComponent: s,
        inputRef: l,
        variant: c = 'standard',
        ...d
      } = t,
      u = { ...t, disabled: a, variant: c, error: i },
      p = ey(u);
    return Xe(g.Fragment, {
      children: [
        _(ty, { ownerState: u, className: xe(p.select, r), disabled: a, ref: l || o, ...d }),
        t.multiple ? null : _(ny, { as: s, ownerState: u, className: p.icon }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (zc.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    disabled: n.bool,
    error: n.bool,
    IconComponent: n.elementType.isRequired,
    inputRef: xt,
    multiple: n.bool,
    name: n.string,
    onChange: n.func,
    value: n.any,
    variant: n.oneOf(['standard', 'outlined', 'filled']),
  });
const oy = zc;
var zs;
const ry = de('fieldset')({
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
    width: 'auto',
    overflow: 'hidden',
    ...(!e.withLabel && {
      padding: 0,
      lineHeight: '11px',
      transition: t.transitions.create('width', {
        duration: 150,
        easing: t.transitions.easing.easeOut,
      }),
    }),
    ...(e.withLabel && {
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
  const { children: t, classes: o, className: r, label: a, notched: i, ...s } = e,
    l = a != null && a !== '',
    c = { ...e, notched: i, withLabel: l };
  return _(ry, {
    'aria-hidden': !0,
    className: r,
    ownerState: c,
    ...s,
    children: _(ay, {
      ownerState: c,
      children: l
        ? _('span', { children: a })
        : zs || (zs = _('span', { className: 'notranslate', children: '​' })),
    }),
  });
}
process.env.NODE_ENV !== 'production' &&
  (Vc.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    label: n.node,
    notched: n.bool.isRequired,
    style: n.object,
  });
const iy = (e) => {
    const { classes: t } = e,
      r = _e({ root: ['root'], notchedOutline: ['notchedOutline'], input: ['input'] }, og, t);
    return { ...t, ...r };
  },
  sy = de(Ir, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: Nr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      position: 'relative',
      borderRadius: (e.vars || e).shape.borderRadius,
      [`&:hover .${Xt.notchedOutline}`]: { borderColor: (e.vars || e).palette.text.primary },
      '@media (hover: none)': {
        [`&:hover .${Xt.notchedOutline}`]: {
          borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
        },
      },
      [`&.${Xt.focused} .${Xt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette[t.color].main,
        borderWidth: 2,
      },
      [`&.${Xt.error} .${Xt.notchedOutline}`]: { borderColor: (e.vars || e).palette.error.main },
      [`&.${Xt.disabled} .${Xt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette.action.disabled,
      },
      ...(t.startAdornment && { paddingLeft: 14 }),
      ...(t.endAdornment && { paddingRight: 14 }),
      ...(t.multiline && {
        padding: '16.5px 14px',
        ...(t.size === 'small' && { padding: '8.5px 14px' }),
      }),
    };
  }),
  ly = de(Vc, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  cy = de(Mr, { name: 'MuiOutlinedInput', slot: 'Input', overridesResolver: Pr })(
    ({ theme: e, ownerState: t }) => ({
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
        '&:-webkit-autofill': { borderRadius: 'inherit' },
        [e.getColorSchemeSelector('dark')]: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #266798 inset',
            WebkitTextFillColor: '#fff',
            caretColor: '#fff',
          },
        },
      }),
      ...(t.size === 'small' && { padding: '8.5px 14px' }),
      ...(t.multiline && { padding: 0 }),
      ...(t.startAdornment && { paddingLeft: 0 }),
      ...(t.endAdornment && { paddingRight: 0 }),
    }),
  ),
  ei = g.forwardRef(function (t, o) {
    var r, a, i, s, l;
    const c = Le({ props: t, name: 'MuiOutlinedInput' }),
      {
        components: d = {},
        fullWidth: u = !1,
        inputComponent: p = 'input',
        label: h,
        multiline: y = !1,
        notched: v,
        slots: m = {},
        type: b = 'text',
        ...C
      } = c,
      T = iy(c),
      E = Rn(),
      x = Jn({ props: c, muiFormControl: E, states: ['required'] }),
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
        type: b,
      },
      k = (r = (a = m.root) != null ? a : d.Root) != null ? r : sy,
      w = (i = (s = m.input) != null ? s : d.Input) != null ? i : cy;
    return _(Ga, {
      slots: { root: k, input: w },
      renderSuffix: (D) =>
        _(ly, {
          ownerState: f,
          className: T.notchedOutline,
          label:
            h != null && h !== '' && x.required
              ? l || (l = Xe(g.Fragment, { children: [h, ' ', '*'] }))
              : h,
          notched: typeof v < 'u' ? v : !!(D.startAdornment || D.filled || D.focused),
        }),
      fullWidth: u,
      inputComponent: p,
      multiline: y,
      ref: o,
      type: b,
      ...C,
      classes: { ...T, notchedOutline: null },
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ei.propTypes = {
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
    inputRef: xt,
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
ei.muiName = 'Input';
const Bc = ei;
function uy(e) {
  return Ie('MuiSelect', e);
}
const dy = Ne('MuiSelect', [
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
  lo = dy;
var Vs;
const py = de('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        { [`&.${lo.select}`]: t.select },
        { [`&.${lo.select}`]: t[o.variant] },
        { [`&.${lo.error}`]: t.error },
        { [`&.${lo.multiple}`]: t.multiple },
      ];
    },
  })(jc, {
    [`&.${lo.select}`]: {
      height: 'auto',
      minHeight: '1.4375em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  fy = de('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${oe(o.variant)}`], o.open && t.iconOpen];
    },
  })(Fc),
  my = de('input', {
    shouldForwardProp: (e) => La(e) && e !== 'classes',
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
function hy(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const by = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: a, open: i, error: s } = e,
      l = {
        select: ['select', o, r && 'disabled', a && 'multiple', s && 'error'],
        icon: ['icon', `icon${oe(o)}`, i && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return _e(l, uy, t);
  },
  Uc = g.forwardRef(function (t, o) {
    const {
        'aria-describedby': r,
        'aria-label': a,
        autoFocus: i,
        autoWidth: s,
        children: l,
        className: c,
        defaultOpen: d,
        defaultValue: u,
        disabled: p,
        displayEmpty: h,
        error: y = !1,
        IconComponent: v,
        inputRef: m,
        labelId: b,
        MenuProps: C = {},
        multiple: T,
        name: E,
        onBlur: x,
        onChange: f,
        onClose: k,
        onFocus: w,
        onOpen: D,
        open: z,
        readOnly: N,
        renderValue: I,
        SelectDisplayProps: G = {},
        tabIndex: j,
        type: M,
        value: A,
        variant: H = 'standard',
        ...ie
      } = t,
      [Q, V] = Cn({ controlled: A, default: u, name: 'Select' }),
      [S, L] = Cn({ controlled: z, default: d, name: 'Select' }),
      X = g.useRef(null),
      B = g.useRef(null),
      [q, K] = g.useState(null),
      { current: re } = g.useRef(z != null),
      [Z, ae] = g.useState(),
      ce = at(o, m),
      ue = g.useCallback((U) => {
        (B.current = U), U && K(U);
      }, []),
      me = q == null ? void 0 : q.parentNode;
    g.useImperativeHandle(
      ce,
      () => ({
        focus: () => {
          B.current.focus();
        },
        node: X.current,
        value: Q,
      }),
      [Q],
    ),
      g.useEffect(() => {
        d && S && q && !re && (ae(s ? null : me.clientWidth), B.current.focus());
      }, [q, s]),
      g.useEffect(() => {
        i && B.current.focus();
      }, [i]),
      g.useEffect(() => {
        if (!b) return;
        const U = rt(B.current).getElementById(b);
        if (U) {
          const ve = () => {
            getSelection().isCollapsed && B.current.focus();
          };
          return (
            U.addEventListener('click', ve),
            () => {
              U.removeEventListener('click', ve);
            }
          );
        }
      }, [b]);
    const P = (U, ve) => {
        U ? D && D(ve) : k && k(ve), re || (ae(s ? null : me.clientWidth), L(U));
      },
      Ce = (U) => {
        U.button === 0 && (U.preventDefault(), B.current.focus(), P(!0, U));
      },
      J = (U) => {
        P(!1, U);
      },
      W = g.Children.toArray(l),
      Te = (U) => {
        const ve = W.find((we) => we.props.value === U.target.value);
        ve !== void 0 && (V(ve.props.value), f && f(U, ve));
      },
      pe = (U) => (ve) => {
        let we;
        if (ve.currentTarget.hasAttribute('tabindex')) {
          if (T) {
            we = Array.isArray(Q) ? Q.slice() : [];
            const mt = Q.indexOf(U.props.value);
            mt === -1 ? we.push(U.props.value) : we.splice(mt, 1);
          } else we = U.props.value;
          if ((U.props.onClick && U.props.onClick(ve), Q !== we && (V(we), f))) {
            const mt = ve.nativeEvent || ve,
              bt = new mt.constructor(mt.type, mt);
            Object.defineProperty(bt, 'target', { writable: !0, value: { value: we, name: E } }),
              f(bt, U);
          }
          T || P(!1, ve);
        }
      },
      Re = (U) => {
        N ||
          ([' ', 'ArrowUp', 'ArrowDown', 'Enter'].indexOf(U.key) !== -1 &&
            (U.preventDefault(), P(!0, U)));
      },
      je = q !== null && S,
      Je = (U) => {
        !je &&
          x &&
          (Object.defineProperty(U, 'target', { writable: !0, value: { value: Q, name: E } }),
          x(U));
      };
    delete ie['aria-invalid'];
    let Ge, Fe;
    const Ze = [];
    let ee = !1,
      te = !1;
    (rr({ value: Q }) || h) && (I ? (Ge = I(Q)) : (ee = !0));
    const ye = W.map((U) => {
      if (!g.isValidElement(U)) return null;
      process.env.NODE_ENV !== 'production' &&
        yo.isFragment(U) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let ve;
      if (T) {
        if (!Array.isArray(Q))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : pn(2),
          );
        (ve = Q.some((we) => Bs(we, U.props.value))), ve && ee && Ze.push(U.props.children);
      } else (ve = Bs(Q, U.props.value)), ve && ee && (Fe = U.props.children);
      return (
        ve && (te = !0),
        g.cloneElement(U, {
          'aria-selected': ve ? 'true' : 'false',
          onClick: pe(U),
          onKeyUp: (we) => {
            we.key === ' ' && we.preventDefault(), U.props.onKeyUp && U.props.onKeyUp(we);
          },
          role: 'option',
          selected: ve,
          value: void 0,
          'data-value': U.props.value,
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      g.useEffect(() => {
        if (!te && !T && Q !== '') {
          const U = W.map((ve) => ve.props.value);
          console.warn(
            [
              `MUI: You have provided an out-of-range value \`${Q}\` for the select ${
                E ? `(name="${E}") ` : ''
              }component.`,
              "Consider providing a value that matches one of the available options or ''.",
              `The available values are ${
                U.filter((ve) => ve != null)
                  .map((ve) => `\`${ve}\``)
                  .join(', ') || '""'
              }.`,
            ].join(`
`),
          );
        }
      }, [te, W, T, E, Q]),
      ee &&
        (T
          ? Ze.length === 0
            ? (Ge = null)
            : (Ge = Ze.reduce(
                (U, ve, we) => (U.push(ve), we < Ze.length - 1 && U.push(', '), U),
                [],
              ))
          : (Ge = Fe));
    let he = Z;
    !s && re && q && (he = me.clientWidth);
    let Ee;
    typeof j < 'u' ? (Ee = j) : (Ee = p ? null : 0);
    const Pe = G.id || (E ? `mui-component-select-${E}` : void 0),
      se = { ...t, variant: H, value: Q, open: je, error: y },
      Se = by(se);
    return Xe(g.Fragment, {
      children: [
        _(py, {
          ref: ue,
          tabIndex: Ee,
          role: 'button',
          'aria-disabled': p ? 'true' : void 0,
          'aria-expanded': je ? 'true' : 'false',
          'aria-haspopup': 'listbox',
          'aria-label': a,
          'aria-labelledby': [b, Pe].filter(Boolean).join(' ') || void 0,
          'aria-describedby': r,
          onKeyDown: Re,
          onMouseDown: p || N ? null : Ce,
          onBlur: Je,
          onFocus: w,
          ...G,
          ownerState: se,
          className: xe(G.className, Se.select, c),
          id: Pe,
          children: hy(Ge)
            ? Vs || (Vs = _('span', { className: 'notranslate', children: '​' }))
            : Ge,
        }),
        _(my, {
          'aria-invalid': y,
          value: Array.isArray(Q) ? Q.join(',') : Q,
          name: E,
          ref: X,
          'aria-hidden': !0,
          onChange: Te,
          tabIndex: -1,
          disabled: p,
          className: Se.nativeInput,
          autoFocus: i,
          ownerState: se,
          ...ie,
        }),
        _(fy, { as: v, className: Se.icon, ownerState: se }),
        _(Hv, {
          id: `menu-${E || ''}`,
          anchorEl: me,
          open: je,
          onClose: J,
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          transformOrigin: { vertical: 'top', horizontal: 'center' },
          ...C,
          MenuListProps: {
            'aria-labelledby': b,
            role: 'listbox',
            disableListWrap: !0,
            ...C.MenuListProps,
          },
          PaperProps: {
            ...C.PaperProps,
            style: { minWidth: he, ...(C.PaperProps != null ? C.PaperProps.style : null) },
          },
          children: ye,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Uc.propTypes = {
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
    error: n.bool,
    IconComponent: n.elementType.isRequired,
    inputRef: xt,
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
const gy = Uc,
  vy = (e) => {
    const { classes: t } = e;
    return t;
  },
  ti = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => Wt(e) && e !== 'variant',
    slot: 'Root',
  },
  yy = de($c, ti)(''),
  xy = de(Bc, ti)(''),
  Ey = de(Cc, ti)(''),
  ni = g.forwardRef(function (t, o) {
    const r = Le({ name: 'MuiSelect', props: t }),
      {
        autoWidth: a = !1,
        children: i,
        classes: s = {},
        className: l,
        defaultOpen: c = !1,
        displayEmpty: d = !1,
        IconComponent: u = pc,
        id: p,
        input: h,
        inputProps: y,
        label: v,
        labelId: m,
        MenuProps: b,
        multiple: C = !1,
        native: T = !1,
        onClose: E,
        onOpen: x,
        open: f,
        renderValue: k,
        SelectDisplayProps: w,
        variant: D = 'outlined',
        ...z
      } = r,
      N = T ? oy : gy,
      I = Rn(),
      G = Jn({ props: r, muiFormControl: I, states: ['variant', 'error'] }),
      j = G.variant || D,
      M = { ...r, variant: j, classes: s },
      A = vy(M),
      H =
        h ||
        {
          standard: _(yy, { ownerState: M }),
          outlined: _(xy, { label: v, ownerState: M }),
          filled: _(Ey, { ownerState: M }),
        }[j],
      ie = at(o, H.ref);
    return _(g.Fragment, {
      children: g.cloneElement(H, {
        inputComponent: N,
        inputProps: {
          children: i,
          error: G.error,
          IconComponent: u,
          variant: j,
          type: void 0,
          multiple: C,
          ...(T
            ? { id: p }
            : {
                autoWidth: a,
                defaultOpen: c,
                displayEmpty: d,
                labelId: m,
                MenuProps: b,
                onClose: E,
                onOpen: x,
                open: f,
                renderValue: k,
                SelectDisplayProps: { id: p, ...w },
              }),
          ...y,
          classes: y ? _t(A, y.classes) : A,
          ...(h ? h.props.inputProps : {}),
        },
        ...(C && T && j === 'outlined' ? { notched: !0 } : {}),
        ref: ie,
        className: xe(H.props.className, l),
        ...(!h && { variant: j }),
        ...z,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ni.propTypes = {
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
ni.muiName = 'Select';
const Oy = ni,
  Cy = (e) => !e || !dn(e),
  Ty = Cy;
function wy(e) {
  return Ie('MuiSlider', e);
}
const ky = Ne('MuiSlider', [
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
  zt = ky,
  Sy = (e) => {
    const { open: t } = e;
    return {
      offset: xe(t && zt.valueLabelOpen),
      circle: zt.valueLabelCircle,
      label: zt.valueLabelLabel,
    };
  };
function Wc(e) {
  const { children: t, className: o, value: r } = e,
    a = Sy(e);
  return t
    ? g.cloneElement(
        t,
        { className: xe(t.props.className) },
        Xe(g.Fragment, {
          children: [
            t.props.children,
            _('span', {
              className: xe(a.offset, o),
              'aria-hidden': !0,
              children: _('span', {
                className: a.circle,
                children: _('span', { className: a.label, children: r }),
              }),
            }),
          ],
        }),
      )
    : null;
}
process.env.NODE_ENV !== 'production' &&
  (Wc.propTypes = { children: n.element.isRequired, className: n.string, value: n.node });
function Us(e) {
  return e;
}
const Hc = de('span', {
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
    '@media (pointer: coarse)': { padding: '20px 0' },
    ...(t.size === 'small' && { height: 2 }),
    ...(t.marked && { marginBottom: 20 }),
  }),
  ...(t.orientation === 'vertical' && {
    height: '100%',
    width: 4,
    padding: '0 13px',
    '@media (pointer: coarse)': { padding: '0 20px' },
    ...(t.size === 'small' && { width: 2 }),
    ...(t.marked && { marginRight: 44 }),
  }),
  '@media print': { colorAdjust: 'exact' },
  [`&.${zt.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: (e.vars || e).palette.grey[400],
  },
  [`&.${zt.dragging}`]: { [`& .${zt.thumb}, & .${zt.track}`]: { transition: 'none' } },
}));
process.env.NODE_ENV !== 'production' && (Hc.propTypes = { children: n.node });
const qc = de('span', { name: 'MuiSlider', slot: 'Rail', overridesResolver: (e, t) => t.rail })(
  ({ ownerState: e }) => ({
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
    ...(e.track === 'inverted' && { opacity: 1 }),
  }),
);
process.env.NODE_ENV !== 'production' && (qc.propTypes = { children: n.node });
const Yc = de('span', { name: 'MuiSlider', slot: 'Track', overridesResolver: (e, t) => t.track })(
  ({ theme: e, ownerState: t }) => {
    const o =
      e.palette.mode === 'light'
        ? Tr(e.palette[t.color].main, 0.62)
        : Cr(e.palette[t.color].main, 0.5);
    return {
      display: 'block',
      position: 'absolute',
      borderRadius: 'inherit',
      border: '1px solid currentColor',
      backgroundColor: 'currentColor',
      transition: e.transitions.create(['left', 'width', 'bottom', 'height'], {
        duration: e.transitions.duration.shortest,
      }),
      ...(t.size === 'small' && { border: 'none' }),
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
      ...(t.track === !1 && { display: 'none' }),
      ...(t.track === 'inverted' && {
        backgroundColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : o,
        borderColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : o,
      }),
    };
  },
);
process.env.NODE_ENV !== 'production' && (Yc.propTypes = { children: n.node });
const Kc = de('span', {
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
  ...(t.size === 'small' && { width: 12, height: 12 }),
  ...(t.orientation === 'horizontal' && { top: '50%', transform: 'translate(-50%, -50%)' }),
  ...(t.orientation === 'vertical' && { left: '50%', transform: 'translate(-50%, 50%)' }),
  '&:before': {
    position: 'absolute',
    content: '""',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    boxShadow: (e.vars || e).shadows[2],
    ...(t.size === 'small' && { boxShadow: 'none' }),
  },
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
  [`&:hover, &.${zt.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${
      e.vars
        ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
        : Ye(e.palette[t.color].main, 0.16)
    }`,
    '@media (hover: none)': { boxShadow: 'none' },
  },
  [`&.${zt.active}`]: {
    boxShadow: `0px 0px 0px 14px ${
      e.vars
        ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
        : Ye(e.palette[t.color].main, 0.16)
    }`,
  },
  [`&.${zt.disabled}`]: { '&:hover': { boxShadow: 'none' } },
}));
process.env.NODE_ENV !== 'production' && (Kc.propTypes = { children: n.node });
const Gc = de(Wc, {
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
  transition: e.transitions.create(['transform'], { duration: e.transitions.duration.shortest }),
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
  ...(t.size === 'small' && { fontSize: e.typography.pxToRem(12), padding: '0.25rem 0.5rem' }),
}));
process.env.NODE_ENV !== 'production' && (Gc.propTypes = { children: n.node });
const Xc = de('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => La(e) && e !== 'markActive',
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
  ...(t.orientation === 'horizontal' && { top: '50%', transform: 'translate(-1px, -50%)' }),
  ...(t.orientation === 'vertical' && { left: '50%', transform: 'translate(-50%, 1px)' }),
  ...(o && { backgroundColor: (e.vars || e).palette.background.paper, opacity: 0.8 }),
}));
process.env.NODE_ENV !== 'production' && (Xc.propTypes = { children: n.node });
const Jc = de('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => La(e) && e !== 'markLabelActive',
  overridesResolver: (e, t) => t.markLabel,
})(({ theme: e, ownerState: t, markLabelActive: o }) => ({
  ...e.typography.body2,
  color: (e.vars || e).palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap',
  ...(t.orientation === 'horizontal' && {
    top: 30,
    transform: 'translateX(-50%)',
    '@media (pointer: coarse)': { top: 40 },
  }),
  ...(t.orientation === 'vertical' && {
    left: 36,
    transform: 'translateY(50%)',
    '@media (pointer: coarse)': { left: 44 },
  }),
  ...(o && { color: (e.vars || e).palette.text.primary }),
}));
process.env.NODE_ENV !== 'production' && (Jc.propTypes = { children: n.node });
const Ry = (e) => {
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
      d = {
        root: [
          'root',
          t && 'disabled',
          o && 'dragging',
          r && 'marked',
          a === 'vertical' && 'vertical',
          i === 'inverted' && 'trackInverted',
          i === !1 && 'trackFalse',
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
    return _e(d, wy, s);
  },
  $y = ({ children: e }) => e,
  Zc = g.forwardRef(function (t, o) {
    var r, a, i, s, l, c, d, u, p, h, y, v, m, b, C, T, E, x, f, k, w, D, z, N;
    const I = Le({ props: t, name: 'MuiSlider' }),
      j = Gn().direction === 'rtl',
      {
        'aria-label': M,
        'aria-valuetext': A,
        'aria-labelledby': H,
        component: ie = 'span',
        components: Q = {},
        componentsProps: V = {},
        color: S = 'primary',
        classes: L,
        className: X,
        disableSwap: B = !1,
        disabled: q = !1,
        getAriaLabel: K,
        getAriaValueText: re,
        marks: Z = !1,
        max: ae = 100,
        min: ce = 0,
        name: ue,
        onChange: me,
        onChangeCommitted: P,
        orientation: Ce = 'horizontal',
        size: J = 'medium',
        step: W = 1,
        scale: Te = Us,
        slotProps: pe,
        slots: Re,
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
        max: ae,
        min: ce,
        classes: L,
        disabled: q,
        disableSwap: B,
        orientation: Ce,
        marks: Z,
        color: S,
        size: J,
        step: W,
        scale: Te,
        track: Je,
        valueLabelDisplay: Fe,
        valueLabelFormat: Ze,
      },
      {
        axisProps: ye,
        getRootProps: he,
        getHiddenInputProps: Ee,
        getThumbProps: Pe,
        open: se,
        active: Se,
        axis: U,
        focusedThumbIndex: ve,
        range: we,
        dragging: mt,
        marks: bt,
        values: lt,
        trackOffset: Et,
        trackLeap: Ot,
      } = Xh({ ...te, rootRef: o });
    (te.marked = bt.length > 0 && bt.some((be) => be.label)),
      (te.dragging = mt),
      (te.focusedThumbIndex = ve);
    const Qe = Ry(te),
      ct = (r = (a = Re == null ? void 0 : Re.root) != null ? a : Q.Root) != null ? r : Hc,
      dt = (i = (s = Re == null ? void 0 : Re.rail) != null ? s : Q.Rail) != null ? i : qc,
      Ht = (l = (c = Re == null ? void 0 : Re.track) != null ? c : Q.Track) != null ? l : Yc,
      qt = (d = (u = Re == null ? void 0 : Re.thumb) != null ? u : Q.Thumb) != null ? d : Kc,
      on =
        (p = (h = Re == null ? void 0 : Re.valueLabel) != null ? h : Q.ValueLabel) != null ? p : Gc,
      Ct = (y = (v = Re == null ? void 0 : Re.mark) != null ? v : Q.Mark) != null ? y : Xc,
      Yt =
        (m = (b = Re == null ? void 0 : Re.markLabel) != null ? b : Q.MarkLabel) != null ? m : Jc,
      Kt = (C = (T = Re == null ? void 0 : Re.input) != null ? T : Q.Input) != null ? C : 'input',
      Tt = (E = pe == null ? void 0 : pe.root) != null ? E : V.root,
      hn = (x = pe == null ? void 0 : pe.rail) != null ? x : V.rail,
      rn = (f = pe == null ? void 0 : pe.track) != null ? f : V.track,
      wt = (k = pe == null ? void 0 : pe.thumb) != null ? k : V.thumb,
      Lt = (w = pe == null ? void 0 : pe.valueLabel) != null ? w : V.valueLabel,
      Gt = (D = pe == null ? void 0 : pe.mark) != null ? D : V.mark,
      bn = (z = pe == null ? void 0 : pe.markLabel) != null ? z : V.markLabel,
      st = (N = pe == null ? void 0 : pe.input) != null ? N : V.input,
      O = It({
        elementType: ct,
        getSlotProps: he,
        externalSlotProps: Tt,
        externalForwardedProps: ee,
        additionalProps: { ...(Ty(ct) && { as: ie }) },
        ownerState: { ...te, ...(Tt == null ? void 0 : Tt.ownerState) },
        className: [Qe.root, X],
      }),
      F = It({ elementType: dt, externalSlotProps: hn, ownerState: te, className: Qe.rail }),
      le = It({
        elementType: Ht,
        externalSlotProps: rn,
        additionalProps: { style: { ...ye[U].offset(Et), ...ye[U].leap(Ot) } },
        ownerState: { ...te, ...(rn == null ? void 0 : rn.ownerState) },
        className: Qe.track,
      }),
      R = It({
        elementType: qt,
        getSlotProps: Pe,
        externalSlotProps: wt,
        ownerState: { ...te, ...(wt == null ? void 0 : wt.ownerState) },
        className: Qe.thumb,
      }),
      $ = It({
        elementType: on,
        externalSlotProps: Lt,
        ownerState: { ...te, ...(Lt == null ? void 0 : Lt.ownerState) },
        className: Qe.valueLabel,
      }),
      Y = It({ elementType: Ct, externalSlotProps: Gt, ownerState: te, className: Qe.mark }),
      ne = It({ elementType: Yt, externalSlotProps: bn, ownerState: te, className: Qe.markLabel }),
      fe = It({ elementType: Kt, getSlotProps: Ee, externalSlotProps: st, ownerState: te });
    return Xe(ct, {
      ...O,
      children: [
        _(dt, { ...F }),
        _(Ht, { ...le }),
        bt
          .filter((be) => be.value >= ce && be.value <= ae)
          .map((be, ge) => {
            const ke = tr(be.value, ce, ae),
              Oe = ye[U].offset(ke);
            let ze;
            return (
              Je === !1
                ? (ze = lt.indexOf(be.value) !== -1)
                : (ze =
                    (Je === 'normal' &&
                      (we
                        ? be.value >= lt[0] && be.value <= lt[lt.length - 1]
                        : be.value <= lt[0])) ||
                    (Je === 'inverted' &&
                      (we
                        ? be.value <= lt[0] || be.value >= lt[lt.length - 1]
                        : be.value >= lt[0]))),
              Xe(
                g.Fragment,
                {
                  children: [
                    _(Ct, {
                      'data-index': ge,
                      ...Y,
                      ...(!dn(Ct) && { markActive: ze }),
                      style: { ...Oe, ...Y.style },
                      className: xe(Y.className, ze && Qe.markActive),
                    }),
                    be.label != null
                      ? _(Yt, {
                          'aria-hidden': !0,
                          'data-index': ge,
                          ...ne,
                          ...(!dn(Yt) && { markLabelActive: ze }),
                          style: { ...Oe, ...ne.style },
                          className: xe(Qe.markLabel, ne.className, ze && Qe.markLabelActive),
                          children: be.label,
                        })
                      : null,
                  ],
                },
                ge,
              )
            );
          }),
        lt.map((be, ge) => {
          const ke = tr(be, ce, ae),
            Oe = ye[U].offset(ke),
            ze = Fe === 'off' ? $y : on;
          return _(
            ze,
            {
              ...(!dn(ze) && {
                valueLabelFormat: Ze,
                valueLabelDisplay: Fe,
                value: typeof Ze == 'function' ? Ze(Te(be), ge) : Ze,
                index: ge,
                open: se === ge || Se === ge || Fe === 'on',
                disabled: q,
              }),
              ...$,
              children: _(qt, {
                'data-index': ge,
                ...R,
                className: xe(
                  Qe.thumb,
                  R.className,
                  Se === ge && Qe.active,
                  ve === ge && Qe.focusVisible,
                ),
                style: { ...Oe, pointerEvents: B && Se !== ge ? 'none' : void 0, ...R.style },
                children: _(Kt, {
                  'data-index': ge,
                  'aria-label': K ? K(ge) : M,
                  'aria-valuenow': Te(be),
                  'aria-labelledby': H,
                  'aria-valuetext': re ? re(Te(be), ge) : A,
                  value: lt[ge],
                  ...fe,
                }),
              }),
            },
            ge,
          );
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Zc.propTypes = {
    'aria-label': Bt(n.string, (e) =>
      Array.isArray(e.value || e.defaultValue) && e['aria-label'] != null
        ? new Error(
            'MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
          )
        : null,
    ),
    'aria-labelledby': n.string,
    'aria-valuetext': Bt(n.string, (e) =>
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
const Ny = Zc;
function Py(e) {
  return Ie('MuiSnackbarContent', e);
}
Ne('MuiSnackbarContent', ['root', 'message', 'action']);
const Iy = (e) => {
    const { classes: t } = e;
    return _e({ root: ['root'], action: ['action'], message: ['message'] }, Py, t);
  },
  My = de(No, { name: 'MuiSnackbarContent', slot: 'Root', overridesResolver: (e, t) => t.root })(
    ({ theme: e }) => {
      const t = e.palette.mode === 'light' ? 0.8 : 0.98,
        o = If(e.palette.background.default, t);
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
        [e.breakpoints.up('sm')]: { flexGrow: 'initial', minWidth: 288 },
      };
    },
  ),
  _y = de('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({ padding: '8px 0' }),
  Ay = de('div', {
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
  Qc = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiSnackbarContent' }),
      { action: a, className: i, message: s, role: l = 'alert', ...c } = r,
      d = r,
      u = Iy(d);
    return Xe(My, {
      role: l,
      square: !0,
      elevation: 6,
      className: xe(u.root, i),
      ownerState: d,
      ref: o,
      ...c,
      children: [
        _(_y, { className: u.message, ownerState: d, children: s }),
        a ? _(Ay, { className: u.action, ownerState: d, children: a }) : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Qc.propTypes = {
    action: n.node,
    classes: n.object,
    className: n.string,
    message: n.node,
    role: n.string,
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const Dy = Qc;
function Ly(e) {
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
const jy = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = { root: ['root', `anchorOrigin${oe(o.vertical)}${oe(o.horizontal)}`] };
    return _e(r, Ly, t);
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
    const o = { left: '50%', right: 'auto', transform: 'translateX(-50%)' };
    return {
      zIndex: (e.vars || e).zIndex.snackbar,
      position: 'fixed',
      display: 'flex',
      left: 8,
      right: 8,
      justifyContent: 'center',
      alignItems: 'center',
      ...(t.anchorOrigin.vertical === 'top' ? { top: 8 } : { bottom: 8 }),
      ...(t.anchorOrigin.horizontal === 'left' && { justifyContent: 'flex-start' }),
      ...(t.anchorOrigin.horizontal === 'right' && { justifyContent: 'flex-end' }),
      [e.breakpoints.up('sm')]: {
        ...(t.anchorOrigin.vertical === 'top' ? { top: 24 } : { bottom: 24 }),
        ...(t.anchorOrigin.horizontal === 'center' && o),
        ...(t.anchorOrigin.horizontal === 'left' && { left: 24, right: 'auto' }),
        ...(t.anchorOrigin.horizontal === 'right' && { right: 24, left: 'auto' }),
      },
    };
  }),
  eu = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiSnackbar' }),
      a = Gn(),
      i = {
        enter: a.transitions.duration.enteringScreen,
        exit: a.transitions.duration.leavingScreen,
      },
      {
        action: s,
        anchorOrigin: { vertical: l, horizontal: c } = { vertical: 'bottom', horizontal: 'left' },
        autoHideDuration: d = null,
        children: u,
        className: p,
        ClickAwayListenerProps: h,
        ContentProps: y,
        disableWindowBlurListener: v = !1,
        message: m,
        onBlur: b,
        onClose: C,
        onFocus: T,
        onMouseEnter: E,
        onMouseLeave: x,
        open: f,
        resumeHideDuration: k,
        TransitionComponent: w = Rc,
        transitionDuration: D = i,
        TransitionProps: { onEnter: z, onExited: N, ...I } = {},
        ...G
      } = r,
      j = {
        ...r,
        anchorOrigin: { vertical: l, horizontal: c },
        autoHideDuration: d,
        disableWindowBlurListener: v,
        TransitionComponent: w,
        transitionDuration: D,
      },
      M = jy(j),
      { getRootProps: A, onClickAway: H } = Jh({ ...j }),
      [ie, Q] = g.useState(!0),
      V = It({
        elementType: Ws,
        getSlotProps: A,
        externalForwardedProps: G,
        ownerState: j,
        additionalProps: { ref: o },
        className: [M.root, p],
      }),
      S = (X) => {
        Q(!0), N && N(X);
      },
      L = (X, B) => {
        Q(!1), z && z(X, B);
      };
    return !f && ie
      ? null
      : _(Xo, {
          onClickAway: H,
          ...h,
          children: _(Ws, {
            ...V,
            children: _(w, {
              appear: !0,
              in: f,
              timeout: D,
              direction: l === 'top' ? 'down' : 'up',
              onEnter: L,
              onExited: S,
              ...I,
              children: u || _(Dy, { message: m, action: s, ...y }),
            }),
          }),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (eu.propTypes = {
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
const Fy = eu;
function zy(e) {
  return Ie('MuiSwitch', e);
}
const Vy = Ne('MuiSwitch', [
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
  ht = Vy,
  By = (e) => {
    const { classes: t, edge: o, size: r, color: a, checked: i, disabled: s } = e,
      l = {
        root: ['root', o && `edge${oe(o)}`, `size${oe(r)}`],
        switchBase: ['switchBase', `color${oe(a)}`, i && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = _e(l, zy, t);
    return { ...t, ...c };
  },
  Uy = de('span', {
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
    verticalAlign: 'middle',
    '@media print': { colorAdjust: 'exact' },
    ...(e.edge === 'start' && { marginLeft: -8 }),
    ...(e.edge === 'end' && { marginRight: -8 }),
    ...(e.size === 'small' && {
      width: 40,
      height: 24,
      padding: 7,
      [`& .${ht.thumb}`]: { width: 16, height: 16 },
      [`& .${ht.switchBase}`]: {
        padding: 4,
        [`&.${ht.checked}`]: { transform: 'translateX(16px)' },
      },
    }),
  })),
  Wy = de(xc, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        { [`& .${ht.input}`]: t.input },
        o.color !== 'default' && t[`color${oe(o.color)}`],
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
      [`&.${ht.checked}`]: { transform: 'translateX(20px)' },
      [`&.${ht.disabled}`]: {
        color: e.vars
          ? e.vars.palette.Switch.defaultDisabledColor
          : `${e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[600]}`,
      },
      [`&.${ht.checked} + .${ht.track}`]: { opacity: 0.5 },
      [`&.${ht.disabled} + .${ht.track}`]: {
        opacity: e.vars
          ? e.vars.opacity.switchTrackDisabled
          : `${e.palette.mode === 'light' ? 0.12 : 0.2}`,
      },
      [`& .${ht.input}`]: { left: '-100%', width: '300%' },
    }),
    ({ theme: e, ownerState: t }) => ({
      '&:hover': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
          : Ye(e.palette.action.active, e.palette.action.hoverOpacity),
        '@media (hover: none)': { backgroundColor: 'transparent' },
      },
      ...(t.color !== 'default' && {
        [`&.${ht.checked}`]: {
          color: (e.vars || e).palette[t.color].main,
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                  e.vars.palette.action.hoverOpacity
                })`
              : Ye(e.palette[t.color].main, e.palette.action.hoverOpacity),
            '@media (hover: none)': { backgroundColor: 'transparent' },
          },
          [`&.${ht.disabled}`]: {
            color: e.vars
              ? e.vars.palette.Switch[`${t.color}DisabledColor`]
              : `${
                  e.palette.mode === 'light'
                    ? Tr(e.palette[t.color].main, 0.62)
                    : Cr(e.palette[t.color].main, 0.55)
                }`,
          },
        },
        [`&.${ht.checked} + .${ht.track}`]: {
          backgroundColor: (e.vars || e).palette[t.color].main,
        },
      }),
    }),
  ),
  Hy = de('span', { name: 'MuiSwitch', slot: 'Track', overridesResolver: (e, t) => t.track })(
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
  qy = de('span', { name: 'MuiSwitch', slot: 'Thumb', overridesResolver: (e, t) => t.thumb })(
    ({ theme: e }) => ({
      boxShadow: (e.vars || e).shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%',
    }),
  ),
  tu = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiSwitch' }),
      { className: a, color: i = 'primary', edge: s = !1, size: l = 'medium', sx: c, ...d } = r,
      u = { ...r, color: i, edge: s, size: l },
      p = By(u),
      h = _(qy, { className: p.thumb, ownerState: u });
    return Xe(Uy, {
      className: xe(p.root, a),
      sx: c,
      ownerState: u,
      children: [
        _(Wy, {
          type: 'checkbox',
          icon: h,
          checkedIcon: h,
          ref: o,
          ownerState: u,
          ...d,
          classes: { ...p, root: p.switchBase },
        }),
        _(Hy, { className: p.track, ownerState: u }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (tu.propTypes = {
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
    inputRef: xt,
    onChange: n.func,
    required: n.bool,
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    value: n.any,
  });
const Yy = tu;
function Ky(e) {
  return Ie('MuiTextField', e);
}
Ne('MuiTextField', ['root']);
const Gy = { standard: $c, filled: Cc, outlined: Bc },
  Xy = (e) => {
    const { classes: t } = e;
    return _e({ root: ['root'] }, Ky, t);
  },
  Jy = de(sv, { name: 'MuiTextField', slot: 'Root', overridesResolver: (e, t) => t.root })({}),
  nu = g.forwardRef(function (t, o) {
    const r = Le({ props: t, name: 'MuiTextField' }),
      {
        autoComplete: a,
        autoFocus: i = !1,
        children: s,
        className: l,
        color: c = 'primary',
        defaultValue: d,
        disabled: u = !1,
        error: p = !1,
        FormHelperTextProps: h,
        fullWidth: y = !1,
        helperText: v,
        id: m,
        InputLabelProps: b,
        inputProps: C,
        InputProps: T,
        inputRef: E,
        label: x,
        maxRows: f,
        minRows: k,
        multiline: w = !1,
        name: D,
        onBlur: z,
        onChange: N,
        onClick: I,
        onFocus: G,
        placeholder: j,
        required: M = !1,
        rows: A,
        select: H = !1,
        SelectProps: ie,
        type: Q,
        value: V,
        variant: S = 'outlined',
        ...L
      } = r,
      X = {
        ...r,
        autoFocus: i,
        color: c,
        disabled: u,
        error: p,
        fullWidth: y,
        multiline: w,
        required: M,
        select: H,
        variant: S,
      },
      B = Xy(X);
    process.env.NODE_ENV !== 'production' &&
      H &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const q = {};
    S === 'outlined' && (b && typeof b.shrink < 'u' && (q.notched = b.shrink), (q.label = x)),
      H && ((!ie || !ie.native) && (q.id = void 0), (q['aria-describedby'] = void 0));
    const K = il(m),
      re = v && K ? `${K}-helper-text` : void 0,
      Z = x && K ? `${K}-label` : void 0,
      ae = Gy[S],
      ce = _(ae, {
        'aria-describedby': re,
        autoComplete: a,
        autoFocus: i,
        defaultValue: d,
        fullWidth: y,
        multiline: w,
        name: D,
        rows: A,
        maxRows: f,
        minRows: k,
        type: Q,
        value: V,
        id: K,
        inputRef: E,
        onBlur: z,
        onChange: N,
        onFocus: G,
        onClick: I,
        placeholder: j,
        inputProps: C,
        ...q,
        ...T,
      });
    return Xe(Jy, {
      className: xe(B.root, l),
      disabled: u,
      error: p,
      fullWidth: y,
      ref: o,
      required: M,
      color: c,
      variant: S,
      ownerState: X,
      ...L,
      children: [
        x != null && x !== '' && _(wv, { htmlFor: K, id: Z, ...b, children: x }),
        H
          ? _(Oy, {
              'aria-describedby': re,
              id: K,
              labelId: Z,
              value: V,
              input: ce,
              ...ie,
              children: s,
            })
          : ce,
        v && _(pv, { id: re, ...h, children: v }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (nu.propTypes = {
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
    inputRef: xt,
    label: n.node,
    margin: n.oneOf(['dense', 'none', 'normal']),
    maxRows: n.oneOfType([n.number, n.string]),
    minRows: n.oneOfType([n.number, n.string]),
    multiline: n.bool,
    name: n.string,
    onBlur: n.func,
    onChange: n.func,
    onClick: n.func,
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
const ou = nu;
function xn({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: a }) {
  return _(Ag, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: a,
  });
}
var En = ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(En || {});
function ru({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = En.After,
  isIndeterminate: r = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const d = _(Xg, {
    checked: e,
    indeterminate: r,
    defaultChecked: a,
    disabled: i,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let u;
  if (t) {
    const p = o === En.Before || o === En.Above,
      h = _('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      y = o === En.Before || o === En.After,
      v = y ? h : _('div', { children: h }),
      m = y ? d : _('div', { children: d });
    u = Xe(Sc, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: i,
      error: s,
      children: [p && v, m, !p && v],
    });
  } else u = d;
  return u;
}
function au({
  title: e,
  isDisabled: t = !1,
  isClearable: o = !0,
  hasError: r = !1,
  isFullWidth: a = !1,
  width: i,
  options: s = [],
  className: l,
  value: c,
  onChange: d,
  onFocus: u,
  onBlur: p,
}) {
  return _(Eg, {
    disablePortal: !0,
    disabled: t,
    disableClearable: !o,
    fullWidth: a,
    options: s,
    className: `papi-combo-box ${r ? 'error' : ''} ${l ?? ''}`,
    value: c,
    onChange: d,
    onFocus: u,
    onBlur: p,
    renderInput: (h) =>
      _(ou, { ...h, error: r, fullWidth: a, disabled: t, label: e, style: { width: i } }),
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
  oi = 1,
  iu = Zn.length - 1,
  su = 1,
  lu = 1,
  Zy = (e) => Zn.findIndex((t) => t.fullNames.includes(e)),
  Hs = (e) => Zn[e < oi || e > iu ? 0 : e].fullNames[0],
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
  Qy = (e) => Zn[e].chapters,
  Ys = (e, t) => ({ book: Math.max(oi, Math.min(e.book + t, iu)), chapter: 1, verse: 1 }),
  Ks = (e, t) => ({
    ...e,
    chapter: Math.min(Math.max(su, e.chapter + t), Zn[e.book].chapters),
    verse: 1,
  }),
  Gs = (e, t) => ({ ...e, verse: Math.max(lu, e.verse + t) });
function ar({
  variant: e = 'outlined',
  isDisabled: t = !1,
  hasError: o = !1,
  isFullWidth: r = !1,
  helperText: a,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: u,
  onChange: p,
  onFocus: h,
  onBlur: y,
}) {
  return _(ou, {
    variant: e,
    disabled: t,
    error: o,
    fullWidth: r,
    helperText: a,
    label: i,
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
function e0({ scrRef: e, handleSubmit: t }) {
  const [o, r] = et.useState(Hs(e.book)),
    a = (c) => {
      r(Hs(c.book)), t(c);
    },
    i = (c, d) => {
      const p = { book: Zy(d), chapter: 1, verse: 1 };
      a(p);
    },
    s = (c) => {
      t({ ...e, chapter: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verse: +c.target.value });
    };
  return Xe(pu, {
    children: [
      _(au, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: qs(),
        onChange: i,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      _(xn, { onClick: () => a(Ys(e, -1)), isDisabled: e.book <= oi, children: '<' }),
      _(xn, { onClick: () => a(Ys(e, 1)), isDisabled: e.book >= qs().length, children: '>' }),
      _(ar, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapter,
        onChange: s,
      }),
      _(xn, { onClick: () => t(Ks(e, -1)), isDisabled: e.chapter <= su, children: '<' }),
      _(xn, { onClick: () => t(Ks(e, 1)), isDisabled: e.chapter >= Qy(e.book), children: '>' }),
      _(ar, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verse,
        onChange: l,
      }),
      _(xn, { onClick: () => t(Gs(e, -1)), isDisabled: e.verse <= lu, children: '<' }),
      _(xn, { onClick: () => t(Gs(e, 1)), children: '>' }),
    ],
  });
}
function t0({
  isDisabled: e = !1,
  orientation: t = 'horizontal',
  min: o = 0,
  max: r = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: s,
  valueLabelDisplay: l = 'off',
  className: c,
  onChange: d,
  onChangeCommitted: u,
}) {
  return _(Ny, {
    disabled: e,
    orientation: t,
    min: o,
    max: r,
    step: a,
    marks: i,
    defaultValue: s,
    valueLabelDisplay: l,
    className: `papi-slider ${t} ${c ?? ''}`,
    onChange: d,
    onChangeCommitted: u,
  });
}
function n0({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: a }) {
  return _(Yy, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: a,
  });
}
function o0({
  autoHideDuration: e = null,
  isOpen: t = !1,
  className: o,
  onClose: r,
  anchorOrigin: a = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: i = { action: '', message: '', className: `papi-snackbar ${o ?? ''}` },
  children: s,
}) {
  return _(Fy, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: a,
    ContentProps: i,
    children: s,
  });
}
function r0({
  hasAutoFocus: e = !1,
  className: t,
  isDense: o = !1,
  hasDisabledGutters: r = !1,
  hasDivider: a = !1,
  focusVisibleClassName: i,
  onClick: s,
  children: l,
}) {
  return _(Jv, {
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
function Xs({ onRowChange: e, row: t, column: o }) {
  const r = (a) => {
    e({ ...t, [o.key]: a.target.value });
  };
  return _(ar, { defaultValue: t[o.key], onChange: r });
}
const a0 = ({ onChange: e, disabled: t, checked: o, ...r }) => {
  function a(i) {
    e(i.target.checked, i.nativeEvent.shiftKey);
  }
  return _(ru, { ...r, isChecked: o, isDisabled: t, onChange: a });
};
function i0({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: o,
  onColumnResize: r,
  defaultColumnWidth: a,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: d,
  enableSelectColumn: u,
  selectColumnWidth: p = 50,
  rowKeyGetter: h,
  rowHeight: y = 35,
  headerRowHeight: v = 35,
  selectedRows: m,
  onSelectedRowsChange: b,
  onRowsChange: C,
  onCellClick: T,
  onCellDoubleClick: E,
  onCellContextMenu: x,
  onCellKeyDown: f,
  direction: k = 'ltr',
  enableVirtualization: w = !0,
  onCopy: D,
  onPaste: z,
  onScroll: N,
  className: I,
}) {
  const G = et.useMemo(() => {
    const j = e.map((M) =>
      typeof M.editable == 'function'
        ? { ...M, editable: (H) => !!M.editable(H), renderEditCell: M.renderEditCell || Xs }
        : M.editable && !M.renderEditCell
        ? { ...M, renderEditCell: Xs }
        : M.renderEditCell && !M.editable
        ? { ...M, editable: !1 }
        : M,
    );
    return u ? [{ ...ri.SelectColumn, minWidth: p }, ...j] : j;
  }, [u, e]);
  return _(ri, {
    columns: G,
    defaultColumnOptions: { width: a, minWidth: i, maxWidth: s, sortable: l, resizable: c },
    sortColumns: t,
    onSortColumnsChange: o,
    onColumnResize: r,
    rows: d,
    rowKeyGetter: h,
    rowHeight: y,
    headerRowHeight: v,
    selectedRows: m,
    onSelectedRowsChange: b,
    onRowsChange: C,
    onCellClick: T,
    onCellDoubleClick: E,
    onCellContextMenu: x,
    onCellKeyDown: f,
    direction: k,
    enableVirtualization: w,
    onCopy: D,
    onPaste: z,
    onScroll: N,
    renderers: { renderCheckbox: a0 },
    className: `${I ?? 'rdg-light'}`,
  });
}
exports.Button = xn;
exports.Checkbox = ru;
exports.ComboBox = au;
exports.LabelPosition = En;
exports.MenuItem = r0;
exports.RefSelector = e0;
exports.Slider = t0;
exports.Snackbar = o0;
exports.Switch = n0;
exports.Table = i0;
exports.TextField = ar;
function s0(e, t = 'top') {
  if (!e || typeof document > 'u') return;
  const o = document.head || document.querySelector('head'),
    r = o.querySelector(':first-child'),
    a = document.createElement('style');
  a.appendChild(document.createTextNode(e)),
    t === 'top' && r ? o.insertBefore(a, r) : o.appendChild(a);
}
s0(
  `.papi-combo-box {
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
.papi-menu-item {
  line-height: 0.8;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
