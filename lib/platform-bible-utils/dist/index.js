var Wr = Object.defineProperty;
var Qr = (t, e, r) => e in t ? Wr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var z = (t, e, r) => Qr(t, typeof e != "symbol" ? e + "" : e, r);
import { Mutex as Zr } from "async-mutex";
import { JSONPath as Wt } from "jsonpath-plus";
const St = class St {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, r = 1e4) {
    z(this, "variableName");
    z(this, "promiseToValue");
    z(this, "timeoutId");
    z(this, "timeoutOccurred");
    z(this, "resolver");
    z(this, "rejecter");
    this.variableName = e, this.timeoutOccurred = !1, this.promiseToValue = new Promise((u, o) => {
      this.resolver = u, this.rejecter = o;
    }), r > 0 && (this.timeoutId = setTimeout(() => {
      this.rejecter && (this.rejecter(`Timeout reached when waiting for ${this.variableName} to settle`), this.timeoutOccurred = !0, this.complete());
    }, r)), Object.seal(this);
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
  resolveToValue(e, r = !1) {
    if (this.resolver)
      St.verboseLoggingEnabled && console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
    else {
      if (r) throw Error(`${this.variableName} was already settled`);
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
  rejectWithReason(e, r = !1) {
    if (this.rejecter)
      St.verboseLoggingEnabled && console.debug(`${this.variableName} is being rejected now with reason: ${e}`), this.rejecter(e), this.complete();
    else {
      if (r) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }
  /** Prevent any further updates to this variable */
  complete() {
    this.resolver = void 0, this.rejecter = void 0, this.timeoutId !== void 0 && (clearTimeout(this.timeoutId), this.timeoutId = void 0), Object.freeze(this);
  }
};
z(St, "verboseLoggingEnabled", !1);
let Qt = St;
class Ju {
  constructor(e, r) {
    z(this, "collator");
    this.collator = new Intl.Collator(e, r);
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
  compare(e, r) {
    return this.collator.compare(e, r);
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
class en {
  constructor(e, r) {
    z(this, "dateTimeFormatter");
    this.dateTimeFormatter = new Intl.DateTimeFormat(e, r);
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
  formatRange(e, r) {
    return this.dateTimeFormatter.formatRange(e, r);
  }
  /**
   * Returns an array of locale-specific tokens representing each part of the formatted date range
   * produced by this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns Array of DateTimeRangeFormatPart objects
   */
  formatRangeToParts(e, r) {
    return this.dateTimeFormatter.formatRangeToParts(e, r);
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
class tn {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    z(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    z(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    z(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    z(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    z(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    z(this, "emit", (e) => {
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
    this.assertNotDisposed(), [...this.subscriptions ?? []].forEach((u) => u(e));
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
function Xu() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function Me(t) {
  return typeof t == "string" || t instanceof String;
}
function wt(t) {
  return JSON.parse(JSON.stringify(t));
}
function Yu(t, e = 300) {
  let r, u, o, a;
  return (...p) => (clearTimeout(r), u || (u = new Promise((h, f) => {
    o = h, a = f;
  })), r = setTimeout(async () => {
    try {
      o(await t(...p));
    } catch (h) {
      a(h);
    } finally {
      u = void 0;
    }
  }, e), u);
}
function Ku(t, e, r) {
  const u = /* @__PURE__ */ new Map();
  return t.forEach((o) => {
    const a = e(o), p = u.get(a), h = r ? r(o, a) : o;
    p ? p.push(h) : u.set(a, [h]);
  }), u;
}
function rn(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function nn(t) {
  if (rn(t)) return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function xr(t) {
  return nn(t).message;
}
function un(t) {
  return new Promise((e) => setTimeout(e, t));
}
function Wu(t, e) {
  const r = un(e).then(() => {
  });
  return Promise.any([r, t()]);
}
function Qu(t, e = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((o) => {
    try {
      typeof t[o] == "function" && r.add(o);
    } catch {
    }
  });
  let u = Object.getPrototypeOf(t);
  for (; u && Object.getPrototypeOf(u); )
    Object.getOwnPropertyNames(u).forEach((o) => {
      try {
        typeof t[o] == "function" && r.add(o);
      } catch {
      }
    }), u = Object.getPrototypeOf(u);
  return r;
}
function Zu(t, e = {}) {
  return new Proxy(e, {
    get(r, u) {
      return u in r ? r[u] : async (...o) => (await t())[u](...o);
    }
  });
}
function ei(t) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return Me(t) ? t.includes(e) : xr(t).includes(e);
}
function ti(t) {
  const e = "401 Unauthorized error while getting shared projects.", r = "User registration is not valid. Cannot retrieve resources from DBL.", u = Me(t) ? t : xr(t);
  return u.includes(e) || u.includes(r);
}
class on {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, r) {
    z(this, "baseDocument");
    z(this, "contributions", /* @__PURE__ */ new Map());
    z(this, "latestOutput");
    z(this, "options");
    z(this, "onDidRebuildEmitter", new tn());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    z(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = r, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? wt(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
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
  addOrUpdateContribution(e, r) {
    this.validateContribution(e, r);
    const u = this.contributions.get(e);
    let o = this.options.copyDocuments && r ? wt(r) : r;
    o = this.transformContributionAfterValidation(e, o), this.contributions.set(e, o);
    try {
      return this.rebuild();
    } catch (a) {
      throw u ? this.contributions.set(e, u) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${a}`);
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
    if (!r) throw new Error(`${e} does not exist`);
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (u) {
      throw this.contributions.set(e, r), new Error(`Error when deleting the document named ${e}: ${u}`);
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
    e.forEach(([r]) => this.contributions.delete(r));
    try {
      return this.rebuild();
    } catch (r) {
      throw e.forEach(
        ([u, o]) => this.contributions.set(u, o)
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
      let r = wt(this.baseDocument);
      return r = this.transformFinalOutputBeforeValidation(r), this.validateOutput(r), this.latestOutput = r, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((r) => {
      e = an(
        e,
        r,
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
  validateContribution(e, r) {
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
function Zt(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || Array.isArray(r)) && (e = !1);
  }), e;
}
function er(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || !Array.isArray(r)) && (e = !1);
  }), e;
}
function an(t, e, r) {
  const u = wt(t);
  return e ? Mr(u, wt(e), r) : u;
}
function Mr(t, e, r) {
  if (!e) return t;
  if (Zt(t, e)) {
    const u = t, o = e;
    Object.keys(o).forEach((a) => {
      if (Object.hasOwn(u, a)) {
        if (Zt(u[a], o[a]))
          u[a] = Mr(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            u[a],
            o[a],
            r
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (er(u[a], o[a]))
          u[a] = u[a].concat(
            o[a]
          );
        else if (!r)
          throw new Error(`Cannot merge objects: key "${a}" already exists in the target object`);
      } else
        u[a] = o[a];
    });
  } else er(t, e) && t.push(...e);
  return t;
}
class ri {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(e) {
    /** The ring buffer to store times */
    z(this, "ringBuffer");
    /** The size of the ring buffer */
    z(this, "bufferSize");
    /** The next location where a time will be written */
    z(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    z(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    z(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    z(this, "totalInstanceCount");
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
class sn extends Zr {
}
class ni {
  constructor() {
    z(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  /**
   * Retrieves the {@link Mutex} associated with the given ID. If no Mutex exists for the provided
   * ID, a new Mutex is created, stored, and returned.
   *
   * @param mutexID Unique identifier for the desired Mutex
   * @returns The Mutex associated with the provided ID
   */
  get(e) {
    let r = this.mutexesByID.get(e);
    return r || (r = new sn(), this.mutexesByID.set(e, r), r);
  }
}
class ui extends on {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, r) {
    super(e, r);
  }
  get output() {
    return this.latestOutput;
  }
}
class cn {
  constructor(e, r) {
    z(this, "numberFormatter");
    this.numberFormatter = new Intl.NumberFormat(e, r);
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
  formatRange(e, r) {
    return this.numberFormatter.formatRange(e, r);
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
  formatRangeToParts(e, r) {
    return this.numberFormatter.formatRangeToParts(e, r);
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
const ln = Promise.resolve();
class ii {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    z(this, "map", /* @__PURE__ */ new Map());
    z(this, "logger");
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
  addPromiseFunction(e, r) {
    const u = this.map.get(e);
    this.map.set(e, u ? u.then(r) : r()), this.cleanupPromiseChain(e);
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
    const r = this.map.get(e);
    if (!r) return;
    const u = { promise: ln }, o = r.catch((a) => this.logger.warn(`Error in promise for ${e}: ${a.message}`)).finally(() => {
      this.map.get(e) === u.promise && this.map.delete(e);
    });
    u.promise = o, this.map.set(e, o);
  }
}
class fn {
  constructor() {
    z(this, "map", /* @__PURE__ */ new Map());
    z(this, "sortedKeys", []);
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
  set(e, r) {
    if (!this.map.has(e)) {
      const u = this.binarySearchInsertIndex(e);
      this.sortedKeys.splice(u, 0, e);
    }
    this.map.set(e, r);
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
    const r = this.binarySearchLessThanOrEqual(e);
    if (r === -1) return;
    const u = this.sortedKeys[r], o = this.map.get(u);
    if (o !== void 0)
      return { key: u, value: o };
  }
  binarySearchLessThanOrEqual(e) {
    let r = 0, u = this.sortedKeys.length - 1, o = -1;
    for (; r <= u; ) {
      const a = Math.floor((r + u) / 2);
      this.sortedKeys[a] <= e ? (o = a, r = a + 1) : u = a - 1;
    }
    return o;
  }
  binarySearchInsertIndex(e) {
    let r = 0, u = this.sortedKeys.length;
    for (; r < u; ) {
      const o = Math.floor((r + u) / 2);
      this.sortedKeys[o] < e ? r = o + 1 : u = o;
    }
    return r;
  }
}
class oi {
  /**
   * Creates a new sorted set
   *
   * @param compareFn - Function used to determine the order of elements. Returns negative when a <
   *   b, zero when a = b, positive when a > b
   */
  constructor(e) {
    /** Internal storage for the sorted items */
    z(this, "items", []);
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
    const r = this.findInsertionIndex(e);
    return r < this.items.length && this.compareFn(this.items[r], e) === 0 ? !1 : (this.items.splice(r, 0, e), !0);
  }
  /**
   * Removes an item from the set
   *
   * @param item - The item to remove
   * @returns True if the item was removed; false if it wasn't found
   */
  remove(e) {
    const r = this.findIndex(e);
    return r < 0 ? !1 : (this.items.splice(r, 1), !0);
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
    const r = this.findInsertionIndex(e);
    return r < this.items.length && this.compareFn(this.items[r], e) === 0 ? r : -1;
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
    this.items.forEach((r, u) => e(r, u, this));
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
    let r = 0, u = this.items.length;
    for (; r < u; ) {
      const o = Math.floor((r + u) / 2);
      this.compareFn(this.items[o], e) < 0 ? r = o + 1 : u = o;
    }
    return r;
  }
}
class ai {
  constructor(e = "Anonymous") {
    z(this, "unsubscribers", /* @__PURE__ */ new Set());
    this.name = e;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...e) {
    e.forEach((r) => {
      "dispose" in r ? this.unsubscribers.add(r.dispose.bind(r)) : this.unsubscribers.add(r);
    });
  }
  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * @returns `true` if all unsubscribers succeeded, `false` otherwise.
   */
  async runAllUnsubscribers() {
    const e = [...this.unsubscribers].map((u) => u()), r = await Promise.all(e);
    return this.unsubscribers.clear(), r.every((u, o) => (u || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${o} failed!`), u));
  }
}
const xt = 1;
function si(t) {
  if (!t) return { message: "", platformErrorVersion: xt };
  if (Me(t)) return { message: t, platformErrorVersion: xt };
  if (typeof t == "object" && "message" in t && typeof t.message == "string") {
    const e = {
      message: t.message,
      platformErrorVersion: xt
    };
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)), Object.defineProperty(e, "message", { enumerable: !0 }), "stack" in t && Me(t.stack) && Object.defineProperty(e, "stack", { value: t.stack, enumerable: !0 }), "cause" in e && Object.defineProperty(e, "cause", { enumerable: !0 }), e;
  }
  return { cause: t, message: "", platformErrorVersion: xt };
}
function ci(t) {
  return !!t && typeof t == "object" && "platformErrorVersion" in t;
}
var hn = Object.defineProperty, pn = (t, e, r) => e in t ? hn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, H = (t, e, r) => pn(t, typeof e != "symbol" ? e + "" : e, r);
const it = [
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
], zt = [
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
], Br = [
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
], tr = yn();
function Et(t, e = !0) {
  return e && (t = t.toUpperCase()), t in tr ? tr[t] : 0;
}
function Gt(t) {
  return Et(t) > 0;
}
function dn(t) {
  const e = typeof t == "string" ? Et(t) : t;
  return e >= 40 && e <= 66;
}
function mn(t) {
  return (typeof t == "string" ? Et(t) : t) <= 39;
}
function Rr(t) {
  return t <= 66;
}
function gn(t) {
  const e = typeof t == "string" ? Et(t) : t;
  return Lr(e) && !Rr(e);
}
function* En() {
  for (let t = 1; t <= it.length; t++) yield t;
}
const Dn = 1, _r = it.length;
function vn() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Ht(t, e = "***") {
  const r = t - 1;
  return r < 0 || r >= it.length ? e : it[r];
}
function Pr(t) {
  return t <= 0 || t > _r ? "******" : Br[t - 1];
}
function An(t) {
  return Pr(Et(t));
}
function Lr(t) {
  const e = typeof t == "number" ? Ht(t) : t;
  return Gt(e) && !zt.includes(e);
}
function bn(t) {
  const e = typeof t == "number" ? Ht(t) : t;
  return Gt(e) && zt.includes(e);
}
function Nn(t) {
  return Br[t - 1].includes("*obsolete*");
}
function yn() {
  const t = {};
  for (let e = 0; e < it.length; e++)
    t[it[e]] = e + 1;
  return t;
}
const le = {
  allBookIds: it,
  nonCanonicalIds: zt,
  bookIdToNumber: Et,
  isBookIdValid: Gt,
  isBookNT: dn,
  isBookOT: mn,
  isBookOTNT: Rr,
  isBookDC: gn,
  allBookNumbers: En,
  firstBook: Dn,
  lastBook: _r,
  extraBooks: vn,
  bookNumberToId: Ht,
  bookNumberToEnglishName: Pr,
  bookIdToEnglishName: An,
  isCanonical: Lr,
  isExtraMaterial: bn,
  isObsolete: Nn
};
var Le = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(Le || {});
const Te = class {
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
H(Te, "Original", new Te(Le.Original)), H(Te, "Septuagint", new Te(Le.Septuagint)), H(Te, "Vulgate", new Te(Le.Vulgate)), H(Te, "English", new Te(Le.English)), H(Te, "RussianProtestant", new Te(Le.RussianProtestant)), H(Te, "RussianOrthodox", new Te(Le.RussianOrthodox));
let nt = Te;
function rr(t, e) {
  const r = e[0];
  for (let u = 1; u < e.length; u++)
    t = t.split(e[u]).join(r);
  return t.split(r);
}
var kr = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(kr || {});
const ve = class K {
  constructor(e, r, u, o) {
    if (H(this, "firstChapter"), H(this, "lastChapter"), H(this, "lastVerse"), H(this, "hasSegmentsDefined"), H(this, "text"), H(this, "BBBCCCVVVS"), H(this, "longHashCode"), H(this, "versification"), H(this, "rtlMark", "‏"), H(this, "_bookNum", 0), H(this, "_chapterNum", 0), H(this, "_verseNum", 0), H(this, "_verse"), u == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, p = r != null && r instanceof nt ? r : void 0;
        this.setEmpty(p), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = r != null && r instanceof nt ? r : void 0;
        this.setEmpty(a), this._verseNum = e % K.chapterDigitShifter, this._chapterNum = Math.floor(
          e % K.bookDigitShifter / K.chapterDigitShifter
        ), this._bookNum = Math.floor(e / K.bookDigitShifter);
      } else if (r == null)
        if (e != null && e instanceof K) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null) return;
          const a = e instanceof nt ? e : K.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && r != null && u != null)
      if (typeof e == "string" && typeof r == "string" && typeof u == "string")
        this.setEmpty(o), this.updateInternal(e, r, u);
      else if (typeof e == "number" && typeof r == "number" && typeof u == "number")
        this._bookNum = e, this._chapterNum = r, this._verseNum = u, this.versification = o ?? K.defaultVersification;
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
    let r;
    try {
      return r = new K(e), { success: !0, verseRef: r };
    } catch (u) {
      if (u instanceof yt)
        return r = new K(), { success: !1, verseRef: r };
      throw u;
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
  static getBBBCCCVVV(e, r, u) {
    return e % K.bcvMaxValue * K.bookDigitShifter + (r >= 0 ? r % K.bcvMaxValue * K.chapterDigitShifter : 0) + (u >= 0 ? u % K.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: r, chapterNum: u, verseNum: o, verse: a, versificationStr: p } = e, h = a || o.toString();
    let f;
    return p && (f = new nt(p)), r ? new K(r, u.toString(), h, f) : new K();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let r;
    if (!e)
      return r = -1, { success: !0, vNum: r };
    r = 0;
    let u;
    for (let o = 0; o < e.length; o++) {
      if (u = e[o], u < "0" || u > "9")
        return o === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +u - 0, r > K.bcvMaxValue)
        return r = -1, { success: !1, vNum: r };
    }
    return { success: !0, vNum: r };
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
    return this._verse != null && (this._verse.includes(K.verseRangeSeparator) || this._verse.includes(K.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return le.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = le.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const r = +e;
    this._chapterNum = Number.isInteger(r) ? r : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: r, vNum: u } = K.tryGetVerseNum(e);
    this._verse = r ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = u, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = K.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > le.lastBook)
      throw new yt(
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
    this.versification = this.versification != null ? new nt(e) : void 0;
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
    return this.validateVerse(K.verseRangeSeparators, K.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return K.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return K.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const p = +a[1].trim();
          this.versification = new nt(Le[p]);
        } catch {
          throw new yt("Invalid reference : " + e);
        }
    }
    const r = e.trim().split(" ");
    if (r.length !== 2)
      throw new yt("Invalid reference : " + e);
    const u = r[1].split(":"), o = +u[0];
    if (u.length !== 2 || le.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !K.isVerseParseable(u[1]))
      throw new yt("Invalid reference : " + e);
    this.updateInternal(r[0], u[0], u[1]);
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
    return new K(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    (e === "" || e === this.verseNum.toString()) && (e = void 0);
    const r = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
    return e || delete r.verse, r;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof K ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, r = K.verseRangeSeparators, u = K.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = rr(this._verse, u);
    for (const p of a.map((h) => rr(h, r))) {
      const h = this.clone();
      h.verse = p[0];
      const f = h.verseNum;
      if (o.push(h), p.length > 1) {
        const d = this.clone();
        if (d.verse = p[1], !e)
          for (let m = f + 1; m < d.verseNum; m++) {
            const l = new K(
              this._bookNum,
              this._chapterNum,
              m,
              this.versification
            );
            this.isExcluded || o.push(l);
          }
        o.push(d);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, r) {
    if (!this.verse)
      return this.internalValid;
    let u = 0;
    for (const o of this.allVerses(!0, e, r)) {
      const a = o.internalValid;
      if (a !== 0)
        return a;
      const p = o.BBBCCCVVV;
      if (u > p)
        return 3;
      if (u === p)
        return 4;
      u = p;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > le.lastBook ? 2 : (le.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = K.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, r, u) {
    this.bookNum = le.bookIdToNumber(e), this.chapter = r, this.verse = u;
  }
};
H(ve, "defaultVersification", nt.English), H(ve, "verseRangeSeparator", "-"), H(ve, "verseSequenceIndicator", ","), H(ve, "verseRangeSeparators", [ve.verseRangeSeparator]), H(ve, "verseSequenceIndicators", [ve.verseSequenceIndicator]), H(ve, "chapterDigitShifter", 1e3), H(ve, "bookDigitShifter", ve.chapterDigitShifter * ve.chapterDigitShifter), H(ve, "bcvMaxValue", ve.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
H(ve, "ValidStatusType", kr);
let Fr = ve;
class yt extends Error {
}
var J = {}, ce = {}, nr;
function Dt() {
  if (nr) return ce;
  nr = 1;
  function t(B, F, U) {
    if (U === void 0 && (U = Array.prototype), B && typeof U.find == "function")
      return U.find.call(B, F);
    for (var ne = 0; ne < B.length; ne++)
      if (r(B, ne)) {
        var he = B[ne];
        if (F.call(void 0, he, ne, B))
          return he;
      }
  }
  function e(B, F) {
    return F === void 0 && (F = Object), F && typeof F.getOwnPropertyDescriptors == "function" && (B = F.create(null, F.getOwnPropertyDescriptors(B))), F && typeof F.freeze == "function" ? F.freeze(B) : B;
  }
  function r(B, F) {
    return Object.prototype.hasOwnProperty.call(B, F);
  }
  function u(B, F) {
    if (B === null || typeof B != "object")
      throw new TypeError("target is not an object");
    for (var U in F)
      r(F, U) && (B[U] = F[U]);
    return B;
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
  function a(B) {
    return r(o, B.toLowerCase());
  }
  var p = e({
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
  function h(B) {
    return r(p, B.toLowerCase());
  }
  var f = e({
    script: !1,
    style: !1,
    textarea: !0,
    title: !0
  });
  function d(B) {
    var F = B.toLowerCase();
    return r(f, F) && !f[F];
  }
  function m(B) {
    var F = B.toLowerCase();
    return r(f, F) && f[F];
  }
  function l(B) {
    return B === C.HTML;
  }
  function v(B) {
    return l(B) || B === C.XML_XHTML_APPLICATION;
  }
  var C = e({
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
  }), b = Object.keys(C).map(function(B) {
    return C[B];
  });
  function y(B) {
    return b.indexOf(B) > -1;
  }
  var q = e({
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
  return ce.assign = u, ce.find = t, ce.freeze = e, ce.HTML_BOOLEAN_ATTRIBUTES = o, ce.HTML_RAW_TEXT_ELEMENTS = f, ce.HTML_VOID_ELEMENTS = p, ce.hasDefaultHTMLNamespace = v, ce.hasOwn = r, ce.isHTMLBooleanAttribute = a, ce.isHTMLRawTextElement = d, ce.isHTMLEscapableRawTextElement = m, ce.isHTMLMimeType = l, ce.isHTMLVoidElement = h, ce.isValidMimeType = y, ce.MIME_TYPE = C, ce.NAMESPACE = q, ce;
}
var dt = {}, ur;
function Pt() {
  if (ur) return dt;
  ur = 1;
  var t = Dt();
  function e(v, C) {
    v.prototype = Object.create(Error.prototype, {
      constructor: { value: v },
      name: { value: v.name, enumerable: !0, writable: C }
    });
  }
  var r = t.freeze({
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
  }), u = Object.keys(r);
  function o(v) {
    return typeof v == "number" && v >= 1 && v <= 25;
  }
  function a(v) {
    return typeof v == "string" && v.substring(v.length - r.Error.length) === r.Error;
  }
  function p(v, C) {
    o(v) ? (this.name = u[v], this.message = C || "") : (this.message = v, this.name = a(C) ? C : r.Error), Error.captureStackTrace && Error.captureStackTrace(this, p);
  }
  e(p, !0), Object.defineProperties(p.prototype, {
    code: {
      enumerable: !0,
      get: function() {
        var v = u.indexOf(this.name);
        return o(v) ? v : 0;
      }
    }
  });
  for (var h = {
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
  }, f = Object.entries(h), d = 0; d < f.length; d++) {
    var m = f[d][0];
    p[m] = f[d][1];
  }
  function l(v, C) {
    this.message = v, this.locator = C, Error.captureStackTrace && Error.captureStackTrace(this, l);
  }
  return e(l), dt.DOMException = p, dt.DOMExceptionName = r, dt.ExceptionCode = h, dt.ParseError = l, dt;
}
var re = {}, j = {}, ir;
function qr() {
  if (ir) return j;
  ir = 1;
  function t(ue) {
    try {
      typeof ue != "function" && (ue = RegExp);
      var me = new ue("𝌆", "u").exec("𝌆");
      return !!me && me[0].length === 2;
    } catch {
    }
    return !1;
  }
  var e = t();
  function r(ue) {
    if (ue.source[0] !== "[")
      throw new Error(ue + " can not be used with chars");
    return ue.source.slice(1, ue.source.lastIndexOf("]"));
  }
  function u(ue, me) {
    if (ue.source[0] !== "[")
      throw new Error("/" + ue.source + "/ can not be used with chars_without");
    if (!me || typeof me != "string")
      throw new Error(JSON.stringify(me) + " is not a valid search");
    if (ue.source.indexOf(me) === -1)
      throw new Error('"' + me + '" is not is /' + ue.source + "/");
    if (me === "-" && ue.source.indexOf(me) !== 1)
      throw new Error('"' + me + '" is not at the first postion of /' + ue.source + "/");
    return new RegExp(ue.source.replace(me, ""), e ? "u" : "");
  }
  function o(ue) {
    var me = this;
    return new RegExp(
      Array.prototype.slice.call(arguments).map(function(Fe) {
        var qe = typeof Fe == "string";
        if (qe && me === void 0 && Fe === "|")
          throw new Error("use regg instead of reg to wrap expressions with `|`!");
        return qe ? Fe : Fe.source;
      }).join(""),
      e ? "mu" : "m"
    );
  }
  function a(ue) {
    if (arguments.length === 0)
      throw new Error("no parameters provided");
    return o.apply(a, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var p = "�", h = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  e && (h = o("[", r(h), "\\u{10000}-\\u{10FFFF}", "]"));
  var f = /[\x20\x09\x0D\x0A]/, d = r(f), m = o(f, "+"), l = o(f, "*"), v = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  e && (v = o("[", r(v), "\\u{10000}-\\u{10FFFF}", "]"));
  var C = r(v), b = o("[", C, r(/[-.0-9\xB7]/), r(/[\u0300-\u036F\u203F-\u2040]/), "]"), y = o(v, b, "*"), q = o(b, "+"), B = o("&", y, ";"), F = a(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), U = a(B, "|", F), ne = o("%", y, ";"), he = a(
    o('"', a(/[^%&"]/, "|", ne, "|", U), "*", '"'),
    "|",
    o("'", a(/[^%&']/, "|", ne, "|", U), "*", "'")
  ), E = a('"', a(/[^<&"]/, "|", U), "*", '"', "|", "'", a(/[^<&']/, "|", U), "*", "'"), x = u(v, ":"), k = u(b, ":"), G = o(x, k, "*"), W = o(G, a(":", G), "?"), ee = o("^", W, "$"), Ie = o("(", W, ")"), te = a(/"[^"]*"|'[^']*'/), Be = o(/^<\?/, "(", y, ")", a(m, "(", h, "*?)"), "?", /\?>/), g = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, N = a('"', g, '*"', "|", "'", u(g, "'"), "*'"), S = "<!--", T = "-->", M = o(S, a(u(h, "-"), "|", o("-", u(h, "-"))), "*", T), A = "#PCDATA", R = a(
    o(/\(/, l, A, a(l, /\|/, l, W), "*", l, /\)\*/),
    "|",
    o(/\(/, l, A, l, /\)/)
  ), X = /[?*+]?/, _ = o(
    /\([^>]+\)/,
    X
    /*regg(choice, '|', seq), _children_quantity*/
  ), w = a("EMPTY", "|", "ANY", "|", R, "|", _), I = "<!ELEMENT", L = o(I, m, a(W, "|", ne), m, a(w, "|", ne), l, ">"), V = o("NOTATION", m, /\(/, l, y, a(l, /\|/, l, y), "*", l, /\)/), pe = o(/\(/, l, q, a(l, /\|/, l, q), "*", l, /\)/), we = a(V, "|", pe), Ae = a(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", we), oe = a(/#REQUIRED|#IMPLIED/, "|", a(a("#FIXED", m), "?", E)), P = a(m, y, m, Ae, m, oe), Ue = "<!ATTLIST", Re = o(Ue, m, y, P, "*", l, ">"), de = "about:legacy-compat", Ve = a('"' + de + '"', "|", "'" + de + "'"), _e = "SYSTEM", Se = "PUBLIC", ke = a(a(_e, m, te), "|", a(Se, m, N, m, te)), He = o(
    "^",
    a(
      a(_e, m, "(?<SystemLiteralOnly>", te, ")"),
      "|",
      a(Se, m, "(?<PubidLiteral>", N, ")", m, "(?<SystemLiteral>", te, ")")
    )
  ), Je = a(m, "NDATA", m, y), ye = a(he, "|", a(ke, Je, "?")), Q = "<!ENTITY", ze = o(Q, m, y, m, ye, l, ">"), ae = a(he, "|", ke), Xe = o(Q, m, "%", m, y, m, ae, l, ">"), vt = a(ze, "|", Xe), Ye = o(Se, m, N), Ke = o("<!NOTATION", m, y, m, a(ke, "|", Ye), l, ">"), $ = o(l, "=", l), Z = /1[.]\d+/, be = o(m, "version", $, a("'", Z, "'", "|", '"', Z, '"')), Ne = /[A-Za-z][-A-Za-z0-9._]*/, We = a(m, "encoding", $, a('"', Ne, '"', "|", "'", Ne, "'")), st = a(m, "standalone", $, a("'", a("yes", "|", "no"), "'", "|", '"', a("yes", "|", "no"), '"')), ct = o(/^<\?xml/, be, We, "?", st, "?", l, /\?>/), lt = "<!DOCTYPE", At = "<![CDATA[", bt = "]]>", ft = /<!\[CDATA\[/, Qe = /\]\]>/, ht = o(h, "*?", Qe), It = o(ft, ht);
  return j.chars = r, j.chars_without = u, j.detectUnicodeSupport = t, j.reg = o, j.regg = a, j.ABOUT_LEGACY_COMPAT = de, j.ABOUT_LEGACY_COMPAT_SystemLiteral = Ve, j.AttlistDecl = Re, j.CDATA_START = At, j.CDATA_END = bt, j.CDSect = It, j.Char = h, j.Comment = M, j.COMMENT_START = S, j.COMMENT_END = T, j.DOCTYPE_DECL_START = lt, j.elementdecl = L, j.EntityDecl = vt, j.EntityValue = he, j.ExternalID = ke, j.ExternalID_match = He, j.Name = y, j.NotationDecl = Ke, j.Reference = U, j.PEReference = ne, j.PI = Be, j.PUBLIC = Se, j.PubidLiteral = N, j.QName = W, j.QName_exact = ee, j.QName_group = Ie, j.S = m, j.SChar_s = d, j.S_OPT = l, j.SYSTEM = _e, j.SystemLiteral = te, j.UNICODE_REPLACEMENT_CHARACTER = p, j.UNICODE_SUPPORT = e, j.XMLDecl = ct, j;
}
var or;
function $r() {
  if (or) return re;
  or = 1;
  var t = Dt(), e = t.find, r = t.hasDefaultHTMLNamespace, u = t.hasOwn, o = t.isHTMLMimeType, a = t.isHTMLRawTextElement, p = t.isHTMLVoidElement, h = t.MIME_TYPE, f = t.NAMESPACE, d = Symbol(), m = Pt(), l = m.DOMException, v = m.DOMExceptionName, C = qr();
  function b(n) {
    if (n !== d)
      throw new TypeError("Illegal constructor");
  }
  function y(n) {
    return n !== "";
  }
  function q(n) {
    return n ? n.split(/[\t\n\f\r ]+/).filter(y) : [];
  }
  function B(n, i) {
    return u(n, i) || (n[i] = !0), n;
  }
  function F(n) {
    if (!n) return [];
    var i = q(n);
    return Object.keys(i.reduce(B, {}));
  }
  function U(n) {
    return function(i) {
      return n && n.indexOf(i) !== -1;
    };
  }
  function ne(n) {
    if (!C.QName_exact.test(n))
      throw new l(l.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + n + '"');
  }
  function he(n, i) {
    ne(i), n = n || null;
    var s = null, c = i;
    if (i.indexOf(":") >= 0) {
      var D = i.split(":");
      s = D[0], c = D[1];
    }
    if (s !== null && n === null)
      throw new l(l.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    if (s === "xml" && n !== t.NAMESPACE.XML)
      throw new l(l.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    if ((s === "xmlns" || i === "xmlns") && n !== t.NAMESPACE.XMLNS)
      throw new l(
        l.NAMESPACE_ERR,
        'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
      );
    if (n === t.NAMESPACE.XMLNS && s !== "xmlns" && i !== "xmlns")
      throw new l(
        l.NAMESPACE_ERR,
        'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
      );
    return [n, s, c];
  }
  function E(n, i) {
    for (var s in n)
      u(n, s) && (i[s] = n[s]);
  }
  function x(n, i) {
    var s = n.prototype;
    if (!(s instanceof i)) {
      let c = function() {
      };
      c.prototype = i.prototype, c = new c(), E(s, c), n.prototype = s = c;
    }
    s.constructor != n && (typeof n != "function" && console.error("unknown Class:" + n), s.constructor = n);
  }
  var k = {}, G = k.ELEMENT_NODE = 1, W = k.ATTRIBUTE_NODE = 2, ee = k.TEXT_NODE = 3, Ie = k.CDATA_SECTION_NODE = 4, te = k.ENTITY_REFERENCE_NODE = 5, Be = k.ENTITY_NODE = 6, g = k.PROCESSING_INSTRUCTION_NODE = 7, N = k.COMMENT_NODE = 8, S = k.DOCUMENT_NODE = 9, T = k.DOCUMENT_TYPE_NODE = 10, M = k.DOCUMENT_FRAGMENT_NODE = 11, A = k.NOTATION_NODE = 12, R = t.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function X(n, i) {
    if (i.length < n.length) return X(i, n);
    var s = null;
    for (var c in n) {
      if (n[c] !== i[c]) return s;
      s = n[c];
    }
    return s;
  }
  function _(n) {
    return n.guid || (n.guid = Math.random()), n.guid;
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
    item: function(n) {
      return n >= 0 && n < this.length ? this[n] : null;
    },
    /**
     * Returns a string representation of the NodeList.
     *
     * @param {unknown} nodeFilter
     * __A filter function? Not implemented according to the spec?__.
     * @returns {string}
     * A string representation of the NodeList.
     */
    toString: function(n) {
      for (var i = [], s = 0; s < this.length; s++)
        qe(this[s], i, n);
      return i.join("");
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
    filter: function(n) {
      return Array.prototype.filter.call(this, n);
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
    indexOf: function(n) {
      return Array.prototype.indexOf.call(this, n);
    }
  }, w.prototype[Symbol.iterator] = function() {
    var n = this, i = 0;
    return {
      next: function() {
        return i < n.length ? {
          value: n[i++],
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
  function I(n, i) {
    this._node = n, this._refresh = i, L(this);
  }
  function L(n) {
    var i = n._node._inc || n._node.ownerDocument._inc;
    if (n._inc !== i) {
      var s = n._refresh(n._node);
      if (Yt(n, "length", s.length), !n.$$length || s.length < n.$$length)
        for (var c = s.length; c in n; c++)
          u(n, c) && delete n[c];
      E(s, n), n._inc = i;
    }
  }
  I.prototype.item = function(n) {
    return L(this), this[n] || null;
  }, x(I, w);
  function V() {
  }
  function pe(n, i) {
    for (var s = 0; s < n.length; ) {
      if (n[s] === i)
        return s;
      s++;
    }
  }
  function we(n, i, s, c) {
    if (c ? i[pe(i, c)] = s : (i[i.length] = s, i.length++), n) {
      s.ownerElement = n;
      var D = n.ownerDocument;
      D && (c && _e(D, n, c), Ve(D, n, s));
    }
  }
  function Ae(n, i, s) {
    var c = pe(i, s);
    if (c >= 0) {
      for (var D = i.length - 1; c <= D; )
        i[c] = i[++c];
      if (i.length = D, n) {
        var O = n.ownerDocument;
        O && _e(O, n, s), s.ownerElement = null;
      }
    }
  }
  V.prototype = {
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
    getNamedItem: function(n) {
      this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (n = n.toLowerCase());
      for (var i = 0; i < this.length; ) {
        var s = this[i];
        if (s.nodeName === n)
          return s;
        i++;
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
    setNamedItem: function(n) {
      var i = n.ownerElement;
      if (i && i !== this._ownerElement)
        throw new l(l.INUSE_ATTRIBUTE_ERR);
      var s = this.getNamedItemNS(n.namespaceURI, n.localName);
      return s === n ? n : (we(this._ownerElement, this, n, s), s);
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
    setNamedItemNS: function(n) {
      return this.setNamedItem(n);
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
    removeNamedItem: function(n) {
      var i = this.getNamedItem(n);
      if (!i)
        throw new l(l.NOT_FOUND_ERR, n);
      return Ae(this._ownerElement, this, i), i;
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
    removeNamedItemNS: function(n, i) {
      var s = this.getNamedItemNS(n, i);
      if (!s)
        throw new l(l.NOT_FOUND_ERR, n ? n + " : " + i : i);
      return Ae(this._ownerElement, this, s), s;
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
    getNamedItemNS: function(n, i) {
      n || (n = null);
      for (var s = 0; s < this.length; ) {
        var c = this[s];
        if (c.localName === i && c.namespaceURI === n)
          return c;
        s++;
      }
      return null;
    }
  }, V.prototype[Symbol.iterator] = function() {
    var n = this, i = 0;
    return {
      next: function() {
        return i < n.length ? {
          value: n[i++],
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
  function oe() {
  }
  oe.prototype = {
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
    hasFeature: function(n, i) {
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
    createDocument: function(n, i, s) {
      var c = h.XML_APPLICATION;
      n === f.HTML ? c = h.XML_XHTML_APPLICATION : n === f.SVG && (c = h.XML_SVG_IMAGE);
      var D = new de(d, { contentType: c });
      if (D.implementation = this, D.childNodes = new w(), D.doctype = s || null, s && D.appendChild(s), i) {
        var O = D.createElementNS(n, i);
        D.appendChild(O);
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
    createDocumentType: function(n, i, s, c) {
      ne(n);
      var D = new lt(d);
      return D.name = n, D.nodeName = n, D.publicId = i || "", D.systemId = s || "", D.internalSubset = c || "", D.childNodes = new w(), D;
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
    createHTMLDocument: function(n) {
      var i = new de(d, { contentType: h.HTML });
      if (i.implementation = this, i.childNodes = new w(), n !== !1) {
        i.doctype = this.createDocumentType("html"), i.doctype.ownerDocument = i, i.appendChild(i.doctype);
        var s = i.createElement("html");
        i.appendChild(s);
        var c = i.createElement("head");
        if (s.appendChild(c), typeof n == "string") {
          var D = i.createElement("title");
          D.appendChild(i.createTextNode(n)), c.appendChild(D);
        }
        s.appendChild(i.createElement("body"));
      }
      return i;
    }
  };
  function P(n) {
    b(n);
  }
  P.prototype = {
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
      var n = this.getRootNode();
      return n && n.nodeType === n.DOCUMENT_NODE;
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
    contains: function(n) {
      if (!n) return !1;
      var i = n;
      do {
        if (this === i) return !0;
        i = n.parentNode;
      } while (i);
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
    getRootNode: function(n) {
      var i = this;
      do {
        if (!i.parentNode)
          return i;
        i = i.parentNode;
      } while (i);
    },
    /**
     * Checks whether the given node is equal to this node.
     *
     * @param {Node} [otherNode]
     * @see https://dom.spec.whatwg.org/#concept-node-equals
     */
    isEqualNode: function(n) {
      if (!n || this.nodeType !== n.nodeType) return !1;
      switch (this.nodeType) {
        case this.DOCUMENT_TYPE_NODE:
          if (this.name !== n.name || this.publicId !== n.publicId || this.systemId !== n.systemId) return !1;
          break;
        case this.ELEMENT_NODE:
          if (this.namespaceURI !== n.namespaceURI || this.prefix !== n.prefix || this.localName !== n.localName || this.attributes.length !== n.attributes.length) return !1;
          for (var i = 0; i < this.attributes.length; i++) {
            var s = this.attributes.item(i);
            if (!s.isEqualNode(n.getAttributeNodeNS(s.namespaceURI, s.localName)))
              return !1;
          }
          break;
        case this.ATTRIBUTE_NODE:
          if (this.namespaceURI !== n.namespaceURI || this.localName !== n.localName || this.value !== n.value) return !1;
          break;
        case this.PROCESSING_INSTRUCTION_NODE:
          if (this.target !== n.target || this.data !== n.data)
            return !1;
          break;
        case this.TEXT_NODE:
        case this.COMMENT_NODE:
          if (this.data !== n.data) return !1;
          break;
      }
      if (this.childNodes.length !== n.childNodes.length)
        return !1;
      for (var i = 0; i < this.childNodes.length; i++)
        if (!this.childNodes[i].isEqualNode(n.childNodes[i]))
          return !1;
      return !0;
    },
    /**
     * Checks whether or not the given node is this node.
     *
     * @param {Node} [otherNode]
     */
    isSameNode: function(n) {
      return this === n;
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
    insertBefore: function(n, i) {
      return $(this, n, i);
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
    replaceChild: function(n, i) {
      $(this, n, i, Ke), i && this.removeChild(i);
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
    removeChild: function(n) {
      return ke(this, n);
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
    appendChild: function(n) {
      return this.insertBefore(n, null);
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
    cloneNode: function(n) {
      return Ft(this.ownerDocument || this, this, n);
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
      for (var n = this.firstChild; n; ) {
        var i = n.nextSibling;
        i && i.nodeType == ee && n.nodeType == ee ? (this.removeChild(i), n.appendData(i.data)) : (n.normalize(), n = i);
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
    isSupported: function(n, i) {
      return this.ownerDocument.implementation.hasFeature(n, i);
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
    lookupPrefix: function(n) {
      for (var i = this; i; ) {
        var s = i._nsMap;
        if (s) {
          for (var c in s)
            if (u(s, c) && s[c] === n)
              return c;
        }
        i = i.nodeType == W ? i.ownerDocument : i.parentNode;
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
    lookupNamespaceURI: function(n) {
      for (var i = this; i; ) {
        var s = i._nsMap;
        if (s && u(s, n))
          return s[n];
        i = i.nodeType == W ? i.ownerDocument : i.parentNode;
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
    isDefaultNamespace: function(n) {
      var i = this.lookupPrefix(n);
      return i == null;
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
    compareDocumentPosition: function(n) {
      if (this === n) return 0;
      var i = n, s = this, c = null, D = null;
      if (i instanceof be && (c = i, i = c.ownerElement), s instanceof be && (D = s, s = D.ownerElement, c && i && s === i))
        for (var O = 0, Y; Y = s.attributes[O]; O++) {
          if (Y === c)
            return R.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + R.DOCUMENT_POSITION_PRECEDING;
          if (Y === D)
            return R.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + R.DOCUMENT_POSITION_FOLLOWING;
        }
      if (!i || !s || s.ownerDocument !== i.ownerDocument)
        return R.DOCUMENT_POSITION_DISCONNECTED + R.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (_(s.ownerDocument) > _(i.ownerDocument) ? R.DOCUMENT_POSITION_FOLLOWING : R.DOCUMENT_POSITION_PRECEDING);
      if (D && i === s)
        return R.DOCUMENT_POSITION_CONTAINS + R.DOCUMENT_POSITION_PRECEDING;
      if (c && i === s)
        return R.DOCUMENT_POSITION_CONTAINED_BY + R.DOCUMENT_POSITION_FOLLOWING;
      for (var se = [], ge = i.parentNode; ge; ) {
        if (!D && ge === s)
          return R.DOCUMENT_POSITION_CONTAINED_BY + R.DOCUMENT_POSITION_FOLLOWING;
        se.push(ge), ge = ge.parentNode;
      }
      se.reverse();
      for (var Ce = [], De = s.parentNode; De; ) {
        if (!c && De === i)
          return R.DOCUMENT_POSITION_CONTAINS + R.DOCUMENT_POSITION_PRECEDING;
        Ce.push(De), De = De.parentNode;
      }
      Ce.reverse();
      var Ze = X(se, Ce);
      for (var $e in Ze.childNodes) {
        var Oe = Ze.childNodes[$e];
        if (Oe === s) return R.DOCUMENT_POSITION_FOLLOWING;
        if (Oe === i) return R.DOCUMENT_POSITION_PRECEDING;
        if (Ce.indexOf(Oe) >= 0) return R.DOCUMENT_POSITION_FOLLOWING;
        if (se.indexOf(Oe) >= 0) return R.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function Ue(n) {
    return n == "<" && "&lt;" || n == ">" && "&gt;" || n == "&" && "&amp;" || n == '"' && "&quot;" || "&#" + n.charCodeAt() + ";";
  }
  E(k, P), E(k, P.prototype), E(R, P), E(R, P.prototype);
  function Re(n, i) {
    if (i(n))
      return !0;
    if (n = n.firstChild)
      do
        if (Re(n, i))
          return !0;
      while (n = n.nextSibling);
  }
  function de(n, i) {
    b(n);
    var s = i || {};
    this.ownerDocument = this, this.contentType = s.contentType || h.XML_APPLICATION, this.type = o(this.contentType) ? "html" : "xml";
  }
  function Ve(n, i, s) {
    n && n._inc++;
    var c = s.namespaceURI;
    c === f.XMLNS && (i._nsMap[s.prefix ? s.localName : ""] = s.value);
  }
  function _e(n, i, s, c) {
    n && n._inc++;
    var D = s.namespaceURI;
    D === f.XMLNS && delete i._nsMap[s.prefix ? s.localName : ""];
  }
  function Se(n, i, s) {
    if (n && n._inc) {
      n._inc++;
      var c = i.childNodes;
      if (s && !s.nextSibling)
        c[c.length++] = s;
      else {
        for (var D = i.firstChild, O = 0; D; )
          c[O++] = D, D = D.nextSibling;
        c.length = O, delete c[c.length];
      }
    }
  }
  function ke(n, i) {
    if (n !== i.parentNode)
      throw new l(l.NOT_FOUND_ERR, "child's parent is not parent");
    var s = i.previousSibling, c = i.nextSibling;
    return s ? s.nextSibling = c : n.firstChild = c, c ? c.previousSibling = s : n.lastChild = s, Se(n.ownerDocument, n), i.parentNode = null, i.previousSibling = null, i.nextSibling = null, i;
  }
  function He(n) {
    return n && (n.nodeType === P.DOCUMENT_NODE || n.nodeType === P.DOCUMENT_FRAGMENT_NODE || n.nodeType === P.ELEMENT_NODE);
  }
  function Je(n) {
    return n && (n.nodeType === P.CDATA_SECTION_NODE || n.nodeType === P.COMMENT_NODE || n.nodeType === P.DOCUMENT_FRAGMENT_NODE || n.nodeType === P.DOCUMENT_TYPE_NODE || n.nodeType === P.ELEMENT_NODE || n.nodeType === P.PROCESSING_INSTRUCTION_NODE || n.nodeType === P.TEXT_NODE);
  }
  function ye(n) {
    return n && n.nodeType === P.DOCUMENT_TYPE_NODE;
  }
  function Q(n) {
    return n && n.nodeType === P.ELEMENT_NODE;
  }
  function ze(n) {
    return n && n.nodeType === P.TEXT_NODE;
  }
  function ae(n, i) {
    var s = n.childNodes || [];
    if (e(s, Q) || ye(i))
      return !1;
    var c = e(s, ye);
    return !(i && c && s.indexOf(c) > s.indexOf(i));
  }
  function Xe(n, i) {
    var s = n.childNodes || [];
    function c(O) {
      return Q(O) && O !== i;
    }
    if (e(s, c))
      return !1;
    var D = e(s, ye);
    return !(i && D && s.indexOf(D) > s.indexOf(i));
  }
  function vt(n, i, s) {
    if (!He(n))
      throw new l(l.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + n.nodeType);
    if (s && s.parentNode !== n)
      throw new l(l.NOT_FOUND_ERR, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !Je(i) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      ye(i) && n.nodeType !== P.DOCUMENT_NODE
    )
      throw new l(
        l.HIERARCHY_REQUEST_ERR,
        "Unexpected node type " + i.nodeType + " for parent node type " + n.nodeType
      );
  }
  function Ye(n, i, s) {
    var c = n.childNodes || [], D = i.childNodes || [];
    if (i.nodeType === P.DOCUMENT_FRAGMENT_NODE) {
      var O = D.filter(Q);
      if (O.length > 1 || e(D, ze))
        throw new l(l.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (O.length === 1 && !ae(n, s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (Q(i) && !ae(n, s))
      throw new l(l.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (ye(i)) {
      if (e(c, ye))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var Y = e(c, Q);
      if (s && c.indexOf(Y) < c.indexOf(s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      if (!s && Y)
        throw new l(l.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
  function Ke(n, i, s) {
    var c = n.childNodes || [], D = i.childNodes || [];
    if (i.nodeType === P.DOCUMENT_FRAGMENT_NODE) {
      var O = D.filter(Q);
      if (O.length > 1 || e(D, ze))
        throw new l(l.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (O.length === 1 && !Xe(n, s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (Q(i) && !Xe(n, s))
      throw new l(l.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (ye(i)) {
      if (e(c, function(ge) {
        return ye(ge) && ge !== s;
      }))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var Y = e(c, Q);
      if (s && c.indexOf(Y) < c.indexOf(s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
  function $(n, i, s, c) {
    vt(n, i, s), n.nodeType === P.DOCUMENT_NODE && (c || Ye)(n, i, s);
    var D = i.parentNode;
    if (D && D.removeChild(i), i.nodeType === M) {
      var O = i.firstChild;
      if (O == null)
        return i;
      var Y = i.lastChild;
    } else
      O = Y = i;
    var se = s ? s.previousSibling : n.lastChild;
    O.previousSibling = se, Y.nextSibling = s, se ? se.nextSibling = O : n.firstChild = O, s == null ? n.lastChild = Y : s.previousSibling = Y;
    do
      O.parentNode = n;
    while (O !== Y && (O = O.nextSibling));
    return Se(n.ownerDocument || n, n, i), i.nodeType == M && (i.firstChild = i.lastChild = null), i;
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
    nodeType: S,
    /**
     * The DocumentType node of the document.
     *
     * @type DocumentType
     * @readonly
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(n, i) {
      if (n.nodeType === M) {
        for (var s = n.firstChild; s; ) {
          var c = s.nextSibling;
          this.insertBefore(s, i), s = c;
        }
        return n;
      }
      return $(this, n, i), n.ownerDocument = this, this.documentElement === null && n.nodeType === G && (this.documentElement = n), n;
    },
    removeChild: function(n) {
      var i = ke(this, n);
      return i === this.documentElement && (this.documentElement = null), i;
    },
    replaceChild: function(n, i) {
      $(this, n, i, Ke), n.ownerDocument = this, i && this.removeChild(i), Q(n) && (this.documentElement = n);
    },
    // Introduced in DOM Level 2:
    importNode: function(n, i) {
      return Xt(this, n, i);
    },
    // Introduced in DOM Level 2:
    getElementById: function(n) {
      var i = null;
      return Re(this.documentElement, function(s) {
        if (s.nodeType == G && s.getAttribute("id") == n)
          return i = s, !0;
      }), i;
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
    createElement: function(n) {
      var i = new Z(d);
      i.ownerDocument = this, this.type === "html" && (n = n.toLowerCase()), r(this.contentType) && (i.namespaceURI = f.HTML), i.nodeName = n, i.tagName = n, i.localName = n, i.childNodes = new w();
      var s = i.attributes = new V();
      return s._ownerElement = i, i;
    },
    /**
     * @returns {DocumentFragment}
     */
    createDocumentFragment: function() {
      var n = new Qe(d);
      return n.ownerDocument = this, n.childNodes = new w(), n;
    },
    /**
     * @param {string} data
     * @returns {Text}
     */
    createTextNode: function(n) {
      var i = new We(d);
      return i.ownerDocument = this, i.childNodes = new w(), i.appendData(n), i;
    },
    /**
     * @param {string} data
     * @returns {Comment}
     */
    createComment: function(n) {
      var i = new st(d);
      return i.ownerDocument = this, i.childNodes = new w(), i.appendData(n), i;
    },
    /**
     * @param {string} data
     * @returns {CDATASection}
     */
    createCDATASection: function(n) {
      var i = new ct(d);
      return i.ownerDocument = this, i.childNodes = new w(), i.appendData(n), i;
    },
    /**
     * @param {string} target
     * @param {string} data
     * @returns {ProcessingInstruction}
     */
    createProcessingInstruction: function(n, i) {
      var s = new ht(d);
      return s.ownerDocument = this, s.childNodes = new w(), s.nodeName = s.target = n, s.nodeValue = s.data = i, s;
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
    createAttribute: function(n) {
      if (!C.QName_exact.test(n))
        throw new l(l.INVALID_CHARACTER_ERR, 'invalid character in name "' + n + '"');
      return this.type === "html" && (n = n.toLowerCase()), this._createAttribute(n);
    },
    _createAttribute: function(n) {
      var i = new be(d);
      return i.ownerDocument = this, i.childNodes = new w(), i.name = n, i.nodeName = n, i.localName = n, i.specified = !0, i;
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
    createEntityReference: function(n) {
      if (!C.Name.test(n))
        throw new l(l.INVALID_CHARACTER_ERR, 'not a valid xml name "' + n + '"');
      if (this.type === "html")
        throw new l("document is an html document", v.NotSupportedError);
      var i = new ft(d);
      return i.ownerDocument = this, i.childNodes = new w(), i.nodeName = n, i;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Element}
     */
    createElementNS: function(n, i) {
      var s = he(n, i), c = new Z(d), D = c.attributes = new V();
      return c.childNodes = new w(), c.ownerDocument = this, c.nodeName = i, c.tagName = i, c.namespaceURI = s[0], c.prefix = s[1], c.localName = s[2], D._ownerElement = c, c;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Attr}
     */
    createAttributeNS: function(n, i) {
      var s = he(n, i), c = new be(d);
      return c.ownerDocument = this, c.childNodes = new w(), c.nodeName = i, c.name = i, c.specified = !0, c.namespaceURI = s[0], c.prefix = s[1], c.localName = s[2], c;
    }
  }, x(de, P);
  function Z(n) {
    b(n), this._nsMap = /* @__PURE__ */ Object.create(null);
  }
  Z.prototype = {
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
      return this.ownerDocument.type === "html" && this.namespaceURI === f.HTML;
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
    hasAttribute: function(n) {
      return !!this.getAttributeNode(n);
    },
    /**
     * Returns element’s first attribute whose qualified name is `name`, and `null`
     * if there is no such attribute.
     *
     * @param {string} name
     * @returns {string | null}
     */
    getAttribute: function(n) {
      var i = this.getAttributeNode(n);
      return i ? i.value : null;
    },
    getAttributeNode: function(n) {
      return this._isInHTMLDocumentAndNamespace() && (n = n.toLowerCase()), this.attributes.getNamedItem(n);
    },
    /**
     * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
     *
     * @param {string} name
     * @param {string} value
     */
    setAttribute: function(n, i) {
      this._isInHTMLDocumentAndNamespace() && (n = n.toLowerCase());
      var s = this.getAttributeNode(n);
      s ? s.value = s.nodeValue = "" + i : (s = this.ownerDocument._createAttribute(n), s.value = s.nodeValue = "" + i, this.setAttributeNode(s));
    },
    removeAttribute: function(n) {
      var i = this.getAttributeNode(n);
      i && this.removeAttributeNode(i);
    },
    setAttributeNode: function(n) {
      return this.attributes.setNamedItem(n);
    },
    setAttributeNodeNS: function(n) {
      return this.attributes.setNamedItemNS(n);
    },
    removeAttributeNode: function(n) {
      return this.attributes.removeNamedItem(n.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(n, i) {
      var s = this.getAttributeNodeNS(n, i);
      s && this.removeAttributeNode(s);
    },
    hasAttributeNS: function(n, i) {
      return this.getAttributeNodeNS(n, i) != null;
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
    getAttributeNS: function(n, i) {
      var s = this.getAttributeNodeNS(n, i);
      return s ? s.value : null;
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
    setAttributeNS: function(n, i, s) {
      var c = he(n, i), D = c[2], O = this.getAttributeNodeNS(n, D);
      O ? O.value = O.nodeValue = "" + s : (O = this.ownerDocument.createAttributeNS(n, i), O.value = O.nodeValue = "" + s, this.setAttributeNode(O));
    },
    getAttributeNodeNS: function(n, i) {
      return this.attributes.getNamedItemNS(n, i);
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
    getElementsByClassName: function(n) {
      var i = F(n);
      return new I(this, function(s) {
        var c = [];
        return i.length > 0 && Re(s, function(D) {
          if (D !== s && D.nodeType === G) {
            var O = D.getAttribute("class");
            if (O) {
              var Y = n === O;
              if (!Y) {
                var se = F(O);
                Y = i.every(U(se));
              }
              Y && c.push(D);
            }
          }
        }), c;
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
    getElementsByTagName: function(n) {
      var i = (this.nodeType === S ? this : this.ownerDocument).type === "html", s = n.toLowerCase();
      return new I(this, function(c) {
        var D = [];
        return Re(c, function(O) {
          if (!(O === c || O.nodeType !== G))
            if (n === "*")
              D.push(O);
            else {
              var Y = O.getQualifiedName(), se = i && O.namespaceURI === f.HTML ? s : n;
              Y === se && D.push(O);
            }
        }), D;
      });
    },
    getElementsByTagNameNS: function(n, i) {
      return new I(this, function(s) {
        var c = [];
        return Re(s, function(D) {
          D !== s && D.nodeType === G && (n === "*" || D.namespaceURI === n) && (i === "*" || D.localName == i) && c.push(D);
        }), c;
      });
    }
  }, de.prototype.getElementsByClassName = Z.prototype.getElementsByClassName, de.prototype.getElementsByTagName = Z.prototype.getElementsByTagName, de.prototype.getElementsByTagNameNS = Z.prototype.getElementsByTagNameNS, x(Z, P);
  function be(n) {
    b(n), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
  }
  be.prototype.nodeType = W, x(be, P);
  function Ne(n) {
    b(n);
  }
  Ne.prototype = {
    data: "",
    substringData: function(n, i) {
      return this.data.substring(n, n + i);
    },
    appendData: function(n) {
      n = this.data + n, this.nodeValue = this.data = n, this.length = n.length;
    },
    insertData: function(n, i) {
      this.replaceData(n, 0, i);
    },
    deleteData: function(n, i) {
      this.replaceData(n, i, "");
    },
    replaceData: function(n, i, s) {
      var c = this.data.substring(0, n), D = this.data.substring(n + i);
      s = c + s + D, this.nodeValue = this.data = s, this.length = s.length;
    }
  }, x(Ne, P);
  function We(n) {
    b(n);
  }
  We.prototype = {
    nodeName: "#text",
    nodeType: ee,
    splitText: function(n) {
      var i = this.data, s = i.substring(n);
      i = i.substring(0, n), this.data = this.nodeValue = i, this.length = i.length;
      var c = this.ownerDocument.createTextNode(s);
      return this.parentNode && this.parentNode.insertBefore(c, this.nextSibling), c;
    }
  }, x(We, Ne);
  function st(n) {
    b(n);
  }
  st.prototype = {
    nodeName: "#comment",
    nodeType: N
  }, x(st, Ne);
  function ct(n) {
    b(n);
  }
  ct.prototype = {
    nodeName: "#cdata-section",
    nodeType: Ie
  }, x(ct, We);
  function lt(n) {
    b(n);
  }
  lt.prototype.nodeType = T, x(lt, P);
  function At(n) {
    b(n);
  }
  At.prototype.nodeType = A, x(At, P);
  function bt(n) {
    b(n);
  }
  bt.prototype.nodeType = Be, x(bt, P);
  function ft(n) {
    b(n);
  }
  ft.prototype.nodeType = te, x(ft, P);
  function Qe(n) {
    b(n);
  }
  Qe.prototype.nodeName = "#document-fragment", Qe.prototype.nodeType = M, x(Qe, P);
  function ht(n) {
    b(n);
  }
  ht.prototype.nodeType = g, x(ht, Ne);
  function It() {
  }
  It.prototype.serializeToString = function(n, i) {
    return ue.call(n, i);
  }, P.prototype.toString = ue;
  function ue(n) {
    var i = [], s = this.nodeType === S && this.documentElement || this, c = s.prefix, D = s.namespaceURI;
    if (D && c == null) {
      var c = s.lookupPrefix(D);
      if (c == null)
        var O = [
          { namespace: D, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return qe(this, i, n, O), i.join("");
  }
  function me(n, i, s) {
    var c = n.prefix || "", D = n.namespaceURI;
    if (!D || c === "xml" && D === f.XML || D === f.XMLNS)
      return !1;
    for (var O = s.length; O--; ) {
      var Y = s[O];
      if (Y.prefix === c)
        return Y.namespace !== D;
    }
    return !0;
  }
  function Fe(n, i, s) {
    n.push(" ", i, '="', s.replace(/[<>&"\t\n\r]/g, Ue), '"');
  }
  function qe(n, i, s, c) {
    c || (c = []);
    var D = n.nodeType === S ? n : n.ownerDocument, O = D.type === "html";
    if (s)
      if (n = s(n), n) {
        if (typeof n == "string") {
          i.push(n);
          return;
        }
      } else
        return;
    switch (n.nodeType) {
      case G:
        var Y = n.attributes, se = Y.length, Ee = n.firstChild, ge = n.tagName, Ce = ge;
        if (!O && !n.prefix && n.namespaceURI) {
          for (var De, Ze = 0; Ze < Y.length; Ze++)
            if (Y.item(Ze).name === "xmlns") {
              De = Y.item(Ze).value;
              break;
            }
          if (!De)
            for (var $e = c.length - 1; $e >= 0; $e--) {
              var Oe = c[$e];
              if (Oe.prefix === "" && Oe.namespace === n.namespaceURI) {
                De = Oe.namespace;
                break;
              }
            }
          if (De !== n.namespaceURI)
            for (var $e = c.length - 1; $e >= 0; $e--) {
              var Oe = c[$e];
              if (Oe.namespace === n.namespaceURI) {
                Oe.prefix && (Ce = Oe.prefix + ":" + ge);
                break;
              }
            }
        }
        i.push("<", Ce);
        for (var et = 0; et < se; et++) {
          var Pe = Y.item(et);
          Pe.prefix == "xmlns" ? c.push({
            prefix: Pe.localName,
            namespace: Pe.value
          }) : Pe.nodeName == "xmlns" && c.push({ prefix: "", namespace: Pe.value });
        }
        for (var et = 0; et < se; et++) {
          var Pe = Y.item(et);
          if (me(Pe, O, c)) {
            var tt = Pe.prefix || "", Nt = Pe.namespaceURI;
            Fe(i, tt ? "xmlns:" + tt : "xmlns", Nt), c.push({ prefix: tt, namespace: Nt });
          }
          qe(Pe, i, s, c);
        }
        if (ge === Ce && me(n, O, c)) {
          var tt = n.prefix || "", Nt = n.namespaceURI;
          Fe(i, tt ? "xmlns:" + tt : "xmlns", Nt), c.push({ prefix: tt, namespace: Nt });
        }
        var qt = !Ee;
        if (qt && (O || n.namespaceURI === f.HTML) && (qt = p(ge)), qt)
          i.push("/>");
        else {
          if (i.push(">"), O && a(ge))
            for (; Ee; )
              Ee.data ? i.push(Ee.data) : qe(Ee, i, s, c.slice()), Ee = Ee.nextSibling;
          else
            for (; Ee; )
              qe(Ee, i, s, c.slice()), Ee = Ee.nextSibling;
          i.push("</", Ce, ">");
        }
        return;
      case S:
      case M:
        for (var Ee = n.firstChild; Ee; )
          qe(Ee, i, s, c.slice()), Ee = Ee.nextSibling;
        return;
      case W:
        return Fe(i, n.name, n.value);
      case ee:
        return i.push(n.data.replace(/[<&>]/g, Ue));
      case Ie:
        return i.push(C.CDATA_START, n.data, C.CDATA_END);
      case N:
        return i.push(C.COMMENT_START, n.data, C.COMMENT_END);
      case T:
        var Kt = n.publicId, pt = n.systemId;
        i.push(C.DOCTYPE_DECL_START, " ", n.name), Kt ? (i.push(" ", C.PUBLIC, " ", Kt), pt && pt !== "." && i.push(" ", pt)) : pt && pt !== "." && i.push(" ", C.SYSTEM, " ", pt), n.internalSubset && i.push(" [", n.internalSubset, "]"), i.push(">");
        return;
      case g:
        return i.push("<?", n.target, " ", n.data, "?>");
      case te:
        return i.push("&", n.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        i.push("??", n.nodeName);
    }
  }
  function Xt(n, i, s) {
    var c;
    switch (i.nodeType) {
      case G:
        c = i.cloneNode(!1), c.ownerDocument = n;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case M:
        break;
      case W:
        s = !0;
        break;
    }
    if (c || (c = i.cloneNode(!1)), c.ownerDocument = n, c.parentNode = null, s)
      for (var D = i.firstChild; D; )
        c.appendChild(Xt(n, D, s)), D = D.nextSibling;
    return c;
  }
  function Ft(n, i, s) {
    var c = new i.constructor(d);
    for (var D in i)
      if (u(i, D)) {
        var O = i[D];
        typeof O != "object" && O != c[D] && (c[D] = O);
      }
    switch (i.childNodes && (c.childNodes = new w()), c.ownerDocument = n, c.nodeType) {
      case G:
        var Y = i.attributes, se = c.attributes = new V(), ge = Y.length;
        se._ownerElement = c;
        for (var Ce = 0; Ce < ge; Ce++)
          c.setAttributeNode(Ft(n, Y.item(Ce), !0));
        break;
      case W:
        s = !0;
    }
    if (s)
      for (var De = i.firstChild; De; )
        c.appendChild(Ft(n, De, s)), De = De.nextSibling;
    return c;
  }
  function Yt(n, i, s) {
    n[i] = s;
  }
  try {
    if (Object.defineProperty) {
      let n = function(i) {
        switch (i.nodeType) {
          case G:
          case M:
            var s = [];
            for (i = i.firstChild; i; )
              i.nodeType !== 7 && i.nodeType !== 8 && s.push(n(i)), i = i.nextSibling;
            return s.join("");
          default:
            return i.nodeValue;
        }
      };
      Object.defineProperty(I.prototype, "length", {
        get: function() {
          return L(this), this.$$length;
        }
      }), Object.defineProperty(P.prototype, "textContent", {
        get: function() {
          return n(this);
        },
        set: function(i) {
          switch (this.nodeType) {
            case G:
            case M:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (i || String(i)) && this.appendChild(this.ownerDocument.createTextNode(i));
              break;
            default:
              this.data = i, this.value = i, this.nodeValue = i;
          }
        }
      }), Yt = function(i, s, c) {
        i["$$" + s] = c;
      };
    }
  } catch {
  }
  return re._updateLiveList = L, re.Attr = be, re.CDATASection = ct, re.CharacterData = Ne, re.Comment = st, re.Document = de, re.DocumentFragment = Qe, re.DocumentType = lt, re.DOMImplementation = oe, re.Element = Z, re.Entity = bt, re.EntityReference = ft, re.LiveNodeList = I, re.NamedNodeMap = V, re.Node = P, re.NodeList = w, re.Notation = At, re.Text = We, re.ProcessingInstruction = ht, re.XMLSerializer = It, re;
}
var rt = {}, $t = {}, ar;
function Cn() {
  return ar || (ar = 1, function(t) {
    var e = Dt().freeze;
    t.XML_ENTITIES = e({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    }), t.HTML_ENTITIES = e({
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
    }), t.entityMap = t.HTML_ENTITIES;
  }($t)), $t;
}
var Ct = {}, sr;
function Tn() {
  if (sr) return Ct;
  sr = 1;
  var t = Dt(), e = qr(), r = Pt(), u = t.isHTMLEscapableRawTextElement, o = t.isHTMLMimeType, a = t.isHTMLRawTextElement, p = t.hasOwn, h = t.NAMESPACE, f = r.ParseError, d = r.DOMException, m = 0, l = 1, v = 2, C = 3, b = 4, y = 5, q = 6, B = 7;
  function F() {
  }
  F.prototype = {
    parse: function(g, N, S) {
      var T = this.domBuilder;
      T.startDocument(), G(N, N = /* @__PURE__ */ Object.create(null)), ne(g, N, S, T, this.errorHandler), T.endDocument();
    }
  };
  var U = /&#?\w+;?/g;
  function ne(g, N, S, T, M) {
    var A = o(T.mimeType);
    g.indexOf(e.UNICODE_REPLACEMENT_CHARACTER) >= 0 && M.warning("Unicode replacement character detected, source encoding issues?");
    function R($) {
      if ($ > 65535) {
        $ -= 65536;
        var Z = 55296 + ($ >> 10), be = 56320 + ($ & 1023);
        return String.fromCharCode(Z, be);
      } else
        return String.fromCharCode($);
    }
    function X($) {
      var Z = $[$.length - 1] === ";" ? $ : $ + ";";
      if (!A && Z !== $)
        return M.error("EntityRef: expecting ;"), $;
      var be = e.Reference.exec(Z);
      if (!be || be[0].length !== Z.length)
        return M.error("entity not matching Reference production: " + $), $;
      var Ne = Z.slice(1, -1);
      return p(S, Ne) ? S[Ne] : Ne.charAt(0) === "#" ? R(parseInt(Ne.substring(1).replace("x", "0x"))) : (M.error("entity not found:" + $), $);
    }
    function _($) {
      if ($ > oe) {
        var Z = g.substring(oe, $).replace(U, X);
        V && pe(oe), T.characters(Z, 0, $ - oe), oe = $;
      }
    }
    var w = 0, I = 0, L = /\r\n?|\n|$/g, V = T.locator;
    function pe($, Z) {
      for (; $ >= I && (Z = L.exec(g)); )
        w = I, I = Z.index + Z[0].length, V.lineNumber++;
      V.columnNumber = $ - w + 1;
    }
    for (var we = [{ currentNSMap: N }], Ae = [], oe = 0; ; ) {
      try {
        var P = g.indexOf("<", oe);
        if (P < 0) {
          if (!A && Ae.length > 0)
            return M.fatalError("unclosed xml tag(s): " + Ae.join(", "));
          if (!g.substring(oe).match(/^\s*$/)) {
            var Ue = T.doc, Re = Ue.createTextNode(g.substring(oe));
            if (Ue.documentElement)
              return M.error("Extra content at the end of the document");
            Ue.appendChild(Re), T.currentElement = Re;
          }
          return;
        }
        if (P > oe) {
          var de = g.substring(oe, P);
          !A && Ae.length === 0 && (de = de.replace(new RegExp(e.S_OPT.source, "g"), ""), de && M.error("Unexpected content outside root element: '" + de + "'")), _(P);
        }
        switch (g.charAt(P + 1)) {
          case "/":
            var ae = g.indexOf(">", P + 2), Ve = g.substring(P + 2, ae > 0 ? ae : void 0);
            if (!Ve)
              return M.fatalError("end tag name missing");
            var _e = ae > 0 && e.reg("^", e.QName_group, e.S_OPT, "$").exec(Ve);
            if (!_e)
              return M.fatalError('end tag name contains invalid characters: "' + Ve + '"');
            if (!T.currentElement && !T.doc.documentElement)
              return;
            var Se = Ae[Ae.length - 1] || T.currentElement.tagName || T.doc.documentElement.tagName || "";
            if (Se !== _e[1]) {
              var ke = _e[1].toLowerCase();
              if (!A || Se.toLowerCase() !== ke)
                return M.fatalError('Opening and ending tag mismatch: "' + Se + '" != "' + Ve + '"');
            }
            var He = we.pop();
            Ae.pop();
            var Je = He.localNSMap;
            if (T.endElement(He.uri, He.localName, Se), Je)
              for (var ye in Je)
                p(Je, ye) && T.endPrefixMapping(ye);
            ae++;
            break;
          // end element
          case "?":
            V && pe(P), ae = te(g, P, T, M);
            break;
          case "!":
            V && pe(P), ae = Ie(g, P, T, M, A);
            break;
          default:
            V && pe(P);
            var Q = new Be(), ze = we[we.length - 1].currentNSMap, ae = E(g, P, Q, ze, X, M, A), Xe = Q.length;
            if (Q.closed || (A && t.isHTMLVoidElement(Q.tagName) ? Q.closed = !0 : Ae.push(Q.tagName)), V && Xe) {
              for (var vt = he(V, {}), Ye = 0; Ye < Xe; Ye++) {
                var Ke = Q[Ye];
                pe(Ke.offset), Ke.locator = he(V, {});
              }
              T.locator = vt, x(Q, T, ze) && we.push(Q), T.locator = V;
            } else
              x(Q, T, ze) && we.push(Q);
            A && !Q.closed ? ae = k(g, ae, Q.tagName, X, T) : ae++;
        }
      } catch ($) {
        if ($ instanceof f)
          throw $;
        if ($ instanceof d)
          throw new f($.name + ": " + $.message, T.locator, $);
        M.error("element parse error: " + $), ae = -1;
      }
      ae > oe ? oe = ae : _(Math.max(P, oe) + 1);
    }
  }
  function he(g, N) {
    return N.lineNumber = g.lineNumber, N.columnNumber = g.columnNumber, N;
  }
  function E(g, N, S, T, M, A, R) {
    function X(pe, we, Ae) {
      if (p(S.attributeNames, pe))
        return A.fatalError("Attribute " + pe + " redefined");
      if (!R && we.indexOf("<") >= 0)
        return A.fatalError("Unescaped '<' not allowed in attributes values");
      S.addValue(
        pe,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        we.replace(/[\t\n\r]/g, " ").replace(U, M),
        Ae
      );
    }
    for (var _, w, I = ++N, L = m; ; ) {
      var V = g.charAt(I);
      switch (V) {
        case "=":
          if (L === l)
            _ = g.slice(N, I), L = C;
          else if (L === v)
            L = C;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (L === C || L === l)
            if (L === l && (A.warning('attribute value must after "="'), _ = g.slice(N, I)), N = I + 1, I = g.indexOf(V, N), I > 0)
              w = g.slice(N, I), X(_, w, N - 1), L = y;
            else
              throw new Error("attribute value no end '" + V + "' match");
          else if (L == b)
            w = g.slice(N, I), X(_, w, N), A.warning('attribute "' + _ + '" missed start quot(' + V + ")!!"), N = I + 1, L = y;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (L) {
            case m:
              S.setTagName(g.slice(N, I));
            case y:
            case q:
            case B:
              L = B, S.closed = !0;
            case b:
            case l:
              break;
            case v:
              S.closed = !0;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return A.error("unexpected end of input"), L == m && S.setTagName(g.slice(N, I)), I;
        case ">":
          switch (L) {
            case m:
              S.setTagName(g.slice(N, I));
            case y:
            case q:
            case B:
              break;
            //normal
            case b:
            //Compatible state
            case l:
              w = g.slice(N, I), w.slice(-1) === "/" && (S.closed = !0, w = w.slice(0, -1));
            case v:
              L === v && (w = _), L == b ? (A.warning('attribute "' + w + '" missed quot(")!'), X(_, w, N)) : (R || A.warning('attribute "' + w + '" missed value!! "' + w + '" instead!!'), X(w, w, N));
              break;
            case C:
              if (!R)
                return A.fatalError(`AttValue: ' or " expected`);
          }
          return I;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          V = " ";
        default:
          if (V <= " ")
            switch (L) {
              case m:
                S.setTagName(g.slice(N, I)), L = q;
                break;
              case l:
                _ = g.slice(N, I), L = v;
                break;
              case b:
                var w = g.slice(N, I);
                A.warning('attribute "' + w + '" missed quot(")!!'), X(_, w, N);
              case y:
                L = q;
                break;
            }
          else
            switch (L) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case v:
                R || A.warning('attribute "' + _ + '" missed value!! "' + _ + '" instead2!!'), X(_, _, N), N = I, L = l;
                break;
              case y:
                A.warning('attribute space is required"' + _ + '"!!');
              case q:
                L = l, N = I;
                break;
              case C:
                L = b, N = I;
                break;
              case B:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      I++;
    }
  }
  function x(g, N, S) {
    for (var T = g.tagName, M = null, L = g.length; L--; ) {
      var A = g[L], R = A.qName, X = A.value, V = R.indexOf(":");
      if (V > 0)
        var _ = A.prefix = R.slice(0, V), w = R.slice(V + 1), I = _ === "xmlns" && w;
      else
        w = R, _ = null, I = R === "xmlns" && "";
      A.localName = w, I !== !1 && (M == null && (M = /* @__PURE__ */ Object.create(null), G(S, S = /* @__PURE__ */ Object.create(null))), S[I] = M[I] = X, A.uri = h.XMLNS, N.startPrefixMapping(I, X));
    }
    for (var L = g.length; L--; )
      A = g[L], A.prefix && (A.prefix === "xml" && (A.uri = h.XML), A.prefix !== "xmlns" && (A.uri = S[A.prefix]));
    var V = T.indexOf(":");
    V > 0 ? (_ = g.prefix = T.slice(0, V), w = g.localName = T.slice(V + 1)) : (_ = null, w = g.localName = T);
    var pe = g.uri = S[_ || ""];
    if (N.startElement(pe, w, T, g), g.closed) {
      if (N.endElement(pe, w, T), M)
        for (_ in M)
          p(M, _) && N.endPrefixMapping(_);
    } else
      return g.currentNSMap = S, g.localNSMap = M, !0;
  }
  function k(g, N, S, T, M) {
    var A = u(S);
    if (A || a(S)) {
      var R = g.indexOf("</" + S + ">", N), X = g.substring(N + 1, R);
      return A && (X = X.replace(U, T)), M.characters(X, 0, X.length), R;
    }
    return N + 1;
  }
  function G(g, N) {
    for (var S in g)
      p(g, S) && (N[S] = g[S]);
  }
  function W(g, N) {
    var S = N;
    function T(I) {
      return I = I || 0, g.charAt(S + I);
    }
    function M(I) {
      I = I || 1, S += I;
    }
    function A() {
      for (var I = 0; S < g.length; ) {
        var L = T();
        if (L !== " " && L !== `
` && L !== "	" && L !== "\r")
          return I;
        I++, M();
      }
      return -1;
    }
    function R() {
      return g.substring(S);
    }
    function X(I) {
      return g.substring(S, S + I.length) === I;
    }
    function _(I) {
      return g.substring(S, S + I.length).toUpperCase() === I.toUpperCase();
    }
    function w(I) {
      var L = e.reg("^", I), V = L.exec(R());
      return V ? (M(V[0].length), V[0]) : null;
    }
    return {
      char: T,
      getIndex: function() {
        return S;
      },
      getMatch: w,
      getSource: function() {
        return g;
      },
      skip: M,
      skipBlanks: A,
      substringFromIndex: R,
      substringStartsWith: X,
      substringStartsWithCaseInsensitive: _
    };
  }
  function ee(g, N) {
    function S(X, _) {
      var w = e.PI.exec(X.substringFromIndex());
      return w ? w[1].toLowerCase() === "xml" ? _.fatalError(
        "xml declaration is only allowed at the start of the document, but found at position " + X.getIndex()
      ) : (X.skip(w[0].length), w[0]) : _.fatalError("processing instruction is not well-formed at position " + X.getIndex());
    }
    var T = g.getSource();
    if (g.char() === "[") {
      g.skip(1);
      for (var M = g.getIndex(); g.getIndex() < T.length; ) {
        if (g.skipBlanks(), g.char() === "]") {
          var A = T.substring(M, g.getIndex());
          return g.skip(1), A;
        }
        var R = null;
        if (g.char() === "<" && g.char(1) === "!")
          switch (g.char(2)) {
            case "E":
              g.char(3) === "L" ? R = g.getMatch(e.elementdecl) : g.char(3) === "N" && (R = g.getMatch(e.EntityDecl));
              break;
            case "A":
              R = g.getMatch(e.AttlistDecl);
              break;
            case "N":
              R = g.getMatch(e.NotationDecl);
              break;
            case "-":
              R = g.getMatch(e.Comment);
              break;
          }
        else if (g.char() === "<" && g.char(1) === "?")
          R = S(g, N);
        else if (g.char() === "%")
          R = g.getMatch(e.PEReference);
        else
          return N.fatalError("Error detected in Markup declaration");
        if (!R)
          return N.fatalError("Error in internal subset at position " + g.getIndex());
      }
      return N.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function Ie(g, N, S, T, M) {
    var A = W(g, N);
    switch (M ? A.char(2).toUpperCase() : A.char(2)) {
      case "-":
        var R = A.getMatch(e.Comment);
        return R ? (S.comment(R, e.COMMENT_START.length, R.length - e.COMMENT_START.length - e.COMMENT_END.length), A.getIndex()) : T.fatalError("comment is not well-formed at position " + A.getIndex());
      case "[":
        var X = A.getMatch(e.CDSect);
        return X ? !M && !S.currentElement ? T.fatalError("CDATA outside of element") : (S.startCDATA(), S.characters(X, e.CDATA_START.length, X.length - e.CDATA_START.length - e.CDATA_END.length), S.endCDATA(), A.getIndex()) : T.fatalError("Invalid CDATA starting at position " + N);
      case "D": {
        if (S.doc && S.doc.documentElement)
          return T.fatalError("Doctype not allowed inside or after documentElement at position " + A.getIndex());
        if (M ? !A.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START) : !A.substringStartsWith(e.DOCTYPE_DECL_START))
          return T.fatalError("Expected " + e.DOCTYPE_DECL_START + " at position " + A.getIndex());
        if (A.skip(e.DOCTYPE_DECL_START.length), A.skipBlanks() < 1)
          return T.fatalError("Expected whitespace after " + e.DOCTYPE_DECL_START + " at position " + A.getIndex());
        var _ = {
          name: void 0,
          publicId: void 0,
          systemId: void 0,
          internalSubset: void 0
        };
        if (_.name = A.getMatch(e.Name), !_.name)
          return T.fatalError("doctype name missing or contains unexpected characters at position " + A.getIndex());
        if (M && _.name.toLowerCase() !== "html" && T.warning("Unexpected DOCTYPE in HTML document at position " + A.getIndex()), A.skipBlanks(), A.substringStartsWith(e.PUBLIC) || A.substringStartsWith(e.SYSTEM)) {
          var w = e.ExternalID_match.exec(A.substringFromIndex());
          if (!w)
            return T.fatalError("doctype external id is not well-formed at position " + A.getIndex());
          w.groups.SystemLiteralOnly !== void 0 ? _.systemId = w.groups.SystemLiteralOnly : (_.systemId = w.groups.SystemLiteral, _.publicId = w.groups.PubidLiteral), A.skip(w[0].length);
        } else if (M && A.substringStartsWithCaseInsensitive(e.SYSTEM)) {
          if (A.skip(e.SYSTEM.length), A.skipBlanks() < 1)
            return T.fatalError("Expected whitespace after " + e.SYSTEM + " at position " + A.getIndex());
          if (_.systemId = A.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral), !_.systemId)
            return T.fatalError(
              "Expected " + e.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + e.SYSTEM + " at position " + A.getIndex()
            );
        }
        return M && _.systemId && !e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(_.systemId) && T.warning("Unexpected doctype.systemId in HTML document at position " + A.getIndex()), M || (A.skipBlanks(), _.internalSubset = ee(A, T)), A.skipBlanks(), A.char() !== ">" ? T.fatalError("doctype not terminated with > at position " + A.getIndex()) : (A.skip(1), S.startDTD(_.name, _.publicId, _.systemId, _.internalSubset), S.endDTD(), A.getIndex());
      }
      default:
        return T.fatalError('Not well-formed XML starting with "<!" at position ' + N);
    }
  }
  function te(g, N, S, T) {
    var M = g.substring(N).match(e.PI);
    if (!M)
      return T.fatalError("Invalid processing instruction starting at position " + N);
    if (M[1].toLowerCase() === "xml") {
      if (N > 0)
        return T.fatalError(
          "processing instruction at position " + N + " is an xml declaration which is only at the start of the document"
        );
      if (!e.XMLDecl.test(g.substring(N)))
        return T.fatalError("xml declaration is not well-formed");
    }
    return S.processingInstruction(M[1], M[2]), N + M[0].length;
  }
  function Be() {
    this.attributeNames = /* @__PURE__ */ Object.create(null);
  }
  return Be.prototype = {
    setTagName: function(g) {
      if (!e.QName_exact.test(g))
        throw new Error("invalid tagName:" + g);
      this.tagName = g;
    },
    addValue: function(g, N, S) {
      if (!e.QName_exact.test(g))
        throw new Error("invalid attribute:" + g);
      this.attributeNames[g] = this.length, this[this.length++] = { qName: g, value: N, offset: S };
    },
    length: 0,
    getLocalName: function(g) {
      return this[g].localName;
    },
    getLocator: function(g) {
      return this[g].locator;
    },
    getQName: function(g) {
      return this[g].qName;
    },
    getURI: function(g) {
      return this[g].uri;
    },
    getValue: function(g) {
      return this[g].value;
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
  }, Ct.XMLReader = F, Ct.parseUtils = W, Ct.parseDoctypeCommentOrCData = Ie, Ct;
}
var cr;
function wn() {
  if (cr) return rt;
  cr = 1;
  var t = Dt(), e = $r(), r = Pt(), u = Cn(), o = Tn(), a = e.DOMImplementation, p = t.hasDefaultHTMLNamespace, h = t.isHTMLMimeType, f = t.isValidMimeType, d = t.MIME_TYPE, m = t.NAMESPACE, l = r.ParseError, v = o.XMLReader;
  function C(E) {
    return E.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028\u2029]/g, `
`);
  }
  function b(E) {
    if (E = E || {}, E.locator === void 0 && (E.locator = !0), this.assign = E.assign || t.assign, this.domHandler = E.domHandler || y, this.onError = E.onError || E.errorHandler, E.errorHandler && typeof E.errorHandler != "function")
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    E.errorHandler && E.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = E.normalizeLineEndings || C, this.locator = !!E.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), E.xmlns);
  }
  b.prototype.parseFromString = function(E, x) {
    if (!f(x))
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + x + '" is not valid.');
    var k = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), G = u.XML_ENTITIES, W = k[""] || null;
    p(x) ? (G = u.HTML_ENTITIES, W = m.HTML) : x === d.XML_SVG_IMAGE && (W = m.SVG), k[""] = W, k.xml = k.xml || m.XML;
    var ee = new this.domHandler({
      mimeType: x,
      defaultNamespace: W,
      onError: this.onError
    }), Ie = this.locator ? {} : void 0;
    this.locator && ee.setDocumentLocator(Ie);
    var te = new v();
    te.errorHandler = ee, te.domBuilder = ee;
    var Be = !t.isHTMLMimeType(x);
    return Be && typeof E != "string" && te.errorHandler.fatalError("source is not a string"), te.parse(this.normalizeLineEndings(String(E)), k, G), ee.doc.documentElement || te.errorHandler.fatalError("missing root element"), ee.doc;
  };
  function y(E) {
    var x = E || {};
    this.mimeType = x.mimeType || d.XML_APPLICATION, this.defaultNamespace = x.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = x.onError;
  }
  function q(E, x) {
    x.lineNumber = E.lineNumber, x.columnNumber = E.columnNumber;
  }
  y.prototype = {
    /**
     * Either creates an XML or an HTML document and stores it under `this.doc`.
     * If it is an XML document, `this.defaultNamespace` is used to create it,
     * and it will not contain any `childNodes`.
     * If it is an HTML document, it will be created without any `childNodes`.
     *
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
     */
    startDocument: function() {
      var E = new a();
      this.doc = h(this.mimeType) ? E.createHTMLDocument(!1) : E.createDocument(this.defaultNamespace, "");
    },
    startElement: function(E, x, k, G) {
      var W = this.doc, ee = W.createElementNS(E, k || x), Ie = G.length;
      U(this, ee), this.currentElement = ee, this.locator && q(this.locator, ee);
      for (var te = 0; te < Ie; te++) {
        var E = G.getURI(te), Be = G.getValue(te), k = G.getQName(te), g = W.createAttributeNS(E, k);
        this.locator && q(G.getLocator(te), g), g.value = g.nodeValue = Be, ee.setAttributeNode(g);
      }
    },
    endElement: function(E, x, k) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(E, x) {
    },
    endPrefixMapping: function(E) {
    },
    processingInstruction: function(E, x) {
      var k = this.doc.createProcessingInstruction(E, x);
      this.locator && q(this.locator, k), U(this, k);
    },
    ignorableWhitespace: function(E, x, k) {
    },
    characters: function(E, x, k) {
      if (E = F.apply(this, arguments), E) {
        if (this.cdata)
          var G = this.doc.createCDATASection(E);
        else
          var G = this.doc.createTextNode(E);
        this.currentElement ? this.currentElement.appendChild(G) : /^\s*$/.test(E) && this.doc.appendChild(G), this.locator && q(this.locator, G);
      }
    },
    skippedEntity: function(E) {
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
    setDocumentLocator: function(E) {
      E && (E.lineNumber = 0), this.locator = E;
    },
    //LexicalHandler
    comment: function(E, x, k) {
      E = F.apply(this, arguments);
      var G = this.doc.createComment(E);
      this.locator && q(this.locator, G), U(this, G);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(E, x, k, G) {
      var W = this.doc.implementation;
      if (W && W.createDocumentType) {
        var ee = W.createDocumentType(E, x, k, G);
        this.locator && q(this.locator, ee), U(this, ee), this.doc.doctype = ee;
      }
    },
    reportError: function(E, x) {
      if (typeof this.onError == "function")
        try {
          this.onError(E, x, this);
        } catch (k) {
          throw new l("Reporting " + E + ' "' + x + '" caused ' + k, this.locator);
        }
      else
        console.error("[xmldom " + E + "]	" + x, B(this.locator));
    },
    /**
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(E) {
      this.reportError("warning", E);
    },
    error: function(E) {
      this.reportError("error", E);
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
    fatalError: function(E) {
      throw this.reportError("fatalError", E), new l(E, this.locator);
    }
  };
  function B(E) {
    if (E)
      return `
@#[line:` + E.lineNumber + ",col:" + E.columnNumber + "]";
  }
  function F(E, x, k) {
    return typeof E == "string" ? E.substr(x, k) : E.length >= x + k || x ? new java.lang.String(E, x, k) + "" : E;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function(E) {
      y.prototype[E] = function() {
        return null;
      };
    }
  );
  function U(E, x) {
    E.currentElement ? E.currentElement.appendChild(x) : E.doc.appendChild(x);
  }
  function ne(E) {
    if (E === "error") throw "onErrorStopParsing";
  }
  function he() {
    throw "onWarningStopParsing";
  }
  return rt.__DOMHandler = y, rt.DOMParser = b, rt.normalizeLineEndings = C, rt.onErrorStopParsing = ne, rt.onWarningStopParsing = he, rt;
}
var lr;
function Sn() {
  if (lr) return J;
  lr = 1;
  var t = Dt();
  J.assign = t.assign, J.hasDefaultHTMLNamespace = t.hasDefaultHTMLNamespace, J.isHTMLMimeType = t.isHTMLMimeType, J.isValidMimeType = t.isValidMimeType, J.MIME_TYPE = t.MIME_TYPE, J.NAMESPACE = t.NAMESPACE;
  var e = Pt();
  J.DOMException = e.DOMException, J.DOMExceptionName = e.DOMExceptionName, J.ExceptionCode = e.ExceptionCode, J.ParseError = e.ParseError;
  var r = $r();
  J.Attr = r.Attr, J.CDATASection = r.CDATASection, J.CharacterData = r.CharacterData, J.Comment = r.Comment, J.Document = r.Document, J.DocumentFragment = r.DocumentFragment, J.DocumentType = r.DocumentType, J.DOMImplementation = r.DOMImplementation, J.Element = r.Element, J.Entity = r.Entity, J.EntityReference = r.EntityReference, J.LiveNodeList = r.LiveNodeList, J.NamedNodeMap = r.NamedNodeMap, J.Node = r.Node, J.NodeList = r.NodeList, J.Notation = r.Notation, J.ProcessingInstruction = r.ProcessingInstruction, J.Text = r.Text, J.XMLSerializer = r.XMLSerializer;
  var u = wn();
  return J.DOMParser = u.DOMParser, J.normalizeLineEndings = u.normalizeLineEndings, J.onErrorStopParsing = u.onErrorStopParsing, J.onWarningStopParsing = u.onWarningStopParsing, J;
}
Sn();
const Ut = "USJ";
var xe = {}, jt, fr;
function On() {
  return fr || (fr = 1, jt = () => {
    const t = "\\ud800-\\udfff", p = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", h = "\\ufe0e\\ufe0f", f = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", d = `[${t}]`, m = `[${p}]`, l = "\\ud83c[\\udffb-\\udfff]", v = `(?:${m}|${l})`, C = `[^${t}]`, b = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", y = "[\\ud800-\\udbff][\\udc00-\\udfff]", q = "\\u200d", B = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", F = `[${f}]`, U = `${v}?`, ne = `[${h}]?`, he = `(?:${q}(?:${[C, b, y].join("|")})${ne + U})*`, E = ne + U + he, k = `(?:${[`${C}${m}?`, m, b, y, d, F].join("|")})`;
    return new RegExp(`${B}|${l}(?=${l})|${k + E}`, "g");
  }), jt;
}
var hr;
function In() {
  if (hr) return xe;
  hr = 1;
  var t = xe && xe.__importDefault || function(f) {
    return f && f.__esModule ? f : { default: f };
  };
  Object.defineProperty(xe, "__esModule", { value: !0 });
  var e = t(On());
  function r(f) {
    if (typeof f != "string")
      throw new Error("A string is expected as input");
    return f.match(e.default()) || [];
  }
  xe.toArray = r;
  function u(f) {
    if (typeof f != "string")
      throw new Error("Input must be a string");
    var d = f.match(e.default());
    return d === null ? 0 : d.length;
  }
  xe.length = u;
  function o(f, d, m) {
    if (d === void 0 && (d = 0), typeof f != "string")
      throw new Error("Input must be a string");
    (typeof d != "number" || d < 0) && (d = 0), typeof m == "number" && m < 0 && (m = 0);
    var l = f.match(e.default());
    return l ? l.slice(d, m).join("") : "";
  }
  xe.substring = o;
  function a(f, d, m) {
    if (d === void 0 && (d = 0), typeof f != "string")
      throw new Error("Input must be a string");
    var l = u(f);
    if (typeof d != "number" && (d = parseInt(d, 10)), d >= l)
      return "";
    d < 0 && (d += l);
    var v;
    typeof m > "u" ? v = l : (typeof m != "number" && (m = parseInt(m, 10)), v = m >= 0 ? m + d : d);
    var C = f.match(e.default());
    return C ? C.slice(d, v).join("") : "";
  }
  xe.substr = a;
  function p(f, d, m, l) {
    if (d === void 0 && (d = 16), m === void 0 && (m = "#"), l === void 0 && (l = "right"), typeof f != "string" || typeof d != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(l) === -1)
      throw new Error("Pad position should be either left or right");
    typeof m != "string" && (m = String(m));
    var v = u(f);
    if (v > d)
      return o(f, 0, d);
    if (v < d) {
      var C = m.repeat(d - v);
      return l === "left" ? C + f : f + C;
    }
    return f;
  }
  xe.limit = p;
  function h(f, d, m) {
    if (m === void 0 && (m = 0), typeof f != "string")
      throw new Error("Input must be a string");
    if (f === "")
      return d === "" ? 0 : -1;
    m = Number(m), m = isNaN(m) ? 0 : m, d = String(d);
    var l = r(f);
    if (m >= l.length)
      return d === "" ? l.length : -1;
    if (d === "")
      return m;
    var v = r(d), C = !1, b;
    for (b = m; b < l.length; b += 1) {
      for (var y = 0; y < v.length && v[y] === l[b + y]; )
        y += 1;
      if (y === v.length && v[y - 1] === l[b + y - 1]) {
        C = !0;
        break;
      }
    }
    return C ? b : -1;
  }
  return xe.indexOf = h, xe;
}
var ot = In();
function jr(t) {
  return t ? Array.isArray(t) ? t : [t] : [];
}
function Mt(t, e) {
  if (!(e > fe(t) || e < -fe(t)))
    return Lt(t, e, 1);
}
function gt(t, e) {
  return e < 0 || e > fe(t) - 1 ? "" : Lt(t, e, 1);
}
function fi(t, e) {
  if (!(e < 0 || e > fe(t) - 1))
    return Lt(t, e, 1).codePointAt(0);
}
function xn(t, e, r = fe(t)) {
  const u = _n(t, e);
  return !(u === -1 || u + fe(e) !== r);
}
function Mn(t, e, r) {
  if (e < 0) return -1;
  if (r) {
    if (gt(t, e) === "}" && gt(t, e - 1) === "\\") return e;
    const a = Ot(t, "\\}", e);
    return a >= 0 ? a + 1 : a;
  }
  let u = e;
  const o = fe(t);
  for (; u < o && (u = Ot(t, "}", u), !(u === -1 || gt(t, u - 1) !== "\\")); )
    u += 1;
  return u >= o ? -1 : u;
}
function Bn(t, e) {
  const r = [];
  let u = 0, o = 0;
  function a(h, f, d) {
    const m = ut(t, o, f), l = r.length > 0 && Me(r[r.length - 1]) ? `${r.pop()}${m}` : m;
    Me(h) ? r.push(`${l}${h}`) : (l && r.push(l), r.push(h)), o = f + d;
  }
  const p = fe(t);
  for (; u < p; ) {
    switch (gt(t, u)) {
      case "{":
        if (gt(t, u - 1) !== "\\") {
          const h = Mn(t, u, !1);
          if (h >= 0) {
            const f = ut(t, u + 1, h), d = f in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[f]
            ) : f;
            a(d, u, h + 1 - u), u = h, o = h + 1;
          }
        } else
          a("{", u - 1, 2);
        break;
      case "}":
        gt(t, u - 1) !== "\\" || a("}", u - 1, 2);
        break;
    }
    u += 1;
  }
  if (o < p) {
    const h = ut(t, o);
    r.push(
      r.length > 0 && Me(r[r.length - 1]) ? `${r.pop()}${h}` : h
    );
  }
  return r;
}
function hi(t, e) {
  return Bn(t, e).map((r) => `${r}`).join("");
}
function Rn(t, e, r = 0) {
  const u = ut(t, r);
  return Ot(u, e) !== -1;
}
function Ot(t, e, r = 0) {
  return ot.indexOf(t, e, r);
}
function _n(t, e, r) {
  let u = r === void 0 ? fe(t) : r;
  u < 0 ? u = 0 : u >= fe(t) && (u = fe(t) - 1);
  for (let o = u; o >= 0; o--)
    if (Lt(t, o, fe(e)) === e)
      return o;
  return -1;
}
function fe(t) {
  return ot.length(t);
}
function pi(t, e) {
  const r = e.toUpperCase();
  return r === "NONE" ? t : t.normalize(r);
}
function di(t, e, r) {
  return t.localeCompare(e, "en", r);
}
function mi(t, e, r = " ") {
  return e <= fe(t) ? t : ot.limit(t, e, r, "right");
}
function gi(t, e, r = " ") {
  return e <= fe(t) ? t : ot.limit(t, e, r, "left");
}
function pr(t, e) {
  return e > t ? t : e < -t ? 0 : e < 0 ? e + t : e;
}
function dr(t, e, r) {
  const u = fe(t);
  if (e > u || r && (e > r && !(e >= 0 && e < u && r < 0 && r > -u) || r < -u))
    return "";
  const o = pr(u, e), a = r ? pr(u, r) : void 0;
  return ut(t, o, a);
}
function mr(t, e, r) {
  const u = [];
  if (r !== void 0 && r <= 0)
    return [t];
  if (e === "") return Pn(t).slice(0, r);
  let o = e;
  (typeof e == "string" || e instanceof RegExp && !Rn(e.flags, "g")) && (o = new RegExp(e, "g"));
  const a = t.match(o);
  let p = 0;
  if (!a) return [t];
  for (let h = 0; h < (r ? r - 1 : a.length); h++) {
    const f = Ot(t, a[h], p), d = fe(a[h]);
    if (u.push(ut(t, p, f)), p = f + d, r !== void 0 && u.length === r)
      break;
  }
  return u.push(ut(t, p)), u;
}
function Ur(t, e, r = 0) {
  return Ot(t, e, r) === r;
}
function Lt(t, e = 0, r = fe(t) - e) {
  return ot.substr(t, e, r);
}
function ut(t, e, r = fe(t)) {
  return ot.substring(t, e, r);
}
function Pn(t) {
  return ot.toArray(t);
}
function Ei(t) {
  return Ur(t, "%") && xn(t, "%");
}
function Di(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function vi(t) {
  return t ? jr(t).map(
    (u) => Array.isArray(u) ? u.map((o) => new RegExp(o)) : new RegExp(u)
  ) : [];
}
function Ai(t) {
  return t ? jr(t).map((u) => new RegExp(u)) : [];
}
const Ln = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function mt(t) {
  return Ln.test(t);
}
function bi(t) {
  let e = "";
  for (let r = 0; r < t.length; r++) {
    const u = t[r];
    if (u === u.toUpperCase() && u !== u.toLowerCase()) {
      if (r > 0) {
        const a = t[r - 1];
        if (!(a === a.toUpperCase() && a !== a.toLowerCase()))
          e += "-";
        else if (r + 1 < t.length) {
          const h = t[r + 1];
          h === h.toLowerCase() && h !== h.toUpperCase() && (e += "-");
        }
      }
      e += u.toLowerCase();
    } else
      e += u;
  }
  return e;
}
const Vt = ["chapter", "book", "para", "row", "sidebar", Ut], kn = "​", Vr = [
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
], Fn = 1, qn = Vr.length - 1, $n = 1, jn = 1, Ni = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, Un = (t) => {
  var e;
  return ((e = Vr[t]) == null ? void 0 : e.chapters) ?? -1;
}, yi = (t, e) => ({
  book: le.bookNumberToId(
    Math.max(
      Fn,
      Math.min(le.bookIdToNumber(t.book) + e, qn)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), Ci = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max($n, t.chapterNum + e),
    Un(le.bookIdToNumber(t.book))
  ),
  verseNum: 1
}), Ti = (t, e) => ({
  ...t,
  verseNum: Math.max(jn, t.verseNum + e)
});
async function wi(t, e, r) {
  const u = le.bookNumberToId(t);
  if (!Ur(Intl.getCanonicalLocales(e)[0], "zh"))
    return r({
      localizeKey: `LocalizedId.${u}`,
      languagesToSearch: [e]
    });
  const o = await r({
    localizeKey: `Book.${u}`,
    languagesToSearch: [e]
  }), a = mr(o, "-");
  return mr(a[0], "ÿ08")[0].trim();
}
function Si(t) {
  return new Fr(le.bookIdToNumber(t.book), t.chapterNum, t.verseNum).BBBCCC;
}
function gr(t) {
  return new Fr(le.bookIdToNumber(t.book), t.chapterNum, t.verseNum).BBBCCCVVV;
}
function Oi(t, e) {
  return gr(t) - gr(e);
}
function Vn(t) {
  return `%scrollGroup_${t}%`;
}
function Ii(t) {
  return t.map((e) => Vn(e));
}
function xi(t, e, r, u) {
  let o;
  switch (e ?? "id") {
    case "English":
      o = le.bookIdToEnglishName(t.book);
      break;
    case "id":
      o = t.book;
      break;
    default:
      o = e ?? "";
      break;
  }
  return `${o}${u ?? " "}${t.chapterNum}${r ?? ":"}${t.verseNum}`;
}
var zn = /* @__PURE__ */ ((t) => (t.OT = "OT", t.NT = "NT", t.DC = "DC", t.Extra = "Extra", t))(zn || {});
const Mi = (t) => {
  if (le.isBookOT(t)) return "OT";
  if (le.isBookNT(t)) return "NT";
  if (le.isBookDC(t)) return "DC";
  if (le.isExtraMaterial(t)) return "Extra";
  throw new Error(`Unknown section for book: ${t}`);
}, Gn = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function Er(t) {
  return Gn.test(t);
}
const Hn = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function Jn(t) {
  return Hn.test(t);
}
function Dr(t) {
  let e = "", r = !1, u = "\0";
  for (let o = 0; o < t.length; o += 1) {
    const a = t[o];
    a.charCodeAt(0) < 32 ? (r || (e += " "), r = !0) : !r && a === kn && o + 1 < t.length && Er(t[o + 1]) || (Er(a) ? (r || (e += a), r = !0) : Jn(a) && u === a || (e += a, r = !1)), u = a;
  }
  return e;
}
function vr(t) {
  return !t || t.length === 0 ? !0 : t.length === 1 && (t[0] === void 0 || t[0] === "");
}
function Ar(t, e) {
  if (!e || !Vt.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(t)} does not have a content array! This should not happen!`
    );
  return t === e.content[e.content.length - 1];
}
function zr(t, e, r, u) {
  if (!t && !r) return !0;
  if (!t || !r) return !1;
  const o = Me(t), a = Me(r);
  if (o && a) {
    const p = Dr(t), h = Dr(r);
    if (p !== h) {
      if (!mt(Mt(p, -1) ?? "") && !mt(Mt(h, -1) ?? "") || !Ar(t, e) || !Ar(r, u)) return !1;
      let f = p;
      for (; mt(Mt(f, -1) ?? ""); ) f = dr(f, 0, -1);
      let d = h;
      for (; mt(Mt(d, -1) ?? ""); ) d = dr(d, 0, -1);
      if (f !== d) return !1;
    }
  } else if (!o && !a) {
    const p = t, h = r, f = Object.keys(p).filter(
      (l) => l !== "content"
    );
    if (f.length !== Object.keys(h).filter((l) => l !== "content").length || f.some((l) => !(l in h) || p[l] !== h[l])) return !1;
    const d = vr(p.content), m = vr(h.content);
    if (d !== m) return !1;
    if (!d && !m) {
      let l = p.content, v = h.content;
      const C = l[l.length - 1];
      Vt.includes(p.type) && Me(C) && mt(C) && (l = l.slice(0, -1));
      const b = v[v.length - 1];
      if (Vt.includes(h.type) && Me(b) && mt(b) && (v = v.slice(0, -1)), l.length !== v.length) return !1;
      for (let y = 0; y < l.length; y += 1)
        if (!zr(l[y], p, v[y], h))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function Bi(t, e) {
  return zr(t, void 0, e, void 0);
}
const Ri = (t) => (...e) => t.map((u) => u(...e)).every((u) => u), _i = (t) => async (...e) => {
  const r = t.map(async (u) => u(...e));
  return (await Promise.all(r)).every((u) => u);
}, Bt = "chapter", Rt = "verse";
function Gr() {
  return Array.from({ length: 26 }, (t, e) => String.fromCharCode(97 + e));
}
function Xn(t, e) {
  const r = e && e.length > 0 ? e : Gr();
  return r[t % r.length];
}
function Pi(t, e) {
  const r = e && e.length > 0 ? e : Gr(), u = (() => {
    const o = /* @__PURE__ */ new Map();
    let a = 0;
    return t.forEach((p, h) => {
      p.caller === "+" && (o.set(h, Xn(a, r)), a += 1);
    }), o;
  })();
  return (o, a) => {
    if (o === "+") {
      const p = u.get(a);
      return p || (console.warn(`Caller index ${a} out of range for '+' callers`), "?");
    }
    if (o !== "-")
      return o;
  };
}
function Yn(t) {
  const e = [];
  if (!t || t.length === 0) return e;
  function r(u) {
    typeof u != "string" && (u.type === "note" ? e.push(u) : Array.isArray(u.content) && u.content.length > 0 && u.content.forEach(r));
  }
  return t.forEach(r), e;
}
function Li(t, e = {}) {
  const {
    splitterThicknessPx: r = 4,
    secondaryPaneMinSizePx: u = 20,
    mainPaneMinSizePx: o = 60,
    absoluteMinPercent: a = 3,
    absoluteMaxPercent: p = 90
  } = e, h = t - r;
  let f, d;
  return h < u + o ? (f = a, d = p) : (d = Math.min(
    Math.floor((h - o) / h * 100),
    p
  ), f = Math.min(
    Math.max(Math.ceil(u / h * 100), a),
    d
  )), { minPercent: f, maxPercent: d };
}
var Kn = Object.getOwnPropertyNames, Wn = Object.getOwnPropertySymbols, Qn = Object.prototype.hasOwnProperty;
function br(t, e) {
  return function(u, o, a) {
    return t(u, o, a) && e(u, o, a);
  };
}
function _t(t) {
  return function(r, u, o) {
    if (!r || !u || typeof r != "object" || typeof u != "object")
      return t(r, u, o);
    var a = o.cache, p = a.get(r), h = a.get(u);
    if (p && h)
      return p === u && h === r;
    a.set(r, u), a.set(u, r);
    var f = t(r, u, o);
    return a.delete(r), a.delete(u), f;
  };
}
function Nr(t) {
  return Kn(t).concat(Wn(t));
}
var Zn = Object.hasOwn || function(t, e) {
  return Qn.call(t, e);
};
function at(t, e) {
  return t === e || !t && !e && t !== t && e !== e;
}
var eu = "__v", tu = "__o", ru = "_owner", yr = Object.getOwnPropertyDescriptor, Cr = Object.keys;
function nu(t, e, r) {
  var u = t.length;
  if (e.length !== u)
    return !1;
  for (; u-- > 0; )
    if (!r.equals(t[u], e[u], u, u, t, e, r))
      return !1;
  return !0;
}
function uu(t, e) {
  return at(t.getTime(), e.getTime());
}
function iu(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack;
}
function ou(t, e) {
  return t === e;
}
function Tr(t, e, r) {
  var u = t.size;
  if (u !== e.size)
    return !1;
  if (!u)
    return !0;
  for (var o = new Array(u), a = t.entries(), p, h, f = 0; (p = a.next()) && !p.done; ) {
    for (var d = e.entries(), m = !1, l = 0; (h = d.next()) && !h.done; ) {
      if (o[l]) {
        l++;
        continue;
      }
      var v = p.value, C = h.value;
      if (r.equals(v[0], C[0], f, l, t, e, r) && r.equals(v[1], C[1], v[0], C[0], t, e, r)) {
        m = o[l] = !0;
        break;
      }
      l++;
    }
    if (!m)
      return !1;
    f++;
  }
  return !0;
}
var au = at;
function su(t, e, r) {
  var u = Cr(t), o = u.length;
  if (Cr(e).length !== o)
    return !1;
  for (; o-- > 0; )
    if (!Hr(t, e, r, u[o]))
      return !1;
  return !0;
}
function Tt(t, e, r) {
  var u = Nr(t), o = u.length;
  if (Nr(e).length !== o)
    return !1;
  for (var a, p, h; o-- > 0; )
    if (a = u[o], !Hr(t, e, r, a) || (p = yr(t, a), h = yr(e, a), (p || h) && (!p || !h || p.configurable !== h.configurable || p.enumerable !== h.enumerable || p.writable !== h.writable)))
      return !1;
  return !0;
}
function cu(t, e) {
  return at(t.valueOf(), e.valueOf());
}
function lu(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function wr(t, e, r) {
  var u = t.size;
  if (u !== e.size)
    return !1;
  if (!u)
    return !0;
  for (var o = new Array(u), a = t.values(), p, h; (p = a.next()) && !p.done; ) {
    for (var f = e.values(), d = !1, m = 0; (h = f.next()) && !h.done; ) {
      if (!o[m] && r.equals(p.value, h.value, p.value, h.value, t, e, r)) {
        d = o[m] = !0;
        break;
      }
      m++;
    }
    if (!d)
      return !1;
  }
  return !0;
}
function fu(t, e) {
  var r = t.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (t[r] !== e[r])
      return !1;
  return !0;
}
function hu(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password;
}
function Hr(t, e, r, u) {
  return (u === ru || u === tu || u === eu) && (t.$$typeof || e.$$typeof) ? !0 : Zn(e, u) && r.equals(t[u], e[u], u, u, t, e, r);
}
var pu = "[object Arguments]", du = "[object Boolean]", mu = "[object Date]", gu = "[object Error]", Eu = "[object Map]", Du = "[object Number]", vu = "[object Object]", Au = "[object RegExp]", bu = "[object Set]", Nu = "[object String]", yu = "[object URL]", Cu = Array.isArray, Sr = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, Or = Object.assign, Tu = Object.prototype.toString.call.bind(Object.prototype.toString);
function wu(t) {
  var e = t.areArraysEqual, r = t.areDatesEqual, u = t.areErrorsEqual, o = t.areFunctionsEqual, a = t.areMapsEqual, p = t.areNumbersEqual, h = t.areObjectsEqual, f = t.arePrimitiveWrappersEqual, d = t.areRegExpsEqual, m = t.areSetsEqual, l = t.areTypedArraysEqual, v = t.areUrlsEqual;
  return function(b, y, q) {
    if (b === y)
      return !0;
    if (b == null || y == null)
      return !1;
    var B = typeof b;
    if (B !== typeof y)
      return !1;
    if (B !== "object")
      return B === "number" ? p(b, y, q) : B === "function" ? o(b, y, q) : !1;
    var F = b.constructor;
    if (F !== y.constructor)
      return !1;
    if (F === Object)
      return h(b, y, q);
    if (Cu(b))
      return e(b, y, q);
    if (Sr != null && Sr(b))
      return l(b, y, q);
    if (F === Date)
      return r(b, y, q);
    if (F === RegExp)
      return d(b, y, q);
    if (F === Map)
      return a(b, y, q);
    if (F === Set)
      return m(b, y, q);
    var U = Tu(b);
    return U === mu ? r(b, y, q) : U === Au ? d(b, y, q) : U === Eu ? a(b, y, q) : U === bu ? m(b, y, q) : U === vu ? typeof b.then != "function" && typeof y.then != "function" && h(b, y, q) : U === yu ? v(b, y, q) : U === gu ? u(b, y, q) : U === pu ? h(b, y, q) : U === du || U === Du || U === Nu ? f(b, y, q) : !1;
  };
}
function Su(t) {
  var e = t.circular, r = t.createCustomConfig, u = t.strict, o = {
    areArraysEqual: u ? Tt : nu,
    areDatesEqual: uu,
    areErrorsEqual: iu,
    areFunctionsEqual: ou,
    areMapsEqual: u ? br(Tr, Tt) : Tr,
    areNumbersEqual: au,
    areObjectsEqual: u ? Tt : su,
    arePrimitiveWrappersEqual: cu,
    areRegExpsEqual: lu,
    areSetsEqual: u ? br(wr, Tt) : wr,
    areTypedArraysEqual: u ? Tt : fu,
    areUrlsEqual: hu
  };
  if (r && (o = Or({}, o, r(o))), e) {
    var a = _t(o.areArraysEqual), p = _t(o.areMapsEqual), h = _t(o.areObjectsEqual), f = _t(o.areSetsEqual);
    o = Or({}, o, {
      areArraysEqual: a,
      areMapsEqual: p,
      areObjectsEqual: h,
      areSetsEqual: f
    });
  }
  return o;
}
function Ou(t) {
  return function(e, r, u, o, a, p, h) {
    return t(e, r, h);
  };
}
function Iu(t) {
  var e = t.circular, r = t.comparator, u = t.createState, o = t.equals, a = t.strict;
  if (u)
    return function(f, d) {
      var m = u(), l = m.cache, v = l === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : l, C = m.meta;
      return r(f, d, {
        cache: v,
        equals: o,
        meta: C,
        strict: a
      });
    };
  if (e)
    return function(f, d) {
      return r(f, d, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: o,
        meta: void 0,
        strict: a
      });
    };
  var p = {
    cache: void 0,
    equals: o,
    meta: void 0,
    strict: a
  };
  return function(f, d) {
    return r(f, d, p);
  };
}
var xu = Ge();
Ge({ strict: !0 });
Ge({ circular: !0 });
Ge({
  circular: !0,
  strict: !0
});
Ge({
  createInternalComparator: function() {
    return at;
  }
});
Ge({
  strict: !0,
  createInternalComparator: function() {
    return at;
  }
});
Ge({
  circular: !0,
  createInternalComparator: function() {
    return at;
  }
});
Ge({
  circular: !0,
  createInternalComparator: function() {
    return at;
  },
  strict: !0
});
function Ge(t) {
  t === void 0 && (t = {});
  var e = t.circular, r = e === void 0 ? !1 : e, u = t.createInternalComparator, o = t.createState, a = t.strict, p = a === void 0 ? !1 : a, h = Su(t), f = wu(h), d = u ? u(f) : Ou(f);
  return Iu({ circular: r, comparator: f, createState: o, equals: d, strict: p });
}
function Mu(t, e) {
  return xu(t, e);
}
function Bu(t, e) {
  if (typeof t != typeof e) return !1;
  if (!t && !e) return !0;
  if (Array.isArray(t)) {
    const a = e, p = t;
    return a.length === 0 ? !0 : a.every((h) => p.includes(h));
  }
  if (typeof t != "object")
    return Mu(t, e);
  const r = e, u = t;
  let o = !0;
  return Object.keys(r).forEach((a) => {
    o && (Object.hasOwn(u, a) && Bu(u[a], r[a]) || (o = !1));
  }), o;
}
function Ir(t, e, r) {
  return JSON.stringify(t, (o, a) => {
    let p = a;
    return e && (p = e(o, p)), p === void 0 && (p = null), p;
  }, r);
}
function Ru(t, e) {
  function r(o) {
    return Object.keys(o).forEach((a) => {
      o[a] === null ? o[a] = void 0 : typeof o[a] == "object" && (o[a] = r(o[a]));
    }), o;
  }
  const u = JSON.parse(t, e);
  if (u !== null)
    return typeof u == "object" ? r(u) : u;
}
function ki(t) {
  try {
    const e = Ir(t);
    return e === Ir(Ru(e));
  } catch {
    return !1;
  }
}
const Fi = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function qi() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0].replace(/@posix$/i, "") : new en().resolvedOptions().locale;
}
function $i(t, e = 2) {
  if (t === 0) return "0 Bytes";
  const r = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], u = Math.floor(Math.log(t) / Math.log(1024)), o = r[u];
  return `${new cn("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(t / 1024 ** u)} ${o}`;
}
const _u = 1e3, Jr = 60, Xr = Jr * 60, Pu = Xr * 24;
function ji(t, e, r = /* @__PURE__ */ new Date()) {
  const u = Math.floor((e.getTime() - r.getTime()) / _u), o = Math.round(u / Pu);
  if (Math.abs(o) >= 1) return t.format(o, "day");
  const a = Math.round(u / Xr);
  if (Math.abs(a) >= 1) return t.format(a, "hour");
  const p = Math.round(u / Jr);
  return Math.abs(p) >= 1 ? t.format(p, "minute") : t.format(u, "second");
}
const Ui = /* @__PURE__ */ new Set([
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
]), Jt = {
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
function kt(t) {
  t && Object.values(t).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && kt(e.properties);
    }
  });
}
kt(Jt);
const Lu = {
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
  $defs: Jt
};
Object.freeze(Lu);
const ku = {
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
  $defs: Jt
};
Object.freeze(ku);
const Yr = {
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
kt(Yr);
const Fu = {
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
  $defs: Yr
};
Object.freeze(Fu);
const qu = {
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
Object.freeze(qu);
const Kr = {
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
kt(Kr);
const $u = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: Kr
};
Object.freeze($u);
const ju = "theme-styles";
function Uu(t, e) {
  return `${t ? `${t}-` : ""}${e}`;
}
function Vi(t, e) {
  return Object.fromEntries(
    Object.entries(t).map(([u, o]) => [
      u,
      o ? Object.fromEntries(
        Object.entries(o).map(([a, p]) => {
          var h;
          return [
            a,
            p ? {
              ...p,
              // Add the derived properties
              themeFamilyId: u,
              type: a,
              id: Uu(u, a),
              cssVariables: {
                // Fill in the default css variables
                ...(h = e == null ? void 0 : e[a]) == null ? void 0 : h.cssVariables,
                ...p.cssVariables
              }
            } : void 0
          ];
        }).filter(([, a]) => !!a)
      ) : void 0
    ]).filter(([, u]) => !!u)
  );
}
function Vu(t) {
  return `
.${t.id} {
${Object.entries(t.cssVariables).map(([e, r]) => `  --${e}: ${r};`).join(`
`)}
}
`;
}
function zi(t, e, r) {
  const u = e == null ? void 0 : e.dataset.themeId;
  u && this.document.body.classList.remove(u), this.document.body.classList.add(t.id), e && this.document.head.removeChild(e);
  const o = this.document.createElement("style");
  return o.id = `${ju}${r ? `-${r}` : ""}`, o.dataset.themeId = t.id, o.textContent = Vu(t), this.document.head.appendChild(o), o;
}
const je = ["figure", "note", "sidebar", "table"];
Object.freeze(je);
class ie {
  constructor(e) {
    z(this, "usj");
    z(this, "parentMapInternal");
    this.usj = e;
  }
  // If new variables are created to speed up queries, they should be reset here
  usjChanged() {
    this.parentMapInternal = void 0;
  }
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(e) {
    const r = Wt({ path: e, json: this.usj, wrap: !0 });
    if (r === void 0 || r.length === 0) return;
    if (!Array.isArray(r[0])) return r[0];
    const u = Wt({ path: e, json: this.usj, wrap: !1 });
    return u.length === 1 && Array.isArray(u[0]) ? u[0] : u;
  }
  findParent(e) {
    return this.findSingleValue(`${e}^`);
  }
  findBookId() {
    return this.findSingleValue('$.content[?(@.type=="book" && @.marker=="id")].code');
  }
  findChapterNode(e) {
    const r = `$..content[?(@.type=="chapter" && @.number=="${e}")]`;
    return this.findSingleValue(r);
  }
  // #endregion
  // #region Parent Maps
  static createParentMapInternal(e, r, u) {
    var o;
    u.set(e, r), e.content && u.set(e.content, e), (o = e.content) == null || o.forEach((a) => {
      typeof a == "object" && ie.createParentMapInternal(a, e, u);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((r) => {
      typeof r == "object" && ie.createParentMapInternal(r, this.usj, e);
    }), e;
  }
  /** Create the parent map if it doesn't already exist and return it */
  get parentMap() {
    return this.parentMapInternal ? this.parentMapInternal : (this.parentMapInternal = this.createUsjParentMap(), this.parentMapInternal);
  }
  // #endregion
  // #region Working Stacks
  /**
   * Checks if two stack items are equal using shallow equivalence, testing the stack item
   * properties for [strict
   * equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
   *
   * Note that this requires the parent of the two stack items to have reference equality
   */
  static areStackItemsShallowEqual(e, r) {
    return e.index === r.index && e.parent === r.parent;
  }
  /** Return the working stack applicable to the given node */
  createWorkingStack(e) {
    const r = [], { parentMap: u } = this;
    let o = e, a = u.get(o);
    for (; a !== void 0; ) {
      if (!a.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !a.content.find((p, h) => {
          if (p !== o) return !1;
          if (!a) throw new Error('undefined "tempParent" should not be possible');
          return r.unshift({ parent: a, index: h }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(o)}`);
      if (a.type === Ut) break;
      o = a, a = u.get(a);
    }
    return r;
  }
  static convertWorkingStackToJsonPath(e) {
    let r = "$";
    return e.forEach((u) => {
      r = `${r}.content[${u.index}]`;
    }), r;
  }
  convertJsonPathToWorkingStack(e) {
    const r = [], u = e.match(/content\[(\d+)\]/g);
    if (!u) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let o = this.usj;
    return u.forEach((a, p) => {
      const h = /(\d+)/.exec(a);
      if (!h) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const f = parseInt(h[0], 10);
      if (r.push({ parent: o, index: f }), p + 1 < u.length) {
        if (typeof o == "string" || !o.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(o)}`);
        const d = o.content[f];
        if (typeof d == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(d)}`);
        o = d;
      }
    }), r;
  }
  // #endregion
  // #region Walk the node tree
  /**
   * Extract textual notes (aka, "footnotes") from a full USJ object.
   *
   * @returns An array of MarkerObjects representing all textual notes found in the USJ content.
   */
  findAllNotes() {
    var e;
    return Yn((e = this.usj) == null ? void 0 : e.content);
  }
  /**
   * Given the starting point of a tree to consider (`node`), find the rightmost MarkerObject from
   * the array of `content`. In the following example, this would be "J".
   *
   *         A        <- Consider "A" to be `node`
   *     / / | \ \
   *     B C D E F    <- Consider these to be MarkerObjects inside the `content` array owned by "A"
   *     |  / \  |
   *     G H   I J    <- Consider these to be MarkerObjects inside their parents `content` arrays
   *
   * If "F" did not exist in this example, then "E" would be returned. If "E" and "F" didn't exist,
   * then "I" would be returned.
   *
   * The general idea here is that we are looking for the MarkerObject in Usj that is immediately
   * adjacent to whatever `node`'s next sibling is in `parent`'s `content` array.
   */
  static findRightMostDescendantMarkerObject(e, r, u = []) {
    if (!e.content) return { node: e, parent: r };
    for (let o = e.content.length - 1; o >= 0; o--) {
      const a = e.content[o];
      if (typeof a == "object" && !u.includes(a.type))
        return a.content ? this.findRightMostDescendantMarkerObject(a, e, u) : { node: a, parent: e };
    }
    return { node: e, parent: r };
  }
  static findNextMatchingNodeUsingWorkingStack(e, r, u, o) {
    var p;
    let a = e;
    for (; a !== void 0; ) {
      const h = typeof a == "object" && u.includes(a.type);
      if (!h && o(a, r)) return a;
      if (!h && typeof a == "object" && (((p = a.content) == null ? void 0 : p.length) ?? 0) > 0)
        r.push({ parent: a, index: 0 }), [a] = a.content;
      else
        for (a = void 0; r.length > 0; ) {
          const f = r.pop();
          if (f && f.index + 1 < f.parent.content.length) {
            f.index += 1, r.push(f), a = f.parent.content[f.index];
            break;
          }
        }
    }
  }
  /**
   * Walk through a USJ node tree depth-first, left-to-right to find the first node that matches
   * criteria specified by `searchFunction` (i.e., the first node where `searchFunction` returns
   * `true`)
   */
  findNextMatchingNode(e, r, u) {
    const o = this.createWorkingStack(e);
    return ie.findNextMatchingNodeUsingWorkingStack(
      e,
      o,
      r,
      u
    );
  }
  // #endregion
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return ie.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion
  // #region USJ + node -> SerializedVerseRef + offset
  /** Find the chapter and verse that apply to a given USJ node */
  findVerseRefForNode(e, r, u = {
    chapterNum: void 0,
    verseNum: void 0,
    startingContentNode: void 0
  }) {
    if (u.verseNum !== void 0 && u.chapterNum !== void 0) return u;
    if (typeof e == "object" && e.number !== void 0) {
      const f = Number.parseInt(e.number, 10);
      if (e.type === Bt)
        return u.chapterNum = f, u.verseNum = u.verseNum ?? 0, u.startingContentNode = u.startingContentNode ?? e, u;
      e.type === Rt && !u.verseNum && (u.verseNum = f, u.startingContentNode = e);
    }
    if (!r.content)
      throw new Error(`"content" array not found: ${JSON.stringify(r)}`);
    let o = 0;
    for (let f = 0; f < r.content.length; f++)
      if (r.content[f] === e) {
        o = f;
        break;
      }
    let a = o - 1;
    for (; a >= 0 && typeof r.content[a] != "object"; )
      a -= 1;
    if (a < 0) {
      if (r.type === Ut)
        return u.chapterNum === void 0 && (u.chapterNum = 1, u.verseNum = 0, u.startingContentNode = void 0), u;
      const f = r, d = this.parentMap.get(f);
      if (!d) throw new Error(`No parent found for ${JSON.stringify(r)}`);
      return this.findVerseRefForNode(f, d, u);
    }
    const p = r.content[a], h = ie.findRightMostDescendantMarkerObject(
      p,
      r,
      je
    );
    return this.findVerseRefForNode(h.node, h.parent, u);
  }
  nodeToVerseRefAndOffset(e, r, u) {
    if (typeof r == "string" && u === void 0)
      throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
    let o;
    if (u === void 0 ? o = this.parentMap.get(r) : o = Array.isArray(u) ? this.parentMap.get(u) : u, o === void 0)
      throw new Error(`Cannot find parent for ${JSON.stringify(u)}`);
    const a = this.findVerseRefForNode(r, o);
    if (!a) return;
    if (!a.chapterNum)
      throw new Error(`Could not determine chapter number for ${JSON.stringify(r)}`);
    const p = {
      book: e,
      chapterNum: a.chapterNum,
      verseNum: a.verseNum ?? 0
    };
    let h = 0;
    return a.startingContentNode !== void 0 && this.findNextMatchingNode(a.startingContentNode, [], (f, d) => {
      var m, l;
      return f === r ? !0 : d.find((v) => je.includes(v.parent.type)) ? !1 : typeof f == "string" ? (h += f.length, !1) : f.type === Bt && f.number !== ((m = a.chapterNum) == null ? void 0 : m.toString()) || f.type === Rt && f.number !== ((l = a.verseNum) == null ? void 0 : l.toString()) ? (h = 0, !0) : !1;
    }), { verseRef: p, offset: h };
  }
  // #endregion
  // #region JSONPath -> SerializedVerseRef + offset
  jsonPathToVerseRefAndOffset(e, r) {
    const u = r ?? this.findBookId();
    if (!u) throw new Error("Not able to determine the book ID");
    const o = this.findSingleValue(e);
    if (!o) throw new Error(`No result found for JSONPath query: ${e}`);
    const a = this.findParent(e);
    if (!a) throw new Error(`Could not determine parent for ${e}`);
    const p = this.nodeToVerseRefAndOffset(u, o, a);
    if (!p)
      throw new Error(
        `Could not determine SerializedVerseRef that corresponds to ${e}`
      );
    return p;
  }
  // #endregion
  // #region SerializedVerseRef + offset -> Node + JSONPath + offset
  verseRefToUsjContentLocation(e, r = 0) {
    if (r < 0) throw new Error("offset must be >= 0");
    const u = this.findBookId() ?? e.book;
    if (!u) throw new Error("Not able to determine the book ID");
    if (u !== e.book)
      throw new Error(`Book IDs don't match: USJ=${u}, SerializedVerseRef=${e.book}`);
    const o = this.findChapterNode(e.chapterNum);
    if (o === void 0)
      throw new Error(`Could not find ${u} chapter ${e.chapterNum}`);
    let a = !1, p = "";
    const h = e.verse ?? e.verseNum.toString(), f = this.findNextMatchingNode(
      o,
      je,
      (v, C) => v === o ? e.verseNum === 0 ? (p = ie.convertWorkingStackToJsonPath(C), !0) : !1 : typeof v != "object" ? !1 : v.type === Bt ? (a = !0, !0) : v.type === Rt && v.number !== void 0 && v.number === h ? (p = ie.convertWorkingStackToJsonPath(C), !0) : !1
    );
    if (a || f === void 0 || typeof f == "string")
      throw new Error(`Verse ${h} not found in ${u} ${e.chapterNum}`);
    if (r === 0) return { node: f, offset: 0, jsonPath: p };
    let d = 0, m = 0, l;
    return this.findNextMatchingNode(
      f,
      je,
      (v, C) => {
        if (v === f) return !1;
        if (typeof v == "string") {
          if (d += v.length, d > r)
            return p = ie.convertWorkingStackToJsonPath(C), m = r - d + v.length, l = v, !0;
        } else if (v.type === Bt || v.type === Rt) return !0;
        return !1;
      }
    ), { node: l ?? f, offset: m, jsonPath: p };
  }
  verseRefToNextTextLocation(e) {
    const r = this.verseRefToUsjContentLocation(e), u = this.findNextLocationOfMatchingText(
      r,
      ""
    );
    if (!u)
      throw new Error(
        `Could not find next text location after verse ${JSON.stringify(e)} at location ${r.jsonPath}`
      );
    return u;
  }
  // #endregion
  // #region Search for text from a node + JSONPath + offset
  findNextLocationOfMatchingText(e, r, u = 1e3) {
    let o = "", a = 0, p = 0, h = -1;
    const f = this.convertJsonPathToWorkingStack(e.jsonPath), d = {
      ...f[f.length - 1]
    };
    if (ie.findNextMatchingNodeUsingWorkingStack(
      e.node,
      f,
      je,
      (C, b) => {
        if (typeof C != "string") return !1;
        let y = C;
        const q = b[b.length - 1];
        ie.areStackItemsShallowEqual(q, d) && (y = C.substring(e.offset), p += e.offset), a += y.length, o = `${o}${y}`;
        const B = o.indexOf(r);
        return B < 0 ? (p += o.length, o.length > r.length && (o = o.substring(o.length - r.length)), p -= o.length, a > u) : (h = p + B, !0);
      }
    ), h < 0) return;
    a = 0;
    let m = 0, l = [];
    const v = ie.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      je,
      (C, b) => typeof C != "string" || (a += C.length, a < h + 1) ? !1 : (m = h - a + C.length, l = b, !0)
    );
    if (!v) throw new Error("Internal error: inconsistent search results");
    return {
      node: v,
      offset: m,
      jsonPath: ie.convertWorkingStackToJsonPath(l)
    };
  }
  search(e) {
    const r = [];
    if (this.usj.content.length === 0) return r;
    const u = {
      node: this.usj.content[0],
      jsonPath: "$.content[0]"
    }, o = [], a = new fn();
    let p = 0, h = u.node;
    for (; h !== void 0; )
      h = ie.findNextMatchingNodeUsingWorkingStack(
        u.node,
        this.convertJsonPathToWorkingStack(u.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (m, l) => (typeof m != "string" || (o.push(m), a.set(p, {
          node: m,
          offset: 0,
          jsonPath: ie.convertWorkingStackToJsonPath(l)
        }), p += m.length), !1)
      );
    const f = o.join("");
    let d = e.exec(f);
    for (; d; ) {
      if (d[0].length > 0) {
        if (d.index < 0 || d.index >= f.length)
          throw new Error(`Match index out of bounds: ${d.index}`);
        const m = a.findClosestLessThanOrEqual(d.index);
        if (!m)
          throw new Error(`Internal error: no closest node found for index ${d.index}`);
        const l = {
          node: m.value.node,
          offset: d.index - m.key,
          jsonPath: m.value.jsonPath
        };
        r.push({ text: d[0], location: l });
      }
      if (!e.global) break;
      d = e.exec(f);
    }
    return r;
  }
  // #endregion
  // #region Extract text from a node + JSONPath + offset
  extractText(e, r) {
    let u = "", o = e.offset, a = 0;
    return ie.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      je,
      (p) => {
        if (typeof p != "string") return !1;
        if (o >= p.length)
          return o -= p.length, !1;
        let h = p;
        if (o > 0 && (h = h.substring(o), o = 0), a + h.length < r)
          return a += h.length, u = `${u}${h}`, !1;
        const f = r - a;
        return u = `${u}${h.substring(0, f - 1)}`, !0;
      }
    ), u;
  }
  extractTextBetweenPoints(e, r, u = 100) {
    let o = "";
    return ie.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      je,
      (a, p) => a === r.node && (typeof a == "object" || r.jsonPath === ie.convertWorkingStackToJsonPath(p)) ? !0 : typeof a != "string" ? !1 : (o = `${o}${a}`, o.length > u && (o = o.substring(0, u)), o.length >= u)
    ), o;
  }
  // #endregion
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, r) {
    let u = 0;
    for (let o = e.length - 1; o >= 0; o--) {
      const a = e[o];
      r(a) ? (e.splice(o, 1), u += 1) : typeof a != "string" && a.content && (u += this.removeContentNodesFromArray(a.content, r));
    }
    return u;
  }
  removeContentNodes(e) {
    const r = ie.removeContentNodesFromArray(this.usj.content, e);
    return this.usjChanged(), r;
  }
  // #endregion
}
export {
  Qt as AsyncVariable,
  Bt as CHAPTER_TYPE,
  Ju as Collator,
  en as DateTimeFormat,
  on as DocumentCombiner,
  ri as EventRollingTimeCounter,
  Fn as FIRST_SCR_BOOK_NUM,
  $n as FIRST_SCR_CHAPTER_NUM,
  jn as FIRST_SCR_VERSE_NUM,
  qn as LAST_SCR_BOOK_NUM,
  Ui as MODIFIER_KEYS,
  sn as Mutex,
  ni as MutexMap,
  ui as NonValidatingDocumentCombiner,
  cn as NumberFormat,
  xt as PLATFORM_ERROR_VERSION,
  tn as PlatformEventEmitter,
  ii as PromiseChainingMap,
  zn as Section,
  fn as SortedNumberMap,
  oi as SortedSet,
  ju as THEME_STYLE_ELEMENT_ID,
  ai as UnsubscriberAsyncList,
  ie as UsjReaderWriter,
  Rt as VERSE_TYPE,
  _i as aggregateUnsubscriberAsyncs,
  Ri as aggregateUnsubscribers,
  zi as applyThemeStylesheet,
  Bi as areUsjContentsEqualExceptWhitespace,
  Mt as at,
  gt as charAt,
  fi as codePointAt,
  Oi as compareScrRefs,
  Zu as createSyncProxyForAsyncObject,
  Yu as debounce,
  wt as deepClone,
  Mu as deepEqual,
  Ni as defaultScrRef,
  Ru as deserialize,
  xn as endsWith,
  jr as ensureArray,
  Di as escapeStringRegexp,
  Vi as expandThemeContribution,
  $i as formatBytes,
  hi as formatReplacementString,
  Bn as formatReplacementStringToArray,
  xi as formatScrRef,
  ji as formatTimeSpan,
  Qu as getAllObjectFunctionNames,
  Un as getChaptersForBook,
  qi as getCurrentLocale,
  Gr as getDefaultCallerSequence,
  xr as getErrorMessage,
  Pi as getFormatCallerFunction,
  Vn as getLocalizeKeyForScrollGroupId,
  Ii as getLocalizeKeysForScrollGroupIds,
  wi as getLocalizedIdFromBookNumber,
  Xn as getNthCaller,
  Li as getPaneSizeLimits,
  Mi as getSectionForBook,
  Vu as getStylesheetForTheme,
  Ku as groupBy,
  Fi as htmlEncode,
  Rn as includes,
  Ot as indexOf,
  ei as isErrorMessageAboutParatextBlockingInternetAccess,
  ti as isErrorMessageAboutRegistryAuthFailure,
  Ei as isLocalizeKey,
  ci as isPlatformError,
  ki as isSerializable,
  Me as isString,
  Bu as isSubset,
  mt as isWhiteSpace,
  _n as lastIndexOf,
  Fu as localizedStringsDocumentSchema,
  qu as menuDocumentSchema,
  Xu as newGuid,
  si as newPlatformError,
  pi as normalize,
  Dr as normalizeScriptureSpaces,
  yi as offsetBook,
  Ci as offsetChapter,
  Ti as offsetVerse,
  di as ordinalCompare,
  mi as padEnd,
  gi as padStart,
  Lu as projectSettingsDocumentSchema,
  Si as scrRefToBBBCCC,
  gr as scrRefToBBBCCCVVV,
  Ir as serialize,
  ku as settingsDocumentSchema,
  dr as slice,
  mr as split,
  Ur as startsWith,
  fe as stringLength,
  ut as substring,
  $u as themeDocumentSchema,
  Pn as toArray,
  bi as toKebabCase,
  Ai as transformAndEnsureRegExpArray,
  vi as transformAndEnsureRegExpRegExpArray,
  un as wait,
  Wu as waitForDuration
};
//# sourceMappingURL=index.js.map
