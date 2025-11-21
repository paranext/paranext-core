var Gn = Object.defineProperty;
var Jn = (r, e, t) => e in r ? Gn(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var X = (r, e, t) => Jn(r, typeof e != "symbol" ? e + "" : e, t);
import { Mutex as Xn } from "async-mutex";
import { JSONPath as qt } from "jsonpath-plus";
const Wt = class Wt {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, t = 1e4) {
    X(this, "variableName");
    X(this, "promiseToValue");
    X(this, "timeoutId");
    X(this, "timeoutOccurred");
    X(this, "resolver");
    X(this, "rejecter");
    this.variableName = e, this.timeoutOccurred = !1, this.promiseToValue = new Promise((n, o) => {
      this.resolver = n, this.rejecter = o;
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
      Wt.verboseLoggingEnabled && console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
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
      Wt.verboseLoggingEnabled && console.debug(`${this.variableName} is being rejected now with reason: ${e}`), this.rejecter(e), this.complete();
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
X(Wt, "verboseLoggingEnabled", !1);
let Or = Wt;
class pa {
  constructor(e, t) {
    X(this, "collator");
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
class Yn {
  constructor(e, t) {
    X(this, "dateTimeFormatter");
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
class Kn {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    X(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    X(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    X(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    X(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    X(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    X(this, "emit", (e) => {
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
function ha() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (r) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~r) * 65536 >> r).toString(16).padStart(4, "0")
    )
  );
}
function pe(r) {
  return typeof r == "string" || r instanceof String;
}
function Kt(r) {
  return JSON.parse(JSON.stringify(r));
}
function da(r, e = 300) {
  let t, n, o, a;
  return (...l) => (clearTimeout(t), n || (n = new Promise((p, d) => {
    o = p, a = d;
  })), t = setTimeout(async () => {
    try {
      o(await r(...l));
    } catch (p) {
      a(p);
    } finally {
      n = void 0;
    }
  }, e), n);
}
function ma(r, e, t) {
  const n = /* @__PURE__ */ new Map();
  return r.forEach((o, a) => {
    const l = e(o, a), p = n.get(l), d = t ? t(o, l, a) : o;
    p ? p.push(d) : n.set(l, [d]);
  }), n;
}
function Wn(r) {
  return typeof r == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  r !== null && "message" in r && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof r.message == "string";
}
function Qn(r) {
  if (Wn(r)) return r;
  try {
    return new Error(JSON.stringify(r));
  } catch {
    return new Error(String(r));
  }
}
function bn(r) {
  return Qn(r).message;
}
function Zn(r) {
  return new Promise((e) => setTimeout(e, r));
}
function ga(r, e) {
  const t = Zn(e).then(() => {
  });
  return Promise.any([t, r()]);
}
function Ea(r, e = "obj") {
  const t = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(r).forEach((o) => {
    try {
      typeof r[o] == "function" && t.add(o);
    } catch {
    }
  });
  let n = Object.getPrototypeOf(r);
  for (; n && Object.getPrototypeOf(n); )
    Object.getOwnPropertyNames(n).forEach((o) => {
      try {
        typeof r[o] == "function" && t.add(o);
      } catch {
      }
    }), n = Object.getPrototypeOf(n);
  return t;
}
function ya(r, e = {}) {
  return new Proxy(e, {
    get(t, n) {
      return n in t ? t[n] : async (...o) => (await r())[n](...o);
    }
  });
}
function ba(r) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return pe(r) ? r.includes(e) : bn(r).includes(e);
}
function Aa(r) {
  const e = "401 Unauthorized error while getting shared projects.", t = "User registration is not valid. Cannot retrieve resources from DBL.", n = pe(r) ? r : bn(r);
  return n.includes(e) || n.includes(t);
}
class ei {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, t) {
    X(this, "baseDocument");
    X(this, "contributions", /* @__PURE__ */ new Map());
    X(this, "latestOutput");
    X(this, "options");
    X(this, "onDidRebuildEmitter", new Kn());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    X(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = t, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? Kt(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
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
    let o = this.options.copyDocuments && t ? Kt(t) : t;
    o = this.transformContributionAfterValidation(e, o), this.contributions.set(e, o);
    try {
      return this.rebuild();
    } catch (a) {
      throw n ? this.contributions.set(e, n) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${a}`);
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
        ([n, o]) => this.contributions.set(n, o)
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
      let t = Kt(this.baseDocument);
      return t = this.transformFinalOutputBeforeValidation(t), this.validateOutput(t), this.latestOutput = t, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((t) => {
      e = ti(
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
function Mr(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || Array.isArray(t)) && (e = !1);
  }), e;
}
function kr(...r) {
  let e = !0;
  return r.forEach((t) => {
    (!t || typeof t != "object" || !Array.isArray(t)) && (e = !1);
  }), e;
}
function ti(r, e, t) {
  const n = Kt(r);
  return e ? An(n, Kt(e), t) : n;
}
function An(r, e, t) {
  if (!e) return r;
  if (Mr(r, e)) {
    const n = r, o = e;
    Object.keys(o).forEach((a) => {
      if (Object.hasOwn(n, a)) {
        if (Mr(n[a], o[a]))
          n[a] = An(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            n[a],
            o[a],
            t
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (kr(n[a], o[a]))
          n[a] = n[a].concat(
            o[a]
          );
        else if (!t)
          throw new Error(`Cannot merge objects: key "${a}" already exists in the target object`);
      } else
        n[a] = o[a];
    });
  } else kr(r, e) && r.push(...e);
  return r;
}
class va {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(e) {
    /** The ring buffer to store times */
    X(this, "ringBuffer");
    /** The size of the ring buffer */
    X(this, "bufferSize");
    /** The next location where a time will be written */
    X(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    X(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    X(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    X(this, "totalInstanceCount");
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
class ri extends Xn {
}
class Da {
  constructor() {
    X(this, "mutexesByID", /* @__PURE__ */ new Map());
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
    return t || (t = new ri(), this.mutexesByID.set(e, t), t);
  }
}
class Ta extends ei {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, t) {
    super(e, t);
  }
  get output() {
    return this.latestOutput;
  }
}
class ni {
  constructor(e, t) {
    X(this, "numberFormatter");
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
const ii = Promise.resolve();
class Na {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    X(this, "map", /* @__PURE__ */ new Map());
    X(this, "logger");
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
    const n = { promise: ii }, o = t.catch((a) => this.logger.warn(`Error in promise for ${e}: ${a.message}`)).finally(() => {
      this.map.get(e) === n.promise && this.map.delete(e);
    });
    n.promise = o, this.map.set(e, o);
  }
}
class Rr {
  constructor() {
    X(this, "map", /* @__PURE__ */ new Map());
    X(this, "sortedKeys", []);
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
    const n = this.sortedKeys[t], o = this.map.get(n);
    if (o !== void 0)
      return { key: n, value: o };
  }
  binarySearchLessThanOrEqual(e) {
    let t = 0, n = this.sortedKeys.length - 1, o = -1;
    for (; t <= n; ) {
      const a = Math.floor((t + n) / 2);
      this.sortedKeys[a] <= e ? (o = a, t = a + 1) : n = a - 1;
    }
    return o;
  }
  binarySearchInsertIndex(e) {
    let t = 0, n = this.sortedKeys.length;
    for (; t < n; ) {
      const o = Math.floor((t + n) / 2);
      this.sortedKeys[o] < e ? t = o + 1 : n = o;
    }
    return t;
  }
}
class Ca {
  /**
   * Creates a new sorted set
   *
   * @param compareFn - Function used to determine the order of elements. Returns negative when a <
   *   b, zero when a = b, positive when a > b
   */
  constructor(e) {
    /** Internal storage for the sorted items */
    X(this, "items", []);
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
      const o = Math.floor((t + n) / 2);
      this.compareFn(this.items[o], e) < 0 ? t = o + 1 : n = o;
    }
    return t;
  }
}
class wa {
  constructor(e = "Anonymous") {
    X(this, "unsubscribers", /* @__PURE__ */ new Set());
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
    return this.unsubscribers.clear(), t.every((n, o) => (n || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${o} failed!`), n));
  }
}
const er = 1;
function Sa(r) {
  if (!r) return { message: "", platformErrorVersion: er };
  if (pe(r)) return { message: r, platformErrorVersion: er };
  if (typeof r == "object" && "message" in r && typeof r.message == "string") {
    const e = {
      message: r.message,
      platformErrorVersion: er
    };
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)), Object.defineProperty(e, "message", { enumerable: !0 }), "stack" in r && pe(r.stack) && Object.defineProperty(e, "stack", { value: r.stack, enumerable: !0 }), "cause" in e && Object.defineProperty(e, "cause", { enumerable: !0 }), e;
  }
  return { cause: r, message: "", platformErrorVersion: er };
}
function Ia(r) {
  return !!r && typeof r == "object" && "platformErrorVersion" in r;
}
var oi = Object.defineProperty, ai = (r, e, t) => e in r ? oi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, ne = (r, e, t) => ai(r, typeof e != "symbol" ? e + "" : e, t);
const xt = [
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
], Nr = [
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
], vn = [
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
], _r = gi();
function Ft(r, e = !0) {
  return e && (r = r.toUpperCase()), r in _r ? _r[r] : 0;
}
function Cr(r) {
  return Ft(r) > 0;
}
function si(r) {
  const e = typeof r == "string" ? Ft(r) : r;
  return e >= 40 && e <= 66;
}
function ui(r) {
  return (typeof r == "string" ? Ft(r) : r) <= 39;
}
function Dn(r) {
  return r <= 66;
}
function li(r) {
  const e = typeof r == "string" ? Ft(r) : r;
  return Cn(e) && !Dn(e);
}
function* ci() {
  for (let r = 1; r <= xt.length; r++) yield r;
}
const fi = 1, Tn = xt.length;
function pi() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function wr(r, e = "***") {
  const t = r - 1;
  return t < 0 || t >= xt.length ? e : xt[t];
}
function Nn(r) {
  return r <= 0 || r > Tn ? "******" : vn[r - 1];
}
function hi(r) {
  return Nn(Ft(r));
}
function Cn(r) {
  const e = typeof r == "number" ? wr(r) : r;
  return Cr(e) && !Nr.includes(e);
}
function di(r) {
  const e = typeof r == "number" ? wr(r) : r;
  return Cr(e) && Nr.includes(e);
}
function mi(r) {
  return vn[r - 1].includes("*obsolete*");
}
function gi() {
  const r = {};
  for (let e = 0; e < xt.length; e++)
    r[xt[e]] = e + 1;
  return r;
}
const Oe = {
  allBookIds: xt,
  nonCanonicalIds: Nr,
  bookIdToNumber: Ft,
  isBookIdValid: Cr,
  isBookNT: si,
  isBookOT: ui,
  isBookOTNT: Dn,
  isBookDC: li,
  allBookNumbers: ci,
  firstBook: fi,
  lastBook: Tn,
  extraBooks: pi,
  bookNumberToId: wr,
  bookNumberToEnglishName: Nn,
  bookIdToEnglishName: hi,
  isCanonical: Cn,
  isExtraMaterial: di,
  isObsolete: mi
};
var gt = /* @__PURE__ */ ((r) => (r[r.Unknown = 0] = "Unknown", r[r.Original = 1] = "Original", r[r.Septuagint = 2] = "Septuagint", r[r.Vulgate = 3] = "Vulgate", r[r.English = 4] = "English", r[r.RussianProtestant = 5] = "RussianProtestant", r[r.RussianOrthodox = 6] = "RussianOrthodox", r))(gt || {});
const Qe = class {
  // private versInfo: Versification;
  constructor(e) {
    if (ne(this, "name"), ne(this, "fullPath"), ne(this, "isPresent"), ne(this, "hasVerseSegments"), ne(this, "isCustomized"), ne(this, "baseVersification"), ne(this, "scriptureBooks"), ne(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = gt[e]) : (this._type = e, this.name = gt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
ne(Qe, "Original", new Qe(gt.Original)), ne(Qe, "Septuagint", new Qe(gt.Septuagint)), ne(Qe, "Vulgate", new Qe(gt.Vulgate)), ne(Qe, "English", new Qe(gt.English)), ne(Qe, "RussianProtestant", new Qe(gt.RussianProtestant)), ne(Qe, "RussianOrthodox", new Qe(gt.RussianOrthodox));
let St = Qe;
function Pr(r, e) {
  const t = e[0];
  for (let n = 1; n < e.length; n++)
    r = r.split(e[n]).join(t);
  return r.split(t);
}
var wn = /* @__PURE__ */ ((r) => (r[r.Valid = 0] = "Valid", r[r.UnknownVersification = 1] = "UnknownVersification", r[r.OutOfRange = 2] = "OutOfRange", r[r.VerseOutOfOrder = 3] = "VerseOutOfOrder", r[r.VerseRepeated = 4] = "VerseRepeated", r))(wn || {});
const Ve = class oe {
  constructor(e, t, n, o) {
    if (ne(this, "firstChapter"), ne(this, "lastChapter"), ne(this, "lastVerse"), ne(this, "hasSegmentsDefined"), ne(this, "text"), ne(this, "BBBCCCVVVS"), ne(this, "longHashCode"), ne(this, "versification"), ne(this, "rtlMark", "‏"), ne(this, "_bookNum", 0), ne(this, "_chapterNum", 0), ne(this, "_verseNum", 0), ne(this, "_verse"), n == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, l = t != null && t instanceof St ? t : void 0;
        this.setEmpty(l), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = t != null && t instanceof St ? t : void 0;
        this.setEmpty(a), this._verseNum = e % oe.chapterDigitShifter, this._chapterNum = Math.floor(
          e % oe.bookDigitShifter / oe.chapterDigitShifter
        ), this._bookNum = Math.floor(e / oe.bookDigitShifter);
      } else if (t == null)
        if (e != null && e instanceof oe) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null) return;
          const a = e instanceof St ? e : oe.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && t != null && n != null)
      if (typeof e == "string" && typeof t == "string" && typeof n == "string")
        this.setEmpty(o), this.updateInternal(e, t, n);
      else if (typeof e == "number" && typeof t == "number" && typeof n == "number")
        this._bookNum = e, this._chapterNum = t, this._verseNum = n, this.versification = o ?? oe.defaultVersification;
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
      return t = new oe(e), { success: !0, verseRef: t };
    } catch (n) {
      if (n instanceof $t)
        return t = new oe(), { success: !1, verseRef: t };
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
    return e % oe.bcvMaxValue * oe.bookDigitShifter + (t >= 0 ? t % oe.bcvMaxValue * oe.chapterDigitShifter : 0) + (n >= 0 ? n % oe.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: t, chapterNum: n, verseNum: o, verse: a, versificationStr: l } = e, p = a || o.toString();
    let d;
    return l && (d = new St(l)), t ? new oe(t, n.toString(), p, d) : new oe();
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
    for (let o = 0; o < e.length; o++) {
      if (n = e[o], n < "0" || n > "9")
        return o === 0 && (t = -1), { success: !1, vNum: t };
      if (t = t * 10 + +n - 0, t > oe.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(oe.verseRangeSeparator) || this._verse.includes(oe.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Oe.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = Oe.bookIdToNumber(e);
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
    const { success: t, vNum: n } = oe.tryGetVerseNum(e);
    this._verse = t ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = oe.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > Oe.lastBook)
      throw new $t(
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
    this.versification = this.versification != null ? new St(e) : void 0;
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
    return this.validateVerse(oe.verseRangeSeparators, oe.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return oe.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return oe.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
      const a = e.split("/");
      if (e = a[0], a.length > 1)
        try {
          const l = +a[1].trim();
          this.versification = new St(gt[l]);
        } catch {
          throw new $t("Invalid reference : " + e);
        }
    }
    const t = e.trim().split(" ");
    if (t.length !== 2)
      throw new $t("Invalid reference : " + e);
    const n = t[1].split(":"), o = +n[0];
    if (n.length !== 2 || Oe.bookIdToNumber(t[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(n[1]))
      throw new $t("Invalid reference : " + e);
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
    return new oe(this);
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
    return e instanceof oe ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, t = oe.verseRangeSeparators, n = oe.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = Pr(this._verse, n);
    for (const l of a.map((p) => Pr(p, t))) {
      const p = this.clone();
      p.verse = l[0];
      const d = p.verseNum;
      if (o.push(p), l.length > 1) {
        const f = this.clone();
        if (f.verse = l[1], !e)
          for (let g = d + 1; g < f.verseNum; g++) {
            const h = new oe(
              this._bookNum,
              this._chapterNum,
              g,
              this.versification
            );
            this.isExcluded || o.push(h);
          }
        o.push(f);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, t) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const o of this.allVerses(!0, e, t)) {
      const a = o.internalValid;
      if (a !== 0)
        return a;
      const l = o.BBBCCCVVV;
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Oe.lastBook ? 2 : (Oe.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, t, n) {
    this.bookNum = Oe.bookIdToNumber(e), this.chapter = t, this.verse = n;
  }
};
ne(Ve, "defaultVersification", St.English), ne(Ve, "verseRangeSeparator", "-"), ne(Ve, "verseSequenceIndicator", ","), ne(Ve, "verseRangeSeparators", [Ve.verseRangeSeparator]), ne(Ve, "verseSequenceIndicators", [Ve.verseSequenceIndicator]), ne(Ve, "chapterDigitShifter", 1e3), ne(Ve, "bookDigitShifter", Ve.chapterDigitShifter * Ve.chapterDigitShifter), ne(Ve, "bcvMaxValue", Ve.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
ne(Ve, "ValidStatusType", wn);
let Sn = Ve;
class $t extends Error {
}
var ie = {}, xe = {}, Lr;
function Ut() {
  if (Lr) return xe;
  Lr = 1;
  function r(R, O, V) {
    if (V === void 0 && (V = Array.prototype), R && typeof V.find == "function")
      return V.find.call(R, O);
    for (var G = 0; G < R.length; G++)
      if (t(R, G)) {
        var he = R[G];
        if (O.call(void 0, he, G, R))
          return he;
      }
  }
  function e(R, O) {
    return O === void 0 && (O = Object), O && typeof O.getOwnPropertyDescriptors == "function" && (R = O.create(null, O.getOwnPropertyDescriptors(R))), O && typeof O.freeze == "function" ? O.freeze(R) : R;
  }
  function t(R, O) {
    return Object.prototype.hasOwnProperty.call(R, O);
  }
  function n(R, O) {
    if (R === null || typeof R != "object")
      throw new TypeError("target is not an object");
    for (var V in O)
      t(O, V) && (R[V] = O[V]);
    return R;
  }
  var o = e({
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
  function a(R) {
    return t(o, R.toLowerCase());
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
  function p(R) {
    return t(l, R.toLowerCase());
  }
  var d = e({
    script: !1,
    style: !1,
    textarea: !0,
    title: !0
  });
  function f(R) {
    var O = R.toLowerCase();
    return t(d, O) && !d[O];
  }
  function g(R) {
    var O = R.toLowerCase();
    return t(d, O) && d[O];
  }
  function h(R) {
    return R === A.HTML;
  }
  function E(R) {
    return h(R) || R === A.XML_XHTML_APPLICATION;
  }
  var A = e({
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
  }), b = Object.keys(A).map(function(R) {
    return A[R];
  });
  function v(R) {
    return b.indexOf(R) > -1;
  }
  var F = e({
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
  return xe.assign = n, xe.find = r, xe.freeze = e, xe.HTML_BOOLEAN_ATTRIBUTES = o, xe.HTML_RAW_TEXT_ELEMENTS = d, xe.HTML_VOID_ELEMENTS = l, xe.hasDefaultHTMLNamespace = E, xe.hasOwn = t, xe.isHTMLBooleanAttribute = a, xe.isHTMLRawTextElement = f, xe.isHTMLEscapableRawTextElement = g, xe.isHTMLMimeType = h, xe.isHTMLVoidElement = p, xe.isValidMimeType = v, xe.MIME_TYPE = A, xe.NAMESPACE = F, xe;
}
var Pt = {}, Br;
function ar() {
  if (Br) return Pt;
  Br = 1;
  var r = Ut();
  function e(E, A) {
    E.prototype = Object.create(Error.prototype, {
      constructor: { value: E },
      name: { value: E.name, enumerable: !0, writable: A }
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
  function o(E) {
    return typeof E == "number" && E >= 1 && E <= 25;
  }
  function a(E) {
    return typeof E == "string" && E.substring(E.length - t.Error.length) === t.Error;
  }
  function l(E, A) {
    o(E) ? (this.name = n[E], this.message = A || "") : (this.message = E, this.name = a(A) ? A : t.Error), Error.captureStackTrace && Error.captureStackTrace(this, l);
  }
  e(l, !0), Object.defineProperties(l.prototype, {
    code: {
      enumerable: !0,
      get: function() {
        var E = n.indexOf(this.name);
        return o(E) ? E : 0;
      }
    }
  });
  for (var p = {
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
  }, d = Object.entries(p), f = 0; f < d.length; f++) {
    var g = d[f][0];
    l[g] = d[f][1];
  }
  function h(E, A) {
    this.message = E, this.locator = A, Error.captureStackTrace && Error.captureStackTrace(this, h);
  }
  return e(h), Pt.DOMException = l, Pt.DOMExceptionName = t, Pt.ExceptionCode = p, Pt.ParseError = h, Pt;
}
var Ae = {}, W = {}, Fr;
function In() {
  if (Fr) return W;
  Fr = 1;
  function r(Ee) {
    try {
      typeof Ee != "function" && (Ee = RegExp);
      var Ne = new Ee("𝌆", "u").exec("𝌆");
      return !!Ne && Ne[0].length === 2;
    } catch {
    }
    return !1;
  }
  var e = r();
  function t(Ee) {
    if (Ee.source[0] !== "[")
      throw new Error(Ee + " can not be used with chars");
    return Ee.source.slice(1, Ee.source.lastIndexOf("]"));
  }
  function n(Ee, Ne) {
    if (Ee.source[0] !== "[")
      throw new Error("/" + Ee.source + "/ can not be used with chars_without");
    if (!Ne || typeof Ne != "string")
      throw new Error(JSON.stringify(Ne) + " is not a valid search");
    if (Ee.source.indexOf(Ne) === -1)
      throw new Error('"' + Ne + '" is not is /' + Ee.source + "/");
    if (Ne === "-" && Ee.source.indexOf(Ne) !== 1)
      throw new Error('"' + Ne + '" is not at the first postion of /' + Ee.source + "/");
    return new RegExp(Ee.source.replace(Ne, ""), e ? "u" : "");
  }
  function o(Ee) {
    var Ne = this;
    return new RegExp(
      Array.prototype.slice.call(arguments).map(function(le) {
        var Le = typeof le == "string";
        if (Le && Ne === void 0 && le === "|")
          throw new Error("use regg instead of reg to wrap expressions with `|`!");
        return Le ? le : le.source;
      }).join(""),
      e ? "mu" : "m"
    );
  }
  function a(Ee) {
    if (arguments.length === 0)
      throw new Error("no parameters provided");
    return o.apply(a, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var l = "�", p = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  e && (p = o("[", t(p), "\\u{10000}-\\u{10FFFF}", "]"));
  var d = /[\x20\x09\x0D\x0A]/, f = t(d), g = o(d, "+"), h = o(d, "*"), E = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  e && (E = o("[", t(E), "\\u{10000}-\\u{10FFFF}", "]"));
  var A = t(E), b = o("[", A, t(/[-.0-9\xB7]/), t(/[\u0300-\u036F\u203F-\u2040]/), "]"), v = o(E, b, "*"), F = o(b, "+"), R = o("&", v, ";"), O = a(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), V = a(R, "|", O), G = o("%", v, ";"), he = a(
    o('"', a(/[^%&"]/, "|", G, "|", V), "*", '"'),
    "|",
    o("'", a(/[^%&']/, "|", G, "|", V), "*", "'")
  ), T = a('"', a(/[^<&"]/, "|", V), "*", '"', "|", "'", a(/[^<&']/, "|", V), "*", "'"), U = n(E, ":"), z = n(b, ":"), Z = o(U, z, "*"), ae = o(Z, a(":", Z), "?"), Q = o("^", ae, "$"), Be = o("(", ae, ")"), ce = a(/"[^"]*"|'[^']*'/), Ge = o(/^<\?/, "(", v, ")", a(g, "(", p, "*?)"), "?", /\?>/), y = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, S = a('"', y, '*"', "|", "'", n(y, "'"), "*'"), _ = "<!--", M = "-->", q = o(_, a(n(p, "-"), "|", o("-", n(p, "-"))), "*", M), C = "#PCDATA", I = a(
    o(/\(/, h, C, a(h, /\|/, h, ae), "*", h, /\)\*/),
    "|",
    o(/\(/, h, C, h, /\)/)
  ), ee = /[?*+]?/, x = o(
    /\([^>]+\)/,
    ee
    /*regg(choice, '|', seq), _children_quantity*/
  ), k = a("EMPTY", "|", "ANY", "|", I, "|", x), w = "<!ELEMENT", j = o(w, g, a(ae, "|", G), g, a(k, "|", G), h, ">"), Y = o("NOTATION", g, /\(/, h, v, a(h, /\|/, h, v), "*", h, /\)/), me = o(/\(/, h, F, a(h, /\|/, h, F), "*", h, /\)/), Fe = a(Y, "|", me), Se = a(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", Fe), ve = a(/#REQUIRED|#IMPLIED/, "|", a(a("#FIXED", g), "?", T)), $ = a(g, v, g, Se, g, ve), Ue = "<!ATTLIST", qe = o(Ue, g, v, $, "*", h, ">"), de = "about:legacy-compat", Ze = a('"' + de + '"', "|", "'" + de + "'"), Je = "SYSTEM", De = "PUBLIC", Xe = a(a(Je, g, ce), "|", a(De, g, S, g, ce)), et = o(
    "^",
    a(
      a(Je, g, "(?<SystemLiteralOnly>", ce, ")"),
      "|",
      a(De, g, "(?<PubidLiteral>", S, ")", g, "(?<SystemLiteral>", ce, ")")
    )
  ), ct = a(g, "NDATA", g, v), _e = a(he, "|", a(Xe, ct, "?")), se = "<!ENTITY", tt = o(se, g, v, g, _e, h, ">"), ge = a(he, "|", Xe), Ye = o(se, g, "%", g, v, g, ge, h, ">"), rt = a(tt, "|", Ye), ft = o(De, g, S), pt = o("<!NOTATION", g, v, g, a(Xe, "|", ft), h, ">"), J = o(h, "=", h), ue = /1[.]\d+/, ke = o(g, "version", J, a("'", ue, "'", "|", '"', ue, '"')), Te = /[A-Za-z][-A-Za-z0-9._]*/, nt = a(g, "encoding", J, a('"', Te, '"', "|", "'", Te, "'")), Pe = a(g, "standalone", J, a("'", a("yes", "|", "no"), "'", "|", '"', a("yes", "|", "no"), '"')), We = o(/^<\?xml/, ke, nt, "?", Pe, "?", h, /\?>/), ht = "<!DOCTYPE", Et = "<![CDATA[", Ct = "]]>", st = /<!\[CDATA\[/, it = /\]\]>/, Dt = o(p, "*?", it), dt = o(st, Dt);
  return W.chars = t, W.chars_without = n, W.detectUnicodeSupport = r, W.reg = o, W.regg = a, W.ABOUT_LEGACY_COMPAT = de, W.ABOUT_LEGACY_COMPAT_SystemLiteral = Ze, W.AttlistDecl = qe, W.CDATA_START = Et, W.CDATA_END = Ct, W.CDSect = dt, W.Char = p, W.Comment = q, W.COMMENT_START = _, W.COMMENT_END = M, W.DOCTYPE_DECL_START = ht, W.elementdecl = j, W.EntityDecl = rt, W.EntityValue = he, W.ExternalID = Xe, W.ExternalID_match = et, W.Name = v, W.NotationDecl = pt, W.Reference = V, W.PEReference = G, W.PI = Ge, W.PUBLIC = De, W.PubidLiteral = S, W.QName = ae, W.QName_exact = Q, W.QName_group = Be, W.S = g, W.SChar_s = f, W.S_OPT = h, W.SYSTEM = Je, W.SystemLiteral = ce, W.UNICODE_REPLACEMENT_CHARACTER = l, W.UNICODE_SUPPORT = e, W.XMLDecl = We, W;
}
var Ur;
function xn() {
  if (Ur) return Ae;
  Ur = 1;
  var r = Ut(), e = r.find, t = r.hasDefaultHTMLNamespace, n = r.hasOwn, o = r.isHTMLMimeType, a = r.isHTMLRawTextElement, l = r.isHTMLVoidElement, p = r.MIME_TYPE, d = r.NAMESPACE, f = Symbol(), g = ar(), h = g.DOMException, E = g.DOMExceptionName, A = In();
  function b(i) {
    if (i !== f)
      throw new TypeError("Illegal constructor");
  }
  function v(i) {
    return i !== "";
  }
  function F(i) {
    return i ? i.split(/[\t\n\f\r ]+/).filter(v) : [];
  }
  function R(i, s) {
    return n(i, s) || (i[s] = !0), i;
  }
  function O(i) {
    if (!i) return [];
    var s = F(i);
    return Object.keys(s.reduce(R, {}));
  }
  function V(i) {
    return function(s) {
      return i && i.indexOf(s) !== -1;
    };
  }
  function G(i) {
    if (!A.QName_exact.test(i))
      throw new h(h.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + i + '"');
  }
  function he(i, s) {
    G(s), i = i || null;
    var u = null, m = s;
    if (s.indexOf(":") >= 0) {
      var D = s.split(":");
      u = D[0], m = D[1];
    }
    if (u !== null && i === null)
      throw new h(h.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    if (u === "xml" && i !== r.NAMESPACE.XML)
      throw new h(h.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    if ((u === "xmlns" || s === "xmlns") && i !== r.NAMESPACE.XMLNS)
      throw new h(
        h.NAMESPACE_ERR,
        'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
      );
    if (i === r.NAMESPACE.XMLNS && u !== "xmlns" && s !== "xmlns")
      throw new h(
        h.NAMESPACE_ERR,
        'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
      );
    return [i, u, m];
  }
  function T(i, s) {
    for (var u in i)
      n(i, u) && (s[u] = i[u]);
  }
  function U(i, s) {
    var u = i.prototype;
    if (!(u instanceof s)) {
      let m = function() {
      };
      m.prototype = s.prototype, m = new m(), T(u, m), i.prototype = u = m;
    }
    u.constructor != i && (typeof i != "function" && console.error("unknown Class:" + i), u.constructor = i);
  }
  var z = {}, Z = z.ELEMENT_NODE = 1, ae = z.ATTRIBUTE_NODE = 2, Q = z.TEXT_NODE = 3, Be = z.CDATA_SECTION_NODE = 4, ce = z.ENTITY_REFERENCE_NODE = 5, Ge = z.ENTITY_NODE = 6, y = z.PROCESSING_INSTRUCTION_NODE = 7, S = z.COMMENT_NODE = 8, _ = z.DOCUMENT_NODE = 9, M = z.DOCUMENT_TYPE_NODE = 10, q = z.DOCUMENT_FRAGMENT_NODE = 11, C = z.NOTATION_NODE = 12, I = r.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function ee(i, s) {
    if (s.length < i.length) return ee(s, i);
    var u = null;
    for (var m in i) {
      if (i[m] !== s[m]) return u;
      u = i[m];
    }
    return u;
  }
  function x(i) {
    return i.guid || (i.guid = Math.random()), i.guid;
  }
  function k() {
  }
  k.prototype = {
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
      for (var s = [], u = 0; u < this.length; u++)
        Le(this[u], s, i);
      return s.join("");
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
  }, k.prototype[Symbol.iterator] = function() {
    var i = this, s = 0;
    return {
      next: function() {
        return s < i.length ? {
          value: i[s++],
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
  function w(i, s) {
    this._node = i, this._refresh = s, j(this);
  }
  function j(i) {
    var s = i._node._inc || i._node.ownerDocument._inc;
    if (i._inc !== s) {
      var u = i._refresh(i._node);
      if (Rt(i, "length", u.length), !i.$$length || u.length < i.$$length)
        for (var m = u.length; m in i; m++)
          n(i, m) && delete i[m];
      T(u, i), i._inc = s;
    }
  }
  w.prototype.item = function(i) {
    return j(this), this[i] || null;
  }, U(w, k);
  function Y() {
  }
  function me(i, s) {
    for (var u = 0; u < i.length; ) {
      if (i[u] === s)
        return u;
      u++;
    }
  }
  function Fe(i, s, u, m) {
    if (m ? s[me(s, m)] = u : (s[s.length] = u, s.length++), i) {
      u.ownerElement = i;
      var D = i.ownerDocument;
      D && (m && Je(D, i, m), Ze(D, i, u));
    }
  }
  function Se(i, s, u) {
    var m = me(s, u);
    if (m >= 0) {
      for (var D = s.length - 1; m <= D; )
        s[m] = s[++m];
      if (s.length = D, i) {
        var P = i.ownerDocument;
        P && Je(P, i, u), u.ownerElement = null;
      }
    }
  }
  Y.prototype = {
    length: 0,
    item: k.prototype.item,
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
      for (var s = 0; s < this.length; ) {
        var u = this[s];
        if (u.nodeName === i)
          return u;
        s++;
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
      var s = i.ownerElement;
      if (s && s !== this._ownerElement)
        throw new h(h.INUSE_ATTRIBUTE_ERR);
      var u = this.getNamedItemNS(i.namespaceURI, i.localName);
      return u === i ? i : (Fe(this._ownerElement, this, i, u), u);
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
      var s = this.getNamedItem(i);
      if (!s)
        throw new h(h.NOT_FOUND_ERR, i);
      return Se(this._ownerElement, this, s), s;
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
    removeNamedItemNS: function(i, s) {
      var u = this.getNamedItemNS(i, s);
      if (!u)
        throw new h(h.NOT_FOUND_ERR, i ? i + " : " + s : s);
      return Se(this._ownerElement, this, u), u;
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
    getNamedItemNS: function(i, s) {
      i || (i = null);
      for (var u = 0; u < this.length; ) {
        var m = this[u];
        if (m.localName === s && m.namespaceURI === i)
          return m;
        u++;
      }
      return null;
    }
  }, Y.prototype[Symbol.iterator] = function() {
    var i = this, s = 0;
    return {
      next: function() {
        return s < i.length ? {
          value: i[s++],
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
  function ve() {
  }
  ve.prototype = {
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
    hasFeature: function(i, s) {
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
    createDocument: function(i, s, u) {
      var m = p.XML_APPLICATION;
      i === d.HTML ? m = p.XML_XHTML_APPLICATION : i === d.SVG && (m = p.XML_SVG_IMAGE);
      var D = new de(f, { contentType: m });
      if (D.implementation = this, D.childNodes = new k(), D.doctype = u || null, u && D.appendChild(u), s) {
        var P = D.createElementNS(i, s);
        D.appendChild(P);
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
    createDocumentType: function(i, s, u, m) {
      G(i);
      var D = new ht(f);
      return D.name = i, D.nodeName = i, D.publicId = s || "", D.systemId = u || "", D.internalSubset = m || "", D.childNodes = new k(), D;
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
      var s = new de(f, { contentType: p.HTML });
      if (s.implementation = this, s.childNodes = new k(), i !== !1) {
        s.doctype = this.createDocumentType("html"), s.doctype.ownerDocument = s, s.appendChild(s.doctype);
        var u = s.createElement("html");
        s.appendChild(u);
        var m = s.createElement("head");
        if (u.appendChild(m), typeof i == "string") {
          var D = s.createElement("title");
          D.appendChild(s.createTextNode(i)), m.appendChild(D);
        }
        u.appendChild(s.createElement("body"));
      }
      return s;
    }
  };
  function $(i) {
    b(i);
  }
  $.prototype = {
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
      var s = i;
      do {
        if (this === s) return !0;
        s = i.parentNode;
      } while (s);
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
      var s = this;
      do {
        if (!s.parentNode)
          return s;
        s = s.parentNode;
      } while (s);
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
          for (var s = 0; s < this.attributes.length; s++) {
            var u = this.attributes.item(s);
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
      for (var s = 0; s < this.childNodes.length; s++)
        if (!this.childNodes[s].isEqualNode(i.childNodes[s]))
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
    insertBefore: function(i, s) {
      return J(this, i, s);
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
    replaceChild: function(i, s) {
      J(this, i, s, pt), s && this.removeChild(s);
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
      return Xe(this, i);
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
      return kt(this.ownerDocument || this, this, i);
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
        var s = i.nextSibling;
        s && s.nodeType == Q && i.nodeType == Q ? (this.removeChild(s), i.appendData(s.data)) : (i.normalize(), i = s);
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
    isSupported: function(i, s) {
      return this.ownerDocument.implementation.hasFeature(i, s);
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
      for (var s = this; s; ) {
        var u = s._nsMap;
        if (u) {
          for (var m in u)
            if (n(u, m) && u[m] === i)
              return m;
        }
        s = s.nodeType == ae ? s.ownerDocument : s.parentNode;
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
      for (var s = this; s; ) {
        var u = s._nsMap;
        if (u && n(u, i))
          return u[i];
        s = s.nodeType == ae ? s.ownerDocument : s.parentNode;
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
      var s = this.lookupPrefix(i);
      return s == null;
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
      var s = i, u = this, m = null, D = null;
      if (s instanceof ke && (m = s, s = m.ownerElement), u instanceof ke && (D = u, u = D.ownerElement, m && s && u === s))
        for (var P = 0, re; re = u.attributes[P]; P++) {
          if (re === m)
            return I.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + I.DOCUMENT_POSITION_PRECEDING;
          if (re === D)
            return I.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + I.DOCUMENT_POSITION_FOLLOWING;
        }
      if (!s || !u || u.ownerDocument !== s.ownerDocument)
        return I.DOCUMENT_POSITION_DISCONNECTED + I.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (x(u.ownerDocument) > x(s.ownerDocument) ? I.DOCUMENT_POSITION_FOLLOWING : I.DOCUMENT_POSITION_PRECEDING);
      if (D && s === u)
        return I.DOCUMENT_POSITION_CONTAINS + I.DOCUMENT_POSITION_PRECEDING;
      if (m && s === u)
        return I.DOCUMENT_POSITION_CONTAINED_BY + I.DOCUMENT_POSITION_FOLLOWING;
      for (var be = [], Ce = s.parentNode; Ce; ) {
        if (!D && Ce === u)
          return I.DOCUMENT_POSITION_CONTAINED_BY + I.DOCUMENT_POSITION_FOLLOWING;
        be.push(Ce), Ce = Ce.parentNode;
      }
      be.reverse();
      for (var ye = [], Ie = u.parentNode; Ie; ) {
        if (!m && Ie === s)
          return I.DOCUMENT_POSITION_CONTAINS + I.DOCUMENT_POSITION_PRECEDING;
        ye.push(Ie), Ie = Ie.parentNode;
      }
      ye.reverse();
      var mt = ee(be, ye);
      for (var ot in mt.childNodes) {
        var $e = mt.childNodes[ot];
        if ($e === u) return I.DOCUMENT_POSITION_FOLLOWING;
        if ($e === s) return I.DOCUMENT_POSITION_PRECEDING;
        if (ye.indexOf($e) >= 0) return I.DOCUMENT_POSITION_FOLLOWING;
        if (be.indexOf($e) >= 0) return I.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function Ue(i) {
    return i == "<" && "&lt;" || i == ">" && "&gt;" || i == "&" && "&amp;" || i == '"' && "&quot;" || "&#" + i.charCodeAt() + ";";
  }
  T(z, $), T(z, $.prototype), T(I, $), T(I, $.prototype);
  function qe(i, s) {
    if (s(i))
      return !0;
    if (i = i.firstChild)
      do
        if (qe(i, s))
          return !0;
      while (i = i.nextSibling);
  }
  function de(i, s) {
    b(i);
    var u = s || {};
    this.ownerDocument = this, this.contentType = u.contentType || p.XML_APPLICATION, this.type = o(this.contentType) ? "html" : "xml";
  }
  function Ze(i, s, u) {
    i && i._inc++;
    var m = u.namespaceURI;
    m === d.XMLNS && (s._nsMap[u.prefix ? u.localName : ""] = u.value);
  }
  function Je(i, s, u, m) {
    i && i._inc++;
    var D = u.namespaceURI;
    D === d.XMLNS && delete s._nsMap[u.prefix ? u.localName : ""];
  }
  function De(i, s, u) {
    if (i && i._inc) {
      i._inc++;
      var m = s.childNodes;
      if (u && !u.nextSibling)
        m[m.length++] = u;
      else {
        for (var D = s.firstChild, P = 0; D; )
          m[P++] = D, D = D.nextSibling;
        m.length = P, delete m[m.length];
      }
    }
  }
  function Xe(i, s) {
    if (i !== s.parentNode)
      throw new h(h.NOT_FOUND_ERR, "child's parent is not parent");
    var u = s.previousSibling, m = s.nextSibling;
    return u ? u.nextSibling = m : i.firstChild = m, m ? m.previousSibling = u : i.lastChild = u, De(i.ownerDocument, i), s.parentNode = null, s.previousSibling = null, s.nextSibling = null, s;
  }
  function et(i) {
    return i && (i.nodeType === $.DOCUMENT_NODE || i.nodeType === $.DOCUMENT_FRAGMENT_NODE || i.nodeType === $.ELEMENT_NODE);
  }
  function ct(i) {
    return i && (i.nodeType === $.CDATA_SECTION_NODE || i.nodeType === $.COMMENT_NODE || i.nodeType === $.DOCUMENT_FRAGMENT_NODE || i.nodeType === $.DOCUMENT_TYPE_NODE || i.nodeType === $.ELEMENT_NODE || i.nodeType === $.PROCESSING_INSTRUCTION_NODE || i.nodeType === $.TEXT_NODE);
  }
  function _e(i) {
    return i && i.nodeType === $.DOCUMENT_TYPE_NODE;
  }
  function se(i) {
    return i && i.nodeType === $.ELEMENT_NODE;
  }
  function tt(i) {
    return i && i.nodeType === $.TEXT_NODE;
  }
  function ge(i, s) {
    var u = i.childNodes || [];
    if (e(u, se) || _e(s))
      return !1;
    var m = e(u, _e);
    return !(s && m && u.indexOf(m) > u.indexOf(s));
  }
  function Ye(i, s) {
    var u = i.childNodes || [];
    function m(P) {
      return se(P) && P !== s;
    }
    if (e(u, m))
      return !1;
    var D = e(u, _e);
    return !(s && D && u.indexOf(D) > u.indexOf(s));
  }
  function rt(i, s, u) {
    if (!et(i))
      throw new h(h.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + i.nodeType);
    if (u && u.parentNode !== i)
      throw new h(h.NOT_FOUND_ERR, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !ct(s) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      _e(s) && i.nodeType !== $.DOCUMENT_NODE
    )
      throw new h(
        h.HIERARCHY_REQUEST_ERR,
        "Unexpected node type " + s.nodeType + " for parent node type " + i.nodeType
      );
  }
  function ft(i, s, u) {
    var m = i.childNodes || [], D = s.childNodes || [];
    if (s.nodeType === $.DOCUMENT_FRAGMENT_NODE) {
      var P = D.filter(se);
      if (P.length > 1 || e(D, tt))
        throw new h(h.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (P.length === 1 && !ge(i, u))
        throw new h(h.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (se(s) && !ge(i, u))
      throw new h(h.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (_e(s)) {
      if (e(m, _e))
        throw new h(h.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var re = e(m, se);
      if (u && m.indexOf(re) < m.indexOf(u))
        throw new h(h.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      if (!u && re)
        throw new h(h.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
  function pt(i, s, u) {
    var m = i.childNodes || [], D = s.childNodes || [];
    if (s.nodeType === $.DOCUMENT_FRAGMENT_NODE) {
      var P = D.filter(se);
      if (P.length > 1 || e(D, tt))
        throw new h(h.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (P.length === 1 && !Ye(i, u))
        throw new h(h.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (se(s) && !Ye(i, u))
      throw new h(h.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (_e(s)) {
      if (e(m, function(Ce) {
        return _e(Ce) && Ce !== u;
      }))
        throw new h(h.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var re = e(m, se);
      if (u && m.indexOf(re) < m.indexOf(u))
        throw new h(h.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
  function J(i, s, u, m) {
    rt(i, s, u), i.nodeType === $.DOCUMENT_NODE && (m || ft)(i, s, u);
    var D = s.parentNode;
    if (D && D.removeChild(s), s.nodeType === q) {
      var P = s.firstChild;
      if (P == null)
        return s;
      var re = s.lastChild;
    } else
      P = re = s;
    var be = u ? u.previousSibling : i.lastChild;
    P.previousSibling = be, re.nextSibling = u, be ? be.nextSibling = P : i.firstChild = P, u == null ? i.lastChild = re : u.previousSibling = re;
    do
      P.parentNode = i;
    while (P !== re && (P = P.nextSibling));
    return De(i.ownerDocument || i, i, s), s.nodeType == q && (s.firstChild = s.lastChild = null), s;
  }
  de.prototype = {
    /**
     * The implementation that created this document.
     *
     * @type DOMImplementation
     * @readonly
     */
    implementation: null,
    nodeName: "#document",
    nodeType: _,
    /**
     * The DocumentType node of the document.
     *
     * @type DocumentType
     * @readonly
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(i, s) {
      if (i.nodeType === q) {
        for (var u = i.firstChild; u; ) {
          var m = u.nextSibling;
          this.insertBefore(u, s), u = m;
        }
        return i;
      }
      return J(this, i, s), i.ownerDocument = this, this.documentElement === null && i.nodeType === Z && (this.documentElement = i), i;
    },
    removeChild: function(i) {
      var s = Xe(this, i);
      return s === this.documentElement && (this.documentElement = null), s;
    },
    replaceChild: function(i, s) {
      J(this, i, s, pt), i.ownerDocument = this, s && this.removeChild(s), se(i) && (this.documentElement = i);
    },
    // Introduced in DOM Level 2:
    importNode: function(i, s) {
      return Zt(this, i, s);
    },
    // Introduced in DOM Level 2:
    getElementById: function(i) {
      var s = null;
      return qe(this.documentElement, function(u) {
        if (u.nodeType == Z && u.getAttribute("id") == i)
          return s = u, !0;
      }), s;
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
      var s = new ue(f);
      s.ownerDocument = this, this.type === "html" && (i = i.toLowerCase()), t(this.contentType) && (s.namespaceURI = d.HTML), s.nodeName = i, s.tagName = i, s.localName = i, s.childNodes = new k();
      var u = s.attributes = new Y();
      return u._ownerElement = s, s;
    },
    /**
     * @returns {DocumentFragment}
     */
    createDocumentFragment: function() {
      var i = new it(f);
      return i.ownerDocument = this, i.childNodes = new k(), i;
    },
    /**
     * @param {string} data
     * @returns {Text}
     */
    createTextNode: function(i) {
      var s = new nt(f);
      return s.ownerDocument = this, s.childNodes = new k(), s.appendData(i), s;
    },
    /**
     * @param {string} data
     * @returns {Comment}
     */
    createComment: function(i) {
      var s = new Pe(f);
      return s.ownerDocument = this, s.childNodes = new k(), s.appendData(i), s;
    },
    /**
     * @param {string} data
     * @returns {CDATASection}
     */
    createCDATASection: function(i) {
      var s = new We(f);
      return s.ownerDocument = this, s.childNodes = new k(), s.appendData(i), s;
    },
    /**
     * @param {string} target
     * @param {string} data
     * @returns {ProcessingInstruction}
     */
    createProcessingInstruction: function(i, s) {
      var u = new Dt(f);
      return u.ownerDocument = this, u.childNodes = new k(), u.nodeName = u.target = i, u.nodeValue = u.data = s, u;
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
      if (!A.QName_exact.test(i))
        throw new h(h.INVALID_CHARACTER_ERR, 'invalid character in name "' + i + '"');
      return this.type === "html" && (i = i.toLowerCase()), this._createAttribute(i);
    },
    _createAttribute: function(i) {
      var s = new ke(f);
      return s.ownerDocument = this, s.childNodes = new k(), s.name = i, s.nodeName = i, s.localName = i, s.specified = !0, s;
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
      if (!A.Name.test(i))
        throw new h(h.INVALID_CHARACTER_ERR, 'not a valid xml name "' + i + '"');
      if (this.type === "html")
        throw new h("document is an html document", E.NotSupportedError);
      var s = new st(f);
      return s.ownerDocument = this, s.childNodes = new k(), s.nodeName = i, s;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Element}
     */
    createElementNS: function(i, s) {
      var u = he(i, s), m = new ue(f), D = m.attributes = new Y();
      return m.childNodes = new k(), m.ownerDocument = this, m.nodeName = s, m.tagName = s, m.namespaceURI = u[0], m.prefix = u[1], m.localName = u[2], D._ownerElement = m, m;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Attr}
     */
    createAttributeNS: function(i, s) {
      var u = he(i, s), m = new ke(f);
      return m.ownerDocument = this, m.childNodes = new k(), m.nodeName = s, m.name = s, m.specified = !0, m.namespaceURI = u[0], m.prefix = u[1], m.localName = u[2], m;
    }
  }, U(de, $);
  function ue(i) {
    b(i), this._nsMap = /* @__PURE__ */ Object.create(null);
  }
  ue.prototype = {
    nodeType: Z,
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
      return this.ownerDocument.type === "html" && this.namespaceURI === d.HTML;
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
      var s = this.getAttributeNode(i);
      return s ? s.value : null;
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
    setAttribute: function(i, s) {
      this._isInHTMLDocumentAndNamespace() && (i = i.toLowerCase());
      var u = this.getAttributeNode(i);
      u ? u.value = u.nodeValue = "" + s : (u = this.ownerDocument._createAttribute(i), u.value = u.nodeValue = "" + s, this.setAttributeNode(u));
    },
    removeAttribute: function(i) {
      var s = this.getAttributeNode(i);
      s && this.removeAttributeNode(s);
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
    removeAttributeNS: function(i, s) {
      var u = this.getAttributeNodeNS(i, s);
      u && this.removeAttributeNode(u);
    },
    hasAttributeNS: function(i, s) {
      return this.getAttributeNodeNS(i, s) != null;
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
    getAttributeNS: function(i, s) {
      var u = this.getAttributeNodeNS(i, s);
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
    setAttributeNS: function(i, s, u) {
      var m = he(i, s), D = m[2], P = this.getAttributeNodeNS(i, D);
      P ? P.value = P.nodeValue = "" + u : (P = this.ownerDocument.createAttributeNS(i, s), P.value = P.nodeValue = "" + u, this.setAttributeNode(P));
    },
    getAttributeNodeNS: function(i, s) {
      return this.attributes.getNamedItemNS(i, s);
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
      var s = O(i);
      return new w(this, function(u) {
        var m = [];
        return s.length > 0 && qe(u, function(D) {
          if (D !== u && D.nodeType === Z) {
            var P = D.getAttribute("class");
            if (P) {
              var re = i === P;
              if (!re) {
                var be = O(P);
                re = s.every(V(be));
              }
              re && m.push(D);
            }
          }
        }), m;
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
      var s = (this.nodeType === _ ? this : this.ownerDocument).type === "html", u = i.toLowerCase();
      return new w(this, function(m) {
        var D = [];
        return qe(m, function(P) {
          if (!(P === m || P.nodeType !== Z))
            if (i === "*")
              D.push(P);
            else {
              var re = P.getQualifiedName(), be = s && P.namespaceURI === d.HTML ? u : i;
              re === be && D.push(P);
            }
        }), D;
      });
    },
    getElementsByTagNameNS: function(i, s) {
      return new w(this, function(u) {
        var m = [];
        return qe(u, function(D) {
          D !== u && D.nodeType === Z && (i === "*" || D.namespaceURI === i) && (s === "*" || D.localName == s) && m.push(D);
        }), m;
      });
    }
  }, de.prototype.getElementsByClassName = ue.prototype.getElementsByClassName, de.prototype.getElementsByTagName = ue.prototype.getElementsByTagName, de.prototype.getElementsByTagNameNS = ue.prototype.getElementsByTagNameNS, U(ue, $);
  function ke(i) {
    b(i), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
  }
  ke.prototype.nodeType = ae, U(ke, $);
  function Te(i) {
    b(i);
  }
  Te.prototype = {
    data: "",
    substringData: function(i, s) {
      return this.data.substring(i, i + s);
    },
    appendData: function(i) {
      i = this.data + i, this.nodeValue = this.data = i, this.length = i.length;
    },
    insertData: function(i, s) {
      this.replaceData(i, 0, s);
    },
    deleteData: function(i, s) {
      this.replaceData(i, s, "");
    },
    replaceData: function(i, s, u) {
      var m = this.data.substring(0, i), D = this.data.substring(i + s);
      u = m + u + D, this.nodeValue = this.data = u, this.length = u.length;
    }
  }, U(Te, $);
  function nt(i) {
    b(i);
  }
  nt.prototype = {
    nodeName: "#text",
    nodeType: Q,
    splitText: function(i) {
      var s = this.data, u = s.substring(i);
      s = s.substring(0, i), this.data = this.nodeValue = s, this.length = s.length;
      var m = this.ownerDocument.createTextNode(u);
      return this.parentNode && this.parentNode.insertBefore(m, this.nextSibling), m;
    }
  }, U(nt, Te);
  function Pe(i) {
    b(i);
  }
  Pe.prototype = {
    nodeName: "#comment",
    nodeType: S
  }, U(Pe, Te);
  function We(i) {
    b(i);
  }
  We.prototype = {
    nodeName: "#cdata-section",
    nodeType: Be
  }, U(We, nt);
  function ht(i) {
    b(i);
  }
  ht.prototype.nodeType = M, U(ht, $);
  function Et(i) {
    b(i);
  }
  Et.prototype.nodeType = C, U(Et, $);
  function Ct(i) {
    b(i);
  }
  Ct.prototype.nodeType = Ge, U(Ct, $);
  function st(i) {
    b(i);
  }
  st.prototype.nodeType = ce, U(st, $);
  function it(i) {
    b(i);
  }
  it.prototype.nodeName = "#document-fragment", it.prototype.nodeType = q, U(it, $);
  function Dt(i) {
    b(i);
  }
  Dt.prototype.nodeType = y, U(Dt, Te);
  function dt() {
  }
  dt.prototype.serializeToString = function(i, s) {
    return Ee.call(i, s);
  }, $.prototype.toString = Ee;
  function Ee(i) {
    var s = [], u = this.nodeType === _ && this.documentElement || this, m = u.prefix, D = u.namespaceURI;
    if (D && m == null) {
      var m = u.lookupPrefix(D);
      if (m == null)
        var P = [
          { namespace: D, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return Le(this, s, i, P), s.join("");
  }
  function Ne(i, s, u) {
    var m = i.prefix || "", D = i.namespaceURI;
    if (!D || m === "xml" && D === d.XML || D === d.XMLNS)
      return !1;
    for (var P = u.length; P--; ) {
      var re = u[P];
      if (re.prefix === m)
        return re.namespace !== D;
    }
    return !0;
  }
  function le(i, s, u) {
    i.push(" ", s, '="', u.replace(/[<>&"\t\n\r]/g, Ue), '"');
  }
  function Le(i, s, u, m) {
    m || (m = []);
    var D = i.nodeType === _ ? i : i.ownerDocument, P = D.type === "html";
    if (u)
      if (i = u(i), i) {
        if (typeof i == "string") {
          s.push(i);
          return;
        }
      } else
        return;
    switch (i.nodeType) {
      case Z:
        var re = i.attributes, be = re.length, K = i.firstChild, Ce = i.tagName, ye = Ce;
        if (!P && !i.prefix && i.namespaceURI) {
          for (var Ie, mt = 0; mt < re.length; mt++)
            if (re.item(mt).name === "xmlns") {
              Ie = re.item(mt).value;
              break;
            }
          if (!Ie)
            for (var ot = m.length - 1; ot >= 0; ot--) {
              var $e = m[ot];
              if ($e.prefix === "" && $e.namespace === i.namespaceURI) {
                Ie = $e.namespace;
                break;
              }
            }
          if (Ie !== i.namespaceURI)
            for (var ot = m.length - 1; ot >= 0; ot--) {
              var $e = m[ot];
              if ($e.namespace === i.namespaceURI) {
                $e.prefix && (ye = $e.prefix + ":" + Ce);
                break;
              }
            }
        }
        s.push("<", ye);
        for (var yt = 0; yt < be; yt++) {
          var L = re.item(yt);
          L.prefix == "xmlns" ? m.push({
            prefix: L.localName,
            namespace: L.value
          }) : L.nodeName == "xmlns" && m.push({ prefix: "", namespace: L.value });
        }
        for (var yt = 0; yt < be; yt++) {
          var L = re.item(yt);
          if (Ne(L, P, m)) {
            var c = L.prefix || "", N = L.namespaceURI;
            le(s, c ? "xmlns:" + c : "xmlns", N), m.push({ prefix: c, namespace: N });
          }
          Le(L, s, u, m);
        }
        if (Ce === ye && Ne(i, P, m)) {
          var c = i.prefix || "", N = i.namespaceURI;
          le(s, c ? "xmlns:" + c : "xmlns", N), m.push({ prefix: c, namespace: N });
        }
        var B = !K;
        if (B && (P || i.namespaceURI === d.HTML) && (B = l(Ce)), B)
          s.push("/>");
        else {
          if (s.push(">"), P && a(Ce))
            for (; K; )
              K.data ? s.push(K.data) : Le(K, s, u, m.slice()), K = K.nextSibling;
          else
            for (; K; )
              Le(K, s, u, m.slice()), K = K.nextSibling;
          s.push("</", ye, ">");
        }
        return;
      case _:
      case q:
        for (var K = i.firstChild; K; )
          Le(K, s, u, m.slice()), K = K.nextSibling;
        return;
      case ae:
        return le(s, i.name, i.value);
      case Q:
        return s.push(i.data.replace(/[<&>]/g, Ue));
      case Be:
        return s.push(A.CDATA_START, i.data, A.CDATA_END);
      case S:
        return s.push(A.COMMENT_START, i.data, A.COMMENT_END);
      case M:
        var we = i.publicId, fe = i.systemId;
        s.push(A.DOCTYPE_DECL_START, " ", i.name), we ? (s.push(" ", A.PUBLIC, " ", we), fe && fe !== "." && s.push(" ", fe)) : fe && fe !== "." && s.push(" ", A.SYSTEM, " ", fe), i.internalSubset && s.push(" [", i.internalSubset, "]"), s.push(">");
        return;
      case y:
        return s.push("<?", i.target, " ", i.data, "?>");
      case ce:
        return s.push("&", i.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        s.push("??", i.nodeName);
    }
  }
  function Zt(i, s, u) {
    var m;
    switch (s.nodeType) {
      case Z:
        m = s.cloneNode(!1), m.ownerDocument = i;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case q:
        break;
      case ae:
        u = !0;
        break;
    }
    if (m || (m = s.cloneNode(!1)), m.ownerDocument = i, m.parentNode = null, u)
      for (var D = s.firstChild; D; )
        m.appendChild(Zt(i, D, u)), D = D.nextSibling;
    return m;
  }
  function kt(i, s, u) {
    var m = new s.constructor(f);
    for (var D in s)
      if (n(s, D)) {
        var P = s[D];
        typeof P != "object" && P != m[D] && (m[D] = P);
      }
    switch (s.childNodes && (m.childNodes = new k()), m.ownerDocument = i, m.nodeType) {
      case Z:
        var re = s.attributes, be = m.attributes = new Y(), Ce = re.length;
        be._ownerElement = m;
        for (var ye = 0; ye < Ce; ye++)
          m.setAttributeNode(kt(i, re.item(ye), !0));
        break;
      case ae:
        u = !0;
    }
    if (u)
      for (var Ie = s.firstChild; Ie; )
        m.appendChild(kt(i, Ie, u)), Ie = Ie.nextSibling;
    return m;
  }
  function Rt(i, s, u) {
    i[s] = u;
  }
  try {
    if (Object.defineProperty) {
      let i = function(s) {
        switch (s.nodeType) {
          case Z:
          case q:
            var u = [];
            for (s = s.firstChild; s; )
              s.nodeType !== 7 && s.nodeType !== 8 && u.push(i(s)), s = s.nextSibling;
            return u.join("");
          default:
            return s.nodeValue;
        }
      };
      Object.defineProperty(w.prototype, "length", {
        get: function() {
          return j(this), this.$$length;
        }
      }), Object.defineProperty($.prototype, "textContent", {
        get: function() {
          return i(this);
        },
        set: function(s) {
          switch (this.nodeType) {
            case Z:
            case q:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (s || String(s)) && this.appendChild(this.ownerDocument.createTextNode(s));
              break;
            default:
              this.data = s, this.value = s, this.nodeValue = s;
          }
        }
      }), Rt = function(s, u, m) {
        s["$$" + u] = m;
      };
    }
  } catch {
  }
  return Ae._updateLiveList = j, Ae.Attr = ke, Ae.CDATASection = We, Ae.CharacterData = Te, Ae.Comment = Pe, Ae.Document = de, Ae.DocumentFragment = it, Ae.DocumentType = ht, Ae.DOMImplementation = ve, Ae.Element = ue, Ae.Entity = Ct, Ae.EntityReference = st, Ae.LiveNodeList = w, Ae.NamedNodeMap = Y, Ae.Node = $, Ae.NodeList = k, Ae.Notation = Et, Ae.Text = nt, Ae.ProcessingInstruction = Dt, Ae.XMLSerializer = dt, Ae;
}
var wt = {}, cr = {}, qr;
function Ei() {
  return qr || (qr = 1, function(r) {
    var e = Ut().freeze;
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
  }(cr)), cr;
}
var jt = {}, $r;
function yi() {
  if ($r) return jt;
  $r = 1;
  var r = Ut(), e = In(), t = ar(), n = r.isHTMLEscapableRawTextElement, o = r.isHTMLMimeType, a = r.isHTMLRawTextElement, l = r.hasOwn, p = r.NAMESPACE, d = t.ParseError, f = t.DOMException, g = 0, h = 1, E = 2, A = 3, b = 4, v = 5, F = 6, R = 7;
  function O() {
  }
  O.prototype = {
    parse: function(y, S, _) {
      var M = this.domBuilder;
      M.startDocument(), Z(S, S = /* @__PURE__ */ Object.create(null)), G(y, S, _, M, this.errorHandler), M.endDocument();
    }
  };
  var V = /&#?\w+;?/g;
  function G(y, S, _, M, q) {
    var C = o(M.mimeType);
    y.indexOf(e.UNICODE_REPLACEMENT_CHARACTER) >= 0 && q.warning("Unicode replacement character detected, source encoding issues?");
    function I(J) {
      if (J > 65535) {
        J -= 65536;
        var ue = 55296 + (J >> 10), ke = 56320 + (J & 1023);
        return String.fromCharCode(ue, ke);
      } else
        return String.fromCharCode(J);
    }
    function ee(J) {
      var ue = J[J.length - 1] === ";" ? J : J + ";";
      if (!C && ue !== J)
        return q.error("EntityRef: expecting ;"), J;
      var ke = e.Reference.exec(ue);
      if (!ke || ke[0].length !== ue.length)
        return q.error("entity not matching Reference production: " + J), J;
      var Te = ue.slice(1, -1);
      return l(_, Te) ? _[Te] : Te.charAt(0) === "#" ? I(parseInt(Te.substring(1).replace("x", "0x"))) : (q.error("entity not found:" + J), J);
    }
    function x(J) {
      if (J > ve) {
        var ue = y.substring(ve, J).replace(V, ee);
        Y && me(ve), M.characters(ue, 0, J - ve), ve = J;
      }
    }
    var k = 0, w = 0, j = /\r\n?|\n|$/g, Y = M.locator;
    function me(J, ue) {
      for (; J >= w && (ue = j.exec(y)); )
        k = w, w = ue.index + ue[0].length, Y.lineNumber++;
      Y.columnNumber = J - k + 1;
    }
    for (var Fe = [{ currentNSMap: S }], Se = [], ve = 0; ; ) {
      try {
        var $ = y.indexOf("<", ve);
        if ($ < 0) {
          if (!C && Se.length > 0)
            return q.fatalError("unclosed xml tag(s): " + Se.join(", "));
          if (!y.substring(ve).match(/^\s*$/)) {
            var Ue = M.doc, qe = Ue.createTextNode(y.substring(ve));
            if (Ue.documentElement)
              return q.error("Extra content at the end of the document");
            Ue.appendChild(qe), M.currentElement = qe;
          }
          return;
        }
        if ($ > ve) {
          var de = y.substring(ve, $);
          !C && Se.length === 0 && (de = de.replace(new RegExp(e.S_OPT.source, "g"), ""), de && q.error("Unexpected content outside root element: '" + de + "'")), x($);
        }
        switch (y.charAt($ + 1)) {
          case "/":
            var ge = y.indexOf(">", $ + 2), Ze = y.substring($ + 2, ge > 0 ? ge : void 0);
            if (!Ze)
              return q.fatalError("end tag name missing");
            var Je = ge > 0 && e.reg("^", e.QName_group, e.S_OPT, "$").exec(Ze);
            if (!Je)
              return q.fatalError('end tag name contains invalid characters: "' + Ze + '"');
            if (!M.currentElement && !M.doc.documentElement)
              return;
            var De = Se[Se.length - 1] || M.currentElement.tagName || M.doc.documentElement.tagName || "";
            if (De !== Je[1]) {
              var Xe = Je[1].toLowerCase();
              if (!C || De.toLowerCase() !== Xe)
                return q.fatalError('Opening and ending tag mismatch: "' + De + '" != "' + Ze + '"');
            }
            var et = Fe.pop();
            Se.pop();
            var ct = et.localNSMap;
            if (M.endElement(et.uri, et.localName, De), ct)
              for (var _e in ct)
                l(ct, _e) && M.endPrefixMapping(_e);
            ge++;
            break;
          // end element
          case "?":
            Y && me($), ge = ce(y, $, M, q);
            break;
          case "!":
            Y && me($), ge = Be(y, $, M, q, C);
            break;
          default:
            Y && me($);
            var se = new Ge(), tt = Fe[Fe.length - 1].currentNSMap, ge = T(y, $, se, tt, ee, q, C), Ye = se.length;
            if (se.closed || (C && r.isHTMLVoidElement(se.tagName) ? se.closed = !0 : Se.push(se.tagName)), Y && Ye) {
              for (var rt = he(Y, {}), ft = 0; ft < Ye; ft++) {
                var pt = se[ft];
                me(pt.offset), pt.locator = he(Y, {});
              }
              M.locator = rt, U(se, M, tt) && Fe.push(se), M.locator = Y;
            } else
              U(se, M, tt) && Fe.push(se);
            C && !se.closed ? ge = z(y, ge, se.tagName, ee, M) : ge++;
        }
      } catch (J) {
        if (J instanceof d)
          throw J;
        if (J instanceof f)
          throw new d(J.name + ": " + J.message, M.locator, J);
        q.error("element parse error: " + J), ge = -1;
      }
      ge > ve ? ve = ge : x(Math.max($, ve) + 1);
    }
  }
  function he(y, S) {
    return S.lineNumber = y.lineNumber, S.columnNumber = y.columnNumber, S;
  }
  function T(y, S, _, M, q, C, I) {
    function ee(me, Fe, Se) {
      if (l(_.attributeNames, me))
        return C.fatalError("Attribute " + me + " redefined");
      if (!I && Fe.indexOf("<") >= 0)
        return C.fatalError("Unescaped '<' not allowed in attributes values");
      _.addValue(
        me,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        Fe.replace(/[\t\n\r]/g, " ").replace(V, q),
        Se
      );
    }
    for (var x, k, w = ++S, j = g; ; ) {
      var Y = y.charAt(w);
      switch (Y) {
        case "=":
          if (j === h)
            x = y.slice(S, w), j = A;
          else if (j === E)
            j = A;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (j === A || j === h)
            if (j === h && (C.warning('attribute value must after "="'), x = y.slice(S, w)), S = w + 1, w = y.indexOf(Y, S), w > 0)
              k = y.slice(S, w), ee(x, k, S - 1), j = v;
            else
              throw new Error("attribute value no end '" + Y + "' match");
          else if (j == b)
            k = y.slice(S, w), ee(x, k, S), C.warning('attribute "' + x + '" missed start quot(' + Y + ")!!"), S = w + 1, j = v;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (j) {
            case g:
              _.setTagName(y.slice(S, w));
            case v:
            case F:
            case R:
              j = R, _.closed = !0;
            case b:
            case h:
              break;
            case E:
              _.closed = !0;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return C.error("unexpected end of input"), j == g && _.setTagName(y.slice(S, w)), w;
        case ">":
          switch (j) {
            case g:
              _.setTagName(y.slice(S, w));
            case v:
            case F:
            case R:
              break;
            //normal
            case b:
            //Compatible state
            case h:
              k = y.slice(S, w), k.slice(-1) === "/" && (_.closed = !0, k = k.slice(0, -1));
            case E:
              j === E && (k = x), j == b ? (C.warning('attribute "' + k + '" missed quot(")!'), ee(x, k, S)) : (I || C.warning('attribute "' + k + '" missed value!! "' + k + '" instead!!'), ee(k, k, S));
              break;
            case A:
              if (!I)
                return C.fatalError(`AttValue: ' or " expected`);
          }
          return w;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          Y = " ";
        default:
          if (Y <= " ")
            switch (j) {
              case g:
                _.setTagName(y.slice(S, w)), j = F;
                break;
              case h:
                x = y.slice(S, w), j = E;
                break;
              case b:
                var k = y.slice(S, w);
                C.warning('attribute "' + k + '" missed quot(")!!'), ee(x, k, S);
              case v:
                j = F;
                break;
            }
          else
            switch (j) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case E:
                I || C.warning('attribute "' + x + '" missed value!! "' + x + '" instead2!!'), ee(x, x, S), S = w, j = h;
                break;
              case v:
                C.warning('attribute space is required"' + x + '"!!');
              case F:
                j = h, S = w;
                break;
              case A:
                j = b, S = w;
                break;
              case R:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      w++;
    }
  }
  function U(y, S, _) {
    for (var M = y.tagName, q = null, j = y.length; j--; ) {
      var C = y[j], I = C.qName, ee = C.value, Y = I.indexOf(":");
      if (Y > 0)
        var x = C.prefix = I.slice(0, Y), k = I.slice(Y + 1), w = x === "xmlns" && k;
      else
        k = I, x = null, w = I === "xmlns" && "";
      C.localName = k, w !== !1 && (q == null && (q = /* @__PURE__ */ Object.create(null), Z(_, _ = /* @__PURE__ */ Object.create(null))), _[w] = q[w] = ee, C.uri = p.XMLNS, S.startPrefixMapping(w, ee));
    }
    for (var j = y.length; j--; )
      C = y[j], C.prefix && (C.prefix === "xml" && (C.uri = p.XML), C.prefix !== "xmlns" && (C.uri = _[C.prefix]));
    var Y = M.indexOf(":");
    Y > 0 ? (x = y.prefix = M.slice(0, Y), k = y.localName = M.slice(Y + 1)) : (x = null, k = y.localName = M);
    var me = y.uri = _[x || ""];
    if (S.startElement(me, k, M, y), y.closed) {
      if (S.endElement(me, k, M), q)
        for (x in q)
          l(q, x) && S.endPrefixMapping(x);
    } else
      return y.currentNSMap = _, y.localNSMap = q, !0;
  }
  function z(y, S, _, M, q) {
    var C = n(_);
    if (C || a(_)) {
      var I = y.indexOf("</" + _ + ">", S), ee = y.substring(S + 1, I);
      return C && (ee = ee.replace(V, M)), q.characters(ee, 0, ee.length), I;
    }
    return S + 1;
  }
  function Z(y, S) {
    for (var _ in y)
      l(y, _) && (S[_] = y[_]);
  }
  function ae(y, S) {
    var _ = S;
    function M(w) {
      return w = w || 0, y.charAt(_ + w);
    }
    function q(w) {
      w = w || 1, _ += w;
    }
    function C() {
      for (var w = 0; _ < y.length; ) {
        var j = M();
        if (j !== " " && j !== `
` && j !== "	" && j !== "\r")
          return w;
        w++, q();
      }
      return -1;
    }
    function I() {
      return y.substring(_);
    }
    function ee(w) {
      return y.substring(_, _ + w.length) === w;
    }
    function x(w) {
      return y.substring(_, _ + w.length).toUpperCase() === w.toUpperCase();
    }
    function k(w) {
      var j = e.reg("^", w), Y = j.exec(I());
      return Y ? (q(Y[0].length), Y[0]) : null;
    }
    return {
      char: M,
      getIndex: function() {
        return _;
      },
      getMatch: k,
      getSource: function() {
        return y;
      },
      skip: q,
      skipBlanks: C,
      substringFromIndex: I,
      substringStartsWith: ee,
      substringStartsWithCaseInsensitive: x
    };
  }
  function Q(y, S) {
    function _(ee, x) {
      var k = e.PI.exec(ee.substringFromIndex());
      return k ? k[1].toLowerCase() === "xml" ? x.fatalError(
        "xml declaration is only allowed at the start of the document, but found at position " + ee.getIndex()
      ) : (ee.skip(k[0].length), k[0]) : x.fatalError("processing instruction is not well-formed at position " + ee.getIndex());
    }
    var M = y.getSource();
    if (y.char() === "[") {
      y.skip(1);
      for (var q = y.getIndex(); y.getIndex() < M.length; ) {
        if (y.skipBlanks(), y.char() === "]") {
          var C = M.substring(q, y.getIndex());
          return y.skip(1), C;
        }
        var I = null;
        if (y.char() === "<" && y.char(1) === "!")
          switch (y.char(2)) {
            case "E":
              y.char(3) === "L" ? I = y.getMatch(e.elementdecl) : y.char(3) === "N" && (I = y.getMatch(e.EntityDecl));
              break;
            case "A":
              I = y.getMatch(e.AttlistDecl);
              break;
            case "N":
              I = y.getMatch(e.NotationDecl);
              break;
            case "-":
              I = y.getMatch(e.Comment);
              break;
          }
        else if (y.char() === "<" && y.char(1) === "?")
          I = _(y, S);
        else if (y.char() === "%")
          I = y.getMatch(e.PEReference);
        else
          return S.fatalError("Error detected in Markup declaration");
        if (!I)
          return S.fatalError("Error in internal subset at position " + y.getIndex());
      }
      return S.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function Be(y, S, _, M, q) {
    var C = ae(y, S);
    switch (q ? C.char(2).toUpperCase() : C.char(2)) {
      case "-":
        var I = C.getMatch(e.Comment);
        return I ? (_.comment(I, e.COMMENT_START.length, I.length - e.COMMENT_START.length - e.COMMENT_END.length), C.getIndex()) : M.fatalError("comment is not well-formed at position " + C.getIndex());
      case "[":
        var ee = C.getMatch(e.CDSect);
        return ee ? !q && !_.currentElement ? M.fatalError("CDATA outside of element") : (_.startCDATA(), _.characters(ee, e.CDATA_START.length, ee.length - e.CDATA_START.length - e.CDATA_END.length), _.endCDATA(), C.getIndex()) : M.fatalError("Invalid CDATA starting at position " + S);
      case "D": {
        if (_.doc && _.doc.documentElement)
          return M.fatalError("Doctype not allowed inside or after documentElement at position " + C.getIndex());
        if (q ? !C.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START) : !C.substringStartsWith(e.DOCTYPE_DECL_START))
          return M.fatalError("Expected " + e.DOCTYPE_DECL_START + " at position " + C.getIndex());
        if (C.skip(e.DOCTYPE_DECL_START.length), C.skipBlanks() < 1)
          return M.fatalError("Expected whitespace after " + e.DOCTYPE_DECL_START + " at position " + C.getIndex());
        var x = {
          name: void 0,
          publicId: void 0,
          systemId: void 0,
          internalSubset: void 0
        };
        if (x.name = C.getMatch(e.Name), !x.name)
          return M.fatalError("doctype name missing or contains unexpected characters at position " + C.getIndex());
        if (q && x.name.toLowerCase() !== "html" && M.warning("Unexpected DOCTYPE in HTML document at position " + C.getIndex()), C.skipBlanks(), C.substringStartsWith(e.PUBLIC) || C.substringStartsWith(e.SYSTEM)) {
          var k = e.ExternalID_match.exec(C.substringFromIndex());
          if (!k)
            return M.fatalError("doctype external id is not well-formed at position " + C.getIndex());
          k.groups.SystemLiteralOnly !== void 0 ? x.systemId = k.groups.SystemLiteralOnly : (x.systemId = k.groups.SystemLiteral, x.publicId = k.groups.PubidLiteral), C.skip(k[0].length);
        } else if (q && C.substringStartsWithCaseInsensitive(e.SYSTEM)) {
          if (C.skip(e.SYSTEM.length), C.skipBlanks() < 1)
            return M.fatalError("Expected whitespace after " + e.SYSTEM + " at position " + C.getIndex());
          if (x.systemId = C.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral), !x.systemId)
            return M.fatalError(
              "Expected " + e.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + e.SYSTEM + " at position " + C.getIndex()
            );
        }
        return q && x.systemId && !e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(x.systemId) && M.warning("Unexpected doctype.systemId in HTML document at position " + C.getIndex()), q || (C.skipBlanks(), x.internalSubset = Q(C, M)), C.skipBlanks(), C.char() !== ">" ? M.fatalError("doctype not terminated with > at position " + C.getIndex()) : (C.skip(1), _.startDTD(x.name, x.publicId, x.systemId, x.internalSubset), _.endDTD(), C.getIndex());
      }
      default:
        return M.fatalError('Not well-formed XML starting with "<!" at position ' + S);
    }
  }
  function ce(y, S, _, M) {
    var q = y.substring(S).match(e.PI);
    if (!q)
      return M.fatalError("Invalid processing instruction starting at position " + S);
    if (q[1].toLowerCase() === "xml") {
      if (S > 0)
        return M.fatalError(
          "processing instruction at position " + S + " is an xml declaration which is only at the start of the document"
        );
      if (!e.XMLDecl.test(y.substring(S)))
        return M.fatalError("xml declaration is not well-formed");
    }
    return _.processingInstruction(q[1], q[2]), S + q[0].length;
  }
  function Ge() {
    this.attributeNames = /* @__PURE__ */ Object.create(null);
  }
  return Ge.prototype = {
    setTagName: function(y) {
      if (!e.QName_exact.test(y))
        throw new Error("invalid tagName:" + y);
      this.tagName = y;
    },
    addValue: function(y, S, _) {
      if (!e.QName_exact.test(y))
        throw new Error("invalid attribute:" + y);
      this.attributeNames[y] = this.length, this[this.length++] = { qName: y, value: S, offset: _ };
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
  }, jt.XMLReader = O, jt.parseUtils = ae, jt.parseDoctypeCommentOrCData = Be, jt;
}
var jr;
function bi() {
  if (jr) return wt;
  jr = 1;
  var r = Ut(), e = xn(), t = ar(), n = Ei(), o = yi(), a = e.DOMImplementation, l = r.hasDefaultHTMLNamespace, p = r.isHTMLMimeType, d = r.isValidMimeType, f = r.MIME_TYPE, g = r.NAMESPACE, h = t.ParseError, E = o.XMLReader;
  function A(T) {
    return T.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028\u2029]/g, `
`);
  }
  function b(T) {
    if (T = T || {}, T.locator === void 0 && (T.locator = !0), this.assign = T.assign || r.assign, this.domHandler = T.domHandler || v, this.onError = T.onError || T.errorHandler, T.errorHandler && typeof T.errorHandler != "function")
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    T.errorHandler && T.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = T.normalizeLineEndings || A, this.locator = !!T.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), T.xmlns);
  }
  b.prototype.parseFromString = function(T, U) {
    if (!d(U))
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + U + '" is not valid.');
    var z = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), Z = n.XML_ENTITIES, ae = z[""] || null;
    l(U) ? (Z = n.HTML_ENTITIES, ae = g.HTML) : U === f.XML_SVG_IMAGE && (ae = g.SVG), z[""] = ae, z.xml = z.xml || g.XML;
    var Q = new this.domHandler({
      mimeType: U,
      defaultNamespace: ae,
      onError: this.onError
    }), Be = this.locator ? {} : void 0;
    this.locator && Q.setDocumentLocator(Be);
    var ce = new E();
    ce.errorHandler = Q, ce.domBuilder = Q;
    var Ge = !r.isHTMLMimeType(U);
    return Ge && typeof T != "string" && ce.errorHandler.fatalError("source is not a string"), ce.parse(this.normalizeLineEndings(String(T)), z, Z), Q.doc.documentElement || ce.errorHandler.fatalError("missing root element"), Q.doc;
  };
  function v(T) {
    var U = T || {};
    this.mimeType = U.mimeType || f.XML_APPLICATION, this.defaultNamespace = U.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = U.onError;
  }
  function F(T, U) {
    U.lineNumber = T.lineNumber, U.columnNumber = T.columnNumber;
  }
  v.prototype = {
    /**
     * Either creates an XML or an HTML document and stores it under `this.doc`.
     * If it is an XML document, `this.defaultNamespace` is used to create it,
     * and it will not contain any `childNodes`.
     * If it is an HTML document, it will be created without any `childNodes`.
     *
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
     */
    startDocument: function() {
      var T = new a();
      this.doc = p(this.mimeType) ? T.createHTMLDocument(!1) : T.createDocument(this.defaultNamespace, "");
    },
    startElement: function(T, U, z, Z) {
      var ae = this.doc, Q = ae.createElementNS(T, z || U), Be = Z.length;
      V(this, Q), this.currentElement = Q, this.locator && F(this.locator, Q);
      for (var ce = 0; ce < Be; ce++) {
        var T = Z.getURI(ce), Ge = Z.getValue(ce), z = Z.getQName(ce), y = ae.createAttributeNS(T, z);
        this.locator && F(Z.getLocator(ce), y), y.value = y.nodeValue = Ge, Q.setAttributeNode(y);
      }
    },
    endElement: function(T, U, z) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(T, U) {
    },
    endPrefixMapping: function(T) {
    },
    processingInstruction: function(T, U) {
      var z = this.doc.createProcessingInstruction(T, U);
      this.locator && F(this.locator, z), V(this, z);
    },
    ignorableWhitespace: function(T, U, z) {
    },
    characters: function(T, U, z) {
      if (T = O.apply(this, arguments), T) {
        if (this.cdata)
          var Z = this.doc.createCDATASection(T);
        else
          var Z = this.doc.createTextNode(T);
        this.currentElement ? this.currentElement.appendChild(Z) : /^\s*$/.test(T) && this.doc.appendChild(Z), this.locator && F(this.locator, Z);
      }
    },
    skippedEntity: function(T) {
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
    setDocumentLocator: function(T) {
      T && (T.lineNumber = 0), this.locator = T;
    },
    //LexicalHandler
    comment: function(T, U, z) {
      T = O.apply(this, arguments);
      var Z = this.doc.createComment(T);
      this.locator && F(this.locator, Z), V(this, Z);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(T, U, z, Z) {
      var ae = this.doc.implementation;
      if (ae && ae.createDocumentType) {
        var Q = ae.createDocumentType(T, U, z, Z);
        this.locator && F(this.locator, Q), V(this, Q), this.doc.doctype = Q;
      }
    },
    reportError: function(T, U) {
      if (typeof this.onError == "function")
        try {
          this.onError(T, U, this);
        } catch (z) {
          throw new h("Reporting " + T + ' "' + U + '" caused ' + z, this.locator);
        }
      else
        console.error("[xmldom " + T + "]	" + U, R(this.locator));
    },
    /**
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(T) {
      this.reportError("warning", T);
    },
    error: function(T) {
      this.reportError("error", T);
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
    fatalError: function(T) {
      throw this.reportError("fatalError", T), new h(T, this.locator);
    }
  };
  function R(T) {
    if (T)
      return `
@#[line:` + T.lineNumber + ",col:" + T.columnNumber + "]";
  }
  function O(T, U, z) {
    return typeof T == "string" ? T.substr(U, z) : T.length >= U + z || U ? new java.lang.String(T, U, z) + "" : T;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function(T) {
      v.prototype[T] = function() {
        return null;
      };
    }
  );
  function V(T, U) {
    T.currentElement ? T.currentElement.appendChild(U) : T.doc.appendChild(U);
  }
  function G(T) {
    if (T === "error") throw "onErrorStopParsing";
  }
  function he() {
    throw "onWarningStopParsing";
  }
  return wt.__DOMHandler = v, wt.DOMParser = b, wt.normalizeLineEndings = A, wt.onErrorStopParsing = G, wt.onWarningStopParsing = he, wt;
}
var Vr;
function Ai() {
  if (Vr) return ie;
  Vr = 1;
  var r = Ut();
  ie.assign = r.assign, ie.hasDefaultHTMLNamespace = r.hasDefaultHTMLNamespace, ie.isHTMLMimeType = r.isHTMLMimeType, ie.isValidMimeType = r.isValidMimeType, ie.MIME_TYPE = r.MIME_TYPE, ie.NAMESPACE = r.NAMESPACE;
  var e = ar();
  ie.DOMException = e.DOMException, ie.DOMExceptionName = e.DOMExceptionName, ie.ExceptionCode = e.ExceptionCode, ie.ParseError = e.ParseError;
  var t = xn();
  ie.Attr = t.Attr, ie.CDATASection = t.CDATASection, ie.CharacterData = t.CharacterData, ie.Comment = t.Comment, ie.Document = t.Document, ie.DocumentFragment = t.DocumentFragment, ie.DocumentType = t.DocumentType, ie.DOMImplementation = t.DOMImplementation, ie.Element = t.Element, ie.Entity = t.Entity, ie.EntityReference = t.EntityReference, ie.LiveNodeList = t.LiveNodeList, ie.NamedNodeMap = t.NamedNodeMap, ie.Node = t.Node, ie.NodeList = t.NodeList, ie.Notation = t.Notation, ie.ProcessingInstruction = t.ProcessingInstruction, ie.Text = t.Text, ie.XMLSerializer = t.XMLSerializer;
  var n = bi();
  return ie.DOMParser = n.DOMParser, ie.normalizeLineEndings = n.normalizeLineEndings, ie.onErrorStopParsing = n.onErrorStopParsing, ie.onWarningStopParsing = n.onWarningStopParsing, ie;
}
Ai();
const On = "USJ";
var ut = {}, fr, zr;
function vi() {
  return zr || (zr = 1, fr = () => {
    const r = "\\ud800-\\udfff", l = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", p = "\\ufe0e\\ufe0f", d = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", f = `[${r}]`, g = `[${l}]`, h = "\\ud83c[\\udffb-\\udfff]", E = `(?:${g}|${h})`, A = `[^${r}]`, b = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", v = "[\\ud800-\\udbff][\\udc00-\\udfff]", F = "\\u200d", R = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", O = `[${d}]`, V = `${E}?`, G = `[${p}]?`, he = `(?:${F}(?:${[A, b, v].join("|")})${G + V})*`, T = G + V + he, z = `(?:${[`${A}${g}?`, g, b, v, f, O].join("|")})`;
    return new RegExp(`${R}|${h}(?=${h})|${z + T}`, "g");
  }), fr;
}
var Hr;
function Di() {
  if (Hr) return ut;
  Hr = 1;
  var r = ut && ut.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(ut, "__esModule", { value: !0 });
  var e = r(vi());
  function t(d) {
    if (typeof d != "string")
      throw new Error("A string is expected as input");
    return d.match(e.default()) || [];
  }
  ut.toArray = t;
  function n(d) {
    if (typeof d != "string")
      throw new Error("Input must be a string");
    var f = d.match(e.default());
    return f === null ? 0 : f.length;
  }
  ut.length = n;
  function o(d, f, g) {
    if (f === void 0 && (f = 0), typeof d != "string")
      throw new Error("Input must be a string");
    (typeof f != "number" || f < 0) && (f = 0), typeof g == "number" && g < 0 && (g = 0);
    var h = d.match(e.default());
    return h ? h.slice(f, g).join("") : "";
  }
  ut.substring = o;
  function a(d, f, g) {
    if (f === void 0 && (f = 0), typeof d != "string")
      throw new Error("Input must be a string");
    var h = n(d);
    if (typeof f != "number" && (f = parseInt(f, 10)), f >= h)
      return "";
    f < 0 && (f += h);
    var E;
    typeof g > "u" ? E = h : (typeof g != "number" && (g = parseInt(g, 10)), E = g >= 0 ? g + f : f);
    var A = d.match(e.default());
    return A ? A.slice(f, E).join("") : "";
  }
  ut.substr = a;
  function l(d, f, g, h) {
    if (f === void 0 && (f = 16), g === void 0 && (g = "#"), h === void 0 && (h = "right"), typeof d != "string" || typeof f != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(h) === -1)
      throw new Error("Pad position should be either left or right");
    typeof g != "string" && (g = String(g));
    var E = n(d);
    if (E > f)
      return o(d, 0, f);
    if (E < f) {
      var A = g.repeat(f - E);
      return h === "left" ? A + d : d + A;
    }
    return d;
  }
  ut.limit = l;
  function p(d, f, g) {
    if (g === void 0 && (g = 0), typeof d != "string")
      throw new Error("Input must be a string");
    if (d === "")
      return f === "" ? 0 : -1;
    g = Number(g), g = isNaN(g) ? 0 : g, f = String(f);
    var h = t(d);
    if (g >= h.length)
      return f === "" ? h.length : -1;
    if (f === "")
      return g;
    var E = t(f), A = !1, b;
    for (b = g; b < h.length; b += 1) {
      for (var v = 0; v < E.length && E[v] === h[b + v]; )
        v += 1;
      if (v === E.length && E[v - 1] === h[b + v - 1]) {
        A = !0;
        break;
      }
    }
    return A ? b : -1;
  }
  return ut.indexOf = p, ut;
}
var Ot = Di();
function Mn(r) {
  return r ? Array.isArray(r) ? r : [r] : [];
}
function tr(r, e) {
  if (!(e > Me(r) || e < -Me(r)))
    return sr(r, e, 1);
}
function Bt(r, e) {
  return e < 0 || e > Me(r) - 1 ? "" : sr(r, e, 1);
}
function Oa(r, e) {
  if (!(e < 0 || e > Me(r) - 1))
    return sr(r, e, 1).codePointAt(0);
}
function Ti(r, e, t = Me(r)) {
  const n = Si(r, e);
  return !(n === -1 || n + Me(e) !== t);
}
function Ni(r, e, t) {
  if (e < 0) return -1;
  if (t) {
    if (Bt(r, e) === "}" && Bt(r, e - 1) === "\\") return e;
    const a = Qt(r, "\\}", e);
    return a >= 0 ? a + 1 : a;
  }
  let n = e;
  const o = Me(r);
  for (; n < o && (n = Qt(r, "}", n), !(n === -1 || Bt(r, n - 1) !== "\\")); )
    n += 1;
  return n >= o ? -1 : n;
}
function Ci(r, e) {
  const t = [];
  let n = 0, o = 0;
  function a(p, d, f) {
    const g = It(r, o, d), h = t.length > 0 && pe(t[t.length - 1]) ? `${t.pop()}${g}` : g;
    pe(p) ? t.push(`${h}${p}`) : (h && t.push(h), t.push(p)), o = d + f;
  }
  const l = Me(r);
  for (; n < l; ) {
    switch (Bt(r, n)) {
      case "{":
        if (Bt(r, n - 1) !== "\\") {
          const p = Ni(r, n, !1);
          if (p >= 0) {
            const d = It(r, n + 1, p), f = d in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[d]
            ) : d;
            a(f, n, p + 1 - n), n = p, o = p + 1;
          }
        } else
          a("{", n - 1, 2);
        break;
      case "}":
        Bt(r, n - 1) !== "\\" || a("}", n - 1, 2);
        break;
    }
    n += 1;
  }
  if (o < l) {
    const p = It(r, o);
    t.push(
      t.length > 0 && pe(t[t.length - 1]) ? `${t.pop()}${p}` : p
    );
  }
  return t;
}
function Ma(r, e) {
  return Ci(r, e).map((t) => `${t}`).join("");
}
function wi(r, e, t = 0) {
  const n = It(r, t);
  return Qt(n, e) !== -1;
}
function Qt(r, e, t = 0) {
  return Ot.indexOf(r, e, t);
}
function Si(r, e, t) {
  let n = t === void 0 ? Me(r) : t;
  n < 0 ? n = 0 : n >= Me(r) && (n = Me(r) - 1);
  for (let o = n; o >= 0; o--)
    if (sr(r, o, Me(e)) === e)
      return o;
  return -1;
}
function Me(r) {
  return Ot.length(r);
}
function ka(r, e) {
  const t = e.toUpperCase();
  return t === "NONE" ? r : r.normalize(t);
}
function Ra(r, e, t) {
  return r.localeCompare(e, "en", t);
}
function _a(r, e, t = " ") {
  return e <= Me(r) ? r : Ot.limit(r, e, t, "right");
}
function Pa(r, e, t = " ") {
  return e <= Me(r) ? r : Ot.limit(r, e, t, "left");
}
function Gr(r, e) {
  return e > r ? r : e < -r ? 0 : e < 0 ? e + r : e;
}
function Jr(r, e, t) {
  const n = Me(r);
  if (e > n || t && (e > t && !(e >= 0 && e < n && t < 0 && t > -n) || t < -n))
    return "";
  const o = Gr(n, e), a = t ? Gr(n, t) : void 0;
  return It(r, o, a);
}
function Xr(r, e, t) {
  const n = [];
  if (t !== void 0 && t <= 0)
    return [r];
  if (e === "") return Ii(r).slice(0, t);
  let o = e;
  (typeof e == "string" || e instanceof RegExp && !wi(e.flags, "g")) && (o = new RegExp(e, "g"));
  const a = r.match(o);
  let l = 0;
  if (!a) return [r];
  for (let p = 0; p < (t ? t - 1 : a.length); p++) {
    const d = Qt(r, a[p], l), f = Me(a[p]);
    if (n.push(It(r, l, d)), l = d + f, t !== void 0 && n.length === t)
      break;
  }
  return n.push(It(r, l)), n;
}
function kn(r, e, t = 0) {
  return Qt(r, e, t) === t;
}
function sr(r, e = 0, t = Me(r) - e) {
  return Ot.substr(r, e, t);
}
function It(r, e, t = Me(r)) {
  return Ot.substring(r, e, t);
}
function Ii(r) {
  return Ot.toArray(r);
}
function La(r) {
  return kn(r, "%") && Ti(r, "%");
}
function Ba(r) {
  if (typeof r != "string")
    throw new TypeError("Expected a string");
  return r.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Fa(r) {
  return r ? Mn(r).map(
    (n) => Array.isArray(n) ? n.map((o) => new RegExp(o)) : new RegExp(n)
  ) : [];
}
function Ua(r) {
  return r ? Mn(r).map((n) => new RegExp(n)) : [];
}
const xi = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function Lt(r) {
  return xi.test(r);
}
function qa(r) {
  let e = "";
  for (let t = 0; t < r.length; t++) {
    const n = r[t];
    if (n === n.toUpperCase() && n !== n.toLowerCase()) {
      if (t > 0) {
        const a = r[t - 1];
        if (!(a === a.toUpperCase() && a !== a.toLowerCase()))
          e += "-";
        else if (t + 1 < r.length) {
          const p = r[t + 1];
          p === p.toLowerCase() && p !== p.toUpperCase() && (e += "-");
        }
      }
      e += n.toLowerCase();
    } else
      e += n;
  }
  return e;
}
const yr = ["chapter", "book", "para", "row", "sidebar", On], Oi = "​", Rn = [
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
], Mi = 1, ki = Rn.length - 1, Ri = 1, _i = 1, $a = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, Pi = (r) => {
  var e;
  return ((e = Rn[r]) == null ? void 0 : e.chapters) ?? -1;
}, ja = (r, e) => ({
  book: Oe.bookNumberToId(
    Math.max(
      Mi,
      Math.min(Oe.bookIdToNumber(r.book) + e, ki)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), Va = (r, e) => ({
  ...r,
  chapterNum: Math.min(
    Math.max(Ri, r.chapterNum + e),
    Pi(Oe.bookIdToNumber(r.book))
  ),
  verseNum: 1
}), za = (r, e) => ({
  ...r,
  verseNum: Math.max(_i, r.verseNum + e)
});
async function Ha(r, e, t) {
  const n = Oe.bookNumberToId(r);
  if (!kn(Intl.getCanonicalLocales(e)[0], "zh"))
    return t({
      localizeKey: `LocalizedId.${n}`,
      languagesToSearch: [e]
    });
  const o = await t({
    localizeKey: `Book.${n}`,
    languagesToSearch: [e]
  }), a = Xr(o, "-");
  return Xr(a[0], "ÿ08")[0].trim();
}
function Ga(r) {
  return new Sn(Oe.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCC;
}
function Yr(r) {
  return new Sn(Oe.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCCVVV;
}
function Ja(r, e) {
  return Yr(r) - Yr(e);
}
function Li(r) {
  return `%scrollGroup_${r}%`;
}
function Xa(r) {
  return r.map((e) => Li(e));
}
function Ya(r, e, t, n) {
  let o;
  switch (e ?? "id") {
    case "English":
      o = Oe.bookIdToEnglishName(r.book);
      break;
    case "id":
      o = r.book;
      break;
    default:
      o = e ?? "";
      break;
  }
  return `${o}${n ?? " "}${r.chapterNum}${t ?? ":"}${r.verseNum}`;
}
var Bi = /* @__PURE__ */ ((r) => (r.OT = "OT", r.NT = "NT", r.DC = "DC", r.Extra = "Extra", r))(Bi || {});
const Ka = (r) => {
  if (Oe.isBookOT(r)) return "OT";
  if (Oe.isBookNT(r)) return "NT";
  if (Oe.isBookDC(r)) return "DC";
  if (Oe.isExtraMaterial(r)) return "Extra";
  throw new Error(`Unknown section for book: ${r}`);
}, Fi = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function Kr(r) {
  return Fi.test(r);
}
const Ui = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function qi(r) {
  return Ui.test(r);
}
function Wr(r) {
  let e = "", t = !1, n = "\0";
  for (let o = 0; o < r.length; o += 1) {
    const a = r[o];
    a.charCodeAt(0) < 32 ? (t || (e += " "), t = !0) : !t && a === Oi && o + 1 < r.length && Kr(r[o + 1]) || (Kr(a) ? (t || (e += a), t = !0) : qi(a) && n === a || (e += a, t = !1)), n = a;
  }
  return e;
}
function Qr(r) {
  return !r || r.length === 0 ? !0 : r.length === 1 && (r[0] === void 0 || r[0] === "");
}
function Zr(r, e) {
  if (!e || !yr.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(r)} does not have a content array! This should not happen!`
    );
  return r === e.content[e.content.length - 1];
}
function _n(r, e, t, n) {
  if (!r && !t) return !0;
  if (!r || !t) return !1;
  const o = pe(r), a = pe(t);
  if (o && a) {
    const l = Wr(r), p = Wr(t);
    if (l !== p) {
      if (!Lt(tr(l, -1) ?? "") && !Lt(tr(p, -1) ?? "") || !Zr(r, e) || !Zr(t, n)) return !1;
      let d = l;
      for (; Lt(tr(d, -1) ?? ""); ) d = Jr(d, 0, -1);
      let f = p;
      for (; Lt(tr(f, -1) ?? ""); ) f = Jr(f, 0, -1);
      if (d !== f) return !1;
    }
  } else if (!o && !a) {
    const l = r, p = t, d = Object.keys(l).filter(
      (h) => h !== "content"
    );
    if (d.length !== Object.keys(p).filter((h) => h !== "content").length || d.some((h) => !(h in p) || l[h] !== p[h])) return !1;
    const f = Qr(l.content), g = Qr(p.content);
    if (f !== g) return !1;
    if (!f && !g) {
      let h = l.content, E = p.content;
      const A = h[h.length - 1];
      yr.includes(l.type) && pe(A) && Lt(A) && (h = h.slice(0, -1));
      const b = E[E.length - 1];
      if (yr.includes(p.type) && pe(b) && Lt(b) && (E = E.slice(0, -1)), h.length !== E.length) return !1;
      for (let v = 0; v < h.length; v += 1)
        if (!_n(h[v], l, E[v], p))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function Wa(r, e) {
  return _n(r, void 0, e, void 0);
}
const Qa = (r) => (...e) => r.map((n) => n(...e)).every((n) => n), Za = (r) => async (...e) => {
  const t = r.map(async (n) => n(...e));
  return (await Promise.all(t)).every((n) => n);
}, $i = "book", en = "chapter", At = "verse", Tt = "***";
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Pn,
  setPrototypeOf: tn,
  isFrozen: ji,
  getPrototypeOf: Vi,
  getOwnPropertyDescriptor: zi
} = Object;
let {
  freeze: ze,
  seal: at,
  create: br
} = Object, {
  apply: Ar,
  construct: vr
} = typeof Reflect < "u" && Reflect;
ze || (ze = function(e) {
  return e;
});
at || (at = function(e) {
  return e;
});
Ar || (Ar = function(e, t) {
  for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    o[a - 2] = arguments[a];
  return e.apply(t, o);
});
vr || (vr = function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
    n[o - 1] = arguments[o];
  return new e(...n);
});
const rr = He(Array.prototype.forEach), Hi = He(Array.prototype.lastIndexOf), rn = He(Array.prototype.pop), Vt = He(Array.prototype.push), Gi = He(Array.prototype.splice), or = He(String.prototype.toLowerCase), pr = He(String.prototype.toString), hr = He(String.prototype.match), zt = He(String.prototype.replace), Ji = He(String.prototype.indexOf), Xi = He(String.prototype.trim), lt = He(Object.prototype.hasOwnProperty), je = He(RegExp.prototype.test), Ht = Yi(TypeError);
function He(r) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
      n[o - 1] = arguments[o];
    return Ar(r, e, n);
  };
}
function Yi(r) {
  return function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return vr(r, t);
  };
}
function te(r, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : or;
  tn && tn(r, null);
  let n = e.length;
  for (; n--; ) {
    let o = e[n];
    if (typeof o == "string") {
      const a = t(o);
      a !== o && (ji(e) || (e[n] = a), o = a);
    }
    r[o] = !0;
  }
  return r;
}
function Ki(r) {
  for (let e = 0; e < r.length; e++)
    lt(r, e) || (r[e] = null);
  return r;
}
function vt(r) {
  const e = br(null);
  for (const [t, n] of Pn(r))
    lt(r, t) && (Array.isArray(n) ? e[t] = Ki(n) : n && typeof n == "object" && n.constructor === Object ? e[t] = vt(n) : e[t] = n);
  return e;
}
function Gt(r, e) {
  for (; r !== null; ) {
    const n = zi(r, e);
    if (n) {
      if (n.get)
        return He(n.get);
      if (typeof n.value == "function")
        return He(n.value);
    }
    r = Vi(r);
  }
  function t() {
    return null;
  }
  return t;
}
const nn = ze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), dr = ze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), mr = ze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Wi = ze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), gr = ze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Qi = ze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), on = ze(["#text"]), an = ze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Er = ze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), sn = ze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), nr = ze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Zi = at(/\{\{[\w\W]*|[\w\W]*\}\}/gm), eo = at(/<%[\w\W]*|[\w\W]*%>/gm), to = at(/\$\{[\w\W]*/gm), ro = at(/^data-[\-\w.\u00B7-\uFFFF]+$/), no = at(/^aria-[\-\w]+$/), Ln = at(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), io = at(/^(?:\w+script|data):/i), oo = at(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Bn = at(/^html$/i), ao = at(/^[a-z][.\w]*(-[.\w]+)+$/i);
var un = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: no,
  ATTR_WHITESPACE: oo,
  CUSTOM_ELEMENT: ao,
  DATA_ATTR: ro,
  DOCTYPE_NAME: Bn,
  ERB_EXPR: eo,
  IS_ALLOWED_URI: Ln,
  IS_SCRIPT_OR_DATA: io,
  MUSTACHE_EXPR: Zi,
  TMPLIT_EXPR: to
});
const Jt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, so = function() {
  return typeof window > "u" ? null : window;
}, uo = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let n = null;
  const o = "data-tt-policy-suffix";
  t && t.hasAttribute(o) && (n = t.getAttribute(o));
  const a = "dompurify" + (n ? "#" + n : "");
  try {
    return e.createPolicy(a, {
      createHTML(l) {
        return l;
      },
      createScriptURL(l) {
        return l;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + a + " could not be created."), null;
  }
}, ln = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function Fn() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : so();
  const e = (L) => Fn(L);
  if (e.version = "3.3.0", e.removed = [], !r || !r.document || r.document.nodeType !== Jt.document || !r.Element)
    return e.isSupported = !1, e;
  let {
    document: t
  } = r;
  const n = t, o = n.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: l,
    Node: p,
    Element: d,
    NodeFilter: f,
    NamedNodeMap: g = r.NamedNodeMap || r.MozNamedAttrMap,
    HTMLFormElement: h,
    DOMParser: E,
    trustedTypes: A
  } = r, b = d.prototype, v = Gt(b, "cloneNode"), F = Gt(b, "remove"), R = Gt(b, "nextSibling"), O = Gt(b, "childNodes"), V = Gt(b, "parentNode");
  if (typeof l == "function") {
    const L = t.createElement("template");
    L.content && L.content.ownerDocument && (t = L.content.ownerDocument);
  }
  let G, he = "";
  const {
    implementation: T,
    createNodeIterator: U,
    createDocumentFragment: z,
    getElementsByTagName: Z
  } = t, {
    importNode: ae
  } = n;
  let Q = ln();
  e.isSupported = typeof Pn == "function" && typeof V == "function" && T && T.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Be,
    ERB_EXPR: ce,
    TMPLIT_EXPR: Ge,
    DATA_ATTR: y,
    ARIA_ATTR: S,
    IS_SCRIPT_OR_DATA: _,
    ATTR_WHITESPACE: M,
    CUSTOM_ELEMENT: q
  } = un;
  let {
    IS_ALLOWED_URI: C
  } = un, I = null;
  const ee = te({}, [...nn, ...dr, ...mr, ...gr, ...on]);
  let x = null;
  const k = te({}, [...an, ...Er, ...sn, ...nr]);
  let w = Object.seal(br(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), j = null, Y = null;
  const me = Object.seal(br(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Fe = !0, Se = !0, ve = !1, $ = !0, Ue = !1, qe = !0, de = !1, Ze = !1, Je = !1, De = !1, Xe = !1, et = !1, ct = !0, _e = !1;
  const se = "user-content-";
  let tt = !0, ge = !1, Ye = {}, rt = null;
  const ft = te({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let pt = null;
  const J = te({}, ["audio", "video", "img", "source", "image", "track"]);
  let ue = null;
  const ke = te({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Te = "http://www.w3.org/1998/Math/MathML", nt = "http://www.w3.org/2000/svg", Pe = "http://www.w3.org/1999/xhtml";
  let We = Pe, ht = !1, Et = null;
  const Ct = te({}, [Te, nt, Pe], pr);
  let st = te({}, ["mi", "mo", "mn", "ms", "mtext"]), it = te({}, ["annotation-xml"]);
  const Dt = te({}, ["title", "style", "font", "a", "script"]);
  let dt = null;
  const Ee = ["application/xhtml+xml", "text/html"], Ne = "text/html";
  let le = null, Le = null;
  const Zt = t.createElement("form"), kt = function(c) {
    return c instanceof RegExp || c instanceof Function;
  }, Rt = function() {
    let c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Le && Le === c)) {
      if ((!c || typeof c != "object") && (c = {}), c = vt(c), dt = // eslint-disable-next-line unicorn/prefer-includes
      Ee.indexOf(c.PARSER_MEDIA_TYPE) === -1 ? Ne : c.PARSER_MEDIA_TYPE, le = dt === "application/xhtml+xml" ? pr : or, I = lt(c, "ALLOWED_TAGS") ? te({}, c.ALLOWED_TAGS, le) : ee, x = lt(c, "ALLOWED_ATTR") ? te({}, c.ALLOWED_ATTR, le) : k, Et = lt(c, "ALLOWED_NAMESPACES") ? te({}, c.ALLOWED_NAMESPACES, pr) : Ct, ue = lt(c, "ADD_URI_SAFE_ATTR") ? te(vt(ke), c.ADD_URI_SAFE_ATTR, le) : ke, pt = lt(c, "ADD_DATA_URI_TAGS") ? te(vt(J), c.ADD_DATA_URI_TAGS, le) : J, rt = lt(c, "FORBID_CONTENTS") ? te({}, c.FORBID_CONTENTS, le) : ft, j = lt(c, "FORBID_TAGS") ? te({}, c.FORBID_TAGS, le) : vt({}), Y = lt(c, "FORBID_ATTR") ? te({}, c.FORBID_ATTR, le) : vt({}), Ye = lt(c, "USE_PROFILES") ? c.USE_PROFILES : !1, Fe = c.ALLOW_ARIA_ATTR !== !1, Se = c.ALLOW_DATA_ATTR !== !1, ve = c.ALLOW_UNKNOWN_PROTOCOLS || !1, $ = c.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ue = c.SAFE_FOR_TEMPLATES || !1, qe = c.SAFE_FOR_XML !== !1, de = c.WHOLE_DOCUMENT || !1, De = c.RETURN_DOM || !1, Xe = c.RETURN_DOM_FRAGMENT || !1, et = c.RETURN_TRUSTED_TYPE || !1, Je = c.FORCE_BODY || !1, ct = c.SANITIZE_DOM !== !1, _e = c.SANITIZE_NAMED_PROPS || !1, tt = c.KEEP_CONTENT !== !1, ge = c.IN_PLACE || !1, C = c.ALLOWED_URI_REGEXP || Ln, We = c.NAMESPACE || Pe, st = c.MATHML_TEXT_INTEGRATION_POINTS || st, it = c.HTML_INTEGRATION_POINTS || it, w = c.CUSTOM_ELEMENT_HANDLING || {}, c.CUSTOM_ELEMENT_HANDLING && kt(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (w.tagNameCheck = c.CUSTOM_ELEMENT_HANDLING.tagNameCheck), c.CUSTOM_ELEMENT_HANDLING && kt(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (w.attributeNameCheck = c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), c.CUSTOM_ELEMENT_HANDLING && typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (w.allowCustomizedBuiltInElements = c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ue && (Se = !1), Xe && (De = !0), Ye && (I = te({}, on), x = [], Ye.html === !0 && (te(I, nn), te(x, an)), Ye.svg === !0 && (te(I, dr), te(x, Er), te(x, nr)), Ye.svgFilters === !0 && (te(I, mr), te(x, Er), te(x, nr)), Ye.mathMl === !0 && (te(I, gr), te(x, sn), te(x, nr))), c.ADD_TAGS && (typeof c.ADD_TAGS == "function" ? me.tagCheck = c.ADD_TAGS : (I === ee && (I = vt(I)), te(I, c.ADD_TAGS, le))), c.ADD_ATTR && (typeof c.ADD_ATTR == "function" ? me.attributeCheck = c.ADD_ATTR : (x === k && (x = vt(x)), te(x, c.ADD_ATTR, le))), c.ADD_URI_SAFE_ATTR && te(ue, c.ADD_URI_SAFE_ATTR, le), c.FORBID_CONTENTS && (rt === ft && (rt = vt(rt)), te(rt, c.FORBID_CONTENTS, le)), tt && (I["#text"] = !0), de && te(I, ["html", "head", "body"]), I.table && (te(I, ["tbody"]), delete j.tbody), c.TRUSTED_TYPES_POLICY) {
        if (typeof c.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Ht('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof c.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Ht('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        G = c.TRUSTED_TYPES_POLICY, he = G.createHTML("");
      } else
        G === void 0 && (G = uo(A, o)), G !== null && typeof he == "string" && (he = G.createHTML(""));
      ze && ze(c), Le = c;
    }
  }, i = te({}, [...dr, ...mr, ...Wi]), s = te({}, [...gr, ...Qi]), u = function(c) {
    let N = V(c);
    (!N || !N.tagName) && (N = {
      namespaceURI: We,
      tagName: "template"
    });
    const B = or(c.tagName), K = or(N.tagName);
    return Et[c.namespaceURI] ? c.namespaceURI === nt ? N.namespaceURI === Pe ? B === "svg" : N.namespaceURI === Te ? B === "svg" && (K === "annotation-xml" || st[K]) : !!i[B] : c.namespaceURI === Te ? N.namespaceURI === Pe ? B === "math" : N.namespaceURI === nt ? B === "math" && it[K] : !!s[B] : c.namespaceURI === Pe ? N.namespaceURI === nt && !it[K] || N.namespaceURI === Te && !st[K] ? !1 : !s[B] && (Dt[B] || !i[B]) : !!(dt === "application/xhtml+xml" && Et[c.namespaceURI]) : !1;
  }, m = function(c) {
    Vt(e.removed, {
      element: c
    });
    try {
      V(c).removeChild(c);
    } catch {
      F(c);
    }
  }, D = function(c, N) {
    try {
      Vt(e.removed, {
        attribute: N.getAttributeNode(c),
        from: N
      });
    } catch {
      Vt(e.removed, {
        attribute: null,
        from: N
      });
    }
    if (N.removeAttribute(c), c === "is")
      if (De || Xe)
        try {
          m(N);
        } catch {
        }
      else
        try {
          N.setAttribute(c, "");
        } catch {
        }
  }, P = function(c) {
    let N = null, B = null;
    if (Je)
      c = "<remove></remove>" + c;
    else {
      const fe = hr(c, /^[\r\n\t ]+/);
      B = fe && fe[0];
    }
    dt === "application/xhtml+xml" && We === Pe && (c = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + c + "</body></html>");
    const K = G ? G.createHTML(c) : c;
    if (We === Pe)
      try {
        N = new E().parseFromString(K, dt);
      } catch {
      }
    if (!N || !N.documentElement) {
      N = T.createDocument(We, "template", null);
      try {
        N.documentElement.innerHTML = ht ? he : K;
      } catch {
      }
    }
    const we = N.body || N.documentElement;
    return c && B && we.insertBefore(t.createTextNode(B), we.childNodes[0] || null), We === Pe ? Z.call(N, de ? "html" : "body")[0] : de ? N.documentElement : we;
  }, re = function(c) {
    return U.call(
      c.ownerDocument || c,
      c,
      // eslint-disable-next-line no-bitwise
      f.SHOW_ELEMENT | f.SHOW_COMMENT | f.SHOW_TEXT | f.SHOW_PROCESSING_INSTRUCTION | f.SHOW_CDATA_SECTION,
      null
    );
  }, be = function(c) {
    return c instanceof h && (typeof c.nodeName != "string" || typeof c.textContent != "string" || typeof c.removeChild != "function" || !(c.attributes instanceof g) || typeof c.removeAttribute != "function" || typeof c.setAttribute != "function" || typeof c.namespaceURI != "string" || typeof c.insertBefore != "function" || typeof c.hasChildNodes != "function");
  }, Ce = function(c) {
    return typeof p == "function" && c instanceof p;
  };
  function ye(L, c, N) {
    rr(L, (B) => {
      B.call(e, c, N, Le);
    });
  }
  const Ie = function(c) {
    let N = null;
    if (ye(Q.beforeSanitizeElements, c, null), be(c))
      return m(c), !0;
    const B = le(c.nodeName);
    if (ye(Q.uponSanitizeElement, c, {
      tagName: B,
      allowedTags: I
    }), qe && c.hasChildNodes() && !Ce(c.firstElementChild) && je(/<[/\w!]/g, c.innerHTML) && je(/<[/\w!]/g, c.textContent) || c.nodeType === Jt.progressingInstruction || qe && c.nodeType === Jt.comment && je(/<[/\w]/g, c.data))
      return m(c), !0;
    if (!(me.tagCheck instanceof Function && me.tagCheck(B)) && (!I[B] || j[B])) {
      if (!j[B] && ot(B) && (w.tagNameCheck instanceof RegExp && je(w.tagNameCheck, B) || w.tagNameCheck instanceof Function && w.tagNameCheck(B)))
        return !1;
      if (tt && !rt[B]) {
        const K = V(c) || c.parentNode, we = O(c) || c.childNodes;
        if (we && K) {
          const fe = we.length;
          for (let Ke = fe - 1; Ke >= 0; --Ke) {
            const bt = v(we[Ke], !0);
            bt.__removalCount = (c.__removalCount || 0) + 1, K.insertBefore(bt, R(c));
          }
        }
      }
      return m(c), !0;
    }
    return c instanceof d && !u(c) || (B === "noscript" || B === "noembed" || B === "noframes") && je(/<\/no(script|embed|frames)/i, c.innerHTML) ? (m(c), !0) : (Ue && c.nodeType === Jt.text && (N = c.textContent, rr([Be, ce, Ge], (K) => {
      N = zt(N, K, " ");
    }), c.textContent !== N && (Vt(e.removed, {
      element: c.cloneNode()
    }), c.textContent = N)), ye(Q.afterSanitizeElements, c, null), !1);
  }, mt = function(c, N, B) {
    if (ct && (N === "id" || N === "name") && (B in t || B in Zt))
      return !1;
    if (!(Se && !Y[N] && je(y, N))) {
      if (!(Fe && je(S, N))) {
        if (!(me.attributeCheck instanceof Function && me.attributeCheck(N, c))) {
          if (!x[N] || Y[N]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(ot(c) && (w.tagNameCheck instanceof RegExp && je(w.tagNameCheck, c) || w.tagNameCheck instanceof Function && w.tagNameCheck(c)) && (w.attributeNameCheck instanceof RegExp && je(w.attributeNameCheck, N) || w.attributeNameCheck instanceof Function && w.attributeNameCheck(N, c)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              N === "is" && w.allowCustomizedBuiltInElements && (w.tagNameCheck instanceof RegExp && je(w.tagNameCheck, B) || w.tagNameCheck instanceof Function && w.tagNameCheck(B)))
            ) return !1;
          } else if (!ue[N]) {
            if (!je(C, zt(B, M, ""))) {
              if (!((N === "src" || N === "xlink:href" || N === "href") && c !== "script" && Ji(B, "data:") === 0 && pt[c])) {
                if (!(ve && !je(_, zt(B, M, "")))) {
                  if (B)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, ot = function(c) {
    return c !== "annotation-xml" && hr(c, q);
  }, $e = function(c) {
    ye(Q.beforeSanitizeAttributes, c, null);
    const {
      attributes: N
    } = c;
    if (!N || be(c))
      return;
    const B = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: x,
      forceKeepAttr: void 0
    };
    let K = N.length;
    for (; K--; ) {
      const we = N[K], {
        name: fe,
        namespaceURI: Ke,
        value: bt
      } = we, _t = le(fe), lr = bt;
      let Re = fe === "value" ? lr : Xi(lr);
      if (B.attrName = _t, B.attrValue = Re, B.keepAttr = !0, B.forceKeepAttr = void 0, ye(Q.uponSanitizeAttribute, c, B), Re = B.attrValue, _e && (_t === "id" || _t === "name") && (D(fe, c), Re = se + Re), qe && je(/((--!?|])>)|<\/(style|title|textarea)/i, Re)) {
        D(fe, c);
        continue;
      }
      if (_t === "attributename" && hr(Re, "href")) {
        D(fe, c);
        continue;
      }
      if (B.forceKeepAttr)
        continue;
      if (!B.keepAttr) {
        D(fe, c);
        continue;
      }
      if (!$ && je(/\/>/i, Re)) {
        D(fe, c);
        continue;
      }
      Ue && rr([Be, ce, Ge], (xr) => {
        Re = zt(Re, xr, " ");
      });
      const Ir = le(c.nodeName);
      if (!mt(Ir, _t, Re)) {
        D(fe, c);
        continue;
      }
      if (G && typeof A == "object" && typeof A.getAttributeType == "function" && !Ke)
        switch (A.getAttributeType(Ir, _t)) {
          case "TrustedHTML": {
            Re = G.createHTML(Re);
            break;
          }
          case "TrustedScriptURL": {
            Re = G.createScriptURL(Re);
            break;
          }
        }
      if (Re !== lr)
        try {
          Ke ? c.setAttributeNS(Ke, fe, Re) : c.setAttribute(fe, Re), be(c) ? m(c) : rn(e.removed);
        } catch {
          D(fe, c);
        }
    }
    ye(Q.afterSanitizeAttributes, c, null);
  }, yt = function L(c) {
    let N = null;
    const B = re(c);
    for (ye(Q.beforeSanitizeShadowDOM, c, null); N = B.nextNode(); )
      ye(Q.uponSanitizeShadowNode, N, null), Ie(N), $e(N), N.content instanceof a && L(N.content);
    ye(Q.afterSanitizeShadowDOM, c, null);
  };
  return e.sanitize = function(L) {
    let c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, N = null, B = null, K = null, we = null;
    if (ht = !L, ht && (L = "<!-->"), typeof L != "string" && !Ce(L))
      if (typeof L.toString == "function") {
        if (L = L.toString(), typeof L != "string")
          throw Ht("dirty is not a string, aborting");
      } else
        throw Ht("toString is not a function");
    if (!e.isSupported)
      return L;
    if (Ze || Rt(c), e.removed = [], typeof L == "string" && (ge = !1), ge) {
      if (L.nodeName) {
        const bt = le(L.nodeName);
        if (!I[bt] || j[bt])
          throw Ht("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (L instanceof p)
      N = P("<!---->"), B = N.ownerDocument.importNode(L, !0), B.nodeType === Jt.element && B.nodeName === "BODY" || B.nodeName === "HTML" ? N = B : N.appendChild(B);
    else {
      if (!De && !Ue && !de && // eslint-disable-next-line unicorn/prefer-includes
      L.indexOf("<") === -1)
        return G && et ? G.createHTML(L) : L;
      if (N = P(L), !N)
        return De ? null : et ? he : "";
    }
    N && Je && m(N.firstChild);
    const fe = re(ge ? L : N);
    for (; K = fe.nextNode(); )
      Ie(K), $e(K), K.content instanceof a && yt(K.content);
    if (ge)
      return L;
    if (De) {
      if (Xe)
        for (we = z.call(N.ownerDocument); N.firstChild; )
          we.appendChild(N.firstChild);
      else
        we = N;
      return (x.shadowroot || x.shadowrootmode) && (we = ae.call(n, we, !0)), we;
    }
    let Ke = de ? N.outerHTML : N.innerHTML;
    return de && I["!doctype"] && N.ownerDocument && N.ownerDocument.doctype && N.ownerDocument.doctype.name && je(Bn, N.ownerDocument.doctype.name) && (Ke = "<!DOCTYPE " + N.ownerDocument.doctype.name + `>
` + Ke), Ue && rr([Be, ce, Ge], (bt) => {
      Ke = zt(Ke, bt, " ");
    }), G && et ? G.createHTML(Ke) : Ke;
  }, e.setConfig = function() {
    let L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Rt(L), Ze = !0;
  }, e.clearConfig = function() {
    Le = null, Ze = !1;
  }, e.isValidAttribute = function(L, c, N) {
    Le || Rt({});
    const B = le(L), K = le(c);
    return mt(B, K, N);
  }, e.addHook = function(L, c) {
    typeof c == "function" && Vt(Q[L], c);
  }, e.removeHook = function(L, c) {
    if (c !== void 0) {
      const N = Hi(Q[L], c);
      return N === -1 ? void 0 : Gi(Q[L], N, 1)[0];
    }
    return rn(Q[L]);
  }, e.removeHooks = function(L) {
    Q[L] = [];
  }, e.removeAllHooks = function() {
    Q = ln();
  }, e;
}
var lo = Fn();
function es(r) {
  return r.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi, "<s>$1</s>").replace(
    /<color[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/color>/gi,
    (e, t, n) => `<span style="color: ${{
      red: "#ef4444",
      green: "#22c55e",
      blue: "#3b82f6"
    }[t.toLowerCase()] || t}">${n}</span>`
  ).replace(/<language[^>]*>([\s\S]*?)<\/language>/gi, "$1");
}
function ts(r) {
  return lo.sanitize(r, {
    ALLOWED_TAGS: [
      "p",
      "br",
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
    ALLOWED_ATTR: ["style", "href", "target", "rel", "class"],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i
  });
}
function Un() {
  return Array.from({ length: 26 }, (r, e) => String.fromCharCode(97 + e));
}
function co(r, e) {
  const t = e && e.length > 0 ? e : Un();
  return t[r % t.length];
}
function rs(r, e) {
  const t = e && e.length > 0 ? e : Un(), n = (() => {
    const o = /* @__PURE__ */ new Map();
    let a = 0;
    return r.forEach((l, p) => {
      l.caller === "+" && (o.set(p, co(a, t)), a += 1);
    }), o;
  })();
  return (o, a) => {
    if (o === "+") {
      const l = n.get(a);
      return l || (console.warn(`Caller index ${a} out of range for '+' callers`), "?");
    }
    if (o !== "-")
      return o;
  };
}
function fo(r) {
  const e = [];
  if (!r || r.length === 0) return e;
  function t(n) {
    typeof n != "string" && (n.type === "note" ? e.push(n) : Array.isArray(n.content) && n.content.length > 0 && n.content.forEach(t));
  }
  return r.forEach(t), e;
}
function ns(r, e = {}) {
  const {
    splitterThicknessPx: t = 4,
    secondaryPaneMinSizePx: n = 20,
    mainPaneMinSizePx: o = 60,
    absoluteMinPercent: a = 3,
    absoluteMaxPercent: l = 90
  } = e, p = r - t;
  let d, f;
  return p < n + o ? (d = a, f = l) : (f = Math.min(
    Math.floor((p - o) / p * 100),
    l
  ), d = Math.min(
    Math.max(Math.ceil(n / p * 100), a),
    f
  )), { minPercent: d, maxPercent: f };
}
var po = Object.getOwnPropertyNames, ho = Object.getOwnPropertySymbols, mo = Object.prototype.hasOwnProperty;
function cn(r, e) {
  return function(n, o, a) {
    return r(n, o, a) && e(n, o, a);
  };
}
function ir(r) {
  return function(t, n, o) {
    if (!t || !n || typeof t != "object" || typeof n != "object")
      return r(t, n, o);
    var a = o.cache, l = a.get(t), p = a.get(n);
    if (l && p)
      return l === n && p === t;
    a.set(t, n), a.set(n, t);
    var d = r(t, n, o);
    return a.delete(t), a.delete(n), d;
  };
}
function fn(r) {
  return po(r).concat(ho(r));
}
var go = Object.hasOwn || function(r, e) {
  return mo.call(r, e);
};
function Mt(r, e) {
  return r === e || !r && !e && r !== r && e !== e;
}
var Eo = "__v", yo = "__o", bo = "_owner", pn = Object.getOwnPropertyDescriptor, hn = Object.keys;
function Ao(r, e, t) {
  var n = r.length;
  if (e.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!t.equals(r[n], e[n], n, n, r, e, t))
      return !1;
  return !0;
}
function vo(r, e) {
  return Mt(r.getTime(), e.getTime());
}
function Do(r, e) {
  return r.name === e.name && r.message === e.message && r.cause === e.cause && r.stack === e.stack;
}
function To(r, e) {
  return r === e;
}
function dn(r, e, t) {
  var n = r.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var o = new Array(n), a = r.entries(), l, p, d = 0; (l = a.next()) && !l.done; ) {
    for (var f = e.entries(), g = !1, h = 0; (p = f.next()) && !p.done; ) {
      if (o[h]) {
        h++;
        continue;
      }
      var E = l.value, A = p.value;
      if (t.equals(E[0], A[0], d, h, r, e, t) && t.equals(E[1], A[1], E[0], A[0], r, e, t)) {
        g = o[h] = !0;
        break;
      }
      h++;
    }
    if (!g)
      return !1;
    d++;
  }
  return !0;
}
var No = Mt;
function Co(r, e, t) {
  var n = hn(r), o = n.length;
  if (hn(e).length !== o)
    return !1;
  for (; o-- > 0; )
    if (!qn(r, e, t, n[o]))
      return !1;
  return !0;
}
function Xt(r, e, t) {
  var n = fn(r), o = n.length;
  if (fn(e).length !== o)
    return !1;
  for (var a, l, p; o-- > 0; )
    if (a = n[o], !qn(r, e, t, a) || (l = pn(r, a), p = pn(e, a), (l || p) && (!l || !p || l.configurable !== p.configurable || l.enumerable !== p.enumerable || l.writable !== p.writable)))
      return !1;
  return !0;
}
function wo(r, e) {
  return Mt(r.valueOf(), e.valueOf());
}
function So(r, e) {
  return r.source === e.source && r.flags === e.flags;
}
function mn(r, e, t) {
  var n = r.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var o = new Array(n), a = r.values(), l, p; (l = a.next()) && !l.done; ) {
    for (var d = e.values(), f = !1, g = 0; (p = d.next()) && !p.done; ) {
      if (!o[g] && t.equals(l.value, p.value, l.value, p.value, r, e, t)) {
        f = o[g] = !0;
        break;
      }
      g++;
    }
    if (!f)
      return !1;
  }
  return !0;
}
function Io(r, e) {
  var t = r.length;
  if (e.length !== t)
    return !1;
  for (; t-- > 0; )
    if (r[t] !== e[t])
      return !1;
  return !0;
}
function xo(r, e) {
  return r.hostname === e.hostname && r.pathname === e.pathname && r.protocol === e.protocol && r.port === e.port && r.hash === e.hash && r.username === e.username && r.password === e.password;
}
function qn(r, e, t, n) {
  return (n === bo || n === yo || n === Eo) && (r.$$typeof || e.$$typeof) ? !0 : go(e, n) && t.equals(r[n], e[n], n, n, r, e, t);
}
var Oo = "[object Arguments]", Mo = "[object Boolean]", ko = "[object Date]", Ro = "[object Error]", _o = "[object Map]", Po = "[object Number]", Lo = "[object Object]", Bo = "[object RegExp]", Fo = "[object Set]", Uo = "[object String]", qo = "[object URL]", $o = Array.isArray, gn = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, En = Object.assign, jo = Object.prototype.toString.call.bind(Object.prototype.toString);
function Vo(r) {
  var e = r.areArraysEqual, t = r.areDatesEqual, n = r.areErrorsEqual, o = r.areFunctionsEqual, a = r.areMapsEqual, l = r.areNumbersEqual, p = r.areObjectsEqual, d = r.arePrimitiveWrappersEqual, f = r.areRegExpsEqual, g = r.areSetsEqual, h = r.areTypedArraysEqual, E = r.areUrlsEqual;
  return function(b, v, F) {
    if (b === v)
      return !0;
    if (b == null || v == null)
      return !1;
    var R = typeof b;
    if (R !== typeof v)
      return !1;
    if (R !== "object")
      return R === "number" ? l(b, v, F) : R === "function" ? o(b, v, F) : !1;
    var O = b.constructor;
    if (O !== v.constructor)
      return !1;
    if (O === Object)
      return p(b, v, F);
    if ($o(b))
      return e(b, v, F);
    if (gn != null && gn(b))
      return h(b, v, F);
    if (O === Date)
      return t(b, v, F);
    if (O === RegExp)
      return f(b, v, F);
    if (O === Map)
      return a(b, v, F);
    if (O === Set)
      return g(b, v, F);
    var V = jo(b);
    return V === ko ? t(b, v, F) : V === Bo ? f(b, v, F) : V === _o ? a(b, v, F) : V === Fo ? g(b, v, F) : V === Lo ? typeof b.then != "function" && typeof v.then != "function" && p(b, v, F) : V === qo ? E(b, v, F) : V === Ro ? n(b, v, F) : V === Oo ? p(b, v, F) : V === Mo || V === Po || V === Uo ? d(b, v, F) : !1;
  };
}
function zo(r) {
  var e = r.circular, t = r.createCustomConfig, n = r.strict, o = {
    areArraysEqual: n ? Xt : Ao,
    areDatesEqual: vo,
    areErrorsEqual: Do,
    areFunctionsEqual: To,
    areMapsEqual: n ? cn(dn, Xt) : dn,
    areNumbersEqual: No,
    areObjectsEqual: n ? Xt : Co,
    arePrimitiveWrappersEqual: wo,
    areRegExpsEqual: So,
    areSetsEqual: n ? cn(mn, Xt) : mn,
    areTypedArraysEqual: n ? Xt : Io,
    areUrlsEqual: xo
  };
  if (t && (o = En({}, o, t(o))), e) {
    var a = ir(o.areArraysEqual), l = ir(o.areMapsEqual), p = ir(o.areObjectsEqual), d = ir(o.areSetsEqual);
    o = En({}, o, {
      areArraysEqual: a,
      areMapsEqual: l,
      areObjectsEqual: p,
      areSetsEqual: d
    });
  }
  return o;
}
function Ho(r) {
  return function(e, t, n, o, a, l, p) {
    return r(e, t, p);
  };
}
function Go(r) {
  var e = r.circular, t = r.comparator, n = r.createState, o = r.equals, a = r.strict;
  if (n)
    return function(d, f) {
      var g = n(), h = g.cache, E = h === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : h, A = g.meta;
      return t(d, f, {
        cache: E,
        equals: o,
        meta: A,
        strict: a
      });
    };
  if (e)
    return function(d, f) {
      return t(d, f, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: o,
        meta: void 0,
        strict: a
      });
    };
  var l = {
    cache: void 0,
    equals: o,
    meta: void 0,
    strict: a
  };
  return function(d, f) {
    return t(d, f, l);
  };
}
var Jo = Nt();
Nt({ strict: !0 });
Nt({ circular: !0 });
Nt({
  circular: !0,
  strict: !0
});
Nt({
  createInternalComparator: function() {
    return Mt;
  }
});
Nt({
  strict: !0,
  createInternalComparator: function() {
    return Mt;
  }
});
Nt({
  circular: !0,
  createInternalComparator: function() {
    return Mt;
  }
});
Nt({
  circular: !0,
  createInternalComparator: function() {
    return Mt;
  },
  strict: !0
});
function Nt(r) {
  r === void 0 && (r = {});
  var e = r.circular, t = e === void 0 ? !1 : e, n = r.createInternalComparator, o = r.createState, a = r.strict, l = a === void 0 ? !1 : a, p = zo(r), d = Vo(p), f = n ? n(d) : Ho(d);
  return Go({ circular: t, comparator: d, createState: o, equals: f, strict: l });
}
function Dr(r, e) {
  return Jo(r, e);
}
function Xo(r, e) {
  if (typeof r != typeof e) return !1;
  if (!r && !e) return !0;
  if (Array.isArray(r)) {
    const a = e, l = r;
    return a.length === 0 ? !0 : a.every((p) => l.includes(p));
  }
  if (typeof r != "object")
    return Dr(r, e);
  const t = e, n = r;
  let o = !0;
  return Object.keys(t).forEach((a) => {
    o && (Object.hasOwn(n, a) && Xo(n[a], t[a]) || (o = !1));
  }), o;
}
function yn(r, e, t) {
  return JSON.stringify(r, (o, a) => {
    let l = a;
    return e && (l = e(o, l)), l === void 0 && (l = null), l;
  }, t);
}
function Yo(r, e) {
  function t(o) {
    return Object.keys(o).forEach((a) => {
      o[a] === null ? o[a] = void 0 : typeof o[a] == "object" && (o[a] = t(o[a]));
    }), o;
  }
  const n = JSON.parse(r, e);
  if (n !== null)
    return typeof n == "object" ? t(n) : n;
}
function is(r) {
  try {
    const e = yn(r);
    return e === yn(Yo(e));
  } catch {
    return !1;
  }
}
const os = (r) => r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function as() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0].replace(/@posix$/i, "") : new Yn().resolvedOptions().locale;
}
function ss(r, e = 2) {
  if (r === 0) return "0 Bytes";
  const t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], n = Math.floor(Math.log(r) / Math.log(1024)), o = t[n];
  return `${new ni("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(r / 1024 ** n)} ${o}`;
}
const Ko = 1e3, $n = 60, jn = $n * 60, Wo = jn * 24;
function us(r, e, t = /* @__PURE__ */ new Date()) {
  const n = Math.floor((e.getTime() - t.getTime()) / Ko), o = Math.round(n / Wo);
  if (Math.abs(o) >= 1) return r.format(o, "day");
  const a = Math.round(n / jn);
  if (Math.abs(a) >= 1) return r.format(a, "hour");
  const l = Math.round(n / $n);
  return Math.abs(l) >= 1 ? r.format(l, "minute") : r.format(n, "second");
}
function ls(r, e, t, n, o = {
  year: "numeric",
  month: "short",
  day: "numeric"
}) {
  const a = /* @__PURE__ */ new Date(), l = new Date(a);
  l.setDate(l.getDate() - 1);
  const p = r.getDate() === a.getDate() && r.getMonth() === a.getMonth() && r.getFullYear() === a.getFullYear(), d = r.getDate() === l.getDate() && r.getMonth() === l.getMonth() && r.getFullYear() === l.getFullYear();
  return p ? e : d ? t : r.toLocaleString(n, o);
}
const cs = /* @__PURE__ */ new Set([
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
]), Sr = {
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
function ur(r) {
  r && Object.values(r).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && ur(e.properties);
    }
  });
}
ur(Sr);
const Qo = {
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
  $defs: Sr
};
Object.freeze(Qo);
const Zo = {
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
  $defs: Sr
};
Object.freeze(Zo);
const Vn = {
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
ur(Vn);
const ea = {
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
  $defs: Vn
};
Object.freeze(ea);
const ta = {
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
Object.freeze(ta);
const zn = {
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
ur(zn);
const ra = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: zn
};
Object.freeze(ra);
const na = "theme-styles";
function ia(r, e) {
  return `${r ? `${r}-` : ""}${e}`;
}
function fs(r, e) {
  return Object.fromEntries(
    Object.entries(r).map(([n, o]) => [
      n,
      o ? Object.fromEntries(
        Object.entries(o).map(([a, l]) => {
          var p;
          return [
            a,
            l ? {
              ...l,
              // Add the derived properties
              themeFamilyId: n,
              type: a,
              id: ia(n, a),
              cssVariables: {
                // Fill in the default css variables
                ...(p = e == null ? void 0 : e[a]) == null ? void 0 : p.cssVariables,
                ...l.cssVariables
              }
            } : void 0
          ];
        }).filter(([, a]) => !!a)
      ) : void 0
    ]).filter(([, n]) => !!n)
  );
}
function oa(r) {
  return `
.${r.id} {
${Object.entries(r.cssVariables).map(([e, t]) => `  --${e}: ${t};`).join(`
`)}
}
`;
}
function ps(r, e, t) {
  const n = e == null ? void 0 : e.dataset.themeId;
  n && this.document.body.classList.remove(n), this.document.body.classList.add(r.id), e && this.document.head.removeChild(e);
  const o = this.document.createElement("style");
  return o.id = `${na}${t ? `-${t}` : ""}`, o.dataset.themeId = r.id, o.textContent = oa(r), this.document.head.appendChild(o), o;
}
function Hn(r) {
  return Object.freeze(r), r == null || Object.getOwnPropertyNames(r).forEach(function(t) {
    // Need to make sure to avoid null, which is an object type
    // eslint-disable-next-line no-null/no-null
    r[t] !== null && (typeof r[t] == "object" || typeof r[t] == "function") && !Object.isFrozen(r[t]) && Hn(r[t]);
  }), r;
}
const Tr = Hn({
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
}), hs = Object.freeze({
  ...Tr,
  isSpaceAfterAttributeMarkersContent: !0,
  shouldOptionalClosingMarkersBePresent: !0
}), Yt = ["figure", "note", "sidebar", "table"];
Object.freeze(Yt);
const aa = /\u00A0/g, sa = /\w+(\d+)/, ua = /(\d+)-?(\d+)?/;
class H {
  constructor(e, t) {
    X(this, "usj");
    X(this, "markersMap");
    X(this, "shouldAllowInvisibleCharacters");
    // Cached properties
    X(this, "parentMapInternal");
    X(this, "fragmentsByIndexInUsfmInternal");
    X(this, "fragmentsByJsonPathInternal");
    X(this, "indicesInUsfmByVerseRefInternal");
    X(this, "usfmInternal");
    this.usj = e;
    const { markersMap: n, shouldAllowInvisibleCharacters: o } = t ?? {};
    if (n)
      this.markersMap = n, H.areUsjVersionsCompatible(this.usj.version, this.markersMap.version) || console.warn(
        `Warning: USJ provided has version ${this.usj.version}, but provided markers map has version ${this.markersMap.version}. This may cause unexpected issues when transforming between formats.`
      );
    else if (H.areUsjVersionsCompatible(this.usj.version, Tr.version))
      this.markersMap = Tr;
    else
      throw new Error(
        "USJ version is not 3.0 or 3.0.x! Not equipped to handle yet without passing in a markers map"
      );
    if (!this.markersMap.markersMapVersion.startsWith("1."))
      throw new Error(
        `Incompatible markers map version: ${this.markersMap.markersMapVersion}. This class only supports version 1.x.y`
      );
    this.shouldAllowInvisibleCharacters = o ?? !1;
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
    const t = qt({ path: e, json: this.usj, wrap: !0 });
    if (t === void 0 || t.length === 0) return;
    if (!Array.isArray(t[0])) return t[0];
    const n = qt({ path: e, json: this.usj, wrap: !1 });
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
    return typeof e == "object" && e.type === On && t.length === 0;
  }
  /**
   * Determine if a fragment is a marker, not a text content string or some kind of position
   * fragment that isn't actually a marker e.g. closing marker fragment
   */
  static isFragmentAMarker(e) {
    return !pe(e) && !("forMarker" in e);
  }
  // #endregion marker helper methods
  // #region Parent Maps
  static createParentMapInternal(e, t, n) {
    var o;
    n.set(e, t), e.content && n.set(e.content, e), (o = e.content) == null || o.forEach((a) => {
      typeof a == "object" && H.createParentMapInternal(a, e, n);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((t) => {
      typeof t == "object" && H.createParentMapInternal(t, this.usj, e);
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
    let o = e, a = n.get(o);
    for (; a !== void 0; ) {
      if (!a.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !a.content.find((l, p) => {
          if (l !== o) return !1;
          if (!a) throw new Error('undefined "tempParent" should not be possible');
          return t.unshift({ parent: a, index: p }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(o)}`);
      o = a, a = n.get(a);
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
    const t = qt.toPathArray(e);
    return H.jsonPathArrayToJsonPath(t);
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
    return `${H.convertWorkingStackToJsonPath(e)}['${t}']`;
  }
  convertJsonPathToWorkingStack(e) {
    const t = [];
    if (e === "$") return t;
    const n = e.match(/content\[(\d+)\]/g);
    if (!n) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let o = this.usj;
    return n.forEach((a, l) => {
      const p = /(\d+)/.exec(a);
      if (!p) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const d = parseInt(p[0], 10);
      if (t.push({ parent: o, index: d }), l + 1 < n.length) {
        if (typeof o == "string" || !o.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(o)}`);
        const f = o.content[d];
        if (typeof f == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(f)}`);
        o = f;
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
    return fo((e = this.usj) == null ? void 0 : e.content);
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
  static findNextMatchingNodeOrClosingFragmentUsingWorkingStack(e, t, n, o) {
    var p;
    let a = e;
    const l = t.length === 0 ? e : t[0].parent;
    if (!pe(l)) {
      if (n.includes(l.type)) return;
      let d;
      t.some((f) => {
        const g = f.parent.content[f.index];
        return !pe(g) && n.includes(g.type) ? (d = g, !0) : !1;
      }), d && (a = d);
    }
    for (; a !== void 0; ) {
      const d = typeof a == "object" && n.includes(a.type);
      if (!d && o(a, t)) return a;
      if (!d && typeof a == "object" && (((p = a.content) == null ? void 0 : p.length) ?? 0) > 0)
        t.push({ parent: a, index: 0 }), [a] = a.content;
      else {
        if (!d) {
          const f = typeof a == "object" ? { isClosingMarker: !0, forMarker: a } : void 0;
          if (f && o(f, t))
            return f;
        }
        for (a = void 0; t.length > 0; ) {
          const f = t.pop();
          if (f)
            if (f.index + 1 < f.parent.content.length) {
              f.index += 1, t.push(f), a = f.parent.content[f.index];
              break;
            } else {
              const g = {
                isClosingMarker: !0,
                forMarker: f.parent
              };
              if (o(g, t)) return g;
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
  static findNextMatchingNodeUsingWorkingStack(e, t, n, o) {
    return this.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      e,
      t,
      n,
      (l, p) => typeof l == "object" && "isClosingMarker" in l ? !1 : o(l, p)
    );
  }
  // #endregion Walk the node tree
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return H.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion Node -> JSONPath
  // #region USJ node -> SerializedVerseRef + offset in USFM
  nodeToUsfmVerseRefVerseLocation(e, t, n) {
    const { documentLocation: o } = this.nodeToUsjNodeAndDocumentLocation(
      e,
      t
    );
    return this.usjDocumentLocationToUsfmVerseRefVerseLocation(o, n);
  }
  // #endregion USJ node -> SerializedVerseRef + offset in USFM
  // #region USJ node -> USJ location
  nodeToUsjNodeAndDocumentLocation(e, t) {
    var a;
    let n;
    if (pe(e)) {
      if (t === void 0)
        throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
      const l = Array.isArray(t) ? this.parentMap.get(t) : t;
      if (l === void 0)
        throw new Error(`Cannot find parent for ${JSON.stringify(t)}`);
      n = this.createWorkingStack(l);
      const p = (a = l.content) == null ? void 0 : a.indexOf(e);
      if (p === void 0 || p < 0)
        throw new Error("Could not find index of node in parent for creating working stack");
      n.push({ parent: l, index: p });
    } else
      n = this.createWorkingStack(e);
    const o = H.convertNodeToUsjDocumentLocation(e, n);
    return {
      node: e,
      documentLocation: o
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
    const n = pe(t) ? this.findParent(e) : void 0;
    if (!n && pe(t))
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
    const { node: n, parent: o } = this.jsonPathToNodeAndParentIfString(e);
    return this.nodeToUsfmVerseRefVerseLocation(n, o, t);
  }
  usjDocumentLocationToUsfmVerseRefVerseLocation(e, t) {
    const n = this.findFragmentInfoAtUsjDocumentLocation(e);
    if (n === void 0)
      throw new Error(
        `Could not find fragment info at USJ document location while transforming to USFM verse location: ${JSON.stringify(
          e
        )}`
      );
    const o = this.getVerseRefForIndexInUsfm(n.indexInUsfm, t), a = this.getIndexInUsfmForVerseRef(o);
    return {
      verseRef: o,
      // Final USFM verse offset is the fragment's location relative to the verse plus whatever
      // offset is in the USJ location
      offset: n.indexInUsfm - a + H.getOffsetInUsjDocumentLocation(e)
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
    const t = Object.keys(this.indicesInUsfmByVerseRef), n = t.length === 0 || t.length === 1 && t[0] === Tt, o = n ? Tt : e;
    if (!this.indicesInUsfmByVerseRef[o])
      throw new Error(
        `Book ID ${e} not found in USJ! ${n ? `There seems to be no USJ content because there is no content in ${Tt} either` : `Book IDs in USJ: ${JSON.stringify(t)}`}`
      );
    return o;
  }
  /**
   * Gets the index in USFM of the start of the verse (the backslash on the verse marker or the
   * beginning of the chapter if verse 0 is provided)
   */
  getIndexInUsfmForVerseRef(e) {
    const t = this.getEffectiveBookId(e.book), o = this.indicesInUsfmByVerseRef[t][e.chapterNum];
    if (!o) throw new Error(`Could not find ${t} chapter ${e.chapterNum}`);
    const a = o[e.verseNum];
    if (a === void 0)
      throw new Error(`Verse ${e.verseNum} not found in ${t} ${e.chapterNum}`);
    return a;
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
    let o = 0, a, l = !1;
    for (; !l && o < n.length; ) {
      const [f, g] = n[o];
      if (g) {
        const h = Object.entries(g);
        let E = 0;
        for (; !l && E < h.length; ) {
          const [A, b] = h[E];
          if (b) {
            const v = Object.entries(b);
            let F = 0;
            for (; !l && F < v.length; ) {
              const [R, O] = v[F];
              if (O !== void 0) {
                if (e < O) {
                  if (!a)
                    throw new Error(
                      `Could not find verse ref for index in USFM ${e} less than the first known index ${O}`
                    );
                  l = !0;
                  break;
                }
                if (a = {
                  book: f,
                  chapterNum: parseInt(A, 10),
                  verseNum: parseInt(R, 10)
                }, e === O) {
                  l = !0;
                  break;
                }
              }
              F += 1;
            }
          }
          E += 1;
        }
      }
      o += 1;
    }
    if (!a)
      throw new Error(`Did not find any verse refs while looking for index in USFM ${e}`);
    if (a.book === Tt) {
      if (!t)
        throw new Error(
          `Could not find book ID and no book ID provided when finding USFM verse ref for index in USFM ${e}`
        );
      a.book = t;
    }
    const p = this.getIndexInUsfmForVerseRef(a), d = this.fragmentsByIndexInUsfm.get(p);
    return d && H.isFragmentAMarker(d.fragment) && d.fragment.type === At && d.fragment.number && d.fragment.number !== `${a.verseNum}` && (a.verse = d.fragment.number), a;
  }
  usfmVerseLocationToIndexInUsfm(e) {
    const { verseRef: t, offset: n } = H.usfmVerseLocationToUsfmVerseRefVerseLocation(e);
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
    const { verseRef: t, offset: n } = H.usfmVerseLocationToUsfmVerseRefVerseLocation(e), o = this.usfmVerseLocationToIndexInUsfm(e), { value: a } = this.fragmentsByIndexInUsfm.findClosestLessThanOrEqual(
      o
    ) ?? {
      value: void 0
    };
    if (!a)
      throw new Error(
        `Somehow, did not find anything at index in verse ${n} or below in ${t.book} ${t.chapterNum}:${t.verseNum}. Not sure how this would happen.`
      );
    const l = o - a.indexInUsfm;
    return {
      ...a.nodeAndDocumentLocation,
      documentLocation: H.moveUsjDocumentLocationToNewOffset(
        a.nodeAndDocumentLocation.documentLocation,
        l
      )
    };
  }
  usfmVerseLocationToUsjDocumentLocation(e) {
    return this.usfmVerseLocationToUsjNodeAndDocumentLocation(e).documentLocation;
  }
  static isUsjDocumentLocationForTextContent(e) {
    let t = e;
    if ("node" in e) {
      if (!pe(e.node)) return !1;
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
    let o = "", a = 0, l = 0, p = -1;
    const d = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    ), f = d.length > 0 ? {
      ...d[d.length - 1]
    } : void 0;
    if (H.findNextMatchingNodeUsingWorkingStack(
      e.node,
      d,
      Yt,
      (A, b) => {
        if (typeof A != "string") return !1;
        let v = A;
        const F = b[b.length - 1];
        if (f && H.areStackItemsShallowEqual(F, f)) {
          if (!("offset" in e.documentLocation))
            throw new Error(
              `Somehow 'offset' was not in text content string document location. This should not happen. ${JSON.stringify(e.documentLocation)}`
            );
          v = A.substring(e.documentLocation.offset), l += e.documentLocation.offset;
        }
        a += v.length, o = `${o}${v}`;
        const R = o.indexOf(t);
        return R < 0 ? (l += o.length, o.length > t.length && (o = o.substring(o.length - t.length)), l -= o.length, a > n) : (p = l + R, !0);
      }
    ), p < 0) return;
    a = 0;
    let g = 0, h = [];
    const E = H.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      Yt,
      (A, b) => typeof A != "string" || (a += A.length, a < p + 1) ? !1 : (g = p - a + A.length, h = b, !0)
    );
    if (!E) throw new Error("Internal error: inconsistent search results");
    if (!pe(E))
      throw new Error(
        `Somehow found non-string node while searching for strings: ${JSON.stringify(E)}`
      );
    return {
      node: E,
      documentLocation: {
        jsonPath: H.convertWorkingStackToJsonPath(h),
        offset: g
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
    }, o = [], a = new Rr();
    let l = 0, p = n.node;
    for (; p !== void 0; )
      p = H.findNextMatchingNodeUsingWorkingStack(
        n.node,
        this.convertJsonPathToWorkingStack(n.documentLocation.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (g, h) => (typeof g != "string" || (o.push(g), a.set(l, {
          node: g,
          documentLocation: {
            offset: 0,
            jsonPath: H.convertWorkingStackToJsonPath(h)
          }
        }), l += g.length), !1)
      );
    const d = o.join("");
    let f = e.exec(d);
    for (; f; ) {
      if (f[0].length > 0) {
        if (f.index < 0 || f.index >= d.length)
          throw new Error(`Match index out of bounds: ${f.index}`);
        const g = a.findClosestLessThanOrEqual(f.index);
        if (!g)
          throw new Error(`Internal error: no starting node found for index ${f.index}`);
        const h = {
          node: g.value.node,
          documentLocation: {
            jsonPath: g.value.documentLocation.jsonPath,
            offset: f.index - g.key
          }
        }, E = a.findClosestLessThanOrEqual(
          f.index + f[0].length - 1
        );
        if (!E)
          throw new Error(`Internal error: no ending node found for index ${f.index}`);
        const A = {
          node: E.value.node,
          documentLocation: {
            jsonPath: E.value.documentLocation.jsonPath,
            offset: f.index + f[0].length - E.key
          }
        };
        t.push({ text: f[0], start: h, end: A });
      }
      if (!e.global) break;
      f = e.exec(d);
    }
    return t;
  }
  // #endregion Search for text from a certain point
  // #region Extract text from a node + JSONPath + offset
  extractText(e, t) {
    let n = "", o = "offset" in e.documentLocation ? e.documentLocation.offset : 0, a = 0;
    return H.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      Yt,
      (l) => {
        if (typeof l != "string") return !1;
        if (o >= l.length)
          return o -= l.length, !1;
        let p = l;
        if (o > 0 && (p = p.substring(o), o = 0), a + p.length < t)
          return a += p.length, n = `${n}${p}`, !1;
        const d = t - a;
        return n = `${n}${p.substring(0, d - 1)}`, !0;
      }
    ), n;
  }
  extractTextBetweenPoints(e, t, n = 100) {
    let o = "";
    return H.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      Yt,
      (a, l) => a === t.node && (typeof a == "object" || t.documentLocation.jsonPath === H.convertWorkingStackToJsonPath(l)) ? !0 : typeof a != "string" ? !1 : (o = `${o}${a}`, o.length > n && (o = o.substring(0, n)), o.length >= n)
    ), o;
  }
  // #endregion Extract text from a node + JSONPath + offset
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, t) {
    let n = 0;
    for (let o = e.length - 1; o >= 0; o--) {
      const a = e[o];
      t(a) ? (e.splice(o, 1), n += 1) : typeof a != "string" && a.content && (n += this.removeContentNodesFromArray(a.content, t));
    }
    return n;
  }
  removeContentNodes(e) {
    const t = H.removeContentNodesFromArray(this.usj.content, e);
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
    const n = pe(e) ? e : (
      // Usj type has no `marker` property, but the Usj marker isn't really different than any other
      // marker with no `marker` property. It is appropriate to treat them the same to get the name
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      e.marker ?? e.type
    );
    let o = !1, a = this.getMarkerInfo(n);
    const l = (a == null ? void 0 : a.type) ?? (pe(e) ? "" : e.type);
    let p = n;
    if (a != null && a.markerUsfm && (p = a.markerUsfm, a = this.getMarkerInfo(p)), !a) {
      if (pe(e))
        throw new Error(`Unknown marker ${n} and no marker type provided`);
      a = { type: e.type }, o = !0, console.warn(
        `Unknown marker ${n}. Creating MarkerInfo to use: ${JSON.stringify(a)}`
      );
    }
    let d = a.type, f = this.markersMap.markerTypes[d];
    if (f != null && f.markerTypeUsfm && (d = f.markerTypeUsfm, f = this.markersMap.markerTypes[d]), !pe(e) && e.type !== l && (!f || e.type !== f.markerTypeUsfm && e.type !== f.markerTypeUsx && e.type !== f.markerTypeUsj) && (console.warn(
      `Warning: Mismatching marker type in the USJ content ${e.type} vs marker type in the marker info ${a.type} for marker ${n}. Using the type from the USJ content.`
    ), d = e.type, f = this.markersMap.markerTypes[d], o = !0), !f)
      throw new Error(
        `Unknown marker type ${d} on marker ${n}! Cannot proceed.`
      );
    o && d === "para" && (f = { ...f, hasNewlineBefore: !1 });
    const g = [];
    a.attributeMarkers && a.attributeMarkers.forEach((E) => {
      const A = this.getMarkerInfo(E);
      A && "attributeMarkerAttributeName" in A && g.push([E, A]);
    });
    const h = e;
    if (t === "usfm" && d === "cell" && h.colspan) {
      const E = parseInt(h.colspan, 10), A = sa.exec(n);
      if (A != null && A[1]) {
        const b = parseInt(A[1], 10);
        !Number.isNaN(b) && !Number.isNaN(E) && (p = `${n}-${b + E - 1}`, f = {
          ...f,
          skipOutputAttributeToUsfm: [
            ...f.skipOutputAttributeToUsfm ?? [],
            "colspan"
          ]
        });
      }
    }
    return {
      markerNameOriginal: n,
      markerName: p,
      markerInfo: a,
      markerType: d,
      markerTypeInfo: f,
      attributeMarkerInfoEntries: g
    };
  }
  /** Converts the text content of a marker to its equivalent in USFM */
  textContentToUsfm(e) {
    return {
      usfm: this.shouldAllowInvisibleCharacters ? e : e.replace(aa, "~"),
      fragmentsInfo: [{ fragment: e, indexInUsfm: 0 }]
    };
  }
  /**
   * Merge an independent array of fragment info into an existing array of fragment info, offsetting
   * the indices of the new fragments so their locations start from the end of the string
   */
  static mergeFragmentsInfoIntoExistingArray(e, t, n) {
    e.forEach((o) => {
      const a = n + o.indexInUsfm;
      t.push({
        ...o,
        indexInUsfm: a
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
    const o = [], { markerName: a, markerInfo: l, markerType: p, markerTypeInfo: d, attributeMarkerInfoEntries: f } = this.getInfoForMarker(e), g = e;
    d.hasNewlineBefore && (n += `
`);
    const h = t ? d.nestedPrefix ?? "" : "";
    return o.push({ fragment: e, indexInUsfm: n.length }), n += p === "optbreak" ? "//" : `\\${h}`, p !== "optbreak" && (o.push({
      fragment: { attributeValueForKey: "marker", forMarker: e },
      indexInUsfm: n.length
    }), n += `${a}${p === "unmatched" ? "" : " "}`), l.leadingAttributes && l.leadingAttributes.forEach((E) => {
      const A = g[E];
      A && (o.push({
        fragment: { attributeValueForKey: E, forMarker: e },
        indexInUsfm: n.length
      }), n += `${A} `);
    }), l.textContentAttribute && g[l.textContentAttribute] && (o.push({
      fragment: { attributeValueForKey: l.textContentAttribute, forMarker: e },
      indexInUsfm: n.length
    }), n += `${g[l.textContentAttribute]} `), l.attributeMarkers && f.forEach(([E, A]) => {
      const b = g[A.attributeMarkerAttributeName];
      if (!b) return;
      const v = {
        type: A.type,
        marker: E,
        content: [b]
      }, F = [];
      n = this.addMarkerUsfmToString(
        n,
        v,
        e,
        F
      );
      const { usfm: R } = this.textContentToUsfm(b);
      o.push({
        fragment: {
          attributeValueForKey: A.attributeMarkerAttributeName,
          forMarker: e
        },
        indexInUsfm: n.length
      }), n += R, n = this.addMarkerUsfmToString(
        n,
        {
          isClosingMarker: !0,
          forMarker: v
        },
        e,
        F
      ), F.forEach((O) => {
        if (pe(O.fragment) || "attributeKey" in O.fragment)
          throw new Error(
            `Attribute marker opening or closing markers generated a text content fragment or an attribute key fragment! This does not make sense. ${JSON.stringify(O)}`
          );
        if (H.isFragmentAMarker(O.fragment)) {
          o.push({
            ...O,
            fragment: {
              attributeMarker: A.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("attributeValueForKey" in O.fragment) {
          if (O.fragment.attributeValueForKey !== "marker")
            throw new Error(
              `Attribute marker opening or closing markers generated an attribute value fragment for a key that was not marker! This does not make sense. ${JSON.stringify(O)}`
            );
          o.push({
            ...O,
            fragment: {
              attributeKey: A.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("isClosingMarker" in O.fragment) {
          const { isClosingMarker: V, ...G } = O.fragment, he = {
            ...G,
            forMarker: e,
            attributeMarkerClosingMarker: A.attributeMarkerAttributeName
          };
          o.push({
            ...O,
            fragment: he
          });
          return;
        }
        throw new Error(
          `Attribute marker opening or closing markers generated an unrecognized fragment: ${JSON.stringify(O)}`
        );
      }), !this.markersMap.isSpaceAfterAttributeMarkersContent && A.hasStructuralSpaceAfterCloseAttributeMarker && (n += " ");
    }), { usfm: n, fragmentsInfo: o };
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
      markerName: o,
      markerInfo: a,
      markerType: l,
      markerTypeInfo: p,
      attributeMarkerInfoEntries: d
    } = this.getInfoForMarker(e), f = Object.keys(e).filter((b) => {
      var v, F;
      return !(b === "type" || b === "marker" || b === "content" || b === "closed" || (v = p.skipOutputAttributeToUsfm) != null && v.includes(b) || (F = a.leadingAttributes) != null && F.includes(b) || a.textContentAttribute === b || d.some(
        ([, R]) => R.attributeMarkerAttributeName === b
      ));
    }), g = e;
    if (p.isCloseable && a.independentClosingMarkers && a.independentClosingMarkers.length > 0)
      throw new Error(
        `Marker ${o} is intended to have a normal closing marker and independent closing markers. As of writing this code, there is no known syntax for this situation in USFM. Cannot proceed.`
      );
    let h = !0;
    if ((g.closed === "false" || a.isClosingMarkerOptional && !this.markersMap.shouldOptionalClosingMarkersBePresent && g.closed !== "true") && (h = !1), a.independentClosingMarkers && a.independentClosingMarkers.length > 0 && h) {
      const b = {
        type: l,
        marker: a.independentClosingMarkers[0],
        // Put all the closing marker attributes on here since we don't really have a better place
        // to put them and might as well
        ...Object.fromEntries(
          f.map((G) => [
            G,
            g[G]
          ])
        )
      };
      let v = "";
      const F = [], { usfm: R, fragmentsInfo: O } = this.openingMarkerToUsfm(b, t), V = O.find((G) => H.isFragmentAMarker(G.fragment));
      if (!V)
        throw new Error(
          `Could not find opening fragment info for independent closing marker ${JSON.stringify(
            b
          )}. Fragments info generated: ${JSON.stringify(O)}`
        );
      return F.push({
        ...V,
        fragment: { isClosingMarker: !0, forMarker: e }
      }), v += R, n !== b.marker && (v = this.addMarkerUsfmToString(
        v,
        {
          isClosingMarker: !0,
          forMarker: b
        },
        t
      )), { usfm: v, fragmentsInfo: F };
    }
    let E = "";
    const A = [];
    if (f.length > 0 && (E += "|", f.length === 1 && f[0] === a.defaultAttribute ? (A.push({
      fragment: { attributeValueForKey: a.defaultAttribute, forMarker: e },
      indexInUsfm: E.length
    }), E += g[a.defaultAttribute]) : f.forEach((b, v) => {
      const F = l === "figure" && b === "file" ? "src" : b;
      v > 0 && (E += " "), A.push({
        fragment: { attributeKey: b, forMarker: e },
        indexInUsfm: E.length
      }), E += `${F}="`, A.push({
        fragment: { attributeValueForKey: b, forMarker: e },
        indexInUsfm: E.length
      }), E += `${g[b]}"`;
    })), p.isCloseable && h) {
      const b = p.isClosingMarkerEmpty ? "" : o, v = t ? p.nestedPrefix ?? "" : "";
      A.push({
        fragment: { isClosingMarker: !0, forMarker: e },
        indexInUsfm: E.length
      }), E += `\\${v}${b}*`;
    }
    return { usfm: E, fragmentsInfo: A };
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
      (o) => o in e
    ));
  }
  /** Removes one space at the end of the string if present */
  static removeEndSpace(e) {
    return e.at(-1) !== " " ? e : e.slice(0, -1);
  }
  addMarkerUsfmToString(e, t, n, o) {
    let a = e, l, p;
    const { markerNameOriginal: d, markerType: f, markerTypeInfo: g } = this.getInfoForMarker(
      "isClosingMarker" in t ? t.forMarker : t
    );
    let h = !1;
    if (typeof n == "boolean")
      h = n;
    else if (n) {
      const { markerType: E } = this.getInfoForMarker(
        n
      );
      E === f && (h = !0);
    }
    if ("isClosingMarker" in t) {
      const { usfm: E, fragmentsInfo: A } = this.closingMarkerToUsfm(
        t.forMarker,
        h
      );
      p = A, l = E, g.isCloseable && g.isClosingMarkerEmpty && // No contents
      (!t.forMarker.content || t.forMarker.content.length === 0) && // No closing marker attributes
      !l.startsWith("|") && (a = H.removeEndSpace(a));
    } else {
      const { usfm: E, fragmentsInfo: A } = this.openingMarkerToUsfm(
        t,
        h
      );
      p = A, l = E;
    }
    if (l.startsWith(`
`) && (a.length === 0 ? (p = p.map((E) => ({
      ...E,
      indexInUsfm: E.indexInUsfm - 1
    })), l = l.substring(1)) : a = H.removeEndSpace(a)), this.markersMap.isSpaceAfterAttributeMarkersContent && d === "ca") {
      const E = a.lastIndexOf("\\");
      E >= 0 && e.substring(
        E + 1,
        E + 3
      ) === "c " && (a = H.removeEndSpace(a), a += `
 `);
    }
    return o && H.mergeFragmentsInfoIntoExistingArray(
      p,
      o,
      a.length
    ), a += l, a;
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
    const { jsonPath: o, ...a } = e, { jsonPath: l, ...p } = t;
    return !n && !Dr(qt.toPathArray(o), qt.toPathArray(l)) ? !1 : Dr(a, p);
  }
  /** Find the fragment info corresponding to the specified USJ Document location. */
  findFragmentInfoAtUsjDocumentLocation(e) {
    const t = H.moveUsjDocumentLocationToNewOffset(e, 0);
    let n;
    const o = this.fragmentsByJsonPath.get(
      H.normalizeJsonPath(e.jsonPath)
    );
    if (o)
      return o.find((a) => H.areUsjDocumentLocationsEqual(
        a.nodeAndDocumentLocation.documentLocation,
        t,
        // We already compared the JSONPaths by looking in the map for this JSONPath
        !0
      ) ? (n = a, !0) : !1), n;
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
    const o = H.convertWorkingStackToJsonPath(t);
    return pe(e) ? { jsonPath: o, offset: n } : { jsonPath: o };
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
    if (pe(e) || H.isFragmentAMarker(e)) {
      const o = H.convertNodeToUsjDocumentLocation(
        e,
        t,
        n
      );
      return {
        node: e,
        documentLocation: o
      };
    }
    if ("isClosingMarker" in e) {
      const a = {
        jsonPath: H.convertWorkingStackToJsonPath(t),
        closingMarkerOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: a
      };
    }
    if ("attributeValueForKey" in e) {
      const a = {
        jsonPath: H.convertWorkingStackAndPropertyToJsonPath(
          t,
          e.attributeValueForKey
        ),
        propertyOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: a
      };
    }
    if ("attributeKey" in e) {
      const a = {
        jsonPath: H.convertWorkingStackToJsonPath(t),
        keyName: e.attributeKey,
        keyOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: a
      };
    }
    if ("attributeMarker" in e) {
      const a = {
        jsonPath: H.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarker
      };
      return {
        node: e.forMarker,
        documentLocation: a
      };
    }
    if ("attributeMarkerClosingMarker" in e) {
      const a = {
        jsonPath: H.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarkerClosingMarker,
        keyClosingMarkerOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: a
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
  static transferFragmentsInfoArrayToMaps(e, t, n, o, a, l) {
    e.map((d) => {
      var g, h, E;
      if (typeof d.fragment == "object" && "type" in d.fragment) {
        const A = d.fragment;
        if (A.type === $i && A.code)
          n.bookId = A.code, n.chapterNum = 0, n.verseNum = 0, l[Tt] && (l[n.bookId] = l[Tt], delete l[Tt]);
        else if (A.type === en && A.number) {
          const b = parseInt(A.number, 10);
          if (Number.isNaN(b))
            console.warn(
              `Found ${en} type marker with number ${A.number}, but could not parse chapter number from it. Continuing using previous chapter number ${n.chapterNum}`
            );
          else {
            n.chapterNum = b, n.verseNum = 0;
            const v = l[n.bookId];
            v != null && v[0] && (v[n.chapterNum] = v[0], delete v[0]);
          }
        } else if (A.type === At && A.number) {
          const b = (g = ua.exec(A.number)) == null ? void 0 : g[1];
          if (!b)
            console.warn(
              `Found ${At} type marker with number ${A.number}, but could not find starting verse number in it. Continuing using previous verse number ${n.verseNum}`
            );
          else {
            const v = parseInt(b, 10);
            Number.isNaN(v) ? console.warn(
              `Found ${At} type marker with number ${A.number}, but could not parse starting verse number from ${b}. Continuing using previous verse number ${n.verseNum}`
            ) : (E = (h = l[n.bookId]) == null ? void 0 : h[n.chapterNum]) != null && E[v] ? console.warn(`Found ${At} marker with existing number ${v} after
                  current ${At} number ${n.verseNum}! Not updating verse start index. All positions in this duplicate verse will be based on the current ${At} marker, not the new duplicate marker.`) : (v < n.verseNum && console.debug(
              `Found ${At} marker with number ${v} lower than current ${At} number ${n.verseNum}. Verses are out of order. There may be some issues.`
            ), n.verseNum = v);
          }
        }
      }
      return {
        ...d,
        // Determine the appropriate `UsjDocumentLocation` subtype based on what this fragment is
        nodeAndDocumentLocation: H.convertFragmentToUsjNodeAndDocumentLocation(
          d.fragment,
          t
        )
      };
    }).forEach((d) => {
      o.set(d.indexInUsfm, d);
      const f = d.nodeAndDocumentLocation.documentLocation.jsonPath, g = a.get(f);
      g ? g.push(d) : a.set(f, [d]), l[n.bookId] || (l[n.bookId] = {}), l[n.bookId][n.chapterNum] || (l[n.bookId][n.chapterNum] = {}), l[n.bookId][n.chapterNum][n.verseNum] === void 0 && (l[n.bookId][n.chapterNum][n.verseNum] = d.indexInUsfm);
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
    const t = new Rr(), n = /* @__PURE__ */ new Map(), o = {}, a = [], l = {
      bookId: Tt,
      chapterNum: 0,
      verseNum: 0
    };
    function p(g) {
      H.transferFragmentsInfoArrayToMaps(
        a,
        g,
        l,
        t,
        n,
        o
      );
    }
    let d;
    const f = [];
    return H.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      this.usj,
      // Working stack is empty since the top-level object doesn't have any parents
      [],
      // Don't skip anything
      [],
      (g, h) => {
        if (typeof g != "object") {
          const { usfm: A, fragmentsInfo: b } = this.textContentToUsfm(g);
          return H.mergeFragmentsInfoIntoExistingArray(
            b,
            a,
            e.length
          ), p(h), e += A, !1;
        }
        let E;
        return h.length > 0 && (E = h[h.length - 1].parent), "isClosingMarker" in g ? f.length > 0 && f[f.length - 1] === g.forMarker ? (f.pop(), !1) : (e = this.addMarkerUsfmToString(
          e,
          g,
          E,
          a
        ), p(h), g.forMarker.type === "book" && d && (e = this.addMarkerUsfmToString(e, d, E, a), p(h), d = void 0), !1) : this.shouldSkipOutputMarkerToUsfm(g) ? (f.push(g), !1) : H.isTopLevelUsjMarker(g, h) && !d ? (g.version !== "3.0" && (d = g), !1) : (e = this.addMarkerUsfmToString(e, g, E, a), p(h), !1);
      }
    ), e = `${H.removeEndSpace(e)}
`, { usfm: e, fragmentsByIndexInUsfm: t, fragmentsByJsonPath: n, indicesInUsfmByVerseRef: o };
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
  Or as AsyncVariable,
  en as CHAPTER_TYPE,
  pa as Collator,
  Yn as DateTimeFormat,
  ei as DocumentCombiner,
  va as EventRollingTimeCounter,
  Mi as FIRST_SCR_BOOK_NUM,
  Ri as FIRST_SCR_CHAPTER_NUM,
  _i as FIRST_SCR_VERSE_NUM,
  ki as LAST_SCR_BOOK_NUM,
  cs as MODIFIER_KEYS,
  ri as Mutex,
  Da as MutexMap,
  Ta as NonValidatingDocumentCombiner,
  ni as NumberFormat,
  er as PLATFORM_ERROR_VERSION,
  Kn as PlatformEventEmitter,
  Na as PromiseChainingMap,
  Bi as Section,
  Rr as SortedNumberMap,
  Ca as SortedSet,
  na as THEME_STYLE_ELEMENT_ID,
  Tr as USFM_MARKERS_MAP_3_0,
  hs as USFM_MARKERS_MAP_PARATEXT_3_0,
  wa as UnsubscriberAsyncList,
  H as UsjReaderWriter,
  At as VERSE_TYPE,
  Za as aggregateUnsubscriberAsyncs,
  Qa as aggregateUnsubscribers,
  ps as applyThemeStylesheet,
  Wa as areUsjContentsEqualExceptWhitespace,
  tr as at,
  Bt as charAt,
  Oa as codePointAt,
  Ja as compareScrRefs,
  ya as createSyncProxyForAsyncObject,
  da as debounce,
  Kt as deepClone,
  Dr as deepEqual,
  $a as defaultScrRef,
  Yo as deserialize,
  Ti as endsWith,
  Mn as ensureArray,
  Ba as escapeStringRegexp,
  fs as expandThemeContribution,
  ss as formatBytes,
  ls as formatRelativeDate,
  Ma as formatReplacementString,
  Ci as formatReplacementStringToArray,
  Ya as formatScrRef,
  us as formatTimeSpan,
  Ea as getAllObjectFunctionNames,
  Pi as getChaptersForBook,
  as as getCurrentLocale,
  Un as getDefaultCallerSequence,
  bn as getErrorMessage,
  rs as getFormatCallerFunction,
  Li as getLocalizeKeyForScrollGroupId,
  Xa as getLocalizeKeysForScrollGroupIds,
  Ha as getLocalizedIdFromBookNumber,
  co as getNthCaller,
  ns as getPaneSizeLimits,
  Ka as getSectionForBook,
  oa as getStylesheetForTheme,
  ma as groupBy,
  os as htmlEncode,
  wi as includes,
  Qt as indexOf,
  ba as isErrorMessageAboutParatextBlockingInternetAccess,
  Aa as isErrorMessageAboutRegistryAuthFailure,
  La as isLocalizeKey,
  Ia as isPlatformError,
  is as isSerializable,
  pe as isString,
  Xo as isSubset,
  Lt as isWhiteSpace,
  Si as lastIndexOf,
  ea as localizedStringsDocumentSchema,
  ta as menuDocumentSchema,
  ha as newGuid,
  Sa as newPlatformError,
  ka as normalize,
  Wr as normalizeScriptureSpaces,
  ja as offsetBook,
  Va as offsetChapter,
  za as offsetVerse,
  Ra as ordinalCompare,
  _a as padEnd,
  Pa as padStart,
  es as parseParatextHtml,
  Qo as projectSettingsDocumentSchema,
  ts as sanitizeHtml,
  Ga as scrRefToBBBCCC,
  Yr as scrRefToBBBCCCVVV,
  yn as serialize,
  Zo as settingsDocumentSchema,
  Jr as slice,
  Xr as split,
  kn as startsWith,
  Me as stringLength,
  It as substring,
  ra as themeDocumentSchema,
  Ii as toArray,
  qa as toKebabCase,
  Ua as transformAndEnsureRegExpArray,
  Fa as transformAndEnsureRegExpRegExpArray,
  Zn as wait,
  ga as waitForDuration
};
//# sourceMappingURL=index.js.map
