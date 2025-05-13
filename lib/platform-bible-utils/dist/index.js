var Iu = Object.defineProperty;
var xu = (t, e, n) => e in t ? Iu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var le = (t, e, n) => xu(t, typeof e != "symbol" ? e + "" : e, n);
import { Mutex as Mu } from "async-mutex";
import { JSONPath as un } from "jsonpath-plus";
class Lo {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, n = 1e4) {
    le(this, "variableName");
    le(this, "promiseToValue");
    le(this, "resolver");
    le(this, "rejecter");
    this.variableName = e, this.promiseToValue = new Promise((o, a) => {
      this.resolver = o, this.rejecter = a;
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
class Fo {
  constructor(e, n) {
    le(this, "collator");
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
class Bu {
  constructor(e, n) {
    le(this, "dateTimeFormatter");
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
class Pu {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    le(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    le(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    le(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    le(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    le(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    le(this, "emit", (e) => {
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
    this.assertNotDisposed(), [...this.subscriptions ?? []].forEach((o) => o(e));
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
function qo() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function at(t) {
  return typeof t == "string" || t instanceof String;
}
function Wt(t) {
  return JSON.parse(JSON.stringify(t));
}
function jo(t, e = 300) {
  if (at(t)) throw new Error("Tried to debounce a string! Could be XSS");
  let n;
  return (...o) => {
    clearTimeout(n), n = setTimeout(() => t(...o), e);
  };
}
function $o(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const s = e(a), g = o.get(s), m = n ? n(a, s) : a;
    g ? g.push(m) : o.set(s, [m]);
  }), o;
}
function ku(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function Lu(t) {
  if (ku(t)) return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function jn(t) {
  return Lu(t).message;
}
function Fu(t) {
  return new Promise((e) => setTimeout(e, t));
}
function Uo(t, e) {
  const n = Fu(e).then(() => {
  });
  return Promise.any([n, t()]);
}
function Vo(t, e = "obj") {
  const n = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((a) => {
    try {
      typeof t[a] == "function" && n.add(a);
    } catch {
    }
  });
  let o = Object.getPrototypeOf(t);
  for (; o && Object.getPrototypeOf(o); )
    Object.getOwnPropertyNames(o).forEach((a) => {
      try {
        typeof t[a] == "function" && n.add(a);
      } catch {
      }
    }), o = Object.getPrototypeOf(o);
  return n;
}
function zo(t, e = {}) {
  return new Proxy(e, {
    get(n, o) {
      return o in n ? n[o] : async (...a) => (await t())[o](...a);
    }
  });
}
function Ho(t) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return at(t) ? t.includes(e) : jn(t).includes(e);
}
function Go(t) {
  const e = "401 Unauthorized error while getting shared projects.", n = "User registration is not valid. Cannot retrieve resources from DBL.", o = at(t) ? t : jn(t);
  return o.includes(e) || o.includes(n);
}
class qu {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, n) {
    le(this, "baseDocument");
    le(this, "contributions", /* @__PURE__ */ new Map());
    le(this, "latestOutput");
    le(this, "options");
    le(this, "onDidRebuildEmitter", new Pu());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    le(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = n, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? Wt(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
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
    const o = this.contributions.get(e);
    let a = this.options.copyDocuments && n ? Wt(n) : n;
    a = this.transformContributionAfterValidation(e, a), this.contributions.set(e, a);
    try {
      return this.rebuild();
    } catch (s) {
      throw o ? this.contributions.set(e, o) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${s}`);
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
    } catch (o) {
      throw this.contributions.set(e, n), new Error(`Error when deleting the document named ${e}: ${o}`);
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
        ([o, a]) => this.contributions.set(o, a)
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
      let n = Wt(this.baseDocument);
      return n = this.transformFinalOutputBeforeValidation(n), this.validateOutput(n), this.latestOutput = n, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((n) => {
      e = ju(
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
function on(...t) {
  let e = !0;
  return t.forEach((n) => {
    (!n || typeof n != "object" || Array.isArray(n)) && (e = !1);
  }), e;
}
function an(...t) {
  let e = !0;
  return t.forEach((n) => {
    (!n || typeof n != "object" || !Array.isArray(n)) && (e = !1);
  }), e;
}
function ju(t, e, n) {
  const o = Wt(t);
  return e ? $n(o, Wt(e), n) : o;
}
function $n(t, e, n) {
  if (!e) return t;
  if (on(t, e)) {
    const o = t, a = e;
    Object.keys(a).forEach((s) => {
      if (Object.hasOwn(o, s)) {
        if (on(o[s], a[s]))
          o[s] = $n(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            o[s],
            a[s],
            n
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (an(o[s], a[s]))
          o[s] = o[s].concat(
            a[s]
          );
        else if (!n)
          throw new Error(`Cannot merge objects: key "${s}" already exists in the target object`);
      } else
        o[s] = a[s];
    });
  } else an(t, e) && t.push(...e);
  return t;
}
class Yo {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(e) {
    /** The ring buffer to store times */
    le(this, "ringBuffer");
    /** The size of the ring buffer */
    le(this, "bufferSize");
    /** The next location where a time will be written */
    le(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    le(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    le(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    le(this, "totalInstanceCount");
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
class $u extends Mu {
}
class Jo {
  constructor() {
    le(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  /**
   * Retrieves the {@link Mutex} associated with the given ID. If no Mutex exists for the provided
   * ID, a new Mutex is created, stored, and returned.
   *
   * @param mutexID Unique identifier for the desired Mutex
   * @returns The Mutex associated with the provided ID
   */
  get(e) {
    let n = this.mutexesByID.get(e);
    return n || (n = new $u(), this.mutexesByID.set(e, n), n);
  }
}
class Xo extends qu {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, n) {
    super(e, n);
  }
  get output() {
    return this.latestOutput;
  }
}
class Uu {
  constructor(e, n) {
    le(this, "numberFormatter");
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
const Vu = Promise.resolve();
class Wo {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    le(this, "map", /* @__PURE__ */ new Map());
    le(this, "logger");
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
    const o = this.map.get(e);
    this.map.set(e, o ? o.then(n) : n()), this.cleanupPromiseChain(e);
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
    const o = { promise: Vu }, a = n.catch((s) => this.logger.warn(`Error in promise for ${e}: ${s.message}`)).finally(() => {
      this.map.get(e) === o.promise && this.map.delete(e);
    });
    o.promise = a, this.map.set(e, a);
  }
}
class Ko {
  constructor(e = "Anonymous") {
    le(this, "unsubscribers", /* @__PURE__ */ new Set());
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
    const e = [...this.unsubscribers].map((o) => o()), n = await Promise.all(e);
    return this.unsubscribers.clear(), n.every((o, a) => (o || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${a} failed!`), o));
  }
}
const sr = 1;
function Qo(t) {
  if (!t) return { message: "", platformErrorVersion: sr };
  if (at(t)) return { message: t, platformErrorVersion: sr };
  if (typeof t == "object" && "message" in t && typeof t.message == "string") {
    const e = {
      message: t.message,
      platformErrorVersion: sr
    };
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)), Object.defineProperty(e, "message", { enumerable: !0 }), "stack" in e && Object.defineProperty(e, "stack", { enumerable: !0 }), "cause" in e && Object.defineProperty(e, "cause", { enumerable: !0 }), e;
  }
  return { cause: t, message: "", platformErrorVersion: sr };
}
function Zo(t) {
  return !!t && typeof t == "object" && "platformErrorVersion" in t;
}
var zu = Object.defineProperty, Hu = (t, e, n) => e in t ? zu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, ie = (t, e, n) => Hu(t, typeof e != "symbol" ? e + "" : e, n);
const Mt = [
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
], Rr = [
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
], Un = [
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
], sn = ti();
function $t(t, e = !0) {
  return e && (t = t.toUpperCase()), t in sn ? sn[t] : 0;
}
function Ir(t) {
  return $t(t) > 0;
}
function Gu(t) {
  const e = typeof t == "string" ? $t(t) : t;
  return e >= 40 && e <= 66;
}
function Yu(t) {
  return (typeof t == "string" ? $t(t) : t) <= 39;
}
function Vn(t) {
  return t <= 66;
}
function Ju(t) {
  const e = typeof t == "string" ? $t(t) : t;
  return Gn(e) && !Vn(e);
}
function* Xu() {
  for (let t = 1; t <= Mt.length; t++) yield t;
}
const Wu = 1, zn = Mt.length;
function Ku() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function xr(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Mt.length ? e : Mt[n];
}
function Hn(t) {
  return t <= 0 || t > zn ? "******" : Un[t - 1];
}
function Qu(t) {
  return Hn($t(t));
}
function Gn(t) {
  const e = typeof t == "number" ? xr(t) : t;
  return Ir(e) && !Rr.includes(e);
}
function Zu(t) {
  const e = typeof t == "number" ? xr(t) : t;
  return Ir(e) && Rr.includes(e);
}
function ei(t) {
  return Un[t - 1].includes("*obsolete*");
}
function ti() {
  const t = {};
  for (let e = 0; e < Mt.length; e++)
    t[Mt[e]] = e + 1;
  return t;
}
const Ye = {
  allBookIds: Mt,
  nonCanonicalIds: Rr,
  bookIdToNumber: $t,
  isBookIdValid: Ir,
  isBookNT: Gu,
  isBookOT: Yu,
  isBookOTNT: Vn,
  isBookDC: Ju,
  allBookNumbers: Xu,
  firstBook: Wu,
  lastBook: zn,
  extraBooks: Ku,
  bookNumberToId: xr,
  bookNumberToEnglishName: Hn,
  bookIdToEnglishName: Qu,
  isCanonical: Gn,
  isExtraMaterial: Zu,
  isObsolete: ei
};
var ft = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(ft || {});
const Ke = class {
  // private versInfo: Versification;
  constructor(e) {
    if (ie(this, "name"), ie(this, "fullPath"), ie(this, "isPresent"), ie(this, "hasVerseSegments"), ie(this, "isCustomized"), ie(this, "baseVersification"), ie(this, "scriptureBooks"), ie(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = ft[e]) : (this._type = e, this.name = ft[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
ie(Ke, "Original", new Ke(ft.Original)), ie(Ke, "Septuagint", new Ke(ft.Septuagint)), ie(Ke, "Vulgate", new Ke(ft.Vulgate)), ie(Ke, "English", new Ke(ft.English)), ie(Ke, "RussianProtestant", new Ke(ft.RussianProtestant)), ie(Ke, "RussianOrthodox", new Ke(ft.RussianOrthodox));
let It = Ke;
function cn(t, e) {
  const n = e[0];
  for (let o = 1; o < e.length; o++)
    t = t.split(e[o]).join(n);
  return t.split(n);
}
var Yn = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Yn || {});
const ze = class ce {
  constructor(e, n, o, a) {
    if (ie(this, "firstChapter"), ie(this, "lastChapter"), ie(this, "lastVerse"), ie(this, "hasSegmentsDefined"), ie(this, "text"), ie(this, "BBBCCCVVVS"), ie(this, "longHashCode"), ie(this, "versification"), ie(this, "rtlMark", "‏"), ie(this, "_bookNum", 0), ie(this, "_chapterNum", 0), ie(this, "_verseNum", 0), ie(this, "_verse"), o == null && a == null)
      if (e != null && typeof e == "string") {
        const s = e, g = n != null && n instanceof It ? n : void 0;
        this.setEmpty(g), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = n != null && n instanceof It ? n : void 0;
        this.setEmpty(s), this._verseNum = e % ce.chapterDigitShifter, this._chapterNum = Math.floor(
          e % ce.bookDigitShifter / ce.chapterDigitShifter
        ), this._bookNum = Math.floor(e / ce.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof ce) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof It ? e : ce.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && o != null)
      if (typeof e == "string" && typeof n == "string" && typeof o == "string")
        this.setEmpty(a), this.updateInternal(e, n, o);
      else if (typeof e == "number" && typeof n == "number" && typeof o == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = o, this.versification = a ?? ce.defaultVersification;
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
      return n = new ce(e), { success: !0, verseRef: n };
    } catch (o) {
      if (o instanceof Gt)
        return n = new ce(), { success: !1, verseRef: n };
      throw o;
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
  static getBBBCCCVVV(e, n, o) {
    return e % ce.bcvMaxValue * ce.bookDigitShifter + (n >= 0 ? n % ce.bcvMaxValue * ce.chapterDigitShifter : 0) + (o >= 0 ? o % ce.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: o, verseNum: a, verse: s, versificationStr: g } = e, m = s || a.toString();
    let d;
    return g && (d = new It(g)), n ? new ce(n, o.toString(), m, d) : new ce();
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
    let o;
    for (let a = 0; a < e.length; a++) {
      if (o = e[a], o < "0" || o > "9")
        return a === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +o - 0, n > ce.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ce.verseRangeSeparator) || this._verse.includes(ce.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Ye.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = Ye.bookIdToNumber(e);
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
    const { success: n, vNum: o } = ce.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = o, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ce.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > Ye.lastBook)
      throw new Gt(
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
    this.versification = this.versification != null ? new It(e) : void 0;
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
    return this.validateVerse(ce.verseRangeSeparators, ce.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ce.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ce.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const g = +s[1].trim();
          this.versification = new It(ft[g]);
        } catch {
          throw new Gt("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Gt("Invalid reference : " + e);
    const o = n[1].split(":"), a = +o[0];
    if (o.length !== 2 || Ye.bookIdToNumber(n[0]) === 0 || !Number.isInteger(a) || a < 0 || !ce.isVerseParseable(o[1]))
      throw new Gt("Invalid reference : " + e);
    this.updateInternal(n[0], o[0], o[1]);
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
    return new ce(this);
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
    return e instanceof ce ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = ce.verseRangeSeparators, o = ce.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const a = [], s = cn(this._verse, o);
    for (const g of s.map((m) => cn(m, n))) {
      const m = this.clone();
      m.verse = g[0];
      const d = m.verseNum;
      if (a.push(m), g.length > 1) {
        const y = this.clone();
        if (y.verse = g[1], !e)
          for (let b = d + 1; b < y.verseNum; b++) {
            const p = new ce(
              this._bookNum,
              this._chapterNum,
              b,
              this.versification
            );
            this.isExcluded || a.push(p);
          }
        a.push(y);
      }
    }
    return a;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let o = 0;
    for (const a of this.allVerses(!0, e, n)) {
      const s = a.internalValid;
      if (s !== 0)
        return s;
      const g = a.BBBCCCVVV;
      if (o > g)
        return 3;
      if (o === g)
        return 4;
      o = g;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Ye.lastBook ? 2 : (Ye.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = ce.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, o) {
    this.bookNum = Ye.bookIdToNumber(e), this.chapter = n, this.verse = o;
  }
};
ie(ze, "defaultVersification", It.English), ie(ze, "verseRangeSeparator", "-"), ie(ze, "verseSequenceIndicator", ","), ie(ze, "verseRangeSeparators", [ze.verseRangeSeparator]), ie(ze, "verseSequenceIndicators", [ze.verseSequenceIndicator]), ie(ze, "chapterDigitShifter", 1e3), ie(ze, "bookDigitShifter", ze.chapterDigitShifter * ze.chapterDigitShifter), ie(ze, "bcvMaxValue", ze.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
ie(ze, "ValidStatusType", Yn);
let Jn = ze;
class Gt extends Error {
}
var oe = {}, xe = {}, ln;
function Ut() {
  if (ln) return xe;
  ln = 1;
  function t(V, G, X) {
    if (X === void 0 && (X = Array.prototype), V && typeof X.find == "function")
      return X.find.call(V, G);
    for (var fe = 0; fe < V.length; fe++)
      if (n(V, fe)) {
        var ne = V[fe];
        if (G.call(void 0, ne, fe, V))
          return ne;
      }
  }
  function e(V, G) {
    return G === void 0 && (G = Object), G && typeof G.getOwnPropertyDescriptors == "function" && (V = G.create(null, G.getOwnPropertyDescriptors(V))), G && typeof G.freeze == "function" ? G.freeze(V) : V;
  }
  function n(V, G) {
    return Object.prototype.hasOwnProperty.call(V, G);
  }
  function o(V, G) {
    if (V === null || typeof V != "object")
      throw new TypeError("target is not an object");
    for (var X in G)
      n(G, X) && (V[X] = G[X]);
    return V;
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
  function s(V) {
    return n(a, V.toLowerCase());
  }
  var g = e({
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
  function m(V) {
    return n(g, V.toLowerCase());
  }
  var d = e({
    script: !1,
    style: !1,
    textarea: !0,
    title: !0
  });
  function y(V) {
    var G = V.toLowerCase();
    return n(d, G) && !d[G];
  }
  function b(V) {
    var G = V.toLowerCase();
    return n(d, G) && d[G];
  }
  function p(V) {
    return V === k.HTML;
  }
  function w(V) {
    return p(V) || V === k.XML_XHTML_APPLICATION;
  }
  var k = e({
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
  }), M = Object.keys(k).map(function(V) {
    return k[V];
  });
  function B(V) {
    return M.indexOf(V) > -1;
  }
  var Y = e({
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
  return xe.assign = o, xe.find = t, xe.freeze = e, xe.HTML_BOOLEAN_ATTRIBUTES = a, xe.HTML_RAW_TEXT_ELEMENTS = d, xe.HTML_VOID_ELEMENTS = g, xe.hasDefaultHTMLNamespace = w, xe.hasOwn = n, xe.isHTMLBooleanAttribute = s, xe.isHTMLRawTextElement = y, xe.isHTMLEscapableRawTextElement = b, xe.isHTMLMimeType = p, xe.isHTMLVoidElement = m, xe.isValidMimeType = B, xe.MIME_TYPE = k, xe.NAMESPACE = Y, xe;
}
var Ft = {}, fn;
function dr() {
  if (fn) return Ft;
  fn = 1;
  var t = Ut();
  function e(w, k) {
    w.prototype = Object.create(Error.prototype, {
      constructor: { value: w },
      name: { value: w.name, enumerable: !0, writable: k }
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
  }), o = Object.keys(n);
  function a(w) {
    return typeof w == "number" && w >= 1 && w <= 25;
  }
  function s(w) {
    return typeof w == "string" && w.substring(w.length - n.Error.length) === n.Error;
  }
  function g(w, k) {
    a(w) ? (this.name = o[w], this.message = k || "") : (this.message = w, this.name = s(k) ? k : n.Error), Error.captureStackTrace && Error.captureStackTrace(this, g);
  }
  e(g, !0), Object.defineProperties(g.prototype, {
    code: {
      enumerable: !0,
      get: function() {
        var w = o.indexOf(this.name);
        return a(w) ? w : 0;
      }
    }
  });
  for (var m = {
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
  }, d = Object.entries(m), y = 0; y < d.length; y++) {
    var b = d[y][0];
    g[b] = d[y][1];
  }
  function p(w, k) {
    this.message = w, this.locator = k, Error.captureStackTrace && Error.captureStackTrace(this, p);
  }
  return e(p), Ft.DOMException = g, Ft.DOMExceptionName = n, Ft.ExceptionCode = m, Ft.ParseError = p, Ft;
}
var Ne = {}, ee = {}, pn;
function Xn() {
  if (pn) return ee;
  pn = 1;
  function t(ye) {
    try {
      typeof ye != "function" && (ye = RegExp);
      var _e = new ye("𝌆", "u").exec("𝌆");
      return !!_e && _e[0].length === 2;
    } catch {
    }
    return !1;
  }
  var e = t();
  function n(ye) {
    if (ye.source[0] !== "[")
      throw new Error(ye + " can not be used with chars");
    return ye.source.slice(1, ye.source.lastIndexOf("]"));
  }
  function o(ye, _e) {
    if (ye.source[0] !== "[")
      throw new Error("/" + ye.source + "/ can not be used with chars_without");
    if (!_e || typeof _e != "string")
      throw new Error(JSON.stringify(_e) + " is not a valid search");
    if (ye.source.indexOf(_e) === -1)
      throw new Error('"' + _e + '" is not is /' + ye.source + "/");
    if (_e === "-" && ye.source.indexOf(_e) !== 1)
      throw new Error('"' + _e + '" is not at the first postion of /' + ye.source + "/");
    return new RegExp(ye.source.replace(_e, ""), e ? "u" : "");
  }
  function a(ye) {
    var _e = this;
    return new RegExp(
      Array.prototype.slice.call(arguments).map(function(nt) {
        var ut = typeof nt == "string";
        if (ut && _e === void 0 && nt === "|")
          throw new Error("use regg instead of reg to wrap expressions with `|`!");
        return ut ? nt : nt.source;
      }).join(""),
      e ? "mu" : "m"
    );
  }
  function s(ye) {
    if (arguments.length === 0)
      throw new Error("no parameters provided");
    return a.apply(s, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var g = "�", m = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  e && (m = a("[", n(m), "\\u{10000}-\\u{10FFFF}", "]"));
  var d = /[\x20\x09\x0D\x0A]/, y = n(d), b = a(d, "+"), p = a(d, "*"), w = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  e && (w = a("[", n(w), "\\u{10000}-\\u{10FFFF}", "]"));
  var k = n(w), M = a("[", k, n(/[-.0-9\xB7]/), n(/[\u0300-\u036F\u203F-\u2040]/), "]"), B = a(w, M, "*"), Y = a(M, "+"), V = a("&", B, ";"), G = s(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), X = s(V, "|", G), fe = a("%", B, ";"), ne = s(
    a('"', s(/[^%&"]/, "|", fe, "|", X), "*", '"'),
    "|",
    a("'", s(/[^%&']/, "|", fe, "|", X), "*", "'")
  ), N = s('"', s(/[^<&"]/, "|", X), "*", '"', "|", "'", s(/[^<&']/, "|", X), "*", "'"), F = o(w, ":"), z = o(M, ":"), Q = a(F, z, "*"), se = a(Q, s(":", Q), "?"), Ee = a("^", se, "$"), Le = a("(", se, ")"), he = s(/"[^"]*"|'[^']*'/), Be = a(/^<\?/, "(", B, ")", s(b, "(", m, "*?)"), "?", /\?>/), v = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, x = s('"', v, '*"', "|", "'", o(v, "'"), "*'"), C = "<!--", P = "-->", j = a(C, s(o(m, "-"), "|", a("-", o(m, "-"))), "*", P), _ = "#PCDATA", f = s(
    a(/\(/, p, _, s(p, /\|/, p, se), "*", p, /\)\*/),
    "|",
    a(/\(/, p, _, p, /\)/)
  ), A = /[?*+]?/, R = a(
    /\([^>]+\)/,
    A
    /*regg(choice, '|', seq), _children_quantity*/
  ), T = s("EMPTY", "|", "ANY", "|", f, "|", R), O = "<!ELEMENT", L = a(O, b, s(se, "|", fe), b, s(T, "|", fe), p, ">"), $ = a("NOTATION", b, /\(/, p, B, s(p, /\|/, p, B), "*", p, /\)/), Z = a(/\(/, p, Y, s(p, /\|/, p, Y), "*", p, /\)/), te = s($, "|", Z), pe = s(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", te), we = s(/#REQUIRED|#IMPLIED/, "|", s(s("#FIXED", b), "?", N)), H = s(b, B, b, pe, b, we), Je = "<!ATTLIST", Qe = a(Je, b, B, H, "*", p, ">"), Oe = "about:legacy-compat", tt = s('"' + Oe + '"', "|", "'" + Oe + "'"), Ve = "SYSTEM", He = "PUBLIC", Ze = s(s(Ve, b, he), "|", s(He, b, x, b, he)), Fe = a(
    "^",
    s(
      s(Ve, b, "(?<SystemLiteralOnly>", he, ")"),
      "|",
      s(He, b, "(?<PubidLiteral>", x, ")", b, "(?<SystemLiteral>", he, ")")
    )
  ), Xe = s(b, "NDATA", b, B), qe = s(ne, "|", s(Ze, Xe, "?")), de = "<!ENTITY", rt = a(de, b, B, b, qe, p, ">"), Ce = s(ne, "|", Ze), st = a(de, b, "%", b, B, b, Ce, p, ">"), bt = s(rt, "|", st), pt = a(He, b, x), ht = a("<!NOTATION", b, B, b, s(Ze, "|", pt), p, ">"), K = a(p, "=", p), ge = /1[.]\d+/, je = a(b, "version", K, s("'", ge, "'", "|", '"', ge, '"')), $e = /[A-Za-z][-A-Za-z0-9._]*/, dt = s(b, "encoding", K, s('"', $e, '"', "|", "'", $e, "'")), We = s(b, "standalone", K, s("'", s("yes", "|", "no"), "'", "|", '"', s("yes", "|", "no"), '"')), mt = a(/^<\?xml/, je, dt, "?", We, "?", p, /\?>/), At = "<!DOCTYPE", Ot = "<![CDATA[", Ct = "]]>", Nt = /<!\[CDATA\[/, ct = /\]\]>/, lt = a(m, "*?", ct), gt = a(Nt, lt);
  return ee.chars = n, ee.chars_without = o, ee.detectUnicodeSupport = t, ee.reg = a, ee.regg = s, ee.ABOUT_LEGACY_COMPAT = Oe, ee.ABOUT_LEGACY_COMPAT_SystemLiteral = tt, ee.AttlistDecl = Qe, ee.CDATA_START = Ot, ee.CDATA_END = Ct, ee.CDSect = gt, ee.Char = m, ee.Comment = j, ee.COMMENT_START = C, ee.COMMENT_END = P, ee.DOCTYPE_DECL_START = At, ee.elementdecl = L, ee.EntityDecl = bt, ee.EntityValue = ne, ee.ExternalID = Ze, ee.ExternalID_match = Fe, ee.Name = B, ee.NotationDecl = ht, ee.Reference = X, ee.PEReference = fe, ee.PI = Be, ee.PUBLIC = He, ee.PubidLiteral = x, ee.QName = se, ee.QName_exact = Ee, ee.QName_group = Le, ee.S = b, ee.SChar_s = y, ee.S_OPT = p, ee.SYSTEM = Ve, ee.SystemLiteral = he, ee.UNICODE_REPLACEMENT_CHARACTER = g, ee.UNICODE_SUPPORT = e, ee.XMLDecl = mt, ee;
}
var hn;
function Wn() {
  if (hn) return Ne;
  hn = 1;
  var t = Ut(), e = t.find, n = t.hasDefaultHTMLNamespace, o = t.hasOwn, a = t.isHTMLMimeType, s = t.isHTMLRawTextElement, g = t.isHTMLVoidElement, m = t.MIME_TYPE, d = t.NAMESPACE, y = Symbol(), b = dr(), p = b.DOMException, w = b.DOMExceptionName, k = Xn();
  function M(r) {
    if (r !== y)
      throw new TypeError("Illegal constructor");
  }
  function B(r) {
    return r !== "";
  }
  function Y(r) {
    return r ? r.split(/[\t\n\f\r ]+/).filter(B) : [];
  }
  function V(r, i) {
    return o(r, i) || (r[i] = !0), r;
  }
  function G(r) {
    if (!r) return [];
    var i = Y(r);
    return Object.keys(i.reduce(V, {}));
  }
  function X(r) {
    return function(i) {
      return r && r.indexOf(i) !== -1;
    };
  }
  function fe(r) {
    if (!k.QName_exact.test(r))
      throw new p(p.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + r + '"');
  }
  function ne(r, i) {
    fe(i), r = r || null;
    var c = null, h = i;
    if (i.indexOf(":") >= 0) {
      var S = i.split(":");
      c = S[0], h = S[1];
    }
    if (c !== null && r === null)
      throw new p(p.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    if (c === "xml" && r !== t.NAMESPACE.XML)
      throw new p(p.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    if ((c === "xmlns" || i === "xmlns") && r !== t.NAMESPACE.XMLNS)
      throw new p(
        p.NAMESPACE_ERR,
        'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
      );
    if (r === t.NAMESPACE.XMLNS && c !== "xmlns" && i !== "xmlns")
      throw new p(
        p.NAMESPACE_ERR,
        'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
      );
    return [r, c, h];
  }
  function N(r, i) {
    for (var c in r)
      o(r, c) && (i[c] = r[c]);
  }
  function F(r, i) {
    var c = r.prototype;
    if (!(c instanceof i)) {
      let h = function() {
      };
      h.prototype = i.prototype, h = new h(), N(c, h), r.prototype = c = h;
    }
    c.constructor != r && (typeof r != "function" && console.error("unknown Class:" + r), c.constructor = r);
  }
  var z = {}, Q = z.ELEMENT_NODE = 1, se = z.ATTRIBUTE_NODE = 2, Ee = z.TEXT_NODE = 3, Le = z.CDATA_SECTION_NODE = 4, he = z.ENTITY_REFERENCE_NODE = 5, Be = z.ENTITY_NODE = 6, v = z.PROCESSING_INSTRUCTION_NODE = 7, x = z.COMMENT_NODE = 8, C = z.DOCUMENT_NODE = 9, P = z.DOCUMENT_TYPE_NODE = 10, j = z.DOCUMENT_FRAGMENT_NODE = 11, _ = z.NOTATION_NODE = 12, f = t.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function A(r, i) {
    if (i.length < r.length) return A(i, r);
    var c = null;
    for (var h in r) {
      if (r[h] !== i[h]) return c;
      c = r[h];
    }
    return c;
  }
  function R(r) {
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
      for (var i = [], c = 0; c < this.length; c++)
        ut(this[c], i, r);
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
    var r = this, i = 0;
    return {
      next: function() {
        return i < r.length ? {
          value: r[i++],
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
  function O(r, i) {
    this._node = r, this._refresh = i, L(this);
  }
  function L(r) {
    var i = r._node._inc || r._node.ownerDocument._inc;
    if (r._inc !== i) {
      var c = r._refresh(r._node);
      if (Tt(r, "length", c.length), !r.$$length || c.length < r.$$length)
        for (var h = c.length; h in r; h++)
          o(r, h) && delete r[h];
      N(c, r), r._inc = i;
    }
  }
  O.prototype.item = function(r) {
    return L(this), this[r] || null;
  }, F(O, T);
  function $() {
  }
  function Z(r, i) {
    for (var c = 0; c < r.length; ) {
      if (r[c] === i)
        return c;
      c++;
    }
  }
  function te(r, i, c, h) {
    if (h ? i[Z(i, h)] = c : (i[i.length] = c, i.length++), r) {
      c.ownerElement = r;
      var S = r.ownerDocument;
      S && (h && Ve(S, r, h), tt(S, r, c));
    }
  }
  function pe(r, i, c) {
    var h = Z(i, c);
    if (h >= 0) {
      for (var S = i.length - 1; h <= S; )
        i[h] = i[++h];
      if (i.length = S, r) {
        var q = r.ownerDocument;
        q && Ve(q, r, c), c.ownerElement = null;
      }
    }
  }
  $.prototype = {
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
      for (var i = 0; i < this.length; ) {
        var c = this[i];
        if (c.nodeName === r)
          return c;
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
    setNamedItem: function(r) {
      var i = r.ownerElement;
      if (i && i !== this._ownerElement)
        throw new p(p.INUSE_ATTRIBUTE_ERR);
      var c = this.getNamedItemNS(r.namespaceURI, r.localName);
      return c === r ? r : (te(this._ownerElement, this, r, c), c);
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
      var i = this.getNamedItem(r);
      if (!i)
        throw new p(p.NOT_FOUND_ERR, r);
      return pe(this._ownerElement, this, i), i;
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
    removeNamedItemNS: function(r, i) {
      var c = this.getNamedItemNS(r, i);
      if (!c)
        throw new p(p.NOT_FOUND_ERR, r ? r + " : " + i : i);
      return pe(this._ownerElement, this, c), c;
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
    getNamedItemNS: function(r, i) {
      r || (r = null);
      for (var c = 0; c < this.length; ) {
        var h = this[c];
        if (h.localName === i && h.namespaceURI === r)
          return h;
        c++;
      }
      return null;
    }
  }, $.prototype[Symbol.iterator] = function() {
    var r = this, i = 0;
    return {
      next: function() {
        return i < r.length ? {
          value: r[i++],
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
  function we() {
  }
  we.prototype = {
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
    hasFeature: function(r, i) {
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
    createDocument: function(r, i, c) {
      var h = m.XML_APPLICATION;
      r === d.HTML ? h = m.XML_XHTML_APPLICATION : r === d.SVG && (h = m.XML_SVG_IMAGE);
      var S = new Oe(y, { contentType: h });
      if (S.implementation = this, S.childNodes = new T(), S.doctype = c || null, c && S.appendChild(c), i) {
        var q = S.createElementNS(r, i);
        S.appendChild(q);
      }
      return S;
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
    createDocumentType: function(r, i, c, h) {
      fe(r);
      var S = new At(y);
      return S.name = r, S.nodeName = r, S.publicId = i || "", S.systemId = c || "", S.internalSubset = h || "", S.childNodes = new T(), S;
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
      var i = new Oe(y, { contentType: m.HTML });
      if (i.implementation = this, i.childNodes = new T(), r !== !1) {
        i.doctype = this.createDocumentType("html"), i.doctype.ownerDocument = i, i.appendChild(i.doctype);
        var c = i.createElement("html");
        i.appendChild(c);
        var h = i.createElement("head");
        if (c.appendChild(h), typeof r == "string") {
          var S = i.createElement("title");
          S.appendChild(i.createTextNode(r)), h.appendChild(S);
        }
        c.appendChild(i.createElement("body"));
      }
      return i;
    }
  };
  function H(r) {
    M(r);
  }
  H.prototype = {
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
      var i = r;
      do {
        if (this === i) return !0;
        i = r.parentNode;
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
    getRootNode: function(r) {
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
    isEqualNode: function(r) {
      if (!r || this.nodeType !== r.nodeType) return !1;
      switch (this.nodeType) {
        case this.DOCUMENT_TYPE_NODE:
          if (this.name !== r.name || this.publicId !== r.publicId || this.systemId !== r.systemId) return !1;
          break;
        case this.ELEMENT_NODE:
          if (this.namespaceURI !== r.namespaceURI || this.prefix !== r.prefix || this.localName !== r.localName || this.attributes.length !== r.attributes.length) return !1;
          for (var i = 0; i < this.attributes.length; i++) {
            var c = this.attributes.item(i);
            if (!c.isEqualNode(r.getAttributeNodeNS(c.namespaceURI, c.localName)))
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
      for (var i = 0; i < this.childNodes.length; i++)
        if (!this.childNodes[i].isEqualNode(r.childNodes[i]))
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
    insertBefore: function(r, i) {
      return K(this, r, i);
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
    replaceChild: function(r, i) {
      K(this, r, i, ht), i && this.removeChild(i);
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
      return Ze(this, r);
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
      return Vt(this.ownerDocument || this, this, r);
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
        var i = r.nextSibling;
        i && i.nodeType == Ee && r.nodeType == Ee ? (this.removeChild(i), r.appendData(i.data)) : (r.normalize(), r = i);
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
    isSupported: function(r, i) {
      return this.ownerDocument.implementation.hasFeature(r, i);
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
      for (var i = this; i; ) {
        var c = i._nsMap;
        if (c) {
          for (var h in c)
            if (o(c, h) && c[h] === r)
              return h;
        }
        i = i.nodeType == se ? i.ownerDocument : i.parentNode;
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
      for (var i = this; i; ) {
        var c = i._nsMap;
        if (c && o(c, r))
          return c[r];
        i = i.nodeType == se ? i.ownerDocument : i.parentNode;
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
      var i = this.lookupPrefix(r);
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
    compareDocumentPosition: function(r) {
      if (this === r) return 0;
      var i = r, c = this, h = null, S = null;
      if (i instanceof je && (h = i, i = h.ownerElement), c instanceof je && (S = c, c = S.ownerElement, h && i && c === i))
        for (var q = 0, ue; ue = c.attributes[q]; q++) {
          if (ue === h)
            return f.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + f.DOCUMENT_POSITION_PRECEDING;
          if (ue === S)
            return f.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + f.DOCUMENT_POSITION_FOLLOWING;
        }
      if (!i || !c || c.ownerDocument !== i.ownerDocument)
        return f.DOCUMENT_POSITION_DISCONNECTED + f.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (R(c.ownerDocument) > R(i.ownerDocument) ? f.DOCUMENT_POSITION_FOLLOWING : f.DOCUMENT_POSITION_PRECEDING);
      if (S && i === c)
        return f.DOCUMENT_POSITION_CONTAINS + f.DOCUMENT_POSITION_PRECEDING;
      if (h && i === c)
        return f.DOCUMENT_POSITION_CONTAINED_BY + f.DOCUMENT_POSITION_FOLLOWING;
      for (var Te = [], Re = i.parentNode; Re; ) {
        if (!S && Re === c)
          return f.DOCUMENT_POSITION_CONTAINED_BY + f.DOCUMENT_POSITION_FOLLOWING;
        Te.push(Re), Re = Re.parentNode;
      }
      Te.reverse();
      for (var me = [], Pe = c.parentNode; Pe; ) {
        if (!h && Pe === i)
          return f.DOCUMENT_POSITION_CONTAINS + f.DOCUMENT_POSITION_PRECEDING;
        me.push(Pe), Pe = Pe.parentNode;
      }
      me.reverse();
      var Et = A(Te, me);
      for (var it in Et.childNodes) {
        var Ge = Et.childNodes[it];
        if (Ge === c) return f.DOCUMENT_POSITION_FOLLOWING;
        if (Ge === i) return f.DOCUMENT_POSITION_PRECEDING;
        if (me.indexOf(Ge) >= 0) return f.DOCUMENT_POSITION_FOLLOWING;
        if (Te.indexOf(Ge) >= 0) return f.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function Je(r) {
    return r == "<" && "&lt;" || r == ">" && "&gt;" || r == "&" && "&amp;" || r == '"' && "&quot;" || "&#" + r.charCodeAt() + ";";
  }
  N(z, H), N(z, H.prototype), N(f, H), N(f, H.prototype);
  function Qe(r, i) {
    if (i(r))
      return !0;
    if (r = r.firstChild)
      do
        if (Qe(r, i))
          return !0;
      while (r = r.nextSibling);
  }
  function Oe(r, i) {
    M(r);
    var c = i || {};
    this.ownerDocument = this, this.contentType = c.contentType || m.XML_APPLICATION, this.type = a(this.contentType) ? "html" : "xml";
  }
  function tt(r, i, c) {
    r && r._inc++;
    var h = c.namespaceURI;
    h === d.XMLNS && (i._nsMap[c.prefix ? c.localName : ""] = c.value);
  }
  function Ve(r, i, c, h) {
    r && r._inc++;
    var S = c.namespaceURI;
    S === d.XMLNS && delete i._nsMap[c.prefix ? c.localName : ""];
  }
  function He(r, i, c) {
    if (r && r._inc) {
      r._inc++;
      var h = i.childNodes;
      if (c && !c.nextSibling)
        h[h.length++] = c;
      else {
        for (var S = i.firstChild, q = 0; S; )
          h[q++] = S, S = S.nextSibling;
        h.length = q, delete h[h.length];
      }
    }
  }
  function Ze(r, i) {
    if (r !== i.parentNode)
      throw new p(p.NOT_FOUND_ERR, "child's parent is not parent");
    var c = i.previousSibling, h = i.nextSibling;
    return c ? c.nextSibling = h : r.firstChild = h, h ? h.previousSibling = c : r.lastChild = c, He(r.ownerDocument, r), i.parentNode = null, i.previousSibling = null, i.nextSibling = null, i;
  }
  function Fe(r) {
    return r && (r.nodeType === H.DOCUMENT_NODE || r.nodeType === H.DOCUMENT_FRAGMENT_NODE || r.nodeType === H.ELEMENT_NODE);
  }
  function Xe(r) {
    return r && (r.nodeType === H.CDATA_SECTION_NODE || r.nodeType === H.COMMENT_NODE || r.nodeType === H.DOCUMENT_FRAGMENT_NODE || r.nodeType === H.DOCUMENT_TYPE_NODE || r.nodeType === H.ELEMENT_NODE || r.nodeType === H.PROCESSING_INSTRUCTION_NODE || r.nodeType === H.TEXT_NODE);
  }
  function qe(r) {
    return r && r.nodeType === H.DOCUMENT_TYPE_NODE;
  }
  function de(r) {
    return r && r.nodeType === H.ELEMENT_NODE;
  }
  function rt(r) {
    return r && r.nodeType === H.TEXT_NODE;
  }
  function Ce(r, i) {
    var c = r.childNodes || [];
    if (e(c, de) || qe(i))
      return !1;
    var h = e(c, qe);
    return !(i && h && c.indexOf(h) > c.indexOf(i));
  }
  function st(r, i) {
    var c = r.childNodes || [];
    function h(q) {
      return de(q) && q !== i;
    }
    if (e(c, h))
      return !1;
    var S = e(c, qe);
    return !(i && S && c.indexOf(S) > c.indexOf(i));
  }
  function bt(r, i, c) {
    if (!Fe(r))
      throw new p(p.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + r.nodeType);
    if (c && c.parentNode !== r)
      throw new p(p.NOT_FOUND_ERR, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !Xe(i) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      qe(i) && r.nodeType !== H.DOCUMENT_NODE
    )
      throw new p(
        p.HIERARCHY_REQUEST_ERR,
        "Unexpected node type " + i.nodeType + " for parent node type " + r.nodeType
      );
  }
  function pt(r, i, c) {
    var h = r.childNodes || [], S = i.childNodes || [];
    if (i.nodeType === H.DOCUMENT_FRAGMENT_NODE) {
      var q = S.filter(de);
      if (q.length > 1 || e(S, rt))
        throw new p(p.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (q.length === 1 && !Ce(r, c))
        throw new p(p.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (de(i) && !Ce(r, c))
      throw new p(p.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (qe(i)) {
      if (e(h, qe))
        throw new p(p.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var ue = e(h, de);
      if (c && h.indexOf(ue) < h.indexOf(c))
        throw new p(p.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      if (!c && ue)
        throw new p(p.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
  function ht(r, i, c) {
    var h = r.childNodes || [], S = i.childNodes || [];
    if (i.nodeType === H.DOCUMENT_FRAGMENT_NODE) {
      var q = S.filter(de);
      if (q.length > 1 || e(S, rt))
        throw new p(p.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (q.length === 1 && !st(r, c))
        throw new p(p.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (de(i) && !st(r, c))
      throw new p(p.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (qe(i)) {
      if (e(h, function(Re) {
        return qe(Re) && Re !== c;
      }))
        throw new p(p.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var ue = e(h, de);
      if (c && h.indexOf(ue) < h.indexOf(c))
        throw new p(p.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
  function K(r, i, c, h) {
    bt(r, i, c), r.nodeType === H.DOCUMENT_NODE && (h || pt)(r, i, c);
    var S = i.parentNode;
    if (S && S.removeChild(i), i.nodeType === j) {
      var q = i.firstChild;
      if (q == null)
        return i;
      var ue = i.lastChild;
    } else
      q = ue = i;
    var Te = c ? c.previousSibling : r.lastChild;
    q.previousSibling = Te, ue.nextSibling = c, Te ? Te.nextSibling = q : r.firstChild = q, c == null ? r.lastChild = ue : c.previousSibling = ue;
    do
      q.parentNode = r;
    while (q !== ue && (q = q.nextSibling));
    return He(r.ownerDocument || r, r, i), i.nodeType == j && (i.firstChild = i.lastChild = null), i;
  }
  Oe.prototype = {
    /**
     * The implementation that created this document.
     *
     * @type DOMImplementation
     * @readonly
     */
    implementation: null,
    nodeName: "#document",
    nodeType: C,
    /**
     * The DocumentType node of the document.
     *
     * @type DocumentType
     * @readonly
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(r, i) {
      if (r.nodeType === j) {
        for (var c = r.firstChild; c; ) {
          var h = c.nextSibling;
          this.insertBefore(c, i), c = h;
        }
        return r;
      }
      return K(this, r, i), r.ownerDocument = this, this.documentElement === null && r.nodeType === Q && (this.documentElement = r), r;
    },
    removeChild: function(r) {
      var i = Ze(this, r);
      return i === this.documentElement && (this.documentElement = null), i;
    },
    replaceChild: function(r, i) {
      K(this, r, i, ht), r.ownerDocument = this, i && this.removeChild(i), de(r) && (this.documentElement = r);
    },
    // Introduced in DOM Level 2:
    importNode: function(r, i) {
      return Zt(this, r, i);
    },
    // Introduced in DOM Level 2:
    getElementById: function(r) {
      var i = null;
      return Qe(this.documentElement, function(c) {
        if (c.nodeType == Q && c.getAttribute("id") == r)
          return i = c, !0;
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
    createElement: function(r) {
      var i = new ge(y);
      i.ownerDocument = this, this.type === "html" && (r = r.toLowerCase()), n(this.contentType) && (i.namespaceURI = d.HTML), i.nodeName = r, i.tagName = r, i.localName = r, i.childNodes = new T();
      var c = i.attributes = new $();
      return c._ownerElement = i, i;
    },
    /**
     * @returns {DocumentFragment}
     */
    createDocumentFragment: function() {
      var r = new ct(y);
      return r.ownerDocument = this, r.childNodes = new T(), r;
    },
    /**
     * @param {string} data
     * @returns {Text}
     */
    createTextNode: function(r) {
      var i = new dt(y);
      return i.ownerDocument = this, i.childNodes = new T(), i.appendData(r), i;
    },
    /**
     * @param {string} data
     * @returns {Comment}
     */
    createComment: function(r) {
      var i = new We(y);
      return i.ownerDocument = this, i.childNodes = new T(), i.appendData(r), i;
    },
    /**
     * @param {string} data
     * @returns {CDATASection}
     */
    createCDATASection: function(r) {
      var i = new mt(y);
      return i.ownerDocument = this, i.childNodes = new T(), i.appendData(r), i;
    },
    /**
     * @param {string} target
     * @param {string} data
     * @returns {ProcessingInstruction}
     */
    createProcessingInstruction: function(r, i) {
      var c = new lt(y);
      return c.ownerDocument = this, c.childNodes = new T(), c.nodeName = c.target = r, c.nodeValue = c.data = i, c;
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
      if (!k.QName_exact.test(r))
        throw new p(p.INVALID_CHARACTER_ERR, 'invalid character in name "' + r + '"');
      return this.type === "html" && (r = r.toLowerCase()), this._createAttribute(r);
    },
    _createAttribute: function(r) {
      var i = new je(y);
      return i.ownerDocument = this, i.childNodes = new T(), i.name = r, i.nodeName = r, i.localName = r, i.specified = !0, i;
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
      if (!k.Name.test(r))
        throw new p(p.INVALID_CHARACTER_ERR, 'not a valid xml name "' + r + '"');
      if (this.type === "html")
        throw new p("document is an html document", w.NotSupportedError);
      var i = new Nt(y);
      return i.ownerDocument = this, i.childNodes = new T(), i.nodeName = r, i;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Element}
     */
    createElementNS: function(r, i) {
      var c = ne(r, i), h = new ge(y), S = h.attributes = new $();
      return h.childNodes = new T(), h.ownerDocument = this, h.nodeName = i, h.tagName = i, h.namespaceURI = c[0], h.prefix = c[1], h.localName = c[2], S._ownerElement = h, h;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Attr}
     */
    createAttributeNS: function(r, i) {
      var c = ne(r, i), h = new je(y);
      return h.ownerDocument = this, h.childNodes = new T(), h.nodeName = i, h.name = i, h.specified = !0, h.namespaceURI = c[0], h.prefix = c[1], h.localName = c[2], h;
    }
  }, F(Oe, H);
  function ge(r) {
    M(r), this._nsMap = /* @__PURE__ */ Object.create(null);
  }
  ge.prototype = {
    nodeType: Q,
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
      var i = this.getAttributeNode(r);
      return i ? i.value : null;
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
    setAttribute: function(r, i) {
      this._isInHTMLDocumentAndNamespace() && (r = r.toLowerCase());
      var c = this.getAttributeNode(r);
      c ? c.value = c.nodeValue = "" + i : (c = this.ownerDocument._createAttribute(r), c.value = c.nodeValue = "" + i, this.setAttributeNode(c));
    },
    removeAttribute: function(r) {
      var i = this.getAttributeNode(r);
      i && this.removeAttributeNode(i);
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
    removeAttributeNS: function(r, i) {
      var c = this.getAttributeNodeNS(r, i);
      c && this.removeAttributeNode(c);
    },
    hasAttributeNS: function(r, i) {
      return this.getAttributeNodeNS(r, i) != null;
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
    getAttributeNS: function(r, i) {
      var c = this.getAttributeNodeNS(r, i);
      return c ? c.value : null;
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
    setAttributeNS: function(r, i, c) {
      var h = ne(r, i), S = h[2], q = this.getAttributeNodeNS(r, S);
      q ? q.value = q.nodeValue = "" + c : (q = this.ownerDocument.createAttributeNS(r, i), q.value = q.nodeValue = "" + c, this.setAttributeNode(q));
    },
    getAttributeNodeNS: function(r, i) {
      return this.attributes.getNamedItemNS(r, i);
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
      var i = G(r);
      return new O(this, function(c) {
        var h = [];
        return i.length > 0 && Qe(c, function(S) {
          if (S !== c && S.nodeType === Q) {
            var q = S.getAttribute("class");
            if (q) {
              var ue = r === q;
              if (!ue) {
                var Te = G(q);
                ue = i.every(X(Te));
              }
              ue && h.push(S);
            }
          }
        }), h;
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
      var i = (this.nodeType === C ? this : this.ownerDocument).type === "html", c = r.toLowerCase();
      return new O(this, function(h) {
        var S = [];
        return Qe(h, function(q) {
          if (!(q === h || q.nodeType !== Q))
            if (r === "*")
              S.push(q);
            else {
              var ue = q.getQualifiedName(), Te = i && q.namespaceURI === d.HTML ? c : r;
              ue === Te && S.push(q);
            }
        }), S;
      });
    },
    getElementsByTagNameNS: function(r, i) {
      return new O(this, function(c) {
        var h = [];
        return Qe(c, function(S) {
          S !== c && S.nodeType === Q && (r === "*" || S.namespaceURI === r) && (i === "*" || S.localName == i) && h.push(S);
        }), h;
      });
    }
  }, Oe.prototype.getElementsByClassName = ge.prototype.getElementsByClassName, Oe.prototype.getElementsByTagName = ge.prototype.getElementsByTagName, Oe.prototype.getElementsByTagNameNS = ge.prototype.getElementsByTagNameNS, F(ge, H);
  function je(r) {
    M(r), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
  }
  je.prototype.nodeType = se, F(je, H);
  function $e(r) {
    M(r);
  }
  $e.prototype = {
    data: "",
    substringData: function(r, i) {
      return this.data.substring(r, r + i);
    },
    appendData: function(r) {
      r = this.data + r, this.nodeValue = this.data = r, this.length = r.length;
    },
    insertData: function(r, i) {
      this.replaceData(r, 0, i);
    },
    deleteData: function(r, i) {
      this.replaceData(r, i, "");
    },
    replaceData: function(r, i, c) {
      var h = this.data.substring(0, r), S = this.data.substring(r + i);
      c = h + c + S, this.nodeValue = this.data = c, this.length = c.length;
    }
  }, F($e, H);
  function dt(r) {
    M(r);
  }
  dt.prototype = {
    nodeName: "#text",
    nodeType: Ee,
    splitText: function(r) {
      var i = this.data, c = i.substring(r);
      i = i.substring(0, r), this.data = this.nodeValue = i, this.length = i.length;
      var h = this.ownerDocument.createTextNode(c);
      return this.parentNode && this.parentNode.insertBefore(h, this.nextSibling), h;
    }
  }, F(dt, $e);
  function We(r) {
    M(r);
  }
  We.prototype = {
    nodeName: "#comment",
    nodeType: x
  }, F(We, $e);
  function mt(r) {
    M(r);
  }
  mt.prototype = {
    nodeName: "#cdata-section",
    nodeType: Le
  }, F(mt, dt);
  function At(r) {
    M(r);
  }
  At.prototype.nodeType = P, F(At, H);
  function Ot(r) {
    M(r);
  }
  Ot.prototype.nodeType = _, F(Ot, H);
  function Ct(r) {
    M(r);
  }
  Ct.prototype.nodeType = Be, F(Ct, H);
  function Nt(r) {
    M(r);
  }
  Nt.prototype.nodeType = he, F(Nt, H);
  function ct(r) {
    M(r);
  }
  ct.prototype.nodeName = "#document-fragment", ct.prototype.nodeType = j, F(ct, H);
  function lt(r) {
    M(r);
  }
  lt.prototype.nodeType = v, F(lt, $e);
  function gt() {
  }
  gt.prototype.serializeToString = function(r, i) {
    return ye.call(r, i);
  }, H.prototype.toString = ye;
  function ye(r) {
    var i = [], c = this.nodeType === C && this.documentElement || this, h = c.prefix, S = c.namespaceURI;
    if (S && h == null) {
      var h = c.lookupPrefix(S);
      if (h == null)
        var q = [
          { namespace: S, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return ut(this, i, r, q), i.join("");
  }
  function _e(r, i, c) {
    var h = r.prefix || "", S = r.namespaceURI;
    if (!S || h === "xml" && S === d.XML || S === d.XMLNS)
      return !1;
    for (var q = c.length; q--; ) {
      var ue = c[q];
      if (ue.prefix === h)
        return ue.namespace !== S;
    }
    return !0;
  }
  function nt(r, i, c) {
    r.push(" ", i, '="', c.replace(/[<>&"\t\n\r]/g, Je), '"');
  }
  function ut(r, i, c, h) {
    h || (h = []);
    var S = r.nodeType === C ? r : r.ownerDocument, q = S.type === "html";
    if (c)
      if (r = c(r), r) {
        if (typeof r == "string") {
          i.push(r);
          return;
        }
      } else
        return;
    switch (r.nodeType) {
      case Q:
        var ue = r.attributes, Te = ue.length, Ie = r.firstChild, Re = r.tagName, me = Re;
        if (!q && !r.prefix && r.namespaceURI) {
          for (var Pe, Et = 0; Et < ue.length; Et++)
            if (ue.item(Et).name === "xmlns") {
              Pe = ue.item(Et).value;
              break;
            }
          if (!Pe)
            for (var it = h.length - 1; it >= 0; it--) {
              var Ge = h[it];
              if (Ge.prefix === "" && Ge.namespace === r.namespaceURI) {
                Pe = Ge.namespace;
                break;
              }
            }
          if (Pe !== r.namespaceURI)
            for (var it = h.length - 1; it >= 0; it--) {
              var Ge = h[it];
              if (Ge.namespace === r.namespaceURI) {
                Ge.prefix && (me = Ge.prefix + ":" + Re);
                break;
              }
            }
        }
        i.push("<", me);
        for (var vt = 0; vt < Te; vt++) {
          var et = ue.item(vt);
          et.prefix == "xmlns" ? h.push({
            prefix: et.localName,
            namespace: et.value
          }) : et.nodeName == "xmlns" && h.push({ prefix: "", namespace: et.value });
        }
        for (var vt = 0; vt < Te; vt++) {
          var et = ue.item(vt);
          if (_e(et, q, h)) {
            var yt = et.prefix || "", _t = et.namespaceURI;
            nt(i, yt ? "xmlns:" + yt : "xmlns", _t), h.push({ prefix: yt, namespace: _t });
          }
          ut(et, i, c, h);
        }
        if (Re === me && _e(r, q, h)) {
          var yt = r.prefix || "", _t = r.namespaceURI;
          nt(i, yt ? "xmlns:" + yt : "xmlns", _t), h.push({ prefix: yt, namespace: _t });
        }
        var zt = !Ie;
        if (zt && (q || r.namespaceURI === d.HTML) && (zt = g(Re)), zt)
          i.push("/>");
        else {
          if (i.push(">"), q && s(Re))
            for (; Ie; )
              Ie.data ? i.push(Ie.data) : ut(Ie, i, c, h.slice()), Ie = Ie.nextSibling;
          else
            for (; Ie; )
              ut(Ie, i, c, h.slice()), Ie = Ie.nextSibling;
          i.push("</", me, ">");
        }
        return;
      case C:
      case j:
        for (var Ie = r.firstChild; Ie; )
          ut(Ie, i, c, h.slice()), Ie = Ie.nextSibling;
        return;
      case se:
        return nt(i, r.name, r.value);
      case Ee:
        return i.push(r.data.replace(/[<&>]/g, Je));
      case Le:
        return i.push(k.CDATA_START, r.data, k.CDATA_END);
      case x:
        return i.push(k.COMMENT_START, r.data, k.COMMENT_END);
      case P:
        var er = r.publicId, wt = r.systemId;
        i.push(k.DOCTYPE_DECL_START, " ", r.name), er ? (i.push(" ", k.PUBLIC, " ", er), wt && wt !== "." && i.push(" ", wt)) : wt && wt !== "." && i.push(" ", k.SYSTEM, " ", wt), r.internalSubset && i.push(" [", r.internalSubset, "]"), i.push(">");
        return;
      case v:
        return i.push("<?", r.target, " ", r.data, "?>");
      case he:
        return i.push("&", r.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        i.push("??", r.nodeName);
    }
  }
  function Zt(r, i, c) {
    var h;
    switch (i.nodeType) {
      case Q:
        h = i.cloneNode(!1), h.ownerDocument = r;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case j:
        break;
      case se:
        c = !0;
        break;
    }
    if (h || (h = i.cloneNode(!1)), h.ownerDocument = r, h.parentNode = null, c)
      for (var S = i.firstChild; S; )
        h.appendChild(Zt(r, S, c)), S = S.nextSibling;
    return h;
  }
  function Vt(r, i, c) {
    var h = new i.constructor(y);
    for (var S in i)
      if (o(i, S)) {
        var q = i[S];
        typeof q != "object" && q != h[S] && (h[S] = q);
      }
    switch (i.childNodes && (h.childNodes = new T()), h.ownerDocument = r, h.nodeType) {
      case Q:
        var ue = i.attributes, Te = h.attributes = new $(), Re = ue.length;
        Te._ownerElement = h;
        for (var me = 0; me < Re; me++)
          h.setAttributeNode(Vt(r, ue.item(me), !0));
        break;
      case se:
        c = !0;
    }
    if (c)
      for (var Pe = i.firstChild; Pe; )
        h.appendChild(Vt(r, Pe, c)), Pe = Pe.nextSibling;
    return h;
  }
  function Tt(r, i, c) {
    r[i] = c;
  }
  try {
    if (Object.defineProperty) {
      let r = function(i) {
        switch (i.nodeType) {
          case Q:
          case j:
            var c = [];
            for (i = i.firstChild; i; )
              i.nodeType !== 7 && i.nodeType !== 8 && c.push(r(i)), i = i.nextSibling;
            return c.join("");
          default:
            return i.nodeValue;
        }
      };
      Object.defineProperty(O.prototype, "length", {
        get: function() {
          return L(this), this.$$length;
        }
      }), Object.defineProperty(H.prototype, "textContent", {
        get: function() {
          return r(this);
        },
        set: function(i) {
          switch (this.nodeType) {
            case Q:
            case j:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (i || String(i)) && this.appendChild(this.ownerDocument.createTextNode(i));
              break;
            default:
              this.data = i, this.value = i, this.nodeValue = i;
          }
        }
      }), Tt = function(i, c, h) {
        i["$$" + c] = h;
      };
    }
  } catch {
  }
  return Ne._updateLiveList = L, Ne.Attr = je, Ne.CDATASection = mt, Ne.CharacterData = $e, Ne.Comment = We, Ne.Document = Oe, Ne.DocumentFragment = ct, Ne.DocumentType = At, Ne.DOMImplementation = we, Ne.Element = ge, Ne.Entity = Ct, Ne.EntityReference = Nt, Ne.LiveNodeList = O, Ne.NamedNodeMap = $, Ne.Node = H, Ne.NodeList = T, Ne.Notation = Ot, Ne.Text = dt, Ne.ProcessingInstruction = lt, Ne.XMLSerializer = gt, Ne;
}
var Rt = {}, wr = {}, dn;
function ri() {
  return dn || (dn = 1, function(t) {
    var e = Ut().freeze;
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
  }(wr)), wr;
}
var Yt = {}, mn;
function ni() {
  if (mn) return Yt;
  mn = 1;
  var t = Ut(), e = Xn(), n = dr(), o = t.isHTMLEscapableRawTextElement, a = t.isHTMLMimeType, s = t.isHTMLRawTextElement, g = t.hasOwn, m = t.NAMESPACE, d = n.ParseError, y = n.DOMException, b = 0, p = 1, w = 2, k = 3, M = 4, B = 5, Y = 6, V = 7;
  function G() {
  }
  G.prototype = {
    parse: function(v, x, C) {
      var P = this.domBuilder;
      P.startDocument(), Q(x, x = /* @__PURE__ */ Object.create(null)), fe(v, x, C, P, this.errorHandler), P.endDocument();
    }
  };
  var X = /&#?\w+;?/g;
  function fe(v, x, C, P, j) {
    var _ = a(P.mimeType);
    v.indexOf(e.UNICODE_REPLACEMENT_CHARACTER) >= 0 && j.warning("Unicode replacement character detected, source encoding issues?");
    function f(K) {
      if (K > 65535) {
        K -= 65536;
        var ge = 55296 + (K >> 10), je = 56320 + (K & 1023);
        return String.fromCharCode(ge, je);
      } else
        return String.fromCharCode(K);
    }
    function A(K) {
      var ge = K[K.length - 1] === ";" ? K : K + ";";
      if (!_ && ge !== K)
        return j.error("EntityRef: expecting ;"), K;
      var je = e.Reference.exec(ge);
      if (!je || je[0].length !== ge.length)
        return j.error("entity not matching Reference production: " + K), K;
      var $e = ge.slice(1, -1);
      return g(C, $e) ? C[$e] : $e.charAt(0) === "#" ? f(parseInt($e.substring(1).replace("x", "0x"))) : (j.error("entity not found:" + K), K);
    }
    function R(K) {
      if (K > we) {
        var ge = v.substring(we, K).replace(X, A);
        $ && Z(we), P.characters(ge, 0, K - we), we = K;
      }
    }
    var T = 0, O = 0, L = /\r\n?|\n|$/g, $ = P.locator;
    function Z(K, ge) {
      for (; K >= O && (ge = L.exec(v)); )
        T = O, O = ge.index + ge[0].length, $.lineNumber++;
      $.columnNumber = K - T + 1;
    }
    for (var te = [{ currentNSMap: x }], pe = [], we = 0; ; ) {
      try {
        var H = v.indexOf("<", we);
        if (H < 0) {
          if (!_ && pe.length > 0)
            return j.fatalError("unclosed xml tag(s): " + pe.join(", "));
          if (!v.substring(we).match(/^\s*$/)) {
            var Je = P.doc, Qe = Je.createTextNode(v.substring(we));
            if (Je.documentElement)
              return j.error("Extra content at the end of the document");
            Je.appendChild(Qe), P.currentElement = Qe;
          }
          return;
        }
        if (H > we) {
          var Oe = v.substring(we, H);
          !_ && pe.length === 0 && (Oe = Oe.replace(new RegExp(e.S_OPT.source, "g"), ""), Oe && j.error("Unexpected content outside root element: '" + Oe + "'")), R(H);
        }
        switch (v.charAt(H + 1)) {
          case "/":
            var Ce = v.indexOf(">", H + 2), tt = v.substring(H + 2, Ce > 0 ? Ce : void 0);
            if (!tt)
              return j.fatalError("end tag name missing");
            var Ve = Ce > 0 && e.reg("^", e.QName_group, e.S_OPT, "$").exec(tt);
            if (!Ve)
              return j.fatalError('end tag name contains invalid characters: "' + tt + '"');
            if (!P.currentElement && !P.doc.documentElement)
              return;
            var He = pe[pe.length - 1] || P.currentElement.tagName || P.doc.documentElement.tagName || "";
            if (He !== Ve[1]) {
              var Ze = Ve[1].toLowerCase();
              if (!_ || He.toLowerCase() !== Ze)
                return j.fatalError('Opening and ending tag mismatch: "' + He + '" != "' + tt + '"');
            }
            var Fe = te.pop();
            pe.pop();
            var Xe = Fe.localNSMap;
            if (P.endElement(Fe.uri, Fe.localName, He), Xe)
              for (var qe in Xe)
                g(Xe, qe) && P.endPrefixMapping(qe);
            Ce++;
            break;
          // end element
          case "?":
            $ && Z(H), Ce = he(v, H, P, j);
            break;
          case "!":
            $ && Z(H), Ce = Le(v, H, P, j, _);
            break;
          default:
            $ && Z(H);
            var de = new Be(), rt = te[te.length - 1].currentNSMap, Ce = N(v, H, de, rt, A, j, _), st = de.length;
            if (de.closed || (_ && t.isHTMLVoidElement(de.tagName) ? de.closed = !0 : pe.push(de.tagName)), $ && st) {
              for (var bt = ne($, {}), pt = 0; pt < st; pt++) {
                var ht = de[pt];
                Z(ht.offset), ht.locator = ne($, {});
              }
              P.locator = bt, F(de, P, rt) && te.push(de), P.locator = $;
            } else
              F(de, P, rt) && te.push(de);
            _ && !de.closed ? Ce = z(v, Ce, de.tagName, A, P) : Ce++;
        }
      } catch (K) {
        if (K instanceof d)
          throw K;
        if (K instanceof y)
          throw new d(K.name + ": " + K.message, P.locator, K);
        j.error("element parse error: " + K), Ce = -1;
      }
      Ce > we ? we = Ce : R(Math.max(H, we) + 1);
    }
  }
  function ne(v, x) {
    return x.lineNumber = v.lineNumber, x.columnNumber = v.columnNumber, x;
  }
  function N(v, x, C, P, j, _, f) {
    function A(Z, te, pe) {
      if (g(C.attributeNames, Z))
        return _.fatalError("Attribute " + Z + " redefined");
      if (!f && te.indexOf("<") >= 0)
        return _.fatalError("Unescaped '<' not allowed in attributes values");
      C.addValue(
        Z,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        te.replace(/[\t\n\r]/g, " ").replace(X, j),
        pe
      );
    }
    for (var R, T, O = ++x, L = b; ; ) {
      var $ = v.charAt(O);
      switch ($) {
        case "=":
          if (L === p)
            R = v.slice(x, O), L = k;
          else if (L === w)
            L = k;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (L === k || L === p)
            if (L === p && (_.warning('attribute value must after "="'), R = v.slice(x, O)), x = O + 1, O = v.indexOf($, x), O > 0)
              T = v.slice(x, O), A(R, T, x - 1), L = B;
            else
              throw new Error("attribute value no end '" + $ + "' match");
          else if (L == M)
            T = v.slice(x, O), A(R, T, x), _.warning('attribute "' + R + '" missed start quot(' + $ + ")!!"), x = O + 1, L = B;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (L) {
            case b:
              C.setTagName(v.slice(x, O));
            case B:
            case Y:
            case V:
              L = V, C.closed = !0;
            case M:
            case p:
              break;
            case w:
              C.closed = !0;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return _.error("unexpected end of input"), L == b && C.setTagName(v.slice(x, O)), O;
        case ">":
          switch (L) {
            case b:
              C.setTagName(v.slice(x, O));
            case B:
            case Y:
            case V:
              break;
            //normal
            case M:
            //Compatible state
            case p:
              T = v.slice(x, O), T.slice(-1) === "/" && (C.closed = !0, T = T.slice(0, -1));
            case w:
              L === w && (T = R), L == M ? (_.warning('attribute "' + T + '" missed quot(")!'), A(R, T, x)) : (f || _.warning('attribute "' + T + '" missed value!! "' + T + '" instead!!'), A(T, T, x));
              break;
            case k:
              if (!f)
                return _.fatalError(`AttValue: ' or " expected`);
          }
          return O;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          $ = " ";
        default:
          if ($ <= " ")
            switch (L) {
              case b:
                C.setTagName(v.slice(x, O)), L = Y;
                break;
              case p:
                R = v.slice(x, O), L = w;
                break;
              case M:
                var T = v.slice(x, O);
                _.warning('attribute "' + T + '" missed quot(")!!'), A(R, T, x);
              case B:
                L = Y;
                break;
            }
          else
            switch (L) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case w:
                f || _.warning('attribute "' + R + '" missed value!! "' + R + '" instead2!!'), A(R, R, x), x = O, L = p;
                break;
              case B:
                _.warning('attribute space is required"' + R + '"!!');
              case Y:
                L = p, x = O;
                break;
              case k:
                L = M, x = O;
                break;
              case V:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      O++;
    }
  }
  function F(v, x, C) {
    for (var P = v.tagName, j = null, L = v.length; L--; ) {
      var _ = v[L], f = _.qName, A = _.value, $ = f.indexOf(":");
      if ($ > 0)
        var R = _.prefix = f.slice(0, $), T = f.slice($ + 1), O = R === "xmlns" && T;
      else
        T = f, R = null, O = f === "xmlns" && "";
      _.localName = T, O !== !1 && (j == null && (j = /* @__PURE__ */ Object.create(null), Q(C, C = /* @__PURE__ */ Object.create(null))), C[O] = j[O] = A, _.uri = m.XMLNS, x.startPrefixMapping(O, A));
    }
    for (var L = v.length; L--; )
      _ = v[L], _.prefix && (_.prefix === "xml" && (_.uri = m.XML), _.prefix !== "xmlns" && (_.uri = C[_.prefix]));
    var $ = P.indexOf(":");
    $ > 0 ? (R = v.prefix = P.slice(0, $), T = v.localName = P.slice($ + 1)) : (R = null, T = v.localName = P);
    var Z = v.uri = C[R || ""];
    if (x.startElement(Z, T, P, v), v.closed) {
      if (x.endElement(Z, T, P), j)
        for (R in j)
          g(j, R) && x.endPrefixMapping(R);
    } else
      return v.currentNSMap = C, v.localNSMap = j, !0;
  }
  function z(v, x, C, P, j) {
    var _ = o(C);
    if (_ || s(C)) {
      var f = v.indexOf("</" + C + ">", x), A = v.substring(x + 1, f);
      return _ && (A = A.replace(X, P)), j.characters(A, 0, A.length), f;
    }
    return x + 1;
  }
  function Q(v, x) {
    for (var C in v)
      g(v, C) && (x[C] = v[C]);
  }
  function se(v, x) {
    var C = x;
    function P(O) {
      return O = O || 0, v.charAt(C + O);
    }
    function j(O) {
      O = O || 1, C += O;
    }
    function _() {
      for (var O = 0; C < v.length; ) {
        var L = P();
        if (L !== " " && L !== `
` && L !== "	" && L !== "\r")
          return O;
        O++, j();
      }
      return -1;
    }
    function f() {
      return v.substring(C);
    }
    function A(O) {
      return v.substring(C, C + O.length) === O;
    }
    function R(O) {
      return v.substring(C, C + O.length).toUpperCase() === O.toUpperCase();
    }
    function T(O) {
      var L = e.reg("^", O), $ = L.exec(f());
      return $ ? (j($[0].length), $[0]) : null;
    }
    return {
      char: P,
      getIndex: function() {
        return C;
      },
      getMatch: T,
      getSource: function() {
        return v;
      },
      skip: j,
      skipBlanks: _,
      substringFromIndex: f,
      substringStartsWith: A,
      substringStartsWithCaseInsensitive: R
    };
  }
  function Ee(v, x) {
    function C(A, R) {
      var T = e.PI.exec(A.substringFromIndex());
      return T ? T[1].toLowerCase() === "xml" ? R.fatalError(
        "xml declaration is only allowed at the start of the document, but found at position " + A.getIndex()
      ) : (A.skip(T[0].length), T[0]) : R.fatalError("processing instruction is not well-formed at position " + A.getIndex());
    }
    var P = v.getSource();
    if (v.char() === "[") {
      v.skip(1);
      for (var j = v.getIndex(); v.getIndex() < P.length; ) {
        if (v.skipBlanks(), v.char() === "]") {
          var _ = P.substring(j, v.getIndex());
          return v.skip(1), _;
        }
        var f = null;
        if (v.char() === "<" && v.char(1) === "!")
          switch (v.char(2)) {
            case "E":
              v.char(3) === "L" ? f = v.getMatch(e.elementdecl) : v.char(3) === "N" && (f = v.getMatch(e.EntityDecl));
              break;
            case "A":
              f = v.getMatch(e.AttlistDecl);
              break;
            case "N":
              f = v.getMatch(e.NotationDecl);
              break;
            case "-":
              f = v.getMatch(e.Comment);
              break;
          }
        else if (v.char() === "<" && v.char(1) === "?")
          f = C(v, x);
        else if (v.char() === "%")
          f = v.getMatch(e.PEReference);
        else
          return x.fatalError("Error detected in Markup declaration");
        if (!f)
          return x.fatalError("Error in internal subset at position " + v.getIndex());
      }
      return x.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function Le(v, x, C, P, j) {
    var _ = se(v, x);
    switch (j ? _.char(2).toUpperCase() : _.char(2)) {
      case "-":
        var f = _.getMatch(e.Comment);
        return f ? (C.comment(f, e.COMMENT_START.length, f.length - e.COMMENT_START.length - e.COMMENT_END.length), _.getIndex()) : P.fatalError("comment is not well-formed at position " + _.getIndex());
      case "[":
        var A = _.getMatch(e.CDSect);
        return A ? !j && !C.currentElement ? P.fatalError("CDATA outside of element") : (C.startCDATA(), C.characters(A, e.CDATA_START.length, A.length - e.CDATA_START.length - e.CDATA_END.length), C.endCDATA(), _.getIndex()) : P.fatalError("Invalid CDATA starting at position " + x);
      case "D": {
        if (C.doc && C.doc.documentElement)
          return P.fatalError("Doctype not allowed inside or after documentElement at position " + _.getIndex());
        if (j ? !_.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START) : !_.substringStartsWith(e.DOCTYPE_DECL_START))
          return P.fatalError("Expected " + e.DOCTYPE_DECL_START + " at position " + _.getIndex());
        if (_.skip(e.DOCTYPE_DECL_START.length), _.skipBlanks() < 1)
          return P.fatalError("Expected whitespace after " + e.DOCTYPE_DECL_START + " at position " + _.getIndex());
        var R = {
          name: void 0,
          publicId: void 0,
          systemId: void 0,
          internalSubset: void 0
        };
        if (R.name = _.getMatch(e.Name), !R.name)
          return P.fatalError("doctype name missing or contains unexpected characters at position " + _.getIndex());
        if (j && R.name.toLowerCase() !== "html" && P.warning("Unexpected DOCTYPE in HTML document at position " + _.getIndex()), _.skipBlanks(), _.substringStartsWith(e.PUBLIC) || _.substringStartsWith(e.SYSTEM)) {
          var T = e.ExternalID_match.exec(_.substringFromIndex());
          if (!T)
            return P.fatalError("doctype external id is not well-formed at position " + _.getIndex());
          T.groups.SystemLiteralOnly !== void 0 ? R.systemId = T.groups.SystemLiteralOnly : (R.systemId = T.groups.SystemLiteral, R.publicId = T.groups.PubidLiteral), _.skip(T[0].length);
        } else if (j && _.substringStartsWithCaseInsensitive(e.SYSTEM)) {
          if (_.skip(e.SYSTEM.length), _.skipBlanks() < 1)
            return P.fatalError("Expected whitespace after " + e.SYSTEM + " at position " + _.getIndex());
          if (R.systemId = _.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral), !R.systemId)
            return P.fatalError(
              "Expected " + e.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + e.SYSTEM + " at position " + _.getIndex()
            );
        }
        return j && R.systemId && !e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(R.systemId) && P.warning("Unexpected doctype.systemId in HTML document at position " + _.getIndex()), j || (_.skipBlanks(), R.internalSubset = Ee(_, P)), _.skipBlanks(), _.char() !== ">" ? P.fatalError("doctype not terminated with > at position " + _.getIndex()) : (_.skip(1), C.startDTD(R.name, R.publicId, R.systemId, R.internalSubset), C.endDTD(), _.getIndex());
      }
      default:
        return P.fatalError('Not well-formed XML starting with "<!" at position ' + x);
    }
  }
  function he(v, x, C, P) {
    var j = v.substring(x).match(e.PI);
    if (!j)
      return P.fatalError("Invalid processing instruction starting at position " + x);
    if (j[1].toLowerCase() === "xml") {
      if (x > 0)
        return P.fatalError(
          "processing instruction at position " + x + " is an xml declaration which is only at the start of the document"
        );
      if (!e.XMLDecl.test(v.substring(x)))
        return P.fatalError("xml declaration is not well-formed");
    }
    return C.processingInstruction(j[1], j[2]), x + j[0].length;
  }
  function Be() {
    this.attributeNames = /* @__PURE__ */ Object.create(null);
  }
  return Be.prototype = {
    setTagName: function(v) {
      if (!e.QName_exact.test(v))
        throw new Error("invalid tagName:" + v);
      this.tagName = v;
    },
    addValue: function(v, x, C) {
      if (!e.QName_exact.test(v))
        throw new Error("invalid attribute:" + v);
      this.attributeNames[v] = this.length, this[this.length++] = { qName: v, value: x, offset: C };
    },
    length: 0,
    getLocalName: function(v) {
      return this[v].localName;
    },
    getLocator: function(v) {
      return this[v].locator;
    },
    getQName: function(v) {
      return this[v].qName;
    },
    getURI: function(v) {
      return this[v].uri;
    },
    getValue: function(v) {
      return this[v].value;
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
  }, Yt.XMLReader = G, Yt.parseUtils = se, Yt.parseDoctypeCommentOrCData = Le, Yt;
}
var gn;
function ui() {
  if (gn) return Rt;
  gn = 1;
  var t = Ut(), e = Wn(), n = dr(), o = ri(), a = ni(), s = e.DOMImplementation, g = t.hasDefaultHTMLNamespace, m = t.isHTMLMimeType, d = t.isValidMimeType, y = t.MIME_TYPE, b = t.NAMESPACE, p = n.ParseError, w = a.XMLReader;
  function k(N) {
    return N.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028\u2029]/g, `
`);
  }
  function M(N) {
    if (N = N || {}, N.locator === void 0 && (N.locator = !0), this.assign = N.assign || t.assign, this.domHandler = N.domHandler || B, this.onError = N.onError || N.errorHandler, N.errorHandler && typeof N.errorHandler != "function")
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    N.errorHandler && N.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = N.normalizeLineEndings || k, this.locator = !!N.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), N.xmlns);
  }
  M.prototype.parseFromString = function(N, F) {
    if (!d(F))
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + F + '" is not valid.');
    var z = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), Q = o.XML_ENTITIES, se = z[""] || null;
    g(F) ? (Q = o.HTML_ENTITIES, se = b.HTML) : F === y.XML_SVG_IMAGE && (se = b.SVG), z[""] = se, z.xml = z.xml || b.XML;
    var Ee = new this.domHandler({
      mimeType: F,
      defaultNamespace: se,
      onError: this.onError
    }), Le = this.locator ? {} : void 0;
    this.locator && Ee.setDocumentLocator(Le);
    var he = new w();
    he.errorHandler = Ee, he.domBuilder = Ee;
    var Be = !t.isHTMLMimeType(F);
    return Be && typeof N != "string" && he.errorHandler.fatalError("source is not a string"), he.parse(this.normalizeLineEndings(String(N)), z, Q), Ee.doc.documentElement || he.errorHandler.fatalError("missing root element"), Ee.doc;
  };
  function B(N) {
    var F = N || {};
    this.mimeType = F.mimeType || y.XML_APPLICATION, this.defaultNamespace = F.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = F.onError;
  }
  function Y(N, F) {
    F.lineNumber = N.lineNumber, F.columnNumber = N.columnNumber;
  }
  B.prototype = {
    /**
     * Either creates an XML or an HTML document and stores it under `this.doc`.
     * If it is an XML document, `this.defaultNamespace` is used to create it,
     * and it will not contain any `childNodes`.
     * If it is an HTML document, it will be created without any `childNodes`.
     *
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
     */
    startDocument: function() {
      var N = new s();
      this.doc = m(this.mimeType) ? N.createHTMLDocument(!1) : N.createDocument(this.defaultNamespace, "");
    },
    startElement: function(N, F, z, Q) {
      var se = this.doc, Ee = se.createElementNS(N, z || F), Le = Q.length;
      X(this, Ee), this.currentElement = Ee, this.locator && Y(this.locator, Ee);
      for (var he = 0; he < Le; he++) {
        var N = Q.getURI(he), Be = Q.getValue(he), z = Q.getQName(he), v = se.createAttributeNS(N, z);
        this.locator && Y(Q.getLocator(he), v), v.value = v.nodeValue = Be, Ee.setAttributeNode(v);
      }
    },
    endElement: function(N, F, z) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(N, F) {
    },
    endPrefixMapping: function(N) {
    },
    processingInstruction: function(N, F) {
      var z = this.doc.createProcessingInstruction(N, F);
      this.locator && Y(this.locator, z), X(this, z);
    },
    ignorableWhitespace: function(N, F, z) {
    },
    characters: function(N, F, z) {
      if (N = G.apply(this, arguments), N) {
        if (this.cdata)
          var Q = this.doc.createCDATASection(N);
        else
          var Q = this.doc.createTextNode(N);
        this.currentElement ? this.currentElement.appendChild(Q) : /^\s*$/.test(N) && this.doc.appendChild(Q), this.locator && Y(this.locator, Q);
      }
    },
    skippedEntity: function(N) {
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
    setDocumentLocator: function(N) {
      N && (N.lineNumber = 0), this.locator = N;
    },
    //LexicalHandler
    comment: function(N, F, z) {
      N = G.apply(this, arguments);
      var Q = this.doc.createComment(N);
      this.locator && Y(this.locator, Q), X(this, Q);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(N, F, z, Q) {
      var se = this.doc.implementation;
      if (se && se.createDocumentType) {
        var Ee = se.createDocumentType(N, F, z, Q);
        this.locator && Y(this.locator, Ee), X(this, Ee), this.doc.doctype = Ee;
      }
    },
    reportError: function(N, F) {
      if (typeof this.onError == "function")
        try {
          this.onError(N, F, this);
        } catch (z) {
          throw new p("Reporting " + N + ' "' + F + '" caused ' + z, this.locator);
        }
      else
        console.error("[xmldom " + N + "]	" + F, V(this.locator));
    },
    /**
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(N) {
      this.reportError("warning", N);
    },
    error: function(N) {
      this.reportError("error", N);
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
    fatalError: function(N) {
      throw this.reportError("fatalError", N), new p(N, this.locator);
    }
  };
  function V(N) {
    if (N)
      return `
@#[line:` + N.lineNumber + ",col:" + N.columnNumber + "]";
  }
  function G(N, F, z) {
    return typeof N == "string" ? N.substr(F, z) : N.length >= F + z || F ? new java.lang.String(N, F, z) + "" : N;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function(N) {
      B.prototype[N] = function() {
        return null;
      };
    }
  );
  function X(N, F) {
    N.currentElement ? N.currentElement.appendChild(F) : N.doc.appendChild(F);
  }
  function fe(N) {
    if (N === "error") throw "onErrorStopParsing";
  }
  function ne() {
    throw "onWarningStopParsing";
  }
  return Rt.__DOMHandler = B, Rt.DOMParser = M, Rt.normalizeLineEndings = k, Rt.onErrorStopParsing = fe, Rt.onWarningStopParsing = ne, Rt;
}
var En;
function ii() {
  if (En) return oe;
  En = 1;
  var t = Ut();
  oe.assign = t.assign, oe.hasDefaultHTMLNamespace = t.hasDefaultHTMLNamespace, oe.isHTMLMimeType = t.isHTMLMimeType, oe.isValidMimeType = t.isValidMimeType, oe.MIME_TYPE = t.MIME_TYPE, oe.NAMESPACE = t.NAMESPACE;
  var e = dr();
  oe.DOMException = e.DOMException, oe.DOMExceptionName = e.DOMExceptionName, oe.ExceptionCode = e.ExceptionCode, oe.ParseError = e.ParseError;
  var n = Wn();
  oe.Attr = n.Attr, oe.CDATASection = n.CDATASection, oe.CharacterData = n.CharacterData, oe.Comment = n.Comment, oe.Document = n.Document, oe.DocumentFragment = n.DocumentFragment, oe.DocumentType = n.DocumentType, oe.DOMImplementation = n.DOMImplementation, oe.Element = n.Element, oe.Entity = n.Entity, oe.EntityReference = n.EntityReference, oe.LiveNodeList = n.LiveNodeList, oe.NamedNodeMap = n.NamedNodeMap, oe.Node = n.Node, oe.NodeList = n.NodeList, oe.Notation = n.Notation, oe.ProcessingInstruction = n.ProcessingInstruction, oe.Text = n.Text, oe.XMLSerializer = n.XMLSerializer;
  var o = ui();
  return oe.DOMParser = o.DOMParser, oe.normalizeLineEndings = o.normalizeLineEndings, oe.onErrorStopParsing = o.onErrorStopParsing, oe.onWarningStopParsing = o.onWarningStopParsing, oe;
}
ii();
const Or = "USJ";
var ot = {}, Sr, vn;
function oi() {
  return vn || (vn = 1, Sr = () => {
    const t = "\\ud800-\\udfff", g = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", m = "\\ufe0e\\ufe0f", d = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", y = `[${t}]`, b = `[${g}]`, p = "\\ud83c[\\udffb-\\udfff]", w = `(?:${b}|${p})`, k = `[^${t}]`, M = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", B = "[\\ud800-\\udbff][\\udc00-\\udfff]", Y = "\\u200d", V = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", G = `[${d}]`, X = `${w}?`, fe = `[${m}]?`, ne = `(?:${Y}(?:${[k, M, B].join("|")})${fe + X})*`, N = fe + X + ne, z = `(?:${[`${k}${b}?`, b, M, B, y, G].join("|")})`;
    return new RegExp(`${V}|${p}(?=${p})|${z + N}`, "g");
  }), Sr;
}
var yn;
function ai() {
  if (yn) return ot;
  yn = 1;
  var t = ot && ot.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(ot, "__esModule", { value: !0 });
  var e = t(oi());
  function n(d) {
    if (typeof d != "string")
      throw new Error("A string is expected as input");
    return d.match(e.default()) || [];
  }
  ot.toArray = n;
  function o(d) {
    if (typeof d != "string")
      throw new Error("Input must be a string");
    var y = d.match(e.default());
    return y === null ? 0 : y.length;
  }
  ot.length = o;
  function a(d, y, b) {
    if (y === void 0 && (y = 0), typeof d != "string")
      throw new Error("Input must be a string");
    (typeof y != "number" || y < 0) && (y = 0), typeof b == "number" && b < 0 && (b = 0);
    var p = d.match(e.default());
    return p ? p.slice(y, b).join("") : "";
  }
  ot.substring = a;
  function s(d, y, b) {
    if (y === void 0 && (y = 0), typeof d != "string")
      throw new Error("Input must be a string");
    var p = o(d);
    if (typeof y != "number" && (y = parseInt(y, 10)), y >= p)
      return "";
    y < 0 && (y += p);
    var w;
    typeof b > "u" ? w = p : (typeof b != "number" && (b = parseInt(b, 10)), w = b >= 0 ? b + y : y);
    var k = d.match(e.default());
    return k ? k.slice(y, w).join("") : "";
  }
  ot.substr = s;
  function g(d, y, b, p) {
    if (y === void 0 && (y = 16), b === void 0 && (b = "#"), p === void 0 && (p = "right"), typeof d != "string" || typeof y != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(p) === -1)
      throw new Error("Pad position should be either left or right");
    typeof b != "string" && (b = String(b));
    var w = o(d);
    if (w > y)
      return a(d, 0, y);
    if (w < y) {
      var k = b.repeat(y - w);
      return p === "left" ? k + d : d + k;
    }
    return d;
  }
  ot.limit = g;
  function m(d, y, b) {
    if (b === void 0 && (b = 0), typeof d != "string")
      throw new Error("Input must be a string");
    if (d === "")
      return y === "" ? 0 : -1;
    b = Number(b), b = isNaN(b) ? 0 : b, y = String(y);
    var p = n(d);
    if (b >= p.length)
      return y === "" ? p.length : -1;
    if (y === "")
      return b;
    var w = n(y), k = !1, M;
    for (M = b; M < p.length; M += 1) {
      for (var B = 0; B < w.length && w[B] === p[M + B]; )
        B += 1;
      if (B === w.length && w[B - 1] === p[M + B - 1]) {
        k = !0;
        break;
      }
    }
    return k ? M : -1;
  }
  return ot.indexOf = m, ot;
}
var Bt = ai();
function Kn(t) {
  return t ? Array.isArray(t) ? t : [t] : [];
}
function cr(t, e) {
  if (!(e > Me(t) || e < -Me(t)))
    return mr(t, e, 1);
}
function jt(t, e) {
  return e < 0 || e > Me(t) - 1 ? "" : mr(t, e, 1);
}
function ta(t, e) {
  if (!(e < 0 || e > Me(t) - 1))
    return mr(t, e, 1).codePointAt(0);
}
function si(t, e, n = Me(t)) {
  const o = pi(t, e);
  return !(o === -1 || o + Me(e) !== n);
}
function ci(t, e, n) {
  if (e < 0) return -1;
  if (n) {
    if (jt(t, e) === "}" && jt(t, e - 1) === "\\") return e;
    const s = Qt(t, "\\}", e);
    return s >= 0 ? s + 1 : s;
  }
  let o = e;
  const a = Me(t);
  for (; o < a && (o = Qt(t, "}", o), !(o === -1 || jt(t, o - 1) !== "\\")); )
    o += 1;
  return o >= a ? -1 : o;
}
function li(t, e) {
  const n = [];
  let o = 0, a = 0;
  function s(m, d, y) {
    const b = xt(t, a, d), p = n.length > 0 && at(n[n.length - 1]) ? `${n.pop()}${b}` : b;
    at(m) ? n.push(`${p}${m}`) : (p && n.push(p), n.push(m)), a = d + y;
  }
  const g = Me(t);
  for (; o < g; ) {
    switch (jt(t, o)) {
      case "{":
        if (jt(t, o - 1) !== "\\") {
          const m = ci(t, o, !1);
          if (m >= 0) {
            const d = xt(t, o + 1, m), y = d in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[d]
            ) : d;
            s(y, o, m + 1 - o), o = m, a = m + 1;
          }
        } else
          s("{", o - 1, 2);
        break;
      case "}":
        jt(t, o - 1) !== "\\" || s("}", o - 1, 2);
        break;
    }
    o += 1;
  }
  if (a < g) {
    const m = xt(t, a);
    n.push(
      n.length > 0 && at(n[n.length - 1]) ? `${n.pop()}${m}` : m
    );
  }
  return n;
}
function ra(t, e) {
  return li(t, e).map((n) => `${n}`).join("");
}
function fi(t, e, n = 0) {
  const o = xt(t, n);
  return Qt(o, e) !== -1;
}
function Qt(t, e, n = 0) {
  return Bt.indexOf(t, e, n);
}
function pi(t, e, n) {
  let o = n === void 0 ? Me(t) : n;
  o < 0 ? o = 0 : o >= Me(t) && (o = Me(t) - 1);
  for (let a = o; a >= 0; a--)
    if (mr(t, a, Me(e)) === e)
      return a;
  return -1;
}
function Me(t) {
  return Bt.length(t);
}
function na(t, e) {
  const n = e.toUpperCase();
  return n === "NONE" ? t : t.normalize(n);
}
function ua(t, e, n) {
  return t.localeCompare(e, "en", n);
}
function ia(t, e, n = " ") {
  return e <= Me(t) ? t : Bt.limit(t, e, n, "right");
}
function oa(t, e, n = " ") {
  return e <= Me(t) ? t : Bt.limit(t, e, n, "left");
}
function Dn(t, e) {
  return e > t ? t : e < -t ? 0 : e < 0 ? e + t : e;
}
function bn(t, e, n) {
  const o = Me(t);
  if (e > o || n && (e > n && !(e >= 0 && e < o && n < 0 && n > -o) || n < -o))
    return "";
  const a = Dn(o, e), s = n ? Dn(o, n) : void 0;
  return xt(t, a, s);
}
function An(t, e, n) {
  const o = [];
  if (n !== void 0 && n <= 0)
    return [t];
  if (e === "") return hi(t).slice(0, n);
  let a = e;
  (typeof e == "string" || e instanceof RegExp && !fi(e.flags, "g")) && (a = new RegExp(e, "g"));
  const s = t.match(a);
  let g = 0;
  if (!s) return [t];
  for (let m = 0; m < (n ? n - 1 : s.length); m++) {
    const d = Qt(t, s[m], g), y = Me(s[m]);
    if (o.push(xt(t, g, d)), g = d + y, n !== void 0 && o.length === n)
      break;
  }
  return o.push(xt(t, g)), o;
}
function Qn(t, e, n = 0) {
  return Qt(t, e, n) === n;
}
function mr(t, e = 0, n = Me(t) - e) {
  return Bt.substr(t, e, n);
}
function xt(t, e, n = Me(t)) {
  return Bt.substring(t, e, n);
}
function hi(t) {
  return Bt.toArray(t);
}
function aa(t) {
  return Qn(t, "%") && si(t, "%");
}
function sa(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function ca(t) {
  return t ? Kn(t).map(
    (o) => Array.isArray(o) ? o.map((a) => new RegExp(a)) : new RegExp(o)
  ) : [];
}
function la(t) {
  return t ? Kn(t).map((o) => new RegExp(o)) : [];
}
const di = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function qt(t) {
  return di.test(t);
}
function fa(t) {
  let e = "";
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    if (o === o.toUpperCase() && o !== o.toLowerCase()) {
      if (n > 0) {
        const s = t[n - 1];
        if (!(s === s.toUpperCase() && s !== s.toLowerCase()))
          e += "-";
        else if (n + 1 < t.length) {
          const m = t[n + 1];
          m === m.toLowerCase() && m !== m.toUpperCase() && (e += "-");
        }
      }
      e += o.toLowerCase();
    } else
      e += o;
  }
  return e;
}
const _r = ["chapter", "book", "para", "row", "sidebar", Or], mi = "​", Zn = [
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
], gi = 1, Ei = Zn.length - 1, vi = 1, yi = 1, pa = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, Di = (t) => {
  var e;
  return ((e = Zn[t]) == null ? void 0 : e.chapters) ?? -1;
}, ha = (t, e) => ({
  book: Ye.bookNumberToId(
    Math.max(
      gi,
      Math.min(Ye.bookIdToNumber(t.book) + e, Ei)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), da = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(vi, t.chapterNum + e),
    Di(Ye.bookIdToNumber(t.book))
  ),
  verseNum: 1
}), ma = (t, e) => ({
  ...t,
  verseNum: Math.max(yi, t.verseNum + e)
});
async function ga(t, e, n) {
  const o = Ye.bookNumberToId(t);
  if (!Qn(Intl.getCanonicalLocales(e)[0], "zh"))
    return n({
      localizeKey: `LocalizedId.${o}`,
      languagesToSearch: [e]
    });
  const a = await n({
    localizeKey: `Book.${o}`,
    languagesToSearch: [e]
  }), s = An(a, "-");
  return An(s[0], "ÿ08")[0].trim();
}
function Ea(t) {
  return new Jn(Ye.bookIdToNumber(t.book), t.chapterNum, t.verseNum).BBBCCC;
}
function Cn(t) {
  return new Jn(Ye.bookIdToNumber(t.book), t.chapterNum, t.verseNum).BBBCCCVVV;
}
function va(t, e) {
  return Cn(t) - Cn(e);
}
function bi(t) {
  return `%scrollGroup_${t}%`;
}
function ya(t) {
  return t.map((e) => bi(e));
}
function Da(t, e, n, o) {
  let a;
  switch (e ?? "id") {
    case "English":
      a = Ye.bookIdToEnglishName(t.book);
      break;
    case "id":
      a = t.book;
      break;
    default:
      a = e ?? "";
      break;
  }
  return `${a}${o ?? " "}${t.chapterNum}${n ?? ":"}${t.verseNum}`;
}
const Ai = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function Nn(t) {
  return Ai.test(t);
}
const Ci = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function Ni(t) {
  return Ci.test(t);
}
function Tn(t) {
  let e = "", n = !1, o = "\0";
  for (let a = 0; a < t.length; a += 1) {
    const s = t[a];
    s.charCodeAt(0) < 32 ? (n || (e += " "), n = !0) : !n && s === mi && a + 1 < t.length && Nn(t[a + 1]) || (Nn(s) ? (n || (e += s), n = !0) : Ni(s) && o === s || (e += s, n = !1)), o = s;
  }
  return e;
}
function wn(t) {
  return !t || t.length === 0 ? !0 : t.length === 1 && (t[0] === void 0 || t[0] === "");
}
function Sn(t, e) {
  if (!e || !_r.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(t)} does not have a content array! This should not happen!`
    );
  return t === e.content[e.content.length - 1];
}
function eu(t, e, n, o) {
  if (!t && !n) return !0;
  if (!t || !n) return !1;
  const a = at(t), s = at(n);
  if (a && s) {
    const g = Tn(t), m = Tn(n);
    if (g !== m) {
      if (!qt(cr(g, -1) ?? "") && !qt(cr(m, -1) ?? "") || !Sn(t, e) || !Sn(n, o)) return !1;
      let d = g;
      for (; qt(cr(d, -1) ?? ""); ) d = bn(d, 0, -1);
      let y = m;
      for (; qt(cr(y, -1) ?? ""); ) y = bn(y, 0, -1);
      if (d !== y) return !1;
    }
  } else if (!a && !s) {
    const g = t, m = n, d = Object.keys(g).filter(
      (p) => p !== "content"
    );
    if (d.length !== Object.keys(m).filter((p) => p !== "content").length || d.some((p) => !(p in m) || g[p] !== m[p])) return !1;
    const y = wn(g.content), b = wn(m.content);
    if (y !== b) return !1;
    if (!y && !b) {
      let p = g.content, w = m.content;
      const k = p[p.length - 1];
      _r.includes(g.type) && at(k) && qt(k) && (p = p.slice(0, -1));
      const M = w[w.length - 1];
      if (_r.includes(m.type) && at(M) && qt(M) && (w = w.slice(0, -1)), p.length !== w.length) return !1;
      for (let B = 0; B < p.length; B += 1)
        if (!eu(p[B], g, w[B], m))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function ba(t, e) {
  return eu(t, void 0, e, void 0);
}
const Aa = (t) => (...e) => t.map((o) => o(...e)).every((o) => o), Ca = (t) => async (...e) => {
  const n = t.map(async (o) => o(...e));
  return (await Promise.all(n)).every((o) => o);
}, lr = "chapter", fr = "verse";
var Ti = Object.getOwnPropertyNames, wi = Object.getOwnPropertySymbols, Si = Object.prototype.hasOwnProperty;
function On(t, e) {
  return function(o, a, s) {
    return t(o, a, s) && e(o, a, s);
  };
}
function pr(t) {
  return function(n, o, a) {
    if (!n || !o || typeof n != "object" || typeof o != "object")
      return t(n, o, a);
    var s = a.cache, g = s.get(n), m = s.get(o);
    if (g && m)
      return g === o && m === n;
    s.set(n, o), s.set(o, n);
    var d = t(n, o, a);
    return s.delete(n), s.delete(o), d;
  };
}
function _n(t) {
  return Ti(t).concat(wi(t));
}
var Oi = Object.hasOwn || function(t, e) {
  return Si.call(t, e);
};
function Pt(t, e) {
  return t === e || !t && !e && t !== t && e !== e;
}
var _i = "__v", Ri = "__o", Ii = "_owner", Rn = Object.getOwnPropertyDescriptor, In = Object.keys;
function xi(t, e, n) {
  var o = t.length;
  if (e.length !== o)
    return !1;
  for (; o-- > 0; )
    if (!n.equals(t[o], e[o], o, o, t, e, n))
      return !1;
  return !0;
}
function Mi(t, e) {
  return Pt(t.getTime(), e.getTime());
}
function Bi(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack;
}
function Pi(t, e) {
  return t === e;
}
function xn(t, e, n) {
  var o = t.size;
  if (o !== e.size)
    return !1;
  if (!o)
    return !0;
  for (var a = new Array(o), s = t.entries(), g, m, d = 0; (g = s.next()) && !g.done; ) {
    for (var y = e.entries(), b = !1, p = 0; (m = y.next()) && !m.done; ) {
      if (a[p]) {
        p++;
        continue;
      }
      var w = g.value, k = m.value;
      if (n.equals(w[0], k[0], d, p, t, e, n) && n.equals(w[1], k[1], w[0], k[0], t, e, n)) {
        b = a[p] = !0;
        break;
      }
      p++;
    }
    if (!b)
      return !1;
    d++;
  }
  return !0;
}
var ki = Pt;
function Li(t, e, n) {
  var o = In(t), a = o.length;
  if (In(e).length !== a)
    return !1;
  for (; a-- > 0; )
    if (!tu(t, e, n, o[a]))
      return !1;
  return !0;
}
function Jt(t, e, n) {
  var o = _n(t), a = o.length;
  if (_n(e).length !== a)
    return !1;
  for (var s, g, m; a-- > 0; )
    if (s = o[a], !tu(t, e, n, s) || (g = Rn(t, s), m = Rn(e, s), (g || m) && (!g || !m || g.configurable !== m.configurable || g.enumerable !== m.enumerable || g.writable !== m.writable)))
      return !1;
  return !0;
}
function Fi(t, e) {
  return Pt(t.valueOf(), e.valueOf());
}
function qi(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function Mn(t, e, n) {
  var o = t.size;
  if (o !== e.size)
    return !1;
  if (!o)
    return !0;
  for (var a = new Array(o), s = t.values(), g, m; (g = s.next()) && !g.done; ) {
    for (var d = e.values(), y = !1, b = 0; (m = d.next()) && !m.done; ) {
      if (!a[b] && n.equals(g.value, m.value, g.value, m.value, t, e, n)) {
        y = a[b] = !0;
        break;
      }
      b++;
    }
    if (!y)
      return !1;
  }
  return !0;
}
function ji(t, e) {
  var n = t.length;
  if (e.length !== n)
    return !1;
  for (; n-- > 0; )
    if (t[n] !== e[n])
      return !1;
  return !0;
}
function $i(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password;
}
function tu(t, e, n, o) {
  return (o === Ii || o === Ri || o === _i) && (t.$$typeof || e.$$typeof) ? !0 : Oi(e, o) && n.equals(t[o], e[o], o, o, t, e, n);
}
var Ui = "[object Arguments]", Vi = "[object Boolean]", zi = "[object Date]", Hi = "[object Error]", Gi = "[object Map]", Yi = "[object Number]", Ji = "[object Object]", Xi = "[object RegExp]", Wi = "[object Set]", Ki = "[object String]", Qi = "[object URL]", Zi = Array.isArray, Bn = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, Pn = Object.assign, eo = Object.prototype.toString.call.bind(Object.prototype.toString);
function to(t) {
  var e = t.areArraysEqual, n = t.areDatesEqual, o = t.areErrorsEqual, a = t.areFunctionsEqual, s = t.areMapsEqual, g = t.areNumbersEqual, m = t.areObjectsEqual, d = t.arePrimitiveWrappersEqual, y = t.areRegExpsEqual, b = t.areSetsEqual, p = t.areTypedArraysEqual, w = t.areUrlsEqual;
  return function(M, B, Y) {
    if (M === B)
      return !0;
    if (M == null || B == null)
      return !1;
    var V = typeof M;
    if (V !== typeof B)
      return !1;
    if (V !== "object")
      return V === "number" ? g(M, B, Y) : V === "function" ? a(M, B, Y) : !1;
    var G = M.constructor;
    if (G !== B.constructor)
      return !1;
    if (G === Object)
      return m(M, B, Y);
    if (Zi(M))
      return e(M, B, Y);
    if (Bn != null && Bn(M))
      return p(M, B, Y);
    if (G === Date)
      return n(M, B, Y);
    if (G === RegExp)
      return y(M, B, Y);
    if (G === Map)
      return s(M, B, Y);
    if (G === Set)
      return b(M, B, Y);
    var X = eo(M);
    return X === zi ? n(M, B, Y) : X === Xi ? y(M, B, Y) : X === Gi ? s(M, B, Y) : X === Wi ? b(M, B, Y) : X === Ji ? typeof M.then != "function" && typeof B.then != "function" && m(M, B, Y) : X === Qi ? w(M, B, Y) : X === Hi ? o(M, B, Y) : X === Ui ? m(M, B, Y) : X === Vi || X === Yi || X === Ki ? d(M, B, Y) : !1;
  };
}
function ro(t) {
  var e = t.circular, n = t.createCustomConfig, o = t.strict, a = {
    areArraysEqual: o ? Jt : xi,
    areDatesEqual: Mi,
    areErrorsEqual: Bi,
    areFunctionsEqual: Pi,
    areMapsEqual: o ? On(xn, Jt) : xn,
    areNumbersEqual: ki,
    areObjectsEqual: o ? Jt : Li,
    arePrimitiveWrappersEqual: Fi,
    areRegExpsEqual: qi,
    areSetsEqual: o ? On(Mn, Jt) : Mn,
    areTypedArraysEqual: o ? Jt : ji,
    areUrlsEqual: $i
  };
  if (n && (a = Pn({}, a, n(a))), e) {
    var s = pr(a.areArraysEqual), g = pr(a.areMapsEqual), m = pr(a.areObjectsEqual), d = pr(a.areSetsEqual);
    a = Pn({}, a, {
      areArraysEqual: s,
      areMapsEqual: g,
      areObjectsEqual: m,
      areSetsEqual: d
    });
  }
  return a;
}
function no(t) {
  return function(e, n, o, a, s, g, m) {
    return t(e, n, m);
  };
}
function uo(t) {
  var e = t.circular, n = t.comparator, o = t.createState, a = t.equals, s = t.strict;
  if (o)
    return function(d, y) {
      var b = o(), p = b.cache, w = p === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : p, k = b.meta;
      return n(d, y, {
        cache: w,
        equals: a,
        meta: k,
        strict: s
      });
    };
  if (e)
    return function(d, y) {
      return n(d, y, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: a,
        meta: void 0,
        strict: s
      });
    };
  var g = {
    cache: void 0,
    equals: a,
    meta: void 0,
    strict: s
  };
  return function(d, y) {
    return n(d, y, g);
  };
}
var io = St();
St({ strict: !0 });
St({ circular: !0 });
St({
  circular: !0,
  strict: !0
});
St({
  createInternalComparator: function() {
    return Pt;
  }
});
St({
  strict: !0,
  createInternalComparator: function() {
    return Pt;
  }
});
St({
  circular: !0,
  createInternalComparator: function() {
    return Pt;
  }
});
St({
  circular: !0,
  createInternalComparator: function() {
    return Pt;
  },
  strict: !0
});
function St(t) {
  t === void 0 && (t = {});
  var e = t.circular, n = e === void 0 ? !1 : e, o = t.createInternalComparator, a = t.createState, s = t.strict, g = s === void 0 ? !1 : s, m = ro(t), d = to(m), y = o ? o(d) : no(d);
  return uo({ circular: n, comparator: d, createState: a, equals: y, strict: g });
}
function oo(t, e) {
  return io(t, e);
}
function ao(t, e) {
  if (typeof t != typeof e) return !1;
  if (!t && !e) return !0;
  if (Array.isArray(t)) {
    const s = e, g = t;
    return s.length === 0 ? !0 : s.every((m) => g.includes(m));
  }
  if (typeof t != "object")
    return oo(t, e);
  const n = e, o = t;
  let a = !0;
  return Object.keys(n).forEach((s) => {
    a && (Object.hasOwn(o, s) && ao(o[s], n[s]) || (a = !1));
  }), a;
}
function kn(t, e, n) {
  return JSON.stringify(t, (a, s) => {
    let g = s;
    return e && (g = e(a, g)), g === void 0 && (g = null), g;
  }, n);
}
function so(t, e) {
  function n(a) {
    return Object.keys(a).forEach((s) => {
      a[s] === null ? a[s] = void 0 : typeof a[s] == "object" && (a[s] = n(a[s]));
    }), a;
  }
  const o = JSON.parse(t, e);
  if (o !== null)
    return typeof o == "object" ? n(o) : o;
}
function Na(t) {
  try {
    const e = kn(t);
    return e === kn(so(e));
  } catch {
    return !1;
  }
}
const Ta = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function wa() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0] : new Bu().resolvedOptions().locale;
}
function Sa(t, e = 2) {
  if (t === 0) return "0 Bytes";
  const n = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], o = Math.floor(Math.log(t) / Math.log(1024)), a = n[o];
  return `${new Uu("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(t / 1024 ** o)} ${a}`;
}
const co = 1e3, ru = 60, nu = ru * 60, lo = nu * 24;
function Oa(t, e, n = /* @__PURE__ */ new Date()) {
  if (Number.isNaN(e.valueOf())) return "";
  const o = Math.floor((e.getTime() - n.getTime()) / co), a = Math.round(o / lo);
  if (Math.abs(a) >= 1) return t.format(a, "day");
  const s = Math.round(o / nu);
  if (Math.abs(s) >= 1) return t.format(s, "hour");
  const g = Math.round(o / ru);
  return Math.abs(g) >= 1 ? t.format(g, "minute") : t.format(o, "second");
}
const Mr = {
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
function gr(t) {
  t && Object.values(t).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && gr(e.properties);
    }
  });
}
gr(Mr);
const fo = {
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
  $defs: Mr
};
Object.freeze(fo);
const po = {
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
  $defs: Mr
};
Object.freeze(po);
const uu = {
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
gr(uu);
const ho = {
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
  $defs: uu
};
Object.freeze(ho);
const mo = {
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
Object.freeze(mo);
const iu = {
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
gr(iu);
const go = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: iu
};
Object.freeze(go);
const Eo = "theme-styles";
function vo(t, e) {
  return `${t ? `${t}-` : ""}${e}`;
}
function _a(t, e) {
  return Object.fromEntries(
    Object.entries(t).map(([o, a]) => [
      o,
      a ? Object.fromEntries(
        Object.entries(a).map(([s, g]) => {
          var m;
          return [
            s,
            g ? {
              ...g,
              // Add the derived properties
              themeFamilyId: o,
              type: s,
              id: vo(o, s),
              cssVariables: {
                // Fill in the default css variables
                ...(m = e == null ? void 0 : e[s]) == null ? void 0 : m.cssVariables,
                ...g.cssVariables
              }
            } : void 0
          ];
        }).filter(([, s]) => !!s)
      ) : void 0
    ]).filter(([, o]) => !!o)
  );
}
function yo(t) {
  return `
.${t.id} {
${Object.entries(t.cssVariables).map(([e, n]) => `  --${e}: ${n};`).join(`
`)}
}
`;
}
function Ra(t, e, n) {
  const o = e == null ? void 0 : e.dataset.themeId;
  o && this.document.body.classList.remove(o), this.document.body.classList.add(t.id), e && this.document.head.removeChild(e);
  const a = this.document.createElement("style");
  return a.id = `${Eo}${n ? `-${n}` : ""}`, a.dataset.themeId = t.id, a.textContent = yo(t), this.document.head.appendChild(a), a;
}
const Dt = ["figure", "note", "sidebar", "table"];
Object.freeze(Dt);
class Ue {
  constructor(e) {
    le(this, "usj");
    le(this, "parentMapInternal");
    this.usj = e;
  }
  // If new variables are created to speed up queries, they should be reset here
  usjChanged() {
    this.parentMapInternal = void 0;
  }
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(e) {
    const n = un({ path: e, json: this.usj, wrap: !0 });
    if (n === void 0 || n.length === 0) return;
    if (!Array.isArray(n[0])) return n[0];
    const o = un({ path: e, json: this.usj, wrap: !1 });
    return o.length === 1 && Array.isArray(o[0]) ? o[0] : o;
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
  static createParentMapInternal(e, n, o) {
    var a;
    o.set(e, n), e.content && o.set(e.content, e), (a = e.content) == null || a.forEach((s) => {
      typeof s == "object" && Ue.createParentMapInternal(s, e, o);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((n) => {
      typeof n == "object" && Ue.createParentMapInternal(n, this.usj, e);
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
    const n = [], { parentMap: o } = this;
    let a = e, s = o.get(a);
    for (; s !== void 0; ) {
      if (!s.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !s.content.find((g, m) => {
          if (g !== a) return !1;
          if (!s) throw new Error('undefined "tempParent" should not be possible');
          return n.unshift({ parent: s, index: m }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(a)}`);
      if (s.type === Or) break;
      a = s, s = o.get(s);
    }
    return n;
  }
  static convertWorkingStackToJsonPath(e) {
    let n = "$";
    return e.forEach((o) => {
      n = `${n}.content[${o.index}]`;
    }), n;
  }
  convertJsonPathToWorkingStack(e) {
    const n = [], o = e.match(/content\[(\d+)\]/g);
    if (!o) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let a = this.usj;
    return o.forEach((s, g) => {
      const m = /(\d+)/.exec(s);
      if (!m) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const d = parseInt(m[0], 10);
      if (n.push({ parent: a, index: d }), g + 1 < o.length) {
        if (typeof a == "string" || !a.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(a)}`);
        const y = a.content[d];
        if (typeof y == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(y)}`);
        a = y;
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
  static findRightMostDescendantMarkerObject(e, n, o = []) {
    if (!e.content) return { node: e, parent: n };
    for (let a = e.content.length - 1; a >= 0; a--) {
      const s = e.content[a];
      if (typeof s == "object" && !o.includes(s.type))
        return s.content ? this.findRightMostDescendantMarkerObject(s, e, o) : { node: s, parent: e };
    }
    return { node: e, parent: n };
  }
  static findNextMatchingNodeUsingWorkingStack(e, n, o, a) {
    var g;
    let s = e;
    for (; s !== void 0; ) {
      const m = typeof s == "object" && o.includes(s.type);
      if (!m && a(s, n)) return s;
      if (!m && typeof s == "object" && (((g = s.content) == null ? void 0 : g.length) ?? 0) > 0)
        n.push({ parent: s, index: 0 }), [s] = s.content;
      else
        for (s = void 0; n.length > 0; ) {
          const d = n.pop();
          if (d && d.index + 1 < d.parent.content.length) {
            d.index += 1, n.push(d), s = d.parent.content[d.index];
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
  findNextMatchingNode(e, n, o) {
    const a = this.createWorkingStack(e);
    return Ue.findNextMatchingNodeUsingWorkingStack(
      e,
      a,
      n,
      o
    );
  }
  // #endregion
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return Ue.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion
  // #region USJ + node -> SerializedVerseRef + offset
  /** Find the chapter and verse that apply to a given USJ node */
  findVerseRefForNode(e, n, o = {
    chapterNum: void 0,
    verseNum: void 0,
    startingContentNode: void 0
  }) {
    if (o.verseNum !== void 0 && o.chapterNum !== void 0) return o;
    if (typeof e == "object" && e.number !== void 0) {
      const d = Number.parseInt(e.number, 10);
      if (e.type === lr)
        return o.chapterNum = d, o.verseNum = o.verseNum ?? 0, o.startingContentNode = o.startingContentNode ?? e, o;
      e.type === fr && !o.verseNum && (o.verseNum = d, o.startingContentNode = e);
    }
    if (!n.content)
      throw new Error(`"content" array not found: ${JSON.stringify(n)}`);
    let a = 0;
    for (let d = 0; d < n.content.length; d++)
      if (n.content[d] === e) {
        a = d;
        break;
      }
    let s = a - 1;
    for (; s >= 0 && typeof n.content[s] != "object"; )
      s -= 1;
    if (s < 0) {
      if (n.type === Or)
        return o.chapterNum === void 0 && (o.chapterNum = 1, o.verseNum = 0, o.startingContentNode = void 0), o;
      const d = n, y = this.parentMap.get(d);
      if (!y) throw new Error(`No parent found for ${JSON.stringify(n)}`);
      return this.findVerseRefForNode(d, y, o);
    }
    const g = n.content[s], m = Ue.findRightMostDescendantMarkerObject(
      g,
      n,
      Dt
    );
    return this.findVerseRefForNode(m.node, m.parent, o);
  }
  nodeToVerseRefAndOffset(e, n, o) {
    if (typeof n == "string" && o === void 0)
      throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
    let a;
    if (o === void 0 ? a = this.parentMap.get(n) : a = Array.isArray(o) ? this.parentMap.get(o) : o, a === void 0)
      throw new Error(`Cannot find parent for ${JSON.stringify(o)}`);
    const s = this.findVerseRefForNode(n, a);
    if (!s) return;
    if (!s.chapterNum)
      throw new Error(`Could not determine chapter number for ${JSON.stringify(n)}`);
    const g = {
      book: e,
      chapterNum: s.chapterNum,
      verseNum: s.verseNum ?? 0
    };
    let m = 0;
    return s.startingContentNode !== void 0 && this.findNextMatchingNode(s.startingContentNode, [], (d, y) => {
      var b, p;
      return d === n ? !0 : y.find((w) => Dt.includes(w.parent.type)) ? !1 : typeof d == "string" ? (m += d.length, !1) : d.type === lr && d.number !== ((b = s.chapterNum) == null ? void 0 : b.toString()) || d.type === fr && d.number !== ((p = s.verseNum) == null ? void 0 : p.toString()) ? (m = 0, !0) : !1;
    }), { verseRef: g, offset: m };
  }
  // #endregion
  // #region JSONPath -> SerializedVerseRef + offset
  jsonPathToVerseRefAndOffset(e, n) {
    const o = n ?? this.findBookId();
    if (!o) throw new Error("Not able to determine the book ID");
    const a = this.findSingleValue(e);
    if (!a) throw new Error(`No result found for JSONPath query: ${e}`);
    const s = this.findParent(e);
    if (!s) throw new Error(`Could not determine parent for ${e}`);
    const g = this.nodeToVerseRefAndOffset(o, a, s);
    if (!g)
      throw new Error(
        `Could not determine SerializedVerseRef that corresponds to ${e}`
      );
    return g;
  }
  // #endregion
  // #region SerializedVerseRef + offset -> Node + JSONPath + offset
  verseRefToUsjContentLocation(e, n = 0) {
    if (n < 0) throw new Error("offset must be >= 0");
    const o = this.findBookId() ?? e.book;
    if (!o) throw new Error("Not able to determine the book ID");
    if (o !== e.book)
      throw new Error(`Book IDs don't match: USJ=${o}, SerializedVerseRef=${e.book}`);
    const a = this.findChapterNode(e.chapterNum);
    if (a === void 0)
      throw new Error(`Could not find ${o} chapter ${e.chapterNum}`);
    let s = !1, g = "";
    const m = e.verse ?? e.verseNum.toString(), d = this.findNextMatchingNode(
      a,
      Dt,
      (w, k) => w === a ? e.verseNum === 0 ? (g = Ue.convertWorkingStackToJsonPath(k), !0) : !1 : typeof w != "object" ? !1 : w.type === lr ? (s = !0, !0) : w.type === fr && w.number !== void 0 && w.number === m ? (g = Ue.convertWorkingStackToJsonPath(k), !0) : !1
    );
    if (s || d === void 0 || typeof d == "string")
      throw new Error(`Verse ${m} not found in ${o} ${e.chapterNum}`);
    if (n === 0) return { node: d, offset: 0, jsonPath: g };
    let y = 0, b = 0, p;
    return this.findNextMatchingNode(
      d,
      Dt,
      (w, k) => {
        if (w === d) return !1;
        if (typeof w == "string") {
          if (y += w.length, y > n)
            return g = Ue.convertWorkingStackToJsonPath(k), b = n - y + w.length, p = w, !0;
        } else if (w.type === lr || w.type === fr) return !0;
        return !1;
      }
    ), { node: p ?? d, offset: b, jsonPath: g };
  }
  // #endregion
  // #region Search for text from a node + JSONPath + offset
  findNextLocationOfMatchingText(e, n, o = 1e3) {
    let a = "", s = 0, g = 0, m = 0;
    if (Ue.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      Dt,
      (p) => {
        if (typeof p != "string") return !1;
        s += p.length, a = `${a}${p}`;
        const w = a.indexOf(n);
        return w < 0 ? (g += a.length, a.length > n.length && (a = a.substring(a.length - n.length)), g -= a.length, s > o) : (m = g + w, !0);
      }
    ), m <= 0) return;
    s = 0;
    let d = 0, y = [];
    const b = Ue.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      Dt,
      (p, w) => typeof p != "string" || (s += p.length, s < m + 1) ? !1 : (d = m - s + p.length, y = w, !0)
    );
    if (!b) throw new Error("Internal error: inconsistent search results");
    return {
      node: b,
      offset: d,
      jsonPath: Ue.convertWorkingStackToJsonPath(y)
    };
  }
  // #endregion
  // #region Extract text from a node + JSONPath + offset
  extractText(e, n) {
    let o = "", a = e.offset, s = 0;
    return Ue.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      Dt,
      (g) => {
        if (typeof g != "string") return !1;
        if (a >= g.length)
          return a -= g.length, !1;
        let m = g;
        if (a > 0 && (m = m.substring(a), a = 0), s + m.length < n)
          return s += m.length, o = `${o}${m}`, !1;
        const d = n - s;
        return o = `${o}${m.substring(0, d - 1)}`, !0;
      }
    ), o;
  }
  extractTextBetweenPoints(e, n, o = 100) {
    let a = "";
    return Ue.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      Dt,
      (s, g) => s === n.node && (typeof s == "object" || n.jsonPath === Ue.convertWorkingStackToJsonPath(g)) ? !0 : typeof s != "string" ? !1 : (a = `${a}${s}`, a.length > o && (a = a.substring(0, o)), a.length >= o)
    ), a;
  }
  // #endregion
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, n) {
    let o = 0;
    for (let a = e.length - 1; a >= 0; a--) {
      const s = e[a];
      n(s) ? (e.splice(a, 1), o += 1) : typeof s != "string" && s.content && (o += this.removeContentNodesFromArray(s.content, n));
    }
    return o;
  }
  removeContentNodes(e) {
    const n = Ue.removeContentNodesFromArray(this.usj.content, e);
    return this.usjChanged(), n;
  }
  // #endregion
}
var hr = { exports: {} }, re = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ln;
function Do() {
  if (Ln) return re;
  Ln = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), g = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.iterator;
  function w(f) {
    return f === null || typeof f != "object" ? null : (f = p && f[p] || f["@@iterator"], typeof f == "function" ? f : null);
  }
  var k = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, M = Object.assign, B = {};
  function Y(f, A, R) {
    this.props = f, this.context = A, this.refs = B, this.updater = R || k;
  }
  Y.prototype.isReactComponent = {}, Y.prototype.setState = function(f, A) {
    if (typeof f != "object" && typeof f != "function" && f != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, f, A, "setState");
  }, Y.prototype.forceUpdate = function(f) {
    this.updater.enqueueForceUpdate(this, f, "forceUpdate");
  };
  function V() {
  }
  V.prototype = Y.prototype;
  function G(f, A, R) {
    this.props = f, this.context = A, this.refs = B, this.updater = R || k;
  }
  var X = G.prototype = new V();
  X.constructor = G, M(X, Y.prototype), X.isPureReactComponent = !0;
  var fe = Array.isArray, ne = Object.prototype.hasOwnProperty, N = { current: null }, F = { key: !0, ref: !0, __self: !0, __source: !0 };
  function z(f, A, R) {
    var T, O = {}, L = null, $ = null;
    if (A != null) for (T in A.ref !== void 0 && ($ = A.ref), A.key !== void 0 && (L = "" + A.key), A) ne.call(A, T) && !F.hasOwnProperty(T) && (O[T] = A[T]);
    var Z = arguments.length - 2;
    if (Z === 1) O.children = R;
    else if (1 < Z) {
      for (var te = Array(Z), pe = 0; pe < Z; pe++) te[pe] = arguments[pe + 2];
      O.children = te;
    }
    if (f && f.defaultProps) for (T in Z = f.defaultProps, Z) O[T] === void 0 && (O[T] = Z[T]);
    return { $$typeof: t, type: f, key: L, ref: $, props: O, _owner: N.current };
  }
  function Q(f, A) {
    return { $$typeof: t, type: f.type, key: A, ref: f.ref, props: f.props, _owner: f._owner };
  }
  function se(f) {
    return typeof f == "object" && f !== null && f.$$typeof === t;
  }
  function Ee(f) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + f.replace(/[=:]/g, function(R) {
      return A[R];
    });
  }
  var Le = /\/+/g;
  function he(f, A) {
    return typeof f == "object" && f !== null && f.key != null ? Ee("" + f.key) : A.toString(36);
  }
  function Be(f, A, R, T, O) {
    var L = typeof f;
    (L === "undefined" || L === "boolean") && (f = null);
    var $ = !1;
    if (f === null) $ = !0;
    else switch (L) {
      case "string":
      case "number":
        $ = !0;
        break;
      case "object":
        switch (f.$$typeof) {
          case t:
          case e:
            $ = !0;
        }
    }
    if ($) return $ = f, O = O($), f = T === "" ? "." + he($, 0) : T, fe(O) ? (R = "", f != null && (R = f.replace(Le, "$&/") + "/"), Be(O, A, R, "", function(pe) {
      return pe;
    })) : O != null && (se(O) && (O = Q(O, R + (!O.key || $ && $.key === O.key ? "" : ("" + O.key).replace(Le, "$&/") + "/") + f)), A.push(O)), 1;
    if ($ = 0, T = T === "" ? "." : T + ":", fe(f)) for (var Z = 0; Z < f.length; Z++) {
      L = f[Z];
      var te = T + he(L, Z);
      $ += Be(L, A, R, te, O);
    }
    else if (te = w(f), typeof te == "function") for (f = te.call(f), Z = 0; !(L = f.next()).done; ) L = L.value, te = T + he(L, Z++), $ += Be(L, A, R, te, O);
    else if (L === "object") throw A = String(f), Error("Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(f).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead.");
    return $;
  }
  function v(f, A, R) {
    if (f == null) return f;
    var T = [], O = 0;
    return Be(f, T, "", "", function(L) {
      return A.call(R, L, O++);
    }), T;
  }
  function x(f) {
    if (f._status === -1) {
      var A = f._result;
      A = A(), A.then(function(R) {
        (f._status === 0 || f._status === -1) && (f._status = 1, f._result = R);
      }, function(R) {
        (f._status === 0 || f._status === -1) && (f._status = 2, f._result = R);
      }), f._status === -1 && (f._status = 0, f._result = A);
    }
    if (f._status === 1) return f._result.default;
    throw f._result;
  }
  var C = { current: null }, P = { transition: null }, j = { ReactCurrentDispatcher: C, ReactCurrentBatchConfig: P, ReactCurrentOwner: N };
  function _() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return re.Children = { map: v, forEach: function(f, A, R) {
    v(f, function() {
      A.apply(this, arguments);
    }, R);
  }, count: function(f) {
    var A = 0;
    return v(f, function() {
      A++;
    }), A;
  }, toArray: function(f) {
    return v(f, function(A) {
      return A;
    }) || [];
  }, only: function(f) {
    if (!se(f)) throw Error("React.Children.only expected to receive a single React element child.");
    return f;
  } }, re.Component = Y, re.Fragment = n, re.Profiler = a, re.PureComponent = G, re.StrictMode = o, re.Suspense = d, re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = j, re.act = _, re.cloneElement = function(f, A, R) {
    if (f == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + f + ".");
    var T = M({}, f.props), O = f.key, L = f.ref, $ = f._owner;
    if (A != null) {
      if (A.ref !== void 0 && (L = A.ref, $ = N.current), A.key !== void 0 && (O = "" + A.key), f.type && f.type.defaultProps) var Z = f.type.defaultProps;
      for (te in A) ne.call(A, te) && !F.hasOwnProperty(te) && (T[te] = A[te] === void 0 && Z !== void 0 ? Z[te] : A[te]);
    }
    var te = arguments.length - 2;
    if (te === 1) T.children = R;
    else if (1 < te) {
      Z = Array(te);
      for (var pe = 0; pe < te; pe++) Z[pe] = arguments[pe + 2];
      T.children = Z;
    }
    return { $$typeof: t, type: f.type, key: O, ref: L, props: T, _owner: $ };
  }, re.createContext = function(f) {
    return f = { $$typeof: g, _currentValue: f, _currentValue2: f, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, f.Provider = { $$typeof: s, _context: f }, f.Consumer = f;
  }, re.createElement = z, re.createFactory = function(f) {
    var A = z.bind(null, f);
    return A.type = f, A;
  }, re.createRef = function() {
    return { current: null };
  }, re.forwardRef = function(f) {
    return { $$typeof: m, render: f };
  }, re.isValidElement = se, re.lazy = function(f) {
    return { $$typeof: b, _payload: { _status: -1, _result: f }, _init: x };
  }, re.memo = function(f, A) {
    return { $$typeof: y, type: f, compare: A === void 0 ? null : A };
  }, re.startTransition = function(f) {
    var A = P.transition;
    P.transition = {};
    try {
      f();
    } finally {
      P.transition = A;
    }
  }, re.unstable_act = _, re.useCallback = function(f, A) {
    return C.current.useCallback(f, A);
  }, re.useContext = function(f) {
    return C.current.useContext(f);
  }, re.useDebugValue = function() {
  }, re.useDeferredValue = function(f) {
    return C.current.useDeferredValue(f);
  }, re.useEffect = function(f, A) {
    return C.current.useEffect(f, A);
  }, re.useId = function() {
    return C.current.useId();
  }, re.useImperativeHandle = function(f, A, R) {
    return C.current.useImperativeHandle(f, A, R);
  }, re.useInsertionEffect = function(f, A) {
    return C.current.useInsertionEffect(f, A);
  }, re.useLayoutEffect = function(f, A) {
    return C.current.useLayoutEffect(f, A);
  }, re.useMemo = function(f, A) {
    return C.current.useMemo(f, A);
  }, re.useReducer = function(f, A, R) {
    return C.current.useReducer(f, A, R);
  }, re.useRef = function(f) {
    return C.current.useRef(f);
  }, re.useState = function(f) {
    return C.current.useState(f);
  }, re.useSyncExternalStore = function(f, A, R) {
    return C.current.useSyncExternalStore(f, A, R);
  }, re.useTransition = function() {
    return C.current.useTransition();
  }, re.version = "18.3.1", re;
}
var Xt = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Xt.exports;
var Fn;
function bo() {
  return Fn || (Fn = 1, function(t, e) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var n = "18.3.1", o = Symbol.for("react.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), y = Symbol.for("react.context"), b = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), w = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), B = Symbol.for("react.offscreen"), Y = Symbol.iterator, V = "@@iterator";
      function G(u) {
        if (u === null || typeof u != "object")
          return null;
        var l = Y && u[Y] || u[V];
        return typeof l == "function" ? l : null;
      }
      var X = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, fe = {
        transition: null
      }, ne = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, N = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, F = {}, z = null;
      function Q(u) {
        z = u;
      }
      F.setExtraStackFrame = function(u) {
        z = u;
      }, F.getCurrentStack = null, F.getStackAddendum = function() {
        var u = "";
        z && (u += z);
        var l = F.getCurrentStack;
        return l && (u += l() || ""), u;
      };
      var se = !1, Ee = !1, Le = !1, he = !1, Be = !1, v = {
        ReactCurrentDispatcher: X,
        ReactCurrentBatchConfig: fe,
        ReactCurrentOwner: N
      };
      v.ReactDebugCurrentFrame = F, v.ReactCurrentActQueue = ne;
      function x(u) {
        {
          for (var l = arguments.length, E = new Array(l > 1 ? l - 1 : 0), D = 1; D < l; D++)
            E[D - 1] = arguments[D];
          P("warn", u, E);
        }
      }
      function C(u) {
        {
          for (var l = arguments.length, E = new Array(l > 1 ? l - 1 : 0), D = 1; D < l; D++)
            E[D - 1] = arguments[D];
          P("error", u, E);
        }
      }
      function P(u, l, E) {
        {
          var D = v.ReactDebugCurrentFrame, I = D.getStackAddendum();
          I !== "" && (l += "%s", E = E.concat([I]));
          var J = E.map(function(U) {
            return String(U);
          });
          J.unshift("Warning: " + l), Function.prototype.apply.call(console[u], console, J);
        }
      }
      var j = {};
      function _(u, l) {
        {
          var E = u.constructor, D = E && (E.displayName || E.name) || "ReactClass", I = D + "." + l;
          if (j[I])
            return;
          C("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", l, D), j[I] = !0;
        }
      }
      var f = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(u) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(u, l, E) {
          _(u, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(u, l, E, D) {
          _(u, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(u, l, E, D) {
          _(u, "setState");
        }
      }, A = Object.assign, R = {};
      Object.freeze(R);
      function T(u, l, E) {
        this.props = u, this.context = l, this.refs = R, this.updater = E || f;
      }
      T.prototype.isReactComponent = {}, T.prototype.setState = function(u, l) {
        if (typeof u != "object" && typeof u != "function" && u != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, u, l, "setState");
      }, T.prototype.forceUpdate = function(u) {
        this.updater.enqueueForceUpdate(this, u, "forceUpdate");
      };
      {
        var O = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, L = function(u, l) {
          Object.defineProperty(T.prototype, u, {
            get: function() {
              x("%s(...) is deprecated in plain JavaScript React classes. %s", l[0], l[1]);
            }
          });
        };
        for (var $ in O)
          O.hasOwnProperty($) && L($, O[$]);
      }
      function Z() {
      }
      Z.prototype = T.prototype;
      function te(u, l, E) {
        this.props = u, this.context = l, this.refs = R, this.updater = E || f;
      }
      var pe = te.prototype = new Z();
      pe.constructor = te, A(pe, T.prototype), pe.isPureReactComponent = !0;
      function we() {
        var u = {
          current: null
        };
        return Object.seal(u), u;
      }
      var H = Array.isArray;
      function Je(u) {
        return H(u);
      }
      function Qe(u) {
        {
          var l = typeof Symbol == "function" && Symbol.toStringTag, E = l && u[Symbol.toStringTag] || u.constructor.name || "Object";
          return E;
        }
      }
      function Oe(u) {
        try {
          return tt(u), !1;
        } catch {
          return !0;
        }
      }
      function tt(u) {
        return "" + u;
      }
      function Ve(u) {
        if (Oe(u))
          return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(u)), tt(u);
      }
      function He(u, l, E) {
        var D = u.displayName;
        if (D)
          return D;
        var I = l.displayName || l.name || "";
        return I !== "" ? E + "(" + I + ")" : E;
      }
      function Ze(u) {
        return u.displayName || "Context";
      }
      function Fe(u) {
        if (u == null)
          return null;
        if (typeof u.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof u == "function")
          return u.displayName || u.name || null;
        if (typeof u == "string")
          return u;
        switch (u) {
          case s:
            return "Fragment";
          case a:
            return "Portal";
          case m:
            return "Profiler";
          case g:
            return "StrictMode";
          case p:
            return "Suspense";
          case w:
            return "SuspenseList";
        }
        if (typeof u == "object")
          switch (u.$$typeof) {
            case y:
              var l = u;
              return Ze(l) + ".Consumer";
            case d:
              var E = u;
              return Ze(E._context) + ".Provider";
            case b:
              return He(u, u.render, "ForwardRef");
            case k:
              var D = u.displayName || null;
              return D !== null ? D : Fe(u.type) || "Memo";
            case M: {
              var I = u, J = I._payload, U = I._init;
              try {
                return Fe(U(J));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Xe = Object.prototype.hasOwnProperty, qe = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, de, rt, Ce;
      Ce = {};
      function st(u) {
        if (Xe.call(u, "ref")) {
          var l = Object.getOwnPropertyDescriptor(u, "ref").get;
          if (l && l.isReactWarning)
            return !1;
        }
        return u.ref !== void 0;
      }
      function bt(u) {
        if (Xe.call(u, "key")) {
          var l = Object.getOwnPropertyDescriptor(u, "key").get;
          if (l && l.isReactWarning)
            return !1;
        }
        return u.key !== void 0;
      }
      function pt(u, l) {
        var E = function() {
          de || (de = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", l));
        };
        E.isReactWarning = !0, Object.defineProperty(u, "key", {
          get: E,
          configurable: !0
        });
      }
      function ht(u, l) {
        var E = function() {
          rt || (rt = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", l));
        };
        E.isReactWarning = !0, Object.defineProperty(u, "ref", {
          get: E,
          configurable: !0
        });
      }
      function K(u) {
        if (typeof u.ref == "string" && N.current && u.__self && N.current.stateNode !== u.__self) {
          var l = Fe(N.current.type);
          Ce[l] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', l, u.ref), Ce[l] = !0);
        }
      }
      var ge = function(u, l, E, D, I, J, U) {
        var W = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: o,
          // Built-in properties that belong on the element
          type: u,
          key: l,
          ref: E,
          props: U,
          // Record the component responsible for creating this element.
          _owner: J
        };
        return W._store = {}, Object.defineProperty(W._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(W, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: D
        }), Object.defineProperty(W, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: I
        }), Object.freeze && (Object.freeze(W.props), Object.freeze(W)), W;
      };
      function je(u, l, E) {
        var D, I = {}, J = null, U = null, W = null, ae = null;
        if (l != null) {
          st(l) && (U = l.ref, K(l)), bt(l) && (Ve(l.key), J = "" + l.key), W = l.__self === void 0 ? null : l.__self, ae = l.__source === void 0 ? null : l.__source;
          for (D in l)
            Xe.call(l, D) && !qe.hasOwnProperty(D) && (I[D] = l[D]);
        }
        var ve = arguments.length - 2;
        if (ve === 1)
          I.children = E;
        else if (ve > 1) {
          for (var De = Array(ve), be = 0; be < ve; be++)
            De[be] = arguments[be + 2];
          Object.freeze && Object.freeze(De), I.children = De;
        }
        if (u && u.defaultProps) {
          var Ae = u.defaultProps;
          for (D in Ae)
            I[D] === void 0 && (I[D] = Ae[D]);
        }
        if (J || U) {
          var Se = typeof u == "function" ? u.displayName || u.name || "Unknown" : u;
          J && pt(I, Se), U && ht(I, Se);
        }
        return ge(u, J, U, W, ae, N.current, I);
      }
      function $e(u, l) {
        var E = ge(u.type, l, u.ref, u._self, u._source, u._owner, u.props);
        return E;
      }
      function dt(u, l, E) {
        if (u == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + u + ".");
        var D, I = A({}, u.props), J = u.key, U = u.ref, W = u._self, ae = u._source, ve = u._owner;
        if (l != null) {
          st(l) && (U = l.ref, ve = N.current), bt(l) && (Ve(l.key), J = "" + l.key);
          var De;
          u.type && u.type.defaultProps && (De = u.type.defaultProps);
          for (D in l)
            Xe.call(l, D) && !qe.hasOwnProperty(D) && (l[D] === void 0 && De !== void 0 ? I[D] = De[D] : I[D] = l[D]);
        }
        var be = arguments.length - 2;
        if (be === 1)
          I.children = E;
        else if (be > 1) {
          for (var Ae = Array(be), Se = 0; Se < be; Se++)
            Ae[Se] = arguments[Se + 2];
          I.children = Ae;
        }
        return ge(u.type, J, U, W, ae, ve, I);
      }
      function We(u) {
        return typeof u == "object" && u !== null && u.$$typeof === o;
      }
      var mt = ".", At = ":";
      function Ot(u) {
        var l = /[=:]/g, E = {
          "=": "=0",
          ":": "=2"
        }, D = u.replace(l, function(I) {
          return E[I];
        });
        return "$" + D;
      }
      var Ct = !1, Nt = /\/+/g;
      function ct(u) {
        return u.replace(Nt, "$&/");
      }
      function lt(u, l) {
        return typeof u == "object" && u !== null && u.key != null ? (Ve(u.key), Ot("" + u.key)) : l.toString(36);
      }
      function gt(u, l, E, D, I) {
        var J = typeof u;
        (J === "undefined" || J === "boolean") && (u = null);
        var U = !1;
        if (u === null)
          U = !0;
        else
          switch (J) {
            case "string":
            case "number":
              U = !0;
              break;
            case "object":
              switch (u.$$typeof) {
                case o:
                case a:
                  U = !0;
              }
          }
        if (U) {
          var W = u, ae = I(W), ve = D === "" ? mt + lt(W, 0) : D;
          if (Je(ae)) {
            var De = "";
            ve != null && (De = ct(ve) + "/"), gt(ae, l, De, "", function(Ru) {
              return Ru;
            });
          } else ae != null && (We(ae) && (ae.key && (!W || W.key !== ae.key) && Ve(ae.key), ae = $e(
            ae,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            E + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (ae.key && (!W || W.key !== ae.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              ct("" + ae.key) + "/"
            ) : "") + ve
          )), l.push(ae));
          return 1;
        }
        var be, Ae, Se = 0, ke = D === "" ? mt : D + At;
        if (Je(u))
          for (var ar = 0; ar < u.length; ar++)
            be = u[ar], Ae = ke + lt(be, ar), Se += gt(be, l, E, Ae, I);
        else {
          var Tr = G(u);
          if (typeof Tr == "function") {
            var tn = u;
            Tr === tn.entries && (Ct || x("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Ct = !0);
            for (var Ou = Tr.call(tn), rn, _u = 0; !(rn = Ou.next()).done; )
              be = rn.value, Ae = ke + lt(be, _u++), Se += gt(be, l, E, Ae, I);
          } else if (J === "object") {
            var nn = String(u);
            throw new Error("Objects are not valid as a React child (found: " + (nn === "[object Object]" ? "object with keys {" + Object.keys(u).join(", ") + "}" : nn) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Se;
      }
      function ye(u, l, E) {
        if (u == null)
          return u;
        var D = [], I = 0;
        return gt(u, D, "", "", function(J) {
          return l.call(E, J, I++);
        }), D;
      }
      function _e(u) {
        var l = 0;
        return ye(u, function() {
          l++;
        }), l;
      }
      function nt(u, l, E) {
        ye(u, function() {
          l.apply(this, arguments);
        }, E);
      }
      function ut(u) {
        return ye(u, function(l) {
          return l;
        }) || [];
      }
      function Zt(u) {
        if (!We(u))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return u;
      }
      function Vt(u) {
        var l = {
          $$typeof: y,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: u,
          _currentValue2: u,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        l.Provider = {
          $$typeof: d,
          _context: l
        };
        var E = !1, D = !1, I = !1;
        {
          var J = {
            $$typeof: y,
            _context: l
          };
          Object.defineProperties(J, {
            Provider: {
              get: function() {
                return D || (D = !0, C("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), l.Provider;
              },
              set: function(U) {
                l.Provider = U;
              }
            },
            _currentValue: {
              get: function() {
                return l._currentValue;
              },
              set: function(U) {
                l._currentValue = U;
              }
            },
            _currentValue2: {
              get: function() {
                return l._currentValue2;
              },
              set: function(U) {
                l._currentValue2 = U;
              }
            },
            _threadCount: {
              get: function() {
                return l._threadCount;
              },
              set: function(U) {
                l._threadCount = U;
              }
            },
            Consumer: {
              get: function() {
                return E || (E = !0, C("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), l.Consumer;
              }
            },
            displayName: {
              get: function() {
                return l.displayName;
              },
              set: function(U) {
                I || (x("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", U), I = !0);
              }
            }
          }), l.Consumer = J;
        }
        return l._currentRenderer = null, l._currentRenderer2 = null, l;
      }
      var Tt = -1, r = 0, i = 1, c = 2;
      function h(u) {
        if (u._status === Tt) {
          var l = u._result, E = l();
          if (E.then(function(J) {
            if (u._status === r || u._status === Tt) {
              var U = u;
              U._status = i, U._result = J;
            }
          }, function(J) {
            if (u._status === r || u._status === Tt) {
              var U = u;
              U._status = c, U._result = J;
            }
          }), u._status === Tt) {
            var D = u;
            D._status = r, D._result = E;
          }
        }
        if (u._status === i) {
          var I = u._result;
          return I === void 0 && C(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, I), "default" in I || C(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, I), I.default;
        } else
          throw u._result;
      }
      function S(u) {
        var l = {
          // We use these fields to store the result.
          _status: Tt,
          _result: u
        }, E = {
          $$typeof: M,
          _payload: l,
          _init: h
        };
        {
          var D, I;
          Object.defineProperties(E, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return D;
              },
              set: function(J) {
                C("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), D = J, Object.defineProperty(E, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return I;
              },
              set: function(J) {
                C("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), I = J, Object.defineProperty(E, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return E;
      }
      function q(u) {
        u != null && u.$$typeof === k ? C("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof u != "function" ? C("forwardRef requires a render function but was given %s.", u === null ? "null" : typeof u) : u.length !== 0 && u.length !== 2 && C("forwardRef render functions accept exactly two parameters: props and ref. %s", u.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), u != null && (u.defaultProps != null || u.propTypes != null) && C("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var l = {
          $$typeof: b,
          render: u
        };
        {
          var E;
          Object.defineProperty(l, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return E;
            },
            set: function(D) {
              E = D, !u.name && !u.displayName && (u.displayName = D);
            }
          });
        }
        return l;
      }
      var ue;
      ue = Symbol.for("react.module.reference");
      function Te(u) {
        return !!(typeof u == "string" || typeof u == "function" || u === s || u === m || Be || u === g || u === p || u === w || he || u === B || se || Ee || Le || typeof u == "object" && u !== null && (u.$$typeof === M || u.$$typeof === k || u.$$typeof === d || u.$$typeof === y || u.$$typeof === b || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        u.$$typeof === ue || u.getModuleId !== void 0));
      }
      function Re(u, l) {
        Te(u) || C("memo: The first argument must be a component. Instead received: %s", u === null ? "null" : typeof u);
        var E = {
          $$typeof: k,
          type: u,
          compare: l === void 0 ? null : l
        };
        {
          var D;
          Object.defineProperty(E, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return D;
            },
            set: function(I) {
              D = I, !u.name && !u.displayName && (u.displayName = I);
            }
          });
        }
        return E;
      }
      function me() {
        var u = X.current;
        return u === null && C(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), u;
      }
      function Pe(u) {
        var l = me();
        if (u._context !== void 0) {
          var E = u._context;
          E.Consumer === u ? C("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : E.Provider === u && C("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return l.useContext(u);
      }
      function Et(u) {
        var l = me();
        return l.useState(u);
      }
      function it(u, l, E) {
        var D = me();
        return D.useReducer(u, l, E);
      }
      function Ge(u) {
        var l = me();
        return l.useRef(u);
      }
      function vt(u, l) {
        var E = me();
        return E.useEffect(u, l);
      }
      function et(u, l) {
        var E = me();
        return E.useInsertionEffect(u, l);
      }
      function yt(u, l) {
        var E = me();
        return E.useLayoutEffect(u, l);
      }
      function _t(u, l) {
        var E = me();
        return E.useCallback(u, l);
      }
      function zt(u, l) {
        var E = me();
        return E.useMemo(u, l);
      }
      function Ie(u, l, E) {
        var D = me();
        return D.useImperativeHandle(u, l, E);
      }
      function er(u, l) {
        {
          var E = me();
          return E.useDebugValue(u, l);
        }
      }
      function wt() {
        var u = me();
        return u.useTransition();
      }
      function au(u) {
        var l = me();
        return l.useDeferredValue(u);
      }
      function su() {
        var u = me();
        return u.useId();
      }
      function cu(u, l, E) {
        var D = me();
        return D.useSyncExternalStore(u, l, E);
      }
      var Ht = 0, Br, Pr, kr, Lr, Fr, qr, jr;
      function $r() {
      }
      $r.__reactDisabledLog = !0;
      function lu() {
        {
          if (Ht === 0) {
            Br = console.log, Pr = console.info, kr = console.warn, Lr = console.error, Fr = console.group, qr = console.groupCollapsed, jr = console.groupEnd;
            var u = {
              configurable: !0,
              enumerable: !0,
              value: $r,
              writable: !0
            };
            Object.defineProperties(console, {
              info: u,
              log: u,
              warn: u,
              error: u,
              group: u,
              groupCollapsed: u,
              groupEnd: u
            });
          }
          Ht++;
        }
      }
      function fu() {
        {
          if (Ht--, Ht === 0) {
            var u = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: A({}, u, {
                value: Br
              }),
              info: A({}, u, {
                value: Pr
              }),
              warn: A({}, u, {
                value: kr
              }),
              error: A({}, u, {
                value: Lr
              }),
              group: A({}, u, {
                value: Fr
              }),
              groupCollapsed: A({}, u, {
                value: qr
              }),
              groupEnd: A({}, u, {
                value: jr
              })
            });
          }
          Ht < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var vr = v.ReactCurrentDispatcher, yr;
      function tr(u, l, E) {
        {
          if (yr === void 0)
            try {
              throw Error();
            } catch (I) {
              var D = I.stack.trim().match(/\n( *(at )?)/);
              yr = D && D[1] || "";
            }
          return `
` + yr + u;
        }
      }
      var Dr = !1, rr;
      {
        var pu = typeof WeakMap == "function" ? WeakMap : Map;
        rr = new pu();
      }
      function Ur(u, l) {
        if (!u || Dr)
          return "";
        {
          var E = rr.get(u);
          if (E !== void 0)
            return E;
        }
        var D;
        Dr = !0;
        var I = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var J;
        J = vr.current, vr.current = null, lu();
        try {
          if (l) {
            var U = function() {
              throw Error();
            };
            if (Object.defineProperty(U.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(U, []);
              } catch (ke) {
                D = ke;
              }
              Reflect.construct(u, [], U);
            } else {
              try {
                U.call();
              } catch (ke) {
                D = ke;
              }
              u.call(U.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (ke) {
              D = ke;
            }
            u();
          }
        } catch (ke) {
          if (ke && D && typeof ke.stack == "string") {
            for (var W = ke.stack.split(`
`), ae = D.stack.split(`
`), ve = W.length - 1, De = ae.length - 1; ve >= 1 && De >= 0 && W[ve] !== ae[De]; )
              De--;
            for (; ve >= 1 && De >= 0; ve--, De--)
              if (W[ve] !== ae[De]) {
                if (ve !== 1 || De !== 1)
                  do
                    if (ve--, De--, De < 0 || W[ve] !== ae[De]) {
                      var be = `
` + W[ve].replace(" at new ", " at ");
                      return u.displayName && be.includes("<anonymous>") && (be = be.replace("<anonymous>", u.displayName)), typeof u == "function" && rr.set(u, be), be;
                    }
                  while (ve >= 1 && De >= 0);
                break;
              }
          }
        } finally {
          Dr = !1, vr.current = J, fu(), Error.prepareStackTrace = I;
        }
        var Ae = u ? u.displayName || u.name : "", Se = Ae ? tr(Ae) : "";
        return typeof u == "function" && rr.set(u, Se), Se;
      }
      function hu(u, l, E) {
        return Ur(u, !1);
      }
      function du(u) {
        var l = u.prototype;
        return !!(l && l.isReactComponent);
      }
      function nr(u, l, E) {
        if (u == null)
          return "";
        if (typeof u == "function")
          return Ur(u, du(u));
        if (typeof u == "string")
          return tr(u);
        switch (u) {
          case p:
            return tr("Suspense");
          case w:
            return tr("SuspenseList");
        }
        if (typeof u == "object")
          switch (u.$$typeof) {
            case b:
              return hu(u.render);
            case k:
              return nr(u.type, l, E);
            case M: {
              var D = u, I = D._payload, J = D._init;
              try {
                return nr(J(I), l, E);
              } catch {
              }
            }
          }
        return "";
      }
      var Vr = {}, zr = v.ReactDebugCurrentFrame;
      function ur(u) {
        if (u) {
          var l = u._owner, E = nr(u.type, u._source, l ? l.type : null);
          zr.setExtraStackFrame(E);
        } else
          zr.setExtraStackFrame(null);
      }
      function mu(u, l, E, D, I) {
        {
          var J = Function.call.bind(Xe);
          for (var U in u)
            if (J(u, U)) {
              var W = void 0;
              try {
                if (typeof u[U] != "function") {
                  var ae = Error((D || "React class") + ": " + E + " type `" + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[U] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw ae.name = "Invariant Violation", ae;
                }
                W = u[U](l, U, D, E, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ve) {
                W = ve;
              }
              W && !(W instanceof Error) && (ur(I), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", D || "React class", E, U, typeof W), ur(null)), W instanceof Error && !(W.message in Vr) && (Vr[W.message] = !0, ur(I), C("Failed %s type: %s", E, W.message), ur(null));
            }
        }
      }
      function kt(u) {
        if (u) {
          var l = u._owner, E = nr(u.type, u._source, l ? l.type : null);
          Q(E);
        } else
          Q(null);
      }
      var br;
      br = !1;
      function Hr() {
        if (N.current) {
          var u = Fe(N.current.type);
          if (u)
            return `

Check the render method of \`` + u + "`.";
        }
        return "";
      }
      function gu(u) {
        if (u !== void 0) {
          var l = u.fileName.replace(/^.*[\\\/]/, ""), E = u.lineNumber;
          return `

Check your code at ` + l + ":" + E + ".";
        }
        return "";
      }
      function Eu(u) {
        return u != null ? gu(u.__source) : "";
      }
      var Gr = {};
      function vu(u) {
        var l = Hr();
        if (!l) {
          var E = typeof u == "string" ? u : u.displayName || u.name;
          E && (l = `

Check the top-level render call using <` + E + ">.");
        }
        return l;
      }
      function Yr(u, l) {
        if (!(!u._store || u._store.validated || u.key != null)) {
          u._store.validated = !0;
          var E = vu(l);
          if (!Gr[E]) {
            Gr[E] = !0;
            var D = "";
            u && u._owner && u._owner !== N.current && (D = " It was passed a child from " + Fe(u._owner.type) + "."), kt(u), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', E, D), kt(null);
          }
        }
      }
      function Jr(u, l) {
        if (typeof u == "object") {
          if (Je(u))
            for (var E = 0; E < u.length; E++) {
              var D = u[E];
              We(D) && Yr(D, l);
            }
          else if (We(u))
            u._store && (u._store.validated = !0);
          else if (u) {
            var I = G(u);
            if (typeof I == "function" && I !== u.entries)
              for (var J = I.call(u), U; !(U = J.next()).done; )
                We(U.value) && Yr(U.value, l);
          }
        }
      }
      function Xr(u) {
        {
          var l = u.type;
          if (l == null || typeof l == "string")
            return;
          var E;
          if (typeof l == "function")
            E = l.propTypes;
          else if (typeof l == "object" && (l.$$typeof === b || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          l.$$typeof === k))
            E = l.propTypes;
          else
            return;
          if (E) {
            var D = Fe(l);
            mu(E, u.props, "prop", D, u);
          } else if (l.PropTypes !== void 0 && !br) {
            br = !0;
            var I = Fe(l);
            C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", I || "Unknown");
          }
          typeof l.getDefaultProps == "function" && !l.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function yu(u) {
        {
          for (var l = Object.keys(u.props), E = 0; E < l.length; E++) {
            var D = l[E];
            if (D !== "children" && D !== "key") {
              kt(u), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", D), kt(null);
              break;
            }
          }
          u.ref !== null && (kt(u), C("Invalid attribute `ref` supplied to `React.Fragment`."), kt(null));
        }
      }
      function Wr(u, l, E) {
        var D = Te(u);
        if (!D) {
          var I = "";
          (u === void 0 || typeof u == "object" && u !== null && Object.keys(u).length === 0) && (I += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var J = Eu(l);
          J ? I += J : I += Hr();
          var U;
          u === null ? U = "null" : Je(u) ? U = "array" : u !== void 0 && u.$$typeof === o ? (U = "<" + (Fe(u.type) || "Unknown") + " />", I = " Did you accidentally export a JSX literal instead of a component?") : U = typeof u, C("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", U, I);
        }
        var W = je.apply(this, arguments);
        if (W == null)
          return W;
        if (D)
          for (var ae = 2; ae < arguments.length; ae++)
            Jr(arguments[ae], u);
        return u === s ? yu(W) : Xr(W), W;
      }
      var Kr = !1;
      function Du(u) {
        var l = Wr.bind(null, u);
        return l.type = u, Kr || (Kr = !0, x("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(l, "type", {
          enumerable: !1,
          get: function() {
            return x("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: u
            }), u;
          }
        }), l;
      }
      function bu(u, l, E) {
        for (var D = dt.apply(this, arguments), I = 2; I < arguments.length; I++)
          Jr(arguments[I], D.type);
        return Xr(D), D;
      }
      function Au(u, l) {
        var E = fe.transition;
        fe.transition = {};
        var D = fe.transition;
        fe.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          u();
        } finally {
          if (fe.transition = E, E === null && D._updatedFibers) {
            var I = D._updatedFibers.size;
            I > 10 && x("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), D._updatedFibers.clear();
          }
        }
      }
      var Qr = !1, ir = null;
      function Cu(u) {
        if (ir === null)
          try {
            var l = ("require" + Math.random()).slice(0, 7), E = t && t[l];
            ir = E.call(t, "timers").setImmediate;
          } catch {
            ir = function(I) {
              Qr === !1 && (Qr = !0, typeof MessageChannel > "u" && C("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var J = new MessageChannel();
              J.port1.onmessage = I, J.port2.postMessage(void 0);
            };
          }
        return ir(u);
      }
      var Lt = 0, Zr = !1;
      function en(u) {
        {
          var l = Lt;
          Lt++, ne.current === null && (ne.current = []);
          var E = ne.isBatchingLegacy, D;
          try {
            if (ne.isBatchingLegacy = !0, D = u(), !E && ne.didScheduleLegacyUpdate) {
              var I = ne.current;
              I !== null && (ne.didScheduleLegacyUpdate = !1, Nr(I));
            }
          } catch (Ae) {
            throw or(l), Ae;
          } finally {
            ne.isBatchingLegacy = E;
          }
          if (D !== null && typeof D == "object" && typeof D.then == "function") {
            var J = D, U = !1, W = {
              then: function(Ae, Se) {
                U = !0, J.then(function(ke) {
                  or(l), Lt === 0 ? Ar(ke, Ae, Se) : Ae(ke);
                }, function(ke) {
                  or(l), Se(ke);
                });
              }
            };
            return !Zr && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              U || (Zr = !0, C("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), W;
          } else {
            var ae = D;
            if (or(l), Lt === 0) {
              var ve = ne.current;
              ve !== null && (Nr(ve), ne.current = null);
              var De = {
                then: function(Ae, Se) {
                  ne.current === null ? (ne.current = [], Ar(ae, Ae, Se)) : Ae(ae);
                }
              };
              return De;
            } else {
              var be = {
                then: function(Ae, Se) {
                  Ae(ae);
                }
              };
              return be;
            }
          }
        }
      }
      function or(u) {
        u !== Lt - 1 && C("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Lt = u;
      }
      function Ar(u, l, E) {
        {
          var D = ne.current;
          if (D !== null)
            try {
              Nr(D), Cu(function() {
                D.length === 0 ? (ne.current = null, l(u)) : Ar(u, l, E);
              });
            } catch (I) {
              E(I);
            }
          else
            l(u);
        }
      }
      var Cr = !1;
      function Nr(u) {
        if (!Cr) {
          Cr = !0;
          var l = 0;
          try {
            for (; l < u.length; l++) {
              var E = u[l];
              do
                E = E(!0);
              while (E !== null);
            }
            u.length = 0;
          } catch (D) {
            throw u = u.slice(l + 1), D;
          } finally {
            Cr = !1;
          }
        }
      }
      var Nu = Wr, Tu = bu, wu = Du, Su = {
        map: ye,
        forEach: nt,
        count: _e,
        toArray: ut,
        only: Zt
      };
      e.Children = Su, e.Component = T, e.Fragment = s, e.Profiler = m, e.PureComponent = te, e.StrictMode = g, e.Suspense = p, e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = v, e.act = en, e.cloneElement = Tu, e.createContext = Vt, e.createElement = Nu, e.createFactory = wu, e.createRef = we, e.forwardRef = q, e.isValidElement = We, e.lazy = S, e.memo = Re, e.startTransition = Au, e.unstable_act = en, e.useCallback = _t, e.useContext = Pe, e.useDebugValue = er, e.useDeferredValue = au, e.useEffect = vt, e.useId = su, e.useImperativeHandle = Ie, e.useInsertionEffect = et, e.useLayoutEffect = yt, e.useMemo = zt, e.useReducer = it, e.useRef = Ge, e.useState = Et, e.useSyncExternalStore = cu, e.useTransition = wt, e.version = n, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Xt, Xt.exports)), Xt.exports;
}
var qn;
function Ao() {
  return qn || (qn = 1, process.env.NODE_ENV === "production" ? hr.exports = Do() : hr.exports = bo()), hr.exports;
}
var Kt = Ao();
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Co = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ou = (...t) => t.filter((e, n, o) => !!e && e.trim() !== "" && o.indexOf(e) === n).join(" ").trim();
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var No = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const To = Kt.forwardRef(
  ({
    color: t = "currentColor",
    size: e = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: o,
    className: a = "",
    children: s,
    iconNode: g,
    ...m
  }, d) => Kt.createElement(
    "svg",
    {
      ref: d,
      ...No,
      width: e,
      height: e,
      stroke: t,
      strokeWidth: o ? Number(n) * 24 / Number(e) : n,
      className: ou("lucide", a),
      ...m
    },
    [
      ...g.map(([y, b]) => Kt.createElement(y, b)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Er = (t, e) => {
  const n = Kt.forwardRef(
    ({ className: o, ...a }, s) => Kt.createElement(To, {
      ref: s,
      iconNode: e,
      className: ou(`lucide-${Co(t)}`, o),
      ...a
    })
  );
  return n.displayName = `${t}`, n;
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wo = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "m8 13 4-7 4 7", key: "4rari8" }],
  ["path", { d: "M9.1 11h5.7", key: "1gkovt" }]
], So = Er("BookA", wo);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oo = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], _o = Er("BookOpen", Oo);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ro = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], Io = Er("Image", Ro);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xo = [
  ["path", { d: "M15 12h-5", key: "r7krc0" }],
  ["path", { d: "M15 8h-5", key: "1khuty" }],
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4", key: "zz82l3" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
      key: "1ph1d7"
    }
  ]
], Mo = Er("ScrollText", xo), Ia = ["project", "resource", "dictionary", "media"], xa = {
  project: {
    key: "project",
    localizedName: "Projects",
    icon: Mo,
    actions: [
      {
        buttonLabel: "Open",
        condition: () => !0,
        action: () => {
        },
        default: () => !0
      },
      {
        buttonLabel: "Sync",
        condition: () => !0,
        action: () => {
        }
      },
      {
        buttonLabel: "Get",
        condition: () => !0,
        action: () => {
        }
      }
    ]
  },
  resource: {
    key: "resource",
    localizedName: "Resources",
    icon: _o,
    actions: [
      {
        buttonLabel: "Open",
        condition: () => !0,
        action: () => {
        },
        default: () => !0
      },
      {
        buttonLabel: "Remove",
        condition: () => !0,
        action: () => {
        }
      }
    ]
  },
  dictionary: {
    key: "dictionary",
    localizedName: "Dictionaries",
    icon: So,
    actions: [
      {
        buttonLabel: "Open",
        condition: () => !0,
        action: () => {
        },
        default: () => !0
      },
      {
        buttonLabel: "Remove",
        condition: () => !0,
        action: () => {
        }
      }
    ]
  },
  media: {
    key: "media",
    localizedName: "Media",
    icon: Io,
    actions: [
      {
        buttonLabel: "Open",
        condition: () => !0,
        action: () => {
        },
        default: () => !0
      },
      {
        buttonLabel: "Remove",
        condition: () => !0,
        action: () => {
        }
      }
    ]
  }
};
export {
  Lo as AsyncVariable,
  lr as CHAPTER_TYPE,
  Fo as Collator,
  Bu as DateTimeFormat,
  qu as DocumentCombiner,
  Yo as EventRollingTimeCounter,
  gi as FIRST_SCR_BOOK_NUM,
  vi as FIRST_SCR_CHAPTER_NUM,
  yi as FIRST_SCR_VERSE_NUM,
  Ei as LAST_SCR_BOOK_NUM,
  $u as Mutex,
  Jo as MutexMap,
  Xo as NonValidatingDocumentCombiner,
  Uu as NumberFormat,
  sr as PLATFORM_ERROR_VERSION,
  Ia as PROJECT_TYPE_KEYS,
  Pu as PlatformEventEmitter,
  xa as ProjectTypes,
  Wo as PromiseChainingMap,
  Eo as THEME_STYLE_ELEMENT_ID,
  Ko as UnsubscriberAsyncList,
  Ue as UsjReaderWriter,
  fr as VERSE_TYPE,
  Ca as aggregateUnsubscriberAsyncs,
  Aa as aggregateUnsubscribers,
  Ra as applyThemeStylesheet,
  ba as areUsjContentsEqualExceptWhitespace,
  cr as at,
  jt as charAt,
  ta as codePointAt,
  va as compareScrRefs,
  zo as createSyncProxyForAsyncObject,
  jo as debounce,
  Wt as deepClone,
  oo as deepEqual,
  pa as defaultScrRef,
  so as deserialize,
  si as endsWith,
  Kn as ensureArray,
  sa as escapeStringRegexp,
  _a as expandThemeContribution,
  Sa as formatBytes,
  ra as formatReplacementString,
  li as formatReplacementStringToArray,
  Da as formatScrRef,
  Oa as formatTimeSpan,
  Vo as getAllObjectFunctionNames,
  Di as getChaptersForBook,
  wa as getCurrentLocale,
  jn as getErrorMessage,
  bi as getLocalizeKeyForScrollGroupId,
  ya as getLocalizeKeysForScrollGroupIds,
  ga as getLocalizedIdFromBookNumber,
  yo as getStylesheetForTheme,
  $o as groupBy,
  Ta as htmlEncode,
  fi as includes,
  Qt as indexOf,
  Ho as isErrorMessageAboutParatextBlockingInternetAccess,
  Go as isErrorMessageAboutRegistryAuthFailure,
  aa as isLocalizeKey,
  Zo as isPlatformError,
  Na as isSerializable,
  at as isString,
  ao as isSubset,
  qt as isWhiteSpace,
  pi as lastIndexOf,
  ho as localizedStringsDocumentSchema,
  mo as menuDocumentSchema,
  qo as newGuid,
  Qo as newPlatformError,
  na as normalize,
  Tn as normalizeScriptureSpaces,
  ha as offsetBook,
  da as offsetChapter,
  ma as offsetVerse,
  ua as ordinalCompare,
  ia as padEnd,
  oa as padStart,
  fo as projectSettingsDocumentSchema,
  Ea as scrRefToBBBCCC,
  Cn as scrRefToBBBCCCVVV,
  kn as serialize,
  po as settingsDocumentSchema,
  bn as slice,
  An as split,
  Qn as startsWith,
  Me as stringLength,
  xt as substring,
  go as themeDocumentSchema,
  hi as toArray,
  fa as toKebabCase,
  la as transformAndEnsureRegExpArray,
  ca as transformAndEnsureRegExpRegExpArray,
  Fu as wait,
  Uo as waitForDuration
};
//# sourceMappingURL=index.js.map
