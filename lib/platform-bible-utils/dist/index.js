var R = Object.defineProperty;
var J = (t, e, r) => e in t ? R(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var f = (t, e, r) => (J(t, typeof e != "symbol" ? e + "" : e, r), r);
import { Mutex as z } from "async-mutex";
class Ae {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all.
   */
  constructor(e, r = 1e4) {
    f(this, "variableName");
    f(this, "promiseToValue");
    f(this, "resolver");
    f(this, "rejecter");
    this.variableName = e, this.promiseToValue = new Promise((s, a) => {
      this.resolver = s, this.rejecter = a;
    }), r > 0 && setTimeout(() => {
      this.rejecter && (this.rejecter(`Timeout reached when waiting for ${this.variableName} to settle`), this.complete());
    }, r), Object.seal(this);
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
  resolveToValue(e, r = !1) {
    if (this.resolver)
      console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
    else {
      if (r)
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
  rejectWithReason(e, r = !1) {
    if (this.rejecter)
      console.debug(`${this.variableName} is being rejected now`), this.rejecter(e), this.complete();
    else {
      if (r)
        throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }
  /** Prevent any further updates to this variable */
  complete() {
    this.resolver = void 0, this.rejecter = void 0, Object.freeze(this);
  }
}
function je() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function B(t) {
  return typeof t == "string" || t instanceof String;
}
function y(t) {
  return JSON.parse(JSON.stringify(t));
}
function Se(t, e = 300) {
  if (B(t))
    throw new Error("Tried to debounce a string! Could be XSS");
  let r;
  return (...s) => {
    clearTimeout(r), r = setTimeout(() => t(...s), e);
  };
}
function Me(t, e, r) {
  const s = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const i = e(a), n = s.get(i), u = r ? r(a, i) : a;
    n ? n.push(u) : s.set(i, [u]);
  }), s;
}
function G(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function V(t) {
  if (G(t))
    return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function Pe(t) {
  return V(t).message;
}
function H(t) {
  return new Promise((e) => setTimeout(e, t));
}
function Ce(t, e) {
  const r = H(e).then(() => {
  });
  return Promise.any([r, t()]);
}
function Te(t, e = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((a) => {
    try {
      typeof t[a] == "function" && r.add(a);
    } catch (i) {
      console.debug(`Skipping ${a} on ${e} due to error: ${i}`);
    }
  });
  let s = Object.getPrototypeOf(t);
  for (; s && Object.getPrototypeOf(s); )
    Object.getOwnPropertyNames(s).forEach((a) => {
      try {
        typeof t[a] == "function" && r.add(a);
      } catch (i) {
        console.debug(`Skipping ${a} on ${e}'s prototype due to error: ${i}`);
      }
    }), s = Object.getPrototypeOf(s);
  return r;
}
function xe(t, e = {}) {
  return new Proxy(e, {
    get(r, s) {
      return s in r ? r[s] : async (...a) => (await t())[s](...a);
    }
  });
}
class Ie {
  /**
   * Create a DocumentCombinerEngine instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, r) {
    f(this, "baseDocument");
    f(this, "contributions", /* @__PURE__ */ new Map());
    f(this, "latestOutput");
    f(this, "options");
    this.baseDocument = e, this.options = r, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateStartingDocument(e), this.baseDocument = this.options.copyDocuments ? y(e) : e, this.rebuild();
  }
  /**
   * Add or update one of the contribution documents for the composition process
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   * @returns Recalculated output document given the new or updated contribution and existing other
   *   documents
   */
  addOrUpdateContribution(e, r) {
    this.validateContribution(e, r);
    const s = this.contributions.get(e), a = this.options.copyDocuments && r ? y(r) : r;
    this.contributions.set(e, a);
    try {
      return this.rebuild();
    } catch (i) {
      throw s ? this.contributions.set(e, s) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${i}`);
    }
  }
  /**
   * Delete one of the contribution documents for the composition process
   *
   * @param documentName Name of the contributed document to delete
   * @returns Recalculated output document given the remaining other documents
   */
  deleteContribution(e) {
    const r = this.contributions.get(e);
    if (!r)
      throw new Error("{documentKey} does not exist");
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (s) {
      throw this.contributions.set(e, r), new Error(`Error when deleting the document named ${e}: ${s}`);
    }
  }
  /**
   * Run the document composition process given the starting document and all contributions. Throws
   * if the output document fails to validate properly.
   *
   * @returns Recalculated output document given the starting and contributed documents
   */
  rebuild() {
    if (this.contributions.size === 0) {
      let r = y(this.baseDocument);
      return r = this.transformFinalOutput(r), this.validateOutput(r), this.latestOutput = r, this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((r) => {
      e = C(
        e,
        r,
        this.options.ignoreDuplicateProperties
      ), this.validateOutput(e);
    }), e = this.transformFinalOutput(e), this.validateOutput(e), this.latestOutput = e, this.latestOutput;
  }
}
function U(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || Array.isArray(r)) && (e = !1);
  }), e;
}
function K(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || !Array.isArray(r)) && (e = !1);
  }), e;
}
function C(t, e, r) {
  const s = y(t);
  return e && Object.keys(e).forEach((a) => {
    if (Object.hasOwn(t, a)) {
      if (U(t[a], e[a]))
        s[a] = C(
          // We know these are objects from the `if` check
          /* eslint-disable no-type-assertion/no-type-assertion */
          t[a],
          e[a],
          r
          /* eslint-enable no-type-assertion/no-type-assertion */
        );
      else if (K(t[a], e[a]))
        s[a] = s[a].concat(e[a]);
      else if (!r)
        throw new Error(`Cannot merge objects: key "${a}" already exists in the target object`);
    } else
      s[a] = e[a];
  }), s;
}
class De {
  constructor(e = "Anonymous") {
    f(this, "unsubscribers", /* @__PURE__ */ new Set());
    this.name = e;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...e) {
    e.forEach((r) => {
      "dispose" in r ? this.unsubscribers.add(r.dispose) : this.unsubscribers.add(r);
    });
  }
  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * @returns `true` if all unsubscribers succeeded, `false` otherwise.
   */
  async runAllUnsubscribers() {
    const e = [...this.unsubscribers].map((s) => s()), r = await Promise.all(e);
    return this.unsubscribers.clear(), r.every((s, a) => (s || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${a} failed!`), s));
  }
}
class Re {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    f(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    f(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    f(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    f(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    f(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    f(this, "emit", (e) => {
      this.emitFn(e);
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
    return this.assertNotDisposed(), this.lazyEvent || (this.lazyEvent = (e) => {
      if (!e || typeof e != "function")
        throw new Error("Event handler callback must be a function!");
      return this.subscriptions || (this.subscriptions = []), this.subscriptions.push(e), () => {
        if (!this.subscriptions)
          return !1;
        const r = this.subscriptions.indexOf(e);
        return r < 0 ? !1 : (this.subscriptions.splice(r, 1), !0);
      };
    }), this.lazyEvent;
  }
  /**
   * Function that runs the subscriptions for the event. Added here so children can override emit
   * and still call the base functionality. See NetworkEventEmitter.emit for example
   */
  emitFn(e) {
    var r;
    this.assertNotDisposed(), (r = this.subscriptions) == null || r.forEach((s) => s(e));
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
class W extends z {
}
class Je {
  constructor() {
    f(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(e) {
    let r = this.mutexesByID.get(e);
    return r || (r = new W(), this.mutexesByID.set(e, r), r);
  }
}
const T = [
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
], _ = 1, L = T.length - 1, k = 1, F = 1, Z = (t) => {
  var e;
  return ((e = T[t]) == null ? void 0 : e.chapters) ?? -1;
}, ze = (t, e) => ({
  bookNum: Math.max(_, Math.min(t.bookNum + e, L)),
  chapterNum: 1,
  verseNum: 1
}), Be = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(k, t.chapterNum + e),
    Z(t.bookNum)
  ),
  verseNum: 1
}), Ge = (t, e) => ({
  ...t,
  verseNum: Math.max(F, t.verseNum + e)
}), Ve = (t) => (...e) => t.map((s) => s(...e)).every((s) => s), He = (t) => async (...e) => {
  const r = t.map(async (s) => s(...e));
  return (await Promise.all(r)).every((s) => s);
};
var X = Object.getOwnPropertyNames, Q = Object.getOwnPropertySymbols, Y = Object.prototype.hasOwnProperty;
function w(t, e) {
  return function(s, a, i) {
    return t(s, a, i) && e(s, a, i);
  };
}
function v(t) {
  return function(r, s, a) {
    if (!r || !s || typeof r != "object" || typeof s != "object")
      return t(r, s, a);
    var i = a.cache, n = i.get(r), u = i.get(s);
    if (n && u)
      return n === s && u === r;
    i.set(r, s), i.set(s, r);
    var c = t(r, s, a);
    return i.delete(r), i.delete(s), c;
  };
}
function O(t) {
  return X(t).concat(Q(t));
}
var x = Object.hasOwn || function(t, e) {
  return Y.call(t, e);
};
function b(t, e) {
  return t || e ? t === e : t === e || t !== t && e !== e;
}
var I = "_owner", $ = Object.getOwnPropertyDescriptor, q = Object.keys;
function ee(t, e, r) {
  var s = t.length;
  if (e.length !== s)
    return !1;
  for (; s-- > 0; )
    if (!r.equals(t[s], e[s], s, s, t, e, r))
      return !1;
  return !0;
}
function te(t, e) {
  return b(t.getTime(), e.getTime());
}
function A(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, a = t.entries(), i = 0, n, u; (n = a.next()) && !n.done; ) {
    for (var c = e.entries(), p = !1, o = 0; (u = c.next()) && !u.done; ) {
      var l = n.value, h = l[0], d = l[1], m = u.value, E = m[0], D = m[1];
      !p && !s[o] && (p = r.equals(h, E, i, o, t, e, r) && r.equals(d, D, h, E, t, e, r)) && (s[o] = !0), o++;
    }
    if (!p)
      return !1;
    i++;
  }
  return !0;
}
function re(t, e, r) {
  var s = q(t), a = s.length;
  if (q(e).length !== a)
    return !1;
  for (var i; a-- > 0; )
    if (i = s[a], i === I && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !x(e, i) || !r.equals(t[i], e[i], i, i, t, e, r))
      return !1;
  return !0;
}
function g(t, e, r) {
  var s = O(t), a = s.length;
  if (O(e).length !== a)
    return !1;
  for (var i, n, u; a-- > 0; )
    if (i = s[a], i === I && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !x(e, i) || !r.equals(t[i], e[i], i, i, t, e, r) || (n = $(t, i), u = $(e, i), (n || u) && (!n || !u || n.configurable !== u.configurable || n.enumerable !== u.enumerable || n.writable !== u.writable)))
      return !1;
  return !0;
}
function se(t, e) {
  return b(t.valueOf(), e.valueOf());
}
function ae(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function j(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, a = t.values(), i, n; (i = a.next()) && !i.done; ) {
    for (var u = e.values(), c = !1, p = 0; (n = u.next()) && !n.done; )
      !c && !s[p] && (c = r.equals(i.value, n.value, i.value, n.value, t, e, r)) && (s[p] = !0), p++;
    if (!c)
      return !1;
  }
  return !0;
}
function ie(t, e) {
  var r = t.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (t[r] !== e[r])
      return !1;
  return !0;
}
var ne = "[object Arguments]", oe = "[object Boolean]", ue = "[object Date]", le = "[object Map]", ce = "[object Number]", he = "[object Object]", fe = "[object RegExp]", pe = "[object Set]", me = "[object String]", de = Array.isArray, S = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, M = Object.assign, Ne = Object.prototype.toString.call.bind(Object.prototype.toString);
function be(t) {
  var e = t.areArraysEqual, r = t.areDatesEqual, s = t.areMapsEqual, a = t.areObjectsEqual, i = t.arePrimitiveWrappersEqual, n = t.areRegExpsEqual, u = t.areSetsEqual, c = t.areTypedArraysEqual;
  return function(o, l, h) {
    if (o === l)
      return !0;
    if (o == null || l == null || typeof o != "object" || typeof l != "object")
      return o !== o && l !== l;
    var d = o.constructor;
    if (d !== l.constructor)
      return !1;
    if (d === Object)
      return a(o, l, h);
    if (de(o))
      return e(o, l, h);
    if (S != null && S(o))
      return c(o, l, h);
    if (d === Date)
      return r(o, l, h);
    if (d === RegExp)
      return n(o, l, h);
    if (d === Map)
      return s(o, l, h);
    if (d === Set)
      return u(o, l, h);
    var m = Ne(o);
    return m === ue ? r(o, l, h) : m === fe ? n(o, l, h) : m === le ? s(o, l, h) : m === pe ? u(o, l, h) : m === he ? typeof o.then != "function" && typeof l.then != "function" && a(o, l, h) : m === ne ? a(o, l, h) : m === oe || m === ce || m === me ? i(o, l, h) : !1;
  };
}
function ge(t) {
  var e = t.circular, r = t.createCustomConfig, s = t.strict, a = {
    areArraysEqual: s ? g : ee,
    areDatesEqual: te,
    areMapsEqual: s ? w(A, g) : A,
    areObjectsEqual: s ? g : re,
    arePrimitiveWrappersEqual: se,
    areRegExpsEqual: ae,
    areSetsEqual: s ? w(j, g) : j,
    areTypedArraysEqual: s ? g : ie
  };
  if (r && (a = M({}, a, r(a))), e) {
    var i = v(a.areArraysEqual), n = v(a.areMapsEqual), u = v(a.areObjectsEqual), c = v(a.areSetsEqual);
    a = M({}, a, {
      areArraysEqual: i,
      areMapsEqual: n,
      areObjectsEqual: u,
      areSetsEqual: c
    });
  }
  return a;
}
function ve(t) {
  return function(e, r, s, a, i, n, u) {
    return t(e, r, u);
  };
}
function ye(t) {
  var e = t.circular, r = t.comparator, s = t.createState, a = t.equals, i = t.strict;
  if (s)
    return function(c, p) {
      var o = s(), l = o.cache, h = l === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : l, d = o.meta;
      return r(c, p, {
        cache: h,
        equals: a,
        meta: d,
        strict: i
      });
    };
  if (e)
    return function(c, p) {
      return r(c, p, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: a,
        meta: void 0,
        strict: i
      });
    };
  var n = {
    cache: void 0,
    equals: a,
    meta: void 0,
    strict: i
  };
  return function(c, p) {
    return r(c, p, n);
  };
}
var Ee = N();
N({ strict: !0 });
N({ circular: !0 });
N({
  circular: !0,
  strict: !0
});
N({
  createInternalComparator: function() {
    return b;
  }
});
N({
  strict: !0,
  createInternalComparator: function() {
    return b;
  }
});
N({
  circular: !0,
  createInternalComparator: function() {
    return b;
  }
});
N({
  circular: !0,
  createInternalComparator: function() {
    return b;
  },
  strict: !0
});
function N(t) {
  t === void 0 && (t = {});
  var e = t.circular, r = e === void 0 ? !1 : e, s = t.createInternalComparator, a = t.createState, i = t.strict, n = i === void 0 ? !1 : i, u = ge(t), c = be(u), p = s ? s(c) : ve(c);
  return ye({ circular: r, comparator: c, createState: a, equals: p, strict: n });
}
function Ue(t, e) {
  return Ee(t, e);
}
function P(t, e, r) {
  return JSON.stringify(t, (a, i) => {
    let n = i;
    return e && (n = e(a, n)), n === void 0 && (n = null), n;
  }, r);
}
function we(t, e) {
  function r(a) {
    return Object.keys(a).forEach((i) => {
      a[i] === null ? a[i] = void 0 : typeof a[i] == "object" && (a[i] = r(a[i]));
    }), a;
  }
  const s = JSON.parse(t, e);
  if (s !== null)
    return typeof s == "object" ? r(s) : s;
}
function Ke(t) {
  try {
    const e = P(t);
    return e === P(we(e));
  } catch {
    return !1;
  }
}
const We = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;"), Oe = {
  title: "Platform.Bible menus",
  type: "object",
  properties: {
    mainMenu: {
      description: "Top level menu for the application",
      $ref: "#/$defs/multiColumnMenu"
    },
    defaultWebViewTopMenu: {
      description: "Default top menu for web views that don't specify their own",
      $ref: "#/$defs/multiColumnMenu"
    },
    defaultWebViewContextMenu: {
      description: "Default context menu for web views that don't specify their own",
      $ref: "#/$defs/singleColumnMenu"
    },
    webViewMenus: {
      description: "Menus that apply per web view in the application",
      type: "object",
      patternProperties: {
        "^[\\w\\-]+\\.[\\w\\-]+$": {
          $ref: "#/$defs/menusForOneWebView"
        }
      },
      additionalProperties: !1
    }
  },
  required: ["mainMenu", "defaultWebViewTopMenu", "defaultWebViewContextMenu", "webViewMenus"],
  additionalProperties: !1,
  $defs: {
    localizeKey: {
      description: "Identifier for a string that will be localized in a menu based on the user's UI language",
      type: "string",
      pattern: "^%[\\w\\-\\.]+%$"
    },
    referencedItem: {
      description: "Name of some UI element (i.e., tab, column, group, menu item) or some PAPI object (i.e., command)",
      type: "string",
      pattern: "^[\\w\\-]+\\.[\\w\\-]+$"
    },
    columnsWithHeaders: {
      description: "Group of columns that can be combined with other columns to form a multi-column menu",
      type: "object",
      patternProperties: {
        "^[\\w\\-]+\\.[\\w\\-]+$": {
          description: "Single column with a header string",
          type: "object",
          properties: {
            label: {
              description: "Header text for this this column in the UI",
              $ref: "#/$defs/localizeKey"
            },
            localizeNotes: {
              description: "Additional information provided by developers to help people who perform localization",
              type: "string"
            },
            order: {
              description: "Relative order of this column compared to other columns (sorted ascending)",
              type: "number"
            },
            isExtensible: {
              description: "Defines whether contributions are allowed to add menu groups to this column",
              type: "boolean"
            }
          },
          required: ["label", "order"],
          additionalProperties: !1
        }
      },
      properties: {
        isExtensible: {
          description: "Defines whether contributions are allowed to add columns to this multi-column menu",
          type: "boolean"
        }
      }
    },
    menuGroups: {
      description: "Group of menu items that can be combined with other groups to form a single menu/submenu. Groups are separated using a line within the menu/submenu.",
      type: "object",
      patternProperties: {
        "^[\\w\\-]+\\.[\\w\\-]+$": {
          description: "Single group that contains menu items",
          type: "object",
          oneOf: [
            {
              properties: {
                column: {
                  description: "Column where this group belongs, not required for single column menus",
                  $ref: "#/$defs/referencedItem"
                },
                order: {
                  description: "Relative order of this group compared to other groups in the same column or submenu (sorted ascending)",
                  type: "number"
                },
                isExtensible: {
                  description: "Defines whether contributions are allowed to add menu items to this menu group",
                  type: "boolean"
                }
              },
              required: ["order"],
              additionalProperties: !1
            },
            {
              properties: {
                menuItem: {
                  description: "Menu item that anchors the submenu where this group belongs",
                  $ref: "#/$defs/referencedItem"
                },
                order: {
                  description: "Relative order of this group compared to other groups in the same column or submenu (sorted ascending)",
                  type: "number"
                },
                isExtensible: {
                  description: "Defines whether contributions are allowed to add menu items to this menu group",
                  type: "boolean"
                }
              },
              required: ["menuItem", "order"],
              additionalProperties: !1
            }
          ]
        }
      },
      additionalProperties: !1
    },
    menuItem: {
      description: "Single item in a menu that can be clicked on to take an action or can be the parent of a submenu",
      type: "object",
      oneOf: [
        {
          properties: {
            id: {
              description: "ID for this menu item that holds a submenu",
              $ref: "#/$defs/referencedItem"
            }
          },
          required: ["id"]
        },
        {
          properties: {
            command: {
              description: "Name of the PAPI command to run when this menu item is selected.",
              $ref: "#/$defs/referencedItem"
            },
            iconPathBefore: {
              description: "Path to the icon to display before the menu text",
              type: "string"
            },
            iconPathAfter: {
              description: "Path to the icon to display after the menu text",
              type: "string"
            }
          },
          required: ["command"]
        }
      ],
      properties: {
        label: {
          description: "Key that represents the text of this menu item to display",
          $ref: "#/$defs/localizeKey"
        },
        tooltip: {
          description: "Key that represents the text to display if a mouse pointer hovers over the menu item",
          $ref: "#/$defs/localizeKey"
        },
        searchTerms: {
          description: "Key that represents additional words the platform should reference when users are searching for menu items",
          $ref: "#/$defs/localizeKey"
        },
        localizeNotes: {
          description: "Additional information provided by developers to help people who perform localization",
          type: "string"
        },
        group: {
          description: "Group to which this menu item belongs",
          $ref: "#/$defs/referencedItem"
        },
        order: {
          description: "Relative order of this menu item compared to other menu items in the same group (sorted ascending)",
          type: "number"
        }
      },
      required: ["label", "group", "order"],
      unevaluatedProperties: !1
    },
    groupsAndItems: {
      description: "Core schema for a column",
      type: "object",
      properties: {
        groups: {
          description: "Groups that belong in this menu",
          $ref: "#/$defs/menuGroups"
        },
        items: {
          description: "List of menu items that belong in this menu",
          type: "array",
          items: { $ref: "#/$defs/menuItem" },
          uniqueItems: !0
        }
      },
      required: ["groups", "items"]
    },
    singleColumnMenu: {
      description: "Menu that contains a column without a header",
      type: "object",
      allOf: [{ $ref: "#/$defs/groupsAndItems" }],
      unevaluatedProperties: !1
    },
    multiColumnMenu: {
      description: "Menu that can contain multiple columns with headers",
      type: "object",
      allOf: [
        { $ref: "#/$defs/groupsAndItems" },
        {
          properties: {
            columns: {
              description: "Columns that belong in this menu",
              $ref: "#/$defs/columnsWithHeaders"
            }
          },
          required: ["columns"]
        }
      ],
      unevaluatedProperties: !1
    },
    menusForOneWebView: {
      description: "Set of menus that are associated with a single tab",
      type: "object",
      properties: {
        includeDefaults: {
          description: "Indicates whether the platform default menus should be included for this webview",
          type: "boolean"
        },
        topMenu: {
          description: "Menu that opens when you click on the top left corner of a tab",
          $ref: "#/$defs/multiColumnMenu"
        },
        contextMenu: {
          description: "Menu that opens when you right click on the main body/area of a tab",
          $ref: "#/$defs/singleColumnMenu"
        }
      },
      additionalProperties: !1
    }
  }
};
Object.freeze(Oe);
export {
  Ae as AsyncVariable,
  Ie as DocumentCombinerEngine,
  _ as FIRST_SCR_BOOK_NUM,
  k as FIRST_SCR_CHAPTER_NUM,
  F as FIRST_SCR_VERSE_NUM,
  L as LAST_SCR_BOOK_NUM,
  W as Mutex,
  Je as MutexMap,
  Re as PlatformEventEmitter,
  De as UnsubscriberAsyncList,
  He as aggregateUnsubscriberAsyncs,
  Ve as aggregateUnsubscribers,
  xe as createSyncProxyForAsyncObject,
  Se as debounce,
  y as deepClone,
  Ue as deepEqual,
  we as deserialize,
  Te as getAllObjectFunctionNames,
  Z as getChaptersForBook,
  Pe as getErrorMessage,
  Me as groupBy,
  We as htmlEncode,
  Ke as isSerializable,
  B as isString,
  Oe as menuDocumentSchema,
  je as newGuid,
  ze as offsetBook,
  Be as offsetChapter,
  Ge as offsetVerse,
  P as serialize,
  H as wait,
  Ce as waitForDuration
};
//# sourceMappingURL=index.js.map
