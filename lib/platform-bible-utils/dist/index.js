var J = Object.defineProperty;
var x = (r, e, t) => e in r ? J(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var m = (r, e, t) => (x(r, typeof e != "symbol" ? e + "" : e, t), t);
class be {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all.
   */
  constructor(e, t = 1e4) {
    m(this, "variableName");
    m(this, "promiseToValue");
    m(this, "resolver");
    m(this, "rejecter");
    this.variableName = e, this.promiseToValue = new Promise((s, a) => {
      this.resolver = s, this.rejecter = a;
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
  resolveToValue(e, t = !1) {
    if (this.resolver)
      console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
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
  rejectWithReason(e, t = !1) {
    if (this.rejecter)
      console.debug(`${this.variableName} is being rejected now`), this.rejecter(e), this.complete();
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
class ye {
  /**
   * Create a DocumentCombinerEngine instance
   *
   * @param startingDocument This is the first document that will be used when composing the output
   * @param copyDocuments If true, this instance will perform a deep copy of all provided documents
   *   before composing the output. If false, then changes made to provided documents after they are
   *   contributed will be reflected in the next time output is composed.
   */
  constructor(e, t) {
    m(this, "startingDocument");
    m(this, "contributions", /* @__PURE__ */ new Map());
    m(this, "latestOutput");
    m(this, "copyDocuments");
    this.startingDocument = e, this.copyDocuments = t, this.updateBaseDocument(e);
  }
  /** Gets the latest output of all composed documents */
  get output() {
    return this.latestOutput;
  }
  /**
   * Update the starting document for composition process
   *
   * @param startingDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateStartingDocument(e), this.startingDocument = this.copyDocuments ? d(e) : e, this.rebuild();
  }
  /**
   * Add or update one of the contribution documents for the composition process
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   * @returns Recalculated output document given the new or updated contribution and existing other
   *   documents
   */
  addOrUpdateContribution(e, t) {
    this.validateContribution(e, t);
    const s = this.contributions.get(e), a = this.copyDocuments && t ? d(t) : t;
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
    const t = this.contributions.get(e);
    if (!t)
      throw new Error("{documentKey} does not exist");
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (s) {
      throw this.contributions.set(e, t), new Error(`Error when deleting the document named ${e}: ${s}`);
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
      const t = d(this.startingDocument);
      return this.validateOutput(t), this.latestOutput = t, this.latestOutput;
    }
    let e = this.startingDocument;
    return this.contributions.forEach((t) => {
      e = this.mergeObjects(e, t), this.validateOutput(e);
    }), this.latestOutput = e, this.latestOutput;
  }
  /**
   * Recursively merge the properties of one object (copyFrom) into another (startingPoint). Throws
   * if copyFrom would overwrite values already existing in startingPoint.
   *
   * @param startingPoint Object that is the starting point for the return value
   * @param copyFrom Object whose values are copied into the return value
   * @returns Object that is the combination of the two documents
   */
  mergeObjects(e, t) {
    const s = d(e);
    return t && Object.keys(t).forEach((a) => {
      if (Object.hasOwn(e, a))
        if (B(e[a], t[a]))
          s[a] = this.mergeObjects(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            e[a],
            t[a]
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (I(e[a], t[a]))
          s[a] = s[a].concat(t[a]);
        else
          throw new Error(`Cannot merge objects: key "${a}" already exists in the target object`);
      else
        s[a] = t[a];
    }), s;
  }
}
function d(r) {
  return JSON.parse(JSON.stringify(r));
}
function B(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || Array.isArray(t)) && (e = !1);
  }), e;
}
function I(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || !Array.isArray(t)) && (e = !1);
  }), e;
}
class we {
  constructor(e = "Anonymous") {
    m(this, "unsubscribers", /* @__PURE__ */ new Set());
    this.name = e;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...e) {
    e.forEach((t) => {
      "dispose" in t ? this.unsubscribers.add(t.dispose) : this.unsubscribers.add(t);
    });
  }
  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * @returns `true` if all unsubscribers succeeded, `false` otherwise.
   */
  async runAllUnsubscribers() {
    const e = [...this.unsubscribers].map((s) => s()), t = await Promise.all(e);
    return this.unsubscribers.clear(), t.every((s, a) => (s || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${a} failed!`), s));
  }
}
class qe {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    m(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    m(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    m(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    m(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    m(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    m(this, "emit", (e) => {
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
        const t = this.subscriptions.indexOf(e);
        return t < 0 ? !1 : (this.subscriptions.splice(t, 1), !0);
      };
    }), this.lazyEvent;
  }
  /**
   * Function that runs the subscriptions for the event. Added here so children can override emit
   * and still call the base functionality. See NetworkEventEmitter.emit for example
   */
  emitFn(e) {
    var t;
    this.assertNotDisposed(), (t = this.subscriptions) == null || t.forEach((s) => s(e));
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
const M = [
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
], G = 1, z = M.length - 1, H = 1, U = 1, V = (r) => {
  var e;
  return ((e = M[r]) == null ? void 0 : e.chapters) ?? -1;
}, Ae = (r, e) => ({
  bookNum: Math.max(G, Math.min(r.bookNum + e, z)),
  chapterNum: 1,
  verseNum: 1
}), Se = (r, e) => ({
  ...r,
  chapterNum: Math.min(
    Math.max(H, r.chapterNum + e),
    V(r.bookNum)
  ),
  verseNum: 1
}), je = (r, e) => ({
  ...r,
  verseNum: Math.max(U, r.verseNum + e)
}), Te = (r) => (...e) => r.map((s) => s(...e)).every((s) => s), Ce = (r) => async (...e) => {
  const t = r.map(async (s) => s(...e));
  return (await Promise.all(t)).every((s) => s);
};
function Pe() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (r) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~r) * 65536 >> r).toString(16).padStart(4, "0")
    )
  );
}
function _(r) {
  return typeof r == "string" || r instanceof String;
}
function Me(r, e = 300) {
  if (_(r))
    throw new Error("Tried to debounce a string! Could be XSS");
  let t;
  return (...s) => {
    clearTimeout(t), t = setTimeout(() => r(...s), e);
  };
}
function Re(r, e, t) {
  const s = /* @__PURE__ */ new Map();
  return r.forEach((a) => {
    const i = e(a), n = s.get(i), o = t ? t(a, i) : a;
    n ? n.push(o) : s.set(i, [o]);
  }), s;
}
function L(r) {
  return typeof r == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  r !== null && "message" in r && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof r.message == "string";
}
function K(r) {
  if (L(r))
    return r;
  try {
    return new Error(JSON.stringify(r));
  } catch {
    return new Error(String(r));
  }
}
function $e(r) {
  return K(r).message;
}
function W(r) {
  return new Promise((e) => setTimeout(e, r));
}
function De(r, e) {
  const t = W(e).then(() => {
  });
  return Promise.any([t, r()]);
}
function Je(r, e = "obj") {
  const t = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(r).forEach((a) => {
    try {
      typeof r[a] == "function" && t.add(a);
    } catch (i) {
      console.debug(`Skipping ${a} on ${e} due to error: ${i}`);
    }
  });
  let s = Object.getPrototypeOf(r);
  for (; s && Object.getPrototypeOf(s); )
    Object.getOwnPropertyNames(s).forEach((a) => {
      try {
        typeof r[a] == "function" && t.add(a);
      } catch (i) {
        console.debug(`Skipping ${a} on ${e}'s prototype due to error: ${i}`);
      }
    }), s = Object.getPrototypeOf(s);
  return t;
}
var k = Object.getOwnPropertyNames, F = Object.getOwnPropertySymbols, Z = Object.prototype.hasOwnProperty;
function y(r, e) {
  return function(s, a, i) {
    return r(s, a, i) && e(s, a, i);
  };
}
function O(r) {
  return function(t, s, a) {
    if (!t || !s || typeof t != "object" || typeof s != "object")
      return r(t, s, a);
    var i = a.cache, n = i.get(t), o = i.get(s);
    if (n && o)
      return n === s && o === t;
    i.set(t, s), i.set(s, t);
    var c = r(t, s, a);
    return i.delete(t), i.delete(s), c;
  };
}
function w(r) {
  return k(r).concat(F(r));
}
var R = Object.hasOwn || function(r, e) {
  return Z.call(r, e);
};
function E(r, e) {
  return r || e ? r === e : r === e || r !== r && e !== e;
}
var $ = "_owner", q = Object.getOwnPropertyDescriptor, A = Object.keys;
function X(r, e, t) {
  var s = r.length;
  if (e.length !== s)
    return !1;
  for (; s-- > 0; )
    if (!t.equals(r[s], e[s], s, s, r, e, t))
      return !1;
  return !0;
}
function Q(r, e) {
  return E(r.getTime(), e.getTime());
}
function S(r, e, t) {
  if (r.size !== e.size)
    return !1;
  for (var s = {}, a = r.entries(), i = 0, n, o; (n = a.next()) && !n.done; ) {
    for (var c = e.entries(), f = !1, u = 0; (o = c.next()) && !o.done; ) {
      var l = n.value, h = l[0], N = l[1], p = o.value, b = p[0], D = p[1];
      !f && !s[u] && (f = t.equals(h, b, i, u, r, e, t) && t.equals(N, D, h, b, r, e, t)) && (s[u] = !0), u++;
    }
    if (!f)
      return !1;
    i++;
  }
  return !0;
}
function Y(r, e, t) {
  var s = A(r), a = s.length;
  if (A(e).length !== a)
    return !1;
  for (var i; a-- > 0; )
    if (i = s[a], i === $ && (r.$$typeof || e.$$typeof) && r.$$typeof !== e.$$typeof || !R(e, i) || !t.equals(r[i], e[i], i, i, r, e, t))
      return !1;
  return !0;
}
function g(r, e, t) {
  var s = w(r), a = s.length;
  if (w(e).length !== a)
    return !1;
  for (var i, n, o; a-- > 0; )
    if (i = s[a], i === $ && (r.$$typeof || e.$$typeof) && r.$$typeof !== e.$$typeof || !R(e, i) || !t.equals(r[i], e[i], i, i, r, e, t) || (n = q(r, i), o = q(e, i), (n || o) && (!n || !o || n.configurable !== o.configurable || n.enumerable !== o.enumerable || n.writable !== o.writable)))
      return !1;
  return !0;
}
function ee(r, e) {
  return E(r.valueOf(), e.valueOf());
}
function re(r, e) {
  return r.source === e.source && r.flags === e.flags;
}
function j(r, e, t) {
  if (r.size !== e.size)
    return !1;
  for (var s = {}, a = r.values(), i, n; (i = a.next()) && !i.done; ) {
    for (var o = e.values(), c = !1, f = 0; (n = o.next()) && !n.done; )
      !c && !s[f] && (c = t.equals(i.value, n.value, i.value, n.value, r, e, t)) && (s[f] = !0), f++;
    if (!c)
      return !1;
  }
  return !0;
}
function te(r, e) {
  var t = r.length;
  if (e.length !== t)
    return !1;
  for (; t-- > 0; )
    if (r[t] !== e[t])
      return !1;
  return !0;
}
var se = "[object Arguments]", ae = "[object Boolean]", ie = "[object Date]", ne = "[object Map]", ue = "[object Number]", oe = "[object Object]", le = "[object RegExp]", ce = "[object Set]", he = "[object String]", fe = Array.isArray, T = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, C = Object.assign, me = Object.prototype.toString.call.bind(Object.prototype.toString);
function pe(r) {
  var e = r.areArraysEqual, t = r.areDatesEqual, s = r.areMapsEqual, a = r.areObjectsEqual, i = r.arePrimitiveWrappersEqual, n = r.areRegExpsEqual, o = r.areSetsEqual, c = r.areTypedArraysEqual;
  return function(u, l, h) {
    if (u === l)
      return !0;
    if (u == null || l == null || typeof u != "object" || typeof l != "object")
      return u !== u && l !== l;
    var N = u.constructor;
    if (N !== l.constructor)
      return !1;
    if (N === Object)
      return a(u, l, h);
    if (fe(u))
      return e(u, l, h);
    if (T != null && T(u))
      return c(u, l, h);
    if (N === Date)
      return t(u, l, h);
    if (N === RegExp)
      return n(u, l, h);
    if (N === Map)
      return s(u, l, h);
    if (N === Set)
      return o(u, l, h);
    var p = me(u);
    return p === ie ? t(u, l, h) : p === le ? n(u, l, h) : p === ne ? s(u, l, h) : p === ce ? o(u, l, h) : p === oe ? typeof u.then != "function" && typeof l.then != "function" && a(u, l, h) : p === se ? a(u, l, h) : p === ae || p === ue || p === he ? i(u, l, h) : !1;
  };
}
function Ne(r) {
  var e = r.circular, t = r.createCustomConfig, s = r.strict, a = {
    areArraysEqual: s ? g : X,
    areDatesEqual: Q,
    areMapsEqual: s ? y(S, g) : S,
    areObjectsEqual: s ? g : Y,
    arePrimitiveWrappersEqual: ee,
    areRegExpsEqual: re,
    areSetsEqual: s ? y(j, g) : j,
    areTypedArraysEqual: s ? g : te
  };
  if (t && (a = C({}, a, t(a))), e) {
    var i = O(a.areArraysEqual), n = O(a.areMapsEqual), o = O(a.areObjectsEqual), c = O(a.areSetsEqual);
    a = C({}, a, {
      areArraysEqual: i,
      areMapsEqual: n,
      areObjectsEqual: o,
      areSetsEqual: c
    });
  }
  return a;
}
function ve(r) {
  return function(e, t, s, a, i, n, o) {
    return r(e, t, o);
  };
}
function Ee(r) {
  var e = r.circular, t = r.comparator, s = r.createState, a = r.equals, i = r.strict;
  if (s)
    return function(c, f) {
      var u = s(), l = u.cache, h = l === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : l, N = u.meta;
      return t(c, f, {
        cache: h,
        equals: a,
        meta: N,
        strict: i
      });
    };
  if (e)
    return function(c, f) {
      return t(c, f, {
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
  return function(c, f) {
    return t(c, f, n);
  };
}
var ge = v();
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
function v(r) {
  r === void 0 && (r = {});
  var e = r.circular, t = e === void 0 ? !1 : e, s = r.createInternalComparator, a = r.createState, i = r.strict, n = i === void 0 ? !1 : i, o = Ne(r), c = pe(o), f = s ? s(c) : ve(c);
  return Ee({ circular: t, comparator: c, createState: a, equals: f, strict: n });
}
function xe(r, e) {
  return ge(r, e);
}
function P(r, e, t) {
  return JSON.stringify(r, (a, i) => {
    let n = i;
    return e && (n = e(a, n)), n === void 0 && (n = null), n;
  }, t);
}
function de(r, e) {
  function t(a) {
    return Object.keys(a).forEach((i) => {
      a[i] === null ? a[i] = void 0 : typeof a[i] == "object" && (a[i] = t(a[i]));
    }), a;
  }
  const s = JSON.parse(r, e);
  if (s !== null)
    return typeof s == "object" ? t(s) : s;
}
function Be(r) {
  try {
    const e = P(r);
    return e === P(de(e));
  } catch {
    return !1;
  }
}
const Ie = (r) => r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
export {
  be as AsyncVariable,
  ye as DocumentCombinerEngine,
  G as FIRST_SCR_BOOK_NUM,
  H as FIRST_SCR_CHAPTER_NUM,
  U as FIRST_SCR_VERSE_NUM,
  z as LAST_SCR_BOOK_NUM,
  qe as PlatformEventEmitter,
  we as UnsubscriberAsyncList,
  Ce as aggregateUnsubscriberAsyncs,
  Te as aggregateUnsubscribers,
  Me as debounce,
  xe as deepEqual,
  de as deserialize,
  Je as getAllObjectFunctionNames,
  V as getChaptersForBook,
  $e as getErrorMessage,
  Re as groupBy,
  Ie as htmlEncode,
  Be as isSerializable,
  _ as isString,
  Pe as newGuid,
  Ae as offsetBook,
  Se as offsetChapter,
  je as offsetVerse,
  P as serialize,
  W as wait,
  De as waitForDuration
};
//# sourceMappingURL=index.js.map
