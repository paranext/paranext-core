var J = Object.defineProperty;
var D = (e, r, t) => r in e ? J(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var p = (e, r, t) => (D(e, typeof r != "symbol" ? r + "" : r, t), t);
class ge {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all.
   */
  constructor(r, t = 1e4) {
    p(this, "variableName");
    p(this, "promiseToValue");
    p(this, "resolver");
    p(this, "rejecter");
    this.variableName = r, this.promiseToValue = new Promise((a, s) => {
      this.resolver = a, this.rejecter = s;
    }), t > 0 && setTimeout(() => {
      this.rejecter && (this.rejecter(`Timeout reached when waiting for ${this.variableName} to settle`), this.complete());
    }, t), Object.seal(this);
  }
  /**
   * Get this variable's promise to a value. This always returns the same promise even after the
   * value has been resolved or rejected.
   *
   * @returns The promise for the value to be set
   */
  get promise() {
    return this.promiseToValue;
  }
  /**
   * A simple way to see if this variable's promise was resolved or rejected already
   *
   * @returns Whether the variable was already resolved or rejected
   */
  get hasSettled() {
    return Object.isFrozen(this);
  }
  /**
   * Resolve this variable's promise to the given value
   *
   * @param value This variable's promise will resolve to this value
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected
   */
  resolveToValue(r, t = !1) {
    if (this.resolver)
      console.debug(`${this.variableName} is being resolved now`), this.resolver(r), this.complete();
    else {
      if (t)
        throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent resolution of ${this.variableName}`);
    }
  }
  /**
   * Reject this variable's promise for the value with the given reason
   *
   * @param reason This variable's promise will be rejected with this reason
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected
   */
  rejectWithReason(r, t = !1) {
    if (this.rejecter)
      console.debug(`${this.variableName} is being rejected now`), this.rejecter(r), this.complete();
    else {
      if (t)
        throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }
  /** Prevent any further updates to this variable */
  complete() {
    this.resolver = void 0, this.rejecter = void 0, Object.freeze(this);
  }
}
class de {
  constructor(r = "Anonymous") {
    p(this, "unsubscribers", /* @__PURE__ */ new Set());
    this.name = r;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...r) {
    r.forEach((t) => {
      "dispose" in t ? this.unsubscribers.add(t.dispose) : this.unsubscribers.add(t);
    });
  }
  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * @returns `true` if all unsubscribers succeeded, `false` otherwise.
   */
  async runAllUnsubscribers() {
    const r = [...this.unsubscribers].map((a) => a()), t = await Promise.all(r);
    return this.unsubscribers.clear(), t.every((a, s) => (a || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${s} failed!`), a));
  }
}
class ye {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    p(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    p(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    p(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    p(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    p(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    p(this, "emit", (r) => {
      this.emitFn(r);
    });
  }
  /**
   * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted.
   * Use like `const unsubscriber = event(callback)`
   *
   * @param callback Function to run with the event when it is emitted
   * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
   *   emitted
   */
  get event() {
    return this.assertNotDisposed(), this.lazyEvent || (this.lazyEvent = (r) => {
      if (!r || typeof r != "function")
        throw new Error("Event handler callback must be a function!");
      return this.subscriptions || (this.subscriptions = []), this.subscriptions.push(r), () => {
        if (!this.subscriptions)
          return !1;
        const t = this.subscriptions.indexOf(r);
        return t < 0 ? !1 : (this.subscriptions.splice(t, 1), !0);
      };
    }), this.lazyEvent;
  }
  /**
   * Function that runs the subscriptions for the event. Added here so children can override emit
   * and still call the base functionality. See NetworkEventEmitter.emit for example
   */
  emitFn(r) {
    var t;
    this.assertNotDisposed(), (t = this.subscriptions) == null || t.forEach((a) => a(r));
  }
  /** Check to make sure this emitter is not disposed. Throw if it is */
  assertNotDisposed() {
    if (this.isDisposed)
      throw new Error("Emitter is disposed");
  }
  /**
   * Disposes of this event, preparing it to release from memory. Added here so children can
   * override emit and still call the base functionality.
   */
  disposeFn() {
    return this.assertNotDisposed(), this.isDisposed = !0, this.subscriptions = void 0, this.lazyEvent = void 0, Promise.resolve(!0);
  }
}
const C = [
  { shortName: "ERR", fullNames: ["ERROR"], chapters: -1 },
  { shortName: "GEN", fullNames: ["Genesis"], chapters: 50 },
  { shortName: "EXO", fullNames: ["Exodus"], chapters: 40 },
  { shortName: "LEV", fullNames: ["Leviticus"], chapters: 27 },
  { shortName: "NUM", fullNames: ["Numbers"], chapters: 36 },
  { shortName: "DEU", fullNames: ["Deuteronomy"], chapters: 34 },
  { shortName: "JOS", fullNames: ["Joshua"], chapters: 24 },
  { shortName: "JDG", fullNames: ["Judges"], chapters: 21 },
  { shortName: "RUT", fullNames: ["Ruth"], chapters: 4 },
  { shortName: "1SA", fullNames: ["1 Samuel"], chapters: 31 },
  { shortName: "2SA", fullNames: ["2 Samuel"], chapters: 24 },
  { shortName: "1KI", fullNames: ["1 Kings"], chapters: 22 },
  { shortName: "2KI", fullNames: ["2 Kings"], chapters: 25 },
  { shortName: "1CH", fullNames: ["1 Chronicles"], chapters: 29 },
  { shortName: "2CH", fullNames: ["2 Chronicles"], chapters: 36 },
  { shortName: "EZR", fullNames: ["Ezra"], chapters: 10 },
  { shortName: "NEH", fullNames: ["Nehemiah"], chapters: 13 },
  { shortName: "EST", fullNames: ["Esther"], chapters: 10 },
  { shortName: "JOB", fullNames: ["Job"], chapters: 42 },
  { shortName: "PSA", fullNames: ["Psalm", "Psalms"], chapters: 150 },
  { shortName: "PRO", fullNames: ["Proverbs"], chapters: 31 },
  { shortName: "ECC", fullNames: ["Ecclesiastes"], chapters: 12 },
  { shortName: "SNG", fullNames: ["Song of Solomon", "Song of Songs"], chapters: 8 },
  { shortName: "ISA", fullNames: ["Isaiah"], chapters: 66 },
  { shortName: "JER", fullNames: ["Jeremiah"], chapters: 52 },
  { shortName: "LAM", fullNames: ["Lamentations"], chapters: 5 },
  { shortName: "EZK", fullNames: ["Ezekiel"], chapters: 48 },
  { shortName: "DAN", fullNames: ["Daniel"], chapters: 12 },
  { shortName: "HOS", fullNames: ["Hosea"], chapters: 14 },
  { shortName: "JOL", fullNames: ["Joel"], chapters: 3 },
  { shortName: "AMO", fullNames: ["Amos"], chapters: 9 },
  { shortName: "OBA", fullNames: ["Obadiah"], chapters: 1 },
  { shortName: "JON", fullNames: ["Jonah"], chapters: 4 },
  { shortName: "MIC", fullNames: ["Micah"], chapters: 7 },
  { shortName: "NAM", fullNames: ["Nahum"], chapters: 3 },
  { shortName: "HAB", fullNames: ["Habakkuk"], chapters: 3 },
  { shortName: "ZEP", fullNames: ["Zephaniah"], chapters: 3 },
  { shortName: "HAG", fullNames: ["Haggai"], chapters: 2 },
  { shortName: "ZEC", fullNames: ["Zechariah"], chapters: 14 },
  { shortName: "MAL", fullNames: ["Malachi"], chapters: 4 },
  { shortName: "MAT", fullNames: ["Matthew"], chapters: 28 },
  { shortName: "MRK", fullNames: ["Mark"], chapters: 16 },
  { shortName: "LUK", fullNames: ["Luke"], chapters: 24 },
  { shortName: "JHN", fullNames: ["John"], chapters: 21 },
  { shortName: "ACT", fullNames: ["Acts"], chapters: 28 },
  { shortName: "ROM", fullNames: ["Romans"], chapters: 16 },
  { shortName: "1CO", fullNames: ["1 Corinthians"], chapters: 16 },
  { shortName: "2CO", fullNames: ["2 Corinthians"], chapters: 13 },
  { shortName: "GAL", fullNames: ["Galatians"], chapters: 6 },
  { shortName: "EPH", fullNames: ["Ephesians"], chapters: 6 },
  { shortName: "PHP", fullNames: ["Philippians"], chapters: 4 },
  { shortName: "COL", fullNames: ["Colossians"], chapters: 4 },
  { shortName: "1TH", fullNames: ["1 Thessalonians"], chapters: 5 },
  { shortName: "2TH", fullNames: ["2 Thessalonians"], chapters: 3 },
  { shortName: "1TI", fullNames: ["1 Timothy"], chapters: 6 },
  { shortName: "2TI", fullNames: ["2 Timothy"], chapters: 4 },
  { shortName: "TIT", fullNames: ["Titus"], chapters: 3 },
  { shortName: "PHM", fullNames: ["Philemon"], chapters: 1 },
  { shortName: "HEB", fullNames: ["Hebrews"], chapters: 13 },
  { shortName: "JAS", fullNames: ["James"], chapters: 5 },
  { shortName: "1PE", fullNames: ["1 Peter"], chapters: 5 },
  { shortName: "2PE", fullNames: ["2 Peter"], chapters: 3 },
  { shortName: "1JN", fullNames: ["1 John"], chapters: 5 },
  { shortName: "2JN", fullNames: ["2 John"], chapters: 1 },
  { shortName: "3JN", fullNames: ["3 John"], chapters: 1 },
  { shortName: "JUD", fullNames: ["Jude"], chapters: 1 },
  { shortName: "REV", fullNames: ["Revelation"], chapters: 22 }
], x = 1, B = C.length - 1, G = 1, I = 1, k = (e) => {
  var r;
  return ((r = C[e]) == null ? void 0 : r.chapters) ?? -1;
}, Oe = (e, r) => ({
  bookNum: Math.max(x, Math.min(e.bookNum + r, B)),
  chapterNum: 1,
  verseNum: 1
}), qe = (e, r) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(G, e.chapterNum + r),
    k(e.bookNum)
  ),
  verseNum: 1
}), be = (e, r) => ({
  ...e,
  verseNum: Math.max(I, e.verseNum + r)
}), Ae = (e) => (...r) => e.map((a) => a(...r)).every((a) => a), Se = (e) => async (...r) => {
  const t = e.map(async (a) => a(...r));
  return (await Promise.all(t)).every((a) => a);
};
function we() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (e) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~e) * 65536 >> e).toString(16).padStart(4, "0")
    )
  );
}
function H(e) {
  return typeof e == "string" || e instanceof String;
}
function Te(e, r = 300) {
  if (H(e))
    throw new Error("Tried to debounce a string! Could be XSS");
  let t;
  return (...a) => {
    clearTimeout(t), t = setTimeout(() => e(...a), r);
  };
}
function je(e, r, t) {
  const a = /* @__PURE__ */ new Map();
  return e.forEach((s) => {
    const n = r(s), u = a.get(n), o = t ? t(s, n) : s;
    u ? u.push(o) : a.set(n, [o]);
  }), a;
}
function z(e) {
  return typeof e == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  e !== null && "message" in e && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof e.message == "string";
}
function U(e) {
  if (z(e))
    return e;
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}
function Pe(e) {
  return U(e).message;
}
function _(e) {
  return new Promise((r) => setTimeout(r, e));
}
function Ce(e, r) {
  const t = _(r).then(() => {
  });
  return Promise.any([t, e()]);
}
function Re(e, r = "obj") {
  const t = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(e).forEach((s) => {
    try {
      typeof e[s] == "function" && t.add(s);
    } catch (n) {
      console.debug(`Skipping ${s} on ${r} due to error: ${n}`);
    }
  });
  let a = Object.getPrototypeOf(e);
  for (; a && Object.getPrototypeOf(a); )
    Object.getOwnPropertyNames(a).forEach((s) => {
      try {
        typeof e[s] == "function" && t.add(s);
      } catch (n) {
        console.debug(`Skipping ${s} on ${r}'s prototype due to error: ${n}`);
      }
    }), a = Object.getPrototypeOf(a);
  return t;
}
var L = Object.getOwnPropertyNames, V = Object.getOwnPropertySymbols, F = Object.prototype.hasOwnProperty;
function O(e, r) {
  return function(a, s, n) {
    return e(a, s, n) && r(a, s, n);
  };
}
function d(e) {
  return function(t, a, s) {
    if (!t || !a || typeof t != "object" || typeof a != "object")
      return e(t, a, s);
    var n = s.cache, u = n.get(t), o = n.get(a);
    if (u && o)
      return u === a && o === t;
    n.set(t, a), n.set(a, t);
    var c = e(t, a, s);
    return n.delete(t), n.delete(a), c;
  };
}
function q(e) {
  return L(e).concat(V(e));
}
var R = Object.hasOwn || function(e, r) {
  return F.call(e, r);
};
function E(e, r) {
  return e || r ? e === r : e === r || e !== e && r !== r;
}
var M = "_owner", b = Object.getOwnPropertyDescriptor, A = Object.keys;
function K(e, r, t) {
  var a = e.length;
  if (r.length !== a)
    return !1;
  for (; a-- > 0; )
    if (!t.equals(e[a], r[a], a, a, e, r, t))
      return !1;
  return !0;
}
function W(e, r) {
  return E(e.getTime(), r.getTime());
}
function S(e, r, t) {
  if (e.size !== r.size)
    return !1;
  for (var a = {}, s = e.entries(), n = 0, u, o; (u = s.next()) && !u.done; ) {
    for (var c = r.entries(), h = !1, i = 0; (o = c.next()) && !o.done; ) {
      var l = u.value, f = l[0], N = l[1], m = o.value, y = m[0], $ = m[1];
      !h && !a[i] && (h = t.equals(f, y, n, i, e, r, t) && t.equals(N, $, f, y, e, r, t)) && (a[i] = !0), i++;
    }
    if (!h)
      return !1;
    n++;
  }
  return !0;
}
function Z(e, r, t) {
  var a = A(e), s = a.length;
  if (A(r).length !== s)
    return !1;
  for (var n; s-- > 0; )
    if (n = a[s], n === M && (e.$$typeof || r.$$typeof) && e.$$typeof !== r.$$typeof || !R(r, n) || !t.equals(e[n], r[n], n, n, e, r, t))
      return !1;
  return !0;
}
function g(e, r, t) {
  var a = q(e), s = a.length;
  if (q(r).length !== s)
    return !1;
  for (var n, u, o; s-- > 0; )
    if (n = a[s], n === M && (e.$$typeof || r.$$typeof) && e.$$typeof !== r.$$typeof || !R(r, n) || !t.equals(e[n], r[n], n, n, e, r, t) || (u = b(e, n), o = b(r, n), (u || o) && (!u || !o || u.configurable !== o.configurable || u.enumerable !== o.enumerable || u.writable !== o.writable)))
      return !1;
  return !0;
}
function X(e, r) {
  return E(e.valueOf(), r.valueOf());
}
function Q(e, r) {
  return e.source === r.source && e.flags === r.flags;
}
function w(e, r, t) {
  if (e.size !== r.size)
    return !1;
  for (var a = {}, s = e.values(), n, u; (n = s.next()) && !n.done; ) {
    for (var o = r.values(), c = !1, h = 0; (u = o.next()) && !u.done; )
      !c && !a[h] && (c = t.equals(n.value, u.value, n.value, u.value, e, r, t)) && (a[h] = !0), h++;
    if (!c)
      return !1;
  }
  return !0;
}
function Y(e, r) {
  var t = e.length;
  if (r.length !== t)
    return !1;
  for (; t-- > 0; )
    if (e[t] !== r[t])
      return !1;
  return !0;
}
var ee = "[object Arguments]", re = "[object Boolean]", te = "[object Date]", ae = "[object Map]", se = "[object Number]", ne = "[object Object]", ue = "[object RegExp]", ie = "[object Set]", oe = "[object String]", le = Array.isArray, T = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, j = Object.assign, ce = Object.prototype.toString.call.bind(Object.prototype.toString);
function fe(e) {
  var r = e.areArraysEqual, t = e.areDatesEqual, a = e.areMapsEqual, s = e.areObjectsEqual, n = e.arePrimitiveWrappersEqual, u = e.areRegExpsEqual, o = e.areSetsEqual, c = e.areTypedArraysEqual;
  return function(i, l, f) {
    if (i === l)
      return !0;
    if (i == null || l == null || typeof i != "object" || typeof l != "object")
      return i !== i && l !== l;
    var N = i.constructor;
    if (N !== l.constructor)
      return !1;
    if (N === Object)
      return s(i, l, f);
    if (le(i))
      return r(i, l, f);
    if (T != null && T(i))
      return c(i, l, f);
    if (N === Date)
      return t(i, l, f);
    if (N === RegExp)
      return u(i, l, f);
    if (N === Map)
      return a(i, l, f);
    if (N === Set)
      return o(i, l, f);
    var m = ce(i);
    return m === te ? t(i, l, f) : m === ue ? u(i, l, f) : m === ae ? a(i, l, f) : m === ie ? o(i, l, f) : m === ne ? typeof i.then != "function" && typeof l.then != "function" && s(i, l, f) : m === ee ? s(i, l, f) : m === re || m === se || m === oe ? n(i, l, f) : !1;
  };
}
function he(e) {
  var r = e.circular, t = e.createCustomConfig, a = e.strict, s = {
    areArraysEqual: a ? g : K,
    areDatesEqual: W,
    areMapsEqual: a ? O(S, g) : S,
    areObjectsEqual: a ? g : Z,
    arePrimitiveWrappersEqual: X,
    areRegExpsEqual: Q,
    areSetsEqual: a ? O(w, g) : w,
    areTypedArraysEqual: a ? g : Y
  };
  if (t && (s = j({}, s, t(s))), r) {
    var n = d(s.areArraysEqual), u = d(s.areMapsEqual), o = d(s.areObjectsEqual), c = d(s.areSetsEqual);
    s = j({}, s, {
      areArraysEqual: n,
      areMapsEqual: u,
      areObjectsEqual: o,
      areSetsEqual: c
    });
  }
  return s;
}
function me(e) {
  return function(r, t, a, s, n, u, o) {
    return e(r, t, o);
  };
}
function pe(e) {
  var r = e.circular, t = e.comparator, a = e.createState, s = e.equals, n = e.strict;
  if (a)
    return function(c, h) {
      var i = a(), l = i.cache, f = l === void 0 ? r ? /* @__PURE__ */ new WeakMap() : void 0 : l, N = i.meta;
      return t(c, h, {
        cache: f,
        equals: s,
        meta: N,
        strict: n
      });
    };
  if (r)
    return function(c, h) {
      return t(c, h, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: s,
        meta: void 0,
        strict: n
      });
    };
  var u = {
    cache: void 0,
    equals: s,
    meta: void 0,
    strict: n
  };
  return function(c, h) {
    return t(c, h, u);
  };
}
var Ne = v();
v({ strict: !0 });
v({ circular: !0 });
v({
  circular: !0,
  strict: !0
});
v({
  createInternalComparator: function() {
    return E;
  }
});
v({
  strict: !0,
  createInternalComparator: function() {
    return E;
  }
});
v({
  circular: !0,
  createInternalComparator: function() {
    return E;
  }
});
v({
  circular: !0,
  createInternalComparator: function() {
    return E;
  },
  strict: !0
});
function v(e) {
  e === void 0 && (e = {});
  var r = e.circular, t = r === void 0 ? !1 : r, a = e.createInternalComparator, s = e.createState, n = e.strict, u = n === void 0 ? !1 : n, o = he(e), c = fe(o), h = a ? a(c) : me(c);
  return pe({ circular: t, comparator: c, createState: s, equals: h, strict: u });
}
function Me(e, r) {
  return Ne(e, r);
}
function P(e, r, t) {
  return JSON.stringify(e, (s, n) => {
    let u = n;
    return r && (u = r(s, u)), u === void 0 && (u = null), u;
  }, t);
}
function ve(e, r) {
  function t(s) {
    return Object.keys(s).forEach((n) => {
      s[n] === null ? s[n] = void 0 : typeof s[n] == "object" && (s[n] = t(s[n]));
    }), s;
  }
  const a = JSON.parse(e, r);
  if (a !== null)
    return typeof a == "object" ? t(a) : a;
}
function $e(e) {
  try {
    const r = P(e);
    return r === P(ve(r));
  } catch {
    return !1;
  }
}
const Je = (e) => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
export {
  ge as AsyncVariable,
  x as FIRST_SCR_BOOK_NUM,
  G as FIRST_SCR_CHAPTER_NUM,
  I as FIRST_SCR_VERSE_NUM,
  B as LAST_SCR_BOOK_NUM,
  ye as PlatformEventEmitter,
  de as UnsubscriberAsyncList,
  Se as aggregateUnsubscriberAsyncs,
  Ae as aggregateUnsubscribers,
  Te as debounce,
  Me as deepEqual,
  ve as deserialize,
  Re as getAllObjectFunctionNames,
  k as getChaptersForBook,
  Pe as getErrorMessage,
  je as groupBy,
  Je as htmlEncode,
  $e as isSerializable,
  H as isString,
  we as newGuid,
  Oe as offsetBook,
  qe as offsetChapter,
  be as offsetVerse,
  P as serialize,
  _ as wait,
  Ce as waitForDuration
};
//# sourceMappingURL=index.js.map
