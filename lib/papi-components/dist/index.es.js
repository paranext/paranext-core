import * as x from 'react';
import zt, {
  useLayoutEffect as ru,
  forwardRef as iu,
  useContext as Oo,
  createContext as Zs,
  createElement as mn,
  Fragment as pi,
  useRef as au,
  Children as su,
  isValidElement as zo,
  cloneElement as Bo,
  useState as lu,
  useMemo as cu,
} from 'react';
import * as Qs from 'react-dom';
import ko from 'react-dom';
import uu, { SelectColumn as du } from 'react-data-grid';
function pu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var Kr = { exports: {} },
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
function fu() {
  if (aa) return Qn;
  aa = 1;
  var e = zt,
    t = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    r = Object.prototype.hasOwnProperty,
    i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, c, u) {
    var d,
      f = {},
      b = null,
      g = null;
    u !== void 0 && (b = '' + u),
      c.key !== void 0 && (b = '' + c.key),
      c.ref !== void 0 && (g = c.ref);
    for (d in c) r.call(c, d) && !a.hasOwnProperty(d) && (f[d] = c[d]);
    if (l && l.defaultProps) for (d in ((c = l.defaultProps), c)) f[d] === void 0 && (f[d] = c[d]);
    return { $$typeof: t, type: l, key: b, ref: g, props: f, _owner: i.current };
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
function mu() {
  return (
    sa ||
      ((sa = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = zt,
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
            f = Symbol.for('react.memo'),
            b = Symbol.for('react.lazy'),
            g = Symbol.for('react.offscreen'),
            y = Symbol.iterator,
            h = '@@iterator';
          function m(O) {
            if (O === null || typeof O != 'object') return null;
            var q = (y && O[y]) || O[h];
            return typeof q == 'function' ? q : null;
          }
          var C = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function S(O) {
            {
              for (var q = arguments.length, ce = new Array(q > 1 ? q - 1 : 0), P = 1; P < q; P++)
                ce[P - 1] = arguments[P];
              T('error', O, ce);
            }
          }
          function T(O, q, ce) {
            {
              var P = C.ReactDebugCurrentFrame,
                N = P.getStackAddendum();
              N !== '' && ((q += '%s'), (ce = ce.concat([N])));
              var Y = ce.map(function (ee) {
                return String(ee);
              });
              Y.unshift('Warning: ' + q), Function.prototype.apply.call(console[O], console, Y);
            }
          }
          var E = !1,
            p = !1,
            R = !1,
            w = !1,
            V = !1,
            D;
          D = Symbol.for('react.module.reference');
          function A(O) {
            return !!(
              typeof O == 'string' ||
              typeof O == 'function' ||
              O === r ||
              O === a ||
              V ||
              O === i ||
              O === u ||
              O === d ||
              w ||
              O === g ||
              E ||
              p ||
              R ||
              (typeof O == 'object' &&
                O !== null &&
                (O.$$typeof === b ||
                  O.$$typeof === f ||
                  O.$$typeof === s ||
                  O.$$typeof === l ||
                  O.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  O.$$typeof === D ||
                  O.getModuleId !== void 0))
            );
          }
          function _(O, q, ce) {
            var P = O.displayName;
            if (P) return P;
            var N = q.displayName || q.name || '';
            return N !== '' ? ce + '(' + N + ')' : ce;
          }
          function K(O) {
            return O.displayName || 'Context';
          }
          function B(O) {
            if (O == null) return null;
            if (
              (typeof O.tag == 'number' &&
                S(
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
                  var q = O;
                  return K(q) + '.Consumer';
                case s:
                  var ce = O;
                  return K(ce._context) + '.Provider';
                case c:
                  return _(O, O.render, 'ForwardRef');
                case f:
                  var P = O.displayName || null;
                  return P !== null ? P : B(O.type) || 'Memo';
                case b: {
                  var N = O,
                    Y = N._payload,
                    ee = N._init;
                  try {
                    return B(ee(Y));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var M = Object.assign,
            j = 0,
            z,
            le,
            ie,
            G,
            $,
            F,
            X;
          function H() {}
          H.__reactDisabledLog = !0;
          function U() {
            {
              if (j === 0) {
                (z = console.log),
                  (le = console.info),
                  (ie = console.warn),
                  (G = console.error),
                  ($ = console.group),
                  (F = console.groupCollapsed),
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
              j++;
            }
          }
          function te() {
            {
              if ((j--, j === 0)) {
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
                    value: le,
                  }),
                  warn: M({}, O, {
                    value: ie,
                  }),
                  error: M({}, O, {
                    value: G,
                  }),
                  group: M({}, O, {
                    value: $,
                  }),
                  groupCollapsed: M({}, O, {
                    value: F,
                  }),
                  groupEnd: M({}, O, {
                    value: X,
                  }),
                });
              }
              j < 0 &&
                S('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var ne = C.ReactCurrentDispatcher,
            J;
          function re(O, q, ce) {
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
                O
              );
            }
          }
          var se = !1,
            me;
          {
            var oe = typeof WeakMap == 'function' ? WeakMap : Map;
            me = new oe();
          }
          function k(O, q) {
            if (!O || se) return '';
            {
              var ce = me.get(O);
              if (ce !== void 0) return ce;
            }
            var P;
            se = !0;
            var N = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var Y;
            (Y = ne.current), (ne.current = null), U();
            try {
              if (q) {
                var ee = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(ee.prototype, 'props', {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == 'object' && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(ee, []);
                  } catch (sn) {
                    P = sn;
                  }
                  Reflect.construct(O, [], ee);
                } else {
                  try {
                    ee.call();
                  } catch (sn) {
                    P = sn;
                  }
                  O.call(ee.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (sn) {
                  P = sn;
                }
                O();
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
                            O.displayName &&
                              ht.includes('<anonymous>') &&
                              (ht = ht.replace('<anonymous>', O.displayName)),
                            typeof O == 'function' && me.set(O, ht),
                            ht
                          );
                        }
                      while (Se >= 1 && Ie >= 0);
                    break;
                  }
              }
            } finally {
              (se = !1), (ne.current = Y), te(), (Error.prepareStackTrace = N);
            }
            var Nn = O ? O.displayName || O.name : '',
              ia = Nn ? re(Nn) : '';
            return typeof O == 'function' && me.set(O, ia), ia;
          }
          function Ee(O, q, ce) {
            return k(O, !1);
          }
          function I(O) {
            var q = O.prototype;
            return !!(q && q.isReactComponent);
          }
          function W(O, q, ce) {
            if (O == null) return '';
            if (typeof O == 'function') return k(O, I(O));
            if (typeof O == 'string') return re(O);
            switch (O) {
              case u:
                return re('Suspense');
              case d:
                return re('SuspenseList');
            }
            if (typeof O == 'object')
              switch (O.$$typeof) {
                case c:
                  return Ee(O.render);
                case f:
                  return W(O.type, q, ce);
                case b: {
                  var P = O,
                    N = P._payload,
                    Y = P._init;
                  try {
                    return W(Y(N), q, ce);
                  } catch {}
                }
              }
            return '';
          }
          var $e = Object.prototype.hasOwnProperty,
            ve = {},
            Xe = C.ReactDebugCurrentFrame;
          function Me(O) {
            if (O) {
              var q = O._owner,
                ce = W(O.type, O._source, q ? q.type : null);
              Xe.setExtraStackFrame(ce);
            } else Xe.setExtraStackFrame(null);
          }
          function Ce(O, q, ce, P, N) {
            {
              var Y = Function.call.bind($e);
              for (var ee in O)
                if (Y(O, ee)) {
                  var de = void 0;
                  try {
                    if (typeof O[ee] != 'function') {
                      var we = Error(
                        (P || 'React class') +
                          ': ' +
                          ce +
                          ' type `' +
                          ee +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof O[ee] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((we.name = 'Invariant Violation'), we);
                    }
                    de = O[ee](q, ee, P, ce, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (Se) {
                    de = Se;
                  }
                  de &&
                    !(de instanceof Error) &&
                    (Me(N),
                    S(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      P || 'React class',
                      ce,
                      ee,
                      typeof de,
                    ),
                    Me(null)),
                    de instanceof Error &&
                      !(de.message in ve) &&
                      ((ve[de.message] = !0),
                      Me(N),
                      S('Failed %s type: %s', ce, de.message),
                      Me(null));
                }
            }
          }
          var Re = Array.isArray;
          function Je(O) {
            return Re(O);
          }
          function ot(O) {
            {
              var q = typeof Symbol == 'function' && Symbol.toStringTag,
                ce = (q && O[Symbol.toStringTag]) || O.constructor.name || 'Object';
              return ce;
            }
          }
          function Z(O) {
            try {
              return fe(O), !1;
            } catch {
              return !0;
            }
          }
          function fe(O) {
            return '' + O;
          }
          function ge(O) {
            if (Z(O))
              return (
                S(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  ot(O),
                ),
                fe(O)
              );
          }
          var be = C.ReactCurrentOwner,
            pe = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            ue,
            Q,
            ye;
          ye = {};
          function xe(O) {
            if ($e.call(O, 'ref')) {
              var q = Object.getOwnPropertyDescriptor(O, 'ref').get;
              if (q && q.isReactWarning) return !1;
            }
            return O.ref !== void 0;
          }
          function Ne(O) {
            if ($e.call(O, 'key')) {
              var q = Object.getOwnPropertyDescriptor(O, 'key').get;
              if (q && q.isReactWarning) return !1;
            }
            return O.key !== void 0;
          }
          function rt(O, q) {
            if (typeof O.ref == 'string' && be.current && q && be.current.stateNode !== q) {
              var ce = B(be.current.type);
              ye[ce] ||
                (S(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  B(be.current.type),
                  O.ref,
                ),
                (ye[ce] = !0));
            }
          }
          function ct(O, q) {
            {
              var ce = function () {
                ue ||
                  ((ue = !0),
                  S(
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
          function xt(O, q) {
            {
              var ce = function () {
                Q ||
                  ((Q = !0),
                  S(
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
          var un = function (O, q, ce, P, N, Y, ee) {
            var de = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: O,
              key: q,
              ref: ce,
              props: ee,
              // Record the component responsible for creating this element.
              _owner: Y,
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
          function Et(O, q, ce, P, N) {
            {
              var Y,
                ee = {},
                de = null,
                we = null;
              ce !== void 0 && (ge(ce), (de = '' + ce)),
                Ne(q) && (ge(q.key), (de = '' + q.key)),
                xe(q) && ((we = q.ref), rt(q, N));
              for (Y in q) $e.call(q, Y) && !pe.hasOwnProperty(Y) && (ee[Y] = q[Y]);
              if (O && O.defaultProps) {
                var Se = O.defaultProps;
                for (Y in Se) ee[Y] === void 0 && (ee[Y] = Se[Y]);
              }
              if (de || we) {
                var Ie = typeof O == 'function' ? O.displayName || O.name || 'Unknown' : O;
                de && ct(ee, Ie), we && xt(ee, Ie);
              }
              return un(O, de, we, N, P, be.current, ee);
            }
          }
          var mt = C.ReactCurrentOwner,
            vt = C.ReactDebugCurrentFrame;
          function ut(O) {
            if (O) {
              var q = O._owner,
                ce = W(O.type, O._source, q ? q.type : null);
              vt.setExtraStackFrame(ce);
            } else vt.setExtraStackFrame(null);
          }
          var Ze;
          Ze = !1;
          function tt(O) {
            return typeof O == 'object' && O !== null && O.$$typeof === t;
          }
          function dt() {
            {
              if (mt.current) {
                var O = B(mt.current.type);
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
          function yn(O) {
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
          var qt = {};
          function dn(O) {
            {
              var q = dt();
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
          function Ft(O, q) {
            {
              if (!O._store || O._store.validated || O.key != null) return;
              O._store.validated = !0;
              var ce = dn(q);
              if (qt[ce]) return;
              qt[ce] = !0;
              var P = '';
              O &&
                O._owner &&
                O._owner !== mt.current &&
                (P = ' It was passed a child from ' + B(O._owner.type) + '.'),
                ut(O),
                S(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  ce,
                  P,
                ),
                ut(null);
            }
          }
          function nn(O, q) {
            {
              if (typeof O != 'object') return;
              if (Je(O))
                for (var ce = 0; ce < O.length; ce++) {
                  var P = O[ce];
                  tt(P) && Ft(P, q);
                }
              else if (tt(O)) O._store && (O._store.validated = !0);
              else if (O) {
                var N = m(O);
                if (typeof N == 'function' && N !== O.entries)
                  for (var Y = N.call(O), ee; !(ee = Y.next()).done; )
                    tt(ee.value) && Ft(ee.value, q);
              }
            }
          }
          function on(O) {
            {
              var q = O.type;
              if (q == null || typeof q == 'string') return;
              var ce;
              if (typeof q == 'function') ce = q.propTypes;
              else if (
                typeof q == 'object' &&
                (q.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  q.$$typeof === f)
              )
                ce = q.propTypes;
              else return;
              if (ce) {
                var P = B(q);
                Ce(ce, O.props, 'prop', P, O);
              } else if (q.PropTypes !== void 0 && !Ze) {
                Ze = !0;
                var N = B(q);
                S(
                  'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                  N || 'Unknown',
                );
              }
              typeof q.getDefaultProps == 'function' &&
                !q.getDefaultProps.isReactClassApproved &&
                S(
                  'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.',
                );
            }
          }
          function rn(O) {
            {
              for (var q = Object.keys(O.props), ce = 0; ce < q.length; ce++) {
                var P = q[ce];
                if (P !== 'children' && P !== 'key') {
                  ut(O),
                    S(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      P,
                    ),
                    ut(null);
                  break;
                }
              }
              O.ref !== null &&
                (ut(O), S('Invalid attribute `ref` supplied to `React.Fragment`.'), ut(null));
            }
          }
          function Yt(O, q, ce, P, N, Y) {
            {
              var ee = A(O);
              if (!ee) {
                var de = '';
                (O === void 0 ||
                  (typeof O == 'object' && O !== null && Object.keys(O).length === 0)) &&
                  (de +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var we = yn(N);
                we ? (de += we) : (de += dt());
                var Se;
                O === null
                  ? (Se = 'null')
                  : Je(O)
                  ? (Se = 'array')
                  : O !== void 0 && O.$$typeof === t
                  ? ((Se = '<' + (B(O.type) || 'Unknown') + ' />'),
                    (de = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (Se = typeof O),
                  S(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    Se,
                    de,
                  );
              }
              var Ie = Et(O, q, ce, N, Y);
              if (Ie == null) return Ie;
              if (ee) {
                var ht = q.children;
                if (ht !== void 0)
                  if (P)
                    if (Je(ht)) {
                      for (var Nn = 0; Nn < ht.length; Nn++) nn(ht[Nn], O);
                      Object.freeze && Object.freeze(ht);
                    } else
                      S(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else nn(ht, O);
              }
              return O === r ? rn(Ie) : on(Ie), Ie;
            }
          }
          function an(O, q, ce) {
            return Yt(O, q, ce, !0);
          }
          function ke(O, q, ce) {
            return Yt(O, q, ce, !1);
          }
          var st = ke,
            It = an;
          (eo.Fragment = r), (eo.jsx = st), (eo.jsxs = It);
        })()),
    eo
  );
}
process.env.NODE_ENV === 'production' ? (Kr.exports = fu()) : (Kr.exports = mu());
var fi = Kr.exports;
const hu = fi.Fragment,
  L = fi.jsx,
  Qe = fi.jsxs,
  bu = {
    black: '#000',
    white: '#fff',
  },
  ho = bu,
  vu = {
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
  kn = vu,
  gu = {
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
  In = gu,
  yu = {
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
  _n = yu,
  xu = {
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
  Mn = xu,
  Eu = {
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
  An = Eu,
  Ou = {
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
  to = Ou,
  Tu = {
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
  Cu = Tu;
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
function el(e) {
  if (!Fn(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = el(e[o]);
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
  const r = o.clone ? v({}, e) : e;
  return (
    Fn(e) &&
      Fn(t) &&
      Object.keys(t).forEach((i) => {
        i !== '__proto__' &&
          (Fn(t[i]) && i in e && Fn(e[i])
            ? (r[i] = Mt(e[i], t[i], o))
            : o.clone
            ? (r[i] = Fn(t[i]) ? el(t[i]) : t[i])
            : (r[i] = t[i]));
      }),
    r
  );
}
var Gr = { exports: {} },
  Io = { exports: {} },
  Le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var la;
function Su() {
  if (la) return Le;
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
    u = e ? Symbol.for('react.concurrent_mode') : 60111,
    d = e ? Symbol.for('react.forward_ref') : 60112,
    f = e ? Symbol.for('react.suspense') : 60113,
    b = e ? Symbol.for('react.suspense_list') : 60120,
    g = e ? Symbol.for('react.memo') : 60115,
    y = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    m = e ? Symbol.for('react.fundamental') : 60117,
    C = e ? Symbol.for('react.responder') : 60118,
    S = e ? Symbol.for('react.scope') : 60119;
  function T(p) {
    if (typeof p == 'object' && p !== null) {
      var R = p.$$typeof;
      switch (R) {
        case t:
          switch (((p = p.type), p)) {
            case c:
            case u:
            case r:
            case a:
            case i:
            case f:
              return p;
            default:
              switch (((p = p && p.$$typeof), p)) {
                case l:
                case d:
                case y:
                case g:
                case s:
                  return p;
                default:
                  return R;
              }
          }
        case o:
          return R;
      }
    }
  }
  function E(p) {
    return T(p) === u;
  }
  return (
    (Le.AsyncMode = c),
    (Le.ConcurrentMode = u),
    (Le.ContextConsumer = l),
    (Le.ContextProvider = s),
    (Le.Element = t),
    (Le.ForwardRef = d),
    (Le.Fragment = r),
    (Le.Lazy = y),
    (Le.Memo = g),
    (Le.Portal = o),
    (Le.Profiler = a),
    (Le.StrictMode = i),
    (Le.Suspense = f),
    (Le.isAsyncMode = function (p) {
      return E(p) || T(p) === c;
    }),
    (Le.isConcurrentMode = E),
    (Le.isContextConsumer = function (p) {
      return T(p) === l;
    }),
    (Le.isContextProvider = function (p) {
      return T(p) === s;
    }),
    (Le.isElement = function (p) {
      return typeof p == 'object' && p !== null && p.$$typeof === t;
    }),
    (Le.isForwardRef = function (p) {
      return T(p) === d;
    }),
    (Le.isFragment = function (p) {
      return T(p) === r;
    }),
    (Le.isLazy = function (p) {
      return T(p) === y;
    }),
    (Le.isMemo = function (p) {
      return T(p) === g;
    }),
    (Le.isPortal = function (p) {
      return T(p) === o;
    }),
    (Le.isProfiler = function (p) {
      return T(p) === a;
    }),
    (Le.isStrictMode = function (p) {
      return T(p) === i;
    }),
    (Le.isSuspense = function (p) {
      return T(p) === f;
    }),
    (Le.isValidElementType = function (p) {
      return (
        typeof p == 'string' ||
        typeof p == 'function' ||
        p === r ||
        p === u ||
        p === a ||
        p === i ||
        p === f ||
        p === b ||
        (typeof p == 'object' &&
          p !== null &&
          (p.$$typeof === y ||
            p.$$typeof === g ||
            p.$$typeof === s ||
            p.$$typeof === l ||
            p.$$typeof === d ||
            p.$$typeof === m ||
            p.$$typeof === C ||
            p.$$typeof === S ||
            p.$$typeof === h))
      );
    }),
    (Le.typeOf = T),
    Le
  );
}
var Fe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ca;
function Ru() {
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
            u = e ? Symbol.for('react.concurrent_mode') : 60111,
            d = e ? Symbol.for('react.forward_ref') : 60112,
            f = e ? Symbol.for('react.suspense') : 60113,
            b = e ? Symbol.for('react.suspense_list') : 60120,
            g = e ? Symbol.for('react.memo') : 60115,
            y = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            m = e ? Symbol.for('react.fundamental') : 60117,
            C = e ? Symbol.for('react.responder') : 60118,
            S = e ? Symbol.for('react.scope') : 60119;
          function T(k) {
            return (
              typeof k == 'string' ||
              typeof k == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              k === r ||
              k === u ||
              k === a ||
              k === i ||
              k === f ||
              k === b ||
              (typeof k == 'object' &&
                k !== null &&
                (k.$$typeof === y ||
                  k.$$typeof === g ||
                  k.$$typeof === s ||
                  k.$$typeof === l ||
                  k.$$typeof === d ||
                  k.$$typeof === m ||
                  k.$$typeof === C ||
                  k.$$typeof === S ||
                  k.$$typeof === h))
            );
          }
          function E(k) {
            if (typeof k == 'object' && k !== null) {
              var Ee = k.$$typeof;
              switch (Ee) {
                case t:
                  var I = k.type;
                  switch (I) {
                    case c:
                    case u:
                    case r:
                    case a:
                    case i:
                    case f:
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
                          return Ee;
                      }
                  }
                case o:
                  return Ee;
              }
            }
          }
          var p = c,
            R = u,
            w = l,
            V = s,
            D = t,
            A = d,
            _ = r,
            K = y,
            B = g,
            M = o,
            j = a,
            z = i,
            le = f,
            ie = !1;
          function G(k) {
            return (
              ie ||
                ((ie = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              $(k) || E(k) === c
            );
          }
          function $(k) {
            return E(k) === u;
          }
          function F(k) {
            return E(k) === l;
          }
          function X(k) {
            return E(k) === s;
          }
          function H(k) {
            return typeof k == 'object' && k !== null && k.$$typeof === t;
          }
          function U(k) {
            return E(k) === d;
          }
          function te(k) {
            return E(k) === r;
          }
          function ne(k) {
            return E(k) === y;
          }
          function J(k) {
            return E(k) === g;
          }
          function re(k) {
            return E(k) === o;
          }
          function se(k) {
            return E(k) === a;
          }
          function me(k) {
            return E(k) === i;
          }
          function oe(k) {
            return E(k) === f;
          }
          (Fe.AsyncMode = p),
            (Fe.ConcurrentMode = R),
            (Fe.ContextConsumer = w),
            (Fe.ContextProvider = V),
            (Fe.Element = D),
            (Fe.ForwardRef = A),
            (Fe.Fragment = _),
            (Fe.Lazy = K),
            (Fe.Memo = B),
            (Fe.Portal = M),
            (Fe.Profiler = j),
            (Fe.StrictMode = z),
            (Fe.Suspense = le),
            (Fe.isAsyncMode = G),
            (Fe.isConcurrentMode = $),
            (Fe.isContextConsumer = F),
            (Fe.isContextProvider = X),
            (Fe.isElement = H),
            (Fe.isForwardRef = U),
            (Fe.isFragment = te),
            (Fe.isLazy = ne),
            (Fe.isMemo = J),
            (Fe.isPortal = re),
            (Fe.isProfiler = se),
            (Fe.isStrictMode = me),
            (Fe.isSuspense = oe),
            (Fe.isValidElementType = T),
            (Fe.typeOf = E);
        })()),
    Fe
  );
}
var ua;
function tl() {
  return (
    ua ||
      ((ua = 1), process.env.NODE_ENV === 'production' ? (Io.exports = Su()) : (Io.exports = Ru())),
    Io.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var kr, da;
function wu() {
  if (da) return kr;
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
    (kr = i()
      ? Object.assign
      : function (a, s) {
          for (var l, c = r(a), u, d = 1; d < arguments.length; d++) {
            l = Object(arguments[d]);
            for (var f in l) t.call(l, f) && (c[f] = l[f]);
            if (e) {
              u = e(l);
              for (var b = 0; b < u.length; b++) o.call(l, u[b]) && (c[u[b]] = l[u[b]]);
            }
          }
          return c;
        }),
    kr
  );
}
var Ir, pa;
function mi() {
  if (pa) return Ir;
  pa = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Ir = e), Ir;
}
var _r, fa;
function nl() {
  return fa || ((fa = 1), (_r = Function.call.bind(Object.prototype.hasOwnProperty))), _r;
}
var Mr, ma;
function $u() {
  if (ma) return Mr;
  ma = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = mi(),
      o = {},
      r = nl();
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
          var f;
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
            f = a[d](s, d, c, l, null, t);
          } catch (y) {
            f = y;
          }
          if (
            (f &&
              !(f instanceof Error) &&
              e(
                (c || 'React class') +
                  ': type specification of ' +
                  l +
                  ' `' +
                  d +
                  '` is invalid; the type checker function must return `null` or an `Error` but returned a ' +
                  typeof f +
                  '. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
              ),
            f instanceof Error && !(f.message in o))
          ) {
            o[f.message] = !0;
            var g = u ? u() : '';
            e('Failed ' + l + ' type: ' + f.message + (g ?? ''));
          }
        }
    }
  }
  return (
    (i.resetWarningCache = function () {
      process.env.NODE_ENV !== 'production' && (o = {});
    }),
    (Mr = i),
    Mr
  );
}
var Ar, ha;
function Pu() {
  if (ha) return Ar;
  ha = 1;
  var e = tl(),
    t = wu(),
    o = mi(),
    r = nl(),
    i = $u(),
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
    (Ar = function (l, c) {
      var u = typeof Symbol == 'function' && Symbol.iterator,
        d = '@@iterator';
      function f($) {
        var F = $ && ((u && $[u]) || $[d]);
        if (typeof F == 'function') return F;
      }
      var b = '<<anonymous>>',
        g = {
          array: C('array'),
          bigint: C('bigint'),
          bool: C('boolean'),
          func: C('function'),
          number: C('number'),
          object: C('object'),
          string: C('string'),
          symbol: C('symbol'),
          any: S(),
          arrayOf: T,
          element: E(),
          elementType: p(),
          instanceOf: R,
          node: A(),
          objectOf: V,
          oneOf: w,
          oneOfType: D,
          shape: K,
          exact: B,
        };
      function y($, F) {
        return $ === F ? $ !== 0 || 1 / $ === 1 / F : $ !== $ && F !== F;
      }
      function h($, F) {
        (this.message = $), (this.data = F && typeof F == 'object' ? F : {}), (this.stack = '');
      }
      h.prototype = Error.prototype;
      function m($) {
        if (process.env.NODE_ENV !== 'production')
          var F = {},
            X = 0;
        function H(te, ne, J, re, se, me, oe) {
          if (((re = re || b), (me = me || J), oe !== o)) {
            if (c) {
              var k = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((k.name = 'Invariant Violation'), k);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Ee = re + ':' + J;
              !F[Ee] && // Avoid spamming the console because they are often not actionable except for lib authors
                X < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    me +
                    '` prop on `' +
                    re +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (F[Ee] = !0),
                X++);
            }
          }
          return ne[J] == null
            ? te
              ? ne[J] === null
                ? new h(
                    'The ' +
                      se +
                      ' `' +
                      me +
                      '` is marked as required ' +
                      ('in `' + re + '`, but its value is `null`.'),
                  )
                : new h(
                    'The ' +
                      se +
                      ' `' +
                      me +
                      '` is marked as required in ' +
                      ('`' + re + '`, but its value is `undefined`.'),
                  )
              : null
            : $(ne, J, re, se, me);
        }
        var U = H.bind(null, !1);
        return (U.isRequired = H.bind(null, !0)), U;
      }
      function C($) {
        function F(X, H, U, te, ne, J) {
          var re = X[H],
            se = z(re);
          if (se !== $) {
            var me = le(re);
            return new h(
              'Invalid ' +
                te +
                ' `' +
                ne +
                '` of type ' +
                ('`' + me + '` supplied to `' + U + '`, expected ') +
                ('`' + $ + '`.'),
              { expectedType: $ },
            );
          }
          return null;
        }
        return m(F);
      }
      function S() {
        return m(s);
      }
      function T($) {
        function F(X, H, U, te, ne) {
          if (typeof $ != 'function')
            return new h(
              'Property `' +
                ne +
                '` of component `' +
                U +
                '` has invalid PropType notation inside arrayOf.',
            );
          var J = X[H];
          if (!Array.isArray(J)) {
            var re = z(J);
            return new h(
              'Invalid ' +
                te +
                ' `' +
                ne +
                '` of type ' +
                ('`' + re + '` supplied to `' + U + '`, expected an array.'),
            );
          }
          for (var se = 0; se < J.length; se++) {
            var me = $(J, se, U, te, ne + '[' + se + ']', o);
            if (me instanceof Error) return me;
          }
          return null;
        }
        return m(F);
      }
      function E() {
        function $(F, X, H, U, te) {
          var ne = F[X];
          if (!l(ne)) {
            var J = z(ne);
            return new h(
              'Invalid ' +
                U +
                ' `' +
                te +
                '` of type ' +
                ('`' + J + '` supplied to `' + H + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return m($);
      }
      function p() {
        function $(F, X, H, U, te) {
          var ne = F[X];
          if (!e.isValidElementType(ne)) {
            var J = z(ne);
            return new h(
              'Invalid ' +
                U +
                ' `' +
                te +
                '` of type ' +
                ('`' + J + '` supplied to `' + H + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return m($);
      }
      function R($) {
        function F(X, H, U, te, ne) {
          if (!(X[H] instanceof $)) {
            var J = $.name || b,
              re = G(X[H]);
            return new h(
              'Invalid ' +
                te +
                ' `' +
                ne +
                '` of type ' +
                ('`' + re + '` supplied to `' + U + '`, expected ') +
                ('instance of `' + J + '`.'),
            );
          }
          return null;
        }
        return m(F);
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
        function F(X, H, U, te, ne) {
          for (var J = X[H], re = 0; re < $.length; re++) if (y(J, $[re])) return null;
          var se = JSON.stringify($, function (oe, k) {
            var Ee = le(k);
            return Ee === 'symbol' ? String(k) : k;
          });
          return new h(
            'Invalid ' +
              te +
              ' `' +
              ne +
              '` of value `' +
              String(J) +
              '` ' +
              ('supplied to `' + U + '`, expected one of ' + se + '.'),
          );
        }
        return m(F);
      }
      function V($) {
        function F(X, H, U, te, ne) {
          if (typeof $ != 'function')
            return new h(
              'Property `' +
                ne +
                '` of component `' +
                U +
                '` has invalid PropType notation inside objectOf.',
            );
          var J = X[H],
            re = z(J);
          if (re !== 'object')
            return new h(
              'Invalid ' +
                te +
                ' `' +
                ne +
                '` of type ' +
                ('`' + re + '` supplied to `' + U + '`, expected an object.'),
            );
          for (var se in J)
            if (r(J, se)) {
              var me = $(J, se, U, te, ne + '.' + se, o);
              if (me instanceof Error) return me;
            }
          return null;
        }
        return m(F);
      }
      function D($) {
        if (!Array.isArray($))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var F = 0; F < $.length; F++) {
          var X = $[F];
          if (typeof X != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  ie(X) +
                  ' at index ' +
                  F +
                  '.',
              ),
              s
            );
        }
        function H(U, te, ne, J, re) {
          for (var se = [], me = 0; me < $.length; me++) {
            var oe = $[me],
              k = oe(U, te, ne, J, re, o);
            if (k == null) return null;
            k.data && r(k.data, 'expectedType') && se.push(k.data.expectedType);
          }
          var Ee = se.length > 0 ? ', expected one of type [' + se.join(', ') + ']' : '';
          return new h('Invalid ' + J + ' `' + re + '` supplied to ' + ('`' + ne + '`' + Ee + '.'));
        }
        return m(H);
      }
      function A() {
        function $(F, X, H, U, te) {
          return M(F[X])
            ? null
            : new h(
                'Invalid ' +
                  U +
                  ' `' +
                  te +
                  '` supplied to ' +
                  ('`' + H + '`, expected a ReactNode.'),
              );
        }
        return m($);
      }
      function _($, F, X, H, U) {
        return new h(
          ($ || 'React class') +
            ': ' +
            F +
            ' type `' +
            X +
            '.' +
            H +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            U +
            '`.',
        );
      }
      function K($) {
        function F(X, H, U, te, ne) {
          var J = X[H],
            re = z(J);
          if (re !== 'object')
            return new h(
              'Invalid ' +
                te +
                ' `' +
                ne +
                '` of type `' +
                re +
                '` ' +
                ('supplied to `' + U + '`, expected `object`.'),
            );
          for (var se in $) {
            var me = $[se];
            if (typeof me != 'function') return _(U, te, ne, se, le(me));
            var oe = me(J, se, U, te, ne + '.' + se, o);
            if (oe) return oe;
          }
          return null;
        }
        return m(F);
      }
      function B($) {
        function F(X, H, U, te, ne) {
          var J = X[H],
            re = z(J);
          if (re !== 'object')
            return new h(
              'Invalid ' +
                te +
                ' `' +
                ne +
                '` of type `' +
                re +
                '` ' +
                ('supplied to `' + U + '`, expected `object`.'),
            );
          var se = t({}, X[H], $);
          for (var me in se) {
            var oe = $[me];
            if (r($, me) && typeof oe != 'function') return _(U, te, ne, me, le(oe));
            if (!oe)
              return new h(
                'Invalid ' +
                  te +
                  ' `' +
                  ne +
                  '` key `' +
                  me +
                  '` supplied to `' +
                  U +
                  '`.\nBad object: ' +
                  JSON.stringify(X[H], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys($), null, '  '),
              );
            var k = oe(J, me, U, te, ne + '.' + me, o);
            if (k) return k;
          }
          return null;
        }
        return m(F);
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
            var F = f($);
            if (F) {
              var X = F.call($),
                H;
              if (F !== $.entries) {
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
      function j($, F) {
        return $ === 'symbol'
          ? !0
          : F
          ? F['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && F instanceof Symbol)
          : !1;
      }
      function z($) {
        var F = typeof $;
        return Array.isArray($) ? 'array' : $ instanceof RegExp ? 'object' : j(F, $) ? 'symbol' : F;
      }
      function le($) {
        if (typeof $ > 'u' || $ === null) return '' + $;
        var F = z($);
        if (F === 'object') {
          if ($ instanceof Date) return 'date';
          if ($ instanceof RegExp) return 'regexp';
        }
        return F;
      }
      function ie($) {
        var F = le($);
        switch (F) {
          case 'array':
          case 'object':
            return 'an ' + F;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + F;
          default:
            return F;
        }
      }
      function G($) {
        return !$.constructor || !$.constructor.name ? b : $.constructor.name;
      }
      return (
        (g.checkPropTypes = i), (g.resetWarningCache = i.resetWarningCache), (g.PropTypes = g), g
      );
    }),
    Ar
  );
}
var Dr, ba;
function Nu() {
  if (ba) return Dr;
  ba = 1;
  var e = mi();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (Dr = function () {
      function r(s, l, c, u, d, f) {
        if (f !== e) {
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
    Dr
  );
}
if (process.env.NODE_ENV !== 'production') {
  var ku = tl(),
    Iu = !0;
  Gr.exports = Pu()(ku.isElement, Iu);
} else Gr.exports = Nu()();
var _u = Gr.exports;
const n = /* @__PURE__ */ pu(_u);
function Mu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function ol(e, t, o, r, i) {
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
      !Mu(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const rl = Wt(n.element, ol);
rl.isRequired = Wt(n.element.isRequired, ol);
const To = rl;
function Au(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Du(e, t, o, r, i) {
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
      !Au(a) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const hi = Wt(n.elementType, Du),
  Lu = 'exact-prop: ​';
function il(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : v({}, e, {
        [Lu]: (t) => {
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
var Xr = { exports: {} },
  je = {};
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
function Fu() {
  if (va) return je;
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
    u = Symbol.for('react.suspense'),
    d = Symbol.for('react.suspense_list'),
    f = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    g = Symbol.for('react.offscreen'),
    y;
  y = Symbol.for('react.module.reference');
  function h(m) {
    if (typeof m == 'object' && m !== null) {
      var C = m.$$typeof;
      switch (C) {
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
                case f:
                case a:
                  return m;
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
    (je.ContextConsumer = s),
    (je.ContextProvider = a),
    (je.Element = e),
    (je.ForwardRef = c),
    (je.Fragment = o),
    (je.Lazy = b),
    (je.Memo = f),
    (je.Portal = t),
    (je.Profiler = i),
    (je.StrictMode = r),
    (je.Suspense = u),
    (je.SuspenseList = d),
    (je.isAsyncMode = function () {
      return !1;
    }),
    (je.isConcurrentMode = function () {
      return !1;
    }),
    (je.isContextConsumer = function (m) {
      return h(m) === s;
    }),
    (je.isContextProvider = function (m) {
      return h(m) === a;
    }),
    (je.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (je.isForwardRef = function (m) {
      return h(m) === c;
    }),
    (je.isFragment = function (m) {
      return h(m) === o;
    }),
    (je.isLazy = function (m) {
      return h(m) === b;
    }),
    (je.isMemo = function (m) {
      return h(m) === f;
    }),
    (je.isPortal = function (m) {
      return h(m) === t;
    }),
    (je.isProfiler = function (m) {
      return h(m) === i;
    }),
    (je.isStrictMode = function (m) {
      return h(m) === r;
    }),
    (je.isSuspense = function (m) {
      return h(m) === u;
    }),
    (je.isSuspenseList = function (m) {
      return h(m) === d;
    }),
    (je.isValidElementType = function (m) {
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
            m.$$typeof === f ||
            m.$$typeof === a ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === y ||
            m.getModuleId !== void 0))
      );
    }),
    (je.typeOf = h),
    je
  );
}
var Ve = {};
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
function ju() {
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
            u = Symbol.for('react.suspense'),
            d = Symbol.for('react.suspense_list'),
            f = Symbol.for('react.memo'),
            b = Symbol.for('react.lazy'),
            g = Symbol.for('react.offscreen'),
            y = !1,
            h = !1,
            m = !1,
            C = !1,
            S = !1,
            T;
          T = Symbol.for('react.module.reference');
          function E(I) {
            return !!(
              typeof I == 'string' ||
              typeof I == 'function' ||
              I === o ||
              I === i ||
              S ||
              I === r ||
              I === u ||
              I === d ||
              C ||
              I === g ||
              y ||
              h ||
              m ||
              (typeof I == 'object' &&
                I !== null &&
                (I.$$typeof === b ||
                  I.$$typeof === f ||
                  I.$$typeof === a ||
                  I.$$typeof === s ||
                  I.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  I.$$typeof === T ||
                  I.getModuleId !== void 0))
            );
          }
          function p(I) {
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
                        case f:
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
            V = e,
            D = c,
            A = o,
            _ = b,
            K = f,
            B = t,
            M = i,
            j = r,
            z = u,
            le = d,
            ie = !1,
            G = !1;
          function $(I) {
            return (
              ie ||
                ((ie = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function F(I) {
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
            return p(I) === s;
          }
          function H(I) {
            return p(I) === a;
          }
          function U(I) {
            return typeof I == 'object' && I !== null && I.$$typeof === e;
          }
          function te(I) {
            return p(I) === c;
          }
          function ne(I) {
            return p(I) === o;
          }
          function J(I) {
            return p(I) === b;
          }
          function re(I) {
            return p(I) === f;
          }
          function se(I) {
            return p(I) === t;
          }
          function me(I) {
            return p(I) === i;
          }
          function oe(I) {
            return p(I) === r;
          }
          function k(I) {
            return p(I) === u;
          }
          function Ee(I) {
            return p(I) === d;
          }
          (Ve.ContextConsumer = R),
            (Ve.ContextProvider = w),
            (Ve.Element = V),
            (Ve.ForwardRef = D),
            (Ve.Fragment = A),
            (Ve.Lazy = _),
            (Ve.Memo = K),
            (Ve.Portal = B),
            (Ve.Profiler = M),
            (Ve.StrictMode = j),
            (Ve.Suspense = z),
            (Ve.SuspenseList = le),
            (Ve.isAsyncMode = $),
            (Ve.isConcurrentMode = F),
            (Ve.isContextConsumer = X),
            (Ve.isContextProvider = H),
            (Ve.isElement = U),
            (Ve.isForwardRef = te),
            (Ve.isFragment = ne),
            (Ve.isLazy = J),
            (Ve.isMemo = re),
            (Ve.isPortal = se),
            (Ve.isProfiler = me),
            (Ve.isStrictMode = oe),
            (Ve.isSuspense = k),
            (Ve.isSuspenseList = Ee),
            (Ve.isValidElementType = E),
            (Ve.typeOf = p);
        })()),
    Ve
  );
}
process.env.NODE_ENV === 'production' ? (Xr.exports = Fu()) : (Xr.exports = ju());
var ya = Xr.exports;
const Vu = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function zu(e) {
  const t = `${e}`.match(Vu);
  return (t && t[1]) || '';
}
function al(e, t = '') {
  return e.displayName || e.name || zu(e) || t;
}
function xa(e, t, o) {
  const r = al(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function Bu(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return al(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case ya.ForwardRef:
          return xa(e, e.render, 'ForwardRef');
        case ya.Memo:
          return xa(e, e.type, 'memo');
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
const Uu = n.oneOfType([n.func, n.object]),
  St = Uu;
function ae(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : bn(7),
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
function sl(e, t = 166) {
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
function Lr(e, t) {
  return /* @__PURE__ */ x.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function pt(e) {
  return (e && e.ownerDocument) || document;
}
function Rn(e) {
  return pt(e).defaultView || window;
}
function Ko(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const Wu = typeof window < 'u' ? x.useLayoutEffect : x.useEffect,
  ln = Wu;
let Oa = 0;
function Hu(e) {
  const [t, o] = x.useState(e),
    r = e || t;
  return (
    x.useEffect(() => {
      t == null && ((Oa += 1), o(`mui-${Oa}`));
    }, [t]),
    r
  );
}
const Ta = x['useId'];
function ll(e) {
  if (Ta !== void 0) {
    const t = Ta();
    return e ?? t;
  }
  return Hu(e);
}
function qu(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = i || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${a}\` is not supported. Please remove it.`)
    : null;
}
function Cn({ controlled: e, default: t, name: o, state: r = 'value' }) {
  const { current: i } = x.useRef(e !== void 0),
    [a, s] = x.useState(t),
    l = i ? e : a;
  if (process.env.NODE_ENV !== 'production') {
    x.useEffect(() => {
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
    const { current: u } = x.useRef(t);
    x.useEffect(() => {
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
  const c = x.useCallback((u) => {
    i || s(u);
  }, []);
  return [l, c];
}
function Pt(e) {
  const t = x.useRef(e);
  return (
    ln(() => {
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
function ft(...e) {
  return x.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              Ko(o, t);
            });
          },
    e,
  );
}
let ir = !0,
  Jr = !1,
  Ca;
const Yu = {
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
function Ku(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && Yu[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function Gu(e) {
  e.metaKey || e.altKey || e.ctrlKey || (ir = !0);
}
function Fr() {
  ir = !1;
}
function Xu() {
  this.visibilityState === 'hidden' && Jr && (ir = !0);
}
function Ju(e) {
  e.addEventListener('keydown', Gu, !0),
    e.addEventListener('mousedown', Fr, !0),
    e.addEventListener('pointerdown', Fr, !0),
    e.addEventListener('touchstart', Fr, !0),
    e.addEventListener('visibilitychange', Xu, !0);
}
function Zu(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return ir || Ku(t);
}
function cl() {
  const e = x.useCallback((i) => {
      i != null && Ju(i.ownerDocument);
    }, []),
    t = x.useRef(!1);
  function o() {
    return t.current
      ? ((Jr = !0),
        window.clearTimeout(Ca),
        (Ca = window.setTimeout(() => {
          Jr = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(i) {
    return Zu(i) ? ((t.current = !0), !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: o,
    ref: e,
  };
}
function ul(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const Qu = (e) => {
    const t = x.useRef({});
    return (
      x.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  ed = Qu,
  td = {
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
  nd = td;
function od(e) {
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
function rd(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const id = Number.isInteger || rd;
function dl(e, t, o, r) {
  const i = e[t];
  if (i == null || !id(i)) {
    const a = od(i);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function pl(e, t, ...o) {
  return e[t] === void 0 ? null : dl(e, t, ...o);
}
function Zr() {
  return null;
}
pl.isRequired = dl;
Zr.isRequired = Zr;
const bi = process.env.NODE_ENV === 'production' ? Zr : pl;
function gi(e, t) {
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
                o[r][s] = gi(i[s], a[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function Ke(e, t, o = void 0) {
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
const Sa = (e) => e,
  ad = () => {
    let e = Sa;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Sa;
      },
    };
  },
  sd = ad(),
  ld = sd,
  cd = {
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
  const r = cd[t];
  return r ? `${o}-${r}` : `${ld.generate(e)}-${t}`;
}
function qe(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((i) => {
      r[i] = De(e, i, o);
    }),
    r
  );
}
function Te(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) (i = r[a]), !(t.indexOf(i) >= 0) && (o[i] = e[i]);
  return o;
}
function fl(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var ud =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  dd = /* @__PURE__ */ fl(
    function (e) {
      return (
        ud.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
      );
    },
    /* Z+1 */
  );
function pd(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function fd(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var md = /* @__PURE__ */ (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(fd(this));
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
          var s = pd(i);
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
  Go = '-moz-',
  Ae = '-webkit-',
  yi = 'comm',
  xi = 'rule',
  Ei = 'decl',
  hd = '@import',
  ml = '@keyframes',
  bd = Math.abs,
  ar = String.fromCharCode,
  vd = Object.assign;
function gd(e, t) {
  return bt(e, 0) ^ 45
    ? (((((((t << 2) ^ bt(e, 0)) << 2) ^ bt(e, 1)) << 2) ^ bt(e, 2)) << 2) ^ bt(e, 3)
    : 0;
}
function hl(e) {
  return e.trim();
}
function yd(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function He(e, t, o) {
  return e.replace(t, o);
}
function Qr(e, t) {
  return e.indexOf(t);
}
function bt(e, t) {
  return e.charCodeAt(t) | 0;
}
function bo(e, t, o) {
  return e.slice(t, o);
}
function Gt(e) {
  return e.length;
}
function Oi(e) {
  return e.length;
}
function _o(e, t) {
  return t.push(e), e;
}
function xd(e, t) {
  return e.map(t).join('');
}
var sr = 1,
  Un = 1,
  bl = 0,
  Ct = 0,
  lt = 0,
  Gn = '';
function lr(e, t, o, r, i, a, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: i,
    children: a,
    line: sr,
    column: Un,
    length: s,
    return: '',
  };
}
function no(e, t) {
  return vd(lr('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function Ed() {
  return lt;
}
function Od() {
  return (lt = Ct > 0 ? bt(Gn, --Ct) : 0), Un--, lt === 10 && ((Un = 1), sr--), lt;
}
function Nt() {
  return (lt = Ct < bl ? bt(Gn, Ct++) : 0), Un++, lt === 10 && ((Un = 1), sr++), lt;
}
function Jt() {
  return bt(Gn, Ct);
}
function Uo() {
  return Ct;
}
function Co(e, t) {
  return bo(Gn, e, t);
}
function vo(e) {
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
function vl(e) {
  return (sr = Un = 1), (bl = Gt((Gn = e))), (Ct = 0), [];
}
function gl(e) {
  return (Gn = ''), e;
}
function Wo(e) {
  return hl(Co(Ct - 1, ei(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Td(e) {
  for (; (lt = Jt()) && lt < 33; ) Nt();
  return vo(e) > 2 || vo(lt) > 3 ? '' : ' ';
}
function Cd(e, t) {
  for (; --t && Nt() && !(lt < 48 || lt > 102 || (lt > 57 && lt < 65) || (lt > 70 && lt < 97)); );
  return Co(e, Uo() + (t < 6 && Jt() == 32 && Nt() == 32));
}
function ei(e) {
  for (; Nt(); )
    switch (lt) {
      case e:
        return Ct;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ei(lt);
        break;
      case 40:
        e === 41 && ei(e);
        break;
      case 92:
        Nt();
        break;
    }
  return Ct;
}
function Sd(e, t) {
  for (; Nt() && e + lt !== 47 + 10; ) if (e + lt === 42 + 42 && Jt() === 47) break;
  return '/*' + Co(t, Ct - 1) + '*' + ar(e === 47 ? e : Nt());
}
function Rd(e) {
  for (; !vo(Jt()); ) Nt();
  return Co(e, Ct);
}
function wd(e) {
  return gl(Ho('', null, null, null, [''], (e = vl(e)), 0, [0], e));
}
function Ho(e, t, o, r, i, a, s, l, c) {
  for (
    var u = 0,
      d = 0,
      f = s,
      b = 0,
      g = 0,
      y = 0,
      h = 1,
      m = 1,
      C = 1,
      S = 0,
      T = '',
      E = i,
      p = a,
      R = r,
      w = T;
    m;

  )
    switch (((y = S), (S = Nt()))) {
      case 40:
        if (y != 108 && bt(w, f - 1) == 58) {
          Qr((w += He(Wo(S), '&', '&\f')), '&\f') != -1 && (C = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        w += Wo(S);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        w += Td(y);
        break;
      case 92:
        w += Cd(Uo() - 1, 7);
        continue;
      case 47:
        switch (Jt()) {
          case 42:
          case 47:
            _o($d(Sd(Nt(), Uo()), t, o), c);
            break;
          default:
            w += '/';
        }
        break;
      case 123 * h:
        l[u++] = Gt(w) * C;
      case 125 * h:
      case 59:
      case 0:
        switch (S) {
          case 0:
          case 125:
            m = 0;
          case 59 + d:
            g > 0 &&
              Gt(w) - f &&
              _o(g > 32 ? wa(w + ';', r, o, f - 1) : wa(He(w, ' ', '') + ';', r, o, f - 2), c);
            break;
          case 59:
            w += ';';
          default:
            if ((_o((R = Ra(w, t, o, u, d, i, l, T, (E = []), (p = []), f)), a), S === 123))
              if (d === 0) Ho(w, t, R, R, E, a, f, l, p);
              else
                switch (b === 99 && bt(w, 3) === 110 ? 100 : b) {
                  case 100:
                  case 109:
                  case 115:
                    Ho(
                      e,
                      R,
                      R,
                      r && _o(Ra(e, R, R, 0, 0, i, l, T, i, (E = []), f), p),
                      i,
                      p,
                      f,
                      l,
                      r ? E : p,
                    );
                    break;
                  default:
                    Ho(w, R, R, R, [''], p, 0, l, p);
                }
        }
        (u = d = g = 0), (h = C = 1), (T = w = ''), (f = s);
        break;
      case 58:
        (f = 1 + Gt(w)), (g = y);
      default:
        if (h < 1) {
          if (S == 123) --h;
          else if (S == 125 && h++ == 0 && Od() == 125) continue;
        }
        switch (((w += ar(S)), S * h)) {
          case 38:
            C = d > 0 ? 1 : ((w += '\f'), -1);
            break;
          case 44:
            (l[u++] = (Gt(w) - 1) * C), (C = 1);
            break;
          case 64:
            Jt() === 45 && (w += Wo(Nt())), (b = Jt()), (d = f = Gt((T = w += Rd(Uo())))), S++;
            break;
          case 45:
            y === 45 && Gt(w) == 2 && (h = 0);
        }
    }
  return a;
}
function Ra(e, t, o, r, i, a, s, l, c, u, d) {
  for (var f = i - 1, b = i === 0 ? a : [''], g = Oi(b), y = 0, h = 0, m = 0; y < r; ++y)
    for (var C = 0, S = bo(e, f + 1, (f = bd((h = s[y])))), T = e; C < g; ++C)
      (T = hl(h > 0 ? b[C] + ' ' + S : He(S, /&\f/g, b[C]))) && (c[m++] = T);
  return lr(e, t, o, i === 0 ? xi : l, c, u, d);
}
function $d(e, t, o) {
  return lr(e, t, o, yi, ar(Ed()), bo(e, 2, -2), 0);
}
function wa(e, t, o, r) {
  return lr(e, t, o, Ei, bo(e, 0, r), bo(e, r + 1, -1), r);
}
function zn(e, t) {
  for (var o = '', r = Oi(e), i = 0; i < r; i++) o += t(e[i], i, e, t) || '';
  return o;
}
function Pd(e, t, o, r) {
  switch (e.type) {
    case hd:
    case Ei:
      return (e.return = e.return || e.value);
    case yi:
      return '';
    case ml:
      return (e.return = e.value + '{' + zn(e.children, r) + '}');
    case xi:
      e.value = e.props.join(',');
  }
  return Gt((o = zn(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function Nd(e) {
  var t = Oi(e);
  return function (o, r, i, a) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, i, a) || '';
    return s;
  };
}
function kd(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var Id = function (t, o, r) {
    for (var i = 0, a = 0; (i = a), (a = Jt()), i === 38 && a === 12 && (o[r] = 1), !vo(a); ) Nt();
    return Co(t, Ct);
  },
  _d = function (t, o) {
    var r = -1,
      i = 44;
    do
      switch (vo(i)) {
        case 0:
          i === 38 && Jt() === 12 && (o[r] = 1), (t[r] += Id(Ct - 1, o, r));
          break;
        case 2:
          t[r] += Wo(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = Jt() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += ar(i);
      }
    while ((i = Nt()));
    return t;
  },
  Md = function (t, o) {
    return gl(_d(vl(t), o));
  },
  $a = /* @__PURE__ */ new WeakMap(),
  Ad = function (t) {
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
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !$a.get(r)) && !i) {
        $a.set(t, !0);
        for (var a = [], s = Md(o, a), l = r.props, c = 0, u = 0; c < s.length; c++)
          for (var d = 0; d < l.length; d++, u++)
            t.props[u] = a[c] ? s[c].replace(/&\f/g, l[d]) : l[d] + ' ' + s[c];
      }
    }
  },
  Dd = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      // charcode for l
      o.charCodeAt(0) === 108 && // charcode for b
        o.charCodeAt(2) === 98 &&
        ((t.return = ''), (t.value = ''));
    }
  },
  Ld =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  Fd = function (t) {
    return t.type === 'comm' && t.children.indexOf(Ld) > -1;
  },
  jd = function (t) {
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
              if (Fd(u)) return;
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
  yl = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  Vd = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!yl(o[r])) return !0;
    return !1;
  },
  Pa = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  zd = function (t, o, r) {
    yl(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          Pa(t))
        : Vd(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          Pa(t)));
  };
function xl(e, t) {
  switch (gd(e, t)) {
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
      return Ae + e + Go + e + gt + e + e;
    case 6828:
    case 4268:
      return Ae + e + gt + e + e;
    case 6165:
      return Ae + e + gt + 'flex-' + e + e;
    case 5187:
      return Ae + e + He(e, /(\w+).+(:[^]+)/, Ae + 'box-$1$2' + gt + 'flex-$1$2') + e;
    case 5443:
      return Ae + e + gt + 'flex-item-' + He(e, /flex-|-self/, '') + e;
    case 4675:
      return Ae + e + gt + 'flex-line-pack' + He(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return Ae + e + gt + He(e, 'shrink', 'negative') + e;
    case 5292:
      return Ae + e + gt + He(e, 'basis', 'preferred-size') + e;
    case 6060:
      return Ae + 'box-' + He(e, '-grow', '') + Ae + e + gt + He(e, 'grow', 'positive') + e;
    case 4554:
      return Ae + He(e, /([^-])(transform)/g, '$1' + Ae + '$2') + e;
    case 6187:
      return He(He(He(e, /(zoom-|grab)/, Ae + '$1'), /(image-set)/, Ae + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return He(e, /(image-set\([^]*)/, Ae + '$1$`$1');
    case 4968:
      return (
        He(
          He(e, /(.+:)(flex-)?(.*)/, Ae + 'box-pack:$3' + gt + 'flex-pack:$3'),
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
      return He(e, /(.+)-inline(.+)/, Ae + '$1$2') + e;
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
              He(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + Ae + '$2-$3$1' + Go + (bt(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~Qr(e, 'stretch') ? xl(He(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (bt(e, t + 1) !== 115) break;
    case 6444:
      switch (bt(e, Gt(e) - 3 - (~Qr(e, '!important') && 10))) {
        case 107:
          return He(e, ':', ':' + Ae) + e;
        case 101:
          return (
            He(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                Ae +
                (bt(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                Ae +
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
          return Ae + e + gt + He(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return Ae + e + gt + He(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return Ae + e + gt + He(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return Ae + e + gt + e + e;
  }
  return e;
}
var Bd = function (t, o, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Ei:
          t.return = xl(t.value, t.length);
          break;
        case ml:
          return zn(
            [
              no(t, {
                value: He(t.value, '@', '@' + Ae),
              }),
            ],
            i,
          );
        case xi:
          if (t.length)
            return xd(t.props, function (a) {
              switch (yd(a, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return zn(
                    [
                      no(t, {
                        props: [He(a, /:(read-\w+)/, ':' + Go + '$1')],
                      }),
                    ],
                    i,
                  );
                case '::placeholder':
                  return zn(
                    [
                      no(t, {
                        props: [He(a, /:(plac\w+)/, ':' + Ae + 'input-$1')],
                      }),
                      no(t, {
                        props: [He(a, /:(plac\w+)/, ':' + Go + '$1')],
                      }),
                      no(t, {
                        props: [He(a, /:(plac\w+)/, gt + 'input-$1')],
                      }),
                    ],
                    i,
                  );
              }
              return '';
            });
      }
  },
  Ud = [Bd],
  Wd = function (t) {
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
    var i = t.stylisPlugins || Ud;
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
          for (var m = h.getAttribute('data-emotion').split(' '), C = 1; C < m.length; C++)
            a[m[C]] = !0;
          l.push(h);
        },
      );
    var c,
      u = [Ad, Dd];
    process.env.NODE_ENV !== 'production' &&
      u.push(
        jd({
          get compat() {
            return y.compat;
          },
        }),
        zd,
      );
    {
      var d,
        f = [
          Pd,
          process.env.NODE_ENV !== 'production'
            ? function (h) {
                h.root ||
                  (h.return
                    ? d.insert(h.return)
                    : h.value && h.type !== yi && d.insert(h.value + '{}'));
              }
            : kd(function (h) {
                d.insert(h);
              }),
        ],
        b = Nd(u.concat(i, f)),
        g = function (m) {
          return zn(wd(m), b);
        };
      c = function (m, C, S, T) {
        (d = S),
          process.env.NODE_ENV !== 'production' &&
            C.map !== void 0 &&
            (d = {
              insert: function (p) {
                S.insert(p + C.map);
              },
            }),
          g(m ? m + '{' + C.styles + '}' : C.styles),
          T && (y.inserted[C.name] = !0);
      };
    }
    var y = {
      key: o,
      sheet: new md({
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
  ti = { exports: {} },
  ze = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Na;
function Hd() {
  if (Na) return ze;
  Na = 1;
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
    f = e ? Symbol.for('react.suspense') : 60113,
    b = e ? Symbol.for('react.suspense_list') : 60120,
    g = e ? Symbol.for('react.memo') : 60115,
    y = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    m = e ? Symbol.for('react.fundamental') : 60117,
    C = e ? Symbol.for('react.responder') : 60118,
    S = e ? Symbol.for('react.scope') : 60119;
  function T(p) {
    if (typeof p == 'object' && p !== null) {
      var R = p.$$typeof;
      switch (R) {
        case t:
          switch (((p = p.type), p)) {
            case c:
            case u:
            case r:
            case a:
            case i:
            case f:
              return p;
            default:
              switch (((p = p && p.$$typeof), p)) {
                case l:
                case d:
                case y:
                case g:
                case s:
                  return p;
                default:
                  return R;
              }
          }
        case o:
          return R;
      }
    }
  }
  function E(p) {
    return T(p) === u;
  }
  return (
    (ze.AsyncMode = c),
    (ze.ConcurrentMode = u),
    (ze.ContextConsumer = l),
    (ze.ContextProvider = s),
    (ze.Element = t),
    (ze.ForwardRef = d),
    (ze.Fragment = r),
    (ze.Lazy = y),
    (ze.Memo = g),
    (ze.Portal = o),
    (ze.Profiler = a),
    (ze.StrictMode = i),
    (ze.Suspense = f),
    (ze.isAsyncMode = function (p) {
      return E(p) || T(p) === c;
    }),
    (ze.isConcurrentMode = E),
    (ze.isContextConsumer = function (p) {
      return T(p) === l;
    }),
    (ze.isContextProvider = function (p) {
      return T(p) === s;
    }),
    (ze.isElement = function (p) {
      return typeof p == 'object' && p !== null && p.$$typeof === t;
    }),
    (ze.isForwardRef = function (p) {
      return T(p) === d;
    }),
    (ze.isFragment = function (p) {
      return T(p) === r;
    }),
    (ze.isLazy = function (p) {
      return T(p) === y;
    }),
    (ze.isMemo = function (p) {
      return T(p) === g;
    }),
    (ze.isPortal = function (p) {
      return T(p) === o;
    }),
    (ze.isProfiler = function (p) {
      return T(p) === a;
    }),
    (ze.isStrictMode = function (p) {
      return T(p) === i;
    }),
    (ze.isSuspense = function (p) {
      return T(p) === f;
    }),
    (ze.isValidElementType = function (p) {
      return (
        typeof p == 'string' ||
        typeof p == 'function' ||
        p === r ||
        p === u ||
        p === a ||
        p === i ||
        p === f ||
        p === b ||
        (typeof p == 'object' &&
          p !== null &&
          (p.$$typeof === y ||
            p.$$typeof === g ||
            p.$$typeof === s ||
            p.$$typeof === l ||
            p.$$typeof === d ||
            p.$$typeof === m ||
            p.$$typeof === C ||
            p.$$typeof === S ||
            p.$$typeof === h))
      );
    }),
    (ze.typeOf = T),
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
var ka;
function qd() {
  return (
    ka ||
      ((ka = 1),
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
            f = e ? Symbol.for('react.suspense') : 60113,
            b = e ? Symbol.for('react.suspense_list') : 60120,
            g = e ? Symbol.for('react.memo') : 60115,
            y = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            m = e ? Symbol.for('react.fundamental') : 60117,
            C = e ? Symbol.for('react.responder') : 60118,
            S = e ? Symbol.for('react.scope') : 60119;
          function T(k) {
            return (
              typeof k == 'string' ||
              typeof k == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              k === r ||
              k === u ||
              k === a ||
              k === i ||
              k === f ||
              k === b ||
              (typeof k == 'object' &&
                k !== null &&
                (k.$$typeof === y ||
                  k.$$typeof === g ||
                  k.$$typeof === s ||
                  k.$$typeof === l ||
                  k.$$typeof === d ||
                  k.$$typeof === m ||
                  k.$$typeof === C ||
                  k.$$typeof === S ||
                  k.$$typeof === h))
            );
          }
          function E(k) {
            if (typeof k == 'object' && k !== null) {
              var Ee = k.$$typeof;
              switch (Ee) {
                case t:
                  var I = k.type;
                  switch (I) {
                    case c:
                    case u:
                    case r:
                    case a:
                    case i:
                    case f:
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
                          return Ee;
                      }
                  }
                case o:
                  return Ee;
              }
            }
          }
          var p = c,
            R = u,
            w = l,
            V = s,
            D = t,
            A = d,
            _ = r,
            K = y,
            B = g,
            M = o,
            j = a,
            z = i,
            le = f,
            ie = !1;
          function G(k) {
            return (
              ie ||
                ((ie = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              $(k) || E(k) === c
            );
          }
          function $(k) {
            return E(k) === u;
          }
          function F(k) {
            return E(k) === l;
          }
          function X(k) {
            return E(k) === s;
          }
          function H(k) {
            return typeof k == 'object' && k !== null && k.$$typeof === t;
          }
          function U(k) {
            return E(k) === d;
          }
          function te(k) {
            return E(k) === r;
          }
          function ne(k) {
            return E(k) === y;
          }
          function J(k) {
            return E(k) === g;
          }
          function re(k) {
            return E(k) === o;
          }
          function se(k) {
            return E(k) === a;
          }
          function me(k) {
            return E(k) === i;
          }
          function oe(k) {
            return E(k) === f;
          }
          (Be.AsyncMode = p),
            (Be.ConcurrentMode = R),
            (Be.ContextConsumer = w),
            (Be.ContextProvider = V),
            (Be.Element = D),
            (Be.ForwardRef = A),
            (Be.Fragment = _),
            (Be.Lazy = K),
            (Be.Memo = B),
            (Be.Portal = M),
            (Be.Profiler = j),
            (Be.StrictMode = z),
            (Be.Suspense = le),
            (Be.isAsyncMode = G),
            (Be.isConcurrentMode = $),
            (Be.isContextConsumer = F),
            (Be.isContextProvider = X),
            (Be.isElement = H),
            (Be.isForwardRef = U),
            (Be.isFragment = te),
            (Be.isLazy = ne),
            (Be.isMemo = J),
            (Be.isPortal = re),
            (Be.isProfiler = se),
            (Be.isStrictMode = me),
            (Be.isSuspense = oe),
            (Be.isValidElementType = T),
            (Be.typeOf = E);
        })()),
    Be
  );
}
process.env.NODE_ENV === 'production' ? (ti.exports = Hd()) : (ti.exports = qd());
var Yd = ti.exports,
  El = Yd,
  Kd = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  Gd = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  Ol = {};
Ol[El.ForwardRef] = Kd;
Ol[El.Memo] = Gd;
var Xd = !0;
function Ti(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (i) {
      e[i] !== void 0 ? t.push(e[i] + ';') : (r += i + ' ');
    }),
    r
  );
}
var cr = function (t, o, r) {
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
      Xd === !1) &&
      t.registered[i] === void 0 &&
      (t.registered[i] = o.styles);
  },
  ur = function (t, o, r) {
    cr(t, o, r);
    var i = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var a = o;
      do t.insert(o === a ? '.' + i : '', a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  };
function Jd(e) {
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
var Zd = {
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
  Ia = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Qd =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  ep = /[A-Z]|^ms/g,
  Tl = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Ci = function (t) {
    return t.charCodeAt(1) === 45;
  },
  _a = function (t) {
    return t != null && typeof t != 'boolean';
  },
  jr = /* @__PURE__ */ fl(function (e) {
    return Ci(e) ? e : e.replace(ep, '-$&').toLowerCase();
  }),
  Xo = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(Tl, function (r, i, a) {
            return (
              (Vt = {
                name: i,
                styles: a,
                next: Vt,
              }),
              i
            );
          });
    }
    return Zd[t] !== 1 && !Ci(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var tp =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    np = ['normal', 'none', 'initial', 'inherit', 'unset'],
    op = Xo,
    rp = /^-ms-/,
    ip = /-(.)/g,
    Ma = {};
  Xo = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (np.indexOf(o) === -1 &&
          !tp.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = op(t, o);
    return (
      r !== '' &&
        !Ci(t) &&
        t.indexOf('-') !== -1 &&
        Ma[t] === void 0 &&
        ((Ma[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(rp, 'ms-').replace(ip, function (i, a) {
              return a.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var Cl =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function go(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(Cl);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1)
        return (
          (Vt = {
            name: o.name,
            styles: o.styles,
            next: Vt,
          }),
          o.name
        );
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; )
            (Vt = {
              name: r.name,
              styles: r.styles,
              next: Vt,
            }),
              (r = r.next);
        var i = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (i += o.map), i;
      }
      return ap(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var a = Vt,
          s = o(e);
        return (Vt = a), go(e, t, s);
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
          c = o.replace(Tl, function (d, f, b) {
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
function ap(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var i = 0; i < o.length; i++) r += go(e, t, o[i]) + ';';
  else
    for (var a in o) {
      var s = o[a];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += a + '{' + t[s] + '}')
          : _a(s) && (r += jr(a) + ':' + Xo(a, s) + ';');
      else {
        if (a === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(Cl);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) _a(s[l]) && (r += jr(a) + ':' + Xo(a, s[l]) + ';');
        else {
          var c = go(e, t, s);
          switch (a) {
            case 'animation':
            case 'animationName': {
              r += jr(a) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && a === 'undefined' && console.error(Qd),
                (r += a + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var Aa = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  Sl;
process.env.NODE_ENV !== 'production' &&
  (Sl = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var Vt,
  Wn = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      a = '';
    Vt = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((i = !1), (a += go(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(Ia),
        (a += s[0]));
    for (var l = 1; l < t.length; l++)
      (a += go(r, o, t[l])),
        i &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(Ia),
          (a += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (a = a.replace(Sl, function (b) {
        return (c = b), '';
      })),
      (Aa.lastIndex = 0);
    for (var u = '', d; (d = Aa.exec(a)) !== null; )
      u +=
        '-' + // $FlowFixMe we know it's not null
        d[1];
    var f = Jd(a) + u;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: f,
          styles: a,
          map: c,
          next: Vt,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : {
          name: f,
          styles: a,
          next: Vt,
        };
  },
  sp = function (t) {
    return t();
  },
  Rl = x['useInsertionEffect'] ? x['useInsertionEffect'] : !1,
  Si = Rl || sp,
  Da = Rl || ru,
  lp = {}.hasOwnProperty,
  Ri = /* @__PURE__ */ Zs(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement < 'u'
      ? /* @__PURE__ */ Wd({
          key: 'css',
        })
      : null,
  );
process.env.NODE_ENV !== 'production' && (Ri.displayName = 'EmotionCacheContext');
Ri.Provider;
var dr = function (t) {
    return /* @__PURE__ */ iu(function (o, r) {
      var i = Oo(Ri);
      return t(o, i, r);
    });
  },
  So = /* @__PURE__ */ Zs({});
process.env.NODE_ENV !== 'production' && (So.displayName = 'EmotionThemeContext');
var La = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  Fa = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  cp = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      cr(o, r, i),
      Si(function () {
        return ur(o, r, i);
      }),
      null
    );
  },
  up = /* @__PURE__ */ dr(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[La],
      a = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = Ti(t.registered, a, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = Wn(a, void 0, Oo(So));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[Fa];
      c && (l = Wn([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var u = {};
    for (var d in e)
      lp.call(e, d) &&
        d !== 'css' &&
        d !== La &&
        (process.env.NODE_ENV === 'production' || d !== Fa) &&
        (u[d] = e[d]);
    return (
      (u.ref = o),
      (u.className = s),
      /* @__PURE__ */ mn(
        pi,
        null,
        /* @__PURE__ */ mn(cp, {
          cache: t,
          serialized: l,
          isStringTag: typeof i == 'string',
        }),
        /* @__PURE__ */ mn(i, u),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (up.displayName = 'EmotionCssPropInternal');
var dp = {
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
  ja = !1,
  wl = /* @__PURE__ */ dr(function (e, t) {
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
      r = Wn([o], void 0, Oo(So)),
      i = au();
    return (
      Da(
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
      Da(
        function () {
          var a = i.current,
            s = a[0],
            l = a[1];
          if (l) {
            a[1] = !1;
            return;
          }
          if ((r.next !== void 0 && ur(t, r.next, !0), s.tags.length)) {
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
function pp() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return Wn(t);
}
var wi = function () {
    var t = pp.apply(void 0, arguments),
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
  fp = function e(t) {
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
function mp(e, t, o) {
  var r = [],
    i = Ti(e, r, o);
  return r.length < 2 ? o : i + t(r);
}
var hp = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      Si(function () {
        for (var i = 0; i < r.length; i++) ur(o, r[i], !1);
      }),
      null
    );
  },
  bp = /* @__PURE__ */ dr(function (e, t) {
    var o = !1,
      r = [],
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var u = arguments.length, d = new Array(u), f = 0; f < u; f++) d[f] = arguments[f];
        var b = Wn(d, t.registered);
        return r.push(b), cr(t, b, !1), t.key + '-' + b.name;
      },
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var u = arguments.length, d = new Array(u), f = 0; f < u; f++) d[f] = arguments[f];
        return mp(t.registered, i, fp(d));
      },
      s = {
        css: i,
        cx: a,
        theme: Oo(So),
      },
      l = e.children(s);
    return (
      (o = !0),
      /* @__PURE__ */ mn(
        pi,
        null,
        /* @__PURE__ */ mn(hp, {
          cache: t,
          serializedArr: r,
        }),
        l,
      )
    );
  });
process.env.NODE_ENV !== 'production' && (bp.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var Va = !0,
    vp = typeof jest < 'u' || typeof vi < 'u';
  if (Va && !vp) {
    var za =
        // $FlowIgnore
        typeof globalThis < 'u' ? globalThis : Va ? window : global,
      Ba = '__EMOTION_REACT_' + dp.version.split('.')[0] + '__';
    za[Ba] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (za[Ba] = !0);
  }
}
var gp = dd,
  yp = function (t) {
    return t !== 'theme';
  },
  Ua = function (t) {
    return typeof t == 'string' && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      t.charCodeAt(0) > 96
      ? gp
      : yp;
  },
  Wa = function (t, o, r) {
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
  Ha = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  xp = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      cr(o, r, i),
      Si(function () {
        return ur(o, r, i);
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
    var l = Wa(t, o, r),
      c = l || Ua(i),
      u = !c('as');
    return function () {
      var d = arguments,
        f = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((a !== void 0 && f.push('label:' + a + ';'), d[0] == null || d[0].raw === void 0))
        f.push.apply(f, d);
      else {
        process.env.NODE_ENV !== 'production' && d[0][0] === void 0 && console.error(Ha),
          f.push(d[0][0]);
        for (var b = d.length, g = 1; g < b; g++)
          process.env.NODE_ENV !== 'production' && d[0][g] === void 0 && console.error(Ha),
            f.push(d[g], d[0][g]);
      }
      var y = dr(function (h, m, C) {
        var S = (u && h.as) || i,
          T = '',
          E = [],
          p = h;
        if (h.theme == null) {
          p = {};
          for (var R in h) p[R] = h[R];
          p.theme = Oo(So);
        }
        typeof h.className == 'string'
          ? (T = Ti(m.registered, E, h.className))
          : h.className != null && (T = h.className + ' ');
        var w = Wn(f.concat(E), m.registered, p);
        (T += m.key + '-' + w.name), s !== void 0 && (T += ' ' + s);
        var V = u && l === void 0 ? Ua(S) : c,
          D = {};
        for (var A in h)
          (u && A === 'as') || // $FlowFixMe
            (V(A) && (D[A] = h[A]));
        return (
          (D.className = T),
          (D.ref = C),
          /* @__PURE__ */ mn(
            pi,
            null,
            /* @__PURE__ */ mn(xp, {
              cache: m,
              serialized: w,
              isStringTag: typeof S == 'string',
            }),
            /* @__PURE__ */ mn(S, D),
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
        (y.__emotion_styles = f),
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
              shouldForwardProp: Wa(y, m, !0),
            }),
          ).apply(void 0, f);
        }),
        y
      );
    };
  };
const Op = Ep;
var Tp = [
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
  ni = Op.bind();
Tp.forEach(function (e) {
  ni[e] = ni(e);
});
const Cp = ni;
function Sp(e) {
  return e == null || Object.keys(e).length === 0;
}
function $l(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return /* @__PURE__ */ L(wl, {
    styles: typeof t == 'function' ? (i) => t(Sp(i) ? o : i) : t,
  });
}
process.env.NODE_ENV !== 'production' &&
  ($l.propTypes = {
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
function Rp(e, t) {
  const o = Cp(e, t);
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
const wp = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  $p =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  vn = $p;
function lo(e, t) {
  return t
    ? Mt(e, t, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const $i = {
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
  qa = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${$i[e]}px)`,
  };
function Qt(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || qa;
    return t.reduce((s, l, c) => ((s[a.up(a.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const a = r.breakpoints || qa;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || $i).indexOf(l) !== -1) {
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
function Pp(e = {}) {
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
function Np(e, t) {
  return e.reduce((o, r) => {
    const i = o[r];
    return (!i || Object.keys(i).length === 0) && delete o[r], o;
  }, t);
}
function pr(e, t, o = !0) {
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
    typeof e == 'function' ? (i = e(o)) : Array.isArray(e) ? (i = e[o] || r) : (i = pr(e, o) || r),
    t && (i = t(i, r, e)),
    i
  );
}
function Ye(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: i } = e,
    a = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        u = pr(c, r) || {};
      return Qt(s, l, (f) => {
        let b = Jo(u, i, f);
        return (
          f === b &&
            typeof f == 'string' &&
            (b = Jo(u, i, `${t}${f === 'default' ? '' : ae(f)}`, f)),
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
function fr(...e) {
  const t = e.reduce(
      (r, i) => (
        i.filterProps.forEach((a) => {
          r[a] = i;
        }),
        r
      ),
      {},
    ),
    o = (r) => Object.keys(r).reduce((i, a) => (t[a] ? lo(i, t[a](r)) : i), {});
  return (
    (o.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((r, i) => Object.assign(r, i.propTypes), {})
        : {}),
    (o.filterProps = e.reduce((r, i) => r.concat(i.filterProps), [])),
    o
  );
}
function kp(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const Ip = {
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
  Ya = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  Mp = kp((e) => {
    if (e.length > 2)
      if (Ya[e]) e = Ya[e];
      else return [e];
    const [t, o] = e.split(''),
      r = Ip[t],
      i = _p[o] || '';
    return Array.isArray(i) ? i.map((a) => r + a) : [r + i];
  }),
  mr = [
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
  hr = [
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
  Ap = [...mr, ...hr];
function Ro(e, t, o, r) {
  var i;
  const a = (i = pr(e, t, !1)) != null ? i : o;
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
function Pl(e) {
  return Ro(e, 'spacing', 8, 'spacing');
}
function wo(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function Dp(e, t) {
  return (o) => e.reduce((r, i) => ((r[i] = wo(t, o)), r), {});
}
function Lp(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const i = Mp(o),
    a = Dp(i, r),
    s = e[o];
  return Qt(e, s, a);
}
function Nl(e, t) {
  const o = Pl(e.theme);
  return Object.keys(e)
    .map((r) => Lp(e, t, r, o))
    .reduce(lo, {});
}
function it(e) {
  return Nl(e, mr);
}
it.propTypes =
  process.env.NODE_ENV !== 'production' ? mr.reduce((e, t) => ((e[t] = vn), e), {}) : {};
it.filterProps = mr;
function at(e) {
  return Nl(e, hr);
}
at.propTypes =
  process.env.NODE_ENV !== 'production' ? hr.reduce((e, t) => ((e[t] = vn), e), {}) : {};
at.filterProps = hr;
process.env.NODE_ENV !== 'production' && Ap.reduce((e, t) => ((e[t] = vn), e), {});
function Xt(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Fp = Ye({
    prop: 'border',
    themeKey: 'borders',
    transform: Xt,
  }),
  jp = Ye({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: Xt,
  }),
  Vp = Ye({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: Xt,
  }),
  zp = Ye({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: Xt,
  }),
  Bp = Ye({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: Xt,
  }),
  Up = Ye({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  Wp = Ye({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  Hp = Ye({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  qp = Ye({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  Yp = Ye({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  br = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = Ro(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({
          borderRadius: wo(t, r),
        });
      return Qt(e, e.borderRadius, o);
    }
    return null;
  };
br.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: vn,
      }
    : {};
br.filterProps = ['borderRadius'];
fr(Fp, jp, Vp, zp, Bp, Up, Wp, Hp, qp, Yp, br);
const vr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Ro(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({
        gap: wo(t, r),
      });
    return Qt(e, e.gap, o);
  }
  return null;
};
vr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: vn,
      }
    : {};
vr.filterProps = ['gap'];
const gr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Ro(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({
        columnGap: wo(t, r),
      });
    return Qt(e, e.columnGap, o);
  }
  return null;
};
gr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: vn,
      }
    : {};
gr.filterProps = ['columnGap'];
const yr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Ro(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({
        rowGap: wo(t, r),
      });
    return Qt(e, e.rowGap, o);
  }
  return null;
};
yr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: vn,
      }
    : {};
yr.filterProps = ['rowGap'];
const Kp = Ye({
    prop: 'gridColumn',
  }),
  Gp = Ye({
    prop: 'gridRow',
  }),
  Xp = Ye({
    prop: 'gridAutoFlow',
  }),
  Jp = Ye({
    prop: 'gridAutoColumns',
  }),
  Zp = Ye({
    prop: 'gridAutoRows',
  }),
  Qp = Ye({
    prop: 'gridTemplateColumns',
  }),
  ef = Ye({
    prop: 'gridTemplateRows',
  }),
  tf = Ye({
    prop: 'gridTemplateAreas',
  }),
  nf = Ye({
    prop: 'gridArea',
  });
fr(vr, gr, yr, Kp, Gp, Xp, Jp, Zp, Qp, ef, tf, nf);
function Bn(e, t) {
  return t === 'grey' ? t : e;
}
const of = Ye({
    prop: 'color',
    themeKey: 'palette',
    transform: Bn,
  }),
  rf = Ye({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: Bn,
  }),
  af = Ye({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: Bn,
  });
fr(of, rf, af);
function $t(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const sf = Ye({
    prop: 'width',
    transform: $t,
  }),
  Pi = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, i, a;
        return {
          maxWidth:
            ((r = e.theme) == null || (i = r.breakpoints) == null || (a = i.values) == null
              ? void 0
              : a[o]) ||
            $i[o] ||
            $t(o),
        };
      };
      return Qt(e, e.maxWidth, t);
    }
    return null;
  };
Pi.filterProps = ['maxWidth'];
const lf = Ye({
    prop: 'minWidth',
    transform: $t,
  }),
  cf = Ye({
    prop: 'height',
    transform: $t,
  }),
  uf = Ye({
    prop: 'maxHeight',
    transform: $t,
  }),
  df = Ye({
    prop: 'minHeight',
    transform: $t,
  });
Ye({
  prop: 'size',
  cssProperty: 'width',
  transform: $t,
});
Ye({
  prop: 'size',
  cssProperty: 'height',
  transform: $t,
});
const pf = Ye({
  prop: 'boxSizing',
});
fr(sf, Pi, lf, cf, uf, df, pf);
const Vr = (e) => (t) => {
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
                    : ae((a = t[e]) == null ? void 0 : a.toString())
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
  ff = {
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
      style: br,
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
      style: vr,
    },
    rowGap: {
      style: yr,
    },
    columnGap: {
      style: gr,
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
      transform: $t,
    },
    maxWidth: {
      style: Pi,
    },
    minWidth: {
      transform: $t,
    },
    height: {
      transform: $t,
    },
    maxHeight: {
      transform: $t,
    },
    minHeight: {
      transform: $t,
    },
    boxSizing: {},
    // typography
    fontFamily: {
      themeKey: 'typography',
      style: Vr('fontFamily'),
    },
    fontSize: {
      themeKey: 'typography',
      style: Vr('fontSize'),
    },
    fontStyle: {
      themeKey: 'typography',
    },
    fontWeight: {
      themeKey: 'typography',
      style: Vr('fontWeight'),
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
  Ni = ff;
function mf(...e) {
  const t = e.reduce((r, i) => r.concat(Object.keys(i)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function hf(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function bf() {
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
    const { cssProperty: c = o, themeKey: u, transform: d, style: f } = l;
    if (r == null) return null;
    const b = pr(i, u) || {};
    return f
      ? f(s)
      : Qt(s, r, (y) => {
          let h = Jo(b, d, y);
          return (
            y === h &&
              typeof y == 'string' &&
              (h = Jo(b, d, `${o}${y === 'default' ? '' : ae(y)}`, y)),
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
    const s = (r = a.unstable_sxConfig) != null ? r : Ni;
    function l(c) {
      let u = c;
      if (typeof c == 'function') u = c(a);
      else if (typeof c != 'object') return c;
      if (!u) return null;
      const d = Pp(a.breakpoints),
        f = Object.keys(d);
      let b = d;
      return (
        Object.keys(u).forEach((g) => {
          const y = hf(u[g], a);
          if (y != null)
            if (typeof y == 'object')
              if (s[g]) b = lo(b, e(g, y, a, s));
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
                mf(h, y)
                  ? (b[g] = t({
                      sx: y,
                      theme: a,
                    }))
                  : (b = lo(b, h));
              }
            else b = lo(b, e(g, y, a, s));
        }),
        Np(f, b)
      );
    }
    return Array.isArray(i) ? i.map(l) : l(i);
  }
  return t;
}
const kl = bf();
kl.filterProps = ['sx'];
const ki = kl;
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
function Oe() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = Il(e)) && (r && (r += ' '), (r += t));
  return r;
}
const vf = ['values', 'unit', 'step'],
  gf = (e) => {
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
function yf(e) {
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
    i = Te(e, vf),
    a = gf(t),
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
  function f(b) {
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
      not: f,
      unit: o,
    },
    i,
  );
}
const xf = {
    borderRadius: 4,
  },
  Ef = xf;
function Of(e = 8) {
  if (e.mui) return e;
  const t = Pl({
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
const Tf = ['breakpoints', 'palette', 'spacing', 'shape'];
function Ii(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: i, shape: a = {} } = e,
    s = Te(e, Tf),
    l = yf(o),
    c = Of(i);
  let u = Mt(
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
      shape: v({}, Ef, a),
    },
    s,
  );
  return (
    (u = t.reduce((d, f) => Mt(d, f), u)),
    (u.unstable_sxConfig = v({}, Ni, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (f) {
      return ki({
        sx: f,
        theme: this,
      });
    }),
    u
  );
}
const _l = /* @__PURE__ */ x.createContext(null);
process.env.NODE_ENV !== 'production' && (_l.displayName = 'ThemeContext');
const Cf = _l;
function Sf() {
  const e = x.useContext(Cf);
  return process.env.NODE_ENV !== 'production' && x.useDebugValue(e), e;
}
function Rf(e) {
  return Object.keys(e).length === 0;
}
function Ml(e = null) {
  const t = Sf();
  return !t || Rf(t) ? e : t;
}
const wf = Ii();
function Al(e = wf) {
  return Ml(e);
}
const $f = ['variant'];
function Ka(e) {
  return e.length === 0;
}
function Dl(e) {
  const { variant: t } = e,
    o = Te(e, $f);
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((i) => {
        i === 'color'
          ? (r += Ka(r) ? e[i] : ae(e[i]))
          : (r += `${Ka(r) ? i : ae(i)}${ae(e[i].toString())}`);
      }),
    r
  );
}
const Pf = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'],
  Nf = ['theme'],
  kf = ['theme'];
function oo(e) {
  return Object.keys(e).length === 0;
}
function If(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const _f = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Mf = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((i) => {
        const a = Dl(i.props);
        r[a] = i.style;
      }),
      r
    );
  },
  Af = (e, t, o, r) => {
    var i, a;
    const { ownerState: s = {} } = e,
      l = [],
      c = o == null || (i = o.components) == null || (a = i[r]) == null ? void 0 : a.variants;
    return (
      c &&
        c.forEach((u) => {
          let d = !0;
          Object.keys(u.props).forEach((f) => {
            s[f] !== u.props[f] && e[f] !== u.props[f] && (d = !1);
          }),
            d && l.push(t[Dl(u.props)]);
        }),
      l
    );
  };
function co(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Df = Ii(),
  Lf = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function Ff(e = {}) {
  const { defaultTheme: t = Df, rootShouldForwardProp: o = co, slotShouldForwardProp: r = co } = e,
    i = (a) => {
      const s = oo(a.theme) ? t : a.theme;
      return ki(
        v({}, a, {
          theme: s,
        }),
      );
    };
  return (
    (i.__mui_systemSx = !0),
    (a, s = {}) => {
      wp(a, (T) => T.filter((E) => !(E != null && E.__mui_systemSx)));
      const { name: l, slot: c, skipVariantsResolver: u, skipSx: d, overridesResolver: f } = s,
        b = Te(s, Pf),
        g = u !== void 0 ? u : (c && c !== 'Root') || !1,
        y = d || !1;
      let h;
      process.env.NODE_ENV !== 'production' && l && (h = `${l}-${Lf(c || 'Root')}`);
      let m = co;
      c === 'Root' ? (m = o) : c ? (m = r) : If(a) && (m = void 0);
      const C = Rp(
          a,
          v(
            {
              shouldForwardProp: m,
              label: h,
            },
            b,
          ),
        ),
        S = (T, ...E) => {
          const p = E
            ? E.map((D) =>
                typeof D == 'function' && D.__emotion_real !== D
                  ? (A) => {
                      let { theme: _ } = A,
                        K = Te(A, Nf);
                      return D(
                        v(
                          {
                            theme: oo(_) ? t : _,
                          },
                          K,
                        ),
                      );
                    }
                  : D,
              )
            : [];
          let R = T;
          l &&
            f &&
            p.push((D) => {
              const A = oo(D.theme) ? t : D.theme,
                _ = _f(l, A);
              if (_) {
                const K = {};
                return (
                  Object.entries(_).forEach(([B, M]) => {
                    K[B] =
                      typeof M == 'function'
                        ? M(
                            v({}, D, {
                              theme: A,
                            }),
                          )
                        : M;
                  }),
                  f(D, K)
                );
              }
              return null;
            }),
            l &&
              !g &&
              p.push((D) => {
                const A = oo(D.theme) ? t : D.theme;
                return Af(D, Mf(l, A), A, l);
              }),
            y || p.push(i);
          const w = p.length - E.length;
          if (Array.isArray(T) && w > 0) {
            const D = new Array(w).fill('');
            (R = [...T, ...D]), (R.raw = [...T.raw, ...D]);
          } else
            typeof T == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              T.__emotion_real !== T &&
              (R = (D) => {
                let { theme: A } = D,
                  _ = Te(D, kf);
                return T(
                  v(
                    {
                      theme: oo(A) ? t : A,
                    },
                    _,
                  ),
                );
              });
          const V = C(R, ...p);
          if (process.env.NODE_ENV !== 'production') {
            let D;
            l && (D = `${l}${c || ''}`),
              D === void 0 && (D = `Styled(${Bu(a)})`),
              (V.displayName = D);
          }
          return V;
        };
      return C.withConfig && (S.withConfig = C.withConfig), S;
    }
  );
}
function jf(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : gi(t.components[o].defaultProps, r);
}
function Vf({ props: e, name: t, defaultTheme: o }) {
  const r = Al(o);
  return jf({
    theme: r,
    name: t,
    props: e,
  });
}
function _i(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function zf(e) {
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
  if (e.charAt(0) === '#') return wn(zf(e));
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
function xr(e) {
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
function Bf(e) {
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
    xr({
      type: l,
      values: c,
    })
  );
}
function Ga(e) {
  e = wn(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? wn(Bf(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function Xa(e, t) {
  const o = Ga(e),
    r = Ga(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function et(e, t) {
  return (
    (e = wn(e)),
    (t = _i(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    xr(e)
  );
}
function Mi(e, t) {
  if (((e = wn(e)), (t = _i(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return xr(e);
}
function Ai(e, t) {
  if (((e = wn(e)), (t = _i(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return xr(e);
}
function Uf(e, t) {
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
const Wf = ['mode', 'contrastThreshold', 'tonalOffset'],
  Ja = {
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
      paper: ho.white,
      default: ho.white,
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
  zr = {
    text: {
      primary: ho.white,
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
      active: ho.white,
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
function Za(e, t, o, r) {
  const i = r.light || r,
    a = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = Ai(e.main, i))
      : t === 'dark' && (e.dark = Mi(e.main, a)));
}
function Hf(e = 'light') {
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
function qf(e = 'light') {
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
function Yf(e = 'light') {
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
function Kf(e = 'light') {
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
function Gf(e = 'light') {
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
function Xf(e = 'light') {
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
function Jf(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2 } = e,
    i = Te(e, Wf),
    a = e.primary || Hf(t),
    s = e.secondary || qf(t),
    l = e.error || Yf(t),
    c = e.info || Kf(t),
    u = e.success || Gf(t),
    d = e.warning || Xf(t);
  function f(h) {
    const m = Xa(h, zr.text.primary) >= o ? zr.text.primary : Ja.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const C = Xa(h, m);
      C < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${C}:1 for ${m} on ${h}`,
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
      mainShade: C = 500,
      lightShade: S = 300,
      darkShade: T = 700,
    }) => {
      if (((h = v({}, h)), !h.main && h[C] && (h.main = h[C]), !h.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${m ? ` (${m})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${C}\` property.`
            : bn(11, m ? ` (${m})` : '', C),
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
        Za(h, 'light', S, r), Za(h, 'dark', T, r), h.contrastText || (h.contrastText = f(h.main)), h
      );
    },
    g = {
      dark: zr,
      light: Ja,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (g[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    Mt(
      v(
        {
          // A collection of common colors.
          common: v({}, ho),
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
          grey: Cu,
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: o,
          // Takes a background color and returns the text color that maximizes the contrast.
          getContrastText: f,
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
const Zf = [
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
function Qf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Qa = {
    textTransform: 'uppercase',
  },
  es = '"Roboto", "Helvetica", "Arial", sans-serif';
function em(e, t) {
  const o = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: r = es,
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
      pxToRem: f,
    } = o,
    b = Te(o, Zf);
  process.env.NODE_ENV !== 'production' &&
    (typeof i != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof u != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const g = i / 14,
    y = f || ((C) => `${(C / u) * g}rem`),
    h = (C, S, T, E, p) =>
      v(
        {
          fontFamily: r,
          fontWeight: C,
          fontSize: y(S),
          // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
          lineHeight: T,
        },
        r === es
          ? {
              letterSpacing: `${Qf(E / S)}em`,
            }
          : {},
        p,
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
      button: h(l, 14, 1.75, 0.4, Qa),
      caption: h(s, 12, 1.66, 0.4),
      overline: h(s, 12, 2.66, 1, Qa),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return Mt(
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
const tm = 0.2,
  nm = 0.14,
  om = 0.12;
function nt(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${tm})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${nm})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${om})`,
  ].join(',');
}
const rm = [
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
  im = rm,
  am = ['duration', 'easing', 'delay'],
  sm = {
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
  lm = {
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
function ts(e) {
  return `${Math.round(e)}ms`;
}
function cm(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function um(e) {
  const t = v({}, sm, e.easing),
    o = v({}, lm, e.duration);
  return v(
    {
      getAutoHeightDuration: cm,
      create: (i = ['all'], a = {}) => {
        const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0 } = a,
          u = Te(a, am);
        if (process.env.NODE_ENV !== 'production') {
          const d = (b) => typeof b == 'string',
            f = (b) => !isNaN(parseFloat(b));
          !d(i) &&
            !Array.isArray(i) &&
            console.error('MUI: Argument "props" must be a string or Array.'),
            !f(s) &&
              !d(s) &&
              console.error(
                `MUI: Argument "duration" must be a number or a string but found ${s}.`,
              ),
            d(l) || console.error('MUI: Argument "easing" must be a string.'),
            !f(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'),
            Object.keys(u).length !== 0 &&
              console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(',')}].`);
        }
        return (Array.isArray(i) ? i : [i])
          .map(
            (d) =>
              `${d} ${typeof s == 'string' ? s : ts(s)} ${l} ${typeof c == 'string' ? c : ts(c)}`,
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
const dm = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  pm = dm,
  fm = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function mm(e = {}, ...t) {
  const { mixins: o = {}, palette: r = {}, transitions: i = {}, typography: a = {} } = e,
    s = Te(e, fm);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : bn(18),
    );
  const l = Jf(r),
    c = Ii(e);
  let u = Mt(c, {
    mixins: Uf(c.breakpoints, o),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: im.slice(),
    typography: em(l, a),
    transitions: um(i),
    zIndex: v({}, pm),
  });
  if (
    ((u = Mt(u, s)), (u = t.reduce((d, f) => Mt(d, f), u)), process.env.NODE_ENV !== 'production')
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
      f = (b, g) => {
        let y;
        for (y in b) {
          const h = b[y];
          if (d.indexOf(y) !== -1 && Object.keys(h).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const m = De('', y);
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
      g && b.indexOf('Mui') === 0 && f(g, b);
    });
  }
  return (
    (u.unstable_sxConfig = v({}, Ni, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (f) {
      return ki({
        sx: f,
        theme: this,
      });
    }),
    u
  );
}
const hm = mm(),
  Er = hm;
function $o() {
  const e = Al(Er);
  return process.env.NODE_ENV !== 'production' && x.useDebugValue(e), e;
}
function Ge({ props: e, name: t }) {
  return Vf({
    props: e,
    name: t,
    defaultTheme: Er,
  });
}
const tn = (e) => co(e) && e !== 'classes',
  Di = co,
  bm = Ff({
    defaultTheme: Er,
    rootShouldForwardProp: tn,
  }),
  he = bm,
  vm = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  ns = vm;
function hn(e) {
  return typeof e == 'string';
}
function gm(e, t, o) {
  return e === void 0 || hn(e)
    ? t
    : v({}, t, {
        ownerState: v({}, t.ownerState, o),
      });
}
const ym = {
    disableDefaultClasses: !1,
  },
  xm = /* @__PURE__ */ x.createContext(ym);
function Ll(e) {
  const { disableDefaultClasses: t } = x.useContext(xm);
  return (o) => (t ? '' : e(o));
}
function Em(e, t = []) {
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
function oi(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function os(e) {
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
function Om(e) {
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
  const s = Em(v({}, i, r)),
    l = os(r),
    c = os(i),
    u = t(s),
    d = Oe(
      u == null ? void 0 : u.className,
      o == null ? void 0 : o.className,
      a,
      i == null ? void 0 : i.className,
      r == null ? void 0 : r.className,
    ),
    f = v(
      {},
      u == null ? void 0 : u.style,
      o == null ? void 0 : o.style,
      i == null ? void 0 : i.style,
      r == null ? void 0 : r.style,
    ),
    b = v({}, u, o, c, l);
  return (
    d.length > 0 && (b.className = d),
    Object.keys(f).length > 0 && (b.style = f),
    {
      props: b,
      internalRef: u.ref,
    }
  );
}
const Tm = ['elementType', 'externalSlotProps', 'ownerState'];
function jt(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: i } = e,
    a = Te(e, Tm),
    s = oi(r, i),
    { props: l, internalRef: c } = Om(
      v({}, a, {
        externalSlotProps: s,
      }),
    ),
    u = ft(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return gm(
    o,
    v({}, l, {
      ref: u,
    }),
    i,
  );
}
const Cm = [
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
function Sm(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function Rm(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function wm(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || Rm(e));
}
function $m(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(Cm)).forEach((r, i) => {
      const a = Sm(r);
      a === -1 ||
        !wm(r) ||
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
function Pm() {
  return !0;
}
function Zo(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: i = !1,
      getTabbable: a = $m,
      isEnabled: s = Pm,
      open: l,
    } = e,
    c = x.useRef(!1),
    u = x.useRef(null),
    d = x.useRef(null),
    f = x.useRef(null),
    b = x.useRef(null),
    g = x.useRef(!1),
    y = x.useRef(null),
    h = ft(t.ref, y),
    m = x.useRef(null);
  x.useEffect(() => {
    !l || !y.current || (g.current = !o);
  }, [o, l]),
    x.useEffect(() => {
      if (!l || !y.current) return;
      const T = pt(y.current);
      return (
        y.current.contains(T.activeElement) ||
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
            (f.current && f.current.focus && ((c.current = !0), f.current.focus()),
            (f.current = null));
        }
      );
    }, [l]),
    x.useEffect(() => {
      if (!l || !y.current) return;
      const T = pt(y.current),
        E = (w) => {
          const { current: V } = y;
          if (V !== null) {
            if (!T.hasFocus() || r || !s() || c.current) {
              c.current = !1;
              return;
            }
            if (!V.contains(T.activeElement)) {
              if ((w && b.current !== w.target) || T.activeElement !== b.current) b.current = null;
              else if (b.current !== null) return;
              if (!g.current) return;
              let _ = [];
              if (
                ((T.activeElement === u.current || T.activeElement === d.current) &&
                  (_ = a(y.current)),
                _.length > 0)
              ) {
                var D, A;
                const K = !!(
                    (D = m.current) != null &&
                    D.shiftKey &&
                    ((A = m.current) == null ? void 0 : A.key) === 'Tab'
                  ),
                  B = _[0],
                  M = _[_.length - 1];
                typeof B != 'string' && typeof M != 'string' && (K ? M.focus() : B.focus());
              } else V.focus();
            }
          }
        },
        p = (w) => {
          (m.current = w),
            !(r || !s() || w.key !== 'Tab') &&
              T.activeElement === y.current &&
              w.shiftKey &&
              ((c.current = !0), d.current && d.current.focus());
        };
      T.addEventListener('focusin', E), T.addEventListener('keydown', p, !0);
      const R = setInterval(() => {
        T.activeElement && T.activeElement.tagName === 'BODY' && E(null);
      }, 50);
      return () => {
        clearInterval(R),
          T.removeEventListener('focusin', E),
          T.removeEventListener('keydown', p, !0);
      };
    }, [o, r, i, s, l, a]);
  const C = (T) => {
      f.current === null && (f.current = T.relatedTarget), (g.current = !0), (b.current = T.target);
      const E = t.props.onFocus;
      E && E(T);
    },
    S = (T) => {
      f.current === null && (f.current = T.relatedTarget), (g.current = !0);
    };
  return /* @__PURE__ */ Qe(x.Fragment, {
    children: [
      /* @__PURE__ */ L('div', {
        tabIndex: l ? 0 : -1,
        onFocus: S,
        ref: u,
        'data-testid': 'sentinelStart',
      }),
      /* @__PURE__ */ x.cloneElement(t, {
        ref: h,
        onFocus: C,
      }),
      /* @__PURE__ */ L('div', {
        tabIndex: l ? 0 : -1,
        onFocus: S,
        ref: d,
        'data-testid': 'sentinelEnd',
      }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (Zo.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: To,
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
process.env.NODE_ENV !== 'production' && (Zo['propTypes'] = il(Zo.propTypes));
var Ot = 'top',
  At = 'bottom',
  Dt = 'right',
  Tt = 'left',
  Or = 'auto',
  Po = [Ot, At, Dt, Tt],
  Hn = 'start',
  yo = 'end',
  Nm = 'clippingParents',
  Fl = 'viewport',
  ro = 'popper',
  km = 'reference',
  rs = /* @__PURE__ */ Po.reduce(function (e, t) {
    return e.concat([t + '-' + Hn, t + '-' + yo]);
  }, []),
  jl = /* @__PURE__ */ [].concat(Po, [Or]).reduce(function (e, t) {
    return e.concat([t, t + '-' + Hn, t + '-' + yo]);
  }, []),
  Im = 'beforeRead',
  _m = 'read',
  Mm = 'afterRead',
  Am = 'beforeMain',
  Dm = 'main',
  Lm = 'afterMain',
  Fm = 'beforeWrite',
  jm = 'write',
  Vm = 'afterWrite',
  ri = [Im, _m, Mm, Am, Dm, Lm, Fm, jm, Vm];
function en(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function Lt(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function $n(e) {
  var t = Lt(e).Element;
  return e instanceof t || e instanceof Element;
}
function kt(e) {
  var t = Lt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Li(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Lt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function zm(e) {
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
function Bm(e) {
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
const Um = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: zm,
  effect: Bm,
  requires: ['computeStyles'],
};
function Ut(e) {
  return e.split('-')[0];
}
var Sn = Math.max,
  Qo = Math.min,
  qn = Math.round;
function ii() {
  var e = navigator.userAgentData;
  return e != null && e.brands
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function Vl() {
  return !/^((?!chrome|android).)*safari/i.test(ii());
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
  var s = $n(e) ? Lt(e) : window,
    l = s.visualViewport,
    c = !Vl() && o,
    u = (r.left + (c && l ? l.offsetLeft : 0)) / i,
    d = (r.top + (c && l ? l.offsetTop : 0)) / a,
    f = r.width / i,
    b = r.height / a;
  return {
    width: f,
    height: b,
    top: d,
    right: u + f,
    bottom: d + b,
    left: u,
    x: u,
    y: d,
  };
}
function Fi(e) {
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
function zl(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && Li(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ht(e) {
  return Lt(e).getComputedStyle(e);
}
function Wm(e) {
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
function Tr(e) {
  return en(e) === 'html'
    ? e
    : // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        e.parentNode || // DOM Element detected
        (Li(e) ? e.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        gn(e);
}
function is(e) {
  return !kt(e) || // https://github.com/popperjs/popper-core/issues/837
    Ht(e).position === 'fixed'
    ? null
    : e.offsetParent;
}
function Hm(e) {
  var t = /firefox/i.test(ii()),
    o = /Trident/i.test(ii());
  if (o && kt(e)) {
    var r = Ht(e);
    if (r.position === 'fixed') return null;
  }
  var i = Tr(e);
  for (Li(i) && (i = i.host); kt(i) && ['html', 'body'].indexOf(en(i)) < 0; ) {
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
  for (var t = Lt(e), o = is(e); o && Wm(o) && Ht(o).position === 'static'; ) o = is(o);
  return o && (en(o) === 'html' || (en(o) === 'body' && Ht(o).position === 'static'))
    ? t
    : o || Hm(e) || t;
}
function ji(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function uo(e, t, o) {
  return Sn(e, Qo(t, o));
}
function qm(e, t, o) {
  var r = uo(e, t, o);
  return r > o ? o : r;
}
function Bl() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
function Ul(e) {
  return Object.assign({}, Bl(), e);
}
function Wl(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var Ym = function (t, o) {
  return (
    (t =
      typeof t == 'function'
        ? t(
            Object.assign({}, o.rects, {
              placement: o.placement,
            }),
          )
        : t),
    Ul(typeof t != 'number' ? t : Wl(t, Po))
  );
};
function Km(e) {
  var t,
    o = e.state,
    r = e.name,
    i = e.options,
    a = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = Ut(o.placement),
    c = ji(l),
    u = [Tt, Dt].indexOf(l) >= 0,
    d = u ? 'height' : 'width';
  if (!(!a || !s)) {
    var f = Ym(i.padding, o),
      b = Fi(a),
      g = c === 'y' ? Ot : Tt,
      y = c === 'y' ? At : Dt,
      h = o.rects.reference[d] + o.rects.reference[c] - s[c] - o.rects.popper[d],
      m = s[c] - o.rects.reference[c],
      C = No(a),
      S = C ? (c === 'y' ? C.clientHeight || 0 : C.clientWidth || 0) : 0,
      T = h / 2 - m / 2,
      E = f[g],
      p = S - b[d] - f[y],
      R = S / 2 - b[d] / 2 + T,
      w = uo(E, R, p),
      V = c;
    o.modifiersData[r] = ((t = {}), (t[V] = w), (t.centerOffset = w - R), t);
  }
}
function Gm(e) {
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
      !zl(t.elements.popper, i))
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
const Xm = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: Km,
  effect: Gm,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function Kn(e) {
  return e.split('-')[1];
}
var Jm = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
};
function Zm(e) {
  var t = e.x,
    o = e.y,
    r = window,
    i = r.devicePixelRatio || 1;
  return {
    x: qn(t * i) / i || 0,
    y: qn(o * i) / i || 0,
  };
}
function as(e) {
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
    f = e.isFixed,
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
  var C = s.hasOwnProperty('x'),
    S = s.hasOwnProperty('y'),
    T = Tt,
    E = Ot,
    p = window;
  if (u) {
    var R = No(o),
      w = 'clientHeight',
      V = 'clientWidth';
    if (
      (R === Lt(o) &&
        ((R = gn(o)),
        Ht(R).position !== 'static' &&
          l === 'absolute' &&
          ((w = 'scrollHeight'), (V = 'scrollWidth'))),
      (R = R),
      i === Ot || ((i === Tt || i === Dt) && a === yo))
    ) {
      E = At;
      var D =
        f && R === p && p.visualViewport
          ? p.visualViewport.height
          : // $FlowFixMe[prop-missing]
            R[w];
      (h -= D - r.height), (h *= c ? 1 : -1);
    }
    if (i === Tt || ((i === Ot || i === At) && a === yo)) {
      T = Dt;
      var A =
        f && R === p && p.visualViewport
          ? p.visualViewport.width
          : // $FlowFixMe[prop-missing]
            R[V];
      (g -= A - r.width), (g *= c ? 1 : -1);
    }
  }
  var _ = Object.assign(
      {
        position: l,
      },
      u && Jm,
    ),
    K =
      d === !0
        ? Zm({
            x: g,
            y: h,
          })
        : {
            x: g,
            y: h,
          };
  if (((g = K.x), (h = K.y), c)) {
    var B;
    return Object.assign(
      {},
      _,
      ((B = {}),
      (B[E] = S ? '0' : ''),
      (B[T] = C ? '0' : ''),
      (B.transform =
        (p.devicePixelRatio || 1) <= 1
          ? 'translate(' + g + 'px, ' + h + 'px)'
          : 'translate3d(' + g + 'px, ' + h + 'px, 0)'),
      B),
    );
  }
  return Object.assign(
    {},
    _,
    ((t = {}), (t[E] = S ? h + 'px' : ''), (t[T] = C ? g + 'px' : ''), (t.transform = ''), t),
  );
}
function Qm(e) {
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
      ['transform', 'top', 'right', 'bottom', 'left'].some(function (f) {
        return u.indexOf(f) >= 0;
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
      as(
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
        as(
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
const eh = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: Qm,
  data: {},
};
var Mo = {
  passive: !0,
};
function th(e) {
  var t = e.state,
    o = e.instance,
    r = e.options,
    i = r.scroll,
    a = i === void 0 ? !0 : i,
    s = r.resize,
    l = s === void 0 ? !0 : s,
    c = Lt(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      u.forEach(function (d) {
        d.addEventListener('scroll', o.update, Mo);
      }),
    l && c.addEventListener('resize', o.update, Mo),
    function () {
      a &&
        u.forEach(function (d) {
          d.removeEventListener('scroll', o.update, Mo);
        }),
        l && c.removeEventListener('resize', o.update, Mo);
    }
  );
}
const nh = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: th,
  data: {},
};
var oh = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
function qo(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return oh[t];
  });
}
var rh = {
  start: 'end',
  end: 'start',
};
function ss(e) {
  return e.replace(/start|end/g, function (t) {
    return rh[t];
  });
}
function Vi(e) {
  var t = Lt(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r,
  };
}
function zi(e) {
  return Yn(gn(e)).left + Vi(e).scrollLeft;
}
function ih(e, t) {
  var o = Lt(e),
    r = gn(e),
    i = o.visualViewport,
    a = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (i) {
    (a = i.width), (s = i.height);
    var u = Vl();
    (u || (!u && t === 'fixed')) && ((l = i.offsetLeft), (c = i.offsetTop));
  }
  return {
    width: a,
    height: s,
    x: l + zi(e),
    y: c,
  };
}
function ah(e) {
  var t,
    o = gn(e),
    r = Vi(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = Sn(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
    s = Sn(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
    l = -r.scrollLeft + zi(e),
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
function Bi(e) {
  var t = Ht(e),
    o = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function Hl(e) {
  return ['html', 'body', '#document'].indexOf(en(e)) >= 0
    ? e.ownerDocument.body
    : kt(e) && Bi(e)
    ? e
    : Hl(Tr(e));
}
function po(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = Hl(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    a = Lt(r),
    s = i ? [a].concat(a.visualViewport || [], Bi(r) ? r : []) : r,
    l = t.concat(s);
  return i
    ? l
    : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(po(Tr(s)));
}
function ai(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function sh(e, t) {
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
function ls(e, t, o) {
  return t === Fl ? ai(ih(e, o)) : $n(t) ? sh(t, o) : ai(ah(gn(e)));
}
function lh(e) {
  var t = po(Tr(e)),
    o = ['absolute', 'fixed'].indexOf(Ht(e).position) >= 0,
    r = o && kt(e) ? No(e) : e;
  return $n(r)
    ? t.filter(function (i) {
        return $n(i) && zl(i, r) && en(i) !== 'body';
      })
    : [];
}
function ch(e, t, o, r) {
  var i = t === 'clippingParents' ? lh(e) : [].concat(t),
    a = [].concat(i, [o]),
    s = a[0],
    l = a.reduce(function (c, u) {
      var d = ls(e, u, r);
      return (
        (c.top = Sn(d.top, c.top)),
        (c.right = Qo(d.right, c.right)),
        (c.bottom = Qo(d.bottom, c.bottom)),
        (c.left = Sn(d.left, c.left)),
        c
      );
    }, ls(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function ql(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    i = r ? Ut(r) : null,
    a = r ? Kn(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (i) {
    case Ot:
      c = {
        x: s,
        y: t.y - o.height,
      };
      break;
    case At:
      c = {
        x: s,
        y: t.y + t.height,
      };
      break;
    case Dt:
      c = {
        x: t.x + t.width,
        y: l,
      };
      break;
    case Tt:
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
  var u = i ? ji(i) : null;
  if (u != null) {
    var d = u === 'y' ? 'height' : 'width';
    switch (a) {
      case Hn:
        c[u] = c[u] - (t[d] / 2 - o[d] / 2);
        break;
      case yo:
        c[u] = c[u] + (t[d] / 2 - o[d] / 2);
        break;
    }
  }
  return c;
}
function xo(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = r === void 0 ? e.placement : r,
    a = o.strategy,
    s = a === void 0 ? e.strategy : a,
    l = o.boundary,
    c = l === void 0 ? Nm : l,
    u = o.rootBoundary,
    d = u === void 0 ? Fl : u,
    f = o.elementContext,
    b = f === void 0 ? ro : f,
    g = o.altBoundary,
    y = g === void 0 ? !1 : g,
    h = o.padding,
    m = h === void 0 ? 0 : h,
    C = Ul(typeof m != 'number' ? m : Wl(m, Po)),
    S = b === ro ? km : ro,
    T = e.rects.popper,
    E = e.elements[y ? S : b],
    p = ch($n(E) ? E : E.contextElement || gn(e.elements.popper), c, d, s),
    R = Yn(e.elements.reference),
    w = ql({
      reference: R,
      element: T,
      strategy: 'absolute',
      placement: i,
    }),
    V = ai(Object.assign({}, T, w)),
    D = b === ro ? V : R,
    A = {
      top: p.top - D.top + C.top,
      bottom: D.bottom - p.bottom + C.bottom,
      left: p.left - D.left + C.left,
      right: D.right - p.right + C.right,
    },
    _ = e.modifiersData.offset;
  if (b === ro && _) {
    var K = _[i];
    Object.keys(A).forEach(function (B) {
      var M = [Dt, At].indexOf(B) >= 0 ? 1 : -1,
        j = [Ot, At].indexOf(B) >= 0 ? 'y' : 'x';
      A[B] += K[j] * M;
    });
  }
  return A;
}
function uh(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = o.boundary,
    a = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    u = c === void 0 ? jl : c,
    d = Kn(r),
    f = d
      ? l
        ? rs
        : rs.filter(function (y) {
            return Kn(y) === d;
          })
      : Po,
    b = f.filter(function (y) {
      return u.indexOf(y) >= 0;
    });
  b.length === 0 &&
    ((b = f),
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
      (y[h] = xo(e, {
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
function dh(e) {
  if (Ut(e) === Or) return [];
  var t = qo(e);
  return [ss(e), t, ss(t)];
}
function ph(e) {
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
        f = o.rootBoundary,
        b = o.altBoundary,
        g = o.flipVariations,
        y = g === void 0 ? !0 : g,
        h = o.allowedAutoPlacements,
        m = t.options.placement,
        C = Ut(m),
        S = C === m,
        T = c || (S || !y ? [qo(m)] : dh(m)),
        E = [m].concat(T).reduce(function (U, te) {
          return U.concat(
            Ut(te) === Or
              ? uh(t, {
                  placement: te,
                  boundary: d,
                  rootBoundary: f,
                  padding: u,
                  flipVariations: y,
                  allowedAutoPlacements: h,
                })
              : te,
          );
        }, []),
        p = t.rects.reference,
        R = t.rects.popper,
        w = /* @__PURE__ */ new Map(),
        V = !0,
        D = E[0],
        A = 0;
      A < E.length;
      A++
    ) {
      var _ = E[A],
        K = Ut(_),
        B = Kn(_) === Hn,
        M = [Ot, At].indexOf(K) >= 0,
        j = M ? 'width' : 'height',
        z = xo(t, {
          placement: _,
          boundary: d,
          rootBoundary: f,
          altBoundary: b,
          padding: u,
        }),
        le = M ? (B ? Dt : Tt) : B ? At : Ot;
      p[j] > R[j] && (le = qo(le));
      var ie = qo(le),
        G = [];
      if (
        (a && G.push(z[K] <= 0),
        l && G.push(z[le] <= 0, z[ie] <= 0),
        G.every(function (U) {
          return U;
        }))
      ) {
        (D = _), (V = !1);
        break;
      }
      w.set(_, G);
    }
    if (V)
      for (
        var $ = y ? 3 : 1,
          F = function (te) {
            var ne = E.find(function (J) {
              var re = w.get(J);
              if (re)
                return re.slice(0, te).every(function (se) {
                  return se;
                });
            });
            if (ne) return (D = ne), 'break';
          },
          X = $;
        X > 0;
        X--
      ) {
        var H = F(X);
        if (H === 'break') break;
      }
    t.placement !== D && ((t.modifiersData[r]._skip = !0), (t.placement = D), (t.reset = !0));
  }
}
const fh = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: ph,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1,
  },
};
function cs(e, t, o) {
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
function us(e) {
  return [Ot, Dt, At, Tt].some(function (t) {
    return e[t] >= 0;
  });
}
function mh(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = xo(t, {
      elementContext: 'reference',
    }),
    l = xo(t, {
      altBoundary: !0,
    }),
    c = cs(s, r),
    u = cs(l, i, a),
    d = us(c),
    f = us(u);
  (t.modifiersData[o] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: f,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-reference-hidden': d,
      'data-popper-escaped': f,
    }));
}
const hh = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: mh,
};
function bh(e, t, o) {
  var r = Ut(e),
    i = [Tt, Ot].indexOf(r) >= 0 ? -1 : 1,
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
    [Tt, Dt].indexOf(r) >= 0
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
function vh(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.offset,
    a = i === void 0 ? [0, 0] : i,
    s = jl.reduce(function (d, f) {
      return (d[f] = bh(f, t.rects, a)), d;
    }, {}),
    l = s[t.placement],
    c = l.x,
    u = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = s);
}
const gh = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: vh,
};
function yh(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = ql({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const xh = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: yh,
  data: {},
};
function Eh(e) {
  return e === 'x' ? 'y' : 'x';
}
function Oh(e) {
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
    f = o.padding,
    b = o.tether,
    g = b === void 0 ? !0 : b,
    y = o.tetherOffset,
    h = y === void 0 ? 0 : y,
    m = xo(t, {
      boundary: c,
      rootBoundary: u,
      padding: f,
      altBoundary: d,
    }),
    C = Ut(t.placement),
    S = Kn(t.placement),
    T = !S,
    E = ji(C),
    p = Eh(E),
    R = t.modifiersData.popperOffsets,
    w = t.rects.reference,
    V = t.rects.popper,
    D =
      typeof h == 'function'
        ? h(
            Object.assign({}, t.rects, {
              placement: t.placement,
            }),
          )
        : h,
    A =
      typeof D == 'number'
        ? {
            mainAxis: D,
            altAxis: D,
          }
        : Object.assign(
            {
              mainAxis: 0,
              altAxis: 0,
            },
            D,
          ),
    _ = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    K = {
      x: 0,
      y: 0,
    };
  if (R) {
    if (a) {
      var B,
        M = E === 'y' ? Ot : Tt,
        j = E === 'y' ? At : Dt,
        z = E === 'y' ? 'height' : 'width',
        le = R[E],
        ie = le + m[M],
        G = le - m[j],
        $ = g ? -V[z] / 2 : 0,
        F = S === Hn ? w[z] : V[z],
        X = S === Hn ? -V[z] : -w[z],
        H = t.elements.arrow,
        U =
          g && H
            ? Fi(H)
            : {
                width: 0,
                height: 0,
              },
        te = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : Bl(),
        ne = te[M],
        J = te[j],
        re = uo(0, w[z], U[z]),
        se = T ? w[z] / 2 - $ - re - ne - A.mainAxis : F - re - ne - A.mainAxis,
        me = T ? -w[z] / 2 + $ + re + J + A.mainAxis : X + re + J + A.mainAxis,
        oe = t.elements.arrow && No(t.elements.arrow),
        k = oe ? (E === 'y' ? oe.clientTop || 0 : oe.clientLeft || 0) : 0,
        Ee = (B = _ == null ? void 0 : _[E]) != null ? B : 0,
        I = le + se - Ee - k,
        W = le + me - Ee,
        $e = uo(g ? Qo(ie, I) : ie, le, g ? Sn(G, W) : G);
      (R[E] = $e), (K[E] = $e - le);
    }
    if (l) {
      var ve,
        Xe = E === 'x' ? Ot : Tt,
        Me = E === 'x' ? At : Dt,
        Ce = R[p],
        Re = p === 'y' ? 'height' : 'width',
        Je = Ce + m[Xe],
        ot = Ce - m[Me],
        Z = [Ot, Tt].indexOf(C) !== -1,
        fe = (ve = _ == null ? void 0 : _[p]) != null ? ve : 0,
        ge = Z ? Je : Ce - w[Re] - V[Re] - fe + A.altAxis,
        be = Z ? Ce + w[Re] + V[Re] - fe - A.altAxis : ot,
        pe = g && Z ? qm(ge, Ce, be) : uo(g ? ge : Je, Ce, g ? be : ot);
      (R[p] = pe), (K[p] = pe - Ce);
    }
    t.modifiersData[r] = K;
  }
}
const Th = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: Oh,
  requiresIfExists: ['offset'],
};
function Ch(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop,
  };
}
function Sh(e) {
  return e === Lt(e) || !kt(e) ? Vi(e) : Ch(e);
}
function Rh(e) {
  var t = e.getBoundingClientRect(),
    o = qn(t.width) / e.offsetWidth || 1,
    r = qn(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function wh(e, t, o) {
  o === void 0 && (o = !1);
  var r = kt(t),
    i = kt(t) && Rh(t),
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
        Bi(a)) &&
        (l = Sh(t)),
      kt(t) ? ((c = Yn(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : a && (c.x = zi(a))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function $h(e) {
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
function Ph(e) {
  var t = $h(e);
  return ri.reduce(function (o, r) {
    return o.concat(
      t.filter(function (i) {
        return i.phase === r;
      }),
    );
  }, []);
}
function Nh(e) {
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
var xn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  kh = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  ds = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function Ih(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), ds)
      .filter(function (o, r, i) {
        return i.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                pn(xn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                pn(xn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            ri.indexOf(t.phase) < 0 &&
              console.error(
                pn(xn, t.name, '"phase"', 'either ' + ri.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(pn(xn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(pn(xn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                pn(xn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                pn(
                  xn,
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
                ds
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
            }) == null && console.error(pn(kh, String(t.name), r, r));
          });
      });
  });
}
function _h(e, t) {
  var o = /* @__PURE__ */ new Set();
  return e.filter(function (r) {
    var i = t(r);
    if (!o.has(i)) return o.add(i), !0;
  });
}
function Mh(e) {
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
var ps =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Ah =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  fs = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute',
  };
function ms() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function Dh(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    i = t.defaultOptions,
    a = i === void 0 ? fs : i;
  return function (l, c, u) {
    u === void 0 && (u = a);
    var d = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, fs, a),
        modifiersData: {},
        elements: {
          reference: l,
          popper: c,
        },
        attributes: {},
        styles: {},
      },
      f = [],
      b = !1,
      g = {
        state: d,
        setOptions: function (C) {
          var S = typeof C == 'function' ? C(d.options) : C;
          h(),
            (d.options = Object.assign({}, a, d.options, S)),
            (d.scrollParents = {
              reference: $n(l) ? po(l) : l.contextElement ? po(l.contextElement) : [],
              popper: po(c),
            });
          var T = Ph(Mh([].concat(r, d.options.modifiers)));
          if (
            ((d.orderedModifiers = T.filter(function (_) {
              return _.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var E = _h([].concat(T, d.options.modifiers), function (_) {
              var K = _.name;
              return K;
            });
            if ((Ih(E), Ut(d.options.placement) === Or)) {
              var p = d.orderedModifiers.find(function (_) {
                var K = _.name;
                return K === 'flip';
              });
              p ||
                console.error(
                  [
                    'Popper: "auto" placements require the "flip" modifier be',
                    'present and enabled to work.',
                  ].join(' '),
                );
            }
            var R = Ht(c),
              w = R.marginTop,
              V = R.marginRight,
              D = R.marginBottom,
              A = R.marginLeft;
            [w, V, D, A].some(function (_) {
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
            var C = d.elements,
              S = C.reference,
              T = C.popper;
            if (!ms(S, T)) {
              process.env.NODE_ENV !== 'production' && console.error(ps);
              return;
            }
            (d.rects = {
              reference: wh(S, No(T), d.options.strategy === 'fixed'),
              popper: Fi(T),
            }),
              (d.reset = !1),
              (d.placement = d.options.placement),
              d.orderedModifiers.forEach(function (_) {
                return (d.modifiersData[_.name] = Object.assign({}, _.data));
              });
            for (var E = 0, p = 0; p < d.orderedModifiers.length; p++) {
              if (process.env.NODE_ENV !== 'production' && ((E += 1), E > 100)) {
                console.error(Ah);
                break;
              }
              if (d.reset === !0) {
                (d.reset = !1), (p = -1);
                continue;
              }
              var R = d.orderedModifiers[p],
                w = R.fn,
                V = R.options,
                D = V === void 0 ? {} : V,
                A = R.name;
              typeof w == 'function' &&
                (d =
                  w({
                    state: d,
                    options: D,
                    name: A,
                    instance: g,
                  }) || d);
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: Nh(function () {
          return new Promise(function (m) {
            g.forceUpdate(), m(d);
          });
        }),
        destroy: function () {
          h(), (b = !0);
        },
      };
    if (!ms(l, c)) return process.env.NODE_ENV !== 'production' && console.error(ps), g;
    g.setOptions(u).then(function (m) {
      !b && u.onFirstUpdate && u.onFirstUpdate(m);
    });
    function y() {
      d.orderedModifiers.forEach(function (m) {
        var C = m.name,
          S = m.options,
          T = S === void 0 ? {} : S,
          E = m.effect;
        if (typeof E == 'function') {
          var p = E({
              state: d,
              name: C,
              instance: g,
              options: T,
            }),
            R = function () {};
          f.push(p || R);
        }
      });
    }
    function h() {
      f.forEach(function (m) {
        return m();
      }),
        (f = []);
    }
    return g;
  };
}
var Lh = [nh, xh, eh, Um, gh, fh, Th, Xm, hh],
  Fh = /* @__PURE__ */ Dh({
    defaultModifiers: Lh,
  });
function jh(e) {
  return typeof e == 'function' ? e() : e;
}
const er = /* @__PURE__ */ x.forwardRef(function (t, o) {
  const { children: r, container: i, disablePortal: a = !1 } = t,
    [s, l] = x.useState(null),
    c = ft(/* @__PURE__ */ x.isValidElement(r) ? r.ref : null, o);
  if (
    (ln(() => {
      a || l(jh(i) || document.body);
    }, [i, a]),
    ln(() => {
      if (s && !a)
        return (
          Ko(o, s),
          () => {
            Ko(o, null);
          }
        );
    }, [o, s, a]),
    a)
  ) {
    if (/* @__PURE__ */ x.isValidElement(r)) {
      const u = {
        ref: c,
      };
      return /* @__PURE__ */ x.cloneElement(r, u);
    }
    return /* @__PURE__ */ L(x.Fragment, {
      children: r,
    });
  }
  return /* @__PURE__ */ L(x.Fragment, {
    children: s && /* @__PURE__ */ Qs.createPortal(r, s),
  });
});
process.env.NODE_ENV !== 'production' &&
  (er.propTypes = {
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
process.env.NODE_ENV !== 'production' && (er['propTypes'] = il(er.propTypes));
const Yl = er;
function Vh(e) {
  return De('MuiPopper', e);
}
qe('MuiPopper', ['root']);
const zh = [
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
  Bh = [
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
function Uh(e, t) {
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
function tr(e) {
  return typeof e == 'function' ? e() : e;
}
function Cr(e) {
  return e.nodeType !== void 0;
}
function Wh(e) {
  return !Cr(e);
}
const Hh = () =>
    Ke(
      {
        root: ['root'],
      },
      Ll(Vh),
    ),
  qh = {},
  Yh = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r;
    const {
        anchorEl: i,
        children: a,
        component: s,
        direction: l,
        disablePortal: c,
        modifiers: u,
        open: d,
        ownerState: f,
        placement: b,
        popperOptions: g,
        popperRef: y,
        slotProps: h = {},
        slots: m = {},
        TransitionProps: C,
      } = t,
      S = Te(t, zh),
      T = x.useRef(null),
      E = ft(T, o),
      p = x.useRef(null),
      R = ft(p, y),
      w = x.useRef(R);
    ln(() => {
      w.current = R;
    }, [R]),
      x.useImperativeHandle(y, () => p.current, []);
    const V = Uh(b, l),
      [D, A] = x.useState(V),
      [_, K] = x.useState(tr(i));
    x.useEffect(() => {
      p.current && p.current.forceUpdate();
    }),
      x.useEffect(() => {
        i && K(tr(i));
      }, [i]),
      ln(() => {
        if (!_ || !d) return;
        const le = ($) => {
          A($.placement);
        };
        if (process.env.NODE_ENV !== 'production' && _ && Cr(_) && _.nodeType === 1) {
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
        let ie = [
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
              le($);
            },
          },
        ];
        u != null && (ie = ie.concat(u)), g && g.modifiers != null && (ie = ie.concat(g.modifiers));
        const G = Fh(
          _,
          T.current,
          v(
            {
              placement: V,
            },
            g,
            {
              modifiers: ie,
            },
          ),
        );
        return (
          w.current(G),
          () => {
            G.destroy(), w.current(null);
          }
        );
      }, [_, c, u, d, g, V]);
    const B = {
      placement: D,
    };
    C !== null && (B.TransitionProps = C);
    const M = Hh(),
      j = (r = s ?? m.root) != null ? r : 'div',
      z = jt({
        elementType: j,
        externalSlotProps: h.root,
        externalForwardedProps: S,
        additionalProps: {
          role: 'tooltip',
          ref: E,
        },
        ownerState: v({}, t, f),
        className: M.root,
      });
    return /* @__PURE__ */ L(
      j,
      v({}, z, {
        children: typeof a == 'function' ? a(B) : a,
      }),
    );
  }),
  Kl = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const {
        anchorEl: r,
        children: i,
        container: a,
        direction: s = 'ltr',
        disablePortal: l = !1,
        keepMounted: c = !1,
        modifiers: u,
        open: d,
        placement: f = 'bottom',
        popperOptions: b = qh,
        popperRef: g,
        style: y,
        transition: h = !1,
        slotProps: m = {},
        slots: C = {},
      } = t,
      S = Te(t, Bh),
      [T, E] = x.useState(!0),
      p = () => {
        E(!1);
      },
      R = () => {
        E(!0);
      };
    if (!c && !d && (!h || T)) return null;
    let w;
    if (a) w = a;
    else if (r) {
      const A = tr(r);
      w = A && Cr(A) ? pt(A).body : pt(null).body;
    }
    const V = !d && c && (!h || T) ? 'none' : void 0,
      D = h
        ? {
            in: d,
            onEnter: p,
            onExited: R,
          }
        : void 0;
    return /* @__PURE__ */ L(Yl, {
      disablePortal: l,
      container: w,
      children: /* @__PURE__ */ L(
        Yh,
        v(
          {
            anchorEl: r,
            direction: s,
            disablePortal: l,
            modifiers: u,
            ref: o,
            open: h ? !T : d,
            placement: f,
            popperOptions: b,
            popperRef: g,
            slotProps: m,
            slots: C,
          },
          S,
          {
            style: v(
              {
                // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
                position: 'fixed',
                // Fix Popper.js display issue
                top: 0,
                left: 0,
                display: V,
              },
              y,
            ),
            TransitionProps: D,
            children: i,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Kl.propTypes = {
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
        const t = tr(e.anchorEl);
        if (t && Cr(t) && t.nodeType === 1) {
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
          (Wh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    popperRef: St,
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
const Kh = Kl;
function Gh(e) {
  const t = pt(e);
  return t.body === e
    ? Rn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function fo(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function hs(e) {
  return parseInt(Rn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Xh(e) {
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
function bs(e, t, o, r, i) {
  const a = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1,
      c = !Xh(s);
    l && c && fo(s, i);
  });
}
function Br(e, t) {
  let o = -1;
  return e.some((r, i) => (t(r) ? ((o = i), !0) : !1)), o;
}
function Jh(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (Gh(r)) {
      const s = ul(pt(r));
      o.push({
        value: r.style.paddingRight,
        property: 'padding-right',
        el: r,
      }),
        (r.style.paddingRight = `${hs(r) + s}px`);
      const l = pt(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({
          value: c.style.paddingRight,
          property: 'padding-right',
          el: c,
        }),
          (c.style.paddingRight = `${hs(c) + s}px`);
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment) a = pt(r).body;
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
function Zh(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class Qh {
  constructor() {
    (this.containers = void 0), (this.modals = void 0), (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && fo(t.modalRef, !1);
    const i = Zh(o);
    bs(o, t.mount, t.modalRef, i, !0);
    const a = Br(this.containers, (s) => s.container === o);
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
    const r = Br(this.containers, (a) => a.modals.indexOf(t) !== -1),
      i = this.containers[r];
    i.restore || (i.restore = Jh(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const i = Br(this.containers, (s) => s.modals.indexOf(t) !== -1),
      a = this.containers[i];
    if ((a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0))
      a.restore && a.restore(),
        t.modalRef && fo(t.modalRef, o),
        bs(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1),
        this.containers.splice(i, 1);
    else {
      const s = a.modals[a.modals.length - 1];
      s.modalRef && fo(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function eb(e) {
  return De('MuiModal', e);
}
qe('MuiModal', ['root', 'hidden', 'backdrop']);
const tb = [
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
  nb = (e) => {
    const { open: t, exited: o } = e;
    return Ke(
      {
        root: ['root', !t && o && 'hidden'],
        backdrop: ['backdrop'],
      },
      Ll(eb),
    );
  };
function ob(e) {
  return typeof e == 'function' ? e() : e;
}
function rb(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const ib = new Qh(),
  Gl = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, i;
    const {
        children: a,
        closeAfterTransition: s = !1,
        component: l,
        container: c,
        disableAutoFocus: u = !1,
        disableEnforceFocus: d = !1,
        disableEscapeKeyDown: f = !1,
        disablePortal: b = !1,
        disableRestoreFocus: g = !1,
        disableScrollLock: y = !1,
        hideBackdrop: h = !1,
        keepMounted: m = !1,
        // private
        manager: C = ib,
        onBackdropClick: S,
        onClose: T,
        onKeyDown: E,
        open: p,
        onTransitionEnter: R,
        onTransitionExited: w,
        slotProps: V = {},
        slots: D = {},
      } = t,
      A = Te(t, tb),
      [_, K] = x.useState(!p),
      B = x.useRef({}),
      M = x.useRef(null),
      j = x.useRef(null),
      z = ft(j, o),
      le = rb(a),
      ie = (r = t['aria-hidden']) != null ? r : !0,
      G = () => pt(M.current),
      $ = () => ((B.current.modalRef = j.current), (B.current.mountNode = M.current), B.current),
      F = () => {
        C.mount($(), {
          disableScrollLock: y,
        }),
          j.current && (j.current.scrollTop = 0);
      },
      X = Pt(() => {
        const ve = ob(c) || G().body;
        C.add($(), ve), j.current && F();
      }),
      H = x.useCallback(() => C.isTopModal($()), [C]),
      U = Pt((ve) => {
        (M.current = ve), !(!ve || !j.current) && (p && H() ? F() : fo(j.current, ie));
      }),
      te = x.useCallback(() => {
        C.remove($(), ie);
      }, [C, ie]);
    x.useEffect(
      () => () => {
        te();
      },
      [te],
    ),
      x.useEffect(() => {
        p ? X() : (!le || !s) && te();
      }, [p, te, le, s, X]);
    const ne = v({}, t, {
        closeAfterTransition: s,
        disableAutoFocus: u,
        disableEnforceFocus: d,
        disableEscapeKeyDown: f,
        disablePortal: b,
        disableRestoreFocus: g,
        disableScrollLock: y,
        exited: _,
        hideBackdrop: h,
        keepMounted: m,
      }),
      J = nb(ne),
      re = () => {
        K(!1), R && R();
      },
      se = () => {
        K(!0), w && w(), s && te();
      },
      me = (ve) => {
        ve.target === ve.currentTarget && (S && S(ve), T && T(ve, 'backdropClick'));
      },
      oe = (ve) => {
        E && E(ve),
          !(ve.key !== 'Escape' || !H()) &&
            (f || (ve.stopPropagation(), T && T(ve, 'escapeKeyDown')));
      },
      k = {};
    a.props.tabIndex === void 0 && (k.tabIndex = '-1'),
      le && ((k.onEnter = Ea(re, a.props.onEnter)), (k.onExited = Ea(se, a.props.onExited)));
    const Ee = (i = l ?? D.root) != null ? i : 'div',
      I = jt({
        elementType: Ee,
        externalSlotProps: V.root,
        externalForwardedProps: A,
        additionalProps: {
          ref: z,
          role: 'presentation',
          onKeyDown: oe,
        },
        className: J.root,
        ownerState: ne,
      }),
      W = D.backdrop,
      $e = jt({
        elementType: W,
        externalSlotProps: V.backdrop,
        additionalProps: {
          'aria-hidden': !0,
          onClick: me,
          open: p,
        },
        className: J.backdrop,
        ownerState: ne,
      });
    return !m && !p && (!le || _)
      ? null
      : /* @__PURE__ */ L(Yl, {
          ref: U,
          container: c,
          disablePortal: b,
          children: /* @__PURE__ */ Qe(
            Ee,
            v({}, I, {
              children: [
                !h && W ? /* @__PURE__ */ L(W, v({}, $e)) : null,
                /* @__PURE__ */ L(Zo, {
                  disableEnforceFocus: d,
                  disableAutoFocus: u,
                  disableRestoreFocus: g,
                  isEnabled: H,
                  open: p,
                  children: /* @__PURE__ */ x.cloneElement(a, k),
                }),
              ],
            }),
          ),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (Gl.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: To.isRequired,
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
const ab = Gl,
  sb = 2;
function Xl(e, t) {
  return e - t;
}
function io(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function vs(e, t) {
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
function Ao(e, t) {
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
function nr(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function lb(e, t, o) {
  return (o - t) * e + t;
}
function cb(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function ub(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(cb(t)));
}
function gs({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(Xl);
}
function Do({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, i;
  const a = pt(e.current);
  if (
    !((r = e.current) != null && r.contains(a.activeElement)) ||
    Number(a == null || (i = a.activeElement) == null ? void 0 : i.getAttribute('data-index')) !== t
  ) {
    var s;
    (s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  o && o(t);
}
const db = {
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
  pb = (e) => e;
let Lo;
function Ur() {
  return (
    Lo === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Lo = CSS.supports('touch-action', 'none'))
        : (Lo = !0)),
    Lo
  );
}
function fb(e) {
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
      onChangeCommitted: f,
      orientation: b = 'horizontal',
      ref: g,
      scale: y = pb,
      step: h = 1,
      tabIndex: m,
      value: C,
    } = e,
    S = x.useRef(),
    [T, E] = x.useState(-1),
    [p, R] = x.useState(-1),
    [w, V] = x.useState(!1),
    D = x.useRef(0),
    [A, _] = Cn({
      controlled: C,
      default: o ?? c,
      name: 'Slider',
    }),
    K =
      d &&
      ((Z, fe, ge) => {
        const be = Z.nativeEvent || Z,
          pe = new be.constructor(be.type, be);
        Object.defineProperty(pe, 'target', {
          writable: !0,
          value: {
            value: fe,
            name: u,
          },
        }),
          d(pe, fe, ge);
      }),
    B = Array.isArray(A);
  let M = B ? A.slice().sort(Xl) : [A];
  M = M.map((Z) => io(Z, c, l));
  const j =
      s === !0 && h !== null
        ? [...Array(Math.floor((l - c) / h) + 1)].map((Z, fe) => ({
            value: c + h * fe,
          }))
        : s || [],
    z = j.map((Z) => Z.value),
    { isFocusVisibleRef: le, onBlur: ie, onFocus: G, ref: $ } = cl(),
    [F, X] = x.useState(-1),
    H = x.useRef(),
    U = ft($, H),
    te = ft(g, U),
    ne = (Z) => (fe) => {
      var ge;
      const be = Number(fe.currentTarget.getAttribute('data-index'));
      G(fe),
        le.current === !0 && X(be),
        R(be),
        Z == null || (ge = Z.onFocus) == null || ge.call(Z, fe);
    },
    J = (Z) => (fe) => {
      var ge;
      ie(fe),
        le.current === !1 && X(-1),
        R(-1),
        Z == null || (ge = Z.onBlur) == null || ge.call(Z, fe);
    };
  ln(() => {
    if (r && H.current.contains(document.activeElement)) {
      var Z;
      (Z = document.activeElement) == null || Z.blur();
    }
  }, [r]),
    r && T !== -1 && E(-1),
    r && F !== -1 && X(-1);
  const re = (Z) => (fe) => {
      var ge;
      (ge = Z.onChange) == null || ge.call(Z, fe);
      const be = Number(fe.currentTarget.getAttribute('data-index')),
        pe = M[be],
        ue = z.indexOf(pe);
      let Q = fe.target.valueAsNumber;
      if (
        (j && h == null && (Q = Q < pe ? z[ue - 1] : z[ue + 1]), (Q = io(Q, c, l)), j && h == null)
      ) {
        const ye = z.indexOf(M[be]);
        Q = Q < M[be] ? z[ye - 1] : z[ye + 1];
      }
      if (B) {
        i && (Q = io(Q, M[be - 1] || -1 / 0, M[be + 1] || 1 / 0));
        const ye = Q;
        Q = gs({
          values: M,
          newValue: Q,
          index: be,
        });
        let xe = be;
        i || (xe = Q.indexOf(ye)),
          Do({
            sliderRef: H,
            activeIndex: xe,
          });
      }
      _(Q), X(be), K && K(fe, Q, be), f && f(fe, Q);
    },
    se = x.useRef();
  let me = b;
  a && b === 'horizontal' && (me += '-reverse');
  const oe = ({ finger: Z, move: fe = !1 }) => {
      const { current: ge } = H,
        { width: be, height: pe, bottom: ue, left: Q } = ge.getBoundingClientRect();
      let ye;
      me.indexOf('vertical') === 0 ? (ye = (ue - Z.y) / pe) : (ye = (Z.x - Q) / be),
        me.indexOf('-reverse') !== -1 && (ye = 1 - ye);
      let xe;
      if (((xe = lb(ye, c, l)), h)) xe = ub(xe, h, c);
      else {
        const rt = vs(z, xe);
        xe = z[rt];
      }
      xe = io(xe, c, l);
      let Ne = 0;
      if (B) {
        fe ? (Ne = se.current) : (Ne = vs(M, xe)),
          i && (xe = io(xe, M[Ne - 1] || -1 / 0, M[Ne + 1] || 1 / 0));
        const rt = xe;
        (xe = gs({
          values: M,
          newValue: xe,
          index: Ne,
        })),
          (i && fe) || ((Ne = xe.indexOf(rt)), (se.current = Ne));
      }
      return {
        newValue: xe,
        activeIndex: Ne,
      };
    },
    k = Pt((Z) => {
      const fe = Ao(Z, S);
      if (!fe) return;
      if (((D.current += 1), Z.type === 'mousemove' && Z.buttons === 0)) {
        Ee(Z);
        return;
      }
      const { newValue: ge, activeIndex: be } = oe({
        finger: fe,
        move: !0,
      });
      Do({
        sliderRef: H,
        activeIndex: be,
        setActive: E,
      }),
        _(ge),
        !w && D.current > sb && V(!0),
        K && ge !== A && K(Z, ge, be);
    }),
    Ee = Pt((Z) => {
      const fe = Ao(Z, S);
      if ((V(!1), !fe)) return;
      const { newValue: ge } = oe({
        finger: fe,
        move: !0,
      });
      E(-1), Z.type === 'touchend' && R(-1), f && f(Z, ge), (S.current = void 0), W();
    }),
    I = Pt((Z) => {
      if (r) return;
      Ur() || Z.preventDefault();
      const fe = Z.changedTouches[0];
      fe != null && (S.current = fe.identifier);
      const ge = Ao(Z, S);
      if (ge !== !1) {
        const { newValue: pe, activeIndex: ue } = oe({
          finger: ge,
        });
        Do({
          sliderRef: H,
          activeIndex: ue,
          setActive: E,
        }),
          _(pe),
          K && K(Z, pe, ue);
      }
      D.current = 0;
      const be = pt(H.current);
      be.addEventListener('touchmove', k), be.addEventListener('touchend', Ee);
    }),
    W = x.useCallback(() => {
      const Z = pt(H.current);
      Z.removeEventListener('mousemove', k),
        Z.removeEventListener('mouseup', Ee),
        Z.removeEventListener('touchmove', k),
        Z.removeEventListener('touchend', Ee);
    }, [Ee, k]);
  x.useEffect(() => {
    const { current: Z } = H;
    return (
      Z.addEventListener('touchstart', I, {
        passive: Ur(),
      }),
      () => {
        Z.removeEventListener('touchstart', I, {
          passive: Ur(),
        }),
          W();
      }
    );
  }, [W, I]),
    x.useEffect(() => {
      r && W();
    }, [r, W]);
  const $e = (Z) => (fe) => {
      var ge;
      if (
        ((ge = Z.onMouseDown) == null || ge.call(Z, fe),
        r || fe.defaultPrevented || fe.button !== 0)
      )
        return;
      fe.preventDefault();
      const be = Ao(fe, S);
      if (be !== !1) {
        const { newValue: ue, activeIndex: Q } = oe({
          finger: be,
        });
        Do({
          sliderRef: H,
          activeIndex: Q,
          setActive: E,
        }),
          _(ue),
          K && K(fe, ue, Q);
      }
      D.current = 0;
      const pe = pt(H.current);
      pe.addEventListener('mousemove', k), pe.addEventListener('mouseup', Ee);
    },
    ve = nr(B ? M[0] : c, c, l),
    Xe = nr(M[M.length - 1], c, l) - ve,
    Me = (Z = {}) => {
      const fe = {
          onMouseDown: $e(Z || {}),
        },
        ge = v({}, Z, fe);
      return v(
        {
          ref: te,
        },
        ge,
      );
    },
    Ce = (Z) => (fe) => {
      var ge;
      (ge = Z.onMouseOver) == null || ge.call(Z, fe);
      const be = Number(fe.currentTarget.getAttribute('data-index'));
      R(be);
    },
    Re = (Z) => (fe) => {
      var ge;
      (ge = Z.onMouseLeave) == null || ge.call(Z, fe), R(-1);
    };
  return {
    active: T,
    axis: me,
    axisProps: db,
    dragging: w,
    focusedThumbIndex: F,
    getHiddenInputProps: (Z = {}) => {
      var fe;
      const ge = {
          onChange: re(Z || {}),
          onFocus: ne(Z || {}),
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
          step: (fe = e.step) != null ? fe : void 0,
          disabled: r,
        },
        be,
        {
          style: v({}, nd, {
            direction: a ? 'rtl' : 'ltr',
            // So that VoiceOver's focus indicator matches the thumb's dimensions
            width: '100%',
            height: '100%',
          }),
        },
      );
    },
    getRootProps: Me,
    getThumbProps: (Z = {}) => {
      const fe = {
        onMouseOver: Ce(Z || {}),
        onMouseLeave: Re(Z || {}),
      };
      return v({}, Z, fe);
    },
    marks: j,
    open: p,
    range: B,
    trackLeap: Xe,
    trackOffset: ve,
    values: M,
  };
}
const mb = ['onChange', 'maxRows', 'minRows', 'style', 'value'];
function Fo(e) {
  return parseInt(e, 10) || 0;
}
const hb = {
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
function ys(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const Jl = /* @__PURE__ */ x.forwardRef(function (t, o) {
  const { onChange: r, maxRows: i, minRows: a = 1, style: s, value: l } = t,
    c = Te(t, mb),
    { current: u } = x.useRef(l != null),
    d = x.useRef(null),
    f = ft(o, d),
    b = x.useRef(null),
    g = x.useRef(0),
    [y, h] = x.useState({
      outerHeightStyle: 0,
    }),
    m = x.useCallback(() => {
      const p = d.current,
        w = Rn(p).getComputedStyle(p);
      if (w.width === '0px')
        return {
          outerHeightStyle: 0,
        };
      const V = b.current;
      (V.style.width = w.width),
        (V.value = p.value || t.placeholder || 'x'),
        V.value.slice(-1) ===
          `
` && (V.value += ' ');
      const D = w.boxSizing,
        A = Fo(w.paddingBottom) + Fo(w.paddingTop),
        _ = Fo(w.borderBottomWidth) + Fo(w.borderTopWidth),
        K = V.scrollHeight;
      V.value = 'x';
      const B = V.scrollHeight;
      let M = K;
      a && (M = Math.max(Number(a) * B, M)),
        i && (M = Math.min(Number(i) * B, M)),
        (M = Math.max(M, B));
      const j = M + (D === 'border-box' ? A + _ : 0),
        z = Math.abs(M - K) <= 1;
      return {
        outerHeightStyle: j,
        overflow: z,
      };
    }, [i, a, t.placeholder]),
    C = (p, R) => {
      const { outerHeightStyle: w, overflow: V } = R;
      return g.current < 20 &&
        ((w > 0 && Math.abs((p.outerHeightStyle || 0) - w) > 1) || p.overflow !== V)
        ? ((g.current += 1),
          {
            overflow: V,
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
          p);
    },
    S = x.useCallback(() => {
      const p = m();
      ys(p) || h((R) => C(R, p));
    }, [m]),
    T = () => {
      const p = m();
      ys(p) ||
        Qs.flushSync(() => {
          h((R) => C(R, p));
        });
    };
  x.useEffect(() => {
    const p = sl(() => {
      (g.current = 0), d.current && T();
    });
    let R;
    const w = d.current,
      V = Rn(w);
    return (
      V.addEventListener('resize', p),
      typeof ResizeObserver < 'u' && ((R = new ResizeObserver(p)), R.observe(w)),
      () => {
        p.clear(), V.removeEventListener('resize', p), R && R.disconnect();
      }
    );
  }),
    ln(() => {
      S();
    }),
    x.useEffect(() => {
      g.current = 0;
    }, [l]);
  const E = (p) => {
    (g.current = 0), u || S(), r && r(p);
  };
  return /* @__PURE__ */ Qe(x.Fragment, {
    children: [
      /* @__PURE__ */ L(
        'textarea',
        v(
          {
            value: l,
            onChange: E,
            ref: f,
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
      /* @__PURE__ */ L('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: b,
        tabIndex: -1,
        style: v({}, hb.shadow, s, {
          padding: 0,
        }),
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (Jl.propTypes = {
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
const bb = Jl;
function xs(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function vb(e = {}) {
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
    o && (d = d.toLowerCase()), t && (d = xs(d));
    const f = d
      ? l.filter((b) => {
          let g = (a || u)(b);
          return (
            o && (g = g.toLowerCase()),
            t && (g = xs(g)),
            i === 'start' ? g.indexOf(d) === 0 : g.indexOf(d) > -1
          );
        })
      : l;
    return typeof r == 'number' ? f.slice(0, r) : f;
  };
}
function Wr(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const gb = vb(),
  Es = 5,
  yb = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function xb(e) {
  const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_isActiveElementInListbox: t = yb,
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
      disableClearable: f = !1,
      disableCloseOnSelect: b = !1,
      disabled: g,
      disabledItemsFocusable: y = !1,
      disableListWrap: h = !1,
      filterOptions: m = gb,
      filterSelectedOptions: C = !1,
      freeSolo: S = !1,
      getOptionDisabled: T,
      getOptionLabel: E = (P) => {
        var N;
        return (N = P.label) != null ? N : P;
      },
      groupBy: p,
      handleHomeEndKeys: R = !e.freeSolo,
      id: w,
      includeInputInList: V = !1,
      inputValue: D,
      isOptionEqualToValue: A = (P, N) => P === N,
      multiple: _ = !1,
      onChange: K,
      onClose: B,
      onHighlightChange: M,
      onInputChange: j,
      onOpen: z,
      open: le,
      openOnFocus: ie = !1,
      options: G,
      readOnly: $ = !1,
      selectOnFocus: F = !e.freeSolo,
      value: X,
    } = e,
    H = ll(w);
  let U = E;
  U = (P) => {
    const N = E(P);
    if (typeof N != 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const Y = N === void 0 ? 'undefined' : `${typeof N} (${N})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${u} returned ${Y} instead of a string for ${JSON.stringify(
            P,
          )}.`,
        );
      }
      return String(N);
    }
    return N;
  };
  const te = x.useRef(!1),
    ne = x.useRef(!0),
    J = x.useRef(null),
    re = x.useRef(null),
    [se, me] = x.useState(null),
    [oe, k] = x.useState(-1),
    Ee = i ? 0 : -1,
    I = x.useRef(Ee),
    [W, $e] = Cn({
      controlled: X,
      default: d,
      name: u,
    }),
    [ve, Xe] = Cn({
      controlled: D,
      default: '',
      name: u,
      state: 'inputValue',
    }),
    [Me, Ce] = x.useState(!1),
    Re = x.useCallback(
      (P, N) => {
        if (!(_ ? W.length < N.length : N !== null) && !l) return;
        let ee;
        if (_) ee = '';
        else if (N == null) ee = '';
        else {
          const de = U(N);
          ee = typeof de == 'string' ? de : '';
        }
        ve !== ee && (Xe(ee), j && j(P, ee, 'reset'));
      },
      [U, ve, _, j, Xe, l, W],
    ),
    [Je, ot] = Cn({
      controlled: le,
      default: !1,
      name: u,
      state: 'open',
    }),
    [Z, fe] = x.useState(!0),
    ge = !_ && W != null && ve === U(W),
    be = Je && !$,
    pe = be
      ? m(
          G.filter((P) => !(C && (_ ? W : [W]).some((N) => N !== null && A(P, N)))),
          // we use the empty string to manipulate `filterOptions` to not filter any options
          // i.e. the filter predicate always returns true
          {
            inputValue: ge && Z ? '' : ve,
            getOptionLabel: U,
          },
        )
      : [],
    ue = ed({
      filteredOptions: pe,
      value: W,
    });
  x.useEffect(() => {
    const P = W !== ue.value;
    (Me && !P) || (S && !P) || Re(null, W);
  }, [W, Re, Me, ue.value, S]);
  const Q = Je && pe.length > 0 && !$;
  if (process.env.NODE_ENV !== 'production' && W !== null && !S && G.length > 0) {
    const P = (_ ? W : [W]).filter((N) => !G.some((Y) => A(Y, N)));
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
  const ye = Pt((P) => {
    P === -1 ? J.current.focus() : se.querySelector(`[data-tag-index="${P}"]`).focus();
  });
  x.useEffect(() => {
    _ && oe > W.length - 1 && (k(-1), ye(-1));
  }, [W, _, oe, ye]);
  function xe(P, N) {
    if (!re.current || P === -1) return -1;
    let Y = P;
    for (;;) {
      if ((N === 'next' && Y === pe.length) || (N === 'previous' && Y === -1)) return -1;
      const ee = re.current.querySelector(`[data-option-index="${Y}"]`),
        de = y ? !1 : !ee || ee.disabled || ee.getAttribute('aria-disabled') === 'true';
      if ((ee && !ee.hasAttribute('tabindex')) || de) Y += N === 'next' ? 1 : -1;
      else return Y;
    }
  }
  const Ne = Pt(({ event: P, index: N, reason: Y = 'auto' }) => {
      if (
        ((I.current = N),
        N === -1
          ? J.current.removeAttribute('aria-activedescendant')
          : J.current.setAttribute('aria-activedescendant', `${H}-option-${N}`),
        M && M(P, N === -1 ? null : pe[N], Y),
        !re.current)
      )
        return;
      const ee = re.current.querySelector(`[role="option"].${o}-focused`);
      ee && (ee.classList.remove(`${o}-focused`), ee.classList.remove(`${o}-focusVisible`));
      const de = re.current.parentElement.querySelector('[role="listbox"]');
      if (!de) return;
      if (N === -1) {
        de.scrollTop = 0;
        return;
      }
      const we = re.current.querySelector(`[data-option-index="${N}"]`);
      if (
        we &&
        (we.classList.add(`${o}-focused`),
        Y === 'keyboard' && we.classList.add(`${o}-focusVisible`),
        de.scrollHeight > de.clientHeight && Y !== 'mouse')
      ) {
        const Se = we,
          Ie = de.clientHeight + de.scrollTop,
          ht = Se.offsetTop + Se.offsetHeight;
        ht > Ie
          ? (de.scrollTop = ht - de.clientHeight)
          : Se.offsetTop - Se.offsetHeight * (p ? 1.3 : 0) < de.scrollTop &&
            (de.scrollTop = Se.offsetTop - Se.offsetHeight * (p ? 1.3 : 0));
      }
    }),
    rt = Pt(({ event: P, diff: N, direction: Y = 'next', reason: ee = 'auto' }) => {
      if (!be) return;
      const we = xe(
        (() => {
          const Se = pe.length - 1;
          if (N === 'reset') return Ee;
          if (N === 'start') return 0;
          if (N === 'end') return Se;
          const Ie = I.current + N;
          return Ie < 0
            ? Ie === -1 && V
              ? -1
              : (h && I.current !== -1) || Math.abs(N) > 1
              ? 0
              : Se
            : Ie > Se
            ? Ie === Se + 1 && V
              ? -1
              : h || Math.abs(N) > 1
              ? Se
              : 0
            : Ie;
        })(),
        Y,
      );
      if (
        (Ne({
          index: we,
          reason: ee,
          event: P,
        }),
        r && N !== 'reset')
      )
        if (we === -1) J.current.value = ve;
        else {
          const Se = U(pe[we]);
          (J.current.value = Se),
            Se.toLowerCase().indexOf(ve.toLowerCase()) === 0 &&
              ve.length > 0 &&
              J.current.setSelectionRange(ve.length, Se.length);
        }
    }),
    ct = () => {
      const P = (N, Y) => {
        const ee = N ? U(N) : '',
          de = Y ? U(Y) : '';
        return ee === de;
      };
      if (
        I.current !== -1 &&
        ue.filteredOptions &&
        ue.filteredOptions.length !== pe.length &&
        (_
          ? W.length === ue.value.length && ue.value.every((N, Y) => U(W[Y]) === U(N))
          : P(ue.value, W))
      ) {
        const N = ue.filteredOptions[I.current];
        if (N && pe.some((ee) => U(ee) === U(N))) return !0;
      }
      return !1;
    },
    xt = x.useCallback(() => {
      if (!be || ct()) return;
      const P = _ ? W[0] : W;
      if (pe.length === 0 || P == null) {
        rt({
          diff: 'reset',
        });
        return;
      }
      if (re.current) {
        if (P != null) {
          const N = pe[I.current];
          if (_ && N && Wr(W, (ee) => A(N, ee)) !== -1) return;
          const Y = Wr(pe, (ee) => A(ee, P));
          Y === -1
            ? rt({
                diff: 'reset',
              })
            : Ne({
                index: Y,
              });
          return;
        }
        if (I.current >= pe.length - 1) {
          Ne({
            index: pe.length - 1,
          });
          return;
        }
        Ne({
          index: I.current,
        });
      }
    }, [
      // Only sync the highlighted index when the option switch between empty and not
      pe.length,
      // Don't sync the highlighted index with the value when multiple
      // eslint-disable-next-line react-hooks/exhaustive-deps
      _ ? !1 : W,
      C,
      rt,
      Ne,
      be,
      ve,
      _,
    ]),
    un = Pt((P) => {
      Ko(re, P), P && xt();
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
      xt();
    }, [xt]);
  const Et = (P) => {
      Je || (ot(!0), fe(!0), z && z(P));
    },
    mt = (P, N) => {
      Je && (ot(!1), B && B(P, N));
    },
    vt = (P, N, Y, ee) => {
      if (_) {
        if (W.length === N.length && W.every((de, we) => de === N[we])) return;
      } else if (W === N) return;
      K && K(P, N, Y, ee), $e(N);
    },
    ut = x.useRef(!1),
    Ze = (P, N, Y = 'selectOption', ee = 'options') => {
      let de = Y,
        we = N;
      if (_) {
        if (((we = Array.isArray(W) ? W.slice() : []), process.env.NODE_ENV !== 'production')) {
          const Ie = we.filter((ht) => A(N, ht));
          Ie.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${u} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${Ie.length} matches.`,
              ].join(`
`),
            );
        }
        const Se = Wr(we, (Ie) => A(N, Ie));
        Se === -1 ? we.push(N) : ee !== 'freeSolo' && (we.splice(Se, 1), (de = 'removeOption'));
      }
      Re(P, we),
        vt(P, we, de, {
          option: N,
        }),
        !b && (!P || (!P.ctrlKey && !P.metaKey)) && mt(P, de),
        (s === !0 || (s === 'touch' && ut.current) || (s === 'mouse' && !ut.current)) &&
          J.current.blur();
    };
  function tt(P, N) {
    if (P === -1) return -1;
    let Y = P;
    for (;;) {
      if ((N === 'next' && Y === W.length) || (N === 'previous' && Y === -1)) return -1;
      const ee = se.querySelector(`[data-tag-index="${Y}"]`);
      if (
        !ee ||
        !ee.hasAttribute('tabindex') ||
        ee.disabled ||
        ee.getAttribute('aria-disabled') === 'true'
      )
        Y += N === 'next' ? 1 : -1;
      else return Y;
    }
  }
  const dt = (P, N) => {
      if (!_) return;
      ve === '' && mt(P, 'toggleInput');
      let Y = oe;
      oe === -1
        ? ve === '' && N === 'previous' && (Y = W.length - 1)
        : ((Y += N === 'next' ? 1 : -1), Y < 0 && (Y = 0), Y === W.length && (Y = -1)),
        (Y = tt(Y, N)),
        k(Y),
        ye(Y);
    },
    yn = (P) => {
      (te.current = !0), Xe(''), j && j(P, '', 'clear'), vt(P, _ ? [] : null, 'clear');
    },
    qt = (P) => (N) => {
      if (
        (P.onKeyDown && P.onKeyDown(N),
        !N.defaultMuiPrevented &&
          (oe !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(N.key) === -1 && (k(-1), ye(-1)),
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
                diff: -Es,
                direction: 'previous',
                reason: 'keyboard',
                event: N,
              }),
              Et(N);
            break;
          case 'PageDown':
            N.preventDefault(),
              rt({
                diff: Es,
                direction: 'next',
                reason: 'keyboard',
                event: N,
              }),
              Et(N);
            break;
          case 'ArrowDown':
            N.preventDefault(),
              rt({
                diff: 1,
                direction: 'next',
                reason: 'keyboard',
                event: N,
              }),
              Et(N);
            break;
          case 'ArrowUp':
            N.preventDefault(),
              rt({
                diff: -1,
                direction: 'previous',
                reason: 'keyboard',
                event: N,
              }),
              Et(N);
            break;
          case 'ArrowLeft':
            dt(N, 'previous');
            break;
          case 'ArrowRight':
            dt(N, 'next');
            break;
          case 'Enter':
            if (I.current !== -1 && be) {
              const Y = pe[I.current],
                ee = T ? T(Y) : !1;
              if ((N.preventDefault(), ee)) return;
              Ze(N, Y, 'selectOption'),
                r && J.current.setSelectionRange(J.current.value.length, J.current.value.length);
            } else
              S &&
                ve !== '' &&
                ge === !1 &&
                (_ && N.preventDefault(), Ze(N, ve, 'createOption', 'freeSolo'));
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
              const Y = oe === -1 ? W.length - 1 : oe,
                ee = W.slice();
              ee.splice(Y, 1),
                vt(N, ee, 'removeOption', {
                  option: W[Y],
                });
            }
            break;
          case 'Delete':
            if (_ && !$ && ve === '' && W.length > 0 && oe !== -1) {
              const Y = oe,
                ee = W.slice();
              ee.splice(Y, 1),
                vt(N, ee, 'removeOption', {
                  option: W[Y],
                });
            }
            break;
        }
    },
    dn = (P) => {
      Ce(!0), ie && !te.current && Et(P);
    },
    Ft = (P) => {
      if (t(re)) {
        J.current.focus();
        return;
      }
      Ce(!1),
        (ne.current = !0),
        (te.current = !1),
        a && I.current !== -1 && be
          ? Ze(P, pe[I.current], 'blur')
          : a && S && ve !== ''
          ? Ze(P, ve, 'blur', 'freeSolo')
          : l && Re(P, W),
        mt(P, 'blur');
    },
    nn = (P) => {
      const N = P.target.value;
      ve !== N && (Xe(N), fe(!1), j && j(P, N, 'input')),
        N === '' ? !f && !_ && vt(P, null, 'clear') : Et(P);
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
        (ut.current = !0);
    },
    Yt = (P) => {
      const N = Number(P.currentTarget.getAttribute('data-option-index'));
      Ze(P, pe[N], 'selectOption'), (ut.current = !1);
    },
    an = (P) => (N) => {
      const Y = W.slice();
      Y.splice(P, 1),
        vt(N, Y, 'removeOption', {
          option: W[P],
        });
    },
    ke = (P) => {
      Je ? mt(P, 'toggleInput') : Et(P);
    },
    st = (P) => {
      P.target.getAttribute('id') !== H && P.preventDefault();
    },
    It = () => {
      J.current.focus(),
        F &&
          ne.current &&
          J.current.selectionEnd - J.current.selectionStart === 0 &&
          J.current.select(),
        (ne.current = !1);
    },
    O = (P) => {
      (ve === '' || !Je) && ke(P);
    };
  let q = S && ve.length > 0;
  q = q || (_ ? W.length > 0 : W !== null);
  let ce = pe;
  if (p) {
    const P = /* @__PURE__ */ new Map();
    let N = !1;
    ce = pe.reduce((Y, ee, de) => {
      const we = p(ee);
      return (
        Y.length > 0 && Y[Y.length - 1].group === we
          ? Y[Y.length - 1].options.push(ee)
          : (process.env.NODE_ENV !== 'production' &&
              (P.get(we) &&
                !N &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${u} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                (N = !0)),
              P.set(we, !0)),
            Y.push({
              key: de,
              index: de,
              group: we,
              options: [ee],
            })),
        Y
      );
    }, []);
  }
  return (
    g && Me && Ft(),
    {
      getRootProps: (P = {}) =>
        v(
          {
            'aria-owns': Q ? `${H}-listbox` : null,
          },
          P,
          {
            onKeyDown: qt(P),
            onMouseDown: st,
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
        onBlur: Ft,
        onFocus: dn,
        onChange: nn,
        onMouseDown: O,
        // if open then this is handled imperativeley so don't let react override
        // only have an opinion about this when closed
        'aria-activedescendant': be ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': Q ? `${H}-listbox` : void 0,
        'aria-expanded': Q,
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
        const Y = (_ ? W : [W]).some((de) => de != null && A(N, de)),
          ee = T ? T(N) : !1;
        return {
          key: U(N),
          tabIndex: -1,
          role: 'option',
          id: `${H}-option-${P}`,
          onMouseOver: on,
          onClick: Yt,
          onTouchStart: rn,
          'data-option-index': P,
          'aria-disabled': ee,
          'aria-selected': Y,
        };
      },
      id: H,
      inputValue: ve,
      value: W,
      dirty: q,
      expanded: be && se,
      popupOpen: be,
      focused: Me || oe !== -1,
      anchorEl: se,
      setAnchorEl: me,
      focusedTag: oe,
      groupedOptions: ce,
    }
  );
}
function Eb(e) {
  return De('MuiSvgIcon', e);
}
qe('MuiSvgIcon', [
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
const Ob = [
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
  Tb = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      i = {
        root: ['root', t !== 'inherit' && `color${ae(t)}`, `fontSize${ae(o)}`],
      };
    return Ke(i, Eb, r);
  },
  Cb = he('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'inherit' && t[`color${ae(o.color)}`],
        t[`fontSize${ae(o.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    var o, r, i, a, s, l, c, u, d, f, b, g, y, h, m, C, S;
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
          ((d = e.typography) == null || (f = d.pxToRem) == null ? void 0 : f.call(d, 35)) ||
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
                (C = (e.vars || e).palette) == null || (S = C.action) == null ? void 0 : S.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  Ui = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        titleAccess: f,
        viewBox: b = '0 0 24 24',
      } = r,
      g = Te(r, Ob),
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
    const m = Tb(y);
    return /* @__PURE__ */ Qe(
      Cb,
      v(
        {
          as: l,
          className: Oe(m.root, a),
          focusable: 'false',
          color: u,
          'aria-hidden': f ? void 0 : !0,
          role: f ? 'img' : void 0,
          ref: o,
        },
        h,
        g,
        {
          ownerState: y,
          children: [
            i,
            f
              ? /* @__PURE__ */ L('title', {
                  children: f,
                })
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ui.propTypes = {
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
Ui.muiName = 'SvgIcon';
const Os = Ui;
function Xn(e, t) {
  function o(r, i) {
    return /* @__PURE__ */ L(
      Os,
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
    (o.muiName = Os.muiName),
    /* @__PURE__ */ x.memo(/* @__PURE__ */ x.forwardRef(o))
  );
}
var si = { exports: {} },
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
var Ts;
function Sb() {
  if (Ts) return Ue;
  Ts = 1;
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
    f = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    g = Symbol.for('react.offscreen'),
    y;
  y = Symbol.for('react.module.reference');
  function h(m) {
    if (typeof m == 'object' && m !== null) {
      var C = m.$$typeof;
      switch (C) {
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
                case f:
                case a:
                  return m;
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
    (Ue.Lazy = b),
    (Ue.Memo = f),
    (Ue.Portal = t),
    (Ue.Profiler = i),
    (Ue.StrictMode = r),
    (Ue.Suspense = u),
    (Ue.SuspenseList = d),
    (Ue.isAsyncMode = function () {
      return !1;
    }),
    (Ue.isConcurrentMode = function () {
      return !1;
    }),
    (Ue.isContextConsumer = function (m) {
      return h(m) === s;
    }),
    (Ue.isContextProvider = function (m) {
      return h(m) === a;
    }),
    (Ue.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (Ue.isForwardRef = function (m) {
      return h(m) === c;
    }),
    (Ue.isFragment = function (m) {
      return h(m) === o;
    }),
    (Ue.isLazy = function (m) {
      return h(m) === b;
    }),
    (Ue.isMemo = function (m) {
      return h(m) === f;
    }),
    (Ue.isPortal = function (m) {
      return h(m) === t;
    }),
    (Ue.isProfiler = function (m) {
      return h(m) === i;
    }),
    (Ue.isStrictMode = function (m) {
      return h(m) === r;
    }),
    (Ue.isSuspense = function (m) {
      return h(m) === u;
    }),
    (Ue.isSuspenseList = function (m) {
      return h(m) === d;
    }),
    (Ue.isValidElementType = function (m) {
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
            m.$$typeof === f ||
            m.$$typeof === a ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === y ||
            m.getModuleId !== void 0))
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
var Cs;
function Rb() {
  return (
    Cs ||
      ((Cs = 1),
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
            f = Symbol.for('react.memo'),
            b = Symbol.for('react.lazy'),
            g = Symbol.for('react.offscreen'),
            y = !1,
            h = !1,
            m = !1,
            C = !1,
            S = !1,
            T;
          T = Symbol.for('react.module.reference');
          function E(I) {
            return !!(
              typeof I == 'string' ||
              typeof I == 'function' ||
              I === o ||
              I === i ||
              S ||
              I === r ||
              I === u ||
              I === d ||
              C ||
              I === g ||
              y ||
              h ||
              m ||
              (typeof I == 'object' &&
                I !== null &&
                (I.$$typeof === b ||
                  I.$$typeof === f ||
                  I.$$typeof === a ||
                  I.$$typeof === s ||
                  I.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  I.$$typeof === T ||
                  I.getModuleId !== void 0))
            );
          }
          function p(I) {
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
                        case f:
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
            V = e,
            D = c,
            A = o,
            _ = b,
            K = f,
            B = t,
            M = i,
            j = r,
            z = u,
            le = d,
            ie = !1,
            G = !1;
          function $(I) {
            return (
              ie ||
                ((ie = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function F(I) {
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
            return p(I) === s;
          }
          function H(I) {
            return p(I) === a;
          }
          function U(I) {
            return typeof I == 'object' && I !== null && I.$$typeof === e;
          }
          function te(I) {
            return p(I) === c;
          }
          function ne(I) {
            return p(I) === o;
          }
          function J(I) {
            return p(I) === b;
          }
          function re(I) {
            return p(I) === f;
          }
          function se(I) {
            return p(I) === t;
          }
          function me(I) {
            return p(I) === i;
          }
          function oe(I) {
            return p(I) === r;
          }
          function k(I) {
            return p(I) === u;
          }
          function Ee(I) {
            return p(I) === d;
          }
          (We.ContextConsumer = R),
            (We.ContextProvider = w),
            (We.Element = V),
            (We.ForwardRef = D),
            (We.Fragment = A),
            (We.Lazy = _),
            (We.Memo = K),
            (We.Portal = B),
            (We.Profiler = M),
            (We.StrictMode = j),
            (We.Suspense = z),
            (We.SuspenseList = le),
            (We.isAsyncMode = $),
            (We.isConcurrentMode = F),
            (We.isContextConsumer = X),
            (We.isContextProvider = H),
            (We.isElement = U),
            (We.isForwardRef = te),
            (We.isFragment = ne),
            (We.isLazy = J),
            (We.isMemo = re),
            (We.isPortal = se),
            (We.isProfiler = me),
            (We.isStrictMode = oe),
            (We.isSuspense = k),
            (We.isSuspenseList = Ee),
            (We.isValidElementType = E),
            (We.typeOf = p);
        })()),
    We
  );
}
process.env.NODE_ENV === 'production' ? (si.exports = Sb()) : (si.exports = Rb());
var Wi = si.exports;
function li(e, t) {
  return (
    (li = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    li(e, t)
  );
}
function Zl(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), li(e, t);
}
const Ss = {
  disabled: !1,
};
var wb =
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
const or = zt.createContext(null);
var $b = function (t) {
    return t.scrollTop;
  },
  so = 'unmounted',
  En = 'exited',
  On = 'entering',
  jn = 'entered',
  ci = 'exiting',
  cn = /* @__PURE__ */ (function (e) {
    Zl(t, e);
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
            ? ((c = En), (a.appearStatus = On))
            : (c = jn)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = so)
          : (c = En),
        (a.state = {
          status: c,
        }),
        (a.nextCallback = null),
        a
      );
    }
    t.getDerivedStateFromProps = function (i, a) {
      var s = i.in;
      return s && a.status === so
        ? {
            status: En,
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
          this.props.in ? s !== On && s !== jn && (a = On) : (s === On || s === jn) && (a = ci);
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
              var s = this.props.nodeRef ? this.props.nodeRef.current : ko.findDOMNode(this);
              s && $b(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === En &&
            this.setState({
              status: so,
            });
      }),
      (o.performEnter = function (i) {
        var a = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [l] : [ko.findDOMNode(this), l],
          u = c[0],
          d = c[1],
          f = this.getTimeouts(),
          b = l ? f.appear : f.enter;
        if ((!i && !s) || Ss.disabled) {
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
          l = this.props.nodeRef ? void 0 : ko.findDOMNode(this);
        if (!a || Ss.disabled) {
          this.safeSetState(
            {
              status: En,
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
              status: ci,
            },
            function () {
              i.props.onExiting(l),
                i.onTransitionEnd(s.exit, function () {
                  i.safeSetState(
                    {
                      status: En,
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : ko.findDOMNode(this),
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
        if (i === so) return null;
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
        var l = Te(a, [
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
          /* @__PURE__ */ zt.createElement(
            or.Provider,
            {
              value: null,
            },
            typeof s == 'function' ? s(i, l) : zt.cloneElement(zt.Children.only(s), l),
          )
        );
      }),
      t
    );
  })(zt.Component);
cn.contextType = or;
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
          var o = wb;
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
cn.UNMOUNTED = so;
cn.EXITED = En;
cn.ENTERING = On;
cn.ENTERED = jn;
cn.EXITING = ci;
const Ql = cn;
function Pb(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Hi(e, t) {
  var o = function (a) {
      return t && zo(a) ? t(a) : a;
    },
    r = /* @__PURE__ */ Object.create(null);
  return (
    e &&
      su
        .map(e, function (i) {
          return i;
        })
        .forEach(function (i) {
          r[i.key] = o(i);
        }),
    r
  );
}
function Nb(e, t) {
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
function kb(e, t) {
  return Hi(e.children, function (o) {
    return Bo(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: Tn(o, 'appear', e),
      enter: Tn(o, 'enter', e),
      exit: Tn(o, 'exit', e),
    });
  });
}
function Ib(e, t, o) {
  var r = Hi(e.children),
    i = Nb(t, r);
  return (
    Object.keys(i).forEach(function (a) {
      var s = i[a];
      if (zo(s)) {
        var l = a in t,
          c = a in r,
          u = t[a],
          d = zo(u) && !u.props.in;
        c && (!l || d)
          ? (i[a] = Bo(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: Tn(s, 'exit', e),
              enter: Tn(s, 'enter', e),
            }))
          : !c && l && !d
          ? (i[a] = Bo(s, {
              in: !1,
            }))
          : c &&
            l &&
            zo(u) &&
            (i[a] = Bo(s, {
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
var _b =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  Mb = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  qi = /* @__PURE__ */ (function (e) {
    Zl(t, e);
    function t(r, i) {
      var a;
      a = e.call(this, r, i) || this;
      var s = a.handleExited.bind(Pb(a));
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
          children: c ? kb(i, l) : Ib(i, s, l),
          firstRender: !1,
        };
      }),
      (o.handleExited = function (i, a) {
        var s = Hi(this.props.children);
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
          l = Te(i, ['component', 'childFactory']),
          c = this.state.contextValue,
          u = _b(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          a === null
            ? /* @__PURE__ */ zt.createElement(
                or.Provider,
                {
                  value: c,
                },
                u,
              )
            : /* @__PURE__ */ zt.createElement(
                or.Provider,
                {
                  value: c,
                },
                /* @__PURE__ */ zt.createElement(a, l, u),
              )
        );
      }),
      t
    );
  })(zt.Component);
qi.propTypes =
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
qi.defaultProps = Mb;
const Ab = qi,
  ec = (e) => e.scrollTop;
function rr(e, t) {
  var o, r;
  const { timeout: i, easing: a, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof i == 'number' ? i : i[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == 'object' ? a[t.mode] : a,
    delay: s.transitionDelay,
  };
}
function Db(e) {
  return De('MuiPaper', e);
}
qe('MuiPaper', [
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
const Lb = ['className', 'component', 'elevation', 'square', 'variant'],
  Fb = (e) => {
    const { square: t, elevation: o, variant: r, classes: i } = e,
      a = {
        root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`],
      };
    return Ke(a, Db, i);
  },
  jb = he('div', {
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
              backgroundImage: `linear-gradient(${et('#fff', ns(t.elevation))}, ${et(
                '#fff',
                ns(t.elevation),
              )})`,
            },
          e.vars && {
            backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation],
          },
        ),
    );
  }),
  tc = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
      u = Te(r, Lb),
      d = v({}, r, {
        component: a,
        elevation: s,
        square: l,
        variant: c,
      }),
      f = Fb(d);
    return (
      process.env.NODE_ENV !== 'production' &&
        $o().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      /* @__PURE__ */ L(
        jb,
        v(
          {
            as: a,
            ownerState: d,
            className: Oe(f.root, i),
            ref: o,
          },
          u,
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (tc.propTypes = {
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
    elevation: Wt(bi, (e) => {
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
const Sr = tc;
function nc(e) {
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
    [d, f] = x.useState(!1),
    b = Oe(t, o.ripple, o.rippleVisible, r && o.ripplePulsate),
    g = {
      width: s,
      height: s,
      top: -(s / 2) + a,
      left: -(s / 2) + i,
    },
    y = Oe(o.child, d && o.childLeaving, r && o.childPulsate);
  return (
    !l && !d && f(!0),
    x.useEffect(() => {
      if (!l && c != null) {
        const h = setTimeout(c, u);
        return () => {
          clearTimeout(h);
        };
      }
    }, [c, l, u]),
    /* @__PURE__ */ L('span', {
      className: b,
      style: g,
      children: /* @__PURE__ */ L('span', {
        className: y,
      }),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (nc.propTypes = {
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
const Vb = qe('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  _t = Vb,
  zb = ['center', 'classes', 'className'];
let Rr = (e) => e,
  Rs,
  ws,
  $s,
  Ps;
const ui = 550,
  Bb = 80,
  Ub = wi(
    Rs ||
      (Rs = Rr`
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
  Wb = wi(
    ws ||
      (ws = Rr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  Hb = wi(
    $s ||
      ($s = Rr`
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
  qb = he('span', {
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
  Yb = he(nc, {
    name: 'MuiTouchRipple',
    slot: 'Ripple',
  })(
    Ps ||
      (Ps = Rr`
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
    _t.rippleVisible,
    Ub,
    ui,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    _t.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    _t.child,
    _t.childLeaving,
    Wb,
    ui,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    _t.childPulsate,
    Hb,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  oc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiTouchRipple',
      }),
      { center: i = !1, classes: a = {}, className: s } = r,
      l = Te(r, zb),
      [c, u] = x.useState([]),
      d = x.useRef(0),
      f = x.useRef(null);
    x.useEffect(() => {
      f.current && (f.current(), (f.current = null));
    }, [c]);
    const b = x.useRef(!1),
      g = x.useRef(null),
      y = x.useRef(null),
      h = x.useRef(null);
    x.useEffect(
      () => () => {
        clearTimeout(g.current);
      },
      [],
    );
    const m = x.useCallback(
        (E) => {
          const { pulsate: p, rippleX: R, rippleY: w, rippleSize: V, cb: D } = E;
          u((A) => [
            ...A,
            /* @__PURE__ */ L(
              Yb,
              {
                classes: {
                  ripple: Oe(a.ripple, _t.ripple),
                  rippleVisible: Oe(a.rippleVisible, _t.rippleVisible),
                  ripplePulsate: Oe(a.ripplePulsate, _t.ripplePulsate),
                  child: Oe(a.child, _t.child),
                  childLeaving: Oe(a.childLeaving, _t.childLeaving),
                  childPulsate: Oe(a.childPulsate, _t.childPulsate),
                },
                timeout: ui,
                pulsate: p,
                rippleX: R,
                rippleY: w,
                rippleSize: V,
              },
              d.current,
            ),
          ]),
            (d.current += 1),
            (f.current = D);
        },
        [a],
      ),
      C = x.useCallback(
        (E = {}, p = {}, R = () => {}) => {
          const {
            pulsate: w = !1,
            center: V = i || p.pulsate,
            fakeElement: D = !1,
            // For test purposes
          } = p;
          if ((E == null ? void 0 : E.type) === 'mousedown' && b.current) {
            b.current = !1;
            return;
          }
          (E == null ? void 0 : E.type) === 'touchstart' && (b.current = !0);
          const A = D ? null : h.current,
            _ = A
              ? A.getBoundingClientRect()
              : {
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                };
          let K, B, M;
          if (
            V ||
            E === void 0 ||
            (E.clientX === 0 && E.clientY === 0) ||
            (!E.clientX && !E.touches)
          )
            (K = Math.round(_.width / 2)), (B = Math.round(_.height / 2));
          else {
            const { clientX: j, clientY: z } = E.touches && E.touches.length > 0 ? E.touches[0] : E;
            (K = Math.round(j - _.left)), (B = Math.round(z - _.top));
          }
          if (V) (M = Math.sqrt((2 * _.width ** 2 + _.height ** 2) / 3)), M % 2 === 0 && (M += 1);
          else {
            const j = Math.max(Math.abs((A ? A.clientWidth : 0) - K), K) * 2 + 2,
              z = Math.max(Math.abs((A ? A.clientHeight : 0) - B), B) * 2 + 2;
            M = Math.sqrt(j ** 2 + z ** 2);
          }
          E != null && E.touches
            ? y.current === null &&
              ((y.current = () => {
                m({
                  pulsate: w,
                  rippleX: K,
                  rippleY: B,
                  rippleSize: M,
                  cb: R,
                });
              }),
              (g.current = setTimeout(() => {
                y.current && (y.current(), (y.current = null));
              }, Bb)))
            : m({
                pulsate: w,
                rippleX: K,
                rippleY: B,
                rippleSize: M,
                cb: R,
              });
        },
        [i, m],
      ),
      S = x.useCallback(() => {
        C(
          {},
          {
            pulsate: !0,
          },
        );
      }, [C]),
      T = x.useCallback((E, p) => {
        if ((clearTimeout(g.current), (E == null ? void 0 : E.type) === 'touchend' && y.current)) {
          y.current(),
            (y.current = null),
            (g.current = setTimeout(() => {
              T(E, p);
            }));
          return;
        }
        (y.current = null), u((R) => (R.length > 0 ? R.slice(1) : R)), (f.current = p);
      }, []);
    return (
      x.useImperativeHandle(
        o,
        () => ({
          pulsate: S,
          start: C,
          stop: T,
        }),
        [S, C, T],
      ),
      /* @__PURE__ */ L(
        qb,
        v(
          {
            className: Oe(_t.root, a.root, s),
            ref: h,
          },
          l,
          {
            children: /* @__PURE__ */ L(Ab, {
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
  (oc.propTypes = {
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
const Kb = oc;
function Gb(e) {
  return De('MuiButtonBase', e);
}
const Xb = qe('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  Jb = Xb,
  Zb = [
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
  Qb = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: i } = e,
      s = Ke(
        {
          root: ['root', t && 'disabled', o && 'focusVisible'],
        },
        Gb,
        i,
      );
    return o && r && (s.root += ` ${r}`), s;
  },
  ev = he('button', {
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
    [`&.${Jb.disabled}`]: {
      pointerEvents: 'none',
      // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
  }),
  rc = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        disableTouchRipple: f = !1,
        focusRipple: b = !1,
        LinkComponent: g = 'a',
        onBlur: y,
        onClick: h,
        onContextMenu: m,
        onDragLeave: C,
        onFocus: S,
        onFocusVisible: T,
        onKeyDown: E,
        onKeyUp: p,
        onMouseDown: R,
        onMouseLeave: w,
        onMouseUp: V,
        onTouchEnd: D,
        onTouchMove: A,
        onTouchStart: _,
        tabIndex: K = 0,
        TouchRippleProps: B,
        touchRippleRef: M,
        type: j,
      } = r,
      z = Te(r, Zb),
      le = x.useRef(null),
      ie = x.useRef(null),
      G = ft(ie, M),
      { isFocusVisibleRef: $, onFocus: F, onBlur: X, ref: H } = cl(),
      [U, te] = x.useState(!1);
    u && U && te(!1),
      x.useImperativeHandle(
        i,
        () => ({
          focusVisible: () => {
            te(!0), le.current.focus();
          },
        }),
        [],
      );
    const [ne, J] = x.useState(!1);
    x.useEffect(() => {
      J(!0);
    }, []);
    const re = ne && !d && !u;
    x.useEffect(() => {
      U && b && !d && ne && ie.current.pulsate();
    }, [d, b, U, ne]);
    function se(ue, Q, ye = f) {
      return Pt((xe) => (Q && Q(xe), !ye && ie.current && ie.current[ue](xe), !0));
    }
    const me = se('start', R),
      oe = se('stop', m),
      k = se('stop', C),
      Ee = se('stop', V),
      I = se('stop', (ue) => {
        U && ue.preventDefault(), w && w(ue);
      }),
      W = se('start', _),
      $e = se('stop', D),
      ve = se('stop', A),
      Xe = se(
        'stop',
        (ue) => {
          X(ue), $.current === !1 && te(!1), y && y(ue);
        },
        !1,
      ),
      Me = Pt((ue) => {
        le.current || (le.current = ue.currentTarget),
          F(ue),
          $.current === !0 && (te(!0), T && T(ue)),
          S && S(ue);
      }),
      Ce = () => {
        const ue = le.current;
        return c && c !== 'button' && !(ue.tagName === 'A' && ue.href);
      },
      Re = x.useRef(!1),
      Je = Pt((ue) => {
        b &&
          !Re.current &&
          U &&
          ie.current &&
          ue.key === ' ' &&
          ((Re.current = !0),
          ie.current.stop(ue, () => {
            ie.current.start(ue);
          })),
          ue.target === ue.currentTarget && Ce() && ue.key === ' ' && ue.preventDefault(),
          E && E(ue),
          ue.target === ue.currentTarget &&
            Ce() &&
            ue.key === 'Enter' &&
            !u &&
            (ue.preventDefault(), h && h(ue));
      }),
      ot = Pt((ue) => {
        b &&
          ue.key === ' ' &&
          ie.current &&
          U &&
          !ue.defaultPrevented &&
          ((Re.current = !1),
          ie.current.stop(ue, () => {
            ie.current.pulsate(ue);
          })),
          p && p(ue),
          h &&
            ue.target === ue.currentTarget &&
            Ce() &&
            ue.key === ' ' &&
            !ue.defaultPrevented &&
            h(ue);
      });
    let Z = c;
    Z === 'button' && (z.href || z.to) && (Z = g);
    const fe = {};
    Z === 'button'
      ? ((fe.type = j === void 0 ? 'button' : j), (fe.disabled = u))
      : (!z.href && !z.to && (fe.role = 'button'), u && (fe['aria-disabled'] = u));
    const ge = ft(o, H, le);
    process.env.NODE_ENV !== 'production' &&
      x.useEffect(() => {
        re &&
          !ie.current &&
          console.error(
            [
              'MUI: The `component` prop provided to ButtonBase is invalid.',
              'Please make sure the children prop is rendered in this custom component.',
            ].join(`
`),
          );
      }, [re]);
    const be = v({}, r, {
        centerRipple: a,
        component: c,
        disabled: u,
        disableRipple: d,
        disableTouchRipple: f,
        focusRipple: b,
        tabIndex: K,
        focusVisible: U,
      }),
      pe = Qb(be);
    return /* @__PURE__ */ Qe(
      ev,
      v(
        {
          as: Z,
          className: Oe(pe.root, l),
          ownerState: be,
          onBlur: Xe,
          onClick: h,
          onContextMenu: oe,
          onFocus: Me,
          onKeyDown: Je,
          onKeyUp: ot,
          onMouseDown: me,
          onMouseLeave: I,
          onMouseUp: Ee,
          onDragLeave: k,
          onTouchEnd: $e,
          onTouchMove: ve,
          onTouchStart: W,
          ref: ge,
          tabIndex: u ? -1 : K,
          type: j,
        },
        fe,
        z,
        {
          children: [
            s,
            re
              ? /* TouchRipple is only needed client-side, x2 boost on the server. */
                /* @__PURE__ */ L(
                  Kb,
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
  (rc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * A ref for imperative actions.
     * It currently only supports `focusVisible()` action.
     */
    action: St,
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
    component: hi,
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
const Eo = rc;
function tv(e) {
  return De('MuiIconButton', e);
}
const nv = qe('MuiIconButton', [
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
  ov = nv,
  rv = ['edge', 'children', 'className', 'color', 'disabled', 'disableFocusRipple', 'size'],
  iv = (e) => {
    const { classes: t, disabled: o, color: r, edge: i, size: a } = e,
      s = {
        root: [
          'root',
          o && 'disabled',
          r !== 'default' && `color${ae(r)}`,
          i && `edge${ae(i)}`,
          `size${ae(a)}`,
        ],
      };
    return Ke(s, tv, t);
  },
  av = he(Eo, {
    name: 'MuiIconButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${ae(o.color)}`],
        o.edge && t[`edge${ae(o.edge)}`],
        t[`size${ae(o.size)}`],
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
          [`&.${ov.disabled}`]: {
            backgroundColor: 'transparent',
            color: (e.vars || e).palette.action.disabled,
          },
        },
      );
    },
  ),
  ic = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
      f = Te(r, rv),
      b = v({}, r, {
        edge: i,
        color: l,
        disabled: c,
        disableFocusRipple: u,
        size: d,
      }),
      g = iv(b);
    return /* @__PURE__ */ L(
      av,
      v(
        {
          className: Oe(g.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: c,
          ref: o,
          ownerState: b,
        },
        f,
        {
          children: a,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ic.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The icon to display.
     */
    children: Wt(n.node, (e) =>
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
const ac = ic,
  sv = Xn(
    /* @__PURE__ */ L('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  ),
  lv = ['components', 'componentsProps', 'slots', 'slotProps'],
  cv = he(Kh, {
    name: 'MuiPopper',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  sc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r;
    const i = Ml(),
      a = Ge({
        props: t,
        name: 'MuiPopper',
      }),
      { components: s, componentsProps: l, slots: c, slotProps: u } = a,
      d = Te(a, lv),
      f = (r = c == null ? void 0 : c.root) != null ? r : s == null ? void 0 : s.Root;
    return /* @__PURE__ */ L(
      cv,
      v(
        {
          direction: i == null ? void 0 : i.direction,
          slots: {
            root: f,
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
  (sc.propTypes = {
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
    popperRef: St,
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
const lc = sc;
function uv(e) {
  return De('MuiListSubheader', e);
}
qe('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const dv = ['className', 'color', 'component', 'disableGutters', 'disableSticky', 'inset'],
  pv = (e) => {
    const { classes: t, color: o, disableGutters: r, inset: i, disableSticky: a } = e,
      s = {
        root: [
          'root',
          o !== 'default' && `color${ae(o)}`,
          !r && 'gutters',
          i && 'inset',
          !a && 'sticky',
        ],
      };
    return Ke(s, uv, t);
  },
  fv = he('li', {
    name: 'MuiListSubheader',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${ae(o.color)}`],
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
  Yi = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
      d = Te(r, dv),
      f = v({}, r, {
        color: a,
        component: s,
        disableGutters: l,
        disableSticky: c,
        inset: u,
      }),
      b = pv(f);
    return /* @__PURE__ */ L(
      fv,
      v(
        {
          as: s,
          className: Oe(b.root, i),
          ref: o,
          ownerState: f,
        },
        d,
      ),
    );
  });
Yi.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (Yi.propTypes = {
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
const mv = Yi,
  hv = Xn(
    /* @__PURE__ */ L('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function bv(e) {
  return De('MuiChip', e);
}
const vv = qe('MuiChip', [
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
  _e = vv,
  gv = [
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
  yv = (e) => {
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
          `size${ae(r)}`,
          `color${ae(i)}`,
          l && 'clickable',
          l && `clickableColor${ae(i)}`,
          s && 'deletable',
          s && `deletableColor${ae(i)}`,
          `${c}${ae(i)}`,
        ],
        label: ['label', `label${ae(r)}`],
        avatar: ['avatar', `avatar${ae(r)}`, `avatarColor${ae(i)}`],
        icon: ['icon', `icon${ae(r)}`, `iconColor${ae(a)}`],
        deleteIcon: [
          'deleteIcon',
          `deleteIcon${ae(r)}`,
          `deleteIconColor${ae(i)}`,
          `deleteIcon${ae(c)}Color${ae(i)}`,
        ],
      };
    return Ke(u, bv, t);
  },
  xv = he('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: i, clickable: a, onDelete: s, size: l, variant: c } = o;
      return [
        {
          [`& .${_e.avatar}`]: t.avatar,
        },
        {
          [`& .${_e.avatar}`]: t[`avatar${ae(l)}`],
        },
        {
          [`& .${_e.avatar}`]: t[`avatarColor${ae(r)}`],
        },
        {
          [`& .${_e.icon}`]: t.icon,
        },
        {
          [`& .${_e.icon}`]: t[`icon${ae(l)}`],
        },
        {
          [`& .${_e.icon}`]: t[`iconColor${ae(i)}`],
        },
        {
          [`& .${_e.deleteIcon}`]: t.deleteIcon,
        },
        {
          [`& .${_e.deleteIcon}`]: t[`deleteIcon${ae(l)}`],
        },
        {
          [`& .${_e.deleteIcon}`]: t[`deleteIconColor${ae(r)}`],
        },
        {
          [`& .${_e.deleteIcon}`]: t[`deleteIcon${ae(c)}Color${ae(r)}`],
        },
        t.root,
        t[`size${ae(l)}`],
        t[`color${ae(r)}`],
        a && t.clickable,
        a && r !== 'default' && t[`clickableColor${ae(r)})`],
        s && t.deletable,
        s && r !== 'default' && t[`deletableColor${ae(r)}`],
        t[c],
        t[`${c}${ae(r)}`],
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
          [`&.${_e.disabled}`]: {
            opacity: (e.vars || e).palette.action.disabledOpacity,
            pointerEvents: 'none',
          },
          [`& .${_e.avatar}`]: {
            marginLeft: 5,
            marginRight: -6,
            width: 24,
            height: 24,
            color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : r,
            fontSize: e.typography.pxToRem(12),
          },
          [`& .${_e.avatarColorPrimary}`]: {
            color: (e.vars || e).palette.primary.contrastText,
            backgroundColor: (e.vars || e).palette.primary.dark,
          },
          [`& .${_e.avatarColorSecondary}`]: {
            color: (e.vars || e).palette.secondary.contrastText,
            backgroundColor: (e.vars || e).palette.secondary.dark,
          },
          [`& .${_e.avatarSmall}`]: {
            marginLeft: 4,
            marginRight: -4,
            width: 18,
            height: 18,
            fontSize: e.typography.pxToRem(10),
          },
          [`& .${_e.icon}`]: v(
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
          [`& .${_e.deleteIcon}`]: v(
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
          [`&.${_e.focusVisible}`]: {
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
            [`&.${_e.focusVisible}`]: {
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
          [`&.${_e.focusVisible}`]: {
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
            [`&:hover, &.${_e.focusVisible}`]: {
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
          [`&.${_e.clickable}:hover`]: {
            backgroundColor: (e.vars || e).palette.action.hover,
          },
          [`&.${_e.focusVisible}`]: {
            backgroundColor: (e.vars || e).palette.action.focus,
          },
          [`& .${_e.avatar}`]: {
            marginLeft: 4,
          },
          [`& .${_e.avatarSmall}`]: {
            marginLeft: 2,
          },
          [`& .${_e.icon}`]: {
            marginLeft: 4,
          },
          [`& .${_e.iconSmall}`]: {
            marginLeft: 2,
          },
          [`& .${_e.deleteIcon}`]: {
            marginRight: 5,
          },
          [`& .${_e.deleteIconSmall}`]: {
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
            [`&.${_e.clickable}:hover`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : et(e.palette[t.color].main, e.palette.action.hoverOpacity),
            },
            [`&.${_e.focusVisible}`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.focusOpacity
                  })`
                : et(e.palette[t.color].main, e.palette.action.focusOpacity),
            },
            [`& .${_e.deleteIcon}`]: {
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
  Ev = he('span', {
    name: 'MuiChip',
    slot: 'Label',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { size: r } = o;
      return [t.label, t[`label${ae(r)}`]];
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
function Ns(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const cc = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
      icon: f,
      label: b,
      onClick: g,
      onDelete: y,
      onKeyDown: h,
      onKeyUp: m,
      size: C = 'medium',
      variant: S = 'filled',
      tabIndex: T,
      skipFocusWhenDisabled: E = !1,
    } = r,
    p = Te(r, gv),
    R = x.useRef(null),
    w = ft(R, o),
    V = (G) => {
      G.stopPropagation(), y && y(G);
    },
    D = (G) => {
      G.currentTarget === G.target && Ns(G) && G.preventDefault(), h && h(G);
    },
    A = (G) => {
      G.currentTarget === G.target &&
        (y && Ns(G) ? y(G) : G.key === 'Escape' && R.current && R.current.blur()),
        m && m(G);
    },
    _ = s !== !1 && g ? !0 : s,
    K = _ || y ? Eo : c || 'div',
    B = v({}, r, {
      component: K,
      disabled: d,
      size: C,
      color: l,
      iconColor: /* @__PURE__ */ (x.isValidElement(f) && f.props.color) || l,
      onDelete: !!y,
      clickable: _,
      variant: S,
    }),
    M = yv(B),
    j =
      K === Eo
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
  let z = null;
  y &&
    (z =
      u && /* @__PURE__ */ x.isValidElement(u)
        ? /* @__PURE__ */ x.cloneElement(u, {
            className: Oe(u.props.className, M.deleteIcon),
            onClick: V,
          })
        : /* @__PURE__ */ L(hv, {
            className: Oe(M.deleteIcon),
            onClick: V,
          }));
  let le = null;
  i &&
    /* @__PURE__ */ x.isValidElement(i) &&
    (le = /* @__PURE__ */ x.cloneElement(i, {
      className: Oe(M.avatar, i.props.className),
    }));
  let ie = null;
  return (
    f &&
      /* @__PURE__ */ x.isValidElement(f) &&
      (ie = /* @__PURE__ */ x.cloneElement(f, {
        className: Oe(M.icon, f.props.className),
      })),
    process.env.NODE_ENV !== 'production' &&
      le &&
      ie &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    /* @__PURE__ */ Qe(
      xv,
      v(
        {
          as: K,
          className: Oe(M.root, a),
          disabled: _ && d ? !0 : void 0,
          onClick: g,
          onKeyDown: D,
          onKeyUp: A,
          ref: w,
          tabIndex: E && d ? -1 : T,
          ownerState: B,
        },
        j,
        p,
        {
          children: [
            le || ie,
            /* @__PURE__ */ L(Ev, {
              className: Oe(M.label),
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
  (cc.propTypes = {
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
    children: qu,
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
const Ov = cc;
function Jn({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, i) => ((r[i] = e[i]), o && typeof e[i] > 'u' && (r[i] = o[i]), r), {});
}
const uc = /* @__PURE__ */ x.createContext(void 0);
process.env.NODE_ENV !== 'production' && (uc.displayName = 'FormControlContext');
const Ki = uc;
function Pn() {
  return x.useContext(Ki);
}
function dc(e) {
  return /* @__PURE__ */ L(
    $l,
    v({}, e, {
      defaultTheme: Er,
    }),
  );
}
process.env.NODE_ENV !== 'production' &&
  (dc.propTypes = {
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
function ks(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function Gi(e, t = !1) {
  return (
    e && ((ks(e.value) && e.value !== '') || (t && ks(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Tv(e) {
  return e.startAdornment;
}
function Cv(e) {
  return De('MuiInputBase', e);
}
const Sv = qe('MuiInputBase', [
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
  Rt = Sv,
  Rv = [
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
  wr = (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      o.formControl && t.formControl,
      o.startAdornment && t.adornedStart,
      o.endAdornment && t.adornedEnd,
      o.error && t.error,
      o.size === 'small' && t.sizeSmall,
      o.multiline && t.multiline,
      o.color && t[`color${ae(o.color)}`],
      o.fullWidth && t.fullWidth,
      o.hiddenLabel && t.hiddenLabel,
    ];
  },
  $r = (e, t) => {
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
  wv = (e) => {
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
        readOnly: f,
        size: b,
        startAdornment: g,
        type: y,
      } = e,
      h = {
        root: [
          'root',
          `color${ae(o)}`,
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
          f && 'readOnly',
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
          f && 'readOnly',
        ],
      };
    return Ke(h, Cv, t);
  },
  Pr = he('div', {
    name: 'MuiInputBase',
    slot: 'Root',
    overridesResolver: wr,
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
        [`&.${Rt.disabled}`]: {
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
  Nr = he('input', {
    name: 'MuiInputBase',
    slot: 'Input',
    overridesResolver: $r,
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
  $v = /* @__PURE__ */ L(dc, {
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
  pc = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        defaultValue: f,
        disabled: b,
        disableInjectingGlobalStyles: g,
        endAdornment: y,
        fullWidth: h = !1,
        id: m,
        inputComponent: C = 'input',
        inputProps: S = {},
        inputRef: T,
        maxRows: E,
        minRows: p,
        multiline: R = !1,
        name: w,
        onBlur: V,
        onChange: D,
        onClick: A,
        onFocus: _,
        onKeyDown: K,
        onKeyUp: B,
        placeholder: M,
        readOnly: j,
        renderSuffix: z,
        rows: le,
        slotProps: ie = {},
        slots: G = {},
        startAdornment: $,
        type: F = 'text',
        value: X,
      } = i,
      H = Te(i, Rv),
      U = S.value != null ? S.value : X,
      { current: te } = x.useRef(U != null),
      ne = x.useRef(),
      J = x.useCallback((pe) => {
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
      re = ft(ne, T, S.ref, J),
      [se, me] = x.useState(!1),
      oe = Pn();
    process.env.NODE_ENV !== 'production' &&
      x.useEffect(() => {
        if (oe) return oe.registerEffect();
      }, [oe]);
    const k = Jn({
      props: i,
      muiFormControl: oe,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (k.focused = oe ? oe.focused : se),
      x.useEffect(() => {
        !oe && b && se && (me(!1), V && V());
      }, [oe, b, se, V]);
    const Ee = oe && oe.onFilled,
      I = oe && oe.onEmpty,
      W = x.useCallback(
        (pe) => {
          Gi(pe) ? Ee && Ee() : I && I();
        },
        [Ee, I],
      );
    ln(() => {
      te &&
        W({
          value: U,
        });
    }, [U, W, te]);
    const $e = (pe) => {
        if (k.disabled) {
          pe.stopPropagation();
          return;
        }
        _ && _(pe), S.onFocus && S.onFocus(pe), oe && oe.onFocus ? oe.onFocus(pe) : me(!0);
      },
      ve = (pe) => {
        V && V(pe), S.onBlur && S.onBlur(pe), oe && oe.onBlur ? oe.onBlur(pe) : me(!1);
      },
      Xe = (pe, ...ue) => {
        if (!te) {
          const Q = pe.target || ne.current;
          if (Q == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : bn(1),
            );
          W({
            value: Q.value,
          });
        }
        S.onChange && S.onChange(pe, ...ue), D && D(pe, ...ue);
      };
    x.useEffect(() => {
      W(ne.current);
    }, []);
    const Me = (pe) => {
      ne.current && pe.currentTarget === pe.target && ne.current.focus(), A && A(pe);
    };
    let Ce = C,
      Re = S;
    R &&
      Ce === 'input' &&
      (le
        ? (process.env.NODE_ENV !== 'production' &&
            (p || E) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (Re = v(
            {
              type: void 0,
              minRows: le,
              maxRows: le,
            },
            Re,
          )))
        : (Re = v(
            {
              type: void 0,
              maxRows: E,
              minRows: p,
            },
            Re,
          )),
      (Ce = bb));
    const Je = (pe) => {
      W(
        pe.animationName === 'mui-auto-fill-cancel'
          ? ne.current
          : {
              value: 'x',
            },
      );
    };
    x.useEffect(() => {
      oe && oe.setAdornedStart(!!$);
    }, [oe, $]);
    const ot = v({}, i, {
        color: k.color || 'primary',
        disabled: k.disabled,
        endAdornment: y,
        error: k.error,
        focused: k.focused,
        formControl: oe,
        fullWidth: h,
        hiddenLabel: k.hiddenLabel,
        multiline: R,
        size: k.size,
        startAdornment: $,
        type: F,
      }),
      Z = wv(ot),
      fe = G.root || u.Root || Pr,
      ge = ie.root || d.root || {},
      be = G.input || u.Input || Nr;
    return (
      (Re = v({}, Re, (r = ie.input) != null ? r : d.input)),
      /* @__PURE__ */ Qe(x.Fragment, {
        children: [
          !g && $v,
          /* @__PURE__ */ Qe(
            fe,
            v(
              {},
              ge,
              !hn(fe) && {
                ownerState: v({}, ot, ge.ownerState),
              },
              {
                ref: o,
                onClick: Me,
              },
              H,
              {
                className: Oe(Z.root, ge.className, c, j && 'MuiInputBase-readOnly'),
                children: [
                  $,
                  /* @__PURE__ */ L(Ki.Provider, {
                    value: null,
                    children: /* @__PURE__ */ L(
                      be,
                      v(
                        {
                          ownerState: ot,
                          'aria-invalid': k.error,
                          'aria-describedby': a,
                          autoComplete: s,
                          autoFocus: l,
                          defaultValue: f,
                          disabled: k.disabled,
                          id: m,
                          onAnimationStart: Je,
                          name: w,
                          placeholder: M,
                          readOnly: j,
                          required: k.required,
                          rows: le,
                          value: U,
                          onKeyDown: K,
                          onKeyUp: B,
                          type: F,
                        },
                        Re,
                        !hn(be) && {
                          as: Ce,
                          ownerState: v({}, ot, Re.ownerState),
                        },
                        {
                          ref: re,
                          className: Oe(Z.input, Re.className, j && 'MuiInputBase-readOnly'),
                          onBlur: ve,
                          onChange: Xe,
                          onFocus: $e,
                        },
                      ),
                    ),
                  }),
                  y,
                  z
                    ? z(
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
  (pc.propTypes = {
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
    inputComponent: hi,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * @default {}
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: St,
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
const Xi = pc;
function Pv(e) {
  return De('MuiInput', e);
}
const Nv = v({}, Rt, qe('MuiInput', ['root', 'underline', 'input'])),
  fn = Nv;
function kv(e) {
  return De('MuiOutlinedInput', e);
}
const Iv = v({}, Rt, qe('MuiOutlinedInput', ['root', 'notchedOutline', 'input'])),
  Kt = Iv;
function _v(e) {
  return De('MuiFilledInput', e);
}
const Mv = v({}, Rt, qe('MuiFilledInput', ['root', 'underline', 'input'])),
  wt = Mv,
  fc = Xn(
    /* @__PURE__ */ L('path', {
      d: 'M7 10l5 5 5-5z',
    }),
    'ArrowDropDown',
  );
function Av(e) {
  return De('MuiAutocomplete', e);
}
const Dv = qe('MuiAutocomplete', [
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
  Pe = Dv;
var Is, _s;
const Lv = [
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
  Fv = (e) => {
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
      f = {
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
        tag: ['tag', `tagSize${ae(d)}`],
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
    return Ke(f, Av, t);
  },
  jv = he('div', {
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
          [`& .${Pe.tag}`]: t[`tagSize${ae(l)}`],
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
        [`& .${fn.root}.${Rt.sizeSmall}`]: {
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
        [`& .${Kt.root}.${Rt.sizeSmall}`]: {
          // Don't specify paddingRight, as it overrides the default value set when there is only
          // one of the popup or clear icon as the specificity is equal so the latter one wins
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 6,
          [`& .${Pe.input}`]: {
            padding: '2.5px 4px 2.5px 6px',
          },
        },
        [`& .${wt.root}`]: {
          paddingTop: 19,
          paddingLeft: 8,
          [`.${Pe.hasPopupIcon}&, .${Pe.hasClearIcon}&`]: {
            paddingRight: 26 + 4 + 9,
          },
          [`.${Pe.hasPopupIcon}.${Pe.hasClearIcon}&`]: {
            paddingRight: 52 + 4 + 9,
          },
          [`& .${wt.input}`]: {
            padding: '7px 4px',
          },
          [`& .${Pe.endAdornment}`]: {
            right: 9,
          },
        },
        [`& .${wt.root}.${Rt.sizeSmall}`]: {
          paddingBottom: 1,
          [`& .${wt.input}`]: {
            padding: '2.5px 4px',
          },
        },
        [`& .${Rt.hiddenLabel}`]: {
          paddingTop: 8,
        },
        [`& .${wt.root}.${Rt.hiddenLabel}`]: {
          paddingTop: 0,
          paddingBottom: 0,
          [`& .${Pe.input}`]: {
            paddingTop: 16,
            paddingBottom: 17,
          },
        },
        [`& .${wt.root}.${Rt.hiddenLabel}.${Rt.sizeSmall}`]: {
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
  Vv = he('div', {
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
  zv = he(ac, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({
    marginRight: -2,
    padding: 4,
    visibility: 'hidden',
  }),
  Bv = he(ac, {
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
  Uv = he(lc, {
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
  Wv = he(Sr, {
    name: 'MuiAutocomplete',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })(({ theme: e }) =>
    v({}, e.typography.body1, {
      overflow: 'auto',
    }),
  ),
  Hv = he('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  qv = he('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  Yv = he('div', {
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
  Kv = he(mv, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({
    backgroundColor: (e.vars || e).palette.background.paper,
    top: -8,
  })),
  Gv = he('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({
    padding: 0,
    [`& .${Pe.option}`]: {
      paddingLeft: 24,
    },
  }),
  mc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ge({
        props: t,
        name: 'MuiAutocomplete',
      }),
      {
        autoComplete: c = !1,
        autoHighlight: u = !1,
        autoSelect: d = !1,
        blurOnSelect: f = !1,
        ChipProps: b,
        className: g,
        clearIcon: y = Is ||
          (Is = /* @__PURE__ */ L(sv, {
            fontSize: 'small',
          })),
        clearOnBlur: h = !l.freeSolo,
        clearOnEscape: m = !1,
        clearText: C = 'Clear',
        closeText: S = 'Close',
        componentsProps: T = {},
        defaultValue: E = l.multiple ? [] : null,
        disableClearable: p = !1,
        disableCloseOnSelect: R = !1,
        disabled: w = !1,
        disabledItemsFocusable: V = !1,
        disableListWrap: D = !1,
        disablePortal: A = !1,
        filterSelectedOptions: _ = !1,
        forcePopupIcon: K = 'auto',
        freeSolo: B = !1,
        fullWidth: M = !1,
        getLimitTagsText: j = (ke) => `+${ke}`,
        getOptionLabel: z = (ke) => {
          var st;
          return (st = ke.label) != null ? st : ke;
        },
        groupBy: le,
        handleHomeEndKeys: ie = !l.freeSolo,
        includeInputInList: G = !1,
        limitTags: $ = -1,
        ListboxComponent: F = 'ul',
        ListboxProps: X,
        loading: H = !1,
        loadingText: U = 'Loading…',
        multiple: te = !1,
        noOptionsText: ne = 'No options',
        openOnFocus: J = !1,
        openText: re = 'Open',
        PaperComponent: se = Sr,
        PopperComponent: me = lc,
        popupIcon: oe = _s || (_s = /* @__PURE__ */ L(fc, {})),
        readOnly: k = !1,
        renderGroup: Ee,
        renderInput: I,
        renderOption: W,
        renderTags: $e,
        selectOnFocus: ve = !l.freeSolo,
        size: Xe = 'medium',
        slotProps: Me = {},
      } = l,
      Ce = Te(l, Lv),
      {
        getRootProps: Re,
        getInputProps: Je,
        getInputLabelProps: ot,
        getPopupIndicatorProps: Z,
        getClearProps: fe,
        getTagProps: ge,
        getListboxProps: be,
        getOptionProps: pe,
        value: ue,
        dirty: Q,
        expanded: ye,
        id: xe,
        popupOpen: Ne,
        focused: rt,
        focusedTag: ct,
        anchorEl: xt,
        setAnchorEl: un,
        inputValue: Et,
        groupedOptions: mt,
      } = xb(
        v({}, l, {
          componentName: 'Autocomplete',
        }),
      ),
      vt = !p && !w && Q && !k,
      ut = (!B || K === !0) && K !== !1,
      Ze = v({}, l, {
        disablePortal: A,
        expanded: ye,
        focused: rt,
        fullWidth: M,
        hasClearIcon: vt,
        hasPopupIcon: ut,
        inputFocused: ct === -1,
        popupOpen: Ne,
        size: Xe,
      }),
      tt = Fv(Ze);
    let dt;
    if (te && ue.length > 0) {
      const ke = (st) =>
        v(
          {
            className: tt.tag,
            disabled: w,
          },
          ge(st),
        );
      $e
        ? (dt = $e(ue, ke, Ze))
        : (dt = ue.map((st, It) =>
            /* @__PURE__ */ L(
              Ov,
              v(
                {
                  label: z(st),
                  size: Xe,
                },
                ke({
                  index: It,
                }),
                b,
              ),
            ),
          ));
    }
    if ($ > -1 && Array.isArray(dt)) {
      const ke = dt.length - $;
      !rt &&
        ke > 0 &&
        ((dt = dt.splice(0, $)),
        dt.push(
          /* @__PURE__ */ L(
            'span',
            {
              className: tt.tag,
              children: j(ke),
            },
            dt.length,
          ),
        ));
    }
    const qt =
        Ee ||
        ((ke) =>
          /* @__PURE__ */ Qe(
            'li',
            {
              children: [
                /* @__PURE__ */ L(Kv, {
                  className: tt.groupLabel,
                  ownerState: Ze,
                  component: 'div',
                  children: ke.group,
                }),
                /* @__PURE__ */ L(Gv, {
                  className: tt.groupUl,
                  ownerState: Ze,
                  children: ke.children,
                }),
              ],
            },
            ke.key,
          )),
      Ft =
        W ||
        ((ke, st) =>
          /* @__PURE__ */ L(
            'li',
            v({}, ke, {
              children: z(st),
            }),
          )),
      nn = (ke, st) => {
        const It = pe({
          option: ke,
          index: st,
        });
        return Ft(
          v({}, It, {
            className: tt.option,
          }),
          ke,
          {
            selected: It['aria-selected'],
            index: st,
            inputValue: Et,
          },
        );
      },
      on = (r = Me.clearIndicator) != null ? r : T.clearIndicator,
      rn = (i = Me.paper) != null ? i : T.paper,
      Yt = (a = Me.popper) != null ? a : T.popper,
      an = (s = Me.popupIndicator) != null ? s : T.popupIndicator;
    return /* @__PURE__ */ Qe(x.Fragment, {
      children: [
        /* @__PURE__ */ L(
          jv,
          v(
            {
              ref: o,
              className: Oe(tt.root, g),
              ownerState: Ze,
            },
            Re(Ce),
            {
              children: I({
                id: xe,
                disabled: w,
                fullWidth: !0,
                size: Xe === 'small' ? 'small' : void 0,
                InputLabelProps: ot(),
                InputProps: v(
                  {
                    ref: un,
                    className: tt.inputRoot,
                    startAdornment: dt,
                  },
                  (vt || ut) && {
                    endAdornment: /* @__PURE__ */ Qe(Vv, {
                      className: tt.endAdornment,
                      ownerState: Ze,
                      children: [
                        vt
                          ? /* @__PURE__ */ L(
                              zv,
                              v(
                                {},
                                fe(),
                                {
                                  'aria-label': C,
                                  title: C,
                                  ownerState: Ze,
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
                        ut
                          ? /* @__PURE__ */ L(
                              Bv,
                              v(
                                {},
                                Z(),
                                {
                                  disabled: w,
                                  'aria-label': Ne ? S : re,
                                  title: Ne ? S : re,
                                  ownerState: Ze,
                                },
                                an,
                                {
                                  className: Oe(
                                    tt.popupIndicator,
                                    an == null ? void 0 : an.className,
                                  ),
                                  children: oe,
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
                  Je(),
                ),
              }),
            },
          ),
        ),
        xt
          ? /* @__PURE__ */ L(
              Uv,
              v(
                {
                  as: me,
                  disablePortal: A,
                  style: {
                    width: xt ? xt.clientWidth : null,
                  },
                  ownerState: Ze,
                  role: 'presentation',
                  anchorEl: xt,
                  open: Ne,
                },
                Yt,
                {
                  className: Oe(tt.popper, Yt == null ? void 0 : Yt.className),
                  children: /* @__PURE__ */ Qe(
                    Wv,
                    v(
                      {
                        ownerState: Ze,
                        as: se,
                      },
                      rn,
                      {
                        className: Oe(tt.paper, rn == null ? void 0 : rn.className),
                        children: [
                          H && mt.length === 0
                            ? /* @__PURE__ */ L(Hv, {
                                className: tt.loading,
                                ownerState: Ze,
                                children: U,
                              })
                            : null,
                          mt.length === 0 && !B && !H
                            ? /* @__PURE__ */ L(qv, {
                                className: tt.noOptions,
                                ownerState: Ze,
                                role: 'presentation',
                                onMouseDown: (ke) => {
                                  ke.preventDefault();
                                },
                                children: ne,
                              })
                            : null,
                          mt.length > 0
                            ? /* @__PURE__ */ L(
                                Yv,
                                v(
                                  {
                                    as: F,
                                    className: tt.listbox,
                                    ownerState: Ze,
                                  },
                                  be(),
                                  X,
                                  {
                                    children: mt.map((ke, st) =>
                                      le
                                        ? qt({
                                            key: ke.key,
                                            group: ke.group,
                                            children: ke.options.map((It, O) =>
                                              nn(It, ke.index + O),
                                            ),
                                          })
                                        : nn(ke, st),
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
  (mc.propTypes = {
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
    limitTags: bi,
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
const Xv = mc,
  Jv = [
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
  Zv = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
  },
  hc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = $o(),
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
        onEntered: f,
        onEntering: b,
        onExit: g,
        onExited: y,
        onExiting: h,
        style: m,
        timeout: C = i,
        // eslint-disable-next-line react/prop-types
        TransitionComponent: S = Ql,
      } = t,
      T = Te(t, Jv),
      E = x.useRef(null),
      p = ft(E, l.ref, o),
      R = (M) => (j) => {
        if (M) {
          const z = E.current;
          j === void 0 ? M(z) : M(z, j);
        }
      },
      w = R(b),
      V = R((M, j) => {
        ec(M);
        const z = rr(
          {
            style: m,
            timeout: C,
            easing: c,
          },
          {
            mode: 'enter',
          },
        );
        (M.style.webkitTransition = r.transitions.create('opacity', z)),
          (M.style.transition = r.transitions.create('opacity', z)),
          d && d(M, j);
      }),
      D = R(f),
      A = R(h),
      _ = R((M) => {
        const j = rr(
          {
            style: m,
            timeout: C,
            easing: c,
          },
          {
            mode: 'exit',
          },
        );
        (M.style.webkitTransition = r.transitions.create('opacity', j)),
          (M.style.transition = r.transitions.create('opacity', j)),
          g && g(M);
      }),
      K = R(y);
    return /* @__PURE__ */ L(
      S,
      v(
        {
          appear: s,
          in: u,
          nodeRef: E,
          onEnter: V,
          onEntered: D,
          onEntering: w,
          onExit: _,
          onExited: K,
          onExiting: A,
          addEndListener: (M) => {
            a && a(E.current, M);
          },
          timeout: C,
        },
        T,
        {
          children: (M, j) =>
            /* @__PURE__ */ x.cloneElement(
              l,
              v(
                {
                  style: v(
                    {
                      opacity: 0,
                      visibility: M === 'exited' && !u ? 'hidden' : void 0,
                    },
                    Zv[M],
                    m,
                    l.props.style,
                  ),
                  ref: p,
                },
                j,
              ),
            ),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (hc.propTypes = {
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
    children: To.isRequired,
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
const Qv = hc;
function eg(e) {
  return De('MuiBackdrop', e);
}
qe('MuiBackdrop', ['root', 'invisible']);
const tg = [
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
  ng = (e) => {
    const { classes: t, invisible: o } = e;
    return Ke(
      {
        root: ['root', o && 'invisible'],
      },
      eg,
      t,
    );
  },
  og = he('div', {
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
  bc = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        componentsProps: f = {},
        invisible: b = !1,
        open: g,
        slotProps: y = {},
        slots: h = {},
        TransitionComponent: m = Qv,
        transitionDuration: C,
      } = s,
      S = Te(s, tg),
      T = v({}, s, {
        component: u,
        invisible: b,
      }),
      E = ng(T),
      p = (r = y.root) != null ? r : f.root;
    return /* @__PURE__ */ L(
      m,
      v(
        {
          in: g,
          timeout: C,
        },
        S,
        {
          children: /* @__PURE__ */ L(
            og,
            v(
              {
                'aria-hidden': !0,
              },
              p,
              {
                as: (i = (a = h.root) != null ? a : d.Root) != null ? i : u,
                className: Oe(E.root, c, p == null ? void 0 : p.className),
                ownerState: v({}, T, p == null ? void 0 : p.ownerState),
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
const rg = bc;
function ig(e) {
  return De('MuiButton', e);
}
const ag = qe('MuiButton', [
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
  jo = ag,
  vc = /* @__PURE__ */ x.createContext({});
process.env.NODE_ENV !== 'production' && (vc.displayName = 'ButtonGroupContext');
const sg = vc,
  lg = [
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
  cg = (e) => {
    const { color: t, disableElevation: o, fullWidth: r, size: i, variant: a, classes: s } = e,
      l = {
        root: [
          'root',
          a,
          `${a}${ae(t)}`,
          `size${ae(i)}`,
          `${a}Size${ae(i)}`,
          t === 'inherit' && 'colorInherit',
          o && 'disableElevation',
          r && 'fullWidth',
        ],
        label: ['label'],
        startIcon: ['startIcon', `iconSize${ae(i)}`],
        endIcon: ['endIcon', `iconSize${ae(i)}`],
      },
      c = Ke(l, ig, s);
    return v({}, s, c);
  },
  gc = (e) =>
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
  ug = he(Eo, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[o.variant],
        t[`${o.variant}${ae(o.color)}`],
        t[`size${ae(o.size)}`],
        t[`${o.variant}Size${ae(o.size)}`],
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
          [`&.${jo.focusVisible}`]: v(
            {},
            t.variant === 'contained' && {
              boxShadow: (e.vars || e).shadows[6],
            },
          ),
          [`&.${jo.disabled}`]: v(
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
        [`&.${jo.focusVisible}`]: {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        [`&.${jo.disabled}`]: {
          boxShadow: 'none',
        },
      },
  ),
  dg = he('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${ae(o.size)}`]];
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
      gc(e),
    ),
  ),
  pg = he('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${ae(o.size)}`]];
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
      gc(e),
    ),
  ),
  yc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = x.useContext(sg),
      i = gi(r, t),
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
        disableElevation: f = !1,
        disableFocusRipple: b = !1,
        endIcon: g,
        focusVisibleClassName: y,
        fullWidth: h = !1,
        size: m = 'medium',
        startIcon: C,
        type: S,
        variant: T = 'text',
      } = a,
      E = Te(a, lg),
      p = v({}, a, {
        color: l,
        component: c,
        disabled: d,
        disableElevation: f,
        disableFocusRipple: b,
        fullWidth: h,
        size: m,
        type: S,
        variant: T,
      }),
      R = cg(p),
      w =
        C &&
        /* @__PURE__ */ L(dg, {
          className: R.startIcon,
          ownerState: p,
          children: C,
        }),
      V =
        g &&
        /* @__PURE__ */ L(pg, {
          className: R.endIcon,
          ownerState: p,
          children: g,
        });
    return /* @__PURE__ */ Qe(
      ug,
      v(
        {
          ownerState: p,
          className: Oe(r.className, R.root, u),
          component: c,
          disabled: d,
          focusRipple: !b,
          focusVisibleClassName: Oe(R.focusVisible, y),
          ref: o,
          type: S,
        },
        E,
        {
          classes: R,
          children: [w, s, V],
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
const fg = yc;
function mg(e) {
  return De('PrivateSwitchBase', e);
}
qe('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const hg = [
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
  bg = (e) => {
    const { classes: t, checked: o, disabled: r, edge: i } = e,
      a = {
        root: ['root', o && 'checked', r && 'disabled', i && `edge${ae(i)}`],
        input: ['input'],
      };
    return Ke(a, mg, t);
  },
  vg = he(Eo)(({ ownerState: e }) =>
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
  gg = he('input')({
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
  xc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const {
        autoFocus: r,
        checked: i,
        checkedIcon: a,
        className: s,
        defaultChecked: l,
        disabled: c,
        disableFocusRipple: u = !1,
        edge: d = !1,
        icon: f,
        id: b,
        inputProps: g,
        inputRef: y,
        name: h,
        onBlur: m,
        onChange: C,
        onFocus: S,
        readOnly: T,
        required: E = !1,
        tabIndex: p,
        type: R,
        value: w,
      } = t,
      V = Te(t, hg),
      [D, A] = Cn({
        controlled: i,
        default: !!l,
        name: 'SwitchBase',
        state: 'checked',
      }),
      _ = Pn(),
      K = (G) => {
        S && S(G), _ && _.onFocus && _.onFocus(G);
      },
      B = (G) => {
        m && m(G), _ && _.onBlur && _.onBlur(G);
      },
      M = (G) => {
        if (G.nativeEvent.defaultPrevented) return;
        const $ = G.target.checked;
        A($), C && C(G, $);
      };
    let j = c;
    _ && typeof j > 'u' && (j = _.disabled);
    const z = R === 'checkbox' || R === 'radio',
      le = v({}, t, {
        checked: D,
        disabled: j,
        disableFocusRipple: u,
        edge: d,
      }),
      ie = bg(le);
    return /* @__PURE__ */ Qe(
      vg,
      v(
        {
          component: 'span',
          className: Oe(ie.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: j,
          tabIndex: null,
          role: void 0,
          onFocus: K,
          onBlur: B,
          ownerState: le,
          ref: o,
        },
        V,
        {
          children: [
            /* @__PURE__ */ L(
              gg,
              v(
                {
                  autoFocus: r,
                  checked: i,
                  defaultChecked: l,
                  className: ie.input,
                  disabled: j,
                  id: z ? b : void 0,
                  name: h,
                  onChange: M,
                  readOnly: T,
                  ref: y,
                  required: E,
                  ownerState: le,
                  tabIndex: p,
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
            D ? a : f,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (xc.propTypes = {
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
    inputRef: St,
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
const Ec = xc,
  yg = Xn(
    /* @__PURE__ */ L('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  xg = Xn(
    /* @__PURE__ */ L('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  Eg = Xn(
    /* @__PURE__ */ L('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function Og(e) {
  return De('MuiCheckbox', e);
}
const Tg = qe('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  Hr = Tg,
  Cg = [
    'checkedIcon',
    'color',
    'icon',
    'indeterminate',
    'indeterminateIcon',
    'inputProps',
    'size',
    'className',
  ],
  Sg = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      i = {
        root: ['root', o && 'indeterminate', `color${ae(r)}`],
      },
      a = Ke(i, Og, t);
    return v({}, t, a);
  },
  Rg = he(Ec, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiCheckbox',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.indeterminate && t.indeterminate,
        o.color !== 'default' && t[`color${ae(o.color)}`],
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
        [`&.${Hr.checked}, &.${Hr.indeterminate}`]: {
          color: (e.vars || e).palette[t.color].main,
        },
        [`&.${Hr.disabled}`]: {
          color: (e.vars || e).palette.action.disabled,
        },
      },
    ),
  ),
  wg = /* @__PURE__ */ L(xg, {}),
  $g = /* @__PURE__ */ L(yg, {}),
  Pg = /* @__PURE__ */ L(Eg, {}),
  Oc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, i;
    const a = Ge({
        props: t,
        name: 'MuiCheckbox',
      }),
      {
        checkedIcon: s = wg,
        color: l = 'primary',
        icon: c = $g,
        indeterminate: u = !1,
        indeterminateIcon: d = Pg,
        inputProps: f,
        size: b = 'medium',
        className: g,
      } = a,
      y = Te(a, Cg),
      h = u ? d : c,
      m = u ? d : s,
      C = v({}, a, {
        color: l,
        indeterminate: u,
        size: b,
      }),
      S = Sg(C);
    return /* @__PURE__ */ L(
      Rg,
      v(
        {
          type: 'checkbox',
          inputProps: v(
            {
              'data-indeterminate': u,
            },
            f,
          ),
          icon: /* @__PURE__ */ x.cloneElement(h, {
            fontSize: (r = h.props.fontSize) != null ? r : b,
          }),
          checkedIcon: /* @__PURE__ */ x.cloneElement(m, {
            fontSize: (i = m.props.fontSize) != null ? i : b,
          }),
          ownerState: C,
          ref: o,
          className: Oe(S.root, g),
        },
        y,
        {
          classes: S,
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
    inputRef: St,
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
const Ng = Oc,
  kg = [
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
  Ig = he('div', {
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
  _g = he(rg, {
    name: 'MuiModal',
    slot: 'Backdrop',
    overridesResolver: (e, t) => t.backdrop,
  })({
    zIndex: -1,
  }),
  Tc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, i, a, s, l, c;
    const u = Ge({
        name: 'MuiModal',
        props: t,
      }),
      {
        BackdropComponent: d = _g,
        BackdropProps: f,
        classes: b,
        className: g,
        closeAfterTransition: y = !1,
        children: h,
        component: m,
        components: C = {},
        componentsProps: S = {},
        disableAutoFocus: T = !1,
        disableEnforceFocus: E = !1,
        disableEscapeKeyDown: p = !1,
        disablePortal: R = !1,
        disableRestoreFocus: w = !1,
        disableScrollLock: V = !1,
        hideBackdrop: D = !1,
        keepMounted: A = !1,
        slotProps: _,
        slots: K,
        // eslint-disable-next-line react/prop-types
        theme: B,
      } = u,
      M = Te(u, kg),
      [j, z] = x.useState(!0),
      le = {
        closeAfterTransition: y,
        disableAutoFocus: T,
        disableEnforceFocus: E,
        disableEscapeKeyDown: p,
        disablePortal: R,
        disableRestoreFocus: w,
        disableScrollLock: V,
        hideBackdrop: D,
        keepMounted: A,
      },
      ie = v({}, u, le, {
        exited: j,
      }),
      G = (r = (i = K == null ? void 0 : K.root) != null ? i : C.Root) != null ? r : Ig,
      $ = (a = (s = K == null ? void 0 : K.backdrop) != null ? s : C.Backdrop) != null ? a : d,
      F = (l = _ == null ? void 0 : _.root) != null ? l : S.root,
      X = (c = _ == null ? void 0 : _.backdrop) != null ? c : S.backdrop;
    return /* @__PURE__ */ L(
      ab,
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
                oi(F, ie),
                !hn(G) && {
                  as: m,
                  theme: B,
                },
                {
                  className: Oe(
                    g,
                    F == null ? void 0 : F.className,
                    b == null ? void 0 : b.root,
                    !ie.open && ie.exited && (b == null ? void 0 : b.hidden),
                  ),
                },
              ),
            backdrop: () =>
              v({}, f, oi(X, ie), {
                className: Oe(X == null ? void 0 : X.className, b == null ? void 0 : b.backdrop),
              }),
          },
          onTransitionEnter: () => z(!1),
          onTransitionExited: () => z(!0),
          ref: o,
        },
        M,
        le,
        {
          children: h,
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
    children: To.isRequired,
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
const Mg = Tc,
  Ag = [
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
  Dg = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Ke(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        _v,
        t,
      );
    return v({}, t, i);
  },
  Lg = he(Pr, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...wr(e, t), !o.disableUnderline && t.underline];
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
        [`&.${wt.focused}`]: {
          backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a,
        },
        [`&.${wt.disabled}`]: {
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
        [`&.${wt.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: 'scaleX(1) translateX(0)',
        },
        [`&.${wt.error}`]: {
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
        [`&:hover:not(.${wt.disabled}, .${wt.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
        },
        [`&.${wt.disabled}:before`]: {
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
  Fg = he(Nr, {
    name: 'MuiFilledInput',
    slot: 'Input',
    overridesResolver: $r,
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
  Ji = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        inputComponent: f = 'input',
        multiline: b = !1,
        slotProps: g,
        slots: y = {},
        type: h = 'text',
      } = l,
      m = Te(l, Ag),
      C = v({}, l, {
        fullWidth: d,
        inputComponent: f,
        multiline: b,
        type: h,
      }),
      S = Dg(l),
      T = {
        root: {
          ownerState: C,
        },
        input: {
          ownerState: C,
        },
      },
      E = g ?? u ? Mt(g ?? u, T) : T,
      p = (r = (i = y.root) != null ? i : c.Root) != null ? r : Lg,
      R = (a = (s = y.input) != null ? s : c.Input) != null ? a : Fg;
    return /* @__PURE__ */ L(
      Xi,
      v(
        {
          slots: {
            root: p,
            input: R,
          },
          componentsProps: E,
          fullWidth: d,
          inputComponent: f,
          multiline: b,
          ref: o,
          type: h,
        },
        m,
        {
          classes: S,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ji.propTypes = {
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
    inputRef: St,
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
Ji.muiName = 'Input';
const Cc = Ji;
function jg(e) {
  return De('MuiFormControl', e);
}
qe('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const Vg = [
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
  zg = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      i = {
        root: ['root', o !== 'none' && `margin${ae(o)}`, r && 'fullWidth'],
      };
    return Ke(i, jg, t);
  },
  Bg = he('div', {
    name: 'MuiFormControl',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      v({}, t.root, t[`margin${ae(e.margin)}`], e.fullWidth && t.fullWidth),
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
  Sc = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        fullWidth: f = !1,
        hiddenLabel: b = !1,
        margin: g = 'none',
        required: y = !1,
        size: h = 'medium',
        variant: m = 'outlined',
      } = r,
      C = Te(r, Vg),
      S = v({}, r, {
        color: s,
        component: l,
        disabled: c,
        error: u,
        fullWidth: f,
        hiddenLabel: b,
        margin: g,
        required: y,
        size: h,
        variant: m,
      }),
      T = zg(S),
      [E, p] = x.useState(() => {
        let B = !1;
        return (
          i &&
            x.Children.forEach(i, (M) => {
              if (!Lr(M, ['Input', 'Select'])) return;
              const j = Lr(M, ['Select']) ? M.props.input : M;
              j && Tv(j.props) && (B = !0);
            }),
          B
        );
      }),
      [R, w] = x.useState(() => {
        let B = !1;
        return (
          i &&
            x.Children.forEach(i, (M) => {
              Lr(M, ['Input', 'Select']) && Gi(M.props, !0) && (B = !0);
            }),
          B
        );
      }),
      [V, D] = x.useState(!1);
    c && V && D(!1);
    const A = d !== void 0 && !c ? d : V;
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
    const K = x.useMemo(
      () => ({
        adornedStart: E,
        setAdornedStart: p,
        color: s,
        disabled: c,
        error: u,
        filled: R,
        focused: A,
        fullWidth: f,
        hiddenLabel: b,
        size: h,
        onBlur: () => {
          D(!1);
        },
        onEmpty: () => {
          w(!1);
        },
        onFilled: () => {
          w(!0);
        },
        onFocus: () => {
          D(!0);
        },
        registerEffect: _,
        required: y,
        variant: m,
      }),
      [E, s, c, u, R, A, f, b, _, y, h, m],
    );
    return /* @__PURE__ */ L(Ki.Provider, {
      value: K,
      children: /* @__PURE__ */ L(
        Bg,
        v(
          {
            as: l,
            ownerState: S,
            className: Oe(T.root, a),
            ref: o,
          },
          C,
          {
            children: i,
          },
        ),
      ),
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
const Ug = Sc;
function Wg(e) {
  return De('MuiFormHelperText', e);
}
const Hg = qe('MuiFormHelperText', [
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
  Ms = Hg;
var As;
const qg = [
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
  Yg = (e) => {
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
          r && `size${ae(r)}`,
          o && 'contained',
          l && 'focused',
          s && 'filled',
          c && 'required',
        ],
      };
    return Ke(u, Wg, t);
  },
  Kg = he('p', {
    name: 'MuiFormHelperText',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.size && t[`size${ae(o.size)}`],
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
        [`&.${Ms.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
        },
        [`&.${Ms.error}`]: {
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
  Rc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiFormHelperText',
      }),
      { children: i, className: a, component: s = 'p' } = r,
      l = Te(r, qg),
      c = Pn(),
      u = Jn({
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
      f = Yg(d);
    return /* @__PURE__ */ L(
      Kg,
      v(
        {
          as: s,
          ownerState: d,
          className: Oe(f.root, a),
          ref: o,
        },
        l,
        {
          children:
            i === ' '
              ? // notranslate needed while Google Translate will not fix zero-width space issue
                As ||
                (As = /* @__PURE__ */ L('span', {
                  className: 'notranslate',
                  children: '​',
                }))
              : i,
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
const Gg = Rc;
function Xg(e) {
  return De('MuiFormLabel', e);
}
const Jg = qe('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  mo = Jg,
  Zg = [
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
  Qg = (e) => {
    const { classes: t, color: o, focused: r, disabled: i, error: a, filled: s, required: l } = e,
      c = {
        root: [
          'root',
          `color${ae(o)}`,
          i && 'disabled',
          a && 'error',
          s && 'filled',
          r && 'focused',
          l && 'required',
        ],
        asterisk: ['asterisk', a && 'error'],
      };
    return Ke(c, Xg, t);
  },
  ey = he('label', {
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
        [`&.${mo.focused}`]: {
          color: (e.vars || e).palette[t.color].main,
        },
        [`&.${mo.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
        },
        [`&.${mo.error}`]: {
          color: (e.vars || e).palette.error.main,
        },
      },
    ),
  ),
  ty = he('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({
    [`&.${mo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  wc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiFormLabel',
      }),
      { children: i, className: a, component: s = 'label' } = r,
      l = Te(r, Zg),
      c = Pn(),
      u = Jn({
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
      f = Qg(d);
    return /* @__PURE__ */ Qe(
      ey,
      v(
        {
          as: s,
          ownerState: d,
          className: Oe(f.root, a),
          ref: o,
        },
        l,
        {
          children: [
            i,
            u.required &&
              /* @__PURE__ */ Qe(ty, {
                ownerState: d,
                'aria-hidden': !0,
                className: f.asterisk,
                children: [' ', '*'],
              }),
          ],
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
const $c = wc,
  ny = [
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
function di(e) {
  return `scale(${e}, ${e ** 2})`;
}
const oy = {
    entering: {
      opacity: 1,
      transform: di(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
  },
  qr =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  Zi = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const {
        addEndListener: r,
        appear: i = !0,
        children: a,
        easing: s,
        in: l,
        onEnter: c,
        onEntered: u,
        onEntering: d,
        onExit: f,
        onExited: b,
        onExiting: g,
        style: y,
        timeout: h = 'auto',
        // eslint-disable-next-line react/prop-types
        TransitionComponent: m = Ql,
      } = t,
      C = Te(t, ny),
      S = x.useRef(),
      T = x.useRef(),
      E = $o(),
      p = x.useRef(null),
      R = ft(p, a.ref, o),
      w = (j) => (z) => {
        if (j) {
          const le = p.current;
          z === void 0 ? j(le) : j(le, z);
        }
      },
      V = w(d),
      D = w((j, z) => {
        ec(j);
        const {
          duration: le,
          delay: ie,
          easing: G,
        } = rr(
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
          ? (($ = E.transitions.getAutoHeightDuration(j.clientHeight)), (T.current = $))
          : ($ = le),
          (j.style.transition = [
            E.transitions.create('opacity', {
              duration: $,
              delay: ie,
            }),
            E.transitions.create('transform', {
              duration: qr ? $ : $ * 0.666,
              delay: ie,
              easing: G,
            }),
          ].join(',')),
          c && c(j, z);
      }),
      A = w(u),
      _ = w(g),
      K = w((j) => {
        const {
          duration: z,
          delay: le,
          easing: ie,
        } = rr(
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
          ? ((G = E.transitions.getAutoHeightDuration(j.clientHeight)), (T.current = G))
          : (G = z),
          (j.style.transition = [
            E.transitions.create('opacity', {
              duration: G,
              delay: le,
            }),
            E.transitions.create('transform', {
              duration: qr ? G : G * 0.666,
              delay: qr ? le : le || G * 0.333,
              easing: ie,
            }),
          ].join(',')),
          (j.style.opacity = 0),
          (j.style.transform = di(0.75)),
          f && f(j);
      }),
      B = w(b),
      M = (j) => {
        h === 'auto' && (S.current = setTimeout(j, T.current || 0)), r && r(p.current, j);
      };
    return (
      x.useEffect(
        () => () => {
          clearTimeout(S.current);
        },
        [],
      ),
      /* @__PURE__ */ L(
        m,
        v(
          {
            appear: i,
            in: l,
            nodeRef: p,
            onEnter: D,
            onEntered: A,
            onEntering: V,
            onExit: K,
            onExited: B,
            onExiting: _,
            addEndListener: M,
            timeout: h === 'auto' ? null : h,
          },
          C,
          {
            children: (j, z) =>
              /* @__PURE__ */ x.cloneElement(
                a,
                v(
                  {
                    style: v(
                      {
                        opacity: 0,
                        transform: di(0.75),
                        visibility: j === 'exited' && !l ? 'hidden' : void 0,
                      },
                      oy[j],
                      y,
                      a.props.style,
                    ),
                    ref: R,
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
  (Zi.propTypes = {
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
    children: To.isRequired,
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
Zi.muiSupportAuto = !0;
const ry = Zi,
  iy = [
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
  ay = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = Ke(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Pv,
        t,
      );
    return v({}, t, i);
  },
  sy = he(Pr, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...wr(e, t), !o.disableUnderline && t.underline];
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
  ly = he(Nr, {
    name: 'MuiInput',
    slot: 'Input',
    overridesResolver: $r,
  })({}),
  Qi = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ge({
        props: t,
        name: 'MuiInput',
      }),
      {
        disableUnderline: c,
        components: u = {},
        componentsProps: d,
        fullWidth: f = !1,
        inputComponent: b = 'input',
        multiline: g = !1,
        slotProps: y,
        slots: h = {},
        type: m = 'text',
      } = l,
      C = Te(l, iy),
      S = ay(l),
      E = {
        root: {
          ownerState: {
            disableUnderline: c,
          },
        },
      },
      p = y ?? d ? Mt(y ?? d, E) : E,
      R = (r = (i = h.root) != null ? i : u.Root) != null ? r : sy,
      w = (a = (s = h.input) != null ? s : u.Input) != null ? a : ly;
    return /* @__PURE__ */ L(
      Xi,
      v(
        {
          slots: {
            root: R,
            input: w,
          },
          slotProps: p,
          fullWidth: f,
          inputComponent: b,
          multiline: g,
          ref: o,
          type: m,
        },
        C,
        {
          classes: S,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Qi.propTypes = {
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
    inputRef: St,
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
Qi.muiName = 'Input';
const Pc = Qi;
function cy(e) {
  return De('MuiInputLabel', e);
}
qe('MuiInputLabel', [
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
const uy = ['disableAnimation', 'margin', 'shrink', 'variant', 'className'],
  dy = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: i,
        disableAnimation: a,
        variant: s,
        required: l,
      } = e,
      u = Ke(
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
        cy,
        t,
      );
    return v({}, t, u);
  },
  py = he($c, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${mo.asterisk}`]: t.asterisk,
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
  Nc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = Ge({
        name: 'MuiInputLabel',
        props: t,
      }),
      { disableAnimation: i = !1, shrink: a, className: s } = r,
      l = Te(r, uy),
      c = Pn();
    let u = a;
    typeof u > 'u' && c && (u = c.filled || c.focused || c.adornedStart);
    const d = Jn({
        props: r,
        muiFormControl: c,
        states: ['size', 'variant', 'required'],
      }),
      f = v({}, r, {
        disableAnimation: i,
        formControl: c,
        shrink: u,
        size: d.size,
        variant: d.variant,
        required: d.required,
      }),
      b = dy(f);
    return /* @__PURE__ */ L(
      py,
      v(
        {
          'data-shrink': u,
          ownerState: f,
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
  (Nc.propTypes = {
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
const fy = Nc,
  kc = /* @__PURE__ */ x.createContext({});
process.env.NODE_ENV !== 'production' && (kc.displayName = 'ListContext');
const my = kc;
function hy(e) {
  return De('MuiList', e);
}
qe('MuiList', ['root', 'padding', 'dense', 'subheader']);
const by = ['children', 'className', 'component', 'dense', 'disablePadding', 'subheader'],
  vy = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: i } = e;
    return Ke(
      {
        root: ['root', !o && 'padding', r && 'dense', i && 'subheader'],
      },
      hy,
      t,
    );
  },
  gy = he('ul', {
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
  Ic = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
      d = Te(r, by),
      f = x.useMemo(
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
      g = vy(b);
    return /* @__PURE__ */ L(my.Provider, {
      value: f,
      children: /* @__PURE__ */ Qe(
        gy,
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
  (Ic.propTypes = {
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
const yy = Ic,
  xy = [
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
function Yr(e, t, o) {
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
function _c(e, t) {
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
    if (!l.hasAttribute('tabindex') || !_c(l, a) || c) l = i(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const Mc = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
      variant: f = 'selectedMenu',
    } = t,
    b = Te(t, xy),
    g = x.useRef(null),
    y = x.useRef({
      keys: [],
      repeating: !0,
      previousKeyMatched: !0,
      lastTime: null,
    });
  ln(() => {
    i && g.current.focus();
  }, [i]),
    x.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (T, E) => {
          const p = !g.current.style.width;
          if (T.clientHeight < g.current.clientHeight && p) {
            const R = `${ul(pt(T))}px`;
            (g.current.style[E.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = R),
              (g.current.style.width = `calc(100% + ${R})`);
          }
          return g.current;
        },
      }),
      [],
    );
  const h = (T) => {
      const E = g.current,
        p = T.key,
        R = pt(E).activeElement;
      if (p === 'ArrowDown') T.preventDefault(), ao(E, R, u, c, Yr);
      else if (p === 'ArrowUp') T.preventDefault(), ao(E, R, u, c, Ds);
      else if (p === 'Home') T.preventDefault(), ao(E, null, u, c, Yr);
      else if (p === 'End') T.preventDefault(), ao(E, null, u, c, Ds);
      else if (p.length === 1) {
        const w = y.current,
          V = p.toLowerCase(),
          D = performance.now();
        w.keys.length > 0 &&
          (D - w.lastTime > 500
            ? ((w.keys = []), (w.repeating = !0), (w.previousKeyMatched = !0))
            : w.repeating && V !== w.keys[0] && (w.repeating = !1)),
          (w.lastTime = D),
          w.keys.push(V);
        const A = R && !w.repeating && _c(R, w);
        w.previousKeyMatched && (A || ao(E, R, !1, c, Yr, w))
          ? T.preventDefault()
          : (w.previousKeyMatched = !1);
      }
      d && d(T);
    },
    m = ft(g, o);
  let C = -1;
  x.Children.forEach(s, (T, E) => {
    /* @__PURE__ */ x.isValidElement(T) &&
      (process.env.NODE_ENV !== 'production' &&
        Wi.isFragment(T) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      T.props.disabled || (((f === 'selectedMenu' && T.props.selected) || C === -1) && (C = E)),
      C === E &&
        (T.props.disabled || T.props.muiSkipListHighlight || T.type.muiSkipListHighlight) &&
        ((C += 1), C >= s.length && (C = -1)));
  });
  const S = x.Children.map(s, (T, E) => {
    if (E === C) {
      const p = {};
      return (
        a && (p.autoFocus = !0),
        T.props.tabIndex === void 0 && f === 'selectedMenu' && (p.tabIndex = 0),
        /* @__PURE__ */ x.cloneElement(T, p)
      );
    }
    return T;
  });
  return /* @__PURE__ */ L(
    yy,
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
        children: S,
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
const Ey = Mc;
function Oy(e) {
  return De('MuiPopover', e);
}
qe('MuiPopover', ['root', 'paper']);
const Ty = ['onEntering'],
  Cy = [
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
function Fs(e, t) {
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
function js(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function Yo(e) {
  return typeof e == 'function' ? e() : e;
}
const Sy = (e) => {
    const { classes: t } = e;
    return Ke(
      {
        root: ['root'],
        paper: ['paper'],
      },
      Oy,
      t,
    );
  },
  Ry = he(Mg, {
    name: 'MuiPopover',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  wy = he(Sr, {
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
  Ac = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        container: f,
        elevation: b = 8,
        marginThreshold: g = 16,
        open: y,
        PaperProps: h = {},
        transformOrigin: m = {
          vertical: 'top',
          horizontal: 'left',
        },
        TransitionComponent: C = ry,
        transitionDuration: S = 'auto',
        TransitionProps: { onEntering: T } = {},
      } = r,
      E = Te(r.TransitionProps, Ty),
      p = Te(r, Cy),
      R = x.useRef(),
      w = ft(R, h.ref),
      V = v({}, r, {
        anchorOrigin: s,
        anchorReference: c,
        elevation: b,
        marginThreshold: g,
        PaperProps: h,
        transformOrigin: m,
        TransitionComponent: C,
        transitionDuration: S,
        TransitionProps: E,
      }),
      D = Sy(V),
      A = x.useCallback(() => {
        if (c === 'anchorPosition')
          return (
            process.env.NODE_ENV !== 'production' &&
              (l ||
                console.error(
                  'MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.',
                )),
            l
          );
        const $ = Yo(a),
          F = $ && $.nodeType === 1 ? $ : pt(R.current).body,
          X = F.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'production') {
          const H = F.getBoundingClientRect();
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
          top: X.top + Ls(X, s.vertical),
          left: X.left + Fs(X, s.horizontal),
        };
      }, [a, s.horizontal, s.vertical, l, c]),
      _ = x.useCallback(
        ($) => ({
          vertical: Ls($, m.vertical),
          horizontal: Fs($, m.horizontal),
        }),
        [m.horizontal, m.vertical],
      ),
      K = x.useCallback(
        ($) => {
          const F = {
              width: $.offsetWidth,
              height: $.offsetHeight,
            },
            X = _(F);
          if (c === 'none')
            return {
              top: null,
              left: null,
              transformOrigin: js(X),
            };
          const H = A();
          let U = H.top - X.vertical,
            te = H.left - X.horizontal;
          const ne = U + F.height,
            J = te + F.width,
            re = Rn(Yo(a)),
            se = re.innerHeight - g,
            me = re.innerWidth - g;
          if (U < g) {
            const oe = U - g;
            (U -= oe), (X.vertical += oe);
          } else if (ne > se) {
            const oe = ne - se;
            (U -= oe), (X.vertical += oe);
          }
          if (
            (process.env.NODE_ENV !== 'production' &&
              F.height > se &&
              F.height &&
              se &&
              console.error(
                [
                  'MUI: The popover component is too tall.',
                  `Some part of it can not be seen on the screen (${F.height - se}px).`,
                  'Please consider adding a `max-height` to improve the user-experience.',
                ].join(`
`),
              ),
            te < g)
          ) {
            const oe = te - g;
            (te -= oe), (X.horizontal += oe);
          } else if (J > me) {
            const oe = J - me;
            (te -= oe), (X.horizontal += oe);
          }
          return {
            top: `${Math.round(U)}px`,
            left: `${Math.round(te)}px`,
            transformOrigin: js(X),
          };
        },
        [a, c, A, _, g],
      ),
      [B, M] = x.useState(y),
      j = x.useCallback(() => {
        const $ = R.current;
        if (!$) return;
        const F = K($);
        F.top !== null && ($.style.top = F.top),
          F.left !== null && ($.style.left = F.left),
          ($.style.transformOrigin = F.transformOrigin),
          M(!0);
      }, [K]),
      z = ($, F) => {
        T && T($, F), j();
      },
      le = () => {
        M(!1);
      };
    x.useEffect(() => {
      y && j();
    }),
      x.useImperativeHandle(
        i,
        () =>
          y
            ? {
                updatePosition: () => {
                  j();
                },
              }
            : null,
        [y, j],
      ),
      x.useEffect(() => {
        if (!y) return;
        const $ = sl(() => {
            j();
          }),
          F = Rn(a);
        return (
          F.addEventListener('resize', $),
          () => {
            $.clear(), F.removeEventListener('resize', $);
          }
        );
      }, [a, y, j]);
    let ie = S;
    S === 'auto' && !C.muiSupportAuto && (ie = void 0);
    const G = f || (a ? pt(Yo(a)).body : void 0);
    return /* @__PURE__ */ L(
      Ry,
      v(
        {
          BackdropProps: {
            invisible: !0,
          },
          className: Oe(D.root, d),
          container: G,
          open: y,
          ref: o,
          ownerState: V,
        },
        p,
        {
          children: /* @__PURE__ */ L(
            C,
            v(
              {
                appear: !0,
                in: y,
                onEntering: z,
                onExited: le,
                timeout: ie,
              },
              E,
              {
                children: /* @__PURE__ */ L(
                  wy,
                  v(
                    {
                      elevation: b,
                    },
                    h,
                    {
                      ref: w,
                      className: Oe(D.paper, h.className),
                    },
                    B
                      ? void 0
                      : {
                          style: v({}, h.style, {
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
  (Ac.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * A ref for imperative actions.
     * It currently only supports updatePosition() action.
     */
    action: St,
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the popover.
     */
    anchorEl: Wt(n.oneOfType([Zt, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = Yo(e.anchorEl);
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
    elevation: bi,
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
      component: hi,
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
const $y = Ac;
function Py(e) {
  return De('MuiMenu', e);
}
qe('MuiMenu', ['root', 'paper', 'list']);
const Ny = ['onEntering'],
  ky = [
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
  Iy = {
    vertical: 'top',
    horizontal: 'right',
  },
  _y = {
    vertical: 'top',
    horizontal: 'left',
  },
  My = (e) => {
    const { classes: t } = e;
    return Ke(
      {
        root: ['root'],
        paper: ['paper'],
        list: ['list'],
      },
      Py,
      t,
    );
  },
  Ay = he($y, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Dy = he(Sr, {
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
  Ly = he(Ey, {
    name: 'MuiMenu',
    slot: 'List',
    overridesResolver: (e, t) => t.list,
  })({
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  }),
  Dc = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        PopoverClasses: f,
        transitionDuration: b = 'auto',
        TransitionProps: { onEntering: g } = {},
        variant: y = 'selectedMenu',
      } = r,
      h = Te(r.TransitionProps, Ny),
      m = Te(r, ky),
      C = $o(),
      S = C.direction === 'rtl',
      T = v({}, r, {
        autoFocus: i,
        disableAutoFocusItem: s,
        MenuListProps: l,
        onEntering: g,
        PaperProps: d,
        transitionDuration: b,
        TransitionProps: h,
        variant: y,
      }),
      E = My(T),
      p = i && !s && u,
      R = x.useRef(null),
      w = (A, _) => {
        R.current && R.current.adjustStyleForScrollbar(A, C), g && g(A, _);
      },
      V = (A) => {
        A.key === 'Tab' && (A.preventDefault(), c && c(A, 'tabKeyDown'));
      };
    let D = -1;
    return (
      x.Children.map(a, (A, _) => {
        /* @__PURE__ */ x.isValidElement(A) &&
          (process.env.NODE_ENV !== 'production' &&
            Wi.isFragment(A) &&
            console.error(
              [
                "MUI: The Menu component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join(`
`),
            ),
          A.props.disabled ||
            (((y === 'selectedMenu' && A.props.selected) || D === -1) && (D = _)));
      }),
      /* @__PURE__ */ L(
        Ay,
        v(
          {
            onClose: c,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: S ? 'right' : 'left',
            },
            transformOrigin: S ? Iy : _y,
            PaperProps: v(
              {
                as: Dy,
              },
              d,
              {
                classes: v({}, d.classes, {
                  root: E.paper,
                }),
              },
            ),
            className: E.root,
            open: u,
            ref: o,
            transitionDuration: b,
            TransitionProps: v(
              {
                onEntering: w,
              },
              h,
            ),
            ownerState: T,
          },
          m,
          {
            classes: f,
            children: /* @__PURE__ */ L(
              Ly,
              v(
                {
                  onKeyDown: V,
                  actions: R,
                  autoFocus: i && (D === -1 || s),
                  autoFocusItem: p,
                  variant: y,
                },
                l,
                {
                  className: Oe(E.list, l.className),
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
  (Dc.propTypes = {
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
const Fy = Dc;
function jy(e) {
  return De('MuiNativeSelect', e);
}
const Vy = qe('MuiNativeSelect', [
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
  ea = Vy,
  zy = ['className', 'disabled', 'IconComponent', 'inputRef', 'variant'],
  By = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${ae(o)}`, a && 'iconOpen', r && 'disabled'],
      };
    return Ke(s, jy, t);
  },
  Lc = ({ ownerState: e, theme: t }) =>
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
        [`&.${ea.disabled}`]: {
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
  Uy = he('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: tn,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.select,
        t[o.variant],
        {
          [`&.${ea.multiple}`]: t.multiple,
        },
      ];
    },
  })(Lc),
  Fc = ({ ownerState: e, theme: t }) =>
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
        [`&.${ea.disabled}`]: {
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
  Wy = he('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${ae(o.variant)}`], o.open && t.iconOpen];
    },
  })(Fc),
  jc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const { className: r, disabled: i, IconComponent: a, inputRef: s, variant: l = 'standard' } = t,
      c = Te(t, zy),
      u = v({}, t, {
        disabled: i,
        variant: l,
      }),
      d = By(u);
    return /* @__PURE__ */ Qe(x.Fragment, {
      children: [
        /* @__PURE__ */ L(
          Uy,
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
          : /* @__PURE__ */ L(Wy, {
              as: a,
              ownerState: u,
              className: d.icon,
            }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (jc.propTypes = {
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
    inputRef: St,
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
const Hy = jc;
var Vs;
const qy = ['children', 'classes', 'className', 'label', 'notched'],
  Yy = he('fieldset')({
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
  Ky = he('legend')(({ ownerState: e, theme: t }) =>
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
function Vc(e) {
  const { className: t, label: o, notched: r } = e,
    i = Te(e, qy),
    a = o != null && o !== '',
    s = v({}, e, {
      notched: r,
      withLabel: a,
    });
  return /* @__PURE__ */ L(
    Yy,
    v(
      {
        'aria-hidden': !0,
        className: t,
        ownerState: s,
      },
      i,
      {
        children: /* @__PURE__ */ L(Ky, {
          ownerState: s,
          children: a
            ? /* @__PURE__ */ L('span', {
                children: o,
              })
            : // notranslate needed while Google Translate will not fix zero-width space issue
              Vs ||
              (Vs = /* @__PURE__ */ L('span', {
                className: 'notranslate',
                children: '​',
              })),
        }),
      },
    ),
  );
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
const Gy = [
    'components',
    'fullWidth',
    'inputComponent',
    'label',
    'multiline',
    'notched',
    'slots',
    'type',
  ],
  Xy = (e) => {
    const { classes: t } = e,
      r = Ke(
        {
          root: ['root'],
          notchedOutline: ['notchedOutline'],
          input: ['input'],
        },
        kv,
        t,
      );
    return v({}, t, r);
  },
  Jy = he(Pr, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: wr,
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
  Zy = he(Vc, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  Qy = he(Nr, {
    name: 'MuiOutlinedInput',
    slot: 'Input',
    overridesResolver: $r,
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
  ta = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, i, a, s, l;
    const c = Ge({
        props: t,
        name: 'MuiOutlinedInput',
      }),
      {
        components: u = {},
        fullWidth: d = !1,
        inputComponent: f = 'input',
        label: b,
        multiline: g = !1,
        notched: y,
        slots: h = {},
        type: m = 'text',
      } = c,
      C = Te(c, Gy),
      S = Xy(c),
      T = Pn(),
      E = Jn({
        props: c,
        muiFormControl: T,
        states: ['required'],
      }),
      p = v({}, c, {
        color: E.color || 'primary',
        disabled: E.disabled,
        error: E.error,
        focused: E.focused,
        formControl: T,
        fullWidth: d,
        hiddenLabel: E.hiddenLabel,
        multiline: g,
        size: E.size,
        type: m,
      }),
      R = (r = (i = h.root) != null ? i : u.Root) != null ? r : Jy,
      w = (a = (s = h.input) != null ? s : u.Input) != null ? a : Qy;
    return /* @__PURE__ */ L(
      Xi,
      v(
        {
          slots: {
            root: R,
            input: w,
          },
          renderSuffix: (V) =>
            /* @__PURE__ */ L(Zy, {
              ownerState: p,
              className: S.notchedOutline,
              label:
                b != null && b !== '' && E.required
                  ? l ||
                    (l = /* @__PURE__ */ Qe(x.Fragment, {
                      children: [b, ' ', '*'],
                    }))
                  : b,
              notched: typeof y < 'u' ? y : !!(V.startAdornment || V.filled || V.focused),
            }),
          fullWidth: d,
          inputComponent: f,
          multiline: g,
          ref: o,
          type: m,
        },
        C,
        {
          classes: v({}, S, {
            notchedOutline: null,
          }),
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
    inputRef: St,
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
ta.muiName = 'Input';
const zc = ta;
function e0(e) {
  return De('MuiSelect', e);
}
const t0 = qe('MuiSelect', [
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
  Vo = t0;
var zs;
const n0 = [
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
  o0 = he('div', {
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
  })(Lc, {
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
  r0 = he('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${ae(o.variant)}`], o.open && t.iconOpen];
    },
  })(Fc),
  i0 = he('input', {
    shouldForwardProp: (e) => Di(e) && e !== 'classes',
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
function a0(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const s0 = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${ae(o)}`, a && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return Ke(s, e0, t);
  },
  Bc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const {
        'aria-describedby': r,
        'aria-label': i,
        autoFocus: a,
        autoWidth: s,
        children: l,
        className: c,
        defaultOpen: u,
        defaultValue: d,
        disabled: f,
        displayEmpty: b,
        IconComponent: g,
        inputRef: y,
        labelId: h,
        MenuProps: m = {},
        multiple: C,
        name: S,
        onBlur: T,
        onChange: E,
        onClose: p,
        onFocus: R,
        onOpen: w,
        open: V,
        readOnly: D,
        renderValue: A,
        SelectDisplayProps: _ = {},
        tabIndex: K,
        value: B,
        variant: M = 'standard',
      } = t,
      j = Te(t, n0),
      [z, le] = Cn({
        controlled: B,
        default: d,
        name: 'Select',
      }),
      [ie, G] = Cn({
        controlled: V,
        default: u,
        name: 'Select',
      }),
      $ = x.useRef(null),
      F = x.useRef(null),
      [X, H] = x.useState(null),
      { current: U } = x.useRef(V != null),
      [te, ne] = x.useState(),
      J = ft(o, y),
      re = x.useCallback((Q) => {
        (F.current = Q), Q && H(Q);
      }, []),
      se = X == null ? void 0 : X.parentNode;
    x.useImperativeHandle(
      J,
      () => ({
        focus: () => {
          F.current.focus();
        },
        node: $.current,
        value: z,
      }),
      [z],
    ),
      x.useEffect(() => {
        u && ie && X && !U && (ne(s ? null : se.clientWidth), F.current.focus());
      }, [X, s]),
      x.useEffect(() => {
        a && F.current.focus();
      }, [a]),
      x.useEffect(() => {
        if (!h) return;
        const Q = pt(F.current).getElementById(h);
        if (Q) {
          const ye = () => {
            getSelection().isCollapsed && F.current.focus();
          };
          return (
            Q.addEventListener('click', ye),
            () => {
              Q.removeEventListener('click', ye);
            }
          );
        }
      }, [h]);
    const me = (Q, ye) => {
        Q ? w && w(ye) : p && p(ye), U || (ne(s ? null : se.clientWidth), G(Q));
      },
      oe = (Q) => {
        Q.button === 0 && (Q.preventDefault(), F.current.focus(), me(!0, Q));
      },
      k = (Q) => {
        me(!1, Q);
      },
      Ee = x.Children.toArray(l),
      I = (Q) => {
        const ye = Ee.map((Ne) => Ne.props.value).indexOf(Q.target.value);
        if (ye === -1) return;
        const xe = Ee[ye];
        le(xe.props.value), E && E(Q, xe);
      },
      W = (Q) => (ye) => {
        let xe;
        if (ye.currentTarget.hasAttribute('tabindex')) {
          if (C) {
            xe = Array.isArray(z) ? z.slice() : [];
            const Ne = z.indexOf(Q.props.value);
            Ne === -1 ? xe.push(Q.props.value) : xe.splice(Ne, 1);
          } else xe = Q.props.value;
          if ((Q.props.onClick && Q.props.onClick(ye), z !== xe && (le(xe), E))) {
            const Ne = ye.nativeEvent || ye,
              rt = new Ne.constructor(Ne.type, Ne);
            Object.defineProperty(rt, 'target', {
              writable: !0,
              value: {
                value: xe,
                name: S,
              },
            }),
              E(rt, Q);
          }
          C || me(!1, ye);
        }
      },
      $e = (Q) => {
        D ||
          ([
            ' ',
            'ArrowUp',
            'ArrowDown',
            // The native select doesn't respond to enter on macOS, but it's recommended by
            // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
            'Enter',
          ].indexOf(Q.key) !== -1 &&
            (Q.preventDefault(), me(!0, Q)));
      },
      ve = X !== null && ie,
      Xe = (Q) => {
        !ve &&
          T &&
          (Object.defineProperty(Q, 'target', {
            writable: !0,
            value: {
              value: z,
              name: S,
            },
          }),
          T(Q));
      };
    delete j['aria-invalid'];
    let Me, Ce;
    const Re = [];
    let Je = !1,
      ot = !1;
    (Gi({
      value: z,
    }) ||
      b) &&
      (A ? (Me = A(z)) : (Je = !0));
    const Z = Ee.map((Q) => {
      if (!(/* @__PURE__ */ x.isValidElement(Q))) return null;
      process.env.NODE_ENV !== 'production' &&
        Wi.isFragment(Q) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let ye;
      if (C) {
        if (!Array.isArray(z))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : bn(2),
          );
        (ye = z.some((xe) => Bs(xe, Q.props.value))), ye && Je && Re.push(Q.props.children);
      } else (ye = Bs(z, Q.props.value)), ye && Je && (Ce = Q.props.children);
      return (
        ye && (ot = !0),
        /* @__PURE__ */ x.cloneElement(Q, {
          'aria-selected': ye ? 'true' : 'false',
          onClick: W(Q),
          onKeyUp: (xe) => {
            xe.key === ' ' && xe.preventDefault(), Q.props.onKeyUp && Q.props.onKeyUp(xe);
          },
          role: 'option',
          selected: ye,
          value: void 0,
          // The value is most likely not a valid HTML attribute.
          'data-value': Q.props.value,
          // Instead, we provide it as a data attribute.
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      x.useEffect(() => {
        if (!ot && !C && z !== '') {
          const Q = Ee.map((ye) => ye.props.value);
          console.warn(
            [
              `MUI: You have provided an out-of-range value \`${z}\` for the select ${
                S ? `(name="${S}") ` : ''
              }component.`,
              "Consider providing a value that matches one of the available options or ''.",
              `The available values are ${
                Q.filter((ye) => ye != null)
                  .map((ye) => `\`${ye}\``)
                  .join(', ') || '""'
              }.`,
            ].join(`
`),
          );
        }
      }, [ot, Ee, C, S, z]),
      Je &&
        (C
          ? Re.length === 0
            ? (Me = null)
            : (Me = Re.reduce(
                (Q, ye, xe) => (Q.push(ye), xe < Re.length - 1 && Q.push(', '), Q),
                [],
              ))
          : (Me = Ce));
    let fe = te;
    !s && U && X && (fe = se.clientWidth);
    let ge;
    typeof K < 'u' ? (ge = K) : (ge = f ? null : 0);
    const be = _.id || (S ? `mui-component-select-${S}` : void 0),
      pe = v({}, t, {
        variant: M,
        value: z,
        open: ve,
      }),
      ue = s0(pe);
    return /* @__PURE__ */ Qe(x.Fragment, {
      children: [
        /* @__PURE__ */ L(
          o0,
          v(
            {
              ref: re,
              tabIndex: ge,
              role: 'button',
              'aria-disabled': f ? 'true' : void 0,
              'aria-expanded': ve ? 'true' : 'false',
              'aria-haspopup': 'listbox',
              'aria-label': i,
              'aria-labelledby': [h, be].filter(Boolean).join(' ') || void 0,
              'aria-describedby': r,
              onKeyDown: $e,
              onMouseDown: f || D ? null : oe,
              onBlur: Xe,
              onFocus: R,
            },
            _,
            {
              ownerState: pe,
              className: Oe(_.className, ue.select, c),
              id: be,
              children: a0(Me)
                ? // notranslate needed while Google Translate will not fix zero-width space issue
                  zs ||
                  (zs = /* @__PURE__ */ L('span', {
                    className: 'notranslate',
                    children: '​',
                  }))
                : Me,
            },
          ),
        ),
        /* @__PURE__ */ L(
          i0,
          v(
            {
              value: Array.isArray(z) ? z.join(',') : z,
              name: S,
              ref: $,
              'aria-hidden': !0,
              onChange: I,
              tabIndex: -1,
              disabled: f,
              className: ue.nativeInput,
              autoFocus: a,
              ownerState: pe,
            },
            j,
          ),
        ),
        /* @__PURE__ */ L(r0, {
          as: g,
          className: ue.icon,
          ownerState: pe,
        }),
        /* @__PURE__ */ L(
          Fy,
          v(
            {
              id: `menu-${S || ''}`,
              anchorEl: se,
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
                    minWidth: fe,
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
     * The icon that displays the arrow.
     */
    IconComponent: n.elementType.isRequired,
    /**
     * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
     * Equivalent to `ref`
     */
    inputRef: St,
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
const l0 = Bc;
var Us, Ws;
const c0 = [
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
  u0 = (e) => {
    const { classes: t } = e;
    return t;
  },
  na = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => tn(e) && e !== 'variant',
    slot: 'Root',
  },
  d0 = he(Pc, na)(''),
  p0 = he(zc, na)(''),
  f0 = he(Cc, na)(''),
  oa = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        IconComponent: d = fc,
        id: f,
        input: b,
        inputProps: g,
        label: y,
        labelId: h,
        MenuProps: m,
        multiple: C = !1,
        native: S = !1,
        onClose: T,
        onOpen: E,
        open: p,
        renderValue: R,
        SelectDisplayProps: w,
        variant: V = 'outlined',
      } = r,
      D = Te(r, c0),
      A = S ? Hy : l0,
      _ = Pn(),
      B =
        Jn({
          props: r,
          muiFormControl: _,
          states: ['variant'],
        }).variant || V,
      M =
        b ||
        {
          standard: Us || (Us = /* @__PURE__ */ L(d0, {})),
          outlined: /* @__PURE__ */ L(p0, {
            label: y,
          }),
          filled: Ws || (Ws = /* @__PURE__ */ L(f0, {})),
        }[B],
      j = v({}, r, {
        variant: B,
        classes: s,
      }),
      z = u0(j),
      le = ft(o, M.ref);
    return /* @__PURE__ */ L(x.Fragment, {
      children: /* @__PURE__ */ x.cloneElement(
        M,
        v(
          {
            // Most of the logic is implemented in `SelectInput`.
            // The `Select` component is a simple API wrapper to expose something better to play with.
            inputComponent: A,
            inputProps: v(
              {
                children: a,
                IconComponent: d,
                variant: B,
                type: void 0,
                // We render a select. We can ignore the type provided by the `Input`.
                multiple: C,
              },
              S
                ? {
                    id: f,
                  }
                : {
                    autoWidth: i,
                    defaultOpen: c,
                    displayEmpty: u,
                    labelId: h,
                    MenuProps: m,
                    onClose: T,
                    onOpen: E,
                    open: p,
                    renderValue: R,
                    SelectDisplayProps: v(
                      {
                        id: f,
                      },
                      w,
                    ),
                  },
              g,
              {
                classes: g ? Mt(z, g.classes) : z,
              },
              b ? b.props.inputProps : {},
            ),
          },
          C && S && B === 'outlined'
            ? {
                notched: !0,
              }
            : {},
          {
            ref: le,
            className: Oe(M.props.className, l),
          },
          !b && {
            variant: B,
          },
          D,
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (oa.propTypes = {
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
oa.muiName = 'Select';
const m0 = oa,
  h0 = (e) => !e || !hn(e),
  b0 = h0;
function v0(e) {
  return De('MuiSlider', e);
}
const g0 = qe('MuiSlider', [
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
  Bt = g0,
  y0 = (e) => {
    const { open: t } = e;
    return {
      offset: Oe(t && Bt.valueLabelOpen),
      circle: Bt.valueLabelCircle,
      label: Bt.valueLabelLabel,
    };
  };
function Uc(e) {
  const { children: t, className: o, value: r } = e,
    i = y0(e);
  return t
    ? /* @__PURE__ */ x.cloneElement(
        t,
        {
          className: Oe(t.props.className),
        },
        /* @__PURE__ */ Qe(x.Fragment, {
          children: [
            t.props.children,
            /* @__PURE__ */ L('span', {
              className: Oe(i.offset, o),
              'aria-hidden': !0,
              children: /* @__PURE__ */ L('span', {
                className: i.circle,
                children: /* @__PURE__ */ L('span', {
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
const x0 = [
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
function Hs(e) {
  return e;
}
const Wc = he('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      t[`color${ae(o.color)}`],
      o.size !== 'medium' && t[`size${ae(o.size)}`],
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
const Hc = he('span', {
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
const qc = he('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (e, t) => t.track,
})(({ theme: e, ownerState: t }) => {
  const o =
    // Same logic as the LinearProgress track color
    e.palette.mode === 'light'
      ? Ai(e.palette[t.color].main, 0.62)
      : Mi(e.palette[t.color].main, 0.5);
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
const Yc = he('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.thumb,
      t[`thumbColor${ae(o.color)}`],
      o.size !== 'medium' && t[`thumbSize${ae(o.size)}`],
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
const Kc = he(Uc, {
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
const Gc = he('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => Di(e) && e !== 'markActive',
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
const Xc = he('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => Di(e) && e !== 'markLabelActive',
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
const E0 = (e) => {
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
          l && `color${ae(l)}`,
          c && `size${ae(c)}`,
        ],
        rail: ['rail'],
        track: ['track'],
        mark: ['mark'],
        markActive: ['markActive'],
        markLabel: ['markLabel'],
        markLabelActive: ['markLabelActive'],
        valueLabel: ['valueLabel'],
        thumb: ['thumb', t && 'disabled', c && `thumbSize${ae(c)}`, l && `thumbColor${ae(l)}`],
        active: ['active'],
        disabled: ['disabled'],
        focusVisible: ['focusVisible'],
      };
    return Ke(u, v0, s);
  },
  O0 = ({ children: e }) => e,
  Jc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, i, a, s, l, c, u, d, f, b, g, y, h, m, C, S, T, E, p, R, w, V, D, A;
    const _ = Ge({
        props: t,
        name: 'MuiSlider',
      }),
      B = $o().direction === 'rtl',
      {
        'aria-label': M,
        'aria-valuetext': j,
        'aria-labelledby': z,
        // eslint-disable-next-line react/prop-types
        component: le = 'span',
        components: ie = {},
        componentsProps: G = {},
        color: $ = 'primary',
        classes: F,
        className: X,
        disableSwap: H = !1,
        disabled: U = !1,
        getAriaLabel: te,
        getAriaValueText: ne,
        marks: J = !1,
        max: re = 100,
        min: se = 0,
        orientation: me = 'horizontal',
        size: oe = 'medium',
        step: k = 1,
        scale: Ee = Hs,
        slotProps: I,
        slots: W,
        track: $e = 'normal',
        valueLabelDisplay: ve = 'off',
        valueLabelFormat: Xe = Hs,
      } = _,
      Me = Te(_, x0),
      Ce = v({}, _, {
        isRtl: B,
        max: re,
        min: se,
        classes: F,
        disabled: U,
        disableSwap: H,
        orientation: me,
        marks: J,
        color: $,
        size: oe,
        step: k,
        scale: Ee,
        track: $e,
        valueLabelDisplay: ve,
        valueLabelFormat: Xe,
      }),
      {
        axisProps: Re,
        getRootProps: Je,
        getHiddenInputProps: ot,
        getThumbProps: Z,
        open: fe,
        active: ge,
        axis: be,
        focusedThumbIndex: pe,
        range: ue,
        dragging: Q,
        marks: ye,
        values: xe,
        trackOffset: Ne,
        trackLeap: rt,
      } = fb(
        v({}, Ce, {
          ref: o,
        }),
      );
    (Ce.marked = ye.length > 0 && ye.some((P) => P.label)),
      (Ce.dragging = Q),
      (Ce.focusedThumbIndex = pe);
    const ct = E0(Ce),
      xt = (r = (i = W == null ? void 0 : W.root) != null ? i : ie.Root) != null ? r : Wc,
      un = (a = (s = W == null ? void 0 : W.rail) != null ? s : ie.Rail) != null ? a : Hc,
      Et = (l = (c = W == null ? void 0 : W.track) != null ? c : ie.Track) != null ? l : qc,
      mt = (u = (d = W == null ? void 0 : W.thumb) != null ? d : ie.Thumb) != null ? u : Yc,
      vt =
        (f = (b = W == null ? void 0 : W.valueLabel) != null ? b : ie.ValueLabel) != null ? f : Kc,
      ut = (g = (y = W == null ? void 0 : W.mark) != null ? y : ie.Mark) != null ? g : Gc,
      Ze = (h = (m = W == null ? void 0 : W.markLabel) != null ? m : ie.MarkLabel) != null ? h : Xc,
      tt = (C = (S = W == null ? void 0 : W.input) != null ? S : ie.Input) != null ? C : 'input',
      dt = (T = I == null ? void 0 : I.root) != null ? T : G.root,
      yn = (E = I == null ? void 0 : I.rail) != null ? E : G.rail,
      qt = (p = I == null ? void 0 : I.track) != null ? p : G.track,
      dn = (R = I == null ? void 0 : I.thumb) != null ? R : G.thumb,
      Ft = (w = I == null ? void 0 : I.valueLabel) != null ? w : G.valueLabel,
      nn = (V = I == null ? void 0 : I.mark) != null ? V : G.mark,
      on = (D = I == null ? void 0 : I.markLabel) != null ? D : G.markLabel,
      rn = (A = I == null ? void 0 : I.input) != null ? A : G.input,
      Yt = jt({
        elementType: xt,
        getSlotProps: Je,
        externalSlotProps: dt,
        externalForwardedProps: Me,
        additionalProps: v(
          {},
          b0(xt) && {
            as: le,
          },
        ),
        ownerState: v({}, Ce, dt == null ? void 0 : dt.ownerState),
        className: [ct.root, X],
      }),
      an = jt({
        elementType: un,
        externalSlotProps: yn,
        ownerState: Ce,
        className: ct.rail,
      }),
      ke = jt({
        elementType: Et,
        externalSlotProps: qt,
        additionalProps: {
          style: v({}, Re[be].offset(Ne), Re[be].leap(rt)),
        },
        ownerState: v({}, Ce, qt == null ? void 0 : qt.ownerState),
        className: ct.track,
      }),
      st = jt({
        elementType: mt,
        getSlotProps: Z,
        externalSlotProps: dn,
        ownerState: v({}, Ce, dn == null ? void 0 : dn.ownerState),
        className: ct.thumb,
      }),
      It = jt({
        elementType: vt,
        externalSlotProps: Ft,
        ownerState: v({}, Ce, Ft == null ? void 0 : Ft.ownerState),
        className: ct.valueLabel,
      }),
      O = jt({
        elementType: ut,
        externalSlotProps: nn,
        ownerState: Ce,
        className: ct.mark,
      }),
      q = jt({
        elementType: Ze,
        externalSlotProps: on,
        ownerState: Ce,
        className: ct.markLabel,
      }),
      ce = jt({
        elementType: tt,
        getSlotProps: ot,
        externalSlotProps: rn,
        ownerState: Ce,
      });
    return /* @__PURE__ */ Qe(
      xt,
      v({}, Yt, {
        children: [
          /* @__PURE__ */ L(un, v({}, an)),
          /* @__PURE__ */ L(Et, v({}, ke)),
          ye
            .filter((P) => P.value >= se && P.value <= re)
            .map((P, N) => {
              const Y = nr(P.value, se, re),
                ee = Re[be].offset(Y);
              let de;
              return (
                $e === !1
                  ? (de = xe.indexOf(P.value) !== -1)
                  : (de =
                      ($e === 'normal' &&
                        (ue
                          ? P.value >= xe[0] && P.value <= xe[xe.length - 1]
                          : P.value <= xe[0])) ||
                      ($e === 'inverted' &&
                        (ue
                          ? P.value <= xe[0] || P.value >= xe[xe.length - 1]
                          : P.value >= xe[0]))),
                /* @__PURE__ */ Qe(
                  x.Fragment,
                  {
                    children: [
                      /* @__PURE__ */ L(
                        ut,
                        v(
                          {
                            'data-index': N,
                          },
                          O,
                          !hn(ut) && {
                            markActive: de,
                          },
                          {
                            style: v({}, ee, O.style),
                            className: Oe(O.className, de && ct.markActive),
                          },
                        ),
                      ),
                      P.label != null
                        ? /* @__PURE__ */ L(
                            Ze,
                            v(
                              {
                                'aria-hidden': !0,
                                'data-index': N,
                              },
                              q,
                              !hn(Ze) && {
                                markLabelActive: de,
                              },
                              {
                                style: v({}, ee, q.style),
                                className: Oe(ct.markLabel, q.className, de && ct.markLabelActive),
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
          xe.map((P, N) => {
            const Y = nr(P, se, re),
              ee = Re[be].offset(Y),
              de = ve === 'off' ? O0 : vt;
            return (
              /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
              /* @__PURE__ */ L(
                de,
                v(
                  {},
                  !hn(de) && {
                    valueLabelFormat: Xe,
                    valueLabelDisplay: ve,
                    value: typeof Xe == 'function' ? Xe(Ee(P), N) : Xe,
                    index: N,
                    open: fe === N || ge === N || ve === 'on',
                    disabled: U,
                  },
                  It,
                  {
                    children: /* @__PURE__ */ L(
                      mt,
                      v(
                        {
                          'data-index': N,
                        },
                        st,
                        {
                          className: Oe(
                            ct.thumb,
                            st.className,
                            ge === N && ct.active,
                            pe === N && ct.focusVisible,
                          ),
                          style: v(
                            {},
                            ee,
                            {
                              pointerEvents: H && ge !== N ? 'none' : void 0,
                            },
                            st.style,
                          ),
                          children: /* @__PURE__ */ L(
                            tt,
                            v(
                              {
                                'data-index': N,
                                'aria-label': te ? te(N) : M,
                                'aria-valuenow': Ee(P),
                                'aria-labelledby': z,
                                'aria-valuetext': ne ? ne(Ee(P), N) : j,
                                value: xe[N],
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
  (Jc.propTypes = {
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
const T0 = Jc;
function C0(e) {
  return De('MuiSwitch', e);
}
const S0 = qe('MuiSwitch', [
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
  yt = S0,
  R0 = ['className', 'color', 'edge', 'size', 'sx'],
  w0 = (e) => {
    const { classes: t, edge: o, size: r, color: i, checked: a, disabled: s } = e,
      l = {
        root: ['root', o && `edge${ae(o)}`, `size${ae(r)}`],
        switchBase: ['switchBase', `color${ae(i)}`, a && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = Ke(l, C0, t);
    return v({}, t, c);
  },
  $0 = he('span', {
    name: 'MuiSwitch',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.edge && t[`edge${ae(o.edge)}`], t[`size${ae(o.size)}`]];
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
        [`& .${yt.thumb}`]: {
          width: 16,
          height: 16,
        },
        [`& .${yt.switchBase}`]: {
          padding: 4,
          [`&.${yt.checked}`]: {
            transform: 'translateX(16px)',
          },
        },
      },
    ),
  ),
  P0 = he(Ec, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        {
          [`& .${yt.input}`]: t.input,
        },
        o.color !== 'default' && t[`color${ae(o.color)}`],
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
      [`&.${yt.checked}`]: {
        transform: 'translateX(20px)',
      },
      [`&.${yt.disabled}`]: {
        color: e.vars
          ? e.vars.palette.Switch.defaultDisabledColor
          : `${e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[600]}`,
      },
      [`&.${yt.checked} + .${yt.track}`]: {
        opacity: 0.5,
      },
      [`&.${yt.disabled} + .${yt.track}`]: {
        opacity: e.vars
          ? e.vars.opacity.switchTrackDisabled
          : `${e.palette.mode === 'light' ? 0.12 : 0.2}`,
      },
      [`& .${yt.input}`]: {
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
          [`&.${yt.checked}`]: {
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
            [`&.${yt.disabled}`]: {
              color: e.vars
                ? e.vars.palette.Switch[`${t.color}DisabledColor`]
                : `${
                    e.palette.mode === 'light'
                      ? Ai(e.palette[t.color].main, 0.62)
                      : Mi(e.palette[t.color].main, 0.55)
                  }`,
            },
          },
          [`&.${yt.checked} + .${yt.track}`]: {
            backgroundColor: (e.vars || e).palette[t.color].main,
          },
        },
      ),
  ),
  N0 = he('span', {
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
  k0 = he('span', {
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
  Zc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = Ge({
        props: t,
        name: 'MuiSwitch',
      }),
      { className: i, color: a = 'primary', edge: s = !1, size: l = 'medium', sx: c } = r,
      u = Te(r, R0),
      d = v({}, r, {
        color: a,
        edge: s,
        size: l,
      }),
      f = w0(d),
      b = /* @__PURE__ */ L(k0, {
        className: f.thumb,
        ownerState: d,
      });
    return /* @__PURE__ */ Qe($0, {
      className: Oe(f.root, i),
      sx: c,
      ownerState: d,
      children: [
        /* @__PURE__ */ L(
          P0,
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
              classes: v({}, f, {
                root: f.switchBase,
              }),
            },
          ),
        ),
        /* @__PURE__ */ L(N0, {
          className: f.track,
          ownerState: d,
        }),
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
    inputRef: St,
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
const I0 = Zc;
function _0(e) {
  return De('MuiTextField', e);
}
qe('MuiTextField', ['root']);
const M0 = [
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
  A0 = {
    standard: Pc,
    filled: Cc,
    outlined: zc,
  },
  D0 = (e) => {
    const { classes: t } = e;
    return Ke(
      {
        root: ['root'],
      },
      _0,
      t,
    );
  },
  L0 = he(Ug, {
    name: 'MuiTextField',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Qc = /* @__PURE__ */ x.forwardRef(function (t, o) {
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
        error: f = !1,
        FormHelperTextProps: b,
        fullWidth: g = !1,
        helperText: y,
        id: h,
        InputLabelProps: m,
        inputProps: C,
        InputProps: S,
        inputRef: T,
        label: E,
        maxRows: p,
        minRows: R,
        multiline: w = !1,
        name: V,
        onBlur: D,
        onChange: A,
        onFocus: _,
        placeholder: K,
        required: B = !1,
        rows: M,
        select: j = !1,
        SelectProps: z,
        type: le,
        value: ie,
        variant: G = 'outlined',
      } = r,
      $ = Te(r, M0),
      F = v({}, r, {
        autoFocus: a,
        color: c,
        disabled: d,
        error: f,
        fullWidth: g,
        multiline: w,
        required: B,
        select: j,
        variant: G,
      }),
      X = D0(F);
    process.env.NODE_ENV !== 'production' &&
      j &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const H = {};
    G === 'outlined' && (m && typeof m.shrink < 'u' && (H.notched = m.shrink), (H.label = E)),
      j && ((!z || !z.native) && (H.id = void 0), (H['aria-describedby'] = void 0));
    const U = ll(h),
      te = y && U ? `${U}-helper-text` : void 0,
      ne = E && U ? `${U}-label` : void 0,
      J = A0[G],
      re = /* @__PURE__ */ L(
        J,
        v(
          {
            'aria-describedby': te,
            autoComplete: i,
            autoFocus: a,
            defaultValue: u,
            fullWidth: g,
            multiline: w,
            name: V,
            rows: M,
            maxRows: p,
            minRows: R,
            type: le,
            value: ie,
            id: U,
            inputRef: T,
            onBlur: D,
            onChange: A,
            onFocus: _,
            placeholder: K,
            inputProps: C,
          },
          H,
          S,
        ),
      );
    return /* @__PURE__ */ Qe(
      L0,
      v(
        {
          className: Oe(X.root, l),
          disabled: d,
          error: f,
          fullWidth: g,
          ref: o,
          required: B,
          color: c,
          variant: G,
          ownerState: F,
        },
        $,
        {
          children: [
            E != null &&
              E !== '' &&
              /* @__PURE__ */ L(
                fy,
                v(
                  {
                    htmlFor: U,
                    id: ne,
                  },
                  m,
                  {
                    children: E,
                  },
                ),
              ),
            j
              ? /* @__PURE__ */ L(
                  m0,
                  v(
                    {
                      'aria-describedby': te,
                      id: U,
                      labelId: ne,
                      value: ie,
                      input: re,
                    },
                    z,
                    {
                      children: s,
                    },
                  ),
                )
              : re,
            y &&
              /* @__PURE__ */ L(
                Gg,
                v(
                  {
                    id: te,
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
  (Qc.propTypes = {
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
    inputRef: St,
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
const eu = Qc;
function Ln({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: i }) {
  return /* @__PURE__ */ L(fg, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: i,
  });
}
var Vn = /* @__PURE__ */ ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(Vn || {});
function W0({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = Vn.After,
  isIndeterminate: r = !1,
  isDefaultChecked: i = !1,
  isDisabled: a = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const u = /* @__PURE__ */ L(Ng, {
    checked: e,
    indeterminate: r,
    defaultChecked: i,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let d;
  if (t) {
    const f = o === Vn.Before || o === Vn.Above,
      b = /* @__PURE__ */ L('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      g = o === Vn.Before || o === Vn.After,
      y = g ? b : /* @__PURE__ */ L('div', { children: b }),
      h = g ? u : /* @__PURE__ */ L('div', { children: u });
    d = /* @__PURE__ */ Qe($c, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: a,
      error: s,
      children: [f && y, h, !f && y],
    });
  } else d = u;
  return d;
}
function F0({
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
  onBlur: f,
}) {
  return /* @__PURE__ */ L(Xv, {
    disablePortal: !0,
    disabled: t,
    disableClearable: !o,
    fullWidth: i,
    options: s,
    className: `papi-combo-box ${r ? 'error' : ''} ${l ?? ''}`,
    value: c,
    onChange: u,
    onFocus: d,
    onBlur: f,
    renderInput: (b) =>
      /* @__PURE__ */ L(eu, {
        ...b,
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
  ra = 1,
  tu = Zn.length - 1,
  nu = 1,
  ou = 1,
  j0 = (e) => Zn.findIndex((t) => t.fullNames.includes(e)),
  qs = (e) => Zn[e < ra || e > tu ? 0 : e].fullNames[0],
  Ys = () => {
    const e = [];
    return (
      Zn.slice(1).forEach((t) => {
        const o = t.fullNames[0];
        e.push(o);
      }),
      e
    );
  },
  V0 = (e) => Zn[e].chapters,
  Ks = (e, t) => ({
    book: Math.max(ra, Math.min(e.book + t, tu)),
    chapter: 1,
    verse: 1,
  }),
  Gs = (e, t) => ({
    ...e,
    chapter: Math.min(Math.max(nu, e.chapter + t), Zn[e.book].chapters),
    verse: 1,
  }),
  Xs = (e, t) => ({
    ...e,
    verse: Math.max(ou, e.verse + t),
  });
function Js({
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
  onChange: f,
  onFocus: b,
  onBlur: g,
}) {
  return /* @__PURE__ */ L(eu, {
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
    onChange: f,
    onFocus: b,
    onBlur: g,
  });
}
function H0({ scrRef: e, handleSubmit: t }) {
  const [o, r] = lu(qs(e.book)),
    i = (c) => {
      r(qs(c.book)), t(c);
    },
    a = (c, u) => {
      const f = { book: j0(u), chapter: 1, verse: 1 };
      i(f);
    },
    s = (c) => {
      t({ ...e, chapter: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verse: +c.target.value });
    };
  return /* @__PURE__ */ Qe(hu, {
    children: [
      /* @__PURE__ */ L(F0, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: Ys(),
        onChange: a,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ L(Ln, {
        onClick: () => i(Ks(e, -1)),
        isDisabled: e.book <= ra,
        children: '<',
      }),
      /* @__PURE__ */ L(Ln, {
        onClick: () => i(Ks(e, 1)),
        isDisabled: e.book >= Ys().length,
        children: '>',
      }),
      /* @__PURE__ */ L(Js, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapter,
        onChange: s,
      }),
      /* @__PURE__ */ L(Ln, {
        onClick: () => t(Gs(e, -1)),
        isDisabled: e.chapter <= nu,
        children: '<',
      }),
      /* @__PURE__ */ L(Ln, {
        onClick: () => t(Gs(e, 1)),
        isDisabled: e.chapter >= V0(e.book),
        children: '>',
      }),
      /* @__PURE__ */ L(Js, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verse,
        onChange: l,
      }),
      /* @__PURE__ */ L(Ln, {
        onClick: () => t(Xs(e, -1)),
        isDisabled: e.verse <= ou,
        children: '<',
      }),
      /* @__PURE__ */ L(Ln, { onClick: () => t(Xs(e, 1)), children: '>' }),
    ],
  });
}
function q0({
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
  return /* @__PURE__ */ L(T0, {
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
function Y0({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: i }) {
  return /* @__PURE__ */ L(I0, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: i,
  });
}
function K0({
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
  rowKeyGetter: f,
  rowHeight: b = 35,
  headerRowHeight: g = 35,
  selectedRows: y,
  onSelectedRowsChange: h,
  onRowsChange: m,
  onCellClick: C,
  onCellDoubleClick: S,
  onCellContextMenu: T,
  onCellKeyDown: E,
  direction: p = 'ltr',
  enableVirtualization: R = !0,
  onCopy: w,
  onPaste: V,
  onScroll: D,
  className: A,
}) {
  const _ = cu(() => (d ? [du, ...e] : e), [d, e]);
  return /* @__PURE__ */ L(uu, {
    columns: _,
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
    rowKeyGetter: f,
    rowHeight: b,
    headerRowHeight: g,
    selectedRows: y,
    onSelectedRowsChange: h,
    onRowsChange: m,
    onCellClick: C,
    onCellDoubleClick: S,
    onCellContextMenu: T,
    onCellKeyDown: E,
    direction: p,
    enableVirtualization: R,
    onCopy: w,
    onPaste: V,
    onScroll: D,
    className: `${A ?? ''}`,
  });
}
export {
  Ln as Button,
  W0 as Checkbox,
  F0 as ComboBox,
  Vn as LabelPosition,
  H0 as RefSelector,
  q0 as Slider,
  Y0 as Switch,
  K0 as Table,
  Js as TextField,
};
//# sourceMappingURL=index.es.js.map
