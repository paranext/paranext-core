var ne = Object.defineProperty;
var ie = (s, e, t) => e in s ? ne(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var k = (s, e, t) => ie(s, typeof e != "symbol" ? e + "" : e, t);
import { d as C, i as _ } from "./scripture-util-DArajUVn.js";
import { D as Ft, F as Ot, a as Rt, b as Dt, G as Lt, L as Bt, M as Vt, S as zt, c as Ht, e as Jt, f as Kt, g as Gt, h as Yt, j as Xt, k as Wt, l as Zt, m as Qt, n as er, o as tr, p as rr, q as nr, r as ir, s as sr, t as ar, u as or, v as cr, w as dr, x as pr, y as lr, z as ur, A as hr, B as fr, C as mr, E as gr, H as yr, I as kr, J as br, K as vr, N as Mr, O as xr, P as _r, Q as Er, R as Ir, T as wr, U as Sr, V as Pr, W as Tr, X as Cr, Y as qr, Z as Ar, _ as $r, $ as jr, a0 as Nr, a1 as Ur, a2 as Fr, a3 as Or, a4 as Rr, a5 as Dr, a6 as Lr, a7 as Br, a8 as Vr, a9 as zr, aa as Hr, ab as Jr, ac as Kr, ad as Gr } from "./scripture-util-DArajUVn.js";
import { Mutex as se } from "async-mutex";
import ae from "dompurify";
import { deepEqual as oe } from "fast-equals";
import { USJ_TYPE as ce } from "@eten-tech-foundation/scripture-utilities";
import { JSONPath as P } from "jsonpath-plus";
const q = class q {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, t = 1e4) {
    k(this, "variableName");
    k(this, "promiseToValue");
    k(this, "timeoutId");
    k(this, "timeoutOccurred");
    k(this, "resolver");
    k(this, "rejecter");
    this.variableName = e, this.timeoutOccurred = !1, this.promiseToValue = new Promise((r, i) => {
      this.resolver = r, this.rejecter = i;
    }), t > 0 && (this.timeoutId = setTimeout(() => {
      this.rejecter && (this.rejecter(`Timeout reached when waiting for ${this.variableName} to settle`), this.timeoutOccurred = !0, this.complete());
    }, t)), Object.seal(this);
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
   * Can use to determine if a rejection occurred due to a timeout
   *
   * @returns Whether the variable timed out while waiting for a value to resolve
   */
  get hasTimedOut() {
    return this.timeoutOccurred;
  }
  /**
   * Allows enabling more verbose logging when async variables resolve and reject
   *
   * @param enabled Whether to enable verbose logging
   */
  static setVerboseLogging(e) {
    this.verboseLoggingEnabled = e;
  }
  /**
   * Resolve this variable's promise to the given value
   *
   * @param value This variable's promise will resolve to this value
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected. Defaults to `false`
   */
  resolveToValue(e, t = !1) {
    if (this.resolver)
      q.verboseLoggingEnabled && console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
    else {
      if (t) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent resolution of ${this.variableName}`);
    }
  }
  /**
   * Reject this variable's promise for the value with the given reason
   *
   * @param reason This variable's promise will be rejected with this reason
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected. Defaults to `false`
   */
  rejectWithReason(e, t = !1) {
    if (this.rejecter)
      q.verboseLoggingEnabled && console.debug(`${this.variableName} is being rejected now with reason: ${e}`), this.rejecter(e), this.complete();
    else {
      if (t) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }
  /** Prevent any further updates to this variable */
  complete() {
    this.resolver = void 0, this.rejecter = void 0, this.timeoutId !== void 0 && (clearTimeout(this.timeoutId), this.timeoutId = void 0), Object.freeze(this);
  }
};
k(q, "verboseLoggingEnabled", !1);
let R = q;
class Ve {
  constructor(e, t) {
    k(this, "collator");
    this.collator = new Intl.Collator(e, t);
  }
  /**
   * Compares two strings according to the sort order of this Collator object
   *
   * @param string1 String to compare
   * @param string2 String to compare
   * @returns A number indicating how string1 and string2 compare to each other according to the
   *   sort order of this Collator object. Negative value if string1 comes before string2. Positive
   *   value if string1 comes after string2. 0 if they are considered equal.
   */
  compare(e, t) {
    return this.collator.compare(e, t);
  }
  /**
   * Returns a new object with properties reflecting the locale and collation options computed
   * during initialization of this collator object.
   *
   * @returns ResolvedCollatorOptions object
   */
  resolvedOptions() {
    return this.collator.resolvedOptions();
  }
}
class de {
  constructor(e, t) {
    k(this, "dateTimeFormatter");
    this.dateTimeFormatter = new Intl.DateTimeFormat(e, t);
  }
  /**
   * Formats a date according to the locale and formatting option for this DateTimeFormat object
   *
   * @param date The date to format
   * @returns String representing the given date formatted according to the locale and formatting
   *   options of this DateTimeFormat object
   */
  format(e) {
    return this.dateTimeFormatter.format(e);
  }
  /**
   * Formats a date range in the most concise way based on the locales and options provided when
   * instantiating this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns String representing the given date range formatted according to the locale and
   *   formatting options of this DateTimeFormat object
   */
  formatRange(e, t) {
    return this.dateTimeFormatter.formatRange(e, t);
  }
  /**
   * Returns an array of locale-specific tokens representing each part of the formatted date range
   * produced by this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns Array of DateTimeRangeFormatPart objects
   */
  formatRangeToParts(e, t) {
    return this.dateTimeFormatter.formatRangeToParts(e, t);
  }
  /**
   * Allows locale-aware formatting of strings produced by this DateTimeFormat object
   *
   * @param date The date to format
   * @returns Array of DateTimeFormatPart objects
   */
  formatToParts(e) {
    return this.dateTimeFormatter.formatToParts(e);
  }
  /**
   * Returns a new object with properties reflecting the locale and date and time formatting options
   * computed during initialization of this DateTimeFormat object
   *
   * @returns ResolvedDateTimeFormatOptions object
   */
  resolvedOptions() {
    return this.dateTimeFormatter.resolvedOptions();
  }
}
function pe(s) {
  return typeof s == "object" && !!s && "then" in s && typeof s.then == "function" && "catch" in s && typeof s.catch == "function";
}
class le {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    k(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    k(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    k(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    k(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    k(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    k(this, "emit", (e) => {
      this.emitFn(e);
    });
    /**
     * Runs the subscriptions for the event, keeping each subscriber's failure to itself: a subscriber
     * that throws hands its error to `handleSubscriberError` and the remaining subscribers still
     * run.
     *
     * Use this where the emit is the only time subscribers are told about something that has already
     * happened and will not be reported again — one broken subscriber must not cost the rest the
     * news. Prefer {@link emit} everywhere else: a caller that can still act on a throw should see
     * it.
     *
     * This does not await `async` subscribers. It routes their rejections — a subscriber whose
     * promise rejects reaches `handleSubscriberError` the same way a synchronous throw does — but it
     * does not sequence them: this returns as soon as every subscriber has been _started_, with any
     * async subscriber still suspended at its first `await`. An emitter that tears something down
     * right after emitting therefore tears it down out from under those subscribers.
     *
     * @param event Event data to provide to subscribed callbacks
     * @param handleSubscriberError Run with the error a subscriber threw and that subscriber's
     *   position in the subscription order. Must not throw; a throw from it stops the remaining
     *   subscribers, which is the very thing this is here to prevent.
     * @experimental
     */
    k(this, "emitIsolated", (e, t) => {
      this.emitIsolatedFn(e, t);
    });
  }
  /**
   * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted.
   * Use like `const unsubscriber = event(callback)`
   *
   * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
   *   emitted
   */
  get event() {
    return this.assertNotDisposed(), this.lazyEvent || (this.lazyEvent = (e) => {
      if (!e || typeof e != "function")
        throw new Error("Event handler callback must be a function!");
      return this.subscriptions || (this.subscriptions = []), this.subscriptions.push(e), () => {
        if (!this.subscriptions) return !1;
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
    this.assertNotDisposed(), this.forEachSubscription((t) => t(e));
  }
  /**
   * Function that runs the subscriptions for the event in isolation from each other. Added here so
   * children can override {@link emitIsolated} and still call the base functionality.
   *
   * @experimental
   */
  emitIsolatedFn(e, t) {
    this.assertNotDisposed(), this.forEachSubscription((r, i) => {
      try {
        const n = r(e);
        pe(n) && n.catch((c) => {
          t(c, i);
        });
      } catch (n) {
        t(n, i);
      }
    });
  }
  /** Check to make sure this emitter is not disposed. Throw if it is */
  assertNotDisposed() {
    if (this.isDisposed) throw new Error("Emitter is disposed");
  }
  /**
   * Disposes of this event, preparing it to release from memory. Added here so children can
   * override emit and still call the base functionality.
   */
  disposeFn() {
    return this.assertNotDisposed(), this.isDisposed = !0, this.subscriptions = void 0, this.lazyEvent = void 0, Promise.resolve(!0);
  }
  /**
   * Run something for each current subscription. Clones the subscriptions array before iterating
   * over the callbacks so the callback index doesn't get messed up if someone subscribes or
   * unsubscribes inside one of the callbacks
   */
  forEachSubscription(e) {
    [...this.subscriptions ?? []].forEach(e);
  }
}
class ue {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, t) {
    k(this, "baseDocument");
    k(this, "contributions", /* @__PURE__ */ new Map());
    k(this, "latestOutput");
    k(this, "options");
    k(this, "onDidRebuildEmitter", new le());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    k(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = t, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? C(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
  }
  /**
   * Add or update one of the contribution documents for the composition process
   *
   * Note: the order in which contribution documents are added can be considered indeterminate as it
   * depends on the order in which `Map.forEach` iterates over the contributions. However, the order
   * matters when merging two arrays into one. Also, when `options.ignoreDuplicateProperties` is is
   * `true`, the order also matters when adding the same property to an object that is already
   * provided previously. Please let us know if you have trouble because of indeterminate
   * contribution ordering.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   * @returns Recalculated output document given the new or updated contribution and existing other
   *   documents
   */
  addOrUpdateContribution(e, t) {
    this.validateContribution(e, t);
    const r = this.contributions.get(e);
    let i = this.options.copyDocuments && t ? C(t) : t;
    i = this.transformContributionAfterValidation(e, i), this.contributions.set(e, i);
    try {
      return this.rebuild();
    } catch (n) {
      throw r ? this.contributions.set(e, r) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${n}`);
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
    if (!t) throw new Error(`${e} does not exist`);
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (r) {
      throw this.contributions.set(e, t), new Error(`Error when deleting the document named ${e}: ${r}`);
    }
  }
  /**
   * Delete all present contribution documents for the composition process and return to the base
   * document
   *
   * @returns Recalculated output document consisting only of the base document
   */
  deleteAllContributions() {
    if (this.contributions.size <= 0) return this.latestOutput;
    const e = [...this.contributions.entries()];
    e.forEach(([t]) => this.contributions.delete(t));
    try {
      return this.rebuild();
    } catch (t) {
      throw e.forEach(
        ([r, i]) => this.contributions.set(r, i)
      ), new Error(`Error when deleting all contributions: ${t}`);
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
      let t = C(this.baseDocument);
      return t = this.transformFinalOutputBeforeValidation(t), this.validateOutput(t), this.latestOutput = t, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((t) => {
      e = he(
        e,
        t,
        this.options.ignoreDuplicateProperties
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
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
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
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  transformContributionAfterValidation(e, t) {
    return t;
  }
  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  validateContribution(e, t) {
  }
  /**
   * Throw an error if the provided output is not valid.
   *
   * @param output Output document that could potentially be returned to callers
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  transformFinalOutputBeforeValidation(e) {
    return e;
  }
}
function D(...s) {
  let e = !0;
  return s.forEach((t) => {
    (!t || typeof t != "object" || Array.isArray(t)) && (e = !1);
  }), e;
}
function L(...s) {
  let e = !0;
  return s.forEach((t) => {
    (!t || typeof t != "object" || !Array.isArray(t)) && (e = !1);
  }), e;
}
function he(s, e, t) {
  const r = C(s);
  return e ? K(r, C(e), t) : r;
}
function K(s, e, t) {
  if (!e) return s;
  if (D(s, e)) {
    const r = s, i = e;
    Object.keys(i).forEach((n) => {
      if (Object.hasOwn(r, n)) {
        if (D(r[n], i[n]))
          r[n] = K(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            r[n],
            i[n],
            t
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (L(r[n], i[n]))
          r[n] = r[n].concat(
            i[n]
          );
        else if (!t)
          throw new Error(`Cannot merge objects: key "${n}" already exists in the target object`);
      } else
        r[n] = i[n];
    });
  } else L(s, e) && s.push(...e);
  return s;
}
class ze {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(e) {
    /** The ring buffer to store times */
    k(this, "ringBuffer");
    /** The size of the ring buffer */
    k(this, "bufferSize");
    /** The next location where a time will be written */
    k(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    k(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    k(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    k(this, "totalInstanceCount");
    this.bufferSize = e, this.ringBuffer = new Array(e).fill(0), this.writerIndex = 0, this.readerIndex = 0, this.lastTimeDifference = 0, this.totalInstanceCount = 0;
  }
  /** Get the total number of instances that have been recorded */
  get totalInstances() {
    return this.totalInstanceCount;
  }
  /** Add a new time measurement for an instance of an event */
  recordInstance() {
    this.totalInstanceCount += 1;
    const e = performance.now();
    this.lastTimeDifference = e - this.ringBuffer[this.readerIndex], this.ringBuffer[this.writerIndex] = e, this.writerIndex += 1, this.writerIndex >= this.bufferSize && (this.writerIndex %= this.bufferSize), this.writerIndex === this.readerIndex && (this.readerIndex += 1, this.readerIndex >= this.bufferSize && (this.readerIndex %= this.bufferSize));
  }
  /**
   * Check if the time between the last N events is less than the provided threshold
   *
   * @param minRollingTimeMs - Minimum time that must have passed when the last N events occurred
   * @returns - True if the threshold is violated, false otherwise
   */
  hasViolatedThreshold(e) {
    return this.totalInstanceCount >= this.bufferSize && this.lastTimeDifference < e;
  }
}
class fe extends se {
}
class He {
  constructor() {
    k(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  /**
   * Retrieves the {@link Mutex} associated with the given ID. If no Mutex exists for the provided
   * ID, a new Mutex is created, stored, and returned.
   *
   * @param mutexID Unique identifier for the desired Mutex
   * @returns The Mutex associated with the provided ID
   */
  get(e) {
    let t = this.mutexesByID.get(e);
    return t || (t = new fe(), this.mutexesByID.set(e, t), t);
  }
  /**
   * Disposes of this MutexMap by canceling all pending operations on all mutexes and clearing the
   * map. After disposal, the MutexMap should not be used.
   */
  dispose() {
    this.mutexesByID.forEach((e) => {
      e.cancel();
    }), this.mutexesByID.clear();
  }
}
class Je extends ue {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, t) {
    super(e, t);
  }
  get output() {
    return this.latestOutput;
  }
}
class me {
  constructor(e, t) {
    k(this, "numberFormatter");
    this.numberFormatter = new Intl.NumberFormat(e, t);
  }
  /**
   * Formats a number according to the locale and formatting options of this NumberFormat object
   *
   * @param value Number or BigInt to format
   * @returns String representing the given number formatted according to the locale and formatting
   *   options of this NumberFormat object
   */
  format(e) {
    return this.numberFormatter.format(e);
  }
  /**
   * Formats a range of numbers according to the locale and formatting options of this NumberFormat
   * object
   *
   * @param startRange Number or bigint representing the start of the range
   * @param endRange Number or bigint representing the end of the range
   * @returns String representing the given range of numbers formatted according to the locale and
   *   formatting options of this NumberFormat object
   */
  formatRange(e, t) {
    return this.numberFormatter.formatRange(e, t);
  }
  /**
   * Returns an array of objects containing the locale-specific tokens from which it is possible to
   * build custom strings while preserving the locale-specific parts.
   *
   * @param startRange Number or bigint representing start of the range
   * @param endRange Number or bigint representing end of the range
   * @returns Array of NumberRangeFormatPart objects containing the formatted range of numbers in
   *   parts
   */
  formatRangeToParts(e, t) {
    return this.numberFormatter.formatRangeToParts(e, t);
  }
  /**
   * Allows locale-aware formatting of strings produced by this NumberFormat object
   *
   * @param value Number or bigint to format
   * @returns Array of NumberFormatPart objects containing the formatted number in parts
   */
  formatToParts(e) {
    return this.numberFormatter.formatToParts(e);
  }
  /**
   * Returns a new object with properties reflecting the locale and number formatting options
   * computed during initialization of this NumberFormat object
   *
   * @returns ResolvedNumberFormatOptions object
   */
  resolvedOptions() {
    return this.numberFormatter.resolvedOptions();
  }
}
const ge = Promise.resolve();
class Ke {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    k(this, "map", /* @__PURE__ */ new Map());
    k(this, "logger");
    this.logger = e;
  }
  /**
   * Adds a promise function to the map for a given key. If a promise is already running for the
   * key, the new promise will be chained to the existing one. Once all promises for a key have
   * settled, the map will be cleared for that key.
   *
   * @param key Unique key to identify a distinct promise chain
   * @param promiseFunction Function that returns a promise to add to the chain
   */
  addPromiseFunction(e, t) {
    const r = this.map.get(e);
    this.map.set(e, r ? r.then(t) : t()), this.cleanupPromiseChain(e);
  }
  /**
   * Gets the current promise chain for the given key. This is mostly useful for testing. Normally
   * you should just call {@link addPromiseFunction} and let the map handle the rest.
   *
   * @param key Unique key to identify a distinct promise chain
   * @returns The current promise chain for the key
   */
  get(e) {
    return this.map.get(e);
  }
  /**
   * Configures a promise chain to be removed from the map for the given key after all the promises
   * have settled
   *
   * @param key Unique key to identify a distinct promise chain
   */
  cleanupPromiseChain(e) {
    const t = this.map.get(e);
    if (!t) return;
    const r = { promise: ge }, i = t.catch((n) => this.logger.warn(`Error in promise for ${e}: ${n.message}`)).finally(() => {
      this.map.get(e) === r.promise && this.map.delete(e);
    });
    r.promise = i, this.map.set(e, i);
  }
}
class B {
  constructor() {
    k(this, "map", /* @__PURE__ */ new Map());
    k(this, "sortedKeys", []);
  }
  /**
   * Returns an iterable of keys in the map sorted in ascending order.
   *
   * Time complexity: internal detail to JavaScript engine. Reasonable expectation:
   *
   * - Executing this method to return an iterator: O(1)
   * - Iterating over the returned iterator: O(n)
   *
   * Note that iterating over the keys this way negates the benefits of using this class over a
   * using a {@link Map}. To access individual keys more quickly, use
   * {@link SortedNumberMap.findClosestLessThanOrEqual} or {@link SortedNumberMap.get}.
   *
   * TSDoc adapted from {@link Map.keys}
   */
  keys() {
    return this.sortedKeys.values();
  }
  /**
   * Returns a specified element from the Map object. If the value that is associated to the
   * provided key is an object, then you will get a reference to that object and any change made to
   * that object will effectively modify it inside the Map.
   *
   * Time complexity: O(1)
   *
   * @returns Returns the element associated with the specified key. If no element is associated
   *   with the specified key, returns `undefined`.
   *
   *   TSDoc adapted from {@link Map.get}
   */
  get(e) {
    return this.map.get(e);
  }
  /**
   * Sets a key-value pair in the map. If the key already exists, its value is updated. If the key
   * is new, it's inserted in the correct sorted position.
   *
   * Time complexity: O(log n) for new keys (due to binary search and array insertion), O(1) for
   * existing keys.
   *
   * @example
   *
   * ```typescript
   * const map = new SortedNumberMap<string>();
   * map.set(10, 'ten');
   * map.set(5, 'five');
   * map.set(15, 'fifteen');
   * // Keys are automatically maintained in sorted order: [5, 10, 15]
   * ```
   *
   * @param key - The numeric key to set
   * @param value - The value to associate with the key
   */
  set(e, t) {
    if (!this.map.has(e)) {
      const r = this.binarySearchInsertIndex(e);
      this.sortedKeys.splice(r, 0, e);
    }
    this.map.set(e, t);
  }
  /**
   * Finds the key-value pair with the largest key that is less than or equal to the target.
   *
   * This method uses binary search to efficiently locate the closest match. If no key is less than
   * or equal to the target, it returns undefined.
   *
   * Time complexity: O(log n)
   *
   * @example
   *
   * ```typescript
   * const map = new SortedNumberMap<string>();
   * map.set(10, 'ten');
   * map.set(20, 'twenty');
   * map.set(30, 'thirty');
   *
   * // Exact match
   * map.findClosestLessThanOrEqual(20); // { key: 20, value: 'twenty' }
   *
   * // Closest less than
   * map.findClosestLessThanOrEqual(25); // { key: 20, value: 'twenty' }
   *
   * // No match (target too small)
   * map.findClosestLessThanOrEqual(5); // undefined
   * ```
   *
   * @param target - The number to search for
   * @returns The key-value pair with the largest key ≤ target, or undefined if none exists
   */
  findClosestLessThanOrEqual(e) {
    const t = this.binarySearchLessThanOrEqual(e);
    if (t === -1) return;
    const r = this.sortedKeys[t], i = this.map.get(r);
    if (i !== void 0)
      return { key: r, value: i };
  }
  binarySearchLessThanOrEqual(e) {
    let t = 0, r = this.sortedKeys.length - 1, i = -1;
    for (; t <= r; ) {
      const n = Math.floor((t + r) / 2);
      this.sortedKeys[n] <= e ? (i = n, t = n + 1) : r = n - 1;
    }
    return i;
  }
  binarySearchInsertIndex(e) {
    let t = 0, r = this.sortedKeys.length;
    for (; t < r; ) {
      const i = Math.floor((t + r) / 2);
      this.sortedKeys[i] < e ? t = i + 1 : r = i;
    }
    return t;
  }
}
class Ge {
  /**
   * Creates a new sorted set
   *
   * @param compareFn - Function used to determine the order of elements. Returns negative when a <
   *   b, zero when a = b, positive when a > b
   */
  constructor(e) {
    /** Internal storage for the sorted items */
    k(this, "items", []);
    this.compareFn = e;
  }
  /** Gets the number of elements in the set */
  get size() {
    return this.items.length;
  }
  /** Returns whether the set is empty */
  get isEmpty() {
    return this.items.length === 0;
  }
  /**
   * Inserts an item into the set if it's not already present
   *
   * @param item - The item to insert
   * @returns True if the item was added; false if an equal item already exists
   */
  insert(e) {
    const t = this.findInsertionIndex(e);
    return t < this.items.length && this.compareFn(this.items[t], e) === 0 ? !1 : (this.items.splice(t, 0, e), !0);
  }
  /**
   * Removes an item from the set
   *
   * @param item - The item to remove
   * @returns True if the item was removed; false if it wasn't found
   */
  remove(e) {
    const t = this.findIndex(e);
    return t < 0 ? !1 : (this.items.splice(t, 1), !0);
  }
  /**
   * Checks if an item exists in the set
   *
   * @param item - The item to check
   * @returns True if the item exists; false otherwise
   */
  has(e) {
    return this.findIndex(e) >= 0;
  }
  /** Returns all items in the set as an array, in sorted order */
  toArray() {
    return [...this.items];
  }
  /** Returns the index of an item in the set, or -1 if not found */
  findIndex(e) {
    const t = this.findInsertionIndex(e);
    return t < this.items.length && this.compareFn(this.items[t], e) === 0 ? t : -1;
  }
  /**
   * Returns the element at the specified index in the sorted order
   *
   * @param index - The zero-based index of the element to get
   * @returns The element at the specified index, or undefined if the index is out of range
   */
  at(e) {
    if (!(e < 0 || e >= this.items.length))
      return this.items[e];
  }
  /** Iterates through each item in the sorted set */
  forEach(e) {
    this.items.forEach((t, r) => e(t, r, this));
  }
  /** Returns an iterator for the set's items */
  [Symbol.iterator]() {
    let e = 0;
    return {
      next: () => e < this.items.length ? (e += 1, { value: this.items[e - 1], done: !1 }) : { value: void 0, done: !0 }
    };
  }
  /** Clears all items from the set */
  clear() {
    this.items.length = 0;
  }
  /**
   * Uses binary search to find the position where an item should be inserted to maintain the sorted
   * order
   */
  findInsertionIndex(e) {
    let t = 0, r = this.items.length;
    for (; t < r; ) {
      const i = Math.floor((t + r) / 2);
      this.compareFn(this.items[i], e) < 0 ? t = i + 1 : r = i;
    }
    return t;
  }
}
const G = 1e4, N = G / 1e3, Y = 3, V = /* @__PURE__ */ new Map(), ye = {
  unsubscribed: {
    log: (s) => console.warn(s),
    first: (s) => `UnsubscriberAsyncList ${s}: Unsubscriber arrived after the list was run, so it was unsubscribed immediately instead of being stored.`,
    suppressed: (s, e) => `UnsubscriberAsyncList ${s}: ${e} more unsubscribers arrived after the list was run in the last ${N}s and were unsubscribed immediately; per-occurrence warnings suppressed.`
  },
  failed: {
    log: (s) => console.error(s),
    first: (s) => `UnsubscriberAsyncList ${s}: Unsubscriber added after the list was run failed!`,
    suppressed: (s, e) => `UnsubscriberAsyncList ${s}: ${e} more unsubscribers added after the list was run failed in the last ${N}s; per-occurrence errors suppressed.`
  },
  threw: {
    log: (s) => console.error(s),
    first: (s, e) => `UnsubscriberAsyncList ${s}: Unsubscriber added after the list was run threw! ${e}`,
    // Unlike the other two outcomes, throttling this one discards more than repetition: each
    // occurrence carries its own error. The samples are what keep a storm's causes legible; a bare
    // count could not distinguish one recurring fault from many different ones.
    suppressed: (s, e, t) => `UnsubscriberAsyncList ${s}: ${e} more unsubscribers added after the list was run threw in the last ${N}s; per-occurrence errors suppressed. Distinct errors sampled (up to ${Y}): ${t.join(" | ")}`
  }
};
function z(s, e, t) {
  const { log: r, first: i, suppressed: n } = ye[e], c = `${s}\0${e}`, p = Date.now(), d = V.get(c);
  if (!d || p >= d.closesAt) {
    r(i(s, t)), V.set(c, {
      closesAt: p + G,
      suppressedCount: 0,
      suppressedErrorSamples: /* @__PURE__ */ new Set(),
      summaryTimeout: void 0
    });
    return;
  }
  d.suppressedCount += 1, t !== void 0 && d.suppressedErrorSamples.size < Y && d.suppressedErrorSamples.add(`${t}`), d.summaryTimeout || (d.summaryTimeout = setTimeout(() => {
    const { suppressedCount: l } = d, m = [...d.suppressedErrorSamples];
    d.suppressedCount = 0, d.suppressedErrorSamples.clear(), d.summaryTimeout = void 0, l > 0 && r(n(s, l, m));
  }, d.closesAt - p), typeof d.summaryTimeout == "object" && "unref" in d.summaryTimeout && d.summaryTimeout.unref());
}
class Ye {
  constructor(e = "Anonymous") {
    k(this, "unsubscribers", /* @__PURE__ */ new Set());
    /**
     * Whether {@link runAllUnsubscribers} has started. Set at the top of the run rather than at the
     * end: the run takes a snapshot of the set and then clears it, so an unsubscriber added partway
     * through would land in a list that is never drained again.
     */
    k(this, "isSealed", !1);
    this.name = e;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * Once {@link runAllUnsubscribers} has started, unsubscribers are run immediately rather than
   * stored. Nothing can await that run, so its outcome — success included — is only reported.
   *
   * Those reports are rate-limited: within a `LATE_ARRIVAL_REPORT_WINDOW_MS` window, lists
   * sharing this list's name report the first occurrence of each outcome verbatim and then collapse
   * the rest into one count. So the reports are a faithful signal that late arrivals are happening,
   * but not a per-occurrence record — do not count log lines to count undone subscriptions.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...e) {
    e.forEach((t) => {
      const r = "dispose" in t ? t.dispose.bind(t) : t;
      this.isSealed ? this.unsubscribeImmediately(r) : this.unsubscribers.add(r);
    });
  }
  /**
   * Run all unsubscribers added to this list, clear the list, and seal it so anything added later
   * is unsubscribed on arrival.
   *
   * An unsubscriber that throws (synchronously or asynchronously) does not make this method reject:
   * the error is caught and logged via `console.error`, the remaining unsubscribers still run, and
   * the thrower counts as a failure in the return value. An unsubscriber that arrives during the
   * run is not part of the returned result — nothing is waiting on it by then.
   *
   * @returns `true` if all unsubscribers succeeded, `false` if any returned `false` or threw.
   */
  async runAllUnsubscribers() {
    this.isSealed = !0;
    const e = await Promise.all(
      [...this.unsubscribers].map(async (t) => {
        try {
          return await t();
        } catch (r) {
          return console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber threw! ${r}`), !1;
        }
      })
    );
    return this.unsubscribers.clear(), e.every((t, r) => (t || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${r} failed!`), t));
  }
  /**
   * Run an unsubscriber that arrived after the list was sealed. `add` is synchronous and has no
   * caller to hand a result to, so the outcome is reported here rather than thrown.
   *
   * The success path is reported too: from the caller's point of view a subscription it just set up
   * has been undone, and without a line here that happens with no record anywhere.
   */
  unsubscribeImmediately(e) {
    (async () => {
      const { name: t } = this;
      try {
        const r = await e();
        z(t, r ? "unsubscribed" : "failed");
      } catch (r) {
        z(t, "threw", r);
      }
    })();
  }
}
const Xe = "ABORTED", We = "ALREADY_EXISTS", Ze = "CANCELLED", Qe = "DATA_LOSS", et = "DEADLINE_EXCEEDED", tt = "FAILED_PRECONDITION", rt = "INTERNAL", nt = "INVALID_ARGUMENT", it = "NOT_FOUND", st = "OUT_OF_RANGE", at = "PERMISSION_DENIED", ot = "RESOURCE_EXHAUSTED", ct = "UNAUTHENTICATED", dt = "UNAVAILABLE", pt = "UNIMPLEMENTED", lt = "UNKNOWN", A = 1;
function ut(s, e) {
  if (!s)
    return {
      message: "",
      ...e && { code: e },
      platformErrorVersion: A
    };
  if (_(s))
    return {
      message: s,
      ...e && { code: e },
      platformErrorVersion: A
    };
  if (typeof s == "object" && "message" in s && typeof s.message == "string") {
    const t = {
      message: s.message,
      platformErrorVersion: A
    };
    return Object.defineProperties(t, Object.getOwnPropertyDescriptors(s)), Object.defineProperty(t, "message", { enumerable: !0 }), "stack" in s && _(s.stack) && Object.defineProperty(t, "stack", { value: s.stack, enumerable: !0 }), "cause" in t && Object.defineProperty(t, "cause", { enumerable: !0 }), e && (t.code = e), t;
  }
  return {
    cause: s,
    message: "",
    ...e && { code: e },
    platformErrorVersion: A
  };
}
function ht(s) {
  return !!s && typeof s == "object" && "platformErrorVersion" in s;
}
const ft = (s) => (...e) => s.map((r) => r(...e)).every((r) => r), mt = (s) => async (...e) => {
  const t = s.map(async (r) => r(...e));
  return (await Promise.all(t)).every((r) => r);
}, ke = "book", H = "chapter", w = "verse", S = "***";
var o = /* @__PURE__ */ ((s) => (s.FileIdentification = "FileIdentification", s.Headers = "Headers", s.Remarks = "Remarks", s.Introduction = "Introduction", s.DivisionMarks = "DivisionMarks", s.Paragraphs = "Paragraphs", s.Poetry = "Poetry", s.TitlesHeadings = "TitlesHeadings", s.Tables = "Tables", s.CenterTables = "CenterTables", s.RightTables = "RightTables", s.Lists = "Lists", s.Footnotes = "Footnotes", s.CrossReferences = "CrossReferences", s.SpecialText = "SpecialText", s.CharacterStyling = "CharacterStyling", s.Breaks = "Breaks", s.SpecialFeatures = "SpecialFeatures", s.PeripheralReferences = "PeripheralReferences", s.PeripheralMaterials = "PeripheralMaterials", s.Uncategorized = "Uncategorized", s))(o || {}), a = /* @__PURE__ */ ((s) => (s.Paragraph = "Paragraph", s.Character = "Character", s.Note = "Note", s.Unknown = "Unknown", s))(a || {});
const X = {
  id: {
    category: o.FileIdentification,
    type: a.Paragraph,
    description: "%markerMenu_marker_id_description%",
    hasEndMarker: !1,
    children: {
      FileIdentification: ["usfm", "ide"],
      Headers: ["h", "h1", "h2", "h3", "toc1", "toc2", "toc3"],
      Remarks: ["rem", "sts", "restore"],
      Introduction: [
        "imt",
        "imt1",
        "imt2",
        "imt3",
        "imt4",
        "imte",
        "imte1",
        "imte2",
        "is",
        "is1",
        "is2",
        "iot",
        "io",
        "io1",
        "io2",
        "io3",
        "io4",
        "ior",
        "ip",
        "im",
        "ipi",
        "imi",
        "ili",
        "ili1",
        "ili2",
        "ipq",
        "imq",
        "ipr",
        "ib",
        "iq",
        "iq1",
        "iq2",
        "iq3",
        "iex",
        "ie"
      ],
      DivisionMarks: ["c", "cl"],
      TitlesHeadings: ["mt", "mt1", "mt2", "mt3", "mt4"]
    }
  },
  usfm: {
    category: o.FileIdentification,
    type: a.Paragraph,
    description: "%markerMenu_marker_usfm_description%",
    hasEndMarker: !1,
    children: void 0
  },
  ide: {
    category: o.FileIdentification,
    type: a.Paragraph,
    description: "%markerMenu_marker_ide_description%",
    hasEndMarker: !1,
    children: {
      Remarks: ["rem", "sts"]
    }
  },
  h: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_h_description%",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h1: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_h1_description%",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h2: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_h2_description%",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h3: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_h3_description%",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  toc1: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_toc1_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toc2: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_toc2_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toc3: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_toc3_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toca1: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_toca1_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toca2: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_toca2_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toca3: {
    category: o.Headers,
    type: a.Paragraph,
    description: "%markerMenu_marker_toca3_description%",
    hasEndMarker: !1,
    children: void 0
  },
  rem: {
    category: o.Remarks,
    type: a.Paragraph,
    description: "%markerMenu_marker_rem_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sts: {
    category: o.Remarks,
    type: a.Paragraph,
    description: "%markerMenu_marker_sts_description%",
    hasEndMarker: !1,
    children: void 0
  },
  restore: {
    category: o.Remarks,
    type: a.Paragraph,
    description: "%markerMenu_marker_restore_description%",
    hasEndMarker: !1,
    children: void 0
  },
  imt: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imt_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt1: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imt1_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt2: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imt2_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt3: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imt3_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt4: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imt4_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imte_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte1: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imte1_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte2: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imte2_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  is: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_is_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"],
      CharacterStyling: ["no"]
    }
  },
  is1: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_is1_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  is2: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_is2_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  iot: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_iot_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CharacterStyling: ["no"]
    }
  },
  io: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_io_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io1: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_io1_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io2: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_io2_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io3: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_io3_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io4: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_io4_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ior: {
    category: o.Introduction,
    type: a.Character,
    description: "%markerMenu_marker_ior_description%",
    hasEndMarker: !0,
    children: void 0
  },
  ip: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_ip_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  im: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_im_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ipi: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_ipi_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  imi: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imi_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ili: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_ili_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ili1: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_ili1_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ili2: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_ili2_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ipq: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_ipq_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  imq: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_imq_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ipr: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_ipr_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ib: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_ib_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"]
    }
  },
  iq: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_iq_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iq1: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_iq1_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iq2: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_iq2_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iq3: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_iq3_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iex: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_iex_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CharacterStyling: ["no"]
    }
  },
  iqt: {
    category: o.Introduction,
    type: a.Character,
    description: "%markerMenu_marker_iqt_description%",
    hasEndMarker: !0,
    children: void 0
  },
  ie: {
    category: o.Introduction,
    type: a.Paragraph,
    description: "%markerMenu_marker_ie_description%",
    hasEndMarker: !1,
    children: void 0
  },
  c: {
    category: o.DivisionMarks,
    type: a.Paragraph,
    description: "%markerMenu_marker_c_description%",
    hasEndMarker: !1,
    children: void 0
  },
  ca: {
    category: o.DivisionMarks,
    type: a.Character,
    description: "%markerMenu_marker_ca_description%",
    hasEndMarker: !0,
    children: void 0
  },
  cp: {
    category: o.DivisionMarks,
    type: a.Paragraph,
    description: "%markerMenu_marker_cp_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"]
    }
  },
  cl: {
    category: o.DivisionMarks,
    type: a.Paragraph,
    description: "%markerMenu_marker_cl_description%",
    hasEndMarker: !1,
    children: void 0
  },
  cd: {
    category: o.DivisionMarks,
    type: a.Paragraph,
    description: "%markerMenu_marker_cd_description%",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["vp"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  v: {
    category: o.DivisionMarks,
    type: a.Character,
    description: "%markerMenu_marker_v_description%",
    hasEndMarker: !1,
    children: void 0
  },
  va: {
    category: o.DivisionMarks,
    type: a.Character,
    description: "%markerMenu_marker_va_description%",
    hasEndMarker: !0,
    children: void 0
  },
  vp: {
    category: o.DivisionMarks,
    type: a.Character,
    description: "%markerMenu_marker_vp_description%",
    hasEndMarker: !0,
    children: void 0
  },
  p: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_p_description%",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p", "pmo", "pm", "pmc", "pmr"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  m: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_m_description%",
    hasEndMarker: !1,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  po: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_po_description%",
    hasEndMarker: !1,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pr: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pr_description%",
    hasEndMarker: !1,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  cls: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_cls_description%",
    hasEndMarker: !1,
    children: {
      SpecialText: ["tl", "sig", "pn", "png", "addpn", "add"]
    }
  },
  pmo: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pmo_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pm: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pm_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pmc: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pmc_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pmr: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pmr_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pi_description%",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi1: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pi1_description%",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi2: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pi2_description%",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi3: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pi3_description%",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pc: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_pc_description%",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  mi: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_mi_description%",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  nb: {
    category: o.Paragraphs,
    type: a.Paragraph,
    description: "%markerMenu_marker_nb_description%",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_q_description%",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3", "q", "q1", "q2", "q3", "q4", "b"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q1: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_q1_description%",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3", "q", "q1", "q2", "q3", "q4", "b"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q2: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_q2_description%",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b", "qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q3: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_q3_description%",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b", "qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q4: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_q4_description%",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b", "qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qc: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_qc_description%",
    hasEndMarker: !1,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qr: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_qr_description%",
    hasEndMarker: !1,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qs: {
    category: o.Poetry,
    type: a.Character,
    description: "%markerMenu_marker_qs_description%",
    hasEndMarker: !0,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  qa: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_qa_description%",
    hasEndMarker: !1,
    children: void 0
  },
  qac: {
    category: o.Poetry,
    type: a.Character,
    description: "%markerMenu_marker_qac_description%",
    hasEndMarker: !0,
    children: void 0
  },
  qm: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_qm_description%",
    hasEndMarker: !1,
    children: {
      Paragraphs: ["p"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qm1: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_qm1_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qm2: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_qm2_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qm3: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_qm3_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qd: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_qd_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  b: {
    category: o.Poetry,
    type: a.Paragraph,
    description: "%markerMenu_marker_b_description%",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b"],
      TitlesHeadings: [
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ]
    }
  },
  mt: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_mt_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt1: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_mt1_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt2: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_mt2_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt3: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_mt3_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt4: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_mt4_description%",
    hasEndMarker: !1,
    children: void 0
  },
  mte: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_mte_description%",
    hasEndMarker: !1,
    children: void 0
  },
  mte1: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_mte1_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte2"]
    }
  },
  mte2: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_mte2_description%",
    hasEndMarker: !1,
    children: void 0
  },
  ms: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_ms_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ms1: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_ms1_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ms2: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_ms2_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ms3: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_ms3_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe"]
    }
  },
  mr: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_mr_description%",
    hasEndMarker: !1,
    children: void 0
  },
  s: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_s_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s1: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_s1_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s2: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_s2_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s3: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_s3_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s4: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_s4_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  sr: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_sr_description%",
    hasEndMarker: !1,
    children: void 0
  },
  r: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_r_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sp: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_sp_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  d: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_d_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  sd: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_sd_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sd1: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_sd1_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sd2: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_sd2_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sd3: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_sd3_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sd4: {
    category: o.TitlesHeadings,
    type: a.Paragraph,
    description: "%markerMenu_marker_sd4_description%",
    hasEndMarker: !1,
    children: void 0
  },
  lh: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_lh_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_li_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li1: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_li1_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li2: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_li2_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li3: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_li3_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li4: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_li4_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lf: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_lf_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_lim_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim1: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_lim1_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim2: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_lim2_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim3: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_lim3_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim4: {
    category: o.Lists,
    type: a.Paragraph,
    description: "%markerMenu_marker_lim4_description%",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  litl: {
    category: o.Lists,
    type: a.Character,
    description: "%markerMenu_marker_litl_description%",
    hasEndMarker: !0,
    children: void 0
  },
  lik: {
    category: o.Lists,
    type: a.Character,
    description: "%markerMenu_marker_lik_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv: {
    category: o.Lists,
    type: a.Character,
    description: "%markerMenu_marker_liv_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv1: {
    category: o.Lists,
    type: a.Character,
    description: "%markerMenu_marker_liv1_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv2: {
    category: o.Lists,
    type: a.Character,
    description: "%markerMenu_marker_liv2_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv3: {
    category: o.Lists,
    type: a.Character,
    description: "%markerMenu_marker_liv3_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv4: {
    category: o.Lists,
    type: a.Character,
    description: "%markerMenu_marker_liv4_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv5: {
    category: o.Lists,
    type: a.Character,
    description: "%markerMenu_marker_liv5_description%",
    hasEndMarker: !0,
    children: void 0
  },
  f: {
    category: o.Footnotes,
    type: a.Note,
    description: "%markerMenu_marker_f_description%",
    hasEndMarker: !0,
    children: {
      Footnotes: ["fr", "ft", "fk", "fq", "fqa", "fl", "fw", "fp", "fv", "fdc"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  fe: {
    category: o.Footnotes,
    type: a.Note,
    description: "%markerMenu_marker_fe_description%",
    hasEndMarker: !0,
    children: {
      Footnotes: ["fr", "ft", "fk", "fq", "fqa", "fl", "fw", "fp", "fv", "fdc"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  fr: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fr_description%",
    hasEndMarker: !0,
    children: void 0
  },
  ft: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_ft_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fk: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fk_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fq: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fq_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fqa: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fqa_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fl: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fl_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fw: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fw_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fp: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fp_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fv: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fv_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fdc: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fdc_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fm: {
    category: o.Footnotes,
    type: a.Character,
    description: "%markerMenu_marker_fm_description%",
    hasEndMarker: !0,
    children: void 0
  },
  x: {
    category: o.CrossReferences,
    type: a.Note,
    description: "%markerMenu_marker_x_description%",
    hasEndMarker: !0,
    children: {
      CrossReferences: ["xo", "xop", "xt", "xta", "xk", "xq", "xot", "xnt", "xdc"],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  xo: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_xo_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xop: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_xop_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xt: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_xt_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xta: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_xta_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xk: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_xk_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xq: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_xq_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xot: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_xot_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xnt: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_xnt_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xdc: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_xdc_description%",
    hasEndMarker: !0,
    children: void 0
  },
  rq: {
    category: o.CrossReferences,
    type: a.Character,
    description: "%markerMenu_marker_rq_description%",
    hasEndMarker: !0,
    children: void 0
  },
  qt: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_qt_description%",
    hasEndMarker: !0,
    children: void 0
  },
  nd: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_nd_description%",
    hasEndMarker: !0,
    children: void 0
  },
  tl: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_tl_description%",
    hasEndMarker: !0,
    children: void 0
  },
  dc: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_dc_description%",
    hasEndMarker: !0,
    children: void 0
  },
  bk: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_bk_description%",
    hasEndMarker: !0,
    children: void 0
  },
  sig: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_sig_description%",
    hasEndMarker: !0,
    children: void 0
  },
  pn: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_pn_description%",
    hasEndMarker: !0,
    children: void 0
  },
  png: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_png_description%",
    hasEndMarker: !0,
    children: void 0
  },
  addpn: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_addpn_description%",
    hasEndMarker: !0,
    children: void 0
  },
  wj: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_wj_description%",
    hasEndMarker: !0,
    children: void 0
  },
  k: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_k_description%",
    hasEndMarker: !0,
    children: void 0
  },
  sls: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_sls_description%",
    hasEndMarker: !0,
    children: void 0
  },
  ord: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_ord_description%",
    hasEndMarker: !0,
    children: void 0
  },
  add: {
    category: o.SpecialText,
    type: a.Character,
    description: "%markerMenu_marker_add_description%",
    hasEndMarker: !0,
    children: void 0
  },
  lit: {
    category: o.SpecialText,
    type: a.Paragraph,
    description: "%markerMenu_marker_lit_description%",
    hasEndMarker: !1,
    children: void 0
  },
  no: {
    category: o.CharacterStyling,
    type: a.Character,
    description: "%markerMenu_marker_no_description%",
    hasEndMarker: !0,
    children: void 0
  },
  it: {
    category: o.CharacterStyling,
    type: a.Character,
    description: "%markerMenu_marker_it_description%",
    hasEndMarker: !0,
    children: void 0
  },
  bd: {
    category: o.CharacterStyling,
    type: a.Character,
    description: "%markerMenu_marker_bd_description%",
    hasEndMarker: !0,
    children: void 0
  },
  bdit: {
    category: o.CharacterStyling,
    type: a.Character,
    description: "%markerMenu_marker_bdit_description%",
    hasEndMarker: !0,
    children: void 0
  },
  em: {
    category: o.CharacterStyling,
    type: a.Character,
    description: "%markerMenu_marker_em_description%",
    hasEndMarker: !0,
    children: void 0
  },
  sc: {
    category: o.CharacterStyling,
    type: a.Character,
    description: "%markerMenu_marker_sc_description%",
    hasEndMarker: !0,
    children: void 0
  },
  sup: {
    category: o.CharacterStyling,
    type: a.Character,
    description: "%markerMenu_marker_sup_description%",
    hasEndMarker: !0,
    children: void 0
  },
  pb: {
    category: o.Breaks,
    type: a.Paragraph,
    description: "%markerMenu_marker_pb_description%",
    hasEndMarker: !1,
    children: void 0
  }
};
function gt(s) {
  var e;
  return ((e = X[s]) == null ? void 0 : e.type) === a.Paragraph || s === "v";
}
function yt(s) {
  const e = X[s];
  return (e == null ? void 0 : e.type) !== a.Character ? !1 : e.category !== o.DivisionMarks;
}
function kt(s) {
  return ae.sanitize(s, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "b",
      "i",
      "strong",
      "em",
      "u",
      "s",
      "span",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "code",
      "pre"
    ],
    ALLOWED_ATTR: ["style", "href", "target", "rel", "class", "dir"],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i
  });
}
function W() {
  return Array.from({ length: 26 }, (s, e) => String.fromCharCode(97 + e));
}
function be(s, e) {
  const t = e && e.length > 0 ? e : W();
  return t[s % t.length];
}
function bt(s, e) {
  const t = e && e.length > 0 ? e : W(), r = (() => {
    const i = /* @__PURE__ */ new Map();
    let n = 0;
    return s.forEach((c, p) => {
      c.caller === "+" && (i.set(p, be(n, t)), n += 1);
    }), i;
  })();
  return (i, n) => {
    if (i === "+") {
      const c = r.get(n);
      return c || (console.warn(`Caller index ${n} out of range for '+' callers`), "?");
    }
    if (i !== "-")
      return i;
  };
}
function ve(s) {
  const e = [];
  if (!s || s.length === 0) return e;
  function t(r) {
    typeof r != "string" && (r.type === "note" ? e.push(r) : Array.isArray(r.content) && r.content.length > 0 && r.content.forEach(t));
  }
  return s.forEach(t), e;
}
function vt(s, e = {}) {
  const {
    splitterThicknessPx: t = 4,
    secondaryPaneMinSizePx: r = 20,
    mainPaneMinSizePx: i = 60,
    absoluteMinPercent: n = 3,
    absoluteMaxPercent: c = 90
  } = e, p = s - t;
  let d, l;
  return p < r + i ? (d = n, l = c) : (l = Math.min(
    Math.floor((p - i) / p * 100),
    c
  ), d = Math.min(
    Math.max(Math.ceil(r / p * 100), n),
    l
  )), { minPercent: d, maxPercent: l };
}
function U(s, e) {
  return oe(s, e);
}
function Me(s, e) {
  if (typeof s != typeof e) return !1;
  if (!s && !e) return !0;
  if (Array.isArray(s)) {
    const n = e, c = s;
    return n.length === 0 ? !0 : n.every((p) => c.includes(p));
  }
  if (typeof s != "object")
    return U(s, e);
  const t = e, r = s;
  let i = !0;
  return Object.keys(t).forEach((n) => {
    i && (Object.hasOwn(r, n) && Me(r[n], t[n]) || (i = !1));
  }), i;
}
function J(s, e, t) {
  return JSON.stringify(s, (i, n) => {
    let c = n;
    return e && (c = e(i, c)), c === void 0 && (c = null), c;
  }, t);
}
function xe(s, e) {
  function t(i) {
    return Object.keys(i).forEach((n) => {
      i[n] === null ? i[n] = void 0 : typeof i[n] == "object" && (i[n] = t(i[n]));
    }), i;
  }
  const r = JSON.parse(s, e);
  if (r !== null)
    return typeof r == "object" ? t(r) : r;
}
function Mt(s) {
  try {
    const e = J(s);
    return e === J(xe(e));
  } catch {
    return !1;
  }
}
const xt = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function _t() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0].replace(/@posix$/i, "") : new de().resolvedOptions().locale;
}
function Et(s, e = 2) {
  if (s === 0) return "0 Bytes";
  const t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], r = Math.floor(Math.log(s) / Math.log(1024)), i = t[r];
  return `${new me("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(s / 1024 ** r)} ${i}`;
}
function It(s) {
  return s.toUpperCase();
}
const _e = 1e3, Z = 60, Q = Z * 60, Ee = Q * 24;
function wt(s, e, t = /* @__PURE__ */ new Date()) {
  const r = Math.floor((e.getTime() - t.getTime()) / _e), i = Math.round(r / Ee);
  if (Math.abs(i) >= 1) return s.format(i, "day");
  const n = Math.round(r / Q);
  if (Math.abs(n) >= 1) return s.format(n, "hour");
  const c = Math.round(r / Z);
  return Math.abs(c) >= 1 ? s.format(c, "minute") : s.format(r, "second");
}
function St(s, e, t, r, i = {
  year: "numeric",
  month: "short",
  day: "numeric"
}) {
  const n = /* @__PURE__ */ new Date(), c = new Date(n);
  c.setDate(c.getDate() - 1);
  const p = s.getDate() === n.getDate() && s.getMonth() === n.getMonth() && s.getFullYear() === n.getFullYear(), d = s.getDate() === c.getDate() && s.getMonth() === c.getMonth() && s.getFullYear() === c.getFullYear();
  return p ? e : d ? t : s.toLocaleString(r, i);
}
const Pt = /* @__PURE__ */ new Set([
  "Alt",
  "AltGraph",
  "CapsLock",
  "Control",
  "Fn",
  "FnLock",
  "Hyper",
  "Meta",
  "NumLock",
  "ScrollLock",
  "Shift",
  "Super",
  "Symbol",
  "SymbolLock"
]);
function Tt(s) {
  return `%physicalKey_${s.charAt(0).toLowerCase()}${s.slice(1)}%`;
}
function Ct({
  interfaceMode: s,
  isAdminProtected: e,
  canAdminToggle: t,
  userSetting: r
}) {
  const i = s === "simple";
  return i ? e && !t || (r ?? i) : !1;
}
const O = {
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
      includeProjectInterfaces: {
        description: "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should be included.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to pass):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to all `ProjectInterfaces`, so all projects that do not match `excludeProjectInterfaces` will be included\n\n@example\n\n```typescript\nincludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed on projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
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
              anyOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: { type: "string" }
                }
              ]
            }
          }
        ]
      },
      excludeProjectInterfaces: {
        description: "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should absolutely not be included even if they match with `includeProjectInterfaces`.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to exclude the project):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition and exclude the project\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition and exclude the project\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to no `ProjectInterfaces`, so all projects that match `includeProjectInterfaces` will be included\n\n@example\n\n```typescript\nexcludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed and exclude projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
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
              anyOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: { type: "string" }
                }
              ]
            }
          }
        ]
      },
      includePdpFactoryIds: {
        description: "String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory Ids that provided each project's metadata (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if the projects should be included.\n\nDefaults to all Project Data Provider Factory Ids, so all projects that do not match `excludePdpFactoryIds` will be included",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: { type: "string" }
          }
        ]
      },
      excludePdpFactoryIds: {
        description: "String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory Ids that provided each project's metadata (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if the projects should absolutely not be included even if they match with `includeProjectInterfaces`.\n\nDefaults to none, so all projects that match `includePdpFactoryIds` will be included",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: { type: "string" }
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
          },
          isHidden: {
            description: `Boolean that controls whether a setting should be hidden or not. If hidden
            , the setting will not show up in the settings dialog in \`paranext-core\`, and thus
            will not be configurable by the user unless an extension provides a way to interact with
            the setting.`,
            type: "boolean"
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
function $(s) {
  s && Object.values(s).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && $(e.properties);
    }
  });
}
$(O);
const Ie = {
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
  $defs: O
};
Object.freeze(Ie);
const we = {
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
  $defs: O
};
Object.freeze(we);
const ee = {
  languageStrings: {
    description: "Map whose keys are localized string keys and whose values provide information about how to localize strings for the localized string key",
    type: "object",
    patternProperties: {
      "^%[\\w\\-\\.]+%$": {
        $ref: "#/$defs/localizedStringValue"
      }
    },
    additionalProperties: !1
  },
  localizedStringValue: {
    description: "Localized string value associated with this key",
    type: "string"
  },
  stringsMetadata: {
    description: "Map whose keys are localized string keys and whose values provide additional non-locale-specific information about the localized string key",
    type: "object",
    patternProperties: {
      "^%[\\w\\-\\.]+%$": {
        $ref: "#/$defs/stringMetadata"
      }
    },
    additionalProperties: !1
  },
  stringMetadata: {
    description: "Additional non-locale-specific information about a localized string key",
    type: "object",
    properties: {
      fallbackKey: {
        description: "Localized string key from which to get this value if one does not exist in the specified language. If a new key/value pair needs to be made to replace an existing one, this could help smooth over the transition if the meanings are close enough.\nYou can use Paratext 9 Localized String Keys here. Be sure to escape any % signs with a backslash `\\`.",
        type: "string",
        pattern: "^%[\\w\\-\\.;&,' (){}#:/\\\\?%⋮|[\\]“”‘’!~* +=•`…​↑↓]+%$",
        tsType: "LocalizeKey"
      },
      notes: {
        description: "Additional information provided by developers in English to help the translator to know how to translate this localized string accurately",
        type: "string"
      },
      deprecationInfo: {
        description: "If this property is filled, the localized string is deprecated. Contains information about the deprecation.",
        $ref: "#/$defs/localizedStringDeprecationInfo"
      }
    }
  },
  localizedStringDeprecationInfo: {
    description: "Date of deprecation, the reason for deprecation, and what to use instead in what contexts",
    type: "object",
    properties: {
      date: {
        description: `Date of deprecation. Must be in YYYY-MM-DD format e.g. 2024-11-13.

Tested against regex \`^\\d\\d\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$\`.

Thanks to Vinod at https://stackoverflow.com/a/22061879 for the regex.`,
        type: "string",
        pattern: "^\\d\\d\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$",
        tsType: "DateYYYYMMDD"
      },
      message: {
        description: `Should contain the reason for deprecation and what to use instead in what contexts.

@example Reworded to clarify the meaning. Use %my_key_2% instead.`,
        type: "string"
      }
    },
    required: ["date", "message"]
  },
  localizeKey: {
    description: "Identifier for a string that will be localized based on the user's UI language",
    type: "string",
    pattern: "^%[\\w\\-\\.]+%$",
    tsType: "LocalizeKey"
  }
};
$(ee);
const Se = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Localized String Data Contribution",
  description: "The data an extension provides to inform Platform.Bible of the localized strings it provides.",
  type: "object",
  properties: {
    metadata: {
      $ref: "#/$defs/stringsMetadata"
    },
    localizedStrings: {
      type: "object",
      additionalProperties: {
        $ref: "#/$defs/languageStrings"
      }
    }
  },
  $defs: ee
};
Object.freeze(Se);
const Pe = {
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
    defaultWebViewTabMenu: {
      description: "Default menu that opens when you right click a tab itself",
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
            },
            isExperimental: {
              description: "Set to `true` to mark this extension point as experimental. Experimental menu content may change or be removed without notice.",
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
        },
        isExperimental: {
          description: "Set to `true` to mark this columns collection as experimental. Experimental menu content may change or be removed without notice.",
          type: "boolean"
        }
      },
      // Reject unknown keys at the collection level (e.g. a typo'd `isExperimentl`). Column entries
      // are still allowed via `patternProperties` above.
      additionalProperties: !1
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
                },
                isExperimental: {
                  description: "Set to `true` to mark this extension point as experimental. Experimental menu content may change or be removed without notice.",
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
                },
                isExperimental: {
                  description: "Set to `true` to mark this extension point as experimental. Experimental menu content may change or be removed without notice.",
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
              description: "Uri path to the icon to display before the menu text. Ex: `papi-extension://helloWorld/assets/icon.png`",
              type: "string"
            },
            iconPathAfter: {
              description: "Uri path to the icon to display after the menu text. Ex: `papi-extension://helloWorld/assets/icon.png`",
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
        },
        hiddenInterfaceModes: {
          description: "Interface modes in which this menu item should be hidden. Omit (or use an empty array) for items that should show in every mode.",
          type: "array",
          items: { enum: ["simple", "power"] },
          uniqueItems: !0
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
        },
        tabMenu: {
          description: "Menu that opens when you right click the tab itself",
          $ref: "#/$defs/singleColumnMenu"
        },
        isExperimental: {
          description: "Set to `true` to mark this WebView menu as experimental. Experimental menu content may change or be removed without notice.",
          type: "boolean"
        }
      },
      additionalProperties: !1
    }
  }
};
Object.freeze(Pe);
function qt(s, e) {
  return !s.installed && s.projectId === "" ? !1 : s.projectId !== "" && s.projectId === e ? !0 : s.dblEntryUid !== "" && e.toLowerCase().startsWith(s.dblEntryUid.toLowerCase());
}
const te = {
  themeCssVariables: {
    description: "Theme colors and other CSS variable properties that adjust the looks of the application. These are applied in CSS properties using `var(--variableName)` or Tailwind classes like `tw:bg-primary`\n\nSee [shadcn's Theming page](https://ui.shadcn.com/docs/theming#theme-tokens) and the wiki's [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme) section for more information.",
    type: "object",
    properties: {
      background: {
        description: "Default application background color. Applied to the page shell and page sections.",
        type: "string"
      },
      foreground: {
        description: "Default text color. Applied to the page shell and general text content.",
        type: "string"
      },
      card: {
        description: "Surface color for elevated containers such as cards and dashboard panels.",
        type: "string"
      },
      "card-foreground": {
        description: "Text and content color inside card surfaces.",
        type: "string"
      },
      popover: {
        description: "Surface color for floating overlays such as dropdowns and context menus.",
        type: "string"
      },
      "popover-foreground": {
        description: "Text and content color inside floating overlay surfaces.",
        type: "string"
      },
      primary: {
        description: "High-emphasis action and brand surface color. Applied to the default button, selected states, and active accents.",
        type: "string"
      },
      "primary-foreground": {
        description: "Text and content color rendered on primary surfaces.",
        type: "string"
      },
      secondary: {
        description: "Lower-emphasis filled action and supporting surface color. Applied to secondary buttons and supporting UI.",
        type: "string"
      },
      "secondary-foreground": {
        description: "Text and content color rendered on secondary surfaces.",
        type: "string"
      },
      muted: {
        description: "Subtle background surface color for de-emphasized regions.",
        type: "string"
      },
      "muted-foreground": {
        description: "Lower-emphasis text color. Applied to descriptions, placeholders, helper text, and subdued content.",
        type: "string"
      },
      accent: {
        description: "Interactive hover, focus, and active surface color. Applied to ghost buttons, menu highlights, and hovered rows.",
        type: "string"
      },
      "accent-foreground": {
        description: "Text and content color rendered on accent surfaces.",
        type: "string"
      },
      destructive: {
        description: "Color representing destructive actions and error states. Applied to destructive buttons and invalid states.",
        type: "string"
      },
      "destructive-foreground": {
        description: "Text and content color rendered on destructive surfaces.",
        type: "string"
      },
      "success-foreground": {
        description: "Color to emphasize the success of some action",
        type: "string"
      },
      warning: {
        description: "Color representing warning states such as caution, advisories, and non-critical issues.",
        type: "string"
      },
      "warning-foreground": {
        description: "Text and content color rendered on warning surfaces.",
        type: "string"
      },
      border: {
        description: "Default border and separator color. Applied to cards, menus, tables, and layout dividers.",
        type: "string"
      },
      input: {
        description: "Border and surface treatment color for form controls such as inputs, text areas, and selects.",
        type: "string"
      },
      ring: {
        description: "Focus ring and outline color applied to buttons, inputs, checkboxes, and other focusable controls.",
        type: "string"
      },
      "chart-1": { description: "First color in the default chart palette.", type: "string" },
      "chart-2": { description: "Second color in the default chart palette.", type: "string" },
      "chart-3": { description: "Third color in the default chart palette.", type: "string" },
      "chart-4": { description: "Fourth color in the default chart palette.", type: "string" },
      "chart-5": { description: "Fifth color in the default chart palette.", type: "string" },
      sidebar: { description: "Base sidebar container surface color.", type: "string" },
      "sidebar-foreground": {
        description: "Default text color inside the sidebar.",
        type: "string"
      },
      "sidebar-primary": {
        description: "High-emphasis action color inside the sidebar. Applied to active items, icon tiles, and sidebar badges.",
        type: "string"
      },
      "sidebar-primary-foreground": {
        description: "Text and content color rendered on primary sidebar surfaces.",
        type: "string"
      },
      "sidebar-accent": {
        description: "Hover and selected state surface color inside the sidebar. Applied to menu hover states and open items.",
        type: "string"
      },
      "sidebar-accent-foreground": {
        description: "Text and content color rendered on sidebar accent surfaces.",
        type: "string"
      },
      "sidebar-border": {
        description: "Border and separator color specific to the sidebar. Applied to sidebar headers, groups, and internal dividers.",
        type: "string"
      },
      "sidebar-ring": {
        description: "Focus ring color for controls inside the sidebar.",
        type: "string"
      },
      radius: {
        description: "Base corner radius scale. Applied to cards, inputs, buttons, popovers, and the derived radius-* tokens.",
        type: "string"
      },
      spacing: {
        description: "Base spacing unit. Controls the size of all Tailwind spacing utilities (padding, margin, gap, etc.).",
        type: "string"
      }
    },
    additionalProperties: { anyOf: [{ type: "string" }, { type: "null" }] }
  },
  themeDefinition: {
    description: "The data an extension provides for one individual theme. Each theme has a type (e.g. light, dark) and belongs to a theme family. An extension can provide multiple themes with {@link ThemeContribution}.",
    type: "object",
    properties: {
      label: {
        description: "LocalizeKey that is the display name for the theme",
        type: "string",
        pattern: "^%[\\w\\-\\.]+%$",
        tsType: "LocalizeKey"
      },
      cssVariables: {
        $ref: "#/$defs/themeCssVariables"
      }
    },
    required: ["label", "cssVariables"]
  },
  themeFamily: {
    description: `A group of related themes. Each key is a theme type, and each value is a {@link ThemeDefinition}.

A theme type indicates the kind of theme (e.g. light, dark). Some UI elements use the theme type to determine how to look. Colors not present in the theme will fall back to the built-in colors for this type.`,
    type: "object",
    properties: {
      light: {
        $ref: "#/$defs/themeDefinition"
      },
      dark: {
        $ref: "#/$defs/themeDefinition"
      }
    },
    additionalProperties: {
      anyOf: [
        {
          $ref: "#/$defs/themeDefinition"
        },
        { type: "null" }
      ]
    }
  },
  themeFamiliesById: {
    description: "Object whose keys are theme family ids and whose values are {@link ThemeFamily}.",
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#/$defs/themeFamily"
        },
        { type: "null" }
      ]
    }
  }
};
$(te);
const Te = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: te
};
Object.freeze(Te);
const Ce = "theme-styles";
function qe(s, e) {
  return `${s ? `${s}-` : ""}${e}`;
}
function At(s, e) {
  return Object.fromEntries(
    Object.entries(s).map(([r, i]) => [
      r,
      i ? Object.fromEntries(
        Object.entries(i).map(([n, c]) => {
          var p;
          return [
            n,
            c ? {
              ...c,
              // Add the derived properties
              themeFamilyId: r,
              type: n,
              id: qe(r, n),
              cssVariables: {
                // Fill in the default css variables
                ...(p = e == null ? void 0 : e[n]) == null ? void 0 : p.cssVariables,
                ...c.cssVariables
              }
            } : void 0
          ];
        }).filter(([, n]) => !!n)
      ) : void 0
    ]).filter(([, r]) => !!r)
  );
}
function Ae(s) {
  return `
.${s.id} {
${Object.entries(s.cssVariables).map(([e, t]) => `  --${e}: ${t};`).join(`
`)}
}
`;
}
function $t(s, e, t) {
  const r = e == null ? void 0 : e.dataset.themeId;
  r && this.document.body.classList.remove(r), this.document.body.classList.add(s.id), e && this.document.head.removeChild(e);
  const i = this.document.createElement("style");
  return i.id = `${Ce}${t ? `-${t}` : ""}`, i.dataset.themeId = s.id, i.textContent = Ae(s), this.document.head.appendChild(i), i;
}
function re(s) {
  return Object.freeze(s), s == null || Object.getOwnPropertyNames(s).forEach(function(t) {
    // Need to make sure to avoid null, which is an object type
    // eslint-disable-next-line no-null/no-null
    s[t] !== null && (typeof s[t] == "object" || typeof s[t] == "function") && !Object.isFrozen(s[t]) && re(s[t]);
  }), s;
}
const F = re({
  version: "3.0.7",
  schemaRepo: "https://github.com/ubsicap/usx.git",
  schemaCommit: "6c490bb5675d281b0fa01876fe67f6e3fd50a4ce",
  markersMapVersion: "1.0.0",
  usfmToolsCommit: "979b4d5cf16c04f6744fe1fc5c730807a8b90187",
  markers: {
    add: {
      type: "char",
      description: "For a translational addition to the text"
    },
    addpn: {
      type: "char",
      description: "For chinese words to be dot underline & underline (DEPRECATED - used nested char@style pn)"
    },
    b: {
      type: "para",
      description: "Poetry text stanza break (e.g. stanza break)"
    },
    bd: {
      type: "char",
      description: "A character style, use bold text"
    },
    bdit: {
      type: "char",
      description: "A character style, use bold + italic text"
    },
    bk: {
      type: "char",
      description: "For the quoted name of a book"
    },
    c: {
      type: "chapter",
      leadingAttributes: ["number"],
      attributeMarkers: ["ca", "cp"]
    },
    ca: {
      type: "char",
      attributeMarkerAttributeName: "altnumber",
      isAttributeMarkerFor: ["c"],
      hasStructuralSpaceAfterCloseAttributeMarker: !0,
      description: "Second (alternate) chapter number"
    },
    cat: {
      type: "char",
      attributeMarkerAttributeName: "category",
      isAttributeMarkerFor: ["ef", "efe", "esb", "ex", "f", "fe", "x"],
      description: "Note category (study Bible)"
    },
    cd: {
      type: "para",
      description: "Chapter Description (Publishing option D, e.g. in Russian Bibles)"
    },
    cl: {
      type: "para",
      description: 'Chapter label used for translations that add a word such as "Chapter"'
    },
    cls: {
      type: "para",
      description: "Closure of an Epistle"
    },
    cp: {
      type: "para",
      description: "Published chapter number",
      attributeMarkerAttributeName: "pubnumber",
      isAttributeMarkerFor: ["c"]
    },
    d: {
      type: "para",
      description: "A Hebrew text heading, to provide description (e.g. Psalms)"
    },
    dc: {
      type: "char",
      description: "Deuterocanonical/LXX additions or insertions in the Protocanonical text"
    },
    ef: {
      type: "note",
      description: "Study note",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    efe: {
      type: "note",
      description: "Extended study endnote",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    efm: {
      type: "char",
      description: "Reference to caller of previous footnote in a study Bible"
    },
    em: {
      type: "char",
      description: "A character style, use emphasized text style"
    },
    esb: {
      type: "sidebar",
      independentClosingMarkers: ["esbe"],
      attributeMarkers: ["cat"]
    },
    esbe: {
      type: "sidebar",
      isIndependentClosingMarkerFor: ["esb"]
    },
    ex: {
      type: "note",
      description: "Extended cross reference",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    f: {
      type: "note",
      description: "Footnote",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    fdc: {
      type: "char",
      description: "Footnote text, applies to Deuterocanon only (DEPRECATED - use char@style dc)",
      isClosingMarkerOptional: !0
    },
    fe: {
      type: "note",
      description: "Endnote",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    fig: {
      type: "figure"
    },
    fk: {
      type: "char",
      description: "A footnote keyword",
      isClosingMarkerOptional: !0
    },
    fl: {
      type: "char",
      description: 'A footnote label text item, for marking or "labelling" the type or alternate translation being provided in the note.',
      isClosingMarkerOptional: !0
    },
    fm: {
      type: "char",
      description: "Reference to caller of previous footnote"
    },
    fp: {
      type: "char",
      description: "A Footnote additional paragraph marker",
      isClosingMarkerOptional: !0
    },
    fq: {
      type: "char",
      description: "A footnote scripture quote or alternate rendering",
      isClosingMarkerOptional: !0
    },
    fqa: {
      type: "char",
      description: "A footnote alternate rendering for a portion of scripture text",
      isClosingMarkerOptional: !0
    },
    fr: {
      type: "char",
      description: "The origin reference for the footnote",
      isClosingMarkerOptional: !0
    },
    ft: {
      type: "char",
      description: "Footnote text, Protocanon",
      isClosingMarkerOptional: !0
    },
    fv: {
      type: "char",
      description: "A verse number within the footnote text"
    },
    fw: {
      type: "char",
      description: "A footnote witness list, for distinguishing a list of sigla representing witnesses in critical editions.",
      isClosingMarkerOptional: !0
    },
    h: {
      type: "para",
      description: "Running header text for a book"
    },
    h1: {
      type: "para",
      description: "Running header text (DEPRECATED)"
    },
    h2: {
      type: "para",
      description: "Running header text, left side of page (DEPRECATED)"
    },
    h3: {
      type: "para",
      description: "Running header text, right side of page (DEPRECATED)"
    },
    ib: {
      type: "para",
      description: "Introduction blank line"
    },
    id: {
      type: "book",
      leadingAttributes: ["code"]
    },
    ide: {
      type: "para",
      description: "File encoding information"
    },
    ie: {
      type: "para",
      description: "Introduction ending marker"
    },
    iex: {
      type: "para",
      description: "Introduction explanatory or bridge text (e.g. explanation of missing book in Short Old Testament)"
    },
    ili: {
      type: "para",
      description: "A list entry, level 1 (if single level)"
    },
    ili1: {
      type: "para",
      description: "A list entry, level 1 (if multiple levels)"
    },
    ili2: {
      type: "para",
      description: "A list entry, level 2"
    },
    im: {
      type: "para",
      description: "Introduction prose paragraph, with no first line indent (may occur after poetry)"
    },
    imi: {
      type: "para",
      description: "Introduction prose paragraph text, indented, with no first line indent"
    },
    imq: {
      type: "para",
      description: "Introduction prose paragraph, quote from the body text, with no first line indent"
    },
    imt: {
      type: "para",
      description: `Introduction major title, level 1 (if single level)
Introduction major title, level 1 - (if single level)`
    },
    imt1: {
      type: "para",
      description: "Introduction major title, level 1 (if multiple levels)"
    },
    imt2: {
      type: "para",
      description: "Introduction major title, level 2"
    },
    imt3: {
      type: "para",
      description: "Introduction major title, level 3"
    },
    imt4: {
      type: "para",
      description: "Introduction major title, level 4 (usually within parenthesis)"
    },
    imte: {
      type: "para",
      description: "Introduction major title at introduction end, level 1 (if single level)"
    },
    imte1: {
      type: "para",
      description: "Introduction major title at introduction end, level 1 (if multiple levels)"
    },
    imte2: {
      type: "para",
      description: "Introduction major title at introduction end, level 2"
    },
    io: {
      type: "para",
      description: "Introduction outline text, level 1 (if single level)"
    },
    io1: {
      type: "para",
      description: "Introduction outline text, level 1 (if multiple levels)"
    },
    io2: {
      type: "para",
      description: "Introduction outline text, level 2"
    },
    io3: {
      type: "para",
      description: "Introduction outline text, level 3"
    },
    io4: {
      type: "para",
      description: "Introduction outline text, level 4"
    },
    ior: {
      type: "char",
      description: "Introduction references range for outline entry; for marking references separately"
    },
    iot: {
      type: "para",
      description: "Introduction outline title"
    },
    ip: {
      type: "para",
      description: `Introduction prose paragraph
Division or Section introductory paragraph (study Bible)`
    },
    ipi: {
      type: "para",
      description: "Introduction prose paragraph, indented, with first line indent"
    },
    ipq: {
      type: "para",
      description: "Introduction prose paragraph, quote from the body text"
    },
    ipr: {
      type: "para",
      description: "Introduction prose paragraph, right aligned"
    },
    iq: {
      type: "para",
      description: "Introduction poetry text, level 1 (if single level)"
    },
    iq1: {
      type: "para",
      description: "Introduction poetry text, level 1 (if multiple levels)"
    },
    iq2: {
      type: "para",
      description: "Introduction poetry text, level 2"
    },
    iq3: {
      type: "para",
      description: "Introduction poetry text, level 3"
    },
    iqt: {
      type: "char"
    },
    is: {
      type: "para",
      description: "Introduction section heading, level 1 (if single level)"
    },
    is1: {
      type: "para",
      description: "Introduction section heading, level 1 (if multiple levels)"
    },
    is2: {
      type: "para",
      description: "Introduction section heading, level 2"
    },
    it: {
      type: "char",
      description: "A character style, use italic text"
    },
    jmp: {
      type: "char",
      defaultAttribute: "link-href",
      description: "For associating linking attributes to a span of text"
    },
    k: {
      type: "char",
      description: "For a keyword"
    },
    k1: {
      type: "para",
      description: "Concordance main entry text or keyword, level 1"
    },
    k2: {
      type: "para",
      description: "Concordance main entry text or keyword, level 2"
    },
    lf: {
      type: "para",
      description: "List footer (introductory remark)"
    },
    lh: {
      type: "para",
      description: "List header (introductory remark)"
    },
    li: {
      type: "para",
      description: "A list entry, level 1 (if single level)"
    },
    li1: {
      type: "para",
      description: "A list entry, level 1 (if multiple levels)"
    },
    li2: {
      type: "para",
      description: "A list entry, level 2"
    },
    li3: {
      type: "para",
      description: "A list entry, level 3"
    },
    li4: {
      type: "para",
      description: "A list entry, level 4"
    },
    lik: {
      type: "char",
      description: "Structured list entry key text"
    },
    lim: {
      type: "para",
      description: "An embedded list entry, level 1 (if single level)"
    },
    lim1: {
      type: "para",
      description: "An embedded list entry, level 1 (if multiple levels)"
    },
    lim2: {
      type: "para",
      description: "An embedded list entry, level 2"
    },
    lim3: {
      type: "para",
      description: "An embedded list entry, level 3"
    },
    lim4: {
      type: "para",
      description: "An embedded list entry, level 4"
    },
    lit: {
      type: "para",
      description: "For a comment or note inserted for liturgical use"
    },
    litl: {
      type: "char",
      description: "List entry total text"
    },
    liv: {
      type: "char",
      description: "Structured list entry value 1 content (if single value)"
    },
    liv1: {
      type: "char",
      description: "Structured list entrt value 1 content (if multiple values)"
    },
    liv2: {
      type: "char",
      description: "Structured list entry value 2 content"
    },
    liv3: {
      type: "char",
      description: "Structured list entry value 3 content"
    },
    liv4: {
      type: "char",
      description: "Structured list entry value 4 content"
    },
    liv5: {
      type: "char",
      description: "Structured list entry value 5 content"
    },
    m: {
      type: "para",
      description: "Paragraph text, with no first line indent (may occur after poetry) aka: Paragraph Continuation"
    },
    mi: {
      type: "para",
      description: "Paragraph text, indented, with no first line indent; often used for discourse"
    },
    mr: {
      type: "para",
      description: "A major section division references range heading"
    },
    ms: {
      type: "para",
      description: "A major section division heading, level 1 (if single level)"
    },
    ms1: {
      type: "para",
      description: "A major section division heading, level 1 (if multiple levels)"
    },
    ms2: {
      type: "para",
      description: "A major section division heading, level 2"
    },
    ms3: {
      type: "para",
      description: "A major section division heading, level 3"
    },
    mt: {
      type: "para",
      description: "The main title of the book (if single level)"
    },
    mt1: {
      type: "para",
      description: "The main title of the book (if multiple levels)"
    },
    mt2: {
      type: "para",
      description: "A secondary title usually occurring before the main title"
    },
    mt3: {
      type: "para",
      description: "A tertiary title occurring after the main title"
    },
    mt4: {
      type: "para",
      description: `Introduction major title, level 1 (if single level)
A small secondary title sometimes occuring within parentheses`
    },
    mte: {
      type: "para",
      description: "The main title of the book repeated at the end of the book, level 1 (if single level)"
    },
    mte1: {
      type: "para",
      description: "The main title of the book repeat /ed at the end of the book, level 1 (if multiple levels)"
    },
    mte2: {
      type: "para",
      description: "A secondary title occurring before or after the 'ending' main title"
    },
    nb: {
      type: "para",
      description: "Paragraph text, with no break from previous paragraph text (at chapter boundary)"
    },
    nd: {
      type: "char",
      description: "For name of deity"
    },
    ndx: {
      type: "char",
      description: "A subject index text item"
    },
    no: {
      type: "char",
      description: "A character style, use normal text"
    },
    optbreak: {
      type: "optbreak"
    },
    ord: {
      type: "char",
      description: "For the text portion of an ordinal number"
    },
    p: {
      type: "para",
      description: `Paragraph text, with first line indent
Front or back matter text paragraph, level 1`
    },
    p1: {
      type: "para",
      description: "Front or back matter text paragraph, level 1 (if multiple levels)"
    },
    p2: {
      type: "para",
      description: "Front or back matter text paragraph, level 2 (if multiple levels)"
    },
    pb: {
      type: "para",
      description: "Page Break used for new reader portions and children's bibles where content is controlled by the page"
    },
    pc: {
      type: "para",
      description: "Inscription (paragraph text centered)"
    },
    periph: {
      type: "periph",
      textContentAttribute: "alt"
    },
    ph: {
      type: "para",
      description: "Paragraph text, with level 1 hanging indent (if single level) (DEPRECATED - use para@style li#)"
    },
    ph1: {
      type: "para",
      description: "Paragraph text, with level 1 hanging indent (if multiple levels)"
    },
    ph2: {
      type: "para",
      description: "Paragraph text, with level 2 hanging indent"
    },
    ph3: {
      type: "para",
      description: "Paragraph text, with level 3 hanging indent"
    },
    pi: {
      type: "para",
      description: "Paragraph text, level 1 indent (if single level), with first line indent; often used for discourse"
    },
    pi1: {
      type: "para",
      description: "Paragraph text, level 1 indent (if multiple levels), with first line indent; often used for discourse"
    },
    pi2: {
      type: "para",
      description: "Paragraph text, level 2 indent, with first line indent; often used for discourse"
    },
    pi3: {
      type: "para",
      description: "Paragraph text, level 3 indent, with first line indent; often used for discourse"
    },
    pm: {
      type: "para",
      description: "Embedded text paragraph"
    },
    pmc: {
      type: "para",
      description: "Embedded text closing"
    },
    pmo: {
      type: "para",
      description: "Embedded text opening"
    },
    pmr: {
      type: "para",
      description: "Embedded text refrain"
    },
    pn: {
      type: "char",
      description: "For a proper name"
    },
    png: {
      type: "char",
      description: "For a geographic proper name"
    },
    po: {
      type: "para",
      description: "Letter opening"
    },
    pr: {
      type: "para",
      description: "Text refrain (paragraph right-aligned)"
    },
    pro: {
      type: "char",
      description: "For indicating pronunciation in CJK texts (DEPRECATED - used char@style rb)"
    },
    q: {
      type: "para",
      description: "Poetry text, level 1 indent (if single level)"
    },
    q1: {
      type: "para",
      description: "Poetry text, level 1 indent (if multiple levels)"
    },
    q2: {
      type: "para",
      description: "Poetry text, level 2 indent"
    },
    q3: {
      type: "para",
      description: "Poetry text, level 3 indent"
    },
    q4: {
      type: "para",
      description: "Poetry text, level 4 indent"
    },
    qa: {
      type: "para",
      description: "Poetry text, Acrostic marker/heading"
    },
    qac: {
      type: "char",
      description: "Poetry text, Acrostic markup of the first character of a line of acrostic poetry"
    },
    qc: {
      type: "para",
      description: "Poetry text, centered"
    },
    qd: {
      type: "para",
      description: "A Hebrew musical performance annotation, similar in content to Hebrew descriptive title."
    },
    qm: {
      type: "para",
      description: "Poetry text, embedded, level 1 indent (if single level)"
    },
    qm1: {
      type: "para",
      description: "Poetry text, embedded, level 1 indent (if multiple levels)"
    },
    qm2: {
      type: "para",
      description: "Poetry text, embedded, level 2 indent"
    },
    qm3: {
      type: "para",
      description: "Poetry text, embedded, level 3 indent"
    },
    qr: {
      type: "para",
      description: "Poetry text, Right Aligned"
    },
    qs: {
      type: "char",
      description: "Poetry text, Selah"
    },
    qt: {
      type: "char",
      description: "For Old Testament quoted text appearing in the New Testament"
    },
    "qt-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt1-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt1-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt2-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt2-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt3-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt3-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt4-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt4-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt5-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt5-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    r: {
      type: "para",
      description: "Parallel reference(s)"
    },
    rb: {
      type: "char",
      defaultAttribute: "gloss"
    },
    ref: {
      type: "ref",
      defaultAttribute: "loc"
    },
    rem: {
      type: "para",
      description: "Remark"
    },
    restore: {
      type: "para",
      description: "Comment about when text was restored"
    },
    rq: {
      type: "char",
      description: "A cross-reference indicating the source text for the preceding quotation."
    },
    s: {
      type: "para",
      description: "A section heading, level 1 (if single level)"
    },
    s1: {
      type: "para",
      description: "A section heading, level 1 (if multiple levels)"
    },
    s2: {
      type: "para",
      description: "A section heading, level 2 (e.g. Proverbs 22-24)"
    },
    s3: {
      type: "para",
      description: 'A section heading, level 3 (e.g. Genesis "The First Day")'
    },
    s4: {
      type: "para",
      description: "A section heading, level 4"
    },
    sc: {
      type: "char",
      description: "A character style, for small capitalization text"
    },
    sd: {
      type: "para",
      description: "Vertical space used to divide the text into sections, level 1 (if single level)"
    },
    sd1: {
      type: "para",
      description: "Semantic division location (vertical space used to divide the text into sections), level 1 (if multiple levels)"
    },
    sd2: {
      type: "para",
      description: "Semantic division location (vertical space used to divide the text into sections), level 2"
    },
    sd3: {
      type: "para",
      description: "Semantic division location (vertical space used to divide the text into sections), level 3"
    },
    sd4: {
      type: "para",
      description: "Semantic division location (vertical space used to divide the text into sections), level 4"
    },
    sig: {
      type: "char",
      description: "For the signature of the author of an Epistle"
    },
    sls: {
      type: "char",
      description: "To represent where the original text is in a secondary language or from an alternate text source"
    },
    sp: {
      type: "para",
      description: "A heading, to identify the speaker (e.g. Job)"
    },
    sr: {
      type: "para",
      description: "A section division references range heading"
    },
    sts: {
      type: "para",
      description: `Status
Remark`
    },
    sup: {
      type: "char",
      description: "A character style, for superscript text. Typically for use in critical edition footnotes."
    },
    "t-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "t-s": {
      type: "ms",
      defaultAttribute: "sid"
    },
    table: {
      type: "table"
    },
    tl: {
      type: "char",
      description: "For transliterated words"
    },
    toc1: {
      type: "para",
      description: "Long table of contents text"
    },
    toc2: {
      type: "para",
      description: "Short table of contents text"
    },
    toc3: {
      type: "para",
      description: "Book Abbreviation"
    },
    toca1: {
      type: "para",
      description: "Alternative language long table of contents text"
    },
    toca2: {
      type: "para",
      description: "Alternative language short table of contents text"
    },
    toca3: {
      type: "para",
      description: "Alternative language book Abbreviation"
    },
    tr: {
      type: "row",
      description: "Table row"
    },
    ts: {
      type: "ms",
      description: "Translator's chunk (to identify chunks of text suitable for translating at one time)"
    },
    "ts-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "ts-s": {
      type: "ms",
      defaultAttribute: "sid"
    },
    usfm: {
      type: "para",
      textContentAttribute: "version",
      parseUsfmInstructions: "If this marker is directly after the first id marker, this marker's version attribute should determine the version attribute of the usx or USJ marker at the top of the USX or USJ document, then this marker should be removed."
    },
    USJ: {
      type: "USJ",
      textContentAttribute: "version",
      markerUsfm: "usfm"
    },
    usx: {
      type: "usx",
      textContentAttribute: "version",
      markerUsfm: "usfm"
    },
    v: {
      type: "verse",
      leadingAttributes: ["number"],
      attributeMarkers: ["va", "vp"]
    },
    va: {
      type: "char",
      attributeMarkerAttributeName: "altnumber",
      isAttributeMarkerFor: ["v"],
      hasStructuralSpaceAfterCloseAttributeMarker: !0,
      description: "Second (alternate) verse number (for coding dual numeration in Psalms; see also NRSV Exo 22.1-4)"
    },
    vp: {
      type: "char",
      description: "Published verse marker - this is a verse marking that would be used in the published text",
      attributeMarkerAttributeName: "pubnumber",
      isAttributeMarkerFor: ["v"],
      hasStructuralSpaceAfterCloseAttributeMarker: !0
    },
    w: {
      type: "char",
      defaultAttribute: "lemma"
    },
    wa: {
      type: "char",
      description: "An Aramaic wordlist text item"
    },
    wg: {
      type: "char",
      description: "A Greek Wordlist text item"
    },
    wh: {
      type: "char",
      description: "A Hebrew wordlist text item"
    },
    wj: {
      type: "char",
      description: "For marking the words of Jesus"
    },
    x: {
      type: "note",
      description: "Cross reference",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    xdc: {
      type: "char",
      description: "Cross-reference target reference(s), Deuterocanon only (DEPRECATED - use char@style dc)",
      isClosingMarkerOptional: !0
    },
    xk: {
      type: "char",
      description: "A cross reference keyword",
      isClosingMarkerOptional: !0
    },
    xnt: {
      type: "char",
      description: "Cross-reference target reference(s), New Testament only",
      isClosingMarkerOptional: !0
    },
    xo: {
      type: "char",
      description: "The cross reference origin reference",
      isClosingMarkerOptional: !0
    },
    xop: {
      type: "char",
      description: "Published cross reference origin text (origin reference that should appear in the published text)",
      isClosingMarkerOptional: !0
    },
    xot: {
      type: "char",
      description: "Cross-reference target reference(s), Old Testament only",
      isClosingMarkerOptional: !0
    },
    xq: {
      type: "char",
      description: "A cross-reference quotation from the scripture text",
      isClosingMarkerOptional: !0
    },
    xt: {
      type: "char",
      defaultAttribute: "link-href",
      description: `A target reference(s)
A cross reference target reference(s)
The cross reference target reference(s), protocanon only`,
      isClosingMarkerOptional: !0
    },
    xta: {
      type: "char",
      description: "Cross reference target references added text",
      isClosingMarkerOptional: !0
    }
  },
  markersRegExp: {
    "[Zz].+": {
      type: "ms",
      defaultAttribute: "sid"
    },
    "qt[1-5]?(\\-[se])?": {
      type: "ms",
      defaultAttribute: "sid"
    },
    "t[hc][rc]?\\d+": {
      type: "cell"
    },
    "ts?(\\-[se])?": {
      type: "ms",
      defaultAttribute: "sid"
    }
  },
  markerTypes: {
    book: {},
    cell: {
      skipOutputAttributeToUsfm: ["align"],
      outputToUsfmInstructions: "If this marker has a colspan attribute, the USFM marker name should be this marker's name plus hyphen (-) plus the marker's final column number (first column number found in the marker name plus colspan minus 1). Then the colspan attribute should not be output as a USFM attribute.",
      parseUsfmInstructions: "If this marker's name has a hyphen (-) and a number after the marker, the USX/USJ marker name should be just the portion of the marker name before the hyphen, and it should have the colspan attribute which is the number of columns spanned by the marker (second column number plus 1 minus first column number).",
      markerTypeUsj: "table:cell"
    },
    chapter: {
      hasNewlineBefore: !0,
      skipOutputAttributeToUsfm: ["sid"],
      skipOutputMarkerToUsfmIfAttributeIsPresent: ["eid"]
    },
    char: {
      isCloseable: !0,
      nestedPrefix: "+"
    },
    figure: {
      isCloseable: !0,
      outputToUsfmInstructions: "The USX/USJ file attribute needs its name changed to src in USFM",
      parseUsfmInstructions: "The USFM src attribute needs its name changed to file in USX/USJ"
    },
    ms: {
      isCloseable: !0,
      isClosingMarkerEmpty: !0
    },
    note: {
      isCloseable: !0
    },
    optbreak: {
      hasStyleAttribute: !1
    },
    para: {
      hasNewlineBefore: !0,
      skipOutputAttributeToUsfm: ["vid"]
    },
    periph: {
      hasNewlineBefore: !0,
      hasStyleAttribute: !1
    },
    ref: {
      isCloseable: !0,
      hasStyleAttribute: !1,
      skipOutputMarkerToUsfmIfAttributeIsPresent: ["gen"],
      skipOutputMarkerToUsfm: !0
    },
    row: {
      hasNewlineBefore: !0,
      markerTypeUsj: "table:row"
    },
    sidebar: {
      hasNewlineBefore: !0
    },
    table: {
      hasStyleAttribute: !1,
      skipOutputAttributeToUsfm: ["vid"],
      skipOutputMarkerToUsfm: !0
    },
    "table:cell": {
      skipOutputAttributeToUsfm: ["align"],
      outputToUsfmInstructions: "If this marker has a colspan attribute, the USFM marker name should be this marker's name plus hyphen (-) plus the marker's final column number (first column number found in the marker name plus colspan minus 1). Then the colspan attribute should not be output as a USFM attribute.",
      parseUsfmInstructions: "If this marker's name has a hyphen (-) and a number after the marker, the USX/USJ marker name should be just the portion of the marker name before the hyphen, and it should have the colspan attribute which is the number of columns spanned by the marker (second column number plus 1 minus first column number).",
      markerTypeUsj: "table:cell",
      markerTypeUsfm: "cell",
      markerTypeUsx: "cell"
    },
    "table:row": {
      hasNewlineBefore: !0,
      markerTypeUsj: "table:row",
      markerTypeUsfm: "row",
      markerTypeUsx: "row"
    },
    unmatched: {
      description: "Paratext uses this type for closing markers that it cannot find opening markers for. They are treated like char markers but have no contents, no closing markers, and no space after the marker.",
      outputToUsfmInstructions: "Do not output a structural space after the opening marker for markers with unmatched type.",
      parseUsfmInstructions: "If a closing marker occurs but does not seem to have a matching opening marker, create an unmatched-type marker. There is no structural space after the unmatched-type marker; its end is determined by the asterisk at the end of the marker."
    },
    USJ: {
      hasNewlineBefore: !0,
      hasStyleAttribute: !1,
      skipOutputAttributeToUsfm: ["xsi:noNamespaceSchemaLocation"],
      outputToUsfmInstructions: "If this marker is the top-level marker containing all other markers in this document, it should not be directly output to USFM. Instead, if this marker's version attribute is other than 3.0, a new usfm marker with this version attribute needs to be added after the id marker if one is present in the USFM."
    },
    usx: {
      hasNewlineBefore: !0,
      hasStyleAttribute: !1,
      skipOutputAttributeToUsfm: ["xsi:noNamespaceSchemaLocation"],
      outputToUsfmInstructions: "If this marker is the top-level marker containing all other markers in this document, it should not be directly output to USFM. Instead, if this marker's version attribute is other than 3.0, a new usfm marker with this version attribute needs to be added after the id marker if one is present in the USFM."
    },
    verse: {
      hasNewlineBefore: !0,
      skipOutputAttributeToUsfm: ["sid"],
      skipOutputMarkerToUsfmIfAttributeIsPresent: ["eid"]
    }
  }
}), jt = Object.freeze({
  ...F,
  isSpaceAfterAttributeMarkersContent: !0,
  shouldOptionalClosingMarkersBePresent: !0
}), T = ["figure", "note", "sidebar", "table"];
Object.freeze(T);
const $e = /\u00A0/g, je = /\w+(\d+)/, Ne = /(\d+)-?(\d+)?/;
class g {
  constructor(e, t) {
    k(this, "usj");
    k(this, "markersMap");
    k(this, "shouldAllowInvisibleCharacters");
    // Cached properties
    k(this, "parentMapInternal");
    k(this, "fragmentsByIndexInUsfmInternal");
    k(this, "fragmentsByJsonPathInternal");
    k(this, "indicesInUsfmByVerseRefInternal");
    k(this, "usfmInternal");
    this.usj = e;
    const { markersMap: r, shouldAllowInvisibleCharacters: i } = t ?? {};
    if (r)
      this.markersMap = r, g.areUsjVersionsCompatible(this.usj.version, this.markersMap.version) || console.warn(
        `Warning: USJ provided has version ${this.usj.version}, but provided markers map has version ${this.markersMap.version}. This may cause unexpected issues when transforming between formats.
USJ: ${JSON.stringify(
          this.usj
        )}`
      );
    else if (g.areUsjVersionsCompatible(this.usj.version, F.version))
      this.markersMap = F;
    else
      throw new Error(
        "USJ version is not 3.0 or 3.0.x! Not equipped to handle yet without passing in a markers map"
      );
    if (!this.markersMap.markersMapVersion.startsWith("1."))
      throw new Error(
        `Incompatible markers map version: ${this.markersMap.markersMapVersion}. This class only supports version 1.x.y`
      );
    this.shouldAllowInvisibleCharacters = i ?? !1;
  }
  // If new variables are created to speed up queries, they should be reset here
  usjChanged() {
    this.parentMapInternal = void 0, this.fragmentsByIndexInUsfmInternal = void 0, this.fragmentsByJsonPathInternal = void 0, this.indicesInUsfmByVerseRefInternal = void 0, this.usfmInternal = void 0;
  }
  static areUsjVersionsCompatible(e, t) {
    return e === "3.0" || e.startsWith("3.0.") ? t === "3.0" || t.startsWith("3.0.") : e === t;
  }
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(e) {
    const t = P({ path: e, json: this.usj, wrap: !0 });
    if (t === void 0 || t.length === 0) return;
    if (!Array.isArray(t[0])) return t[0];
    const r = P({ path: e, json: this.usj, wrap: !1 });
    return r.length === 1 && Array.isArray(r[0]) ? r[0] : r;
  }
  findParent(e) {
    return this.findSingleValue(`${e}^`);
  }
  // #endregion Directly using the JSONPath package to perform JSONPath query -> USJ node
  // #region marker helper methods
  /**
   * Determine if the passed in marker is the top-level USJ marker.
   *
   * Note that USJ markers that are not the top-level USJ markers technically should not occur, but
   * they can occur. We should treat them like any other marker. They conform to
   * {@link MarkerObject}, so it's not hard to do.
   *
   * @param marker Marker to test if it is USJ marker
   * @returns `true` if it is a USJ marker; false otherwise
   */
  static isTopLevelUsjMarker(e, t) {
    return typeof e == "object" && e.type === ce && t.length === 0;
  }
  /**
   * Determine if a fragment is a marker, not a text content string or some kind of position
   * fragment that isn't actually a marker e.g. closing marker fragment
   */
  static isFragmentAMarker(e) {
    return !_(e) && !("forMarker" in e);
  }
  // #endregion marker helper methods
  // #region Parent Maps
  static createParentMapInternal(e, t, r) {
    var i;
    r.set(e, t), e.content && r.set(e.content, e), (i = e.content) == null || i.forEach((n) => {
      typeof n == "object" && g.createParentMapInternal(n, e, r);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((t) => {
      typeof t == "object" && g.createParentMapInternal(t, this.usj, e);
    }), e;
  }
  /** Create the parent map if it doesn't already exist and return it */
  get parentMap() {
    return this.parentMapInternal ? this.parentMapInternal : (this.parentMapInternal = this.createUsjParentMap(), this.parentMapInternal);
  }
  // #endregion Parent Maps
  // #region Working Stacks
  /**
   * Checks if two stack items are equal using shallow equivalence, testing the stack item
   * properties for [strict
   * equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
   *
   * Note that this requires the parent of the two stack items to have reference equality
   */
  static areStackItemsShallowEqual(e, t) {
    return e.index === t.index && e.parent === t.parent;
  }
  /** Return the working stack applicable to the given node */
  createWorkingStack(e) {
    const t = [], { parentMap: r } = this;
    let i = e, n = r.get(i);
    for (; n !== void 0; ) {
      if (!n.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !n.content.find((c, p) => {
          if (c !== i) return !1;
          if (!n) throw new Error('undefined "tempParent" should not be possible');
          return t.unshift({ parent: n, index: p }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(i)}`);
      i = n, n = r.get(n);
    }
    return t;
  }
  /**
   * Transform a JSONPath array (`JSONPath.toPathArray`) to a "normalized" JSONPath. We can use this
   * JSONPath for lookups in {@link FragmentsByJsonPath}
   */
  static jsonPathArrayToJsonPath(e) {
    return e.reduce((t, r) => r === "content" ? `${t}.${r}` : Number.isNaN(parseInt(r, 10)) ? `${t}['${r}']` : `${t}[${r}]`);
  }
  /** "Normalize" the JSONPath passed in so we can use it for lookups in {@link FragmentsByJsonPath} */
  static normalizeJsonPath(e) {
    const t = P.toPathArray(e);
    return g.jsonPathArrayToJsonPath(t);
  }
  /**
   * Returns a "normalized" JSONPath transformed from the working stack. We can use this JSONPath
   * for lookups in {@link FragmentsByJsonPath}
   */
  static convertWorkingStackToJsonPath(e) {
    let t = "$";
    return e.forEach((r) => {
      t = `${t}.content[${r.index}]`;
    }), t;
  }
  /**
   * Returns a "normalized" JSONPath transformed from the working stack and property. We can use
   * this JSONPath for lookups in {@link FragmentsByJsonPath}
   */
  static convertWorkingStackAndPropertyToJsonPath(e, t) {
    return `${g.convertWorkingStackToJsonPath(e)}['${t}']`;
  }
  convertJsonPathToWorkingStack(e) {
    const t = [];
    if (e === "$") return t;
    const r = e.match(/content\[(\d+)\]/g);
    if (!r) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let i = this.usj;
    return r.forEach((n, c) => {
      const p = /(\d+)/.exec(n);
      if (!p) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const d = parseInt(p[0], 10);
      if (t.push({ parent: i, index: d }), c + 1 < r.length) {
        if (typeof i == "string" || !i.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(i)}`);
        const l = i.content[d];
        if (typeof l == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(l)}`);
        i = l;
      }
    }), t;
  }
  // #endregion Working Stacks
  // #region Walk the node tree
  /**
   * Extract textual notes (aka, "footnotes") from a full USJ object.
   *
   * @returns An array of MarkerObjects representing all textual notes found in the USJ content.
   */
  findAllNotes() {
    var e;
    return ve((e = this.usj) == null ? void 0 : e.content);
  }
  /**
   * Look through the USJ document for a node or the closing of a node matching some condition. This
   * will run `searchFunction` for `node`, all nodes encountered in `node.contents` (recursively),
   * when `node` closes, and all nodes after `node`
   *
   * @param node Node from which to start looking
   * @param workingStack Working stack pointing to this node (should not include this node)
   * @param skipTypes List of marker types to skip (skips all contents of skipped markers)
   * @param searchFunction Function that nodes and representations of the closing of nodes will be
   *   passed into to determine if they are the correct node or representation of the closing of a
   *   node. Stops searching and returns the node/close if this function returns `true`
   * @returns Node or representation of the closing of a node matching condition tested by the
   *   search function
   */
  static findNextMatchingNodeOrClosingFragmentUsingWorkingStack(e, t, r, i) {
    var p;
    let n = e;
    const c = t.length === 0 ? e : t[0].parent;
    if (!_(c)) {
      if (r.includes(c.type)) return;
      let d;
      t.some((l) => {
        const m = l.parent.content[l.index];
        return !_(m) && r.includes(m.type) ? (d = m, !0) : !1;
      }), d && (n = d);
    }
    for (; n !== void 0; ) {
      const d = typeof n == "object" && r.includes(n.type);
      if (!d && i(n, t)) return n;
      if (!d && typeof n == "object" && (((p = n.content) == null ? void 0 : p.length) ?? 0) > 0)
        t.push({ parent: n, index: 0 }), [n] = n.content;
      else {
        if (!d) {
          const l = typeof n == "object" ? { isClosingMarker: !0, forMarker: n } : void 0;
          if (l && i(l, t))
            return l;
        }
        for (n = void 0; t.length > 0; ) {
          const l = t.pop();
          if (l)
            if (l.index + 1 < l.parent.content.length) {
              l.index += 1, t.push(l), n = l.parent.content[l.index];
              break;
            } else {
              const m = {
                isClosingMarker: !0,
                forMarker: l.parent
              };
              if (i(m, t)) return m;
            }
        }
      }
    }
  }
  /**
   * Look through the USJ document for a node matching some condition
   *
   * @param node Node from which to start looking
   * @param workingStack Working stack pointing to this node (should not include this node)
   * @param skipTypes List of marker types to skip (skips all contents of skipped markers)
   * @param searchFunction Function that nodes will be passed into to determine if they are the
   *   correct node. Stops searching and returns the node if this function returns `true`
   * @returns Node matching condition tested by the search function
   */
  static findNextMatchingNodeUsingWorkingStack(e, t, r, i) {
    return this.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      e,
      t,
      r,
      (c, p) => typeof c == "object" && "isClosingMarker" in c ? !1 : i(c, p)
    );
  }
  findNextMatchingNode(e, t) {
    const r = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    );
    let i = r;
    const n = g.findNextMatchingNodeUsingWorkingStack(
      e.node,
      r,
      [],
      (c, p) => (i = p, t({
        node: c,
        documentLocation: g.convertNodeToUsjDocumentLocation(c, p)
      }))
    );
    if (n !== void 0)
      return {
        node: n,
        documentLocation: g.convertNodeToUsjDocumentLocation(
          n,
          i
        )
      };
  }
  // #endregion Walk the node tree
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return g.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion Node -> JSONPath
  // #region USJ node -> SerializedVerseRef + offset in USFM
  nodeToUsfmVerseRefVerseLocation(e, t, r) {
    const { documentLocation: i } = this.nodeToUsjNodeAndDocumentLocation(
      e,
      t
    );
    return this.usjDocumentLocationToUsfmVerseRefVerseLocation(i, r);
  }
  // #endregion USJ node -> SerializedVerseRef + offset in USFM
  // #region USJ node -> USJ location
  nodeToUsjNodeAndDocumentLocation(e, t) {
    var n;
    let r;
    if (_(e)) {
      if (t === void 0)
        throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
      const c = Array.isArray(t) ? this.parentMap.get(t) : t;
      if (c === void 0)
        throw new Error(`Cannot find parent for ${JSON.stringify(t)}`);
      r = this.createWorkingStack(c);
      const p = (n = c.content) == null ? void 0 : n.indexOf(e);
      if (p === void 0 || p < 0)
        throw new Error("Could not find index of node in parent for creating working stack");
      r.push({ parent: c, index: p });
    } else
      r = this.createWorkingStack(e);
    const i = g.convertNodeToUsjDocumentLocation(e, r);
    return {
      node: e,
      documentLocation: i
    };
  }
  // #endregion USJ node -> USJ location
  // #region JSONPath > USJ location
  /**
   * Finds the node associated with the JSONPath provided, and also gets the parent of the node if
   * the node is a string. This is helpful so you can find a real object that is actually somewhere
   * in the USJ document from the JSONPath
   *
   * @param jsonPathQuery JSONPath search expression that indicates a node within this USJ data. If
   *   the expression matches more than one node, then only the first node found is considered.
   * @returns First node found at the JSONPath and the parent of that node _if_ the node is a
   *   string. Note that the object returned is the actual object in the USJ document.
   */
  jsonPathToNodeAndParentIfString(e) {
    const t = this.findSingleValue(e);
    if (!t) throw new Error(`No result found for JSONPath query: ${e}`);
    const r = _(t) ? this.findParent(e) : void 0;
    if (!r && _(t))
      throw new Error(`Could not determine parent for ${e}`);
    return {
      node: t,
      parent: r
    };
  }
  jsonPathToUsjNodeAndDocumentLocation(e) {
    const { node: t, parent: r } = this.jsonPathToNodeAndParentIfString(e);
    return this.nodeToUsjNodeAndDocumentLocation(t, r);
  }
  // #endregion JSONPath > USJ location
  // #region JSONPath or USJ location -> SerializedVerseRef + offset in USFM
  jsonPathToUsfmVerseRefVerseLocation(e, t) {
    const { node: r, parent: i } = this.jsonPathToNodeAndParentIfString(e);
    return this.nodeToUsfmVerseRefVerseLocation(r, i, t);
  }
  usjDocumentLocationToUsfmVerseRefVerseLocation(e, t) {
    const r = this.findFragmentInfoAtUsjDocumentLocation(e);
    if (r === void 0)
      throw new Error(
        `Could not find fragment info at USJ document location while transforming to USFM verse location: ${JSON.stringify(
          e
        )}`
      );
    const i = this.getVerseRefForIndexInUsfm(r.indexInUsfm, t), n = this.getIndexInUsfmForVerseRef(i);
    return {
      verseRef: i,
      // Final USFM verse offset is the fragment's location relative to the verse plus whatever
      // offset is in the USJ location
      offset: r.indexInUsfm - n + g.getOffsetInUsjDocumentLocation(e)
    };
  }
  // #endregion JSONPath or USJ location -> SerializedVerseRef + offset in USFM
  // #region Handling VerseRefs
  /**
   * Gets the book ID in the internal USJ document data corresponding to the book ID passed in.
   *
   * @param bookId The book ID to look up data in the USJ document for
   * @returns If there isn't a book ID in the USJ document, {@link NO_BOOK_ID} will be returned
   * @throws If the requested book is not found in the USJ data and there are other books
   * @throws If there is no USJ content in the document whatsoever
   */
  getEffectiveBookId(e) {
    const t = Object.keys(this.indicesInUsfmByVerseRef), r = t.length === 0 || t.length === 1 && t[0] === S, i = r ? S : e;
    if (!this.indicesInUsfmByVerseRef[i])
      throw new Error(
        `Book ID ${e} not found in USJ! ${r ? `There seems to be no USJ content because there is no content in ${S} either` : `Book IDs in USJ: ${JSON.stringify(t)}`}`
      );
    return i;
  }
  /**
   * Gets the index in USFM of the start of the verse (the backslash on the verse marker or the
   * beginning of the chapter if verse 0 is provided)
   */
  getIndexInUsfmForVerseRef(e) {
    const t = this.getEffectiveBookId(e.book), i = this.indicesInUsfmByVerseRef[t][e.chapterNum];
    if (!i) throw new Error(`Could not find ${t} chapter ${e.chapterNum}`);
    const n = i[e.verseNum];
    if (n === void 0)
      throw new Error(`Verse ${e.verseNum} not found in ${t} ${e.chapterNum}`);
    return n;
  }
  /**
   * Gets the verse ref that the provided index in USFM is in (including verse range if applicable).
   * Finds the closest verse ref before the index in USFM.
   *
   * @param indexInUsfm The index in USFM from the beginning of this document
   * @param bookIdIfNotFound 3-letter ID of the book this USJ document is in (only used if a book ID
   *   is not found in the USJ document)
   * @returns Closest verse reference before or at the index in USFM
   * @throws If not able to find a book ID in the USJ document and `bookIdIfNotFound` is not
   *   provided
   */
  getVerseRefForIndexInUsfm(e, t) {
    const r = Object.entries(this.indicesInUsfmByVerseRef);
    let i = 0, n, c = !1;
    for (; !c && i < r.length; ) {
      const [l, m] = r[i];
      if (m) {
        const b = Object.entries(m);
        let u = 0;
        for (; !c && u < b.length; ) {
          const [h, f] = b[u];
          if (f) {
            const y = Object.entries(f);
            let M = 0;
            for (; !c && M < y.length; ) {
              const [E, v] = y[M];
              if (v !== void 0) {
                if (e < v) {
                  if (!n)
                    throw new Error(
                      `Could not find verse ref for index in USFM ${e} less than the first known index ${v}`
                    );
                  c = !0;
                  break;
                }
                if (n = {
                  book: l,
                  chapterNum: parseInt(h, 10),
                  verseNum: parseInt(E, 10)
                }, e === v) {
                  c = !0;
                  break;
                }
              }
              M += 1;
            }
          }
          u += 1;
        }
      }
      i += 1;
    }
    if (!n)
      throw new Error(`Did not find any verse refs while looking for index in USFM ${e}`);
    if (n.book === S) {
      if (!t)
        throw new Error(
          `Could not find book ID and no book ID provided when finding USFM verse ref for index in USFM ${e}`
        );
      n.book = t;
    }
    const p = this.getIndexInUsfmForVerseRef(n), d = this.fragmentsByIndexInUsfm.get(p);
    return d && g.isFragmentAMarker(d.fragment) && d.fragment.type === w && d.fragment.number && d.fragment.number !== `${n.verseNum}` && (n.verse = d.fragment.number), n;
  }
  usfmVerseLocationToIndexInUsfm(e) {
    const { verseRef: t, offset: r } = g.usfmVerseLocationToUsfmVerseRefVerseLocation(e);
    if (r < 0) throw new Error("offset must be >= 0");
    return this.getIndexInUsfmForVerseRef(t) + r;
  }
  // #endregion Handling VerseRefs
  // #region transforming location types to different types
  /**
   * Transforms a USFM verse-based location into a single standardized format of USFM verse-based
   * location for ease of accessing the location's properties
   *
   * @param usfmVerseLocation USFM verse-based location in one of multiple forms
   * @returns USFM verse-based location in one particular form. Also ensures `offset` is defined
   *   (defaults to 0 as described in {@link UsfmVerseLocation})
   */
  static usfmVerseLocationToUsfmVerseRefVerseLocation(e) {
    return "verseRef" in e ? {
      verseRef: e.verseRef,
      offset: e.offset ?? 0
    } : "scrRef" in e ? {
      verseRef: e.scrRef,
      offset: e.offset ?? 0
    } : {
      verseRef: e,
      offset: 0
    };
  }
  /**
   * Type guard to check if a location is a {@link UsjChapterLocation} rather than a
   * {@link UsjBookLocation} or {@link UsfmVerseLocation}.
   *
   * @param location The location to check
   * @returns `true` if the location is a {@link UsjChapterLocation}
   */
  static isUsjChapterLocation(e) {
    return "verseRef" in e && "documentLocation" in e && (!e.granularity || e.granularity === "chapter") || "book" in e && "chapterNum" in e && ("documentLocation" in e || "jsonPath" in e);
  }
  /**
   * Transforms a USJ chapter-based location into a single standardized format of USJ chapter-based
   * location for ease of accessing the location's properties
   *
   * @param usjChapterLocation USJ chapter-based location in one of multiple forms
   * @returns USJ chapter-based location in one particular form.
   * @throws If erroneously received a {@link UsjBookLocation}, not a {@link UsjChapterLocation}.
   *   Cannot statically transform between those because there is no way to know how to change the
   *   JSONPath
   */
  static usjChapterLocationToUsjVerseRefChapterLocation(e) {
    if ("jsonPath" in e)
      return e.offset !== void 0 ? {
        verseRef: {
          book: e.book,
          chapterNum: e.chapterNum,
          verseNum: 0
        },
        granularity: "chapter",
        documentLocation: {
          jsonPath: e.jsonPath,
          offset: e.offset
        }
      } : {
        verseRef: {
          book: e.book,
          chapterNum: e.chapterNum,
          verseNum: 0
        },
        granularity: "chapter",
        documentLocation: {
          jsonPath: e.jsonPath
        }
      };
    if ("verseRef" in e) {
      if (
        // Make sure we are receiving a chapter location, not a book location
        e.granularity !== void 0 && e.granularity !== "chapter"
      )
        throw new Error(
          "Received UsjVerseRefBookLocation! Cannot statically transform JSONPath from book-relative to chapter-relative"
        );
      return e;
    }
    if (e.chapterNum === void 0)
      throw new Error(
        "Received UsjFlatBookLocation! Cannot statically transform JSONPath from book-relative to chapter-relative"
      );
    return {
      verseRef: {
        book: e.book,
        chapterNum: e.chapterNum,
        verseNum: 0
      },
      granularity: "chapter",
      documentLocation: e.documentLocation
    };
  }
  /**
   * Transforms a USJ book-based location into a single standardized format of USJ book-based
   * location for ease of accessing the location's properties
   *
   * @param usjBookLocation USJ book-based location in one of multiple forms
   * @returns USJ book-based location in one particular form.
   * @throws If erroneously received a {@link UsjChapterLocation}, not a {@link UsjBookLocation}.
   *   Cannot statically transform between those because there is no way to know how to change the
   *   JSONPath
   */
  static usjBookLocationToUsjVerseRefBookLocation(e) {
    if ("verseRef" in e) {
      if (
        // Make sure we are receiving a book location, not a chapter location
        e.granularity !== "book"
      )
        throw new Error(
          "Received UsjVerseRefChapterLocation! Cannot statically transform JSONPath from chapter-relative to book-relative"
        );
      return e;
    }
    if ("chapterNum" in e)
      throw new Error(
        "Received UsjFlatChapterLocation! Cannot statically transform JSONPath from chapter-relative to book-relative"
      );
    return {
      verseRef: {
        book: e.book,
        chapterNum: 1,
        verseNum: 0
      },
      granularity: "book",
      documentLocation: e.documentLocation
    };
  }
  // #endregion transforming location types to different types
  // #region USFM location -> USJ location
  usfmVerseLocationToUsjNodeAndDocumentLocation(e) {
    const { verseRef: t, offset: r } = g.usfmVerseLocationToUsfmVerseRefVerseLocation(e), i = this.usfmVerseLocationToIndexInUsfm(e), { value: n } = this.fragmentsByIndexInUsfm.findClosestLessThanOrEqual(
      i
    ) ?? {
      value: void 0
    };
    if (!n)
      throw new Error(
        `Somehow, did not find anything at index in verse ${r} or below in ${t.book} ${t.chapterNum}:${t.verseNum}. Not sure how this would happen.`
      );
    const c = i - n.indexInUsfm;
    return {
      ...n.nodeAndDocumentLocation,
      documentLocation: g.moveUsjDocumentLocationToNewOffset(
        n.nodeAndDocumentLocation.documentLocation,
        c
      )
    };
  }
  usfmVerseLocationToUsjDocumentLocation(e) {
    return this.usfmVerseLocationToUsjNodeAndDocumentLocation(e).documentLocation;
  }
  static isUsjDocumentLocationForTextContent(e) {
    let t = e;
    if ("node" in e) {
      if (!_(e.node)) return !1;
      t = e.documentLocation;
    }
    return "jsonPath" in t ? "offset" in t : !1;
  }
  static isUsjDocumentLocationForNode(e) {
    let t = e;
    if ("node" in e) {
      if (_(e.node))
        return g.isUsjDocumentLocationForTextContent(e);
      t = e.documentLocation;
    }
    return !(!("jsonPath" in t) || "closingMarkerOffset" in t || "propertyOffset" in t || "keyName" in t || "keyOffset" in t || "keyClosingMarkerOffset" in t);
  }
  // #endregion UsjDocumentLocation utilities
  // #region Search for text from a certain point
  usfmVerseLocationToNextTextLocation(e) {
    const t = this.usfmVerseLocationToUsjNodeAndDocumentLocation(e), r = this.findNextLocationOfMatchingText(
      t,
      ""
    );
    if (!r)
      throw new Error(
        `Could not find next text location after verse ${JSON.stringify(e)} at location ${t.documentLocation.jsonPath}`
      );
    return r;
  }
  findNextLocationOfMatchingText(e, t, r = 1e3) {
    let i = "", n = 0, c = 0, p = -1;
    const d = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    ), l = d.length > 0 ? {
      ...d[d.length - 1]
    } : void 0;
    if (g.findNextMatchingNodeUsingWorkingStack(
      e.node,
      d,
      T,
      (h, f) => {
        if (typeof h != "string") return !1;
        let y = h;
        const M = f[f.length - 1];
        if (l && g.areStackItemsShallowEqual(M, l)) {
          if (!("offset" in e.documentLocation))
            throw new Error(
              `Somehow 'offset' was not in text content string document location. This should not happen. ${JSON.stringify(e.documentLocation)}`
            );
          y = h.substring(e.documentLocation.offset), c += e.documentLocation.offset;
        }
        n += y.length, i = `${i}${y}`;
        const E = i.indexOf(t);
        return E < 0 ? (c += i.length, i.length > t.length && (i = i.substring(i.length - t.length)), c -= i.length, n > r) : (p = c + E, !0);
      }
    ), p < 0) return;
    n = 0;
    let m = 0, b = [];
    const u = g.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      T,
      (h, f) => typeof h != "string" || (n += h.length, n < p + 1) ? !1 : (m = p - n + h.length, b = f, !0)
    );
    if (!u) throw new Error("Internal error: inconsistent search results");
    if (!_(u))
      throw new Error(
        `Somehow found non-string node while searching for strings: ${JSON.stringify(u)}`
      );
    return {
      node: u,
      documentLocation: {
        jsonPath: g.convertWorkingStackToJsonPath(b),
        offset: m
      }
    };
  }
  /**
   * Builds a mapping array where `map[nfdIndex]` gives the corresponding index in the original
   * string. Used to convert regex match positions from NFD-normalized text back to positions in the
   * original string.
   *
   * The map has `nfd.length + 1` entries to handle the end position of a regex match. A regex match
   * end position points one past the last matched character — so a match covering an entire string
   * of length N has end position N, not N-1. That means `match.end` can equal `nfd.length`, which
   * would be out-of-bounds for an array of size `nfd.length`. The extra entry covers this case; it
   * is pre-filled with `original.length`, which is the correct end position in the original
   * string.
   */
  static buildNFDToOriginalPositionMap(e) {
    const t = e.normalize("NFD"), r = new Array(t.length + 1).fill(
      e.length
    );
    let i = 0, n = 0;
    return Array.from(e).forEach((c) => {
      const p = c.normalize("NFD");
      Array.from({ length: p.length }).forEach((d, l) => {
        r[i + l] = n;
      }), i += p.length, n += c.length;
    }), r;
  }
  search(e, t) {
    const r = t instanceof Set ? t : t == null ? void 0 : t.markerStylesToInclude, i = t instanceof Set || t == null ? void 0 : t.normalizationForm, n = [];
    if (this.usj.content.length === 0) return n;
    const c = {
      node: this.usj,
      documentLocation: {
        jsonPath: "$"
      }
    }, p = [], d = new B();
    let l = 0, m = c.node;
    for (; m !== void 0; )
      m = g.findNextMatchingNodeUsingWorkingStack(
        c.node,
        this.convertJsonPathToWorkingStack(c.documentLocation.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (y, M) => (typeof y != "string" || r && M.some((v) => {
          const x = v.parent;
          if (!x || !("type" in x) || x.type === "char") return !1;
          let I;
          return "style" in x && typeof x.style == "string" ? I = x.style : "marker" in x && typeof x.marker == "string" && (I = x.marker), I !== void 0 && !r.has(I);
        }) || (p.push(y), d.set(l, {
          node: y,
          documentLocation: {
            offset: 0,
            jsonPath: g.convertWorkingStackToJsonPath(M)
          }
        }), l += y.length), !1)
      );
    const b = p.join(""), u = i === "NFD" ? g.buildNFDToOriginalPositionMap(b) : void 0, h = u ? b.normalize("NFD") : b;
    let f = e.exec(h);
    for (; f; ) {
      if (f[0].length > 0) {
        const y = u ? u[f.index] : f.index, M = u ? u[f.index + f[0].length] : f.index + f[0].length;
        if (y < 0 || y >= b.length)
          throw new Error(`Match index out of bounds: ${y}`);
        const E = d.findClosestLessThanOrEqual(y);
        if (!E)
          throw new Error(`Internal error: no starting node found for index ${y}`);
        const v = {
          node: E.value.node,
          documentLocation: {
            jsonPath: E.value.documentLocation.jsonPath,
            offset: y - E.key
          }
        }, x = d.findClosestLessThanOrEqual(M - 1);
        if (!x)
          throw new Error(`Internal error: no ending node found for index ${y}`);
        const I = {
          node: x.value.node,
          documentLocation: {
            jsonPath: x.value.documentLocation.jsonPath,
            offset: M - x.key
          }
        }, j = u ? b.substring(y, M) : f[0];
        n.push({ text: j, start: v, end: I });
      }
      if (!e.global) break;
      f = e.exec(h);
    }
    return n;
  }
  // #endregion Search for text from a certain point
  // #region Extract text from a node + JSONPath + offset
  extractText(e, t) {
    let r = "", i = "offset" in e.documentLocation ? e.documentLocation.offset : 0, n = 0;
    return g.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      T,
      (c) => {
        if (typeof c != "string") return !1;
        if (i >= c.length)
          return i -= c.length, !1;
        let p = c;
        if (i > 0 && (p = p.substring(i), i = 0), n + p.length < t)
          return n += p.length, r = `${r}${p}`, !1;
        const d = t - n;
        return r = `${r}${p.substring(0, d - 1)}`, !0;
      }
    ), r;
  }
  extractTextBetweenPoints(e, t, r = 100) {
    let i = "";
    return g.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      T,
      (n, c) => n === t.node && (typeof n == "object" || t.documentLocation.jsonPath === g.convertWorkingStackToJsonPath(c)) ? !0 : typeof n != "string" ? !1 : (i = `${i}${n}`, i.length > r && (i = i.substring(0, r)), i.length >= r)
    ), i;
  }
  // #endregion Extract text from a node + JSONPath + offset
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, t) {
    let r = 0;
    for (let i = e.length - 1; i >= 0; i--) {
      const n = e[i];
      t(n) ? (e.splice(i, 1), r += 1) : typeof n != "string" && n.content && (r += this.removeContentNodesFromArray(n.content, t));
    }
    return r;
  }
  removeContentNodes(e) {
    const t = g.removeContentNodesFromArray(this.usj.content, e);
    return this.usjChanged(), t;
  }
  // #endregion Edit this USJ data
  // #region transform USJ to USFM
  /**
   * Get `MarkerInfo` by marker name
   *
   * @param markerName Name of the marker for which to get `MarkerInfo`
   * @returns `MarkerInfo` for the marker by name if the marker is in the markers map. `undefined`
   *   if the marker is not in the markers map. If you have the marker type, you can build a fake
   *   `MarkerInfo` for an unknown marker by making an object with just the type. If not, might be
   *   best to throw an error since there probably isn't enough information available to do anything
   *   with that marker.
   */
  getMarkerInfo(e) {
    let t = this.markersMap.markers[e];
    return t || ([, t] = Object.entries(this.markersMap.markersRegExp).find(
      ([r]) => new RegExp(r).test(e)
    ) ?? []), t;
  }
  /**
   * Gathers various pieces of information about a marker that are helpful for transforming the
   * marker to USFM
   *
   * WARNING: this only has the ability to return the info for the marker to be used in USFM. If you
   * need to use info for the marker in USX or USJ, this method needs to be modified.
   *
   * @param marker A USJ marker (can be USJ type) or a string which is the marker name
   * @param scriptureFormat The Scripture format to get the marker information for. For example, if
   *   you are using this marker info to transform the marker into USFM, this should be `usfm`.
   *   Defaults to `usfm`
   * @returns Various pieces of info about the marker
   */
  getInfoForMarker(e, t = "usfm") {
    if (t !== "usfm")
      throw new Error(
        "Scripture formats beside usfm are not supported for getting info for markers"
      );
    const r = _(e) ? e : (
      // Usj type has no `marker` property, but the Usj marker isn't really different than any other
      // marker with no `marker` property. It is appropriate to treat them the same to get the name
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      e.marker ?? e.type
    );
    let i = !1, n = this.getMarkerInfo(r);
    const c = (n == null ? void 0 : n.type) ?? (_(e) ? "" : e.type);
    let p = r;
    if (n != null && n.markerUsfm && (p = n.markerUsfm, n = this.getMarkerInfo(p)), !n) {
      if (_(e))
        throw new Error(`Unknown marker ${r} and no marker type provided`);
      n = { type: e.type }, i = !0, console.warn(
        `Unknown marker ${r}. Creating MarkerInfo to use: ${JSON.stringify(n)}`
      );
    }
    let d = n.type, l = this.markersMap.markerTypes[d];
    if (l != null && l.markerTypeUsfm && (d = l.markerTypeUsfm, l = this.markersMap.markerTypes[d]), !_(e) && e.type !== c && (!l || e.type !== l.markerTypeUsfm && e.type !== l.markerTypeUsx && e.type !== l.markerTypeUsj) && (console.warn(
      `Warning: Mismatching marker type in the USJ content ${e.type} vs marker type in the marker info ${n.type} for marker ${r}. Using the type from the USJ content.`
    ), d = e.type, l = this.markersMap.markerTypes[d], i = !0), !l)
      throw new Error(
        `Unknown marker type ${d} on marker ${r}! Cannot proceed.`
      );
    i && d === "para" && (l = { ...l, hasNewlineBefore: !1 });
    const m = [];
    n.attributeMarkers && n.attributeMarkers.forEach((u) => {
      const h = this.getMarkerInfo(u);
      h && "attributeMarkerAttributeName" in h && m.push([u, h]);
    });
    const b = e;
    if (t === "usfm" && d === "cell" && b.colspan) {
      const u = parseInt(b.colspan, 10), h = je.exec(r);
      if (h != null && h[1]) {
        const f = parseInt(h[1], 10);
        !Number.isNaN(f) && !Number.isNaN(u) && (p = `${r}-${f + u - 1}`, l = {
          ...l,
          skipOutputAttributeToUsfm: [
            ...l.skipOutputAttributeToUsfm ?? [],
            "colspan"
          ]
        });
      }
    }
    return {
      markerNameOriginal: r,
      markerName: p,
      markerInfo: n,
      markerType: d,
      markerTypeInfo: l,
      attributeMarkerInfoEntries: m
    };
  }
  /** Converts the text content of a marker to its equivalent in USFM */
  textContentToUsfm(e) {
    return {
      usfm: this.shouldAllowInvisibleCharacters ? e : e.replace($e, "~"),
      fragmentsInfo: [{ fragment: e, indexInUsfm: 0 }]
    };
  }
  /**
   * Merge an independent array of fragment info into an existing array of fragment info, offsetting
   * the indices of the new fragments so their locations start from the end of the string
   */
  static mergeFragmentsInfoIntoExistingArray(e, t, r) {
    e.forEach((i) => {
      const n = r + i.indexInUsfm;
      t.push({
        ...i,
        indexInUsfm: n
      });
    });
  }
  /**
   * Transforms the provided USJ marker into its opening marker representation in USFM
   *
   * Includes a newline before the marker if applicable. Generally also includes a space at the end.
   *
   * Opening markers generally look like the following:
   *
   * ```text
   * \markerName leadingAttributes textContentAttribute attributeMarkers
   * ```
   *
   * @param marker The marker to transform
   * @param isInsideMarkerWithSameType `true` if this marker is inside another marker of the same
   *   type. This is used to determine if a prefix should be added before the marker name.
   * @returns String containing the marker information that should come before the contents of the
   *   marker in USFM
   */
  openingMarkerToUsfm(e, t) {
    let r = "";
    const i = [], { markerName: n, markerInfo: c, markerType: p, markerTypeInfo: d, attributeMarkerInfoEntries: l } = this.getInfoForMarker(e), m = e;
    d.hasNewlineBefore && (r += `
`);
    const b = t ? d.nestedPrefix ?? "" : "";
    return i.push({ fragment: e, indexInUsfm: r.length }), r += p === "optbreak" ? "//" : `\\${b}`, p !== "optbreak" && (i.push({
      fragment: { attributeValueForKey: "marker", forMarker: e },
      indexInUsfm: r.length
    }), r += `${n}${p === "unmatched" ? "" : " "}`), c.leadingAttributes && c.leadingAttributes.forEach((u) => {
      const h = m[u];
      h && (i.push({
        fragment: { attributeValueForKey: u, forMarker: e },
        indexInUsfm: r.length
      }), r += `${h} `);
    }), c.textContentAttribute && m[c.textContentAttribute] && (i.push({
      fragment: { attributeValueForKey: c.textContentAttribute, forMarker: e },
      indexInUsfm: r.length
    }), r += `${m[c.textContentAttribute]} `), c.attributeMarkers && l.forEach(([u, h]) => {
      const f = m[h.attributeMarkerAttributeName];
      if (!f) return;
      const y = {
        type: h.type,
        marker: u,
        content: [f]
      }, M = [];
      r = this.addMarkerUsfmToString(
        r,
        y,
        e,
        M
      );
      const { usfm: E } = this.textContentToUsfm(f);
      i.push({
        fragment: {
          attributeValueForKey: h.attributeMarkerAttributeName,
          forMarker: e
        },
        indexInUsfm: r.length
      }), r += E, r = this.addMarkerUsfmToString(
        r,
        {
          isClosingMarker: !0,
          forMarker: y
        },
        e,
        M
      ), M.forEach((v) => {
        if (_(v.fragment) || "attributeKey" in v.fragment)
          throw new Error(
            `Attribute marker opening or closing markers generated a text content fragment or an attribute key fragment! This does not make sense. ${JSON.stringify(v)}`
          );
        if (g.isFragmentAMarker(v.fragment)) {
          i.push({
            ...v,
            fragment: {
              attributeMarker: h.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("attributeValueForKey" in v.fragment) {
          if (v.fragment.attributeValueForKey !== "marker")
            throw new Error(
              `Attribute marker opening or closing markers generated an attribute value fragment for a key that was not marker! This does not make sense. ${JSON.stringify(v)}`
            );
          i.push({
            ...v,
            fragment: {
              attributeKey: h.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("isClosingMarker" in v.fragment) {
          const { isClosingMarker: x, ...I } = v.fragment, j = {
            ...I,
            forMarker: e,
            attributeMarkerClosingMarker: h.attributeMarkerAttributeName
          };
          i.push({
            ...v,
            fragment: j
          });
          return;
        }
        throw new Error(
          `Attribute marker opening or closing markers generated an unrecognized fragment: ${JSON.stringify(v)}`
        );
      }), !this.markersMap.isSpaceAfterAttributeMarkersContent && h.hasStructuralSpaceAfterCloseAttributeMarker && (r += " ");
    }), { usfm: r, fragmentsInfo: i };
  }
  /**
   * Transforms the provided USJ marker into its closing marker representation in USFM
   *
   * Closing markers do not include the attributes listed as part of the opening markers (leading
   * attributes, text content attributes, and attribute markers). They only include other kinds of
   * attributes including the default attribute if present.
   *
   * Closing markers with only the default attribute present generally look like the following:
   *
   * ```text
   * |defaultAttribute\markerName*
   * ```
   *
   * Closing markers with at least one non-default attribute present generally look like the
   * following:
   *
   * ```text
   * |attributeName="AttributeValue" attributeName="AttributeValue"\markerName*
   * ```
   *
   * @param marker The marker to transform
   * @param isInsideMarkerWithSameType `true` if this marker is inside another marker of the same
   *   type. This is used to determine if a prefix should be added before the marker name.
   * @returns String containing the marker information that should come after the contents of the
   *   marker in USFM
   */
  closingMarkerToUsfm(e, t) {
    const {
      markerNameOriginal: r,
      markerName: i,
      markerInfo: n,
      markerType: c,
      markerTypeInfo: p,
      attributeMarkerInfoEntries: d
    } = this.getInfoForMarker(e), l = Object.keys(e).filter((f) => {
      var y, M;
      return !(f === "type" || f === "marker" || f === "content" || f === "closed" || (y = p.skipOutputAttributeToUsfm) != null && y.includes(f) || (M = n.leadingAttributes) != null && M.includes(f) || n.textContentAttribute === f || d.some(
        ([, E]) => E.attributeMarkerAttributeName === f
      ));
    }), m = e;
    if (p.isCloseable && n.independentClosingMarkers && n.independentClosingMarkers.length > 0)
      throw new Error(
        `Marker ${i} is intended to have a normal closing marker and independent closing markers. As of writing this code, there is no known syntax for this situation in USFM. Cannot proceed.`
      );
    let b = !0;
    if ((m.closed === "false" || n.isClosingMarkerOptional && !this.markersMap.shouldOptionalClosingMarkersBePresent && m.closed !== "true") && (b = !1), n.independentClosingMarkers && n.independentClosingMarkers.length > 0 && b) {
      const f = {
        type: c,
        marker: n.independentClosingMarkers[0],
        // Put all the closing marker attributes on here since we don't really have a better place
        // to put them and might as well
        ...Object.fromEntries(
          l.map((I) => [
            I,
            m[I]
          ])
        )
      };
      let y = "";
      const M = [], { usfm: E, fragmentsInfo: v } = this.openingMarkerToUsfm(f, t), x = v.find((I) => g.isFragmentAMarker(I.fragment));
      if (!x)
        throw new Error(
          `Could not find opening fragment info for independent closing marker ${JSON.stringify(
            f
          )}. Fragments info generated: ${JSON.stringify(v)}`
        );
      return M.push({
        ...x,
        fragment: { isClosingMarker: !0, forMarker: e }
      }), y += E, r !== f.marker && (y = this.addMarkerUsfmToString(
        y,
        {
          isClosingMarker: !0,
          forMarker: f
        },
        t
      )), { usfm: y, fragmentsInfo: M };
    }
    let u = "";
    const h = [];
    if (l.length > 0 && (u += "|", l.length === 1 && l[0] === n.defaultAttribute ? (h.push({
      fragment: { attributeValueForKey: n.defaultAttribute, forMarker: e },
      indexInUsfm: u.length
    }), u += m[n.defaultAttribute]) : l.forEach((f, y) => {
      const M = c === "figure" && f === "file" ? "src" : f;
      y > 0 && (u += " "), h.push({
        fragment: { attributeKey: f, forMarker: e },
        indexInUsfm: u.length
      }), u += `${M}="`, h.push({
        fragment: { attributeValueForKey: f, forMarker: e },
        indexInUsfm: u.length
      }), u += `${m[f]}"`;
    })), p.isCloseable && b) {
      const f = p.isClosingMarkerEmpty ? "" : i, y = t ? p.nestedPrefix ?? "" : "";
      h.push({
        fragment: { isClosingMarker: !0, forMarker: e },
        indexInUsfm: u.length
      }), u += `\\${y}${f}*`;
    }
    return { usfm: u, fragmentsInfo: h };
  }
  /**
   * Determines whether this marker and all its content should be skipped entirely when outputting
   * to USFM
   *
   * @param marker Marker to check
   * @returns `true` if this marker should be skipped; `false` otherwise
   */
  shouldSkipOutputMarkerToUsfm(e) {
    var r;
    const { markerTypeInfo: t } = this.getInfoForMarker(e);
    return !!(t.skipOutputMarkerToUsfm || (r = t.skipOutputMarkerToUsfmIfAttributeIsPresent) != null && r.some(
      (i) => i in e
    ));
  }
  /** Removes one space at the end of the string if present */
  static removeEndSpace(e) {
    return e.at(-1) !== " " ? e : e.slice(0, -1);
  }
  addMarkerUsfmToString(e, t, r, i) {
    let n = e, c, p;
    const { markerNameOriginal: d, markerType: l, markerTypeInfo: m } = this.getInfoForMarker(
      "isClosingMarker" in t ? t.forMarker : t
    );
    let b = !1;
    if (typeof r == "boolean")
      b = r;
    else if (r) {
      const { markerType: u } = this.getInfoForMarker(
        r
      );
      u === l && (b = !0);
    }
    if ("isClosingMarker" in t) {
      const { usfm: u, fragmentsInfo: h } = this.closingMarkerToUsfm(
        t.forMarker,
        b
      );
      p = h, c = u, m.isCloseable && m.isClosingMarkerEmpty && // No contents
      (!t.forMarker.content || t.forMarker.content.length === 0) && // No closing marker attributes
      !c.startsWith("|") && (n = g.removeEndSpace(n));
    } else {
      const { usfm: u, fragmentsInfo: h } = this.openingMarkerToUsfm(
        t,
        b
      );
      p = h, c = u;
    }
    if (c.startsWith(`
`) && (n.length === 0 ? (p = p.map((u) => ({
      ...u,
      indexInUsfm: u.indexInUsfm - 1
    })), c = c.substring(1)) : n = g.removeEndSpace(n)), this.markersMap.isSpaceAfterAttributeMarkersContent && d === "ca") {
      const u = n.lastIndexOf("\\");
      u >= 0 && n.substring(
        u + 1,
        u + 3
      ) === "c " && (n = g.removeEndSpace(n), n += `
 `);
    }
    return i && g.mergeFragmentsInfoIntoExistingArray(
      p,
      i,
      n.length
    ), n += c, n;
  }
  toUsfm() {
    return this.usfm;
  }
  // #endregion transform USJ to USFM
  // #region fragment utilities
  /**
   * Returns a new {@link UsjDocumentLocation} based on the one passed in but with the offset
   * provided. If the location passed in does not have an offset property, a shallow clone of the
   * location will be returned with no changes.
   */
  static moveUsjDocumentLocationToNewOffset(e, t) {
    const r = { ...e };
    return "offset" in r ? r.offset = t : "closingMarkerOffset" in r ? r.closingMarkerOffset = t : "propertyOffset" in r ? r.propertyOffset = t : "keyOffset" in r ? r.keyOffset = t : "keyClosingMarkerOffset" in r && (r.keyClosingMarkerOffset = t), r;
  }
  /**
   * Returns the offset of whatever kind that is found in the UsjDocumentLocation. Returns 0 if the
   * location passed in does not have an offset property.
   */
  static getOffsetInUsjDocumentLocation(e) {
    return "offset" in e ? e.offset : "closingMarkerOffset" in e ? e.closingMarkerOffset : "propertyOffset" in e ? e.propertyOffset : "keyOffset" in e ? e.keyOffset : "keyClosingMarkerOffset" in e ? e.keyClosingMarkerOffset : 0;
  }
  /**
   * Compares two UsjDocumentLocations to determine if they are pointing to the same location
   *
   * @param a The first location to compare
   * @param b The second location to compare
   * @param ignoreJsonPath If `true`, the JSONPath properties of the locations will be ignored in
   *   the comparison. This is useful if you have already determined that the JSONPaths are the
   *   same
   */
  static areUsjDocumentLocationsEqual(e, t, r = !1) {
    const { jsonPath: i, ...n } = e, { jsonPath: c, ...p } = t;
    return !r && !U(P.toPathArray(i), P.toPathArray(c)) ? !1 : U(n, p);
  }
  /** Find the fragment info corresponding to the specified USJ Document location. */
  findFragmentInfoAtUsjDocumentLocation(e) {
    const t = g.moveUsjDocumentLocationToNewOffset(e, 0);
    let r;
    const i = this.fragmentsByJsonPath.get(
      g.normalizeJsonPath(e.jsonPath)
    );
    if (i)
      return i.find((n) => g.areUsjDocumentLocationsEqual(
        n.nodeAndDocumentLocation.documentLocation,
        t,
        // We already compared the JSONPaths by looking in the map for this JSONPath
        !0
      ) ? (r = n, !0) : !1), r;
  }
  /**
   * Transform a node and its working stack into the {@link UsjDocumentLocation} corresponding to it.
   *
   * @param node Marker or string to convert
   * @param workingStack Working stack pointing to the node
   * @param locationOffset If applicable, this is the offset that will be put on the
   *   {@link UsjDocumentLocation}. If not present, offset on the {@link UsjDocumentLocation} will be
   *   `0`. Not all subtypes of {@link UsjDocumentLocation}s have offsets, so this is not used in all
   *   situations
   * @returns The node and the document location corresponding to this fragment
   */
  static convertNodeToUsjDocumentLocation(e, t, r = 0) {
    const i = g.convertWorkingStackToJsonPath(t);
    return _(e) ? { jsonPath: i, offset: r } : { jsonPath: i };
  }
  /**
   * Transform a fragment and its working stack into the {@link UsjNodeAndDocumentLocation}
   * corresponding to it.
   *
   * @param fragment Fragment to convert
   * @param workingStack Working stack pointing to the marker or string the fragment is in
   * @param offsetWithinFragment If applicable, this is the offset within the fragment that the
   *   location is pointing to, which is offset that will be put on the {@link UsjDocumentLocation}.
   *   If not present, offset on the {@link UsjDocumentLocation} will be `0` because fragments don't
   *   have their own offsets into the contents. Not all {@link UsjDocumentLocation}s have offsets,
   *   so this is not used in all situations
   * @returns The node and the document location corresponding to this fragment
   */
  static convertFragmentToUsjNodeAndDocumentLocation(e, t, r = 0) {
    if (_(e) || g.isFragmentAMarker(e)) {
      const i = g.convertNodeToUsjDocumentLocation(
        e,
        t,
        r
      );
      return {
        node: e,
        documentLocation: i
      };
    }
    if ("isClosingMarker" in e) {
      const n = {
        jsonPath: g.convertWorkingStackToJsonPath(t),
        closingMarkerOffset: r
      };
      return {
        node: e.forMarker,
        documentLocation: n
      };
    }
    if ("attributeValueForKey" in e) {
      const n = {
        jsonPath: g.convertWorkingStackAndPropertyToJsonPath(
          t,
          e.attributeValueForKey
        ),
        propertyOffset: r
      };
      return {
        node: e.forMarker,
        documentLocation: n
      };
    }
    if ("attributeKey" in e) {
      const n = {
        jsonPath: g.convertWorkingStackToJsonPath(t),
        keyName: e.attributeKey,
        keyOffset: r
      };
      return {
        node: e.forMarker,
        documentLocation: n
      };
    }
    if ("attributeMarker" in e) {
      const n = {
        jsonPath: g.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarker
      };
      return {
        node: e.forMarker,
        documentLocation: n
      };
    }
    if ("attributeMarkerClosingMarker" in e) {
      const n = {
        jsonPath: g.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarkerClosingMarker,
        keyClosingMarkerOffset: r
      };
      return {
        node: e.forMarker,
        documentLocation: n
      };
    }
    throw new Error(
      `Could not transform unrecognized fragment to UsjNodeAndDocumentLocation: ${JSON.stringify(
        e
      )} at working stack ${JSON.stringify(JSON.stringify(e))}`
    );
  }
  /**
   * Fill out fragments info from a minimal fragments info array and move them into the final
   * fragments map
   *
   * @param fragmentsInfo Minimal fragments info array to fill out and put into maps. ALL CONTENTS
   *   OF THIS ARRAY ARE REMOVED IN THIS METHOD
   * @param workingStack Current working stack
   * @param position Object containing properties describing where in the USFM document these
   *   fragments are. If this method encounters a verse range, only the starting verse number is
   *   used (hence this is not a {@link SerializedVerseRef}). PROPERTIES ON THIS OBJECT ARE MODIFIED
   *   IN THIS METHOD
   * @param fragmentsByIndexInUsfm Map to add fragment information to by index in USFM
   * @param fragmentsByJsonPath Map to add fragment information to by JSONPath
   * @param indicesInUsfmByVerseRef Map to add verse start locations to. If this method encounters a
   *   verse range, only the starting verse number is used. See {@link IndicesInUsfmByVerseRef} for
   *   potential adjustments to handle verse ranges differently when we know better what we ought to
   *   do.
   */
  static transferFragmentsInfoArrayToMaps(e, t, r, i, n, c) {
    e.map((d) => {
      var m, b, u;
      if (typeof d.fragment == "object" && "type" in d.fragment) {
        const h = d.fragment;
        if (h.type === ke && h.code)
          r.bookId = h.code, r.chapterNum = 0, r.verseNum = 0, c[S] && (c[r.bookId] = c[S], delete c[S]);
        else if (h.type === H && h.number) {
          const f = parseInt(h.number, 10);
          if (Number.isNaN(f))
            console.warn(
              `Found ${H} type marker with number ${h.number}, but could not parse chapter number from it. Continuing using previous chapter number ${r.chapterNum}`
            );
          else {
            r.chapterNum = f, r.verseNum = 0;
            const y = c[r.bookId];
            y != null && y[0] && (y[r.chapterNum] = y[0], delete y[0]);
          }
        } else if (h.type === w && h.number) {
          const f = (m = Ne.exec(h.number)) == null ? void 0 : m[1];
          if (!f)
            console.warn(
              `Found ${w} type marker with number ${h.number}, but could not find starting verse number in it. Continuing using previous verse number ${r.verseNum}`
            );
          else {
            const y = parseInt(f, 10);
            Number.isNaN(y) ? console.warn(
              `Found ${w} type marker with number ${h.number}, but could not parse starting verse number from ${f}. Continuing using previous verse number ${r.verseNum}`
            ) : (u = (b = c[r.bookId]) == null ? void 0 : b[r.chapterNum]) != null && u[y] ? console.warn(`Found ${w} marker with existing number ${y} after
                  current ${w} number ${r.verseNum}! Not updating verse start index. All positions in this duplicate verse will be based on the current ${w} marker, not the new duplicate marker.`) : (y < r.verseNum && console.debug(
              `Found ${w} marker with number ${y} lower than current ${w} number ${r.verseNum}. Verses are out of order. There may be some issues.`
            ), r.verseNum = y);
          }
        }
      }
      return {
        ...d,
        // Determine the appropriate `UsjDocumentLocation` subtype based on what this fragment is
        nodeAndDocumentLocation: g.convertFragmentToUsjNodeAndDocumentLocation(
          d.fragment,
          t
        )
      };
    }).forEach((d) => {
      i.set(d.indexInUsfm, d);
      const l = d.nodeAndDocumentLocation.documentLocation.jsonPath, m = n.get(l);
      m ? m.push(d) : n.set(l, [d]), c[r.bookId] || (c[r.bookId] = {}), c[r.bookId][r.chapterNum] || (c[r.bookId][r.chapterNum] = {}), c[r.bookId][r.chapterNum][r.verseNum] === void 0 && (c[r.bookId][r.chapterNum][r.verseNum] = d.indexInUsfm);
    }), e.splice(0);
  }
  // #endregion fragment utilities
  // #region USFM-related cached properties
  /**
   * Generates USFM representation of the USJ document passed in and returns it along with
   * information about how various locations in USFM and USJ map to each other
   */
  calculateUsfmProperties() {
    let e = "";
    const t = new B(), r = /* @__PURE__ */ new Map(), i = {}, n = [], c = {
      bookId: S,
      chapterNum: 0,
      verseNum: 0
    };
    function p(m) {
      g.transferFragmentsInfoArrayToMaps(
        n,
        m,
        c,
        t,
        r,
        i
      );
    }
    let d;
    const l = [];
    return g.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      this.usj,
      // Working stack is empty since the top-level object doesn't have any parents
      [],
      // Don't skip anything
      [],
      (m, b) => {
        if (typeof m != "object") {
          const { usfm: h, fragmentsInfo: f } = this.textContentToUsfm(m);
          return g.mergeFragmentsInfoIntoExistingArray(
            f,
            n,
            e.length
          ), p(b), e += h, !1;
        }
        let u;
        return b.length > 0 && (u = b[b.length - 1].parent), "isClosingMarker" in m ? l.length > 0 && l[l.length - 1] === m.forMarker ? (l.pop(), !1) : (e = this.addMarkerUsfmToString(
          e,
          m,
          u,
          n
        ), p(b), m.forMarker.type === "book" && d && (e = this.addMarkerUsfmToString(e, d, u, n), p(b), d = void 0), !1) : this.shouldSkipOutputMarkerToUsfm(m) ? (l.push(m), !1) : g.isTopLevelUsjMarker(m, b) && !d ? (m.version !== "3.0" && (d = m), !1) : (e = this.addMarkerUsfmToString(e, m, u, n), p(b), !1);
      }
    ), e = `${g.removeEndSpace(e)}
`, { usfm: e, fragmentsByIndexInUsfm: t, fragmentsByJsonPath: r, indicesInUsfmByVerseRef: i };
  }
  /** The USFM representation of the USJ document passed in */
  get usfm() {
    return this.usfmInternal !== void 0 ? this.usfmInternal : ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      fragmentsByJsonPath: this.fragmentsByJsonPathInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties(), this.usfmInternal);
  }
  /** Fragments at each index in the USFM string */
  get fragmentsByIndexInUsfm() {
    return this.fragmentsByIndexInUsfmInternal ? this.fragmentsByIndexInUsfmInternal : ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      fragmentsByJsonPath: this.fragmentsByJsonPathInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties(), this.fragmentsByIndexInUsfmInternal);
  }
  /** Fragments at each index in the USFM string */
  get fragmentsByJsonPath() {
    return this.fragmentsByJsonPathInternal ? this.fragmentsByJsonPathInternal : ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      fragmentsByJsonPath: this.fragmentsByJsonPathInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties(), this.fragmentsByJsonPathInternal);
  }
  /**
   * String index of the start of each verse (the backslash on the verse marker) in the USFM
   * representation of the USJ document. See {@link IndicesInUsfmByVerseRef} for more information.
   */
  get indicesInUsfmByVerseRef() {
    return this.indicesInUsfmByVerseRefInternal ? this.indicesInUsfmByVerseRefInternal : ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      fragmentsByJsonPath: this.fragmentsByJsonPathInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties(), this.indicesInUsfmByVerseRefInternal);
  }
  // #endregion USFM-related cached properties
}
export {
  Xe as ABORTED,
  We as ALREADY_EXISTS,
  R as AsyncVariable,
  Ze as CANCELLED,
  H as CHAPTER_TYPE,
  o as CategoryType,
  Ve as Collator,
  Qe as DATA_LOSS,
  et as DEADLINE_EXCEEDED,
  Ft as DEBOUNCE_CANCELED_ERROR_MESSAGE,
  de as DateTimeFormat,
  ue as DocumentCombiner,
  ze as EventRollingTimeCounter,
  tt as FAILED_PRECONDITION,
  Ot as FIRST_SCR_BOOK_NUM,
  Rt as FIRST_SCR_CHAPTER_NUM,
  Dt as FIRST_SCR_VERSE_NUM,
  Lt as GraphemeString,
  rt as INTERNAL,
  nt as INVALID_ARGUMENT,
  Bt as LAST_SCR_BOOK_NUM,
  Vt as MAX_PADDING_LENGTH,
  Pt as MODIFIER_KEYS,
  a as MarkerType,
  fe as Mutex,
  He as MutexMap,
  it as NOT_FOUND,
  Je as NonValidatingDocumentCombiner,
  me as NumberFormat,
  st as OUT_OF_RANGE,
  at as PERMISSION_DENIED,
  A as PLATFORM_ERROR_VERSION,
  le as PlatformEventEmitter,
  Ke as PromiseChainingMap,
  ot as RESOURCE_EXHAUSTED,
  zt as SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS,
  Ht as Section,
  B as SortedNumberMap,
  Ge as SortedSet,
  Ce as THEME_STYLE_ELEMENT_ID,
  ct as UNAUTHENTICATED,
  dt as UNAVAILABLE,
  pt as UNIMPLEMENTED,
  lt as UNKNOWN,
  F as USFM_MARKERS_MAP_3_0,
  jt as USFM_MARKERS_MAP_PARATEXT_3_0,
  Ye as UnsubscriberAsyncList,
  g as UsjReaderWriter,
  w as VERSE_TYPE,
  mt as aggregateUnsubscriberAsyncs,
  ft as aggregateUnsubscribers,
  $t as applyThemeStylesheet,
  Jt as areUsjContentsEqualExceptWhitespace,
  Kt as at,
  Gt as charAt,
  Yt as codePointAt,
  Xt as collapseMiddleWords,
  Wt as collectUsjMarkers,
  Zt as compareScrRefs,
  Ct as computeEffectiveStructureProtection,
  Qt as createSyncProxyForAsyncObject,
  er as debounce,
  C as deepClone,
  U as deepEqual,
  tr as defaultScrRef,
  xe as deserialize,
  qt as doesCatalogRowCoverProject,
  rr as endsWith,
  nr as ensureArray,
  ir as escapeStringRegexp,
  At as expandThemeContribution,
  Et as formatBytes,
  St as formatRelativeDate,
  sr as formatReplacementString,
  ar as formatReplacementStringToArray,
  or as formatScrRef,
  cr as formatScrRefRange,
  wt as formatTimeSpan,
  dr as getAllObjectFunctionNames,
  pr as getChaptersForBook,
  _t as getCurrentLocale,
  W as getDefaultCallerSequence,
  lr as getErrorMessage,
  bt as getFormatCallerFunction,
  Tt as getLocalizeKeyForPhysicalKey,
  ur as getLocalizeKeyForScrollGroupId,
  hr as getLocalizeKeysForScrollGroupIds,
  fr as getLocalizedIdFromBookNumber,
  be as getNthCaller,
  vt as getPaneSizeLimits,
  mr as getSectionForBook,
  Ae as getStylesheetForTheme,
  gr as groupBy,
  xt as htmlEncode,
  yr as includes,
  kr as indexOf,
  gt as isBlockMarker,
  yt as isCharacterMarker,
  br as isErrorMessageAboutParatextBlockingInternetAccess,
  vr as isErrorMessageAboutRegistryAuthFailure,
  Mr as isLocalizeKey,
  ht as isPlatformError,
  xr as isSelectableInvisibleCharOrWhiteSpace,
  Mt as isSerializable,
  _ as isString,
  Me as isSubset,
  _r as isWhiteSpace,
  Er as isolateBidi,
  Ir as lastIndexOf,
  Se as localizedStringsDocumentSchema,
  Pe as menuDocumentSchema,
  wr as newGuid,
  ut as newPlatformError,
  Sr as normalize,
  It as normalizeProjectId,
  Pr as normalizeScriptureSpaces,
  Tr as offsetBook,
  Cr as offsetChapter,
  qr as offsetVerse,
  Ar as ordinalCompare,
  $r as padEnd,
  jr as padStart,
  Ie as projectSettingsDocumentSchema,
  Nr as retryUntil,
  kt as sanitizeHtml,
  Ur as scrRefToBBBCCC,
  Fr as scrRefToBBBCCCVVV,
  J as serialize,
  we as settingsDocumentSchema,
  Or as slice,
  Rr as split,
  Dr as startsWith,
  Lr as stringLength,
  Br as substring,
  Te as themeDocumentSchema,
  Vr as toArray,
  zr as toKebabCase,
  Hr as transformAndEnsureRegExpArray,
  Jr as transformAndEnsureRegExpRegExpArray,
  X as usfmMarkers,
  Kr as wait,
  Gr as waitForDuration
};
//# sourceMappingURL=index.js.map
