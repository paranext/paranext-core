var Jr = Object.defineProperty;
var Xr = (t, e, n) => e in t ? Jr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var W = (t, e, n) => Xr(t, typeof e != "symbol" ? e + "" : e, n);
import { Mutex as Yr } from "async-mutex";
import { JSONPath as Wt } from "jsonpath-plus";
class Pu {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, n = 1e4) {
    W(this, "variableName");
    W(this, "promiseToValue");
    W(this, "resolver");
    W(this, "rejecter");
    this.variableName = e, this.promiseToValue = new Promise((i, o) => {
      this.resolver = i, this.rejecter = o;
    }), n > 0 && setTimeout(() => {
      this.rejecter && (this.rejecter(`Timeout reached when waiting for ${this.variableName} to settle`), this.complete());
    }, n), Object.seal(this);
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
   *   or rejected. Defaults to `false`
   */
  resolveToValue(e, n = !1) {
    if (this.resolver)
      console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
    else {
      if (n) throw Error(`${this.variableName} was already settled`);
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
  rejectWithReason(e, n = !1) {
    if (this.rejecter)
      console.debug(`${this.variableName} is being rejected now`), this.rejecter(e), this.complete();
    else {
      if (n) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }
  /** Prevent any further updates to this variable */
  complete() {
    this.resolver = void 0, this.rejecter = void 0, Object.freeze(this);
  }
}
class Lu {
  constructor(e, n) {
    W(this, "collator");
    this.collator = new Intl.Collator(e, n);
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
  compare(e, n) {
    return this.collator.compare(e, n);
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
class Wr {
  constructor(e, n) {
    W(this, "dateTimeFormatter");
    this.dateTimeFormatter = new Intl.DateTimeFormat(e, n);
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
  formatRange(e, n) {
    return this.dateTimeFormatter.formatRange(e, n);
  }
  /**
   * Returns an array of locale-specific tokens representing each part of the formatted date range
   * produced by this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns Array of DateTimeRangeFormatPart objects
   */
  formatRangeToParts(e, n) {
    return this.dateTimeFormatter.formatRangeToParts(e, n);
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
class Kr {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    W(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    W(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    W(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    W(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    W(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    W(this, "emit", (e) => {
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
        if (!this.subscriptions) return !1;
        const n = this.subscriptions.indexOf(e);
        return n < 0 ? !1 : (this.subscriptions.splice(n, 1), !0);
      };
    }), this.lazyEvent;
  }
  /**
   * Function that runs the subscriptions for the event. Added here so children can override emit
   * and still call the base functionality. See NetworkEventEmitter.emit for example
   */
  emitFn(e) {
    this.assertNotDisposed(), [...this.subscriptions ?? []].forEach((i) => i(e));
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
function Fu() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function Be(t) {
  return typeof t == "string" || t instanceof String;
}
function wt(t) {
  return JSON.parse(JSON.stringify(t));
}
function ku(t, e = 300) {
  if (Be(t)) throw new Error("Tried to debounce a string! Could be XSS");
  let n;
  return (...i) => {
    clearTimeout(n), n = setTimeout(() => t(...i), e);
  };
}
function qu(t, e, n) {
  const i = /* @__PURE__ */ new Map();
  return t.forEach((o) => {
    const a = e(o), h = i.get(a), p = n ? n(o, a) : o;
    h ? h.push(p) : i.set(a, [p]);
  }), i;
}
function Qr(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function Zr(t) {
  if (Qr(t)) return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function Or(t) {
  return Zr(t).message;
}
function en(t) {
  return new Promise((e) => setTimeout(e, t));
}
function Uu(t, e) {
  const n = en(e).then(() => {
  });
  return Promise.any([n, t()]);
}
function ju(t, e = "obj") {
  const n = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((o) => {
    try {
      typeof t[o] == "function" && n.add(o);
    } catch {
    }
  });
  let i = Object.getPrototypeOf(t);
  for (; i && Object.getPrototypeOf(i); )
    Object.getOwnPropertyNames(i).forEach((o) => {
      try {
        typeof t[o] == "function" && n.add(o);
      } catch {
      }
    }), i = Object.getPrototypeOf(i);
  return n;
}
function $u(t, e = {}) {
  return new Proxy(e, {
    get(n, i) {
      return i in n ? n[i] : async (...o) => (await t())[i](...o);
    }
  });
}
function Vu(t) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return Be(t) ? t.includes(e) : Or(t).includes(e);
}
function Gu(t) {
  const e = "401 Unauthorized error while getting shared projects.", n = "User registration is not valid. Cannot retrieve resources from DBL.", i = Be(t) ? t : Or(t);
  return i.includes(e) || i.includes(n);
}
class tn {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, n) {
    W(this, "baseDocument");
    W(this, "contributions", /* @__PURE__ */ new Map());
    W(this, "latestOutput");
    W(this, "options");
    W(this, "onDidRebuildEmitter", new Kr());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    W(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = n, this.updateBaseDocument(e);
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
  addOrUpdateContribution(e, n) {
    this.validateContribution(e, n);
    const i = this.contributions.get(e);
    let o = this.options.copyDocuments && n ? wt(n) : n;
    o = this.transformContributionAfterValidation(e, o), this.contributions.set(e, o);
    try {
      return this.rebuild();
    } catch (a) {
      throw i ? this.contributions.set(e, i) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${a}`);
    }
  }
  /**
   * Delete one of the contribution documents for the composition process
   *
   * @param documentName Name of the contributed document to delete
   * @returns Recalculated output document given the remaining other documents
   */
  deleteContribution(e) {
    const n = this.contributions.get(e);
    if (!n) throw new Error(`${e} does not exist`);
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (i) {
      throw this.contributions.set(e, n), new Error(`Error when deleting the document named ${e}: ${i}`);
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
    e.forEach(([n]) => this.contributions.delete(n));
    try {
      return this.rebuild();
    } catch (n) {
      throw e.forEach(
        ([i, o]) => this.contributions.set(i, o)
      ), new Error(`Error when deleting all contributions: ${n}`);
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
      let n = wt(this.baseDocument);
      return n = this.transformFinalOutputBeforeValidation(n), this.validateOutput(n), this.latestOutput = n, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((n) => {
      e = rn(
        e,
        n,
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
  transformContributionAfterValidation(e, n) {
    return n;
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
  validateContribution(e, n) {
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
function Kt(...t) {
  let e = !0;
  return t.forEach((n) => {
    (!n || typeof n != "object" || Array.isArray(n)) && (e = !1);
  }), e;
}
function Qt(...t) {
  let e = !0;
  return t.forEach((n) => {
    (!n || typeof n != "object" || !Array.isArray(n)) && (e = !1);
  }), e;
}
function rn(t, e, n) {
  const i = wt(t);
  return e ? Ir(i, wt(e), n) : i;
}
function Ir(t, e, n) {
  if (!e) return t;
  if (Kt(t, e)) {
    const i = t, o = e;
    Object.keys(o).forEach((a) => {
      if (Object.hasOwn(i, a)) {
        if (Kt(i[a], o[a]))
          i[a] = Ir(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            i[a],
            o[a],
            n
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (Qt(i[a], o[a]))
          i[a] = i[a].concat(
            o[a]
          );
        else if (!n)
          throw new Error(`Cannot merge objects: key "${a}" already exists in the target object`);
      } else
        i[a] = o[a];
    });
  } else Qt(t, e) && t.push(...e);
  return t;
}
class zu {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(e) {
    /** The ring buffer to store times */
    W(this, "ringBuffer");
    /** The size of the ring buffer */
    W(this, "bufferSize");
    /** The next location where a time will be written */
    W(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    W(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    W(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    W(this, "totalInstanceCount");
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
class nn extends Yr {
}
class Hu {
  constructor() {
    W(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(e) {
    let n = this.mutexesByID.get(e);
    return n || (n = new nn(), this.mutexesByID.set(e, n), n);
  }
}
class Ju extends tn {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, n) {
    super(e, n);
  }
  get output() {
    return this.latestOutput;
  }
}
class un {
  constructor(e, n) {
    W(this, "numberFormatter");
    this.numberFormatter = new Intl.NumberFormat(e, n);
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
  formatRange(e, n) {
    return this.numberFormatter.formatRange(e, n);
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
  formatRangeToParts(e, n) {
    return this.numberFormatter.formatRangeToParts(e, n);
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
const on = Promise.resolve();
class Xu {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    W(this, "map", /* @__PURE__ */ new Map());
    W(this, "logger");
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
  addPromiseFunction(e, n) {
    const i = this.map.get(e);
    this.map.set(e, i ? i.then(n) : n()), this.cleanupPromiseChain(e);
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
    const n = this.map.get(e);
    if (!n) return;
    const i = { promise: on }, o = n.catch((a) => this.logger.warn(`Error in promise for ${e}: ${a.message}`)).finally(() => {
      this.map.get(e) === i.promise && this.map.delete(e);
    });
    i.promise = o, this.map.set(e, o);
  }
}
class Yu {
  constructor(e = "Anonymous") {
    W(this, "unsubscribers", /* @__PURE__ */ new Set());
    this.name = e;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...e) {
    e.forEach((n) => {
      "dispose" in n ? this.unsubscribers.add(n.dispose.bind(n)) : this.unsubscribers.add(n);
    });
  }
  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * @returns `true` if all unsubscribers succeeded, `false` otherwise.
   */
  async runAllUnsubscribers() {
    const e = [...this.unsubscribers].map((i) => i()), n = await Promise.all(e);
    return this.unsubscribers.clear(), n.every((i, o) => (i || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${o} failed!`), i));
  }
}
const It = 1;
function Wu(t) {
  if (!t) return { message: "", platformErrorVersion: It };
  if (Be(t)) return { message: t, platformErrorVersion: It };
  if (typeof t == "object" && "message" in t && typeof t.message == "string") {
    const e = {
      message: t.message,
      platformErrorVersion: It
    };
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)), Object.defineProperty(e, "message", { enumerable: !0 }), "stack" in e && Object.defineProperty(e, "stack", { enumerable: !0 }), "cause" in e && Object.defineProperty(e, "cause", { enumerable: !0 }), e;
  }
  return { cause: t, message: "", platformErrorVersion: It };
}
function Ku(t) {
  return !!t && typeof t == "object" && "platformErrorVersion" in t;
}
var an = Object.defineProperty, sn = (t, e, n) => e in t ? an(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, z = (t, e, n) => sn(t, typeof e != "symbol" ? e + "" : e, n);
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
], $t = [
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
], xr = [
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
], Zt = Dn();
function gt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in Zt ? Zt[t] : 0;
}
function Vt(t) {
  return gt(t) > 0;
}
function cn(t) {
  const e = typeof t == "string" ? gt(t) : t;
  return e >= 40 && e <= 66;
}
function ln(t) {
  return (typeof t == "string" ? gt(t) : t) <= 39;
}
function Br(t) {
  return t <= 66;
}
function fn(t) {
  const e = typeof t == "string" ? gt(t) : t;
  return _r(e) && !Br(e);
}
function* pn() {
  for (let t = 1; t <= it.length; t++) yield t;
}
const hn = 1, Mr = it.length;
function dn() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Gt(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= it.length ? e : it[n];
}
function Rr(t) {
  return t <= 0 || t > Mr ? "******" : xr[t - 1];
}
function mn(t) {
  return Rr(gt(t));
}
function _r(t) {
  const e = typeof t == "number" ? Gt(t) : t;
  return Vt(e) && !$t.includes(e);
}
function En(t) {
  const e = typeof t == "number" ? Gt(t) : t;
  return Vt(e) && $t.includes(e);
}
function gn(t) {
  return xr[t - 1].includes("*obsolete*");
}
function Dn() {
  const t = {};
  for (let e = 0; e < it.length; e++)
    t[it[e]] = e + 1;
  return t;
}
const be = {
  allBookIds: it,
  nonCanonicalIds: $t,
  bookIdToNumber: gt,
  isBookIdValid: Vt,
  isBookNT: cn,
  isBookOT: ln,
  isBookOTNT: Br,
  isBookDC: fn,
  allBookNumbers: pn,
  firstBook: hn,
  lastBook: Mr,
  extraBooks: dn,
  bookNumberToId: Gt,
  bookNumberToEnglishName: Rr,
  bookIdToEnglishName: mn,
  isCanonical: _r,
  isExtraMaterial: En,
  isObsolete: gn
};
var Le = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(Le || {});
const Te = class {
  // private versInfo: Versification;
  constructor(e) {
    if (z(this, "name"), z(this, "fullPath"), z(this, "isPresent"), z(this, "hasVerseSegments"), z(this, "isCustomized"), z(this, "baseVersification"), z(this, "scriptureBooks"), z(this, "_type"), e == null)
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
z(Te, "Original", new Te(Le.Original)), z(Te, "Septuagint", new Te(Le.Septuagint)), z(Te, "Vulgate", new Te(Le.Vulgate)), z(Te, "English", new Te(Le.English)), z(Te, "RussianProtestant", new Te(Le.RussianProtestant)), z(Te, "RussianOrthodox", new Te(Le.RussianOrthodox));
let nt = Te;
function er(t, e) {
  const n = e[0];
  for (let i = 1; i < e.length; i++)
    t = t.split(e[i]).join(n);
  return t.split(n);
}
var Pr = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Pr || {});
const De = class Y {
  constructor(e, n, i, o) {
    if (z(this, "firstChapter"), z(this, "lastChapter"), z(this, "lastVerse"), z(this, "hasSegmentsDefined"), z(this, "text"), z(this, "BBBCCCVVVS"), z(this, "longHashCode"), z(this, "versification"), z(this, "rtlMark", "‏"), z(this, "_bookNum", 0), z(this, "_chapterNum", 0), z(this, "_verseNum", 0), z(this, "_verse"), i == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, h = n != null && n instanceof nt ? n : void 0;
        this.setEmpty(h), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof nt ? n : void 0;
        this.setEmpty(a), this._verseNum = e % Y.chapterDigitShifter, this._chapterNum = Math.floor(
          e % Y.bookDigitShifter / Y.chapterDigitShifter
        ), this._bookNum = Math.floor(e / Y.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof Y) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null) return;
          const a = e instanceof nt ? e : Y.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && i != null)
      if (typeof e == "string" && typeof n == "string" && typeof i == "string")
        this.setEmpty(o), this.updateInternal(e, n, i);
      else if (typeof e == "number" && typeof n == "number" && typeof i == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = i, this.versification = o ?? Y.defaultVersification;
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
    let n;
    try {
      return n = new Y(e), { success: !0, verseRef: n };
    } catch (i) {
      if (i instanceof Ct)
        return n = new Y(), { success: !1, verseRef: n };
      throw i;
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
  static getBBBCCCVVV(e, n, i) {
    return e % Y.bcvMaxValue * Y.bookDigitShifter + (n >= 0 ? n % Y.bcvMaxValue * Y.chapterDigitShifter : 0) + (i >= 0 ? i % Y.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: i, verseNum: o, verse: a, versificationStr: h } = e, p = a || o.toString();
    let f;
    return h && (f = new nt(h)), n ? new Y(n, i.toString(), p, f) : new Y();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let n;
    if (!e)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let i;
    for (let o = 0; o < e.length; o++) {
      if (i = e[o], i < "0" || i > "9")
        return o === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +i - 0, n > Y.bcvMaxValue)
        return n = -1, { success: !1, vNum: n };
    }
    return { success: !0, vNum: n };
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
    return this._verse != null && (this._verse.includes(Y.verseRangeSeparator) || this._verse.includes(Y.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return be.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = be.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const n = +e;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: n, vNum: i } = Y.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = i, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = Y.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > be.lastBook)
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
    return this.validateVerse(Y.verseRangeSeparators, Y.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return Y.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return Y.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const h = +a[1].trim();
          this.versification = new nt(Le[h]);
        } catch {
          throw new Ct("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Ct("Invalid reference : " + e);
    const i = n[1].split(":"), o = +i[0];
    if (i.length !== 2 || be.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !Y.isVerseParseable(i[1]))
      throw new Ct("Invalid reference : " + e);
    this.updateInternal(n[0], i[0], i[1]);
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
    return new Y(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    (e === "" || e === this.verseNum.toString()) && (e = void 0);
    const n = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
    return e || delete n.verse, n;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof Y ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = Y.verseRangeSeparators, i = Y.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = er(this._verse, i);
    for (const h of a.map((p) => er(p, n))) {
      const p = this.clone();
      p.verse = h[0];
      const f = p.verseNum;
      if (o.push(p), h.length > 1) {
        const m = this.clone();
        if (m.verse = h[1], !e)
          for (let E = f + 1; E < m.verseNum; E++) {
            const l = new Y(
              this._bookNum,
              this._chapterNum,
              E,
              this.versification
            );
            this.isExcluded || o.push(l);
          }
        o.push(m);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let i = 0;
    for (const o of this.allVerses(!0, e, n)) {
      const a = o.internalValid;
      if (a !== 0)
        return a;
      const h = o.BBBCCCVVV;
      if (i > h)
        return 3;
      if (i === h)
        return 4;
      i = h;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > be.lastBook ? 2 : (be.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = Y.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, i) {
    this.bookNum = be.bookIdToNumber(e), this.chapter = n, this.verse = i;
  }
};
z(De, "defaultVersification", nt.English), z(De, "verseRangeSeparator", "-"), z(De, "verseSequenceIndicator", ","), z(De, "verseRangeSeparators", [De.verseRangeSeparator]), z(De, "verseSequenceIndicators", [De.verseSequenceIndicator]), z(De, "chapterDigitShifter", 1e3), z(De, "bookDigitShifter", De.chapterDigitShifter * De.chapterDigitShifter), z(De, "bcvMaxValue", De.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
z(De, "ValidStatusType", Pr);
let Lr = De;
class Ct extends Error {
}
var H = {}, se = {}, tr;
function Dt() {
  if (tr) return se;
  tr = 1;
  function t(R, k, $) {
    if ($ === void 0 && ($ = Array.prototype), R && typeof $.find == "function")
      return $.find.call(R, k);
    for (var ne = 0; ne < R.length; ne++)
      if (n(R, ne)) {
        var le = R[ne];
        if (k.call(void 0, le, ne, R))
          return le;
      }
  }
  function e(R, k) {
    return k === void 0 && (k = Object), k && typeof k.getOwnPropertyDescriptors == "function" && (R = k.create(null, k.getOwnPropertyDescriptors(R))), k && typeof k.freeze == "function" ? k.freeze(R) : R;
  }
  function n(R, k) {
    return Object.prototype.hasOwnProperty.call(R, k);
  }
  function i(R, k) {
    if (R === null || typeof R != "object")
      throw new TypeError("target is not an object");
    for (var $ in k)
      n(k, $) && (R[$] = k[$]);
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
    return n(o, R.toLowerCase());
  }
  var h = e({
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
    return n(h, R.toLowerCase());
  }
  var f = e({
    script: !1,
    style: !1,
    textarea: !0,
    title: !0
  });
  function m(R) {
    var k = R.toLowerCase();
    return n(f, k) && !f[k];
  }
  function E(R) {
    var k = R.toLowerCase();
    return n(f, k) && f[k];
  }
  function l(R) {
    return R === O.HTML;
  }
  function v(R) {
    return l(R) || R === O.XML_XHTML_APPLICATION;
  }
  var O = e({
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
  }), b = Object.keys(O).map(function(R) {
    return O[R];
  });
  function C(R) {
    return b.indexOf(R) > -1;
  }
  var j = e({
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
  return se.assign = i, se.find = t, se.freeze = e, se.HTML_BOOLEAN_ATTRIBUTES = o, se.HTML_RAW_TEXT_ELEMENTS = f, se.HTML_VOID_ELEMENTS = h, se.hasDefaultHTMLNamespace = v, se.hasOwn = n, se.isHTMLBooleanAttribute = a, se.isHTMLRawTextElement = m, se.isHTMLEscapableRawTextElement = E, se.isHTMLMimeType = l, se.isHTMLVoidElement = p, se.isValidMimeType = C, se.MIME_TYPE = O, se.NAMESPACE = j, se;
}
var dt = {}, rr;
function _t() {
  if (rr) return dt;
  rr = 1;
  var t = Dt();
  function e(v, O) {
    v.prototype = Object.create(Error.prototype, {
      constructor: { value: v },
      name: { value: v.name, enumerable: !0, writable: O }
    });
  }
  var n = t.freeze({
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
  }), i = Object.keys(n);
  function o(v) {
    return typeof v == "number" && v >= 1 && v <= 25;
  }
  function a(v) {
    return typeof v == "string" && v.substring(v.length - n.Error.length) === n.Error;
  }
  function h(v, O) {
    o(v) ? (this.name = i[v], this.message = O || "") : (this.message = v, this.name = a(O) ? O : n.Error), Error.captureStackTrace && Error.captureStackTrace(this, h);
  }
  e(h, !0), Object.defineProperties(h.prototype, {
    code: {
      enumerable: !0,
      get: function() {
        var v = i.indexOf(this.name);
        return o(v) ? v : 0;
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
  }, f = Object.entries(p), m = 0; m < f.length; m++) {
    var E = f[m][0];
    h[E] = f[m][1];
  }
  function l(v, O) {
    this.message = v, this.locator = O, Error.captureStackTrace && Error.captureStackTrace(this, l);
  }
  return e(l), dt.DOMException = h, dt.DOMExceptionName = n, dt.ExceptionCode = p, dt.ParseError = l, dt;
}
var re = {}, U = {}, nr;
function Fr() {
  if (nr) return U;
  nr = 1;
  function t(ue) {
    try {
      typeof ue != "function" && (ue = RegExp);
      var he = new ue("𝌆", "u").exec("𝌆");
      return !!he && he[0].length === 2;
    } catch {
    }
    return !1;
  }
  var e = t();
  function n(ue) {
    if (ue.source[0] !== "[")
      throw new Error(ue + " can not be used with chars");
    return ue.source.slice(1, ue.source.lastIndexOf("]"));
  }
  function i(ue, he) {
    if (ue.source[0] !== "[")
      throw new Error("/" + ue.source + "/ can not be used with chars_without");
    if (!he || typeof he != "string")
      throw new Error(JSON.stringify(he) + " is not a valid search");
    if (ue.source.indexOf(he) === -1)
      throw new Error('"' + he + '" is not is /' + ue.source + "/");
    if (he === "-" && ue.source.indexOf(he) !== 1)
      throw new Error('"' + he + '" is not at the first postion of /' + ue.source + "/");
    return new RegExp(ue.source.replace(he, ""), e ? "u" : "");
  }
  function o(ue) {
    var he = this;
    return new RegExp(
      Array.prototype.slice.call(arguments).map(function(ke) {
        var qe = typeof ke == "string";
        if (qe && he === void 0 && ke === "|")
          throw new Error("use regg instead of reg to wrap expressions with `|`!");
        return qe ? ke : ke.source;
      }).join(""),
      e ? "mu" : "m"
    );
  }
  function a(ue) {
    if (arguments.length === 0)
      throw new Error("no parameters provided");
    return o.apply(a, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var h = "�", p = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  e && (p = o("[", n(p), "\\u{10000}-\\u{10FFFF}", "]"));
  var f = /[\x20\x09\x0D\x0A]/, m = n(f), E = o(f, "+"), l = o(f, "*"), v = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  e && (v = o("[", n(v), "\\u{10000}-\\u{10FFFF}", "]"));
  var O = n(v), b = o("[", O, n(/[-.0-9\xB7]/), n(/[\u0300-\u036F\u203F-\u2040]/), "]"), C = o(v, b, "*"), j = o(b, "+"), R = o("&", C, ";"), k = a(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), $ = a(R, "|", k), ne = o("%", C, ";"), le = a(
    o('"', a(/[^%&"]/, "|", ne, "|", $), "*", '"'),
    "|",
    o("'", a(/[^%&']/, "|", ne, "|", $), "*", "'")
  ), g = a('"', a(/[^<&"]/, "|", $), "*", '"', "|", "'", a(/[^<&']/, "|", $), "*", "'"), x = i(v, ":"), F = i(b, ":"), G = o(x, F, "*"), K = o(G, a(":", G), "?"), ee = o("^", K, "$"), Ie = o("(", K, ")"), te = a(/"[^"]*"|'[^']*'/), Me = o(/^<\?/, "(", C, ")", a(E, "(", p, "*?)"), "?", /\?>/), d = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, N = a('"', d, '*"', "|", "'", i(d, "'"), "*'"), w = "<!--", y = "-->", B = o(w, a(i(p, "-"), "|", o("-", i(p, "-"))), "*", y), A = "#PCDATA", M = a(
    o(/\(/, l, A, a(l, /\|/, l, K), "*", l, /\)\*/),
    "|",
    o(/\(/, l, A, l, /\)/)
  ), J = /[?*+]?/, _ = o(
    /\([^>]+\)/,
    J
    /*regg(choice, '|', seq), _children_quantity*/
  ), T = a("EMPTY", "|", "ANY", "|", M, "|", _), I = "<!ELEMENT", L = o(I, E, a(K, "|", ne), E, a(T, "|", ne), l, ">"), V = o("NOTATION", E, /\(/, l, C, a(l, /\|/, l, C), "*", l, /\)/), fe = o(/\(/, l, j, a(l, /\|/, l, j), "*", l, /\)/), we = a(V, "|", fe), ve = a(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", we), ie = a(/#REQUIRED|#IMPLIED/, "|", a(a("#FIXED", E), "?", g)), P = a(E, C, E, ve, E, ie), $e = "<!ATTLIST", Re = o($e, E, C, P, "*", l, ">"), pe = "about:legacy-compat", Ve = a('"' + pe + '"', "|", "'" + pe + "'"), _e = "SYSTEM", Se = "PUBLIC", Fe = a(a(_e, E, te), "|", a(Se, E, N, E, te)), He = o(
    "^",
    a(
      a(_e, E, "(?<SystemLiteralOnly>", te, ")"),
      "|",
      a(Se, E, "(?<PubidLiteral>", N, ")", E, "(?<SystemLiteral>", te, ")")
    )
  ), Je = a(E, "NDATA", E, C), Ce = a(le, "|", a(Fe, Je, "?")), Q = "<!ENTITY", Ge = o(Q, E, C, E, Ce, l, ">"), oe = a(le, "|", Fe), Xe = o(Q, E, "%", E, C, E, oe, l, ">"), vt = a(Ge, "|", Xe), Ye = o(Se, E, N), We = o("<!NOTATION", E, C, E, a(Fe, "|", Ye), l, ">"), q = o(l, "=", l), Z = /1[.]\d+/, Ae = o(E, "version", q, a("'", Z, "'", "|", '"', Z, '"')), Ne = /[A-Za-z][-A-Za-z0-9._]*/, Ke = a(E, "encoding", q, a('"', Ne, '"', "|", "'", Ne, "'")), st = a(E, "standalone", q, a("'", a("yes", "|", "no"), "'", "|", '"', a("yes", "|", "no"), '"')), ct = o(/^<\?xml/, Ae, Ke, "?", st, "?", l, /\?>/), lt = "<!DOCTYPE", At = "<![CDATA[", Nt = "]]>", ft = /<!\[CDATA\[/, Qe = /\]\]>/, pt = o(p, "*?", Qe), Ot = o(ft, pt);
  return U.chars = n, U.chars_without = i, U.detectUnicodeSupport = t, U.reg = o, U.regg = a, U.ABOUT_LEGACY_COMPAT = pe, U.ABOUT_LEGACY_COMPAT_SystemLiteral = Ve, U.AttlistDecl = Re, U.CDATA_START = At, U.CDATA_END = Nt, U.CDSect = Ot, U.Char = p, U.Comment = B, U.COMMENT_START = w, U.COMMENT_END = y, U.DOCTYPE_DECL_START = lt, U.elementdecl = L, U.EntityDecl = vt, U.EntityValue = le, U.ExternalID = Fe, U.ExternalID_match = He, U.Name = C, U.NotationDecl = We, U.Reference = $, U.PEReference = ne, U.PI = Me, U.PUBLIC = Se, U.PubidLiteral = N, U.QName = K, U.QName_exact = ee, U.QName_group = Ie, U.S = E, U.SChar_s = m, U.S_OPT = l, U.SYSTEM = _e, U.SystemLiteral = te, U.UNICODE_REPLACEMENT_CHARACTER = h, U.UNICODE_SUPPORT = e, U.XMLDecl = ct, U;
}
var ur;
function kr() {
  if (ur) return re;
  ur = 1;
  var t = Dt(), e = t.find, n = t.hasDefaultHTMLNamespace, i = t.hasOwn, o = t.isHTMLMimeType, a = t.isHTMLRawTextElement, h = t.isHTMLVoidElement, p = t.MIME_TYPE, f = t.NAMESPACE, m = Symbol(), E = _t(), l = E.DOMException, v = E.DOMExceptionName, O = Fr();
  function b(r) {
    if (r !== m)
      throw new TypeError("Illegal constructor");
  }
  function C(r) {
    return r !== "";
  }
  function j(r) {
    return r ? r.split(/[\t\n\f\r ]+/).filter(C) : [];
  }
  function R(r, u) {
    return i(r, u) || (r[u] = !0), r;
  }
  function k(r) {
    if (!r) return [];
    var u = j(r);
    return Object.keys(u.reduce(R, {}));
  }
  function $(r) {
    return function(u) {
      return r && r.indexOf(u) !== -1;
    };
  }
  function ne(r) {
    if (!O.QName_exact.test(r))
      throw new l(l.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + r + '"');
  }
  function le(r, u) {
    ne(u), r = r || null;
    var s = null, c = u;
    if (u.indexOf(":") >= 0) {
      var D = u.split(":");
      s = D[0], c = D[1];
    }
    if (s !== null && r === null)
      throw new l(l.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    if (s === "xml" && r !== t.NAMESPACE.XML)
      throw new l(l.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    if ((s === "xmlns" || u === "xmlns") && r !== t.NAMESPACE.XMLNS)
      throw new l(
        l.NAMESPACE_ERR,
        'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
      );
    if (r === t.NAMESPACE.XMLNS && s !== "xmlns" && u !== "xmlns")
      throw new l(
        l.NAMESPACE_ERR,
        'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
      );
    return [r, s, c];
  }
  function g(r, u) {
    for (var s in r)
      i(r, s) && (u[s] = r[s]);
  }
  function x(r, u) {
    var s = r.prototype;
    if (!(s instanceof u)) {
      let c = function() {
      };
      c.prototype = u.prototype, c = new c(), g(s, c), r.prototype = s = c;
    }
    s.constructor != r && (typeof r != "function" && console.error("unknown Class:" + r), s.constructor = r);
  }
  var F = {}, G = F.ELEMENT_NODE = 1, K = F.ATTRIBUTE_NODE = 2, ee = F.TEXT_NODE = 3, Ie = F.CDATA_SECTION_NODE = 4, te = F.ENTITY_REFERENCE_NODE = 5, Me = F.ENTITY_NODE = 6, d = F.PROCESSING_INSTRUCTION_NODE = 7, N = F.COMMENT_NODE = 8, w = F.DOCUMENT_NODE = 9, y = F.DOCUMENT_TYPE_NODE = 10, B = F.DOCUMENT_FRAGMENT_NODE = 11, A = F.NOTATION_NODE = 12, M = t.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function J(r, u) {
    if (u.length < r.length) return J(u, r);
    var s = null;
    for (var c in r) {
      if (r[c] !== u[c]) return s;
      s = r[c];
    }
    return s;
  }
  function _(r) {
    return r.guid || (r.guid = Math.random()), r.guid;
  }
  function T() {
  }
  T.prototype = {
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
    item: function(r) {
      return r >= 0 && r < this.length ? this[r] : null;
    },
    /**
     * Returns a string representation of the NodeList.
     *
     * @param {unknown} nodeFilter
     * __A filter function? Not implemented according to the spec?__.
     * @returns {string}
     * A string representation of the NodeList.
     */
    toString: function(r) {
      for (var u = [], s = 0; s < this.length; s++)
        qe(this[s], u, r);
      return u.join("");
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
    filter: function(r) {
      return Array.prototype.filter.call(this, r);
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
    indexOf: function(r) {
      return Array.prototype.indexOf.call(this, r);
    }
  }, T.prototype[Symbol.iterator] = function() {
    var r = this, u = 0;
    return {
      next: function() {
        return u < r.length ? {
          value: r[u++],
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
  function I(r, u) {
    this._node = r, this._refresh = u, L(this);
  }
  function L(r) {
    var u = r._node._inc || r._node.ownerDocument._inc;
    if (r._inc !== u) {
      var s = r._refresh(r._node);
      if (Xt(r, "length", s.length), !r.$$length || s.length < r.$$length)
        for (var c = s.length; c in r; c++)
          i(r, c) && delete r[c];
      g(s, r), r._inc = u;
    }
  }
  I.prototype.item = function(r) {
    return L(this), this[r] || null;
  }, x(I, T);
  function V() {
  }
  function fe(r, u) {
    for (var s = 0; s < r.length; ) {
      if (r[s] === u)
        return s;
      s++;
    }
  }
  function we(r, u, s, c) {
    if (c ? u[fe(u, c)] = s : (u[u.length] = s, u.length++), r) {
      s.ownerElement = r;
      var D = r.ownerDocument;
      D && (c && _e(D, r, c), Ve(D, r, s));
    }
  }
  function ve(r, u, s) {
    var c = fe(u, s);
    if (c >= 0) {
      for (var D = u.length - 1; c <= D; )
        u[c] = u[++c];
      if (u.length = D, r) {
        var S = r.ownerDocument;
        S && _e(S, r, s), s.ownerElement = null;
      }
    }
  }
  V.prototype = {
    length: 0,
    item: T.prototype.item,
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
    getNamedItem: function(r) {
      this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (r = r.toLowerCase());
      for (var u = 0; u < this.length; ) {
        var s = this[u];
        if (s.nodeName === r)
          return s;
        u++;
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
    setNamedItem: function(r) {
      var u = r.ownerElement;
      if (u && u !== this._ownerElement)
        throw new l(l.INUSE_ATTRIBUTE_ERR);
      var s = this.getNamedItemNS(r.namespaceURI, r.localName);
      return s === r ? r : (we(this._ownerElement, this, r, s), s);
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
    setNamedItemNS: function(r) {
      return this.setNamedItem(r);
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
    removeNamedItem: function(r) {
      var u = this.getNamedItem(r);
      if (!u)
        throw new l(l.NOT_FOUND_ERR, r);
      return ve(this._ownerElement, this, u), u;
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
    removeNamedItemNS: function(r, u) {
      var s = this.getNamedItemNS(r, u);
      if (!s)
        throw new l(l.NOT_FOUND_ERR, r ? r + " : " + u : u);
      return ve(this._ownerElement, this, s), s;
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
    getNamedItemNS: function(r, u) {
      r || (r = null);
      for (var s = 0; s < this.length; ) {
        var c = this[s];
        if (c.localName === u && c.namespaceURI === r)
          return c;
        s++;
      }
      return null;
    }
  }, V.prototype[Symbol.iterator] = function() {
    var r = this, u = 0;
    return {
      next: function() {
        return u < r.length ? {
          value: r[u++],
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
  function ie() {
  }
  ie.prototype = {
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
    hasFeature: function(r, u) {
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
    createDocument: function(r, u, s) {
      var c = p.XML_APPLICATION;
      r === f.HTML ? c = p.XML_XHTML_APPLICATION : r === f.SVG && (c = p.XML_SVG_IMAGE);
      var D = new pe(m, { contentType: c });
      if (D.implementation = this, D.childNodes = new T(), D.doctype = s || null, s && D.appendChild(s), u) {
        var S = D.createElementNS(r, u);
        D.appendChild(S);
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
    createDocumentType: function(r, u, s, c) {
      ne(r);
      var D = new lt(m);
      return D.name = r, D.nodeName = r, D.publicId = u || "", D.systemId = s || "", D.internalSubset = c || "", D.childNodes = new T(), D;
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
    createHTMLDocument: function(r) {
      var u = new pe(m, { contentType: p.HTML });
      if (u.implementation = this, u.childNodes = new T(), r !== !1) {
        u.doctype = this.createDocumentType("html"), u.doctype.ownerDocument = u, u.appendChild(u.doctype);
        var s = u.createElement("html");
        u.appendChild(s);
        var c = u.createElement("head");
        if (s.appendChild(c), typeof r == "string") {
          var D = u.createElement("title");
          D.appendChild(u.createTextNode(r)), c.appendChild(D);
        }
        s.appendChild(u.createElement("body"));
      }
      return u;
    }
  };
  function P(r) {
    b(r);
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
      var r = this.getRootNode();
      return r && r.nodeType === r.DOCUMENT_NODE;
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
    contains: function(r) {
      if (!r) return !1;
      var u = r;
      do {
        if (this === u) return !0;
        u = r.parentNode;
      } while (u);
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
    getRootNode: function(r) {
      var u = this;
      do {
        if (!u.parentNode)
          return u;
        u = u.parentNode;
      } while (u);
    },
    /**
     * Checks whether the given node is equal to this node.
     *
     * @param {Node} [otherNode]
     * @see https://dom.spec.whatwg.org/#concept-node-equals
     */
    isEqualNode: function(r) {
      if (!r || this.nodeType !== r.nodeType) return !1;
      switch (this.nodeType) {
        case this.DOCUMENT_TYPE_NODE:
          if (this.name !== r.name || this.publicId !== r.publicId || this.systemId !== r.systemId) return !1;
          break;
        case this.ELEMENT_NODE:
          if (this.namespaceURI !== r.namespaceURI || this.prefix !== r.prefix || this.localName !== r.localName || this.attributes.length !== r.attributes.length) return !1;
          for (var u = 0; u < this.attributes.length; u++) {
            var s = this.attributes.item(u);
            if (!s.isEqualNode(r.getAttributeNodeNS(s.namespaceURI, s.localName)))
              return !1;
          }
          break;
        case this.ATTRIBUTE_NODE:
          if (this.namespaceURI !== r.namespaceURI || this.localName !== r.localName || this.value !== r.value) return !1;
          break;
        case this.PROCESSING_INSTRUCTION_NODE:
          if (this.target !== r.target || this.data !== r.data)
            return !1;
          break;
        case this.TEXT_NODE:
        case this.COMMENT_NODE:
          if (this.data !== r.data) return !1;
          break;
      }
      if (this.childNodes.length !== r.childNodes.length)
        return !1;
      for (var u = 0; u < this.childNodes.length; u++)
        if (!this.childNodes[u].isEqualNode(r.childNodes[u]))
          return !1;
      return !0;
    },
    /**
     * Checks whether or not the given node is this node.
     *
     * @param {Node} [otherNode]
     */
    isSameNode: function(r) {
      return this === r;
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
    insertBefore: function(r, u) {
      return q(this, r, u);
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
    replaceChild: function(r, u) {
      q(this, r, u, We), u && this.removeChild(u);
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
    removeChild: function(r) {
      return Fe(this, r);
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
    appendChild: function(r) {
      return this.insertBefore(r, null);
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
    cloneNode: function(r) {
      return Lt(this.ownerDocument || this, this, r);
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
      for (var r = this.firstChild; r; ) {
        var u = r.nextSibling;
        u && u.nodeType == ee && r.nodeType == ee ? (this.removeChild(u), r.appendData(u.data)) : (r.normalize(), r = u);
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
    isSupported: function(r, u) {
      return this.ownerDocument.implementation.hasFeature(r, u);
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
    lookupPrefix: function(r) {
      for (var u = this; u; ) {
        var s = u._nsMap;
        if (s) {
          for (var c in s)
            if (i(s, c) && s[c] === r)
              return c;
        }
        u = u.nodeType == K ? u.ownerDocument : u.parentNode;
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
    lookupNamespaceURI: function(r) {
      for (var u = this; u; ) {
        var s = u._nsMap;
        if (s && i(s, r))
          return s[r];
        u = u.nodeType == K ? u.ownerDocument : u.parentNode;
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
    isDefaultNamespace: function(r) {
      var u = this.lookupPrefix(r);
      return u == null;
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
    compareDocumentPosition: function(r) {
      if (this === r) return 0;
      var u = r, s = this, c = null, D = null;
      if (u instanceof Ae && (c = u, u = c.ownerElement), s instanceof Ae && (D = s, s = D.ownerElement, c && u && s === u))
        for (var S = 0, X; X = s.attributes[S]; S++) {
          if (X === c)
            return M.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + M.DOCUMENT_POSITION_PRECEDING;
          if (X === D)
            return M.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + M.DOCUMENT_POSITION_FOLLOWING;
        }
      if (!u || !s || s.ownerDocument !== u.ownerDocument)
        return M.DOCUMENT_POSITION_DISCONNECTED + M.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (_(s.ownerDocument) > _(u.ownerDocument) ? M.DOCUMENT_POSITION_FOLLOWING : M.DOCUMENT_POSITION_PRECEDING);
      if (D && u === s)
        return M.DOCUMENT_POSITION_CONTAINS + M.DOCUMENT_POSITION_PRECEDING;
      if (c && u === s)
        return M.DOCUMENT_POSITION_CONTAINED_BY + M.DOCUMENT_POSITION_FOLLOWING;
      for (var ae = [], de = u.parentNode; de; ) {
        if (!D && de === s)
          return M.DOCUMENT_POSITION_CONTAINED_BY + M.DOCUMENT_POSITION_FOLLOWING;
        ae.push(de), de = de.parentNode;
      }
      ae.reverse();
      for (var ye = [], ge = s.parentNode; ge; ) {
        if (!c && ge === u)
          return M.DOCUMENT_POSITION_CONTAINS + M.DOCUMENT_POSITION_PRECEDING;
        ye.push(ge), ge = ge.parentNode;
      }
      ye.reverse();
      var Ze = J(ae, ye);
      for (var Ue in Ze.childNodes) {
        var Oe = Ze.childNodes[Ue];
        if (Oe === s) return M.DOCUMENT_POSITION_FOLLOWING;
        if (Oe === u) return M.DOCUMENT_POSITION_PRECEDING;
        if (ye.indexOf(Oe) >= 0) return M.DOCUMENT_POSITION_FOLLOWING;
        if (ae.indexOf(Oe) >= 0) return M.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function $e(r) {
    return r == "<" && "&lt;" || r == ">" && "&gt;" || r == "&" && "&amp;" || r == '"' && "&quot;" || "&#" + r.charCodeAt() + ";";
  }
  g(F, P), g(F, P.prototype), g(M, P), g(M, P.prototype);
  function Re(r, u) {
    if (u(r))
      return !0;
    if (r = r.firstChild)
      do
        if (Re(r, u))
          return !0;
      while (r = r.nextSibling);
  }
  function pe(r, u) {
    b(r);
    var s = u || {};
    this.ownerDocument = this, this.contentType = s.contentType || p.XML_APPLICATION, this.type = o(this.contentType) ? "html" : "xml";
  }
  function Ve(r, u, s) {
    r && r._inc++;
    var c = s.namespaceURI;
    c === f.XMLNS && (u._nsMap[s.prefix ? s.localName : ""] = s.value);
  }
  function _e(r, u, s, c) {
    r && r._inc++;
    var D = s.namespaceURI;
    D === f.XMLNS && delete u._nsMap[s.prefix ? s.localName : ""];
  }
  function Se(r, u, s) {
    if (r && r._inc) {
      r._inc++;
      var c = u.childNodes;
      if (s && !s.nextSibling)
        c[c.length++] = s;
      else {
        for (var D = u.firstChild, S = 0; D; )
          c[S++] = D, D = D.nextSibling;
        c.length = S, delete c[c.length];
      }
    }
  }
  function Fe(r, u) {
    if (r !== u.parentNode)
      throw new l(l.NOT_FOUND_ERR, "child's parent is not parent");
    var s = u.previousSibling, c = u.nextSibling;
    return s ? s.nextSibling = c : r.firstChild = c, c ? c.previousSibling = s : r.lastChild = s, Se(r.ownerDocument, r), u.parentNode = null, u.previousSibling = null, u.nextSibling = null, u;
  }
  function He(r) {
    return r && (r.nodeType === P.DOCUMENT_NODE || r.nodeType === P.DOCUMENT_FRAGMENT_NODE || r.nodeType === P.ELEMENT_NODE);
  }
  function Je(r) {
    return r && (r.nodeType === P.CDATA_SECTION_NODE || r.nodeType === P.COMMENT_NODE || r.nodeType === P.DOCUMENT_FRAGMENT_NODE || r.nodeType === P.DOCUMENT_TYPE_NODE || r.nodeType === P.ELEMENT_NODE || r.nodeType === P.PROCESSING_INSTRUCTION_NODE || r.nodeType === P.TEXT_NODE);
  }
  function Ce(r) {
    return r && r.nodeType === P.DOCUMENT_TYPE_NODE;
  }
  function Q(r) {
    return r && r.nodeType === P.ELEMENT_NODE;
  }
  function Ge(r) {
    return r && r.nodeType === P.TEXT_NODE;
  }
  function oe(r, u) {
    var s = r.childNodes || [];
    if (e(s, Q) || Ce(u))
      return !1;
    var c = e(s, Ce);
    return !(u && c && s.indexOf(c) > s.indexOf(u));
  }
  function Xe(r, u) {
    var s = r.childNodes || [];
    function c(S) {
      return Q(S) && S !== u;
    }
    if (e(s, c))
      return !1;
    var D = e(s, Ce);
    return !(u && D && s.indexOf(D) > s.indexOf(u));
  }
  function vt(r, u, s) {
    if (!He(r))
      throw new l(l.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + r.nodeType);
    if (s && s.parentNode !== r)
      throw new l(l.NOT_FOUND_ERR, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !Je(u) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      Ce(u) && r.nodeType !== P.DOCUMENT_NODE
    )
      throw new l(
        l.HIERARCHY_REQUEST_ERR,
        "Unexpected node type " + u.nodeType + " for parent node type " + r.nodeType
      );
  }
  function Ye(r, u, s) {
    var c = r.childNodes || [], D = u.childNodes || [];
    if (u.nodeType === P.DOCUMENT_FRAGMENT_NODE) {
      var S = D.filter(Q);
      if (S.length > 1 || e(D, Ge))
        throw new l(l.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (S.length === 1 && !oe(r, s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (Q(u) && !oe(r, s))
      throw new l(l.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (Ce(u)) {
      if (e(c, Ce))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var X = e(c, Q);
      if (s && c.indexOf(X) < c.indexOf(s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      if (!s && X)
        throw new l(l.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
  function We(r, u, s) {
    var c = r.childNodes || [], D = u.childNodes || [];
    if (u.nodeType === P.DOCUMENT_FRAGMENT_NODE) {
      var S = D.filter(Q);
      if (S.length > 1 || e(D, Ge))
        throw new l(l.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (S.length === 1 && !Xe(r, s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (Q(u) && !Xe(r, s))
      throw new l(l.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (Ce(u)) {
      if (e(c, function(de) {
        return Ce(de) && de !== s;
      }))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var X = e(c, Q);
      if (s && c.indexOf(X) < c.indexOf(s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
  function q(r, u, s, c) {
    vt(r, u, s), r.nodeType === P.DOCUMENT_NODE && (c || Ye)(r, u, s);
    var D = u.parentNode;
    if (D && D.removeChild(u), u.nodeType === B) {
      var S = u.firstChild;
      if (S == null)
        return u;
      var X = u.lastChild;
    } else
      S = X = u;
    var ae = s ? s.previousSibling : r.lastChild;
    S.previousSibling = ae, X.nextSibling = s, ae ? ae.nextSibling = S : r.firstChild = S, s == null ? r.lastChild = X : s.previousSibling = X;
    do
      S.parentNode = r;
    while (S !== X && (S = S.nextSibling));
    return Se(r.ownerDocument || r, r, u), u.nodeType == B && (u.firstChild = u.lastChild = null), u;
  }
  pe.prototype = {
    /**
     * The implementation that created this document.
     *
     * @type DOMImplementation
     * @readonly
     */
    implementation: null,
    nodeName: "#document",
    nodeType: w,
    /**
     * The DocumentType node of the document.
     *
     * @type DocumentType
     * @readonly
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(r, u) {
      if (r.nodeType === B) {
        for (var s = r.firstChild; s; ) {
          var c = s.nextSibling;
          this.insertBefore(s, u), s = c;
        }
        return r;
      }
      return q(this, r, u), r.ownerDocument = this, this.documentElement === null && r.nodeType === G && (this.documentElement = r), r;
    },
    removeChild: function(r) {
      var u = Fe(this, r);
      return u === this.documentElement && (this.documentElement = null), u;
    },
    replaceChild: function(r, u) {
      q(this, r, u, We), r.ownerDocument = this, u && this.removeChild(u), Q(r) && (this.documentElement = r);
    },
    // Introduced in DOM Level 2:
    importNode: function(r, u) {
      return Jt(this, r, u);
    },
    // Introduced in DOM Level 2:
    getElementById: function(r) {
      var u = null;
      return Re(this.documentElement, function(s) {
        if (s.nodeType == G && s.getAttribute("id") == r)
          return u = s, !0;
      }), u;
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
    createElement: function(r) {
      var u = new Z(m);
      u.ownerDocument = this, this.type === "html" && (r = r.toLowerCase()), n(this.contentType) && (u.namespaceURI = f.HTML), u.nodeName = r, u.tagName = r, u.localName = r, u.childNodes = new T();
      var s = u.attributes = new V();
      return s._ownerElement = u, u;
    },
    /**
     * @returns {DocumentFragment}
     */
    createDocumentFragment: function() {
      var r = new Qe(m);
      return r.ownerDocument = this, r.childNodes = new T(), r;
    },
    /**
     * @param {string} data
     * @returns {Text}
     */
    createTextNode: function(r) {
      var u = new Ke(m);
      return u.ownerDocument = this, u.childNodes = new T(), u.appendData(r), u;
    },
    /**
     * @param {string} data
     * @returns {Comment}
     */
    createComment: function(r) {
      var u = new st(m);
      return u.ownerDocument = this, u.childNodes = new T(), u.appendData(r), u;
    },
    /**
     * @param {string} data
     * @returns {CDATASection}
     */
    createCDATASection: function(r) {
      var u = new ct(m);
      return u.ownerDocument = this, u.childNodes = new T(), u.appendData(r), u;
    },
    /**
     * @param {string} target
     * @param {string} data
     * @returns {ProcessingInstruction}
     */
    createProcessingInstruction: function(r, u) {
      var s = new pt(m);
      return s.ownerDocument = this, s.childNodes = new T(), s.nodeName = s.target = r, s.nodeValue = s.data = u, s;
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
    createAttribute: function(r) {
      if (!O.QName_exact.test(r))
        throw new l(l.INVALID_CHARACTER_ERR, 'invalid character in name "' + r + '"');
      return this.type === "html" && (r = r.toLowerCase()), this._createAttribute(r);
    },
    _createAttribute: function(r) {
      var u = new Ae(m);
      return u.ownerDocument = this, u.childNodes = new T(), u.name = r, u.nodeName = r, u.localName = r, u.specified = !0, u;
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
    createEntityReference: function(r) {
      if (!O.Name.test(r))
        throw new l(l.INVALID_CHARACTER_ERR, 'not a valid xml name "' + r + '"');
      if (this.type === "html")
        throw new l("document is an html document", v.NotSupportedError);
      var u = new ft(m);
      return u.ownerDocument = this, u.childNodes = new T(), u.nodeName = r, u;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Element}
     */
    createElementNS: function(r, u) {
      var s = le(r, u), c = new Z(m), D = c.attributes = new V();
      return c.childNodes = new T(), c.ownerDocument = this, c.nodeName = u, c.tagName = u, c.namespaceURI = s[0], c.prefix = s[1], c.localName = s[2], D._ownerElement = c, c;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Attr}
     */
    createAttributeNS: function(r, u) {
      var s = le(r, u), c = new Ae(m);
      return c.ownerDocument = this, c.childNodes = new T(), c.nodeName = u, c.name = u, c.specified = !0, c.namespaceURI = s[0], c.prefix = s[1], c.localName = s[2], c;
    }
  }, x(pe, P);
  function Z(r) {
    b(r), this._nsMap = /* @__PURE__ */ Object.create(null);
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
    hasAttribute: function(r) {
      return !!this.getAttributeNode(r);
    },
    /**
     * Returns element’s first attribute whose qualified name is `name`, and `null`
     * if there is no such attribute.
     *
     * @param {string} name
     * @returns {string | null}
     */
    getAttribute: function(r) {
      var u = this.getAttributeNode(r);
      return u ? u.value : null;
    },
    getAttributeNode: function(r) {
      return this._isInHTMLDocumentAndNamespace() && (r = r.toLowerCase()), this.attributes.getNamedItem(r);
    },
    /**
     * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
     *
     * @param {string} name
     * @param {string} value
     */
    setAttribute: function(r, u) {
      this._isInHTMLDocumentAndNamespace() && (r = r.toLowerCase());
      var s = this.getAttributeNode(r);
      s ? s.value = s.nodeValue = "" + u : (s = this.ownerDocument._createAttribute(r), s.value = s.nodeValue = "" + u, this.setAttributeNode(s));
    },
    removeAttribute: function(r) {
      var u = this.getAttributeNode(r);
      u && this.removeAttributeNode(u);
    },
    setAttributeNode: function(r) {
      return this.attributes.setNamedItem(r);
    },
    setAttributeNodeNS: function(r) {
      return this.attributes.setNamedItemNS(r);
    },
    removeAttributeNode: function(r) {
      return this.attributes.removeNamedItem(r.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(r, u) {
      var s = this.getAttributeNodeNS(r, u);
      s && this.removeAttributeNode(s);
    },
    hasAttributeNS: function(r, u) {
      return this.getAttributeNodeNS(r, u) != null;
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
    getAttributeNS: function(r, u) {
      var s = this.getAttributeNodeNS(r, u);
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
    setAttributeNS: function(r, u, s) {
      var c = le(r, u), D = c[2], S = this.getAttributeNodeNS(r, D);
      S ? S.value = S.nodeValue = "" + s : (S = this.ownerDocument.createAttributeNS(r, u), S.value = S.nodeValue = "" + s, this.setAttributeNode(S));
    },
    getAttributeNodeNS: function(r, u) {
      return this.attributes.getNamedItemNS(r, u);
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
    getElementsByClassName: function(r) {
      var u = k(r);
      return new I(this, function(s) {
        var c = [];
        return u.length > 0 && Re(s, function(D) {
          if (D !== s && D.nodeType === G) {
            var S = D.getAttribute("class");
            if (S) {
              var X = r === S;
              if (!X) {
                var ae = k(S);
                X = u.every($(ae));
              }
              X && c.push(D);
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
    getElementsByTagName: function(r) {
      var u = (this.nodeType === w ? this : this.ownerDocument).type === "html", s = r.toLowerCase();
      return new I(this, function(c) {
        var D = [];
        return Re(c, function(S) {
          if (!(S === c || S.nodeType !== G))
            if (r === "*")
              D.push(S);
            else {
              var X = S.getQualifiedName(), ae = u && S.namespaceURI === f.HTML ? s : r;
              X === ae && D.push(S);
            }
        }), D;
      });
    },
    getElementsByTagNameNS: function(r, u) {
      return new I(this, function(s) {
        var c = [];
        return Re(s, function(D) {
          D !== s && D.nodeType === G && (r === "*" || D.namespaceURI === r) && (u === "*" || D.localName == u) && c.push(D);
        }), c;
      });
    }
  }, pe.prototype.getElementsByClassName = Z.prototype.getElementsByClassName, pe.prototype.getElementsByTagName = Z.prototype.getElementsByTagName, pe.prototype.getElementsByTagNameNS = Z.prototype.getElementsByTagNameNS, x(Z, P);
  function Ae(r) {
    b(r), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
  }
  Ae.prototype.nodeType = K, x(Ae, P);
  function Ne(r) {
    b(r);
  }
  Ne.prototype = {
    data: "",
    substringData: function(r, u) {
      return this.data.substring(r, r + u);
    },
    appendData: function(r) {
      r = this.data + r, this.nodeValue = this.data = r, this.length = r.length;
    },
    insertData: function(r, u) {
      this.replaceData(r, 0, u);
    },
    deleteData: function(r, u) {
      this.replaceData(r, u, "");
    },
    replaceData: function(r, u, s) {
      var c = this.data.substring(0, r), D = this.data.substring(r + u);
      s = c + s + D, this.nodeValue = this.data = s, this.length = s.length;
    }
  }, x(Ne, P);
  function Ke(r) {
    b(r);
  }
  Ke.prototype = {
    nodeName: "#text",
    nodeType: ee,
    splitText: function(r) {
      var u = this.data, s = u.substring(r);
      u = u.substring(0, r), this.data = this.nodeValue = u, this.length = u.length;
      var c = this.ownerDocument.createTextNode(s);
      return this.parentNode && this.parentNode.insertBefore(c, this.nextSibling), c;
    }
  }, x(Ke, Ne);
  function st(r) {
    b(r);
  }
  st.prototype = {
    nodeName: "#comment",
    nodeType: N
  }, x(st, Ne);
  function ct(r) {
    b(r);
  }
  ct.prototype = {
    nodeName: "#cdata-section",
    nodeType: Ie
  }, x(ct, Ke);
  function lt(r) {
    b(r);
  }
  lt.prototype.nodeType = y, x(lt, P);
  function At(r) {
    b(r);
  }
  At.prototype.nodeType = A, x(At, P);
  function Nt(r) {
    b(r);
  }
  Nt.prototype.nodeType = Me, x(Nt, P);
  function ft(r) {
    b(r);
  }
  ft.prototype.nodeType = te, x(ft, P);
  function Qe(r) {
    b(r);
  }
  Qe.prototype.nodeName = "#document-fragment", Qe.prototype.nodeType = B, x(Qe, P);
  function pt(r) {
    b(r);
  }
  pt.prototype.nodeType = d, x(pt, Ne);
  function Ot() {
  }
  Ot.prototype.serializeToString = function(r, u) {
    return ue.call(r, u);
  }, P.prototype.toString = ue;
  function ue(r) {
    var u = [], s = this.nodeType === w && this.documentElement || this, c = s.prefix, D = s.namespaceURI;
    if (D && c == null) {
      var c = s.lookupPrefix(D);
      if (c == null)
        var S = [
          { namespace: D, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return qe(this, u, r, S), u.join("");
  }
  function he(r, u, s) {
    var c = r.prefix || "", D = r.namespaceURI;
    if (!D || c === "xml" && D === f.XML || D === f.XMLNS)
      return !1;
    for (var S = s.length; S--; ) {
      var X = s[S];
      if (X.prefix === c)
        return X.namespace !== D;
    }
    return !0;
  }
  function ke(r, u, s) {
    r.push(" ", u, '="', s.replace(/[<>&"\t\n\r]/g, $e), '"');
  }
  function qe(r, u, s, c) {
    c || (c = []);
    var D = r.nodeType === w ? r : r.ownerDocument, S = D.type === "html";
    if (s)
      if (r = s(r), r) {
        if (typeof r == "string") {
          u.push(r);
          return;
        }
      } else
        return;
    switch (r.nodeType) {
      case G:
        var X = r.attributes, ae = X.length, me = r.firstChild, de = r.tagName, ye = de;
        if (!S && !r.prefix && r.namespaceURI) {
          for (var ge, Ze = 0; Ze < X.length; Ze++)
            if (X.item(Ze).name === "xmlns") {
              ge = X.item(Ze).value;
              break;
            }
          if (!ge)
            for (var Ue = c.length - 1; Ue >= 0; Ue--) {
              var Oe = c[Ue];
              if (Oe.prefix === "" && Oe.namespace === r.namespaceURI) {
                ge = Oe.namespace;
                break;
              }
            }
          if (ge !== r.namespaceURI)
            for (var Ue = c.length - 1; Ue >= 0; Ue--) {
              var Oe = c[Ue];
              if (Oe.namespace === r.namespaceURI) {
                Oe.prefix && (ye = Oe.prefix + ":" + de);
                break;
              }
            }
        }
        u.push("<", ye);
        for (var et = 0; et < ae; et++) {
          var Pe = X.item(et);
          Pe.prefix == "xmlns" ? c.push({
            prefix: Pe.localName,
            namespace: Pe.value
          }) : Pe.nodeName == "xmlns" && c.push({ prefix: "", namespace: Pe.value });
        }
        for (var et = 0; et < ae; et++) {
          var Pe = X.item(et);
          if (he(Pe, S, c)) {
            var tt = Pe.prefix || "", bt = Pe.namespaceURI;
            ke(u, tt ? "xmlns:" + tt : "xmlns", bt), c.push({ prefix: tt, namespace: bt });
          }
          qe(Pe, u, s, c);
        }
        if (de === ye && he(r, S, c)) {
          var tt = r.prefix || "", bt = r.namespaceURI;
          ke(u, tt ? "xmlns:" + tt : "xmlns", bt), c.push({ prefix: tt, namespace: bt });
        }
        var Ft = !me;
        if (Ft && (S || r.namespaceURI === f.HTML) && (Ft = h(de)), Ft)
          u.push("/>");
        else {
          if (u.push(">"), S && a(de))
            for (; me; )
              me.data ? u.push(me.data) : qe(me, u, s, c.slice()), me = me.nextSibling;
          else
            for (; me; )
              qe(me, u, s, c.slice()), me = me.nextSibling;
          u.push("</", ye, ">");
        }
        return;
      case w:
      case B:
        for (var me = r.firstChild; me; )
          qe(me, u, s, c.slice()), me = me.nextSibling;
        return;
      case K:
        return ke(u, r.name, r.value);
      case ee:
        return u.push(r.data.replace(/[<&>]/g, $e));
      case Ie:
        return u.push(O.CDATA_START, r.data, O.CDATA_END);
      case N:
        return u.push(O.COMMENT_START, r.data, O.COMMENT_END);
      case y:
        var Yt = r.publicId, ht = r.systemId;
        u.push(O.DOCTYPE_DECL_START, " ", r.name), Yt ? (u.push(" ", O.PUBLIC, " ", Yt), ht && ht !== "." && u.push(" ", ht)) : ht && ht !== "." && u.push(" ", O.SYSTEM, " ", ht), r.internalSubset && u.push(" [", r.internalSubset, "]"), u.push(">");
        return;
      case d:
        return u.push("<?", r.target, " ", r.data, "?>");
      case te:
        return u.push("&", r.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        u.push("??", r.nodeName);
    }
  }
  function Jt(r, u, s) {
    var c;
    switch (u.nodeType) {
      case G:
        c = u.cloneNode(!1), c.ownerDocument = r;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case B:
        break;
      case K:
        s = !0;
        break;
    }
    if (c || (c = u.cloneNode(!1)), c.ownerDocument = r, c.parentNode = null, s)
      for (var D = u.firstChild; D; )
        c.appendChild(Jt(r, D, s)), D = D.nextSibling;
    return c;
  }
  function Lt(r, u, s) {
    var c = new u.constructor(m);
    for (var D in u)
      if (i(u, D)) {
        var S = u[D];
        typeof S != "object" && S != c[D] && (c[D] = S);
      }
    switch (u.childNodes && (c.childNodes = new T()), c.ownerDocument = r, c.nodeType) {
      case G:
        var X = u.attributes, ae = c.attributes = new V(), de = X.length;
        ae._ownerElement = c;
        for (var ye = 0; ye < de; ye++)
          c.setAttributeNode(Lt(r, X.item(ye), !0));
        break;
      case K:
        s = !0;
    }
    if (s)
      for (var ge = u.firstChild; ge; )
        c.appendChild(Lt(r, ge, s)), ge = ge.nextSibling;
    return c;
  }
  function Xt(r, u, s) {
    r[u] = s;
  }
  try {
    if (Object.defineProperty) {
      let r = function(u) {
        switch (u.nodeType) {
          case G:
          case B:
            var s = [];
            for (u = u.firstChild; u; )
              u.nodeType !== 7 && u.nodeType !== 8 && s.push(r(u)), u = u.nextSibling;
            return s.join("");
          default:
            return u.nodeValue;
        }
      };
      Object.defineProperty(I.prototype, "length", {
        get: function() {
          return L(this), this.$$length;
        }
      }), Object.defineProperty(P.prototype, "textContent", {
        get: function() {
          return r(this);
        },
        set: function(u) {
          switch (this.nodeType) {
            case G:
            case B:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (u || String(u)) && this.appendChild(this.ownerDocument.createTextNode(u));
              break;
            default:
              this.data = u, this.value = u, this.nodeValue = u;
          }
        }
      }), Xt = function(u, s, c) {
        u["$$" + s] = c;
      };
    }
  } catch {
  }
  return re._updateLiveList = L, re.Attr = Ae, re.CDATASection = ct, re.CharacterData = Ne, re.Comment = st, re.Document = pe, re.DocumentFragment = Qe, re.DocumentType = lt, re.DOMImplementation = ie, re.Element = Z, re.Entity = Nt, re.EntityReference = ft, re.LiveNodeList = I, re.NamedNodeMap = V, re.Node = P, re.NodeList = T, re.Notation = At, re.Text = Ke, re.ProcessingInstruction = pt, re.XMLSerializer = Ot, re;
}
var rt = {}, kt = {}, ir;
function vn() {
  return ir || (ir = 1, function(t) {
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
  }(kt)), kt;
}
var yt = {}, or;
function An() {
  if (or) return yt;
  or = 1;
  var t = Dt(), e = Fr(), n = _t(), i = t.isHTMLEscapableRawTextElement, o = t.isHTMLMimeType, a = t.isHTMLRawTextElement, h = t.hasOwn, p = t.NAMESPACE, f = n.ParseError, m = n.DOMException, E = 0, l = 1, v = 2, O = 3, b = 4, C = 5, j = 6, R = 7;
  function k() {
  }
  k.prototype = {
    parse: function(d, N, w) {
      var y = this.domBuilder;
      y.startDocument(), G(N, N = /* @__PURE__ */ Object.create(null)), ne(d, N, w, y, this.errorHandler), y.endDocument();
    }
  };
  var $ = /&#?\w+;?/g;
  function ne(d, N, w, y, B) {
    var A = o(y.mimeType);
    d.indexOf(e.UNICODE_REPLACEMENT_CHARACTER) >= 0 && B.warning("Unicode replacement character detected, source encoding issues?");
    function M(q) {
      if (q > 65535) {
        q -= 65536;
        var Z = 55296 + (q >> 10), Ae = 56320 + (q & 1023);
        return String.fromCharCode(Z, Ae);
      } else
        return String.fromCharCode(q);
    }
    function J(q) {
      var Z = q[q.length - 1] === ";" ? q : q + ";";
      if (!A && Z !== q)
        return B.error("EntityRef: expecting ;"), q;
      var Ae = e.Reference.exec(Z);
      if (!Ae || Ae[0].length !== Z.length)
        return B.error("entity not matching Reference production: " + q), q;
      var Ne = Z.slice(1, -1);
      return h(w, Ne) ? w[Ne] : Ne.charAt(0) === "#" ? M(parseInt(Ne.substring(1).replace("x", "0x"))) : (B.error("entity not found:" + q), q);
    }
    function _(q) {
      if (q > ie) {
        var Z = d.substring(ie, q).replace($, J);
        V && fe(ie), y.characters(Z, 0, q - ie), ie = q;
      }
    }
    var T = 0, I = 0, L = /\r\n?|\n|$/g, V = y.locator;
    function fe(q, Z) {
      for (; q >= I && (Z = L.exec(d)); )
        T = I, I = Z.index + Z[0].length, V.lineNumber++;
      V.columnNumber = q - T + 1;
    }
    for (var we = [{ currentNSMap: N }], ve = [], ie = 0; ; ) {
      try {
        var P = d.indexOf("<", ie);
        if (P < 0) {
          if (!A && ve.length > 0)
            return B.fatalError("unclosed xml tag(s): " + ve.join(", "));
          if (!d.substring(ie).match(/^\s*$/)) {
            var $e = y.doc, Re = $e.createTextNode(d.substring(ie));
            if ($e.documentElement)
              return B.error("Extra content at the end of the document");
            $e.appendChild(Re), y.currentElement = Re;
          }
          return;
        }
        if (P > ie) {
          var pe = d.substring(ie, P);
          !A && ve.length === 0 && (pe = pe.replace(new RegExp(e.S_OPT.source, "g"), ""), pe && B.error("Unexpected content outside root element: '" + pe + "'")), _(P);
        }
        switch (d.charAt(P + 1)) {
          case "/":
            var oe = d.indexOf(">", P + 2), Ve = d.substring(P + 2, oe > 0 ? oe : void 0);
            if (!Ve)
              return B.fatalError("end tag name missing");
            var _e = oe > 0 && e.reg("^", e.QName_group, e.S_OPT, "$").exec(Ve);
            if (!_e)
              return B.fatalError('end tag name contains invalid characters: "' + Ve + '"');
            if (!y.currentElement && !y.doc.documentElement)
              return;
            var Se = ve[ve.length - 1] || y.currentElement.tagName || y.doc.documentElement.tagName || "";
            if (Se !== _e[1]) {
              var Fe = _e[1].toLowerCase();
              if (!A || Se.toLowerCase() !== Fe)
                return B.fatalError('Opening and ending tag mismatch: "' + Se + '" != "' + Ve + '"');
            }
            var He = we.pop();
            ve.pop();
            var Je = He.localNSMap;
            if (y.endElement(He.uri, He.localName, Se), Je)
              for (var Ce in Je)
                h(Je, Ce) && y.endPrefixMapping(Ce);
            oe++;
            break;
          // end element
          case "?":
            V && fe(P), oe = te(d, P, y, B);
            break;
          case "!":
            V && fe(P), oe = Ie(d, P, y, B, A);
            break;
          default:
            V && fe(P);
            var Q = new Me(), Ge = we[we.length - 1].currentNSMap, oe = g(d, P, Q, Ge, J, B, A), Xe = Q.length;
            if (Q.closed || (A && t.isHTMLVoidElement(Q.tagName) ? Q.closed = !0 : ve.push(Q.tagName)), V && Xe) {
              for (var vt = le(V, {}), Ye = 0; Ye < Xe; Ye++) {
                var We = Q[Ye];
                fe(We.offset), We.locator = le(V, {});
              }
              y.locator = vt, x(Q, y, Ge) && we.push(Q), y.locator = V;
            } else
              x(Q, y, Ge) && we.push(Q);
            A && !Q.closed ? oe = F(d, oe, Q.tagName, J, y) : oe++;
        }
      } catch (q) {
        if (q instanceof f)
          throw q;
        if (q instanceof m)
          throw new f(q.name + ": " + q.message, y.locator, q);
        B.error("element parse error: " + q), oe = -1;
      }
      oe > ie ? ie = oe : _(Math.max(P, ie) + 1);
    }
  }
  function le(d, N) {
    return N.lineNumber = d.lineNumber, N.columnNumber = d.columnNumber, N;
  }
  function g(d, N, w, y, B, A, M) {
    function J(fe, we, ve) {
      if (h(w.attributeNames, fe))
        return A.fatalError("Attribute " + fe + " redefined");
      if (!M && we.indexOf("<") >= 0)
        return A.fatalError("Unescaped '<' not allowed in attributes values");
      w.addValue(
        fe,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        we.replace(/[\t\n\r]/g, " ").replace($, B),
        ve
      );
    }
    for (var _, T, I = ++N, L = E; ; ) {
      var V = d.charAt(I);
      switch (V) {
        case "=":
          if (L === l)
            _ = d.slice(N, I), L = O;
          else if (L === v)
            L = O;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (L === O || L === l)
            if (L === l && (A.warning('attribute value must after "="'), _ = d.slice(N, I)), N = I + 1, I = d.indexOf(V, N), I > 0)
              T = d.slice(N, I), J(_, T, N - 1), L = C;
            else
              throw new Error("attribute value no end '" + V + "' match");
          else if (L == b)
            T = d.slice(N, I), J(_, T, N), A.warning('attribute "' + _ + '" missed start quot(' + V + ")!!"), N = I + 1, L = C;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (L) {
            case E:
              w.setTagName(d.slice(N, I));
            case C:
            case j:
            case R:
              L = R, w.closed = !0;
            case b:
            case l:
              break;
            case v:
              w.closed = !0;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return A.error("unexpected end of input"), L == E && w.setTagName(d.slice(N, I)), I;
        case ">":
          switch (L) {
            case E:
              w.setTagName(d.slice(N, I));
            case C:
            case j:
            case R:
              break;
            //normal
            case b:
            //Compatible state
            case l:
              T = d.slice(N, I), T.slice(-1) === "/" && (w.closed = !0, T = T.slice(0, -1));
            case v:
              L === v && (T = _), L == b ? (A.warning('attribute "' + T + '" missed quot(")!'), J(_, T, N)) : (M || A.warning('attribute "' + T + '" missed value!! "' + T + '" instead!!'), J(T, T, N));
              break;
            case O:
              if (!M)
                return A.fatalError(`AttValue: ' or " expected`);
          }
          return I;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          V = " ";
        default:
          if (V <= " ")
            switch (L) {
              case E:
                w.setTagName(d.slice(N, I)), L = j;
                break;
              case l:
                _ = d.slice(N, I), L = v;
                break;
              case b:
                var T = d.slice(N, I);
                A.warning('attribute "' + T + '" missed quot(")!!'), J(_, T, N);
              case C:
                L = j;
                break;
            }
          else
            switch (L) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case v:
                M || A.warning('attribute "' + _ + '" missed value!! "' + _ + '" instead2!!'), J(_, _, N), N = I, L = l;
                break;
              case C:
                A.warning('attribute space is required"' + _ + '"!!');
              case j:
                L = l, N = I;
                break;
              case O:
                L = b, N = I;
                break;
              case R:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      I++;
    }
  }
  function x(d, N, w) {
    for (var y = d.tagName, B = null, L = d.length; L--; ) {
      var A = d[L], M = A.qName, J = A.value, V = M.indexOf(":");
      if (V > 0)
        var _ = A.prefix = M.slice(0, V), T = M.slice(V + 1), I = _ === "xmlns" && T;
      else
        T = M, _ = null, I = M === "xmlns" && "";
      A.localName = T, I !== !1 && (B == null && (B = /* @__PURE__ */ Object.create(null), G(w, w = /* @__PURE__ */ Object.create(null))), w[I] = B[I] = J, A.uri = p.XMLNS, N.startPrefixMapping(I, J));
    }
    for (var L = d.length; L--; )
      A = d[L], A.prefix && (A.prefix === "xml" && (A.uri = p.XML), A.prefix !== "xmlns" && (A.uri = w[A.prefix]));
    var V = y.indexOf(":");
    V > 0 ? (_ = d.prefix = y.slice(0, V), T = d.localName = y.slice(V + 1)) : (_ = null, T = d.localName = y);
    var fe = d.uri = w[_ || ""];
    if (N.startElement(fe, T, y, d), d.closed) {
      if (N.endElement(fe, T, y), B)
        for (_ in B)
          h(B, _) && N.endPrefixMapping(_);
    } else
      return d.currentNSMap = w, d.localNSMap = B, !0;
  }
  function F(d, N, w, y, B) {
    var A = i(w);
    if (A || a(w)) {
      var M = d.indexOf("</" + w + ">", N), J = d.substring(N + 1, M);
      return A && (J = J.replace($, y)), B.characters(J, 0, J.length), M;
    }
    return N + 1;
  }
  function G(d, N) {
    for (var w in d)
      h(d, w) && (N[w] = d[w]);
  }
  function K(d, N) {
    var w = N;
    function y(I) {
      return I = I || 0, d.charAt(w + I);
    }
    function B(I) {
      I = I || 1, w += I;
    }
    function A() {
      for (var I = 0; w < d.length; ) {
        var L = y();
        if (L !== " " && L !== `
` && L !== "	" && L !== "\r")
          return I;
        I++, B();
      }
      return -1;
    }
    function M() {
      return d.substring(w);
    }
    function J(I) {
      return d.substring(w, w + I.length) === I;
    }
    function _(I) {
      return d.substring(w, w + I.length).toUpperCase() === I.toUpperCase();
    }
    function T(I) {
      var L = e.reg("^", I), V = L.exec(M());
      return V ? (B(V[0].length), V[0]) : null;
    }
    return {
      char: y,
      getIndex: function() {
        return w;
      },
      getMatch: T,
      getSource: function() {
        return d;
      },
      skip: B,
      skipBlanks: A,
      substringFromIndex: M,
      substringStartsWith: J,
      substringStartsWithCaseInsensitive: _
    };
  }
  function ee(d, N) {
    function w(J, _) {
      var T = e.PI.exec(J.substringFromIndex());
      return T ? T[1].toLowerCase() === "xml" ? _.fatalError(
        "xml declaration is only allowed at the start of the document, but found at position " + J.getIndex()
      ) : (J.skip(T[0].length), T[0]) : _.fatalError("processing instruction is not well-formed at position " + J.getIndex());
    }
    var y = d.getSource();
    if (d.char() === "[") {
      d.skip(1);
      for (var B = d.getIndex(); d.getIndex() < y.length; ) {
        if (d.skipBlanks(), d.char() === "]") {
          var A = y.substring(B, d.getIndex());
          return d.skip(1), A;
        }
        var M = null;
        if (d.char() === "<" && d.char(1) === "!")
          switch (d.char(2)) {
            case "E":
              d.char(3) === "L" ? M = d.getMatch(e.elementdecl) : d.char(3) === "N" && (M = d.getMatch(e.EntityDecl));
              break;
            case "A":
              M = d.getMatch(e.AttlistDecl);
              break;
            case "N":
              M = d.getMatch(e.NotationDecl);
              break;
            case "-":
              M = d.getMatch(e.Comment);
              break;
          }
        else if (d.char() === "<" && d.char(1) === "?")
          M = w(d, N);
        else if (d.char() === "%")
          M = d.getMatch(e.PEReference);
        else
          return N.fatalError("Error detected in Markup declaration");
        if (!M)
          return N.fatalError("Error in internal subset at position " + d.getIndex());
      }
      return N.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function Ie(d, N, w, y, B) {
    var A = K(d, N);
    switch (B ? A.char(2).toUpperCase() : A.char(2)) {
      case "-":
        var M = A.getMatch(e.Comment);
        return M ? (w.comment(M, e.COMMENT_START.length, M.length - e.COMMENT_START.length - e.COMMENT_END.length), A.getIndex()) : y.fatalError("comment is not well-formed at position " + A.getIndex());
      case "[":
        var J = A.getMatch(e.CDSect);
        return J ? !B && !w.currentElement ? y.fatalError("CDATA outside of element") : (w.startCDATA(), w.characters(J, e.CDATA_START.length, J.length - e.CDATA_START.length - e.CDATA_END.length), w.endCDATA(), A.getIndex()) : y.fatalError("Invalid CDATA starting at position " + N);
      case "D": {
        if (w.doc && w.doc.documentElement)
          return y.fatalError("Doctype not allowed inside or after documentElement at position " + A.getIndex());
        if (B ? !A.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START) : !A.substringStartsWith(e.DOCTYPE_DECL_START))
          return y.fatalError("Expected " + e.DOCTYPE_DECL_START + " at position " + A.getIndex());
        if (A.skip(e.DOCTYPE_DECL_START.length), A.skipBlanks() < 1)
          return y.fatalError("Expected whitespace after " + e.DOCTYPE_DECL_START + " at position " + A.getIndex());
        var _ = {
          name: void 0,
          publicId: void 0,
          systemId: void 0,
          internalSubset: void 0
        };
        if (_.name = A.getMatch(e.Name), !_.name)
          return y.fatalError("doctype name missing or contains unexpected characters at position " + A.getIndex());
        if (B && _.name.toLowerCase() !== "html" && y.warning("Unexpected DOCTYPE in HTML document at position " + A.getIndex()), A.skipBlanks(), A.substringStartsWith(e.PUBLIC) || A.substringStartsWith(e.SYSTEM)) {
          var T = e.ExternalID_match.exec(A.substringFromIndex());
          if (!T)
            return y.fatalError("doctype external id is not well-formed at position " + A.getIndex());
          T.groups.SystemLiteralOnly !== void 0 ? _.systemId = T.groups.SystemLiteralOnly : (_.systemId = T.groups.SystemLiteral, _.publicId = T.groups.PubidLiteral), A.skip(T[0].length);
        } else if (B && A.substringStartsWithCaseInsensitive(e.SYSTEM)) {
          if (A.skip(e.SYSTEM.length), A.skipBlanks() < 1)
            return y.fatalError("Expected whitespace after " + e.SYSTEM + " at position " + A.getIndex());
          if (_.systemId = A.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral), !_.systemId)
            return y.fatalError(
              "Expected " + e.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + e.SYSTEM + " at position " + A.getIndex()
            );
        }
        return B && _.systemId && !e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(_.systemId) && y.warning("Unexpected doctype.systemId in HTML document at position " + A.getIndex()), B || (A.skipBlanks(), _.internalSubset = ee(A, y)), A.skipBlanks(), A.char() !== ">" ? y.fatalError("doctype not terminated with > at position " + A.getIndex()) : (A.skip(1), w.startDTD(_.name, _.publicId, _.systemId, _.internalSubset), w.endDTD(), A.getIndex());
      }
      default:
        return y.fatalError('Not well-formed XML starting with "<!" at position ' + N);
    }
  }
  function te(d, N, w, y) {
    var B = d.substring(N).match(e.PI);
    if (!B)
      return y.fatalError("Invalid processing instruction starting at position " + N);
    if (B[1].toLowerCase() === "xml") {
      if (N > 0)
        return y.fatalError(
          "processing instruction at position " + N + " is an xml declaration which is only at the start of the document"
        );
      if (!e.XMLDecl.test(d.substring(N)))
        return y.fatalError("xml declaration is not well-formed");
    }
    return w.processingInstruction(B[1], B[2]), N + B[0].length;
  }
  function Me() {
    this.attributeNames = /* @__PURE__ */ Object.create(null);
  }
  return Me.prototype = {
    setTagName: function(d) {
      if (!e.QName_exact.test(d))
        throw new Error("invalid tagName:" + d);
      this.tagName = d;
    },
    addValue: function(d, N, w) {
      if (!e.QName_exact.test(d))
        throw new Error("invalid attribute:" + d);
      this.attributeNames[d] = this.length, this[this.length++] = { qName: d, value: N, offset: w };
    },
    length: 0,
    getLocalName: function(d) {
      return this[d].localName;
    },
    getLocator: function(d) {
      return this[d].locator;
    },
    getQName: function(d) {
      return this[d].qName;
    },
    getURI: function(d) {
      return this[d].uri;
    },
    getValue: function(d) {
      return this[d].value;
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
  }, yt.XMLReader = k, yt.parseUtils = K, yt.parseDoctypeCommentOrCData = Ie, yt;
}
var ar;
function Nn() {
  if (ar) return rt;
  ar = 1;
  var t = Dt(), e = kr(), n = _t(), i = vn(), o = An(), a = e.DOMImplementation, h = t.hasDefaultHTMLNamespace, p = t.isHTMLMimeType, f = t.isValidMimeType, m = t.MIME_TYPE, E = t.NAMESPACE, l = n.ParseError, v = o.XMLReader;
  function O(g) {
    return g.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028\u2029]/g, `
`);
  }
  function b(g) {
    if (g = g || {}, g.locator === void 0 && (g.locator = !0), this.assign = g.assign || t.assign, this.domHandler = g.domHandler || C, this.onError = g.onError || g.errorHandler, g.errorHandler && typeof g.errorHandler != "function")
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    g.errorHandler && g.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = g.normalizeLineEndings || O, this.locator = !!g.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), g.xmlns);
  }
  b.prototype.parseFromString = function(g, x) {
    if (!f(x))
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + x + '" is not valid.');
    var F = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), G = i.XML_ENTITIES, K = F[""] || null;
    h(x) ? (G = i.HTML_ENTITIES, K = E.HTML) : x === m.XML_SVG_IMAGE && (K = E.SVG), F[""] = K, F.xml = F.xml || E.XML;
    var ee = new this.domHandler({
      mimeType: x,
      defaultNamespace: K,
      onError: this.onError
    }), Ie = this.locator ? {} : void 0;
    this.locator && ee.setDocumentLocator(Ie);
    var te = new v();
    te.errorHandler = ee, te.domBuilder = ee;
    var Me = !t.isHTMLMimeType(x);
    return Me && typeof g != "string" && te.errorHandler.fatalError("source is not a string"), te.parse(this.normalizeLineEndings(String(g)), F, G), ee.doc.documentElement || te.errorHandler.fatalError("missing root element"), ee.doc;
  };
  function C(g) {
    var x = g || {};
    this.mimeType = x.mimeType || m.XML_APPLICATION, this.defaultNamespace = x.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = x.onError;
  }
  function j(g, x) {
    x.lineNumber = g.lineNumber, x.columnNumber = g.columnNumber;
  }
  C.prototype = {
    /**
     * Either creates an XML or an HTML document and stores it under `this.doc`.
     * If it is an XML document, `this.defaultNamespace` is used to create it,
     * and it will not contain any `childNodes`.
     * If it is an HTML document, it will be created without any `childNodes`.
     *
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
     */
    startDocument: function() {
      var g = new a();
      this.doc = p(this.mimeType) ? g.createHTMLDocument(!1) : g.createDocument(this.defaultNamespace, "");
    },
    startElement: function(g, x, F, G) {
      var K = this.doc, ee = K.createElementNS(g, F || x), Ie = G.length;
      $(this, ee), this.currentElement = ee, this.locator && j(this.locator, ee);
      for (var te = 0; te < Ie; te++) {
        var g = G.getURI(te), Me = G.getValue(te), F = G.getQName(te), d = K.createAttributeNS(g, F);
        this.locator && j(G.getLocator(te), d), d.value = d.nodeValue = Me, ee.setAttributeNode(d);
      }
    },
    endElement: function(g, x, F) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(g, x) {
    },
    endPrefixMapping: function(g) {
    },
    processingInstruction: function(g, x) {
      var F = this.doc.createProcessingInstruction(g, x);
      this.locator && j(this.locator, F), $(this, F);
    },
    ignorableWhitespace: function(g, x, F) {
    },
    characters: function(g, x, F) {
      if (g = k.apply(this, arguments), g) {
        if (this.cdata)
          var G = this.doc.createCDATASection(g);
        else
          var G = this.doc.createTextNode(g);
        this.currentElement ? this.currentElement.appendChild(G) : /^\s*$/.test(g) && this.doc.appendChild(G), this.locator && j(this.locator, G);
      }
    },
    skippedEntity: function(g) {
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
    setDocumentLocator: function(g) {
      g && (g.lineNumber = 0), this.locator = g;
    },
    //LexicalHandler
    comment: function(g, x, F) {
      g = k.apply(this, arguments);
      var G = this.doc.createComment(g);
      this.locator && j(this.locator, G), $(this, G);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(g, x, F, G) {
      var K = this.doc.implementation;
      if (K && K.createDocumentType) {
        var ee = K.createDocumentType(g, x, F, G);
        this.locator && j(this.locator, ee), $(this, ee), this.doc.doctype = ee;
      }
    },
    reportError: function(g, x) {
      if (typeof this.onError == "function")
        try {
          this.onError(g, x, this);
        } catch (F) {
          throw new l("Reporting " + g + ' "' + x + '" caused ' + F, this.locator);
        }
      else
        console.error("[xmldom " + g + "]	" + x, R(this.locator));
    },
    /**
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(g) {
      this.reportError("warning", g);
    },
    error: function(g) {
      this.reportError("error", g);
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
    fatalError: function(g) {
      throw this.reportError("fatalError", g), new l(g, this.locator);
    }
  };
  function R(g) {
    if (g)
      return `
@#[line:` + g.lineNumber + ",col:" + g.columnNumber + "]";
  }
  function k(g, x, F) {
    return typeof g == "string" ? g.substr(x, F) : g.length >= x + F || x ? new java.lang.String(g, x, F) + "" : g;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function(g) {
      C.prototype[g] = function() {
        return null;
      };
    }
  );
  function $(g, x) {
    g.currentElement ? g.currentElement.appendChild(x) : g.doc.appendChild(x);
  }
  function ne(g) {
    if (g === "error") throw "onErrorStopParsing";
  }
  function le() {
    throw "onWarningStopParsing";
  }
  return rt.__DOMHandler = C, rt.DOMParser = b, rt.normalizeLineEndings = O, rt.onErrorStopParsing = ne, rt.onWarningStopParsing = le, rt;
}
var sr;
function bn() {
  if (sr) return H;
  sr = 1;
  var t = Dt();
  H.assign = t.assign, H.hasDefaultHTMLNamespace = t.hasDefaultHTMLNamespace, H.isHTMLMimeType = t.isHTMLMimeType, H.isValidMimeType = t.isValidMimeType, H.MIME_TYPE = t.MIME_TYPE, H.NAMESPACE = t.NAMESPACE;
  var e = _t();
  H.DOMException = e.DOMException, H.DOMExceptionName = e.DOMExceptionName, H.ExceptionCode = e.ExceptionCode, H.ParseError = e.ParseError;
  var n = kr();
  H.Attr = n.Attr, H.CDATASection = n.CDATASection, H.CharacterData = n.CharacterData, H.Comment = n.Comment, H.Document = n.Document, H.DocumentFragment = n.DocumentFragment, H.DocumentType = n.DocumentType, H.DOMImplementation = n.DOMImplementation, H.Element = n.Element, H.Entity = n.Entity, H.EntityReference = n.EntityReference, H.LiveNodeList = n.LiveNodeList, H.NamedNodeMap = n.NamedNodeMap, H.Node = n.Node, H.NodeList = n.NodeList, H.Notation = n.Notation, H.ProcessingInstruction = n.ProcessingInstruction, H.Text = n.Text, H.XMLSerializer = n.XMLSerializer;
  var i = Nn();
  return H.DOMParser = i.DOMParser, H.normalizeLineEndings = i.normalizeLineEndings, H.onErrorStopParsing = i.onErrorStopParsing, H.onWarningStopParsing = i.onWarningStopParsing, H;
}
bn();
const Ut = "USJ";
var xe = {}, qt, cr;
function Cn() {
  return cr || (cr = 1, qt = () => {
    const t = "\\ud800-\\udfff", h = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", p = "\\ufe0e\\ufe0f", f = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", m = `[${t}]`, E = `[${h}]`, l = "\\ud83c[\\udffb-\\udfff]", v = `(?:${E}|${l})`, O = `[^${t}]`, b = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", C = "[\\ud800-\\udbff][\\udc00-\\udfff]", j = "\\u200d", R = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", k = `[${f}]`, $ = `${v}?`, ne = `[${p}]?`, le = `(?:${j}(?:${[O, b, C].join("|")})${ne + $})*`, g = ne + $ + le, F = `(?:${[`${O}${E}?`, E, b, C, m, k].join("|")})`;
    return new RegExp(`${R}|${l}(?=${l})|${F + g}`, "g");
  }), qt;
}
var lr;
function yn() {
  if (lr) return xe;
  lr = 1;
  var t = xe && xe.__importDefault || function(f) {
    return f && f.__esModule ? f : { default: f };
  };
  Object.defineProperty(xe, "__esModule", { value: !0 });
  var e = t(Cn());
  function n(f) {
    if (typeof f != "string")
      throw new Error("A string is expected as input");
    return f.match(e.default()) || [];
  }
  xe.toArray = n;
  function i(f) {
    if (typeof f != "string")
      throw new Error("Input must be a string");
    var m = f.match(e.default());
    return m === null ? 0 : m.length;
  }
  xe.length = i;
  function o(f, m, E) {
    if (m === void 0 && (m = 0), typeof f != "string")
      throw new Error("Input must be a string");
    (typeof m != "number" || m < 0) && (m = 0), typeof E == "number" && E < 0 && (E = 0);
    var l = f.match(e.default());
    return l ? l.slice(m, E).join("") : "";
  }
  xe.substring = o;
  function a(f, m, E) {
    if (m === void 0 && (m = 0), typeof f != "string")
      throw new Error("Input must be a string");
    var l = i(f);
    if (typeof m != "number" && (m = parseInt(m, 10)), m >= l)
      return "";
    m < 0 && (m += l);
    var v;
    typeof E > "u" ? v = l : (typeof E != "number" && (E = parseInt(E, 10)), v = E >= 0 ? E + m : m);
    var O = f.match(e.default());
    return O ? O.slice(m, v).join("") : "";
  }
  xe.substr = a;
  function h(f, m, E, l) {
    if (m === void 0 && (m = 16), E === void 0 && (E = "#"), l === void 0 && (l = "right"), typeof f != "string" || typeof m != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(l) === -1)
      throw new Error("Pad position should be either left or right");
    typeof E != "string" && (E = String(E));
    var v = i(f);
    if (v > m)
      return o(f, 0, m);
    if (v < m) {
      var O = E.repeat(m - v);
      return l === "left" ? O + f : f + O;
    }
    return f;
  }
  xe.limit = h;
  function p(f, m, E) {
    if (E === void 0 && (E = 0), typeof f != "string")
      throw new Error("Input must be a string");
    if (f === "")
      return m === "" ? 0 : -1;
    E = Number(E), E = isNaN(E) ? 0 : E, m = String(m);
    var l = n(f);
    if (E >= l.length)
      return m === "" ? l.length : -1;
    if (m === "")
      return E;
    var v = n(m), O = !1, b;
    for (b = E; b < l.length; b += 1) {
      for (var C = 0; C < v.length && v[C] === l[b + C]; )
        C += 1;
      if (C === v.length && v[C - 1] === l[b + C - 1]) {
        O = !0;
        break;
      }
    }
    return O ? b : -1;
  }
  return xe.indexOf = p, xe;
}
var ot = yn();
function qr(t) {
  return t ? Array.isArray(t) ? t : [t] : [];
}
function xt(t, e) {
  if (!(e > ce(t) || e < -ce(t)))
    return Pt(t, e, 1);
}
function Et(t, e) {
  return e < 0 || e > ce(t) - 1 ? "" : Pt(t, e, 1);
}
function Zu(t, e) {
  if (!(e < 0 || e > ce(t) - 1))
    return Pt(t, e, 1).codePointAt(0);
}
function Tn(t, e, n = ce(t)) {
  const i = In(t, e);
  return !(i === -1 || i + ce(e) !== n);
}
function wn(t, e, n) {
  if (e < 0) return -1;
  if (n) {
    if (Et(t, e) === "}" && Et(t, e - 1) === "\\") return e;
    const a = St(t, "\\}", e);
    return a >= 0 ? a + 1 : a;
  }
  let i = e;
  const o = ce(t);
  for (; i < o && (i = St(t, "}", i), !(i === -1 || Et(t, i - 1) !== "\\")); )
    i += 1;
  return i >= o ? -1 : i;
}
function Sn(t, e) {
  const n = [];
  let i = 0, o = 0;
  function a(p, f, m) {
    const E = ut(t, o, f), l = n.length > 0 && Be(n[n.length - 1]) ? `${n.pop()}${E}` : E;
    Be(p) ? n.push(`${l}${p}`) : (l && n.push(l), n.push(p)), o = f + m;
  }
  const h = ce(t);
  for (; i < h; ) {
    switch (Et(t, i)) {
      case "{":
        if (Et(t, i - 1) !== "\\") {
          const p = wn(t, i, !1);
          if (p >= 0) {
            const f = ut(t, i + 1, p), m = f in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[f]
            ) : f;
            a(m, i, p + 1 - i), i = p, o = p + 1;
          }
        } else
          a("{", i - 1, 2);
        break;
      case "}":
        Et(t, i - 1) !== "\\" || a("}", i - 1, 2);
        break;
    }
    i += 1;
  }
  if (o < h) {
    const p = ut(t, o);
    n.push(
      n.length > 0 && Be(n[n.length - 1]) ? `${n.pop()}${p}` : p
    );
  }
  return n;
}
function ei(t, e) {
  return Sn(t, e).map((n) => `${n}`).join("");
}
function On(t, e, n = 0) {
  const i = ut(t, n);
  return St(i, e) !== -1;
}
function St(t, e, n = 0) {
  return ot.indexOf(t, e, n);
}
function In(t, e, n) {
  let i = n === void 0 ? ce(t) : n;
  i < 0 ? i = 0 : i >= ce(t) && (i = ce(t) - 1);
  for (let o = i; o >= 0; o--)
    if (Pt(t, o, ce(e)) === e)
      return o;
  return -1;
}
function ce(t) {
  return ot.length(t);
}
function ti(t, e) {
  const n = e.toUpperCase();
  return n === "NONE" ? t : t.normalize(n);
}
function ri(t, e, n) {
  return t.localeCompare(e, "en", n);
}
function ni(t, e, n = " ") {
  return e <= ce(t) ? t : ot.limit(t, e, n, "right");
}
function ui(t, e, n = " ") {
  return e <= ce(t) ? t : ot.limit(t, e, n, "left");
}
function fr(t, e) {
  return e > t ? t : e < -t ? 0 : e < 0 ? e + t : e;
}
function pr(t, e, n) {
  const i = ce(t);
  if (e > i || n && (e > n && !(e >= 0 && e < i && n < 0 && n > -i) || n < -i))
    return "";
  const o = fr(i, e), a = n ? fr(i, n) : void 0;
  return ut(t, o, a);
}
function hr(t, e, n) {
  const i = [];
  if (n !== void 0 && n <= 0)
    return [t];
  if (e === "") return xn(t).slice(0, n);
  let o = e;
  (typeof e == "string" || e instanceof RegExp && !On(e.flags, "g")) && (o = new RegExp(e, "g"));
  const a = t.match(o);
  let h = 0;
  if (!a) return [t];
  for (let p = 0; p < (n ? n - 1 : a.length); p++) {
    const f = St(t, a[p], h), m = ce(a[p]);
    if (i.push(ut(t, h, f)), h = f + m, n !== void 0 && i.length === n)
      break;
  }
  return i.push(ut(t, h)), i;
}
function Ur(t, e, n = 0) {
  return St(t, e, n) === n;
}
function Pt(t, e = 0, n = ce(t) - e) {
  return ot.substr(t, e, n);
}
function ut(t, e, n = ce(t)) {
  return ot.substring(t, e, n);
}
function xn(t) {
  return ot.toArray(t);
}
function ii(t) {
  return Ur(t, "%") && Tn(t, "%");
}
function oi(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function ai(t) {
  return t ? qr(t).map(
    (i) => Array.isArray(i) ? i.map((o) => new RegExp(o)) : new RegExp(i)
  ) : [];
}
function si(t) {
  return t ? qr(t).map((i) => new RegExp(i)) : [];
}
const Bn = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function mt(t) {
  return Bn.test(t);
}
function ci(t) {
  let e = "";
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    if (i === i.toUpperCase() && i !== i.toLowerCase()) {
      if (n > 0) {
        const a = t[n - 1];
        if (!(a === a.toUpperCase() && a !== a.toLowerCase()))
          e += "-";
        else if (n + 1 < t.length) {
          const p = t[n + 1];
          p === p.toLowerCase() && p !== p.toUpperCase() && (e += "-");
        }
      }
      e += i.toLowerCase();
    } else
      e += i;
  }
  return e;
}
const jt = ["chapter", "book", "para", "row", "sidebar", Ut], Mn = "​", jr = [
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
], Rn = 1, _n = jr.length - 1, Pn = 1, Ln = 1, li = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, Fn = (t) => {
  var e;
  return ((e = jr[t]) == null ? void 0 : e.chapters) ?? -1;
}, fi = (t, e) => ({
  book: be.bookNumberToId(
    Math.max(
      Rn,
      Math.min(be.bookIdToNumber(t.book) + e, _n)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), pi = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(Pn, t.chapterNum + e),
    Fn(be.bookIdToNumber(t.book))
  ),
  verseNum: 1
}), hi = (t, e) => ({
  ...t,
  verseNum: Math.max(Ln, t.verseNum + e)
});
async function di(t, e, n) {
  const i = be.bookNumberToId(t);
  if (!Ur(Intl.getCanonicalLocales(e)[0], "zh"))
    return n({
      localizeKey: `LocalizedId.${i}`,
      languagesToSearch: [e]
    });
  const o = await n({
    localizeKey: `Book.${i}`,
    languagesToSearch: [e]
  }), a = hr(o, "-");
  return hr(a[0], "ÿ08")[0].trim();
}
function mi(t) {
  return new Lr(be.bookIdToNumber(t.book), t.chapterNum, t.verseNum).BBBCCC;
}
function dr(t) {
  return new Lr(be.bookIdToNumber(t.book), t.chapterNum, t.verseNum).BBBCCCVVV;
}
function Ei(t, e) {
  return dr(t) - dr(e);
}
function kn(t) {
  return `%scrollGroup_${t}%`;
}
function gi(t) {
  return t.map((e) => kn(e));
}
function Di(t, e, n, i) {
  let o;
  switch (e ?? "id") {
    case "English":
      o = be.bookIdToEnglishName(t.book);
      break;
    case "id":
      o = t.book;
      break;
    default:
      o = e ?? "";
      break;
  }
  return `${o}${i ?? " "}${t.chapterNum}${n ?? ":"}${t.verseNum}`;
}
const qn = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function mr(t) {
  return qn.test(t);
}
const Un = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function jn(t) {
  return Un.test(t);
}
function Er(t) {
  let e = "", n = !1, i = "\0";
  for (let o = 0; o < t.length; o += 1) {
    const a = t[o];
    a.charCodeAt(0) < 32 ? (n || (e += " "), n = !0) : !n && a === Mn && o + 1 < t.length && mr(t[o + 1]) || (mr(a) ? (n || (e += a), n = !0) : jn(a) && i === a || (e += a, n = !1)), i = a;
  }
  return e;
}
function gr(t) {
  return !t || t.length === 0 ? !0 : t.length === 1 && (t[0] === void 0 || t[0] === "");
}
function Dr(t, e) {
  if (!e || !jt.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(t)} does not have a content array! This should not happen!`
    );
  return t === e.content[e.content.length - 1];
}
function $r(t, e, n, i) {
  if (!t && !n) return !0;
  if (!t || !n) return !1;
  const o = Be(t), a = Be(n);
  if (o && a) {
    const h = Er(t), p = Er(n);
    if (h !== p) {
      if (!mt(xt(h, -1) ?? "") && !mt(xt(p, -1) ?? "") || !Dr(t, e) || !Dr(n, i)) return !1;
      let f = h;
      for (; mt(xt(f, -1) ?? ""); ) f = pr(f, 0, -1);
      let m = p;
      for (; mt(xt(m, -1) ?? ""); ) m = pr(m, 0, -1);
      if (f !== m) return !1;
    }
  } else if (!o && !a) {
    const h = t, p = n, f = Object.keys(h).filter(
      (l) => l !== "content"
    );
    if (f.length !== Object.keys(p).filter((l) => l !== "content").length || f.some((l) => !(l in p) || h[l] !== p[l])) return !1;
    const m = gr(h.content), E = gr(p.content);
    if (m !== E) return !1;
    if (!m && !E) {
      let l = h.content, v = p.content;
      const O = l[l.length - 1];
      jt.includes(h.type) && Be(O) && mt(O) && (l = l.slice(0, -1));
      const b = v[v.length - 1];
      if (jt.includes(p.type) && Be(b) && mt(b) && (v = v.slice(0, -1)), l.length !== v.length) return !1;
      for (let C = 0; C < l.length; C += 1)
        if (!$r(l[C], h, v[C], p))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function vi(t, e) {
  return $r(t, void 0, e, void 0);
}
const Ai = (t) => (...e) => t.map((i) => i(...e)).every((i) => i), Ni = (t) => async (...e) => {
  const n = t.map(async (i) => i(...e));
  return (await Promise.all(n)).every((i) => i);
}, Bt = "chapter", Mt = "verse";
var $n = Object.getOwnPropertyNames, Vn = Object.getOwnPropertySymbols, Gn = Object.prototype.hasOwnProperty;
function vr(t, e) {
  return function(i, o, a) {
    return t(i, o, a) && e(i, o, a);
  };
}
function Rt(t) {
  return function(n, i, o) {
    if (!n || !i || typeof n != "object" || typeof i != "object")
      return t(n, i, o);
    var a = o.cache, h = a.get(n), p = a.get(i);
    if (h && p)
      return h === i && p === n;
    a.set(n, i), a.set(i, n);
    var f = t(n, i, o);
    return a.delete(n), a.delete(i), f;
  };
}
function Ar(t) {
  return $n(t).concat(Vn(t));
}
var zn = Object.hasOwn || function(t, e) {
  return Gn.call(t, e);
};
function at(t, e) {
  return t === e || !t && !e && t !== t && e !== e;
}
var Hn = "__v", Jn = "__o", Xn = "_owner", Nr = Object.getOwnPropertyDescriptor, br = Object.keys;
function Yn(t, e, n) {
  var i = t.length;
  if (e.length !== i)
    return !1;
  for (; i-- > 0; )
    if (!n.equals(t[i], e[i], i, i, t, e, n))
      return !1;
  return !0;
}
function Wn(t, e) {
  return at(t.getTime(), e.getTime());
}
function Kn(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack;
}
function Qn(t, e) {
  return t === e;
}
function Cr(t, e, n) {
  var i = t.size;
  if (i !== e.size)
    return !1;
  if (!i)
    return !0;
  for (var o = new Array(i), a = t.entries(), h, p, f = 0; (h = a.next()) && !h.done; ) {
    for (var m = e.entries(), E = !1, l = 0; (p = m.next()) && !p.done; ) {
      if (o[l]) {
        l++;
        continue;
      }
      var v = h.value, O = p.value;
      if (n.equals(v[0], O[0], f, l, t, e, n) && n.equals(v[1], O[1], v[0], O[0], t, e, n)) {
        E = o[l] = !0;
        break;
      }
      l++;
    }
    if (!E)
      return !1;
    f++;
  }
  return !0;
}
var Zn = at;
function eu(t, e, n) {
  var i = br(t), o = i.length;
  if (br(e).length !== o)
    return !1;
  for (; o-- > 0; )
    if (!Vr(t, e, n, i[o]))
      return !1;
  return !0;
}
function Tt(t, e, n) {
  var i = Ar(t), o = i.length;
  if (Ar(e).length !== o)
    return !1;
  for (var a, h, p; o-- > 0; )
    if (a = i[o], !Vr(t, e, n, a) || (h = Nr(t, a), p = Nr(e, a), (h || p) && (!h || !p || h.configurable !== p.configurable || h.enumerable !== p.enumerable || h.writable !== p.writable)))
      return !1;
  return !0;
}
function tu(t, e) {
  return at(t.valueOf(), e.valueOf());
}
function ru(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function yr(t, e, n) {
  var i = t.size;
  if (i !== e.size)
    return !1;
  if (!i)
    return !0;
  for (var o = new Array(i), a = t.values(), h, p; (h = a.next()) && !h.done; ) {
    for (var f = e.values(), m = !1, E = 0; (p = f.next()) && !p.done; ) {
      if (!o[E] && n.equals(h.value, p.value, h.value, p.value, t, e, n)) {
        m = o[E] = !0;
        break;
      }
      E++;
    }
    if (!m)
      return !1;
  }
  return !0;
}
function nu(t, e) {
  var n = t.length;
  if (e.length !== n)
    return !1;
  for (; n-- > 0; )
    if (t[n] !== e[n])
      return !1;
  return !0;
}
function uu(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password;
}
function Vr(t, e, n, i) {
  return (i === Xn || i === Jn || i === Hn) && (t.$$typeof || e.$$typeof) ? !0 : zn(e, i) && n.equals(t[i], e[i], i, i, t, e, n);
}
var iu = "[object Arguments]", ou = "[object Boolean]", au = "[object Date]", su = "[object Error]", cu = "[object Map]", lu = "[object Number]", fu = "[object Object]", pu = "[object RegExp]", hu = "[object Set]", du = "[object String]", mu = "[object URL]", Eu = Array.isArray, Tr = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, wr = Object.assign, gu = Object.prototype.toString.call.bind(Object.prototype.toString);
function Du(t) {
  var e = t.areArraysEqual, n = t.areDatesEqual, i = t.areErrorsEqual, o = t.areFunctionsEqual, a = t.areMapsEqual, h = t.areNumbersEqual, p = t.areObjectsEqual, f = t.arePrimitiveWrappersEqual, m = t.areRegExpsEqual, E = t.areSetsEqual, l = t.areTypedArraysEqual, v = t.areUrlsEqual;
  return function(b, C, j) {
    if (b === C)
      return !0;
    if (b == null || C == null)
      return !1;
    var R = typeof b;
    if (R !== typeof C)
      return !1;
    if (R !== "object")
      return R === "number" ? h(b, C, j) : R === "function" ? o(b, C, j) : !1;
    var k = b.constructor;
    if (k !== C.constructor)
      return !1;
    if (k === Object)
      return p(b, C, j);
    if (Eu(b))
      return e(b, C, j);
    if (Tr != null && Tr(b))
      return l(b, C, j);
    if (k === Date)
      return n(b, C, j);
    if (k === RegExp)
      return m(b, C, j);
    if (k === Map)
      return a(b, C, j);
    if (k === Set)
      return E(b, C, j);
    var $ = gu(b);
    return $ === au ? n(b, C, j) : $ === pu ? m(b, C, j) : $ === cu ? a(b, C, j) : $ === hu ? E(b, C, j) : $ === fu ? typeof b.then != "function" && typeof C.then != "function" && p(b, C, j) : $ === mu ? v(b, C, j) : $ === su ? i(b, C, j) : $ === iu ? p(b, C, j) : $ === ou || $ === lu || $ === du ? f(b, C, j) : !1;
  };
}
function vu(t) {
  var e = t.circular, n = t.createCustomConfig, i = t.strict, o = {
    areArraysEqual: i ? Tt : Yn,
    areDatesEqual: Wn,
    areErrorsEqual: Kn,
    areFunctionsEqual: Qn,
    areMapsEqual: i ? vr(Cr, Tt) : Cr,
    areNumbersEqual: Zn,
    areObjectsEqual: i ? Tt : eu,
    arePrimitiveWrappersEqual: tu,
    areRegExpsEqual: ru,
    areSetsEqual: i ? vr(yr, Tt) : yr,
    areTypedArraysEqual: i ? Tt : nu,
    areUrlsEqual: uu
  };
  if (n && (o = wr({}, o, n(o))), e) {
    var a = Rt(o.areArraysEqual), h = Rt(o.areMapsEqual), p = Rt(o.areObjectsEqual), f = Rt(o.areSetsEqual);
    o = wr({}, o, {
      areArraysEqual: a,
      areMapsEqual: h,
      areObjectsEqual: p,
      areSetsEqual: f
    });
  }
  return o;
}
function Au(t) {
  return function(e, n, i, o, a, h, p) {
    return t(e, n, p);
  };
}
function Nu(t) {
  var e = t.circular, n = t.comparator, i = t.createState, o = t.equals, a = t.strict;
  if (i)
    return function(f, m) {
      var E = i(), l = E.cache, v = l === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : l, O = E.meta;
      return n(f, m, {
        cache: v,
        equals: o,
        meta: O,
        strict: a
      });
    };
  if (e)
    return function(f, m) {
      return n(f, m, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: o,
        meta: void 0,
        strict: a
      });
    };
  var h = {
    cache: void 0,
    equals: o,
    meta: void 0,
    strict: a
  };
  return function(f, m) {
    return n(f, m, h);
  };
}
var bu = ze();
ze({ strict: !0 });
ze({ circular: !0 });
ze({
  circular: !0,
  strict: !0
});
ze({
  createInternalComparator: function() {
    return at;
  }
});
ze({
  strict: !0,
  createInternalComparator: function() {
    return at;
  }
});
ze({
  circular: !0,
  createInternalComparator: function() {
    return at;
  }
});
ze({
  circular: !0,
  createInternalComparator: function() {
    return at;
  },
  strict: !0
});
function ze(t) {
  t === void 0 && (t = {});
  var e = t.circular, n = e === void 0 ? !1 : e, i = t.createInternalComparator, o = t.createState, a = t.strict, h = a === void 0 ? !1 : a, p = vu(t), f = Du(p), m = i ? i(f) : Au(f);
  return Nu({ circular: n, comparator: f, createState: o, equals: m, strict: h });
}
function Cu(t, e) {
  return bu(t, e);
}
function yu(t, e) {
  if (typeof t != typeof e) return !1;
  if (!t && !e) return !0;
  if (Array.isArray(t)) {
    const a = e, h = t;
    return a.length === 0 ? !0 : a.every((p) => h.includes(p));
  }
  if (typeof t != "object")
    return Cu(t, e);
  const n = e, i = t;
  let o = !0;
  return Object.keys(n).forEach((a) => {
    o && (Object.hasOwn(i, a) && yu(i[a], n[a]) || (o = !1));
  }), o;
}
function Sr(t, e, n) {
  return JSON.stringify(t, (o, a) => {
    let h = a;
    return e && (h = e(o, h)), h === void 0 && (h = null), h;
  }, n);
}
function Tu(t, e) {
  function n(o) {
    return Object.keys(o).forEach((a) => {
      o[a] === null ? o[a] = void 0 : typeof o[a] == "object" && (o[a] = n(o[a]));
    }), o;
  }
  const i = JSON.parse(t, e);
  if (i !== null)
    return typeof i == "object" ? n(i) : i;
}
function bi(t) {
  try {
    const e = Sr(t);
    return e === Sr(Tu(e));
  } catch {
    return !1;
  }
}
const Ci = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function yi() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0] : new Wr().resolvedOptions().locale;
}
function Ti(t, e = 2) {
  if (t === 0) return "0 Bytes";
  const n = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(t) / Math.log(1024)), o = n[i];
  return `${new un("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(t / 1024 ** i)} ${o}`;
}
const wu = 1e3, Gr = 60, zr = Gr * 60, Su = zr * 24;
function wi(t, e, n = /* @__PURE__ */ new Date()) {
  const i = Math.floor((e.getTime() - n.getTime()) / wu), o = Math.round(i / Su);
  if (Math.abs(o) >= 1) return t.format(o, "day");
  const a = Math.round(i / zr);
  if (Math.abs(a) >= 1) return t.format(a, "hour");
  const h = Math.round(i / Gr);
  return Math.abs(h) >= 1 ? t.format(h, "minute") : t.format(i, "second");
}
const zt = {
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
        description: "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should be included.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to pass):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to all {@link ProjectInterfaces}, so all projects that do not match `excludeProjectInterfaces` will be included\n\n@example\n\n```typescript\nincludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed on projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
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
        description: "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should absolutely not be included even if they match with `includeProjectInterfaces`.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to exclude the project):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition and exclude the project\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition and exclude the project\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to no {@link ProjectInterfaces}, so all projects that match `includeProjectInterfaces` will be included\n\n@example\n\n```typescript\nexcludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed and exclude projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
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
function Ht(t) {
  t && Object.values(t).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && Ht(e.properties);
    }
  });
}
Ht(zt);
const Ou = {
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
  $defs: zt
};
Object.freeze(Ou);
const Iu = {
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
  $defs: zt
};
Object.freeze(Iu);
const Hr = {
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
      }
    }
  },
  localizeKey: {
    description: "Identifier for a string that will be localized based on the user's UI language",
    type: "string",
    pattern: "^%[\\w\\-\\.]+%$",
    tsType: "LocalizeKey"
  }
};
Ht(Hr);
const xu = {
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
  $defs: Hr
};
Object.freeze(xu);
const Bu = {
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
Object.freeze(Bu);
const je = ["figure", "note", "sidebar", "table"];
Object.freeze(je);
class Ee {
  constructor(e) {
    W(this, "usj");
    W(this, "parentMapInternal");
    this.usj = e;
  }
  // If new variables are created to speed up queries, they should be reset here
  usjChanged() {
    this.parentMapInternal = void 0;
  }
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(e) {
    const n = Wt({ path: e, json: this.usj, wrap: !0 });
    if (n === void 0 || n.length === 0) return;
    if (!Array.isArray(n[0])) return n[0];
    const i = Wt({ path: e, json: this.usj, wrap: !1 });
    return i.length === 1 && Array.isArray(i[0]) ? i[0] : i;
  }
  findParent(e) {
    return this.findSingleValue(`${e}^`);
  }
  findBookId() {
    return this.findSingleValue('$.content[?(@.type=="book" && @.marker=="id")].code');
  }
  findChapterNode(e) {
    const n = `$..content[?(@.type=="chapter" && @.number=="${e}")]`;
    return this.findSingleValue(n);
  }
  // #endregion
  // #region Parent Maps
  static createParentMapInternal(e, n, i) {
    var o;
    i.set(e, n), e.content && i.set(e.content, e), (o = e.content) == null || o.forEach((a) => {
      typeof a == "object" && Ee.createParentMapInternal(a, e, i);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((n) => {
      typeof n == "object" && Ee.createParentMapInternal(n, this.usj, e);
    }), e;
  }
  /** Create the parent map if it doesn't already exist and return it */
  get parentMap() {
    return this.parentMapInternal ? this.parentMapInternal : (this.parentMapInternal = this.createUsjParentMap(), this.parentMapInternal);
  }
  // #endregion
  // #region Working Stacks
  /** Return the working stack applicable to the given node */
  createWorkingStack(e) {
    const n = [], { parentMap: i } = this;
    let o = e, a = i.get(o);
    for (; a !== void 0; ) {
      if (!a.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !a.content.find((h, p) => {
          if (h !== o) return !1;
          if (!a) throw new Error('undefined "tempParent" should not be possible');
          return n.unshift({ parent: a, index: p }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(o)}`);
      if (a.type === Ut) break;
      o = a, a = i.get(a);
    }
    return n;
  }
  static convertWorkingStackToJsonPath(e) {
    let n = "$";
    return e.forEach((i) => {
      n = `${n}.content[${i.index}]`;
    }), n;
  }
  convertJsonPathToWorkingStack(e) {
    const n = [], i = e.match(/content\[(\d+)\]/g);
    if (!i) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let o = this.usj;
    return i.forEach((a, h) => {
      const p = /(\d+)/.exec(a);
      if (!p) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const f = parseInt(p[0], 10);
      if (n.push({ parent: o, index: f }), h + 1 < i.length) {
        if (typeof o == "string" || !o.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(o)}`);
        const m = o.content[f];
        if (typeof m == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(m)}`);
        o = m;
      }
    }), n;
  }
  // #endregion
  // #region Walk the node tree
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
  static findRightMostDescendantMarkerObject(e, n, i = []) {
    if (!e.content) return { node: e, parent: n };
    for (let o = e.content.length - 1; o >= 0; o--) {
      const a = e.content[o];
      if (typeof a == "object" && !i.includes(a.type))
        return a.content ? this.findRightMostDescendantMarkerObject(a, e, i) : { node: a, parent: e };
    }
    return { node: e, parent: n };
  }
  static findNextMatchingNodeUsingWorkingStack(e, n, i, o) {
    var h;
    let a = e;
    for (; a !== void 0; ) {
      const p = typeof a == "object" && i.includes(a.type);
      if (!p && o(a, n)) return a;
      if (!p && typeof a == "object" && (((h = a.content) == null ? void 0 : h.length) ?? 0) > 0)
        n.push({ parent: a, index: 0 }), [a] = a.content;
      else
        for (a = void 0; n.length > 0; ) {
          const f = n.pop();
          if (f && f.index + 1 < f.parent.content.length) {
            f.index += 1, n.push(f), a = f.parent.content[f.index];
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
  findNextMatchingNode(e, n, i) {
    const o = this.createWorkingStack(e);
    return Ee.findNextMatchingNodeUsingWorkingStack(
      e,
      o,
      n,
      i
    );
  }
  // #endregion
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return Ee.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion
  // #region USJ + node -> SerializedVerseRef + offset
  /** Find the chapter and verse that apply to a given USJ node */
  findVerseRefForNode(e, n, i = {
    chapterNum: void 0,
    verseNum: void 0,
    startingContentNode: void 0
  }) {
    if (i.verseNum !== void 0 && i.chapterNum !== void 0) return i;
    if (typeof e == "object" && e.number !== void 0) {
      const f = Number.parseInt(e.number, 10);
      if (e.type === Bt)
        return i.chapterNum = f, i.verseNum = i.verseNum ?? 0, i.startingContentNode = i.startingContentNode ?? e, i;
      e.type === Mt && !i.verseNum && (i.verseNum = f, i.startingContentNode = e);
    }
    if (!n.content)
      throw new Error(`"content" array not found: ${JSON.stringify(n)}`);
    let o = 0;
    for (let f = 0; f < n.content.length; f++)
      if (n.content[f] === e) {
        o = f;
        break;
      }
    let a = o - 1;
    for (; a >= 0 && typeof n.content[a] != "object"; )
      a -= 1;
    if (a < 0) {
      if (n.type === Ut)
        return i.chapterNum === void 0 && (i.chapterNum = 1, i.verseNum = 0, i.startingContentNode = void 0), i;
      const f = n, m = this.parentMap.get(f);
      if (!m) throw new Error(`No parent found for ${JSON.stringify(n)}`);
      return this.findVerseRefForNode(f, m, i);
    }
    const h = n.content[a], p = Ee.findRightMostDescendantMarkerObject(
      h,
      n,
      je
    );
    return this.findVerseRefForNode(p.node, p.parent, i);
  }
  nodeToVerseRefAndOffset(e, n, i) {
    if (typeof n == "string" && i === void 0)
      throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
    let o;
    if (i === void 0 ? o = this.parentMap.get(n) : o = Array.isArray(i) ? this.parentMap.get(i) : i, o === void 0)
      throw new Error(`Cannot find parent for ${JSON.stringify(i)}`);
    const a = this.findVerseRefForNode(n, o);
    if (!a) return;
    if (!a.chapterNum)
      throw new Error(`Could not determine chapter number for ${JSON.stringify(n)}`);
    const h = {
      book: e,
      chapterNum: a.chapterNum,
      verseNum: a.verseNum ?? 0
    };
    let p = 0;
    return a.startingContentNode !== void 0 && this.findNextMatchingNode(a.startingContentNode, [], (f, m) => {
      var E, l;
      return f === n ? !0 : m.find((v) => je.includes(v.parent.type)) ? !1 : typeof f == "string" ? (p += f.length, !1) : f.type === Bt && f.number !== ((E = a.chapterNum) == null ? void 0 : E.toString()) || f.type === Mt && f.number !== ((l = a.verseNum) == null ? void 0 : l.toString()) ? (p = 0, !0) : !1;
    }), { verseRef: h, offset: p };
  }
  // #endregion
  // #region JSONPath -> SerializedVerseRef + offset
  jsonPathToVerseRefAndOffset(e, n) {
    const i = n ?? this.findBookId();
    if (!i) throw new Error("Not able to determine the book ID");
    const o = this.findSingleValue(e);
    if (!o) throw new Error(`No result found for JSONPath query: ${e}`);
    const a = this.findParent(e);
    if (!a) throw new Error(`Could not determine parent for ${e}`);
    const h = this.nodeToVerseRefAndOffset(i, o, a);
    if (!h)
      throw new Error(
        `Could not determine SerializedVerseRef that corresponds to ${e}`
      );
    return h;
  }
  // #endregion
  // #region SerializedVerseRef + offset -> Node + JSONPath + offset
  verseRefToUsjContentLocation(e, n = 0) {
    if (n < 0) throw new Error("offset must be >= 0");
    const i = this.findBookId() ?? e.book;
    if (!i) throw new Error("Not able to determine the book ID");
    if (i !== e.book)
      throw new Error(`Book IDs don't match: USJ=${i}, SerializedVerseRef=${e.book}`);
    const o = this.findChapterNode(e.chapterNum);
    if (o === void 0)
      throw new Error(`Could not find ${i} chapter ${e.chapterNum}`);
    let a = !1, h = "";
    const p = e.verse ?? e.verseNum.toString(), f = this.findNextMatchingNode(
      o,
      je,
      (v, O) => v === o ? e.verseNum === 0 ? (h = Ee.convertWorkingStackToJsonPath(O), !0) : !1 : typeof v != "object" ? !1 : v.type === Bt ? (a = !0, !0) : v.type === Mt && v.number !== void 0 && v.number === p ? (h = Ee.convertWorkingStackToJsonPath(O), !0) : !1
    );
    if (a || f === void 0 || typeof f == "string")
      throw new Error(`Verse ${p} not found in ${i} ${e.chapterNum}`);
    if (n === 0) return { node: f, offset: 0, jsonPath: h };
    let m = 0, E = 0, l;
    return this.findNextMatchingNode(
      f,
      je,
      (v, O) => {
        if (v === f) return !1;
        if (typeof v == "string") {
          if (m += v.length, m > n)
            return h = Ee.convertWorkingStackToJsonPath(O), E = n - m + v.length, l = v, !0;
        } else if (v.type === Bt || v.type === Mt) return !0;
        return !1;
      }
    ), { node: l ?? f, offset: E, jsonPath: h };
  }
  // #endregion
  // #region Search for text from a node + JSONPath + offset
  findNextLocationOfMatchingText(e, n, i = 1e3) {
    let o = "", a = 0, h = 0, p = 0;
    if (Ee.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      je,
      (l) => {
        if (typeof l != "string") return !1;
        a += l.length, o = `${o}${l}`;
        const v = o.indexOf(n);
        return v < 0 ? (h += o.length, o.length > n.length && (o = o.substring(o.length - n.length)), h -= o.length, a > i) : (p = h + v, !0);
      }
    ), p <= 0) return;
    a = 0;
    let f = 0, m = [];
    const E = Ee.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      je,
      (l, v) => typeof l != "string" || (a += l.length, a < p + 1) ? !1 : (f = p - a + l.length, m = v, !0)
    );
    if (!E) throw new Error("Internal error: inconsistent search results");
    return {
      node: E,
      offset: f,
      jsonPath: Ee.convertWorkingStackToJsonPath(m)
    };
  }
  // #endregion
  // #region Extract text from a node + JSONPath + offset
  extractText(e, n) {
    let i = "", o = e.offset, a = 0;
    return Ee.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      je,
      (h) => {
        if (typeof h != "string") return !1;
        if (o >= h.length)
          return o -= h.length, !1;
        let p = h;
        if (o > 0 && (p = p.substring(o), o = 0), a + p.length < n)
          return a += p.length, i = `${i}${p}`, !1;
        const f = n - a;
        return i = `${i}${p.substring(0, f - 1)}`, !0;
      }
    ), i;
  }
  extractTextBetweenPoints(e, n, i = 100) {
    let o = "";
    return Ee.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      je,
      (a, h) => a === n.node && (typeof a == "object" || n.jsonPath === Ee.convertWorkingStackToJsonPath(h)) ? !0 : typeof a != "string" ? !1 : (o = `${o}${a}`, o.length > i && (o = o.substring(0, i)), o.length >= i)
    ), o;
  }
  // #endregion
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, n) {
    let i = 0;
    for (let o = e.length - 1; o >= 0; o--) {
      const a = e[o];
      n(a) ? (e.splice(o, 1), i += 1) : typeof a != "string" && a.content && (i += this.removeContentNodesFromArray(a.content, n));
    }
    return i;
  }
  removeContentNodes(e) {
    const n = Ee.removeContentNodesFromArray(this.usj.content, e);
    return this.usjChanged(), n;
  }
  // #endregion
}
export {
  Pu as AsyncVariable,
  Bt as CHAPTER_TYPE,
  Lu as Collator,
  Wr as DateTimeFormat,
  tn as DocumentCombiner,
  zu as EventRollingTimeCounter,
  Rn as FIRST_SCR_BOOK_NUM,
  Pn as FIRST_SCR_CHAPTER_NUM,
  Ln as FIRST_SCR_VERSE_NUM,
  _n as LAST_SCR_BOOK_NUM,
  nn as Mutex,
  Hu as MutexMap,
  Ju as NonValidatingDocumentCombiner,
  un as NumberFormat,
  It as PLATFORM_ERROR_VERSION,
  Kr as PlatformEventEmitter,
  Xu as PromiseChainingMap,
  Yu as UnsubscriberAsyncList,
  Ee as UsjReaderWriter,
  Mt as VERSE_TYPE,
  Ni as aggregateUnsubscriberAsyncs,
  Ai as aggregateUnsubscribers,
  vi as areUsjContentsEqualExceptWhitespace,
  xt as at,
  Et as charAt,
  Zu as codePointAt,
  Ei as compareScrRefs,
  $u as createSyncProxyForAsyncObject,
  ku as debounce,
  wt as deepClone,
  Cu as deepEqual,
  li as defaultScrRef,
  Tu as deserialize,
  Tn as endsWith,
  qr as ensureArray,
  oi as escapeStringRegexp,
  Ti as formatBytes,
  ei as formatReplacementString,
  Sn as formatReplacementStringToArray,
  Di as formatScrRef,
  wi as formatTimeSpan,
  ju as getAllObjectFunctionNames,
  Fn as getChaptersForBook,
  yi as getCurrentLocale,
  Or as getErrorMessage,
  kn as getLocalizeKeyForScrollGroupId,
  gi as getLocalizeKeysForScrollGroupIds,
  di as getLocalizedIdFromBookNumber,
  qu as groupBy,
  Ci as htmlEncode,
  On as includes,
  St as indexOf,
  Vu as isErrorMessageAboutParatextBlockingInternetAccess,
  Gu as isErrorMessageAboutRegistryAuthFailure,
  ii as isLocalizeKey,
  Ku as isPlatformError,
  bi as isSerializable,
  Be as isString,
  yu as isSubset,
  mt as isWhiteSpace,
  In as lastIndexOf,
  xu as localizedStringsDocumentSchema,
  Bu as menuDocumentSchema,
  Fu as newGuid,
  Wu as newPlatformError,
  ti as normalize,
  Er as normalizeScriptureSpaces,
  fi as offsetBook,
  pi as offsetChapter,
  hi as offsetVerse,
  ri as ordinalCompare,
  ni as padEnd,
  ui as padStart,
  Ou as projectSettingsDocumentSchema,
  mi as scrRefToBBBCCC,
  dr as scrRefToBBBCCCVVV,
  Sr as serialize,
  Iu as settingsDocumentSchema,
  pr as slice,
  hr as split,
  Ur as startsWith,
  ce as stringLength,
  ut as substring,
  xn as toArray,
  ci as toKebabCase,
  si as transformAndEnsureRegExpArray,
  ai as transformAndEnsureRegExpRegExpArray,
  en as wait,
  Uu as waitForDuration
};
//# sourceMappingURL=index.js.map
