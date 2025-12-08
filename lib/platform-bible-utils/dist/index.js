var Qe = Object.defineProperty;
var et = (r, e, t) => e in r ? Qe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var y = (r, e, t) => et(r, typeof e != "symbol" ? e + "" : e, t);
import { Mutex as tt } from "async-mutex";
import { USJ_TYPE as Oe } from "@eten-tech-foundation/scripture-utilities";
import { length as rt, indexOf as nt, limit as Pe, substring as it, toArray as st, substr as ot } from "stringz";
import at from "dompurify";
import { JSONPath as L } from "jsonpath-plus";
const G = class G {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, t = 1e4) {
    y(this, "variableName");
    y(this, "promiseToValue");
    y(this, "timeoutId");
    y(this, "timeoutOccurred");
    y(this, "resolver");
    y(this, "rejecter");
    this.variableName = e, this.timeoutOccurred = !1, this.promiseToValue = new Promise((n, i) => {
      this.resolver = n, this.rejecter = i;
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
      G.verboseLoggingEnabled && console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
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
      G.verboseLoggingEnabled && console.debug(`${this.variableName} is being rejected now with reason: ${e}`), this.rejecter(e), this.complete();
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
y(G, "verboseLoggingEnabled", !1);
let oe = G;
class Qr {
  constructor(e, t) {
    y(this, "collator");
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
class ct {
  constructor(e, t) {
    y(this, "dateTimeFormatter");
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
class lt {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    y(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    y(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    y(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    y(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    y(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    y(this, "emit", (e) => {
      this.emitFn(e);
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
    this.assertNotDisposed(), [...this.subscriptions ?? []].forEach((n) => n(e));
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
}
function en() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (r) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~r) * 65536 >> r).toString(16).padStart(4, "0")
    )
  );
}
function N(r) {
  return typeof r == "string" || r instanceof String;
}
function K(r) {
  return JSON.parse(JSON.stringify(r));
}
function tn(r, e = 300) {
  let t, n, i, s;
  return (...o) => (clearTimeout(t), n || (n = new Promise((a, c) => {
    i = a, s = c;
  })), t = setTimeout(async () => {
    try {
      i(await r(...o));
    } catch (a) {
      s(a);
    } finally {
      n = void 0;
    }
  }, e), n);
}
function rn(r, e, t) {
  const n = /* @__PURE__ */ new Map();
  return r.forEach((i, s) => {
    const o = e(i, s), a = n.get(o), c = t ? t(i, o, s) : i;
    a ? a.push(c) : n.set(o, [c]);
  }), n;
}
function ut(r) {
  return typeof r == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  r !== null && "message" in r && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof r.message == "string";
}
function ft(r) {
  if (ut(r)) return r;
  try {
    return new Error(JSON.stringify(r));
  } catch {
    return new Error(String(r));
  }
}
function Ce(r) {
  return ft(r).message;
}
function pt(r) {
  return new Promise((e) => setTimeout(e, r));
}
function nn(r, e) {
  const t = pt(e).then(() => {
  });
  return Promise.any([t, r()]);
}
function sn(r, e = "obj") {
  const t = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(r).forEach((i) => {
    try {
      typeof r[i] == "function" && t.add(i);
    } catch {
    }
  });
  let n = Object.getPrototypeOf(r);
  for (; n && Object.getPrototypeOf(n); )
    Object.getOwnPropertyNames(n).forEach((i) => {
      try {
        typeof r[i] == "function" && t.add(i);
      } catch {
      }
    }), n = Object.getPrototypeOf(n);
  return t;
}
function on(r, e = {}) {
  return new Proxy(e, {
    get(t, n) {
      return n in t ? t[n] : async (...i) => (await r())[n](...i);
    }
  });
}
function an(r) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return N(r) ? r.includes(e) : Ce(r).includes(e);
}
function cn(r) {
  const e = "401 Unauthorized error while getting shared projects.", t = "User registration is not valid. Cannot retrieve resources from DBL.", n = N(r) ? r : Ce(r);
  return n.includes(e) || n.includes(t);
}
class ht {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, t) {
    y(this, "baseDocument");
    y(this, "contributions", /* @__PURE__ */ new Map());
    y(this, "latestOutput");
    y(this, "options");
    y(this, "onDidRebuildEmitter", new lt());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    y(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = t, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? K(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
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
    const n = this.contributions.get(e);
    let i = this.options.copyDocuments && t ? K(t) : t;
    i = this.transformContributionAfterValidation(e, i), this.contributions.set(e, i);
    try {
      return this.rebuild();
    } catch (s) {
      throw n ? this.contributions.set(e, n) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${s}`);
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
    } catch (n) {
      throw this.contributions.set(e, t), new Error(`Error when deleting the document named ${e}: ${n}`);
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
        ([n, i]) => this.contributions.set(n, i)
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
      let t = K(this.baseDocument);
      return t = this.transformFinalOutputBeforeValidation(t), this.validateOutput(t), this.latestOutput = t, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((t) => {
      e = dt(
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
function ae(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || Array.isArray(t)) && (e = !1);
  }), e;
}
function ce(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || !Array.isArray(t)) && (e = !1);
  }), e;
}
function dt(r, e, t) {
  const n = K(r);
  return e ? $e(n, K(e), t) : n;
}
function $e(r, e, t) {
  if (!e) return r;
  if (ae(r, e)) {
    const n = r, i = e;
    Object.keys(i).forEach((s) => {
      if (Object.hasOwn(n, s)) {
        if (ae(n[s], i[s]))
          n[s] = $e(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            n[s],
            i[s],
            t
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (ce(n[s], i[s]))
          n[s] = n[s].concat(
            i[s]
          );
        else if (!t)
          throw new Error(`Cannot merge objects: key "${s}" already exists in the target object`);
      } else
        n[s] = i[s];
    });
  } else ce(r, e) && r.push(...e);
  return r;
}
class ln {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(e) {
    /** The ring buffer to store times */
    y(this, "ringBuffer");
    /** The size of the ring buffer */
    y(this, "bufferSize");
    /** The next location where a time will be written */
    y(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    y(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    y(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    y(this, "totalInstanceCount");
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
class mt extends tt {
}
class un {
  constructor() {
    y(this, "mutexesByID", /* @__PURE__ */ new Map());
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
    return t || (t = new mt(), this.mutexesByID.set(e, t), t);
  }
}
class fn extends ht {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, t) {
    super(e, t);
  }
  get output() {
    return this.latestOutput;
  }
}
class gt {
  constructor(e, t) {
    y(this, "numberFormatter");
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
const yt = Promise.resolve();
class pn {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    y(this, "map", /* @__PURE__ */ new Map());
    y(this, "logger");
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
    const n = this.map.get(e);
    this.map.set(e, n ? n.then(t) : t()), this.cleanupPromiseChain(e);
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
    const n = { promise: yt }, i = t.catch((s) => this.logger.warn(`Error in promise for ${e}: ${s.message}`)).finally(() => {
      this.map.get(e) === n.promise && this.map.delete(e);
    });
    n.promise = i, this.map.set(e, i);
  }
}
class le {
  constructor() {
    y(this, "map", /* @__PURE__ */ new Map());
    y(this, "sortedKeys", []);
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
      const n = this.binarySearchInsertIndex(e);
      this.sortedKeys.splice(n, 0, e);
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
    const n = this.sortedKeys[t], i = this.map.get(n);
    if (i !== void 0)
      return { key: n, value: i };
  }
  binarySearchLessThanOrEqual(e) {
    let t = 0, n = this.sortedKeys.length - 1, i = -1;
    for (; t <= n; ) {
      const s = Math.floor((t + n) / 2);
      this.sortedKeys[s] <= e ? (i = s, t = s + 1) : n = s - 1;
    }
    return i;
  }
  binarySearchInsertIndex(e) {
    let t = 0, n = this.sortedKeys.length;
    for (; t < n; ) {
      const i = Math.floor((t + n) / 2);
      this.sortedKeys[i] < e ? t = i + 1 : n = i;
    }
    return t;
  }
}
class hn {
  /**
   * Creates a new sorted set
   *
   * @param compareFn - Function used to determine the order of elements. Returns negative when a <
   *   b, zero when a = b, positive when a > b
   */
  constructor(e) {
    /** Internal storage for the sorted items */
    y(this, "items", []);
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
    this.items.forEach((t, n) => e(t, n, this));
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
    let t = 0, n = this.items.length;
    for (; t < n; ) {
      const i = Math.floor((t + n) / 2);
      this.compareFn(this.items[i], e) < 0 ? t = i + 1 : n = i;
    }
    return t;
  }
}
class dn {
  constructor(e = "Anonymous") {
    y(this, "unsubscribers", /* @__PURE__ */ new Set());
    this.name = e;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...e) {
    e.forEach((t) => {
      "dispose" in t ? this.unsubscribers.add(t.dispose.bind(t)) : this.unsubscribers.add(t);
    });
  }
  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * @returns `true` if all unsubscribers succeeded, `false` otherwise.
   */
  async runAllUnsubscribers() {
    const e = [...this.unsubscribers].map((n) => n()), t = await Promise.all(e);
    return this.unsubscribers.clear(), t.every((n, i) => (n || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${i} failed!`), n));
  }
}
const X = 1;
function mn(r) {
  if (!r) return { message: "", platformErrorVersion: X };
  if (N(r)) return { message: r, platformErrorVersion: X };
  if (typeof r == "object" && "message" in r && typeof r.message == "string") {
    const e = {
      message: r.message,
      platformErrorVersion: X
    };
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)), Object.defineProperty(e, "message", { enumerable: !0 }), "stack" in r && N(r.stack) && Object.defineProperty(e, "stack", { value: r.stack, enumerable: !0 }), "cause" in e && Object.defineProperty(e, "cause", { enumerable: !0 }), e;
  }
  return { cause: r, message: "", platformErrorVersion: X };
}
function gn(r) {
  return !!r && typeof r == "object" && "platformErrorVersion" in r;
}
var bt = Object.defineProperty, vt = (r, e, t) => e in r ? bt(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, v = (r, e, t) => vt(r, typeof e != "symbol" ? e + "" : e, t);
const U = [
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  // 10
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  // 20
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  // 30
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
  "MAT",
  // 40
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  // 50
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  // 60
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
  "TOB",
  "JDT",
  "ESG",
  "WIS",
  // 70
  "SIR",
  "BAR",
  "LJE",
  "S3Y",
  "SUS",
  "BEL",
  "1MA",
  "2MA",
  "3MA",
  "4MA",
  // 80
  "1ES",
  "2ES",
  "MAN",
  "PS2",
  "ODA",
  "PSS",
  "JSA",
  // actual variant text for JOS, now in LXA text
  "JDB",
  // actual variant text for JDG, now in LXA text
  "TBS",
  // actual variant text for TOB, now in LXA text
  "SST",
  // actual variant text for SUS, now in LXA text // 90
  "DNT",
  // actual variant text for DAN, now in LXA text
  "BLT",
  // actual variant text for BEL, now in LXA text
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  // 100
  "BAK",
  "OTH",
  "3ES",
  // Used previously but really should be 2ES
  "EZA",
  // Used to be called 4ES, but not actually in any known project
  "5EZ",
  // Used to be called 5ES, but not actually in any known project
  "6EZ",
  // Used to be called 6ES, but not actually in any known project
  "INT",
  "CNC",
  "GLO",
  "TDX",
  // 110
  "NDX",
  "DAG",
  "PS3",
  "2BA",
  "LBA",
  "JUB",
  "ENO",
  "1MQ",
  "2MQ",
  "3MQ",
  // 120
  "REP",
  "4BA",
  "LAO"
], re = [
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  "BAK",
  "OTH",
  "INT",
  "CNC",
  "GLO",
  "TDX",
  "NDX"
], je = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther (Hebrew)",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Songs",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel (Hebrew)",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
  "Tobit",
  "Judith",
  "Esther Greek",
  "Wisdom of Solomon",
  "Sirach (Ecclesiasticus)",
  "Baruch",
  "Letter of Jeremiah",
  "Song of 3 Young Men",
  "Susanna",
  "Bel and the Dragon",
  "1 Maccabees",
  "2 Maccabees",
  "3 Maccabees",
  "4 Maccabees",
  "1 Esdras (Greek)",
  "2 Esdras (Latin)",
  "Prayer of Manasseh",
  "Psalm 151",
  "Odes",
  "Psalms of Solomon",
  // WARNING, if you change the spelling of the *obsolete* tag be sure to update
  // IsObsolete routine
  "Joshua A. *obsolete*",
  "Judges B. *obsolete*",
  "Tobit S. *obsolete*",
  "Susanna Th. *obsolete*",
  "Daniel Th. *obsolete*",
  "Bel Th. *obsolete*",
  "Extra A",
  "Extra B",
  "Extra C",
  "Extra D",
  "Extra E",
  "Extra F",
  "Extra G",
  "Front Matter",
  "Back Matter",
  "Other Matter",
  "3 Ezra *obsolete*",
  "Apocalypse of Ezra",
  "5 Ezra (Latin Prologue)",
  "6 Ezra (Latin Epilogue)",
  "Introduction",
  "Concordance ",
  "Glossary ",
  "Topical Index",
  "Names Index",
  "Daniel Greek",
  "Psalms 152-155",
  "2 Baruch (Apocalypse)",
  "Letter of Baruch",
  "Jubilees",
  "Enoch",
  "1 Meqabyan",
  "2 Meqabyan",
  "3 Meqabyan",
  "Reproof (Proverbs 25-31)",
  "4 Baruch (Rest of Baruch)",
  "Laodiceans"
], ue = Tt();
function q(r, e = !0) {
  return e && (r = r.toUpperCase()), r in ue ? ue[r] : 0;
}
function ne(r) {
  return q(r) > 0;
}
function kt(r) {
  const e = typeof r == "string" ? q(r) : r;
  return e >= 40 && e <= 66;
}
function wt(r) {
  return (typeof r == "string" ? q(r) : r) <= 39;
}
function Ue(r) {
  return r <= 66;
}
function Nt(r) {
  const e = typeof r == "string" ? q(r) : r;
  return Re(e) && !Ue(e);
}
function* It() {
  for (let r = 1; r <= U.length; r++) yield r;
}
const xt = 1, Be = U.length;
function Et() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function ie(r, e = "***") {
  const t = r - 1;
  return t < 0 || t >= U.length ? e : U[t];
}
function De(r) {
  return r <= 0 || r > Be ? "******" : je[r - 1];
}
function St(r) {
  return De(q(r));
}
function Re(r) {
  const e = typeof r == "number" ? ie(r) : r;
  return ne(e) && !re.includes(e);
}
function At(r) {
  const e = typeof r == "number" ? ie(r) : r;
  return ne(e) && re.includes(e);
}
function Mt(r) {
  return je[r - 1].includes("*obsolete*");
}
function Tt() {
  const r = {};
  for (let e = 0; e < U.length; e++)
    r[U[e]] = e + 1;
  return r;
}
const I = {
  allBookIds: U,
  nonCanonicalIds: re,
  bookIdToNumber: q,
  isBookIdValid: ne,
  isBookNT: kt,
  isBookOT: wt,
  isBookOTNT: Ue,
  isBookDC: Nt,
  allBookNumbers: It,
  firstBook: xt,
  lastBook: Be,
  extraBooks: Et,
  bookNumberToId: ie,
  bookNumberToEnglishName: De,
  bookIdToEnglishName: St,
  isCanonical: Re,
  isExtraMaterial: At,
  isObsolete: Mt
};
var T = /* @__PURE__ */ ((r) => (r[r.Unknown = 0] = "Unknown", r[r.Original = 1] = "Original", r[r.Septuagint = 2] = "Septuagint", r[r.Vulgate = 3] = "Vulgate", r[r.English = 4] = "English", r[r.RussianProtestant = 5] = "RussianProtestant", r[r.RussianOrthodox = 6] = "RussianOrthodox", r))(T || {});
const M = class {
  // private versInfo: Versification;
  constructor(e) {
    if (v(this, "name"), v(this, "fullPath"), v(this, "isPresent"), v(this, "hasVerseSegments"), v(this, "isCustomized"), v(this, "baseVersification"), v(this, "scriptureBooks"), v(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = T[e]) : (this._type = e, this.name = T[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
v(M, "Original", new M(T.Original)), v(M, "Septuagint", new M(T.Septuagint)), v(M, "Vulgate", new M(T.Vulgate)), v(M, "English", new M(T.English)), v(M, "RussianProtestant", new M(T.RussianProtestant)), v(M, "RussianOrthodox", new M(T.RussianOrthodox));
let $ = M;
function fe(r, e) {
  const t = e[0];
  for (let n = 1; n < e.length; n++)
    r = r.split(e[n]).join(t);
  return r.split(t);
}
var Ve = /* @__PURE__ */ ((r) => (r[r.Valid = 0] = "Valid", r[r.UnknownVersification = 1] = "UnknownVersification", r[r.OutOfRange = 2] = "OutOfRange", r[r.VerseOutOfOrder = 3] = "VerseOutOfOrder", r[r.VerseRepeated = 4] = "VerseRepeated", r))(Ve || {});
const A = class k {
  constructor(e, t, n, i) {
    if (v(this, "firstChapter"), v(this, "lastChapter"), v(this, "lastVerse"), v(this, "hasSegmentsDefined"), v(this, "text"), v(this, "BBBCCCVVVS"), v(this, "longHashCode"), v(this, "versification"), v(this, "rtlMark", "‏"), v(this, "_bookNum", 0), v(this, "_chapterNum", 0), v(this, "_verseNum", 0), v(this, "_verse"), n == null && i == null)
      if (e != null && typeof e == "string") {
        const s = e, o = t != null && t instanceof $ ? t : void 0;
        this.setEmpty(o), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = t != null && t instanceof $ ? t : void 0;
        this.setEmpty(s), this._verseNum = e % k.chapterDigitShifter, this._chapterNum = Math.floor(
          e % k.bookDigitShifter / k.chapterDigitShifter
        ), this._bookNum = Math.floor(e / k.bookDigitShifter);
      } else if (t == null)
        if (e != null && e instanceof k) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof $ ? e : k.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && t != null && n != null)
      if (typeof e == "string" && typeof t == "string" && typeof n == "string")
        this.setEmpty(i), this.updateInternal(e, t, n);
      else if (typeof e == "number" && typeof t == "number" && typeof n == "number")
        this._bookNum = e, this._chapterNum = t, this._verseNum = n, this.versification = i ?? k.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(e) {
    return e.length > 0 && "0123456789".includes(e[0]) && !e.endsWith(this.verseRangeSeparator) && !e.endsWith(this.verseSequenceIndicator);
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
      return t = new k(e), { success: !0, verseRef: t };
    } catch (n) {
      if (n instanceof F)
        return t = new k(), { success: !1, verseRef: t };
      throw n;
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
  static getBBBCCCVVV(e, t, n) {
    return e % k.bcvMaxValue * k.bookDigitShifter + (t >= 0 ? t % k.bcvMaxValue * k.chapterDigitShifter : 0) + (n >= 0 ? n % k.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: t, chapterNum: n, verseNum: i, verse: s, versificationStr: o } = e, a = s || i.toString();
    let c;
    return o && (c = new $(o)), t ? new k(t, n.toString(), a, c) : new k();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let t;
    if (!e)
      return t = -1, { success: !0, vNum: t };
    t = 0;
    let n;
    for (let i = 0; i < e.length; i++) {
      if (n = e[i], n < "0" || n > "9")
        return i === 0 && (t = -1), { success: !1, vNum: t };
      if (t = t * 10 + +n - 0, t > k.bcvMaxValue)
        return t = -1, { success: !1, vNum: t };
    }
    return { success: !0, vNum: t };
  }
  /**
   * Checks to see if a VerseRef hasn't been set - all values are the default.
   */
  get isDefault() {
    return this.bookNum === 0 && this.chapterNum === 0 && this.verseNum === 0 && this.versification == null;
  }
  /**
   * Gets whether the verse contains multiple verses.
   */
  get hasMultiple() {
    return this._verse != null && (this._verse.includes(k.verseRangeSeparator) || this._verse.includes(k.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return I.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = I.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
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
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: t, vNum: n } = k.tryGetVerseNum(e);
    this._verse = t ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = k.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > I.lastBook)
      throw new F(
        "BookNum must be greater than zero and less than or equal to last book"
      );
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
    this.versification = this.versification != null ? new $(e) : void 0;
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
    return this.validateVerse(k.verseRangeSeparators, k.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return k.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return k.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
    if (e = e.replace(this.rtlMark, ""), e.includes("/")) {
      const s = e.split("/");
      if (e = s[0], s.length > 1)
        try {
          const o = +s[1].trim();
          this.versification = new $(T[o]);
        } catch {
          throw new F("Invalid reference : " + e);
        }
    }
    const t = e.trim().split(" ");
    if (t.length !== 2)
      throw new F("Invalid reference : " + e);
    const n = t[1].split(":"), i = +n[0];
    if (n.length !== 2 || I.bookIdToNumber(t[0]) === 0 || !Number.isInteger(i) || i < 0 || !k.isVerseParseable(n[1]))
      throw new F("Invalid reference : " + e);
    this.updateInternal(t[0], n[0], n[1]);
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
    return new k(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    (e === "" || e === this.verseNum.toString()) && (e = void 0);
    const t = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
    return e || delete t.verse, t;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof k ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, t = k.verseRangeSeparators, n = k.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const i = [], s = fe(this._verse, n);
    for (const o of s.map((a) => fe(a, t))) {
      const a = this.clone();
      a.verse = o[0];
      const c = a.verseNum;
      if (i.push(a), o.length > 1) {
        const l = this.clone();
        if (l.verse = o[1], !e)
          for (let u = c + 1; u < l.verseNum; u++) {
            const h = new k(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || i.push(h);
          }
        i.push(l);
      }
    }
    return i;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, t) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const i of this.allVerses(!0, e, t)) {
      const s = i.internalValid;
      if (s !== 0)
        return s;
      const o = i.BBBCCCVVV;
      if (n > o)
        return 3;
      if (n === o)
        return 4;
      n = o;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > I.lastBook ? 2 : (I.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = k.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, t, n) {
    this.bookNum = I.bookIdToNumber(e), this.chapter = t, this.verse = n;
  }
};
v(A, "defaultVersification", $.English), v(A, "verseRangeSeparator", "-"), v(A, "verseSequenceIndicator", ","), v(A, "verseRangeSeparators", [A.verseRangeSeparator]), v(A, "verseSequenceIndicators", [A.verseSequenceIndicator]), v(A, "chapterDigitShifter", 1e3), v(A, "bookDigitShifter", A.chapterDigitShifter * A.chapterDigitShifter), v(A, "bcvMaxValue", A.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
v(A, "ValidStatusType", Ve);
let qe = A;
class F extends Error {
}
function Le(r) {
  return r ? Array.isArray(r) ? r : [r] : [];
}
function H(r, e) {
  if (!(e > x(r) || e < -x(r)))
    return W(r, e, 1);
}
function V(r, e) {
  return e < 0 || e > x(r) - 1 ? "" : W(r, e, 1);
}
function bn(r, e) {
  if (!(e < 0 || e > x(r) - 1))
    return W(r, e, 1).codePointAt(0);
}
function Ot(r, e, t = x(r)) {
  const n = jt(r, e);
  return !(n === -1 || n + x(e) !== t);
}
function Pt(r, e, t) {
  if (e < 0) return -1;
  if (t) {
    if (V(r, e) === "}" && V(r, e - 1) === "\\") return e;
    const s = _(r, "\\}", e);
    return s >= 0 ? s + 1 : s;
  }
  let n = e;
  const i = x(r);
  for (; n < i && (n = _(r, "}", n), !(n === -1 || V(r, n - 1) !== "\\")); )
    n += 1;
  return n >= i ? -1 : n;
}
function Ct(r, e) {
  const t = [];
  let n = 0, i = 0;
  function s(a, c, l) {
    const u = j(r, i, c), h = t.length > 0 && N(t[t.length - 1]) ? `${t.pop()}${u}` : u;
    N(a) ? t.push(`${h}${a}`) : (h && t.push(h), t.push(a)), i = c + l;
  }
  const o = x(r);
  for (; n < o; ) {
    switch (V(r, n)) {
      case "{":
        if (V(r, n - 1) !== "\\") {
          const a = Pt(r, n, !1);
          if (a >= 0) {
            const c = j(r, n + 1, a), l = c in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[c]
            ) : c;
            s(l, n, a + 1 - n), n = a, i = a + 1;
          }
        } else
          s("{", n - 1, 2);
        break;
      case "}":
        V(r, n - 1) !== "\\" || s("}", n - 1, 2);
        break;
    }
    n += 1;
  }
  if (i < o) {
    const a = j(r, i);
    t.push(
      t.length > 0 && N(t[t.length - 1]) ? `${t.pop()}${a}` : a
    );
  }
  return t;
}
function vn(r, e) {
  return Ct(r, e).map((t) => `${t}`).join("");
}
function $t(r, e, t = 0) {
  const n = j(r, t);
  return _(n, e) !== -1;
}
function _(r, e, t = 0) {
  return nt(r, e, t);
}
function jt(r, e, t) {
  let n = t === void 0 ? x(r) : t;
  n < 0 ? n = 0 : n >= x(r) && (n = x(r) - 1);
  for (let i = n; i >= 0; i--)
    if (W(r, i, x(e)) === e)
      return i;
  return -1;
}
function x(r) {
  return rt(r);
}
function kn(r, e) {
  const t = e.toUpperCase();
  return t === "NONE" ? r : r.normalize(t);
}
function wn(r, e, t) {
  return r.localeCompare(e, "en", t);
}
function Nn(r, e, t = " ") {
  return e <= x(r) ? r : Pe(r, e, t, "right");
}
function In(r, e, t = " ") {
  return e <= x(r) ? r : Pe(r, e, t, "left");
}
function pe(r, e) {
  return e > r ? r : e < -r ? 0 : e < 0 ? e + r : e;
}
function he(r, e, t) {
  const n = x(r);
  if (e > n || t && (e > t && !(e >= 0 && e < n && t < 0 && t > -n) || t < -n))
    return "";
  const i = pe(n, e), s = t ? pe(n, t) : void 0;
  return j(r, i, s);
}
function de(r, e, t) {
  const n = [];
  if (t !== void 0 && t <= 0)
    return [r];
  if (e === "") return Ut(r).slice(0, t);
  let i = e;
  (typeof e == "string" || e instanceof RegExp && !$t(e.flags, "g")) && (i = new RegExp(e, "g"));
  const s = r.match(i);
  let o = 0;
  if (!s) return [r];
  for (let a = 0; a < (t ? t - 1 : s.length); a++) {
    const c = _(r, s[a], o), l = x(s[a]);
    if (n.push(j(r, o, c)), o = c + l, t !== void 0 && n.length === t)
      break;
  }
  return n.push(j(r, o)), n;
}
function Fe(r, e, t = 0) {
  return _(r, e, t) === t;
}
function W(r, e = 0, t = x(r) - e) {
  return ot(r, e, t);
}
function j(r, e, t = x(r)) {
  return it(r, e, t);
}
function Ut(r) {
  return st(r);
}
function xn(r) {
  return Fe(r, "%") && Ot(r, "%");
}
function En(r) {
  if (typeof r != "string")
    throw new TypeError("Expected a string");
  return r.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Sn(r) {
  return r ? Le(r).map(
    (n) => Array.isArray(n) ? n.map((i) => new RegExp(i)) : new RegExp(n)
  ) : [];
}
function An(r) {
  return r ? Le(r).map((n) => new RegExp(n)) : [];
}
const Bt = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function R(r) {
  return Bt.test(r);
}
function Mn(r) {
  let e = "";
  for (let t = 0; t < r.length; t++) {
    const n = r[t];
    if (n === n.toUpperCase() && n !== n.toLowerCase()) {
      if (t > 0) {
        const s = r[t - 1];
        if (!(s === s.toUpperCase() && s !== s.toLowerCase()))
          e += "-";
        else if (t + 1 < r.length) {
          const a = r[t + 1];
          a === a.toLowerCase() && a !== a.toUpperCase() && (e += "-");
        }
      }
      e += n.toLowerCase();
    } else
      e += n;
  }
  return e;
}
const Q = ["chapter", "book", "para", "row", "sidebar", Oe], Dt = "​", Je = [
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
], Rt = 1, Vt = Je.length - 1, qt = 1, Lt = 1, Tn = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, Ft = (r) => {
  var e;
  return ((e = Je[r]) == null ? void 0 : e.chapters) ?? -1;
}, On = (r, e) => ({
  book: I.bookNumberToId(
    Math.max(
      Rt,
      Math.min(I.bookIdToNumber(r.book) + e, Vt)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), Pn = (r, e) => ({
  ...r,
  chapterNum: Math.min(
    Math.max(qt, r.chapterNum + e),
    Ft(I.bookIdToNumber(r.book))
  ),
  verseNum: 1
}), Cn = (r, e) => ({
  ...r,
  verseNum: Math.max(Lt, r.verseNum + e)
});
async function $n(r, e, t) {
  const n = I.bookNumberToId(r);
  if (!Fe(Intl.getCanonicalLocales(e)[0], "zh"))
    return t({
      localizeKey: `LocalizedId.${n}`,
      languagesToSearch: [e]
    });
  const i = await t({
    localizeKey: `Book.${n}`,
    languagesToSearch: [e]
  }), s = de(i, "-");
  return de(s[0], "ÿ08")[0].trim();
}
function jn(r) {
  return new qe(I.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCC;
}
function me(r) {
  return new qe(I.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCCVVV;
}
function Un(r, e) {
  return me(r) - me(e);
}
function Jt(r) {
  return `%scrollGroup_${r}%`;
}
function Bn(r) {
  return r.map((e) => Jt(e));
}
function Dn(r, e, t, n) {
  let i;
  switch (e ?? "id") {
    case "English":
      i = I.bookIdToEnglishName(r.book);
      break;
    case "id":
      i = r.book;
      break;
    default:
      i = e ?? "";
      break;
  }
  return `${i}${n ?? " "}${r.chapterNum}${t ?? ":"}${r.verseNum}`;
}
var zt = /* @__PURE__ */ ((r) => (r.OT = "OT", r.NT = "NT", r.DC = "DC", r.Extra = "Extra", r))(zt || {});
const Rn = (r) => {
  if (I.isBookOT(r)) return "OT";
  if (I.isBookNT(r)) return "NT";
  if (I.isBookDC(r)) return "DC";
  if (I.isExtraMaterial(r)) return "Extra";
  throw new Error(`Unknown section for book: ${r}`);
}, Kt = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function ge(r) {
  return Kt.test(r);
}
const Gt = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function _t(r) {
  return Gt.test(r);
}
function ye(r) {
  let e = "", t = !1, n = "\0";
  for (let i = 0; i < r.length; i += 1) {
    const s = r[i];
    s.charCodeAt(0) < 32 ? (t || (e += " "), t = !0) : !t && s === Dt && i + 1 < r.length && ge(r[i + 1]) || (ge(s) ? (t || (e += s), t = !0) : _t(s) && n === s || (e += s, t = !1)), n = s;
  }
  return e;
}
function be(r) {
  return !r || r.length === 0 ? !0 : r.length === 1 && (r[0] === void 0 || r[0] === "");
}
function ve(r, e) {
  if (!e || !Q.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(r)} does not have a content array! This should not happen!`
    );
  return r === e.content[e.content.length - 1];
}
function ze(r, e, t, n) {
  if (!r && !t) return !0;
  if (!r || !t) return !1;
  const i = N(r), s = N(t);
  if (i && s) {
    const o = ye(r), a = ye(t);
    if (o !== a) {
      if (!R(H(o, -1) ?? "") && !R(H(a, -1) ?? "") || !ve(r, e) || !ve(t, n)) return !1;
      let c = o;
      for (; R(H(c, -1) ?? ""); ) c = he(c, 0, -1);
      let l = a;
      for (; R(H(l, -1) ?? ""); ) l = he(l, 0, -1);
      if (c !== l) return !1;
    }
  } else if (!i && !s) {
    const o = r, a = t, c = Object.keys(o).filter(
      (h) => h !== "content"
    );
    if (c.length !== Object.keys(a).filter((h) => h !== "content").length || c.some((h) => !(h in a) || o[h] !== a[h])) return !1;
    const l = be(o.content), u = be(a.content);
    if (l !== u) return !1;
    if (!l && !u) {
      let h = o.content, p = a.content;
      const d = h[h.length - 1];
      Q.includes(o.type) && N(d) && R(d) && (h = h.slice(0, -1));
      const f = p[p.length - 1];
      if (Q.includes(a.type) && N(f) && R(f) && (p = p.slice(0, -1)), h.length !== p.length) return !1;
      for (let m = 0; m < h.length; m += 1)
        if (!ze(h[m], o, p[m], a))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function Vn(r, e) {
  return ze(r, void 0, e, void 0);
}
const qn = (r) => (...e) => r.map((n) => n(...e)).every((n) => n), Ln = (r) => async (...e) => {
  const t = r.map(async (n) => n(...e));
  return (await Promise.all(t)).every((n) => n);
}, Xt = "book", ke = "chapter", O = "verse", P = "***";
function Fn(r) {
  return /<color[^>]*>|<language[^>]*>/i.test(r);
}
function Jn(r) {
  return r.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi, "<s>$1</s>").replace(
    /<color[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/color>/gi,
    (e, t, n) => `<span style="color: ${{
      red: "#ef4444",
      green: "#22c55e",
      blue: "#3b82f6"
    }[t.toLowerCase()] || t}">${n}</span>`
  ).replace(/<language[^>]*>([\s\S]*?)<\/language>/gi, "$1");
}
function zn(r) {
  return at.sanitize(r, {
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
function Ke() {
  return Array.from({ length: 26 }, (r, e) => String.fromCharCode(97 + e));
}
function Ht(r, e) {
  const t = e && e.length > 0 ? e : Ke();
  return t[r % t.length];
}
function Kn(r, e) {
  const t = e && e.length > 0 ? e : Ke(), n = (() => {
    const i = /* @__PURE__ */ new Map();
    let s = 0;
    return r.forEach((o, a) => {
      o.caller === "+" && (i.set(a, Ht(s, t)), s += 1);
    }), i;
  })();
  return (i, s) => {
    if (i === "+") {
      const o = n.get(s);
      return o || (console.warn(`Caller index ${s} out of range for '+' callers`), "?");
    }
    if (i !== "-")
      return i;
  };
}
function Yt(r) {
  const e = [];
  if (!r || r.length === 0) return e;
  function t(n) {
    typeof n != "string" && (n.type === "note" ? e.push(n) : Array.isArray(n.content) && n.content.length > 0 && n.content.forEach(t));
  }
  return r.forEach(t), e;
}
function Gn(r, e = {}) {
  const {
    splitterThicknessPx: t = 4,
    secondaryPaneMinSizePx: n = 20,
    mainPaneMinSizePx: i = 60,
    absoluteMinPercent: s = 3,
    absoluteMaxPercent: o = 90
  } = e, a = r - t;
  let c, l;
  return a < n + i ? (c = s, l = o) : (l = Math.min(
    Math.floor((a - i) / a * 100),
    o
  ), c = Math.min(
    Math.max(Math.ceil(n / a * 100), s),
    l
  )), { minPercent: c, maxPercent: l };
}
var Wt = Object.getOwnPropertyNames, Zt = Object.getOwnPropertySymbols, Qt = Object.prototype.hasOwnProperty;
function we(r, e) {
  return function(n, i, s) {
    return r(n, i, s) && e(n, i, s);
  };
}
function Y(r) {
  return function(t, n, i) {
    if (!t || !n || typeof t != "object" || typeof n != "object")
      return r(t, n, i);
    var s = i.cache, o = s.get(t), a = s.get(n);
    if (o && a)
      return o === n && a === t;
    s.set(t, n), s.set(n, t);
    var c = r(t, n, i);
    return s.delete(t), s.delete(n), c;
  };
}
function Ne(r) {
  return Wt(r).concat(Zt(r));
}
var er = Object.hasOwn || function(r, e) {
  return Qt.call(r, e);
};
function B(r, e) {
  return r === e || !r && !e && r !== r && e !== e;
}
var tr = "__v", rr = "__o", nr = "_owner", Ie = Object.getOwnPropertyDescriptor, xe = Object.keys;
function ir(r, e, t) {
  var n = r.length;
  if (e.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!t.equals(r[n], e[n], n, n, r, e, t))
      return !1;
  return !0;
}
function sr(r, e) {
  return B(r.getTime(), e.getTime());
}
function or(r, e) {
  return r.name === e.name && r.message === e.message && r.cause === e.cause && r.stack === e.stack;
}
function ar(r, e) {
  return r === e;
}
function Ee(r, e, t) {
  var n = r.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var i = new Array(n), s = r.entries(), o, a, c = 0; (o = s.next()) && !o.done; ) {
    for (var l = e.entries(), u = !1, h = 0; (a = l.next()) && !a.done; ) {
      if (i[h]) {
        h++;
        continue;
      }
      var p = o.value, d = a.value;
      if (t.equals(p[0], d[0], c, h, r, e, t) && t.equals(p[1], d[1], p[0], d[0], r, e, t)) {
        u = i[h] = !0;
        break;
      }
      h++;
    }
    if (!u)
      return !1;
    c++;
  }
  return !0;
}
var cr = B;
function lr(r, e, t) {
  var n = xe(r), i = n.length;
  if (xe(e).length !== i)
    return !1;
  for (; i-- > 0; )
    if (!Ge(r, e, t, n[i]))
      return !1;
  return !0;
}
function J(r, e, t) {
  var n = Ne(r), i = n.length;
  if (Ne(e).length !== i)
    return !1;
  for (var s, o, a; i-- > 0; )
    if (s = n[i], !Ge(r, e, t, s) || (o = Ie(r, s), a = Ie(e, s), (o || a) && (!o || !a || o.configurable !== a.configurable || o.enumerable !== a.enumerable || o.writable !== a.writable)))
      return !1;
  return !0;
}
function ur(r, e) {
  return B(r.valueOf(), e.valueOf());
}
function fr(r, e) {
  return r.source === e.source && r.flags === e.flags;
}
function Se(r, e, t) {
  var n = r.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var i = new Array(n), s = r.values(), o, a; (o = s.next()) && !o.done; ) {
    for (var c = e.values(), l = !1, u = 0; (a = c.next()) && !a.done; ) {
      if (!i[u] && t.equals(o.value, a.value, o.value, a.value, r, e, t)) {
        l = i[u] = !0;
        break;
      }
      u++;
    }
    if (!l)
      return !1;
  }
  return !0;
}
function pr(r, e) {
  var t = r.length;
  if (e.length !== t)
    return !1;
  for (; t-- > 0; )
    if (r[t] !== e[t])
      return !1;
  return !0;
}
function hr(r, e) {
  return r.hostname === e.hostname && r.pathname === e.pathname && r.protocol === e.protocol && r.port === e.port && r.hash === e.hash && r.username === e.username && r.password === e.password;
}
function Ge(r, e, t, n) {
  return (n === nr || n === rr || n === tr) && (r.$$typeof || e.$$typeof) ? !0 : er(e, n) && t.equals(r[n], e[n], n, n, r, e, t);
}
var dr = "[object Arguments]", mr = "[object Boolean]", gr = "[object Date]", yr = "[object Error]", br = "[object Map]", vr = "[object Number]", kr = "[object Object]", wr = "[object RegExp]", Nr = "[object Set]", Ir = "[object String]", xr = "[object URL]", Er = Array.isArray, Ae = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, Me = Object.assign, Sr = Object.prototype.toString.call.bind(Object.prototype.toString);
function Ar(r) {
  var e = r.areArraysEqual, t = r.areDatesEqual, n = r.areErrorsEqual, i = r.areFunctionsEqual, s = r.areMapsEqual, o = r.areNumbersEqual, a = r.areObjectsEqual, c = r.arePrimitiveWrappersEqual, l = r.areRegExpsEqual, u = r.areSetsEqual, h = r.areTypedArraysEqual, p = r.areUrlsEqual;
  return function(f, m, b) {
    if (f === m)
      return !0;
    if (f == null || m == null)
      return !1;
    var E = typeof f;
    if (E !== typeof m)
      return !1;
    if (E !== "object")
      return E === "number" ? o(f, m, b) : E === "function" ? i(f, m, b) : !1;
    var w = f.constructor;
    if (w !== m.constructor)
      return !1;
    if (w === Object)
      return a(f, m, b);
    if (Er(f))
      return e(f, m, b);
    if (Ae != null && Ae(f))
      return h(f, m, b);
    if (w === Date)
      return t(f, m, b);
    if (w === RegExp)
      return l(f, m, b);
    if (w === Map)
      return s(f, m, b);
    if (w === Set)
      return u(f, m, b);
    var S = Sr(f);
    return S === gr ? t(f, m, b) : S === wr ? l(f, m, b) : S === br ? s(f, m, b) : S === Nr ? u(f, m, b) : S === kr ? typeof f.then != "function" && typeof m.then != "function" && a(f, m, b) : S === xr ? p(f, m, b) : S === yr ? n(f, m, b) : S === dr ? a(f, m, b) : S === mr || S === vr || S === Ir ? c(f, m, b) : !1;
  };
}
function Mr(r) {
  var e = r.circular, t = r.createCustomConfig, n = r.strict, i = {
    areArraysEqual: n ? J : ir,
    areDatesEqual: sr,
    areErrorsEqual: or,
    areFunctionsEqual: ar,
    areMapsEqual: n ? we(Ee, J) : Ee,
    areNumbersEqual: cr,
    areObjectsEqual: n ? J : lr,
    arePrimitiveWrappersEqual: ur,
    areRegExpsEqual: fr,
    areSetsEqual: n ? we(Se, J) : Se,
    areTypedArraysEqual: n ? J : pr,
    areUrlsEqual: hr
  };
  if (t && (i = Me({}, i, t(i))), e) {
    var s = Y(i.areArraysEqual), o = Y(i.areMapsEqual), a = Y(i.areObjectsEqual), c = Y(i.areSetsEqual);
    i = Me({}, i, {
      areArraysEqual: s,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: c
    });
  }
  return i;
}
function Tr(r) {
  return function(e, t, n, i, s, o, a) {
    return r(e, t, a);
  };
}
function Or(r) {
  var e = r.circular, t = r.comparator, n = r.createState, i = r.equals, s = r.strict;
  if (n)
    return function(c, l) {
      var u = n(), h = u.cache, p = h === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : h, d = u.meta;
      return t(c, l, {
        cache: p,
        equals: i,
        meta: d,
        strict: s
      });
    };
  if (e)
    return function(c, l) {
      return t(c, l, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: i,
        meta: void 0,
        strict: s
      });
    };
  var o = {
    cache: void 0,
    equals: i,
    meta: void 0,
    strict: s
  };
  return function(c, l) {
    return t(c, l, o);
  };
}
var Pr = C();
C({ strict: !0 });
C({ circular: !0 });
C({
  circular: !0,
  strict: !0
});
C({
  createInternalComparator: function() {
    return B;
  }
});
C({
  strict: !0,
  createInternalComparator: function() {
    return B;
  }
});
C({
  circular: !0,
  createInternalComparator: function() {
    return B;
  }
});
C({
  circular: !0,
  createInternalComparator: function() {
    return B;
  },
  strict: !0
});
function C(r) {
  r === void 0 && (r = {});
  var e = r.circular, t = e === void 0 ? !1 : e, n = r.createInternalComparator, i = r.createState, s = r.strict, o = s === void 0 ? !1 : s, a = Mr(r), c = Ar(a), l = n ? n(c) : Tr(c);
  return Or({ circular: t, comparator: c, createState: i, equals: l, strict: o });
}
function ee(r, e) {
  return Pr(r, e);
}
function Cr(r, e) {
  if (typeof r != typeof e) return !1;
  if (!r && !e) return !0;
  if (Array.isArray(r)) {
    const s = e, o = r;
    return s.length === 0 ? !0 : s.every((a) => o.includes(a));
  }
  if (typeof r != "object")
    return ee(r, e);
  const t = e, n = r;
  let i = !0;
  return Object.keys(t).forEach((s) => {
    i && (Object.hasOwn(n, s) && Cr(n[s], t[s]) || (i = !1));
  }), i;
}
function Te(r, e, t) {
  return JSON.stringify(r, (i, s) => {
    let o = s;
    return e && (o = e(i, o)), o === void 0 && (o = null), o;
  }, t);
}
function $r(r, e) {
  function t(i) {
    return Object.keys(i).forEach((s) => {
      i[s] === null ? i[s] = void 0 : typeof i[s] == "object" && (i[s] = t(i[s]));
    }), i;
  }
  const n = JSON.parse(r, e);
  if (n !== null)
    return typeof n == "object" ? t(n) : n;
}
function _n(r) {
  try {
    const e = Te(r);
    return e === Te($r(e));
  } catch {
    return !1;
  }
}
const Xn = (r) => r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function Hn() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0].replace(/@posix$/i, "") : new ct().resolvedOptions().locale;
}
function Yn(r, e = 2) {
  if (r === 0) return "0 Bytes";
  const t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], n = Math.floor(Math.log(r) / Math.log(1024)), i = t[n];
  return `${new gt("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(r / 1024 ** n)} ${i}`;
}
const jr = 1e3, _e = 60, Xe = _e * 60, Ur = Xe * 24;
function Wn(r, e, t = /* @__PURE__ */ new Date()) {
  const n = Math.floor((e.getTime() - t.getTime()) / jr), i = Math.round(n / Ur);
  if (Math.abs(i) >= 1) return r.format(i, "day");
  const s = Math.round(n / Xe);
  if (Math.abs(s) >= 1) return r.format(s, "hour");
  const o = Math.round(n / _e);
  return Math.abs(o) >= 1 ? r.format(o, "minute") : r.format(n, "second");
}
function Zn(r, e, t, n, i = {
  year: "numeric",
  month: "short",
  day: "numeric"
}) {
  const s = /* @__PURE__ */ new Date(), o = new Date(s);
  o.setDate(o.getDate() - 1);
  const a = r.getDate() === s.getDate() && r.getMonth() === s.getMonth() && r.getFullYear() === s.getFullYear(), c = r.getDate() === o.getDate() && r.getMonth() === o.getMonth() && r.getFullYear() === o.getFullYear();
  return a ? e : c ? t : r.toLocaleString(n, i);
}
const Qn = /* @__PURE__ */ new Set([
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
]), se = {
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
function Z(r) {
  r && Object.values(r).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && Z(e.properties);
    }
  });
}
Z(se);
const Br = {
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
  $defs: se
};
Object.freeze(Br);
const Dr = {
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
  $defs: se
};
Object.freeze(Dr);
const He = {
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
Z(He);
const Rr = {
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
  $defs: He
};
Object.freeze(Rr);
const Vr = {
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
Object.freeze(Vr);
const Ye = {
  themeCssVariables: {
    description: "Theme colors and other CSS variable properties that adjust the looks of the application. These are applied in CSS properties using `hsl(var(--variableName))` or Tailwind classes like `tw-bg-primary`\n\nSee the wiki's [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme) section for more information.",
    type: "object",
    properties: {
      background: { type: "string" },
      foreground: { type: "string" },
      card: { type: "string" },
      "card-foreground": { type: "string" },
      popover: { type: "string" },
      "popover-foreground": { type: "string" },
      primary: { type: "string" },
      "primary-foreground": { type: "string" },
      secondary: { type: "string" },
      "secondary-foreground": { type: "string" },
      muted: { type: "string" },
      "muted-foreground": { type: "string" },
      accent: { type: "string" },
      "accent-foreground": { type: "string" },
      destructive: { type: "string" },
      "destructive-foreground": { type: "string" },
      border: { type: "string" },
      input: { type: "string" },
      ring: { type: "string" },
      "sidebar-background": { type: "string" },
      "sidebar-foreground": { type: "string" },
      "sidebar-primary": { type: "string" },
      "sidebar-primary-foreground": { type: "string" },
      "sidebar-accent": { type: "string" },
      "sidebar-accent-foreground": { type: "string" },
      "sidebar-border": { type: "string" },
      "sidebar-ring": { type: "string" },
      radius: { type: "string" }
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
Z(Ye);
const qr = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: Ye
};
Object.freeze(qr);
const Lr = "theme-styles";
function Fr(r, e) {
  return `${r ? `${r}-` : ""}${e}`;
}
function ei(r, e) {
  return Object.fromEntries(
    Object.entries(r).map(([n, i]) => [
      n,
      i ? Object.fromEntries(
        Object.entries(i).map(([s, o]) => {
          var a;
          return [
            s,
            o ? {
              ...o,
              // Add the derived properties
              themeFamilyId: n,
              type: s,
              id: Fr(n, s),
              cssVariables: {
                // Fill in the default css variables
                ...(a = e == null ? void 0 : e[s]) == null ? void 0 : a.cssVariables,
                ...o.cssVariables
              }
            } : void 0
          ];
        }).filter(([, s]) => !!s)
      ) : void 0
    ]).filter(([, n]) => !!n)
  );
}
function Jr(r) {
  return `
.${r.id} {
${Object.entries(r.cssVariables).map(([e, t]) => `  --${e}: ${t};`).join(`
`)}
}
`;
}
function ti(r, e, t) {
  const n = e == null ? void 0 : e.dataset.themeId;
  n && this.document.body.classList.remove(n), this.document.body.classList.add(r.id), e && this.document.head.removeChild(e);
  const i = this.document.createElement("style");
  return i.id = `${Lr}${t ? `-${t}` : ""}`, i.dataset.themeId = r.id, i.textContent = Jr(r), this.document.head.appendChild(i), i;
}
function We(r) {
  return Object.freeze(r), r == null || Object.getOwnPropertyNames(r).forEach(function(t) {
    // Need to make sure to avoid null, which is an object type
    // eslint-disable-next-line no-null/no-null
    r[t] !== null && (typeof r[t] == "object" || typeof r[t] == "function") && !Object.isFrozen(r[t]) && We(r[t]);
  }), r;
}
const te = We({
  version: "3.0.7",
  schemaRepo: "https://github.com/ubsicap/usx.git",
  schemaCommit: "6c490bb5675d281b0fa01876fe67f6e3fd50a4ce",
  markersMapVersion: "1.0.0",
  usfmToolsCommit: "6c7bb8d75eda47893296a635c1e6e0b67165ac7f",
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
}), ri = Object.freeze({
  ...te,
  isSpaceAfterAttributeMarkersContent: !0,
  shouldOptionalClosingMarkersBePresent: !0
}), z = ["figure", "note", "sidebar", "table"];
Object.freeze(z);
const zr = /\u00A0/g, Kr = /\w+(\d+)/, Gr = /(\d+)-?(\d+)?/;
class g {
  constructor(e, t) {
    y(this, "usj");
    y(this, "markersMap");
    y(this, "shouldAllowInvisibleCharacters");
    // Cached properties
    y(this, "parentMapInternal");
    y(this, "fragmentsByIndexInUsfmInternal");
    y(this, "fragmentsByJsonPathInternal");
    y(this, "indicesInUsfmByVerseRefInternal");
    y(this, "usfmInternal");
    this.usj = e;
    const { markersMap: n, shouldAllowInvisibleCharacters: i } = t ?? {};
    if (n)
      this.markersMap = n, g.areUsjVersionsCompatible(this.usj.version, this.markersMap.version) || console.warn(
        `Warning: USJ provided has version ${this.usj.version}, but provided markers map has version ${this.markersMap.version}. This may cause unexpected issues when transforming between formats.
USJ: ${JSON.stringify(
          this.usj
        )}`
      );
    else if (g.areUsjVersionsCompatible(this.usj.version, te.version))
      this.markersMap = te;
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
    const t = L({ path: e, json: this.usj, wrap: !0 });
    if (t === void 0 || t.length === 0) return;
    if (!Array.isArray(t[0])) return t[0];
    const n = L({ path: e, json: this.usj, wrap: !1 });
    return n.length === 1 && Array.isArray(n[0]) ? n[0] : n;
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
    return typeof e == "object" && e.type === Oe && t.length === 0;
  }
  /**
   * Determine if a fragment is a marker, not a text content string or some kind of position
   * fragment that isn't actually a marker e.g. closing marker fragment
   */
  static isFragmentAMarker(e) {
    return !N(e) && !("forMarker" in e);
  }
  // #endregion marker helper methods
  // #region Parent Maps
  static createParentMapInternal(e, t, n) {
    var i;
    n.set(e, t), e.content && n.set(e.content, e), (i = e.content) == null || i.forEach((s) => {
      typeof s == "object" && g.createParentMapInternal(s, e, n);
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
    const t = [], { parentMap: n } = this;
    let i = e, s = n.get(i);
    for (; s !== void 0; ) {
      if (!s.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !s.content.find((o, a) => {
          if (o !== i) return !1;
          if (!s) throw new Error('undefined "tempParent" should not be possible');
          return t.unshift({ parent: s, index: a }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(i)}`);
      i = s, s = n.get(s);
    }
    return t;
  }
  /**
   * Transform a JSONPath array (`JSONPath.toPathArray`) to a "normalized" JSONPath. We can use this
   * JSONPath for lookups in {@link FragmentsByJsonPath}
   */
  static jsonPathArrayToJsonPath(e) {
    return e.reduce((t, n) => n === "content" ? `${t}.${n}` : Number.isNaN(parseInt(n, 10)) ? `${t}['${n}']` : `${t}[${n}]`);
  }
  /** "Normalize" the JSONPath passed in so we can use it for lookups in {@link FragmentsByJsonPath} */
  static normalizeJsonPath(e) {
    const t = L.toPathArray(e);
    return g.jsonPathArrayToJsonPath(t);
  }
  /**
   * Returns a "normalized" JSONPath transformed from the working stack. We can use this JSONPath
   * for lookups in {@link FragmentsByJsonPath}
   */
  static convertWorkingStackToJsonPath(e) {
    let t = "$";
    return e.forEach((n) => {
      t = `${t}.content[${n.index}]`;
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
    const n = e.match(/content\[(\d+)\]/g);
    if (!n) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let i = this.usj;
    return n.forEach((s, o) => {
      const a = /(\d+)/.exec(s);
      if (!a) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const c = parseInt(a[0], 10);
      if (t.push({ parent: i, index: c }), o + 1 < n.length) {
        if (typeof i == "string" || !i.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(i)}`);
        const l = i.content[c];
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
    return Yt((e = this.usj) == null ? void 0 : e.content);
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
  static findNextMatchingNodeOrClosingFragmentUsingWorkingStack(e, t, n, i) {
    var a;
    let s = e;
    const o = t.length === 0 ? e : t[0].parent;
    if (!N(o)) {
      if (n.includes(o.type)) return;
      let c;
      t.some((l) => {
        const u = l.parent.content[l.index];
        return !N(u) && n.includes(u.type) ? (c = u, !0) : !1;
      }), c && (s = c);
    }
    for (; s !== void 0; ) {
      const c = typeof s == "object" && n.includes(s.type);
      if (!c && i(s, t)) return s;
      if (!c && typeof s == "object" && (((a = s.content) == null ? void 0 : a.length) ?? 0) > 0)
        t.push({ parent: s, index: 0 }), [s] = s.content;
      else {
        if (!c) {
          const l = typeof s == "object" ? { isClosingMarker: !0, forMarker: s } : void 0;
          if (l && i(l, t))
            return l;
        }
        for (s = void 0; t.length > 0; ) {
          const l = t.pop();
          if (l)
            if (l.index + 1 < l.parent.content.length) {
              l.index += 1, t.push(l), s = l.parent.content[l.index];
              break;
            } else {
              const u = {
                isClosingMarker: !0,
                forMarker: l.parent
              };
              if (i(u, t)) return u;
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
  static findNextMatchingNodeUsingWorkingStack(e, t, n, i) {
    return this.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      e,
      t,
      n,
      (o, a) => typeof o == "object" && "isClosingMarker" in o ? !1 : i(o, a)
    );
  }
  // #endregion Walk the node tree
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return g.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion Node -> JSONPath
  // #region USJ node -> SerializedVerseRef + offset in USFM
  nodeToUsfmVerseRefVerseLocation(e, t, n) {
    const { documentLocation: i } = this.nodeToUsjNodeAndDocumentLocation(
      e,
      t
    );
    return this.usjDocumentLocationToUsfmVerseRefVerseLocation(i, n);
  }
  // #endregion USJ node -> SerializedVerseRef + offset in USFM
  // #region USJ node -> USJ location
  nodeToUsjNodeAndDocumentLocation(e, t) {
    var s;
    let n;
    if (N(e)) {
      if (t === void 0)
        throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
      const o = Array.isArray(t) ? this.parentMap.get(t) : t;
      if (o === void 0)
        throw new Error(`Cannot find parent for ${JSON.stringify(t)}`);
      n = this.createWorkingStack(o);
      const a = (s = o.content) == null ? void 0 : s.indexOf(e);
      if (a === void 0 || a < 0)
        throw new Error("Could not find index of node in parent for creating working stack");
      n.push({ parent: o, index: a });
    } else
      n = this.createWorkingStack(e);
    const i = g.convertNodeToUsjDocumentLocation(e, n);
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
    const n = N(t) ? this.findParent(e) : void 0;
    if (!n && N(t))
      throw new Error(`Could not determine parent for ${e}`);
    return {
      node: t,
      parent: n
    };
  }
  jsonPathToUsjNodeAndDocumentLocation(e) {
    const { node: t, parent: n } = this.jsonPathToNodeAndParentIfString(e);
    return this.nodeToUsjNodeAndDocumentLocation(t, n);
  }
  // #endregion JSONPath > USJ location
  // #region JSONPath or USJ location -> SerializedVerseRef + offset in USFM
  jsonPathToUsfmVerseRefVerseLocation(e, t) {
    const { node: n, parent: i } = this.jsonPathToNodeAndParentIfString(e);
    return this.nodeToUsfmVerseRefVerseLocation(n, i, t);
  }
  usjDocumentLocationToUsfmVerseRefVerseLocation(e, t) {
    const n = this.findFragmentInfoAtUsjDocumentLocation(e);
    if (n === void 0)
      throw new Error(
        `Could not find fragment info at USJ document location while transforming to USFM verse location: ${JSON.stringify(
          e
        )}`
      );
    const i = this.getVerseRefForIndexInUsfm(n.indexInUsfm, t), s = this.getIndexInUsfmForVerseRef(i);
    return {
      verseRef: i,
      // Final USFM verse offset is the fragment's location relative to the verse plus whatever
      // offset is in the USJ location
      offset: n.indexInUsfm - s + g.getOffsetInUsjDocumentLocation(e)
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
    const t = Object.keys(this.indicesInUsfmByVerseRef), n = t.length === 0 || t.length === 1 && t[0] === P, i = n ? P : e;
    if (!this.indicesInUsfmByVerseRef[i])
      throw new Error(
        `Book ID ${e} not found in USJ! ${n ? `There seems to be no USJ content because there is no content in ${P} either` : `Book IDs in USJ: ${JSON.stringify(t)}`}`
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
    const s = i[e.verseNum];
    if (s === void 0)
      throw new Error(`Verse ${e.verseNum} not found in ${t} ${e.chapterNum}`);
    return s;
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
    const n = Object.entries(this.indicesInUsfmByVerseRef);
    let i = 0, s, o = !1;
    for (; !o && i < n.length; ) {
      const [l, u] = n[i];
      if (u) {
        const h = Object.entries(u);
        let p = 0;
        for (; !o && p < h.length; ) {
          const [d, f] = h[p];
          if (f) {
            const m = Object.entries(f);
            let b = 0;
            for (; !o && b < m.length; ) {
              const [E, w] = m[b];
              if (w !== void 0) {
                if (e < w) {
                  if (!s)
                    throw new Error(
                      `Could not find verse ref for index in USFM ${e} less than the first known index ${w}`
                    );
                  o = !0;
                  break;
                }
                if (s = {
                  book: l,
                  chapterNum: parseInt(d, 10),
                  verseNum: parseInt(E, 10)
                }, e === w) {
                  o = !0;
                  break;
                }
              }
              b += 1;
            }
          }
          p += 1;
        }
      }
      i += 1;
    }
    if (!s)
      throw new Error(`Did not find any verse refs while looking for index in USFM ${e}`);
    if (s.book === P) {
      if (!t)
        throw new Error(
          `Could not find book ID and no book ID provided when finding USFM verse ref for index in USFM ${e}`
        );
      s.book = t;
    }
    const a = this.getIndexInUsfmForVerseRef(s), c = this.fragmentsByIndexInUsfm.get(a);
    return c && g.isFragmentAMarker(c.fragment) && c.fragment.type === O && c.fragment.number && c.fragment.number !== `${s.verseNum}` && (s.verse = c.fragment.number), s;
  }
  usfmVerseLocationToIndexInUsfm(e) {
    const { verseRef: t, offset: n } = g.usfmVerseLocationToUsfmVerseRefVerseLocation(e);
    if (n < 0) throw new Error("offset must be >= 0");
    return this.getIndexInUsfmForVerseRef(t) + n;
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
    const { verseRef: t, offset: n } = g.usfmVerseLocationToUsfmVerseRefVerseLocation(e), i = this.usfmVerseLocationToIndexInUsfm(e), { value: s } = this.fragmentsByIndexInUsfm.findClosestLessThanOrEqual(
      i
    ) ?? {
      value: void 0
    };
    if (!s)
      throw new Error(
        `Somehow, did not find anything at index in verse ${n} or below in ${t.book} ${t.chapterNum}:${t.verseNum}. Not sure how this would happen.`
      );
    const o = i - s.indexInUsfm;
    return {
      ...s.nodeAndDocumentLocation,
      documentLocation: g.moveUsjDocumentLocationToNewOffset(
        s.nodeAndDocumentLocation.documentLocation,
        o
      )
    };
  }
  usfmVerseLocationToUsjDocumentLocation(e) {
    return this.usfmVerseLocationToUsjNodeAndDocumentLocation(e).documentLocation;
  }
  static isUsjDocumentLocationForTextContent(e) {
    let t = e;
    if ("node" in e) {
      if (!N(e.node)) return !1;
      t = e.documentLocation;
    }
    return "offset" in t;
  }
  // #endregion UsjDocumentLocation utilities
  // #region Search for text from a certain point
  usfmVerseLocationToNextTextLocation(e) {
    const t = this.usfmVerseLocationToUsjNodeAndDocumentLocation(e), n = this.findNextLocationOfMatchingText(
      t,
      ""
    );
    if (!n)
      throw new Error(
        `Could not find next text location after verse ${JSON.stringify(e)} at location ${t.documentLocation.jsonPath}`
      );
    return n;
  }
  findNextLocationOfMatchingText(e, t, n = 1e3) {
    let i = "", s = 0, o = 0, a = -1;
    const c = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    ), l = c.length > 0 ? {
      ...c[c.length - 1]
    } : void 0;
    if (g.findNextMatchingNodeUsingWorkingStack(
      e.node,
      c,
      z,
      (d, f) => {
        if (typeof d != "string") return !1;
        let m = d;
        const b = f[f.length - 1];
        if (l && g.areStackItemsShallowEqual(b, l)) {
          if (!("offset" in e.documentLocation))
            throw new Error(
              `Somehow 'offset' was not in text content string document location. This should not happen. ${JSON.stringify(e.documentLocation)}`
            );
          m = d.substring(e.documentLocation.offset), o += e.documentLocation.offset;
        }
        s += m.length, i = `${i}${m}`;
        const E = i.indexOf(t);
        return E < 0 ? (o += i.length, i.length > t.length && (i = i.substring(i.length - t.length)), o -= i.length, s > n) : (a = o + E, !0);
      }
    ), a < 0) return;
    s = 0;
    let u = 0, h = [];
    const p = g.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      z,
      (d, f) => typeof d != "string" || (s += d.length, s < a + 1) ? !1 : (u = a - s + d.length, h = f, !0)
    );
    if (!p) throw new Error("Internal error: inconsistent search results");
    if (!N(p))
      throw new Error(
        `Somehow found non-string node while searching for strings: ${JSON.stringify(p)}`
      );
    return {
      node: p,
      documentLocation: {
        jsonPath: g.convertWorkingStackToJsonPath(h),
        offset: u
      }
    };
  }
  search(e) {
    const t = [];
    if (this.usj.content.length === 0) return t;
    const n = {
      node: this.usj,
      documentLocation: {
        jsonPath: "$"
      }
    }, i = [], s = new le();
    let o = 0, a = n.node;
    for (; a !== void 0; )
      a = g.findNextMatchingNodeUsingWorkingStack(
        n.node,
        this.convertJsonPathToWorkingStack(n.documentLocation.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (u, h) => (typeof u != "string" || (i.push(u), s.set(o, {
          node: u,
          documentLocation: {
            offset: 0,
            jsonPath: g.convertWorkingStackToJsonPath(h)
          }
        }), o += u.length), !1)
      );
    const c = i.join("");
    let l = e.exec(c);
    for (; l; ) {
      if (l[0].length > 0) {
        if (l.index < 0 || l.index >= c.length)
          throw new Error(`Match index out of bounds: ${l.index}`);
        const u = s.findClosestLessThanOrEqual(l.index);
        if (!u)
          throw new Error(`Internal error: no starting node found for index ${l.index}`);
        const h = {
          node: u.value.node,
          documentLocation: {
            jsonPath: u.value.documentLocation.jsonPath,
            offset: l.index - u.key
          }
        }, p = s.findClosestLessThanOrEqual(
          l.index + l[0].length - 1
        );
        if (!p)
          throw new Error(`Internal error: no ending node found for index ${l.index}`);
        const d = {
          node: p.value.node,
          documentLocation: {
            jsonPath: p.value.documentLocation.jsonPath,
            offset: l.index + l[0].length - p.key
          }
        };
        t.push({ text: l[0], start: h, end: d });
      }
      if (!e.global) break;
      l = e.exec(c);
    }
    return t;
  }
  // #endregion Search for text from a certain point
  // #region Extract text from a node + JSONPath + offset
  extractText(e, t) {
    let n = "", i = "offset" in e.documentLocation ? e.documentLocation.offset : 0, s = 0;
    return g.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      z,
      (o) => {
        if (typeof o != "string") return !1;
        if (i >= o.length)
          return i -= o.length, !1;
        let a = o;
        if (i > 0 && (a = a.substring(i), i = 0), s + a.length < t)
          return s += a.length, n = `${n}${a}`, !1;
        const c = t - s;
        return n = `${n}${a.substring(0, c - 1)}`, !0;
      }
    ), n;
  }
  extractTextBetweenPoints(e, t, n = 100) {
    let i = "";
    return g.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      z,
      (s, o) => s === t.node && (typeof s == "object" || t.documentLocation.jsonPath === g.convertWorkingStackToJsonPath(o)) ? !0 : typeof s != "string" ? !1 : (i = `${i}${s}`, i.length > n && (i = i.substring(0, n)), i.length >= n)
    ), i;
  }
  // #endregion Extract text from a node + JSONPath + offset
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, t) {
    let n = 0;
    for (let i = e.length - 1; i >= 0; i--) {
      const s = e[i];
      t(s) ? (e.splice(i, 1), n += 1) : typeof s != "string" && s.content && (n += this.removeContentNodesFromArray(s.content, t));
    }
    return n;
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
      ([n]) => new RegExp(n).test(e)
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
    const n = N(e) ? e : (
      // Usj type has no `marker` property, but the Usj marker isn't really different than any other
      // marker with no `marker` property. It is appropriate to treat them the same to get the name
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      e.marker ?? e.type
    );
    let i = !1, s = this.getMarkerInfo(n);
    const o = (s == null ? void 0 : s.type) ?? (N(e) ? "" : e.type);
    let a = n;
    if (s != null && s.markerUsfm && (a = s.markerUsfm, s = this.getMarkerInfo(a)), !s) {
      if (N(e))
        throw new Error(`Unknown marker ${n} and no marker type provided`);
      s = { type: e.type }, i = !0, console.warn(
        `Unknown marker ${n}. Creating MarkerInfo to use: ${JSON.stringify(s)}`
      );
    }
    let c = s.type, l = this.markersMap.markerTypes[c];
    if (l != null && l.markerTypeUsfm && (c = l.markerTypeUsfm, l = this.markersMap.markerTypes[c]), !N(e) && e.type !== o && (!l || e.type !== l.markerTypeUsfm && e.type !== l.markerTypeUsx && e.type !== l.markerTypeUsj) && (console.warn(
      `Warning: Mismatching marker type in the USJ content ${e.type} vs marker type in the marker info ${s.type} for marker ${n}. Using the type from the USJ content.`
    ), c = e.type, l = this.markersMap.markerTypes[c], i = !0), !l)
      throw new Error(
        `Unknown marker type ${c} on marker ${n}! Cannot proceed.`
      );
    i && c === "para" && (l = { ...l, hasNewlineBefore: !1 });
    const u = [];
    s.attributeMarkers && s.attributeMarkers.forEach((p) => {
      const d = this.getMarkerInfo(p);
      d && "attributeMarkerAttributeName" in d && u.push([p, d]);
    });
    const h = e;
    if (t === "usfm" && c === "cell" && h.colspan) {
      const p = parseInt(h.colspan, 10), d = Kr.exec(n);
      if (d != null && d[1]) {
        const f = parseInt(d[1], 10);
        !Number.isNaN(f) && !Number.isNaN(p) && (a = `${n}-${f + p - 1}`, l = {
          ...l,
          skipOutputAttributeToUsfm: [
            ...l.skipOutputAttributeToUsfm ?? [],
            "colspan"
          ]
        });
      }
    }
    return {
      markerNameOriginal: n,
      markerName: a,
      markerInfo: s,
      markerType: c,
      markerTypeInfo: l,
      attributeMarkerInfoEntries: u
    };
  }
  /** Converts the text content of a marker to its equivalent in USFM */
  textContentToUsfm(e) {
    return {
      usfm: this.shouldAllowInvisibleCharacters ? e : e.replace(zr, "~"),
      fragmentsInfo: [{ fragment: e, indexInUsfm: 0 }]
    };
  }
  /**
   * Merge an independent array of fragment info into an existing array of fragment info, offsetting
   * the indices of the new fragments so their locations start from the end of the string
   */
  static mergeFragmentsInfoIntoExistingArray(e, t, n) {
    e.forEach((i) => {
      const s = n + i.indexInUsfm;
      t.push({
        ...i,
        indexInUsfm: s
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
    let n = "";
    const i = [], { markerName: s, markerInfo: o, markerType: a, markerTypeInfo: c, attributeMarkerInfoEntries: l } = this.getInfoForMarker(e), u = e;
    c.hasNewlineBefore && (n += `
`);
    const h = t ? c.nestedPrefix ?? "" : "";
    return i.push({ fragment: e, indexInUsfm: n.length }), n += a === "optbreak" ? "//" : `\\${h}`, a !== "optbreak" && (i.push({
      fragment: { attributeValueForKey: "marker", forMarker: e },
      indexInUsfm: n.length
    }), n += `${s}${a === "unmatched" ? "" : " "}`), o.leadingAttributes && o.leadingAttributes.forEach((p) => {
      const d = u[p];
      d && (i.push({
        fragment: { attributeValueForKey: p, forMarker: e },
        indexInUsfm: n.length
      }), n += `${d} `);
    }), o.textContentAttribute && u[o.textContentAttribute] && (i.push({
      fragment: { attributeValueForKey: o.textContentAttribute, forMarker: e },
      indexInUsfm: n.length
    }), n += `${u[o.textContentAttribute]} `), o.attributeMarkers && l.forEach(([p, d]) => {
      const f = u[d.attributeMarkerAttributeName];
      if (!f) return;
      const m = {
        type: d.type,
        marker: p,
        content: [f]
      }, b = [];
      n = this.addMarkerUsfmToString(
        n,
        m,
        e,
        b
      );
      const { usfm: E } = this.textContentToUsfm(f);
      i.push({
        fragment: {
          attributeValueForKey: d.attributeMarkerAttributeName,
          forMarker: e
        },
        indexInUsfm: n.length
      }), n += E, n = this.addMarkerUsfmToString(
        n,
        {
          isClosingMarker: !0,
          forMarker: m
        },
        e,
        b
      ), b.forEach((w) => {
        if (N(w.fragment) || "attributeKey" in w.fragment)
          throw new Error(
            `Attribute marker opening or closing markers generated a text content fragment or an attribute key fragment! This does not make sense. ${JSON.stringify(w)}`
          );
        if (g.isFragmentAMarker(w.fragment)) {
          i.push({
            ...w,
            fragment: {
              attributeMarker: d.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("attributeValueForKey" in w.fragment) {
          if (w.fragment.attributeValueForKey !== "marker")
            throw new Error(
              `Attribute marker opening or closing markers generated an attribute value fragment for a key that was not marker! This does not make sense. ${JSON.stringify(w)}`
            );
          i.push({
            ...w,
            fragment: {
              attributeKey: d.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("isClosingMarker" in w.fragment) {
          const { isClosingMarker: S, ...D } = w.fragment, Ze = {
            ...D,
            forMarker: e,
            attributeMarkerClosingMarker: d.attributeMarkerAttributeName
          };
          i.push({
            ...w,
            fragment: Ze
          });
          return;
        }
        throw new Error(
          `Attribute marker opening or closing markers generated an unrecognized fragment: ${JSON.stringify(w)}`
        );
      }), !this.markersMap.isSpaceAfterAttributeMarkersContent && d.hasStructuralSpaceAfterCloseAttributeMarker && (n += " ");
    }), { usfm: n, fragmentsInfo: i };
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
      markerNameOriginal: n,
      markerName: i,
      markerInfo: s,
      markerType: o,
      markerTypeInfo: a,
      attributeMarkerInfoEntries: c
    } = this.getInfoForMarker(e), l = Object.keys(e).filter((f) => {
      var m, b;
      return !(f === "type" || f === "marker" || f === "content" || f === "closed" || (m = a.skipOutputAttributeToUsfm) != null && m.includes(f) || (b = s.leadingAttributes) != null && b.includes(f) || s.textContentAttribute === f || c.some(
        ([, E]) => E.attributeMarkerAttributeName === f
      ));
    }), u = e;
    if (a.isCloseable && s.independentClosingMarkers && s.independentClosingMarkers.length > 0)
      throw new Error(
        `Marker ${i} is intended to have a normal closing marker and independent closing markers. As of writing this code, there is no known syntax for this situation in USFM. Cannot proceed.`
      );
    let h = !0;
    if ((u.closed === "false" || s.isClosingMarkerOptional && !this.markersMap.shouldOptionalClosingMarkersBePresent && u.closed !== "true") && (h = !1), s.independentClosingMarkers && s.independentClosingMarkers.length > 0 && h) {
      const f = {
        type: o,
        marker: s.independentClosingMarkers[0],
        // Put all the closing marker attributes on here since we don't really have a better place
        // to put them and might as well
        ...Object.fromEntries(
          l.map((D) => [
            D,
            u[D]
          ])
        )
      };
      let m = "";
      const b = [], { usfm: E, fragmentsInfo: w } = this.openingMarkerToUsfm(f, t), S = w.find((D) => g.isFragmentAMarker(D.fragment));
      if (!S)
        throw new Error(
          `Could not find opening fragment info for independent closing marker ${JSON.stringify(
            f
          )}. Fragments info generated: ${JSON.stringify(w)}`
        );
      return b.push({
        ...S,
        fragment: { isClosingMarker: !0, forMarker: e }
      }), m += E, n !== f.marker && (m = this.addMarkerUsfmToString(
        m,
        {
          isClosingMarker: !0,
          forMarker: f
        },
        t
      )), { usfm: m, fragmentsInfo: b };
    }
    let p = "";
    const d = [];
    if (l.length > 0 && (p += "|", l.length === 1 && l[0] === s.defaultAttribute ? (d.push({
      fragment: { attributeValueForKey: s.defaultAttribute, forMarker: e },
      indexInUsfm: p.length
    }), p += u[s.defaultAttribute]) : l.forEach((f, m) => {
      const b = o === "figure" && f === "file" ? "src" : f;
      m > 0 && (p += " "), d.push({
        fragment: { attributeKey: f, forMarker: e },
        indexInUsfm: p.length
      }), p += `${b}="`, d.push({
        fragment: { attributeValueForKey: f, forMarker: e },
        indexInUsfm: p.length
      }), p += `${u[f]}"`;
    })), a.isCloseable && h) {
      const f = a.isClosingMarkerEmpty ? "" : i, m = t ? a.nestedPrefix ?? "" : "";
      d.push({
        fragment: { isClosingMarker: !0, forMarker: e },
        indexInUsfm: p.length
      }), p += `\\${m}${f}*`;
    }
    return { usfm: p, fragmentsInfo: d };
  }
  /**
   * Determines whether this marker and all its content should be skipped entirely when outputting
   * to USFM
   *
   * @param marker Marker to check
   * @returns `true` if this marker should be skipped; `false` otherwise
   */
  shouldSkipOutputMarkerToUsfm(e) {
    var n;
    const { markerTypeInfo: t } = this.getInfoForMarker(e);
    return !!(t.skipOutputMarkerToUsfm || (n = t.skipOutputMarkerToUsfmIfAttributeIsPresent) != null && n.some(
      (i) => i in e
    ));
  }
  /** Removes one space at the end of the string if present */
  static removeEndSpace(e) {
    return e.at(-1) !== " " ? e : e.slice(0, -1);
  }
  addMarkerUsfmToString(e, t, n, i) {
    let s = e, o, a;
    const { markerNameOriginal: c, markerType: l, markerTypeInfo: u } = this.getInfoForMarker(
      "isClosingMarker" in t ? t.forMarker : t
    );
    let h = !1;
    if (typeof n == "boolean")
      h = n;
    else if (n) {
      const { markerType: p } = this.getInfoForMarker(
        n
      );
      p === l && (h = !0);
    }
    if ("isClosingMarker" in t) {
      const { usfm: p, fragmentsInfo: d } = this.closingMarkerToUsfm(
        t.forMarker,
        h
      );
      a = d, o = p, u.isCloseable && u.isClosingMarkerEmpty && // No contents
      (!t.forMarker.content || t.forMarker.content.length === 0) && // No closing marker attributes
      !o.startsWith("|") && (s = g.removeEndSpace(s));
    } else {
      const { usfm: p, fragmentsInfo: d } = this.openingMarkerToUsfm(
        t,
        h
      );
      a = d, o = p;
    }
    if (o.startsWith(`
`) && (s.length === 0 ? (a = a.map((p) => ({
      ...p,
      indexInUsfm: p.indexInUsfm - 1
    })), o = o.substring(1)) : s = g.removeEndSpace(s)), this.markersMap.isSpaceAfterAttributeMarkersContent && c === "ca") {
      const p = s.lastIndexOf("\\");
      p >= 0 && e.substring(
        p + 1,
        p + 3
      ) === "c " && (s = g.removeEndSpace(s), s += `
 `);
    }
    return i && g.mergeFragmentsInfoIntoExistingArray(
      a,
      i,
      s.length
    ), s += o, s;
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
    const n = { ...e };
    return "offset" in n ? n.offset = t : "closingMarkerOffset" in n ? n.closingMarkerOffset = t : "propertyOffset" in n ? n.propertyOffset = t : "keyOffset" in n ? n.keyOffset = t : "keyClosingMarkerOffset" in n && (n.keyClosingMarkerOffset = t), n;
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
  static areUsjDocumentLocationsEqual(e, t, n = !1) {
    const { jsonPath: i, ...s } = e, { jsonPath: o, ...a } = t;
    return !n && !ee(L.toPathArray(i), L.toPathArray(o)) ? !1 : ee(s, a);
  }
  /** Find the fragment info corresponding to the specified USJ Document location. */
  findFragmentInfoAtUsjDocumentLocation(e) {
    const t = g.moveUsjDocumentLocationToNewOffset(e, 0);
    let n;
    const i = this.fragmentsByJsonPath.get(
      g.normalizeJsonPath(e.jsonPath)
    );
    if (i)
      return i.find((s) => g.areUsjDocumentLocationsEqual(
        s.nodeAndDocumentLocation.documentLocation,
        t,
        // We already compared the JSONPaths by looking in the map for this JSONPath
        !0
      ) ? (n = s, !0) : !1), n;
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
  static convertNodeToUsjDocumentLocation(e, t, n = 0) {
    const i = g.convertWorkingStackToJsonPath(t);
    return N(e) ? { jsonPath: i, offset: n } : { jsonPath: i };
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
  static convertFragmentToUsjNodeAndDocumentLocation(e, t, n = 0) {
    if (N(e) || g.isFragmentAMarker(e)) {
      const i = g.convertNodeToUsjDocumentLocation(
        e,
        t,
        n
      );
      return {
        node: e,
        documentLocation: i
      };
    }
    if ("isClosingMarker" in e) {
      const s = {
        jsonPath: g.convertWorkingStackToJsonPath(t),
        closingMarkerOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("attributeValueForKey" in e) {
      const s = {
        jsonPath: g.convertWorkingStackAndPropertyToJsonPath(
          t,
          e.attributeValueForKey
        ),
        propertyOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("attributeKey" in e) {
      const s = {
        jsonPath: g.convertWorkingStackToJsonPath(t),
        keyName: e.attributeKey,
        keyOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("attributeMarker" in e) {
      const s = {
        jsonPath: g.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarker
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("attributeMarkerClosingMarker" in e) {
      const s = {
        jsonPath: g.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarkerClosingMarker,
        keyClosingMarkerOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: s
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
  static transferFragmentsInfoArrayToMaps(e, t, n, i, s, o) {
    e.map((c) => {
      var u, h, p;
      if (typeof c.fragment == "object" && "type" in c.fragment) {
        const d = c.fragment;
        if (d.type === Xt && d.code)
          n.bookId = d.code, n.chapterNum = 0, n.verseNum = 0, o[P] && (o[n.bookId] = o[P], delete o[P]);
        else if (d.type === ke && d.number) {
          const f = parseInt(d.number, 10);
          if (Number.isNaN(f))
            console.warn(
              `Found ${ke} type marker with number ${d.number}, but could not parse chapter number from it. Continuing using previous chapter number ${n.chapterNum}`
            );
          else {
            n.chapterNum = f, n.verseNum = 0;
            const m = o[n.bookId];
            m != null && m[0] && (m[n.chapterNum] = m[0], delete m[0]);
          }
        } else if (d.type === O && d.number) {
          const f = (u = Gr.exec(d.number)) == null ? void 0 : u[1];
          if (!f)
            console.warn(
              `Found ${O} type marker with number ${d.number}, but could not find starting verse number in it. Continuing using previous verse number ${n.verseNum}`
            );
          else {
            const m = parseInt(f, 10);
            Number.isNaN(m) ? console.warn(
              `Found ${O} type marker with number ${d.number}, but could not parse starting verse number from ${f}. Continuing using previous verse number ${n.verseNum}`
            ) : (p = (h = o[n.bookId]) == null ? void 0 : h[n.chapterNum]) != null && p[m] ? console.warn(`Found ${O} marker with existing number ${m} after
                  current ${O} number ${n.verseNum}! Not updating verse start index. All positions in this duplicate verse will be based on the current ${O} marker, not the new duplicate marker.`) : (m < n.verseNum && console.debug(
              `Found ${O} marker with number ${m} lower than current ${O} number ${n.verseNum}. Verses are out of order. There may be some issues.`
            ), n.verseNum = m);
          }
        }
      }
      return {
        ...c,
        // Determine the appropriate `UsjDocumentLocation` subtype based on what this fragment is
        nodeAndDocumentLocation: g.convertFragmentToUsjNodeAndDocumentLocation(
          c.fragment,
          t
        )
      };
    }).forEach((c) => {
      i.set(c.indexInUsfm, c);
      const l = c.nodeAndDocumentLocation.documentLocation.jsonPath, u = s.get(l);
      u ? u.push(c) : s.set(l, [c]), o[n.bookId] || (o[n.bookId] = {}), o[n.bookId][n.chapterNum] || (o[n.bookId][n.chapterNum] = {}), o[n.bookId][n.chapterNum][n.verseNum] === void 0 && (o[n.bookId][n.chapterNum][n.verseNum] = c.indexInUsfm);
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
    const t = new le(), n = /* @__PURE__ */ new Map(), i = {}, s = [], o = {
      bookId: P,
      chapterNum: 0,
      verseNum: 0
    };
    function a(u) {
      g.transferFragmentsInfoArrayToMaps(
        s,
        u,
        o,
        t,
        n,
        i
      );
    }
    let c;
    const l = [];
    return g.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      this.usj,
      // Working stack is empty since the top-level object doesn't have any parents
      [],
      // Don't skip anything
      [],
      (u, h) => {
        if (typeof u != "object") {
          const { usfm: d, fragmentsInfo: f } = this.textContentToUsfm(u);
          return g.mergeFragmentsInfoIntoExistingArray(
            f,
            s,
            e.length
          ), a(h), e += d, !1;
        }
        let p;
        return h.length > 0 && (p = h[h.length - 1].parent), "isClosingMarker" in u ? l.length > 0 && l[l.length - 1] === u.forMarker ? (l.pop(), !1) : (e = this.addMarkerUsfmToString(
          e,
          u,
          p,
          s
        ), a(h), u.forMarker.type === "book" && c && (e = this.addMarkerUsfmToString(e, c, p, s), a(h), c = void 0), !1) : this.shouldSkipOutputMarkerToUsfm(u) ? (l.push(u), !1) : g.isTopLevelUsjMarker(u, h) && !c ? (u.version !== "3.0" && (c = u), !1) : (e = this.addMarkerUsfmToString(e, u, p, s), a(h), !1);
      }
    ), e = `${g.removeEndSpace(e)}
`, { usfm: e, fragmentsByIndexInUsfm: t, fragmentsByJsonPath: n, indicesInUsfmByVerseRef: i };
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
  oe as AsyncVariable,
  ke as CHAPTER_TYPE,
  Qr as Collator,
  ct as DateTimeFormat,
  ht as DocumentCombiner,
  ln as EventRollingTimeCounter,
  Rt as FIRST_SCR_BOOK_NUM,
  qt as FIRST_SCR_CHAPTER_NUM,
  Lt as FIRST_SCR_VERSE_NUM,
  Vt as LAST_SCR_BOOK_NUM,
  Qn as MODIFIER_KEYS,
  mt as Mutex,
  un as MutexMap,
  fn as NonValidatingDocumentCombiner,
  gt as NumberFormat,
  X as PLATFORM_ERROR_VERSION,
  lt as PlatformEventEmitter,
  pn as PromiseChainingMap,
  zt as Section,
  le as SortedNumberMap,
  hn as SortedSet,
  Lr as THEME_STYLE_ELEMENT_ID,
  te as USFM_MARKERS_MAP_3_0,
  ri as USFM_MARKERS_MAP_PARATEXT_3_0,
  dn as UnsubscriberAsyncList,
  g as UsjReaderWriter,
  O as VERSE_TYPE,
  Ln as aggregateUnsubscriberAsyncs,
  qn as aggregateUnsubscribers,
  ti as applyThemeStylesheet,
  Vn as areUsjContentsEqualExceptWhitespace,
  H as at,
  V as charAt,
  bn as codePointAt,
  Un as compareScrRefs,
  on as createSyncProxyForAsyncObject,
  tn as debounce,
  K as deepClone,
  ee as deepEqual,
  Tn as defaultScrRef,
  $r as deserialize,
  Ot as endsWith,
  Le as ensureArray,
  En as escapeStringRegexp,
  ei as expandThemeContribution,
  Yn as formatBytes,
  Zn as formatRelativeDate,
  vn as formatReplacementString,
  Ct as formatReplacementStringToArray,
  Dn as formatScrRef,
  Wn as formatTimeSpan,
  sn as getAllObjectFunctionNames,
  Ft as getChaptersForBook,
  Hn as getCurrentLocale,
  Ke as getDefaultCallerSequence,
  Ce as getErrorMessage,
  Kn as getFormatCallerFunction,
  Jt as getLocalizeKeyForScrollGroupId,
  Bn as getLocalizeKeysForScrollGroupIds,
  $n as getLocalizedIdFromBookNumber,
  Ht as getNthCaller,
  Gn as getPaneSizeLimits,
  Rn as getSectionForBook,
  Jr as getStylesheetForTheme,
  rn as groupBy,
  Fn as hasCustomParatextTags,
  Xn as htmlEncode,
  $t as includes,
  _ as indexOf,
  an as isErrorMessageAboutParatextBlockingInternetAccess,
  cn as isErrorMessageAboutRegistryAuthFailure,
  xn as isLocalizeKey,
  gn as isPlatformError,
  _n as isSerializable,
  N as isString,
  Cr as isSubset,
  R as isWhiteSpace,
  jt as lastIndexOf,
  Rr as localizedStringsDocumentSchema,
  Vr as menuDocumentSchema,
  en as newGuid,
  mn as newPlatformError,
  kn as normalize,
  ye as normalizeScriptureSpaces,
  On as offsetBook,
  Pn as offsetChapter,
  Cn as offsetVerse,
  wn as ordinalCompare,
  Nn as padEnd,
  In as padStart,
  Jn as parseParatextHtml,
  Br as projectSettingsDocumentSchema,
  zn as sanitizeHtml,
  jn as scrRefToBBBCCC,
  me as scrRefToBBBCCCVVV,
  Te as serialize,
  Dr as settingsDocumentSchema,
  he as slice,
  de as split,
  Fe as startsWith,
  x as stringLength,
  j as substring,
  qr as themeDocumentSchema,
  Ut as toArray,
  Mn as toKebabCase,
  An as transformAndEnsureRegExpArray,
  Sn as transformAndEnsureRegExpRegExpArray,
  pt as wait,
  nn as waitForDuration
};
//# sourceMappingURL=index.js.map
