var rn = Object.defineProperty;
var nn = (r, e, t) => e in r ? rn(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var j = (r, e, t) => nn(r, typeof e != "symbol" ? e + "" : e, t);
import { Mutex as on } from "async-mutex";
import { JSONPath as Ct } from "jsonpath-plus";
const kt = class kt {
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
      kt.verboseLoggingEnabled && console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
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
      kt.verboseLoggingEnabled && console.debug(`${this.variableName} is being rejected now with reason: ${e}`), this.rejecter(e), this.complete();
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
j(kt, "verboseLoggingEnabled", !1);
let Zt = kt;
class eo {
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
class an {
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
class sn {
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
function to() {
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
function ro(r, e = 300) {
  let t, n, s, a;
  return (...c) => (clearTimeout(t), n || (n = new Promise((p, h) => {
    s = p, a = h;
  })), t = setTimeout(async () => {
    try {
      s(await r(...c));
    } catch (p) {
      a(p);
    } finally {
      n = void 0;
    }
  }, e), n);
}
function no(r, e, t) {
  const n = /* @__PURE__ */ new Map();
  return r.forEach((s, a) => {
    const c = e(s, a), p = n.get(c), h = t ? t(s, c, a) : s;
    p ? p.push(h) : n.set(c, [h]);
  }), n;
}
function un(r) {
  return typeof r == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  r !== null && "message" in r && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof r.message == "string";
}
function cn(r) {
  if (un(r)) return r;
  try {
    return new Error(JSON.stringify(r));
  } catch {
    return new Error(String(r));
  }
}
function Br(r) {
  return cn(r).message;
}
function ln(r) {
  return new Promise((e) => setTimeout(e, r));
}
function io(r, e) {
  const t = ln(e).then(() => {
  });
  return Promise.any([t, r()]);
}
function oo(r, e = "obj") {
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
function ao(r, e = {}) {
  return new Proxy(e, {
    get(t, n) {
      return n in t ? t[n] : async (...s) => (await r())[n](...s);
    }
  });
}
function so(r) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return te(r) ? r.includes(e) : Br(r).includes(e);
}
function uo(r) {
  const e = "401 Unauthorized error while getting shared projects.", t = "User registration is not valid. Cannot retrieve resources from DBL.", n = te(r) ? r : Br(r);
  return n.includes(e) || n.includes(t);
}
class fn {
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
    j(this, "onDidRebuildEmitter", new sn());
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
    let s = this.options.copyDocuments && t ? xt(t) : t;
    s = this.transformContributionAfterValidation(e, s), this.contributions.set(e, s);
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
      let t = xt(this.baseDocument);
      return t = this.transformFinalOutputBeforeValidation(t), this.validateOutput(t), this.latestOutput = t, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((t) => {
      e = pn(
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
function pn(r, e, t) {
  const n = xt(r);
  return e ? Pr(n, xt(e), t) : n;
}
function Pr(r, e, t) {
  if (!e) return r;
  if (er(r, e)) {
    const n = r, s = e;
    Object.keys(s).forEach((a) => {
      if (Object.hasOwn(n, a)) {
        if (er(n[a], s[a]))
          n[a] = Pr(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            n[a],
            s[a],
            t
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (tr(n[a], s[a]))
          n[a] = n[a].concat(
            s[a]
          );
        else if (!t)
          throw new Error(`Cannot merge objects: key "${a}" already exists in the target object`);
      } else
        n[a] = s[a];
    });
  } else tr(r, e) && r.push(...e);
  return r;
}
class co {
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
class hn extends on {
}
class lo {
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
    return t || (t = new hn(), this.mutexesByID.set(e, t), t);
  }
}
class fo extends fn {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, t) {
    super(e, t);
  }
  get output() {
    return this.latestOutput;
  }
}
class dn {
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
const mn = Promise.resolve();
class po {
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
    const n = { promise: mn }, s = t.catch((a) => this.logger.warn(`Error in promise for ${e}: ${a.message}`)).finally(() => {
      this.map.get(e) === n.promise && this.map.delete(e);
    });
    n.promise = s, this.map.set(e, s);
  }
}
class rr {
  constructor() {
    j(this, "map", /* @__PURE__ */ new Map());
    j(this, "sortedKeys", []);
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
      const a = Math.floor((t + n) / 2);
      this.sortedKeys[a] <= e ? (s = a, t = a + 1) : n = a - 1;
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
class ho {
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
      const s = Math.floor((t + n) / 2);
      this.compareFn(this.items[s], e) < 0 ? t = s + 1 : n = s;
    }
    return t;
  }
}
class mo {
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
    return this.unsubscribers.clear(), t.every((n, s) => (n || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${s} failed!`), n));
  }
}
const Bt = 1;
function go(r) {
  if (!r) return { message: "", platformErrorVersion: Bt };
  if (te(r)) return { message: r, platformErrorVersion: Bt };
  if (typeof r == "object" && "message" in r && typeof r.message == "string") {
    const e = {
      message: r.message,
      platformErrorVersion: Bt
    };
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)), Object.defineProperty(e, "message", { enumerable: !0 }), "stack" in r && te(r.stack) && Object.defineProperty(e, "stack", { value: r.stack, enumerable: !0 }), "cause" in e && Object.defineProperty(e, "cause", { enumerable: !0 }), e;
  }
  return { cause: r, message: "", platformErrorVersion: Bt };
}
function Eo(r) {
  return !!r && typeof r == "object" && "platformErrorVersion" in r;
}
var gn = Object.defineProperty, En = (r, e, t) => e in r ? gn(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, H = (r, e, t) => En(r, typeof e != "symbol" ? e + "" : e, t);
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
], Rr = [
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
], nr = In();
function yt(r, e = !0) {
  return e && (r = r.toUpperCase()), r in nr ? nr[r] : 0;
}
function Ht(r) {
  return yt(r) > 0;
}
function yn(r) {
  const e = typeof r == "string" ? yt(r) : r;
  return e >= 40 && e <= 66;
}
function bn(r) {
  return (typeof r == "string" ? yt(r) : r) <= 39;
}
function Lr(r) {
  return r <= 66;
}
function vn(r) {
  const e = typeof r == "string" ? yt(r) : r;
  return Ur(e) && !Lr(e);
}
function* Dn() {
  for (let r = 1; r <= at.length; r++) yield r;
}
const An = 1, _r = at.length;
function Nn() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Xt(r, e = "***") {
  const t = r - 1;
  return t < 0 || t >= at.length ? e : at[t];
}
function Fr(r) {
  return r <= 0 || r > _r ? "******" : Rr[r - 1];
}
function Cn(r) {
  return Fr(yt(r));
}
function Ur(r) {
  const e = typeof r == "number" ? Xt(r) : r;
  return Ht(e) && !Gt.includes(e);
}
function Tn(r) {
  const e = typeof r == "number" ? Xt(r) : r;
  return Ht(e) && Gt.includes(e);
}
function wn(r) {
  return Rr[r - 1].includes("*obsolete*");
}
function In() {
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
  isBookNT: yn,
  isBookOT: bn,
  isBookOTNT: Lr,
  isBookDC: vn,
  allBookNumbers: Dn,
  firstBook: An,
  lastBook: _r,
  extraBooks: Nn,
  bookNumberToId: Xt,
  bookNumberToEnglishName: Fr,
  bookIdToEnglishName: Cn,
  isCanonical: Ur,
  isExtraMaterial: Tn,
  isObsolete: wn
};
var Le = /* @__PURE__ */ ((r) => (r[r.Unknown = 0] = "Unknown", r[r.Original = 1] = "Original", r[r.Septuagint = 2] = "Septuagint", r[r.Vulgate = 3] = "Vulgate", r[r.English = 4] = "English", r[r.RussianProtestant = 5] = "RussianProtestant", r[r.RussianOrthodox = 6] = "RussianOrthodox", r))(Le || {});
const we = class {
  // private versInfo: Versification;
  constructor(e) {
    if (H(this, "name"), H(this, "fullPath"), H(this, "isPresent"), H(this, "hasVerseSegments"), H(this, "isCustomized"), H(this, "baseVersification"), H(this, "scriptureBooks"), H(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = Le[e]) : (this._type = e, this.name = Le[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
H(we, "Original", new we(Le.Original)), H(we, "Septuagint", new we(Le.Septuagint)), H(we, "Vulgate", new we(Le.Vulgate)), H(we, "English", new we(Le.English)), H(we, "RussianProtestant", new we(Le.RussianProtestant)), H(we, "RussianOrthodox", new we(Le.RussianOrthodox));
let it = we;
function ir(r, e) {
  const t = e[0];
  for (let n = 1; n < e.length; n++)
    r = r.split(e[n]).join(t);
  return r.split(t);
}
var qr = /* @__PURE__ */ ((r) => (r[r.Valid = 0] = "Valid", r[r.UnknownVersification = 1] = "UnknownVersification", r[r.OutOfRange = 2] = "OutOfRange", r[r.VerseOutOfOrder = 3] = "VerseOutOfOrder", r[r.VerseRepeated = 4] = "VerseRepeated", r))(qr || {});
const ve = class W {
  constructor(e, t, n, s) {
    if (H(this, "firstChapter"), H(this, "lastChapter"), H(this, "lastVerse"), H(this, "hasSegmentsDefined"), H(this, "text"), H(this, "BBBCCCVVVS"), H(this, "longHashCode"), H(this, "versification"), H(this, "rtlMark", "‏"), H(this, "_bookNum", 0), H(this, "_chapterNum", 0), H(this, "_verseNum", 0), H(this, "_verse"), n == null && s == null)
      if (e != null && typeof e == "string") {
        const a = e, c = t != null && t instanceof it ? t : void 0;
        this.setEmpty(c), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = t != null && t instanceof it ? t : void 0;
        this.setEmpty(a), this._verseNum = e % W.chapterDigitShifter, this._chapterNum = Math.floor(
          e % W.bookDigitShifter / W.chapterDigitShifter
        ), this._bookNum = Math.floor(e / W.bookDigitShifter);
      } else if (t == null)
        if (e != null && e instanceof W) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null) return;
          const a = e instanceof it ? e : W.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && t != null && n != null)
      if (typeof e == "string" && typeof t == "string" && typeof n == "string")
        this.setEmpty(s), this.updateInternal(e, t, n);
      else if (typeof e == "number" && typeof t == "number" && typeof n == "number")
        this._bookNum = e, this._chapterNum = t, this._verseNum = n, this.versification = s ?? W.defaultVersification;
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
      if (n instanceof Tt)
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
    const { book: t, chapterNum: n, verseNum: s, verse: a, versificationStr: c } = e, p = a || s.toString();
    let h;
    return c && (h = new it(c)), t ? new W(t, n.toString(), p, h) : new W();
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
    for (let s = 0; s < e.length; s++) {
      if (n = e[s], n < "0" || n > "9")
        return s === 0 && (t = -1), { success: !1, vNum: t };
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
      throw new Tt(
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
      const a = e.split("/");
      if (e = a[0], a.length > 1)
        try {
          const c = +a[1].trim();
          this.versification = new it(Le[c]);
        } catch {
          throw new Tt("Invalid reference : " + e);
        }
    }
    const t = e.trim().split(" ");
    if (t.length !== 2)
      throw new Tt("Invalid reference : " + e);
    const n = t[1].split(":"), s = +n[0];
    if (n.length !== 2 || pe.bookIdToNumber(t[0]) === 0 || !Number.isInteger(s) || s < 0 || !W.isVerseParseable(n[1]))
      throw new Tt("Invalid reference : " + e);
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
    const s = [], a = ir(this._verse, n);
    for (const c of a.map((p) => ir(p, t))) {
      const p = this.clone();
      p.verse = c[0];
      const h = p.verseNum;
      if (s.push(p), c.length > 1) {
        const l = this.clone();
        if (l.verse = c[1], !e)
          for (let m = h + 1; m < l.verseNum; m++) {
            const f = new W(
              this._bookNum,
              this._chapterNum,
              m,
              this.versification
            );
            this.isExcluded || s.push(f);
          }
        s.push(l);
      }
    }
    return s;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, t) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const s of this.allVerses(!0, e, t)) {
      const a = s.internalValid;
      if (a !== 0)
        return a;
      const c = s.BBBCCCVVV;
      if (n > c)
        return 3;
      if (n === c)
        return 4;
      n = c;
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
H(ve, "defaultVersification", it.English), H(ve, "verseRangeSeparator", "-"), H(ve, "verseSequenceIndicator", ","), H(ve, "verseRangeSeparators", [ve.verseRangeSeparator]), H(ve, "verseSequenceIndicators", [ve.verseSequenceIndicator]), H(ve, "chapterDigitShifter", 1e3), H(ve, "bookDigitShifter", ve.chapterDigitShifter * ve.chapterDigitShifter), H(ve, "bcvMaxValue", ve.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
H(ve, "ValidStatusType", qr);
let $r = ve;
class Tt extends Error {
}
var X = {}, fe = {}, or;
function bt() {
  if (or) return fe;
  or = 1;
  function r(S, T, $) {
    if ($ === void 0 && ($ = Array.prototype), S && typeof $.find == "function")
      return $.find.call(S, T);
    for (var Q = 0; Q < S.length; Q++)
      if (t(S, Q)) {
        var se = S[Q];
        if (T.call(void 0, se, Q, S))
          return se;
      }
  }
  function e(S, T) {
    return T === void 0 && (T = Object), T && typeof T.getOwnPropertyDescriptors == "function" && (S = T.create(null, T.getOwnPropertyDescriptors(S))), T && typeof T.freeze == "function" ? T.freeze(S) : S;
  }
  function t(S, T) {
    return Object.prototype.hasOwnProperty.call(S, T);
  }
  function n(S, T) {
    if (S === null || typeof S != "object")
      throw new TypeError("target is not an object");
    for (var $ in T)
      t(T, $) && (S[$] = T[$]);
    return S;
  }
  var s = e({
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
  function a(S) {
    return t(s, S.toLowerCase());
  }
  var c = e({
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
  function p(S) {
    return t(c, S.toLowerCase());
  }
  var h = e({
    script: !1,
    style: !1,
    textarea: !0,
    title: !0
  });
  function l(S) {
    var T = S.toLowerCase();
    return t(h, T) && !h[T];
  }
  function m(S) {
    var T = S.toLowerCase();
    return t(h, T) && h[T];
  }
  function f(S) {
    return S === b.HTML;
  }
  function g(S) {
    return f(S) || S === b.XML_XHTML_APPLICATION;
  }
  var b = e({
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
  }), y = Object.keys(b).map(function(S) {
    return b[S];
  });
  function v(S) {
    return y.indexOf(S) > -1;
  }
  var O = e({
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
  return fe.assign = n, fe.find = r, fe.freeze = e, fe.HTML_BOOLEAN_ATTRIBUTES = s, fe.HTML_RAW_TEXT_ELEMENTS = h, fe.HTML_VOID_ELEMENTS = c, fe.hasDefaultHTMLNamespace = g, fe.hasOwn = t, fe.isHTMLBooleanAttribute = a, fe.isHTMLRawTextElement = l, fe.isHTMLEscapableRawTextElement = m, fe.isHTMLMimeType = f, fe.isHTMLVoidElement = p, fe.isValidMimeType = v, fe.MIME_TYPE = b, fe.NAMESPACE = O, fe;
}
var mt = {}, ar;
function Lt() {
  if (ar) return mt;
  ar = 1;
  var r = bt();
  function e(g, b) {
    g.prototype = Object.create(Error.prototype, {
      constructor: { value: g },
      name: { value: g.name, enumerable: !0, writable: b }
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
  function s(g) {
    return typeof g == "number" && g >= 1 && g <= 25;
  }
  function a(g) {
    return typeof g == "string" && g.substring(g.length - t.Error.length) === t.Error;
  }
  function c(g, b) {
    s(g) ? (this.name = n[g], this.message = b || "") : (this.message = g, this.name = a(b) ? b : t.Error), Error.captureStackTrace && Error.captureStackTrace(this, c);
  }
  e(c, !0), Object.defineProperties(c.prototype, {
    code: {
      enumerable: !0,
      get: function() {
        var g = n.indexOf(this.name);
        return s(g) ? g : 0;
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
  }, h = Object.entries(p), l = 0; l < h.length; l++) {
    var m = h[l][0];
    c[m] = h[l][1];
  }
  function f(g, b) {
    this.message = g, this.locator = b, Error.captureStackTrace && Error.captureStackTrace(this, f);
  }
  return e(f), mt.DOMException = c, mt.DOMExceptionName = t, mt.ExceptionCode = p, mt.ParseError = f, mt;
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
  function s(ae) {
    var ge = this;
    return new RegExp(
      Array.prototype.slice.call(arguments).map(function(Fe) {
        var Ue = typeof Fe == "string";
        if (Ue && ge === void 0 && Fe === "|")
          throw new Error("use regg instead of reg to wrap expressions with `|`!");
        return Ue ? Fe : Fe.source;
      }).join(""),
      e ? "mu" : "m"
    );
  }
  function a(ae) {
    if (arguments.length === 0)
      throw new Error("no parameters provided");
    return s.apply(a, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var c = "�", p = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  e && (p = s("[", t(p), "\\u{10000}-\\u{10FFFF}", "]"));
  var h = /[\x20\x09\x0D\x0A]/, l = t(h), m = s(h, "+"), f = s(h, "*"), g = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  e && (g = s("[", t(g), "\\u{10000}-\\u{10FFFF}", "]"));
  var b = t(g), y = s("[", b, t(/[-.0-9\xB7]/), t(/[\u0300-\u036F\u203F-\u2040]/), "]"), v = s(g, y, "*"), O = s(y, "+"), S = s("&", v, ";"), T = a(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), $ = a(S, "|", T), Q = s("%", v, ";"), se = a(
    s('"', a(/[^%&"]/, "|", Q, "|", $), "*", '"'),
    "|",
    s("'", a(/[^%&']/, "|", Q, "|", $), "*", "'")
  ), D = a('"', a(/[^<&"]/, "|", $), "*", '"', "|", "'", a(/[^<&']/, "|", $), "*", "'"), B = n(g, ":"), q = n(y, ":"), G = s(B, q, "*"), Z = s(G, a(":", G), "?"), ne = s("^", Z, "$"), ke = s("(", Z, ")"), ie = a(/"[^"]*"|'[^']*'/), Oe = s(/^<\?/, "(", v, ")", a(m, "(", p, "*?)"), "?", /\?>/), E = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, C = a('"', E, '*"', "|", "'", n(E, "'"), "*'"), x = "<!--", w = "-->", P = s(x, a(n(p, "-"), "|", s("-", n(p, "-"))), "*", w), N = "#PCDATA", R = a(
    s(/\(/, f, N, a(f, /\|/, f, Z), "*", f, /\)\*/),
    "|",
    s(/\(/, f, N, f, /\)/)
  ), Y = /[?*+]?/, L = s(
    /\([^>]+\)/,
    Y
    /*regg(choice, '|', seq), _children_quantity*/
  ), I = a("EMPTY", "|", "ANY", "|", R, "|", L), M = "<!ELEMENT", U = s(M, m, a(Z, "|", Q), m, a(I, "|", Q), f, ">"), J = s("NOTATION", m, /\(/, f, v, a(f, /\|/, f, v), "*", f, /\)/), de = s(/\(/, f, O, a(f, /\|/, f, O), "*", f, /\)/), Ie = a(J, "|", de), De = a(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", Ie), ue = a(/#REQUIRED|#IMPLIED/, "|", a(a("#FIXED", m), "?", D)), _ = a(m, v, m, De, m, ue), je = "<!ATTLIST", Be = s(je, m, v, _, "*", f, ">"), me = "about:legacy-compat", Ve = a('"' + me + '"', "|", "'" + me + "'"), Pe = "SYSTEM", Se = "PUBLIC", _e = a(a(Pe, m, ie), "|", a(Se, m, C, m, ie)), He = s(
    "^",
    a(
      a(Pe, m, "(?<SystemLiteralOnly>", ie, ")"),
      "|",
      a(Se, m, "(?<PubidLiteral>", C, ")", m, "(?<SystemLiteral>", ie, ")")
    )
  ), Xe = a(m, "NDATA", m, v), Ce = a(se, "|", a(_e, Xe, "?")), ee = "<!ENTITY", ze = s(ee, m, v, m, Ce, f, ">"), ce = a(se, "|", _e), Ye = s(ee, m, "%", m, v, m, ce, f, ">"), vt = a(ze, "|", Ye), Ke = s(Se, m, C), We = s("<!NOTATION", m, v, m, a(_e, "|", Ke), f, ">"), V = s(f, "=", f), re = /1[.]\d+/, Ae = s(m, "version", V, a("'", re, "'", "|", '"', re, '"')), Ne = /[A-Za-z][-A-Za-z0-9._]*/, Qe = a(m, "encoding", V, a('"', Ne, '"', "|", "'", Ne, "'")), ct = a(m, "standalone", V, a("'", a("yes", "|", "no"), "'", "|", '"', a("yes", "|", "no"), '"')), lt = s(/^<\?xml/, Ae, Qe, "?", ct, "?", f, /\?>/), ft = "<!DOCTYPE", Dt = "<![CDATA[", At = "]]>", pt = /<!\[CDATA\[/, Ze = /\]\]>/, ht = s(p, "*?", Ze), Ot = s(pt, ht);
  return z.chars = t, z.chars_without = n, z.detectUnicodeSupport = r, z.reg = s, z.regg = a, z.ABOUT_LEGACY_COMPAT = me, z.ABOUT_LEGACY_COMPAT_SystemLiteral = Ve, z.AttlistDecl = Be, z.CDATA_START = Dt, z.CDATA_END = At, z.CDSect = Ot, z.Char = p, z.Comment = P, z.COMMENT_START = x, z.COMMENT_END = w, z.DOCTYPE_DECL_START = ft, z.elementdecl = U, z.EntityDecl = vt, z.EntityValue = se, z.ExternalID = _e, z.ExternalID_match = He, z.Name = v, z.NotationDecl = We, z.Reference = $, z.PEReference = Q, z.PI = Oe, z.PUBLIC = Se, z.PubidLiteral = C, z.QName = Z, z.QName_exact = ne, z.QName_group = ke, z.S = m, z.SChar_s = l, z.S_OPT = f, z.SYSTEM = Pe, z.SystemLiteral = ie, z.UNICODE_REPLACEMENT_CHARACTER = c, z.UNICODE_SUPPORT = e, z.XMLDecl = lt, z;
}
var ur;
function Vr() {
  if (ur) return oe;
  ur = 1;
  var r = bt(), e = r.find, t = r.hasDefaultHTMLNamespace, n = r.hasOwn, s = r.isHTMLMimeType, a = r.isHTMLRawTextElement, c = r.isHTMLVoidElement, p = r.MIME_TYPE, h = r.NAMESPACE, l = Symbol(), m = Lt(), f = m.DOMException, g = m.DOMExceptionName, b = jr();
  function y(i) {
    if (i !== l)
      throw new TypeError("Illegal constructor");
  }
  function v(i) {
    return i !== "";
  }
  function O(i) {
    return i ? i.split(/[\t\n\f\r ]+/).filter(v) : [];
  }
  function S(i, o) {
    return n(i, o) || (i[o] = !0), i;
  }
  function T(i) {
    if (!i) return [];
    var o = O(i);
    return Object.keys(o.reduce(S, {}));
  }
  function $(i) {
    return function(o) {
      return i && i.indexOf(o) !== -1;
    };
  }
  function Q(i) {
    if (!b.QName_exact.test(i))
      throw new f(f.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + i + '"');
  }
  function se(i, o) {
    Q(o), i = i || null;
    var u = null, d = o;
    if (o.indexOf(":") >= 0) {
      var A = o.split(":");
      u = A[0], d = A[1];
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
    return [i, u, d];
  }
  function D(i, o) {
    for (var u in i)
      n(i, u) && (o[u] = i[u]);
  }
  function B(i, o) {
    var u = i.prototype;
    if (!(u instanceof o)) {
      let d = function() {
      };
      d.prototype = o.prototype, d = new d(), D(u, d), i.prototype = u = d;
    }
    u.constructor != i && (typeof i != "function" && console.error("unknown Class:" + i), u.constructor = i);
  }
  var q = {}, G = q.ELEMENT_NODE = 1, Z = q.ATTRIBUTE_NODE = 2, ne = q.TEXT_NODE = 3, ke = q.CDATA_SECTION_NODE = 4, ie = q.ENTITY_REFERENCE_NODE = 5, Oe = q.ENTITY_NODE = 6, E = q.PROCESSING_INSTRUCTION_NODE = 7, C = q.COMMENT_NODE = 8, x = q.DOCUMENT_NODE = 9, w = q.DOCUMENT_TYPE_NODE = 10, P = q.DOCUMENT_FRAGMENT_NODE = 11, N = q.NOTATION_NODE = 12, R = r.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function Y(i, o) {
    if (o.length < i.length) return Y(o, i);
    var u = null;
    for (var d in i) {
      if (i[d] !== o[d]) return u;
      u = i[d];
    }
    return u;
  }
  function L(i) {
    return i.guid || (i.guid = Math.random()), i.guid;
  }
  function I() {
  }
  I.prototype = {
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
  }, I.prototype[Symbol.iterator] = function() {
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
    this._node = i, this._refresh = o, U(this);
  }
  function U(i) {
    var o = i._node._inc || i._node.ownerDocument._inc;
    if (i._inc !== o) {
      var u = i._refresh(i._node);
      if (Wt(i, "length", u.length), !i.$$length || u.length < i.$$length)
        for (var d = u.length; d in i; d++)
          n(i, d) && delete i[d];
      D(u, i), i._inc = o;
    }
  }
  M.prototype.item = function(i) {
    return U(this), this[i] || null;
  }, B(M, I);
  function J() {
  }
  function de(i, o) {
    for (var u = 0; u < i.length; ) {
      if (i[u] === o)
        return u;
      u++;
    }
  }
  function Ie(i, o, u, d) {
    if (d ? o[de(o, d)] = u : (o[o.length] = u, o.length++), i) {
      u.ownerElement = i;
      var A = i.ownerDocument;
      A && (d && Pe(A, i, d), Ve(A, i, u));
    }
  }
  function De(i, o, u) {
    var d = de(o, u);
    if (d >= 0) {
      for (var A = o.length - 1; d <= A; )
        o[d] = o[++d];
      if (o.length = A, i) {
        var k = i.ownerDocument;
        k && Pe(k, i, u), u.ownerElement = null;
      }
    }
  }
  J.prototype = {
    length: 0,
    item: I.prototype.item,
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
        var d = this[u];
        if (d.localName === o && d.namespaceURI === i)
          return d;
        u++;
      }
      return null;
    }
  }, J.prototype[Symbol.iterator] = function() {
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
      var d = p.XML_APPLICATION;
      i === h.HTML ? d = p.XML_XHTML_APPLICATION : i === h.SVG && (d = p.XML_SVG_IMAGE);
      var A = new me(l, { contentType: d });
      if (A.implementation = this, A.childNodes = new I(), A.doctype = u || null, u && A.appendChild(u), o) {
        var k = A.createElementNS(i, o);
        A.appendChild(k);
      }
      return A;
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
    createDocumentType: function(i, o, u, d) {
      Q(i);
      var A = new ft(l);
      return A.name = i, A.nodeName = i, A.publicId = o || "", A.systemId = u || "", A.internalSubset = d || "", A.childNodes = new I(), A;
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
      var o = new me(l, { contentType: p.HTML });
      if (o.implementation = this, o.childNodes = new I(), i !== !1) {
        o.doctype = this.createDocumentType("html"), o.doctype.ownerDocument = o, o.appendChild(o.doctype);
        var u = o.createElement("html");
        o.appendChild(u);
        var d = o.createElement("head");
        if (u.appendChild(d), typeof i == "string") {
          var A = o.createElement("title");
          A.appendChild(o.createTextNode(i)), d.appendChild(A);
        }
        u.appendChild(o.createElement("body"));
      }
      return o;
    }
  };
  function _(i) {
    y(i);
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
      return _e(this, i);
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
      return Ut(this.ownerDocument || this, this, i);
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
          for (var d in u)
            if (n(u, d) && u[d] === i)
              return d;
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
      var o = i, u = this, d = null, A = null;
      if (o instanceof Ae && (d = o, o = d.ownerElement), u instanceof Ae && (A = u, u = A.ownerElement, d && o && u === o))
        for (var k = 0, K; K = u.attributes[k]; k++) {
          if (K === d)
            return R.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + R.DOCUMENT_POSITION_PRECEDING;
          if (K === A)
            return R.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + R.DOCUMENT_POSITION_FOLLOWING;
        }
      if (!o || !u || u.ownerDocument !== o.ownerDocument)
        return R.DOCUMENT_POSITION_DISCONNECTED + R.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (L(u.ownerDocument) > L(o.ownerDocument) ? R.DOCUMENT_POSITION_FOLLOWING : R.DOCUMENT_POSITION_PRECEDING);
      if (A && o === u)
        return R.DOCUMENT_POSITION_CONTAINS + R.DOCUMENT_POSITION_PRECEDING;
      if (d && o === u)
        return R.DOCUMENT_POSITION_CONTAINED_BY + R.DOCUMENT_POSITION_FOLLOWING;
      for (var le = [], Ee = o.parentNode; Ee; ) {
        if (!A && Ee === u)
          return R.DOCUMENT_POSITION_CONTAINED_BY + R.DOCUMENT_POSITION_FOLLOWING;
        le.push(Ee), Ee = Ee.parentNode;
      }
      le.reverse();
      for (var Te = [], be = u.parentNode; be; ) {
        if (!d && be === o)
          return R.DOCUMENT_POSITION_CONTAINS + R.DOCUMENT_POSITION_PRECEDING;
        Te.push(be), be = be.parentNode;
      }
      Te.reverse();
      var et = Y(le, Te);
      for (var qe in et.childNodes) {
        var xe = et.childNodes[qe];
        if (xe === u) return R.DOCUMENT_POSITION_FOLLOWING;
        if (xe === o) return R.DOCUMENT_POSITION_PRECEDING;
        if (Te.indexOf(xe) >= 0) return R.DOCUMENT_POSITION_FOLLOWING;
        if (le.indexOf(xe) >= 0) return R.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function je(i) {
    return i == "<" && "&lt;" || i == ">" && "&gt;" || i == "&" && "&amp;" || i == '"' && "&quot;" || "&#" + i.charCodeAt() + ";";
  }
  D(q, _), D(q, _.prototype), D(R, _), D(R, _.prototype);
  function Be(i, o) {
    if (o(i))
      return !0;
    if (i = i.firstChild)
      do
        if (Be(i, o))
          return !0;
      while (i = i.nextSibling);
  }
  function me(i, o) {
    y(i);
    var u = o || {};
    this.ownerDocument = this, this.contentType = u.contentType || p.XML_APPLICATION, this.type = s(this.contentType) ? "html" : "xml";
  }
  function Ve(i, o, u) {
    i && i._inc++;
    var d = u.namespaceURI;
    d === h.XMLNS && (o._nsMap[u.prefix ? u.localName : ""] = u.value);
  }
  function Pe(i, o, u, d) {
    i && i._inc++;
    var A = u.namespaceURI;
    A === h.XMLNS && delete o._nsMap[u.prefix ? u.localName : ""];
  }
  function Se(i, o, u) {
    if (i && i._inc) {
      i._inc++;
      var d = o.childNodes;
      if (u && !u.nextSibling)
        d[d.length++] = u;
      else {
        for (var A = o.firstChild, k = 0; A; )
          d[k++] = A, A = A.nextSibling;
        d.length = k, delete d[d.length];
      }
    }
  }
  function _e(i, o) {
    if (i !== o.parentNode)
      throw new f(f.NOT_FOUND_ERR, "child's parent is not parent");
    var u = o.previousSibling, d = o.nextSibling;
    return u ? u.nextSibling = d : i.firstChild = d, d ? d.previousSibling = u : i.lastChild = u, Se(i.ownerDocument, i), o.parentNode = null, o.previousSibling = null, o.nextSibling = null, o;
  }
  function He(i) {
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
    var d = e(u, Ce);
    return !(o && d && u.indexOf(d) > u.indexOf(o));
  }
  function Ye(i, o) {
    var u = i.childNodes || [];
    function d(k) {
      return ee(k) && k !== o;
    }
    if (e(u, d))
      return !1;
    var A = e(u, Ce);
    return !(o && A && u.indexOf(A) > u.indexOf(o));
  }
  function vt(i, o, u) {
    if (!He(i))
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
  function Ke(i, o, u) {
    var d = i.childNodes || [], A = o.childNodes || [];
    if (o.nodeType === _.DOCUMENT_FRAGMENT_NODE) {
      var k = A.filter(ee);
      if (k.length > 1 || e(A, ze))
        throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (k.length === 1 && !ce(i, u))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (ee(o) && !ce(i, u))
      throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (Ce(o)) {
      if (e(d, Ce))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var K = e(d, ee);
      if (u && d.indexOf(K) < d.indexOf(u))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      if (!u && K)
        throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
  function We(i, o, u) {
    var d = i.childNodes || [], A = o.childNodes || [];
    if (o.nodeType === _.DOCUMENT_FRAGMENT_NODE) {
      var k = A.filter(ee);
      if (k.length > 1 || e(A, ze))
        throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (k.length === 1 && !Ye(i, u))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (ee(o) && !Ye(i, u))
      throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (Ce(o)) {
      if (e(d, function(Ee) {
        return Ce(Ee) && Ee !== u;
      }))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var K = e(d, ee);
      if (u && d.indexOf(K) < d.indexOf(u))
        throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
  function V(i, o, u, d) {
    vt(i, o, u), i.nodeType === _.DOCUMENT_NODE && (d || Ke)(i, o, u);
    var A = o.parentNode;
    if (A && A.removeChild(o), o.nodeType === P) {
      var k = o.firstChild;
      if (k == null)
        return o;
      var K = o.lastChild;
    } else
      k = K = o;
    var le = u ? u.previousSibling : i.lastChild;
    k.previousSibling = le, K.nextSibling = u, le ? le.nextSibling = k : i.firstChild = k, u == null ? i.lastChild = K : u.previousSibling = K;
    do
      k.parentNode = i;
    while (k !== K && (k = k.nextSibling));
    return Se(i.ownerDocument || i, i, o), o.nodeType == P && (o.firstChild = o.lastChild = null), o;
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
    nodeType: x,
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
      if (i.nodeType === P) {
        for (var u = i.firstChild; u; ) {
          var d = u.nextSibling;
          this.insertBefore(u, o), u = d;
        }
        return i;
      }
      return V(this, i, o), i.ownerDocument = this, this.documentElement === null && i.nodeType === G && (this.documentElement = i), i;
    },
    removeChild: function(i) {
      var o = _e(this, i);
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
      return Be(this.documentElement, function(u) {
        if (u.nodeType == G && u.getAttribute("id") == i)
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
      var o = new re(l);
      o.ownerDocument = this, this.type === "html" && (i = i.toLowerCase()), t(this.contentType) && (o.namespaceURI = h.HTML), o.nodeName = i, o.tagName = i, o.localName = i, o.childNodes = new I();
      var u = o.attributes = new J();
      return u._ownerElement = o, o;
    },
    /**
     * @returns {DocumentFragment}
     */
    createDocumentFragment: function() {
      var i = new Ze(l);
      return i.ownerDocument = this, i.childNodes = new I(), i;
    },
    /**
     * @param {string} data
     * @returns {Text}
     */
    createTextNode: function(i) {
      var o = new Qe(l);
      return o.ownerDocument = this, o.childNodes = new I(), o.appendData(i), o;
    },
    /**
     * @param {string} data
     * @returns {Comment}
     */
    createComment: function(i) {
      var o = new ct(l);
      return o.ownerDocument = this, o.childNodes = new I(), o.appendData(i), o;
    },
    /**
     * @param {string} data
     * @returns {CDATASection}
     */
    createCDATASection: function(i) {
      var o = new lt(l);
      return o.ownerDocument = this, o.childNodes = new I(), o.appendData(i), o;
    },
    /**
     * @param {string} target
     * @param {string} data
     * @returns {ProcessingInstruction}
     */
    createProcessingInstruction: function(i, o) {
      var u = new ht(l);
      return u.ownerDocument = this, u.childNodes = new I(), u.nodeName = u.target = i, u.nodeValue = u.data = o, u;
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
      if (!b.QName_exact.test(i))
        throw new f(f.INVALID_CHARACTER_ERR, 'invalid character in name "' + i + '"');
      return this.type === "html" && (i = i.toLowerCase()), this._createAttribute(i);
    },
    _createAttribute: function(i) {
      var o = new Ae(l);
      return o.ownerDocument = this, o.childNodes = new I(), o.name = i, o.nodeName = i, o.localName = i, o.specified = !0, o;
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
      if (!b.Name.test(i))
        throw new f(f.INVALID_CHARACTER_ERR, 'not a valid xml name "' + i + '"');
      if (this.type === "html")
        throw new f("document is an html document", g.NotSupportedError);
      var o = new pt(l);
      return o.ownerDocument = this, o.childNodes = new I(), o.nodeName = i, o;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Element}
     */
    createElementNS: function(i, o) {
      var u = se(i, o), d = new re(l), A = d.attributes = new J();
      return d.childNodes = new I(), d.ownerDocument = this, d.nodeName = o, d.tagName = o, d.namespaceURI = u[0], d.prefix = u[1], d.localName = u[2], A._ownerElement = d, d;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Attr}
     */
    createAttributeNS: function(i, o) {
      var u = se(i, o), d = new Ae(l);
      return d.ownerDocument = this, d.childNodes = new I(), d.nodeName = o, d.name = o, d.specified = !0, d.namespaceURI = u[0], d.prefix = u[1], d.localName = u[2], d;
    }
  }, B(me, _);
  function re(i) {
    y(i), this._nsMap = /* @__PURE__ */ Object.create(null);
  }
  re.prototype = {
    nodeType: G,
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
      return this.ownerDocument.type === "html" && this.namespaceURI === h.HTML;
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
      var d = se(i, o), A = d[2], k = this.getAttributeNodeNS(i, A);
      k ? k.value = k.nodeValue = "" + u : (k = this.ownerDocument.createAttributeNS(i, o), k.value = k.nodeValue = "" + u, this.setAttributeNode(k));
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
      var o = T(i);
      return new M(this, function(u) {
        var d = [];
        return o.length > 0 && Be(u, function(A) {
          if (A !== u && A.nodeType === G) {
            var k = A.getAttribute("class");
            if (k) {
              var K = i === k;
              if (!K) {
                var le = T(k);
                K = o.every($(le));
              }
              K && d.push(A);
            }
          }
        }), d;
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
      var o = (this.nodeType === x ? this : this.ownerDocument).type === "html", u = i.toLowerCase();
      return new M(this, function(d) {
        var A = [];
        return Be(d, function(k) {
          if (!(k === d || k.nodeType !== G))
            if (i === "*")
              A.push(k);
            else {
              var K = k.getQualifiedName(), le = o && k.namespaceURI === h.HTML ? u : i;
              K === le && A.push(k);
            }
        }), A;
      });
    },
    getElementsByTagNameNS: function(i, o) {
      return new M(this, function(u) {
        var d = [];
        return Be(u, function(A) {
          A !== u && A.nodeType === G && (i === "*" || A.namespaceURI === i) && (o === "*" || A.localName == o) && d.push(A);
        }), d;
      });
    }
  }, me.prototype.getElementsByClassName = re.prototype.getElementsByClassName, me.prototype.getElementsByTagName = re.prototype.getElementsByTagName, me.prototype.getElementsByTagNameNS = re.prototype.getElementsByTagNameNS, B(re, _);
  function Ae(i) {
    y(i), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
  }
  Ae.prototype.nodeType = Z, B(Ae, _);
  function Ne(i) {
    y(i);
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
      var d = this.data.substring(0, i), A = this.data.substring(i + o);
      u = d + u + A, this.nodeValue = this.data = u, this.length = u.length;
    }
  }, B(Ne, _);
  function Qe(i) {
    y(i);
  }
  Qe.prototype = {
    nodeName: "#text",
    nodeType: ne,
    splitText: function(i) {
      var o = this.data, u = o.substring(i);
      o = o.substring(0, i), this.data = this.nodeValue = o, this.length = o.length;
      var d = this.ownerDocument.createTextNode(u);
      return this.parentNode && this.parentNode.insertBefore(d, this.nextSibling), d;
    }
  }, B(Qe, Ne);
  function ct(i) {
    y(i);
  }
  ct.prototype = {
    nodeName: "#comment",
    nodeType: C
  }, B(ct, Ne);
  function lt(i) {
    y(i);
  }
  lt.prototype = {
    nodeName: "#cdata-section",
    nodeType: ke
  }, B(lt, Qe);
  function ft(i) {
    y(i);
  }
  ft.prototype.nodeType = w, B(ft, _);
  function Dt(i) {
    y(i);
  }
  Dt.prototype.nodeType = N, B(Dt, _);
  function At(i) {
    y(i);
  }
  At.prototype.nodeType = Oe, B(At, _);
  function pt(i) {
    y(i);
  }
  pt.prototype.nodeType = ie, B(pt, _);
  function Ze(i) {
    y(i);
  }
  Ze.prototype.nodeName = "#document-fragment", Ze.prototype.nodeType = P, B(Ze, _);
  function ht(i) {
    y(i);
  }
  ht.prototype.nodeType = E, B(ht, Ne);
  function Ot() {
  }
  Ot.prototype.serializeToString = function(i, o) {
    return ae.call(i, o);
  }, _.prototype.toString = ae;
  function ae(i) {
    var o = [], u = this.nodeType === x && this.documentElement || this, d = u.prefix, A = u.namespaceURI;
    if (A && d == null) {
      var d = u.lookupPrefix(A);
      if (d == null)
        var k = [
          { namespace: A, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return Ue(this, o, i, k), o.join("");
  }
  function ge(i, o, u) {
    var d = i.prefix || "", A = i.namespaceURI;
    if (!A || d === "xml" && A === h.XML || A === h.XMLNS)
      return !1;
    for (var k = u.length; k--; ) {
      var K = u[k];
      if (K.prefix === d)
        return K.namespace !== A;
    }
    return !0;
  }
  function Fe(i, o, u) {
    i.push(" ", o, '="', u.replace(/[<>&"\t\n\r]/g, je), '"');
  }
  function Ue(i, o, u, d) {
    d || (d = []);
    var A = i.nodeType === x ? i : i.ownerDocument, k = A.type === "html";
    if (u)
      if (i = u(i), i) {
        if (typeof i == "string") {
          o.push(i);
          return;
        }
      } else
        return;
    switch (i.nodeType) {
      case G:
        var K = i.attributes, le = K.length, ye = i.firstChild, Ee = i.tagName, Te = Ee;
        if (!k && !i.prefix && i.namespaceURI) {
          for (var be, et = 0; et < K.length; et++)
            if (K.item(et).name === "xmlns") {
              be = K.item(et).value;
              break;
            }
          if (!be)
            for (var qe = d.length - 1; qe >= 0; qe--) {
              var xe = d[qe];
              if (xe.prefix === "" && xe.namespace === i.namespaceURI) {
                be = xe.namespace;
                break;
              }
            }
          if (be !== i.namespaceURI)
            for (var qe = d.length - 1; qe >= 0; qe--) {
              var xe = d[qe];
              if (xe.namespace === i.namespaceURI) {
                xe.prefix && (Te = xe.prefix + ":" + Ee);
                break;
              }
            }
        }
        o.push("<", Te);
        for (var tt = 0; tt < le; tt++) {
          var Re = K.item(tt);
          Re.prefix == "xmlns" ? d.push({
            prefix: Re.localName,
            namespace: Re.value
          }) : Re.nodeName == "xmlns" && d.push({ prefix: "", namespace: Re.value });
        }
        for (var tt = 0; tt < le; tt++) {
          var Re = K.item(tt);
          if (ge(Re, k, d)) {
            var rt = Re.prefix || "", Nt = Re.namespaceURI;
            Fe(o, rt ? "xmlns:" + rt : "xmlns", Nt), d.push({ prefix: rt, namespace: Nt });
          }
          Ue(Re, o, u, d);
        }
        if (Ee === Te && ge(i, k, d)) {
          var rt = i.prefix || "", Nt = i.namespaceURI;
          Fe(o, rt ? "xmlns:" + rt : "xmlns", Nt), d.push({ prefix: rt, namespace: Nt });
        }
        var qt = !ye;
        if (qt && (k || i.namespaceURI === h.HTML) && (qt = c(Ee)), qt)
          o.push("/>");
        else {
          if (o.push(">"), k && a(Ee))
            for (; ye; )
              ye.data ? o.push(ye.data) : Ue(ye, o, u, d.slice()), ye = ye.nextSibling;
          else
            for (; ye; )
              Ue(ye, o, u, d.slice()), ye = ye.nextSibling;
          o.push("</", Te, ">");
        }
        return;
      case x:
      case P:
        for (var ye = i.firstChild; ye; )
          Ue(ye, o, u, d.slice()), ye = ye.nextSibling;
        return;
      case Z:
        return Fe(o, i.name, i.value);
      case ne:
        return o.push(i.data.replace(/[<&>]/g, je));
      case ke:
        return o.push(b.CDATA_START, i.data, b.CDATA_END);
      case C:
        return o.push(b.COMMENT_START, i.data, b.COMMENT_END);
      case w:
        var Qt = i.publicId, dt = i.systemId;
        o.push(b.DOCTYPE_DECL_START, " ", i.name), Qt ? (o.push(" ", b.PUBLIC, " ", Qt), dt && dt !== "." && o.push(" ", dt)) : dt && dt !== "." && o.push(" ", b.SYSTEM, " ", dt), i.internalSubset && o.push(" [", i.internalSubset, "]"), o.push(">");
        return;
      case E:
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
    var d;
    switch (o.nodeType) {
      case G:
        d = o.cloneNode(!1), d.ownerDocument = i;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case P:
        break;
      case Z:
        u = !0;
        break;
    }
    if (d || (d = o.cloneNode(!1)), d.ownerDocument = i, d.parentNode = null, u)
      for (var A = o.firstChild; A; )
        d.appendChild(Kt(i, A, u)), A = A.nextSibling;
    return d;
  }
  function Ut(i, o, u) {
    var d = new o.constructor(l);
    for (var A in o)
      if (n(o, A)) {
        var k = o[A];
        typeof k != "object" && k != d[A] && (d[A] = k);
      }
    switch (o.childNodes && (d.childNodes = new I()), d.ownerDocument = i, d.nodeType) {
      case G:
        var K = o.attributes, le = d.attributes = new J(), Ee = K.length;
        le._ownerElement = d;
        for (var Te = 0; Te < Ee; Te++)
          d.setAttributeNode(Ut(i, K.item(Te), !0));
        break;
      case Z:
        u = !0;
    }
    if (u)
      for (var be = o.firstChild; be; )
        d.appendChild(Ut(i, be, u)), be = be.nextSibling;
    return d;
  }
  function Wt(i, o, u) {
    i[o] = u;
  }
  try {
    if (Object.defineProperty) {
      let i = function(o) {
        switch (o.nodeType) {
          case G:
          case P:
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
          return U(this), this.$$length;
        }
      }), Object.defineProperty(_.prototype, "textContent", {
        get: function() {
          return i(this);
        },
        set: function(o) {
          switch (this.nodeType) {
            case G:
            case P:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (o || String(o)) && this.appendChild(this.ownerDocument.createTextNode(o));
              break;
            default:
              this.data = o, this.value = o, this.nodeValue = o;
          }
        }
      }), Wt = function(o, u, d) {
        o["$$" + u] = d;
      };
    }
  } catch {
  }
  return oe._updateLiveList = U, oe.Attr = Ae, oe.CDATASection = lt, oe.CharacterData = Ne, oe.Comment = ct, oe.Document = me, oe.DocumentFragment = Ze, oe.DocumentType = ft, oe.DOMImplementation = ue, oe.Element = re, oe.Entity = At, oe.EntityReference = pt, oe.LiveNodeList = M, oe.NamedNodeMap = J, oe.Node = _, oe.NodeList = I, oe.Notation = Dt, oe.Text = Qe, oe.ProcessingInstruction = ht, oe.XMLSerializer = Ot, oe;
}
var nt = {}, $t = {}, cr;
function Sn() {
  return cr || (cr = 1, function(r) {
    var e = bt().freeze;
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
var wt = {}, lr;
function xn() {
  if (lr) return wt;
  lr = 1;
  var r = bt(), e = jr(), t = Lt(), n = r.isHTMLEscapableRawTextElement, s = r.isHTMLMimeType, a = r.isHTMLRawTextElement, c = r.hasOwn, p = r.NAMESPACE, h = t.ParseError, l = t.DOMException, m = 0, f = 1, g = 2, b = 3, y = 4, v = 5, O = 6, S = 7;
  function T() {
  }
  T.prototype = {
    parse: function(E, C, x) {
      var w = this.domBuilder;
      w.startDocument(), G(C, C = /* @__PURE__ */ Object.create(null)), Q(E, C, x, w, this.errorHandler), w.endDocument();
    }
  };
  var $ = /&#?\w+;?/g;
  function Q(E, C, x, w, P) {
    var N = s(w.mimeType);
    E.indexOf(e.UNICODE_REPLACEMENT_CHARACTER) >= 0 && P.warning("Unicode replacement character detected, source encoding issues?");
    function R(V) {
      if (V > 65535) {
        V -= 65536;
        var re = 55296 + (V >> 10), Ae = 56320 + (V & 1023);
        return String.fromCharCode(re, Ae);
      } else
        return String.fromCharCode(V);
    }
    function Y(V) {
      var re = V[V.length - 1] === ";" ? V : V + ";";
      if (!N && re !== V)
        return P.error("EntityRef: expecting ;"), V;
      var Ae = e.Reference.exec(re);
      if (!Ae || Ae[0].length !== re.length)
        return P.error("entity not matching Reference production: " + V), V;
      var Ne = re.slice(1, -1);
      return c(x, Ne) ? x[Ne] : Ne.charAt(0) === "#" ? R(parseInt(Ne.substring(1).replace("x", "0x"))) : (P.error("entity not found:" + V), V);
    }
    function L(V) {
      if (V > ue) {
        var re = E.substring(ue, V).replace($, Y);
        J && de(ue), w.characters(re, 0, V - ue), ue = V;
      }
    }
    var I = 0, M = 0, U = /\r\n?|\n|$/g, J = w.locator;
    function de(V, re) {
      for (; V >= M && (re = U.exec(E)); )
        I = M, M = re.index + re[0].length, J.lineNumber++;
      J.columnNumber = V - I + 1;
    }
    for (var Ie = [{ currentNSMap: C }], De = [], ue = 0; ; ) {
      try {
        var _ = E.indexOf("<", ue);
        if (_ < 0) {
          if (!N && De.length > 0)
            return P.fatalError("unclosed xml tag(s): " + De.join(", "));
          if (!E.substring(ue).match(/^\s*$/)) {
            var je = w.doc, Be = je.createTextNode(E.substring(ue));
            if (je.documentElement)
              return P.error("Extra content at the end of the document");
            je.appendChild(Be), w.currentElement = Be;
          }
          return;
        }
        if (_ > ue) {
          var me = E.substring(ue, _);
          !N && De.length === 0 && (me = me.replace(new RegExp(e.S_OPT.source, "g"), ""), me && P.error("Unexpected content outside root element: '" + me + "'")), L(_);
        }
        switch (E.charAt(_ + 1)) {
          case "/":
            var ce = E.indexOf(">", _ + 2), Ve = E.substring(_ + 2, ce > 0 ? ce : void 0);
            if (!Ve)
              return P.fatalError("end tag name missing");
            var Pe = ce > 0 && e.reg("^", e.QName_group, e.S_OPT, "$").exec(Ve);
            if (!Pe)
              return P.fatalError('end tag name contains invalid characters: "' + Ve + '"');
            if (!w.currentElement && !w.doc.documentElement)
              return;
            var Se = De[De.length - 1] || w.currentElement.tagName || w.doc.documentElement.tagName || "";
            if (Se !== Pe[1]) {
              var _e = Pe[1].toLowerCase();
              if (!N || Se.toLowerCase() !== _e)
                return P.fatalError('Opening and ending tag mismatch: "' + Se + '" != "' + Ve + '"');
            }
            var He = Ie.pop();
            De.pop();
            var Xe = He.localNSMap;
            if (w.endElement(He.uri, He.localName, Se), Xe)
              for (var Ce in Xe)
                c(Xe, Ce) && w.endPrefixMapping(Ce);
            ce++;
            break;
          // end element
          case "?":
            J && de(_), ce = ie(E, _, w, P);
            break;
          case "!":
            J && de(_), ce = ke(E, _, w, P, N);
            break;
          default:
            J && de(_);
            var ee = new Oe(), ze = Ie[Ie.length - 1].currentNSMap, ce = D(E, _, ee, ze, Y, P, N), Ye = ee.length;
            if (ee.closed || (N && r.isHTMLVoidElement(ee.tagName) ? ee.closed = !0 : De.push(ee.tagName)), J && Ye) {
              for (var vt = se(J, {}), Ke = 0; Ke < Ye; Ke++) {
                var We = ee[Ke];
                de(We.offset), We.locator = se(J, {});
              }
              w.locator = vt, B(ee, w, ze) && Ie.push(ee), w.locator = J;
            } else
              B(ee, w, ze) && Ie.push(ee);
            N && !ee.closed ? ce = q(E, ce, ee.tagName, Y, w) : ce++;
        }
      } catch (V) {
        if (V instanceof h)
          throw V;
        if (V instanceof l)
          throw new h(V.name + ": " + V.message, w.locator, V);
        P.error("element parse error: " + V), ce = -1;
      }
      ce > ue ? ue = ce : L(Math.max(_, ue) + 1);
    }
  }
  function se(E, C) {
    return C.lineNumber = E.lineNumber, C.columnNumber = E.columnNumber, C;
  }
  function D(E, C, x, w, P, N, R) {
    function Y(de, Ie, De) {
      if (c(x.attributeNames, de))
        return N.fatalError("Attribute " + de + " redefined");
      if (!R && Ie.indexOf("<") >= 0)
        return N.fatalError("Unescaped '<' not allowed in attributes values");
      x.addValue(
        de,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        Ie.replace(/[\t\n\r]/g, " ").replace($, P),
        De
      );
    }
    for (var L, I, M = ++C, U = m; ; ) {
      var J = E.charAt(M);
      switch (J) {
        case "=":
          if (U === f)
            L = E.slice(C, M), U = b;
          else if (U === g)
            U = b;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (U === b || U === f)
            if (U === f && (N.warning('attribute value must after "="'), L = E.slice(C, M)), C = M + 1, M = E.indexOf(J, C), M > 0)
              I = E.slice(C, M), Y(L, I, C - 1), U = v;
            else
              throw new Error("attribute value no end '" + J + "' match");
          else if (U == y)
            I = E.slice(C, M), Y(L, I, C), N.warning('attribute "' + L + '" missed start quot(' + J + ")!!"), C = M + 1, U = v;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (U) {
            case m:
              x.setTagName(E.slice(C, M));
            case v:
            case O:
            case S:
              U = S, x.closed = !0;
            case y:
            case f:
              break;
            case g:
              x.closed = !0;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return N.error("unexpected end of input"), U == m && x.setTagName(E.slice(C, M)), M;
        case ">":
          switch (U) {
            case m:
              x.setTagName(E.slice(C, M));
            case v:
            case O:
            case S:
              break;
            //normal
            case y:
            //Compatible state
            case f:
              I = E.slice(C, M), I.slice(-1) === "/" && (x.closed = !0, I = I.slice(0, -1));
            case g:
              U === g && (I = L), U == y ? (N.warning('attribute "' + I + '" missed quot(")!'), Y(L, I, C)) : (R || N.warning('attribute "' + I + '" missed value!! "' + I + '" instead!!'), Y(I, I, C));
              break;
            case b:
              if (!R)
                return N.fatalError(`AttValue: ' or " expected`);
          }
          return M;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          J = " ";
        default:
          if (J <= " ")
            switch (U) {
              case m:
                x.setTagName(E.slice(C, M)), U = O;
                break;
              case f:
                L = E.slice(C, M), U = g;
                break;
              case y:
                var I = E.slice(C, M);
                N.warning('attribute "' + I + '" missed quot(")!!'), Y(L, I, C);
              case v:
                U = O;
                break;
            }
          else
            switch (U) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case g:
                R || N.warning('attribute "' + L + '" missed value!! "' + L + '" instead2!!'), Y(L, L, C), C = M, U = f;
                break;
              case v:
                N.warning('attribute space is required"' + L + '"!!');
              case O:
                U = f, C = M;
                break;
              case b:
                U = y, C = M;
                break;
              case S:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      M++;
    }
  }
  function B(E, C, x) {
    for (var w = E.tagName, P = null, U = E.length; U--; ) {
      var N = E[U], R = N.qName, Y = N.value, J = R.indexOf(":");
      if (J > 0)
        var L = N.prefix = R.slice(0, J), I = R.slice(J + 1), M = L === "xmlns" && I;
      else
        I = R, L = null, M = R === "xmlns" && "";
      N.localName = I, M !== !1 && (P == null && (P = /* @__PURE__ */ Object.create(null), G(x, x = /* @__PURE__ */ Object.create(null))), x[M] = P[M] = Y, N.uri = p.XMLNS, C.startPrefixMapping(M, Y));
    }
    for (var U = E.length; U--; )
      N = E[U], N.prefix && (N.prefix === "xml" && (N.uri = p.XML), N.prefix !== "xmlns" && (N.uri = x[N.prefix]));
    var J = w.indexOf(":");
    J > 0 ? (L = E.prefix = w.slice(0, J), I = E.localName = w.slice(J + 1)) : (L = null, I = E.localName = w);
    var de = E.uri = x[L || ""];
    if (C.startElement(de, I, w, E), E.closed) {
      if (C.endElement(de, I, w), P)
        for (L in P)
          c(P, L) && C.endPrefixMapping(L);
    } else
      return E.currentNSMap = x, E.localNSMap = P, !0;
  }
  function q(E, C, x, w, P) {
    var N = n(x);
    if (N || a(x)) {
      var R = E.indexOf("</" + x + ">", C), Y = E.substring(C + 1, R);
      return N && (Y = Y.replace($, w)), P.characters(Y, 0, Y.length), R;
    }
    return C + 1;
  }
  function G(E, C) {
    for (var x in E)
      c(E, x) && (C[x] = E[x]);
  }
  function Z(E, C) {
    var x = C;
    function w(M) {
      return M = M || 0, E.charAt(x + M);
    }
    function P(M) {
      M = M || 1, x += M;
    }
    function N() {
      for (var M = 0; x < E.length; ) {
        var U = w();
        if (U !== " " && U !== `
` && U !== "	" && U !== "\r")
          return M;
        M++, P();
      }
      return -1;
    }
    function R() {
      return E.substring(x);
    }
    function Y(M) {
      return E.substring(x, x + M.length) === M;
    }
    function L(M) {
      return E.substring(x, x + M.length).toUpperCase() === M.toUpperCase();
    }
    function I(M) {
      var U = e.reg("^", M), J = U.exec(R());
      return J ? (P(J[0].length), J[0]) : null;
    }
    return {
      char: w,
      getIndex: function() {
        return x;
      },
      getMatch: I,
      getSource: function() {
        return E;
      },
      skip: P,
      skipBlanks: N,
      substringFromIndex: R,
      substringStartsWith: Y,
      substringStartsWithCaseInsensitive: L
    };
  }
  function ne(E, C) {
    function x(Y, L) {
      var I = e.PI.exec(Y.substringFromIndex());
      return I ? I[1].toLowerCase() === "xml" ? L.fatalError(
        "xml declaration is only allowed at the start of the document, but found at position " + Y.getIndex()
      ) : (Y.skip(I[0].length), I[0]) : L.fatalError("processing instruction is not well-formed at position " + Y.getIndex());
    }
    var w = E.getSource();
    if (E.char() === "[") {
      E.skip(1);
      for (var P = E.getIndex(); E.getIndex() < w.length; ) {
        if (E.skipBlanks(), E.char() === "]") {
          var N = w.substring(P, E.getIndex());
          return E.skip(1), N;
        }
        var R = null;
        if (E.char() === "<" && E.char(1) === "!")
          switch (E.char(2)) {
            case "E":
              E.char(3) === "L" ? R = E.getMatch(e.elementdecl) : E.char(3) === "N" && (R = E.getMatch(e.EntityDecl));
              break;
            case "A":
              R = E.getMatch(e.AttlistDecl);
              break;
            case "N":
              R = E.getMatch(e.NotationDecl);
              break;
            case "-":
              R = E.getMatch(e.Comment);
              break;
          }
        else if (E.char() === "<" && E.char(1) === "?")
          R = x(E, C);
        else if (E.char() === "%")
          R = E.getMatch(e.PEReference);
        else
          return C.fatalError("Error detected in Markup declaration");
        if (!R)
          return C.fatalError("Error in internal subset at position " + E.getIndex());
      }
      return C.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function ke(E, C, x, w, P) {
    var N = Z(E, C);
    switch (P ? N.char(2).toUpperCase() : N.char(2)) {
      case "-":
        var R = N.getMatch(e.Comment);
        return R ? (x.comment(R, e.COMMENT_START.length, R.length - e.COMMENT_START.length - e.COMMENT_END.length), N.getIndex()) : w.fatalError("comment is not well-formed at position " + N.getIndex());
      case "[":
        var Y = N.getMatch(e.CDSect);
        return Y ? !P && !x.currentElement ? w.fatalError("CDATA outside of element") : (x.startCDATA(), x.characters(Y, e.CDATA_START.length, Y.length - e.CDATA_START.length - e.CDATA_END.length), x.endCDATA(), N.getIndex()) : w.fatalError("Invalid CDATA starting at position " + C);
      case "D": {
        if (x.doc && x.doc.documentElement)
          return w.fatalError("Doctype not allowed inside or after documentElement at position " + N.getIndex());
        if (P ? !N.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START) : !N.substringStartsWith(e.DOCTYPE_DECL_START))
          return w.fatalError("Expected " + e.DOCTYPE_DECL_START + " at position " + N.getIndex());
        if (N.skip(e.DOCTYPE_DECL_START.length), N.skipBlanks() < 1)
          return w.fatalError("Expected whitespace after " + e.DOCTYPE_DECL_START + " at position " + N.getIndex());
        var L = {
          name: void 0,
          publicId: void 0,
          systemId: void 0,
          internalSubset: void 0
        };
        if (L.name = N.getMatch(e.Name), !L.name)
          return w.fatalError("doctype name missing or contains unexpected characters at position " + N.getIndex());
        if (P && L.name.toLowerCase() !== "html" && w.warning("Unexpected DOCTYPE in HTML document at position " + N.getIndex()), N.skipBlanks(), N.substringStartsWith(e.PUBLIC) || N.substringStartsWith(e.SYSTEM)) {
          var I = e.ExternalID_match.exec(N.substringFromIndex());
          if (!I)
            return w.fatalError("doctype external id is not well-formed at position " + N.getIndex());
          I.groups.SystemLiteralOnly !== void 0 ? L.systemId = I.groups.SystemLiteralOnly : (L.systemId = I.groups.SystemLiteral, L.publicId = I.groups.PubidLiteral), N.skip(I[0].length);
        } else if (P && N.substringStartsWithCaseInsensitive(e.SYSTEM)) {
          if (N.skip(e.SYSTEM.length), N.skipBlanks() < 1)
            return w.fatalError("Expected whitespace after " + e.SYSTEM + " at position " + N.getIndex());
          if (L.systemId = N.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral), !L.systemId)
            return w.fatalError(
              "Expected " + e.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + e.SYSTEM + " at position " + N.getIndex()
            );
        }
        return P && L.systemId && !e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(L.systemId) && w.warning("Unexpected doctype.systemId in HTML document at position " + N.getIndex()), P || (N.skipBlanks(), L.internalSubset = ne(N, w)), N.skipBlanks(), N.char() !== ">" ? w.fatalError("doctype not terminated with > at position " + N.getIndex()) : (N.skip(1), x.startDTD(L.name, L.publicId, L.systemId, L.internalSubset), x.endDTD(), N.getIndex());
      }
      default:
        return w.fatalError('Not well-formed XML starting with "<!" at position ' + C);
    }
  }
  function ie(E, C, x, w) {
    var P = E.substring(C).match(e.PI);
    if (!P)
      return w.fatalError("Invalid processing instruction starting at position " + C);
    if (P[1].toLowerCase() === "xml") {
      if (C > 0)
        return w.fatalError(
          "processing instruction at position " + C + " is an xml declaration which is only at the start of the document"
        );
      if (!e.XMLDecl.test(E.substring(C)))
        return w.fatalError("xml declaration is not well-formed");
    }
    return x.processingInstruction(P[1], P[2]), C + P[0].length;
  }
  function Oe() {
    this.attributeNames = /* @__PURE__ */ Object.create(null);
  }
  return Oe.prototype = {
    setTagName: function(E) {
      if (!e.QName_exact.test(E))
        throw new Error("invalid tagName:" + E);
      this.tagName = E;
    },
    addValue: function(E, C, x) {
      if (!e.QName_exact.test(E))
        throw new Error("invalid attribute:" + E);
      this.attributeNames[E] = this.length, this[this.length++] = { qName: E, value: C, offset: x };
    },
    length: 0,
    getLocalName: function(E) {
      return this[E].localName;
    },
    getLocator: function(E) {
      return this[E].locator;
    },
    getQName: function(E) {
      return this[E].qName;
    },
    getURI: function(E) {
      return this[E].uri;
    },
    getValue: function(E) {
      return this[E].value;
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
  }, wt.XMLReader = T, wt.parseUtils = Z, wt.parseDoctypeCommentOrCData = ke, wt;
}
var fr;
function kn() {
  if (fr) return nt;
  fr = 1;
  var r = bt(), e = Vr(), t = Lt(), n = Sn(), s = xn(), a = e.DOMImplementation, c = r.hasDefaultHTMLNamespace, p = r.isHTMLMimeType, h = r.isValidMimeType, l = r.MIME_TYPE, m = r.NAMESPACE, f = t.ParseError, g = s.XMLReader;
  function b(D) {
    return D.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028\u2029]/g, `
`);
  }
  function y(D) {
    if (D = D || {}, D.locator === void 0 && (D.locator = !0), this.assign = D.assign || r.assign, this.domHandler = D.domHandler || v, this.onError = D.onError || D.errorHandler, D.errorHandler && typeof D.errorHandler != "function")
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    D.errorHandler && D.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = D.normalizeLineEndings || b, this.locator = !!D.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), D.xmlns);
  }
  y.prototype.parseFromString = function(D, B) {
    if (!h(B))
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + B + '" is not valid.');
    var q = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), G = n.XML_ENTITIES, Z = q[""] || null;
    c(B) ? (G = n.HTML_ENTITIES, Z = m.HTML) : B === l.XML_SVG_IMAGE && (Z = m.SVG), q[""] = Z, q.xml = q.xml || m.XML;
    var ne = new this.domHandler({
      mimeType: B,
      defaultNamespace: Z,
      onError: this.onError
    }), ke = this.locator ? {} : void 0;
    this.locator && ne.setDocumentLocator(ke);
    var ie = new g();
    ie.errorHandler = ne, ie.domBuilder = ne;
    var Oe = !r.isHTMLMimeType(B);
    return Oe && typeof D != "string" && ie.errorHandler.fatalError("source is not a string"), ie.parse(this.normalizeLineEndings(String(D)), q, G), ne.doc.documentElement || ie.errorHandler.fatalError("missing root element"), ne.doc;
  };
  function v(D) {
    var B = D || {};
    this.mimeType = B.mimeType || l.XML_APPLICATION, this.defaultNamespace = B.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = B.onError;
  }
  function O(D, B) {
    B.lineNumber = D.lineNumber, B.columnNumber = D.columnNumber;
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
      var D = new a();
      this.doc = p(this.mimeType) ? D.createHTMLDocument(!1) : D.createDocument(this.defaultNamespace, "");
    },
    startElement: function(D, B, q, G) {
      var Z = this.doc, ne = Z.createElementNS(D, q || B), ke = G.length;
      $(this, ne), this.currentElement = ne, this.locator && O(this.locator, ne);
      for (var ie = 0; ie < ke; ie++) {
        var D = G.getURI(ie), Oe = G.getValue(ie), q = G.getQName(ie), E = Z.createAttributeNS(D, q);
        this.locator && O(G.getLocator(ie), E), E.value = E.nodeValue = Oe, ne.setAttributeNode(E);
      }
    },
    endElement: function(D, B, q) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(D, B) {
    },
    endPrefixMapping: function(D) {
    },
    processingInstruction: function(D, B) {
      var q = this.doc.createProcessingInstruction(D, B);
      this.locator && O(this.locator, q), $(this, q);
    },
    ignorableWhitespace: function(D, B, q) {
    },
    characters: function(D, B, q) {
      if (D = T.apply(this, arguments), D) {
        if (this.cdata)
          var G = this.doc.createCDATASection(D);
        else
          var G = this.doc.createTextNode(D);
        this.currentElement ? this.currentElement.appendChild(G) : /^\s*$/.test(D) && this.doc.appendChild(G), this.locator && O(this.locator, G);
      }
    },
    skippedEntity: function(D) {
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
    setDocumentLocator: function(D) {
      D && (D.lineNumber = 0), this.locator = D;
    },
    //LexicalHandler
    comment: function(D, B, q) {
      D = T.apply(this, arguments);
      var G = this.doc.createComment(D);
      this.locator && O(this.locator, G), $(this, G);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(D, B, q, G) {
      var Z = this.doc.implementation;
      if (Z && Z.createDocumentType) {
        var ne = Z.createDocumentType(D, B, q, G);
        this.locator && O(this.locator, ne), $(this, ne), this.doc.doctype = ne;
      }
    },
    reportError: function(D, B) {
      if (typeof this.onError == "function")
        try {
          this.onError(D, B, this);
        } catch (q) {
          throw new f("Reporting " + D + ' "' + B + '" caused ' + q, this.locator);
        }
      else
        console.error("[xmldom " + D + "]	" + B, S(this.locator));
    },
    /**
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(D) {
      this.reportError("warning", D);
    },
    error: function(D) {
      this.reportError("error", D);
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
    fatalError: function(D) {
      throw this.reportError("fatalError", D), new f(D, this.locator);
    }
  };
  function S(D) {
    if (D)
      return `
@#[line:` + D.lineNumber + ",col:" + D.columnNumber + "]";
  }
  function T(D, B, q) {
    return typeof D == "string" ? D.substr(B, q) : D.length >= B + q || B ? new java.lang.String(D, B, q) + "" : D;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function(D) {
      v.prototype[D] = function() {
        return null;
      };
    }
  );
  function $(D, B) {
    D.currentElement ? D.currentElement.appendChild(B) : D.doc.appendChild(B);
  }
  function Q(D) {
    if (D === "error") throw "onErrorStopParsing";
  }
  function se() {
    throw "onWarningStopParsing";
  }
  return nt.__DOMHandler = v, nt.DOMParser = y, nt.normalizeLineEndings = b, nt.onErrorStopParsing = Q, nt.onWarningStopParsing = se, nt;
}
var pr;
function Mn() {
  if (pr) return X;
  pr = 1;
  var r = bt();
  X.assign = r.assign, X.hasDefaultHTMLNamespace = r.hasDefaultHTMLNamespace, X.isHTMLMimeType = r.isHTMLMimeType, X.isValidMimeType = r.isValidMimeType, X.MIME_TYPE = r.MIME_TYPE, X.NAMESPACE = r.NAMESPACE;
  var e = Lt();
  X.DOMException = e.DOMException, X.DOMExceptionName = e.DOMExceptionName, X.ExceptionCode = e.ExceptionCode, X.ParseError = e.ParseError;
  var t = Vr();
  X.Attr = t.Attr, X.CDATASection = t.CDATASection, X.CharacterData = t.CharacterData, X.Comment = t.Comment, X.Document = t.Document, X.DocumentFragment = t.DocumentFragment, X.DocumentType = t.DocumentType, X.DOMImplementation = t.DOMImplementation, X.Element = t.Element, X.Entity = t.Entity, X.EntityReference = t.EntityReference, X.LiveNodeList = t.LiveNodeList, X.NamedNodeMap = t.NamedNodeMap, X.Node = t.Node, X.NodeList = t.NodeList, X.Notation = t.Notation, X.ProcessingInstruction = t.ProcessingInstruction, X.Text = t.Text, X.XMLSerializer = t.XMLSerializer;
  var n = kn();
  return X.DOMParser = n.DOMParser, X.normalizeLineEndings = n.normalizeLineEndings, X.onErrorStopParsing = n.onErrorStopParsing, X.onWarningStopParsing = n.onWarningStopParsing, X;
}
Mn();
const zr = "USJ";
var Me = {}, jt, hr;
function On() {
  return hr || (hr = 1, jt = () => {
    const r = "\\ud800-\\udfff", c = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", p = "\\ufe0e\\ufe0f", h = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", l = `[${r}]`, m = `[${c}]`, f = "\\ud83c[\\udffb-\\udfff]", g = `(?:${m}|${f})`, b = `[^${r}]`, y = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", v = "[\\ud800-\\udbff][\\udc00-\\udfff]", O = "\\u200d", S = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", T = `[${h}]`, $ = `${g}?`, Q = `[${p}]?`, se = `(?:${O}(?:${[b, y, v].join("|")})${Q + $})*`, D = Q + $ + se, q = `(?:${[`${b}${m}?`, m, y, v, l, T].join("|")})`;
    return new RegExp(`${S}|${f}(?=${f})|${q + D}`, "g");
  }), jt;
}
var dr;
function Bn() {
  if (dr) return Me;
  dr = 1;
  var r = Me && Me.__importDefault || function(h) {
    return h && h.__esModule ? h : { default: h };
  };
  Object.defineProperty(Me, "__esModule", { value: !0 });
  var e = r(On());
  function t(h) {
    if (typeof h != "string")
      throw new Error("A string is expected as input");
    return h.match(e.default()) || [];
  }
  Me.toArray = t;
  function n(h) {
    if (typeof h != "string")
      throw new Error("Input must be a string");
    var l = h.match(e.default());
    return l === null ? 0 : l.length;
  }
  Me.length = n;
  function s(h, l, m) {
    if (l === void 0 && (l = 0), typeof h != "string")
      throw new Error("Input must be a string");
    (typeof l != "number" || l < 0) && (l = 0), typeof m == "number" && m < 0 && (m = 0);
    var f = h.match(e.default());
    return f ? f.slice(l, m).join("") : "";
  }
  Me.substring = s;
  function a(h, l, m) {
    if (l === void 0 && (l = 0), typeof h != "string")
      throw new Error("Input must be a string");
    var f = n(h);
    if (typeof l != "number" && (l = parseInt(l, 10)), l >= f)
      return "";
    l < 0 && (l += f);
    var g;
    typeof m > "u" ? g = f : (typeof m != "number" && (m = parseInt(m, 10)), g = m >= 0 ? m + l : l);
    var b = h.match(e.default());
    return b ? b.slice(l, g).join("") : "";
  }
  Me.substr = a;
  function c(h, l, m, f) {
    if (l === void 0 && (l = 16), m === void 0 && (m = "#"), f === void 0 && (f = "right"), typeof h != "string" || typeof l != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(f) === -1)
      throw new Error("Pad position should be either left or right");
    typeof m != "string" && (m = String(m));
    var g = n(h);
    if (g > l)
      return s(h, 0, l);
    if (g < l) {
      var b = m.repeat(l - g);
      return f === "left" ? b + h : h + b;
    }
    return h;
  }
  Me.limit = c;
  function p(h, l, m) {
    if (m === void 0 && (m = 0), typeof h != "string")
      throw new Error("Input must be a string");
    if (h === "")
      return l === "" ? 0 : -1;
    m = Number(m), m = isNaN(m) ? 0 : m, l = String(l);
    var f = t(h);
    if (m >= f.length)
      return l === "" ? f.length : -1;
    if (l === "")
      return m;
    var g = t(l), b = !1, y;
    for (y = m; y < f.length; y += 1) {
      for (var v = 0; v < g.length && g[v] === f[y + v]; )
        v += 1;
      if (v === g.length && g[v - 1] === f[y + v - 1]) {
        b = !0;
        break;
      }
    }
    return b ? y : -1;
  }
  return Me.indexOf = p, Me;
}
var st = Bn();
function Jr(r) {
  return r ? Array.isArray(r) ? r : [r] : [];
}
function Pt(r, e) {
  if (!(e > he(r) || e < -he(r)))
    return _t(r, e, 1);
}
function Et(r, e) {
  return e < 0 || e > he(r) - 1 ? "" : _t(r, e, 1);
}
function bo(r, e) {
  if (!(e < 0 || e > he(r) - 1))
    return _t(r, e, 1).codePointAt(0);
}
function Pn(r, e, t = he(r)) {
  const n = Fn(r, e);
  return !(n === -1 || n + he(e) !== t);
}
function Rn(r, e, t) {
  if (e < 0) return -1;
  if (t) {
    if (Et(r, e) === "}" && Et(r, e - 1) === "\\") return e;
    const a = Mt(r, "\\}", e);
    return a >= 0 ? a + 1 : a;
  }
  let n = e;
  const s = he(r);
  for (; n < s && (n = Mt(r, "}", n), !(n === -1 || Et(r, n - 1) !== "\\")); )
    n += 1;
  return n >= s ? -1 : n;
}
function Ln(r, e) {
  const t = [];
  let n = 0, s = 0;
  function a(p, h, l) {
    const m = ot(r, s, h), f = t.length > 0 && te(t[t.length - 1]) ? `${t.pop()}${m}` : m;
    te(p) ? t.push(`${f}${p}`) : (f && t.push(f), t.push(p)), s = h + l;
  }
  const c = he(r);
  for (; n < c; ) {
    switch (Et(r, n)) {
      case "{":
        if (Et(r, n - 1) !== "\\") {
          const p = Rn(r, n, !1);
          if (p >= 0) {
            const h = ot(r, n + 1, p), l = h in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[h]
            ) : h;
            a(l, n, p + 1 - n), n = p, s = p + 1;
          }
        } else
          a("{", n - 1, 2);
        break;
      case "}":
        Et(r, n - 1) !== "\\" || a("}", n - 1, 2);
        break;
    }
    n += 1;
  }
  if (s < c) {
    const p = ot(r, s);
    t.push(
      t.length > 0 && te(t[t.length - 1]) ? `${t.pop()}${p}` : p
    );
  }
  return t;
}
function vo(r, e) {
  return Ln(r, e).map((t) => `${t}`).join("");
}
function _n(r, e, t = 0) {
  const n = ot(r, t);
  return Mt(n, e) !== -1;
}
function Mt(r, e, t = 0) {
  return st.indexOf(r, e, t);
}
function Fn(r, e, t) {
  let n = t === void 0 ? he(r) : t;
  n < 0 ? n = 0 : n >= he(r) && (n = he(r) - 1);
  for (let s = n; s >= 0; s--)
    if (_t(r, s, he(e)) === e)
      return s;
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
  const s = mr(n, e), a = t ? mr(n, t) : void 0;
  return ot(r, s, a);
}
function Er(r, e, t) {
  const n = [];
  if (t !== void 0 && t <= 0)
    return [r];
  if (e === "") return Un(r).slice(0, t);
  let s = e;
  (typeof e == "string" || e instanceof RegExp && !_n(e.flags, "g")) && (s = new RegExp(e, "g"));
  const a = r.match(s);
  let c = 0;
  if (!a) return [r];
  for (let p = 0; p < (t ? t - 1 : a.length); p++) {
    const h = Mt(r, a[p], c), l = he(a[p]);
    if (n.push(ot(r, c, h)), c = h + l, t !== void 0 && n.length === t)
      break;
  }
  return n.push(ot(r, c)), n;
}
function Gr(r, e, t = 0) {
  return Mt(r, e, t) === t;
}
function _t(r, e = 0, t = he(r) - e) {
  return st.substr(r, e, t);
}
function ot(r, e, t = he(r)) {
  return st.substring(r, e, t);
}
function Un(r) {
  return st.toArray(r);
}
function To(r) {
  return Gr(r, "%") && Pn(r, "%");
}
function wo(r) {
  if (typeof r != "string")
    throw new TypeError("Expected a string");
  return r.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Io(r) {
  return r ? Jr(r).map(
    (n) => Array.isArray(n) ? n.map((s) => new RegExp(s)) : new RegExp(n)
  ) : [];
}
function So(r) {
  return r ? Jr(r).map((n) => new RegExp(n)) : [];
}
const qn = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function gt(r) {
  return qn.test(r);
}
function xo(r) {
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
const Vt = ["chapter", "book", "para", "row", "sidebar", zr], $n = "​", Hr = [
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
], jn = 1, Vn = Hr.length - 1, zn = 1, Jn = 1, ko = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, Gn = (r) => {
  var e;
  return ((e = Hr[r]) == null ? void 0 : e.chapters) ?? -1;
}, Mo = (r, e) => ({
  book: pe.bookNumberToId(
    Math.max(
      jn,
      Math.min(pe.bookIdToNumber(r.book) + e, Vn)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), Oo = (r, e) => ({
  ...r,
  chapterNum: Math.min(
    Math.max(zn, r.chapterNum + e),
    Gn(pe.bookIdToNumber(r.book))
  ),
  verseNum: 1
}), Bo = (r, e) => ({
  ...r,
  verseNum: Math.max(Jn, r.verseNum + e)
});
async function Po(r, e, t) {
  const n = pe.bookNumberToId(r);
  if (!Gr(Intl.getCanonicalLocales(e)[0], "zh"))
    return t({
      localizeKey: `LocalizedId.${n}`,
      languagesToSearch: [e]
    });
  const s = await t({
    localizeKey: `Book.${n}`,
    languagesToSearch: [e]
  }), a = Er(s, "-");
  return Er(a[0], "ÿ08")[0].trim();
}
function Ro(r) {
  return new $r(pe.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCC;
}
function yr(r) {
  return new $r(pe.bookIdToNumber(r.book), r.chapterNum, r.verseNum).BBBCCCVVV;
}
function Lo(r, e) {
  return yr(r) - yr(e);
}
function Hn(r) {
  return `%scrollGroup_${r}%`;
}
function _o(r) {
  return r.map((e) => Hn(e));
}
function Fo(r, e, t, n) {
  let s;
  switch (e ?? "id") {
    case "English":
      s = pe.bookIdToEnglishName(r.book);
      break;
    case "id":
      s = r.book;
      break;
    default:
      s = e ?? "";
      break;
  }
  return `${s}${n ?? " "}${r.chapterNum}${t ?? ":"}${r.verseNum}`;
}
var Xn = /* @__PURE__ */ ((r) => (r.OT = "OT", r.NT = "NT", r.DC = "DC", r.Extra = "Extra", r))(Xn || {});
const Uo = (r) => {
  if (pe.isBookOT(r)) return "OT";
  if (pe.isBookNT(r)) return "NT";
  if (pe.isBookDC(r)) return "DC";
  if (pe.isExtraMaterial(r)) return "Extra";
  throw new Error(`Unknown section for book: ${r}`);
}, Yn = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function br(r) {
  return Yn.test(r);
}
const Kn = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function Wn(r) {
  return Kn.test(r);
}
function vr(r) {
  let e = "", t = !1, n = "\0";
  for (let s = 0; s < r.length; s += 1) {
    const a = r[s];
    a.charCodeAt(0) < 32 ? (t || (e += " "), t = !0) : !t && a === $n && s + 1 < r.length && br(r[s + 1]) || (br(a) ? (t || (e += a), t = !0) : Wn(a) && n === a || (e += a, t = !1)), n = a;
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
function Xr(r, e, t, n) {
  if (!r && !t) return !0;
  if (!r || !t) return !1;
  const s = te(r), a = te(t);
  if (s && a) {
    const c = vr(r), p = vr(t);
    if (c !== p) {
      if (!gt(Pt(c, -1) ?? "") && !gt(Pt(p, -1) ?? "") || !Ar(r, e) || !Ar(t, n)) return !1;
      let h = c;
      for (; gt(Pt(h, -1) ?? ""); ) h = gr(h, 0, -1);
      let l = p;
      for (; gt(Pt(l, -1) ?? ""); ) l = gr(l, 0, -1);
      if (h !== l) return !1;
    }
  } else if (!s && !a) {
    const c = r, p = t, h = Object.keys(c).filter(
      (f) => f !== "content"
    );
    if (h.length !== Object.keys(p).filter((f) => f !== "content").length || h.some((f) => !(f in p) || c[f] !== p[f])) return !1;
    const l = Dr(c.content), m = Dr(p.content);
    if (l !== m) return !1;
    if (!l && !m) {
      let f = c.content, g = p.content;
      const b = f[f.length - 1];
      Vt.includes(c.type) && te(b) && gt(b) && (f = f.slice(0, -1));
      const y = g[g.length - 1];
      if (Vt.includes(p.type) && te(y) && gt(y) && (g = g.slice(0, -1)), f.length !== g.length) return !1;
      for (let v = 0; v < f.length; v += 1)
        if (!Xr(f[v], c, g[v], p))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function qo(r, e) {
  return Xr(r, void 0, e, void 0);
}
const $o = (r) => (...e) => r.map((n) => n(...e)).every((n) => n), jo = (r) => async (...e) => {
  const t = r.map(async (n) => n(...e));
  return (await Promise.all(t)).every((n) => n);
}, Qn = "book", Nr = "chapter", $e = "verse", Je = "***";
function Yr() {
  return Array.from({ length: 26 }, (r, e) => String.fromCharCode(97 + e));
}
function Zn(r, e) {
  const t = e && e.length > 0 ? e : Yr();
  return t[r % t.length];
}
function Vo(r, e) {
  const t = e && e.length > 0 ? e : Yr(), n = (() => {
    const s = /* @__PURE__ */ new Map();
    let a = 0;
    return r.forEach((c, p) => {
      c.caller === "+" && (s.set(p, Zn(a, t)), a += 1);
    }), s;
  })();
  return (s, a) => {
    if (s === "+") {
      const c = n.get(a);
      return c || (console.warn(`Caller index ${a} out of range for '+' callers`), "?");
    }
    if (s !== "-")
      return s;
  };
}
function ei(r) {
  const e = [];
  if (!r || r.length === 0) return e;
  function t(n) {
    typeof n != "string" && (n.type === "note" ? e.push(n) : Array.isArray(n.content) && n.content.length > 0 && n.content.forEach(t));
  }
  return r.forEach(t), e;
}
function zo(r, e = {}) {
  const {
    splitterThicknessPx: t = 4,
    secondaryPaneMinSizePx: n = 20,
    mainPaneMinSizePx: s = 60,
    absoluteMinPercent: a = 3,
    absoluteMaxPercent: c = 90
  } = e, p = r - t;
  let h, l;
  return p < n + s ? (h = a, l = c) : (l = Math.min(
    Math.floor((p - s) / p * 100),
    c
  ), h = Math.min(
    Math.max(Math.ceil(n / p * 100), a),
    l
  )), { minPercent: h, maxPercent: l };
}
var ti = Object.getOwnPropertyNames, ri = Object.getOwnPropertySymbols, ni = Object.prototype.hasOwnProperty;
function Cr(r, e) {
  return function(n, s, a) {
    return r(n, s, a) && e(n, s, a);
  };
}
function Rt(r) {
  return function(t, n, s) {
    if (!t || !n || typeof t != "object" || typeof n != "object")
      return r(t, n, s);
    var a = s.cache, c = a.get(t), p = a.get(n);
    if (c && p)
      return c === n && p === t;
    a.set(t, n), a.set(n, t);
    var h = r(t, n, s);
    return a.delete(t), a.delete(n), h;
  };
}
function Tr(r) {
  return ti(r).concat(ri(r));
}
var ii = Object.hasOwn || function(r, e) {
  return ni.call(r, e);
};
function ut(r, e) {
  return r === e || !r && !e && r !== r && e !== e;
}
var oi = "__v", ai = "__o", si = "_owner", wr = Object.getOwnPropertyDescriptor, Ir = Object.keys;
function ui(r, e, t) {
  var n = r.length;
  if (e.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!t.equals(r[n], e[n], n, n, r, e, t))
      return !1;
  return !0;
}
function ci(r, e) {
  return ut(r.getTime(), e.getTime());
}
function li(r, e) {
  return r.name === e.name && r.message === e.message && r.cause === e.cause && r.stack === e.stack;
}
function fi(r, e) {
  return r === e;
}
function Sr(r, e, t) {
  var n = r.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var s = new Array(n), a = r.entries(), c, p, h = 0; (c = a.next()) && !c.done; ) {
    for (var l = e.entries(), m = !1, f = 0; (p = l.next()) && !p.done; ) {
      if (s[f]) {
        f++;
        continue;
      }
      var g = c.value, b = p.value;
      if (t.equals(g[0], b[0], h, f, r, e, t) && t.equals(g[1], b[1], g[0], b[0], r, e, t)) {
        m = s[f] = !0;
        break;
      }
      f++;
    }
    if (!m)
      return !1;
    h++;
  }
  return !0;
}
var pi = ut;
function hi(r, e, t) {
  var n = Ir(r), s = n.length;
  if (Ir(e).length !== s)
    return !1;
  for (; s-- > 0; )
    if (!Kr(r, e, t, n[s]))
      return !1;
  return !0;
}
function It(r, e, t) {
  var n = Tr(r), s = n.length;
  if (Tr(e).length !== s)
    return !1;
  for (var a, c, p; s-- > 0; )
    if (a = n[s], !Kr(r, e, t, a) || (c = wr(r, a), p = wr(e, a), (c || p) && (!c || !p || c.configurable !== p.configurable || c.enumerable !== p.enumerable || c.writable !== p.writable)))
      return !1;
  return !0;
}
function di(r, e) {
  return ut(r.valueOf(), e.valueOf());
}
function mi(r, e) {
  return r.source === e.source && r.flags === e.flags;
}
function xr(r, e, t) {
  var n = r.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var s = new Array(n), a = r.values(), c, p; (c = a.next()) && !c.done; ) {
    for (var h = e.values(), l = !1, m = 0; (p = h.next()) && !p.done; ) {
      if (!s[m] && t.equals(c.value, p.value, c.value, p.value, r, e, t)) {
        l = s[m] = !0;
        break;
      }
      m++;
    }
    if (!l)
      return !1;
  }
  return !0;
}
function gi(r, e) {
  var t = r.length;
  if (e.length !== t)
    return !1;
  for (; t-- > 0; )
    if (r[t] !== e[t])
      return !1;
  return !0;
}
function Ei(r, e) {
  return r.hostname === e.hostname && r.pathname === e.pathname && r.protocol === e.protocol && r.port === e.port && r.hash === e.hash && r.username === e.username && r.password === e.password;
}
function Kr(r, e, t, n) {
  return (n === si || n === ai || n === oi) && (r.$$typeof || e.$$typeof) ? !0 : ii(e, n) && t.equals(r[n], e[n], n, n, r, e, t);
}
var yi = "[object Arguments]", bi = "[object Boolean]", vi = "[object Date]", Di = "[object Error]", Ai = "[object Map]", Ni = "[object Number]", Ci = "[object Object]", Ti = "[object RegExp]", wi = "[object Set]", Ii = "[object String]", Si = "[object URL]", xi = Array.isArray, kr = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, Mr = Object.assign, ki = Object.prototype.toString.call.bind(Object.prototype.toString);
function Mi(r) {
  var e = r.areArraysEqual, t = r.areDatesEqual, n = r.areErrorsEqual, s = r.areFunctionsEqual, a = r.areMapsEqual, c = r.areNumbersEqual, p = r.areObjectsEqual, h = r.arePrimitiveWrappersEqual, l = r.areRegExpsEqual, m = r.areSetsEqual, f = r.areTypedArraysEqual, g = r.areUrlsEqual;
  return function(y, v, O) {
    if (y === v)
      return !0;
    if (y == null || v == null)
      return !1;
    var S = typeof y;
    if (S !== typeof v)
      return !1;
    if (S !== "object")
      return S === "number" ? c(y, v, O) : S === "function" ? s(y, v, O) : !1;
    var T = y.constructor;
    if (T !== v.constructor)
      return !1;
    if (T === Object)
      return p(y, v, O);
    if (xi(y))
      return e(y, v, O);
    if (kr != null && kr(y))
      return f(y, v, O);
    if (T === Date)
      return t(y, v, O);
    if (T === RegExp)
      return l(y, v, O);
    if (T === Map)
      return a(y, v, O);
    if (T === Set)
      return m(y, v, O);
    var $ = ki(y);
    return $ === vi ? t(y, v, O) : $ === Ti ? l(y, v, O) : $ === Ai ? a(y, v, O) : $ === wi ? m(y, v, O) : $ === Ci ? typeof y.then != "function" && typeof v.then != "function" && p(y, v, O) : $ === Si ? g(y, v, O) : $ === Di ? n(y, v, O) : $ === yi ? p(y, v, O) : $ === bi || $ === Ni || $ === Ii ? h(y, v, O) : !1;
  };
}
function Oi(r) {
  var e = r.circular, t = r.createCustomConfig, n = r.strict, s = {
    areArraysEqual: n ? It : ui,
    areDatesEqual: ci,
    areErrorsEqual: li,
    areFunctionsEqual: fi,
    areMapsEqual: n ? Cr(Sr, It) : Sr,
    areNumbersEqual: pi,
    areObjectsEqual: n ? It : hi,
    arePrimitiveWrappersEqual: di,
    areRegExpsEqual: mi,
    areSetsEqual: n ? Cr(xr, It) : xr,
    areTypedArraysEqual: n ? It : gi,
    areUrlsEqual: Ei
  };
  if (t && (s = Mr({}, s, t(s))), e) {
    var a = Rt(s.areArraysEqual), c = Rt(s.areMapsEqual), p = Rt(s.areObjectsEqual), h = Rt(s.areSetsEqual);
    s = Mr({}, s, {
      areArraysEqual: a,
      areMapsEqual: c,
      areObjectsEqual: p,
      areSetsEqual: h
    });
  }
  return s;
}
function Bi(r) {
  return function(e, t, n, s, a, c, p) {
    return r(e, t, p);
  };
}
function Pi(r) {
  var e = r.circular, t = r.comparator, n = r.createState, s = r.equals, a = r.strict;
  if (n)
    return function(h, l) {
      var m = n(), f = m.cache, g = f === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : f, b = m.meta;
      return t(h, l, {
        cache: g,
        equals: s,
        meta: b,
        strict: a
      });
    };
  if (e)
    return function(h, l) {
      return t(h, l, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: s,
        meta: void 0,
        strict: a
      });
    };
  var c = {
    cache: void 0,
    equals: s,
    meta: void 0,
    strict: a
  };
  return function(h, l) {
    return t(h, l, c);
  };
}
var Ri = Ge();
Ge({ strict: !0 });
Ge({ circular: !0 });
Ge({
  circular: !0,
  strict: !0
});
Ge({
  createInternalComparator: function() {
    return ut;
  }
});
Ge({
  strict: !0,
  createInternalComparator: function() {
    return ut;
  }
});
Ge({
  circular: !0,
  createInternalComparator: function() {
    return ut;
  }
});
Ge({
  circular: !0,
  createInternalComparator: function() {
    return ut;
  },
  strict: !0
});
function Ge(r) {
  r === void 0 && (r = {});
  var e = r.circular, t = e === void 0 ? !1 : e, n = r.createInternalComparator, s = r.createState, a = r.strict, c = a === void 0 ? !1 : a, p = Oi(r), h = Mi(p), l = n ? n(h) : Bi(h);
  return Pi({ circular: t, comparator: h, createState: s, equals: l, strict: c });
}
function zt(r, e) {
  return Ri(r, e);
}
function Li(r, e) {
  if (typeof r != typeof e) return !1;
  if (!r && !e) return !0;
  if (Array.isArray(r)) {
    const a = e, c = r;
    return a.length === 0 ? !0 : a.every((p) => c.includes(p));
  }
  if (typeof r != "object")
    return zt(r, e);
  const t = e, n = r;
  let s = !0;
  return Object.keys(t).forEach((a) => {
    s && (Object.hasOwn(n, a) && Li(n[a], t[a]) || (s = !1));
  }), s;
}
function Or(r, e, t) {
  return JSON.stringify(r, (s, a) => {
    let c = a;
    return e && (c = e(s, c)), c === void 0 && (c = null), c;
  }, t);
}
function _i(r, e) {
  function t(s) {
    return Object.keys(s).forEach((a) => {
      s[a] === null ? s[a] = void 0 : typeof s[a] == "object" && (s[a] = t(s[a]));
    }), s;
  }
  const n = JSON.parse(r, e);
  if (n !== null)
    return typeof n == "object" ? t(n) : n;
}
function Jo(r) {
  try {
    const e = Or(r);
    return e === Or(_i(e));
  } catch {
    return !1;
  }
}
const Go = (r) => r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function Ho() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0].replace(/@posix$/i, "") : new an().resolvedOptions().locale;
}
function Xo(r, e = 2) {
  if (r === 0) return "0 Bytes";
  const t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], n = Math.floor(Math.log(r) / Math.log(1024)), s = t[n];
  return `${new dn("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(r / 1024 ** n)} ${s}`;
}
const Fi = 1e3, Wr = 60, Qr = Wr * 60, Ui = Qr * 24;
function Yo(r, e, t = /* @__PURE__ */ new Date()) {
  const n = Math.floor((e.getTime() - t.getTime()) / Fi), s = Math.round(n / Ui);
  if (Math.abs(s) >= 1) return r.format(s, "day");
  const a = Math.round(n / Qr);
  if (Math.abs(a) >= 1) return r.format(a, "hour");
  const c = Math.round(n / Wr);
  return Math.abs(c) >= 1 ? r.format(c, "minute") : r.format(n, "second");
}
function Ko(r, e, t, n, s = {
  year: "numeric",
  month: "short",
  day: "numeric"
}) {
  const a = /* @__PURE__ */ new Date(), c = new Date(a);
  c.setDate(c.getDate() - 1);
  const p = r.getDate() === a.getDate() && r.getMonth() === a.getMonth() && r.getFullYear() === a.getFullYear(), h = r.getDate() === c.getDate() && r.getMonth() === c.getMonth() && r.getFullYear() === c.getFullYear();
  return p ? e : h ? t : r.toLocaleString(n, s);
}
const Wo = /* @__PURE__ */ new Set([
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
]), Yt = {
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
Ft(Yt);
const qi = {
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
  $defs: Yt
};
Object.freeze(qi);
const $i = {
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
  $defs: Yt
};
Object.freeze($i);
const Zr = {
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
Ft(Zr);
const ji = {
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
  $defs: Zr
};
Object.freeze(ji);
const Vi = {
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
Object.freeze(Vi);
const en = {
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
Ft(en);
const zi = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: en
};
Object.freeze(zi);
const Ji = "theme-styles";
function Gi(r, e) {
  return `${r ? `${r}-` : ""}${e}`;
}
function Qo(r, e) {
  return Object.fromEntries(
    Object.entries(r).map(([n, s]) => [
      n,
      s ? Object.fromEntries(
        Object.entries(s).map(([a, c]) => {
          var p;
          return [
            a,
            c ? {
              ...c,
              // Add the derived properties
              themeFamilyId: n,
              type: a,
              id: Gi(n, a),
              cssVariables: {
                // Fill in the default css variables
                ...(p = e == null ? void 0 : e[a]) == null ? void 0 : p.cssVariables,
                ...c.cssVariables
              }
            } : void 0
          ];
        }).filter(([, a]) => !!a)
      ) : void 0
    ]).filter(([, n]) => !!n)
  );
}
function Hi(r) {
  return `
.${r.id} {
${Object.entries(r.cssVariables).map(([e, t]) => `  --${e}: ${t};`).join(`
`)}
}
`;
}
function Zo(r, e, t) {
  const n = e == null ? void 0 : e.dataset.themeId;
  n && this.document.body.classList.remove(n), this.document.body.classList.add(r.id), e && this.document.head.removeChild(e);
  const s = this.document.createElement("style");
  return s.id = `${Ji}${t ? `-${t}` : ""}`, s.dataset.themeId = r.id, s.textContent = Hi(r), this.document.head.appendChild(s), s;
}
function tn(r) {
  return Object.freeze(r), r == null || Object.getOwnPropertyNames(r).forEach(function(t) {
    // Need to make sure to avoid null, which is an object type
    // eslint-disable-next-line no-null/no-null
    r[t] !== null && (typeof r[t] == "object" || typeof r[t] == "function") && !Object.isFrozen(r[t]) && tn(r[t]);
  }), r;
}
const Jt = tn({
  version: "3.0.7",
  schemaRepo: "https://github.com/ubsicap/usx.git",
  schemaCommit: "6c490bb5675d281b0fa01876fe67f6e3fd50a4ce",
  markersMapVersion: "1.0.0",
  usfmToolsCommit: "b3475856e2b7c0f19739d247ae3f3c13cba66215",
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
}), ea = Object.freeze({
  ...Jt,
  isSpaceAfterAttributeMarkersContent: !0,
  shouldOptionalClosingMarkersBePresent: !0
}), St = ["figure", "note", "sidebar", "table"];
Object.freeze(St);
const Xi = /\u00A0/g, Yi = /\w+(\d+)/, Ki = /(\d+)-?(\d+)?/;
class F {
  constructor(e, t) {
    j(this, "usj");
    j(this, "markersMap");
    j(this, "shouldAllowInvisibleCharacters");
    // Cached properties
    j(this, "parentMapInternal");
    j(this, "fragmentsByIndexInUsfmInternal");
    j(this, "fragmentsByJsonPathInternal");
    j(this, "indicesInUsfmByVerseRefInternal");
    j(this, "usfmInternal");
    this.usj = e;
    const { markersMap: n, shouldAllowInvisibleCharacters: s } = t ?? {};
    if (n)
      this.markersMap = n, F.areUsjVersionsCompatible(this.usj.version, this.markersMap.version) || console.warn(
        `Warning: USJ provided has version ${this.usj.version}, but provided markers map has version ${this.markersMap.version}. This may cause unexpected issues when transforming between formats.`
      );
    else if (F.areUsjVersionsCompatible(this.usj.version, Jt.version))
      this.markersMap = Jt;
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
    const t = Ct({ path: e, json: this.usj, wrap: !0 });
    if (t === void 0 || t.length === 0) return;
    if (!Array.isArray(t[0])) return t[0];
    const n = Ct({ path: e, json: this.usj, wrap: !1 });
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
    return typeof e == "object" && e.type === zr && t.length === 0;
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
    var s;
    n.set(e, t), e.content && n.set(e.content, e), (s = e.content) == null || s.forEach((a) => {
      typeof a == "object" && F.createParentMapInternal(a, e, n);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((t) => {
      typeof t == "object" && F.createParentMapInternal(t, this.usj, e);
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
    let s = e, a = n.get(s);
    for (; a !== void 0; ) {
      if (!a.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !a.content.find((c, p) => {
          if (c !== s) return !1;
          if (!a) throw new Error('undefined "tempParent" should not be possible');
          return t.unshift({ parent: a, index: p }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(s)}`);
      s = a, a = n.get(a);
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
    const t = Ct.toPathArray(e);
    return F.jsonPathArrayToJsonPath(t);
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
    return `${F.convertWorkingStackToJsonPath(e)}['${t}']`;
  }
  convertJsonPathToWorkingStack(e) {
    const t = [];
    if (e === "$") return t;
    const n = e.match(/content\[(\d+)\]/g);
    if (!n) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let s = this.usj;
    return n.forEach((a, c) => {
      const p = /(\d+)/.exec(a);
      if (!p) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const h = parseInt(p[0], 10);
      if (t.push({ parent: s, index: h }), c + 1 < n.length) {
        if (typeof s == "string" || !s.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(s)}`);
        const l = s.content[h];
        if (typeof l == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(l)}`);
        s = l;
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
    return ei((e = this.usj) == null ? void 0 : e.content);
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
    var p;
    let a = e;
    const c = t.length === 0 ? e : t[0].parent;
    if (!te(c)) {
      if (n.includes(c.type)) return;
      let h;
      t.some((l) => {
        const m = l.parent.content[l.index];
        return !te(m) && n.includes(m.type) ? (h = m, !0) : !1;
      }), h && (a = h);
    }
    for (; a !== void 0; ) {
      const h = typeof a == "object" && n.includes(a.type);
      if (!h && s(a, t)) return a;
      if (!h && typeof a == "object" && (((p = a.content) == null ? void 0 : p.length) ?? 0) > 0)
        t.push({ parent: a, index: 0 }), [a] = a.content;
      else {
        if (!h) {
          const l = typeof a == "object" ? { isClosingMarker: !0, forMarker: a } : void 0;
          if (l && s(l, t))
            return l;
        }
        for (a = void 0; t.length > 0; ) {
          const l = t.pop();
          if (l)
            if (l.index + 1 < l.parent.content.length) {
              l.index += 1, t.push(l), a = l.parent.content[l.index];
              break;
            } else {
              const m = {
                isClosingMarker: !0,
                forMarker: l.parent
              };
              if (s(m, t)) return m;
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
      (c, p) => typeof c == "object" && "isClosingMarker" in c ? !1 : s(c, p)
    );
  }
  // #endregion Walk the node tree
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return F.convertWorkingStackToJsonPath(this.createWorkingStack(e));
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
    var a;
    let n;
    if (te(e)) {
      if (t === void 0)
        throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
      const c = Array.isArray(t) ? this.parentMap.get(t) : t;
      if (c === void 0)
        throw new Error(`Cannot find parent for ${JSON.stringify(t)}`);
      n = this.createWorkingStack(c);
      const p = (a = c.content) == null ? void 0 : a.indexOf(e);
      if (p === void 0 || p < 0)
        throw new Error("Could not find index of node in parent for creating working stack");
      n.push({ parent: c, index: p });
    } else
      n = this.createWorkingStack(e);
    const s = F.convertNodeToUsjDocumentLocation(e, n);
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
    const n = te(t) ? this.findParent(e) : void 0;
    if (!n && te(t))
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
    const s = this.getVerseRefForIndexInUsfm(n.indexInUsfm, t), a = this.getIndexInUsfmForVerseRef(s);
    return {
      verseRef: s,
      // Final USFM verse offset is the fragment's location relative to the verse plus whatever
      // offset is in the USJ location
      offset: n.indexInUsfm - a + F.getOffsetInUsjDocumentLocation(e)
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
    const t = Object.keys(this.indicesInUsfmByVerseRef), n = t.length === 0 || t.length === 1 && t[0] === Je, s = n ? Je : e;
    if (!this.indicesInUsfmByVerseRef[s])
      throw new Error(
        `Book ID ${e} not found in USJ! ${n ? `There seems to be no USJ content because there is no content in ${Je} either` : `Book IDs in USJ: ${JSON.stringify(t)}`}`
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
    const a = s[e.verseNum];
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
    let s = 0, a, c = !1;
    for (; !c && s < n.length; ) {
      const [l, m] = n[s];
      if (m) {
        const f = Object.entries(m);
        let g = 0;
        for (; !c && g < f.length; ) {
          const [b, y] = f[g];
          if (y) {
            const v = Object.entries(y);
            let O = 0;
            for (; !c && O < v.length; ) {
              const [S, T] = v[O];
              if (T !== void 0) {
                if (e < T) {
                  if (!a)
                    throw new Error(
                      `Could not find verse ref for index in USFM ${e} less than the first known index ${T}`
                    );
                  c = !0;
                  break;
                }
                if (a = {
                  book: l,
                  chapterNum: parseInt(b, 10),
                  verseNum: parseInt(S, 10)
                }, e === T) {
                  c = !0;
                  break;
                }
              }
              O += 1;
            }
          }
          g += 1;
        }
      }
      s += 1;
    }
    if (!a)
      throw new Error(`Did not find any verse refs while looking for index in USFM ${e}`);
    if (a.book === Je) {
      if (!t)
        throw new Error(
          `Could not find book ID and no book ID provided when finding USFM verse ref for index in USFM ${e}`
        );
      a.book = t;
    }
    const p = this.getIndexInUsfmForVerseRef(a), h = this.fragmentsByIndexInUsfm.get(p);
    return h && F.isFragmentAMarker(h.fragment) && h.fragment.type === $e && h.fragment.number && h.fragment.number !== `${a.verseNum}` && (a.verse = h.fragment.number), a;
  }
  usfmVerseLocationToIndexInUsfm(e) {
    const { verseRef: t, offset: n } = F.usfmVerseLocationToUsfmVerseRefVerseLocation(e);
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
    const { verseRef: t, offset: n } = F.usfmVerseLocationToUsfmVerseRefVerseLocation(e), s = this.usfmVerseLocationToIndexInUsfm(e), { value: a } = this.fragmentsByIndexInUsfm.findClosestLessThanOrEqual(
      s
    ) ?? {
      value: void 0
    };
    if (!a)
      throw new Error(
        `Somehow, did not find anything at index in verse ${n} or below in ${t.book} ${t.chapterNum}:${t.verseNum}. Not sure how this would happen.`
      );
    const c = s - a.indexInUsfm;
    return {
      ...a.nodeAndDocumentLocation,
      documentLocation: F.moveUsjDocumentLocationToNewOffset(
        a.nodeAndDocumentLocation.documentLocation,
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
      if (!te(e.node)) return !1;
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
    let s = "", a = 0, c = 0, p = -1;
    const h = this.convertJsonPathToWorkingStack(
      e.documentLocation.jsonPath
    ), l = h.length > 0 ? {
      ...h[h.length - 1]
    } : void 0;
    if (F.findNextMatchingNodeUsingWorkingStack(
      e.node,
      h,
      St,
      (b, y) => {
        if (typeof b != "string") return !1;
        let v = b;
        const O = y[y.length - 1];
        if (l && F.areStackItemsShallowEqual(O, l)) {
          if (!("offset" in e.documentLocation))
            throw new Error(
              `Somehow 'offset' was not in text content string document location. This should not happen. ${JSON.stringify(e.documentLocation)}`
            );
          v = b.substring(e.documentLocation.offset), c += e.documentLocation.offset;
        }
        a += v.length, s = `${s}${v}`;
        const S = s.indexOf(t);
        return S < 0 ? (c += s.length, s.length > t.length && (s = s.substring(s.length - t.length)), c -= s.length, a > n) : (p = c + S, !0);
      }
    ), p < 0) return;
    a = 0;
    let m = 0, f = [];
    const g = F.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      St,
      (b, y) => typeof b != "string" || (a += b.length, a < p + 1) ? !1 : (m = p - a + b.length, f = y, !0)
    );
    if (!g) throw new Error("Internal error: inconsistent search results");
    if (!te(g))
      throw new Error(
        `Somehow found non-string node while searching for strings: ${JSON.stringify(g)}`
      );
    return {
      node: g,
      documentLocation: {
        jsonPath: F.convertWorkingStackToJsonPath(f),
        offset: m
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
    }, s = [], a = new rr();
    let c = 0, p = n.node;
    for (; p !== void 0; )
      p = F.findNextMatchingNodeUsingWorkingStack(
        n.node,
        this.convertJsonPathToWorkingStack(n.documentLocation.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (m, f) => (typeof m != "string" || (s.push(m), a.set(c, {
          node: m,
          documentLocation: {
            offset: 0,
            jsonPath: F.convertWorkingStackToJsonPath(f)
          }
        }), c += m.length), !1)
      );
    const h = s.join("");
    let l = e.exec(h);
    for (; l; ) {
      if (l[0].length > 0) {
        if (l.index < 0 || l.index >= h.length)
          throw new Error(`Match index out of bounds: ${l.index}`);
        const m = a.findClosestLessThanOrEqual(l.index);
        if (!m)
          throw new Error(`Internal error: no starting node found for index ${l.index}`);
        const f = {
          node: m.value.node,
          documentLocation: {
            jsonPath: m.value.documentLocation.jsonPath,
            offset: l.index - m.key
          }
        }, g = a.findClosestLessThanOrEqual(
          l.index + l[0].length - 1
        );
        if (!g)
          throw new Error(`Internal error: no ending node found for index ${l.index}`);
        const b = {
          node: g.value.node,
          documentLocation: {
            jsonPath: g.value.documentLocation.jsonPath,
            offset: l.index + l[0].length - g.key
          }
        };
        t.push({ text: l[0], start: f, end: b });
      }
      if (!e.global) break;
      l = e.exec(h);
    }
    return t;
  }
  // #endregion Search for text from a certain point
  // #region Extract text from a node + JSONPath + offset
  extractText(e, t) {
    let n = "", s = "offset" in e.documentLocation ? e.documentLocation.offset : 0, a = 0;
    return F.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      St,
      (c) => {
        if (typeof c != "string") return !1;
        if (s >= c.length)
          return s -= c.length, !1;
        let p = c;
        if (s > 0 && (p = p.substring(s), s = 0), a + p.length < t)
          return a += p.length, n = `${n}${p}`, !1;
        const h = t - a;
        return n = `${n}${p.substring(0, h - 1)}`, !0;
      }
    ), n;
  }
  extractTextBetweenPoints(e, t, n = 100) {
    let s = "";
    return F.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.documentLocation.jsonPath),
      St,
      (a, c) => a === t.node && (typeof a == "object" || t.documentLocation.jsonPath === F.convertWorkingStackToJsonPath(c)) ? !0 : typeof a != "string" ? !1 : (s = `${s}${a}`, s.length > n && (s = s.substring(0, n)), s.length >= n)
    ), s;
  }
  // #endregion Extract text from a node + JSONPath + offset
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, t) {
    let n = 0;
    for (let s = e.length - 1; s >= 0; s--) {
      const a = e[s];
      t(a) ? (e.splice(s, 1), n += 1) : typeof a != "string" && a.content && (n += this.removeContentNodesFromArray(a.content, t));
    }
    return n;
  }
  removeContentNodes(e) {
    const t = F.removeContentNodesFromArray(this.usj.content, e);
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
    const n = te(e) ? e : (
      // Usj type has no `marker` property, but the Usj marker isn't really different than any other
      // marker with no `marker` property. It is appropriate to treat them the same to get the name
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      e.marker ?? e.type
    );
    let s = !1, a = this.getMarkerInfo(n);
    const c = (a == null ? void 0 : a.type) ?? (te(e) ? "" : e.type);
    let p = n;
    if (a != null && a.markerUsfm && (p = a.markerUsfm, a = this.getMarkerInfo(p)), !a) {
      if (te(e))
        throw new Error(`Unknown marker ${n} and no marker type provided`);
      a = { type: e.type }, s = !0, console.warn(
        `Unknown marker ${n}. Creating MarkerInfo to use: ${JSON.stringify(a)}`
      );
    }
    let h = a.type, l = this.markersMap.markerTypes[h];
    if (l != null && l.markerTypeUsfm && (h = l.markerTypeUsfm, l = this.markersMap.markerTypes[h]), !te(e) && e.type !== c && (!l || e.type !== l.markerTypeUsfm && e.type !== l.markerTypeUsx && e.type !== l.markerTypeUsj) && (console.warn(
      `Warning: Mismatching marker type in the USJ content ${e.type} vs marker type in the marker info ${a.type} for marker ${n}. Using the type from the USJ content.`
    ), h = e.type, l = this.markersMap.markerTypes[h], s = !0), !l)
      throw new Error(
        `Unknown marker type ${h} on marker ${n}! Cannot proceed.`
      );
    s && h === "para" && (l = { ...l, hasNewlineBefore: !1 });
    const m = [];
    a.attributeMarkers && a.attributeMarkers.forEach((g) => {
      const b = this.getMarkerInfo(g);
      b && "attributeMarkerAttributeName" in b && m.push([g, b]);
    });
    const f = e;
    if (t === "usfm" && h === "cell" && f.colspan) {
      const g = parseInt(f.colspan, 10), b = Yi.exec(n);
      if (b != null && b[1]) {
        const y = parseInt(b[1], 10);
        !Number.isNaN(y) && !Number.isNaN(g) && (p = `${n}-${y + g - 1}`, l = {
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
      markerName: p,
      markerInfo: a,
      markerType: h,
      markerTypeInfo: l,
      attributeMarkerInfoEntries: m
    };
  }
  /** Converts the text content of a marker to its equivalent in USFM */
  textContentToUsfm(e) {
    return {
      usfm: this.shouldAllowInvisibleCharacters ? e : e.replace(Xi, "~"),
      fragmentsInfo: [{ fragment: e, indexInUsfm: 0 }]
    };
  }
  /**
   * Merge an independent array of fragment info into an existing array of fragment info, offsetting
   * the indices of the new fragments so their locations start from the end of the string
   */
  static mergeFragmentsInfoIntoExistingArray(e, t, n) {
    e.forEach((s) => {
      const a = n + s.indexInUsfm;
      t.push({
        ...s,
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
    const s = [], { markerName: a, markerInfo: c, markerType: p, markerTypeInfo: h, attributeMarkerInfoEntries: l } = this.getInfoForMarker(e), m = e;
    h.hasNewlineBefore && (n += `
`);
    const f = t ? h.nestedPrefix ?? "" : "";
    return s.push({ fragment: e, indexInUsfm: n.length }), n += p === "optbreak" ? "//" : `\\${f}`, p !== "optbreak" && (s.push({
      fragment: { attributeValueForKey: "marker", forMarker: e },
      indexInUsfm: n.length
    }), n += `${a}${p === "unmatched" ? "" : " "}`), c.leadingAttributes && c.leadingAttributes.forEach((g) => {
      const b = m[g];
      b && (s.push({
        fragment: { attributeValueForKey: g, forMarker: e },
        indexInUsfm: n.length
      }), n += `${b} `);
    }), c.textContentAttribute && m[c.textContentAttribute] && (s.push({
      fragment: { attributeValueForKey: c.textContentAttribute, forMarker: e },
      indexInUsfm: n.length
    }), n += `${m[c.textContentAttribute]} `), c.attributeMarkers && l.forEach(([g, b]) => {
      const y = m[b.attributeMarkerAttributeName];
      if (!y) return;
      const v = {
        type: b.type,
        marker: g,
        content: [y]
      }, O = [];
      n = this.addMarkerUsfmToString(
        n,
        v,
        e,
        O
      );
      const { usfm: S } = this.textContentToUsfm(y);
      s.push({
        fragment: {
          attributeValueForKey: b.attributeMarkerAttributeName,
          forMarker: e
        },
        indexInUsfm: n.length
      }), n += S, n = this.addMarkerUsfmToString(
        n,
        {
          isClosingMarker: !0,
          forMarker: v
        },
        e,
        O
      ), O.forEach((T) => {
        if (te(T.fragment) || "attributeKey" in T.fragment)
          throw new Error(
            `Attribute marker opening or closing markers generated a text content fragment or an attribute key fragment! This does not make sense. ${JSON.stringify(T)}`
          );
        if (F.isFragmentAMarker(T.fragment)) {
          s.push({
            ...T,
            fragment: {
              attributeMarker: b.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("attributeValueForKey" in T.fragment) {
          if (T.fragment.attributeValueForKey !== "marker")
            throw new Error(
              `Attribute marker opening or closing markers generated an attribute value fragment for a key that was not marker! This does not make sense. ${JSON.stringify(T)}`
            );
          s.push({
            ...T,
            fragment: {
              attributeKey: b.attributeMarkerAttributeName,
              forMarker: e
            }
          });
          return;
        }
        if ("isClosingMarker" in T.fragment) {
          const { isClosingMarker: $, ...Q } = T.fragment, se = {
            ...Q,
            forMarker: e,
            attributeMarkerClosingMarker: b.attributeMarkerAttributeName
          };
          s.push({
            ...T,
            fragment: se
          });
          return;
        }
        throw new Error(
          `Attribute marker opening or closing markers generated an unrecognized fragment: ${JSON.stringify(T)}`
        );
      }), !this.markersMap.isSpaceAfterAttributeMarkersContent && b.hasStructuralSpaceAfterCloseAttributeMarker && (n += " ");
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
      markerInfo: a,
      markerType: c,
      markerTypeInfo: p,
      attributeMarkerInfoEntries: h
    } = this.getInfoForMarker(e), l = Object.keys(e).filter((y) => {
      var v, O;
      return !(y === "type" || y === "marker" || y === "content" || y === "closed" || (v = p.skipOutputAttributeToUsfm) != null && v.includes(y) || (O = a.leadingAttributes) != null && O.includes(y) || a.textContentAttribute === y || h.some(
        ([, S]) => S.attributeMarkerAttributeName === y
      ));
    }), m = e;
    if (p.isCloseable && a.independentClosingMarkers && a.independentClosingMarkers.length > 0)
      throw new Error(
        `Marker ${s} is intended to have a normal closing marker and independent closing markers. As of writing this code, there is no known syntax for this situation in USFM. Cannot proceed.`
      );
    let f = !0;
    if ((m.closed === "false" || a.isClosingMarkerOptional && !this.markersMap.shouldOptionalClosingMarkersBePresent && m.closed !== "true") && (f = !1), a.independentClosingMarkers && a.independentClosingMarkers.length > 0 && f) {
      const y = {
        type: c,
        marker: a.independentClosingMarkers[0],
        // Put all the closing marker attributes on here since we don't really have a better place
        // to put them and might as well
        ...Object.fromEntries(
          l.map((Q) => [
            Q,
            m[Q]
          ])
        )
      };
      let v = "";
      const O = [], { usfm: S, fragmentsInfo: T } = this.openingMarkerToUsfm(y, t), $ = T.find((Q) => F.isFragmentAMarker(Q.fragment));
      if (!$)
        throw new Error(
          `Could not find opening fragment info for independent closing marker ${JSON.stringify(
            y
          )}. Fragments info generated: ${JSON.stringify(T)}`
        );
      return O.push({
        ...$,
        fragment: { isClosingMarker: !0, forMarker: e }
      }), v += S, n !== y.marker && (v = this.addMarkerUsfmToString(
        v,
        {
          isClosingMarker: !0,
          forMarker: y
        },
        t
      )), { usfm: v, fragmentsInfo: O };
    }
    let g = "";
    const b = [];
    if (l.length > 0 && (g += "|", l.length === 1 && l[0] === a.defaultAttribute ? (b.push({
      fragment: { attributeValueForKey: a.defaultAttribute, forMarker: e },
      indexInUsfm: g.length
    }), g += m[a.defaultAttribute]) : l.forEach((y, v) => {
      const O = c === "figure" && y === "file" ? "src" : y;
      v > 0 && (g += " "), b.push({
        fragment: { attributeKey: y, forMarker: e },
        indexInUsfm: g.length
      }), g += `${O}="`, b.push({
        fragment: { attributeValueForKey: y, forMarker: e },
        indexInUsfm: g.length
      }), g += `${m[y]}"`;
    })), p.isCloseable && f) {
      const y = p.isClosingMarkerEmpty ? "" : s, v = t ? p.nestedPrefix ?? "" : "";
      b.push({
        fragment: { isClosingMarker: !0, forMarker: e },
        indexInUsfm: g.length
      }), g += `\\${v}${y}*`;
    }
    return { usfm: g, fragmentsInfo: b };
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
    let a = e, c, p;
    const { markerNameOriginal: h, markerType: l, markerTypeInfo: m } = this.getInfoForMarker(
      "isClosingMarker" in t ? t.forMarker : t
    );
    let f = !1;
    if (typeof n == "boolean")
      f = n;
    else if (n) {
      const { markerType: g } = this.getInfoForMarker(
        n
      );
      g === l && (f = !0);
    }
    if ("isClosingMarker" in t) {
      const { usfm: g, fragmentsInfo: b } = this.closingMarkerToUsfm(
        t.forMarker,
        f
      );
      p = b, c = g, m.isCloseable && m.isClosingMarkerEmpty && // No contents
      (!t.forMarker.content || t.forMarker.content.length === 0) && // No closing marker attributes
      !c.startsWith("|") && (a = F.removeEndSpace(a));
    } else {
      const { usfm: g, fragmentsInfo: b } = this.openingMarkerToUsfm(
        t,
        f
      );
      p = b, c = g;
    }
    if (c.startsWith(`
`) && (a.length === 0 ? (p = p.map((g) => ({
      ...g,
      indexInUsfm: g.indexInUsfm - 1
    })), c = c.substring(1)) : a = F.removeEndSpace(a)), this.markersMap.isSpaceAfterAttributeMarkersContent && h === "ca") {
      const g = a.lastIndexOf("\\");
      g >= 0 && e.substring(
        g + 1,
        g + 3
      ) === "c " && (a = F.removeEndSpace(a), a += `
 `);
    }
    return s && F.mergeFragmentsInfoIntoExistingArray(
      p,
      s,
      a.length
    ), a += c, a;
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
    const { jsonPath: s, ...a } = e, { jsonPath: c, ...p } = t;
    return !n && !zt(Ct.toPathArray(s), Ct.toPathArray(c)) ? !1 : zt(a, p);
  }
  /** Find the fragment info corresponding to the specified USJ Document location. */
  findFragmentInfoAtUsjDocumentLocation(e) {
    const t = F.moveUsjDocumentLocationToNewOffset(e, 0);
    let n;
    const s = this.fragmentsByJsonPath.get(
      F.normalizeJsonPath(e.jsonPath)
    );
    if (s)
      return s.find((a) => F.areUsjDocumentLocationsEqual(
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
    const s = F.convertWorkingStackToJsonPath(t);
    return te(e) ? { jsonPath: s, offset: n } : { jsonPath: s };
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
    if (te(e) || F.isFragmentAMarker(e)) {
      const s = F.convertNodeToUsjDocumentLocation(
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
      const a = {
        jsonPath: F.convertWorkingStackToJsonPath(t),
        closingMarkerOffset: n
      };
      return {
        node: e.forMarker,
        documentLocation: a
      };
    }
    if ("attributeValueForKey" in e) {
      const a = {
        jsonPath: F.convertWorkingStackAndPropertyToJsonPath(
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
        jsonPath: F.convertWorkingStackToJsonPath(t),
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
        jsonPath: F.convertWorkingStackToJsonPath(t),
        keyName: e.attributeMarker
      };
      return {
        node: e.forMarker,
        documentLocation: a
      };
    }
    if ("attributeMarkerClosingMarker" in e) {
      const a = {
        jsonPath: F.convertWorkingStackToJsonPath(t),
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
  static transferFragmentsInfoArrayToMaps(e, t, n, s, a, c) {
    e.map((h) => {
      var m, f, g;
      if (typeof h.fragment == "object" && "type" in h.fragment) {
        const b = h.fragment;
        if (b.type === Qn && b.code)
          n.bookId = b.code, n.chapterNum = 0, n.verseNum = 0, c[Je] && (c[n.bookId] = c[Je], delete c[Je]);
        else if (b.type === Nr && b.number) {
          const y = parseInt(b.number, 10);
          if (Number.isNaN(y))
            console.warn(
              `Found ${Nr} type marker with number ${b.number}, but could not parse chapter number from it. Continuing using previous chapter number ${n.chapterNum}`
            );
          else {
            n.chapterNum = y, n.verseNum = 0;
            const v = c[n.bookId];
            v != null && v[0] && (v[n.chapterNum] = v[0], delete v[0]);
          }
        } else if (b.type === $e && b.number) {
          const y = (m = Ki.exec(b.number)) == null ? void 0 : m[1];
          if (!y)
            console.warn(
              `Found ${$e} type marker with number ${b.number}, but could not find starting verse number in it. Continuing using previous verse number ${n.verseNum}`
            );
          else {
            const v = parseInt(y, 10);
            Number.isNaN(v) ? console.warn(
              `Found ${$e} type marker with number ${b.number}, but could not parse starting verse number from ${y}. Continuing using previous verse number ${n.verseNum}`
            ) : (g = (f = c[n.bookId]) == null ? void 0 : f[n.chapterNum]) != null && g[v] ? console.warn(`Found ${$e} marker with existing number ${v} after
                  current ${$e} number ${n.verseNum}! Not updating verse start index. All positions in this duplicate verse will be based on the current ${$e} marker, not the new duplicate marker.`) : (v < n.verseNum && console.debug(
              `Found ${$e} marker with number ${v} lower than current ${$e} number ${n.verseNum}. Verses are out of order. There may be some issues.`
            ), n.verseNum = v);
          }
        }
      }
      return {
        ...h,
        // Determine the appropriate `UsjDocumentLocation` subtype based on what this fragment is
        nodeAndDocumentLocation: F.convertFragmentToUsjNodeAndDocumentLocation(
          h.fragment,
          t
        )
      };
    }).forEach((h) => {
      s.set(h.indexInUsfm, h);
      const l = h.nodeAndDocumentLocation.documentLocation.jsonPath, m = a.get(l);
      m ? m.push(h) : a.set(l, [h]), c[n.bookId] || (c[n.bookId] = {}), c[n.bookId][n.chapterNum] || (c[n.bookId][n.chapterNum] = {}), c[n.bookId][n.chapterNum][n.verseNum] === void 0 && (c[n.bookId][n.chapterNum][n.verseNum] = h.indexInUsfm);
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
    const t = new rr(), n = /* @__PURE__ */ new Map(), s = {}, a = [], c = {
      bookId: Je,
      chapterNum: 0,
      verseNum: 0
    };
    function p(m) {
      F.transferFragmentsInfoArrayToMaps(
        a,
        m,
        c,
        t,
        n,
        s
      );
    }
    let h;
    const l = [];
    return F.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      this.usj,
      // Working stack is empty since the top-level object doesn't have any parents
      [],
      // Don't skip anything
      [],
      (m, f) => {
        if (typeof m != "object") {
          const { usfm: b, fragmentsInfo: y } = this.textContentToUsfm(m);
          return F.mergeFragmentsInfoIntoExistingArray(
            y,
            a,
            e.length
          ), p(f), e += b, !1;
        }
        let g;
        return f.length > 0 && (g = f[f.length - 1].parent), "isClosingMarker" in m ? l.length > 0 && l[l.length - 1] === m.forMarker ? (l.pop(), !1) : (e = this.addMarkerUsfmToString(
          e,
          m,
          g,
          a
        ), p(f), m.forMarker.type === "book" && h && (e = this.addMarkerUsfmToString(e, h, g, a), p(f), h = void 0), !1) : this.shouldSkipOutputMarkerToUsfm(m) ? (l.push(m), !1) : F.isTopLevelUsjMarker(m, f) && !h ? (m.version !== "3.0" && (h = m), !1) : (e = this.addMarkerUsfmToString(e, m, g, a), p(f), !1);
      }
    ), e = `${F.removeEndSpace(e)}
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
  Zt as AsyncVariable,
  Nr as CHAPTER_TYPE,
  eo as Collator,
  an as DateTimeFormat,
  fn as DocumentCombiner,
  co as EventRollingTimeCounter,
  jn as FIRST_SCR_BOOK_NUM,
  zn as FIRST_SCR_CHAPTER_NUM,
  Jn as FIRST_SCR_VERSE_NUM,
  Vn as LAST_SCR_BOOK_NUM,
  Wo as MODIFIER_KEYS,
  hn as Mutex,
  lo as MutexMap,
  fo as NonValidatingDocumentCombiner,
  dn as NumberFormat,
  Bt as PLATFORM_ERROR_VERSION,
  sn as PlatformEventEmitter,
  po as PromiseChainingMap,
  Xn as Section,
  rr as SortedNumberMap,
  ho as SortedSet,
  Ji as THEME_STYLE_ELEMENT_ID,
  Jt as USFM_MARKERS_MAP_3_0,
  ea as USFM_MARKERS_MAP_PARATEXT_3_0,
  mo as UnsubscriberAsyncList,
  F as UsjReaderWriter,
  $e as VERSE_TYPE,
  jo as aggregateUnsubscriberAsyncs,
  $o as aggregateUnsubscribers,
  Zo as applyThemeStylesheet,
  qo as areUsjContentsEqualExceptWhitespace,
  Pt as at,
  Et as charAt,
  bo as codePointAt,
  Lo as compareScrRefs,
  ao as createSyncProxyForAsyncObject,
  ro as debounce,
  xt as deepClone,
  zt as deepEqual,
  ko as defaultScrRef,
  _i as deserialize,
  Pn as endsWith,
  Jr as ensureArray,
  wo as escapeStringRegexp,
  Qo as expandThemeContribution,
  Xo as formatBytes,
  Ko as formatRelativeDate,
  vo as formatReplacementString,
  Ln as formatReplacementStringToArray,
  Fo as formatScrRef,
  Yo as formatTimeSpan,
  oo as getAllObjectFunctionNames,
  Gn as getChaptersForBook,
  Ho as getCurrentLocale,
  Yr as getDefaultCallerSequence,
  Br as getErrorMessage,
  Vo as getFormatCallerFunction,
  Hn as getLocalizeKeyForScrollGroupId,
  _o as getLocalizeKeysForScrollGroupIds,
  Po as getLocalizedIdFromBookNumber,
  Zn as getNthCaller,
  zo as getPaneSizeLimits,
  Uo as getSectionForBook,
  Hi as getStylesheetForTheme,
  no as groupBy,
  Go as htmlEncode,
  _n as includes,
  Mt as indexOf,
  so as isErrorMessageAboutParatextBlockingInternetAccess,
  uo as isErrorMessageAboutRegistryAuthFailure,
  To as isLocalizeKey,
  Eo as isPlatformError,
  Jo as isSerializable,
  te as isString,
  Li as isSubset,
  gt as isWhiteSpace,
  Fn as lastIndexOf,
  ji as localizedStringsDocumentSchema,
  Vi as menuDocumentSchema,
  to as newGuid,
  go as newPlatformError,
  Do as normalize,
  vr as normalizeScriptureSpaces,
  Mo as offsetBook,
  Oo as offsetChapter,
  Bo as offsetVerse,
  Ao as ordinalCompare,
  No as padEnd,
  Co as padStart,
  qi as projectSettingsDocumentSchema,
  Ro as scrRefToBBBCCC,
  yr as scrRefToBBBCCCVVV,
  Or as serialize,
  $i as settingsDocumentSchema,
  gr as slice,
  Er as split,
  Gr as startsWith,
  he as stringLength,
  ot as substring,
  zi as themeDocumentSchema,
  Un as toArray,
  xo as toKebabCase,
  So as transformAndEnsureRegExpArray,
  Io as transformAndEnsureRegExpRegExpArray,
  ln as wait,
  io as waitForDuration
};
//# sourceMappingURL=index.js.map
