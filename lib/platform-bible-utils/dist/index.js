var xe = Object.defineProperty;
var we = (n, e, t) => e in n ? xe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var g = (n, e, t) => we(n, typeof e != "symbol" ? e + "" : e, t);
import { Mutex as Ie } from "async-mutex";
import { Canon as x, VerseRef as ie } from "@sillsdev/scripture";
import { USJ_TYPE as oe } from "@eten-tech-foundation/scripture-utilities";
import { length as Me, indexOf as Se, limit as ae, substring as Ae, toArray as Ee, substr as Pe } from "stringz";
import Te from "dompurify";
import { deepEqual as $e } from "fast-equals";
import { JSONPath as T } from "jsonpath-plus";
const O = class O {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, t = 1e4) {
    g(this, "variableName");
    g(this, "promiseToValue");
    g(this, "timeoutId");
    g(this, "timeoutOccurred");
    g(this, "resolver");
    g(this, "rejecter");
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
      O.verboseLoggingEnabled && console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
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
      O.verboseLoggingEnabled && console.debug(`${this.variableName} is being rejected now with reason: ${e}`), this.rejecter(e), this.complete();
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
g(O, "verboseLoggingEnabled", !1);
let q = O;
class jt {
  constructor(e, t) {
    g(this, "collator");
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
class Ce {
  constructor(e, t) {
    g(this, "dateTimeFormatter");
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
class Oe {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    g(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    g(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    g(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    g(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    g(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    g(this, "emit", (e) => {
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
    this.assertNotDisposed(), [...this.subscriptions ?? []].forEach((r) => r(e));
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
function Dt() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (n) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~n) * 65536 >> n).toString(16).padStart(4, "0")
    )
  );
}
function b(n) {
  return typeof n == "string" || n instanceof String;
}
function C(n) {
  return JSON.parse(JSON.stringify(n));
}
function Bt(n, e = 300) {
  let t, r, i, s;
  return (...o) => (clearTimeout(t), r || (r = new Promise((a, l) => {
    i = a, s = l;
  })), t = setTimeout(async () => {
    try {
      i(await n(...o));
    } catch (a) {
      s(a);
    } finally {
      r = void 0;
    }
  }, e), r);
}
function Lt(n, e, t) {
  const r = /* @__PURE__ */ new Map();
  return n.forEach((i, s) => {
    const o = e(i, s), a = r.get(o), l = t ? t(i, o, s) : i;
    a ? a.push(l) : r.set(o, [l]);
  }), r;
}
function Ue(n) {
  return typeof n == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  n !== null && "message" in n && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof n.message == "string";
}
function je(n) {
  if (Ue(n)) return n;
  try {
    return new Error(JSON.stringify(n));
  } catch {
    return new Error(String(n));
  }
}
function ce(n) {
  return je(n).message;
}
function De(n) {
  return new Promise((e) => setTimeout(e, n));
}
function Ft(n, e) {
  const t = De(e).then(() => {
  });
  return Promise.any([t, n()]);
}
function Vt(n, e = "obj") {
  const t = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(n).forEach((i) => {
    try {
      typeof n[i] == "function" && t.add(i);
    } catch {
    }
  });
  let r = Object.getPrototypeOf(n);
  for (; r && Object.getPrototypeOf(r); )
    Object.getOwnPropertyNames(r).forEach((i) => {
      try {
        typeof n[i] == "function" && t.add(i);
      } catch {
      }
    }), r = Object.getPrototypeOf(r);
  return t;
}
function Jt(n, e = {}) {
  return new Proxy(e, {
    get(t, r) {
      return r in t ? t[r] : async (...i) => (await n())[r](...i);
    }
  });
}
function Rt(n) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return b(n) ? n.includes(e) : ce(n).includes(e);
}
function zt(n) {
  const e = "401 Unauthorized error while getting shared projects.", t = "User registration is not valid. Cannot retrieve resources from DBL.", r = b(n) ? n : ce(n);
  return r.includes(e) || r.includes(t);
}
class Be {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, t) {
    g(this, "baseDocument");
    g(this, "contributions", /* @__PURE__ */ new Map());
    g(this, "latestOutput");
    g(this, "options");
    g(this, "onDidRebuildEmitter", new Oe());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    g(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
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
    } catch (s) {
      throw r ? this.contributions.set(e, r) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${s}`);
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
      e = Le(
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
function K(...n) {
  let e = !0;
  return n.forEach((t) => {
    (!t || typeof t != "object" || Array.isArray(t)) && (e = !1);
  }), e;
}
function G(...n) {
  let e = !0;
  return n.forEach((t) => {
    (!t || typeof t != "object" || !Array.isArray(t)) && (e = !1);
  }), e;
}
function Le(n, e, t) {
  const r = C(n);
  return e ? le(r, C(e), t) : r;
}
function le(n, e, t) {
  if (!e) return n;
  if (K(n, e)) {
    const r = n, i = e;
    Object.keys(i).forEach((s) => {
      if (Object.hasOwn(r, s)) {
        if (K(r[s], i[s]))
          r[s] = le(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            r[s],
            i[s],
            t
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (G(r[s], i[s]))
          r[s] = r[s].concat(
            i[s]
          );
        else if (!t)
          throw new Error(`Cannot merge objects: key "${s}" already exists in the target object`);
      } else
        r[s] = i[s];
    });
  } else G(n, e) && n.push(...e);
  return n;
}
class qt {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(e) {
    /** The ring buffer to store times */
    g(this, "ringBuffer");
    /** The size of the ring buffer */
    g(this, "bufferSize");
    /** The next location where a time will be written */
    g(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    g(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    g(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    g(this, "totalInstanceCount");
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
class Fe extends Ie {
}
class Kt {
  constructor() {
    g(this, "mutexesByID", /* @__PURE__ */ new Map());
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
    return t || (t = new Fe(), this.mutexesByID.set(e, t), t);
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
class Gt extends Be {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, t) {
    super(e, t);
  }
  get output() {
    return this.latestOutput;
  }
}
class Ve {
  constructor(e, t) {
    g(this, "numberFormatter");
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
const Je = Promise.resolve();
class Ht {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    g(this, "map", /* @__PURE__ */ new Map());
    g(this, "logger");
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
    const r = { promise: Je }, i = t.catch((s) => this.logger.warn(`Error in promise for ${e}: ${s.message}`)).finally(() => {
      this.map.get(e) === r.promise && this.map.delete(e);
    });
    r.promise = i, this.map.set(e, i);
  }
}
class H {
  constructor() {
    g(this, "map", /* @__PURE__ */ new Map());
    g(this, "sortedKeys", []);
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
      const s = Math.floor((t + r) / 2);
      this.sortedKeys[s] <= e ? (i = s, t = s + 1) : r = s - 1;
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
class Xt {
  /**
   * Creates a new sorted set
   *
   * @param compareFn - Function used to determine the order of elements. Returns negative when a <
   *   b, zero when a = b, positive when a > b
   */
  constructor(e) {
    /** Internal storage for the sorted items */
    g(this, "items", []);
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
class Yt {
  constructor(e = "Anonymous") {
    g(this, "unsubscribers", /* @__PURE__ */ new Set());
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
    const e = [...this.unsubscribers].map((r) => r()), t = await Promise.all(e);
    return this.unsubscribers.clear(), t.every((r, i) => (r || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${i} failed!`), r));
  }
}
const j = 1;
function _t(n) {
  if (!n) return { message: "", platformErrorVersion: j };
  if (b(n)) return { message: n, platformErrorVersion: j };
  if (typeof n == "object" && "message" in n && typeof n.message == "string") {
    const e = {
      message: n.message,
      platformErrorVersion: j
    };
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)), Object.defineProperty(e, "message", { enumerable: !0 }), "stack" in n && b(n.stack) && Object.defineProperty(e, "stack", { value: n.stack, enumerable: !0 }), "cause" in e && Object.defineProperty(e, "cause", { enumerable: !0 }), e;
  }
  return { cause: n, message: "", platformErrorVersion: j };
}
function Wt(n) {
  return !!n && typeof n == "object" && "platformErrorVersion" in n;
}
function ue(n) {
  return n ? Array.isArray(n) ? n : [n] : [];
}
function D(n, e) {
  if (!(e > v(n) || e < -v(n)))
    return B(n, e, 1);
}
function P(n, e) {
  return e < 0 || e > v(n) - 1 ? "" : B(n, e, 1);
}
function Zt(n, e) {
  if (!(e < 0 || e > v(n) - 1))
    return B(n, e, 1).codePointAt(0);
}
function Re(n, e, t = v(n)) {
  const r = Ge(n, e);
  return !(r === -1 || r + v(e) !== t);
}
function ze(n, e, t) {
  if (e < 0) return -1;
  if (t) {
    if (P(n, e) === "}" && P(n, e - 1) === "\\") return e;
    const s = U(n, "\\}", e);
    return s >= 0 ? s + 1 : s;
  }
  let r = e;
  const i = v(n);
  for (; r < i && (r = U(n, "}", r), !(r === -1 || P(n, r - 1) !== "\\")); )
    r += 1;
  return r >= i ? -1 : r;
}
function qe(n, e) {
  const t = [];
  let r = 0, i = 0;
  function s(a, l, c) {
    const u = S(n, i, l), h = t.length > 0 && b(t[t.length - 1]) ? `${t.pop()}${u}` : u;
    b(a) ? t.push(`${h}${a}`) : (h && t.push(h), t.push(a)), i = l + c;
  }
  const o = v(n);
  for (; r < o; ) {
    switch (P(n, r)) {
      case "{":
        if (P(n, r - 1) !== "\\") {
          const a = ze(n, r, !1);
          if (a >= 0) {
            const l = S(n, r + 1, a), c = l in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[l]
            ) : l;
            s(c, r, a + 1 - r), r = a, i = a + 1;
          }
        } else
          s("{", r - 1, 2);
        break;
      case "}":
        P(n, r - 1) !== "\\" || s("}", r - 1, 2);
        break;
    }
    r += 1;
  }
  if (i < o) {
    const a = S(n, i);
    t.push(
      t.length > 0 && b(t[t.length - 1]) ? `${t.pop()}${a}` : a
    );
  }
  return t;
}
function Qt(n, e) {
  return qe(n, e).map((t) => `${t}`).join("");
}
function Ke(n, e, t = 0) {
  const r = S(n, t);
  return U(r, e) !== -1;
}
function U(n, e, t = 0) {
  return Se(n, e, t);
}
function Ge(n, e, t) {
  let r = t === void 0 ? v(n) : t;
  r < 0 ? r = 0 : r >= v(n) && (r = v(n) - 1);
  for (let i = r; i >= 0; i--)
    if (B(n, i, v(e)) === e)
      return i;
  return -1;
}
function v(n) {
  return Me(n);
}
function er(n, e) {
  const t = e.toUpperCase();
  return t === "NONE" ? n : n.normalize(t);
}
function tr(n, e, t) {
  return n.localeCompare(e, "en", t);
}
function rr(n, e, t = " ") {
  return e <= v(n) ? n : ae(n, e, t, "right");
}
function nr(n, e, t = " ") {
  return e <= v(n) ? n : ae(n, e, t, "left");
}
function X(n, e) {
  return e > n ? n : e < -n ? 0 : e < 0 ? e + n : e;
}
function Y(n, e, t) {
  const r = v(n);
  if (e > r || t && (e > t && !(e >= 0 && e < r && t < 0 && t > -r) || t < -r))
    return "";
  const i = X(r, e), s = t ? X(r, t) : void 0;
  return S(n, i, s);
}
function _(n, e, t) {
  const r = [];
  if (t !== void 0 && t <= 0)
    return [n];
  if (e === "") return He(n).slice(0, t);
  let i = e;
  (typeof e == "string" || e instanceof RegExp && !Ke(e.flags, "g")) && (i = new RegExp(e, "g"));
  const s = n.match(i);
  let o = 0;
  if (!s) return [n];
  for (let a = 0; a < (t ? t - 1 : s.length); a++) {
    const l = U(n, s[a], o), c = v(s[a]);
    if (r.push(S(n, o, l)), o = l + c, t !== void 0 && r.length === t)
      break;
  }
  return r.push(S(n, o)), r;
}
function fe(n, e, t = 0) {
  return U(n, e, t) === t;
}
function B(n, e = 0, t = v(n) - e) {
  return Pe(n, e, t);
}
function S(n, e, t = v(n)) {
  return Ae(n, e, t);
}
function He(n) {
  return Ee(n);
}
function sr(n) {
  return fe(n, "%") && Re(n, "%");
}
function ir(n) {
  if (typeof n != "string")
    throw new TypeError("Expected a string");
  return n.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function or(n) {
  return n ? ue(n).map(
    (r) => Array.isArray(r) ? r.map((i) => new RegExp(i)) : new RegExp(r)
  ) : [];
}
function ar(n) {
  return n ? ue(n).map((r) => new RegExp(r)) : [];
}
const Xe = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function E(n) {
  return Xe.test(n);
}
function cr(n) {
  let e = "";
  for (let t = 0; t < n.length; t++) {
    const r = n[t];
    if (r === r.toUpperCase() && r !== r.toLowerCase()) {
      if (t > 0) {
        const s = n[t - 1];
        if (!(s === s.toUpperCase() && s !== s.toLowerCase()))
          e += "-";
        else if (t + 1 < n.length) {
          const a = n[t + 1];
          a === a.toLowerCase() && a !== a.toUpperCase() && (e += "-");
        }
      }
      e += r.toLowerCase();
    } else
      e += r;
  }
  return e;
}
function lr(n, e) {
  const t = n.split(/\s+/);
  if (t.length <= e * 2 || e < 1)
    return n;
  const r = t.slice(0, e), i = t.slice(-e);
  return [...r, "[...]", ...i].join(" ");
}
const V = ["chapter", "book", "para", "row", "sidebar", oe], Ye = "​", pe = [
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
  { shortName: "REV", fullNames: ["Revelation"], chapters: 22 },
  // DC and other - TJ got book names from Canon.ts and chapter numbers from finding the largest
  // number among all the `.vrs` files in `Paratext/My Paratext Projects`. There were a few books
  // that had varying chapter numbers, and some books that had skipped chapter numbers. This model
  // is just not good enough; we need versification to make a perfect model.
  { shortName: "TOB", fullNames: ["Tobit"], chapters: 14 },
  { shortName: "JDT", fullNames: ["Judith"], chapters: 16 },
  { shortName: "ESG", fullNames: ["Esther Greek"], chapters: 11 },
  { shortName: "WIS", fullNames: ["Wisdom of Solomon"], chapters: 19 },
  { shortName: "SIR", fullNames: ["Sirach (Ecclesiasticus)"], chapters: 52 },
  { shortName: "BAR", fullNames: ["Baruch"], chapters: 6 },
  { shortName: "LJE", fullNames: ["Letter of Jeremiah"], chapters: 1 },
  { shortName: "S3Y", fullNames: ["Song of 3 Young Men"], chapters: 1 },
  { shortName: "SUS", fullNames: ["Susanna"], chapters: 1 },
  { shortName: "BEL", fullNames: ["Bel and the Dragon"], chapters: 1 },
  { shortName: "1MA", fullNames: ["1 Maccabees"], chapters: 16 },
  { shortName: "2MA", fullNames: ["2 Maccabees"], chapters: 15 },
  { shortName: "3MA", fullNames: ["3 Maccabees"], chapters: 7 },
  { shortName: "4MA", fullNames: ["4 Maccabees"], chapters: 18 },
  { shortName: "1ES", fullNames: ["1 Esdras (Greek)"], chapters: 9 },
  { shortName: "2ES", fullNames: ["2 Esdras (Latin)"], chapters: 16 },
  { shortName: "MAN", fullNames: ["Prayer of Manasseh"], chapters: 1 },
  { shortName: "PS2", fullNames: ["Psalm 151"], chapters: 1 },
  { shortName: "ODA", fullNames: ["Odes"], chapters: 14 },
  { shortName: "PSS", fullNames: ["Psalms of Solomon"], chapters: 18 },
  { shortName: "JSA", fullNames: ["Joshua A. *obsolete*"], chapters: 24 },
  { shortName: "JDB", fullNames: ["Judges B. *obsolete*"], chapters: 21 },
  { shortName: "TBS", fullNames: ["Tobit S. *obsolete*"], chapters: 14 },
  { shortName: "SST", fullNames: ["Susanna Th. *obsolete*"], chapters: 1 },
  { shortName: "DNT", fullNames: ["Daniel Th. *obsolete*"], chapters: 12 },
  { shortName: "BLT", fullNames: ["Bel Th. *obsolete*"], chapters: 1 },
  { shortName: "XXA", fullNames: ["Extra A"], chapters: 0 },
  { shortName: "XXB", fullNames: ["Extra B"], chapters: 0 },
  { shortName: "XXC", fullNames: ["Extra C"], chapters: 0 },
  { shortName: "XXD", fullNames: ["Extra D"], chapters: 0 },
  { shortName: "XXE", fullNames: ["Extra E"], chapters: 0 },
  { shortName: "XXF", fullNames: ["Extra F"], chapters: 0 },
  { shortName: "XXG", fullNames: ["Extra G"], chapters: 0 },
  { shortName: "FRT", fullNames: ["Front Matter"], chapters: 0 },
  { shortName: "BAK", fullNames: ["Back Matter"], chapters: 0 },
  { shortName: "OTH", fullNames: ["Other Matter"], chapters: 0 },
  { shortName: "3ES", fullNames: ["3 Ezra *obsolete*"], chapters: 0 },
  { shortName: "EZA", fullNames: ["Apocalypse of Ezra"], chapters: 12 },
  { shortName: "5EZ", fullNames: ["5 Ezra (Latin Prologue)"], chapters: 2 },
  { shortName: "6EZ", fullNames: ["6 Ezra (Latin Epilogue)"], chapters: 12 },
  { shortName: "INT", fullNames: ["Introduction"], chapters: 0 },
  { shortName: "CNC", fullNames: ["Concordance "], chapters: 0 },
  { shortName: "GLO", fullNames: ["Glossary "], chapters: 0 },
  { shortName: "TDX", fullNames: ["Topical Index"], chapters: 0 },
  { shortName: "NDX", fullNames: ["Names Index"], chapters: 0 },
  { shortName: "DAG", fullNames: ["Daniel Greek"], chapters: 14 },
  { shortName: "PS3", fullNames: ["Psalms 152-155"], chapters: 4 },
  { shortName: "2BA", fullNames: ["2 Baruch (Apocalypse)"], chapters: 77 },
  { shortName: "LBA", fullNames: ["Letter of Baruch"], chapters: 86 },
  { shortName: "JUB", fullNames: ["Jubilees"], chapters: 34 },
  { shortName: "ENO", fullNames: ["Enoch"], chapters: 42 },
  { shortName: "1MQ", fullNames: ["1 Meqabyan"], chapters: 36 },
  { shortName: "2MQ", fullNames: ["2 Meqabyan"], chapters: 20 },
  { shortName: "3MQ", fullNames: ["3 Meqabyan"], chapters: 10 },
  { shortName: "REP", fullNames: ["Reproof (Proverbs 25-31)"], chapters: 6 },
  { shortName: "4BA", fullNames: ["4 Baruch (Rest of Baruch)"], chapters: 5 },
  { shortName: "LAO", fullNames: ["Laodiceans"], chapters: 1 }
], _e = 1, We = pe.length - 1, Ze = 1, Qe = 1, ur = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, et = (n) => {
  var e;
  return ((e = pe[n]) == null ? void 0 : e.chapters) ?? -1;
}, fr = (n, e) => ({
  book: x.bookNumberToId(
    Math.max(
      _e,
      Math.min(x.bookIdToNumber(n.book) + e, We)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), pr = (n, e) => ({
  ...n,
  chapterNum: Math.min(
    Math.max(Ze, n.chapterNum + e),
    et(x.bookIdToNumber(n.book))
  ),
  verseNum: 1
}), hr = (n, e) => ({
  ...n,
  verseNum: Math.max(Qe, n.verseNum + e)
});
async function dr(n, e, t) {
  const r = x.bookNumberToId(n);
  if (!fe(Intl.getCanonicalLocales(e)[0], "zh"))
    return t({
      localizeKey: `LocalizedId.${r}`,
      languagesToSearch: [e]
    });
  const i = await t({
    localizeKey: `Book.${r}`,
    languagesToSearch: [e]
  }), s = _(i, "-");
  return _(s[0], "ÿ08")[0].trim();
}
function mr(n) {
  return new ie(x.bookIdToNumber(n.book), n.chapterNum, n.verseNum).BBBCCC;
}
function W(n) {
  return new ie(x.bookIdToNumber(n.book), n.chapterNum, n.verseNum).BBBCCCVVV;
}
function tt(n, e) {
  return W(n) - W(e);
}
function rt(n) {
  return `%scrollGroup_${n}%`;
}
function gr(n) {
  return n.map((e) => rt(e));
}
function he(n, e) {
  switch (e) {
    case "English":
      return x.bookIdToEnglishName(n.book);
    case "id":
    case void 0:
      return n.book;
    default:
      return e;
  }
}
function nt(n, e) {
  const t = he(n, e == null ? void 0 : e.optionOrLocalizedBookName), r = (e == null ? void 0 : e.bookChapterSeparator) ?? " ", i = (e == null ? void 0 : e.chapterVerseSeparator) ?? ":";
  return `${t}${r}${n.chapterNum}${i}${n.verseNum}`;
}
function yr(n, e, t, r) {
  return nt(n, {
    optionOrLocalizedBookName: e,
    chapterVerseSeparator: t,
    bookChapterSeparator: r
  });
}
function st(n, e) {
  const t = n.verseNum < 0 ? "" : `${e ?? ":"}${n.verseNum}`;
  return n.chapterNum < 0 ? "" : `${n.chapterNum}${t}`;
}
function Z(n, e) {
  const t = he(n, e == null ? void 0 : e.optionOrLocalizedBookName), r = st(
    n,
    e == null ? void 0 : e.chapterVerseSeparator
  );
  return `${t}${t && r ? (e == null ? void 0 : e.bookChapterSeparator) ?? " " : ""}${r}`;
}
function br(n, e, t) {
  const r = Z(n, t);
  if (tt(n, e) === 0) return r;
  const i = n.book === e.book && !(t != null && t.repeatBookName) ? "" : (t == null ? void 0 : t.endRefOptionOrLocalizedBookName) ?? (t == null ? void 0 : t.optionOrLocalizedBookName), s = Z(e, {
    ...t,
    optionOrLocalizedBookName: i
  });
  return `${r}${(t == null ? void 0 : t.rangeSeparator) ?? " - "}${s}`;
}
var it = /* @__PURE__ */ ((n) => (n.OT = "OT", n.NT = "NT", n.DC = "DC", n.Extra = "Extra", n))(it || {});
const kr = (n) => {
  if (x.isBookOT(n)) return "OT";
  if (x.isBookNT(n)) return "NT";
  if (x.isBookDC(n)) return "DC";
  if (x.isExtraMaterial(n)) return "Extra";
  throw new Error(`Unknown section for book: ${n}`);
}, ot = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function Q(n) {
  return ot.test(n);
}
const at = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function ct(n) {
  return at.test(n);
}
function ee(n) {
  let e = "", t = !1, r = "\0";
  for (let i = 0; i < n.length; i += 1) {
    const s = n[i];
    s.charCodeAt(0) < 32 ? (t || (e += " "), t = !0) : !t && s === Ye && i + 1 < n.length && Q(n[i + 1]) || (Q(s) ? (t || (e += s), t = !0) : ct(s) && r === s || (e += s, t = !1)), r = s;
  }
  return e;
}
function te(n) {
  return !n || n.length === 0 ? !0 : n.length === 1 && (n[0] === void 0 || n[0] === "");
}
function re(n, e) {
  if (!e || !V.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(n)} does not have a content array! This should not happen!`
    );
  return n === e.content[e.content.length - 1];
}
function de(n, e, t, r) {
  if (!n && !t) return !0;
  if (!n || !t) return !1;
  const i = b(n), s = b(t);
  if (i && s) {
    const o = ee(n), a = ee(t);
    if (o !== a) {
      if (!E(D(o, -1) ?? "") && !E(D(a, -1) ?? "") || !re(n, e) || !re(t, r)) return !1;
      let l = o;
      for (; E(D(l, -1) ?? ""); ) l = Y(l, 0, -1);
      let c = a;
      for (; E(D(c, -1) ?? ""); ) c = Y(c, 0, -1);
      if (l !== c) return !1;
    }
  } else if (!i && !s) {
    const o = n, a = t, l = Object.keys(o).filter(
      (h) => h !== "content"
    );
    if (l.length !== Object.keys(a).filter((h) => h !== "content").length || l.some((h) => !(h in a) || o[h] !== a[h])) return !1;
    const c = te(o.content), u = te(a.content);
    if (c !== u) return !1;
    if (!c && !u) {
      let h = o.content, f = a.content;
      const p = h[h.length - 1];
      V.includes(o.type) && b(p) && E(p) && (h = h.slice(0, -1));
      const m = f[f.length - 1];
      if (V.includes(a.type) && b(m) && E(m) && (f = f.slice(0, -1)), h.length !== f.length) return !1;
      for (let y = 0; y < h.length; y += 1)
        if (!de(h[y], o, f[y], a))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function vr(n, e) {
  return de(n, void 0, e, void 0);
}
const Nr = (n) => (...e) => n.map((r) => r(...e)).every((r) => r), xr = (n) => async (...e) => {
  const t = n.map(async (r) => r(...e));
  return (await Promise.all(t)).every((r) => r);
}, lt = "book", ne = "chapter", I = "verse", M = "***";
function wr(n) {
  return Te.sanitize(n, {
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
function me() {
  return Array.from({ length: 26 }, (n, e) => String.fromCharCode(97 + e));
}
function ut(n, e) {
  const t = e && e.length > 0 ? e : me();
  return t[n % t.length];
}
function Ir(n, e) {
  const t = e && e.length > 0 ? e : me(), r = (() => {
    const i = /* @__PURE__ */ new Map();
    let s = 0;
    return n.forEach((o, a) => {
      o.caller === "+" && (i.set(a, ut(s, t)), s += 1);
    }), i;
  })();
  return (i, s) => {
    if (i === "+") {
      const o = r.get(s);
      return o || (console.warn(`Caller index ${s} out of range for '+' callers`), "?");
    }
    if (i !== "-")
      return i;
  };
}
function ft(n) {
  const e = [];
  if (!n || n.length === 0) return e;
  function t(r) {
    typeof r != "string" && (r.type === "note" ? e.push(r) : Array.isArray(r.content) && r.content.length > 0 && r.content.forEach(t));
  }
  return n.forEach(t), e;
}
function Mr(n, e = {}) {
  const {
    splitterThicknessPx: t = 4,
    secondaryPaneMinSizePx: r = 20,
    mainPaneMinSizePx: i = 60,
    absoluteMinPercent: s = 3,
    absoluteMaxPercent: o = 90
  } = e, a = n - t;
  let l, c;
  return a < r + i ? (l = s, c = o) : (c = Math.min(
    Math.floor((a - i) / a * 100),
    o
  ), l = Math.min(
    Math.max(Math.ceil(r / a * 100), s),
    c
  )), { minPercent: l, maxPercent: c };
}
function J(n, e) {
  return $e(n, e);
}
function pt(n, e) {
  if (typeof n != typeof e) return !1;
  if (!n && !e) return !0;
  if (Array.isArray(n)) {
    const s = e, o = n;
    return s.length === 0 ? !0 : s.every((a) => o.includes(a));
  }
  if (typeof n != "object")
    return J(n, e);
  const t = e, r = n;
  let i = !0;
  return Object.keys(t).forEach((s) => {
    i && (Object.hasOwn(r, s) && pt(r[s], t[s]) || (i = !1));
  }), i;
}
function se(n, e, t) {
  return JSON.stringify(n, (i, s) => {
    let o = s;
    return e && (o = e(i, o)), o === void 0 && (o = null), o;
  }, t);
}
function ht(n, e) {
  function t(i) {
    return Object.keys(i).forEach((s) => {
      i[s] === null ? i[s] = void 0 : typeof i[s] == "object" && (i[s] = t(i[s]));
    }), i;
  }
  const r = JSON.parse(n, e);
  if (r !== null)
    return typeof r == "object" ? t(r) : r;
}
function Sr(n) {
  try {
    const e = se(n);
    return e === se(ht(e));
  } catch {
    return !1;
  }
}
const Ar = (n) => n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function Er() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0].replace(/@posix$/i, "") : new Ce().resolvedOptions().locale;
}
function Pr(n, e = 2) {
  if (n === 0) return "0 Bytes";
  const t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], r = Math.floor(Math.log(n) / Math.log(1024)), i = t[r];
  return `${new Ve("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(n / 1024 ** r)} ${i}`;
}
const dt = 1e3, ge = 60, ye = ge * 60, mt = ye * 24;
function Tr(n, e, t = /* @__PURE__ */ new Date()) {
  const r = Math.floor((e.getTime() - t.getTime()) / dt), i = Math.round(r / mt);
  if (Math.abs(i) >= 1) return n.format(i, "day");
  const s = Math.round(r / ye);
  if (Math.abs(s) >= 1) return n.format(s, "hour");
  const o = Math.round(r / ge);
  return Math.abs(o) >= 1 ? n.format(o, "minute") : n.format(r, "second");
}
function $r(n, e, t, r, i = {
  year: "numeric",
  month: "short",
  day: "numeric"
}) {
  const s = /* @__PURE__ */ new Date(), o = new Date(s);
  o.setDate(o.getDate() - 1);
  const a = n.getDate() === s.getDate() && n.getMonth() === s.getMonth() && n.getFullYear() === s.getFullYear(), l = n.getDate() === o.getDate() && n.getMonth() === o.getMonth() && n.getFullYear() === o.getFullYear();
  return a ? e : l ? t : n.toLocaleString(r, i);
}
const Cr = /* @__PURE__ */ new Set([
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
]), z = {
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
function L(n) {
  n && Object.values(n).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && L(e.properties);
    }
  });
}
L(z);
const gt = {
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
  $defs: z
};
Object.freeze(gt);
const yt = {
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
  $defs: z
};
Object.freeze(yt);
const be = {
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
L(be);
const bt = {
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
  $defs: be
};
Object.freeze(bt);
const kt = {
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
Object.freeze(kt);
const ke = {
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
L(ke);
const vt = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: ke
};
Object.freeze(vt);
const Nt = "theme-styles";
function xt(n, e) {
  return `${n ? `${n}-` : ""}${e}`;
}
function Or(n, e) {
  return Object.fromEntries(
    Object.entries(n).map(([r, i]) => [
      r,
      i ? Object.fromEntries(
        Object.entries(i).map(([s, o]) => {
          var a;
          return [
            s,
            o ? {
              ...o,
              // Add the derived properties
              themeFamilyId: r,
              type: s,
              id: xt(r, s),
              cssVariables: {
                // Fill in the default css variables
                ...(a = e == null ? void 0 : e[s]) == null ? void 0 : a.cssVariables,
                ...o.cssVariables
              }
            } : void 0
          ];
        }).filter(([, s]) => !!s)
      ) : void 0
    ]).filter(([, r]) => !!r)
  );
}
function wt(n) {
  return `
.${n.id} {
${Object.entries(n.cssVariables).map(([e, t]) => `  --${e}: ${t};`).join(`
`)}
}
`;
}
function Ur(n, e, t) {
  const r = e == null ? void 0 : e.dataset.themeId;
  r && this.document.body.classList.remove(r), this.document.body.classList.add(n.id), e && this.document.head.removeChild(e);
  const i = this.document.createElement("style");
  return i.id = `${Nt}${t ? `-${t}` : ""}`, i.dataset.themeId = n.id, i.textContent = wt(n), this.document.head.appendChild(i), i;
}
function ve(n) {
  return Object.freeze(n), n == null || Object.getOwnPropertyNames(n).forEach(function(t) {
    // Need to make sure to avoid null, which is an object type
    // eslint-disable-next-line no-null/no-null
    n[t] !== null && (typeof n[t] == "object" || typeof n[t] == "function") && !Object.isFrozen(n[t]) && ve(n[t]);
  }), n;
}
const R = ve({
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
}), jr = Object.freeze({
  ...R,
  isSpaceAfterAttributeMarkersContent: !0,
  shouldOptionalClosingMarkersBePresent: !0
}), $ = ["figure", "note", "sidebar", "table"];
Object.freeze($);
const It = /\u00A0/g, Mt = /\w+(\d+)/, St = /(\d+)-?(\d+)?/;
class d {
  constructor(e, t) {
    g(this, "usj");
    g(this, "markersMap");
    g(this, "shouldAllowInvisibleCharacters");
    // Cached properties
    g(this, "parentMapInternal");
    g(this, "fragmentsByIndexInUsfmInternal");
    g(this, "fragmentsByJsonPathInternal");
    g(this, "indicesInUsfmByVerseRefInternal");
    g(this, "usfmInternal");
    this.usj = e;
    const { markersMap: r, shouldAllowInvisibleCharacters: i } = t ?? {};
    if (r)
      this.markersMap = r, d.areUsjVersionsCompatible(this.usj.version, this.markersMap.version) || console.warn(
        `Warning: USJ provided has version ${this.usj.version}, but provided markers map has version ${this.markersMap.version}. This may cause unexpected issues when transforming between formats.
USJ: ${JSON.stringify(
          this.usj
        )}`
      );
    else if (d.areUsjVersionsCompatible(this.usj.version, R.version))
      this.markersMap = R;
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
    const t = T({ path: e, json: this.usj, wrap: !0 });
    if (t === void 0 || t.length === 0) return;
    if (!Array.isArray(t[0])) return t[0];
    const r = T({ path: e, json: this.usj, wrap: !1 });
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
    return typeof e == "object" && e.type === oe && t.length === 0;
  }
  /**
   * Determine if a fragment is a marker, not a text content string or some kind of position
   * fragment that isn't actually a marker e.g. closing marker fragment
   */
  static isFragmentAMarker(e) {
    return !b(e) && !("forMarker" in e);
  }
  // #endregion marker helper methods
  // #region Parent Maps
  static createParentMapInternal(e, t, r) {
    var i;
    r.set(e, t), e.content && r.set(e.content, e), (i = e.content) == null || i.forEach((s) => {
      typeof s == "object" && d.createParentMapInternal(s, e, r);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((t) => {
      typeof t == "object" && d.createParentMapInternal(t, this.usj, e);
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
    let i = e, s = r.get(i);
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
      i = s, s = r.get(s);
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
    const t = T.toPathArray(e);
    return d.jsonPathArrayToJsonPath(t);
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
    return `${d.convertWorkingStackToJsonPath(e)}['${t}']`;
  }
  convertJsonPathToWorkingStack(e) {
    const t = [];
    if (e === "$") return t;
    const r = e.match(/content\[(\d+)\]/g);
    if (!r) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let i = this.usj;
    return r.forEach((s, o) => {
      const a = /(\d+)/.exec(s);
      if (!a) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const l = parseInt(a[0], 10);
      if (t.push({ parent: i, index: l }), o + 1 < r.length) {
        if (typeof i == "string" || !i.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(i)}`);
        const c = i.content[l];
        if (typeof c == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(c)}`);
        i = c;
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
    return ft((e = this.usj) == null ? void 0 : e.content);
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
    var a;
    let s = e;
    const o = t.length === 0 ? e : t[0].parent;
    if (!b(o)) {
      if (r.includes(o.type)) return;
      let l;
      t.some((c) => {
        const u = c.parent.content[c.index];
        return !b(u) && r.includes(u.type) ? (l = u, !0) : !1;
      }), l && (s = l);
    }
    for (; s !== void 0; ) {
      const l = typeof s == "object" && r.includes(s.type);
      if (!l && i(s, t)) return s;
      if (!l && typeof s == "object" && (((a = s.content) == null ? void 0 : a.length) ?? 0) > 0)
        t.push({ parent: s, index: 0 }), [s] = s.content;
      else {
        if (!l) {
          const c = typeof s == "object" ? { isClosingMarker: !0, forMarker: s } : void 0;
          if (c && i(c, t))
            return c;
        }
        for (s = void 0; t.length > 0; ) {
          const c = t.pop();
          if (c)
            if (c.index + 1 < c.parent.content.length) {
              c.index += 1, t.push(c), s = c.parent.content[c.index];
              break;
            } else {
              const u = {
                isClosingMarker: !0,
                forMarker: c.parent
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
  static findNextMatchingNodeUsingWorkingStack(e, t, r, i) {
    return this.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      e,
      t,
      r,
      (o, a) => typeof o == "object" && "isClosingMarker" in o ? !1 : i(o, a)
    );
  }
  findNextMatchingNode(e, t) {
    const r = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    );
    let i = r;
    const s = d.findNextMatchingNodeUsingWorkingStack(
      e.node,
      r,
      [],
      (o, a) => (i = a, t({
        node: o,
        documentLocation: d.convertNodeToUsjDocumentLocation(o, a)
      }))
    );
    if (s !== void 0)
      return {
        node: s,
        documentLocation: d.convertNodeToUsjDocumentLocation(
          s,
          i
        )
      };
  }
  // #endregion Walk the node tree
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return d.convertWorkingStackToJsonPath(this.createWorkingStack(e));
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
    var s;
    let r;
    if (b(e)) {
      if (t === void 0)
        throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
      const o = Array.isArray(t) ? this.parentMap.get(t) : t;
      if (o === void 0)
        throw new Error(`Cannot find parent for ${JSON.stringify(t)}`);
      r = this.createWorkingStack(o);
      const a = (s = o.content) == null ? void 0 : s.indexOf(e);
      if (a === void 0 || a < 0)
        throw new Error("Could not find index of node in parent for creating working stack");
      r.push({ parent: o, index: a });
    } else
      r = this.createWorkingStack(e);
    const i = d.convertNodeToUsjDocumentLocation(e, r);
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
    const r = b(t) ? this.findParent(e) : void 0;
    if (!r && b(t))
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
    const i = this.getVerseRefForIndexInUsfm(r.indexInUsfm, t), s = this.getIndexInUsfmForVerseRef(i);
    return {
      verseRef: i,
      // Final USFM verse offset is the fragment's location relative to the verse plus whatever
      // offset is in the USJ location
      offset: r.indexInUsfm - s + d.getOffsetInUsjDocumentLocation(e)
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
    const t = Object.keys(this.indicesInUsfmByVerseRef), r = t.length === 0 || t.length === 1 && t[0] === M, i = r ? M : e;
    if (!this.indicesInUsfmByVerseRef[i])
      throw new Error(
        `Book ID ${e} not found in USJ! ${r ? `There seems to be no USJ content because there is no content in ${M} either` : `Book IDs in USJ: ${JSON.stringify(t)}`}`
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
    const r = Object.entries(this.indicesInUsfmByVerseRef);
    let i = 0, s, o = !1;
    for (; !o && i < r.length; ) {
      const [c, u] = r[i];
      if (u) {
        const h = Object.entries(u);
        let f = 0;
        for (; !o && f < h.length; ) {
          const [p, m] = h[f];
          if (m) {
            const y = Object.entries(m);
            let N = 0;
            for (; !o && N < y.length; ) {
              const [w, k] = y[N];
              if (k !== void 0) {
                if (e < k) {
                  if (!s)
                    throw new Error(
                      `Could not find verse ref for index in USFM ${e} less than the first known index ${k}`
                    );
                  o = !0;
                  break;
                }
                if (s = {
                  book: c,
                  chapterNum: parseInt(p, 10),
                  verseNum: parseInt(w, 10)
                }, e === k) {
                  o = !0;
                  break;
                }
              }
              N += 1;
            }
          }
          f += 1;
        }
      }
      i += 1;
    }
    if (!s)
      throw new Error(`Did not find any verse refs while looking for index in USFM ${e}`);
    if (s.book === M) {
      if (!t)
        throw new Error(
          `Could not find book ID and no book ID provided when finding USFM verse ref for index in USFM ${e}`
        );
      s.book = t;
    }
    const a = this.getIndexInUsfmForVerseRef(s), l = this.fragmentsByIndexInUsfm.get(a);
    return l && d.isFragmentAMarker(l.fragment) && l.fragment.type === I && l.fragment.number && l.fragment.number !== `${s.verseNum}` && (s.verse = l.fragment.number), s;
  }
  usfmVerseLocationToIndexInUsfm(e) {
    const { verseRef: t, offset: r } = d.usfmVerseLocationToUsfmVerseRefVerseLocation(e);
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
    const { verseRef: t, offset: r } = d.usfmVerseLocationToUsfmVerseRefVerseLocation(e), i = this.usfmVerseLocationToIndexInUsfm(e), { value: s } = this.fragmentsByIndexInUsfm.findClosestLessThanOrEqual(
      i
    ) ?? {
      value: void 0
    };
    if (!s)
      throw new Error(
        `Somehow, did not find anything at index in verse ${r} or below in ${t.book} ${t.chapterNum}:${t.verseNum}. Not sure how this would happen.`
      );
    const o = i - s.indexInUsfm;
    return {
      ...s.nodeAndDocumentLocation,
      documentLocation: d.moveUsjDocumentLocationToNewOffset(
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
      if (!b(e.node)) return !1;
      t = e.documentLocation;
    }
    return "jsonPath" in t ? "offset" in t : !1;
  }
  static isUsjDocumentLocationForNode(e) {
    let t = e;
    if ("node" in e) {
      if (b(e.node))
        return d.isUsjDocumentLocationForTextContent(e);
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
    let i = "", s = 0, o = 0, a = -1;
    const l = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    ), c = l.length > 0 ? {
      ...l[l.length - 1]
    } : void 0;
    if (d.findNextMatchingNodeUsingWorkingStack(
      e.node,
      l,
      $,
      (p, m) => {
        if (typeof p != "string") return !1;
        let y = p;
        const N = m[m.length - 1];
        if (c && d.areStackItemsShallowEqual(N, c)) {
          if (!("offset" in e.documentLocation))
            throw new Error(
              `Somehow 'offset' was not in text content string document location. This should not happen. ${JSON.stringify(e.documentLocation)}`
            );
          y = p.substring(e.documentLocation.offset), o += e.documentLocation.offset;
        }
        s += y.length, i = `${i}${y}`;
        const w = i.indexOf(t);
        return w < 0 ? (o += i.length, i.length > t.length && (i = i.substring(i.length - t.length)), o -= i.length, s > r) : (a = o + w, !0);
      }
    ), a < 0) return;
    s = 0;
    let u = 0, h = [];
    const f = d.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      $,
      (p, m) => typeof p != "string" || (s += p.length, s < a + 1) ? !1 : (u = a - s + p.length, h = m, !0)
    );
    if (!f) throw new Error("Internal error: inconsistent search results");
    if (!b(f))
      throw new Error(
        `Somehow found non-string node while searching for strings: ${JSON.stringify(f)}`
      );
    return {
      node: f,
      documentLocation: {
        jsonPath: d.convertWorkingStackToJsonPath(h),
        offset: u
      }
    };
  }
  search(e) {
    const t = [];
    if (this.usj.content.length === 0) return t;
    const r = {
      node: this.usj,
      documentLocation: {
        jsonPath: "$"
      }
    }, i = [], s = new H();
    let o = 0, a = r.node;
    for (; a !== void 0; )
      a = d.findNextMatchingNodeUsingWorkingStack(
        r.node,
        this.convertJsonPathToWorkingStack(r.documentLocation.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (u, h) => (typeof u != "string" || (i.push(u), s.set(o, {
          node: u,
          documentLocation: {
            offset: 0,
            jsonPath: d.convertWorkingStackToJsonPath(h)
          }
        }), o += u.length), !1)
      );
    const l = i.join("");
    let c = e.exec(l);
    for (; c; ) {
      if (c[0].length > 0) {
        if (c.index < 0 || c.index >= l.length)
          throw new Error(`Match index out of bounds: ${c.index}`);
        const u = s.findClosestLessThanOrEqual(c.index);
        if (!u)
          throw new Error(`Internal error: no starting node found for index ${c.index}`);
        const h = {
          node: u.value.node,
          documentLocation: {
            jsonPath: u.value.documentLocation.jsonPath,
            offset: c.index - u.key
          }
        }, f = s.findClosestLessThanOrEqual(
          c.index + c[0].length - 1
        );
        if (!f)
          throw new Error(`Internal error: no ending node found for index ${c.index}`);
        const p = {
          node: f.value.node,
          documentLocation: {
            jsonPath: f.value.documentLocation.jsonPath,
            offset: c.index + c[0].length - f.key
          }
        };
        t.push({ text: c[0], start: h, end: p });
      }
      if (!e.global) break;
      c = e.exec(l);
    }
    return t;
  }
  // #endregion Search for text from a certain point
  // #region Extract text from a node + JSONPath + offset
  extractText(e, t) {
    let r = "", i = "offset" in e.documentLocation ? e.documentLocation.offset : 0, s = 0;
    return d.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      $,
      (o) => {
        if (typeof o != "string") return !1;
        if (i >= o.length)
          return i -= o.length, !1;
        let a = o;
        if (i > 0 && (a = a.substring(i), i = 0), s + a.length < t)
          return s += a.length, r = `${r}${a}`, !1;
        const l = t - s;
        return r = `${r}${a.substring(0, l - 1)}`, !0;
      }
    ), r;
  }
  extractTextBetweenPoints(e, t, r = 100) {
    let i = "";
    return d.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      $,
      (s, o) => s === t.node && (typeof s == "object" || t.documentLocation.jsonPath === d.convertWorkingStackToJsonPath(o)) ? !0 : typeof s != "string" ? !1 : (i = `${i}${s}`, i.length > r && (i = i.substring(0, r)), i.length >= r)
    ), i;
  }
  // #endregion Extract text from a node + JSONPath + offset
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, t) {
    let r = 0;
    for (let i = e.length - 1; i >= 0; i--) {
      const s = e[i];
      t(s) ? (e.splice(i, 1), r += 1) : typeof s != "string" && s.content && (r += this.removeContentNodesFromArray(s.content, t));
    }
    return r;
  }
  removeContentNodes(e) {
    const t = d.removeContentNodesFromArray(this.usj.content, e);
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
    const r = b(e) ? e : (
      // Usj type has no `marker` property, but the Usj marker isn't really different than any other
      // marker with no `marker` property. It is appropriate to treat them the same to get the name
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      e.marker ?? e.type
    );
    let i = !1, s = this.getMarkerInfo(r);
    const o = (s == null ? void 0 : s.type) ?? (b(e) ? "" : e.type);
    let a = r;
    if (s != null && s.markerUsfm && (a = s.markerUsfm, s = this.getMarkerInfo(a)), !s) {
      if (b(e))
        throw new Error(`Unknown marker ${r} and no marker type provided`);
      s = { type: e.type }, i = !0, console.warn(
        `Unknown marker ${r}. Creating MarkerInfo to use: ${JSON.stringify(s)}`
      );
    }
    let l = s.type, c = this.markersMap.markerTypes[l];
    if (c != null && c.markerTypeUsfm && (l = c.markerTypeUsfm, c = this.markersMap.markerTypes[l]), !b(e) && e.type !== o && (!c || e.type !== c.markerTypeUsfm && e.type !== c.markerTypeUsx && e.type !== c.markerTypeUsj) && (console.warn(
      `Warning: Mismatching marker type in the USJ content ${e.type} vs marker type in the marker info ${s.type} for marker ${r}. Using the type from the USJ content.`
    ), l = e.type, c = this.markersMap.markerTypes[l], i = !0), !c)
      throw new Error(
        `Unknown marker type ${l} on marker ${r}! Cannot proceed.`
      );
    i && l === "para" && (c = { ...c, hasNewlineBefore: !1 });
    const u = [];
    s.attributeMarkers && s.attributeMarkers.forEach((f) => {
      const p = this.getMarkerInfo(f);
      p && "attributeMarkerAttributeName" in p && u.push([f, p]);
    });
    const h = e;
    if (t === "usfm" && l === "cell" && h.colspan) {
      const f = parseInt(h.colspan, 10), p = Mt.exec(r);
      if (p != null && p[1]) {
        const m = parseInt(p[1], 10);
        !Number.isNaN(m) && !Number.isNaN(f) && (a = `${r}-${m + f - 1}`, c = {
          ...c,
          skipOutputAttributeToUsfm: [
            ...c.skipOutputAttributeToUsfm ?? [],
            "colspan"
          ]
        });
      }
    }
    return {
      markerNameOriginal: r,
      markerName: a,
      markerInfo: s,
      markerType: l,
      markerTypeInfo: c,
      attributeMarkerInfoEntries: u
    };
  }
  /** Converts the text content of a marker to its equivalent in USFM */
  textContentToUsfm(e) {
    return {
      usfm: this.shouldAllowInvisibleCharacters ? e : e.replace(It, "~"),
      fragmentsInfo: [{ fragment: e, indexInUsfm: 0 }]
    };
  }
  /**
   * Merge an independent array of fragment info into an existing array of fragment info, offsetting
   * the indices of the new fragments so their locations start from the end of the string
   */
  static mergeFragmentsInfoIntoExistingArray(e, t, r) {
    e.forEach((i) => {
      const s = r + i.indexInUsfm;
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
    let r = "";
    const i = [], { markerName: s, markerInfo: o, markerType: a, markerTypeInfo: l, attributeMarkerInfoEntries: c } = this.getInfoForMarker(e), u = e;
    l.hasNewlineBefore && (r += `
`);
    const h = t ? l.nestedPrefix ?? "" : "";
    return i.push({ fragment: e, indexInUsfm: r.length }), r += a === "optbreak" ? "//" : `\\${h}`, a !== "optbreak" && (i.push({
      fragment: { attributeValueForKey: "marker", forMarker: e },
      indexInUsfm: r.length
    }), r += `${s}${a === "unmatched" ? "" : " "}`), o.leadingAttributes && o.leadingAttributes.forEach((f) => {
      const p = u[f];
      p && (i.push({
        fragment: { attributeValueForKey: f, forMarker: e },
        indexInUsfm: r.length
      }), r += `${p} `);
    }), o.textContentAttribute && u[o.textContentAttribute] && (i.push({
      fragment: { attributeValueForKey: o.textContentAttribute, forMarker: e },
      indexInUsfm: r.length
    }), r += `${u[o.textContentAttribute]} `), o.attributeMarkers && c.forEach(([f, p]) => {
      const m = u[p.attributeMarkerAttributeName];
      if (!m) return;
      const y = {
        type: p.type,
        marker: f,
        content: [m]
      }, N = [];
      r = this.addMarkerUsfmToString(
        r,
        y,
        e,
        N
      );
      const { usfm: w } = this.textContentToUsfm(m);
      i.push({
        fragment: {
          attributeValueForKey: p.attributeMarkerAttributeName,
          forMarker: e
        },
        indexInUsfm: r.length
      }), r += w, r = this.addMarkerUsfmToString(
        r,
        {
          isClosingMarker: !0,
          forMarker: y
        },
        e,
        N
      ), N.forEach((k) => {
        if (b(k.fragment) || "attributeKey" in k.fragment)
          throw new Error(
            `Attribute marker opening or closing markers generated a text content fragment or an attribute key fragment! This does not make sense. ${JSON.stringify(k)}`
          );
        if (d.isFragmentAMarker(k.fragment)) {
          i.push({
            ...k,
            fragment: {
              attributeMarker: p.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("attributeValueForKey" in k.fragment) {
          if (k.fragment.attributeValueForKey !== "marker")
            throw new Error(
              `Attribute marker opening or closing markers generated an attribute value fragment for a key that was not marker! This does not make sense. ${JSON.stringify(k)}`
            );
          i.push({
            ...k,
            fragment: {
              attributeKey: p.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("isClosingMarker" in k.fragment) {
          const { isClosingMarker: F, ...A } = k.fragment, Ne = {
            ...A,
            forMarker: e,
            attributeMarkerClosingMarker: p.attributeMarkerAttributeName
          };
          i.push({
            ...k,
            fragment: Ne
          });
          return;
        }
        throw new Error(
          `Attribute marker opening or closing markers generated an unrecognized fragment: ${JSON.stringify(k)}`
        );
      }), !this.markersMap.isSpaceAfterAttributeMarkersContent && p.hasStructuralSpaceAfterCloseAttributeMarker && (r += " ");
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
      markerInfo: s,
      markerType: o,
      markerTypeInfo: a,
      attributeMarkerInfoEntries: l
    } = this.getInfoForMarker(e), c = Object.keys(e).filter((m) => {
      var y, N;
      return !(m === "type" || m === "marker" || m === "content" || m === "closed" || (y = a.skipOutputAttributeToUsfm) != null && y.includes(m) || (N = s.leadingAttributes) != null && N.includes(m) || s.textContentAttribute === m || l.some(
        ([, w]) => w.attributeMarkerAttributeName === m
      ));
    }), u = e;
    if (a.isCloseable && s.independentClosingMarkers && s.independentClosingMarkers.length > 0)
      throw new Error(
        `Marker ${i} is intended to have a normal closing marker and independent closing markers. As of writing this code, there is no known syntax for this situation in USFM. Cannot proceed.`
      );
    let h = !0;
    if ((u.closed === "false" || s.isClosingMarkerOptional && !this.markersMap.shouldOptionalClosingMarkersBePresent && u.closed !== "true") && (h = !1), s.independentClosingMarkers && s.independentClosingMarkers.length > 0 && h) {
      const m = {
        type: o,
        marker: s.independentClosingMarkers[0],
        // Put all the closing marker attributes on here since we don't really have a better place
        // to put them and might as well
        ...Object.fromEntries(
          c.map((A) => [
            A,
            u[A]
          ])
        )
      };
      let y = "";
      const N = [], { usfm: w, fragmentsInfo: k } = this.openingMarkerToUsfm(m, t), F = k.find((A) => d.isFragmentAMarker(A.fragment));
      if (!F)
        throw new Error(
          `Could not find opening fragment info for independent closing marker ${JSON.stringify(
            m
          )}. Fragments info generated: ${JSON.stringify(k)}`
        );
      return N.push({
        ...F,
        fragment: { isClosingMarker: !0, forMarker: e }
      }), y += w, r !== m.marker && (y = this.addMarkerUsfmToString(
        y,
        {
          isClosingMarker: !0,
          forMarker: m
        },
        t
      )), { usfm: y, fragmentsInfo: N };
    }
    let f = "";
    const p = [];
    if (c.length > 0 && (f += "|", c.length === 1 && c[0] === s.defaultAttribute ? (p.push({
      fragment: { attributeValueForKey: s.defaultAttribute, forMarker: e },
      indexInUsfm: f.length
    }), f += u[s.defaultAttribute]) : c.forEach((m, y) => {
      const N = o === "figure" && m === "file" ? "src" : m;
      y > 0 && (f += " "), p.push({
        fragment: { attributeKey: m, forMarker: e },
        indexInUsfm: f.length
      }), f += `${N}="`, p.push({
        fragment: { attributeValueForKey: m, forMarker: e },
        indexInUsfm: f.length
      }), f += `${u[m]}"`;
    })), a.isCloseable && h) {
      const m = a.isClosingMarkerEmpty ? "" : i, y = t ? a.nestedPrefix ?? "" : "";
      p.push({
        fragment: { isClosingMarker: !0, forMarker: e },
        indexInUsfm: f.length
      }), f += `\\${y}${m}*`;
    }
    return { usfm: f, fragmentsInfo: p };
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
    let s = e, o, a;
    const { markerNameOriginal: l, markerType: c, markerTypeInfo: u } = this.getInfoForMarker(
      "isClosingMarker" in t ? t.forMarker : t
    );
    let h = !1;
    if (typeof r == "boolean")
      h = r;
    else if (r) {
      const { markerType: f } = this.getInfoForMarker(
        r
      );
      f === c && (h = !0);
    }
    if ("isClosingMarker" in t) {
      const { usfm: f, fragmentsInfo: p } = this.closingMarkerToUsfm(
        t.forMarker,
        h
      );
      a = p, o = f, u.isCloseable && u.isClosingMarkerEmpty && // No contents
      (!t.forMarker.content || t.forMarker.content.length === 0) && // No closing marker attributes
      !o.startsWith("|") && (s = d.removeEndSpace(s));
    } else {
      const { usfm: f, fragmentsInfo: p } = this.openingMarkerToUsfm(
        t,
        h
      );
      a = p, o = f;
    }
    if (o.startsWith(`
`) && (s.length === 0 ? (a = a.map((f) => ({
      ...f,
      indexInUsfm: f.indexInUsfm - 1
    })), o = o.substring(1)) : s = d.removeEndSpace(s)), this.markersMap.isSpaceAfterAttributeMarkersContent && l === "ca") {
      const f = s.lastIndexOf("\\");
      f >= 0 && e.substring(
        f + 1,
        f + 3
      ) === "c " && (s = d.removeEndSpace(s), s += `
 `);
    }
    return i && d.mergeFragmentsInfoIntoExistingArray(
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
    const { jsonPath: i, ...s } = e, { jsonPath: o, ...a } = t;
    return !r && !J(T.toPathArray(i), T.toPathArray(o)) ? !1 : J(s, a);
  }
  /** Find the fragment info corresponding to the specified USJ Document location. */
  findFragmentInfoAtUsjDocumentLocation(e) {
    const t = d.moveUsjDocumentLocationToNewOffset(e, 0);
    let r;
    const i = this.fragmentsByJsonPath.get(
      d.normalizeJsonPath(e.jsonPath)
    );
    if (i)
      return i.find((s) => d.areUsjDocumentLocationsEqual(
        s.nodeAndDocumentLocation.documentLocation,
        t,
        // We already compared the JSONPaths by looking in the map for this JSONPath
        !0
      ) ? (r = s, !0) : !1), r;
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
    const i = d.convertWorkingStackToJsonPath(t);
    return b(e) ? { jsonPath: i, offset: r } : { jsonPath: i };
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
    if (b(e) || d.isFragmentAMarker(e)) {
      const i = d.convertNodeToUsjDocumentLocation(
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
      const s = {
        jsonPath: d.convertWorkingStackToJsonPath(t),
        closingMarkerOffset: r
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("attributeValueForKey" in e) {
      const s = {
        jsonPath: d.convertWorkingStackAndPropertyToJsonPath(
          t,
          e.attributeValueForKey
        ),
        propertyOffset: r
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("attributeKey" in e) {
      const s = {
        jsonPath: d.convertWorkingStackToJsonPath(t),
        keyName: e.attributeKey,
        keyOffset: r
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("attributeMarker" in e) {
      const s = {
        jsonPath: d.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarker
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("attributeMarkerClosingMarker" in e) {
      const s = {
        jsonPath: d.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarkerClosingMarker,
        keyClosingMarkerOffset: r
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
  static transferFragmentsInfoArrayToMaps(e, t, r, i, s, o) {
    e.map((l) => {
      var u, h, f;
      if (typeof l.fragment == "object" && "type" in l.fragment) {
        const p = l.fragment;
        if (p.type === lt && p.code)
          r.bookId = p.code, r.chapterNum = 0, r.verseNum = 0, o[M] && (o[r.bookId] = o[M], delete o[M]);
        else if (p.type === ne && p.number) {
          const m = parseInt(p.number, 10);
          if (Number.isNaN(m))
            console.warn(
              `Found ${ne} type marker with number ${p.number}, but could not parse chapter number from it. Continuing using previous chapter number ${r.chapterNum}`
            );
          else {
            r.chapterNum = m, r.verseNum = 0;
            const y = o[r.bookId];
            y != null && y[0] && (y[r.chapterNum] = y[0], delete y[0]);
          }
        } else if (p.type === I && p.number) {
          const m = (u = St.exec(p.number)) == null ? void 0 : u[1];
          if (!m)
            console.warn(
              `Found ${I} type marker with number ${p.number}, but could not find starting verse number in it. Continuing using previous verse number ${r.verseNum}`
            );
          else {
            const y = parseInt(m, 10);
            Number.isNaN(y) ? console.warn(
              `Found ${I} type marker with number ${p.number}, but could not parse starting verse number from ${m}. Continuing using previous verse number ${r.verseNum}`
            ) : (f = (h = o[r.bookId]) == null ? void 0 : h[r.chapterNum]) != null && f[y] ? console.warn(`Found ${I} marker with existing number ${y} after
                  current ${I} number ${r.verseNum}! Not updating verse start index. All positions in this duplicate verse will be based on the current ${I} marker, not the new duplicate marker.`) : (y < r.verseNum && console.debug(
              `Found ${I} marker with number ${y} lower than current ${I} number ${r.verseNum}. Verses are out of order. There may be some issues.`
            ), r.verseNum = y);
          }
        }
      }
      return {
        ...l,
        // Determine the appropriate `UsjDocumentLocation` subtype based on what this fragment is
        nodeAndDocumentLocation: d.convertFragmentToUsjNodeAndDocumentLocation(
          l.fragment,
          t
        )
      };
    }).forEach((l) => {
      i.set(l.indexInUsfm, l);
      const c = l.nodeAndDocumentLocation.documentLocation.jsonPath, u = s.get(c);
      u ? u.push(l) : s.set(c, [l]), o[r.bookId] || (o[r.bookId] = {}), o[r.bookId][r.chapterNum] || (o[r.bookId][r.chapterNum] = {}), o[r.bookId][r.chapterNum][r.verseNum] === void 0 && (o[r.bookId][r.chapterNum][r.verseNum] = l.indexInUsfm);
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
    const t = new H(), r = /* @__PURE__ */ new Map(), i = {}, s = [], o = {
      bookId: M,
      chapterNum: 0,
      verseNum: 0
    };
    function a(u) {
      d.transferFragmentsInfoArrayToMaps(
        s,
        u,
        o,
        t,
        r,
        i
      );
    }
    let l;
    const c = [];
    return d.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      this.usj,
      // Working stack is empty since the top-level object doesn't have any parents
      [],
      // Don't skip anything
      [],
      (u, h) => {
        if (typeof u != "object") {
          const { usfm: p, fragmentsInfo: m } = this.textContentToUsfm(u);
          return d.mergeFragmentsInfoIntoExistingArray(
            m,
            s,
            e.length
          ), a(h), e += p, !1;
        }
        let f;
        return h.length > 0 && (f = h[h.length - 1].parent), "isClosingMarker" in u ? c.length > 0 && c[c.length - 1] === u.forMarker ? (c.pop(), !1) : (e = this.addMarkerUsfmToString(
          e,
          u,
          f,
          s
        ), a(h), u.forMarker.type === "book" && l && (e = this.addMarkerUsfmToString(e, l, f, s), a(h), l = void 0), !1) : this.shouldSkipOutputMarkerToUsfm(u) ? (c.push(u), !1) : d.isTopLevelUsjMarker(u, h) && !l ? (u.version !== "3.0" && (l = u), !1) : (e = this.addMarkerUsfmToString(e, u, f, s), a(h), !1);
      }
    ), e = `${d.removeEndSpace(e)}
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
  q as AsyncVariable,
  ne as CHAPTER_TYPE,
  jt as Collator,
  Ce as DateTimeFormat,
  Be as DocumentCombiner,
  qt as EventRollingTimeCounter,
  _e as FIRST_SCR_BOOK_NUM,
  Ze as FIRST_SCR_CHAPTER_NUM,
  Qe as FIRST_SCR_VERSE_NUM,
  We as LAST_SCR_BOOK_NUM,
  Cr as MODIFIER_KEYS,
  Fe as Mutex,
  Kt as MutexMap,
  Gt as NonValidatingDocumentCombiner,
  Ve as NumberFormat,
  j as PLATFORM_ERROR_VERSION,
  Oe as PlatformEventEmitter,
  Ht as PromiseChainingMap,
  it as Section,
  H as SortedNumberMap,
  Xt as SortedSet,
  Nt as THEME_STYLE_ELEMENT_ID,
  R as USFM_MARKERS_MAP_3_0,
  jr as USFM_MARKERS_MAP_PARATEXT_3_0,
  Yt as UnsubscriberAsyncList,
  d as UsjReaderWriter,
  I as VERSE_TYPE,
  xr as aggregateUnsubscriberAsyncs,
  Nr as aggregateUnsubscribers,
  Ur as applyThemeStylesheet,
  vr as areUsjContentsEqualExceptWhitespace,
  D as at,
  P as charAt,
  Zt as codePointAt,
  lr as collapseMiddleWords,
  tt as compareScrRefs,
  Jt as createSyncProxyForAsyncObject,
  Bt as debounce,
  C as deepClone,
  J as deepEqual,
  ur as defaultScrRef,
  ht as deserialize,
  Re as endsWith,
  ue as ensureArray,
  ir as escapeStringRegexp,
  Or as expandThemeContribution,
  Pr as formatBytes,
  $r as formatRelativeDate,
  Qt as formatReplacementString,
  qe as formatReplacementStringToArray,
  yr as formatScrRef,
  br as formatScrRefRange,
  Tr as formatTimeSpan,
  Vt as getAllObjectFunctionNames,
  et as getChaptersForBook,
  Er as getCurrentLocale,
  me as getDefaultCallerSequence,
  ce as getErrorMessage,
  Ir as getFormatCallerFunction,
  rt as getLocalizeKeyForScrollGroupId,
  gr as getLocalizeKeysForScrollGroupIds,
  dr as getLocalizedIdFromBookNumber,
  ut as getNthCaller,
  Mr as getPaneSizeLimits,
  kr as getSectionForBook,
  wt as getStylesheetForTheme,
  Lt as groupBy,
  Ar as htmlEncode,
  Ke as includes,
  U as indexOf,
  Rt as isErrorMessageAboutParatextBlockingInternetAccess,
  zt as isErrorMessageAboutRegistryAuthFailure,
  sr as isLocalizeKey,
  Wt as isPlatformError,
  Sr as isSerializable,
  b as isString,
  pt as isSubset,
  E as isWhiteSpace,
  Ge as lastIndexOf,
  bt as localizedStringsDocumentSchema,
  kt as menuDocumentSchema,
  Dt as newGuid,
  _t as newPlatformError,
  er as normalize,
  ee as normalizeScriptureSpaces,
  fr as offsetBook,
  pr as offsetChapter,
  hr as offsetVerse,
  tr as ordinalCompare,
  rr as padEnd,
  nr as padStart,
  gt as projectSettingsDocumentSchema,
  wr as sanitizeHtml,
  mr as scrRefToBBBCCC,
  W as scrRefToBBBCCCVVV,
  se as serialize,
  yt as settingsDocumentSchema,
  Y as slice,
  _ as split,
  fe as startsWith,
  v as stringLength,
  S as substring,
  vt as themeDocumentSchema,
  He as toArray,
  cr as toKebabCase,
  ar as transformAndEnsureRegExpArray,
  or as transformAndEnsureRegExpRegExpArray,
  De as wait,
  Ft as waitForDuration
};
//# sourceMappingURL=index.js.map
