var Se = Object.defineProperty;
var Ne = (r, e, t) => e in r ? Se(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var b = (r, e, t) => Ne(r, typeof e != "symbol" ? e + "" : e, t);
import { Mutex as Ee } from "async-mutex";
import { Canon as S, VerseRef as oe } from "@sillsdev/scripture";
import { USJ_TYPE as ce } from "@eten-tech-foundation/scripture-utilities";
import { length as we, indexOf as Ie, limit as de, substring as Pe, toArray as Ce, substr as Te } from "stringz";
import qe from "dompurify";
import { deepEqual as Ae } from "fast-equals";
import { JSONPath as q } from "jsonpath-plus";
const j = class j {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, t = 1e4) {
    b(this, "variableName");
    b(this, "promiseToValue");
    b(this, "timeoutId");
    b(this, "timeoutOccurred");
    b(this, "resolver");
    b(this, "rejecter");
    this.variableName = e, this.timeoutOccurred = !1, this.promiseToValue = new Promise((n, s) => {
      this.resolver = n, this.rejecter = s;
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
      j.verboseLoggingEnabled && console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
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
      j.verboseLoggingEnabled && console.debug(`${this.variableName} is being rejected now with reason: ${e}`), this.rejecter(e), this.complete();
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
b(j, "verboseLoggingEnabled", !1);
let H = j;
class Ft {
  constructor(e, t) {
    b(this, "collator");
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
class $e {
  constructor(e, t) {
    b(this, "dateTimeFormatter");
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
class je {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    b(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    b(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    b(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    b(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    b(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    b(this, "emit", (e) => {
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
function Ut() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (r) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~r) * 65536 >> r).toString(16).padStart(4, "0")
    )
  );
}
function v(r) {
  return typeof r == "string" || r instanceof String;
}
function $(r) {
  return JSON.parse(JSON.stringify(r));
}
function Rt(r, e = 300) {
  let t, n, s, i;
  return (...c) => (clearTimeout(t), n || (n = new Promise((d, l) => {
    s = d, i = l;
  })), t = setTimeout(async () => {
    try {
      s(await r(...c));
    } catch (d) {
      i(d);
    } finally {
      n = void 0;
    }
  }, e), n);
}
function Dt(r, e, t) {
  const n = /* @__PURE__ */ new Map();
  return r.forEach((s, i) => {
    const c = e(s, i), d = n.get(c), l = t ? t(s, c, i) : s;
    d ? d.push(l) : n.set(c, [l]);
  }), n;
}
function Oe(r) {
  return typeof r == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  r !== null && "message" in r && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof r.message == "string";
}
function Fe(r) {
  if (Oe(r)) return r;
  try {
    return new Error(JSON.stringify(r));
  } catch {
    return new Error(String(r));
  }
}
function le(r) {
  return Fe(r).message;
}
function Ue(r) {
  return new Promise((e) => setTimeout(e, r));
}
function Lt(r, e) {
  const t = Ue(e).then(() => {
  });
  return Promise.any([t, r()]);
}
function Bt(r, e = "obj") {
  const t = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(r).forEach((s) => {
    try {
      typeof r[s] == "function" && t.add(s);
    } catch {
    }
  });
  let n = Object.getPrototypeOf(r);
  for (; n && Object.getPrototypeOf(n); )
    Object.getOwnPropertyNames(n).forEach((s) => {
      try {
        typeof r[s] == "function" && t.add(s);
      } catch {
      }
    }), n = Object.getPrototypeOf(n);
  return t;
}
function Vt(r, e = {}) {
  return new Proxy(e, {
    get(t, n) {
      return n in t ? t[n] : async (...s) => (await r())[n](...s);
    }
  });
}
function Jt(r) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return v(r) ? r.includes(e) : le(r).includes(e);
}
function zt(r) {
  const e = "401 Unauthorized error while getting shared projects.", t = "User registration is not valid. Cannot retrieve resources from DBL.", n = v(r) ? r : le(r);
  return n.includes(e) || n.includes(t);
}
class Re {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, t) {
    b(this, "baseDocument");
    b(this, "contributions", /* @__PURE__ */ new Map());
    b(this, "latestOutput");
    b(this, "options");
    b(this, "onDidRebuildEmitter", new je());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    b(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = t, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? $(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
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
    let s = this.options.copyDocuments && t ? $(t) : t;
    s = this.transformContributionAfterValidation(e, s), this.contributions.set(e, s);
    try {
      return this.rebuild();
    } catch (i) {
      throw n ? this.contributions.set(e, n) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${i}`);
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
        ([n, s]) => this.contributions.set(n, s)
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
      let t = $(this.baseDocument);
      return t = this.transformFinalOutputBeforeValidation(t), this.validateOutput(t), this.latestOutput = t, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((t) => {
      e = De(
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
function K(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || Array.isArray(t)) && (e = !1);
  }), e;
}
function G(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || !Array.isArray(t)) && (e = !1);
  }), e;
}
function De(r, e, t) {
  const n = $(r);
  return e ? pe(n, $(e), t) : n;
}
function pe(r, e, t) {
  if (!e) return r;
  if (K(r, e)) {
    const n = r, s = e;
    Object.keys(s).forEach((i) => {
      if (Object.hasOwn(n, i)) {
        if (K(n[i], s[i]))
          n[i] = pe(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            n[i],
            s[i],
            t
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (G(n[i], s[i]))
          n[i] = n[i].concat(
            s[i]
          );
        else if (!t)
          throw new Error(`Cannot merge objects: key "${i}" already exists in the target object`);
      } else
        n[i] = s[i];
    });
  } else G(r, e) && r.push(...e);
  return r;
}
class Ht {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(e) {
    /** The ring buffer to store times */
    b(this, "ringBuffer");
    /** The size of the ring buffer */
    b(this, "bufferSize");
    /** The next location where a time will be written */
    b(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    b(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    b(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    b(this, "totalInstanceCount");
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
class Le extends Ee {
}
class Kt {
  constructor() {
    b(this, "mutexesByID", /* @__PURE__ */ new Map());
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
    return t || (t = new Le(), this.mutexesByID.set(e, t), t);
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
class Gt extends Re {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, t) {
    super(e, t);
  }
  get output() {
    return this.latestOutput;
  }
}
class Be {
  constructor(e, t) {
    b(this, "numberFormatter");
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
const Ve = Promise.resolve();
class Xt {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    b(this, "map", /* @__PURE__ */ new Map());
    b(this, "logger");
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
    const n = { promise: Ve }, s = t.catch((i) => this.logger.warn(`Error in promise for ${e}: ${i.message}`)).finally(() => {
      this.map.get(e) === n.promise && this.map.delete(e);
    });
    n.promise = s, this.map.set(e, s);
  }
}
class X {
  constructor() {
    b(this, "map", /* @__PURE__ */ new Map());
    b(this, "sortedKeys", []);
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
    const n = this.sortedKeys[t], s = this.map.get(n);
    if (s !== void 0)
      return { key: n, value: s };
  }
  binarySearchLessThanOrEqual(e) {
    let t = 0, n = this.sortedKeys.length - 1, s = -1;
    for (; t <= n; ) {
      const i = Math.floor((t + n) / 2);
      this.sortedKeys[i] <= e ? (s = i, t = i + 1) : n = i - 1;
    }
    return s;
  }
  binarySearchInsertIndex(e) {
    let t = 0, n = this.sortedKeys.length;
    for (; t < n; ) {
      const s = Math.floor((t + n) / 2);
      this.sortedKeys[s] < e ? t = s + 1 : n = s;
    }
    return t;
  }
}
class Yt {
  /**
   * Creates a new sorted set
   *
   * @param compareFn - Function used to determine the order of elements. Returns negative when a <
   *   b, zero when a = b, positive when a > b
   */
  constructor(e) {
    /** Internal storage for the sorted items */
    b(this, "items", []);
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
      const s = Math.floor((t + n) / 2);
      this.compareFn(this.items[s], e) < 0 ? t = s + 1 : n = s;
    }
    return t;
  }
}
class Wt {
  constructor(e = "Anonymous") {
    b(this, "unsubscribers", /* @__PURE__ */ new Set());
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
    return this.unsubscribers.clear(), t.every((n, s) => (n || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${s} failed!`), n));
  }
}
const F = 1;
function Zt(r) {
  if (!r) return { message: "", platformErrorVersion: F };
  if (v(r)) return { message: r, platformErrorVersion: F };
  if (typeof r == "object" && "message" in r && typeof r.message == "string") {
    const e = {
      message: r.message,
      platformErrorVersion: F
    };
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)), Object.defineProperty(e, "message", { enumerable: !0 }), "stack" in r && v(r.stack) && Object.defineProperty(e, "stack", { value: r.stack, enumerable: !0 }), "cause" in e && Object.defineProperty(e, "cause", { enumerable: !0 }), e;
  }
  return { cause: r, message: "", platformErrorVersion: F };
}
function Qt(r) {
  return !!r && typeof r == "object" && "platformErrorVersion" in r;
}
function ue(r) {
  return r ? Array.isArray(r) ? r : [r] : [];
}
function U(r, e) {
  if (!(e > _(r) || e < -_(r)))
    return R(r, e, 1);
}
function T(r, e) {
  return e < 0 || e > _(r) - 1 ? "" : R(r, e, 1);
}
function er(r, e) {
  if (!(e < 0 || e > _(r) - 1))
    return R(r, e, 1).codePointAt(0);
}
function Je(r, e, t = _(r)) {
  const n = Ge(r, e);
  return !(n === -1 || n + _(e) !== t);
}
function ze(r, e, t) {
  if (e < 0) return -1;
  if (t) {
    if (T(r, e) === "}" && T(r, e - 1) === "\\") return e;
    const i = O(r, "\\}", e);
    return i >= 0 ? i + 1 : i;
  }
  let n = e;
  const s = _(r);
  for (; n < s && (n = O(r, "}", n), !(n === -1 || T(r, n - 1) !== "\\")); )
    n += 1;
  return n >= s ? -1 : n;
}
function He(r, e) {
  const t = [];
  let n = 0, s = 0;
  function i(d, l, p) {
    const u = I(r, s, l), m = t.length > 0 && v(t[t.length - 1]) ? `${t.pop()}${u}` : u;
    v(d) ? t.push(`${m}${d}`) : (m && t.push(m), t.push(d)), s = l + p;
  }
  const c = _(r);
  for (; n < c; ) {
    switch (T(r, n)) {
      case "{":
        if (T(r, n - 1) !== "\\") {
          const d = ze(r, n, !1);
          if (d >= 0) {
            const l = I(r, n + 1, d), p = l in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[l]
            ) : l;
            i(p, n, d + 1 - n), n = d, s = d + 1;
          }
        } else
          i("{", n - 1, 2);
        break;
      case "}":
        T(r, n - 1) !== "\\" || i("}", n - 1, 2);
        break;
    }
    n += 1;
  }
  if (s < c) {
    const d = I(r, s);
    t.push(
      t.length > 0 && v(t[t.length - 1]) ? `${t.pop()}${d}` : d
    );
  }
  return t;
}
function tr(r, e) {
  return He(r, e).map((t) => `${t}`).join("");
}
function Ke(r, e, t = 0) {
  const n = I(r, t);
  return O(n, e) !== -1;
}
function O(r, e, t = 0) {
  return Ie(r, e, t);
}
function Ge(r, e, t) {
  let n = t === void 0 ? _(r) : t;
  n < 0 ? n = 0 : n >= _(r) && (n = _(r) - 1);
  for (let s = n; s >= 0; s--)
    if (R(r, s, _(e)) === e)
      return s;
  return -1;
}
function _(r) {
  return we(r);
}
function rr(r, e) {
  const t = e.toUpperCase();
  return t === "NONE" ? r : r.normalize(t);
}
function nr(r, e, t) {
  return r.localeCompare(e, "en", t);
}
function ir(r, e, t = " ") {
  return e <= _(r) ? r : de(r, e, t, "right");
}
function sr(r, e, t = " ") {
  return e <= _(r) ? r : de(r, e, t, "left");
}
function Y(r, e) {
  return e > r ? r : e < -r ? 0 : e < 0 ? e + r : e;
}
function W(r, e, t) {
  const n = _(r);
  if (e > n || t && (e > t && !(e >= 0 && e < n && t < 0 && t > -n) || t < -n))
    return "";
  const s = Y(n, e), i = t ? Y(n, t) : void 0;
  return I(r, s, i);
}
function Z(r, e, t) {
  const n = [];
  if (t !== void 0 && t <= 0)
    return [r];
  if (e === "") return Xe(r).slice(0, t);
  let s = e;
  (typeof e == "string" || e instanceof RegExp && !Ke(e.flags, "g")) && (s = new RegExp(e, "g"));
  const i = r.match(s);
  let c = 0;
  if (!i) return [r];
  for (let d = 0; d < (t ? t - 1 : i.length); d++) {
    const l = O(r, i[d], c), p = _(i[d]);
    if (n.push(I(r, c, l)), c = l + p, t !== void 0 && n.length === t)
      break;
  }
  return n.push(I(r, c)), n;
}
function he(r, e, t = 0) {
  return O(r, e, t) === t;
}
function R(r, e = 0, t = _(r) - e) {
  return Te(r, e, t);
}
function I(r, e, t = _(r)) {
  return Pe(r, e, t);
}
function Xe(r) {
  return Ce(r);
}
function ar(r) {
  return he(r, "%") && Je(r, "%");
}
function or(r) {
  if (typeof r != "string")
    throw new TypeError("Expected a string");
  return r.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function cr(r) {
  return r ? ue(r).map(
    (n) => Array.isArray(n) ? n.map((s) => new RegExp(s)) : new RegExp(n)
  ) : [];
}
function dr(r) {
  return r ? ue(r).map((n) => new RegExp(n)) : [];
}
const Ye = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function C(r) {
  return Ye.test(r);
}
function lr(r) {
  let e = "";
  for (let t = 0; t < r.length; t++) {
    const n = r[t];
    if (n === n.toUpperCase() && n !== n.toLowerCase()) {
      if (t > 0) {
        const i = r[t - 1];
        if (!(i === i.toUpperCase() && i !== i.toLowerCase()))
          e += "-";
        else if (t + 1 < r.length) {
          const d = r[t + 1];
          d === d.toLowerCase() && d !== d.toUpperCase() && (e += "-");
        }
      }
      e += n.toLowerCase();
    } else
      e += n;
  }
  return e;
}
function pr(r, e) {
  const t = r.split(/\s+/);
  if (t.length <= e * 2 || e < 1)
    return r;
  const n = t.slice(0, e), s = t.slice(-e);
  return [...n, "[...]", ...s].join(" ");
}
const B = ["chapter", "book", "para", "row", "sidebar", ce], We = "​", fe = [
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
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "XXA", fullNames: ["Extra A"], chapters: 1 },
  { shortName: "XXB", fullNames: ["Extra B"], chapters: 1 },
  { shortName: "XXC", fullNames: ["Extra C"], chapters: 1 },
  { shortName: "XXD", fullNames: ["Extra D"], chapters: 1 },
  { shortName: "XXE", fullNames: ["Extra E"], chapters: 1 },
  { shortName: "XXF", fullNames: ["Extra F"], chapters: 1 },
  { shortName: "XXG", fullNames: ["Extra G"], chapters: 1 },
  { shortName: "FRT", fullNames: ["Front Matter"], chapters: 1 },
  { shortName: "BAK", fullNames: ["Back Matter"], chapters: 1 },
  { shortName: "OTH", fullNames: ["Other Matter"], chapters: 1 },
  { shortName: "3ES", fullNames: ["3 Ezra *obsolete*"], chapters: 1 },
  // End of books TJ set to 1 chapter
  { shortName: "EZA", fullNames: ["Apocalypse of Ezra"], chapters: 12 },
  { shortName: "5EZ", fullNames: ["5 Ezra (Latin Prologue)"], chapters: 2 },
  { shortName: "6EZ", fullNames: ["6 Ezra (Latin Epilogue)"], chapters: 12 },
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "INT", fullNames: ["Introduction"], chapters: 1 },
  { shortName: "CNC", fullNames: ["Concordance "], chapters: 1 },
  { shortName: "GLO", fullNames: ["Glossary "], chapters: 1 },
  { shortName: "TDX", fullNames: ["Topical Index"], chapters: 1 },
  { shortName: "NDX", fullNames: ["Names Index"], chapters: 1 },
  // End of books TJ set to 1 chapter
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
], Ze = 1, Qe = fe.length - 1, et = 1, tt = 1, ur = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, rt = (r) => {
  var e;
  return ((e = fe[r]) == null ? void 0 : e.chapters) ?? -1;
}, hr = (r, e) => ({
  book: S.bookNumberToId(
    Math.max(
      Ze,
      Math.min(S.bookIdToNumber(r.book) + e, Qe)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), fr = (r, e) => ({
  ...r,
  chapterNum: Math.min(
    Math.max(et, r.chapterNum + e),
    rt(S.bookIdToNumber(r.book))
  ),
  verseNum: 1
}), mr = (r, e) => ({
  ...r,
  verseNum: Math.max(tt, r.verseNum + e)
});
async function gr(r, e, t) {
  const n = S.bookNumberToId(r);
  if (!he(Intl.getCanonicalLocales(e)[0], "zh"))
    return t({
      localizeKey: `LocalizedId.${n}`,
      languagesToSearch: [e]
    });
  const s = await t({
    localizeKey: `Book.${n}`,
    languagesToSearch: [e]
  }), i = Z(s, "-");
  return Z(i[0], "ÿ08")[0].trim();
}
function yr(r) {
  return new oe(S.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCC;
}
function Q(r) {
  return new oe(S.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCCVVV;
}
function nt(r, e) {
  return Q(r) - Q(e);
}
function it(r) {
  return `%scrollGroup_${r}%`;
}
function kr(r) {
  return r.map((e) => it(e));
}
function me(r, e) {
  switch (e) {
    case "English":
      return S.bookIdToEnglishName(r.book);
    case "id":
    case void 0:
      return r.book;
    default:
      return e;
  }
}
function st(r, e) {
  const t = me(r, e == null ? void 0 : e.optionOrLocalizedBookName), n = (e == null ? void 0 : e.bookChapterSeparator) ?? " ", s = (e == null ? void 0 : e.chapterVerseSeparator) ?? ":";
  return `${t}${n}${r.chapterNum}${s}${r.verseNum}`;
}
function br(r, e, t, n) {
  return st(r, {
    optionOrLocalizedBookName: e,
    chapterVerseSeparator: t,
    bookChapterSeparator: n
  });
}
function at(r, e) {
  const t = r.verseNum < 0 ? "" : `${e ?? ":"}${r.verseNum}`;
  return r.chapterNum < 0 ? "" : `${r.chapterNum}${t}`;
}
function ee(r, e) {
  const t = me(r, e == null ? void 0 : e.optionOrLocalizedBookName), n = at(
    r,
    e == null ? void 0 : e.chapterVerseSeparator
  );
  return `${t}${t && n ? (e == null ? void 0 : e.bookChapterSeparator) ?? " " : ""}${n}`;
}
function vr(r, e, t) {
  const n = ee(r, t);
  if (nt(r, e) === 0) return n;
  const s = r.book === e.book && !(t != null && t.repeatBookName) ? "" : (t == null ? void 0 : t.endRefOptionOrLocalizedBookName) ?? (t == null ? void 0 : t.optionOrLocalizedBookName), i = ee(e, {
    ...t,
    optionOrLocalizedBookName: s
  });
  return `${n}${(t == null ? void 0 : t.rangeSeparator) ?? " - "}${i}`;
}
var ot = /* @__PURE__ */ ((r) => (r.OT = "OT", r.NT = "NT", r.DC = "DC", r.Extra = "Extra", r))(ot || {});
const Mr = (r) => {
  if (S.isBookOT(r)) return "OT";
  if (S.isBookNT(r)) return "NT";
  if (S.isBookDC(r)) return "DC";
  if (S.isExtraMaterial(r)) return "Extra";
  throw new Error(`Unknown section for book: ${r}`);
}, ct = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function te(r) {
  return ct.test(r);
}
const dt = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function lt(r) {
  return dt.test(r);
}
function re(r) {
  let e = "", t = !1, n = "\0";
  for (let s = 0; s < r.length; s += 1) {
    const i = r[s];
    i.charCodeAt(0) < 32 ? (t || (e += " "), t = !0) : !t && i === We && s + 1 < r.length && te(r[s + 1]) || (te(i) ? (t || (e += i), t = !0) : lt(i) && n === i || (e += i, t = !1)), n = i;
  }
  return e;
}
function ne(r) {
  return !r || r.length === 0 ? !0 : r.length === 1 && (r[0] === void 0 || r[0] === "");
}
function ie(r, e) {
  if (!e || !B.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(r)} does not have a content array! This should not happen!`
    );
  return r === e.content[e.content.length - 1];
}
function ge(r, e, t, n) {
  if (!r && !t) return !0;
  if (!r || !t) return !1;
  const s = v(r), i = v(t);
  if (s && i) {
    const c = re(r), d = re(t);
    if (c !== d) {
      if (!C(U(c, -1) ?? "") && !C(U(d, -1) ?? "") || !ie(r, e) || !ie(t, n)) return !1;
      let l = c;
      for (; C(U(l, -1) ?? ""); ) l = W(l, 0, -1);
      let p = d;
      for (; C(U(p, -1) ?? ""); ) p = W(p, 0, -1);
      if (l !== p) return !1;
    }
  } else if (!s && !i) {
    const c = r, d = t, l = Object.keys(c).filter(
      (m) => m !== "content"
    );
    if (l.length !== Object.keys(d).filter((m) => m !== "content").length || l.some((m) => !(m in d) || c[m] !== d[m])) return !1;
    const p = ne(c.content), u = ne(d.content);
    if (p !== u) return !1;
    if (!p && !u) {
      let m = c.content, h = d.content;
      const f = m[m.length - 1];
      B.includes(c.type) && v(f) && C(f) && (m = m.slice(0, -1));
      const g = h[h.length - 1];
      if (B.includes(d.type) && v(g) && C(g) && (h = h.slice(0, -1)), m.length !== h.length) return !1;
      for (let k = 0; k < m.length; k += 1)
        if (!ge(m[k], c, h[k], d))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function xr(r, e) {
  return ge(r, void 0, e, void 0);
}
const _r = (r) => (...e) => r.map((n) => n(...e)).every((n) => n), Sr = (r) => async (...e) => {
  const t = r.map(async (n) => n(...e));
  return (await Promise.all(t)).every((n) => n);
}, pt = "book", se = "chapter", E = "verse", w = "***";
var a = /* @__PURE__ */ ((r) => (r.FileIdentification = "FileIdentification", r.Headers = "Headers", r.Remarks = "Remarks", r.Introduction = "Introduction", r.DivisionMarks = "DivisionMarks", r.Paragraphs = "Paragraphs", r.Poetry = "Poetry", r.TitlesHeadings = "TitlesHeadings", r.Tables = "Tables", r.CenterTables = "CenterTables", r.RightTables = "RightTables", r.Lists = "Lists", r.Footnotes = "Footnotes", r.CrossReferences = "CrossReferences", r.SpecialText = "SpecialText", r.CharacterStyling = "CharacterStyling", r.Breaks = "Breaks", r.SpecialFeatures = "SpecialFeatures", r.PeripheralReferences = "PeripheralReferences", r.PeripheralMaterials = "PeripheralMaterials", r.Uncategorized = "Uncategorized", r))(a || {}), o = /* @__PURE__ */ ((r) => (r.Paragraph = "Paragraph", r.Character = "Character", r.Note = "Note", r.Unknown = "Unknown", r))(o || {});
const Nr = {
  id: {
    category: a.FileIdentification,
    type: o.Paragraph,
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
    category: a.FileIdentification,
    type: o.Paragraph,
    description: "%markerMenu_marker_usfm_description%",
    hasEndMarker: !1,
    children: void 0
  },
  ide: {
    category: a.FileIdentification,
    type: o.Paragraph,
    description: "%markerMenu_marker_ide_description%",
    hasEndMarker: !1,
    children: {
      Remarks: ["rem", "sts"]
    }
  },
  h: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_h_description%",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h1: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_h1_description%",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h2: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_h2_description%",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h3: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_h3_description%",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  toc1: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_toc1_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toc2: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_toc2_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toc3: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_toc3_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toca1: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_toca1_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toca2: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_toca2_description%",
    hasEndMarker: !1,
    children: void 0
  },
  toca3: {
    category: a.Headers,
    type: o.Paragraph,
    description: "%markerMenu_marker_toca3_description%",
    hasEndMarker: !1,
    children: void 0
  },
  rem: {
    category: a.Remarks,
    type: o.Paragraph,
    description: "%markerMenu_marker_rem_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sts: {
    category: a.Remarks,
    type: o.Paragraph,
    description: "%markerMenu_marker_sts_description%",
    hasEndMarker: !1,
    children: void 0
  },
  restore: {
    category: a.Remarks,
    type: o.Paragraph,
    description: "%markerMenu_marker_restore_description%",
    hasEndMarker: !1,
    children: void 0
  },
  imt: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_imt_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt1: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_imt1_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt2: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_imt2_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt3: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_imt3_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt4: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_imt4_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_imte_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte1: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_imte1_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte2: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_imte2_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  is: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_is_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"],
      CharacterStyling: ["no"]
    }
  },
  is1: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_is1_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  is2: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_is2_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  iot: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_iot_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CharacterStyling: ["no"]
    }
  },
  io: {
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Character,
    description: "%markerMenu_marker_ior_description%",
    hasEndMarker: !0,
    children: void 0
  },
  ip: {
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_ib_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"]
    }
  },
  iq: {
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
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
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_iex_description%",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CharacterStyling: ["no"]
    }
  },
  iqt: {
    category: a.Introduction,
    type: o.Character,
    description: "%markerMenu_marker_iqt_description%",
    hasEndMarker: !0,
    children: void 0
  },
  ie: {
    category: a.Introduction,
    type: o.Paragraph,
    description: "%markerMenu_marker_ie_description%",
    hasEndMarker: !1,
    children: void 0
  },
  c: {
    category: a.DivisionMarks,
    type: o.Paragraph,
    description: "%markerMenu_marker_c_description%",
    hasEndMarker: !1,
    children: void 0
  },
  ca: {
    category: a.DivisionMarks,
    type: o.Character,
    description: "%markerMenu_marker_ca_description%",
    hasEndMarker: !0,
    children: void 0
  },
  cp: {
    category: a.DivisionMarks,
    type: o.Paragraph,
    description: "%markerMenu_marker_cp_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"]
    }
  },
  cl: {
    category: a.DivisionMarks,
    type: o.Paragraph,
    description: "%markerMenu_marker_cl_description%",
    hasEndMarker: !1,
    children: void 0
  },
  cd: {
    category: a.DivisionMarks,
    type: o.Paragraph,
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
    category: a.DivisionMarks,
    type: o.Character,
    description: "%markerMenu_marker_v_description%",
    hasEndMarker: !1,
    children: void 0
  },
  va: {
    category: a.DivisionMarks,
    type: o.Character,
    description: "%markerMenu_marker_va_description%",
    hasEndMarker: !0,
    children: void 0
  },
  vp: {
    category: a.DivisionMarks,
    type: o.Character,
    description: "%markerMenu_marker_vp_description%",
    hasEndMarker: !0,
    children: void 0
  },
  p: {
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
    description: "%markerMenu_marker_cls_description%",
    hasEndMarker: !1,
    children: {
      SpecialText: ["tl", "sig", "pn", "png", "addpn", "add"]
    }
  },
  pmo: {
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Paragraphs,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Character,
    description: "%markerMenu_marker_qs_description%",
    hasEndMarker: !0,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  qa: {
    category: a.Poetry,
    type: o.Paragraph,
    description: "%markerMenu_marker_qa_description%",
    hasEndMarker: !1,
    children: void 0
  },
  qac: {
    category: a.Poetry,
    type: o.Character,
    description: "%markerMenu_marker_qac_description%",
    hasEndMarker: !0,
    children: void 0
  },
  qm: {
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.Poetry,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_mt_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt1: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_mt1_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt2: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_mt2_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt3: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_mt3_description%",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt4: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_mt4_description%",
    hasEndMarker: !1,
    children: void 0
  },
  mte: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_mte_description%",
    hasEndMarker: !1,
    children: void 0
  },
  mte1: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_mte1_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte2"]
    }
  },
  mte2: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_mte2_description%",
    hasEndMarker: !1,
    children: void 0
  },
  ms: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_ms3_description%",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe"]
    }
  },
  mr: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_mr_description%",
    hasEndMarker: !1,
    children: void 0
  },
  s: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_sr_description%",
    hasEndMarker: !1,
    children: void 0
  },
  r: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_r_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sp: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
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
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_sd_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sd1: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_sd1_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sd2: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_sd2_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sd3: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_sd3_description%",
    hasEndMarker: !1,
    children: void 0
  },
  sd4: {
    category: a.TitlesHeadings,
    type: o.Paragraph,
    description: "%markerMenu_marker_sd4_description%",
    hasEndMarker: !1,
    children: void 0
  },
  lh: {
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Paragraph,
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
    category: a.Lists,
    type: o.Character,
    description: "%markerMenu_marker_litl_description%",
    hasEndMarker: !0,
    children: void 0
  },
  lik: {
    category: a.Lists,
    type: o.Character,
    description: "%markerMenu_marker_lik_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv: {
    category: a.Lists,
    type: o.Character,
    description: "%markerMenu_marker_liv_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv1: {
    category: a.Lists,
    type: o.Character,
    description: "%markerMenu_marker_liv1_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv2: {
    category: a.Lists,
    type: o.Character,
    description: "%markerMenu_marker_liv2_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv3: {
    category: a.Lists,
    type: o.Character,
    description: "%markerMenu_marker_liv3_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv4: {
    category: a.Lists,
    type: o.Character,
    description: "%markerMenu_marker_liv4_description%",
    hasEndMarker: !0,
    children: void 0
  },
  liv5: {
    category: a.Lists,
    type: o.Character,
    description: "%markerMenu_marker_liv5_description%",
    hasEndMarker: !0,
    children: void 0
  },
  f: {
    category: a.Footnotes,
    type: o.Note,
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
    category: a.Footnotes,
    type: o.Note,
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
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fr_description%",
    hasEndMarker: !0,
    children: void 0
  },
  ft: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_ft_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fk: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fk_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fq: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fq_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fqa: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fqa_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fl: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fl_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fw: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fw_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fp: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fp_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fv: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fv_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fdc: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fdc_description%",
    hasEndMarker: !0,
    children: void 0
  },
  fm: {
    category: a.Footnotes,
    type: o.Character,
    description: "%markerMenu_marker_fm_description%",
    hasEndMarker: !0,
    children: void 0
  },
  x: {
    category: a.CrossReferences,
    type: o.Note,
    description: "%markerMenu_marker_x_description%",
    hasEndMarker: !0,
    children: {
      CrossReferences: ["xo", "xop", "xt", "xta", "xk", "xq", "xot", "xnt", "xdc"],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  xo: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_xo_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xop: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_xop_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xt: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_xt_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xta: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_xta_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xk: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_xk_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xq: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_xq_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xot: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_xot_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xnt: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_xnt_description%",
    hasEndMarker: !0,
    children: void 0
  },
  xdc: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_xdc_description%",
    hasEndMarker: !0,
    children: void 0
  },
  rq: {
    category: a.CrossReferences,
    type: o.Character,
    description: "%markerMenu_marker_rq_description%",
    hasEndMarker: !0,
    children: void 0
  },
  qt: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_qt_description%",
    hasEndMarker: !0,
    children: void 0
  },
  nd: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_nd_description%",
    hasEndMarker: !0,
    children: void 0
  },
  tl: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_tl_description%",
    hasEndMarker: !0,
    children: void 0
  },
  dc: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_dc_description%",
    hasEndMarker: !0,
    children: void 0
  },
  bk: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_bk_description%",
    hasEndMarker: !0,
    children: void 0
  },
  sig: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_sig_description%",
    hasEndMarker: !0,
    children: void 0
  },
  pn: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_pn_description%",
    hasEndMarker: !0,
    children: void 0
  },
  png: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_png_description%",
    hasEndMarker: !0,
    children: void 0
  },
  addpn: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_addpn_description%",
    hasEndMarker: !0,
    children: void 0
  },
  wj: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_wj_description%",
    hasEndMarker: !0,
    children: void 0
  },
  k: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_k_description%",
    hasEndMarker: !0,
    children: void 0
  },
  sls: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_sls_description%",
    hasEndMarker: !0,
    children: void 0
  },
  ord: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_ord_description%",
    hasEndMarker: !0,
    children: void 0
  },
  add: {
    category: a.SpecialText,
    type: o.Character,
    description: "%markerMenu_marker_add_description%",
    hasEndMarker: !0,
    children: void 0
  },
  lit: {
    category: a.SpecialText,
    type: o.Paragraph,
    description: "%markerMenu_marker_lit_description%",
    hasEndMarker: !1,
    children: void 0
  },
  no: {
    category: a.CharacterStyling,
    type: o.Character,
    description: "%markerMenu_marker_no_description%",
    hasEndMarker: !0,
    children: void 0
  },
  it: {
    category: a.CharacterStyling,
    type: o.Character,
    description: "%markerMenu_marker_it_description%",
    hasEndMarker: !0,
    children: void 0
  },
  bd: {
    category: a.CharacterStyling,
    type: o.Character,
    description: "%markerMenu_marker_bd_description%",
    hasEndMarker: !0,
    children: void 0
  },
  bdit: {
    category: a.CharacterStyling,
    type: o.Character,
    description: "%markerMenu_marker_bdit_description%",
    hasEndMarker: !0,
    children: void 0
  },
  em: {
    category: a.CharacterStyling,
    type: o.Character,
    description: "%markerMenu_marker_em_description%",
    hasEndMarker: !0,
    children: void 0
  },
  sc: {
    category: a.CharacterStyling,
    type: o.Character,
    description: "%markerMenu_marker_sc_description%",
    hasEndMarker: !0,
    children: void 0
  },
  sup: {
    category: a.CharacterStyling,
    type: o.Character,
    description: "%markerMenu_marker_sup_description%",
    hasEndMarker: !0,
    children: void 0
  },
  pb: {
    category: a.Breaks,
    type: o.Paragraph,
    description: "%markerMenu_marker_pb_description%",
    hasEndMarker: !1,
    children: void 0
  }
};
function Er(r) {
  return qe.sanitize(r, {
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
function ye() {
  return Array.from({ length: 26 }, (r, e) => String.fromCharCode(97 + e));
}
function ut(r, e) {
  const t = e && e.length > 0 ? e : ye();
  return t[r % t.length];
}
function wr(r, e) {
  const t = e && e.length > 0 ? e : ye(), n = (() => {
    const s = /* @__PURE__ */ new Map();
    let i = 0;
    return r.forEach((c, d) => {
      c.caller === "+" && (s.set(d, ut(i, t)), i += 1);
    }), s;
  })();
  return (s, i) => {
    if (s === "+") {
      const c = n.get(i);
      return c || (console.warn(`Caller index ${i} out of range for '+' callers`), "?");
    }
    if (s !== "-")
      return s;
  };
}
function ht(r) {
  const e = [];
  if (!r || r.length === 0) return e;
  function t(n) {
    typeof n != "string" && (n.type === "note" ? e.push(n) : Array.isArray(n.content) && n.content.length > 0 && n.content.forEach(t));
  }
  return r.forEach(t), e;
}
function Ir(r, e = {}) {
  const {
    splitterThicknessPx: t = 4,
    secondaryPaneMinSizePx: n = 20,
    mainPaneMinSizePx: s = 60,
    absoluteMinPercent: i = 3,
    absoluteMaxPercent: c = 90
  } = e, d = r - t;
  let l, p;
  return d < n + s ? (l = i, p = c) : (p = Math.min(
    Math.floor((d - s) / d * 100),
    c
  ), l = Math.min(
    Math.max(Math.ceil(n / d * 100), i),
    p
  )), { minPercent: l, maxPercent: p };
}
function V(r, e) {
  return Ae(r, e);
}
function ft(r, e) {
  if (typeof r != typeof e) return !1;
  if (!r && !e) return !0;
  if (Array.isArray(r)) {
    const i = e, c = r;
    return i.length === 0 ? !0 : i.every((d) => c.includes(d));
  }
  if (typeof r != "object")
    return V(r, e);
  const t = e, n = r;
  let s = !0;
  return Object.keys(t).forEach((i) => {
    s && (Object.hasOwn(n, i) && ft(n[i], t[i]) || (s = !1));
  }), s;
}
function ae(r, e, t) {
  return JSON.stringify(r, (s, i) => {
    let c = i;
    return e && (c = e(s, c)), c === void 0 && (c = null), c;
  }, t);
}
function mt(r, e) {
  function t(s) {
    return Object.keys(s).forEach((i) => {
      s[i] === null ? s[i] = void 0 : typeof s[i] == "object" && (s[i] = t(s[i]));
    }), s;
  }
  const n = JSON.parse(r, e);
  if (n !== null)
    return typeof n == "object" ? t(n) : n;
}
function Pr(r) {
  try {
    const e = ae(r);
    return e === ae(mt(e));
  } catch {
    return !1;
  }
}
const Cr = (r) => r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function Tr() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0].replace(/@posix$/i, "") : new $e().resolvedOptions().locale;
}
function qr(r, e = 2) {
  if (r === 0) return "0 Bytes";
  const t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], n = Math.floor(Math.log(r) / Math.log(1024)), s = t[n];
  return `${new Be("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(r / 1024 ** n)} ${s}`;
}
const gt = 1e3, ke = 60, be = ke * 60, yt = be * 24;
function Ar(r, e, t = /* @__PURE__ */ new Date()) {
  const n = Math.floor((e.getTime() - t.getTime()) / gt), s = Math.round(n / yt);
  if (Math.abs(s) >= 1) return r.format(s, "day");
  const i = Math.round(n / be);
  if (Math.abs(i) >= 1) return r.format(i, "hour");
  const c = Math.round(n / ke);
  return Math.abs(c) >= 1 ? r.format(c, "minute") : r.format(n, "second");
}
function $r(r, e, t, n, s = {
  year: "numeric",
  month: "short",
  day: "numeric"
}) {
  const i = /* @__PURE__ */ new Date(), c = new Date(i);
  c.setDate(c.getDate() - 1);
  const d = r.getDate() === i.getDate() && r.getMonth() === i.getMonth() && r.getFullYear() === i.getFullYear(), l = r.getDate() === c.getDate() && r.getMonth() === c.getMonth() && r.getFullYear() === c.getFullYear();
  return d ? e : l ? t : r.toLocaleString(n, s);
}
const jr = /* @__PURE__ */ new Set([
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
function D(r) {
  r && Object.values(r).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && D(e.properties);
    }
  });
}
D(z);
const kt = {
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
Object.freeze(kt);
const bt = {
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
Object.freeze(bt);
const ve = {
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
D(ve);
const vt = {
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
  $defs: ve
};
Object.freeze(vt);
const Mt = {
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
Object.freeze(Mt);
const Me = {
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
D(Me);
const xt = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: Me
};
Object.freeze(xt);
const _t = "theme-styles";
function St(r, e) {
  return `${r ? `${r}-` : ""}${e}`;
}
function Or(r, e) {
  return Object.fromEntries(
    Object.entries(r).map(([n, s]) => [
      n,
      s ? Object.fromEntries(
        Object.entries(s).map(([i, c]) => {
          var d;
          return [
            i,
            c ? {
              ...c,
              // Add the derived properties
              themeFamilyId: n,
              type: i,
              id: St(n, i),
              cssVariables: {
                // Fill in the default css variables
                ...(d = e == null ? void 0 : e[i]) == null ? void 0 : d.cssVariables,
                ...c.cssVariables
              }
            } : void 0
          ];
        }).filter(([, i]) => !!i)
      ) : void 0
    ]).filter(([, n]) => !!n)
  );
}
function Nt(r) {
  return `
.${r.id} {
${Object.entries(r.cssVariables).map(([e, t]) => `  --${e}: ${t};`).join(`
`)}
}
`;
}
function Fr(r, e, t) {
  const n = e == null ? void 0 : e.dataset.themeId;
  n && this.document.body.classList.remove(n), this.document.body.classList.add(r.id), e && this.document.head.removeChild(e);
  const s = this.document.createElement("style");
  return s.id = `${_t}${t ? `-${t}` : ""}`, s.dataset.themeId = r.id, s.textContent = Nt(r), this.document.head.appendChild(s), s;
}
function xe(r) {
  return Object.freeze(r), r == null || Object.getOwnPropertyNames(r).forEach(function(t) {
    // Need to make sure to avoid null, which is an object type
    // eslint-disable-next-line no-null/no-null
    r[t] !== null && (typeof r[t] == "object" || typeof r[t] == "function") && !Object.isFrozen(r[t]) && xe(r[t]);
  }), r;
}
const J = xe({
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
}), Ur = Object.freeze({
  ...J,
  isSpaceAfterAttributeMarkersContent: !0,
  shouldOptionalClosingMarkersBePresent: !0
}), A = ["figure", "note", "sidebar", "table"];
Object.freeze(A);
const Et = /\u00A0/g, wt = /\w+(\d+)/, It = /(\d+)-?(\d+)?/;
class y {
  constructor(e, t) {
    b(this, "usj");
    b(this, "markersMap");
    b(this, "shouldAllowInvisibleCharacters");
    // Cached properties
    b(this, "parentMapInternal");
    b(this, "fragmentsByIndexInUsfmInternal");
    b(this, "fragmentsByJsonPathInternal");
    b(this, "indicesInUsfmByVerseRefInternal");
    b(this, "usfmInternal");
    this.usj = e;
    const { markersMap: n, shouldAllowInvisibleCharacters: s } = t ?? {};
    if (n)
      this.markersMap = n, y.areUsjVersionsCompatible(this.usj.version, this.markersMap.version) || console.warn(
        `Warning: USJ provided has version ${this.usj.version}, but provided markers map has version ${this.markersMap.version}. This may cause unexpected issues when transforming between formats.
USJ: ${JSON.stringify(
          this.usj
        )}`
      );
    else if (y.areUsjVersionsCompatible(this.usj.version, J.version))
      this.markersMap = J;
    else
      throw new Error(
        "USJ version is not 3.0 or 3.0.x! Not equipped to handle yet without passing in a markers map"
      );
    if (!this.markersMap.markersMapVersion.startsWith("1."))
      throw new Error(
        `Incompatible markers map version: ${this.markersMap.markersMapVersion}. This class only supports version 1.x.y`
      );
    this.shouldAllowInvisibleCharacters = s ?? !1;
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
    const t = q({ path: e, json: this.usj, wrap: !0 });
    if (t === void 0 || t.length === 0) return;
    if (!Array.isArray(t[0])) return t[0];
    const n = q({ path: e, json: this.usj, wrap: !1 });
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
    return typeof e == "object" && e.type === ce && t.length === 0;
  }
  /**
   * Determine if a fragment is a marker, not a text content string or some kind of position
   * fragment that isn't actually a marker e.g. closing marker fragment
   */
  static isFragmentAMarker(e) {
    return !v(e) && !("forMarker" in e);
  }
  // #endregion marker helper methods
  // #region Parent Maps
  static createParentMapInternal(e, t, n) {
    var s;
    n.set(e, t), e.content && n.set(e.content, e), (s = e.content) == null || s.forEach((i) => {
      typeof i == "object" && y.createParentMapInternal(i, e, n);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((t) => {
      typeof t == "object" && y.createParentMapInternal(t, this.usj, e);
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
    let s = e, i = n.get(s);
    for (; i !== void 0; ) {
      if (!i.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !i.content.find((c, d) => {
          if (c !== s) return !1;
          if (!i) throw new Error('undefined "tempParent" should not be possible');
          return t.unshift({ parent: i, index: d }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(s)}`);
      s = i, i = n.get(i);
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
    const t = q.toPathArray(e);
    return y.jsonPathArrayToJsonPath(t);
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
    return `${y.convertWorkingStackToJsonPath(e)}['${t}']`;
  }
  convertJsonPathToWorkingStack(e) {
    const t = [];
    if (e === "$") return t;
    const n = e.match(/content\[(\d+)\]/g);
    if (!n) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let s = this.usj;
    return n.forEach((i, c) => {
      const d = /(\d+)/.exec(i);
      if (!d) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const l = parseInt(d[0], 10);
      if (t.push({ parent: s, index: l }), c + 1 < n.length) {
        if (typeof s == "string" || !s.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(s)}`);
        const p = s.content[l];
        if (typeof p == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(p)}`);
        s = p;
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
    return ht((e = this.usj) == null ? void 0 : e.content);
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
  static findNextMatchingNodeOrClosingFragmentUsingWorkingStack(e, t, n, s) {
    var d;
    let i = e;
    const c = t.length === 0 ? e : t[0].parent;
    if (!v(c)) {
      if (n.includes(c.type)) return;
      let l;
      t.some((p) => {
        const u = p.parent.content[p.index];
        return !v(u) && n.includes(u.type) ? (l = u, !0) : !1;
      }), l && (i = l);
    }
    for (; i !== void 0; ) {
      const l = typeof i == "object" && n.includes(i.type);
      if (!l && s(i, t)) return i;
      if (!l && typeof i == "object" && (((d = i.content) == null ? void 0 : d.length) ?? 0) > 0)
        t.push({ parent: i, index: 0 }), [i] = i.content;
      else {
        if (!l) {
          const p = typeof i == "object" ? { isClosingMarker: !0, forMarker: i } : void 0;
          if (p && s(p, t))
            return p;
        }
        for (i = void 0; t.length > 0; ) {
          const p = t.pop();
          if (p)
            if (p.index + 1 < p.parent.content.length) {
              p.index += 1, t.push(p), i = p.parent.content[p.index];
              break;
            } else {
              const u = {
                isClosingMarker: !0,
                forMarker: p.parent
              };
              if (s(u, t)) return u;
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
  static findNextMatchingNodeUsingWorkingStack(e, t, n, s) {
    return this.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      e,
      t,
      n,
      (c, d) => typeof c == "object" && "isClosingMarker" in c ? !1 : s(c, d)
    );
  }
  findNextMatchingNode(e, t) {
    const n = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    );
    let s = n;
    const i = y.findNextMatchingNodeUsingWorkingStack(
      e.node,
      n,
      [],
      (c, d) => (s = d, t({
        node: c,
        documentLocation: y.convertNodeToUsjDocumentLocation(c, d)
      }))
    );
    if (i !== void 0)
      return {
        node: i,
        documentLocation: y.convertNodeToUsjDocumentLocation(
          i,
          s
        )
      };
  }
  // #endregion Walk the node tree
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return y.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion Node -> JSONPath
  // #region USJ node -> SerializedVerseRef + offset in USFM
  nodeToUsfmVerseRefVerseLocation(e, t, n) {
    const { documentLocation: s } = this.nodeToUsjNodeAndDocumentLocation(
      e,
      t
    );
    return this.usjDocumentLocationToUsfmVerseRefVerseLocation(s, n);
  }
  // #endregion USJ node -> SerializedVerseRef + offset in USFM
  // #region USJ node -> USJ location
  nodeToUsjNodeAndDocumentLocation(e, t) {
    var i;
    let n;
    if (v(e)) {
      if (t === void 0)
        throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
      const c = Array.isArray(t) ? this.parentMap.get(t) : t;
      if (c === void 0)
        throw new Error(`Cannot find parent for ${JSON.stringify(t)}`);
      n = this.createWorkingStack(c);
      const d = (i = c.content) == null ? void 0 : i.indexOf(e);
      if (d === void 0 || d < 0)
        throw new Error("Could not find index of node in parent for creating working stack");
      n.push({ parent: c, index: d });
    } else
      n = this.createWorkingStack(e);
    const s = y.convertNodeToUsjDocumentLocation(e, n);
    return {
      node: e,
      documentLocation: s
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
    const n = v(t) ? this.findParent(e) : void 0;
    if (!n && v(t))
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
    const { node: n, parent: s } = this.jsonPathToNodeAndParentIfString(e);
    return this.nodeToUsfmVerseRefVerseLocation(n, s, t);
  }
  usjDocumentLocationToUsfmVerseRefVerseLocation(e, t) {
    const n = this.findFragmentInfoAtUsjDocumentLocation(e);
    if (n === void 0)
      throw new Error(
        `Could not find fragment info at USJ document location while transforming to USFM verse location: ${JSON.stringify(
          e
        )}`
      );
    const s = this.getVerseRefForIndexInUsfm(n.indexInUsfm, t), i = this.getIndexInUsfmForVerseRef(s);
    return {
      verseRef: s,
      // Final USFM verse offset is the fragment's location relative to the verse plus whatever
      // offset is in the USJ location
      offset: n.indexInUsfm - i + y.getOffsetInUsjDocumentLocation(e)
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
    const t = Object.keys(this.indicesInUsfmByVerseRef), n = t.length === 0 || t.length === 1 && t[0] === w, s = n ? w : e;
    if (!this.indicesInUsfmByVerseRef[s])
      throw new Error(
        `Book ID ${e} not found in USJ! ${n ? `There seems to be no USJ content because there is no content in ${w} either` : `Book IDs in USJ: ${JSON.stringify(t)}`}`
      );
    return s;
  }
  /**
   * Gets the index in USFM of the start of the verse (the backslash on the verse marker or the
   * beginning of the chapter if verse 0 is provided)
   */
  getIndexInUsfmForVerseRef(e) {
    const t = this.getEffectiveBookId(e.book), s = this.indicesInUsfmByVerseRef[t][e.chapterNum];
    if (!s) throw new Error(`Could not find ${t} chapter ${e.chapterNum}`);
    const i = s[e.verseNum];
    if (i === void 0)
      throw new Error(`Verse ${e.verseNum} not found in ${t} ${e.chapterNum}`);
    return i;
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
    let s = 0, i, c = !1;
    for (; !c && s < n.length; ) {
      const [p, u] = n[s];
      if (u) {
        const m = Object.entries(u);
        let h = 0;
        for (; !c && h < m.length; ) {
          const [f, g] = m[h];
          if (g) {
            const k = Object.entries(g);
            let M = 0;
            for (; !c && M < k.length; ) {
              const [N, x] = k[M];
              if (x !== void 0) {
                if (e < x) {
                  if (!i)
                    throw new Error(
                      `Could not find verse ref for index in USFM ${e} less than the first known index ${x}`
                    );
                  c = !0;
                  break;
                }
                if (i = {
                  book: p,
                  chapterNum: parseInt(f, 10),
                  verseNum: parseInt(N, 10)
                }, e === x) {
                  c = !0;
                  break;
                }
              }
              M += 1;
            }
          }
          h += 1;
        }
      }
      s += 1;
    }
    if (!i)
      throw new Error(`Did not find any verse refs while looking for index in USFM ${e}`);
    if (i.book === w) {
      if (!t)
        throw new Error(
          `Could not find book ID and no book ID provided when finding USFM verse ref for index in USFM ${e}`
        );
      i.book = t;
    }
    const d = this.getIndexInUsfmForVerseRef(i), l = this.fragmentsByIndexInUsfm.get(d);
    return l && y.isFragmentAMarker(l.fragment) && l.fragment.type === E && l.fragment.number && l.fragment.number !== `${i.verseNum}` && (i.verse = l.fragment.number), i;
  }
  usfmVerseLocationToIndexInUsfm(e) {
    const { verseRef: t, offset: n } = y.usfmVerseLocationToUsfmVerseRefVerseLocation(e);
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
    const { verseRef: t, offset: n } = y.usfmVerseLocationToUsfmVerseRefVerseLocation(e), s = this.usfmVerseLocationToIndexInUsfm(e), { value: i } = this.fragmentsByIndexInUsfm.findClosestLessThanOrEqual(
      s
    ) ?? {
      value: void 0
    };
    if (!i)
      throw new Error(
        `Somehow, did not find anything at index in verse ${n} or below in ${t.book} ${t.chapterNum}:${t.verseNum}. Not sure how this would happen.`
      );
    const c = s - i.indexInUsfm;
    return {
      ...i.nodeAndDocumentLocation,
      documentLocation: y.moveUsjDocumentLocationToNewOffset(
        i.nodeAndDocumentLocation.documentLocation,
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
      if (!v(e.node)) return !1;
      t = e.documentLocation;
    }
    return "jsonPath" in t ? "offset" in t : !1;
  }
  static isUsjDocumentLocationForNode(e) {
    let t = e;
    if ("node" in e) {
      if (v(e.node))
        return y.isUsjDocumentLocationForTextContent(e);
      t = e.documentLocation;
    }
    return !(!("jsonPath" in t) || "closingMarkerOffset" in t || "propertyOffset" in t || "keyName" in t || "keyOffset" in t || "keyClosingMarkerOffset" in t);
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
    let s = "", i = 0, c = 0, d = -1;
    const l = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    ), p = l.length > 0 ? {
      ...l[l.length - 1]
    } : void 0;
    if (y.findNextMatchingNodeUsingWorkingStack(
      e.node,
      l,
      A,
      (f, g) => {
        if (typeof f != "string") return !1;
        let k = f;
        const M = g[g.length - 1];
        if (p && y.areStackItemsShallowEqual(M, p)) {
          if (!("offset" in e.documentLocation))
            throw new Error(
              `Somehow 'offset' was not in text content string document location. This should not happen. ${JSON.stringify(e.documentLocation)}`
            );
          k = f.substring(e.documentLocation.offset), c += e.documentLocation.offset;
        }
        i += k.length, s = `${s}${k}`;
        const N = s.indexOf(t);
        return N < 0 ? (c += s.length, s.length > t.length && (s = s.substring(s.length - t.length)), c -= s.length, i > n) : (d = c + N, !0);
      }
    ), d < 0) return;
    i = 0;
    let u = 0, m = [];
    const h = y.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      A,
      (f, g) => typeof f != "string" || (i += f.length, i < d + 1) ? !1 : (u = d - i + f.length, m = g, !0)
    );
    if (!h) throw new Error("Internal error: inconsistent search results");
    if (!v(h))
      throw new Error(
        `Somehow found non-string node while searching for strings: ${JSON.stringify(h)}`
      );
    return {
      node: h,
      documentLocation: {
        jsonPath: y.convertWorkingStackToJsonPath(m),
        offset: u
      }
    };
  }
  search(e, t) {
    const n = [];
    if (this.usj.content.length === 0) return n;
    const s = {
      node: this.usj,
      documentLocation: {
        jsonPath: "$"
      }
    }, i = [], c = new X();
    let d = 0, l = s.node;
    for (; l !== void 0; )
      l = y.findNextMatchingNodeUsingWorkingStack(
        s.node,
        this.convertJsonPathToWorkingStack(s.documentLocation.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (m, h) => (typeof m != "string" || t && h.some((g) => {
          const k = g.parent;
          if (!k || !("type" in k) || k.type === "char") return !1;
          let M;
          return "style" in k && typeof k.style == "string" ? M = k.style : "marker" in k && typeof k.marker == "string" && (M = k.marker), M !== void 0 && !t.has(M);
        }) || (i.push(m), c.set(d, {
          node: m,
          documentLocation: {
            offset: 0,
            jsonPath: y.convertWorkingStackToJsonPath(h)
          }
        }), d += m.length), !1)
      );
    const p = i.join("");
    let u = e.exec(p);
    for (; u; ) {
      if (u[0].length > 0) {
        if (u.index < 0 || u.index >= p.length)
          throw new Error(`Match index out of bounds: ${u.index}`);
        const m = c.findClosestLessThanOrEqual(u.index);
        if (!m)
          throw new Error(`Internal error: no starting node found for index ${u.index}`);
        const h = {
          node: m.value.node,
          documentLocation: {
            jsonPath: m.value.documentLocation.jsonPath,
            offset: u.index - m.key
          }
        }, f = c.findClosestLessThanOrEqual(
          u.index + u[0].length - 1
        );
        if (!f)
          throw new Error(`Internal error: no ending node found for index ${u.index}`);
        const g = {
          node: f.value.node,
          documentLocation: {
            jsonPath: f.value.documentLocation.jsonPath,
            offset: u.index + u[0].length - f.key
          }
        };
        n.push({ text: u[0], start: h, end: g });
      }
      if (!e.global) break;
      u = e.exec(p);
    }
    return n;
  }
  // #endregion Search for text from a certain point
  // #region Extract text from a node + JSONPath + offset
  extractText(e, t) {
    let n = "", s = "offset" in e.documentLocation ? e.documentLocation.offset : 0, i = 0;
    return y.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      A,
      (c) => {
        if (typeof c != "string") return !1;
        if (s >= c.length)
          return s -= c.length, !1;
        let d = c;
        if (s > 0 && (d = d.substring(s), s = 0), i + d.length < t)
          return i += d.length, n = `${n}${d}`, !1;
        const l = t - i;
        return n = `${n}${d.substring(0, l - 1)}`, !0;
      }
    ), n;
  }
  extractTextBetweenPoints(e, t, n = 100) {
    let s = "";
    return y.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      A,
      (i, c) => i === t.node && (typeof i == "object" || t.documentLocation.jsonPath === y.convertWorkingStackToJsonPath(c)) ? !0 : typeof i != "string" ? !1 : (s = `${s}${i}`, s.length > n && (s = s.substring(0, n)), s.length >= n)
    ), s;
  }
  // #endregion Extract text from a node + JSONPath + offset
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, t) {
    let n = 0;
    for (let s = e.length - 1; s >= 0; s--) {
      const i = e[s];
      t(i) ? (e.splice(s, 1), n += 1) : typeof i != "string" && i.content && (n += this.removeContentNodesFromArray(i.content, t));
    }
    return n;
  }
  removeContentNodes(e) {
    const t = y.removeContentNodesFromArray(this.usj.content, e);
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
    const n = v(e) ? e : (
      // Usj type has no `marker` property, but the Usj marker isn't really different than any other
      // marker with no `marker` property. It is appropriate to treat them the same to get the name
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      e.marker ?? e.type
    );
    let s = !1, i = this.getMarkerInfo(n);
    const c = (i == null ? void 0 : i.type) ?? (v(e) ? "" : e.type);
    let d = n;
    if (i != null && i.markerUsfm && (d = i.markerUsfm, i = this.getMarkerInfo(d)), !i) {
      if (v(e))
        throw new Error(`Unknown marker ${n} and no marker type provided`);
      i = { type: e.type }, s = !0, console.warn(
        `Unknown marker ${n}. Creating MarkerInfo to use: ${JSON.stringify(i)}`
      );
    }
    let l = i.type, p = this.markersMap.markerTypes[l];
    if (p != null && p.markerTypeUsfm && (l = p.markerTypeUsfm, p = this.markersMap.markerTypes[l]), !v(e) && e.type !== c && (!p || e.type !== p.markerTypeUsfm && e.type !== p.markerTypeUsx && e.type !== p.markerTypeUsj) && (console.warn(
      `Warning: Mismatching marker type in the USJ content ${e.type} vs marker type in the marker info ${i.type} for marker ${n}. Using the type from the USJ content.`
    ), l = e.type, p = this.markersMap.markerTypes[l], s = !0), !p)
      throw new Error(
        `Unknown marker type ${l} on marker ${n}! Cannot proceed.`
      );
    s && l === "para" && (p = { ...p, hasNewlineBefore: !1 });
    const u = [];
    i.attributeMarkers && i.attributeMarkers.forEach((h) => {
      const f = this.getMarkerInfo(h);
      f && "attributeMarkerAttributeName" in f && u.push([h, f]);
    });
    const m = e;
    if (t === "usfm" && l === "cell" && m.colspan) {
      const h = parseInt(m.colspan, 10), f = wt.exec(n);
      if (f != null && f[1]) {
        const g = parseInt(f[1], 10);
        !Number.isNaN(g) && !Number.isNaN(h) && (d = `${n}-${g + h - 1}`, p = {
          ...p,
          skipOutputAttributeToUsfm: [
            ...p.skipOutputAttributeToUsfm ?? [],
            "colspan"
          ]
        });
      }
    }
    return {
      markerNameOriginal: n,
      markerName: d,
      markerInfo: i,
      markerType: l,
      markerTypeInfo: p,
      attributeMarkerInfoEntries: u
    };
  }
  /** Converts the text content of a marker to its equivalent in USFM */
  textContentToUsfm(e) {
    return {
      usfm: this.shouldAllowInvisibleCharacters ? e : e.replace(Et, "~"),
      fragmentsInfo: [{ fragment: e, indexInUsfm: 0 }]
    };
  }
  /**
   * Merge an independent array of fragment info into an existing array of fragment info, offsetting
   * the indices of the new fragments so their locations start from the end of the string
   */
  static mergeFragmentsInfoIntoExistingArray(e, t, n) {
    e.forEach((s) => {
      const i = n + s.indexInUsfm;
      t.push({
        ...s,
        indexInUsfm: i
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
    const s = [], { markerName: i, markerInfo: c, markerType: d, markerTypeInfo: l, attributeMarkerInfoEntries: p } = this.getInfoForMarker(e), u = e;
    l.hasNewlineBefore && (n += `
`);
    const m = t ? l.nestedPrefix ?? "" : "";
    return s.push({ fragment: e, indexInUsfm: n.length }), n += d === "optbreak" ? "//" : `\\${m}`, d !== "optbreak" && (s.push({
      fragment: { attributeValueForKey: "marker", forMarker: e },
      indexInUsfm: n.length
    }), n += `${i}${d === "unmatched" ? "" : " "}`), c.leadingAttributes && c.leadingAttributes.forEach((h) => {
      const f = u[h];
      f && (s.push({
        fragment: { attributeValueForKey: h, forMarker: e },
        indexInUsfm: n.length
      }), n += `${f} `);
    }), c.textContentAttribute && u[c.textContentAttribute] && (s.push({
      fragment: { attributeValueForKey: c.textContentAttribute, forMarker: e },
      indexInUsfm: n.length
    }), n += `${u[c.textContentAttribute]} `), c.attributeMarkers && p.forEach(([h, f]) => {
      const g = u[f.attributeMarkerAttributeName];
      if (!g) return;
      const k = {
        type: f.type,
        marker: h,
        content: [g]
      }, M = [];
      n = this.addMarkerUsfmToString(
        n,
        k,
        e,
        M
      );
      const { usfm: N } = this.textContentToUsfm(g);
      s.push({
        fragment: {
          attributeValueForKey: f.attributeMarkerAttributeName,
          forMarker: e
        },
        indexInUsfm: n.length
      }), n += N, n = this.addMarkerUsfmToString(
        n,
        {
          isClosingMarker: !0,
          forMarker: k
        },
        e,
        M
      ), M.forEach((x) => {
        if (v(x.fragment) || "attributeKey" in x.fragment)
          throw new Error(
            `Attribute marker opening or closing markers generated a text content fragment or an attribute key fragment! This does not make sense. ${JSON.stringify(x)}`
          );
        if (y.isFragmentAMarker(x.fragment)) {
          s.push({
            ...x,
            fragment: {
              attributeMarker: f.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("attributeValueForKey" in x.fragment) {
          if (x.fragment.attributeValueForKey !== "marker")
            throw new Error(
              `Attribute marker opening or closing markers generated an attribute value fragment for a key that was not marker! This does not make sense. ${JSON.stringify(x)}`
            );
          s.push({
            ...x,
            fragment: {
              attributeKey: f.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("isClosingMarker" in x.fragment) {
          const { isClosingMarker: L, ...P } = x.fragment, _e = {
            ...P,
            forMarker: e,
            attributeMarkerClosingMarker: f.attributeMarkerAttributeName
          };
          s.push({
            ...x,
            fragment: _e
          });
          return;
        }
        throw new Error(
          `Attribute marker opening or closing markers generated an unrecognized fragment: ${JSON.stringify(x)}`
        );
      }), !this.markersMap.isSpaceAfterAttributeMarkersContent && f.hasStructuralSpaceAfterCloseAttributeMarker && (n += " ");
    }), { usfm: n, fragmentsInfo: s };
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
      markerName: s,
      markerInfo: i,
      markerType: c,
      markerTypeInfo: d,
      attributeMarkerInfoEntries: l
    } = this.getInfoForMarker(e), p = Object.keys(e).filter((g) => {
      var k, M;
      return !(g === "type" || g === "marker" || g === "content" || g === "closed" || (k = d.skipOutputAttributeToUsfm) != null && k.includes(g) || (M = i.leadingAttributes) != null && M.includes(g) || i.textContentAttribute === g || l.some(
        ([, N]) => N.attributeMarkerAttributeName === g
      ));
    }), u = e;
    if (d.isCloseable && i.independentClosingMarkers && i.independentClosingMarkers.length > 0)
      throw new Error(
        `Marker ${s} is intended to have a normal closing marker and independent closing markers. As of writing this code, there is no known syntax for this situation in USFM. Cannot proceed.`
      );
    let m = !0;
    if ((u.closed === "false" || i.isClosingMarkerOptional && !this.markersMap.shouldOptionalClosingMarkersBePresent && u.closed !== "true") && (m = !1), i.independentClosingMarkers && i.independentClosingMarkers.length > 0 && m) {
      const g = {
        type: c,
        marker: i.independentClosingMarkers[0],
        // Put all the closing marker attributes on here since we don't really have a better place
        // to put them and might as well
        ...Object.fromEntries(
          p.map((P) => [
            P,
            u[P]
          ])
        )
      };
      let k = "";
      const M = [], { usfm: N, fragmentsInfo: x } = this.openingMarkerToUsfm(g, t), L = x.find((P) => y.isFragmentAMarker(P.fragment));
      if (!L)
        throw new Error(
          `Could not find opening fragment info for independent closing marker ${JSON.stringify(
            g
          )}. Fragments info generated: ${JSON.stringify(x)}`
        );
      return M.push({
        ...L,
        fragment: { isClosingMarker: !0, forMarker: e }
      }), k += N, n !== g.marker && (k = this.addMarkerUsfmToString(
        k,
        {
          isClosingMarker: !0,
          forMarker: g
        },
        t
      )), { usfm: k, fragmentsInfo: M };
    }
    let h = "";
    const f = [];
    if (p.length > 0 && (h += "|", p.length === 1 && p[0] === i.defaultAttribute ? (f.push({
      fragment: { attributeValueForKey: i.defaultAttribute, forMarker: e },
      indexInUsfm: h.length
    }), h += u[i.defaultAttribute]) : p.forEach((g, k) => {
      const M = c === "figure" && g === "file" ? "src" : g;
      k > 0 && (h += " "), f.push({
        fragment: { attributeKey: g, forMarker: e },
        indexInUsfm: h.length
      }), h += `${M}="`, f.push({
        fragment: { attributeValueForKey: g, forMarker: e },
        indexInUsfm: h.length
      }), h += `${u[g]}"`;
    })), d.isCloseable && m) {
      const g = d.isClosingMarkerEmpty ? "" : s, k = t ? d.nestedPrefix ?? "" : "";
      f.push({
        fragment: { isClosingMarker: !0, forMarker: e },
        indexInUsfm: h.length
      }), h += `\\${k}${g}*`;
    }
    return { usfm: h, fragmentsInfo: f };
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
      (s) => s in e
    ));
  }
  /** Removes one space at the end of the string if present */
  static removeEndSpace(e) {
    return e.at(-1) !== " " ? e : e.slice(0, -1);
  }
  addMarkerUsfmToString(e, t, n, s) {
    let i = e, c, d;
    const { markerNameOriginal: l, markerType: p, markerTypeInfo: u } = this.getInfoForMarker(
      "isClosingMarker" in t ? t.forMarker : t
    );
    let m = !1;
    if (typeof n == "boolean")
      m = n;
    else if (n) {
      const { markerType: h } = this.getInfoForMarker(
        n
      );
      h === p && (m = !0);
    }
    if ("isClosingMarker" in t) {
      const { usfm: h, fragmentsInfo: f } = this.closingMarkerToUsfm(
        t.forMarker,
        m
      );
      d = f, c = h, u.isCloseable && u.isClosingMarkerEmpty && // No contents
      (!t.forMarker.content || t.forMarker.content.length === 0) && // No closing marker attributes
      !c.startsWith("|") && (i = y.removeEndSpace(i));
    } else {
      const { usfm: h, fragmentsInfo: f } = this.openingMarkerToUsfm(
        t,
        m
      );
      d = f, c = h;
    }
    if (c.startsWith(`
`) && (i.length === 0 ? (d = d.map((h) => ({
      ...h,
      indexInUsfm: h.indexInUsfm - 1
    })), c = c.substring(1)) : i = y.removeEndSpace(i)), this.markersMap.isSpaceAfterAttributeMarkersContent && l === "ca") {
      const h = i.lastIndexOf("\\");
      h >= 0 && e.substring(
        h + 1,
        h + 3
      ) === "c " && (i = y.removeEndSpace(i), i += `
 `);
    }
    return s && y.mergeFragmentsInfoIntoExistingArray(
      d,
      s,
      i.length
    ), i += c, i;
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
    const { jsonPath: s, ...i } = e, { jsonPath: c, ...d } = t;
    return !n && !V(q.toPathArray(s), q.toPathArray(c)) ? !1 : V(i, d);
  }
  /** Find the fragment info corresponding to the specified USJ Document location. */
  findFragmentInfoAtUsjDocumentLocation(e) {
    const t = y.moveUsjDocumentLocationToNewOffset(e, 0);
    let n;
    const s = this.fragmentsByJsonPath.get(
      y.normalizeJsonPath(e.jsonPath)
    );
    if (s)
      return s.find((i) => y.areUsjDocumentLocationsEqual(
        i.nodeAndDocumentLocation.documentLocation,
        t,
        // We already compared the JSONPaths by looking in the map for this JSONPath
        !0
      ) ? (n = i, !0) : !1), n;
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
    const s = y.convertWorkingStackToJsonPath(t);
    return v(e) ? { jsonPath: s, offset: n } : { jsonPath: s };
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
    if (v(e) || y.isFragmentAMarker(e)) {
      const s = y.convertNodeToUsjDocumentLocation(
        e,
        t,
        n
      );
      return {
        node: e,
        documentLocation: s
      };
    }
    if ("isClosingMarker" in e) {
      const i = {
        jsonPath: y.convertWorkingStackToJsonPath(t),
        closingMarkerOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: i
      };
    }
    if ("attributeValueForKey" in e) {
      const i = {
        jsonPath: y.convertWorkingStackAndPropertyToJsonPath(
          t,
          e.attributeValueForKey
        ),
        propertyOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: i
      };
    }
    if ("attributeKey" in e) {
      const i = {
        jsonPath: y.convertWorkingStackToJsonPath(t),
        keyName: e.attributeKey,
        keyOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: i
      };
    }
    if ("attributeMarker" in e) {
      const i = {
        jsonPath: y.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarker
      };
      return {
        node: e.forMarker,
        documentLocation: i
      };
    }
    if ("attributeMarkerClosingMarker" in e) {
      const i = {
        jsonPath: y.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarkerClosingMarker,
        keyClosingMarkerOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: i
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
  static transferFragmentsInfoArrayToMaps(e, t, n, s, i, c) {
    e.map((l) => {
      var u, m, h;
      if (typeof l.fragment == "object" && "type" in l.fragment) {
        const f = l.fragment;
        if (f.type === pt && f.code)
          n.bookId = f.code, n.chapterNum = 0, n.verseNum = 0, c[w] && (c[n.bookId] = c[w], delete c[w]);
        else if (f.type === se && f.number) {
          const g = parseInt(f.number, 10);
          if (Number.isNaN(g))
            console.warn(
              `Found ${se} type marker with number ${f.number}, but could not parse chapter number from it. Continuing using previous chapter number ${n.chapterNum}`
            );
          else {
            n.chapterNum = g, n.verseNum = 0;
            const k = c[n.bookId];
            k != null && k[0] && (k[n.chapterNum] = k[0], delete k[0]);
          }
        } else if (f.type === E && f.number) {
          const g = (u = It.exec(f.number)) == null ? void 0 : u[1];
          if (!g)
            console.warn(
              `Found ${E} type marker with number ${f.number}, but could not find starting verse number in it. Continuing using previous verse number ${n.verseNum}`
            );
          else {
            const k = parseInt(g, 10);
            Number.isNaN(k) ? console.warn(
              `Found ${E} type marker with number ${f.number}, but could not parse starting verse number from ${g}. Continuing using previous verse number ${n.verseNum}`
            ) : (h = (m = c[n.bookId]) == null ? void 0 : m[n.chapterNum]) != null && h[k] ? console.warn(`Found ${E} marker with existing number ${k} after
                  current ${E} number ${n.verseNum}! Not updating verse start index. All positions in this duplicate verse will be based on the current ${E} marker, not the new duplicate marker.`) : (k < n.verseNum && console.debug(
              `Found ${E} marker with number ${k} lower than current ${E} number ${n.verseNum}. Verses are out of order. There may be some issues.`
            ), n.verseNum = k);
          }
        }
      }
      return {
        ...l,
        // Determine the appropriate `UsjDocumentLocation` subtype based on what this fragment is
        nodeAndDocumentLocation: y.convertFragmentToUsjNodeAndDocumentLocation(
          l.fragment,
          t
        )
      };
    }).forEach((l) => {
      s.set(l.indexInUsfm, l);
      const p = l.nodeAndDocumentLocation.documentLocation.jsonPath, u = i.get(p);
      u ? u.push(l) : i.set(p, [l]), c[n.bookId] || (c[n.bookId] = {}), c[n.bookId][n.chapterNum] || (c[n.bookId][n.chapterNum] = {}), c[n.bookId][n.chapterNum][n.verseNum] === void 0 && (c[n.bookId][n.chapterNum][n.verseNum] = l.indexInUsfm);
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
    const t = new X(), n = /* @__PURE__ */ new Map(), s = {}, i = [], c = {
      bookId: w,
      chapterNum: 0,
      verseNum: 0
    };
    function d(u) {
      y.transferFragmentsInfoArrayToMaps(
        i,
        u,
        c,
        t,
        n,
        s
      );
    }
    let l;
    const p = [];
    return y.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      this.usj,
      // Working stack is empty since the top-level object doesn't have any parents
      [],
      // Don't skip anything
      [],
      (u, m) => {
        if (typeof u != "object") {
          const { usfm: f, fragmentsInfo: g } = this.textContentToUsfm(u);
          return y.mergeFragmentsInfoIntoExistingArray(
            g,
            i,
            e.length
          ), d(m), e += f, !1;
        }
        let h;
        return m.length > 0 && (h = m[m.length - 1].parent), "isClosingMarker" in u ? p.length > 0 && p[p.length - 1] === u.forMarker ? (p.pop(), !1) : (e = this.addMarkerUsfmToString(
          e,
          u,
          h,
          i
        ), d(m), u.forMarker.type === "book" && l && (e = this.addMarkerUsfmToString(e, l, h, i), d(m), l = void 0), !1) : this.shouldSkipOutputMarkerToUsfm(u) ? (p.push(u), !1) : y.isTopLevelUsjMarker(u, m) && !l ? (u.version !== "3.0" && (l = u), !1) : (e = this.addMarkerUsfmToString(e, u, h, i), d(m), !1);
      }
    ), e = `${y.removeEndSpace(e)}
`, { usfm: e, fragmentsByIndexInUsfm: t, fragmentsByJsonPath: n, indicesInUsfmByVerseRef: s };
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
  H as AsyncVariable,
  se as CHAPTER_TYPE,
  Ft as Collator,
  $e as DateTimeFormat,
  Re as DocumentCombiner,
  Ht as EventRollingTimeCounter,
  Ze as FIRST_SCR_BOOK_NUM,
  et as FIRST_SCR_CHAPTER_NUM,
  tt as FIRST_SCR_VERSE_NUM,
  Qe as LAST_SCR_BOOK_NUM,
  jr as MODIFIER_KEYS,
  Le as Mutex,
  Kt as MutexMap,
  Gt as NonValidatingDocumentCombiner,
  Be as NumberFormat,
  F as PLATFORM_ERROR_VERSION,
  je as PlatformEventEmitter,
  Xt as PromiseChainingMap,
  ot as Section,
  X as SortedNumberMap,
  Yt as SortedSet,
  _t as THEME_STYLE_ELEMENT_ID,
  J as USFM_MARKERS_MAP_3_0,
  Ur as USFM_MARKERS_MAP_PARATEXT_3_0,
  Wt as UnsubscriberAsyncList,
  y as UsjReaderWriter,
  E as VERSE_TYPE,
  Sr as aggregateUnsubscriberAsyncs,
  _r as aggregateUnsubscribers,
  Fr as applyThemeStylesheet,
  xr as areUsjContentsEqualExceptWhitespace,
  U as at,
  T as charAt,
  er as codePointAt,
  pr as collapseMiddleWords,
  nt as compareScrRefs,
  Vt as createSyncProxyForAsyncObject,
  Rt as debounce,
  $ as deepClone,
  V as deepEqual,
  ur as defaultScrRef,
  mt as deserialize,
  Je as endsWith,
  ue as ensureArray,
  or as escapeStringRegexp,
  Or as expandThemeContribution,
  qr as formatBytes,
  $r as formatRelativeDate,
  tr as formatReplacementString,
  He as formatReplacementStringToArray,
  br as formatScrRef,
  vr as formatScrRefRange,
  Ar as formatTimeSpan,
  Bt as getAllObjectFunctionNames,
  rt as getChaptersForBook,
  Tr as getCurrentLocale,
  ye as getDefaultCallerSequence,
  le as getErrorMessage,
  wr as getFormatCallerFunction,
  it as getLocalizeKeyForScrollGroupId,
  kr as getLocalizeKeysForScrollGroupIds,
  gr as getLocalizedIdFromBookNumber,
  ut as getNthCaller,
  Ir as getPaneSizeLimits,
  Mr as getSectionForBook,
  Nt as getStylesheetForTheme,
  Dt as groupBy,
  Cr as htmlEncode,
  Ke as includes,
  O as indexOf,
  Jt as isErrorMessageAboutParatextBlockingInternetAccess,
  zt as isErrorMessageAboutRegistryAuthFailure,
  ar as isLocalizeKey,
  Qt as isPlatformError,
  Pr as isSerializable,
  v as isString,
  ft as isSubset,
  C as isWhiteSpace,
  Ge as lastIndexOf,
  vt as localizedStringsDocumentSchema,
  Mt as menuDocumentSchema,
  Ut as newGuid,
  Zt as newPlatformError,
  rr as normalize,
  re as normalizeScriptureSpaces,
  hr as offsetBook,
  fr as offsetChapter,
  mr as offsetVerse,
  nr as ordinalCompare,
  ir as padEnd,
  sr as padStart,
  kt as projectSettingsDocumentSchema,
  Er as sanitizeHtml,
  yr as scrRefToBBBCCC,
  Q as scrRefToBBBCCCVVV,
  ae as serialize,
  bt as settingsDocumentSchema,
  W as slice,
  Z as split,
  he as startsWith,
  _ as stringLength,
  I as substring,
  xt as themeDocumentSchema,
  Xe as toArray,
  lr as toKebabCase,
  dr as transformAndEnsureRegExpArray,
  cr as transformAndEnsureRegExpRegExpArray,
  Nr as usfmMarkers,
  Ue as wait,
  Lt as waitForDuration
};
//# sourceMappingURL=index.js.map
