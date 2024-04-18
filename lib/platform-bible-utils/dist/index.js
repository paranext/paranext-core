var oe = Object.defineProperty;
var ae = (t, e, r) => e in t ? oe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var d = (t, e, r) => (ae(t, typeof e != "symbol" ? e + "" : e, r), r);
import { Mutex as ue } from "async-mutex";
class dt {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all.
   */
  constructor(e, r = 1e4) {
    d(this, "variableName");
    d(this, "promiseToValue");
    d(this, "resolver");
    d(this, "rejecter");
    this.variableName = e, this.promiseToValue = new Promise((s, i) => {
      this.resolver = s, this.rejecter = i;
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
var le = Object.getOwnPropertyNames, ce = Object.getOwnPropertySymbols, fe = Object.prototype.hasOwnProperty;
function x(t, e) {
  return function(s, i, n) {
    return t(s, i, n) && e(s, i, n);
  };
}
function w(t) {
  return function(r, s, i) {
    if (!r || !s || typeof r != "object" || typeof s != "object")
      return t(r, s, i);
    var n = i.cache, o = n.get(r), a = n.get(s);
    if (o && a)
      return o === s && a === r;
    n.set(r, s), n.set(s, r);
    var u = t(r, s, i);
    return n.delete(r), n.delete(s), u;
  };
}
function R(t) {
  return le(t).concat(ce(t));
}
var W = Object.hasOwn || function(t, e) {
  return fe.call(t, e);
};
function v(t, e) {
  return t || e ? t === e : t === e || t !== t && e !== e;
}
var L = "_owner", I = Object.getOwnPropertyDescriptor, B = Object.keys;
function pe(t, e, r) {
  var s = t.length;
  if (e.length !== s)
    return !1;
  for (; s-- > 0; )
    if (!r.equals(t[s], e[s], s, s, t, e, r))
      return !1;
  return !0;
}
function de(t, e) {
  return v(t.getTime(), e.getTime());
}
function z(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, i = t.entries(), n = 0, o, a; (o = i.next()) && !o.done; ) {
    for (var u = e.entries(), p = !1, l = 0; (a = u.next()) && !a.done; ) {
      var c = o.value, f = c[0], g = c[1], m = a.value, N = m[0], P = m[1];
      !p && !s[l] && (p = r.equals(f, N, n, l, t, e, r) && r.equals(g, P, f, N, t, e, r)) && (s[l] = !0), l++;
    }
    if (!p)
      return !1;
    n++;
  }
  return !0;
}
function he(t, e, r) {
  var s = B(t), i = s.length;
  if (B(e).length !== i)
    return !1;
  for (var n; i-- > 0; )
    if (n = s[i], n === L && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !W(e, n) || !r.equals(t[n], e[n], n, n, t, e, r))
      return !1;
  return !0;
}
function $(t, e, r) {
  var s = R(t), i = s.length;
  if (R(e).length !== i)
    return !1;
  for (var n, o, a; i-- > 0; )
    if (n = s[i], n === L && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !W(e, n) || !r.equals(t[n], e[n], n, n, t, e, r) || (o = I(t, n), a = I(e, n), (o || a) && (!o || !a || o.configurable !== a.configurable || o.enumerable !== a.enumerable || o.writable !== a.writable)))
      return !1;
  return !0;
}
function me(t, e) {
  return v(t.valueOf(), e.valueOf());
}
function ge(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function G(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, i = t.values(), n, o; (n = i.next()) && !n.done; ) {
    for (var a = e.values(), u = !1, p = 0; (o = a.next()) && !o.done; )
      !u && !s[p] && (u = r.equals(n.value, o.value, n.value, o.value, t, e, r)) && (s[p] = !0), p++;
    if (!u)
      return !1;
  }
  return !0;
}
function be(t, e) {
  var r = t.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (t[r] !== e[r])
      return !1;
  return !0;
}
var ye = "[object Arguments]", ve = "[object Boolean]", Ne = "[object Date]", $e = "[object Map]", we = "[object Number]", Ee = "[object Object]", Oe = "[object RegExp]", je = "[object Set]", Se = "[object String]", Pe = Array.isArray, V = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, J = Object.assign, Ae = Object.prototype.toString.call.bind(Object.prototype.toString);
function Ce(t) {
  var e = t.areArraysEqual, r = t.areDatesEqual, s = t.areMapsEqual, i = t.areObjectsEqual, n = t.arePrimitiveWrappersEqual, o = t.areRegExpsEqual, a = t.areSetsEqual, u = t.areTypedArraysEqual;
  return function(l, c, f) {
    if (l === c)
      return !0;
    if (l == null || c == null || typeof l != "object" || typeof c != "object")
      return l !== l && c !== c;
    var g = l.constructor;
    if (g !== c.constructor)
      return !1;
    if (g === Object)
      return i(l, c, f);
    if (Pe(l))
      return e(l, c, f);
    if (V != null && V(l))
      return u(l, c, f);
    if (g === Date)
      return r(l, c, f);
    if (g === RegExp)
      return o(l, c, f);
    if (g === Map)
      return s(l, c, f);
    if (g === Set)
      return a(l, c, f);
    var m = Ae(l);
    return m === Ne ? r(l, c, f) : m === Oe ? o(l, c, f) : m === $e ? s(l, c, f) : m === je ? a(l, c, f) : m === Ee ? typeof l.then != "function" && typeof c.then != "function" && i(l, c, f) : m === ye ? i(l, c, f) : m === ve || m === we || m === Se ? n(l, c, f) : !1;
  };
}
function qe(t) {
  var e = t.circular, r = t.createCustomConfig, s = t.strict, i = {
    areArraysEqual: s ? $ : pe,
    areDatesEqual: de,
    areMapsEqual: s ? x(z, $) : z,
    areObjectsEqual: s ? $ : he,
    arePrimitiveWrappersEqual: me,
    areRegExpsEqual: ge,
    areSetsEqual: s ? x(G, $) : G,
    areTypedArraysEqual: s ? $ : be
  };
  if (r && (i = J({}, i, r(i))), e) {
    var n = w(i.areArraysEqual), o = w(i.areMapsEqual), a = w(i.areObjectsEqual), u = w(i.areSetsEqual);
    i = J({}, i, {
      areArraysEqual: n,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: u
    });
  }
  return i;
}
function Te(t) {
  return function(e, r, s, i, n, o, a) {
    return t(e, r, a);
  };
}
function De(t) {
  var e = t.circular, r = t.comparator, s = t.createState, i = t.equals, n = t.strict;
  if (s)
    return function(u, p) {
      var l = s(), c = l.cache, f = c === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : c, g = l.meta;
      return r(u, p, {
        cache: f,
        equals: i,
        meta: g,
        strict: n
      });
    };
  if (e)
    return function(u, p) {
      return r(u, p, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: i,
        meta: void 0,
        strict: n
      });
    };
  var o = {
    cache: void 0,
    equals: i,
    meta: void 0,
    strict: n
  };
  return function(u, p) {
    return r(u, p, o);
  };
}
var Me = b();
b({ strict: !0 });
b({ circular: !0 });
b({
  circular: !0,
  strict: !0
});
b({
  createInternalComparator: function() {
    return v;
  }
});
b({
  strict: !0,
  createInternalComparator: function() {
    return v;
  }
});
b({
  circular: !0,
  createInternalComparator: function() {
    return v;
  }
});
b({
  circular: !0,
  createInternalComparator: function() {
    return v;
  },
  strict: !0
});
function b(t) {
  t === void 0 && (t = {});
  var e = t.circular, r = e === void 0 ? !1 : e, s = t.createInternalComparator, i = t.createState, n = t.strict, o = n === void 0 ? !1 : n, a = qe(t), u = Ce(a), p = s ? s(u) : Te(u);
  return De({ circular: r, comparator: u, createState: i, equals: p, strict: o });
}
function xe(t, e) {
  return Me(t, e);
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
    d(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    d(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    d(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    d(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    d(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    d(this, "emit", (e) => {
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
function ht() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function Ie(t) {
  return typeof t == "string" || t instanceof String;
}
function E(t) {
  return JSON.parse(JSON.stringify(t));
}
function mt(t, e = 300) {
  if (Ie(t))
    throw new Error("Tried to debounce a string! Could be XSS");
  let r;
  return (...s) => {
    clearTimeout(r), r = setTimeout(() => t(...s), e);
  };
}
function gt(t, e, r) {
  const s = /* @__PURE__ */ new Map();
  return t.forEach((i) => {
    const n = e(i), o = s.get(n), a = r ? r(i, n) : i;
    o ? o.push(a) : s.set(n, [a]);
  }), s;
}
function Be(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function ze(t) {
  if (Be(t))
    return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function bt(t) {
  return ze(t).message;
}
function Ge(t) {
  return new Promise((e) => setTimeout(e, t));
}
function yt(t, e) {
  const r = Ge(e).then(() => {
  });
  return Promise.any([r, t()]);
}
function vt(t, e = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((i) => {
    try {
      typeof t[i] == "function" && r.add(i);
    } catch (n) {
      console.debug(`Skipping ${i} on ${e} due to error: ${n}`);
    }
  });
  let s = Object.getPrototypeOf(t);
  for (; s && Object.getPrototypeOf(s); )
    Object.getOwnPropertyNames(s).forEach((i) => {
      try {
        typeof t[i] == "function" && r.add(i);
      } catch (n) {
        console.debug(`Skipping ${i} on ${e}'s prototype due to error: ${n}`);
      }
    }), s = Object.getPrototypeOf(s);
  return r;
}
function Nt(t, e = {}) {
  return new Proxy(e, {
    get(r, s) {
      return s in r ? r[s] : async (...i) => (await t())[s](...i);
    }
  });
}
class Ve {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, r) {
    d(this, "baseDocument");
    d(this, "contributions", /* @__PURE__ */ new Map());
    d(this, "latestOutput");
    d(this, "options");
    d(this, "onDidRebuildEmitter", new Re());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    d(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = r, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? E(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
  }
  /**
   * Add or update one of the contribution documents for the composition process
   *
   * Note: the order in which contribution documents are added can be considered to be indeterminate
   * as it is currently ordered by however `Map.forEach` provides the contributions. The order
   * matters when merging two arrays into one. Also, when `options.ignoreDuplicateProperties` is
   * `true`, the order also matters when adding the same property to an object that is already
   * provided previously. Please let us know if you have trouble because of indeterminate
   * contribution ordering.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   * @returns Recalculated output document given the new or updated contribution and existing other
   *   documents
   */
  addOrUpdateContribution(e, r) {
    this.validateContribution(e, r);
    const s = this.contributions.get(e);
    let i = this.options.copyDocuments && r ? E(r) : r;
    i = this.transformContributionAfterValidation(e, i), this.contributions.set(e, i);
    try {
      return this.rebuild();
    } catch (n) {
      throw s ? this.contributions.set(e, s) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${n}`);
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
      throw new Error(`${e} does not exist`);
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (s) {
      throw this.contributions.set(e, r), new Error(`Error when deleting the document named ${e}: ${s}`);
    }
  }
  /**
   * Delete all present contribution documents for the composition process and return to the base
   * document
   *
   * @returns Recalculated output document consisting only of the base document
   */
  deleteAllContributions() {
    if (this.contributions.size <= 0)
      return this.latestOutput;
    const e = [...this.contributions.entries()];
    e.forEach(([r]) => this.contributions.delete(r));
    try {
      return this.rebuild();
    } catch (r) {
      throw e.forEach(
        ([s, i]) => this.contributions.set(s, i)
      ), new Error(`Error when deleting all contributions: ${r}`);
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
      let r = E(this.baseDocument);
      return r = this.transformFinalOutputBeforeValidation(r), this.validateOutput(r), this.latestOutput = r, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((r) => {
      e = Z(
        e,
        r,
        this.options.ignoreDuplicateProperties,
        this.options.ignoreDuplicateArrayItems
      ), this.validateOutput(e);
    }), e = this.transformFinalOutputBeforeValidation(e), this.validateOutput(e), this.latestOutput = e, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
  }
  /**
   * Transform the starting document that is given to the combiner. This transformation occurs after
   * validating the base document and before combining any contributions.
   *
   * WARNING: If you do not create the combiner with option `copyDocuments: true` or clone inside
   * this method, this method will directly modify the `baseDocument` passed in.
   *
   * @param baseDocument Initial input document. Already validated via `validateBaseDocument`
   * @returns Transformed base document
   */
  // We just don't need `this` here. This is basically a no-op function that is available to child
  // classes to override
  // eslint-disable-next-line class-methods-use-this
  transformBaseDocumentAfterValidation(e) {
    return e;
  }
  /**
   * Transform the contributed document associated with `documentName`. This transformation occurs
   * after validating the contributed document and before combining with other documents.
   *
   * WARNING: If you do not create the combiner with option `copyDocuments: true` or clone inside
   * this method, this method will directly modify the contributed `document` passed in.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine. Already validated via
   *   `validateContribution`
   * @returns Transformed contributed document
   */
  // We just don't need `this` here. This is basically a no-op function that is available to child
  // classes to override
  // eslint-disable-next-line class-methods-use-this
  transformContributionAfterValidation(e, r) {
    return r;
  }
  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  validateBaseDocument(e) {
  }
  /**
   * Throw an error if the provided document is not a valid contribution document.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  validateContribution(e, r) {
  }
  /**
   * Throw an error if the provided output is not valid.
   *
   * @param output Output document that could potentially be returned to callers
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  validateOutput(e) {
  }
  /**
   * Transform the document that is the composition of the base document and all contribution
   * documents. This is the last step that will be run prior to validation via `validateOutput`
   * before `this.latestOutput` is updated to the new output.
   *
   * @param finalOutput Final output document that could potentially be returned to callers. "Final"
   *   means no further contribution documents will be merged.
   */
  // no-op intended to be overridden by child classes. Can't be static
  // eslint-disable-next-line class-methods-use-this
  transformFinalOutputBeforeValidation(e) {
    return e;
  }
}
function _(...t) {
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
function U(t, e, r) {
  return e ? r ? t ? e.concat(r) : [
    ...e,
    ...r.filter((s) => !e.some((i) => xe(s, i)))
  ] : e : r ?? [];
}
function Z(t, e, r, s) {
  let i = E(t);
  if (!e)
    return i;
  if (_(t, e)) {
    const n = i, o = t, a = e;
    Object.keys(a).forEach((u) => {
      if (Object.hasOwn(o, u)) {
        if (_(o[u], a[u]))
          n[u] = Z(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            o[u],
            a[u],
            r,
            s
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (K(o[u], a[u]))
          n[u] = U(
            s,
            o[u],
            a[u]
          );
        else if (!r)
          throw new Error(`Cannot merge objects: key "${u}" already exists in the target object`);
      } else
        n[u] = a[u];
    });
  } else
    K(t, e) && (i = U(
      s,
      i,
      e
    ));
  return i;
}
class $t extends Ve {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, r) {
    super(e, r);
  }
  get output() {
    return this.latestOutput;
  }
}
class wt {
  constructor(e = "Anonymous") {
    d(this, "unsubscribers", /* @__PURE__ */ new Set());
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
    return this.unsubscribers.clear(), r.every((s, i) => (s || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${i} failed!`), s));
  }
}
class Je extends ue {
}
class Et {
  constructor() {
    d(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(e) {
    let r = this.mutexesByID.get(e);
    return r || (r = new Je(), this.mutexesByID.set(e, r), r);
  }
}
const X = [
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
], _e = 1, Ke = X.length - 1, Ue = 1, ke = 1, He = (t) => {
  var e;
  return ((e = X[t]) == null ? void 0 : e.chapters) ?? -1;
}, Ot = (t, e) => ({
  bookNum: Math.max(_e, Math.min(t.bookNum + e, Ke)),
  chapterNum: 1,
  verseNum: 1
}), jt = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(Ue, t.chapterNum + e),
    He(t.bookNum)
  ),
  verseNum: 1
}), St = (t, e) => ({
  ...t,
  verseNum: Math.max(ke, t.verseNum + e)
}), Pt = (t) => (...e) => t.map((s) => s(...e)).every((s) => s), At = (t) => async (...e) => {
  const r = t.map(async (s) => s(...e));
  return (await Promise.all(r)).every((s) => s);
};
var k = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, y = {}, Fe = () => {
  const t = "\\ud800-\\udfff", e = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", s = "\\u20d0-\\u20ff", i = "\\u1ab0-\\u1aff", n = "\\u1dc0-\\u1dff", o = e + r + s + i + n, a = "\\ufe0e\\ufe0f", u = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", p = `[${t}]`, l = `[${o}]`, c = "\\ud83c[\\udffb-\\udfff]", f = `(?:${l}|${c})`, g = `[^${t}]`, m = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", N = "[\\ud800-\\udbff][\\udc00-\\udfff]", P = "\\u200d", te = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", re = `[${u}]`, D = `${f}?`, M = `[${a}]?`, se = `(?:${P}(?:${[g, m, N].join("|")})${M + D})*`, ie = M + D + se, ne = `(?:${[`${g}${l}?`, l, m, N, p, re].join("|")})`;
  return new RegExp(`${te}|${c}(?=${c})|${ne + ie}`, "g");
}, We = k && k.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(y, "__esModule", { value: !0 });
var j = We(Fe);
function A(t) {
  if (typeof t != "string")
    throw new Error("A string is expected as input");
  return t.match(j.default()) || [];
}
var Le = y.toArray = A;
function C(t) {
  if (typeof t != "string")
    throw new Error("Input must be a string");
  var e = t.match(j.default());
  return e === null ? 0 : e.length;
}
var Ze = y.length = C;
function Q(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  (typeof e != "number" || e < 0) && (e = 0), typeof r == "number" && r < 0 && (r = 0);
  var s = t.match(j.default());
  return s ? s.slice(e, r).join("") : "";
}
var Xe = y.substring = Q;
function Qe(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  var s = C(t);
  if (typeof e != "number" && (e = parseInt(e, 10)), e >= s)
    return "";
  e < 0 && (e += s);
  var i;
  typeof r > "u" ? i = s : (typeof r != "number" && (r = parseInt(r, 10)), i = r >= 0 ? r + e : e);
  var n = t.match(j.default());
  return n ? n.slice(e, i).join("") : "";
}
var Ye = y.substr = Qe;
function et(t, e, r, s) {
  if (e === void 0 && (e = 16), r === void 0 && (r = "#"), s === void 0 && (s = "right"), typeof t != "string" || typeof e != "number")
    throw new Error("Invalid arguments specified");
  if (["left", "right"].indexOf(s) === -1)
    throw new Error("Pad position should be either left or right");
  typeof r != "string" && (r = String(r));
  var i = C(t);
  if (i > e)
    return Q(t, 0, e);
  if (i < e) {
    var n = r.repeat(e - i);
    return s === "left" ? n + t : t + n;
  }
  return t;
}
var Y = y.limit = et;
function tt(t, e, r) {
  if (r === void 0 && (r = 0), typeof t != "string")
    throw new Error("Input must be a string");
  if (t === "")
    return e === "" ? 0 : -1;
  r = Number(r), r = isNaN(r) ? 0 : r, e = String(e);
  var s = A(t);
  if (r >= s.length)
    return e === "" ? s.length : -1;
  if (e === "")
    return r;
  var i = A(e), n = !1, o;
  for (o = r; o < s.length; o += 1) {
    for (var a = 0; a < i.length && i[a] === s[o + a]; )
      a += 1;
    if (a === i.length && i[a - 1] === s[o + a - 1]) {
      n = !0;
      break;
    }
  }
  return n ? o : -1;
}
var rt = y.indexOf = tt;
function Ct(t, e) {
  if (!(e > h(t) || e < -h(t)))
    return S(t, e, 1);
}
function qt(t, e) {
  return e < 0 || e > h(t) - 1 ? "" : S(t, e, 1);
}
function Tt(t, e) {
  if (!(e < 0 || e > h(t) - 1))
    return S(t, e, 1).codePointAt(0);
}
function Dt(t, e, r = h(t)) {
  const s = it(t, e);
  return !(s === -1 || s + h(e) !== r);
}
function st(t, e, r = 0) {
  const s = O(t, r);
  return q(s, e) !== -1;
}
function q(t, e, r = 0) {
  return rt(t, e, r);
}
function it(t, e, r) {
  let s = r === void 0 ? h(t) : r;
  s < 0 ? s = 0 : s >= h(t) && (s = h(t) - 1);
  for (let i = s; i >= 0; i--)
    if (S(t, i, h(e)) === e)
      return i;
  return -1;
}
function h(t) {
  return Ze(t);
}
function Mt(t, e) {
  const r = e.toUpperCase();
  return r === "NONE" ? t : t.normalize(r);
}
function xt(t, e, r = " ") {
  return e <= h(t) ? t : Y(t, e, r, "right");
}
function Rt(t, e, r = " ") {
  return e <= h(t) ? t : Y(t, e, r, "left");
}
function H(t, e) {
  return e > t ? t : e < -t ? 0 : e < 0 ? e + t : e;
}
function It(t, e, r) {
  const s = h(t);
  if (e > s || r && (e > r && !(e >= 0 && e < s && r < 0 && r > -s) || r < -s))
    return "";
  const i = H(s, e), n = r ? H(s, r) : void 0;
  return O(t, i, n);
}
function Bt(t, e, r) {
  const s = [];
  if (r !== void 0 && r <= 0)
    return [t];
  if (e === "")
    return nt(t).slice(0, r);
  let i = e;
  (typeof e == "string" || e instanceof RegExp && !st(e.flags, "g")) && (i = new RegExp(e, "g"));
  const n = t.match(i);
  let o = 0;
  if (!n)
    return [t];
  for (let a = 0; a < (r ? r - 1 : n.length); a++) {
    const u = q(t, n[a], o), p = h(n[a]);
    if (s.push(O(t, o, u)), o = u + p, r !== void 0 && s.length === r)
      break;
  }
  return s.push(O(t, o)), s;
}
function zt(t, e, r = 0) {
  return q(t, e, r) === r;
}
function S(t, e = 0, r = h(t) - e) {
  return Ye(t, e, r);
}
function O(t, e, r = h(t)) {
  return Xe(t, e, r);
}
function nt(t) {
  return Le(t);
}
function F(t, e, r) {
  return JSON.stringify(t, (i, n) => {
    let o = n;
    return e && (o = e(i, o)), o === void 0 && (o = null), o;
  }, r);
}
function ot(t, e) {
  function r(i) {
    return Object.keys(i).forEach((n) => {
      i[n] === null ? i[n] = void 0 : typeof i[n] == "object" && (i[n] = r(i[n]));
    }), i;
  }
  const s = JSON.parse(t, e);
  if (s !== null)
    return typeof s == "object" ? r(s) : s;
}
function Gt(t) {
  try {
    const e = F(t);
    return e === F(ot(e));
  } catch {
    return !1;
  }
}
const Vt = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;"), at = {
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
Object.freeze(at);
const T = {
  projectSettingsContribution: {
    description: "The data an extension provides to inform Platform.Bible of the project settings it provides",
    anyOf: [
      {
        $ref: "#/$defs/projectSettingsGroup"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/projectSettingsGroup"
        }
      }
    ]
  },
  projectSettingsGroup: {
    description: "Group of related settings definitions",
    type: "object",
    properties: {
      label: {
        description: "localizeKey that displays in the project settings dialog as the group name",
        $ref: "#/$defs/localizeKey"
      },
      description: {
        description: "localizeKey that displays in the project settings dialog to describe the group",
        $ref: "#/$defs/localizeKey"
      },
      properties: {
        $ref: "#/$defs/projectSettingProperties"
      }
    },
    required: ["label", "properties"]
  },
  projectSettingProperties: {
    description: "Object whose keys are setting IDs and whose values are settings objects",
    type: "object",
    patternProperties: {
      "^[\\w\\-]+\\.[\\w\\-]+$": {
        $ref: "#/$defs/projectSetting"
      }
    },
    additionalProperties: !1
  },
  projectSetting: {
    description: "A description of an extension's setting entry",
    anyOf: [
      {
        $ref: "#/$defs/extensionControlledProjectSetting"
      }
    ]
  },
  extensionControlledProjectSetting: {
    description: "Setting definition that is validated by the extension.",
    allOf: [
      {
        $ref: "#/$defs/projectSettingBase"
      },
      {
        $ref: "#/$defs/modifierExtensionControlled"
      }
    ]
  },
  projectSettingBase: {
    description: "Base information needed to describe a project setting entry",
    allOf: [
      {
        $ref: "#/$defs/settingBase"
      },
      {
        $ref: "#/$defs/modifierProject"
      }
    ]
  },
  modifierProject: {
    description: "Modifies setting type to be project setting",
    type: "object",
    properties: {
      includeProjectTypes: {
        description: "`RegExp` pattern(s) to match against `projectType` (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine whether this project setting should be displayed in the Project Settings Dialog of that `projectType`. null means do not show on any Project Settings dialog",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: {
              type: "string"
            }
          }
        ]
      },
      excludeProjectTypes: {
        description: "`RegExp` pattern to match against `projectType` to determine if this project setting should absolutely not be displayed in the Project Settings dialog of that `projectType` even if it matches with `includeProjectTypes`",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: {
              type: "string"
            }
          }
        ]
      }
    }
  },
  settingsContribution: {
    description: "The data an extension provides to inform Platform.Bible of the settings it provides",
    anyOf: [
      {
        $ref: "#/$defs/settingsGroup"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/settingsGroup"
        }
      }
    ]
  },
  settingsGroup: {
    description: "Group of related settings definitions",
    type: "object",
    properties: {
      label: {
        description: "localizeKey that displays in the settings dialog as the group name",
        $ref: "#/$defs/localizeKey"
      },
      description: {
        description: "localizeKey that displays in the settings dialog to describe the group",
        $ref: "#/$defs/localizeKey"
      },
      properties: {
        $ref: "#/$defs/settingProperties"
      }
    },
    required: ["label", "properties"]
  },
  settingProperties: {
    description: "Object whose keys are setting IDs and whose values are settings objects",
    type: "object",
    patternProperties: {
      "^[\\w-]+\\.[\\w-]+$": {
        $ref: "#/$defs/setting"
      }
    },
    additionalProperties: !1
  },
  setting: {
    description: "A description of an extension's setting entry",
    anyOf: [
      {
        $ref: "#/$defs/extensionControlledSetting"
      }
    ]
  },
  extensionControlledSetting: {
    description: "Setting definition that is validated by the extension.",
    allOf: [
      {
        $ref: "#/$defs/settingBase"
      },
      {
        $ref: "#/$defs/modifierExtensionControlled"
      }
    ]
  },
  settingBase: {
    description: "Base information needed to describe a setting entry",
    allOf: [
      {
        $ref: "#/$defs/stateBase"
      },
      {
        type: "object",
        properties: {
          label: {
            description: "localizeKey that displays in the settings dialog as the setting name",
            $ref: "#/$defs/localizeKey"
          },
          description: {
            description: "localizeKey that displays in the settings dialog to describe the setting",
            $ref: "#/$defs/localizeKey"
          }
        },
        required: ["label"]
      }
    ]
  },
  projectStateContribution: {
    description: "The data an extension provides to inform Platform.Bible of the project state it provides",
    $ref: "#/$defs/userStateProperties"
  },
  userStateContribution: {
    description: "The data an extension provides to inform Platform.Bible of the user state it provides",
    $ref: "#/$defs/userStateProperties"
  },
  userStateProperties: {
    description: "Object whose keys are state IDs and whose values are state objects",
    type: "object",
    patternProperties: {
      "^[\\w\\-]+\\.[\\w\\-]+$": {
        $ref: "#/$defs/userState"
      }
    },
    additionalProperties: !1
  },
  userState: {
    description: "A description of an extension's user state entry",
    anyOf: [
      {
        $ref: "#/$defs/extensionControlledState"
      }
    ]
  },
  extensionControlledState: {
    description: "State definition that is validated by the extension.",
    allOf: [
      {
        $ref: "#/$defs/stateBase"
      },
      {
        $ref: "#/$defs/modifierExtensionControlled"
      }
    ]
  },
  modifierExtensionControlled: {
    description: 'Modifies state/setting type to be extension-controlled. "Extension-controlled" means the extension provides the component and the validator for the state/setting, so the state/setting is controlled by the extension.',
    not: {
      anyOf: [
        {
          type: "object",
          required: ["platformType"]
        },
        {
          type: "object",
          required: ["type"]
        }
      ]
    }
  },
  stateBase: {
    description: "Base information needed to describe a state entry",
    type: "object",
    properties: {
      default: {
        description: "default value for the state/setting",
        type: "any"
      },
      derivesFrom: {
        description: "a state/setting ID whose value to set to this state/setting's starting value the first time this state/setting is loaded",
        $ref: "#/$defs/id"
      }
    },
    required: ["default"]
  },
  localizeKey: {
    description: "Identifier for a string that will be localized based on the user's UI language",
    type: "string",
    pattern: "^%[\\w\\-\\.]+%$",
    tsType: "LocalizeKey"
  },
  id: {
    description: "",
    type: "string",
    pattern: "^[\\w\\-]+\\.[\\w\\-]+$",
    tsType: "Id"
  }
};
function ee(t) {
  t && Object.values(t).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && ee(e.properties);
    }
  });
}
ee(T);
const ut = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Project Settings Contribution",
  description: "The data an extension provides to inform Platform.Bible of the project settings it provides",
  anyOf: [
    {
      $ref: "#/$defs/projectSettingsGroup"
    },
    {
      type: "array",
      items: {
        $ref: "#/$defs/projectSettingsGroup"
      }
    }
  ],
  $defs: T
};
Object.freeze(ut);
const lt = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Settings Contribution",
  description: "The data an extension provides to inform Platform.Bible of the settings it provides",
  anyOf: [
    {
      $ref: "#/$defs/settingsGroup"
    },
    {
      type: "array",
      items: {
        $ref: "#/$defs/settingsGroup"
      }
    }
  ],
  $defs: T
};
Object.freeze(lt);
export {
  dt as AsyncVariable,
  Ve as DocumentCombiner,
  _e as FIRST_SCR_BOOK_NUM,
  Ue as FIRST_SCR_CHAPTER_NUM,
  ke as FIRST_SCR_VERSE_NUM,
  Ke as LAST_SCR_BOOK_NUM,
  Je as Mutex,
  Et as MutexMap,
  $t as NonValidatingDocumentCombiner,
  Re as PlatformEventEmitter,
  wt as UnsubscriberAsyncList,
  At as aggregateUnsubscriberAsyncs,
  Pt as aggregateUnsubscribers,
  Ct as at,
  qt as charAt,
  Tt as codePointAt,
  Nt as createSyncProxyForAsyncObject,
  mt as debounce,
  E as deepClone,
  xe as deepEqual,
  ot as deserialize,
  Dt as endsWith,
  vt as getAllObjectFunctionNames,
  He as getChaptersForBook,
  bt as getErrorMessage,
  gt as groupBy,
  Vt as htmlEncode,
  st as includes,
  q as indexOf,
  Gt as isSerializable,
  Ie as isString,
  it as lastIndexOf,
  at as menuDocumentSchema,
  ht as newGuid,
  Mt as normalize,
  Ot as offsetBook,
  jt as offsetChapter,
  St as offsetVerse,
  xt as padEnd,
  Rt as padStart,
  ut as projectSettingsDocumentSchema,
  F as serialize,
  lt as settingsDocumentSchema,
  It as slice,
  Bt as split,
  zt as startsWith,
  h as stringLength,
  O as substring,
  nt as toArray,
  Ge as wait,
  yt as waitForDuration
};
//# sourceMappingURL=index.js.map
