var en = Object.defineProperty;
var tn = (r, e, t) => e in r ? en(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var j = (r, e, t) => tn(r, typeof e != "symbol" ? e + "" : e, t);
import { Mutex as rn } from "async-mutex";
import { JSONPath as Qt } from "jsonpath-plus";
const St = class St {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, t = 1e4) {
    j(this, "variableName");
    j(this, "promiseToValue");
    j(this, "timeoutId");
    j(this, "timeoutOccurred");
    j(this, "resolver");
    j(this, "rejecter");
    this.variableName = e, this.timeoutOccurred = !1, this.promiseToValue = new Promise((n, a) => {
      this.resolver = n, this.rejecter = a;
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
      St.verboseLoggingEnabled && console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
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
      St.verboseLoggingEnabled && console.debug(`${this.variableName} is being rejected now with reason: ${e}`), this.rejecter(e), this.complete();
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
j(St, "verboseLoggingEnabled", !1);
let Zt = St;
class Zi {
  constructor(e, t) {
    j(this, "collator");
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
class nn {
  constructor(e, t) {
    j(this, "dateTimeFormatter");
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
class on {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    j(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    j(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    j(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    j(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    j(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    j(this, "emit", (e) => {
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
function eo() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (r) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~r) * 65536 >> r).toString(16).padStart(4, "0")
    )
  );
}
function te(r) {
  return typeof r == "string" || r instanceof String;
}
function xt(r) {
  return JSON.parse(JSON.stringify(r));
}
function to(r, e = 300) {
  let t, n, a, s;
  return (...l) => (clearTimeout(t), n || (n = new Promise((c, m) => {
    a = c, s = m;
  })), t = setTimeout(async () => {
    try {
      a(await r(...l));
    } catch (c) {
      s(c);
    } finally {
      n = void 0;
    }
  }, e), n);
}
function ro(r, e, t) {
  const n = /* @__PURE__ */ new Map();
  return r.forEach((a) => {
    const s = e(a), l = n.get(s), c = t ? t(a, s) : a;
    l ? l.push(c) : n.set(s, [c]);
  }), n;
}
function an(r) {
  return typeof r == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  r !== null && "message" in r && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof r.message == "string";
}
function sn(r) {
  if (an(r)) return r;
  try {
    return new Error(JSON.stringify(r));
  } catch {
    return new Error(String(r));
  }
}
function Br(r) {
  return sn(r).message;
}
function un(r) {
  return new Promise((e) => setTimeout(e, r));
}
function no(r, e) {
  const t = un(e).then(() => {
  });
  return Promise.any([t, r()]);
}
function io(r, e = "obj") {
  const t = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(r).forEach((a) => {
    try {
      typeof r[a] == "function" && t.add(a);
    } catch {
    }
  });
  let n = Object.getPrototypeOf(r);
  for (; n && Object.getPrototypeOf(n); )
    Object.getOwnPropertyNames(n).forEach((a) => {
      try {
        typeof r[a] == "function" && t.add(a);
      } catch {
      }
    }), n = Object.getPrototypeOf(n);
  return t;
}
function oo(r, e = {}) {
  return new Proxy(e, {
    get(t, n) {
      return n in t ? t[n] : async (...a) => (await r())[n](...a);
    }
  });
}
function ao(r) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return te(r) ? r.includes(e) : Br(r).includes(e);
}
function so(r) {
  const e = "401 Unauthorized error while getting shared projects.", t = "User registration is not valid. Cannot retrieve resources from DBL.", n = te(r) ? r : Br(r);
  return n.includes(e) || n.includes(t);
}
class cn {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, t) {
    j(this, "baseDocument");
    j(this, "contributions", /* @__PURE__ */ new Map());
    j(this, "latestOutput");
    j(this, "options");
    j(this, "onDidRebuildEmitter", new on());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    j(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = t, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? xt(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
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
    let a = this.options.copyDocuments && t ? xt(t) : t;
    a = this.transformContributionAfterValidation(e, a), this.contributions.set(e, a);
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
        ([n, a]) => this.contributions.set(n, a)
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
      let t = xt(this.baseDocument);
      return t = this.transformFinalOutputBeforeValidation(t), this.validateOutput(t), this.latestOutput = t, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((t) => {
      e = ln(
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
function er(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || Array.isArray(t)) && (e = !1);
  }), e;
}
function tr(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || !Array.isArray(t)) && (e = !1);
  }), e;
}
function ln(r, e, t) {
  const n = xt(r);
  return e ? Rr(n, xt(e), t) : n;
}
function Rr(r, e, t) {
  if (!e) return r;
  if (er(r, e)) {
    const n = r, a = e;
    Object.keys(a).forEach((s) => {
      if (Object.hasOwn(n, s)) {
        if (er(n[s], a[s]))
          n[s] = Rr(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            n[s],
            a[s],
            t
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (tr(n[s], a[s]))
          n[s] = n[s].concat(
            a[s]
          );
        else if (!t)
          throw new Error(`Cannot merge objects: key "${s}" already exists in the target object`);
      } else
        n[s] = a[s];
    });
  } else tr(r, e) && r.push(...e);
  return r;
}
class uo {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(e) {
    /** The ring buffer to store times */
    j(this, "ringBuffer");
    /** The size of the ring buffer */
    j(this, "bufferSize");
    /** The next location where a time will be written */
    j(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    j(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    j(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    j(this, "totalInstanceCount");
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
class fn extends rn {
}
class co {
  constructor() {
    j(this, "mutexesByID", /* @__PURE__ */ new Map());
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
    return t || (t = new fn(), this.mutexesByID.set(e, t), t);
  }
}
class lo extends cn {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, t) {
    super(e, t);
  }
  get output() {
    return this.latestOutput;
  }
}
class pn {
  constructor(e, t) {
    j(this, "numberFormatter");
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
const hn = Promise.resolve();
class fo {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    j(this, "map", /* @__PURE__ */ new Map());
    j(this, "logger");
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
    const n = { promise: hn }, a = t.catch((s) => this.logger.warn(`Error in promise for ${e}: ${s.message}`)).finally(() => {
      this.map.get(e) === n.promise && this.map.delete(e);
    });
    n.promise = a, this.map.set(e, a);
  }
}
class rr {
  constructor() {
    j(this, "map", /* @__PURE__ */ new Map());
    j(this, "sortedKeys", []);
  }
  /**
   * Returns an iterable of keys in the map. These keys are not necessarily sorted.
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
    return this.map.keys();
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
    const n = this.sortedKeys[t], a = this.map.get(n);
    if (a !== void 0)
      return { key: n, value: a };
  }
  binarySearchLessThanOrEqual(e) {
    let t = 0, n = this.sortedKeys.length - 1, a = -1;
    for (; t <= n; ) {
      const s = Math.floor((t + n) / 2);
      this.sortedKeys[s] <= e ? (a = s, t = s + 1) : n = s - 1;
    }
    return a;
  }
  binarySearchInsertIndex(e) {
    let t = 0, n = this.sortedKeys.length;
    for (; t < n; ) {
      const a = Math.floor((t + n) / 2);
      this.sortedKeys[a] < e ? t = a + 1 : n = a;
    }
    return t;
  }
}
class po {
  /**
   * Creates a new sorted set
   *
   * @param compareFn - Function used to determine the order of elements. Returns negative when a <
   *   b, zero when a = b, positive when a > b
   */
  constructor(e) {
    /** Internal storage for the sorted items */
    j(this, "items", []);
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
      const a = Math.floor((t + n) / 2);
      this.compareFn(this.items[a], e) < 0 ? t = a + 1 : n = a;
    }
    return t;
  }
}
class ho {
  constructor(e = "Anonymous") {
    j(this, "unsubscribers", /* @__PURE__ */ new Set());
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
    return this.unsubscribers.clear(), t.every((n, a) => (n || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${a} failed!`), n));
  }
}
const kt = 1;
function mo(r) {
  if (!r) return { message: "", platformErrorVersion: kt };
  if (te(r)) return { message: r, platformErrorVersion: kt };
  if (typeof r == "object" && "message" in r && typeof r.message == "string") {
    const e = {
      message: r.message,
      platformErrorVersion: kt
    };
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)), Object.defineProperty(e, "message", { enumerable: !0 }), "stack" in r && te(r.stack) && Object.defineProperty(e, "stack", { value: r.stack, enumerable: !0 }), "cause" in e && Object.defineProperty(e, "cause", { enumerable: !0 }), e;
  }
  return { cause: r, message: "", platformErrorVersion: kt };
}
function go(r) {
  return !!r && typeof r == "object" && "platformErrorVersion" in r;
}
var dn = Object.defineProperty, mn = (r, e, t) => e in r ? dn(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, J = (r, e, t) => mn(r, typeof e != "symbol" ? e + "" : e, t);
const at = [
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
], Gt = [
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
], Pr = [
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
], nr = Tn();
function yt(r, e = !0) {
  return e && (r = r.toUpperCase()), r in nr ? nr[r] : 0;
}
function Ht(r) {
  return yt(r) > 0;
}
function gn(r) {
  const e = typeof r == "string" ? yt(r) : r;
  return e >= 40 && e <= 66;
}
function En(r) {
  return (typeof r == "string" ? yt(r) : r) <= 39;
}
function Lr(r) {
  return r <= 66;
}
function yn(r) {
  const e = typeof r == "string" ? yt(r) : r;
  return qr(e) && !Lr(e);
}
function* vn() {
  for (let r = 1; r <= at.length; r++) yield r;
}
const bn = 1, _r = at.length;
function Dn() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Jt(r, e = "***") {
  const t = r - 1;
  return t < 0 || t >= at.length ? e : at[t];
}
function Fr(r) {
  return r <= 0 || r > _r ? "******" : Pr[r - 1];
}
function An(r) {
  return Fr(yt(r));
}
function qr(r) {
  const e = typeof r == "number" ? Jt(r) : r;
  return Ht(e) && !Gt.includes(e);
}
function Nn(r) {
  const e = typeof r == "number" ? Jt(r) : r;
  return Ht(e) && Gt.includes(e);
}
function Cn(r) {
  return Pr[r - 1].includes("*obsolete*");
}
function Tn() {
  const r = {};
  for (let e = 0; e < at.length; e++)
    r[at[e]] = e + 1;
  return r;
}
const pe = {
  allBookIds: at,
  nonCanonicalIds: Gt,
  bookIdToNumber: yt,
  isBookIdValid: Ht,
  isBookNT: gn,
  isBookOT: En,
  isBookOTNT: Lr,
  isBookDC: yn,
  allBookNumbers: vn,
  firstBook: bn,
  lastBook: _r,
  extraBooks: Dn,
  bookNumberToId: Jt,
  bookNumberToEnglishName: Fr,
  bookIdToEnglishName: An,
  isCanonical: qr,
  isExtraMaterial: Nn,
  isObsolete: Cn
};
var _e = /* @__PURE__ */ ((r) => (r[r.Unknown = 0] = "Unknown", r[r.Original = 1] = "Original", r[r.Septuagint = 2] = "Septuagint", r[r.Vulgate = 3] = "Vulgate", r[r.English = 4] = "English", r[r.RussianProtestant = 5] = "RussianProtestant", r[r.RussianOrthodox = 6] = "RussianOrthodox", r))(_e || {});
const we = class {
  // private versInfo: Versification;
  constructor(e) {
    if (J(this, "name"), J(this, "fullPath"), J(this, "isPresent"), J(this, "hasVerseSegments"), J(this, "isCustomized"), J(this, "baseVersification"), J(this, "scriptureBooks"), J(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = _e[e]) : (this._type = e, this.name = _e[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
J(we, "Original", new we(_e.Original)), J(we, "Septuagint", new we(_e.Septuagint)), J(we, "Vulgate", new we(_e.Vulgate)), J(we, "English", new we(_e.English)), J(we, "RussianProtestant", new we(_e.RussianProtestant)), J(we, "RussianOrthodox", new we(_e.RussianOrthodox));
let it = we;
function ir(r, e) {
  const t = e[0];
  for (let n = 1; n < e.length; n++)
    r = r.split(e[n]).join(t);
  return r.split(t);
}
var Ur = /* @__PURE__ */ ((r) => (r[r.Valid = 0] = "Valid", r[r.UnknownVersification = 1] = "UnknownVersification", r[r.OutOfRange = 2] = "OutOfRange", r[r.VerseOutOfOrder = 3] = "VerseOutOfOrder", r[r.VerseRepeated = 4] = "VerseRepeated", r))(Ur || {});
const be = class W {
  constructor(e, t, n, a) {
    if (J(this, "firstChapter"), J(this, "lastChapter"), J(this, "lastVerse"), J(this, "hasSegmentsDefined"), J(this, "text"), J(this, "BBBCCCVVVS"), J(this, "longHashCode"), J(this, "versification"), J(this, "rtlMark", "‏"), J(this, "_bookNum", 0), J(this, "_chapterNum", 0), J(this, "_verseNum", 0), J(this, "_verse"), n == null && a == null)
      if (e != null && typeof e == "string") {
        const s = e, l = t != null && t instanceof it ? t : void 0;
        this.setEmpty(l), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = t != null && t instanceof it ? t : void 0;
        this.setEmpty(s), this._verseNum = e % W.chapterDigitShifter, this._chapterNum = Math.floor(
          e % W.bookDigitShifter / W.chapterDigitShifter
        ), this._bookNum = Math.floor(e / W.bookDigitShifter);
      } else if (t == null)
        if (e != null && e instanceof W) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof it ? e : W.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && t != null && n != null)
      if (typeof e == "string" && typeof t == "string" && typeof n == "string")
        this.setEmpty(a), this.updateInternal(e, t, n);
      else if (typeof e == "number" && typeof t == "number" && typeof n == "number")
        this._bookNum = e, this._chapterNum = t, this._verseNum = n, this.versification = a ?? W.defaultVersification;
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
      return t = new W(e), { success: !0, verseRef: t };
    } catch (n) {
      if (n instanceof Ct)
        return t = new W(), { success: !1, verseRef: t };
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
    return e % W.bcvMaxValue * W.bookDigitShifter + (t >= 0 ? t % W.bcvMaxValue * W.chapterDigitShifter : 0) + (n >= 0 ? n % W.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: t, chapterNum: n, verseNum: a, verse: s, versificationStr: l } = e, c = s || a.toString();
    let m;
    return l && (m = new it(l)), t ? new W(t, n.toString(), c, m) : new W();
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
    for (let a = 0; a < e.length; a++) {
      if (n = e[a], n < "0" || n > "9")
        return a === 0 && (t = -1), { success: !1, vNum: t };
      if (t = t * 10 + +n - 0, t > W.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(W.verseRangeSeparator) || this._verse.includes(W.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return pe.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = pe.bookIdToNumber(e);
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
    const { success: t, vNum: n } = W.tryGetVerseNum(e);
    this._verse = t ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = W.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > pe.lastBook)
      throw new Ct(
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
    this.versification = this.versification != null ? new it(e) : void 0;
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
    return this.validateVerse(W.verseRangeSeparators, W.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return W.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return W.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const l = +s[1].trim();
          this.versification = new it(_e[l]);
        } catch {
          throw new Ct("Invalid reference : " + e);
        }
    }
    const t = e.trim().split(" ");
    if (t.length !== 2)
      throw new Ct("Invalid reference : " + e);
    const n = t[1].split(":"), a = +n[0];
    if (n.length !== 2 || pe.bookIdToNumber(t[0]) === 0 || !Number.isInteger(a) || a < 0 || !W.isVerseParseable(n[1]))
      throw new Ct("Invalid reference : " + e);
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
    return new W(this);
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
    return e instanceof W ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, t = W.verseRangeSeparators, n = W.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const a = [], s = ir(this._verse, n);
    for (const l of s.map((c) => ir(c, t))) {
      const c = this.clone();
      c.verse = l[0];
      const m = c.verseNum;
      if (a.push(c), l.length > 1) {
        const d = this.clone();
        if (d.verse = l[1], !e)
          for (let h = m + 1; h < d.verseNum; h++) {
            const f = new W(
              this._bookNum,
              this._chapterNum,
              h,
              this.versification
            );
            this.isExcluded || a.push(f);
          }
        a.push(d);
      }
    }
    return a;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, t) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const a of this.allVerses(!0, e, t)) {
      const s = a.internalValid;
      if (s !== 0)
        return s;
      const l = a.BBBCCCVVV;
      if (n > l)
        return 3;
      if (n === l)
        return 4;
      n = l;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > pe.lastBook ? 2 : (pe.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = W.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, t, n) {
    this.bookNum = pe.bookIdToNumber(e), this.chapter = t, this.verse = n;
  }
};
J(be, "defaultVersification", it.English), J(be, "verseRangeSeparator", "-"), J(be, "verseSequenceIndicator", ","), J(be, "verseRangeSeparators", [be.verseRangeSeparator]), J(be, "verseSequenceIndicators", [be.verseSequenceIndicator]), J(be, "chapterDigitShifter", 1e3), J(be, "bookDigitShifter", be.chapterDigitShifter * be.chapterDigitShifter), J(be, "bcvMaxValue", be.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
J(be, "ValidStatusType", Ur);
let $r = be, Ct = class extends Error {
};
var X = {}, fe = {}, or;
function vt() {
  if (or) return fe;
  or = 1;
  function r(S, O, $) {
    if ($ === void 0 && ($ = Array.prototype), S && typeof $.find == "function")
      return $.find.call(S, O);
    for (var Q = 0; Q < S.length; Q++)
      if (t(S, Q)) {
        var se = S[Q];
        if (O.call(void 0, se, Q, S))
          return se;
      }
  }
  function e(S, O) {
    return O === void 0 && (O = Object), O && typeof O.getOwnPropertyDescriptors == "function" && (S = O.create(null, O.getOwnPropertyDescriptors(S))), O && typeof O.freeze == "function" ? O.freeze(S) : S;
  }
  function t(S, O) {
    return Object.prototype.hasOwnProperty.call(S, O);
  }
  function n(S, O) {
    if (S === null || typeof S != "object")
      throw new TypeError("target is not an object");
    for (var $ in O)
      t(O, $) && (S[$] = O[$]);
    return S;
  }
  var a = e({
    allowfullscreen: !0,
    async: !0,
    autofocus: !0,
    autoplay: !0,
    checked: !0,
    controls: !0,
    default: !0,
    defer: !0,
    disabled: !0,
    formnovalidate: !0,
    hidden: !0,
    ismap: !0,
    itemscope: !0,
    loop: !0,
    multiple: !0,
    muted: !0,
    nomodule: !0,
    novalidate: !0,
    open: !0,
    playsinline: !0,
    readonly: !0,
    required: !0,
    reversed: !0,
    selected: !0
  });
  function s(S) {
    return t(a, S.toLowerCase());
  }
  var l = e({
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  });
  function c(S) {
    return t(l, S.toLowerCase());
  }
  var m = e({
    script: !1,
    style: !1,
    textarea: !0,
    title: !0
  });
  function d(S) {
    var O = S.toLowerCase();
    return t(m, O) && !m[O];
  }
  function h(S) {
    var O = S.toLowerCase();
    return t(m, O) && m[O];
  }
  function f(S) {
    return S === v.HTML;
  }
  function g(S) {
    return f(S) || S === v.XML_XHTML_APPLICATION;
  }
  var v = e({
    /**
     * `text/html`, the only mime type that triggers treating an XML document as HTML.
     *
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
     *      WHATWG HTML Spec
     */
    HTML: "text/html",
    /**
     * `application/xml`, the standard mime type for XML documents.
     *
     * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
     *      registration
     * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_APPLICATION: "application/xml",
    /**
     * `text/xml`, an alias for `application/xml`.
     *
     * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
     * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_TEXT: "text/xml",
    /**
     * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
     * but is parsed as an XML document.
     *
     * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
     *      registration
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
     * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
     */
    XML_XHTML_APPLICATION: "application/xhtml+xml",
    /**
     * `image/svg+xml`,
     *
     * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
     * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
     * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
     */
    XML_SVG_IMAGE: "image/svg+xml"
  }), E = Object.keys(v).map(function(S) {
    return v[S];
  });
  function A(S) {
    return E.indexOf(S) > -1;
  }
  var P = e({
    /**
     * The XHTML namespace.
     *
     * @see http://www.w3.org/1999/xhtml
     */
    HTML: "http://www.w3.org/1999/xhtml",
    /**
     * The SVG namespace.
     *
     * @see http://www.w3.org/2000/svg
     */
    SVG: "http://www.w3.org/2000/svg",
    /**
     * The `xml:` namespace.
     *
     * @see http://www.w3.org/XML/1998/namespace
     */
    XML: "http://www.w3.org/XML/1998/namespace",
    /**
     * The `xmlns:` namespace.
     *
     * @see https://www.w3.org/2000/xmlns/
     */
    XMLNS: "http://www.w3.org/2000/xmlns/"
  });
  return fe.assign = n, fe.find = r, fe.freeze = e, fe.HTML_BOOLEAN_ATTRIBUTES = a, fe.HTML_RAW_TEXT_ELEMENTS = m, fe.HTML_VOID_ELEMENTS = l, fe.hasDefaultHTMLNamespace = g, fe.hasOwn = t, fe.isHTMLBooleanAttribute = s, fe.isHTMLRawTextElement = d, fe.isHTMLEscapableRawTextElement = h, fe.isHTMLMimeType = f, fe.isHTMLVoidElement = c, fe.isValidMimeType = A, fe.MIME_TYPE = v, fe.NAMESPACE = P, fe;
}
var mt = {}, ar;
function Lt() {
  if (ar) return mt;
  ar = 1;
  var r = vt();
  function e(g, v) {
    g.prototype = Object.create(Error.prototype, {
      constructor: { value: g },
      name: { value: g.name, enumerable: !0, writable: v }
    });
  }
  var t = r.freeze({
    /**
     * the default value as defined by the spec
     */
    Error: "Error",
    /**
     * @deprecated
     * Use RangeError instead.
     */
    IndexSizeError: "IndexSizeError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    DomstringSizeError: "DomstringSizeError",
    HierarchyRequestError: "HierarchyRequestError",
    WrongDocumentError: "WrongDocumentError",
    InvalidCharacterError: "InvalidCharacterError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    NoDataAllowedError: "NoDataAllowedError",
    NoModificationAllowedError: "NoModificationAllowedError",
    NotFoundError: "NotFoundError",
    NotSupportedError: "NotSupportedError",
    InUseAttributeError: "InUseAttributeError",
    InvalidStateError: "InvalidStateError",
    SyntaxError: "SyntaxError",
    InvalidModificationError: "InvalidModificationError",
    NamespaceError: "NamespaceError",
    /**
     * @deprecated
     * Use TypeError for invalid arguments,
     * "NotSupportedError" DOMException for unsupported operations,
     * and "NotAllowedError" DOMException for denied requests instead.
     */
    InvalidAccessError: "InvalidAccessError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    ValidationError: "ValidationError",
    /**
     * @deprecated
     * Use TypeError instead.
     */
    TypeMismatchError: "TypeMismatchError",
    SecurityError: "SecurityError",
    NetworkError: "NetworkError",
    AbortError: "AbortError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    URLMismatchError: "URLMismatchError",
    QuotaExceededError: "QuotaExceededError",
    TimeoutError: "TimeoutError",
    InvalidNodeTypeError: "InvalidNodeTypeError",
    DataCloneError: "DataCloneError",
    EncodingError: "EncodingError",
    NotReadableError: "NotReadableError",
    UnknownError: "UnknownError",
    ConstraintError: "ConstraintError",
    DataError: "DataError",
    TransactionInactiveError: "TransactionInactiveError",
    ReadOnlyError: "ReadOnlyError",
    VersionError: "VersionError",
    OperationError: "OperationError",
    NotAllowedError: "NotAllowedError",
    OptOutError: "OptOutError"
  }), n = Object.keys(t);
  function a(g) {
    return typeof g == "number" && g >= 1 && g <= 25;
  }
  function s(g) {
    return typeof g == "string" && g.substring(g.length - t.Error.length) === t.Error;
  }
  function l(g, v) {
    a(g) ? (this.name = n[g], this.message = v || "") : (this.message = g, this.name = s(v) ? v : t.Error), Error.captureStackTrace && Error.captureStackTrace(this, l);
  }
  e(l, !0), Object.defineProperties(l.prototype, {
    code: {
      enumerable: !0,
      get: function() {
        var g = n.indexOf(this.name);
        return a(g) ? g : 0;
      }
    }
  });
  for (var c = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25
  }, m = Object.entries(c), d = 0; d < m.length; d++) {
    var h = m[d][0];
    l[h] = m[d][1];
  }
  function f(g, v) {
    this.message = g, this.locator = v, Error.captureStackTrace && Error.captureStackTrace(this, f);
  }
  return e(f), mt.DOMException = l, mt.DOMExceptionName = t, mt.ExceptionCode = c, mt.ParseError = f, mt;
}
var oe = {}, z = {}, sr;
function jr() {
  if (sr) return z;
  sr = 1;
  function r(ae) {
    try {
      typeof ae != "function" && (ae = RegExp);
      var ge = new ae("𝌆", "u").exec("𝌆");
      return !!ge && ge[0].length === 2;
    } catch {
    }
    return !1;
  }
  var e = r();
  function t(ae) {
    if (ae.source[0] !== "[")
      throw new Error(ae + " can not be used with chars");
    return ae.source.slice(1, ae.source.lastIndexOf("]"));
  }
  function n(ae, ge) {
    if (ae.source[0] !== "[")
      throw new Error("/" + ae.source + "/ can not be used with chars_without");
    if (!ge || typeof ge != "string")
      throw new Error(JSON.stringify(ge) + " is not a valid search");
    if (ae.source.indexOf(ge) === -1)
      throw new Error('"' + ge + '" is not is /' + ae.source + "/");
    if (ge === "-" && ae.source.indexOf(ge) !== 1)
      throw new Error('"' + ge + '" is not at the first postion of /' + ae.source + "/");
    return new RegExp(ae.source.replace(ge, ""), e ? "u" : "");
  }
  function a(ae) {
    var ge = this;
    return new RegExp(
      Array.prototype.slice.call(arguments).map(function(qe) {
        var Ue = typeof qe == "string";
        if (Ue && ge === void 0 && qe === "|")
          throw new Error("use regg instead of reg to wrap expressions with `|`!");
        return Ue ? qe : qe.source;
      }).join(""),
      e ? "mu" : "m"
    );
  }
  function s(ae) {
    if (arguments.length === 0)
      throw new Error("no parameters provided");
    return a.apply(s, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var l = "�", c = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  e && (c = a("[", t(c), "\\u{10000}-\\u{10FFFF}", "]"));
  var m = /[\x20\x09\x0D\x0A]/, d = t(m), h = a(m, "+"), f = a(m, "*"), g = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  e && (g = a("[", t(g), "\\u{10000}-\\u{10FFFF}", "]"));
  var v = t(g), E = a("[", v, t(/[-.0-9\xB7]/), t(/[\u0300-\u036F\u203F-\u2040]/), "]"), A = a(g, E, "*"), P = a(E, "+"), S = a("&", A, ";"), O = s(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), $ = s(S, "|", O), Q = a("%", A, ";"), se = s(
    a('"', s(/[^%&"]/, "|", Q, "|", $), "*", '"'),
    "|",
    a("'", s(/[^%&']/, "|", Q, "|", $), "*", "'")
  ), b = s('"', s(/[^<&"]/, "|", $), "*", '"', "|", "'", s(/[^<&']/, "|", $), "*", "'"), k = n(g, ":"), U = n(E, ":"), H = a(k, U, "*"), Z = a(H, s(":", H), "?"), ne = a("^", Z, "$"), Oe = a("(", Z, ")"), ie = s(/"[^"]*"|'[^']*'/), Be = a(/^<\?/, "(", A, ")", s(h, "(", c, "*?)"), "?", /\?>/), y = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, C = s('"', y, '*"', "|", "'", n(y, "'"), "*'"), I = "<!--", T = "-->", B = a(I, s(n(c, "-"), "|", a("-", n(c, "-"))), "*", T), N = "#PCDATA", R = s(
    a(/\(/, f, N, s(f, /\|/, f, Z), "*", f, /\)\*/),
    "|",
    a(/\(/, f, N, f, /\)/)
  ), K = /[?*+]?/, L = a(
    /\([^>]+\)/,
    K
    /*regg(choice, '|', seq), _children_quantity*/
  ), w = s("EMPTY", "|", "ANY", "|", R, "|", L), M = "<!ELEMENT", F = a(M, h, s(Z, "|", Q), h, s(w, "|", Q), f, ">"), G = a("NOTATION", h, /\(/, f, A, s(f, /\|/, f, A), "*", f, /\)/), de = a(/\(/, f, P, s(f, /\|/, f, P), "*", f, /\)/), Ie = s(G, "|", de), De = s(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", Ie), ue = s(/#REQUIRED|#IMPLIED/, "|", s(s("#FIXED", h), "?", b)), _ = s(h, A, h, De, h, ue), je = "<!ATTLIST", Re = a(je, h, A, _, "*", f, ">"), me = "about:legacy-compat", Ve = s('"' + me + '"', "|", "'" + me + "'"), Pe = "SYSTEM", xe = "PUBLIC", Fe = s(s(Pe, h, ie), "|", s(xe, h, C, h, ie)), Je = a(
    "^",
    s(
      s(Pe, h, "(?<SystemLiteralOnly>", ie, ")"),
      "|",
      s(xe, h, "(?<PubidLiteral>", C, ")", h, "(?<SystemLiteral>", ie, ")")
    )
  ), Xe = s(h, "NDATA", h, A), Ce = s(se, "|", s(Fe, Xe, "?")), ee = "<!ENTITY", ze = a(ee, h, A, h, Ce, f, ">"), ce = s(se, "|", Fe), Ke = a(ee, h, "%", h, A, h, ce, f, ">"), bt = s(ze, "|", Ke), Ye = a(xe, h, C), We = a("<!NOTATION", h, A, h, s(Fe, "|", Ye), f, ">"), V = a(f, "=", f), re = /1[.]\d+/, Ae = a(h, "version", V, s("'", re, "'", "|", '"', re, '"')), Ne = /[A-Za-z][-A-Za-z0-9._]*/, Qe = s(h, "encoding", V, s('"', Ne, '"', "|", "'", Ne, "'")), ct = s(h, "standalone", V, s("'", s("yes", "|", "no"), "'", "|", '"', s("yes", "|", "no"), '"')), lt = a(/^<\?xml/, Ae, Qe, "?", ct, "?", f, /\?>/), ft = "<!DOCTYPE", Dt = "<![CDATA[", At = "]]>", pt = /<!\[CDATA\[/, Ze = /\]\]>/, ht = a(c, "*?", Ze), Mt = a(pt, ht);
  return z.chars = t, z.chars_without = n, z.detectUnicodeSupport = r, z.reg = a, z.regg = s, z.ABOUT_LEGACY_COMPAT = me, z.ABOUT_LEGACY_COMPAT_SystemLiteral = Ve, z.AttlistDecl = Re, z.CDATA_START = Dt, z.CDATA_END = At, z.CDSect = Mt, z.Char = c, z.Comment = B, z.COMMENT_START = I, z.COMMENT_END = T, z.DOCTYPE_DECL_START = ft, z.elementdecl = F, z.EntityDecl = bt, z.EntityValue = se, z.ExternalID = Fe, z.ExternalID_match = Je, z.Name = A, z.NotationDecl = We, z.Reference = $, z.PEReference = Q, z.PI = Be, z.PUBLIC = xe, z.PubidLiteral = C, z.QName = Z, z.QName_exact = ne, z.QName_group = Oe, z.S = h, z.SChar_s = d, z.S_OPT = f, z.SYSTEM = Pe, z.SystemLiteral = ie, z.UNICODE_REPLACEMENT_CHARACTER = l, z.UNICODE_SUPPORT = e, z.XMLDecl = lt, z;
}
var ur;
function Vr() {
  if (ur) return oe;
  ur = 1;
  var r = vt(), e = r.find, t = r.hasDefaultHTMLNamespace, n = r.hasOwn, a = r.isHTMLMimeType, s = r.isHTMLRawTextElement, l = r.isHTMLVoidElement, c = r.MIME_TYPE, m = r.NAMESPACE, d = Symbol(), h = Lt(), f = h.DOMException, g = h.DOMExceptionName, v = jr();
  function E(i) {
    if (i !== d)
      throw new TypeError("Illegal constructor");
  }
  function A(i) {
    return i !== "";
  }
  function P(i) {
    return i ? i.split(/[\t\n\f\r ]+/).filter(A) : [];
  }
  function S(i, o) {
    return n(i, o) || (i[o] = !0), i;
  }
  function O(i) {
    if (!i) return [];
    var o = P(i);
    return Object.keys(o.reduce(S, {}));
  }
  function $(i) {
    return function(o) {
      return i && i.indexOf(o) !== -1;
    };
  }
  function Q(i) {
    if (!v.QName_exact.test(i))
      throw new f(f.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + i + '"');
  }
  function se(i, o) {
    Q(o), i = i || null;
    var u = null, p = o;
    if (o.indexOf(":") >= 0) {
      var D = o.split(":");
      u = D[0], p = D[1];
    }
    if (u !== null && i === null)
      throw new f(f.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    if (u === "xml" && i !== r.NAMESPACE.XML)
      throw new f(f.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    if ((u === "xmlns" || o === "xmlns") && i !== r.NAMESPACE.XMLNS)
      throw new f(
        f.NAMESPACE_ERR,
        'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
      );
    if (i === r.NAMESPACE.XMLNS && u !== "xmlns" && o !== "xmlns")
      throw new f(
        f.NAMESPACE_ERR,
        'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
      );
    return [i, u, p];
  }
  function b(i, o) {
    for (var u in i)
      n(i, u) && (o[u] = i[u]);
  }
  function k(i, o) {
    var u = i.prototype;
    if (!(u instanceof o)) {
      let p = function() {
      };
      p.prototype = o.prototype, p = new p(), b(u, p), i.prototype = u = p;
    }
    u.constructor != i && (typeof i != "function" && console.error("unknown Class:" + i), u.constructor = i);
  }
  var U = {}, H = U.ELEMENT_NODE = 1, Z = U.ATTRIBUTE_NODE = 2, ne = U.TEXT_NODE = 3, Oe = U.CDATA_SECTION_NODE = 4, ie = U.ENTITY_REFERENCE_NODE = 5, Be = U.ENTITY_NODE = 6, y = U.PROCESSING_INSTRUCTION_NODE = 7, C = U.COMMENT_NODE = 8, I = U.DOCUMENT_NODE = 9, T = U.DOCUMENT_TYPE_NODE = 10, B = U.DOCUMENT_FRAGMENT_NODE = 11, N = U.NOTATION_NODE = 12, R = r.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function K(i, o) {
    if (o.length < i.length) return K(o, i);
    var u = null;
    for (var p in i) {
      if (i[p] !== o[p]) return u;
      u = i[p];
    }
    return u;
  }
  function L(i) {
    return i.guid || (i.guid = Math.random()), i.guid;
  }
  function w() {
  }
  w.prototype = {
    /**
     * The number of nodes in the list. The range of valid child node indices is 0 to length-1
     * inclusive.
     *
     * @type {number}
     */
    length: 0,
    /**
     * Returns the item at `index`. If index is greater than or equal to the number of nodes in
     * the list, this returns null.
     *
     * @param index
     * Unsigned long Index into the collection.
     * @returns {Node | null}
     * The node at position `index` in the NodeList,
     * or null if that is not a valid index.
     */
    item: function(i) {
      return i >= 0 && i < this.length ? this[i] : null;
    },
    /**
     * Returns a string representation of the NodeList.
     *
     * @param {unknown} nodeFilter
     * __A filter function? Not implemented according to the spec?__.
     * @returns {string}
     * A string representation of the NodeList.
     */
    toString: function(i) {
      for (var o = [], u = 0; u < this.length; u++)
        Ue(this[u], o, i);
      return o.join("");
    },
    /**
     * Filters the NodeList based on a predicate.
     *
     * @param {function(Node): boolean} predicate
     * - A predicate function to filter the NodeList.
     * @returns {Node[]}
     * An array of nodes that satisfy the predicate.
     * @private
     */
    filter: function(i) {
      return Array.prototype.filter.call(this, i);
    },
    /**
     * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
     * not present.
     *
     * @param {Node} item
     * - The Node item to locate in the NodeList.
     * @returns {number}
     * The first index of the node in the NodeList; -1 if not found.
     * @private
     */
    indexOf: function(i) {
      return Array.prototype.indexOf.call(this, i);
    }
  }, w.prototype[Symbol.iterator] = function() {
    var i = this, o = 0;
    return {
      next: function() {
        return o < i.length ? {
          value: i[o++],
          done: !1
        } : {
          done: !0
        };
      },
      return: function() {
        return {
          done: !0
        };
      }
    };
  };
  function M(i, o) {
    this._node = i, this._refresh = o, F(this);
  }
  function F(i) {
    var o = i._node._inc || i._node.ownerDocument._inc;
    if (i._inc !== o) {
      var u = i._refresh(i._node);
      if (Yt(i, "length", u.length), !i.$$length || u.length < i.$$length)
        for (var p = u.length; p in i; p++)
          n(i, p) && delete i[p];
      b(u, i), i._inc = o;
    }
  }
  M.prototype.item = function(i) {
    return F(this), this[i] || null;
  }, k(M, w);
  function G() {
  }
  function de(i, o) {
    for (var u = 0; u < i.length; ) {
      if (i[u] === o)
        return u;
      u++;
    }
  }
  function Ie(i, o, u, p) {
    if (p ? o[de(o, p)] = u : (o[o.length] = u, o.length++), i) {
      u.ownerElement = i;
      var D = i.ownerDocument;
      D && (p && Pe(D, i, p), Ve(D, i, u));
    }
  }
  function De(i, o, u) {
    var p = de(o, u);
    if (p >= 0) {
      for (var D = o.length - 1; p <= D; )
        o[p] = o[++p];
      if (o.length = D, i) {
        var x = i.ownerDocument;
        x && Pe(x, i, u), u.ownerElement = null;
      }
    }
  }
  G.prototype = {
    length: 0,
    item: w.prototype.item,
    /**
     * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
     * document.
     *
     * @param {string} localName
     * The local name of the attribute.
     * @returns {Attr | null}
     * The attribute with the given local name, or null if no such attribute exists.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
     */
    getNamedItem: function(i) {
      this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (i = i.toLowerCase());
      for (var o = 0; o < this.length; ) {
        var u = this[o];
        if (u.nodeName === i)
          return u;
        o++;
      }
      return null;
    },
    /**
     * Set an attribute.
     *
     * @param {Attr} attr
     * The attribute to set.
     * @returns {Attr | null}
     * The old attribute with the same local name and namespace URI as the new one, or null if no
     * such attribute exists.
     * @throws {DOMException}
     * With code:
     * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
     * element.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
     */
    setNamedItem: function(i) {
      var o = i.ownerElement;
      if (o && o !== this._ownerElement)
        throw new f(f.INUSE_ATTRIBUTE_ERR);
      var u = this.getNamedItemNS(i.namespaceURI, i.localName);
      return u === i ? i : (Ie(this._ownerElement, this, i, u), u);
    },
    /**
     * Set an attribute, replacing an existing attribute with the same local name and namespace
     * URI if one exists.
     *
     * @param {Attr} attr
     * The attribute to set.
     * @returns {Attr | null}
     * The old attribute with the same local name and namespace URI as the new one, or null if no
     * such attribute exists.
     * @throws {DOMException}
     * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
     * attribute of another element.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
     */
    setNamedItemNS: function(i) {
      return this.setNamedItem(i);
    },
    /**
     * Removes an attribute specified by the local name.
     *
     * @param {string} localName
     * The local name of the attribute to be removed.
     * @returns {Attr}
     * The attribute node that was removed.
     * @throws {DOMException}
     * With code:
     * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
     * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
     */
    removeNamedItem: function(i) {
      var o = this.getNamedItem(i);
      if (!o)
        throw new f(f.NOT_FOUND_ERR, i);
      return De(this._ownerElement, this, o), o;
    },
    /**
     * Removes an attribute specified by the namespace and local name.
     *
     * @param {string | null} namespaceURI
     * The namespace URI of the attribute to be removed.
     * @param {string} localName
     * The local name of the attribute to be removed.
     * @returns {Attr}
     * The attribute node that was removed.
     * @throws {DOMException}
     * With code:
     * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
     * name is found.
     * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
     */
    removeNamedItemNS: function(i, o) {
      var u = this.getNamedItemNS(i, o);
      if (!u)
        throw new f(f.NOT_FOUND_ERR, i ? i + " : " + o : o);
      return De(this._ownerElement, this, u), u;
    },
    /**
     * Get an attribute by namespace and local name.
     *
     * @param {string | null} namespaceURI
     * The namespace URI of the attribute.
     * @param {string} localName
     * The local name of the attribute.
     * @returns {Attr | null}
     * The attribute with the given namespace URI and local name, or null if no such attribute
     * exists.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
     */
    getNamedItemNS: function(i, o) {
      i || (i = null);
      for (var u = 0; u < this.length; ) {
        var p = this[u];
        if (p.localName === o && p.namespaceURI === i)
          return p;
        u++;
      }
      return null;
    }
  }, G.prototype[Symbol.iterator] = function() {
    var i = this, o = 0;
    return {
      next: function() {
        return o < i.length ? {
          value: i[o++],
          done: !1
        } : {
          done: !0
        };
      },
      return: function() {
        return {
          done: !0
        };
      }
    };
  };
  function ue() {
  }
  ue.prototype = {
    /**
     * Test if the DOM implementation implements a specific feature and version, as specified in
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
     *
     * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
     * feature is supported. The different implementations fairly diverged in what kind of
     * features were reported. The latest version of the spec settled to force this method to
     * always return true, where the functionality was accurate and in use.
     *
     * @deprecated
     * It is deprecated and modern browsers return true in all cases.
     * @function DOMImplementation#hasFeature
     * @param {string} feature
     * The name of the feature to test.
     * @param {string} [version]
     * This is the version number of the feature to test.
     * @returns {boolean}
     * Always returns true.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
     * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
     */
    hasFeature: function(i, o) {
      return !0;
    },
    /**
     * Creates a DOM Document object of the specified type with its document element. Note that
     * based on the {@link DocumentType}
     * given to create the document, the implementation may instantiate specialized
     * {@link Document} objects that support additional features than the "Core", such as "HTML"
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
     * On the other hand, setting the {@link DocumentType} after the document was created makes
     * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
     * such as createHTMLDocument
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
     * can be used to obtain specific types of {@link Document} objects.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - There is no interface/class `XMLDocument`, it returns a `Document`
     * instance (with it's `type` set to `'xml'`).
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     *
     * @function DOMImplementation.createDocument
     * @param {string | null} namespaceURI
     * The
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
     * of the document element to create or null.
     * @param {string | null} qualifiedName
     * The
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
     * of the document element to be created or null.
     * @param {DocumentType | null} [doctype=null]
     * The type of document to be created or null. When doctype is not null, its
     * {@link Node#ownerDocument} attribute is set to the document being created. Default is
     * `null`
     * @returns {Document}
     * A new {@link Document} object with its document element. If the NamespaceURI,
     * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
     * document element.
     * @throws {DOMException}
     * With code:
     *
     * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
     * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
     * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
     * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
     * is different from null, or if the qualifiedName has a prefix that is "xml" and the
     * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
     * or if the DOM implementation does not support the "XML" feature but a non-null namespace
     * URI was provided, since namespaces were defined by XML.
     * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
     * or was created from a different implementation.
     * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
     * "XML" and the language exposed through the Document does not support XML Namespaces (such
     * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
     * @since DOM Level 2.
     * @see {@link #createHTMLDocument}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
     *      Level 3 Core
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
     *      Level 2 Core (initial)
     */
    createDocument: function(i, o, u) {
      var p = c.XML_APPLICATION;
      i === m.HTML ? p = c.XML_XHTML_APPLICATION : i === m.SVG && (p = c.XML_SVG_IMAGE);
      var D = new me(d, { contentType: p });
      if (D.implementation = this, D.childNodes = new w(), D.doctype = u || null, u && D.appendChild(u), o) {
        var x = D.createElementNS(i, o);
        D.appendChild(x);
      }
      return D;
    },
    /**
     * Creates an empty DocumentType node. Entity declarations and notations are not made
     * available. Entity reference expansions and default attribute additions do not occur.
     *
     * **This behavior is slightly different from the one in the specs**:
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     * - `publicId` and `systemId` contain the raw data including any possible quotes,
     *   so they can always be serialized back to the original value
     * - `internalSubset` contains the raw string between `[` and `]` if present,
     *   but is not parsed or validated in any form.
     *
     * @function DOMImplementation#createDocumentType
     * @param {string} qualifiedName
     * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
     * name} of the document type to be created.
     * @param {string} [publicId]
     * The external subset public identifier.
     * @param {string} [systemId]
     * The external subset system identifier.
     * @param {string} [internalSubset]
     * the internal subset or an empty string if it is not present
     * @returns {DocumentType}
     * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
     * @throws {DOMException}
     * With code:
     *
     * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
     * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
     * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
     * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
     * "XML" and the language exposed through the Document does not support XML Namespaces (such
     * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
     * @since DOM Level 2.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
     *      MDN
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
     *      Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
     *      Level 3 Core
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
     *      Level 2 Core
     * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
     * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
     * @prettierignore
     */
    createDocumentType: function(i, o, u, p) {
      Q(i);
      var D = new ft(d);
      return D.name = i, D.nodeName = i, D.publicId = o || "", D.systemId = u || "", D.internalSubset = p || "", D.childNodes = new w(), D;
    },
    /**
     * Returns an HTML document, that might already have a basic DOM structure.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
     * omitted)
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     *
     * @param {string | false} [title]
     * A string containing the title to give the new HTML document.
     * @returns {Document}
     * The HTML document.
     * @since WHATWG Living Standard.
     * @see {@link #createDocument}
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
     * @see https://dom.spec.whatwg.org/#html-document
     */
    createHTMLDocument: function(i) {
      var o = new me(d, { contentType: c.HTML });
      if (o.implementation = this, o.childNodes = new w(), i !== !1) {
        o.doctype = this.createDocumentType("html"), o.doctype.ownerDocument = o, o.appendChild(o.doctype);
        var u = o.createElement("html");
        o.appendChild(u);
        var p = o.createElement("head");
        if (u.appendChild(p), typeof i == "string") {
          var D = o.createElement("title");
          D.appendChild(o.createTextNode(i)), p.appendChild(D);
        }
        u.appendChild(o.createElement("body"));
      }
      return o;
    }
  };
  function _(i) {
    E(i);
  }
  _.prototype = {
    /**
     * The first child of this node.
     *
     * @type {Node | null}
     */
    firstChild: null,
    /**
     * The last child of this node.
     *
     * @type {Node | null}
     */
    lastChild: null,
    /**
     * The previous sibling of this node.
     *
     * @type {Node | null}
     */
    previousSibling: null,
    /**
     * The next sibling of this node.
     *
     * @type {Node | null}
     */
    nextSibling: null,
    /**
     * The parent node of this node.
     *
     * @type {Node | null}
     */
    parentNode: null,
    /**
     * The parent element of this node.
     *
     * @type {Element | null}
     */
    get parentElement() {
      return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
    },
    /**
     * The child nodes of this node.
     *
     * @type {NodeList}
     */
    childNodes: null,
    /**
     * The document object associated with this node.
     *
     * @type {Document | null}
     */
    ownerDocument: null,
    /**
     * The value of this node.
     *
     * @type {string | null}
     */
    nodeValue: null,
    /**
     * The namespace URI of this node.
     *
     * @type {string | null}
     */
    namespaceURI: null,
    /**
     * The prefix of the namespace for this node.
     *
     * @type {string | null}
     */
    prefix: null,
    /**
     * The local part of the qualified name of this node.
     *
     * @type {string | null}
     */
    localName: null,
    /**
     * The baseURI is currently always `about:blank`,
     * since that's what happens when you create a document from scratch.
     *
     * @type {'about:blank'}
     */
    baseURI: "about:blank",
    /**
     * Is true if this node is part of a document.
     *
     * @type {boolean}
     */
    get isConnected() {
      var i = this.getRootNode();
      return i && i.nodeType === i.DOCUMENT_NODE;
    },
    /**
     * Checks whether `other` is an inclusive descendant of this node.
     *
     * @param {Node | null | undefined} other
     * The node to check.
     * @returns {boolean}
     * True if `other` is an inclusive descendant of this node; false otherwise.
     * @see https://dom.spec.whatwg.org/#dom-node-contains
     */
    contains: function(i) {
      if (!i) return !1;
      var o = i;
      do {
        if (this === o) return !0;
        o = i.parentNode;
      } while (o);
      return !1;
    },
    /**
     * @typedef GetRootNodeOptions
     * @property {boolean} [composed=false]
     */
    /**
     * Searches for the root node of this node.
     *
     * **This behavior is slightly different from the in the specs**:
     * - ignores `options.composed`, since `ShadowRoot`s are unsupported, always returns root.
     *
     * @param {GetRootNodeOptions} [options]
     * @returns {Node}
     * Root node.
     * @see https://dom.spec.whatwg.org/#dom-node-getrootnode
     * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
     */
    getRootNode: function(i) {
      var o = this;
      do {
        if (!o.parentNode)
          return o;
        o = o.parentNode;
      } while (o);
    },
    /**
     * Checks whether the given node is equal to this node.
     *
     * @param {Node} [otherNode]
     * @see https://dom.spec.whatwg.org/#concept-node-equals
     */
    isEqualNode: function(i) {
      if (!i || this.nodeType !== i.nodeType) return !1;
      switch (this.nodeType) {
        case this.DOCUMENT_TYPE_NODE:
          if (this.name !== i.name || this.publicId !== i.publicId || this.systemId !== i.systemId) return !1;
          break;
        case this.ELEMENT_NODE:
          if (this.namespaceURI !== i.namespaceURI || this.prefix !== i.prefix || this.localName !== i.localName || this.attributes.length !== i.attributes.length) return !1;
          for (var o = 0; o < this.attributes.length; o++) {
            var u = this.attributes.item(o);
            if (!u.isEqualNode(i.getAttributeNodeNS(u.namespaceURI, u.localName)))
              return !1;
          }
          break;
        case this.ATTRIBUTE_NODE:
          if (this.namespaceURI !== i.namespaceURI || this.localName !== i.localName || this.value !== i.value) return !1;
          break;
        case this.PROCESSING_INSTRUCTION_NODE:
          if (this.target !== i.target || this.data !== i.data)
            return !1;
          break;
        case this.TEXT_NODE:
        case this.COMMENT_NODE:
          if (this.data !== i.data) return !1;
          break;
      }
      if (this.childNodes.length !== i.childNodes.length)
        return !1;
      for (var o = 0; o < this.childNodes.length; o++)
        if (!this.childNodes[o].isEqualNode(i.childNodes[o]))
          return !1;
      return !0;
    },
    /**
     * Checks whether or not the given node is this node.
     *
     * @param {Node} [otherNode]
     */
    isSameNode: function(i) {
      return this === i;
    },
    /**
     * Inserts a node before a reference node as a child of this node.
     *
     * @param {Node} newChild
     * The new child node to be inserted.
     * @param {Node | null} refChild
     * The reference node before which newChild will be inserted.
     * @returns {Node}
     * The new child node successfully inserted.
     * @throws {DOMException}
     * Throws a DOMException if inserting the node would result in a DOM tree that is not
     * well-formed, or if `child` is provided but is not a child of `parent`.
     * See {@link _insertBefore} for more details.
     * @since Modified in DOM L2
     */
    insertBefore: function(i, o) {
      return V(this, i, o);
    },
    /**
     * Replaces an old child node with a new child node within this node.
     *
     * @param {Node} newChild
     * The new node that is to replace the old node.
     * If it already exists in the DOM, it is removed from its original position.
     * @param {Node} oldChild
     * The existing child node to be replaced.
     * @returns {Node}
     * Returns the replaced child node.
     * @throws {DOMException}
     * Throws a DOMException if replacing the node would result in a DOM tree that is not
     * well-formed, or if `oldChild` is not a child of `this`.
     * This can also occur if the pre-replacement validity assertion fails.
     * See {@link _insertBefore}, {@link Node.removeChild}, and
     * {@link assertPreReplacementValidityInDocument} for more details.
     * @see https://dom.spec.whatwg.org/#concept-node-replace
     */
    replaceChild: function(i, o) {
      V(this, i, o, We), o && this.removeChild(o);
    },
    /**
     * Removes an existing child node from this node.
     *
     * @param {Node} oldChild
     * The child node to be removed.
     * @returns {Node}
     * Returns the removed child node.
     * @throws {DOMException}
     * Throws a DOMException if `oldChild` is not a child of `this`.
     * See {@link _removeChild} for more details.
     */
    removeChild: function(i) {
      return Fe(this, i);
    },
    /**
     * Appends a child node to this node.
     *
     * @param {Node} newChild
     * The child node to be appended to this node.
     * If it already exists in the DOM, it is removed from its original position.
     * @returns {Node}
     * Returns the appended child node.
     * @throws {DOMException}
     * Throws a DOMException if appending the node would result in a DOM tree that is not
     * well-formed, or if `newChild` is not a valid Node.
     * See {@link insertBefore} for more details.
     */
    appendChild: function(i) {
      return this.insertBefore(i, null);
    },
    /**
     * Determines whether this node has any child nodes.
     *
     * @returns {boolean}
     * Returns true if this node has any child nodes, and false otherwise.
     */
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    /**
     * Creates a copy of the calling node.
     *
     * @param {boolean} deep
     * If true, the contents of the node are recursively copied.
     * If false, only the node itself (and its attributes, if it is an element) are copied.
     * @returns {Node}
     * Returns the newly created copy of the node.
     * @throws {DOMException}
     * May throw a DOMException if operations within {@link Element#setAttributeNode} or
     * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
     * specific constraints.
     * @see {@link cloneNode}
     */
    cloneNode: function(i) {
      return qt(this.ownerDocument || this, this, i);
    },
    /**
     * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
     * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
     *
     * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
     * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
     * nodes.
     *
     * This method operates recursively, so it also normalizes any and all descendent nodes within
     * the subtree.
     *
     * @throws {DOMException}
     * May throw a DOMException if operations within removeChild or appendData (which are
     * potentially invoked in this method) do not meet their specific constraints.
     * @since Modified in DOM Level 2
     * @see {@link Node.removeChild}
     * @see {@link CharacterData.appendData}
     */
    normalize: function() {
      for (var i = this.firstChild; i; ) {
        var o = i.nextSibling;
        o && o.nodeType == ne && i.nodeType == ne ? (this.removeChild(o), i.appendData(o.data)) : (i.normalize(), i = o);
      }
    },
    /**
     * Checks whether the DOM implementation implements a specific feature and its version.
     *
     * @deprecated
     * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
     * @param {string} feature
     * The package name of the feature to test. This is the same name that can be passed to the
     * method `hasFeature` on `DOMImplementation`.
     * @param {string} version
     * This is the version number of the package name to test.
     * @returns {boolean}
     * Returns true in all cases in the current implementation.
     * @since Introduced in DOM Level 2
     * @see {@link DOMImplementation.hasFeature}
     */
    isSupported: function(i, o) {
      return this.ownerDocument.implementation.hasFeature(i, o);
    },
    /**
     * Look up the prefix associated to the given namespace URI, starting from this node.
     * **The default namespace declarations are ignored by this method.**
     * See Namespace Prefix Lookup for details on the algorithm used by this method.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} namespaceURI
     * The namespace URI for which to find the associated prefix.
     * @returns {string | null}
     * The associated prefix, if found; otherwise, null.
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
     * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
     * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
     * @see https://github.com/xmldom/xmldom/issues/322
     * @prettierignore
     */
    lookupPrefix: function(i) {
      for (var o = this; o; ) {
        var u = o._nsMap;
        if (u) {
          for (var p in u)
            if (n(u, p) && u[p] === i)
              return p;
        }
        o = o.nodeType == Z ? o.ownerDocument : o.parentNode;
      }
      return null;
    },
    /**
     * This function is used to look up the namespace URI associated with the given prefix,
     * starting from this node.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} prefix
     * The prefix for which to find the associated namespace URI.
     * @returns {string | null}
     * The associated namespace URI, if found; otherwise, null.
     * @since DOM Level 3
     * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
     * @prettierignore
     */
    lookupNamespaceURI: function(i) {
      for (var o = this; o; ) {
        var u = o._nsMap;
        if (u && n(u, i))
          return u[i];
        o = o.nodeType == Z ? o.ownerDocument : o.parentNode;
      }
      return null;
    },
    /**
     * Determines whether the given namespace URI is the default namespace.
     *
     * The function works by looking up the prefix associated with the given namespace URI. If no
     * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
     * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
     * the default.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} namespaceURI
     * The namespace URI to be checked.
     * @returns {boolean}
     * Returns true if the given namespace URI is the default namespace, false otherwise.
     * @since DOM Level 3
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
     * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
     * @prettierignore
     */
    isDefaultNamespace: function(i) {
      var o = this.lookupPrefix(i);
      return o == null;
    },
    /**
     * Compares the reference node with a node with regard to their position in the document and
     * according to the document order.
     *
     * @param {Node} other
     * The node to compare the reference node to.
     * @returns {number}
     * Returns how the node is positioned relatively to the reference node according to the
     * bitmask. 0 if reference node and given node are the same.
     * @since DOM Level 3
     * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
     * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
     */
    compareDocumentPosition: function(i) {
      if (this === i) return 0;
      var o = i, u = this, p = null, D = null;
      if (o instanceof Ae && (p = o, o = p.ownerElement), u instanceof Ae && (D = u, u = D.ownerElement, p && o && u === o))
        for (var x = 0, Y; Y = u.attributes[x]; x++) {
          if (Y === p)
            return R.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + R.DOCUMENT_POSITION_PRECEDING;
          if (Y === D)
            return R.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + R.DOCUMENT_POSITION_FOLLOWING;
        }
      if (!o || !u || u.ownerDocument !== o.ownerDocument)
        return R.DOCUMENT_POSITION_DISCONNECTED + R.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (L(u.ownerDocument) > L(o.ownerDocument) ? R.DOCUMENT_POSITION_FOLLOWING : R.DOCUMENT_POSITION_PRECEDING);
      if (D && o === u)
        return R.DOCUMENT_POSITION_CONTAINS + R.DOCUMENT_POSITION_PRECEDING;
      if (p && o === u)
        return R.DOCUMENT_POSITION_CONTAINED_BY + R.DOCUMENT_POSITION_FOLLOWING;
      for (var le = [], Ee = o.parentNode; Ee; ) {
        if (!D && Ee === u)
          return R.DOCUMENT_POSITION_CONTAINED_BY + R.DOCUMENT_POSITION_FOLLOWING;
        le.push(Ee), Ee = Ee.parentNode;
      }
      le.reverse();
      for (var Te = [], ve = u.parentNode; ve; ) {
        if (!p && ve === o)
          return R.DOCUMENT_POSITION_CONTAINS + R.DOCUMENT_POSITION_PRECEDING;
        Te.push(ve), ve = ve.parentNode;
      }
      Te.reverse();
      var et = K(le, Te);
      for (var $e in et.childNodes) {
        var Se = et.childNodes[$e];
        if (Se === u) return R.DOCUMENT_POSITION_FOLLOWING;
        if (Se === o) return R.DOCUMENT_POSITION_PRECEDING;
        if (Te.indexOf(Se) >= 0) return R.DOCUMENT_POSITION_FOLLOWING;
        if (le.indexOf(Se) >= 0) return R.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function je(i) {
    return i == "<" && "&lt;" || i == ">" && "&gt;" || i == "&" && "&amp;" || i == '"' && "&quot;" || "&#" + i.charCodeAt() + ";";
  }
  b(U, _), b(U, _.prototype), b(R, _), b(R, _.prototype);
  function Re(i, o) {
    if (o(i))
      return !0;
    if (i = i.firstChild)
      do
        if (Re(i, o))
          return !0;
      while (i = i.nextSibling);
  }
  function me(i, o) {
    E(i);
    var u = o || {};
    this.ownerDocument = this, this.contentType = u.contentType || c.XML_APPLICATION, this.type = a(this.contentType) ? "html" : "xml";
  }
  function Ve(i, o, u) {
    i && i._inc++;
    var p = u.namespaceURI;
    p === m.XMLNS && (o._nsMap[u.prefix ? u.localName : ""] = u.value);
  }
  function Pe(i, o, u, p) {
    i && i._inc++;
    var D = u.namespaceURI;
    D === m.XMLNS && delete o._nsMap[u.prefix ? u.localName : ""];
  }
  function xe(i, o, u) {
    if (i && i._inc) {
      i._inc++;
      var p = o.childNodes;
      if (u && !u.nextSibling)
        p[p.length++] = u;
      else {
        for (var D = o.firstChild, x = 0; D; )
          p[x++] = D, D = D.nextSibling;
        p.length = x, delete p[p.length];
      }
    }
  }
  function Fe(i, o) {
    if (i !== o.parentNode)
      throw new f(f.NOT_FOUND_ERR, "child's parent is not parent");
    var u = o.previousSibling, p = o.nextSibling;
    return u ? u.nextSibling = p : i.firstChild = p, p ? p.previousSibling = u : i.lastChild = u, xe(i.ownerDocument, i), o.parentNode = null, o.previousSibling = null, o.nextSibling = null, o;
  }
  function Je(i) {
    return i && (i.nodeType === _.DOCUMENT_NODE || i.nodeType === _.DOCUMENT_FRAGMENT_NODE || i.nodeType === _.ELEMENT_NODE);
  }
  function Xe(i) {
    return i && (i.nodeType === _.CDATA_SECTION_NODE || i.nodeType === _.COMMENT_NODE || i.nodeType === _.DOCUMENT_FRAGMENT_NODE || i.nodeType === _.DOCUMENT_TYPE_NODE || i.nodeType === _.ELEMENT_NODE || i.nodeType === _.PROCESSING_INSTRUCTION_NODE || i.nodeType === _.TEXT_NODE);
  }
  function Ce(i) {
    return i && i.nodeType === _.DOCUMENT_TYPE_NODE;
  }
  function ee(i) {
    return i && i.nodeType === _.ELEMENT_NODE;
  }
  function ze(i) {
    return i && i.nodeType === _.TEXT_NODE;
  }
  function ce(i, o) {
    var u = i.childNodes || [];
    if (e(u, ee) || Ce(o))
      return !1;
    var p = e(u, Ce);
    return !(o && p && u.indexOf(p) > u.indexOf(o));
  }
  function Ke(i, o) {
    var u = i.childNodes || [];
    function p(x) {
      return ee(x) && x !== o;
    }
    if (e(u, p))
      return !1;
    var D = e(u, Ce);
    return !(o && D && u.indexOf(D) > u.indexOf(o));
  }
  function bt(i, o, u) {
    if (!Je(i))
      throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + i.nodeType);
    if (u && u.parentNode !== i)
      throw new f(f.NOT_FOUND_ERR, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !Xe(o) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      Ce(o) && i.nodeType !== _.DOCUMENT_NODE
    )
      throw new f(
        f.HIERARCHY_REQUEST_ERR,
        "Unexpected node type " + o.nodeType + " for parent node type " + i.nodeType
      );
  }
  function Ye(i, o, u) {
    var p = i.childNodes || [], D = o.childNodes || [];
    if (o.nodeType === _.DOCUMENT_FRAGMENT_NODE) {
      var x = D.filter(ee);
      if (x.length > 1 || e(D, ze))
        throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (x.length === 1 && !ce(i, u))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (ee(o) && !ce(i, u))
      throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (Ce(o)) {
      if (e(p, Ce))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var Y = e(p, ee);
      if (u && p.indexOf(Y) < p.indexOf(u))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      if (!u && Y)
        throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
  function We(i, o, u) {
    var p = i.childNodes || [], D = o.childNodes || [];
    if (o.nodeType === _.DOCUMENT_FRAGMENT_NODE) {
      var x = D.filter(ee);
      if (x.length > 1 || e(D, ze))
        throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (x.length === 1 && !Ke(i, u))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (ee(o) && !Ke(i, u))
      throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (Ce(o)) {
      if (e(p, function(Ee) {
        return Ce(Ee) && Ee !== u;
      }))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var Y = e(p, ee);
      if (u && p.indexOf(Y) < p.indexOf(u))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
  function V(i, o, u, p) {
    bt(i, o, u), i.nodeType === _.DOCUMENT_NODE && (p || Ye)(i, o, u);
    var D = o.parentNode;
    if (D && D.removeChild(o), o.nodeType === B) {
      var x = o.firstChild;
      if (x == null)
        return o;
      var Y = o.lastChild;
    } else
      x = Y = o;
    var le = u ? u.previousSibling : i.lastChild;
    x.previousSibling = le, Y.nextSibling = u, le ? le.nextSibling = x : i.firstChild = x, u == null ? i.lastChild = Y : u.previousSibling = Y;
    do
      x.parentNode = i;
    while (x !== Y && (x = x.nextSibling));
    return xe(i.ownerDocument || i, i, o), o.nodeType == B && (o.firstChild = o.lastChild = null), o;
  }
  me.prototype = {
    /**
     * The implementation that created this document.
     *
     * @type DOMImplementation
     * @readonly
     */
    implementation: null,
    nodeName: "#document",
    nodeType: I,
    /**
     * The DocumentType node of the document.
     *
     * @type DocumentType
     * @readonly
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(i, o) {
      if (i.nodeType === B) {
        for (var u = i.firstChild; u; ) {
          var p = u.nextSibling;
          this.insertBefore(u, o), u = p;
        }
        return i;
      }
      return V(this, i, o), i.ownerDocument = this, this.documentElement === null && i.nodeType === H && (this.documentElement = i), i;
    },
    removeChild: function(i) {
      var o = Fe(this, i);
      return o === this.documentElement && (this.documentElement = null), o;
    },
    replaceChild: function(i, o) {
      V(this, i, o, We), i.ownerDocument = this, o && this.removeChild(o), ee(i) && (this.documentElement = i);
    },
    // Introduced in DOM Level 2:
    importNode: function(i, o) {
      return Kt(this, i, o);
    },
    // Introduced in DOM Level 2:
    getElementById: function(i) {
      var o = null;
      return Re(this.documentElement, function(u) {
        if (u.nodeType == H && u.getAttribute("id") == i)
          return o = u, !0;
      }), o;
    },
    /**
     * Creates a new `Element` that is owned by this `Document`.
     * In HTML Documents `localName` is the lower cased `tagName`,
     * otherwise no transformation is being applied.
     * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
     *
     * __This implementation differs from the specification:__ - The provided name is not checked
     * against the `Name` production,
     * so no related error will be thrown.
     * - There is no interface `HTMLElement`, it is always an `Element`.
     * - There is no support for a second argument to indicate using custom elements.
     *
     * @param {string} tagName
     * @returns {Element}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
     * @see https://dom.spec.whatwg.org/#dom-document-createelement
     * @see https://dom.spec.whatwg.org/#concept-create-element
     */
    createElement: function(i) {
      var o = new re(d);
      o.ownerDocument = this, this.type === "html" && (i = i.toLowerCase()), t(this.contentType) && (o.namespaceURI = m.HTML), o.nodeName = i, o.tagName = i, o.localName = i, o.childNodes = new w();
      var u = o.attributes = new G();
      return u._ownerElement = o, o;
    },
    /**
     * @returns {DocumentFragment}
     */
    createDocumentFragment: function() {
      var i = new Ze(d);
      return i.ownerDocument = this, i.childNodes = new w(), i;
    },
    /**
     * @param {string} data
     * @returns {Text}
     */
    createTextNode: function(i) {
      var o = new Qe(d);
      return o.ownerDocument = this, o.childNodes = new w(), o.appendData(i), o;
    },
    /**
     * @param {string} data
     * @returns {Comment}
     */
    createComment: function(i) {
      var o = new ct(d);
      return o.ownerDocument = this, o.childNodes = new w(), o.appendData(i), o;
    },
    /**
     * @param {string} data
     * @returns {CDATASection}
     */
    createCDATASection: function(i) {
      var o = new lt(d);
      return o.ownerDocument = this, o.childNodes = new w(), o.appendData(i), o;
    },
    /**
     * @param {string} target
     * @param {string} data
     * @returns {ProcessingInstruction}
     */
    createProcessingInstruction: function(i, o) {
      var u = new ht(d);
      return u.ownerDocument = this, u.childNodes = new w(), u.nodeName = u.target = i, u.nodeValue = u.data = o, u;
    },
    /**
     * Creates an `Attr` node that is owned by this document.
     * In HTML Documents `localName` is the lower cased `name`,
     * otherwise no transformation is being applied.
     *
     * __This implementation differs from the specification:__ - The provided name is not checked
     * against the `Name` production,
     * so no related error will be thrown.
     *
     * @param {string} name
     * @returns {Attr}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
     * @see https://dom.spec.whatwg.org/#dom-document-createattribute
     */
    createAttribute: function(i) {
      if (!v.QName_exact.test(i))
        throw new f(f.INVALID_CHARACTER_ERR, 'invalid character in name "' + i + '"');
      return this.type === "html" && (i = i.toLowerCase()), this._createAttribute(i);
    },
    _createAttribute: function(i) {
      var o = new Ae(d);
      return o.ownerDocument = this, o.childNodes = new w(), o.name = i, o.nodeName = i, o.localName = i, o.specified = !0, o;
    },
    /**
     * Creates an EntityReference object.
     * The current implementation does not fill the `childNodes` with those of the corresponding
     * `Entity`
     *
     * @deprecated
     * In DOM Level 4.
     * @param {string} name
     * The name of the entity to reference. No namespace well-formedness checks are performed.
     * @returns {EntityReference}
     * @throws {DOMException}
     * With code `INVALID_CHARACTER_ERR` when `name` is not valid.
     * @throws {DOMException}
     * with code `NOT_SUPPORTED_ERR` when the document is of type `html`
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-392B75AE
     */
    createEntityReference: function(i) {
      if (!v.Name.test(i))
        throw new f(f.INVALID_CHARACTER_ERR, 'not a valid xml name "' + i + '"');
      if (this.type === "html")
        throw new f("document is an html document", g.NotSupportedError);
      var o = new pt(d);
      return o.ownerDocument = this, o.childNodes = new w(), o.nodeName = i, o;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Element}
     */
    createElementNS: function(i, o) {
      var u = se(i, o), p = new re(d), D = p.attributes = new G();
      return p.childNodes = new w(), p.ownerDocument = this, p.nodeName = o, p.tagName = o, p.namespaceURI = u[0], p.prefix = u[1], p.localName = u[2], D._ownerElement = p, p;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Attr}
     */
    createAttributeNS: function(i, o) {
      var u = se(i, o), p = new Ae(d);
      return p.ownerDocument = this, p.childNodes = new w(), p.nodeName = o, p.name = o, p.specified = !0, p.namespaceURI = u[0], p.prefix = u[1], p.localName = u[2], p;
    }
  }, k(me, _);
  function re(i) {
    E(i), this._nsMap = /* @__PURE__ */ Object.create(null);
  }
  re.prototype = {
    nodeType: H,
    /**
     * The attributes of this element.
     *
     * @type {NamedNodeMap | null}
     */
    attributes: null,
    getQualifiedName: function() {
      return this.prefix ? this.prefix + ":" + this.localName : this.localName;
    },
    _isInHTMLDocumentAndNamespace: function() {
      return this.ownerDocument.type === "html" && this.namespaceURI === m.HTML;
    },
    /**
     * Implementaton of Level2 Core function hasAttributes.
     *
     * @returns {boolean}
     * True if attribute list is not empty.
     * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-NodeHasAttrs
     */
    hasAttributes: function() {
      return !!(this.attributes && this.attributes.length);
    },
    hasAttribute: function(i) {
      return !!this.getAttributeNode(i);
    },
    /**
     * Returns element’s first attribute whose qualified name is `name`, and `null`
     * if there is no such attribute.
     *
     * @param {string} name
     * @returns {string | null}
     */
    getAttribute: function(i) {
      var o = this.getAttributeNode(i);
      return o ? o.value : null;
    },
    getAttributeNode: function(i) {
      return this._isInHTMLDocumentAndNamespace() && (i = i.toLowerCase()), this.attributes.getNamedItem(i);
    },
    /**
     * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
     *
     * @param {string} name
     * @param {string} value
     */
    setAttribute: function(i, o) {
      this._isInHTMLDocumentAndNamespace() && (i = i.toLowerCase());
      var u = this.getAttributeNode(i);
      u ? u.value = u.nodeValue = "" + o : (u = this.ownerDocument._createAttribute(i), u.value = u.nodeValue = "" + o, this.setAttributeNode(u));
    },
    removeAttribute: function(i) {
      var o = this.getAttributeNode(i);
      o && this.removeAttributeNode(o);
    },
    setAttributeNode: function(i) {
      return this.attributes.setNamedItem(i);
    },
    setAttributeNodeNS: function(i) {
      return this.attributes.setNamedItemNS(i);
    },
    removeAttributeNode: function(i) {
      return this.attributes.removeNamedItem(i.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(i, o) {
      var u = this.getAttributeNodeNS(i, o);
      u && this.removeAttributeNode(u);
    },
    hasAttributeNS: function(i, o) {
      return this.getAttributeNodeNS(i, o) != null;
    },
    /**
     * Returns element’s attribute whose namespace is `namespaceURI` and local name is
     * `localName`,
     * or `null` if there is no such attribute.
     *
     * @param {string} namespaceURI
     * @param {string} localName
     * @returns {string | null}
     */
    getAttributeNS: function(i, o) {
      var u = this.getAttributeNodeNS(i, o);
      return u ? u.value : null;
    },
    /**
     * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
     * `localName` to value.
     *
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @param {string} value
     * @see https://dom.spec.whatwg.org/#dom-element-setattributens
     */
    setAttributeNS: function(i, o, u) {
      var p = se(i, o), D = p[2], x = this.getAttributeNodeNS(i, D);
      x ? x.value = x.nodeValue = "" + u : (x = this.ownerDocument.createAttributeNS(i, o), x.value = x.nodeValue = "" + u, this.setAttributeNode(x));
    },
    getAttributeNodeNS: function(i, o) {
      return this.attributes.getNamedItemNS(i, o);
    },
    /**
     * Returns a LiveNodeList of all child elements which have **all** of the given class name(s).
     *
     * Returns an empty list if `classNames` is an empty string or only contains HTML white space
     * characters.
     *
     * Warning: This returns a live LiveNodeList.
     * Changes in the DOM will reflect in the array as the changes occur.
     * If an element selected by this array no longer qualifies for the selector,
     * it will automatically be removed. Be aware of this for iteration purposes.
     *
     * @param {string} classNames
     * Is a string representing the class name(s) to match; multiple class names are separated by
     * (ASCII-)whitespace.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
     */
    getElementsByClassName: function(i) {
      var o = O(i);
      return new M(this, function(u) {
        var p = [];
        return o.length > 0 && Re(u, function(D) {
          if (D !== u && D.nodeType === H) {
            var x = D.getAttribute("class");
            if (x) {
              var Y = i === x;
              if (!Y) {
                var le = O(x);
                Y = o.every($(le));
              }
              Y && p.push(D);
            }
          }
        }), p;
      });
    },
    /**
     * Returns a LiveNodeList of elements with the given qualifiedName.
     * Searching for all descendants can be done by passing `*` as `qualifiedName`.
     *
     * All descendants of the specified element are searched, but not the element itself.
     * The returned list is live, which means it updates itself with the DOM tree automatically.
     * Therefore, there is no need to call `Element.getElementsByTagName()`
     * with the same element and arguments repeatedly if the DOM changes in between calls.
     *
     * When called on an HTML element in an HTML document,
     * `getElementsByTagName` lower-cases the argument before searching for it.
     * This is undesirable when trying to match camel-cased SVG elements (such as
     * `<linearGradient>`) in an HTML document.
     * Instead, use `Element.getElementsByTagNameNS()`,
     * which preserves the capitalization of the tag name.
     *
     * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
     * except that it only searches for elements that are descendants of the specified element.
     *
     * @param {string} qualifiedName
     * @returns {LiveNodeList}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
     */
    getElementsByTagName: function(i) {
      var o = (this.nodeType === I ? this : this.ownerDocument).type === "html", u = i.toLowerCase();
      return new M(this, function(p) {
        var D = [];
        return Re(p, function(x) {
          if (!(x === p || x.nodeType !== H))
            if (i === "*")
              D.push(x);
            else {
              var Y = x.getQualifiedName(), le = o && x.namespaceURI === m.HTML ? u : i;
              Y === le && D.push(x);
            }
        }), D;
      });
    },
    getElementsByTagNameNS: function(i, o) {
      return new M(this, function(u) {
        var p = [];
        return Re(u, function(D) {
          D !== u && D.nodeType === H && (i === "*" || D.namespaceURI === i) && (o === "*" || D.localName == o) && p.push(D);
        }), p;
      });
    }
  }, me.prototype.getElementsByClassName = re.prototype.getElementsByClassName, me.prototype.getElementsByTagName = re.prototype.getElementsByTagName, me.prototype.getElementsByTagNameNS = re.prototype.getElementsByTagNameNS, k(re, _);
  function Ae(i) {
    E(i), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
  }
  Ae.prototype.nodeType = Z, k(Ae, _);
  function Ne(i) {
    E(i);
  }
  Ne.prototype = {
    data: "",
    substringData: function(i, o) {
      return this.data.substring(i, i + o);
    },
    appendData: function(i) {
      i = this.data + i, this.nodeValue = this.data = i, this.length = i.length;
    },
    insertData: function(i, o) {
      this.replaceData(i, 0, o);
    },
    deleteData: function(i, o) {
      this.replaceData(i, o, "");
    },
    replaceData: function(i, o, u) {
      var p = this.data.substring(0, i), D = this.data.substring(i + o);
      u = p + u + D, this.nodeValue = this.data = u, this.length = u.length;
    }
  }, k(Ne, _);
  function Qe(i) {
    E(i);
  }
  Qe.prototype = {
    nodeName: "#text",
    nodeType: ne,
    splitText: function(i) {
      var o = this.data, u = o.substring(i);
      o = o.substring(0, i), this.data = this.nodeValue = o, this.length = o.length;
      var p = this.ownerDocument.createTextNode(u);
      return this.parentNode && this.parentNode.insertBefore(p, this.nextSibling), p;
    }
  }, k(Qe, Ne);
  function ct(i) {
    E(i);
  }
  ct.prototype = {
    nodeName: "#comment",
    nodeType: C
  }, k(ct, Ne);
  function lt(i) {
    E(i);
  }
  lt.prototype = {
    nodeName: "#cdata-section",
    nodeType: Oe
  }, k(lt, Qe);
  function ft(i) {
    E(i);
  }
  ft.prototype.nodeType = T, k(ft, _);
  function Dt(i) {
    E(i);
  }
  Dt.prototype.nodeType = N, k(Dt, _);
  function At(i) {
    E(i);
  }
  At.prototype.nodeType = Be, k(At, _);
  function pt(i) {
    E(i);
  }
  pt.prototype.nodeType = ie, k(pt, _);
  function Ze(i) {
    E(i);
  }
  Ze.prototype.nodeName = "#document-fragment", Ze.prototype.nodeType = B, k(Ze, _);
  function ht(i) {
    E(i);
  }
  ht.prototype.nodeType = y, k(ht, Ne);
  function Mt() {
  }
  Mt.prototype.serializeToString = function(i, o) {
    return ae.call(i, o);
  }, _.prototype.toString = ae;
  function ae(i) {
    var o = [], u = this.nodeType === I && this.documentElement || this, p = u.prefix, D = u.namespaceURI;
    if (D && p == null) {
      var p = u.lookupPrefix(D);
      if (p == null)
        var x = [
          { namespace: D, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return Ue(this, o, i, x), o.join("");
  }
  function ge(i, o, u) {
    var p = i.prefix || "", D = i.namespaceURI;
    if (!D || p === "xml" && D === m.XML || D === m.XMLNS)
      return !1;
    for (var x = u.length; x--; ) {
      var Y = u[x];
      if (Y.prefix === p)
        return Y.namespace !== D;
    }
    return !0;
  }
  function qe(i, o, u) {
    i.push(" ", o, '="', u.replace(/[<>&"\t\n\r]/g, je), '"');
  }
  function Ue(i, o, u, p) {
    p || (p = []);
    var D = i.nodeType === I ? i : i.ownerDocument, x = D.type === "html";
    if (u)
      if (i = u(i), i) {
        if (typeof i == "string") {
          o.push(i);
          return;
        }
      } else
        return;
    switch (i.nodeType) {
      case H:
        var Y = i.attributes, le = Y.length, ye = i.firstChild, Ee = i.tagName, Te = Ee;
        if (!x && !i.prefix && i.namespaceURI) {
          for (var ve, et = 0; et < Y.length; et++)
            if (Y.item(et).name === "xmlns") {
              ve = Y.item(et).value;
              break;
            }
          if (!ve)
            for (var $e = p.length - 1; $e >= 0; $e--) {
              var Se = p[$e];
              if (Se.prefix === "" && Se.namespace === i.namespaceURI) {
                ve = Se.namespace;
                break;
              }
            }
          if (ve !== i.namespaceURI)
            for (var $e = p.length - 1; $e >= 0; $e--) {
              var Se = p[$e];
              if (Se.namespace === i.namespaceURI) {
                Se.prefix && (Te = Se.prefix + ":" + Ee);
                break;
              }
            }
        }
        o.push("<", Te);
        for (var tt = 0; tt < le; tt++) {
          var Le = Y.item(tt);
          Le.prefix == "xmlns" ? p.push({
            prefix: Le.localName,
            namespace: Le.value
          }) : Le.nodeName == "xmlns" && p.push({ prefix: "", namespace: Le.value });
        }
        for (var tt = 0; tt < le; tt++) {
          var Le = Y.item(tt);
          if (ge(Le, x, p)) {
            var rt = Le.prefix || "", Nt = Le.namespaceURI;
            qe(o, rt ? "xmlns:" + rt : "xmlns", Nt), p.push({ prefix: rt, namespace: Nt });
          }
          Ue(Le, o, u, p);
        }
        if (Ee === Te && ge(i, x, p)) {
          var rt = i.prefix || "", Nt = i.namespaceURI;
          qe(o, rt ? "xmlns:" + rt : "xmlns", Nt), p.push({ prefix: rt, namespace: Nt });
        }
        var Ut = !ye;
        if (Ut && (x || i.namespaceURI === m.HTML) && (Ut = l(Ee)), Ut)
          o.push("/>");
        else {
          if (o.push(">"), x && s(Ee))
            for (; ye; )
              ye.data ? o.push(ye.data) : Ue(ye, o, u, p.slice()), ye = ye.nextSibling;
          else
            for (; ye; )
              Ue(ye, o, u, p.slice()), ye = ye.nextSibling;
          o.push("</", Te, ">");
        }
        return;
      case I:
      case B:
        for (var ye = i.firstChild; ye; )
          Ue(ye, o, u, p.slice()), ye = ye.nextSibling;
        return;
      case Z:
        return qe(o, i.name, i.value);
      case ne:
        return o.push(i.data.replace(/[<&>]/g, je));
      case Oe:
        return o.push(v.CDATA_START, i.data, v.CDATA_END);
      case C:
        return o.push(v.COMMENT_START, i.data, v.COMMENT_END);
      case T:
        var Wt = i.publicId, dt = i.systemId;
        o.push(v.DOCTYPE_DECL_START, " ", i.name), Wt ? (o.push(" ", v.PUBLIC, " ", Wt), dt && dt !== "." && o.push(" ", dt)) : dt && dt !== "." && o.push(" ", v.SYSTEM, " ", dt), i.internalSubset && o.push(" [", i.internalSubset, "]"), o.push(">");
        return;
      case y:
        return o.push("<?", i.target, " ", i.data, "?>");
      case ie:
        return o.push("&", i.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        o.push("??", i.nodeName);
    }
  }
  function Kt(i, o, u) {
    var p;
    switch (o.nodeType) {
      case H:
        p = o.cloneNode(!1), p.ownerDocument = i;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case B:
        break;
      case Z:
        u = !0;
        break;
    }
    if (p || (p = o.cloneNode(!1)), p.ownerDocument = i, p.parentNode = null, u)
      for (var D = o.firstChild; D; )
        p.appendChild(Kt(i, D, u)), D = D.nextSibling;
    return p;
  }
  function qt(i, o, u) {
    var p = new o.constructor(d);
    for (var D in o)
      if (n(o, D)) {
        var x = o[D];
        typeof x != "object" && x != p[D] && (p[D] = x);
      }
    switch (o.childNodes && (p.childNodes = new w()), p.ownerDocument = i, p.nodeType) {
      case H:
        var Y = o.attributes, le = p.attributes = new G(), Ee = Y.length;
        le._ownerElement = p;
        for (var Te = 0; Te < Ee; Te++)
          p.setAttributeNode(qt(i, Y.item(Te), !0));
        break;
      case Z:
        u = !0;
    }
    if (u)
      for (var ve = o.firstChild; ve; )
        p.appendChild(qt(i, ve, u)), ve = ve.nextSibling;
    return p;
  }
  function Yt(i, o, u) {
    i[o] = u;
  }
  try {
    if (Object.defineProperty) {
      let i = function(o) {
        switch (o.nodeType) {
          case H:
          case B:
            var u = [];
            for (o = o.firstChild; o; )
              o.nodeType !== 7 && o.nodeType !== 8 && u.push(i(o)), o = o.nextSibling;
            return u.join("");
          default:
            return o.nodeValue;
        }
      };
      Object.defineProperty(M.prototype, "length", {
        get: function() {
          return F(this), this.$$length;
        }
      }), Object.defineProperty(_.prototype, "textContent", {
        get: function() {
          return i(this);
        },
        set: function(o) {
          switch (this.nodeType) {
            case H:
            case B:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (o || String(o)) && this.appendChild(this.ownerDocument.createTextNode(o));
              break;
            default:
              this.data = o, this.value = o, this.nodeValue = o;
          }
        }
      }), Yt = function(o, u, p) {
        o["$$" + u] = p;
      };
    }
  } catch {
  }
  return oe._updateLiveList = F, oe.Attr = Ae, oe.CDATASection = lt, oe.CharacterData = Ne, oe.Comment = ct, oe.Document = me, oe.DocumentFragment = Ze, oe.DocumentType = ft, oe.DOMImplementation = ue, oe.Element = re, oe.Entity = At, oe.EntityReference = pt, oe.LiveNodeList = M, oe.NamedNodeMap = G, oe.Node = _, oe.NodeList = w, oe.Notation = Dt, oe.Text = Qe, oe.ProcessingInstruction = ht, oe.XMLSerializer = Mt, oe;
}
var nt = {}, $t = {}, cr;
function wn() {
  return cr || (cr = 1, function(r) {
    var e = vt().freeze;
    r.XML_ENTITIES = e({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    }), r.HTML_ENTITIES = e({
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      AMP: "&",
      amp: "&",
      And: "⩓",
      and: "∧",
      andand: "⩕",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsd: "∡",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      ap: "≈",
      apacir: "⩯",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      Barwed: "⌆",
      barwed: "⌅",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      Because: "∵",
      because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxDL: "╗",
      boxDl: "╖",
      boxdL: "╕",
      boxdl: "┐",
      boxDR: "╔",
      boxDr: "╓",
      boxdR: "╒",
      boxdr: "┌",
      boxH: "═",
      boxh: "─",
      boxHD: "╦",
      boxHd: "╤",
      boxhD: "╥",
      boxhd: "┬",
      boxHU: "╩",
      boxHu: "╧",
      boxhU: "╨",
      boxhu: "┴",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxUL: "╝",
      boxUl: "╜",
      boxuL: "╛",
      boxul: "┘",
      boxUR: "╚",
      boxUr: "╙",
      boxuR: "╘",
      boxur: "└",
      boxV: "║",
      boxv: "│",
      boxVH: "╬",
      boxVh: "╫",
      boxvH: "╪",
      boxvh: "┼",
      boxVL: "╣",
      boxVl: "╢",
      boxvL: "╡",
      boxvl: "┤",
      boxVR: "╠",
      boxVr: "╟",
      boxvR: "╞",
      boxvr: "├",
      bprime: "‵",
      Breve: "˘",
      breve: "˘",
      brvbar: "¦",
      Bscr: "ℬ",
      bscr: "𝒷",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsol: "\\",
      bsolb: "⧅",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      Cap: "⋒",
      cap: "∩",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      CenterDot: "·",
      centerdot: "·",
      Cfr: "ℭ",
      cfr: "𝔠",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      cir: "○",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      Colon: "∷",
      colon: ":",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      Conint: "∯",
      conint: "∮",
      ContourIntegral: "∮",
      Copf: "ℂ",
      copf: "𝕔",
      coprod: "∐",
      Coproduct: "∐",
      COPY: "©",
      copy: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      Cross: "⨯",
      cross: "✗",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      Cup: "⋓",
      cup: "∪",
      cupbrcap: "⩈",
      CupCap: "≍",
      cupcap: "⩆",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      Dagger: "‡",
      dagger: "†",
      daleth: "ℸ",
      Darr: "↡",
      dArr: "⇓",
      darr: "↓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      DD: "ⅅ",
      dd: "ⅆ",
      ddagger: "‡",
      ddarr: "⇊",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      Diamond: "⋄",
      diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrow: "↓",
      Downarrow: "⇓",
      downarrow: "↓",
      DownArrowBar: "⤓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVector: "↽",
      DownLeftVectorBar: "⥖",
      DownRightTeeVector: "⥟",
      DownRightVector: "⇁",
      DownRightVectorBar: "⥗",
      DownTee: "⊤",
      DownTeeArrow: "↧",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      ecir: "≖",
      Ecirc: "Ê",
      ecirc: "ê",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      eDot: "≑",
      edot: "ė",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp: " ",
      emsp13: " ",
      emsp14: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      Escr: "ℰ",
      escr: "ℯ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      ExponentialE: "ⅇ",
      exponentiale: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      ForAll: "∀",
      forall: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      Fscr: "ℱ",
      fscr: "𝒻",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      gE: "≧",
      ge: "≥",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      ges: "⩾",
      gescc: "⪩",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      Gg: "⋙",
      gg: "≫",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gl: "≷",
      gla: "⪥",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gnE: "≩",
      gne: "⪈",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      Gt: "≫",
      GT: ">",
      gt: ">",
      gtcc: "⪧",
      gtcir: "⩺",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      hArr: "⇔",
      harr: "↔",
      harrcir: "⥈",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      Hfr: "ℌ",
      hfr: "𝔥",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      Hopf: "ℍ",
      hopf: "𝕙",
      horbar: "―",
      HorizontalLine: "─",
      Hscr: "ℋ",
      hscr: "𝒽",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      Ifr: "ℑ",
      ifr: "𝔦",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Im: "ℑ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      in: "∈",
      incare: "℅",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      Int: "∬",
      int: "∫",
      intcal: "⊺",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      Iscr: "ℐ",
      iscr: "𝒾",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      Lang: "⟪",
      lang: "⟨",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      Larr: "↞",
      lArr: "⇐",
      larr: "←",
      larrb: "⇤",
      larrbfs: "⤟",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      lat: "⪫",
      lAtail: "⤛",
      latail: "⤙",
      late: "⪭",
      lates: "⪭︀",
      lBarr: "⤎",
      lbarr: "⤌",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      lE: "≦",
      le: "≤",
      LeftAngleBracket: "⟨",
      LeftArrow: "←",
      Leftarrow: "⇐",
      leftarrow: "←",
      LeftArrowBar: "⇤",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVector: "⇃",
      LeftDownVectorBar: "⥙",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrow: "↔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTee: "⊣",
      LeftTeeArrow: "↤",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangle: "⊲",
      LeftTriangleBar: "⧏",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVector: "↿",
      LeftUpVectorBar: "⥘",
      LeftVector: "↼",
      LeftVectorBar: "⥒",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      les: "⩽",
      lescc: "⪨",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      Ll: "⋘",
      ll: "≪",
      llarr: "⇇",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoust: "⎰",
      lmoustache: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lnE: "≨",
      lne: "⪇",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftarrow: "⟵",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longleftrightarrow: "⟷",
      longmapsto: "⟼",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      longrightarrow: "⟶",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      Lscr: "ℒ",
      lscr: "𝓁",
      Lsh: "↰",
      lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      Lt: "≪",
      LT: "<",
      lt: "<",
      ltcc: "⪦",
      ltcir: "⩹",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      mid: "∣",
      midast: "*",
      midcir: "⫰",
      middot: "·",
      minus: "−",
      minusb: "⊟",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      Mscr: "ℳ",
      mscr: "𝓂",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natur: "♮",
      natural: "♮",
      naturals: "ℕ",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      ne: "≠",
      nearhk: "⤤",
      neArr: "⇗",
      nearr: "↗",
      nearrow: "↗",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: `
`,
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nhArr: "⇎",
      nharr: "↮",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlArr: "⇍",
      nlarr: "↚",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nLeftarrow: "⇍",
      nleftarrow: "↚",
      nLeftrightarrow: "⇎",
      nleftrightarrow: "↮",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      Nopf: "ℕ",
      nopf: "𝕟",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangle: "⋪",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangle: "⋫",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      npar: "∦",
      nparallel: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      npre: "⪯̸",
      nprec: "⊀",
      npreceq: "⪯̸",
      nrArr: "⇏",
      nrarr: "↛",
      nrarrc: "⤳̸",
      nrarrw: "↝̸",
      nRightarrow: "⇏",
      nrightarrow: "↛",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nVDash: "⊯",
      nVdash: "⊮",
      nvDash: "⊭",
      nvdash: "⊬",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwArr: "⇖",
      nwarr: "↖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      ocir: "⊚",
      Ocirc: "Ô",
      ocirc: "ô",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      Or: "⩔",
      or: "∨",
      orarr: "↻",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      Otimes: "⨷",
      otimes: "⊗",
      otimesas: "⨶",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      par: "∥",
      para: "¶",
      parallel: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plus: "+",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      Popf: "ℙ",
      popf: "𝕡",
      pound: "£",
      Pr: "⪻",
      pr: "≺",
      prap: "⪷",
      prcue: "≼",
      prE: "⪳",
      pre: "⪯",
      prec: "≺",
      precapprox: "⪷",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      precsim: "≾",
      Prime: "″",
      prime: "′",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportion: "∷",
      Proportional: "∝",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      Qopf: "ℚ",
      qopf: "𝕢",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      QUOT: '"',
      quot: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      Rang: "⟫",
      rang: "⟩",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      Rarr: "↠",
      rArr: "⇒",
      rarr: "→",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      rAtail: "⤜",
      ratail: "⤚",
      ratio: "∶",
      rationals: "ℚ",
      RBarr: "⤐",
      rBarr: "⤏",
      rbarr: "⤍",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      Re: "ℜ",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      rect: "▭",
      REG: "®",
      reg: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      Rfr: "ℜ",
      rfr: "𝔯",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrow: "→",
      Rightarrow: "⇒",
      rightarrow: "→",
      RightArrowBar: "⇥",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVector: "⇂",
      RightDownVectorBar: "⥕",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTee: "⊢",
      RightTeeArrow: "↦",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangle: "⊳",
      RightTriangleBar: "⧐",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVector: "↾",
      RightUpVectorBar: "⥔",
      RightVector: "⇀",
      RightVectorBar: "⥓",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoust: "⎱",
      rmoustache: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      Ropf: "ℝ",
      ropf: "𝕣",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      Rscr: "ℛ",
      rscr: "𝓇",
      Rsh: "↱",
      rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      Sc: "⪼",
      sc: "≻",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      sccue: "≽",
      scE: "⪴",
      sce: "⪰",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdot: "⋅",
      sdotb: "⊡",
      sdote: "⩦",
      searhk: "⤥",
      seArr: "⇘",
      searr: "↘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      sol: "/",
      solb: "⧄",
      solbar: "⌿",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      squ: "□",
      Square: "□",
      square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      Sub: "⋐",
      sub: "⊂",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      Subset: "⋐",
      subset: "⊂",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succ: "≻",
      succapprox: "⪸",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      Sum: "∑",
      sum: "∑",
      sung: "♪",
      Sup: "⋑",
      sup: "⊃",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      Supset: "⋑",
      supset: "⊃",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swArr: "⇙",
      swarr: "↙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      Therefore: "∴",
      therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      thinsp: " ",
      ThinSpace: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      Tilde: "∼",
      tilde: "˜",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      times: "×",
      timesb: "⊠",
      timesbar: "⨱",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      top: "⊤",
      topbot: "⌶",
      topcir: "⫱",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      TRADE: "™",
      trade: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      Uarr: "↟",
      uArr: "⇑",
      uarr: "↑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrow: "↑",
      Uparrow: "⇑",
      uparrow: "↑",
      UpArrowBar: "⤒",
      UpArrowDownArrow: "⇅",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      updownarrow: "↕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      Upsi: "ϒ",
      upsi: "υ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTee: "⊥",
      UpTeeArrow: "↥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      vArr: "⇕",
      varr: "↕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      Vbar: "⫫",
      vBar: "⫨",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      VDash: "⊫",
      Vdash: "⊩",
      vDash: "⊨",
      vdash: "⊢",
      Vdashl: "⫦",
      Vee: "⋁",
      vee: "∨",
      veebar: "⊻",
      veeeq: "≚",
      vellip: "⋮",
      Verbar: "‖",
      verbar: "|",
      Vert: "‖",
      vert: "|",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      Wedge: "⋀",
      wedge: "∧",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xhArr: "⟺",
      xharr: "⟷",
      Xi: "Ξ",
      xi: "ξ",
      xlArr: "⟸",
      xlarr: "⟵",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrArr: "⟹",
      xrarr: "⟶",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      Yuml: "Ÿ",
      yuml: "ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      Zfr: "ℨ",
      zfr: "𝔷",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      Zopf: "ℤ",
      zopf: "𝕫",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌"
    }), r.entityMap = r.HTML_ENTITIES;
  }($t)), $t;
}
var Tt = {}, lr;
function In() {
  if (lr) return Tt;
  lr = 1;
  var r = vt(), e = jr(), t = Lt(), n = r.isHTMLEscapableRawTextElement, a = r.isHTMLMimeType, s = r.isHTMLRawTextElement, l = r.hasOwn, c = r.NAMESPACE, m = t.ParseError, d = t.DOMException, h = 0, f = 1, g = 2, v = 3, E = 4, A = 5, P = 6, S = 7;
  function O() {
  }
  O.prototype = {
    parse: function(y, C, I) {
      var T = this.domBuilder;
      T.startDocument(), H(C, C = /* @__PURE__ */ Object.create(null)), Q(y, C, I, T, this.errorHandler), T.endDocument();
    }
  };
  var $ = /&#?\w+;?/g;
  function Q(y, C, I, T, B) {
    var N = a(T.mimeType);
    y.indexOf(e.UNICODE_REPLACEMENT_CHARACTER) >= 0 && B.warning("Unicode replacement character detected, source encoding issues?");
    function R(V) {
      if (V > 65535) {
        V -= 65536;
        var re = 55296 + (V >> 10), Ae = 56320 + (V & 1023);
        return String.fromCharCode(re, Ae);
      } else
        return String.fromCharCode(V);
    }
    function K(V) {
      var re = V[V.length - 1] === ";" ? V : V + ";";
      if (!N && re !== V)
        return B.error("EntityRef: expecting ;"), V;
      var Ae = e.Reference.exec(re);
      if (!Ae || Ae[0].length !== re.length)
        return B.error("entity not matching Reference production: " + V), V;
      var Ne = re.slice(1, -1);
      return l(I, Ne) ? I[Ne] : Ne.charAt(0) === "#" ? R(parseInt(Ne.substring(1).replace("x", "0x"))) : (B.error("entity not found:" + V), V);
    }
    function L(V) {
      if (V > ue) {
        var re = y.substring(ue, V).replace($, K);
        G && de(ue), T.characters(re, 0, V - ue), ue = V;
      }
    }
    var w = 0, M = 0, F = /\r\n?|\n|$/g, G = T.locator;
    function de(V, re) {
      for (; V >= M && (re = F.exec(y)); )
        w = M, M = re.index + re[0].length, G.lineNumber++;
      G.columnNumber = V - w + 1;
    }
    for (var Ie = [{ currentNSMap: C }], De = [], ue = 0; ; ) {
      try {
        var _ = y.indexOf("<", ue);
        if (_ < 0) {
          if (!N && De.length > 0)
            return B.fatalError("unclosed xml tag(s): " + De.join(", "));
          if (!y.substring(ue).match(/^\s*$/)) {
            var je = T.doc, Re = je.createTextNode(y.substring(ue));
            if (je.documentElement)
              return B.error("Extra content at the end of the document");
            je.appendChild(Re), T.currentElement = Re;
          }
          return;
        }
        if (_ > ue) {
          var me = y.substring(ue, _);
          !N && De.length === 0 && (me = me.replace(new RegExp(e.S_OPT.source, "g"), ""), me && B.error("Unexpected content outside root element: '" + me + "'")), L(_);
        }
        switch (y.charAt(_ + 1)) {
          case "/":
            var ce = y.indexOf(">", _ + 2), Ve = y.substring(_ + 2, ce > 0 ? ce : void 0);
            if (!Ve)
              return B.fatalError("end tag name missing");
            var Pe = ce > 0 && e.reg("^", e.QName_group, e.S_OPT, "$").exec(Ve);
            if (!Pe)
              return B.fatalError('end tag name contains invalid characters: "' + Ve + '"');
            if (!T.currentElement && !T.doc.documentElement)
              return;
            var xe = De[De.length - 1] || T.currentElement.tagName || T.doc.documentElement.tagName || "";
            if (xe !== Pe[1]) {
              var Fe = Pe[1].toLowerCase();
              if (!N || xe.toLowerCase() !== Fe)
                return B.fatalError('Opening and ending tag mismatch: "' + xe + '" != "' + Ve + '"');
            }
            var Je = Ie.pop();
            De.pop();
            var Xe = Je.localNSMap;
            if (T.endElement(Je.uri, Je.localName, xe), Xe)
              for (var Ce in Xe)
                l(Xe, Ce) && T.endPrefixMapping(Ce);
            ce++;
            break;
          // end element
          case "?":
            G && de(_), ce = ie(y, _, T, B);
            break;
          case "!":
            G && de(_), ce = Oe(y, _, T, B, N);
            break;
          default:
            G && de(_);
            var ee = new Be(), ze = Ie[Ie.length - 1].currentNSMap, ce = b(y, _, ee, ze, K, B, N), Ke = ee.length;
            if (ee.closed || (N && r.isHTMLVoidElement(ee.tagName) ? ee.closed = !0 : De.push(ee.tagName)), G && Ke) {
              for (var bt = se(G, {}), Ye = 0; Ye < Ke; Ye++) {
                var We = ee[Ye];
                de(We.offset), We.locator = se(G, {});
              }
              T.locator = bt, k(ee, T, ze) && Ie.push(ee), T.locator = G;
            } else
              k(ee, T, ze) && Ie.push(ee);
            N && !ee.closed ? ce = U(y, ce, ee.tagName, K, T) : ce++;
        }
      } catch (V) {
        if (V instanceof m)
          throw V;
        if (V instanceof d)
          throw new m(V.name + ": " + V.message, T.locator, V);
        B.error("element parse error: " + V), ce = -1;
      }
      ce > ue ? ue = ce : L(Math.max(_, ue) + 1);
    }
  }
  function se(y, C) {
    return C.lineNumber = y.lineNumber, C.columnNumber = y.columnNumber, C;
  }
  function b(y, C, I, T, B, N, R) {
    function K(de, Ie, De) {
      if (l(I.attributeNames, de))
        return N.fatalError("Attribute " + de + " redefined");
      if (!R && Ie.indexOf("<") >= 0)
        return N.fatalError("Unescaped '<' not allowed in attributes values");
      I.addValue(
        de,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        Ie.replace(/[\t\n\r]/g, " ").replace($, B),
        De
      );
    }
    for (var L, w, M = ++C, F = h; ; ) {
      var G = y.charAt(M);
      switch (G) {
        case "=":
          if (F === f)
            L = y.slice(C, M), F = v;
          else if (F === g)
            F = v;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (F === v || F === f)
            if (F === f && (N.warning('attribute value must after "="'), L = y.slice(C, M)), C = M + 1, M = y.indexOf(G, C), M > 0)
              w = y.slice(C, M), K(L, w, C - 1), F = A;
            else
              throw new Error("attribute value no end '" + G + "' match");
          else if (F == E)
            w = y.slice(C, M), K(L, w, C), N.warning('attribute "' + L + '" missed start quot(' + G + ")!!"), C = M + 1, F = A;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (F) {
            case h:
              I.setTagName(y.slice(C, M));
            case A:
            case P:
            case S:
              F = S, I.closed = !0;
            case E:
            case f:
              break;
            case g:
              I.closed = !0;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return N.error("unexpected end of input"), F == h && I.setTagName(y.slice(C, M)), M;
        case ">":
          switch (F) {
            case h:
              I.setTagName(y.slice(C, M));
            case A:
            case P:
            case S:
              break;
            //normal
            case E:
            //Compatible state
            case f:
              w = y.slice(C, M), w.slice(-1) === "/" && (I.closed = !0, w = w.slice(0, -1));
            case g:
              F === g && (w = L), F == E ? (N.warning('attribute "' + w + '" missed quot(")!'), K(L, w, C)) : (R || N.warning('attribute "' + w + '" missed value!! "' + w + '" instead!!'), K(w, w, C));
              break;
            case v:
              if (!R)
                return N.fatalError(`AttValue: ' or " expected`);
          }
          return M;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          G = " ";
        default:
          if (G <= " ")
            switch (F) {
              case h:
                I.setTagName(y.slice(C, M)), F = P;
                break;
              case f:
                L = y.slice(C, M), F = g;
                break;
              case E:
                var w = y.slice(C, M);
                N.warning('attribute "' + w + '" missed quot(")!!'), K(L, w, C);
              case A:
                F = P;
                break;
            }
          else
            switch (F) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case g:
                R || N.warning('attribute "' + L + '" missed value!! "' + L + '" instead2!!'), K(L, L, C), C = M, F = f;
                break;
              case A:
                N.warning('attribute space is required"' + L + '"!!');
              case P:
                F = f, C = M;
                break;
              case v:
                F = E, C = M;
                break;
              case S:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      M++;
    }
  }
  function k(y, C, I) {
    for (var T = y.tagName, B = null, F = y.length; F--; ) {
      var N = y[F], R = N.qName, K = N.value, G = R.indexOf(":");
      if (G > 0)
        var L = N.prefix = R.slice(0, G), w = R.slice(G + 1), M = L === "xmlns" && w;
      else
        w = R, L = null, M = R === "xmlns" && "";
      N.localName = w, M !== !1 && (B == null && (B = /* @__PURE__ */ Object.create(null), H(I, I = /* @__PURE__ */ Object.create(null))), I[M] = B[M] = K, N.uri = c.XMLNS, C.startPrefixMapping(M, K));
    }
    for (var F = y.length; F--; )
      N = y[F], N.prefix && (N.prefix === "xml" && (N.uri = c.XML), N.prefix !== "xmlns" && (N.uri = I[N.prefix]));
    var G = T.indexOf(":");
    G > 0 ? (L = y.prefix = T.slice(0, G), w = y.localName = T.slice(G + 1)) : (L = null, w = y.localName = T);
    var de = y.uri = I[L || ""];
    if (C.startElement(de, w, T, y), y.closed) {
      if (C.endElement(de, w, T), B)
        for (L in B)
          l(B, L) && C.endPrefixMapping(L);
    } else
      return y.currentNSMap = I, y.localNSMap = B, !0;
  }
  function U(y, C, I, T, B) {
    var N = n(I);
    if (N || s(I)) {
      var R = y.indexOf("</" + I + ">", C), K = y.substring(C + 1, R);
      return N && (K = K.replace($, T)), B.characters(K, 0, K.length), R;
    }
    return C + 1;
  }
  function H(y, C) {
    for (var I in y)
      l(y, I) && (C[I] = y[I]);
  }
  function Z(y, C) {
    var I = C;
    function T(M) {
      return M = M || 0, y.charAt(I + M);
    }
    function B(M) {
      M = M || 1, I += M;
    }
    function N() {
      for (var M = 0; I < y.length; ) {
        var F = T();
        if (F !== " " && F !== `
` && F !== "	" && F !== "\r")
          return M;
        M++, B();
      }
      return -1;
    }
    function R() {
      return y.substring(I);
    }
    function K(M) {
      return y.substring(I, I + M.length) === M;
    }
    function L(M) {
      return y.substring(I, I + M.length).toUpperCase() === M.toUpperCase();
    }
    function w(M) {
      var F = e.reg("^", M), G = F.exec(R());
      return G ? (B(G[0].length), G[0]) : null;
    }
    return {
      char: T,
      getIndex: function() {
        return I;
      },
      getMatch: w,
      getSource: function() {
        return y;
      },
      skip: B,
      skipBlanks: N,
      substringFromIndex: R,
      substringStartsWith: K,
      substringStartsWithCaseInsensitive: L
    };
  }
  function ne(y, C) {
    function I(K, L) {
      var w = e.PI.exec(K.substringFromIndex());
      return w ? w[1].toLowerCase() === "xml" ? L.fatalError(
        "xml declaration is only allowed at the start of the document, but found at position " + K.getIndex()
      ) : (K.skip(w[0].length), w[0]) : L.fatalError("processing instruction is not well-formed at position " + K.getIndex());
    }
    var T = y.getSource();
    if (y.char() === "[") {
      y.skip(1);
      for (var B = y.getIndex(); y.getIndex() < T.length; ) {
        if (y.skipBlanks(), y.char() === "]") {
          var N = T.substring(B, y.getIndex());
          return y.skip(1), N;
        }
        var R = null;
        if (y.char() === "<" && y.char(1) === "!")
          switch (y.char(2)) {
            case "E":
              y.char(3) === "L" ? R = y.getMatch(e.elementdecl) : y.char(3) === "N" && (R = y.getMatch(e.EntityDecl));
              break;
            case "A":
              R = y.getMatch(e.AttlistDecl);
              break;
            case "N":
              R = y.getMatch(e.NotationDecl);
              break;
            case "-":
              R = y.getMatch(e.Comment);
              break;
          }
        else if (y.char() === "<" && y.char(1) === "?")
          R = I(y, C);
        else if (y.char() === "%")
          R = y.getMatch(e.PEReference);
        else
          return C.fatalError("Error detected in Markup declaration");
        if (!R)
          return C.fatalError("Error in internal subset at position " + y.getIndex());
      }
      return C.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function Oe(y, C, I, T, B) {
    var N = Z(y, C);
    switch (B ? N.char(2).toUpperCase() : N.char(2)) {
      case "-":
        var R = N.getMatch(e.Comment);
        return R ? (I.comment(R, e.COMMENT_START.length, R.length - e.COMMENT_START.length - e.COMMENT_END.length), N.getIndex()) : T.fatalError("comment is not well-formed at position " + N.getIndex());
      case "[":
        var K = N.getMatch(e.CDSect);
        return K ? !B && !I.currentElement ? T.fatalError("CDATA outside of element") : (I.startCDATA(), I.characters(K, e.CDATA_START.length, K.length - e.CDATA_START.length - e.CDATA_END.length), I.endCDATA(), N.getIndex()) : T.fatalError("Invalid CDATA starting at position " + C);
      case "D": {
        if (I.doc && I.doc.documentElement)
          return T.fatalError("Doctype not allowed inside or after documentElement at position " + N.getIndex());
        if (B ? !N.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START) : !N.substringStartsWith(e.DOCTYPE_DECL_START))
          return T.fatalError("Expected " + e.DOCTYPE_DECL_START + " at position " + N.getIndex());
        if (N.skip(e.DOCTYPE_DECL_START.length), N.skipBlanks() < 1)
          return T.fatalError("Expected whitespace after " + e.DOCTYPE_DECL_START + " at position " + N.getIndex());
        var L = {
          name: void 0,
          publicId: void 0,
          systemId: void 0,
          internalSubset: void 0
        };
        if (L.name = N.getMatch(e.Name), !L.name)
          return T.fatalError("doctype name missing or contains unexpected characters at position " + N.getIndex());
        if (B && L.name.toLowerCase() !== "html" && T.warning("Unexpected DOCTYPE in HTML document at position " + N.getIndex()), N.skipBlanks(), N.substringStartsWith(e.PUBLIC) || N.substringStartsWith(e.SYSTEM)) {
          var w = e.ExternalID_match.exec(N.substringFromIndex());
          if (!w)
            return T.fatalError("doctype external id is not well-formed at position " + N.getIndex());
          w.groups.SystemLiteralOnly !== void 0 ? L.systemId = w.groups.SystemLiteralOnly : (L.systemId = w.groups.SystemLiteral, L.publicId = w.groups.PubidLiteral), N.skip(w[0].length);
        } else if (B && N.substringStartsWithCaseInsensitive(e.SYSTEM)) {
          if (N.skip(e.SYSTEM.length), N.skipBlanks() < 1)
            return T.fatalError("Expected whitespace after " + e.SYSTEM + " at position " + N.getIndex());
          if (L.systemId = N.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral), !L.systemId)
            return T.fatalError(
              "Expected " + e.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + e.SYSTEM + " at position " + N.getIndex()
            );
        }
        return B && L.systemId && !e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(L.systemId) && T.warning("Unexpected doctype.systemId in HTML document at position " + N.getIndex()), B || (N.skipBlanks(), L.internalSubset = ne(N, T)), N.skipBlanks(), N.char() !== ">" ? T.fatalError("doctype not terminated with > at position " + N.getIndex()) : (N.skip(1), I.startDTD(L.name, L.publicId, L.systemId, L.internalSubset), I.endDTD(), N.getIndex());
      }
      default:
        return T.fatalError('Not well-formed XML starting with "<!" at position ' + C);
    }
  }
  function ie(y, C, I, T) {
    var B = y.substring(C).match(e.PI);
    if (!B)
      return T.fatalError("Invalid processing instruction starting at position " + C);
    if (B[1].toLowerCase() === "xml") {
      if (C > 0)
        return T.fatalError(
          "processing instruction at position " + C + " is an xml declaration which is only at the start of the document"
        );
      if (!e.XMLDecl.test(y.substring(C)))
        return T.fatalError("xml declaration is not well-formed");
    }
    return I.processingInstruction(B[1], B[2]), C + B[0].length;
  }
  function Be() {
    this.attributeNames = /* @__PURE__ */ Object.create(null);
  }
  return Be.prototype = {
    setTagName: function(y) {
      if (!e.QName_exact.test(y))
        throw new Error("invalid tagName:" + y);
      this.tagName = y;
    },
    addValue: function(y, C, I) {
      if (!e.QName_exact.test(y))
        throw new Error("invalid attribute:" + y);
      this.attributeNames[y] = this.length, this[this.length++] = { qName: y, value: C, offset: I };
    },
    length: 0,
    getLocalName: function(y) {
      return this[y].localName;
    },
    getLocator: function(y) {
      return this[y].locator;
    },
    getQName: function(y) {
      return this[y].qName;
    },
    getURI: function(y) {
      return this[y].uri;
    },
    getValue: function(y) {
      return this[y].value;
    }
    //	,getIndex:function(uri, localName)){
    //		if(localName){
    //
    //		}else{
    //			var qName = uri
    //		}
    //	},
    //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
    //	getType:function(uri,localName){}
    //	getType:function(i){},
  }, Tt.XMLReader = O, Tt.parseUtils = Z, Tt.parseDoctypeCommentOrCData = Oe, Tt;
}
var fr;
function xn() {
  if (fr) return nt;
  fr = 1;
  var r = vt(), e = Vr(), t = Lt(), n = wn(), a = In(), s = e.DOMImplementation, l = r.hasDefaultHTMLNamespace, c = r.isHTMLMimeType, m = r.isValidMimeType, d = r.MIME_TYPE, h = r.NAMESPACE, f = t.ParseError, g = a.XMLReader;
  function v(b) {
    return b.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028\u2029]/g, `
`);
  }
  function E(b) {
    if (b = b || {}, b.locator === void 0 && (b.locator = !0), this.assign = b.assign || r.assign, this.domHandler = b.domHandler || A, this.onError = b.onError || b.errorHandler, b.errorHandler && typeof b.errorHandler != "function")
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    b.errorHandler && b.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = b.normalizeLineEndings || v, this.locator = !!b.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), b.xmlns);
  }
  E.prototype.parseFromString = function(b, k) {
    if (!m(k))
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + k + '" is not valid.');
    var U = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), H = n.XML_ENTITIES, Z = U[""] || null;
    l(k) ? (H = n.HTML_ENTITIES, Z = h.HTML) : k === d.XML_SVG_IMAGE && (Z = h.SVG), U[""] = Z, U.xml = U.xml || h.XML;
    var ne = new this.domHandler({
      mimeType: k,
      defaultNamespace: Z,
      onError: this.onError
    }), Oe = this.locator ? {} : void 0;
    this.locator && ne.setDocumentLocator(Oe);
    var ie = new g();
    ie.errorHandler = ne, ie.domBuilder = ne;
    var Be = !r.isHTMLMimeType(k);
    return Be && typeof b != "string" && ie.errorHandler.fatalError("source is not a string"), ie.parse(this.normalizeLineEndings(String(b)), U, H), ne.doc.documentElement || ie.errorHandler.fatalError("missing root element"), ne.doc;
  };
  function A(b) {
    var k = b || {};
    this.mimeType = k.mimeType || d.XML_APPLICATION, this.defaultNamespace = k.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = k.onError;
  }
  function P(b, k) {
    k.lineNumber = b.lineNumber, k.columnNumber = b.columnNumber;
  }
  A.prototype = {
    /**
     * Either creates an XML or an HTML document and stores it under `this.doc`.
     * If it is an XML document, `this.defaultNamespace` is used to create it,
     * and it will not contain any `childNodes`.
     * If it is an HTML document, it will be created without any `childNodes`.
     *
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
     */
    startDocument: function() {
      var b = new s();
      this.doc = c(this.mimeType) ? b.createHTMLDocument(!1) : b.createDocument(this.defaultNamespace, "");
    },
    startElement: function(b, k, U, H) {
      var Z = this.doc, ne = Z.createElementNS(b, U || k), Oe = H.length;
      $(this, ne), this.currentElement = ne, this.locator && P(this.locator, ne);
      for (var ie = 0; ie < Oe; ie++) {
        var b = H.getURI(ie), Be = H.getValue(ie), U = H.getQName(ie), y = Z.createAttributeNS(b, U);
        this.locator && P(H.getLocator(ie), y), y.value = y.nodeValue = Be, ne.setAttributeNode(y);
      }
    },
    endElement: function(b, k, U) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(b, k) {
    },
    endPrefixMapping: function(b) {
    },
    processingInstruction: function(b, k) {
      var U = this.doc.createProcessingInstruction(b, k);
      this.locator && P(this.locator, U), $(this, U);
    },
    ignorableWhitespace: function(b, k, U) {
    },
    characters: function(b, k, U) {
      if (b = O.apply(this, arguments), b) {
        if (this.cdata)
          var H = this.doc.createCDATASection(b);
        else
          var H = this.doc.createTextNode(b);
        this.currentElement ? this.currentElement.appendChild(H) : /^\s*$/.test(b) && this.doc.appendChild(H), this.locator && P(this.locator, H);
      }
    },
    skippedEntity: function(b) {
    },
    endDocument: function() {
      this.doc.normalize();
    },
    /**
     * Stores the locator to be able to set the `columnNumber` and `lineNumber`
     * on the created DOM nodes.
     *
     * @param {Locator} locator
     */
    setDocumentLocator: function(b) {
      b && (b.lineNumber = 0), this.locator = b;
    },
    //LexicalHandler
    comment: function(b, k, U) {
      b = O.apply(this, arguments);
      var H = this.doc.createComment(b);
      this.locator && P(this.locator, H), $(this, H);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(b, k, U, H) {
      var Z = this.doc.implementation;
      if (Z && Z.createDocumentType) {
        var ne = Z.createDocumentType(b, k, U, H);
        this.locator && P(this.locator, ne), $(this, ne), this.doc.doctype = ne;
      }
    },
    reportError: function(b, k) {
      if (typeof this.onError == "function")
        try {
          this.onError(b, k, this);
        } catch (U) {
          throw new f("Reporting " + b + ' "' + k + '" caused ' + U, this.locator);
        }
      else
        console.error("[xmldom " + b + "]	" + k, S(this.locator));
    },
    /**
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(b) {
      this.reportError("warning", b);
    },
    error: function(b) {
      this.reportError("error", b);
    },
    /**
     * This function reports a fatal error and throws a ParseError.
     *
     * @param {string} message
     * - The message to be used for reporting and throwing the error.
     * @returns {never}
     * This function always throws an error and never returns a value.
     * @throws {ParseError}
     * Always throws a ParseError with the provided message.
     */
    fatalError: function(b) {
      throw this.reportError("fatalError", b), new f(b, this.locator);
    }
  };
  function S(b) {
    if (b)
      return `
@#[line:` + b.lineNumber + ",col:" + b.columnNumber + "]";
  }
  function O(b, k, U) {
    return typeof b == "string" ? b.substr(k, U) : b.length >= k + U || k ? new java.lang.String(b, k, U) + "" : b;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function(b) {
      A.prototype[b] = function() {
        return null;
      };
    }
  );
  function $(b, k) {
    b.currentElement ? b.currentElement.appendChild(k) : b.doc.appendChild(k);
  }
  function Q(b) {
    if (b === "error") throw "onErrorStopParsing";
  }
  function se() {
    throw "onWarningStopParsing";
  }
  return nt.__DOMHandler = A, nt.DOMParser = E, nt.normalizeLineEndings = v, nt.onErrorStopParsing = Q, nt.onWarningStopParsing = se, nt;
}
var pr;
function Sn() {
  if (pr) return X;
  pr = 1;
  var r = vt();
  X.assign = r.assign, X.hasDefaultHTMLNamespace = r.hasDefaultHTMLNamespace, X.isHTMLMimeType = r.isHTMLMimeType, X.isValidMimeType = r.isValidMimeType, X.MIME_TYPE = r.MIME_TYPE, X.NAMESPACE = r.NAMESPACE;
  var e = Lt();
  X.DOMException = e.DOMException, X.DOMExceptionName = e.DOMExceptionName, X.ExceptionCode = e.ExceptionCode, X.ParseError = e.ParseError;
  var t = Vr();
  X.Attr = t.Attr, X.CDATASection = t.CDATASection, X.CharacterData = t.CharacterData, X.Comment = t.Comment, X.Document = t.Document, X.DocumentFragment = t.DocumentFragment, X.DocumentType = t.DocumentType, X.DOMImplementation = t.DOMImplementation, X.Element = t.Element, X.Entity = t.Entity, X.EntityReference = t.EntityReference, X.LiveNodeList = t.LiveNodeList, X.NamedNodeMap = t.NamedNodeMap, X.Node = t.Node, X.NodeList = t.NodeList, X.Notation = t.Notation, X.ProcessingInstruction = t.ProcessingInstruction, X.Text = t.Text, X.XMLSerializer = t.XMLSerializer;
  var n = xn();
  return X.DOMParser = n.DOMParser, X.normalizeLineEndings = n.normalizeLineEndings, X.onErrorStopParsing = n.onErrorStopParsing, X.onWarningStopParsing = n.onWarningStopParsing, X;
}
Sn();
const Pt = "USJ";
var Me = {}, jt, hr;
function On() {
  return hr || (hr = 1, jt = () => {
    const r = "\\ud800-\\udfff", l = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", c = "\\ufe0e\\ufe0f", m = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", d = `[${r}]`, h = `[${l}]`, f = "\\ud83c[\\udffb-\\udfff]", g = `(?:${h}|${f})`, v = `[^${r}]`, E = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", A = "[\\ud800-\\udbff][\\udc00-\\udfff]", P = "\\u200d", S = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", O = `[${m}]`, $ = `${g}?`, Q = `[${c}]?`, se = `(?:${P}(?:${[v, E, A].join("|")})${Q + $})*`, b = Q + $ + se, U = `(?:${[`${v}${h}?`, h, E, A, d, O].join("|")})`;
    return new RegExp(`${S}|${f}(?=${f})|${U + b}`, "g");
  }), jt;
}
var dr;
function Mn() {
  if (dr) return Me;
  dr = 1;
  var r = Me && Me.__importDefault || function(m) {
    return m && m.__esModule ? m : { default: m };
  };
  Object.defineProperty(Me, "__esModule", { value: !0 });
  var e = r(On());
  function t(m) {
    if (typeof m != "string")
      throw new Error("A string is expected as input");
    return m.match(e.default()) || [];
  }
  Me.toArray = t;
  function n(m) {
    if (typeof m != "string")
      throw new Error("Input must be a string");
    var d = m.match(e.default());
    return d === null ? 0 : d.length;
  }
  Me.length = n;
  function a(m, d, h) {
    if (d === void 0 && (d = 0), typeof m != "string")
      throw new Error("Input must be a string");
    (typeof d != "number" || d < 0) && (d = 0), typeof h == "number" && h < 0 && (h = 0);
    var f = m.match(e.default());
    return f ? f.slice(d, h).join("") : "";
  }
  Me.substring = a;
  function s(m, d, h) {
    if (d === void 0 && (d = 0), typeof m != "string")
      throw new Error("Input must be a string");
    var f = n(m);
    if (typeof d != "number" && (d = parseInt(d, 10)), d >= f)
      return "";
    d < 0 && (d += f);
    var g;
    typeof h > "u" ? g = f : (typeof h != "number" && (h = parseInt(h, 10)), g = h >= 0 ? h + d : d);
    var v = m.match(e.default());
    return v ? v.slice(d, g).join("") : "";
  }
  Me.substr = s;
  function l(m, d, h, f) {
    if (d === void 0 && (d = 16), h === void 0 && (h = "#"), f === void 0 && (f = "right"), typeof m != "string" || typeof d != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(f) === -1)
      throw new Error("Pad position should be either left or right");
    typeof h != "string" && (h = String(h));
    var g = n(m);
    if (g > d)
      return a(m, 0, d);
    if (g < d) {
      var v = h.repeat(d - g);
      return f === "left" ? v + m : m + v;
    }
    return m;
  }
  Me.limit = l;
  function c(m, d, h) {
    if (h === void 0 && (h = 0), typeof m != "string")
      throw new Error("Input must be a string");
    if (m === "")
      return d === "" ? 0 : -1;
    h = Number(h), h = isNaN(h) ? 0 : h, d = String(d);
    var f = t(m);
    if (h >= f.length)
      return d === "" ? f.length : -1;
    if (d === "")
      return h;
    var g = t(d), v = !1, E;
    for (E = h; E < f.length; E += 1) {
      for (var A = 0; A < g.length && g[A] === f[E + A]; )
        A += 1;
      if (A === g.length && g[A - 1] === f[E + A - 1]) {
        v = !0;
        break;
      }
    }
    return v ? E : -1;
  }
  return Me.indexOf = c, Me;
}
var st = Mn();
function zr(r) {
  return r ? Array.isArray(r) ? r : [r] : [];
}
function Bt(r, e) {
  if (!(e > he(r) || e < -he(r)))
    return _t(r, e, 1);
}
function Et(r, e) {
  return e < 0 || e > he(r) - 1 ? "" : _t(r, e, 1);
}
function vo(r, e) {
  if (!(e < 0 || e > he(r) - 1))
    return _t(r, e, 1).codePointAt(0);
}
function kn(r, e, t = he(r)) {
  const n = Ln(r, e);
  return !(n === -1 || n + he(e) !== t);
}
function Bn(r, e, t) {
  if (e < 0) return -1;
  if (t) {
    if (Et(r, e) === "}" && Et(r, e - 1) === "\\") return e;
    const s = Ot(r, "\\}", e);
    return s >= 0 ? s + 1 : s;
  }
  let n = e;
  const a = he(r);
  for (; n < a && (n = Ot(r, "}", n), !(n === -1 || Et(r, n - 1) !== "\\")); )
    n += 1;
  return n >= a ? -1 : n;
}
function Rn(r, e) {
  const t = [];
  let n = 0, a = 0;
  function s(c, m, d) {
    const h = ot(r, a, m), f = t.length > 0 && te(t[t.length - 1]) ? `${t.pop()}${h}` : h;
    te(c) ? t.push(`${f}${c}`) : (f && t.push(f), t.push(c)), a = m + d;
  }
  const l = he(r);
  for (; n < l; ) {
    switch (Et(r, n)) {
      case "{":
        if (Et(r, n - 1) !== "\\") {
          const c = Bn(r, n, !1);
          if (c >= 0) {
            const m = ot(r, n + 1, c), d = m in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[m]
            ) : m;
            s(d, n, c + 1 - n), n = c, a = c + 1;
          }
        } else
          s("{", n - 1, 2);
        break;
      case "}":
        Et(r, n - 1) !== "\\" || s("}", n - 1, 2);
        break;
    }
    n += 1;
  }
  if (a < l) {
    const c = ot(r, a);
    t.push(
      t.length > 0 && te(t[t.length - 1]) ? `${t.pop()}${c}` : c
    );
  }
  return t;
}
function bo(r, e) {
  return Rn(r, e).map((t) => `${t}`).join("");
}
function Pn(r, e, t = 0) {
  const n = ot(r, t);
  return Ot(n, e) !== -1;
}
function Ot(r, e, t = 0) {
  return st.indexOf(r, e, t);
}
function Ln(r, e, t) {
  let n = t === void 0 ? he(r) : t;
  n < 0 ? n = 0 : n >= he(r) && (n = he(r) - 1);
  for (let a = n; a >= 0; a--)
    if (_t(r, a, he(e)) === e)
      return a;
  return -1;
}
function he(r) {
  return st.length(r);
}
function Do(r, e) {
  const t = e.toUpperCase();
  return t === "NONE" ? r : r.normalize(t);
}
function Ao(r, e, t) {
  return r.localeCompare(e, "en", t);
}
function No(r, e, t = " ") {
  return e <= he(r) ? r : st.limit(r, e, t, "right");
}
function Co(r, e, t = " ") {
  return e <= he(r) ? r : st.limit(r, e, t, "left");
}
function mr(r, e) {
  return e > r ? r : e < -r ? 0 : e < 0 ? e + r : e;
}
function gr(r, e, t) {
  const n = he(r);
  if (e > n || t && (e > t && !(e >= 0 && e < n && t < 0 && t > -n) || t < -n))
    return "";
  const a = mr(n, e), s = t ? mr(n, t) : void 0;
  return ot(r, a, s);
}
function Er(r, e, t) {
  const n = [];
  if (t !== void 0 && t <= 0)
    return [r];
  if (e === "") return _n(r).slice(0, t);
  let a = e;
  (typeof e == "string" || e instanceof RegExp && !Pn(e.flags, "g")) && (a = new RegExp(e, "g"));
  const s = r.match(a);
  let l = 0;
  if (!s) return [r];
  for (let c = 0; c < (t ? t - 1 : s.length); c++) {
    const m = Ot(r, s[c], l), d = he(s[c]);
    if (n.push(ot(r, l, m)), l = m + d, t !== void 0 && n.length === t)
      break;
  }
  return n.push(ot(r, l)), n;
}
function Gr(r, e, t = 0) {
  return Ot(r, e, t) === t;
}
function _t(r, e = 0, t = he(r) - e) {
  return st.substr(r, e, t);
}
function ot(r, e, t = he(r)) {
  return st.substring(r, e, t);
}
function _n(r) {
  return st.toArray(r);
}
function To(r) {
  return Gr(r, "%") && kn(r, "%");
}
function wo(r) {
  if (typeof r != "string")
    throw new TypeError("Expected a string");
  return r.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Io(r) {
  return r ? zr(r).map(
    (n) => Array.isArray(n) ? n.map((a) => new RegExp(a)) : new RegExp(n)
  ) : [];
}
function xo(r) {
  return r ? zr(r).map((n) => new RegExp(n)) : [];
}
const Fn = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function gt(r) {
  return Fn.test(r);
}
function So(r) {
  let e = "";
  for (let t = 0; t < r.length; t++) {
    const n = r[t];
    if (n === n.toUpperCase() && n !== n.toLowerCase()) {
      if (t > 0) {
        const s = r[t - 1];
        if (!(s === s.toUpperCase() && s !== s.toLowerCase()))
          e += "-";
        else if (t + 1 < r.length) {
          const c = r[t + 1];
          c === c.toLowerCase() && c !== c.toUpperCase() && (e += "-");
        }
      }
      e += n.toLowerCase();
    } else
      e += n;
  }
  return e;
}
const Vt = ["chapter", "book", "para", "row", "sidebar", Pt], qn = "​", Hr = [
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
], Un = 1, $n = Hr.length - 1, jn = 1, Vn = 1, Oo = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, zn = (r) => {
  var e;
  return ((e = Hr[r]) == null ? void 0 : e.chapters) ?? -1;
}, Mo = (r, e) => ({
  book: pe.bookNumberToId(
    Math.max(
      Un,
      Math.min(pe.bookIdToNumber(r.book) + e, $n)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), ko = (r, e) => ({
  ...r,
  chapterNum: Math.min(
    Math.max(jn, r.chapterNum + e),
    zn(pe.bookIdToNumber(r.book))
  ),
  verseNum: 1
}), Bo = (r, e) => ({
  ...r,
  verseNum: Math.max(Vn, r.verseNum + e)
});
async function Ro(r, e, t) {
  const n = pe.bookNumberToId(r);
  if (!Gr(Intl.getCanonicalLocales(e)[0], "zh"))
    return t({
      localizeKey: `LocalizedId.${n}`,
      languagesToSearch: [e]
    });
  const a = await t({
    localizeKey: `Book.${n}`,
    languagesToSearch: [e]
  }), s = Er(a, "-");
  return Er(s[0], "ÿ08")[0].trim();
}
function Po(r) {
  return new $r(pe.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCC;
}
function yr(r) {
  return new $r(pe.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCCVVV;
}
function Lo(r, e) {
  return yr(r) - yr(e);
}
function Gn(r) {
  return `%scrollGroup_${r}%`;
}
function _o(r) {
  return r.map((e) => Gn(e));
}
function Fo(r, e, t, n) {
  let a;
  switch (e ?? "id") {
    case "English":
      a = pe.bookIdToEnglishName(r.book);
      break;
    case "id":
      a = r.book;
      break;
    default:
      a = e ?? "";
      break;
  }
  return `${a}${n ?? " "}${r.chapterNum}${t ?? ":"}${r.verseNum}`;
}
var Hn = /* @__PURE__ */ ((r) => (r.OT = "OT", r.NT = "NT", r.DC = "DC", r.Extra = "Extra", r))(Hn || {});
const qo = (r) => {
  if (pe.isBookOT(r)) return "OT";
  if (pe.isBookNT(r)) return "NT";
  if (pe.isBookDC(r)) return "DC";
  if (pe.isExtraMaterial(r)) return "Extra";
  throw new Error(`Unknown section for book: ${r}`);
}, Jn = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function vr(r) {
  return Jn.test(r);
}
const Xn = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function Kn(r) {
  return Xn.test(r);
}
function br(r) {
  let e = "", t = !1, n = "\0";
  for (let a = 0; a < r.length; a += 1) {
    const s = r[a];
    s.charCodeAt(0) < 32 ? (t || (e += " "), t = !0) : !t && s === qn && a + 1 < r.length && vr(r[a + 1]) || (vr(s) ? (t || (e += s), t = !0) : Kn(s) && n === s || (e += s, t = !1)), n = s;
  }
  return e;
}
function Dr(r) {
  return !r || r.length === 0 ? !0 : r.length === 1 && (r[0] === void 0 || r[0] === "");
}
function Ar(r, e) {
  if (!e || !Vt.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(r)} does not have a content array! This should not happen!`
    );
  return r === e.content[e.content.length - 1];
}
function Jr(r, e, t, n) {
  if (!r && !t) return !0;
  if (!r || !t) return !1;
  const a = te(r), s = te(t);
  if (a && s) {
    const l = br(r), c = br(t);
    if (l !== c) {
      if (!gt(Bt(l, -1) ?? "") && !gt(Bt(c, -1) ?? "") || !Ar(r, e) || !Ar(t, n)) return !1;
      let m = l;
      for (; gt(Bt(m, -1) ?? ""); ) m = gr(m, 0, -1);
      let d = c;
      for (; gt(Bt(d, -1) ?? ""); ) d = gr(d, 0, -1);
      if (m !== d) return !1;
    }
  } else if (!a && !s) {
    const l = r, c = t, m = Object.keys(l).filter(
      (f) => f !== "content"
    );
    if (m.length !== Object.keys(c).filter((f) => f !== "content").length || m.some((f) => !(f in c) || l[f] !== c[f])) return !1;
    const d = Dr(l.content), h = Dr(c.content);
    if (d !== h) return !1;
    if (!d && !h) {
      let f = l.content, g = c.content;
      const v = f[f.length - 1];
      Vt.includes(l.type) && te(v) && gt(v) && (f = f.slice(0, -1));
      const E = g[g.length - 1];
      if (Vt.includes(c.type) && te(E) && gt(E) && (g = g.slice(0, -1)), f.length !== g.length) return !1;
      for (let A = 0; A < f.length; A += 1)
        if (!Jr(f[A], l, g[A], c))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function Uo(r, e) {
  return Jr(r, void 0, e, void 0);
}
const $o = (r) => (...e) => r.map((n) => n(...e)).every((n) => n), jo = (r) => async (...e) => {
  const t = r.map(async (n) => n(...e));
  return (await Promise.all(t)).every((n) => n);
}, Yn = "book", Nr = "chapter", ke = "verse", Ge = "***";
function Xr() {
  return Array.from({ length: 26 }, (r, e) => String.fromCharCode(97 + e));
}
function Wn(r, e) {
  const t = e && e.length > 0 ? e : Xr();
  return t[r % t.length];
}
function Vo(r, e) {
  const t = e && e.length > 0 ? e : Xr(), n = (() => {
    const a = /* @__PURE__ */ new Map();
    let s = 0;
    return r.forEach((l, c) => {
      l.caller === "+" && (a.set(c, Wn(s, t)), s += 1);
    }), a;
  })();
  return (a, s) => {
    if (a === "+") {
      const l = n.get(s);
      return l || (console.warn(`Caller index ${s} out of range for '+' callers`), "?");
    }
    if (a !== "-")
      return a;
  };
}
function Qn(r) {
  const e = [];
  if (!r || r.length === 0) return e;
  function t(n) {
    typeof n != "string" && (n.type === "note" ? e.push(n) : Array.isArray(n.content) && n.content.length > 0 && n.content.forEach(t));
  }
  return r.forEach(t), e;
}
var Zn = Object.getOwnPropertyNames, ei = Object.getOwnPropertySymbols, ti = Object.prototype.hasOwnProperty;
function Cr(r, e) {
  return function(n, a, s) {
    return r(n, a, s) && e(n, a, s);
  };
}
function Rt(r) {
  return function(t, n, a) {
    if (!t || !n || typeof t != "object" || typeof n != "object")
      return r(t, n, a);
    var s = a.cache, l = s.get(t), c = s.get(n);
    if (l && c)
      return l === n && c === t;
    s.set(t, n), s.set(n, t);
    var m = r(t, n, a);
    return s.delete(t), s.delete(n), m;
  };
}
function Tr(r) {
  return Zn(r).concat(ei(r));
}
var ri = Object.hasOwn || function(r, e) {
  return ti.call(r, e);
};
function ut(r, e) {
  return r === e || !r && !e && r !== r && e !== e;
}
var ni = "__v", ii = "__o", oi = "_owner", wr = Object.getOwnPropertyDescriptor, Ir = Object.keys;
function ai(r, e, t) {
  var n = r.length;
  if (e.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!t.equals(r[n], e[n], n, n, r, e, t))
      return !1;
  return !0;
}
function si(r, e) {
  return ut(r.getTime(), e.getTime());
}
function ui(r, e) {
  return r.name === e.name && r.message === e.message && r.cause === e.cause && r.stack === e.stack;
}
function ci(r, e) {
  return r === e;
}
function xr(r, e, t) {
  var n = r.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var a = new Array(n), s = r.entries(), l, c, m = 0; (l = s.next()) && !l.done; ) {
    for (var d = e.entries(), h = !1, f = 0; (c = d.next()) && !c.done; ) {
      if (a[f]) {
        f++;
        continue;
      }
      var g = l.value, v = c.value;
      if (t.equals(g[0], v[0], m, f, r, e, t) && t.equals(g[1], v[1], g[0], v[0], r, e, t)) {
        h = a[f] = !0;
        break;
      }
      f++;
    }
    if (!h)
      return !1;
    m++;
  }
  return !0;
}
var li = ut;
function fi(r, e, t) {
  var n = Ir(r), a = n.length;
  if (Ir(e).length !== a)
    return !1;
  for (; a-- > 0; )
    if (!Kr(r, e, t, n[a]))
      return !1;
  return !0;
}
function wt(r, e, t) {
  var n = Tr(r), a = n.length;
  if (Tr(e).length !== a)
    return !1;
  for (var s, l, c; a-- > 0; )
    if (s = n[a], !Kr(r, e, t, s) || (l = wr(r, s), c = wr(e, s), (l || c) && (!l || !c || l.configurable !== c.configurable || l.enumerable !== c.enumerable || l.writable !== c.writable)))
      return !1;
  return !0;
}
function pi(r, e) {
  return ut(r.valueOf(), e.valueOf());
}
function hi(r, e) {
  return r.source === e.source && r.flags === e.flags;
}
function Sr(r, e, t) {
  var n = r.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var a = new Array(n), s = r.values(), l, c; (l = s.next()) && !l.done; ) {
    for (var m = e.values(), d = !1, h = 0; (c = m.next()) && !c.done; ) {
      if (!a[h] && t.equals(l.value, c.value, l.value, c.value, r, e, t)) {
        d = a[h] = !0;
        break;
      }
      h++;
    }
    if (!d)
      return !1;
  }
  return !0;
}
function di(r, e) {
  var t = r.length;
  if (e.length !== t)
    return !1;
  for (; t-- > 0; )
    if (r[t] !== e[t])
      return !1;
  return !0;
}
function mi(r, e) {
  return r.hostname === e.hostname && r.pathname === e.pathname && r.protocol === e.protocol && r.port === e.port && r.hash === e.hash && r.username === e.username && r.password === e.password;
}
function Kr(r, e, t, n) {
  return (n === oi || n === ii || n === ni) && (r.$$typeof || e.$$typeof) ? !0 : ri(e, n) && t.equals(r[n], e[n], n, n, r, e, t);
}
var gi = "[object Arguments]", Ei = "[object Boolean]", yi = "[object Date]", vi = "[object Error]", bi = "[object Map]", Di = "[object Number]", Ai = "[object Object]", Ni = "[object RegExp]", Ci = "[object Set]", Ti = "[object String]", wi = "[object URL]", Ii = Array.isArray, Or = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, Mr = Object.assign, xi = Object.prototype.toString.call.bind(Object.prototype.toString);
function Si(r) {
  var e = r.areArraysEqual, t = r.areDatesEqual, n = r.areErrorsEqual, a = r.areFunctionsEqual, s = r.areMapsEqual, l = r.areNumbersEqual, c = r.areObjectsEqual, m = r.arePrimitiveWrappersEqual, d = r.areRegExpsEqual, h = r.areSetsEqual, f = r.areTypedArraysEqual, g = r.areUrlsEqual;
  return function(E, A, P) {
    if (E === A)
      return !0;
    if (E == null || A == null)
      return !1;
    var S = typeof E;
    if (S !== typeof A)
      return !1;
    if (S !== "object")
      return S === "number" ? l(E, A, P) : S === "function" ? a(E, A, P) : !1;
    var O = E.constructor;
    if (O !== A.constructor)
      return !1;
    if (O === Object)
      return c(E, A, P);
    if (Ii(E))
      return e(E, A, P);
    if (Or != null && Or(E))
      return f(E, A, P);
    if (O === Date)
      return t(E, A, P);
    if (O === RegExp)
      return d(E, A, P);
    if (O === Map)
      return s(E, A, P);
    if (O === Set)
      return h(E, A, P);
    var $ = xi(E);
    return $ === yi ? t(E, A, P) : $ === Ni ? d(E, A, P) : $ === bi ? s(E, A, P) : $ === Ci ? h(E, A, P) : $ === Ai ? typeof E.then != "function" && typeof A.then != "function" && c(E, A, P) : $ === wi ? g(E, A, P) : $ === vi ? n(E, A, P) : $ === gi ? c(E, A, P) : $ === Ei || $ === Di || $ === Ti ? m(E, A, P) : !1;
  };
}
function Oi(r) {
  var e = r.circular, t = r.createCustomConfig, n = r.strict, a = {
    areArraysEqual: n ? wt : ai,
    areDatesEqual: si,
    areErrorsEqual: ui,
    areFunctionsEqual: ci,
    areMapsEqual: n ? Cr(xr, wt) : xr,
    areNumbersEqual: li,
    areObjectsEqual: n ? wt : fi,
    arePrimitiveWrappersEqual: pi,
    areRegExpsEqual: hi,
    areSetsEqual: n ? Cr(Sr, wt) : Sr,
    areTypedArraysEqual: n ? wt : di,
    areUrlsEqual: mi
  };
  if (t && (a = Mr({}, a, t(a))), e) {
    var s = Rt(a.areArraysEqual), l = Rt(a.areMapsEqual), c = Rt(a.areObjectsEqual), m = Rt(a.areSetsEqual);
    a = Mr({}, a, {
      areArraysEqual: s,
      areMapsEqual: l,
      areObjectsEqual: c,
      areSetsEqual: m
    });
  }
  return a;
}
function Mi(r) {
  return function(e, t, n, a, s, l, c) {
    return r(e, t, c);
  };
}
function ki(r) {
  var e = r.circular, t = r.comparator, n = r.createState, a = r.equals, s = r.strict;
  if (n)
    return function(m, d) {
      var h = n(), f = h.cache, g = f === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : f, v = h.meta;
      return t(m, d, {
        cache: g,
        equals: a,
        meta: v,
        strict: s
      });
    };
  if (e)
    return function(m, d) {
      return t(m, d, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: a,
        meta: void 0,
        strict: s
      });
    };
  var l = {
    cache: void 0,
    equals: a,
    meta: void 0,
    strict: s
  };
  return function(m, d) {
    return t(m, d, l);
  };
}
var Bi = He();
He({ strict: !0 });
He({ circular: !0 });
He({
  circular: !0,
  strict: !0
});
He({
  createInternalComparator: function() {
    return ut;
  }
});
He({
  strict: !0,
  createInternalComparator: function() {
    return ut;
  }
});
He({
  circular: !0,
  createInternalComparator: function() {
    return ut;
  }
});
He({
  circular: !0,
  createInternalComparator: function() {
    return ut;
  },
  strict: !0
});
function He(r) {
  r === void 0 && (r = {});
  var e = r.circular, t = e === void 0 ? !1 : e, n = r.createInternalComparator, a = r.createState, s = r.strict, l = s === void 0 ? !1 : s, c = Oi(r), m = Si(c), d = n ? n(m) : Mi(m);
  return ki({ circular: t, comparator: m, createState: a, equals: d, strict: l });
}
function zt(r, e) {
  return Bi(r, e);
}
function Ri(r, e) {
  if (typeof r != typeof e) return !1;
  if (!r && !e) return !0;
  if (Array.isArray(r)) {
    const s = e, l = r;
    return s.length === 0 ? !0 : s.every((c) => l.includes(c));
  }
  if (typeof r != "object")
    return zt(r, e);
  const t = e, n = r;
  let a = !0;
  return Object.keys(t).forEach((s) => {
    a && (Object.hasOwn(n, s) && Ri(n[s], t[s]) || (a = !1));
  }), a;
}
function kr(r, e, t) {
  return JSON.stringify(r, (a, s) => {
    let l = s;
    return e && (l = e(a, l)), l === void 0 && (l = null), l;
  }, t);
}
function Pi(r, e) {
  function t(a) {
    return Object.keys(a).forEach((s) => {
      a[s] === null ? a[s] = void 0 : typeof a[s] == "object" && (a[s] = t(a[s]));
    }), a;
  }
  const n = JSON.parse(r, e);
  if (n !== null)
    return typeof n == "object" ? t(n) : n;
}
function zo(r) {
  try {
    const e = kr(r);
    return e === kr(Pi(e));
  } catch {
    return !1;
  }
}
const Go = (r) => r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function Ho() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0].replace(/@posix$/i, "") : new nn().resolvedOptions().locale;
}
function Jo(r, e = 2) {
  if (r === 0) return "0 Bytes";
  const t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], n = Math.floor(Math.log(r) / Math.log(1024)), a = t[n];
  return `${new pn("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(r / 1024 ** n)} ${a}`;
}
const Li = 1e3, Yr = 60, Wr = Yr * 60, _i = Wr * 24;
function Xo(r, e, t = /* @__PURE__ */ new Date()) {
  const n = Math.floor((e.getTime() - t.getTime()) / Li), a = Math.round(n / _i);
  if (Math.abs(a) >= 1) return r.format(a, "day");
  const s = Math.round(n / Wr);
  if (Math.abs(s) >= 1) return r.format(s, "hour");
  const l = Math.round(n / Yr);
  return Math.abs(l) >= 1 ? r.format(l, "minute") : r.format(n, "second");
}
const Ko = /* @__PURE__ */ new Set([
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
]), Xt = {
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
function Ft(r) {
  r && Object.values(r).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && Ft(e.properties);
    }
  });
}
Ft(Xt);
const Fi = {
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
  $defs: Xt
};
Object.freeze(Fi);
const qi = {
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
  $defs: Xt
};
Object.freeze(qi);
const Qr = {
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
Ft(Qr);
const Ui = {
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
  $defs: Qr
};
Object.freeze(Ui);
const $i = {
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
Object.freeze($i);
const Zr = {
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
Ft(Zr);
const ji = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: Zr
};
Object.freeze(ji);
const Vi = "theme-styles";
function zi(r, e) {
  return `${r ? `${r}-` : ""}${e}`;
}
function Yo(r, e) {
  return Object.fromEntries(
    Object.entries(r).map(([n, a]) => [
      n,
      a ? Object.fromEntries(
        Object.entries(a).map(([s, l]) => {
          var c;
          return [
            s,
            l ? {
              ...l,
              // Add the derived properties
              themeFamilyId: n,
              type: s,
              id: zi(n, s),
              cssVariables: {
                // Fill in the default css variables
                ...(c = e == null ? void 0 : e[s]) == null ? void 0 : c.cssVariables,
                ...l.cssVariables
              }
            } : void 0
          ];
        }).filter(([, s]) => !!s)
      ) : void 0
    ]).filter(([, n]) => !!n)
  );
}
function Gi(r) {
  return `
.${r.id} {
${Object.entries(r.cssVariables).map(([e, t]) => `  --${e}: ${t};`).join(`
`)}
}
`;
}
function Wo(r, e, t) {
  const n = e == null ? void 0 : e.dataset.themeId;
  n && this.document.body.classList.remove(n), this.document.body.classList.add(r.id), e && this.document.head.removeChild(e);
  const a = this.document.createElement("style");
  return a.id = `${Vi}${t ? `-${t}` : ""}`, a.dataset.themeId = r.id, a.textContent = Gi(r), this.document.head.appendChild(a), a;
}
const Hi = {
  version: "3.1",
  commit: "50f2a6ac3fc1d867d906df28bc00fcff729a7b76",
  usfmToolsVersion: "ed48bc011e1b9f1a402d23e49edf2db6c6d69728+",
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
      hasStructuralSpaceAfterCloseAttributeMarker: !0
    },
    cat: {
      type: "char",
      attributeMarkerAttributeName: "category",
      isAttributeMarkerFor: ["ef", "efe", "esb", "ex", "f", "fe", "x"]
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
      description: "Chapter published style",
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
      description: "Running header text"
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
      description: "File encoding information (DEPRECATED)"
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
      description: "Introduction major title, level 1 - (if single level)"
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
      type: "char"
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
      defaultAttribute: "href",
      description: "For associating linking attributes to a span of text"
    },
    k: {
      type: "char",
      defaultAttribute: "key",
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
    mi1: {
      type: "para",
      description: "Paragraph text, level 1 indented, with no first line indent; often used for discourse"
    },
    mi2: {
      type: "para",
      description: "Paragraph text, level 2 indented, with no first line indent; often used for discourse"
    },
    mi3: {
      type: "para",
      description: "Paragraph text, level 3 indented, with no first line indent; often used for discourse"
    },
    mi4: {
      type: "para",
      description: "Paragraph text, level 4 indented, with no first line indent; often used for discourse"
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
      description: "The main title of the book (if single level)"
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
      description: "Paragraph text, with first line indent"
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
      description: 'A section heading, level 3 (e.g. Genesis "The First Day") (\\s3 can take a \\v!)'
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
      type: "row"
    },
    ts: {
      type: "ms"
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
      textContentAttribute: "version"
    },
    USJ: {
      type: "USJ",
      textContentAttribute: "version"
    },
    usx: {
      type: "usx",
      textContentAttribute: "version"
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
      hasStructuralSpaceAfterCloseAttributeMarker: !0
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
      defaultAttribute: "href",
      description: `Inline scripture reference formatting.
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
    "t[hc][rc]?\\d+(-\\d+)?": {
      type: "cell"
    }
  },
  markerTypes: {
    book: {},
    cell: {
      skipOutputAttributeToUsfm: ["align"]
    },
    chapter: {
      hasNewlineBefore: !0,
      skipOutputAttributeToUsfm: ["sid"],
      skipOutputMarkerToUsfmIfAttributeIsPresent: ["eid"]
    },
    char: {
      hasClosingMarker: !0
    },
    figure: {
      hasClosingMarker: !0
    },
    ms: {
      hasClosingMarker: !0,
      isClosingMarkerEmpty: !0
    },
    note: {
      hasClosingMarker: !0
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
      hasClosingMarker: !0,
      hasStyleAttribute: !1,
      skipOutputMarkerToUsfmIfAttributeIsPresent: ["gen"]
    },
    row: {
      hasNewlineBefore: !0
    },
    sidebar: {
      hasNewlineBefore: !0
    },
    table: {
      hasStyleAttribute: !1,
      skipOutputAttributeToUsfm: ["vid"]
    },
    USJ: {
      hasStyleAttribute: !1
    },
    usx: {
      hasStyleAttribute: !1,
      skipOutputAttributeToUsfm: ["noNamespaceSchemaLocation"]
    },
    verse: {
      hasNewlineBefore: !0,
      skipOutputAttributeToUsfm: ["sid"],
      skipOutputMarkerToUsfmIfAttributeIsPresent: ["eid"]
    }
  }
}, It = ["figure", "note", "sidebar", "table"];
Object.freeze(It);
const Ji = /\u00A0/g, Xi = /\w+(\d+)/, Ki = /(\d+)-?(\d+)?/;
class q {
  constructor(e, t) {
    j(this, "usj");
    j(this, "markersMap");
    j(this, "shouldAllowInvisibleCharacters");
    // Cached properties
    j(this, "parentMapInternal");
    j(this, "fragmentsByIndexInUsfmInternal");
    j(this, "indicesInUsfmByVerseRefInternal");
    j(this, "usfmInternal");
    this.usj = e;
    const { markersMap: n, shouldAllowInvisibleCharacters: a } = t ?? {};
    if (n) this.markersMap = n;
    else {
      if (this.usj.version !== "3.1" && this.usj.version !== "3.0")
        throw new Error("USJ version is not 3.1 or 3.0! Not equipped to handle yet");
      this.markersMap = Hi;
    }
    this.usj.version !== this.markersMap.version && console.warn(
      `Warning: USJ provided has version ${this.usj.version}, but markers map has version ${this.markersMap.version}. This may cause unexpected issues when transforming between formats.`
    ), this.shouldAllowInvisibleCharacters = a ?? !1;
  }
  // If new variables are created to speed up queries, they should be reset here
  usjChanged() {
    this.parentMapInternal = void 0, this.fragmentsByIndexInUsfmInternal = void 0, this.indicesInUsfmByVerseRefInternal = void 0, this.usfmInternal = void 0;
  }
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(e) {
    const t = Qt({ path: e, json: this.usj, wrap: !0 });
    if (t === void 0 || t.length === 0) return;
    if (!Array.isArray(t[0])) return t[0];
    const n = Qt({ path: e, json: this.usj, wrap: !1 });
    return n.length === 1 && Array.isArray(n[0]) ? n[0] : n;
  }
  findParent(e) {
    return this.findSingleValue(`${e}^`);
  }
  // #endregion Directly using the JSONPath package to perform JSONPath query -> USJ node
  // #region marker helper methods
  /**
   * Determine if the passed in marker is the USJ marker (should be the top-level marker)
   *
   * @param marker Marker to test if it is USJ marker
   * @returns `true` if it is a USJ marker; false otherwise
   */
  static isUsjMarker(e) {
    return typeof e == "object" && e.type === Pt;
  }
  /**
   * Determine if a fragment is a marker, not a text content string or some kind of position
   * fragment that isn't actually a marker e.g. closing marker fragment
   */
  static isFragmentAMarker(e) {
    return !te(e) && !("forMarker" in e);
  }
  // #endregion marker helper methods
  // #region Parent Maps
  static createParentMapInternal(e, t, n) {
    var a;
    n.set(e, t), e.content && n.set(e.content, e), (a = e.content) == null || a.forEach((s) => {
      typeof s == "object" && q.createParentMapInternal(s, e, n);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((t) => {
      typeof t == "object" && q.createParentMapInternal(t, this.usj, e);
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
    let a = e, s = n.get(a);
    for (; s !== void 0; ) {
      if (!s.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !s.content.find((l, c) => {
          if (l !== a) return !1;
          if (!s) throw new Error('undefined "tempParent" should not be possible');
          return t.unshift({ parent: s, index: c }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(a)}`);
      if (s.type === Pt) break;
      a = s, s = n.get(s);
    }
    return t;
  }
  static convertWorkingStackToJsonPath(e) {
    let t = "$";
    return e.forEach((n) => {
      t = `${t}.content[${n.index}]`;
    }), t;
  }
  static convertWorkingStackAndPropertyToJsonPath(e, t) {
    return `${q.convertWorkingStackToJsonPath(e)}['${t}']`;
  }
  convertJsonPathToWorkingStack(e) {
    const t = [], n = e.match(/content\[(\d+)\]/g);
    if (!n) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let a = this.usj;
    return n.forEach((s, l) => {
      const c = /(\d+)/.exec(s);
      if (!c) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const m = parseInt(c[0], 10);
      if (t.push({ parent: a, index: m }), l + 1 < n.length) {
        if (typeof a == "string" || !a.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(a)}`);
        const d = a.content[m];
        if (typeof d == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(d)}`);
        a = d;
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
    return Qn((e = this.usj) == null ? void 0 : e.content);
  }
  /**
   * Look through the USJ document for a token matching some condition
   *
   * @param token Token from which to start looking
   * @param workingStack Working stack pointing to this token (should not include this token)
   * @param skipTypes List of marker types to skip
   * @param searchFunction Function that tokens will be passed into to determine if they are the
   *   correct token. Stops searching and returns the token if this function returns `true`
   * @returns Token matching condition tested by the search function
   */
  static findNextMatchingTokenUsingWorkingStack(e, t, n, a) {
    var l;
    let s = e;
    for (; s !== void 0; ) {
      const c = typeof s == "object" && n.includes(s.type);
      if (!c && a(s, t)) return s;
      if (!c && typeof s == "object" && (((l = s.content) == null ? void 0 : l.length) ?? 0) > 0)
        t.push({ parent: s, index: 0 }), [s] = s.content;
      else {
        const m = typeof s == "object" ? { isClosingMarker: !0, forMarker: s } : void 0;
        if (!c && m && a(m, t))
          return m;
        for (s = void 0; t.length > 0; ) {
          const d = t.pop();
          if (d)
            if (d.index + 1 < d.parent.content.length) {
              d.index += 1, t.push(d), s = d.parent.content[d.index];
              break;
            } else {
              const h = {
                isClosingMarker: !0,
                forMarker: d.parent
              };
              if (!n.includes(h.forMarker.type) && a(h, t))
                return h;
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
   * @param skipTypes List of marker types to skip
   * @param searchFunction Function that nodes will be passed into to determine if they are the
   *   correct node. Stops searching and returns the node if this function returns `true`
   * @returns Node matching condition tested by the search function
   */
  static findNextMatchingNodeUsingWorkingStack(e, t, n, a) {
    return this.findNextMatchingTokenUsingWorkingStack(
      e,
      t,
      n,
      (l, c) => typeof l == "object" && ("isClosingMarker" in l || q.isUsjMarker(l)) ? !1 : a(l, c)
    );
  }
  // #endregion Walk the node tree
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return q.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion Node -> JSONPath
  // #region USJ node -> SerializedVerseRef + offset in USFM
  nodeToUsfmVerseLocation(e, t, n) {
    var l;
    let a;
    if (te(e)) {
      if (t === void 0)
        throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
      const c = Array.isArray(t) ? this.parentMap.get(t) : t;
      if (c === void 0)
        throw new Error(`Cannot find parent for ${JSON.stringify(t)}`);
      a = this.createWorkingStack(c);
      const m = (l = c.content) == null ? void 0 : l.indexOf(e);
      if (m === void 0 || m < 0)
        throw new Error("Could not find index of node in parent for creating working stack");
      a.push({ parent: c, index: m });
    } else
      a = this.createWorkingStack(e);
    const s = q.convertNodeToUsjDocumentLocation(e, a);
    return this.usjDocumentLocationToUsfmVerseLocation(s, n);
  }
  // #endregion USJ node -> SerializedVerseRef + offset in USFM
  // #region JSONPath or USJ location -> SerializedVerseRef + offset in USFM
  jsonPathToUsfmVerseLocation(e, t) {
    const n = this.findSingleValue(e);
    if (!n) throw new Error(`No result found for JSONPath query: ${e}`);
    const a = te(n) ? this.findParent(e) : void 0;
    if (!a && te(n))
      throw new Error(`Could not determine parent for ${e}`);
    return this.nodeToUsfmVerseLocation(n, a, t);
  }
  usjDocumentLocationToUsfmVerseLocation(e, t) {
    const n = this.findFragmentInfoAtUsjDocumentLocation(e);
    if (n === void 0)
      throw new Error(
        `Could not find fragment info at USJ document location ${JSON.stringify(e)}`
      );
    const a = this.getVerseRefForIndexInUsfm(n.indexInUsfm), s = this.getIndexInUsfmForVerseRef(a), l = this.fragmentsByIndexInUsfm.get(s);
    if (l && q.isFragmentAMarker(l.fragment) && l.fragment.type === ke && l.fragment.number && l.fragment.number !== `${a.verseNum}` && (a.verse = l.fragment.number), a.book === Ge) {
      if (!t)
        throw new Error(
          `Could not find book ID and no book ID provided when finding USFM verse location for USJ document location ${JSON.stringify(
            e
          )}`
        );
      a.book = t;
    }
    return {
      verseRef: a,
      // Final USFM verse offset is the fragment's location relative to the verse plus whatever
      // offset is in the USJ location
      offset: n.indexInUsfm - s + q.getOffsetInUsjDocumentLocation(e)
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
    const t = Object.keys(this.indicesInUsfmByVerseRef), n = t.length === 0 || t.length === 1 && t[0] === Ge, a = n ? Ge : e;
    if (!this.indicesInUsfmByVerseRef[a])
      throw new Error(
        `Book ID ${e} not found in USJ! ${n ? `There seems to be no USJ content because there is no content in ${Ge} either` : `Book IDs in USJ: ${JSON.stringify(t)}`}`
      );
    return a;
  }
  /**
   * Gets the index in USFM of the start of the verse (the backslash on the verse marker or the
   * beginning of the chapter if verse 0 is provided)
   */
  getIndexInUsfmForVerseRef(e) {
    const t = this.getEffectiveBookId(e.book), a = this.indicesInUsfmByVerseRef[t][e.chapterNum];
    if (!a) throw new Error(`Could not find ${t} chapter ${e.chapterNum}`);
    const s = a[e.verseNum];
    if (s === void 0)
      throw new Error(`Verse ${e.verseNum} not found in ${t} ${e.chapterNum}`);
    return s;
  }
  /**
   * Gets the verse ref that the provided index in USFM is in. Finds the closest verse ref before
   * the index in USFM.
   *
   * WARNING: This does not include the verse range if there is one for this verse. If you need it,
   * consider adding it in here (see {@link UsjReaderWriter.usjDocumentLocationToUsfmVerseLocation}).
   * It's not already in here because then we would have to run
   * {@link UsjReaderWriter.getIndexInUsfmForVerseRef} twice unless we did a refactor.
   */
  getVerseRefForIndexInUsfm(e) {
    const t = Object.entries(this.indicesInUsfmByVerseRef);
    let n = 0, a;
    for (; n < t.length; ) {
      const [s, l] = t[n];
      if (l) {
        const c = Object.entries(l);
        let m = 0;
        for (; m < c.length; ) {
          const [d, h] = c[m];
          if (h) {
            const f = Object.entries(h);
            let g = 0;
            for (; g < f.length; ) {
              const [v, E] = f[g];
              if (E !== void 0) {
                if (e < E) {
                  if (!a)
                    throw new Error(
                      `Could not find verse ref for index in USFM ${e} less than the first known index ${E}`
                    );
                  return a;
                }
                if (a = {
                  book: s,
                  chapterNum: parseInt(d, 10),
                  verseNum: parseInt(v, 10)
                }, e === E) return a;
              }
              g += 1;
            }
          }
          m += 1;
        }
      }
      n += 1;
    }
    if (!a)
      throw new Error(`Did not find any verse refs while looking for index in USFM ${e}`);
    return a;
  }
  // #endregion Handling VerseRefs
  // #region USFM location -> USJ location
  usfmLocationToUsjNodeAndDocumentLocation(e) {
    const t = "verseRef" in e ? e.verseRef : e, n = "verseRef" in e ? e.offset ?? 0 : 0;
    if (n < 0) throw new Error("offset must be >= 0");
    const s = this.getIndexInUsfmForVerseRef(t) + n, { value: l } = this.fragmentsByIndexInUsfm.findClosestLessThanOrEqual(
      s
    ) ?? {
      value: void 0
    };
    if (!l)
      throw new Error(
        `Somehow, did not find anything at index in verse ${n} or below in ${t.book} ${t.chapterNum}:${t.verseNum}. Not sure how this would happen.`
      );
    const c = s - l.indexInUsfm;
    return {
      ...l.nodeAndDocumentLocation,
      documentLocation: q.moveUsjDocumentLocationToNewOffset(
        l.nodeAndDocumentLocation.documentLocation,
        c
      )
    };
  }
  usfmLocationToUsjDocumentLocation(e) {
    return this.usfmLocationToUsjNodeAndDocumentLocation(e).documentLocation;
  }
  static isUsjDocumentLocationForTextContent(e) {
    let t = e;
    if ("node" in e) {
      if (!te(e.node)) return !1;
      t = e.documentLocation;
    }
    return "offset" in t;
  }
  // #endregion UsjDocumentLocation utilities
  // #region Search for text from a certain point
  verseRefToNextTextLocation(e) {
    const t = this.usfmLocationToUsjNodeAndDocumentLocation(e), n = this.findNextLocationOfMatchingText(
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
    let a = "", s = 0, l = 0, c = -1;
    const m = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    ), d = {
      ...m[m.length - 1]
    };
    if (q.findNextMatchingNodeUsingWorkingStack(
      e.node,
      m,
      It,
      (v, E) => {
        if (typeof v != "string") return !1;
        let A = v;
        const P = E[E.length - 1];
        if (q.areStackItemsShallowEqual(P, d)) {
          if (!("offset" in e.documentLocation))
            throw new Error(
              `Somehow 'offset' was not in text content string document location. This should not happen. ${JSON.stringify(e.documentLocation)}`
            );
          A = v.substring(e.documentLocation.offset), l += e.documentLocation.offset;
        }
        s += A.length, a = `${a}${A}`;
        const S = a.indexOf(t);
        return S < 0 ? (l += a.length, a.length > t.length && (a = a.substring(a.length - t.length)), l -= a.length, s > n) : (c = l + S, !0);
      }
    ), c < 0) return;
    s = 0;
    let h = 0, f = [];
    const g = q.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      It,
      (v, E) => typeof v != "string" || (s += v.length, s < c + 1) ? !1 : (h = c - s + v.length, f = E, !0)
    );
    if (!g) throw new Error("Internal error: inconsistent search results");
    if (!te(g))
      throw new Error(
        `Somehow found non-string node while searching for strings: ${JSON.stringify(g)}`
      );
    return {
      node: g,
      documentLocation: {
        jsonPath: q.convertWorkingStackToJsonPath(f),
        offset: h
      }
    };
  }
  search(e) {
    const t = [];
    if (this.usj.content.length === 0) return t;
    const n = {
      node: this.usj.content[0],
      documentLocation: {
        jsonPath: "$.content[0]"
      }
    };
    te(this.usj.content[0]) && (n.documentLocation.offset = 0);
    const a = [], s = new rr();
    let l = 0, c = n.node;
    for (; c !== void 0; )
      c = q.findNextMatchingNodeUsingWorkingStack(
        n.node,
        this.convertJsonPathToWorkingStack(n.documentLocation.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (h, f) => (typeof h != "string" || (a.push(h), s.set(l, {
          node: h,
          documentLocation: {
            offset: 0,
            jsonPath: q.convertWorkingStackToJsonPath(f)
          }
        }), l += h.length), !1)
      );
    const m = a.join("");
    let d = e.exec(m);
    for (; d; ) {
      if (d[0].length > 0) {
        if (d.index < 0 || d.index >= m.length)
          throw new Error(`Match index out of bounds: ${d.index}`);
        const h = s.findClosestLessThanOrEqual(d.index);
        if (!h)
          throw new Error(`Internal error: no closest node found for index ${d.index}`);
        const f = {
          node: h.value.node,
          documentLocation: {
            jsonPath: h.value.documentLocation.jsonPath,
            offset: d.index - h.key
          }
        };
        t.push({ text: d[0], location: f });
      }
      if (!e.global) break;
      d = e.exec(m);
    }
    return t;
  }
  // #endregion Search for text from a certain point
  // #region Extract text from a node + JSONPath + offset
  extractText(e, t) {
    let n = "", a = "offset" in e.documentLocation ? e.documentLocation.offset : 0, s = 0;
    return q.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      It,
      (l) => {
        if (typeof l != "string") return !1;
        if (a >= l.length)
          return a -= l.length, !1;
        let c = l;
        if (a > 0 && (c = c.substring(a), a = 0), s + c.length < t)
          return s += c.length, n = `${n}${c}`, !1;
        const m = t - s;
        return n = `${n}${c.substring(0, m - 1)}`, !0;
      }
    ), n;
  }
  extractTextBetweenPoints(e, t, n = 100) {
    let a = "";
    return q.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      It,
      (s, l) => s === t.node && (typeof s == "object" || t.documentLocation.jsonPath === q.convertWorkingStackToJsonPath(l)) ? !0 : typeof s != "string" ? !1 : (a = `${a}${s}`, a.length > n && (a = a.substring(0, n)), a.length >= n)
    ), a;
  }
  // #endregion Extract text from a node + JSONPath + offset
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, t) {
    let n = 0;
    for (let a = e.length - 1; a >= 0; a--) {
      const s = e[a];
      t(s) ? (e.splice(a, 1), n += 1) : typeof s != "string" && s.content && (n += this.removeContentNodesFromArray(s.content, t));
    }
    return n;
  }
  removeContentNodes(e) {
    const t = q.removeContentNodesFromArray(this.usj.content, e);
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
   * @param marker A USJ marker (can be USJ type) or a string which is the marker name
   * @param markersMap The markers map from which to gather info
   * @returns Various pieces of info about the marker
   */
  getInfoForMarker(e) {
    let t;
    te(e) ? t = e : q.isUsjMarker(e) ? t = e.type : t = e.marker ?? e.type;
    let n = !1, a = this.getMarkerInfo(t);
    if (!a) {
      if (te(e))
        throw new Error(`Unknown marker ${t} and no marker type provided`);
      a = { type: e.type }, n = !0, console.warn(
        `Unknown marker ${t}. Creating MarkerInfo to use: ${JSON.stringify(a)}`
      );
    }
    let s = a.type;
    const l = !te(e) && e.type.startsWith("table:");
    !te(e) && (l && e.type.substring(6) !== a.type || !l && e.type !== a.type) && (console.warn(
      `Warning: Mismatching marker type in the USJ content ${e.type} vs marker type in the marker info ${a.type} for marker ${t}. Using the type from the USJ content.`
    ), s = l ? e.type.substring(6) : e.type, n = !0);
    let c = this.markersMap.markerTypes[s];
    if (n && s === "para" && c && (c = { ...c, hasNewlineBefore: !1 }), !c && s === "unmatched" && (c = {}), !c)
      throw new Error(`Unknown marker type ${s} on marker ${t}! Cannot proceed.`);
    const m = [];
    a.attributeMarkers && a.attributeMarkers.forEach((f) => {
      const g = this.getMarkerInfo(f);
      g && "attributeMarkerAttributeName" in g && m.push([f, g]);
    });
    let d = t === Pt ? "usfm" : t;
    const h = e;
    if (s === "cell" && h.colspan) {
      const f = parseInt(h.colspan, 10), g = Xi.exec(t);
      if (g != null && g[1]) {
        const v = parseInt(g[1], 10);
        !Number.isNaN(v) && !Number.isNaN(f) && (d = `${t}-${v + f - 1}`, c = {
          ...c,
          skipOutputAttributeToUsfm: [
            ...c.skipOutputAttributeToUsfm ?? [],
            "colspan"
          ]
        });
      }
    }
    return {
      markerName: t,
      markerNameUsfm: d,
      markerInfo: a,
      markerType: s,
      markerTypeInfo: c,
      attributeMarkerInfoEntries: m
    };
  }
  /** Converts the text content of a marker to its equivalent in USFM */
  textContentToUsfm(e) {
    return {
      usfm: this.shouldAllowInvisibleCharacters ? e : e.replace(Ji, "~"),
      fragmentsInfo: [{ fragment: e, indexInUsfm: 0 }]
    };
  }
  /**
   * Merge an independent array of fragment info into an existing array of fragment info, offsetting
   * the indices of the new fragments so their locations start from the end of the string
   */
  static mergeFragmentsInfoIntoExistingArray(e, t, n) {
    e.forEach((a) => {
      const s = n + a.indexInUsfm;
      t.push({
        ...a,
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
    const a = [], { markerNameUsfm: s, markerInfo: l, markerType: c, markerTypeInfo: m, attributeMarkerInfoEntries: d } = this.getInfoForMarker(e), h = e;
    (m.hasNewlineBefore || q.isUsjMarker(e)) && (n += `
`);
    const f = c === "char" && t ? "+" : "";
    return a.push({ fragment: e, indexInUsfm: n.length }), n += c === "optbreak" ? "//" : `\\${f}`, c !== "optbreak" && (a.push({
      fragment: { isAttributeValueForKey: "marker", forMarker: e },
      indexInUsfm: n.length
    }), n += `${s}${c === "unmatched" ? "" : " "}`), l.leadingAttributes && l.leadingAttributes.forEach((g) => {
      const v = h[g];
      v && (a.push({
        fragment: { isAttributeValueForKey: g, forMarker: e },
        indexInUsfm: n.length
      }), n += `${v} `);
    }), l.textContentAttribute && h[l.textContentAttribute] && (a.push({
      fragment: { isAttributeValueForKey: l.textContentAttribute, forMarker: e },
      indexInUsfm: n.length
    }), n += `${h[l.textContentAttribute]} `), l.attributeMarkers && d.forEach(([g, v]) => {
      const E = h[v.attributeMarkerAttributeName];
      if (!E) return;
      const A = {
        type: v.type,
        marker: g,
        content: [E]
      }, P = [];
      n = this.addMarkerUsfmToString(
        n,
        A,
        e,
        P
      );
      const { usfm: S } = this.textContentToUsfm(E);
      a.push({
        fragment: {
          isAttributeValueForKey: v.attributeMarkerAttributeName,
          forMarker: e
        },
        indexInUsfm: n.length
      }), n += S, n = this.addMarkerUsfmToString(
        n,
        {
          isClosingMarker: !0,
          forMarker: A
        },
        e,
        P
      ), P.forEach((O) => {
        if (te(O.fragment) || "isAttributeKey" in O.fragment)
          throw new Error(
            `Attribute marker opening or closing markers generated a text content fragment or an attribute key fragment! This does not make sense. ${JSON.stringify(O)}`
          );
        if (q.isFragmentAMarker(O.fragment)) {
          a.push({
            ...O,
            fragment: {
              isAttributeMarker: v.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("isAttributeValueForKey" in O.fragment) {
          if (O.fragment.isAttributeValueForKey !== "marker")
            throw new Error(
              `Attribute marker opening or closing markers generated an attribute value fragment for a key that was not marker! This does not make sense. ${JSON.stringify(O)}`
            );
          a.push({
            ...O,
            fragment: {
              isAttributeKey: v.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("isClosingMarker" in O.fragment) {
          const { isClosingMarker: $, ...Q } = O.fragment, se = {
            ...Q,
            forMarker: e,
            isAttributeMarkerClosingMarker: v.attributeMarkerAttributeName
          };
          a.push({
            ...O,
            fragment: se
          });
          return;
        }
        throw new Error(
          `Attribute marker opening or closing markers generated an unrecognized fragment: ${JSON.stringify(O)}`
        );
      }), !this.markersMap.isSpaceAfterAttributeMarkersContent && v.hasStructuralSpaceAfterCloseAttributeMarker && (n += " ");
    }), { usfm: n, fragmentsInfo: a };
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
      markerName: n,
      markerNameUsfm: a,
      markerInfo: s,
      markerType: l,
      markerTypeInfo: c,
      attributeMarkerInfoEntries: m
    } = this.getInfoForMarker(e), d = Object.keys(e).filter((E) => {
      var A, P;
      return !(E === "type" || E === "marker" || E === "content" || E === "closed" || (A = c.skipOutputAttributeToUsfm) != null && A.includes(E) || (P = s.leadingAttributes) != null && P.includes(E) || s.textContentAttribute === E || m.some(
        ([, S]) => S.attributeMarkerAttributeName === E
      ));
    }), h = e;
    if (c.hasClosingMarker && s.independentClosingMarkers && s.independentClosingMarkers.length > 0)
      throw new Error(
        `Marker ${a} is intended to have a normal closing marker and independent closing markers. As of writing this code, there is no known syntax for this situation in USFM. Cannot proceed.`
      );
    let f = !0;
    if (s.isClosingMarkerOptional ? (!this.markersMap.shouldOptionalClosingMarkersBePresent && h.closed !== "true" || this.markersMap.shouldOptionalClosingMarkersBePresent && h.closed === "false") && (f = !1) : h.closed === "false" && (f = !1), s.independentClosingMarkers && s.independentClosingMarkers.length > 0 && f) {
      const E = {
        type: l,
        marker: s.independentClosingMarkers[0],
        // Put all the closing marker attributes on here since we don't really have a better place
        // to put them and might as well
        ...Object.fromEntries(
          d.map((Q) => [
            Q,
            h[Q]
          ])
        )
      };
      let A = "";
      const P = [], { usfm: S, fragmentsInfo: O } = this.openingMarkerToUsfm(E, t), $ = O.find((Q) => q.isFragmentAMarker(Q.fragment));
      if (!$)
        throw new Error(
          `Could not find opening fragment info for independent closing marker ${JSON.stringify(
            E
          )}. Fragments info generated: ${JSON.stringify(O)}`
        );
      return P.push({
        ...$,
        fragment: { isClosingMarker: !0, forMarker: e }
      }), A += S, n !== E.marker && (A = this.addMarkerUsfmToString(
        A,
        {
          isClosingMarker: !0,
          forMarker: E
        },
        t
      )), { usfm: A, fragmentsInfo: P };
    }
    let g = "";
    const v = [];
    if (d.length > 0 && (g += "|", d.length === 1 && d[0] === s.defaultAttribute ? (v.push({
      fragment: { isAttributeValueForKey: s.defaultAttribute, forMarker: e },
      indexInUsfm: g.length
    }), g += h[s.defaultAttribute]) : d.forEach((E, A) => {
      const P = n === "fig" && E === "file" ? "src" : E;
      A > 0 && (g += " "), v.push({
        fragment: { isAttributeKey: E, forMarker: e },
        indexInUsfm: g.length
      }), g += `${P}="`, v.push({
        fragment: { isAttributeValueForKey: E, forMarker: e },
        indexInUsfm: g.length
      }), g += `${h[E]}"`;
    })), c.hasClosingMarker && f) {
      const E = c.isClosingMarkerEmpty ? "" : a, A = l === "char" && t ? "+" : "";
      v.push({
        fragment: { isClosingMarker: !0, forMarker: e },
        indexInUsfm: g.length
      }), g += `\\${A}${E}*`;
    }
    return { usfm: g, fragmentsInfo: v };
  }
  /**
   * Determines whether this marker and all its content should be skipped entirely when outputting
   * to USFM
   *
   * @param marker Marker to check
   * @returns `true` if this marker should be skipped; `false` otherwise
   */
  shouldSkipOutputMarkerToUsfm(e) {
    var a;
    const { markerType: t, markerTypeInfo: n } = this.getInfoForMarker(e);
    return !!(t === "table" || (a = n.skipOutputMarkerToUsfmIfAttributeIsPresent) != null && a.some(
      (s) => s in e
    ));
  }
  /** Removes one space at the end of the string if present */
  static removeEndSpace(e) {
    return e.at(-1) !== " " ? e : e.slice(0, -1);
  }
  addMarkerUsfmToString(e, t, n, a) {
    let s = e, l, c;
    const { markerName: m, markerType: d, markerTypeInfo: h } = this.getInfoForMarker(
      "isClosingMarker" in t ? t.forMarker : t
    );
    let f = !1;
    if (typeof n == "boolean")
      f = n;
    else if (n) {
      const { markerType: g } = this.getInfoForMarker(
        n
      );
      g === d && (f = !0);
    }
    if ("isClosingMarker" in t) {
      const { usfm: g, fragmentsInfo: v } = this.closingMarkerToUsfm(
        t.forMarker,
        f
      );
      c = v, l = g, h.hasClosingMarker && h.isClosingMarkerEmpty && // No contents
      (!t.forMarker.content || t.forMarker.content.length === 0) && // No closing marker attributes
      !l.startsWith("|") && (s = q.removeEndSpace(s));
    } else {
      const { usfm: g, fragmentsInfo: v } = this.openingMarkerToUsfm(
        t,
        f
      );
      c = v, l = g;
    }
    if (l.startsWith(`
`) && (s.length === 0 ? (c.map((g) => ({
      ...g,
      indexInUsfm: g.indexInUsfm - 1
    })), l = l.substring(1)) : s = q.removeEndSpace(s)), this.markersMap.isSpaceAfterAttributeMarkersContent && m === "ca") {
      const g = s.lastIndexOf("\\");
      g >= 0 && e.substring(
        g + 1,
        g + 3
      ) === "c " && (s = q.removeEndSpace(s), s += `
 `);
    }
    return a && q.mergeFragmentsInfoIntoExistingArray(
      c,
      a,
      s.length
    ), s += l, s;
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
   * Split a USJ document JSONPath into the part before the property accessor (presumably
   * `ContentJsonPath`, but this method does not check that this is true) and the property being
   * accessed
   *
   * @param jsonPath USJ document JSONPath that may include a property accessor at the end
   * @returns The part before any property accessor (whole original `jsonPath` if there is no
   *   property accessor) and the property being accessed in the `jsonPath` (`undefined` if there is
   *   no property accessor)
   */
  static splitJsonPathIntoContentAndProperty(e) {
    const [, t, n] = e.match(/(.+)\.([^[]+)$/) ?? e.match(/(.+)\['(.+)']$/) ?? e.match(/(.+)\["(.+)"]$/) ?? [void 0, e];
    return { contentJsonPath: t, property: n };
  }
  /** Compares two UsjDocumentLocations to determine if they are pointing to the same location */
  static areUsjDocumentLocationsEqual(e, t) {
    const { jsonPath: n, ...a } = e, { jsonPath: s, ...l } = t, c = q.splitJsonPathIntoContentAndProperty(n), m = q.splitJsonPathIntoContentAndProperty(s);
    return zt(c, m) ? zt(a, l) : !1;
  }
  /** Find the fragment info corresponding to the specified USJ Document location. */
  findFragmentInfoAtUsjDocumentLocation(e) {
    const t = q.moveUsjDocumentLocationToNewOffset(e, 0);
    let n;
    return this.fragmentsByIndexInUsfm.keys().find((a) => {
      const s = this.fragmentsByIndexInUsfm.get(a);
      return !s || !q.areUsjDocumentLocationsEqual(
        s.nodeAndDocumentLocation.documentLocation,
        t
      ) ? !1 : (n = s, !0);
    }), n;
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
    const a = q.convertWorkingStackToJsonPath(t);
    return te(e) ? { jsonPath: a, offset: n } : { jsonPath: a };
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
    if (te(e) || q.isFragmentAMarker(e)) {
      const a = q.convertNodeToUsjDocumentLocation(
        e,
        t,
        n
      );
      return {
        node: e,
        documentLocation: a
      };
    }
    if ("isClosingMarker" in e) {
      const s = {
        jsonPath: q.convertWorkingStackToJsonPath(t),
        closingMarkerOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("isAttributeValueForKey" in e) {
      const s = {
        jsonPath: q.convertWorkingStackAndPropertyToJsonPath(
          t,
          e.isAttributeValueForKey
        ),
        propertyOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("isAttributeKey" in e) {
      const s = {
        jsonPath: q.convertWorkingStackToJsonPath(t),
        keyName: e.isAttributeKey,
        keyOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("isAttributeMarker" in e) {
      const s = {
        jsonPath: q.convertWorkingStackToJsonPath(t),
        keyName: e.isAttributeMarker
      };
      return {
        node: e.forMarker,
        documentLocation: s
      };
    }
    if ("isAttributeMarkerClosingMarker" in e) {
      const s = {
        jsonPath: q.convertWorkingStackToJsonPath(t),
        keyName: e.isAttributeMarkerClosingMarker,
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
   *   fragments are. PROPERTIES ON THIS OBJECT ARE MODIFIED IN THIS METHOD
   * @param fragmentsByIndexInUsfm Map to add fragment information to
   * @param indicesInUsfmByVerseRef Map to add verse start locations to
   */
  static transferFragmentsInfoArrayToMaps(e, t, n, a, s) {
    e.map((c) => {
      var d, h, f;
      if (typeof c.fragment == "object" && "type" in c.fragment) {
        const g = c.fragment;
        if (g.type === Yn && g.code)
          n.bookId = g.code, n.chapterNum = 0, n.verseNum = 0, s[Ge] && (s[n.bookId] = s[Ge], delete s[Ge]);
        else if (g.type === Nr && g.number) {
          const v = parseInt(g.number, 10);
          if (Number.isNaN(v))
            console.warn(
              `Found ${Nr} type marker with number ${g.number}, but could not parse chapter number from it. Continuing using previous chapter number ${n.chapterNum}`
            );
          else {
            n.chapterNum = v, n.verseNum = 0;
            const E = s[n.bookId];
            E != null && E[0] && (E[n.chapterNum] = E[0], delete E[0]);
          }
        } else if (g.type === ke && g.number) {
          const v = (d = Ki.exec(g.number)) == null ? void 0 : d[1];
          if (!v)
            console.warn(
              `Found ${ke} type marker with number ${g.number}, but could not find starting verse number in it. Continuing using previous verse number ${n.verseNum}`
            );
          else {
            const E = parseInt(v, 10);
            Number.isNaN(E) ? console.warn(
              `Found ${ke} type marker with number ${g.number}, but could not parse starting verse number from ${v}. Continuing using previous verse number ${n.verseNum}`
            ) : n.verseNum === E ? console.warn(
              `Found multiple ${ke} markers in a row with same number ${n.verseNum}! Not updating verse start index. All positions will be based on the first ${ke} marker index.`
            ) : (f = (h = s[n.bookId]) == null ? void 0 : h[n.chapterNum]) != null && f[E] ? console.warn(`Found ${ke} marker with existing number ${E} after
                  current ${ke} number ${n.verseNum}! Not updating verse start index. All positions in this duplicate verse will be based on the current ${ke} marker, not the new duplicate marker.`) : (E < n.verseNum && console.debug(
              `Found ${ke} marker with number ${E} lower than current ${ke} number ${n.verseNum}. Verses are out of order. There may be some issues.`
            ), n.verseNum = E);
          }
        }
      }
      return {
        ...c,
        // Determine the appropriate `UsjDocumentLocation` subtype based on what this fragment is
        nodeAndDocumentLocation: q.convertFragmentToUsjNodeAndDocumentLocation(
          c.fragment,
          t
        )
      };
    }).forEach((c) => {
      a.set(c.indexInUsfm, c), s[n.bookId] || (s[n.bookId] = {}), s[n.bookId][n.chapterNum] || (s[n.bookId][n.chapterNum] = {}), s[n.bookId][n.chapterNum][n.verseNum] === void 0 && (s[n.bookId][n.chapterNum][n.verseNum] = c.indexInUsfm);
    }), e.splice(0);
  }
  // #endregion fragment utilities
  // #region USFM-related cached properties
  calculateUsfmProperties() {
    let e = "";
    const t = new rr(), n = {}, a = [], s = {
      bookId: Ge,
      chapterNum: 0,
      verseNum: 0
    };
    function l(h) {
      q.transferFragmentsInfoArrayToMaps(
        a,
        h,
        s,
        t,
        n
      );
    }
    let c, m = !1;
    const d = [];
    return q.findNextMatchingTokenUsingWorkingStack(
      this.usj,
      // Working stack is empty since the top-level object doesn't have any parents
      [],
      // Don't skip anything
      [],
      (h, f) => {
        if (typeof h != "object") {
          const { usfm: v, fragmentsInfo: E } = this.textContentToUsfm(h);
          return q.mergeFragmentsInfoIntoExistingArray(
            E,
            a,
            e.length
          ), l(f), e += v, !1;
        }
        let g;
        return f.length > 0 && (g = f[f.length - 1].parent), "isClosingMarker" in h ? d.length > 0 && d[d.length - 1] === h.forMarker ? (d.pop(), !1) : (e = this.addMarkerUsfmToString(e, h, g, a), l(f), h.forMarker.type === "book" && !m && (c && (e = this.addMarkerUsfmToString(e, c, g, a), l(f)), m = !0), !1) : this.shouldSkipOutputMarkerToUsfm(h) ? (d.push(h), !1) : !m && q.isUsjMarker(h) && !c ? (h.version !== "3.0" && (c = h), !1) : (e = this.addMarkerUsfmToString(e, h, g, a), l(f), !1);
      }
    ), e = `${q.removeEndSpace(e)}
`, { usfm: e, fragmentsByIndexInUsfm: t, indicesInUsfmByVerseRef: n };
  }
  get usfm() {
    return this.usfmInternal !== void 0 ? this.usfmInternal : ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties(), this.usfmInternal);
  }
  get fragmentsByIndexInUsfm() {
    return this.fragmentsByIndexInUsfmInternal ? this.fragmentsByIndexInUsfmInternal : ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties(), this.fragmentsByIndexInUsfmInternal);
  }
  get indicesInUsfmByVerseRef() {
    return this.indicesInUsfmByVerseRefInternal ? this.indicesInUsfmByVerseRefInternal : ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties(), this.indicesInUsfmByVerseRefInternal);
  }
  // #endregion USFM-related cached properties
}
export {
  Zt as AsyncVariable,
  Nr as CHAPTER_TYPE,
  Zi as Collator,
  nn as DateTimeFormat,
  cn as DocumentCombiner,
  uo as EventRollingTimeCounter,
  Un as FIRST_SCR_BOOK_NUM,
  jn as FIRST_SCR_CHAPTER_NUM,
  Vn as FIRST_SCR_VERSE_NUM,
  $n as LAST_SCR_BOOK_NUM,
  Ko as MODIFIER_KEYS,
  fn as Mutex,
  co as MutexMap,
  lo as NonValidatingDocumentCombiner,
  pn as NumberFormat,
  kt as PLATFORM_ERROR_VERSION,
  on as PlatformEventEmitter,
  fo as PromiseChainingMap,
  Hn as Section,
  rr as SortedNumberMap,
  po as SortedSet,
  Vi as THEME_STYLE_ELEMENT_ID,
  Hi as USFM_MARKERS_MAP_3_1,
  ho as UnsubscriberAsyncList,
  q as UsjReaderWriter,
  ke as VERSE_TYPE,
  jo as aggregateUnsubscriberAsyncs,
  $o as aggregateUnsubscribers,
  Wo as applyThemeStylesheet,
  Uo as areUsjContentsEqualExceptWhitespace,
  Bt as at,
  Et as charAt,
  vo as codePointAt,
  Lo as compareScrRefs,
  oo as createSyncProxyForAsyncObject,
  to as debounce,
  xt as deepClone,
  zt as deepEqual,
  Oo as defaultScrRef,
  Pi as deserialize,
  kn as endsWith,
  zr as ensureArray,
  wo as escapeStringRegexp,
  Yo as expandThemeContribution,
  Jo as formatBytes,
  bo as formatReplacementString,
  Rn as formatReplacementStringToArray,
  Fo as formatScrRef,
  Xo as formatTimeSpan,
  io as getAllObjectFunctionNames,
  zn as getChaptersForBook,
  Ho as getCurrentLocale,
  Xr as getDefaultCallerSequence,
  Br as getErrorMessage,
  Vo as getFormatCallerFunction,
  Gn as getLocalizeKeyForScrollGroupId,
  _o as getLocalizeKeysForScrollGroupIds,
  Ro as getLocalizedIdFromBookNumber,
  Wn as getNthCaller,
  qo as getSectionForBook,
  Gi as getStylesheetForTheme,
  ro as groupBy,
  Go as htmlEncode,
  Pn as includes,
  Ot as indexOf,
  ao as isErrorMessageAboutParatextBlockingInternetAccess,
  so as isErrorMessageAboutRegistryAuthFailure,
  To as isLocalizeKey,
  go as isPlatformError,
  zo as isSerializable,
  te as isString,
  Ri as isSubset,
  gt as isWhiteSpace,
  Ln as lastIndexOf,
  Ui as localizedStringsDocumentSchema,
  $i as menuDocumentSchema,
  eo as newGuid,
  mo as newPlatformError,
  Do as normalize,
  br as normalizeScriptureSpaces,
  Mo as offsetBook,
  ko as offsetChapter,
  Bo as offsetVerse,
  Ao as ordinalCompare,
  No as padEnd,
  Co as padStart,
  Fi as projectSettingsDocumentSchema,
  Po as scrRefToBBBCCC,
  yr as scrRefToBBBCCCVVV,
  kr as serialize,
  qi as settingsDocumentSchema,
  gr as slice,
  Er as split,
  Gr as startsWith,
  he as stringLength,
  ot as substring,
  ji as themeDocumentSchema,
  _n as toArray,
  So as toKebabCase,
  xo as transformAndEnsureRegExpArray,
  Io as transformAndEnsureRegExpRegExpArray,
  un as wait,
  no as waitForDuration
};
//# sourceMappingURL=index.js.map
